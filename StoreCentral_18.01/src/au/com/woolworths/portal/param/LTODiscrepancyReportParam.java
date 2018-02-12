/**
 * 
 */
package au.com.woolworths.portal.param;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xkaew
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LTODiscrepancyReportParam {
	
	@JsonProperty("iv_session_id")
	private String iv_session_id;

	@JsonProperty("iv_sales_org")
	private String iv_sales_org;

	@JsonProperty("iv_site_no")
	private String iv_site_no;

	@JsonProperty("iv_article_no")
	private String iv_article_no;

	@JsonProperty("iv_article_barcode")
	private String iv_article_barcode;

	@JsonProperty("iv_lto_id")
	private String iv_lto_id;

	@JsonProperty("iv_barcode_flag")
	private String iv_barcode_flag;

	@JsonProperty("iv_audit_flag")
	private String iv_audit_flag;

	@JsonProperty("iv_dept_id")
	private String iv_dept_id;
	
	@JsonProperty("iv_second_audit")
	private String iv_second_audit;
	

	@JsonProperty("iv_session_mntnc_flg")
	private String iv_session_mntnc_flg;

	@JsonProperty("iv_userid")
	private String iv_userid;
	
	@JsonProperty("iv_platform")
	private String iv_platform;

	/**
	 * @return the iv_session_id
	 */
	public String getIv_session_id() {
		return iv_session_id;
	}

	/**
	 * @param iv_session_id the iv_session_id to set
	 */
	public void setIv_session_id(String iv_session_id) {
		this.iv_session_id = iv_session_id;
	}

	/**
	 * @return the iv_sales_org
	 */
	public String getIv_sales_org() {
		return iv_sales_org;
	}

	/**
	 * @param iv_sales_org the iv_sales_org to set
	 */
	public void setIv_sales_org(String iv_sales_org) {
		this.iv_sales_org = iv_sales_org;
	}

	/**
	 * @return the iv_site_no
	 */
	public String getIv_site_no() {
		return iv_site_no;
	}

	/**
	 * @param iv_site_no the iv_site_no to set
	 */
	public void setIv_site_no(String iv_site_no) {
		this.iv_site_no = iv_site_no;
	}

	/**
	 * @return the iv_article_no
	 */
	public String getIv_article_no() {
		return iv_article_no;
	}

	/**
	 * @param iv_article_no the iv_article_no to set
	 */
	public void setIv_article_no(String iv_article_no) {
		this.iv_article_no = iv_article_no;
	}

	/**
	 * @return the iv_article_barcode
	 */
	public String getIv_article_barcode() {
		return iv_article_barcode;
	}

	/**
	 * @param iv_article_barcode the iv_article_barcode to set
	 */
	public void setIv_article_barcode(String iv_article_barcode) {
		this.iv_article_barcode = iv_article_barcode;
	}

	/**
	 * @return the iv_lto_id
	 */
	public String getIv_lto_id() {
		return iv_lto_id;
	}

	/**
	 * @param iv_lto_id the iv_lto_id to set
	 */
	public void setIv_lto_id(String iv_lto_id) {
		this.iv_lto_id = iv_lto_id;
	}

	/**
	 * @return the iv_barcode_flag
	 */
	public String getIv_barcode_flag() {
		return iv_barcode_flag;
	}

	/**
	 * @param iv_barcode_flag the iv_barcode_flag to set
	 */
	public void setIv_barcode_flag(String iv_barcode_flag) {
		this.iv_barcode_flag = iv_barcode_flag;
	}

	/**
	 * @return the iv_audit_flag
	 */
	public String getIv_audit_flag() {
		return iv_audit_flag;
	}

	/**
	 * @param iv_audit_flag the iv_audit_flag to set
	 */
	public void setIv_audit_flag(String iv_audit_flag) {
		this.iv_audit_flag = iv_audit_flag;
	}

	/**
	 * @return the iv_dept_id
	 */
	public String getIv_dept_id() {
		return iv_dept_id;
	}

	/**
	 * @param iv_dept_id the iv_dept_id to set
	 */
	public void setIv_dept_id(String iv_dept_id) {
		this.iv_dept_id = iv_dept_id;
	}

	/**
	 * @return the iv_second_audit
	 */
	public String getIv_second_audit() {
		return iv_second_audit;
	}

	/**
	 * @param iv_second_audit the iv_second_audit to set
	 */
	public void setIv_second_audit(String iv_second_audit) {
		this.iv_second_audit = iv_second_audit;
	}

	/**
	 * @return the iv_session_mntnc_flg
	 */
	public String getIv_session_mntnc_flg() {
		return iv_session_mntnc_flg;
	}

	/**
	 * @param iv_session_mntnc_flg the iv_session_mntnc_flg to set
	 */
	public void setIv_session_mntnc_flg(String iv_session_mntnc_flg) {
		this.iv_session_mntnc_flg = iv_session_mntnc_flg;
	}

	/**
	 * @return the iv_userid
	 */
	public String getIv_userid() {
		return iv_userid;
	}

	/**
	 * @param iv_userid the iv_userid to set
	 */
	public void setIv_userid(String iv_userid) {
		this.iv_userid = iv_userid;
	}

	/**
	 * @return the iv_platform
	 */
	public String getIv_platform() {
		return iv_platform;
	}

	/**
	 * @param iv_platform the iv_platform to set
	 */
	public void setIv_platform(String iv_platform) {
		this.iv_platform = iv_platform;
	}
	
	
	

}
