package au.com.woolworths.portal.param;

public class DailyStoreProfileReportParam {

	private String siteNo;
	private String date;
	private String salesOrg;
	private String deparmentNo;
	private String profileIndicator;
	private String pageNo;
	private String recordCount;
	private String option;

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getDeparmentNo() {
		return deparmentNo;
	}

	public void setDeparmentNo(String deparmentNo) {
		this.deparmentNo = deparmentNo;
	}

	public String getProfileIndicator() {
		return profileIndicator;
	}

	public void setProfileIndicator(String profileIndicator) {
		if (profileIndicator != null && profileIndicator != "") {
			if (profileIndicator.equalsIgnoreCase("standard"))
				this.profileIndicator = "S";
			else if (profileIndicator.equalsIgnoreCase("override"))
				this.profileIndicator = "O";
			else
				this.profileIndicator = profileIndicator;
		} else {
			this.profileIndicator = profileIndicator;
		}
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(String recordCount) {
		this.recordCount = recordCount;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

}
