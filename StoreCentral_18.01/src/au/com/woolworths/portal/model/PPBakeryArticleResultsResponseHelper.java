/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class PPBakeryArticleResultsResponseHelper {

	@JsonProperty("PPItems")
	private PPBakeryArticleResponseItems ppArticleResponseItems;

	/**
	 * @return the ppArticleResponseItems
	 */
	public PPBakeryArticleResponseItems getPpArticleResponseItems() {
		return ppArticleResponseItems;
	}

	/**
	 * @param ppArticleResponseItems the ppArticleResponseItems to set
	 */
	public void setPpArticleResponseItems(
			PPBakeryArticleResponseItems ppArticleResponseItems) {
		this.ppArticleResponseItems = ppArticleResponseItems;
	}
	

	
}
