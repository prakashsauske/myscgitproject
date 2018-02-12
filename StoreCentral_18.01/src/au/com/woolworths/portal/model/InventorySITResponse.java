package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InventorySITResponse {

	@JsonProperty("d")
	private InventorySITResponseHelper response;

	@JsonProperty("d")
	public InventorySITResponseHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(InventorySITResponseHelper response) {
		this.response = response;
	}

}
