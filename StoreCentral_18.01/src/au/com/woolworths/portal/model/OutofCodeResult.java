package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xkaew
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OutofCodeResult {
	
	@JsonProperty("article_no")
	private String article_no;
	@JsonProperty("article_desc")
	private String article_desc;
	@JsonProperty("article_uom")
	private String article_uom;
	@JsonProperty("base_uom")
	private String base_uom;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("pbd_flag")
	private String pbd_flag;
	@JsonProperty("department_no")
	private String department_no;
	@JsonProperty("department_name")
	private String department_name;
	@JsonProperty("category_no")
	private String category_no ;
	
	@JsonProperty("category_name")
	private String category_name ;
	
	@JsonProperty("sub_category_no")
	private String sub_category_no;
	@JsonProperty("sub_category_name")
	private String sub_category_name;
	@JsonProperty("segment_no")
	private String segment_no;
	@JsonProperty("segment_name")
	private String segment_name;
	@JsonProperty("sale_or_return_flag")
	private String sale_or_return_flag;
	@JsonProperty("perpetual_flag")
	private String perpetual_flag;
	@JsonProperty("random_weight_flag")
	private String random_weight_flag;
	@JsonProperty("weighted_article_flag")
	private String weighted_article_flag;
	@JsonProperty("deleted_article_flag")
	private String deleted_article_flag ;
	
	@JsonProperty("pack_size")
	private String pack_size ;
	
	@JsonProperty("std_sell_price")
	private String std_sell_price;
	@JsonProperty("promo_sell_price")
	private String promo_sell_price;
	@JsonProperty("result_set_no")
	private String result_set_no;
	@JsonProperty("pi_uom")
	private String pi_uom;
	@JsonProperty("pi_soh")
	private String pi_soh;
	@JsonProperty("allow_decimal_adj")
	private String allow_decimal_adj;
	@JsonProperty("lto_details")
	private String lto_details;
	@JsonProperty("promo_flag")
	private String promo_flag;
	@JsonProperty("actioned_flag")
	private String actioned_flag ;
	
	@JsonProperty("SEQUENCE_NO")
	private String SEQUENCE_NO ;
	
	
	@JsonProperty("use_by_dates")
	private ArrayList<OOCUseByDateReportResult> use_by_dates;
	
	public String tab_name;
	
	public String urgentFlag;
	
	private String week1Val;
	private String week2Val;
	private String week3Val;
	private String week4Val;
	private String week5Val;
	private String week6Val;
	private String week7Val;
	private String week8Val;
	private String week9Val;
	private String week10Val;
	private String week11Val;
	private String week12Val;
	private String week13Val;
	private String week14Val;
	private String week15Val;
	private String week16Val;
	private String week17Val;
	private String week18Val;
	private String week19Val;
	private String week20Val;
	private String week21Val;
	private String week22Val;
	private String week23Val;
	private String week24Val;
	private String week25Val;
	private String week26Val;
	private String week27Val;
	private String week28Val;
	
	
	
	
	
	


	/**
	 * @return the week1Val
	 */
	public String getWeek1Val() {
		return (week1Val == null ? "" : week1Val);
	}


	/**
	 * @param week1Val the week1Val to set
	 */
	public void setWeek1Val(String week1Val) {
		this.week1Val = week1Val;
	}


	/**
	 * @return the week2Val
	 */
	public String getWeek2Val() {
		return (week2Val == null ? "" : week2Val);
	}


	/**
	 * @param week2Val the week2Val to set
	 */
	public void setWeek2Val(String week2Val) {
		this.week2Val = week2Val;
	}


	/**
	 * @return the week3Val
	 */
	public String getWeek3Val() {
		return (week3Val == null ? "" : week3Val);
	}


	/**
	 * @param week3Val the week3Val to set
	 */
	public void setWeek3Val(String week3Val) {
		this.week3Val = week3Val;
	}


	/**
	 * @return the week4Val
	 */
	public String getWeek4Val() {
		return (week4Val == null ? "" : week4Val);
	}


	/**
	 * @param week4Val the week4Val to set
	 */
	public void setWeek4Val(String week4Val) {
		this.week4Val = week4Val;
	}


	/**
	 * @return the week5Val
	 */
	public String getWeek5Val() {
		return (week5Val == null ? "" : week5Val);
	}


	/**
	 * @param week5Val the week5Val to set
	 */
	public void setWeek5Val(String week5Val) {
		this.week5Val = week5Val;
	}


	/**
	 * @return the week6Val
	 */
	public String getWeek6Val() {
		return (week6Val == null ? "" : week6Val);
	}


	/**
	 * @param week6Val the week6Val to set
	 */
	public void setWeek6Val(String week6Val) {
		this.week6Val = week6Val;
	}


	/**
	 * @return the week7Val
	 */
	public String getWeek7Val() {
		return (week7Val == null ? "" : week7Val);
	}


	/**
	 * @param week7Val the week7Val to set
	 */
	public void setWeek7Val(String week7Val) {
		this.week7Val = week7Val;
	}


	/**
	 * @return the week8Val
	 */
	public String getWeek8Val() {
		return (week8Val == null ? "" : week8Val);
	}


	/**
	 * @param week8Val the week8Val to set
	 */
	public void setWeek8Val(String week8Val) {
		this.week8Val = week8Val;
	}


	/**
	 * @return the week9Val
	 */
	public String getWeek9Val() {
		return (week9Val == null ? "" : week9Val);
	}


	/**
	 * @param week9Val the week9Val to set
	 */
	public void setWeek9Val(String week9Val) {
		this.week9Val = week9Val;
	}


	/**
	 * @return the week10Val
	 */
	public String getWeek10Val() {
		return (week10Val == null ? "" : week10Val);
	}


	/**
	 * @param week10Val the week10Val to set
	 */
	public void setWeek10Val(String week10Val) {
		this.week10Val = week10Val;
	}


	/**
	 * @return the week11Val
	 */
	public String getWeek11Val() {
		return (week11Val == null ? "" : week11Val);
	}


	/**
	 * @param week11Val the week11Val to set
	 */
	public void setWeek11Val(String week11Val) {
		this.week11Val = week11Val;
	}


	/**
	 * @return the week12Val
	 */
	public String getWeek12Val() {
		return (week12Val == null ? "" : week12Val);
	}


	/**
	 * @param week12Val the week12Val to set
	 */
	public void setWeek12Val(String week12Val) {
		this.week12Val = week12Val;
	}


	/**
	 * @return the week13Val
	 */
	public String getWeek13Val() {
		return (week13Val == null ? "" : week13Val);
	}


	/**
	 * @param week13Val the week13Val to set
	 */
	public void setWeek13Val(String week13Val) {
		this.week13Val = week13Val;
	}


	/**
	 * @return the week14Val
	 */
	public String getWeek14Val() {
		return (week14Val == null ? "" : week14Val);
	}


	/**
	 * @param week14Val the week14Val to set
	 */
	public void setWeek14Val(String week14Val) {
		this.week14Val = week14Val;
	}


	/**
	 * @return the week15Val
	 */
	public String getWeek15Val() {
		return (week15Val == null ? "" : week15Val);
	}


	/**
	 * @param week15Val the week15Val to set
	 */
	public void setWeek15Val(String week15Val) {
		this.week15Val = week15Val;
	}


	/**
	 * @return the week16Val
	 */
	public String getWeek16Val() {
		return (week16Val == null ? "" : week16Val);
	}


	/**
	 * @param week16Val the week16Val to set
	 */
	public void setWeek16Val(String week16Val) {
		this.week16Val = week16Val;
	}


	/**
	 * @return the week17Val
	 */
	public String getWeek17Val() {
		return (week17Val == null ? "" : week17Val);
	}


	/**
	 * @param week17Val the week17Val to set
	 */
	public void setWeek17Val(String week17Val) {
		this.week17Val = week17Val;
	}


	/**
	 * @return the week18Val
	 */
	public String getWeek18Val() {
		return (week18Val == null ? "" : week18Val);
	}


	/**
	 * @param week18Val the week18Val to set
	 */
	public void setWeek18Val(String week18Val) {
		this.week18Val = week18Val;
	}


	/**
	 * @return the week19Val
	 */
	public String getWeek19Val() {
		return (week19Val == null ? "" : week19Val);
	}


	/**
	 * @param week19Val the week19Val to set
	 */
	public void setWeek19Val(String week19Val) {
		this.week19Val = week19Val;
	}


	/**
	 * @return the week20Val
	 */
	public String getWeek20Val() {
		return (week20Val == null ? "" : week20Val);
	}


	/**
	 * @param week20Val the week20Val to set
	 */
	public void setWeek20Val(String week20Val) {
		this.week20Val = week20Val;
	}


	/**
	 * @return the week21Val
	 */
	public String getWeek21Val() {
		return (week21Val == null ? "" : week21Val);
	}


	/**
	 * @param week21Val the week21Val to set
	 */
	public void setWeek21Val(String week21Val) {
		this.week21Val = week21Val;
	}


	/**
	 * @return the week22Val
	 */
	public String getWeek22Val() {
		return (week22Val == null ? "" : week22Val);
	}


	/**
	 * @param week22Val the week22Val to set
	 */
	public void setWeek22Val(String week22Val) {
		this.week22Val = week22Val;
	}


	/**
	 * @return the week23Val
	 */
	public String getWeek23Val() {
		return (week23Val == null ? "" : week23Val);
	}


	/**
	 * @param week23Val the week23Val to set
	 */
	public void setWeek23Val(String week23Val) {
		this.week23Val = week23Val;
	}


	/**
	 * @return the week24Val
	 */
	public String getWeek24Val() {
		return (week24Val == null ? "" : week24Val);
	}


	/**
	 * @param week24Val the week24Val to set
	 */
	public void setWeek24Val(String week24Val) {
		this.week24Val = week24Val;
	}


	/**
	 * @return the week25Val
	 */
	public String getWeek25Val() {
		return (week25Val == null ? "" : week25Val);
	}


	/**
	 * @param week25Val the week25Val to set
	 */
	public void setWeek25Val(String week25Val) {
		this.week25Val = week25Val;
	}


	/**
	 * @return the week26Val
	 */
	public String getWeek26Val() {
		return (week26Val == null ? "" : week26Val);
	}


	/**
	 * @param week26Val the week26Val to set
	 */
	public void setWeek26Val(String week26Val) {
		this.week26Val = week26Val;
	}


	/**
	 * @return the week27Val
	 */
	public String getWeek27Val() {
		return (week27Val == null ? "" : week27Val);
	}


	/**
	 * @param week27Val the week27Val to set
	 */
	public void setWeek27Val(String week27Val) {
		this.week27Val = week27Val;
	}


	/**
	 * @return the week28Val
	 */
	public String getWeek28Val() {
		return (week28Val == null ? "" : week28Val);
	}


	/**
	 * @param week28Val the week28Val to set
	 */
	public void setWeek28Val(String week28Val) {
		this.week28Val = week28Val;
	}


	/**
	 * @return the urgentFlag
	 */
	public String getUrgentFlag() {
		return (urgentFlag == null ? "" : urgentFlag);
	}


	/**
	 * @param urgentFlag the urgentFlag to set
	 */
	public void setUrgentFlag(String urgentFlag) {
		this.urgentFlag = urgentFlag;
	}


	/**
	 * @return the tab_name
	 */
	public String getTab_name() {
		return tab_name;
	}


	/**
	 * @param tab_name the tab_name to set
	 */
	public void setTab_name(String tab_name) {
		this.tab_name = tab_name;
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
	 * @return the article_uom
	 */
	public String getArticle_uom() {
		return article_uom;
	}


	/**
	 * @param article_uom the article_uom to set
	 */
	public void setArticle_uom(String article_uom) {
		this.article_uom = article_uom;
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
	 * @return the soh
	 */
	public String getSoh() {
		return soh;
	}


	/**
	 * @param soh the soh to set
	 */
	public void setSoh(String soh) {
		this.soh = soh;
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
	 * @return the department_no
	 */
	public String getDepartment_no() {
		return department_no;
	}


	/**
	 * @param department_no the department_no to set
	 */
	public void setDepartment_no(String department_no) {
		this.department_no = department_no;
	}


	/**
	 * @return the department_name
	 */
	public String getDepartment_name() {
		return department_name;
	}


	/**
	 * @param department_name the department_name to set
	 */
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}


	/**
	 * @return the category_no
	 */
	public String getCategory_no() {
		return category_no;
	}


	/**
	 * @param category_no the category_no to set
	 */
	public void setCategory_no(String category_no) {
		this.category_no = category_no;
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
	 * @return the sub_category_no
	 */
	public String getSub_category_no() {
		return sub_category_no;
	}


	/**
	 * @param sub_category_no the sub_category_no to set
	 */
	public void setSub_category_no(String sub_category_no) {
		this.sub_category_no = sub_category_no;
	}


	/**
	 * @return the sub_category_name
	 */
	public String getSub_category_name() {
		return sub_category_name;
	}


	/**
	 * @param sub_category_name the sub_category_name to set
	 */
	public void setSub_category_name(String sub_category_name) {
		this.sub_category_name = sub_category_name;
	}


	/**
	 * @return the segment_no
	 */
	public String getSegment_no() {
		return segment_no;
	}


	/**
	 * @param segment_no the segment_no to set
	 */
	public void setSegment_no(String segment_no) {
		this.segment_no = segment_no;
	}


	/**
	 * @return the segment_name
	 */
	public String getSegment_name() {
		return segment_name;
	}


	/**
	 * @param segment_name the segment_name to set
	 */
	public void setSegment_name(String segment_name) {
		this.segment_name = segment_name;
	}


	/**
	 * @return the sale_or_return_flag
	 */
	public String getSale_or_return_flag() {
		return sale_or_return_flag;
	}


	/**
	 * @param sale_or_return_flag the sale_or_return_flag to set
	 */
	public void setSale_or_return_flag(String sale_or_return_flag) {
		this.sale_or_return_flag = sale_or_return_flag;
	}


	/**
	 * @return the perpetual_flag
	 */
	public String getPerpetual_flag() {
		return perpetual_flag;
	}


	/**
	 * @param perpetual_flag the perpetual_flag to set
	 */
	public void setPerpetual_flag(String perpetual_flag) {
		this.perpetual_flag = perpetual_flag;
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
	 * @return the weighted_article_flag
	 */
	public String getWeighted_article_flag() {
		return weighted_article_flag;
	}


	/**
	 * @param weighted_article_flag the weighted_article_flag to set
	 */
	public void setWeighted_article_flag(String weighted_article_flag) {
		this.weighted_article_flag = weighted_article_flag;
	}


	/**
	 * @return the deleted_article_flag
	 */
	public String getDeleted_article_flag() {
		return deleted_article_flag;
	}


	/**
	 * @param deleted_article_flag the deleted_article_flag to set
	 */
	public void setDeleted_article_flag(String deleted_article_flag) {
		this.deleted_article_flag = deleted_article_flag;
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
	 * @return the std_sell_price
	 */
	public String getStd_sell_price() {
		return std_sell_price;
	}


	/**
	 * @param std_sell_price the std_sell_price to set
	 */
	public void setStd_sell_price(String std_sell_price) {
		this.std_sell_price = std_sell_price;
	}


	/**
	 * @return the promo_sell_price
	 */
	public String getPromo_sell_price() {
		return promo_sell_price;
	}


	/**
	 * @param promo_sell_price the promo_sell_price to set
	 */
	public void setPromo_sell_price(String promo_sell_price) {
		this.promo_sell_price = promo_sell_price;
	}


	/**
	 * @return the result_set_no
	 */
	public String getResult_set_no() {
		return result_set_no;
	}


	/**
	 * @param result_set_no the result_set_no to set
	 */
	public void setResult_set_no(String result_set_no) {
		this.result_set_no = result_set_no;
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
	 * @return the lto_details
	 */
	public String getLto_details() {
		return lto_details;
	}


	/**
	 * @param lto_details the lto_details to set
	 */
	public void setLto_details(String lto_details) {
		this.lto_details = lto_details;
	}


	/**
	 * @return the promo_flag
	 */
	public String getPromo_flag() {
		return promo_flag;
	}


	/**
	 * @param promo_flag the promo_flag to set
	 */
	public void setPromo_flag(String promo_flag) {
		this.promo_flag = promo_flag;
	}


	/**
	 * @return the actioned_flag
	 */
	public String getActioned_flag() {
		return actioned_flag;
	}


	/**
	 * @param actioned_flag the actioned_flag to set
	 */
	public void setActioned_flag(String actioned_flag) {
		this.actioned_flag = actioned_flag;
	}


	/**
	 * @return the sEQUENCE_NO
	 */
	public String getSEQUENCE_NO() {
		return SEQUENCE_NO;
	}


	/**
	 * @param sEQUENCE_NO the sEQUENCE_NO to set
	 */
	public void setSEQUENCE_NO(String sEQUENCE_NO) {
		SEQUENCE_NO = sEQUENCE_NO;
	}


	/**
	 * @return the use_by_dates
	 */
	public ArrayList<OOCUseByDateReportResult> getUse_by_dates() {
		return use_by_dates;
	}


	/**
	 * @param use_by_dates the use_by_dates to set
	 */
	public void setUse_by_dates(ArrayList<OOCUseByDateReportResult> use_by_dates) {
		this.use_by_dates = use_by_dates;
	}
	
	
	
}
