package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RecentDailyStoreProfileReportResponse {

	@JsonProperty("d")
	private RecentDailyStoreProfileReportResponseHelper response;

	/**
	 * @return the response
	 */
	public RecentDailyStoreProfileReportResponseHelper getResponse() {
		return response;
	}

	/**
	 * @param response the response to set
	 */
	public void setResponse(RecentDailyStoreProfileReportResponseHelper response) {
		this.response = response;
	}

	

}
