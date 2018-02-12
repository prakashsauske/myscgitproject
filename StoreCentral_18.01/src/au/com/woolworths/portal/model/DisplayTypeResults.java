package au.com.woolworths.portal.model;

import java.util.ArrayList;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)

public class DisplayTypeResults {
	@JsonProperty("results")
	private ArrayList<inStorePromotionDisplayType> responseData=new ArrayList<inStorePromotionDisplayType>();

	/**
	 * @return the responseData
	 */
	
	public ArrayList<inStorePromotionDisplayType> getResponseData() {
		return responseData;
	}

	/**
	 * @param responseData the responseData to set
	 */

	public void setResponseData(ArrayList<inStorePromotionDisplayType> responseData) {
		this.responseData = responseData;
	}
}
