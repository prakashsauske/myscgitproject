package au.com.woolworths.portal.model;

import java.text.DateFormat;
import java.text.SimpleDateFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DGMSReport {

	@JsonProperty("iv_trading_dept")
	private String tradingDept;
	@JsonProperty("iv_wc_date")
	private String wcDate;
	@JsonProperty("iv_date")
	private String inputDate;
	@JsonProperty("iv_site")
	private String siteNo;

	@JsonProperty("user_name")
	private String userName;
	@JsonProperty("msg")
	private String msg;
	@JsonProperty("invoice_no")
	private String invoiceNo;
	@JsonProperty("store_no")
	private String storeNo;
	@JsonProperty("order_no")
	private String orderNo;
	@JsonProperty("fine_dept_no")
	private String fineDeptNo;
	@JsonProperty("item_no")
	private String itemNo;
	@JsonProperty("article")
	private String article;
	@JsonProperty("delivery_docket_no")
	private String deliveryDocketNo;
	@JsonProperty("gst_value")
	private String gstValue;
	@JsonProperty("banner")
	private String banner;
	@JsonProperty("vendor_name")
	private String vendorName;
	@JsonProperty("delivery_date")
	private String deliveryDate;
	@JsonProperty("time")
	private String time;
	@JsonProperty("temperature")
	private String temperature;
	@JsonProperty("user_id")
	private String userId;
	@JsonProperty("trading_dept_name")
	private String tradingDeptName;
	@JsonProperty("cost")
	private String cost;
	@JsonProperty("trading_dept_no")
	private String tradingDeptNo;
	@JsonProperty("date_of_receipt")
	private String receiptDate;
	@JsonProperty("vendor_no")
	private String vendorNo;
	@JsonProperty("time_of_receipt")
	private String receiptTime;
	@JsonProperty("carrier")
	private String carrier;
	@JsonProperty("invoice_total")
	private String invoiceTotal;
	@JsonProperty("date")
	private String outputDate;
	@JsonProperty("store_name")
	private String storeName;
	@JsonProperty("consignment")
	private String consignment;
	@JsonProperty("roster_date")
	private String rosterDate;

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

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getStoreNo() {
		return storeNo;
	}

	public void setStoreNo(String storeNo) {
		this.storeNo = storeNo;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getFineDeptNo() {
		return fineDeptNo;
	}

	public void setFineDeptNo(String fineDeptNo) {
		this.fineDeptNo = fineDeptNo;
	}

	public String getItemNo() {
		return itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getDeliveryDocketNo() {
		return deliveryDocketNo;
	}

	public void setDeliveryDocketNo(String deliveryDocketNo) {
		this.deliveryDocketNo = deliveryDocketNo;
	}

	public String getGstValue() {
		if (gstValue != null)
			gstValue = gstValue.replace("*", "");
		return gstValue;
	}

	public void setGstValue(String gstValue) {
		if (gstValue != null)
			gstValue.replace("*", "");

		this.gstValue = gstValue;
	}

	public String getBanner() {

		return banner;
	}

	public void setBanner(String banner) {
		this.banner = banner;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
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

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
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

	public String getTradingDeptName() {
		return tradingDeptName;
	}

	public void setTradingDeptName(String tradingDeptName) {
		this.tradingDeptName = tradingDeptName;
	}

	public String getCost() {
		return cost;
	}

	public void setCost(String cost) {
		this.cost = cost;
	}

	public String getTradingDeptNo() {
		return tradingDeptNo;
	}

	public void setTradingDeptNo(String tradingDeptNo) {
		this.tradingDeptNo = tradingDeptNo;
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
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		this.receiptDate = dateFormat.format(receiptDate);
	}

	public String getVendorNo() {
		return vendorNo;
	}

	public void setVendorNo(String vendorNo) {
		this.vendorNo = vendorNo;
	}

	public String getReceiptTime() {
		return receiptTime;
	}

	public void setReceiptTime(String receiptTime) {
		this.receiptTime = receiptTime;
	}

	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
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

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getConsignment() {
		return consignment;
	}

	public void setConsignment(String consignment) {
		this.consignment = consignment;
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
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		this.rosterDate = dateFormat.format(rosterDate);
	}

}
