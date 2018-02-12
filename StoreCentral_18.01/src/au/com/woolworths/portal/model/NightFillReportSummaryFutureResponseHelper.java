package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillReportSummaryFutureResponseHelper {
	@JsonProperty("results")
	private List<NightFillReportSummaryFuture> nightFillReportSummaryFuture;

	/**
	 * @return the nightFillReportSummaryFuture
	 */
	public List<NightFillReportSummaryFuture> getNightFillReportSummaryFuture() {
		return nightFillReportSummaryFuture;
	}

	/**
	 * @param nightFillReportSummaryFuture the nightFillReportSummaryFuture to set
	 */
	public void setNightFillReportSummaryFuture(
			List<NightFillReportSummaryFuture> nightFillReportSummaryFuture) {
		this.nightFillReportSummaryFuture = nightFillReportSummaryFuture;
	}

	
	
}
