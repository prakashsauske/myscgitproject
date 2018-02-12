package au.com.woolworths.portal.pos.model;
import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class POSArticleVoidDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String transItemLine;

	
	public String getTransItemLine() {
		return transItemLine;
	}

	public void setTransItemLine(String transItemLine) {
		this.transItemLine = transItemLine;
	}

	@JsonProperty("A0CALDAY_T")
	public void setCalendarDayFrom2(String calendarDayFrom) {
		setCalendarDayFrom( calendarDayFrom);
	}
	private String calendarDayFrom;

	@JsonProperty("A0CALDAY")
	public void setCalendarDayTo2(String calendarDayTo) {
		setCalendarDayTo( calendarDayTo);
	}
	private String calendarDayTo;

	@JsonProperty("A0RPA_TNR")
	public void setTransactionNumber2(String transactionNumber) {
		setTransactionNumber( transactionNumber);
	}
	private String transactionNumber;
	
	@JsonProperty("A0MATERIAL")
	public void setArticle2(String article) {
		setArticle( article);
	}
	private String article;
	
	@JsonProperty("A0MATERIAL_T")
	public void setArticle_T2(String article_T) {
		setArticle_T( article_T);
	}
	private String article_T;
	
	@JsonProperty("A0EANUPC")
	public void setEan_upc2(String ean_upc) {
		setEan_upc( ean_upc);
	}
	private String ean_upc;
	
	@JsonProperty("A0RPA_RRC_T")
	public void setReason2(String reason) {
		setReason( reason);
	}
	private String reason;

	@JsonProperty("A0CM_CDT1_T")
	public void setDepartment2(String department) {
		setDepartment( department);
	}
	private String department;
	
	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber( posNumber);
	}
	private String posNumber;

	@JsonProperty("RCASHFNAM")
	public void setCashierFirstName2(String cashierFirstName) {
		setCashierFirstName( cashierFirstName);
	}
	private String cashierFirstName;

	@JsonProperty("RCASHLNAM")
	public void setCashierLastName2(String cashierLastName) {
		setCashierLastName( cashierLastName);
	}
	private String cashierLastName;
	
	@JsonProperty("RAUTHBY_T")
	public void setPosAuthoriser2(String posAuthoriser) {
		setPosAuthoriser( posAuthoriser);
	}
	private String posAuthoriser;

	@JsonProperty("A0RPA_RQU")
	public void setTransactionRecType2(String transactionRecType) {
		setTransactionRecType( transactionRecType);
	}
	private String transactionRecType;

	@JsonProperty("A0RPA_TTC_T")
	public void setTransactionType2(String transactionType) {
		setTransactionType( transactionType);
	}
	private String transactionType;

	@JsonProperty("A0RPA_RTC")
	public void setSalesItemType2(String salesItemType) {
		setSalesItemType( salesItemType);
	}
	private String salesItemType;

	@JsonProperty("A7YUV5W359XPXR3X6KQNLHPMGW")
	public void setSalesRetailIncT2(String salesRetailIncT) {
		setSalesRetailIncT( salesRetailIncT);
	}
	private String salesRetailIncT;
	

	
	//////////////////////////////////


	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber( cashierNumber);
	}
	private String cashierNumber;

	@JsonProperty("RRPA_BTS2_T")
	public void setPosTransactionTime2(String posTransactionTime) {
		setPosTransactionTime( posTransactionTime);
	}
	private String posTransactionTime;

	@JsonProperty("A7YUV5W359XPW0QDM59AG8OHKX")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue; 
	
	@JsonProperty("A7YUV5W359XPW0QDM59AG8OHKX_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	
	private String cashName;
	
	/**
	 * @return the cashName
	 */
	public String getCashName() {
		return cashName;
	}

	/**
	 * @param cashName the cashName to set
	 */
	public void setCashName(String cashName) {
		this.cashName = cashName;
	}

	/**
	 * @return the calendarDayFrom
	 */
	public String getCalendarDayFrom() {
		return calendarDayFrom;
	}

	/**
	 * @param calendarDayFrom the calendarDayFrom to set
	 */
	public void setCalendarDayFrom(String calendarDayFrom) {
		this.calendarDayFrom = calendarDayFrom;
	}

	/**
	 * @return the calendarDayTo
	 */
	public String getCalendarDayTo() {
		return calendarDayTo;
	}

	/**
	 * @param calendarDayTo the calendarDayTo to set
	 */
	public void setCalendarDayTo(String calendarDayTo) {
		this.calendarDayTo = calendarDayTo;
	}

	/**
	 * @return the salesItemType
	 */
	public String getSalesItemType() {
		return salesItemType;
	}

	/**
	 * @param salesItemType the salesItemType to set
	 */
	public void setSalesItemType(String salesItemType) {
		this.salesItemType = salesItemType;
	}

	/**
	 * @return the transactionRecType
	 */
	public String getTransactionRecType() {
		return transactionRecType;
	}

	/**
	 * @param transactionRecType the transactionRecType to set
	 */
	public void setTransactionRecType(String transactionRecType) {
		this.transactionRecType = transactionRecType;
	}

	/**
	 * @return the transactionType
	 */
	public String getTransactionType() {
		return transactionType;
	}

	/**
	 * @param transactionType the transactionType to set
	 */
	public void setTransactionType(String transactionType) {
		this.transactionType = transactionType;
	}

	/**
	 * @return the posAuthoriser
	 */
	public String getPosAuthoriser() {
		return posAuthoriser;
	}

	/**
	 * @param posAuthoriser the posAuthoriser to set
	 */
	public void setPosAuthoriser(String posAuthoriser) {
		this.posAuthoriser = posAuthoriser;
	}

	/**
	 * @return the reason
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * @param reason the reason to set
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}

	/**
	 * @return the cashierFirstName
	 */
	public String getCashierFirstName() {
		return cashierFirstName;
	}

	/**
	 * @param cashierFirstName the cashierFirstName to set
	 */
	public void setCashierFirstName(String cashierFirstName) {
		this.cashierFirstName = cashierFirstName;
	}

	/**
	 * @return the cashierLastName
	 */
	public String getCashierLastName() {
		return cashierLastName;
	}

	/**
	 * @param cashierLastName the cashierLastName to set
	 */
	public void setCashierLastName(String cashierLastName) {
		this.cashierLastName = cashierLastName;
	}

	/**
	 * @return the cashierNumber
	 */
	public String getCashierNumber() {
		return cashierNumber;
	}

	/**
	 * @param cashierNumber the cashierNumber to set
	 */
	public void setCashierNumber(String cashierNumber) {
		this.cashierNumber = cashierNumber;
	}

	/**
	 * @return the posTransactionTime
	 */
	public String getPosTransactionTime() {
		return posTransactionTime;
	}

	/**
	 * @param posTransactionTime the posTransactionTime to set
	 */
	public void setPosTransactionTime(String posTransactionTime) {
		this.posTransactionTime = posTransactionTime;
	}

	/**
	 * @return the posNumber
	 */
	public String getPosNumber() {
		return posNumber;
	}

	/**
	 * @param posNumber the posNumber to set
	 */
	public void setPosNumber(String posNumber) {
		this.posNumber = posNumber;
	}

	/**
	 * @return the transactionNumber
	 */
	public String getTransactionNumber() {
		return transactionNumber;
	}

	/**
	 * @param transactionNumber the transactionNumber to set
	 */
	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	/**
	 * @return the ean_upc
	 */
	public String getEan_upc() {
		return ean_upc;
	}

	/**
	 * @param ean_upc the ean_upc to set
	 */
	public void setEan_upc(String ean_upc) {
		this.ean_upc = ean_upc;
	}

	/**
	 * @return the article
	 */
	public String getArticle() {
		return article;
	}

	/**
	 * @param article the article to set
	 */
	public void setArticle(String article) {
		this.article = article;
	}

	/**
	 * @return the article_T
	 */
	public String getArticle_T() {
		return article_T;
	}

	/**
	 * @param article_T the article_T to set
	 */
	public void setArticle_T(String article_T) {
		this.article_T = article_T;
	}

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	/**
	 * @return the salesRetailIncT
	 */
	public String getSalesRetailIncT() {
		return salesRetailIncT;
	}

	/**
	 * @param salesRetailIncT the salesRetailIncT to set
	 */
	public void setSalesRetailIncT(String salesRetailIncT) {
		this.salesRetailIncT = salesRetailIncT;
	}

	/**
	 * @return the tValue
	 */
	public String gettValue() {
		return tValue;
	}

	/**
	 * @param tValue the tValue to set
	 */
	public void settValue(String tValue) {
		this.tValue = tValue;
	}

	/**
	 * @return the noDataFound
	 */
	public String getNoDataFound() {
		return noDataFound;
	}

	/**
	 * @param noDataFound the noDataFound to set
	 */
	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

}
