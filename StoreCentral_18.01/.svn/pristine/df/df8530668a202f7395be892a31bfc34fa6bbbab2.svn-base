package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DGReportResult {

	@JsonProperty("v_article_no")
	private String v_article_no;
	@JsonProperty("v_article_desc")
	private String v_article_desc;
	@JsonProperty("v_hazard_class")
	private String v_hazard_class;
	@JsonProperty("v_hazard_pck_grp")
	private String v_hazard_pck_grp;
	@JsonProperty("v_hazard_unit")
	private String v_hazard_unit;
	@JsonProperty("v_hazard_unit_vol")
	private String v_hazard_unit_vol;
	@JsonProperty("v_soh")
	private String v_soh;
	@JsonProperty("v_shelf_capacity")
	private String v_shelf_capacity;
	@JsonProperty("v_hazard_exp")
	private String v_hazard_exp;
	@JsonProperty("v_danger_ind")
	private String v_danger_ind;
	@JsonProperty("v_hazard_ind")
	private String v_hazard_ind;
	@JsonProperty("deptName")
	private String deptName;
	
	private String v_max_units;
	private String v_max_vol_held;
	
	public String getV_article_no() {
		return (v_article_no == null ? "" : v_article_no);
	}
	public void setV_article_no(String v_article_no) {
		this.v_article_no = v_article_no;
	}
	public String getV_article_desc() {
		return (v_article_desc == null ? "" : v_article_desc);
	}
	public void setV_article_desc(String v_article_desc) {
		this.v_article_desc = v_article_desc;
	}
	public String getV_hazard_class() {
		return (v_hazard_class == null ? "" : v_hazard_class);
	}
	public void setV_hazard_class(String v_hazard_class) {
		this.v_hazard_class = v_hazard_class;
	}
	public String getV_hazard_pck_grp() {
		return (v_hazard_pck_grp == null ? "" : v_hazard_pck_grp);
	}
	public void setV_hazard_pck_grp(String v_hazard_pck_grp) {
		this.v_hazard_pck_grp = v_hazard_pck_grp;
	}
	public String getV_hazard_unit() {
		return (v_hazard_unit == null ? "" : v_hazard_unit);
	}
	public void setV_hazard_unit(String v_hazard_unit) {
		this.v_hazard_unit = v_hazard_unit;
	}
	public String getV_hazard_unit_vol() {
		return (v_hazard_unit_vol == null ? "" : v_hazard_unit_vol);
	}
	public void setV_hazard_unit_vol(String v_hazard_unit_vol) {
		this.v_hazard_unit_vol = v_hazard_unit_vol;
	}
	public String getV_soh() {
		return (v_soh == null ? "" : v_soh);
	}
	public void setV_soh(String v_soh) {
		this.v_soh = v_soh;
	}
	public String getV_shelf_capacity() {
		return (v_shelf_capacity == null ? "" : v_shelf_capacity);
	}
	public void setV_shelf_capacity(String v_shelf_capacity) {
		this.v_shelf_capacity = v_shelf_capacity;
	}
	public String getV_hazard_exp() {
		return (v_hazard_exp == null ? "" : v_hazard_exp);
	}
	public void setV_hazard_exp(String v_hazard_exp) {
		this.v_hazard_exp = v_hazard_exp;
	}
	public String getV_danger_ind() {
		return (v_danger_ind == null ? "" : v_danger_ind);
	}
	public void setV_danger_ind(String v_danger_ind) {
		this.v_danger_ind = v_danger_ind;
	}
	public String getV_hazard_ind() {
		return (v_hazard_ind == null ? "" : v_hazard_ind);
	}
	public void setV_hazard_ind(String v_hazard_ind) {
		this.v_hazard_ind = v_hazard_ind;
	}
	public String getV_max_units() {
		if(!CommonUtils.isEmpty(v_soh) && !CommonUtils.isEmpty(v_shelf_capacity)){
			if(Double.parseDouble(v_soh) < Double.parseDouble(v_shelf_capacity)){
				v_max_units =  v_shelf_capacity;
			}else {
				v_max_units =  v_soh;
			}
		}else{
			v_max_units = "";
		}
		
		return v_max_units;
	}
	public void setV_max_units(String v_max_units) {
		this.v_max_units = v_max_units;
	}
	public String getV_max_vol_held() {
		if(!CommonUtils.isEmpty(v_max_units) && !CommonUtils.isEmpty(v_hazard_unit_vol)){
			v_max_vol_held = String.valueOf(Double.parseDouble(v_max_units) * Double.parseDouble(v_hazard_unit_vol));
		}else{
			v_max_vol_held = "";
		}
		return v_max_vol_held;
	}
	public void setV_max_vol_held(String v_max_vol_held) {
		this.v_max_vol_held = v_max_vol_held;
	}
	
	public String getDeptName() {
		return (deptName == null ? "" : deptName);
	}
	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}
	
	
}
