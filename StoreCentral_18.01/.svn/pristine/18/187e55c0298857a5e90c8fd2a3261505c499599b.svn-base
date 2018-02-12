package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;


@JsonIgnoreProperties(ignoreUnknown = true)
public class POSStarRefundDtl implements Serializable {
	
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

	@JsonProperty("A7YUV5W359XPXRKEIWM44L75DT")
	public void settValue2(String tValue) {
		settValue(tValue);
	}
	private String tValue;

	@JsonProperty("A7YUV5W359XPXRKEIWM44L75DT_F")
	public void settValueFormatted2(String tValueFormatted) {
		settValueFormatted( tValueFormatted);
	}
	private String tValueFormatted;

	
	@JsonProperty("A7YUV5W359XPXREXS1YDYRS2KG")
	public void setRefundTransaction2(String refundTransaction) {
		setRefundTransaction( refundTransaction);
	}
	private String refundTransaction;
	
	@JsonProperty("A7YUV5W359XPXREXS1YDZ2BBWG")
	public void setSalesQuantity2(String salesQuantity) {
		setSalesQuantity( salesQuantity);
	}
	private String salesQuantity;
	
	@JsonProperty("A7YUV5W359XPXREXS1YDZNFLS0")
	public void setRefundItem2(String refundItem) {
		setRefundItem( refundItem);
	}
	private String refundItem;
	
	@JsonProperty("A7YUV5W359XPXREXS1YDZY0MBK_F")
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
	 * @return the tValueFormatted
	 */
	public String gettValueFormatted() {
		return tValueFormatted;
	}


	/**
	 * @param tValueFormatted the tValueFormatted to set
	 */
	public void settValueFormatted(String tValueFormatted) {
		this.tValueFormatted = tValueFormatted;
	}


	/**
	 * @return the refundTransaction
	 */
	public String getRefundTransaction() {
		return refundTransaction;
	}


	/**
	 * @param refundTransaction the refundTransaction to set
	 */
	public void setRefundTransaction(String refundTransaction) {
		this.refundTransaction = refundTransaction;
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
	 * @return the refundItem
	 */
	public String getRefundItem() {
		return refundItem;
	}


	/**
	 * @param refundItem the refundItem to set
	 */
	public void setRefundItem(String refundItem) {
		this.refundItem = refundItem;
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

	public void add(POSStarRefundDtl obj) {
		double thisRefundItem = CommonUtils.getNumericVal(this.refundItem);
		double thisSalesQuantity = CommonUtils.getNumericVal(this.salesQuantity);
		double objRefundItem = CommonUtils.getNumericVal(obj.refundItem);
		double objSalesQuantity = CommonUtils.getNumericVal(obj.salesQuantity);
		this.refundItem = (thisRefundItem + objRefundItem)+"";
		this.salesQuantity = (thisSalesQuantity + objSalesQuantity)+"";
	}
	@Override
	public int hashCode() {
		return cashierNumber.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		boolean isEquals = false;
		if(obj!=null && obj instanceof POSStarRefundDtl) {
			POSStarRefundDtl tmpObj = (POSStarRefundDtl) obj;
			if(tmpObj.getCashierNumber()!=null && tmpObj.getCashierNumber().equals(this.cashierNumber)) {
				isEquals = true;
			}
		}
		return isEquals;
	}

	

}
