package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationPrintHdrParam {
	
	@JsonProperty("locationDtlParamList")
	private ArrayList<LocationPrintrDtlParam> locationDtlParamList;
	
	public ArrayList<LocationPrintrDtlParam> getLocationDtlParamList() {
		return locationDtlParamList;
	}

	public void setLocationDtlParamList(ArrayList<LocationPrintrDtlParam> locationDtlParamList) {
		this.locationDtlParamList = locationDtlParamList;
	}

	
}
