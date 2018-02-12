package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromotionServiceResponce;
import au.com.woolworths.portal.model.SiteHierarchy;
import au.com.woolworths.portal.model.SiteHierarchyResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.PromoArticleReviewParam;

public class SiteHierarchyServiceImpl extends CommonServiceImpl {

	@Value("#{url['SiteHierarchyServiceURL']}")
	private String siteHierarchyServiceURL;

	@Value("#{url['SiteHierarchyDetailsServiceURL']}")
	private String siteHierarchyDetailsServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(SiteHierarchyServiceImpl.class.getName());
	
	public ArrayList<SiteHierarchy> getSiteHierarchy(String banner,String state,String region,
			String codeType,UserContext user) {

		StringBuffer urlParam = new StringBuffer();
		// urlParam = null;

		urlParam.append("/banner/" + banner);
		if (state != null) {

			urlParam.append("/state/" + state);

		}else{
			urlParam.append("/state/" + state);
		}
		if (region != null) {

			urlParam.append("/region/" + region.trim().replaceAll("\\s+", "_").replaceAll("/", "@"));

		}else{
			urlParam.append("/region/" + region);
		}

		if (codeType != null) {

			urlParam.append("/siteCodeType/" + codeType);

		}else{
			urlParam.append("/siteCodeType/null");
		}
		

		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";
		LOGGER.info(urlParam.toString());

		SiteHierarchyResponse response = null;
		URI url = null;
		try {
			url = new URI(siteHierarchyServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					SiteHierarchyResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		}

		return (ArrayList<SiteHierarchy>) response.getResponse()
				.getSiteHierarchyList();

	}

	public ArrayList<PromoArticle> getSiteHierarchyDetails(
			PromoArticleReviewParam param,UserContext user) {

		StringBuffer urlParam = new StringBuffer();
		// urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().trim().equals("")) {

			urlParam.append("/storeNo/" + param.getSiteNo().trim());

		}

		if (param.getDepartmentList() != null && !param.getDepartmentList().trim().equals("")) {

			urlParam.append("/salesOrg/" + param.getDepartmentList().trim());

		}

		if (param.getArticleNo() != null && !param.getArticleNo().trim().equals("")) {

			urlParam.append("/articleNo/" + param.getArticleNo().trim());

		}

		if (param.getUom() != null && !param.getUom().trim().equals("")) {

			urlParam.append("/uom/" + param.getUom().trim());

		}

		urlParam.append("/storeHiertype/1");
		if (param.getSegme() != null && !param.getSegme().trim().equals("")) {
			// urlParam.append("/storeHierType/" + param.getStoreHierType());

			urlParam.append("/area/" + param.getSegme().trim().replaceAll("\\s+", "_").replaceAll("/", "@")); //CR modification (search by area name)

		} else {
			urlParam.append("/area/null");
		}
		if (param.getSubCat() != null && !param.getSubCat().trim().equals("")) {
			// urlParam.append("/storeHierType/" + param.getStoreHierType());
			// urlParam.append("/storeHierType/1");
			urlParam.append("/region/" + param.getSubCat().trim().replaceAll("\\s+", "_").replaceAll("/", "@"));; //CR modification (search by region name)

		} else {
			urlParam.append("/region/null");
		}
		if (param.getCategory() != null && !param.getCategory().trim().equals("")) {
			// urlParam.append("/storeHierType/" + param.getStoreHierType());
			// urlParam.append("/storeHierType/1");
			urlParam.append("/state/" + param.getCategory().trim());

		} else {
			urlParam.append("/state/null");
		}

		if (param.getStartDate() != null) {

			urlParam.append("/startDate/"
					+ param.getStartDate().replace("/", ""));

		}

		// if (param.getRecCount()!= null ) {

		urlParam.append("/recCount/" + pageSize);

		// }

		if (param.getPageNo() != null) {

			urlParam.append("/pageNo/" + param.getPageNo());

		} else {
			urlParam.append("/pageNo/1");
		}

		// http://nnorsovmws395:8080/replenishmentServices/ArticleReview/get/storeNo/3200/salesOrg/1005/articleNo/100040/uom/KG/storeHiertype/1/hierNode/1000PR02-OPS/startDate/03022014/recCount/50/pageNo/1
		// COMMENT THE BELOW LINE
		//urlParam = new StringBuffer(
			//	"/storeNo/3200/salesOrg/1005/articleNo/100040/uom/KG/storeHiertype/1/hierNode/1000PR02-OPS/startDate/03022014/recCount/50/pageNo/1");
		LOGGER.info(urlParam.toString());
		//System.out.println("Article Review url --->" + urlParam.toString());
		PromotionServiceResponce response = null;
		URI url = null;
		try {
			url = new URI(siteHierarchyDetailsServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			System.out.println("url__"+url);
			response = getRestTemplateForReplenishment(user).getForObject(
					url, PromotionServiceResponce.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		

		if (response != null
				//&& response.getBody() != null
				&& response.getPromotionServiceResponceHelper() != null
				&& response.getPromotionServiceResponceHelper()
						.getPromSearchResultList() != null
				&& response.getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg() != null) {
			if (!(response.getPromotionServiceResponceHelper()
					.getPromSearchResultList().get(0).getMsg().trim()
					.length() > 0))
				return (ArrayList<PromoArticle>) response
						.getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0)
						.getPromArticleList();
			else
				param.setMsg(response
						.getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg());
		}

		return null;

	


	}

}
