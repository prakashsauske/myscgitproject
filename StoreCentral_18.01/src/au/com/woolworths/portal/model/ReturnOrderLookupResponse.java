package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReturnOrderLookupResponse {

	@JsonProperty("d")
	private ReturnOrderLookupResponseHelper returnOrderLookupResponseHelper;

	public ReturnOrderLookupResponseHelper getReturnOrderLookupResponseHelper() {
		return returnOrderLookupResponseHelper;
	}

	public void setReturnOrderLookupResponseHelper(
			ReturnOrderLookupResponseHelper returnOrderLookupResponseHelper) {
		this.returnOrderLookupResponseHelper = returnOrderLookupResponseHelper;
	}

}
