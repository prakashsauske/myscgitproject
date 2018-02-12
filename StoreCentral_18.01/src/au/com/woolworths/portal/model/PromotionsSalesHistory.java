package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromotionsSalesHistory {

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("subType")
	private String subType;

	@JsonProperty("media")
	private String media;

	@JsonProperty("avgQtySold")
	private String avgQtySold;

	@JsonProperty("promoPrice")
	private String promoPrice;

	@JsonProperty("savings")
	private String savings;

	@JsonProperty("storeInfo")
	private String storeInfo;

	@JsonProperty("promoNo")
	private String promoNo;

	@JsonProperty("articleNo")
	private String articleNo;

	@JsonProperty("uom")
	private String uom;

	@JsonProperty("fromDate")
	private String fromDate;

	@JsonProperty("toDate")
	private String toDate;

	@JsonProperty("weeklySaleQty")
	private String weeklySaleQty;

	@JsonProperty("promoDesc")
	private String promoDesc;

	@JsonProperty("storeFeedBack")
	private String storeFeedBack;

	@JsonProperty("promoTypeInd")
	private String promoTypeInd;

	@JsonProperty("displayType")
	private String displayType;

	@JsonProperty("displayNo")
	private String displayNo;

	@JsonProperty("displayAlpha")
	private String displayAlpha;

	@JsonProperty("mediaType")
	private String mediaType;

	public String getSubType() {
		return subType;
	}

	public void setSubType(String subType) {
		this.subType = subType;
	}

	public String getMedia() {
		return media;
	}

	public void setMedia(String media) {
		this.media = media;
	}

	public String getAvgQtySold() {
		return avgQtySold;
	}

	public void setAvgQtySold(String avgQtySold) {
		this.avgQtySold = avgQtySold;
	}

	public String getPromoPrice() {
		return promoPrice;
	}

	public void setPromoPrice(String promoPrice) {
		this.promoPrice = promoPrice;
	}

	public String getSavings() {
		return savings;
	}

	public void setSavings(String savings) {
		this.savings = savings;
	}

	public String getStoreInfo() {
		return storeInfo;
	}

	public void setStoreInfo(String storeInfo) {
		this.storeInfo = storeInfo;
	}

	public String getPromoNo() {
		return promoNo;
	}

	public void setPromoNo(String promoNo) {
		this.promoNo = promoNo;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getWeeklySaleQty() {
		return weeklySaleQty;
	}

	public void setWeeklySaleQty(String weeklySaleQty) {
		this.weeklySaleQty = weeklySaleQty;
	}

	public String getPromoDesc() {
		return promoDesc;
	}

	public void setPromoDesc(String promoDesc) {
		this.promoDesc = promoDesc;
	}

	public String getStoreFeedBack() {
		return storeFeedBack;
	}

	public void setStoreFeedBack(String storeFeedBack) {
		this.storeFeedBack = storeFeedBack;
	}

	public String getPromoTypeInd() {
		return promoTypeInd;
	}

	public void setPromoTypeInd(String promoTypeInd) {
		this.promoTypeInd = promoTypeInd;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
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

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	/*
	 * CREATED_USER CREATED_DATETM UPDATED_USER UPDATED_DATETM
	 */
}
