package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleQuantityUnitResponse {

	@JsonProperty("d")
	private ArticleQuantityUnitResponseHelper quantityUnitResponseHelper;

	@JsonProperty("d")
	public ArticleQuantityUnitResponseHelper getQuantityUnitResponseHelper() {
		return quantityUnitResponseHelper;
	}

	@JsonProperty("d")
	public void setQuantityUnitResponseHelper(
			ArticleQuantityUnitResponseHelper quantityUnitResponseHelper) {
		this.quantityUnitResponseHelper = quantityUnitResponseHelper;
	}

}