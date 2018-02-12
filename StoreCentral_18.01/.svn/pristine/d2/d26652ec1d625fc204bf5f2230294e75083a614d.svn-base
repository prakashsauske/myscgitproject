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
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserPreferences;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class UserPreferenceDAOImpl {
	
	private static final Logger log = Logger.getLogger(UserPreferenceDAOImpl.class
			.getName());

	private static String profileId = "Y";

	public static String updateUserPreferences(UserPreferencesParam param,
			String[] userSelectedPreferences) throws Exception {

		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("updateUserPreferences start time --- " + startTime);
		
		Connection con = DatabaseUtil.getConnection();
		int result  = 1;
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.DESCRIPTION  from USER_PREFERENCES uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
		String Platform="BROWSER";
		if(param.getPlatform()==null || param.getPlatform().equalsIgnoreCase(Constants.BROWSER)){
			Platform="BROWSER";
		}else{
			Platform="MOBILE";
		}
		String updateStatement = "UPDATE "+Constants.USER_PREFERENCES+" SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE+"'" 
				+ " where USER_ID=? and ROLE_ID=? AND "+Platform+"='"+profileId+"' ";
		
		String deleteStatement = "UPDATE SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , PRIORITY =? , ISACTIVE = '"+Constants.ACTIVE+"'" //modified for defect 6358
				+ " where USER_ID=? and ROLE_ID=? AND "+Platform+"='"+profileId+"' ";
		
		String mergeStatement = "MERGE INTO "+Constants.USER_PREFERENCES+" usrpref "
				+" USING ( select ? USER_ID  from dual) d"
				+" on (usrpref.USER_ID = d.USER_ID and ROLE_ID=? AND "+Platform+"='"+profileId+"' and usrpref.FUNCTION_CODE = ? and usrpref.SALES_ORG = ? ) "
				+" WHEN MATCHED THEN "
				+ deleteStatement
				+" WHEN NOT MATCHED THEN "
				+" INSERT (FUNCTION_CODE,PRIORITY,USER_ID,"+Platform+",ROLE_ID,SALES_ORG) "
				+" VALUES (?,?,?,'"+profileId+"',?,?)";
		
		StringBuffer insertStatement = new StringBuffer();
	/*	if (userSelectedPreferences != null
				&& userSelectedPreferences.length > 0
				&& !userSelectedPreferences.toString().trim().equals("")
				&& !userSelectedPreferences[0].trim().equals("")) {
			insertStatement.append("INSERT ALL ");
			for (int i = 1; i <= userSelectedPreferences.length; i++) {
				insertStatement
				.append(" INTO "
						+ Constants.USER_PREFERENCES
						+ " (FUNCTION_CODE,PRIORITY,USER_ID,"+Platform+",ROLE_ID,SALES_ORG) VALUES ('"
						+ userSelectedPreferences[i - 1] + "'," + i
						+ ",'" + param.getUserId() + "','" + profileId
						+ "','" + param.getRoleId() + "','"
						+ param.getSaleOrg() + "')");
			}
			insertStatement.append(" SELECT * FROM dual");
		}*/
		PreparedStatement stmt = null;
		
		log.info("query generated --- "+mergeStatement);
		try {
			
			stmt = con.prepareStatement(updateStatement);
			stmt.setObject(1, param.getUserId());
			stmt.setObject(2, param.getRoleId());
			result = stmt.executeUpdate();
			
			if(stmt != null)
				stmt.close();

			stmt = con.prepareStatement(mergeStatement);
			
			if (userSelectedPreferences != null
					&& userSelectedPreferences.length > 0
					&& !userSelectedPreferences.toString().trim().equals("")
					&& !userSelectedPreferences[0].trim().equals("")) {
				for (int i = 1; i <= userSelectedPreferences.length; i++) {
					stmt.setObject(1, param.getUserId());
					stmt.setObject(2, param.getRoleId());
					stmt.setObject(3, userSelectedPreferences[i - 1]);
					stmt.setObject(4, param.getSaleOrg());
					stmt.setObject(5, i);// defect 6358
					stmt.setObject(6, param.getUserId());
					stmt.setObject(7, param.getRoleId());
					stmt.setObject(8, userSelectedPreferences[i - 1]);
					stmt.setObject(9, i);
					stmt.setObject(10, param.getUserId());
					stmt.setObject(11, param.getRoleId());
					stmt.setObject(12, param.getSaleOrg());
					
					result = stmt.executeUpdate();
				}
				}
			else
			{
				log.info(" No user preference selected ");
			}
			// stmt.setString(2, param.getUserPreferencesSize());

			// log.info("result" + result);
			// if (result != 0) {
		/*	if (!insertStatement.toString().equals("")) {
				log.info("query generated --- "+insertStatement.toString());
				stmt = con.prepareStatement(insertStatement.toString());

				result = stmt.executeUpdate();
				// log.info("result" + result);
				
				if (result != 0) {
					return "true";
				} else {
					return "Technical issue occurred. Please contact support";
				}
			} else {
				return "true";
			}*/
			// }
			
			if (result != 0) {
				return "true";
			} else {
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
			endTime = System.currentTimeMillis();
			log.info("updateUserPreferences end time --- " + endTime);
			log.info("total taken time--- " + (endTime - startTime));
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		// return "Technical issue occurred. Please contact support";
	}
	
	public static ArrayList<String> getUserAllSalesOrg(String userId) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<String> saleOrgs = null;
		
		String sqlStatement = "select * from "+Constants.NGBO_SALES_ORG;
		String sqlUserSalesOrgQry="select distinct nus.sales_org,SO.sales_org_name from "+Constants.NGBO_USR_SITE+" nus,sales_org so where nus.sales_org=so.sales_org and lower(NUS.USR_ID)=lower('"+userId+"') ";
		PreparedStatement stmt = null;
		try {
			if(userId.equalsIgnoreCase(Constants.ALL)){
				stmt = con.prepareStatement(sqlStatement);
			}else{
				stmt = con.prepareStatement(sqlUserSalesOrgQry);
			}
			
			/*
			 * stmt.setString(1, salesOrg);
			 * 
			 * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				saleOrgs = new ArrayList<String>();
				while (rs.next()) {
					saleOrgs.add(rs.getString(1)+"-"+
							rs.getString(2));
				}
				CommonUtils.convertObjectTojson(saleOrgs);
				return saleOrgs;
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
	
	public static ArrayList<Department> getUserPrimaryDepartments(String userId, String site) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet result=null;
		ArrayList<Department> depList=new ArrayList<Department>(); 
		String selectQry = "select DISTINCT dept_ID,dept_name from " + Constants.NGBO_PRIMARY_DPT
				+ " where USR_ID=? and site=? and  ISACTIVE = '"+Constants.ACTIVE+"'";		
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(selectQry);
			stmt.setString(1, userId);
			stmt.setString(2, site);
			result = stmt.executeQuery();
			if(null!=result){
				while(result.next()){
					Department dpt=new Department();
					dpt.setNode(result.getString("dept_id"));
					dpt.setNodeDesc(result.getString("dept_name"));
					depList.add(dpt);
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		} finally {
			if(null!=result) result.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}
		return depList;
	}

	public static Map<String, UserPreferences> getUserPreferences(
			UserPreferencesParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, UserPreferences> userPreferences = null;
		String sqlStatement = buildQueryForUserPreferences(param);

		log.info("user preference query:" + sqlStatement);
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			// stmt.setString(1, param.getUserId());
			stmt.setString(1, param.getSaleOrg());
			stmt.setString(2, param.getUserId());
			stmt.setString(3, param.getRoleId());

			stmt.setString(4, param.getSaleOrg());
			stmt.setString(5, param.getRoleId());
			stmt.setString(6, param.getSiteNo());
			stmt.setString(7, param.getSaleOrg());
			stmt.setString(8, param.getRoleId());
			stmt.setString(9, param.getSaleOrg());
			stmt.setString(10, param.getRoleId());
			stmt.setString(11, param.getSiteNo());
			stmt.setString(12, param.getSaleOrg());
			stmt.setString(13, param.getRoleId());
			stmt.setString(14, param.getSiteNo());
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userPreferences = new LinkedHashMap<String, UserPreferences>();
				while (rs.next()) {

					userPreferences.put(
							rs.getString("FUNCTION_CODE"),
							new UserPreferences("", "", rs
									.getString("FUNCTION_CODE"), rs
									.getString("SCREEN_DESC"), "", rs
									.getString("URL"), rs
									.getString("ICON_NAME")));
				}

				return userPreferences;
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

	public static Map<String, UserPreferences> getDefaultPreferences(
			UserPreferencesParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, UserPreferences> userPreferences = null;

		String sqlStatement = buildQueryForDefaultPreference(param);

		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, param.getSaleOrg());
			stmt.setString(2, param.getSaleOrg());
			stmt.setString(3, param.getRoleId());
			stmt.setString(4, param.getSiteNo());
			stmt.setString(5, param.getSaleOrg());
			stmt.setString(6, param.getRoleId());
			stmt.setString(7, param.getSaleOrg());
			stmt.setString(8, param.getRoleId());
			stmt.setString(9, param.getSiteNo());
			stmt.setString(10, param.getSaleOrg());
			stmt.setString(11, param.getRoleId());
			stmt.setString(12, param.getSiteNo());
			// stmt.setString(5, param.getSaleOrg());

			/*
			 * stmt.setString(1, param.getSiteNo()); stmt.setString(2,
			 * param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userPreferences = new LinkedHashMap<String, UserPreferences>();
				int i = 0;
				while (rs.next() && i < 6) {

					userPreferences.put(
							rs.getString("FUNCTION_CODE"),
							new UserPreferences("", "", rs
									.getString("FUNCTION_CODE"), rs
									.getString("SCREEN_DESC"), "", rs
									.getString("URL"), rs
									.getString("ICON_NAME")));
					i++;
				}
				return userPreferences;
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

		return userPreferences;
	}

	public static ArrayList<String> getMenuBarOptions(String salesOrg)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<String> menuBarOptions = null;

		String sqlStatement = "select * from "
				+ Constants.SALES_ORG_EXEC_MENU_FNC + " where sales_org_no=?";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, salesOrg);
			/*
			 * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				menuBarOptions = new ArrayList<String>();
				while (rs.next()) {
					menuBarOptions.add(rs.getString("EXCL_MENU_FN_ID"));

				}

				return menuBarOptions;
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

	public static Map<String, ArrayList<UserPreferences>> getHomeShortcutFunction(
			UserPreferencesParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<UserPreferences>> userPreferencesMap = null;
		Map<String, UserPreferences> userPreferencesForUrl = null;
		ArrayList<UserPreferences> userPreferencesList = null;
		UserPreferences userPreferences = null;
		String sqlStatement = buildQueryAllPreference(param);

		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);

			stmt.setString(1, param.getSaleOrg());
			stmt.setString(2, param.getRoleId());
			stmt.setString(3, param.getSiteNo());
			stmt.setString(4, param.getSaleOrg());
			stmt.setString(5, param.getRoleId());
			stmt.setString(6, param.getSaleOrg());
			stmt.setString(7, param.getRoleId());
			stmt.setString(8, param.getSiteNo());
			stmt.setString(9, param.getSaleOrg());
			stmt.setString(10, param.getRoleId());
			stmt.setString(11, param.getSiteNo());

			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userPreferencesMap = new LinkedHashMap<String, ArrayList<UserPreferences>>();
				userPreferencesForUrl = new LinkedHashMap<String, UserPreferences>();
				// int i = 0;
				while (rs.next()) {
					if (userPreferencesMap.containsKey(rs
							.getString("ROOT_CODE"))) {
						userPreferencesList = userPreferencesMap.get(rs
								.getString("ROOT_CODE"));
						userPreferences = new UserPreferences(
								rs.getString("ROOT_CODE"),
								rs.getString("ROOT_DESC"),
								rs.getString("FUNCTION_CODE"),
								rs.getString("SCREEN_DESC"), "",
								rs.getString("URL"), rs.getString("ICON_NAME"));
						userPreferencesList.add(userPreferences);

					} else {
						userPreferencesList = new ArrayList<UserPreferences>();
						userPreferences = new UserPreferences(
								rs.getString("ROOT_CODE"),
								rs.getString("ROOT_DESC"),
								rs.getString("FUNCTION_CODE"),
								rs.getString("SCREEN_DESC"), "",
								rs.getString("URL"), rs.getString("ICON_NAME"));
						userPreferencesList.add(userPreferences);
					}
					userPreferencesForUrl.put(rs.getString("FUNCTION_CODE"),
							userPreferences);
					userPreferencesMap.put(rs.getString("ROOT_CODE"),
							userPreferencesList);
				}
				if (userPreferencesForUrl != null
						&& userPreferencesForUrl.size() > 0)
					param.setUserPreferencesURLMap(userPreferencesForUrl);

				return userPreferencesMap;
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

		return userPreferencesMap;

	}

	private static String buildQueryForDefaultPreference(UserPreferencesParam param) {

		StringBuffer select = null;
		StringBuffer from = null;
		StringBuffer where = null;
		String query = "";
		StringBuffer exclude_criteria=null;
		exclude_criteria=new StringBuffer("AND function_code not IN " +
				"( SELECT FUNCTION_CODE FROM NGBO_FUNCTION_EXCLUDE  " +
				"WHERE SALES_ORG           = ?    " +
				"AND ROLE_ID              IN (?)    " +
				"AND access_level         IN ("+Constants.ACCESS_LEVEL_3+")    " +
				"AND store                IN (?)    " +
				"AND include_exclude_flag IN ('E')  " +
				"AND ISACTIVE =1  )");
		
		select = new StringBuffer(
				" select mas.*, mas.FUNCTION_DESC screen_desc, SM.ROOT_CODE,  SM1.FUNC_DESC ROOT_DESC ");
		from = new StringBuffer(" FROM ");
		if(param.getPlatform()==null || param.getPlatform().equalsIgnoreCase(Constants.BROWSER)){
			from.append(" ( select DEFAULT_SHORT.*  from "
					+ Constants.DEFAULT_SHORTCUTS
					+ " DEFAULT_SHORT where SALES_ORG = ? and DEFAULT_SHORT.browser='Y' AND function_code  in   ("
					+ buildQueryForIncludedFunction(param) + ") "+exclude_criteria+") SC  ");
		}else{
			from.append(" ( select DEFAULT_SHORT.*  from "
					+ Constants.DEFAULT_SHORTCUTS
					+ " DEFAULT_SHORT where SALES_ORG = ? and DEFAULT_SHORT.mobile='Y'  AND function_code  in   ("
					+ buildQueryForIncludedFunction(param) + ") "+exclude_criteria+") SC  ");
		}
		
		where = new StringBuffer(" JOIN " + Constants.SCREEN_FUNCTION_MASTER
				+ " SM ON (SM.FUNCTION_CODE=SC.function_code  and sm.platform <> 'RF') JOIN "
				+ Constants.SCREEN_FUNCTION_MASTER
				+ " SM1	ON (SM1.FUNCTION_CODE=SM.root_code and sm1.platform <> 'RF') ");
		where.append(" JOIN " + Constants.SHORTCUT_MASTER
				+ " mas ON (mas.FUNCTION_CODE=SC.function_code)  ");
		
		if(param.getPlatform() == null || param.getPlatform().equalsIgnoreCase(Constants.BROWSER)){
			where.append(" where mas.browser='Y' ");
		}else{
			where.append(" where mas.mobile='Y' ");
		}

		query = select.append(from).append(where).toString();
		log.info(" buildQueryForDefaultPreference query _" + query);
		return query;
	}

	private static String buildQueryAllPreference(UserPreferencesParam param) {

		StringBuffer select = null;
		StringBuffer from = null;
		StringBuffer where = null;
		String query = "";
		select = new StringBuffer(
				" select SC.*, SC.FUNCTION_DESC screen_desc, SM.ROOT_CODE,  SM1.FUNC_DESC ROOT_DESC ");
		from = new StringBuffer(" FROM ");
		if(param.getPlatform()==null || param.getPlatform().equalsIgnoreCase(Constants.BROWSER)){
			from.append(" (select shortcut_mas.*  from "
					+ Constants.SHORTCUT_MASTER
					+ " shortcut_mas where shortcut_mas.browser='Y' and " +
					"function_code  in  ("
					+ buildQueryForIncludedFunction(param) + ") )  SC ");
		}else{
			from.append(" (select shortcut_mas.*  from "
					+ Constants.SHORTCUT_MASTER
					+ " shortcut_mas where shortcut_mas.mobile='Y' and " +
					"function_code  in  ("
					+ buildQueryForIncludedFunction(param) + ") )  SC ");
		}
		
		where = new StringBuffer(" JOIN " + Constants.SCREEN_FUNCTION_MASTER
				+ " SM ON (SM.FUNCTION_CODE=SC.function_code  and sm.platform <> 'RF') JOIN "
				+ Constants.SCREEN_FUNCTION_MASTER
				+ " SM1	ON (SM1.FUNCTION_CODE=SM.root_code  and sm1.platform <> 'RF') "
				+ " where SC.FUNCTION_CODE NOT IN "
				+ " (SELECT FUNCTION_CODE "
				+ " FROM NGBO_FUNCTION_EXCLUDE "
				+ " WHERE SALES_ORG           = ? "
				+ " AND ROLE_ID              IN (?) "
				+ " AND access_level         IN ('" + Constants.ACCESS_LEVEL_3
						+ "') "
				+ " AND include_exclude_flag IN ('E','R') "
				+ " AND store                 =? "
				+ " AND ISACTIVE              =1 ) " );

		query = select.append(from).append(where).toString();
		log.info(" buildQueryForDefaultPreference query _" + query);
		return query;
	}

	private static String buildQueryForUserPreferences(UserPreferencesParam param) {

		StringBuffer select = null;
		StringBuffer from = null;
		StringBuffer where = null;
		String query = "";
		
		StringBuffer exclude_criteria=null;
		exclude_criteria=new StringBuffer("AND user_pref.function_code not IN " +
				"( SELECT FUNCTION_CODE FROM NGBO_FUNCTION_EXCLUDE  " +
				"WHERE SALES_ORG           = ?    " +
				"AND ROLE_ID              IN (?)    " +
				"AND access_level         IN ("+Constants.ACCESS_LEVEL_3+")    " +
				"AND store                IN (?)    " +
				"AND include_exclude_flag IN ('E')  " +
				"AND ISACTIVE =1  )");
		
		select = new StringBuffer(
				" SELECT user_pref.sales_org,user_pref.priority,shortcut_mas.function_code,shortcut_mas.function_desc screen_desc,shortcut_mas.icon_name,shortcut_mas.url ");
		// .append(" user_pref.sales_org,user_pref.priority,shortcut_mas.function_code, screen_mas.screen_desc,shortcut_mas.icon_name,shortcut_mas.url ");
		from = new StringBuffer(" FROM " + Constants.USER_PREFERENCES
				+ " user_pref," + Constants.SCREEN_FUNCTION_MASTER
				+ " screen_mas," + Constants.SHORTCUT_MASTER + " shortcut_mas ");
		where = new StringBuffer(
				" where user_pref.function_code = screen_mas.FUNCTION_CODE	and user_pref.function_code = shortcut_mas.function_code ")
				// 1.sales ord
				// 2.user id
				// 3.role id
				.append(" AND user_pref.sales_org =? ")
				.append(" AND user_pref.user_id =? ")
				.append(" AND user_pref.role_id =? ")
				.append(" AND user_pref.ISACTIVE = "+Constants.ACTIVE)
				.append(" AND user_pref.priority IS NOT NULL AND user_pref.priority <= '"
						+ Constants.USER_PREF_SIZE + "' ")
				.append(" and user_pref.function_code in ("
						+ buildQueryForIncludedFunction(param) + ") ")
						.append(exclude_criteria);
		if(param.getPlatform()==null || param.getPlatform().equalsIgnoreCase(Constants.BROWSER)){
			where.append(" AND user_pref.BROWSER = '" + Constants.USER_PROF_ID +"' and shortcut_mas.BROWSER='"+Constants.USER_PROF_ID+"' "
						+ " ORDER BY user_pref.priority ");
		}else{
			where.append(" AND user_pref.MOBILE = '" + Constants.USER_PROF_ID+"' and shortcut_mas.MOBILE='"+Constants.USER_PROF_ID+"' "
					+ " ORDER BY user_pref.priority ");
		}

		query = select.append(from).append(where).toString();

		log.info("Query for user preferences_" + query);
		return query;

	}

	private static String buildQueryForIncludedFunction(UserPreferencesParam param) {

		String query = "";
		StringBuffer select_level3 = null;
		StringBuffer from_level3 = null;
		StringBuffer where_level3 = null;

		StringBuffer select_level2 = null;
		StringBuffer from_level2 = null;
		StringBuffer where_level2 = null;
		
		
		
		
		
		select_level3 = new StringBuffer(" ( SELECT FUNCTION_CODE  ");
		from_level3 = new StringBuffer(" FROM NGBO_FUNCTION_EXCLUDE ");
		where_level3 = new StringBuffer(" WHERE SALES_ORG = ? ")
				.append(" AND ROLE_ID  IN (?) ")
				.append(" AND access_level IN ('" + Constants.ACCESS_LEVEL_3
						+ "') ").append(" AND include_exclude_flag in ('I') ")
				.append(" and store=? " +
						"AND ISACTIVE =1 ) ").append(" UNION ");

		select_level2 = new StringBuffer(" ( SELECT FUNCTION_CODE ");
		from_level2 = new StringBuffer("  FROM NGBO_FUNCTION_EXCLUDE ");
		where_level2 = new StringBuffer(" WHERE SALES_ORG   = ? ")
				.append(" AND ROLE_ID  IN (?) ")
				.append(" AND access_level  IN ('" + Constants.ACCESS_LEVEL_2
						+ "') ")
				.append(" AND ISACTIVE =1 and FUNCTION_CODE not in ( SELECT FUNCTION_CODE ")
				.append(" FROM NGBO_FUNCTION_EXCLUDE ")
				.append(" WHERE SALES_ORG = ? ")
				.append(" AND ROLE_ID  IN (?) ")
				.append(" AND access_level  IN ('" + Constants.ACCESS_LEVEL_3
						+ "') ").append(" and store not in (?) " +
								"AND ISACTIVE =1 ")
				.append(" AND include_exclude_flag in ('I') ) )");

		query = select_level3.append(from_level3).append(where_level3)
				.append(select_level2).append(from_level2).append(where_level2)
				.toString();
		log.info("inner query for user preference" + query);
		return query;
	}

	public static String updateUserPrimaryDepartments(String[] toDeleteList,
			String[] toAddList, UserContext user,Logger logger) throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("updateUserPrimaryDepartments start time --- " + startTime);
		
		Connection con=null;
		PreparedStatement stmt=null;
		try{

		con = DatabaseUtil.getConnection();
		stmt=null;
		String deleteQry="UPDATE  "+Constants.NGBO_PRIMARY_DPT+" SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE+"' WHERE LOWER(USR_ID)=lower('"+user.getUserId()+"') and site='"+user.getSiteNo()+"' ";
		
		if(toDeleteList!=null && toDeleteList.length>0)
		{
			deleteQry+=" and dept_id in ( '"+toDeleteList[0].split("-")[0]+"'";
			for(int i=0;i<toDeleteList.length;i++){
				deleteQry+=",'"+toDeleteList[i].split("-")[0]+"'";
			}
			deleteQry+=")";
			
			log.info("query generated --- "+deleteQry);
			try {
				stmt=con.prepareStatement(deleteQry);
				stmt.executeUpdate();
			} catch (SQLException e) {
				if(null!=stmt) stmt.close();
				DatabaseUtil.releaseConnection(con);//con.close();
				e.printStackTrace();
				logger.error("Stack Trace :", e);
				return Constants.FALSE;
			}
		}
		
		
		
		if(toAddList!=null && toAddList.length>0)
		{
			String insertQry="MERGE INTO "+Constants.NGBO_PRIMARY_DPT+" dept "
					+" USING ( select '"+user.getUserId()+"' usr_id  from dual) d "
					+" on (dept.usr_id = d.usr_id and dept.site='"+user.getSiteNo()+"' and dept.dept_id = ? )"
					+" WHEN MATCHED THEN "
					+" UPDATE SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.ACTIVE+"' WHERE LOWER(USR_ID)=lower('"+user.getUserId()+"') and dept_id = ? and site='"+user.getSiteNo()+"' "
					+" WHEN NOT MATCHED THEN "
					+" INSERT (USR_ID,DEPT_ID,LAST_CREATED_USER,LAST_CREATED_DATE,SITE,DEPT_NAME) "
					+" VALUES ('"+user.getUserId()+"',?,'"+user.getUserId()+"',sysdate,'"+user.getSiteNo()+"',?)";
			/*for(int i=0;i<toAddList.length;i++){
				insertQry+="into "+Constants.NGBO_PRIMARY_DPT+" (USR_ID,DEPT_ID,LAST_CREATED_USER,LAST_CREATED_DATE,SITE,DEPT_NAME) values ('"+user.getUserId()+"','"+toAddList[i].split("-")[0]+"','"+user.getUserId()+"',sysdate,'"+user.getSiteNo()+"','"+toAddList[i].split("-")[1]+"') ";
			}
			insertQry+=" select 1 FROM DUAL";*/
			
			log.info("query generated --- "+insertQry);
			try {
				stmt=con.prepareStatement(insertQry);
				for(int i=0;i<toAddList.length;i++){
					
					stmt.setObject(1, toAddList[i].split("-")[0]);
					stmt.setObject(2, toAddList[i].split("-")[0]);
					stmt.setObject(3, toAddList[i].split("-")[0]);
					stmt.setObject(4, toAddList[i].split("-")[1]);
					
					stmt.executeUpdate();
				}
				
			} catch (SQLException e) {
				if(null!=stmt) stmt.close();
				if(null!=con) DatabaseUtil.releaseConnection(con);//con.close();
				logger.error("Stack Trace :", e);
				e.printStackTrace();
				return Constants.FALSE;
			}
		}	
		}catch(Exception e){
			
		}finally{
			if(null!=stmt) stmt.close();
			if(null!=con) DatabaseUtil.releaseConnection(con);//con.close();
		}
		
		endTime = System.currentTimeMillis();
		log.info("updateUserPrimaryDepartments end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return Constants.TRUE;
	}
}
