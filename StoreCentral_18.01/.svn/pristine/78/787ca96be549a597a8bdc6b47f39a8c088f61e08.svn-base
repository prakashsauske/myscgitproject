package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ZeroMPLReport {

	@JsonProperty("shelf_qty")
	private String shelfQty;

	@JsonProperty("mpl")
	private String mpl;

	@JsonProperty("article_desc")
	private String articleDesc;

	@JsonProperty("article")
	private String article;

	@JsonProperty("bay")
	private String bay;

	@JsonProperty("category")
	private String category;

	@JsonProperty("layout_model")
	private String layoutModel;

	@JsonProperty("aisle")
	private String aisle;

	@JsonProperty("aisle_side")
	private String aisleSide;

	@JsonProperty("msg")
	private String msg;

	
	//Start of newly added JSON Propery
	@JsonProperty("shelfQty")
	private String shelfQty_m;

	@JsonProperty("articleDesc")
	private String articleDesc_m;


	@JsonProperty("layoutModel")
	private String layoutModel_m;


	@JsonProperty("aisleSide")
	private String aisleSide_m;


	
	
	

	/**
	 * @param shelfQty
	 * @param mpl
	 * @param articleDesc
	 * @param article
	 * @param bay
	 * @param category
	 * @param layoutModel
	 * @param aisle
	 * @param aisleSide
	 * @param msg
	 */
	@JsonCreator
	public ZeroMPLReport(@JsonProperty("shelf_qty") String shelfQty,@JsonProperty("article_desc") String articleDesc
			,@JsonProperty("layout_model") String layoutModel,@JsonProperty("aisle_side") String aisleSide) {
		
		this.shelfQty = shelfQty;	
		this.articleDesc = articleDesc;
		this.layoutModel = layoutModel;
		this.aisleSide = aisleSide;
		
		this.shelfQty_m = shelfQty;
		this.articleDesc_m = articleDesc;
		this.layoutModel_m = layoutModel;
		this.aisleSide_m = aisleSide;
		
	}
	
	//End of Newly added JSON Property
	public String getShelfQty() {
		return shelfQty;
	}
	public void setShelfQty(String shelfQty) {
		this.shelfQty = shelfQty;
	}

	public String getMpl() {
		return mpl;
	}

	public void setMpl(String mpl) {
		this.mpl = mpl;
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

	public String getBay() {
		return bay;
	}

	public void setBay(String bay) {
		this.bay = bay;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public String getLayoutModel() {
		return layoutModel;
	}

	public void setLayoutModel(String layoutModel) {
		this.layoutModel = layoutModel;
	}

	public String getAisle() {
		return aisle;
	}

	public void setAisle(String aisle) {
		this.aisle = aisle;
	}

	public String getAisleSide() {
		return aisleSide;
	}

	public void setAisleSide(String aisleSide) {
		this.aisleSide = aisleSide;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

}
