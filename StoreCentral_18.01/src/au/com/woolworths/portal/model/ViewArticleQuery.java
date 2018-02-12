package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ViewArticleQuery {

	@JsonProperty("totalSize")
	private String totalSize;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("pageNo")
	private String pageNo;

	@JsonProperty("recorCnt")
	private String recorCnt;

	@JsonProperty("articleNo")
	private String articleNo;

	@JsonProperty("articleGtin")
	private String articleGtin;

	@JsonProperty("articleDesc")
	private String articleDesc;
	
	@JsonProperty("articleStatus")
	private String articleStatus;

	@JsonProperty("searchMode")
	private String searchMode;

	@JsonProperty("queryId")
	private String queryId;

	@JsonProperty("queryStatus")
	private String queryStatus;

	@JsonProperty("submitBy")
	private String submitBy;

	@JsonProperty("submitDate")
	private String submitDate;

	@JsonProperty("submitFromDate")
	private String submitFromDate;

	@JsonProperty("submitToDate")
	private String submitToDate;

	@JsonProperty("storeNo")
	private String storeNo;

	@JsonProperty("salesOrg")
	private String salesOrg;

	@JsonProperty("storeComment")
	private String storeComment;

	@JsonProperty("scanDesc")
	private String scanDesc;

	@JsonProperty("rcComment")
	private String rcComment;

	@JsonProperty("recCount")
	private String recCount;

	private String userName = "NON STORE PORTAL user";

	public String getTotalSize() {
		return totalSize;
	}

	public void setTotalSize(String totalSize) {
		this.totalSize = totalSize;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getRecorCnt() {
		return recorCnt;
	}

	public void setRecorCnt(String recorCnt) {
		this.recorCnt = recorCnt;
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

	public String getSubmitDate() {
		return submitDate;
	}

	public void setSubmitDate(String submitDate) {
		this.submitDate = submitDate;
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

	public String getStoreNo() {
		return storeNo;
	}

	public void setStoreNo(String storeNo) {
		this.storeNo = storeNo;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getStoreComment() {
		return storeComment;
	}

	public void setStoreComment(String storeComment) {
		this.storeComment = storeComment;
	}

	public String getScanDesc() {
		return scanDesc;
	}

	public void setScanDesc(String scanDesc) {
		this.scanDesc = scanDesc;
	}

	public String getRcComment() {
		return rcComment;
	}

	public void setRcComment(String rcComment) {
		this.rcComment = rcComment;
	}

	public String getRecCount() {
		return recCount;
	}

	public void setRecCount(String recCount) {
		this.recCount = recCount;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	/**
	 * @return the articleStatus
	 */
	public String getArticleStatus() {
		return articleStatus;
	}

	/**
	 * @param articleStatus the articleStatus to set
	 */
	public void setArticleStatus(String articleStatus) {
		this.articleStatus = articleStatus;
	}

}
