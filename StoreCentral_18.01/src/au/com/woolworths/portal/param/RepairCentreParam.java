package au.com.woolworths.portal.param;

import java.util.ArrayList;
import java.util.List;

import au.com.woolworths.portal.model.ArticleSearchResults;

public class RepairCentreParam {

	private String message;
	private List<ArticleSearchResults> articleList = new ArrayList<ArticleSearchResults>();
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}
	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}
	/**
	 * @return the articleList
	 */
	public List<ArticleSearchResults> getArticleList() {
		return articleList;
	}
	/**
	 * @param articleList the articleList to set
	 */
	public void setArticleList(List<ArticleSearchResults> articleList) {
		this.articleList = articleList;
	}
	
}
