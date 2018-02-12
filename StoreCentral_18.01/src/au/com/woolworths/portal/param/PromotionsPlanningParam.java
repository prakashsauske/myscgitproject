package au.com.woolworths.portal.param;

import java.util.List;

import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.PromoSearchResultMetadata;

public class PromotionsPlanningParam {
	private String selectedArticles;
	private String promotionWeek;
	private String department;
	private String depH;
	private String articleNo;
	private String searchByOptions; // reference description number
	private String sourceSupply; // warehouse vendor all
	private String warehouseVal;
	private String supplier;
	private String promotionsDropDown;
	private String promoType;
	private String sortByOptions;
	private String minDiscount;
	private String displayType;
	private String omVal;
	private String diffOM; // unit perc
	private String actioned;
	private String residualQty;
	private String option;
	private String nodeId = null;
	private String nodelvl = null;
	
	private String deptSentInLock;

	private String weekStartDate;

	private String departmentList;
	private String category;
	private String subCat;
	private String segme;
	private String salesOrg;
	private String siteNo;
	private String msg;
	private String uom;
	private String recordsIndex;
	private String cateDesc;
	private String index;

	private String pageNo;
	private String recordCount;
	private String pageNoChange;
	private String count;
	private String paginationFlag;

	private String departmentId;
	private String lockFlag;
	private String autoForeFlag;

	private String fixtureFlag;
	
	private String userId;
	private PromoSearchResultMetadata promoSearchResultMetadata;

	private List<ArticleDetail> promoArticleInfoList;
	private List<String> articleList;

	private String indexListForUpdate;
	
	private String displayQty;//New fix to include display Qty in Current week as well

	public String getPromotionWeek() {
		return promotionWeek;
	}

	public void setPromotionWeek(String promotionWeek) {
		this.promotionWeek = promotionWeek;
	}

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		if (department != null && department != "") {
			this.nodeId = department;
			this.nodelvl = "1";
		}
		this.department = department;
	}

	public void setDepartmentList(String departmentList) {
		this.departmentList = departmentList;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public void setSubCat(String subCat) {
		this.subCat = subCat;
	}

	public void setSegme(String segme) {
		this.segme = segme;
	}

	public String getDepH() {
		return depH;
	}

	public void setDepH(String depH) {
		this.depH = depH;
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

	public String getSourceSupply() {
		return sourceSupply;
	}

	public void setSourceSupply(String sourceSupply) {
		this.sourceSupply = sourceSupply;
	}

	public String getWarehouseVal() {
		return warehouseVal;
	}

	public void setWarehouseVal(String warehouseVal) {
		this.warehouseVal = warehouseVal;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getPromotionsDropDown() {
		return promotionsDropDown;
	}

	public void setPromotionsDropDown(String promotionsDropDown) {
		this.promotionsDropDown = promotionsDropDown;
	}

	public String getPromoType() {
		return promoType;
	}

	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	public String getSortByOptions() {
		return sortByOptions;
	}

	public void setSortByOptions(String sortByOptions) {
		this.sortByOptions = sortByOptions;
	}

	public String getMinDiscount() {
		return minDiscount;
	}

	public void setMinDiscount(String minDiscount) {
		this.minDiscount = minDiscount;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	public String getOmVal() {
		return omVal;
	}

	public void setOmVal(String omVal) {
		this.omVal = omVal;
	}

	public String getDiffOM() {
		return diffOM;
	}

	public void setDiffOM(String diffOM) {
		this.diffOM = diffOM;
	}

	public String getActioned() {
		return actioned;
	}

	public void setActioned(String actioned) {
		this.actioned = actioned;
	}

	public String getResidualQty() {
		return residualQty;
	}

	public void setResidualQty(String residualQty) {
		this.residualQty = residualQty;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public List<ArticleDetail> getPromoArticleInfoList() {
		return promoArticleInfoList;
	}

	public void setPromoArticleInfoList(List<ArticleDetail> promoArticleInfoList) {
		this.promoArticleInfoList = promoArticleInfoList;
	}

	public String getSelectedArticles() {
		return selectedArticles;
	}

	public void setSelectedArticles(String selectedArticles) {
		this.selectedArticles = selectedArticles;
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public String getNodelvl() {
		return nodelvl;
	}

	public void setNodelvl(String nodelvl) {
		this.nodelvl = nodelvl;
	}

	public String getDepartmentList() {
		return departmentList;
	}

	public String getCategory() {
		return category;
	}

	public String getSubCat() {
		return subCat;
	}

	public String getSegme() {
		return segme;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getRecordsIndex() {
		return recordsIndex;
	}

	public void setRecordsIndex(String recordsIndex) {
		this.recordsIndex = recordsIndex;
	}

	public String getCateDesc() {
		return cateDesc;
	}

	public void setCateDesc(String cateDesc) {
		this.cateDesc = cateDesc;
	}

	public String getIndex() {
		return index;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public PromoSearchResultMetadata getPromoSearchResultMetadata() {
		return promoSearchResultMetadata;
	}

	public void setPromoSearchResultMetadata(
			PromoSearchResultMetadata promoSearchResultMetadata) {
		this.promoSearchResultMetadata = promoSearchResultMetadata;
	}

	public String getIndexListForUpdate() {
		return indexListForUpdate;
	}

	public void setIndexListForUpdate(String indexListForUpdate) {
		this.indexListForUpdate = indexListForUpdate;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(String recordCount) {
		this.recordCount = recordCount;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getPageNoChange() {
		return pageNoChange;
	}

	public void setPageNoChange(String pageNoChange) {
		this.pageNoChange = pageNoChange;
	}

	public String getCount() {
		return count;
	}

	public void setCount(String count) {
		this.count = count;
	}

	public String getPaginationFlag() {
		return paginationFlag;
	}

	public void setPaginationFlag(String paginationFlag) {
		this.paginationFlag = paginationFlag;
	}

	public List<String> getArticleList() {
		return articleList;
	}

	public void setArticleList(List<String> articleList) {
		this.articleList = articleList;
	}

	public String getDepartmentId() {
		return departmentId;
	}

	public void setDepartmentId(String departmentId) {
		this.departmentId = departmentId;
	}

	public String getLockFlag() {
		return lockFlag;
	}

	public void setLockFlag(String lockFlag) {
		this.lockFlag = lockFlag;
	}

	public String getAutoForeFlag() {
		return autoForeFlag;
	}

	public void setAutoForeFlag(String autoForeFlag) {
		this.autoForeFlag = autoForeFlag;
	}

	public String getWeekStartDate() {
		return weekStartDate;
	}

	public void setWeekStartDate(String weekStartDate) {
		this.weekStartDate = weekStartDate;
	}

	/**
	 * @return the fixtureFlag
	 */
	public String getFixtureFlag() {
		return fixtureFlag;
	}

	/**
	 * @param fixtureFlag the fixtureFlag to set
	 */
	public void setFixtureFlag(String fixtureFlag) {
		this.fixtureFlag = fixtureFlag;
	}

	public String getDeptSentInLock() {
		return deptSentInLock;
	}

	public void setDeptSentInLock(String deptSentInLock) {
		this.deptSentInLock = deptSentInLock;
	}

	/**
	 * @return the displayQty
	 */
	public String getDisplayQty() {
		return displayQty;
	}

	/**
	 * @param displayQty the displayQty to set
	 */
	public void setDisplayQty(String displayQty) {
		this.displayQty = displayQty;
	}

}
