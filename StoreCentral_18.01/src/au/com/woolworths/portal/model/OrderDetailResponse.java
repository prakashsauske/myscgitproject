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
public class OrderDetailResponse {

	@JsonProperty("d")
	private OrderDetailResponseHelper orderDetailResponseHelper;

	public OrderDetailResponseHelper getOrderDetailResponseHelper() {
		return orderDetailResponseHelper;
	}

	public void setOrderDetailResponseHelper(
			OrderDetailResponseHelper orderDetailResponseHelper) {
		this.orderDetailResponseHelper = orderDetailResponseHelper;
	}

}
