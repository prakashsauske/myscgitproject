package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ServiceOrderArticles {

	@JsonProperty("IV_SITE")
	private String IV_SITE;

	@JsonProperty("IV_ARTICLE")
	private String IV_ARTICLE;

	@JsonProperty("IV_ARTICLE_DESC")
	private String IV_ARTICLE_DESC;

	@JsonProperty("IV_QUANTITY")
	private String IV_QUANTITY;

	@JsonProperty("IV_UOM")
	private String IV_UOM;

	@JsonProperty("IV_VALUE")
	private String IV_VALUE;

	@JsonProperty("IV_PAY_AMOUNT")
	private String IV_PAY_AMOUNT;

	@JsonProperty("IV_SERVICE_ORD_NO")
	private String IV_SERVICE_ORD_NO;

	/**
	 * @return the iV_SITE
	 */
	public String getIV_SITE() {
		return IV_SITE;
	}

	/**
	 * @param iV_SITE
	 *            the iV_SITE to set
	 */
	public void setIV_SITE(String iV_SITE) {
		IV_SITE = iV_SITE;
	}

	/**
	 * @return the iV_ARTICLE
	 */
	public String getIV_ARTICLE() {
		return IV_ARTICLE;
	}

	/**
	 * @param iV_ARTICLE
	 *            the iV_ARTICLE to set
	 */
	public void setIV_ARTICLE(String iV_ARTICLE) {
		IV_ARTICLE = iV_ARTICLE;
	}

	/**
	 * @return the iV_ARTICLE_DESC
	 */
	public String getIV_ARTICLE_DESC() {
		return IV_ARTICLE_DESC;
	}

	/**
	 * @param iV_ARTICLE_DESC
	 *            the iV_ARTICLE_DESC to set
	 */
	public void setIV_ARTICLE_DESC(String iV_ARTICLE_DESC) {
		IV_ARTICLE_DESC = iV_ARTICLE_DESC;
	}

	/**
	 * @return the iV_QUANTITY
	 */
	public String getIV_QUANTITY() {
		return IV_QUANTITY;
	}

	/**
	 * @param iV_QUANTITY
	 *            the iV_QUANTITY to set
	 */
	public void setIV_QUANTITY(String iV_QUANTITY) {
		IV_QUANTITY = iV_QUANTITY;
	}

	/**
	 * @return the iV_UOM
	 */
	public String getIV_UOM() {
		return IV_UOM;
	}

	/**
	 * @param iV_UOM
	 *            the iV_UOM to set
	 */
	public void setIV_UOM(String iV_UOM) {
		IV_UOM = iV_UOM;
	}

	/**
	 * @return the iV_VALUE
	 */
	public String getIV_VALUE() {
		return IV_VALUE;
	}

	/**
	 * @param iV_VALUE
	 *            the iV_VALUE to set
	 */
	public void setIV_VALUE(String iV_VALUE) {
		IV_VALUE = iV_VALUE;
	}

	/**
	 * @return the iV_SERVICE_ORD_NO
	 */
	public String getIV_SERVICE_ORD_NO() {
		return IV_SERVICE_ORD_NO;
	}

	/**
	 * @param iV_SERVICE_ORD_NO
	 *            the iV_SERVICE_ORD_NO to set
	 */
	public void setIV_SERVICE_ORD_NO(String iV_SERVICE_ORD_NO) {
		IV_SERVICE_ORD_NO = iV_SERVICE_ORD_NO;
	}

	public String getIV_PAY_AMOUNT() {
		return IV_PAY_AMOUNT;
	}

	public void setIV_PAY_AMOUNT(String iV_PAY_AMOUNT) {
		IV_PAY_AMOUNT = iV_PAY_AMOUNT;
	}

}
