package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.controller.ITAdminManagementController;
import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.ArticleQueryStatus;
import au.com.woolworths.portal.model.ArticleQueryStatusResponse;
import au.com.woolworths.portal.model.OrderRosterReport;
import au.com.woolworths.portal.model.OrderRosterReportResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ViewArticleQuery;
import au.com.woolworths.portal.model.ViewArticleQueryDetails;
import au.com.woolworths.portal.model.ViewArticleQueryDetailsResponse;
import au.com.woolworths.portal.model.ViewArticleQueryResponse;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.OrderRosterReportParam;
import au.com.woolworths.portal.util.PortalUtil;

public class AQMSearchQueryServiceImpl extends CommonServiceImpl {

	@Value("#{url['ViewQueryStatusServiceURL']}")
	private String viewQueryStatusServiceURL;

	@Value("#{url['ViewQueryDetailsServiceURL']}")
	private String viewQueryDetailsServiceURL;

	@Value("#{url['SearchArticleQueryServiceURL']}")
	private String searchArticleQueryServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger
			.getLogger(AQMSearchQueryServiceImpl.class.getName());
	
	public ArrayList<ViewArticleQuery> getQueryList(AQMSearchQueryParam param,UserContext user) {

		StringBuffer urlParam = new StringBuffer();

		// if (param.getSiteNo() != null && param.getSiteNo().trim().length() >
		// 0) {

		urlParam.append("storeNo/")
				.append((param.getSiteNo() != null && param.getSiteNo().trim()
						.length() > 0) ? param.getSiteNo() : "null")
				// }
				// if (param.getSalesOrg() != null
				// && param.getSalesOrg().trim().length() > 0) {

				.append("/salesOrg/")
				.append((param.getSalesOrg() != null && param.getSalesOrg()
						.trim().length() > 0) ? (param.getSalesOrg()) : "null")

				// }
				// if (param.getArticleNo() != null
				// && param.getArticleNo().trim().length() > 0) {

				.append("/articleNo/")
				.append((param.getArticleNo() != null && param.getArticleNo()
						.trim().length() > 0 ) ? (param.getArticleNo().trim()) : "null")

				.append("/uom/")
				.append((param.getUom() != null && param.getUom().trim()
						.length() > 0 && !(param.getQueryId() != null && param.getQueryId()
								.trim().length() > 0)) ? (param.getUom()) : "null")

				.append("/type/")
				.append((param.getSearchByOptions() != null && param
						.getSearchByOptions().trim().length() > 0 && !(param.getQueryId() != null && param.getQueryId()
								.trim().length() > 0)) ? (param
						.getSearchByOptions().trim()) : "null")

				// if (param.getArticleGtin() != null
				// && param.getArticleGtin().trim().length() > 0) {

				/*
				 * .append("/articleGtin/") .append((param.getArticleGtin() !=
				 * null && param .getArticleGtin().trim().length() > 0) ? (param
				 * .getArticleGtin()) : "null")
				 */

				/*
				 * } else { urlParam += "/suppNo/" + "null"; }
				 */
				// if (param.getArticleDesc() != null &&
				// param.getArticleDesc().trim().length() > 0) {

				/*
				 * .append("/articleDesc/") .append((param.getArticleDesc() !=
				 * null && param .getArticleDesc().trim().length() > 0) ? (param
				 * .getArticleDesc()) : "null")
				 */
				// }
				// if (param.getSearchMode() != null &&
				// param.getSearchMode().trim().length() > 0) {
				/*
				 * .append("/searchMode/") .append((param.getSearchMode() !=
				 * null && param.getSearchMode() .trim().length() > 0) ?
				 * (param.getSearchMode()) : "null")
				 */

				// }

				// if (param.getQueryId() != null &&
				// param.getQueryId().trim().length()
				// > 0) {

				.append("/queryId/")
				.append((param.getQueryId() != null && param.getQueryId()
						.trim().length() > 0) ? (param.getQueryId().trim()) : "null")

				// }

				// if (param.getQueryStatus() != null &&
				// param.getQueryStatus().trim().length() > 0) {

				.append("/queryStatus/")
				.append((param.getQueryStatus() != null
						&& param.getQueryStatus().trim().length() > 0 && !param
						.getQueryStatus().equalsIgnoreCase("select") && !(param.getQueryId() != null && param.getQueryId()
								.trim().length() > 0)) ? (param
						.getQueryStatus().trim()) : "null")

				// }
				// if (param.getSubmitBy() != null &&
				// param.getSubmitBy().trim().length() > 0) {

				.append("/submitBy/")
				.append((param.getSubmitBy() != null && param.getSubmitBy()
						.trim().length() > 0 && !(param.getQueryId() != null && param.getQueryId()
								.trim().length() > 0)) ? (param.getSubmitBy().replaceAll("\\s+", "").replaceAll(" - ", "_")) : "null")//defect 14656

				// }
				// if (param.getSubmitFromDate() != null &&
				// param.getSubmitFromDate().trim().length() > 0) {

				.append("/submitDateFrom/")
				.append((param.getSubmitFromDate() != null && param
						.getSubmitFromDate().trim().length() > 0 && !(param.getQueryId() != null && param.getQueryId()
								.trim().length() > 0)) ? (PortalUtil
						.convertToDBDate(param.getSubmitFromDate())) : "null")
						.append("/submitDateTo/")
				.append((param.getSubmitToDate() != null && param
						.getSubmitToDate().trim().length() > 0 && !(param.getQueryId() != null && param.getQueryId()
								.trim().length() > 0)) ? (PortalUtil
						.convertToDBDate(param.getSubmitToDate())) : "null")

				// }
				// if (param.getSubmitToDate() != null &&
				// param.getSubmitToDate().trim().length() > 0) {

				/*
				 * .append("/submitToDate/") .append((param.getSubmitToDate() !=
				 * null && param .getSubmitToDate().trim().length() > 0) ?
				 * (PortalUtil .convertToDBDate(param.getSubmitToDate())) :
				 * "null")
				 */

				// }

				// if (param.getPageNo() != null &&
				// param.getPageNo().trim().length() >
				// 0) {

				.append("/recCount/" + pageSize)
				.append("/pageNo/")
				.append((param.getPageNo() != null && param.getPageNo().trim()
						.length() > 0) ? (param.getPageNo()) : "null");

		/*
		 * } else { urlParam += "/pageNo/" + "1" + "/recordCnt/" + pageSize; }
		 */
		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";

		// comment start it
		System.out.println("urlParam"+searchArticleQueryServiceURL+urlParam);
		// urlParam=new
		// StringBuffer("storeNo/1030/salesOrg/1020/articleNo/null/queryId/1002/queryStatus/null/submitBy/null/submitDate/null/recCount/1/pageNo/1");
		// comment end it

		LOGGER.info(urlParam);

		ViewArticleQueryResponse response = null;
		URI url = null;
		try {
			url = new URI(searchArticleQueryServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					ViewArticleQueryResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if ((response != null
				&& response.getViewArticleQueryResponseHelper() != null && response
				.getViewArticleQueryResponseHelper().getViewArticleQuery() != null)) {

			if (!(response.getViewArticleQueryResponseHelper()
					.getViewArticleQuery().get(0).getMsg().trim().length() > 0)) {
				return (ArrayList<ViewArticleQuery>) response
						.getViewArticleQueryResponseHelper()
						.getViewArticleQuery();
			} else if (response.getViewArticleQueryResponseHelper()
					.getViewArticleQuery().get(0).getMsg().trim()
					.equalsIgnoreCase("No Data Found")) {
				param.setOption("NDF");
				param.setMsg("Sorry, no results found for your search criteria. Please try again");
			} else {
				//System.out.println("msg"
//						+ response.getViewArticleQueryResponseHelper()
//								.getViewArticleQuery().get(0).getMsg());
				param.setMsg(response.getViewArticleQueryResponseHelper()
						.getViewArticleQuery().get(0).getMsg());
			}
		}
		return null;

	}

	public ArrayList<ArticleQueryStatus> getQueryStatusList(UserContext user) {

		// StringBuffer urlParam = new StringBuffer();

		/*
		 * urlParam.append("storeNo/") .append((param.getSiteNo() != null &&
		 * param.getSiteNo().trim() .length() > 0) ? param.getSiteNo() : "null")
		 * 
		 * .append("/salesOrg/") .append((param.getSalesOrg() != null &&
		 * param.getSalesOrg() .trim().length() > 0) ? (param.getSalesOrg()) :
		 * "null");
		 */

		/*
		 * } else { urlParam += "/pageNo/" + "1" + "/recordCnt/" + pageSize; }
		 */
		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";
		// LOGGER.info(urlParam);

		ArticleQueryStatusResponse response = null;
		URI url = null;
		try {
			url = new URI(viewQueryStatusServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					ArticleQueryStatusResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		}

		return (ArrayList<ArticleQueryStatus>) response
				.getArticleQueryStatusResponseHelper()
				.getArticleQueryStatusList();

	}

	public ArrayList<ViewArticleQueryDetails> getQueryDetail(
			AQMSearchQueryParam param,UserContext user) {

		StringBuffer urlParam = new StringBuffer();

		urlParam.append("storeNo/")
				.append((param.getSiteNo() != null && param.getSiteNo().trim()
						.length() > 0) ? param.getSiteNo() : "null")

				/*
				 * .append("/salesOrg/") .append((param.getSalesOrg() != null &&
				 * param.getSalesOrg() .trim().length() > 0) ?
				 * (param.getSalesOrg()) : "null")
				 */

				.append("/queryId/")
				.append((param.getQueryId() != null && param.getQueryId()
						.trim().length() > 0) ? (param.getQueryId()) : "null");

		/*
		 * .append("/recCount/" + pageSize) .append("/pageNo/")
		 * .append((param.getPageNo() != null && param.getPageNo().trim()
		 * .length() > 0) ? (param.getPageNo()) : "null");
		 */

		/*
		 * } else { urlParam += "/pageNo/" + "1" + "/recordCnt/" + pageSize; }
		 */
		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";
		// comment start it
		System.out.println(viewQueryDetailsServiceURL+urlParam);
		// urlParam=new StringBuffer("storeNo/1030/queryId/1002");
		// comment ends
		LOGGER.info(urlParam);

		ViewArticleQueryDetailsResponse response = null;
		URI url = null;
		try {
			url = new URI(viewQueryDetailsServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					ViewArticleQueryDetailsResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		}

		return (ArrayList<ViewArticleQueryDetails>) response
				.getViewArticleQueryDetailsResponseHelper()
				.getViewArticleQueryDetailsList();

	}

	public ArrayList<OrderRosterReport> getOrderRosterReport1(
			OrderRosterReportParam param,UserContext user) {

		URI url = null;
		try {
			url = new URI(
					"http://localhost:8080/replenishmentServices/services/orderRoster/stub");
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();
		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<OrderRosterReportResponse> response = null;

		try {
			response = getForPostRestTemplate(user).exchange(url, HttpMethod.POST,
					requestEntity, OrderRosterReportResponse.class);

			if (response == null) {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return (ArrayList<OrderRosterReport>) response.getBody().getResponse()
				.getOrderRosterReportList();
	}
}
