package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StarPriceMarkDownBean  implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@JsonProperty("RCASHFNAM")
	public void setCashierFirstName2(String cashierFirstName) {
		setCashierFirstName(cashierFirstName);
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

	@JsonProperty("A7YUV5W359XPW16PKTF4PNYXOJ")
	public void setActualSalePrice2(String actualSalePrice) {
		setActualSalePrice( actualSalePrice);
	}
	private String actualSalePrice;

	@JsonProperty("A7YUV5W359XPXRHOZVT3T3I5MS")
	public void setMarkdownQtySuom2(String markdownQtySuom) {
		setMarkdownQtySuom( markdownQtySuom);
	}
	private String markdownQtySuom;
	
	
	@JsonProperty("A7YUV5W359XPXR9I0X85U3NOXV")
	public void setPriceDifference2(String priceDifference) {
		setPriceDifference(priceDifference);
	}
	private String priceDifference;
	
	
	@JsonProperty("A7YUV5W359XPXR9I0X85V9CXDV_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound(noDataFound);
	}
	private String noDataFound;

	private String cashName;

	public String getCashierFirstName() {
		return cashierFirstName;
	}
	public String getCashierLastName() {
		return cashierLastName;
	}
	public String getCashierNumber() {
		return cashierNumber;
	}
	public String getActualSalePrice() {
		return actualSalePrice;
	}
	public String getMarkdownQtySuom() {
		return markdownQtySuom;
	}
	public String getNoDataFound() {
		return noDataFound;
	}
	public void setCashierFirstName(String cashierFirstName) {
		this.cashierFirstName = cashierFirstName;
	}
	public void setCashierLastName(String cashierLastName) {
		this.cashierLastName = cashierLastName;
	}
	public void setCashierNumber(String cashierNumber) {
		this.cashierNumber = cashierNumber;
	}
	public void setActualSalePrice(String actualSalePrice) {
		this.actualSalePrice = actualSalePrice;
	}
	public void setMarkdownQtySuom(String markdownQtySuom) {
		this.markdownQtySuom = markdownQtySuom;
	}
	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}
	public String getCashName() {
		return cashName;
	}
	public void setCashName(String cashName) {
		this.cashName = cashName;
	}
	
	public String getPriceDifference() {
		return priceDifference;
	}
	public void setPriceDifference(String priceDifference) {
		this.priceDifference = priceDifference;
	}
	public void add(StarPriceMarkDownBean obj) {
		double thisActualSalePrice = CommonUtils.getNumericVal(this.actualSalePrice);
		double thisMarkdownQtySuom = CommonUtils.getNumericVal(this.markdownQtySuom);
		double thisPriceDifference = CommonUtils.getNumericVal(this.priceDifference);
		double objActualSalePrice = CommonUtils.getNumericVal(obj.actualSalePrice);
		double objMarkdownQtySuom = CommonUtils.getNumericVal(obj.markdownQtySuom);
		double objPriceDifference = CommonUtils.getNumericVal(obj.priceDifference);
		this.actualSalePrice = (thisActualSalePrice + objActualSalePrice)+"";
		this.markdownQtySuom = (thisMarkdownQtySuom + objMarkdownQtySuom)+"";
		this.priceDifference = (thisPriceDifference + objPriceDifference)+"";
	}
	@Override
	public int hashCode() {
		return cashName==null?0:cashName.hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		boolean isEquals = false;
		if(obj!=null && obj instanceof StarPriceMarkDownBean) {
			StarPriceMarkDownBean tmpObj = (StarPriceMarkDownBean) obj;
			if(tmpObj.getCashName()!=null && tmpObj.getCashName().equals(this.cashName)) {
				isEquals = true;
			}
		}
		return isEquals;
	}

}
