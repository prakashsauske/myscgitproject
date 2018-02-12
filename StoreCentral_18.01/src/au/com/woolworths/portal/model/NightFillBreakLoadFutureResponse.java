package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillBreakLoadFutureResponse {

	@JsonProperty("d")
	private NightFillBreakLoadFutureResponseHelper nightFillBreakLoadFutureResponseHelper;

	/**
	 * @return the nightFillBreakLoadFutureResponseHelper
	 */
	public NightFillBreakLoadFutureResponseHelper getNightFillBreakLoadFutureResponseHelper() {
		return nightFillBreakLoadFutureResponseHelper;
	}

	/**
	 * @param nightFillBreakLoadFutureResponseHelper the nightFillBreakLoadFutureResponseHelper to set
	 */
	public void setNightFillBreakLoadFutureResponseHelper(
			NightFillBreakLoadFutureResponseHelper nightFillBreakLoadFutureResponseHelper) {
		this.nightFillBreakLoadFutureResponseHelper = nightFillBreakLoadFutureResponseHelper;
	}

	
	

}
