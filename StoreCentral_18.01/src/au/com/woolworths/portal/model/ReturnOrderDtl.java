package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReturnOrderDtl {

	@JsonProperty("supplier_name")
	private String supplier_name;

	@JsonProperty("reason")
	private String reason;

	@JsonProperty("qty")
	private String qty;

	@JsonProperty("auth_date")
	private String auth_date;

	@JsonProperty("source")
	private String source;

	@JsonProperty("order_no")
	private String order_no;

	@JsonProperty("creationdate")
	private String creationdate;

	@JsonProperty("auth_code")
	private String auth_code;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("description")
	private String description;

	@JsonProperty("del_reg_no")
	private String del_reg_no;

	@JsonProperty("supplier_no")
	private String supplier_no;

	@JsonProperty("submitted_by")
	private String submitted_by;

	@JsonProperty("status")
	private String status;

	@JsonProperty("article")
	private String article;

	@JsonProperty("article_count")
	private String article_count;
	
	@JsonProperty("item_number")
	private String item_number;

	/**
	 * @return the item_number
	 */
	public String getItem_number() {
		return item_number;
	}

	/**
	 * @param item_number the item_number to set
	 */
	public void setItem_number(String item_number) {
		this.item_number = item_number;
	}


	public String getSupplier_name() {
		return supplier_name;
	}

	public void setSupplier_name(String supplier_name) {
		this.supplier_name = supplier_name;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getAuth_date() {
		return auth_date;
	}

	public void setAuth_date(String auth_date) {
		this.auth_date = auth_date;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getOrder_no() {
		return order_no;
	}

	public void setOrder_no(String order_no) {
		this.order_no = order_no;
	}

	public String getCreationdate() {
		return creationdate;
	}

	public void setCreationdate(String creationdate) {
		this.creationdate = creationdate;
	}

	public String getAuth_code() {
		return auth_code;
	}

	public void setAuth_code(String auth_code) {
		this.auth_code = auth_code;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getDel_reg_no() {
		return del_reg_no;
	}

	public void setDel_reg_no(String del_reg_no) {
		this.del_reg_no = del_reg_no;
	}

	public String getSupplier_no() {
		return supplier_no;
	}

	public void setSupplier_no(String supplier_no) {
		this.supplier_no = supplier_no;
	}

	public String getSubmitted_by() {
		return submitted_by;
	}

	public void setSubmitted_by(String submitted_by) {
		this.submitted_by = submitted_by;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getArticle_count() {
		return article_count;
	}

	public void setArticle_count(String article_count) {
		this.article_count = article_count;
	}

}
