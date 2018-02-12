package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GRArticleResponse {

	@JsonProperty("d")
	private GRArticleResponseHelper grArticleResponseHelper;

	/**
	 * @return the grArticleResponseHelper
	 */
	public GRArticleResponseHelper getGrArticleResponseHelper() {
		return grArticleResponseHelper;
	}

	/**
	 * @param grArticleResponseHelper
	 *            the grArticleResponseHelper to set
	 */
	public void setGrArticleResponseHelper(
			GRArticleResponseHelper grArticleResponseHelper) {
		this.grArticleResponseHelper = grArticleResponseHelper;
	}

}
