package au.com.woolworths.portal.pos.param;

public class AgeVerificationSummaryParam extends MandatoryReportParam {

	private String dateFrom;
	private String dateTo;
	private String fromTime;
	private String toTime;
	private String posOperName;
	private String totVerf;
	private String approvedVerf;
	private String approvedVerfTran;
	private String rejectVerf;
	private String rejectVerfTran;
	private String keyedVerf;
	private String keyedVerfTran;
	private String ageVerificationSummaryAttr;

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

	public String getPosOperName() {
		return posOperName;
	}

	public void setPosOperName(String posOperName) {
		this.posOperName = posOperName;
	}

	public String getTotVerf() {
		return totVerf;
	}

	public void setTotVerf(String totVerf) {
		this.totVerf = totVerf;
	}

	public String getApprovedVerf() {
		return approvedVerf;
	}

	public void setApprovedVerf(String approvedVerf) {
		this.approvedVerf = approvedVerf;
	}

	public String getApprovedVerfTran() {
		return approvedVerfTran;
	}

	public void setApprovedVerfTran(String approvedVerfTran) {
		this.approvedVerfTran = approvedVerfTran;
	}

	public String getRejectVerf() {
		return rejectVerf;
	}

	public void setRejectVerf(String rejectVerf) {
		this.rejectVerf = rejectVerf;
	}

	public String getKeyedVerf() {
		return keyedVerf;
	}

	public String getRejectVerfTran() {
		return rejectVerfTran;
	}

	public void setRejectVerfTran(String rejectVerfTran) {
		this.rejectVerfTran = rejectVerfTran;
	}

	public void setKeyedVerf(String keyedVerf) {
		this.keyedVerf = keyedVerf;
	}

	public String getKeyedVerfTran() {
		return keyedVerfTran;
	}

	public void setKeyedVerfTran(String keyedVerfTran) {
		this.keyedVerfTran = keyedVerfTran;
	}

	public String getAgeVerificationSummaryAttr() {
		return ageVerificationSummaryAttr;
	}

	public void setAgeVerificationSummaryAttr(String ageVerificationSummaryAttr) {
		this.ageVerificationSummaryAttr = ageVerificationSummaryAttr;
	}

	

}
