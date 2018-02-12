package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InvoiceDetailsforPO {
	

	@JsonProperty("invoice_no")
	private String invoiceNo;

	@JsonProperty("gst")
	private String gst;
	
	@JsonProperty("invoice_doc_year")
	private String ivoiceDocYear;

	@JsonProperty("iv_site")
	private String ivSite;

	@JsonProperty("invoice_tot")
	private String ivoiceTot;

	@JsonProperty("iv_order_no")
	private String ivOrderNo;
	
	
	
	
//Newly added json creator
	
	@JsonProperty("invoice_no")
	private String invoiceNo_m;

	
	@JsonProperty("invoice_doc_year")
	private String ivoiceDocYear_m;

	@JsonProperty("iv_site")
	private String ivSite_m;

	@JsonProperty("invoice_tot")
	private String ivoiceTot_m;

	@JsonProperty("iv_order_no")
	private String ivOrderNo_m;
	/**
	 * @param invoiceNo
	 * @param ivoiceDocYear
	 * @param ivSite
	 * @param ivoiceTot
	 * @param ivOrderNo
	 */
	@JsonCreator
	public InvoiceDetailsforPO(@JsonProperty("invoice_no") String invoiceNo,@JsonProperty("invoice_doc_year") String ivoiceDocYear,
			@JsonProperty("iv_site") String ivSite,@JsonProperty("invoice_tot") String ivoiceTot,@JsonProperty("iv_order_no") String ivOrderNo) {
		
		this.invoiceNo = invoiceNo;
		this.ivoiceDocYear = ivoiceDocYear;
		this.ivSite = ivSite;
		this.ivoiceTot = ivoiceTot;
		this.ivOrderNo = ivOrderNo;
		
		this.invoiceNo_m = invoiceNo;
		this.ivoiceDocYear_m = ivoiceDocYear;
		this.ivSite_m = ivSite;
		this.ivoiceTot_m = ivoiceTot;
		this.ivOrderNo_m = ivOrderNo;
	}

	/**
	 * @return the invoiceNo
	 */
	public String getInvoiceNo() {
		return invoiceNo;
	}

	/**
	 * @param invoiceNo the invoiceNo to set
	 */
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	/**
	 * @return the gst
	 */
	public String getGst() {
		return gst;
	}

	/**
	 * @param gst the gst to set
	 */
	public void setGst(String gst) {
		this.gst = gst;
	}

	/**
	 * @return the ivoiceDocYear
	 */
	public String getIvoiceDocYear() {
		return ivoiceDocYear;
	}

	/**
	 * @param ivoiceDocYear the ivoiceDocYear to set
	 */
	public void setIvoiceDocYear(String ivoiceDocYear) {
		this.ivoiceDocYear = ivoiceDocYear;
	}

	/**
	 * @return the ivSite
	 */
	public String getIvSite() {
		return ivSite;
	}

	/**
	 * @param ivSite the ivSite to set
	 */
	public void setIvSite(String ivSite) {
		this.ivSite = ivSite;
	}

	/**
	 * @return the ivoiceTot
	 */
	public String getIvoiceTot() {
		return ivoiceTot;
	}

	/**
	 * @param ivoiceTot the ivoiceTot to set
	 */
	public void setIvoiceTot(String ivoiceTot) {
		this.ivoiceTot = ivoiceTot;
	}

	/**
	 * @return the ivOrderNo
	 */
	public String getIvOrderNo() {
		return ivOrderNo;
	}

	/**
	 * @param ivOrderNo the ivOrderNo to set
	 */
	public void setIvOrderNo(String ivOrderNo) {
		this.ivOrderNo = ivOrderNo;
	}	

}
