package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleQuantityConversion {

	@JsonProperty("article")
	private String articleNo;

	@JsonProperty("qty_unit_code")
	private String quantityUnitCode;

	@JsonProperty("qty_content")
	private String quantityContent;

	@JsonProperty("corr_q_unit_code")
	private String correctQUnitCode;

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getQuantityUnitCode() {
		return quantityUnitCode;
	}

	public void setQuantityUnitCode(String quantityUnitCode) {
		this.quantityUnitCode = quantityUnitCode;
	}

	public String getQuantityContent() {
		return quantityContent;
	}

	public void setQuantityContent(String quantityContent) {
		this.quantityContent = quantityContent;
	}

	public String getCorrectQUnitCode() {
		return correctQUnitCode;
	}

	public void setCorrectQUnitCode(String correctQUnitCode) {
		this.correctQUnitCode = correctQUnitCode;
	}

	public String getCorrectQUnitContent() {
		return correctQUnitContent;
	}

	public void setCorrectQUnitContent(String correctQUnitContent) {
		this.correctQUnitContent = correctQUnitContent;
	}

	@JsonProperty("corr_q_content")
	private String correctQUnitContent;

}