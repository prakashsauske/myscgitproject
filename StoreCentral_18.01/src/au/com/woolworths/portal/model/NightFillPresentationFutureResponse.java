package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillPresentationFutureResponse {

	@JsonProperty("d")
	private NightFillPresentationFutureResponseHelper nightFillPresentationFutureResponseHelper;

	/**
	 * @return the nightFillPresentationFutureResponseHelper
	 */
	public NightFillPresentationFutureResponseHelper getNightFillPresentationFutureResponseHelper() {
		return nightFillPresentationFutureResponseHelper;
	}

	/**
	 * @param nightFillPresentationFutureResponseHelper the nightFillPresentationFutureResponseHelper to set
	 */
	public void setNightFillPresentationFutureResponseHelper(
			NightFillPresentationFutureResponseHelper nightFillPresentationFutureResponseHelper) {
		this.nightFillPresentationFutureResponseHelper = nightFillPresentationFutureResponseHelper;
	}


	
	

}
