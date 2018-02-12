package au.com.woolworths.portal.param;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LTOPrintBarcodeParam {
	

	@JsonProperty("reportResult")
	private List<String> resultList=new ArrayList<String>();

	public List<String> getResultList() {
		return resultList;
	}

	public void setResultList(List<String> resultList) {
		this.resultList = resultList;
	}
	
	
}
