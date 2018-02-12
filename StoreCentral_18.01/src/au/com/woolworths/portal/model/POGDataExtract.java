package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POGDataExtract implements Cloneable {

	public static final String EMPTY_DATE_FORMAT = "00/00/0000";

	public static final String EMPTY_TIME_FORMAT = "00.00.00";

	public static final String SAP_DEFAULT_DATE_FORMAT = "00000000";
	public static final String SAP_DEFAULT_TIME_FORMAT = "000000";

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("pog_impl_date")
	private String pog_impl_date;

	@JsonProperty("pog_impl_time")
	private String pog_impl_time;

	@JsonProperty("pog_imp_time")
	private String pog_imp_time;

	@JsonProperty("pog_imp_status")
	private String pog_imp_status;

	@JsonProperty("last_changed_on")
	private String lastChangedOn;

	@JsonProperty("deletion_date")
	private String deletionDate;

	@JsonProperty("marc_update_flag")
	private String marcUpdateFlag;

	@JsonProperty("pog_size")
	private String pogSize;

	@JsonProperty("pog_activated_date")
	private String pogActivatedDate;

	@JsonProperty("shelf_quantity_sent")
	private String shelfQuantitySent;

	@JsonProperty("created_on")
	private String createdOn;

	@JsonProperty("layout_module")
	private String layoutModule;

	@JsonProperty("pog_activated_time")
	private String pogActivatedTime;

	@JsonProperty("deletion_ind")
	private String deletionInd;

	@JsonProperty("created_by")
	private String createdBy;

	@JsonProperty("site")
	private String site;

	@JsonProperty("variation")
	private String variation;

	@JsonProperty("pog_accept_duedate")
	private String pogAcceptDuedate;

	@JsonProperty("pog_accept_recv_tm")
	private String pogAcceptRecvTm;

	@JsonProperty("last_changed_by")
	private String lastChangedBy;

	@JsonProperty("pog_old_date")
	private String pogOldDate;

	@JsonProperty("layout_mod_desc")
	private String layoutModDesc;

	@JsonProperty("lay_mod_version")
	private String layModVersion;

	@JsonProperty("pog_prev_actv_date")
	private String pogPrevActvDate;

	@JsonProperty("pog_issued_time")
	private String pogIssuedTime;

	@JsonProperty("equipment")
	private String equipment;

	@JsonProperty("pog_accept_recv_on")
	private String pogAcceptRecvOn;

	@JsonProperty("pog_issued_date")
	private String pogIssuedDate;

	private String tabName;

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getLastChangedOn() {
		if (lastChangedOn != null)

			this.lastChangedOn = lastChangedOn.replace(".", "/");

		return (validateDate(this.lastChangedOn)) ? this.lastChangedOn : null;

	}

	public void setLastChangedOn(String lastChangedOn) {
		this.lastChangedOn = lastChangedOn;
	}

	public String getDeletionDate() {
		if (deletionDate != null)
			this.deletionDate = deletionDate.replace(".", "/");
		return (validateDate(this.deletionDate)) ? this.deletionDate : null;
	}

	public void setDeletionDate(String deletionDate) {
		this.deletionDate = deletionDate;
	}

	public String getMarcUpdateFlag() {
		return marcUpdateFlag;
	}

	public void setMarcUpdateFlag(String marcUpdateFlag) {
		this.marcUpdateFlag = marcUpdateFlag;
	}

	public String getPogSize() {
		return pogSize;
	}

	public void setPogSize(String pogSize) {
		this.pogSize = pogSize;
	}

	public String getPogActivatedDate() {
		if (pogActivatedDate != null)
			this.pogActivatedDate = pogActivatedDate.replace(".", "/");
		return (validateDate(this.pogActivatedDate)) ? this.pogActivatedDate
				: null;
	}

	public void setPogActivatedDate(String pogActivatedDate) {
		this.pogActivatedDate = pogActivatedDate;
	}

	public String getShelfQuantitySent() {
		return shelfQuantitySent;
	}

	public void setShelfQuantitySent(String shelfQuantitySent) {
		this.shelfQuantitySent = shelfQuantitySent;
	}

	public String getCreatedOn() {
		if (createdOn != null)
			this.createdOn = createdOn.replace(".", "/");
		return (validateDate(this.createdOn)) ? this.createdOn : null;
	}

	public void setCreatedOn(String createdOn) {
		this.createdOn = createdOn;
	}

	public String getLayoutModule() {
		return layoutModule;
	}

	public void setLayoutModule(String layoutModule) {
		this.layoutModule = layoutModule;
	}

	public String getPogActivatedTime() {
		System.out.println("inside pogActivatedTime" + pogActivatedTime);
		if (this.pogActivatedTime != null
				&& !this.pogActivatedTime.trim().equals("")) {
			this.pogActivatedTime = this.pogActivatedTime.replace("PT", "")
					.replace("H", "").replace("M", "").replace("S", "");
			if (this.pogActivatedTime.length() <= 3)
				this.pogActivatedTime = POGDataExtract.SAP_DEFAULT_TIME_FORMAT;

			System.out.println("inside this.pogActivatedTime"
					+ this.pogActivatedTime);
		}
		return (this.pogActivatedTime != null) ? this.pogActivatedTime
				: POGDataExtract.SAP_DEFAULT_TIME_FORMAT;
	}

	public void setPogActivatedTime(String pogActivatedTime) {

		this.pogActivatedTime = pogActivatedTime;
	}

	public String getDeletionInd() {
		return deletionInd;
	}

	public void setDeletionInd(String deletionInd) {
		this.deletionInd = deletionInd;
	}

	public String getCreatedBy() {
		return createdBy;
	}

	public void setCreatedBy(String createdBy) {
		this.createdBy = createdBy;
	}

	public String getSite() {
		return site;
	}

	public void setSite(String site) {
		this.site = site;
	}

	public String getVariation() {
		return variation;
	}

	public void setVariation(String variation) {
		this.variation = variation;
	}

	public String getPogAcceptDuedate() {
		if (pogAcceptDuedate != null)
			this.pogAcceptDuedate = pogAcceptDuedate.replace(".", "/");
		return (validateDate(this.pogAcceptDuedate)) ? this.pogAcceptDuedate
				: null;
	}

	public void setPogAcceptDuedate(String pogAcceptDuedate) {
		this.pogAcceptDuedate = pogAcceptDuedate;
	}

	public String getPogAcceptRecvTm() {
		System.out.println("inside pogActivatedTime" + pogActivatedTime);
		if (this.pogAcceptRecvTm != null
				&& !this.pogAcceptRecvTm.trim().equals("")) {
			this.pogAcceptRecvTm = this.pogAcceptRecvTm.replace("PT", "")
					.replace("H", "").replace("M", "").replace("S", "");
			if (this.pogAcceptRecvTm.length() <= 3)
				this.pogAcceptRecvTm = POGDataExtract.SAP_DEFAULT_TIME_FORMAT;

			System.out.println("inside this.pogActivatedTime"
					+ this.pogAcceptRecvTm);
		}
		return (this.pogAcceptRecvTm != null) ? this.pogAcceptRecvTm
				: POGDataExtract.SAP_DEFAULT_TIME_FORMAT;
	}

	public void setPogAcceptRecvTm(String pogAcceptRecvTm) {

		this.pogAcceptRecvTm = pogAcceptRecvTm;
	}

	public String getLastChangedBy() {
		return lastChangedBy;
	}

	public void setLastChangedBy(String lastChangedBy) {
		this.lastChangedBy = lastChangedBy;
	}

	public String getPogOldDate() {
		if (pogOldDate != null)
			this.pogOldDate = pogOldDate.replace(".", "/");
		return (validateDate(this.pogOldDate)) ? this.pogOldDate : null;
	}

	public void setPogOldDate(String pogOldDate) {

		this.pogOldDate = pogOldDate;
	}

	public String getLayoutModDesc() {
		return layoutModDesc;
	}

	public void setLayoutModDesc(String layoutModDesc) {
		this.layoutModDesc = layoutModDesc;
	}

	public String getLayModVersion() {
		return layModVersion;
	}

	public void setLayModVersion(String layModVersion) {
		this.layModVersion = layModVersion;
	}

	public String getPogPrevActvDate() {
		if (pogPrevActvDate != null)
			this.pogPrevActvDate = pogPrevActvDate.replace(".", "/");
		return (validateDate(this.pogPrevActvDate)) ? this.pogPrevActvDate
				: null;
	}

	public void setPogPrevActvDate(String pogPrevActvDate) {
		this.pogPrevActvDate = pogPrevActvDate;
	}

	public String getPogIssuedTime() {
		System.out.println("inside pogActivatedTime" + pogActivatedTime);
		if (this.pogIssuedTime != null && !this.pogIssuedTime.trim().equals("")) {
			this.pogIssuedTime = this.pogIssuedTime.replace("PT", "")
					.replace("H", "").replace("M", "").replace("S", "");
			if (this.pogIssuedTime.length() <= 3)
				this.pogIssuedTime = POGDataExtract.SAP_DEFAULT_TIME_FORMAT;

			System.out.println("inside this.pogActivatedTime"
					+ this.pogIssuedTime);
		}
		return (this.pogIssuedTime != null) ? this.pogIssuedTime
				: POGDataExtract.SAP_DEFAULT_TIME_FORMAT;
	}

	public void setPogIssuedTime(String pogIssuedTime) {

		this.pogIssuedTime = pogIssuedTime;
	}

	public String getEquipment() {
		return equipment;
	}

	public void setEquipment(String equipment) {
		this.equipment = equipment;
	}

	public String getPogAcceptRecvOn() {
		if (pogAcceptRecvOn != null)
			this.pogAcceptRecvOn = pogAcceptRecvOn.replace(".", "/");
		return (validateDate(this.pogAcceptRecvOn)) ? this.pogAcceptRecvOn
				: null;
	}

	public void setPogAcceptRecvOn(String pogAcceptRecvOn) {
		this.pogAcceptRecvOn = pogAcceptRecvOn;
	}

	public String getPogIssuedDate() {
		if (pogIssuedDate != null)
			this.pogIssuedDate = pogIssuedDate.replace(".", "/");
		return (validateDate(this.pogIssuedDate)) ? this.pogIssuedDate : null;
	}

	public void setPogIssuedDate(String pogIssuedDate) {
		this.pogIssuedDate = pogIssuedDate;
	}

	public String getTabName() {
		return tabName;
	}

	public void setTabName(String tabName) {
		this.tabName = tabName;
	}

	public Object clone() {
		try {
			return super.clone();
		} catch (Exception e) {
			return null;
		}
	}

	public boolean validateDate(String inputDate) {

		return (null != inputDate && !(EMPTY_DATE_FORMAT
				.equalsIgnoreCase(inputDate) || "".equalsIgnoreCase(inputDate)));
	}

	/**
	 * @return the pog_imp_status
	 */
	public String getPog_imp_status() {
		return pog_imp_status;
	}

	/**
	 * @param pog_imp_status
	 *            the pog_imp_status to set
	 */
	public void setPog_imp_status(String pog_imp_status) {
		this.pog_imp_status = pog_imp_status;
	}

	/**
	 * @return the pog_impl_date
	 */
	public String getPog_impl_date() {
		return pog_impl_date;
	}

	/**
	 * @param pog_impl_date
	 *            the pog_impl_date to set
	 */
	public void setPog_impl_date(String pog_impl_date) {
		this.pog_impl_date = pog_impl_date;
	}

	/**
	 * @return the pog_impl_time
	 */
	public String getPog_impl_time() {
		// System.out.println("inside getPog_impl_time"+pog_impl_time);
		if (this.pog_impl_time != null && !this.pog_impl_time.trim().equals("")) {
			this.pog_impl_time = this.pog_impl_time.replace("PT", "")
					.replace("H", "").replace("M", "").replace("S", "");
			if (this.pog_impl_time.length() <= 3)
				this.pog_impl_time = POGDataExtract.SAP_DEFAULT_TIME_FORMAT;

			System.out
					.println("inside this.pog_impl_time" + this.pog_impl_time);
		}
		return (this.pog_impl_time != null) ? this.pog_impl_time
				: POGDataExtract.SAP_DEFAULT_TIME_FORMAT;
		/*
		 * if(this.pog_impl_time!=null && !this.pog_impl_time.equals("")){
		 * this.pog_impl_time=this.pog_impl_time.replace("PT", "").replace("H",
		 * ":").replace("M", ":").replace("S", "").substring(0, 5); } return
		 * pog_impl_time;
		 */
	}

	/**
	 * @param pog_impl_time
	 *            the pog_impl_time to set
	 */
	public void setPog_impl_time(String pog_impl_time) {
		this.pog_impl_time = pog_impl_time;
	}

	public String getPog_imp_time() {
		// System.out.println("inside getPog_impl_time"+pog_impl_time);
		if (this.pog_imp_time != null && !this.pog_imp_time.trim().equals("")) {
			this.pog_imp_time = this.pog_imp_time.replace("PT", "")
					.replace("H", "").replace("M", "").replace("S", "");
			if (this.pog_imp_time.length() <= 3)
				this.pog_imp_time = POGDataExtract.SAP_DEFAULT_TIME_FORMAT;

			System.out.println("inside this.pog_imp_time" + this.pog_imp_time);
		}
		return (this.pog_imp_time != null) ? this.pog_imp_time
				: POGDataExtract.SAP_DEFAULT_TIME_FORMAT;
		/*
		 * if(this.pog_imp_time!=null && !this.pog_imp_time.equals("")){
		 * this.pog_imp_time=this.pog_imp_time.replace("PT", "").replace("H",
		 * ":").replace("M", ":").replace("S", "").substring(0, 5); } return
		 * pog_imp_time;
		 */
	}

	/**
	 * @param pog_imp_time
	 *            the pog_imp_time to set
	 */
	public void setPog_imp_time(String pog_imp_time) {
		this.pog_imp_time = pog_imp_time;
	}

}
