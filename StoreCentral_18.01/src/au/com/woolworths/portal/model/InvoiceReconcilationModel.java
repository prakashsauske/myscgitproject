package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonCreator;
import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class InvoiceReconcilationModel {

	@JsonProperty("tot_gr_gst")
	private String totGrGst;

	@JsonProperty("inv_tax")
	private String invTax;

	@JsonProperty("add_pay_gst")
	private String addPayGst;

	@JsonProperty("tot_inv_tax")
	private String totInvTax;

	@JsonProperty("claims_rev_gst")
	private String claimsRevGst;

	@JsonProperty("over_chrg_tot")
	private String overChrgTot;

	@JsonProperty("claims_rev_amt")
	private String claimsRevAmt;

	@JsonProperty("claims_amt")
	private String claimsAmt;

	@JsonProperty("gr_adj_type")
	private String grAdjType;

	@JsonProperty("sap_inv_no")
	private String sapInvNo;

	@JsonProperty("tot_inv_amt")
	private String totInvAmt;

	@JsonProperty("inv_posting_date")
	private String invPostingDate;

	@JsonProperty("add_payments_amt")
	private String addPaymentsAmt;

	@JsonProperty("invoice_no")
	private String invoiceNo;

	@JsonProperty("gr_amount")
	private String grAmount;

	@JsonProperty("gr_user_id")
	private String grUserId;

	@JsonProperty("tot_gr_amt")
	private String totGrAmt;

	@JsonProperty("add_claims")
	private String addClaims;

	@JsonProperty("gr_doc_year")
	private String grDocYear;

	@JsonProperty("comments")
	private String comments;

	@JsonProperty("gr_hdr_txt")
	private String grHdrTxt;

	@JsonProperty("add_claims_gst")
	private String addClaimsGst;

	@JsonProperty("gr_posting_date")
	private String grPostingDate;

	@JsonProperty("gr_user_name")
	private String grUserName;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("gr_no")
	private String grNo;

	@JsonProperty("inv_amount")
	private String invAmount;

	@JsonProperty("grn_type")
	private String grnType;

	@JsonProperty("net_payable")
	private String netPayable;

	@JsonProperty("claims_gst")
	private String claimsGst;

	@JsonProperty("net_pay_gst")
	private String netPayGst;

	@JsonProperty("under_chrg_tot")
	private String underChrgTot;

	@JsonProperty("inv_user_name")
	private String invUserName;

	@JsonProperty("purchase_order")
	private String purchaseOrder;

	@JsonProperty("dis_amt_excl_gst")
	private String disAmtExclGst;

	@JsonProperty("tot_claims_amt")
	private String totalClaims;

	@JsonProperty("tot_add_claims")
	private String totalAdditionalClaims;

	@JsonProperty("tot_claims_rev_amt")
	private String totalClaimsReversal;

	@JsonProperty("tot_add_payments_amt")
	private String totalAdditionalPayments;

	@JsonProperty("tot_claims_gst")
	private String totalClaimsGst;

	@JsonProperty("tot_add_claims_gst")
	private String totalAdditionalClaimsGst;

	@JsonProperty("tot_claims_rev_gst")
	private String totalClaimsReversalGst;

	@JsonProperty("tot_add_pay_gst")
	private String totalAdditionalPaymentsGst;

	@JsonProperty("gr_tax_amt")
	private String grTaxAmt;

	// Newly addes JSON Property

	@JsonProperty("totGrGst")
	private String totGrGst_m;

	@JsonProperty("invTax")
	private String invTax_m;

	@JsonProperty("addPayGst")
	private String addPayGst_m;

	@JsonProperty("totInvTax")
	private String totInvTax_m;

	@JsonProperty("claimsRevGst")
	private String claimsRevGst_m;

	@JsonProperty("overChrgTot")
	private String overChrgTot_m;

	@JsonProperty("claimsRevAmt")
	private String claimsRevAmt_m;

	@JsonProperty("claimsAmt")
	private String claimsAmt_m;

	@JsonProperty("grAdjType")
	private String grAdjType_m;

	@JsonProperty("sapInvNo")
	private String sapInvNo_m;

	@JsonProperty("totInvAmt")
	private String totInvAmt_m;

	@JsonProperty("invPostingDate")
	private String invPostingDate_m;

	@JsonProperty("addPaymentsAmt")
	private String addPaymentsAmt_m;

	@JsonProperty("invoiceNo")
	private String invoiceNo_m;

	@JsonProperty("grAmount")
	private String grAmount_m;

	@JsonProperty("grUserId")
	private String grUserId_m;

	@JsonProperty("totGrAmt")
	private String totGrAmt_m;

	@JsonProperty("addClaims")
	private String addClaims_m;

	@JsonProperty("grDocYear")
	private String grDocYear_m;

	@JsonProperty("grHdrTxt")
	private String grHdrTxt_m;

	@JsonProperty("addClaimsGst")
	private String addClaimsGst_m;

	@JsonProperty("grPostingDate")
	private String grPostingDate_m;

	@JsonProperty("grUserName")
	private String grUserName_m;

	@JsonProperty("grNo")
	private String grNo_m;

	@JsonProperty("invAmount")
	private String invAmount_m;

	@JsonProperty("grnType")
	private String grnType_m;

	@JsonProperty("netPayable")
	private String netPayable_m;

	@JsonProperty("claimsGst")
	private String claimsGst_m;

	@JsonProperty("netPayGst")
	private String netPayGst_m;

	@JsonProperty("underChrgTot")
	private String underChrgTot_m;

	@JsonProperty("invUserName")
	private String invUserName_m;

	@JsonProperty("purchaseOrder")
	private String purchaseOrder_m;

	@JsonProperty("disAmtExclGst")
	private String disAmtExclGst_m;

	@JsonProperty("totalClaims")
	private String totalClaims_m;

	@JsonProperty("totalAdditionalClaims")
	private String totalAdditionalClaims_m;

	@JsonProperty("totalClaimsReversal")
	private String totalClaimsReversal_m;

	@JsonProperty("totalAdditionalPayments")
	private String totalAdditionalPayments_m;

	@JsonProperty("totalClaimsGst")
	private String totalClaimsGst_m;

	@JsonProperty("totalAdditionalClaimsGst")
	private String totalAdditionalClaimsGst_m;

	@JsonProperty("totalClaimsReversalGst")
	private String totalClaimsReversalGst_m;

	@JsonProperty("totalAdditionalPaymentsGst")
	private String totalAdditionalPaymentsGst_m;

	@JsonProperty("grTaxAmt")
	private String grTaxAmt_m;

	@JsonProperty("additionalPayable")
	private String additionalPayable;

	@JsonProperty("totalClaimsValue")
	private String totalClaimsValue;

	@JsonProperty("totalClaimsGSTValue")
	private String totalClaimsGSTValue;

	@JsonProperty("additionalPayableGST")
	private String additionalPayableGST;

	/**
	 * @param totGrGst
	 * @param invTax
	 * @param addPayGst
	 * @param totInvTax
	 * @param claimsRevGst
	 * @param overChrgTot
	 * @param claimsRevAmt
	 * @param claimsAmt
	 * @param grAdjType
	 * @param sapInvNo
	 * @param totInvAmt
	 * @param invPostingDate
	 * @param addPaymentsAmt
	 * @param invoiceNo
	 * @param grAmount
	 * @param grUserId
	 * @param totGrAmt
	 * @param addClaims
	 * @param grDocYear
	 * @param grHdrTxt
	 * @param addClaimsGst
	 * @param grPostingDate
	 * @param grUserName
	 * @param grNo
	 * @param invAmount
	 * @param grnType
	 * @param netPayable
	 * @param claimsGst
	 * @param netPayGst
	 * @param underChrgTot
	 * @param invUserName
	 * @param purchaseOrder
	 * @param disAmtExclGst
	 * @param totalClaims
	 * @param totalAdditionalClaims
	 * @param totalClaimsReversal
	 * @param totalAdditionalPayments
	 * @param totalClaimsGst
	 * @param totalAdditionalClaimsGst
	 * @param totalClaimsReversalGst
	 * @param totalAdditionalPaymentsGst
	 * @param grTaxAmt
	 */
	@JsonCreator
	public InvoiceReconcilationModel(
			@JsonProperty("tot_gr_gst") String totGrGst,
			@JsonProperty("inv_tax") String invTax,
			@JsonProperty("add_pay_gst") String addPayGst,
			@JsonProperty("tot_inv_tax") String totInvTax,
			@JsonProperty("claims_rev_gst") String claimsRevGst,
			@JsonProperty("over_chrg_tot") String overChrgTot,
			@JsonProperty("claims_rev_amt") String claimsRevAmt,
			@JsonProperty("claims_amt") String claimsAmt,
			@JsonProperty("gr_adj_type") String grAdjType,
			@JsonProperty("sap_inv_no") String sapInvNo,
			@JsonProperty("tot_inv_amt") String totInvAmt,
			@JsonProperty("inv_posting_date") String invPostingDate,
			@JsonProperty("add_payments_amt") String addPaymentsAmt,
			@JsonProperty("invoice_no") String invoiceNo,
			@JsonProperty("gr_amount") String grAmount,
			@JsonProperty("gr_user_id") String grUserId,
			@JsonProperty("tot_gr_amt") String totGrAmt,
			@JsonProperty("add_claims") String addClaims,
			@JsonProperty("gr_doc_year") String grDocYear,
			@JsonProperty("gr_hdr_txt") String grHdrTxt,
			@JsonProperty("add_claims_gst") String addClaimsGst,
			@JsonProperty("gr_posting_date") String grPostingDate,
			@JsonProperty("gr_user_name") String grUserName,
			@JsonProperty("gr_no") String grNo,
			@JsonProperty("inv_amount") String invAmount,
			@JsonProperty("grn_type") String grnType,
			@JsonProperty("net_payable") String netPayable,
			@JsonProperty("claims_gst") String claimsGst,
			@JsonProperty("net_pay_gst") String netPayGst,
			@JsonProperty("under_chrg_tot") String underChrgTot,
			@JsonProperty("inv_user_name") String invUserName,
			@JsonProperty("purchase_order") String purchaseOrder,
			@JsonProperty("dis_amt_excl_gst") String disAmtExclGst,
			@JsonProperty("tot_claims_amt") String totalClaims,
			@JsonProperty("tot_add_claims") String totalAdditionalClaims,
			@JsonProperty("tot_claims_rev_amt") String totalClaimsReversal,
			@JsonProperty("tot_add_payments_amt") String totalAdditionalPayments,
			@JsonProperty("tot_claims_gst") String totalClaimsGst,
			@JsonProperty("tot_add_claims_gst") String totalAdditionalClaimsGst,
			@JsonProperty("tot_claims_rev_gst") String totalClaimsReversalGst,
			@JsonProperty("tot_add_pay_gst") String totalAdditionalPaymentsGst,
			@JsonProperty("gr_tax_amt") String grTaxAmt) {

		this.totGrGst = totGrGst;
		this.invTax = invTax;
		this.addPayGst = addPayGst;
		this.totInvTax = totInvTax;
		this.claimsRevGst = claimsRevGst;
		this.overChrgTot = overChrgTot;
		this.claimsRevAmt = claimsRevAmt;
		this.claimsAmt = claimsAmt;
		this.grAdjType = grAdjType;
		this.sapInvNo = sapInvNo;
		this.totInvAmt = totInvAmt;
		this.invPostingDate = invPostingDate;
		this.addPaymentsAmt = addPaymentsAmt;
		this.invoiceNo = invoiceNo;
		this.grAmount = grAmount;
		this.grUserId = grUserId;
		this.totGrAmt = totGrAmt;
		this.addClaims = addClaims;
		this.grDocYear = grDocYear;
		this.grHdrTxt = grHdrTxt;
		this.addClaimsGst = addClaimsGst;
		this.grPostingDate = grPostingDate;
		this.grUserName = grUserName;
		this.grNo = grNo;
		this.invAmount = invAmount;
		this.grnType = grnType;
		this.netPayable = netPayable;
		this.claimsGst = claimsGst;
		this.netPayGst = netPayGst;
		this.underChrgTot = underChrgTot;
		this.invUserName = invUserName;
		this.purchaseOrder = purchaseOrder;
		this.disAmtExclGst = disAmtExclGst;
		this.totalClaims = totalClaims;
		this.totalAdditionalClaims = totalAdditionalClaims;
		this.totalClaimsReversal = totalClaimsReversal;
		this.totalAdditionalPayments = totalAdditionalPayments;
		this.totalClaimsGst = totalClaimsGst;
		this.totalAdditionalClaimsGst = totalAdditionalClaimsGst;
		this.totalClaimsReversalGst = totalClaimsReversalGst;
		this.totalAdditionalPaymentsGst = totalAdditionalPaymentsGst;
		this.grTaxAmt = grTaxAmt;

		this.totGrGst_m = totGrGst;
		this.invTax_m = invTax;
		this.addPayGst_m = addPayGst;
		this.totInvTax_m = totInvTax;
		this.claimsRevGst_m = claimsRevGst;
		this.overChrgTot_m = overChrgTot;
		this.claimsRevAmt_m = claimsRevAmt;
		this.claimsAmt_m = claimsAmt;
		this.grAdjType_m = grAdjType;
		this.sapInvNo_m = sapInvNo;
		this.totInvAmt_m = totInvAmt;
		this.invPostingDate_m = invPostingDate;
		this.addPaymentsAmt_m = addPaymentsAmt;
		this.invoiceNo_m = invoiceNo;
		this.grAmount_m = grAmount;
		this.grUserId_m = grUserId;
		this.totGrAmt_m = totGrAmt;
		this.addClaims_m = addClaims;
		this.grDocYear_m = grDocYear;
		this.grHdrTxt_m = grHdrTxt;
		this.addClaimsGst_m = addClaimsGst;
		this.grPostingDate_m = grPostingDate;
		this.grUserName_m = grUserName;
		this.grNo_m = grNo;
		this.invAmount_m = invAmount;
		this.grnType_m = grnType;
		this.netPayable_m = netPayable;
		this.claimsGst_m = claimsGst;
		this.netPayGst_m = netPayGst;
		this.underChrgTot_m = underChrgTot;
		this.invUserName_m = invUserName;
		this.purchaseOrder_m = purchaseOrder;
		this.disAmtExclGst_m = disAmtExclGst;
		this.totalClaims_m = totalClaims;
		this.totalAdditionalClaims_m = totalAdditionalClaims;
		this.totalClaimsReversal_m = totalClaimsReversal;
		this.totalAdditionalPayments_m = totalAdditionalPayments;
		this.totalClaimsGst_m = totalClaimsGst;
		this.totalAdditionalClaimsGst_m = totalAdditionalClaimsGst;
		this.totalClaimsReversalGst_m = totalClaimsReversalGst;
		this.totalAdditionalPaymentsGst_m = totalAdditionalPaymentsGst;
		this.grTaxAmt_m = grTaxAmt;
		this.additionalPayable = totalAdditionalPaymentsGst;
		this.totalClaimsValue = getSumPrice(totalClaims, totalAdditionalClaims);
		this.totalClaimsGSTValue = getSumPrice(totalClaimsGst,
				totalAdditionalClaimsGst);
		this.additionalPayableGST = totalAdditionalPaymentsGst;
	}

	// End of new JSON Propery
	/**
	 * @return the invTax
	 */
	public String getInvTax() {
		return invTax;
	}

	/**
	 * @param invTax
	 *            the invTax to set
	 */
	public void setInvTax(String invTax) {
		this.invTax = invTax;
	}

	/**
	 * @return the addPayGst
	 */
	public String getAddPayGst() {
		return addPayGst;
	}

	/**
	 * @param addPayGst
	 *            the addPayGst to set
	 */
	public void setAddPayGst(String addPayGst) {
		this.addPayGst = addPayGst;
	}

	/**
	 * @return the totInvTax
	 */
	public String getTotInvTax() {
		return totInvTax;
	}

	/**
	 * @param totInvTax
	 *            the totInvTax to set
	 */
	public void setTotInvTax(String totInvTax) {
		this.totInvTax = totInvTax;
	}

	/**
	 * @return the claimsRevGst
	 */
	public String getClaimsRevGst() {
		return claimsRevGst;
	}

	/**
	 * @param claimsRevGst
	 *            the claimsRevGst to set
	 */
	public void setClaimsRevGst(String claimsRevGst) {
		this.claimsRevGst = claimsRevGst;
	}

	/**
	 * @return the overChrgTot
	 */
	public String getOverChrgTot() {
		return overChrgTot;
	}

	/**
	 * @param overChrgTot
	 *            the overChrgTot to set
	 */
	public void setOverChrgTot(String overChrgTot) {
		this.overChrgTot = overChrgTot;
	}

	/**
	 * @return the claimsRevAmt
	 */
	public String getClaimsRevAmt() {
		return claimsRevAmt;
	}

	/**
	 * @param claimsRevAmt
	 *            the claimsRevAmt to set
	 */
	public void setClaimsRevAmt(String claimsRevAmt) {
		this.claimsRevAmt = claimsRevAmt;
	}

	/**
	 * @return the claimsAmt
	 */
	public String getClaimsAmt() {
		return claimsAmt;
	}

	/**
	 * @param claimsAmt
	 *            the claimsAmt to set
	 */
	public void setClaimsAmt(String claimsAmt) {
		this.claimsAmt = claimsAmt;
	}

	/**
	 * @return the grAdjType
	 */
	public String getGrAdjType() {
		return grAdjType;
	}

	/**
	 * @param grAdjType
	 *            the grAdjType to set
	 */
	public void setGrAdjType(String grAdjType) {
		this.grAdjType = grAdjType;
	}

	/**
	 * @return the sapInvNo
	 */
	public String getSapInvNo() {
		return sapInvNo;
	}

	/**
	 * @param sapInvNo
	 *            the sapInvNo to set
	 */
	public void setSapInvNo(String sapInvNo) {
		this.sapInvNo = sapInvNo;
	}

	/**
	 * @return the totInvAmt
	 */
	public String getTotInvAmt() {
		return totInvAmt;
	}

	/**
	 * @param totInvAmt
	 *            the totInvAmt to set
	 */
	public void setTotInvAmt(String totInvAmt) {
		this.totInvAmt = totInvAmt;
	}

	/**
	 * @return the invPostingDate
	 */
	public String getInvPostingDate() {
		return invPostingDate;
	}

	/**
	 * @param invPostingDate
	 *            the invPostingDate to set
	 */
	public void setInvPostingDate(String invPostingDate) {
		this.invPostingDate = invPostingDate;
	}

	/**
	 * @return the addPaymentsAmt
	 */
	public String getAddPaymentsAmt() {
		return addPaymentsAmt;
	}

	/**
	 * @param addPaymentsAmt
	 *            the addPaymentsAmt to set
	 */
	public void setAddPaymentsAmt(String addPaymentsAmt) {
		this.addPaymentsAmt = addPaymentsAmt;
	}

	/**
	 * @return the invoiceNo
	 */
	public String getInvoiceNo() {
		return invoiceNo;
	}

	/**
	 * @param invoiceNo
	 *            the invoiceNo to set
	 */
	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	/**
	 * @return the grAmount
	 */
	public String getGrAmount() {
		return grAmount;
	}

	/**
	 * @param grAmount
	 *            the grAmount to set
	 */
	public void setGrAmount(String grAmount) {
		this.grAmount = grAmount;
	}

	/**
	 * @return the grUserId
	 */
	public String getGrUserId() {
		return grUserId;
	}

	/**
	 * @param grUserId
	 *            the grUserId to set
	 */
	public void setGrUserId(String grUserId) {
		this.grUserId = grUserId;
	}

	/**
	 * @return the totGrAmt
	 */
	public String getTotGrAmt() {
		return totGrAmt;
	}

	/**
	 * @param totGrAmt
	 *            the totGrAmt to set
	 */
	public void setTotGrAmt(String totGrAmt) {
		this.totGrAmt = totGrAmt;
	}

	/**
	 * @return the addClaims
	 */
	public String getAddClaims() {
		return addClaims;
	}

	/**
	 * @param addClaims
	 *            the addClaims to set
	 */
	public void setAddClaims(String addClaims) {
		this.addClaims = addClaims;
	}

	/**
	 * @return the grDocYear
	 */
	public String getGrDocYear() {
		return grDocYear;
	}

	/**
	 * @param grDocYear
	 *            the grDocYear to set
	 */
	public void setGrDocYear(String grDocYear) {
		this.grDocYear = grDocYear;
	}

	/**
	 * @return the comments
	 */
	public String getComments() {
		return comments;
	}

	/**
	 * @param comments
	 *            the comments to set
	 */
	public void setComments(String comments) {
		this.comments = comments;
	}

	/**
	 * @return the grHdrTxt
	 */
	public String getGrHdrTxt() {
		return grHdrTxt;
	}

	/**
	 * @param grHdrTxt
	 *            the grHdrTxt to set
	 */
	public void setGrHdrTxt(String grHdrTxt) {
		this.grHdrTxt = grHdrTxt;
	}

	/**
	 * @return the addClaimsGst
	 */
	public String getAddClaimsGst() {
		return addClaimsGst;
	}

	/**
	 * @param addClaimsGst
	 *            the addClaimsGst to set
	 */
	public void setAddClaimsGst(String addClaimsGst) {
		this.addClaimsGst = addClaimsGst;
	}

	/**
	 * @return the grPostingDate
	 */
	public String getGrPostingDate() {
		return grPostingDate;
	}

	/**
	 * @param grPostingDate
	 *            the grPostingDate to set
	 */
	public void setGrPostingDate(String grPostingDate) {
		this.grPostingDate = grPostingDate;
	}

	/**
	 * @return the grUserName
	 */
	public String getGrUserName() {
		return grUserName;
	}

	/**
	 * @param grUserName
	 *            the grUserName to set
	 */
	public void setGrUserName(String grUserName) {
		this.grUserName = grUserName;
	}

	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}

	/**
	 * @param msg
	 *            the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}

	/**
	 * @return the grNo
	 */
	public String getGrNo() {
		return grNo;
	}

	/**
	 * @param grNo
	 *            the grNo to set
	 */
	public void setGrNo(String grNo) {
		this.grNo = grNo;
	}

	/**
	 * @return the invAmount
	 */
	public String getInvAmount() {
		return invAmount;
	}

	/**
	 * @param invAmount
	 *            the invAmount to set
	 */
	public void setInvAmount(String invAmount) {
		this.invAmount = invAmount;
	}

	/**
	 * @return the grnType
	 */
	public String getGrnType() {
		return grnType;
	}

	/**
	 * @param grnType
	 *            the grnType to set
	 */
	public void setGrnType(String grnType) {
		this.grnType = grnType;
	}

	/**
	 * @return the netPayable
	 */
	public String getNetPayable() {
		return netPayable;
	}

	/**
	 * @param netPayable
	 *            the netPayable to set
	 */
	public void setNetPayable(String netPayable) {
		this.netPayable = netPayable;
	}

	/**
	 * @return the claimsGst
	 */
	public String getClaimsGst() {
		return claimsGst;
	}

	/**
	 * @param claimsGst
	 *            the claimsGst to set
	 */
	public void setClaimsGst(String claimsGst) {
		this.claimsGst = claimsGst;
	}

	/**
	 * @return the netPayGst
	 */
	public String getNetPayGst() {
		return netPayGst;
	}

	/**
	 * @param netPayGst
	 *            the netPayGst to set
	 */
	public void setNetPayGst(String netPayGst) {
		this.netPayGst = netPayGst;
	}

	/**
	 * @return the underChrgTot
	 */
	public String getUnderChrgTot() {
		return underChrgTot;
	}

	/**
	 * @param underChrgTot
	 *            the underChrgTot to set
	 */
	public void setUnderChrgTot(String underChrgTot) {
		this.underChrgTot = underChrgTot;
	}

	/**
	 * @return the invUserName
	 */
	public String getInvUserName() {
		return invUserName;
	}

	/**
	 * @param invUserName
	 *            the invUserName to set
	 */
	public void setInvUserName(String invUserName) {
		this.invUserName = invUserName;
	}

	/**
	 * @return the purchaseOrder
	 */
	public String getPurchaseOrder() {
		return purchaseOrder;
	}

	/**
	 * @param purchaseOrder
	 *            the purchaseOrder to set
	 */
	public void setPurchaseOrder(String purchaseOrder) {
		this.purchaseOrder = purchaseOrder;
	}

	/**
	 * @return the disAmtExclGst
	 */
	public String getDisAmtExclGst() {
		return disAmtExclGst;
	}

	/**
	 * @param disAmtExclGst
	 *            the disAmtExclGst to set
	 */
	public void setDisAmtExclGst(String disAmtExclGst) {
		this.disAmtExclGst = disAmtExclGst;
	}

	/**
	 * @return the totGrGst
	 */
	public String getTotGrGst() {
		return totGrGst;
	}

	/**
	 * @param totGrGst
	 *            the totGrGst to set
	 */
	public void setTotGrGst(String totGrGst) {
		this.totGrGst = totGrGst;
	}

	public String getTotalClaims() {
		return totalClaims;
	}

	public void setTotalClaims(String totalClaims) {
		this.totalClaims = totalClaims;
	}

	public String getTotalAdditionalClaims() {
		return totalAdditionalClaims;
	}

	public void setTotalAdditionalClaims(String totalAdditionalClaims) {
		this.totalAdditionalClaims = totalAdditionalClaims;
	}

	public String getTotalClaimsReversal() {
		return totalClaimsReversal;
	}

	public void setTotalClaimsReversal(String totalClaimsReversal) {
		this.totalClaimsReversal = totalClaimsReversal;
	}

	public String getTotalAdditionalPayments() {
		return totalAdditionalPayments;
	}

	public void setTotalAdditionalPayments(String totalAdditionalPayments) {
		this.totalAdditionalPayments = totalAdditionalPayments;
	}

	public String getTotalClaimsGst() {
		return totalClaimsGst;
	}

	public void setTotalClaimsGst(String totalClaimsGst) {
		this.totalClaimsGst = totalClaimsGst;
	}

	public String getTotalAdditionalClaimsGst() {
		return totalAdditionalClaimsGst;
	}

	public void setTotalAdditionalClaimsGst(String totalAdditionalClaimsGst) {
		this.totalAdditionalClaimsGst = totalAdditionalClaimsGst;
	}

	public String getTotalClaimsReversalGst() {
		return totalClaimsReversalGst;
	}

	public void setTotalClaimsReversalGst(String totalClaimsReversalGst) {
		this.totalClaimsReversalGst = totalClaimsReversalGst;
	}

	public String getTotalAdditionalPaymentsGst() {
		return totalAdditionalPaymentsGst;
	}

	public void setTotalAdditionalPaymentsGst(String totalAdditionalPaymentsGst) {
		this.totalAdditionalPaymentsGst = totalAdditionalPaymentsGst;
	}

	public String getAdditionalPayable() {

		// return getSumPrice(totalAdditionalPayments,totalClaimsReversal);
		return totalAdditionalPayments;
	}

	public String getAdditionalPayableGST() {

		// return
		// getSumPrice(totalAdditionalPaymentsGst,totalClaimsReversalGst);\
		return totalAdditionalPaymentsGst;
	}

	public String getTotalClaimsValue() {

		return getSumPrice(totalClaims, totalAdditionalClaims);
	}

	public String getTotalClaimsGSTValue() {

		return getSumPrice(totalClaimsGst, totalAdditionalClaimsGst);
	}

	private String getSumPrice(String price1, String price2) {

		Double doublePrice1 = new Double(0);
		Double doublePrice2 = new Double(0);

		if (price1 != null)
			doublePrice1 = Double.valueOf(price1);
		if (price2 != null)
			doublePrice2 = Double.valueOf(price2);

		return String.valueOf((doublePrice1 + doublePrice2));

	}

	/**
	 * @return the grTaxAmt
	 */
	public String getGrTaxAmt() {
		return grTaxAmt;
	}

	/**
	 * @param grTaxAmt
	 *            the grTaxAmt to set
	 */
	public void setGrTaxAmt(String grTaxAmt) {
		this.grTaxAmt = grTaxAmt;
	}

}
