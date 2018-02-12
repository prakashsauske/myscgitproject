package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleBasicViewDetails {

	@JsonProperty("article")
	private String articleNo;
	@JsonProperty("description")
	private String description;
	@JsonProperty("scan_description")
	private String scanDescription;
	@JsonProperty("brand_id")
	private String brandId;
	@JsonProperty("brand_name")
	private String brandName;
	@JsonProperty("comp_price_unit")
	private String compPriceUnit;
	@JsonProperty("comp_size_au")
	private String compSizeAu;
	@JsonProperty("comp_size_au_uom")
	private String compSizeAuUom;
	@JsonProperty("comp_size_nz")
	private String compSizeNz;
	@JsonProperty("comp_size_nz_uom")
	private String compSizeNzUom;
	@JsonProperty("min_value")
	private String minValue;

	@JsonProperty("iv_hier_node")
	private String hierarchyNode;

	@JsonProperty("max_value")
	private String maxValue;
	@JsonProperty("expiry_period_typ")
	private String expiryPeriodType;
	@JsonProperty("expiry_period")
	private String expiryPeriod;

	public String getArticleNo() {
		if (articleNo != null) {
			// //System.out.println("**** BEAN "+articleNo.replaceFirst("^0+(?!$)",
			// ""));
			articleNo.replaceFirst("^0+(?!$)", "");
		}
		return articleNo;
	}

	public void setArticleNo(String articleNo) {

		if (articleNo != null) {
			articleNo.replaceFirst("^0+(?!$)", "");
		}
		this.articleNo = articleNo;
	}

	public String getDescription() {

		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getScanDescription() {
		return scanDescription;
	}

	public void setScanDescription(String scanDescription) {
		this.scanDescription = scanDescription;
	}

	public String getBrandId() {
		return brandId;
	}

	public void setBrandId(String brandId) {
		this.brandId = brandId;
	}

	public String getBrandName() {
		return brandName;
	}

	public void setBrandName(String brandName) {
		this.brandName = brandName;
	}

	public String getCompPriceUnit() {
		return compPriceUnit;
	}

	public void setCompPriceUnit(String compPriceUnit) {
		this.compPriceUnit = compPriceUnit;
	}

	public String getHierarchyNode() {
		return hierarchyNode;
	}

	public void setHierarchyNode(String hierarchyNode) {
		this.hierarchyNode = hierarchyNode;
	}

	public String getCompSizeAu() {
		return compSizeAu;
	}

	public void setCompSizeAu(String compSizeAu) {
		this.compSizeAu = compSizeAu;
	}

	public String getCompSizeAuUom() {
		return compSizeAuUom;
	}

	public void setCompSizeAuUom(String compSizeAuUom) {
		this.compSizeAuUom = compSizeAuUom;
	}

	public String getCompSizeNz() {
		return compSizeNz;
	}

	public void setCompSizeNz(String compSizeNz) {
		this.compSizeNz = compSizeNz;
	}

	public String getCompSizeNzUom() {
		return compSizeNzUom;
	}

	public void setCompSizeNzUom(String compSizeNzUom) {
		this.compSizeNzUom = compSizeNzUom;
	}

	public String getMinValue() {
		return minValue;
	}

	public void setMinValue(String minValue) {
		this.minValue = minValue;
	}

	public String getMaxValue() {
		return maxValue;
	}

	public void setMaxValue(String maxValue) {
		this.maxValue = maxValue;
	}

	public String getExpiryPeriodType() {
		return expiryPeriodType;
	}

	public void setExpiryPeriodType(String expiryPeriodType) {
		this.expiryPeriodType = expiryPeriodType;
	}

	public String getExpiryPeriod() {
		return expiryPeriod;
	}

	public void setExpiryPeriod(String expiryPeriod) {
		this.expiryPeriod = expiryPeriod;
	}

}
