package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ZeroMPLReportResponseHelper {

	@JsonProperty("results")
	private List<ZeroMPLReport> zeroMPLReportList;

	public List<ZeroMPLReport> getZeroMPLReportList() {
		return zeroMPLReportList;
	}

	public void setZeroMPLReportList(List<ZeroMPLReport> zeroMPLReportList) {
		this.zeroMPLReportList = zeroMPLReportList;
	}

}
