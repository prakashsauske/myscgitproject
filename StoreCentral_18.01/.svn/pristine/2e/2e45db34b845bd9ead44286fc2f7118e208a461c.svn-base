package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.ActivityOptions;
import au.com.woolworths.portal.model.BroadcastMessage;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xgsaa
 * 
 */
public class UserAccessDAOImpl {
	
	private static final Logger log = Logger.getLogger(UserAccessDAOImpl.class
			.getName());

	public static Map<String, ArrayList<ActivityOptions>> getUserFunctionAccess(
			UserContext userContext, boolean flag) throws Exception {
		
		log.info(" getSalesOrgExcludeDetail inside ");
		Map<String, ArrayList<ActivityOptions>> activityOptionsMap = null;
		ArrayList<ActivityOptions> activityOptionsList = null;
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		PreparedStatement stmt = null;
		String query = "";
		if (flag) {
			query = buildQueryForUserAccess(userContext);
		} else {
			query = buildQueryForUserAccessRemoved(userContext);
		}
		log.info("getSalesOrgExcludeDetailquery : User acces : "
				+ query);
		try {

			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			if (rs != null) {
				activityOptionsMap = new LinkedHashMap<String, ArrayList<ActivityOptions>>();
				while (rs.next()) {
					if (rs.getString("FUNCTION_CODE") != null)
						if (activityOptionsMap.containsKey(rs
								.getString("FUNCTION_CODE"))) {
							activityOptionsList = activityOptionsMap.get(rs
									.getString("FUNCTION_CODE"));
							activityOptionsList.add(new ActivityOptions(rs
									.getString("FUNCTION_CODE"), "", rs
									.getString("ACCESS_FLAG"), "", rs
									.getString("ACCESS_FLAG"), "", rs
									.getString("INCLUDE_EXCLUDE_FLAG"), "", "",
									"", "", ""));
						} else {
							activityOptionsList = new ArrayList<ActivityOptions>();
							activityOptionsList.add(new ActivityOptions(rs
									.getString("FUNCTION_CODE"), "", rs
									.getString("ACCESS_FLAG"), "", rs
									.getString("ACCESS_FLAG"), "", rs
									.getString("INCLUDE_EXCLUDE_FLAG"), "", "",
									"", "", ""));
						}
					activityOptionsMap.put(rs.getString("FUNCTION_CODE"),
							activityOptionsList);
				}
				log.info(" getSalesOrgExcludeDetail outside ");
				return activityOptionsMap;
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
		log.info(" getSalesOrgExcludeDetail outside ");
		return null;
	}

	private static String buildQueryForUserAccess(UserContext userContext) {
		String query = "";
		StringBuffer level1Select = null;
		StringBuffer level1From = null;

		StringBuffer level2Select = null;
		StringBuffer level2From = null;
		StringBuffer level2Where = null;

		StringBuffer level3Select = null;
		StringBuffer level3From = null;
		StringBuffer level3Where = null;
		
		StringBuffer level4Select = null;
		StringBuffer level4From = null;
		StringBuffer level4Where = null;

		level1Select = new StringBuffer("  ");
		level1From = new StringBuffer(
				" ( SELECT ngbo_funct.function_code,ngbo_funct.access_flag,ngbo_funct.include_exclude_flag ")
				.append(" FROM " + Constants.NGBO_FUNCTION_EXCLUDE
						+ " ngbo_funct ")
				.append(" WHERE sales_org   ='" + userContext.getSalesOrg()
						+ "' ")
				.append(" AND access_level  ='" + Constants.ACCESS_LEVEL_2
						+ "' ")
				.append(" AND role_id       ='" + userContext.getRoleID()
						//changed for central cache sync issue
						+ "'  AND isactive  = '1' AND function_code NOT IN (")
				.append(" SELECT ngbo_funct3.function_code  FROM NGBO_FUNCTION_EXCLUDE ngbo_funct3 ")
				.append(" WHERE ngbo_funct3.access_level ='"
						+ Constants.ACCESS_LEVEL_3 + "' ")
				.append(" AND ngbo_funct3.sales_org='"
						+ userContext.getSalesOrg() + "' ")
				.append(" AND ngbo_funct3.role_id ='" + userContext.getRoleID()
						+ "' ")
						// changed for centra cache sync issue
				.append(" AND ngbo_funct3.include_exclude_flag='I' and isactive = '1' ")
				.append(" ) ").append(" ) ").append(" UNION ");

		level2Select = new StringBuffer(
				" (SELECT ngbo_funct2.function_code,ngbo_funct2.access_flag,ngbo_funct2.include_exclude_flag ");
		level2From = new StringBuffer(" FROM "
				+ Constants.NGBO_FUNCTION_EXCLUDE + " ngbo_funct2 ");
		level2Where = new StringBuffer(" WHERE ngbo_funct2.access_level='"
				+ Constants.ACCESS_LEVEL_2 + "' AND ngbo_funct2.sales_org ='"
				+ userContext.getSalesOrg() + "' ")
				.append(" AND ngbo_funct2.role_id='" + userContext.getRoleID()
						+ "'   AND isactive  = '1'  AND ngbo_funct2.function_code IN ")
				.append(" (SELECT ngbo_funct3.function_code FROM NGBO_FUNCTION_EXCLUDE ngbo_funct3 ")
				.append(" WHERE ngbo_funct3.access_level ='"
						+ Constants.ACCESS_LEVEL_3 + "' ")
				.append(" AND ngbo_funct3.sales_org ='"
						+ userContext.getSalesOrg() + "' ")
				.append(" AND ngbo_funct3.role_id ='" + userContext.getRoleID()
						+ "' ")
				.append(" AND ngbo_funct3.store ='" + userContext.getSiteNo()
						// changed for centra cache sync issue
						+ "' AND ngbo_funct3.include_exclude_flag='I'  and isactive = '1') ")
				.append(" ) ").append(" UNION ");

		level3Select = new StringBuffer(
				" (SELECT ngbo_funct3.function_code,ngbo_funct3.access_flag,ngbo_funct3.include_exclude_flag ");
		level3From = new StringBuffer(" FROM "
				+ Constants.NGBO_FUNCTION_EXCLUDE + " ngbo_funct3 ");
		level3Where = new StringBuffer(" WHERE ngbo_funct3.access_level='"
				+ Constants.ACCESS_LEVEL_3 + "' AND ngbo_funct3.sales_org ='"
				+ userContext.getSalesOrg() + "' ")
				.append(" AND ngbo_funct3.role_id='" + userContext.getRoleID()
						+ "' AND ngbo_funct3.store='" + userContext.getSiteNo()
						// changed for centra cache sync issue
						+ "'  and isactive = '1' ) ").append(" UNION ");
		
		level4Select = new StringBuffer(
				" (SELECT ngbo_funct4.functn_code,null,null ");
		level4From = new StringBuffer(" FROM "
				+ Constants.NGBO_USER_EXCEPTION_TBL + " ngbo_funct4 ");
		level4Where = new StringBuffer(" WHERE ")
				.append("ngbo_funct4.usr_id='" + userContext.getUserId()
						+ "' AND ngbo_funct4.site_id='" + userContext.getSiteNo()
						+ "' ) ");

		query = level1Select.append(level1From).append(level2Select)
				.append(level2From).append(level2Where).append(level3Select)
				.append(level3From).append(level3Where).append(level4Select)
				.append(level4From).append(level4Where).toString();
		log.info(" user access query " + query);
		return query;
	}

	private static String buildQueryForUserAccessRemoved(UserContext userContext) {
		String query = "";
		StringBuffer level1Select = null;
		StringBuffer level1From = null;

		level1Select = new StringBuffer(
				" SELECT function_code,'' access_flag,'R' AS include_exclude_flag ");
		level1From = new StringBuffer(" FROM NGBO_SCREEN_FUNCTION_MASTER ")
				.append(" WHERE root_code IS NOT NULL and ISACTIVE = '1' ").append(
						" AND function_code NOT IN ("
								+ userContext.getFunctionCodeList() + ") ");
		query = level1Select.append(level1From).toString();

		log.info(" user access query removed" + query);
		return query;
	}
	/*
	 * public static Map<String, UserAccess> getUserFunctionAccess( UserContext
	 * userContext) throws Exception {
	 * 
	 * Connection con = LoginDao.getConnection(); ResultSet rs = null;
	 * Map<String, UserAccess> userAccessMap = null; // String sqlStatement = //
	 * "select * from MENU_MASTER m where m.CODE not in (select excl_menu_fn_id  from SALES_ORG_EXCL_MENU_FN  where sales_org_no=?)"
	 * ;
	 * 
	 * String sqlStatement = //
	 * "SELECT sfm.function_code,sfm.screen_code FROM screen_function_master sfm minus  "
	 * //+
	 * "  SELECT common_result.function_code, common_result.screen_code  FROM("
	 * //+ "  ("+
	 * "SELECT rpf.function_code, rpf.sales_org, rpf.screen_code FROM MANAGE_BANNER_FUNC rpf "
	 * + "  WHERE rpf.sales_org   ='" + userContext.getSalesOrg() +
	 * "' union  SELECT rpf1.function_code," +
	 * "  rpf1.sales_org,rpf1.screen_code  FROM role_profile_detaill rpf1  WHERE rpf1.role_code = '"
	 * + userContext.getRoleID() + "'" + "  AND rpf1.sales_org   ='" +
	 * userContext.getSalesOrg() + "' "; //+ " )) common_result ";
	 * 
	 * //log.info("userAccess__" + sqlStatement); PreparedStatement
	 * stmt = null; try {
	 * 
	 * stmt = con.prepareStatement(sqlStatement);
	 * 
	 * rs = stmt.executeQuery(); if (rs != null) { // rs.next(); userAccessMap =
	 * new LinkedHashMap<String, UserAccess>(); while (rs.next()) {
	 * 
	 * userAccessMap.put( rs.getString("FUNCTION_CODE"), new
	 * UserAccess(rs.getString("SCREEN_CODE"), rs .getString("FUNCTION_CODE"),
	 * "")); //log.info("menuBarOptions.size()" //+
	 * userAccessMap.size()); }
	 * 
	 * return userAccessMap; } } catch (SQLException e) { // TODO Auto-generated
	 * catch block e.printStackTrace(); return null; } catch (Exception e) {
	 * e.printStackTrace(); return null; } finally { if (rs != null) rs.close();
	 * if (stmt != null) stmt.close(); if (con != null) con.close(); }
	 * 
	 * return null; }
	 */

	public static boolean updateAcknowledgement(String user_id,String broadcast_id) throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("updateAcknowledgement start time --- " + startTime);
		
		int inserCount=0,updateCount=0;
		Connection con=null;
		PreparedStatement ps=null;
		String updateQry="UPDATE BC_ACKNOWLEDGE_INFO SET IS_ACKNOWLEDGED='Y' WHERE BC_DETAILS_ID=? AND USER_ID=?";
		String insertQry="INSERT into BC_ACKNOWLEDGE_INFO(ID,IS_ACKNOWLEDGED,IS_READED,BC_DETAILS_ID,USER_ID) values(bc_ack_info_seq.nextVal,'Y','Y',?,?)";
		log.info("query generated --- "+updateQry);
		try{
			con=DatabaseUtil.getConnection();
			ps=con.prepareStatement(updateQry);				
			ps.setInt(1, Integer.parseInt(broadcast_id));
			ps.setString(2, user_id);
			updateCount=ps.executeUpdate();
			if(updateCount==0){
				log.info("query generated --- "+insertQry);
				ps=con.prepareStatement(insertQry);		
				ps.setInt(1, Integer.parseInt(broadcast_id));
				ps.setString(2, user_id);				
				inserCount=ps.executeUpdate();
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(null!=ps) ps.close();
			DatabaseUtil.releaseConnection(con);
		}
		endTime = System.currentTimeMillis();
		log.info("updateAcknowledgement end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		if(inserCount>0 || updateCount>0) return true;		
		return false;
	}
	
	public static ArrayList<BroadcastMessage> getBroadcastMessages(
			UserContext userContext) throws SQLException {
		ArrayList<BroadcastMessage> res=new ArrayList<BroadcastMessage>();
		String qry=buildQuerytoGetBroadcastMessage(userContext);
		Connection con=null;
		PreparedStatement ps=null;
		ResultSet rs=null;
		
		try{
			con=DatabaseUtil.getConnection();
			ps=con.prepareStatement(qry);
//			ps.setString(1, userContext.getUserId().toLowerCase());
//			ps.setString(2, userContext.getUserId().toLowerCase());
			ps.setString(1, userContext.getSiteNo());
			ps.setString(2, userContext.getRoleID());
			ps.setString(3, String.valueOf(userContext.getSalesOrg()));
			ps.setString(4, userContext.getUserId().toLowerCase());
			ps.setString(5, Constants.isAdminUser(userContext.getRoleID())?Constants.NONE:userContext.getSiteNo());
			rs=ps.executeQuery();
			while(rs!=null && rs.next()){
//				if(!(null!=rs.getString("is_Ack") && rs.getString("is_Ack").equalsIgnoreCase("Y"))){
					BroadcastMessage bm=new BroadcastMessage();
					bm.setMessageId(rs.getString("ID"));
					bm.setMessage(rs.getString("message"));
					bm.setIsAck(rs.getString("IS_READED"));
					bm.setIsReaded(rs.getString("IS_READED"));
					bm.setIsAckReq(rs.getString("ACKNOWLEGEMNET"));
					res.add(bm);
//				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(null!=rs) rs.close();
			if(null!=ps) ps.close();
			DatabaseUtil.releaseConnection(con);
		}
		
		return res;
	}
	
	private static String buildQuerytoGetBroadcastMessage(UserContext userContext){
		StringBuffer  varname1 = new StringBuffer();
		varname1.append("SELECT DISTINCT mas.*,ACK.IS_READED ");
//		varname1.append("  CASE ");
//		varname1.append("    WHEN LOWER(ack.user_id) =? ");
//		varname1.append("    AND ACK.IS_ACKNOWLEDGED ='Y' ");
//		varname1.append("    THEN 'Y' ");
//		varname1.append("    ELSE 'N' ");
//		varname1.append("  END AS is_ack, ");
//		varname1.append("  CASE ");
//		varname1.append("    WHEN ack.user_id =? ");
//		varname1.append("    AND ACK.IS_READED='Y' ");
//		varname1.append("    THEN 'Y' ");
//		varname1.append("    ELSE 'N' ");
//		varname1.append("  END AS is_readed, ");
//		varname1.append("  CASE ");
//		varname1.append("    WHEN MAS.ACKNOWLEGEMNET = 'Y' ");
//		varname1.append("    THEN ");
//		varname1.append("      CASE ");
//		varname1.append("        WHEN MAS.MAX_ACK_REQUIRED<>-1 ");
//		varname1.append("        THEN ");
//		varname1.append("          CASE ");
//		varname1.append("            WHEN MAS.MAX_ACK_REQUIRED<ackcount.TOTAL ");
//		varname1.append("            THEN 'N' ");
//		varname1.append("            ELSE 'Y' ");
//		varname1.append("          END ");
//		varname1.append("        ELSE 'N' ");
//		varname1.append("      END ");
//		varname1.append("    ELSE 'NA' ");
//		varname1.append("  END AS REACHED_LIMIT ");
		varname1.append("FROM BROADCAST_DETAILS mas, ");
		varname1.append("  BC_DETAILS_DEPTS dept, ");
		varname1.append("  BC_DETAILS_ROLES rol, ");
		varname1.append("  BC_DETAILS_STORES stores, ");
		varname1.append("  (select * from bc_acknowledge_info where lower(user_id)='"+userContext.getUserId().toLowerCase()+"') ack ");
//		varname1.append("  (SELECT COUNT(tmp.id) TOTAL, ");
//		varname1.append("    tmp.BC_DETAILS_ID ");
//		varname1.append("  FROM BC_ACKNOWLEDGE_INFO tmp ");
//		varname1.append("  GROUP BY tmp.BC_DETAILS_ID ");
//		varname1.append("  ) ackcount ");
		varname1.append("WHERE MAS.ID =DEPT.BC_DETAILS_ID(+) ");
		varname1.append("AND MAS.ID   =ROL.BC_DETAILS_ID(+) ");
		varname1.append("AND MAS.ID   =STORES.BC_DETAILS_ID(+) ");
		varname1.append("AND MAS.ID   =ACK.BC_DETAILS_ID (+) ");
//		varname1.append("AND MAS.ID   = ackcount.BC_DETAILS_ID (+) ");
		varname1.append("AND SYSDATE BETWEEN MAS.ACTIVE_FROM AND MAS.ACTIVE_TO ");
		varname1.append("AND ");
		varname1.append("  CASE ");
		varname1.append("    WHEN MAS.SALES_ORG='All' ");
		varname1.append("    THEN 'TRUE' ");
		varname1.append("    ELSE ");
		varname1.append("      CASE ");
		varname1.append("        WHEN MAS.STORE_OR_REGION ='S' ");
		varname1.append("        THEN ");
		varname1.append("          CASE ");
		varname1.append("            WHEN STORES.STORE_OR_REGION=? ");
		varname1.append("            THEN 'TRUE' ");
		varname1.append("            ELSE 'FALSE' ");
		varname1.append("          END ");
		varname1.append("        ELSE ");
		varname1.append("      		CASE ");
		varname1.append("        		WHEN MAS.STORE_OR_REGION ='R' THEN");
		varname1.append("          			CASE ");
		varname1.append("            			WHEN STORES.STORE_OR_REGION in (SELECT DISTINCT sm.REGION FROM "+Constants.NGBO_SITEMASTER+" sm WHERE sm.SITE='"+userContext.getSiteNo()+"')");
		varname1.append("            			THEN 'TRUE' ");
		varname1.append("            		ELSE 'FALSE' ");
		varname1.append("          		END ");
		varname1.append("            ELSE 'TRUE' ");
		varname1.append("          END ");
		varname1.append("      END ");
		varname1.append("  END='TRUE' ");
		varname1.append("AND ");
		varname1.append("  CASE ");
		varname1.append("    WHEN MAS.SALES_ORG='All' ");
		varname1.append("    THEN 'TRUE' ");
		varname1.append("    ELSE ");
		varname1.append("      CASE ");
		varname1.append("        WHEN ROL.ROLE_ID=? ");
		varname1.append("        THEN 'TRUE' ");
		varname1.append("        ELSE 'FALSE' ");
		varname1.append("      END ");
		varname1.append("  END='TRUE' ");
		varname1.append("AND ");
		varname1.append("  CASE ");
		varname1.append("    WHEN MAS.SALES_ORG='All' ");
		varname1.append("    THEN 'TRUE' ");
		varname1.append("    ELSE ");
		varname1.append("      CASE ");
		varname1.append("        WHEN MAS.SALES_ORG=? ");
		varname1.append("        THEN 'TRUE' ");
		varname1.append("        ELSE 'FALSE' ");
		varname1.append("      END ");
		varname1.append("  END='TRUE' ");
		varname1.append("AND ");
		varname1.append("  CASE ");
		varname1.append("    WHEN MAS.SALES_ORG='All' ");
		varname1.append("    THEN 'TRUE' ");
		varname1.append("    ELSE ");
		varname1.append("      CASE ");
		varname1.append("        WHEN DEPT.PRIMARY_DEPT IN ");
		varname1.append("          (SELECT DEPT_ID ");
		varname1.append("          FROM USR_PRIMARY_DEPTS ");
		varname1.append("          WHERE LOWER(USR_ID)=? ");
		varname1.append("          AND SITE           =?  AND ISACTIVE=1");
		varname1.append("          ) ");
		varname1.append("        THEN 'TRUE' ");
		varname1.append("        ELSE 'FALSE' ");
		varname1.append("      END ");
		varname1.append("  END='TRUE'");
		varname1.append("  order by mas.updated_ts desc ");
		log.info(varname1);
		return varname1.toString();
	}
}
