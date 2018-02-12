package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;


@JsonIgnoreProperties(ignoreUnknown = true)
public class PriceMarkdownDtlAggrBean implements Serializable {
	
	/**
	 * 
	 * Do not use this class object in searching and List, Hash and Set data structures. 
	 * Also don't use the equals comparison on this object.
	 * 
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private String cashierFirstName;

	private String cashierLastName;

	private double actualSalePrice;
	
	private double markdownQtySuom;
	
	public PriceMarkdownDtlAggrBean() {
	}
	
	public PriceMarkdownDtlAggrBean(String cashierFirstName, String cashierLastName, double actualSalePrice, double markdownQtySuom) {
		this.cashierFirstName = cashierFirstName;
		this.cashierLastName = cashierLastName;
		this.actualSalePrice = actualSalePrice;
		this.markdownQtySuom = markdownQtySuom;
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

	public double getActualSalePrice() {
		return actualSalePrice;
	}

	public void setActualSalePrice(double actualSalePrice) {
		this.actualSalePrice = actualSalePrice;
	}

	public double getMarkdownQtySuom() {
		return markdownQtySuom;
	}

	public void setMarkdownQtySuom(double markdownQtySuom) {
		this.markdownQtySuom = markdownQtySuom;
	}

	@Override
	public int hashCode() {
		return ((cashierFirstName!=null?cashierFirstName:"")+(cashierLastName!=null?cashierLastName:"")).hashCode();
	}
	@Override
	public boolean equals(Object obj) {
		PriceMarkdownDtlAggrBean tmpObj = (PriceMarkdownDtlAggrBean) obj;
		if(tmpObj!=null && 
				(tmpObj == this || 
						((tmpObj.cashierFirstName == null || tmpObj.cashierFirstName == this.cashierFirstName || tmpObj.cashierFirstName.equals(this.cashierFirstName))
								&& (tmpObj.cashierLastName == null || tmpObj.cashierLastName == this.cashierLastName || tmpObj.cashierLastName.equals(this.cashierLastName))))) {
			tmpObj.actualSalePrice += this.actualSalePrice;
			tmpObj.markdownQtySuom += this.markdownQtySuom;
			return true;
		}
		return false;
	}
}
