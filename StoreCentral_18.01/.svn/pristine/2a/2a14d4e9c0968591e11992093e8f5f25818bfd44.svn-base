package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.StockTakeMissedArticlesResult;
import au.com.woolworths.portal.model.StockTakeVarianceResult;

@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeVarianceParam {

	@JsonProperty("reportResult")
	private ArrayList<StockTakeVarianceResult> reportResult;

	@JsonProperty("reportFor")
	private String reportFor;

	@JsonProperty("storeNo")
	private String storeNo;

	@JsonProperty("storeName")
	private String storeName;

	@JsonProperty("totalCount")
	private String totalCount;

	@JsonProperty("stockTakePrint")
	private String stockTakePrint;

	@JsonProperty("applyGroupby")
	private String applyGroupby;

	@JsonProperty("param")
	private StockTakeVarianceArticleParam param;

	private boolean reportNotGenerated;

	public ArrayList<StockTakeVarianceResult> getReportResult() {
		return reportResult;
	}

	public void setReportResult(ArrayList<StockTakeVarianceResult> reportResult) {
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

	public String getApplyGroupby() {
		return applyGroupby;
	}

	public void setApplyGroupby(String applyGroupby) {
		this.applyGroupby = applyGroupby;
	}

	public StockTakeVarianceArticleParam getParam() {
		return param;
	}

	public void setParam(StockTakeVarianceArticleParam param) {
		this.param = param;
	}

	public boolean isReportNotGenerated() {
		return reportNotGenerated;
	}

	public void setReportNotGenerated(boolean reportNotGenerated) {
		this.reportNotGenerated = reportNotGenerated;
	}

}