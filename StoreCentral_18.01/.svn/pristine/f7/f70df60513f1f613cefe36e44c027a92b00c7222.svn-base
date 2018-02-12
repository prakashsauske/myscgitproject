
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.util.ArrayList;
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

import au.com.woolworths.portal.model.UldSweepResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.UldSweepParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xprnx
 * a
 */
@Controller
@RequestMapping(value = "*/uldSweep")
@Scope("session")
public class UldSweepController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['uldSweep']}")
	private String screenCode;

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['uldSweepSupPrintName']}")
	private String uldSweepSupPrintName = null;
	
	@Value("#{properties['uldSweepPalPrintName']}")
	private String uldSweepPalPrintName = null;

	private ModelMap model;
	
	private byte[] pdfArray = null;

	
	@RequestMapping(value = "/getULDSweep.htm", method = RequestMethod.GET)
	public ModelAndView loadULDSweepContent(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("login"));
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

		ModelAndView modelAndView = new ModelAndView("uldSweep");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printPCDCopyPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printPCDCopyPDF(
			@RequestBody UldSweepParam uldSweepParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<UldSweepResult> uldSweepResultList = null;		
		uldSweepResultList = uldSweepParam.getResultList();
		//JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(uldSweepResultList);
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();

		try{
		//reportInputParams.put("reportResult", inventoryReportsResults.getResultList());
		reportInputParams.put("pcdId", uldSweepParam.getPcdId());
		reportInputParams.put("storeNo", uldSweepParam.getStoreNo());
		reportInputParams.put("storeName", uldSweepParam.getStoreName());
		reportInputParams.put("supplierNo", uldSweepParam.getSupplierNo());
		reportInputParams.put("supplierName", uldSweepParam.getSupplierName());
		reportInputParams.put("carrierNo", uldSweepParam.getCarrierNo());
		reportInputParams.put("carrierName", uldSweepParam.getCarrierName());
		reportInputParams.put("regoNo", uldSweepParam.getRegoNo());
		reportInputParams.put("consignNo", uldSweepParam.getConsignNo());
		reportInputParams.put("userId", uldSweepParam.getUserId());
		
		if(uldSweepResultList !=null && uldSweepResultList.size() == 0){
			UldSweepResult uldSweepResult = new UldSweepResult();
			uldSweepResultList.add(uldSweepResult);
		}
		
		JasperParamsBean supplierBean = new JasperParamsBean(uldSweepSupPrintName,
				new JRBeanCollectionDataSource(uldSweepResultList), reportInputParams, 1);
		beanList.add(supplierBean);
		
		
		
		JasperParamsBean palletBean = new JasperParamsBean(uldSweepPalPrintName,
				new JRBeanCollectionDataSource(uldSweepResultList), reportInputParams,2);
		beanList.add(palletBean);
		
		byte[] byos =  jasper.printReport(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request))
				.toByteArray();

		 /*byte[] byosSupplier = JasperReportUtil.getInstance().printPdfReport(uldSweepSupPrintName, beanDS, reportRealPath,
				reportInputParams).toByteArray();*/
		 
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadPCDCopyPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadPCDCopyPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
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
