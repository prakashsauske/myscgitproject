package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.PLUReportResult;
import au.com.woolworths.portal.model.StockTakeArticleCountResult;

@JsonIgnoreProperties(ignoreUnknown = true)

public class StockTakeArticleCountParam {
	
	@JsonProperty("reportResult")
	private ArrayList<StockTakeArticleCountResult> reportResult;
	
	@JsonProperty("reportFor")
	private String reportFor;	
	
	@JsonProperty("storeNo")
	private String storeNo;	
	
	@JsonProperty("storeName")
	private String storeName; 
	
	@JsonProperty("userId")
	private String userId; 
	
	@JsonProperty("userName")
	private String userName; 
	
	@JsonProperty("totalCount")
	private String totalCount;
	
	@JsonProperty("stockTakePrint")
	private String stockTakePrint;
	
	@JsonProperty("groupBy")
	private String groupBy;

	public ArrayList<StockTakeArticleCountResult> getReportResult() {
		return reportResult;
	}

	public void setReportResult(ArrayList<StockTakeArticleCountResult> reportResult) {
		this.reportResult = reportResult;
	}

	public String getReportFor() {
		return reportFor;
	}

	public void setReportFor(String reportFor) {
		this.reportFor = reportFor;
	}

	public String getStoreNo() {
		return storeNo;
	}

	public void setStoreNo(String storeNo) {
		this.storeNo = storeNo;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
	}

	public String getStockTakePrint() {
		return stockTakePrint;
	}

	public void setStockTakePrint(String stockTakePrint) {
		this.stockTakePrint = stockTakePrint;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getGroupBy() {
		return groupBy;
	}

	public void setGroupBy(String groupBy) {
		this.groupBy = groupBy;
	}

	
	
}
