package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.Map;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.UserManagementParam;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class UserMgtDAOImpl {

	//static SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	// static Date currDate = new Date(); //static Date currDate = new Date();

	public static ArrayList<UserSiteDtl> getUserSiteDtls(
			UserPreferencesParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<UserSiteDtl> userSiteDtlList = null;

		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "select US.USR_NM,USD.USR_ID,USD.SITE_ID,USD.DEPT,USD.ROLE_ID,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE,"
				+ " to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,RP.ROLE_DESC from  USR_SITE_DTL USD,ROLE_PROFILE RP,USR US  WHERE USD.SITE_ID='"
				+ param.getSiteNo()
				+ "' AND USD.USR_ID!='"
				+ param.getUserId()
				+ "' AND RP.ROLE_CODE=USD.ROLE_ID"
				+ " AND USD.USR_ID=US.USR_ID ";

		sqlStatement += " and usd.role_id not in (" + Constants.getAdminUsers()
				+ ") ";
		sqlStatement += " and us.usr_id not in ( SELECT usd.usr_id FROM USR_SITE_DTL USD WHERE USD.SITE_ID !='"
				+ param.getSiteNo()
				+ "' "
				+ " AND USD.USR_ID!  ='"
				+ param.getUserId()
				+ "' and usd.actv_end_date >= trunc(sysdate) ) ";*/
		
		String sqlStatement = "select US.USR_NM,USD.USR_ID,USD.STORE_COST_CENTRE_ID,USD.DEPT,USD.SC_ROLE,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE,"
				+ " to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,RP.ROLE_DESC, to_char(us.last_loggedin_time,'dd/mm/yyyy hh:mm') LAST_LOGGEDIN_TIME from " + Constants.NGBO_USR_SITE + " USD,ROLE_PROFILE RP," + Constants.NGBO_USR + " US  WHERE USD.STORE_COST_CENTRE_ID='"
				+ param.getSiteNo()
				+ "' AND USD.USR_ID!='"
				+ param.getUserId()
				+ "' AND RP.ROLE_CODE=USD.SC_ROLE"
				+ " AND USD.USR_ID=US.USR_ID ";

		sqlStatement += " and usd.SC_ROLE not in (" + Constants.getAdminUsers()
				+ ") ";
		sqlStatement += " and us.usr_id not in ( SELECT usd.usr_id FROM " + Constants.NGBO_USR_SITE + " USD WHERE USD.STORE_COST_CENTRE_ID !='"
				+ param.getSiteNo()
				+ "' "
				+ " AND USD.USR_ID!  ='"
				+ param.getUserId()
				+ "' and usd.actv_end_date >= trunc(sysdate)) AND (ROUND(MONTHS_BETWEEN(sysdate, usd.actv_end_date),0) < 12) " 
				+ " order by to_date(ACTV_END_DATE,'dd/mm/yyyy') desc,us.usr_nm, us.last_loggedin_time";
		
		System.out.println("sqlStatement_" + sqlStatement);
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
		
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			if (rs != null) {
				userSiteDtlList = new ArrayList<UserSiteDtl>();
				while (rs.next()) {

					userSiteDtlList.add(new UserSiteDtl(
							rs.getString("USR_ID"),
							rs.getString("USR_NM"), 
							//rs.getString("SITE_ID"), 
							rs.getString("STORE_COST_CENTRE_ID"),
							//rs.getString("ROLE_ID"), 
							rs.getString("SC_ROLE"),
							rs.getString("ROLE_DESC"), 
							rs.getString("ACTV_START_DATE"), 
							rs.getString("ACTV_END_DATE"),
							getActiveFlag(rs.getString("ACTV_END_DATE")), 
							rs.getString("DEPT"), "", "", "", rs.getString("LAST_LOGGEDIN_TIME")));
					// System.out.println("userSiteDtlList.size()"
					// + userSiteDtlList);
				}

				return userSiteDtlList;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return null;
	}

	public static Map<String, ArrayList<UserSiteDtl>> verifyUser(
			AQMSearchQueryParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<UserSiteDtl>> userDetail = null;
		ArrayList<UserSiteDtl> userSiteDtlList = null;

		// SELECT DISTINCT usr.usr_id,
		// usr.usr_nm ,
		// RP.ROLE_CODE,
		// RP.ROLE_DESC ,
		// USD.SITE_ID,
		// sm.site_name,
		// usd.sales_org,
		// usr.div_id as DEFAULT_SALES_ORG,
		// sa.description,
		// TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date
		// FROM usr
		// LEFT OUTER JOIN ngbo_idm_role_map ng
		// ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <>
		// 'ITS' OR ng.ngbo_role<> 'SS'))
		// LEFT OUTER JOIN USR_SITE_DTL USD
		// ON (usr.usr_id=USD.USR_ID
		// AND AND ( to_date(sysdate,'dd-mm-yyyy') between
		// to_date(usd.actv_start_date,'dd-mm-yyyy') and
		// to_date(usd.actv_end_date,'dd-mm-yyyy')) ) "
		// LEFT OUTER JOIN sales_org sa
		// ON (sa.no=USD.sales_org OR sa.no= usr.div_id)
		// LEFT OUTER JOIN ROLE_PROFILE RP
		// ON (USD.ROLE_ID =RP.ROLE_CODE)
		// LEFT OUTER JOIN SITE_MASTER sm
		// ON (USD.SITE_ID = sm.site OR usr.loc_value_id=sm.site)
		// WHERE (usr.usr_id ='smith'
		// OR usr.usr_nm ='smith'
		// OR upper(usr.usr_nm) LIKE upper('smith%')
		// OR UPPER(usr.usr_id) LIKE upper('smith%'))
		// AND usr.deleted_date IS NULL
		// AND usr.locked_date IS NULL
		// AND USR.DIV_ID='1005';
		// My change
		// "SELECT DISTINCT usr.usr_id, usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,usr.DIV_ID,USD.SITE_ID FROM usr "

		// SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC ,
		// '' SITE_ID,'' SALES_ORG,usr.loc_value_id as DEFAULT_SITE, usr.div_id
		// as DEFAULT_SALES_ORG, sm.site_name, sa.description, ' '
		// actv_end_date,'N' LINKED_FLAG
		// FROM usr
		// LEFT OUTER JOIN ngbo_idm_role_map ng ON (upper(usr.role_id)=
		// upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<>
		// 'SS'))
		// LEFT OUTER JOIN sales_org sa ON (sa.no= usr.div_id)
		// LEFT OUTER JOIN ROLE_PROFILE RP ON (ng.ngbo_role =RP.ROLE_CODE)
		// LEFT OUTER JOIN SITE_MASTER sm ON (usr.LOC_VALUE_ID = sm.site)
		// WHERE (usr.usr_id ='perftest18'
		// OR usr.usr_nm ='perftest18'
		// OR upper(usr.usr_nm) LIKE upper('perftest18%')
		// OR UPPER(usr.usr_id) LIKE upper('perftest18%'))
		// AND usr.deleted_date IS NULL
		// AND usr.locked_date IS NULL
		// AND usr.USR_ID NOT IN (select USR_ID from USR_SITE_DTL usd where
		// usr.usr_id=USD.USR_ID
		// AND to_date(sysdate,'dd-mm-yyyy') between
		// to_date(usd.actv_start_date,'dd-mm-yyyy') and
		// to_date(usd.actv_end_date,'dd-mm-yyyy'))
		// AND USR.DIV_ID='1010'
		//
		// UNION
		//
		// SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC ,
		// usd.site_id as SITE_ID, usd.sales_org as SALES_ORG, usr.loc_value_id
		// as DEFAULT_SITE, usr.div_id as DEFAULT_SALES_ORG,sm.site_name,
		// sa.description, TO_CHAR(usd.actv_end_date,'dd/mm/yyyy')
		// actv_end_date, 'Y' AS LINKED_FLAG
		// FROM usr
		// LEFT OUTER JOIN ngbo_idm_role_map ng ON (upper(usr.role_id)=
		// upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<>
		// 'SS'))
		// JOIN USR_SITE_DTL USD ON (usr.usr_id=USD.USR_ID AND
		// to_date(sysdate,'dd-mm-yyyy') between
		// to_date(usd.actv_start_date,'dd-mm-yyyy') and
		// to_date(usd.actv_end_date,'dd-mm-yyyy') )
		// LEFT OUTER JOIN sales_org sa ON (sa.no=USD.sales_org)
		// LEFT OUTER JOIN ROLE_PROFILE RP ON (USD.ROLE_ID =RP.ROLE_CODE)
		// LEFT OUTER JOIN SITE_MASTER sm ON (USD.SITE_ID = sm.site)
		// WHERE (usr.usr_id ='perftest18'
		// OR usr.usr_nm ='perftest18'
		// OR upper(usr.usr_nm) LIKE upper('perftest18%')
		// OR UPPER(usr.usr_id) LIKE upper('perftest18%'))
		// AND usr.deleted_date IS NULL
		// AND usr.locked_date IS NULL
		// AND USR.DIV_ID='1010' AND USD.SALES_ORG='1010'

		// String sqlStatement =
		// "SELECT DISTINCT usr.usr_id,usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,USD.SITE_ID,sm.site_name,usd.sales_org,usr.div_id as DEFAULT_SALES_ORG,sa.description,TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date"
		// +" FROM usr"
		// +" LEFT OUTER JOIN ngbo_idm_role_map ng ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS'))"
		// +" LEFT OUTER JOIN USR_SITE_DTL USD	ON (usr.usr_id=USD.USR_ID  AND ( to_date(sysdate,'dd-mm-yyyy') between to_date(usd.actv_start_date,'dd-mm-yyyy') and to_date(usd.actv_end_date,'dd-mm-yyyy')) ) "
		// +" LEFT OUTER JOIN sales_org sa		ON (sa.no=USD.sales_org OR sa.no= usr.div_id)"
		// +" LEFT OUTER JOIN ROLE_PROFILE RP		ON (USD.ROLE_ID   =RP.ROLE_CODE)"
		// +" LEFT OUTER JOIN SITE_MASTER sm    ON (USD.SITE_ID = sm.site OR usr.loc_value_id=sm.site)"
		// +" WHERE (usr.usr_id =?		OR usr.usr_nm     =?		OR upper(usr.usr_nm) LIKE upper(?)		OR UPPER(usr.usr_id) LIKE upper(?))		AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL  AND USR.DIV_ID=? ";

		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , '' SITE_ID,'' SALES_ORG,usr.loc_value_id as DEFAULT_SITE,  usr.div_id as DEFAULT_SALES_ORG,  sm.site_name,  sa.description, ' ' actv_end_date, 'N' AS LINKED_FLAG  "
				+ " FROM usr "
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng	ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.no= usr.div_id) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP 		ON (ng.ngbo_role   =RP.ROLE_CODE) "
				+ "  LEFT OUTER JOIN SITE_MASTER sm  ON (usr.LOC_VALUE_ID = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm=? OR upper(usr.usr_nm) LIKE upper(?) OR UPPER(usr.usr_id) LIKE upper(?)) AND usr.deleted_date IS NULL	AND usr.locked_date  IS NULL "
				+ " AND usr.USR_ID NOT IN (select USR_ID from USR_SITE_DTL usd where usr.usr_id=USD.USR_ID AND trunc(actv_end_date) > trunc(sysdate))  AND USR.DIV_ID=? "
				+ " UNION "
				+ " SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , usd.site_id as SITE_ID, usd.sales_org as SALES_ORG, usr.loc_value_id as DEFAULT_SITE,  usr.div_id as DEFAULT_SALES_ORG,sm.site_name,  sa.description,  TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date, 'Y' AS LINKED_FLAG  "
				+ " FROM usr"
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng		ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " JOIN USR_SITE_DTL USD		ON (usr.usr_id=USD.USR_ID	AND	trunc(actv_end_date) > trunc(sysdate)) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.no=USD.sales_org) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP		ON (USD.ROLE_ID   =RP.ROLE_CODE) "
				+ " LEFT OUTER JOIN SITE_MASTER sm  ON (USD.SITE_ID = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm =? OR upper(usr.usr_nm) LIKE upper(?)	OR UPPER(usr.usr_id) LIKE upper(?))	AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL AND USR.DIV_ID=? AND USD.SALES_ORG=?"*/;

		String sqlStatement = "SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , '' SITE_ID,'' SALES_ORG,usr.location_id as DEFAULT_SITE,  usr.sales_org_no as DEFAULT_SALES_ORG,  sm.site_name,  sa.description, ' ' actv_end_date, 'N' AS LINKED_FLAG  "
				+ " FROM " + Constants.NGBO_USR + " usr "
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng	ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.no= usr.sales_org_no) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP 		ON (ng.ngbo_role   =RP.ROLE_CODE) "
				+ "  LEFT OUTER JOIN SITE_MASTER sm  ON (usr.location_id = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm=? OR upper(usr.usr_nm) LIKE upper(?) OR UPPER(usr.usr_id) LIKE upper(?)) AND usr.deleted_date IS NULL	AND usr.locked_date  IS NULL "
				+ " AND usr.USR_ID NOT IN (select USR_ID from " + Constants.NGBO_USR_SITE + " usd where usr.usr_id=USD.USR_ID AND trunc(actv_end_date) > trunc(sysdate))  AND USR.sales_org_no=? "
				+ " UNION "
				+ " SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , usd.STORE_COST_CENTRE_ID as SITE_ID, usd.sales_org as SALES_ORG, usr.location_id as DEFAULT_SITE,  usr.sales_org_no as DEFAULT_SALES_ORG,sm.site_name,  sa.description,  TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date, 'Y' AS LINKED_FLAG  "
				+ " FROM " + Constants.NGBO_USR + " usr "
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng		ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " JOIN " + Constants.NGBO_USR_SITE + " USD		ON (usr.usr_id=USD.USR_ID	AND	trunc(actv_end_date) > trunc(sysdate)) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.no=USD.sales_org) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP		ON (USD.SC_ROLE   =RP.ROLE_CODE) "
				+ " LEFT OUTER JOIN SITE_MASTER sm  ON (USD.STORE_COST_CENTRE_ID = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm =? OR upper(usr.usr_nm) LIKE upper(?)	OR UPPER(usr.usr_id) LIKE upper(?))	AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL AND USR.sales_org_no=? AND USD.SALES_ORG=?";

			
		System.out.println("sqlStatement_" + sqlStatement);
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
		
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			// stmt.setString(1, param.getSiteNo());
			// Following fields are for validations in first sub query - usr
			// table query.
			stmt.setString(1, param.getSubmitBy());
			stmt.setString(2, param.getSubmitBy());
			stmt.setString(3, "%" + param.getSubmitBy() + "%");
			stmt.setString(4, "%" + param.getSubmitBy() + "%");
			stmt.setString(5, param.getSalesOrg());

			// Following fields are for validations in second sub query - user
			// site detail table query.
			stmt.setString(6, param.getSubmitBy());
			stmt.setString(7, param.getSubmitBy());
			stmt.setString(8, "%" + param.getSubmitBy() + "%");
			stmt.setString(9, "%" + param.getSubmitBy() + "%");
			stmt.setString(10, param.getSalesOrg());
			stmt.setString(11, param.getSalesOrg());
			// stmt.setString(6, param.getSalesOrg());
			// stmt.setString(5, param.getMsg());
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userDetail = new HashMap<String, ArrayList<UserSiteDtl>>();
				while (rs.next()) {

					if (rs.getString("usr_id") != null) {
						if (userDetail.containsKey(rs.getString("usr_id"))) {
							userSiteDtlList = userDetail.get(rs
									.getString("usr_id"));
							System.out.println("rs.getString(\"site_name\")"
									+ rs.getString("site_name"));
							userSiteDtlList
									.add(new UserSiteDtl(
											rs.getString("usr_id"),
											rs.getString("usr_nm"),
											rs.getString("SITE_ID"),
											rs.getString("ROLE_CODE"),
											rs.getString("ROLE_DESC"),
											"",
											"",
											getActiveFlag(rs
													.getString("ACTV_END_DATE")),
											"", (rs.getString("sales_org")), rs
													.getString("site_name"), rs
													.getString("description"),
											rs.getString("DEFAULT_SITE"),
											rs.getString("DEFAULT_SALES_ORG"),
											rs.getString("LINKED_FLAG")));
							// My change
							// rs.getString("DIV_ID")));
						} else {
							userSiteDtlList = new ArrayList<UserSiteDtl>();
							userSiteDtlList
									.add(new UserSiteDtl(
											rs.getString("usr_id"),
											rs.getString("usr_nm"),
											rs.getString("SITE_ID"),
											rs.getString("ROLE_CODE"),
											rs.getString("ROLE_DESC"),
											"",
											"",
											getActiveFlag(rs
													.getString("ACTV_END_DATE")),
											"", rs.getString("sales_org"), rs
													.getString("site_name"), rs
													.getString("description"),
											rs.getString("DEFAULT_SITE"),
											rs.getString("DEFAULT_SALES_ORG"),
											rs.getString("LINKED_FLAG")));
							// My change
							// rs.getString("DIV_ID")));
						}
						userDetail.put(rs.getString("usr_id"), userSiteDtlList);
						// System.out.println("menuBarOptions.size()"
						// + userDetail.size());
					}
				}
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return userDetail;
	}

	public static boolean creatUser(UserManagementParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result = 0;

		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "insert into usr_site_dtl (USR_ID,SITE_ID,ROLE_ID,ACTV_START_DATE,ACTV_END_DATE,SALES_ORG,DEPT,LAST_CREATED_USER) values "
				+ " (?,?,?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),?,?,?)";*/
				
		String sqlStatement = "insert into " + Constants.NGBO_USR_SITE + " (USR_ID,STORE_COST_CENTRE_ID,SC_ROLE,ACTV_START_DATE,ACTV_END_DATE,SALES_ORG,LAST_CREATED_USER) values "
				+ " (?,?,?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),?,?,?)";

		PreparedStatement stmt = null;
		try {

			/*String deleteStmt = " delete from usr_site_dtl where USR_ID = '"
					+ param.getUserId().split("-")[0].trim() + "' "
					+ " and SITE_ID = '" + param.getSiteNo() + "' ";*/
			
			String deleteStmt = " delete from " + Constants.NGBO_USR_SITE + " where USR_ID = '"
					+ param.getUserId().split("-")[0].trim() + "' "
					+ " and STORE_COST_CENTRE_ID = '" + param.getSiteNo() + "' ";
			
			/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
			
			/*
			 * + "' and SITE_ID = '" + param.getSiteNo() + "' and ROLE_ID = '" +
			 * param.getRoleId() + "' ";
			 */

			System.out
					.println(" delete statement user management" + deleteStmt);
			
			System.out
			.println(" Create User Insert statement user management" + sqlStatement);

			stmt = con.prepareStatement(deleteStmt);
			result = stmt.executeUpdate();

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, param.getUserId().split("-")[0].trim());
			stmt.setString(2, param.getSiteNo());
			stmt.setString(3, param.getRoleId());
			stmt.setString(4, param.getDateFrom());
			stmt.setString(5, param.getDateTo());
			stmt.setString(6, param.getSaleOrg());
//			stmt.setString(7, (param.getDept() != null && !param.getDept()
//					.equalsIgnoreCase(Constants.SELECT)) ? param.getDept() : "");
			stmt.setString(7, param.getCreatedUserId());
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return false;
	}

	public static boolean updateUser(UserManagementParam param, String userId)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "insert into usr_site_dtl ( ROLE_ID,ACTV_START_DATE,ACTV_END_DATE,DEPT,LAST_UPDATED_DATE,LAST_UPDATED_USER,LAST_CREATED_DATE,LAST_CREATED_USER,USR_ID,SITE_ID,SALES_ORG) ";
		sqlStatement += " values (?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),?,sysdate,'"
				+ userId
				+ "',sysdate,'"
				+ userId
				+ "',?,?,"
				+ param.getSaleOrg() + ") ";*/
		
		String sqlStatement = "insert into " + Constants.NGBO_USR_SITE + " ( SC_ROLE,ACTV_START_DATE,ACTV_END_DATE,DEPT,LAST_UPDATED_DATE,LAST_UPDATED_USER,LAST_CREATED_DATE,LAST_CREATED_USER,USR_ID,STORE_COST_CENTRE_ID,SALES_ORG) ";
		sqlStatement += " values (?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),?,sysdate,'"
				+ userId
				+ "',sysdate,'"
				+ userId
				+ "',?,?,"
				+ param.getSaleOrg() + ") ";
		
		PreparedStatement stmt = null;
		try {

			/*String deleteStmt = " delete from usr_site_dtl where USR_ID = '"
					+ param.getUserId().split("-")[0].trim() + "' "
					+ " and SITE_ID = '" + param.getSiteNo() + "'";*/
			
			String deleteStmt = " delete from " + Constants.NGBO_USR_SITE + " where USR_ID = '"
					+ param.getUserId().split("-")[0].trim() + "' "
					+ " and STORE_COST_CENTRE_ID = '" + param.getSiteNo() + "'";
			
			/*
			 * + "' and SITE_ID = '" + param.getSiteNo() + "' and ROLE_ID = '" +
			 * param.getRoleId() + "' ";
			 */
			
			/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
			
			System.out
					.println(" delete statement user management" + deleteStmt);

			System.out
			.println(" Update user statement user management" + sqlStatement);
			
			stmt = con.prepareStatement(deleteStmt);
			result = stmt.executeUpdate();
			//con.commit();
			
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, param.getRoleId());
			stmt.setString(2, param.getDateFrom());
			stmt.setString(3, param.getDateTo());
//			stmt.setString(4, (param.getDept() != null && !param.getDept()
//					.equalsIgnoreCase(Constants.SELECT)) ? param.getDept() : "");
			stmt.setString(5, param.getUserId());
			stmt.setString(6, param.getSiteNo());
			//stmt.setString(7, param.getUserId());

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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return false;
	}

	public static boolean deActivateUser(UserManagementParam param)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		// ResultSet rs=null;

		Calendar cal = Calendar.getInstance();
		cal.setTime(new Date());
		cal.add(Calendar.DATE, -1);
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "update USR_SITE_DTL USD set USD.ACTV_END_DATE=to_date('"
				+ df.format(cal.getTime())
				+ "','dd/mm/yyyy') where USD.USR_ID='"
				+ param.getUserId()
				+ "' and site_id='" + param.getSiteNo() + "'";*/
		
		String sqlStatement = "update " + Constants.NGBO_USR_SITE + " USD set USD.ACTV_END_DATE=to_date('"
				+ df.format(cal.getTime())
				+ "','dd/mm/yyyy') where USD.USR_ID='"
				+ param.getUserId()
				+ "' and STORE_COST_CENTRE_ID='" + param.getSiteNo() + "'";
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */

		PreparedStatement stmt = null;
		System.out.println("sqlStatement__" + sqlStatement);
		try {

			stmt = con.prepareStatement(sqlStatement);
			// stmt.setString(1, df.format(cal.getTime()));
			// stmt.setString(2, param.getUserId());
			// stmt.setString(3, param.getSiteNo());
			// stmt.setString(3, param.getRoleId());
			// stmt.setString(4, param.getDateFrom());
			// stmt.setString(5, param.getDateTo());
			// rs=stmt.executeQuery();
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return false;
	}

	private static String getActiveFlag(String date) {
		String flag = "N";
		Date endDate = null;
		Date currDate = new Date(); //static Date currDate = new Date();
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		if (date == null) {
			return flag;
		}
		try {
			endDate = df.parse(date);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
		if (endDate != null && endDate.compareTo(currDate) > 0) {
			flag = "Y";
		} else
			flag = "N";
		return flag;

	}

	public static String updatePwd(String userId, String newPassword)
			throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int rs = 0;
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "update usr us "
				+ " set us.PASSWORD = ?  where us.usr_id = ?";*/
		
		String sqlStatement = "update " + Constants.NGBO_USR + " us "
				+ " set us.PASSWORD = ?  where us.usr_id = ?";
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
		
		PreparedStatement stmt = null;
		newPassword = PwdEncryptDecryptService.encrypt(newPassword);
		if (newPassword == null) {
			return "false";
		}
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, newPassword);
			// stmt.setString(2, passwordExpiryDate);
			stmt.setString(2, userId);
			rs = stmt.executeUpdate();
			if (rs > 0) {
				// rs.next();
				return "";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return "false";
	}

	public static Map<String, ArrayList<UserSiteDtl>> getUserDtl(
			AQMSearchQueryParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<UserSiteDtl>> userDetail = null;
		ArrayList<UserSiteDtl> userSiteDtlList = null;

		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "SELECT DISTINCT usr.usr_id, usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,"
				+ " usr.DIV_ID,USD.SITE_ID,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE, "
				+ " to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,USD.SALES_ORG, "
				+ " to_char(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE,USD.DEPT, "
				+ " USD.LAST_CREATED_USER,to_char(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE,USD.LAST_UPDATED_USER,"
				+ " sal.DESCRIPTION sales_org_name,sm.site_name FROM  usr JOIN USR_SITE_DTL USD on (usr.usr_id=USD.USR_ID ) join "
				+ " ROLE_PROFILE RP on (USD.ROLE_ID=RP.ROLE_CODE) LEFT OUTER JOIN site_master sm  ON sm.site =USD.site_id left outer join sales_org sal on USD.SALES_ORG=sal.no "
				+ " where usr.usr_id =?  and USD.site_id=? ";*/
		
		String sqlStatement = "SELECT DISTINCT usr.usr_id, usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,"
				+ " usr.SALES_ORG_NO,USD.STORE_COST_CENTRE_ID,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE, "
				+ " to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,USD.SALES_ORG, "
				+ " to_char(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE,USD.DEPT, "
				+ " USD.LAST_CREATED_USER,to_char(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE,USD.LAST_UPDATED_USER,"
				+ " sal.DESCRIPTION sales_org_name,sm.site_name FROM " + Constants.NGBO_USR + " usr JOIN " + Constants.NGBO_USR_SITE + " USD on (usr.usr_id=USD.USR_ID ) join "
				+ " ROLE_PROFILE RP on (USD.SC_ROLE=RP.ROLE_CODE) LEFT OUTER JOIN site_master sm  ON sm.site =USD.STORE_COST_CENTRE_ID left outer join sales_org sal on USD.SALES_ORG=sal.no "
				+ " where usr.usr_id =?  and USD.STORE_COST_CENTRE_ID=? ";

		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
		System.out.println("sqlStatement_" + sqlStatement);
		
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, param.getSubmitBy());
			stmt.setString(2, param.getSiteNo());

			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userDetail = new HashMap<String, ArrayList<UserSiteDtl>>();
				while (rs.next()) {

					if (rs.getString("usr_id") != null) {
						if (userDetail.containsKey(rs.getString("usr_id"))) {
							userSiteDtlList = userDetail.get(rs
									.getString("usr_id"));
							userSiteDtlList
									.add(new UserSiteDtl(
											rs.getString("usr_id"),
											rs.getString("usr_nm"),
											//rs.getString("SITE_ID"),
											rs.getString("STORE_COST_CENTRE_ID"),
											rs.getString("ROLE_CODE"),
											rs.getString("ROLE_DESC"),
											rs.getString("ACTV_START_DATE"),
											rs.getString("ACTV_END_DATE"),
											getActiveFlag(rs
													.getString("ACTV_END_DATE")),
											rs.getString("DEPT"), rs
													.getString("SALES_ORG"),
											rs.getString("sales_org_name"),
											rs.getString("LAST_CREATED_USER"),
											rs.getString("LAST_UPDATED_USER"),
											rs.getString("LAST_CREATED_DATE"),
											rs.getString("LAST_UPDATED_DATE"),
											rs.getString("site_name"), ""));
						} else {
							userSiteDtlList = new ArrayList<UserSiteDtl>();
							userSiteDtlList
									.add(new UserSiteDtl(
											rs.getString("usr_id"),
											rs.getString("usr_nm"),
											//rs.getString("SITE_ID"),
											rs.getString("STORE_COST_CENTRE_ID"),
											rs.getString("ROLE_CODE"),
											rs.getString("ROLE_DESC"),
											rs.getString("ACTV_START_DATE"),
											rs.getString("ACTV_END_DATE"),
											getActiveFlag(rs
													.getString("ACTV_END_DATE")),
											rs.getString("DEPT"), rs
													.getString("SALES_ORG"),
											rs.getString("sales_org_name"),
											rs.getString("LAST_CREATED_USER"),
											rs.getString("LAST_UPDATED_USER"),
											rs.getString("LAST_CREATED_DATE"),
											rs.getString("LAST_UPDATED_DATE"),
											rs.getString("site_name"), ""));
						}
						userDetail.put(rs.getString("usr_id"), userSiteDtlList);
						// System.out.println("menuBarOptions.size()"
						// + userDetail.size());
					}
				}
				
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return userDetail;
	}

	public static ArrayList<String> getUsrFuncExc(String siteId, String userId)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<String> salesOrgExcludeMap = null;

		String sqlStatement = "select * from USER_EXCEPTION_TBL where usr_id=?  and site_id=? ";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			stmt.setString(2, siteId);
			/*
			 * stmt.setString(1, salesOrg);
			 * 
			 * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				salesOrgExcludeMap = new ArrayList<String>();
				// ArrayList<String> salesOrgExcludeList = null;
				while (rs.next()) {

					if (rs.getString("FUNCTN_CODE") != null)
						salesOrgExcludeMap.add(rs.getString("FUNCTN_CODE"));
				}

				return salesOrgExcludeMap;
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return null;
	}

	public static String updateUserFuncSettings(String userId, String siteId,
			String[] userSelectedPreferences) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result;
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.DESCRIPTION  from USR_SHORTCUT_FCTN uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
		String deleteStatement = "delete from USER_EXCEPTION_TBL s where s.usr_id=? and s.site_id=? ";
		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ALL ");
		for (int i = 0; i < userSelectedPreferences.length; i++) {
			insertStatement
					.append("INTO USER_EXCEPTION_TBL (usr_id,site_id,FUNCTN_CODE) "
							+ " VALUES ('"
							+ userId
							+ "',"
							+ "'"
							+ siteId
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[1] + "')");
		}
		insertStatement.append(" SELECT * FROM dual");

		// System.out.println("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, userId);
			stmt.setString(2, siteId);

			result = stmt.executeUpdate();
			// System.out.println("result" + result);
			// if (result != 0) {
			if (!(userSelectedPreferences != null
					&& userSelectedPreferences.length > 0 && userSelectedPreferences[0]
						.split(":")[1].trim().equalsIgnoreCase("empty"))) {
				stmt = con.prepareStatement(insertStatement.toString());
				result = stmt.executeUpdate();
			} else {
				result = 1;
			}
			// System.out.println("result" + result);
			if (result != 0) {
				return "true";
			}
			// }
			else {
				return "Technical issue occurred. Please contact support";
			}
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "Technical issue occurred. Please contact support";
		} catch (Exception e) {
			e.printStackTrace();
			return "Technical issue occurred. Please contact support";
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		// return "Technical issue occurred. Please contact support";
	}

}
