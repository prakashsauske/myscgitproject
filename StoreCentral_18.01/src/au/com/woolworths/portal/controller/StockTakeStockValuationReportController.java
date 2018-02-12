
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

import au.com.woolworths.portal.model.StockTakeStockValuationReportResult;
import au.com.woolworths.portal.param.StockTakeStockValuationReportParam;
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
@RequestMapping(value = "*/stockTakeStockValuationReport")
@Scope("session")
public class StockTakeStockValuationReportController extends BaseController {

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['stockTakeStockValuationReportName']}")
	private String stockTakeStockValuationReportName = null;

	private ModelMap model;
	
	private byte[] pdfArray = null;
	

	@RequestMapping(method = RequestMethod.POST, value = "/printReportStockTakeStockValuationPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportStockTakeStockValuationPDF(
			@RequestBody StockTakeStockValuationReportParam stockTakeStockValuationReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<StockTakeStockValuationReportResult> stockTakeStockValuationReportResultList = null;		
		stockTakeStockValuationReportResultList = stockTakeStockValuationReportParam.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(stockTakeStockValuationReportResultList);

		try{
		reportInputParams.put("stockTakePrint", stockTakeStockValuationReportParam.getStockTakePrint());
		reportInputParams.put("StoreNo", stockTakeStockValuationReportParam.getStoreNo());
		reportInputParams.put("StoreName", stockTakeStockValuationReportParam.getStoreName());
		reportInputParams.put("count", String.valueOf(stockTakeStockValuationReportResultList.size()));

		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");

		/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeStockValuationReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();*/
		 byte[] byos = jasper.printPdfReportTimeZone(stockTakeStockValuationReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request),jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeStockValuationPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadStockTakeStockValuationReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
