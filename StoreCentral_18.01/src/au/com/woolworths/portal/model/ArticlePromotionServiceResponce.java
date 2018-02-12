package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticlePromotionServiceResponce {

	@JsonProperty("d")
	private ArticlePromotionServiceResponceHelper response;

	@JsonProperty("d")
	public ArticlePromotionServiceResponceHelper getResponse() {
		return response;
	}

	@JsonProperty("d")
	public void setResponse(ArticlePromotionServiceResponceHelper response) {
		this.response = response;
	}

}
