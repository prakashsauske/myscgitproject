package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleGtinInfo {

	@JsonProperty("article")
	private String articleNo;

	@JsonProperty("alt_uom")
	private String altUom;

	@JsonProperty("alt_tun")
	private String altTUN;

	@JsonProperty("numtp_desc")
	private String numpDesc;

	@JsonProperty("plu")
	private String PLU;

	@JsonProperty("ean11")
	private String ean11;

	@JsonProperty("numtp")
	private String numtp;

	@JsonProperty("alt_uom_desc")
	private String altUomDesc;

	public String getAltTUN() {
		return altTUN;
	}

	public void setAltTUN(String altTUN) {
		this.altTUN = altTUN;
	}

	public String getNumpDesc() {
		return numpDesc;
	}

	public void setNumpDesc(String numpDesc) {
		this.numpDesc = numpDesc;
	}

	public String getPLU() {
		return PLU;
	}

	public void setPLU(String pLU) {
		PLU = pLU;
	}

	public String getMainEAN() {
		return mainEAN;
	}

	public void setMainEAN(String mainEAN) {
		this.mainEAN = mainEAN;
	}

	public String getMainTUN() {
		return mainTUN;
	}

	public void setMainTUN(String mainTUN) {
		this.mainTUN = mainTUN;
	}

	@JsonProperty("base_uom")
	private String baseUom;

	@JsonProperty("main_ean")
	private String mainEAN;

	@JsonProperty("main_tun")
	private String mainTUN;

	private String articleEAN;

	private String altEAN;

	public String getAltEAN() {

		if (!"X".equalsIgnoreCase(mainEAN) && !"X".equalsIgnoreCase(PLU)
				&& !"X".equalsIgnoreCase(mainTUN)
				&& !"X".equalsIgnoreCase(altTUN)

		) {
			altEAN = "X";
		}

		return altEAN;
	}

	public void setAltEAN(String altEAN) {
		this.altEAN = altEAN;
	}

	public String getArticleEAN() {
		return articleEAN;
	}

	public void setArticleEAN(String articleEAN) {
		this.articleEAN = articleEAN;
	}

	public String getAltUomDesc() {
		return altUomDesc;
	}

	public void setAltUomDesc(String altUomDesc) {
		this.altUomDesc = altUomDesc;
	}

	public String getBaseUom() {
		if (null == baseUom || baseUom.trim().length() == 0) {
			return baseUom;
		}

		System.err.println(baseUom + " --- " + ean11);

		baseUom = "Y".equalsIgnoreCase(baseUom)
				|| "Yes".equalsIgnoreCase(baseUom) ? "Yes" : "No";

		return baseUom;
	}

	public void setBaseUom(String baseUom) {
		this.baseUom = baseUom;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getAltUom() {
		return altUom;
	}

	public void setAltUom(String altUom) {
		this.altUom = altUom;
	}

	public String getEan11() {
		return ean11;
	}

	public void setEan11(String ean11) {
		this.ean11 = ean11;
	}

	public String getNumtp() {
		return numtp;
	}

	public void setNumtp(String numtp) {
		this.numtp = numtp;
	}

}
