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
public class NotificationDAOImpl {

	private static String profileId = "Y";

	public static String updateUserPreferences(UserPreferencesParam param,
			String[] userSelectedPreferences) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result;
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.DESCRIPTION  from USER_PREFERENCES uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
		String Platform="BROWSER";
		if(param.getPlatform()==null || param.getPlatform().equalsIgnoreCase(Constants.BROWSER)){
			Platform="BROWSER";
		}else{
			Platform="MOBILE";
		}
		String deleteStatement = "delete from " + Constants.USER_PREFERENCES
				+ " where USER_ID=? and ROLE_ID=? AND "+Platform+"='"+profileId+"' ";
		
		StringBuffer insertStatement = new StringBuffer();
		if (userSelectedPreferences != null
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
		}
		System.out.println("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, param.getUserId());
			stmt.setString(2, param.getRoleId());
			// stmt.setString(2, param.getUserPreferencesSize());

			result = stmt.executeUpdate();
			// System.out.println("result" + result);
			// if (result != 0) {
			if (!insertStatement.toString().equals("")) {
				stmt = con.prepareStatement(insertStatement.toString());

				result = stmt.executeUpdate();
				// System.out.println("result" + result);
				if (result != 0) {
					return "true";
				} else {
					return "Technical issue occurred. Please contact support";
				}
			} else {
				return "true";
			}
			// }

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
			DatabaseUtil.releaseConnection(con);
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
			DatabaseUtil.releaseConnection(con);
		}

		return null;
	}
	
	public static ArrayList<Department> getUserPrimaryDepartments(String userId, String site) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet result=null;
		ArrayList<Department> depList=new ArrayList<Department>(); 
		String selectQry = "select DISTINCT dept_ID,dept_name from " + Constants.NGBO_PRIMARY_DPT
				+ " where USR_ID=? and site=?"  ;		
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
			DatabaseUtil.releaseConnection(con);
		}
		return depList;
	}

	public static Map<String, UserPreferences> getUserPreferences(
			UserPreferencesParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, UserPreferences> userPreferences = null;
		String sqlStatement = buildQueryForUserPreferences(param);

		System.out.println("user preference query:" + sqlStatement);
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
			DatabaseUtil.releaseConnection(con);
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
			DatabaseUtil.releaseConnection(con);
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
			DatabaseUtil.releaseConnection(con);
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
			DatabaseUtil.releaseConnection(con);
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
				"AND include_exclude_flag IN ('E')    )");
		
		select = new StringBuffer(
				" select mas.*, SM.FUNC_DESC screen_desc, SM.ROOT_CODE,  SM1.FUNC_DESC ROOT_DESC ");
		from = new StringBuffer(" FROM ");
		from.append(" ( select DEFAULT_SHORT.*  from "
				+ Constants.DEFAULT_SHORTCUTS
				+ " DEFAULT_SHORT where SALES_ORG = ? AND function_code  in   ("
				+ buildQueryForIncludedFunction(param) + ") "+exclude_criteria+") SC  ");
		where = new StringBuffer(" JOIN " + Constants.SCREEN_FUNCTION_MASTER
				+ " SM ON (SM.FUNCTION_CODE=SC.function_code) JOIN "
				+ Constants.SCREEN_FUNCTION_MASTER
				+ " SM1	ON (SM1.FUNCTION_CODE=SM.root_code) ");
		where.append(" JOIN " + Constants.SHORTCUT_MASTER
				+ " mas ON (mas.FUNCTION_CODE=SC.function_code)  ");

		query = select.append(from).append(where).toString();
		System.out.println(" buildQueryForDefaultPreference query _" + query);
		return query;
	}

	private static String buildQueryAllPreference(UserPreferencesParam param) {

		StringBuffer select = null;
		StringBuffer from = null;
		StringBuffer where = null;
		String query = "";
		select = new StringBuffer(
				" select SC.*, SM.FUNC_DESC screen_desc, SM.ROOT_CODE,  SM1.FUNC_DESC ROOT_DESC ");
		from = new StringBuffer(" FROM ");
		from.append(" (select shortcut_mas.*  from "
				+ Constants.SHORTCUT_MASTER
				+ " shortcut_mas where function_code  in  ("
				+ buildQueryForIncludedFunction(param) + ") )  SC ");
		where = new StringBuffer(" JOIN " + Constants.SCREEN_FUNCTION_MASTER
				+ " SM ON (SM.FUNCTION_CODE=SC.function_code) JOIN "
				+ Constants.SCREEN_FUNCTION_MASTER
				+ " SM1	ON (SM1.FUNCTION_CODE=SM.root_code) ");

		query = select.append(from).append(where).toString();
		System.out.println(" buildQueryForDefaultPreference query _" + query);
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
				"AND include_exclude_flag IN ('E')    )");
		
		select = new StringBuffer(
				" SELECT user_pref.sales_org,user_pref.priority,shortcut_mas.function_code,screen_mas.FUNC_DESC screen_desc,shortcut_mas.icon_name,shortcut_mas.url ");
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

		System.out.println("Query for user preferences_" + query);
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
				.append(" and store=? ) ").append(" UNION ");

		select_level2 = new StringBuffer(" ( SELECT FUNCTION_CODE ");
		from_level2 = new StringBuffer("  FROM NGBO_FUNCTION_EXCLUDE ");
		where_level2 = new StringBuffer(" WHERE SALES_ORG   = ? ")
				.append(" AND ROLE_ID  IN (?) ")
				.append(" AND access_level  IN ('" + Constants.ACCESS_LEVEL_2
						+ "') ")
				.append(" and FUNCTION_CODE not in ( SELECT FUNCTION_CODE ")
				.append(" FROM NGBO_FUNCTION_EXCLUDE ")
				.append(" WHERE SALES_ORG = ? ")
				.append(" AND ROLE_ID  IN (?) ")
				.append(" AND access_level  IN ('" + Constants.ACCESS_LEVEL_3
						+ "') ").append(" and store not in (?) ")
				.append(" AND include_exclude_flag in ('I') ) )");

		query = select_level3.append(from_level3).append(where_level3)
				.append(select_level2).append(from_level2).append(where_level2)
				.toString();
		System.out.println("inner query for user preference" + query);
		return query;
	}

	public static String updateUserPrimaryDepartments(String[] toDeleteList,
			String[] toAddList, UserContext user,Logger logger) throws SQLException {
		Connection con=null;
		PreparedStatement stmt=null;
		try{

		con = DatabaseUtil.getConnection();
		stmt=null;
		String deleteQry="DELETE FROM "+Constants.NGBO_PRIMARY_DPT+" WHERE LOWER(USR_ID)=lower('"+user.getUserId()+"') and site='"+user.getSiteNo()+"' ";
		
		if(toDeleteList!=null && toDeleteList.length>0)
		{
			deleteQry+=" and dept_id in ( '"+toDeleteList[0].split("-")[0]+"'";
			for(int i=0;i<toDeleteList.length;i++){
				deleteQry+=",'"+toDeleteList[i].split("-")[0]+"'";
			}
			deleteQry+=")";
			
			logger.info("to remove dept Qry :"+deleteQry);
			try {
				stmt=con.prepareStatement(deleteQry);
				stmt.executeUpdate();
			} catch (SQLException e) {
				if(null!=stmt) stmt.close();
				DatabaseUtil.releaseConnection(con);
				e.printStackTrace();
				logger.error("Stack Trace :", e);
				return Constants.FALSE;
			}
		}
		
		
		
		if(toAddList!=null && toAddList.length>0)
		{
			String insertQry="INSERT ALL ";
			for(int i=0;i<toAddList.length;i++){
				insertQry+="into "+Constants.NGBO_PRIMARY_DPT+" (USR_ID,DEPT_ID,LAST_CREATED_USER,LAST_CREATED_DATE,SITE,DEPT_NAME) values ('"+user.getUserId()+"','"+toAddList[i].split("-")[0]+"','"+user.getUserId()+"',sysdate,'"+user.getSiteNo()+"','"+toAddList[i].split("-")[1]+"') ";
			}
			insertQry+=" select 1 FROM DUAL";
			
			logger.info("to ADD dept Qry :"+insertQry);
			try {
				stmt=con.prepareStatement(insertQry);
				stmt.executeUpdate();
			} catch (SQLException e) {
				if(null!=stmt) stmt.close();
				DatabaseUtil.releaseConnection(con);
				logger.error("Stack Trace :", e);
				e.printStackTrace();
				return Constants.FALSE;
			}
		}	
		}catch(Exception e){
			
		}finally{
			if(null!=stmt) stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		
		return Constants.TRUE;
	}
}