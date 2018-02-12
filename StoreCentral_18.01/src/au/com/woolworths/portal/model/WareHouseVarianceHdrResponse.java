package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class WareHouseVarianceHdrResponse {

	@JsonProperty("d")
	private WareHouseVarianceHdrResponseHelper wareHouseVarianceHdrResponseHelper;

	public WareHouseVarianceHdrResponseHelper getWareHouseVarianceHdrResponseHelper() {
		return wareHouseVarianceHdrResponseHelper;
	}

	public void setWareHouseVarianceHdrResponseHelper(
			WareHouseVarianceHdrResponseHelper wareHouseVarianceHdrResponseHelper) {
		this.wareHouseVarianceHdrResponseHelper = wareHouseVarianceHdrResponseHelper;
	}

}
