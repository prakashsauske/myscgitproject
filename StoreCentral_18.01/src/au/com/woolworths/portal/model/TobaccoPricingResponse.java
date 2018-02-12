package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TobaccoPricingResponse {

	@JsonProperty("d")
	private TobaccoPricingResponseHelper tobaccoPricingResponseHelper;

	public TobaccoPricingResponseHelper getTobaccoPricingResponseHelper() {
		return tobaccoPricingResponseHelper;
	}

	public void setTobaccoPricingResponseHelper(
			TobaccoPricingResponseHelper tobaccoPricingResponseHelper) {
		this.tobaccoPricingResponseHelper = tobaccoPricingResponseHelper;
	}
	
	
}
