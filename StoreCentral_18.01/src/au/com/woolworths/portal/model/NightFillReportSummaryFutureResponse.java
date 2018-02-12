package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillReportSummaryFutureResponse {

	@JsonProperty("d")
	private NightFillReportSummaryFutureResponseHelper nightFillReportSummaryFutureResponseHelper;

	/**
	 * @return the nightFillReportSummaryFutureResponseHelper
	 */
	public NightFillReportSummaryFutureResponseHelper getNightFillReportSummaryFutureResponseHelper() {
		return nightFillReportSummaryFutureResponseHelper;
	}

	/**
	 * @param nightFillReportSummaryFutureResponseHelper the nightFillReportSummaryFutureResponseHelper to set
	 */
	public void setNightFillReportSummaryFutureResponseHelper(
			NightFillReportSummaryFutureResponseHelper nightFillReportSummaryFutureResponseHelper) {
		this.nightFillReportSummaryFutureResponseHelper = nightFillReportSummaryFutureResponseHelper;
	}

	
}
