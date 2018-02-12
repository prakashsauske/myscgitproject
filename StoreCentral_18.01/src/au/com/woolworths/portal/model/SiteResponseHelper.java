package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class SiteResponseHelper {
	@JsonProperty("results")
	private List<Site> sites;

	@JsonProperty("results")
	public List<Site> getSites() {
		return sites;
	}

	@JsonProperty("results")
	public void setSites(List<Site> sites) {
		this.sites = sites;
	}

}
