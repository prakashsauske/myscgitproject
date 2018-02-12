package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleQuantityUnit {

	@JsonProperty("article")
	private String articleNo;
	@JsonProperty("measure_unit_code")
	private String measureUnitCode;
	@JsonProperty("measure_unit_name")
	private String measureUnitName;
	@JsonProperty("base_qty_unit_ind")
	private String baseQtyUnitInd;
	@JsonProperty("supp_qty_unit_u1")
	private String suppQtyUnitu1;
	@JsonProperty("supp_qty_unit_us")
	private String suppQtyUnitus;

	public String getMeasureUnitCode() {
		return measureUnitCode;
	}

	public void setMeasureUnitCode(String measureUnitCode) {
		this.measureUnitCode = measureUnitCode;
	}

	public String getMeasureUnitName() {
		return measureUnitName;
	}

	public void setMeasureUnitName(String measureUnitName) {
		this.measureUnitName = measureUnitName;
	}

	public String getBaseQtyUnitInd() {
		return baseQtyUnitInd;
	}

	public void setBaseQtyUnitInd(String baseQtyUnitInd) {
		this.baseQtyUnitInd = baseQtyUnitInd;
	}

	public String getSuppQtyUnitu1() {
		return suppQtyUnitu1;
	}

	public void setSuppQtyUnitu1(String suppQtyUnitu1) {
		this.suppQtyUnitu1 = suppQtyUnitu1;
	}

	public String getSuppQtyUnitus() {
		return suppQtyUnitus;
	}

	public void setSuppQtyUnitus(String suppQtyUnitus) {
		this.suppQtyUnitus = suppQtyUnitus;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

}