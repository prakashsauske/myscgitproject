package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleMeasurementUnitResponse {

	@JsonProperty("d")
	private ArticleMeasurementUnitResponseHelper measureResponse;

	@JsonProperty("d")
	public ArticleMeasurementUnitResponseHelper getMeasureResponse() {
		return measureResponse;
	}

	@JsonProperty("d")
	public void setMeasureResponse(
			ArticleMeasurementUnitResponseHelper measureResponse) {
		this.measureResponse = measureResponse;
	}

}
