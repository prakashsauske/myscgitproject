package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StoreResponse {

	@JsonProperty("d")
	private StoreResponseHelper storeDetailsResponseHelper;

	@JsonProperty("d")
	public StoreResponseHelper getStoreDetailsResponseHelper() {
		return storeDetailsResponseHelper;
	}

	@JsonProperty("d")
	public void setStoreDetailsResponseHelper(
			StoreResponseHelper storeDetailsResponseHelper) {
		this.storeDetailsResponseHelper = storeDetailsResponseHelper;
	}

}
