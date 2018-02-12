package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.util.HashMap;
import java.util.LinkedHashSet;
import java.util.List;
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
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.StockAdjReportMPLFacingsResult;
import au.com.woolworths.portal.model.StockAdjReportResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.StockAdjReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/stockAdjReport")
@Scope("session")
public class StockAdjReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportStockAdj']}")
	private String screenCode;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['stockAdjReportName']}")
	private String stockAdjReportName = null;

	@Value("#{properties['stockAdjReportNameArticle']}")
	private String stockAdjReportNameArticle = null;

	@Value("#{properties['stockAdjReportNameMPL']}")
	private String stockAdjReportNameMPL = null;

	@Value("#{properties['stockAdjReportNameFacings']}")
	private String stockAdjReportNameFacings = null;

	private byte[] pdfArray = null;
	
	private byte[] pdfArraypop = null;
	
	StockAdjReportParam stockAdjResultsGlobal;

	@RequestMapping(value = "/loadStockAdjReport.htm", method = RequestMethod.GET)
	public ModelAndView loadStockAdjReport(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("ReportStockAdj");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printStockAdjReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printStockAdjReportPDF(
			@RequestBody StockAdjReportParam stockAdjResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		stockAdjResultsGlobal=stockAdjResults;
		request.getSession(false).setAttribute("article", stockAdjResultsGlobal);
		return CommonUtils.convertObjectTojson("success");
	}
	
	private boolean genPdf(HttpServletRequest request) throws Throwable{
		StockAdjReportParam stockAdjResults=(StockAdjReportParam)request.getSession(false).getAttribute("article");
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<StockAdjReportResult> StockAdjList = null;
		List<StockAdjReportMPLFacingsResult> StockAdjListMPLFacings = null;

		try {
			// reportInputParams.put("reportResult",
			// inventoryReportsResults.getResultList());

			reportInputParams.put("StoreNo", stockAdjResults.getStoreNo());
			reportInputParams.put("StoreName", stockAdjResults.getStoreName());
			reportInputParams
					.put("totalCount", stockAdjResults.getTotalCount());// To
																		// display
																		// total
																		// articles
			reportInputParams.put("fromDate", stockAdjResults.getFromDate());
			reportInputParams.put("toDate", stockAdjResults.getToDate());
			reportInputParams.put("deptOrArticle",
					stockAdjResults.getDeptOrArticle());
			reportInputParams.put("dept", stockAdjResults.getDept());
			
			
			String articleNos = populateArticleNos(stockAdjResults);
			reportInputParams.put("article", articleNos);
			
			
			
			reportInputParams.put("reason", stockAdjResults.getReason());
			reportInputParams.put("users", stockAdjResults.getUsers());
			reportInputParams.put("addCriteria",
					stockAdjResults.getAddCriteria());
			reportInputParams.put("groupBy", stockAdjResults.getGroupBy());
			reportInputParams.put("userName", stockAdjResults.getUserName());
			reportInputParams.put("date", stockAdjResults.getDate());

			if (stockAdjResults.getAdjFor().equalsIgnoreCase("SOH")) {
				reportInputParams.put("adjFor", "Stock on Hand");
				StockAdjList = stockAdjResults.getResultList();
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
						StockAdjList);
				/*byte[] byos = JasperReportUtil
						.getInstance()
						.printPdfReport(
								stockAdjResults.getSrc() != null
										&& stockAdjResults.getSrc()
												.equalsIgnoreCase("print") ? stockAdjReportNameArticle
										: stockAdjReportName,
								beanDS,
								jasperRptResponseHandler
										.getReportSourcePath(request),
								jasperRptResponseHandler
										.getReportBinPath(request),
								reportInputParams).toByteArray();*/
				byte[] byos = JasperReportUtil
						.getInstance().printPdfReportTimeZone(stockAdjResults.getSrc() != null
										&& stockAdjResults.getSrc()
												.equalsIgnoreCase("print") ? stockAdjReportNameArticle
										: stockAdjReportName, beanDS, jasperRptResponseHandler
										.getReportSourcePath(request),
								jasperRptResponseHandler
										.getReportBinPath(request), reportInputParams, request).toByteArray();
				pdfArray = byos;
			} else if (stockAdjResults.getAdjFor().equalsIgnoreCase("M")) {
				reportInputParams.put("adjFor",
						"Min. Presentation Level (MPL) & Shelf Capacity");
				StockAdjListMPLFacings = stockAdjResults
						.getResultListMPLFacings();
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
						StockAdjListMPLFacings);
				/*byte[] byos = JasperReportUtil
						.getInstance()
						.printPdfReport(
								stockAdjReportNameMPL,
								beanDS,
								jasperRptResponseHandler
										.getReportSourcePath(request),
								jasperRptResponseHandler
										.getReportBinPath(request),
								reportInputParams).toByteArray();*/
				
				byte[] byos = JasperReportUtil
						.getInstance().printPdfReportTimeZone(stockAdjReportNameMPL, beanDS, jasperRptResponseHandler
								.getReportSourcePath(request),
						jasperRptResponseHandler
								.getReportBinPath(request), reportInputParams, request).toByteArray();
				pdfArray = byos;
			} else if (stockAdjResults.getAdjFor().equalsIgnoreCase("F")) {
				reportInputParams.put("adjFor", "Facings");
				StockAdjListMPLFacings = stockAdjResults
						.getResultListMPLFacings();
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
						StockAdjListMPLFacings);
				/*byte[] byos = JasperReportUtil
						.getInstance()
						.printPdfReport(
								stockAdjReportNameFacings,
								beanDS,
								jasperRptResponseHandler
										.getReportSourcePath(request),
								jasperRptResponseHandler
										.getReportBinPath(request),
								reportInputParams).toByteArray();*/
				
				byte[] byos = JasperReportUtil
						.getInstance().printPdfReportTimeZone(stockAdjReportNameFacings, beanDS,jasperRptResponseHandler
								.getReportSourcePath(request),
						jasperRptResponseHandler
								.getReportBinPath(request), reportInputParams, request).toByteArray();
				pdfArray = byos;
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}


	@ResponseBody
	@RequestMapping(value = "/downloadStockAdjReportPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
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
	private String populateArticleNos(
			StockAdjReportParam stockAdjResults) {
		
		List<StockAdjReportResult> StockAdjList = stockAdjResults.getResultList();
		Set<String> distinctArticles = new LinkedHashSet<String>();
		int count = 0 ;
		StringBuilder sb = new StringBuilder();
		if(!StockAdjList.isEmpty())
		{
			for(StockAdjReportResult articleNo : StockAdjList)
			{
				
				distinctArticles.add(articleNo.getArticle_no());
				
			}
			
			for(String distincArticle : distinctArticles)
			{
			sb = count == 0 ? sb.append(distincArticle) :sb.append(","+distincArticle);
			
			count ++ ;
			}
		}
		return sb.toString();
		
	}
	/*
	 * @Override public String formUrlParam(MandatoryReportParam param) { //
	 * TODO Auto-generated method stub return null; }
	 */

}
