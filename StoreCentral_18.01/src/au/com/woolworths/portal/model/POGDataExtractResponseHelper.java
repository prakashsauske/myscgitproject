package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class POGDataExtractResponseHelper {
	@JsonProperty("results")
	private List<POGDataExtract> pogDataExtract;

	public List<POGDataExtract> getPogDataExtract() {
		return pogDataExtract;
	}

	public void setPogDataExtract(List<POGDataExtract> pogDataExtract) {
		this.pogDataExtract = pogDataExtract;
	}

}
