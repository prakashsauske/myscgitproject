package au.com.woolworths.portal.param;

public class OrderRosterReportParam {

	private String siteNo;
	private String sourceSupply;
	private String salesOrg;
	private String supplier;
	private String fromDate;
	private String toDate;
	private String pageNo;
	private String recordCount;
	private String option;

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSourceSupply() {
		return sourceSupply;
	}

	public void setSourceSupply(String sourceSupply) {
		if (sourceSupply != null) {
			if (sourceSupply.equalsIgnoreCase("warehouse"))
				this.sourceSupply = "2";
			else if (sourceSupply.equalsIgnoreCase("vendor"))
				this.sourceSupply = "1";
			else if (sourceSupply.equalsIgnoreCase("all"))
				this.sourceSupply = "3";
			else
				this.sourceSupply = sourceSupply;
		} else {
			this.sourceSupply = sourceSupply;
		}

	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
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
