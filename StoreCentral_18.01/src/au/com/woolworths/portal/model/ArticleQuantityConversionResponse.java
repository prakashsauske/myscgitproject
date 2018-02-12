package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleQuantityConversionResponse {

	@JsonProperty("d")
	private ArticleQuantityConversionResponseHelper articleQuantityConversionResponseHelper;

	@JsonProperty("d")
	public ArticleQuantityConversionResponseHelper getArticleQuantityConversionResponseHelper() {
		return articleQuantityConversionResponseHelper;
	}

	@JsonProperty("d")
	public void setArticleQuantityConversionResponseHelper(
			ArticleQuantityConversionResponseHelper articleQuantityConversionResponseHelper) {
		this.articleQuantityConversionResponseHelper = articleQuantityConversionResponseHelper;
	}

}
