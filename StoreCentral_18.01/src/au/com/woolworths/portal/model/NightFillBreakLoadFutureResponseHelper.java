package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillBreakLoadFutureResponseHelper {
	@JsonProperty("results")
	private List<NightFillBreakLoadFuture> nightFillBreakLoadFutureDetails;

	/**
	 * @return the nightFillBreakLoadFutureDetails
	 */
	public List<NightFillBreakLoadFuture> getNightFillBreakLoadFutureDetails() {
		return nightFillBreakLoadFutureDetails;
	}

	/**
	 * @param nightFillBreakLoadFutureDetails the nightFillBreakLoadFutureDetails to set
	 */
	public void setNightFillBreakLoadFutureDetails(
			List<NightFillBreakLoadFuture> nightFillBreakLoadFutureDetails) {
		this.nightFillBreakLoadFutureDetails = nightFillBreakLoadFutureDetails;
	}


	

	
}
