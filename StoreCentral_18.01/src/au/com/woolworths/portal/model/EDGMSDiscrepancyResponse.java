package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

public class EDGMSDiscrepancyResponse {

	@JsonProperty("d")
	private EDGMSDiscrepancyHelper edgmsDiscrepancyHelper;

	@JsonProperty("d")
	public EDGMSDiscrepancyHelper getEdgmsDiscrepancyHelper() {
		return edgmsDiscrepancyHelper;
	}

	@JsonProperty("d")
	public void setEdgmsDiscrepancyHelper(
			EDGMSDiscrepancyHelper edgmsDiscrepancyHelper) {
		this.edgmsDiscrepancyHelper = edgmsDiscrepancyHelper;
	}

}
