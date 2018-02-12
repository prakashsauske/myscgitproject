package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class EDGMSResponseHelper {

	@JsonProperty("results")
	private List<EDGMSReport> edgmsReport;

	@JsonProperty("results")
	public List<EDGMSReport> getEdgmsReport() {
		return edgmsReport;
	}

	@JsonProperty("results")
	public void setEdgmsReport(List<EDGMSReport> edgmsReport) {
		this.edgmsReport = edgmsReport;
	}

}
