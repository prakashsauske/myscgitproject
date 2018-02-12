package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticlePurchasingView {

	@JsonProperty("article")
	private String articleNo;
	@JsonProperty("site")
	private String siteNo;
	@JsonProperty("vendor")
	private String vendor;
	@JsonProperty("vendor_desc")
	private String vendorDesc;
	@JsonProperty("valid_from")
	private String validFrom;
	@JsonProperty("valid_to")
	private String validTo;
	@JsonProperty("fixed_vendor")
	private String fixedVendor;

	public String getVendorDesc() {
		return vendorDesc;
	}

	public void setVendorDesc(String vendorDesc) {
		this.vendorDesc = vendorDesc;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getVendor() {
		return vendor;
	}

	public void setVendor(String vendor) {
		this.vendor = vendor;
	}

	public String getValidFrom() {
		return validFrom;
	}

	public void setValidFrom(String validFrom) {
		this.validFrom = validFrom;
	}

	public String getValidTo() {
		return validTo;
	}

	public void setValidTo(String validTo) {
		this.validTo = validTo;
	}

	public String getFixedVendor() {
		return fixedVendor;
	}

	public void setFixedVendor(String fixedVendor) {
		this.fixedVendor = fixedVendor;
	}

}