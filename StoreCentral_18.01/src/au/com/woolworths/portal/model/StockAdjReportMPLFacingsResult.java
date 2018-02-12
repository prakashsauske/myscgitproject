package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockAdjReportMPLFacingsResult {
	@JsonProperty("article")
	private String article_no;
	
	@JsonProperty("article_desc")
	private String article_desc;
	
	@JsonProperty("reason_desc")
	private String reason_final;
	
	@JsonProperty("date_time")
	private String date_time;
	
	@JsonProperty("prev_mpl")
	private String prev_mpl;
	
	@JsonProperty("new_mpl")
	private String new_mpl;
	
	@JsonProperty("def_mpl")
	private String def_mpl;
	
	@JsonProperty("def_sc")
	private String def_sc;
	
	@JsonProperty("prev_sc")
	private String prev_capacity;
	
	@JsonProperty("new_sc")
	private String new_capacity;
	
	@JsonProperty("prev_facings")
	private String prev_facings;
	
	@JsonProperty("new_facings")
	private String new_facings;
	
	@JsonProperty("user_name")
	private String user_name;
	
	@JsonProperty("adj_date")
	private String adj_date;
	
	
	@JsonProperty("adj_date_time")
	private String adj_date_time;
	
	@JsonProperty("uom")
	private String uom;
	
	public String getArticle_no() {
		return (article_no == null ? "" : article_no);
	}
	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}
	public String getArticle_desc() {
		return (article_desc == null ? "" : article_desc);
	}
	public void setArticle_desc(String article_desc) {
		this.article_desc = article_desc;
	}
	public String getReason_final() {
		return (reason_final == null ? "" : reason_final);
	}
	public void setReason_final(String reason_final) {
		this.reason_final = reason_final;
	}
	public String getDate_time() {
		return (date_time == null ? "" : date_time);
	}
	public void setDate_time(String date_time) {
		this.date_time = date_time;
	}
	public String getPrev_mpl() {
		return (prev_mpl == null ? "" : prev_mpl);
	}
	public void setPrev_mpl(String prev_mpl) {
		this.prev_mpl = prev_mpl;
	}
	public String getNew_mpl() {
		return (new_mpl == null ? "" : new_mpl);
	}
	public void setNew_mpl(String new_mpl) {
		this.new_mpl = new_mpl;
	}
	public String getPrev_capacity() {
		return (prev_capacity == null ? "" : prev_capacity);
	}
	public void setPrev_capacity(String prev_capacity) {
		this.prev_capacity = prev_capacity;
	}
	public String getNew_capacity() {
		return (new_capacity == null ? "" : new_capacity);
	}
	public void setNew_capacity(String new_capacity) {
		this.new_capacity = new_capacity;
	}
	public String getPrev_facings() {
		return (prev_facings == null ? "" : prev_facings);
	}
	public void setPrev_facings(String prev_facings) {
		this.prev_facings = prev_facings;
	}
	public String getNew_facings() {
		return (new_facings == null ? "" : new_facings);
	}
	public void setNew_facings(String new_facings) {
		this.new_facings = new_facings;
	}
	/**
	 * @return the adj_date
	 */
	public String getAdj_date() {
		return (adj_date == null ? "" :  adj_date);
	}
	/**
	 * @param adj_date the adj_date to set
	 */
	public void setAdj_date(String adj_date) {
		this.adj_date = adj_date;
	}
	/**
	 * @return the user_name
	 */
	public String getUser_name() {
		return (user_name == null ? "" : user_name);
	}
	/**
	 * @param user_name the user_name to set
	 */
	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}
	/**
	 * @return the def_mpl
	 */
	public String getDef_mpl() {
		return (def_mpl == null ? "" : def_mpl);
	}
	/**
	 * @param def_mpl the def_mpl to set
	 */
	public void setDef_mpl(String def_mpl) {
		this.def_mpl = def_mpl;
	}
	/**
	 * @return the def_sc
	 */
	public String getDef_sc() {
		return (def_sc == null ? "" : def_sc);
	}
	/**
	 * @param def_sc the def_sc to set
	 */
	public void setDef_sc(String def_sc) {
		this.def_sc = def_sc;
	}
	/**
	 * @return the adj_date_time
	 */
	public String getAdj_date_time() {
		return (adj_date_time ==  null ? "" : adj_date_time);
	}
	/**
	 * @param adj_date_time the adj_date_time to set
	 */
	public void setAdj_date_time(String adj_date_time) {
		this.adj_date_time = adj_date_time;
	}
	/**
	 * @return the uom
	 */
	public String getUom() {
		return (uom == null ? "" : uom);
	}
	/**
	 * @param uom the uom to set
	 */
	public void setUom(String uom) {
		this.uom = uom;
	}
	

}
