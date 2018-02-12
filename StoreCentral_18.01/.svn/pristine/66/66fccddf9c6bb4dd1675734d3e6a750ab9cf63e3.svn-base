package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POSData {

	@JsonProperty("matnr")
	private String materialName;
	@JsonProperty("werks")
	private String siteNo;
	@JsonProperty("zzeft_group_id")
	private String groupID;
	@JsonProperty("zzcheck_age_flag")
	private String ageFlag;
	@JsonProperty("zzsrt_display")
	private String srtDisplay;
	@JsonProperty("zzelec_srvlnc")
	private String easIndicator;

	public String getAgeFlag() {
		return ageFlag;
	}

	public void setAgeFlag(String ageFlag) {
		this.ageFlag = ageFlag;
	}

	public String getGroupID() {
		return groupID;
	}

	public void setGroupID(String groupID) {
		this.groupID = groupID;
	}

	public String getMaterialName() {
		return materialName;
	}

	public void setMaterialName(String materialName) {
		this.materialName = materialName;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSrtDisplay() {
		return srtDisplay;
	}

	public void setSrtDisplay(String srtDisplay) {
		this.srtDisplay = srtDisplay;
	}

	public String getEasIndicator() {
		return easIndicator;
	}

	public void setEasIndicator(String easIndicator) {
		this.easIndicator = easIndicator;
	}

}
