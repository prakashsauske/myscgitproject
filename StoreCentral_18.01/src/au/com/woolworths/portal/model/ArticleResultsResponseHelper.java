package au.com.woolworths.portal.model;

import java.util.List;
import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleResultsResponseHelper {

	@JsonProperty("results")
	private List<ArticleSearchResults> articleSearchResultsList;

	public List<ArticleSearchResults> getArticleSearchResultsList() {
		return articleSearchResultsList;
	}

	public void setArticleSearchResultsList(
			List<ArticleSearchResults> articleSearchResultsList) {
		this.articleSearchResultsList = articleSearchResultsList;
	}

}
