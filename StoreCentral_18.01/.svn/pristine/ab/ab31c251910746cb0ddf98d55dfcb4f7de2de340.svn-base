/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xgsaa
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class InstorePromoItems {
	
	@JsonProperty("IV_COMPETITOR_NO")
	private String competitorNo;
	
	@JsonProperty("IV_COMPETITOR_NAME")
	private String competitorName;

	/**
	 * @return the competitorNo
	 */
	public String getCompetitorNo() {
		return competitorNo;
	}

	/**
	 * @param competitorNo the competitorNo to set
	 */
	public void setCompetitorNo(String competitorNo) {
		this.competitorNo = competitorNo;
	}

	/**
	 */
	public String getCompetitorName() {
		return competitorName;
	}

	/**
	 * @param competitorName the competitorName to set
	 */
	public void setCompetitorName(String competitorName) {
		this.competitorName = competitorName;
	}

	@JsonProperty("IV_PROMO_TYPE")
	private String promoType;

	@JsonProperty("IV_SALE_FROM")
	private String promoStartDate;

	@JsonProperty("IV_SALE_TO")
	private String promoEndDate;

	@JsonProperty("IV_SALES_PRICE")
	private String standardPrice;

	@JsonProperty("IV_SALES_UNIT")
	private String articleUom;

	@JsonProperty("IV_ARTICLE")
	private String articleNo;

	@JsonProperty("IV_SALES_QTY")
	private String salesQty;

	@JsonProperty("IV_SALES_PRICE_UNIT")
	private String salesPriceUnit;

	@JsonProperty("IV_DISPLAY_TYPE")
	private String displayType;

	@JsonProperty("MSG")
	private String msg;
	
	@JsonProperty("PROMO_NO")
	private String promoOfferNo;
	
	@JsonProperty("STATUS_FLAG")
	private String statusFlag;
	
	public InstorePromoItems(){
		
	}
	
	public InstorePromoItems(String promoType, String promoStartDate,
			String promoEndDate, String standardPrice, String articleUom,
			String articleNo, String salesQty, String salesPriceUnit,
			String displayType, String msg) {
		super();
		this.promoType = promoType;
		this.promoStartDate = promoStartDate;
		this.promoEndDate = promoEndDate;
		this.standardPrice = standardPrice;
		this.articleUom = articleUom;
		this.articleNo = articleNo;
		this.salesQty = salesQty;
		this.salesPriceUnit = salesPriceUnit;
		this.displayType = displayType;
		this.msg = msg;
	}

	/**
	 * @return the promoType
	 */
	public String getPromoType() {
		return promoType;
	}

	/**
	 * @param promoType
	 *            the promoType to set
	 */
	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	/**
	 * @return the promoStartDate
	 */
	public String getPromoStartDate() {
		return promoStartDate;
	}

	/**
	 * @param promoStartDate
	 *            the promoStartDate to set
	 */
	public void setPromoStartDate(String promoStartDate) {
		this.promoStartDate = promoStartDate;
	}

	/**
	 * @return the promoEndDate
	 */
	public String getPromoEndDate() {
		return promoEndDate;
	}

	/**
	 * @param promoEndDate
	 *            the promoEndDate to set
	 */
	public void setPromoEndDate(String promoEndDate) {
		this.promoEndDate = promoEndDate;
	}

	/**
	 * @return the standardPrice
	 */
	public String getStandardPrice() {
		return standardPrice;
	}

	/**
	 * @param standardPrice
	 *            the standardPrice to set
	 */
	public void setStandardPrice(String standardPrice) {
		this.standardPrice = standardPrice;
	}

	/**
	 * @return the articleUom
	 */
	public String getArticleUom() {
		return articleUom;
	}

	/**
	 * @param articleUom
	 *            the articleUom to set
	 */
	public void setArticleUom(String articleUom) {
		this.articleUom = articleUom;
	}

	/**
	 * @return the articleNo
	 */
	public String getArticleNo() {
		if (articleNo != null) {
			// //System.out.println("**** BEAN "
			// + articleNo.replaceFirst("^0+(?!$)", ""));
			this.articleNo=articleNo.replaceFirst("^0+(?!$)", "");
		}
		return articleNo;
	}

	/**
	 * @param articleNo
	 *            the articleNo to set
	 */
	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	/**
	 * @return the salesQty
	 */
	public String getSalesQty() {
		return salesQty;
	}

	/**
	 * @param salesQty
	 *            the salesQty to set
	 */
	public void setSalesQty(String salesQty) {
		this.salesQty = salesQty;
	}

	/**
	 * @return the salesPriceUnit
	 */
	public String getSalesPriceUnit() {
		return salesPriceUnit;
	}

	/**
	 * @param salesPriceUnit
	 *            the salesPriceUnit to set
	 */
	public void setSalesPriceUnit(String salesPriceUnit) {
		this.salesPriceUnit = salesPriceUnit;
	}

	/**
	 * @return the displayType
	 */
	public String getDisplayType() {
		return displayType;
	}

	/**
	 * @param displayType
	 *            the displayType to set
	 */
	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the promoOfferNo
	 */
	public String getPromoOfferNo() {
		return promoOfferNo;
	}

	/**
	 * @param promoOfferNo the promoOfferNo to set
	 */
	public void setPromoOfferNo(String promoOfferNo) {
		this.promoOfferNo = promoOfferNo;
	}

	/**
	 * @return the statusFlag
	 */
	public String getStatusFlag() {
		return statusFlag;
	}

	/**
	 * @param statusFlag the statusFlag to set
	 */
	public void setStatusFlag(String statusFlag) {
		this.statusFlag = statusFlag;
	}

	
}
