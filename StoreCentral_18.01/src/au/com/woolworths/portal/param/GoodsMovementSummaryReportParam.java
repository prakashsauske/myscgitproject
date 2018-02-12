package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.GoodsMovementSummaryReportResult;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GoodsMovementSummaryReportParam {
	@JsonProperty("reportResult")
	private ArrayList<GoodsMovementSummaryReportResult> resultList;

	@JsonProperty("StoreNo")
	private String StoreNo;

	@JsonProperty("StoreName")
	private String StoreName;

	@JsonProperty("totalCount")
	private String totalCount;

	@JsonProperty("fromDate")
	private String fromDate;

	@JsonProperty("toDate")
	private String toDate;

	@JsonProperty("deptOrArticle")
	private String deptOrArticle;

	@JsonProperty("dept")
	private String dept;

	@JsonProperty("article")
	private String article;

	@JsonProperty("reason")
	private String reason;

	@JsonProperty("users")
	private String users;

	@JsonProperty("addCriteria")
	private String addCriteria;

	@JsonProperty("groupBy")
	private String groupBy;

	@JsonProperty("userName")
	private String userName;

	@JsonProperty("date")
	private String date;

	@JsonProperty("adjFor")
	private String adjFor;

	@JsonProperty("src")
	private String src;

	public ArrayList<GoodsMovementSummaryReportResult> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<GoodsMovementSummaryReportResult> resultList) {
		this.resultList = resultList;
	}

	public String getStoreNo() {
		return StoreNo;
	}

	public void setStoreNo(String storeNo) {
		StoreNo = storeNo;
	}

	public String getStoreName() {
		return StoreName;
	}

	public void setStoreName(String storeName) {
		StoreName = storeName;
	}

	public String getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getDeptOrArticle() {
		return deptOrArticle;
	}

	public void setDeptOrArticle(String deptOrArticle) {
		this.deptOrArticle = deptOrArticle;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}
		


	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getUsers() {
		return users;
	}

	public void setUsers(String users) {
		this.users = users;
	}

	public String getAddCriteria() {
		return addCriteria;
	}

	public void setAddCriteria(String addCriteria) {
		this.addCriteria = addCriteria;
	}

	public String getGroupBy() {
		return groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getAdjFor() {
		return adjFor;
	}

	public void setAdjFor(String adjFor) {
		this.adjFor = adjFor;
	}

	public String getSrc() {
		return src;
	}

	public void setSrc(String src) {
		this.src = src;
	}

}
