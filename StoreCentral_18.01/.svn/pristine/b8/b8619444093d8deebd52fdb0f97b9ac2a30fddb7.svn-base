/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xkaew
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LTOArticlestoFillReportResult {


	@JsonProperty("msg")
	private String msg;
	@JsonProperty("msg_string")
	private String msg_string;
	@JsonProperty("fill_report_id")
	private String fill_report_id;
	@JsonProperty("lto_id")
	private String lto_id;
	@JsonProperty("lto_name")
	private String lto_name;
	@JsonProperty("article_no")
	private String article_no;
	@JsonProperty("article_desc")
	private String article_desc;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("lto_qty")
	private String lto_qty;
	@JsonProperty("uom")
	private String uom;
	@JsonProperty("pi_uom")
	private String pi_uom;
	@JsonProperty("base_uom")
	private String base_uom;
	@JsonProperty("shelf_capacity")
	private String shelf_capacity;
	@JsonProperty("fill_qty")
	private String fill_qty;
	@JsonProperty("filled_qty")
	private String filled_qty;
	@JsonProperty("fill_status")
	private String fill_status;
	@JsonProperty("random_weight_flg")
	private String random_weight_flg;
	@JsonProperty("weighted_flg")
	private String weighted_flg;
	@JsonProperty("pac_size")
	private String pac_size;
	@JsonProperty("om")
	private String om;
	@JsonProperty("pi_om")
	private String pi_om;
	@JsonProperty("loc_short_name")
	private String loc_short_name;
	@JsonProperty("pbd_flag")
	private String pbd_flag;
	@JsonProperty("weight_qty")
	private String weight_qty;
	@JsonProperty("deleted_line_ind")
	private String deleted_line_ind;
	@JsonProperty("order_uom")
	private String order_uom;
	@JsonProperty("order_uom_om")
	private String order_uom_om;
	@JsonProperty("allow_decimal_adj")
	private String allow_decimal_adj;
	@JsonProperty("consolidated_lto_qty")
	private String consolidated_lto_qty;
	@JsonProperty("fillable_qty")
	private String fillable_qty;
	@JsonProperty("fillable_qty_uom")
	private String fillable_qty_uom;
	@JsonProperty("pi_soh")
	private String pi_soh;
	@JsonProperty("PROMO_IND")
	private String promo_ind;
	@JsonProperty("del_ind")
	private String del_ind;
	@JsonProperty("WITHDRAWN_RECALL_IND")
	private String withdrawn_recall_ind;
	@JsonProperty("LINKAGE_IND")
	private String linkage_ind;
	
	
	
	/**
	 * @return the promo_ind
	 */
	public String getPromo_ind() {
		return promo_ind;
	}
	/**
	 * @param promo_ind the promo_ind to set
	 */
	public void setPromo_ind(String promo_ind) {
		this.promo_ind = promo_ind;
	}
	/**
	 * @return the del_ind
	 */
	public String getDel_ind() {
		return del_ind;
	}
	/**
	 * @param del_ind the del_ind to set
	 */
	public void setDel_ind(String del_ind) {
		this.del_ind = del_ind;
	}
	/**
	 * @return the withdrawn_recall_ind
	 */
	public String getWithdrawn_recall_ind() {
		return withdrawn_recall_ind;
	}
	/**
	 * @param withdrawn_recall_ind the withdrawn_recall_ind to set
	 */
	public void setWithdrawn_recall_ind(String withdrawn_recall_ind) {
		this.withdrawn_recall_ind = withdrawn_recall_ind;
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
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}
	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
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
	 * @return the fill_report_id
	 */
	public String getFill_report_id() {
		return fill_report_id;
	}
	/**
	 * @param fill_report_id the fill_report_id to set
	 */
	public void setFill_report_id(String fill_report_id) {
		this.fill_report_id = fill_report_id;
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
	 * @return the lto_name
	 */
	public String getLto_name() {
		return lto_name;
	}
	/**
	 * @param lto_name the lto_name to set
	 */
	public void setLto_name(String lto_name) {
		this.lto_name = lto_name;
	}
	/**
	 * @return the article_no
	 */
	public String getArticle_no() {
		return article_no;
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
	 * @return the soh
	 */
	public String getSoh() {
		if(this.random_weight_flg.equalsIgnoreCase("Y")){
			soh=pi_soh+" "+pi_uom+" & "+CommonUtils.formatTo3DecimalPlaces(soh)+" "+base_uom;
		}else{			
			if(this.base_uom.equalsIgnoreCase("KG") || (this.base_uom.equalsIgnoreCase("L"))){	
				soh=CommonUtils.formatTo3DecimalPlaces(soh)+" "+this.base_uom;
			}else {
				String sohVal = this.soh;
				if(sohVal.indexOf(".") == -1){
					soh=soh+" "+this.base_uom;
					//return soh;
				}else{
					soh = sohVal.substring(0, sohVal.indexOf("."));
					soh=soh+" "+this.base_uom;
					//return soh;	
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
	 * @return the shelf_capacity
	 */
	public String getShelf_capacity() {
		return shelf_capacity;
	}
	/**
	 * @param shelf_capacity the shelf_capacity to set
	 */
	public void setShelf_capacity(String shelf_capacity) {
		this.shelf_capacity = shelf_capacity;
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
	 * @return the filled_qty
	 */
	public String getFilled_qty() {
		return filled_qty;
	}
	/**
	 * @param filled_qty the filled_qty to set
	 */
	public void setFilled_qty(String filled_qty) {
		this.filled_qty = filled_qty;
	}
	/**
	 * @return the fill_status
	 */
	public String getFill_status() {
		return fill_status;
	}
	/**
	 * @param fill_status the fill_status to set
	 */
	public void setFill_status(String fill_status) {
		this.fill_status = fill_status;
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
	 * @return the pac_size
	 */
	public String getPac_size() {
		return pac_size;
	}
	/**
	 * @param pac_size the pac_size to set
	 */
	public void setPac_size(String pac_size) {
		this.pac_size = pac_size;
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
	 * @return the fillable_qty
	 */
	public String getFillable_qty() {
		if(this.random_weight_flg.equalsIgnoreCase("Y")){ 
			fillable_qty=((pi_uom.equalsIgnoreCase("KG")) ? CommonUtils.formatTo3DecimalPlaces(fillable_qty):fillable_qty)+" "+this.pi_uom;
			}else{
				fillable_qty=((fillable_qty_uom.equalsIgnoreCase("KG")|| fillable_qty_uom.equalsIgnoreCase("L")) ? CommonUtils.formatTo3DecimalPlaces(fillable_qty):fillable_qty)+" "+this.fillable_qty_uom;
				//System.out.println("fillable_qty -- >"+fillable_qty);//Defect_9507
			}
		return fillable_qty;
	}
	/**
	 * @param fillable_qty the fillable_qty to set
	 */
	public void setFillable_qty(String fillable_qty) {
		this.fillable_qty = fillable_qty;
	}
	/**
	 * @return the fillable_qty_uom
	 */
	public String getFillable_qty_uom() {
		return fillable_qty_uom;
	}
	/**
	 * @param fillable_qty_uom the fillable_qty_uom to set
	 */
	public void setFillable_qty_uom(String fillable_qty_uom) {
		this.fillable_qty_uom = fillable_qty_uom;
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
	


}
