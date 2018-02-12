package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationResponse {

	@JsonProperty("d")
	private LocationResponseHelper response;

	@JsonProperty("d")
	public LocationResponseHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(LocationResponseHelper response) {
		this.response = response;
	}

}
