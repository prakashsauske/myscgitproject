package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ManualFuelPromotionsBean implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//A0RPA_BDD changes done because of After Fiori Implementation prod issue.
	@JsonProperty("A0RPA_BDD")
	public void setDate2(String date) {
		setDate(date);
	}

	private String date;

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

	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber(cashierNumber);
	}

	private String cashierNumber;

	@JsonProperty("RRPA_BTS2_T")
	public void setTime2(String time) {
		setTime(time);
	}

	private String time;

	@JsonProperty("A0RPA_TNR")
	public void setTransNo2(String transNo) {
		setTransNo(transNo);
	}

	private String transNo;

	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber(posNumber);
	}

	private String posNumber;

	@JsonProperty("B0ZI8KYVSWSJL2T99NTH9LDS1")
	public void setVoucherValue2(String voucherValue) {
		setVoucherValue(voucherValue);
	}

	private String voucherValue;

	@JsonProperty("B0ZI8KYVSWSLBCNYR14VEL79D_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound(noDataFound);
	}

	private String noDataFound;

	private boolean groupLastRecord;

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
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

	public String getCashierNumber() {
		return cashierNumber;
	}

	public void setCashierNumber(String cashierNumber) {
		this.cashierNumber = cashierNumber;
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

	public String getVoucherValue() {
		return voucherValue;
	}

	public void setVoucherValue(String voucherValue) {
		this.voucherValue = voucherValue;
	}

	public String getNoDataFound() {
		return noDataFound;
	}

	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

	public boolean isGroupLastRecord() {
		return groupLastRecord;
	}

	public void setGroupLastRecord(boolean groupLastRecord) {
		this.groupLastRecord = groupLastRecord;
	}

}
