package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonProperty;

public class AcceptanceNotePrintParam {

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

	@JsonProperty("dangerNotes")
	private String dangerNotes;

	@JsonProperty("requestType")
	private String requestType;

	@JsonProperty("attention")
	private String attention;

	@JsonProperty("disclaimerNotes1")
	private String disclaimerNotes1;

	@JsonProperty("disclaimerNotes2")
	private String disclaimerNotes2;

	@JsonProperty("disclaimerNotes3")
	private String disclaimerNotes3;

	@JsonProperty("disclaimerNotes4")
	private String disclaimerNotes4;

	@JsonProperty("disclaimerNotes5")
	private String disclaimerNotes5;
	
	@JsonProperty("disclaimerNotes6")
	private String disclaimerNotes6;

	@JsonProperty("comments")
	private String comments;

	@JsonProperty("storeName")
	private String storeName;

	@JsonProperty("storeStreet")
	private String storeStreet;

	@JsonProperty("storeCity")
	private String storeCity;

	@JsonProperty("storeContactNumber")
	private String storeContactNumber;

	@JsonProperty("repairAgentName")
	private String repairAgentName;

	@JsonProperty("repairAgentNo")
	private String repairAgentNo;

	@JsonProperty("repairAgentContactNumber")
	private String repairAgentContactNumber;

	@JsonProperty("serviceOrderNo")
	private String serviceOrderNo;

	@JsonProperty("purchaseDate")
	private String purchaseDate;

	@JsonProperty("customerName")
	private String customerName;

	@JsonProperty("custAdress")
	private String custAdress;
	
	@JsonProperty("custPostCode")
	private String custPostCode;

	@JsonProperty("articleDesc")
	private String articleDesc;

	@JsonProperty("article")
	private String article;

	@JsonProperty("contactNo")
	private String contactNo;

	@JsonProperty("faultDesc")
	private String faultDesc;

	@JsonProperty("email")
	private String email;

	@JsonProperty("service")
	private String service;

	@JsonProperty("amount")
	private String amount;

	@JsonProperty("resolutionDate")
	private String resolutionDate;

	@JsonProperty("articleQuantity")
	private String articleQuantity;

	@JsonProperty("createdDate")
	private String createdDate;

	@JsonProperty("claimNo")
	private String claimNo;

	@JsonProperty("cartonCount")
	private String cartonCount;

	@JsonProperty("repairAgentCity")
	private String repairAgentCity;

	@JsonProperty("repairAgentStreet")
	private String repairAgentStreet;

	@JsonProperty("imagePath")
	private String imagePath;

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

	public String getDangerNotes() {
		return dangerNotes;
	}

	public void setDangerNotes(String dangerNotes) {
		this.dangerNotes = dangerNotes;
	}

	public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getAttention() {
		return attention;
	}

	public void setAttention(String attention) {
		this.attention = attention;
	}

	public String getDisclaimerNotes1() {
		return disclaimerNotes1;
	}

	public void setDisclaimerNotes1(String disclaimerNotes1) {
		this.disclaimerNotes1 = disclaimerNotes1;
	}

	public String getDisclaimerNotes2() {
		return disclaimerNotes2;
	}

	public void setDisclaimerNotes2(String disclaimerNotes2) {
		this.disclaimerNotes2 = disclaimerNotes2;
	}

	public String getDisclaimerNotes3() {
		return disclaimerNotes3;
	}

	public void setDisclaimerNotes3(String disclaimerNotes3) {
		this.disclaimerNotes3 = disclaimerNotes3;
	}

	public String getDisclaimerNotes4() {
		return disclaimerNotes4;
	}

	public void setDisclaimerNotes4(String disclaimerNotes4) {
		this.disclaimerNotes4 = disclaimerNotes4;
	}

	public String getDisclaimerNotes5() {
		return disclaimerNotes5;
	}

	public void setDisclaimerNotes5(String disclaimerNotes5) {
		this.disclaimerNotes5 = disclaimerNotes5;
	}

	public String getComments() {
		return comments;
	}

	public void setComments(String comments) {
		this.comments = comments;
	}

	public String getClaimNo() {
		return claimNo;
	}

	public void setClaimNo(String claimNo) {
		this.claimNo = claimNo;
	}

	public String getCartonCount() {
		return cartonCount;
	}

	public void setCartonCount(String cartonCount) {
		this.cartonCount = cartonCount;
	}

	public String getImagePath() {
		return imagePath;
	}

	public void setImagePath(String imagePath) {
		this.imagePath = imagePath;
	}

	public String getRepairAgentCity() {
		return repairAgentCity;
	}

	public void setRepairAgentCity(String repairAgentCity) {
		this.repairAgentCity = repairAgentCity;
	}

	public String getRepairAgentStreet() {
		return repairAgentStreet;
	}

	public void setRepairAgentStreet(String repairAgentStreet) {
		this.repairAgentStreet = repairAgentStreet;
	}

	public String getArticleQuantity() {
		return articleQuantity;
	}

	public void setArticleQuantity(String articleQuantity) {
		this.articleQuantity = articleQuantity;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getStoreName() {
		return storeName;
	}

	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getStoreStreet() {
		return storeStreet;
	}

	public void setStoreStreet(String storeStreet) {
		this.storeStreet = storeStreet;
	}

	public String getStoreCity() {
		return storeCity;
	}

	public void setStoreCity(String storeCity) {
		this.storeCity = storeCity;
	}

	public String getStoreContactNumber() {
		return storeContactNumber;
	}

	public void setStoreContactNumber(String storeContactNumber) {
		this.storeContactNumber = storeContactNumber;
	}

	public String getRepairAgentContactNumber() {
		return repairAgentContactNumber;
	}

	public void setRepairAgentContactNumber(String repairAgentContactNumber) {
		this.repairAgentContactNumber = repairAgentContactNumber;
	}

	public String getServiceOrderNo() {
		return serviceOrderNo;
	}

	public void setServiceOrderNo(String serviceOrderNo) {
		this.serviceOrderNo = serviceOrderNo;
	}

	public String getPurchaseDate() {
		return purchaseDate;
	}

	public void setPurchaseDate(String purchaseDate) {
		this.purchaseDate = purchaseDate;
	}

	public String getCustomerName() {
		return customerName;
	}

	public void setCustomerName(String customerName) {
		this.customerName = customerName;
	}

	public String getCustAdress() {
		return custAdress;
	}

	public void setCustAdress(String custAdress) {
		this.custAdress = custAdress;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getContactNo() {
		return contactNo;
	}

	public void setContactNo(String contactNo) {
		this.contactNo = contactNo;
	}

	public String getFaultDesc() {
		return faultDesc;
	}

	public void setFaultDesc(String faultDesc) {
		this.faultDesc = faultDesc;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getService() {
		return service;
	}

	public void setService(String service) {
		this.service = service;
	}

	public String getAmount() {
		return amount;
	}

	public void setAmount(String amount) {
		this.amount = amount;
	}

	public String getResolutionDate() {
		return resolutionDate;
	}

	public void setResolutionDate(String resolutionDate) {
		this.resolutionDate = resolutionDate;
	}

	public String getRepairAgentName() {
		return repairAgentName;
	}

	public void setRepairAgentName(String repairAgentName) {
		this.repairAgentName = repairAgentName;
	}

	public String getRepairAgentNo() {
		return repairAgentNo;
	}

	public void setRepairAgentNo(String repairAgentNo) {
		this.repairAgentNo = repairAgentNo;
	}

	public String getCustPostCode() {
		return custPostCode;
	}

	public void setCustPostCode(String custPostCode) {
		this.custPostCode = custPostCode;
	}

	public String getDisclaimerNotes6() {
		return disclaimerNotes6;
	}

	public void setDisclaimerNotes6(String disclaimerNotes6) {
		this.disclaimerNotes6 = disclaimerNotes6;
	}

}
