package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xprnx
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class ClaimsPrintResult {

	@JsonProperty("article")
	private String article;
	
	@JsonProperty("description")
	private String description;
	
	@JsonProperty("qty")
	private String qty;
	
	@JsonProperty("claimNo")
	private String claimNo;
	
	@JsonProperty("cartonCount")
	private String cartonCount;
	
	@JsonProperty("totalCount")
	private String totalCount;
	
	public ClaimsPrintResult(){
		
	}

	public ClaimsPrintResult(String claimNo, String cartonCount,
			String totalCount) {
		super();
		this.claimNo = claimNo;
		this.cartonCount = cartonCount;
		this.totalCount = totalCount;
	}

	public String getClaimNo() {
		return claimNo;
	}

	public void setClaimNo(String claimNo) {
		this.claimNo = claimNo;
	}

	public String getCartonCount() {
		return cartonCount;
	}

	public void setCartonCount(String cartonCount) {
		this.cartonCount = cartonCount;
	}

	public String getTotalCount() {
		return totalCount;
	}

	public void setTotalCount(String totalCount) {
		this.totalCount = totalCount;
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

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}
	
}
