package au.com.woolworths.portal.param;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReturnOrderInfoParam {

	@JsonProperty("user_id")
	private String user_id;

	@JsonProperty("pwd")
	private String pwd;

	@JsonProperty("iv_source")
	private String iv_source;

	@JsonProperty("iv_status")
	private String iv_status;

	@JsonProperty("iv_to_date")
	private String iv_to_date;

	@JsonProperty("iv_site")
	private String iv_site;

	@JsonProperty("iv_from_date")
	private String iv_from_date;

	@JsonProperty("iv_page_no")
	private String iv_page_no;

	@JsonProperty("iv_created_by")
	private String iv_created_by;

	@JsonProperty("iv_supplier")
	private String iv_supplier;

	@JsonProperty("iv_records")
	private String iv_records;

	@JsonProperty("iv_order_no")
	private String iv_order_no;

	private String msg;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getIv_source() {
		return iv_source;
	}

	public void setIv_source(String iv_source) {
		this.iv_source = iv_source;
	}

	public String getIv_status() {
		return iv_status;
	}

	public void setIv_status(String iv_status) {
		this.iv_status = iv_status;
	}

	public String getIv_to_date() {
		return iv_to_date;
	}

	public void setIv_to_date(String iv_to_date) {
		this.iv_to_date = iv_to_date;
	}

	public String getIv_site() {
		return iv_site;
	}

	public void setIv_site(String iv_site) {
		this.iv_site = iv_site;
	}

	public String getIv_from_date() {
		return iv_from_date;
	}

	public void setIv_from_date(String iv_from_date) {
		this.iv_from_date = iv_from_date;
	}

	public String getIv_page_no() {
		return iv_page_no;
	}

	public void setIv_page_no(String iv_page_no) {
		this.iv_page_no = iv_page_no;
	}

	public String getIv_created_by() {
		return iv_created_by;
	}

	public void setIv_created_by(String iv_created_by) {
		this.iv_created_by = iv_created_by;
	}

	public String getIv_supplier() {
		return iv_supplier;
	}

	public void setIv_supplier(String iv_supplier) {
		this.iv_supplier = iv_supplier;
	}

	public String getIv_records() {
		return iv_records;
	}

	public void setIv_records(String iv_records) {
		this.iv_records = iv_records;
	}

	public String getIv_order_no() {
		return iv_order_no;
	}

	public void setIv_order_no(String iv_order_no) {
		this.iv_order_no = iv_order_no;
	}

}
