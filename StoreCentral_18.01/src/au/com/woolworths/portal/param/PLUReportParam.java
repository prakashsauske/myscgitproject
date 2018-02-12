package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.PLUReportResult;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PLUReportParam {
	@JsonProperty("reportResult")
	private ArrayList<PLUReportResult> reportResult;
	
	@JsonProperty("reportFor")
	private String reportFor;	
	
	@JsonProperty("storeNo")
	private String storeNo;	
	
	@JsonProperty("storeName")
	private String storeName; 
	
	@JsonProperty("totalCount")
	private String totalCount;
	
	public ArrayList<PLUReportResult> getReportResult() {
		return reportResult;
	}
	public void setReportResult(ArrayList<PLUReportResult> reportResult) {
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
	
	

}
