/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.ArrayList;

/**
 * @author xmrah
 *
 */
public class SubReportInfo {

	private ArrayList<GapScanResult> actionRequired;
	
	private ArrayList<GapScanResult> reviewOnly;

	/**
	 * @return the actionRequired
	 */
	public ArrayList<GapScanResult> getActionRequired() {
		return actionRequired;
	}

	

	/**
	 * @param actionRequired the actionRequired to set
	 */
	public void setActionRequired(ArrayList<GapScanResult> actionRequired) {
		this.actionRequired = actionRequired;
	}

	/**
	 * @return the reviewOnly
	 */
	public ArrayList<GapScanResult> getReviewOnly() {
		return reviewOnly;
	}

	/**
	 * @param reviewOnly the reviewOnly to set
	 */
	public void setReviewOnly(ArrayList<GapScanResult> reviewOnly) {
		this.reviewOnly = reviewOnly;
	}
}
