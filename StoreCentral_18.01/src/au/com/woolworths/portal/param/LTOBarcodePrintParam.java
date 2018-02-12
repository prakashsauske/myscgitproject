package au.com.woolworths.portal.param;

import java.util.ArrayList;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.LTOPrintBarcodeResult;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LTOBarcodePrintParam {
	
	@JsonProperty("reportResult")
	private ArrayList<LTOPrintBarcodeResult> resultList;

	public ArrayList<LTOPrintBarcodeResult> getResultList() {
		return resultList;
	}
	public void setResultList(ArrayList<LTOPrintBarcodeResult> resultList) {
		this.resultList = resultList;
	}
	@JsonProperty("barcode")
	private String barcode;
	
	@JsonProperty("barcodeText")
	private String barcodeText;
	
	@JsonProperty("locationDesc")
	private String locationDesc;
	
	@JsonProperty("location")
	private String location;
	
	@JsonProperty("aisle")
	private String aisle;
	
	@JsonProperty("logo")
	private String logo;

	@JsonProperty("RC")
	private String RC;

	@JsonProperty("firstAisle")
	private String firstAisle;

	@JsonProperty("ltoId")
	private String ltoId;

	@JsonProperty("banner")
	private String ltoBarcodeBanner;
	
	@JsonProperty("subCategory")
	private String subCategory;
	
	@JsonProperty("Category")
	private String Category;

	public String getCategory() {
		return Category;
	}

	public void setCategory(String category) {
		Category = category;
	}

	public String getSubCategory() {
		return subCategory;
	}

	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public String getBarcodeText() {
		return barcodeText;
	}

	public void setBarcodeText(String barcodeText) {
		this.barcodeText = barcodeText;
	}

	public String getLocationDesc() {
		return locationDesc;
	}

	public void setLocationDesc(String locationDesc) {
		this.locationDesc = locationDesc;
	}

	public String getLocation() {
		return location;
	}

	public void setLocation(String location) {
		this.location = location;
	}

	public String getAisle() {
		return aisle;
	}

	public void setAisle(String aisle) {
		this.aisle = aisle;
	}

	public String getLogo() {
		return logo;
	}

	public void setLogo(String logo) {
		this.logo = logo;
	}

	public String getLtoBarcodeBanner() {
		return ltoBarcodeBanner;
	}

	public void setLtoBarcodeBanner(String ltoBarcodeBanner) {
		this.ltoBarcodeBanner = ltoBarcodeBanner;
	}

	public String getRC() {
		return RC;
	}

	public void setRC(String rC) {
		RC = rC;
	}

	public String getFirstAisle() {
		return firstAisle;
	}

	public void setFirstAisle(String firstAisle) {
		this.firstAisle = firstAisle;
	}

	public String getLtoId() {
		return ltoId;
	}

	public void setLtoId(String ltoId) {
		this.ltoId = ltoId;
	}

}
