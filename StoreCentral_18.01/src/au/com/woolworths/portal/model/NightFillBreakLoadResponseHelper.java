package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillBreakLoadResponseHelper {
	@JsonProperty("results")
	private List<NightFillBreakLoad> nightFillBreakLoadDetails;

	/**
	 * @return the nightFillBreakLoadDetails
	 */
	public List<NightFillBreakLoad> getNightFillBreakLoadDetails() {
		return nightFillBreakLoadDetails;
	}

	/**
	 * @param nightFillBreakLoadDetails the nightFillBreakLoadDetails to set
	 */
	public void setNightFillBreakLoadDetails(
			List<NightFillBreakLoad> nightFillBreakLoadDetails) {
		this.nightFillBreakLoadDetails = nightFillBreakLoadDetails;
	}

	

	
}
