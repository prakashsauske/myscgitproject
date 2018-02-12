package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillReportSummaryResponseHelper {
	@JsonProperty("results")
	private List<NightFillReportSummary> NightFillReportSummary;

	/**
	 * @return the nightFillReportSummary
	 */
	public List<NightFillReportSummary> getNightFillReportSummary() {
		return NightFillReportSummary;
	}

	/**
	 * @param nightFillReportSummary the nightFillReportSummary to set
	 */
	public void setNightFillReportSummary(
			List<NightFillReportSummary> nightFillReportSummary) {
		NightFillReportSummary = nightFillReportSummary;
	}

	
	
}
