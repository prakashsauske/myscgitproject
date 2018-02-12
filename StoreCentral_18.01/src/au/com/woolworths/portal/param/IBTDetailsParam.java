package au.com.woolworths.portal.param;

public class IBTDetailsParam {

	private String siteNo;

	private String vendorNo;

	private String deliveryDate;

	private String orderDate;

	private String tracNo;

	private String orderCategory;

	private String transferQty;

	private String status;

	private String orderedQty;

	private String uomValType;

	public String getUomValType() {
		return uomValType;
	}

	public void setUomValType(String uomValType) {
		this.uomValType = uomValType;

	}

	public String getOrderedQty() {
		return orderedQty;
	}

	public void setOrderedQty(String orderedQty) {
		this.orderedQty = orderedQty;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getVendorNo() {
		return vendorNo;
	}

	public void setVendorNo(String vendorNo) {
		this.vendorNo = vendorNo;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getOrderDate() {
		return orderDate;
	}

	public void setOrderDate(String orderDate) {
		this.orderDate = orderDate;
	}

	public String getTracNo() {
		return tracNo;
	}

	public void setTracNo(String tracNo) {
		this.tracNo = tracNo;
	}

	public String getOrderCategory() {
		return orderCategory;
	}

	public void setOrderCategory(String orderCategory) {
		this.orderCategory = orderCategory;
	}

	public String getTransferQty() {
		return transferQty;
	}

	public void setTransferQty(String transferQty) {
		this.transferQty = transferQty;
	}

}
