/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xrca4
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderResponse {

	@JsonProperty("d")
	private OrderResponseHelper orderResponseHelper;

	public OrderResponseHelper getOrderResponseHelper() {
		return orderResponseHelper;
	}

	public void setOrderResponseHelper(OrderResponseHelper orderResponseHelper) {
		this.orderResponseHelper = orderResponseHelper;
	}

}
