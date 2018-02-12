package au.com.woolworths.portal.param;

public class EdgmsDiscrepancyParam {

	private String inputDate;
	private String siteNo;
	private int pageNo;
	private int recordCount;
	private String displayAmount;
	private String discrpAmt;
	private String msg;

	private String prevInputDate;

	public String getPrevInputDate() {
		return prevInputDate;
	}

	public void setPrevInputDate(String prevInputDate) {
		this.prevInputDate = prevInputDate;
	}

	public String getInputDate() {
		return inputDate;
	}

	public void setInputDate(String inputDate) {
		this.inputDate = inputDate;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

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

	public String getDisplayAmount() {
		return displayAmount;
	}

	public void setDisplayAmount(String displayAmount) {
		this.displayAmount = displayAmount;
	}

	public String getDiscrpAmt() {
		return discrpAmt;
	}

	public void setDiscrpAmt(String discrpAmt) {
		this.discrpAmt = discrpAmt;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}