package au.com.woolworths.portal.service;

import java.io.ByteArrayInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.ObjectInputStream;
import java.io.ObjectOutputStream;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.ngbo.identity.NGBOServices;
import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.PromoAuditTrail;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserInfoDetail;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.UserIdNameParam;
import au.com.woolworths.portal.param.UsrInfoParam;
import au.com.woolworths.portal.param.UsrInfoParamHdr;
import au.com.woolworths.portal.util.Constants;

//import java.util.logging.Logger;

/**
 * @author xrca4
 * 
 */
public class LoginServiceImpl extends CommonServiceImpl {

	@Value("#{url['getEncryptPasswordUrl']}")
	private String getEncryptPasswordUrl;

	@Autowired
	private OrderServiceImpl orderService;
	private static final Logger LOGGER = Logger
			.getLogger(LoginServiceImpl.class.getName());

	public OrderServiceImpl getOrderService() {
		return orderService;
	}

	public void setOrderService(OrderServiceImpl orderService) {
		this.orderService = orderService;
	}

	public String getOrderRefNo(String type, String application, String storeNo)
			throws Exception {
		return orderService.getOrderRefNo(type, application, storeNo);
	}

	public static UserContext getUserContext(String userID) throws Exception {
		UserContext context = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		Connection con = null;
		String qry = " select usr.*,nvl(sec.sec_que_flag,'N') sec_que_flag from (SELECT "
				+ Constants.NGBO_USR
				+ ".*,  TO_CHAR("
				+ Constants.NGBO_USR
				+ ".PASSWORD_EXPIRY_DATE,'DD/MM/YYYY') EXP_DATE,"
				+ " trunc(to_date(USR.PASSWORD_EXPIRY_DATE, 'dd/mon/yy')-sysdate) EXP_IN_DAYS, "
				+ " case when sysdate>USR.PASSWORD_EXPIRY_DATE then '-1' else '1' end as posFlag "
				+ " FROM "
				+ Constants.NGBO_USR
				+ " WHERE LOWER(usr_id )=LOWER(?) "
				+ " )usr left outer join usr_sec_question sec on lower(sec.user_id)=lower(usr.usr_id) ";

		LOGGER.info(qry);
		System.out.println("User context query : " + qry);

		try {
			con = DatabaseUtil.getConnection();
			LOGGER.info("created connection=" + con);
			stmt = con.prepareStatement(qry);
			LOGGER.info("statuement created =" + stmt);
			stmt.setString(1, userID);
			LOGGER.info("Statment set with user id =" + userID);
			rs = stmt.executeQuery();
			LOGGER.info("stmt executed result set =" + rs);
			while (rs.next()) {
				if (context == null)
					context = new UserContext();
				context.setUserId(rs.getString("USR_ID"));
				context.setFirstName(rs.getString("USR_NM"));
				context.setUserName(rs.getString("USR_NM"));
				context.setPassword(rs.getString("PASSWORD"));
				context.setExpiryDate(rs.getString("EXP_DATE"));
				context.setRoleID("");
				context.setSiteNo(rs.getString("LOCATION_ID"));
				context.setRegionId(rs.getString("REGION_ID"));
				context.setDepartment(rs.getString("DEPARTMENT"));
				context.setSapPwd(rs.getString("SAP_PASSWORD"));
				context.setSalesOrg(rs.getInt("SALES_ORG_NO"));
				context.setSecretQuesFlag(rs.getString("sec_que_flag"));
				context.setFullName((null != rs.getString("FIRST_NAME") ? rs
						.getString("FIRST_NAME") : "")
						+ " "
						+ (null != rs.getString("LAST_NAME") ? rs
								.getString("LAST_NAME") : ""));
				context.setVersionId(Constants.VERSION_ID);
				if (rs.getInt("posFlag") > 0) {
					context.setExpiryDueDays(rs.getInt("EXP_IN_DAYS") + 1);
				} else {
					context.setExpiryDueDays(rs.getInt("EXP_IN_DAYS"));
				}
				context.setPayingDept(rs.getString("PAYING_DEPT_ID"));

				if (null != rs.getString("PREFERRED_NAME")) {
					context.setFirstName(rs.getString("PREFERRED_NAME"));
				} else if (null != rs.getString("FIRST_NAME")
						|| null != rs.getString("LAST_NAME")) {
					context.setFirstName((null != rs.getString("FIRST_NAME") ? rs
							.getString("FIRST_NAME") : "")
							+ " "
							+ (null != rs.getString("LAST_NAME") ? rs
									.getString("LAST_NAME") : ""));
				}

				if (rs.getDate("LOCKED_DATE") == null) {
					context.setLocked(false);
				} else {
					context.setLocked(true);
				}

				if (rs.getDate("DELETED_DATE") == null) {
					context.setDeactivated(false);
				} else {
					context.setDeactivated(true);
				}

			}
		} catch (Exception e) {
			LOGGER.error(
					Constants.EXCEPTION + e.getStackTrace()[0].getLineNumber()
							+ " " + e.getStackTrace()[0].getFileName() + " "
							+ e, e);
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return context;
	}

	public static String getPrimaryDeptsForUser(String userID) throws Exception {
		Map<String, ArrayList<String>> primaryDeptMap = new HashMap<String, ArrayList<String>>();
		ResultSet rs = null;
		PreparedStatement stmt = null;
		Connection con = DatabaseUtil.getConnection();
		String qry = "SELECT SITE, DEPT_ID FROM "
				+ Constants.NGBO_USR_PRIMARY_DEPTS
				+ " WHERE LOWER(usr_id )=LOWER(?) and ISACTIVE = '1'";

		LOGGER.info(qry);
		System.out.println("User primary departments query : " + qry);

		try {
			LOGGER.info("created connection=" + con);
			stmt = con.prepareStatement(qry);
			LOGGER.info("statement created =" + stmt);
			stmt.setString(1, userID);
			LOGGER.info("Statment set with user id =" + userID);
			rs = stmt.executeQuery();
			LOGGER.info("stmt executed result set =" + rs);
			while (rs.next()) {
				preparePrimaryDeptMap(rs.getString("SITE"),
						rs.getString("DEPT_ID"), primaryDeptMap);
			}

			System.out.println("==department map==" + primaryDeptMap);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION
					+ e.getStackTrace()[0].getLineNumber() + " "
					+ e.getStackTrace()[0].getFileName() + " " + e);
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}

		return "{\"data\":" + Constants.convertToJsonString(primaryDeptMap)
				+ "}";
	}

	private static void preparePrimaryDeptMap(String site, String deptId,
			Map<String, ArrayList<String>> primaryDeptMap) {
		if (primaryDeptMap.containsKey(site)) {
			primaryDeptMap.get(site).add(deptId);
		} else {
			ArrayList<String> siteDeptList = new ArrayList<String>();
			siteDeptList.add(deptId);
			primaryDeptMap.put(site, siteDeptList);
		}
	}

	public ArrayList<UserIdNameParam> getUserNamesForStore(String storeNo)
			throws Exception {

		// UserContext context = new UserContext();
		ArrayList<UserIdNameParam> userIdNameParamList = new ArrayList<UserIdNameParam>();
		Connection con = DatabaseUtil.getConnection();
		PreparedStatement stmt = con
				.prepareStatement("SELECT distinct us.USR_ID,us.USR_NM FROM usr_site_dtl dtl,usr us WHERE us.store_cost_centre_id=? and us.usr_id=dtl.usr_id order by us.USR_NM");
		// //LOGGER.info("qry"+stmt);
		stmt.setString(1, storeNo);
		ResultSet rs = stmt.executeQuery();

		try {
			while (rs.next()) {
				// Check for password and only then set the properties
				UserIdNameParam userIdNameParam = new UserIdNameParam();
				userIdNameParam.setUserId(rs.getString("USR_ID"));
				userIdNameParam.setUserName(rs.getString("USR_NM"));
				userIdNameParamList.add(userIdNameParam);
				// //LOGGER.info("name-->"+userIdNameParam.getUserName());

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return userIdNameParamList;
	}

	/**************** PASSWORD EXPIRY DATE UPDATE *****************/
	public static String updatePwdExpiryDate(String userId, String date)
			throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("updatePwdExpiryDate start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		String sqlStatement = "update usr set PASSWORD_EXPIRY_DATE = ?, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";
		PreparedStatement stmt = null;
		LOGGER.info("query generated --- " + sqlStatement);
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, date);
			stmt.setString(2, userId);
			rs = stmt.executeQuery();
			if (rs != null) {
				rs.next();
				return "true";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("updatePwdExpiryDate end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return "false";
	}

	/**************** GET THE PASSWORD EXPIRY DATE FROM DATA BASE *****************/
	public static String getPwdExpiryDate(String userId) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		String sqlStatement = "SELECT  TO_CHAR(" + Constants.NGBO_USR
				+ ".PASSWORD_EXPIRY_DATE,'DD/MM/YYYY') PASSWORD_EXPIRY_DATE"
				+ " FROM USR WHERE lower(usr_id)=lower(?)";
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			if (rs != null) {
				rs.next();
				// LOGGER.info(rs.getString("PASSWORD_EXPIRY_DATE"));
				return rs.getString("PASSWORD_EXPIRY_DATE");
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return "false";
	}

	/**************** UPDATE THE PASSWORD *****************/

	public static Map<String, String> updatepromoAuditTrailList(
			List<PromoAuditTrail> promoAuditTrailList) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, String> userDetail = null;

		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < promoAuditTrailList.size(); i++) {
			builder.append("?,");
		}
		String sqlStatement = "select USR_ID, USR_NM FROM USR WHERE USR_ID in ("
				+ builder.deleteCharAt(builder.length() - 1).toString() + ")";

		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			int index = 1;
			for (PromoAuditTrail query : promoAuditTrailList) {
				stmt.setObject(index, query.getUpdatedUser());
				index++;// or whatever it applies
			}
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userDetail = new HashMap<String, String>();
				while (rs.next())
					userDetail.put(rs.getString("USR_ID"),
							rs.getString("USR_NM"));
				return userDetail;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return userDetail;
	}

	public String changePassword(String userId, String newPassword,
			String passwordExpiryDate) throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("changePassword start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		String sqlStatement = "update usr set PASSWORD = ? , PASSWORD_EXPIRY_DATE = ?,LOCKED_DATE = NULL, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";
		PreparedStatement stmt = null;
		LOGGER.info("query generated --- " + sqlStatement);
		newPassword = PwdEncryptDecryptService.encrypt(newPassword);
		if (newPassword == null) {
			return "false";
		}
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, newPassword);
			stmt.setString(2, passwordExpiryDate);
			stmt.setString(3, "SC_" + userId);
			stmt.setString(4, userId);
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				return "true";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		endTime = System.currentTimeMillis();
		LOGGER.info("changePassword end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return "false";
	}

	public static ArrayList<UserInfoDetail> getUserStores(
			UserContext userContext, String siteNo) throws Exception {
		ResultSet rs = null;
		ArrayList<UserInfoDetail> siteList = null;
		UserInfoDetail userInfoDetail = null;
		Connection con = null;
		PreparedStatement stmt = null;
		StringBuffer admQry = new StringBuffer(
				"select (case when trunc(ud.actv_end_date)>=trunc(sysdate) and trunc(ud.actv_start_date)<=trunc(sysdate) then 'Y' else 'N' end) as active_flag ,'N' AS ISPRIMARY,'NONE' as STORE_COST_CENTRE_ID, ud.role as sc_role, "
						+ "  ud.sales_org, so.sales_org_name as description from "
						+ Constants.NGBO_USR_SPECIAL_ROLES
						+ " ud, sales_org so where lower(ud.usr_id)=lower('"
						+ userContext.getUserId()
						+ "')  and ud.sales_org= so.sales_org ");

		StringBuffer query = new StringBuffer(
				"select (case when trunc(ud.actv_end_date)>=trunc(sysdate) and trunc(ud.actv_start_date)<=trunc(sysdate) then 'Y' else 'N' end) as active_flag ,CASE WHEN US.STORE_COST_CENTRE_ID=UD.STORE_COST_CENTRE_ID THEN 'Y' ELSE 'N' end AS ISPRIMARY,  ud.STORE_COST_CENTRE_ID, ud.SC_ROLE, "
						+ "  ud.sales_org, so.sales_org_name as description from "
						+ Constants.NGBO_USR_SITE
						+ " ud,USR US, sales_org so where lower(ud.usr_id)=lower('"
						+ userContext.getUserId()
						+ "') and lower(us.usr_id)=lower(ud.usr_id) and ud.sales_org= so.sales_org "
		// + " Union "
		);
		try {
			con = DatabaseUtil.getConnection();

			if (userContext.getSuperUserFlag() != null
					&& userContext.getSuperUserFlag().equals("Y")) {
				// query.append(" and ( ud.SUPER_ROLE_FLAG='Y' ");
				admQry.append(" AND ud.ROLE in (" + Constants.getAdminUsers()
						+ ") ");
				stmt = con.prepareStatement(admQry.toString());
				LOGGER.info("query__" + admQry);
				System.out.println("query__" + admQry);
			} else if (siteNo != null && !siteNo.equals("")) {
				query.append(" and ud.STORE_COST_CENTRE_ID='"
						+ userContext.getSiteNo() + "'");
				stmt = con.prepareStatement(query.toString());
				LOGGER.info("query__" + query);
				System.out.println("query__" + query);
			} else {
				stmt = con.prepareStatement(query.toString());
				LOGGER.info("query__" + query);
				System.out.println("query__" + query);
			}

			rs = stmt.executeQuery();

			if (rs != null) {
				siteList = new ArrayList<UserInfoDetail>();

				while (rs.next()) {
					if (rs.getString("active_flag") != null
							&& rs.getString("active_flag")
									.equalsIgnoreCase("Y")) {
						userInfoDetail = new UserInfoDetail();
						userInfoDetail.setSiteNo(rs
								.getString("STORE_COST_CENTRE_ID"));
						userInfoDetail.setSalesOrg(rs.getString("SALES_ORG"));
						userInfoDetail.setRoleId(rs.getString("SC_ROLE"));
						userInfoDetail.setSalesOrgNm(rs
								.getString("description").replace("'", "`"));
						userContext.setActive_flag("Y");
						siteList.add(userInfoDetail);
					} else {
						userContext.setActive_flag("N");
						if (rs.getString("isprimary") != null
								&& rs.getString("isprimary").equalsIgnoreCase(
										"N")) {
							userContext.setInactiveInPrimary(true);
						}
						if (userContext.getSiteNo() != null
								&& rs.getString("STORE_COST_CENTRE_ID") != null
								&& rs.getString("STORE_COST_CENTRE_ID").equals(
										userContext.getSiteNo())) {
							userContext.setSmInsertFlag("Y");
						}
					}
				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return siteList;
	}

	public static boolean creatNewUser(String userId, String siteId,
			String roleId, String salesOrg, String dept) throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("creatNewUser start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		int result = 0;

		String deleteStmt = " delete from " + Constants.NGBO_USR_SITE
				+ " where USR_ID = '"
				/*
				 * + userId + "' and SITE_ID = '" + siteId + "' and ROLE_ID = '"
				 * + roleId + "' ";
				 */
				+ userId + "' and STORE_COST_CENTRE_ID = '" + siteId + "' ";
		String sqlStatement = "	insert into "
				+ Constants.NGBO_USR_SITE
				+ " (USR_ID,STORE_COST_CENTRE_ID,SC_ROLE,ACTV_START_DATE,ACTV_END_DATE,SALES_ORG,LAST_CREATED_DATE,LAST_CREATED_USER,LAST_UPDATED_DATE,LAST_UPDATED_USER) values "
				+ " (?,?,?, current_date,current_date+364,?,?,sysdate,'"
				+ userId + "',sysdate,'" + userId + "')";

		PreparedStatement stmt = null;
		try {

			LOGGER.info("query generated --- " + deleteStmt);

			stmt = con.prepareStatement(deleteStmt);
			result = stmt.executeUpdate();

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			stmt.setString(2, siteId);
			stmt.setString(3, roleId);
			stmt.setString(4, salesOrg);
			// stmt.setString(5, dept);
			result = stmt.executeUpdate();
			if (result > 0) {
				return true;
			} else {
				return false;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("creatNewUser end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return false;
	}

	public static Map<String, UserSiteDtl> getUserStoreList(
			UserContext userContext) throws Exception {
		ResultSet rs = null;
		// ArrayList<UserSiteDtl> siteList = null;
		UserSiteDtl userSiteDtl = null;
		Connection con = null;
		PreparedStatement stmt = null;
		Map<String, UserSiteDtl> siteMap = null;

		try {
			String qry = " Select b.*, a.ROLE_DESC from ROLE_PROFILE a JOIN (SELECT ( CASE WHEN ud.actv_end_date>=TRUNC(sysdate) and ud.actv_start_date<=TRUNC(sysdate) THEN 'Y' ELSE 'N' END) AS active_flag , ud.* FROM "
					+ Constants.NGBO_USR_SITE
					+ " ud WHERE ud.usr_id='"
					+ userContext.getUserId()
					// CHANGED BASED ON DEFECT 13322
					// + "' and ud.actv_end_date>=trunc(sysdate) ");
					+ "')b on b.sc_role = a.ROLE_CODE  ";
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(qry);

			rs = stmt.executeQuery();
			LOGGER.info(qry);

			if (rs != null) {

				siteMap = new LinkedHashMap<String, UserSiteDtl>();
				while (rs.next()) {
					// siteList = new ArrayList<UserSiteDtl>();
					if (rs.getString("active_flag") != null
							&& rs.getString("active_flag")
									.equalsIgnoreCase("Y")) {
						userSiteDtl = new UserSiteDtl();
						userSiteDtl.setSiteId(rs
								.getString("STORE_COST_CENTRE_ID"));
						userSiteDtl.setRoleId(rs.getString("sc_role"));
						userSiteDtl.setRoleDesc(rs.getString("ROLE_DESC"));
						// userSiteDtl.setSalesOrg(rs.getString("ROLE_ID"))
						// siteList.add(userSiteDtl);
						userContext.setActive_flag("Y");
						siteMap.put(rs.getString("STORE_COST_CENTRE_ID"),
								userSiteDtl);
					} else {
						userContext.setActive_flag("N");
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return siteMap;
	}

	public static List<SiteDtls> getSiteDtls(String siteNo, String areaCode,
			String regionId, String salesOrg, String roleId)
			throws SQLException {
		StringBuffer query = null;
		List<SiteDtls> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;
		String salesOrgValidation = new String();

		if (salesOrg != null
				&& !salesOrg.equals("")
				&& roleId != null
				&& (roleId.equalsIgnoreCase(Constants.AREA_MANAGER) || roleId
						.equalsIgnoreCase(Constants.SAlESORG_MANAGER))) {
			salesOrgValidation = " case when sm.sales_org in ((select to_char(LINKED_SALES_ORG) from ngbo_linked_sales_org where sales_org = '"
					+ salesOrg
					+ "') union all (select '"
					+ salesOrg
					+ "' from dual)) then 'Y' else 'N' end is_validSales_org";
		} else {
			salesOrgValidation = " 'NA' is_validSales_org";
		}

		query = new StringBuffer(
				" SELECT sm.site,sm.site_name,sm.district,sm.sales_org,sm.area,'' AS area_name,sm.region,"
						+ " '' AS region_name ,sa.*,sm.latitude,sm.longitude,"
						+ salesOrgValidation
						+ " FROM "
						+ Constants.NGBO_SITEMASTER
						+ " sm left OUTER join sales_org sa on (sa.sales_org=sm.sales_org) WHERE ");
		// +
		// " sm left OUTER join sales_org sa on (sa.sales_org in (SELECT LINKED_SALES_ORG||','||sm.sales_org "
		// +"FROM NGBO_LINKED_SALES_ORG WHERE ROLE_ID='"+roleId+"' AND SALES_ORG = sm.sales_org union SELECT sm.sales_org FROM DUAL)) WHERE ");
		// error message fix
		// query = new StringBuffer(
		// " SELECT sm.site,sm.site_name,sm.district,sm.sales_org,sm.area,'' AS area_name,sm.region,"
		// + " '' AS region_name ,sa.*,sm.latitude,sm.longitude FROM "
		// + Constants.NGBO_SITEMASTER
		// +
		// " sm left OUTER join sales_org sa on (sa.sales_org in (SELECT LINKED_SALES_ORG||','||sm.sales_org "
		// +"FROM NGBO_LINKED_SALES_ORG WHERE ROLE_ID='"+roleId+"' AND SALES_ORG = sm.sales_org union SELECT sm.sales_org FROM DUAL)) WHERE ");

		if (!siteNo.equals("")) {

			query.append(" sm.site='" + siteNo + "'");

		} else if (!areaCode.equals("")) {

			query.append(" sm.area='" + areaCode + "'");

		} else if (!regionId.equals("")) {
			query.append(" sm.region='" + regionId + "'");
		}

		// if (salesOrg!=null && !salesOrg.equals("") && roleId!=null &&
		// (roleId.equalsIgnoreCase(Constants.AREA_MANAGER)
		// || roleId.equalsIgnoreCase(Constants.SAlESORG_MANAGER))) {
		// query.append(" and sm.sales_org in (").append(" (select to_char(LINKED_SALES_ORG) from ngbo_linked_sales_org where sales_org = '"
		// + salesOrg + "') union all (select '" + salesOrg +
		// "' from dual) ").append(") ");
		// }

		LOGGER.info("query__" + query);
		System.out.println("query__" + query);
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query.toString());
			rs = stmt.executeQuery();

			if (rs != null) {
				siteDtlsList = new ArrayList<SiteDtls>();
				while (rs.next()) {
					if (!salesOrg.equals("")) {
						if (null != rs.getString("is_validSales_org")
								&& ("NA".equalsIgnoreCase(rs
										.getString("is_validSales_org")) || "Y"
										.equalsIgnoreCase(rs
												.getString("is_validSales_org")))) {
							siteDtlsList.add(new SiteDtls(rs.getString("site"),
									rs.getString("site_name").replace("-", "_")
											.replace("'", "`"), rs
											.getString("district"), rs
											.getString("sales_org"), rs
											.getString("area"), rs
											.getString("region"), rs
											.getString("area_name"), rs
											.getString("region_name"), "", rs
											.getString("SALES_ORG_NAME")
											.replace("'", "`"), rs
											.getString("latitude"), rs
											.getString("longitude")

							));
						} else {
							SiteDtls sd = new SiteDtls();
							sd.setMsg(Constants.ERROR_MSG);
							siteDtlsList.add(sd);
						}
					} else {
						siteDtlsList.add(new SiteDtls(rs.getString("site"), rs
								.getString("site_name").replace("-", "_")
								.replace("'", "`"), rs.getString("district"),
								rs.getString("sales_org"),
								rs.getString("area"), rs.getString("region"),
								rs.getString("area_name"), rs
										.getString("region_name"), "", rs
										.getString("SALES_ORG_NAME").replace(
												"'", "`"), rs
										.getString("latitude"), rs
										.getString("longitude")

						));
					}

				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return siteDtlsList;

	}

	public static List<SiteDtls> getSiteDtlsList(List<String> storeList)
			throws SQLException {

		StringBuffer queryStr = null;
		String query = null;
		for (String siteNo : storeList) {
			if (queryStr == null)
				queryStr = new StringBuffer(" '" + siteNo + "'");
			else
				queryStr.append(",'").append(siteNo).append("'");
		}

		query = "select sm.*,sa.* from "
				+ Constants.NGBO_SITEMASTER
				+ " sm left OUTER join sales_org sa on (sa.sales_org=sm.sales_org) where site in("
				+ queryStr.toString() + ")";

		LOGGER.info("query__" + query);
		List<SiteDtls> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();

			if (rs != null) {
				siteDtlsList = new ArrayList<SiteDtls>();
				while (rs.next()) {

					siteDtlsList.add(new SiteDtls(rs.getString("site"), rs
							.getString("site_name").replace("-", "_")
							.replace("'", "`"), rs.getString("district"), rs
							.getString("sales_org"), rs.getString("area"), rs
							.getString("region"), "", "", "", rs.getString(
							"sales_org_name").replace("'", "`"), rs
							.getString("latitude"), rs.getString("longitude")

					)

					);

				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return siteDtlsList;

	}

	public static String getPrimaryStore(String userId)

	throws SQLException {

		String query = new String();
		query = "select STORE_COST_CENTRE_ID from usr where usr_id ='"
				+ userId.toLowerCase() + "'";

		LOGGER.info("query__" + query);
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();

			if (rs != null) {
				while (rs.next()) {
					return rs.getString("STORE_COST_CENTRE_ID");
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return "";

	}

	public static String getStoreHost(String siteNo)

	throws SQLException {

		String query = new String();
		query = "select hs.host from ngbo_tim_pilot_stores st, ngbo_tim_pilot_store_host hs where st.werks = hs.site_no and hs.site_no = ? ";

		LOGGER.info("query__" + query);
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			stmt.setString(1, siteNo);
			rs = stmt.executeQuery();

			if (rs != null) {
				while (rs.next()) {
					return rs.getString("host");
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return "";

	}

	public static HashMap<String, String> getAllStoreHost()

	throws SQLException {

		String query = new String();
		query = "select hs.host,hs.site_no from ngbo_tim_pilot_stores st, ngbo_tim_pilot_store_host hs where st.werks = hs.site_no ";

		LOGGER.info("query__" + query);
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;
		HashMap<String, String> result = new HashMap<String, String>();
		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();

			if (rs != null) {
				while (rs.next()) {
					result.put(rs.getString("site_no"), rs.getString("host"));
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return result;

	}

	public static List<Store> getSitesList(String store, String salesOrg)
			throws SQLException {

		String query = null;
		Store storeDtl = null;
		List<Store> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		query = "SELECT sm.site, sm.site_name, sm.sales_org, sa.sales_org_name FROM "
				+ Constants.NGBO_SITEMASTER
				+ " sm LEFT OUTER JOIN sales_org sa on sm.sales_org= sa.sales_org "
				+ " WHERE  sm.sales_org ='"
				+ salesOrg
				+ "' and (sm.site LIKE ('%"
				+ store
				+ "%')  OR lower(sm.site_name) LIKE ('%"
				+ store.toLowerCase()
				+ "%')) ";

		LOGGER.info("query__" + query);

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();

			if (rs != null) {
				siteDtlsList = new ArrayList<Store>();
				while (rs.next()) {
					storeDtl = new Store(rs.getString("site"), rs.getString(
							"site_name").replace("'", "`"),
							rs.getString("sales_org"), rs.getString(
									"sales_org_name").replace("'", "`"));
					storeDtl.setSiteNo(rs.getString("site"));
					if (null != rs.getString("site_name")) {
						storeDtl.setSiteName(rs.getString("site_name")
								.replace("'", "`").replace("(", "_")
								.replace(")", " ").replace("-", "_"));
					} else
						storeDtl.setSiteName("");
					storeDtl.setSalesOrg(rs.getString("sales_org"));
					storeDtl.setSalesOrgNm(rs.getString("sales_org_name")
							.replace("'", "`"));
					siteDtlsList.add(storeDtl);

				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return siteDtlsList;

	}

	public static List<Store> getSitesListNew(String store, String salesOrg)
			throws SQLException {

		String query = null;
		Store storeDtl = null;
		List<Store> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		query = "SELECT sm.site, sm.site_name, sm.sales_org, sa.sales_org_name FROM "
				+ Constants.NGBO_SITEMASTER
				+ " sm LEFT OUTER JOIN sales_org sa on sm.sales_org= sa.sales_org "
				+ " WHERE (sm.site LIKE ('%"
				+ store
				+ "%')  OR lower(sm.site_name) LIKE ('%"
				+ store.toLowerCase()
				+ "%')) ";

		LOGGER.info("query__" + query);

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			boolean flag = false;
			if (rs != null) {
				siteDtlsList = new ArrayList<Store>();
				while (rs.next()) {

					if (rs.getString("sales_org").equalsIgnoreCase(salesOrg)) {
						storeDtl = new Store(rs.getString("site"), rs
								.getString("site_name").replace("'", "`"),
								rs.getString("sales_org"), rs.getString(
										"sales_org_name").replace("'", "`"));
						storeDtl.setSiteNo(rs.getString("site"));
						if (null != rs.getString("site_name")) {
							storeDtl.setSiteName(rs.getString("site_name")
									.replace("'", "`").replace("(", "_")
									.replace(")", " ").replace("-", "_"));
						} else
							storeDtl.setSiteName("");
						storeDtl.setSalesOrg(rs.getString("sales_org"));
						storeDtl.setSalesOrgNm(rs.getString("sales_org_name")
								.replace("'", "`"));
						siteDtlsList.add(storeDtl);
					} else if (store.equalsIgnoreCase(rs.getString("site")))
						flag = true;
				}

				if (flag && siteDtlsList.size() <= 0) {
					storeDtl = new Store();
					storeDtl.setError(Constants.ERROR_MSG);
					siteDtlsList.add(storeDtl);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return siteDtlsList;

	}

	public static ArrayList<String> isPosStore(String siteNo)
			throws SQLException {

		String query = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;
		ArrayList<String> codeList = null;

		query = "select TAB_CODE from POS_STORES where SITE_NO='" + siteNo
				+ "'";
		LOGGER.info("query__" + query);
		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();

			if (rs != null) {
				codeList = new ArrayList<String>();
				while (rs.next()) {
					codeList.add(rs.getString("TAB_CODE"));
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return codeList;

	}

	public ArrayList<UsrInfoParam> getEncryptPassword(
			ArrayList<UsrInfoParam> param, UserContext user) {

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			UsrInfoParamHdr req = new UsrInfoParamHdr();

			req.setPasswordList(param);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(req,
					postrequestHeaders);

			ResponseEntity<UsrInfoParamHdr> response = getForPostRestTemplate(
					user).exchange(

			getEncryptPasswordUrl, HttpMethod.POST, requestEntity,
					UsrInfoParamHdr.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPasswordList() != null
					&& response.getBody().getPasswordList().size() > 0
					&& response.getBody().getTyp()
							.equals(Constants.SUCCESS_MSG)) {
				return response.getBody().getPasswordList();

			}

		} catch (Exception e) {
			LOGGER.info(e.getMessage());
			return null;
		}

		return null;

	}

	public int updateLastLoggedInTime(String userId, String siteNo)
			throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("updateLastLoggedInTime start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		int imapactCount = 0;
		String sqlStatement = new String();// "update "+Constants.NGBO_USR+" set LAST_LOGIN_TIME = SYSDATE where lower(usr_id)=lower(?)";

		if (siteNo != null) {
			sqlStatement = "update "
					+ Constants.NGBO_USR_SITE
					+ " set LAST_LOGIN_TIME = SYSDATE, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?) and STORE_COST_CENTRE_ID='"
					+ siteNo + "'";
		} else {
			sqlStatement = "update "
					+ Constants.NGBO_USR_SPECIAL_ROLES
					+ " set LAST_LOGIN_TIME = SYSDATE, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";
		}

		PreparedStatement stmt = null;
		LOGGER.info("query generated --- " + sqlStatement);
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			imapactCount = stmt.executeUpdate();
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("updateLastLoggedInTime end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return imapactCount;
	}

	public int updateIncorrectAttempt(String userId) throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("updateIncorrectAttempt start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		int imapactCount = 0;
		String sqlStatement = "update "
				+ Constants.NGBO_USR_PWD_ATTEMPT
				+ " set INCORRECT_ATTEMPT = INCORRECT_ATTEMPT+1, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";
		LOGGER.info("query generated --- " + sqlStatement);
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			imapactCount = stmt.executeUpdate();
			if (imapactCount == 0) {

				if (stmt != null)
					stmt.close();

				sqlStatement = "INSERT INTO " + Constants.NGBO_USR_PWD_ATTEMPT
						+ " (USR_ID,INCORRECT_ATTEMPT) VALUES(?,1)";
				System.out.println("inser pwd attemp  : " + sqlStatement);
				stmt = con.prepareStatement(sqlStatement);
				stmt.setString(1, userId);
				imapactCount = stmt.executeUpdate();
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		if (getIncorrectAttempt(userId) >= Constants.MAX_INCORRECT_ATTEMPT) {
			lockUserAccount(userId);
			resetIncorrectAttempt(userId);
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("updateIncorrectAttempt end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return imapactCount;
	}

	public int getIncorrectAttempt(String userId) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select NVL(INCORRECT_ATTEMPT,0) from "
				+ Constants.NGBO_USR_PWD_ATTEMPT
				+ " where lower(usr_id)=lower(?)";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return 0;
	}

	public int getIncorrectSecretQuesAttempt(String userId) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select NVL(FRGT_PWD_ATTEMPT,0) from "
				+ Constants.NGBO_USR_PWD_ATTEMPT
				+ " where lower(usr_id)=lower(?)";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getInt(1);
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return 0;
	}

	public int resetIncorrectAttempt(String userId) throws Exception {
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("resetIncorrectAttempt start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		int imapactCount = 0;
		String sqlStatement = "update "
				+ Constants.NGBO_USR_PWD_ATTEMPT
				+ " set INCORRECT_ATTEMPT = 0,FRGT_PWD_ATTEMPT = 0, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";

		PreparedStatement stmt = null;
		LOGGER.info("query generated --- " + sqlStatement);
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			imapactCount = stmt.executeUpdate();
			if (imapactCount == 0) {

				if (stmt != null)
					stmt.close();

				sqlStatement = "INSERT INTO "
						+ Constants.NGBO_USR_PWD_ATTEMPT
						+ " (USR_ID,INCORRECT_ATTEMPT,FRGT_PWD_ATTEMPT) VALUES(lower(?),0,0)";
				LOGGER.info("query generated --- " + sqlStatement);
				stmt = con.prepareStatement(sqlStatement);
				stmt.setString(1, userId);
				imapactCount = stmt.executeUpdate();
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("resetIncorrectAttempt end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));
		return imapactCount;
	}

	public int lockUserAccount(String userId) throws Exception {

		int imapactCount = 0;
		Long startTime, endTime;
		startTime = System.currentTimeMillis();

		LOGGER.info("lock start time --- " + startTime);
		try {
			NGBOServices timService = new NGBOServices();
			LOGGER.info("calling TIM service");
			timService.lockUser(userId, userId);

		} catch (Exception e) {
			LOGGER.error((Constants.EXCEPTION + e), e);
			// UPDATES LOCAL DB IF TIM ISSUES
			Connection con = DatabaseUtil.getConnection();
			String sqlStatement = "update "
					+ Constants.NGBO_USR
					+ " set LOCKED_DATE = SYSDATE, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";

			PreparedStatement stmt = null;

			LOGGER.info("query generated --- " + sqlStatement);
			try {
				stmt = con.prepareStatement(sqlStatement);
				stmt.setString(1, userId);
				imapactCount = stmt.executeUpdate();

			} catch (SQLException e1) {
				e1.printStackTrace();
			} catch (Exception e1) {
				e1.printStackTrace();
			} finally {

				if (stmt != null)
					stmt.close();
				DatabaseUtil.releaseConnection(con);// con.close();
			}
		}
		endTime = System.currentTimeMillis();
		LOGGER.info("lock end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return imapactCount;
	}

	public int secretAnsIncorrectAttempt(String userID, boolean isReset)
			throws SQLException {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("secretAnsIncorrectAttempt start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();
		int imapactCount = 0;
		String sqlStatement = "update "
				+ Constants.NGBO_USR_PWD_ATTEMPT
				+ " set FRGT_PWD_ATTEMPT = 0, CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)=lower(?)";

		if (!isReset) {
			sqlStatement = "update "
					+ Constants.NGBO_USR_PWD_ATTEMPT
					+ " set FRGT_PWD_ATTEMPT = FRGT_PWD_ATTEMPT+1 where lower(usr_id)=lower(?)";
		}

		PreparedStatement stmt = null;

		LOGGER.info("query generated --- " + sqlStatement);
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userID);
			imapactCount = stmt.executeUpdate();
			if (imapactCount == 0) {

				if (stmt != null)
					stmt.close();

				sqlStatement = "INSERT INTO " + Constants.NGBO_USR_PWD_ATTEMPT
						+ " (USR_ID,FRGT_PWD_ATTEMPT) VALUES(lower(?),1)";
				LOGGER.info("query generated --- " + sqlStatement);
				stmt = con.prepareStatement(sqlStatement);
				stmt.setString(1, userID);
				imapactCount = stmt.executeUpdate();
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("secretAnsIncorrectAttempt end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return imapactCount;
	}

	// XPSNV - Security Requirement - Logging User Details each time they login
	// to a store - Begin
	public void createUserLogAudit(String userId, String roleID, String siteNo)
			throws SQLException {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("createUserLogAudit start time --- " + startTime);

		Connection con = DatabaseUtil.getConnection();

		String sqlStatement = "INSERT INTO "
				+ Constants.NGBO_USER_LOG_AUDIT
				+ " (ID, USER_ID, ROLE_ID, STORE_ID, LOGGED_IN_TIME) VALUES (ngbo_user_log_sequence.nextval, lower(?), ?, ?, sysdate)";

		LOGGER.info("query generated --- " + sqlStatement);
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			stmt.setString(2, roleID);
			stmt.setString(3, siteNo);

			stmt.executeUpdate();

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("createUserLogAudit end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

	}

	public ArrayList<UserSiteDtl> getExpieryDays(String userId, String role,
			String siteNo) throws SQLException {

		ArrayList<UserSiteDtl> expDaysMap = new ArrayList<UserSiteDtl>();

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		String checkExpieryDaysQry = "SELECT distinct USD.USR_ID, USD.STORE_COST_CENTRE_ID, USD.sc_ROLE,sm.site_name,rp.role_desc,usd.sc_role, TO_CHAR(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE, TO_CHAR(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE, case when TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) then 'N' else 'Y' end as active, TO_CHAR(USD.ACTV_END_DATE,'DD/MM/YYYY') EXP_DATE, 1 + 30*TRUNC(months_between(TO_DATE(USD.ACTV_END_DATE,'DD/MON/YYYY'), TO_DATE(SYSDATE,'DD/MON/YYYY'))) + LEAST(extract(DAY FROM TO_DATE(USD.ACTV_END_DATE,'DD/MON/YYYY')), 30) - LEAST(extract(DAY FROM TO_DATE(SYSDATE,'DD/MON/YYYY')), 30) + CASE WHEN extract(DAY FROM TO_DATE(USD.ACTV_END_DATE,'DD/MON/YYYY')) < extract(DAY FROM TO_DATE(SYSDATE,'DD/MON/YYYY')) THEN 30 ELSE 0 END EXP_IN_DAYS FROM "
				+ Constants.NGBO_USR_SITE
				+ " USD LEFT OUTER JOIN "
				+ Constants.NGBO_SITEMASTER
				+ " sm ON sm.site= USD.STORE_COST_CENTRE_ID, "
				+ Constants.NGBO_USR
				+ " US,role_profile rp where rp.role_code= USD.sc_role and usd.usr_id=? and usd.STORE_COST_CENTRE_ID = ?";

		if (Constants.isAdminUser(role)) {
			checkExpieryDaysQry = "SELECT DISTINCT USD.USR_ID, 'NONE' STORE_COST_CENTRE_ID, USD.role as sc_role, '' site_name, rp.role_desc, usd.role, TO_CHAR(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE, TO_CHAR(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE, CASE WHEN TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) THEN 'N' ELSE 'Y' END AS active, TO_CHAR(USD.ACTV_END_DATE,'DD/MM/YYYY') EXP_DATE, 1 + 30*TRUNC(months_between(TO_DATE(USD.ACTV_END_DATE,'DD/MON/YYYY'), TO_DATE(SYSDATE,'DD/MON/YYYY'))) + LEAST(extract(DAY FROM TO_DATE(USD.ACTV_END_DATE,'DD/MON/YYYY')), 30) - LEAST(extract(DAY FROM TO_DATE(SYSDATE,'DD/MON/YYYY')), 30) + CASE WHEN extract(DAY FROM TO_DATE(USD.ACTV_END_DATE,'DD/MON/YYYY')) < extract(DAY FROM TO_DATE(SYSDATE,'DD/MON/YYYY')) THEN 30 ELSE 0 END EXP_IN_DAYS FROM "
					+ Constants.NGBO_USR_SPECIAL_ROLES
					+ " USD, role_profile rp WHERE rp.role_code= USD.role AND lower(usd.usr_id) =lower(?)";
		}

		LOGGER.info("sqlStatement_" + checkExpieryDaysQry);
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(checkExpieryDaysQry);
			stmt.setString(1, userId);
			if (!Constants.isAdminUser(role)) {
				stmt.setString(2, siteNo);
			}
			rs = stmt.executeQuery();
			while (rs.next()) {
				if (rs.getInt("EXP_IN_DAYS") <= Constants.STORE_EXP_NOTIFY_PERIOD + 1) {
					UserSiteDtl usd = new UserSiteDtl();
					usd.setUserId(rs.getString("USR_ID"));
					usd.setSiteId(rs.getString("STORE_COST_CENTRE_ID"));
					usd.setSiteName(rs.getString("site_name"));
					usd.setRoleId(rs.getString("sc_role"));
					usd.setRoleDesc(rs.getString("role_desc"));
					usd.setExp_in_days(rs.getInt("Exp_in_days"));
					expDaysMap.add(usd);
				}
			}

		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return expDaysMap;
	}

	public String getLocatedStoreNo(String ip) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select sync_user,ip_address from (select distinct sync_user,ip_address,clt_end_ts, rank() over (partition by sync_user order by clt_end_ts desc) rank from ml_system.SYNC_SUB_CTRL where clt_end_ts is not null and ip_address like '%"
				+ ip + "%') where rank=1";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			System.out.println("get located Site Qry :" + sqlStatement);
			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			while (rs.next()) {
				return rs.getString("sync_user");
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != rs) {
				rs.close();
			}
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return "-1";
	}

	public String getLocatedSalesOrg(String ip) throws Exception {
		System.out.println(ip);
		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select st.sync_user,st.ip_address,sm.sales_org from (select distinct sync_user,ip_address,clt_end_ts, rank() over (partition by sync_user order by clt_end_ts desc) rank from ml_system.SYNC_SUB_CTRL where clt_end_ts is not null and ip_address like '%"
				+ ip
				+ "%' ) st, "
				+ Constants.NGBO_SITEMASTER
				+ " sm where st.rank=1 and st.ip_address like '%"
				+ ip
				+ "%' and sm.site=st.sync_user";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			System.out.println(sqlStatement);
			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			while (rs.next()) {
				System.out.println("located SalesOrg "
						+ rs.getString("sales_org"));
				return rs.getString("sales_org");
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != rs) {
				rs.close();
			}
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return "-1";
	}

	public static boolean isNGBOStore(String store) throws Exception {

		if (null == store || store.trim().equalsIgnoreCase(""))
			return false;

		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select count(*) num from NGBO_TIM_PILOT_STORES where WERKS='"
				+ store + "'";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			while (rs.next()) {
				if (rs.getInt("num") >= 1) {
					return true;
				} else {
					return false;
				}
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != rs) {
				rs.close();
			}
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return false;
	}

	public boolean isPilotStore(String store) throws Exception {

		if (null == store || store.trim().equalsIgnoreCase(""))
			return false;

		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select count(*) num from NGBO_PILOT_STORES where WERKS='"
				+ store + "'";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			while (rs.next()) {
				if (rs.getInt("num") >= 1) {
					return true;
				} else {
					return false;
				}
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != rs) {
				rs.close();
			}
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return false;
	}

	public static List<Store> getSitesListFromRegion(String region,
			String salesOrg) throws SQLException {

		String query = null;
		Store storeDtl = null;
		List<Store> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = DatabaseUtil.getConnection();
		PreparedStatement stmt = null;

		query = "SELECT distinct sm.site, sm.site_name, sm.sales_org FROM "
				+ Constants.NGBO_SITEMASTER + " sm " + " WHERE sm.region='"
				+ region + "' and sm.sales_org='" + salesOrg + "' ";

		LOGGER.info("query__" + query);

		try {

			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			if (rs != null) {
				siteDtlsList = new ArrayList<Store>();
				while (rs.next()) {
					storeDtl = new Store(rs.getString("site"),
							rs.getString("site_name"),
							rs.getString("sales_org"), null);
					storeDtl.setSiteNo(rs.getString("site"));
					if (null != rs.getString("site_name")) {
						storeDtl.setSiteName(rs.getString("site_name")
								.replace("(", "_").replace(")", " ")
								.replace("-", "_"));
					} else
						storeDtl.setSiteName("");
					siteDtlsList.add(storeDtl);

				}

			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}

		return siteDtlsList;

	}

	public static int getResetSeq(String userId) throws SQLException {
		String query = "select nvl(reset_seq,0) reset_seq from "
				+ Constants.NGBO_USR_PWD_ATTEMPT + " where lower(usr_id)='"
				+ userId.toLowerCase() + "'";
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		LOGGER.info("query__" + query);
		int resetSeq = 0;
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			if (rs != null) {
				while (rs.next())
					resetSeq = rs.getInt("reset_seq");
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		resetSeq++;
		if (resetSeq > Constants.RESET_SEQ_LIMIT) {
			resetSeq = 1;
		}
		return resetSeq;

	}

	public static void updateResetSeq(String userId, int seq)
			throws SQLException {
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("updateResetSeq start time --- " + startTime);

		String updateQuery = "update "
				+ Constants.NGBO_USR_PWD_ATTEMPT
				+ " set reset_seq='"
				+ seq
				+ "', CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where lower(usr_id)='"
				+ userId.toLowerCase() + "'";
		String insertQry = "insert into " + Constants.NGBO_USR_PWD_ATTEMPT
				+ "(usr_id,reset_seq) values('" + userId.toLowerCase() + "','"
				+ seq + "')";
		Connection con = null;
		PreparedStatement stmt = null;
		int rs = 0;
		LOGGER.info("query generated --- " + updateQuery);
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(updateQuery);
			rs = stmt.executeUpdate();
			if (rs == 0) {
				LOGGER.info("query generated --- " + insertQry);
				if (stmt != null)
					stmt.close();
				stmt = con.prepareStatement(insertQry);
				rs = stmt.executeUpdate();
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("updateResetSeq end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

	}

	public static String getNotificationSettings(String user_id)
			throws Exception {

		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;

		try {
			con = DatabaseUtil.getConnection();
			stmt = con
					.prepareStatement("select * from NGBO_NOTIFICATION_SETTINGS where LOWER(USR_ID) = LOWER('"
							+ user_id
							+ "' and ISACTIVE ='"
							+ Constants.ACTIVE
							+ "' )");

			rs = stmt.executeQuery();
			if (rs != null) {
				while (rs.next()) {
					return rs.getString("IS_ALL_DEPTS");
				}
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}

		return "Y";
	}

	public static String setNotificationSettings(String user_id,
			String notify_settings) throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("setNotificationSettings start time --- " + startTime);

		Connection con = null;
		int updateCount = 0;
		String updateQry = "UPDATE NGBO_NOTIFICATION_SETTINGS SET IS_ALL_DEPTS='"
				+ notify_settings
				+ "', CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where LOWER(USR_ID) = LOWER('"
				+ user_id + "')";
		String insertQry = "INSERT INTO NGBO_NOTIFICATION_SETTINGS(usr_id,IS_ALL_DEPTS) values('"
				+ user_id.toLowerCase() + "','" + notify_settings + "') ";
		PreparedStatement stmt = null;
		LOGGER.info("query generated --- " + updateQry);
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(updateQry);
			updateCount = stmt.executeUpdate();
			if (updateCount == 0) {
				LOGGER.info("query generated --- " + insertQry);
				stmt = con.prepareStatement(insertQry);
				stmt.executeUpdate();
			}
		} catch (Exception e) {
			throw e;
		} finally {
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("setNotificationSettings end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return "Y";
	}

	public static List<Store> getSitesListNew(String store) throws SQLException {

		String query = null;
		Store storeDtl = null;
		List<Store> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		query = "SELECT sm.site, sm.site_name, sm.sales_org, sa.sales_org_name FROM "
				+ Constants.NGBO_SITEMASTER
				+ " sm LEFT OUTER JOIN sales_org sa on sm.sales_org= sa.sales_org "
				+ " WHERE sm.site ='" + store + "'";

		LOGGER.info("query__" + query);

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			if (rs != null) {
				siteDtlsList = new ArrayList<Store>();
				while (rs.next()) {

					storeDtl = new Store(rs.getString("site"), rs.getString(
							"site_name").replace("'", "`"),
							rs.getString("sales_org"), rs.getString(
									"sales_org_name").replace("'", "`"));
					storeDtl.setSiteNo(rs.getString("site"));
					if (null != rs.getString("site_name")) {
						storeDtl.setSiteName(rs.getString("site_name")
								.replace("'", "`").replace("(", "_")
								.replace(")", " ").replace("-", "_"));
					} else
						storeDtl.setSiteName("");
					storeDtl.setSalesOrg(rs.getString("sales_org"));
					storeDtl.setSalesOrgNm(rs.getString("sales_org_name")
							.replace("'", "`"));
					siteDtlsList.add(storeDtl);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}

		return siteDtlsList;

	}

	public static String logSessionId(String login_sequence,
			String login_user_id, String login_session_id,
			String login_remote_ip, String login_host_id,
			String logout_user_id, String logout_session_id,
			String logout_remote_ip, String logout_host_id,
			String is_kicked_out, String is_session_active, boolean isLogin)
			throws Exception {
		String userSeq = "";
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		LOGGER.info("logSessionId start time --- " + startTime);
		Connection con = null;
		String query = "";
		if (isLogin) {
			userSeq = getSessionIdSeq();
			query = " insert into NGBO_SESSION_MGT (LOGIN_SEQUENCE,LOGIN_USER_ID,LOGIN_SESSION_ID,LOGIN_REMOTE_IP,LOGIN_HOST_ID,LOGOUT_USER_ID,LOGOUT_SESSION_ID,LOGOUT_REMOTE_IP,LOGOUT_HOST_ID,IS_KICKED_OUT,IS_SESSION_ACTIVE,LOGIN_TIME,LOGOUT_TIME)  "
					+ " values ('"
					+ userSeq
					+ "','"
					+ login_user_id
					+ "','"
					+ login_session_id
					+ "','"
					+ login_remote_ip
					+ "','"
					+ login_host_id
					+ "','"
					+ logout_user_id
					+ "','"
					+ logout_session_id
					+ "','"
					+ logout_remote_ip
					+ "','"
					+ logout_host_id + "',null,null,sysdate,null) ";
		} else {
			userSeq = login_sequence;
			query = " update NGBO_SESSION_MGT  set LOGOUT_USER_ID = '"
					+ logout_user_id + "',LOGOUT_SESSION_ID = '"
					+ logout_session_id + "',LOGOUT_REMOTE_IP = '"
					+ logout_remote_ip + "',LOGOUT_HOST_ID = '"
					+ logout_host_id + "',IS_KICKED_OUT = '" + is_kicked_out
					+ "',IS_SESSION_ACTIVE = '" + is_session_active
					+ "',LOGOUT_TIME = sysdate where login_sequence = '"
					+ login_sequence + "' ";
		}

		PreparedStatement stmt = null;
		LOGGER.info("query generated --- " + query);
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			stmt.executeUpdate();
		} catch (Exception e) {
			throw e;
		} finally {
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}

		endTime = System.currentTimeMillis();
		LOGGER.info("logSessionId end time --- " + endTime);
		LOGGER.info("total taken time--- " + (endTime - startTime));

		return userSeq;
	}

	private static String getSessionIdSeq() throws SQLException {
		LOGGER.info("getSessionIdSeq start");

		String seqId = "";
		Connection con = null;
		ResultSet rs = null;
		PreparedStatement stmt = null;

		try {
			con = DatabaseUtil.getConnection();
			stmt = con
					.prepareStatement("select NGBO_SESSION_MGT_SEQ.nextVal as seq_id from dual");
			rs = stmt.executeQuery();
			if (rs != null && rs.next()) {
				seqId = rs.getString("seq_id");
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (stmt != null)
				stmt.close();
			if (rs != null)
				rs.close();
			DatabaseUtil.releaseConnection(con);
		}
		LOGGER.info("getSessionIdSeq end");
		return seqId;
	}

	public static boolean is1S3Store(String store) throws Exception {

		if (null == store || store.trim().equalsIgnoreCase(""))
			return false;

		Connection con = DatabaseUtil.getConnection();
		String sqlStatement = "select count(*) num from NGBO_TIM_PILOT_STORE_HOST where VERSION=3 and site_no='"
				+ store + "'";
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			while (rs.next()) {
				if (rs.getInt("num") >= 1) {
					return true;
				} else {
					return false;
				}
			}

		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (null != rs) {
				rs.close();
			}
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);// con.close();
		}
		return false;
	}

	// SAP password encryption changes in StoreCentral
	public static String encryptSAPPassword(String userId, String password) {
		String encryptPassword = new String();
		encryptPassword = Constants.encriptPwd(userId.toLowerCase(), password);
		return encryptPassword;
	}

	public boolean updateSessionInfo(String sessionId, UserContext user)
			throws SQLException, IOException {
		boolean updateStatus = false;
		int rs = 0;
		PreparedStatement stmt = null;
		ByteArrayOutputStream baos = null;
		ObjectOutputStream oos = null;
		byte[] userInfoAsBytes = null;
		ByteArrayInputStream bais = null;
		if (sessionId != null && !sessionId.isEmpty() && user != null) {
			Connection con = DatabaseUtil.getConnection();
			String sqlStatement = "Insert into NGBO_USER_SESSION (session_id, user_info) values (?,?)";
			try {
				baos = new ByteArrayOutputStream();
				oos = new ObjectOutputStream(baos);
				oos.writeObject(user);
				userInfoAsBytes = baos.toByteArray();
				stmt = con.prepareStatement(sqlStatement);
				bais = new ByteArrayInputStream(userInfoAsBytes);
				stmt.setString(1,sessionId);
				stmt.setBinaryStream(2, bais, userInfoAsBytes.length);
				rs = stmt.executeUpdate();
				if (rs > 0) {
					updateStatus = true;
				} else {
					updateStatus = false;
				}

			} catch (SQLException e) {
				LOGGER.error(e);
			} catch (Exception e) {
				LOGGER.error(e);
			} finally {
				if (stmt != null) {
					stmt.close();
				}
				if (oos != null) {
					oos.close();
				}
				if (baos != null) {
					baos.close();
				}
				DatabaseUtil.releaseConnection(con);
			}
		}
		return updateStatus;
	}

	public UserContext retriveSessionInfo(String sessionId) throws SQLException {
		ObjectInputStream oip = null;
		PreparedStatement stmt = null;
		InputStream is = null;
		UserContext user = null;
		Connection con = null;
		ResultSet rs = null;
		if (sessionId != null && !sessionId.isEmpty()) {
			con = DatabaseUtil.getConnection();
			String sqlStatement = "select * from NGBO_USER_SESSION where session_id= ?";

			try {
				stmt = con.prepareStatement(sqlStatement);
				stmt.setString(1, sessionId);
				rs = stmt.executeQuery();
				while (rs.next()) {
					is = rs.getBlob("user_info").getBinaryStream();
					oip = new ObjectInputStream(is);
					user = (UserContext) oip.readObject();
				}
			} catch (SQLException e) {
				LOGGER.error(e);
			} catch (Exception e) {
				LOGGER.error(e);
			} finally {
				if (null != rs) {
					rs.close();
				}
				if (stmt != null)
					stmt.close();
				DatabaseUtil.releaseConnection(con);
			}
		}
		if(user!=null && user.getUserId()!=null && user.getUserId()!=null){
			removeSessionInfo(sessionId);
		}
		return user;
	}
	
	public void removeSessionInfo(String sessionId) throws SQLException {
		PreparedStatement stmt = null;
		Connection con = null;
		int rs= 0;
		if (sessionId != null && !sessionId.isEmpty()) {
			con = DatabaseUtil.getConnection();
			String sqlStatement = "delete from NGBO_USER_SESSION where session_id= ?";

			try {
				stmt = con.prepareStatement(sqlStatement);
				stmt.setString(1, sessionId);
				rs = stmt.executeUpdate();
				if (rs >0 ) {
					LOGGER.error("Session record deleted");
				}
			} catch (SQLException e) {
				LOGGER.error(e);
			} catch (Exception e) {
				LOGGER.error(e);
			} finally {
				if (stmt != null)
					stmt.close();
				DatabaseUtil.releaseConnection(con);
			}
		}
	}
}