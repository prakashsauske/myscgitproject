package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class EDGMSDiscrepancy {

	@JsonProperty("iv_page_no")
	private String pageNo;

	@JsonProperty("iv_date")
	private String date;

	@JsonProperty("iv_site")
	private String siteNo;

	@JsonProperty("po_no")
	private String poNo;

	@JsonProperty("grn_total_qty")
	private String grnTotalqty;

	@JsonProperty("po_amt")
	private String poAmt;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("iv_dis_amt")
	private String ivDisAmt;

	@JsonProperty("amt_diff")
	private String amtDiff;

	@JsonProperty("qty_diff")
	private String qtyDiff;

	@JsonProperty("vendor_no")
	private String vendorNo;

	@JsonProperty("po_total_qty")
	private String poTotalQty;

	@JsonProperty("gr_no")
	private String grNo;

	@JsonProperty("vendor_name")
	private String vendorName;

	@JsonProperty("grn_amt")
	private String grnAmt;

	@JsonProperty("iv_records")
	private String ivRecords;

	@JsonProperty("inv_amt")
	private String invAmt;
	
	private String ngboStoreFlag;

	public String getInvAmt() {
		return invAmt;
	}

	public void setInvAmt(String invAmt) {
		this.invAmt = invAmt;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getDate() {
		if (this.date != null) {
			String result = PortalUtil.convertToStandard(date);
			if (result != null && result != "")
				return result;
		}
		return date;
	}

	public void setDate(String date) {
		this.date = date;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getPoNo() {
		return poNo;
	}

	public void setPoNo(String poNo) {
		this.poNo = poNo;
	}

	public String getGrnTotalqty() {
		return grnTotalqty;
	}

	public void setGrnTotalqty(String grnTotalqty) {
		this.grnTotalqty = grnTotalqty;
	}

	public String getPoAmt() {
		return poAmt;
	}

	public void setPoAmt(String poAmt) {
		this.poAmt = poAmt;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getIvDisAmt() {
		return ivDisAmt;
	}

	public void setIvDisAmt(String ivDisAmt) {
		this.ivDisAmt = ivDisAmt;
	}

	public String getAmtDiff() {
		return amtDiff;
	}

	public void setAmtDiff(String amtDiff) {
		this.amtDiff = amtDiff;
	}

	public String getQtyDiff() {
		return qtyDiff;
	}

	public void setQtyDiff(String qtyDiff) {
		this.qtyDiff = qtyDiff;
	}

	public String getVendorNo() {
		return vendorNo;
	}

	public void setVendorNo(String vendorNo) {
		this.vendorNo = vendorNo;
	}

	public String getPoTotalQty() {
		return poTotalQty;
	}

	public void setPoTotalQty(String poTotalQty) {
		this.poTotalQty = poTotalQty;
	}

	public String getGrNo() {
		return grNo;
	}

	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}

	public String getVendorName() {
		return vendorName;
	}

	public void setVendorName(String vendorName) {
		this.vendorName = vendorName;
	}

	public String getGrnAmt() {
		return grnAmt;
	}

	public void setGrnAmt(String grnAmt) {
		this.grnAmt = grnAmt;
	}

	public String getIvRecords() {
		return ivRecords;
	}

	public void setIvRecords(String ivRecords) {
		this.ivRecords = ivRecords;
	}

	/**
	 * @return the ngboStoreFlag
	 */
	public String getNgboStoreFlag() {
		return ngboStoreFlag;
	}

	/**
	 * @param ngboStoreFlag the ngboStoreFlag to set
	 */
	public void setNgboStoreFlag(String ngboStoreFlag) {
		this.ngboStoreFlag = ngboStoreFlag;
	}

}