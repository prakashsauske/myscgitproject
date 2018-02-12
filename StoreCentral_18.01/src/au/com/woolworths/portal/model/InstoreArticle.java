/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

public class InstoreArticle {

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("storeNo")
	private String storeNo;

	@JsonProperty("salesOrg")
	private String salesOrg;

	@JsonProperty("articleNo")
	private String articleNo;

	@JsonProperty("uom")
	private String uom;

	@JsonProperty("description")
	private String description;

	@JsonProperty("ean")
	private String ean;

	@JsonProperty("deptNo")
	private String deptNo;

	@JsonProperty("deptName")
	private String deptName;

	@JsonProperty("articleType")
	private String articleType;

	@JsonProperty("suppNo")
	private String suppNo;

	@JsonProperty("suppName")
	private String suppName;

	@JsonProperty("omPackSize")
	private String omPackSize;

	@JsonProperty("parentArtNo")
	private String parentArtNo;

	@JsonProperty("parentLinkArtNo")
	private String parentLinkArtNo;

	@JsonProperty("shelfLife")
	private String shelfLife;

	@JsonProperty("minShelfLife")
	private String minShelfLife;

	@JsonProperty("shelfCapcity")
	private String shelfCapcity;

	@JsonProperty("rangedFlag")
	private String rangedFlag;

	@JsonProperty("supplierNo")
	private String supplierNo;

	@JsonProperty("supplierName")
	private String supplierName;

	@JsonProperty("supplierType")
	private String supplierType;

	@JsonProperty("packBreakDownArticleNo")
	private String packBreakDownArticleNo;

	@JsonProperty("pbdArticleNo")
	private String pbdArticleNo;

	@JsonProperty("pbdArticleDesc")
	private String pbdArticleDesc;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getStoreNo() {
		return storeNo;
	}

	public void setStoreNo(String storeNo) {
		this.storeNo = storeNo;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getEan() {
		return ean;
	}

	public void setEan(String ean) {
		this.ean = ean;
	}

	public String getDeptNo() {
		return deptNo;
	}

	public void setDeptNo(String deptNo) {
		this.deptNo = deptNo;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getArticleType() {
		return articleType;
	}

	public void setArticleType(String articleType) {
		this.articleType = articleType;
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

	public String getOmPackSize() {
		return omPackSize;
	}

	public void setOmPackSize(String omPackSize) {
		this.omPackSize = omPackSize;
	}

	public String getParentArtNo() {
		return parentArtNo;
	}

	public void setParentArtNo(String parentArtNo) {
		this.parentArtNo = parentArtNo;
	}

	public String getParentLinkArtNo() {
		return parentLinkArtNo;
	}

	public void setParentLinkArtNo(String parentLinkArtNo) {
		this.parentLinkArtNo = parentLinkArtNo;
	}

	public String getShelfLife() {
		return shelfLife;
	}

	public void setShelfLife(String shelfLife) {
		this.shelfLife = shelfLife;
	}

	public String getMinShelfLife() {
		return minShelfLife;
	}

	public void setMinShelfLife(String minShelfLife) {
		this.minShelfLife = minShelfLife;
	}

	public String getShelfCapcity() {
		return shelfCapcity;
	}

	public void setShelfCapcity(String shelfCapcity) {
		this.shelfCapcity = shelfCapcity;
	}

	public String getRangedFlag() {
		return rangedFlag;
	}

	public void setRangedFlag(String rangedFlag) {
		this.rangedFlag = rangedFlag;
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

	public String getSupplierType() {
		return supplierType;
	}

	public void setSupplierType(String supplierType) {
		this.supplierType = supplierType;
	}

	public String getPackBreakDownArticleNo() {
		return packBreakDownArticleNo;
	}

	public void setPackBreakDownArticleNo(String packBreakDownArticleNo) {
		this.packBreakDownArticleNo = packBreakDownArticleNo;
	}

	/**
	 * @return the pbdArticleNo
	 */
	public String getPbdArticleNo() {
		return pbdArticleNo;
	}

	/**
	 * @param pbdArticleNo
	 *            the pbdArticleNo to set
	 */
	public void setPbdArticleNo(String pbdArticleNo) {
		this.pbdArticleNo = pbdArticleNo;
	}

	/**
	 * @return the pbdArticleDesc
	 */
	public String getPbdArticleDesc() {
		return pbdArticleDesc;
	}

	/**
	 * @param pbdArticleDesc
	 *            the pbdArticleDesc to set
	 */
	public void setPbdArticleDesc(String pbdArticleDesc) {
		this.pbdArticleDesc = pbdArticleDesc;
	}

}
