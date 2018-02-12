package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleFreshFoodLabels {

	@JsonProperty("format_desc")
	private String formateDesc;

	@JsonProperty("article")
	private String articleNo;
	@JsonProperty("best_before")
	private String bestBeforeDays;
	@JsonProperty("use_by")
	private String useByDays;
	@JsonProperty("format_no")
	private String labelFormatId;
	@JsonProperty("mand_warning")
	private String mandatoryWarning;
	@JsonProperty("storage_reqmnt")
	private String storageRequirements;
	@JsonProperty("scale_article")
	private String fresh_food_item_flag;

	public String getFresh_food_item_flag() {
		return fresh_food_item_flag;
	}

	public void setFresh_food_item_flag(String fresh_food_item_flag) {
		if(fresh_food_item_flag != null && !fresh_food_item_flag.equalsIgnoreCase("") && fresh_food_item_flag.equalsIgnoreCase("X"))
			fresh_food_item_flag = "Y";//Defect_14761
		this.fresh_food_item_flag = fresh_food_item_flag;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getBestBeforeDays() {
		return bestBeforeDays;
	}

	public void setBestBeforeDays(String bestBeforeDays) {
		this.bestBeforeDays = bestBeforeDays;
	}

	public String getUseByDays() {
		return useByDays;
	}

	public void setUseByDays(String useByDays) {
		this.useByDays = useByDays;
	}

	public String getLabelFormatId() {
		return labelFormatId;
	}

	public void setLabelFormatId(String labelFormatId) {
		this.labelFormatId = labelFormatId;
	}

	public String getMandatoryWarning() {
		return mandatoryWarning;
	}

	public void setMandatoryWarning(String mandatoryWarning) {
		this.mandatoryWarning = mandatoryWarning;
	}

	public String getStorageRequirements() {
		return storageRequirements;
	}

	public void setStorageRequirements(String storageRequirements) {
		this.storageRequirements = storageRequirements;
	}

	public String getNutritionalClaim() {
		return nutritionalClaim;
	}

	public void setNutritionalClaim(String nutritionalClaim) {
		this.nutritionalClaim = nutritionalClaim;
	}

	public String getCountryOfOrigin() {
		return countryOfOrigin;
	}

	public void setCountryOfOrigin(String countryOfOrigin) {
		this.countryOfOrigin = countryOfOrigin;
	}

	public String getInputArticleNo() {
		return inputArticleNo;
	}

	public void setInputArticleNo(String inputArticleNo) {
		this.inputArticleNo = inputArticleNo;
	}

	@JsonProperty("nutri_claim")
	private String nutritionalClaim;
	@JsonProperty("country_origin")
	private String countryOfOrigin;

	@JsonProperty
	private String inputArticleNo;

	public String getFormateDesc() {
		return formateDesc;
	}

	public void setFormateDesc(String formateDesc) {
		this.formateDesc = formateDesc;
	}
}
