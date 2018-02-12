package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleNutritionalResponse {

	@JsonProperty("d")
	private ArticleNutritionalResponseHelper articleNutritionalResponseHelper;

	public ArticleNutritionalResponseHelper getArticleNutritionalResponseHelper() {
		return articleNutritionalResponseHelper;
	}

	public void setArticleNutritionalResponseHelper(
			ArticleNutritionalResponseHelper articleNutritionalResponseHelper) {
		this.articleNutritionalResponseHelper = articleNutritionalResponseHelper;
	}

}
