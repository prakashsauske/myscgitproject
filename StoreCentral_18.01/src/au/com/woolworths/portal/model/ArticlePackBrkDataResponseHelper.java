package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticlePackBrkDataResponseHelper {

	@JsonProperty("results")
	private List<ArticlePackBrkData> articlePackBrkDataList;

	/**
	 * @return the articlePackBrkDataList
	 */
	public List<ArticlePackBrkData> getArticlePackBrkDataList() {
		return articlePackBrkDataList;
	}

	/**
	 * @param articlePackBrkDataList
	 *            the articlePackBrkDataList to set
	 */
	public void setArticlePackBrkDataList(
			List<ArticlePackBrkData> articlePackBrkDataList) {
		this.articlePackBrkDataList = articlePackBrkDataList;
	}

}
