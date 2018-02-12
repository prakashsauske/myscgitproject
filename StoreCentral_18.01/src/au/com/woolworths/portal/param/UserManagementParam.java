package au.com.woolworths.portal.param;

public class UserManagementParam {

	private String roleId;
	private String siteNo;
	private String dateFrom;
	private String dateTo;
	private String userIdSearch;
	private String userId;
	private String msg;
	private String saleOrg;
	private String[] dept;
	private String storeList;
	private String newSiteNo;
	private String createdUserId;
	private String isPrimary;
	private String deptList;
	private String isUpdate;

	private String prev_roleId;
	private String prev_saleOrg;
	private String prev_dateFrom;
	private String prev_dateTo;
	private int isDefaultFlag;
	private String defaultStore;
	private String defaultSalesOrg;
	private String defaultPrevDate;
	
	
	

	public String getDefaultPrevDate() {
		return defaultPrevDate;
	}

	public void setDefaultPrevDate(String defaultPrevDate) {
		this.defaultPrevDate = defaultPrevDate;
	}

	public String getDefaultSalesOrg() {
		return defaultSalesOrg;
	}

	public void setDefaultSalesOrg(String defaultSalesOrg) {
		this.defaultSalesOrg = defaultSalesOrg;
	}

	public String getDefaultStore() {
		return defaultStore;
	}

	public void setDefaultStore(String defaultStore) {
		this.defaultStore = defaultStore;
	}

	public int getIsDefaultFlag() {
		return isDefaultFlag;
	}

	public void setIsDefaultFlag(int isDefaultFlag) {
		this.isDefaultFlag = isDefaultFlag;
	}

	public String getIsUpdate() {
		return isUpdate;
	}

	public void setIsUpdate(String isUpdate) {
		this.isUpdate = isUpdate;
	}

	public String getIsPrimary() {
		return isPrimary;
	}

	public void setIsPrimary(String isPrimary) {
		this.isPrimary = isPrimary;
	}

	public String getDeptList() {
		return deptList;
	}

	public void setDeptList(String deptList) {
		this.deptList = deptList;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getDateTo() {
		return dateTo;
	}

	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}

	public String getUserIdSearch() {
		return userIdSearch;
	}

	public void setUserIdSearch(String userIdSearch) {
		this.userIdSearch = userIdSearch;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
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

	public String[] getDept() {
		return dept;
	}

	public void setDept(String[] dept) {
		this.dept = dept;
	}

	public String getStoreList() {
		return storeList;
	}

	public void setStoreList(String storeList) {
		this.storeList = storeList;
	}

	public String getNewSiteNo() {
		return newSiteNo;
	}

	public void setNewSiteNo(String newSiteNo) {
		this.newSiteNo = newSiteNo;
	}

	/**
	 * @return the createdUserId
	 */
	public String getCreatedUserId() {
		return createdUserId;
	}

	/**
	 * @param createdUserId
	 *            the createdUserId to set
	 */
	public void setCreatedUserId(String createdUserId) {
		this.createdUserId = createdUserId;
	}

	/**
	 * @return the prev_roleId
	 */
	public String getPrev_roleId() {
		return prev_roleId;
	}

	/**
	 * @param prev_roleId
	 *            the prev_roleId to set
	 */
	public void setPrev_roleId(String prev_roleId) {
		this.prev_roleId = prev_roleId;
	}

	/**
	 * @return the prev_saleOrg
	 */
	public String getPrev_saleOrg() {
		return prev_saleOrg;
	}

	/**
	 * @param prev_saleOrg
	 *            the prev_saleOrg to set
	 */
	public void setPrev_saleOrg(String prev_saleOrg) {
		this.prev_saleOrg = prev_saleOrg;
	}

	/**
	 * @return the prev_dateFrom
	 */
	public String getPrev_dateFrom() {
		return prev_dateFrom;
	}

	/**
	 * @param prev_dateFrom
	 *            the prev_dateFrom to set
	 */
	public void setPrev_dateFrom(String prev_dateFrom) {
		this.prev_dateFrom = prev_dateFrom;
	}

	/**
	 * @return the prev_dateTo
	 */
	public String getPrev_dateTo() {
		return prev_dateTo;
	}

	/**
	 * @param prev_dateTo
	 *            the prev_dateTo to set
	 */
	public void setPrev_dateTo(String prev_dateTo) {
		this.prev_dateTo = prev_dateTo;
	}

}