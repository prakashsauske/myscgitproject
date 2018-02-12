package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.PromSearchResult;
import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromoArticleResponce;
import au.com.woolworths.portal.model.PromoAuditTrail;
import au.com.woolworths.portal.model.PromoAuditTrailResponce;
import au.com.woolworths.portal.model.PromoDisplayType;
import au.com.woolworths.portal.model.PromoDisplayTypeResponse;
import au.com.woolworths.portal.model.PromoSales;
import au.com.woolworths.portal.model.PromotionServiceResponce;
import au.com.woolworths.portal.model.ReplenishmentPostResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.PromotionsAuditTrailParam;
import au.com.woolworths.portal.param.PromotionsPlanningParam;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

public class PromotionsPlanningServiceImpl extends CommonServiceImpl {

	@Value("#{url['PromotionsHierarchyServiceURL']}")
	private String promotionsHierarchyServiceURL;

	@Value("#{url['PromoArticlesUpdateServiceURL']}")
	private String promoArticlesUpdateServiceURL;

	@Value("#{url['PromotionsDisplayTypeServiceURL']}")
	private String promotionsDisplayTypeServiceURL;

	@Value("#{url['PromotionsAddtionalDtlsURL']}")
	private String promotionsAddtionalDtlsURL;
	
	@Value("#{url['PromotionsAddtionalDtlsMultiBuyURL']}")
	private String promotionsAddtionalDtlsMultiBuyURL;

	@Value("#{url['PromotionsAuditTrailURL']}")
	private String promotionsAuditTrailURL;

	@Value("#{url['UpdateSalesHistoryCommentsURL']}")
	private String updateSalesHistoryCommentsURL;

	@Value("#{url['PromotionsArticleServiceURL']}")
	private String promotionsArticleServiceURL;

	@Value("#{url['PromotionsArticleDtlsServiceURL']}")
	private String promotionsArticleDtlsServiceURL;

	@Value("#{url['PromotionsLockDtlsServiceURL']}")
	private String promotionsLockDtlsServiceURL;
	
	@Value("#{url['inStorePromotiondeactivateServiceURL']}")
	private String inStorePromotiondeactivateServiceURL;
	
	

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(PromotionsPlanningServiceImpl.class.getName());
	
	public ArrayList<PromSearchResult> getPromotionHierarchyDtls(
			PromotionsPlanningParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(promotionsHierarchyServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(param));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<PromotionServiceResponce> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

			promotionsHierarchyServiceURL, HttpMethod.POST, requestEntity,

			PromotionServiceResponce.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPromotionServiceResponceHelper() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getBody().getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0))
					return (ArrayList<PromSearchResult>) response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList();
				else {
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
					/*System.out.println("response.getBody().getPromotionServiceResponceHelper().getPromSearchResultList().get(0).getMsg() "
									+ response
											.getBody()
											.getPromotionServiceResponceHelper()
											.getPromSearchResultList().get(0)
											.getMsg());*/
				}
			}

			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}

	public Map<String, List<String>> getPromotionArticles(
			PromotionsPlanningParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(promotionsArticleServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(param));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<PromotionServiceResponce> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

			promotionsArticleServiceURL, HttpMethod.POST, requestEntity,

			PromotionServiceResponce.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPromotionServiceResponceHelper() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getBody().getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0)) {
					param.setCount(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getCount()
							.toString());
					return (LinkedHashMap<String, List<String>>) response
							.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getArticleList();

				} else
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
			}

			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}

	public void getLockDetails(PromotionsPlanningParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(promotionsLockDtlsServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(param));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<PromotionServiceResponce> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

			promotionsLockDtlsServiceURL, HttpMethod.POST, requestEntity,

			PromotionServiceResponce.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPromotionServiceResponceHelper() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getBody().getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0)) {
					// param.setCount(response.getBody().getPromotionServiceResponceHelper().getPromSearchResultList().get(0).getCount().toString());
					param.setLockFlag(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getLockFlag());
					param.setAutoForeFlag(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getAutoForeFlag());
					param.setDeptSentInLock(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getDeptSentInLock());

				} else
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
			}

		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}

	public ArrayList<PromoArticle> getPromotionArticleDetails(
			PromotionsPlanningParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(promotionsArticleDtlsServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		
	//	System.out.println(gson.toJson(param));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<PromotionServiceResponce> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

			promotionsArticleDtlsServiceURL, HttpMethod.POST, requestEntity,

			PromotionServiceResponce.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPromotionServiceResponceHelper() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getBody().getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0))
					return (ArrayList<PromoArticle>) response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0)
							.getPromArticleList();
				else
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
			}

			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}

	public ArrayList<PromoDisplayType> getPromoDisplayTypes(UserContext user) {

		PromoDisplayTypeResponse response = null;
		URI url = null;
		try {
			url = new URI(promotionsDisplayTypeServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					PromoDisplayTypeResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response != null
				&& response.getPromoDisplayTypeResponseHelper() != null
				&& response.getPromoDisplayTypeResponseHelper()
						.getPromoDisplayTypeList() != null
				&& response.getPromoDisplayTypeResponseHelper()
						.getPromoDisplayTypeList().get(0).getMsg() != null
				&& !(response.getPromoDisplayTypeResponseHelper()
						.getPromoDisplayTypeList().get(0).getMsg().trim()
						.length() > 0)) {

			return (ArrayList<PromoDisplayType>) response
					.getPromoDisplayTypeResponseHelper()
					.getPromoDisplayTypeList();
		}

		return null;

	}

	public ArrayList<PromoArticle> getPromoAddtionalDtls(
			PromotionsPlanningParam param,UserContext user) {
		StringBuffer promoArticleQueryString = null;
		// System.out.println("param.getArticleNo()__" + param.getArticleNo()
		// + "param.getWeekStartDate()__" + param.getWeekStartDate());

		promoArticleQueryString = new StringBuffer("storeNo/")
				.append(param.getSiteNo()).append("/salesOrg/")
				.append(param.getSalesOrg())
				.append("/articleNo/")
				.append(param.getArticleNo())
				// .append("/uom/")
				// .append(param.getUom())
				.append("/weekStartDate/")
				.append(param.getWeekStartDate().replace("/", ""));
		PromoArticleResponce response = null;
		URI url = null;
		try {
			url = new URI(promotionsAddtionalDtlsURL
					+ promoArticleQueryString.toString());
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					PromoArticleResponce.class);
		} catch (Exception e) {
			LOGGER.error(e);
			return null;
		}

		if (response != null
				&& response.getPromoArticleResponceHelper() != null
				&& response.getPromoArticleResponceHelper()
						.getPromoArticleList() != null
				&& response.getPromoArticleResponceHelper()
						.getPromoArticleList().get(0).getMsg() != null) {
			if (!(response.getPromoArticleResponceHelper()
					.getPromoArticleList().get(0).getMsg().trim().length() > 0))
				return (ArrayList<PromoArticle>) response
						.getPromoArticleResponceHelper().getPromoArticleList();
			else
				param.setMsg(response.getPromoArticleResponceHelper()
						.getPromoArticleList().get(0).getMsg());
		}

		return null;

	}
	public ArrayList<PromoArticle> getPromoAddtionalDtlsMultiBuy(
			PromotionsPlanningParam param,UserContext user) {
		StringBuffer promoArticleQueryString = null;
		// System.out.println("param.getArticleNo()__" + param.getArticleNo()
		// + "param.getWeekStartDate()__" + param.getWeekStartDate());

		promoArticleQueryString = new StringBuffer("storeNo/")
				.append(param.getSiteNo()).append("/salesOrg/")
				.append(param.getSalesOrg())
				.append("/articleNo/")
				.append(param.getArticleNo())
				// .append("/uom/")
				// .append(param.getUom())
				.append("/weekStartDate/")
				.append(param.getWeekStartDate().replace("/", ""));
		PromoArticleResponce response = null;
		URI url = null;
		try {
			url = new URI(promotionsAddtionalDtlsMultiBuyURL
					+ promoArticleQueryString.toString());
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					PromoArticleResponce.class);
		} catch (Exception e) {
			LOGGER.error(e);
			return null;
		}

		if (response != null
				&& response.getPromoArticleResponceHelper() != null
				&& response.getPromoArticleResponceHelper()
						.getPromoArticleList() != null
				&& response.getPromoArticleResponceHelper()
						.getPromoArticleList().get(0).getMsg() != null) {
			if (!(response.getPromoArticleResponceHelper()
					.getPromoArticleList().get(0).getMsg().trim().length() > 0))
				return (ArrayList<PromoArticle>) response
						.getPromoArticleResponceHelper().getPromoArticleList();
			else
				param.setMsg(response.getPromoArticleResponceHelper()
						.getPromoArticleList().get(0).getMsg());
		}

		return null;

	}

	public ArrayList<PromoAuditTrail> getPromoAuditDetails(
			PromotionsAuditTrailParam param,UserContext user) {

		StringBuffer promoArticleQueryString = null;

		promoArticleQueryString = new StringBuffer("storeNo/")
				.append(param.getSiteNo())
				.append("/salesOrg/")
				.append(param.getSalesOrg())
				.append("/articleNo/")
				.append(param.getArticleNo())
				.append("/uom/")
				.append((param.getUom() != null && param.getUom().trim() != "") ? param
						.getUom() : "null")
				.append("/type/")
				.append((param.getSearchByOptions() != null
						&& param.getSearchByOptions() != "" && param
						.getSearchByOptions().equalsIgnoreCase("reference")) ? "ean"
						: "null")
				.append("/srcInd/")
				.append((param.getSrcSupplyInd() != null && param
						.getSrcSupplyInd().trim() != "") ? param
						.getSrcSupplyInd() : "null")
				.append("/orderUom/")
				.append((param.getOrderUom() != null && param.getOrderUom()
						.trim() != "") ? param.getOrderUom() : "null")
				.append("/distribution_uom/")
				.append((param.getDistribution_uom() != null && param.getDistribution_uom()
						.trim() != "") ? param.getDistribution_uom() : "null")		
				.append("/startDate/")
				.append((param.getStartDate() != null && param.getStartDate()
						.trim() != "") ? PortalUtil.convertToDBDate(param
						.getStartDate()) : "null")
				.append("/endDate/")
				.append((param.getEndDate() != null && param.getEndDate()
						.trim() != "") ? PortalUtil.convertToDBDate(param
						.getEndDate()) : "null")
				.append("/recCount/")
				.append(pageSize)
				.append("/pageNo/")
				.append((param.getPageNo() != null && param.getPageNo() != "") ? param
						.getPageNo() : "1")
						//department/{department}/piUom/{piUom}/masUom/{masUom}/piOmVal/{piOmVal}
						.append("/department/")
				.append((param.getDepartment() != null && param.getDepartment()
						.trim().length() > 0) ? (param.getDepartment()) : "null")
						.append("/piUom/")
				.append((param.getPiUOM() != null && param.getPiUOM()
						.trim().length() > 0) ? (param.getPiUOM()) : "null")
						.append("/masUom/")
				.append((param.getMasArtUom() != null && param.getMasArtUom()
						.trim().length() > 0) ? (param.getMasArtUom()) : "null")
						.append("/piOmVal/")
				.append((param.getPiOmVal() != null && param.getPiOmVal()
						.trim().length() > 0) ? (param.getPiOmVal()) : "null");

		PromoAuditTrailResponce response = null;
		System.out.println(promotionsAuditTrailURL
					+ promoArticleQueryString.toString());
		URI url = null;
		try {
			url = new URI(promotionsAuditTrailURL
					+ promoArticleQueryString.toString());
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					PromoAuditTrailResponce.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response != null
				&& response.getPromoAuditTrailResponceHelper() != null
				&& response.getPromoAuditTrailResponceHelper()
						.getPromoAuditTrailList() != null
				&& response.getPromoAuditTrailResponceHelper()
						.getPromoAuditTrailList().get(0).getMsg() != null) {
			if (!(response.getPromoAuditTrailResponceHelper()
					.getPromoAuditTrailList().get(0).getMsg().trim().length() > 0))
				return (ArrayList<PromoAuditTrail>) response
						.getPromoAuditTrailResponceHelper()
						.getPromoAuditTrailList();
			else
				param.setMsg(response.getPromoAuditTrailResponceHelper()
						.getPromoAuditTrailList().get(0).getMsg());
		}

		return null;

	}

	public String updateSalesHistoryComments(List<PromoSales> promoSalesList,UserContext user) {

		String urlParam = null;

		// LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(updateSalesHistoryCommentsURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(promoSalesList));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				promoSalesList, postrequestHeaders);

		ResponseEntity<ReplenishmentPostResponse> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

			updateSalesHistoryCommentsURL, HttpMethod.POST, requestEntity,

			ReplenishmentPostResponse.class);
			if (response != null
					&& response.getBody() != null
					&& response.getBody().getReplenishmentPostResponseHelper() != null
					&& response.getBody().getReplenishmentPostResponseHelper()
							.getMsg() != null
					&& response.getBody().getReplenishmentPostResponseHelper()
							.getMsg().trim()
							.equalsIgnoreCase("Updated Successfully")) {
				return "true";
			}

		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
		return "false";
	}

	public ArrayList<PromSearchResult> updatePromoArticles(
			ArrayList<PromoArticle> promoArticleList,
			PromotionsPlanningParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);
		

		URI url;
		try {
			url = new URI(promoArticlesUpdateServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(promoArticleList));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				promoArticleList, postrequestHeaders);

		ResponseEntity<PromotionServiceResponce> response = null;

		try {
			response = getForPostRestTemplate(user).exchange(

			promoArticlesUpdateServiceURL, HttpMethod.POST, requestEntity,

			PromotionServiceResponce.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPromotionServiceResponceHelper() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getBody().getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0)) {
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
					return (ArrayList<PromSearchResult>) response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList();
				} else
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
			}
			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}

	public Map<String, List<PromoDisplayType>> getDisplayTypes(String siteNo,
			String salesOrg, String week,UserContext user) {

		StringBuffer urlParam = null;
		urlParam = new StringBuffer("/siteNo/")
				.append((siteNo != null && !siteNo.equals("")) ? siteNo
						: "null").append("/salesOrg/").append(salesOrg)
				.append("/week/").append(week);

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(promotionsDisplayTypeServiceURL + urlParam.toString());
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		System.out.println("url"+url);

		PromotionServiceResponce response = null;

		try {

			response = getForPostRestTemplate(user).getForObject(url,
					PromotionServiceResponce.class);

			if (response != null
					&& response != null
					&& response.getPromotionServiceResponceHelper() != null
					&& response.getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0)) {

					return (LinkedHashMap<String, List<PromoDisplayType>>) response
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0)
							.getPromoDisplayTypeMap();

				}
			}

			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}

}
