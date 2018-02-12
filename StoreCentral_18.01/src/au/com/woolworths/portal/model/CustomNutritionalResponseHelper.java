package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class CustomNutritionalResponseHelper {

	@JsonProperty("results")
	private List<CustomNutritionalResult> articleCustomInfo;

	@JsonProperty("results")
	public List<CustomNutritionalResult> getArticleCustomInfo() {
		return articleCustomInfo;
	}

	@JsonProperty("results")
	public void setArticleCustomInfo(
			List<CustomNutritionalResult> articleCustomInfo) {
		this.articleCustomInfo = articleCustomInfo;
	}

}