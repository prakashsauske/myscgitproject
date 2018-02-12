package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NearbyStoreSearchInfo {
	@JsonProperty("site_no")
	private String siteNo;

	@JsonProperty("stock_in_transit")
	private String stockInTransit;

	@JsonProperty("stock_on_order")
	private String stockOnOrder;

	@JsonProperty("std_sell_price")
	private String stdSellPrice;

	@JsonProperty("distance")
	private String distance;

	@JsonProperty("dc_name")
	private String dcName;

	@JsonProperty("stock_on_hand")
	private String stockOnHand;

	@JsonProperty("s_org_name")
	private String sOrgName;

	@JsonProperty("s_org_no")
	private String sOrgNo;

	@JsonProperty("article")
	private String articleNo;

	@JsonProperty("site_name")
	private String siteName;

	@JsonProperty("dc_no")
	private String dcNo;

	@JsonProperty("promo_sell_price")
	private String promoSellPrice;

	@JsonProperty("ranged_flag")
	private String rangedFlag;

	@JsonProperty("def_mpl")
	private String defaultMpl;

	@JsonProperty("curr_mpl")
	private String currentMpl;

	@JsonProperty("msg")
	private String msg;

	private double proximity;
	
	
	
	//Newly added JSON Propery
	
	@JsonProperty("siteNo")
	private String siteNo_m;

	@JsonProperty("stockInTransit")
	private String stockInTransit_m;

	@JsonProperty("stockOnOrder")
	private String stockOnOrder_m;

	@JsonProperty("stdSellPrice")
	private String stdSellPrice_m;


	@JsonProperty("dcName")
	private String dcName_m;

	@JsonProperty("stockOnHand")
	private String stockOnHand_m;

	@JsonProperty("sOrgName")
	private String sOrgName_m;

	@JsonProperty("sOrgNo")
	private String sOrgNo_m;

	@JsonProperty("articleNo")
	private String articleNo_m;

	@JsonProperty("siteName")
	private String siteName_m;

	@JsonProperty("dcNo")
	private String dcNo_m;

	@JsonProperty("promoSellPrice")
	private String promoSellPrice_m;

	@JsonProperty("rangedFlag")
	private String rangedFlag_m;

	@JsonProperty("defaultMpl")
	private String defaultMpl_m;

	@JsonProperty("currentMpl")
	private String currentMpl_m;

	

	/**
	 * @param siteNo
	 * @param stockInTransit
	 * @param stockOnOrder
	 * @param stdSellPrice
	 * @param dcName
	 * @param stockOnHand
	 * @param sOrgName
	 * @param sOrgNo
	 * @param articleNo
	 * @param siteName
	 * @param dcNo
	 * @param promoSellPrice
	 * @param rangedFlag
	 * @param defaultMpl
	 * @param currentMpl
	 */
	@JsonCreator
	public NearbyStoreSearchInfo(@JsonProperty("site_no") String siteNo,@JsonProperty("stock_in_transit") String stockInTransit,
			@JsonProperty("stock_on_order") String stockOnOrder,@JsonProperty("std_sell_price") String stdSellPrice,@JsonProperty("dc_name") String dcName,
			@JsonProperty("stock_on_hand") String stockOnHand,@JsonProperty("s_org_name") String sOrgName,@JsonProperty("s_org_no") String sOrgNo,
			@JsonProperty("article") String articleNo,@JsonProperty("site_name") String siteName,@JsonProperty("dc_no") String dcNo,
			@JsonProperty("promo_sell_price") String promoSellPrice,@JsonProperty("ranged_flag") String rangedFlag,@JsonProperty("def_mpl") String defaultMpl,
			@JsonProperty("curr_mpl") String currentMpl) {
		
		this.siteNo = siteNo;
		this.stockInTransit = stockInTransit;
		this.stockOnOrder = stockOnOrder;
		this.stdSellPrice = stdSellPrice;
		this.dcName = dcName;
		this.stockOnHand = stockOnHand;
		this.sOrgName = sOrgName;
		this.sOrgNo = sOrgNo;
		this.articleNo = articleNo;
		this.siteName = siteName;
		this.dcNo = dcNo;
		this.promoSellPrice = promoSellPrice;
		this.rangedFlag = rangedFlag;
		this.defaultMpl = defaultMpl;
		this.currentMpl = currentMpl;
		
		
		this.siteNo_m = siteNo;
		this.stockInTransit_m = stockInTransit;
		this.stockOnOrder_m = stockOnOrder;
		this.stdSellPrice_m = stdSellPrice;
		this.dcName_m = dcName;
		this.stockOnHand_m = stockOnHand;
		this.sOrgName_m = sOrgName;
		this.sOrgNo_m = sOrgNo;
		this.articleNo_m = articleNo;
		this.siteName_m = siteName;
		this.dcNo_m = dcNo;
		this.promoSellPrice_m = promoSellPrice;
		this.rangedFlag_m = rangedFlag;
		this.defaultMpl_m = defaultMpl;
		this.currentMpl_m = currentMpl;
	}
	public double getProximity() {
		return proximity;
	}
	public void setProximity(double proximity) {
		this.proximity = proximity;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getStockInTransit() {
		return stockInTransit;
	}

	public void setStockInTransit(String stockInTransit) {
		this.stockInTransit = stockInTransit;
	}

	public String getStockOnOrder() {
		return stockOnOrder;
	}

	public void setStockOnOrder(String stockOnOrder) {
		this.stockOnOrder = stockOnOrder;
	}

	public String getStdSellPrice() {
		return stdSellPrice;
	}

	public void setStdSellPrice(String stdSellPrice) {
		this.stdSellPrice = stdSellPrice;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	public String getDcName() {
		return dcName;
	}

	public void setDcName(String dcName) {
		this.dcName = dcName;
	}

	public String getsOrgName() {
		return sOrgName;
	}

	public void setsOrgName(String sOrgName) {
		this.sOrgName = sOrgName;
	}

	public String getsOrgNo() {
		return sOrgNo;
	}

	public void setsOrgNo(String sOrgNo) {
		this.sOrgNo = sOrgNo;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getRangedFlag() {
		return rangedFlag;
	}

	public void setRangedFlag(String rangedFlag) {
		this.rangedFlag = rangedFlag;
	}

	public String getDefaultMpl() {
		return defaultMpl;
	}

	public void setDefaultMpl(String defaultMpl) {
		this.defaultMpl = defaultMpl;
	}

	public String getCurrentMpl() {
		return currentMpl;
	}

	public void setCurrentMpl(String currentMpl) {
		this.currentMpl = currentMpl;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getDcNo() {
		return dcNo;
	}

	public void setDcNo(String dcNo) {
		this.dcNo = dcNo;
	}

	public String getStockOnHand() {
		return stockOnHand;
	}

	public void setStockOnHand(String stockOnHand) {
		this.stockOnHand = stockOnHand;
	}

	public String getPromoSellPrice() {
		return promoSellPrice;
	}

	public void setPromoSellPrice(String promoSellPrice) {
		this.promoSellPrice = promoSellPrice;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}
}
