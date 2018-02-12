package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NearbyStoreSearchResponseHelper {
	@JsonProperty("results")
	private List<NearbyStoreSearchInfo> nearbyStoreSearch;

	@JsonProperty("results")
	public List<NearbyStoreSearchInfo> getNearbyStoreSearch() {
		return nearbyStoreSearch;
	}

	@JsonProperty("results")
	public void setNearbyStoreSearch(
			List<NearbyStoreSearchInfo> nearbyStoreSearch) {
		this.nearbyStoreSearch = nearbyStoreSearch;
	}
}
