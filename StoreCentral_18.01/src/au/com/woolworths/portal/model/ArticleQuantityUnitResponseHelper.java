package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleQuantityUnitResponseHelper {
	@JsonProperty("results")
	private List<ArticleQuantityUnit> articleQuantityUnitList;

	@JsonProperty("results")
	public List<ArticleQuantityUnit> getArticleQuantityUnitList() {
		return articleQuantityUnitList;
	}

	@JsonProperty("results")
	public void setArticleQuantityUnitList(
			List<ArticleQuantityUnit> articleQuantityUnitList) {
		this.articleQuantityUnitList = articleQuantityUnitList;
	}

}