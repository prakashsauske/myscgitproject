package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillFillCartonFutureResponse {

	@JsonProperty("d")
	private NightFillFillCartornFutureResponseHelper nightFillFillCartonFutureResponseHelper;

	/**
	 * @return the nightFillFillCartonFutureResponseHelper
	 */
	public NightFillFillCartornFutureResponseHelper getNightFillFillCartonFutureResponseHelper() {
		return nightFillFillCartonFutureResponseHelper;
	}

	/**
	 * @param nightFillFillCartonFutureResponseHelper the nightFillFillCartonFutureResponseHelper to set
	 */
	public void setNightFillFillCartonFutureResponseHelper(
			NightFillFillCartornFutureResponseHelper nightFillFillCartonFutureResponseHelper) {
		this.nightFillFillCartonFutureResponseHelper = nightFillFillCartonFutureResponseHelper;
	}



}
