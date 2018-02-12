package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillPresentationFutureResponseHelper {
	@JsonProperty("results")
	private List<NightFillPresentationFuture> nightFillPresentationFuture;

	/**
	 * @return the nightFillPresentationFuture
	 */
	public List<NightFillPresentationFuture> getNightFillPresentationFuture() {
		return nightFillPresentationFuture;
	}

	/**
	 * @param nightFillPresentationFuture the nightFillPresentationFuture to set
	 */
	public void setNightFillPresentationFuture(
			List<NightFillPresentationFuture> nightFillPresentationFuture) {
		this.nightFillPresentationFuture = nightFillPresentationFuture;
	}

	

	
}
