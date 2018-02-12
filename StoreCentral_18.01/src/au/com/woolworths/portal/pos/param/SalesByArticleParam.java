package au.com.woolworths.portal.pos.param;

import java.io.Serializable;

public class SalesByArticleParam extends MandatoryReportParam  implements Serializable{

	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	private String dateFrom;
	private String dateTo;

	private String fromTime;
	private String toTime;

	private String posId;
	private String weekTraing;
	private String posName;
	private String departmentList;
	private String category;
	private String subCat;
	private String segme;
	private String depH;
	private String department;
	private String promotionButtonCheck;
	
	
	private String deptArtr;
	private String deptArtd;
	private String deptCat;
	private String deptSub;
	private String deptSeg;
	private String deptRetp;
	private String deptQty;
	private String deptVal;
	private String deptUnit;
	private String totDfrdLyl;
	private String saleByArtSortAttr;
	

	public String getPromotionButtonCheck() {
		return promotionButtonCheck;
	}

	public void setPromotionButtonCheck(String promotionButtonCheck) {
		this.promotionButtonCheck = promotionButtonCheck;
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


	/**
	 * @return the posId
	 */
	public String getPosId() {
		return posId;
	}

	/**
	 * @param posId
	 *            the posId to set
	 */
	public void setPosId(String posId) {
		this.posId = posId;
	}

	/**
	 * @return the weekTraing
	 */
	public String getWeekTraing() {
		return weekTraing;
	}

	/**
	 * @param weekTraing
	 *            the weekTraing to set
	 */
	public void setWeekTraing(String weekTraing) {
		this.weekTraing = weekTraing;
	}

	/**
	 * @return the posName
	 */
	public String getPosName() {
		return posName;
	}

	/**
	 * @param posName
	 *            the posName to set
	 */
	public void setPosName(String posName) {
		this.posName = posName;
	}

	/**
	 * @return the departmentList
	 */
	public String getDepartmentList() {
		return departmentList;
	}

	/**
	 * @param departmentList
	 *            the departmentList to set
	 */
	public void setDepartmentList(String departmentList) {
		this.departmentList = departmentList;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @param category
	 *            the category to set
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return the subCat
	 */
	public String getSubCat() {
		return subCat;
	}

	/**
	 * @param subCat
	 *            the subCat to set
	 */
	public void setSubCat(String subCat) {
		this.subCat = subCat;
	}

	/**
	 * @return the segme
	 */
	public String getSegme() {
		return segme;
	}

	/**
	 * @param segme
	 *            the segme to set
	 */
	public void setSegme(String segme) {
		this.segme = segme;
	}

	/**
	 * @return the depH
	 */
	public String getDepH() {
		return depH;
	}

	/**
	 * @param depH
	 *            the depH to set
	 */
	public void setDepH(String depH) {
		this.depH = depH;
	}

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department
	 *            the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	public String getDeptArtr() {
		return deptArtr;
	}

	public void setDeptArtr(String deptArtr) {
		this.deptArtr = deptArtr;
	}

	public String getDeptArtd() {
		return deptArtd;
	}

	public void setDeptArtd(String deptArtd) {
		this.deptArtd = deptArtd;
	}

	public String getDeptCat() {
		return deptCat;
	}

	public void setDeptCat(String deptCat) {
		this.deptCat = deptCat;
	}

	public String getDeptSub() {
		return deptSub;
	}

	public void setDeptSub(String deptSub) {
		this.deptSub = deptSub;
	}

	public String getDeptSeg() {
		return deptSeg;
	}

	public void setDeptSeg(String deptSeg) {
		this.deptSeg = deptSeg;
	}

	public String getDeptRetp() {
		return deptRetp;
	}

	public void setDeptRetp(String deptRetp) {
		this.deptRetp = deptRetp;
	}

	public String getDeptQty() {
		return deptQty;
	}

	public void setDeptQty(String deptQty) {
		this.deptQty = deptQty;
	}

	public String getDeptVal() {
		return deptVal;
	}

	public void setDeptVal(String deptVal) {
		this.deptVal = deptVal;
	}

	public String getDeptUnit() {
		return deptUnit;
	}

	public void setDeptUnit(String deptUnit) {
		this.deptUnit = deptUnit;
	}

	public String getTotDfrdLyl() {
		return totDfrdLyl;
	}

	public void setTotDfrdLyl(String totDfrdLyl) {
		this.totDfrdLyl = totDfrdLyl;
	}

	public String getSaleByArtSortAttr() {
		return saleByArtSortAttr;
	}

	public void setSaleByArtSortAttr(String saleByArtSortAttr) {
		this.saleByArtSortAttr = saleByArtSortAttr;
	}

}
