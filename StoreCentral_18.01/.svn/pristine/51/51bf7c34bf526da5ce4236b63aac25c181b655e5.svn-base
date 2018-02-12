/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.ArticleResultsResponse;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.GoodsReceiptPostResonse;
import au.com.woolworths.portal.model.Order;
import au.com.woolworths.portal.model.OrderDetail;
import au.com.woolworths.portal.model.OrderDetailResponse;
import au.com.woolworths.portal.model.OrderResponse;
import au.com.woolworths.portal.model.PostResponse;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoreResponse;
import au.com.woolworths.portal.model.StoresNearByModel;
import au.com.woolworths.portal.model.StoresNearByModelResponse;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.SupplierModelResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.CancelOrderParam;
import au.com.woolworths.portal.param.IBTOrderParam;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.param.OrderParam;
import au.com.woolworths.portal.param.ReceiveParam;
import au.com.woolworths.portal.util.PortalUtil;

/**
 * @author xrca4
 * 
 */
public class PReqServiceImpl extends CommonServiceImpl {

	@Value("#{url['StoreServiceURL']}")
	private String storeServiceURL;

	@Value("#{url['StdPoReceiveArticleTokenURL']}")
	private String stdPoReceiveArticleTokenURL;

	@Value("#{url['StdPoReceiveArticlePostURL']}")
	private String stdPoReceiveArticlePostURL;

	@Value("#{url['StandardPoReceivePostURL']}")
	private String standardPoReceivePostURL;

	@Value("#{url['StandardPoReceiveTokenURL']}")
	private String standardPoReceiveTokenURL;

	@Value("#{url['CancelOrderTokenURL']}")
	private String cancelOrderTokenURL;

	@Value("#{url['CancelOrderPostURL']}")
	private String cancelOrderPostURL;

	@Value("#{url['OrderEnquiryURL']}")
	private String orderEnquiryURL;

	@Value("#{url['OrderDetailURL']}")
	private String orderDetailURL;

	@Value("#{url['ArticleListingServiceURL']}")
	private String articleListingServiceURL;

	@Value("#{url['UpdateDelDateTokenURL']}")
	private String updateDelDateTokenURL;

	@Value("#{url['UpdateDelDatePostURL']}")
	private String updateDelDatePostURL;

	@Value("#{url['SupplierSearchURL']}")
	private String supplierSearchURL;

	@Value("#{url['StoresNearByURL']}")
	private String storesNearByURL;

	@Value("#{url['IBTGoodsReceiptPostURL']}")
	private String ibtGoodsReceiptPostURL;

	@Value("#{url['IBTGoodsReceiptTokenURL']}")
	private String ibtGoodsReceiptTokenURL;

	@Value("#{url['IBTOrderAdjustTokenURL']}")
	private String ibtOrderAdjustTokenURL;

	@Value("#{url['IBTOrderAdjustPostURL']}")
	private String ibtOrderAdjustPostURL;

	@Value("#{url['ManualOrderRefSql']}")
	private String manualOrderRefSql;

	@Value("#{url['IBTOrderRefSql']}")
	private String ibtOrderRefSql;

	@Value("#{url['PageSize']}")
	private String pageSize;

	@Value("#{url['StdPoReceiveDocketURL']}")
	private String StdPoReceiveDocketURL;

	@Value("#{url['StdPoReceiveDocketPostURL']}")
	private String StdPoReceiveDocketPostURL;

	private String StoN0 = "000123";

	@Value("#{url['vendorClaimsPostURL']}")
	private String vendorClaimsPostURL;

	@Value("#{url['vendorClaimsTokenURL']}")
	private String vendorClaimsTokenURL;

	@Value("#{url['PurReqCreateURL']}")
	private String PurReqCreateURL;

	@Value("#{url['PurReqCreatePostURL']}")
	private String PurReqCreatePostURL;

	@Value("#{url['PurReqToPOCreateURL']}")
	private String PurReqToPOCreateURL;

	@Value("#{url['PurReqToPOCreatePostURL']}")
	private String PurReqToPOCreatePostURL;

	@Value("#{url['PurReqChangeURL']}")
	private String PurReqChangeURL;

	@Value("#{url['PurReqChangePostURL']}")
	private String PurReqChangePostURL;

	@Value("#{url['PurReqCancelURL']}")
	private String PurReqCancelURL;

	@Value("#{url['PurReqCancelPostURL']}")
	private String PurReqCancelPostURL;

	@Value("#{url['PurReqEnquiryURL']}")
	private String PurReqEnquiryURL;

	public ArrayList<Order> getOrders(OrderParam param,UserContext user) throws Exception {

		// //System.out.println("******* getOrders ******** ");

		// //System.out.println(" param from date->" + param.getFromDate());
		// //System.out.println(" param to date->" + param.getToDate());
		// //System.out.println(" param roster date->" + param.getRosterDate());
		// //System.out.println(" param order type ->" + param.getOrderType());
		// //System.out.println(" param order status ->" +
		// param.getOrderStatus());

		// //System.out.println(" param option->" + param.getSearchByOptions());

		String urlParam = "";
		// if(!(param.getOrderNo() != null && param.getOrderNo().trim().length()
		// > 0) ){
		urlParam = " iv_site eq '" + param.getSiteNo() + "'"
		/*
		 * + " and iv_order_type  eq '" + param.getOrderType() +
		 * "' and iv_roster_date  eq '" +
		 * PortalUtil.convertToSAPDate(param.getRosterDate()) + "'"
		 */;
		// //System.out.println(" url 1-->" + urlParam);
		// +PortalUtil.convertToSAPDate(param.getRosterDate())+"'";
		// }
		if (param.getArticleNo() != null
				&& param.getArticleNo().trim().length() > 0) {
			urlParam += "and iv_article eq '" + param.getArticleNo() + "'";

		}
		/*
		 * if(param.getStoreOrderFlag() != null &&
		 * param.getStoreOrderFlag().trim().length() > 0){ urlParam +=
		 * "and iv_sto_type eq '" + param.getStoreOrderFlag() + "'";
		 * 
		 * }
		 */
		if (param.getOrderNo() != null
				&& param.getOrderNo().trim().length() > 0) {

			if ("number".equals(param.getSearchByOptions()))
				urlParam += "and iv_order_no eq '" + param.getOrderNo() + "'";

			if ("refNumber".equals(param.getSearchByOptions()))
				urlParam += "and iv_trac_no eq '" + param.getOrderNo() + "'";

			if ("PReq".equals(param.getSearchByOptions()))
				urlParam += "and iv_preq_no eq '" + param.getOrderNo() + "'";

		}
		if (param.getOrderStatus() != null
				&& param.getOrderStatus().trim().length() > 0
				&& !(param.getOrderStatus().equalsIgnoreCase("Select") || param
						.getOrderStatus().equalsIgnoreCase("All"))) {

			if ((!param.getOrderType().equals("ZX") && !param.getOrderType()
					.equals("ZY"))
					&& (!"PReq".equals(param.getSearchByOptions())))
				urlParam += " and iv_order_status eq '"
						+ param.getOrderStatus() + "'";

		}
		if (param.getOrderType() != null
				&& param.getOrderType().trim().length() > 0
				&& !param.getOrderType().equalsIgnoreCase("0")
				&& !param.getOrderType().equals("ZX")
				&& !param.getOrderType().equals("ZY")) {

			urlParam += "  and iv_order_type  eq '" + param.getOrderType()
					+ "'";

		} else {
			if (param.getOrderType() != null
					&& (param.getOrderType().equals("ZX") || param
							.getOrderType().equals("ZY"))) {
				urlParam += "  and iv_preq_type  eq '" + param.getOrderType()
						+ "'";
			}
		}

		if (param.getRosterFromDate() != null
				&& param.getRosterFromDate().trim().length() > 0
				&& !param.getRosterFromDate().equalsIgnoreCase("dd/mm/yyyy")) {

			urlParam += " and iv_roster_fromdate eq '"
					+ PortalUtil.convertToSAPDate(param.getRosterFromDate())
					+ "'";

		}
		if (param.getRosterToDate() != null
				&& param.getRosterToDate().trim().length() > 0
				&& !param.getRosterToDate().equalsIgnoreCase("dd/mm/yyyy")) {

			urlParam += " and iv_roster_todate eq '"
					+ PortalUtil.convertToSAPDate(param.getRosterToDate())
					+ "'";

		}

		if (param.getFromDate() != null
				&& param.getFromDate().trim().length() > 0
				&& !param.getFromDate().equalsIgnoreCase("dd/mm/yyyy")) {

			urlParam += " and iv_delivery_fromdate eq '"
					+ PortalUtil.convertToSAPDate(param.getFromDate()) + "'";

		}

		if (param.getToDate() != null && param.getToDate().trim().length() > 0
				&& !param.getToDate().equalsIgnoreCase("dd/mm/yyyy")) {

			urlParam += " and iv_delivery_todate eq '"
					+ PortalUtil.convertToSAPDate(param.getToDate()) + "'";

		}

		if (param.getSuppNo() != null && param.getSuppNo().trim().length() > 0) {

			urlParam += " and iv_sos eq '" + param.getSrcOfSuppliy()
					+ "' and iv_supplier eq '" + param.getSuppNo() + "'";
		}
		if (param.getOpenFlag() == null || param.getOpenFlag() == ""
				|| param.getOpenFlag().trim().length() == 0) {
			if (param.getOrderNo() == null || param.getOrderNo() == "") {
				if ((!param.getOrderType().equals("ZX") && !param
						.getOrderType().equals("ZY"))) {

					urlParam = urlParam + " and iv_records eq " + pageSize
							+ " and iv_page_no eq " + param.getPageNo();

				} else {
					if (param.getOrderStatus() != null
							&& param.getOrderStatus().trim().length() > 0
							&& !(param.getOrderStatus().equalsIgnoreCase(
									"Select") || param.getOrderStatus()
									.equalsIgnoreCase("All"))) {

					} else {
						urlParam = urlParam + " and iv_records eq " + pageSize
								+ " and iv_page_no eq " + param.getPageNo();
					}

				}
				// articleParam.setPaginationCheck(false);
			}
		}
		// urlParam="iv_site eq '1008' and iv_order_type eq 'ZNB' and iv_roster_date eq '20120202'";
		//System.out.println(" url param --->" + urlParam);
		OrderResponse response;

		if (param.getOrderType() != null
				&& (param.getOrderType().equals("ZX") || param.getOrderType()
						.equals("ZY"))
				|| ("PReq".equals(param.getSearchByOptions())
						&& param.getOrderNo() != null && param.getOrderNo()
						.trim().length() > 0)) {
			try {
				response = getRestTemplate(user).getForObject(PurReqEnquiryURL,
						OrderResponse.class, urlParam);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}

			if (response != null
					&& response.getOrderResponseHelper() != null
					&& response.getOrderResponseHelper().getOrders() != null
					&& response.getOrderResponseHelper().getOrders().size() > 0
					&& !response.getOrderResponseHelper().getOrders().get(0)
							.getMsg().equalsIgnoreCase("No Data Found")) {

				for (Order ordr : response.getOrderResponseHelper().getOrders()) {

					ordr.setType("PR");
					if (ordr != null && ordr.getOrderNo() != null
							&& ordr.getOrderNo().trim().length() > 0) {
						ordr.setOrderStatus("Closed");
					} else {
						ordr.setOrderStatus("Open");
					}

				}

				if (param.getOrderStatus() != null
						&& param.getOrderStatus().trim().length() > 0
						&& !(param.getOrderStatus().equalsIgnoreCase("Select") || param
								.getOrderStatus().equalsIgnoreCase("All"))) {

					ArrayList<Order> orderWithStatus = (ArrayList<Order>) response
							.getOrderResponseHelper().getOrders();
					ArrayList<Order> orderWithOpenStatus = new ArrayList<Order>();
					ArrayList<Order> orderWithClosedStatus = new ArrayList<Order>();

					for (int j = 0; j < orderWithStatus.size(); j++) {
						if (orderWithStatus.get(j).getOrderStatus()
								.equalsIgnoreCase("Open")) {
							orderWithOpenStatus.add(orderWithStatus.get(j));
						} else {
							orderWithClosedStatus.add(orderWithStatus.get(j));
						}
					}
					if (param.getOrderStatus().equalsIgnoreCase("Open")) {
						return orderWithOpenStatus;
					} else if (param.getOrderStatus()
							.equalsIgnoreCase("Closed")) {
						return orderWithClosedStatus;
					} else {
						return null;
					}

				}
			}

		} else {
			try {
				response = getRestTemplate(user).getForObject(orderEnquiryURL,
						OrderResponse.class, urlParam);
			} catch (Exception e) {
				e.printStackTrace();
				return null;
			}
		}

		if (response == null
				|| response.getOrderResponseHelper() == null
				|| response.getOrderResponseHelper().getOrders() == null
				|| response.getOrderResponseHelper().getOrders().size() == 0
				|| response.getOrderResponseHelper().getOrders().get(0)
						.getMsg().equalsIgnoreCase("No Data Found"))

		{

			if ((param.getSuppNo() == null || param.getSuppNo().trim().length() == 0)
					&& (param.getOrderType() == null
							|| param.getOrderType().trim().length() == 0
							|| param.getOrderType().equalsIgnoreCase("0") || "ZUB"
								.equalsIgnoreCase(param.getOrderType()))) {

				urlParam = "   iv_order_type eq 'ZUB' and iv_sos eq '2' and iv_supplier eq '"
						+ param.getSiteNo() + "'";

				if (param.getArticleNo() != null
						&& param.getArticleNo().trim().length() > 0) {
					urlParam += "and iv_article eq '" + param.getArticleNo()
							+ "'";

				}
				if (param.getOrderNo() != null
						&& param.getOrderNo().trim().length() > 0) {

					if ("number".equals(param.getSearchByOptions()))
						urlParam += "and iv_order_no eq '" + param.getOrderNo()
								+ "'";

					if ("refNumber".equals(param.getSearchByOptions()))
						urlParam += "and iv_trac_no eq '" + param.getOrderNo()
								+ "'";

				}
				if (param.getOrderStatus() != null
						&& param.getOrderStatus().trim().length() > 0
						&& !(param.getOrderStatus().equalsIgnoreCase("Select") || param
								.getOrderStatus().equalsIgnoreCase("All"))) {

					urlParam += " and iv_order_status eq '"
							+ param.getOrderStatus() + "'";

				}

				if (param.getRosterFromDate() != null
						&& param.getRosterFromDate().trim().length() > 0
						&& !param.getRosterFromDate().equalsIgnoreCase(
								"dd/mm/yyyy")) {

					urlParam += " and iv_roster_fromdate eq '"
							+ PortalUtil.convertToSAPDate(param
									.getRosterFromDate()) + "'";

				}
				if (param.getRosterToDate() != null
						&& param.getRosterToDate().trim().length() > 0
						&& !param.getRosterToDate().equalsIgnoreCase(
								"dd/mm/yyyy")) {

					urlParam += " and iv_roster_todate eq '"
							+ PortalUtil.convertToSAPDate(param
									.getRosterToDate()) + "'";

				}

				if (param.getFromDate() != null
						&& param.getFromDate().trim().length() > 0
						&& !param.getFromDate().equalsIgnoreCase("dd/mm/yyyy")) {

					urlParam += " and iv_delivery_fromdate eq '"
							+ PortalUtil.convertToSAPDate(param.getFromDate())
							+ "'";

				}

				if (param.getToDate() != null
						&& param.getToDate().trim().length() > 0
						&& !param.getToDate().equalsIgnoreCase("dd/mm/yyyy")) {

					urlParam += " and iv_delivery_todate eq '"
							+ PortalUtil.convertToSAPDate(param.getToDate())
							+ "'";

				}

				if (param.getOrderNo() == null || param.getOrderNo() == "") {
					urlParam = urlParam + " and iv_records eq " + pageSize
							+ " and iv_page_no eq " + param.getPageNo();

				}

				//System.out.println(" url param 2 --->" + urlParam);
				try {
					response = getRestTemplate(user).getForObject(orderEnquiryURL,
							OrderResponse.class, urlParam);
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}

				if (response == null
						|| response.getOrderResponseHelper() == null
						|| response.getOrderResponseHelper().getOrders() == null
						|| response.getOrderResponseHelper().getOrders().size() == 0
						|| response.getOrderResponseHelper().getOrders().get(0)
								.getMsg().equalsIgnoreCase("No Data Found"))

				{
					return null;
				} else {
					return (ArrayList<Order>) response.getOrderResponseHelper()
							.getOrders();
				}

			} else {

				return null;
			}
		}

		return (ArrayList<Order>) response.getOrderResponseHelper().getOrders();

	}

	public ArrayList<OrderDetail> getOrderDetails(OrderParam param,
			String orderNo,UserContext user) throws Exception {

		// //System.out.println("******* getOrderDetails ******** ");

		String urlParam = "";
		urlParam = " iv_site eq '" + param.getSiteNo() + "'"
				+ " and iv_order_type  eq '" + param.getOrderType() + /*
																	 * "' and iv_roster_date  eq '"
																	 * +
																	 * PortalUtil
																	 * .
																	 * convertToSAPDate
																	 * (param.
																	 * getRosterDate
																	 * ()) +
																	 */"'";
		// //System.out.println(urlParam);

		if (orderNo != null && orderNo.trim().length() > 0) {

			urlParam += "and iv_order_no eq '" + orderNo + "'";

		}
		if (param.getArticleNo() != null
				&& param.getArticleNo().trim().length() > 0) {

			urlParam += " and iv_article eq '" + param.getArticleNo() + "'";

		}
		if (param.getRosterFromDate() != null
				&& param.getRosterFromDate().trim().length() > 0) {

			urlParam += " and iv_roster_fromdate eq '"
					+ PortalUtil.convertToSAPDate(param.getRosterFromDate())
					+ "'";

		}
		if (param.getRosterToDate() != null
				&& param.getRosterToDate().trim().length() > 0) {

			urlParam += " and iv_roster_todate eq '"
					+ PortalUtil.convertToSAPDate(param.getRosterToDate())
					+ "'";

		}

		//System.out.println("urlParam=" + urlParam);
		try {
			OrderDetailResponse response = getRestTemplate(user).getForObject(
					orderDetailURL, OrderDetailResponse.class, urlParam);

			if (response == null
					|| response.getOrderDetailResponseHelper() == null
					|| response.getOrderDetailResponseHelper()
							.getOrderDetails() == null
					|| response.getOrderDetailResponseHelper()
							.getOrderDetails().size() == 0
					|| response.getOrderDetailResponseHelper()
							.getOrderDetails().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))

			{

				urlParam = "   iv_order_type eq 'ZUB' and iv_sos eq '2' and iv_supplier eq '"
						+ param.getSiteNo() + "'";
				//System.out.println(urlParam);

				if (orderNo != null && orderNo.trim().length() > 0) {

					urlParam += "and iv_order_no eq '" + orderNo + "'";

				}
				response = getRestTemplate(user).getForObject(orderDetailURL,
						OrderDetailResponse.class, urlParam);

				if (response == null
						|| response.getOrderDetailResponseHelper() == null
						|| response.getOrderDetailResponseHelper()
								.getOrderDetails() == null
						|| response.getOrderDetailResponseHelper()
								.getOrderDetails().size() == 0
						|| response.getOrderDetailResponseHelper()
								.getOrderDetails().get(0).getMsg()
								.equalsIgnoreCase("No Data Found"))

				{
					return null;
				} else {
					return (ArrayList<OrderDetail>) response
							.getOrderDetailResponseHelper().getOrderDetails();
				}

			}

			return (ArrayList<OrderDetail>) response
					.getOrderDetailResponseHelper().getOrderDetails();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public String createPurchaseReq(List<ArticleSearchResults> orderDtls,
			ManualOrderParam param, String orderType,UserContext user) throws Exception {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(PurReqCreateURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {

			String msg = "Purchase Requisition Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();
		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = sendPurchaseReqInfoToSap(token, orderDtls, param,
				orderType,user);
		return val;

	}

	private String sendPurchaseReqInfoToSap(String token,
			List<ArticleSearchResults> orderDtls, ManualOrderParam param,
			String orderType,UserContext user) throws Exception {
		// //System.out.println("sendPurchaseReqInfoToSap");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String orderRefNo = getOrderRefNo("STD", "PR", param.getSiteNo());

		String xml = construtXMLforPurchaseReq(token, orderDtls, param,
				orderRefNo, orderType);

		//System.out.println("xml data" + xml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(xml,
				postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(PurReqCreatePostURL,
					HttpMethod.POST, requestEntity, PostResponse.class);

			// //System.out.println("after post-exchange");

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {
				param.setOrderRefNo(response.getBody().getPostResponseHelper()
						.getPurReqNo());

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Purchase Requisition Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
	}

	public String receiveOrderAddInv(ArrayList<OrderDetail> orderDtls,
			ReceiveParam param,UserContext user) {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(
					standardPoReceiveTokenURL, HttpMethod.GET, requestEntity,
					Object.class);

			// //System.out.println("Headers AddInv " + response.getHeaders());

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();
			// //System.out.println("x-csrf-token Value AddInv "
			// + responseHeaders.getFirst("x-csrf-token"));

			String token = responseHeaders.getFirst("x-csrf-token");

			boolean callRecipt = true;

			if (!callRecipt) {

				String val = sendOrderReceiveInfoToSapAddInv(token, orderDtls,
						param,user);
				return val;
			} else {
				String val = sendOrderReceiveInfoToSapAddDock(token, orderDtls,
						param, false,user);

				if (null == val) {
					val = sendOrderReceiveInfoToSapAddInv(token, orderDtls,
							param,user);
				}

				return val;

			}
		} catch (Exception e) {
			e.printStackTrace();

			String msg = "Order Receiving Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	private String sendOrderReceiveInfoToSapAddInv(String token,
			ArrayList<OrderDetail> orderDtls, ReceiveParam param,UserContext user) {
		// //System.out.println("sendOrderReceiveInfoToSapAddInv");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String addInvoiceXml = construtXMLforReceiveAddInvWithArticle(token,
				orderDtls, param);

		//System.out.println("addInvoiceXml data" + addInvoiceXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				addInvoiceXml, postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {
			// //System.out.println("inside try AddInv");

			response = getForPostRestTemplate(user).exchange(

			standardPoReceivePostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {
			String msg = "Order Receiving Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	public String receiveOrderAddDock(ArrayList<OrderDetail> orderDtls,
			ReceiveParam param,UserContext user) {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(StdPoReceiveDocketURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {
			String msg = "Order Receiving Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();
		// //System.out.println("AddDock x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = sendOrderReceiveInfoToSapAddDock(token, orderDtls, param,
				true,user);
		return val;

	}

	private String sendOrderReceiveInfoToSapAddDock(String token,
			ArrayList<OrderDetail> orderDtls, ReceiveParam param,
			boolean setDocket,UserContext user) {
		// //System.out.println("sendOrderReceiveInfoToSapAddDock");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String addInvoiceXml = construtXMLforReceiveAddDelDocWithArticle(token,
				orderDtls, param, setDocket);

		//System.out.println("addInvoiceXml data AddDock" + addInvoiceXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				addInvoiceXml, postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {
			// //System.out.println("inside try AddDock");

			response = getForPostRestTemplate(user).exchange(

			StdPoReceiveDocketPostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Order Receiving Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	/*
	 * public boolean receiveOrderAddArticle(ArrayList<OrderDetail>
	 * orderDtls,ReceiveParam param) {
	 * 
	 * HttpHeaders requestHeaders = new HttpHeaders();
	 * requestHeaders.add("x-csrf-token", "fetch"); HttpEntity<String>
	 * requestEntity = new HttpEntity<String>( requestHeaders);
	 * ResponseEntity<Object> response = null; try { response =
	 * getForPostRestTemplate().exchange(stdPoReceiveArticleTokenURL,
	 * HttpMethod.GET, requestEntity, Object.class);
	 * 
	 * //System.out.println("Headers" + response.getHeaders()); } catch (Exception
	 * e) { e.printStackTrace();
	 * 
	 * return false;
	 * 
	 * } HttpHeaders responseHeaders = new HttpHeaders(); responseHeaders =
	 * response.getHeaders();
	 * //System.out.println("AddArticle x-csrf-token Value " +
	 * responseHeaders.getFirst("x-csrf-token"));
	 * 
	 * String token = responseHeaders.getFirst("x-csrf-token");
	 * 
	 * boolean val = sendOrderReceiveInfoToSapAddArticle(token, orderDtls,
	 * param); return val;
	 * 
	 * }
	 */

	/*
	 * private boolean sendOrderReceiveInfoToSapAddArticle(String token,
	 * ArrayList<OrderDetail> orderDtls, ReceiveParam param) {
	 * //System.out.println("sendOrderReceiveInfoToSapAddArticle"); HttpHeaders
	 * postrequestHeaders = new HttpHeaders();
	 * 
	 * postrequestHeaders.add("x-csrf-token", token);
	 * 
	 * postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);
	 * 
	 * String
	 * addInvoiceXml=construtXMLforReceiveAddArticle(token,orderDtls,param);
	 * 
	 * //System.out.println("addInvoiceXml data AddArticle" + addInvoiceXml);
	 * HttpEntity<Object> requestEntity = new HttpEntity<Object>( addInvoiceXml,
	 * postrequestHeaders);
	 * 
	 * try { //System.out.println("inside try AddArticle"); ResponseEntity<String>
	 * response = null;
	 * 
	 * response = getForPostRestTemplate().exchange(
	 * 
	 * stdPoReceiveArticlePostURL, HttpMethod.POST, requestEntity,
	 * 
	 * String.class); HttpStatus status = response.getStatusCode();
	 * 
	 * //System.out.println("AddArticle Response Code:" + status);
	 * 
	 * //System.out.println("AddArticle Response Body:" + response.getBody());
	 * 
	 * if (status == HttpStatus.CREATED) {
	 * 
	 * return true;
	 * 
	 * } else {
	 * 
	 * return false;
	 * 
	 * }
	 * 
	 * } catch (Exception e) {
	 * 
	 * e.printStackTrace();
	 * 
	 * return false;
	 * 
	 * }
	 * 
	 * }
	 */

	private String construtXMLforPurchaseReq(String token,
			List<ArticleSearchResults> orderDtls, ManualOrderParam param,
			String orderRefNo, String orderType) throws Exception {

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' ")
				.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ")
				.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append("xml:base='").append(PurReqCreateURL).append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>").append("<d:IV_PR_TYPE>")
				.append(orderType).append("</d:IV_PR_TYPE>")
				.append("<d:IV_SITE>").append(param.getSiteNo())
				.append("</d:IV_SITE>").append("<d:IV_TRAC_NO>")
				.append(orderRefNo).append("</d:IV_TRAC_NO>");
		if (param.getSuppName() != null) {
			xml.append("<d:IV_VENDOR>").append(
					param.getSuppName().split("-")[0]);
			xml.append("</d:IV_VENDOR>");
		} else {
			xml.append("<d:IV_VENDOR>").append(orderDtls.get(0).getVendor());
			xml.append("</d:IV_VENDOR>");
		}

		xml.append("<d:IV_REL_DATE>")
				.append(PortalUtil.convertToSAPDate(orderDtls.get(0)
						.getOrderDate()))
				.append("</d:IV_REL_DATE>")

				.append("<d:IV_DEL_DATE>")
				.append(PortalUtil.convertToSAPDate(orderDtls.get(0)
						.getDeliveryDate()))
				.append("</d:IV_DEL_DATE>")

				.append("</m:properties> ")
				.append("</atom:content>")

				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/PRItems' type='application/atom xml;type=feed'  title='ZSP_PREQ_CREATE.PRHeader_PRItems'>")
				.append("<m:inline><atom:feed>");

		int lineNo = 10;
		for (ArticleSearchResults detail : orderDtls) {
			// //System.out.println(detail.getVendorNo());
			xml.append(
					"<atom:entry> <atom:content type='application/xml'><m:properties>")
					.append("<d:IV_VENDOR>")
					.append(orderDtls.get(0).getVendorNo())
					.append("</d:IV_VENDOR>").append("<d:IV_SITE>")
					.append(param.getSiteNo()).append("</d:IV_SITE>")
					.append("<d:IV_ITEM_NO>").append(lineNo)
					.append("</d:IV_ITEM_NO>")

					.append("<d:IV_ARTICLE>").append(detail.getArticleNo())
					// .append("000000000000008525") //
					.append("</d:IV_ARTICLE>")

					.append("<d:IV_QTY>").append(detail.getTotalOrdered())
					.append("</d:IV_QTY>")

					/*
					 * .append("<d:IV_UOM>") .append(detail.getOrdUOM())
					 * .append("</d:IV_UOM>")
					 */

					.append("</m:properties> </atom:content></atom:entry>");
			lineNo += 10;
		}

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		return xml.toString();
	}

	public List<ArticleSearchResults> getManualOrders(
			ManualOrderParam manualOrderParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		// //System.out.println("******* getArticleDetails ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + manualOrderParam.getSiteNo()
				+ "' and iv_ranged eq 'X' ";

		if (manualOrderParam.getArticleNo() != null
				&& manualOrderParam.getArticleNo().trim().length() > 0) {
			if (manualOrderParam.getArticleType().equalsIgnoreCase("articleNo")) {
				urlParam = urlParam + " and iv_article eq '"
						+ manualOrderParam.getArticleNo() + "'";
			} else if (manualOrderParam.getArticleType()
					.equalsIgnoreCase("ean")) {
				urlParam = urlParam + " and iv_gtin eq '"
						+ manualOrderParam.getArticleNo() + "'";

			} else if (manualOrderParam.getArticleType().equalsIgnoreCase(
					"desc")) {
				urlParam = urlParam + " and iv_desc eq '"
						+ manualOrderParam.getArticleNo() + "'";
			}
		}

		if (manualOrderParam.getSuppName() != null
				&& manualOrderParam.getSuppName().trim().length() > 0
				&& !"undefined".equals(manualOrderParam.getSuppName())) {

			urlParam += " and iv_sos eq '" + manualOrderParam.getSrcOfSupply()
					+ "' and iv_supplier eq '" + manualOrderParam.getSuppName()
					+ "'";
		}
		/*
		 * if (manualOrderParam.getWarehouseDropdown() != null &&
		 * manualOrderParam.getWarehouseDropdown()!= "" &&
		 * !manualOrderParam.getWarehouseDropdown().equalsIgnoreCase("0")) {
		 * 
		 * urlParam += " and iv_sos eq '" + manualOrderParam.getSrcOfSupply() +
		 * "' and iv_supplier eq '" + manualOrderParam.getWarehouseDropdown() +
		 * "'"; }
		 */

		//System.out.println("url param----->" + urlParam);
		try {
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))

			{
				return null;
			} else {
				return response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	// ************************ cancel order*******************

	public String cancelOrder(CancelOrderParam cancelOrderParam,UserContext user) {

		// //System.out.println("entered service add invoice method");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");

		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(cancelOrderTokenURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {

			String msg = "Cancel Order is failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// Set<String> keys = responseHeaders.keySet();
		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = cancelOrderPost(token, cancelOrderParam,user);
		return val;

	}

	public String cancelOrderPost(String token,
			CancelOrderParam cancelOrderParam,UserContext user) {
		// //System.out.println("inside cancelOrderPost");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		xml.append(" <?xml version='1.0' encoding='utf-8' standalone='yes'?>");

		xml.append(" <atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData'");

		xml.append(" xml:base='").append(cancelOrderTokenURL).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");

		xml.append(" <d:IV_SITE>");
		xml.append(cancelOrderParam.getSiteNo());
		xml.append("</d:IV_SITE>");

		xml.append(" <d:IV_PO_NO>");
		xml.append(cancelOrderParam.getPurOrdNo());
		xml.append("</d:IV_PO_NO>");

		xml.append(" </m:properties>");
		xml.append(" </atom:content>");
		xml.append(" </atom:entry>");

		//System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);

		ResponseEntity<PostResponse> response = null;

		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			cancelOrderPostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);
			// //System.out.println("after post-exchange");

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Cancel Order is failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	// *********************fetch list of nearby stores list
	public List<StoresNearByModel> getStoresNearBy(String[] checkBoxValues,
			String distance, String resSize, String siteNo,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		// //System.out.println("******* getStoresNearBy ******** ");

		String urlParam;
		// iv_site eq '1008' and iv_distance eq 25 and iv_records eq 20

		urlParam = " iv_site eq '" + siteNo;

		urlParam += "' and iv_distance eq " + distance + " and iv_records eq "
				+ resSize;

		urlParam += " and iv_s_org eq '" + checkBoxValues[0];
		for (int i = 1; i < checkBoxValues.length; i++) {
			// //System.out.println("reasoncode" + checkBoxValues[i]);
			urlParam += ";" + checkBoxValues[i];
		}
		urlParam += "'";

		//System.out.println("url param----->" + urlParam);
		try {
			StoresNearByModelResponse response = getRestTemplate(user)
					.getForObject(storesNearByURL,
							StoresNearByModelResponse.class, urlParam);

			if (response == null
					|| response.getStoresNearByModelResponseHelper() == null
					|| response.getStoresNearByModelResponseHelper()
							.getStoresNearByModelList() == null
					|| response.getStoresNearByModelResponseHelper()
							.getStoresNearByModelList().size() == 0
					|| response.getStoresNearByModelResponseHelper()
							.getStoresNearByModelList().get(0).getMsg().trim()
							.length() > 0)

			{
				return null;
			} else {
				return response.getStoresNearByModelResponseHelper()
						.getStoresNearByModelList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	// *********************fetch Supplier list

	public List<SupplierModel> getSupplierList(String siteNo,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		// //System.out.println("******* getStoresNearBy ******** ");

		String urlParam;
		// iv_site eq '1008' and iv_distance eq 25 and iv_records eq 20

		urlParam = " iv_site eq '" + siteNo + "'";

		// //System.out.println("url param----->" + urlParam);
		try {
			SupplierModelResponse response = getRestTemplate(user).getForObject(
					supplierSearchURL, SupplierModelResponse.class, urlParam);

			if (response == null
					|| response.getSupplierModelResponseHelper() == null
					|| response.getSupplierModelResponseHelper()
							.getSupplierModelList() == null
					|| response.getSupplierModelResponseHelper()
							.getSupplierModelList().size() == 0
					|| response.getSupplierModelResponseHelper()
							.getSupplierModelList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))

			{
				return null;
			} else {
				return response.getSupplierModelResponseHelper()
						.getSupplierModelList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public List<ArticleSearchResults> getArticleDetailsForSOH(
			IBTOrderParam ibtOrderParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		// //System.out.println("******* getArticleDetails ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + ibtOrderParam.getSiteNo() + "'";

		if (ibtOrderParam.getArticleNo() != null
				&& ibtOrderParam.getArticleNo().trim().length() > 0) {
			if (ibtOrderParam.getArticleType().equalsIgnoreCase("articleNo")) {
				urlParam = urlParam + " and iv_article eq '"
						+ ibtOrderParam.getArticleNo() + "'";
			} else if (ibtOrderParam.getArticleType().equalsIgnoreCase("ean")) {
				urlParam = urlParam + " and iv_gtin eq '"
						+ ibtOrderParam.getArticleNo() + "'";

			} else if (ibtOrderParam.getArticleType().equalsIgnoreCase("desc")) {
				urlParam = urlParam + " and iv_desc eq '"
						+ ibtOrderParam.getArticleNo() + "'";
				urlParam = urlParam + "and iv_ranged eq 'X'";
			}
		}

		//System.out.println("url param----->" + urlParam);

		try {
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))

			{
				return null;
			} else {
				return response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public List<ArticleSearchResults> getArticleDetails(
			IBTOrderParam ibtOrderParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		// //System.out.println("******* getArticleDetails ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + ibtOrderParam.getSiteNo() + "'";

		if (ibtOrderParam.getArticleNo() != null
				&& ibtOrderParam.getArticleNo().trim().length() > 0) {
			if (ibtOrderParam.getArticleType().equalsIgnoreCase("articleNo")) {
				urlParam = urlParam + " and iv_article eq '"
						+ ibtOrderParam.getArticleNo() + "'";
			} else if (ibtOrderParam.getArticleType().equalsIgnoreCase("ean")) {
				urlParam = urlParam + " and iv_gtin eq '"
						+ ibtOrderParam.getArticleNo() + "'";

			} else if (ibtOrderParam.getArticleType().equalsIgnoreCase("desc")) {
				urlParam = urlParam + " and iv_desc eq '"
						+ ibtOrderParam.getArticleNo() + "'";

			}
		}

		//System.out.println("url param----->" + urlParam);
		try {
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))

			{
				return null;
			} else {
				return response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public String updateDeliveryDate(String orderNo, String delDate,UserContext user) {

		// //System.out.println("entered service updateDeliveryDate method");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");

		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(updateDelDateTokenURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {

			String msg = "Delivery Date update is failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// Set<String> keys = responseHeaders.keySet();
		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = updateDeliveryDatePost(token, orderNo, delDate,user);
		return val;
	}

	private String updateDeliveryDatePost(String token, String orderNo,
			String delDate,UserContext user) {

		// //System.out.println("inside updateDeliveryDatePost");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		xml.append(" <?xml version='1.0' encoding='utf-8' standalone='yes'?>");

		xml.append(" <atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData'");

		xml.append(" xml:base='").append(updateDelDateTokenURL).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");
		xml.append(" <d:IV_PO_NO>");
		xml.append(orderNo);
		xml.append("</d:IV_PO_NO>");

		xml.append(" <d:IV_DELIVERY_DATE>");
		xml.append(delDate);
		xml.append("</d:IV_DELIVERY_DATE>");

		xml.append(" </m:properties>");
		xml.append(" </atom:content>");

		xml.append(" </atom:entry>");
		//System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);

		ResponseEntity<PostResponse> response = null;

		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			updateDelDatePostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Delivery Date update is failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	public boolean goodsReceipt(ReceiveParam receiveParam,UserContext user) {

		// //System.out.println("**********************goodsReceiptServiceImpl*****************");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");

		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(
					ibtGoodsReceiptTokenURL, HttpMethod.GET, requestEntity,
					Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {

			e.printStackTrace();

			return false;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		boolean val = goodsReceiptPost(token, receiveParam,user);
		return val;

	}

	public boolean goodsReceiptPost(String token, ReceiveParam receiveParam,UserContext user) {
		// //System.out.println("**************inside goodsReceiptPost*****************");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8' standalone='yes'?>");

		xml.append(" <atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData'");

		xml.append(" xml:base='").append(ibtGoodsReceiptTokenURL).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");

		xml.append(" <d:iv_date>");
		xml.append(PortalUtil.currentDate());
		xml.append("</d:iv_date>");

		xml.append(" <d:iv_order_no>");
		xml.append(receiveParam.getOrderNo());
		xml.append("</d:iv_order_no>");

		xml.append(" <d:iv_sto_order_no>");
		xml.append(StoN0);
		xml.append("</d:iv_sto_order_no>");

		xml.append(" <d:iv_site>");
		xml.append(receiveParam.getSiteNo());
		xml.append("</d:iv_site>");

		xml.append(" </m:properties>");
		xml.append(" </atom:content>");
		xml.append(" </atom:entry>");

		//System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);

		try {
			// //System.out.println("inside try");
			ResponseEntity<String> response = null;

			response = getForPostRestTemplate(user).exchange(

			ibtGoodsReceiptPostURL, HttpMethod.POST, requestEntity,

			String.class);
			// //System.out.println("after post-exchange");
			HttpStatus status = response.getStatusCode();

			// //System.out.println("Response Code:" + status);

			// //System.out.println("Response Body:" + response.getBody());

			if (status == HttpStatus.CREATED) {

				return true;

			} else {

				return false;

			}

		} catch (Exception e) {

			e.printStackTrace();

			return false;

		}

	}

	private String construtXMLforReceiveAddInvWithArticle(String token,
			ArrayList<OrderDetail> orderDtls, ReceiveParam param) {
		// //System.out.println("AddInv xml create");
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version='1.0' encoding='utf-8' standalone='yes'?>");
		xml.append("<atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom' ");
		xml.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ");
		xml.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ");
		xml.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ");
		xml.append("xml:base='").append(standardPoReceiveTokenURL).append("'>");
		xml.append("<atom:content type='application/xml'>");
		xml.append("<m:properties>")

		.append("<d:IV_ORDER_NO>").append(param.getOrderNo())
				.append("</d:IV_ORDER_NO>")

				.append("<d:IV_SITE>").append(param.getSiteNo())
				.append("</d:IV_SITE>")

				.append("<d:IV_DATE>").append(PortalUtil.currentDate())
				.append("</d:IV_DATE>")

				.append("<d:IV_VENDOR_NO>")
				.append(param.getVendorNo())
				.append("</d:IV_VENDOR_NO>")
				// my change
				.append("<d:IV_VENDOR_NOTE>").append(param.getInvoiceNo())
				.append("</d:IV_VENDOR_NOTE>")

				.append("<d:IV_INVOICE_TOTAL>").append(param.getInvoiceTotal())
				.append("</d:IV_INVOICE_TOTAL>").append("<d:IV_GST_TOTAL>")
				.append(param.getGst()).append("</d:IV_GST_TOTAL>");
		xml.append("</m:properties></atom:content> </atom:entry>");
		/*
		 * .append(
		 * "<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/OrderItems'  type='application/atom+xml;type=feed'  title='ZSP_ORDER_RCV_SRVC.OrderHeader_OrderItems'>"
		 * ) .append("<m:inline><atom:feed>"); for (OrderDetail detail :
		 * orderDtls) { xml.append(
		 * "<atom:entry><atom:content type='application/xml'><m:properties>")
		 * .append("<d:IV_ORDER_NO>") .append(detail.getOrderNo())
		 * .append("</d:IV_ORDER_NO>") .append("<d:IV_ITEM_NO>")
		 * .append(detail.getItemNo()) .append("</d:IV_ITEM_NO>")
		 * .append("<d:IV_ARTICLE>") .append(detail.getArticle())
		 * .append("</d:IV_ARTICLE>") .append("<d:IV_ALREADY_RECEIVED_QTY>")
		 * .append(detail.getReceivedQty())
		 * .append("</d:IV_ALREADY_RECEIVED_QTY>") // my change
		 * .append("<d:IV_TO_BE_RECEIVED_QTY>")
		 * .append(Double.parseDouble(detail.getOrderQty()) -
		 * Double.parseDouble(detail.getReceivedQty()))
		 * .append("</d:IV_TO_BE_RECEIVED_QTY>")
		 * .append("<d:IV_ORD_MUL>").append(detail.getOM())
		 * .append("</d:IV_ORD_MUL>")
		 * .append("</m:properties></atom:content></atom:entry> "); }
		 * xml.append("</atom:feed></m:inline></atom:link></atom:entry>");
		 */

		//System.out.println("AddInv xml.toString()" + xml.toString());

		return xml.toString();

	}

	private String construtXMLforReceiveAddDelDocWithArticle(String token,
			ArrayList<OrderDetail> orderDtls, ReceiveParam param,
			boolean setDocket) {
		// //System.out.println("AddInv xml create");
		StringBuffer xml = new StringBuffer();
		xml.append("<?xml version='1.0' encoding='utf-8' standalone='yes'?>");
		xml.append("<atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom' ");
		xml.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ");
		xml.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ");
		xml.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ");
		xml.append("xml:base='").append(StdPoReceiveDocketURL).append("'>");
		xml.append("<atom:content type='application/xml'>");
		xml.append("<m:properties>").append("<d:IV_ORDER_NO>")
				.append(param.getOrderNo()).append("</d:IV_ORDER_NO>")
				.append("<d:IV_SITE>").append(param.getSiteNo())
				.append("</d:IV_SITE>").append("<d:IV_DATE>")
				.append(PortalUtil.currentDate()).append("</d:IV_DATE>")
				.append("<d:IV_VENDOR>").append(param.getVendorNo())
				.append("</d:IV_VENDOR>");
		if (setDocket) {
			xml.append("<d:IV_DELV_DOCKET>");
			xml.append(param.getDelDock());
			xml.append("</d:IV_DELV_DOCKET>");
		} else {
			xml.append("<d:IV_DELV_DOCKET>");
			xml.append(param.getInvoiceNo());
			xml.append("</d:IV_DELV_DOCKET>");
		}
		xml.append("</m:properties></atom:content>")
				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/OrderItems'  type='application/atom+xml;type=feed'  title='ZSP_ORDER_RCV.OrderHeader_OrderItems'>")
				.append("<m:inline><atom:feed>");
		for (OrderDetail detail : orderDtls) {
			xml.append(
					"<atom:entry><atom:content type='application/xml'><m:properties>")
					.append("<d:IV_ORDER_NO>")
					.append(detail.getOrderNo())
					.append("</d:IV_ORDER_NO>")
					.append("<d:IV_ITEM_NO>")
					.append(detail.getItemNo())
					.append("</d:IV_ITEM_NO>")
					.append("<d:IV_ARTICLE>")
					.append(detail.getArticle())
					.append("</d:IV_ARTICLE>")
					.append("<d:IV_ALREADY_RECEIVED_QTY>")
					.append(detail.getReceivedQty())
					.append("</d:IV_ALREADY_RECEIVED_QTY>")
					// my change
					.append("<d:IV_TO_BE_RECEIVED_QTY>")
					.append(Double.parseDouble(detail.getOrderQty())
							- Double.parseDouble(detail.getReceivedQty()))
					.append("</d:IV_TO_BE_RECEIVED_QTY>")
					.append("<d:IV_ORD_MUL>").append(detail.getOM())
					.append("</d:IV_ORD_MUL>")
					.append("</m:properties></atom:content></atom:entry> ");
		}
		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		//System.out.println("AddInv xml.toString()" + xml.toString());

		return xml.toString();

	}

	/*
	 * private String construtXMLforReceiveAddArticle(String token,
	 * ArrayList<OrderDetail> orderDtls, ReceiveParam param) {
	 * 
	 * StringBuffer xml = new StringBuffer();
	 * 
	 * xml.append("<?xml version='1.0' encoding='utf-8' standalone='yes'?>");
	 * xml.append(
	 * "<atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom' ");
	 * xml
	 * .append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' "
	 * ); xml.append(
	 * "xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' "
	 * ); xml.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ");
	 * xml.append
	 * ("xml:base='").append(stdPoReceiveArticleTokenURL).append("'>");
	 * xml.append("<atom:content type='application/xml'>");
	 * xml.append("<m:properties>") .append("<d:IV_ORDER_NO>")
	 * .append(param.getOrderNo()) .append("</d:IV_ORDER_NO>")
	 * .append("<d:IV_SITE>") .append(param.getSiteNo()) .append("</d:IV_SITE>")
	 * .append("<d:IV_DATE>") .append(PortalUtil.currentDate())
	 * .append("</d:IV_DATE>") .append("<d:IV_VENDOR>")
	 * .append(param.getVendorNo()) .append("</d:IV_VENDOR>")
	 * .append("<d:IV_ORDER_RECEIVED>") .append(param.getOrder_received())
	 * .append("</d:IV_ORDER_RECEIVED>") .append("<d:IV_OPERATION>")
	 * .append("C") .append("</d:IV_OPERATION>") // my change
	 * 
	 * .append("</m:properties></atom:content> ") .append(
	 * "<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/OrderItems'  type='application/atom+xml;type=feed'  title='ZSP_ORDER_RCV_SRVC.OrderHeader_OrderItems'>"
	 * ) .append("<m:inline><atom:feed>"); for (OrderDetail detail : orderDtls)
	 * {
	 * 
	 * xml.append(
	 * "<atom:entry><atom:content type='application/xml'><m:properties>")
	 * .append("<d:IV_ORDER_NO>") .append(detail.getOrderNo())
	 * .append("</d:IV_ORDER_NO>") .append("<d:IV_ITEM_NO>")
	 * .append(detail.getItemNo()) .append("</d:IV_ITEM_NO>")
	 * .append("<d:IV_ARTICLE>") .append(detail.getArticle())
	 * .append("</d:IV_ARTICLE>") .append("<d:IV_ALREADY_RECEIVED_QTY>")
	 * .append(detail.getReceivedQty()) .append("</d:IV_ALREADY_RECEIVED_QTY>")
	 * // my change .append("<d:IV_TO_BE_RECEIVED_QTY>")
	 * .append(Double.parseDouble(detail.getOrderQty()) -
	 * Double.parseDouble(detail.getReceivedQty()))
	 * .append("</d:IV_TO_BE_RECEIVED_QTY>")
	 * .append("<d:IV_ORD_MUL>").append(detail.getOM())
	 * .append("</d:IV_ORD_MUL>")
	 * .append("</m:properties></atom:content></atom:entry> "); }
	 * xml.append("</atom:feed></m:inline></atom:link></atom:entry>");
	 * 
	 * //System.out.println("AddArticle xml.toString()" + xml.toString());
	 * 
	 * return xml.toString();
	 * 
	 * }
	 */

	public String goodsReceipt(ReceiveParam receiveParam,
			ArrayList<OrderDetail> orderDetail,UserContext user) {

		// //System.out.println("**********************goodsReceiptServiceImpl*****************");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");

		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(
					ibtGoodsReceiptTokenURL, HttpMethod.GET, requestEntity,
					Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {
			String msg = "Receive Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;
		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = goodsReceiptPost(token, receiveParam, orderDetail,user);
		return val;

	}

	public String goodsReceiptPost(String token, ReceiveParam receiveParam,
			ArrayList<OrderDetail> orderDetail,UserContext user) {
		// //System.out.println("**************inside goodsReceiptPost*****************");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8' standalone='yes'?>");

		xml.append(" <atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData'");

		xml.append(" xml:base='").append(ibtGoodsReceiptTokenURL).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");

		xml.append(" <d:iv_date>");
		xml.append(PortalUtil.currentDate());
		xml.append("</d:iv_date>");

		xml.append(" <d:iv_order_no>");
		xml.append(receiveParam.getOrderNo());
		xml.append("</d:iv_order_no>");

		/*
		 * xml.append(" <d:iv_sto_order_no>"); xml.append(StoN0);
		 * xml.append("</d:iv_sto_order_no>");
		 */

		xml.append(" <d:iv_site>");
		xml.append(receiveParam.getSiteNo());
		xml.append("</d:iv_site>");

		xml.append(" </m:properties>");
		xml.append(" </atom:content>");
		xml.append(" </atom:entry>");

		//System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);

		ResponseEntity<GoodsReceiptPostResonse> response = null;

		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			ibtGoodsReceiptPostURL, HttpMethod.POST, requestEntity,
					GoodsReceiptPostResonse.class);
			if (response != null
					&& response.getBody() != null
					&& response.getBody().getGoodsReceiptPostResponseHelper() != null
					&& response.getBody().getGoodsReceiptPostResponseHelper()
							.getError().trim().length() == 0
					&& response.getBody().getGoodsReceiptPostResponseHelper()
							.getType().trim().length() == 0

			) {
				// param.setOrderRefNo(orderRefNo);

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody()
										.getGoodsReceiptPostResponseHelper()
										.getError());

				return response.getBody().getGoodsReceiptPostResponseHelper()
						.getError();

			}

		} catch (Exception e) {

			String msg = "Receive Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	public String orderAdjust(ReceiveParam receiveParam,
			ArrayList<OrderDetail> orderDetail,UserContext user) {

		// //System.out.println("**********************goodsReceiptServiceImpl*****************");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");

		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(
					ibtOrderAdjustTokenURL, HttpMethod.GET, requestEntity,
					Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {
			String msg = "Order Adjustment Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;
		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = orderAdjustPost(token, receiveParam, orderDetail,user);
		return val;

	}

	public String orderAdjustPost(String token, ReceiveParam receiveParam,
			ArrayList<OrderDetail> orderDetail,UserContext user) {
		// //System.out.println("**************inside goodsReceiptPost*****************");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8' standalone='yes'?>");

		xml.append(" <atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData'");

		xml.append(" xml:base='").append(ibtOrderAdjustTokenURL).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");

		xml.append(" <d:IV_DATE>");
		xml.append(PortalUtil.currentDate());
		xml.append("</d:IV_DATE>");

		xml.append(" <d:IV_ORDER_NO>");
		xml.append(receiveParam.getOrderNo());
		xml.append("</d:IV_ORDER_NO>");

		/*
		 * xml.append(" <d:IV_OPERATION>"); xml.append("C");
		 * xml.append("</d:IV_OPERATION>");
		 */

		xml.append(" <d:IV_SITE>");
		xml.append(receiveParam.getSiteNo());
		xml.append("</d:IV_SITE>");

		xml.append(" </m:properties>");
		xml.append(" </atom:content>");
		xml.append(" <atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/IBTItems' type='application/atom+xml;type=feed' title='ZSP_IBT_ORDER_ADJ.IBTHeader_IBTItems'>");
		xml.append(" <m:inline>");
		xml.append(" <atom:feed>");

		for (int i = 0; i < orderDetail.size(); i++) {

			xml.append(
					"<atom:entry> <atom:content type='application/xml'> <m:properties>")
					.append("<d:IV_ORDER_NO>")
					.append(orderDetail.get(i).getOrderNo())
					.append("</d:IV_ORDER_NO>")
					.append("<d:IV_ITEM_NO>")
					.append(orderDetail.get(i).getItemNo())
					.append("</d:IV_ITEM_NO>")
					.append("<d:IV_ARTICLE>")
					.append(orderDetail.get(i).getArticle())
					.append("</d:IV_ARTICLE>")
					.append("<d:IV_ADJUSTED_QTY>")
					.append(orderDetail.get(i).getAdjustedQty() != null ? orderDetail
							.get(i).getAdjustedQty() : "0")
					.append("</d:IV_ADJUSTED_QTY>").append("<d:IV_MVT_TYPE>")
					.append(orderDetail.get(i).getMvtType())
					.append("</d:IV_MVT_TYPE>").append("<d:IV_RECV_STORE>")
					.append(orderDetail.get(i).getSuppNo())
					.append("</d:IV_RECV_STORE>")
					.append("</m:properties> </atom:content> </atom:entry>");
		}

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		//System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);

		ResponseEntity<PostResponse> response = null;

		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			ibtOrderAdjustPostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {
				// param.setOrderRefNo(orderRefNo);

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Order Adjustment Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;
		}

	}

	public ArrayList<Store> getStoreDetails(String siteNo,UserContext user) throws Exception {

		// //System.out.println("******* get Store ******** ");

		String urlParam;

		urlParam = " iv_site_no eq '" + siteNo + "'";

		//System.out.println("urlParam" + urlParam);
		try {
			StoreResponse response = getRestTemplate(user).getForObject(
					storeServiceURL, StoreResponse.class, urlParam);

			if (response == null
					|| response.getStoreDetailsResponseHelper() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList().size() == 0
			/*
			 * ||response.getWareHouseResponseHelper().getWareHouseList().get(0).
			 * getMsg().trim().length()>0
			 */) {
				return new ArrayList<Store>();
			}

			return (ArrayList<Store>) response.getStoreDetailsResponseHelper()
					.getstoreDetailsList();
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<Store>();
		}
	}

	public ArrayList<Store> getStoreValidationDetails(String siteNo,UserContext user)
			throws Exception {

		// //System.out.println("******* get Store ******** ");

		String urlParam;
		/*try {
			int siteNoVal = Integer.parseInt(siteNo);
			urlParam = " iv_site_no eq '" + siteNoVal + "'";

		} catch (Exception e) {
			urlParam = " iv_site_name eq '" + siteNo + "'";
		}*/
		// urlParam=" iv_site_name  eq '" + siteNo + "'";
		if(siteNo.matches("\\d+")){
			urlParam = " iv_site_no eq '" + siteNo + "'";
		}else{
			urlParam = " iv_site_name eq '" + siteNo + "'";
		}
		//System.out.println("urlParam" + urlParam);
		try {
			StoreResponse response = getRestTemplate(user).getForObject(
					storeServiceURL, StoreResponse.class, urlParam);

			if (response == null
					|| response.getStoreDetailsResponseHelper() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList().size() == 0
			/*
			 * ||response.getWareHouseResponseHelper().getWareHouseList().get(0).
			 * getMsg().trim().length()>0
			 */) {
				return new ArrayList<Store>();
			}

			return (ArrayList<Store>) response.getStoreDetailsResponseHelper()
					.getstoreDetailsList();
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<Store>();
		}
	}

	public String getOrderRefNo(String type, String application, String storeNo)
			throws SQLException {
		ResultSet rs = null;
		long orderNo = 0;
		PreparedStatement statment = null;
		Connection con = DatabaseUtil.getConnection();
		StringBuffer refNo = new StringBuffer(application);
		try {
			if (type.equals("IBT"))
				statment = con.prepareStatement(ibtOrderRefSql);
			else
				statment = con.prepareStatement(manualOrderRefSql);

			rs = statment.executeQuery();

			if (rs.next()) {
				orderNo = rs.getLong(1);
			}
		} finally {

			if (rs != null) {
				rs.close();
			}
			if (statment != null) {
				statment.close();
			}
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return refNo.append(storeNo).append(orderNo).toString();

	}

	// vendor claim authority post
	public String getVendorClaims(ReceiveParam param,UserContext user) {

		// //System.out.println("entered service add invoice method");
		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");

		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(vendorClaimsTokenURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {
			String msg = "Vendor Claims Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// Set<String> keys = responseHeaders.keySet();
		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = vendorClaimPost(token, param,user);
		return val;

	}

	public String vendorClaimPost(String token, ReceiveParam param,UserContext user) {
		// //System.out.println("inside cancelOrderPost");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		xml.append(" <?xml version='1.0' encoding='utf-8' standalone='yes'?>");

		xml.append(" <atom:entry xml:lang='en'  xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData'");

		xml.append(" xml:base='").append(vendorClaimsTokenURL).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");

		xml.append(" <d:IV_PO_NO >");
		xml.append(param.getVendorClaimOrderNo());
		xml.append("</d:IV_PO_NO >");

		/*
		 * xml.append(" <d:iv_test>"); xml.append("");
		 * xml.append("</d:iv_test>");
		 */

		xml.append(" <d:IV_VCAN>");
		xml.append(param.getAuthNo());
		xml.append("</d:IV_VCAN>");

		xml.append(" <d:IV_SITE>");
		xml.append("");
		xml.append("</d:IV_SITE>");

		xml.append(" </m:properties>");
		xml.append(" </atom:content>");
		xml.append(" </atom:entry>");

		//System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);

		ResponseEntity<PostResponse> response = null;

		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			vendorClaimsPostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);
			// //System.out.println("after post-exchange");

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Vendor Claims Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	public List<ArticleSearchResults> searchArticle(
			ReceiveParam manualOrderParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		// //System.out.println("******* getArticleDetails ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + manualOrderParam.getSiteNo()
				+ "' and iv_ranged eq 'X' ";

		if (manualOrderParam.getArticleNo() != null
				&& manualOrderParam.getArticleNo().trim().length() > 0) {
			if (manualOrderParam.getArticleType().equalsIgnoreCase("articleNo")) {
				urlParam = urlParam + " and iv_article eq '"
						+ manualOrderParam.getArticleNo() + "'";
			} else if (manualOrderParam.getArticleType()
					.equalsIgnoreCase("ean")) {
				urlParam = urlParam + " and iv_gtin eq '"
						+ manualOrderParam.getArticleNo() + "'";

			} else if (manualOrderParam.getArticleType().equalsIgnoreCase(
					"desc")) {
				urlParam = urlParam + " and iv_desc eq '"
						+ manualOrderParam.getArticleNo() + "'";
			}
		}

		if (manualOrderParam.getSuppName() != null
				&& manualOrderParam.getSuppName().trim().length() > 0) {

			urlParam += " and iv_sos eq '" + manualOrderParam.getSrcOfSupply()
					+ "' and iv_supplier eq '" + manualOrderParam.getSuppName()
					+ "'";
		}
		if (manualOrderParam.getWarehouseDropdown() != null
				&& manualOrderParam.getWarehouseDropdown() != ""
				&& !manualOrderParam.getWarehouseDropdown().equalsIgnoreCase(
						"0")) {

			urlParam += " and iv_sos eq '" + manualOrderParam.getSrcOfSupply()
					+ "' and iv_supplier eq '"
					+ manualOrderParam.getWarehouseDropdown() + "'";
		}

		//System.out.println("url param----->" + urlParam);
		try {
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))

			{
				return null;
			} else {
				return response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public String sendOrder(List<ArticleSearchResults> orderDtls,
			ManualOrderParam param, String orderType,UserContext user) throws Exception {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(PurReqToPOCreateURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {

			String msg = "Order Creation Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();
		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = sendOrderInfoToSap(token, orderDtls, param, orderType,user);
		return val;

	}

	private String sendOrderInfoToSap(String token,
			List<ArticleSearchResults> orderDtls, ManualOrderParam param,
			String orderType,UserContext user) throws Exception {
		// //System.out.println("sendCreateOrderInfoToSap");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String orderRefNo = getOrderRefNo("STD", "P", param.getSiteNo());

		String xml = construtXMLforSend(token, orderDtls, param, orderRefNo,
				orderType);

		//System.out.println("xml data" + xml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(xml,
				postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(
					PurReqToPOCreatePostURL, HttpMethod.POST, requestEntity,
					PostResponse.class);

			// //System.out.println("after post-exchange");

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {
				param.setOrderRefNo(response.getBody().getPostResponseHelper()
						.getGeneratedOrderNo());

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {

			String msg = "Order Creation Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
	}

	private String construtXMLforSend(String token,
			List<ArticleSearchResults> orderDtls, ManualOrderParam param,
			String orderRefNo, String orderType) throws Exception {

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' ")
				.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ")
				.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append("xml:base='").append(PurReqToPOCreateURL).append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>").append("<d:IV_PR_NO>")
				.append(param.getPurReqNo()).append("</d:IV_PR_NO>")

				.append("<d:IV_SITE>").append(param.getSiteNo())
				.append("</d:IV_SITE>");
		if (param.getSuppName() != null) {
			xml.append("<d:IV_VENDOR>").append(
					param.getSuppName().split("-")[0]);
			xml.append("</d:IV_VENDOR>");
		} else {
			xml.append("<d:IV_VENDOR>").append(orderDtls.get(0).getVendorNo());
			xml.append("</d:IV_VENDOR>");
		}

		xml.append("<d:IV_DOC_TYPE>").append(orderType)
				.append("</d:IV_DOC_TYPE>")

				.append("</m:properties> ")
				.append("</atom:content></atom:entry>");
		return xml.toString();
	}

	private String construtXMLforPurchaseReqChange(String token,
			List<OrderDetail> orderDtls, ManualOrderParam param)
			throws Exception {

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' ")
				.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ")
				.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append("xml:base='")
				.append(PurReqChangeURL)
				.append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>")
				.append("<d:IV_PREQ_NO>")
				.append(param.getPurReqNo())
				.append("</d:IV_PREQ_NO>")
				.append("<d:IV_SITE>")
				.append(param.getSiteNo())
				.append("</d:IV_SITE>")

				.append("</m:properties> ")
				.append("</atom:content>")

				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/PReqItems' type='application/atom xml;type=feed'  title='ZSP_PREQ_CHANGE.PReqHeader_PReqItem'>")
				.append("<m:inline><atom:feed>");

		for (OrderDetail detail : orderDtls) {

			xml.append(
					"<atom:entry> <atom:content type='application/xml'><m:properties>")
					.append("<d:IV_PREQ_NO>")
					.append(param.getPurReqNo())
					.append("</d:IV_PREQ_NO>")

					.append("<d:IV_ITEM_NO>")
					.append(detail.getItemNo())
					.append("</d:IV_ITEM_NO>")

					.append("<d:IV_ARTICLE>")
					.append(detail.getArticle())
					.append("</d:IV_ARTICLE>")

					.append("<d:IV_QTY>")
					.append(detail.getTotalOrd())
					.append("</d:IV_QTY>")

					.append("<d:IV_UOM>")
					.append(detail.getUOM())
					.append("</d:IV_UOM>")
					.append("<d:IV_VENDOR>")
					.append(detail.getSuppNo())
					.append("</d:IV_VENDOR>")

					.append("<d:IV_SITE>")
					.append(param.getSiteNo())
					.append("</d:IV_SITE>")

					.append("<d:IV_DELV_DATE>")
					.append(PortalUtil.convertToSAPDate(detail
							.getDeliveryDate())).append("</d:IV_DELV_DATE>")

					/*
					 * .append("<d:IV_ROSTER_DATE>")
					 * .append(PortalUtil.convertToSAPDate
					 * (detail.getDateCreated())) .append("</d:IV_ROSTER_DATE>")
					 */

					.append("<d:IV_FLAG>").append(detail.getOperation())
					.append("</d:IV_FLAG>")

					.append("</m:properties> </atom:content></atom:entry>");

		}

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		return xml.toString();
	}

	public String updatePReq(ArrayList<OrderDetail> orderDtls,
			ManualOrderParam param,UserContext user) {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(PurReqChangeURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers AddInv " + response.getHeaders());

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();
			// //System.out.println("x-csrf-token Value AddInv "
			// + responseHeaders.getFirst("x-csrf-token"));

			String token = responseHeaders.getFirst("x-csrf-token");

			String val = sendPReqChangeInfo(token, orderDtls, param,user);

			return val;

		} catch (Exception e) {
			e.printStackTrace();

			String msg = "Order Receiving Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	private String sendPReqChangeInfo(String token,
			ArrayList<OrderDetail> orderDtls, ManualOrderParam param,UserContext user)
			throws Exception {
		// //System.out.println("sendPReqChangeInfo");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String addInvoiceXml = construtXMLforPurchaseReqChange(token,
				orderDtls, param);

		//System.out.println("addInvoiceXml data" + addInvoiceXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				addInvoiceXml, postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {
			// //System.out.println("inside try AddInv");

			response = getForPostRestTemplate(user).exchange(

			PurReqChangePostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {
			String msg = "Purchase Requisition Update Failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
	}

	public String cancelPReq(String purReqNo, String siteNo,UserContext user) {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(PurReqCancelURL,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers AddInv " + response.getHeaders());

			HttpHeaders responseHeaders = new HttpHeaders();
			responseHeaders = response.getHeaders();
			// //System.out.println("cancelPReq "
			// + responseHeaders.getFirst("x-csrf-token"));

			String token = responseHeaders.getFirst("x-csrf-token");

			String val = sendPReqCancelInfo(token, purReqNo, siteNo,user);

			return val;

		} catch (Exception e) {
			e.printStackTrace();

			String msg = "Purchase requisition cancellation failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}

	}

	private String sendPReqCancelInfo(String token, String purReqNo,
			String siteNo,UserContext user) {
		// //System.out.println("sendPReqCancelInfo");
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String addInvoiceXml = construtXMLforPurchaseReqCancel(purReqNo, siteNo);

		// //System.out.println("sendPReqCancelInfo data" + addInvoiceXml);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				addInvoiceXml, postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {

			response = getForPostRestTemplate(user).exchange(

			PurReqCancelPostURL, HttpMethod.POST, requestEntity,

			PostResponse.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {
			String msg = "Purchase requisition cancellation failed,Due to Service unavailability";
			e.printStackTrace();
			return msg;

		}
	}

	private String construtXMLforPurchaseReqCancel(String purReqNo,
			String siteNo) {
		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' ")
				.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ")
				.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append("xml:base='").append(PurReqCancelURL).append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>").append("<d:IV_PREQ_NO>")
				.append(purReqNo).append("</d:IV_PREQ_NO>")

				.append("<d:IV_SITE>").append(siteNo).append("</d:IV_SITE>")

				.append("</m:properties> ")
				.append("</atom:content></atom:entry>");
		return xml.toString();
	}
}
