package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillBreakLoad {

	@JsonProperty("ID")
	private String id;

	@JsonProperty("TotaledProperties")
	private String totalProperties;

	@JsonProperty("ZPROMOIND")
	private String promotionIndicator;

	@JsonProperty("ZBULKINDI")
	private String bulkIndicator;

	@JsonProperty("ZADVERTINDI")
	private String advertIndicator;

	@JsonProperty("ZJOBBUYINDI")
	private String jobBuyIndicator;

	@JsonProperty("RDEPT")
	private String departmentNumber;

	@JsonProperty("RDEPT_T")
	private String departmentName;

	@JsonProperty("A0SUPP_PLANT")
	private String wareHouseNumber;

	@JsonProperty("A0SUPP_PLANT_T")
	private String wareHouseName;

	@JsonProperty("A7YUV5W359XPXRN8AO1XW1K83L")
	private String noOfCartons;

	@JsonProperty("A7YUV5W359XPXRN8AO1XW1K83L_F")
	private String noOfCartonsFormatted;

	@JsonProperty("A7YUV5W359XPXRQHFYNHCMZIM8")
	private String noOfHours;

	@JsonProperty("A7YUV5W359XPXRQHFYNHCMZIM8_F")
	private String noOfHoursFormatted;

	@JsonProperty("A7YUV5W359XPXRN8AO1XWMMQRL")
	private String cartonRate;

	@JsonProperty("A7YUV5W359XPXRN8AO1XWMMQRL_F")
	private String cartonRateFormatted;

	// Start of newly added JSON Property

	@JsonProperty("id")
	private String id_m;

	@JsonProperty("totalProperties")
	private String totalProperties_m;

	@JsonProperty("promotionIndicator")
	private String promotionIndicator_m;

	@JsonProperty("bulkIndicator")
	private String bulkIndicator_m;

	@JsonProperty("advertIndicator")
	private String advertIndicator_m;
	@JsonProperty("jobBuyIndicator")
	private String jobBuyIndicator_m;

	@JsonProperty("departmentNumber")
	private String departmentNumber_m;

	@JsonProperty("departmentName")
	private String departmentName_m;

	@JsonProperty("wareHouseNumber")
	private String wareHouseNumber_m;

	@JsonProperty("wareHouseName")
	private String wareHouseName_m;

	@JsonProperty("noOfCartons")
	private String noOfCartons_m;

	@JsonProperty("noOfCartonsFormatted")
	private String noOfCartonsFormatted_m;

	@JsonProperty("noOfHours")
	private String noOfHours_m;

	@JsonProperty("noOfHoursFormatted")
	private String noOfHoursFormatted_m;

	@JsonProperty("cartonRate")
	private String cartonRate_m;

	@JsonProperty("cartonRateFormatted")
	private String cartonRateFormatted_m;

	/**
	 * @param id
	 * @param totalProperties
	 * @param promotionIndicator
	 * @param bulkIndicator
	 * @param advertIndicator
	 * @param jobBuyIndicator
	 * @param departmentNumber
	 * @param departmentName
	 * @param wareHouseNumber
	 * @param wareHouseName
	 * @param noOfCartons
	 * @param noOfCartonsFormatted
	 * @param noOfHours
	 * @param noOfHoursFormatted
	 * @param cartonRate
	 * @param cartonRateFormatted
	 */
	public NightFillBreakLoad(
			@JsonProperty("ID") String id,
			@JsonProperty("TotaledProperties") String totalProperties,
			@JsonProperty("ZPROMOIND") String promotionIndicator,
			@JsonProperty("ZBULKINDI") String bulkIndicator,
			@JsonProperty("ZADVERTINDI") String advertIndicator,
			@JsonProperty("ZJOBBUYINDI") String jobBuyIndicator,
			@JsonProperty("RDEPT") String departmentNumber,
			@JsonProperty("RDEPT_T") String departmentName,
			@JsonProperty("A0SUPP_PLANT") String wareHouseNumber,
			@JsonProperty("A0SUPP_PLANT_T") String wareHouseName,
			@JsonProperty("A7YUV5W359XPXRN8AO1XW1K83L") String noOfCartons,
			@JsonProperty("A7YUV5W359XPXRN8AO1XW1K83L_F") String noOfCartonsFormatted,
			@JsonProperty("A7YUV5W359XPXRQHFYNHCMZIM8") String noOfHours,
			@JsonProperty("A7YUV5W359XPXRQHFYNHCMZIM8_F") String noOfHoursFormatted,
			@JsonProperty("A7YUV5W359XPXRN8AO1XWMMQRL") String cartonRate,
			@JsonProperty("A7YUV5W359XPXRN8AO1XWMMQRL_F") String cartonRateFormatted) {

		// super();
		this.id = id;
		this.totalProperties = totalProperties;
		this.promotionIndicator = promotionIndicator;
		this.bulkIndicator = bulkIndicator;
		this.advertIndicator = advertIndicator;
		this.jobBuyIndicator = jobBuyIndicator;
		this.departmentNumber = departmentNumber;
		this.departmentName = departmentName;
		this.wareHouseNumber = wareHouseNumber;
		this.wareHouseName = wareHouseName;
		this.noOfCartons = noOfCartons;
		this.noOfCartonsFormatted = noOfCartonsFormatted;
		this.noOfHours = noOfHours;
		this.noOfHoursFormatted = noOfHoursFormatted;
		this.cartonRate = cartonRate;
		this.cartonRateFormatted = cartonRateFormatted;

		this.id_m = id;
		this.totalProperties_m = totalProperties;
		this.promotionIndicator_m = promotionIndicator;
		this.bulkIndicator_m = bulkIndicator;
		this.advertIndicator_m = advertIndicator;
		this.jobBuyIndicator_m = jobBuyIndicator;
		this.departmentNumber_m = departmentNumber;
		this.departmentName_m = departmentName;
		this.wareHouseNumber_m = wareHouseNumber;
		this.wareHouseName_m = wareHouseName;
		this.noOfCartons_m = noOfCartons;
		this.noOfCartonsFormatted_m = noOfCartonsFormatted;
		this.noOfHours_m = noOfHours;
		this.noOfHoursFormatted_m = noOfHoursFormatted;
		this.cartonRate_m = cartonRate;
		this.cartonRateFormatted_m = cartonRateFormatted;
	}

	// End of newly added JSON Property
	/**
	 * @return the wareHouseNumber
	 */
	public String getWareHouseNumber() {
		return wareHouseNumber;
	}

	/**
	 * @param wareHouseNumber
	 *            the wareHouseNumber to set
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
	 * @param wareHouseName
	 *            the wareHouseName to set
	 */
	public void setWareHouseName(String wareHouseName) {
		this.wareHouseName = wareHouseName;
	}

	/**
	 * @return the departmentName
	 */
	public String getDepartmentName() {
		return departmentName;
	}

	/**
	 * @param departmentName
	 *            the departmentName to set
	 */
	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	/**
	 * @return the id
	 */
	public String getId() {
		return id;
	}

	/**
	 * @param id
	 *            the id to set
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
	 * @param totalProperties
	 *            the totalProperties to set
	 */
	public void setTotalProperties(String totalProperties) {
		this.totalProperties = totalProperties;
	}

	/**
	 * @return the promotionIndicator
	 */
	public String getPromotionIndicator() {
		return promotionIndicator;
	}

	/**
	 * @param promotionIndicator
	 *            the promotionIndicator to set
	 */
	public void setPromotionIndicator(String promotionIndicator) {
		this.promotionIndicator = promotionIndicator;
	}

	/**
	 * @return the bulkIndicator
	 */
	public String getBulkIndicator() {
		return bulkIndicator;
	}

	/**
	 * @return the advertIndicator
	 */
	public String getAdvertIndicator() {
		return advertIndicator;
	}

	/**
	 * @param advertIndicator
	 *            the advertIndicator to set
	 */
	public void setAdvertIndicator(String advertIndicator) {
		this.advertIndicator = advertIndicator;
	}

	/**
	 * @return the jobBuyIndicator
	 */
	public String getJobBuyIndicator() {
		return jobBuyIndicator;
	}

	/**
	 * @param jobBuyIndicator
	 *            the jobBuyIndicator to set
	 */
	public void setJobBuyIndicator(String jobBuyIndicator) {
		this.jobBuyIndicator = jobBuyIndicator;
	}

	/**
	 * @param bulkIndicator
	 *            the bulkIndicator to set
	 */
	public void setBulkIndicator(String bulkIndicator) {
		this.bulkIndicator = bulkIndicator;
	}

	/**
	 * @return the departmentNumber
	 */
	public String getDepartmentNumber() {
		return departmentNumber;
	}

	/**
	 * @param departmentNumber
	 *            the departmentNumber to set
	 */
	public void setDepartmentNumber(String departmentNumber) {
		this.departmentNumber = departmentNumber;
	}

	/**
	 * @return the noOfCartons
	 */
	public String getNoOfCartons() {
		return noOfCartons;
	}

	/**
	 * @param noOfCartons
	 *            the noOfCartons to set
	 */
	public void setNoOfCartons(String noOfCartons) {
		this.noOfCartons = noOfCartons;
	}

	/**
	 * @return the noOfCartonsFormatted
	 */
	public String getNoOfCartonsFormatted() {
		return noOfCartonsFormatted;
	}

	/**
	 * @param noOfCartonsFormatted
	 *            the noOfCartonsFormatted to set
	 */
	public void setNoOfCartonsFormatted(String noOfCartonsFormatted) {
		this.noOfCartonsFormatted = noOfCartonsFormatted;
	}

	/**
	 * @return the noOfHours
	 */
	public String getNoOfHours() {
		return noOfHours;
	}

	/**
	 * @param noOfHours
	 *            the noOfHours to set
	 */
	public void setNoOfHours(String noOfHours) {
		this.noOfHours = noOfHours;
	}

	/**
	 * @return the noOfHoursFormatted
	 */
	public String getNoOfHoursFormatted() {
		return noOfHoursFormatted;
	}

	/**
	 * @param noOfHoursFormatted
	 *            the noOfHoursFormatted to set
	 */
	public void setNoOfHoursFormatted(String noOfHoursFormatted) {
		this.noOfHoursFormatted = noOfHoursFormatted;
	}

	/**
	 * @return the cartonRate
	 */
	public String getCartonRate() {
		return cartonRate;
	}

	/**
	 * @param cartonRate
	 *            the cartonRate to set
	 */
	public void setCartonRate(String cartonRate) {
		this.cartonRate = cartonRate;
	}

	/**
	 * @return the cartonRateFormatted
	 */
	public String getCartonRateFormatted() {
		return cartonRateFormatted;
	}

	/**
	 * @param cartonRateFormatted
	 *            the cartonRateFormatted to set
	 */
	public void setCartonRateFormatted(String cartonRateFormatted) {
		this.cartonRateFormatted = cartonRateFormatted;
	}

}
