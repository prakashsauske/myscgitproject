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
public class ArticleQueryStatusResponse {

	@JsonProperty("d")
	private ArticleQueryStatusResponseHelper articleQueryStatusResponseHelper;

	public ArticleQueryStatusResponseHelper getArticleQueryStatusResponseHelper() {
		return articleQueryStatusResponseHelper;
	}

	public void setArticleQueryStatusResponseHelper(
			ArticleQueryStatusResponseHelper articleQueryStatusResponseHelper) {
		this.articleQueryStatusResponseHelper = articleQueryStatusResponseHelper;
	}

}
