package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;


@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeMissedArticlesResult {
	
	@JsonProperty("article_number")
	private String article_number;
	
	@JsonProperty("sub_category_name")
	private String subcat_name;
	
	@JsonProperty("article_description")
	private String article_description;
	
	@JsonProperty("article_uom")
	private String base_uom;
	
	@JsonProperty("om")
	private String om;
	
	@JsonProperty("soh")
	private String current_soh;
	
	@JsonProperty("sell_price")
	private String sell_price;
	
	@JsonProperty("last_sale_date")
	private String last_sale_date;
	
	@JsonProperty("pbd_indicator")
	private String pbd_ind;
	
	@JsonProperty("deleted_indicator")
	private String deleted_article_flg;
	
	private String promo_indicator;
	
	@JsonProperty("random_weight_flg")
	private String random_weight_flg;
	
	@JsonProperty("pi_soh")
	private String pi_soh;
	
	@JsonProperty("pi_uom")
	private String pi_uom;
	
	@JsonProperty("count")
	private String count;	
	
	@JsonProperty("uom_formatted")
	private String uom_formatted;
	
	@JsonProperty("pi_uom_formatted")
	private String pi_uom_formatted;
	
	@JsonProperty("uom")
	private String uom;
	
	@JsonProperty("count_qty")
	private String count_qty;
	
	@JsonProperty("perpetual_flag")
	private String perpetual_flag;
	
	@JsonProperty("style_ind")
	private String style_ind;
	
	private String article_number_indi;
	
	private String article_description_excel;
	
	@JsonProperty("cpbd_flag")
	private String cpbd_flag;
	
	@JsonProperty("linked_ind")
	private String linked_ind;
	
	
	public String getCount_qty() {
		return count_qty;
	}

	
	public void setCount_qty(String count_qty) {
		this.count_qty = count_qty;
	}
	
	// added for display indicator in export
	public String getArticle_number_indi() {
		return (article_number == null ? "" : article_number+""+((getPromo_indicator().isEmpty() || getPromo_indicator().equalsIgnoreCase(null)) ? "" : ("  "+"("+this.promo_indicator+")") ));
	}

	public void setArticle_number_indi(String article_number) {
		this.article_number = article_number;
	}
	
	public String getCount() {
		
		return checkIfRandomWeightArticle((count == null ? "" : count), this.count_qty);
	}

	public void setCount(String count) {
		this.count = count;
	}
	public String getPbd_ind() {
		return pbd_ind;
	}

	public void setPbd_ind(String pbd_ind) {
		this.pbd_ind = pbd_ind;
	}

	public String getDeleted_article_flg() {
		return deleted_article_flg;
	}

	public void setDeleted_article_flg(String deleted_article_flg) {
		this.deleted_article_flg = deleted_article_flg;
	}

	public String getPromo_indicator() {

		StringBuilder promoIndi =new StringBuilder();
		promoIndi.append("");
		this.promo_indicator = "";
		if(!CommonUtils.isEmpty(style_ind) && style_ind != null){
			promoIndi.append("S ");
		}
		if (this.deleted_article_flg != null
				&& this.deleted_article_flg.equalsIgnoreCase("Y")) {
			promoIndi.append("D ");
		}
		if (this.linked_ind != null
				&& this.linked_ind.equalsIgnoreCase("Y")) {
			promoIndi.append("L ");
		}
		if ((this.pbd_ind != null && this.pbd_ind.equalsIgnoreCase("Y")) || (this.cpbd_flag != null && this.cpbd_flag.equalsIgnoreCase("Y"))) {
			promoIndi.append("PB ");
		} 				
		promo_indicator = promoIndi.toString();
		return promo_indicator;
	
		/*if(!CommonUtils.isEmpty(pbd_ind) && pbd_ind.equalsIgnoreCase("Y")){
			promo_indicator = "PB";
		}else if(!CommonUtils.isEmpty(deleted_article_flg) && deleted_article_flg.equalsIgnoreCase("Y")){
			promo_indicator ="D";
		}else if(!CommonUtils.isEmpty(style_ind) && style_ind != null){
			promo_indicator ="S";
		}else{
			promo_indicator = "";
		}
		return promo_indicator;*/
	}

	public void setPromo_indicator(String promo_indicator) {
		this.promo_indicator = promo_indicator;
	}

	public String getSubcat_name() {
		return (subcat_name == null ? "" : subcat_name);
	}

	public void setSubcat_name(String subcat_name) {
		this.subcat_name = subcat_name;
	}


	public String getArticle_number() {
		return (article_number == null ? "" : article_number);
	}

	public void setArticle_number(String article_number) {
		this.article_number = article_number;
	}

	public String getArticle_description() {
		return (article_description == null ? "" : article_description.replaceAll("\\s+"," "));
	}
	private static String appendAsString(String str) {
	    return "\"" + str + "\"";
	}

	public void setArticle_description(String article_description) {
		this.article_description = article_description;
	}
	
	public String getArticle_description_excel() {
		article_description = (article_description == null ? "" : article_description.replaceAll("\\s+"," "));
		String desc = appendAsString(article_description);
		return desc;
	}


	public void setArticle_description_excel(String article_description) {
		this.article_description = article_description;
	}

	public String getBase_uom() {
		return (base_uom == null ? "" : base_uom);
	}

	public void setBase_uom(String base_uom) {
		this.base_uom = base_uom;
	}

	public String getOm() {
		return (om == null ? "" : om);
	}

	public void setOm(String om) {
		this.om = om;
	}

	public String getCurrent_soh() {
		return current_soh; /*checkIfRandomWeightArticleForSOH((current_soh == null ? "" : current_soh),this.pi_soh);*/
	}

	public void setCurrent_soh(String current_soh) {
		this.current_soh = current_soh;
	}

	public String getSell_price() {
		return (sell_price == null ? "" : sell_price+" per "+this.base_uom);
	}

	public void setSell_price(String sell_price) {
		this.sell_price = sell_price;
	}

	public String getLast_sale_date() {
		return ((last_sale_date == null || last_sale_date.isEmpty()) ? "" : CommonUtils.convertDateToDefaultFormat(last_sale_date));
	}

	public void setLast_sale_date(String last_sale_date) {
		this.last_sale_date = last_sale_date;
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

/*	public String checkIfRandomWeightArticle(String countOrWeightInput,String QtyInEachesInput)
	{
		if(!this.random_weight_flg.equalsIgnoreCase(null) && !this.random_weight_flg.equalsIgnoreCase("") && this.random_weight_flg.equalsIgnoreCase("Y") && !countOrWeightInput.equalsIgnoreCase(null) 
				&& !countOrWeightInput.equalsIgnoreCase("") && Double.parseDouble(countOrWeightInput) > 0)
			{
			if(QtyInEachesInput.equalsIgnoreCase(null) || QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			return eachesInput.intValue()+" "+this.pi_uom+" & "+countOrWeightInput+" "+this.base_uom;
			}	
		return countOrWeightInput;
	}*/
	
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

	public String checkIfRandomWeightArticle(String countOrWeightInput,
			String QtyInEachesInput) {
		try{
		if (!this.random_weight_flg.equalsIgnoreCase(null)
				&& !this.random_weight_flg.equalsIgnoreCase("")
				&& this.random_weight_flg.equalsIgnoreCase("Y")
				&& !countOrWeightInput.equalsIgnoreCase(null)
				&& !countOrWeightInput.equalsIgnoreCase("")
				&& Double.parseDouble(countOrWeightInput) > 0) {
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
						countOrWeightInput =  eachesInput.intValue() + " " + this.uom ;	
					}
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return countOrWeightInput;
	}

	
	public String checkIfRandomWeightArticleForSOH(String countOrWeightInput,String QtyInEachesInput)
	{
		if(!this.random_weight_flg.equalsIgnoreCase(null) && !this.random_weight_flg.equalsIgnoreCase("") && this.random_weight_flg.equalsIgnoreCase("Y"))
			{
			if(QtyInEachesInput.equalsIgnoreCase(null) || QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			return eachesInput.intValue()+" "+this.pi_uom+" & "+countOrWeightInput+" "+this.base_uom;
			}	
			
		return countOrWeightInput;
	}

	public String getPerpetual_flag() {
		return perpetual_flag;
	}


	public void setPerpetual_flag(String perpetual_flag) {
		this.perpetual_flag = perpetual_flag;
	}


	public String getStyle_ind() {
		return style_ind;
	}


	public void setStyle_ind(String style_ind) {
		this.style_ind = style_ind;
	}


	public String getCpbd_flag() {
		return cpbd_flag;
	}


	public void setCpbd_flag(String cpbd_flag) {
		this.cpbd_flag = cpbd_flag;
	}


	public String getLinked_ind() {
		return linked_ind;
	}


	public void setLinked_ind(String linked_ind) {
		this.linked_ind = linked_ind;
	}
	
}
