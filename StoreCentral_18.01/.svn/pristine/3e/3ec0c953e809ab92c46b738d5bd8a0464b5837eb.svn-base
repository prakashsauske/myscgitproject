/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

/**
 * @author xrca4
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderDetail implements Cloneable {

	// private String totalOrd;

	private String operation = "U";
	private String saveUOMFlag;
	private String UOMFlag;

	private String editFlag;

	private String siteNo;
	@JsonProperty("uom")
	private String UOM;

	@JsonProperty("tracking_no")
	private String orderRefNo;

	@JsonProperty("preq_no")
	private String pReqNo;

	@JsonProperty("segment_no")
	private String segmentNo;

	@JsonProperty("delivery_date")
	private String deliveryDate;

	@JsonProperty("item_no")
	private String itemNo;

	@JsonProperty("order_no")
	private String orderNo;

	@JsonProperty("invoice_total")
	private String invoiceTotal;

	@JsonProperty("article_desc")
	private String articleDesc;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("total_cartons")
	private String totalCartons;

	@JsonProperty("vendor_ref_no")
	private String vendorRefNo;

	@JsonProperty("del_doc_no")
	private String dockCode;

	@JsonProperty("stock_in_transit")
	private String SIT;

	@JsonProperty("order_qty")
	private String orderQty;

	@JsonProperty("unit_cost")
	private String unitCost;

	@JsonProperty("received_qty")
	private String receivedQty;

	@JsonProperty("order_status_1")
	private String orderStatus;

	@JsonProperty("stock_on_order")
	private String SOO;

	@JsonProperty("supp_no")
	private String suppNo;

	@JsonProperty("article")
	private String article;

	@JsonProperty("supp_name")
	private String suppName;

	@JsonProperty("invoice_no")
	private String invoiceNo;

	@JsonProperty("gst_amount")
	private String gstAmount;

	@JsonProperty("allocated_qty")
	private String allocated;

	@JsonProperty("order_multiple")
	private String OM;

	@JsonProperty("retail_price")
	private String retailPrice;

	@JsonProperty("total_cartons_rcv")
	private String totalCartonsReceived;

	private String oldDeliveryDate;
	private String mvtType;
	private String adjustedQty;

	@JsonProperty("segment_name")
	private String segmentName;

	@JsonProperty("trading_dep_name")
	private String tradingDepName;

	@JsonProperty("order_uom")
	private String orderUOM;

	@JsonProperty("ven_invoice")
	private String venInvoice;

	@JsonProperty("tot_order_qty")
	private String totalOrd;

	private String saveFlag;

	@JsonProperty("base_uom_desc")
	private String baseUOMDesc;

	@JsonProperty("base_uom")
	private String baseUom;

	private String uomFlag;

	@JsonProperty("art_ord_uom")
	private String ordUOM;

	@JsonProperty("art_ord_uom_desc")
	private String ordUOMDesc;

	public String getVenInvoice() {
		return venInvoice;
	}

	public void setVenInvoice(String venInvoice) {
		this.venInvoice = venInvoice;
	}

	public String getOrderUOM() {
		return orderUOM;
	}

	public void setOrderUOM(String orderUOM) {
		this.orderUOM = orderUOM;
	}

	public String getSegmentName() {
		return segmentName;
	}

	public void setSegmentName(String segmentName) {
		this.segmentName = segmentName;
	}

	public String getTradingDepName() {
		return tradingDepName;
	}

	public void setTradingDepName(String tradingDepName) {
		this.tradingDepName = tradingDepName;
	}

	public String getMvtType() {
		return mvtType;
	}

	public void setMvtType(String mvtType) {
		this.mvtType = mvtType;
	}

	public String getAdjustedQty() {
		return adjustedQty;
	}

	public void setAdjustedQty(String adjustedQty) {
		this.adjustedQty = adjustedQty;
	}

	public String getOldDeliveryDate() {
		if (this.oldDeliveryDate != null) {
			String result = PortalUtil.convertToStandard(oldDeliveryDate);
			if (result != null && result != "")
				return result;
		}
		return oldDeliveryDate;
	}

	public void setOldDeliveryDate(String oldDeliveryDate) {
		this.oldDeliveryDate = oldDeliveryDate;
	}

	public String getItemNo() {
		return itemNo;
	}

	public void setItemNo(String itemNo) {
		this.itemNo = itemNo;
	}

	public String getOrderNo() {
		return orderNo;
	}

	public void setOrderNo(String orderNo) {
		this.orderNo = orderNo;
	}

	public String getInvoiceTotal() {
		return invoiceTotal;
	}

	public void setInvoiceTotal(String invoiceTotal) {
		this.invoiceTotal = invoiceTotal;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getTotalCartons() {
		return totalCartons;
	}

	public void setTotalCartons(String totalCartons) {
		this.totalCartons = totalCartons;
	}

	public String getVendorRefNo() {
		return vendorRefNo;
	}

	public void setVendorRefNo(String vendorRefNo) {
		this.vendorRefNo = vendorRefNo;
	}

	public String getDockCode() {
		return dockCode;
	}

	public void setDockCode(String dockCode) {
		this.dockCode = dockCode;
	}

	public String getSIT() {
		return SIT;
	}

	public void setSIT(String sIT) {
		SIT = sIT;
	}

	public String getOrderQty() {
		return orderQty;
	}

	public void setOrderQty(String orderQty) {
		this.orderQty = orderQty;
	}

	public String getUnitCost() {
		return unitCost;
	}

	public void setUnitCost(String unitCost) {
		this.unitCost = unitCost;
	}

	public String getReceivedQty() {
		return receivedQty;
	}

	public void setReceivedQty(String receivedQty) {
		this.receivedQty = receivedQty;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
	}

	public String getSOO() {
		return SOO;
	}

	public void setSOO(String sOO) {
		SOO = sOO;
	}

	public String getSuppNo() {
		return suppNo;
	}

	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	public String getArticle() {
		this.article = article.replaceFirst("^0+(?!$)", "");
		return article;
	}

	public void setArticle(String article) {
		this.article = article.replaceFirst("^0+(?!$)", "");
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	public String getInvoiceNo() {
		return invoiceNo;
	}

	public void setInvoiceNo(String invoiceNo) {
		this.invoiceNo = invoiceNo;
	}

	public String getGstAmount() {
		return gstAmount;
	}

	public void setGstAmount(String gstAmount) {
		this.gstAmount = gstAmount;
	}

	public String getAllocated() {
		return allocated;
	}

	public void setAllocated(String allocated) {
		this.allocated = allocated;
	}

	public String getOM() {

		return OM;
	}

	public void setOM(String oM) {
		OM = oM;
	}

	public String getRetailPrice() {
		return retailPrice;
	}

	public void setRetailPrice(String retailPrice) {
		this.retailPrice = retailPrice;
	}

	public String getDateCreated() {
		if (this.dateCreated != null) {
			String result = PortalUtil.convertToStandard(dateCreated);
			if (result != null && result != "")
				return result;
		}
		return dateCreated;
	}

	public void setDateCreated(String dateCreated) {
		this.dateCreated = dateCreated;
	}

	public String getSOH() {
		return SOH;
	}

	public void setSOH(String sOH) {
		SOH = sOH;
	}

	public String getTotalPallets() {
		return totalPallets;
	}

	public void setTotalPallets(String totalPallets) {
		this.totalPallets = totalPallets;
	}

	public String getDespatchQty() {
		return despatchQty;
	}

	public void setDespatchQty(String despatchQty) {
		this.despatchQty = despatchQty;
	}

	public String getTradingDepNo() {
		return tradingDepNo;
	}

	public void setTradingDepNo(String tradingDepNo) {
		this.tradingDepNo = tradingDepNo;
	}

	public String getTemperature() {
		return temperature;
	}

	public void setTemperature(String temperature) {
		this.temperature = temperature;
	}

	public String getUnsupplied() {
		return unsupplied;
	}

	public void setUnsupplied(String unsupplied) {
		this.unsupplied = unsupplied;
	}

	public String getSos() {
		return sos;
	}

	public void setSos(String sos) {
		this.sos = sos;
	}

	@JsonProperty("date_created")
	private String dateCreated;

	@JsonProperty("grn")
	private String grn;

	@JsonProperty("stock_on_hand")
	private String SOH;

	@JsonProperty("total_pallets")
	private String totalPallets;

	@JsonProperty("despatch_qty")
	private String despatchQty;

	@JsonProperty("trading_dep_no")
	private String tradingDepNo;

	@JsonProperty("temperature")
	private String temperature;

	@JsonProperty("unsupplied_qty")
	private String unsupplied;

	@JsonProperty("sos")
	private String sos;

	private String newRecvQty;

	public String getNewRecvQty() {
		return newRecvQty;
	}

	public void setNewRecvQty(String newRecvQty) {
		this.newRecvQty = newRecvQty;
	}

	public String getDeliveryDate() {
		if (this.deliveryDate != null) {
			String result = PortalUtil.convertToStandard(deliveryDate);
			if (result != null && result != "")
				return result;
		}
		return deliveryDate;
	}

	public void setDeliveryDate(String deliveryDate) {
		this.deliveryDate = deliveryDate;
	}

	public String getOrderRefNo() {
		return orderRefNo;
	}

	public void setOrderRefNo(String orderRefNo) {
		this.orderRefNo = orderRefNo;
	}

	public String getGrn() {
		return grn;
	}

	public void setGrn(String grn) {
		this.grn = grn;
	}

	public String getTotalCartonsReceived() {
		return totalCartonsReceived;
	}

	public void setTotalCartonsReceived(String totalCartonsReceived) {
		this.totalCartonsReceived = totalCartonsReceived;
	}

	public String getpReqNo() {
		return pReqNo;
	}

	public void setpReqNo(String pReqNo) {
		this.pReqNo = pReqNo;
	}

	public String getSegmentNo() {
		return segmentNo;
	}

	public void setSegmentNo(String segmentNo) {
		this.segmentNo = segmentNo;
	}

	public String getOperation() {
		return operation;
	}

	public void setOperation(String operation) {
		this.operation = operation;
	}

	public Object clone() {
		try {
			return super.clone();
		} catch (Exception e) {
			return null;
		}
	}

	public String getUOM() {
		return UOM;
	}

	public void setUOM(String uOM) {
		UOM = uOM;
	}

	public String getTotalOrd() {
		/*
		 * if(OM!=null && OM.trim().length()>0 && orderQty!=null &&
		 * orderQty.trim().length()>0){
		 * totalOrd=String.valueOf(Integer.parseInt(
		 * OM)*Integer.parseInt(orderQty));
		 * 
		 * }
		 */

		return totalOrd;
	}

	public void setTotalOrd(String totalOrd) {
		this.totalOrd = totalOrd;
	}

	public String getSaveFlag() {
		return saveFlag;
	}

	public void setSaveFlag(String saveFlag) {
		this.saveFlag = saveFlag;
	}

	public String getBaseUOMDesc() {
		return baseUOMDesc;
	}

	public void setBaseUOMDesc(String baseUOMDesc) {
		this.baseUOMDesc = baseUOMDesc;
	}

	public String getOrdUOM() {
		return ordUOM;
	}

	public void setOrdUOM(String ordUOM) {
		this.ordUOM = ordUOM;
	}

	public String getOrdUOMDesc() {
		return ordUOMDesc;
	}

	public void setOrdUOMDesc(String ordUOMDesc) {
		this.ordUOMDesc = ordUOMDesc;
	}

	public String getBaseUom() {
		if (baseUom != null && baseUom != "") {
			baseUom = baseUom.trim();
		}
		return baseUom;
	}

	public void setBaseUom(String baseUom) {
		this.baseUom = baseUom;
	}

	public String getUomFlag() {
		return uomFlag;
	}

	public void setUomFlag(String uomFlag) {
		this.uomFlag = uomFlag;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getUOMFlag() {
		return UOMFlag;
	}

	public void setUOMFlag(String uOMFlag) {
		UOMFlag = uOMFlag;
	}

	public String getSaveUOMFlag() {
		return saveUOMFlag;
	}

	public void setSaveUOMFlag(String saveUOMFlag) {
		this.saveUOMFlag = saveUOMFlag;
	}

	public String getEditFlag() {
		return editFlag;
	}

	public void setEditFlag(String editFlag) {
		this.editFlag = editFlag;
	}

}
