package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleSiteView {

	@JsonProperty("article")
	private String article;
	@JsonProperty("site")
	private String siteNo;
	@JsonProperty("storage_loc")
	private String storageLocation;
	@JsonProperty("storage_loc_desc")
	private String storageLocationDesc;
	@JsonProperty("srt")
	private String srt;
	@JsonProperty("src_of_supp")
	private String srcOfSupply;
	@JsonProperty("src_of_supp_desc")
	private String srcOfSupplyDesc;
	@JsonProperty("check_age_proof")
	private String checkAgeProof;
	@JsonProperty("eft_grp_id")
	private String eftGroupId;
	@JsonProperty("last_del_date")
	private String lastDelDate;
	@JsonProperty("last_ord_qty")
	private String lastOrdQty;
	@JsonProperty("last_rcv_qty")
	private String lastRcvQty;
	@JsonProperty("next_del_date")
	private String nextDelDate;
	@JsonProperty("next_ord_qty")
	private String nextOrdQty;
	@JsonProperty("last_po")
	private String lastPo;
	@JsonProperty("next_po")
	private String nextPo;
	@JsonProperty("last_po_item")
	private String lastPoItem;
	@JsonProperty("next_po_item")
	private String nextPoItem;

	public String getStorageLocationDesc() {
		return storageLocationDesc;
	}

	public void setStorageLocationDesc(String storageLocationDesc) {
		this.storageLocationDesc = storageLocationDesc;
	}

	public String getSrcOfSupplyDesc() {
		return srcOfSupplyDesc;
	}

	public void setSrcOfSupplyDesc(String srcOfSupplyDesc) {
		this.srcOfSupplyDesc = srcOfSupplyDesc;
	}

	public String getLastPo() {
		return lastPo;
	}

	public void setLastPo(String lastPo) {
		this.lastPo = lastPo;
	}

	public String getNextPo() {
		return nextPo;
	}

	public void setNextPo(String nextPo) {
		this.nextPo = nextPo;
	}

	public String getLastPoItem() {
		return lastPoItem;
	}

	public void setLastPoItem(String lastPoItem) {
		this.lastPoItem = lastPoItem;
	}

	public String getNextPoItem() {
		return nextPoItem;
	}

	public void setNextPoItem(String nextPoItem) {
		this.nextPoItem = nextPoItem;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getStorageLocation() {
		return storageLocation;
	}

	public void setStorageLocation(String storageLocation) {
		this.storageLocation = storageLocation;
	}

	public String getSrt() {
		return srt;
	}

	public void setSrt(String srt) {
		this.srt = srt;
	}

	public String getSrcOfSupply() {
		return srcOfSupply;
	}

	public void setSrcOfSupply(String srcOfSupply) {
		this.srcOfSupply = srcOfSupply;
	}

	public String getCheckAgeProof() {
		return checkAgeProof;
	}

	public void setCheckAgeProof(String checkAgeProof) {
		this.checkAgeProof = checkAgeProof;
	}

	public String getEftGroupId() {
		return eftGroupId;
	}

	public void setEftGroupId(String eftGroupId) {
		this.eftGroupId = eftGroupId;
	}

	public String getLastDelDate() {
		if (this.lastDelDate != null) {
			String result = PortalUtil.convertToStandard(lastDelDate);
			if (result != null && result != "")
				return result;
		}
		return lastDelDate;
	}

	public void setLastDelDate(String lastDelDate) {
		this.lastDelDate = lastDelDate;
	}

	public String getLastOrdQty() {
		return lastOrdQty;
	}

	public void setLastOrdQty(String lastOrdQty) {
		this.lastOrdQty = lastOrdQty;
	}

	public String getLastRcvQty() {
		return lastRcvQty;
	}

	public void setLastRcvQty(String lastRcvQty) {
		this.lastRcvQty = lastRcvQty;
	}

	public String getNextDelDate() {
		if (this.nextDelDate != null) {
			String result = PortalUtil.convertToStandard(nextDelDate);
			if (result != null && result != "")
				return result;
		}
		return nextDelDate;
	}

	public void setNextDelDate(String nextDelDate) {
		this.nextDelDate = nextDelDate;
	}

	public String getNextOrdQty() {
		return nextOrdQty;
	}

	public void setNextOrdQty(String nextOrdQty) {
		this.nextOrdQty = nextOrdQty;
	}

}