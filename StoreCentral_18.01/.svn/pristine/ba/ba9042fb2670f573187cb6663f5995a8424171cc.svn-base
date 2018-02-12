package au.com.woolworths.portal.param;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.InStorePromoArticleISDInfo;
import au.com.woolworths.portal.model.InstorePromotionModel;
import au.com.woolworths.portal.model.InStorePromoArticleInfo;
import au.com.woolworths.portal.model.InstorePromoItems;
import au.com.woolworths.portal.model.PromoArticle;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InStorePromoParam {

	@JsonProperty("promoArticle")
	private PromoArticle promoArticle;

	@JsonProperty("msg")
	private String msg;// Message field
	
	@JsonProperty("STATUS")
	private String status;// Message field

	/**
	 * @return the status
	 */
	public String getStatus() {
		return status;
	}

	/**
	 * @param status the status to set
	 */
	public void setStatus(String status) {
		this.status = status;
	}

	@JsonProperty("siteNo")
	private String siteNo; // site number mandatory field, passed from the
							// screen

	@JsonProperty("salesOrg")
	private String salesOrg; // sales organisation number mandatory field,
								// passed from the screen

	@JsonProperty("username")
	private String username; // username mandatory field, passed from the screen

	@JsonProperty("sapPassword")
	private String sapPassword; // sap password mandatory field, passed from the
								// screen for making Sap call

	@JsonProperty("instorePromoType")
	private String instorePromoType; // mandatory field, promotion type of the
										// instore passed
										// from the screen

	@JsonProperty("serviceConfig")
	private String serviceConfig; // mandatory field, promotion type of the
									// instore passed
									// from the screen
	@JsonProperty("hierarchyInfoFlag")
	private String hierarchyInfoFlag; // if this field set to Y than all the
										// items will have hierarchy info

	@JsonProperty("omInfoFlag")
	private String omInfoFlag; // if this field set to Y than all the items will
								// have order multiple info

	@JsonProperty("autoStockRFlag")
	private String autoStockRFlag; // if this field set to Y than all the items
									// will autostockR info

	@JsonProperty("ifPromoExistFlag")
	private String ifPromoExistFlag; // if this field set to Y than all the
										// items
										// will autostockR info

	@JsonProperty("ifPromoExistFlagStatus")
	private String ifPromoExistFlagStatus; // if this field set to Y than all
											// the items
											// will autostockR info

	@JsonProperty("inStorePromoArticleInf")
	private String inStorePromoArticleInf;

	@JsonProperty("inStorePromoArticleInfoList")
	private ArrayList<InStorePromoArticleInfo> inStorePromoArticleInfoList; // promotion

	@JsonProperty("iSDvalidArticleList")
	private ArrayList<InStorePromoArticleISDInfo> iSDvalidArticleList;
	
	
	@JsonProperty("iSDInvalidArticleList")
	private ArrayList<InStorePromoArticleISDInfo> iSDInvalidArticleList;	
	

	public ArrayList<InStorePromoArticleISDInfo> getiSDvalidArticleList() {
		return iSDvalidArticleList;
	}

	public void setiSDvalidArticleList(
			ArrayList<InStorePromoArticleISDInfo> iSDvalidArticleList) {
		this.iSDvalidArticleList = iSDvalidArticleList;
	}

	public ArrayList<InStorePromoArticleISDInfo> getiSDInvalidArticleList() {
		return iSDInvalidArticleList;
	}

	public void setiSDInvalidArticleList(
			ArrayList<InStorePromoArticleISDInfo> iSDInvalidArticleList) {
		this.iSDInvalidArticleList = iSDInvalidArticleList;
	}

	@JsonProperty("promoTypeInPast")
	private String promoTypeInPast;

	/**
	 * 
	 * 
	 * @return the ifPromoExistFlag
	 */
	public String getIfPromoExistFlag() {
		return ifPromoExistFlag;
	}

	/**
	 * @param ifPromoExistFlag
	 *            the ifPromoExistFlag to set
	 */
	public void setIfPromoExistFlag(String ifPromoExistFlag) {
		this.ifPromoExistFlag = ifPromoExistFlag;
	}

	/**
	 * @return the ifPromoExistFlagStatus
	 */
	public String getIfPromoExistFlagStatus() {
		return ifPromoExistFlagStatus;
	}

	/**
	 * @param ifPromoExistFlagStatus
	 *            the ifPromoExistFlagStatus to set
	 */
	public void setIfPromoExistFlagStatus(String ifPromoExistFlagStatus) {
		this.ifPromoExistFlagStatus = ifPromoExistFlagStatus;
	}

	// articles
	// for
	// which
	// we
	// have
	// to
	// create
	// promoition
	// passed
	// from
	// the
	// screen
	@JsonProperty("instorePromoItemsList")
	private ArrayList<InstorePromoItems> instorePromoItemsList; // used for SAP
																// promo
																// creation

	@JsonProperty("instorePromoSearchRes")
	private ArrayList<InstorePromotionModel> instorePromoSearchRes; // used for
																	// SAP
	// promo
	// search

	@JsonProperty("newPrice")
	private String newPrice;

	@JsonProperty("limitQty")
	private String limitQty;

	@JsonProperty("dateFrom")
	private String dateFrom;

	@JsonProperty("dateTo")
	private String dateTo;

	@JsonProperty("createdBy")
	private String createdBy;

	@JsonProperty("department")
	private String department;

	@JsonProperty("article")
	private String article;

	@JsonProperty("articleDesc")
	private String articleDesc;

	@JsonProperty("gtin")
	private String gtin;

	@JsonProperty("records")
	private String records;

	@JsonProperty("pageNo")
	private String pageNo;
	
	@JsonProperty("reason")
	private String reason;

	private String searchByOptions;
	
	@JsonProperty("inStorePromoArticleInfoISDList")
	private ArrayList<InStorePromoArticleISDInfo> inStorePromoArticleInfoISDList;

	/**
	 * @return the searchByOptions
	 */
	public String getSearchByOptions() {
		return searchByOptions;
	}

	/**
	 * @param searchByOptions
	 *            the searchByOptions to set
	 */
	public void setSearchByOptions(String searchByOptions) {
		this.searchByOptions = searchByOptions;
	}

	/**
	 * @return the instorePromoItemsList
	 */
	public ArrayList<InstorePromoItems> getInstorePromoItemsList() {
		return instorePromoItemsList;
	}

	/**
	 * @param instorePromoItemsList
	 *            the instorePromoItemsList to set
	 */
	public void setInstorePromoItemsList(
			ArrayList<InstorePromoItems> instorePromoItemsList) {
		this.instorePromoItemsList = instorePromoItemsList;
	}

	/**
	 * @return the siteNo
	 */
	public String getSiteNo() {
		return siteNo;
	}

	/**
	 * @return the omInfoFlag
	 */
	public String getOmInfoFlag() {
		return omInfoFlag;
	}

	/**
	 * @param omInfoFlag
	 *            the omInfoFlag to set
	 */
	public void setOmInfoFlag(String omInfoFlag) {
		this.omInfoFlag = omInfoFlag;
	}

	/**
	 * @return the autoStockRFlag
	 */
	public String getAutoStockRFlag() {
		return autoStockRFlag;
	}

	/**
	 * @param autoStockRFlag
	 *            the autoStockRFlag to set
	 */
	public void setAutoStockRFlag(String autoStockRFlag) {
		this.autoStockRFlag = autoStockRFlag;
	}

	/**
	 * @param siteNo
	 *            the siteNo to set
	 */
	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	/**
	 * @return the salesOrg
	 */
	public String getSalesOrg() {
		return salesOrg;
	}

	/**
	 * @param salesOrg
	 *            the salesOrg to set
	 */
	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username
	 *            the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the sapPassword
	 */
	public String getSapPassword() {
		return sapPassword;
	}

	/**
	 * @param sapPassword
	 *            the sapPassword to set
	 */
	public void setSapPassword(String sapPassword) {
		this.sapPassword = sapPassword;
	}

	/**
	 * @return the instorePromoType
	 */
	public String getInstorePromoType() {
		return instorePromoType;
	}

	/**
	 * @param instorePromoType
	 *            the instorePromoType to set
	 */
	public void setInstorePromoType(String instorePromoType) {
		this.instorePromoType = instorePromoType;
	}

	/**
	 * @return the serviceConfig
	 */
	public String getServiceConfig() {
		return serviceConfig;
	}

	/**
	 * @param serviceConfig
	 *            the serviceConfig to set
	 */
	public void setServiceConfig(String serviceConfig) {
		this.serviceConfig = serviceConfig;
	}

	/**
	 * @return the inStorePromoArticleInfoList
	 */
	public ArrayList<InStorePromoArticleInfo> getInStorePromoArticleInfoList() {
		return inStorePromoArticleInfoList;
	}

	/**
	 * @param inStorePromoArticleInfoList
	 *            the inStorePromoArticleInfoList to set
	 */

	public void setInStorePromoArticleInfoList(
			ArrayList<InStorePromoArticleInfo> inStorePromoArticleInfoList) {
		this.inStorePromoArticleInfoList = inStorePromoArticleInfoList;
	}

	/**
	 * @return the hierarchyInfoFlag
	 */
	public String getHierarchyInfoFlag() {
		return hierarchyInfoFlag;
	}

	/**
	 * @param hierarchyInfoFlag
	 *            the hierarchyInfoFlag to set
	 */
	public void setHierarchyInfoFlag(String hierarchyInfoFlag) {
		this.hierarchyInfoFlag = hierarchyInfoFlag;
	}

	public InStorePromoParam(String siteNo, String salesOrg, String username,
			String sapPassword, String instorePromoType, String serviceConfig,
			ArrayList<InStorePromoArticleInfo> inStorePromoArticleInfoList) {
		super();
		this.siteNo = siteNo;
		this.salesOrg = salesOrg;
		this.username = username;
		this.sapPassword = sapPassword;
		this.instorePromoType = instorePromoType;
		this.serviceConfig = serviceConfig;
		this.inStorePromoArticleInfoList = inStorePromoArticleInfoList;
	}

	public InStorePromoParam() {

	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the dateFrom
	 */
	public String getDateFrom() {
		return dateFrom;
	}

	/**
	 * @param dateFrom
	 *            the dateFrom to set
	 */
	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	/**
	 * @return the dateTo
	 */
	public String getDateTo() {
		return dateTo;
	}

	/**
	 * @param dateTo
	 *            the dateTo to set
	 */
	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}

	/**
	 * @return the createdBy
	 */
	public String getCreatedBy() {
		return createdBy;
	}

	/**
	 * @param createdBy
	 *            the createdBy to set
	 */
	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department
	 *            the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	/**
	 * @return the article
	 */
	public String getArticle() {
		return article;
	}

	/**
	 * @param article
	 *            the article to set
	 */
	public void setArticle(String article) {
		this.article = article;
	}

	/**
	 * @return the articleDesc
	 */
	public String getArticleDesc() {
		return articleDesc;
	}

	/**
	 * @param articleDesc
	 *            the articleDesc to set
	 */
	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	/**
	 * @return the gtin
	 */
	public String getGtin() {
		return gtin;
	}

	/**
	 * @param gtin
	 *            the gtin to set
	 */
	public void setGtin(String gtin) {
		this.gtin = gtin;
	}

	/**
	 * @return the records
	 */
	public String getRecords() {
		return records;
	}

	/**
	 * @param records
	 *            the records to set
	 */
	public void setRecords(String records) {
		this.records = records;
	}

	/**
	 * @return the pageNo
	 */
	public String getPageNo() {
		return pageNo;
	}

	/**
	 * @param pageNo
	 *            the pageNo to set
	 */
	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	/**
	 * @return the newPrice
	 */
	public String getNewPrice() {
		return newPrice;
	}

	/**
	 * @param newPrice
	 *            the newPrice to set
	 */
	public void setNewPrice(String newPrice) {
		this.newPrice = newPrice;
	}

	/**
	 * @return the limitQty
	 */
	public String getLimitQty() {
		return limitQty;
	}

	/**
	 * @param limitQty
	 *            the limitQty to set
	 */
	public void setLimitQty(String limitQty) {
		this.limitQty = limitQty;
	}

	/**
	 * @return the instorePromoSearchRes
	 */
	public ArrayList<InstorePromotionModel> getInstorePromoSearchRes() {
		return instorePromoSearchRes;
	}

	/**
	 * @param instorePromoSearchRes
	 *            the instorePromoSearchRes to set
	 */
	public void setInstorePromoSearchRes(
			ArrayList<InstorePromotionModel> instorePromoSearchRes) {
		this.instorePromoSearchRes = instorePromoSearchRes;
	}

	public PromoArticle getPromoArticle() {
		return promoArticle;
	}

	public void setPromoArticle(PromoArticle promoArticle) {
		this.promoArticle = promoArticle;
	}

	public String getInStorePromoArticleInf() {
		return inStorePromoArticleInf;
	}

	public void setInStorePromoArticleInf(String inStorePromoArticleInf) {
		this.inStorePromoArticleInf = inStorePromoArticleInf;
	}

	/**
	 * @return the promoTypeInPast
	 */
	public String getPromoTypeInPast() {
		return promoTypeInPast;
	}

	/**
	 * @param promoTypeInPast the promoTypeInPast to set
	 */
	public void setPromoTypeInPast(String promoTypeInPast) {
		this.promoTypeInPast = promoTypeInPast;
	}

	/**
	 * @return the reason
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * @param reason the reason to set
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}

	/**
	 * @return the inStorePromoArticleInfoISDList
	 */
	public ArrayList<InStorePromoArticleISDInfo> getInStorePromoArticleInfoISDList() {
		return inStorePromoArticleInfoISDList;
	}

	/**
	 * @param inStorePromoArticleInfoISDList the inStorePromoArticleInfoISDList to set
	 */
	public void setInStorePromoArticleInfoISDList(
			ArrayList<InStorePromoArticleISDInfo> inStorePromoArticleInfoISDList) {
		this.inStorePromoArticleInfoISDList = inStorePromoArticleInfoISDList;
	}
	

}
