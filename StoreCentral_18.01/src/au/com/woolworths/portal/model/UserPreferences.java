package au.com.woolworths.portal.model;

public class UserPreferences {

	public UserPreferences(String rootCode, String rootCodeDesc, String code,
			String description, String priority, String url, String icon) {

		this.code = code;
		this.description = description;
		this.rootCode = rootCode;
		this.rootCodeDesc = rootCodeDesc;
		this.priority = priority;
		this.url = url;
		if(icon.contains(".png"))//added for defect 6358
			icon = icon.replace(".png", "");
		this.icon = icon;
	}


	private String rootCode;
	private String rootCodeDesc;
	private String code;
	private String description;
	private String url;
	private String icon;
	private String priority;
	private String userId;
	private String profileId;

	public UserPreferences() {
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPriority() {
		return priority;
	}

	public void setPriority(String priority) {
		this.priority = priority;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getProfileId() {
		return profileId;
	}

	public void setProfileId(String profileId) {
		this.profileId = profileId;
	}

	public String getUrl() {
		return url;
	}

	public void setUrl(String url) {
		this.url = url;
	}

	public String getIcon() {
		return icon;
	}

	public void setIcon(String icon) {
		this.icon = icon;
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
	 * @return the rootCodeDesc
	 */
	public String getRootCodeDesc() {
		return rootCodeDesc;
	}

	/**
	 * @param rootCodeDesc
	 *            the rootCodeDesc to set
	 */
	public void setRootCodeDesc(String rootCodeDesc) {
		this.rootCodeDesc = rootCodeDesc;
	}

}
