package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticlePackBreakdownResponse {

	@JsonProperty("d")
	private ArticlePackBreakdownResponseHelper response;

	@JsonProperty("d")
	public ArticlePackBreakdownResponseHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(ArticlePackBreakdownResponseHelper response) {
		this.response = response;
	}

}
