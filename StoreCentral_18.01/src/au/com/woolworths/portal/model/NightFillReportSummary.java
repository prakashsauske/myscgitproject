package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillReportSummary {

	@JsonProperty("ID")
	private String id;
	
	@JsonProperty("TotaledProperties")
	private String totalProperties;
	
	
	
	@JsonProperty("RDEPT")
	private String departmentNumber;

	@JsonProperty("RDEPT_T")
	private String departmentName;
	
	@JsonProperty("A7YUV5W359XPW1D4BSUFJP8PAC")
	private String totalCartonsOfLoadForecast;
	
	@JsonProperty("A7YUV5W359XPW1D4BSUFJP8PAC_F")
	private String totalCartonsOfLoadForecastFormatted;
	
	
	@JsonProperty("A7YUV5W359XPW1DT4CGCD1OB2C")
	private String noOfBulkCartons;
	
	@JsonProperty("A7YUV5W359XPW1DT4CGCD1OB2C_F")
	private String noOfBulkCartonsFormatted;
	
	@JsonProperty("A7YUV5W359XPW1D4BSUFK22HHG")
	private String noOfPromotionalCartons;

	@JsonProperty("A7YUV5W359XPW1D4BSUFK22HHG_F")
	private String noOfPromotionalCartonsFormatted;
	
	@JsonProperty("B0ZI8KYVSWSLBG17JO1LC35S2")
	private String noOfAdvertCartons;
	
	@JsonProperty("B0ZI8KYVSWSLBG17JO1LC35S2_F")
	private String noOfAdvertCartonsFormatted;
	
	@JsonProperty("B0ZI8KYVSWSLBG17JO1L4TJIA")
	private String noOfJobBuysCartons;

	@JsonProperty("B0ZI8KYVSWSLBG17JO1L4TJIA_F")
	private String noOfJobBuysCartonsFormatted;
	
	
	@JsonProperty("A7YUV5W359XPXRNIJRILLQRZES")
	private String cartonsToBeFilled;
	
	@JsonProperty("A7YUV5W359XPXRNIJRILLQRZES_F")
	private String cartonsToBeFilledFormatted;
	
	@JsonProperty("A7YUV5W359XPXRNIJRILMMA8ZO")
	private String noOfExcessCartons;

	@JsonProperty("A7YUV5W359XPXRNIJRILMMA8ZO_F")
	private String noOfExcessCartonsFormatted;
	
	@JsonProperty("A0SUPP_PLANT")
	private String wareHouseNumber;

	@JsonProperty("A0SUPP_PLANT_T")
	private String wareHouseName;
	

	//Start of newly added JSON Property
	
	@JsonProperty("id")
	private String id_m;
	
	@JsonProperty("totalProperties")
	private String totalProperties_m;
	
	
	
	@JsonProperty("departmentNumber")
	private String departmentNumber_m;

	@JsonProperty("departmentName")
	private String departmentName_m;
	
	@JsonProperty("totalCartonsOfLoadForecast")
	private String totalCartonsOfLoadForecast_m;
	
	@JsonProperty("totalCartonsOfLoadForecastFormatted")
	private String totalCartonsOfLoadForecastFormatted_m;
	
	
	@JsonProperty("noOfBulkCartons")
	private String noOfBulkCartons_m;
	
	@JsonProperty("noOfBulkCartonsFormatted")
	private String noOfBulkCartonsFormatted_m;
	
	@JsonProperty("noOfPromotionalCartons")
	private String noOfPromotionalCartons_m;

	@JsonProperty("noOfPromotionalCartonsFormatted")
	private String noOfPromotionalCartonsFormatted_m;
	
	@JsonProperty("noOfAdvertCartons")
	private String noOfAdvertCartons_m;
	
	@JsonProperty("noOfAdvertCartonsFormatted")
	private String noOfAdvertCartonsFormatted_m;
	
	@JsonProperty("noOfJobBuysCartons")
	private String noOfJobBuysCartons_m;

	@JsonProperty("noOfJobBuysFormatted")
	private String noOfJobBuysFormatted_m;
	
	
	@JsonProperty("cartonsToBeFilled")
	private String cartonsToBeFilled_m;
	
	@JsonProperty("cartonsToBeFilledFormatted")
	private String cartonsToBeFilledFormatted_m;
	
	@JsonProperty("noOfExcessCartons")
	private String noOfExcessCartons_m;

	@JsonProperty("noOfExcessCartonsFormatted")
	private String noOfExcessCartonsFormatted_m;
	
	@JsonProperty("wareHouseNumber")
	private String wareHouseNumber_m;

	@JsonProperty("wareHouseName")
	private String wareHouseName_m;
	
	
	/**
	 * @param id
	 * @param totalProperties
	 * @param departmentNumber
	 * @param departmentName
	 * @param totalCartonsOfLoadForecast
	 * @param totalCartonsOfLoadForecastFormatted
	 * @param noOfBulkCartons
	 * @param noOfBulkCartonsFormatted
	 * @param noOfPromotionalCartons
	 * @param noOfPromotionalCartonsFormatted
	 * @param noOfAdvertCartons
	 * @param noOfAdvertCartonsFormatted
	 * @param noOfJobBuysCartons
	 * @param noOfJobBuysCartonsFormatted
	 * @param cartonsToBeFilled
	 * @param cartonsToBeFilledFormatted
	 * @param noOfExcessCartons
	 * @param noOfExcessCartonsFormatted
	 * @param wareHouseNumber
	 * @param wareHouseName
	 */
	public NightFillReportSummary(@JsonProperty("ID") String id,@JsonProperty("TotaledProperties") String totalProperties,
			@JsonProperty("RDEPT") String departmentNumber,@JsonProperty("RDEPT_T") String departmentName,
			@JsonProperty("A7YUV5W359XPW1D4BSUFJP8PAC") String totalCartonsOfLoadForecast,
			@JsonProperty("A7YUV5W359XPW1D4BSUFJP8PAC_F") String totalCartonsOfLoadForecastFormatted,@JsonProperty("A7YUV5W359XPW1DT4CGCD1OB2C") String noOfBulkCartons,
			@JsonProperty("A7YUV5W359XPW1DT4CGCD1OB2C_F") String noOfBulkCartonsFormatted,@JsonProperty("A7YUV5W359XPW1D4BSUFK22HHG") String noOfPromotionalCartons,
			@JsonProperty("A7YUV5W359XPW1D4BSUFK22HHG_F") String noOfPromotionalCartonsFormatted,@JsonProperty("B0ZI8KYVSWSLBG17JO1LC35S2") String noOfAdvertCartons,
			@JsonProperty("B0ZI8KYVSWSLBG17JO1LC35S2_F") String noOfAdvertCartonsFormatted,@JsonProperty("B0ZI8KYVSWSLBG17JO1L4TJIA") String noOfJobBuysCartons,
			@JsonProperty("B0ZI8KYVSWSLBG17JO1L4TJIA_F") String noOfJobBuysCartonsFormatted,@JsonProperty("A7YUV5W359XPXRNIJRILLQRZES") String cartonsToBeFilled,
			@JsonProperty("A7YUV5W359XPXRNIJRILLQRZES_F") String cartonsToBeFilledFormatted,@JsonProperty("A7YUV5W359XPXRNIJRILMMA8ZO") String noOfExcessCartons,
			@JsonProperty("A7YUV5W359XPXRNIJRILMMA8ZO_F") String noOfExcessCartonsFormatted,@JsonProperty("A0SUPP_PLANT") String wareHouseNumber,
			@JsonProperty("A0SUPP_PLANT_T") String wareHouseName) {
		
		
		//super();
		this.id = id;
		this.totalProperties = totalProperties;
		this.departmentNumber = departmentNumber;
		this.departmentName = departmentName;
		this.totalCartonsOfLoadForecast = totalCartonsOfLoadForecast;
		this.totalCartonsOfLoadForecastFormatted = totalCartonsOfLoadForecastFormatted;
		this.noOfBulkCartons = noOfBulkCartons;
		this.noOfBulkCartonsFormatted = noOfBulkCartonsFormatted;
		this.noOfPromotionalCartons = noOfPromotionalCartons;
		this.noOfPromotionalCartonsFormatted = noOfPromotionalCartonsFormatted;
		this.noOfAdvertCartons = noOfAdvertCartons;
		this.noOfAdvertCartonsFormatted = noOfAdvertCartonsFormatted;
		this.noOfJobBuysCartons = noOfJobBuysCartons;
		this.noOfJobBuysCartonsFormatted = noOfJobBuysCartonsFormatted;
		this.cartonsToBeFilled = cartonsToBeFilled;
		this.cartonsToBeFilledFormatted = cartonsToBeFilledFormatted;
		this.noOfExcessCartons = noOfExcessCartons;
		this.noOfExcessCartonsFormatted = noOfExcessCartonsFormatted;
		this.wareHouseNumber = wareHouseNumber;
		this.wareHouseName = wareHouseName;
		
		this.id_m = id;
		this.totalProperties_m = totalProperties;
		this.departmentNumber_m = departmentNumber;
		this.departmentName_m = departmentName;
		this.totalCartonsOfLoadForecast_m = totalCartonsOfLoadForecast;
		this.totalCartonsOfLoadForecastFormatted_m = totalCartonsOfLoadForecastFormatted;
		this.noOfBulkCartons_m = noOfBulkCartons;
		this.noOfBulkCartonsFormatted_m = noOfBulkCartonsFormatted;
		this.noOfPromotionalCartons_m = noOfPromotionalCartons;
		this.noOfPromotionalCartonsFormatted_m = noOfPromotionalCartonsFormatted;
		this.noOfAdvertCartons = noOfAdvertCartons;
		this.noOfAdvertCartonsFormatted = noOfAdvertCartonsFormatted;
		this.noOfJobBuysCartons = noOfJobBuysCartons;
		this.noOfJobBuysCartonsFormatted = noOfJobBuysCartonsFormatted;
		this.cartonsToBeFilled_m = cartonsToBeFilled;
		this.cartonsToBeFilledFormatted_m = cartonsToBeFilledFormatted;
		this.noOfExcessCartons_m = noOfExcessCartons;
		this.noOfExcessCartonsFormatted_m = noOfExcessCartonsFormatted;
		this.wareHouseNumber_m = wareHouseNumber;
		this.wareHouseName_m = wareHouseName;
	}

	
	//End of Newly Added JSON Property
	/**
	 * @return the wareHouseNumber
	 */
	public String getWareHouseNumber() {
		return wareHouseNumber;
	}

	/**
	 * @param wareHouseNumber the wareHouseNumber to set
	 */
	public void setWareHouseNumber(String wareHouseNumber) {
		this.wareHouseNumber = wareHouseNumber;
	}

	/**
	 * @return the wareHouseName
	 */
	public String getWareHouseName() {
		return wareHouseName;
	}

	/**
	 * @param wareHouseName the wareHouseName to set
	 */
	public void setWareHouseName(String wareHouseName) {
		this.wareHouseName = wareHouseName;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id the id to set
	 */
	public void setId(String id) {
		this.id = id;
	}

	/**
	 * @return the totalProperties
	 */
	public String getTotalProperties() {
		return totalProperties;
	}

	/**
	 * @param totalProperties the totalProperties to set
	 */
	public void setTotalProperties(String totalProperties) {
		this.totalProperties = totalProperties;
	}

	/**
	 * @return the departmentNumber
	 */
	public String getDepartmentNumber() {
		return departmentNumber;
	}

	/**
	 * @param departmentNumber the departmentNumber to set
	 */
	public void setDepartmentNumber(String departmentNumber) {
		this.departmentNumber = departmentNumber;
	}

	/**
	 * @return the departmentName
	 */
	public String getDepartmentName() {
		return departmentName;
	}

	/**
	 * @param departmentName the departmentName to set
	 */
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	/**
	 * @return the totalCartonsOfLoadForecast
	 */
	public String getTotalCartonsOfLoadForecast() {
		return totalCartonsOfLoadForecast;
	}

	/**
	 * @param totalCartonsOfLoadForecast the totalCartonsOfLoadForecast to set
	 */
	public void setTotalCartonsOfLoadForecast(String totalCartonsOfLoadForecast) {
		this.totalCartonsOfLoadForecast = totalCartonsOfLoadForecast;
	}

	/**
	 * @return the totalCartonsOfLoadForecastFormatted
	 */
	public String getTotalCartonsOfLoadForecastFormatted() {
		return totalCartonsOfLoadForecastFormatted;
	}

	/**
	 * @param totalCartonsOfLoadForecastFormatted the totalCartonsOfLoadForecastFormatted to set
	 */
	public void setTotalCartonsOfLoadForecastFormatted(
			String totalCartonsOfLoadForecastFormatted) {
		this.totalCartonsOfLoadForecastFormatted = totalCartonsOfLoadForecastFormatted;
	}

	/**
	 * @return the noOfBulkCartons
	 */
	public String getNoOfBulkCartons() {
		return noOfBulkCartons;
	}

	/**
	 * @param noOfBulkCartons the noOfBulkCartons to set
	 */
	public void setNoOfBulkCartons(String noOfBulkCartons) {
		this.noOfBulkCartons = noOfBulkCartons;
	}

	/**
	 * @return the noOfBulkCartonsFormatted
	 */
	public String getNoOfBulkCartonsFormatted() {
		return noOfBulkCartonsFormatted;
	}

	/**
	 * @param noOfBulkCartonsFormatted the noOfBulkCartonsFormatted to set
	 */
	public void setNoOfBulkCartonsFormatted(String noOfBulkCartonsFormatted) {
		this.noOfBulkCartonsFormatted = noOfBulkCartonsFormatted;
	}

	/**
	 * @return the noOfPromotionalCartons
	 */
	public String getNoOfPromotionalCartons() {
		return noOfPromotionalCartons;
	}

	/**
	 * @param noOfPromotionalCartons the noOfPromotionalCartons to set
	 */
	public void setNoOfPromotionalCartons(String noOfPromotionalCartons) {
		this.noOfPromotionalCartons = noOfPromotionalCartons;
	}

	/**
	 * @return the noOfPromotionalCartonsFormatted
	 */
	public String getNoOfPromotionalCartonsFormatted() {
		return noOfPromotionalCartonsFormatted;
	}

	/**
	 * @param noOfPromotionalCartonsFormatted the noOfPromotionalCartonsFormatted to set
	 */
	public void setNoOfPromotionalCartonsFormatted(
			String noOfPromotionalCartonsFormatted) {
		this.noOfPromotionalCartonsFormatted = noOfPromotionalCartonsFormatted;
	}

	
	
	
	/**
	 * @param noOfAdvertCartons the noOfAdvertCartons to set
	 */
	public String getNoOfAdvertCartons() {
		return noOfAdvertCartons;
	}


	public void setNoOfAdvertCartons(String noOfAdvertCartons) {
		this.noOfAdvertCartons = noOfAdvertCartons;
	}
	/**
	 * @param noOfAdvertCartonsFormatted the noOfAdvertCartonsFormatted to set
	 */

	public String getNoOfAdvertCartonsFormatted() {
		return noOfAdvertCartonsFormatted;
	}


	public void setNoOfAdvertCartonsFormatted(String noOfAdvertCartonsFormatted) {
		this.noOfAdvertCartonsFormatted = noOfAdvertCartonsFormatted;
	}

	/**
	 * @param noOfJobBuysCartons the noOfJobBuysCartons to set
	 */

	public String getNoOfJobBuysCartons() {
		return noOfJobBuysCartons;
	}


	public void setNoOfJobBuysCartons(String noOfJobBuysCartons) {
		this.noOfJobBuysCartons = noOfJobBuysCartons;
	}

	/**
	 * @param noOfJobBuysCartonsFormatted the noOfJobBuysCartonsFormatted to set
	 */
	public String getNoOfJobBuysCartonsFormatted() {
		return noOfJobBuysCartonsFormatted;
	}


	public void setNoOfJobBuysCartonsFormatted(String noOfJobBuysCartonsFormatted) {
		this.noOfJobBuysCartonsFormatted = noOfJobBuysCartonsFormatted;
	}


	/**
	 * @return the cartonsToBeFilled
	 */
	public String getCartonsToBeFilled() {
		return cartonsToBeFilled;
	}

	/**
	 * @param cartonsToBeFilled the cartonsToBeFilled to set
	 */
	public void setCartonsToBeFilled(String cartonsToBeFilled) {
		this.cartonsToBeFilled = cartonsToBeFilled;
	}

	/**
	 * @return the cartonsToBeFilledFormatted
	 */
	public String getCartonsToBeFilledFormatted() {
		return cartonsToBeFilledFormatted;
	}

	/**
	 * @param cartonsToBeFilledFormatted the cartonsToBeFilledFormatted to set
	 */
	public void setCartonsToBeFilledFormatted(String cartonsToBeFilledFormatted) {
		this.cartonsToBeFilledFormatted = cartonsToBeFilledFormatted;
	}

	/**
	 * @return the noOfExcessCartons
	 */
	public String getNoOfExcessCartons() {
		return noOfExcessCartons;
	}

	/**
	 * @param noOfExcessCartons the noOfExcessCartons to set
	 */
	public void setNoOfExcessCartons(String noOfExcessCartons) {
		this.noOfExcessCartons = noOfExcessCartons;
	}

	/**
	 * @return the noOfExcessCartonsFormatted
	 */
	public String getNoOfExcessCartonsFormatted() {
		return noOfExcessCartonsFormatted;
	}

	/**
	 * @param noOfExcessCartonsFormatted the noOfExcessCartonsFormatted to set
	 */
	public void setNoOfExcessCartonsFormatted(String noOfExcessCartonsFormatted) {
		this.noOfExcessCartonsFormatted = noOfExcessCartonsFormatted;
	}

	
}