package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromoAuditTrail {

	@JsonProperty("om")
	private String om;

	// PROM_START_DATE
	@JsonProperty("promStartDate")
	private String promStartDate;

	// OLD_ADVERT_QTY
	@JsonProperty("oldBuildQty")
	private String oldBuildQty;

	// NEW_ADVERT_QTY
	@JsonProperty("newBuildQty")
	private String newBuildQty;

	// OLD_STORE_DMND_QTY
	@JsonProperty("oldDemandQty")
	private String oldDemandQty;

	// NEW_STORE_DMND_QTY
	@JsonProperty("newDemandQty")
	private String newDemandQty;

	// OLD_DISP_QTY
	@JsonProperty("oldDisplayQty")
	private String oldDisplayQty;

	// NEW_DISP_QTY
	@JsonProperty("newDisplayQty")
	private String newDisplayQty;

	// CREATED_USER
	@JsonProperty("createdUser")
	private String createdUser;

	// CREATED_DATETM
	@JsonProperty("createdDate")
	private String createdDate;

	@JsonProperty("cratedTime")
	private String cratedTime;

	// UPDATED_USER
	@JsonProperty("updatedUser")
	private String updatedUser;

	private String updatedUserName;

	// UPDATED_DATETM
	@JsonProperty("updatedDate")
	private String updatedDate;

	@JsonProperty("updatedTime")
	private String updatedTime;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("articleDesc")
	private String articleDesc;

	@JsonProperty("articleNo")
	private String articleNo;

	@JsonProperty("recordCount")
	private int recordCount;

	public PromoAuditTrail() {

	}

	public PromoAuditTrail(String promStartDate, String oldBuildQty,
			String newBuildQty, String oldDemandQty, String newDemandQty,
			String oldDisplayQty, String newDisplayQty, String createdUser,
			String createdDate, String cratedTime, String updatedUser,
			String updatedDate, String updatedTime, String articleDesc,
			String msg) {
		super();
		this.promStartDate = promStartDate;
		this.oldBuildQty = oldBuildQty;
		this.newBuildQty = newBuildQty;
		this.oldDemandQty = oldDemandQty;
		this.newDemandQty = newDemandQty;
		this.oldDisplayQty = oldDisplayQty;
		this.newDisplayQty = newDisplayQty;
		this.createdUser = createdUser;
		this.createdDate = createdDate;
		this.cratedTime = cratedTime;
		this.updatedUser = updatedUser;
		this.updatedDate = updatedDate;
		this.updatedTime = updatedTime;
		this.articleDesc = articleDesc;
		this.msg = msg;
	}

	public String getPromStartDate() {
		return promStartDate;
	}

	public void setPromStartDate(String promStartDate) {
		this.promStartDate = promStartDate;
	}

	public String getOldBuildQty() {
		return oldBuildQty;
	}

	public void setOldBuildQty(String oldBuildQty) {
		this.oldBuildQty = oldBuildQty;
	}

	public String getNewBuildQty() {
		return newBuildQty;
	}

	public void setNewBuildQty(String newBuildQty) {
		this.newBuildQty = newBuildQty;
	}

	public String getOldDemandQty() {
		return oldDemandQty;
	}

	public void setOldDemandQty(String oldDemandQty) {
		this.oldDemandQty = oldDemandQty;
	}

	public String getNewDemandQty() {
		return newDemandQty;
	}

	public void setNewDemandQty(String newDemandQty) {
		this.newDemandQty = newDemandQty;
	}

	public String getOldDisplayQty() {
		return oldDisplayQty;
	}

	public void setOldDisplayQty(String oldDisplayQty) {
		this.oldDisplayQty = oldDisplayQty;
	}

	public String getNewDisplayQty() {
		return newDisplayQty;
	}

	public void setNewDisplayQty(String newDisplayQty) {
		this.newDisplayQty = newDisplayQty;
	}

	public String getCreatedUser() {
		return createdUser;
	}

	public void setCreatedUser(String createdUser) {
		this.createdUser = createdUser;
	}

	public String getCreatedDate() {
		return createdDate;
	}

	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	public String getCratedTime() {
		return cratedTime;
	}

	public void setCratedTime(String cratedTime) {
		this.cratedTime = cratedTime;
	}

	public String getUpdatedUser() {
		return updatedUser;
	}

	public void setUpdatedUser(String updatedUser) {
		this.updatedUser = updatedUser;
	}

	public String getUpdatedDate() {
		return updatedDate;
	}

	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	public String getUpdatedTime() {
		return updatedTime;
	}

	public void setUpdatedTime(String updatedTime) {
		this.updatedTime = updatedTime;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getUpdatedUserName() {
		return updatedUserName;
	}

	public void setUpdatedUserName(String updatedUserName) {
		this.updatedUserName = updatedUserName;
	}

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public int getRecordCount() {
		return recordCount;
	}

	public void setRecordCount(int recordCount) {
		this.recordCount = recordCount;
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

}
