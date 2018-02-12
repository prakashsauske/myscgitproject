/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 *
 */
public class LimitQuantityResponseHelper {

	@JsonProperty("result")
	private  List<LimitQuantity> limitQtyList;

	/**
	 * @return the limitQtyList
	 */
	public List<LimitQuantity> getLimitQtyList() {
		return limitQtyList;
	}

	/**
	 * @param limitQtyList the limitQtyList to set
	 */
	public void setLimitQtyList(List<LimitQuantity> limitQtyList) {
		this.limitQtyList = limitQtyList;
	}
	
	
}
