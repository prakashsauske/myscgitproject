package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class OrderPopupTabSearchResponseHelper {

	@JsonProperty("results")
	private List<OrderPopUpTabSearchDtl> orderTabSearchDtl;

	public List<OrderPopUpTabSearchDtl> getOrderTabSearchDtl() {
		return orderTabSearchDtl;
	}

	public void setOrderTabSearchDtl(List<OrderPopUpTabSearchDtl> orderTabSearchDtl) {
		this.orderTabSearchDtl = orderTabSearchDtl;
	}

	
}
