/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xrca4
 * 
 */
public class ViewArticleQueryResponseHelper {

	@JsonProperty("results")
	private List<ViewArticleQuery> viewArticleQuery;

	public List<ViewArticleQuery> getViewArticleQuery() {
		return viewArticleQuery;
	}

	public void setViewArticleQuery(List<ViewArticleQuery> viewArticleQuery) {
		this.viewArticleQuery = viewArticleQuery;
	}

}
