package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ReturnOrderDtlResponseHelper {

	@JsonProperty("results")
	private List<ReturnOrderDtl> returnOrderDtl;

	public List<ReturnOrderDtl> getReturnOrderDtl() {
		return returnOrderDtl;
	}

	public void setReturnOrderDtl(List<ReturnOrderDtl> returnOrderDtl) {
		this.returnOrderDtl = returnOrderDtl;
	}

}
