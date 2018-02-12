package au.com.woolworths.portal.pos.param;

public class StorePerformancePOSParam extends MandatoryReportParam {

	private String dateFrom;
	private String dateTo;
	private String fromTime;
	private String toTime;
	private String recCount;
	private String storePerformanceAttr;

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
	 * @return the recCount
	 */
	public String getRecCount() {
		return recCount;
	}

	/**
	 * @param recCount
	 *            the recCount to set
	 */
	public void setRecCount(String recCount) {
		this.recCount = recCount;
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

	public String getStorePerformanceAttr() {
		return storePerformanceAttr;
	}

	public void setStorePerformanceAttr(String storePerformanceAttr) {
		this.storePerformanceAttr = storePerformanceAttr;
	}

}
