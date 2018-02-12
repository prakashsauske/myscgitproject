package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class OrderDetailItemResponseHelper {

	@JsonProperty("results")
	private List<OrderDetailItem> orderItemDetails;

	/**
	 * @return the orderItemDetails
	 */
	public List<OrderDetailItem> getOrderItemDetails() {
		return orderItemDetails;
	}

	/**
	 * @param orderItemDetails the orderItemDetails to set
	 */
	public void setOrderItemDetails(List<OrderDetailItem> orderItemDetails) {
		this.orderItemDetails = orderItemDetails;
	}
	
	
}
