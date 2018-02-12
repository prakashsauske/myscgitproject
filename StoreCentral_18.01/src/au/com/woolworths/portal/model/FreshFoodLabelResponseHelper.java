package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class FreshFoodLabelResponseHelper {
	@JsonProperty("results")
	private List<FreshFoodLabelInfo> freshFoodLabelInfos;

	@JsonProperty("results")
	public List<FreshFoodLabelInfo> getFreshFoodLabelInfos() {
		return freshFoodLabelInfos;
	}

	@JsonProperty("results")
	public void setFreshFoodLabelInfos(
			List<FreshFoodLabelInfo> freshFoodLabelInfos) {
		this.freshFoodLabelInfos = freshFoodLabelInfos;
	}

}
