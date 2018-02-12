package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class inStorePromotionDisplayType {
	@JsonProperty("display_code")
	private String display_code;
	@JsonProperty("iv_site")
	private String iv_site;
	@JsonProperty("display_code_desc")
	private String display_code_desc;
	@JsonProperty("msg")
	private String msg;

	/**
	 * @return the display_code
	 */
	public String getDisplay_code() {
		return display_code;
	}

	/**
	 * @param display_code
	 *            the display_code to set
	 */
	public void setDisplay_code(String display_code) {
		this.display_code = display_code;
	}

	/**
	 * @return the iv_site
	 */
	public String getIv_site() {
		return iv_site;
	}

	/**
	 * @param iv_site
	 *            the iv_site to set
	 */
	public void setIv_site(String iv_site) {
		this.iv_site = iv_site;
	}

	/**
	 * @return the display_code_desc
	 */
	public String getDisplay_code_desc() {
		return display_code_desc;
	}

	/**
	 * @param display_code_desc
	 *            the display_code_desc to set
	 */
	public void setDisplay_code_desc(String display_code_desc) {
		this.display_code_desc = display_code_desc;
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
