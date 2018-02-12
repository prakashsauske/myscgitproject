package au.com.woolworths.portal.model;

import java.util.List;
import java.util.Map;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.param.PromotionsPlanningParam;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromSearchResult {

	@JsonProperty("promotions")
	private List<Promotions> promotions;

	private PromotionsPlanningParam promoSearchCriteria;

	@JsonProperty("promMediaList")
	private List<PromoMedia> promMediaList;

	@JsonProperty("categories")
	private Map<String, List<PromCategory>> categories;

	@JsonProperty("subCategories")
	private List<PromoArticleInfo> subCategories;

	@JsonProperty("displayTypes")
	private List<PromoDisplayType> displayTypes;

	@JsonProperty("subDisplayTypes")
	private List<PromoDisplayType> subDisplayTypes;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("count")
	private Integer count;

	@JsonProperty("articleList")
	private Map<String, List<String>> articleList;

	@JsonProperty("promArticleList")
	private List<PromoArticle> promArticleList;

	@JsonProperty("lockFlag")
	private String lockFlag;

	@JsonProperty("autoForeFlag")
	private String autoForeFlag;
	
	@JsonProperty("deptSentInLock")
	private String deptSentInLock;

	@JsonProperty("promoSearchResultMetadataMap")
	private Map<String, List<PromoSearchResultMetadata>> promoSearchResultMetadataMap;

	@JsonProperty("promoDisplayTypeMap")
	private Map<String, List<PromoDisplayType>> promoDisplayTypeMap;

	public List<Promotions> getPromotions() {
		return promotions;
	}

	public void setPromotions(List<Promotions> promotions) {
		this.promotions = promotions;
	}

	public PromotionsPlanningParam getPromoSearchCriteria() {
		return promoSearchCriteria;
	}

	public void setPromoSearchCriteria(
			PromotionsPlanningParam promoSearchCriteria) {
		this.promoSearchCriteria = promoSearchCriteria;
	}

	public List<PromoMedia> getPromMediaList() {
		return promMediaList;
	}

	public void setPromMediaList(List<PromoMedia> promMediaList) {
		this.promMediaList = promMediaList;
	}

	public Map<String, List<PromCategory>> getCategories() {
		return categories;
	}

	public void setCategories(Map<String, List<PromCategory>> categories) {
		this.categories = categories;
	}

	public List<PromoArticleInfo> getSubCategories() {
		return subCategories;
	}

	public void setSubCategories(List<PromoArticleInfo> subCategories) {
		this.subCategories = subCategories;
	}

	public List<PromoDisplayType> getDisplayTypes() {
		return displayTypes;
	}

	public void setDisplayTypes(List<PromoDisplayType> displayTypes) {
		this.displayTypes = displayTypes;
	}

	public List<PromoDisplayType> getSubDisplayTypes() {
		return subDisplayTypes;
	}

	public void setSubDisplayTypes(List<PromoDisplayType> subDisplayTypes) {
		this.subDisplayTypes = subDisplayTypes;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Map<String, List<String>> getArticleList() {
		return articleList;
	}

	public void setArticleList(Map<String, List<String>> articleList) {
		this.articleList = articleList;
	}

	public List<PromoArticle> getPromArticleList() {
		return promArticleList;
	}

	public void setPromArticleList(List<PromoArticle> promArticleList) {
		this.promArticleList = promArticleList;
	}

	public Map<String, List<PromoSearchResultMetadata>> getPromoSearchResultMetadataMap() {
		return promoSearchResultMetadataMap;
	}

	public void setPromoSearchResultMetadataMap(
			Map<String, List<PromoSearchResultMetadata>> promoSearchResultMetadataMap) {
		this.promoSearchResultMetadataMap = promoSearchResultMetadataMap;
	}

	public Integer getCount() {
		return count;
	}

	public void setCount(Integer count) {
		this.count = count;
	}

	public String getLockFlag() {
		return lockFlag;
	}

	public void setLockFlag(String lockFlag) {
		this.lockFlag = lockFlag;
	}

	public String getAutoForeFlag() {
		return autoForeFlag;
	}

	public void setAutoForeFlag(String autoForeFlag) {
		this.autoForeFlag = autoForeFlag;
	}

	/**
	 * @return the promoDisplayTypeMap
	 */
	public Map<String, List<PromoDisplayType>> getPromoDisplayTypeMap() {
		return promoDisplayTypeMap;
	}

	/**
	 * @param promoDisplayTypeMap
	 *            the promoDisplayTypeMap to set
	 */
	public void setPromoDisplayTypeMap(
			Map<String, List<PromoDisplayType>> promoDisplayTypeMap) {
		this.promoDisplayTypeMap = promoDisplayTypeMap;
	}

	public String getDeptSentInLock() {
		return deptSentInLock;
	}

	public void setDeptSentInLock(String deptSentInLock) {
		this.deptSentInLock = deptSentInLock;
	}

}
