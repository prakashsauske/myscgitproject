package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ProduceLoadListResponseHelper {
	@JsonProperty("results")
	private List<ProduceLoadListInfo> produceLoadListSearch;

	@JsonProperty("results")
	public List<ProduceLoadListInfo> getProduceLoadListSearch() {
		return produceLoadListSearch;
	}

	@JsonProperty("results")
	public void setProduceLoadListSearch(
			List<ProduceLoadListInfo> produceLoadListSearch) {
		this.produceLoadListSearch = produceLoadListSearch;
	}
}
