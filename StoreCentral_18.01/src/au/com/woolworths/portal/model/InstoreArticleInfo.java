package au.com.woolworths.portal.model;

import java.util.ArrayList;
import java.util.List;

public class InstoreArticleInfo {
 private String message;
 private List<ArticleDetail> articleList;
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
public List<ArticleDetail> getArticleList() {
	return articleList;
}
/**
 * @param articleList the articleList to set
 */
public void setArticleList(List<ArticleDetail> articleList) {
	this.articleList = articleList;
}
 
}
