package au.com.woolworths.portal.model;

import java.util.List;
import org.codehaus.jackson.annotate.JsonProperty;

public class WareHouseResponseHelper {

	@JsonProperty("results")
	private List<WareHouse> wareHouseList;

	public List<WareHouse> getWareHouseList() {
		return wareHouseList;
	}

	public void setWareHouseList(List<WareHouse> wareHouseList) {
		this.wareHouseList = wareHouseList;
	}

}
