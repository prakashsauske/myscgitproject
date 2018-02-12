package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class SavedTransactionDtl implements Serializable, Cloneable {
	
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
	public void setCahierNumber2(String cahierNumber) {
		setCahierNumber( cahierNumber);
	}
	private String cahierNumber;
	
	@JsonProperty("A0PLANT")
	public void setSiteNo2(String siteNo) {
		setSiteNo( siteNo);
	}
	private String siteNo;

	@JsonProperty("A0PLANT_T")
	public void setSiteNoT2(String siteNoT) {
		setSiteNoT( siteNoT);
	}
	private String siteNoT;

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
	
	@JsonProperty("A0CM_CDT1_T")
	public void setDepartment2(String department) {
		setDepartment( department);
	}
	private String department;

	@JsonProperty("RDPTSALIN_T")
	public void setDepartmentSaleIndicator2(String departmentSaleIndicator) {
		setDepartmentSaleIndicator( departmentSaleIndicator);
	}
	private String departmentSaleIndicator;
	
	@JsonProperty("RRPA_BTS2_T")
	public void setPosTransactionTime2(String posTransactionTime) {
		setPosTransactionTime( posTransactionTime);
	}
	private String posTransactionTime;
	
	@JsonProperty("A7YUV5W359XPW0T3JX6MNB3JSZ")
	public void setSavedTransAmount2(String savedTransAmount) {
		setSavedTransAmount( savedTransAmount);
	}
	private String savedTransAmount;

	@JsonProperty("A7YUV5W359XPW0V3R0K3VPKQ2Q")
	public void setSalesQuantity2(String salesQuantity) {
		setSalesQuantity( salesQuantity);
	}
	private String salesQuantity;
	
	@JsonProperty("A7YUV5W359XPW0T3JX6NZYVOXV")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;

	@JsonProperty("A7YUV5W359XPW0T3JX6NZYVOXV_F")
	public void setNoDataFoundFormatted2(String noDataFoundFormatted) {
		setNoDataFoundFormatted( noDataFoundFormatted);
	}
	private String noDataFoundFormatted;
	
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
	 * @return the cahierNumber
	 */
	public String getCahierNumber() {
		return cahierNumber;
	}

	/**
	 * @param cahierNumber the cahierNumber to set
	 */
	public void setCahierNumber(String cahierNumber) {
		this.cahierNumber = cahierNumber;
	}

	/**
	 * @return the siteNo
	 */
	public String getSiteNo() {
		return siteNo;
	}

	/**
	 * @param siteNo the siteNo to set
	 */
	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	/**
	 * @return the siteNoT
	 */
	public String getSiteNoT() {
		return siteNoT;
	}

	/**
	 * @param siteNoT the siteNoT to set
	 */
	public void setSiteNoT(String siteNoT) {
		this.siteNoT = siteNoT;
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
	 * @return the departmentSaleIndicator
	 */
	public String getDepartmentSaleIndicator() {
		return departmentSaleIndicator;
	}

	/**
	 * @param departmentSaleIndicator the departmentSaleIndicator to set
	 */
	public void setDepartmentSaleIndicator(String departmentSaleIndicator) {
		this.departmentSaleIndicator = departmentSaleIndicator;
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
	 * @return the savedTransAmount
	 */
	public String getSavedTransAmount() {
		return savedTransAmount;
	}

	/**
	 * @param savedTransAmount the savedTransAmount to set
	 */
	public void setSavedTransAmount(String savedTransAmount) {
		this.savedTransAmount = savedTransAmount;
	}

	public String getNoDataFound() {
		return noDataFound;
	}

	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

	public String getNoDataFoundFormatted() {
		return noDataFoundFormatted;
	}

	public void setNoDataFoundFormatted(String noDataFoundFormatted) {
		this.noDataFoundFormatted = noDataFoundFormatted;
	}

	/**
	 * @return the salesQuantity
	 */
	public String getSalesQuantity() {
		return salesQuantity;
	}

	/**
	 * @param salesQuantity the salesQuantity to set
	 */
	public void setSalesQuantity(String salesQuantity) {
		this.salesQuantity = salesQuantity;
	}

	/*public Object clone() {
		try {
			return super.clone();
		} catch (Exception e) {
			return null;
		}
	}*/

	
	
}
