package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class DeliveryDataResponseHelper {

	@JsonProperty("results")
	private List<DeliveryData> deliveryDataDtl;

	/**
	 * @return the deliveryDataDtl
	 */
	public List<DeliveryData> getDeliveryDataDtl() {
		return deliveryDataDtl;
	}

	/**
	 * @param deliveryDataDtl the deliveryDataDtl to set
	 */
	public void setDeliveryDataDtl(List<DeliveryData> deliveryDataDtl) {
		this.deliveryDataDtl = deliveryDataDtl;
	}

	
}
