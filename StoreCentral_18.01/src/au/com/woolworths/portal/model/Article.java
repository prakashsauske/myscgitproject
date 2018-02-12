package au.com.woolworths.portal.model;

public class Article {
	private String articleNo, description;
	private String siteNo, salesOrg, distributionChannel;
	private String materialTypeCode, materialTypeName;
	private String merchandiseTypeCode, merchandiseTypeName;
	private String categoryId, categoryDescription, categoryHierarchyCode,
			categoryHierarchyName;
	private String measureUnitCode, measureUnitName;

	@Override
	public String toString() {
		return "Article [No: " + articleNo + ", Desc: " + description + "]";
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getDistributionChannel() {
		return distributionChannel;
	}

	public void setDistributionChannel(String distributionChannel) {
		this.distributionChannel = distributionChannel;
	}

	public String getMaterialTypeCode() {
		return materialTypeCode;
	}

	public void setMaterialTypeCode(String materialTypeCode) {
		this.materialTypeCode = materialTypeCode;
	}

	public String getMaterialTypeName() {
		return materialTypeName;
	}

	public void setMaterialTypeName(String materialTypeName) {
		this.materialTypeName = materialTypeName;
	}

	public String getMerchandiseTypeCode() {
		return merchandiseTypeCode;
	}

	public void setMerchandiseTypeCode(String merchandiseTypeCode) {
		this.merchandiseTypeCode = merchandiseTypeCode;
	}

	public String getMerchandiseTypeName() {
		return merchandiseTypeName;
	}

	public void setMerchandiseTypeName(String merchandiseTypeName) {
		this.merchandiseTypeName = merchandiseTypeName;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryDescription() {
		return categoryDescription;
	}

	public void setCategoryDescription(String categoryDescription) {
		this.categoryDescription = categoryDescription;
	}

	public String getCategoryHierarchyCode() {
		return categoryHierarchyCode;
	}

	public void setCategoryHierarchyCode(String categoryHierarchyCode) {
		this.categoryHierarchyCode = categoryHierarchyCode;
	}

	public String getCategoryHierarchyName() {
		return categoryHierarchyName;
	}

	public void setCategoryHierarchyName(String categoryHierarchyName) {
		this.categoryHierarchyName = categoryHierarchyName;
	}

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

}
