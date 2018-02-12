package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class GoodsMovementSummaryReportResult {

	@JsonProperty("article_no")
	private String article_no;

	@JsonProperty("uom")
	private String uom;

	@JsonProperty("article_desc")
	private String article_desc;

	@JsonProperty("reason_desc")
	private String reason_desc;

	@JsonProperty("reason_code")
	private String reason_code;

	@JsonProperty("reason_code_name")
	private String reason_code_name;

	@JsonProperty("reason_desc_final")
	private String reason_desc_final;

	@JsonProperty("adj_date_time")
	private String adj_date_time;

	@JsonProperty("adjustment_date")
	private String adjustment_date;

	@JsonProperty("adjustment_time")
	private String adjustment_time;

	@JsonProperty("adjustment_qty")
	private String adjustment_qty;

	@JsonProperty("adjustment_value")
	private String adjustment_value;

	@JsonProperty("mvmt_type")
	private String mvmt_type;

	@JsonProperty("end_soh")
	private String end_soh;

	@JsonProperty("mvmt_type_desc")
	private String mvmt_type_desc;

	@JsonProperty("user_name")
	private String user_name;

	@JsonProperty("soh_adjusted")
	private String soh_adjusted;

	@JsonProperty("std_sell_price")
	private String std_sell_price;

	@JsonProperty("stk_adj_value")
	private String stk_adj_value;

	@JsonProperty("additional_info")
	private String additional_info;

	@JsonProperty("user_id")
	private String user_id;

	@JsonProperty("old_value")
	private String old_value;

	@JsonProperty("old_value_sap")
	private String old_value_sap;

	@JsonProperty("new_value")
	private String new_value;

	@JsonProperty("dept_name")
	private String dept_name;

	@JsonProperty("additional_info_final")
	private String additional_info_final;

	@JsonProperty("stk_adj_value_final")
	private String stk_adj_value_final;

	@JsonProperty("date_time_final")
	private String date_time_final;

	@JsonProperty("adj_date")
	private String adj_date;

	@JsonProperty("oldSOH")
	private String oldSOH;

	@JsonProperty("soh_original")
	private String soh_original;

	@JsonProperty("new_soh")
	private String new_soh;

	@JsonProperty("date_time_sap")
	private String date_time_sap;

	@JsonProperty("getDateAndTime")
	private String getDateAndTime;

	@JsonProperty("adjustment_qty_with_sign")
	private String adjustment_qty_with_sign;

	@JsonProperty("adjustment_qty_pi_with_sign")
	private String adjustment_qty_pi_with_sign;

	@JsonProperty("flag_info")
	private String flag_info;

	@JsonProperty("perpetual_flag")
	private String perpetual_flag;

	@JsonProperty("pbd_ind")
	private String pbd_ind;

	@JsonProperty("pi_uom")
	private String pi_uom;

	@JsonProperty("random_weight_flag")
	private String random_weight_flag;

	@JsonProperty("current_soh_pi")
	private String current_soh_pi;

	@JsonProperty("adj_qty_pi")
	private String adj_qty_pi;

	@JsonProperty("new_soh_pi")
	private String new_soh_pi;

	@JsonProperty("shkzg")
	private String shkzg;

	@JsonProperty("store_reason_code_long_desc")
	private String store_reason_code_long_desc;

	@JsonProperty("store_reason_code")
	private String store_reason_code;

	@JsonProperty("store_reason_code_short_desc")
	private String store_reason_code_short_desc;

	public String getArticle_no() {
		return (article_no == null ? "" : article_no);
	}

	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}

	public String getArticle_desc() {
		return (article_desc == null ? "" : article_desc
				.replaceAll("\\s+", " "));
	}

	public void setArticle_desc(String article_desc) {
		this.article_desc = article_desc;
	}

	public String getUom() {
		String uomValue = "";
		if (this.random_weight_flag != null
				&& this.random_weight_flag.equalsIgnoreCase("Y")) {
			uomValue = uom + "\n" + this.pi_uom;
		} else {
			uomValue = uom;
		}
		return uomValue;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getReason_desc() {
		return (reason_desc == null ? "" : reason_desc);
	}

	public void setReason_desc(String reason_desc) {
		this.reason_desc = reason_desc;
	}

	public String getAdj_date_time() {
		return (adj_date_time == null ? "" : adj_date_time);
	}

	public void setAdj_date_time(String adj_date_time) {
		this.adj_date_time = adj_date_time;
	}

	public String getUser_name() {
		return (user_name == null ? "" : user_name);
	}

	public void setUser_name(String user_name) {
		this.user_name = user_name;
	}

	public String getSoh_adjusted() {
		String symbol = "";
		String symbolNeg = "-";
		try {
			if (Double.parseDouble(this.soh_original) < Double
					.parseDouble(this.new_soh)) { // /Defect_10486
				symbol = "+";
			} else if (Double.parseDouble(this.soh_original) > Double
					.parseDouble(this.new_soh)) {
				if (this.soh_adjusted.contains(symbolNeg)) {
					symbol = "";
				} else {
					symbol = "-";
				}
			}
			return (soh_adjusted == null ? "" : symbol
					+ CommonUtils.formatTo3DecimalPlaces(soh_adjusted));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (soh_adjusted);// defect 7255
	}

	public void setSoh_adjusted(String soh_adjusted) {
		this.soh_adjusted = soh_adjusted;
	}

	public String getStd_sell_price() {
		return (std_sell_price == null ? "" : CommonUtils
				.formatTo2DecimalPlaces(std_sell_price));
	}

	public void setStd_sell_price(String std_sell_price) {
		this.std_sell_price = std_sell_price;
	}

	public String getStk_adj_value() {
		return (stk_adj_value == null ? "" : CommonUtils
				.formatTo3DecimalPlaces(stk_adj_value));
	}

	public void setStk_adj_value(String stk_adj_value) {
		this.stk_adj_value = stk_adj_value;
	}

	public String getAdditional_info() {
		return (additional_info == null ? "" : additional_info);
	}

	public void setAdditional_info(String additional_info) {
		this.additional_info = additional_info;
	}

	public String getUser_id() {
		return (user_id == null ? "" : user_id);
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getOld_value() {
		if (!CommonUtils.isEmpty(oldSOH)) {
			old_value = oldSOH;
		} else {
			old_value = "";
		}
		if (!this.perpetual_flag.isEmpty() && this.perpetual_flag != null
				&& this.perpetual_flag.equalsIgnoreCase("N")) {
			return "-";
		} else {
			old_value = CommonUtils.formatTo3DecimalPlaces(old_value);
			if (this.random_weight_flag != null
					&& this.random_weight_flag.equalsIgnoreCase("Y")) {
				old_value = old_value+"\n"+this.current_soh_pi;
			}
		}
		return old_value;
	}

	public void setOld_value(String old_value) {
		this.old_value = old_value;
	}

	public String getNew_value() {
		if (!CommonUtils.isEmpty(new_soh)) {
			new_value = new_soh;
		} else if (!CommonUtils.isEmpty(end_soh)) {
			new_value = end_soh;
		} else {
			new_value = "";
		}
		if (!this.perpetual_flag.isEmpty() && this.perpetual_flag != null
				&& this.perpetual_flag.equalsIgnoreCase("N")) {
			return "-";
		} else {
			new_value = CommonUtils.formatTo3DecimalPlaces(new_value);
			if (this.random_weight_flag != null
					&& this.random_weight_flag.equalsIgnoreCase("Y")) {
				new_value = new_value+"\n"+this.new_soh_pi;
			}
		}
		return new_value;
	}

	public void setNew_value(String new_value) {
		this.new_value = new_value;
	}

	public String getDept_name() {
		return (dept_name == null ? "" : dept_name);
	}

	public void setDept_name(String dept_name) {
		this.dept_name = dept_name;
	}

	public String getReason_code_name() {
		return (reason_code_name == null ? "" : reason_code_name);
	}

	public void setReason_code_name(String reason_code_name) {
		this.reason_code_name = reason_code_name;
	}

	public String getAdjustment_date() {
		return (adjustment_date == null ? "" : adjustment_date);
	}

	public void setAdjustment_date(String adjustment_date) {
		this.adjustment_date = adjustment_date;
	}

	public String getAdjustment_qty() {
		try {
			adjustment_qty = String.valueOf(Math.abs(Double
					.parseDouble(adjustment_qty)));
		} catch (Exception e) {

		}
		return (adjustment_qty == null ? "" : (CommonUtils
				.formatTo3DecimalPlaces(adjustment_qty)));
	}

	public void setAdjustment_qty(String adjustment_qty) {
		this.adjustment_qty = adjustment_qty;
	}

	public String getMvmt_type() {
		return (mvmt_type == null ? "" : mvmt_type);
	}

	public void setMvmt_type(String mvmt_type) {
		this.mvmt_type = mvmt_type;
	}

	public String getEnd_soh() {
		return (end_soh == null ? "" : end_soh);
	}

	public void setEnd_soh(String end_soh) {
		this.end_soh = end_soh;
	}

	public String getMvmt_type_desc() {
		return (mvmt_type_desc == null ? "" : mvmt_type_desc);
	}

	public void setMvmt_type_desc(String mvmt_type_desc) {
		this.mvmt_type_desc = mvmt_type_desc;
	}

	public String getReason_desc_final() {
		if (!CommonUtils.isEmpty(reason_code_name)) {
			reason_desc_final = reason_code_name;
		} else if (!CommonUtils.isEmpty(reason_desc)) {
			reason_desc_final = reason_desc;
		} else {
			reason_desc_final = "";
		}
		if (reason_desc_final != null && !reason_desc_final.isEmpty()
				&& reason_code != null && !reason_code.isEmpty()) {
			reason_desc_final = reason_desc_final + " (" + reason_code + ")";
		}
		return reason_desc_final;
	}

	public void setReason_desc_final(String reason_desc_final) {
		this.reason_desc_final = reason_desc_final;
	}

	public String getAdditional_info_final() {
		if (!CommonUtils.isEmpty(additional_info)) {
			additional_info_final = additional_info;
		} else if (!CommonUtils.isEmpty(mvmt_type_desc)) {
			additional_info_final = mvmt_type_desc;
		} else {
			additional_info_final = "";
		}
		return additional_info_final;
	}

	public void setAdditional_info_final(String additional_info_final) {
		this.additional_info_final = additional_info_final;
	}

	public String getStk_adj_value_final() {
		if (!CommonUtils.isEmpty(stk_adj_value)) {
			stk_adj_value_final = stk_adj_value;
		} else if (!CommonUtils.isEmpty(adjustment_value)) {
			stk_adj_value_final = adjustment_value;
		} else {
			stk_adj_value_final = "";
		}
		return CommonUtils.formatTo3DecimalPlaces(stk_adj_value_final);
	}

	public void setStk_adj_value_final(String stk_adj_value_final) {
		this.stk_adj_value_final = stk_adj_value_final;
	}

	public String getDate_time_final() {
		/*
		 * if (!CommonUtils.isEmpty(adjustment_date)) { date_time_final =
		 * adjustment_date; } else if (!CommonUtils.isEmpty(adj_date_time)) {
		 * date_time_final = adj_date_time; } else { date_time_final = ""; }
		 */
		return date_time_final;
	}

	public void setDate_time_final(String date_time_final) {
		this.date_time_final = date_time_final;
	}

	public String getAdjustment_value() {
		return adjustment_value;
	}

	public void setAdjustment_value(String adjustment_value) {
		this.adjustment_value = adjustment_value;
	}

	public String getOldSOH() {
		return oldSOH;
	}

	public void setOldSOH(String oldSOH) {
		this.oldSOH = oldSOH;
	}

	public String getSoh_original() {
		return soh_original;
	}

	public void setSoh_original(String soh_original) {
		this.soh_original = soh_original;
	}

	public String getNew_soh() {
		return new_soh;
	}

	public void setNew_soh(String new_soh) {
		this.new_soh = new_soh;
	}

	public String getAdj_date() {
		return adj_date == null ? "" : adj_date.substring(6, 8) + '/'
				+ adj_date.substring(4, 6) + '/' + adj_date.substring(0, 4);
	}

	public void setAdj_date(String adj_date) {
		this.adj_date = adj_date;
	}

	public String getDate_time_sap() {
		if (date_time_sap == null || date_time_sap.isEmpty()) {
			try {
				if (this.adjustment_date != null
						&& !this.adjustment_date.isEmpty()
						&& this.adjustment_date.split("\\.").length > 1) {
					String dateArray[] = this.adjustment_date.split("\\.");
					date_time_sap = dateArray[0] + "/" + dateArray[1] + "/"
							+ dateArray[2];
				} else {
					date_time_sap = "";
				}
				if (this.adjustment_time != null
						&& !this.adjustment_time.isEmpty()) {
					date_time_sap = date_time_sap + " " + this.adjustment_time;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return date_time_sap;
	}

	public void setDate_time_sap(String date_time_sap) {
		this.date_time_sap = date_time_sap;
	}

	public String getReason_code() {
		return reason_code;
	}

	public void setReason_code(String reason_code) {
		this.reason_code = reason_code;
	}

	public String getAdjustment_time() {
		return adjustment_time;
	}

	public void setAdjustment_time(String adjustment_time) {
		this.adjustment_time = adjustment_time;
	}

	public String getOld_value_sap() {
		try {
			if (this.end_soh != null && this.adjustment_qty != null
					&& !this.end_soh.isEmpty()
					&& !this.adjustment_qty.isEmpty()) {
				if (this.shkzg != null && !this.shkzg.isEmpty()
						&& this.shkzg.equals("S")) {
					old_value_sap = String.valueOf(Double.parseDouble(end_soh)
							- Math.abs(Double.parseDouble(adjustment_qty)));
				} else if (this.shkzg != null && !this.shkzg.isEmpty()
						&& this.shkzg.equals("H")) {
					old_value_sap = String.valueOf(Double.parseDouble(end_soh)
							+ Math.abs(Double.parseDouble(adjustment_qty)));
				}

			} else {
				old_value_sap = "";
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return CommonUtils.formatTo3DecimalPlaces(old_value_sap);
	}

	public void setOld_value_sap(String old_value_sap) {
		this.old_value_sap = old_value_sap;
	}

	/**
	 * @return the shkzg
	 */
	public String getShkzg() {
		return shkzg;
	}

	/**
	 * @param shkzg
	 *            the shkzg to set
	 */
	public void setShkzg(String shkzg) {
		this.shkzg = shkzg;
	}

	public String getStore_reason_code_long_desc() {
		return store_reason_code_long_desc;
	}

	public void setStore_reason_code_long_desc(
			String store_reason_code_long_desc) {
		this.store_reason_code_long_desc = store_reason_code_long_desc;
	}

	public String getStore_reason_code() {
		return store_reason_code;
	}

	public void setStore_reason_code(String store_reason_code) {
		this.store_reason_code = store_reason_code;
	}

	public String getStore_reason_code_short_desc() {
		return store_reason_code_short_desc;
	}

	public void setStore_reason_code_short_desc(
			String store_reason_code_short_desc) {
		this.store_reason_code_short_desc = store_reason_code_short_desc;
	}

	public String getGetDateAndTime() {
		return getDateAndTime;
	}

	public void setGetDateAndTime(String getDateAndTime) {
		this.getDateAndTime = getDateAndTime;
	}

	public String getAdjustment_qty_with_sign() {
		String adjustmentQtyVal="";
		if(this.random_weight_flag!=null && this.random_weight_flag.equalsIgnoreCase("Y")){
			adjustmentQtyVal = adjustment_qty_with_sign+"\n"+this.adjustment_qty_pi_with_sign;
		}else{
			adjustmentQtyVal = adjustment_qty_with_sign;
		}
		return adjustmentQtyVal;
	}

	public void setAdjustment_qty_with_sign(String adjustment_qty_with_sign) {
		this.adjustment_qty_with_sign = adjustment_qty_with_sign;
	}

	public String getFlag_info() {
		flag_info = "";
		StringBuilder sb = new StringBuilder();
		if (this.perpetual_flag != null
				&& this.perpetual_flag.equalsIgnoreCase("Y")) {
			// flag_info = "PI";
			sb.append("PI ");
		}
		if (this.pbd_ind != null && this.pbd_ind.equalsIgnoreCase("Y")) {
			// flag_info = "PB";
			sb.append("PB ");
		}

		flag_info = sb.toString();
		return flag_info;
	}

	public void setFlag_info(String flag_info) {
		this.flag_info = flag_info;
	}

	public String getPerpetual_flag() {
		return perpetual_flag;
	}

	public void setPerpetual_flag(String perpetual_flag) {
		this.perpetual_flag = perpetual_flag;
	}

	public String getPbd_ind() {
		return pbd_ind;
	}

	public void setPbd_ind(String pbd_ind) {
		this.pbd_ind = pbd_ind;
	}

	public String getPi_uom() {
		return pi_uom;
	}

	public void setPi_uom(String pi_uom) {
		this.pi_uom = pi_uom;
	}

	public String getRandom_weight_flag() {
		return random_weight_flag;
	}

	public void setRandom_weight_flag(String random_weight_flag) {
		this.random_weight_flag = random_weight_flag;
	}

	public String getCurrent_soh_pi() {
		return current_soh_pi;
	}

	public void setCurrent_soh_pi(String current_soh_pi) {
		this.current_soh_pi = current_soh_pi;
	}

	public String getAdj_qty_pi() {
		return adj_qty_pi;
	}

	public void setAdj_qty_pi(String adj_qty_pi) {
		this.adj_qty_pi = adj_qty_pi;
	}

	public String getNew_soh_pi() {
		return new_soh_pi;
	}

	public void setNew_soh_pi(String new_soh_pi) {
		this.new_soh_pi = new_soh_pi;
	}

	public String getAdjustment_qty_pi_with_sign() {
		return adjustment_qty_pi_with_sign;
	}

	public void setAdjustment_qty_pi_with_sign(
			String adjustment_qty_pi_with_sign) {
		this.adjustment_qty_pi_with_sign = adjustment_qty_pi_with_sign;
	}

}