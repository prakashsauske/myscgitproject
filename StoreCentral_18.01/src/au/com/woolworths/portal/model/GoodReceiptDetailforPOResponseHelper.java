package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class GoodReceiptDetailforPOResponseHelper {

	@JsonProperty("results")
	private List<GoodReceiptDetailforPO> goodReceiptDetailforPO;

	/**
	 * @return the goodReceiptDetailforPO
	 */
	public List<GoodReceiptDetailforPO> getGoodReceiptDetailforPO() {
		return goodReceiptDetailforPO;
	}

	/**
	 * @param goodReceiptDetailforPO the goodReceiptDetailforPO to set
	 */
	public void setGoodReceiptDetailforPO(
			List<GoodReceiptDetailforPO> goodReceiptDetailforPO) {
		this.goodReceiptDetailforPO = goodReceiptDetailforPO;
	}

	

	
}
