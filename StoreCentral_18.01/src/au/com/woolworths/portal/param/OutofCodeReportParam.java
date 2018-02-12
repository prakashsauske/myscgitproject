/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.OOCReportResult;
import au.com.woolworths.portal.model.OutofCodeResult;

/**
 * @author xkaew
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OutofCodeReportParam {
	
/*	@JsonProperty("articles")
	private ArrayList<OutofCodeResult> articles;*/
	
	@JsonProperty("iv_sales_org")
	private String iv_sales_org;

	@JsonProperty("iv_site")
	private String iv_site;

	@JsonProperty("iv_session_id")
	private String iv_session_id;

	@JsonProperty("iv_start_date")
	private String iv_start_date;

	@JsonProperty("iv_end_date")
	private String iv_end_date;
	
	
	@JsonProperty("iv_dept_list")
	private String iv_dept_list;

	@JsonProperty("iv_cat_list")
	private String iv_cat_list;

	@JsonProperty("iv_sub_cat_list")
	private String iv_sub_cat_list;

	@JsonProperty("iv_seg_list")
	private String iv_seg_list;

	@JsonProperty("iv_node_id")
	private String iv_node_id;

	@JsonProperty("iv_node_level")
	private String iv_node_level;
	
	@JsonProperty("iv_action_flag")
	private String iv_action_flag;

	/**
	 * @return the iv_dept_list
	 */
	public String getIv_dept_list() {
		return iv_dept_list;
	}

	/**
	 * @param iv_dept_list the iv_dept_list to set
	 */
	public void setIv_dept_list(String iv_dept_list) {
		this.iv_dept_list = iv_dept_list;
	}

	/**
	 * @return the iv_cat_list
	 */
	public String getIv_cat_list() {
		return iv_cat_list;
	}

	/**
	 * @param iv_cat_list the iv_cat_list to set
	 */
	public void setIv_cat_list(String iv_cat_list) {
		this.iv_cat_list = iv_cat_list;
	}

	/**
	 * @return the iv_sub_cat_list
	 */
	public String getIv_sub_cat_list() {
		return iv_sub_cat_list;
	}

	/**
	 * @param iv_sub_cat_list the iv_sub_cat_list to set
	 */
	public void setIv_sub_cat_list(String iv_sub_cat_list) {
		this.iv_sub_cat_list = iv_sub_cat_list;
	}

	/**
	 * @return the iv_seg_list
	 */
	public String getIv_seg_list() {
		return iv_seg_list;
	}

	/**
	 * @param iv_seg_list the iv_seg_list to set
	 */
	public void setIv_seg_list(String iv_seg_list) {
		this.iv_seg_list = iv_seg_list;
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
	 * @return the iv_site
	 */
	public String getIv_site() {
		return iv_site;
	}

	/**
	 * @param iv_site the iv_site to set
	 */
	public void setIv_site(String iv_site) {
		this.iv_site = iv_site;
	}

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
	 * @return the iv_start_date
	 */
	public String getIv_start_date() {
		return iv_start_date;
	}

	/**
	 * @param iv_start_date the iv_start_date to set
	 */
	public void setIv_start_date(String iv_start_date) {
		this.iv_start_date = iv_start_date;
	}

	/**
	 * @return the iv_end_date
	 */
	public String getIv_end_date() {
		return iv_end_date;
	}

	/**
	 * @param iv_end_date the iv_end_date to set
	 */
	public void setIv_end_date(String iv_end_date) {
		this.iv_end_date = iv_end_date;
	}

	/**
	 * @return the iv_node_id
	 */
	public String getIv_node_id() {
		return iv_node_id;
	}

	/**
	 * @param iv_node_id the iv_node_id to set
	 */
	public void setIv_node_id(String iv_node_id) {
		this.iv_node_id = iv_node_id;
	}

	/**
	 * @return the iv_node_level
	 */
	public String getIv_node_level() {
		return iv_node_level;
	}

	/**
	 * @param iv_node_level the iv_node_level to set
	 */
	public void setIv_node_level(String iv_node_level) {
		this.iv_node_level = iv_node_level;
	}

	public String getIv_action_flag() {
		return iv_action_flag;
	}

	public void setIv_action_flag(String iv_action_flag) {
		this.iv_action_flag = iv_action_flag;
	}

	
	

}
