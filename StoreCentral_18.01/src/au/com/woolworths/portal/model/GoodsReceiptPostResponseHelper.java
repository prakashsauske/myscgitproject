package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

/**
 * @author xrca4
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class GoodsReceiptPostResponseHelper {

	@JsonProperty("iv_msg")
	private String error;

	@JsonProperty("iv_order_no")
	private String generatedOrderNo;

	@JsonProperty("iv_typ")
	private String type;

	@JsonProperty("IV_UOM")
	private String uom;

	@JsonProperty("iv_test")
	private String test;

	@JsonProperty("IV_QTY")
	private String qty;

	@JsonProperty("iv_mvt_type")
	private String mvmtType;

	@JsonProperty("iv_date")
	private String docDate;

	@JsonProperty("IV_ARTICLE")
	private String article;

	@JsonProperty("iv_site")
	private String site;

	public String getError() {
		return error;
	}

	public void setError(String error) {
		this.error = error;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getTest() {
		return test;
	}

	public void setTest(String test) {
		this.test = test;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getMvmtType() {
		return mvmtType;
	}

	public void setMvmtType(String mvmtType) {
		this.mvmtType = mvmtType;
	}

	public String getDocDate() {
		if (this.docDate != null) {
			String result = PortalUtil.convertToStandard(docDate);
			if (result != null && result != "")
				return result;
		}
		return docDate;
	}

	public void setDocDate(String docDate) {
		this.docDate = docDate;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getGeneratedOrderNo() {
		return generatedOrderNo;
	}

	public void setGeneratedOrderNo(String generatedOrderNo) {
		this.generatedOrderNo = generatedOrderNo;
	}
}
