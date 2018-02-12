/**controller used for create Stock transfer */
package au.com.woolworths.portal.controller;

import java.io.IOException;
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
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.GoodsMovementSummaryReportResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.GoodsMovementSummaryReportParam;
import au.com.woolworths.portal.param.StockAdjReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ApplicationSettingDAOImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author ganesh
 * 
 */
@Controller
@RequestMapping(value = "*/goodMovement")
@Scope("session")
public class GoodsMovementController extends BaseController {	

	@Value("#{properties['GoodsMovementSummary']}")
	private String screenCode;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['goodsMovementSummaryReportName']}")
	private String goodsMovementSummaryReportName = null;

	private byte[] pdfArray = null;
	
	GoodsMovementSummaryReportParam GoodsMovementSummaryReportParamGlobal;
	
	@RequestMapping(value = "/goodMovementSummOnPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView stockTransferOnPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("inside goodMovementSummOnPageLoad method start ");
		ModelMap model = null;
		ModelAndView modelAndView = null;
		Map<String, String> salesOrgMap = null;
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		model = new ModelMap();
		modelAndView = new ModelAndView("goodsMovementSummary");
		try {
			System.out
					.println("calling ApplicationSettingDAOImpl to get the list of sales org ");

			salesOrgMap = ApplicationSettingDAOImpl.getAllSalesOrg();

			System.out
					.println("response from ApplicationSettingDAOImpl to get the list of sales org ");
			model.addAttribute(
					"salesOrgMap",
					(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
							: new HashMap<String, String>());
		} catch (Exception e) {
			e.printStackTrace();
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		System.out.println("inside goodsMovementSummary Page Load method end ");
		return modelAndView;
	}
	

	@RequestMapping(method = RequestMethod.POST, value = "/printGoodsMovementSummaryReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printGoodsMovementSummaryReportPDF(
			@RequestBody GoodsMovementSummaryReportParam stockAdjResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		GoodsMovementSummaryReportParamGlobal=stockAdjResults;
		request.getSession(false).setAttribute("article", GoodsMovementSummaryReportParamGlobal);
		return CommonUtils.convertObjectTojson("success");
	}
	
	@ResponseBody
	@RequestMapping(value = "/downloadGoodsMovementSummaryPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadGoodsMovementSummaryPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			genPdfGMS(request);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		System.out.println("content lenght"+pdfArray.length);
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
		return null;
	}
	

	
	private boolean genPdfGMS(HttpServletRequest request) throws Throwable{
		GoodsMovementSummaryReportParam stockAdjResults=(GoodsMovementSummaryReportParam)request.getSession(false).getAttribute("article");
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<GoodsMovementSummaryReportResult> StockAdjList = null;
		try {

			reportInputParams.put("StoreNo", stockAdjResults.getStoreNo());
			reportInputParams.put("StoreName", stockAdjResults.getStoreName());
			reportInputParams
					.put("totalCount", stockAdjResults.getTotalCount());
			reportInputParams.put("fromDate", stockAdjResults.getFromDate());
			reportInputParams.put("toDate", stockAdjResults.getToDate());
			reportInputParams.put("deptOrArticle",
					stockAdjResults.getDeptOrArticle());
			reportInputParams.put("dept", stockAdjResults.getDept());
			
			
			String articleNos = populateArticleNos(stockAdjResults);
			reportInputParams.put("article", articleNos);
			//reportInputParams.put("uom", stockAdjResults.getUom());
			reportInputParams.put("reason", stockAdjResults.getReason());
			reportInputParams.put("date_time_final", stockAdjResults.getUsers());
			reportInputParams.put("users", stockAdjResults.getUsers());
			reportInputParams.put("addCriteria",
					stockAdjResults.getAddCriteria());
			reportInputParams.put("groupBy", stockAdjResults.getGroupBy());
			reportInputParams.put("userName", stockAdjResults.getUserName());
			reportInputParams.put("date", stockAdjResults.getDate());

			reportInputParams.put("adjFor", "Stock on Hand");
			StockAdjList = stockAdjResults.getResultList();
			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
					StockAdjList);
			byte[] byos = JasperReportUtil
					.getInstance().printPdfReportTimeZone(goodsMovementSummaryReportName, beanDS, jasperRptResponseHandler
									.getReportSourcePath(request),
							jasperRptResponseHandler
									.getReportBinPath(request), reportInputParams, request).toByteArray();
			pdfArray = byos;
		
			
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		}
		return true;
	}

	private String populateArticleNos(
			GoodsMovementSummaryReportParam stockAdjResults) {
		
		List<GoodsMovementSummaryReportResult> StockAdjList = stockAdjResults.getResultList();
		Set<String> distinctArticles = new LinkedHashSet<String>();
		int count = 0 ;
		StringBuilder sb = new StringBuilder();
		if(!StockAdjList.isEmpty())
		{
			for(GoodsMovementSummaryReportResult articleNo : StockAdjList)
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

}