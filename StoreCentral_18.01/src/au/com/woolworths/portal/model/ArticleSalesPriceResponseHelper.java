package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleSalesPriceResponseHelper {
	@JsonProperty("results")
	private List<ArticleSalesPriceInfo> salesPriceInfo;

	@JsonProperty("results")
	public List<ArticleSalesPriceInfo> getSalesPriceInfo() {
		return salesPriceInfo;
	}

	@JsonProperty("results")
	public void setSalesPriceInfo(List<ArticleSalesPriceInfo> salesPriceInfo) {
		this.salesPriceInfo = salesPriceInfo;
	}

}
