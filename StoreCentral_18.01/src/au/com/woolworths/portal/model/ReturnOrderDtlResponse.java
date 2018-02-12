package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReturnOrderDtlResponse {

	@JsonProperty("d")
	private ReturnOrderDtlResponseHelper returnOrderDtlResponseHelper;

	public ReturnOrderDtlResponseHelper getReturnOrderDtlResponseHelper() {
		return returnOrderDtlResponseHelper;
	}

	public void setReturnOrderDtlResponseHelper(
			ReturnOrderDtlResponseHelper returnOrderDtlResponseHelper) {
		this.returnOrderDtlResponseHelper = returnOrderDtlResponseHelper;
	}

}
