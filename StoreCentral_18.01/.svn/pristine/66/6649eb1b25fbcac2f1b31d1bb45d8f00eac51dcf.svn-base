package au.com.woolworths.portal.model;

import java.text.DateFormat;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GapScanResult {

	DateFormat PRINT_DATE_FORMAT = new SimpleDateFormat("dd/MM/yy");
	DateFormat SCREEN_DATE_FORMAT = new SimpleDateFormat("MM/dd/yy");

	@JsonProperty("article_number")
	private String article_number;
	@JsonProperty("article_description")
	private String article_description;
	@JsonProperty("gap_reason_code")
	private String gap_reason_code;
	@JsonProperty("gap_reason_desc")
	private String gap_reason_desc;
	@JsonProperty("gap_reason_comment_1")
	private String gap_reason_comment_1;
	@JsonProperty("gap_reason_comment")
	private String gap_reason_comment;
	@JsonProperty("gap_reason_type")
	private String gap_reason_type;
	@JsonProperty("lto_details")
	private String lto_details;
	@JsonProperty("last_order_qty")
	private String last_order_qty;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("last_received_date")
	private String last_received_date;
	@JsonProperty("last_received_order_no")
	private String last_received_order_no;
	@JsonProperty("last_received_qty")
	private String last_received_qty;
	@JsonProperty("last_received_uom")
	private String last_received_uom;
	@JsonProperty("promo_indicator")
	private String promo_indicator;
	@JsonProperty("actioned_flag")
	private String actioned_flag;
	@JsonProperty("order_multiple")
	private String order_multiple;
	@JsonProperty("non_lto_fill_units")
	private String non_lto_fill_units;
	@JsonProperty("aisle")
	private String aisle;
	@JsonProperty("bay")
	private String bay;
	@JsonProperty("shelf")
	private String shelf;
	@JsonProperty("base_uom")
	private String base_uom;

	private String lto;
	private String units_to_fill;
	private String promo_ind;
	private String action;
	private String received_date;

	/**
	 * @return the article_number
	 */
	public String getArticle_number() {
		return (article_number == null ? "" : article_number);
	}

	/**
	 * @param article_number
	 *            the article_number to set
	 */
	public void setArticle_number(String article_number) {
		this.article_number = article_number;
	}

	/**
	 * @return the article_description
	 */
	public String getArticle_description() {
		return (article_description == null ? "" : article_description);
	}

	/**
	 * @param article_description
	 *            the article_description to set
	 */
	public void setArticle_description(String article_description) {
		this.article_description = article_description;
	}

	/**
	 * @return the gap_reason_code
	 */
	public String getGap_reason_code() {
		return (gap_reason_code == null ? "" : gap_reason_code);
	}

	/**
	 * @param gap_reason_code
	 *            the gap_reason_code to set
	 */
	public void setGap_reason_code(String gap_reason_code) {
		this.gap_reason_code = gap_reason_code;
	}

	/**
	 * @return the gap_reason_comment_1
	 */
	public String getGap_reason_comment_1() {
		return (gap_reason_comment_1 == null ? "" : gap_reason_comment_1);
	}

	/**
	 * @param gap_reason_comment_1
	 *            the gap_reason_comment_1 to set
	 */

	public void setGap_reason_comment_1(String gap_reason_comment_1) {
		this.gap_reason_comment_1 = gap_reason_comment_1;
	}

	/**
	 * @return the gap_reason_comment
	 */
	public String getGap_reason_comment() {
		return (gap_reason_comment == null ? "" : gap_reason_comment);
	}

	/**
	 * @param gap_reason_comment
	 *            the gap_reason_comment to set
	 */
	public void setGap_reason_comment(String gap_reason_comment) {
		this.gap_reason_comment = gap_reason_comment;
	}

	/**
	 * @return the gap_reason_type
	 */
	public String getGap_reason_type() {
		return (gap_reason_type == null ? "" : gap_reason_type);
	}

	/**
	 * @param gap_reason_type
	 *            the gap_reason_type to set
	 */
	public void setGap_reason_type(String gap_reason_type) {
		this.gap_reason_type = gap_reason_type;
	}

	/**
	 * @return the lto_details
	 */
	public String getLto_details() {
		return (lto_details == null ? "" : lto_details);
	}

	/**
	 * @param lto_details
	 *            the lto_details to set
	 */
	public void setLto_details(String lto_details) {
		this.lto_details = lto_details;
	}

	/**
	 * @return the last_order_qty
	 */
	public String getLast_order_qty() {
		return (last_order_qty == null ? "" : last_order_qty);
	}

	/**
	 * @param last_order_qty
	 *            the last_order_qty to set
	 */
	public void setLast_order_qty(String last_order_qty) {
		this.last_order_qty = last_order_qty;
	}

	/**
	 * @return the soh
	 */
	public String getSoh() {
		return (soh == null ? "" : deciValues(soh) + " " + getBase_uom());
	}

	/**
	 * @param soh
	 *            the soh to set
	 */
	public void setSoh(String soh) {
		this.soh = soh;
	}

	/**
	 * @return the last_received_date
	 */
	public String getLast_received_date() {
		try {
			last_received_date = (last_received_date != null && last_received_date
					.split("/").length > 1) ? PRINT_DATE_FORMAT
					.format(SCREEN_DATE_FORMAT.parse(last_received_date)) : "";
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return last_received_date;
	}

	/**
	 * @param last_received_date
	 *            the last_received_date to set
	 */
	public void setLast_received_date(String last_received_date) {
		this.last_received_date = last_received_date;
	}

	/**
	 * @return the last_received_order_no
	 */
	public String getLast_received_order_no() {
		return (last_received_order_no == null ? "" : last_received_order_no);
	}

	/**
	 * @param last_received_order_no
	 *            the last_received_order_no to set
	 */
	public void setLast_received_order_no(String last_received_order_no) {
		this.last_received_order_no = last_received_order_no;
	}

	/**
	 * @return the last_received_qty
	 */
	// Defect_11085 PROD 1486 - INC01324862 - Not able to print Gap scan report
	// - Fix
	public String getLast_received_qty() {
		return ((last_received_qty != null && !last_received_qty.isEmpty()) ? last_received_qty
				: "");
	}

	/**
	 * @param last_received_qty
	 *            the last_received_qty to set
	 */
	public void setLast_received_qty(String last_received_qty) {
		this.last_received_qty = last_received_qty;
	}

	/**
	 * @return the last_received_uom
	 */
	public String getLast_received_uom() {
		return (last_received_uom == null ? "" : last_received_uom);
	}

	/**
	 * @param last_received_uom
	 *            the last_received_uom to set
	 */
	public void setLast_received_uom(String last_received_uom) {
		this.last_received_uom = last_received_uom;
	}

	/**
	 * @return the promo_indicator
	 */
	public String getPromo_indicator() {
		return (promo_indicator == null ? "" : promo_indicator);
	}

	/**
	 * @param promo_indicator
	 *            the promo_indicator to set
	 */
	public void setPromo_indicator(String promo_indicator) {
		this.promo_indicator = promo_indicator;
	}

	/**
	 * @return the actioned_flag
	 */
	public String getActioned_flag() {
		return (actioned_flag == null ? "" : actioned_flag);
	}

	/**
	 * @param actioned_flag
	 *            the actioned_flag to set
	 */
	public void setActioned_flag(String actioned_flag) {
		this.actioned_flag = actioned_flag;
	}

	/**
	 * @return the order_multiple
	 */
	public String getOrder_multiple() {
		return (order_multiple == null ? "" : order_multiple);
	}

	/**
	 * @param order_multiple
	 *            the order_multiple to set
	 */
	public void setOrder_multiple(String order_multiple) {
		this.order_multiple = order_multiple;
	}

	/**
	 * @return the non_lto_fill_units
	 */
	public String getNon_lto_fill_units() {
		if (!this.non_lto_fill_units.isEmpty()) {
			String[] split = this.non_lto_fill_units.split(" ");
			String checkReset = split[0].toString();
			if (!this.base_uom.equalsIgnoreCase("KG")
					&& !this.base_uom.equalsIgnoreCase("L")) {

				DecimalFormat df = new DecimalFormat("###0");
				String checkTest = String.valueOf(df.format(Double
						.parseDouble(checkReset)));

				non_lto_fill_units = checkTest + " " + split[1];
			} else {
				DecimalFormat df = new DecimalFormat("###0.000");
				String checkTest = String.valueOf(df.format(Double
						.parseDouble(checkReset)));
				non_lto_fill_units = checkTest + " " + split[1];
			}
		} else {
			non_lto_fill_units = "";
		}
		return (non_lto_fill_units == null ? "" : non_lto_fill_units);
	}

	/**
	 * @param non_lto_fill_units
	 *            the non_lto_fill_units to set
	 */
	public void setNon_lto_fill_units(String non_lto_fill_units) {
		this.non_lto_fill_units = non_lto_fill_units;
	}

	/**
	 * @return the aisle
	 */
	public String getAisle() {
		return (aisle == null ? "" : aisle);
	}

	/**
	 * @param aisle
	 *            the aisle to set
	 */
	public void setAisle(String aisle) {
		this.aisle = aisle;
	}

	/**
	 * @return the bay
	 */
	public String getBay() {
		return (bay == null ? "" : bay);
	}

	/**
	 * @param bay
	 *            the bay to set
	 */
	public void setBay(String bay) {
		this.bay = bay;
	}

	/**
	 * @return the shelf
	 */
	public String getShelf() {
		return (shelf == null ? "" : shelf);
	}

	/**
	 * @param shelf
	 *            the shelf to set
	 */
	public void setShelf(String shelf) {
		this.shelf = shelf;
	}

	/**
	 * @return the base_uom
	 */
	public String getBase_uom() {
		return (base_uom == null ? "" : base_uom);
	}

	/**
	 * @param base_uom
	 *            the base_uom to set
	 */
	public void setBase_uom(String base_uom) {
		this.base_uom = base_uom;
	}

	/**
	 * @return the lto
	 */
	public String getLto() {
		StringBuffer ltoLoc = null;
		String[] ltoInfo = null;
		try {
			if (lto != null && !lto.isEmpty()
					&& lto.split(",").length > 0) {
				ltoInfo = lto.split(",");
				for (int i = 0; i < ltoInfo.length; i++) {
					if (ltoLoc == null) {
						ltoLoc = new StringBuffer(ltoInfo[i]);
					} else {
						ltoLoc.append("\n"); 
						ltoLoc.append(ltoInfo[i]);
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (ltoLoc == null ? "" : ltoLoc.toString());
	}

	/**
	 * @param lto
	 *            the lto to set
	 */
	public void setLto(String lto) {
		this.lto = lto;
	}

	/**
	 * @return the units_to_fill
	 */
	public String getUnits_to_fill() {
		String ltoDetails = getLto_details();
		String unitsToFill = null;
		if (ltoDetails != null && ltoDetails != ""
				&& ltoDetails.split(",").length > 0) {
			unitsToFill = ltoDetails.split(",")[0].split("-")[1].trim();
		} else {
			unitsToFill = getNon_lto_fill_units();
		}
		return (unitsToFill == null ? "" : unitsToFill);
	}

	/**
	 * @param units_to_fill
	 *            the units_to_fill to set
	 */
	public void setUnits_to_fill(String units_to_fill) {
		this.units_to_fill = units_to_fill;
	}

	/**
	 * @return the promo_ind
	 */
	public String getPromo_ind() {
		String promoIndicator = getPromo_indicator();
		String promoSymbol = "";
		if (promoIndicator.equals("1")) {
			promoSymbol = "*";
		} else if (promoIndicator.equals("2")) {
			promoSymbol = "#";
		} else if (promoIndicator.equals("3")) {
			promoSymbol = "@";
		}
		return (promoSymbol);
	}

	/**
	 * @param promo_ind
	 *            the promo_ind to set
	 */
	public void setPromo_ind(String promo_ind) {
		this.promo_ind = promo_ind;
	}

	/**
	 * @return the action
	 */
	public String getAction() {
		String actionFlag = getActioned_flag();
		String actionDesc = null;
		if (actionFlag.equalsIgnoreCase("Y")) {
			actionDesc = "Yes";
		} else {
			actionDesc = "No";
		}
		return (actionDesc == null ? "" : actionDesc);
	}

	/**
	 * @param action
	 *            the action to set
	 */
	public void setAction(String action) {
		this.action = action;
	}

	/**
	 * @return the received_date
	 */
	public String getReceived_date() {
		String mobiDateReceived = getLast_received_date();
		if (mobiDateReceived != null && mobiDateReceived != "") {
			String dateString = null;
			DateFormat df = new SimpleDateFormat("MM/dd/yy");
			DateFormat df2 = new SimpleDateFormat("dd/MM/yy");
			try {
				Date dateInDDMMYY = df.parse(mobiDateReceived);
				dateString = df2.format(dateInDDMMYY);
			} catch (ParseException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			return dateString;
		} else
			return "";
	}

	/**
	 * @param received_date
	 *            the received_date to set
	 */
	public void setReceived_date(String received_date) {
		this.received_date = received_date;
	}

	public String getGap_reason_desc() {
		return gap_reason_desc;
	}

	public void setGap_reason_desc(String gap_reason_desc) {
		this.gap_reason_desc = gap_reason_desc;
	}

	public String deciValues(String soh) {
		DecimalFormat df = new DecimalFormat("###0.000");
		return soh == null ? "0"
				: (getBase_uom().equalsIgnoreCase("KG")) ? String.valueOf(df
						.format(Double.parseDouble(soh))) : String
						.valueOf((int) Double.parseDouble(soh));

	}

}
