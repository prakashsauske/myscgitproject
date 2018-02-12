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
public class ArticleQueryStatusResponseHelper {

	@JsonProperty("results")
	private List<ArticleQueryStatus> articleQueryStatusList;

	public List<ArticleQueryStatus> getArticleQueryStatusList() {
		return articleQueryStatusList;
	}

	public void setArticleQueryStatusList(
			List<ArticleQueryStatus> articleQueryStatusList) {
		this.articleQueryStatusList = articleQueryStatusList;
	}

}
