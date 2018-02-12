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

import au.com.woolworths.portal.model.DailyStockCheckReportResult;
import au.com.woolworths.portal.model.InventoryReportResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.DailyStockCheckReportParam;
import au.com.woolworths.portal.param.InventoryReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xlki1 a
 */
@Controller
@RequestMapping(value = "*/dailyStockCheckReport")
@Scope("session")
public class DailyStockCheckReportController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportDSC']}")
	private String screenCode;
	
	@Autowired
	private JasperReportUtil jasper;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['dailyStockCheckReportName']}")
	private String dailyStockCheckReportName = null;

	private ModelMap model;

	private DailyStockCheckReportParam dailyStockCheckReportParamGlobal;
	private byte[] pdfArray = null;

	@RequestMapping(value = "/loadDailyStockReport.htm", method = RequestMethod.GET)
	public ModelAndView loadDailyStockReport(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("reportDailyStock");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printReportDailyStockCheckPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportDailyStockCheckPDF(
			@RequestBody DailyStockCheckReportParam dailyStockCheckReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		
		dailyStockCheckReportParamGlobal=dailyStockCheckReportParam;
		return CommonUtils.convertObjectTojson("success");

	}
	
	private void genPDF(HttpServletRequest request) throws Throwable{
		DailyStockCheckReportParam dailyStockCheckReportParam=dailyStockCheckReportParamGlobal;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<DailyStockCheckReportResult> dailyStockCheckReportResultList = null;
		dailyStockCheckReportResultList = dailyStockCheckReportParam
				.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				dailyStockCheckReportResultList);

		try {
			reportInputParams.put("dept", dailyStockCheckReportParam.getDept());
			reportInputParams.put("StoreNo",
					dailyStockCheckReportParam.getStoreNo());
			reportInputParams.put("StoreName",
					dailyStockCheckReportParam.getStoreName());
			reportInputParams.put("count",
					dailyStockCheckReportParam.getCount());

			/*
			 * String reportRealPath = request.getSession().getServletContext()
			 * .getRealPath("");
			 */

			/*byte[] byos = JasperReportUtil
					.getInstance()
					.printPdfReport(
							dailyStockCheckReportName,
							beanDS,
							jasperRptResponseHandler
									.getReportSourcePath(request),
							jasperRptResponseHandler.getReportBinPath(request),
							reportInputParams).toByteArray();*/
			
			byte[] byos = jasper.printPdfReportTimeZone(dailyStockCheckReportName, beanDS, jasperRptResponseHandler
					.getReportSourcePath(request),
			jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
			pdfArray = byos;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}

	@ResponseBody
	@RequestMapping(value = "/downloadDailyStockCheckReportPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			genPDF(request);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
		return null;
	}

}
