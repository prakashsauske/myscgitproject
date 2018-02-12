package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StaffDiscountBean implements Serializable {
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

	@JsonProperty("A7YUV5W359XPXV011XTLMOW2KJ")
	public void setRepeat2(String repeat) {
		setRepeat( repeat);
	}
	private String repeat;

	@JsonProperty("A7YUV5W359XPW4PMWO8NSZZ3ER")
	public void setTotal2(String total) {
		setTotal( total);
	}
	private String total;

	@JsonProperty("A7YUV5W359XPXV011XTLMZBTHF")
	public void setQuantity2(String quantity) {
		setQuantity( quantity);
	}
	private String quantity;

	@JsonProperty("B0ZI8KYVSWSLBBMV5SVJQEJ9G_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;

	@JsonProperty("A7YUV5W359XPXV011XTLM4435V")
	public void setRepeatOneCard2(String repeatOneCard) {
		setRepeatOneCard( repeatOneCard);
	}
	private String repeatOneCard;

	@JsonProperty("A7YUV5W359XPXV011XTLMEI2V7")
	public void setQuantityOneCard2(String quantityOneCard) {
		setQuantityOneCard( quantityOneCard);
	}
	private String quantityOneCard;
	
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

	public String getRepeat() {
		return repeat;
	}

	public void setRepeat(String repeat) {
		this.repeat = repeat;
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
	public String getRepeatOneCard() {
		return repeatOneCard;
	}

	public void setRepeatOneCard(String repeatOneCard) {
		this.repeatOneCard = repeatOneCard;
	}

	public String getQuantityOneCard() {
		return quantityOneCard;
	}

	public void setQuantityOneCard(String quantityOneCard) {
		this.quantityOneCard = quantityOneCard;
	}

	public void add(StaffDiscountBean obj) {
		double thisTotal = CommonUtils.getNumericVal(this.total);
		double thisQuantity = CommonUtils.getNumericVal(this.quantity);
		double thisRepeat = CommonUtils.getNumericVal(this.repeat);
		double objTotal = CommonUtils.getNumericVal(obj.total);
		double objQuantity = CommonUtils.getNumericVal(obj.quantity);
		double objRepeat = CommonUtils.getNumericVal(obj.repeat);
		this.repeat = (thisRepeat + objRepeat)+"";
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
		if(obj!=null && obj instanceof StaffDiscountBean) {
			StaffDiscountBean tmpObj = (StaffDiscountBean) obj;
			if(tmpObj.getCashierNumber()!=null && tmpObj.getCashierNumber().equals(this.cashierNumber)) {
				isEquals = true;
			}
		}
		return isEquals;
	}
}
