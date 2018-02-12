package au.com.woolworths.portal.pos.param;

public class DepartmentSalesTaxParam extends MandatoryReportParam {

	private String dateFrom;
	private String dateTo;
	private String fromTime;
	private String toTime;
	private String deptSaleTaxAttr;
	private String deptSaleTaxBanner;
	private String yes;
	


	/**
	 * @return the toTime
	 */
	public String getToTime() {
		return toTime;
	}

	/**
	 * @param toTime the toTime to set
	 */
	public void setToTime(String toTime) {
		this.toTime = toTime;
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

	public String getDeptSaleTaxAttr() {
		return deptSaleTaxAttr;
	}

	public void setDeptSaleTaxAttr(String deptSaleTaxAttr) {
		this.deptSaleTaxAttr = deptSaleTaxAttr;
	}

	public String getDeptSaleTaxBanner() {
		return deptSaleTaxBanner;
	}

	public void setDeptSaleTaxBanner(String deptSaleTaxBanner) {
		this.deptSaleTaxBanner = deptSaleTaxBanner;
	}

	public String getYes() {
		return yes;
	}

	public void setYes(String yes) {
		this.yes = yes;
	}
	
}
