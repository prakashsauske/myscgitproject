package au.com.woolworths.portal.pos.param;

import java.io.Serializable;

public class InvesDepartmentSaleTransParam  extends MandatoryReportParam implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String dateFrom;
	private String dateTo;

	private String fromTime;
	private String toTime;

	private String investigateDropDwnVal;
	private String filterFlag;
	
	private String deptDate;
	private String deptTime;
	private String deptTran;
	private String deptPosi;
	private String deptPoso;
	private String deptAuth;
	private String deptDept;
	private String deptTot;
	private String deptSaleTranAttr;
	private String priceMarkAttr;
	private String priceDate;
	private String priceTime;
	private String priceTran;
	private String pricePoso;
	private String pricePosi;
	private String priceAuth;
	private String priceArtn;
	/*private String priceEan;*/
	private String priceArtd;
	private String priceQty;
	private String priceReas;
	private String priceRetp;
	private String priceTot;
	private String pricePricd;
	private String pricePerc;
	
	private String noSalesAttr;
	
	private String nosalesDate;
	private String nosalesTime;
	private String nosalesTran;
	private String nosalesPoso;
	private String nosalesPosi;
	private String nosalesReas;
	
	private String calendarDayTo;
	private String cashierSignInTime;
	private String calendarDayToEnd;
	private String cashierSignOutTime;
	private String posNumber;
	private String cashierName;
	private String startEndTrans;
	private String operatorLocAttr;
	private String savedAttr;
	
	private String saveTraDate;
	private String saveTraTime;
	private String saveTraTran;
	private String saveTraPoso;
	private String saveTraPosi;
	private String saveTraAmou;
	private String soldOverAttr;
	
	private String priceInqDate;
	private String priceInqTime;
	private String priceInqTran;
	private String priceInqPosi;
	private String priceInqPoso;
	private String priceInqArti;
	private String priceInqArtiDesc;
	private String priceInqArtiStats;
	private String priceInquiryAttr;
		
	
	
	public String getSaveTraDate() {
		return saveTraDate;
	}

	public void setSaveTraDate(String saveTraDate) {
		this.saveTraDate = saveTraDate;
	}

	public String getSaveTraTime() {
		return saveTraTime;
	}

	public void setSaveTraTime(String saveTraTime) {
		this.saveTraTime = saveTraTime;
	}

	public String getSaveTraTran() {
		return saveTraTran;
	}

	public void setSaveTraTran(String saveTraTran) {
		this.saveTraTran = saveTraTran;
	}

	public String getSaveTraPoso() {
		return saveTraPoso;
	}

	public void setSaveTraPoso(String saveTraPoso) {
		this.saveTraPoso = saveTraPoso;
	}

	public String getSaveTraPosi() {
		return saveTraPosi;
	}

	public void setSaveTraPosi(String saveTraPosi) {
		this.saveTraPosi = saveTraPosi;
	}

	public String getSaveTraAmou() {
		return saveTraAmou;
	}

	public void setSaveTraAmou(String saveTraAmou) {
		this.saveTraAmou = saveTraAmou;
	}

	public String getSavedAttr() {
		return savedAttr;
	}

	public void setSavedAttr(String savedAttr) {
		this.savedAttr = savedAttr;
	}

	/**
	 * @return the nosalesDate
	 */
	public String getNosalesDate() {
		return nosalesDate;
	}

	/**
	 * @param nosalesDate the nosalesDate to set
	 */
	public void setNosalesDate(String nosalesDate) {
		this.nosalesDate = nosalesDate;
	}

	/**
	 * @return the nosalesTime
	 */
	public String getNosalesTime() {
		return nosalesTime;
	}

	/**
	 * @param nosalesTime the nosalesTime to set
	 */
	public void setNosalesTime(String nosalesTime) {
		this.nosalesTime = nosalesTime;
	}

	/**
	 * @return the nosalesTran
	 */
	public String getNosalesTran() {
		return nosalesTran;
	}

	/**
	 * @param nosalesTran the nosalesTran to set
	 */
	public void setNosalesTran(String nosalesTran) {
		this.nosalesTran = nosalesTran;
	}

	/**
	 * @return the nosalesPoso
	 */
	public String getNosalesPoso() {
		return nosalesPoso;
	}

	/**
	 * @param nosalesPoso the nosalesPoso to set
	 */
	public void setNosalesPoso(String nosalesPoso) {
		this.nosalesPoso = nosalesPoso;
	}

	/**
	 * @return the nosalesPosi
	 */
	public String getNosalesPosi() {
		return nosalesPosi;
	}

	/**
	 * @param nosalesPosi the nosalesPosi to set
	 */
	public void setNosalesPosi(String nosalesPosi) {
		this.nosalesPosi = nosalesPosi;
	}

	/**
	 * @return the nosalesReas
	 */
	public String getNosalesReas() {
		return nosalesReas;
	}

	/**
	 * @param nosalesReas the nosalesReas to set
	 */
	public void setNosalesReas(String nosalesReas) {
		this.nosalesReas = nosalesReas;
	}
	
	/**
	 * @return the noSalesAttr
	 */
	public String getNoSalesAttr() {
		return noSalesAttr;
	}

	/**
	 * @param noSalesAttr the noSalesAttr to set
	 */
	public void setNoSalesAttr(String noSalesAttr) {
		this.noSalesAttr = noSalesAttr;
	}

	/**
	 * @return the priceDate
	 */
	public String getPriceDate() {
		return priceDate;
	}

	/**
	 * @param priceDate the priceDate to set
	 */
	public void setPriceDate(String priceDate) {
		this.priceDate = priceDate;
	}

	/**
	 * @return the priceTime
	 */
	public String getPriceTime() {
		return priceTime;
	}

	/**
	 * @param priceTime the priceTime to set
	 */
	public void setPriceTime(String priceTime) {
		this.priceTime = priceTime;
	}

	/**
	 * @return the priceTran
	 */
	public String getPriceTran() {
		return priceTran;
	}

	/**
	 * @param priceTran the priceTran to set
	 */
	public void setPriceTran(String priceTran) {
		this.priceTran = priceTran;
	}

	/**
	 * @return the pricePoso
	 */
	public String getPricePoso() {
		return pricePoso;
	}

	/**
	 * @param pricePoso the pricePoso to set
	 */
	public void setPricePoso(String pricePoso) {
		this.pricePoso = pricePoso;
	}

	/**
	 * @return the pricePosi
	 */
	public String getPricePosi() {
		return pricePosi;
	}

	/**
	 * @param pricePosi the pricePosi to set
	 */
	public void setPricePosi(String pricePosi) {
		this.pricePosi = pricePosi;
	}

	/**
	 * @return the priceAuth
	 */
	public String getPriceAuth() {
		return priceAuth;
	}

	/**
	 * @param priceAuth the priceAuth to set
	 */
	public void setPriceAuth(String priceAuth) {
		this.priceAuth = priceAuth;
	}

	/**
	 * @return the priceArtn
	 */
	public String getPriceArtn() {
		return priceArtn;
	}

	/**
	 * @param priceArtn the priceArtn to set
	 */
	public void setPriceArtn(String priceArtn) {
		this.priceArtn = priceArtn;
	}

	/**
	 * @return the priceArtd
	 */
	public String getPriceArtd() {
		return priceArtd;
	}

	/**
	 * @param priceArtd the priceArtd to set
	 */
	public void setPriceArtd(String priceArtd) {
		this.priceArtd = priceArtd;
	}

	/**
	 * @return the priceQty
	 */
	public String getPriceQty() {
		return priceQty;
	}

	/**
	 * @param priceQty the priceQty to set
	 */
	public void setPriceQty(String priceQty) {
		this.priceQty = priceQty;
	}

	/**
	 * @return the priceReas
	 */
	public String getPriceReas() {
		return priceReas;
	}

	/**
	 * @param priceReas the priceReas to set
	 */
	public void setPriceReas(String priceReas) {
		this.priceReas = priceReas;
	}

	/**
	 * @return the priceRetp
	 */
	public String getPriceRetp() {
		return priceRetp;
	}

	/**
	 * @param priceRetp the priceRetp to set
	 */
	public void setPriceRetp(String priceRetp) {
		this.priceRetp = priceRetp;
	}

	/**
	 * @return the priceTot
	 */
	public String getPriceTot() {
		return priceTot;
	}

	/**
	 * @param priceTot the priceTot to set
	 */
	public void setPriceTot(String priceTot) {
		this.priceTot = priceTot;
	}

	/**
	 * @return the pricePricd
	 */
	public String getPricePricd() {
		return pricePricd;
	}

	/**
	 * @param pricePricd the pricePricd to set
	 */
	public void setPricePricd(String pricePricd) {
		this.pricePricd = pricePricd;
	}

	/**
	 * @return the pricePerc
	 */
	public String getPricePerc() {
		return pricePerc;
	}

	/**
	 * @param pricePerc the pricePerc to set
	 */
	public void setPricePerc(String pricePerc) {
		this.pricePerc = pricePerc;
	}

	/**
	 * @return the priceMarkAttr
	 */
	public String getPriceMarkAttr() {
		return priceMarkAttr;
	}

	/**
	 * @param priceMarkAttr the priceMarkAttr to set
	 */
	public void setPriceMarkAttr(String priceMarkAttr) {
		this.priceMarkAttr = priceMarkAttr;
	}

	/**
	 * @return the filterFlage
	 */
	public String getFilterFlag() {
		return filterFlag;
	}

	/**
	 * @param filterFlage the filterFlage to set
	 */
	public void setFilterFlag(String filterFlag) {
		this.filterFlag = filterFlag;
	}

	/**
	 * @return the investigateDropDwnVal
	 */
	public String getInvestigateDropDwnVal() {
		return investigateDropDwnVal;
	}

	/**
	 * @param investigateDropDwnVal the investigateDropDwnVal to set
	 */
	public void setInvestigateDropDwnVal(String investigateDropDwnVal) {
		this.investigateDropDwnVal = investigateDropDwnVal;
	}

	/**
	 * @return the dateFrom
	 */
	public String getDateFrom() {
		return dateFrom;
	}

	/**
	 * @param dateFrom
	 *            the dateFrom to set
	 */
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	/**
	 * @return the dateTo
	 */
	public String getDateTo() {
		return dateTo;
	}

	/**
	 * @param dateTo
	 *            the dateTo to set
	 */
	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}
	/**
	 * @return the fromTime
	 */
	public String getFromTime() {
		return fromTime;
	}

	/**
	 * @param fromTime
	 *            the fromTime to set
	 */
	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}

	/**
	 * @return the toTime
	 */
	public String getToTime() {
		return toTime;
	}

	/**
	 * @param toTime
	 *            the toTime to set
	 */
	public void setToTime(String toTime) {
		this.toTime = toTime;
	}

	public String getDeptDate() {
		return deptDate;
	}

	public void setDeptDate(String deptDate) {
		this.deptDate = deptDate;
	}

	public String getDeptTime() {
		return deptTime;
	}

	public void setDeptTime(String deptTime) {
		this.deptTime = deptTime;
	}

	public String getDeptTran() {
		return deptTran;
	}

	public void setDeptTran(String deptTran) {
		this.deptTran = deptTran;
	}

	public String getDeptPosi() {
		return deptPosi;
	}

	public void setDeptPosi(String deptPosi) {
		this.deptPosi = deptPosi;
	}

	public String getDeptPoso() {
		return deptPoso;
	}

	public void setDeptPoso(String deptPoso) {
		this.deptPoso = deptPoso;
	}

	public String getDeptAuth() {
		return deptAuth;
	}

	public void setDeptAuth(String deptAuth) {
		this.deptAuth = deptAuth;
	}

	public String getDeptDept() {
		return deptDept;
	}

	public void setDeptDept(String deptDept) {
		this.deptDept = deptDept;
	}

	public String getDeptTot() {
		return deptTot;
	}

	public void setDeptTot(String deptTot) {
		this.deptTot = deptTot;
	}

	public String getDeptSaleTranAttr() {
		return deptSaleTranAttr;
	}

	public void setDeptSaleTranAttr(String deptSaleTranAttr) {
		this.deptSaleTranAttr = deptSaleTranAttr;
	}

	public String getCalendarDayTo() {
		return calendarDayTo;
	}

	public void setCalendarDayTo(String calendarDayTo) {
		this.calendarDayTo = calendarDayTo;
	}

	public String getCashierSignInTime() {
		return cashierSignInTime;
	}

	public void setCashierSignInTime(String cashierSignInTime) {
		this.cashierSignInTime = cashierSignInTime;
	}

	public String getCalendarDayToEnd() {
		return calendarDayToEnd;
	}

	public void setCalendarDayToEnd(String calendarDayToEnd) {
		this.calendarDayToEnd = calendarDayToEnd;
	}

	public String getCashierSignOutTime() {
		return cashierSignOutTime;
	}

	public void setCashierSignOutTime(String cashierSignOutTime) {
		this.cashierSignOutTime = cashierSignOutTime;
	}

	public String getPosNumber() {
		return posNumber;
	}

	public void setPosNumber(String posNumber) {
		this.posNumber = posNumber;
	}

	public String getCashierName() {
		return cashierName;
	}

	public void setCashierName(String cashierName) {
		this.cashierName = cashierName;
	}

	public String getStartEndTrans() {
		return startEndTrans;
	}

	public void setStartEndTrans(String startEndTrans) {
		this.startEndTrans = startEndTrans;
	}

	public String getOperatorLocAttr() {
		return operatorLocAttr;
	}

	public void setOperatorLocAttr(String operatorLocAttr) {
		this.operatorLocAttr = operatorLocAttr;
	}

	public String getSoldOverAttr() {
		return soldOverAttr;
	}

	public void setSoldOverAttr(String soldOverAttr) {
		this.soldOverAttr = soldOverAttr;
	}

	public String getPriceInqDate() {
		return priceInqDate;
	}

	public void setPriceInqDate(String priceInqDate) {
		this.priceInqDate = priceInqDate;
	}

	public String getPriceInqTime() {
		return priceInqTime;
	}

	public void setPriceInqTime(String priceInqTime) {
		this.priceInqTime = priceInqTime;
	}

	public String getPriceInqTran() {
		return priceInqTran;
	}

	public void setPriceInqTran(String priceInqTran) {
		this.priceInqTran = priceInqTran;
	}

	public String getPriceInqPosi() {
		return priceInqPosi;
	}

	public void setPriceInqPosi(String priceInqPosi) {
		this.priceInqPosi = priceInqPosi;
	}

	public String getPriceInqPoso() {
		return priceInqPoso;
	}

	public void setPriceInqPoso(String priceInqPoso) {
		this.priceInqPoso = priceInqPoso;
	}

	public String getPriceInqArti() {
		return priceInqArti;
	}

	public void setPriceInqArti(String priceInqArti) {
		this.priceInqArti = priceInqArti;
	}

	public String getPriceInqArtiDesc() {
		return priceInqArtiDesc;
	}

	public void setPriceInqArtiDesc(String priceInqArtiDesc) {
		this.priceInqArtiDesc = priceInqArtiDesc;
	}

	public String getPriceInqArtiStats() {
		return priceInqArtiStats;
	}

	public void setPriceInqArtiStats(String priceInqArtiStats) {
		this.priceInqArtiStats = priceInqArtiStats;
	}

	public String getPriceInquiryAttr() {
		return priceInquiryAttr;
	}

	public void setPriceInquiryAttr(String priceInquiryAttr) {
		this.priceInquiryAttr = priceInquiryAttr;
	}

}
