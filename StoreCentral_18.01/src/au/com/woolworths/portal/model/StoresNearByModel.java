package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StoresNearByModel {

	@JsonProperty("s_org_name")
	private String salesOrgName;

	@JsonProperty("iv_dc")
	private String distrChannel;

	@JsonProperty("distance")
	private String distance;

	@JsonProperty("iv_site")
	private String inputSiteNo;

	@JsonProperty("site_no")
	private String siteNo;

	@JsonProperty("site_name")
	private String mvmtType;

	@JsonProperty("iv_s_org")
	private String salesOrg;

	@JsonProperty("iv_distance")
	private String inputDistance;

	@JsonProperty("dc_no")
	private String dcNo;

	@JsonProperty("dc_name")
	private String dcName;

	@JsonProperty("s_org_no")
	private String salesOrgNo;

	@JsonProperty("iv_records")
	private String records;

	@JsonProperty("msg")
	private String msg;

	public String getSalesOrgName() {
		return salesOrgName;
	}

	public void setSalesOrgName(String salesOrgName) {
		this.salesOrgName = salesOrgName;
	}

	public String getDistrChannel() {
		return distrChannel;
	}

	public void setDistrChannel(String distrChannel) {
		this.distrChannel = distrChannel;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		// this.distance = distance;

		if (distance != null) {
			if (Double.parseDouble(distance) <= 0.00) {
				distance = "<1";
			}
		}
		this.distance = distance;
	}

	public String getInputSiteNo() {
		return inputSiteNo;
	}

	public void setInputSiteNo(String inputSiteNo) {
		this.inputSiteNo = inputSiteNo;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getMvmtType() {
		return mvmtType;
	}

	public void setMvmtType(String mvmtType) {
		this.mvmtType = mvmtType;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getInputDistance() {
		return inputDistance;
	}

	public void setInputDistance(String inputDistance) {
		this.inputDistance = inputDistance;
	}

	public String getDcNo() {
		return dcNo;
	}

	public void setDcNo(String dcNo) {
		this.dcNo = dcNo;
	}

	public String getDcName() {
		return dcName;
	}

	public void setDcName(String dcName) {
		this.dcName = dcName;
	}

	public String getSalesOrgNo() {
		return salesOrgNo;
	}

	public void setSalesOrgNo(String salesOrgNo) {
		this.salesOrgNo = salesOrgNo;
	}

	public String getRecords() {
		return records;
	}

	public void setRecords(String records) {
		this.records = records;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
