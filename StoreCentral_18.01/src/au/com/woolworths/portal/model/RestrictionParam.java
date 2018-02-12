package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class RestrictionParam {
	
	public RestrictionParam() {
		super();
	}
	@JsonProperty("cmpDisplayQtyPer")
	private int cmpDisplayQtyPer;
	
	@JsonProperty("cmpBuildQuantity")
	private int cmpBuildQuantity;
	
	@JsonProperty("cmpStoreDemand")
	private int cmpStoreDemand;
	
	@JsonProperty("cmpBuildQuantityPer")
	private int cmpBuildQuantityPer;
	
	@JsonProperty("cmpDisplayQty")
	private int cmpDisplayQty;
	
	@JsonProperty("daysOut")
	private int daysOut;

	
	public RestrictionParam(int cmpDisplayQtyPer, int cmpBuildQuantity,
			int cmpStoreDemand, int cmpBuildQuantityPer, int cmpDisplayQty, int daysOut) {
		super();
		this.cmpDisplayQtyPer = cmpDisplayQtyPer;
		this.cmpBuildQuantity = cmpBuildQuantity;
		this.cmpStoreDemand = cmpStoreDemand;
		this.cmpBuildQuantityPer = cmpBuildQuantityPer;
		this.cmpDisplayQty = cmpDisplayQty;
		this.daysOut=daysOut;
	}
	
	
	
	
	public int getDaysOut() {
		return daysOut;
	}




	public void setDaysOut(int daysOut) {
		this.daysOut = daysOut;
	}




	public int getCmpDisplayQtyPer() {
		return cmpDisplayQtyPer;
	}
	public void setCmpDisplayQtyPer(int cmpDisplayQtyPer) {
		this.cmpDisplayQtyPer = cmpDisplayQtyPer;
	}
	public int getCmpBuildQuantity() {
		return cmpBuildQuantity;
	}
	public void setCmpBuildQuantity(int cmpBuildQuantity) {
		this.cmpBuildQuantity = cmpBuildQuantity;
	}
	public int getCmpStoreDemand() {
		return cmpStoreDemand;
	}
	public void setCmpStoreDemand(int cmpStoreDemand) {
		this.cmpStoreDemand = cmpStoreDemand;
	}
	public int getCmpBuildQuantityPer() {
		return cmpBuildQuantityPer;
	}
	public void setCmpBuildQuantityPer(int cmpBuildQuantityPer) {
		this.cmpBuildQuantityPer = cmpBuildQuantityPer;
	}
	public int getCmpDisplayQty() {
		return cmpDisplayQty;
	}
	public void setCmpDisplayQty(int cmpDisplayQty) {
		this.cmpDisplayQty = cmpDisplayQty;
	}
	
	
	
	
}
