package au.com.woolworths.portal.pos.param;

public class MandatoryReportParam {
	private String msg;
	private String siteNo;
	private String pageNo;
	private String recCount;
	private String siteName;
	private String printReportFormat;
	private String headerDesc;
	private String headerSort;
	private String filterFlag;
	private String salesOrg;
	
	
	

	/**
	 * @return the filterFlag
	 */
	public String getFilterFlag() {
		return filterFlag;
	}
	/**
	 * @param filterFlag the filterFlag to set
	 */
	public void setFilterFlag(String filterFlag) {
		this.filterFlag = filterFlag;
	}
	/**
	 * @return the headerDesc
	 */
	public String getHeaderDesc() {
		return headerDesc;
	}
	/**
	 * @param headerDesc the headerDesc to set
	 */
	public void setHeaderDesc(String headerDesc) {
		this.headerDesc = headerDesc;
	}
	/**
	 * @return the headerSort
	 */
	public String getHeaderSort() {
		return headerSort;
	}
	/**
	 * @param headerSort the headerSort to set
	 */
	public void setHeaderSort(String headerSort) {
		this.headerSort = headerSort;
	}
	/**
	 * @return the printReportFormat
	 */
	public String getPrintReportFormat() {
		return printReportFormat;
	}
	/**
	 * @param printReportFormat the printReportFormat to set
	 */
	public void setPrintReportFormat(String printReportFormat) {
		this.printReportFormat = printReportFormat;
	}
	/**
	 * @return the siteName
	 */
	public String getSiteName() {
		return siteName;
	}
	/**
	 * @param siteName the siteName to set
	 */
	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
	public String getSiteNo() {
		return siteNo;
	}
	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}
	public String getPageNo() {
		return pageNo;
	}
	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}
	public String getRecCount() {
		return recCount;
	}
	public void setRecCount(String recCount) {
		this.recCount = recCount;
	}
	public String getSalesOrg() {
		return salesOrg;
	}
	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

}
