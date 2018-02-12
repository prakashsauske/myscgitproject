package au.com.woolworths.portal.param;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.OrderItemInfo;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReturnHdrInfoParam {

	@JsonProperty("user_id")
	private String user_id;

	@JsonProperty("pwd")
	private String pwd;

	@JsonProperty("site_no")
	private String site_no;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("typ")
	private String typ;

	@JsonProperty("po_no")
	private String po_no;

	@JsonProperty("delivery_date")
	private String delivery_date;

	@JsonProperty("roaster_date")
	private String roaster_date;

	@JsonProperty("return_flag")
	private String return_flag;

	@JsonProperty("purch_org")
	private String purch_org;

	@JsonProperty("draft")
	private String draft;

	@JsonProperty("return_po")
	private String return_po;

	@JsonProperty("auth_no")
	private String auth_no;

	@JsonProperty("consign")
	private String consign;

	@JsonProperty("vehicle")
	private String vehicle;

	@JsonProperty("carrier")
	private String carrier;

	@JsonProperty("del_reg_no")
	private String del_reg_no;

	@JsonProperty("auth_date")
	private String auth_date;

	@JsonProperty("reason")
	private String reason;

	@JsonProperty("pwrm_no")
	private String pwrm_no;

	@JsonProperty("article_list_info")
	private List<OrderItemInfo> article_list_info;

	public ReturnHdrInfoParam() {

	}

	public ReturnHdrInfoParam(String user_id, String pwd, String site_no,
			String msg, String typ, List<OrderItemInfo> article_list_info) {
		super();
		this.user_id = user_id;
		this.pwd = pwd;
		this.site_no = site_no;
		this.msg = msg;
		this.typ = typ;
		this.article_list_info = article_list_info;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getSite_no() {
		return site_no;
	}

	public void setSite_no(String site_no) {
		this.site_no = site_no;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public List<OrderItemInfo> getArticle_list_info() {
		return article_list_info;
	}

	public void setArticle_list_info(List<OrderItemInfo> article_list_info) {
		this.article_list_info = article_list_info;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getTyp() {
		return typ;
	}

	public void setTyp(String typ) {
		this.typ = typ;
	}

	public String getPo_no() {
		return po_no;
	}

	public void setPo_no(String po_no) {
		this.po_no = po_no;
	}

	public String getDelivery_date() {
		return delivery_date;
	}

	public void setDelivery_date(String delivery_date) {
		this.delivery_date = delivery_date;
	}

	public String getRoaster_date() {
		return roaster_date;
	}

	public void setRoaster_date(String roaster_date) {
		this.roaster_date = roaster_date;
	}

	public String getReturn_flag() {
		return return_flag;
	}

	public void setReturn_flag(String return_flag) {
		this.return_flag = return_flag;
	}

	public String getPurch_org() {
		return purch_org;
	}

	public void setPurch_org(String purch_org) {
		this.purch_org = purch_org;
	}

	public String getDraft() {
		return draft;
	}

	public void setDraft(String draft) {
		this.draft = draft;
	}

	public String getReturn_po() {
		return return_po;
	}

	public void setReturn_po(String return_po) {
		this.return_po = return_po;
	}

	public String getAuth_no() {
		return auth_no;
	}

	public void setAuth_no(String auth_no) {
		this.auth_no = auth_no;
	}

	public String getConsign() {
		return consign;
	}

	public void setConsign(String consign) {
		this.consign = consign;
	}

	public String getVehicle() {
		return vehicle;
	}

	public void setVehicle(String vehicle) {
		this.vehicle = vehicle;
	}

	public String getCarrier() {
		return carrier;
	}

	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	public String getDel_reg_no() {
		return del_reg_no;
	}

	public void setDel_reg_no(String del_reg_no) {
		this.del_reg_no = del_reg_no;
	}

	public String getAuth_date() {
		return auth_date;
	}

	public void setAuth_date(String auth_date) {
		this.auth_date = auth_date;
	}

	public String getReason() {
		return reason;
	}

	public void setReason(String reason) {
		this.reason = reason;
	}

	public String getPwrm_no() {
		return pwrm_no;
	}

	public void setPwrm_no(String pwrm_no) {
		this.pwrm_no = pwrm_no;
	}

}
