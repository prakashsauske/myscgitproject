package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillFillCartonResponse {

	@JsonProperty("d")
	private NightFillFillCartornResponseHelper nightFillFillCartonResponseHelper;

	/**
	 * @return the nightFillFillCartonResponseHelper
	 */
	public NightFillFillCartornResponseHelper getNightFillFillCartonResponseHelper() {
		return nightFillFillCartonResponseHelper;
	}

	/**
	 * @param nightFillFillCartonResponseHelper the nightFillFillCartonResponseHelper to set
	 */
	public void setNightFillFillCartonResponseHelper(
			NightFillFillCartornResponseHelper nightFillFillCartonResponseHelper) {
		this.nightFillFillCartonResponseHelper = nightFillFillCartonResponseHelper;
	}

	

	

}
