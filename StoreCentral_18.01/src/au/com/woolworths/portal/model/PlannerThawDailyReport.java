package au.com.woolworths.portal.model;

public class PlannerThawDailyReport {
	
	private String article;
	
	private String description;
	
	private String forecast;
	
	private String productLife;
	
	public PlannerThawDailyReport(){
		this.article = "";
		this.description = "";
		this.forecast = "";
		this.productLife = "";
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getForecast() {
		return forecast;
	}

	public void setForecast(String forecast) {
		this.forecast = forecast;
	}

	public String getProductLife() {
		return productLife;
	}

	public void setProductLife(String productLife) {
		this.productLife = productLife;
	}

}
