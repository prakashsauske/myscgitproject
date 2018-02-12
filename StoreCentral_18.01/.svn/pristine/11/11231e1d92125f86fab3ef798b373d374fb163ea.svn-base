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
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.RegionDetail;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;


/**
 * @author xrca4
 * 
 */
public class RoleMgtDAOImpl {
	
	private static final Logger LOGGER = Logger
			.getLogger(RoleMgtDAOImpl.class.getName());

	public static String updateRolePrflSettings(String roleId,
			String[] userSelectedPreferences, String salesOrg) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result;
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.DESCRIPTION  from USR_SHORTCUT_FCTN uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
		String deleteStatement = "delete from ROLE_PROFILE_DETAILL s where s.ROLE_CODE=? and s.SALES_ORG=?";
		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ALL ");
		for (int i = 0; i < userSelectedPreferences.length; i++) {
			insertStatement
					.append("INTO ROLE_PROFILE_DETAILL (id,ROLE_CODE,SALES_ORG,SCREEN_CODE,FUNCTION_CODE,ACCESS_LEVEL) "
							+ " VALUES (ROLE_PRF_ID_SEQ.nextval "
							+ ",'"
							+ roleId
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[0]
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[2]
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[1]
							+ "',"
							+ "'" + "Y" + "')");
		}
		insertStatement.append(" SELECT * FROM dual");

		LOGGER.info("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, roleId);
			stmt.setString(2, salesOrg);

			result = stmt.executeUpdate();
			LOGGER.info("result" + result);
			// if (result != 0) {
			if (!(userSelectedPreferences != null
					&& userSelectedPreferences.length > 0 && userSelectedPreferences[0]
						.split(":")[1].trim().equalsIgnoreCase("empty"))) {
				stmt = con.prepareStatement(insertStatement.toString());
				result = stmt.executeUpdate();
			} else {
				result = 1;
			}
			LOGGER.info("result" + result);
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
	
	
	public static String updateFuncSettings(String userId,
			String[] userSelectedPreferences, String salesOrg) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result;
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.DESCRIPTION  from USR_SHORTCUT_FCTN uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
		String deleteStatement = "delete from MANAGE_BANNER_FUNC s where s.SALES_ORG=?";
		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ALL ");
		for (int i = 0; i < userSelectedPreferences.length; i++) {
			insertStatement
					.append("INTO MANAGE_BANNER_FUNC (SALES_ORG,SCREEN_CODE,FUNCTION_CODE,ACCESS_LEVEL,CREATED_USR) "
							+ " VALUES ( " 
							//+ "ROLE_PRF_ID_SEQ.nextval "
							//+ ",'"
							//+ roleId
							//+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[0]
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[2]
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[1]
							+ "',"
							+ "'" + "Y" + "','"+userId+"')");
		}
		insertStatement.append(" SELECT * FROM dual");

		LOGGER.info("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			//stmt.setString(1, roleId);
			stmt.setString(1, salesOrg);

			result = stmt.executeUpdate();
			// LOGGER.info("result" + result);
			// if (result != 0) {
			if (!(userSelectedPreferences != null 
					&& userSelectedPreferences.length > 0 && userSelectedPreferences[0]
						.split(":")[1].trim().equalsIgnoreCase("empty"))) {
				stmt = con.prepareStatement(insertStatement.toString());
				result = stmt.executeUpdate();
			} else {
				result = 1;
			}
			// LOGGER.info("result" + result);
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

	public static ArrayList<RoleProfileDtl> getRoleList() throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<RoleProfileDtl> roleList = null;
		/*StringBuffer where=new StringBuffer("  and sales_org in ( ");
		if(salesOrgList!=null && !salesOrgList.equals("")){
			for(String sorg :salesOrgList){
			if(where==null)
				{
				where=new StringBuffer("'").append(sorg).append("'");
				}
			else
			{
				where.append(" ,'").append(sorg).append("'");
			}
			}
		}
		where.append(")");*/
		LOGGER.info("------"+"empty");
		String sqlStatement = "select * from SALES_ORG_ROLE_PROFILE where 1=1 and sales_org in ( select distinct sales_org from SALES_ORG ) and ROLE_TYPE='SC' Order by Priority asc";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			if (rs != null) {
				roleList = new ArrayList<RoleProfileDtl>();
				while (rs.next()) {

					roleList.add(new RoleProfileDtl(rs.getString("ROLE_CODE"),
							rs.getString("ROLE_DESC"),rs.getString("sales_org")));
					LOGGER.info("roleList.size()" + roleList);
				}

				return roleList;
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

	public static ArrayList<RoleProfileDtl> getRoleListBySalesOrg(String salesOrg) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<RoleProfileDtl> roleList = null;
		/*StringBuffer where=new StringBuffer("  and sales_org in ( ");
		if(salesOrgList!=null && !salesOrgList.equals("")){
			for(String sorg :salesOrgList){
			if(where==null)
				{
				where=new StringBuffer("'").append(sorg).append("'");
				}
			else
			{
				where.append(" ,'").append(sorg).append("'");
			}
			}
		}
		where.append(")");*/
		LOGGER.info("------"+"empty");
		String sqlStatement = "select * from SALES_ORG_ROLE_PROFILE where 1=1 and sales_org in ('"+salesOrg+"') and ROLE_TYPE='SC' Order by Priority asc";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			if (rs != null) {
				roleList = new ArrayList<RoleProfileDtl>();
				while (rs.next()) {

					roleList.add(new RoleProfileDtl(rs.getString("ROLE_CODE"),
							rs.getString("ROLE_DESC"),rs.getString("sales_org")));
					LOGGER.info("roleList.size()" + roleList);
				}

				return roleList;
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
				//con.close();
		}

		return null;
	}	

	public static ArrayList<RoleProfileDtl> getRoleList(String roleId) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<RoleProfileDtl> roleList = null;
		LOGGER.info("------"+roleId);
		String sqlStatement = "select * from SALES_ORG_ROLE_PROFILE where 1=1 and sales_org in ( select distinct sales_org from SALES_ORG ) and ROLE_TYPE='SC' Order by Priority asc";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);

			rs = stmt.executeQuery();
			if (rs != null) {
				roleList = new ArrayList<RoleProfileDtl>();
				while (rs.next()) {
					if(Constants.isStockTakeManager(roleId)){
						if(Constants.isStockTakeUser(rs.getString("ROLE_CODE"))){
							roleList.add(new RoleProfileDtl(rs.getString("ROLE_CODE"),
									rs.getString("ROLE_DESC"),rs.getString("sales_org")));
						}
					}else{
//						if(!Constants.isStockTakeUser(rs.getString("ROLE_CODE"))){
							roleList.add(new RoleProfileDtl(rs.getString("ROLE_CODE"),
									rs.getString("ROLE_DESC"),rs.getString("sales_org")));
//						}
					}
					
				}

				return roleList;
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

	public static Map<String, ArrayList<String>> getRoleExcludeDetail()
			throws Exception {
		return null;/*

		Connection con = LoginDao.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<String>> salesOrgExcludeMap = null;

		String sqlStatement = "select * from ROLE_PROFILE_DETAILL union select 1 as id," +
				"  'All' as ROLE_CODE, bf.SALES_ORG,bf.SCREEN_CODE,bf.FUNCTION_CODE,bf.ACCESS_LEVEL," +
				"  bf.CREATED_USR,bf.CREATED_DATE,bf.UPDATED_USR,bf.UPDATED_DATE from MANAGE_BANNER_FUNC bf";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			
			 * stmt.setString(1, salesOrg);
			 * 
			 * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				salesOrgExcludeMap = new LinkedHashMap<String, ArrayList<String>>();
				ArrayList<String> salesOrgExcludeList = null;
				while (rs.next()) {

					if (rs.getString("SALES_ORG") != null)
						if (salesOrgExcludeMap.containsKey(rs
								.getString("SALES_ORG"))) {
							salesOrgExcludeList = salesOrgExcludeMap.get(rs
									.getString("SALES_ORG"));
							salesOrgExcludeList.add(rs.getString("ROLE_CODE")
									+ "-" + rs.getString("FUNCTION_CODE") + "-"
									+ rs.getString("SCREEN_CODE"));
						} else {
							salesOrgExcludeList = new ArrayList<String>();
							salesOrgExcludeList.add(rs.getString("ROLE_CODE")
									+ "-" + rs.getString("FUNCTION_CODE") + "-"
									+ rs.getString("SCREEN_CODE"));
						}
					salesOrgExcludeMap.put(rs.getString("SALES_ORG"),
							salesOrgExcludeList);
					LOGGER.info("menuBarOptions.size()"
							//+ salesOrgExcludeMap.size());
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
			if (con != null)
				con.close();
		}

		return null;
	*/}

	public static Map<String, ArrayList<MenuOptions>> getRoleMgtDetail(String myRole,Integer mySalesOrg,String mySite,String role,String salesOrg,String site,String myUserId, String userId)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<MenuOptions>> menuOptionsMap = null;
		// String sqlStatement =
		// "select * from MENU_MASTER m where m.CODE not in (select excl_menu_fn_id  from SALES_ORG_EXCL_MENU_FN  where sales_org_no=?)";
		if(site==null||site.equalsIgnoreCase("")){
			site="NONE";
		}
		String sqlStatement ="(SELECT MINUSRES.code1,MINUSRES.function_code, MINUSRES.func_desc, MINUSRES.ROOT_CODE, MINUSRES.root_code AS code2, CASE WHEN MINUSRES.function_code=UET.FUNCTN_CODE THEN 'U' ELSE 'N' END AS CHECKED, MINUSRES.STORE, MINUSRES.USER_ID, MINUSRES.INCLUDE_EXCLUDE_FLAG FROM "
				+ "(select sm1.root_code as code1, sfm.function_code, sfm.func_desc, SFM.ROOT_CODE,sm.root_code as code2,'N' AS CHECKED, FE.STORE,'' as USER_ID,FE.INCLUDE_EXCLUDE_FLAG "
				+ " from "+Constants.SCREEN_FUNCTION_MASTER+" sfm,"+Constants.SCREEN_FUNCTION_MASTER+" sm,"+Constants.SCREEN_FUNCTION_MASTER+" sm1 ,"+Constants.NGBO_FUNCTION_EXCLUDE+" FE "
				+ " where sfm.FUNCTION_CODE=sm.FUNCTION_CODE AND FE.FUNCTION_CODE=SFM.FUNCTION_CODE and sm.root_code=sm1.FUNCTION_CODE AND FE.FUNCTION_CODE=SFM.FUNCTION_CODE AND FE.ROLE_ID='"+myRole+"' AND FE.SALES_ORG='"+mySalesOrg+"' AND FE.isactive =1 " 
				+ " and FE.FUNCTION_CODE not in(select function_code from NGBO_FUNCTION_EXCLUDE where store='"+mySite+"' and INCLUDE_EXCLUDE_FLAG='E' AND ROLE_ID='"+myRole+"' AND SALES_ORG='"+mySalesOrg+"' AND isactive =1)" ;
//				  " and FE.FUNCTION_CODE in(select function_code from NGBO_FUNCTION_EXCLUDE where store='"+mySite+"' and FE.INCLUDE_EXCLUDE_FLAG='I')";
		sqlStatement += " MINUS "
				+" select sm1.root_code as code1,sfm.function_code, sfm.func_desc, SFM.ROOT_CODE,sm.root_code as code2,'N' AS CHECKED, FE.STORE,'' as USER_ID,FE.INCLUDE_EXCLUDE_FLAG "
				+" from "+Constants.SCREEN_FUNCTION_MASTER+" sfm,"+Constants.SCREEN_FUNCTION_MASTER+" sm,"+Constants.SCREEN_FUNCTION_MASTER+" sm1 ,"+Constants.NGBO_FUNCTION_EXCLUDE+" FE "
				+" where sfm.FUNCTION_CODE=sm.FUNCTION_CODE AND FE.FUNCTION_CODE=SFM.FUNCTION_CODE and sm.root_code=sm1.FUNCTION_CODE AND FE.FUNCTION_CODE=SFM.FUNCTION_CODE AND FE.ROLE_ID='"+role+"' AND FE.SALES_ORG='"+salesOrg+"'  AND FE.isactive =1 "
				+ " and FE.FUNCTION_CODE not in(select function_code from NGBO_FUNCTION_EXCLUDE where store='"+site+"' and INCLUDE_EXCLUDE_FLAG='E' AND ROLE_ID='"+role+"' AND SALES_ORG='"+salesOrg+"' AND isactive =1)" ;
//				  " and FE.FUNCTION_CODE in(select function_code from NGBO_FUNCTION_EXCLUDE where store='"+site+"' and INCLUDE_EXCLUDE_FLAG='I')";
		sqlStatement += ")" +
				"MINUSRES LEFT OUTER JOIN USER_EXCEPTION_TBL  UET ON MINUSRES.FUNCTION_CODE=UET.FUNCTN_CODE and UET.site_id='"+site+"' AND UET.USR_ID='"+userId+"')"
				+" UNION ("
				+" select sm1.root_code as code1,sfm.function_code, sfm.func_desc, SFM.ROOT_CODE,sm.root_code as code2,'Y' AS CHECKED, FE.STORE,'' as USER_ID,FE.INCLUDE_EXCLUDE_FLAG "
				+" from "+Constants.SCREEN_FUNCTION_MASTER+" sfm,"+Constants.SCREEN_FUNCTION_MASTER+" sm,"+Constants.SCREEN_FUNCTION_MASTER+" sm1 ,"+Constants.NGBO_FUNCTION_EXCLUDE+" FE "
				+" where sfm.FUNCTION_CODE=sm.FUNCTION_CODE AND FE.FUNCTION_CODE=SFM.FUNCTION_CODE and sm.root_code=sm1.FUNCTION_CODE AND FE.FUNCTION_CODE=SFM.FUNCTION_CODE AND FE.ROLE_ID='"+role+"' AND FE.SALES_ORG='"+salesOrg+"' AND FE.isactive =1 " +
				  " and FE.FUNCTION_CODE not in(select function_code from NGBO_FUNCTION_EXCLUDE where store='"+site+"' and INCLUDE_EXCLUDE_FLAG='E' AND ROLE_ID='"+role+"' AND SALES_ORG='"+salesOrg+"' AND isactive =1)" +
//				  " and FE.FUNCTION_CODE in(select function_code from NGBO_FUNCTION_EXCLUDE where store='"+site+"' and FE.INCLUDE_EXCLUDE_FLAG='I')"+
				  ") order by checked desc";
		
		PreparedStatement stmt = null;
		try {
			LOGGER.info("Additional function  Qry : "+sqlStatement);
			stmt = con.prepareStatement(sqlStatement);
			// stmt.setString(1, salesOrg);

			/*
			 * * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				menuOptionsMap = new LinkedHashMap<String, ArrayList<MenuOptions>>();
				ArrayList<MenuOptions> menuOptionsList = null;
				String key = null;
				LOGGER.info("display of result set after excetion of query : "+rs);
				while (rs.next()) {

					if (rs.getString("code1") != null) {
						key = rs.getString("code1");
					} else if (rs.getString("code2") != null) {
						key = rs.getString("code2");
					}
					if( rs.getString("INCLUDE_EXCLUDE_FLAG")!=null && rs.getString("INCLUDE_EXCLUDE_FLAG").equalsIgnoreCase(Constants.EXCLUDE_FLAG)){
						//ignore this
						continue;
					}else if( rs.getString("INCLUDE_EXCLUDE_FLAG")!=null && rs.getString("INCLUDE_EXCLUDE_FLAG").equalsIgnoreCase(Constants.INCLUDE_FLAG)){
						//check if current store
						if(!(rs.getString("STORE")!=null && (rs.getString("STORE").equalsIgnoreCase(site)||rs.getString("STORE").equalsIgnoreCase(mySite)))){
							continue;
						}else if(!(rs.getString("USER_ID")!=null && (rs.getString("USER_ID").equalsIgnoreCase(myUserId)))){
							continue;
						}
					}
					
					if (key != null) {
						if (menuOptionsMap.containsKey(key)) {
							menuOptionsList = menuOptionsMap.get(key);
							menuOptionsList.add(new MenuOptions(rs
									.getString("FUNCTION_CODE"), rs
									.getString("FUNC_DESC"), rs
									.getString("ROOT_CODE"),rs
									.getString("CHECKED")));
						} else {
							menuOptionsList = new ArrayList<MenuOptions>();
							menuOptionsList.add(new MenuOptions(rs
									.getString("FUNCTION_CODE"), rs
									.getString("FUNC_DESC"), rs
									.getString("ROOT_CODE"),rs
									.getString("CHECKED")));
						}
						menuOptionsMap.put(key, menuOptionsList);
					}
				}

			}
			
			
					//based on the matrix roles pos function display is prevented 
//			if(role!=null &&  !role.equalsIgnoreCase (Constants.IT_SUPPORT_ONE) && !Constants.isAdminUser(role) && !role.equalsIgnoreCase(Constants.IT_SUPPORT_TWO) && !role.equalsIgnoreCase(Constants.AREA_MANAGER) && !role.equalsIgnoreCase(Constants.STOCKTAKE_MANAGER)&& !role.equalsIgnoreCase(Constants.REPORTING_ROLE)&&  !role.equalsIgnoreCase (Constants.READ_ONLY_USER) && !role.equalsIgnoreCase(Constants.STORE_MANAGER )|| (role.equalsIgnoreCase(Constants.BUSINESS_REVIEW ) ))
//			{
				//17.09 Release - As per Tracy's Confirmation, Commented store validation as Additional Roles should appear in all Store after 
				if((site!=null /*&& LoginServiceImpl.isNGBOStore(site)*/)||Constants.isAdminUser(role)){
					ArrayList<MenuOptions> menuOptionsList = new ArrayList<MenuOptions>();
					menuOptionsList=getAdditionalRoles(role, salesOrg, site, userId,con);				
					menuOptionsMap.put("1POSROLES", menuOptionsList);
				}/*else if(role.equalsIgnoreCase(Constants.IT_SUPPORT_ONE)||role.equalsIgnoreCase(Constants.BUSINESS_REVIEW))
				{
					ArrayList<MenuOptions> menuOptionsList = new ArrayList<MenuOptions>();
					menuOptionsList=getAdditionalRoles(role, salesOrg, site, userId,con);				
					menuOptionsMap.put("1POSROLES", menuOptionsList);
				}*/
//			}			
			CommonUtils.convertObjectTojson(menuOptionsMap);
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
		return menuOptionsMap;
	}

	public static ArrayList<MenuOptions> getAdditionalRoles(String role,String salesOrg,String site,String myUserId, Connection con)
			throws Exception {

		ResultSet rs = null;
		ArrayList<MenuOptions> addtionalRoleList=new ArrayList<MenuOptions>();
		/*String sqlStatement ="SELECT distinct rp.ROLE_code, RP.ROLE_DESC, " +
						"case when nrpm.PARENT_ROLE ='"+role+"' then 'Y' else case when NUAR.ROLE=NRPM.ROLE then 'U' else 'N' end end as CHECKED " +
						"FROM ROLE_PROFILE rp " +
						"JOIN SALES_ORG_ROLE_PROFILE SORP "+
						"ON RP.ROLE_CODE=SORP.ROLE_CODE "+
						"AND SORP.SALES_ORG='"+salesOrg+"' " + 
						"AND SORP.ROLE_TYPE='1POS' "+ 
						"LEFT OUTER JOIN " +
						Constants.NGBO_ROLE_MAPPING
						+" nrpm " +
						"ON " +
						"NRPM.ROLE =RP.ROLE_CODE AND NRPM.ROLE_TYPE =RP.ROLE_TYPE and RP.ROLE_TYPE='1POS' and NRPM.PARENT_ROLE_TYPE='SC' " +
						"LEFT OUTER JOIN " +
						Constants.NGBO_USR_ADDITIONAL_ROLES+
						" NUAR " +
						"ON " +
						"NUAR.ROLE=NRPM.ROLE AND NUAR.STORE_COST_CENTRE_ID='"+site+"' AND LOWER(NUAR.USR_ID)=LOWER('"+myUserId+"') " +
						"where RP.ROLE_TYPE='1POS' order by checked desc";*/
		

		//changed as desc was compared with role code
		String preSql="select ac.role,ac.role_code,nvl(uc.checked,'Y') checked from (select to_char(role_code) role,to_char(role_desc) role_code,'Y' CHECKED from ngbo_one_pos_roles) ac left outer join(";
		String sqlStatement="SELECT DISTINCT NRP.ROLE, NRP.ROLE_CODE, "+
                            " CASE WHEN NRP.ROLE = UAR.ROLE AND UAR.ACTV_END_DATE > SYSDATE THEN 'U' ELSE 'N' END CHECKED" +
                            " FROM NGBO_ROLE_MAPPING NRP "+
                            " LEFT OUTER JOIN "+
                            " USR_ADDITIONAL_ROLES UAR "+
                            " ON UAR.ROLE =NRP.ROLE AND LOWER(UAR.USR_ID) = LOWER('"+myUserId+"') AND DECODE(UAR.STORE_COST_CENTRE_ID,NULL,'NONE','','NONE',UAR.STORE_COST_CENTRE_ID)='"+site+"' "+                                                              
                            "WHERE  NRP.PARENT_ROLE ='"+role+"' and NRP.ROLE_TYPE  ='1POS' AND NRP.SALES_ORG ='"+salesOrg+"' AND NRP.PARENT_ROLE_TYPE='SC' ";
		String postSql=") uc on uc.role=ac.role ORDER BY checked DESC";
		PreparedStatement stmt = null;
		try {
			LOGGER.info("Additional roles Qry : "+preSql+sqlStatement+postSql);
			stmt = con.prepareStatement(preSql+sqlStatement+postSql);
			rs = stmt.executeQuery();
			if (rs != null) {
				
				while (rs.next()) {				
						
							addtionalRoleList.add(new MenuOptions(rs
									.getString("ROLE"), rs
									.getString("ROLE_CODE"), "",rs
									.getString("CHECKED")));
						
					}
				}			
		} catch (SQLException e) {
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
		}

		return addtionalRoleList;
	}
	
	public static Map<String, String> getAllSalesOrg() throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, String> saleOrgs = null;

		String sqlStatement = "select * from SALES_ORG";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			/*
			 * stmt.setString(1, salesOrg);
			 * 
			 * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				saleOrgs = new LinkedHashMap<String, String>();
				while (rs.next()) {
					saleOrgs.put(rs.getString("SALES_ORG"),
							rs.getString("SALES_ORG_NAME"));
					LOGGER.info("menuBarOptions.size()"+ saleOrgs.size());
				}

				return saleOrgs;
			}
		} catch (SQLException e) {
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

	public static ArrayList<RegionDetail> getAllRegions(String salesOrg) throws SQLException {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<RegionDetail> regionlist=new ArrayList<RegionDetail>();

		String sqlStatement = "select distinct sm.region,sm.region_name from "+Constants.NGBO_SITEMASTER+ " sm where sm.sales_org='"+salesOrg+"' and sm.region_name is not null and SM.REGION_NAME<>' '";
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				while (rs.next()) {
					regionlist.add(new RegionDetail(rs.getString("region"), rs.getString("region_name"), null));
				}

				return regionlist;
			}
		} catch (SQLException e) {
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
			//	con.close();
		}
		return null;
	}

}
