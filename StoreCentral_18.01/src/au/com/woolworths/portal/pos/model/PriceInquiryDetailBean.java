package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class PriceInquiryDetailBean implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	//A0CALDAY changes done because of After Fiori Implementation prod issue.
	@JsonProperty("A0CALDAY")
	public void setDate2(String date) {
		setDate( date);
	}
	private String date;

	@JsonProperty("RPOSTIM")
	public void setTime2(String time) {
		setTime( time);
	}
	private String time;

	@JsonProperty("A0RPA_TNR")
	public void setTransNo2(String transNo) {
		setTransNo( transNo);
	}
	private String transNo;

	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber( posNumber);
	}
	private String posNumber;

	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber( cashierNumber);
	}
	private String cashierNumber;

	@JsonProperty("RCASHFNAM")
	public void setCashierFirstName2(String cashierFirstName) {
		setCashierFirstName(cashierFirstName);
	}
	private String cashierFirstName;

	@JsonProperty("RCASHLNAM")
	public void setCashierLastName2(String cashierLastName) {
		setCashierLastName( cashierLastName);
	}
	private String cashierLastName;

	@JsonProperty("A0MATERIAL")
	public void setArticle2(String article) {
		setArticle(article);
	}
	private String article;

	@JsonProperty("A0MATERIAL_T")
	public void setArticleT2(String articleT) {
		setArticleT(articleT);
	}
	private String articleT;

	@JsonProperty("RENQINFO_T")
	public void setArticleStatus2(String articleStatus) {
		setArticleStatus( articleStatus);
	}
	private String articleStatus;
	
	@JsonProperty("B0ZI8KYVSWSJL60ETYG0WIWP1_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound(noDataFound);
	}
	private String noDataFound;

	public String getDate() {
		return date;
	}
	public void setDate(String date) {
		this.date = date;
	}
	public String getTime() {
		return time;
	}
	public void setTime(String time) {
		this.time = time;
	}
	public String getTransNo() {
		return transNo;
	}
	public void setTransNo(String transNo) {
		this.transNo = transNo;
	}
	public String getPosNumber() {
		return posNumber;
	}
	public void setPosNumber(String posNumber) {
		this.posNumber = posNumber;
	}
	public String getCashierNumber() {
		return cashierNumber;
	}
	public void setCashierNumber(String cashierNumber) {
		this.cashierNumber = cashierNumber;
	}
	public String getCashierFirstName() {
		return cashierFirstName;
	}
	public void setCashierFirstName(String cashierFirstName) {
		this.cashierFirstName = cashierFirstName;
	}
	public String getCashierLastName() {
		return cashierLastName;
	}
	public void setCashierLastName(String cashierLastName) {
		this.cashierLastName = cashierLastName;
	}
	public String getArticle() {
		return article;
	}
	public void setArticle(String article) {
		this.article = article;
	}
	public String getArticleT() {
		return articleT;
	}
	public void setArticleT(String articleT) {
		this.articleT = articleT;
	}
	public String getArticleStatus() {
		return articleStatus;
	}
	public void setArticleStatus(String articleStatus) {
		this.articleStatus = articleStatus;
	}
	public String getNoDataFound() {
		return noDataFound;
	}
	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}
	
	}
