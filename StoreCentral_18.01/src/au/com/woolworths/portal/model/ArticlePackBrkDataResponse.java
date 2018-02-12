package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticlePackBrkDataResponse {

	@JsonProperty("d")
	private ArticlePackBrkDataResponseHelper articlePackBrkDataResponseHelper;

	/**
	 * @return the articlePackBrkDataResponseHelper
	 */
	public ArticlePackBrkDataResponseHelper getArticlePackBrkDataResponseHelper() {
		return articlePackBrkDataResponseHelper;
	}

	/**
	 * @param articlePackBrkDataResponseHelper
	 *            the articlePackBrkDataResponseHelper to set
	 */
	public void setArticlePackBrkDataResponseHelper(
			ArticlePackBrkDataResponseHelper articlePackBrkDataResponseHelper) {
		this.articlePackBrkDataResponseHelper = articlePackBrkDataResponseHelper;
	}

}
