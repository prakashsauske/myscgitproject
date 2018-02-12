package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ArticleMeasurementUnitResponseHelper {
	@JsonProperty("results")
	private List<ArticleMeasurementUnit> measurementUnit;

	@JsonProperty("results")
	public List<ArticleMeasurementUnit> getMeasurementUnit() {
		return measurementUnit;
	}

	@JsonProperty("results")
	public void setMeasurementUnit(List<ArticleMeasurementUnit> measurementUnit) {
		this.measurementUnit = measurementUnit;
	}

}
