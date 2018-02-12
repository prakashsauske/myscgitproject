package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SiteDtls {

	

	@JsonProperty("siteNo")
	private String siteNo;

	@JsonProperty("siteName")
	private String siteName;

	@JsonProperty("district")
	private String district;

	@JsonProperty("salesOrg")
	private String salesOrg;

	@JsonProperty("areaCode")
	private String areaCode;

	@JsonProperty("regionId")
	private String regionId;

	@JsonProperty("areaName")
	private String areaName;

	@JsonProperty("regionName")
	private String regionName;
	
	@JsonProperty("latitude")
	private String latitude;
	
	@JsonProperty("longitude")
	private String longitude;

	@JsonProperty("msg")
	private String msg;

	private String roleId;
	private String roleDesc;
	private String salesOrgNm;
	
	public SiteDtls(String siteNo, String siteName, String district,
			String salesOrg, String areaCode, String regionId, String areaName,
			String regionName, String msg,String salesOrgNm,String latitude,String longitude) {
		super();
		this.siteNo = siteNo;
		if(null!=siteName){
		this.siteName = siteName.replace("(", "_").replace(")", " ");
		}
		this.district = district;
		this.salesOrg = salesOrg;
		this.areaCode = areaCode;
		this.regionId = regionId;
		this.areaName = areaName;
		this.regionName = regionName;
		this.msg = msg;
		
		this.salesOrgNm = salesOrgNm;
		this.latitude=latitude;
		this.longitude=longitude;
	}
	
	public SiteDtls(){
		
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the siteNo
	 */
	public String getSiteNo() {
		return siteNo;
	}

	/**
	 * @param siteNo
	 *            the siteNo to set
	 */
	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	/**
	 * @return the siteName
	 */
	public String getSiteName() {
		return siteName;
	}

	/**
	 * @param siteName
	 *            the siteName to set
	 */
	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	/**
	 * @return the salesOrg
	 */
	public String getSalesOrg() {
		return salesOrg;
	}

	/**
	 * @param salesOrg
	 *            the salesOrg to set
	 */
	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	/**
	 * @return the areaCode
	 */
	public String getAreaCode() {
		return areaCode;
	}

	/**
	 * @param areaCode
	 *            the areaCode to set
	 */
	public void setAreaCode(String areaCode) {
		this.areaCode = areaCode;
	}

	/**
	 * @return the regionId
	 */
	public String getRegionId() {
		return regionId;
	}

	/**
	 * @param regionId
	 *            the regionId to set
	 */
	public void setRegionId(String regionId) {
		this.regionId = regionId;
	}

	/**
	 * @return the areaName
	 */
	public String getAreaName() {
		return areaName;
	}

	/**
	 * @param areaName
	 *            the areaName to set
	 */
	public void setAreaName(String areaName) {
		this.areaName = areaName;
	}

	/**
	 * @return the regionName
	 */
	public String getRegionName() {
		return regionName;
	}

	/**
	 * @param regionName
	 *            the regionName to set
	 */
	public void setRegionName(String regionName) {
		this.regionName = regionName;
	}

	/**
	 * @return the district
	 */
	public String getDistrict() {
		return district;
	}

	/**
	 * @param district
	 *            the district to set
	 */
	public void setDistrict(String district) {
		this.district = district;
	}

	/**
	 * @return the roleId
	 */
	public String getRoleId() {
		return roleId;
	}

	/**
	 * @param roleId
	 *            the roleId to set
	 */
	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	/**
	 * @return the salesOrgNm
	 */
	public String getSalesOrgNm() {
		return salesOrgNm;
	}

	/**
	 * @param salesOrgNm the salesOrgNm to set
	 */
	public void setSalesOrgNm(String salesOrgNm) {
		this.salesOrgNm = salesOrgNm;
	}
	public String getLatitude() {
		return latitude;
	}

	public void setLatitude(String latitude) {
		this.latitude = latitude;
	}

	public String getLongitude() {
		return longitude;
	}

	public void setLongitude(String longitude) {
		this.longitude = longitude;
	}

	/**
	 * @return the roleDesc
	 */
	public String getRoleDesc() {
		return roleDesc;
	}

	/**
	 * @param roleDesc the roleDesc to set
	 */
	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

}
