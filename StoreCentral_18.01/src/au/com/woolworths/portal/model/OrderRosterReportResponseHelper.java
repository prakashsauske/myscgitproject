package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderRosterReportResponseHelper {

	@JsonProperty("results")
	private List<OrderRosterReport> OrderRosterReportList;

	public List<OrderRosterReport> getOrderRosterReportList() {
		return OrderRosterReportList;
	}

	public void setOrderRosterReportList(
			List<OrderRosterReport> orderRosterReportList) {
		OrderRosterReportList = orderRosterReportList;
	}

}
