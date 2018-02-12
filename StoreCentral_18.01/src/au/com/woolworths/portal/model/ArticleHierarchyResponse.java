package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleHierarchyResponse {
	


	@JsonProperty("d")
	private ArticleHierarchyResponseHelper response;

	/**
	 * @return the response
	 */
	public ArticleHierarchyResponseHelper getResponse() {
		return response;
	}

	/**
	 * @param response the response to set
	 */
	public void setResponse(ArticleHierarchyResponseHelper response) {
		this.response = response;
	}

	



}
