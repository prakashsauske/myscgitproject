package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;


@JsonIgnoreProperties(ignoreUnknown = true)
public class POSStarNoSalesDtl implements Serializable {
	
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

	@JsonProperty("A7YUV5W359XPXREXRH2XEONFNL")
	public void setSalesUnit2(String salesUnit) {
		setSalesUnit( salesUnit);
	}
	private String salesUnit;

	@JsonProperty("A7YUV5W359XPXREXRH2XFJTERL")
	public void setNoSales2(String noSales) {
		setNoSales( noSales);
	}
	private String noSales;
	
	@JsonProperty("A7YUV5W359XPXREXRH2XFUSGZL")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;
	
	@JsonProperty("A7YUV5W359XPXREXRH2XFUSGZL_F")
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
	 * @return the salesUnit
	 */
	public String getSalesUnit() {
		return salesUnit;
	}


	/**
	 * @param salesUnit the salesUnit to set
	 */
	public void setSalesUnit(String salesUnit) {
		this.salesUnit = salesUnit;
	}

	/**
	 * @return the noSales
	 */
	public String getNoSales() {
		return noSales;
	}


	/**
	 * @param noSales the noSales to set
	 */
	public void setNoSales(String noSales) {
		this.noSales = noSales;
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
	public void add(POSStarNoSalesDtl obj) {
		double thisSalesUnit = CommonUtils.getNumericVal(this.salesUnit);
		double objSalesUnit = CommonUtils.getNumericVal(obj.salesUnit);
		this.salesUnit = (thisSalesUnit + objSalesUnit)+"";
	}

	@Override
	public int hashCode() {
		return cashierNumber.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		boolean isEquals = false;
		if(obj!=null && obj instanceof POSStarNoSalesDtl) {
			POSStarNoSalesDtl tmpObj = (POSStarNoSalesDtl) obj;
			if(tmpObj.getCashierNumber()!=null && tmpObj.getCashierNumber().equals(this.cashierNumber)) {
				isEquals = true;
			}
		}
		return isEquals;
	}

	
	

}
