package au.com.woolworths.portal.model;

import java.util.List;
import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleBasicViewDetailsResponseHelper {

	@JsonProperty("results")
	private List<ArticleBasicViewDetails> articleBasicViewDetailsList;

	@JsonProperty("results")
	public List<ArticleBasicViewDetails> getArticleBasicViewDetailsList() {
		return articleBasicViewDetailsList;
	}

	@JsonProperty("results")
	public void setArticleBasicViewDetailsList(
			List<ArticleBasicViewDetails> articleBasicViewDetailsList) {
		this.articleBasicViewDetailsList = articleBasicViewDetailsList;
	}

}
