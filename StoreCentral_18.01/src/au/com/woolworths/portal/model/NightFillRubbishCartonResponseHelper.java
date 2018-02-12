package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillRubbishCartonResponseHelper {
	@JsonProperty("results")
	private List<NightFillRubbishCarton> nightFillRubbishCartonDetails;

	/**
	 * @return the nightFillRubbishCartonDetails
	 */
	public List<NightFillRubbishCarton> getNightFillRubbishCartonDetails() {
		return nightFillRubbishCartonDetails;
	}

	/**
	 * @param nightFillRubbishCartonDetails the nightFillRubbishCartonDetails to set
	 */
	public void setNightFillRubbishCartonDetails(
			List<NightFillRubbishCarton> nightFillRubbishCartonDetails) {
		this.nightFillRubbishCartonDetails = nightFillRubbishCartonDetails;
	}

	
	

	
}
