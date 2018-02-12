package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PriceInquiryBean implements Serializable {
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

	@JsonProperty("A7YUV5W359XPXVAIJ6Z8IUO2RN")
	public void setTotal2(String total) {
		setTotal( total);
	}
	private String total;

	@JsonProperty("A7YUV5W359XPXVAIJ6Z8IK6KN7")
	public void setQuantity2(String quantity) {
		setQuantity( quantity);
	}
	private String quantity;

	@JsonProperty("B0ZI8KYVSWSLEMZ7CFG6S1M9U_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	
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

	public String getTotal() {
		return total;
	}

	public void setTotal(String total) {
		this.total = total;
	}

	public String getQuantity() {
		return quantity;
	}

	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	public String getNoDataFound() {
		return noDataFound;
	}

	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}
	public void add(PriceInquiryBean obj) {
		double thisTotal = CommonUtils.getNumericVal(this.total);
		double thisQuantity = CommonUtils.getNumericVal(this.quantity);
		double objTotal = CommonUtils.getNumericVal(obj.total);
		double objQuantity = CommonUtils.getNumericVal(obj.quantity);
		this.total = (thisTotal + objTotal)+"";
		this.quantity = (thisQuantity + objQuantity)+"";
	}
	@Override
	public int hashCode() {
		return cashierNumber.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		boolean isEquals = false;
		if(obj!=null && obj instanceof PriceInquiryBean) {
			PriceInquiryBean tmpObj = (PriceInquiryBean) obj;
			if(tmpObj.getCashierNumber()!=null && tmpObj.getCashierNumber().equals(this.cashierNumber)) {
				isEquals = true;
			}
		}
		return isEquals;
	}

}
