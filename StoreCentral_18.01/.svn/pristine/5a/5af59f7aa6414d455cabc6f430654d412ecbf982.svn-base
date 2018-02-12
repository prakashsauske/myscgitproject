/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.OOCReportResult;
import au.com.woolworths.portal.model.OutofCodeResult;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OOCReportParam {

	@JsonProperty("reportResult")
	private ArrayList<OutofCodeResult> resultList;

	@JsonProperty("reportFor")
	private String reportFor;

	@JsonProperty("StoreNo")
	private String StoreNo;

	@JsonProperty("StoreName")
	private String StoreName;	
	
	@JsonProperty("dateFrom")
	private String dateFrom;
	
	@JsonProperty("dateTo")
	private String dateTo;
	
	
	@JsonProperty("deptNo")
	private String deptNo;
	
	@JsonProperty("catNo")
	private String catNo;
	
	@JsonProperty("subCatNo")
	private String subCatNo;
	
	@JsonProperty("segment")
	private String segment;
	
	
	@JsonProperty("nodelevel")
	private String nodelevel;
	
	

	public ArrayList<OutofCodeResult> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<OutofCodeResult> resultList) {
		this.resultList = resultList;
	}

	
	
	/**
	 * @return the catNo
	 */
	public String getCatNo() {
		return (catNo != null ? catNo : "");
	}

	/**
	 * @param catNo the catNo to set
	 */
	public void setCatNo(String catNo) {
		this.catNo = catNo;
	}

	/**
	 * @return the subCatNo
	 */
	public String getSubCatNo() {
		return (subCatNo != null ? subCatNo : "");
	}

	/**
	 * @param subCatNo the subCatNo to set
	 */
	public void setSubCatNo(String subCatNo) {
		this.subCatNo = subCatNo;
	}

	/**
	 * @return the segment
	 */
	public String getSegment() {
		return (segment != null ? segment : "");
	}

	/**
	 * @param segment the segment to set
	 */
	public void setSegment(String segment) {
		this.segment = segment;
	}

	/**
	 * @return the nodelevel
	 */
	public String getNodelevel() {
		return nodelevel;
	}

	/**
	 * @param nodelevel the nodelevel to set
	 */
	public void setNodelevel(String nodelevel) {
		this.nodelevel = nodelevel;
	}

	/**
	 * @return the deptNo
	 */
	public String getDeptNo() {
		return (deptNo != null ? deptNo : "");
	}

	/**
	 * @param deptNo the deptNo to set
	 */
	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}

	public String getReportFor() {
		return reportFor;
	}

	public void setReportFor(String reportFor) {
		this.reportFor = reportFor;
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

	public String getDateFrom() {
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getDateTo() {
		return dateTo;
	}

	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}

}