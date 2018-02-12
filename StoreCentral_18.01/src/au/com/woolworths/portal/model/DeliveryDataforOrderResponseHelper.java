package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
@JsonIgnoreProperties(ignoreUnknown = true)
public class DeliveryDataforOrderResponseHelper {

	@JsonProperty("results")
	private List<DeliveryDataforOrder> deliveryDataforOrder;

	/**
	 * @return the deliveryDataforOrder
	 */
	public List<DeliveryDataforOrder> getDeliveryDataforOrder() {
		return deliveryDataforOrder;
	}

	/**
	 * @param deliveryDataforOrder the deliveryDataforOrder to set
	 */
	public void setDeliveryDataforOrder(
			List<DeliveryDataforOrder> deliveryDataforOrder) {
		this.deliveryDataforOrder = deliveryDataforOrder;
	}
	
}
