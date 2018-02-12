package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POGDataExtractResponse {

	@JsonProperty("d")
	private POGDataExtractResponseHelper pogDataExtractResponseHelper;

	public POGDataExtractResponseHelper getPogDataExtractResponseHelper() {
		return pogDataExtractResponseHelper;
	}

	public void setPogDataExtractResponseHelper(
			POGDataExtractResponseHelper pogDataExtractResponseHelper) {
		this.pogDataExtractResponseHelper = pogDataExtractResponseHelper;
	}

}
