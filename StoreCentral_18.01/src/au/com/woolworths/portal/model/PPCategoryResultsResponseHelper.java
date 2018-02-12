/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 *
 */
public class PPCategoryResultsResponseHelper {
	
	@JsonProperty("results")
	private List<PPCategoryResults> ppCategoryResults;

	/**
	 * @return the ppCategoryResults
	 */
	public List<PPCategoryResults> getPpCategoryResults() {
		return ppCategoryResults;
	}

	/**
	 * @param ppCategoryResults the ppCategoryResults to set
	 */
	public void setPpCategoryResults(List<PPCategoryResults> ppCategoryResults) {
		this.ppCategoryResults = ppCategoryResults;
	}


}
