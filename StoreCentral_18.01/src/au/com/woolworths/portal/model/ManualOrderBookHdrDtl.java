package au.com.woolworths.portal.model;

import java.awt.image.BufferedImage;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ManualOrderBookHdrDtl implements Cloneable {

	@JsonProperty("STORE_NAME")
	private String storeName;

	@JsonProperty("BASE_UOM")
	private String baseUom;

	@JsonProperty("SUPPLIER")
	private String supplier;

	@JsonProperty("PRICE")
	private String price;

	@JsonProperty("COMPANY")
	private String company;

	@JsonProperty("MSG")
	private String msg;

	@JsonProperty("ARTICLE")
	private String article;

	@JsonProperty("DATE")
	private String date;

	@JsonProperty("NAME")
	private String name;

	@JsonProperty("PHONE")
	private String phone;

	@JsonProperty("TIME")
	private String time;

	@JsonProperty("BARCODE")
	private String barcode;

	@JsonProperty("PACK_SIZE")
	private String packSize;

	@JsonProperty("ARTICLE_DESC")
	private String articleDesc;

	@JsonProperty("CURRENCY")
	private String currency;

	@JsonProperty("PACK_BASE_UOM")
	private String pack_base_uom;
	
	@JsonProperty("PLU")
	private String plu;
	

	//Newly added JSON Propery
	
	@JsonProperty("storeName")
	private String storeName_m;

	@JsonProperty("baseUom")
	private String baseUom_m;

	@JsonProperty("supplier")
	private String supplier_m;

	@JsonProperty("price")
	private String price_m;

	@JsonProperty("company")
	private String company_m;

	@JsonProperty("msg")
	private String msg_m;

	@JsonProperty("article")
	private String article_m;

	@JsonProperty("date")
	private String date_m;

	@JsonProperty("name")
	private String name_m;

	@JsonProperty("phone")
	private String phone_m;

	@JsonProperty("time")
	private String time_m;

	@JsonProperty("barcode")
	private String barcode_m;

	@JsonProperty("packSize")
	private String packSize_m;

	@JsonProperty("articleDesc")
	private String articleDesc_m;

	@JsonProperty("currency")
	private String currency_m;

	@JsonProperty("pack_base_uom")
	private String pack_base_uom_m;
	
	@JsonProperty("plu")
	private String plu_m;
	
	private BufferedImage logo;
	

	/**
	 * @param storeName
	 * @param baseUom
	 * @param supplier
	 * @param price
	 * @param company
	 * @param msg
	 * @param article
	 * @param date
	 * @param name
	 * @param phone
	 * @param time
	 * @param barcode
	 * @param packSize
	 * @param articleDesc
	 * @param currency
	 * @param pack_base_uom
	 * @param plu
	 */
	public ManualOrderBookHdrDtl(@JsonProperty("STORE_NAME") String storeName,@JsonProperty("BASE_UOM") String baseUom,
			@JsonProperty("SUPPLIER") String supplier,@JsonProperty("PRICE") String price,@JsonProperty("COMPANY") String company,@JsonProperty("MSG") String msg,
			@JsonProperty("ARTICLE") String article,@JsonProperty("DATE") String date,@JsonProperty("NAME") String name,@JsonProperty("PHONE") String phone,
			@JsonProperty("TIME") String time,@JsonProperty("BARCODE") String barcode,@JsonProperty("PACK_SIZE") String packSize,@JsonProperty("ARTICLE_DESC") String articleDesc,
			@JsonProperty("CURRENCY") String currency,@JsonProperty("PACK_BASE_UOM") String pack_base_uom,@JsonProperty("PLU") String plu) {
	
		this.storeName = storeName;
		this.baseUom = baseUom;
		this.supplier = supplier;
		this.price = price;
		this.company = company;
		this.msg = msg;
		this.article = article;
		this.date = date;
		this.name = name;
		this.phone = phone;
		this.time = time;
		this.barcode = barcode;
		this.packSize = packSize;
		this.articleDesc = articleDesc;
		this.currency = currency;
		this.pack_base_uom = pack_base_uom;
		this.plu = plu;
		
		this.storeName_m = storeName;
		this.baseUom_m = baseUom;
		this.supplier_m = supplier;
		this.price_m = price;
		this.company_m = company;
		this.msg_m = msg;
		this.article_m = article;
		this.date_m = date;
		this.name_m = name;
		this.phone_m = phone;
		this.time_m = time;
		this.barcode_m = barcode;
		this.packSize_m = packSize;
		this.articleDesc_m = articleDesc;
		this.currency_m = currency;
		this.pack_base_uom_m = pack_base_uom;
		this.plu_m = plu;
	}
	
	//End of JSON Proeperty newly added
	public String getStoreName() {
		return storeName;
	}
	public void setStoreName(String storeName) {
		this.storeName = storeName;
	}

	public String getBaseUom() {
		return baseUom;
	}

	public void setBaseUom(String baseUom) {
		this.baseUom = baseUom;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		if (supplier != null) {
			// //System.out.println("**** BEAN "
			// + articleNo.replaceFirst("^0+(?!$)", ""));
			supplier.replaceFirst("^0+(?!$)", "");
		}
		this.supplier = supplier;
	}

	public String getPrice() {
		return price;
	}

	public void setPrice(String price) {
		this.price = price;
	}

	public String getCompany() {
		return company;
	}

	public void setCompany(String company) {
		this.company = company;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getArticle() {
		if (article != null) {
			// //System.out.println("**** BEAN "
			// + articleNo.replaceFirst("^0+(?!$)", ""));
			article.replaceFirst("^0+(?!$)", "");
		}
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getDate() {
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getPhone() {
		return phone;
	}

	public void setPhone(String phone) {
		this.phone = phone;
	}

	public String getTime() {
		return time;
	}

	public void setTime(String time) {
		this.time = time;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getPackSize() {
		return packSize;
	}

	public void setPackSize(String packSize) {
		this.packSize = packSize;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getCurrency() {
		return currency;
	}

	public void setCurrency(String currency) {
		this.currency = currency;
	}

	public String getPack_base_uom() {
		return pack_base_uom;
	}

	public void setPack_base_uom(String pack_base_uom) {
		this.pack_base_uom = pack_base_uom;
	}

	public String getPlu() {
		return plu;
	}

	public void setPlu(String plu) {
		this.plu = plu;
	}

	/**
	 * @return the logo
	 */
	public BufferedImage getLogo() {
		return logo;
	}

	/**
	 * @param logo the logo to set
	 */
	public void setLogo(BufferedImage logo) {
		this.logo = logo;
	}
	
	public Object clone() {
		try {
			return super.clone();
		} catch (Exception e) {
			return null;
		}
	}

}
