package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POItemsHolder {

	@JsonProperty("results")
	private ArrayList<RepairPOItems> repairPOItems;

	public ArrayList<RepairPOItems> getRepairPOItems() {
		return repairPOItems;
	}

	public void setRepairPOItems(ArrayList<RepairPOItems> repairPOItems) {
		this.repairPOItems = repairPOItems;
	}

}
