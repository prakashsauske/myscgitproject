
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.DGReportResult;
import au.com.woolworths.portal.model.LTOArticlestoFillReportResult;
import au.com.woolworths.portal.model.LTODiscrepancyReportResult;
import au.com.woolworths.portal.model.StockFillReportResult;
import au.com.woolworths.portal.model.SubReportInfo;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.StockFillSubReportInfo;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ReportServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xlki1
 * a
 */
@Controller
@RequestMapping(value = "*/ltoArtFillReport")
@Scope("session")
public class LTOArticlestoFillReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ltoArticlestoFillReport']}")
	private String screenCode;

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['ltoArticlestoFillReportName']}")
	private String ltoArticlestoFillReportName = null;

	private ModelMap model;
	
	//private byte[] pdfArray = null;
	
	@Autowired
	private ReportServiceImpl reportService;

	@RequestMapping(value = "/printLTOArticlestoFillReportPDF.pdf", method = RequestMethod.GET)
	@ResponseBody
	public byte[] printLTOArticlestoFillReportPDF(HttpServletRequest request,
			HttpServletResponse response) throws Throwable , Exception {
		 byte[] pdfArray = null;
	try{
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return null;
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		screenCode="AC_RPARTFILL";
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				response.setContentType("text/html");
				PrintWriter pw = response.getWriter();
				pw.println("<html>");
				pw.println("<head><title>noAccess</title></title>");
				pw.println("<body>");
				pw.println("<h1>You are not authorized to view this page. </h1>");
				pw.println("</body></html>");
				/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
			}
			else {
		
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();	
		
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		LTOArticlestoFillReportResult[] ltoArticlestoFillResultArray = reportService.getLTOArticlestoFillReportReportFromMobilink(userDetail, userDetail.getDomain());
		if(ltoArticlestoFillResultArray != null && ltoArticlestoFillResultArray.length > 0){
			List<LTOArticlestoFillReportResult> ltoArticlestoFillpResultList = Arrays.asList(ltoArticlestoFillResultArray);
			List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();
		
			Collections.sort(ltoArticlestoFillpResultList, new locationNameComparator());
			
			reportInputParams.put("StoreNo", userDetail.getSiteNo());
			reportInputParams.put("StoreName", userDetail.getSiteName());			
			
			JasperParamsBean bean = new JasperParamsBean(ltoArticlestoFillReportName,
					new JRBeanCollectionDataSource(ltoArticlestoFillpResultList), reportInputParams, 1);
			beanList.add(bean);
			
			/*pdfArray =  jasper.printReport(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request))
					.toByteArray();*/
			pdfArray = jasper.printReportTimeZone(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request), request).toByteArray();
			response.setContentType("application/pdf");
			response.setContentLength(pdfArray.length);
			response.getOutputStream().write(pdfArray);
			 
		}else{
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>No records available</title></title>");
			pw.println("<body>");
			pw.println("<h1>No records available to generate LTO Articles to Fill report. </h1>");
			pw.println("</body></html>");
		}
		}
		}
		}catch(Exception e){
				e.printStackTrace();
				response.setContentType("text/html");
				PrintWriter pw = response.getWriter();
				pw.println("<html>");
				pw.println("<head><title>Report Error Page</title></title>");
				pw.println("<body>");
				pw.println("<h1>Some technical issues occured while generating the LTO Articles to Fill report ."+e.getMessage()+" </h1>");
				pw.println("</body></html>");
		}
			return pdfArray;
	}
	
	class locationNameComparator implements Comparator<LTOArticlestoFillReportResult> {
	    @Override
	    public int compare(LTOArticlestoFillReportResult obj1, LTOArticlestoFillReportResult obj2) {

	           return obj1.getLto_name().compareTo(obj2.getLto_name());
	   }
	}

}
