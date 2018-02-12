package au.com.woolworths.portal.util;

import java.util.HashMap;
import java.util.Map;

public class IconUtil {
	public static final Map<String, String> urlMap;
	static {
		urlMap = new HashMap<String, String>();

		urlMap.put("LU", "../article/onPageLoad.htm");
		urlMap.put("LUA", "../article/onPageLoad.htm");

		urlMap.put("OD", "../order/onPageLoad.htm");
		urlMap.put("ODE", "../order/onPageLoad.htm");
		urlMap.put("CWO", "../order/onPageLoadCreateManualOrder.htm");
		urlMap.put("COR", "../poReceipt/onPageLoadPORecipt.htm");
		urlMap.put("CVO", "../preq/onPageLoadPReq.htm");
		urlMap.put("IBT", "../ibtOrder/onPageLoad.htm");

		urlMap.put("RP", "../sohAdjustLog/onPageLoad.htm");
		urlMap.put("SAL", "../sohAdjustLog/onPageLoad.htm");
		urlMap.put("EDGM", "../edgms/onPageLoadEDGMS.htm");
		urlMap.put("IRR", "../order/onPageLoadRecon.htm");
		urlMap.put("DGM", "../report/onPageLoad.htm");
		urlMap.put("EDR", "../edgmsDiscrepancy/onPageLoad.htm");
		urlMap.put("ORP", "#");
		urlMap.put("PLL", "../produce/onPageLoadProduceLoadListSearch.htm");
		urlMap.put("OBR", "../manualOrderBook/onPageLoad.htm");

		urlMap.put("RRPL", "#");
		urlMap.put("ORR", "../orderRosterReport/onPageLoad.htm");
		urlMap.put("DSP", "../dailyStoreProfile/onPageLoad.htm");
		urlMap.put("ZMP", "../zeroMPL/onPageLoad.htm");

		urlMap.put("SM", "../article/stockAdjustFromHome.htm");
		urlMap.put("SA", "../article/stockAdjustFromHome.htm");

		
		urlMap.put("POG", "../planOGram/onPageLoad.htm");
		urlMap.put("MPLA", "../MPLorSCAdj/onPageLoad.htm");
		urlMap.put("AQM", "#");
		urlMap.put("VAQ", "../articleQuery/onPageLoad.htm");
		urlMap.put("SAQ", "../AQMInitiateQuery/onPageLoad.htm");

		urlMap.put("PM", "../promoPlanning/onPageLoad.htm");
		urlMap.put("PP", "../promoPlanning/onPageLoad.htm");
		
		//Ganesh changes start
		urlMap.put("SMST", "../article/stockTransferFromHome.htm");
		urlMap.put("SAST", "../article/stockTransferFromHome.htm");
		//Ganesh changes end
		
		urlMap.put("PR", "#");
		urlMap.put("TK", "#");

	}

	public static final Map<String, String> iconMap;
	static {
		iconMap = new HashMap<String, String>();

		iconMap.put("LU", "iconlookupHome");
		iconMap.put("LUA", "iconlookupHome");

		iconMap.put("OD", "ordersHome");
		iconMap.put("ODE", "ordersHome");
		iconMap.put("CWO", "ordersHome");
		iconMap.put("COR", "ordersHome");
		iconMap.put("CVO", "ordersHome");
		iconMap.put("IBT", "ordersHome");

		iconMap.put("RP", "reportsHome");
		iconMap.put("SAL", "reportsHome");
		iconMap.put("EDGM", "reportsHome");
		iconMap.put("IRR", "reportsHome");
		iconMap.put("DGM", "reportsHome");
		iconMap.put("EDR", "reportsHome");
		iconMap.put("ORP", "reportsHome");
		iconMap.put("PLL", "reportsHome");
		iconMap.put("OBR", "reportsHome");

		iconMap.put("RRPL", "reportsHome");
		iconMap.put("ORR", "reportsHome");
		iconMap.put("DSP", "reportsHome");
		iconMap.put("ZMP", "reportsHome");

		iconMap.put("SM", "stockManagementHome");
		iconMap.put("SA", "stockManagementHome");

		iconMap.put("POG", "stockManagementHome");
		iconMap.put("MPLA", "stockManagementHome");
		iconMap.put("AQM", "stockManagementHome");
		iconMap.put("VAQ", "stockManagementHome");
		iconMap.put("SAQ", "stockManagementHome");

		iconMap.put("PM", "stockManagementHome");
		iconMap.put("PP", "stockManagementHome");

		iconMap.put("PR", "pricingHome");
		iconMap.put("TK", "ticketingHome");

	}

}
