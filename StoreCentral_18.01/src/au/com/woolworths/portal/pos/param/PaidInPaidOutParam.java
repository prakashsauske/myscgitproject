package au.com.woolworths.portal.pos.param;

public class PaidInPaidOutParam extends MandatoryReportParam {

	private String dateFrom;
	private String pos;
	private String userID;
	private String manyUserId;
	private String fromTime;
	private String posId;
	private String posName;
	private String weekNumber;
	private String currentYear;
	private String posNames;
	private String weekYear;
	private String weekFromDateHide;
	private String weekToDateHide;
	private String toTime;
	private String selectType;
	


	/**
	 * @return the weekYear
	 */
	public String getWeekYear() {
		return weekYear;
	}

	/**
	 * @param weekYear the weekYear to set
	 */
	public void setWeekYear(String weekYear) {
		this.weekYear = weekYear;
	}
	
	
	
	/**
	 * @return the posNames
	 */
	public String getPosNames() {
		return posNames;
	}
	/**
	 * @param posNames the posNames to set
	 */
	public void setPosNames(String posNames) {
		this.posNames = posNames;
	}
	/**
	 * @return the dateFrom
	 */
	public String getDateFrom() {
		return dateFrom;
	}
	/**
	 * @param dateFrom the dateFrom to set
	 */
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}
	/**
	 * @return the fromTime
	 */
	public String getFromTime() {
		return fromTime;
	}
	/**
	 * @param fromTime the fromTime to set
	 */
	public void setFromTime(String fromTime) {
		this.fromTime = fromTime;
	}
	/**
	 * @return the posId
	 */
	public String getPosId() {
		return posId;
	}
	/**
	 * @param posId the posId to set
	 */
	public void setPosId(String posId) {
		this.posId = posId;
	}
	/**
	 * @return the posName
	 */
	public String getPosName() {
		return posName;
	}
	/**
	 * @param posName the posName to set
	 */
	public void setPosName(String posName) {
		this.posName = posName;
	}
	/**
	 * @return the pos
	 */
	public String getPos() {
		return pos;
	}
	/**
	 * @param pos the pos to set
	 */
	public void setPos(String pos) {
		this.pos = pos;
	}
	/**
	 * @return the userID
	 */
	public String getUserID() {
		return userID;
	}
	/**
	 * @param userID the userID to set
	 */
	public void setUserID(String userID) {
		this.userID = userID;
	}
	/**
	 * @return the manyUserId
	 */
	public String getManyUserId() {
		return manyUserId;
	}
	/**
	 * @param manyUserId the manyUserId to set
	 */
	public void setManyUserId(String manyUserId) {
		this.manyUserId = manyUserId;
	}
	/**
	 * @return the weekNumber
	 */
	public String getWeekNumber() {
		return weekNumber;
	}
	/**
	 * @param weekNumber the weekNumber to set
	 */
	public void setWeekNumber(String weekNumber) {
		this.weekNumber = weekNumber;
	}
	/**
	 * @return the currentYear
	 */
	public String getCurrentYear() {
		return currentYear;
	}
	/**
	 * @param currentYear the currentYear to set
	 */
	public void setCurrentYear(String currentYear) {
		this.currentYear = currentYear;
	}

	/**
	 * @return the weekFromDateHide
	 */
	public String getWeekFromDateHide() {
		return weekFromDateHide;
	}

	/**
	 * @param weekFromDateHide the weekFromDateHide to set
	 */
	public void setWeekFromDateHide(String weekFromDateHide) {
		this.weekFromDateHide = weekFromDateHide;
	}

	/**
	 * @return the weekToDateHide
	 */
	public String getWeekToDateHide() {
		return weekToDateHide;
	}

	/**
	 * @param weekToDateHide the weekToDateHide to set
	 */
	public void setWeekToDateHide(String weekToDateHide) {
		this.weekToDateHide = weekToDateHide;
	}

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

	public String getSelectType() {
		return selectType;
	}

	public void setSelectType(String selectType) {
		this.selectType = selectType;
	}
}
