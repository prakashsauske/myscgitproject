package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.sql.Statement;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.controller.ApplicationSettingsController;
import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.ActivityOptions;
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.ReplicateParam;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class ApplicationSettingDAOImpl {
	
	private static final Logger LOGGER = Logger.getLogger(ApplicationSettingDAOImpl.class.getName());

	public static ArrayList<ActivityOptions> getStoreDtl(String query)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<ActivityOptions> activityOptionsList = null;
		ActivityOptions activityOptions = null;
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(query);
			/*
			 * stmt.setString(1, salesOrg);
			 * 
			 * stmt.setString(2, param.getSubmitBy()); stmt.setString(3,
			 * "%"+param.getSubmitBy()+"%");
			 */
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				activityOptionsList = new ArrayList<ActivityOptions>();
				while (rs.next()) {
					activityOptions = new ActivityOptions();
					activityOptions.setSiteNo(rs.getString("store"));
					activityOptions.setSiteDesc(rs.getString("site_name"));
					activityOptionsList.add(activityOptions);
				}
				if (activityOptionsList != null
						&& activityOptionsList.size() > 0)
					return activityOptionsList;
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
	//select 'Insert into NGBO_FUNCTION_EXCLUDE (MANDT,SEQ_NUMBER,SALES_ORG,ROLE_ID,STORE,INCLUDE_EXCLUDE_FLAG,CREATE_DATE,CREATED_USER,ACCESS_FLAG,FUNCTION_CODE,SCREEN_FUNCTION_FLAG,ACCESS_LEVEL,CHANGED_TS,ISACTIVE) values ('||MANDT||','||SEQ_NUMBER||','||SALES_ORG||','||ROLE_ID||','||STORE||','||INCLUDE_EXCLUDE_FLAG||','||CREATE_DATE||','||CREATED_USER||','||ACCESS_FLAG||','||FUNCTION_CODE||','||SCREEN_FUNCTION_FLAG||','||ACCESS_LEVEL||','||CHANGED_TS||','||ISACTIVE||')' from ngbo_function_exclude where store=1208;
	public static ArrayList<SiteDtls> verifyStores(ReplicateParam param)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		ArrayList<SiteDtls> verifyStores=null;
		PreparedStatement stmt = null;
		String query="select * from "+Constants.NGBO_SITEMASTER + " sm where sm.site in ('"+param.getStoreslist().replaceAll(",", "','")+"') and SALES_ORG = '"+param.getToSorg()+"'";
		try {

			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				verifyStores = new ArrayList<SiteDtls>();
				while (rs.next()) {
					SiteDtls site = new SiteDtls();
					site.setSiteNo(rs.getString("SITE"));
					site.setSiteName(rs.getString("SITE_NAME"));
					verifyStores.add(site);
				}
				if (verifyStores != null
						&& verifyStores.size() > 0)
					param.setVerifiedStores(verifyStores);
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
					// LOGGER.info("menuBarOptions.size()"
					// + saleOrgs.size());
				}

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
				//con.close();
		}

		return null;
	}

	private static String buildQueryForDeleteSettings(
			ActivityOptions activityOpt) {
		String deleteStatement = "";
		StringBuffer levelList = null;
		StringBuffer roleList = null;
		StringBuffer codeList = null;
		// StringBuffer deleteSelect = new StringBuffer(" delete ");
		StringBuffer deleteSelect = new StringBuffer(" select * ");
		StringBuffer deleteFrom = new StringBuffer(" from "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");
		//StringBuffer deleteWhere = new StringBuffer(" where ");
		// changed for central cache sync issue
		StringBuffer deleteWhere = new StringBuffer(" where ISACTIVE = '1'  and ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			LOGGER.info("roleList" + roleList.toString());
			deleteWhere.append(" and NGBO_FUNC.role_id in("
					+ roleList.toString() + ") ");
		}
		if (activityOpt.getLevelList() != null
				&& activityOpt.getLevelList().size() > 0) {
			for (String level : activityOpt.getLevelList())
				if (levelList == null) {
					levelList = new StringBuffer("'" + level + "'");
				} else {
					levelList.append(",'").append(level).append("'");
				}
			LOGGER.info("level list" + levelList.toString());
			deleteWhere.append(" and NGBO_FUNC.ACCESS_LEVEL in("
					+ levelList.toString() + ") ");
		}
		if (activityOpt.getDeleteAllFlag() != null
				&& !activityOpt.getDeleteAllFlag().equals("")
				&& !activityOpt.getDeleteAllFlag().equalsIgnoreCase("Y")) {
			if (activityOpt.getCode() != null
					&& !activityOpt.getCode().equals("")) {
				deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE=? ");
			} else if (activityOpt.getCodeList() != null
					&& activityOpt.getCodeList().size() > 0) {
				for (String code : activityOpt.getCodeList())
					if (codeList == null) {
						codeList = new StringBuffer("'" + code + "'");
					} else {
						codeList.append(",'").append(code).append("'");
					}
				LOGGER.info("codeList list" + codeList.toString());
				deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
						+ codeList.toString() + ") ");
			}
		}
		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		LOGGER.info("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	/* XPSNV - Code modified for Security enhancements - Begin */

	public static String updateApplicationSettings(String userId,
			ActivityOptions activityOpt) throws Exception {
		ArrayList<ActivityOptions> activityOptionsList = activityOpt
				.getActivityOptionsList();
		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		int result1 = 0;
		int deleteRecordCount = 0;
		int insertRecordCount = 0;
		ResultSet rs = null;
		ActivityOptions deleteActivityOptions = new ActivityOptions();
		ArrayList<ActivityOptions> deletedActivityOptionList = new ArrayList<ActivityOptions>();

		String deleteStatement = buildQueryForDeleteSettings(activityOpt);

		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ");
		insertStatement
				.append(" INTO "
						+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
								(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE))
						+ " (SEQ_NUMBER,ACCESS_FLAG,ACCESS_LEVEL,CREATED_USER,CREATE_DATE,FUNCTION_CODE, ")
				.append(" INCLUDE_EXCLUDE_FLAG,ROLE_ID,SALES_ORG,SCREEN_FUNCTION_FLAG,STORE) VALUES (NGBO_FUNCTION_EXCLUDE_SEQ.nextVal,?,?,'"
						+ userId + "',sysdate,?,?,?,?,?,?)");

		LOGGER.info("insert query" + insertStatement.toString());

		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, activityOpt.getSalesOrg());

			if (activityOpt.getCode() != null
					&& !activityOpt.getCode().equals("")) {
				stmt.setString(2, activityOpt.getCode());
			}

			// result = stmt.executeUpdate();
			rs = stmt.executeQuery();

			while (rs != null && rs.next()) {
				deleteActivityOptions = new ActivityOptions();

				if (rs.getString("SALES_ORG") != null
						&& !rs.getString("SALES_ORG").isEmpty()) {
					deleteActivityOptions
							.setSalesOrg(rs.getString("SALES_ORG"));
				} else {
					deleteActivityOptions.setSalesOrg("");
				}
				if (rs.getString("ROLE_ID") != null
						&& !rs.getString("ROLE_ID").isEmpty()) {
					deleteActivityOptions.setRoleId(rs.getString("ROLE_ID"));
				} else {
					deleteActivityOptions.setRoleId("");
				}
				if (rs.getString("STORE") != null
						&& !rs.getString("STORE").isEmpty()) {
					deleteActivityOptions.setSiteNo(rs.getString("STORE"));
				} else {
					deleteActivityOptions.setSiteNo("");
				}
				if (rs.getString("INCLUDE_EXCLUDE_FLAG") != null
						&& !rs.getString("INCLUDE_EXCLUDE_FLAG").isEmpty()) {
					deleteActivityOptions.setIncludeExcludeFlag(rs
							.getString("INCLUDE_EXCLUDE_FLAG"));
				} else {
					deleteActivityOptions.setIncludeExcludeFlag("");
				}
				if (rs.getString("ACCESS_FLAG") != null
						&& !rs.getString("ACCESS_FLAG").isEmpty()) {
					deleteActivityOptions.setAccessFlag(rs
							.getString("ACCESS_FLAG"));
				} else {
					deleteActivityOptions.setAccessFlag("");
				}
				if (rs.getString("FUNCTION_CODE") != null
						&& !rs.getString("FUNCTION_CODE").isEmpty()) {
					deleteActivityOptions
							.setCode(rs.getString("FUNCTION_CODE"));
				} else {
					deleteActivityOptions.setCode("");
				}
				if (rs.getString("SCREEN_FUNCTION_FLAG") != null
						&& !rs.getString("SCREEN_FUNCTION_FLAG").isEmpty()) {
					deleteActivityOptions.setScreenFunctionFlag(rs
							.getString("SCREEN_FUNCTION_FLAG"));
				} else {
					deleteActivityOptions.setScreenFunctionFlag("");
				}
				if (rs.getString("ACCESS_LEVEL") != null
						&& !rs.getString("ACCESS_LEVEL").isEmpty()) {
					deleteActivityOptions.setAccessLevel(rs
							.getString("ACCESS_LEVEL"));
				} else {
					deleteActivityOptions.setAccessLevel("");
				}

				deletedActivityOptionList.add(deleteActivityOptions);
			}

			ArrayList<ActivityOptions> insertActivityList = new ArrayList<ActivityOptions>(
					activityOptionsList);
			ArrayList<ActivityOptions> insertDeletedList = new ArrayList<ActivityOptions>(
					deletedActivityOptionList);

			ArrayList<ActivityOptions> removeActivityList = new ArrayList<ActivityOptions>(
					activityOptionsList);
			ArrayList<ActivityOptions> removeDeletedList = new ArrayList<ActivityOptions>(
					deletedActivityOptionList);

			LOGGER.info("activityOptionsList-->"
					+ Constants.convertToJsonString(activityOptionsList));
			LOGGER.info("deletedActivityOptionList-->"
					+ Constants.convertToJsonString(deletedActivityOptionList));

			insertActivityList.removeAll(insertDeletedList);
			removeDeletedList.removeAll(removeActivityList);

			StringBuffer newDeleteStatement = new StringBuffer();

			if (removeDeletedList != null && removeDeletedList.size() > 0) {

				for (ActivityOptions activityOptions : removeDeletedList) {
					
//					if(activityOpt.getAccessLevel()!=null && activityOpt.getAccessLevel().equalsIgnoreCase("3") 
//							&& activityOptions.getAccessLevel()!=null && activityOptions.getAccessLevel().equalsIgnoreCase("2")) continue;
					// changed for central cache sync issue
					newDeleteStatement.append(" update ");
					//newDeleteStatement.append("DELETE FROM ");
					newDeleteStatement.append(((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
							(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE))
							// changed for central cache sync issue
							+ " set ISACTIVE ='0' , CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  WHERE ");
					// MANDATORY FIELD SALES ORG
					if (activityOptions.getSalesOrg() != null
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"")
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" SALES_ORG = '"
								+ activityOptions.getSalesOrg() + "'");
					}

					// MANDATORY FIELD ROLE ID
					if (activityOptions.getRoleId() != null
							&& !activityOptions.getRoleId()
									.equalsIgnoreCase("")
							&& !activityOptions.getRoleId().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" AND ROLE_ID = '"
								+ activityOptions.getRoleId() + "'");
					}

					// NOT A MANDATORY FIELD STORE
					if (activityOptions.getSiteNo() != null
							&& !activityOptions.getSiteNo()
									.equalsIgnoreCase("")
							&& !activityOptions.getSiteNo().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" AND STORE = '"
								+ activityOptions.getSiteNo() + "'");
					}

					// MANDATORY FIELD INCLUDE OR EXCLUDE FLAG FOR STORE
					if (activityOptions.getIncludeExcludeFlag() != null
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("null")) {
						newDeleteStatement
								.append(" AND INCLUDE_EXCLUDE_FLAG = '"
										+ activityOptions
												.getIncludeExcludeFlag() + "'");
					}

					// NOT A MANDATORY FIELD ACCESS FLAG
					if (activityOptions.getAccessFlag() != null
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("null")) {
						newDeleteStatement.append(" AND ACCESS_FLAG = '"
								+ activityOptions.getAccessFlag() + "'");
					}

					// MANDATORY FIELDS FUNCTION CODE
					if (activityOptions.getCode() != null
							&& !activityOptions.getCode().equalsIgnoreCase("")
							) {
						newDeleteStatement.append(" AND FUNCTION_CODE = '"
								+ activityOptions.getCode() + "'");
					}

					// NOT A MANDATORY FIELD SCREEN_FUNCTION_FLAG
					if (activityOptions.getScreenFunctionFlag() != null
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("null")) {
						newDeleteStatement
								.append(" AND SCREEN_FUNCTION_FLAG = '"
										+ activityOptions
												.getScreenFunctionFlag() + "'");
					}

					// MANDATORY FIELDS ACCESS LEVEL
					if (activityOptions.getAccessLevel() != null
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("null")
							&& !activityOpt.getAccessLevel()
									.equalsIgnoreCase("2")) {
						newDeleteStatement.append(" AND ACCESS_LEVEL = '"
								+ activityOptions.getAccessLevel() + "'");
					}

					System.out
							.println("new delete query " + newDeleteStatement);
					try{
						stmt = con.prepareStatement(newDeleteStatement.toString());
						result1 = stmt.executeUpdate();
						stmt.close();
					}catch(Exception e){
						e.printStackTrace();
					}
					newDeleteStatement = new StringBuffer();
					deleteRecordCount++;
				}
			}

			if (result1 != 0) {
				System.out
						.println("Using UpdateAll Settings - Number of Records deleted from NGBO_FUNCTION_EXCLUDE table : "
								+ deleteRecordCount);
			} else {
				System.out
						.println("Using UpdateAll Settings - Number of Records deleted from NGBO_FUNCTION_EXCLUDE table : "
								+ deleteRecordCount);
			}

			/*
			 * Insert the values if it is not available in database and provided
			 * from user
			 */
			stmt = con.prepareStatement(insertStatement.toString());
			LOGGER.info("insertStatement.toString()="
					+ insertStatement.toString());
			if (insertActivityList != null && insertActivityList.size() > 0) {
				for (ActivityOptions activityOptions : insertActivityList) {

					// NOT A MANDATORY FIELD ACCESS FLAG
					if (activityOptions.getAccessFlag() != null
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("null")) {
						stmt.setString(1, Constants.READ_ACCESS);
					} else {
						stmt.setString(1, "");
					}

					// MANDATORY FIELDS ACCESS LEVEL
					if (activityOptions.getAccessLevel() != null
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("null")) {
						stmt.setString(2, activityOptions.getAccessLevel());
					}
					// MANDATORY FIELDS FUNCTION CODE
					if (activityOptions.getCode() != null
							&& !activityOptions.getCode().equalsIgnoreCase("")
							&& !activityOptions.getCode().equalsIgnoreCase(
									"null")) {
						stmt.setString(3, activityOptions.getCode());
					}

					// MANDATORY FIELD INCLUDE OR EXCLUDE FLAG FOR STORE
					if (activityOptions.getIncludeExcludeFlag() != null
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("null")) {
						stmt.setString(4,
								activityOptions.getIncludeExcludeFlag());
					} else {
						stmt.setString(4, "");
					}

					// MANDATORY FIELD ROLE ID
					if (activityOptions.getRoleId() != null
							&& !activityOptions.getRoleId()
									.equalsIgnoreCase("")
							&& !activityOptions.getRoleId().equalsIgnoreCase(
									"null")) {
						stmt.setString(5, activityOptions.getRoleId());
					} else {
						stmt.setString(5, "");
					}

					// MANDATORY FIELD SALES ORG
					if (activityOptions.getSalesOrg() != null
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"")
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"null")) {
						stmt.setString(6, activityOptions.getSalesOrg());
					}

					// NOT A MANDATORY FIELD SCREEN_FUNCTION_FLAG
					if (activityOptions.getScreenFunctionFlag() != null
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("null")) {
						stmt.setString(7,
								activityOptions.getScreenFunctionFlag());
					} else {
						stmt.setString(7, Constants.SCREEN_FLAG);
					}

					// NOT A MANDATORY FIELD STORE
					if (activityOptions.getSiteNo() != null
							&& !activityOptions.getSiteNo()
									.equalsIgnoreCase("")
							&& !activityOptions.getSiteNo().equalsIgnoreCase(
									"null")) {
						stmt.setString(8, activityOptions.getSiteNo());
					} else {
						stmt.setString(8, "");
					}

					result = stmt.executeUpdate();
					insertRecordCount++;
				}
			}

			if ((insertRecordCount != 0 && result == 0)
					|| (deleteRecordCount != 0 && result1 == 0)) {
				System.out
						.println("Using UpdateAll Settings - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
								+ insertRecordCount);
				return "Technical issue occurred. Please contact support";
			} else {
				System.out
						.println("Using UpdateAll Settings - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
								+ insertRecordCount);
				return "true";
			}
			// xsnnu
			/*
			 * if (result != 0 || result1 != 0) { LOGGER.info(
			 * "Using UpdateAll Settings - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
			 * + insertRecordCount); return "true"; } else { LOGGER.info(
			 * "Using UpdateAll Settings - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
			 * + insertRecordCount); return
			 * "Technical issue occurred. Please contact support"; }
			 */
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return "Technical issue occurred. Please contact support";
		} catch (Exception e) {
			e.printStackTrace();
			return "Technical issue occurred. Please contact support";
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
			//con.close();
		}
	}

	/* XPSNV - Code modified for Security enhancements - End */

	public static Map<String, ArrayList<ActivityOptions>> getSalesOrgExcludeDetail(
			String query) throws Exception {
		LOGGER.info(" getSalesOrgExcludeDetail inside ");
		Map<String, ArrayList<ActivityOptions>> activityOptionsMap = null;
		ArrayList<ActivityOptions> activityOptionsList = null;
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		PreparedStatement stmt = null;
		LOGGER.info("getSalesOrgExcludeDetailquery" + query);
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
									.getString("ACCESS_FLAG"), rs
									.getString("ACCESS_LEVEL"), rs
									.getString("INCLUDE_EXCLUDE_FLAG"), rs
									.getString("ROLE_ID"), rs
									.getString("SALES_ORG"), rs
									.getString("SCREEN_FUNCTION_FLAG"), rs
									.getString("STORE"), rs.getString("CNT")));
						} else {
							activityOptionsList = new ArrayList<ActivityOptions>();
							activityOptionsList.add(new ActivityOptions(rs
									.getString("FUNCTION_CODE"), "", rs
									.getString("ACCESS_FLAG"), "", rs
									.getString("ACCESS_FLAG"), rs
									.getString("ACCESS_LEVEL"), rs
									.getString("INCLUDE_EXCLUDE_FLAG"), rs
									.getString("ROLE_ID"), rs
									.getString("SALES_ORG"), rs
									.getString("SCREEN_FUNCTION_FLAG"), rs
									.getString("STORE"), rs.getString("CNT")));
						}
					activityOptionsMap.put(rs.getString("FUNCTION_CODE"),
							activityOptionsList);
				}
				LOGGER.info(" getSalesOrgExcludeDetail outside ");
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
			DatabaseUtil.releaseConnection(con);
				//con.close();
		}
		LOGGER.info(" getSalesOrgExcludeDetail outside ");
		return null;
	}

	public static void getApplicationSettingsDetail(UserPreferencesParam param)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		LinkedHashMap<String, ArrayList<MenuOptions>> menuOptionsMap = null;
		LinkedHashMap<String, String> rootCodeMap = null; 
		ResultSet rs = null;
		// String sqlStatement =
		// "select * from MENU_MASTER m where m.CODE not in (select excl_menu_fn_id  from SALES_ORG_EXCL_MENU_FN  where sales_org_no=?)";
		String sqlStatement = buildQueryForActityCodeMaster();
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				menuOptionsMap = new LinkedHashMap<String, ArrayList<MenuOptions>>();
				rootCodeMap = new LinkedHashMap<String, String>();
				ArrayList<MenuOptions> menuOptionsList = null;
				while (rs.next()) {
						if (rs.getString("PARENT_SCREEN_CODE") != null){
							if (menuOptionsMap.containsKey(rs
									.getString("PARENT_SCREEN_CODE")+"_"+rs
									.getString("PLATFORM"))) {
								menuOptionsList = menuOptionsMap.get(rs
										.getString("PARENT_SCREEN_CODE")+"_"+rs
										.getString("PLATFORM"));
								menuOptionsList.add(new MenuOptions(rs
										.getString("SCREEN_CODE"), rs
										.getString("SCREEN_DESC"), rs
										.getString("ACTIVITY")));
							} else {
								menuOptionsList = new ArrayList<MenuOptions>();
								menuOptionsList.add(new MenuOptions(rs
										.getString("SCREEN_CODE"), rs
										.getString("SCREEN_DESC"), rs
										.getString("ACTIVITY")));
							}
							menuOptionsMap.put(rs.getString("PARENT_SCREEN_CODE")+"_"+rs
									.getString("PLATFORM"),
									menuOptionsList);
						}else{
							rootCodeMap.put(rs.getString("SCREEN_CODE")+"_"+rs
									.getString("PLATFORM"),
									rs.getString("SCREEN_DESC"));
						}
					}
				param.setManageMenuMap(menuOptionsMap);
				param.setRootCodeMap(rootCodeMap);
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
				//con.close();
		}
	}

	private static String buildQueryForActityCodeMaster() {
		LOGGER.info(" buildQueryForActityCodeMaster inside ");
		/*
		 * StringBuffer screenCodeSelect = null; StringBuffer screenCodeFrom =
		 * null; StringBuffer screenCodeWhere = null;
		 */
		StringBuffer functionCodeSelect = null;
		StringBuffer functionCodeFrom = null;
		StringBuffer functionCodeWhere = null;
		String query = "";

		/*
		 * screenCodeSelect = new StringBuffer(
		 * "( SELECT screen_mas.screen_code, screen_mas.screen_desc,screen_mas.root_code as PARENT_SCREEN_CODE,'SC' as ACTIVITY "
		 * ); screenCodeFrom = new
		 * StringBuffer(" FROM screen_master screen_mas "); screenCodeWhere =
		 * new StringBuffer(" WHERE root_code IS NOT NULL )");
		 */

		functionCodeSelect = new StringBuffer(
				" SELECT function_mas.function_code screen_code,function_mas.func_desc screen_desc,function_mas.root_code as PARENT_SCREEN_CODE,function_mas.platform AS platform,'FC' as ACTIVITY ");
		functionCodeFrom = new StringBuffer(" FROM "
				+ Constants.SCREEN_FUNCTION_MASTER + " function_mas ");
		functionCodeWhere = new StringBuffer(
				//" WHERE function_mas.function_code IS NOT NULL AND root_code IS NOT NULL ");
				" WHERE function_mas.function_code IS NOT NULL and function_mas.ISACTIVE=1 ");
		query = functionCodeSelect.append(functionCodeFrom)
				.append(functionCodeWhere)
				//.append(" order by PARENT_SCREEN_CODE ").toString();
				.append(" order by PARENT_SCREEN_CODE NULLS FIRST,screen_desc ").toString();
		LOGGER.info(" buildQueryForActityCodeMaster query _" + query);
		LOGGER.info(" buildQueryForActityCodeMaster inside ");
		return query;
	}

	private static String buildQueryForDeleteStoreSettings(
			ActivityOptions activityOpt) {
		String deleteStatement = "";
		StringBuffer levelList = null;
		StringBuffer roleList = null;
		StringBuffer codeList = null;
		//StringBuffer deleteSelect = new StringBuffer(" delete ");
		// changed for central cache sync issue
		StringBuffer deleteSelect = new StringBuffer(" update ");
		StringBuffer deleteFrom = new StringBuffer("  "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");
		StringBuffer deleteWhere = new StringBuffer(" set isactive = '0' , CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where ");
		deleteWhere
				.append(" NGBO_FUNC.SALES_ORG=?  and NGBO_FUNC.INCLUDE_EXCLUDE_FLAG = ? ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			LOGGER.info("roleList" + roleList.toString());
			deleteWhere.append(" and NGBO_FUNC.role_id in("
					+ roleList.toString() + ") ");
		}
		if (activityOpt.getLevelList() != null
				&& activityOpt.getLevelList().size() > 0) {
			for (String level : activityOpt.getLevelList())
				if (levelList == null) {
					levelList = new StringBuffer("'" + level + "'");
				} else {
					levelList.append(",'").append(level).append("'");
				}
			LOGGER.info("level list" + levelList.toString());
			deleteWhere.append(" and NGBO_FUNC.ACCESS_LEVEL in("
					+ levelList.toString() + ") ");
		}

		if (activityOpt.getCodeList() != null
				&& activityOpt.getCodeList().size() > 0) {
			for (String code : activityOpt.getCodeList())
				if (codeList == null) {
					codeList = new StringBuffer("'" + code + "'");
				} else {
					codeList.append(",'").append(code).append("'");
				}
			LOGGER.info("codeList list" + codeList.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeList.toString() + ") ");
		}
		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		LOGGER.info("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	public static String deleteStoreSettings(String userId,
			ActivityOptions activityOpt) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		String deleteStatement = buildQueryForDeleteStoreSettings(activityOpt);

		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, activityOpt.getSalesOrg());
			stmt.setString(2, activityOpt.getIncludeExcludeFlag());

			result = stmt.executeUpdate();
			if (result > 0)
				return "true";
			else
				return "false";

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
				//con.close();
		}
	}

	public static String copySettingsToRoles(String userId,
			ActivityOptions activityOpt) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		String insertStatement = buildQueryCopyRoleSettings(activityOpt, userId);

		String deleteStatement = buildQueryForDeleteSettingsForReplicate(activityOpt);

		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, activityOpt.getSalesOrg());

			if (activityOpt.getCode() != null
					&& !activityOpt.getCode().equals("")) {
				stmt.setString(2, activityOpt.getCode());
			}
			result = stmt.executeUpdate();

			stmt = con.prepareStatement(insertStatement);

			if (activityOpt.getRoleList() != null
					&& !activityOpt.getRoleList().equals(""))
				for (String role : activityOpt.getRoleList()) {
					stmt.setString(1, role);
					result = stmt.executeUpdate();
				}
			if (result > 0) {
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

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
				//con.close();
		}
	}

	private static String buildQueryCopyRoleSettings(
			ActivityOptions activityOpt, String userId) {
		String selectStatement = "";
		StringBuffer levelList = null;
		StringBuffer codeList = null;

		StringBuffer select = new StringBuffer(
				" select NGBO_FUNCTION_EXCLUDE_SEQ.nextVal,ACCESS_FLAG,ACCESS_LEVEL,'"
						+ userId + "',sysdate,FUNCTION_CODE, ")
				.append(" INCLUDE_EXCLUDE_FLAG,?,'" + activityOpt.getSalesOrg()
						+ "',SCREEN_FUNCTION_FLAG,STORE ");

		StringBuffer from = new StringBuffer(" from "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");

		StringBuffer where = new StringBuffer(" where isactive = '1' and ");
		where.append(" NGBO_FUNC.SALES_ORG= ").append("'")
				.append(activityOpt.getSalesOrg()).append("' ");

		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ");
		insertStatement
				.append(" INTO "
						+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
								(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE))
						+ " (SEQ_NUMBER,ACCESS_FLAG,ACCESS_LEVEL,CREATED_USER,CREATE_DATE,FUNCTION_CODE, ")
				.append(" INCLUDE_EXCLUDE_FLAG,ROLE_ID,SALES_ORG,SCREEN_FUNCTION_FLAG,STORE) ");

		LOGGER.info("insert query" + insertStatement.toString());
		if (activityOpt.getRoleId() != null
				&& !activityOpt.getRoleId().equals("")) {
			where.append(" and NGBO_FUNC.role_id in('"
					+ activityOpt.getRoleId() + "') ");
		}
		if (activityOpt.getLevelList() != null
				&& activityOpt.getLevelList().size() > 0) {
			for (String level : activityOpt.getLevelList())
				if (levelList == null) {
					levelList = new StringBuffer("'" + level + "'");
				} else {
					levelList.append(",'").append(level).append("'");
				}
			LOGGER.info("level list" + levelList.toString());
			where.append(" and NGBO_FUNC.ACCESS_LEVEL in("
					+ levelList.toString() + ") ");
		}

		if (activityOpt.getCodeList() != null
				&& activityOpt.getCodeList().size() > 0) {
			for (String code : activityOpt.getCodeList())
				if (codeList == null) {
					codeList = new StringBuffer("'" + code + "'");
				} else {
					codeList.append(",'").append(code).append("'");
				}
			LOGGER.info("codeList list" + codeList.toString());
			where.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeList.toString() + ") ");
		}
		selectStatement = select.append(from).append(where).toString();

		LOGGER.info("selectStatement _" + selectStatement);
		insertStatement.append(selectStatement).toString();

		LOGGER.info("selectStatement _ insertStatement"
				+ insertStatement.toString());
		return insertStatement.toString();
	}

	/* XPSNV - Code modified for Security enhancements - Begin */
	public static String saveAllRoleSettings(String userId,
			ActivityOptions activityOpt) throws Exception {
		ArrayList<ActivityOptions> activityOptionsList = activityOpt
				.getActivityOptionsList();

		ArrayList<ActivityOptions> deletedActivityOptionList = new ArrayList<ActivityOptions>();
		ActivityOptions deleteActivityOptions = new ActivityOptions();

		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		int result1 = 0;
		int deleteRecordCount = 0;
		int insertRecordCount = 0;
		String deleteStatement = null;

		ResultSet rs = null;

		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ");
		insertStatement
				.append(" INTO ");
		if(activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)){
			insertStatement.append(Constants.NGBO_FUNCTION_EXCLUDE_RF);
		}else{
			insertStatement.append(Constants.NGBO_FUNCTION_EXCLUDE);
		}
		insertStatement
							.append(" (SEQ_NUMBER,ACCESS_FLAG,ACCESS_LEVEL,CREATED_USER,CREATE_DATE,FUNCTION_CODE, ")
				.append(" INCLUDE_EXCLUDE_FLAG,ROLE_ID,SALES_ORG,SCREEN_FUNCTION_FLAG,STORE) VALUES (NGBO_FUNCTION_EXCLUDE_SEQ.nextVal,?,?,'"
						+ userId + "',sysdate,?,?,?,?,?,?)");

		LOGGER.info("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {

			// SELECT THE UNCHECKED ITEM FOR all ROLES, level 1
			deleteStatement = buildQueryForAllRoleDeleteSettings(activityOpt,
					activityOpt.getCheckedLevelList(), null);

			stmt = con.prepareStatement(deleteStatement);
			stmt.setString(1, activityOpt.getSalesOrg());
			/*
			 * if (activityOpt.getCode() != null &&
			 * !activityOpt.getCode().equals("")) { stmt.setString(2,
			 * activityOpt.getCode()); }
			 */

			// result = stmt.executeUpdate();
			rs = stmt.executeQuery();

			while (rs != null && rs.next()) {

				deleteActivityOptions = new ActivityOptions();

				if (rs.getString("SALES_ORG") != null
						&& !rs.getString("SALES_ORG").isEmpty()) {
					deleteActivityOptions
							.setSalesOrg(rs.getString("SALES_ORG"));
				} else {
					deleteActivityOptions.setSalesOrg("");
				}
				if (rs.getString("ROLE_ID") != null
						&& !rs.getString("ROLE_ID").isEmpty()) {
					deleteActivityOptions.setRoleId(rs.getString("ROLE_ID"));
				} else {
					deleteActivityOptions.setRoleId("");
				}
				if (rs.getString("STORE") != null
						&& !rs.getString("STORE").isEmpty()) {
					deleteActivityOptions.setSiteNo(rs.getString("STORE"));
				} else {
					deleteActivityOptions.setSiteNo("");
				}
				if (rs.getString("INCLUDE_EXCLUDE_FLAG") != null
						&& !rs.getString("INCLUDE_EXCLUDE_FLAG").isEmpty()) {
					deleteActivityOptions.setIncludeExcludeFlag(rs
							.getString("INCLUDE_EXCLUDE_FLAG"));
				} else {
					deleteActivityOptions.setIncludeExcludeFlag("");
				}
				if (rs.getString("ACCESS_FLAG") != null
						&& !rs.getString("ACCESS_FLAG").isEmpty()) {
					deleteActivityOptions.setAccessFlag(rs
							.getString("ACCESS_FLAG"));
				} else {
					deleteActivityOptions.setAccessFlag("");
				}
				if (rs.getString("FUNCTION_CODE") != null
						&& !rs.getString("FUNCTION_CODE").isEmpty()) {
					deleteActivityOptions
							.setCode(rs.getString("FUNCTION_CODE"));
				} else {
					deleteActivityOptions.setCode("");
				}
				if (rs.getString("SCREEN_FUNCTION_FLAG") != null
						&& !rs.getString("SCREEN_FUNCTION_FLAG").isEmpty()) {
					deleteActivityOptions.setScreenFunctionFlag(rs
							.getString("SCREEN_FUNCTION_FLAG"));
				} else {
					deleteActivityOptions.setScreenFunctionFlag("");
				}
				if (rs.getString("ACCESS_LEVEL") != null
						&& !rs.getString("ACCESS_LEVEL").isEmpty()) {
					deleteActivityOptions.setAccessLevel(rs
							.getString("ACCESS_LEVEL"));
				} else {
					deleteActivityOptions.setAccessLevel("");
				}

				deletedActivityOptionList.add(deleteActivityOptions);
			}

			ArrayList<ActivityOptions> insertActivityList = new ArrayList<ActivityOptions>(
					activityOptionsList);
			ArrayList<ActivityOptions> insertDeletedList = new ArrayList<ActivityOptions>(
					deletedActivityOptionList);

			ArrayList<ActivityOptions> removeActivityList = new ArrayList<ActivityOptions>(
					activityOptionsList);
			ArrayList<ActivityOptions> removeDeletedList = new ArrayList<ActivityOptions>(
					deletedActivityOptionList);

			LOGGER.info("activityOptionsList-->"
					+ Constants.convertToJsonString(activityOptionsList));
			LOGGER.info("deletedActivityOptionList-->"
					+ Constants.convertToJsonString(deletedActivityOptionList));

			insertActivityList.removeAll(insertDeletedList);
			removeDeletedList.removeAll(removeActivityList);

			StringBuffer newDeleteStatement = new StringBuffer();

			if (removeDeletedList != null && removeDeletedList.size() > 0) {

				for (ActivityOptions activityOptions : removeDeletedList) {

					//newDeleteStatement.append("DELETE FROM ");
					// changed for central cache sync issue
					newDeleteStatement.append(" update ");
					if(activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)){
						newDeleteStatement.append(Constants.NGBO_FUNCTION_EXCLUDE_RF);
					}else{
						newDeleteStatement.append(Constants.NGBO_FUNCTION_EXCLUDE);
					}
					// changed for central cache sync issue
					//newDeleteStatement.append(" WHERE ");
					newDeleteStatement.append(" set ISACTIVE = '0' , CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  WHERE ");
					// MANDATORY FIELD SALES ORG
					if (activityOptions.getSalesOrg() != null
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"")
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" SALES_ORG = '"
								+ activityOptions.getSalesOrg() + "'");
					}

					// MANDATORY FIELD ROLE ID
					if (activityOptions.getRoleId() != null
							&& !activityOptions.getRoleId()
									.equalsIgnoreCase("")
							&& !activityOptions.getRoleId().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" AND ROLE_ID = '"
								+ activityOptions.getRoleId() + "'");
					}

					// NOT A MANDATORY FIELD STORE
					if (activityOptions.getSiteNo() != null
							&& !activityOptions.getSiteNo()
									.equalsIgnoreCase("")
							&& !activityOptions.getSiteNo().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" AND STORE = '"
								+ activityOptions.getSiteNo() + "'");
					}

					// MANDATORY FIELD INCLUDE OR EXCLUDE FLAG FOR STORE
					if (activityOptions.getIncludeExcludeFlag() != null
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("null")) {
						newDeleteStatement
								.append(" AND INCLUDE_EXCLUDE_FLAG = '"
										+ activityOptions
												.getIncludeExcludeFlag() + "'");
					}

					// NOT A MANDATORY FIELD ACCESS FLAG
					if (activityOptions.getAccessFlag() != null
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("null")) {
						newDeleteStatement.append(" AND ACCESS_FLAG = '"
								+ activityOptions.getAccessFlag() + "'");
					}

					// MANDATORY FIELDS FUNCTION CODE
					if (activityOptions.getCode() != null
							&& !activityOptions.getCode().equalsIgnoreCase("")
							&& !activityOptions.getCode().equalsIgnoreCase(
									"null")) {
						newDeleteStatement.append(" AND FUNCTION_CODE = '"
								+ activityOptions.getCode() + "'");
					}

					// NOT A MANDATORY FIELD SCREEN_FUNCTION_FLAG
					if (activityOptions.getScreenFunctionFlag() != null
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("null")) {
						newDeleteStatement
								.append(" AND SCREEN_FUNCTION_FLAG = '"
										+ activityOptions
												.getScreenFunctionFlag() + "'");
					}

					// MANDATORY FIELDS ACCESS LEVEL
					if (activityOptions.getAccessLevel() != null
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("null")) {
						newDeleteStatement.append(" AND ACCESS_LEVEL = '"
								+ activityOptions.getAccessLevel() + "'");
					}

					System.out
							.println("new delete query " + newDeleteStatement);
					stmt = con.prepareStatement(newDeleteStatement.toString());
					result1 = stmt.executeUpdate();
					newDeleteStatement = new StringBuffer();
					deleteRecordCount++;
				}

				if (activityOpt.getUnCheckedCodeList() != null
						&& activityOpt.getUnCheckedCodeList().size() > 0) {
					// DELETE THE UNCHECKED ITEM FOR ALL ROLES, level 2 AND 3
					deleteStatement = buildQueryForAllRoleDeleteSettingsNew(
							activityOpt, activityOpt.getUnCheckedLevelList(),
							activityOpt.getUnCheckedCodeList());
					stmt = con.prepareStatement(deleteStatement);
					stmt.setString(1, activityOpt.getSalesOrg());
					// result = stmt.executeUpdate();
					rs = stmt.executeQuery();
				}
			}

			if (result1 != 0) {
				System.out
						.println("Using All Roles - Number of Records deleted from NGBO_FUNCTION_EXCLUDE table : "
								+ deleteRecordCount);
			} else {
				System.out
						.println("Using All Roles - Number of Records deleted from NGBO_FUNCTION_EXCLUDE table : "
								+ deleteRecordCount);
			}

			/*
			 * Insert the values if it is not available in database and provided
			 * from user
			 */

			stmt = con.prepareStatement(insertStatement.toString());
			if (insertActivityList != null && insertActivityList.size() > 0) {
				for (ActivityOptions activityOptions : insertActivityList) {

					// NOT A MANDATORY FIELD ACCESS FLAG
					if (activityOptions.getAccessFlag() != null
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessFlag()
									.equalsIgnoreCase("null")) {
						stmt.setString(1, Constants.READ_ACCESS);
					} else {
						stmt.setString(1, "");
					}

					// MANDATORY FIELDS ACCESS LEVEL
					if (activityOptions.getAccessLevel() != null
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("")
							&& !activityOptions.getAccessLevel()
									.equalsIgnoreCase("null")) {
						stmt.setString(2, activityOptions.getAccessLevel());
					}
					// MANDATORY FIELDS FUNCTION CODE
					if (activityOptions.getCode() != null
							&& !activityOptions.getCode().equalsIgnoreCase("")
							&& !activityOptions.getCode().equalsIgnoreCase(
									"null")) {
						stmt.setString(3, activityOptions.getCode());
					}

					// MANDATORY FIELD INCLUDE OR EXCLUDE FLAG FOR STORE
					if (activityOptions.getIncludeExcludeFlag() != null
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getIncludeExcludeFlag()
									.equalsIgnoreCase("null")) {
						stmt.setString(4,
								activityOptions.getIncludeExcludeFlag());
					} else {
						stmt.setString(4, "");
					}

					// MANDATORY FIELD ROLE ID
					if (activityOptions.getRoleId() != null
							&& !activityOptions.getRoleId()
									.equalsIgnoreCase("")
							&& !activityOptions.getRoleId().equalsIgnoreCase(
									"null")) {
						stmt.setString(5, activityOptions.getRoleId());
					} else {
						stmt.setString(5, "");
					}

					// MANDATORY FIELD SALES ORG
					if (activityOptions.getSalesOrg() != null
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"")
							&& !activityOptions.getSalesOrg().equalsIgnoreCase(
									"null")) {
						stmt.setString(6, activityOptions.getSalesOrg());
					}

					// NOT A MANDATORY FIELD SCREEN_FUNCTION_FLAG
					if (activityOptions.getScreenFunctionFlag() != null
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("")
							&& !activityOptions.getScreenFunctionFlag()
									.equalsIgnoreCase("null")) {
						stmt.setString(7,
								activityOptions.getScreenFunctionFlag());
					} else {
						stmt.setString(7, Constants.SCREEN_FLAG);
					}

					// NOT A MANDATORY FIELD STORE
					if (activityOptions.getSiteNo() != null
							&& !activityOptions.getSiteNo()
									.equalsIgnoreCase("")
							&& !activityOptions.getSiteNo().equalsIgnoreCase(
									"null")) {
						stmt.setString(8, activityOptions.getSiteNo());
					} else {
						stmt.setString(8, "");
					}

					result = stmt.executeUpdate();
					insertRecordCount++;
				}
			}
			if (result != 0 || result1 != 0) {
				System.out
						.println("Using All Roles - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
								+ insertRecordCount);
				return "true";
			} else {
				System.out
						.println("Using All Roles - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
								+ insertRecordCount);
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
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
			//con.close();
		}
	}

	private static String buildQueryForAllRoleDeleteSettingsNew(
			ActivityOptions activityOpt, ArrayList<String> levelList,
			ArrayList<String> codeList) {
		String deleteStatement = "";
		StringBuffer levelQuery = null;
		StringBuffer roleList = null;
		StringBuffer codeQuery = null;
		// StringBuffer deleteSelect = new StringBuffer(" delete ");
		// changed for central cache sync issue
		//StringBuffer deleteSelect = new StringBuffer("DELETE ");
		//StringBuffer deleteFrom = new StringBuffer(" from "
		StringBuffer deleteSelect = new StringBuffer(" update ");
		StringBuffer deleteFrom = new StringBuffer("  "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
					(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE))
				+ " NGBO_FUNC ");
		StringBuffer deleteWhere = new StringBuffer(" set isactive = '0' , CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			LOGGER.info("roleList" + roleList.toString());
			deleteWhere.append(" and NGBO_FUNC.role_id in("
					+ roleList.toString() + ") ");
		}
		if (levelList != null && levelList.size() > 0) {
			for (String level : levelList)
				if (levelQuery == null) {
					levelQuery = new StringBuffer("'" + level + "'");
				} else {
					levelQuery.append(",'").append(level).append("'");
				}
			LOGGER.info("level list" + levelQuery.toString());
			deleteWhere.append(" and NGBO_FUNC.ACCESS_LEVEL in("
					+ levelQuery.toString() + ") ");
		}

		if (codeList != null && codeList.size() > 0) {
			for (String code : codeList)
				if (codeQuery == null) {
					codeQuery = new StringBuffer("'" + code + "'");
				} else {
					codeQuery.append(",'").append(code).append("'");
				}
			LOGGER.info("level list" + codeQuery.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeQuery.toString() + ") ");
		}

		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		LOGGER.info("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	/* XPSNV - Code modified for Security enhancements - End */

	private static String buildQueryForAllRoleDeleteSettings(
			ActivityOptions activityOpt, ArrayList<String> levelList,
			ArrayList<String> codeList) {
		String deleteStatement = "";
		StringBuffer levelQuery = null;
		StringBuffer roleList = null;
		StringBuffer codeQuery = null;

		/* XPSNV - Code commented and modified for Security enhancements - Begin */

		// StringBuffer deleteSelect = new StringBuffer(" delete ");
		StringBuffer deleteSelect = new StringBuffer(" select * ");
		/* XPSNV - Code commented and modified for Security enhancements - End */

		StringBuffer deleteFrom = new StringBuffer(" from "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");
		//StringBuffer deleteWhere = new StringBuffer(" where ");
		//changed for centra cache sync issue
		StringBuffer deleteWhere = new StringBuffer(" where ISACTIVE = '1' and ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			LOGGER.info("roleList" + roleList.toString());
			deleteWhere.append(" and NGBO_FUNC.role_id in("
					+ roleList.toString() + ") ");
		}
		if (levelList != null && levelList.size() > 0) {
			for (String level : levelList)
				if (levelQuery == null) {
					levelQuery = new StringBuffer("'" + level + "'");
				} else {
					levelQuery.append(",'").append(level).append("'");
				}
			LOGGER.info("level list" + levelQuery.toString());
			deleteWhere.append(" and NGBO_FUNC.ACCESS_LEVEL in("
					+ levelQuery.toString() + ") ");
		}

		if (codeList != null && codeList.size() > 0) {
			for (String code : codeList)
				if (codeQuery == null) {
					codeQuery = new StringBuffer("'" + code + "'");
				} else {
					codeQuery.append(",'").append(code).append("'");
				}
			LOGGER.info("level list" + codeQuery.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeQuery.toString() + ") ");
		}

		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		LOGGER.info("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	private static String buildQueryForDeleteSettingsForReplicate(
			ActivityOptions activityOpt) {
		String deleteStatement = "";
		StringBuffer levelList = null;
		StringBuffer roleList = null;
		StringBuffer codeList = null;
		//StringBuffer deleteSelect = new StringBuffer(" delete ");
		StringBuffer deleteSelect = new StringBuffer(" update ");
		//StringBuffer deleteFrom = new StringBuffer(" from "
		StringBuffer deleteFrom = new StringBuffer("  "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");
		StringBuffer deleteWhere = new StringBuffer(" set isactive = '0' , CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')  where ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			LOGGER.info("roleList" + roleList.toString());
			deleteWhere.append(" and NGBO_FUNC.role_id in("
					+ roleList.toString() + ") ");
		}
		if (activityOpt.getLevelList() != null
				&& activityOpt.getLevelList().size() > 0) {
			for (String level : activityOpt.getLevelList())
				if (levelList == null) {
					levelList = new StringBuffer("'" + level + "'");
				} else {
					levelList.append(",'").append(level).append("'");
				}
			LOGGER.info("level list" + levelList.toString());
			deleteWhere.append(" and NGBO_FUNC.ACCESS_LEVEL in("
					+ levelList.toString() + ") ");
		}
		if (activityOpt.getCodeList() != null
				&& activityOpt.getCodeList().size() > 0) {
			for (String code : activityOpt.getCodeList())
				if (codeList == null) {
					codeList = new StringBuffer("'" + code + "'");
				} else {
					codeList.append(",'").append(code).append("'");
				}
			LOGGER.info("codeList list" + codeList.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeList.toString() + ") ");
		}
		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		LOGGER.info("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	public static ArrayList<ActivityOptions> getAllApplicationCodes(
			String query) throws SQLException {

		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;
		ArrayList<ActivityOptions> results=new ArrayList<ActivityOptions>();
		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			while (rs.next()) {
				ActivityOptions itm=new ActivityOptions();
				itm.setCode(rs.getString("function_code"));
				itm.setDescription(rs.getString("func_desc"));
				itm.setRoleId(rs.getString("role_id"));
				itm.setIncludeExcludeFlag(rs.getString("include_exclude_flag"));
				itm.setRoleDesc(rs.getString("role_desc"));
				itm.setAccessFlag(rs.getString("access_flag"));
				results.add(itm);
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return results;

	}

	public static boolean insertAllSettings(ArrayList<String> insetQryList) throws SQLException {
		boolean flag=true;
		Connection con = null;
		Statement stmt = null;
		try {

			con = DatabaseUtil.getConnection();
			stmt = con.createStatement(ResultSet.TYPE_SCROLL_SENSITIVE,
				      ResultSet.CONCUR_UPDATABLE);
			for(String qry:insetQryList){
				stmt.addBatch(qry);
			}
			stmt.executeBatch();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return flag;

	}


	public static void backupAppSettings(String string) throws SQLException {
		Connection con = null;
		PreparedStatement stmt = null;
		try {
			con = DatabaseUtil.getConnection();
			stmt=con.prepareStatement("drop table "+string);
			try{
				stmt.executeUpdate();
			}catch(Exception e){
				//ignore if table not exist
			}
			stmt=con.prepareStatement("CREATE TABLE "+string+" ( MANDT NVARCHAR2(3) DEFAULT 200 NOT NULL ENABLE, SEQ_NUMBER NUMBER(15,0) NOT NULL ENABLE, SALES_ORG NVARCHAR2(20) NOT NULL ENABLE, ROLE_ID NVARCHAR2(20), STORE NVARCHAR2(20), INCLUDE_EXCLUDE_FLAG NVARCHAR2(4), CREATE_DATE DATE, CREATED_USER NVARCHAR2(20), ACCESS_FLAG NVARCHAR2(4), FUNCTION_CODE NVARCHAR2(20) NOT NULL ENABLE, SCREEN_FUNCTION_FLAG NVARCHAR2(4), ACCESS_LEVEL NVARCHAR2(4), CHANGED_TS NUMBER(15,0) DEFAULT TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') NOT NULL ENABLE, ISACTIVE NVARCHAR2(1) DEFAULT 1 )");
			try{
				stmt.executeUpdate();
			}catch(Exception e){
				//ignore if table not exist
			}
			stmt=con.prepareStatement("insert into "+string+" select * FROM NGBO_FUNCTION_EXCLUDE");
			try{
				stmt.executeUpdate();
			}catch(Exception e){
				//ignore if table not exist
			}
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

	}

	public static void updateBackupStatus(String backupBy) throws SQLException {
		Connection con = null;
		PreparedStatement stmt = null;
		try {
			String qry="insert into APP_SETTINGS_BKUP_INFO(BACKUP_DATE_TIME,BACKUP_BY) values(sysdate,'"+backupBy+"')";
			con= DatabaseUtil.getConnection();
			stmt=con.prepareStatement(qry);
			stmt.executeUpdate();
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

	}
	
	public static boolean checkIfBackupDone() throws SQLException {
		boolean flag=false;
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs=null;
		try {
			String qry="select count(1) exist_bkup from APP_SETTINGS_BKUP_INFO where trunc(BACKUP_DATE_TIME)=trunc(sysdate)";
			con= DatabaseUtil.getConnection();
			stmt=con.prepareStatement(qry);
			rs=stmt.executeQuery();
			while(rs.next()){
				if(rs.getInt(1)>=1){
					flag=true;
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return flag;

	}
	public static boolean generateCheckpoint(ReplicateParam param) throws SQLException {
		// TODO Auto-generated method stub
		boolean flag=false;
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs=null;
		ArrayList<String> queryList=new ArrayList<String>();
		try {
			String qry="select 'Insert into NGBO_FUNCTION_EXCLUDE (MANDT,SEQ_NUMBER,SALES_ORG,ROLE_ID,STORE,INCLUDE_EXCLUDE_FLAG,CREATE_DATE,CREATED_USER,ACCESS_FLAG,FUNCTION_CODE,SCREEN_FUNCTION_FLAG,ACCESS_LEVEL,CHANGED_TS,ISACTIVE) values ('||MANDT||','||SEQ_NUMBER||','||SALES_ORG||','||ROLE_ID||','||STORE||','||INCLUDE_EXCLUDE_FLAG||','||CREATE_DATE||','||CREATED_USER||','||ACCESS_FLAG||','||FUNCTION_CODE||','||SCREEN_FUNCTION_FLAG||','||ACCESS_LEVEL||','||CHANGED_TS||','||ISACTIVE||')' from ngbo_function_exclude where access_level='3' and isactive=1";
			con= DatabaseUtil.getConnection();
			stmt=con.prepareStatement(qry);
			rs=stmt.executeQuery();
			while(rs.next()){
				queryList.add(rs.getString(1));
			}
			flag=true;
			param.setQueryList(queryList);
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return flag;
	}

}
