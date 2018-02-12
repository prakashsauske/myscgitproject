package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillDropCartonFutureResponse {

	@JsonProperty("d")
	private NightFillDropCartonFutureResponseHelper nightFillDropCartonFutureResponseHelper;

	/**
	 * @return the nightFillDropCartonFutureResponseHelper
	 */
	public NightFillDropCartonFutureResponseHelper getNightFillDropCartonFutureResponseHelper() {
		return nightFillDropCartonFutureResponseHelper;
	}

	/**
	 * @param nightFillDropCartonFutureResponseHelper the nightFillDropCartonFutureResponseHelper to set
	 */
	public void setNightFillDropCartonFutureResponseHelper(
			NightFillDropCartonFutureResponseHelper nightFillDropCartonFutureResponseHelper) {
		this.nightFillDropCartonFutureResponseHelper = nightFillDropCartonFutureResponseHelper;
	}



}
