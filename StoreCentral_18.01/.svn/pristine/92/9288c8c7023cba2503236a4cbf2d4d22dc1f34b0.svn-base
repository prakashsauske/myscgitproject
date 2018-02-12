package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
import java.util.Map;
import java.util.Set;

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

import au.com.woolworths.portal.model.StockTakeArticleCountResult;
import au.com.woolworths.portal.param.StockTakeArticleCountParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.ReportGlobalVariables;
import au.com.woolworths.portal.util.CommonUtils;

@Controller
@RequestMapping(value = "*/stockTakeArticleCountreport")
@Scope("session")

public class StockTakeArticleCountController extends BaseController{
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['stockTakeArticleCountName']}")
	private String stockTakeArticleCountName = null;
	
	
	private byte[] pdfArray = null;
	private ArrayList<StockTakeArticleCountResult> excelArray = null;
	

	@RequestMapping(method = RequestMethod.POST, value = "/printStockTakeArticleCountReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printStockTakeArticleCountPDF(
			@RequestBody StockTakeArticleCountParam stockTakeArticleCountResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
		return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<StockTakeArticleCountResult> stockTakeArticleCountResult = null;		
		stockTakeArticleCountResult = stockTakeArticleCountResults.getReportResult();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(stockTakeArticleCountResult);
		String locationDetails = getLocationOrSubCategoryOfTheArticle(stockTakeArticleCountResult,true);
		String subCategoryDetails = getLocationOrSubCategoryOfTheArticle(stockTakeArticleCountResult,false);
		String formattedSubCat = subCategoryDetails == null ? "" : subCategoryDetails;
		String appendReportFor = " | Location : "+locationDetails+" | SubCategories :"+formattedSubCat;
		try{
		reportInputParams.put("stockTakePrint", stockTakeArticleCountResults.getStockTakePrint());	
		if(stockTakeArticleCountResults.getReportFor().equalsIgnoreCase("ALL"))
		{
			reportInputParams.put("reportFor", stockTakeArticleCountResults.getReportFor());
		}
		else
		{
			reportInputParams.put("reportFor", stockTakeArticleCountResults.getReportFor()+appendReportFor);
		}
		reportInputParams.put("storeNo", stockTakeArticleCountResults.getStoreNo());
		reportInputParams.put("storeName",stockTakeArticleCountResults.getStoreName());
		
		reportInputParams.put("totalCount", stockTakeArticleCountResults.getTotalCount());//To display total articles
		ReportGlobalVariables.GROUP_BY_VALUE = stockTakeArticleCountResults.getGroupBy();
		
		if(CommonUtils.isEmpty(ReportGlobalVariables.GROUP_BY_VALUE)){
			reportInputParams.put("applyGroupBy","");			
		}else{
			reportInputParams.put("applyGroupBy","Y");			
		}
		
		/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(stockTakeArticleCountName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
					reportInputParams).toByteArray();*/
		byte[] byos = jasper.printPdfReportTimeZone(stockTakeArticleCountName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
		pdfArray = byos;
		excelArray = stockTakeArticleCountResults.getReportResult();
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	private String getLocationOrSubCategoryOfTheArticle(List<StockTakeArticleCountResult> stockTakeArticleCountResult,Boolean isLocOrSubCatFlag) {
		
		
		Set<String> distinctLocationOrSubCatOfArticles = new LinkedHashSet<String>();
		int count = 0 ;
		StringBuilder sb = new StringBuilder();
		if(!stockTakeArticleCountResult.isEmpty())
		{
			for(StockTakeArticleCountResult locationOfArticleNo : stockTakeArticleCountResult)
			{
				
				
				distinctLocationOrSubCatOfArticles.add(isLocOrSubCatFlag==true ? locationOfArticleNo.getLocation_name() : locationOfArticleNo.getSubcat_name());
				
			}
			
			for(String distincLocationOrSubCatName : distinctLocationOrSubCatOfArticles)
			{
			sb = count == 0 ? sb.append(distincLocationOrSubCatName) :sb.append(","+distincLocationOrSubCatName);
			
			count ++ ;
			}
		}
		return sb.toString();
	}

	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeArticleCountReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}
	
	@ResponseBody
	@RequestMapping(value = "/downloadStockTakeArticleCountReportExcel.pdf", method=RequestMethod.GET)
	public String downloadArticleReportExcel(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		response.setContentType("text/csv");
		response.setHeader("Content-Disposition","attachment; filename=\"article_count_export.csv");
		StringBuffer writer=new StringBuffer();
		OutputStream out = response.getOutputStream();
		OutputStreamWriter outWriter = new OutputStreamWriter(out);
		
		writer.append("Article");
		writer.append(',');
		writer.append("EAN / TUN");
		writer.append(',');
		writer.append("Description");
		writer.append(',');
		writer.append("UOM");
		writer.append(',');
		writer.append("OM");
		writer.append(',');
		writer.append("Value ($)");
		writer.append(',');
		writer.append("Location");
		writer.append(',');
		writer.append("Base Count");
		writer.append(',');
		writer.append("Re-Count 1");
		writer.append(',');
		writer.append("Re-Count 2");
		writer.append(',');
		writer.append("Re-Count 3");
		writer.append(',');
		writer.append("Re-Count 4");
		writer.append(',');
		writer.append("Final Count");
		writer.append(',');
		writer.append("Total Value ($)");
		writer.append(',');
		writer.append("SOH");
		writer.append(',');
		writer.append('\n');
		writer.append('\n');
				
		Map<String, List<StockTakeArticleCountResult>> map = new HashMap<String, List<StockTakeArticleCountResult>>();
		for (StockTakeArticleCountResult row : excelArray) {
		   String key = row.getGroupByValue();
		   if (map.get(key) == null) {
		      map.put(key, new ArrayList<StockTakeArticleCountResult>());
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
			writer.append(map.get(key).get(i).getScanned_ean());
			writer.append(',');
			writer.append(map.get(key).get(i).getArticle_description_excel());
			writer.append(',');
			writer.append(map.get(key).get(i).getUom());
			writer.append(',');
			writer.append(map.get(key).get(i).getOm());
			writer.append(',');
			writer.append(map.get(key).get(i).getSell_price());
			writer.append(',');
			writer.append(map.get(key).get(i).getLocation_name());
			writer.append(',');
			writer.append(map.get(key).get(i).getBase_count());
			writer.append(',');
			writer.append(map.get(key).get(i).getRecount_1());
			writer.append(',');
			writer.append(map.get(key).get(i).getRecount_2());
			writer.append(',');
			writer.append(map.get(key).get(i).getRecount_3());
			writer.append(',');
			writer.append(map.get(key).get(i).getRecount_4());
			writer.append(',');
			writer.append(map.get(key).get(i).getFinal_count());
			writer.append(',');
			writer.append(map.get(key).get(i).getTotal_value());
			writer.append(',');
			writer.append(map.get(key).get(i).getSoh());
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
