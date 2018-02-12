package au.com.woolworths.portal.pos.model;

import java.io.Serializable;
import java.util.Date;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import au.com.woolworths.portal.util.JsonStorePerformanceDeserializer;


@JsonIgnoreProperties(ignoreUnknown = true)
public class StorePerformanceDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;
	//A0CALDAY changes done because of After Fiori Implementation prod issue.
	@JsonProperty("A0CALDAY_T")
	public void setCalendarDayFrom2(String calendarDayFrom) {
		setCalendarDayFrom( calendarDayFrom);
	}
	private String calendarDayFrom;

	@JsonProperty("A0CALDAY")
	public void setCalendarDayTo2(String calendarDayTo) {
		setCalendarDayTo( calendarDayTo);
	}
	private String calendarDayTo;

	private Date calendarDay;

	@JsonProperty("ZSALHRNSW")
	@JsonDeserialize(using = JsonStorePerformanceDeserializer.class)
	public void setTimeField2(String timeField) {
		setTimeField( timeField);
	}
	private String timeField;
	
	@JsonProperty("A7YUV5W359XPXQYZMKXLDM0T8G")
	public void setSalesRetailincT2(String salesRetailincT) {
		setSalesRetailincT( salesRetailincT);
	}
	private String salesRetailincT;
	
	@JsonProperty("A7YUV5W359XPVXLM9Y7O69F56P_F")
	public void setTenderP_CustFormatted2(String tenderP_CustFormatted) {
		setTenderP_CustFormatted( tenderP_CustFormatted);
	}
	private String tenderP_CustFormatted;
	
	@JsonProperty("A7YUV5W359XPVXLM749ZDD7I84")
	public void setArticlesScannedPerRegPerMin2(String articlesScannedPerRegPerMin) {
		setArticlesScannedPerRegPerMin( articlesScannedPerRegPerMin);
	}
	private String articlesScannedPerRegPerMin;

	@JsonProperty("A7YUV5W359XPVXGKGARGXT68LC")
	public void setTransCount2(String transCount) {
		setTransCount( transCount);
	}
	private String transCount;

	@JsonProperty("A7YUV5W359XPVXGKGARGYRBBI8")
	public void setItemScannedCount2(String itemScannedCount) {
		setItemScannedCount( itemScannedCount);
	}
	private String itemScannedCount;
	
	@JsonProperty("A7YUV5W359XPVXLM6821POQTC2")
	public void setActivePOSTerminal2(String activePOSTerminal) {
		setActivePOSTerminal( activePOSTerminal);
	}
	private String activePOSTerminal;

	@JsonProperty("A7YUV5W359XPVXLM6821POQTC2_F")
	public void setActivePOSTerminalFormatted2(String activePOSTerminalFormatted) {
		setActivePOSTerminalFormatted( activePOSTerminalFormatted);
	}
	private String activePOSTerminalFormatted;

	@JsonProperty("A7YUV5W359XPVXLM6821Q05OG2_F")
	public void setSercureTimeFormatted2(String sercureTimeFormatted) {
		setSercureTimeFormatted( sercureTimeFormatted);
	}
	private String sercureTimeFormatted;

	@JsonProperty("A7YUV5W359XPVXLM6821QAN6KI_F")
	public void setIdleTimeFormatted2(String idleTimeFormatted) {
		setIdleTimeFormatted( idleTimeFormatted);
	}
	private String idleTimeFormatted;

	@JsonProperty("A7YUV5W359XPW0QDLM8SZKYRY9")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;

	@JsonProperty("A7YUV5W359XPW0QDLM8SZKYRY9_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	
	/**
	 * @return the calendarDayFrom
	 */
	public String getCalendarDayFrom() {
		return calendarDayFrom;
	}

	/**
	 * @param calendarDayFrom the calendarDayFrom to set
	 */
	public void setCalendarDayFrom(String calendarDayFrom) {
		this.calendarDayFrom = calendarDayFrom;
	}

	/**
	 * @return the calendarDayTo
	 */
	public String getCalendarDayTo() {
		return calendarDayTo;
	}

	/**
	 * @param calendarDayTo the calendarDayTo to set
	 */
	public void setCalendarDayTo(String calendarDayTo) {
		this.calendarDayTo = calendarDayTo;
	}

	/**
	 * @return the timeField
	 */
	public String getTimeField() {
		return timeField;
	}

	/**
	 * @param timeField the timeField to set
	 */
	public void setTimeField(String timeField) {
		this.timeField = timeField;
	}

	/**
	 * @return the tenderP_CustFormatted
	 */
	public String getTenderP_CustFormatted() {
		return tenderP_CustFormatted;
	}

	/**
	 * @param tenderP_CustFormatted the tenderP_CustFormatted to set
	 */
	public void setTenderP_CustFormatted(String tenderP_CustFormatted) {
		this.tenderP_CustFormatted = tenderP_CustFormatted;
	}

	/**
	 * @return the articlesScannedPerRegPerMin
	 */
	public String getArticlesScannedPerRegPerMin() {
		return articlesScannedPerRegPerMin;
	}

	/**
	 * @param articlesScannedPerRegPerMin the articlesScannedPerRegPerMin to set
	 */
	public void setArticlesScannedPerRegPerMin(String articlesScannedPerRegPerMin) {
		this.articlesScannedPerRegPerMin = articlesScannedPerRegPerMin;
	}

	/**
	 * @return the transCount
	 */
	public String getTransCount() {
		return transCount;
	}

	/**
	 * @param transCount the transCount to set
	 */
	public void setTransCount(String transCount) {
		this.transCount = transCount;
	}

	/**
	 * @return the itemScannedCount
	 */
	public String getItemScannedCount() {
		return itemScannedCount;
	}

	/**
	 * @param itemScannedCount the itemScannedCount to set
	 */
	public void setItemScannedCount(String itemScannedCount) {
		this.itemScannedCount = itemScannedCount;
	}

	/**
	 * @return the activePOSTerminal
	 */
	public String getActivePOSTerminal() {
		return activePOSTerminal;
	}

	/**
	 * @param activePOSTerminal the activePOSTerminal to set
	 */
	public void setActivePOSTerminal(String activePOSTerminal) {
		this.activePOSTerminal = activePOSTerminal;
	}

	/**
	 * @return the activePOSTerminalFormatted
	 */
	public String getActivePOSTerminalFormatted() {
		return activePOSTerminalFormatted;
	}

	/**
	 * @param activePOSTerminalFormatted the activePOSTerminalFormatted to set
	 */
	public void setActivePOSTerminalFormatted(String activePOSTerminalFormatted) {
		this.activePOSTerminalFormatted = activePOSTerminalFormatted;
	}

	/**
	 * @return the sercureTimeFormatted
	 */
	public String getSercureTimeFormatted() {
		return sercureTimeFormatted;
	}

	/**
	 * @param sercureTimeFormatted the sercureTimeFormatted to set
	 */
	public void setSercureTimeFormatted(String sercureTimeFormatted) {
		this.sercureTimeFormatted = sercureTimeFormatted;
	}

	/**
	 * @return the idleTimeFormatted
	 */
	public String getIdleTimeFormatted() {
		return idleTimeFormatted;
	}

	/**
	 * @param idleTimeFormatted the idleTimeFormatted to set
	 */
	public void setIdleTimeFormatted(String idleTimeFormatted) {
		this.idleTimeFormatted = idleTimeFormatted;
	}

	/**
	 * @return the salesRetailincT
	 */
	public String getSalesRetailincT() {
		return salesRetailincT;
	}

	/**
	 * @param salesRetailincT the salesRetailincT to set
	 */
	public void setSalesRetailincT(String salesRetailincT) {
		this.salesRetailincT = salesRetailincT;
	}

	/**
	 * @return the tValue
	 */
	public String gettValue() {
		return tValue;
	}

	/**
	 * @param tValue the tValue to set
	 */
	public void settValue(String tValue) {
		this.tValue = tValue;
	}

	public Date getCalendarDay() {
		return calendarDay;
	}

	public void setCalendarDay(Date calendarDay) {
		this.calendarDay = calendarDay;
	}

	public String getNoDataFound() {
		return noDataFound;
	}

	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}
}
