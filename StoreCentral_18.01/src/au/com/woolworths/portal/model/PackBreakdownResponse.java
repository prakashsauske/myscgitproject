package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PackBreakdownResponse {

	@JsonProperty("d")
	private PackBreakdownResponseHelper response;

	@JsonProperty("d")
	public PackBreakdownResponseHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(PackBreakdownResponseHelper response) {
		this.response = response;
	}

}
