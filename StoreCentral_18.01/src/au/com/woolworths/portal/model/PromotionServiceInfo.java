package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromotionServiceInfo {
	@JsonProperty("AKTNR")
	private String promotion;
	@JsonProperty("PLVKP")
	private String SalesPromoPrice;

	public String getPromotion() {
		return promotion;
	}

	public void setPromotion(String promotion) {
		this.promotion = promotion;
	}

	public String getSalesPromoPrice() {
		return SalesPromoPrice;
	}

	public void setSalesPromoPrice(String salesPromoPrice) {
		SalesPromoPrice = salesPromoPrice;
	}

}
