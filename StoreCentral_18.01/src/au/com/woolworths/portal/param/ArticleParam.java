package au.com.woolworths.portal.param;

import java.net.URL;

public class ArticleParam {
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
	private String option;
	private String msg;

	private String rangeFlag = "Y";

	private boolean rangedChk = false;

	private String hierarchyText;

	private String supplier;

	public String getHierarchyText() {
		return hierarchyText;
	}

	public void setHierarchyText(String hierarchyText) {
		this.hierarchyText = hierarchyText;
	}

	public boolean isRangedChk() {
		return rangedChk;
	}

	public void setRangedChk(boolean rangedChk) {
		this.rangedChk = rangedChk;
	}

	private boolean paginationCheck = false;

	public boolean isPaginationCheck() {
		return paginationCheck;
	}

	public void setPaginationCheck(boolean paginationCheck) {
		this.paginationCheck = paginationCheck;
	}

	public String getRangeFlag() {

		if (null == rangeFlag || rangeFlag.trim().length() == 0)
			rangeFlag = "N";
		return rangeFlag;
	}

	public void setRangeFlag(String rangeFlag) {
		this.rangeFlag = rangeFlag;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	private String value;

	private int pageNumber;
	private int recordCount;

	public int getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(int pageNumber) {
		this.pageNumber = pageNumber;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public String getGtin() {
		return gtin;
	}

	public void setGtin(String gtin) {
		this.gtin = gtin;
	}

	private String suppNo;

	private String suppName;

	private String srcOfSuppliy;

	private String gtin;

	public String getSrcOfSuppliy() {
		return srcOfSuppliy;
	}

	public void setSrcOfSuppliy(String srcOfSuppliy) {
		this.srcOfSuppliy = srcOfSuppliy;
	}

	public String getSuppNo() {
		return suppNo;
	}

	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

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

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	public void setValues(String option, String value) {

		this.articleNo = "";
		this.articleName = "";
		this.gtin = "";

		if ("number".equalsIgnoreCase(option)) {

			this.articleNo = value;

		} else if ("description".equalsIgnoreCase(option)) {

			this.articleName = value;

		} else if ("reference".equalsIgnoreCase(option)) {
			this.gtin = value;
		}

	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
}