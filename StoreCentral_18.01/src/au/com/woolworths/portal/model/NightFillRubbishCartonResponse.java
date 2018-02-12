package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillRubbishCartonResponse {

	@JsonProperty("d")
	private NightFillRubbishCartonResponseHelper nightFillRubbishCartonResponseHelper;

	/**
	 * @return the nightFillRubbishCartonResponseHelper
	 */
	public NightFillRubbishCartonResponseHelper getNightFillRubbishCartonResponseHelper() {
		return nightFillRubbishCartonResponseHelper;
	}

	/**
	 * @param nightFillRubbishCartonResponseHelper the nightFillRubbishCartonResponseHelper to set
	 */
	public void setNightFillRubbishCartonResponseHelper(
			NightFillRubbishCartonResponseHelper nightFillRubbishCartonResponseHelper) {
		this.nightFillRubbishCartonResponseHelper = nightFillRubbishCartonResponseHelper;
	}

	

	

}
