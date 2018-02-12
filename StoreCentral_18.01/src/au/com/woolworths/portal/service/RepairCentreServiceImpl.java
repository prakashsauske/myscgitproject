package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.Date;

import org.apache.commons.httpclient.util.DateUtil;
//import java.util.logging.Logger;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.ArticleResultsResponse;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.RepairCartonLabelDetails;
import au.com.woolworths.portal.model.RepairCartonLabelDetailsResponse;
import au.com.woolworths.portal.model.RepairCreateServiceOrderResponse;
import au.com.woolworths.portal.model.RepairSearchResults;
import au.com.woolworths.portal.model.RepairSearchResultsResponse;
import au.com.woolworths.portal.model.RepairServiceOrderDetails;
import au.com.woolworths.portal.model.RepairServiceOrderDetailsResponse;
import au.com.woolworths.portal.model.ServiceAgreementDtl;
import au.com.woolworths.portal.model.ServiceAgreementResponse;
import au.com.woolworths.portal.model.ServiceOrderArticles;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.RepairCreateParam;
import au.com.woolworths.portal.param.RepairSearchParam;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

public class RepairCentreServiceImpl extends CommonServiceImpl {

	private static final Logger LOGGER = Logger
			.getLogger(RepairCentreServiceImpl.class.getName());
	@Value("#{url['ArticleListingServiceURL']}")
	private String articleListingServiceURL;

	@Value("#{url['RepairServiceAgreementURL']}")
	private String repairServiceAgreementURL;

	@Value("#{url['RepairCreateServiceOrderTokenURL']}")
	private String repairCreateServiceOrderTokenURL;

	@Value("#{url['RepairCancelServiceOrderTokenURL']}")
	private String repairCancelServiceOrderTokenURL;

	@Value("#{url['RepairCompleteServiceOrderTokenURL']}")
	private String repairCompleteServiceOrderTokenURL;

	@Value("#{url['RepairServiceOrderUpdateTokenURL']}")
	private String repairServiceOrderUpdateTokenURL;

	@Value("#{url['RepairServiceOrderUpdateURL']}")
	private String repairServiceOrderUpdateURL;

	@Value("#{url['RepairCreateServiceOrderURL']}")
	private String repairCreateServiceOrderURL;

	@Value("#{url['RepairCancelServiceOrderURL']}")
	private String repairCancelServiceOrderURL;

	@Value("#{url['RepairCompleteServiceOrderURL']}")
	private String repairCompleteServiceOrderURL;

	@Value("#{url['RepairServiceOrderDetailsURL']}")
	private String repairServiceOrderDetailsURL;

	@Value("#{url['RepairEnquireServiceOrderURL']}")
	private String repairEnquireServiceOrderURL;

	@Value("#{url['RepairCartonLabelDetailsURL']}")
	private String repairCartonLabelDetailsURL;


	public String searchArticle(RepairCreateParam param,UserContext user) {
		System.out
				.println(" inside method start searchArticle repair service impl");

		// USE LOGGER AT METHOD START AND END. TO TRACK THE METHOD FLOW
		// HERE AFTER WE WILL USE ALL METHOD RETURN TYPE AS STRING, EXCEPT FOR
		// ON PAGE LOAD CALLS
		// DECLARE ALL THE VARIABLES INSTANCE IN THE METHOD START, LATER CREATE
		// OBJECT FOR THAT
		// GIVE A MEANING FULL NAME FOR ALL THE VARIABLES

		String urlParam = null;
		URI url = null;
		String statusMsg = "";
		ArticleResultsResponse response = null;
		ArrayList<ArticleSearchResults> articleSearchResultsList = null;
		StringBuffer queryStr = null;
		boolean flag = false;

		if (param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getCreateSearch() == null
				|| param.getCreateSearch().trim().equals("")) {
			statusMsg = Constants.MANDATORY;
		} else {

			flag = CommonUtils.isNumeric(param.getCreateSearch());

			LOGGER.info(" article no or desc" + param.getCreateSearch()
					+ "   " + flag);

			queryStr = new StringBuffer("iv_site eq '").append(
					param.getSiteNo()).append("'");

			if (flag && param.getCreateSearch().length() <= 7) {
				queryStr.append(" and iv_article eq '")
						.append(param.getCreateSearch()).append("'");
			} else if (flag) {
				queryStr.append(" and iv_gtin eq '")
						.append(param.getCreateSearch()).append("'");
			} else if (!flag) {
				queryStr.append(" and iv_desc eq '")
						.append(param.getCreateSearch()).append("'");
			}

			if (param.getRangedFlag() == null
					|| !param.getRangedFlag().equals(Constants.TRUE)) {
				queryStr.append(" and iv_ranged eq 'X'");
			}

			LOGGER.info("URL articleListingServiceURL  "
					+ articleListingServiceURL);

			urlParam = queryStr.toString();

			if (articleListingServiceURL != null) {
				articleListingServiceURL = articleListingServiceURL.replace(
						"{filter}", "");
			}

			// USE TRY CATCH TO HANDLE All THE ERROR WITH SERVICE CALL
			try {

				// ENCODE URL, BECAUSE SOME TIMES URL MAY CONTAIN SPECIAL
				// CHARACTER LIKE( & % $)
				urlParam = articleListingServiceURL
						+ URLEncoder.encode(urlParam, "UTF-8");
				url = new URI(urlParam);

				LOGGER.info(urlParam);

				LOGGER.info("URL urlParam  " + urlParam);

				// CALLING SERVICE URL (USE THIS BELOW METHOD FOR SERVICE CALL
				// FOR GET)
				// IF YOU NEED STATUS CODE OF THE WEBSERVICE CALL THAN USE THE
				// EXCHANGED
				response = getRestTemplate(user).getForObject(url,
						ArticleResultsResponse.class);

				// ALWAYS GO WITH POSITIVE SCENARIO
				if (response != null
						&& response.getArticleResultsResponseHelper() != null
						&& response.getArticleResultsResponseHelper()
								.getArticleSearchResultsList() != null
						&& response.getArticleResultsResponseHelper()
								.getArticleSearchResultsList().size() > 0) {
					articleSearchResultsList = (ArrayList<ArticleSearchResults>) response
							.getArticleResultsResponseHelper()
							.getArticleSearchResultsList();
					if (articleSearchResultsList.get(0).getMsg() != null
							&& !articleSearchResultsList.get(0).getMsg().trim()
									.contains(" ")) {
						statusMsg = Constants.TRUE;
					} else {
						statusMsg = articleSearchResultsList.get(0).getMsg();
					}
				} else {
					statusMsg = Constants.NDF;
				}

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (Exception e) {
				e.printStackTrace();
				statusMsg = Constants.SERVICE_ISSUE;
			}
		}
		LOGGER.info("Response  statusMsg  " + statusMsg);
		LOGGER.info("METHOD END searchServiceOrder SERVICE IMPL");
		return Constants.convertToJsonString(articleSearchResultsList,
				statusMsg);

	}

	/*
	 * public ServiceAgreementDtl[] getArticleServiceAgreement(
	 * RepairCreateParam param) {
	 * LOGGER.info("Inside getArticleServiceAgreement start");
	 * ServiceAgreementDtl[] serviceAgreementDtl = null; // InStorePromoParam
	 * param=null; if (param.getSiteNo() == null || param.getSiteNo().equals("")
	 * || param.getArticleNo() == null || param.getArticleNo().equals("")) {
	 * System.out
	 * .println("Inside getArticleServiceAgreement mandatory field missing");
	 * return serviceAgreementDtl; }
	 * 
	 * try {
	 * 
	 * ResponseEntity<ServiceAgreementDtl[]> response = null;
	 * ServiceAgreementDtl[] responseData;
	 * 
	 * HttpHeaders postrequestHeaders = new HttpHeaders();
	 * 
	 * postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
	 * 
	 * HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
	 * postrequestHeaders);
	 * LOGGER.info("enquireAgreementServiceURL ---- " +
	 * enquireAgreementServiceURL);
	 * 
	 * response = getForPostRestTemplate().exchange( enquireAgreementServiceURL,
	 * HttpMethod.POST, requestEntity, ServiceAgreementDtl[].class);
	 * 
	 * LOGGER.info(response.getBody().toString()); if (response != null
	 * && response.getBody() != null && response.getBody() != null) {
	 * responseData = response.getBody(); return responseData;
	 * 
	 * }
	 * 
	 * } catch (Exception e) { e.printStackTrace(); }
	 * 
	 * return serviceAgreementDtl;
	 * 
	 * }
	 */

	public String searchServiceOrder(RepairSearchParam param,UserContext user) {

		LOGGER.info("METHOD STATR searchServiceOrder SERVICE IMPL");

		// USE LOGGER AT METHOD START AND END. TO TRACK THE METHOD FLOW
		// HERE AFTER WE WILL USE ALL METHOD RETURN TYPE AS STRING, EXCEPT FOR
		// ON PAGE LOAD CALLS
		// DECLARE ALL THE VARIABLES INSTANCE IN THE METHOD START, LATER CREATE
		// OBJECT FOR THAT
		// GIVE A MEANING FULL NAME FOR ALL THE VARIABLES

		String urlParam = null;
		URI url = null;
		String statusMsg = "";
		RepairSearchResultsResponse response = null;
		ArrayList<RepairSearchResults> repairSearchResultsList = null;
		StringBuffer queryStr = null;

		if ((param.getSiteNo() == null || param.getSiteNo().equals(""))
				|| ((param.getContactNo() == null || param.getContactNo()
						.equals(""))
						&& (param.getCustomerName() == null || param
								.getContactNo().equals(""))
						&& (param.getDateTo() == null || param.getDateTo()
								.equals(""))
						&& (param.getPostCode() == null || param.getPostCode()
								.equals(""))
						&& (param.getDateFrom() == null || param.getDateFrom()
								.equals("")) && (param.getSearchText() == null || param
						.getSearchText().equals("")))) {
			statusMsg = Constants.MANDATORY;
		} else {

			queryStr = new StringBuffer("iv_site eq '").append(
					param.getSiteNo()).append("'");

			if (param.getSearchText() != null
					&& !param.getSearchText().equals("")) {
				queryStr.append(" and iv_order_no eq '")
						.append(param.getSearchText()).append("'");
			}
			if (param.getCustomerName() != null
					&& !param.getCustomerName().equals("")) {
				queryStr.append(" and iv_customername eq '")
						.append(param.getCustomerName()).append("'");
			}
			if (param.getContactNo() != null
					&& !param.getContactNo().equals("")) {
				queryStr.append(" and iv_contactnumber eq '")
						.append(param.getContactNo()).append("'");
			}
			if (param.getPostCode() != null && !param.getPostCode().equals("")) {
				queryStr.append(" and iv_postcode eq '")
						.append(param.getPostCode()).append("'");
			}
			if (param.getDateFrom() != null && !param.getDateFrom().equals("")) {
				queryStr.append(" and iv_fromdate eq '")
						.append(PortalUtil.convertToSAPDate(param.getDateFrom()))
						.append("'");
			}
			if (param.getDateTo() != null && !param.getDateTo().equals("")) {
				queryStr.append(" and iv_todate eq '")
						.append(PortalUtil.convertToSAPDate(param.getDateTo()))
						.append("'");
			}
			
			if (param.getStatus() != null && !param.getStatus().equals("")) {
				queryStr.append(" and iv_status eq '")
						.append(param.getStatus())
						.append("'");
			}
			if (param.getRecordCount() != null
					&& !param.getRecordCount().equals("")) {
				queryStr.append(" and iv_records eq ")
						.append(param.getRecordCount()).append("");
			}
			if (param.getPageNo() != null && !param.getPageNo().equals("")) {
				queryStr.append(" and iv_page_no eq ")
						.append(param.getPageNo()).append("");
			}

			LOGGER.info("URL repairEnquireServiceOrderURL  "
					+ repairEnquireServiceOrderURL);

			urlParam = queryStr.toString();
			// ADDED FOR TESTING COMMENT BELOW LING BEFORE DEPLOYMENT
			// urlParam = "iv_site eq '1008' and iv_order_no eq '4600083404'";

			// USE TRY CATCH TO HANDLE All THE ERROR WITH SERVICE CALL
			try {

				// ENCODE URL, BECAUSE SOME TIMES URL MAY CONTAIN SPECIAL
				// CHARACTER LIKE( & % $)
				urlParam = repairEnquireServiceOrderURL
						+ URLEncoder.encode(urlParam, "UTF-8");
				url = new URI(urlParam);

				LOGGER.info(urlParam);

				LOGGER.info("URL urlParam  " + urlParam);

				// CALLING SERVICE URL (USE THIS BELOW METHOD FOR SERVICE CALL
				// FOR GET)
				// IF YOU NEED STATUS CODE OF THE WEBSERVICE CALL THAN USE THE
				// EXCHANGED
				response = getRestTemplate(user).getForObject(url,
						RepairSearchResultsResponse.class);

				// ALWAYS GO WITH POSITIVE SCENARIO
				if (response != null
						&& response.getRepairSearchResultsResponseHelper() != null
						&& response.getRepairSearchResultsResponseHelper()
								.getRepairSearchResultsList() != null
						&& response.getRepairSearchResultsResponseHelper()
								.getRepairSearchResultsList().size() > 0) {
					repairSearchResultsList = response
							.getRepairSearchResultsResponseHelper()
							.getRepairSearchResultsList();
					if (repairSearchResultsList.get(0).getMsg() != null
							&& !repairSearchResultsList.get(0).getMsg().trim()
									.contains(" ")) {
						statusMsg = Constants.TRUE;
					} else {
						statusMsg = repairSearchResultsList.get(0).getMsg();
					}
				} else {
					statusMsg = Constants.NDF;
				}

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (Exception e) {
				e.printStackTrace();
				statusMsg = Constants.SERVICE_ISSUE;
			}
		}
		LOGGER.info("Response  statusMsg  " + statusMsg);
		LOGGER.info("METHOD END searchServiceOrder SERVICE IMPL");
		return Constants
				.convertToJsonString(repairSearchResultsList, statusMsg);

	}

	public String getServiceOrderDetails(RepairSearchParam param,UserContext user) {

		LOGGER.info("METHOD STATR getServiceOrderDetails SERVICE IMPL");

		// USE LOGGER AT METHOD START AND END. TO TRACK THE METHOD FLOW
		// HERE AFTER WE WILL USE ALL METHOD RETURN TYPE AS STRING, EXCEPT FOR
		// ON PAGE LOAD CALLS
		// DECLARE ALL THE VARIABLES INSTANCE IN THE METHOD START, LATER CREATE
		// OBJECT FOR THAT
		// GIVE A MEANING FULL NAME FOR ALL THE VARIABLES

		String urlParam = null;
		URI url = null;
		String statusMsg = "";
		RepairServiceOrderDetailsResponse response = null;
		ArrayList<RepairServiceOrderDetails> repairServiceOrderDetailsList = null;
		StringBuffer queryStr = null;

		if (param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getServiceOrderNo() == null
				|| param.getServiceOrderNo().equals("")) {
			statusMsg = Constants.MANDATORY;
		} else {

			queryStr = new StringBuffer("iv_site eq '")
					.append(param.getSiteNo()).append("' and iv_order_no eq '")
					.append(param.getServiceOrderNo()).append("'");

			LOGGER.info("URL repairServiceOrderDetailsURL  "
					+ repairServiceOrderDetailsURL);

			urlParam = queryStr.toString();

			// USED FOR TESTING PURPOSE, PLEASE COMMENT THE BELOW LINE BEFRORE
			// DEPLOYEMENT
			// urlParam = "iv_site eq '1008' and iv_order_no eq '4600083404'";

			// USE TRY CATCH TO HANDLE All THE ERROR WITH SERVICE CALL
			try {

				// ENCODE URL, BECAUSE SOME TIMES URL MAY CONTAIN SPECIAL
				// CHARACTER LIKE( & % $)
				urlParam = repairServiceOrderDetailsURL
						+ URLEncoder.encode(urlParam, "UTF-8");
				url = new URI(urlParam);

				LOGGER.info(urlParam);

				LOGGER.info("URL urlParam  " + urlParam);

				// CALLING SERVICE URL (USE THIS BELOW METHOD FOR SERVICE CALL
				// FOR GET)
				// IF YOU NEED STATUS CODE OF THE WEBSERVICE CALL THAN USE THE
				// EXCHANGED
				response = getRestTemplate(user).getForObject(url,
						RepairServiceOrderDetailsResponse.class);
				LOGGER.info("======="
						+ CommonUtils.convertObjectTojson(response));

				// ALWAYS GO WITH POSITIVE SCENARIO
				if (response != null
						&& response
								.getRepairServiceOrderDetailsResponseHelper() != null
						&& response
								.getRepairServiceOrderDetailsResponseHelper()
								.getRepairServiceOrderDetailsList() != null
						&& response
								.getRepairServiceOrderDetailsResponseHelper()
								.getRepairServiceOrderDetailsList().size() > 0) {
					repairServiceOrderDetailsList = response
							.getRepairServiceOrderDetailsResponseHelper()
							.getRepairServiceOrderDetailsList();
					if (repairServiceOrderDetailsList.get(0).getMsg() != null
							&& !repairServiceOrderDetailsList.get(0).getMsg()
									.trim().contains(" ")) {
						statusMsg = Constants.TRUE;
					} else {
						statusMsg = repairServiceOrderDetailsList.get(0)
								.getMsg();
					}
				} else {
					statusMsg = Constants.NDF;
				}

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (Exception e) {
				e.printStackTrace();
				statusMsg = Constants.SERVICE_ISSUE;
			}
		}
		LOGGER.info("Response  statusMsg  " + statusMsg);
		LOGGER.info("METHOD END getServiceOrderDetails SERVICE IMPL");
		return Constants.convertToJsonString(repairServiceOrderDetailsList,
				statusMsg);
	}

	public String getServiceAgreementForArticle(RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD START getServiceAgreementForArticle SERVICE IMPL");

		// USE LOGGER AT METHOD START AND END. TO TRACK THE METHOD FLOW
		// HERE AFTER WE WILL USE ALL METHOD RETURN TYPE AS STRING, EXCEPT FOR
		// ON PAGE LOAD CALLS
		// DECLARE ALL THE VARIABLES INSTANCE IN THE METHOD START, LATER CREATE
		// OBJECT FOR THAT
		// GIVE A MEANING FULL NAME FOR ALL THE VARIABLES

		String urlParam = null;
		URI url = null;
		String statusMsg = "";
		ServiceAgreementResponse response = null;
		ArrayList<ServiceAgreementDtl> serviceAgreementDtlList = null;
		StringBuffer queryStr = null;

		if (param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getArticleNo() == null
				|| param.getArticleNo().equals("")) {
			statusMsg = Constants.MANDATORY;
		} else {

			queryStr = new StringBuffer("iv_site eq '")
					.append(param.getSiteNo()).append("' and iv_article eq '")
					.append(param.getArticleNo()).append("'");

			LOGGER.info("URL repairServiceAgreementURL  "
					+ repairServiceAgreementURL);

			urlParam = queryStr.toString();

			// USE TRY CATCH TO HANDLE All THE ERROR WITH SERVICE CALL
			try {

				// ENCODE URL, BECAUSE SOME TIMES URL MAY CONTAIN SPECIAL
				// CHARACTER LIKE( & % $)
				urlParam = repairServiceAgreementURL
						+ URLEncoder.encode(urlParam, "UTF-8");
				url = new URI(urlParam);

				LOGGER.info(urlParam);

				LOGGER.info("URL urlParam  " + urlParam);

				// CALLING SERVICE URL (USE THIS BELOW METHOD FOR SERVICE CALL
				// FOR GET)
				// IF YOU NEED STATUS CODE OF THE WEBSERVICE CALL THAN USE THE
				// EXCHANGED
				response = getRestTemplate(user).getForObject(url,
						ServiceAgreementResponse.class);

				// ALWAYS GO WITH POSITIVE SCENARIO
				if (response != null
						&& response.getServiceAgreementDtlResponseHelper() != null
						&& response.getServiceAgreementDtlResponseHelper()
								.getServiceAgreementDtlList() != null
						&& response.getServiceAgreementDtlResponseHelper()
								.getServiceAgreementDtlList().size() > 0) {
					serviceAgreementDtlList = response
							.getServiceAgreementDtlResponseHelper()
							.getServiceAgreementDtlList();
					if (serviceAgreementDtlList.get(0).getMsg() != null
							&& serviceAgreementDtlList.get(0).getMsg()
									.equals("")) {
						statusMsg = Constants.TRUE;
					} else {
						statusMsg = serviceAgreementDtlList.get(0).getMsg();
					}
				} else {
					statusMsg = Constants.NDF;
				}

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (Exception e) {
				e.printStackTrace();
				statusMsg = Constants.SERVICE_ISSUE;
			}
		}
		LOGGER.info("Response  statusMsg  " + statusMsg);
		LOGGER.info("METHOD END getServiceAgreementForArticle SERVICE IMPL");

		return Constants
				.convertToJsonString(serviceAgreementDtlList, statusMsg);

	}

	public String createServiceOrder(RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start createServiceOrder SERVICE IMPL");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;
		HttpHeaders requestHeaders = new HttpHeaders();
		String statusMsg = "";
		requestHeaders.add(Constants.X_CSRF_TOKEN, Constants.FETCH);
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(
					repairCreateServiceOrderTokenURL, HttpMethod.GET,
					requestEntity, Object.class);

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();

			String token = responseHeaders.getFirst(Constants.X_CSRF_TOKEN);
			LOGGER.info("token __" + token);
			createServiceOrderInSAP(token, param,user);
			serviceOrderCreatedArticleList = param
					.getServiceOrderCreatedArticleList();
			statusMsg = param.getMsg();
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.TECHNICAL_ISSUE);
			statusMsg = Constants.TECHNICAL_ISSUE;
		}
		LOGGER.info("METHOD end createServiceOrder SERVICE IMPL");
		return Constants.convertToJsonString(serviceOrderCreatedArticleList,
				statusMsg);
	}

	private void createServiceOrderInSAP(String token, RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start createServiceOrderInSAP SERVICE IMPL");

		System.out
				.println("Method start of createServiceOrderInSAP repair service impl ");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;

		HttpHeaders postrequestHeaders = new HttpHeaders();

		String statusMsg = "";

		postrequestHeaders.add(Constants.X_CSRF_TOKEN, token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);
		
        LOGGER.info(replaceSpecialCharacters(param.getCustomerName()));
		String postXml = construtXMLforRepairServiceOrderCreate(token, param);

		LOGGER.info("postXml__" + postXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(postXml,
				postrequestHeaders);
		ResponseEntity<RepairCreateServiceOrderResponse> response = null;
		try {

			response = getForPostRestTemplate(user).exchange(

			repairCreateServiceOrderURL, HttpMethod.POST, requestEntity,

			RepairCreateServiceOrderResponse.class);
			LOGGER.info("&*@^*^#$^$#^&"
					+ CommonUtils.convertObjectTojson(response));

			if (response != null
					&& response.getBody() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList().size() > 0) {

				serviceOrderCreatedArticleList = (ArrayList<ServiceOrderArticles>) response
						.getBody().getRepairCreateServiceOrderResponseHelper()
						.getPoItems().getServiceOrderArticlesList();

				if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim()
								.equals(Constants.SUCCESS_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim().equals(Constants.ERROR_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else {
					// NEED TO CHANGED THE BELOW MSG
					statusMsg = Constants.TECHNICAL_ISSUE;
				}

			} else {
				param.setMsg(Constants.TECHNICAL_ISSUE);
				statusMsg = Constants.TECHNICAL_ISSUE;
			}

		} catch (Exception e) {
			param.setMsg(Constants.REPAIR_SERVICE_ORDER_CREATION_FAILED);
			e.printStackTrace();
			statusMsg = Constants.REPAIR_SERVICE_ORDER_CREATION_FAILED;
		}

		LOGGER.info("statusMsg " + statusMsg);
		System.out
				.println("Method end of createServiceOrderInSAP repair service impl ");
		param.setServiceOrderCreatedArticleList(serviceOrderCreatedArticleList != null ? serviceOrderCreatedArticleList
				: new ArrayList<ServiceOrderArticles>());
		param.setMsg(statusMsg);

		LOGGER.info("METHOD end createServiceOrderInSAP SERVICE IMPL");
	}

	private String construtXMLforRepairServiceOrderCreate(String token,
			RepairCreateParam param) {

		LOGGER.info("METHOD start construtXMLforRepairServiceOrderCreate SERVICE IMPL");

		StringBuffer xml = new StringBuffer(
				"<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='").append(repairCreateServiceOrderURL)
				.append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>")

				.append("<d:IV_SITE>").append(replaceSpecialCharacters(param.getSiteNo()))
				.append("</d:IV_SITE>")

				.append("<d:IV_MAIN_VENDOR>").append(replaceSpecialCharacters(param.getRepairAgent()))
				.append("</d:IV_MAIN_VENDOR>")

				.append("<d:IV_REPAIR_AGENT>").append(replaceSpecialCharacters(param.getRepairAgent()))
				.append("</d:IV_REPAIR_AGENT>")

				.append("<d:IV_CUST_NAME>").append(replaceSpecialCharacters(param.getCustomerName()))
				.append("</d:IV_CUST_NAME>");

		if (param.getContactNumber() != null
				&& !param.getContactNumber().equals(""))
			xml.append("<d:IV_CUST_CONTACT_NO>")
					.append(param.getContactNumber())
					.append("</d:IV_CUST_CONTACT_NO>");

		if (param.getAddress() != null && !param.getAddress().equals(""))
			xml.append("<d:IV_CUST_ADDR>").append(replaceSpecialCharacters(param.getAddress()))
					.append("</d:IV_CUST_ADDR>");

		if (param.getPostCode() != null && !param.getPostCode().equals(""))
			xml.append("<d:IV_CUST_POST_CODE>").append(replaceSpecialCharacters(param.getPostCode()))
					.append("</d:IV_CUST_POST_CODE>");

		if (param.getStoreContactName() != null
				&& !param.getStoreContactName().equals(""))
			xml.append("<d:IV_STORE_CONTACT_NAME>")
					.append(replaceSpecialCharacters(param.getStoreContactName()))
					.append("</d:IV_STORE_CONTACT_NAME>");

		if (param.getComments() != null && !param.getComments().equals(""))
			xml.append("<d:IV_REMARKS>").append(replaceSpecialCharacters(param.getComments()))
					.append("</d:IV_REMARKS>");

		if (param.getTotalAmount() != null
				&& !param.getTotalAmount().equals(""))
			xml.append("<d:IV_REPAIR_CHARGE>").append(param.getTotalAmount())
					.append("</d:IV_REPAIR_CHARGE>");

		if (param.getFaultDesc() != null && !param.getFaultDesc().equals(""))
			xml.append("<d:IV_REPAIR_DETAIL>").append(replaceSpecialCharacters(param.getFaultDesc()))
					.append("</d:IV_REPAIR_DETAIL>");

		if (param.getService() != null && !param.getService().equals(""))
			xml.append("<d:IV_WARRANTY>").append(replaceSpecialCharacters(param.getService()))
					.append("</d:IV_WARRANTY>");

		if (param.getProofOfPurchase() != null
				&& !param.getProofOfPurchase().equals(""))
			xml.append("<d:IV_PROOF_OF_PURCHASE>")
					.append(replaceSpecialCharacters(param.getProofOfPurchase()))
					.append("</d:IV_PROOF_OF_PURCHASE>");

		if (param.getDateOfPurchase() != null
				&& !param.getDateOfPurchase().equals(""))
			xml.append("<d:IV_DATE_OF_PURCHASE>")
					.append(Constants
							.convertRepairServiceOrderDateToSAPDate(param
									.getDateOfPurchase()))
					.append("</d:IV_DATE_OF_PURCHASE>");

		if (param.getStockType() != null && !param.getStockType().equals(""))
			xml.append("<d:IV_STOCK_TYPE>").append(replaceSpecialCharacters(param.getStockType()))
					.append("</d:IV_STOCK_TYPE>");

		if (param.getContactMethod() != null
				&& !param.getContactMethod().equals(""))
			xml.append("<d:IV_CONTACT_METHOD>")
					.append(replaceSpecialCharacters(param.getContactMethod()))
					.append("</d:IV_CONTACT_METHOD>");

		if (param.getEmailId() != null && !param.getEmailId().equals(""))
			xml.append("<d:IV_MAIL_ID>").append(replaceSpecialCharacters(param.getEmailId()))
					.append("</d:IV_MAIL_ID>");

		xml.append("</m:properties> ")
				.append("</atom:content>")
				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/POItems' type='application/atom+xml;type=feed'  title='ZNGBO_REPAIR_ORDER_CREATE.POHeader_POItem'>")
				.append("<m:inline><atom:feed>");

		xml.append(
				"<atom:entry> <atom:content type='application/xml'><m:properties>")

		.append("<d:IV_SITE>").append(param.getSiteNo()).append("</d:IV_SITE>")

		.append("<d:IV_ARTICLE>").append(replaceSpecialCharacters(param.getArticleNo()))
				.append("</d:IV_ARTICLE>")

				.append("<d:IV_ARTICLE_DESC>").append(replaceSpecialCharacters(param.getArticleDesc()))
				.append("</d:IV_ARTICLE_DESC>");

		xml.append("<d:IV_QUANTITY>").append(Constants.REPAIR_QTY)
				.append("</d:IV_QUANTITY>");
		
		//HARDCODED AS SAID BY SATHISH 
				xml.append("<d:IV_UOM>").append(Constants.ARTICLE_UOM)
						.append("</d:IV_UOM>");
		if (param.getTotalAmount() != null
				&& !param.getTotalAmount().equals(""))
			xml.append("<d:IV_VALUE>").append(param.getTotalAmount())
					.append("</d:IV_VALUE>");

		xml.append("</m:properties> </atom:content></atom:entry>");

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		LOGGER.info("METHOD end construtXMLforRepairServiceOrderCreate SERVICE IMPL");

		return xml.toString();
	}

	public String updateServiceOrder(RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start updateServiceOrder SERVICE IMPL");

		String statusMsg = "";
		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add(Constants.X_CSRF_TOKEN, Constants.FETCH);
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(
					repairServiceOrderUpdateTokenURL, HttpMethod.GET,
					requestEntity, Object.class);

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();

			String token = responseHeaders.getFirst(Constants.X_CSRF_TOKEN);
			LOGGER.info("token __" + token);
			updateRepairServiceOrderInSAP(token, param,user);
			serviceOrderCreatedArticleList = param
					.getServiceOrderCreatedArticleList();
			statusMsg = param.getMsg();
		} catch (Exception e) {
			e.printStackTrace();
			statusMsg = Constants.TECHNICAL_ISSUE;
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		LOGGER.info("METHOD end updateServiceOrder SERVICE IMPL");

		return Constants.convertToJsonString(serviceOrderCreatedArticleList,
				statusMsg);

	}

	private void updateRepairServiceOrderInSAP(String token,
			RepairCreateParam param,UserContext user) {

		System.out
				.println("Method start of createServiceOrderInSAP repair service impl ");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;

		HttpHeaders postrequestHeaders = new HttpHeaders();

		String statusMsg = "";

		postrequestHeaders.add(Constants.X_CSRF_TOKEN, token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);
		
		String postXml=new String();
		if(param.getReminderFlag()!=null && param.getReminderFlag().equalsIgnoreCase(Constants.TRUE)){
			postXml = construtXMLforRepairServiceOrderReminder(token, param);
		}else{
			postXml = construtXMLforRepairServiceOrderUpdate(token, param);
		}

		LOGGER.info("postXml__" + postXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(postXml,
				postrequestHeaders);
		ResponseEntity<RepairCreateServiceOrderResponse> response = null;
		String statusMessage = "";
		try {

			response = getForPostRestTemplate(user).exchange(

			repairServiceOrderUpdateURL, HttpMethod.POST, requestEntity,

			RepairCreateServiceOrderResponse.class);
			LOGGER.info("%$%%$%^&%^ "
					+ CommonUtils.convertObjectTojson(response));
			if (response != null
					&& response.getBody() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList().size() > 0) {

				serviceOrderCreatedArticleList = (ArrayList<ServiceOrderArticles>) response
						.getBody().getRepairCreateServiceOrderResponseHelper()
						.getPoItems().getServiceOrderArticlesList();

				if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim()
								.equals(Constants.SUCCESS_MSG)) {
					statusMsg = Constants.TRUE;
				} else if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim().equals(Constants.ERROR_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else {
					// NEED TO CHANGED THE BELOW MSG
					statusMsg = Constants.TECHNICAL_ISSUE;
				}

			} else {
				param.setMsg(Constants.TECHNICAL_ISSUE);
				statusMsg = Constants.TECHNICAL_ISSUE;
			}

		} catch (Exception e) {
			param.setMsg(Constants.TECHNICAL_ISSUE);
			e.printStackTrace();
			statusMsg = Constants.TECHNICAL_ISSUE;
		}

		if(statusMsg.split("\"").length>1){
			for(int i = 0;i<statusMsg.split("\"").length;i++){
				if(i==(statusMsg.split("\"").length-1)){
					statusMessage  =statusMessage + statusMsg.split("\"")[i];
				}else{
					statusMessage  =statusMessage + statusMsg.split("\"")[i] + "\\\"";
				}
			}
		}else{
			statusMessage = statusMsg;
		}
		LOGGER.info("statusMsg " + statusMsg);
		LOGGER.info("statusMsg " + statusMessage);
		System.out
				.println("Method end of createServiceOrderInSAP repair service impl ");
		param.setMsg(statusMessage);
		param.setServiceOrderCreatedArticleList(serviceOrderCreatedArticleList != null ? serviceOrderCreatedArticleList
				: new ArrayList<ServiceOrderArticles>());
	}

	private String construtXMLforRepairServiceOrderUpdate(String token,
			RepairCreateParam param) {

		System.out
				.println("method start of construtXMLforRepairServiceOrderUpdate service impl");

		StringBuffer xml = new StringBuffer(
				"<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='").append(repairServiceOrderUpdateURL)
				.append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>")

				.append("<d:IV_SERVICE_ORD_NO>")
				.append(param.getServiceOrderNo())
				.append("</d:IV_SERVICE_ORD_NO>").append("<d:IV_SITE>")
				.append(param.getSiteNo()).append("</d:IV_SITE>");

		if (param.getCustomerName() != null
				&& !param.getCustomerName().equals("")) {
			xml.append("<d:IV_CUST_NAME>").append(replaceSpecialCharacters(param.getCustomerName()))
					.append("</d:IV_CUST_NAME>");
		}
		if (param.getContactNumber() != null
				&& !param.getContactNumber().equals("")) {
			xml.append("<d:IV_CUST_CONTACT_NO>")
					.append(param.getContactNumber())
					.append("</d:IV_CUST_CONTACT_NO>");
		}

		if (param.getAddress() != null && !param.getAddress().equals("")) {
			xml.append("<d:IV_CUST_ADDR>").append(replaceSpecialCharacters(param.getAddress()))
					.append("</d:IV_CUST_ADDR>");
		}

		if (param.getPostCode() != null && !param.getPostCode().equals("")) {
			xml.append("<d:IV_CUST_POST_CODE>").append(param.getPostCode())
					.append("</d:IV_CUST_POST_CODE>");
		}

		if (param.getStoreContactName() != null
				&& !param.getStoreContactName().equals("")) {
			xml.append("<d:IV_STORE_CONTACT_NAME>")
					.append(replaceSpecialCharacters(param.getStoreContactName()))
					.append("</d:IV_STORE_CONTACT_NAME>");
		}

		if (param.getComments() != null && !param.getComments().equals("")) {
			xml.append("<d:IV_REMARKS>").append(replaceSpecialCharacters(param.getComments()))
					.append("</d:IV_REMARKS>");
		}
		
		if (param.getCostBorneBy() != null && !param.getCostBorneBy().equals("")) {
			xml.append("<d:IV_COST_BORNE_BY>").append(replaceSpecialCharacters(param.getCostBorneBy()))
					.append("</d:IV_COST_BORNE_BY>");
		}
		
		if (param.getTotalAmount() != null
				&& !param.getTotalAmount().equals("")) {
			xml.append("<d:IV_REPAIR_CHARGE>").append(param.getTotalAmount())
					.append("</d:IV_REPAIR_CHARGE>");
		}

		if (param.getFaultDesc() != null && !param.getFaultDesc().equals("")) {
			xml.append("<d:IV_REPAIR_DETAIL>").append(replaceSpecialCharacters(param.getFaultDesc()))
					.append("</d:IV_REPAIR_DETAIL>");
		}

		if (param.getService() != null && !param.getService().equals("")) {
			xml.append("<d:IV_WARRANTY>").append(replaceSpecialCharacters(param.getService()))
					.append("</d:IV_WARRANTY>");
		}

		if (param.getProofOfPurchase() != null
				&& !param.getProofOfPurchase().equals("")) {
			xml.append("<d:IV_PROOF_OF_PURCHASE>")
					.append(replaceSpecialCharacters(param.getProofOfPurchase()))
					.append("</d:IV_PROOF_OF_PURCHASE>");
		}

		if (param.getDateOfPurchase() != null
				&& !param.getDateOfPurchase().equals("")) {
			xml.append("<d:IV_DATE_OF_PURCHASE>")
					.append(Constants
							.convertRepairServiceOrderDateToSAPDate(param
									.getDateOfPurchase()))
					.append("</d:IV_DATE_OF_PURCHASE>");
		}

		if (param.getStockType() != null && !param.getStockType().equals("")) {
			xml.append("<d:IV_STOCK_TYPE>").append(replaceSpecialCharacters(param.getStockType()))
					.append("</d:IV_STOCK_TYPE>");
		}

		if (param.getContactMethod() != null
				&& !param.getContactMethod().equals("")) {
			xml.append("<d:IV_CONTACT_METHOD>")
					.append(replaceSpecialCharacters(param.getContactMethod()))
					.append("</d:IV_CONTACT_METHOD>");
		}

		if (param.getEmailId() != null && !param.getEmailId().equals("")) {
			xml.append("<d:IV_MAIL_ID>").append(replaceSpecialCharacters(param.getEmailId()))
					.append("</d:IV_MAIL_ID>");
		}

		if (param.getAuthorisationCode() != null
				&& !param.getAuthorisationCode().equals("")) {
			xml.append("<d:IV_AUTH_CODE>").append(replaceSpecialCharacters(param.getAuthorisationCode()))
					.append("</d:IV_AUTH_CODE>");
		}

		if (param.getAuthorizerName() != null
				&& !param.getAuthorizerName().equals("")) {
			xml.append("<d:IV_AUTHORITY_NAME>")
					.append(replaceSpecialCharacters(param.getAuthorizerName()))
					.append("</d:IV_AUTHORITY_NAME>");
		}

		if (param.getPickUpDate() != null && !param.getPickUpDate().equals("")) {
			xml.append("<d:IV_GOODS_PICK_UP_DATE>")
					.append(Constants
							.convertRepairServiceOrderDateToSAPDate(param.getPickUpDate()))
					.append("</d:IV_GOODS_PICK_UP_DATE>");
		}

		if (param.getCarrierName() != null
				&& !param.getCarrierName().equals("")) {
			xml.append("<d:IV_CARRIER_NAME>").append(replaceSpecialCharacters(param.getCarrierName()))
					.append("</d:IV_CARRIER_NAME>");
		}

		if (param.getConsignementNote() != null
				&& !param.getConsignementNote().equals("")) {
			xml.append("<d:IV_CONSIGNEMENT_NOTE>")
					.append(replaceSpecialCharacters(param.getConsignementNote()))
					.append("</d:IV_CONSIGNEMENT_NOTE>");
		}

		if (param.getCarrierContact() != null
				&& !param.getCarrierContact().equals("")) {
			xml.append("<d:IV_CARRIER_CONTACT>")
					.append(replaceSpecialCharacters(param.getCarrierContact()))
					.append("</d:IV_CARRIER_CONTACT>");
		}

		if (param.getClosureActCode() != null
				&& !param.getClosureActCode().equals("")) {
			xml.append("<d:IV_CLOSURE_ACT_CODE>")
					.append(replaceSpecialCharacters(param.getClosureActCode()))
					.append("</d:IV_CLOSURE_ACT_CODE>");
		}

		if (param.getStoreContactNo() != null
				&& !param.getStoreContactNo().equals("")) {
			xml.append("<d:IV_STORE_CONTACT_NO>")
					.append(replaceSpecialCharacters(param.getStoreContactNo()))
					.append("</d:IV_STORE_CONTACT_NO>");
		}

		if (param.getActualCompDate() != null
				&& !param.getActualCompDate().equals("")) {
			xml.append("<d:IV_ACTUAL_COMP_DATE>")
					.append(param.getActualCompDate())
					.append("</d:IV_ACTUAL_COMP_DATE>");
		}

		if (param.getExpResolutionDate() != null
				&& !param.getExpResolutionDate().equals("")) {
			xml.append("<d:IV_EXP_RESOLUTION_DATE>")
					.append(param.getExpResolutionDate())
					.append("</d:IV_EXP_RESOLUTION_DATE>");
		}

		if (param.getDueDate() != null && !param.getDueDate().equals("")) {
			xml.append("<d:IV_FOLLOW_UP_DATE>").append(Constants
					.convertRepairServiceOrderDateToSAPDate(param.getDueDate()))
					.append("</d:IV_FOLLOW_UP_DATE>");
		}
				
		if (param.getVendorReturnDate() != null && !param.getVendorReturnDate().equals("")) {
			xml.append("<d:IV_GR_DATE>")
					.append(param.getVendorReturnDate())
					.append("</d:IV_GR_DATE>");
		}
		
		if (param.getServiceFeedBack() != null && !param.getServiceFeedBack().equals("")) {
			xml.append("<d:IV_SERVICE_FEEDBACK>")
					.append(replaceSpecialCharacters(param.getServiceFeedBack()))
					.append("</d:IV_SERVICE_FEEDBACK>");
		}
		
		if (param.getCancelReason() != null && !param.getCancelReason().equals("")) {
			xml.append("<d:IV_CANCEL_REASON>")
					.append(replaceSpecialCharacters(param.getCancelReason()))
					.append("</d:IV_CANCEL_REASON>");
		}

		xml.append("</m:properties> ")
				.append("</atom:content>")
				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/POItems' type='application/atom+xml;type=feed'  title='ZNGBO_REPAIR_ORDER_CHNG.POHeader_POItem'>")
				.append("<m:inline><atom:feed>");

		xml.append("<atom:entry> <atom:content type='application/xml'><m:properties>");

		if (param.getServiceOrderNo() != null
				&& !param.getServiceOrderNo().equals("")) {
			xml.append("<d:IV_SERVICE_ORD_NO>")
					.append(param.getServiceOrderNo())
					.append("</d:IV_SERVICE_ORD_NO>");
		}

		if (param.getTotalAmount() != null
				&& !param.getTotalAmount().equals("")) {
			xml.append("<d:IV_VALUE>").append(param.getTotalAmount())
					.append("</d:IV_VALUE>");
		}
		
		if (param.getArticleNo() != null
				&& !param.getArticleNo().equals("")) {
			xml.append("<d:IV_ARTICLE>").append(param.getArticleNo())
					.append("</d:IV_ARTICLE>");
		}
		
			xml.append("<d:IV_QUANTITY>").append(Constants.REPAIR_QTY)
					.append("</d:IV_QUANTITY>");
			//HARDCODED AS SAID BY SATHISH 
			xml.append("<d:IV_UOM>").append(Constants.ARTICLE_UOM)
					.append("</d:IV_UOM>");
		
		xml.append("</m:properties> </atom:content></atom:entry>");

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		LOGGER.info(xml.toString());
		System.out
				.println("method end of construtXMLforRepairServiceOrderUpdate service impl");

		return xml.toString();
	}


	private String construtXMLforRepairServiceOrderReminder(String token,
			RepairCreateParam param) {

		System.out
				.println("method start of construtXMLforRepairServiceOrderReminder service impl");

		StringBuffer xml = new StringBuffer(
				"<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='").append(repairServiceOrderUpdateURL)
				.append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>")

				.append("<d:IV_SERVICE_ORD_NO>")
				.append(param.getServiceOrderNo())
				.append("</d:IV_SERVICE_ORD_NO>").append("<d:IV_SITE>")
				.append(param.getSiteNo()).append("</d:IV_SITE>")
		//<d:IV_REMINDER_DATE>20150329</d:IV_REMINDER_DATE>
				.append("<d:IV_REMINDER_DATE>")
				.append(DateUtil.formatDate(new Date(), "yyyyMMdd")).append("</d:IV_REMINDER_DATE>");

		xml.append("</m:properties> ")
				.append("</atom:content>")
				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/POItems' type='application/atom+xml;type=feed'  title='ZNGBO_REPAIR_ORDER_CHNG.POHeader_POItem'>")
				.append("<m:inline><atom:feed>");

		xml.append("<atom:entry> <atom:content type='application/xml'><m:properties>");

		if (param.getServiceOrderNo() != null
				&& !param.getServiceOrderNo().equals("")) {
			xml.append("<d:IV_SERVICE_ORD_NO>")
					.append(param.getServiceOrderNo())
					.append("</d:IV_SERVICE_ORD_NO>");
		}

		if (param.getTotalAmount() != null
				&& !param.getTotalAmount().equals("")) {
			xml.append("<d:IV_VALUE>").append(param.getTotalAmount())
					.append("</d:IV_VALUE>");
		}
		
		xml.append("</m:properties> </atom:content></atom:entry>");

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		LOGGER.info(xml.toString());
		System.out
				.println("method end of construtXMLforRepairServiceOrderReminder service impl");

		return xml.toString();
	}

	
	
	public String getCartonLabelForServiceOrder(RepairSearchParam param,UserContext user) {

		LOGGER.info("METHOD STATRT getCartonLabelForServiceOrder SERVICE IMPL");

		// USE LOGGER AT METHOD START AND END. TO TRACK THE METHOD FLOW
		// HERE AFTER WE WILL USE ALL METHOD RETURN TYPE AS STRING, EXCEPT FOR
		// ON PAGE LOAD CALLS
		// DECLARE ALL THE VARIABLES INSTANCE IN THE METHOD START, LATER CREATE
		// OBJECT FOR THAT
		// GIVE A MEANING FULL NAME FOR ALL THE VARIABLES

		String urlParam = null;
		URI url = null;
		String statusMsg = "";
		RepairCartonLabelDetailsResponse response = null;
		ArrayList<RepairCartonLabelDetails> repairCartonLabelDetails = null;
		StringBuffer queryStr = null;

		if ((param.getSiteNo() == null || param.getSiteNo().equals(""))
				|| (param.getServiceOrderNo() == null || param
						.getServiceOrderNo().equals(""))
				|| (param.getVendorNo() == null || param.getVendorNo().equals(
						""))) {
			statusMsg = Constants.MANDATORY;
		} else {

			queryStr = new StringBuffer("iv_site eq '").append(
					param.getSiteNo()).append("'");

			if (param.getServiceOrderNo() != null
					&& !param.getServiceOrderNo().equals("")) {
				queryStr.append(" and iv_order_no eq '")
						.append(param.getServiceOrderNo()).append("'");
			}
			if (param.getVendorNo() != null && !param.getVendorNo().equals("")) {
				queryStr.append(" and iv_lifnr eq '")
						.append(param.getVendorNo()).append("'");
			}

			LOGGER.info("URL repairCartonLabelDetailsURL  "
					+ repairCartonLabelDetailsURL);

			urlParam = queryStr.toString();
			// ADDED FOR TESTING COMMENT BELOW LING BEFORE DEPLOYMENT
			// urlParam = "iv_site eq '1008' and iv_order_no eq '4600083404'";

			// USE TRY CATCH TO HANDLE All THE ERROR WITH SERVICE CALL
			try {

				// ENCODE URL, BECAUSE SOME TIMES URL MAY CONTAIN SPECIAL
				// CHARACTER LIKE( & % $)
				urlParam = repairCartonLabelDetailsURL
						+ URLEncoder.encode(urlParam, "UTF-8");
				url = new URI(urlParam);

				LOGGER.info(urlParam);

				LOGGER.info("URL urlParam  " + urlParam);

				// CALLING SERVICE URL (USE THIS BELOW METHOD FOR SERVICE CALL
				// FOR GET)
				// IF YOU NEED STATUS CODE OF THE WEBSERVICE CALL THAN USE THE
				// EXCHANGED
				response = getRestTemplate(user).getForObject(url,
						RepairCartonLabelDetailsResponse.class);

				// ALWAYS GO WITH POSITIVE SCENARIO
				if (response != null
						&& response.getRepairCartonLabelDetailsResponseHelper() != null
						&& response.getRepairCartonLabelDetailsResponseHelper()
								.getRepairCartonLabelDetails() != null
						&& !response
								.getRepairCartonLabelDetailsResponseHelper()
								.getRepairCartonLabelDetails().equals("")
						&& response.getRepairCartonLabelDetailsResponseHelper()
								.getRepairCartonLabelDetails().size() > 0) {
					repairCartonLabelDetails = response
							.getRepairCartonLabelDetailsResponseHelper()
							.getRepairCartonLabelDetails();
					statusMsg = Constants.TRUE;
				} else {
					statusMsg = Constants.NDF;
				}

			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (URISyntaxException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
				statusMsg = Constants.ERROR_WITH_URL;
			} catch (Exception e) {
				e.printStackTrace();
				statusMsg = Constants.SERVICE_ISSUE;
			}
		}
		LOGGER.info("Response  statusMsg  " + statusMsg);
		LOGGER.info("METHOD END searchServiceOrder SERVICE IMPL");
		return Constants.convertToJsonString(repairCartonLabelDetails,
				statusMsg);

	}

	public String cancelServiceOrder(RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start cancelServiceOrder SERVICE IMPL");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;
		HttpHeaders requestHeaders = new HttpHeaders();
		String statusMsg = "";
		requestHeaders.add(Constants.X_CSRF_TOKEN, Constants.FETCH);
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(
					repairCancelServiceOrderTokenURL, HttpMethod.GET,
					requestEntity, Object.class);

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();

			String token = responseHeaders.getFirst(Constants.X_CSRF_TOKEN);
			LOGGER.info("token __" + token);
			cancelServiceOrderInSAP(token, param,user);
			serviceOrderCreatedArticleList = param
					.getServiceOrderCreatedArticleList();
			statusMsg = param.getMsg();
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.TECHNICAL_ISSUE);
			statusMsg = Constants.TECHNICAL_ISSUE;
		}
		LOGGER.info("METHOD end cancelServiceOrder SERVICE IMPL");
		return Constants.convertToJsonString(serviceOrderCreatedArticleList,
				statusMsg);
	}

	private void cancelServiceOrderInSAP(String token, RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start cancelServiceOrder SERVICE IMPL");

		System.out
				.println("Method start of cancelServiceOrder repair service impl ");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;

		HttpHeaders postrequestHeaders = new HttpHeaders();

		String statusMsg = "";

		postrequestHeaders.add(Constants.X_CSRF_TOKEN, token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String postXml = construtXMLforRepairServiceOrderCancel(token, param);

		LOGGER.info("postXml__" + postXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(postXml,
				postrequestHeaders);
		ResponseEntity<RepairCreateServiceOrderResponse> response = null;
		try {

			response = getForPostRestTemplate(user).exchange(

			repairCancelServiceOrderURL, HttpMethod.POST, requestEntity,

			RepairCreateServiceOrderResponse.class);
			LOGGER.info("&*@^*^#$^$#^&"
					+ CommonUtils.convertObjectTojson(response));

			if (response != null
					&& response.getBody() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList().size() > 0) {

				serviceOrderCreatedArticleList = (ArrayList<ServiceOrderArticles>) response
						.getBody().getRepairCreateServiceOrderResponseHelper()
						.getPoItems().getServiceOrderArticlesList();

				if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim()
								.equals(Constants.SUCCESS_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim().equals(Constants.ERROR_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else {
					// NEED TO CHANGED THE BELOW MSG
					statusMsg = Constants.TECHNICAL_ISSUE;
				}

			} else {
				param.setMsg(Constants.TECHNICAL_ISSUE);
				statusMsg = Constants.TECHNICAL_ISSUE;
			}

		} catch (Exception e) {
			param.setMsg(Constants.REPAIR_SERVICE_ORDER_CREATION_FAILED);
			e.printStackTrace();
			statusMsg = Constants.REPAIR_SERVICE_ORDER_CREATION_FAILED;
		}

		LOGGER.info("statusMsg " + statusMsg);
		System.out
				.println("Method end of cancelServiceOrderInSAP repair service impl ");
		param.setServiceOrderCreatedArticleList(serviceOrderCreatedArticleList != null ? serviceOrderCreatedArticleList
				: new ArrayList<ServiceOrderArticles>());
		param.setMsg(statusMsg);

		LOGGER.info("METHOD end cancelServiceOrderInSAP SERVICE IMPL");
	}

	private String construtXMLforRepairServiceOrderCancel(String token,
			RepairCreateParam param) {

		LOGGER.info("METHOD start construtXMLforRepairServiceOrderCancel SERVICE IMPL");

		StringBuffer xml = new StringBuffer(
				"<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='").append(repairCancelServiceOrderURL)
				.append("'> ")

				.append("<atom:content type='ap12plication/xml'> ")
				.append("<m:properties>")

				.append("<d:IV_SITE>").append(param.getSiteNo())
				.append("</d:IV_SITE>")

				.append("<d:IV_ORDER_NO>").append(param.getServiceOrderNo())
				.append("</d:IV_ORDER_NO>");

		// THIS FIELD IS MANDATORY AS DISCUSSED WITH MITRA
		if (param.getCustomerName() != null
				&& !param.getCustomerName().equals(""))
			xml.append("<d:IV_NAME>").append(replaceSpecialCharacters(param.getCustomerName()))
					.append("</d:IV_NAME>");

		// THIS FIELD IS MANDATORY AS DISCUSSED WITH MITRA
		if (param.getContactNumber() != null
				&& !param.getContactNumber().equals(""))
			xml.append("<d:IV_NUMBER>").append(replaceSpecialCharacters(param.getContactNumber()))
					.append("</d:IV_NUMBER>");

		// TODAY DATE
		xml.append("<d:IV_DOC_DATE>")
				.append(PortalUtil.currentDate())
				.append("</d:IV_DOC_DATE>")

				// TODAY DATE
				.append("<d:IV_POSTING_DATE>")
				.append(PortalUtil.currentDate())
				.append("</d:IV_POSTING_DATE>")

				// AS INFORMED BY MITRA THIS IS HARD CODED
				.append("<d:IV_STO_LOC>").append(Constants.STORE_LOCATION)
				.append("</d:IV_STO_LOC>")

				// AS INFORMED BY MITRA THIS IS HARD CODED
				.append("<d:IV_TCODE>").append(Constants.TCODE)
				.append("</d:IV_TCODE>");
		
		// FROM SCREEN
		if (param.getClosureActCode() != null
				&& !param.getClosureActCode().equals(""))
			xml.append("<d:IV_CLOSURE_CODE>").append(replaceSpecialCharacters(param.getClosureActCode()))
					.append("</d:IV_CLOSURE_CODE>");

		// FROM SCREEN
		if (param.getRemarks() != null && !param.getRemarks().equals(""))
			xml.append("<d:IV_REMARKS>").append(replaceSpecialCharacters(param.getRemarks()))
					.append("</d:IV_REMARKS>");

		// FROM SCREEN
		if (param.getCancelReason() != null
				&& !param.getCancelReason().equals(""))
			xml.append("<d:IV_CANCEL_REASON>").append(replaceSpecialCharacters(param.getCancelReason()))
					.append("</d:IV_CANCEL_REASON>");

		// FROM SCREEN
		if (param.getAuthorisationCode() != null
				&& !param.getAuthorisationCode().equals(""))
			xml.append("<d:IV_AUTH_CODE>").append(replaceSpecialCharacters(param.getAuthorisationCode()))
					.append("</d:IV_AUTH_CODE>");

		xml.append("</m:properties> ")
				.append("</atom:content>")
				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/POItems' type='application/atom+xml;type=feed'  title='ZNGBO_REPAIR_ORDER_CREATE.POHeader_POItem'>")
				.append("<m:inline><atom:feed>");

		xml.append(
				"<atom:entry> <atom:content type='application/xml'><m:properties>")

		.append("<d:IV_SITE>").append(param.getSiteNo()).append("</d:IV_SITE>")

		.append("<d:IV_ARTICLE>").append(param.getArticleNo())
				.append("</d:IV_ARTICLE>")

				.append("<d:IV_QUANTITY>").append(Constants.REPAIR_QTY)
				.append("</d:IV_QUANTITY>");
		//HARDCODED AS SAID BY SATHISH 
				xml.append("<d:IV_UOM>").append(Constants.ARTICLE_UOM)
						.append("</d:IV_UOM>");
		// THIS WILL BE REMOVED FROM THE SERVICE AND SCREEN
		if (param.getTotalAmount() != null
				&& !param.getTotalAmount().equals(""))
			xml.append("<d:IV_PAY_AMOUNT>").append(param.getTotalAmount())
					.append("</d:IV_PAY_AMOUNT>");

		xml.append("</m:properties> </atom:content></atom:entry>");

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		LOGGER.info("METHOD end construtXMLforRepairServiceOrderCancel SERVICE IMPL");

		return xml.toString();
	}

	public String completeServiceOrder(RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start completeServiceOrder SERVICE IMPL");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;
		HttpHeaders requestHeaders = new HttpHeaders();
		String statusMsg = "";
		requestHeaders.add(Constants.X_CSRF_TOKEN, Constants.FETCH);
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(
					repairCompleteServiceOrderTokenURL, HttpMethod.GET,
					requestEntity, Object.class);

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();

			String token = responseHeaders.getFirst(Constants.X_CSRF_TOKEN);
			LOGGER.info("token __" + token);
			completeServiceOrderInSAP(token, param,user);
			serviceOrderCreatedArticleList = param
					.getServiceOrderCreatedArticleList();
			statusMsg = param.getMsg();
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.TECHNICAL_ISSUE);
			statusMsg = Constants.TECHNICAL_ISSUE;
		}
		LOGGER.info("METHOD end completeServiceOrder SERVICE IMPL");
		return Constants.convertToJsonString(serviceOrderCreatedArticleList,
				statusMsg);
	}

	private void completeServiceOrderInSAP(String token, RepairCreateParam param,UserContext user) {

		LOGGER.info("METHOD start completeServiceOrderInSAP SERVICE IMPL");

		System.out
				.println("Method start of completeServiceOrderInSAP repair service impl ");

		ArrayList<ServiceOrderArticles> serviceOrderCreatedArticleList = null;

		HttpHeaders postrequestHeaders = new HttpHeaders();

		String statusMsg = "";

		postrequestHeaders.add(Constants.X_CSRF_TOKEN, token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String postXml = construtXMLforRepairServiceOrderComplete(token, param);

		LOGGER.info("postXml__" + postXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(postXml,
				postrequestHeaders);
		ResponseEntity<RepairCreateServiceOrderResponse> response = null;
		try {

			response = getForPostRestTemplate(user).exchange(

			repairCompleteServiceOrderURL, HttpMethod.POST, requestEntity,

			RepairCreateServiceOrderResponse.class);
			LOGGER.info("&*@^*^#$^$#^&"
					+ CommonUtils.convertObjectTojson(response));

			if (response != null
					&& response.getBody() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList() != null
					&& response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getPoItems().getServiceOrderArticlesList().size() > 0) {

				serviceOrderCreatedArticleList = (ArrayList<ServiceOrderArticles>) response
						.getBody().getRepairCreateServiceOrderResponseHelper()
						.getPoItems().getServiceOrderArticlesList();

				if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim()
								.equals(Constants.SUCCESS_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else if (response.getBody()
						.getRepairCreateServiceOrderResponseHelper()
						.getIV_TYP() != null
						&& response.getBody()
								.getRepairCreateServiceOrderResponseHelper()
								.getIV_TYP().trim().equals(Constants.ERROR_MSG)) {
					statusMsg = response.getBody()
							.getRepairCreateServiceOrderResponseHelper()
							.getIV_MSG();
				} else {
					// NEED TO CHANGED THE BELOW MSG
					statusMsg = Constants.TECHNICAL_ISSUE;
				}

			} else {
				param.setMsg(Constants.TECHNICAL_ISSUE);
				statusMsg = Constants.TECHNICAL_ISSUE;
			}

		} catch (Exception e) {
			param.setMsg(Constants.REPAIR_SERVICE_ORDER_CREATION_FAILED);
			e.printStackTrace();
			statusMsg = Constants.REPAIR_SERVICE_ORDER_CREATION_FAILED;
		}

		LOGGER.info("statusMsg " + statusMsg);
		System.out
				.println("Method end of completeServiceOrderInSAP repair service impl ");
		param.setServiceOrderCreatedArticleList(serviceOrderCreatedArticleList != null ? serviceOrderCreatedArticleList
				: new ArrayList<ServiceOrderArticles>());
		param.setMsg(statusMsg);

		LOGGER.info("METHOD end completeServiceOrderInSAP SERVICE IMPL");
	}

	private String construtXMLforRepairServiceOrderComplete(String token,
			RepairCreateParam param) {

		LOGGER.info("METHOD start construtXMLforRepairServiceOrderComplete SERVICE IMPL");

		StringBuffer xml = new StringBuffer(
				"<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='").append(repairCompleteServiceOrderURL)
				.append("'> ")

				.append("<atom:content type='ap12plication/xml'> ")
				.append("<m:properties>")

				.append("<d:IV_SITE>").append(param.getSiteNo())
				.append("</d:IV_SITE>")

				.append("<d:IV_ORDER_NO>").append(param.getServiceOrderNo())
				.append("</d:IV_ORDER_NO>");

		// THIS FIELD IS MANDATORY AS DISCUSSED WITH MITRA
		if (param.getCustomerName() != null
				&& !param.getCustomerName().equals(""))
			xml.append("<d:IV_NAME>").append(replaceSpecialCharacters(param.getCustomerName()))
					.append("</d:IV_NAME>");
		
		// THIS FIELD IS MANDATORY AS DISCUSSED WITH MITRA
		if (param.getContactNumber() != null
				&& !param.getContactNumber().equals(""))
			xml.append("<d:IV_NUMBER>").append(param.getContactNumber())
					.append("</d:IV_NUMBER>");

		
		// TODAY DATE
		xml.append("<d:IV_DOC_DATE>")
				.append(PortalUtil.currentDate())
				.append("</d:IV_DOC_DATE>")

				// TODAY DATE
				.append("<d:IV_POSTING_DATE>")
				.append(PortalUtil.currentDate())
				.append("</d:IV_POSTING_DATE>")

				.append("<d:IV_TCODE>").append(Constants.TCODE)
				.append("</d:IV_TCODE>");

		if (param.getClosureActCode() != null
				&& !param.getClosureActCode().equals(""))
			// FROM SCREEN DCR #
			xml.append("<d:IV_CLOSURE_CODE>").append(replaceSpecialCharacters(param.getClosureActCode()))
					.append("</d:IV_CLOSURE_CODE>");

		if (param.getRemarks() != null && !param.getRemarks().equals(""))
			// FROM SCREEN DCR #
			xml.append("<d:IV_REMARKS>").append(replaceSpecialCharacters(param.getRemarks()))
					.append("</d:IV_REMARKS>");

		if (param.getConsignementNote() != null
				&& !param.getConsignementNote().equals(""))
			// FROM SCREEN DCR #
			xml.append("<d:IV_CONSIGNMENT_NOTE>")
					.append(replaceSpecialCharacters(param.getConsignementNote()))
					.append("</d:IV_CONSIGNMENT_NOTE>");

		if (param.getServiceFeedBack() != null
				&& !param.getServiceFeedBack().equals(""))
			// FROM SCREEN
			xml.append("<d:IV_SERVICE_FEEDBACK>")
					.append(replaceSpecialCharacters(param.getServiceFeedBack()))
					.append("</d:IV_SERVICE_FEEDBACK>");

		xml.append("</m:properties> ")
				.append("</atom:content>")
				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/POItems' type='application/atom+xml;type=feed'  title='ZNGBO_REPAIR_ORDER_CREATE.POHeader_POItem'>")
				.append("<m:inline><atom:feed>");

		xml.append(
				"<atom:entry> <atom:content type='application/xml'><m:properties>")

		.append("<d:IV_SITE>").append(param.getSiteNo()).append("</d:IV_SITE>")

		.append("<d:IV_ARTICLE>").append(replaceSpecialCharacters(param.getArticleNo()))
				.append("</d:IV_ARTICLE>")

				.append("<d:IV_ARTICLE_DESC>").append(replaceSpecialCharacters(param.getArticleDesc()))
				.append("</d:IV_ARTICLE_DESC>");

		// NEED TO BE CONFIRMED BY SATHISH
		if (param.getHdrText() != null && !param.getHdrText().equals(""))
			xml.append("<d:IV_HDR_TEXT>").append(Constants.REPAIR_QTY)
					.append("</d:IV_HDR_TEXT>");

		xml.append("<d:IV_QUANTITY>").append(Constants.REPAIR_QTY)
				.append("</d:IV_QUANTITY>");
		//HARDCODED AS SAID BY SATHISH 
		xml.append("<d:IV_UOM>").append(Constants.ARTICLE_UOM)
				.append("</d:IV_UOM>");
				// MANDATORY FIELD
		xml.append("<d:IV_PRICE>").append(param.getTotalAmount())
				.append("</d:IV_PRICE>");

		xml.append("</m:properties> </atom:content></atom:entry>");

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		LOGGER.info("METHOD end construtXMLforRepairServiceOrderComplete SERVICE IMPL");

		return xml.toString();
	}
	

	private String replaceSpecialCharacters(String feildValue){

		if(feildValue.indexOf('&')!=-1)
		{
			feildValue = feildValue.replaceAll("[&]", "&amp;");
		}
		if(feildValue.indexOf('>')!=-1)
		{
			feildValue =feildValue.replace(">", "&gt;");
		}
		if(feildValue.indexOf('<')!=-1)
		{
			feildValue =feildValue.replace("<", "&lt;");
		}
		return feildValue;
		}
	
}