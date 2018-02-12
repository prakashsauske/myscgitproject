package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RepairServiceOrderDetails {

	@JsonProperty(value = "iv_order_no")
	private String iv_order_no;
	@JsonProperty(value = "address")
	private String address;
	@JsonProperty(value = "total_amount")
	private String total_amount;
	@JsonProperty(value = "quantity")
	private String quantity;
	@JsonProperty(value = "article")
	private String article;
	@JsonProperty(value = "name")
	private String name;
	@JsonProperty(value = "art_desc")
	private String art_desc;
	@JsonProperty(value = "authority_name")
	private String authority_name;
	@JsonProperty(value = "purchase_proof")
	private String purchase_proof;
	@JsonProperty(value = "fault_description")
	private String fault_description;
	@JsonProperty(value = "carrier")
	private String carrier;
	@JsonProperty(value = "purchase_date")
	private String purchase_date;
	@JsonProperty(value = "contact_number")
	private String contact_number;
	@JsonProperty(value = "pickupdate")
	private String pickupdate;
	@JsonProperty(value = "createdate")
	private String createdate;
	@JsonProperty(value = "contactnumber")
	private String contactnumber;
	@JsonProperty(value = "article_service")
	private String article_service;
	@JsonProperty(value = "followupdate")
	private String followupdate;
	@JsonProperty(value = "auth_code")
	private String auth_code;
	@JsonProperty(value = "consignment_note")
	private String consignment_note;
	@JsonProperty(value = "remainderdate")
	private String remainderdate;
	@JsonProperty(value = "comments")
	private String comments;
	@JsonProperty(value = "resoldate")
	private String resoldate;
	@JsonProperty(value = "freight_cost")
	private String freight_cost;
	@JsonProperty(value = "iv_site")
	private String iv_site;
	@JsonProperty(value = "customer_email")
	private String customer_email;
	@JsonProperty(value = "msg")
	private String msg;
	@JsonProperty(value = "post_code")
	private String post_code;

	/**
	 * @return the iv_order_no
	 */
	public String getIv_order_no() {
		return iv_order_no;
	}

	/**
	 * @param iv_order_no
	 *            the iv_order_no to set
	 */
	public void setIv_order_no(String iv_order_no) {
		this.iv_order_no = iv_order_no;
	}

	/**
	 * @return the address
	 */
	public String getAddress() {
		return address;
	}

	/**
	 * @param address
	 *            the address to set
	 */
	public void setAddress(String address) {
		this.address = address;
	}

	/**
	 * @return the total_amount
	 */
	public String getTotal_amount() {
		return total_amount;
	}

	/**
	 * @param total_amount
	 *            the total_amount to set
	 */
	public void setTotal_amount(String total_amount) {
		this.total_amount = total_amount;
	}

	/**
	 * @return the quantity
	 */
	public String getQuantity() {
		return quantity;
	}

	/**
	 * @param quantity
	 *            the quantity to set
	 */
	public void setQuantity(String quantity) {
		this.quantity = quantity;
	}

	/**
	 * @return the article
	 */
	public String getArticle() {
		return article;
	}

	/**
	 * @param article
	 *            the article to set
	 */
	public void setArticle(String article) {
		this.article = article;
	}

	/**
	 * @return the name
	 */
	public String getName() {
		return name;
	}

	/**
	 * @param name
	 *            the name to set
	 */
	public void setName(String name) {
		this.name = name;
	}

	/**
	 * @return the art_desc
	 */
	public String getArt_desc() {
		return art_desc;
	}

	/**
	 * @param art_desc
	 *            the art_desc to set
	 */
	public void setArt_desc(String art_desc) {
		this.art_desc = art_desc;
	}

	/**
	 * @return the authority_name
	 */
	public String getAuthority_name() {
		return authority_name;
	}

	/**
	 * @param authority_name
	 *            the authority_name to set
	 */
	public void setAuthority_name(String authority_name) {
		this.authority_name = authority_name;
	}

	/**
	 * @return the purchase_proof
	 */
	public String getPurchase_proof() {
		return purchase_proof;
	}

	/**
	 * @param purchase_proof
	 *            the purchase_proof to set
	 */
	public void setPurchase_proof(String purchase_proof) {
		this.purchase_proof = purchase_proof;
	}

	/**
	 * @return the fault_description
	 */
	public String getFault_description() {
		return fault_description;
	}

	/**
	 * @param fault_description
	 *            the fault_description to set
	 */
	public void setFault_description(String fault_description) {
		this.fault_description = fault_description;
	}

	/**
	 * @return the carrier
	 */
	public String getCarrier() {
		return carrier;
	}

	/**
	 * @param carrier
	 *            the carrier to set
	 */
	public void setCarrier(String carrier) {
		this.carrier = carrier;
	}

	/**
	 * @return the purchase_date
	 */
	public String getPurchase_date() {
		return purchase_date;
	}

	/**
	 * @param purchase_date
	 *            the purchase_date to set
	 */
	public void setPurchase_date(String purchase_date) {
		this.purchase_date = purchase_date;
	}

	/**
	 * @return the contact_number
	 */
	public String getContact_number() {
		return contact_number;
	}

	/**
	 * @param contact_number
	 *            the contact_number to set
	 */
	public void setContact_number(String contact_number) {
		this.contact_number = contact_number;
	}

	/**
	 * @return the pickupdate
	 */
	public String getPickupdate() {
		return pickupdate;
	}

	/**
	 * @param pickupdate
	 *            the pickupdate to set
	 */
	public void setPickupdate(String pickupdate) {
		this.pickupdate = pickupdate;
	}

	/**
	 * @return the createdate
	 */
	public String getCreatedate() {
		return createdate;
	}

	/**
	 * @param createdate
	 *            the createdate to set
	 */
	public void setCreatedate(String createdate) {
		this.createdate = createdate;
	}

	/**
	 * @return the contactnumber
	 */
	public String getContactnumber() {
		return contactnumber;
	}

	/**
	 * @param contactnumber
	 *            the contactnumber to set
	 */
	public void setContactnumber(String contactnumber) {
		this.contactnumber = contactnumber;
	}

	/**
	 * @return the article_service
	 */
	public String getArticle_service() {
		return article_service;
	}

	/**
	 * @param article_service
	 *            the article_service to set
	 */
	public void setArticle_service(String article_service) {
		this.article_service = article_service;
	}

	/**
	 * @return the followupdate
	 */
	public String getFollowupdate() {
		return followupdate;
	}

	/**
	 * @param followupdate
	 *            the followupdate to set
	 */
	public void setFollowupdate(String followupdate) {
		this.followupdate = followupdate;
	}

	/**
	 * @return the auth_code
	 */
	public String getAuth_code() {
		return auth_code;
	}

	/**
	 * @param auth_code
	 *            the auth_code to set
	 */
	public void setAuth_code(String auth_code) {
		this.auth_code = auth_code;
	}

	/**
	 * @return the consignment_note
	 */
	public String getConsignment_note() {
		return consignment_note;
	}

	/**
	 * @param consignment_note
	 *            the consignment_note to set
	 */
	public void setConsignment_note(String consignment_note) {
		this.consignment_note = consignment_note;
	}

	/**
	 * @return the remainderdate
	 */
	public String getRemainderdate() {
		return remainderdate;
	}

	/**
	 * @param remainderdate
	 *            the remainderdate to set
	 */
	public void setRemainderdate(String remainderdate) {
		this.remainderdate = remainderdate;
	}

	/**
	 * @return the comments
	 */
	public String getComments() {
		return comments;
	}

	/**
	 * @param comments
	 *            the comments to set
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}

	/**
	 * @return the resoldate
	 */
	public String getResoldate() {
		return resoldate;
	}

	/**
	 * @param resoldate
	 *            the resoldate to set
	 */
	public void setResoldate(String resoldate) {
		this.resoldate = resoldate;
	}

	/**
	 * @return the freight_cost
	 */
	public String getFreight_cost() {
		return freight_cost;
	}

	/**
	 * @param freight_cost
	 *            the freight_cost to set
	 */
	public void setFreight_cost(String freight_cost) {
		this.freight_cost = freight_cost;
	}

	/**
	 * @return the iv_site
	 */
	public String getIv_site() {
		return iv_site;
	}

	/**
	 * @param iv_site
	 *            the iv_site to set
	 */
	public void setIv_site(String iv_site) {
		this.iv_site = iv_site;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the customer_email
	 */
	public String getCustomer_email() {
		return customer_email;
	}

	/**
	 * @param customer_email
	 *            the customer_email to set
	 */
	public void setCustomer_email(String customer_email) {
		this.customer_email = customer_email;
	}

	public String getPost_code() {
		return post_code;
	}

	public void setPost_code(String post_code) {
		this.post_code = post_code;
	}

}
