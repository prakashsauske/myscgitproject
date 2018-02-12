package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class AQMReasonCodeResponseHelper {

	@JsonProperty("results")
	private List<AQMReasonCode> aQMReasonCodeList;

	public List<AQMReasonCode> getaQMReasonCodeList() {
		return aQMReasonCodeList;
	}

	public void setaQMReasonCodeList(List<AQMReasonCode> aQMReasonCodeList) {
		this.aQMReasonCodeList = aQMReasonCodeList;
	}

}
