/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.StockTakeAuditSummaryReportResult;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeAuditSummaryReportParam {

	@JsonProperty("reportResult")
	private ArrayList<StockTakeAuditSummaryReportResult> resultList;

	@JsonProperty("StoreNo")
	private String StoreNo;

	@JsonProperty("StoreName")
	private String StoreName;

	@JsonProperty("stockTakePrint")
	private String stockTakePrint;

	@JsonProperty("applyGroupby")
	private String applyGroupby;

	public ArrayList<StockTakeAuditSummaryReportResult> getResultList() {
		return resultList;
	}

	public void setResultList(
			ArrayList<StockTakeAuditSummaryReportResult> resultList) {
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

	public String getApplyGroupby() {
		return applyGroupby;
	}

	public void setApplyGroupby(String applyGroupby) {
		this.applyGroupby = applyGroupby;
	}

}