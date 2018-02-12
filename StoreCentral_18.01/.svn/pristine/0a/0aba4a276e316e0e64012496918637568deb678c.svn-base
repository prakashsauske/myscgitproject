package au.com.woolworths.portal.model;

import java.math.RoundingMode;
import java.text.DecimalFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DailyStockCheckReportResult {

	@JsonProperty("article_no")
	private String article_no;
	@JsonProperty("promo_flag")
	private String promo_flag;
	@JsonProperty("random_weight_flg")
	private String random_weight_flg;
	@JsonProperty("article_desc")
	private String article_desc;
	@JsonProperty("om")
	private String om;
	@JsonProperty("base_uom")
	private String base_uom;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("pi_soh")
	private String pi_soh;
	@JsonProperty("pi_uom")
	private String pi_uom;
	@JsonProperty("sit")
	private String sit;
	@JsonProperty("lto_details")
	private String lto_details;
	@JsonProperty("display_type")
	private String display_type;
	@JsonProperty("stock_check_desc")
	private String stock_check_desc;
	@JsonProperty("offer_flag")
	private String offer_flag;
	
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
					// for Defect Defect_7214
	public String getOm() {
		double number =0;
		om = (om != null && om != "" ? om : "0");
		number= Double.parseDouble(om);
		int intValue = (int) number;
		om= String.valueOf(intValue);
		return om;
		
				
		//return (s == null ? "" : s);
	}
	public void setOm(String om) {
		this.om = om;
	}
	
	
	public String getSoh() {
		return randomWeighted();
	}				
	public String randomWeighted() {
		String randomWghtArticle = "";
		String quantity=soh;
		randomWghtArticle = (soh != null && soh != "" ? soh : "0")+" "+ base_uom ;
		if(base_uom.equals("KG") && (soh != ""|| soh !=null) && quantity.toString().indexOf('.')!=-1){	
			soh=CommonUtils.formatTo3DecimalPlaces(soh);
			 			
		 }
		if(random_weight_flg.equalsIgnoreCase("Y")){ 
			
			if (pi_soh!="" || soh!=""){
				randomWghtArticle = (pi_soh != null && pi_soh != "" ? pi_soh : "0") +" "+ pi_uom+" & "+(soh != null && soh != "" ? (base_uom.equals("KG")? CommonUtils.formatTo3DecimalPlaces(soh) : soh) : "0")+" "+ base_uom ;
				}else {
				
				randomWghtArticle ="0";
			}
		} 
		
		return randomWghtArticle;
	}
	
	
	public void setSoh(String soh) {
		this.soh = soh ;
	}
	
	public String getSit() {
		if(sit != "" && sit !=null && sit.indexOf('.')!=-1){	
		sit=CommonUtils.formatTo3DecimalPlaces(sit);
		}
		return (sit == null ? "" : sit);
	}
	public void setSit(String sit) {
		this.sit = sit;
	}
	public String getPromo_flag() {
		return promoflagUpdated();
		
	}
	/****************Fix for 7214 defect*************************/
	public String promoflagUpdated() {
		String promoFlagString = "";
		if(promo_flag !=null && !promo_flag.isEmpty() && 
				(promo_flag.equals("Y") || promo_flag.equals("*"))){
			promoFlagString = "*";
		}
		else if(offer_flag !=null && !offer_flag.isEmpty() && 
				(offer_flag.equals("Y") || offer_flag.equals("#"))){
			promoFlagString = "#";
		}
		return promoFlagString;
	}
	public void setPromo_flag(String promo_flag) {
		this.promo_flag = promo_flag;
	}
	public String getLto_details() {
		return (lto_details == null ? "" : lto_details);
	}
	public void setLto_details(String lto_details) {
		this.lto_details = lto_details;
	}
	public String getDisplay_type() {
		return (display_type == null ? "" : display_type);
	}
	public void setDisplay_type(String display_type) {
		this.display_type = display_type;
	}
	public String getStock_check_desc() {
		return (stock_check_desc == null ? "" : stock_check_desc);
	}
	public void setStock_check_desc(String stock_check_desc) {
		this.stock_check_desc = stock_check_desc;
	}
	
	public String getOffer_flag() {
		return (offer_flag == null ? "" : offer_flag);
	}
	public void setOffer_flag(String offer_flag) {
		this.offer_flag = offer_flag;
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
	
	}
