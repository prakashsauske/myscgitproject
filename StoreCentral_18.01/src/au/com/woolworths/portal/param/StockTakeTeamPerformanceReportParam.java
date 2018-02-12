/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.StockTakeTeamPerformanceReportResult;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeTeamPerformanceReportParam {

	@JsonProperty("reportResult")
	private ArrayList<StockTakeTeamPerformanceReportResult> resultList;

	@JsonProperty("StoreNo")
	private String StoreNo;
	
	@JsonProperty("StoreName")
	private String StoreName;
	
	@JsonProperty("stockTakePrint")
	private String stockTakePrint;
	
	@JsonProperty("reportFor")
	private String reportFor;
	
	@JsonProperty("filterApplyClicked")
	private String filterApplyClicked;
	

	public String getFilterApplyClicked() {
		return filterApplyClicked;
	}

	public void setFilterApplyClicked(String filterApplyClicked) {
		this.filterApplyClicked = filterApplyClicked;
	}

	public String getReportFor() {
		return reportFor;
	}

	public void setReportFor(String reportFor) {
		this.reportFor = reportFor;
	}

	public ArrayList<StockTakeTeamPerformanceReportResult> getResultList() {
		return resultList;
	}

	public void setResultList(
			ArrayList<StockTakeTeamPerformanceReportResult> resultList) {
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