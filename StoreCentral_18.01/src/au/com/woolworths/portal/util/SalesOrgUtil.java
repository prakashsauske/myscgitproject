package au.com.woolworths.portal.util;

import java.util.HashMap;
import java.util.Map;

public class SalesOrgUtil {

	public static String getCountryFromSalesOrg(int salesOrg) {

		if (salesOrg == 1005 || salesOrg == 1010 || salesOrg == 1015
				|| salesOrg == 1020 || salesOrg == 1021 || salesOrg == 1025
				|| salesOrg == 1030 || salesOrg == 1060 || salesOrg == 9070) {

			return "australia";

		} else if (salesOrg == 2005 || salesOrg == 2010 || salesOrg == 2015
				|| salesOrg == 2030 || salesOrg == 9050 || salesOrg == 9060) {
			return "newzealand";
		} else {
			return "australia";
		}

	}
	

	public static final Map<String, String> salesOrgMap;
	static {
		salesOrgMap = new HashMap<String, String>();

		salesOrgMap.put("1010","B1");//BWS
		salesOrgMap.put("2010","C1");//COUNT DOWN
		salesOrgMap.put("1015","D1");//DAN MURPHYS
		salesOrgMap.put("2040","F1");//WOW NZ FRANCH
		salesOrgMap.put("1021","J1");//CALTEX JV HIE
		salesOrgMap.put("1020","P1");//WOW PETROL
		salesOrgMap.put("1030","S1");//SMALL STORE
		salesOrgMap.put("1025","T1");//WOW THOMUS DUX
		salesOrgMap.put("1005","W1");//WOW SUPERS
		salesOrgMap.put("1060","A1");//WOW BIGW
		
		

	}

}
