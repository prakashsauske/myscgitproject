package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PLUReportResult {
	@JsonProperty("plu_code")
	private String plu_code;
	
	@JsonProperty("article_no")
	private String article_no;
	
	@JsonProperty("article_desc")
	private String article_desc;
	
	@JsonProperty("department_name")
	private String department_name;
	
	@JsonProperty("category_name")
	private String category_name;
	
	@JsonProperty("sub_category_name")
	private String sub_category_name;
	
	@JsonProperty("segment_name")
	private String segment_name;
	
	@JsonProperty("article_stat")
	private String article_stat;
	
	
	public String getArticle_no() {
		return (article_no == null ? "" : article_no);
	}
	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}
	public String getArticle_desc() {
		return (article_desc== null ? "" : article_desc);
	}
	public void setArticle_desc(String article_desc) {
		this.article_desc = article_desc;
	}
	public String getDepartment_name() {
		return department_name == null ? "" : department_name;
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public String getCategory_name() {
		return (category_name == null ? "" :category_name);
	}
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	public String getSub_category_name() {
		return (sub_category_name == null ? "" :sub_category_name);
	}
	public void setSub_category_name(String sub_category_name) {
		this.sub_category_name = sub_category_name;
	}
	public String getSegment_name() {
		return (segment_name == null ? "" :segment_name);
	}
	public void setSegment_name(String segment_name) {
		this.segment_name = segment_name;
	}
	public String getArticle_stat() {
		return (article_stat == null ? "" :article_stat);
	}
	public void setArticle_stat(String article_stat) {
		this.article_stat = article_stat;
	}
	public String getPlu_code() {
		return (plu_code == null ? "" : plu_code);
	}
	public void setPlu_code(String plu_code) {
		this.plu_code = plu_code;
	}
	

}
