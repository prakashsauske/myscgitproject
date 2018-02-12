package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Promotions {

	@JsonProperty("promoNumber")
	private String promoNumber;

	@JsonProperty("promoArticleList")
	private List<PromoArticle> promoArticleList;
	// private String promoSearchCriteria;

	@JsonProperty("promoType")
	private String promoType;

	@JsonProperty("promoCalendar")
	private PromoCalendar promoCalendar;

	@JsonProperty("promoStartDate")
	private String promoStartDate;

	@JsonProperty("promoEndDate")
	private String promoEndDate;

	@JsonProperty("promoTotalWeeks")
	private String promoTotalWeeks;

	@JsonProperty("promoCurrentWeek")
	private String promoCurrentWeek;

	public String getPromoNumber() {
		return promoNumber;
	}

	public void setPromoNumber(String promoNumber) {
		this.promoNumber = promoNumber;
	}

	public List<PromoArticle> getPromoArticleList() {
		return promoArticleList;
	}

	public void setPromoArticleList(List<PromoArticle> promoArticleList) {
		this.promoArticleList = promoArticleList;
	}

	/*
	 * public String getPromoSearchCriteria() { return promoSearchCriteria; }
	 * public void setPromoSearchCriteria(String promoSearchCriteria) {
	 * this.promoSearchCriteria = promoSearchCriteria; }
	 */
	public String getPromoType() {
		return promoType;
	}

	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	public PromoCalendar getPromoCalendar() {
		return promoCalendar;
	}

	public void setPromoCalendar(PromoCalendar promoCalendar) {
		this.promoCalendar = promoCalendar;
	}

	public String getPromoStartDate() {
		return promoStartDate;
	}

	public void setPromoStartDate(String promoStartDate) {
		this.promoStartDate = promoStartDate;
	}

	public String getPromoEndDate() {
		return promoEndDate;
	}

	public void setPromoEndDate(String promoEndDate) {
		this.promoEndDate = promoEndDate;
	}

	public String getPromoTotalWeeks() {
		return promoTotalWeeks;
	}

	public void setPromoTotalWeeks(String promoTotalWeeks) {
		this.promoTotalWeeks = promoTotalWeeks;
	}

	public String getPromoCurrentWeek() {
		return promoCurrentWeek;
	}

	public void setPromoCurrentWeek(String promoCurrentWeek) {
		this.promoCurrentWeek = promoCurrentWeek;
	}

}
