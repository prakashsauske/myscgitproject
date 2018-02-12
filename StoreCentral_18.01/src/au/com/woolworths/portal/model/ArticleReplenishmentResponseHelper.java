package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleReplenishmentResponseHelper {

	@JsonProperty("results")
	private List<ArticleReplenishmentData> articleReplenishmentDataList;

	/**
	 * @return the articleReplenishmentDataList
	 */
	public List<ArticleReplenishmentData> getArticleReplenishmentDataList() {
		return articleReplenishmentDataList;
	}

	/**
	 * @param articleReplenishmentDataList the articleReplenishmentDataList to set
	 */
	public void setArticleReplenishmentDataList(
			List<ArticleReplenishmentData> articleReplenishmentDataList) {
		this.articleReplenishmentDataList = articleReplenishmentDataList;
	}

	

}
