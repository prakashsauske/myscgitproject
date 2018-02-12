package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Store {

	@JsonProperty("IV_MSG")
	private String error;

	@JsonProperty("IV_TYP")
	private String type;

	@JsonProperty("iv_site_no")
	private String siteNo;
	@JsonProperty("msg")
	private String msg;
	@JsonProperty("site_no")
	private String siteNumber;
	@JsonProperty("iv_site_name")
	private String siteName;
	@JsonProperty("iv_page_no")
	private String pageNo;
	@JsonProperty("iv_records")
	private String records;
	@JsonProperty("site_name")
	private String siteDescription;

	private String salesOrg;
	private String salesOrgNm;

	// Newly added JSON Creator

	@JsonProperty("error")
	private String error_m;

	@JsonProperty("type")
	private String type_m;

	@JsonProperty("siteNo")
	private String siteNo_m;

	@JsonProperty("siteNumber")
	private String siteNumber_m;
	@JsonProperty("siteName")
	private String siteName_m;
	@JsonProperty("pageNo")
	private String pageNo_m;
	@JsonProperty("records")
	private String records_m;
	@JsonProperty("siteDescription")
	private String siteDescription_m;

	/**
	 * @param error
	 * @param type
	 * @param siteNo
	 * @param siteNumber
	 * @param siteName
	 * @param pageNo
	 * @param records
	 * @param siteDescription
	 */
	@JsonCreator
	public Store(@JsonProperty("IV_MSG") String error,
			@JsonProperty("IV_TYP") String type,
			@JsonProperty("iv_site_no") String siteNo,
			@JsonProperty("site_no") String siteNumber,
			@JsonProperty("iv_site_name") String siteName,
			@JsonProperty("iv_page_no") String pageNo,
			@JsonProperty("iv_records") String records,
			@JsonProperty("site_name") String siteDescription) {

		this.error = error;
		this.type = type;
		this.siteNo = siteNo;
		this.siteNumber = siteNumber;
		this.siteName = siteName;
		this.pageNo = pageNo;
		this.records = records;
		this.siteDescription = siteDescription;

		this.error_m = error;
		this.type_m = type;
		this.siteNo_m = siteNo;
		this.siteNumber_m = siteNumber;
		this.siteName_m = siteName;
		this.pageNo_m = pageNo;
		this.records_m = records;
		this.siteDescription_m = siteDescription;
	}

	public Store(String siteNo, String siteName, String salesOrg,
			String salesOrgNm) {
		this.siteNo = siteNo;
		this.siteName = siteName;
		this.siteNo_m = siteNo;
		this.siteName_m = siteName;
	}

	public Store() {
		// TODO Auto-generated constructor stub
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getSiteNumber() {
		return siteNumber;
	}

	public void setSiteNumber(String siteNumber) {
		this.siteNumber = siteNumber;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getRecords() {
		return records;
	}

	public void setRecords(String records) {
		this.records = records;
	}

	public String getSiteDescription() {
		return siteDescription;
	}

	public void setSiteDescription(String siteDescription) {
		this.siteDescription = siteDescription;
	}

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the salesOrg
	 */
	public String getSalesOrg() {
		return salesOrg;
	}

	/**
	 * @param salesOrg
	 *            the salesOrg to set
	 */
	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	/**
	 * @return the salesOrgNm
	 */
	public String getSalesOrgNm() {
		return salesOrgNm;
	}

	/**
	 * @param salesOrgNm
	 *            the salesOrgNm to set
	 */
	public void setSalesOrgNm(String salesOrgNm) {
		this.salesOrgNm = salesOrgNm;
	}

}
