package au.com.woolworths.portal.param;

import java.util.ArrayList;

public class AQMSubmitQueryHdrParam {

	AQMSubmitQueryHdrParam() {

	}

	public AQMSubmitQueryHdrParam(String storeNo, String salesOrg,
			String createdBy,String userFullName, String currentDate, String storeComment,
			ArrayList<AQMSubmitQueryDtlParam> aQMSubmitQueryDtl) {
		super();
		this.storeNo = storeNo;
		this.salesOrg = salesOrg;
		this.createdBy = createdBy;
		this.updateBy = createdBy;
		this.updateDate = currentDate;
		this.submitDate = currentDate;
		this.rqstUserId = userFullName;
		this.submitBy = createdBy;
		this.storeComment = storeComment;
		this.aQMSubmitQueryDtl = aQMSubmitQueryDtl;
	}

	private String storeNo;
	private String salesOrg;
	private String storeComment;
	private String submitBy;
	private String createdBy;
	private String updateBy;
	private String updateDate;
	private String submitDate;
	private String rqstUserId;
	private String queryId;
	private String queryStatus;
	private String lineItemStatusInd;
	private ArrayList<AQMSubmitQueryDtlParam> aQMSubmitQueryDtl;

	public ArrayList<AQMSubmitQueryDtlParam> getaQMSubmitQueryDtl() {
		return aQMSubmitQueryDtl;
	}

	public void setaQMSubmitQueryDtl(
			ArrayList<AQMSubmitQueryDtlParam> aQMSubmitQueryDtl) {
		this.aQMSubmitQueryDtl = aQMSubmitQueryDtl;
	}

	public String getLineItemStatusInd() {
		return lineItemStatusInd;
	}

	public void setLineItemStatusInd(String lineItemStatusInd) {
		this.lineItemStatusInd = lineItemStatusInd;
	}

	public String getUpdateBy() {
		return updateBy;
	}

	public void setUpdateBy(String updateBy) {
		this.updateBy = updateBy;
	}

	public String getUpdateDate() {
		return updateDate;
	}

	public void setUpdateDate(String updateDate) {
		this.updateDate = updateDate;
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
		if (storeComment == null || storeComment == "")
			this.storeComment = "null";
		else
			this.storeComment = storeComment;
	}

	public String getSubmitBy() {
		return submitBy;
	}

	public void setSubmitBy(String submitBy) {
		this.submitBy = submitBy;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getSubmitDate() {
		return submitDate;
	}

	public void setSubmitDate(String submitDate) {
		this.submitDate = submitDate;
	}

	public String getRqstUserId() {
		return rqstUserId;
	}

	public void setRqstUserId(String rqstUserId) {
		this.rqstUserId = rqstUserId;
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

}
