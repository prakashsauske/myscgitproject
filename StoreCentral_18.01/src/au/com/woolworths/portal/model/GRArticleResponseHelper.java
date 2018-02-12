package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class GRArticleResponseHelper {

	@JsonProperty("results")
	private List<GRArticle> grArticleList;

	/**
	 * @return the grArticleList
	 */
	public List<GRArticle> getGrArticleList() {
		return grArticleList;
	}

	/**
	 * @param grArticleList the grArticleList to set
	 */
	public void setGrArticleList(List<GRArticle> grArticleList) {
		this.grArticleList = grArticleList;
	}

}
