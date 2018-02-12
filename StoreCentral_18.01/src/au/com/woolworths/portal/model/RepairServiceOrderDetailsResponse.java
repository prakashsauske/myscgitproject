/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 * 
 */
public class RepairServiceOrderDetailsResponse {

	@JsonProperty("d")
	private RepairServiceOrderDetailsResponseHelper repairServiceOrderDetailsResponseHelper;

	public RepairServiceOrderDetailsResponseHelper getRepairServiceOrderDetailsResponseHelper() {
		return repairServiceOrderDetailsResponseHelper;
	}

	public void setRepairServiceOrderDetailsResponseHelper(
			RepairServiceOrderDetailsResponseHelper repairServiceOrderDetailsResponseHelper) {
		this.repairServiceOrderDetailsResponseHelper = repairServiceOrderDetailsResponseHelper;
	}

}
