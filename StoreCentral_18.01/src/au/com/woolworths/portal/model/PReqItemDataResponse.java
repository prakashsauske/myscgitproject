package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PReqItemDataResponse {

	@JsonProperty("d")
	private PReqItemDataResponseHelper preqItemDataResponseHelper;

	/**
	 * @return the preqItemDataResponseHelper
	 */
	public PReqItemDataResponseHelper getPreqItemDataResponseHelper() {
		return preqItemDataResponseHelper;
	}

	/**
	 * @param preqItemDataResponseHelper the preqItemDataResponseHelper to set
	 */
	public void setPreqItemDataResponseHelper(
			PReqItemDataResponseHelper preqItemDataResponseHelper) {
		this.preqItemDataResponseHelper = preqItemDataResponseHelper;
	}

	

	

}
