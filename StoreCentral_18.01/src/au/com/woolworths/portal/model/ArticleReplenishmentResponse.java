package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleReplenishmentResponse {

	@JsonProperty("d")
	private ArticleReplenishmentResponseHelper articleReplenishmentResponseHelper;

	/**
	 * @return the articleReplenishmentResponseHelper
	 */
	public ArticleReplenishmentResponseHelper getArticleReplenishmentResponseHelper() {
		return articleReplenishmentResponseHelper;
	}

	/**
	 * @param articleReplenishmentResponseHelper the articleReplenishmentResponseHelper to set
	 */
	public void setArticleReplenishmentResponseHelper(
			ArticleReplenishmentResponseHelper articleReplenishmentResponseHelper) {
		this.articleReplenishmentResponseHelper = articleReplenishmentResponseHelper;
	}

	

}
