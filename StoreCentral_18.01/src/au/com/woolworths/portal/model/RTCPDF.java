package au.com.woolworths.portal.model;

import java.text.DecimalFormat;
import java.text.NumberFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RTCPDF {

	NumberFormat twoDecimalformatter = new DecimalFormat("0.##");
	NumberFormat twoDecimalformatter1 = new DecimalFormat("0.00");

	@JsonProperty("site")
	private String site;

	private String fromToDate;

	@JsonProperty("department_no")
	private String department;

	@JsonProperty("department_name")
	private String departmentDesc;

	@JsonProperty("article_no")
	private String article;

	@JsonProperty("article_desc")
	private String articleDesc;

	@JsonProperty("newStdSellPrice")
	private String sellPrice;

	@JsonProperty("rtcFromPrice")
	private String rtcFrom;

	@JsonProperty("markdown_price")
	private String rtcTo;

	@JsonProperty("markdown_percentage")
	private String perc;

	@JsonProperty("markdown_value")
	private String val;

	@JsonProperty("markdown_reason_desc")
	private String reason;

	@JsonProperty("created_date_time")
	private String fromDate;

	@JsonProperty("user_id")
	private String user;

	@JsonProperty("user_name")
	private String user_name;

	private String userFinal;

	@JsonProperty("no_of_tickets")
	private String tickets;

	public String getDepartmentDesc() {
		return (departmentDesc == null ? "" : departmentDesc);
	}

	public void setDepartmentDesc(String departmentDesc) {
		this.departmentDesc = departmentDesc;
	}

	public String getTickets() {
		return (tickets == null ? "" : tickets);
	}

	public void setTickets(String tickets) {
		this.tickets = tickets;
	}

	public String getSite() {
		return (site == null ? "" : site);
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getFromToDate() {
		return (fromToDate == null ? "" : fromToDate);
	}

	public void setFromToDate(String fromToDate) {
		this.fromToDate = fromToDate;
	}

	public String getDepartment() {
		return (department == null ? "" : department);
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getArticle() {
		return (article == null ? "" : article);
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getArticleDesc() {
		return (articleDesc == null ? "" : articleDesc.replaceAll("\\s+", " "));
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getSellPrice() {
		if (!CommonUtils.isEmpty(sellPrice)) {
			sellPrice = twoDecimalformatter1.format(Double
					.parseDouble(sellPrice));
		} else {
			sellPrice = "";
		}
		return sellPrice;
	}

	public void setSellPrice(String sellPrice) {
		this.sellPrice = sellPrice;
	}

	public String getRtcFrom() {
		if (!CommonUtils.isEmpty(rtcFrom)) {
			rtcFrom = twoDecimalformatter1.format(Double.parseDouble(rtcFrom));
		} else {
			rtcFrom = "";
		}
		return rtcFrom;
	}

	public void setRtcFrom(String rtcFrom) {
		this.rtcFrom = rtcFrom;
	}

	public String getRtcTo() {
		if (!CommonUtils.isEmpty(rtcTo)) {
			rtcTo = twoDecimalformatter1.format(Double.parseDouble(rtcTo));
		} else {
			rtcTo = "";
		}
		return rtcTo;
	}

	public void setRtcTo(String rtcTo) {
		this.rtcTo = rtcTo;
	}

	public String getPerc() {
		try {
			Double.parseDouble(perc);
		} catch (Exception e) {
			perc = "0";
		}
		if (!CommonUtils.isEmpty(perc)) {
			perc = twoDecimalformatter.format(Double.parseDouble(perc));
		} else {
			perc = "0";
		}
		return perc;
	}

	public void setPerc(String perc) {
		this.perc = perc;
	}

	public String getVal() {
		return (val == null ? "" : twoDecimalformatter1.format(Double.parseDouble(val)));// for defect 7287
	}

	public void setVal(String val) {
		this.val = val;
	}

	public String getReason() {
		return (reason == null ? "" : reason);
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getFromDate() {
		return (fromDate == null ? ""
				: (fromDate.split(" ").length > 1 ? fromDate.split(" ")[0]
						+ "\n" + fromDate.split(" ")[1] : fromDate));
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getUser() {
		return (user == null ? "" : user);
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getUser_name() {
		return (user_name == null ? "" : user_name);
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getUserFinal() {
		if (!CommonUtils.isEmpty(user) && !CommonUtils.isEmpty(user_name)) {
			userFinal = user_name + "(" + user + ")";
		} else {
			userFinal = "";
		}
		return userFinal;
	}

	public void setUserFinal(String userFinal) {
		this.userFinal = userFinal;
	}

}
