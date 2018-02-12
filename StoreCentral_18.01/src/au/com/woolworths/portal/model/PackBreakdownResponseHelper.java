package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class PackBreakdownResponseHelper {
	@JsonProperty("results")
	private List<PackBreakdown> packBreakdown;

	@JsonProperty("results")
	public List<PackBreakdown> getPackBreakdown() {
		return packBreakdown;
	}

	@JsonProperty("results")
	public void setPackBreakdown(List<PackBreakdown> packBreakdown) {
		this.packBreakdown = packBreakdown;
	}

}
