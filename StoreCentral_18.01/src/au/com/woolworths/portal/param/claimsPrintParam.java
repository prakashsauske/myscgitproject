package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.ClaimsPrintResult;

/**
 * @author xprnx
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class claimsPrintParam {

	@JsonProperty("reportResult")
	private ArrayList<ClaimsPrintResult> resultList;

	@JsonProperty("toVendorName")
	private String toVendorName;
	
	@JsonProperty("toVendorStreetName")
	private String toVendorStreetName;
	
	@JsonProperty("toVendorStrName2")
	private String toVendorStrName2;
	
	@JsonProperty("fromStoreName")
	private String fromStoreName;
	
	@JsonProperty("fromStreetName")
	private String fromStreetName;
	
	@JsonProperty("fromStreetName2")
	private String fromStreetName2;
	
	@JsonProperty("vendorContactNum")
	private String vendorContactNum;
	
	@JsonProperty("vendorFaxNum")
	private String vendorFaxNum;
	
	@JsonProperty("contactNumber")
	private String contactNumber;
	
	@JsonProperty("imagePath")
	private String imagePath;
	
	@JsonProperty("claimNo")
	private String claimNo;
	
	@JsonProperty("claimDate")
	private String claimDate;
		
	@JsonProperty("claimReason")
	private String claimReason;
	
	@JsonProperty("supplier")
	private String supplier;
	
	@JsonProperty("supplierName")
	private String supplierName;
	
	@JsonProperty("supplierStreet")
	private String supplierStreet;
	
	@JsonProperty("supplierCity")
	private String supplierCity;
	
	@JsonProperty("supplierPhone")
	private String supplierPhone;
	
	@JsonProperty("fromSite")
	private String fromSite;
	
	@JsonProperty("fromSiteStreet")
	private String fromSiteStreet;
	
	@JsonProperty("fromSiteCity")
	private String fromSiteCity;
	
	@JsonProperty("fromSitePhone")
	private String fromSitePhone;
	
	@JsonProperty("createdBy")
	private String createdBy;
	
	@JsonProperty("carrierName")
	private String carrierName;
	
	@JsonProperty("vehicleRego")
	private String vehicleRego;
	
	@JsonProperty("consignNo")
	private String consignNo;
	
	@JsonProperty("attention")
	private String attention;
	
	@JsonProperty("cartonCount")
	private String cartonCount;
	
	@JsonProperty("authorityNo")
	private String authorityNo;	
	
	@JsonProperty("dangerNotes")
	private String dangerNotes;	
	
	@JsonProperty("status")
	private String status;
	
	@JsonProperty("finalisedBy")
	private String finalisedBy;
	
	@JsonProperty("finalisedDate")
	private String finalisedDate;
	
	@JsonProperty("cancelledBy")
	private String cancelledBy;
	
	@JsonProperty("cancelledDate")
	private String cancelledDate;

	public String getCarrierName() {
		return carrierName;
	}

	public void setCarrierName(String carrierName) {
		this.carrierName = carrierName;
	}

	public String getVehicleRego() {
		return vehicleRego;
	}

	public void setVehicleRego(String vehicleRego) {
		this.vehicleRego = vehicleRego;
	}

	public String getConsignNo() {
		return consignNo;
	}

	public void setConsignNo(String consignNo) {
		this.consignNo = consignNo;
	}
	
	public String getAttention() {
		return attention;
	}

	public void setAttention(String attention) {
		this.attention = attention;
	}

	public String getCartonCount() {
		return cartonCount;
	}

	public void setCartonCount(String cartonCount) {
		this.cartonCount = cartonCount;
	}

	public String getAuthorityNo() {
		return authorityNo;
	}

	public void setAuthorityNo(String authorityNo) {
		this.authorityNo = authorityNo;
	}

	public String getVendorFaxNum() {
		return vendorFaxNum;
	}

	public void setVendorFaxNum(String vendorFaxNum) {
		this.vendorFaxNum = vendorFaxNum;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getFromSite() {
		return fromSite;
	}

	public void setFromSite(String fromSite) {
		this.fromSite = fromSite;
	}

	public String getFromSiteStreet() {
		return fromSiteStreet;
	}

	public void setFromSiteStreet(String fromSiteStreet) {
		this.fromSiteStreet = fromSiteStreet;
	}

	public String getFromSiteCity() {
		return fromSiteCity;
	}

	public void setFromSiteCity(String fromSiteCity) {
		this.fromSiteCity = fromSiteCity;
	}

	public String getFromSitePhone() {
		return fromSitePhone;
	}

	public void setFromSitePhone(String fromSitePhone) {
		this.fromSitePhone = fromSitePhone;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getSupplierName() {
		return supplierName;
	}

	public void setSupplierName(String supplierName) {
		this.supplierName = supplierName;
	}

	public String getSupplierStreet() {
		return supplierStreet;
	}

	public void setSupplierStreet(String supplierStreet) {
		this.supplierStreet = supplierStreet;
	}

	public String getSupplierCity() {
		return supplierCity;
	}

	public void setSupplierCity(String supplierCity) {
		this.supplierCity = supplierCity;
	}

	public String getSupplierPhone() {
		return supplierPhone;
	}

	public void setSupplierPhone(String supplierPhone) {
		this.supplierPhone = supplierPhone;
	}

	public String getClaimNo() {
		return claimNo;
	}

	public void setClaimNo(String claimNo) {
		this.claimNo = claimNo;
	}

	public String getClaimDate() {
		return claimDate;
	}

	public void setClaimDate(String claimDate) {
		this.claimDate = claimDate;
	}

	public String getClaimReason() {
		return claimReason;
	}

	public void setClaimReason(String claimReason) {
		this.claimReason = claimReason;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public ArrayList<ClaimsPrintResult> getResultList() {
		return resultList;
	}

	public void setResultList(ArrayList<ClaimsPrintResult> resultList) {
		this.resultList = resultList;
	}

	public String getToVendorName() {
		return toVendorName;
	}

	public void setToVendorName(String toVendorName) {
		this.toVendorName = toVendorName;
	}

	public String getToVendorStreetName() {
		return toVendorStreetName;
	}

	public void setToVendorStreetName(String toVendorStreetName) {
		this.toVendorStreetName = toVendorStreetName;
	}

	public String getToVendorStrName2() {
		return toVendorStrName2;
	}

	public void setToVendorStrName2(String toVendorStrName2) {
		this.toVendorStrName2 = toVendorStrName2;
	}

	public String getFromStoreName() {
		return fromStoreName;
	}

	public void setFromStoreName(String fromStoreName) {
		this.fromStoreName = fromStoreName;
	}

	public String getFromStreetName() {
		return fromStreetName;
	}

	public void setFromStreetName(String fromStreetName) {
		this.fromStreetName = fromStreetName;
	}

	public String getFromStreetName2() {
		return fromStreetName2;
	}

	public void setFromStreetName2(String fromStreetName2) {
		this.fromStreetName2 = fromStreetName2;
	}

	public String getVendorContactNum() {
		return vendorContactNum;
	}

	public void setVendorContactNum(String vendorContactNum) {
		this.vendorContactNum = vendorContactNum;
	}

	public String getContactNumber() {
		return contactNumber;
	}

	public void setContactNumber(String contactNumber) {
		this.contactNumber = contactNumber;
	}

	public String getDangerNotes() {
		return dangerNotes;
	}

	public void setDangerNotes(String dangerNotes) {
		this.dangerNotes = dangerNotes;
	}

	public String getStatus() {
		return status;
	}

	public void setStatus(String status) {
		this.status = status;
	}

	public String getFinalisedBy() {
		return finalisedBy;
	}

	public void setFinalisedBy(String finalisedBy) {
		this.finalisedBy = finalisedBy;
	}

	public String getFinalisedDate() {
		return finalisedDate;
	}

	public void setFinalisedDate(String finalisedDate) {
		this.finalisedDate = finalisedDate;
	}

	public String getCancelledDate() {
		return cancelledDate;
	}

	public void setCancelledDate(String cancelledDate) {
		this.cancelledDate = cancelledDate;
	}

	public String getCancelledBy() {
		return cancelledBy;
	}

	public void setCancelledBy(String cancelledBy) {
		this.cancelledBy = cancelledBy;
	}
	
	
	
}

