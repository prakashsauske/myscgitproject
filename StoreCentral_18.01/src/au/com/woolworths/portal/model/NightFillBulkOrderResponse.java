package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillBulkOrderResponse {

	@JsonProperty("d")
	private NightFillBulkOrderResponseHelper nightFillBulkOrderResponseHelper;

	public NightFillBulkOrderResponseHelper getNightFillBulkOrderResponseHelper() {
		return nightFillBulkOrderResponseHelper;
	}

	public void setNightFillBulkOrderResponseHelper(
			NightFillBulkOrderResponseHelper nightFillBulkOrderResponseHelper) {
		this.nightFillBulkOrderResponseHelper = nightFillBulkOrderResponseHelper;
	}

	
	

}
