package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class POSResponseHelper {
	@JsonProperty("results")
	private List<POSData> articlesposData;

	@JsonProperty("results")
	public List<POSData> getArticleposData() {
		return articlesposData;
	}

	@JsonProperty("results")
	public void setArticleposData(List<POSData> articlesposData) {
		this.articlesposData = articlesposData;
	}

}
