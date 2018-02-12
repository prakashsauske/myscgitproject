package au.com.woolworths.portal.model;

import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromoArticle {

	@JsonProperty("instore_promo_type")
	private String instore_promo_type;

	@JsonProperty("update_ind")
	private String update_ind;

	@JsonProperty("art_mas_uom")
	private String art_mas_uom;

	@JsonProperty("pi_uom")
	private String pi_uom;

	@JsonProperty("var_wgt")
	private String var_wgt;

	@JsonProperty("orginal_demand")
	private String orginal_demand;

	@JsonProperty("orginal_display")
	private String orginal_display;

	@JsonProperty("newBuildDate")
	private String newBuildDate;

	@JsonProperty("psaCreateUserId")
	private String psaCreateUserId;

	@JsonProperty("promoStartAndEndDay")
	private String promoStartAndEndDay;

	@JsonProperty("source_of_supp_ind")
	private String source_of_supp_ind;

	@JsonProperty("order_uom")
	private String order_uom;

	@JsonProperty("orginal_build")
	private String orginal_build;

	@JsonProperty("media_desc")
	private String media_desc;

	@JsonProperty("prom_disp_start_day")
	private String prom_disp_start_day;

	@JsonProperty("prom_disp_end_day")
	private String prom_disp_end_day;

	@JsonProperty("in_prom_type")
	private String in_prom_type;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("siteDesc")
	private String siteDesc;

	@JsonProperty("salesFlag")
	private String salesFlag;

	@JsonProperty("offerFlag")
	private String offerFlag;

	private String allocationFlag;

	@JsonProperty("demandMaxLimit")
	private String demandMaxLimit;

	@JsonProperty("articleDesc")
	private String articleDesc;

	@JsonProperty("promOfferNo")
	private String promOfferNo;

	@JsonProperty("site")
	private String site;

	@JsonProperty("salesOrg")
	private String salesOrg;

	@JsonProperty("promStartDate")
	private String promStartDate;

	@JsonProperty("promEndDate")
	private String promEndDate;

	@JsonProperty("promoArticleInfo")
	private PromoArticleInfo promoArticleInfo;

	@JsonProperty("promoPrice")
	private String promoPrice;

	@JsonProperty("standardPrice")
	private String standardPrice;

	@JsonProperty("promoSavings")
	private String promoSavings;

	@JsonProperty("promoDisplayType")
	private PromoDisplayType promoDisplayType;

	@JsonProperty("promoMedia")
	private PromoMedia promoMedia;

	@JsonProperty("baseForecast")
	private String baseForecast;

	@JsonProperty("promoForecast")
	private String promoForecast;

	@JsonProperty("oldBuildQty")
	private String oldBuildQty;

	@JsonProperty("newBuildQty")
	private String newBuildQty;

	@JsonProperty("buildQtyUpdateFlag")
	private String buildQtyUpdateFlag = "N";

	@JsonProperty("buildQtyUpdateStatusFlag")
	private String buildQtyUpdateStatusFlag;

	@JsonProperty("buildDate")
	private String buildDate;

	@JsonProperty("oldDemandQty")
	private String oldDemandQty;

	@JsonProperty("newDemandQty")
	private String newDemandQty;

	@JsonProperty("demandQtyUpdateFlag")
	private String demandQtyUpdateFlag = "N";;

	@JsonProperty("demandQtyUpdateStatusFlag")
	private String demandQtyUpdateStatusFlag;

	@JsonProperty("displayFromDate")
	private String displayFromDate;

	@JsonProperty("displayToDate")
	private String displayToDate;

	@JsonProperty("maxOMSplit")
	private String maxOMSplit;

	@JsonProperty("produceProm")
	private String produceProm;

	@JsonProperty("weekToDateSales")
	private String weekToDateSales;

	@JsonProperty("weekToDateSalesEstimate")
	private String weekToDateSalesEstimate;

	@JsonProperty("promoExtraDetail")
	private PromoExtraDetail promoExtraDetail;

	@JsonProperty("promoSalesList")
	private Map<String, List<PromoSales>> promoSalesListMap;

	@JsonProperty("promoSalesHistList")
	private List<PromoSales> promoSalesHistList;

	@JsonProperty("promoOfferList")
	private List<PromoOffer> promoOfferList;

	@JsonProperty("promoAllocation")
	private List<PromoAllocation> promoAllocation;

	@JsonProperty("suppNo")
	private String suppNo;

	@JsonProperty("article")
	private String article;

	@JsonProperty("displayType")
	private String displayType;

	@JsonProperty("mediaType")
	private String mediaType;

	@JsonProperty("oldDisplayQty")
	private String oldDisplayQty;

	@JsonProperty("newDisplayQty")
	private String newDisplayQty;

	@JsonProperty("displayQtyUpdateFlag")
	private String displayQtyUpdateFlag = "N";;

	@JsonProperty("displayQtyUpdateStatusFlag")
	private String displayQtyUpdateStatusFlag;

	@JsonProperty("oldDeliveryDate")
	private String oldDeliveryDate;

	@JsonProperty("newDeliveryDate")
	private String newDeliveryDate;

	@JsonProperty("deliveryDateUpdateFlag")
	private String deliveryDateUpdateFlag = "N";;

	@JsonProperty("deliveryDateUpdateStatusFlag")
	private String deliveryDateUpdateStatusFlag;

	@JsonProperty("piOmVal")
	private String piOmVal;

	@JsonProperty("distributionUom")
	private String distributionUom;

	@JsonProperty("psaDisplayStartDate")
	private String psaDisplayStartDate;

	@JsonProperty("psaDisplayEndDate")
	private String psaDisplayEndDate;

	@JsonProperty("supplierType")
	private String supplierType;

	@JsonProperty("supplierName")
	private String supplierName;

	@JsonProperty("psdDisplayStartDate")
	private String psdDisplayStartDate;

	@JsonProperty("psdDisplayEndDate")
	private String psdDisplayEndDate;

	@JsonProperty("buildOrderDate")
	private String buildOrderDate;

	@JsonProperty("buildLockDownFlag")
	private String buildLockDownFlag;

	@JsonProperty("displayLockDownFlag")
	private String displayLockDownFlag;

	@JsonProperty("demandLockDownFlag")
	private String demandLockDownFlag;

	@JsonProperty("promoStartDate")
	private String promoStartDate;

	@JsonProperty("promoEndDate")
	private String promoEndDate;

	@JsonProperty("displayNo")
	private String displayNo;

	@JsonProperty("displayAlpha")
	private String displayAlpha;

	@JsonProperty("articleUom")
	private String articleUom;

	@JsonProperty("updateArticleFlag")
	private String updateArticleFlag = "N";

	@JsonProperty("psfStartDate")
	private String psfStartDate;

	@JsonProperty("psdDisplayType")
	private String psdDisplayType;

	@JsonProperty("psdDisplayNo")
	private String psdDisplayNo;

	@JsonProperty("psdDisplayAlpha")
	private String psdDisplayAlpha;

	@JsonProperty("psdCreateUserId")
	private String psdCreateUserId;

	@JsonProperty("psdCreateDateTm")
	private String psdCreateDateTm;

	@JsonProperty("psdUpdateUserId")
	private String psdUpdateUserId;

	@JsonProperty("psdUpdateDateTm")
	private String psdUpdateDateTm;

	@JsonProperty("om")
	private String om;

	@JsonProperty("totalNoOfWeeks")
	private String totalNoOfWeeks;

	@JsonProperty("promoWeek")
	private String promoWeek;

	@JsonProperty("weekEndDatePromStart")
	private String weekEndDatePromStart;

	@JsonProperty("weekStartDatePromStart")
	private String weekStartDatePromStart;

	@JsonProperty("weekEndDatePromEnd")
	private String weekEndDatePromEnd;

	@JsonProperty("weekStartDatePromEnd")
	private String weekStartDatePromEnd;

	@JsonProperty("promoType")
	private String promoType;

	@JsonProperty("userId")
	private String userId;

	@JsonProperty("recordCount")
	private int recordCount;

	@JsonProperty("pageNo")
	private String pageNo;

	@JsonProperty("dispStartAndEndDay")
	private String dispStartAndEndDay;

	@JsonProperty("packBrkArticleNo")
	private String packBrkArticleNo;

	@JsonProperty("autoFrctFlag")
	private String autoFrctFlag;

	@JsonProperty("lockFlag")
	private String lockFlag;

	@JsonProperty("weekSalesQty")
	private String weekSalesQty;

	@JsonProperty("EstWeekSalesQty")
	private String EstWeekSalesQty;

	@JsonProperty("residual")
	private String residual;

	@JsonProperty("packBrkArticleDesc")
	private String packBrkArticleDesc;

	@JsonProperty("bucketId")
	private String bucketId;

	@JsonProperty("frctId")
	private String frctId;
	
	@JsonProperty("omType")
	private String omType;
	
	@JsonProperty("replenishmentDate")
	private String replenishmentDate;
	
	@JsonProperty("reportDemandQty")
	private String reportDemandQty;
	
	@JsonProperty("reportDisplayQty")
	private String reportDisplayQty;
	
	@JsonProperty("reportBuildQty")
	private String reportBuildQty;
	
	@JsonProperty("reportFcstQty")
	private String reportFcstQty;
	
	@JsonProperty("reportDisplayType")
	private String reportDisplayType;
	
	@JsonProperty("days")
	private String days;
	

	public void updateDetail(String newBuildQty, String newDemandQty,
			String newDisplayQty, String newDeliveryDate,
			String updateArticleFlag,String replenishmentDate) {

		if(replenishmentDate!=null){
			this.replenishmentDate=replenishmentDate;
		}else{
			replenishmentDate="";
		}
		if (!newBuildQty.equalsIgnoreCase("null")) {
			// if (this.newBuildQty == null || this.newBuildQty.equals(""))
			this.newBuildQty = newBuildQty;
			this.buildQtyUpdateFlag = "Y";
		} else {
			if (this.newBuildQty == null || this.newBuildQty.equals(""))
				this.buildQtyUpdateFlag = "N";
		}

		if (!newDemandQty.equalsIgnoreCase("null")) {
			if (this.newDemandQty == null || this.newDemandQty.equals(""))
				this.newDemandQty = newDemandQty;
			this.demandQtyUpdateFlag = "Y";
		} else {
			if (this.newDemandQty == null || this.newDemandQty.equals(""))
				this.demandQtyUpdateFlag = "N";
		}

		if (!newDisplayQty.equalsIgnoreCase("null")) {
			// if (this.newDisplayQty == null || this.newDisplayQty.equals(""))
			this.newDisplayQty = newDisplayQty;
			this.displayQtyUpdateFlag = "Y";
		} else {
			if (this.newDisplayQty == null || this.newDisplayQty.equals(""))
				this.displayQtyUpdateFlag = "N";
		}

		if (!newDeliveryDate.equalsIgnoreCase("null")) {
			// if (this.newDeliveryDate == null ||
			// this.newDeliveryDate.equals(""))
			this.newDeliveryDate = newDeliveryDate;
			this.deliveryDateUpdateFlag = "Y";
		} else {
			if (this.newDeliveryDate == null || this.newDeliveryDate.equals(""))
				this.deliveryDateUpdateFlag = "N";
		}

		this.updateArticleFlag = updateArticleFlag;
	}

	public PromoArticle() {
	}

	public PromoArticleInfo getPromoArticleInfo() {
		return promoArticleInfo;
	}

	public void setPromoArticleInfo(PromoArticleInfo promoArticleInfo) {
		this.promoArticleInfo = promoArticleInfo;
	}

	public String getPromoPrice() {
		return promoPrice;
	}

	public void setPromoPrice(String promoPrice) {
		this.promoPrice = promoPrice;
	}

	public String getStandardPrice() {
		return standardPrice;
	}

	public void setStandardPrice(String standardPrice) {
		this.standardPrice = standardPrice;
	}

	public String getPromoSavings() {
		return promoSavings;
	}

	public void setPromoSavings(String promoSavings) {
		this.promoSavings = promoSavings;
	}

	public PromoDisplayType getPromoDisplayType() {
		return promoDisplayType;
	}

	public void setPromoDisplayType(PromoDisplayType promoDisplayType) {
		this.promoDisplayType = promoDisplayType;
	}

	public PromoMedia getPromoMedia() {
		return promoMedia;
	}

	public void setPromoMedia(PromoMedia promoMedia) {
		this.promoMedia = promoMedia;
	}

	public String getBaseForecast() {
		return baseForecast;
	}

	public void setBaseForecast(String baseForecast) {
		this.baseForecast = baseForecast;
	}

	public String getPromoForecast() {
		return promoForecast;
	}

	public void setPromoForecast(String promoForecast) {
		this.promoForecast = promoForecast;
	}

	public String getBuildDate() {
		return buildDate;
	}

	public void setBuildDate(String buildDate) {
		this.buildDate = buildDate;
	}

	public String getDisplayFromDate() {
		return displayFromDate;
	}

	public void setDisplayFromDate(String displayFromDate) {
		this.displayFromDate = displayFromDate;
	}

	public String getDisplayToDate() {
		return displayToDate;
	}

	public void setDisplayToDate(String displayToDate) {
		this.displayToDate = displayToDate;
	}

	public String getMaxOMSplit() {
		return maxOMSplit;
	}

	public void setMaxOMSplit(String maxOMSplit) {
		this.maxOMSplit = maxOMSplit;
	}

	public String getProduceProm() {
		return produceProm;
	}

	public void setProduceProm(String produceProm) {
		this.produceProm = produceProm;
	}

	public String getWeekToDateSales() {
		return weekToDateSales;
	}

	public void setWeekToDateSales(String weekToDateSales) {
		this.weekToDateSales = weekToDateSales;
	}

	public String getWeekToDateSalesEstimate() {
		return weekToDateSalesEstimate;
	}

	public void setWeekToDateSalesEstimate(String weekToDateSalesEstimate) {
		this.weekToDateSalesEstimate = weekToDateSalesEstimate;
	}

	public PromoExtraDetail getPromoExtraDetail() {
		return promoExtraDetail;
	}

	public void setPromoExtraDetail(PromoExtraDetail promoExtraDetail) {
		this.promoExtraDetail = promoExtraDetail;
	}

	public Map<String, List<PromoSales>> getPromoSalesListMap() {
		return promoSalesListMap;
	}

	public void setPromoSalesListMap(
			Map<String, List<PromoSales>> promoSalesListMap) {
		this.promoSalesListMap = promoSalesListMap;
	}

	public List<PromoOffer> getPromoOfferList() {
		return promoOfferList;
	}

	public void setPromoOfferList(List<PromoOffer> promoOfferList) {
		this.promoOfferList = promoOfferList;
	}

	public List<PromoAllocation> getPromoAllocation() {
		return promoAllocation;
	}

	public void setPromoAllocation(List<PromoAllocation> promoAllocation) {
		this.promoAllocation = promoAllocation;
	}

	public String getPromOfferNo() {
		return promOfferNo;
	}

	public void setPromOfferNo(String promOfferNo) {
		this.promOfferNo = promOfferNo;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getPromStartDate() {
		return promStartDate;
	}

	public void setPromStartDate(String promStartDate) {
		this.promStartDate = promStartDate;
	}

	public String getPromEndDate() {
		return promEndDate;
	}

	public void setPromEndDate(String promEndDate) {
		this.promEndDate = promEndDate;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getSuppNo() {
		return suppNo;
	}

	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getOldDeliveryDate() {
		return oldDeliveryDate;
	}

	public void setOldDeliveryDate(String oldDeliveryDate) {
		this.oldDeliveryDate = oldDeliveryDate;
	}

	public String getNewDeliveryDate() {
		return newDeliveryDate;
	}

	public void setNewDeliveryDate(String newDeliveryDate) {
		this.newDeliveryDate = newDeliveryDate;
	}

	public String getPiOmVal() {
		return piOmVal;
	}

	public void setPiOmVal(String piOmVal) {
		this.piOmVal = piOmVal;
	}

	public String getDistributionUom() {
		return distributionUom;
	}

	public void setDistributionUom(String distributionUom) {
		this.distributionUom = distributionUom;
	}

	public String getPsaDisplayStartDate() {
		return psaDisplayStartDate;
	}

	public void setPsaDisplayStartDate(String psaDisplayStartDate) {
		this.psaDisplayStartDate = psaDisplayStartDate;
	}

	public String getPsaDisplayEndDate() {
		return psaDisplayEndDate;
	}

	public void setPsaDisplayEndDate(String psaDisplayEndDate) {
		this.psaDisplayEndDate = psaDisplayEndDate;
	}

	public String getSupplierType() {
		return supplierType;
	}

	public void setSupplierType(String supplierType) {
		this.supplierType = supplierType;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getPsdDisplayStartDate() {
		return psdDisplayStartDate;
	}

	public void setPsdDisplayStartDate(String psdDisplayStartDate) {
		this.psdDisplayStartDate = psdDisplayStartDate;
	}

	public String getPsdDisplayEndDate() {
		return psdDisplayEndDate;
	}

	public void setPsdDisplayEndDate(String psdDisplayEndDate) {
		this.psdDisplayEndDate = psdDisplayEndDate;
	}

	public String getDeliveryDateUpdateFlag() {
		return deliveryDateUpdateFlag;
	}

	public void setDeliveryDateUpdateFlag(String deliveryDateUpdateFlag) {
		this.deliveryDateUpdateFlag = deliveryDateUpdateFlag;
	}

	public String getDeliveryDateUpdateStatusFlag() {
		return deliveryDateUpdateStatusFlag;
	}

	public void setDeliveryDateUpdateStatusFlag(
			String deliveryDateUpdateStatusFlag) {
		this.deliveryDateUpdateStatusFlag = deliveryDateUpdateStatusFlag;
	}

	public String getBuildOrderDate() {
		return buildOrderDate;
	}

	public void setBuildOrderDate(String buildOrderDate) {
		this.buildOrderDate = buildOrderDate;
	}

	public String getBuildLockDownFlag() {
		return buildLockDownFlag;
	}

	public void setBuildLockDownFlag(String buildLockDownFlag) {
		this.buildLockDownFlag = buildLockDownFlag;
	}

	public String getDisplayLockDownFlag() {
		return displayLockDownFlag;
	}

	public void setDisplayLockDownFlag(String displayLockDownFlag) {
		this.displayLockDownFlag = displayLockDownFlag;
	}

	public String getDemandLockDownFlag() {
		return demandLockDownFlag;
	}

	public void setDemandLockDownFlag(String demandLockDownFlag) {
		this.demandLockDownFlag = demandLockDownFlag;
	}

	public String getOldBuildQty() {
		return oldBuildQty;
	}

	public void setOldBuildQty(String oldBuildQty) {
		this.oldBuildQty = oldBuildQty;
	}

	public String getNewBuildQty() {
		return newBuildQty;
	}

	public void setNewBuildQty(String newBuildQty) {
		this.newBuildQty = newBuildQty;
	}

	public String getBuildQtyUpdateFlag() {
		return buildQtyUpdateFlag;
	}

	public void setBuildQtyUpdateFlag(String buildQtyUpdateFlag) {
		this.buildQtyUpdateFlag = buildQtyUpdateFlag;
	}

	public String getBuildQtyUpdateStatusFlag() {
		return buildQtyUpdateStatusFlag;
	}

	public void setBuildQtyUpdateStatusFlag(String buildQtyUpdateStatusFlag) {
		this.buildQtyUpdateStatusFlag = buildQtyUpdateStatusFlag;
	}

	public String getOldDemandQty() {
		return oldDemandQty;
	}

	public void setOldDemandQty(String oldDemandQty) {
		this.oldDemandQty = oldDemandQty;
	}

	public String getNewDemandQty() {
		return newDemandQty;
	}

	public void setNewDemandQty(String newDemandQty) {
		this.newDemandQty = newDemandQty;
	}

	public String getDemandQtyUpdateFlag() {
		return demandQtyUpdateFlag;
	}

	public void setDemandQtyUpdateFlag(String demandQtyUpdateFlag) {
		this.demandQtyUpdateFlag = demandQtyUpdateFlag;
	}

	public String getDemandQtyUpdateStatusFlag() {
		return demandQtyUpdateStatusFlag;
	}

	public void setDemandQtyUpdateStatusFlag(String demandQtyUpdateStatusFlag) {
		this.demandQtyUpdateStatusFlag = demandQtyUpdateStatusFlag;
	}

	public String getOldDisplayQty() {
		return oldDisplayQty;
	}

	public void setOldDisplayQty(String oldDisplayQty) {
		this.oldDisplayQty = oldDisplayQty;
	}

	public String getNewDisplayQty() {
		return newDisplayQty;
	}

	public void setNewDisplayQty(String newDisplayQty) {
		this.newDisplayQty = newDisplayQty;
	}

	public String getDisplayQtyUpdateFlag() {
		return displayQtyUpdateFlag;
	}

	public void setDisplayQtyUpdateFlag(String displayQtyUpdateFlag) {
		this.displayQtyUpdateFlag = displayQtyUpdateFlag;
	}

	public String getDisplayQtyUpdateStatusFlag() {
		return displayQtyUpdateStatusFlag;
	}

	public void setDisplayQtyUpdateStatusFlag(String displayQtyUpdateStatusFlag) {
		this.displayQtyUpdateStatusFlag = displayQtyUpdateStatusFlag;
	}

	public String getPromoStartDate() {
		return promoStartDate;
	}

	public void setPromoStartDate(String promoStartDate) {
		this.promoStartDate = promoStartDate;
	}

	public String getPromoEndDate() {
		return promoEndDate;
	}

	public void setPromoEndDate(String promoEndDate) {
		this.promoEndDate = promoEndDate;
	}

	public String getDisplayNo() {
		return displayNo;
	}

	public void setDisplayNo(String displayNo) {
		this.displayNo = displayNo;
	}

	public String getDisplayAlpha() {
		return displayAlpha;
	}

	public void setDisplayAlpha(String displayAlpha) {
		this.displayAlpha = displayAlpha;
	}

	public String getArticleUom() {
		return articleUom;
	}

	public void setArticleUom(String articleUom) {
		this.articleUom = articleUom;
	}

	public String getUpdateArticleFlag() {
		return updateArticleFlag;
	}

	public void setUpdateArticleFlag(String updateArticleFlag) {
		this.updateArticleFlag = updateArticleFlag;
	}

	public String getPsfStartDate() {
		return psfStartDate;
	}

	public void setPsfStartDate(String psfStartDate) {
		this.psfStartDate = psfStartDate;
	}

	public String getPsdDisplayType() {
		return psdDisplayType;
	}

	public void setPsdDisplayType(String psdDisplayType) {
		this.psdDisplayType = psdDisplayType;
	}

	public String getPsdDisplayNo() {
		return psdDisplayNo;
	}

	public void setPsdDisplayNo(String psdDisplayNo) {
		this.psdDisplayNo = psdDisplayNo;
	}

	public String getPsdDisplayAlpha() {
		return psdDisplayAlpha;
	}

	public void setPsdDisplayAlpha(String psdDisplayAlpha) {
		this.psdDisplayAlpha = psdDisplayAlpha;
	}

	public String getPsdCreateUserId() {
		return psdCreateUserId;
	}

	public void setPsdCreateUserId(String psdCreateUserId) {
		this.psdCreateUserId = psdCreateUserId;
	}

	public String getPsdCreateDateTm() {
		return psdCreateDateTm;
	}

	public void setPsdCreateDateTm(String psdCreateDateTm) {
		this.psdCreateDateTm = psdCreateDateTm;
	}

	public String getPsdUpdateUserId() {
		return psdUpdateUserId;
	}

	public void setPsdUpdateUserId(String psdUpdateUserId) {
		this.psdUpdateUserId = psdUpdateUserId;
	}

	public String getPsdUpdateDateTm() {
		return psdUpdateDateTm;
	}

	public void setPsdUpdateDateTm(String psdUpdateDateTm) {
		this.psdUpdateDateTm = psdUpdateDateTm;
	}

	public void resetDetail() {
		this.buildQtyUpdateFlag = "N";
		this.displayQtyUpdateFlag = "N";
		this.demandQtyUpdateFlag = "N";
		this.deliveryDateUpdateFlag = "N";
		this.updateArticleFlag = "N";
		this.buildQtyUpdateStatusFlag = "N";
		this.demandQtyUpdateStatusFlag = "N";
		this.displayQtyUpdateStatusFlag = "N";
		this.deliveryDateUpdateStatusFlag = "N";
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getDemandMaxLimit() {
		return demandMaxLimit;
	}

	public void setDemandMaxLimit(String demandMaxLimit) {
		this.demandMaxLimit = demandMaxLimit;
	}

	public String getOm() {
		return om;
	}

	public void setOm(String om) {
		this.om = om;
	}

	public String getTotalNoOfWeeks() {
		return totalNoOfWeeks;
	}

	public void setTotalNoOfWeeks(String totalNoOfWeeks) {
		this.totalNoOfWeeks = totalNoOfWeeks;
	}

	public String getPromoWeek() {
		return promoWeek;
	}

	public void setPromoWeek(String promoWeek) {
		this.promoWeek = promoWeek;
	}

	public String getWeekEndDatePromStart() {
		return weekEndDatePromStart;
	}

	public void setWeekEndDatePromStart(String weekEndDatePromStart) {
		this.weekEndDatePromStart = weekEndDatePromStart;
	}

	public String getWeekStartDatePromStart() {
		return weekStartDatePromStart;
	}

	public void setWeekStartDatePromStart(String weekStartDatePromStart) {
		this.weekStartDatePromStart = weekStartDatePromStart;
	}

	public String getWeekEndDatePromEnd() {
		return weekEndDatePromEnd;
	}

	public void setWeekEndDatePromEnd(String weekEndDatePromEnd) {
		this.weekEndDatePromEnd = weekEndDatePromEnd;
	}

	public String getWeekStartDatePromEnd() {
		return weekStartDatePromEnd;
	}

	public void setWeekStartDatePromEnd(String weekStartDatePromEnd) {
		this.weekStartDatePromEnd = weekStartDatePromEnd;
	}

	public String getPromoType() {
		return promoType;
	}

	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getDispStartAndEndDay() {
		return dispStartAndEndDay;
	}

	public void setDispStartAndEndDay(String dispStartAndEndDay) {
		this.dispStartAndEndDay = dispStartAndEndDay;
	}

	public String getPackBrkArticleNo() {
		return packBrkArticleNo;
	}

	public void setPackBrkArticleNo(String packBrkArticleNo) {
		this.packBrkArticleNo = packBrkArticleNo;
	}

	public String getAutoFrctFlag() {
		return autoFrctFlag;
	}

	public void setAutoFrctFlag(String autoFrctFlag) {
		this.autoFrctFlag = autoFrctFlag;
	}

	public String getLockFlag() {
		return lockFlag;
	}

	public void setLockFlag(String lockFlag) {
		this.lockFlag = lockFlag;
	}

	public String getWeekSalesQty() {
		return weekSalesQty;
	}

	public void setWeekSalesQty(String weekSalesQty) {
		this.weekSalesQty = weekSalesQty;
	}

	public String getEstWeekSalesQty() {
		return EstWeekSalesQty;
	}

	public void setEstWeekSalesQty(String estWeekSalesQty) {
		EstWeekSalesQty = estWeekSalesQty;
	}

	public String getResidual() {
		return residual;
	}

	public void setResidual(String residual) {
		this.residual = residual;
	}

	public String getPackBrkArticleDesc() {
		return packBrkArticleDesc;
	}

	public void setPackBrkArticleDesc(String packBrkArticleDesc) {
		this.packBrkArticleDesc = packBrkArticleDesc;
	}

	public String getBucketId() {
		return bucketId;
	}

	public void setBucketId(String bucketId) {
		this.bucketId = bucketId;
	}

	public String getFrctId() {
		return frctId;
	}

	public void setFrctId(String frctId) {
		this.frctId = frctId;
	}

	/**
	 * @return the salesFlag
	 */
	public String getSalesFlag() {
		return salesFlag;
	}

	/**
	 * @param salesFlag
	 *            the salesFlag to set
	 */
	public void setSalesFlag(String salesFlag) {
		this.salesFlag = salesFlag;
	}

	/**
	 * @return the offerFlag
	 */
	public String getOfferFlag() {
		return offerFlag;
	}

	/**
	 * @param offerFlag
	 *            the offerFlag to set
	 */
	public void setOfferFlag(String offerFlag) {
		this.offerFlag = offerFlag;
	}

	/**
	 * @return the siteDesc
	 */
	public String getSiteDesc() {
		return siteDesc;
	}

	/**
	 * @param siteDesc
	 *            the siteDesc to set
	 */
	public void setSiteDesc(String siteDesc) {
		this.siteDesc = siteDesc;
	}

	/**
	 * @return the in_prom_type
	 */
	public String getIn_prom_type() {
		return in_prom_type;
	}

	/**
	 * @param in_prom_type
	 *            the in_prom_type to set
	 */
	public void setIn_prom_type(String in_prom_type) {
		this.in_prom_type = in_prom_type;
	}

	/**
	 * @return the allocationFlag
	 */
	public String getAllocationFlag() {
		return allocationFlag;
	}

	/**
	 * @param allocationFlag
	 *            the allocationFlag to set
	 */
	public void setAllocationFlag(String allocationFlag) {
		this.allocationFlag = allocationFlag;
	}

	/**
	 * @return the prom_disp_start_day
	 */
	public String getProm_disp_start_day() {
		return prom_disp_start_day;
	}

	/**
	 * @param prom_disp_start_day
	 *            the prom_disp_start_day to set
	 */
	public void setProm_disp_start_day(String prom_disp_start_day) {
		this.prom_disp_start_day = prom_disp_start_day;
	}

	/**
	 * @return the prom_disp_end_day
	 */
	public String getProm_disp_end_day() {
		return prom_disp_end_day;
	}

	/**
	 * @param prom_disp_end_day
	 *            the prom_disp_end_day to set
	 */
	public void setProm_disp_end_day(String prom_disp_end_day) {
		this.prom_disp_end_day = prom_disp_end_day;
	}

	/**
	 * @return the media_desc
	 */
	public String getMedia_desc() {
		return media_desc;
	}

	/**
	 * @param media_desc
	 *            the media_desc to set
	 */
	public void setMedia_desc(String media_desc) {
		this.media_desc = media_desc;
	}

	/**
	 * @return the promoSalesHistList
	 */
	public List<PromoSales> getPromoSalesHistList() {
		return promoSalesHistList;
	}

	/**
	 * @param promoSalesHistList
	 *            the promoSalesHistList to set
	 */
	public void setPromoSalesHistList(List<PromoSales> promoSalesHistList) {
		this.promoSalesHistList = promoSalesHistList;
	}

	/**
	 * @return the orginal_build
	 */
	public String getOrginal_build() {
		return orginal_build;
	}

	/**
	 * @param orginal_build
	 *            the orginal_build to set
	 */
	public void setOrginal_build(String orginal_build) {
		this.orginal_build = orginal_build;
	}

	/**
	 * @return the source_of_supp_ind
	 */
	public String getSource_of_supp_ind() {
		return source_of_supp_ind;
	}

	/**
	 * @param source_of_supp_ind
	 *            the source_of_supp_ind to set
	 */
	public void setSource_of_supp_ind(String source_of_supp_ind) {
		this.source_of_supp_ind = source_of_supp_ind;
	}

	/**
	 * @return the order_uom
	 */
	public String getOrder_uom() {
		return order_uom;
	}

	/**
	 * @param order_uom
	 *            the order_uom to set
	 */
	public void setOrder_uom(String order_uom) {
		this.order_uom = order_uom;
	}

	/**
	 * @return the promoStartAndEndDay
	 */
	public String getPromoStartAndEndDay() {
		return promoStartAndEndDay;
	}

	/**
	 * @param promoStartAndEndDay
	 *            the promoStartAndEndDay to set
	 */
	public void setPromoStartAndEndDay(String promoStartAndEndDay) {
		this.promoStartAndEndDay = promoStartAndEndDay;
	}

	/**
	 * @return the psaCreateUserId
	 */
	public String getPsaCreateUserId() {
		return psaCreateUserId;
	}

	/**
	 * @param psaCreateUserId
	 *            the psaCreateUserId to set
	 */
	public void setPsaCreateUserId(String psaCreateUserId) {
		this.psaCreateUserId = psaCreateUserId;
	}

	/**
	 * @return the newBuildDate
	 */
	public String getNewBuildDate() {
		return newBuildDate;
	}

	/**
	 * @param newBuildDate
	 *            the newBuildDate to set
	 */
	public void setNewBuildDate(String newBuildDate) {
		this.newBuildDate = newBuildDate;
	}

	public String getOrginal_demand() {
		return orginal_demand;
	}

	public void setOrginal_demand(String orginal_demand) {
		this.orginal_demand = orginal_demand;
	}

	public String getOrginal_display() {
		return orginal_display;
	}

	public void setOrginal_display(String orginal_display) {
		this.orginal_display = orginal_display;
	}

	public String getVar_wgt() {
		return var_wgt;
	}

	public void setVar_wgt(String var_wgt) {
		this.var_wgt = var_wgt;
	}

	public String getArt_mas_uom() {
		return art_mas_uom;
	}

	public void setArt_mas_uom(String art_mas_uom) {
		this.art_mas_uom = art_mas_uom;
	}

	public String getPi_uom() {
		return pi_uom;
	}

	public void setPi_uom(String pi_uom) {
		this.pi_uom = pi_uom;
	}

	public String getUpdate_ind() {
		return update_ind;
	}

	public void setUpdate_ind(String update_ind) {
		this.update_ind = update_ind;
	}

	public String getInstore_promo_type() {
		return instore_promo_type;
	}

	public void setInstore_promo_type(String instore_promo_type) {
		this.instore_promo_type = instore_promo_type;
	}

	public String getOmType() {
		return omType;
	}

	public void setOmType(String omType) {
		this.omType = omType;
	}

	public String getReplenishmentDate() {
		return replenishmentDate;
	}

	public void setReplenishmentDate(String replenishmentDate) {
		this.replenishmentDate = replenishmentDate;
	}

	

	public String getReportDisplayType() {
		return reportDisplayType;
	}

	public void setReportDisplayType(String reportDisplayType) {
		this.reportDisplayType = reportDisplayType;
	}

	public String getReportDemandQty() {
		return reportDemandQty;
	}

	public void setReportDemandQty(String reportDemandQty) {
		this.reportDemandQty = reportDemandQty;
	}

	public String getReportDisplayQty() {
		return reportDisplayQty;
	}

	public void setReportDisplayQty(String reportDisplayQty) {
		this.reportDisplayQty = reportDisplayQty;
	}

	public String getReportBuildQty() {
		return reportBuildQty;
	}

	public void setReportBuildQty(String reportBuildQty) {
		this.reportBuildQty = reportBuildQty;
	}

	public String getReportFcstQty() {
		return reportFcstQty;
	}

	public void setReportFcstQty(String reportFcstQty) {
		this.reportFcstQty = reportFcstQty;
	}

	public String getDays() {
		return days;
	}

	public void setDays(String days) {
		this.days = days;
	}

}
