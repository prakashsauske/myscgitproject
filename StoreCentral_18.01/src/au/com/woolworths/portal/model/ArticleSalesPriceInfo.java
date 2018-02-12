package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleSalesPriceInfo {

	@JsonProperty("article")
	private String article;
	@JsonProperty("prod_std_id")
	private String productId;
	@JsonProperty("measure_unit_code")
	private String measurementUnitCode;
	@JsonProperty("measure_unit_name")
	private String measurementUnitName;
	@JsonProperty("dist_channel_code")
	private String distanceChannelCode;
	@JsonProperty("dist_channel_name")
	private String distanceChannelName;
	@JsonProperty("sales_org_id")
	private String salesOrgId;
	@JsonProperty("sales_org_formatted_n")
	private String salesOrgFormatted;
	@JsonProperty("plant_id")
	private String plantId;
	@JsonProperty("plant_name")
	private String plantName;
	@JsonProperty("start_date")
	private String startDate;
	@JsonProperty("end_date")
	private String endDate;
	@JsonProperty("price_spec_element_t1")
	private String priceSpecElement1;
	@JsonProperty("price_spec_element_ty")
	private String priceSpecElement2;
	@JsonProperty("price_spec_element_c1")
	private String priceSpecElement3;
	@JsonProperty("price_spec_element_ca")
	private String priceSpecElement4;
	@JsonProperty("sales_price_spec_lvl_code")
	private String salesPriceSpecLevelCode;
	@JsonProperty("sales_price_spec_lvl_name")
	private String salesPriceSpecLevelName;

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getProductId() {
		return productId;
	}

	public void setProductId(String productId) {
		this.productId = productId;
	}

	public String getMeasurementUnitCode() {
		return measurementUnitCode;
	}

	public void setMeasurementUnitCode(String measurementUnitCode) {
		this.measurementUnitCode = measurementUnitCode;
	}

	public String getMeasurementUnitName() {
		return measurementUnitName;
	}

	public void setMeasurementUnitName(String measurementUnitName) {
		this.measurementUnitName = measurementUnitName;
	}

	public String getDistanceChannelCode() {
		return distanceChannelCode;
	}

	public void setDistanceChannelCode(String distanceChannelCode) {
		this.distanceChannelCode = distanceChannelCode;
	}

	public String getDistanceChannelName() {
		return distanceChannelName;
	}

	public void setDistanceChannelName(String distanceChannelName) {
		this.distanceChannelName = distanceChannelName;
	}

	public String getSalesOrgId() {
		return salesOrgId;
	}

	public void setSalesOrgId(String salesOrgId) {
		this.salesOrgId = salesOrgId;
	}

	public String getSalesOrgFormatted() {
		return salesOrgFormatted;
	}

	public void setSalesOrgFormatted(String salesOrgFormatted) {
		this.salesOrgFormatted = salesOrgFormatted;
	}

	public String getPlantId() {
		return plantId;
	}

	public void setPlantId(String plantId) {
		this.plantId = plantId;
	}

	public String getPlantName() {
		return plantName;
	}

	public void setPlantName(String plantName) {
		this.plantName = plantName;
	}

	public String getStartDate() {
		if (this.startDate != null) {
			String result = PortalUtil.convertToStandard(startDate);
			if (result != null && result != "")
				return result;
		}
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		if (this.endDate != null) {
			String result = PortalUtil.convertToStandard(endDate);
			if (result != null && result != "")
				return result;
		}
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

	public String getPriceSpecElement1() {
		return priceSpecElement1;
	}

	public void setPriceSpecElement1(String priceSpecElement1) {
		this.priceSpecElement1 = priceSpecElement1;
	}

	public String getPriceSpecElement2() {
		return priceSpecElement2;
	}

	public void setPriceSpecElement2(String priceSpecElement2) {
		this.priceSpecElement2 = priceSpecElement2;
	}

	public String getPriceSpecElement3() {
		return priceSpecElement3;
	}

	public void setPriceSpecElement3(String priceSpecElement3) {
		this.priceSpecElement3 = priceSpecElement3;
	}

	public String getPriceSpecElement4() {
		return priceSpecElement4;
	}

	public void setPriceSpecElement4(String priceSpecElement4) {
		this.priceSpecElement4 = priceSpecElement4;
	}

	public String getSalesPriceSpecLevelCode() {
		return salesPriceSpecLevelCode;
	}

	public void setSalesPriceSpecLevelCode(String salesPriceSpecLevelCode) {
		this.salesPriceSpecLevelCode = salesPriceSpecLevelCode;
	}

	public String getSalesPriceSpecLevelName() {
		return salesPriceSpecLevelName;
	}

	public void setSalesPriceSpecLevelName(String salesPriceSpecLevelName) {
		this.salesPriceSpecLevelName = salesPriceSpecLevelName;
	}

}
