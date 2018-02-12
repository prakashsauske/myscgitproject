package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

public class DGMSResponse {

	@JsonProperty("d")
	private DGMSResponseHelper dgmsResponseHelper;

	@JsonProperty("d")
	public DGMSResponseHelper getDgmsResponseHelper() {
		return dgmsResponseHelper;
	}

	@JsonProperty("d")
	public void setDgmsResponseHelper(DGMSResponseHelper dgmsResponseHelper) {
		this.dgmsResponseHelper = dgmsResponseHelper;
	}

}
