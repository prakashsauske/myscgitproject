package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.ArticleHierarchy;
import au.com.woolworths.portal.model.ArticlePOSInfo;
import au.com.woolworths.portal.model.ArticlePackBrkData;
import au.com.woolworths.portal.model.ArticleReplenishmentData;
import au.com.woolworths.portal.model.IntransitOrderDtl;
import au.com.woolworths.portal.model.LinkedArticleData;
import au.com.woolworths.portal.model.PlannedOrders;
import au.com.woolworths.portal.model.Replenishment;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.param.PlannedOrdersParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.IntransitOrderServiceImpl;
import au.com.woolworths.portal.service.PlannedFcstOrderServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;
import com.google.gson.JsonObject;

@Controller
@RequestMapping(value = "*/article")
@Scope("session")
public class ArticleDtlsController /*extends BaseController*/ {
	
	private UserContext userDetail;
	// private ZeroMPLReportParam paramForPagination;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	ArrayList<PlannedOrders> plannedOrdersList = null;
	private int REC_COUNT = 20;
	private Integer TOTAL_RECORDS;

	@Autowired
	private PlannedFcstOrderServiceImpl plannedFcstOrderServiceImpl;
	
	@Autowired
	private IntransitOrderServiceImpl intransitOrderService;
	
	@Autowired
	private ArticleServiceImpl articleService;
	


	@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("plannedOrder") PlannedOrdersParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<PlannedOrders> plannedOrdersListTemp = null;
		param.setSiteNo(userDetail.getSiteNo());
		param.setSalesOrg(userDetail.getSalesOrg().toString());

		if (param.getPageNo() != null && param.getPageNo() != ""
				&& plannedOrdersList != null && plannedOrdersList.size() > 0) {
			
			int pageStart, pageEnd, recordCount, pageNo;
			recordCount = REC_COUNT;
			pageNo = Integer.parseInt(param.getPageNo());

			if (pageNo == 1)
				pageStart = 1;
			else
				pageStart = ((pageNo - 1) * recordCount) + 1;

			if ((pageNo * recordCount) > plannedOrdersList.size())
				pageEnd = plannedOrdersList.size();
			else
				pageEnd = pageNo * recordCount;

			
			plannedOrdersListTemp = new ArrayList<PlannedOrders>();
			for (int i = pageStart; i < pageEnd; i++) {
				plannedOrdersList.get(i).setMsg(TOTAL_RECORDS.toString());
				plannedOrdersListTemp.add(plannedOrdersList.get(i));
			}
			// paramForPagination.setPageNo(param.getPageNo());
			// param = paramForPagination;
			return convertPlannedOrdersListTojson(plannedOrdersListTemp, "");
		}
		/*
		 * else{ paramForPagination=param; }
		 */
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			plannedOrdersList = plannedFcstOrderServiceImpl.generateReport(param,user);
			if (plannedOrdersList == null && param.getMsg() == null)
				param.setMsg(EXCEPTION);
			else if (plannedOrdersList != null && plannedOrdersList.size() > 0) {
				if (plannedOrdersList.get(0).getMsg() != null
						&& !plannedOrdersList.get(0).getMsg().trim().equals("")
						&& Integer.parseInt(plannedOrdersList.get(0).getMsg()
								.trim()) > 20) {
					plannedOrdersListTemp = new ArrayList<PlannedOrders>();
					TOTAL_RECORDS = Integer.parseInt(plannedOrdersList.get(0)
							.getMsg().trim());
					for (int i = 0; i < 20; i++) {
						plannedOrdersListTemp.add(plannedOrdersList.get(i));
					}
					return convertPlannedOrdersListTojson(
							plannedOrdersListTemp, "");
				}
				param.setMsg("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertPlannedOrdersListTojson(plannedOrdersList, param.getMsg());

	}

	private String convertPlannedOrdersListTojson(
			List<PlannedOrders> plannedOrdersList, String msg) {

		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, plannedOrdersList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		

		return "{\"data\":" +Constants.convertToJsonString(plannedOrdersList)+ ",\"msg\":\"" + msg + "\"}";
	}
	
	private String convertIntrasitOrderListTojson(
			List<IntransitOrderDtl> intransitOrderDtlList, String msg) {

		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, intransitOrderDtlList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		

		return "{\"data\":" + Constants.convertToJsonString(intransitOrderDtlList) + ",\"msg\":\"" + msg + "\"}";
	}


	@RequestMapping(value = "/getIntrasitOrderDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getIntrasitOrderDtl(
			@ModelAttribute("plannedOrder") AllocationOrderSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<IntransitOrderDtl> intransitOrderDtlList = null;
		param.setSiteNo(userDetail.getSiteNo());
		//param.setSalesOrg(userDetail.getSalesOrg().toString());

		
		try {
			intransitOrderDtlList = intransitOrderService.getIntransitOrderDtls(param,userDetail);
			if (intransitOrderDtlList == null && param.getMsg() == null)
				{
				param.setMsg(EXCEPTION);
				}
			else if (intransitOrderDtlList != null && intransitOrderDtlList.size() > 0) {
					return convertIntrasitOrderListTojson(intransitOrderDtlList, "");
				}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertIntrasitOrderListTojson(intransitOrderDtlList, param.getMsg());

	}
	
	@RequestMapping(value = "/getArticlePOSData.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticlePOSData(
			@ModelAttribute("plannedOrder") ArticleSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<ArticlePOSInfo> intransitOrderDtlList = null;
		param.setSiteNo(userDetail.getSiteNo());
		//param.setSalesOrg(userDetail.getSalesOrg().toString());

		
		try {
			intransitOrderDtlList = articleService.getArticlePOSData(param,userDetail);
			if (intransitOrderDtlList == null && param.getMsg() == null)
				{
				param.setMsg(EXCEPTION);
				}
			else if (intransitOrderDtlList != null && intransitOrderDtlList.size() > 0) {
					return convertPOSDataTojson(intransitOrderDtlList, "");
				}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertPOSDataTojson(intransitOrderDtlList, param.getMsg());

	}
	
	/*@RequestMapping(value = "/getArticleReplenishData.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleReplenishData(
			@ModelAttribute("plannedOrder") ArticleSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<ArticleReplenishmentData> intransitOrderDtlList = null;
		param.setSiteNo(userDetail.getSiteNo());
		//param.setSalesOrg(userDetail.getSalesOrg().toString());

		
		try {
			intransitOrderDtlList = articleService.getArticleReplenishmentData(param);
			if (intransitOrderDtlList == null && param.getMsg() == null)
				{
				param.setMsg(EXCEPTION);
				}
			else if (intransitOrderDtlList != null && intransitOrderDtlList.size() > 0) {
					return convertReplenishDataTojson(intransitOrderDtlList, "");
				}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertReplenishDataTojson(intransitOrderDtlList, param.getMsg());

	}
	
	@RequestMapping(value = "/getArticlePackBrkData.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticlePackBrkData(
			@ModelAttribute("plannedOrder") ArticleSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<ArticlePackBrkData> articlePackBrkDataList = null;
		ArrayList<ArticlePackBreakdown> articlePackBreakdownList = null;
		ArrayList<LinkedArticleData> linkedArticleDataList = null;
		String msg1="";
		String msg2="";
		String msg3="";
		Gson gson=null;
		JsonObject jobj=null;
		param.setSiteNo(userDetail.getSiteNo());

		if(param.getOption()!=null){
			if(param.getOption().equals("Y")){
			try {
			articlePackBrkDataList = articleService.getArticlePackBrkData(param);
			if (articlePackBrkDataList == null && param.getMsg() == null)
				{
				msg1=Constants.EXCEPTION;
				}
			else if(articlePackBrkDataList == null && param.getMsg() != null){
				msg1=param.getMsg();
				}
			else if(articlePackBrkDataList == null){
				msg1=Constants.NDF;
				}
		} catch (Exception e) {
			e.printStackTrace();
			msg1=EXCEPTION;
		}
		param.setMsg("");
		
		try {
			articlePackBreakdownList = articleService.getPackBreakArticles(param);
			if (articlePackBreakdownList == null && param.getMsg() == null)
			{
			msg2=Constants.EXCEPTION;
			}
		else if(articlePackBreakdownList == null && param.getMsg() != null){
			msg2=param.getMsg();
			}
		else if(articlePackBreakdownList == null){
			msg2=Constants.NDF;
			}
		} catch (Exception e) {
			e.printStackTrace();
			msg2=EXCEPTION;
		}
		updatePackBrkList(articlePackBrkDataList,articlePackBreakdownList);
		}else{

		try {
			linkedArticleDataList = articleService.getLinkedArticle(param);
			if (linkedArticleDataList == null && param.getMsg() == null)
			{
			msg3=Constants.EXCEPTION;
			}
		else if(linkedArticleDataList == null && param.getMsg() != null){
			msg3=param.getMsg();
			}
		else if(linkedArticleDataList == null){
			msg3=Constants.NDF;
			}
		} catch (Exception e) {
			e.printStackTrace();
			msg3=Constants.EXCEPTION;
		}
		}
		}
			gson=new Gson();
			jobj=new JsonObject();
			
			jobj.addProperty("msg1", msg1);
			jobj.addProperty("msg2", msg2);
			jobj.addProperty("msg3", msg3);
			jobj.addProperty("pbdData", gson.toJson(articlePackBrkDataList));
			jobj.addProperty("pbk", gson.toJson(articlePackBreakdownList));
			jobj.addProperty("link", gson.toJson(linkedArticleDataList));
			
		return jobj.toString();

	}
	private void updatePackBrkList(List<ArticlePackBrkData> articlePackBrkDataList,List<ArticlePackBreakdown> articlePackBreakdownList){
	Map<String,ArrayList<ArticlePackBrkData>> articlePackBrkDataMap=null;
	ArrayList<ArticlePackBrkData> articlePackBrkDataLst=null;
	
	Map<String,ArrayList<ArticlePackBreakdown>> articlePackBreakdownMap=null;
	ArrayList<ArticlePackBreakdown> articlePackBreakdownLst=null;
		if(articlePackBrkDataList!=null && articlePackBrkDataList.size()>0 && articlePackBreakdownList!=null && articlePackBreakdownList.size()>0){
			articlePackBrkDataMap=new LinkedHashMap<String, ArrayList<ArticlePackBrkData>>();
			articlePackBreakdownMap=new LinkedHashMap<String, ArrayList<ArticlePackBreakdown>>();
		for(ArticlePackBrkData pbr : articlePackBrkDataList){
			if(articlePackBrkDataMap.containsKey(pbr.getUom())){
				articlePackBrkDataLst=articlePackBrkDataMap.get(pbr.getUom());
				articlePackBrkDataLst.add(pbr);
			}else{
				articlePackBrkDataLst=new ArrayList<ArticlePackBrkData>();
				articlePackBrkDataLst.add(pbr);
			}
			articlePackBrkDataMap.put(pbr.getUom(), articlePackBrkDataLst);
		}
		for(ArticlePackBreakdown pbr : articlePackBreakdownList){
			if(articlePackBreakdownMap.containsKey(pbr.getBreakdown())){
				articlePackBreakdownLst=articlePackBreakdownMap.get(pbr.getBreakdown());
				articlePackBreakdownLst.add(pbr);
			}else{
				articlePackBreakdownLst=new ArrayList<ArticlePackBreakdown>();
				articlePackBreakdownLst.add(pbr);
			}
			articlePackBreakdownMap.put(pbr.getBreakdown(), articlePackBreakdownLst);
		}
		if(articlePackBreakdownMap!=null && articlePackBreakdownMap.size()>0 && articlePackBrkDataMap!=null && articlePackBrkDataMap.size()>0){
			Iterator it=articlePackBrkDataMap.entrySet().iterator();
			articlePackBrkDataList=new ArrayList<ArticlePackBrkData>();
			while(it.hasNext()){
				
				Map.Entry pairs=(Entry) it.next();
			articlePackBrkDataList.addAll(((List<ArticlePackBrkData>) pairs.getValue()));
			}
			System.out.println("articlePackBrkDataList__ size"+articlePackBrkDataList.size());
		}
		if(articlePackBrkDataList!=null && articlePackBrkDataList.size()>0)
			{
			for(ArticlePackBrkData pbd : articlePackBrkDataList){
				if(articlePackBreakdownMap.containsKey(pbd.getZ2ean()))
				{
					pbd.setDesc(articlePackBreakdownMap.get(pbd.getZ2ean()).get(0).getDescription());
				pbd.setScanDesc(articlePackBreakdownMap.get(pbd.getZ2ean()).get(0).getScanDesc());
				}
				else{
					pbd.setDesc("");
					pbd.setScanDesc("");
				}
			}
			}
	}	
	}*/
	private String convertPOSDataTojson(
			List<ArticlePOSInfo> articlePOSInfoList, String msg) {

		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articlePOSInfoList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}

		System.out.println("stw.toString()" + stw.toString());*/

		return "{\"data\":" + Constants.convertToJsonString(articlePOSInfoList) + ",\"msg\":\"" + msg + "\"}";
	}
	
	private String convertPackBrkDataTojson(
			List<ArticlePackBrkData> articlePackBrkDataList, String msg) {

		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articlePackBrkDataList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}

		System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}
	
	private String convertReplenishDataTojson(
			List<ArticleReplenishmentData> articleReplenishmentDataList, String msg) {

		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articleReplenishmentDataList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}

		System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}
	
	/*@RequestMapping(value = "/getArticleReplenishData.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleReplenishData(
			@ModelAttribute("plannedOrder") ArticleSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<ArticleReplenishmentData> intransitOrderDtlList = null;
		param.setSiteNo(userDetail.getSiteNo());
		//param.setSalesOrg(userDetail.getSalesOrg().toString());

		
		try {
			intransitOrderDtlList = articleService.getArticleReplenishmentData(param);
			if (intransitOrderDtlList == null && param.getMsg() == null)
				{
				param.setMsg(EXCEPTION);
				}
			else if (intransitOrderDtlList != null && intransitOrderDtlList.size() > 0) {
					return convertReplenishDataTojson(intransitOrderDtlList, "");
				}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertReplenishDataTojson(intransitOrderDtlList, param.getMsg());

	}*/
	
	@RequestMapping(value = "/getArticlePackBrkData.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticlePackBrkData(
			@ModelAttribute("plannedOrder") ArticleSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<ArticlePackBrkData> articlePackBrkDataList = null;
		ArrayList<LinkedArticleData> linkedArticleDataList = null;
		String msg1="";
		String msg3="";
		Gson gson=null;
		JsonObject jobj=null;
		param.setSiteNo(userDetail.getSiteNo());

		if(param.getOption()!=null){
			if(param.getOption().equals("Y")){
			try {
			articlePackBrkDataList = articleService.getArticlePackBrkData(param,userDetail);
			if (articlePackBrkDataList == null && param.getMsg() == null)
				{
				msg1=Constants.EXCEPTION;
				}
			else if(articlePackBrkDataList == null && param.getMsg() != null){
				msg1=param.getMsg();
				}
			else if(articlePackBrkDataList == null){
				msg1=Constants.NDF;
				}
		} catch (Exception e) {
			e.printStackTrace();
			msg1=EXCEPTION;
		}
		param.setMsg("");
		
		}
		if(param.getLinkFlag()!=null && param.getLinkFlag().equals("Y")){

		try {
			linkedArticleDataList = articleService.getLinkedArticle(param,userDetail);
			if (linkedArticleDataList == null && param.getMsg() == null)
			{
			msg3=Constants.EXCEPTION;
			}
		else if(linkedArticleDataList == null && param.getMsg() != null){
			msg3=param.getMsg();
			}
		else if(linkedArticleDataList == null){
			msg3=Constants.NDF;
			}
		} catch (Exception e) {
			e.printStackTrace();
			msg3=Constants.EXCEPTION;
		}
		}
		}
			gson=new Gson();
			jobj=new JsonObject();
			
			jobj.addProperty("msg1", msg1);
			jobj.addProperty("msg3", msg3);
			jobj.addProperty("pbdData", gson.toJson(articlePackBrkDataList));
			jobj.addProperty("link", gson.toJson(linkedArticleDataList));
			
		return jobj.toString();

	}
	
	@RequestMapping(value = "/getArticleHierarchy.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleHierarchy(
			@ModelAttribute("plannedOrder") AllocationOrderSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<ArticleHierarchy> articleHierarchy = null;
		param.setSiteNo(userDetail.getSiteNo());
		//param.setSalesOrg(userDetail.getSalesOrg().toString());

		
		try {
			articleHierarchy = articleService.getArticleHierarchy(param,userDetail);
			if (articleHierarchy == null && param.getMsg() == null)
				{
				param.setMsg(EXCEPTION);
				}
			else if (articleHierarchy != null && articleHierarchy.size() > 0) {
					return convertArticleHierarchyListTojson(articleHierarchy, "");
				}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertArticleHierarchyListTojson(articleHierarchy, param.getMsg());

	}
	
	private String convertArticleHierarchyListTojson(
			List<ArticleHierarchy> articleHierarchyList, String msg) {
/*
		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articleHierarchyList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		

		return "{\"data\":" + Constants.convertToJsonString(articleHierarchyList) + ",\"msg\":\"" + msg + "\"}";
	}
	
	
	@RequestMapping(value = "/getReplenishment.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getReplenishment(
			@ModelAttribute("plannedOrder") AllocationOrderSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Replenishment> replenishmentDtl = null;
		param.setSiteNo(userDetail.getSiteNo());
		//param.setSalesOrg(userDetail.getSalesOrg().toString());

		
		try {
			replenishmentDtl = articleService.getReplenishmentDtl(param,userDetail);
			if (replenishmentDtl == null && param.getMsg() == null)
				{
				param.setMsg(EXCEPTION);
				}
			else if (replenishmentDtl != null && replenishmentDtl.size() > 0) {
					return convertReplenishmentDtlListTojson(replenishmentDtl, "");
				}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertReplenishmentDtlListTojson(replenishmentDtl, param.getMsg());

	}
	
	private String convertReplenishmentDtlListTojson(
			List<Replenishment> replenishmentList, String msg) {

		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, replenishmentList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		

		return "{\"data\":" + Constants.convertToJsonString(replenishmentList) + ",\"msg\":\"" + msg + "\"}";
	}
	
}
