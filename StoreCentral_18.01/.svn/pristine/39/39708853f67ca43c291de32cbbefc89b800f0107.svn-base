
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.math.BigDecimal;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.StockTakeUserPerformanceReportResult;
import au.com.woolworths.portal.param.StockTakeUserPerformanceReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * 
 */
@Controller
@RequestMapping(value = "*/stockTakeUserPerformanceReport")
@Scope("session")
public class StockTakeUserPerformanceReportController extends BaseController {
		
	@Autowired
	private JasperReportUtil jasper;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['stockTakeUserPerformanceReportName']}")
	private String stockTakeUserPerformanceReportName = null;

	private byte[] pdfArray = null;
	

	@RequestMapping(method = RequestMethod.POST, value = "/printReportStockTakeUserPerformancePDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportStockTakeUserPerformancePDF(
			@RequestBody StockTakeUserPerformanceReportParam stockTakeUserPerformanceReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<StockTakeUserPerformanceReportResult> stockTakeUserPerformanceReportResultList = null;		
		stockTakeUserPerformanceReportResultList = stockTakeUserPerformanceReportParam.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(stockTakeUserPerformanceReportResultList);

		try{
			double totalscans_per_min =  0;
			double totalarticles_per_min =0;
			if(stockTakeUserPerformanceReportResultList != null && stockTakeUserPerformanceReportResultList.size() >0){			
								
				for(StockTakeUserPerformanceReportResult result : stockTakeUserPerformanceReportResultList){
					totalscans_per_min = totalscans_per_min + Double.parseDouble(result.getScans_per_min());
					totalarticles_per_min = totalarticles_per_min + Double.parseDouble(result.getArticles_per_min());
				}				
			}
		reportInputParams.put("stockTakePrint", stockTakeUserPerformanceReportParam.getStockTakePrint());
		reportInputParams.put("StoreNo", stockTakeUserPerformanceReportParam.getStoreNo());
		reportInputParams.put("StoreName", stockTakeUserPerformanceReportParam.getStoreName());
		reportInputParams.put("reportFor", stockTakeUserPerformanceReportParam.getReportFor());
		reportInputParams.put("reportForExists", stockTakeUserPerformanceReportParam.getReportFor().length() > 0 ? "Yes" : "");
		reportInputParams.put("count", new BigDecimal(stockTakeUserPerformanceReportResultList.size()));
		try{
		reportInputParams.put("totalscans_per_min",CommonUtils.formatTo2DecimalPlaces(Double.toString(totalscans_per_min/stockTakeUserPerformanceReportResultList.size())));
		reportInputParams.put("totalarticles_per_min",CommonUtils.formatTo2DecimalPlaces(Double.toString(totalarticles_per_min/stockTakeUserPerformanceReportResultList.size())));
		}catch(Exception e){
			System.out.println("exception"+e);
		}

		/*String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");*/

		/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeUserPerformanceReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();*/
		byte[] byos = jasper.printPdfReportTimeZone(stockTakeUserPerformanceReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request),jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeUserPerformancePdf.pdf", method=RequestMethod.GET)
	public byte[] downloadStockTakeUserPerformanceReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
