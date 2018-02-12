package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.param.ReturnOrderInfoParam;

public class ReturnOrderDtlResponseHdr {

	@JsonProperty("results")
	private List<ReturnOrderInfoParam> returnOrderDtl;

	public List<ReturnOrderInfoParam> getReturnOrderDtl() {
		return returnOrderDtl;
	}

	public void setReturnOrderDtl(List<ReturnOrderInfoParam> returnOrderDtl) {
		this.returnOrderDtl = returnOrderDtl;
	}

}
