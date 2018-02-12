package au.com.woolworths.portal.param;

public class DGMSReportParam {

	private int pageNo;

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

	private int recordCount;

	private String siteNo;

	private String wcDate;

	private String inputDate;

	private String tradingDept;

	private String radio;
	private String searchByOptions;

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

	public String getInputDate() {
		return inputDate;
	}

	public void setInputDate(String inputDate) {
		this.inputDate = inputDate;
	}

	public String getTradingDept() {
		return tradingDept;
	}

	public void setTradingDept(String tradingDept) {
		this.tradingDept = tradingDept;
	}

}
