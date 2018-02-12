package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown=true)
public class ArticleNutritionalResponseHelper {

	@JsonProperty("results")
	private List<ArticleNutritionalResult> articleCustomInfo;

	public List<ArticleNutritionalResult> getArticleCustomInfo() {
		return articleCustomInfo;
	}

	public void setArticleCustomInfo(
			List<ArticleNutritionalResult> articleCustomInfo) {
		this.articleCustomInfo = articleCustomInfo;
	}

}