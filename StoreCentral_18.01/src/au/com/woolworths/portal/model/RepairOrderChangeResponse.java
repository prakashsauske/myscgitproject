package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RepairOrderChangeResponse {

	@JsonProperty("IV_SERVICE_ORD_NO")
	private String iv_service_ord_no;

	@JsonProperty("IV_SITE")
	private String iv_site;

	@JsonProperty("IV_CUST_NAME")
	private String iv_cust_name;

	@JsonProperty("IV_CUST_CONTACT_NO")
	private String iv_cust_contact_no;

	@JsonProperty("IV_CUST_ADDR")
	private String iv_cust_addr;

	@JsonProperty("IV_CUST_POST_CODE")
	private String iv_cust_post_code;

	@JsonProperty("IV_STORE_CONTACT_NAME")
	private String iv_store_contact_name;

	@JsonProperty("IV_REMARKS")
	private String iv_remarks;

	@JsonProperty("IV_REPAIR_CHARGE")
	private String iv_repair_charge;

	@JsonProperty("IV_REPAIR_DETAIL")
	private String iv_repari_detail;

	@JsonProperty("IV_WARRANTY")
	private String iv_warranty;

	@JsonProperty("IV_PROOF_OF_PURCHASE")
	private String iv_proof_of_purchase;

	@JsonProperty("IV_DATE_OF_PURCHASE")
	private String iv_date_of_purchase;

	@JsonProperty("IV_STOCK_TYPE")
	private String iv_stock_type;

	@JsonProperty("IV_CONTACT_METHOD")
	private String iv_contact_method;

	@JsonProperty("IV_MAIL_ID")
	private String iv_mail_id;

	@JsonProperty("IV_AUTH_CODE")
	private String iv_auth_code;

	@JsonProperty("IV_AUTHORITY_NAME")
	private String iv_authority_name;

	@JsonProperty("IV_GOODS_PICK_UP_DATE")
	private String iv_goods_pick_up_date;

	@JsonProperty("IV_CARRIER_NAME")
	private String iv_carrier_name;

	@JsonProperty("IV_CONSIGNEMENT_NOTE")
	private String iv_consignement_note;

	@JsonProperty("IV_CARRIER_CONTACT")
	private String iv_carrier_contact;

	@JsonProperty("IV_CLOSURE_ACT_CODE")
	private String iv_closure_act_code;

	@JsonProperty("IV_STORE_CONTACT_NO")
	private String iv_store_contact_no;

	@JsonProperty("IV_ACTUAL_COMP_DATE")
	private String iv_actual_comp_date;

	@JsonProperty("IV_EXP_RESOLUTION_DATE")
	private String iv_exp_resolution_date;

	@JsonProperty("IV_FOLLOW_UP_DATE")
	private String iv_follow_up_date;

	@JsonProperty("IV_COST_BORNE_BY")
	private String iv_cost_borne_by;

	@JsonProperty("IV_TEST")
	private String iv_test;

	@JsonProperty("IV_TYP")
	private String iv_typ;

	@JsonProperty("IV_MSG")
	private String iv_msg;

	@JsonProperty("POItems")
	private POItemsHolder poItemsHolder;

	private ArrayList<RepairPOItems> poItems;

	public String getIv_service_ord_no() {
		return iv_service_ord_no;
	}

	public void setIv_service_ord_no(String iv_service_ord_no) {
		this.iv_service_ord_no = iv_service_ord_no;
	}

	public String getIv_site() {
		return iv_site;
	}

	public void setIv_site(String iv_site) {
		this.iv_site = iv_site;
	}

	public String getIv_cust_name() {
		return iv_cust_name;
	}

	public void setIv_cust_name(String iv_cust_name) {
		this.iv_cust_name = iv_cust_name;
	}

	public String getIv_cust_contact_no() {
		return iv_cust_contact_no;
	}

	public void setIv_cust_contact_no(String iv_cust_contact_no) {
		this.iv_cust_contact_no = iv_cust_contact_no;
	}

	public String getIv_cust_addr() {
		return iv_cust_addr;
	}

	public void setIv_cust_addr(String iv_cust_addr) {
		this.iv_cust_addr = iv_cust_addr;
	}

	public String getIv_cust_post_code() {
		return iv_cust_post_code;
	}

	public void setIv_cust_post_code(String iv_cust_post_code) {
		this.iv_cust_post_code = iv_cust_post_code;
	}

	public String getIv_store_contact_name() {
		return iv_store_contact_name;
	}

	public void setIv_store_contact_name(String iv_store_contact_name) {
		this.iv_store_contact_name = iv_store_contact_name;
	}

	public String getIv_remarks() {
		return iv_remarks;
	}

	public void setIv_remarks(String iv_remarks) {
		this.iv_remarks = iv_remarks;
	}

	public String getIv_repair_charge() {
		return iv_repair_charge;
	}

	public void setIv_repair_charge(String iv_repair_charge) {
		this.iv_repair_charge = iv_repair_charge;
	}

	public String getIv_repari_detail() {
		return iv_repari_detail;
	}

	public void setIv_repari_detail(String iv_repari_detail) {
		this.iv_repari_detail = iv_repari_detail;
	}

	public String getIv_warranty() {
		return iv_warranty;
	}

	public void setIv_warranty(String iv_warranty) {
		this.iv_warranty = iv_warranty;
	}

	public String getIv_proof_of_purchase() {
		return iv_proof_of_purchase;
	}

	public void setIv_proof_of_purchase(String iv_proof_of_purchase) {
		this.iv_proof_of_purchase = iv_proof_of_purchase;
	}

	public String getIv_date_of_purchase() {
		return iv_date_of_purchase;
	}

	public void setIv_date_of_purchase(String iv_date_of_purchase) {
		this.iv_date_of_purchase = iv_date_of_purchase;
	}

	public String getIv_stock_type() {
		return iv_stock_type;
	}

	public void setIv_stock_type(String iv_stock_type) {
		this.iv_stock_type = iv_stock_type;
	}

	public String getIv_contact_method() {
		return iv_contact_method;
	}

	public void setIv_contact_method(String iv_contact_method) {
		this.iv_contact_method = iv_contact_method;
	}

	public String getIv_mail_id() {
		return iv_mail_id;
	}

	public void setIv_mail_id(String iv_mail_id) {
		this.iv_mail_id = iv_mail_id;
	}

	public String getIv_auth_code() {
		return iv_auth_code;
	}

	public void setIv_auth_code(String iv_auth_code) {
		this.iv_auth_code = iv_auth_code;
	}

	public String getIv_authority_name() {
		return iv_authority_name;
	}

	public void setIv_authority_name(String iv_authority_name) {
		this.iv_authority_name = iv_authority_name;
	}

	public String getIv_goods_pick_up_date() {
		return iv_goods_pick_up_date;
	}

	public void setIv_goods_pick_up_date(String iv_goods_pick_up_date) {
		this.iv_goods_pick_up_date = iv_goods_pick_up_date;
	}

	public String getIv_carrier_name() {
		return iv_carrier_name;
	}

	public void setIv_carrier_name(String iv_carrier_name) {
		this.iv_carrier_name = iv_carrier_name;
	}

	public String getIv_consignement_note() {
		return iv_consignement_note;
	}

	public void setIv_consignement_note(String iv_consignement_note) {
		this.iv_consignement_note = iv_consignement_note;
	}

	public String getIv_carrier_contact() {
		return iv_carrier_contact;
	}

	public void setIv_carrier_contact(String iv_carrier_contact) {
		this.iv_carrier_contact = iv_carrier_contact;
	}

	public String getIv_closure_act_code() {
		return iv_closure_act_code;
	}

	public void setIv_closure_act_code(String iv_closure_act_code) {
		this.iv_closure_act_code = iv_closure_act_code;
	}

	public String getIv_store_contact_no() {
		return iv_store_contact_no;
	}

	public void setIv_store_contact_no(String iv_store_contact_no) {
		this.iv_store_contact_no = iv_store_contact_no;
	}

	public String getIv_actual_comp_date() {
		return iv_actual_comp_date;
	}

	public void setIv_actual_comp_date(String iv_actual_comp_date) {
		this.iv_actual_comp_date = iv_actual_comp_date;
	}

	public String getIv_exp_resolution_date() {
		return iv_exp_resolution_date;
	}

	public void setIv_exp_resolution_date(String iv_exp_resolution_date) {
		this.iv_exp_resolution_date = iv_exp_resolution_date;
	}

	public String getIv_follow_up_date() {
		return iv_follow_up_date;
	}

	public void setIv_follow_up_date(String iv_follow_up_date) {
		this.iv_follow_up_date = iv_follow_up_date;
	}

	public String getIv_cost_borne_by() {
		return iv_cost_borne_by;
	}

	public void setIv_cost_borne_by(String iv_cost_borne_by) {
		this.iv_cost_borne_by = iv_cost_borne_by;
	}

	public String getIv_test() {
		return iv_test;
	}

	public void setIv_test(String iv_test) {
		this.iv_test = iv_test;
	}

	public String getIv_typ() {
		return iv_typ;
	}

	public void setIv_typ(String iv_typ) {
		this.iv_typ = iv_typ;
	}

	public String getIv_msg() {
		return iv_msg;
	}

	public void setIv_msg(String iv_msg) {
		this.iv_msg = iv_msg;
	}

	public POItemsHolder getPoItemsHolder() {
		return poItemsHolder;
	}

	public void setPoItemsHolder(POItemsHolder poItemsHolder) {
		this.poItemsHolder = poItemsHolder;
	}

	public ArrayList<RepairPOItems> getPoItems() {
		return poItems;
	}

	public void setPoItems(ArrayList<RepairPOItems> poItems) {
		this.poItems = poItems;
	}

}
