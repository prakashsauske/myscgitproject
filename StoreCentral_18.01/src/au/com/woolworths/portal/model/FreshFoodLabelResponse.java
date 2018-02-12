package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class FreshFoodLabelResponse {

	@JsonProperty("d")
	private FreshFoodLabelResponseHelper response;

	@JsonProperty("d")
	public FreshFoodLabelResponseHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(FreshFoodLabelResponseHelper response) {
		this.response = response;
	}

}
