package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SohAdjustLogModelResponse {

	@JsonProperty("d")
	private SohAdjustLogModelResponseHelper sohAdjustLogModelResponseHelper;

	@JsonProperty("d")
	public SohAdjustLogModelResponseHelper getSohAdjustLogModelResponseHelper() {
		return sohAdjustLogModelResponseHelper;
	}

	@JsonProperty("d")
	public void setSohAdjustLogModelResponseHelper(
			SohAdjustLogModelResponseHelper sohAdjustLogModelResponseHelper) {
		this.sohAdjustLogModelResponseHelper = sohAdjustLogModelResponseHelper;
	}

}
