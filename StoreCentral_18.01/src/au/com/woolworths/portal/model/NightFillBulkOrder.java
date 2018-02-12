package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class NightFillBulkOrder {

	@JsonProperty("ID")
	private String id;

	@JsonProperty("TotaledProperties")
	private String totalProperties;

	@JsonProperty("A3ZCPNFLP010CM_CDT1")
	private String departmentNumber;

	@JsonProperty("A3ZCPNFLP010CM_CDT1_T")
	private String departmentName;

	@JsonProperty("B0ZI8KYVSWSJODMJF9Z4YHQF6")
	private String noOfCartons;

	@JsonProperty("B0ZI8KYVSWSJODMJF9Z4YHQF6_F")
	private String noOfCartonsFormatted;

	@JsonProperty("A0SUPP_PLANT")
	private String wareHouseNumber;

	@JsonProperty("A0SUPP_PLANT_T")
	private String wareHouseName;

	@JsonProperty("A0MATERIAL")
	private String articleNumber;

	@JsonProperty("A0MATERIAL_T")
	private String articleName;

	public NightFillBulkOrder(
			@JsonProperty("id") String id,
			@JsonProperty("TotaledProperties") String totalProperties,
			@JsonProperty("A3ZCPNFLP010CM_CDT1") String departmentNumber,
			@JsonProperty("A3ZCPNFLP010CM_CDT1_T") String departmentName,
			@JsonProperty("B0ZI8KYVSWSJODMJF9Z4YHQF6") String noOfCartons,
			@JsonProperty("B0ZI8KYVSWSJODMJF9Z4YHQF6_F") String noOfCartonsFormatted,
			@JsonProperty("A0SUPP_PLANT") String wareHouseNumber,
			@JsonProperty("A0SUPP_PLANT_T") String wareHouseName,
			@JsonProperty("A0MATERIAL") String articleNumber,
			@JsonProperty("A0MATERIAL_T") String articleName) {
		
		this.id = id;
		this.totalProperties = totalProperties;
		this.departmentNumber = departmentNumber;
		this.departmentName = departmentName;
		this.noOfCartons = noOfCartons;
		this.noOfCartonsFormatted = noOfCartonsFormatted;
		this.wareHouseNumber = wareHouseNumber;
		this.wareHouseName = wareHouseName;
		this.articleNumber = articleNumber;
		this.articleName = articleName;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getTotalProperties() {
		return totalProperties;
	}

	public void setTotalProperties(String totalProperties) {
		this.totalProperties = totalProperties;
	}

	public String getDepartmentNumber() {
		return departmentNumber;
	}

	public void setDepartmentNumber(String departmentNumber) {
		this.departmentNumber = departmentNumber;
	}

	public String getDepartmentName() {
		return departmentName;
	}

	public void setDepartmentName(String departmentName) {
		this.departmentName = departmentName;
	}

	public String getNoOfCartons() {
		return noOfCartons;
	}

	public void setNoOfCartons(String noOfCartons) {
		this.noOfCartons = noOfCartons;
	}

	public String getNoOfCartonsFormatted() {
		return noOfCartonsFormatted;
	}

	public void setNoOfCartonsFormatted(String noOfCartonsFormatted) {
		this.noOfCartonsFormatted = noOfCartonsFormatted;
	}

	public String getWareHouseNumber() {
		return wareHouseNumber;
	}

	public void setWareHouseNumber(String wareHouseNumber) {
		this.wareHouseNumber = wareHouseNumber;
	}

	public String getWareHouseName() {
		return wareHouseName;
	}

	public void setWareHouseName(String wareHouseName) {
		this.wareHouseName = wareHouseName;
	}

	public String getArticleNumber() {
		return articleNumber;
	}

	public void setArticleNumber(String articleNumber) {
		this.articleNumber = articleNumber;
	}

	public String getArticleName() {
		return articleName;
	}

	public void setArticleName(String articleName) {
		this.articleName = articleName;
	}

}
