package au.com.woolworths.portal.model;

public class PlannerPropBakeryDailyReport {
	
	private String supplierNo;
	
	private String supplierName;
	
	private String department;
	
	private String article;
	
	private String description;
	
	private String promoPrice;
	
	private String mpl;
	
	private String plannedReq;
	
	public PlannerPropBakeryDailyReport(){
		this.supplierNo = "";
		this.supplierName = "";
		this.department = "";
		this.article = "";
		this.description = "";
		this.promoPrice = "";
		this.mpl = "";
		this.plannedReq = "";
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

	public String getDepartment() {
		return department;
	}

	public void setDepartment(String department) {
		this.department = department;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getPromoPrice() {
		return promoPrice;
	}

	public void setPromoPrice(String promoPrice) {
		this.promoPrice = promoPrice;
	}

	public String getMpl() {
		return mpl;
	}

	public void setMpl(String mpl) {
		this.mpl = mpl;
	}

	public String getPlannedReq() {
		return plannedReq;
	}

	public void setPlannedReq(String plannedReq) {
		this.plannedReq = plannedReq;
	}

}
