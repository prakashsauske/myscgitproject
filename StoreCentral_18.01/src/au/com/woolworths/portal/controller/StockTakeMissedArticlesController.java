package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

import au.com.woolworths.portal.model.StockTakeMissedArticlesResult;
import au.com.woolworths.portal.param.StockTakeMissedArticlesParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;

@Controller
@RequestMapping(value = "*/stockTakeMissedArticlesCountreport")
@Scope("session")

public class StockTakeMissedArticlesController extends BaseController{
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['stockTakeMissedArticleCountName']}")
	private String stockTakeMissedArticleCountName = null;
	
	private byte[] pdfArray = null;
	private ArrayList<StockTakeMissedArticlesResult> excelArray = null;

	@RequestMapping(method = RequestMethod.POST, value = "/printStockTakeMissedArticleCountReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printStockTakeMissedArticlesPDF(
			@RequestBody StockTakeMissedArticlesParam stockTakeMissedArticlesResult,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<StockTakeMissedArticlesResult> stockTakeMissedArticleResult = null;		
		stockTakeMissedArticleResult = stockTakeMissedArticlesResult.getReportResult();
		excelArray = stockTakeMissedArticlesResult.getReportResult();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(stockTakeMissedArticleResult);

		try{
		reportInputParams.put("stockTakePrint", stockTakeMissedArticlesResult.getStockTakePrint());
		reportInputParams.put("reportFor", stockTakeMissedArticlesResult.getReportFor());
		reportInputParams.put("storeNo", stockTakeMissedArticlesResult.getStoreNo());
		reportInputParams.put("storeName",stockTakeMissedArticlesResult.getStoreName());
		reportInputParams.put("applyGroupby",stockTakeMissedArticlesResult.getApplyGroupby());
		
		reportInputParams.put("totalCount", stockTakeMissedArticlesResult.getTotalCount());//To display total articles

		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");

		/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeMissedArticleCountName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();*/
		byte[] byos = jasper.printPdfReportTimeZone(stockTakeMissedArticleCountName, beanDS,  jasperRptResponseHandler.getReportSourcePath(request),jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeMissedArticleReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeMissedArticleReportExcel.pdf", method=RequestMethod.GET)
	public String downloadMissedReportExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		response.setContentType("text/csv");
		response.setHeader("Content-Disposition","attachment; filename=\"missed_article_export.csv");
		StringBuffer writer=new StringBuffer();
		OutputStream out = response.getOutputStream();
		OutputStreamWriter outWriter = new OutputStreamWriter(out);

		writer.append("Article");
		writer.append(',');
		writer.append("Description");
		writer.append(',');
		writer.append("UOM");
		writer.append(',');
		writer.append("OM");
		writer.append(',');
		writer.append("Value ($)");
		writer.append(',');
		/*writer.append("Count");
		writer.append(',');*/
		writer.append("SOH");
		writer.append(',');
		writer.append("Last Sold");
		writer.append('\n');
		writer.append('\n');
				
		Map<String, List<StockTakeMissedArticlesResult>> map = new HashMap<String, List<StockTakeMissedArticlesResult>>();
		for (StockTakeMissedArticlesResult row : excelArray) {
		   String key = row.getSubcat_name();
		   if (map.get(key) == null) {
		      map.put(key, new ArrayList<StockTakeMissedArticlesResult>());
		   }
		   map.get(key).add(row);
		}
		
		for (String key : map.keySet()) {
			writer.append(key);
			writer.append(',');
			writer.append('\n');
			
			for(int i=0;i<map.get(key).size();i++){
			writer.append(map.get(key).get(i).getArticle_number_indi());
			writer.append(',');
			writer.append(map.get(key).get(i).getArticle_description_excel());
			writer.append(',');
			writer.append(map.get(key).get(i).getBase_uom());
			writer.append(',');
			writer.append(map.get(key).get(i).getOm());
			writer.append(',');
			writer.append(map.get(key).get(i).getSell_price());
			writer.append(',');
			/*writer.append(map.get(key).get(i).getCount());
			writer.append(',');*/
			writer.append(map.get(key).get(i).getCurrent_soh());
			writer.append(',');
			writer.append(map.get(key).get(i).getLast_sale_date());
			writer.append(',');
			writer.append('\n');
		}
		}
		outWriter.write(writer.toString());
		outWriter.flush();
		/*outWriter.close();
		out.close();*/
		return null;
	}
	/*@Override
	public String formUrlParam(MandatoryReportParam param) {
		// TODO Auto-generated method stub
		return null;
	}*/


}
