
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

import au.com.woolworths.portal.model.StockTakeAuditSummaryReportResult;
import au.com.woolworths.portal.param.StockTakeAuditSummaryReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * a
 */
@Controller
@RequestMapping(value = "*/stockTakeAuditSummaryReport")
@Scope("session")
public class StockTakeAuditSummaryReportController extends BaseController {

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['stockTakeAduitSummaryReportName']}")
	private String stockTakeAduitSummaryReportName = null;

	private ModelMap model;
	
	private byte[] pdfArray = null;
	

	@RequestMapping(method = RequestMethod.POST, value = "/printReportStockTakeAuditSummaryPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportStockTakeAuditSummaryPDF(
			@RequestBody StockTakeAuditSummaryReportParam stockTakeAuditSummaryReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<StockTakeAuditSummaryReportResult> stockTakeAuditSummaryReportResultList = null;		
		stockTakeAuditSummaryReportResultList = stockTakeAuditSummaryReportParam.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(stockTakeAuditSummaryReportResultList);

		try{
		reportInputParams.put("stockTakePrint", stockTakeAuditSummaryReportParam.getStockTakePrint());
		reportInputParams.put("StoreNo", stockTakeAuditSummaryReportParam.getStoreNo());
		reportInputParams.put("StoreName", stockTakeAuditSummaryReportParam.getStoreName());
		reportInputParams.put("count", String.valueOf(stockTakeAuditSummaryReportResultList.size()));
		reportInputParams.put("applyGroupby",stockTakeAuditSummaryReportParam.getApplyGroupby());

		/*String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");*/

		/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeAduitSummaryReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();*/
		 byte[] byos = jasper.printPdfReportTimeZone(stockTakeAduitSummaryReportName, beanDS,jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeAuditSummaryPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadStockTakeAuditSummaryReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
