/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LimitQuantity {
	
	@JsonProperty("order_limit_qty")
	private String limitQty;

	/**
	 * @return the limitQty
	 */
	public String getLimitQty() {
		return limitQty;
	}

	/**
	 * @param limitQty the limitQty to set
	 */
	public void setLimitQty(String limitQty) {
		this.limitQty = limitQty;
	}

}
