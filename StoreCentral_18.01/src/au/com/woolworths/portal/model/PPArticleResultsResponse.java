package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PPArticleResultsResponse {

	@JsonProperty("d")
	private PPArticleResultsResponseHelper ppArticleResultsResponseHelper;

	public PPArticleResultsResponseHelper getPPArticleResultsResponseHelper() {
		return ppArticleResultsResponseHelper;
	}

	public void setPPArticleResultsResponseHelper(
			PPArticleResultsResponseHelper ppArticleResultsResponseHelper) {
		this.ppArticleResultsResponseHelper = ppArticleResultsResponseHelper;
	}

}
