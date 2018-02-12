package au.com.woolworths.portal.param;

import java.util.ArrayList;
import java.util.Map;

public class AllocationOrderSearchParam {

	private String type;
	private String orderNo;
	private String articleNo;
	private String orderStatus;
	private String msg;

	private String orderType;

	private String fromDate;
	private String rosterToDate;
	private String rosterFromDate;

	private String searchByOptions;
	private Integer pageNo;
	private Integer recordCount;

	private String toDate;
	private String storeOrVendor;
	private String wareHouseFlag;

	private String siteNo;

	private String suppNo;
	
	private String vnSuppNo;

	private String suppName;

	private String sourceSupply;

	private String rosterDate;
	private String paramRetain;
	private String reconFlag;
	private String openFlag;
	private String index;
	private String ibtFlag;
	private String storeOrderFlag;

	private String unselectedVal;

	private String invoiceInfo;
	private String grInfo;
	private String itemInfo;
	private String deliveryInfo;

	private String grNo;
	private String year;
	
	private ArrayList<String> articleList;
	private Map<String, String>  articlesAllocationFlagMap;
	private String tradingDept;

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

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	/**
	 * @return the type
	 */
	public String getType() {
		return type;
	}

	/**
	 * @param type
	 *            the type to set
	 */
	public void setType(String type) {
		this.type = type;
	}

	/**
	 * @return the orderNo
	 */
	public String getOrderNo() {
		if(this.orderNo!=null && !this.orderNo.equals("")){
			return this.orderNo.toUpperCase();
		}
		return orderNo;
	}

	/**
	 * @param orderNo
	 *            the orderNo to set
	 */
	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	/**
	 * @return the articleNo
	 */
	public String getArticleNo() {
		return articleNo;
	}

	/**
	 * @param articleNo
	 *            the articleNo to set
	 */
	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	/**
	 * @return the orderStatus
	 */
	public String getOrderStatus() {
		return orderStatus;
	}

	/**
	 * @param orderStatus
	 *            the orderStatus to set
	 */
	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	/**
	 * @return the orderType
	 */
	public String getOrderType() {
		return orderType;
	}

	/**
	 * @param orderType
	 *            the orderType to set
	 */
	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	/**
	 * @return the fromDate
	 */
	public String getFromDate() {
		return fromDate;
	}

	/**
	 * @param fromDate
	 *            the fromDate to set
	 */
	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	/**
	 * @return the rosterToDate
	 */
	public String getRosterToDate() {
		return rosterToDate;
	}

	/**
	 * @param rosterToDate
	 *            the rosterToDate to set
	 */
	public void setRosterToDate(String rosterToDate) {
		this.rosterToDate = rosterToDate;
	}

	/**
	 * @return the rosterFromDate
	 */
	public String getRosterFromDate() {
		return rosterFromDate;
	}

	/**
	 * @param rosterFromDate
	 *            the rosterFromDate to set
	 */
	public void setRosterFromDate(String rosterFromDate) {
		this.rosterFromDate = rosterFromDate;
	}

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
	 * @return the pageNo
	 */
	public Integer getPageNo() {
		return pageNo;
	}

	/**
	 * @param pageNo
	 *            the pageNo to set
	 */
	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	/**
	 * @return the recordCount
	 */
	public Integer getRecordCount() {
		return recordCount;
	}

	/**
	 * @param recordCount
	 *            the recordCount to set
	 */
	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}

	/**
	 * @return the toDate
	 */
	public String getToDate() {
		return toDate;
	}

	/**
	 * @param toDate
	 *            the toDate to set
	 */
	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	/**
	 * @return the storeOrVendor
	 */
	public String getStoreOrVendor() {
		return storeOrVendor;
	}

	/**
	 * @param storeOrVendor
	 *            the storeOrVendor to set
	 */
	public void setStoreOrVendor(String storeOrVendor) {
		this.storeOrVendor = storeOrVendor;
	}

	/**
	 * @return the wareHouseFlag
	 */
	public String getWareHouseFlag() {
		return wareHouseFlag;
	}

	/**
	 * @param wareHouseFlag
	 *            the wareHouseFlag to set
	 */
	public void setWareHouseFlag(String wareHouseFlag) {
		this.wareHouseFlag = wareHouseFlag;
	}

	/**
	 * @return the suppNo
	 */
	public String getSuppNo() {
		return suppNo;
	}

	/**
	 * @param suppNo
	 *            the suppNo to set
	 */
	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	/**
	 * @return the suppName
	 */
	public String getSuppName() {
		return suppName;
	}

	/**
	 * @param suppName
	 *            the suppName to set
	 */
	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	/**
	 * @return the sourceSupply
	 */
	public String getSourceSupply() {
		return sourceSupply;
	}

	/**
	 * @param sourceSupply
	 *            the sourceSupply to set
	 */
	public void setSourceSupply(String sourceSupply) {
		this.sourceSupply = sourceSupply;
	}

	/**
	 * @return the rosterDate
	 */
	public String getRosterDate() {
		return rosterDate;
	}

	/**
	 * @param rosterDate
	 *            the rosterDate to set
	 */
	public void setRosterDate(String rosterDate) {
		this.rosterDate = rosterDate;
	}

	/**
	 * @return the paramRetain
	 */
	public String getParamRetain() {
		return paramRetain;
	}

	/**
	 * @param paramRetain
	 *            the paramRetain to set
	 */
	public void setParamRetain(String paramRetain) {
		this.paramRetain = paramRetain;
	}

	/**
	 * @return the reconFlag
	 */
	public String getReconFlag() {
		return reconFlag;
	}

	/**
	 * @param reconFlag
	 *            the reconFlag to set
	 */
	public void setReconFlag(String reconFlag) {
		this.reconFlag = reconFlag;
	}

	/**
	 * @return the openFlag
	 */
	public String getOpenFlag() {
		return openFlag;
	}

	/**
	 * @param openFlag
	 *            the openFlag to set
	 */
	public void setOpenFlag(String openFlag) {
		this.openFlag = openFlag;
	}

	/**
	 * @return the index
	 */
	public String getIndex() {
		return index;
	}

	/**
	 * @param index
	 *            the index to set
	 */
	public void setIndex(String index) {
		this.index = index;
	}

	/**
	 * @return the ibtFlag
	 */
	public String getIbtFlag() {
		return ibtFlag;
	}

	/**
	 * @param ibtFlag
	 *            the ibtFlag to set
	 */
	public void setIbtFlag(String ibtFlag) {
		this.ibtFlag = ibtFlag;
	}

	/**
	 * @return the storeOrderFlag
	 */
	public String getStoreOrderFlag() {
		return storeOrderFlag;
	}

	/**
	 * @param storeOrderFlag
	 *            the storeOrderFlag to set
	 */
	public void setStoreOrderFlag(String storeOrderFlag) {
		this.storeOrderFlag = storeOrderFlag;
	}

	/**
	 * @return the unselectedVal
	 */
	public String getUnselectedVal() {
		return unselectedVal;
	}

	/**
	 * @param unselectedVal
	 *            the unselectedVal to set
	 */
	public void setUnselectedVal(String unselectedVal) {
		this.unselectedVal = unselectedVal;
	}

	/**
	 * @return the invoiceInfo
	 */
	public String getInvoiceInfo() {
		return invoiceInfo;
	}

	/**
	 * @param invoiceInfo
	 *            the invoiceInfo to set
	 */
	public void setInvoiceInfo(String invoiceInfo) {
		this.invoiceInfo = invoiceInfo;
	}

	/**
	 * @return the grInfo
	 */
	public String getGrInfo() {
		return grInfo;
	}

	/**
	 * @param grInfo
	 *            the grInfo to set
	 */
	public void setGrInfo(String grInfo) {
		this.grInfo = grInfo;
	}

	/**
	 * @return the itemInfo
	 */
	public String getItemInfo() {
		return itemInfo;
	}

	/**
	 * @param itemInfo
	 *            the itemInfo to set
	 */
	public void setItemInfo(String itemInfo) {
		this.itemInfo = itemInfo;
	}

	/**
	 * @return the deliveryInfo
	 */
	public String getDeliveryInfo() {
		return deliveryInfo;
	}

	/**
	 * @param deliveryInfo
	 *            the deliveryInfo to set
	 */
	public void setDeliveryInfo(String deliveryInfo) {
		this.deliveryInfo = deliveryInfo;
	}

	/**
	 * @return the grNo
	 */
	public String getGrNo() {
		return grNo;
	}

	/**
	 * @param grNo
	 *            the grNo to set
	 */
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}

	/**
	 * @return the year
	 */
	public String getYear() {
		return year;
	}

	/**
	 * @param year
	 *            the year to set
	 */
	public void setYear(String year) {
		this.year = year;
	}

	/**
	 * @return the articleList
	 */
	public ArrayList<String> getArticleList() {
		return articleList;
	}

	/**
	 * @param articleList the articleList to set
	 */
	public void setArticleList(ArrayList<String> articleList) {
		this.articleList = articleList;
	}

	/**
	 * @return the articlesAllocationFlagMap
	 */
	public Map<String, String> getArticlesAllocationFlagMap() {
		return articlesAllocationFlagMap;
	}

	/**
	 * @param articlesAllocationFlagMap the articlesAllocationFlagMap to set
	 */
	public void setArticlesAllocationFlagMap(
			Map<String, String> articlesAllocationFlagMap) {
		this.articlesAllocationFlagMap = articlesAllocationFlagMap;
	}
	public String getVnSuppNo() {
		return vnSuppNo;
	}

	public void setVnSuppNo(String vnSuppNo) {
		this.vnSuppNo = vnSuppNo;
	}

	/**
	 * @return the tradingDept
	 */
	public String getTradingDept() {
		return tradingDept;
	}

	/**
	 * @param tradingDept the tradingDept to set
	 */
	public void setTradingDept(String tradingDept) {
		this.tradingDept = tradingDept;
	}

}
