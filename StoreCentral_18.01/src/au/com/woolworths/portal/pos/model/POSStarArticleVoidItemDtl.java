package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;


@JsonIgnoreProperties(ignoreUnknown = true)
public class POSStarArticleVoidItemDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	
	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber(cashierNumber);
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


	@JsonProperty("A7YUV5W359XPXREXQV2SQNXZ41")
	public void setTotal2(String total) {
		setTotal( total);
	}
	private String total;

	@JsonProperty("A7YUV5W359XPXREXQV2SQYFH8H")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;

	@JsonProperty("A7YUV5W359XPXREXQV2SQYFH8H_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;

	
	@JsonProperty("A7YUV5W359XPXREXQV2SQ2FNK1")
	public void setSalesQuantitiy2(String salesQuantitiy) {
		setSalesQuantitiy( salesQuantitiy);
	}
	private String salesQuantitiy;
	
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
	 * @return the total
	 */
	public String getTotal() {
		return total;
	}

	/**
	 * @param total the total to set
	 */
	public void setTotal(String total) {
		this.total = total;
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
	 * @return the salesQuantitiy
	 */
	public String getSalesQuantitiy() {
		return salesQuantitiy;
	}

	/**
	 * @param salesQuantitiy the salesQuantitiy to set
	 */
	public void setSalesQuantitiy(String salesQuantitiy) {
		this.salesQuantitiy = salesQuantitiy;
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
	
	public void add(POSStarArticleVoidItemDtl obj) {
		double thisTotal = CommonUtils.getNumericVal(this.total);
		double thisSalesQuantitiy = CommonUtils.getNumericVal(this.salesQuantitiy);
		double objTotal = CommonUtils.getNumericVal(obj.total);
		double objSalesQuantitiy = CommonUtils.getNumericVal(obj.salesQuantitiy);
		this.total = (thisTotal + objTotal)+"";
		this.salesQuantitiy = (thisSalesQuantitiy + objSalesQuantitiy)+"";
	}

	@Override
	public int hashCode() {
		return cashierNumber.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		boolean isEquals = false;
		if(obj!=null && obj instanceof POSStarArticleVoidItemDtl) {
			POSStarArticleVoidItemDtl tmpObj = (POSStarArticleVoidItemDtl) obj;
			if(tmpObj.getCashierNumber()!=null && tmpObj.getCashierNumber().equals(this.cashierNumber)) {
				isEquals = true;
			}
		}
		return isEquals;
	}

	

	

}
