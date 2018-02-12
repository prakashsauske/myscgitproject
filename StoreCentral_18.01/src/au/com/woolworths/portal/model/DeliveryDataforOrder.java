package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DeliveryDataforOrder {
	

	@JsonProperty("delivery_no")
	private String deliveryNo;

	@JsonProperty("recived_time")
	private String recivedTime;
	
	@JsonProperty("ordered_qty")
	private String orderedQty;

	@JsonProperty("dispatched_date")
	private String dispatchedDate;

	@JsonProperty("pick_list_gen_date")
	private String pickListGenDate;

	@JsonProperty("received_date")
	private String receivedDate;

	@JsonProperty("suggested_qty")
	private String suggestedQty;

	@JsonProperty("pick_list_gen_time")
	private String pickListGenTime;

	@JsonProperty("dispatched_date")
	private String dispatchedDate1;

	@JsonProperty("allocated_qty")
	private String allocatedQty;

	@JsonProperty("dispatched_time")
	private String dispatchedTime;
	
	@JsonProperty("asn_no")
	private String asn_No;

	/**
	 * @return the deliveryNo
	 */
	public String getDeliveryNo() {
		return deliveryNo;
	}

	/**
	 * @param deliveryNo the deliveryNo to set
	 */
	public void setDeliveryNo(String deliveryNo) {
		this.deliveryNo = deliveryNo;
	}

	/**
	 * @return the recivedTime
	 */
	public String getRecivedTime() {
		return recivedTime;
	}

	/**
	 * @param recivedTime the recivedTime to set
	 */
	public void setRecivedTime(String recivedTime) {
		this.recivedTime = recivedTime;
	}

	/**
	 * @return the orderedQty
	 */
	public String getOrderedQty() {
		return orderedQty;
	}

	/**
	 * @param orderedQty the orderedQty to set
	 */
	public void setOrderedQty(String orderedQty) {
		this.orderedQty = orderedQty;
	}

	/**
	 * @return the dispatchedDate
	 */
	public String getDispatchedDate() {
		return dispatchedDate;
	}

	/**
	 * @param dispatchedDate the dispatchedDate to set
	 */
	public void setDispatchedDate(String dispatchedDate) {
		this.dispatchedDate = dispatchedDate;
	}

	/**
	 * @return the pickListGenDate
	 */
	public String getPickListGenDate() {
		return pickListGenDate;
	}

	/**
	 * @param pickListGenDate the pickListGenDate to set
	 */
	public void setPickListGenDate(String pickListGenDate) {
		this.pickListGenDate = pickListGenDate;
	}

	/**
	 * @return the receivedDate
	 */
	public String getReceivedDate() {
		return receivedDate;
	}

	/**
	 * @param receivedDate the receivedDate to set
	 */
	public void setReceivedDate(String receivedDate) {
		this.receivedDate = receivedDate;
	}

	/**
	 * @return the suggestedQty
	 */
	public String getSuggestedQty() {
		return suggestedQty;
	}

	/**
	 * @param suggestedQty the suggestedQty to set
	 */
	public void setSuggestedQty(String suggestedQty) {
		this.suggestedQty = suggestedQty;
	}

	/**
	 * @return the pickListGenTime
	 */
	public String getPickListGenTime() {
		return pickListGenTime;
	}

	/**
	 * @param pickListGenTime the pickListGenTime to set
	 */
	public void setPickListGenTime(String pickListGenTime) {
		this.pickListGenTime = pickListGenTime;
	}

	/**
	 * @return the dispatchedDate1
	 */
	public String getDispatchedDate1() {
		return dispatchedDate1;
	}

	/**
	 * @param dispatchedDate1 the dispatchedDate1 to set
	 */
	public void setDispatchedDate1(String dispatchedDate1) {
		this.dispatchedDate1 = dispatchedDate1;
	}

	/**
	 * @return the allocatedQty
	 */
	public String getAllocatedQty() {
		return allocatedQty;
	}

	/**
	 * @param allocatedQty the allocatedQty to set
	 */
	public void setAllocatedQty(String allocatedQty) {
		this.allocatedQty = allocatedQty;
	}

	/**
	 * @return the dispatchedTime
	 */
	public String getDispatchedTime() {
		return dispatchedTime;
	}

	/**
	 * @param dispatchedTime the dispatchedTime to set
	 */
	public void setDispatchedTime(String dispatchedTime) {
		this.dispatchedTime = dispatchedTime;
	}

	
	/**
	 * @return the asn_No
	 */
	public String getAsn_No() {
		return asn_No;
	}

	/**
	 * @param asn_No the asn_No to set
	 */
	public void setAsn_No(String asn_No) {
		this.asn_No = asn_No;
	}

	



}