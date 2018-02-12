/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xrca4
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ViewArticleQueryResponse {

	@JsonProperty("d")
	private ViewArticleQueryResponseHelper viewArticleQueryResponseHelper;

	public ViewArticleQueryResponseHelper getViewArticleQueryResponseHelper() {
		return viewArticleQueryResponseHelper;
	}

	public void setViewArticleQueryResponseHelper(
			ViewArticleQueryResponseHelper viewArticleQueryResponseHelper) {
		this.viewArticleQueryResponseHelper = viewArticleQueryResponseHelper;
	}

}
