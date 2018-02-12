package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class InvesNoSalesDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	//A0CALDAY changes done because of After Fiori Implementation prod issue.
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

	@JsonProperty("RAUTHBY_T")
	public void setPosAuthoriser2(String posAuthoriser) {
		setPosAuthoriser( posAuthoriser);
	}
	private String posAuthoriser;

	@JsonProperty("A0RPA_RRC_T")
	public void setReason2(String reason) {
		setReason( reason);
	}
	private String reason;

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
	
	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber( cashierNumber);
	}
	private String cashierNumber;

	@JsonProperty("A0RPA_BTS2")
	public void setPosTransactionTime2(String posTransactionTime) {
		setPosTransactionTime( posTransactionTime);
	}
	private String posTransactionTime;

	@JsonProperty("RRPA_BTS2_T")
	public void setPosTransactionTime_T2(String posTransactionTime_T) {
		setPosTransactionTime_T( posTransactionTime_T);
	}
	private String posTransactionTime_T;
	
	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber( posNumber);
	}
	private String posNumber;
	
	@JsonProperty("A0RPA_TNR")
	public void setTransactionNumber2(String transactionNumber) {
		setTransactionNumber( transactionNumber);
	}
	private String transactionNumber;

	@JsonProperty("A0RPA_TTC_T")
	public void setTransactionType2(String transactionType) {
		setTransactionType( transactionType);
	}
	private String transactionType;
	
	@JsonProperty("A7YUV5W359XPW0T2YZNR4T9LA9")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;
	
	@JsonProperty("A7YUV5W359XPW0T2YZNR4T9LA9_F")
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
	 * @return the posTransactionTime_T
	 */
	public String getPosTransactionTime_T() {
		return posTransactionTime_T;
	}

	/**
	 * @param posTransactionTime_T the posTransactionTime_T to set
	 */
	public void setPosTransactionTime_T(String posTransactionTime_T) {
		this.posTransactionTime_T = posTransactionTime_T;
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
