package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromoDisplayType {

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("displayTypeCode")
	private String displayTypeCode;

	@JsonProperty("displayTypeDesc")
	private String displayTypeDesc;

	@JsonProperty("displayAlpha")
	private String displayAlpha;

	@JsonProperty("displayType")
	private String displayType;

	public PromoDisplayType(String displayTypeCode, String displayTypeDesc) {
		super();
		this.displayTypeCode = displayTypeCode;
		this.displayTypeDesc = displayTypeDesc;
	}

	public PromoDisplayType() {

	}

	public String getDisplayTypeCode() {
		return displayTypeCode;
	}

	public void setDisplayTypeCode(String displayTypeCode) {
		this.displayTypeCode = displayTypeCode;
	}

	public String getDisplayTypeDesc() {
		return displayTypeDesc;
	}

	public void setDisplayTypeDesc(String displayTypeDesc) {
		this.displayTypeDesc = displayTypeDesc;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getDisplayAlpha() {
		return displayAlpha;
	}

	public void setDisplayAlpha(String displayAlpha) {
		this.displayAlpha = displayAlpha;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

}
