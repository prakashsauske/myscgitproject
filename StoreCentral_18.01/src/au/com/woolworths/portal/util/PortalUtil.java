/**
 * 
 */
package au.com.woolworths.portal.util;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Map;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.model.UserContext;

/**
 * @author xrca4
 * 
 */
public class PortalUtil {

	public static final String CURRENT_WEEK = "0";
	public static final String NEXT_WEEK = "1";
	public static final String TWO_WEEKS_OUT = "2";
	public static final String THREE_WEEKS_OUT = "3";

	public static final String CATEGORY = "Category";
	public static final String DISPLAY = "Display";
	public static final String MEDIA = "Media";
	public static final String PROMOTION_DETAILS = "Promotion Details";
	public static final String SALES = "Sales";
	public static Integer PETROL_SALES_ORG = 1020;
	public static final String ALL_DEPT = "All";

	public static final String MANDATORY = "Technical issue occured, please contact the support.";

	public static Integer SM_SALES_ORG = 1005;

	public static Integer BWS_SALES_ORG = 1010;

	public static Integer DM_SALES_ORG = 1015;

	public static Integer CNTDWN_SALES_ORG = 2010;

	public static Integer BIGW_SALES_ORG = 1060;

	public static Integer THMSDUX_SALES_ORG = 1025;

	public static Integer SFS_SALES_ORG = 1030;

	public static String SM_SALES_ORG_NM = "smkt";

	public static String BWS_SALES_ORG_NM = "bws";

	public static String DM_SALES_ORG_NM = "dm";

	public static String CNTDWN_SALES_ORG_NM = "cntdwn";

	public static String BIGW_SALES_ORG_NM = "bigw";

	public static String THMSDUX_SALES_ORG_NM = "tdux";

	public static String PETROL_SALES_ORG_NM = "petrol";

	public static String SFS_SALES_ORG_NM = "sfs";

	public static String PRODUCE_DEPT = "30";

	public static String ZY = "ZY";
	public static String ZX = "ZX";
	public static String ZP = "ZP";
	public static String ZXP = "ZXP";
	public static String ZNB = "ZNB";
	public static String ZNBP = "ZNBP";

	public static String DEP = "1";
	public static String CAT = "2";
	public static String SUBCAT = "3";
	public static String SEG = "4";

	public static String AREA_MANAGER = "MA";
	public static String STORE_USER = "MA";

	public static Map<String, String> departmentMap;

	public static Map<String, String> getDepartmentMap() {
		return departmentMap;
	}

	public static void setDepartmentMap(Map<String, String> departmentMap) {
		PortalUtil.departmentMap = departmentMap;
	}

	private static final Logger LOGGER = Logger.getLogger(PortalUtil.class
			.getName());
	public static final Object REPARE_CENTAL_CODE = "RC";

	public static String convertToSAPDate(String inputDate) {

		String outputDate = "";
		// //System.out.println("inputDate_"+inputDate);
		if (inputDate != null && inputDate.split("/").length > 1) {
			try {

				String[] dateArray = inputDate.split("/");
				outputDate = new StringBuffer(dateArray[2])
						.append(dateArray[1]).append(dateArray[0]).toString();

			} catch (Exception e) {
				e.printStackTrace();

			}
		}

		return outputDate;
	}

	public static String convertToDBDate(String inputDate) {

		String outputDate = "";

		if (inputDate != null && inputDate != "") {
			try {

				String[] dateArray = inputDate.split("/");
				outputDate = new StringBuffer(dateArray[0])
						.append(dateArray[1]).append(dateArray[2]).toString();

			} catch (Exception e) {
				LOGGER.error("Stack Trace :", e);
				return null;

			}
		} else {
			LOGGER.error("errror in convertToDBDate method of Portalutil.");
			LOGGER.error("input parameter to this method is null or empty");
			return null;
		}

		return outputDate;
	}

	public static String currentDate() {
		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		// get current date time with Date()
		Date date = new Date();

		String currentDate = dateFormat.format(date);

		return currentDate;
	}

	public static String convertToSAPDateForOrder(String inputDate) {

		String outputDate = "";

		try {

			String no1 = inputDate.substring(0, 2);
			// //System.out.println("no1 "+no1);
			String no2 = inputDate.substring(3, 5);
			// //System.out.println("no2 "+no2);
			String no3 = inputDate.substring(6);

			// //System.out.println("no3 "+no3);
			// //System.out.println("date 2"+no1+""+no2+""+no3);

			outputDate = no3 + no2 + no1;
			// //System.out.println("outputDate"+outputDate);

		} catch (Exception e) {
			e.printStackTrace();

		}

		return outputDate;
	}

	public static String convertToSAPDateForOrderDetailScreen(String inputDate) {

		String outputDate = "";

		try {

			String no1 = inputDate.substring(0, 2);
			// //System.out.println("no1 "+no1);
			String no2 = inputDate.substring(3, 5);
			// //System.out.println("no2 "+no2);
			String no3 = inputDate.substring(6);

			// //System.out.println("no3 "+no3);
			// //System.out.println("date 2"+no1+""+no2+""+no3);

			outputDate = no1 + "." + no2 + "." + no3;
			// //System.out.println("outputDate"+outputDate);

		} catch (Exception e) {
			e.printStackTrace();

		}

		return outputDate;
	}

	public static String convertToSAPDateForPReqScreen(String inputDate) {

		String outputDate = "";

		try {

			String no1 = inputDate.substring(0, 2);
			// //System.out.println("no1 "+no1);
			String no2 = inputDate.substring(3, 5);
			// //System.out.println("no2 "+no2);
			String no3 = inputDate.substring(6);

			// //System.out.println("no3 "+no3);
			// //System.out.println("date 2"+no1+""+no2+""+no3);

			outputDate = no1 + "/" + no2 + "/" + no3;
			// //System.out.println("outputDate"+outputDate);

		} catch (Exception e) {
			e.printStackTrace();

		}

		return outputDate;
	}

	public static String convertToStandard(String inputDate) {

		String outputDate = "";
		if (inputDate != null && inputDate != "") {
			try {

				if (inputDate.contains("."))
					outputDate = inputDate.replace(".", "/");

				// String no1=inputDate.substring(0,2);
				// ////System.out.println("no1 "+no1);
				// String no2=inputDate.substring(3,5);
				// ////System.out.println("no2 "+no2);
				// String no3=inputDate.substring(6);
				//
				// ////System.out.println("no3 "+no3);
				// ////System.out.println("date 2"+no1+""+no2+""+no3);
				//
				// outputDate=no1+"/"+no2+"/"+no3;
				// ////System.out.println("outputDate"+outputDate);

			} catch (Exception e) {
				e.printStackTrace();
				return null;

			}
		} else {
			return null;
		}

		return outputDate;
	}

	public static String getDomainForLocalURLs(UserContext user) {
		String domain = "";
		try {
			String host = user.getStoreHost();
			String port = "8080";
			String storeType = "";
			String loggedInSalesOrg = user.getSalesOrg().toString();
			String loggedInStore = user.getSiteNo();
			String storeServer = "RS";
			if (host == null || host.isEmpty()) {
				if (loggedInSalesOrg.equals("1060")) {
					storeType = "BW";
				} else if (loggedInSalesOrg.equals("1005")
						||loggedInSalesOrg.equals("1030")
						||loggedInSalesOrg.equals("1025")
						||loggedInSalesOrg.equals("2010")) {
					storeType = "SM";
				} else if (loggedInSalesOrg.equals("1020")) {
					storeType = "PT";
					storeServer = "FS";
				} else if (loggedInSalesOrg.equals("1010")
						|| loggedInSalesOrg.equals("1015")) {
					if(loggedInSalesOrg.equals("1010")){
						storeServer = "FS";
					}
					storeType = "LQ";
				}
				if (storeType != "") {
					host = loggedInStore + storeType + "SS"+storeServer+"001";
				}
			}
			domain = "http://" + host + ":" + port + "/";
			LOGGER.info("Domain found = " + domain);
		} catch (Exception e) {
			LOGGER.error("Error occured =" + e);
		}
		return domain;
	}

}
