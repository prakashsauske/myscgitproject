package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

public class RepairSearchResultsResponse {
	@JsonProperty("d")
	private RepairSearchResultsResponseHelper repairSearchResultsResponseHelper;

	public RepairSearchResultsResponseHelper getRepairSearchResultsResponseHelper() {
		return repairSearchResultsResponseHelper;
	}

	public void setRepairSearchResultsResponseHelper(
			RepairSearchResultsResponseHelper repairSearchResultsResponseHelper) {
		this.repairSearchResultsResponseHelper = repairSearchResultsResponseHelper;
	}

}
