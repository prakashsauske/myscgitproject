package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class InventorySOOResponseHelper {
	@JsonProperty("results")
	private List<InventorySOOInfo> soo;

	@JsonProperty("results")
	public List<InventorySOOInfo> getSOO() {
		return soo;
	}

	@JsonProperty("results")
	public void setSOO(List<InventorySOOInfo> soo) {
		this.soo = soo;
	}

}
