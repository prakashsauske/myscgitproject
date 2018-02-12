package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.SiteDtlResponse;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.StoreSearchResponse;
import au.com.woolworths.portal.model.StoreSearchResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ZeroMPLReportResponse;

import com.google.gson.Gson;

public class StoreSearchServiceImpl extends CommonServiceImpl {

	@Value("#{url['UserSiteServiceURL']}")
	private String userSiteServiceURL;

	@Value("#{url['UserSiteVerifyServiceURL']}")
	private String userSiteVerifyServiceURL;

	@Value("#{url['RCStoreVerifyURL']}")
	private String rcStoreVerifyURL;
	
	
	@Value("#{url['RCStoreDtlsURL']}")
	private String rcStoreDtlsURL;
	private static final Logger LOGGER = Logger.getLogger(StoreSearchServiceImpl.class.getName());
	

	public ArrayList<StoreSearchResult> getUserStore(UserContext userDtl)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		urlParam = new StringBuffer(" iv_site eq '")
				.append(userDtl.getSiteNo()).append("'");

		LOGGER.info(urlParam);
		URI url;
		try {
			url = new URI(userSiteServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		StoreSearchResponse response = null;

		try {
			response = getRestTemplate(userDtl).getForObject(url,
					StoreSearchResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getStoreSearchResponseHelper() != null
				&& response.getStoreSearchResponseHelper()
						.getStoreSearchResultList() != null
				&& response.getStoreSearchResponseHelper()
						.getStoreSearchResultList().size() > 0) {
			if (!response.getStoreSearchResponseHelper()
					.getStoreSearchResultList().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<StoreSearchResult>) response
						.getStoreSearchResponseHelper()
						.getStoreSearchResultList();
			else {
				userDtl.setMsg(response.getStoreSearchResponseHelper()
						.getStoreSearchResultList().get(0).getMsg().trim());
			}
		}
		return null;
	}

	public String verifyStore(String store, String userId,UserContext user)
			throws UnsupportedEncodingException {
		StringBuffer urlParam = null;

		urlParam = new StringBuffer(" iv_site eq '").append(store)
				.append("' and iv_user eq '").append(userId).append("'");

		LOGGER.info(urlParam);
		URI url;
		try {
			url = new URI(userSiteVerifyServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ZeroMPLReportResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ZeroMPLReportResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getZeroMPLReportResponseHelper() != null
				&& response.getZeroMPLReportResponseHelper()
						.getZeroMPLReportList() != null
				&& response.getZeroMPLReportResponseHelper()
						.getZeroMPLReportList().size() > 0) {
			if (!response.getZeroMPLReportResponseHelper()
					.getZeroMPLReportList().get(0).getMsg().trim()
					.contains(" "))
				return "";
			else {
				return "";
			}
		}
		return null;
	}

	public ArrayList<SiteDtls> verifyStoreNo(String siteNo, String areaCode,
			String regionId,UserContext user) {

		StringBuffer urlParam;
		SiteDtlResponse response = null;

		urlParam = new StringBuffer("/siteNo/");
		
		if (siteNo != null && !siteNo.equals(""))
			urlParam.append(siteNo);
		else
			urlParam.append("null");
		urlParam.append("/areaCode/");
		
		if (areaCode != null && !areaCode.equals(""))
			urlParam.append(areaCode);
		else
			urlParam.append("null");
		
		urlParam.append("/regionId/");
		
		if (regionId != null && !regionId.equals(""))
			urlParam.append(regionId);
		else
			urlParam.append("null");
		
		//System.out.println("urlParam" + urlParam);
		URI url = null;
		try {
			url = new URI(rcStoreVerifyURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					SiteDtlResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getSiteDtlResponseHelper() != null
				&& response.getSiteDtlResponseHelper().getSiteDtlsList() != null
				&& response.getSiteDtlResponseHelper().getSiteDtlsList().size() > 0
				&& !response.getSiteDtlResponseHelper().getSiteDtlsList()
						.get(0).getMsg().trim().contains(" ")) {
			return (ArrayList<SiteDtls>) response.getSiteDtlResponseHelper()
					.getSiteDtlsList();
		}
		return null;
	}
	
	public ArrayList<SiteDtls> getStoreDtls(List<String> siteList) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(rcStoreDtlsURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(siteList));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(siteList,
				postrequestHeaders);

		ResponseEntity<SiteDtlResponse> response = null;

		try {

			response = getRestTemplatePostForReplenishment().exchange(

			rcStoreDtlsURL, HttpMethod.POST, requestEntity,

			SiteDtlResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getSiteDtlResponseHelper() != null
					&& response.getBody().getSiteDtlResponseHelper()
							.getSiteDtlsList() != null
					&& response.getBody().getSiteDtlResponseHelper()
							.getSiteDtlsList().get(0).getMsg() != null) {
				if (!(response.getBody().getSiteDtlResponseHelper()
						.getSiteDtlsList().get(0).getMsg().trim()
						.length() > 0))
					return (ArrayList<SiteDtls>) response.getBody()
							.getSiteDtlResponseHelper()
							.getSiteDtlsList();
			}

			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}
}
