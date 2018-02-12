package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRosterReportResponse {

	@JsonProperty("d")
	private OrderRosterReportResponseHelper response;

	public OrderRosterReportResponseHelper getResponse() {
		return response;
	}

	public void setResponse(OrderRosterReportResponseHelper response) {
		this.response = response;
	}

}
