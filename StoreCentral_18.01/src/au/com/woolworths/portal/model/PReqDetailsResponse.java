package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PReqDetailsResponse {

	@JsonProperty("d")
	private PReqDetailsResponseHelper preqResponseHelper;

	/**
	 * @return the preqResponseHelper
	 */
	public PReqDetailsResponseHelper getPreqResponseHelper() {
		return preqResponseHelper;
	}

	/**
	 * @param preqResponseHelper the preqResponseHelper to set
	 */
	public void setPreqResponseHelper(PReqDetailsResponseHelper preqResponseHelper) {
		this.preqResponseHelper = preqResponseHelper;
	}

	

}
