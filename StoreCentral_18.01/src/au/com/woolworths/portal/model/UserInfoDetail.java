package au.com.woolworths.portal.model;

public class UserInfoDetail {

	private String siteNo;
	private String salesOrg;
	private String assignedSalesOrg;
	private String siteName;
	private String roleId;
	private String salesOrgNm;
	private boolean isLocatedStore;

	/**
	 * @return the isLocatedStore
	 */
	public boolean isLocatedStore() {
		return isLocatedStore;
	}

	/**
	 * @param isLocatedStore the isLocatedStore to set
	 */
	public void setLocatedStore(boolean isLocatedStore) {
		this.isLocatedStore = isLocatedStore;
	}

	public UserInfoDetail(String siteNo, String salesOrg, String siteName,
			String roleId,String assignedSalesOrg) {
		super();
		this.siteNo = siteNo;
		this.salesOrg = salesOrg;
		this.siteName = siteName;
		this.roleId = roleId;
		this.assignedSalesOrg = assignedSalesOrg;
	}

	/**
	 * @return the assignedSalesOrg
	 */
	public String getAssignedSalesOrg() {
		return assignedSalesOrg;
	}

	/**
	 * @param assignedSalesOrg the assignedSalesOrg to set
	 */
	public void setAssignedSalesOrg(String assignedSalesOrg) {
		this.assignedSalesOrg = assignedSalesOrg;
	}

	public UserInfoDetail() {
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getRoleId() {
		return roleId;
	}

	public void setRoleId(String roleId) {
		this.roleId = roleId;
	}

	public String getSalesOrgNm() {
		return salesOrgNm;
	}

	public void setSalesOrgNm(String salesOrgNm) {
		this.salesOrgNm = salesOrgNm;
	}

}
