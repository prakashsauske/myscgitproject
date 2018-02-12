/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.DailyStockCheckReportResult;
import au.com.woolworths.portal.model.InventoryReportResult;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class DailyStockCheckReportParam {

	@JsonProperty("reportResult")
	private ArrayList<DailyStockCheckReportResult> resultList;

	@JsonProperty("dept")
	private String dept;

	@JsonProperty("StoreNo")
	private String StoreNo;

	@JsonProperty("StoreName")
	private String StoreName;	
	
	@JsonProperty("count")
	private String count;

	public ArrayList<DailyStockCheckReportResult> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<DailyStockCheckReportResult> resultList) {
		this.resultList = resultList;
	}

	public String getDept() {
		return dept;
	}

	public void setDept(String dept) {
		this.dept = dept;
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

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

}