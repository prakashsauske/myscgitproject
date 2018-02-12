package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillRubbishCartonFutureResponse {

	@JsonProperty("d")
	private NightFillRubbishCartonFutureResponseHelper nightFillRubbishCartonFutureResponseHelper;

	/**
	 * @return the nightFillRubbishCartonFutureResponseHelper
	 */
	public NightFillRubbishCartonFutureResponseHelper getNightFillRubbishCartonFutureResponseHelper() {
		return nightFillRubbishCartonFutureResponseHelper;
	}

	/**
	 * @param nightFillRubbishCartonFutureResponseHelper the nightFillRubbishCartonFutureResponseHelper to set
	 */
	public void setNightFillRubbishCartonFutureResponseHelper(
			NightFillRubbishCartonFutureResponseHelper nightFillRubbishCartonFutureResponseHelper) {
		this.nightFillRubbishCartonFutureResponseHelper = nightFillRubbishCartonFutureResponseHelper;
	}

	

	

}
