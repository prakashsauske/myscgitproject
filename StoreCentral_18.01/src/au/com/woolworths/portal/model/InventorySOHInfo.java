package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InventorySOHInfo {

	@JsonProperty("meins")
	private String baseUnitofMeasure;
	@JsonProperty("werks")
	private String siteNo;
	@JsonProperty("matnr")
	private String articleNumber;
	@JsonProperty("lgort")
	private String storageLocation;
	@JsonProperty("einme")
	private String totalStockofAllRestBatches;
	@JsonProperty("retme")
	private String blockedStockReturns;
	@JsonProperty("aggr_level")
	private String aggrLevel;
	@JsonProperty("gen_matnr")
	private String crossSiteConfigurableArticleGen;
	@JsonProperty("speme")
	private String blockedStock;
	@JsonProperty("labst")
	private String stockOnHand;
	@JsonProperty("umlme")
	private String stockinTransfer;
	@JsonProperty("insme")
	private String stockinQualityInspection;
	@JsonProperty("struct_matnr")
	private String crossSiteConfigurableArticleStruct;
	@JsonProperty("source_erp_pos")
	private String sourceErpPos;

	public String getSourceErpPos() {
		return sourceErpPos;
	}

	public void setSourceErpPos(String sourceErpPos) {
		this.sourceErpPos = sourceErpPos;
	}

	public String getCrossSiteConfigurableArticleStruct() {
		return crossSiteConfigurableArticleStruct;
	}

	public void setCrossSiteConfigurableArticleStruct(
			String crossSiteConfigurableArticleStruct) {
		this.crossSiteConfigurableArticleStruct = crossSiteConfigurableArticleStruct;
	}

	public String getStockinQualityInspection() {
		return stockinQualityInspection;
	}

	public void setStockinQualityInspection(String stockinQualityInspection) {
		this.stockinQualityInspection = stockinQualityInspection;
	}

	public String getStockinTransfer() {
		return stockinTransfer;
	}

	public void setStockinTransfer(String stockinTransfer) {
		this.stockinTransfer = stockinTransfer;
	}

	public String getStockOnHand() {
		return stockOnHand;
	}

	public void setStockOnHand(String stockOnHand) {
		this.stockOnHand = stockOnHand;
	}

	public String getCrossSiteConfigurableArticleGen() {
		return crossSiteConfigurableArticleGen;
	}

	public void setCrossSiteConfigurableArticleGen(
			String crossSiteConfigurableArticleGen) {
		this.crossSiteConfigurableArticleGen = crossSiteConfigurableArticleGen;
	}

	public String getBlockedStock() {
		return blockedStock;
	}

	public void setBlockedStock(String blockedStock) {
		this.blockedStock = blockedStock;
	}

	public String getAggrLevel() {
		return aggrLevel;
	}

	public void setAggrLevel(String aggrLevel) {
		this.aggrLevel = aggrLevel;
	}

	public String getBlockedStockReturns() {
		return blockedStockReturns;
	}

	public void setBlockedStockReturns(String blockedStockReturns) {
		this.blockedStockReturns = blockedStockReturns;
	}

	public String getTotalStockofAllRestBatches() {
		return totalStockofAllRestBatches;
	}

	public void setTotalStockofAllRestBatches(String totalStockofAllRestBatches) {
		this.totalStockofAllRestBatches = totalStockofAllRestBatches;
	}

	public String getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}

	public String getArticleNumber() {
		return articleNumber;
	}

	public void setArticleNumber(String articleNumber) {
		this.articleNumber = articleNumber;
	}

	public String getBaseUnitofMeasure() {
		return baseUnitofMeasure;
	}

	public void setBaseUnitofMeasure(String baseUnitofMeasure) {
		this.baseUnitofMeasure = baseUnitofMeasure;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}
}
