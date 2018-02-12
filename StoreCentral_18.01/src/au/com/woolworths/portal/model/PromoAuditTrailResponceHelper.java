package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class PromoAuditTrailResponceHelper {

	@JsonProperty("results")
	private List<PromoAuditTrail> promoAuditTrailList;

	public List<PromoAuditTrail> getPromoAuditTrailList() {
		return promoAuditTrailList;
	}

	public void setPromoAuditTrailList(List<PromoAuditTrail> promoAuditTrailList) {
		this.promoAuditTrailList = promoAuditTrailList;
	}

}
