package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromoAuditTrailResponce {

	@JsonProperty("d")
	private PromoAuditTrailResponceHelper promoAuditTrailResponceHelper;

	public PromoAuditTrailResponceHelper getPromoAuditTrailResponceHelper() {
		return promoAuditTrailResponceHelper;
	}

	public void setPromoAuditTrailResponceHelper(
			PromoAuditTrailResponceHelper promoAuditTrailResponceHelper) {
		this.promoAuditTrailResponceHelper = promoAuditTrailResponceHelper;
	}

}
