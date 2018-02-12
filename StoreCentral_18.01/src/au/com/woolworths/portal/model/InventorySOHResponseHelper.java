package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class InventorySOHResponseHelper {
	@JsonProperty("results")
	private List<InventorySOHInfo> soh;

	@JsonProperty("results")
	public List<InventorySOHInfo> getSOH() {
		return soh;
	}

	@JsonProperty("results")
	public void setSOH(List<InventorySOHInfo> soh) {
		this.soh = soh;
	}

}
