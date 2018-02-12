package au.com.woolworths.portal.model;

import java.text.DecimalFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockFillReportResult {
	
	@JsonProperty("article_no")
	private String article_no;
	@JsonProperty("promo_indicator")
	private String promo_indicator;
	@JsonProperty("article_name")
	private String article_name;
	@JsonProperty("lto_qty")
	private String lto_qty;
	@JsonProperty("om")
	private String om;
	@JsonProperty("soh")
	private String soh;
	@JsonProperty("shelf_capacity")
	private String shelf_capacity;
	@JsonProperty("units_to_fill")
	private String units_to_fill;
	@JsonProperty("pack_size")
	private String pack_size;
	@JsonProperty("lto_name")
	private String lto_name;
	@JsonProperty("uom")
	private String uom;
	@JsonProperty("promo_disp_loc")
	private String promo_disp_loc;
	@JsonProperty("location_type")
	private String location_type;
	@JsonProperty("pbd_flag")
	private String pbd_flag;
	@JsonProperty("promo_flag")
	private String promo_flag;
	@JsonProperty("isp_flag")
	private String isp_flag;
	@JsonProperty("offer_flag")
	private String offer_flag;

	private String lto_display_value;
	private String cartons_to_fill = "1";
	private String location_display;

	@JsonProperty("random_wgt_flag")
	private String random_wgt_flag;

	@JsonProperty("wgt_flag")
	private String wgt_flag;

	@JsonProperty("pi_uom")
	private String pi_uom;
	
	@JsonProperty("rdm_wgt_soh")
	private String rdm_wgt_soh;
	
	@JsonProperty("base_uom")
	private String base_uom;
	
	@JsonProperty("last_received_date")
	private String last_received_date;
	
	@JsonProperty("sub_cat_name")
	private String sub_cat_name ;
	
	@JsonProperty("aisle")
	private String aisle;
	
	private int aisle_f;

	private String aisleSubCate;
	
	private String noAisleSubCate;
	
	private String group_by_aisle;
	
	private String group_by_noAisle;

	
	
	public String getLast_received_date() {
		
		if(this.last_received_date !=null && !this.last_received_date.trim().isEmpty()){
			this.last_received_date = formatDate(this.last_received_date);
		}else{
			this.last_received_date = "";
		}
		return last_received_date;
	}
	public String formatDate(String date){
		String[] formDateSplit = date.split("-");
		return formDateSplit[2]+"/"+formDateSplit[1]+"/"+formDateSplit[0];
	}
	
	public void setLast_received_date(String last_received_date) {
		this.last_received_date = last_received_date;
	}

	public String getRdm_wgt_soh() {
		return rdm_wgt_soh;
	}

	public void setRdm_wgt_soh(String rdm_wgt_soh) {
		this.rdm_wgt_soh = rdm_wgt_soh;
	}

	public String getArticle_no() {
		return (article_no == null ? "" : article_no);
	}

	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}

	public String getPromo_indicator() {
		if (!CommonUtils.isEmpty(offer_flag)
				&& offer_flag.equalsIgnoreCase("Y")) {
			promo_indicator = "#";
		} else if (!CommonUtils.isEmpty(isp_flag)
				&& isp_flag.equalsIgnoreCase("Y")) {
			promo_indicator = "@";
		} else if (!CommonUtils.isEmpty(promo_flag)
				&& promo_flag.equalsIgnoreCase("Y")) {
			promo_indicator = "*";
		}
		return promo_indicator;
	}

	public void setPromo_indicator(String promo_indicator) {
		this.promo_indicator = promo_indicator;
	}

	public String getArticle_name() {
		return (article_name == null ? "" : article_name);
	}

	public void setArticle_name(String article_name) {
		this.article_name = article_name;
	}

	public String getLto_qty() {
		return (lto_qty == null ? "" : lto_qty);
	}

	public void setLto_qty(String lto_qty) {
		this.lto_qty = lto_qty;
	}
					//all changed to UOM to BASE_UOM
	public String getSoh() {
		if(random_wgt_flag.equalsIgnoreCase("Y")){
			soh=((rdm_wgt_soh!=null )? formatNumber(rdm_wgt_soh):"0")+" "+pi_uom+" & "+(((soh!=null )?formatNumber(soh):"0")+" "+base_uom);
		}else{
			if(pbd_flag.equalsIgnoreCase("Y")){
				soh=((soh!=null )?formatNumber(soh):"0")+" "+base_uom;
			}else {
			soh=((soh!=null )?formatNumber(soh):"0")+" "+base_uom;
			}
		}
		
		return (soh == null ? "" : soh);
	}

	public void setSoh(String soh) {
		this.soh = soh;
	}

	public String getShelf_capacity() {
		return (shelf_capacity == null ? "" : shelf_capacity);
	}

	public void setShelf_capacity(String shelf_capacity) {
		this.shelf_capacity = shelf_capacity;
	}

	public String getUnits_to_fill() {
		return (units_to_fill == null ? "" : units_to_fill);
	}

	public void setUnits_to_fill(String units_to_fill) {
		this.units_to_fill = units_to_fill;
	}

	public String getPack_size() {
		return (pack_size == null ? "" : pack_size);
	}

	public void setPack_size(String pack_size) {
		this.pack_size = pack_size;
	}

	public String getLto_name() {
		return (lto_name == null ? "" : lto_name);
	}

	public void setLto_name(String lto_name) {
		this.lto_name = lto_name;
	}

	public String getPi_uom() {
		return (null == pi_uom ? "" : pi_uom);
	}

	public void setPi_uom(String pi_uom) {
		this.pi_uom = pi_uom;
	}

	public boolean isKGItem() {
		return (this.wgt_flag != null && this.wgt_flag.equalsIgnoreCase("Y")); // ||
																				// this.random_wgt_flag
																				// !=
																				// null
		// && this.random_wgt_flag.equalsIgnoreCase("Y"));
	}

	public String getLto_display_value() {
		if (!CommonUtils.isEmpty(lto_qty) && !CommonUtils.isEmpty(base_uom)) {

			base_uom = isKGItem() ? this.getBase_uom() : (null != this.random_wgt_flag			//getUom changed to getBase_uom
					&& random_wgt_flag.equalsIgnoreCase("Y") ? this.getPi_uom()
					: this.getBase_uom());
			// uom = uom.equalsIgnoreCase("KG") ? uom : (isKGItem() ? "KG" :
			// "EA");
			lto_display_value = formatNumber(lto_qty) + " " + base_uom;
		} else {
			lto_display_value = "";
		}
		return (lto_display_value);
	}

	private String formatNumber(String val) {
		DecimalFormat sf = new DecimalFormat("0.###");
		String retVal = val;
		try {
			retVal = sf.format(Double.parseDouble(val));
		} catch (Exception e) {
			e.printStackTrace();
		}
		return retVal;
	}

	public void setLto_display_value(String lto_display_value) {
		this.lto_display_value = lto_display_value;
	}

	public String getCartons_to_fill() {
		try {
			if (!CommonUtils.isEmpty(units_to_fill)
					&& !CommonUtils.isEmpty(pack_size)) {
				// as discussed with saravanan removing * pack size
				cartons_to_fill = getFormattedFillQty(units_to_fill);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return (cartons_to_fill);
	}

	private String getFormattedFillQty(String cartons_to_fill) {
		String[] data = null;
		StringBuffer sb = new StringBuffer("");
		if (cartons_to_fill != null && !cartons_to_fill.trim().isEmpty()) {
			if (cartons_to_fill.split(",").length > 0) {
				data = cartons_to_fill.split(",");
				if (data != null && data.length > 0) {
					for (int i = 0; i < data.length; i++) {
						try {
							if (i > 0 && !sb.toString().trim().isEmpty()) {
								sb.append(", ");
							}
							sb.append(formatNumber(String.valueOf(data[i]
									.split("-")[0] != null
									&& !data[i].split("-")[0].trim().isEmpty() ? Double
									.parseDouble(data[i].split("-")[0]) : "1")));
							if (data[i].split("-").length > 1) {
								sb.append(" " + data[i].split("-")[1]);
							}
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
			}
		}
		return sb.toString();

	}

	public void setCartons_to_fill(String cartons_to_fill) {
		this.cartons_to_fill = cartons_to_fill;
	}

	public String getUom() {
		return (uom == null ? "" : uom);
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getPromo_disp_loc() {
		return (promo_disp_loc == null || promo_disp_loc.trim().isEmpty() ? " "
				: promo_disp_loc);
	}

	public void setPromo_disp_loc(String promo_disp_loc) {
		this.promo_disp_loc = promo_disp_loc;
	}

	public String getLocation_type() {
		return location_type;
	}

	public void setLocation_type(String location_type) {
		this.location_type = location_type;
	}

	public String getOm() {
		return om;
	}

	public void setOm(String om) {
		this.om = om;
	}

	public String getLocation_display() {
		if (!CommonUtils.isEmpty(location_type)) {
			if (location_type.equals("LTO")) {
				location_display = getLto_name();
			} else if (location_type.equals("OTHERS")) {
				location_display = getPromo_disp_loc();
			}
		}
		return location_display;
	}

	public void setLocation_display(String location_display) {
		this.location_display = location_display;
	}

	public String getPbd_flag() {
		return pbd_flag;
	}

	public void setPbd_flag(String pbd_flag) {
		this.pbd_flag = pbd_flag;
	}

	public String getPromo_flag() {
		return promo_flag;
	}

	public void setPromo_flag(String promo_flag) {
		this.promo_flag = promo_flag;
	}

	public String getIsp_flag() {
		return isp_flag;
	}

	public void setIsp_flag(String isp_flag) {
		this.isp_flag = isp_flag;
	}

	public String getOffer_flag() {
		return offer_flag;
	}

	public void setOffer_flag(String offer_flag) {
		this.offer_flag = offer_flag;
	}

	public String getRandom_wgt_flag() {
		return random_wgt_flag;
	}

	public void setRandom_wgt_flag(String random_wgt_flag) {
		this.random_wgt_flag = random_wgt_flag;
	}

	public String getWgt_flag() {
		return wgt_flag;
	}

	public void setWgt_flag(String wgt_flag) {
		this.wgt_flag = wgt_flag;
	}

	public String getBase_uom() {
		return (base_uom == null ? "" : base_uom);
	}

	public void setBase_uom(String base_uom) {
		this.base_uom = base_uom;
	}

	public String getAisleSubCate() {
		//String aisleGrp = this.aisle == null || this.aisle.isEmpty() ? "Aisle Unknown" : "Aisle "+this.aisle;
		aisleSubCate = /*aisleGrp+"-"+*/this.sub_cat_name +"-"+this.article_name;
		
		return aisleSubCate;
	}

	public void setAisleSubCate(String aisleSubCate) {
		this.aisleSubCate = aisleSubCate;
	}

	public String getAisle() {
		return aisle;
	}
	public void setAisle(String aisle) {
		this.aisle = aisle;
	}
	public int getAisle_f() {
		this.aisle_f = (this.aisle !=null && !this.aisle.trim().isEmpty()) ? Integer.parseInt(this.aisle) :99999;			// for aisle sort 
		return aisle_f;
	}
	public void setAisle_f(int aisle_f) {
		this.aisle_f = aisle_f;
	}
	

	public String getNoAisleSubCate() {
		
		noAisleSubCate = this.sub_cat_name +"-"+this.article_name;
		
		return noAisleSubCate;
	}

	public void setNoAisleSubCate(String noAisleSubCate) {
		this.noAisleSubCate = noAisleSubCate;
	}

	public String getGroup_by_noAisle() {

		group_by_noAisle = this.sub_cat_name ;
		return group_by_noAisle;
	}

	public void setGroup_by_noAisle(String group_by_noAisle) {
		this.group_by_noAisle = group_by_noAisle;
	}

	public String getGroup_by_aisle() {
		
		String aisleGrp = (this.aisle ==null || this.aisle.trim().isEmpty()) ? "Aisle Unknown" : "Aisle "+this.aisle;
		group_by_aisle = aisleGrp+" - "+this.sub_cat_name ;
		return group_by_aisle;
	}

	public void setGroup_by_aisle(String group_by_aisle) {
		this.group_by_aisle = group_by_aisle;
	}
	public String getSub_cat_name() {
		return sub_cat_name;
	}
	public void setSub_cat_name(String sub_cat_name) {
		this.sub_cat_name = sub_cat_name;
	}
}
