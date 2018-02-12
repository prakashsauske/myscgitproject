/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.GapScanResult;

/**
 * @author xmrah
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GapScanParam {

	@JsonProperty("actionReqList")
	private ArrayList<GapScanResult> actionReqList;

	@JsonProperty("revOnlyList")
	private ArrayList<GapScanResult> revOnlyList;

	@JsonProperty("reason_type")
	private String reason_type;

	@JsonProperty("report_date")
	private String report_date;

	@JsonProperty("report_time")
	private String report_time;

	@JsonProperty("dept")
	private String dept;

	@JsonProperty("employee")
	private String employee;

	@JsonProperty("StoreNo")
	private String StoreNo;

	@JsonProperty("StoreName")
	private String StoreName;

	/**
	 * @return the actionReqList
	 */
	public ArrayList<GapScanResult> getActionReqList() {
		return actionReqList;
	}

	/**
	 * @param actionReqList
	 *            the actionReqList to set
	 */
	public void setActionReqList(ArrayList<GapScanResult> actionReqList) {
		this.actionReqList = actionReqList;
	}

	/**
	 * @return the revOnlyList
	 */
	public ArrayList<GapScanResult> getRevOnlyList() {
		return revOnlyList;
	}

	/**
	 * @param revOnlyList
	 *            the revOnlyList to set
	 */
	public void setRevOnlyList(ArrayList<GapScanResult> revOnlyList) {
		this.revOnlyList = revOnlyList;
	}

	/**
	 * @return the reason_type
	 */
	public String getReason_type() {
		return reason_type;
	}

	/**
	 * @param reason_type
	 *            the reason_type to set
	 */
	public void setReason_type(String reason_type) {
		this.reason_type = reason_type;
	}

	/**
	 * @return the report_date
	 */
	public String getReport_date() {
		return report_date;
	}

	/**
	 * @param report_date
	 *            the report_date to set
	 */
	public void setReport_date(String report_date) {
		this.report_date = report_date;
	}

	/**
	 * @return the report_time
	 */
	public String getReport_time() {
		return report_time;
	}

	/**
	 * @param report_time
	 *            the report_time to set
	 */
	public void setReport_time(String report_time) {
		this.report_time = report_time;
	}

	/**
	 * @return the storeNo
	 */
	public String getStoreNo() {
		return StoreNo;
	}

	/**
	 * @param storeNo
	 *            the storeNo to set
	 */
	public void setStoreNo(String storeNo) {
		StoreNo = storeNo;
	}

	/**
	 * @return the storeName
	 */
	public String getStoreName() {
		return StoreName;
	}

	/**
	 * @param storeName
	 *            the storeName to set
	 */
	public void setStoreName(String storeName) {
		StoreName = storeName;
	}

	/**
	 * @return the dept
	 */
	public String getDept() {
		return dept;
	}

	/**
	 * @param dept the dept to set
	 */
	public void setDept(String dept) {
		this.dept = dept;
	}

	/**
	 * @return the employee
	 */
	public String getEmployee() {
		return employee;
	}

	/**
	 * @param employee the employee to set
	 */
	public void setEmployee(String employee) {
		this.employee = employee;
	}

}