/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.StockTakeUserPerformanceReportResult;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeUserPerformanceReportParam {

	@JsonProperty("reportResult")
	private ArrayList<StockTakeUserPerformanceReportResult> resultList;

	@JsonProperty("StoreNo")
	private String StoreNo;
	
	@JsonProperty("StoreName")
	private String StoreName;
	
	@JsonProperty("stockTakePrint")
	private String stockTakePrint;
	
	@JsonProperty("reportFor")
	private String reportFor;
	

	public String getReportFor() {
		return reportFor;
	}

	public void setReportFor(String reportFor) {
		this.reportFor = reportFor;
	}

	public ArrayList<StockTakeUserPerformanceReportResult> getResultList() {
		return resultList;
	}

	public void setResultList(
			ArrayList<StockTakeUserPerformanceReportResult> resultList) {
		this.resultList = resultList;
	}

	public String getStoreNo() {
		return StoreNo;
	}

	public void setStoreNo(String storeNo) {
		StoreNo = storeNo;
	}

	public String getStoreName() {
		return StoreName;
	}

	public void setStoreName(String storeName) {
		StoreName = storeName;
	}

	public String getStockTakePrint() {
		return stockTakePrint;
	}

	public void setStockTakePrint(String stockTakePrint) {
		this.stockTakePrint = stockTakePrint;
	}
	
	

}