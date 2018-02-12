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
public class Order {

	private String recvSiteName;

	private String rosterDateFlag;

	private String type;

	@JsonProperty("delivery_status")
	private String deliveryStatus;

	@JsonProperty("total_cartons_rcv")
	private String totalOmRecvd;

	@JsonProperty("preq_type")
	private String pReqType;

	@JsonProperty("preq_no")
	private String pReqNo;

	@JsonProperty("preq_type_desc")
	private String pReqTypeDesc;

	@JsonProperty("tracking_no")
	private String orderRefNo;

	@JsonProperty("trading_dep_no")
	private String tradDeptNo;

	@JsonProperty("order_type")
	private String orderType;

	@JsonProperty("order_no")
	private String orderNo;

	@JsonProperty("order_received")
	private String order_received;

	@JsonProperty("total_pallets")
	private String totalPallets;

	@JsonProperty("roster_date")
	private String rosterDate;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("grn")
	private String grn;

	@JsonProperty("order_status")
	private String orderStatus;

	@JsonProperty("delivery_date")
	private String deliveryDate;

	@JsonProperty("order_type_desc")
	private String orderTypeDesc;

	@JsonProperty("total_cartons")
	private String totalCartons;

	@JsonProperty("supp_name")
	private String suppName;

	@JsonProperty("segment_no")
	private String segmentNo;

	@JsonProperty("order_source")
	private String orderSource;

	@JsonProperty("sos")
	private String sos;

	@JsonProperty("supp_no")
	private String suppNo;

	@JsonProperty("recv_site")
	private String recvSite;

	@JsonProperty("recv_date")
	private String recvdate;

	@JsonProperty("recv_time")
	private String recvtime;

	@JsonProperty("vendor_claim")
	private String vendorclaim;

	@JsonProperty("segment_name")
	private String segmentName;

	@JsonProperty("trading_dep_name")
	private String tradingDepName;

	@JsonProperty("order_value")
	private String orderValue;

	@JsonProperty("temp_check1")
	private String tempCheck1;

	@JsonProperty("gr_temp1")
	private String grTemp1;

	@JsonProperty("gr_temp2")
	private String grTemp2;

	@JsonProperty("temp_check2")
	private String tempCheck2;

	@JsonProperty("order_temp")
	private String orderTemp;

	@JsonProperty("sto_type")
	private String stoType;

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

	public String getRecvSite() {
		return recvSite;
	}

	public void setRecvSite(String recvSite) {
		this.recvSite = recvSite;
	}

	public String getOrder_received() {
		return order_received;
	}

	public void setOrder_received(String order_received) {
		this.order_received = order_received;
	}

	public String getTradDeptNo() {
		return tradDeptNo;
	}

	public void setTradDeptNo(String tradDeptNo) {
		this.tradDeptNo = tradDeptNo;
	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getTotalPallets() {
		return totalPallets;
	}

	public void setTotalPallets(String totalPallets) {
		this.totalPallets = totalPallets;
	}

	public String getRosterDate() {
		if (this.rosterDate != null) {
			String result = PortalUtil.convertToStandard(rosterDate);
			if (result != null && result != "")
				return result;
		}
		return rosterDate;
	}

	public void setRosterDate(String rosterDate) {
		this.rosterDate = rosterDate;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getOrderStatus() {
		return orderStatus;
	}

	public void setOrderStatus(String orderStatus) {
		this.orderStatus = orderStatus;
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

	public String getOrderTypeDesc() {
		return orderTypeDesc;
	}

	public void setOrderTypeDesc(String orderTypeDesc) {
		this.orderTypeDesc = orderTypeDesc;
	}

	public String getTotalCartons() {
		return totalCartons;
	}

	public void setTotalCartons(String totalCartons) {
		this.totalCartons = totalCartons;
	}

	public String getSuppName() {
		return suppName;
	}

	public void setSuppName(String suppName) {
		this.suppName = suppName;
	}

	public String getSegmentNo() {
		return segmentNo;
	}

	public void setSegmentNo(String segmentNo) {
		this.segmentNo = segmentNo;
	}

	public String getOrderSource() {
		return orderSource;
	}

	public void setOrderSource(String orderSource) {
		this.orderSource = orderSource;
	}

	public String getSos() {
		return sos;
	}

	public void setSos(String sos) {
		this.sos = sos;
	}

	public String getSuppNo() {
		return suppNo;
	}

	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	public String getOrderNo() {
		if (orderNo != null) {
			this.orderNo = orderNo.replaceFirst("^0+(?!$)", "");
		}
		return this.orderNo;
	}

	public void setOrderNo(String orderNo) {
		if (orderNo != null) {
			this.orderNo = orderNo.replaceFirst("^0+(?!$)", "");
		}
		this.orderNo = orderNo;

	}

	public String getOrderRefNo() {
		return orderRefNo;
	}

	public void setOrderRefNo(String orderRefNo) {
		this.orderRefNo = orderRefNo;
	}

	public String getDeliveryStatus() {
		return deliveryStatus;
	}

	public void setDeliveryStatus(String deliveryStatus) {
		this.deliveryStatus = deliveryStatus;
	}

	public String getRecvdate() {
		if (this.recvdate != null) {
			String result = PortalUtil.convertToStandard(recvdate);
			if (result != null && result != "")
				return result;
		}
		return recvdate;
	}

	public void setRecvdate(String recvdate) {
		this.recvdate = recvdate;
	}

	public String getRecvtime() {
		return recvtime;
	}

	public void setRecvtime(String recvtime) {
		this.recvtime = recvtime;
	}

	public String getVendorclaim() {
		return vendorclaim;
	}

	public void setVendorclaim(String vendorclaim) {
		this.vendorclaim = vendorclaim;
	}

	public String getGrn() {
		return grn;
	}

	public void setGrn(String grn) {
		this.grn = grn;
	}

	public String getRecvSiteName() {
		return recvSiteName;
	}

	public void setRecvSiteName(String recvSiteName) {
		this.recvSiteName = recvSiteName;
	}

	public String getpReqType() {
		return pReqType;
	}

	public void setpReqType(String pReqType) {
		this.pReqType = pReqType;
	}

	public String getpReqNo() {
		return pReqNo;
	}

	public void setpReqNo(String pReqNo) {
		this.pReqNo = pReqNo;
	}

	public String getpReqTypeDesc() {
		return pReqTypeDesc;
	}

	public void setpReqTypeDesc(String pReqTypeDesc) {
		this.pReqTypeDesc = pReqTypeDesc;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public String getOrderValue() {
		return orderValue;
	}

	public void setOrderValue(String orderValue) {
		this.orderValue = orderValue;
	}

	public String getTotalOmRecvd() {
		return totalOmRecvd;
	}

	public void setTotalOmRecvd(String totalOmRecvd) {
		this.totalOmRecvd = totalOmRecvd;
	}

	public String getTempCheck1() {
		return tempCheck1;
	}

	public void setTempCheck1(String tempCheck1) {
		this.tempCheck1 = tempCheck1;
	}

	public String getGrTemp1() {
		return grTemp1;
	}

	public void setGrTemp1(String grTemp1) {
		this.grTemp1 = grTemp1;
	}

	public String getGrTemp2() {
		return grTemp2;
	}

	public void setGrTemp2(String grTemp2) {
		this.grTemp2 = grTemp2;
	}

	public String getTempCheck2() {
		return tempCheck2;
	}

	public void setTempCheck2(String tempCheck2) {
		this.tempCheck2 = tempCheck2;
	}

	public String getOrderTemp() {
		return orderTemp;
	}

	public void setOrderTemp(String orderTemp) {
		this.orderTemp = orderTemp;
	}

	public String getStoType() {
		return stoType;
	}

	public void setStoType(String stoType) {
		this.stoType = stoType;
	}

	public String getRosterDateFlag() {
		return rosterDateFlag;
	}

	public void setRosterDateFlag(String rosterDateFlag) {
		this.rosterDateFlag = rosterDateFlag;
	}

}
