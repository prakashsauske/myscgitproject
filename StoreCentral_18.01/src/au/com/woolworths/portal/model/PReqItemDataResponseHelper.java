package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown =true)
public class PReqItemDataResponseHelper {

	@JsonProperty("results")
	private List<PReqItemData> preqItemData;

	/**
	 * @return the preqItemData
	 */
	public List<PReqItemData> getPreqItemData() {
		return preqItemData;
	}

	/**
	 * @param preqItemData the preqItemData to set
	 */
	public void setPreqItemData(List<PReqItemData> preqItemData) {
		this.preqItemData = preqItemData;
	}

	

	
}
