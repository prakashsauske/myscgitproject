package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromoSearchResultMetadata {

	@JsonProperty("dispDesc")
	private String dispDesc;

	@JsonProperty("firstLevelType")
	private String firstLevelType;

	@JsonProperty("secondLevelType")
	private String secondLevelType;

	@JsonProperty("categoryId")
	private String categoryId;

	@JsonProperty("categoryName")
	private String categoryName;

	@JsonProperty("subCategoryId")
	private String subCategoryId;

	@JsonProperty("subCategoryName")
	private String subCategoryName;

	@JsonProperty("segmentId")
	private String segmentId;

	@JsonProperty("segmentName")
	private String segmentName;

	@JsonProperty("displayType")
	private String displayType;

	@JsonProperty("displayNo")
	private String displayNo;

	@JsonProperty("displayAlpha")
	private String displayAlpha;

	@JsonProperty("mediaType")
	private String mediaType;

	@JsonProperty("recordCnt")
	private String recordCnt;

	@JsonProperty("mediaDes")
	private String mediaDes;

	public String getFirstLevelType() {
		return firstLevelType;
	}

	public void setFirstLevelType(String firstLevelType) {
		this.firstLevelType = firstLevelType;
	}

	public String getSecondLevelType() {
		return secondLevelType;
	}

	public void setSecondLevelType(String secondLevelType) {
		this.secondLevelType = secondLevelType;
	}

	public String getCategoryId() {
		return categoryId;
	}

	public void setCategoryId(String categoryId) {
		this.categoryId = categoryId;
	}

	public String getCategoryName() {
		return categoryName;
	}

	public void setCategoryName(String categoryName) {
		this.categoryName = categoryName;
	}

	public String getSubCategoryId() {
		return subCategoryId;
	}

	public void setSubCategoryId(String subCategoryId) {
		this.subCategoryId = subCategoryId;
	}

	public String getSubCategoryName() {
		return subCategoryName;
	}

	public void setSubCategoryName(String subCategoryName) {
		this.subCategoryName = subCategoryName;
	}

	public String getSegmentId() {
		return segmentId;
	}

	public void setSegmentId(String segmentId) {
		this.segmentId = segmentId;
	}

	public String getSegmentName() {
		return segmentName;
	}

	public void setSegmentName(String segmentName) {
		this.segmentName = segmentName;
	}

	public String getDisplayType() {
		return displayType;
	}

	public void setDisplayType(String displayType) {
		this.displayType = displayType;
	}

	public String getDisplayNo() {
		return displayNo;
	}

	public void setDisplayNo(String displayNo) {
		this.displayNo = displayNo;
	}

	public String getDisplayAlpha() {
		return displayAlpha;
	}

	public void setDisplayAlpha(String displayAlpha) {
		this.displayAlpha = displayAlpha;
	}

	public String getMediaType() {
		return mediaType;
	}

	public void setMediaType(String mediaType) {
		this.mediaType = mediaType;
	}

	public String getRecordCnt() {
		return recordCnt;
	}

	public void setRecordCnt(String recordCnt) {
		this.recordCnt = recordCnt;
	}

	/**
	 * @return the mediaDes
	 */
	public String getMediaDes() {
		return mediaDes;
	}

	/**
	 * @param mediaDes
	 *            the mediaDes to set
	 */
	public void setMediaDes(String mediaDes) {
		this.mediaDes = mediaDes;
	}

	public String getDispDesc() {
		return dispDesc;
	}

	public void setDispDesc(String dispDesc) {
		this.dispDesc = dispDesc;
	}

}
