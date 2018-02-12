/**
 * 
 */
package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.UldSweepResult;

/**
 * @author xprnx
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class UldSweepParam {

	@JsonProperty("reportResult")
	private ArrayList<UldSweepResult> resultList;

	@JsonProperty("pcdId")
	private String pcdId;
	
	@JsonProperty("storeNo")
	private String storeNo;
	
	@JsonProperty("storeName")
	private String storeName;
	
	@JsonProperty("supplierNo")
	private String supplierNo;
	
	@JsonProperty("supplierName")
	private String supplierName;
	
	@JsonProperty("carrierNo")
	private String carrierNo;
	
	@JsonProperty("carrierName")
	private String carrierName;
	
	@JsonProperty("regoNo")
	private String regoNo;
	
	@JsonProperty("consignNo")
	private String consignNo;
	
	@JsonProperty("userId")
	private String userId;

	public String getCarrierNo() {
		return carrierNo;
	}

	public void setCarrierNo(String carrierNo) {
		this.carrierNo = carrierNo;
	}

	public String getCarrierName() {
		return carrierName;
	}

	public void setCarrierName(String carrierName) {
		this.carrierName = carrierName;
	}

	public ArrayList<UldSweepResult> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<UldSweepResult> resultList) {
		this.resultList = resultList;
	}

	public String getPcdId() {
		return pcdId;
	}

	public void setPcdId(String pcdId) {
		this.pcdId = pcdId;
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

	public String getSupplierNo() {
		return supplierNo;
	}

	public void setSupplierNo(String supplierNo) {
		this.supplierNo = supplierNo;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getRegoNo() {
		return regoNo;
	}

	public void setRegoNo(String regoNo) {
		this.regoNo = regoNo;
	}

	public String getConsignNo() {
		return consignNo;
	}

	public void setConsignNo(String consignNo) {
		this.consignNo = consignNo;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}
	
	
}