package au.com.woolworths.portal.param;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderItemInfoParam {

	@JsonProperty("IV_PO_NO")
	private String IV_PO_NO;

	@JsonProperty("IV_PR_TYPE")
	private String IV_PR_TYPE;

	@JsonProperty("IV_DOC_TYPE")
	private String IV_DOC_TYPE;

	@JsonProperty("IV_ITEM_CAT")
	private String IV_ITEM_CAT;

	@JsonProperty("IV_RETURNS")
	private String IV_RETURNS;

	@JsonProperty("IV_PREQ_NO")
	private String IV_PREQ_NO;

	@JsonProperty("IV_ITEM_NO")
	private String IV_ITEM_NO;

	@JsonProperty("IV_ARTICLE")
	private String IV_ARTICLE;

	@JsonProperty("IV_QUANTITY")
	private String IV_QUANTITY;

	@JsonProperty("IV_UOM")
	private String IV_UOM;

	@JsonProperty("IV_FLAG")
	private String IV_FLAG;

	public String getIV_PO_NO() {
		return IV_PO_NO;
	}

	public void setIV_PO_NO(String iV_PO_NO) {
		IV_PO_NO = iV_PO_NO;
	}

	public String getIV_ITEM_NO() {
		return IV_ITEM_NO;
	}

	public void setIV_ITEM_NO(String iV_ITEM_NO) {
		IV_ITEM_NO = iV_ITEM_NO;
	}

	public String getIV_ARTICLE() {
		return IV_ARTICLE;
	}

	public void setIV_ARTICLE(String iV_ARTICLE) {
		IV_ARTICLE = iV_ARTICLE;
	}

	public String getIV_QUANTITY() {
		return IV_QUANTITY;
	}

	public void setIV_QUANTITY(String iV_QUANTITY) {
		IV_QUANTITY = iV_QUANTITY;
	}

	public String getIV_UOM() {
		return IV_UOM;
	}

	public void setIV_UOM(String iV_UOM) {
		IV_UOM = iV_UOM;
	}

	public String getIV_FLAG() {
		return IV_FLAG;
	}

	public void setIV_FLAG(String iV_FLAG) {
		IV_FLAG = iV_FLAG;
	}

	public String getIV_PREQ_NO() {
		return IV_PREQ_NO;
	}

	public void setIV_PREQ_NO(String iV_PREQ_NO) {
		IV_PREQ_NO = iV_PREQ_NO;
	}

	public String getIV_DOC_TYPE() {
		return IV_DOC_TYPE;
	}

	public void setIV_DOC_TYPE(String iV_DOC_TYPE) {
		IV_DOC_TYPE = iV_DOC_TYPE;
	}

	public String getIV_ITEM_CAT() {
		return IV_ITEM_CAT;
	}

	public void setIV_ITEM_CAT(String iV_ITEM_CAT) {
		IV_ITEM_CAT = iV_ITEM_CAT;
	}

	public String getIV_RETURNS() {
		return IV_RETURNS;
	}

	public void setIV_RETURNS(String iV_RETURNS) {
		IV_RETURNS = iV_RETURNS;
	}

	public String getIV_PR_TYPE() {
		return IV_PR_TYPE;
	}

	public void setIV_PR_TYPE(String iV_PR_TYPE) {
		IV_PR_TYPE = iV_PR_TYPE;
	}

}
