package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromoDisplayTypeResponse {

	@JsonProperty("d")
	private PromoDisplayTypeResponseHelper promoDisplayTypeResponseHelper;

	public PromoDisplayTypeResponseHelper getPromoDisplayTypeResponseHelper() {
		return promoDisplayTypeResponseHelper;
	}

	public void setPromoDisplayTypeResponseHelper(
			PromoDisplayTypeResponseHelper promoDisplayTypeResponseHelper) {
		this.promoDisplayTypeResponseHelper = promoDisplayTypeResponseHelper;
	}

}
