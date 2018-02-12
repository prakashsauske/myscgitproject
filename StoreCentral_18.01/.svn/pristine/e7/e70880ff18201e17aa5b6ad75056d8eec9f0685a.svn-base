
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

import au.com.woolworths.portal.model.StockTakeTeamPerformanceReportResult;
import au.com.woolworths.portal.model.StockTeamPerformancePDFReport;
import au.com.woolworths.portal.param.StockTakeTeamPerformanceReportParam;
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
@RequestMapping(value = "*/stockTakeTeamPerformanceReport")
@Scope("session")
public class StockTakeTeamPerformanceReportController extends BaseController {

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['stockTakeTeamPerformanceReportName']}")
	private String stockTakeTeamPerformanceReportName = null;
	
	@Value("#{properties['stockTakeTeamPerformanceDefaultReportName']}")
	private String stockTakeTeamPerformanceDefaultReportName = null;

	private ModelMap model;
	
	private byte[] pdfArray = null;
	

	@RequestMapping(method = RequestMethod.POST, value = "/printReportStockTakeTeamPerformancePDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportStockTakeTeamPerformancePDF(
			@RequestBody StockTakeTeamPerformanceReportParam stockTakeTeamPerformanceReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<StockTakeTeamPerformanceReportResult> stockTakeTeamPerformanceReportResultList = null;		
		stockTakeTeamPerformanceReportResultList = stockTakeTeamPerformanceReportParam.getResultList();
		
		ArrayList<StockTeamPerformancePDFReport> stockTeamPerformancePDFReportList = new ArrayList<StockTeamPerformancePDFReport>();
		convertToPdfModel(stockTakeTeamPerformanceReportResultList, stockTeamPerformancePDFReportList);
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(stockTeamPerformancePDFReportList);
		
		try{
		reportInputParams.put("stockTakePrint", stockTakeTeamPerformanceReportParam.getStockTakePrint());
		reportInputParams.put("StoreNo", stockTakeTeamPerformanceReportParam.getStoreNo());
		reportInputParams.put("StoreName", stockTakeTeamPerformanceReportParam.getStoreName());
		reportInputParams.put("reporFor", stockTakeTeamPerformanceReportParam.getReportFor());
		reportInputParams.put("reportForExists", stockTakeTeamPerformanceReportParam.getReportFor().length() > 0 ? "Yes" : "");
		reportInputParams.put("count", String.valueOf(stockTakeTeamPerformanceReportResultList.size()));

		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");
		if(stockTakeTeamPerformanceReportParam.getFilterApplyClicked().equalsIgnoreCase("TRUE")){
			/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeTeamPerformanceReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
						reportInputParams).toByteArray();*/
			 byte[] byos = jasper.printPdfReportTimeZone(stockTakeTeamPerformanceReportName, beanDS,  jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
			 pdfArray = byos;
		}else{
			/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeTeamPerformanceDefaultReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
						reportInputParams).toByteArray();*/
			 byte[] byos = jasper.printPdfReportTimeZone(stockTakeTeamPerformanceDefaultReportName, beanDS,  jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
			 pdfArray = byos;
		}
		
		 
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}
	
	private void convertToPdfModel(List<StockTakeTeamPerformanceReportResult> stockTakeTeamPerformanceReportResultList,ArrayList<StockTeamPerformancePDFReport> stockTeamPerformancePDFReportList){
		
		StockTeamPerformancePDFReport stockTeamPerformancePDFReport = null;
		for(StockTakeTeamPerformanceReportResult stockTakeTeamPerformanceReportResult : stockTakeTeamPerformanceReportResultList){
			stockTeamPerformancePDFReport = new StockTeamPerformancePDFReport();
			stockTeamPerformancePDFReport.setClassField("");
			stockTeamPerformancePDFReport.setDeptName(stockTakeTeamPerformanceReportResult.getDepartment_name());
			stockTeamPerformancePDFReport.setCnt(stockTakeTeamPerformanceReportResult.getCnt());
			stockTeamPerformancePDFReport.setPercentage(stockTakeTeamPerformanceReportResult.getPercentage());
			stockTeamPerformancePDFReport.setOver99Perc(stockTakeTeamPerformanceReportResult.getPrcntg_over_99());
			stockTeamPerformancePDFReport.setOver99Val(stockTakeTeamPerformanceReportResult.getCnt_over_99());
			stockTeamPerformancePDFReport.setTotalPerc(stockTakeTeamPerformanceReportResult.getTotal_per());
			stockTeamPerformancePDFReport.setTotalVal(stockTakeTeamPerformanceReportResult.getTtl_cnt());
			stockTeamPerformancePDFReport.setUpto29Perc(stockTakeTeamPerformanceReportResult.getPrcntg_btw_10_29());
			stockTeamPerformancePDFReport.setUpto29Val(stockTakeTeamPerformanceReportResult.getCnt_btw_10_29());
			stockTeamPerformancePDFReport.setUpto49Perc(stockTakeTeamPerformanceReportResult.getPrcntg_btw_30_49());
			stockTeamPerformancePDFReport.setUpto49Val(stockTakeTeamPerformanceReportResult.getCnt_btw_30_49());
			stockTeamPerformancePDFReport.setUpto99Perc(stockTakeTeamPerformanceReportResult.getPrcntg_btw_50_99());
			stockTeamPerformancePDFReport.setUpto99Val(stockTakeTeamPerformanceReportResult.getCnt_btw_50_99());
			stockTeamPerformancePDFReport.setUpto9Perc(stockTakeTeamPerformanceReportResult.getPrcntg_upto_pls_or_mns_9());
			stockTeamPerformancePDFReport.setUpto9Val(stockTakeTeamPerformanceReportResult.getCnt_upto_pls_or_mns_9());
			
			stockTeamPerformancePDFReportList.add(stockTeamPerformancePDFReport);
		}
	}

	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeTeamPerformancePdf.pdf", method=RequestMethod.GET)
	public byte[] downloadStockTakeTeamPerformanceReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
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
