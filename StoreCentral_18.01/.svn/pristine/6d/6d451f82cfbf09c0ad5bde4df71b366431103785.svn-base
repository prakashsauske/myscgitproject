package au.com.woolworths.portal.model;

import java.text.DecimalFormat;
import java.util.Arrays;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeVarianceResult {

	@JsonProperty("article_no")
	private String article_no;

	@JsonProperty("article_desc")
	private String article_desc;

	@JsonProperty("sell_price")
	private String sell_price;

	@JsonProperty("base_count")
	private String base_count;

	@JsonProperty("location")
	private String location;

	@JsonProperty("sub_cat_name")
	private String subCategorie;

	@JsonProperty("count_1")
	private String count_1;

	@JsonProperty("count_2")
	private String count_2;

	@JsonProperty("count_3")
	private String count_3;

	@JsonProperty("count_4")
	private String count_4;

	@JsonProperty("final_count")
	private String final_count;

	@JsonProperty("soh")
	private String soh;

	@JsonProperty("var_qty")
	private String var_qty;

	@JsonProperty("var_value")
	private String var_value;

	@JsonProperty("promo_indicator")
	private String promo_indicator;

	@JsonProperty("pbd_ind")
	private String pbd_ind;

	@JsonProperty("cpbd_flag")
	private String cpbd_flag;

	@JsonProperty("linked_ind")
	private String linked_ind;

	@JsonProperty("del_ind")
	private String del_ind;

	@JsonProperty("base_count_qty")
	private String base_count_qty;

	@JsonProperty("count_qty_1")
	private String count_qty_1;

	@JsonProperty("count_qty_2")
	private String count_qty_2;

	@JsonProperty("count_qty_3")
	private String count_qty_3;

	@JsonProperty("count_qty_4")
	private String count_qty_4;

	@JsonProperty("final_count_qty")
	private String final_count_qty;

	@JsonProperty("var_cnt_qty")
	private String var_cnt_qty;

	@JsonProperty("pi_uom")
	private String pi_uom;

	@JsonProperty("pi_soh")
	private String pi_soh;

	@JsonProperty("random_weight_flg")
	private String random_weight_flg;

	@JsonProperty("base_uom")
	private String base_uom;

	@JsonProperty("group_tt")
	private String group_tt;

	@JsonProperty("location_cnt")
	private String location_cnt;

	@JsonProperty("location_cnt_excel")
	private String location_cnt_excel;

	@JsonProperty("location_cnt_excel_wrap")
	private String location_cnt_excel_wrap;

	@JsonProperty("cnt")
	private String cnt;

	@JsonProperty("locationDetails")
	private String locationDetails;

	@JsonProperty("locationDetails_excel")
	private String locationDetails_excel;

	@JsonProperty("totalValueLoc")
	private String totalValueLoc;

	@JsonProperty("printLoc")
	private String printLoc;

	@JsonProperty("style_ind")
	private String style_ind;

	@JsonProperty("order_uom")
	private String order_uom;

	@JsonProperty("om")
	private String om;

	@JsonProperty("display_indicator")
	private String display_indicator;

	@JsonProperty("perpetual_flag")
	private String perpetual_flag;

	@JsonProperty("loc_name")
	private String loc_name;
	////12067	
	@JsonProperty("scanned_uom")
	private String scanned_uom;
	
	@JsonProperty("scanned_pi_uom")
	private String scanned_pi_uom;
	
	@JsonProperty("scanned_count")
	private String scanned_count;
	
	@JsonProperty("scanned_count_qty")
	private String scanned_count_qty;
	
	@JsonProperty("cpbd_uom")
	private String cpbd_uom;
	
	@JsonProperty("complex_pack_brk_base_qty")
	private String complex_pack_brk_base_qty;
	
	
	private String overAllTotal;

	private String article_number_indi;

	private String article_desc_excel;

	StringBuilder count_sb = null;
	StringBuilder count_sb_excel = null;

	// added for display indicator in export
	public String getArticle_number_indi() {
		return (article_no == null ? ""
				: article_no
						+ ""
						+ ((getPromo_indicator().isEmpty() || getPromo_indicator() == null) ? ""
								: ("  " + "(" + this.promo_indicator + ")")));
	}

	public void setArticle_number_indi(String article_no) {
		this.article_no = article_no;
	}

	public String getTotalValueLoc() {
		return totalValueLoc;
	}

	public void setTotalValueLoc(String totalValueLoc) {
		this.totalValueLoc = totalValueLoc;
	}

	// added method for validating linked articles (EA) - Defect_11622
	public boolean isInteger(Double totalValue) {
		if (totalValue % 1 > 0) {
			return true;
		} else {
			return false;
		}
	}

	public String getLocationDetails() {
		String loc = (this.printLoc != null && !this.printLoc.isEmpty()) ? this.printLoc
				: "";
		count_sb = new StringBuilder();
		if (!loc.isEmpty()) {
			String[] Location = null;
			String totalVal = "";
			String formattedValue = "";
			String[] count1 = loc.split(",");

			StringBuilder sb = new StringBuilder();
			double[] integers = new double[count1.length];
			double totalValue = 0;

			for (int i = 0; i < count1.length; i++) {
				Location = count1[i].split("=");
				sb.append(Location[0]);
				sb.append("\n");
				////"SC-526/12014"
				count_sb.append(Location[1]+ ((Location[2] != null && !Location[2].isEmpty()) ? " "+Location[2]
						: ""));
				count_sb.append("\n");

				integers[i] = Double.parseDouble(Location[1]);
				totalValue += integers[i];
			}
			// added method for validating linked articles (EA) - Defect_11622
			if (isInteger(totalValue) || this.base_uom.equalsIgnoreCase("KG")
					|| this.base_uom.equalsIgnoreCase("L")
					|| this.base_uom.equalsIgnoreCase("G")) {
				totalVal = Double.toString(totalValue);
				formattedValue = CommonUtils.formatTo3DecimalPlaces(totalVal);
			} else {
				Long L = Math.round(totalValue);
				int formatted = Integer.valueOf(L.intValue());
				formattedValue = Integer.toString(formatted);
			}
			//"SC-526 12014"
			//sb.append("-------------- ");
			//sb.append("\n");
			//sb.append("Total Value ");
			//count_sb.append("-------");
			//count_sb.append("\n");
			//count_sb.append(formattedValue);
			locationDetails = sb.toString();
		} else {
			locationDetails = loc;
		}
		return locationDetails;
	}

	public void setLocationDetails(String locationDetails) {

		this.locationDetails = locationDetails;
	}

	/**
	 * @return the location_cnt
	 */
	public String getLocation_cnt() {
		String Count_final = cnt.toString();
		return Count_final;
	}

	/**
	 * @param location_cnt
	 *            the location_cnt to set
	 */
	public void setLocation_cnt(String location_cnt) {
		this.location_cnt = location_cnt;
	}

	/**
	 * @return the cnt
	 */
	public String getCnt() {
		String cnt = count_sb.toString();
		return cnt;
	}

	/**
	 * @param cnt
	 *            the cnt to set
	 */
	public void setCnt(String cnt) {
		this.cnt = cnt;
	}

	public String getArticle_no() {
		return (article_no == null ? "" : article_no);
	}

	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}

	public String getSubCategorie() {
		return (subCategorie == null ? "" : subCategorie);
	}

	public void setSubCategorie(String subCategorie) {
		this.subCategorie = subCategorie;
	}

	public String getLocation() {
		return (location == null ? "" : location);
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getArticle_desc() {
		return (article_desc == null ? "" : article_desc
				.replaceAll("\\s+", " "));
	}

	public String getArticle_desc_excel() {
		article_desc = (article_desc == null ? "" : article_desc.replaceAll(
				"\\s+", " "));
		String desc = appendAsString(article_desc);
		return desc;
	}

	public void setArticle_desc_excel(String article_desc) {
		this.article_desc = article_desc;
	}

	private static String appendAsString(String str) {
		return "\"" + str + "\"";
	}

	public void setArticle_desc(String article_desc) {
		this.article_desc = article_desc;
	}

	public String getSell_price() {
		if (sell_price != null) {
			try {
				String str = sell_price;
				String[] splited = str.split("\\b+"); // split on space
				boolean wordBoolean = Arrays.asList(splited).contains("per");
				if (!wordBoolean) {
					sell_price = sell_price + " per " + this.base_uom;
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return (sell_price == null ? "" : sell_price);
	}

	public void setSell_price(String sell_price) {
		this.sell_price = sell_price;
	}

	public String getBase_count() {
		return checkIfRandomWeightArticle(
				(base_count == null ? "" : base_count), this.base_count_qty);
	}

	public void setBase_count(String base_count) {
		this.base_count = base_count;
	}

	public String getCount_1() {
		return checkIfRandomWeightArticle((count_1 == null ? "" : count_1),
				this.count_qty_1);
	}

	public void setCount_1(String count_1) {
		this.count_1 = count_1;
	}

	public String getCount_2() {
		return checkIfRandomWeightArticle((count_2 == null ? "" : count_2),
				this.count_qty_2);
	}

	public void setCount_2(String count_2) {
		this.count_2 = count_2;
	}

	public String getCount_3() {
		return checkIfRandomWeightArticle((count_3 == null ? "" : count_3),
				this.count_qty_3);
	}

	public void setCount_3(String count_3) {
		this.count_3 = count_3;
	}

	public String getCount_4() {
		return checkIfRandomWeightArticle((count_4 == null ? "" : count_4),
				this.count_qty_4);
	}

	public void setCount_4(String count_4) {
		this.count_4 = count_4;
	}

	public String getFinal_count_f() {
		return this.final_count == null ? "" : this.final_count;
	}

	public String getFinal_count() {

		String addSplitVal = "";
		String baseAddon = "";
		boolean splitFlg = true;
		String count = checkIfRandomWeightArticle((final_count == null ? ""
				: final_count), this.final_count_qty);
		if (this.random_weight_flg != null
				&& !this.random_weight_flg.equalsIgnoreCase("Y")
				&& (Double.parseDouble(final_count) > 0) && this.om != null
				&& !this.om.isEmpty()) {
			if (final_count.indexOf(".") == -1) {
				splitFlg = false;
			}
			Double floorVal = new Double(Math.floor(Double
					.parseDouble(final_count) / Double.parseDouble(this.om)));
			Double roundVal = new Double(
					Math.round((Double.parseDouble(final_count) % Double
							.parseDouble(this.om)) * 1e3) / 1e3);
			int intConvert = floorVal.intValue();

			if (this.base_uom.equalsIgnoreCase("KG") || splitFlg) {
				String numberAsString = Double.toString(roundVal);
				baseAddon = CommonUtils.formatTo3DecimalPlaces(numberAsString);
			} else {
				int intRound = roundVal.intValue();
				baseAddon = Integer.toString(intRound);
			}
			addSplitVal = ((this.order_uom != null
					&& !(this.order_uom.isEmpty()) && !(this.order_uom
					.equalsIgnoreCase(this.base_uom))) ? " (" + intConvert
					+ " " + this.order_uom + " & " + baseAddon + " "
					+ this.base_uom + ")" : "");
		}

		return count + " " + addSplitVal;
	}

	public void setFinal_count(String final_count) {
		this.final_count = final_count;
	}

	public String getSoh() {
		return checkIfRandomWeightArticleForSOH((soh == null ? "" : soh),
				this.pi_soh);
	}

	public void setSoh(String soh) {
		this.soh = soh;
	}

	public String getVar_qty() {
		return checkIfRandomWeightArticle((var_qty == null ? "" : var_qty),
				this.var_cnt_qty);
	}

	public void setVar_qty(String var_qty) {
		this.var_qty = var_qty;
	}

	public String getVar_value() {
		return (var_value == null ? "" : var_value);
	}

	public void setVar_value(String var_value) {
		this.var_value = var_value;
	}

	public String getPromo_indicator() {

		StringBuilder promoIndi = new StringBuilder();
		promoIndi.append("");
		this.promo_indicator = "";
		if (!CommonUtils.isEmpty(style_ind) && style_ind != null) {
			promoIndi.append("S ");
		}
		if (this.del_ind != null && this.del_ind.equalsIgnoreCase("Y")) {
			promoIndi.append("D ");
		}
		if (this.linked_ind != null && this.linked_ind.equalsIgnoreCase("Y")) {
			promoIndi.append("L ");
		}
		if ((this.pbd_ind != null && this.pbd_ind.equalsIgnoreCase("Y"))
				|| (this.cpbd_flag != null && this.cpbd_flag
						.equalsIgnoreCase("Y"))) {
			promoIndi.append("PB ");
		}

		promo_indicator = promoIndi.toString();
		return promo_indicator;
		/*
		 * if (this.pbd_ind != null && this.pbd_ind.equalsIgnoreCase("Y")) {
		 * this.promo_indicator = "PB"; } else if (this.linked_ind != null &&
		 * this.linked_ind.equalsIgnoreCase("Y")) { this.promo_indicator = "L";
		 * } else if (this.del_ind != null &&
		 * this.del_ind.equalsIgnoreCase("Y")) { this.promo_indicator = "D";
		 * }else if(!CommonUtils.isEmpty(style_ind) && style_ind != null){
		 * promo_indicator ="S"; }else { promo_indicator =""; } return
		 * promo_indicator;
		 */
	}

	public void setPromo_indicator(String promo_indicator) {
		this.promo_indicator = promo_indicator;
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

	public String getDel_ind() {
		return del_ind;
	}

	public void setDel_ind(String del_ind) {
		this.del_ind = del_ind;
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
	 * @return the count_qty_1
	 */
	public String getCount_qty_1() {
		return count_qty_1;
	}

	/**
	 * @param count_qty_1
	 *            the count_qty_1 to set
	 */
	public void setCount_qty_1(String count_qty_1) {
		this.count_qty_1 = count_qty_1;
	}

	/**
	 * @return the count_qty_2
	 */
	public String getCount_qty_2() {
		return count_qty_2;
	}

	/**
	 * @param count_qty_2
	 *            the count_qty_2 to set
	 */
	public void setCount_qty_2(String count_qty_2) {
		this.count_qty_2 = count_qty_2;
	}

	/**
	 * @return the count_qty_3
	 */
	public String getCount_qty_3() {
		return count_qty_3;
	}

	/**
	 * @param count_qty_3
	 *            the count_qty_3 to set
	 */
	public void setCount_qty_3(String count_qty_3) {
		this.count_qty_3 = count_qty_3;
	}

	/**
	 * @return the count_qty_4
	 */
	public String getCount_qty_4() {
		return count_qty_4;
	}

	/**
	 * @param count_qty_4
	 *            the count_qty_4 to set
	 */
	public void setCount_qty_4(String count_qty_4) {
		this.count_qty_4 = count_qty_4;
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
	 * @return the var_cnt_qty
	 */
	public String getVar_cnt_qty() {
		return var_cnt_qty;
	}

	/**
	 * @param var_cnt_qty
	 *            the var_cnt_qty to set
	 */
	public void setVar_cnt_qty(String var_cnt_qty) {
		this.var_cnt_qty = var_cnt_qty;
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

		if (this.random_weight_flg != null
				&& !this.random_weight_flg.equalsIgnoreCase("")
				&& this.random_weight_flg.equalsIgnoreCase("Y")
				&& !countOrWeightInput.equalsIgnoreCase(null)
				&& !countOrWeightInput.equalsIgnoreCase("")
		/* && Double.parseDouble(countOrWeightInput) > 0 */) { // Defect_10285
			if (QtyInEachesInput.equalsIgnoreCase(null)
					|| QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			return eachesInput.intValue() + " " + this.pi_uom + " & "
					+ countOrWeightInput + " " + this.base_uom;
		} else {
			if (countOrWeightInput == null
					|| countOrWeightInput.equalsIgnoreCase("")) {
				countOrWeightInput = " ";
			} else {
				if (this.base_uom != null
						&& !this.base_uom.isEmpty()
						&& (this.base_uom.equalsIgnoreCase("KG")
								|| this.base_uom.equalsIgnoreCase("L") || this.base_uom
									.equalsIgnoreCase("G"))) {
					// String formattedValue = formatPrice(QtyInEachesInput);
					String formattedValue = countOrWeightInput;
					countOrWeightInput = formattedValue + " " + this.base_uom;
				} else {
					countOrWeightInput = countOrWeightInput + " "
							+ this.base_uom;
				}
			}
		}

		return countOrWeightInput;
	}

	/**
	 * @return the base_uom
	 */
	public String getBase_uom() {
		base_uom = (base_uom == null ? "" : base_uom);
		return base_uom;
	}

	/**
	 * @param base_uom
	 *            the base_uom to set
	 */
	public void setBase_uom(String base_uom) {
		this.base_uom = base_uom;
	}

	public String checkIfRandomWeightArticleForSOH(String countOrWeightInput,
			String QtyInEachesInput) {
		if (this.random_weight_flg != null
				&& !this.random_weight_flg.equalsIgnoreCase("")
				&& this.random_weight_flg.equalsIgnoreCase("Y")) {
			if (QtyInEachesInput.equalsIgnoreCase(null)
					|| QtyInEachesInput.equalsIgnoreCase(""))
				QtyInEachesInput = "0.0";
			Double eachesInput = Double.parseDouble(QtyInEachesInput);
			return eachesInput.intValue() + " " + this.pi_uom + " & "
					+ countOrWeightInput + " " + this.base_uom;
		} else {
			if (countOrWeightInput == null
					|| countOrWeightInput.equalsIgnoreCase("")) {
				countOrWeightInput = " ";
			} else {
				if (this.base_uom != null
						&& !this.base_uom.isEmpty()
						&& (this.base_uom.equalsIgnoreCase("KG")
								|| this.base_uom.equalsIgnoreCase("L") || this.base_uom
									.equalsIgnoreCase("G"))) {
					// String formattedVal = formatPrice(QtyInEachesInput);
					String formattedVal = countOrWeightInput;
					countOrWeightInput = formattedVal + " " + this.base_uom;
				} else {
					countOrWeightInput = countOrWeightInput + " "
							+ this.base_uom;
				}
			}
		}

		return countOrWeightInput;
	}

	public String getGroup_tt() {
		return group_tt;
	}

	public void setGroup_tt(String group_tt) {
		this.group_tt = group_tt;
	}

	public String getLocationDetails_excel() {
		String loc = (this.printLoc != null && !this.printLoc.isEmpty()) ? this.printLoc
				: "";
		if (!loc.isEmpty()) {
			String[] Location;
			int cnt = loc.split(",").length;
			StringBuilder sb_excel = new StringBuilder();
			for (int i = 0; i < cnt; i++) {
				String[] count1 = loc.split(",");
				Location = count1[i].split("=");
				if (i == 0) { // /Defect_10285
					//"SC-526/12014"
					sb_excel.append(Location[0] + "," + Location[1] +" "+(Location[2]!=null && !Location[2].isEmpty() ? Location[2] : "") + ","
							+ getBase_count() + ","
							+ (getCount_1() != null ? getCount_1() : "") + ","
							+ (getCount_2() != null ? getCount_2() : "") + ","
							+ (getCount_3() != null ? getCount_3() : "") + ","
							+ (getCount_4() != null ? getCount_4() : "") + ","
							+ getFinal_count() + "," + getSoh() + ","
							+ getVar_qty() + "," + getVar_value());
				} else {
					//"SC-526/12014"
					sb_excel.append(Location[0] + "," + Location[1] +" "+(Location[2]!=null && !Location[2].isEmpty() ? Location[2] : "") + "," + " "
							+ "," + " " + "," + " " + "," + " " + "," + " "
							+ "," + " " + "," + " " + "," + " " + "," + " ");
				}
				sb_excel.append("\n" + " " + "," + " " + "," + " " + "," + " ");
			}
			locationDetails_excel = sb_excel.toString();
		}
		return locationDetails_excel;
	}

	public void setLocationDetails_excel(String locationDetails_excel) {
		this.locationDetails_excel = locationDetails_excel;
	}

	public String getLocation_cnt_excel() {
		String Count_final_excel = count_sb_excel.toString();

		return Count_final_excel;
	}

	public void setLocation_cnt_excel(String location_cnt_excel) {
		this.location_cnt_excel = location_cnt_excel;
	}

	public String getLocation_cnt_excel_wrap() {
		String location_excel_warp = this.locationDetails_excel;
		return location_excel_warp;
	}

	public void setLocation_cnt_excel_wrap(String location_cnt_excel_wrap) {
		this.location_cnt_excel_wrap = location_cnt_excel_wrap;
	}

	public String getPrintLoc() {
		return printLoc;
	}

	public void setPrintLoc(String printLoc) {
		this.printLoc = printLoc;
	}

	public String getStyle_ind() {
		return style_ind;
	}

	public void setStyle_ind(String style_ind) {
		this.style_ind = style_ind;
	}

	public String getOrder_uom() {
		return order_uom;
	}

	public void setOrder_uom(String order_uom) {
		this.order_uom = order_uom;
	}

	public String getOm() {
		return (om == null ? "" : om);
	}

	public void setOm(String om) {
		this.om = om;
	}

	public String getCpbd_flag() {
		return cpbd_flag;
	}

	public void setCpbd_flag(String cpbd_flag) {
		this.cpbd_flag = cpbd_flag;
	}

	public String getDisplay_indicator() {
		if (display_indicator == null) {
			display_indicator = "";
		}
		return display_indicator;
	}

	public void setDisplay_indicator(String display_indicator) {
		this.display_indicator = display_indicator;
	}

	public String getPerpetual_flag() {
		return perpetual_flag;
	}

	public void setPerpetual_flag(String perpetual_flag) {
		this.perpetual_flag = perpetual_flag;
	}

	public String getLoc_name() {
		return loc_name;
	}

	public void setLoc_name(String loc_name) {
		this.loc_name = loc_name;
	}

	public String getOverAllTotal() {
		return overAllTotal;
	}

	public void setOverAllTotal(String overAllTotal) {
		this.overAllTotal = overAllTotal != null && !overAllTotal.isEmpty() ? new DecimalFormat(
				"0.00").format(Double.parseDouble(overAllTotal)) : overAllTotal;
	}

	public void formateCountVal() {
		try {
			DecimalFormat df = null;
			if (this.base_uom.equalsIgnoreCase("KG")
					|| this.base_uom.equalsIgnoreCase("L")
					|| this.base_uom.equalsIgnoreCase("G")) {
				df = new DecimalFormat("0.000");
				this.soh = (this.soh != null && !this.soh.isEmpty()) ? df
						.format(Double.parseDouble(this.soh)) : this.soh;
				this.var_qty = (this.var_qty != null && !this.var_qty.isEmpty()) ? df
						.format(Double.parseDouble(this.var_qty))
						: this.var_qty;
				this.final_count = (this.final_count != null && !this.final_count
						.isEmpty()) ? df.format(Double
						.parseDouble(this.final_count)) : this.final_count;
				this.base_count = (this.base_count != null && !this.base_count
						.isEmpty()) ? df.format(Double
						.parseDouble(this.base_count)) : this.base_count;
				this.count_1 = (this.count_1 != null && !this.count_1.isEmpty()) ? df
						.format(Double.parseDouble(this.count_1))
						: this.count_1;
				this.count_2 = (this.count_2 != null && !this.count_2.isEmpty()) ? df
						.format(Double.parseDouble(this.count_2))
						: this.count_2;
				this.count_3 = (this.count_3 != null && !this.count_3.isEmpty()) ? df
						.format(Double.parseDouble(this.count_3))
						: this.count_3;
				this.count_4 = (this.count_4 != null && !this.count_4.isEmpty()) ? df
						.format(Double.parseDouble(this.count_4))
						: this.count_4;
						//12067
				this.scanned_count = (this.scanned_count != null && !this.scanned_count.isEmpty()) ? df
						.format(Double.parseDouble(this.scanned_count))
						: this.scanned_count;
			} else {
				df = new DecimalFormat("0.##");
				this.soh = (this.soh != null && !this.soh.isEmpty()) ? df
						.format(Double.parseDouble(this.soh)) : this.soh;
				this.var_qty = (this.var_qty != null && !this.var_qty.isEmpty()) ? df
						.format(Double.parseDouble(this.var_qty))
						: this.var_qty;
				this.final_count = (this.final_count != null && !this.final_count
						.isEmpty()) ? df.format(Double
						.parseDouble(this.final_count)) : this.final_count;
				this.base_count = (this.base_count != null && !this.base_count
						.isEmpty()) ? df.format(Double
						.parseDouble(this.base_count)) : this.base_count;
				this.count_1 = (this.count_1 != null && !this.count_1.isEmpty()) ? df
						.format(Double.parseDouble(this.count_1))
						: this.count_1;
				this.count_2 = (this.count_2 != null && !this.count_2.isEmpty()) ? df
						.format(Double.parseDouble(this.count_2))
						: this.count_2;
				this.count_3 = (this.count_3 != null && !this.count_3.isEmpty()) ? df
						.format(Double.parseDouble(this.count_3))
						: this.count_3;
				this.count_4 = (this.count_4 != null && !this.count_4.isEmpty()) ? df
						.format(Double.parseDouble(this.count_4))
						: this.count_4;
				this.final_count_qty = (this.final_count_qty != null && !this.final_count_qty
						.isEmpty()) ? df.format(Double
						.parseDouble(this.final_count_qty))
						: this.final_count_qty;
				this.base_count_qty = (this.base_count_qty != null && !this.base_count_qty
						.isEmpty()) ? df.format(Double
						.parseDouble(this.base_count_qty))
						: this.base_count_qty;
				this.count_qty_1 = (this.count_qty_1 != null && !this.count_qty_1
						.isEmpty()) ? df.format(Double
						.parseDouble(this.count_qty_1)) : this.count_qty_1;
				this.count_qty_2 = (this.count_qty_2 != null && !this.count_qty_2
						.isEmpty()) ? df.format(Double
						.parseDouble(this.count_qty_2)) : this.count_qty_2;
				this.count_qty_3 = (this.count_qty_3 != null && !this.count_qty_3
						.isEmpty()) ? df.format(Double
						.parseDouble(this.count_qty_3)) : this.count_qty_3;
				this.count_qty_4 = (this.count_qty_4 != null && !this.count_qty_4
						.isEmpty()) ? df.format(Double
						.parseDouble(this.count_qty_4)) : this.count_qty_4;
						//12067
				this.scanned_count = (this.scanned_count != null && !this.scanned_count.isEmpty()) ? df
						.format(Double.parseDouble(this.scanned_count))
						: this.scanned_count;
			}
			df = new DecimalFormat("0.00");
			this.var_value = (this.var_value != null && !this.var_value
					.isEmpty()) ? df.format(Double.parseDouble(this.var_value))
					: this.var_value;
			this.sell_price = (this.sell_price != null && !this.sell_price
					.isEmpty()) ? df
					.format(Double.parseDouble(this.sell_price))
					: this.sell_price;
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	//12067
	public String getScanned_uom() {
		return scanned_uom;
	}

	public void setScanned_uom(String scanned_uom) {
		this.scanned_uom = scanned_uom;
	}

	public String getScanned_count() {
		return scanned_count;
	}

	public void setScanned_count(String scanned_count) {
		this.scanned_count = scanned_count;
	}

	public String getCpbd_uom() {
		return cpbd_uom;
	}

	public void setCpbd_uom(String cpbd_uom) {
		this.cpbd_uom = cpbd_uom;
	}

	public String getComplex_pack_brk_base_qty() {
		return complex_pack_brk_base_qty;
	}

	public void setComplex_pack_brk_base_qty(String complex_pack_brk_base_qty) {
		this.complex_pack_brk_base_qty = complex_pack_brk_base_qty;
	}

	public String getScanned_count_qty() {
		return scanned_count_qty;
	}

	public void setScanned_count_qty(String scanned_count_qty) {
		this.scanned_count_qty = scanned_count_qty;
	}

	public String getScanned_pi_uom() {
		return scanned_pi_uom;
	}

	public void setScanned_pi_uom(String scanned_pi_uom) {
		this.scanned_pi_uom = scanned_pi_uom;
	}
	
	

}