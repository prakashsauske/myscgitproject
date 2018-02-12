package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillReportSummaryResponse {

	@JsonProperty("d")
	private NightFillReportSummaryResponseHelper nightFillReportSummaryResponseHelper;

	/**
	 * @return the nightFillReportSummaryResponseHelper
	 */
	public NightFillReportSummaryResponseHelper getNightFillReportSummaryResponseHelper() {
		return nightFillReportSummaryResponseHelper;
	}

	/**
	 * @param nightFillReportSummaryResponseHelper the nightFillReportSummaryResponseHelper to set
	 */
	public void setNightFillReportSummaryResponseHelper(
			NightFillReportSummaryResponseHelper nightFillReportSummaryResponseHelper) {
		this.nightFillReportSummaryResponseHelper = nightFillReportSummaryResponseHelper;
	}

	

}
