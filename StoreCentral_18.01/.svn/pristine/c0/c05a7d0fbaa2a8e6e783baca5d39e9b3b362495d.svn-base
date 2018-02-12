/**
 * 
 */
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

import au.com.woolworths.portal.model.SubReportInfo;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.GapScanParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xmrah
 * 
 */
@Controller
@RequestMapping(value = "*/gapScanReport")
@Scope("session")
public class GapScanReportController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportGapScan']}")
	private String screenCode;
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['gapScan']}")
	private String gapScan = null;

	private ModelMap model;

	private UserContext userDetail;
	private GapScanParam gapScanResultsGlobal;
	private byte[] pdfArray = null;

	@RequestMapping(value = "/loadGapScanReport.htm", method = RequestMethod.GET)
	public ModelAndView loadGapScanReport(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("ReportGapScan");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printReportGapScanPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportGapScanPDF(
			@RequestBody GapScanParam gapScanResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		gapScanResultsGlobal=gapScanResults;
		return CommonUtils.convertObjectTojson("success");

	}
	
	private boolean genPdf(HttpServletRequest request) throws Throwable{
		GapScanParam gapScanResults=gapScanResultsGlobal;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();

		ArrayList<SubReportInfo> mainList = null;
		SubReportInfo mainData = new SubReportInfo();

		mainData.setActionRequired(gapScanResults.getActionReqList());
		mainData.setReviewOnly(gapScanResults.getRevOnlyList());

		mainList = new ArrayList<SubReportInfo>();
		mainList.add(mainData);

		reportInputParams.put("StoreNo", gapScanResults.getStoreNo());
		reportInputParams.put("StoreName", gapScanResults.getStoreName());
		reportInputParams.put("report_date", gapScanResults.getReport_date());
		reportInputParams.put("reason_type", gapScanResults.getReason_type());
		reportInputParams.put("report_time", gapScanResults.getReport_time());
		reportInputParams.put("dept", gapScanResults.getDept());
		reportInputParams.put("employee", gapScanResults.getEmployee());

		JasperParamsBean bean = new JasperParamsBean(gapScan,
				new JRBeanCollectionDataSource(mainList), reportInputParams, 1);
		beanList.add(bean);
		try {
			/*byte[] byos =  jasper.printReport(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request))
					.toByteArray();*/
			byte[] byos = jasper.printReportTimeZone(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), request).toByteArray();
			pdfArray = byos;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@ResponseBody
	@RequestMapping(value = "/downloadGapScanReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			genPdf(request);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
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
