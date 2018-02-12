package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ManualOrderBookHdrResponse {

	@JsonProperty("d")
	private ManualOrderBookHdrResponseHelper manualOrderBookHdrResponseHelper;

	public ManualOrderBookHdrResponseHelper getManualOrderBookHdrResponseHelper() {
		return manualOrderBookHdrResponseHelper;
	}

	public void setManualOrderBookHdrResponseHelper(
			ManualOrderBookHdrResponseHelper manualOrderBookHdrResponseHelper) {
		this.manualOrderBookHdrResponseHelper = manualOrderBookHdrResponseHelper;
	}

}
