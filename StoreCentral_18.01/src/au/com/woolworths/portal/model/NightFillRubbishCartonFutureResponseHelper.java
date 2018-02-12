package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillRubbishCartonFutureResponseHelper {
	@JsonProperty("results")
	private List<NightFillRubbishCartonFuture> nightFillRubbishCartonFutureDetails;

	/**
	 * @return the nightFillRubbishCartonFutureDetails
	 */
	public List<NightFillRubbishCartonFuture> getNightFillRubbishCartonFutureDetails() {
		return nightFillRubbishCartonFutureDetails;
	}

	/**
	 * @param nightFillRubbishCartonFutureDetails the nightFillRubbishCartonFutureDetails to set
	 */
	public void setNightFillRubbishCartonFutureDetails(
			List<NightFillRubbishCartonFuture> nightFillRubbishCartonFutureDetails) {
		this.nightFillRubbishCartonFutureDetails = nightFillRubbishCartonFutureDetails;
	}

	

	
}
