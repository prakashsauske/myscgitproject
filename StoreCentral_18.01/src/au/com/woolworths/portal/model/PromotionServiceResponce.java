package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromotionServiceResponce {

	@JsonProperty("d")
	private PromotionServiceResponceHelper promotionServiceResponceHelper;

	public PromotionServiceResponceHelper getPromotionServiceResponceHelper() {
		return promotionServiceResponceHelper;
	}

	public void setPromotionServiceResponceHelper(
			PromotionServiceResponceHelper promotionServiceResponceHelper) {
		this.promotionServiceResponceHelper = promotionServiceResponceHelper;
	}

}
