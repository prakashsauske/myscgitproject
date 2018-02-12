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

import au.com.woolworths.portal.model.PLUReportResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.PLUReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;


@Controller
@RequestMapping(value = "*/PLUreport")
@Scope("session")


public class PLUReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportPLU']}")
	private String screenCode;
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['pluReportName']}")
	private String pluReportName = null;

	private PLUReportParam pluReportsResultsGlobal;
	
	
	private byte[] pdfArray = null;
	private ModelMap model;
	
	@RequestMapping(value = "/loadPLUReport.htm", method = RequestMethod.GET)
	public ModelAndView loadPLUReport(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("ReportPLU");
		return modelAndView;
	}
	
	private boolean genPDF(HttpServletRequest request) throws Throwable{
		PLUReportParam pluReportsResults=pluReportsResultsGlobal;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<PLUReportResult> pluResultList = null;		
		pluResultList = pluReportsResults.getReportResult();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(pluResultList);

		try{
		//reportInputParams.put("reportResult", inventoryReportsResults.getResultList());
		reportInputParams.put("reportFor", pluReportsResults.getReportFor());
		reportInputParams.put("storeNo", pluReportsResults.getStoreNo());
		reportInputParams.put("storeName",pluReportsResults.getStoreName());
		
		reportInputParams.put("totalCount", pluReportsResults.getTotalCount());//To display total articles

		/*String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");*/

		/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(pluReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();*/
		byte[] byos = jasper.printPdfReportTimeZone(pluReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/printPLUReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printPLUReportPDF(
			@RequestBody PLUReportParam pluReportsResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		pluReportsResultsGlobal=pluReportsResults;
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadPLUReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws Throwable {
		response.setContentType("application/pdf");
		genPDF(request);
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}
	
	/*@Override
	public String formUrlParam(MandatoryReportParam param) {
		// TODO Auto-generated method stub
		return null;
	}*/

}
