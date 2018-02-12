package au.com.woolworths.portal.model;

import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CompetitorDtl {

	@JsonProperty("competitor_name")
	private String competitor_name;

	@JsonProperty("competitor_no")
	private String competitor_no;

	/**
	 * @return the competitor_name
	 */
	public String getCompetitor_name() {
		return competitor_name;
	}

	/**
	 * @param competitor_name the competitor_name to set
	 */
	public void setCompetitor_name(String competitor_name) {
		this.competitor_name = competitor_name;
	}

	/**
	 * @return the competitor_no
	 */
	public String getCompetitor_no() {
		return competitor_no;
	}

	/**
	 * @param competitor_no the competitor_no to set
	 */
	public void setCompetitor_no(String competitor_no) {
		this.competitor_no = competitor_no;
	}

	

}
