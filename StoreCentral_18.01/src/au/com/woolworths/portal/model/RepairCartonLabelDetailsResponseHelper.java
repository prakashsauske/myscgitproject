/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 *
 */
public class RepairCartonLabelDetailsResponseHelper {
	

	@JsonProperty("results")
	private ArrayList<RepairCartonLabelDetails> repairCartonLabelDetails;

	/**
	 * @return the repairCartonLabelDetails
	 */
	public ArrayList<RepairCartonLabelDetails> getRepairCartonLabelDetails() {
		return repairCartonLabelDetails;
	}

	/**
	 * @param repairCartonLabelDetails the repairCartonLabelDetails to set
	 */
	public void setRepairCartonLabelDetails(
			ArrayList<RepairCartonLabelDetails> repairCartonLabelDetails) {
		this.repairCartonLabelDetails = repairCartonLabelDetails;
	}


	
}
