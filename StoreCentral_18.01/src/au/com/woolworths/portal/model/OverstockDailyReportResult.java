package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.CommonUtils;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OverstockDailyReportResult {

	@JsonProperty("article_number")
	private String article_number;
	
	@JsonProperty("promo_indicator")
	private String promo_indicator;
	
	@JsonProperty("article_description")
	private String article_description;
	
	@JsonProperty("soh")
	private String soh;
	
	@JsonProperty("soh_uom")
	private String soh_uom;
	
	@JsonProperty("mpl")
	private String mpl;
	
	@JsonProperty("capacity")
	private String capacity;

	@JsonProperty("reason_desc")
	private String reason_desc;
	
	private String soh_final;
	
	public String getArticle_number() {
		return (article_number == null ? "" : article_number);
	}

	public void setArticle_number(String article_number) {
		this.article_number = article_number;
	}

	public String getPromo_indicator() {
		return (promo_indicator == null ? "" : promo_indicator);
	}

	public void setPromo_indicator(String promo_indicator) {
		this.promo_indicator = promo_indicator;
	}

	public String getArticle_description() {
		return (article_description == null ? "" : article_description.replaceAll("\\s+", " "));
	}

	public void setArticle_description(String article_description) {
		this.article_description = article_description;
	}

	public String getSoh() {
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

	public String getCapacity() {
		return (capacity == null ? "" : capacity);
	}

	public void setCapacity(String capacity) {
		this.capacity = capacity;
	}
	public String getReason_desc() {
		return reason_desc;
	}

	public void setReason_desc(String reason_desc) {
		this.reason_desc = reason_desc;
	}

	public String getSoh_uom() {
		return (soh_uom == null ? "" : soh_uom);
	}

	public void setSoh_uom(String soh_uom) {
		this.soh_uom = soh_uom;
	}

	public String getSoh_final() {
		if(!CommonUtils.isEmpty(soh)){
			soh_final = soh+" "+soh_uom;
		}else{
			soh_final = "";
		}
		return soh_final;
	}

	public void setSoh_final(String soh_final) {
		this.soh_final = soh_final;
	}

}
