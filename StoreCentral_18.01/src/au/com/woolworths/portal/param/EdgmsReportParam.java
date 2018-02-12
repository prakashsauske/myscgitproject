package au.com.woolworths.portal.param;

public class EdgmsReportParam {

	private String inputDate;
	private String wcDate;
	private String tradingDept;
	private String siteNo;
	private String radio;
	private int pageNo;
	private int recordCount;
	private String searchByOptions;

	public int getPageNo() {
		return pageNo;
	}

	public void setPageNo(int pageNo) {
		this.pageNo = pageNo;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
	}

	public String getSearchByOptions() {
		return searchByOptions;
	}

	public void setSearchByOptions(String searchByOptions) {
		this.searchByOptions = searchByOptions;
	}

	public String getRadio() {
		return radio;
	}

	public void setRadio(String radio) {
		this.radio = radio;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getWcDate() {
		return wcDate;
	}

	public void setWcDate(String wcDate) {
		this.wcDate = wcDate;
	}

	public String getTradingDept() {
		return tradingDept;
	}

	public void setTradingDept(String tradingDept) {
		this.tradingDept = tradingDept;
	}

	public String getInputDate() {
		return inputDate;
	}

	public void setInputDate(String inputDate) {
		this.inputDate = inputDate;
	}

}
