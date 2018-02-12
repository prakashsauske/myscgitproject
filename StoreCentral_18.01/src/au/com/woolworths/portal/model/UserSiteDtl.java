package au.com.woolworths.portal.model;

import java.util.ArrayList;

public class UserSiteDtl {

	private String userId;
	private String userName;
	private String siteId;
	private String roleId;
	private String roleDesc;
	private String acticeStartDate;
	private String acticeEndDate;
	private String activeFlag;
	private String dept;
	private String msg;
	private String salesOrg;

	private String salesOrgName;
	private String createdUserId;
	private String updatedUserId;
	private String createdDate;
	private String updatedDate;
	private String updatedUserName;

	private String siteName;
	
	
	private String defaultSiteId;
	private String defaultSalesOrg;
	private String linkedFlag;
	private String deptName;
	private String reset_only;
	private String primary_strore;
	private String isLocked;
	private String storeStatus;
	/**
	 * @return the isLocked
	 */
	public String getIsLocked() {
		return isLocked;
	}

	/**
	 * @param isLocked the isLocked to set
	 */
	public void setIsLocked(String isLocked) {
		this.isLocked = isLocked;
	}

	private int exp_in_days;
	
	public int getExp_in_days() {
		return exp_in_days;
	}

	public void setExp_in_days(int exp_in_days) {
		this.exp_in_days = exp_in_days;
	}

	public ArrayList<String> getDeptList() {
		return deptList;
	}

	public void setDeptList(ArrayList<String> deptList) {
		this.deptList = deptList;
	}

	private ArrayList<String> deptList;
	
	

	public String getPrimary_strore() {
		return primary_strore;
	}

	public void setPrimary_strore(String primary_strore) {
		this.primary_strore = primary_strore;
	}

	/* XPSNV - Security Requirment Change - Begin */
	private String lastLoggedinTime;
	/* XPSNV - Security Requirment Change - End */

	public UserSiteDtl() {

	}

	public UserSiteDtl(String userId, String userName, String siteId,
			String roleId, String roleDesc, String acticeStartDate,
			String acticeEndDate, String activeFlag, String dept,
			String salesOrg, String siteName,String salesOrgNm) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.siteId = siteId;
		this.roleId = roleId;
		this.roleDesc = roleDesc;
		this.acticeStartDate = acticeStartDate;
		this.acticeEndDate = acticeEndDate;
		this.activeFlag = activeFlag;
		this.dept = dept;
		this.salesOrg = salesOrg;
		this.siteName = siteName;
		this.salesOrgName=salesOrgNm;
	}
	
	/* XPSNV - Security Requirment Change - Begin */
	
	public UserSiteDtl(String userId, String userName, String siteId,
			String roleId, String roleDesc, String acticeStartDate,
			String acticeEndDate, String activeFlag, String dept,
			String salesOrg, String siteName,String salesOrgNm, String lastLoggedinTime) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.siteId = siteId;
		this.roleId = roleId;
		this.roleDesc = roleDesc;
		this.acticeStartDate = acticeStartDate;
		this.acticeEndDate = acticeEndDate;
		this.activeFlag = activeFlag;
		this.dept = dept;
		this.salesOrg = salesOrg;
		this.siteName = siteName;
		this.salesOrgName=salesOrgNm;
		this.lastLoggedinTime = lastLoggedinTime;
	}

	/* XPSNV - Security Requirment Change - End */

	public UserSiteDtl(String userId, String userName, String siteId,
			String roleId, String roleDesc, String acticeStartDate,
			String acticeEndDate, String activeFlag, String dept,
			String salesOrg, String salesOrgName, String createdUserId,
			String updatedUserId, String createdDate, String updatedDate,String siteName,String reset_only) {
		super();
		this.reset_only=reset_only;
		this.userId = userId;
		this.userName = userName;
		this.siteId = siteId;
		this.roleId = roleId;
		this.roleDesc = roleDesc;
		this.acticeStartDate = acticeStartDate;
		this.acticeEndDate = acticeEndDate;
		this.activeFlag = activeFlag;
		this.dept = dept;
		this.salesOrg = salesOrg;
		this.salesOrgName = salesOrgName;
		this.createdDate = createdDate;
		this.createdUserId = createdUserId;
		if(updatedUserId!=null && updatedUserId.split("_").length>1){
			this.updatedUserId = updatedUserId.split("_")[1];
		}else{
			this.updatedUserId = updatedUserId;
		}
		this.updatedDate = updatedDate;
		this.siteName=siteName;
		this.deptList=new ArrayList<String>();
	}

	
	public UserSiteDtl(String userId, String userName, String siteId,
			String roleId, String roleDesc, String acticeStartDate,
			String acticeEndDate, String activeFlag, String dept,
			String salesOrg, String siteName, String salesOrgName,  
			String defaultSiteId, String defaultSalesOrg,
			String linkedFlag) {
		super();
		this.userId = userId;
		this.userName = userName;
		this.siteId = siteId;
		this.roleId = roleId;
		this.roleDesc = roleDesc;
		this.acticeStartDate = acticeStartDate;
		this.acticeEndDate = acticeEndDate;
		this.activeFlag = activeFlag;
		this.dept = dept;
		this.salesOrg = salesOrg;
		this.salesOrgName = salesOrgName;
		this.siteName = siteName;
		this.defaultSiteId = defaultSiteId;
		this.defaultSalesOrg = defaultSalesOrg;
		this.linkedFlag = linkedFlag;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getSiteId() {
		return siteId;
	}

	public void setSiteId(String siteId) {
		this.siteId = siteId;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getRoleDesc() {
		return roleDesc;
	}

	public void setRoleDesc(String roleDesc) {
		this.roleDesc = roleDesc;
	}

	public String getActiceStartDate() {
		return acticeStartDate;
	}

	public void setActiceStartDate(String acticeStartDate) {
		this.acticeStartDate = acticeStartDate;
	}

	public String getActiceEndDate() {
		return acticeEndDate;
	}

	public void setActiceEndDate(String acticeEndDate) {
		this.acticeEndDate = acticeEndDate;
	}

	public String getActiveFlag() {
		return activeFlag;
	}

	public void setActiveFlag(String activeFlag) {
		this.activeFlag = activeFlag;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getSalesOrgName() {
		return salesOrgName;
	}

	public void setSalesOrgName(String salesOrgName) {
		this.salesOrgName = salesOrgName;
	}

	public String getCreatedUserId() {
		return createdUserId;
	}

	public void setCreatedUserId(String createdUserId) {
		this.createdUserId = createdUserId;
	}

	public String getUpdatedUserId() {
		return updatedUserId;
	}

	public void setUpdatedUserId(String updatedUserId) {
		this.updatedUserId = updatedUserId;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
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

	public String getDefaultSiteId() {
		return defaultSiteId;
	}

	public void setDefaultSiteId(String defaultSiteId) {
		this.defaultSiteId = defaultSiteId;
	}

	public String getDefaultSalesOrg() {
		return defaultSalesOrg;
	}

	public void setDefaultSalesOrg(String defaultSalesOrg) {
		this.defaultSalesOrg = defaultSalesOrg;
	}

	public String getLinkedFlag() {
		return linkedFlag;
	}

	public void setLinkedFlag(String linkedFlag) {
		this.linkedFlag = linkedFlag;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getReset_only() {
		return reset_only;
	}

	public void setReset_only(String reset_only) {
		this.reset_only = reset_only;
	}

	/* XPSNV - Security Requirment Change - Begin */
	public String getLastLoggedinTime() {
		return lastLoggedinTime;
	}

	public void setLastLoggedinTime(String lastLoggedinTime) {
		this.lastLoggedinTime = lastLoggedinTime;
	}
	/* XPSNV - Security Requirment Change - End */
	
	public static int hasKey(ArrayList<UserSiteDtl> list,String site){
		int i=0;
		for(UserSiteDtl itm:list){
			i++;
			if(itm.getSiteId().equalsIgnoreCase(site)){
				return i;
			}
		}		
		return -1;		
	}

	/**
	 * @return the updatedUserName
	 */
	public String getUpdatedUserName() {
		return updatedUserName;
	}

	/**
	 * @param updatedUserName the updatedUserName to set
	 */
	public void setUpdatedUserName(String updatedUserName) {
		this.updatedUserName = updatedUserName;
	}

	public String getStoreStatus() {
		return storeStatus;
	}

	public void setStoreStatus(String storeStatus) {
		this.storeStatus = storeStatus;
	}

	
}
