package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleHierarchyRelationResponseHelper {
	@JsonProperty("results")
	private List<ArticleHierarchyRelation> hierarchyRelation;

	@JsonProperty("results")
	public List<ArticleHierarchyRelation> getHierarchyRelation() {
		return hierarchyRelation;
	}

	@JsonProperty("results")
	public void setHierarchyRelation(
			List<ArticleHierarchyRelation> hierarchyRelation) {
		this.hierarchyRelation = hierarchyRelation;
	}

}
