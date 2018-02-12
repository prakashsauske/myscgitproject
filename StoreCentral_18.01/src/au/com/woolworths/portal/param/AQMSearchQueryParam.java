package au.com.woolworths.portal.param;

public class AQMSearchQueryParam {

	AQMSearchQueryParam() {
	}

	public AQMSearchQueryParam(String siteNo, Integer saleOrg, String pageNo) {
		this.siteNo = siteNo;
		this.salesOrg = saleOrg.toString();
		this.pageNo = pageNo;
	}

	private String siteNo;
	private String msg;
	private String searchByOptions;
	private String salesOrg;
	private String articleNo;
	private String articleGtin;
	private String articleDesc;
	private String articleUom;
	private String searchMode;
	private String queryId;
	private String queryStatus;
	private String submitBy;
	private String submitFromDate;
	private String submitToDate;
	private String pageNo;
	private String recordCount;
	private String option;
	private String index;
	private String uom;
	private String role;

	/**
	 * @return the role
	 */
	public String getRole() {
		return role;
	}

	/**
	 * @param role the role to set
	 */
	public void setRole(String role) {
		this.role = role;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSearchByOptions() {
		return searchByOptions;
	}

	/**
	 * @return the articleUom
	 */
	public String getArticleUom() {
		return articleUom;
	}

	/**
	 * @param articleUom the articleUom to set
	 */
	public void setArticleUom(String articleUom) {
		this.articleUom = articleUom;
	}

	public void setSearchByOptions(String searchByOptions) {
		if (searchByOptions != null && searchByOptions != "") {
			if (searchByOptions.equalsIgnoreCase("description")) {
				this.articleDesc = this.articleNo;
				this.articleNo = "null";
			} else if (searchByOptions.equalsIgnoreCase("reference")) {
				this.articleGtin = this.articleNo;
				// this.articleNo = "null";
			}

		}
		this.searchByOptions = searchByOptions;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getArticleGtin() {
		return articleGtin;
	}

	public void setArticleGtin(String articleGtin) {
		this.articleGtin = articleGtin;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getSearchMode() {
		return searchMode;
	}

	public void setSearchMode(String searchMode) {
		this.searchMode = searchMode;
	}

	public String getQueryId() {
		return queryId;
	}

	public void setQueryId(String queryId) {
		this.queryId = queryId;
	}

	public String getQueryStatus() {
		return queryStatus;
	}

	public void setQueryStatus(String queryStatus) {
		this.queryStatus = queryStatus;
	}

	public String getSubmitBy() {
		return submitBy;
	}

	public void setSubmitBy(String submitBy) {
		this.submitBy = submitBy;
	}

	public String getSubmitFromDate() {
		return submitFromDate;
	}

	public void setSubmitFromDate(String submitFromDate) {
		this.submitFromDate = submitFromDate;
	}

	public String getSubmitToDate() {
		return submitToDate;
	}

	public void setSubmitToDate(String submitToDate) {
		this.submitToDate = submitToDate;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(String recordCount) {
		this.recordCount = recordCount;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

}
