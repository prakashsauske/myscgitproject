package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POrderDetailsResponse {

	@JsonProperty("d")
	private POrderDetailsResponseHelper porderDetailsResponseHelper;

	/**
	 * @return the porderDetailsResponseHelper
	 */
	public POrderDetailsResponseHelper getPorderDetailsResponseHelper() {
		return porderDetailsResponseHelper;
	}

	/**
	 * @param porderDetailsResponseHelper the porderDetailsResponseHelper to set
	 */
	public void setPorderDetailsResponseHelper(
			POrderDetailsResponseHelper porderDetailsResponseHelper) {
		this.porderDetailsResponseHelper = porderDetailsResponseHelper;
	}

	

}
