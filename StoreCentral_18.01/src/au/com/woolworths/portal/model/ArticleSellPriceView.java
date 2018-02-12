package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleSellPriceView {

	@JsonProperty("article")
	private String articleNo;
	@JsonProperty("site")
	private String siteNo;
	@JsonProperty("sales_price")
	private String salesPrice;
	@JsonProperty("sell_effective_gp")
	private String sellEffectiveGP;
	@JsonProperty("promo_id")
	private String promoId;
	@JsonProperty("promo_desc")
	private String promoDesc;
	@JsonProperty("promo_type")
	private String promoType;
	@JsonProperty("promo_type_desc")
	private String promoTypeDesc;
	@JsonProperty("promo_sales_price")
	private String promoSalesPrice;
	@JsonProperty("promo_effective_gp")
	private String promoEffectiveGP;
	@JsonProperty("promo_from_date")
	private String promoFromDate;
	@JsonProperty("promo_to_date")
	private String promoToDate;

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSalesPrice() {
		return salesPrice;
	}

	public void setSalesPrice(String salesPrice) {
		this.salesPrice = salesPrice;
	}

	public String getSellEffectiveGP() {
		return sellEffectiveGP;
	}

	public void setSellEffectiveGP(String sellEffectiveGP) {
		this.sellEffectiveGP = sellEffectiveGP;
	}

	public String getPromoId() {
		return promoId;
	}

	public void setPromoId(String promoId) {
		this.promoId = promoId;
	}

	public String getPromoDesc() {
		return promoDesc;
	}

	public void setPromoDesc(String promoDesc) {
		this.promoDesc = promoDesc;
	}

	public String getPromoType() {
		return promoType;
	}

	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	public String getPromoTypeDesc() {
		return promoTypeDesc;
	}

	public void setPromoTypeDesc(String promoTypeDesc) {
		this.promoTypeDesc = promoTypeDesc;
	}

	public String getPromoSalesPrice() {
		return promoSalesPrice;
	}

	public void setPromoSalesPrice(String promoSalesPrice) {
		this.promoSalesPrice = promoSalesPrice;
	}

	public String getPromoEffectiveGP() {
		return promoEffectiveGP;
	}

	public void setPromoEffectiveGP(String promoEffectiveGP) {
		this.promoEffectiveGP = promoEffectiveGP;
	}

	public String getPromoFromDate() {
		if (this.promoFromDate != null) {
			String result = PortalUtil.convertToStandard(promoFromDate);
			if (result != null && result != "")
				return result;
		}
		return promoFromDate;
	}

	public void setPromoFromDate(String promoFromDate) {
		this.promoFromDate = promoFromDate;
	}

	public String getPromoToDate() {
		if (this.promoToDate != null) {
			String result = PortalUtil.convertToStandard(promoToDate);
			if (result != null && result != "")
				return result;
		}
		return promoToDate;
	}

	public void setPromoToDate(String promoToDate) {
		this.promoToDate = promoToDate;
	}

}
