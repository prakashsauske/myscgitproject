package au.com.woolworths.portal.util;

import java.io.IOException;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.Formatter;
import java.util.HashMap;
import java.util.List;
import java.util.TimeZone;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.annotate.JsonAutoDetect;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;

import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.service.PasswordHash;

import com.google.gson.Gson;

public class Constants {
	
	

	public static PasswordHash ph=null;
	
	public static final DateFormat DATE_FORMAT = new SimpleDateFormat(
			"dd/MM/yyyy");
	public static final SimpleDateFormat DAY_FORMAT = new SimpleDateFormat(
			"EEE");
	public static final SimpleDateFormat DATE_TIME_FORMAT = new SimpleDateFormat(
			"dd/MM/yyyy");
	public static final String MANDATOR_SCS = "Please enter all mandatory fields.";
	public static final String TRUE = "Y";
	public static final String FALSE = "N";
	public static final String RSN_CD_EXCLUDE = "EXCL";
	public static final String RSN_CD_OUT_OF_STOCK = "OSTK";
	public static final String RSN_CD_OVER_STOCK = "OVST";
	public static final String RSN_CD_NOT_ORDERING = "NORD";

	public static final String RULE_CD_WH_DERANGED = "NRAN";
	public static final String RULE_CD_DELISTED = "DELS";
	public static final String RULE_CD_NON_STANDARD_LINES = "NSTD";
	public static final String RULE_CD_EXCLUDED_LINES = "EXST";
	public static final String RULE_CD_FUTURE_DATE = "FDAT";
	public static final String DANMURY_SALES_ORG = "1015";
	// //////////////////////////PROMOTIONS CONSTANTS////////////////////////

	public static final String CURRENT_WEEK = "0";
	public static final String NEXT_WEEK = "1";
	public static final String TWO_WEEKS_OUT = "2";
	public static final String THREE_WEEKS_OUT = "3";
	public static final String FOUR_WEEKS_OUT = "4";
	public static final String FIVE_WEEKS_OUT = "5";
	public static final String SIX_WEEKS_OUT = "6";
	public static final String SEVEN_WEEKS_OUT = "7";
	public static final String EIGHT_WEEKS_OUT = "8";

	public static final String ALL = "All";
	public static final String NEW = "New";
	public static final String MOD = "Modified";
	public static final String OLD = "Old";
	public static final String CENTRAL = "C";

	public static final String CATEGORY = "Category";
	public static final String DISPLAY = "Display";
	public static final String MEDIA = "Media";
	public static final String PROMOTION_DETAILS = "Promotion Details";
	public static final String SALES = "Sales";
	public static final String INSTORE = "I";

	public static final String DEPT = "1";
	public static final String CATEGO = "2";
	public static final String SUBCAT = "3";
	public static final String SEG = "4";

	public static final String DEPARTMENT_LEVEL = "DEPT";
	public static final String CATEGORYS_LEVEL = "CAT";
	public static final String SUBCATEGORY_LEVEL = "SUBCAT";
	public static final String SEGMENT_LEVEL = "SEGMENT";
	public static final String MEDIA_LEVEL = "MEDIA";
	public static final String DISPLAY_LEVEL = "DISP";
	public static final String DISC_PERC_LEVEL = "DISC";
	public static final String ARTICLE_LEVEL = "ARTICLE";
	public static final String UNIT = "unit";
	public static final String PERCENTAGE = "perc";
	public static final String TABS_LEVEL = "TABS";

	public static final String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	public static final String NDF = "Sorry, no results found for your search criteria. Please try again.";
	public static final String HIST_CMTS_EXCEPTION = "Unable to save store comments due to technical issue, please contact technical support.";//for Defect_14643

	public static final String WAREHOUSE = "warehouse";
	public static final String VENDOR = "vendor";

	public static final String MANDATORY = "Please enter all mandatory inputs.";
	public static final String ALGORITHM = "md5";
	public static final String DIGEST_STRING = "HG58YZ3CR9";
	public static final String CHARSET_UTF_8 = "utf-8";
	public static final String SECRET_KEY_ALGORITHM = "DESede";
	public static final String TRANSFORMATION_PADDING = "DESede/CBC/PKCS5Padding";

	public static final String PAGE_SIZE = "10";
	public static final String currentWeek = "current_week";
	public static final String nextWeek = "next_week";
	public static final String twoWeek = "two_week";
	public static final String threeWeek = "three_week";
	public static final String fourWeek = "four_week";
	public static final String fiveWeek = "five_week";
	public static final String sixWeek = "six_week";
	public static final String sevenWeek = "seven_week";
	public static final String eightWeek = "eight_week";
	public static final String TECHNICAL_ISSUE = "Technical issue occurred. Please contact technical support.";
	public static final String SERVICE_ISSUE = "Technical issue occurred. Due to service unavailability.";
	public static final String TECH_ISSUE = "Technical issue occurred.";

	public static final String ORDER_TYPE_ALL = "All";
	public static final String ORDER_STATUS_All = "ALL";

	public static final String START_TIME = "00:00:00";
	public static final String END_TIME = "23:59:59";

	public static final String IT_SUPPORT = "ITS";
	public static final String ADMIN = "ADM";
	public static final String REPORTING_ROLE = "POSRP";
	public static final String BUSINESS_REVIEW = "BR";
	public static final String AREA_MANAGER = "SS";
	public static final String READ_ONLY_USER = "ROU";
	public static final String STORE_MANAGER = "MA";
	public static final String STORE_USER = "SU";
	public static final String DEPT_MANAGER = "TL";
	// //////////////////////////Newly added Roles////////////////////////
	public static final String SAlESORG_MANAGER = "SLM";
	public static final String STOCKTAKE_MANAGER= "STOTM";
	public static final String STOCKtAKE_TEAMMEMBER = "STTM";
	public static final String IT_SUPPORT_ONE = "ITS1";
	public static final String IT_SUPPORT_TWO = "ITS2";
	public static final String IT_USER_ADMIN= "ITUA";
	public static final String READONLY_USER = "RDOU";
	

	public static final String LOCK_ISSUE = "No lock details found for site/department.";
	// //////////////////////////PROMOTIONS CONSTANTS////////////////////////
	public static final String WAREHOUSE_NO = "2";
	public static final String VENDOR_NO = "1";
	public static final String SELECT = "Select";

	public static final String NO_DATA = "noData";
	public static final String SINGLE_RESULT = "singleResult";
	public static final String MULTIPLE_RESULT = "multipleResult";
	public static final String PROMODETAIL = "promotionDetails";
	public static final String articleListJson = "articleListJson";

	public static final String articleHierarchy = "articleHierarchy";

	public static final String RECORD_COUNT = "20";
	public static final String YES = "Y";
	public static final String NO = "N";
	public static final String LOCKED = "Y";
	public static final String NOT_LOCKED = "N";

	public static final String PROMO_LOCKED = "Promotion is locked for the department and site combination.";
	public static final String BLANK_DF = "00/00/0000";

	public static final String CUSTOMER_ASSISTANT = "STM";
	public static final String TEAM_MEMBER = "TM";
	public static final String OFFICE_ASSISTANT = "OA";
	public static final String OFFICE_SUPERVISOR = "OS";
	public static final String CASH_OFFICER = "CO";
	public static final String SERVICE_DESK_ASSISTANT = "SDA";
	public static final String SERVICE_CASHIER = "SC";

	public static final String POS_ALL = "All";
	public static final String POS_SINGLE = "Single";
	public static final String POS_MULTIPLE = "Multiple";

	// Preq search
	public static final String PREQ_DRAFT = "ZY";

	// AQM
	public static final String EXCLUSIVE_REQUEST = "XCLUREQ";
	public static final String ZERO_MPL = "ZEROMPL";

	// INSTORE PROMOTION
	public static final String PROMO_TYPE_DISPLAY = "display";
	public static final String PROMO_TYPE_CLEARANCE = "clearance";
	public static final String PROMO_TYPE_COMPETION = "competition";
	public static final String PROMO_TYPE_SPECIAL = "specialActivity";
	public static final String PROMO_TYPE_ADVERTISED = "advertised";
	public static final String PROMO_TYPE_MARKETING = "localMarketing";
	public static final String PROMO_TYPE_OTHERMKDN = "othermarkdown";
	public static final String PROMO_TYPE_LIQUOR_CLEARANCE = "liquorClearance";
	public static final String SPA = "ZSPA";
	public static final String MKT = "ZLOM";
	public static final String ADV = "ZADT";

	public static final String SERVICE_CONFIG_VALIDATE = "V";
	public static final String SERVICE_CONFIG_CREATE = "C";
	public static final String SERVICE_CONFIG_ENQUIRY = "E";
	public static final String PROMO_CREATION_FAILED = "Promotion  creation Failed,Due to Service unavaliabilty";
	public static final String SUCCESS = "success";
	public static final String NOCHANGE = "No Articles found for create.";
	public static final String USER_PREF_SIZE = "6";
	public static final String USER_PROF_ID = "Y";
	public static final String ALL_ROLES = "ALL";
	public static final String READ_ACCESS = "R";

	public static final String ACCESS_LEVEL_1 = "1";
	public static final String ACCESS_LEVEL_2 = "2";
	public static final String ACCESS_LEVEL_3 = "3";

	public static final String SCREEN_FLAG = "SC";
	public static final String VALIDATIONERROR = "validationerror";
	public static final String INCLUDE_FLAG = "I";
	public static final String EXCLUDE_FLAG = "E";
	public static final String UPDATE = "U";
	public static final String DELETE = "D";

	public static final String X_CSRF_TOKEN = "x-csrf-token";
	public static final String FETCH = "fetch";
	public static final String REPAIR_SERVICE_ORDER_CREATION_FAILED = "Service Order creation Failed,Due to Service unavaliabilty";
	public static final String ERROR_WITH_URL = "Incorrect Url";
	
	///////////////////////////Tables used for Application settings, USer preference////////////////
	public static final String NGBO_FUNCTION_EXCLUDE = "NGBO_FUNCTION_EXCLUDE";
	public static final String NGBO_FUNCTION_EXCLUDE_RF = "NGBO_FUNCTION_EXCLUDE_RF";
	public static final String SCREEN_FUNCTION_MASTER = "NGBO_SCREEN_FUNCTION_MASTER";
	public static final String USER_PREFERENCES = "NGBO_USER_PREFERENCES";
	public static final String DEFAULT_SHORTCUTS = "NGBO_DEFAULT_SHORTCUTS";
	public static final String SHORTCUT_MASTER = "NGBO_SHORTCUT_MASTER";
	public static final String SALES_ORG_EXEC_MENU_FNC = "ngbo_sales_org_excl_menu_fn";
	public static final String SMKT = "1005";
	public static final String COUNTDOWN = "2010";
	public static final String METRO = "1030";

	public static final String NOTIFICATION_MASTER = "NOTIFICATION_MASTER";
	
	///////////////////////// TABLES USED FOR NEW SECURITY/////////////////////////////////////////
//	public static final String NGBO_SITEMASTER="(select SITETABLE.VKORG SALES_ORG,SITEMASTER.WERKS SITE,SITEMASTER.NAME1 SITE_NAME,SITEMASTER.longitude,SITEMASTER.latitude,SITEMASTER.BEZEI DISTRICT,'' region,'' region_name,'' area,'' area_name from \"/SAAP/C_PPLANT\" SITETABLE,ZWOWC_SITE_MASTER SITEMASTER WHERE TO_DATE(SITEMASTER.EROED,'DD/MON/YY')>=SYSDATE AND TO_DATE(SITEMASTER.SCHLD,'DD/MON/YY')<=SYSDATE AND SITETABLE.WERKS = SITEMASTER.WERKS)";
//	public static final String NGBO_SITEMASTER="(select SITETABLE.VKORG SALES_ORG,SITEMASTER.WERKS SITE,SITEMASTER.NAME1 SITE_NAME,SITEMASTER.longitude,SITEMASTER.latitude,SITEMASTER.BEZEI DISTRICT,'' region,'' region_name,'' area,'' area_name from \"/SAAP/C_PPLANT\" SITETABLE,ZWOWC_SITE_MASTER SITEMASTER WHERE TO_DATE(SITEMASTER.EROED,'DD/MON/YY')>=SYSDATE AND TO_DATE(SITEMASTER.SCHLD,'DD/MON/YY')<=SYSDATE AND SITETABLE.WERKS = SITEMASTER.WERKS)";
	//public static final String NGBO_SITEMASTER="(select SITETABLE.VKORG SALES_ORG,SITEMASTER.WERKS SITE,SITEMASTER.NAME1 SITE_NAME,SITEMASTER.longitude,SITEMASTER.latitude,SITEMASTER.BEZEI DISTRICT,'' region,'' region_name,'' area,'' area_name from \"/SAAP/C_PPLANT\" SITETABLE,ZWOWC_SITE_MASTER SITEMASTER WHERE SITEMASTER.EROED<=SYSDATE AND SITEMASTER.SCHLD>=SYSDATE AND SITETABLE.WERKS = SITEMASTER.WERKS)";
	public static final String NGBO_SITEMASTER="(select SITETABLE.VKORG SALES_ORG,SITEMASTER.WERKS SITE,SITEMASTER.NAME1 SITE_NAME,SITEMASTER.longitude,SITEMASTER.latitude,SITETABLE.BZIRK DISTRICT,SITETABLE.regio region, SITEMASTER.bezei region_name,'' area,'' area_name from sapr3.\"/SAAP/C_PPLANT\" SITETABLE,sapr3.ZWOWC_SITE_MASTER SITEMASTER WHERE SITEMASTER.EROED<=SYSDATE AND SITEMASTER.SCHLD>=SYSDATE AND SITETABLE.WERKS = SITEMASTER.WERKS)";// fix for defect 14706
	public static final String NGBO_SITEMASTER_ALLSTORE="(select SITETABLE.VKORG SALES_ORG,SITEMASTER.WERKS SITE,SITEMASTER.NAME1 SITE_NAME,SITEMASTER.longitude,SITEMASTER.latitude,SITETABLE.BZIRK DISTRICT,SITETABLE.regio region, SITEMASTER.bezei region_name,'' area,'' area_name, CASE WHEN SITEMASTER.EROED<=SYSDATE AND SITEMASTER.SCHLD>=SYSDATE THEN 'Active' ELSE 'Closed' END as Status from sapr3.\"/SAAP/C_PPLANT\" SITETABLE,sapr3.ZWOWC_SITE_MASTER SITEMASTER WHERE SITETABLE.WERKS = SITEMASTER.WERKS)";
	public static final String NGBO_USR= "USR";
	public static final String NGBO_USR_SITE= "USR_SITE_DTL";
	public static final String NGBO_ROLE_MAPPING= "NGBO_ROLE_MAPPING";
	public static final String NGBO_USR_SPECIAL_ROLES= "USR_SPECIAL_ROLES";
	public static final String NGBO_USR_ADDITIONAL_ROLES= "USR_ADDITIONAL_ROLES";
	public static final String NGBO_USR_PWD_ATTEMPT="NGBO_USR_PWD_ATTEMPT";
	public static final Integer MAX_INCORRECT_ATTEMPT = 5;
	public static final String NGBO_USER_LOG_AUDIT = "NGBO_USER_LOG_AUDIT";
	public static final String NGBO_USR_PRIMARY_DEPTS= "usr_primary_depts ";
	public static final String NGBO_UPDATED_USER_PREFIX= "SC_";
	//location print constants
	public static final String locPrint_pdfGenerationError = "Error while generating pdf.";
	public static final String locPrint_failure = "false";
	/*public static final String locPrint_printFormat = "pdf";
	public static final String locPrint_inputInCorrectFormat = "Bad input to the service.";	
	public static final String locPrint_printerNotSelected = "No printer info found in service";
	public static final String locPrint_success = "true";
	public static final String locPrint_success_typ = "S";
	public static final String locPrint_error_typ = "E";
	*/
	
	public static final String NONPILOTCONTEXT = "StoreCentral";
	public static final String PILOTCONTEXT = "StoreCentralPILOT";

    public static String getTimerror(String key) {
	    	
	    	if(TIMERRORS.containsKey(key)){
	    		return TIMERRORS.get(key);
	    	}
			return "Technical Issue Occurred. Please contact Service Desk.";
		}

	
    	public static final HashMap<String, String> TIMERRORS = new HashMap<String, String>();
    	static{
	    	TIMERRORS.put("IDMPM001", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM002", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM003", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM004", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM005", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM006", "User not in SIM");
	    	TIMERRORS.put("IDMPM007", "No NGBO account");
	    	TIMERRORS.put("IDMPM008", "No SAP account");
	    	TIMERRORS.put("IDMPM009", "This option is not available as no security questions have been setup. Please contact your Store Administrator.");
	    	TIMERRORS.put("IDMPM010", "Invalid challenge answer");
	    	TIMERRORS.put("IDMPM011", "Invalid challenge questions");
	    	TIMERRORS.put("IDMPM012", "Invalid/Suspended account");
	    	TIMERRORS.put("IDMPM013", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM014", "Invalid Password");
	    	TIMERRORS.put("IDMPM015", "NGBO Password change failed");
	    	TIMERRORS.put("IDMPM016", "SAP Password change Failed");
	    	TIMERRORS.put("IDMPM018", "Suspened SAP Account");
	    	TIMERRORS.put("IDMPM019", "Suspened NGBO Account");
	    	TIMERRORS.put("IDMPM020", "TIM Suspended User");
	    	TIMERRORS.put("IDMPM021", "Invalid Secondary Role");
	    	TIMERRORS.put("IDMPM022", "Input parameter secondary role is empty");
	    	TIMERRORS.put("IDMPM025", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM026", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM027", "Technical Issue Occurred. Please contact Service Desk.");
	    	TIMERRORS.put("IDMPM040", "Username not found.");
	    	TIMERRORS.put("IDMPM041", "Invalid input. Invalid target system");
    	}
	

	public static String convertRepairServiceOrderDateToSAPDate(String inputDate) {

		String outputDate = "";
		outputDate = inputDate.replace("/", ".");
		return outputDate;
	}

	public static final String REPAIR_QTY = "1";

	public static final String SESSION_EXPIRED = "SessionExpired";

	public static Gson gson;

	public static String convertToJsonString(ArrayList list, String msg) {
		String listStr = "[]";
		String json = "";
		if (list != null && list.size() > 0) {
			listStr = convertToJSON(list);
			System.out.println("Converted json list object " + listStr);
		}
		json = "{\"list\":" + listStr + ",\"msg\":\"" + msg + "\"}";
		System.out.println("Converted json " + json);
		return json;
	}

	public static String convertToJsonString(ArrayList list) {
		return convertToJSON(list);
	}

	public static String convertToJsonString(Object javaObj) {

		return convertToJSON(javaObj);
	}

	public static final String SUCCESS_MSG = "S";
	public static final String ERROR_MSG = "E";

	public static final String CurrentWeek = "Articles that are on promotion this week, user will review and update fields during this week";
	public static final String NextWeek = "Articles that will be on promotion next week, user would plan and update fields accordingly prior to the promotion commencing";
	public static final String TwoWeeksOut = "Articles that will be on promotion in two weeks, user would plan and update fields accordingly prior to the promotion commencing";
	public static final String ThreeWeeksOut = "Articles that will be on promotion in three weeks, user would plan and update fields accordingly prior to the promotion commencing";

	public static final String FourWeek = "Articles that will be on promotion in four weeks, user would plan and update fields accordingly prior to the promotion commencing";
	public static final String FiveWeek = "Articles that will be on promotion in five weeks, user would plan and update fields accordingly prior to the promotion commencing";
	public static final String SixWeeksOut = "Articles that will be on promotion in six weeks, user would plan and update fields accordingly prior to the promotion commencing";
	public static final String SevenWeeksOut = "Articles that will be on promotion in seven weeks, user would plan and update fields accordingly prior to the promotion commencing";
	public static final String EigthWeeksOut = "Articles that will be on promotion in eigth weeks, user would plan and update fields accordingly prior to the promotion commencing";

	public static final String VERSION_ID = "7";
	
	
	public static String getAdminUsers() {
		StringBuffer instorePromTypeStr = new StringBuffer();
		instorePromTypeStr.append("'").append(IT_SUPPORT).append("','")
				.append(ADMIN).append("','").append(AREA_MANAGER).append("','")
				.append(REPORTING_ROLE).append("','").append(BUSINESS_REVIEW)
				.append("','").append(STOCKTAKE_MANAGER)
				.append("','").append(STOCKtAKE_TEAMMEMBER)
				.append("','").append(SAlESORG_MANAGER)
				.append("','").append(IT_SUPPORT_ONE)
				.append("','").append(IT_SUPPORT_TWO)
				.append("','").append(READONLY_USER)
				.append("','").append(IT_USER_ADMIN)
				.append("'");

		return instorePromTypeStr.toString();
	}

	public static boolean isAdminUser(String roleId) {

		if (roleId != null
				&& (roleId.equals(IT_SUPPORT) || roleId.equals(ADMIN)
						|| roleId.equals(AREA_MANAGER)
						|| roleId.equals(BUSINESS_REVIEW) || roleId
							.equals(REPORTING_ROLE)
							|| roleId.equals(STOCKTAKE_MANAGER)
							|| roleId.equals(STOCKtAKE_TEAMMEMBER)
							|| roleId.equals(SAlESORG_MANAGER)
							|| roleId.equals(IT_SUPPORT_ONE)
							|| roleId.equals(IT_SUPPORT_TWO)
							|| roleId.equals(READONLY_USER)
							|| roleId.equals(IT_USER_ADMIN))) {
			return true;
		} else {
			return false;
		}
	}

	public static boolean isStoreManagers(String roleId) {

		if (roleId != null
				&& (roleId.equals(STORE_MANAGER) || roleId.equals(DEPT_MANAGER)
						|| roleId.equals(CUSTOMER_ASSISTANT)
						|| roleId.equals(OFFICE_ASSISTANT)
						|| roleId.equals(OFFICE_SUPERVISOR) 
						|| roleId.equals(TEAM_MEMBER)
						|| roleId.equals(CASH_OFFICER)
						|| roleId.equals(SERVICE_CASHIER)
						|| roleId.equals(SERVICE_DESK_ASSISTANT))) {
			return true;
		} else {
			return false;
		}
	}
	
	public static boolean isSalesOrgManager(String roleId) {

		if (roleId != null
				&& (roleId.equals(SAlESORG_MANAGER) )) {
			return true;
		} else {
			return false;
		}
	}
	
	public static boolean isStockTakeManager(String roleId) {

		if (roleId != null
				&& (roleId.equals(STOCKTAKE_MANAGER) )) {

			return true;
		} else {
			return false;
		}
	}
	
	public static boolean isStockTakeUser(String roleId) {

		if (roleId != null
				&& (roleId.equals(STOCKTAKE_MANAGER)||roleId.equals(STOCKtAKE_TEAMMEMBER))) {

			return true;
		} else {
			return false;
		}
	}

/*	private static String convertToJSON(Object obj) {
		ObjectMapper mapper = new ObjectMapper();
		StringWriter stw = new StringWriter();

		try {
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, obj);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		return stw.toString();
	}*/
	public static String convertToJSON(Object obj) {
		ObjectMapper mapper = new ObjectMapper();
		StringWriter stw = new StringWriter();
		
		

		try {
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);
			//ObjectWriter ow = new ObjectMapper().writer().withDefaultPrettyPrinter();
			//String json = ow.writeValueAsString(obj);
			
			mapper.setVisibilityChecker(mapper.getSerializationConfig()
					.getDefaultVisibilityChecker()
					.withFieldVisibility(JsonAutoDetect.Visibility.ANY)
					.withGetterVisibility(JsonAutoDetect.Visibility.NONE)
					.withSetterVisibility(JsonAutoDetect.Visibility.NONE)
					.withCreatorVisibility(JsonAutoDetect.Visibility.NONE));
			//mapper.setVisibility(JsonMethod.CREATOR, Visibility.ANY);
			mapper.writeValue(jsonGenerator, obj);
		} catch (JsonGenerationException e1) {
			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		System.out.println("stw"+stw.toString());
		return stw.toString();
	}
	public static final String STORE_LOCATION = "1000";
	public static final String TCODE = "06";
	public static final String ARTICLE_UOM ="EA";

	public static final int NOTIFY_PERIOD = 7;

	public static final int EXPIERY_DAYS_COUNT = 90;

	public static final int FRGT_PWD_ATTEMPT_LIMIT = 3;

	public static final String NGBO_SALES_ORG = "SALES_ORG";

	public static final String NGBO_PRIMARY_DPT = "USR_PRIMARY_DEPTS";

	public static final int STORE_EXP_NOTIFY_PERIOD = 7;

	public static final String NGBO_USER_EXCEPTION_TBL = "USER_EXCEPTION_TBL";

	public static final String PRIMARY_DEPT_MADATORY = "Please select departments.";
	
	public static final String USER_ROLE_MADATORY = "Please select Role.";
	
	public static final String AC_DATE_MADATORY = "Active end date is mandatory for secondary store role.";
	public static final String AC_ADM_DATE_MADATORY = "Active end date is mandatory.";
	
	public static final String DEFAULT_START_DATE = "01/01/1970";
	public static final String DEFAULT_END_DATE = "31/12/2099";

	public static final String PAYING_CODE = "156";

	public static final String SC_ROLE_ALREADY_EXIST = "Store role is already active,Please deactivate all store roles to update Admin role.";
	public static final String ADMIN_ROLE_ALREADY_EXIST = "Admin role is already active,Please deactivate Admin role to update store role.";

	public static final String BROWSER = "B";
	public static final String BROWSER_PLATFORM = "BW";
	public static final String RF_PLATFORM = "RF";
	public static final String MOBILE = "M";
	
	/**
	 * PROC NAMES
	 * ***/
	
	public static final String PROC_PAKAGE_NAME = "PKG_NGBO_USER_DATA";
	
	public static final String UPDATE_USER_PREF_PROC = "UPD_NGBO_USER_PREFERENCES";
	
	public static final String UPDATE_USER_EXCEPTION_TBL = "UPD_USER_EXCEPTION_TBL";
	
	public static final String UPDATE_NGBO_USR_PWD_ATTEMPT = "UPD_NGBO_USR_PWD_ATTEMPT";
	
	public static final String UPDATE_USER_ADDITIONAL_ROLES = "UPD_USR_ADDITIONAL_ROLES";
	
	public static final String INSERT_OR_UPDATE = "1";
	
	public static final String ACTIVE = "1";
	
	public static final String SOFT_DELETE = "0";

	public static final int RESET_SEQ_LIMIT = 6; //R18.01 TIM Dev

	public static final String NEW_USER_PREFIX = "n";

	public static final String RESET_PREFIX = "r";

	public static final String DEFAULT_ROLE = "D";
	
	public static final String NONE = "NONE";
	
	

    public static <S> String formatToJsonResponseString(String stringFormatter, String listName, List<S> list, MandatoryReportParam param) {
    	//stringFormatter = "\"%1$2s\": {\"%1$2s\":%2$2s,\"msg\":\":%2$2s\"}";
		StringBuilder sb = new StringBuilder();
		Formatter formatter = new Formatter(sb);
		formatter.format(stringFormatter, listName,
				new Gson().toJson(list != null ? list: new ArrayList<S>()),
				((CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getMsg()))?
						param.getMsg():((list==null || list.isEmpty()==true)?"":""+list.size())));
		formatter.close();
		return sb.toString();
	}
	public static String encriptPwd(String option) {
		if (ph == null) {
			ph = new PasswordHash();
		}
		System.out.println("Enc Pwd" + ph.getHashCode(option));
		return ph.getHashCode(option);
	}
	
	public static String encriptPwd(String userid, String password) {
		if (ph == null) {
			ph = new PasswordHash();
		}
		// log.info("Enc Pwd ****" + ph.getHashCode(userid,password));
		return ph.getHashCode(userid, password);
	}
	
	public static String getUTCUserforSAPPwd(String userID) {
		String finalUserId = "";
		try {
			if(userID != null && userID != ""){
			DateFormat DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
			// added start here 
			TimeZone tz = TimeZone.getTimeZone("UTC");
			DATE_FORMAT.setTimeZone(tz);
			
			String strDate = DATE_FORMAT.format(new Date()); // option 2
			Date utcDate = DATE_FORMAT.parse(strDate);
			strDate = DATE_FORMAT.format(utcDate);			
			finalUserId = userID + strDate;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return finalUserId;
	}
	
	public static Date toDate(String dateInString) {
		
		SimpleDateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
	
		try {
	
			Date date = formatter.parse(dateInString);
			return date;
	
		} catch (Exception e) {
			e.printStackTrace();
		}
		return null;
	}
	
	public static Date getYesterday() throws ParseException {

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

		Date date = new Date();

		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(currentDate));
		cal.add(Calendar.DATE, -1);

		// LOGGER.info("convertedDate=" + convertedDate);

		return cal.getTime();
	}
	public static Date getToday() throws ParseException {

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

		Date date = new Date();

		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(currentDate));
		cal.add(Calendar.DATE,0);

		// LOGGER.info("convertedDate=" + convertedDate);

		return cal.getTime();
	}
	
	public static String getYesterdayinDDMMYYYY() throws ParseException {

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

		Date date = new Date();

		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(currentDate));
		cal.add(Calendar.DATE,-1);

		// LOGGER.info("convertedDate=" + convertedDate);

		return dateFormat.format(cal.getTime());
	}
	
}
