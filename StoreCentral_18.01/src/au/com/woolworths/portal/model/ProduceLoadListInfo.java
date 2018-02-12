package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ProduceLoadListInfo {

	@JsonProperty("qty_demand")
	private String qtyDemand;

	@JsonProperty("price_chng_flag")
	private String price_chng_flag;
	
	
	@JsonProperty("om")
	private String om;
	@JsonProperty("art_desc")
	private String artDesc;
	@JsonProperty("qty")
	private String qty;
	@JsonProperty("qty_substitution")
	private String qtySubstitution;
	@JsonProperty("delivery_date")
	private String deliveryDate;
	@JsonProperty("roster_date")
	private String rosterDate;
	@JsonProperty("warehouse_name")
	private String warehouseName;
	@JsonProperty("store_name")
	private String storeName;
	@JsonProperty("store_no")
	private String storeNo;
	@JsonProperty("qty_unavailable")
	private String qtyUnavailable;
	@JsonProperty("gp_percent")
	private String gpPercent;
	@JsonProperty("warehouse_no")
	private String warehouseNo;
	@JsonProperty("store_order")
	private String storeOrder;
	@JsonProperty("loadlist_no")
	private String loadlistNo;
	@JsonProperty("qty_allocation")
	private String qtyAllocation;
	@JsonProperty("unit")
	private String unit;
	@JsonProperty("sell_price")
	private String sellPrice;
	@JsonProperty("article")
	private String article;
	@JsonProperty("gst_rate")
	private String gstRate;

	@JsonProperty("issue_cost")
	private String issueCost;
	
	@JsonProperty("tot_sp_exc_gst")
	private String tot_sp_exc_gst;
	@JsonProperty("tot_gross_profit")
	private String tot_gross_profit;
	@JsonProperty("tot_sp_inc_gst")
	private String tot_sp_inc_gst;
	@JsonProperty("tot_cost")
	private String tot_cost;

	@JsonProperty("msg")
	private String msg;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getQtyDemand() {
		return qtyDemand;
	}

	public void setQtyDemand(String qtyDemand) {
		this.qtyDemand = qtyDemand;
	}

	public String getOm() {
		return om;
	}

	public void setOm(String om) {
		this.om = om;
	}

	public String getArtDesc() {
		return artDesc;
	}

	public void setArtDesc(String artDesc) {
		this.artDesc = artDesc;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getQtySubstitution() {
		return qtySubstitution;
	}

	public void setQtySubstitution(String qtySubstitution) {
		this.qtySubstitution = qtySubstitution;
	}

	public String getDeliveryDate() {
		if (this.deliveryDate != null && !this.deliveryDate.equals("")) {
			String result = PortalUtil.convertToStandard(deliveryDate);
			if (result != null && result != "")
				return result;
		}
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getRosterDate() {
		if (this.rosterDate != null && !this.rosterDate.equals("")) {
			String result = PortalUtil.convertToStandard(rosterDate);
			if (result != null && result != "")
				return result;
		}
		return rosterDate;
	}

	public void setRosterDate(String rosterDate) {
		this.rosterDate = rosterDate;
	}

	public String getWarehouseName() {
		return warehouseName;
	}

	public void setWarehouseName(String warehouseName) {
		this.warehouseName = warehouseName;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getStoreNo() {
		return storeNo;
	}

	public void setStoreNo(String storeNo) {
		this.storeNo = storeNo;
	}

	public String getQtyUnavailable() {
		return qtyUnavailable;
	}

	public void setQtyUnavailable(String qtyUnavailable) {
		this.qtyUnavailable = qtyUnavailable;
	}

	public String getGpPercent() {
		return gpPercent;
	}

	public void setGpPercent(String gpPercent) {
		this.gpPercent = gpPercent;
	}

	public String getWarehouseNo() {
		return warehouseNo;
	}

	public void setWarehouseNo(String warehouseNo) {
		this.warehouseNo = warehouseNo;
	}

	public String getStoreOrder() {
		return storeOrder;
	}

	public void setStoreOrder(String storeOrder) {
		this.storeOrder = storeOrder;
	}

	public String getLoadlistNo() {
		return loadlistNo;
	}

	public void setLoadlistNo(String loadlistNo) {
		this.loadlistNo = loadlistNo;
	}

	public String getQtyAllocation() {
		return qtyAllocation;
	}

	public void setQtyAllocation(String qtyAllocation) {
		this.qtyAllocation = qtyAllocation;
	}

	public String getUnit() {
		return unit;
	}

	public void setUnit(String unit) {
		this.unit = unit;
	}

	public String getSellPrice() {
		return sellPrice;
	}

	public void setSellPrice(String sellPrice) {
		this.sellPrice = sellPrice;
	}

	public String getArticle() {

		if (article != null) {
			// //System.out.println("**** BEAN "+article.replaceFirst("^0+(?!$)",
			// ""));
			// article.replaceFirst("^0+(?!$)", "");
			int number = Integer.parseInt(article) / 1;
			this.article = "" + number;
		}
		return this.article;
	}

	public void setArticle(String article) {

		if (article != null && !article.equals("")) {
			int number = Integer.parseInt(article) / 1;
			this.article = "" + number;
		}
		this.article = article;
	}

	public String getGstRate() {
		return gstRate;
	}

	public void setGstRate(String gstRate) {
		this.gstRate = gstRate;
	}

	public String getIssueCost() {
		return issueCost;
	}

	public void setIssueCost(String issueCost) {
		this.issueCost = issueCost;
	}

	public String getTot_sp_exc_gst() {
		return tot_sp_exc_gst;
	}

	public void setTot_sp_exc_gst(String tot_sp_exc_gst) {
		this.tot_sp_exc_gst = tot_sp_exc_gst;
	}

	public String getTot_gross_profit() {
		return tot_gross_profit;
	}

	public void setTot_gross_profit(String tot_gross_profit) {
		this.tot_gross_profit = tot_gross_profit;
	}

	public String getTot_sp_inc_gst() {
		return tot_sp_inc_gst;
	}

	public void setTot_sp_inc_gst(String tot_sp_inc_gst) {
		this.tot_sp_inc_gst = tot_sp_inc_gst;
	}

	public String getTot_cost() {
		return tot_cost;
	}

	public void setTot_cost(String tot_cost) {
		this.tot_cost = tot_cost;
	}

	/**
	 * @return the price_chng_flag
	 */
	public String getPrice_chng_flag() {
		return price_chng_flag;
	}

	/**
	 * @param price_chng_flag the price_chng_flag to set
	 */
	public void setPrice_chng_flag(String price_chng_flag) {
		this.price_chng_flag = price_chng_flag;
	}

	
}
