/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class RepairCreateServiceOrderResponseHelper {

	@JsonProperty("IV_SITE")
	private String IV_SITE;

	@JsonProperty("IV_SERVICE_ORD_NO")
	private String IV_SERVICE_ORD_NO;

	@JsonProperty("IV_MAIN_VENDOR")
	private String IV_MAIN_VENDOR;

	@JsonProperty("IV_REPAIR_AGENT")
	private String IV_REPAIR_AGENT;

	@JsonProperty("IV_CUST_NAME")
	private String IV_CUST_NAME;

	@JsonProperty("IV_CUST_CONTACT_NO")
	private String IV_CUST_CONTACT_NO;

	@JsonProperty("IV_CUST_ADDR")
	private String IV_CUST_ADDR;

	@JsonProperty("IV_CUST_POST_CODE")
	private String IV_CUST_POST_CODE;

	@JsonProperty("IV_STORE_CONTACT_NAME")
	private String IV_STORE_CONTACT_NAME;

	@JsonProperty("IV_REMARKS")
	private String IV_REMARKS;

	@JsonProperty("IV_REPAIR_CHARGE")
	private String IV_REPAIR_CHARGE;

	@JsonProperty("IV_REPAIR_DETAIL")
	private String IV_REPAIR_DETAIL;

	@JsonProperty("IV_WARRANTY")
	private String IV_WARRANTY;

	@JsonProperty("IV_PROOF_OF_PURCHASE")
	private String IV_PROOF_OF_PURCHASE;

	@JsonProperty("IV_DATE_OF_PURCHASE")
	private String IV_DATE_OF_PURCHASE;

	@JsonProperty("IV_STOCK_TYPE")
	private String IV_STOCK_TYPE;

	@JsonProperty("IV_CONTACT_METHOD")
	private String IV_CONTACT_METHOD;

	@JsonProperty("IV_MAIL_ID")
	private String IV_MAIL_ID;

	@JsonProperty("IV_AUTH_CODE")
	private String IV_AUTH_CODE;

	@JsonProperty("IV_AUTHORITY_NAME")
	private String IV_AUTHORITY_NAME;

	@JsonProperty("IV_GOODS_PICK_UP_DATE")
	private String IV_GOODS_PICK_UP_DATE;

	@JsonProperty("IV_CARRIER_NAME")
	private String IV_CARRIER_NAME;

	@JsonProperty("IV_CONSIGNEMENT_NOTE")
	private String IV_CONSIGNEMENT_NOTE;

	@JsonProperty("IV_CARRIER_CONTACT")
	private String IV_CARRIER_CONTACT;

	@JsonProperty("IV_CLOSURE_ACT_CODE")
	private String IV_CLOSURE_ACT_CODE;

	@JsonProperty("IV_STORE_CONTACT_NO")
	private String IV_STORE_CONTACT_NO;

	@JsonProperty("IV_ACTUAL_COMP_DATE")
	private String IV_ACTUAL_COMP_DATE;

	@JsonProperty("IV_EXP_RESOLUTION_DATE")
	private String IV_EXP_RESOLUTION_DATE;

	@JsonProperty("IV_FOLLOW_UP_DATE")
	private String IV_FOLLOW_UP_DATE;

	@JsonProperty("IV_COST_BORNE_BY")
	private String IV_COST_BORNE_BY;

	@JsonProperty("IV_TEST")
	private String IV_TEST;

	@JsonProperty("IV_TYP")
	private String IV_TYP;

	@JsonProperty("IV_MSG")
	private String IV_MSG;

	@JsonProperty("IV_CANCEL_REASON")
	private String IV_CANCEL_REASON;

	@JsonProperty("IV_CLOSURE_CODE")
	private String IV_CLOSURE_CODE;

	@JsonProperty("IV_TCODE")
	private String IV_TCODE;

	@JsonProperty("IV_STO_LOC")
	private String IV_STO_LOC;

	@JsonProperty("IV_POSTING_DATE")
	private String IV_POSTING_DATE;

	@JsonProperty("IV_DOC_DATE")
	private String IV_DOC_DATE;

	@JsonProperty("IV_NUMBER")
	private String IV_NUMBER;

	@JsonProperty("IV_NAME")
	private String IV_NAME;

	@JsonProperty("IV_ORDER_NO")
	private String IV_ORDER_NO;

	@JsonProperty("POItems")
	private RepairCreateServiceOrderResponseItem poItems;

	/**
	 * @return the iV_SITE
	 */
	public String getIV_SITE() {
		return IV_SITE;
	}

	/**
	 * @param iV_SITE
	 *            the iV_SITE to set
	 */
	public void setIV_SITE(String iV_SITE) {
		IV_SITE = iV_SITE;
	}

	/**
	 * @return the iV_SERVICE_ORD_NO
	 */
	public String getIV_SERVICE_ORD_NO() {
		return IV_SERVICE_ORD_NO;
	}

	/**
	 * @param iV_SERVICE_ORD_NO
	 *            the iV_SERVICE_ORD_NO to set
	 */
	public void setIV_SERVICE_ORD_NO(String iV_SERVICE_ORD_NO) {
		IV_SERVICE_ORD_NO = iV_SERVICE_ORD_NO;
	}

	/**
	 * @return the iV_MAIN_VENDOR
	 */
	public String getIV_MAIN_VENDOR() {
		return IV_MAIN_VENDOR;
	}

	/**
	 * @param iV_MAIN_VENDOR
	 *            the iV_MAIN_VENDOR to set
	 */
	public void setIV_MAIN_VENDOR(String iV_MAIN_VENDOR) {
		IV_MAIN_VENDOR = iV_MAIN_VENDOR;
	}

	/**
	 * @return the iV_REPAIR_AGENT
	 */
	public String getIV_REPAIR_AGENT() {
		return IV_REPAIR_AGENT;
	}

	/**
	 * @param iV_REPAIR_AGENT
	 *            the iV_REPAIR_AGENT to set
	 */
	public void setIV_REPAIR_AGENT(String iV_REPAIR_AGENT) {
		IV_REPAIR_AGENT = iV_REPAIR_AGENT;
	}

	/**
	 * @return the iV_CUST_NAME
	 */
	public String getIV_CUST_NAME() {
		return IV_CUST_NAME;
	}

	/**
	 * @param iV_CUST_NAME
	 *            the iV_CUST_NAME to set
	 */
	public void setIV_CUST_NAME(String iV_CUST_NAME) {
		IV_CUST_NAME = iV_CUST_NAME;
	}

	/**
	 * @return the iV_CUST_CONTACT_NO
	 */
	public String getIV_CUST_CONTACT_NO() {
		return IV_CUST_CONTACT_NO;
	}

	/**
	 * @param iV_CUST_CONTACT_NO
	 *            the iV_CUST_CONTACT_NO to set
	 */
	public void setIV_CUST_CONTACT_NO(String iV_CUST_CONTACT_NO) {
		IV_CUST_CONTACT_NO = iV_CUST_CONTACT_NO;
	}

	/**
	 * @return the iV_CUST_ADDR
	 */
	public String getIV_CUST_ADDR() {
		return IV_CUST_ADDR;
	}

	/**
	 * @param iV_CUST_ADDR
	 *            the iV_CUST_ADDR to set
	 */
	public void setIV_CUST_ADDR(String iV_CUST_ADDR) {
		IV_CUST_ADDR = iV_CUST_ADDR;
	}

	/**
	 * @return the iV_CUST_POST_CODE
	 */
	public String getIV_CUST_POST_CODE() {
		return IV_CUST_POST_CODE;
	}

	/**
	 * @param iV_CUST_POST_CODE
	 *            the iV_CUST_POST_CODE to set
	 */
	public void setIV_CUST_POST_CODE(String iV_CUST_POST_CODE) {
		IV_CUST_POST_CODE = iV_CUST_POST_CODE;
	}

	/**
	 * @return the iV_STORE_CONTACT_NAME
	 */
	public String getIV_STORE_CONTACT_NAME() {
		return IV_STORE_CONTACT_NAME;
	}

	/**
	 * @param iV_STORE_CONTACT_NAME
	 *            the iV_STORE_CONTACT_NAME to set
	 */
	public void setIV_STORE_CONTACT_NAME(String iV_STORE_CONTACT_NAME) {
		IV_STORE_CONTACT_NAME = iV_STORE_CONTACT_NAME;
	}

	/**
	 * @return the iV_REMARKS
	 */
	public String getIV_REMARKS() {
		return IV_REMARKS;
	}

	/**
	 * @param iV_REMARKS
	 *            the iV_REMARKS to set
	 */
	public void setIV_REMARKS(String iV_REMARKS) {
		IV_REMARKS = iV_REMARKS;
	}

	/**
	 * @return the iV_REPAIR_CHARGE
	 */
	public String getIV_REPAIR_CHARGE() {
		return IV_REPAIR_CHARGE;
	}

	/**
	 * @param iV_REPAIR_CHARGE
	 *            the iV_REPAIR_CHARGE to set
	 */
	public void setIV_REPAIR_CHARGE(String iV_REPAIR_CHARGE) {
		IV_REPAIR_CHARGE = iV_REPAIR_CHARGE;
	}

	/**
	 * @return the iV_REPAIR_DETAIL
	 */
	public String getIV_REPAIR_DETAIL() {
		return IV_REPAIR_DETAIL;
	}

	/**
	 * @param iV_REPAIR_DETAIL
	 *            the iV_REPAIR_DETAIL to set
	 */
	public void setIV_REPAIR_DETAIL(String iV_REPAIR_DETAIL) {
		IV_REPAIR_DETAIL = iV_REPAIR_DETAIL;
	}

	/**
	 * @return the iV_WARRANTY
	 */
	public String getIV_WARRANTY() {
		return IV_WARRANTY;
	}

	/**
	 * @param iV_WARRANTY
	 *            the iV_WARRANTY to set
	 */
	public void setIV_WARRANTY(String iV_WARRANTY) {
		IV_WARRANTY = iV_WARRANTY;
	}

	/**
	 * @return the iV_PROOF_OF_PURCHASE
	 */
	public String getIV_PROOF_OF_PURCHASE() {
		return IV_PROOF_OF_PURCHASE;
	}

	/**
	 * @param iV_PROOF_OF_PURCHASE
	 *            the iV_PROOF_OF_PURCHASE to set
	 */
	public void setIV_PROOF_OF_PURCHASE(String iV_PROOF_OF_PURCHASE) {
		IV_PROOF_OF_PURCHASE = iV_PROOF_OF_PURCHASE;
	}

	/**
	 * @return the iV_DATE_OF_PURCHASE
	 */
	public String getIV_DATE_OF_PURCHASE() {
		return IV_DATE_OF_PURCHASE;
	}

	/**
	 * @param iV_DATE_OF_PURCHASE
	 *            the iV_DATE_OF_PURCHASE to set
	 */
	public void setIV_DATE_OF_PURCHASE(String iV_DATE_OF_PURCHASE) {
		IV_DATE_OF_PURCHASE = iV_DATE_OF_PURCHASE;
	}

	/**
	 * @return the iV_STOCK_TYPE
	 */
	public String getIV_STOCK_TYPE() {
		return IV_STOCK_TYPE;
	}

	/**
	 * @param iV_STOCK_TYPE
	 *            the iV_STOCK_TYPE to set
	 */
	public void setIV_STOCK_TYPE(String iV_STOCK_TYPE) {
		IV_STOCK_TYPE = iV_STOCK_TYPE;
	}

	/**
	 * @return the iV_CONTACT_METHOD
	 */
	public String getIV_CONTACT_METHOD() {
		return IV_CONTACT_METHOD;
	}

	/**
	 * @param iV_CONTACT_METHOD
	 *            the iV_CONTACT_METHOD to set
	 */
	public void setIV_CONTACT_METHOD(String iV_CONTACT_METHOD) {
		IV_CONTACT_METHOD = iV_CONTACT_METHOD;
	}

	/**
	 * @return the iV_MAIL_ID
	 */
	public String getIV_MAIL_ID() {
		return IV_MAIL_ID;
	}

	/**
	 * @param iV_MAIL_ID
	 *            the iV_MAIL_ID to set
	 */
	public void setIV_MAIL_ID(String iV_MAIL_ID) {
		IV_MAIL_ID = iV_MAIL_ID;
	}

	/**
	 * @return the iV_AUTH_CODE
	 */
	public String getIV_AUTH_CODE() {
		return IV_AUTH_CODE;
	}

	/**
	 * @param iV_AUTH_CODE
	 *            the iV_AUTH_CODE to set
	 */
	public void setIV_AUTH_CODE(String iV_AUTH_CODE) {
		IV_AUTH_CODE = iV_AUTH_CODE;
	}

	/**
	 * @return the iV_AUTHORITY_NAME
	 */
	public String getIV_AUTHORITY_NAME() {
		return IV_AUTHORITY_NAME;
	}

	/**
	 * @param iV_AUTHORITY_NAME
	 *            the iV_AUTHORITY_NAME to set
	 */
	public void setIV_AUTHORITY_NAME(String iV_AUTHORITY_NAME) {
		IV_AUTHORITY_NAME = iV_AUTHORITY_NAME;
	}

	/**
	 * @return the iV_GOODS_PICK_UP_DATE
	 */
	public String getIV_GOODS_PICK_UP_DATE() {
		return IV_GOODS_PICK_UP_DATE;
	}

	/**
	 * @param iV_GOODS_PICK_UP_DATE
	 *            the iV_GOODS_PICK_UP_DATE to set
	 */
	public void setIV_GOODS_PICK_UP_DATE(String iV_GOODS_PICK_UP_DATE) {
		IV_GOODS_PICK_UP_DATE = iV_GOODS_PICK_UP_DATE;
	}

	/**
	 * @return the iV_CARRIER_NAME
	 */
	public String getIV_CARRIER_NAME() {
		return IV_CARRIER_NAME;
	}

	/**
	 * @param iV_CARRIER_NAME
	 *            the iV_CARRIER_NAME to set
	 */
	public void setIV_CARRIER_NAME(String iV_CARRIER_NAME) {
		IV_CARRIER_NAME = iV_CARRIER_NAME;
	}

	/**
	 * @return the iV_CONSIGNEMENT_NOTE
	 */
	public String getIV_CONSIGNEMENT_NOTE() {
		return IV_CONSIGNEMENT_NOTE;
	}

	/**
	 * @param iV_CONSIGNEMENT_NOTE
	 *            the iV_CONSIGNEMENT_NOTE to set
	 */
	public void setIV_CONSIGNEMENT_NOTE(String iV_CONSIGNEMENT_NOTE) {
		IV_CONSIGNEMENT_NOTE = iV_CONSIGNEMENT_NOTE;
	}

	/**
	 * @return the iV_CARRIER_CONTACT
	 */
	public String getIV_CARRIER_CONTACT() {
		return IV_CARRIER_CONTACT;
	}

	/**
	 * @param iV_CARRIER_CONTACT
	 *            the iV_CARRIER_CONTACT to set
	 */
	public void setIV_CARRIER_CONTACT(String iV_CARRIER_CONTACT) {
		IV_CARRIER_CONTACT = iV_CARRIER_CONTACT;
	}

	/**
	 * @return the iV_CLOSURE_ACT_CODE
	 */
	public String getIV_CLOSURE_ACT_CODE() {
		return IV_CLOSURE_ACT_CODE;
	}

	/**
	 * @param iV_CLOSURE_ACT_CODE
	 *            the iV_CLOSURE_ACT_CODE to set
	 */
	public void setIV_CLOSURE_ACT_CODE(String iV_CLOSURE_ACT_CODE) {
		IV_CLOSURE_ACT_CODE = iV_CLOSURE_ACT_CODE;
	}

	/**
	 * @return the iV_STORE_CONTACT_NO
	 */
	public String getIV_STORE_CONTACT_NO() {
		return IV_STORE_CONTACT_NO;
	}

	/**
	 * @param iV_STORE_CONTACT_NO
	 *            the iV_STORE_CONTACT_NO to set
	 */
	public void setIV_STORE_CONTACT_NO(String iV_STORE_CONTACT_NO) {
		IV_STORE_CONTACT_NO = iV_STORE_CONTACT_NO;
	}

	/**
	 * @return the iV_ACTUAL_COMP_DATE
	 */
	public String getIV_ACTUAL_COMP_DATE() {
		return IV_ACTUAL_COMP_DATE;
	}

	/**
	 * @param iV_ACTUAL_COMP_DATE
	 *            the iV_ACTUAL_COMP_DATE to set
	 */
	public void setIV_ACTUAL_COMP_DATE(String iV_ACTUAL_COMP_DATE) {
		IV_ACTUAL_COMP_DATE = iV_ACTUAL_COMP_DATE;
	}

	/**
	 * @return the iV_EXP_RESOLUTION_DATE
	 */
	public String getIV_EXP_RESOLUTION_DATE() {
		return IV_EXP_RESOLUTION_DATE;
	}

	/**
	 * @param iV_EXP_RESOLUTION_DATE
	 *            the iV_EXP_RESOLUTION_DATE to set
	 */
	public void setIV_EXP_RESOLUTION_DATE(String iV_EXP_RESOLUTION_DATE) {
		IV_EXP_RESOLUTION_DATE = iV_EXP_RESOLUTION_DATE;
	}

	/**
	 * @return the iV_FOLLOW_UP_DATE
	 */
	public String getIV_FOLLOW_UP_DATE() {
		return IV_FOLLOW_UP_DATE;
	}

	/**
	 * @param iV_FOLLOW_UP_DATE
	 *            the iV_FOLLOW_UP_DATE to set
	 */
	public void setIV_FOLLOW_UP_DATE(String iV_FOLLOW_UP_DATE) {
		IV_FOLLOW_UP_DATE = iV_FOLLOW_UP_DATE;
	}

	/**
	 * @return the iV_COST_BORNE_BY
	 */
	public String getIV_COST_BORNE_BY() {
		return IV_COST_BORNE_BY;
	}

	/**
	 * @param iV_COST_BORNE_BY
	 *            the iV_COST_BORNE_BY to set
	 */
	public void setIV_COST_BORNE_BY(String iV_COST_BORNE_BY) {
		IV_COST_BORNE_BY = iV_COST_BORNE_BY;
	}

	/**
	 * @return the iV_TEST
	 */
	public String getIV_TEST() {
		return IV_TEST;
	}

	/**
	 * @param iV_TEST
	 *            the iV_TEST to set
	 */
	public void setIV_TEST(String iV_TEST) {
		IV_TEST = iV_TEST;
	}

	/**
	 * @return the iV_TYP
	 */
	public String getIV_TYP() {
		return IV_TYP;
	}

	/**
	 * @param iV_TYP
	 *            the iV_TYP to set
	 */
	public void setIV_TYP(String iV_TYP) {
		IV_TYP = iV_TYP;
	}

	/**
	 * @return the iV_MSG
	 */
	public String getIV_MSG() {
		return IV_MSG;
	}

	/**
	 * @param iV_MSG
	 *            the iV_MSG to set
	 */
	public void setIV_MSG(String iV_MSG) {
		IV_MSG = iV_MSG;
	}

	/**
	 * @return the poItems
	 */
	public RepairCreateServiceOrderResponseItem getPoItems() {
		return poItems;
	}

	/**
	 * @param poItems
	 *            the poItems to set
	 */
	public void setPoItems(RepairCreateServiceOrderResponseItem poItems) {
		this.poItems = poItems;
	}

	public String getIV_CANCEL_REASON() {
		return IV_CANCEL_REASON;
	}

	public void setIV_CANCEL_REASON(String iV_CANCEL_REASON) {
		IV_CANCEL_REASON = iV_CANCEL_REASON;
	}

	public String getIV_CLOSURE_CODE() {
		return IV_CLOSURE_CODE;
	}

	public void setIV_CLOSURE_CODE(String iV_CLOSURE_CODE) {
		IV_CLOSURE_CODE = iV_CLOSURE_CODE;
	}

	public String getIV_TCODE() {
		return IV_TCODE;
	}

	public void setIV_TCODE(String iV_TCODE) {
		IV_TCODE = iV_TCODE;
	}

	public String getIV_STO_LOC() {
		return IV_STO_LOC;
	}

	public void setIV_STO_LOC(String iV_STO_LOC) {
		IV_STO_LOC = iV_STO_LOC;
	}

	public String getIV_POSTING_DATE() {
		return IV_POSTING_DATE;
	}

	public void setIV_POSTING_DATE(String iV_POSTING_DATE) {
		IV_POSTING_DATE = iV_POSTING_DATE;
	}

	public String getIV_DOC_DATE() {
		return IV_DOC_DATE;
	}

	public void setIV_DOC_DATE(String iV_DOC_DATE) {
		IV_DOC_DATE = iV_DOC_DATE;
	}

	public String getIV_NUMBER() {
		return IV_NUMBER;
	}

	public void setIV_NUMBER(String iV_NUMBER) {
		IV_NUMBER = iV_NUMBER;
	}

	public String getIV_NAME() {
		return IV_NAME;
	}

	public void setIV_NAME(String iV_NAME) {
		IV_NAME = iV_NAME;
	}

	public String getIV_ORDER_NO() {
		return IV_ORDER_NO;
	}

	public void setIV_ORDER_NO(String iV_ORDER_NO) {
		IV_ORDER_NO = iV_ORDER_NO;
	}

}
