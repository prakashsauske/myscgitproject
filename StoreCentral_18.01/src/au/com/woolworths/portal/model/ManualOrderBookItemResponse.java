package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ManualOrderBookItemResponse {

	@JsonProperty("d")
	private ManualOrderBookItemResponseHelper manualOrderBookItemResponseHelper;

	public ManualOrderBookItemResponseHelper getManualOrderBookItemResponseHelper() {
		return manualOrderBookItemResponseHelper;
	}

	public void setManualOrderBookItemResponseHelper(
			ManualOrderBookItemResponseHelper manualOrderBookItemResponseHelper) {
		this.manualOrderBookItemResponseHelper = manualOrderBookItemResponseHelper;
	}

}
