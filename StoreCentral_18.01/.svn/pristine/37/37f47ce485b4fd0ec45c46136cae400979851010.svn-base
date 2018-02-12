/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.OverstockDailyReportResult;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OverstockDailyReportParam {

	@JsonProperty("reportResult")
	private ArrayList<OverstockDailyReportResult> resultList;

	@JsonProperty("reportFor")
	private String reportFor;
	
	@JsonProperty("reportForDate")
	private String reportForDate;

	@JsonProperty("StoreNo")
	private String StoreNo;

	@JsonProperty("StoreName")
	private String StoreName;

	public ArrayList<OverstockDailyReportResult> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<OverstockDailyReportResult> resultList) {
		this.resultList = resultList;
	}

	public String getReportFor() {
		return (reportFor == null ? "" : reportFor);
	}

	public void setReportFor(String reportFor) {
		this.reportFor = reportFor;
	}

	public String getReportForDate() {
		return (reportForDate == null ? "" : reportForDate);
	}

	public void setReportForDate(String reportForDate) {
		this.reportForDate = reportForDate;
	}

	public String getStoreNo() {
		return (StoreNo == null ? "" : StoreNo);
	}

	public void setStoreNo(String storeNo) {
		StoreNo = storeNo;
	}

	public String getStoreName() {
		return (StoreName == null ? "" : StoreName);
	}

	public void setStoreName(String storeName) {
		StoreName = storeName;
	}

}