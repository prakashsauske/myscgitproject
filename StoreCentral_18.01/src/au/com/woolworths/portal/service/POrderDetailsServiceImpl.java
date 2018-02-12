/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.DeliveryData;
import au.com.woolworths.portal.model.DeliveryDataResponse;
import au.com.woolworths.portal.model.GRArticle;
import au.com.woolworths.portal.model.GRArticleResponse;
import au.com.woolworths.portal.model.GoodReceiptDetailforPO;
import au.com.woolworths.portal.model.GoodReceiptDetailforPOResponse;
import au.com.woolworths.portal.model.InvoiceDetailsforPO;
import au.com.woolworths.portal.model.InvoiceDetailsforPOResponse;
import au.com.woolworths.portal.model.OrderDetailItem;
import au.com.woolworths.portal.model.OrderDetailItemResponse;
import au.com.woolworths.portal.model.POrderDetails;
import au.com.woolworths.portal.model.POrderDetailsResponse;
import au.com.woolworths.portal.model.PReqDetails;
import au.com.woolworths.portal.model.PReqDetailsResponse;
import au.com.woolworths.portal.model.PReqItemData;
import au.com.woolworths.portal.model.PReqItemDataResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

/**
 * @author xkaew
 * 
 */

public class POrderDetailsServiceImpl extends CommonServiceImpl {

	@Value("#{url['POrderDetailsURL']}")
	private String porderDetailsURL;

	@Value("#{url['PReqDetailsURL']}")
	private String preqDetailsURL;

	@Value("#{url['InvoiceDetailsforPO']}")
	private String invoiceDetailsforPO;

	@Value("#{url['GRDetailsforPO']}")
	private String grDetailsforPOURL;

	@Value("#{url['DeliveryDataforPOURL']}")
	private String deliveryDataforPOURL;

	@Value("#{url['OrderItemDataURL']}")
	private String orderItemDataURL;

	@Value("#{url['PReqItemdataURL']}")
	private String preqItemdataURL;

	@Value("#{url['GRArticleServiceURL']}")
	private String grArticleServiceURL;

	@Value("#{url['PageSizeOrders']}")
	private String pageSize;

	@Value("#{url['SegmentDeliveryDataURL']}")
	private String segmentDeliveryDataURL;
	private static final Logger LOGGER = Logger.getLogger(POrderDetailsServiceImpl.class.getName());
	
	public List<POrderDetails> getPOrderDtls(AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null
				&& !param.getSiteNo().equals("")
				&& ((param.getFromDate() != null && !param.getFromDate()
						.equals("")) || (param.getOrderNo() != null && !param
						.getOrderNo().equals("")))) {
			urlParam = new StringBuffer(" iv_site eq '").append(
					param.getSiteNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		if (param.getOrderType() != null && !param.getOrderType().equals("")) {
			urlParam.append(" and iv_order_type eq '")
					.append(param.getOrderType()).append("'");
		}
		if (param.getOrderStatus() != null
				&& !param.getOrderStatus().equals("")
				&& !param.getOrderStatus().equals(Constants.ORDER_STATUS_All)) {
			urlParam.append(" and iv_status eq '")
					.append(param.getOrderStatus()).append("'");
		}

		if (param.getOrderNo() != null && !param.getOrderNo().equals("")) {
			urlParam.append(" and iv_order_no eq '").append(param.getOrderNo())
					.append("'");
		}
		if (param.getRosterFromDate() != null
				&& param.getRosterFromDate().trim().length() > 0) {

			urlParam.append(" and iv_roster_date_from eq '")
					.append(PortalUtil.convertToSAPDate(param
							.getRosterFromDate())).append("'");

		}
		if (param.getRosterToDate() != null
				&& param.getRosterToDate().trim().length() > 0) {

			urlParam.append(" and iv_roster_date_to eq '")
					.append(PortalUtil.convertToSAPDate(param.getRosterToDate()))
					.append("'");

		}

		if (param.getFromDate() != null
				&& param.getFromDate().trim().length() > 0) {

			urlParam.append(" and iv_delv_date_from eq '")
					.append(PortalUtil.convertToSAPDate(param.getFromDate()))
					.append("'");

		}

		if (param.getToDate() != null && param.getToDate().trim().length() > 0) {

			urlParam.append(" and iv_delv_date_to eq '")
					.append(PortalUtil.convertToSAPDate(param.getToDate()))
					.append("'");

		}

		if (param.getSuppNo() != null && param.getSuppNo().trim().length() > 0
				&& param.getSourceSupply() != null
				&& !param.getSourceSupply().equals("")) {

			urlParam.append(" and iv_sos eq '")
					.append(param.getSourceSupply().equals(Constants.VENDOR) ? Constants.VENDOR_NO
							: Constants.WAREHOUSE_NO)
					.append("' and iv_supplier eq '");
			
					//.append(param.getSuppNo().split("-")[0]).append("'");
			if(param.getSourceSupply().equals(Constants.VENDOR)){
				urlParam.append(param.getVnSuppNo()).append("'");
			}else{
				urlParam.append(param.getSuppNo().split("-")[0]).append("'");
		}
		}

		urlParam.append(" and iv_records eq ")
				.append(pageSize)
				.append(" and iv_page_no eq ")
				.append((param.getPageNo() != null && !param.getPageNo()
						.equals("")) ? param.getPageNo() : 1);

		// urlParam=new
		// StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		// and iv_article eq '3040690'
		URI url;
		try {
			url = new URI(porderDetailsURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		POrderDetailsResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					POrderDetailsResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// System.out.println(response);

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getPorderDetailsResponseHelper() != null
				&& response.getPorderDetailsResponseHelper().getPorderDetails() != null
				&& response.getPorderDetailsResponseHelper().getPorderDetails()
						.size() > 0) {
			if (!response.getPorderDetailsResponseHelper().getPorderDetails()
					.get(0).getMsg().contains(" ")) {
				param.setMsg(response.getPorderDetailsResponseHelper()
						.getPorderDetails().get(0).getMsg().trim());
				return (ArrayList<POrderDetails>) response
						.getPorderDetailsResponseHelper().getPorderDetails();
			} else {
				param.setMsg(response.getPorderDetailsResponseHelper()
						.getPorderDetails().get(0).getMsg().trim());
			}
		}

		return (ArrayList<POrderDetails>) response
				.getPorderDetailsResponseHelper().getPorderDetails();

	}

	public List<PReqDetails> getPreqDetails(AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null
				&& !param.getSiteNo().equals("")
				&& ((param.getFromDate() != null && !param.getFromDate()
						.equals("")) || (param.getOrderNo() != null && !param
						.getOrderNo().equals("")))) {
			urlParam = new StringBuffer(" iv_site eq '").append(
					param.getSiteNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		if (param.getOrderStatus() != null
				&& !param.getOrderStatus().equals("")
				&& !param.getOrderStatus().equals(Constants.ORDER_STATUS_All)) {
			urlParam.append(" and iv_status eq '")
					.append(param.getOrderStatus()).append("'");
		}
		if (param.getOrderNo() != null && !param.getOrderNo().equals("")) {
			urlParam.append(" and iv_order_no eq '").append(param.getOrderNo())
					.append("'");
		}
		if (param.getRosterFromDate() != null
				&& param.getRosterFromDate().trim().length() > 0) {

			urlParam.append(" and iv_roster_date_from eq '")
					.append(PortalUtil.convertToSAPDate(param
							.getRosterFromDate())).append("'");

		}
		if (param.getRosterToDate() != null
				&& param.getRosterToDate().trim().length() > 0) {

			urlParam.append(" and iv_roster_date_to eq '")
					.append(PortalUtil.convertToSAPDate(param.getRosterToDate()))
					.append("'");

		}

		if (param.getFromDate() != null
				&& param.getFromDate().trim().length() > 0) {

			urlParam.append(" and iv_delv_date_from eq '")
					.append(PortalUtil.convertToSAPDate(param.getFromDate()))
					.append("'");

		}

		if (param.getToDate() != null && param.getToDate().trim().length() > 0) {

			urlParam.append(" and iv_delv_date_to eq '")
					.append(PortalUtil.convertToSAPDate(param.getToDate()))
					.append("'");

		}

		if (param.getSuppNo() != null && param.getSuppNo().trim().length() > 0
				&& param.getSourceSupply() != null
				&& !param.getSourceSupply().equals("")) {

			urlParam.append(" and iv_sos eq '")
					.append(param.getSourceSupply().equals(Constants.VENDOR) ? Constants.VENDOR_NO
							: Constants.WAREHOUSE_NO)
					.append("' and iv_supplier eq '")
					.append(param.getSuppNo().split("-")[0]).append("'");
		}

		urlParam.append(" and iv_records eq ")
				.append(pageSize)
				.append(" and iv_page_no eq ")
				.append((param.getPageNo() != null && !param.getPageNo()
						.equals("")) ? param.getPageNo() : 1);

		// urlParam=new
		// StringBuffer(" iv_site eq '0156' and iv_order_no eq '80007640' ");
		// and iv_article eq '3040690'
		System.out.println("urlParam.toString() _ " + urlParam.toString());
		URI url;
		try {
			url = new URI(preqDetailsURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		PReqDetailsResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					PReqDetailsResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// System.out.println(response);

		if (response == null) {
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getPreqResponseHelper().getPreqDetails() != null
				&& response.getPreqResponseHelper().getPreqDetails() != null
				&& response.getPreqResponseHelper().getPreqDetails().size() > 0) {
			if (!response.getPreqResponseHelper().getPreqDetails().get(0)
					.getMsg().contains(" ")) {
				param.setMsg(response.getPreqResponseHelper().getPreqDetails()
						.get(0).getMsg().trim());
				return (ArrayList<PReqDetails>) response
						.getPreqResponseHelper().getPreqDetails();
			} else {
				param.setMsg(response.getPreqResponseHelper().getPreqDetails()
						.get(0).getMsg().trim());

			}
		}

		return (ArrayList<PReqDetails>) response.getPreqResponseHelper()
				.getPreqDetails();

	}

	public List<InvoiceDetailsforPO> getInvoiceDetails(
			AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("' and iv_order_no eq '")
					.append(param.getOrderNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		// urlParam=new
		// StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		// and iv_article eq '3040690'
		URI url;
		try {
			url = new URI(invoiceDetailsforPO
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.TECHNICAL_ISSUE);
			return null;
		}

		InvoiceDetailsforPOResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					InvoiceDetailsforPOResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		if (response == null) {
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getInvoiceDetailsforPOResponseHelper()
						.getInvoiceDetails() != null
				&& response.getInvoiceDetailsforPOResponseHelper()
						.getInvoiceDetails() != null
				&& response.getInvoiceDetailsforPOResponseHelper()
						.getInvoiceDetails().size() > 0) {
			param.setMsg(((Integer) (response
					.getInvoiceDetailsforPOResponseHelper().getInvoiceDetails()
					.size())).toString());
			return (ArrayList<InvoiceDetailsforPO>) response
					.getInvoiceDetailsforPOResponseHelper().getInvoiceDetails();
		}
		param.setMsg(Constants.NDF);
		return null;

	}

	public List<GRArticle> getGrAticles(AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getGrNo() != null && !param.getGrNo().equals("")
				&& param.getYear() != null && !param.getYear().equals("")) {
			urlParam = new StringBuffer(" iv_gr_no eq '")
					.append(param.getGrNo())
					.append("' and iv_gr_doc_year eq '")
					.append(param.getYear()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		// urlParam=new
		// StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		// and iv_article eq '3040690'
		URI url;
		try {
			url = new URI(grArticleServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.TECHNICAL_ISSUE);
			return null;
		}

		GRArticleResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					GRArticleResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		if (response == null) {
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getGrArticleResponseHelper().getGrArticleList() != null
				&& response.getGrArticleResponseHelper().getGrArticleList() != null
				&& response.getGrArticleResponseHelper().getGrArticleList()
						.size() > 0) {
			param.setMsg(((Integer) (response.getGrArticleResponseHelper()
					.getGrArticleList().size())).toString());
			return (ArrayList<GRArticle>) response.getGrArticleResponseHelper()
					.getGrArticleList();
		}
		param.setMsg(Constants.NDF);
		return null;

	}

	public List<GoodReceiptDetailforPO> getGoodReceiptDetails(
			AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("' and iv_order_no eq '")
					.append(param.getOrderNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		// urlParam=new
		// StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		// and iv_article eq '3040690'
		URI url;
		try {
			url = new URI(grDetailsforPOURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.TECHNICAL_ISSUE);
			return null;
		}

		GoodReceiptDetailforPOResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					GoodReceiptDetailforPOResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.NDF);
			return null;
		}
		if (response == null) {
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		} else if (response != null
				&& response.getGoodReceiptDetailforPOResponseHelper()
						.getGoodReceiptDetailforPO() != null
				&& response.getGoodReceiptDetailforPOResponseHelper()
						.getGoodReceiptDetailforPO() != null
				&& response.getGoodReceiptDetailforPOResponseHelper()
						.getGoodReceiptDetailforPO().size() > 0) {
			param.setMsg(((Integer) (response
					.getGoodReceiptDetailforPOResponseHelper()
					.getGoodReceiptDetailforPO().size())).toString());
			return (ArrayList<GoodReceiptDetailforPO>) response
					.getGoodReceiptDetailforPOResponseHelper()
					.getGoodReceiptDetailforPO();
		}
		param.setMsg(Constants.NDF);
		return null;

	}

	public List<OrderDetailItem> getOrderItemDtls(
			AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_order_no eq '")
					.append(param.getOrderNo()).append("'")
					.append(" and iv_site eq '").append(param.getSiteNo())
					.append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		URI url;
		try {
			url = new URI(orderItemDataURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println("orderItemDataURL :::::" + url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.TECHNICAL_ISSUE);
			return null;
		}

		OrderDetailItemResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					OrderDetailItemResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// System.out.println(response);

		if (response == null) {
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getOrderDetailItemResponseHelper() != null
				&& response.getOrderDetailItemResponseHelper()
						.getOrderItemDetails() != null
				&& response.getOrderDetailItemResponseHelper()
						.getOrderItemDetails().size() > 0) {
			param.setMsg(((Integer) response.getOrderDetailItemResponseHelper()
					.getOrderItemDetails().size()).toString());
			return (ArrayList<OrderDetailItem>) response
					.getOrderDetailItemResponseHelper().getOrderItemDetails();
		}
		param.setMsg(Constants.NDF);
		return null;

	}

	public List<DeliveryData> getDeliveryData(AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("' and iv_order_no eq '")
					.append(param.getOrderNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		URI url;
		try {
			url = new URI(deliveryDataforPOURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.TECHNICAL_ISSUE);
			return null;
		}

		DeliveryDataResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					DeliveryDataResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// System.out.println(response);

		if (response == null) {
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getDeliveryDataResponseHelper() != null
				&& response.getDeliveryDataResponseHelper()
						.getDeliveryDataDtl() != null
				&& response.getDeliveryDataResponseHelper()
						.getDeliveryDataDtl().size() > 0) {
			param.setMsg(((Integer) response.getDeliveryDataResponseHelper()
					.getDeliveryDataDtl().size()).toString());
			return (ArrayList<DeliveryData>) response
					.getDeliveryDataResponseHelper().getDeliveryDataDtl();
		}
		param.setMsg(Constants.NDF);
		return null;

	}

	public List<PReqItemData> getPReqItemDetails(
			AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("' and iv_preq_no eq '")
					.append(param.getOrderNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		// urlParam=new
		// StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		// and iv_article eq '3040690'
		URI url;
		try {
			url = new URI(preqItemdataURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println(url);
			System.out.println();
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		PReqItemDataResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					PReqItemDataResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// System.out.println(response);

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getPreqItemDataResponseHelper() != null
				&& response.getPreqItemDataResponseHelper().getPreqItemData() != null
				&& response.getPreqItemDataResponseHelper().getPreqItemData()
						.size() > 0) {
			param.setMsg(((Integer) (response.getPreqItemDataResponseHelper()
					.getPreqItemData().size())).toString());
			return (ArrayList<PReqItemData>) response
					.getPreqItemDataResponseHelper().getPreqItemData();
		}

		return (ArrayList<PReqItemData>) response
				.getPreqItemDataResponseHelper().getPreqItemData();

	}

	public List<OrderDetailItem> getSegmentDeliveryDtls(
			AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getOrderNo() != null && !param.getOrderNo().equals("")) {
			urlParam = new StringBuffer(" iv_order_no eq '").append(
					param.getOrderNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		URI url;
		try {
			url = new URI(segmentDeliveryDataURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println(urlParam);
			System.out.println("segmentDeliveryDataURL :::::" + url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.TECHNICAL_ISSUE);
			return null;
		}

		OrderDetailItemResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					OrderDetailItemResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// System.out.println(response);

		if (response == null) {
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getOrderDetailItemResponseHelper() != null
				&& response.getOrderDetailItemResponseHelper()
						.getOrderItemDetails() != null
				&& response.getOrderDetailItemResponseHelper()
						.getOrderItemDetails().size() > 0) {
			param.setMsg(((Integer) response.getOrderDetailItemResponseHelper()
					.getOrderItemDetails().size()).toString());
			return (ArrayList<OrderDetailItem>) response
					.getOrderDetailItemResponseHelper().getOrderItemDetails();
		}
		param.setMsg(Constants.NDF);
		return null;

	}

}
