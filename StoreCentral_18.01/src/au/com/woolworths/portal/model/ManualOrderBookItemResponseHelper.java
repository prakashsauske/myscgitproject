package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ManualOrderBookItemResponseHelper {

	@JsonProperty("results")
	private List<ManualOrderBookItem> manualOrderBookItemList;

	public List<ManualOrderBookItem> getManualOrderBookItemList() {
		return manualOrderBookItemList;
	}

	public void setManualOrderBookItemList(
			List<ManualOrderBookItem> manualOrderBookItemList) {
		this.manualOrderBookItemList = manualOrderBookItemList;
	}

}
