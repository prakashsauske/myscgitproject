package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticlePackBreakdownResponseHelper {
	@JsonProperty("results")
	private List<ArticlePackBreakdown> packBreakdown;

	@JsonProperty("results")
	public List<ArticlePackBreakdown> getPackBreakdown() {
		return packBreakdown;
	}

	@JsonProperty("results")
	public void setPackBreakdown(List<ArticlePackBreakdown> packBreakdown) {
		this.packBreakdown = packBreakdown;
	}

}
