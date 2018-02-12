package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EDGMSReport {

	@JsonProperty("iv_trading_dept")
	private String tradingDept;
	@JsonProperty("iv_wc_date")
	private String wcDate;
	@JsonProperty("iv_date")
	private String inputDate;
	@JsonProperty("iv_site")
	private String siteNo;

	@JsonProperty("temperature")
	private String temperature;
	@JsonProperty("user_id")
	private String userId;
	@JsonProperty("delivery_docket_no")
	private String deliveryDocketNo;
	@JsonProperty("banner")
	private String banner;
	@JsonProperty("cost")
	private String cost;
	@JsonProperty("store_no")
	private String storeNo;
	@JsonProperty("roster_date")
	private String rosterDate;
	@JsonProperty("delivery_date")
	private String deliveryDate;
	@JsonProperty("article")
	private String article;
	@JsonProperty("msg")
	private String msg;
	@JsonProperty("trading_dept_no")
	private String tradingDeptNo;
	@JsonProperty("invoice_no")
	private String invoiceNo;
	@JsonProperty("item_no")
	private String itemNo;
	@JsonProperty("grn_no")
	private String grnNo;
	@JsonProperty("time_of_receipt")
	private String receiptTime;
	@JsonProperty("receipt_method")
	private String receiptMethod;
	@JsonProperty("order_status")
	private String orderStatus;
	@JsonProperty("no_of_cartons")
	private String cartonsNo;
	@JsonProperty("vendor_name")
	private String vendorName;
	@JsonProperty("invoice_total")
	private String invoiceTotal;
	@JsonProperty("date")
	private String outputDate;
	@JsonProperty("trading_dept_name")
	private String tradingDeptName;
	@JsonProperty("time")
	private String time;
	@JsonProperty("store_name")
	private String storeName;
	@JsonProperty("user_name")
	private String userName;
	@JsonProperty("order_type")
	private String orderType;
	@JsonProperty("date_of_receipt")
	private String receiptDate;
	@JsonProperty("order_no")
	private String orderNo;
	@JsonProperty("vendor_no")
	private String vendorNo;
	@JsonProperty("gst_value")
	private String gstValue;
	@JsonProperty("uom")
	private String uom;

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		if (uom.trim().length() == 0) {
			this.uom = "OMs";
		} else {
			this.uom = uom;
		}

	}

	public String getTradingDept() {
		return tradingDept;
	}

	public void setTradingDept(String tradingDept) {
		this.tradingDept = tradingDept;
	}

	public String getWcDate() {
		if (this.wcDate != null) {
			String result = PortalUtil.convertToStandard(wcDate);
			if (result != null && result != "")
				return result;
		}
		return wcDate;
	}

	public void setWcDate(String wcDate) {
		this.wcDate = wcDate;
	}

	public String getInputDate() {
		if (this.inputDate != null) {
			String result = PortalUtil.convertToStandard(inputDate);
			if (result != null && result != "")
				return result;
		}
		return inputDate;
	}

	public void setInputDate(String inputDate) {
		this.inputDate = inputDate;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getDeliveryDocketNo() {
		return deliveryDocketNo;
	}

	public void setDeliveryDocketNo(String deliveryDocketNo) {
		this.deliveryDocketNo = deliveryDocketNo;
	}

	public String getBanner() {
		return banner;
	}

	public void setBanner(String banner) {
		this.banner = banner;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getStoreNo() {
		return storeNo;
	}

	public void setStoreNo(String storeNo) {
		this.storeNo = storeNo;
	}

	public String getRosterDate() {
		if (this.rosterDate != null) {
			String result = PortalUtil.convertToStandard(rosterDate);
			if (result != null && result != "")
				return result;
		}
		return rosterDate;
	}

	public void setRosterDate(String rosterDate) {
		this.rosterDate = rosterDate;
	}

	public String getDeliveryDate() {
		if (this.deliveryDate != null) {
			String result = PortalUtil.convertToStandard(deliveryDate);
			if (result != null && result != "")
				return result;
		}
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getTradingDeptNo() {
		return tradingDeptNo;
	}

	public void setTradingDeptNo(String tradingDeptNo) {
		this.tradingDeptNo = tradingDeptNo;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getItemNo() {
		return itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getGrnNo() {
		return grnNo;
	}

	public void setGrnNo(String grnNo) {
		this.grnNo = grnNo;
	}

	public String getReceiptTime() {
		return receiptTime;
	}

	public void setReceiptTime(String receiptTime) {
		this.receiptTime = receiptTime;
	}

	public String getReceiptMethod() {
		return receiptMethod;
	}

	public void setReceiptMethod(String receiptMethod) {
		this.receiptMethod = receiptMethod;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getCartonsNo() {
		return cartonsNo;
	}

	public void setCartonsNo(String cartonsNo) {
		this.cartonsNo = cartonsNo;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getInvoiceTotal() {
		return invoiceTotal;
	}

	public void setInvoiceTotal(String invoiceTotal) {
		this.invoiceTotal = invoiceTotal;
	}

	public String getOutputDate() {
		if (this.outputDate != null) {
			String result = PortalUtil.convertToStandard(outputDate);
			if (result != null && result != "")
				return result;
		}
		return outputDate;
	}

	public void setOutputDate(String outputDate) {
		this.outputDate = outputDate;
	}

	public String getTradingDeptName() {
		return tradingDeptName;
	}

	public void setTradingDeptName(String tradingDeptName) {
		this.tradingDeptName = tradingDeptName;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getReceiptDate() {
		if (this.receiptDate != null) {
			String result = PortalUtil.convertToStandard(receiptDate);
			if (result != null && result != "")
				return result;
		}
		return receiptDate;
	}

	public void setReceiptDate(String receiptDate) {
		this.receiptDate = receiptDate;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getVendorNo() {
		return vendorNo;
	}

	public void setVendorNo(String vendorNo) {
		this.vendorNo = vendorNo;
	}

	public String getGstValue() {
		return gstValue;
	}

	public void setGstValue(String gstValue) {
		this.gstValue = gstValue;
	}

}
