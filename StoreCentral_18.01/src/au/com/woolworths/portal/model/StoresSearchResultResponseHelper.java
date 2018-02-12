package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class StoresSearchResultResponseHelper {

	@JsonProperty("results")
	private List<StoresSearchResult> storeDetailsList;

	/**
	 * @return the storeDetailsList
	 */
	public List<StoresSearchResult> getStoreDetailsList() {
		return storeDetailsList;
	}

	/**
	 * @param storeDetailsList the storeDetailsList to set
	 */
	public void setStoreDetailsList(List<StoresSearchResult> storeDetailsList) {
		this.storeDetailsList = storeDetailsList;
	}

	
}
