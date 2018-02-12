package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LinkedArticleData {

	@JsonProperty("article")
	private String article;

	@JsonProperty("linkage_factor")
	private String linkageFactor;

	@JsonProperty("om")
	private String om;

	/*
	 * @JsonProperty("linked_article") private String linkedArticle;
	 */

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("relation")
	private String relation;

	@JsonProperty("article_desc")
	private String article_desc;

	@JsonProperty("uom")
	private String uom;

	/**
	 * @return the linkageFactor
	 */
	public String getLinkageFactor() {
		return linkageFactor;
	}

	/**
	 * @param linkageFactor
	 *            the linkageFactor to set
	 */
	public void setLinkageFactor(String linkageFactor) {
		this.linkageFactor = linkageFactor;
	}

	/**
	 * @return the om
	 */
	public String getOm() {
		return om;
	}

	/**
	 * @param om
	 *            the om to set
	 */
	public void setOm(String om) {
		this.om = om;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the relation
	 */
	public String getRelation() {
		return relation;
	}

	/**
	 * @param relation
	 *            the relation to set
	 */
	public void setRelation(String relation) {
		this.relation = relation;
	}

	/**
	 * @return the article_desc
	 */
	public String getArticle_desc() {
		return article_desc;
	}

	/**
	 * @param article_desc
	 *            the article_desc to set
	 */
	public void setArticle_desc(String article_desc) {
		this.article_desc = article_desc;
	}

	/**
	 * @return the uom
	 */
	public String getUom() {
		return uom;
	}

	/**
	 * @param uom
	 *            the uom to set
	 */
	public void setUom(String uom) {
		this.uom = uom;
	}

	/**
	 * @return the article
	 */
	public String getArticle() {
		return article;
	}

	/**
	 * @param article
	 *            the article to set
	 */
	public void setArticle(String article) {
		this.article = article;
	}

}
