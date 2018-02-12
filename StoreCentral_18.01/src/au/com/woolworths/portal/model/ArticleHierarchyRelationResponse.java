package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleHierarchyRelationResponse {

	@JsonProperty("d")
	private ArticleHierarchyRelationResponseHelper hierarchyResponse;

	@JsonProperty("d")
	public ArticleHierarchyRelationResponseHelper getHierarchyResponse() {
		return hierarchyResponse;
	}

	@JsonProperty("d")
	public void setHierarchyResponse(
			ArticleHierarchyRelationResponseHelper hierarchyResponse) {
		this.hierarchyResponse = hierarchyResponse;
	}

}
