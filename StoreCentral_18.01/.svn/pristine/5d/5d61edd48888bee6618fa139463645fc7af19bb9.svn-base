package au.com.woolworths.portal.param;

import java.net.URL;
import java.util.Date;
import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class PPlanerParam {
	private String articleNo;
	
	private String article;
	
	private String siteNo;
	
	private String salesOrg;
	
	private String articleName;
	
	@JsonProperty("department")
	private String department;
	
	private String option;
	
	private String value;
	
	private String supplier;
	
	private boolean paginationCheck = false;
	
	private String pageNumber;
	
	private String recordCount;
	
	private String suppNo;

	private String suppName;
	
	private String gtin;
	
	private URL wsdlURL;
	
	private String schedule;
	
	private String[] categoryList;
	
	@JsonProperty("selectedDate")
	private String currentDate;
	
	@JsonProperty("fromDate")
	private String fromDate;
	
	@JsonProperty("toDate")
	private String toDate;
	
	//New Attribute
	@JsonProperty("requiredQty")
	private String requiredQty;
	
	private String inputWeek;
	
	private String inputDay;
	
	private String inputBakeryDay;
	
	private String siteDistrict;

	public String getRequiredQty() {
		return requiredQty;
	}

	public void setRequiredQty(String requiredQty) {
		this.requiredQty = requiredQty;
	}

	public String getUpdateFlag() {
		return updateFlag;
	}

	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
	}

	@JsonProperty("updateFlag")
	private String updateFlag;
	private String day;
	
	private String week;
	
	private List<PPlannerDateParam> plannerDateParamList;
	
	public List<PPlannerDateParam> getPlannerDateParamList() {
		return plannerDateParamList;
	}

	public void setPlannerDateParamList(List<PPlannerDateParam> plannerDateParamList) {
		this.plannerDateParamList = plannerDateParamList;
	}

	public String getWeek() {
		return week;
	}

	public void setWeek(String week) {
		this.week = week;
	}

	public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}


	public String getCurrentDate() {
		return currentDate;
	}

	public void setCurrentDate(String currentDate) {
		this.currentDate = currentDate;
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

	public String getSchedule() {
		return schedule;
	}

	public void setSchedule(String schedule) {
		this.schedule = schedule;
	}

	public boolean isPaginationCheck() {
		return paginationCheck;
	}

	public void setPaginationCheck(boolean paginationCheck) {
		this.paginationCheck = paginationCheck;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getValue() {
		return value;
	}

	public void setValue(String value) {
		this.value = value;
	}

	public String getPageNumber() {
		return pageNumber;
	}

	public void setPageNumber(String pageNumber) {
		this.pageNumber = pageNumber;
	}

	public String getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(String recordCount) {
		this.recordCount = recordCount;
	}

	public String getGtin() {
		return gtin;
	}

	public void setGtin(String gtin) {
		this.gtin = gtin;
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getArticleName() {
		return articleName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
	}


	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public URL getWsdlURL() {
		return wsdlURL;
	}

	public void setWsdlURL(URL wsdlURL) {
		this.wsdlURL = wsdlURL;
	}

	public void setValues(String option, String value) {

		this.articleNo = "";
		this.articleName = "";
		this.gtin = "";

		if ("number".equalsIgnoreCase(option)) {

			this.articleNo = value;

		} else if ("description".equalsIgnoreCase(option)) {

			this.articleName = value;

		} else if ("reference".equalsIgnoreCase(option)) {
			this.gtin = value;
		}

	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}
	
	@Override
	public String toString(){
		return "{\"department\":\"" + getDepartment() + "\","
				+ "\"selectedDate\":\"" + getCurrentDate() + "\","
						+ "\"fromDate\":\"" + getFromDate() + "\","
							+ "\"day\":\"" + getDay() + "\","
								+ "\"recordCount\":\"" + getRecordCount() + "\","
									+ "\"toDate\":\"" + getToDate()+"\"}";
		
	}

	/**
	 * @return the categoryList
	 */
	public String[] getCategoryList() {
		return categoryList;
	}

	/**
	 * @param categoryList the categoryList to set
	 */
	public void setCategoryList(String[] categoryList) {
		this.categoryList = categoryList;
	}

	/**
	 * @param articleNo
	 * @param siteNo
	 * @param salesOrg
	 * @param articleName
	 * @param department
	 * @param option
	 * @param value
	 * @param supplier
	 * @param paginationCheck
	 * @param pageNumber
	 * @param recordCount
	 * @param suppNo
	 * @param suppName
	 * @param gtin
	 * @param wsdlURL
	 * @param schedule
	 * @param categoryList
	 * @param currentDate
	 * @param fromDate
	 * @param toDate
	 * @param requiredQty
	 * @param updateFlag
	 * @param day
	 * @param week
	 * @param plannerDateParamList
	 */
	public PPlanerParam(String articleNo, String siteNo, String salesOrg,
			String articleName, String department, String option, String value,
			String supplier, boolean paginationCheck, String pageNumber,
			String recordCount, String suppNo, String suppName, String gtin,
			URL wsdlURL, String schedule, String[] categoryList,
			String currentDate, String fromDate, String toDate,
			String requiredQty, String updateFlag, String day, String week,
			List<PPlannerDateParam> plannerDateParamList) {
		super();
		this.articleNo = articleNo;
		this.siteNo = siteNo;
		this.salesOrg = salesOrg;
		this.articleName = articleName;
		this.department = department;
		this.option = option;
		this.value = value;
		this.supplier = supplier;
		this.paginationCheck = paginationCheck;
		this.pageNumber = pageNumber;
		this.recordCount = recordCount;
		this.suppNo = suppNo;
		this.suppName = suppName;
		this.gtin = gtin;
		this.wsdlURL = wsdlURL;
		this.schedule = schedule;
		this.categoryList = categoryList;
		this.currentDate = currentDate;
		this.fromDate = fromDate;
		this.toDate = toDate;
		this.requiredQty = requiredQty;
		this.updateFlag = updateFlag;
		this.day = day;
		this.week = week;
		this.plannerDateParamList = plannerDateParamList;
	}

	/**
	 * 
	 */
	public PPlanerParam() {
		super();
	}

	/**
	 * @return the inputWeek
	 */
	public String getInputWeek() {
		return inputWeek;
	}

	/**
	 * @param inputWeek the inputWeek to set
	 */
	public void setInputWeek(String inputWeek) {
		this.inputWeek = inputWeek;
	}

	/**
	 * @return the inputDay
	 */
	public String getInputDay() {
		return inputDay;
	}

	/**
	 * @param inputDay the inputDay to set
	 */
	public void setInputDay(String inputDay) {
		this.inputDay = inputDay;
	}

	/**
	 * @return the inputBakeryDay
	 */
	public String getInputBakeryDay() {
		return inputBakeryDay;
	}

	/**
	 * @param inputBakeryDay the inputBakeryDay to set
	 */
	public void setInputBakeryDay(String inputBakeryDay) {
		this.inputBakeryDay = inputBakeryDay;
	}

	/**
	 * @return the article
	 */
	public String getArticle() {
		return article;
	}

	/**
	 * @param article the article to set
	 */
	public void setArticle(String article) {
		this.article = article;
	}

	/**
	 * @return the siteDistrict
	 */
	public String getSiteDistrict() {
		return siteDistrict;
	}

	/**
	 * @param siteDistrict the siteDistrict to set
	 */
	public void setSiteDistrict(String siteDistrict) {
		this.siteDistrict = siteDistrict;
	}
	
	

}