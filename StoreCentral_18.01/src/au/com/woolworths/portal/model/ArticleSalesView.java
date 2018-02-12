package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleSalesView {

	@JsonProperty("iv_site")
	private String siteNo;

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	@JsonProperty("article")
	private String iv_article;
	@JsonProperty("sales_org")
	private String salesOrg;
	@JsonProperty("category")
	private String category;
	@JsonProperty("cat_name")
	private String catName;
	@JsonProperty("sub_category")
	private String subCategory;
	@JsonProperty("sub_cat_name")
	private String subCatName;
	@JsonProperty("segment")
	private String segment;
	@JsonProperty("segment_name")
	private String segmentName;
	@JsonProperty("dist_channel")
	private String distChannel;

	@JsonProperty("department")
	private String department;
	@JsonProperty("dept_name")
	private String deptName;
	@JsonProperty("eas_ind")
	private String easIndicator;

	public String getEasIndicator() {
		return easIndicator;
	}

	public void setEasIndicator(String easIndicator) {
		this.easIndicator = easIndicator;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSegmentName() {
		return segmentName;
	}

	public void setSegmentName(String segmentName) {
		this.segmentName = segmentName;
	}

	public String getDistChannel() {
		return distChannel;
	}

	public void setDistChannel(String distChannel) {
		this.distChannel = distChannel;
	}

	public String getSubCatName() {
		return subCatName;
	}

	public void setSubCatName(String subCatName) {
		this.subCatName = subCatName;
	}

	public String getCatName() {
		return catName;
	}

	public void setCatName(String catName) {
		this.catName = catName;
	}

	public String getSegment() {
		return segment;
	}

	public void setSegment(String segment) {
		this.segment = segment;
	}

	public String getIv_article() {
		return iv_article;
	}

	public void setIv_article(String iv_article) {
		this.iv_article = iv_article;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

}
