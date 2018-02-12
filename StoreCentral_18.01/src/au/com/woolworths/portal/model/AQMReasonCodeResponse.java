package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AQMReasonCodeResponse {

	@JsonProperty("d")
	private AQMReasonCodeResponseHelper aQMReasonCodeResponseHelper;

	public AQMReasonCodeResponseHelper getaQMReasonCodeResponseHelper() {
		return aQMReasonCodeResponseHelper;
	}

	public void setaQMReasonCodeResponseHelper(
			AQMReasonCodeResponseHelper aQMReasonCodeResponseHelper) {
		this.aQMReasonCodeResponseHelper = aQMReasonCodeResponseHelper;
	}

}
