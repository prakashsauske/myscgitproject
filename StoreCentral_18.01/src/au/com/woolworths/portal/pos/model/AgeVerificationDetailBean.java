package au.com.woolworths.portal.pos.model;

import java.io.Serializable;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonDeserialize;
import org.codehaus.jackson.map.annotate.JsonSerialize;

import au.com.woolworths.portal.util.JsonDateDeserializer;
import au.com.woolworths.portal.util.JsonDateSerializer;
import au.com.woolworths.portal.util.JsonMilliSecToDateDeserialiser;
import au.com.woolworths.portal.util.JsonTimeDeserializer;
import au.com.woolworths.portal.util.JsonTimeSerializer;

@JsonIgnoreProperties(ignoreUnknown = true)
public class AgeVerificationDetailBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	//A0CALDAY changes done because of After Fiori Implementation prod issue.
	@JsonProperty("A0CALDAY_T")
	public void setCalendarDayTo2(String calendarDayTo) {
		setCalendarDayTo(calendarDayTo);
	}
	private String calendarDayTo;

	@JsonProperty("A0CALDAY")
	@JsonDeserialize(using = JsonMilliSecToDateDeserialiser.class)
	public void setDate2(Date date) {
		setDate(date);
	}
	private Date date;

	@JsonProperty("RCASHFNAM")
	public void setCashierFirstName2(String cashierFirstName) {
		setCashierFirstName(cashierFirstName);
	}
	private String cashierFirstName;

	@JsonProperty("RCASHLNAM")
	public void setCashierLastName2(String cashierLastName) {
		setCashierLastName(cashierLastName);
	}
	private String cashierLastName;

	@JsonProperty("A0RPA_TNR")
	public void setTransactionNumber2(String transactionNumber) {
		setTransactionNumber(transactionNumber);
	}
	private String transactionNumber;

	@JsonProperty("RBEGINT")
	@JsonDeserialize(using = JsonTimeDeserializer.class)
	public void setTime2(String time) {
		setTime(time);
	}
	private String time;

	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber(posNumber);
	}
	private String posNumber;
	
	@JsonProperty("RKEYDAT")
	@JsonDeserialize(using = JsonDateDeserializer.class)
	public void setAgeVerificationDateKeyed2(Date ageVerificationDateKeyed) {
		setAgeVerificationDateKeyed(ageVerificationDateKeyed);
	}
	private Date ageVerificationDateKeyed;

	@JsonProperty("RISAPROVE_T")
	public void setAgeVerificationResult2(String ageVerificationResult) {
		setAgeVerificationResult(ageVerificationResult);
	}
	private String ageVerificationResult;
	
	@JsonProperty("B0ZI8KYVSWSLF8TRC83GX6IGW_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound(noDataFound);
	}
	private String noDataFound;
	
	private Date dateTime;

	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getDate() {
		return date;
	}

	public void setDate(Date date) {
		this.date = date;
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

	public String getTransactionNumber() {
		return transactionNumber;
	}

	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	@JsonSerialize(using = JsonTimeSerializer.class)
	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getPosNumber() {
		return posNumber;
	}

	public void setPosNumber(String posNumber) {
		this.posNumber = posNumber;
	}

	@JsonSerialize(using = JsonDateSerializer.class)
	public Date getAgeVerificationDateKeyed() {
		return ageVerificationDateKeyed;
	}

	public void setAgeVerificationDateKeyed(Date ageVerificationDateKeyed) {
		this.ageVerificationDateKeyed = ageVerificationDateKeyed;
	}

	public String getAgeVerificationResult() {
		return ageVerificationResult;
	}

	public void setAgeVerificationResult(String ageVerificationResult) {
		this.ageVerificationResult = ageVerificationResult;
	}

	public String getNoDataFound() {
		return noDataFound;
	}

	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

	public Date getDateTime() {
		return dateTime;
	}

	public void setDateTime(Date dateTime) {
		this.dateTime = dateTime;
	}

	public String getCalendarDayTo() {
		return calendarDayTo;
	}

	public void setCalendarDayTo(String calendarDayTo) {
		this.calendarDayTo = calendarDayTo;
	}
}
