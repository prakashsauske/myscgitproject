package au.com.woolworths.portal.model;

import java.util.List;
import org.codehaus.jackson.annotate.JsonProperty;

public class SohAdjustLogModelResponseHelper {
	@JsonProperty("results")
	private List<SohAdjustLogModel> SohAdjustLogModelList;

	@JsonProperty("results")
	public List<SohAdjustLogModel> getSohAdjustLogModelList() {
		return SohAdjustLogModelList;
	}

	@JsonProperty("results")
	public void setSohAdjustLogModelList(
			List<SohAdjustLogModel> sohAdjustLogModelList) {
		SohAdjustLogModelList = sohAdjustLogModelList;
	}

}
