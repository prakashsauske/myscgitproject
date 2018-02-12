/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import com.jcraft.jsch.Logger;

import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xkaew
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LTODiscrepancyReportResult {


	@JsonProperty("article_no")
	private String article_no;
	@JsonProperty("article_desc")
	private String article_desc;
	@JsonProperty("base_uom")
	private String base_uom;
	@JsonProperty("pbd_uom")
	private String pbd_uom;
	@JsonProperty("scan_uom")
	private String scan_uom;
	@JsonProperty("pi_uom")
	private String pi_uom;
	@JsonProperty("pi_om")
	private String pi_om;
	@JsonProperty("pack_size_to_use")
	private String pack_size_to_use;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("pi_soh")
	private String pi_soh;
	@JsonProperty("lto_id")
	private String lto_id;
	@JsonProperty("lto_status")
	private String lto_status;
	@JsonProperty("lto_notes")
	private String lto_notes;
	@JsonProperty("fixture_type")
	private String fixture_type;
	@JsonProperty("location_name")
	private String location_name;
	@JsonProperty("loc_short_name")
	private String loc_short_name;
	@JsonProperty("aisle_name")
	private String aisle_name;
	@JsonProperty("category_name")
	private String category_name;
	@JsonProperty("lto_qty")
	private String lto_qty;
	@JsonProperty("weight_qty")
	private String weight_qty;
	@JsonProperty("om")
	private String om;
	@JsonProperty("pbd_flag")
	private String pbd_flag;
	@JsonProperty("deleted_line_ind")
	private String deleted_line_ind;
	@JsonProperty("pack_size")
	private String pack_size;
	@JsonProperty("random_weight_flag")
	private String random_weight_flag;
	@JsonProperty("total_units")
	private String total_units;
	@JsonProperty("base_uom_sc")
	private String base_uom_sc;
	@JsonProperty("fill_qty")
	private String fill_qty;
	@JsonProperty("consolidated_lto_qty")
	private String consolidated_lto_qty;
	@JsonProperty("consol_lto_qty_loc")
	private String consol_lto_qty_loc;
	@JsonProperty("department_id")
	private String department_id;
	@JsonProperty("order_uom")
	private String order_uom;
	@JsonProperty("order_uom_om")
	private String order_uom_om;
	@JsonProperty("weighted_flg")
	private String weighted_flg;
	@JsonProperty("allow_decimal_adj")
	private String allow_decimal_adj;
	@JsonProperty("loc_name_to_sort")
	private String loc_name_to_sort;
	@JsonProperty("msg_typ")
	private String msg_typ;
	@JsonProperty("msg_string")
	private String msg_string;
	@JsonProperty("LINKAGE_IND")
	private String linkage_ind;
	@JsonProperty("base_uom_allow_Dec_field")
	private String base_uom_allow_Dec_field;
	
	
	/**
	 * @return the article_no
	 */
	public String getArticle_no() {
		return article_no;
	}
	/**
	 * @return the linkage_ind
	 */
	public String getLinkage_ind() {
		return linkage_ind;
	}
	/**
	 * @param linkage_ind the linkage_ind to set
	 */
	public void setLinkage_ind(String linkage_ind) {
		this.linkage_ind = linkage_ind;
	}
	/**
	 * @param article_no the article_no to set
	 */
	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}
	/**
	 * @return the article_desc
	 */
	public String getArticle_desc() {
		return article_desc;
	}
	/**
	 * @param article_desc the article_desc to set
	 */
	public void setArticle_desc(String article_desc) {
		this.article_desc = article_desc;
	}
	/**
	 * @return the base_uom
	 */
	public String getBase_uom() {
		return base_uom;
	}
	/**
	 * @param base_uom the base_uom to set
	 */
	public void setBase_uom(String base_uom) {
		this.base_uom = base_uom;
	}
	/**
	 * @return the pbd_uom
	 */
	public String getPbd_uom() {
		return pbd_uom;
	}
	/**
	 * @param pbd_uom the pbd_uom to set
	 */
	public void setPbd_uom(String pbd_uom) {
		this.pbd_uom = pbd_uom;
	}
	/**
	 * @return the scan_uom
	 */
	public String getScan_uom() {
		return scan_uom;
	}
	/**
	 * @param scan_uom the scan_uom to set
	 */
	public void setScan_uom(String scan_uom) {
		this.scan_uom = scan_uom;
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
	/**
	 * @return the pi_om
	 */
	public String getPi_om() {
		return pi_om;
	}
	/**
	 * @param pi_om the pi_om to set
	 */
	public void setPi_om(String pi_om) {
		this.pi_om = pi_om;
	}
	/**
	 * @return the pack_size_to_use
	 */
	public String getPack_size_to_use() {
		return pack_size_to_use;
	}
	/**
	 * @param pack_size_to_use the pack_size_to_use to set
	 */
	public void setPack_size_to_use(String pack_size_to_use) {
		this.pack_size_to_use = pack_size_to_use;
	}
	/**
	 * @return the soh
	 */
	public String getSoh() {
		if(this.random_weight_flag != null && this.random_weight_flag.equalsIgnoreCase("Y")){
			soh=pi_soh+" "+pi_uom+" & "+CommonUtils.formatTo3DecimalPlaces(soh)+" "+base_uom;
		}else{			
			if(this.base_uom != null && this.base_uom.equalsIgnoreCase("KG")
					|| (this.base_uom != null && this.base_uom.equalsIgnoreCase("L"))){	
				soh=CommonUtils.formatTo3DecimalPlaces(soh)+" "+this.base_uom;
			}else {
				String sohVal = this.soh;
				if(sohVal.indexOf(".") == -1){
					soh=soh+" "+this.base_uom;
				}else{
					soh = sohVal.substring(0, sohVal.indexOf("."));
					soh=soh+" "+this.base_uom;
				}
			}
		}
		return soh;
	}
	/**
	 * @param soh the soh to set
	 */
	public void setSoh(String soh) {
		
		this.soh = soh;
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
	 * @return the lto_id
	 */
	public String getLto_id() {
		return lto_id;
	}
	/**
	 * @param lto_id the lto_id to set
	 */
	public void setLto_id(String lto_id) {
		this.lto_id = lto_id;
	}
	/**
	 * @return the lto_status
	 */
	public String getLto_status() {
		return lto_status;
	}
	/**
	 * @param lto_status the lto_status to set
	 */
	public void setLto_status(String lto_status) {
		this.lto_status = lto_status;
	}
	/**
	 * @return the lto_notes
	 */
	public String getLto_notes() {
		return lto_notes;
	}
	/**
	 * @param lto_notes the lto_notes to set
	 */
	public void setLto_notes(String lto_notes) {
		this.lto_notes = lto_notes;
	}
	/**
	 * @return the fixture_type
	 */
	public String getFixture_type() {
		return fixture_type;
	}
	/**
	 * @param fixture_type the fixture_type to set
	 */
	public void setFixture_type(String fixture_type) {
		this.fixture_type = fixture_type;
	}
	/**
	 * @return the location_name
	 */
	public String getLocation_name() {
		return location_name;
	}
	/**
	 * @param location_name the location_name to set
	 */
	public void setLocation_name(String location_name) {
		this.location_name = location_name;
	}
	/**
	 * @return the loc_short_name
	 */
	public String getLoc_short_name() {
		return loc_short_name;
	}
	/**
	 * @param loc_short_name the loc_short_name to set
	 */
	public void setLoc_short_name(String loc_short_name) {
		this.loc_short_name = loc_short_name;
	}
	/**
	 * @return the aisle_name
	 */
	public String getAisle_name() {
		return aisle_name;
	}
	/**
	 * @param aisle_name the aisle_name to set
	 */
	public void setAisle_name(String aisle_name) {
		this.aisle_name = aisle_name;
	}
	/**
	 * @return the category_name
	 */
	public String getCategory_name() {
		return category_name;
	}
	/**
	 * @param category_name the category_name to set
	 */
	public void setCategory_name(String category_name) {
		this.category_name = category_name;
	}
	/**
	 * @return the lto_qty
	 */
	public String getLto_qty() {
		return lto_qty;
	}
	/**
	 * @param lto_qty the lto_qty to set
	 */
	public void setLto_qty(String lto_qty) {
		this.lto_qty = lto_qty;
	}
	/**
	 * @return the weight_qty
	 */
	public String getWeight_qty() {
		return weight_qty;
	}
	/**
	 * @param weight_qty the weight_qty to set
	 */
	public void setWeight_qty(String weight_qty) {
		this.weight_qty = weight_qty;
	}
	/**
	 * @return the om
	 */
	public String getOm() {
		return om;
	}
	/**
	 * @param om the om to set
	 */
	public void setOm(String om) {
		this.om = om;
	}
	/**
	 * @return the pbd_flag
	 */
	public String getPbd_flag() {
		return pbd_flag;
	}
	/**
	 * @param pbd_flag the pbd_flag to set
	 */
	public void setPbd_flag(String pbd_flag) {
		this.pbd_flag = pbd_flag;
	}
	/**
	 * @return the deleted_line_ind
	 */
	public String getDeleted_line_ind() {
		return deleted_line_ind;
	}
	/**
	 * @param deleted_line_ind the deleted_line_ind to set
	 */
	public void setDeleted_line_ind(String deleted_line_ind) {
		this.deleted_line_ind = deleted_line_ind;
	}
	/**
	 * @return the pack_size
	 */
	public String getPack_size() {
		return pack_size;
	}
	/**
	 * @param pack_size the pack_size to set
	 */
	public void setPack_size(String pack_size) {
		this.pack_size = pack_size;
	}
	/**
	 * @return the random_weight_flag
	 */
	public String getRandom_weight_flag() {
		return random_weight_flag;
	}
	/**
	 * @param random_weight_flag the random_weight_flag to set
	 */
	public void setRandom_weight_flag(String random_weight_flag) {
		this.random_weight_flag = random_weight_flag;
	}
	/**
	 * @return the total_units
	 */
	public String getTotal_units() {
		return total_units;
	}
	/**
	 * @param total_units the total_units to set
	 */
	public void setTotal_units(String total_units) {
		this.total_units = total_units;
	}
	/**
	 * @return the base_uom_sc
	 */
	public String getBase_uom_sc() {
		return base_uom_sc;
	}
	/**
	 * @param base_uom_sc the base_uom_sc to set
	 */
	public void setBase_uom_sc(String base_uom_sc) {
		this.base_uom_sc = base_uom_sc;
	}
	/**
	 * @return the fill_qty
	 */
	public String getFill_qty() {
		return fill_qty;
	}
	/**
	 * @param fill_qty the fill_qty to set
	 */
	public void setFill_qty(String fill_qty) {
		this.fill_qty = fill_qty;
	}
	/**
	 * @return the consolidated_lto_qty
	 */
	public String getConsolidated_lto_qty() {
		return consolidated_lto_qty;
	}
	/**
	 * @param consolidated_lto_qty the consolidated_lto_qty to set
	 */
	public void setConsolidated_lto_qty(String consolidated_lto_qty) {
		this.consolidated_lto_qty = consolidated_lto_qty;
	}
	/**
	 * @return the consol_lto_qty_loc
	 */
	public String getConsol_lto_qty_loc() {
		
	if(this.random_weight_flag != null && this.random_weight_flag.equalsIgnoreCase("Y")){
		//String wgtValue = CommonUtils.formatTo3DecimalPlaces(consol_lto_qty_loc);
		String qtyLocValue = this.consol_lto_qty_loc;
		if(qtyLocValue != null && qtyLocValue.indexOf(".") == -1){
			consol_lto_qty_loc = consol_lto_qty_loc+" "+this.pi_uom;
		}else{
			consol_lto_qty_loc = qtyLocValue.substring(0, qtyLocValue.indexOf("."));
			consol_lto_qty_loc=consol_lto_qty_loc+" "+this.pi_uom;
		}
	//	consol_lto_qty_loc = consol_lto_qty_loc+" "+this.base_uom;
	}else{
		if(this.weighted_flg != null &&  this.weighted_flg.equalsIgnoreCase("Y")
				|| (this.base_uom_allow_Dec_field != null && this.base_uom_allow_Dec_field.equalsIgnoreCase("Y"))){
			String wgtValue = CommonUtils.formatTo3DecimalPlaces(consol_lto_qty_loc);
			consol_lto_qty_loc = wgtValue+" "+this.base_uom;
		}else{
		String qtyLocVal = this.consol_lto_qty_loc;
		if(qtyLocVal != null && qtyLocVal.indexOf(".") == -1){
			consol_lto_qty_loc = consol_lto_qty_loc+" "+this.base_uom;
		}else{
			consol_lto_qty_loc = qtyLocVal.substring(0, qtyLocVal.indexOf("."));
			consol_lto_qty_loc=consol_lto_qty_loc+" "+this.base_uom;
		}
		}
	}
		return consol_lto_qty_loc;
	}
	/**
	 * @param consol_lto_qty_loc the consol_lto_qty_loc to set
	 */
	public void setConsol_lto_qty_loc(String consol_lto_qty_loc) {
		this.consol_lto_qty_loc = consol_lto_qty_loc;
	}
	/**
	 * @return the department_id
	 */
	public String getDepartment_id() {
		return department_id;
	}
	/**
	 * @param department_id the department_id to set
	 */
	public void setDepartment_id(String department_id) {
		this.department_id = department_id;
	}
	/**
	 * @return the order_uom
	 */
	public String getOrder_uom() {
		return order_uom;
	}
	/**
	 * @param order_uom the order_uom to set
	 */
	public void setOrder_uom(String order_uom) {
		this.order_uom = order_uom;
	}
	/**
	 * @return the order_uom_om
	 */
	public String getOrder_uom_om() {
		return order_uom_om;
	}
	/**
	 * @param order_uom_om the order_uom_om to set
	 */
	public void setOrder_uom_om(String order_uom_om) {
		this.order_uom_om = order_uom_om;
	}
	/**
	 * @return the weighted_flg
	 */
	public String getWeighted_flg() {
		return weighted_flg;
	}
	/**
	 * @param weighted_flg the weighted_flg to set
	 */
	public void setWeighted_flg(String weighted_flg) {
		this.weighted_flg = weighted_flg;
	}
	/**
	 * @return the allow_decimal_adj
	 */
	public String getAllow_decimal_adj() {
		return allow_decimal_adj;
	}
	/**
	 * @param allow_decimal_adj the allow_decimal_adj to set
	 */
	public void setAllow_decimal_adj(String allow_decimal_adj) {
		this.allow_decimal_adj = allow_decimal_adj;
	}
	/**
	 * @return the loc_name_to_sort
	 */
	public String getLoc_name_to_sort() {
		return loc_name_to_sort;
	}
	/**
	 * @param loc_name_to_sort the loc_name_to_sort to set
	 */
	public void setLoc_name_to_sort(String loc_name_to_sort) {
		this.loc_name_to_sort = loc_name_to_sort;
	}
	/**
	 * @return the msg_typ
	 */
	public String getMsg_typ() {
		return msg_typ;
	}
	/**
	 * @param msg_typ the msg_typ to set
	 */
	public void setMsg_typ(String msg_typ) {
		this.msg_typ = msg_typ;
	}
	/**
	 * @return the msg_string
	 */
	public String getMsg_string() {
		return msg_string;
	}
	/**
	 * @param msg_string the msg_string to set
	 */
	public void setMsg_string(String msg_string) {
		this.msg_string = msg_string;
	}
	/**
	 * @return the base_uom_allow_Dec_field
	 */
	public String getBase_uom_allow_Dec_field() {
		return base_uom_allow_Dec_field;
	}
	/**
	 * @param base_uom_allow_Dec_field the base_uom_allow_Dec_field to set
	 */
	public void setBase_uom_allow_Dec_field(String base_uom_allow_Dec_field) {
		this.base_uom_allow_Dec_field = base_uom_allow_Dec_field;
	}
	
	
	
	


}
