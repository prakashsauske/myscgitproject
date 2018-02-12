package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CustomNutritionalResponse {

	@JsonProperty("d")
	private CustomNutritionalResponseHelper response;

	@JsonProperty("d")
	public CustomNutritionalResponseHelper getArticleCustomResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setArticleCustomResponse(
			CustomNutritionalResponseHelper response) {
		this.response = response;
	}

}
