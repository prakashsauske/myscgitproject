package au.com.woolworths.portal.param;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class DGReportParam {
	
	@JsonProperty("iv_session_id")
	private String iv_session_id;

	public String getIv_session_id() {
		return iv_session_id;
	}

	public void setIv_session_id(String iv_session_id) {
		this.iv_session_id = iv_session_id;
	}

	

}
