package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillFillCartornResponseHelper {
	@JsonProperty("results")
	private List<NightFillFillCarton> nightFillFillCartonDetails;

	/**
	 * @return the nightFillFillCartonDetails
	 */
	public List<NightFillFillCarton> getNightFillFillCartonDetails() {
		return nightFillFillCartonDetails;
	}

	/**
	 * @param nightFillFillCartonDetails the nightFillFillCartonDetails to set
	 */
	public void setNightFillFillCartonDetails(
			List<NightFillFillCarton> nightFillFillCartonDetails) {
		this.nightFillFillCartonDetails = nightFillFillCartonDetails;
	}


	

	
}
