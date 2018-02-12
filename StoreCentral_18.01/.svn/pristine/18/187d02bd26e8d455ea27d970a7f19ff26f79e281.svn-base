package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RTCPDFParam {
	
	@JsonProperty("data")
	ArrayList<RTCPDF> data;
	
	@JsonProperty("reportFor")
	private String reportFor;
	
	@JsonProperty("groupBy")
	private String groupBy;

	public ArrayList<RTCPDF> getData() {
		return data;
	}

	public void setData(ArrayList<RTCPDF> data) {
		this.data = data;
	}

	public String getReportFor() {
		return reportFor;
	}

	public void setReportFor(String reportFor) {
		this.reportFor = reportFor;
	}

	public String getGroupBy() {
		return groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

	
	
	
}
