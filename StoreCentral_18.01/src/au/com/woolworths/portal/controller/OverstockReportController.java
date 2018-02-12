
package au.com.woolworths.portal.controller;

import java.io.IOException;
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
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.InventoryReportResult;
import au.com.woolworths.portal.model.OverstockDailyReportResult;
import au.com.woolworths.portal.model.OverstockWeeklyReportResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InventoryReportParam;
import au.com.woolworths.portal.param.OverstockDailyReportParam;
import au.com.woolworths.portal.param.OverstockWeeklyReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xlki1
 * a
 */
@Controller
@RequestMapping(value = "*/overstockReport")
@Scope("session")
public class OverstockReportController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportOverstock']}")
	private String screenCode;
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['overstockDailyReportName']}")
	private String overstockDailyReportName = null;
	
	@Value("#{properties['overstockWeeklyReportName']}")
	private String overstockWeeklyReportName = null;

	private ModelMap model;
	
	private boolean genPdfFlagDaily;
	
	private byte[] pdfArray = null;
	
	private OverstockDailyReportParam overstockDailyReportParamGlobal;
	private OverstockWeeklyReportParam overstockWeeklyReportParamGlobal;

	@RequestMapping(value = "/loadOverstockReport.htm", method = RequestMethod.GET)
	public ModelAndView loadOverstockReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportOverstock");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printReportOverstockDailyPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportOverstockDailyPDF(
			@RequestBody OverstockDailyReportParam overstockDailyReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		overstockDailyReportParamGlobal=overstockDailyReportParam;
		return CommonUtils.convertObjectTojson("success");

	}
	
	private boolean genPdfDaily(HttpServletRequest request) throws Throwable{
		genPdfFlagDaily=true;
		OverstockDailyReportParam overstockDailyReportParam=overstockDailyReportParamGlobal;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<OverstockDailyReportResult> overstockDailyResultList = null;		
		overstockDailyResultList = overstockDailyReportParam.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(overstockDailyResultList);

		try{
		reportInputParams.put("reportFor", overstockDailyReportParam.getReportFor());
		reportInputParams.put("reportForDate", overstockDailyReportParam.getReportForDate());
		reportInputParams.put("StoreNo", overstockDailyReportParam.getStoreNo());
		reportInputParams.put("StoreName", overstockDailyReportParam.getStoreName());

		/*String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");*/

		 /*byte[] byos = JasperReportUtil.getInstance().printPdfReport(overstockDailyReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();*/
		byte[] byos = jasper.printPdfReportTimeZone(overstockDailyReportName, beanDS,jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	private boolean genPdfWeekly(HttpServletRequest request) throws Throwable{
		genPdfFlagDaily=false;
		OverstockWeeklyReportParam overstockWeeklyReportParam=overstockWeeklyReportParamGlobal;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<OverstockWeeklyReportResult> overstockWeeklyResultList = null;		
		overstockWeeklyResultList = overstockWeeklyReportParam.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(overstockWeeklyResultList);

		try{
		reportInputParams.put("reportFor", overstockWeeklyReportParam.getReportFor());
		reportInputParams.put("reportForDate", overstockWeeklyReportParam.getReportForDate());
		reportInputParams.put("StoreNo", overstockWeeklyReportParam.getStoreNo());
		reportInputParams.put("StoreName", overstockWeeklyReportParam.getStoreName());
		reportInputParams.put("day1", "Monday");
		reportInputParams.put("day2", "Tuesday");
		reportInputParams.put("day3", "Wednesday");
		reportInputParams.put("day4", "Thursday");
		reportInputParams.put("day5", "Friday");
		reportInputParams.put("day6", "Saturday");
		reportInputParams.put("day7", "Sunday");

		/*String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");*/

		 byte[] byos = JasperReportUtil.getInstance().printPdfReport(overstockWeeklyReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		return true;
	}

	@ResponseBody
	@RequestMapping(value = "/downloadOverstockDailyReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadOverstockDailyReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try{
			genPdfDaily(request);
			response.setContentLength(pdfArray.length);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.getOutputStream().write(pdfArray);
	    return null;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/printReportOverstockWeeklyPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportOverstockWeeklyPDF(
			@RequestBody OverstockWeeklyReportParam overstockWeeklyReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		overstockWeeklyReportParamGlobal=overstockWeeklyReportParam;
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadOverstockWeeklyReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadOverstockWeeklyReportPdf(HttpServletRequest request, HttpServletResponse response) throws Exception {response.setContentType("application/pdf");
	try{
		genPdfWeekly(request);
		response.setContentLength(pdfArray.length);
	} catch (Throwable e) {
		// TODO Auto-generated catch block
		e.printStackTrace();
	}
	response.getOutputStream().write(pdfArray);
    return null;}
	
	/*@Override
	public String formUrlParam(MandatoryReportParam param) {
		// TODO Auto-generated method stub
		return null;
	}*/

}
