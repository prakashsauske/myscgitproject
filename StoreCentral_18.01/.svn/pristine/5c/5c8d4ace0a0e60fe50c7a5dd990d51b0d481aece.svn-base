package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticlePackBreakdown {

	@JsonProperty("parent")
	private String parent;
	@JsonProperty("pack")
	private String pack;
	@JsonProperty("breakdown")
	private String breakdown;
	@JsonProperty("description")
	private String description;
	@JsonProperty("scan_desc")
	private String scanDesc;

	@JsonProperty("pack_size")
	private String packSize;

	@JsonProperty("ean")
	private String ean;

	@JsonProperty("msg")
	private String msg;

	public String getPackSize() {
		return packSize;
	}

	public void setPackSize(String packSize) {
		this.packSize = packSize;
	}

	public String getEan() {
		return ean;
	}

	public void setEan(String ean) {
		this.ean = ean;
	}

	public String getParent() {
		if (parent != null) {
			parent = parent.replaceFirst("^0+(?!$)", "");
		}

		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getPack() {
		return pack;
	}

	public void setPack(String pack) {
		this.pack = pack;
	}

	public String getBreakdown() {
		if(this.breakdown!=null)
			return this.breakdown.replaceFirst("^0+(?!$)", "");
		return breakdown;
	}

	public void setBreakdown(String breakdown) {
		this.breakdown = breakdown;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getScanDesc() {
		return scanDesc;
	}

	public void setScanDesc(String scanDesc) {
		this.scanDesc = scanDesc;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

}
