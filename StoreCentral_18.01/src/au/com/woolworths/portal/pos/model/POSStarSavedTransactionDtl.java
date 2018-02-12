package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;


@JsonIgnoreProperties(ignoreUnknown = true)
public class POSStarSavedTransactionDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber( cashierNumber);
	}
	private String cashierNumber;


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

	@JsonProperty("A7YUV5W359XPXRKDL9DSCABB43")
	public void setSalesQuantity2(String salesQuantity) {
		setSalesQuantity( salesQuantity);
	}
	private String salesQuantity;

	@JsonProperty("A7YUV5W359XPW14JKJPDFAJ3EP")
	public void setSavedTransactionAmount2(String savedTransactionAmount) {
		setSavedTransactionAmount( savedTransactionAmount);
	}
	private String savedTransactionAmount;
	
	@JsonProperty("A7YUV5W359XPW14JKJPDFL43Y9")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;
	
	@JsonProperty("A7YUV5W359XPW14JKJPDFL43Y9_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	

	private String cashName;

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

	/**
	 * @return the savedTransactionAmount
	 */
	public String getSavedTransactionAmount() {
		return savedTransactionAmount;
	}


	/**
	 * @param savedTransactionAmount the savedTransactionAmount to set
	 */
	public void setSavedTransactionAmount(String savedTransactionAmount) {
		this.savedTransactionAmount = savedTransactionAmount;
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

	public String getNoDataFound() {
		return noDataFound;
	}


	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}


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

	public void add(POSStarSavedTransactionDtl obj) {
		double thisSavedTransactionAmount = CommonUtils.getNumericVal(this.savedTransactionAmount);
		double thisSalesQuantity = CommonUtils.getNumericVal(this.salesQuantity);
		double objSavedTransactionAmount = CommonUtils.getNumericVal(obj.savedTransactionAmount);
		double objSalesQuantity = CommonUtils.getNumericVal(obj.salesQuantity);
		this.savedTransactionAmount = (thisSavedTransactionAmount + objSavedTransactionAmount)+"";
		this.salesQuantity = (thisSalesQuantity + objSalesQuantity)+"";
	}

	@Override
	public int hashCode() {
		return cashierNumber.hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		boolean isEquals = false;
		if(obj!=null && obj instanceof POSStarSavedTransactionDtl) {
			POSStarSavedTransactionDtl tmpObj = (POSStarSavedTransactionDtl) obj;
			if(tmpObj.getCashierNumber()!=null && tmpObj.getCashierNumber().equals(this.cashierNumber)) {
				isEquals = true;
			}
		}
		return isEquals;
	}

}
