package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PReqItemData {

	@JsonProperty("order_uom")
	private String orderUOM;

	@JsonProperty("vendor_ref_no")
	private String vendorRefNo;

	@JsonProperty("pick_req_qty")
	private String pickReqQty;

	@JsonProperty("order_qty")
	private String orderQty;

	@JsonProperty("dispatched_qty_uom")
	private String dispatchedQtyUOM;

	@JsonProperty("allocated_qty_uom")
	private String allocatedQtyUOM;

	@JsonProperty("pack_size")
	private String packSize;

	@JsonProperty("pick_req_uom")
	private String pickReqUOM;

	@JsonProperty("unsupplied_qty")
	private String unSuppliedQty;

	@JsonProperty("iv_preq_no")
	private String ivPReqNo;

	@JsonProperty("allocated_qty")
	private String allocatedQty;

	@JsonProperty("received_qty_uom")
	private String receivedQtyUOM;

	@JsonProperty("article_desc")
	private String articleDesc;

	@JsonProperty("unsupplied_reason")
	private String unsuppliedReason;

	// @JsonProperty("article")
	private String article;

	@JsonProperty("unsupplied_diff")
	private String unsuppliedDiff;

	@JsonProperty("dispatched_qty")
	private String dispatchedQty;

	@JsonProperty("received_qty")
	private String receivedQty;

	@JsonProperty("fair_share_qty")
	private String fairShareQty;

	// Newly Added JSON Property

	@JsonProperty("orderUOM")
	private String orderUOM_m;

	@JsonProperty("vendorRefNo")
	private String vendorRefNo_m;

	@JsonProperty("pickReqQty")
	private String pickReqQty_m;

	@JsonProperty("orderQty")
	private String orderQty_m;

	@JsonProperty("dispatchedQtyUOM")
	private String dispatchedQtyUOM_m;

	@JsonProperty("allocatedQtyUOM")
	private String allocatedQtyUOM_m;

	@JsonProperty("packSize")
	private String packSize_m;

	@JsonProperty("pickReqUOM")
	private String pickReqUOM_m;

	@JsonProperty("unSuppliedQty")
	private String unSuppliedQty_m;

	@JsonProperty("ivPReqNo")
	private String ivPReqNo_m;

	@JsonProperty("allocatedQty")
	private String allocatedQty_m;

	@JsonProperty("receivedQtyUOM")
	private String receivedQtyUOM_m;

	@JsonProperty("articleDesc")
	private String articleDesc_m;

	@JsonProperty("unsuppliedReason")
	private String unsuppliedReason_m;

	@JsonProperty("unsuppliedDiff")
	private String unsuppliedDiff_m;

	@JsonProperty("dispatchedQty")
	private String dispatchedQty_m;

	@JsonProperty("receivedQty")
	private String receivedQty_m;

	@JsonProperty("fairShareQty")
	private String fairShareQty_m;

	/**
	 * @param orderUOM
	 * @param vendorRefNo
	 * @param pickReqQty
	 * @param orderQty
	 * @param ivSite
	 * @param dispatchedQtyUOM
	 * @param allocatedQtyUOM
	 * @param packSize
	 * @param pickReqUOM
	 * @param unSuppliedQty
	 * @param ivPReqNo
	 * @param allocatedQty
	 * @param receivedQtyUOM
	 * @param articleDesc
	 * @param unsuppliedReason
	 * @param unsuppliedDiff
	 * @param dispatchedQty
	 * @param receivedQty
	 * @param fairShareQty
	 */
	@JsonCreator
	public PReqItemData(@JsonProperty("order_uom") String orderUOM,
			@JsonProperty("vendor_ref_no") String vendorRefNo,
			@JsonProperty("pick_req_qty") String pickReqQty,
			@JsonProperty("order_qty") String orderQty
			//,String ivSite
			,
			@JsonProperty("dispatched_qty_uom") String dispatchedQtyUOM,
			@JsonProperty("allocated_qty_uom")String allocatedQtyUOM,
			@JsonProperty("pack_size") String packSize,
			@JsonProperty("pick_req_uom") String pickReqUOM,
			@JsonProperty("unsupplied_qty") String unSuppliedQty,
			//String ivPReqNo,
			@JsonProperty("allocated_qty") String allocatedQty,
			@JsonProperty("received_qty_uom") String receivedQtyUOM,
			@JsonProperty("article_desc") String articleDesc,
			@JsonProperty("unsupplied_reason") String unsuppliedReason,
			@JsonProperty("unsupplied_diff") String unsuppliedDiff,
			@JsonProperty("dispatched_qty") String dispatchedQty,
			@JsonProperty("received_qty") String receivedQty,
			@JsonProperty("fair_share_qty") String fairShareQty) {

		this.orderUOM = orderUOM;
		this.vendorRefNo = vendorRefNo;
		this.pickReqQty = pickReqQty;
		this.orderQty = orderQty;
		// this.ivSite = ivSite;
		this.dispatchedQtyUOM = dispatchedQtyUOM;
		this.allocatedQtyUOM = allocatedQtyUOM;
		this.packSize = packSize;
		this.pickReqUOM = pickReqUOM;
		this.unSuppliedQty = unSuppliedQty;
		this.ivPReqNo = ivPReqNo;
		this.allocatedQty = allocatedQty;
		this.receivedQtyUOM = receivedQtyUOM;
		this.articleDesc = articleDesc;
		this.unsuppliedReason = unsuppliedReason;
		this.unsuppliedDiff = unsuppliedDiff;
		this.dispatchedQty = dispatchedQty;
		this.receivedQty = receivedQty;
		this.fairShareQty = fairShareQty;

		this.orderUOM_m = orderUOM;
		this.vendorRefNo_m = vendorRefNo;
		this.pickReqQty_m = pickReqQty;
		this.orderQty_m = orderQty;
		// this.ivSite_m = ivSite;
		this.dispatchedQtyUOM_m = dispatchedQtyUOM;
		this.allocatedQtyUOM_m = allocatedQtyUOM;
		this.packSize_m = packSize;
		this.pickReqUOM_m = pickReqUOM;
		this.unSuppliedQty_m = unSuppliedQty;
		this.ivPReqNo_m = ivPReqNo;
		this.allocatedQty_m = allocatedQty;
		this.receivedQtyUOM_m = receivedQtyUOM;
		this.articleDesc_m = articleDesc;
		this.unsuppliedReason_m = unsuppliedReason;
		this.unsuppliedDiff_m = unsuppliedDiff;
		this.dispatchedQty_m = dispatchedQty;
		this.receivedQty_m = receivedQty;
		this.fairShareQty_m = fairShareQty;
	}

	/**
	 * @return the orderUOM
	 */
	public String getOrderUOM() {
		return orderUOM;
	}

	/**
	 * @param orderUOM
	 *            the orderUOM to set
	 */
	public void setOrderUOM(String orderUOM) {
		this.orderUOM = orderUOM;
	}

	/**
	 * @return the vendorRefNo
	 */
	public String getVendorRefNo() {
		return vendorRefNo;
	}

	/**
	 * @param vendorRefNo
	 *            the vendorRefNo to set
	 */
	public void setVendorRefNo(String vendorRefNo) {
		this.vendorRefNo = vendorRefNo;
	}

	/**
	 * @return the pickReqQty
	 */
	public String getPickReqQty() {
		return pickReqQty;
	}

	/**
	 * @param pickReqQty
	 *            the pickReqQty to set
	 */
	public void setPickReqQty(String pickReqQty) {
		this.pickReqQty = pickReqQty;
	}

	/**
	 * @return the orderQty
	 */
	public String getOrderQty() {
		return orderQty;
	}

	/**
	 * @param orderQty
	 *            the orderQty to set
	 */
	public void setOrderQty(String orderQty) {
		this.orderQty = orderQty;
	}

	/**
	 * @return the dispatchedQtyUOM
	 */
	public String getDispatchedQtyUOM() {
		return dispatchedQtyUOM;
	}

	/**
	 * @param dispatchedQtyUOM
	 *            the dispatchedQtyUOM to set
	 */
	public void setDispatchedQtyUOM(String dispatchedQtyUOM) {
		this.dispatchedQtyUOM = dispatchedQtyUOM;
	}

	/**
	 * @return the allocatedQtyUOM
	 */
	public String getAllocatedQtyUOM() {
		return allocatedQtyUOM;
	}

	/**
	 * @param allocatedQtyUOM
	 *            the allocatedQtyUOM to set
	 */
	public void setAllocatedQtyUOM(String allocatedQtyUOM) {
		this.allocatedQtyUOM = allocatedQtyUOM;
	}

	/**
	 * @return the packSize
	 */
	public String getPackSize() {
		return packSize;
	}

	/**
	 * @param packSize
	 *            the packSize to set
	 */
	public void setPackSize(String packSize) {
		this.packSize = packSize;
	}

	/**
	 * @return the pickReqUOM
	 */
	public String getPickReqUOM() {
		return pickReqUOM;
	}

	/**
	 * @param pickReqUOM
	 *            the pickReqUOM to set
	 */
	public void setPickReqUOM(String pickReqUOM) {
		this.pickReqUOM = pickReqUOM;
	}

	/**
	 * @return the unSuppliedQty
	 */
	public String getUnSuppliedQty() {
		return unSuppliedQty;
	}

	/**
	 * @param unSuppliedQty
	 *            the unSuppliedQty to set
	 */
	public void setUnSuppliedQty(String unSuppliedQty) {
		this.unSuppliedQty = unSuppliedQty;
	}

	/**
	 * @return the ivPReqNo
	 */
	public String getIvPReqNo() {
		return ivPReqNo;
	}

	/**
	 * @param ivPReqNo
	 *            the ivPReqNo to set
	 */
	public void setIvPReqNo(String ivPReqNo) {
		this.ivPReqNo = ivPReqNo;
	}

	/**
	 * @return the allocatedQty
	 */
	public String getAllocatedQty() {
		return allocatedQty;
	}

	/**
	 * @param allocatedQty
	 *            the allocatedQty to set
	 */
	public void setAllocatedQty(String allocatedQty) {
		this.allocatedQty = allocatedQty;
	}

	/**
	 * @return the receivedQtyUOM
	 */
	public String getReceivedQtyUOM() {
		return receivedQtyUOM;
	}

	/**
	 * @param receivedQtyUOM
	 *            the receivedQtyUOM to set
	 */
	public void setReceivedQtyUOM(String receivedQtyUOM) {
		this.receivedQtyUOM = receivedQtyUOM;
	}

	/**
	 * @return the articleDesc
	 */
	public String getArticleDesc() {
		return articleDesc;
	}

	/**
	 * @param articleDesc
	 *            the articleDesc to set
	 */
	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	/**
	 * @return the unsuppliedReason
	 */
	public String getUnsuppliedReason() {
		return unsuppliedReason;
	}

	/**
	 * @param unsuppliedReason
	 *            the unsuppliedReason to set
	 */
	public void setUnsuppliedReason(String unsuppliedReason) {
		this.unsuppliedReason = unsuppliedReason;
	}

	/**
	 * @return the article
	 */
	public String getArticle() {
		return article;
	}

	/**
	 * @param article
	 *            the article to set
	 */
	public void setArticle(String article) {
		this.article = article;
	}

	/**
	 * @return the unsuppliedDiff
	 */
	public String getUnsuppliedDiff() {
		return unsuppliedDiff;
	}

	/**
	 * @param unsuppliedDiff
	 *            the unsuppliedDiff to set
	 */
	public void setUnsuppliedDiff(String unsuppliedDiff) {
		this.unsuppliedDiff = unsuppliedDiff;
	}

	/**
	 * @return the dispatchedQty
	 */
	public String getDispatchedQty() {
		return dispatchedQty;
	}

	/**
	 * @param dispatchedQty
	 *            the dispatchedQty to set
	 */
	public void setDispatchedQty(String dispatchedQty) {
		this.dispatchedQty = dispatchedQty;
	}

	/**
	 * @return the receivedQty
	 */
	public String getReceivedQty() {
		return receivedQty;
	}

	/**
	 * @param receivedQty
	 *            the receivedQty to set
	 */
	public void setReceivedQty(String receivedQty) {
		this.receivedQty = receivedQty;
	}

	/**
	 * @return the fairShareQty
	 */
	public String getFairShareQty() {
		return fairShareQty;
	}

	/**
	 * @param fairShareQty
	 *            the fairShareQty to set
	 */
	public void setFairShareQty(String fairShareQty) {
		this.fairShareQty = fairShareQty;
	}

	/**
	 * @return the orderUOM_m
	 */
	public String getOrderUOM_m() {
		return orderUOM_m;
	}

	/**
	 * @param orderUOM_m
	 *            the orderUOM_m to set
	 */
	public void setOrderUOM_m(String orderUOM_m) {
		this.orderUOM_m = orderUOM_m;
	}

	/**
	 * @return the vendorRefNo_m
	 */
	public String getVendorRefNo_m() {
		return vendorRefNo_m;
	}

	/**
	 * @param vendorRefNo_m
	 *            the vendorRefNo_m to set
	 */
	public void setVendorRefNo_m(String vendorRefNo_m) {
		this.vendorRefNo_m = vendorRefNo_m;
	}

	/**
	 * @return the pickReqQty_m
	 */
	public String getPickReqQty_m() {
		return pickReqQty_m;
	}

	/**
	 * @param pickReqQty_m
	 *            the pickReqQty_m to set
	 */
	public void setPickReqQty_m(String pickReqQty_m) {
		this.pickReqQty_m = pickReqQty_m;
	}

	/**
	 * @return the orderQty_m
	 */
	public String getOrderQty_m() {
		return orderQty_m;
	}

	/**
	 * @param orderQty_m
	 *            the orderQty_m to set
	 */
	public void setOrderQty_m(String orderQty_m) {
		this.orderQty_m = orderQty_m;
	}

	/**
	 * @return the dispatchedQtyUOM_m
	 */
	public String getDispatchedQtyUOM_m() {
		return dispatchedQtyUOM_m;
	}

	/**
	 * @param dispatchedQtyUOM_m
	 *            the dispatchedQtyUOM_m to set
	 */
	public void setDispatchedQtyUOM_m(String dispatchedQtyUOM_m) {
		this.dispatchedQtyUOM_m = dispatchedQtyUOM_m;
	}

	/**
	 * @return the allocatedQtyUOM_m
	 */
	public String getAllocatedQtyUOM_m() {
		return allocatedQtyUOM_m;
	}

	/**
	 * @param allocatedQtyUOM_m
	 *            the allocatedQtyUOM_m to set
	 */
	public void setAllocatedQtyUOM_m(String allocatedQtyUOM_m) {
		this.allocatedQtyUOM_m = allocatedQtyUOM_m;
	}

	/**
	 * @return the packSize_m
	 */
	public String getPackSize_m() {
		return packSize_m;
	}

	/**
	 * @param packSize_m
	 *            the packSize_m to set
	 */
	public void setPackSize_m(String packSize_m) {
		this.packSize_m = packSize_m;
	}

	/**
	 * @return the pickReqUOM_m
	 */
	public String getPickReqUOM_m() {
		return pickReqUOM_m;
	}

	/**
	 * @param pickReqUOM_m
	 *            the pickReqUOM_m to set
	 */
	public void setPickReqUOM_m(String pickReqUOM_m) {
		this.pickReqUOM_m = pickReqUOM_m;
	}

	/**
	 * @return the unSuppliedQty_m
	 */
	public String getUnSuppliedQty_m() {
		return unSuppliedQty_m;
	}

	/**
	 * @param unSuppliedQty_m
	 *            the unSuppliedQty_m to set
	 */
	public void setUnSuppliedQty_m(String unSuppliedQty_m) {
		this.unSuppliedQty_m = unSuppliedQty_m;
	}

	/**
	 * @return the ivPReqNo_m
	 */
	public String getIvPReqNo_m() {
		return ivPReqNo_m;
	}

	/**
	 * @param ivPReqNo_m
	 *            the ivPReqNo_m to set
	 */
	public void setIvPReqNo_m(String ivPReqNo_m) {
		this.ivPReqNo_m = ivPReqNo_m;
	}

	/**
	 * @return the allocatedQty_m
	 */
	public String getAllocatedQty_m() {
		return allocatedQty_m;
	}

	/**
	 * @param allocatedQty_m
	 *            the allocatedQty_m to set
	 */
	public void setAllocatedQty_m(String allocatedQty_m) {
		this.allocatedQty_m = allocatedQty_m;
	}

	/**
	 * @return the receivedQtyUOM_m
	 */
	public String getReceivedQtyUOM_m() {
		return receivedQtyUOM_m;
	}

	/**
	 * @param receivedQtyUOM_m
	 *            the receivedQtyUOM_m to set
	 */
	public void setReceivedQtyUOM_m(String receivedQtyUOM_m) {
		this.receivedQtyUOM_m = receivedQtyUOM_m;
	}

	/**
	 * @return the articleDesc_m
	 */
	public String getArticleDesc_m() {
		return articleDesc_m;
	}

	/**
	 * @param articleDesc_m
	 *            the articleDesc_m to set
	 */
	public void setArticleDesc_m(String articleDesc_m) {
		this.articleDesc_m = articleDesc_m;
	}

	/**
	 * @return the unsuppliedReason_m
	 */
	public String getUnsuppliedReason_m() {
		return unsuppliedReason_m;
	}

	/**
	 * @param unsuppliedReason_m
	 *            the unsuppliedReason_m to set
	 */
	public void setUnsuppliedReason_m(String unsuppliedReason_m) {
		this.unsuppliedReason_m = unsuppliedReason_m;
	}

	/**
	 * @return the unsuppliedDiff_m
	 */
	public String getUnsuppliedDiff_m() {
		return unsuppliedDiff_m;
	}

	/**
	 * @param unsuppliedDiff_m
	 *            the unsuppliedDiff_m to set
	 */
	public void setUnsuppliedDiff_m(String unsuppliedDiff_m) {
		this.unsuppliedDiff_m = unsuppliedDiff_m;
	}

	/**
	 * @return the dispatchedQty_m
	 */
	public String getDispatchedQty_m() {
		return dispatchedQty_m;
	}

	/**
	 * @param dispatchedQty_m
	 *            the dispatchedQty_m to set
	 */
	public void setDispatchedQty_m(String dispatchedQty_m) {
		this.dispatchedQty_m = dispatchedQty_m;
	}

	/**
	 * @return the receivedQty_m
	 */
	public String getReceivedQty_m() {
		return receivedQty_m;
	}

	/**
	 * @param receivedQty_m
	 *            the receivedQty_m to set
	 */
	public void setReceivedQty_m(String receivedQty_m) {
		this.receivedQty_m = receivedQty_m;
	}

	/**
	 * @return the fairShareQty_m
	 */
	public String getFairShareQty_m() {
		return fairShareQty_m;
	}

	/**
	 * @param fairShareQty_m
	 *            the fairShareQty_m to set
	 */
	public void setFairShareQty_m(String fairShareQty_m) {
		this.fairShareQty_m = fairShareQty_m;
	}

}