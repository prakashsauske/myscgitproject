package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UnknownandUnRangedArticleDtl implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	private Integer cnt = 0;

	//A0CALDAY changes done because of After Fiori Implementation prod issue.
	@JsonProperty("A0CALDAY_T")
	public void setCalendarDayFrom2(String calendarDayFrom) {
		setCalendarDayFrom( calendarDayFrom);
	}
	private String calendarDayFrom;

	@JsonProperty("A0CALDAY")
	public void setCalendarDayTo2(String calendarDayTo) {
		setCalendarDayTo( calendarDayTo);
	}
	private String calendarDayTo;

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

	@JsonProperty("A0EANUPC")
	public void setEan_upc2(String ean_upc) {
		setEan_upc( ean_upc);
	}
	private String ean_upc;

	@JsonProperty("RSAPRETCD_T")
	public void setRetunCode_ea2(String retunCode_ea) {
		setRetunCode_ea( retunCode_ea);
	}
	private String retunCode_ea;

	@JsonProperty("RDPTSALIN_T")
	public void setDepartmentSaleIndi2(String departmentSaleIndi) {
		setDepartmentSaleIndi( departmentSaleIndi);
	}
	private String departmentSaleIndi;

	@JsonProperty("A0PLANT")
	public void setSite2(String site) {
		setSite( site);
	}
	private String site;

	@JsonProperty("A0PLANT_T")
	public void setSiteT2(String siteT) {
		setSiteT( siteT);
	}
	private String siteT;

	@JsonProperty("A0RPA_TNR")
	public void setTransactionNumber2(String transactionNumber) {
		setTransactionNumber( transactionNumber);
	}
	private String transactionNumber;

	@JsonProperty("A7YUV5W359XPXNXJE8VYV7E803")
	public void setDepartmentSale2(String departmentSale) {
		setDepartmentSale( departmentSale);
	}
	private String departmentSale;

	@JsonProperty("A7YUV5W359XPXNXJE8VYVJMXOJ")
	public void setSapLookUp2(String sapLookUp) {
		setSapLookUp( sapLookUp);
	}
	private String sapLookUp;

	@JsonProperty("A7YUV5W359XPVXNQFD2UOPXIIQ")
	public void setNoReceiptItems2(String noReceiptItems) {
		setNoReceiptItems( noReceiptItems);
	}
	private String noReceiptItems;

	@JsonProperty("A7YUV5W359XPW0PM7ZITM47M6D")
	public void setTotalSales2(String totalSales) {
		setTotalSales( totalSales);
	}
	private String totalSales;
	
	
	@JsonProperty("A7YUV5W359XPW0QDPN8P55DW5E_F")
	public void setNoDataFoundF2(String noDataFoundF) {
		setNoDataFoundF( noDataFoundF);
	}
	private String noDataFoundF;
	
	@JsonProperty("A7YUV5W359XPW0QDPN8P55DW5E")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	

	private Double totalArtPrc;
	
	/**
	 * @return the noDataFoundF
	 */
	public String getNoDataFoundF() {
		return noDataFoundF;
	}

	/**
	 * @param noDataFoundF the noDataFoundF to set
	 */
	public void setNoDataFoundF(String noDataFoundF) {
		this.noDataFoundF = noDataFoundF;
	}

	/**
	 * @return the noDataFound
	 */
	public String getNoDataFound() {
		return noDataFound;
	}

	/**
	 * @param noDataFound the noDataFound to set
	 */
	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

	/**
	 * @return the calendarDayFrom
	 */
	public String getCalendarDayFrom() {
		return calendarDayFrom;
	}

	/**
	 * @param calendarDayFrom
	 *            the calendarDayFrom to set
	 */
	public void setCalendarDayFrom(String calendarDayFrom) {
		this.calendarDayFrom = calendarDayFrom;
	}

	/**
	 * @return the calendarDayTo
	 */
	public String getCalendarDayTo() {
		if (calendarDayTo != null && calendarDayTo.trim().length() > 0
				&& calendarDayTo.split("Date").length > 0) {
			calendarDayTo = calendarDayTo.replace("/", "").replace("/", "")
					.replace("(", "").replace(")", "").split("Date")[1];
		}
		return calendarDayTo;
	}

	/**
	 * @param calendarDayTo
	 *            the calendarDayTo to set
	 */
	public void setCalendarDayTo(String calendarDayTo) {
		this.calendarDayTo = calendarDayTo;
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
	 * @return the articleT
	 */
	public String getArticleT() {
		return articleT;
	}

	/**
	 * @param articleT
	 *            the articleT to set
	 */
	public void setArticleT(String articleT) {
		this.articleT = articleT;
	}

	/**
	 * @return the ean_upc
	 */
	public String getEan_upc() {
		return ean_upc;
	}

	/**
	 * @param ean_upc
	 *            the ean_upc to set
	 */
	public void setEan_upc(String ean_upc) {
		this.ean_upc = ean_upc;
	}

	/**
	 * @return the retunCode_ea
	 */
	public String getRetunCode_ea() {
		return retunCode_ea;
	}

	/**
	 * @param retunCode_ea
	 *            the retunCode_ea to set
	 */
	public void setRetunCode_ea(String retunCode_ea) {
		this.retunCode_ea = retunCode_ea;
	}

	/**
	 * @return the departmentSaleIndi
	 */
	public String getDepartmentSaleIndi() {
		return departmentSaleIndi;
	}

	/**
	 * @param departmentSaleIndi
	 *            the departmentSaleIndi to set
	 */
	public void setDepartmentSaleIndi(String departmentSaleIndi) {
		this.departmentSaleIndi = departmentSaleIndi;
	}

	/**
	 * @return the site
	 */
	public String getSite() {
		return site;
	}

	/**
	 * @param site
	 *            the site to set
	 */
	public void setSite(String site) {
		this.site = site;
	}

	/**
	 * @return the siteT
	 */
	public String getSiteT() {
		return siteT;
	}

	/**
	 * @param siteT
	 *            the siteT to set
	 */
	public void setSiteT(String siteT) {
		this.siteT = siteT;
	}

	/**
	 * @return the transactionNumber
	 */
	public String getTransactionNumber() {
		return transactionNumber;
	}

	/**
	 * @param transactionNumber
	 *            the transactionNumber to set
	 */
	public void setTransactionNumber(String transactionNumber) {
		this.transactionNumber = transactionNumber;
	}

	/**
	 * @return the departmentSale
	 */
	public String getDepartmentSale() {
		return departmentSale;
	}

	/**
	 * @param departmentSale
	 *            the departmentSale to set
	 */
	public void setDepartmentSale(String departmentSale) {
		this.departmentSale = departmentSale;
	}

	/**
	 * @return the sapLookUp
	 */
	public String getSapLookUp() {
		return sapLookUp;
	}

	/**
	 * @param sapLookUp
	 *            the sapLookUp to set
	 */
	public void setSapLookUp(String sapLookUp) {
		this.sapLookUp = sapLookUp;
	}

	/**
	 * @return the noReceiptItems
	 */
	public String getNoReceiptItems() {
		return noReceiptItems;
	}

	/**
	 * @param noReceiptItems
	 *            the noReceiptItems to set
	 */
	public void setNoReceiptItems(String noReceiptItems) {
		this.noReceiptItems = noReceiptItems;
	}

	/**
	 * @return the totalSales
	 */
	public String getTotalSales() {
		return totalSales;
	}

	/**
	 * @param totalSales
	 *            the totalSales to set
	 */
	public void setTotalSales(String totalSales) {
		this.totalSales = totalSales;
	}

	/**
	 * @return the cnt
	 */
	public Integer getCnt() {
		return cnt;
	}

	/**
	 * @param cnt
	 *            the cnt to set
	 */
	public void setCnt(Integer cnt) {
		this.cnt = cnt;
	}

	/**
	 * @return the totalArtPrc
	 */
	public Double getTotalArtPrc() {
		return totalArtPrc;
	}

	/**
	 * @param totalArtPrc
	 *            the totalArtPrc to set
	 */
	public void setTotalArtPrc(Double totalArtPrc) {
		this.totalArtPrc = totalArtPrc;
	}

}
