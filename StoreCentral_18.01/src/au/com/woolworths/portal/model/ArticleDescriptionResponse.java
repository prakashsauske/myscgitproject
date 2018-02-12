package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleDescriptionResponse {

	@JsonProperty("d")
	private ArticleDescriptionResponseHelper articleDescriptionResponseHelper;

	@JsonProperty("d")
	public ArticleDescriptionResponseHelper getArticleDescriptionResponseHelper() {
		return articleDescriptionResponseHelper;
	}

	@JsonProperty("d")
	public void setArticleDescriptionResponseHelper(
			ArticleDescriptionResponseHelper articleDescriptionResponseHelper) {
		this.articleDescriptionResponseHelper = articleDescriptionResponseHelper;
	}

}
