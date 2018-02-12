package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

public class EDGMSResponse {

	@JsonProperty("d")
	private EDGMSResponseHelper edgmsResponseHelper;

	@JsonProperty("d")
	public EDGMSResponseHelper getEdgmsResponseHelper() {
		return edgmsResponseHelper;
	}

	@JsonProperty("d")
	public void setEdgmsResponseHelper(EDGMSResponseHelper edgmsResponseHelper) {
		this.edgmsResponseHelper = edgmsResponseHelper;
	}

}
