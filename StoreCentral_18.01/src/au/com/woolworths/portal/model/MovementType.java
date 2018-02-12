package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class MovementType {

	@JsonProperty("iv_mvmt_type")
	private String inputMvmtType;
	@JsonProperty("msg")
	private String msg;
	@JsonProperty("mvmt_type")
	private String mvmtType;
	@JsonProperty("mvmt_type_desc")
	private String mvmtTypeDesc;
	@JsonProperty("iv_source")
	private String source;

	@JsonProperty("indicator")
	private String indicator;

	public String getIndicator() {
		return indicator;
	}

	public void setIndicator(String indicator) {
		this.indicator = indicator;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

	public String getInputMvmtType() {
		return inputMvmtType;
	}

	public void setInputMvmtType(String inputMvmtType) {
		this.inputMvmtType = inputMvmtType;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getMvmtType() {
		return mvmtType;
	}

	public void setMvmtType(String mvmtType) {
		this.mvmtType = mvmtType;
	}

	public String getMvmtTypeDesc() {
		return mvmtTypeDesc;
	}

	public void setMvmtTypeDesc(String mvmtTypeDesc) {
		this.mvmtTypeDesc = mvmtTypeDesc;
	}

}
