package au.com.woolworths.portal.pos.param;

public class ManualFuelSalesParam extends MandatoryReportParam {

	private String dateFrom;
	private String dateTo;
	private String manDate;
	private String manTime;
	private String manTrans;
	private String manPosid;
	private String manOperNm;
	private String manArticle;
	private String manLitreSold;
	private String manTotal;
	private String manualFuelSaleAttr;
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
	public String getManDate() {
		return manDate;
	}
	public void setManDate(String manDate) {
		this.manDate = manDate;
	}
	public String getManTime() {
		return manTime;
	}
	public void setManTime(String manTime) {
		this.manTime = manTime;
	}
	public String getManTrans() {
		return manTrans;
	}
	public void setManTrans(String manTrans) {
		this.manTrans = manTrans;
	}
	public String getManPosid() {
		return manPosid;
	}
	public void setManPosid(String manPosid) {
		this.manPosid = manPosid;
	}
	public String getManOperNm() {
		return manOperNm;
	}
	public void setManOperNm(String manOperNm) {
		this.manOperNm = manOperNm;
	}
	public String getManArticle() {
		return manArticle;
	}
	public void setManArticle(String manArticle) {
		this.manArticle = manArticle;
	}
	public String getManLitreSold() {
		return manLitreSold;
	}
	public void setManLitreSold(String manLitreSold) {
		this.manLitreSold = manLitreSold;
	}
	public String getManTotal() {
		return manTotal;
	}
	public void setManTotal(String manTotal) {
		this.manTotal = manTotal;
	}
	public String getManualFuelSaleAttr() {
		return manualFuelSaleAttr;
	}
	public void setManualFuelSaleAttr(String manualFuelSaleAttr) {
		this.manualFuelSaleAttr = manualFuelSaleAttr;
	}
}
