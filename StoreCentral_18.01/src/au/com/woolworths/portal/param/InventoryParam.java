package au.com.woolworths.portal.param;

import java.net.URL;

public class InventoryParam {

	private String articleNo;
	private String siteNo;
	private String salesOrg;
	private String distributionChannel;
	private String articleName;
	private String categoryNo;
	private int distance;
	private int maxStores;
	private String locationResult;
	private String department;
	private String category;
	private String subCategory;
	private String segment;

	private String checkedValues;

	public String getCheckedValues() {
		return checkedValues;
	}

	public void setCheckedValues(String checkedValues) {
		this.checkedValues = checkedValues;
	}

	private String salesOrgLabel;

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getSegment() {
		return segment;
	}

	public void setSegment(String segment) {
		this.segment = segment;
	}

	public String getLocationResult() {
		return locationResult;
	}

	public void setLocationResult(String locationResult) {
		this.locationResult = locationResult;
	}

	public int getMaxStores() {
		return maxStores;
	}

	public void setMaxStores(int maxStores) {
		this.maxStores = maxStores;
	}

	public int getDistance() {
		return distance;
	}

	public void setDistance(int distance) {
		this.distance = distance;
	}

	public String getArticleName() {
		return articleName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
	}

	public String getCategoryNo() {
		return categoryNo;
	}

	public void setCategoryNo(String categoryNo) {
		this.categoryNo = categoryNo;
	}

	private URL wsdlURL;

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
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

	public URL getWsdlURL() {
		return wsdlURL;
	}

	public void setWsdlURL(URL wsdlURL) {
		this.wsdlURL = wsdlURL;
	}

	public String getSalesOrgLabel() {
		return salesOrgLabel;
	}

	public void setSalesOrgLabel(String salesOrgLabel) {
		this.salesOrgLabel = salesOrgLabel;
	}

}
