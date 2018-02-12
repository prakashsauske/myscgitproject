package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class IntransitOrderResponse {

	@JsonProperty("d")
	private IntransitOrderResponseHelper IntransitOrderResponseHelper;

	public IntransitOrderResponseHelper getIntransitOrderResponseHelper() {
		return IntransitOrderResponseHelper;
	}

	public void setIntransitOrderResponseHelper(
			IntransitOrderResponseHelper intransitOrderResponseHelper) {
		IntransitOrderResponseHelper = intransitOrderResponseHelper;
	}

}
