package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import com.google.gson.JsonElement;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InStorePromoArticleInfo {

	@JsonProperty("art_mas_uom")
	private String art_mas_uom;
	
	@JsonProperty("demandEditFlag")
	private String demandEditFlag;

	@JsonProperty("pi_uom")
	private String pi_uom;
	
	@JsonProperty("reason")
	private String reason;
	
	@JsonProperty("competitor")
	private String competitor;

/**
	 * @return the competitor
	 */
	public String getCompetitor() {
		return competitor;
	}

	/**
	 * @param competitor the competitor to set
	 */
	public void setCompetitor(String competitor) {
		this.competitor = competitor;
	}

@JsonProperty("msg")
	private String msg;

	@JsonProperty("var_wgt")
	private String var_wgt;

	@JsonProperty("piOmVal")
	private String piOmVal;

	@JsonProperty("promoSalesOrgStartday")
	private String promoSalesOrgStartDay; // calculated from db. sales org
											// startday

	@JsonProperty("promoSalesOrgEndday")
	private String promoSalesOrgEndDay; // calculated from db. sales org end day

	@JsonProperty("promoEndDateStartday")
	private String promoEndDateStartday; // calculated from db. sales org
											// startday

	@JsonProperty("promoEndDateEndday")
	private String promoEndDateEndday; // calculated from db. sales org end day

	@JsonProperty("articleNo")
	private String articleNo; // article number passed from the screen

	@JsonProperty("articleUom")
	private String articleUom; // article unit of measure passed from the screen

	@JsonProperty("promoStartDate")
	private String promoStartDate; // promotion start date passed from the
									// screen
	@JsonProperty("promoEndDate")
	private String promoEndDate;// promotion end date passed from the screen

	@JsonProperty("buildOrderDate")
	private String buildOrderDate; // build Order date passed from the screen

	@JsonProperty("deliveryDate")
	private String deliveryDate;// delivery date passed from the screen

	@JsonProperty("buildQty")
	private Integer buildQty;// build quantity passed from the screen

	@JsonProperty("displayQty")
	private Integer displayQty;// display quantity passed from the screen

	@JsonProperty("demandQty")
	private Integer demandQty;// demand quantity passed from the screen

	@JsonProperty("oldDemandQty")
	private Integer oldDemandQty;
	
	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public Integer getOldDemandQty() {
		return oldDemandQty;
	}

	public void setOldDemandQty(Integer oldDemandQty) {
		this.oldDemandQty = oldDemandQty;
	}

	@JsonProperty("promoPrice")
	private String promoPrice;// promotion price passed from the screen

	@JsonProperty("om")
	private String om;// order multiple of the article, it will either passed
						// from the screen or calculated in
						// our end

	@JsonProperty("baseFrct")
	private String baseFrct;// base forecast passed from the screen

	@JsonProperty("promFrct")
	private String promFrct;// base forecast passed from the screen

	@JsonProperty("standardPrice")
	private String standardPrice;// standard price of the article passed from
									// the screen

	@JsonProperty("displayType")
	private String displayType;// Promotion display type passed from the screen

	@JsonProperty("displayNo")
	private String displayNo;// Promotion display Number passed from the screen

	@JsonProperty("displayAlpha")
	private String displayAlpha;// Promotion display Alpha passed from the
								// screen

	@JsonProperty("mediaTYpe")
	private String mediaTYpe;// Promotion Media type either passed from screen
								// or it will be taken from DB

	@JsonProperty("promoOfferNo")
	private String promoOfferNo;// Promotion offer no either passed from screen
								// or it will be taken from webservices

	@JsonProperty("promoType")
	private String promoType; // Promotion type passed from screen

	@JsonProperty("createdUserId")
	private String createdUserId;// user id of the promotion created by, passed
									// from the
									// screen

	@JsonProperty("createdDate")
	private String createdDate;// promotion created date, passed
								// from the screen

	@JsonProperty("updateUserId")
	private String updateUserId;// Promotion offer no either passed from screen
								// or it will be taken from webservices

	@JsonProperty("updatedDate")
	private String updatedDate; // promotion updated date, passed
								// from the screen

	@JsonProperty("buckedId")
	private String buckedId;// user id of the promotion created by, passed
							// from the
							// screen

	@JsonProperty("frctGrpId")
	private String frctGrpId;// promotion created date, passed
								// from the screen

	@JsonProperty("wtdQty")
	private Integer wtdQty; // week to day sales quantity it will be taken from
							// DB or from screen

	@JsonProperty("ewtdQty")
	private Integer ewtdQty; // estimated week to day sales quantity it will be
								// taken from DB or from screen

	@JsonProperty("promoCreateStatus")
	private String promoCreateStatus; // it will be send from the webservice, to
										// get the promo creation info
	// if this flag is y than promotion is created in RC

	@JsonProperty("buildValidateFlag")
	private String buildValidateFlag; // Its passed from the screen if this is Y
										// than validate build quantity.

	@JsonProperty("buildValidateStatusFlag")
	private String buildValidateStatusFlag; // its send from the service, after
											// the validation of build quantity

	@JsonProperty("demandValidateFlag")
	private String demandValidateFlag; // Its passed from the screen if this is
										// Y than validate demand quantity.

	@JsonProperty("demandValidateStatusFlag")
	private String demandValidateStatusFlag; // its send from the service, after
												// the validation of demand
												// quantity

	@JsonProperty("displayValidateFlag")
	private String displayValidateFlag; // Its passed from the screen if this is
										// Y than validate display quantity.

	@JsonProperty("displayValidateStatusFlag")
	private String displayValidateStatusFlag; // its send from the service,
												// after the validation of
												// display quantity

	@JsonProperty("deliveryDateValidateFlag")
	private String deliveryDateValidateFlag; // Its passed from the screen if
												// this is Y than validate
												// delivery date

	@JsonProperty("deliveryDateValidateStatusFlag")
	private String deliveryDateValidateStatusFlag; // its send from the service,
													// after the validation of
													// delivery date

	// autoStock R flag.. the should be >0 in order to create promotion
	@JsonProperty("autoStockRFlag")
	private String autoStockRFlag;

	// auto forecast flag.. if this is y than we demand is locked and if n than
	// not locked
	@JsonProperty("autoFrctFlag")
	private String autoFrctFlag;

	// department of the article
	@JsonProperty("department")
	private String department;

	// category of the article
	@JsonProperty("category")
	private String category;

	// sub category of the article
	@JsonProperty("subCategory")
	private String subCategory;

	// segment of the article
	@JsonProperty("segment")
	private String segment;

	// PROMO START DATE AND END DATE VALIDATION
	@JsonProperty("promoDateValidateFlag")
	private String promoDateValidateFlag;

	// PROMO START DATE AND END DATE VALIDATION status
	@JsonProperty("promoDateValidateStatusFlag")
	private String promoDateValidateStatusFlag;

	// base forecast VALIDATION flag
	@JsonProperty("baseFrctFlag")
	private String baseFrctFlag;

	// /fields required for om calculation

	@JsonProperty("source_of_supp_ind")
	private String source_of_supp_ind;

	@JsonProperty("order_uom")
	private String order_uom;

	@JsonProperty("distributionUom")
	private String distributionUom;

	@JsonProperty("weekTodaySalesFlag")
	private String weekTodaySalesFlag;

	@JsonProperty("weekStartDate")
	private String weekStartDate;

	@JsonProperty("notes")
	private String notes;

	@JsonProperty("promoCreationRcStatus")
	private String promoCreationRcStatus; // if promotion is created in RC this
											// will be set to Y

	@JsonProperty("promoCreationSAPStatus")
	private String promoCreationSAPStatus; // if promotion is created in SAP
											// this
											// will be set to Y

	@JsonProperty("newPrice")
	private String newPrice; // Promotion clearance new price

	@JsonProperty("limitQty")
	private String limitQty; // Promotion Clearance limit qty

	@JsonProperty("ifPromoExistFlag")
	private String ifPromoExistFlag; // if this field set to Y than all the
										// items
										// will autostockR info

	@JsonProperty("ifPromoExistFlagStatus")
	private String ifPromoExistFlagStatus; // if this field set to Y than all
											// the items
											// will autostockR info

	/**
	 * @return the notes
	 */
	public String getNotes() {
		return notes;
	}

	/**
	 * @return the ifPromoExistFlag
	 */
	public String getIfPromoExistFlag() {
		return ifPromoExistFlag;
	}

	/**
	 * @param ifPromoExistFlag
	 *            the ifPromoExistFlag to set
	 */
	public void setIfPromoExistFlag(String ifPromoExistFlag) {
		this.ifPromoExistFlag = ifPromoExistFlag;
	}

	/**
	 * @return the ifPromoExistFlagStatus
	 */
	public String getIfPromoExistFlagStatus() {
		return ifPromoExistFlagStatus;
	}

	/**
	 * @param ifPromoExistFlagStatus
	 *            the ifPromoExistFlagStatus to set
	 */
	public void setIfPromoExistFlagStatus(String ifPromoExistFlagStatus) {
		this.ifPromoExistFlagStatus = ifPromoExistFlagStatus;
	}

	/**
	 * @param notes
	 *            the notes to set
	 */
	public void setNotes(String notes) {
		this.notes = notes;
	}

	/**
	 * @return the weekTodaySalesFlag
	 */
	public String getWeekTodaySalesFlag() {
		return weekTodaySalesFlag;
	}

	/**
	 * @param weekTodaySalesFlag
	 *            the weekTodaySalesFlag to set
	 */
	public void setWeekTodaySalesFlag(String weekTodaySalesFlag) {
		this.weekTodaySalesFlag = weekTodaySalesFlag;
	}

	/**
	 * @return the baseFrctFlag
	 */
	public String getBaseFrctFlag() {
		return baseFrctFlag;
	}

	/**
	 * @param baseFrctFlag
	 *            the baseFrctFlag to set
	 */
	public void setBaseFrctFlag(String baseFrctFlag) {
		this.baseFrctFlag = baseFrctFlag;
	}

	/**
	 * @return the promoDateValidateStatusFlag
	 */
	public String getPromoDateValidateStatusFlag() {
		return promoDateValidateStatusFlag;
	}

	/**
	 * @param promoDateValidateStatusFlag
	 *            the promoDateValidateStatusFlag to set
	 */
	public void setPromoDateValidateStatusFlag(
			String promoDateValidateStatusFlag) {
		this.promoDateValidateStatusFlag = promoDateValidateStatusFlag;
	}

	/**
	 * @return the promoDateValidateFlag
	 */
	public String getPromoDateValidateFlag() {
		return promoDateValidateFlag;
	}

	/**
	 * @param promoDateValidateFlag
	 *            the promoDateValidateFlag to set
	 */
	public void setPromoDateValidateFlag(String promoDateValidateFlag) {
		this.promoDateValidateFlag = promoDateValidateFlag;
	}

	/**
	 * @return the articleNo
	 */
	public String getArticleNo() {
		return articleNo;
	}

	/**
	 * @param articleNo
	 *            the articleNo to set
	 */
	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	/**
	 * @return the articleUom
	 */
	public String getArticleUom() {
		return articleUom;
	}

	/**
	 * @param articleUom
	 *            the articleUom to set
	 */
	public void setArticleUom(String articleUom) {
		this.articleUom = articleUom;
	}

	/**
	 * @return the promoStartDate
	 */
	public String getPromoStartDate() {
		return promoStartDate;
	}

	/**
	 * @param promoStartDate
	 *            the promoStartDate to set
	 */
	public void setPromoStartDate(String promoStartDate) {
		this.promoStartDate = promoStartDate;
	}

	/**
	 * @return the promoEndDate
	 */
	public String getPromoEndDate() {
		return promoEndDate;
	}

	/**
	 * @param promoEndDate
	 *            the promoEndDate to set
	 */
	public void setPromoEndDate(String promoEndDate) {
		this.promoEndDate = promoEndDate;
	}

	/**
	 * @return the buildOrderDate
	 */
	public String getBuildOrderDate() {
		return buildOrderDate;
	}

	/**
	 * @param buildOrderDate
	 *            the buildOrderDate to set
	 */
	public void setBuildOrderDate(String buildOrderDate) {
		this.buildOrderDate = buildOrderDate;
	}

	/**
	 * @return the deliveryDate
	 */
	public String getDeliveryDate() {
		return deliveryDate;
	}

	/**
	 * @param deliveryDate
	 *            the deliveryDate to set
	 */
	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	/**
	 * @return the promoPrice
	 */
	public String getPromoPrice() {
		return promoPrice;
	}

	/**
	 * @param promoPrice
	 *            the promoPrice to set
	 */
	public void setPromoPrice(String promoPrice) {
		this.promoPrice = promoPrice;
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

	/**
	 * @return the baseFrct
	 */
	public String getBaseFrct() {
		return baseFrct;
	}

	/**
	 * @param baseFrct
	 *            the baseFrct to set
	 */
	public void setBaseFrct(String baseFrct) {
		this.baseFrct = baseFrct;
	}

	/**
	 * @return the standardPrice
	 */
	public String getStandardPrice() {
		return standardPrice;
	}

	/**
	 * @param standardPrice
	 *            the standardPrice to set
	 */
	public void setStandardPrice(String standardPrice) {
		this.standardPrice = standardPrice;
	}

	/**
	 * @return the displayType
	 */
	public String getDisplayType() {
		return displayType;
	}

	/**
	 * @param displayType
	 *            the displayType to set
	 */
	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	/**
	 * @return the displayNo
	 */
	public String getDisplayNo() {
		return displayNo;
	}

	/**
	 * @param displayNo
	 *            the displayNo to set
	 */
	public void setDisplayNo(String displayNo) {
		this.displayNo = displayNo;
	}

	/**
	 * @return the displayAlpha
	 */
	public String getDisplayAlpha() {
		return displayAlpha;
	}

	/**
	 * @param displayAlpha
	 *            the displayAlpha to set
	 */
	public void setDisplayAlpha(String displayAlpha) {
		this.displayAlpha = displayAlpha;
	}

	/**
	 * @return the mediaTYpe
	 */
	public String getMediaTYpe() {
		return mediaTYpe;
	}

	/**
	 * @param mediaTYpe
	 *            the mediaTYpe to set
	 */
	public void setMediaTYpe(String mediaTYpe) {
		this.mediaTYpe = mediaTYpe;
	}

	/**
	 * @return the promoOfferNo
	 */
	public String getPromoOfferNo() {
		return promoOfferNo;
	}

	/**
	 * @param promoOfferNo
	 *            the promoOfferNo to set
	 */
	public void setPromoOfferNo(String promoOfferNo) {
		this.promoOfferNo = promoOfferNo;
	}

	/**
	 * @return the promoType
	 */
	public String getPromoType() {
		return promoType;
	}

	/**
	 * @param promoType
	 *            the promoType to set
	 */
	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	/**
	 * @return the createdUserId
	 */
	public String getCreatedUserId() {
		return createdUserId;
	}

	/**
	 * @param createdUserId
	 *            the createdUserId to set
	 */
	public void setCreatedUserId(String createdUserId) {
		this.createdUserId = createdUserId;
	}

	/**
	 * @return the createdDate
	 */
	public String getCreatedDate() {
		return createdDate;
	}

	/**
	 * @param createdDate
	 *            the createdDate to set
	 */
	public void setCreatedDate(String createdDate) {
		this.createdDate = createdDate;
	}

	/**
	 * @return the updateUserId
	 */
	public String getUpdateUserId() {
		return updateUserId;
	}

	/**
	 * @param updateUserId
	 *            the updateUserId to set
	 */
	public void setUpdateUserId(String updateUserId) {
		this.updateUserId = updateUserId;
	}

	/**
	 * @return the updatedDate
	 */
	public String getUpdatedDate() {
		return updatedDate;
	}

	/**
	 * @param updatedDate
	 *            the updatedDate to set
	 */
	public void setUpdatedDate(String updatedDate) {
		this.updatedDate = updatedDate;
	}

	/**
	 * @return the buckedId
	 */
	public String getBuckedId() {
		return buckedId;
	}

	/**
	 * @param buckedId
	 *            the buckedId to set
	 */
	public void setBuckedId(String buckedId) {
		this.buckedId = buckedId;
	}

	/**
	 * @return the frctGrpId
	 */
	public String getFrctGrpId() {
		return frctGrpId;
	}

	/**
	 * @param frctGrpId
	 *            the frctGrpId to set
	 */
	public void setFrctGrpId(String frctGrpId) {
		this.frctGrpId = frctGrpId;
	}

	/**
	 * @return the promoCreateStatus
	 */
	public String getPromoCreateStatus() {
		return promoCreateStatus;
	}

	/**
	 * @param promoCreateStatus
	 *            the promoCreateStatus to set
	 */
	public void setPromoCreateStatus(String promoCreateStatus) {
		this.promoCreateStatus = promoCreateStatus;
	}

	/**
	 * @return the buildValidateFlag
	 */
	public String getBuildValidateFlag() {
		return buildValidateFlag;
	}

	/**
	 * @param buildValidateFlag
	 *            the buildValidateFlag to set
	 */
	public void setBuildValidateFlag(String buildValidateFlag) {
		this.buildValidateFlag = buildValidateFlag;
	}

	/**
	 * @return the buildValidateStatusFlag
	 */
	public String getBuildValidateStatusFlag() {
		return buildValidateStatusFlag;
	}

	/**
	 * @param buildValidateStatusFlag
	 *            the buildValidateStatusFlag to set
	 */
	public void setBuildValidateStatusFlag(String buildValidateStatusFlag) {
		this.buildValidateStatusFlag = buildValidateStatusFlag;
	}

	/**
	 * @return the demandValidateFlag
	 */
	public String getDemandValidateFlag() {
		return demandValidateFlag;
	}

	/**
	 * @param demandValidateFlag
	 *            the demandValidateFlag to set
	 */
	public void setDemandValidateFlag(String demandValidateFlag) {
		this.demandValidateFlag = demandValidateFlag;
	}

	/**
	 * @return the demandValidateStatusFlag
	 */
	public String getDemandValidateStatusFlag() {
		return demandValidateStatusFlag;
	}

	/**
	 * @param demandValidateStatusFlag
	 *            the demandValidateStatusFlag to set
	 */
	public void setDemandValidateStatusFlag(String demandValidateStatusFlag) {
		this.demandValidateStatusFlag = demandValidateStatusFlag;
	}

	/**
	 * @return the displayValidateFlag
	 */
	public String getDisplayValidateFlag() {
		return displayValidateFlag;
	}

	/**
	 * @param displayValidateFlag
	 *            the displayValidateFlag to set
	 */
	public void setDisplayValidateFlag(String displayValidateFlag) {
		this.displayValidateFlag = displayValidateFlag;
	}

	/**
	 * @return the displayValidateStatusFlag
	 */
	public String getDisplayValidateStatusFlag() {
		return displayValidateStatusFlag;
	}

	/**
	 * @param displayValidateStatusFlag
	 *            the displayValidateStatusFlag to set
	 */
	public void setDisplayValidateStatusFlag(String displayValidateStatusFlag) {
		this.displayValidateStatusFlag = displayValidateStatusFlag;
	}

	/**
	 * @return the deliveryDateValidateFlag
	 */
	public String getDeliveryDateValidateFlag() {
		return deliveryDateValidateFlag;
	}

	/**
	 * @param deliveryDateValidateFlag
	 *            the deliveryDateValidateFlag to set
	 */
	public void setDeliveryDateValidateFlag(String deliveryDateValidateFlag) {
		this.deliveryDateValidateFlag = deliveryDateValidateFlag;
	}

	/**
	 * @return the deliveryDateValidateStatusFlag
	 */
	public String getDeliveryDateValidateStatusFlag() {
		return deliveryDateValidateStatusFlag;
	}

	/**
	 * @param deliveryDateValidateStatusFlag
	 *            the deliveryDateValidateStatusFlag to set
	 */
	public void setDeliveryDateValidateStatusFlag(
			String deliveryDateValidateStatusFlag) {
		this.deliveryDateValidateStatusFlag = deliveryDateValidateStatusFlag;
	}

	/**
	 * @return the buildQty
	 */
	public Integer getBuildQty() {
		return buildQty;
	}

	/**
	 * @param buildQty
	 *            the buildQty to set
	 */
	public void setBuildQty(Integer buildQty) {
		this.buildQty = buildQty;
	}

	/**
	 * @return the displayQty
	 */
	public Integer getDisplayQty() {
		return displayQty;
	}

	/**
	 * @param displayQty
	 *            the displayQty to set
	 */
	public void setDisplayQty(Integer displayQty) {
		this.displayQty = displayQty;
	}

	/**
	 * @return the demandQty
	 */
	public Integer getDemandQty() {
		return demandQty;
	}

	/**
	 * @param demandQty
	 *            the demandQty to set
	 */
	public void setDemandQty(Integer demandQty) {
		this.demandQty = demandQty;
	}

	/**
	 * @return the wtdQty
	 */
	public Integer getWtdQty() {
		return wtdQty;
	}

	/**
	 * @param wtdQty
	 *            the wtdQty to set
	 */
	public void setWtdQty(Integer wtdQty) {
		this.wtdQty = wtdQty;
	}

	/**
	 * @return the ewtdQty
	 */
	public Integer getEwtdQty() {
		return ewtdQty;
	}

	/**
	 * @param ewtdQty
	 *            the ewtdQty to set
	 */
	public void setEwtdQty(Integer ewtdQty) {
		this.ewtdQty = ewtdQty;
	}

	public InStorePromoArticleInfo() {

	}

	public InStorePromoArticleInfo(String articleNo, String articleUom,
			String promoStartDate, String promoEndDate, String buildOrderDate,
			String deliveryDate, Integer buildQty, Integer displayQty,
			Integer demandQty, String promoPrice, String om, String baseFrct,
			String promFrct, String standardPrice, String displayType,
			String displayNo, String displayAlpha, String mediaTYpe,
			String promoOfferNo, String promoType, String createdUserId,
			String createdDate, String updateUserId, String updatedDate,
			String buckedId, String frctGrpId, Integer wtdQty, Integer ewtdQty,
			String promoCreateStatus, String buildValidateFlag,
			String buildValidateStatusFlag, String demandValidateFlag,
			String demandValidateStatusFlag, String displayValidateFlag,
			String displayValidateStatusFlag, String deliveryDateValidateFlag,
			String deliveryDateValidateStatusFlag, String autoFrctFlag,
			String autoStockRFlag) {
		super();
		this.autoFrctFlag = autoFrctFlag;
		this.autoStockRFlag = autoStockRFlag;
		this.articleNo = articleNo;
		this.articleUom = articleUom;
		this.promoStartDate = promoStartDate;
		this.promoEndDate = promoEndDate;
		this.buildOrderDate = buildOrderDate;
		this.deliveryDate = deliveryDate;
		this.buildQty = buildQty;
		this.displayQty = displayQty;
		this.demandQty = demandQty;
		this.promoPrice = promoPrice;
		this.om = om;
		this.baseFrct = baseFrct;
		this.standardPrice = standardPrice;
		this.displayType = displayType;
		this.displayNo = displayNo;
		this.displayAlpha = displayAlpha;
		this.mediaTYpe = mediaTYpe;
		this.promoOfferNo = promoOfferNo;
		this.promoType = promoType;
		this.createdUserId = createdUserId;
		this.createdDate = createdDate;
		this.updateUserId = updateUserId;
		this.updatedDate = updatedDate;
		this.buckedId = buckedId;
		this.frctGrpId = frctGrpId;
		this.wtdQty = wtdQty;
		this.ewtdQty = ewtdQty;
		this.promoCreateStatus = promoCreateStatus;
		this.buildValidateFlag = buildValidateFlag;
		this.buildValidateStatusFlag = buildValidateStatusFlag;
		this.demandValidateFlag = demandValidateFlag;
		this.demandValidateStatusFlag = demandValidateStatusFlag;
		this.displayValidateFlag = displayValidateFlag;
		this.displayValidateStatusFlag = displayValidateStatusFlag;
		this.deliveryDateValidateFlag = deliveryDateValidateFlag;
		this.deliveryDateValidateStatusFlag = deliveryDateValidateStatusFlag;
	}

	/**
	 * @return the autoStockRFlag
	 */
	public String getAutoStockRFlag() {
		return autoStockRFlag;
	}

	/**
	 * @param autoStockRFlag
	 *            the autoStockRFlag to set
	 */
	public void setAutoStockRFlag(String autoStockRFlag) {
		this.autoStockRFlag = autoStockRFlag;
	}

	/**
	 * @return the autoFrctFlag
	 */
	public String getAutoFrctFlag() {
		return autoFrctFlag;
	}

	/**
	 * @param autoFrctFlag
	 *            the autoFrctFlag to set
	 */
	public void setAutoFrctFlag(String autoFrctFlag) {
		this.autoFrctFlag = autoFrctFlag;
	}

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department
	 *            the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	/**
	 * @return the category
	 */
	public String getCategory() {
		return category;
	}

	/**
	 * @param category
	 *            the category to set
	 */
	public void setCategory(String category) {
		this.category = category;
	}

	/**
	 * @return the subCategory
	 */
	public String getSubCategory() {
		return subCategory;
	}

	/**
	 * @param subCategory
	 *            the subCategory to set
	 */
	public void setSubCategory(String subCategory) {
		this.subCategory = subCategory;
	}

	/**
	 * @return the segment
	 */
	public String getSegment() {
		return segment;
	}

	/**
	 * @param segment
	 *            the segment to set
	 */
	public void setSegment(String segment) {
		this.segment = segment;
	}

	/**
	 * @return the source_of_supp_ind
	 */
	public String getSource_of_supp_ind() {
		return source_of_supp_ind;
	}

	/**
	 * @param source_of_supp_ind
	 *            the source_of_supp_ind to set
	 */
	public void setSource_of_supp_ind(String source_of_supp_ind) {
		this.source_of_supp_ind = source_of_supp_ind;
	}

	/**
	 * @return the order_uom
	 */
	public String getOrder_uom() {
		return order_uom;
	}

	/**
	 * @param order_uom
	 *            the order_uom to set
	 */
	public void setOrder_uom(String order_uom) {
		this.order_uom = order_uom;
	}

	/**
	 * @return the distributionUom
	 */
	public String getDistributionUom() {
		return distributionUom;
	}

	/**
	 * @param distributionUom
	 *            the distributionUom to set
	 */
	public void setDistributionUom(String distributionUom) {
		this.distributionUom = distributionUom;
	}

	/**
	 * @return the promoSalesOrgStartDay
	 */
	public String getPromoSalesOrgStartDay() {
		return promoSalesOrgStartDay;
	}

	/**
	 * @param promoSalesOrgStartDay
	 *            the promoSalesOrgStartDay to set
	 */
	public void setPromoSalesOrgStartDay(String promoSalesOrgStartDay) {
		this.promoSalesOrgStartDay = promoSalesOrgStartDay;
	}

	/**
	 * @return the promoSalesOrgEndDay
	 */
	public String getPromoSalesOrgEndDay() {
		return promoSalesOrgEndDay;
	}

	/**
	 * @param promoSalesOrgEndDay
	 *            the promoSalesOrgEndDay to set
	 */
	public void setPromoSalesOrgEndDay(String promoSalesOrgEndDay) {
		this.promoSalesOrgEndDay = promoSalesOrgEndDay;
	}

	/**
	 * @return the weekStartDate
	 */
	public String getWeekStartDate() {
		return weekStartDate;
	}

	/**
	 * @param weekStartDate
	 *            the weekStartDate to set
	 */
	public void setWeekStartDate(String weekStartDate) {
		this.weekStartDate = weekStartDate;
	}

	/**
	 * @return the promoEndDateStartday
	 */
	public String getPromoEndDateStartday() {
		return promoEndDateStartday;
	}

	/**
	 * @param promoEndDateStartday
	 *            the promoEndDateStartday to set
	 */
	public void setPromoEndDateStartday(String promoEndDateStartday) {
		this.promoEndDateStartday = promoEndDateStartday;
	}

	/**
	 * @return the promoEndDateEndday
	 */
	public String getPromoEndDateEndday() {
		return promoEndDateEndday;
	}

	/**
	 * @param promoEndDateEndday
	 *            the promoEndDateEndday to set
	 */
	public void setPromoEndDateEndday(String promoEndDateEndday) {
		this.promoEndDateEndday = promoEndDateEndday;
	}

	/**
	 * @return the promoCreationRcStatus
	 */
	public String getPromoCreationRcStatus() {
		return promoCreationRcStatus;
	}

	/**
	 * @param promoCreationRcStatus
	 *            the promoCreationRcStatus to set
	 */
	public void setPromoCreationRcStatus(String promoCreationRcStatus) {
		this.promoCreationRcStatus = promoCreationRcStatus;
	}

	/**
	 * @return the promoCreationSAPStatus
	 */
	public String getPromoCreationSAPStatus() {
		return promoCreationSAPStatus;
	}

	/**
	 * @param promoCreationSAPStatus
	 *            the promoCreationSAPStatus to set
	 */
	public void setPromoCreationSAPStatus(String promoCreationSAPStatus) {
		this.promoCreationSAPStatus = promoCreationSAPStatus;
	}

	/**
	 * @return the newPrice
	 */
	public String getNewPrice() {
		return newPrice;
	}

	/**
	 * @param newPrice
	 *            the newPrice to set
	 */
	public void setNewPrice(String newPrice) {
		this.newPrice = newPrice;
	}

	/**
	 * @return the limitQty
	 */
	public String getLimitQty() {
		return limitQty;
	}

	/**
	 * @param limitQty
	 *            the limitQty to set
	 */
	public void setLimitQty(String limitQty) {
		this.limitQty = limitQty;
	}

	public String getVar_wgt() {
		return var_wgt;
	}

	public void setVar_wgt(String var_wgt) {
		this.var_wgt = var_wgt;
	}

	public String getPiOmVal() {
		return piOmVal;
	}

	public void setPiOmVal(String piOmVal) {
		this.piOmVal = piOmVal;
	}

	public String getPromFrct() {
		return promFrct;
	}

	public void setPromFrct(String promFrct) {
		this.promFrct = promFrct;
	}

	public String getArt_mas_uom() {
		return art_mas_uom;
	}

	public void setArt_mas_uom(String art_mas_uom) {
		this.art_mas_uom = art_mas_uom;
	}

	public String getPi_uom() {
		return pi_uom;
	}

	public void setPi_uom(String pi_uom) {
		this.pi_uom = pi_uom;
	}

	public String getDemandEditFlag() {
		return demandEditFlag;
	}

	public void setDemandEditFlag(String demandEditFlag) {
		this.demandEditFlag = demandEditFlag;
	}

	public InStorePromoArticleInfo(JsonElement art_mas_uom,
			JsonElement demandEditFlag, JsonElement pi_uom,
			JsonElement var_wgt, JsonElement piOmVal,
			JsonElement promoSalesOrgStartDay, JsonElement promoSalesOrgEndDay,
			JsonElement promoEndDateStartday, JsonElement promoEndDateEndday,
			JsonElement articleNo, JsonElement articleUom,
			JsonElement promoStartDate, JsonElement promoEndDate,
			JsonElement buildOrderDate, JsonElement deliveryDate,
			JsonElement buildQty, JsonElement displayQty,
			JsonElement demandQty, JsonElement promoPrice, JsonElement om,
			JsonElement baseFrct, JsonElement promFrct,
			JsonElement standardPrice, JsonElement displayType,
			JsonElement displayNo, JsonElement displayAlpha,
			JsonElement mediaTYpe, JsonElement promoOfferNo,
			JsonElement promoType, JsonElement createdUserId,
			JsonElement createdDate, JsonElement updateUserId,
			JsonElement updatedDate, JsonElement buckedId,
			JsonElement frctGrpId, JsonElement wtdQty, JsonElement ewtdQty,
			JsonElement promoCreateStatus, JsonElement buildValidateFlag,
			JsonElement buildValidateStatusFlag,
			JsonElement demandValidateFlag,
			JsonElement demandValidateStatusFlag,
			JsonElement displayValidateFlag,
			JsonElement displayValidateStatusFlag,
			JsonElement deliveryDateValidateFlag,
			JsonElement deliveryDateValidateStatusFlag,
			JsonElement autoStockRFlag, JsonElement autoFrctFlag,
			JsonElement department, JsonElement category,
			JsonElement subCategory, JsonElement segment,
			JsonElement promoDateValidateFlag,
			JsonElement promoDateValidateStatusFlag, JsonElement baseFrctFlag,
			JsonElement source_of_supp_ind, JsonElement order_uom,
			JsonElement distributionUom, JsonElement weekTodaySalesFlag,
			JsonElement weekStartDate, JsonElement notes,
			JsonElement promoCreationRcStatus,
			JsonElement promoCreationSAPStatus, JsonElement newPrice,
			JsonElement limitQty, JsonElement ifPromoExistFlag,
			JsonElement ifPromoExistFlagStatus) {
		super();
		this.art_mas_uom = checkString(art_mas_uom);
		this.demandEditFlag = checkString(demandEditFlag);
		this.pi_uom = checkString(pi_uom);
		this.var_wgt = checkString(var_wgt);
		this.piOmVal = checkString(piOmVal);
		this.promoSalesOrgStartDay = checkString(promoSalesOrgStartDay);
		this.promoSalesOrgEndDay = checkString(promoSalesOrgEndDay);
		this.promoEndDateStartday = checkString(promoEndDateStartday);
		this.promoEndDateEndday = checkString(promoEndDateEndday);
		this.articleNo = checkString(articleNo);
		this.articleUom = checkString(articleUom);
		this.promoStartDate = checkString(promoStartDate);
		this.promoEndDate = checkString(promoEndDate);
		this.buildOrderDate = checkString(buildOrderDate);
		this.deliveryDate = checkString(deliveryDate);
		this.buildQty = buildQty != null ? checkInt(buildQty) : null;
		this.displayQty = displayQty != null ? checkInt(displayQty) : null;
		this.demandQty = demandQty != null ? checkInt(demandQty) : null;
		this.promoPrice = checkString(promoPrice);
		this.om = checkString(om);
		this.baseFrct = checkString(baseFrct);
		this.promFrct = checkString(promFrct);
		this.standardPrice = checkString(standardPrice);
		this.displayType = checkString(displayType);
		this.displayNo = checkString(displayNo);
		this.displayAlpha = checkString(displayAlpha);
		this.mediaTYpe = checkString(mediaTYpe);
		this.promoOfferNo = checkString(promoOfferNo);
		this.promoType = checkString(promoType);
		this.createdUserId = checkString(createdUserId);
		this.createdDate = checkString(createdDate);
		this.updateUserId = checkString(updateUserId);
		this.updatedDate = checkString(updatedDate);
		this.buckedId = checkString(buckedId);
		this.frctGrpId = checkString(frctGrpId);
		this.wtdQty = wtdQty != null ? checkInt(wtdQty) : null;
		this.ewtdQty = ewtdQty != null ? checkInt(ewtdQty) : null;
		this.promoCreateStatus = checkString(promoCreateStatus);
		this.buildValidateFlag = checkString(buildValidateFlag);
		this.buildValidateStatusFlag = checkString(buildValidateStatusFlag);
		this.demandValidateFlag = checkString(demandValidateFlag);
		this.demandValidateStatusFlag = checkString(demandValidateStatusFlag);
		this.displayValidateFlag = checkString(displayValidateFlag);
		this.displayValidateStatusFlag = checkString(displayValidateStatusFlag);
		this.deliveryDateValidateFlag = checkString(deliveryDateValidateFlag);
		this.deliveryDateValidateStatusFlag = checkString(deliveryDateValidateStatusFlag);
		this.autoStockRFlag = checkString(autoStockRFlag);
		this.autoFrctFlag = checkString(autoFrctFlag);
		this.department = checkString(department);
		this.category = checkString(category);
		this.subCategory = checkString(subCategory);
		this.segment = checkString(segment);
		this.promoDateValidateFlag = checkString(promoDateValidateFlag);
		this.promoDateValidateStatusFlag = checkString(promoDateValidateStatusFlag);
		this.baseFrctFlag = checkString(baseFrctFlag);
		this.source_of_supp_ind = checkString(source_of_supp_ind);
		this.order_uom = checkString(order_uom);
		this.distributionUom = checkString(distributionUom);
		this.weekTodaySalesFlag = checkString(weekTodaySalesFlag);
		this.weekStartDate = checkString(weekStartDate);
		this.notes = checkString(notes);
		this.promoCreationRcStatus = checkString(promoCreationRcStatus);
		this.promoCreationSAPStatus = checkString(promoCreationSAPStatus);
		this.newPrice = checkString(newPrice);
		this.limitQty = checkString(limitQty);
		this.ifPromoExistFlag = checkString(ifPromoExistFlag);
		this.ifPromoExistFlagStatus = checkString(ifPromoExistFlagStatus);
	}

	private String checkString(Object val) {
		if (val != null)
			return val.toString().replaceAll("\"", "");
		else
			return "";
	}

	private Integer checkInt(Object val) {
		Integer nval = null;
		try {
			if (val != null && !val.equals(""))
				nval = Integer.parseInt(val.toString().replaceAll("\"", ""));
			else
				nval = null;
		} catch (Exception e) {

		}
		return nval;
	}

	/**
	 * @return the reason
	 */
	public String getReason() {
		return reason;
	}

	/**
	 * @param reason the reason to set
	 */
	public void setReason(String reason) {
		this.reason = reason;
	}
}
