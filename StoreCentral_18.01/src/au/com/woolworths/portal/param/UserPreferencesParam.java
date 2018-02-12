package au.com.woolworths.portal.param;

import java.util.ArrayList;
import java.util.Map;

import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.UserPreferences;

public class UserPreferencesParam {

	private String option;
	private String siteNo;
	private String saleOrg;
	private String userId;
	private String roleId;
	private String userPreferencesSize;
	private String searchStatus;
	private String platform;
	
	private Map<String , String > rootCodeMap;
	private Map<String , ArrayList<MenuOptions>> manageMenuMap;
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

	/**
	 * @return the searchStatus
	 */
	public String getSearchStatus() {
		return searchStatus;
	}

	/**
	 * @param searchStatus the searchStatus to set
	 */
	public void setSearchStatus(String searchStatus) {
		this.searchStatus = searchStatus;
	}

	private Map<String, UserPreferences> userPreferencesURLMap;

	public String getOption() {
		return option;
	}

	public String getUserPreferencesSize() {
		return userPreferencesSize;
	}

	public void setUserPreferencesSize(String userPreferencesSize) {
		this.userPreferencesSize = userPreferencesSize;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSaleOrg() {
		return saleOrg;
	}

	public void setSaleOrg(String saleOrg) {
		this.saleOrg = saleOrg;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
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
	 * @return the userPreferencesURLMap
	 */
	public Map<String, UserPreferences> getUserPreferencesURLMap() {
		return userPreferencesURLMap;
	}

	/**
	 * @param userPreferencesURLMap
	 *            the userPreferencesURLMap to set
	 */
	public void setUserPreferencesURLMap(
			Map<String, UserPreferences> userPreferencesURLMap) {
		this.userPreferencesURLMap = userPreferencesURLMap;
	}

	/**
	 * @return the rootCodeMap
	 */
	public Map<String, String> getRootCodeMap() {
		return rootCodeMap;
	}

	/**
	 * @param rootCodeMap the rootCodeMap to set
	 */
	public void setRootCodeMap(Map<String, String> rootCodeMap) {
		if(null != rootCodeMap)
		this.rootCodeMap = rootCodeMap;
	}

	/**
	 * @return the manageMenuMap
	 */
	public Map<String, ArrayList<MenuOptions>> getManageMenuMap() {
		return manageMenuMap;
	}

	/**
	 * @param manageMenuMap the manageMenuMap to set
	 */
	public void setManageMenuMap(Map<String, ArrayList<MenuOptions>> manageMenuMap) {
		if(null != manageMenuMap)
		this.manageMenuMap = manageMenuMap;
	}

}
