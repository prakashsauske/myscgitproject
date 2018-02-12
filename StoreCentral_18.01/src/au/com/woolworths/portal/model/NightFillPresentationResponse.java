package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillPresentationResponse {

	@JsonProperty("d")
	private NightFillPresentationResponseHelper nightFillPresentationResponseHelper;

	/**
	 * @return the nightFillPresentationResponseHelper
	 */
	public NightFillPresentationResponseHelper getNightFillPresentationResponseHelper() {
		return nightFillPresentationResponseHelper;
	}

	/**
	 * @param nightFillPresentationResponseHelper the nightFillPresentationResponseHelper to set
	 */
	public void setNightFillPresentationResponseHelper(
			NightFillPresentationResponseHelper nightFillPresentationResponseHelper) {
		this.nightFillPresentationResponseHelper = nightFillPresentationResponseHelper;
	}

	
	

}
