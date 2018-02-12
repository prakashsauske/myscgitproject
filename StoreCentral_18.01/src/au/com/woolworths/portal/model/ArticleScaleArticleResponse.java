package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleScaleArticleResponse {

	@JsonProperty("d")
	private ArticleScaleArticleResponseHelper response;

	@JsonProperty("d")
	public ArticleScaleArticleResponseHelper getScaleArticleResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setScaleArticleResponse(
			ArticleScaleArticleResponseHelper response) {
		this.response = response;
	}

}