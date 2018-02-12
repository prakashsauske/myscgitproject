package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POSResponse {

	@JsonProperty("d")
	private POSResponseHelper response;

	@JsonProperty("d")
	public POSResponseHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(POSResponseHelper response) {
		this.response = response;
	}

}
