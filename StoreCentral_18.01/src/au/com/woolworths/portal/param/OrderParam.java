/**
 * 
 */
package au.com.woolworths.portal.param;

/**
 * @author xrca4
 * 
 */
public class OrderParam {

	private String type;
	private String orderNo;
	private String articleNo;
	private String orderStatus;

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

	private String suppName;

	private String srcOfSuppliy;

	private String rosterDate;
	private String paramRetain;
	private String reconFlag;
	private String openFlag;
	private String index;
	private String ibtFlag;
	private String storeOrderFlag;

	private String unselectedVal;

	public Integer getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(Integer recordCount) {
		this.recordCount = recordCount;
	}

	public Integer getPageNo() {
		return pageNo;
	}

	public void setPageNo(Integer pageNo) {
		this.pageNo = pageNo;
	}

	public String getSuppNo() {
		return suppNo;
	}

	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	public String getSrcOfSuppliy() {
		return srcOfSuppliy;
	}

	public void setSrcOfSuppliy(String srcOfSuppliy) {
		this.srcOfSuppliy = srcOfSuppliy;
	}

	public String getRosterToDate() {
		return rosterToDate;
	}

	public void setRosterToDate(String rosterToDate) {
		this.rosterToDate = rosterToDate;
	}

	public String getRosterFromDate() {
		return rosterFromDate;
	}

	public void setRosterFromDate(String rosterFromDate) {
		this.rosterFromDate = rosterFromDate;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	private String vendorNo;
	private String vendorName;

	public String getOrderNo() {
		if(this.orderNo!=null && !this.orderNo.equals("")){
			return this.orderNo.toUpperCase();
		}
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getFromDate() {
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getToDate() {
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getVendorNo() {
		return vendorNo;
	}

	public void setVendorNo(String vendorNo) {
		this.vendorNo = vendorNo;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getRosterDate() {
		return rosterDate;
	}

	public void setRosterDate(String rosterDate) {
		this.rosterDate = rosterDate;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getSearchByOptions() {
		return searchByOptions;
	}

	public void setSearchByOptions(String searchByOptions) {
		this.searchByOptions = searchByOptions;
	}

	public String getParamRetain() {
		return paramRetain;
	}

	public void setParamRetain(String paramRetain) {
		this.paramRetain = paramRetain;
	}

	public String getStoreOrVendor() {
		return storeOrVendor;
	}

	public void setStoreOrVendor(String storeOrVendor) {
		this.storeOrVendor = storeOrVendor;
	}

	public String getWareHouseFlag() {
		return wareHouseFlag;
	}

	public void setWareHouseFlag(String wareHouseFlag) {
		this.wareHouseFlag = wareHouseFlag;
	}

	public String getReconFlag() {
		return reconFlag;
	}

	public void setReconFlag(String reconFlag) {
		this.reconFlag = reconFlag;
	}

	public String getOpenFlag() {
		return openFlag;
	}

	public void setOpenFlag(String openFlag) {
		this.openFlag = openFlag;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getIbtFlag() {
		return ibtFlag;
	}

	public void setIbtFlag(String ibtFlag) {
		this.ibtFlag = ibtFlag;
	}

	public String getStoreOrderFlag() {
		return storeOrderFlag;
	}

	public void setStoreOrderFlag(String storeOrderFlag) {
		this.storeOrderFlag = storeOrderFlag;
	}

	public String getUnselectedVal() {
		return unselectedVal;
	}

	public void setUnselectedVal(String unselectedVal) {
		this.unselectedVal = unselectedVal;
	}

}
