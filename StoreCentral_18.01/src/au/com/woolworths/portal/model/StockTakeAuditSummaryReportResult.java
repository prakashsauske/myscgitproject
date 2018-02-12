package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeAuditSummaryReportResult {

	@JsonProperty("article_number")
	private String article_number;
	@JsonProperty("article_description")
	private String article_description;
	@JsonProperty("location_name")
	private String location_name;
	@JsonProperty("counted_user")
	private String counted_user;
	@JsonProperty("user_count")
	private String user_count;
	@JsonProperty("auditor")
	private String auditor;
	@JsonProperty("auditor_count")
	private String auditor_count;
	@JsonProperty("difference")
	private String difference;
	@JsonProperty("action_flag")
	private String action_flag;
	@JsonProperty("subcat_name")
	private String subcat_name;
	@JsonProperty("storeUserId")
	private String storeUserId;
	@JsonProperty("auditorUserId")
	private String auditorUserId;
	
	@JsonProperty("random_weight_flg")
	private String random_weight_flg;
	
	@JsonProperty("pi_soh")
	private String pi_soh;
	
	@JsonProperty("pi_uom")
	private String pi_uom;
	
	@JsonProperty("uom")
	private String uom;

	@JsonProperty("auditor_count_qty")
	private String auditor_count_qty;
	
	@JsonProperty("user_count_qty")
	private String user_count_qty;
	
	@JsonProperty("difference_qty")
	private String difference_qty;
	
	public String getArticle_number() {
		return article_number;
	}
	public void setArticle_number(String article_number) {
		this.article_number = article_number;
	}
	public String getArticle_description() {
		if(article_description!=null && !article_description.isEmpty()){
			article_description = article_description.replaceAll("\\s+", " ");
		}
		return article_description;
	}
	public void setArticle_description(String article_description) {
		this.article_description = article_description;
	}
	public String getLocation_name() {
		return location_name;
	}
	public void setLocation_name(String location_name) {
		this.location_name = location_name;
	}
	public String getCounted_user() {
		return counted_user;
	}
	public void setCounted_user(String counted_user) {
		this.counted_user = counted_user;
	}
	public String getUser_count() {
		return checkIfRandomWeightArticle((user_count == null ? "" : user_count),this.user_count_qty);
	}
	public void setUser_count(String user_count) {
		this.user_count = user_count;
	}
	public String getAuditor() {
		return auditor;
	}
	public void setAuditor(String auditor) {
		this.auditor = auditor;
	}
	public String getAuditor_count() {
		return checkIfRandomWeightArticle((auditor_count == null ? "" : auditor_count),this.auditor_count_qty);
	}
	public void setAuditor_count(String auditor_count) {
		this.auditor_count = auditor_count;
	}
	public String getDifference() {
		return checkIfRandomWeightArticle((difference == null ? "" : difference),this.difference_qty);
	}
	public void setDifference(String difference) {
		this.difference = difference;
	}
	public String getAction_flag() {
		return (action_flag == null ? "" : action_flag);
	}
	public void setAction_flag(String action_flag) {
		this.action_flag = action_flag;
	}
	public String getSubcat_name() {
		return subcat_name;
	}
	public void setSubcat_name(String subcat_name) {
		this.subcat_name = subcat_name;
	}
	public String getStoreUserId() {
		return storeUserId;
	}
	public void setStoreUserId(String storeUserId) {
		this.storeUserId = storeUserId;
	}
	public String getAuditorUserId() {
		return auditorUserId;
	}
	public void setAuditorUserId(String auditorUserId) {
		this.auditorUserId = auditorUserId;
	}
	/**
	 * @return the random_weight_flg
	 */
	public String getRandom_weight_flg() {
		return random_weight_flg;
	}
	/**
	 * @param random_weight_flg the random_weight_flg to set
	 */
	public void setRandom_weight_flg(String random_weight_flg) {
		this.random_weight_flg = random_weight_flg;
	}
	/**
	 * @return the pi_soh
	 */
	public String getPi_soh() {
		return pi_soh;
	}
	/**
	 * @param pi_soh the pi_soh to set
	 */
	public void setPi_soh(String pi_soh) {
		this.pi_soh = pi_soh;
	}
	/**
	 * @return the pi_uom
	 */
	public String getPi_uom() {
		return pi_uom;
	}
	/**
	 * @param pi_uom the pi_uom to set
	 */
	public void setPi_uom(String pi_uom) {
		this.pi_uom = pi_uom;
	}
	
	public String checkIfRandomWeightArticle(String countOrWeightInput,String QtyInEachesInput)
	{
		
		if(!this.random_weight_flg.equalsIgnoreCase(null) && !this.random_weight_flg.equalsIgnoreCase("") && this.random_weight_flg.equalsIgnoreCase("Y") && !countOrWeightInput.equalsIgnoreCase(null) 
				&& !countOrWeightInput.equalsIgnoreCase("") && Double.parseDouble(countOrWeightInput) > 0)
			{
			if(QtyInEachesInput.equalsIgnoreCase(null) || QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			return eachesInput.intValue()+" "+this.pi_uom+" & "+countOrWeightInput+" "+this.uom;
			}	
		return (countOrWeightInput!= null ? countOrWeightInput : "");
	}
	/**
	 * @return the uom
	 */
	public String getUom() {
		return uom;
	}
	/**
	 * @param uom the uom to set
	 */
	public void setUom(String uom) {
		this.uom = uom;
	}
	/**
	 * @return the auditor_count_qty
	 */
	public String getAuditor_count_qty() {
		return auditor_count_qty;
	}
	/**
	 * @param auditor_count_qty the auditor_count_qty to set
	 */
	public void setAuditor_count_qty(String auditor_count_qty) {
		this.auditor_count_qty = auditor_count_qty;
	}
	/**
	 * @return the user_count_qty
	 */
	public String getUser_count_qty() {
		return user_count_qty;
	}
	/**
	 * @param user_count_qty the user_count_qty to set
	 */
	public void setUser_count_qty(String user_count_qty) {
		this.user_count_qty = user_count_qty;
	}
	/**
	 * @return the difference_qty
	 */
	public String getDifference_qty() {
		return difference_qty;
	}
	/**
	 * @param difference_qty the difference_qty to set
	 */
	public void setDifference_qty(String difference_qty) {
		this.difference_qty = difference_qty;
	}
	
}
