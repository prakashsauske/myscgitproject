
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

import au.com.woolworths.portal.controller.LTOArticlestoFillReportController.locationNameComparator;
import au.com.woolworths.portal.model.DGReportResult;
import au.com.woolworths.portal.model.LTOArticlestoFillReportResult;
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
@RequestMapping(value = "*/stockFillReport")
@Scope("session")
public class StockFillReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportStockFill']}")
	private String screenCode;

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['stockFillReportName']}")
	private String stockFillReportName = null;

	private ModelMap model;
	
	//private byte[] pdfArray = null;
	
	@Autowired
	private ReportServiceImpl reportService;

	@RequestMapping(value = "/printReportStockFillPDF.htm", method = RequestMethod.GET)
	@ResponseBody
	public byte[] printReportStockFillPDF(HttpServletRequest request,
			HttpServletResponse response) throws Throwable , Exception {
		 byte[] pdfArray = null;
	try{
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return null;
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		screenCode="AC_RPSF";
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
		StockFillReportResult[] stockFillReportResultArray = reportService.getStockFillReportReportFromMobilink(userDetail, userDetail.getDomain());
		if(stockFillReportResultArray != null && stockFillReportResultArray.length > 0){
			List<StockFillReportResult> stockFillResultList = Arrays.asList(stockFillReportResultArray);
			String salesOrgCst = Integer.toString(userDetail.getSalesOrg());
			String salesOrgFlg = (salesOrgCst.equalsIgnoreCase(Constants.SMKT) || salesOrgCst.equalsIgnoreCase(Constants.COUNTDOWN) ||salesOrgCst.equalsIgnoreCase(Constants.METRO)) ? "Y" : "N";
			if(salesOrgFlg.equalsIgnoreCase("Y")){	
				Collections.sort(stockFillResultList, new aisleLocationNameComparator());
				Collections.sort(stockFillResultList, new aisleComparator());		// aisle sort 
				
			}else{
				Collections.sort(stockFillResultList, new noAisleLocationNameComparator());
			}
			
			List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();
			ArrayList<StockFillSubReportInfo> mainList = null;
		
			StockFillSubReportInfo mainData  = splitDataBasedOnLocationType(stockFillResultList);

			mainList = new ArrayList<StockFillSubReportInfo>();
			mainList.add(mainData);
			
			reportInputParams.put("StoreNo", userDetail.getSiteNo());
			reportInputParams.put("StoreName", userDetail.getSiteName());			
			reportInputParams.put("SalesOrg", userDetail.getSalesOrg());
			reportInputParams.put("ADReport", salesOrgFlg);
			
			JasperParamsBean bean = new JasperParamsBean(stockFillReportName,
					new JRBeanCollectionDataSource(mainList), reportInputParams, 1);
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
			pw.println("<h1>No records available to generate StockFill report. </h1>");// defect 7102
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
				pw.println("<h1>Some technical issues occured while generating the StockFill report ."+e.getMessage()+" </h1>");
				pw.println("</body></html>");
		}
			return pdfArray;
	}
	
	/*@ResponseBody
	@RequestMapping(value = "/downloadStockFillReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadStockFillReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}*/
	
	/*@Override
	public String formUrlParam(MandatoryReportParam param) {
		// TODO Auto-generated method stub
		return null;
	}*/
	private StockFillSubReportInfo splitDataBasedOnLocationType(List<StockFillReportResult> stockFillReportResultList){
		StockFillSubReportInfo stockFillSubReportInfo = null;
		try {
			stockFillSubReportInfo = new StockFillSubReportInfo();
			ArrayList<StockFillReportResult> ltoLocationList = new ArrayList<StockFillReportResult>();		
			ArrayList<StockFillReportResult> otherLocationList = new ArrayList<StockFillReportResult>();
			
			for(StockFillReportResult stockFillReportResult : stockFillReportResultList){
				if(!CommonUtils.isEmpty(stockFillReportResult.getLocation_type())){
					if(stockFillReportResult.getLocation_type().equalsIgnoreCase("LTO")){
						ltoLocationList.add(stockFillReportResult);
					}else if(stockFillReportResult.getLocation_type().equalsIgnoreCase("OTHERS")){
						otherLocationList.add(stockFillReportResult);
					}
				}			
				
			}
			stockFillSubReportInfo.setLtoLocationList(ltoLocationList);
			stockFillSubReportInfo.setOtherLocationList(otherLocationList);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return stockFillSubReportInfo;
	}

	class aisleLocationNameComparator implements Comparator<StockFillReportResult> {
	    @Override
	    public int compare(StockFillReportResult obj1, StockFillReportResult obj2) {

	           return obj1.getAisleSubCate().compareTo(obj2.getAisleSubCate());
	   }
	}

	class aisleComparator implements Comparator<StockFillReportResult> {
	    @Override
	    public int compare(StockFillReportResult obj1, StockFillReportResult obj2) {

	    	return (obj1.getAisle_f()) - (obj2.getAisle_f());
	   }
	}
	
	
	
	class noAisleLocationNameComparator implements Comparator<StockFillReportResult> {
	    @Override
	    public int compare(StockFillReportResult obj1, StockFillReportResult obj2) {

	           return obj1.getNoAisleSubCate().compareTo(obj2.getNoAisleSubCate());
	   }
	}
	
	
}
