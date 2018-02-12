package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public  class SalesByArticlesDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@JsonProperty("A0CM_SKU__0CM_CDT3")
	public void setSubCategory2(String subCategory) {
		setSubCategory( subCategory);
	}
	private String subCategory;

	@JsonProperty("A0MATERIAL")
	public void setArticle2(String article) {
		setArticle( article);
	}
	private String article;

	@JsonProperty("A0MATERIAL_T")
	public void setArticleT2(String articleT) {
		setArticleT( articleT);
	}
	private String articleT;
	

	@JsonProperty("A0CM_SKU__0CM_CDT2")
	public void setCategory2(String category) {
		setCategory( category);
	}
	private String category;

	@JsonProperty("A0CM_SKU__0CM_CDT1")
	public void setDepartment2(String department) {
		setDepartment( department);
	}
	private String department;

	@JsonProperty("A0RT_OFFER")
	public void setPromotion2(String promotion) {
		setPromotion( promotion);
	}
	private String promotion;
	
	@JsonProperty("A0CM_CDT4")
	public void setSegment2(String segment) {
		setSegment( segment);
	}
	private String segment;
	
	@JsonProperty("A7YUV5W359XPW0QDP95KPEFRWK")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;
	
	@JsonProperty("A7YUV5W359XPW0QDP95KPEFRWK_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}	
	private String noDataFound;
	
	
	@JsonProperty("A7YUV5W359XPVXLGKW7SLNXUKI")
	public void setRetailPrice2(String retailPrice) {
		setRetailPrice( retailPrice);
	}
	private String retailPrice;
	
	@JsonProperty("A7YUV5W359XPXNWVTTSXT8CR9F")
	public void setQtyOfArticleSold2(String qtyOfArticleSold) {
		setQtyOfArticleSold( qtyOfArticleSold);
	}
	private String qtyOfArticleSold;
	
	@JsonProperty("A7YUV5W359XPW1I7T3W134JR41")
	public void setSalesRetailexcT2(String salesRetailexcT) {
		setSalesRetailexcT( salesRetailexcT);
	}
	private String salesRetailexcT;
	
	@JsonProperty("A0SALES_UNIT_T")
	public void setSalesUnit2(String salesUnit) {
		setSalesUnit( salesUnit);
	}
	private String salesUnit;
	
	@JsonProperty("B0ZI8KYVSWSJL4ZYH02A05E69")
	public void setTotDeferdLylty2(String totDeferdLylty) {
		setTotDeferdLylty( totDeferdLylty);
	}
	private String totDeferdLylty;

	/**
	 * @return the subCategory
	 */
	public String getSubCategory() {
		return subCategory;
	}

	/**
	 * @param subCategory the subCategory to set
	 */
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
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
	 * @return the articleT
	 */
	public String getArticleT() {
		return articleT;
	}

	/**
	 * @param articleT the articleT to set
	 */
	public void setArticleT(String articleT) {
		this.articleT = articleT;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @param category the category to set
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	/**
	 * @return the salesUnit
	 */
	public String getSalesUnit() {
		return salesUnit;
	}

	/**
	 * @param salesUnit the salesUnit to set
	 */
	public void setSalesUnit(String salesUnit) {
		this.salesUnit = salesUnit;
	}

	/**
	 * @return the promotion
	 */
	public String getPromotion() {
		return promotion;
	}

	/**
	 * @param promotion the promotion to set
	 */
	public void setPromotion(String promotion) {
		this.promotion = promotion;
	}

	/**
	 * @return the segment
	 */
	public String getSegment() {
		return segment;
	}

	/**
	 * @param segment the segment to set
	 */
	public void setSegment(String segment) {
		this.segment = segment;
	}

	/**
	 * @return the tValue
	 */
	public String gettValue() {
		return tValue;
	}

	/**
	 * @param tValue the tValue to set
	 */
	public void settValue(String tValue) {
		this.tValue = tValue;
	}

	/**
	 * @return the qtyOfArticleSold
	 */
	public String getQtyOfArticleSold() {
		return qtyOfArticleSold;
	}

	/**
	 * @param qtyOfArticleSold the qtyOfArticleSold to set
	 */
	public void setQtyOfArticleSold(String qtyOfArticleSold) {
		this.qtyOfArticleSold = qtyOfArticleSold;
	}

	/**
	 * @return the retailPrice
	 */
	public String getRetailPrice() {
		return retailPrice;
	}

	/**
	 * @param retailPrice the retailPrice to set
	 */
	public void setRetailPrice(String retailPrice) {
		this.retailPrice = retailPrice;
	}

	/**
	 * @return the salesRetailexcT
	 */
	public String getSalesRetailexcT() {
		return salesRetailexcT;
	}

	/**
	 * @param salesRetailexcT the salesRetailexcT to set
	 */
	public void setSalesRetailexcT(String salesRetailexcT) {
		this.salesRetailexcT = salesRetailexcT;
	}

	public String getNoDataFound() {
		return noDataFound;
	}
	
	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

	public String getTotDeferdLylty() {
		return totDeferdLylty;
	}

	public void setTotDeferdLylty(String totDeferdLylty) {
		this.totDeferdLylty = totDeferdLylty;
	}	
}

