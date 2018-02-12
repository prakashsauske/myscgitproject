package au.com.woolworths.portal.model;

import java.util.List;
import org.codehaus.jackson.annotate.JsonProperty;

public class VendorResponseHelper {

	@JsonProperty("results")
	private List<Vendor> vendorList;

	public List<Vendor> getVendorList() {
		return vendorList;
	}

	public void setVendorList(List<Vendor> vendorList) {
		this.vendorList = vendorList;
	}

}
