package au.com.woolworths.portal.model;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.reports.ReportGlobalVariables;
import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class InventoryReportResult {

	DateFormat PRINT_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	DateFormat RESULT_DATE_FORMAT = new SimpleDateFormat("yyyy-mm-dd");
	NumberFormat twoDecimalformatter = new DecimalFormat("#.##");
	NumberFormat threeDecimalformatter = new DecimalFormat("#.###");

	@JsonProperty("article_no")
	private String article_no;
	@JsonProperty("article_desc")
	private String article_desc;
	@JsonProperty("uom")
	private String uom;
	@JsonProperty("om")
	private String om;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("mpl")
	private String mpl;
	@JsonProperty("facings")
	private String facings;
	@JsonProperty("shelf_capacity")
	private String shelf_capacity;
	@JsonProperty("days_soh")
	private String days_soh;
	@JsonProperty("sit")
	private String sit;
	@JsonProperty("soo")
	private String soo;
	@JsonProperty("std_sell_price")
	private String std_sell_price;
	@JsonProperty("inv_sales_val")
	private String inv_sales_val;
	@JsonProperty("last_sold_date")
	private String last_sold_date;
	@JsonProperty("dept_name")
	private String dept_name;
	@JsonProperty("cat_name")
	private String cat_name;
	@JsonProperty("sub_cat_name")
	private String sub_cat_name;
	@JsonProperty("seg_name")
	private String seg_name;
	@JsonProperty("groupBy")
	private String groupBy;
	@JsonProperty("capacity")
	private String capacity;

	@JsonProperty("pbd_ind")
	private String pbd_ind;

	@JsonProperty("pi_flag")
	private String pi_flag;

	@JsonProperty("del_ind")
	private String del_ind;

	@JsonProperty("promo_flag")
	private String promo_flag;
	@JsonProperty("flag_ind")
	private String flag_ind;

	public String getPbd_ind() {
		return pbd_ind;
	}

	public void setPbd_ind(String pbd_ind) {
		this.pbd_ind = pbd_ind;
	}

	public String getPi_flag() {
		return pi_flag;
	}

	public void setPi_flag(String pi_flag) {
		this.pi_flag = pi_flag;
	}

	public String getDel_ind() {
		return del_ind;
	}

	public void setDel_ind(String del_ind) {
		this.del_ind = del_ind;
	}

	public String getPromo_flag() {
		return promo_flag;
	}

	public void setPromo_flag(String promo_flag) {
		this.promo_flag = promo_flag;
	}

	public String getCapacity() {
		return capacity;
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}

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

	public String getSoh() {
		try{
			if (!CommonUtils.isEmpty(std_sell_price)) {
				soh = threeDecimalformatter.format(Double.parseDouble(soh));
			} else {
				soh = "";
			}
		}catch(Exception e){
			
		}
		return (soh == null ? "" : soh);
	}

	public void setSoh(String soh) {
		this.soh = soh;
	}

	public String getMpl() {
		return (mpl == null ? "" : mpl);
	}

	public void setMpl(String mpl) {
		this.mpl = mpl;
	}

	public String getFacings() {
		return (facings == null ? "" : facings);
	}

	public void setFacings(String facings) {
		this.facings = facings;
	}

	public String getShelf_capacity() {
		return (shelf_capacity == null ? "" : shelf_capacity);
	}

	public void setShelf_capacity(String shelf_capacity) {
		this.shelf_capacity = shelf_capacity;
	}

	public String getDays_soh() {
		try{
		if (!CommonUtils.isEmpty(days_soh)) {
			days_soh = twoDecimalformatter.format(Double.parseDouble(days_soh));
		}else{
			days_soh = "";
		}		
		}catch(Exception e){			
		}
		return (days_soh == null ? "" : days_soh);
	}

	public void setDays_soh(String days_soh) {
		this.days_soh = days_soh;
	}

	public String getSit() {
		return (sit == null ? "" : sit);
	}

	public void setSit(String sit) {
		this.sit = sit;
	}

	public String getSoo() {
		return (soo == null ? "" : soo);
	}

	public void setSoo(String soo) {
		this.soo = soo;
	}

	public String getStd_sell_price() {
		try{
		if (!CommonUtils.isEmpty(std_sell_price)) {
			std_sell_price = twoDecimalformatter.format(Double
					.parseDouble(std_sell_price));
		} else {
			std_sell_price = "";
		}
		}catch(Exception e){
			
		}
		return (std_sell_price == null ? "" : std_sell_price);
	}

	public void setStd_sell_price(String std_sell_price) {
		this.std_sell_price = std_sell_price;
	}

	public String getInv_sales_val() {
		if (!CommonUtils.isEmpty(inv_sales_val)) {
			inv_sales_val = twoDecimalformatter.format(Double
					.parseDouble(inv_sales_val));
		} else {
			inv_sales_val = "";
		}
		return inv_sales_val;
	}

	public void setInv_sales_val(String inv_sales_val) {
		this.inv_sales_val = inv_sales_val;
	}

	public String getLast_sold_date() {
		/*last_sold_date = (last_sold_date != null && last_sold_date
				.split("-").length > 1) ? PRINT_DATE_FORMAT
				.format(RESULT_DATE_FORMAT.parse(last_sold_date)) : "";*/
		
		last_sold_date= (last_sold_date != null && last_sold_date			//Defect_10602  - prod issue - wrong date displaying
				.split("-").length > 1) ? CommonUtils.convertDateToDefaultFormat(last_sold_date) : "";
		
		return last_sold_date;
	}

	public void setLast_sold_date(String last_sold_date) {
		this.last_sold_date = last_sold_date;
	}

	public String getDept_name() {
		return (dept_name == null ? "" : dept_name);
	}

	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}

	public String getCat_name() {
		return (cat_name == null ? "" : cat_name);
	}

	public void setCat_name(String cat_name) {
		this.cat_name = cat_name;
	}

	public String getSub_cat_name() {
		return (sub_cat_name == null ? "" : sub_cat_name);
	}

	public void setSub_cat_name(String sub_cat_name) {
		this.sub_cat_name = sub_cat_name;
	}

	public String getSeg_name() {
		return (seg_name == null ? "" : seg_name);
	}

	public void setSeg_name(String seg_name) {
		this.seg_name = seg_name;
	}

	public String getGroupBy() {
		if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("DEPT")) {
			groupBy = getDept_name();
		} else if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("CAT")) {
			groupBy = getCat_name();
		} else if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("SUB_CAT")) {
			groupBy = getSub_cat_name();
		} else if (ReportGlobalVariables.GROUP_BY_VALUE.equalsIgnoreCase("SEG")) {
			groupBy = getSeg_name();
		} else {
			groupBy = "";
		}
		return groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

	public String getFlag_ind() {
		this.flag_ind = "";
		if (this.del_ind != null && this.del_ind.equalsIgnoreCase("Y")) {
			flag_ind = "D";
		} else if (this.pbd_ind != null && this.pbd_ind.equalsIgnoreCase("Y")) {
			flag_ind = "PB";
		} else if (this.pi_flag != null && this.pi_flag.equalsIgnoreCase("Y")) {
			flag_ind = "PI";
		} else if (this.promo_flag != null
				&& this.promo_flag.equalsIgnoreCase("Y")) {
			flag_ind = "P";
		}
		return flag_ind;
	}

	public void setFlag_ind(String flag_ind) {
		this.flag_ind = flag_ind;
	}

}
