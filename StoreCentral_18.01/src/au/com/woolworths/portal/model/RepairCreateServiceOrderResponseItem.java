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
public class RepairCreateServiceOrderResponseItem {


	@JsonProperty("results")
	private List<ServiceOrderArticles> serviceOrderArticlesList;

	/**
	 * @return the serviceOrderArticlesList
	 */
	public List<ServiceOrderArticles> getServiceOrderArticlesList() {
		return serviceOrderArticlesList;
	}

	/**
	 * @param serviceOrderArticlesList the serviceOrderArticlesList to set
	 */
	public void setServiceOrderArticlesList(
			List<ServiceOrderArticles> serviceOrderArticlesList) {
		this.serviceOrderArticlesList = serviceOrderArticlesList;
	}

}
