package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WarehouserVarianceItem {

	@JsonProperty("despatched_date")
	private String despatchedDate;

	@JsonProperty("dc")
	private String dc;

	@JsonProperty("received_date")
	private String receivedDate;

	@JsonProperty("delivery_date")
	private String deliveryDate;

	@JsonProperty("dc_name")
	private String dcName;

	@JsonProperty("order_multiple")
	private String om;

	@JsonProperty("tot_order_sell")
	private String totOrderSell;
	
	@JsonProperty("tot_order_cost")
	private String totOrderCost;
	
	

	@JsonProperty("tot_potential_per_gp")
	private String totPotentialPerGp;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("order_qty")
	private String orderQty;

	@JsonProperty("item_no")
	private String itemNo;

	@JsonProperty("article_desc")
	private String articleDesc;

	@JsonProperty("received_qty")
	private String receivedQty;

	@JsonProperty("despatched_qty")
	private String despatchedQty;

	@JsonProperty("article")
	private String article;

	@JsonProperty("order_no")
	private String orderNo;

	@JsonProperty("order_sell")
	private String orderSell;

	@JsonProperty("difference_qty")
	private String differenceQty;

	@JsonProperty("potential_per_gp")
	private String potentialPerGp;
	
	
	
	//Start of Newly added JSON Property
	
	@JsonProperty("despatchedDate")
	private String despatchedDate_m;

	@JsonProperty("receivedDate")
	private String receivedDate_m;

	@JsonProperty("deliveryDate")
	private String deliveryDate_m;

	@JsonProperty("dcName")
	private String dcName_m;

	@JsonProperty("om")
	private String om_m;

	@JsonProperty("totOrderSell")
	private String totOrderSell_m;
	
	@JsonProperty("totOrderCost")
	private String totOrderCost_m;
	
	

	@JsonProperty("totPotentialPerGp")
	private String totPotentialPerGp_m;

	@JsonProperty("orderQty")
	private String orderQty_m;

	@JsonProperty("itemNo")
	private String itemNo_m;

	@JsonProperty("articleDesc")
	private String articleDesc_m;

	@JsonProperty("receivedQty")
	private String receivedQty_m;

	@JsonProperty("despatchedQty")
	private String despatchedQty_m;

	@JsonProperty("orderNo")
	private String orderNo_m;

	@JsonProperty("orderSell")
	private String orderSell_m;

	@JsonProperty("differenceQty")
	private String differenceQty_m;

	@JsonProperty("potentialPerGp")
	private String potentialPerGp_m;
	
	

	/**
	 * @param despatchedDate
	 * @param receivedDate
	 * @param deliveryDate
	 * @param dcName
	 * @param om
	 * @param totOrderSell
	 * @param totOrderCost
	 * @param totPotentialPerGp
	 * @param orderQty
	 * @param itemNo
	 * @param articleDesc
	 * @param receivedQty
	 * @param despatchedQty
	 * @param orderNo
	 * @param orderSell
	 * @param differenceQty
	 * @param potentialPerGp
	 */
	@JsonCreator
	public WarehouserVarianceItem(@JsonProperty("despatched_date") String despatchedDate,@JsonProperty("received_date") String receivedDate,
			@JsonProperty("delivery_date") String deliveryDate,@JsonProperty("dc_name") String dcName,@JsonProperty("order_multiple") String om,@JsonProperty("tot_order_sell") String totOrderSell,
			@JsonProperty("tot_order_cost") String totOrderCost,@JsonProperty("tot_potential_per_gp") String totPotentialPerGp,@JsonProperty("order_qty") String orderQty,
			@JsonProperty("item_no") String itemNo,@JsonProperty("article_desc") String articleDesc,@JsonProperty("received_qty") String receivedQty,
			@JsonProperty("despatched_qty") String despatchedQty,@JsonProperty("order_no") String orderNo,@JsonProperty("order_sell") String orderSell,
			@JsonProperty("difference_qty") String differenceQty,@JsonProperty("potential_per_gp") String potentialPerGp) {
	
		this.despatchedDate = despatchedDate;
		this.receivedDate = receivedDate;
		this.deliveryDate = deliveryDate;
		this.dcName = dcName;
		this.om = om;
		this.totOrderSell = totOrderSell;
		this.totOrderCost = totOrderCost;
		this.totPotentialPerGp = totPotentialPerGp;
		this.orderQty = orderQty;
		this.itemNo = itemNo;
		this.articleDesc = articleDesc;
		this.receivedQty = receivedQty;
		this.despatchedQty = despatchedQty;
		this.orderNo = orderNo;
		this.orderSell = orderSell;
		this.differenceQty = differenceQty;
		this.potentialPerGp = potentialPerGp;
		
		this.despatchedDate_m = despatchedDate;
		this.receivedDate_m = receivedDate;
		this.deliveryDate_m = deliveryDate;
		this.dcName_m = dcName;
		this.om_m = om;
		this.totOrderSell_m = totOrderSell;
		this.totOrderCost_m = totOrderCost;
		this.totPotentialPerGp_m = totPotentialPerGp;
		this.orderQty_m = orderQty;
		this.itemNo_m = itemNo;
		this.articleDesc_m = articleDesc;
		this.receivedQty_m = receivedQty;
		this.despatchedQty_m = despatchedQty;
		this.orderNo_m = orderNo;
		this.orderSell_m = orderSell;
		this.differenceQty_m = differenceQty;
		this.potentialPerGp_m = potentialPerGp;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getOrderQty() {
		return orderQty;
	}

	public void setOrderQty(String orderQty) {
		this.orderQty = orderQty;
	}

	public String getItemNo() {
		return itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getReceivedQty() {
		return receivedQty;
	}

	public void setReceivedQty(String receivedQty) {
		this.receivedQty = receivedQty;
	}

	public String getDespatchedQty() {
		return despatchedQty;
	}

	public void setDespatchedQty(String despatchedQty) {
		this.despatchedQty = despatchedQty;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderSell() {
		return orderSell;
	}

	public void setOrderSell(String orderSell) {
		this.orderSell = orderSell;
	}

	public String getDifferenceQty() {
		return differenceQty;
	}

	public void setDifferenceQty(String differenceQty) {
		this.differenceQty = differenceQty;
	}

	public String getPotentialPerGp() {
		return potentialPerGp;
	}

	public void setPotentialPerGp(String potentialPerGp) {
		this.potentialPerGp = potentialPerGp;
	}

	public String getDespatchedDate() {
		return despatchedDate;
	}

	public void setDespatchedDate(String despatchedDate) {
		this.despatchedDate = despatchedDate;
	}

	public String getDc() {
		return dc;
	}

	public void setDc(String dc) {
		this.dc = dc;
	}

	public String getReceivedDate() {
		return receivedDate;
	}

	public void setReceivedDate(String receivedDate) {
		this.receivedDate = receivedDate;
	}

	public String getDeliveryDate() {
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getDcName() {
		return dcName;
	}

	public void setDcName(String dcName) {
		this.dcName = dcName;
	}

	public String getTotOrderSell() {
		return totOrderSell;
	}

	public void setTotOrderSell(String totOrderSell) {
		this.totOrderSell = totOrderSell;
	}

	public String getTotPotentialPerGp() {
		return totPotentialPerGp;
	}

	public void setTotPotentialPerGp(String totPotentialPerGp) {
		this.totPotentialPerGp = totPotentialPerGp;
	}

	public String getOm() {
		return om;
	}

	public void setOm(String om) {
		this.om = om;
	}

	/**
	 * @return the totOrderCost
	 */
	public String getTotOrderCost() {
		return totOrderCost;
	}

	/**
	 * @param totOrderCost the totOrderCost to set
	 */
	public void setTotOrderCost(String totOrderCost) {
		this.totOrderCost = totOrderCost;
	}

}
