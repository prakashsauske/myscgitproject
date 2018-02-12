package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderPopUpTabSearchDtl {
	

	@JsonProperty("delivery_date")
	private String deliveryDate;

	@JsonProperty("intransit_qty")
	private String intransitQty;

	@JsonProperty("iv_site")
	private String siteNo;

	@JsonProperty("iv_article")
	private String articleNo;

	@JsonProperty("order_status")
	private String orderStatus;

	@JsonProperty("order_qty")
	private String orderQty;

	@JsonProperty("order_no")
	private String orderNo;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("supplier")
	private String supplier;

	@JsonProperty("supplier_name")
	private String supplierName;
	
	
	//Newly Added JSON Property
	
	@JsonProperty("deliveryDate")
	private String deliveryDate_m;

	@JsonProperty("intransitQty")
	private String intransitQty_m;

	@JsonProperty("siteNo")
	private String siteNo_m;

	@JsonProperty("articleNo")
	private String articleNo_m;

	@JsonProperty("orderStatus")
	private String orderStatus_m;

	@JsonProperty("orderQty")
	private String orderQty_m;

	@JsonProperty("orderNo")
	private String orderNo_m;

	@JsonProperty("supplierName")
	private String supplierName_m;

	/**
	 * @param deliveryDate
	 * @param intransitQty
	 * @param siteNo
	 * @param articleNo
	 * @param orderStatus
	 * @param orderQty
	 * @param orderNo
	 * @param supplierName
	 */
	@JsonCreator
	public OrderPopUpTabSearchDtl(@JsonProperty("delivery_date") String deliveryDate,@JsonProperty("intransit_qty") String intransitQty,
			@JsonProperty("iv_site") String siteNo,@JsonProperty("iv_article") String articleNo,@JsonProperty("order_status") String orderStatus,
			@JsonProperty("order_qty") String orderQty,@JsonProperty("order_no") String orderNo,@JsonProperty("supplier_name") String supplierName) {
		
		this.deliveryDate = deliveryDate;
		this.intransitQty = intransitQty;
		this.siteNo = siteNo;
		this.articleNo = articleNo;
		this.orderStatus = orderStatus;
		this.orderQty = orderQty;
		this.orderNo = orderNo;
		this.supplierName = supplierName;
		
		this.deliveryDate_m = deliveryDate;
		this.intransitQty_m = intransitQty;
		this.siteNo_m = siteNo;
		this.articleNo_m = articleNo;
		this.orderStatus_m = orderStatus;
		this.orderQty_m = orderQty;
		this.orderNo_m = orderNo;
		this.supplierName_m = supplierName;
	}

	/**
	 * @return the deliveryDate
	 */
	public String getDeliveryDate() {
		return deliveryDate;
	}

	/**
	 * @param deliveryDate the deliveryDate to set
	 */
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	/**
	 * @return the intransitQty
	 */
	public String getIntransitQty() {
		return intransitQty;
	}

	/**
	 * @param intransitQty the intransitQty to set
	 */
	public void setIntransitQty(String intransitQty) {
		this.intransitQty = intransitQty;
	}

	/**
	 * @return the siteNo
	 */
	public String getSiteNo() {
		return siteNo;
	}

	/**
	 * @param siteNo the siteNo to set
	 */
	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	/**
	 * @return the articleNo
	 */
	public String getArticleNo() {
		return articleNo;
	}

	/**
	 * @param articleNo the articleNo to set
	 */
	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	/**
	 * @return the orderStatus
	 */
	public String getOrderStatus() {
		return orderStatus;
	}

	/**
	 * @param orderStatus the orderStatus to set
	 */
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	/**
	 * @return the orderQty
	 */
	public String getOrderQty() {
		return orderQty;
	}

	/**
	 * @param orderQty the orderQty to set
	 */
	public void setOrderQty(String orderQty) {
		this.orderQty = orderQty;
	}

	/**
	 * @return the orderNo
	 */
	public String getOrderNo() {
		return orderNo;
	}

	/**
	 * @param orderNo the orderNo to set
	 */
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the supplier
	 */
	public String getSupplier() {
		return supplier;
	}

	/**
	 * @param supplier the supplier to set
	 */
	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	/**
	 * @return the supplierName
	 */
	public String getSupplierName() {
		return supplierName;
	}

	/**
	 * @param supplierName the supplierName to set
	 */
	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}
	
}
