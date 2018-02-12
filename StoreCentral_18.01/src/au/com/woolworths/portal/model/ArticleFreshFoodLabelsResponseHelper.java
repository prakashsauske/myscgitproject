package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleFreshFoodLabelsResponseHelper {
	@JsonProperty("results")
	private List<ArticleFreshFoodLabels> freshFoodLabelInfos;

	@JsonProperty("results")
	public List<ArticleFreshFoodLabels> getFreshFoodLabelInfos() {
		return freshFoodLabelInfos;
	}

	@JsonProperty("results")
	public void setFreshFoodLabelInfos(
			List<ArticleFreshFoodLabels> freshFoodLabelInfos) {
		this.freshFoodLabelInfos = freshFoodLabelInfos;
	}

}
