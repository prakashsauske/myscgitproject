package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Location {

	@JsonProperty("site_name")
	private String name;
	@JsonProperty("site_no")
	private String no;
	@JsonProperty("s_org_name")
	private String sOrgName;
	@JsonProperty("s_org_no")
	private String sOrgNo;
	@JsonProperty("dc_no")
	private String dcNo;
	@JsonProperty("dc_name")
	private String dcName;
	@JsonProperty("distance")
	private String distance;

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getNo() {
		return no;
	}

	public void setNo(String no) {
		this.no = no;
	}

	public String getSOrgNo() {
		return sOrgNo;
	}

	public void setSOrgNo(String sOrgNo) {
		this.sOrgNo = sOrgNo;
	}

	public String getSOrgName() {
		return sOrgName;
	}

	public void setSOrgName(String sOrgName) {
		this.sOrgName = sOrgName;
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

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

}
