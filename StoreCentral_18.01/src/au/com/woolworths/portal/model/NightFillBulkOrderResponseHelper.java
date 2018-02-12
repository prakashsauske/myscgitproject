package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class NightFillBulkOrderResponseHelper {
	@JsonProperty("results")
	private List<NightFillBulkOrder> nightFillBulkOrder;

	public List<NightFillBulkOrder> getNightFillBulkOrder() {
		return nightFillBulkOrder;
	}

	public void setNightFillBulkOrder(List<NightFillBulkOrder> nightFillBulkOrder) {
		this.nightFillBulkOrder = nightFillBulkOrder;
	}

	

	
}
