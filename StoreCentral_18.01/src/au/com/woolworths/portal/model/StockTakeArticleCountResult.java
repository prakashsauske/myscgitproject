package au.com.woolworths.portal.model;

import java.text.DecimalFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.reports.ReportGlobalVariables;
import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeArticleCountResult {

	@JsonProperty("article_number")
	private String article_number;

	@JsonProperty("subcat_name")
	private String subcat_name;

	@JsonProperty("department_name")
	private String department_name;

	@JsonProperty("scanned_ean")
	private String scanned_ean;

	@JsonProperty("article_desc_to_display")
	private String article_description;

	@JsonProperty("uom")
	private String uom;

	@JsonProperty("om")
	private String om;

	@JsonProperty("sell_price")
	private String sell_price;

	@JsonProperty("location_name")
	private String location_name;

	@JsonProperty("base_count")
	private String base_count;

	@JsonProperty("recount_1")
	private String recount_1;

	@JsonProperty("recount_2")
	private String recount_2;

	@JsonProperty("recount_3")
	private String recount_3;

	@JsonProperty("recount_4")
	private String recount_4;

	@JsonProperty("final_count")
	private String final_count;

	@JsonProperty("total_value")
	private String total_value;

	@JsonProperty("soh")
	private String soh;

	@JsonProperty("users")
	private String user;

	private String promo_indicator;
	private String groupByValue;

	@JsonProperty("pbd_ind")
	private String pbd_ind;

	@JsonProperty("linked_ind")
	private String linked_ind;

	@JsonProperty("deleted_line_ind")
	private String deleted_line_ind;

	@JsonProperty("base_count_qty")
	private String base_count_qty;

	@JsonProperty("recount_qty_1")
	private String recount_qty_1;

	@JsonProperty("recount_qty_2")
	private String recount_qty_2;

	@JsonProperty("recount_qty_3")
	private String recount_qty_3;

	@JsonProperty("recount_qty_4")
	private String recount_qty_4;

	@JsonProperty("final_count_qty")
	private String final_count_qty;

	@JsonProperty("total_count_qty_value")
	private String total_count_qty_value;

	@JsonProperty("pi_uom")
	private String pi_uom;

	@JsonProperty("pi_soh")
	private String pi_soh;

	@JsonProperty("random_weight_flg")
	private String random_weight_flg;
	
	@JsonProperty("perpetual_flag")
	private String perpetual_flag;
	
	@JsonProperty("uom_formatted")
	private String uom_formatted;
	
	@JsonProperty("pi_uom_formatted")
	private String pi_uom_formatted;
	
	@JsonProperty("base_uom")
	private String base_uom;
	
	@JsonProperty("order_uom")
	private String order_uom;
	
	@JsonProperty("style_ind")
	private String style_ind;
	
	@JsonProperty("sell_price_to_display")
	private String sell_price_to_display;
	
	@JsonProperty("pack_size")
	private String pack_size;
	
	@JsonProperty("cpbd_flag")
	private String cpbd_flag;
	
	@JsonProperty("base_count_usr_nm")
	private String base_count_usr_nm;

	@JsonProperty("base_count_usr")
	private String base_count_usr;
	
	private String article_number_indi;
	
	private String article_description_excel;
	
	public String getArticle_number() {
		return (article_number == null ? "" : article_number);
	}

	public void setArticle_number(String article_number) {
		this.article_number = article_number;
	}

	// added for display indicator in export
	public String getArticle_number_indi() {
		return (article_number == null ? "" : article_number+""+(!this.promo_indicator.isEmpty() && !this.promo_indicator.equalsIgnoreCase(null) ? ("  "+"("+this.promo_indicator+")") : ""));
	}

	public void setArticle_number_indi(String article_number) {
		this.article_number = article_number;
	}
		
	public String getSubcat_name() {
		return (subcat_name == null ? "" : subcat_name);
	}

	public void setSubcat_name(String subcat_name) {
		this.subcat_name = subcat_name;
	}

	public String getDepartment_name() {
		return (department_name == null ? "" : department_name);
	}

	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}

	public String getScanned_ean() {
		return (scanned_ean == null ? "" : scanned_ean);
	}

	public void setScanned_ean(String scanned_ean) {
		this.scanned_ean = scanned_ean;
	}

	public String getArticle_description() {
		return (article_description == null ? "" : article_description
				.replaceAll("\\s+", " "));
	}
	
	private static String appendAsString(String str) {
	    return "\"" + str + "\"";
	}

	public void setArticle_description(String article_description) {
		this.article_description = article_description;
	}

	public String getArticle_description_excel() {
		article_description =  (article_description == null ? "" : article_description
				.replaceAll("\\s+", " "));
		String desc = appendAsString(article_description);
		return desc;
	}

	public void setArticle_description_excel(String article_description) {
		this.article_description = article_description;
	}

	public String getUom() {
		return (uom == null ? "" : uom);
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getOm() {
		return (om == null ? "" : om);
	}

	public void setOm(String om) {
		this.om = om;
	}

	public String getSell_price() {
		return (sell_price_to_display == null ? "" :  CommonUtils.formatTo2DecimalPlaces(sell_price_to_display)+" per "+(this.pbd_ind.equalsIgnoreCase("Y") ? this.uom : this.base_uom));
	}

	private String formatPrice(String val) {
		DecimalFormat df = new DecimalFormat("0.##");
		String returnVal = "";
		try {
			returnVal = df.format(Double.parseDouble(val));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return returnVal;
	}

	public void setSell_price(String sell_price) {
		this.sell_price = sell_price;
	}

	public String getLocation_name() {
		return (location_name == null ? "" : location_name);
	}

	public void setLocation_name(String location_name) {
		this.location_name = location_name;
	}

	public String getBase_count() {
		return checkIfRandomWeightArticle(
				(base_count == null ? "" : base_count), this.base_count_qty);
	}

	public void setBase_count(String base_count) {
		this.base_count = base_count;
	}

	public String getRecount_1() {
		return checkIfRandomWeightArticle((recount_1 == null ? "" : recount_1),
				this.recount_qty_1);
	}

	public void setRecount_1(String recount_1) {
		this.recount_1 = recount_1;
	}

	public String getRecount_2() {
		return checkIfRandomWeightArticle((recount_2 == null ? "" : recount_2),
				this.recount_qty_2);
	}

	public void setRecount_2(String recount_2) {
		this.recount_2 = recount_2;
	}

	public String getRecount_3() {
		return checkIfRandomWeightArticle((recount_3 == null ? "" : recount_3),
				this.recount_qty_3);
	}

	public void setRecount_3(String recount_3) {
		this.recount_3 = recount_3;
	}

	public String getRecount_4() {
		return checkIfRandomWeightArticle((recount_4 == null ? "" : recount_4),
				this.recount_qty_4);
	}

	public void setRecount_4(String recount_4) {
		this.recount_4 = recount_4;
	}

	public String getFinal_count() {
		String addSplitVal = "";
		String baseAddon = "";
		boolean splitFlg = true;
		String count = checkIfRandomWeightArticle((final_count == null ? ""
				: final_count), this.final_count_qty);
		
		if(!this.random_weight_flg.equalsIgnoreCase("Y") && (Double.parseDouble(final_count) >0) && this.om !=null && !this.om.isEmpty() ){
			if(final_count.indexOf(".") == -1){
				splitFlg = false;
			}
			double finalCount = Double.parseDouble(final_count) * Double.parseDouble(pack_size);
			Double floorVal = new Double( Math.floor(finalCount / Double.parseDouble(this.om)));
			Double roundVal = new Double(Math.round((finalCount % Double.parseDouble(this.om)) * 1e3) / 1e3);
			int intConvert = floorVal.intValue();
			
			if(this.base_uom.equalsIgnoreCase("KG") || splitFlg){
				String numberAsString = Double.toString(roundVal);
				baseAddon = CommonUtils.formatTo3DecimalPlaces(numberAsString);
			}else {
				int intRound = roundVal.intValue();
				baseAddon = Integer.toString(intRound);
			}
			 addSplitVal = ((this.order_uom != null && !(this.order_uom.isEmpty()) && !(this.order_uom.equalsIgnoreCase(this.base_uom))) ?
					" (" + intConvert + " " + this.order_uom + " & " + baseAddon + " " + this.base_uom + ")" 
					: "");
		}
		return count+""+addSplitVal;
	}

	public void setFinal_count(String final_count) {
		this.final_count = final_count;
	}

	public String getTotal_value() {
		return (total_value == null ? "" : CommonUtils.formatTo2DecimalPlaces(total_value));
	}

	public void setTotal_value(String total_value) {
		this.total_value = total_value;
	}

	public String getSoh() {
		return checkIfRandomWeightArticleForSOH((soh == null ? "" : soh),
				this.pi_soh);
	}

	public void setSoh(String soh) {
		this.soh = soh;
	}

	public String getUser() {
		return user;
	}

	public void setUser(String user) {
		this.user = user;
	}

	public String getPromo_indicator() {
		StringBuilder promoIndi =new StringBuilder();
		promoIndi.append("");
		this.promo_indicator = "";
		
		if(!CommonUtils.isEmpty(style_ind) && style_ind != null){
			promoIndi.append("S ");
			//promo_indicator ="S";
		}
		if (this.deleted_line_ind != null
				&& this.deleted_line_ind.equalsIgnoreCase("Y")) {
			promoIndi.append("D ");
			//this.promo_indicator = "D";
		}
		
		if (this.linked_ind != null
				&& this.linked_ind.equalsIgnoreCase("Y")) {
			promoIndi.append("L ");
			//this.promo_indicator = "L";
		} 
		if ((this.pbd_ind != null && this.pbd_ind.equalsIgnoreCase("Y")) || (this.cpbd_flag != null && this.cpbd_flag.equalsIgnoreCase("Y"))) {
			promoIndi.append("PB ");
		} 
		
		promo_indicator = promoIndi.toString();
		return promo_indicator;
	}

	public void setPromo_indicator(String promo_indicator) {
		this.promo_indicator = promo_indicator;
	}

	public String getGroupByValue() {
		if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("S")) {
			groupByValue = (subcat_name == null ? "" : subcat_name);
		} else if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("U")) {
			groupByValue = (user == null ? "" : user);
		} else if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("L")) {
			groupByValue = (location_name == null ? "" : location_name);
		} else if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("LU")) {
			groupByValue = (location_name == null ? "" : location_name);
			//Defect_12624 - Fix
			groupByValue = (location_name == null ? "" : location_name)
			+((!base_count_usr_nm.isEmpty() && base_count_usr_nm != null )?("  -  "+base_count_usr_nm):"")
			+((!base_count_usr.isEmpty() && base_count_usr != null )?("  ("+base_count_usr+")"):"");
		} else {
			groupByValue = "";
		}
		return groupByValue;
	}

	public void setGroupByValue(String groupByValue) {
		this.groupByValue = groupByValue;
	}

	public String getPbd_ind() {
		return pbd_ind;
	}

	public void setPbd_ind(String pbd_ind) {
		this.pbd_ind = pbd_ind;
	}

	public String getLinked_ind() {
		return linked_ind;
	}

	public void setLinked_ind(String linked_ind) {
		this.linked_ind = linked_ind;
	}

	public String getDeleted_line_ind() {
		return deleted_line_ind;
	}

	public void setDeleted_line_ind(String deleted_line_ind) {
		this.deleted_line_ind = deleted_line_ind;
	}

	/**
	 * @return the base_count_qty
	 */
	public String getBase_count_qty() {
		return base_count_qty;
	}

	/**
	 * @param base_count_qty
	 *            the base_count_qty to set
	 */
	public void setBase_count_qty(String base_count_qty) {
		this.base_count_qty = base_count_qty;
	}

	/**
	 * @return the recount_qty_1
	 */
	public String getRecount_qty_1() {
		return recount_qty_1;
	}

	/**
	 * @param recount_qty_1
	 *            the recount_qty_1 to set
	 */
	public void setRecount_qty_1(String recount_qty_1) {
		this.recount_qty_1 = recount_qty_1;
	}

	/**
	 * @return the recount_qty_2
	 */
	public String getRecount_qty_2() {
		return recount_qty_2;
	}

	/**
	 * @param recount_qty_2
	 *            the recount_qty_2 to set
	 */
	public void setRecount_qty_2(String recount_qty_2) {
		this.recount_qty_2 = recount_qty_2;
	}

	/**
	 * @return the recount_qty_3
	 */
	public String getRecount_qty_3() {
		return recount_qty_3;
	}

	/**
	 * @param recount_qty_3
	 *            the recount_qty_3 to set
	 */
	public void setRecount_qty_3(String recount_qty_3) {
		this.recount_qty_3 = recount_qty_3;
	}

	/**
	 * @return the recount_qty_4
	 */
	public String getRecount_qty_4() {
		return recount_qty_4;
	}

	/**
	 * @param recount_qty_4
	 *            the recount_qty_4 to set
	 */
	public void setRecount_qty_4(String recount_qty_4) {
		this.recount_qty_4 = recount_qty_4;
	}

	/**
	 * @return the final_count_qty
	 */
	public String getFinal_count_qty() {
		return final_count_qty;
	}

	/**
	 * @param final_count_qty
	 *            the final_count_qty to set
	 */
	public void setFinal_count_qty(String final_count_qty) {
		this.final_count_qty = final_count_qty;
	}

	/**
	 * @return the total_count_qty_value
	 */
	public String getTotal_count_qty_value() {
		return total_count_qty_value;
	}

	/**
	 * @param total_count_qty_value
	 *            the total_count_qty_value to set
	 */
	public void setTotal_count_qty_value(String total_count_qty_value) {
		this.total_count_qty_value = total_count_qty_value;
	}

	/**
	 * @return the pi_uom
	 */
	public String getPi_uom() {
		return pi_uom;
	}

	/**
	 * @param pi_uom
	 *            the pi_uom to set
	 */
	public void setPi_uom(String pi_uom) {
		this.pi_uom = pi_uom;
	}

	/**
	 * @return the pi_soh
	 */
	public String getPi_soh() {
		return pi_soh;
	}

	/**
	 * @param pi_soh
	 *            the pi_soh to set
	 */
	public void setPi_soh(String pi_soh) {
		this.pi_soh = pi_soh;
	}
	
	/**
	 * @return the random_weight_flg
	 */
	public String getRandom_weight_flg() {
		return random_weight_flg;
	}

	/**
	 * @param random_weight_flg
	 *            the random_weight_flg to set
	 */
	public void setRandom_weight_flg(String random_weight_flg) {
		this.random_weight_flg = random_weight_flg;
	}

	public String checkIfRandomWeightArticle(String countOrWeightInput,
			String QtyInEachesInput) {
		try{
		if (!this.random_weight_flg.equalsIgnoreCase(null)
				&& !this.random_weight_flg.equalsIgnoreCase("")
				&& this.random_weight_flg.equalsIgnoreCase("Y")
				&& !countOrWeightInput.equalsIgnoreCase(null)
				&& !countOrWeightInput.equalsIgnoreCase("")
				/*&& Double.parseDouble(countOrWeightInput) > 0*/) {
			if (QtyInEachesInput == null || QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			

			if (!this.uom.equalsIgnoreCase(this.base_uom)){			
				this.pi_uom_formatted = this.uom ;
			}else{
				this.pi_uom_formatted =this.pi_uom;
			}
			this.uom_formatted = this.base_uom;

		
			return eachesInput.intValue() + " " + this.pi_uom_formatted + " & "
					+ (this.uom_formatted.equalsIgnoreCase("KG") ? CommonUtils.formatTo3DecimalPlaces(countOrWeightInput) : countOrWeightInput) + " " + this.uom_formatted;
		}else{
			if (countOrWeightInput == null	
					|| countOrWeightInput.equalsIgnoreCase("")){
				countOrWeightInput = " ";
				}else{
					if(this.uom != null && !this.uom.isEmpty() && (this.uom.equalsIgnoreCase("KG") || this.uom.equalsIgnoreCase("L"))){
						String formattedVal =CommonUtils.formatTo3DecimalPlaces(countOrWeightInput);
						countOrWeightInput =  formattedVal + " " + this.uom ;	
					}else {
						Double eachesInput = Double.parseDouble(countOrWeightInput);
						countOrWeightInput =  countOrWeightInput + " " + this.uom ;	
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return countOrWeightInput;
	}

	public String checkIfRandomWeightArticleForSOH(String countOrWeightInput,
			String QtyInEachesInput) {
		if (!this.random_weight_flg.equalsIgnoreCase(null)
				&& !this.random_weight_flg.equalsIgnoreCase("")
				&& this.random_weight_flg.equalsIgnoreCase("Y") 
				&& this.perpetual_flag.equalsIgnoreCase("Y")
				/*&& !countOrWeightInput.equalsIgnoreCase(null)
				&& !countOrWeightInput.equalsIgnoreCase("")
				&& Double.parseDouble(countOrWeightInput) > 0*/) {
			if (QtyInEachesInput.equalsIgnoreCase(null)
					|| QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			return eachesInput.intValue() + " " + this.pi_uom + " & "
					+ (this.base_uom.equalsIgnoreCase("KG") ? CommonUtils.formatTo3DecimalPlaces(countOrWeightInput) : countOrWeightInput ) + " " + this.base_uom;
		}else if ((this.random_weight_flg.equalsIgnoreCase(null)
				|| this.random_weight_flg.equalsIgnoreCase("")
				|| this.random_weight_flg.equalsIgnoreCase("N")) 
				&& this.perpetual_flag.equalsIgnoreCase("Y")){
			if (countOrWeightInput == null	
					|| countOrWeightInput.equalsIgnoreCase("")){
				countOrWeightInput = " ";
				}else{
					if(this.base_uom != null && !this.base_uom.isEmpty() && (this.base_uom.equalsIgnoreCase("KG") || this.base_uom.equalsIgnoreCase("L"))){
						String formattedVal =CommonUtils.formatTo3DecimalPlaces(countOrWeightInput);
						countOrWeightInput =  formattedVal + " " + this.base_uom ;	
					}else {
						Double eachesInput = Double.parseDouble(countOrWeightInput);
						countOrWeightInput = countOrWeightInput + " " + this.base_uom ;	
					}
				}
			} else if (this.perpetual_flag.equalsIgnoreCase("N")){
				countOrWeightInput = "";
			}

		return countOrWeightInput;
	}

	public String getPerpetual_flag() {
		return perpetual_flag;
	}

	public void setPerpetual_flag(String perpetual_flag) {
		this.perpetual_flag = perpetual_flag;
	}

	/**
	 * @return the uom_formatted
	 */
	public String getUom_formatted() {
		return uom_formatted;
	}

	/**
	 * @param uom_formatted the uom_formatted to set
	 */
	public void setUom_formatted(String uom_formatted) {
		this.uom_formatted = uom_formatted;
	}

	/**
	 * @return the pi_uom_formatted
	 */
	public String getPi_uom_formatted() {
		return pi_uom_formatted;
	}

	/**
	 * @param pi_uom_formatted the pi_uom_formatted to set
	 */
	public void setPi_uom_formatted(String pi_uom_formatted) {
		this.pi_uom_formatted = pi_uom_formatted;
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

	public String getStyle_ind() {
		return style_ind;
	}

	public void setStyle_ind(String style_ind) {
		this.style_ind = style_ind;
	}

	public String getSell_price_to_display() {
		return sell_price_to_display;
	}

	public void setSell_price_to_display(String sell_price_to_display) {
		this.sell_price_to_display = sell_price_to_display;
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

	public String getCpbd_flag() {
		return cpbd_flag;
	}

	public void setCpbd_flag(String cpbd_flag) {
		this.cpbd_flag = cpbd_flag;
	}

	public String getBase_count_usr_nm() {
		return base_count_usr_nm;
	}

	public void setBase_count_usr_nm(String base_count_usr_nm) {
		this.base_count_usr_nm = base_count_usr_nm;
	}

	public String getBase_count_usr() {
		return base_count_usr;
	}

	public void setBase_count_usr(String base_count_usr) {
		this.base_count_usr = base_count_usr;
	}
	
	

}
