package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InvoiceDetailsforPOResponse {

	@JsonProperty("d")
	private InvoiceDetailsforPOResponseHelper invoiceDetailsforPOResponseHelper;

	/**
	 * @return the invoiceDetailsforPOResponseHelper
	 */
	public InvoiceDetailsforPOResponseHelper getInvoiceDetailsforPOResponseHelper() {
		return invoiceDetailsforPOResponseHelper;
	}

	/**
	 * @param invoiceDetailsforPOResponseHelper the invoiceDetailsforPOResponseHelper to set
	 */
	public void setInvoiceDetailsforPOResponseHelper(
			InvoiceDetailsforPOResponseHelper invoiceDetailsforPOResponseHelper) {
		this.invoiceDetailsforPOResponseHelper = invoiceDetailsforPOResponseHelper;
	}

	

}
