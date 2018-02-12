package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InStorePromoResponseList {
	
	@JsonProperty("ET_RETURN_MSG")
	private ArrayList<InStorePromoArticleList> articleList;

	/**
	 * @return the articleList
	 */
	public ArrayList<InStorePromoArticleList> getArticleList() {
		return articleList;
	}

	/**
	 * @param articleList the articleList to set
	 */
	public void setArticleList(ArrayList<InStorePromoArticleList> articleList) {
		this.articleList = articleList;
	}

	
}
