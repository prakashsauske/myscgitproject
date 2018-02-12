/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xrca4
 * 
 */
public class OrderDetailResponseHelper {

	@JsonProperty("results")
	private List<OrderDetail> orderDetails;

	public List<OrderDetail> getOrderDetails() {
		return orderDetails;
	}

	public void setOrderDetails(List<OrderDetail> orderDetails) {
		this.orderDetails = orderDetails;
	}

}
