
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Arrays;
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
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ReportServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xlki1
 * a
 */
@Controller
@RequestMapping(value = "*/dgReport")
@Scope("session")
public class DGReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportDG']}")
	private String screenCode;

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['dgReportName']}")
	private String dgReportName = null;

	private ModelMap model;
	
	//private byte[] pdfArray = null;
	
	@Autowired
	private ReportServiceImpl reportService;

	@RequestMapping(value = "/printReportDGPDF.htm", method = RequestMethod.GET)
	@ResponseBody
	public byte[] printReportDGPDF(HttpServletRequest request,
			HttpServletResponse response) throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return null;
		}
		 byte[] pdfArray = null;
		 /*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			screenCode="AC_RPDG";
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
		DGReportResult[] dgReportResultArray = reportService.getDGReportReportFromMobilink(userDetail, userDetail.getDomain());
		if(dgReportResultArray != null && dgReportResultArray.length > 0){
			List<DGReportResult> dgResultList = Arrays.asList(dgReportResultArray);	
			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(dgResultList);

			try{
			//reportInputParams.put("reportResult", inventoryReportsResults.getResultList());
			reportInputParams.put("count", String.valueOf(dgResultList.size()));
			reportInputParams.put("StoreNo", userDetail.getSiteNo());
			reportInputParams.put("StoreName", userDetail.getSiteName());
			reportInputParams.put("userName", userDetail.getFirstName());
			reportInputParams.put("userId", userDetail.getUserId());
			
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			System.out.println(dateFormat.format(date));
			reportInputParams.put("executedDate", dateFormat.format(date));//today's date

			/*String reportRealPath = request.getSession().getServletContext()
					.getRealPath("");*/

			 /* pdfArray = JasperReportUtil.getInstance().printPdfReport(dgReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
					reportInputParams).toByteArray();*/
			pdfArray = jasper.printPdfReportTimeZone(dgReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
			  response.setContentType("application/pdf");
				response.setContentLength(pdfArray.length);
				response.getOutputStream().write(pdfArray);
			}catch(Exception e){
				e.printStackTrace();
				response.setContentType("text/html");
				PrintWriter pw = response.getWriter();
				pw.println("<html>");
				pw.println("<head><title>Report Error Page</title></title>");
				pw.println("<body>");
				pw.println("<h1>Some technical issues occured while generating the DG report ."+e.getMessage()+" </h1>");
				pw.println("</body></html>");
			}
		
		}
				}
			}else{
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>No records available</title></title>");
			pw.println("<body>");
			pw.println("<h1>No records available to generate DG report. </h1>");
			pw.println("</body></html>");
		}
		return pdfArray;
		
		
		
	}
			}
	/*
	@ResponseBody
	@RequestMapping(value = "/downloadDGReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadDGReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}*/
	
