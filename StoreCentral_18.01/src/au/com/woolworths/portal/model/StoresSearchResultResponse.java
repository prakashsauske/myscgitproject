package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StoresSearchResultResponse {

	@JsonProperty("d")
	private StoresSearchResultResponseHelper searchResultResponseHelper;

	/**
	 * @return the searchResultResponseHelper
	 */
	public StoresSearchResultResponseHelper getSearchResultResponseHelper() {
		return searchResultResponseHelper;
	}

	/**
	 * @param searchResultResponseHelper the searchResultResponseHelper to set
	 */
	public void setSearchResultResponseHelper(
			StoresSearchResultResponseHelper searchResultResponseHelper) {
		this.searchResultResponseHelper = searchResultResponseHelper;
	}

	

}
