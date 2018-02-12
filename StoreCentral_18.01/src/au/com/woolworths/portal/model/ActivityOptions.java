package au.com.woolworths.portal.model;

import java.io.Serializable;
import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ActivityOptions implements Serializable{

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	//CODE MISSED IN 1S1_V1 BRANCH
	@JsonProperty("code")
	private String code;
	
	@JsonProperty("platform")
	private String platform;

	@JsonProperty("description")
	private String description;

	@JsonProperty("type")
	private String type;

	@JsonProperty("rootCode")
	private String rootCode;

	@JsonProperty("accessFlag")
	private String accessFlag;

	@JsonProperty("accessLevel")
	private String accessLevel;

	@JsonProperty("includeExcludeFlag")
	private String includeExcludeFlag;

	@JsonProperty("roleId")
	private String roleId;

	@JsonProperty("salesOrg")
	private String salesOrg;

	@JsonProperty("screenFunctionFlag")
	private String screenFunctionFlag;

	@JsonProperty("siteNo")
	private String siteNo;

	@JsonProperty("siteDesc")
	private String siteDesc;

	@JsonProperty("siteCnt")
	private String siteCnt;

	@JsonProperty("roleList")
	private ArrayList<String> roleList;

	@JsonProperty("levelList")
	private ArrayList<String> levelList;

	@JsonProperty("codeList")
	private ArrayList<String> codeList;

	@JsonProperty("activityOptionsList")
	private ArrayList<ActivityOptions> activityOptionsList;

	@JsonProperty("deleteAllFlag")
	private String deleteAllFlag;

	@JsonProperty("checkedCodeList")
	private ArrayList<String> checkedCodeList;

	@JsonProperty("unCheckedCodeList")
	private ArrayList<String> unCheckedCodeList;

	@JsonProperty("checkedLevelList")
	private ArrayList<String> checkedLevelList;

	@JsonProperty("unCheckedLevelList")
	private ArrayList<String> unCheckedLevelList;
	
	@JsonProperty("roleDesc")
	private String roleDesc;

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	/**
	 * @return the code
	 */
	public String getCode() {
		return code;
	}

	/**
	 * @param code
	 *            the code to set
	 */
	public void setCode(String code) {
		this.code = code;
	}

	/**
	 * @return the description
	 */
	public String getDescription() {
		return description;
	}

	/**
	 * @param description
	 *            the description to set
	 */
	public void setDescription(String description) {
		this.description = description;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the rootCode
	 */
	public String getRootCode() {
		return rootCode;
	}

	/**
	 * @param rootCode
	 *            the rootCode to set
	 */
	public void setRootCode(String rootCode) {
		this.rootCode = rootCode;
	}

	/**
	 * @return the accessFlag
	 */
	public String getAccessFlag() {
		return accessFlag;
	}

	/**
	 * @param accessFlag
	 *            the accessFlag to set
	 */
	public void setAccessFlag(String accessFlag) {
		this.accessFlag = accessFlag;
	}

	/**
	 * @return the accessLevel
	 */
	public String getAccessLevel() {
		return accessLevel;
	}

	/**
	 * @param accessLevel
	 *            the accessLevel to set
	 */
	public void setAccessLevel(String accessLevel) {
		this.accessLevel = accessLevel;
	}

	/**
	 * @return the includeExcludeFlag
	 */
	public String getIncludeExcludeFlag() {
		return includeExcludeFlag;
	}

	/**
	 * @param includeExcludeFlag
	 *            the includeExcludeFlag to set
	 */
	public void setIncludeExcludeFlag(String includeExcludeFlag) {
		this.includeExcludeFlag = includeExcludeFlag;
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
	 * @return the screenFunctionFlag
	 */
	public String getScreenFunctionFlag() {
		return screenFunctionFlag;
	}

	/**
	 * @param screenFunctionFlag
	 *            the screenFunctionFlag to set
	 */
	public void setScreenFunctionFlag(String screenFunctionFlag) {
		this.screenFunctionFlag = screenFunctionFlag;
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
	 * @return the siteCnt
	 */
	public String getSiteCnt() {
		return siteCnt;
	}

	/**
	 * @param siteCnt
	 *            the siteCnt to set
	 */
	public void setSiteCnt(String siteCnt) {
		this.siteCnt = siteCnt;
	}

	public ActivityOptions() {

	}

	public ActivityOptions(String code, String description, String type,
			String rootCode, String accessFlag, String accessLevel,
			String includeExcludeFlag, String roleId, String salesOrg,
			String screenFunctionFlag, String siteNo, String siteCnt) {
		super();
		this.code = code != null ? code : "";
		this.description = description != null ? description : "";
		this.type = type != null ? type : "";
		this.rootCode = rootCode != null ? rootCode : "";
		this.accessFlag = accessFlag != null ? accessFlag : "";
		this.accessLevel = accessLevel != null ? accessLevel : "";
		this.includeExcludeFlag = includeExcludeFlag != null ? includeExcludeFlag
				: "";
		this.roleId = roleId != null ? roleId : "";
		this.salesOrg = salesOrg != null ? salesOrg : "";
		this.screenFunctionFlag = screenFunctionFlag != null ? screenFunctionFlag
				: "";
		this.siteNo = siteNo != null ? siteNo : "";
		this.siteCnt = siteCnt != null ? siteCnt : "";

	}

	public String getSiteDesc() {
		return siteDesc;
	}

	public void setSiteDesc(String siteDesc) {
		this.siteDesc = siteDesc;
	}

	public ArrayList<ActivityOptions> getActivityOptionsList() {
		return activityOptionsList;
	}

	public void setActivityOptionsList(
			ArrayList<ActivityOptions> activityOptionsList) {
		this.activityOptionsList = activityOptionsList;
	}

	public ArrayList<String> getRoleList() {
		return roleList;
	}

	public void setRoleList(ArrayList<String> roleList) {
		this.roleList = roleList;
	}

	public ArrayList<String> getLevelList() {
		return levelList;
	}

	public void setLevelList(ArrayList<String> levelList) {
		this.levelList = levelList;
	}

	public ArrayList<String> getCodeList() {
		return codeList;
	}

	public void setCodeList(ArrayList<String> codeList) {
		this.codeList = codeList;
	}

	/**
	 * @return the deleteAllFlag
	 */
	public String getDeleteAllFlag() {
		return deleteAllFlag;
	}

	/**
	 * @param deleteAllFlag
	 *            the deleteAllFlag to set
	 */
	public void setDeleteAllFlag(String deleteAllFlag) {
		this.deleteAllFlag = deleteAllFlag;
	}

	/**
	 * @return the checkedCodeList
	 */
	public ArrayList<String> getCheckedCodeList() {
		return checkedCodeList;
	}

	/**
	 * @param checkedCodeList
	 *            the checkedCodeList to set
	 */
	public void setCheckedCodeList(ArrayList<String> checkedCodeList) {
		this.checkedCodeList = checkedCodeList;
	}

	/**
	 * @return the unCheckedCodeList
	 */
	public ArrayList<String> getUnCheckedCodeList() {
		return unCheckedCodeList;
	}

	/**
	 * @param unCheckedCodeList
	 *            the unCheckedCodeList to set
	 */
	public void setUnCheckedCodeList(ArrayList<String> unCheckedCodeList) {
		this.unCheckedCodeList = unCheckedCodeList;
	}

	/**
	 * @return the checkedLevelList
	 */
	public ArrayList<String> getCheckedLevelList() {
		return checkedLevelList;
	}

	/**
	 * @param checkedLevelList
	 *            the checkedLevelList to set
	 */
	public void setCheckedLevelList(ArrayList<String> checkedLevelList) {
		this.checkedLevelList = checkedLevelList;
	}

	/**
	 * @return the unCheckedLevelList
	 */
	public ArrayList<String> getUnCheckedLevelList() {
		return unCheckedLevelList;
	}

	/**
	 * @param unCheckedLevelList
	 *            the unCheckedLevelList to set
	 */
	public void setUnCheckedLevelList(ArrayList<String> unCheckedLevelList) {
		this.unCheckedLevelList = unCheckedLevelList;
	}
	
	/**
	 * @return the platform
	 */
	public String getPlatform() {
		return platform;
	}

	/**
	 * @param platform the platform to set
	 */
	public void setPlatform(String platform) {
		this.platform = platform;
	}

	/*XPSNV - Code modified for Security enhancements - Begin */
	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result
				+ ((accessFlag == null) ? 0 : accessFlag.hashCode());
		result = prime * result
				+ ((accessLevel == null) ? 0 : accessLevel.hashCode());
		result = prime * result + ((code == null) ? 0 : code.hashCode());
		result = prime
				* result
				+ ((includeExcludeFlag == null) ? 0 : includeExcludeFlag
						.hashCode());
		result = prime * result
				+ ((levelList == null) ? 0 : levelList.hashCode());
		result = prime * result + ((roleId == null) ? 0 : roleId.hashCode());
		result = prime * result
				+ ((salesOrg == null) ? 0 : salesOrg.hashCode());
		/*result = prime
				* result
				+ ((screenFunctionFlag == null) ? 0 : screenFunctionFlag
						.hashCode());*/
		result = prime * result + ((siteNo == null) ? 0 : siteNo.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		ActivityOptions other = (ActivityOptions) obj;
		if (accessFlag == null) {
			if (other.accessFlag != null)
				return false;
		} else if (!accessFlag.equals(other.accessFlag))
			return false;
		if (accessLevel == null) {
			if (other.accessLevel != null)
				return false;
		} else if (!accessLevel.equals(other.accessLevel))
			return false;
		if (code == null) {
			if (other.code != null)
				return false;
		} else if (!code.equals(other.code))
			return false;
		if (includeExcludeFlag == null) {
			if (other.includeExcludeFlag != null)
				return false;
		} else if (!includeExcludeFlag.equals(other.includeExcludeFlag))
			return false;
		if (levelList == null) {
			if (other.levelList != null)
				return false;
		} else if (!levelList.equals(other.levelList))
			return false;
		if (roleId == null) {
			if (other.roleId != null)
				return false;
		} else if (!roleId.equals(other.roleId))
			return false;
		if (salesOrg == null) {
			if (other.salesOrg != null)
				return false;
		} else if (!salesOrg.equals(other.salesOrg))
			return false;
		/*if (screenFunctionFlag == null) {
			if (other.screenFunctionFlag != null)
				return false;
		} else if (!screenFunctionFlag.equals(other.screenFunctionFlag))
			return false;*/
		if (siteNo == null) {
			if (other.siteNo != null)
				return false;
		} else if (!siteNo.equals(other.siteNo))
			return false;
		return true;
	}

	/*XPSNV - Code modified for Security enhancements - End */
}