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
import au.com.woolworths.portal.model.Notification;
import au.com.woolworths.portal.param.NotificationParam;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class NotificationSettingDAOImpl {
	
	private static final Logger log = Logger.getLogger(NotificationSettingDAOImpl.class
			.getName());

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
					// System.out.println("menuBarOptions.size()"
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
		StringBuffer deleteWhere = new StringBuffer(" where ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			System.out.println("roleList" + roleList.toString());
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
			System.out.println("level list" + levelList.toString());
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
				System.out.println("codeList list" + codeList.toString());
				deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
						+ codeList.toString() + ") ");
			}
		}
		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		System.out.println("deleteStatement _" + deleteStatement);

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

		System.out.println("insert query" + insertStatement.toString());

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

			System.out.println("activityOptionsList-->"
					+ Constants.convertToJsonString(activityOptionsList));
			System.out.println("deletedActivityOptionList-->"
					+ Constants.convertToJsonString(deletedActivityOptionList));

			insertActivityList.removeAll(insertDeletedList);
			removeDeletedList.removeAll(removeActivityList);

			StringBuffer newDeleteStatement = new StringBuffer();

			if (removeDeletedList != null && removeDeletedList.size() > 0) {

				for (ActivityOptions activityOptions : removeDeletedList) {
					
//					if(activityOpt.getAccessLevel()!=null && activityOpt.getAccessLevel().equalsIgnoreCase("3") 
//							&& activityOptions.getAccessLevel()!=null && activityOptions.getAccessLevel().equalsIgnoreCase("2")) continue;

					newDeleteStatement.append("DELETE FROM ");
					newDeleteStatement.append(((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
							(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE))
							+ " WHERE ");
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
			System.out.println("insertStatement.toString()="
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
			 * if (result != 0 || result1 != 0) { System.out.println(
			 * "Using UpdateAll Settings - Number of Records inserted into NGBO_FUNCTION_EXCLUDE table : "
			 * + insertRecordCount); return "true"; } else { System.out.println(
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
		}
	}

	/* XPSNV - Code modified for Security enhancements - End */

	public static Map<String, ArrayList<Notification>> getNotificationDetail(
			String query, ActivityOptions activityOptions) throws Exception {
		System.out.println(" getSalesOrgExcludeDetail inside ");
		Map<String, ArrayList<Notification>> activityOptionsMap = null;
		ArrayList<Notification> activityOptionsList = null;
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		PreparedStatement stmt = null;
		System.out.println("getSalesOrgExcludeDetailquery" + query);
		try {

			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();
			if (rs != null) {
				activityOptionsMap = new LinkedHashMap<String, ArrayList<Notification>>();
				while (rs.next()) {
					if (rs.getString("NOTIFY_ID") != null)
						if (activityOptionsMap.containsKey(rs
								.getString("NOTIFY_ID"))) {							
							if(null!=rs.getString("dept") && null!=rs.getString("role") && rs.getString("role").equalsIgnoreCase(activityOptions.getRoleId())){
								if(!activityOptionsMap.get(rs
										.getString("NOTIFY_ID")).get(0).getDepts().contains(rs.getString("dept")))
								activityOptionsMap.get(rs
										.getString("NOTIFY_ID")).get(0).getDepts().add(rs.getString("dept"));
							}
							
							if(null!=rs.getString("role")){
								activityOptionsMap.get(rs
										.getString("NOTIFY_ID")).get(0).getRoles().add(rs.getString("ack_req")+"-"+rs.getString("role"));
							}								
						} else {
							activityOptionsList = new ArrayList<Notification>();
							Notification itm=new Notification();
							itm.setDepts(new ArrayList<String>());
							itm.setRoles(new ArrayList<String>());
							itm.setNotifyId(rs.getString("NOTIFY_ID"));
							itm.setPriority(rs.getString("priority"));
							itm.setAckReq(rs.getString("ack_req"));
							itm.setLevel(rs.getString("SORG_LEVEL"));
							itm.setRole(rs.getString("role"));
							if(null!=rs.getString("dept") && null!=rs.getString("role") && rs.getString("role").equalsIgnoreCase(activityOptions.getRoleId()))
								itm.getDepts().add(rs.getString("dept"));
							if(null!=rs.getString("role"))
								itm.getRoles().add(rs.getString("ack_req")+"-"+rs.getString("role"));
							activityOptionsList.add(itm);
							activityOptionsMap.put(rs.getString("NOTIFY_ID"),
									activityOptionsList);
						}
					
				}
				System.out.println(" getSalesOrgExcludeDetail outside ");
				return activityOptionsMap;
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
		}
		System.out.println(" getSalesOrgExcludeDetail outside ");
		return null;
	}

	public static void getNotificationSettingsDetail(NotificationParam param)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		LinkedHashMap<String, ArrayList<Notification>> noticationMap = null;
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
				noticationMap = new LinkedHashMap<String, ArrayList<Notification>>();
				rootCodeMap = new LinkedHashMap<String, String>();
				ArrayList<Notification> menuOptionsList = null;
				while (rs.next()) {
						if (rs.getString("NOTIFY_ID") != null){
							if (noticationMap.containsKey(rs
									.getString("NOTIFY_ID"))) {
								menuOptionsList = noticationMap.get(rs
										.getString("NOTIFY_ID"));
								Notification not=new Notification();
								not.setNotifyId(rs.getString("NOTIFY_ID"));
								not.setNotifyDesc(rs.getString("notification_desc"));
								not.setNotifyTitle(rs.getString("notification_title"));
								menuOptionsList.add(not);
							} else {
								menuOptionsList = new ArrayList<Notification>();
								Notification not=new Notification();
								not.setNotifyId(rs.getString("NOTIFY_ID"));
								not.setNotifyDesc(rs.getString("notification_desc"));
								not.setNotifyTitle(rs.getString("notification_title"));
								menuOptionsList.add(not);
							}
							noticationMap.put(rs.getString("NOTIFY_ID"),
									menuOptionsList);
						}else{
							rootCodeMap.put(rs.getString("NOTIFY_ID"),
									rs.getString("notification_desc"));
						}
					}
				param.setManageMenuMap(noticationMap);
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
		}
	}

	private static String buildQueryForActityCodeMaster() {
		System.out.println(" buildQueryForActityCodeMaster inside ");
		/*
		 * StringBuffer screenCodeSelect = null; StringBuffer screenCodeFrom =
		 * null; StringBuffer screenCodeWhere = null;
		 */
		StringBuffer functionCodeSelect = null;
		StringBuffer functionCodeFrom = null;
		String query = "";

		/*
		 * screenCodeSelect = new StringBuffer(
		 * "( SELECT screen_mas.screen_code, screen_mas.screen_desc,screen_mas.root_code as PARENT_SCREEN_CODE,'SC' as ACTIVITY "
		 * ); screenCodeFrom = new
		 * StringBuffer(" FROM screen_master screen_mas "); screenCodeWhere =
		 * new StringBuffer(" WHERE root_code IS NOT NULL )");
		 */

		functionCodeSelect = new StringBuffer(
				"select MAS.NOTIFY_ID,MAS.NOTIFICATION_DESC,MAS.NOTIFICATION_TITLE ");
		functionCodeFrom = new StringBuffer(" FROM "
				+ Constants.NOTIFICATION_MASTER + " MAS ");
		query = functionCodeSelect.append(functionCodeFrom).toString();
		System.out.println(" buildQueryForActityCodeMaster query _" + query);
		System.out.println(" buildQueryForActityCodeMaster inside ");
		return query;
	}

	private static String buildQueryForDeleteStoreSettings(
			ActivityOptions activityOpt) {
		String deleteStatement = "";
		StringBuffer levelList = null;
		StringBuffer roleList = null;
		StringBuffer codeList = null;
		StringBuffer deleteSelect = new StringBuffer(" delete ");
		StringBuffer deleteFrom = new StringBuffer(" from "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");
		StringBuffer deleteWhere = new StringBuffer(" where ");
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
			System.out.println("roleList" + roleList.toString());
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
			System.out.println("level list" + levelList.toString());
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
			System.out.println("codeList list" + codeList.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeList.toString() + ") ");
		}
		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		System.out.println("deleteStatement _" + deleteStatement);

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

		StringBuffer where = new StringBuffer(" where ");
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

		System.out.println("insert query" + insertStatement.toString());
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
			System.out.println("level list" + levelList.toString());
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
			System.out.println("codeList list" + codeList.toString());
			where.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeList.toString() + ") ");
		}
		selectStatement = select.append(from).append(where).toString();

		System.out.println("selectStatement _" + selectStatement);
		insertStatement.append(selectStatement).toString();

		System.out.println("selectStatement _ insertStatement"
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

		System.out.println("insert query" + insertStatement.toString());
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

			System.out.println("activityOptionsList-->"
					+ Constants.convertToJsonString(activityOptionsList));
			System.out.println("deletedActivityOptionList-->"
					+ Constants.convertToJsonString(deletedActivityOptionList));

			insertActivityList.removeAll(insertDeletedList);
			removeDeletedList.removeAll(removeActivityList);

			StringBuffer newDeleteStatement = new StringBuffer();

			if (removeDeletedList != null && removeDeletedList.size() > 0) {

				for (ActivityOptions activityOptions : removeDeletedList) {

					newDeleteStatement.append("DELETE FROM ");
					if(activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)){
						newDeleteStatement.append(Constants.NGBO_FUNCTION_EXCLUDE_RF);
					}else{
						newDeleteStatement.append(Constants.NGBO_FUNCTION_EXCLUDE);
					}
					newDeleteStatement.append(" WHERE ");
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
		StringBuffer deleteSelect = new StringBuffer("DELETE ");
		StringBuffer deleteFrom = new StringBuffer(" from "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
					(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE))
				+ " NGBO_FUNC ");
		StringBuffer deleteWhere = new StringBuffer(" where ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			System.out.println("roleList" + roleList.toString());
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
			System.out.println("level list" + levelQuery.toString());
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
			System.out.println("level list" + codeQuery.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeQuery.toString() + ") ");
		}

		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		System.out.println("deleteStatement _" + deleteStatement);

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
		StringBuffer deleteWhere = new StringBuffer(" where ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			System.out.println("roleList" + roleList.toString());
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
			System.out.println("level list" + levelQuery.toString());
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
			System.out.println("level list" + codeQuery.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeQuery.toString() + ") ");
		}

		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		System.out.println("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	private static String buildQueryForDeleteSettingsForReplicate(
			ActivityOptions activityOpt) {
		String deleteStatement = "";
		StringBuffer levelList = null;
		StringBuffer roleList = null;
		StringBuffer codeList = null;
		StringBuffer deleteSelect = new StringBuffer(" delete ");
		StringBuffer deleteFrom = new StringBuffer(" from "
				+ ((activityOpt.getPlatform()!=null && activityOpt.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " NGBO_FUNC ");
		StringBuffer deleteWhere = new StringBuffer(" where ");
		deleteWhere.append(" NGBO_FUNC.SALES_ORG=?  ");

		if (activityOpt.getRoleList() != null
				&& activityOpt.getRoleList().size() > 0) {
			for (String role : activityOpt.getRoleList())
				if (roleList == null) {
					roleList = new StringBuffer("'" + role + "'");
				} else {
					roleList.append(",'").append(role).append("'");
				}
			System.out.println("roleList" + roleList.toString());
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
			System.out.println("level list" + levelList.toString());
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
			System.out.println("codeList list" + codeList.toString());
			deleteWhere.append(" and NGBO_FUNC.FUNCTION_CODE in("
					+ codeList.toString() + ") ");
		}
		deleteStatement = deleteSelect.append(deleteFrom).append(deleteWhere)
				.toString();

		System.out.println("deleteStatement _" + deleteStatement);

		return deleteStatement;
	}

	public static String saveSettingsForRole(NotificationParam param) throws Exception {
		
		for(Notification itm:param.getToAddList()){
			updateNotification(itm,param);
		}
		
		for(Notification itm:param.getToModifyList()){
			deleteNotification(itm,param);
			updateNotification(itm,param);
		}
		
		for(Notification itm:param.getToRemoveList()){
			deleteNotification(itm,param);
		}
		
		return "success";
	}

	public static String saveSettingsForAllRole(NotificationParam param) throws Exception {
		for(Notification itm:param.getToAddList()){
			insertNotification(itm,param);
		}
		for(Notification itm:param.getToRemoveList()){
			deleteNotification(itm,param);
		}		
		return "success";
	}
	
	private static boolean updateNotification(Notification item,NotificationParam param) throws Exception{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("updateNotification start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("MERGE INTO NOTIFICATION_XREF_SETTINGS notify_settings"
		   +" USING ( select '"+item.getNotifyId()+"' NOTIFY_ID  from dual) a "
		   +" on (notify_settings.NOTIFY_ID = a.NOTIFY_ID and  notify_settings.vkorg = ? and notify_settings.ROLE = ?)"
		   +" WHEN MATCHED THEN "
		   +" UPDATE SET notify_settings.ISACTIVE = '"+Constants.ACTIVE+"' , notify_settings.CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), notify_settings.UPDATED_TM = SYSDATE ,notify_settings.UPDATED_BY = '"+param.getUserId()+"' ,notify_settings.ACK_REQ = '"+item.getAckReq()+"' ,notify_settings.PRIORITY = '"+item.getPriority()+"' WHERE notify_settings.NOTIFY_ID = ? and  notify_settings.vkorg = ? and notify_settings.ROLE = ? "
		   +" WHEN NOT MATCHED THEN "
		   +" INSERT (vkorg,ROLE,NOTIFY_ID,PRIORITY,ACK_REQ,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY,SORG_LEVEL) " 
		   +" VALUES (?,?,?,?,?,sysdate,?,sysdate,?,2)");
		
			
		/*new StringBuffer("Insert into NOTIFICATION_XREF_SETTINGS " +
				"(vkorg,ROLE,NOTIFY_ID,PRIORITY,ACK_REQ,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY,SORG_LEVEL) " +
				"values (?,?,?,?,?,sysdate,?,sysdate,?,2)");*/
		Connection connection=DatabaseUtil.getConnection();
		PreparedStatement stmt=null;
		log.info("query generated --- "+qry.toString());
		int result=0;
		try{
			stmt=connection.prepareStatement(qry.toString());
			
			stmt.setString(1, param.getSaleOrg());
			stmt.setString(2, (param.getRoleId()==null?"-1":param.getRoleId()));
			stmt.setString(3, item.getNotifyId());
			stmt.setString(4, param.getSaleOrg());
			stmt.setString(5, (param.getRoleId()==null?"-1":param.getRoleId()));
			stmt.setString(6, param.getSaleOrg());
			stmt.setString(7, (param.getRoleId()==null?"-1":param.getRoleId()));
			stmt.setString(8, item.getNotifyId());
			stmt.setString(9, item.getPriority());
			stmt.setString(10, item.getAckReq());
			stmt.setString(11, param.getUserId());
			stmt.setString(12, param.getUserId());
			
			
			
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		if(null!=item.getToRemoveDepts() && item.getToRemoveDepts().size()>0){
			removeDepts(item.getToRemoveDepts(), item, param);
		}
		
		if(null!=item.getToAddDepts() && item.getToAddDepts().size()>0){
			insertDepts(item.getToAddDepts(), item, param);
		}
		
		endTime = System.currentTimeMillis();
		log.info("updateNotification end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return true;
	}
	private static boolean insertNotification(Notification item,NotificationParam param) throws SQLException{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertNotification start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("MERGE INTO NOTIFICATION_XREF_SETTINGS notify_settings"
				   +" USING ( select '"+item.getNotifyId()+"' NOTIFY_ID  from dual) a "
				   +" on (notify_settings.NOTIFY_ID = a.NOTIFY_ID and  notify_settings.vkorg = ? and notify_settings.ROLE = '-1')"
				   +" WHEN MATCHED THEN "
				   +" UPDATE SET notify_settings.ISACTIVE = '"+Constants.ACTIVE+"' , notify_settings.CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') WHERE notify_settings.NOTIFY_ID = ? and  notify_settings.vkorg = ? and notify_settings.ROLE = '-1' "
				   +" WHEN NOT MATCHED THEN "
				   +" INSERT (NOTIFY_ID,vkorg,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY,SORG_LEVEL,role) " 
				   +" VALUES (?,?,sysdate,?,sysdate,?,1,'-1')");
		
		/*StringBuffer qry=new StringBuffer("Insert into NOTIFICATION_XREF_SETTINGS " +
				"(NOTIFY_ID,vkorg,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY,SORG_LEVEL,role) " +
				" values (?,?,sysdate,?,sysdate,?,1,'-1')");*/
		Connection connection=DatabaseUtil.getConnection();
		PreparedStatement stmt=null;
		log.info("query generated --- "+qry.toString());
		int result=0;
		try{
			stmt=connection.prepareStatement(qry.toString());
			
			stmt.setString(1, param.getSaleOrg());
			stmt.setString(2, item.getNotifyId());
			stmt.setString(3, param.getSaleOrg());
			stmt.setString(4, item.getNotifyId());
			stmt.setString(5, param.getSaleOrg());
			stmt.setString(6, param.getUserId());
			stmt.setString(7, param.getUserId());
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertNotification end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return true;
	}
	private static boolean deleteNotification(Notification item,NotificationParam param) throws Exception{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("deleteNotification start time --- " + startTime);
		
		deleteAllDepts(item, param);
		
		StringBuffer qry=new StringBuffer("UPDATE NOTIFICATION_XREF_SETTINGS SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE='"+Constants.SOFT_DELETE +"'" +
				" where " +
				" NOTIFY_ID=? and vkorg=? and ROLE=?");
		
		if(param.getRoleId().equalsIgnoreCase("All")){
			qry=new StringBuffer("UPDATE NOTIFICATION_XREF_SETTINGS SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE='" +Constants.SOFT_DELETE +"'" +
					" where " +
					" NOTIFY_ID=? and vkorg=?");
		}
		log.info("query generated --- " + qry.toString());
		Connection connection=DatabaseUtil.getConnection();
		PreparedStatement stmt=null;
		int result=0;
		try{
			stmt=connection.prepareStatement(qry.toString());
			stmt.setString(1, item.getNotifyId());
			stmt.setString(2, param.getSaleOrg());
			if(!param.getRoleId().equalsIgnoreCase("All"))
			stmt.setString(3, (param.getRoleId()==null?"-1":param.getRoleId()));
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		endTime = System.currentTimeMillis();
		log.info("deleteNotification end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		return true;
	}
	
	private static boolean deleteAllDepts(Notification item,NotificationParam param) throws Exception{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("deleteAllDepts start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("UPDATE NOTIFICATION_XREF_DEPTS SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE +"' "+
				" where " +
				" NOTIFY_ID=? and VKORG=? and ROLE=?");
		
		if(param.getRoleId().equalsIgnoreCase("All")){
			qry=new StringBuffer("UPDATE NOTIFICATION_XREF_DEPTS SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE +"' "+
					" where " +
					" NOTIFY_ID=? and VKORG=?");
		}
		log.info("query generated --- "+ qry.toString());
		Connection connection=null;
		PreparedStatement stmt=null;
		int result=0;
		try{
			connection=DatabaseUtil.getConnection();
			stmt=connection.prepareStatement(qry.toString());
			stmt.setString(1, item.getNotifyId());
			stmt.setString(2, param.getSaleOrg());
			if(!param.getRoleId().equalsIgnoreCase("All"))
			stmt.setString(3, param.getRoleId());
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		endTime = System.currentTimeMillis();
		log.info("deleteAllDepts end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return true;
	}
	
	private static boolean insertDepts(ArrayList<String> depts,Notification item,NotificationParam param) throws Exception{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertDepts start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("MERGE INTO NOTIFICATION_XREF_DEPTS notify_dept "
				+" USING ( select '"+item.getNotifyId()+"'as NOTIFY_ID  from dual) d "
				+" on (notify_dept.NOTIFY_ID = d.NOTIFY_ID and notify_dept.VKORG='"+param.getSaleOrg()+"' and notify_dept.ROLE = '"
				+ param.getRoleId()+"' and notify_dept.DEPT = ? )"
				+" WHEN MATCHED THEN "
				+" UPDATE SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.ACTIVE+"' WHERE NOTIFY_ID = '"+item.getNotifyId()
				+"' and VKORG='"+param.getSaleOrg()+"' and ROLE = '"+ param.getRoleId()+"' and DEPT = ? "
				+" WHEN NOT MATCHED THEN "
				+" INSERT (NOTIFY_ID,VKORG,ROLE,DEPT,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY) "
				+" VALUES ('"+item.getNotifyId()+"','"+param.getSaleOrg()+"','"+param.getRoleId()+"',?,sysdate,'"+param.getUserId()+"',SYSDATE,'"+param.getUserId()+"')" );
				
		
		Connection connection=null;
		PreparedStatement stmt=null;
		int result=0;
		log.info("query generated --- "+qry.toString());
		try{
			connection=DatabaseUtil.getConnection();
			stmt=connection.prepareStatement(qry.toString());
			
			for(String dept:depts){
				stmt.setObject(1, dept);
				stmt.setObject(2, dept);
				stmt.setObject(3, dept);
				
				result=stmt.executeUpdate();	
			}
			
			
		}catch(Exception e){
			e.printStackTrace();
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertDepts end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return true;
	}
	private static boolean removeDepts(ArrayList<String> depts,Notification item,NotificationParam param) throws Exception{
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("removeDepts start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("UPDATE NOTIFICATION_XREF_DEPTS SET  CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE+"' " +
				" where " +
				" NOTIFY_ID=? and VKORG=? and ROLE=? ");
		
		qry.append(" and dept in (");
		int count=depts.size();
		int i=1;
		for(String dpt:depts){
			if(count>i){
				qry.append("'"+dpt+"',");
			}else{
				qry.append("'"+dpt+"'");
			}
			i++;
		}		
		qry.append(" ) ");
		
		
		Connection connection=null;
		PreparedStatement stmt=null;
		log.info("query generated --- "+qry.toString());
		int result=0;
		try{
			connection=DatabaseUtil.getConnection();
			stmt=connection.prepareStatement(qry.toString());
			stmt.setString(1, item.getNotifyId());
			stmt.setString(2, param.getSaleOrg());
			if(!param.getRoleId().equalsIgnoreCase("All"))
			stmt.setString(3, param.getRoleId());
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		endTime = System.currentTimeMillis();
		log.info("removeDepts end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return true;
	}

	public static void replicateNotification(String fromSalesOrg,
			String toSalesOrg, String fromRole, ArrayList<String> toRoles,
			String userId) throws Exception {
		removeNotificationDepts(toSalesOrg, toRoles);
		removeNotificationSettings(toSalesOrg, toRoles);	
		insertAllNotificationSettings(fromSalesOrg,toSalesOrg,fromRole,toRoles,userId);
		if(toSalesOrg.equalsIgnoreCase(fromSalesOrg))
		insertAllNotificationDepts(fromSalesOrg,toSalesOrg,fromRole,toRoles,userId);
		
	}
	
	private static void insertAllNotificationSettings(String fromSalesOrg,
			String toSalesOrg, String fromRole, ArrayList<String> toRoles,
			String userId) throws Exception {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertAllNotificationSettings start time --- " + startTime);
		
		Connection con1=null,con2=null;
		PreparedStatement ps=null,ps1=null;
		ResultSet rs=null;
		String qry="select * from NOTIFICATION_XREF_SETTINGS where vkorg=? and role=? AND ISACTIVE = '"+Constants.ACTIVE+"'";
		
		try{
			con1=DatabaseUtil.getConnection();
			con2=DatabaseUtil.getConnection();
			log.info("query generated --- "+qry);
			ps=con1.prepareStatement(qry);
			ps.setString(1,fromSalesOrg);
			ps.setString(2, fromRole);
			rs=ps.executeQuery();
			while(rs.next()){
				String notifyId=rs.getString("notify_id");
				String priority=rs.getString("priority");
				String ack_req=rs.getString("ack_req");
				String salesOrg=toSalesOrg;		
				int sOrgLvl=rs.getInt("SORG_LEVEL");
				for(String role :toRoles){
					try{
						StringBuffer qry1=new StringBuffer("MERGE INTO NOTIFICATION_XREF_SETTINGS e"
							    +" USING (select '"+salesOrg+"' as VKORG, '"+notifyId+"' as NOTIFY_ID, '"+role+"' as re  from dual) b"
								+" on (e.VKORG = b.VKORG and e.NOTIFY_ID  = b.NOTIFY_ID and e.role = b.re)"
								+" WHEN MATCHED THEN"
								+" UPDATE SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'),ISACTIVE = '1' "
								+" WHEN NOT MATCHED THEN"
								+" Insert (vkorg,ROLE,NOTIFY_ID,PRIORITY,ACK_REQ,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY,SORG_LEVEL) "
								+" VALUES (?,?,?,?,?,sysdate,?,sysdate,?,?)");
								
					/*StringBuffer qry1=new StringBuffer("Insert into NOTIFICATION_XREF_SETTINGS " +
								"(vkorg,ROLE,NOTIFY_ID,PRIORITY,ACK_REQ,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY,SORG_LEVEL) " +
								"values (?,?,?,?,?,sysdate,?,sysdate,?,?)");*/
					log.info("query generated --- "+qry1.toString());
					ps1=con2.prepareStatement(qry1.toString());
					ps1.setString(1, salesOrg);
					ps1.setString(2, (role==null?"-1":role));
					ps1.setString(3, notifyId);
					ps1.setString(4, priority);
					ps1.setString(5, ack_req);
					ps1.setString(6, userId);
					ps1.setString(7, userId);	
					ps1.setInt(8,sOrgLvl);
					ps1.executeUpdate();
					
					}catch(Exception e){
						e.printStackTrace();
						throw e;
					}finally{
						if(null!=ps1){
							ps1.close();							
						}
					}
					
				}
			}
						
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=ps1){
				ps1.close();
			}
			if(null!=ps){
				ps.close();
			}
			if(null!=rs){
				rs.close();
			}
			if(null!=con1){
				con1.close();
			}
			if(null!=con2){
				con2.close();
			}
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertAllNotificationSettings end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
	}

	private static void insertAllNotificationDepts(String fromSalesOrg,
			String toSalesOrg, String fromRole, ArrayList<String> toRoles,
			String userId) throws Exception {
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertAllNotificationDepts start time --- " + startTime);
		
		Connection con1=null,con2=null;
		PreparedStatement ps=null,ps1=null;
		ResultSet rs=null;
		String qry="select * from NOTIFICATION_XREF_DEPTS where VKORG=? and role=? and ISACTIVE='"+Constants.ACTIVE+"'";
		try{
			con1=DatabaseUtil.getConnection();
			con2=DatabaseUtil.getConnection();
			log.info("query generated --- "+qry);
			ps=con1.prepareStatement(qry);
			ps.setString(1,fromSalesOrg);
			ps.setString(2, fromRole);
			rs=ps.executeQuery();
			while(rs.next()){
				String notifyId=rs.getString("notify_id");
				String DEPT=rs.getString("DEPT");
				String salesOrg=toSalesOrg;		
				for(String role :toRoles){
					try{
					StringBuffer qry1=new StringBuffer("MERGE INTO NOTIFICATION_XREF_DEPTS e"
							    +" USING (select '"+salesOrg+"' as VKORG, '"+notifyId+"' as NOTIFY_ID, '"+role+"' as re,'"+DEPT+"' as DEPT   from dual) b"
								+" on (e.VKORG = b.VKORG and e.NOTIFY_ID  = b.NOTIFY_ID and e.role = b.re and e.DEPT = b.DEPT )"
								+" WHEN MATCHED THEN"
								+" UPDATE SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'),ISACTIVE = '1' "
								+" WHEN NOT MATCHED THEN"
								+" Insert (VKORG,ROLE,NOTIFY_ID,DEPT,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY) "
								+" VALUES (?,?,?,?,sysdate,?,sysdate,?)");	
						
				/*	StringBuffer qry1=new StringBuffer("Insert into NOTIFICATION_XREF_DEPTS " +
								"(VKORG,ROLE,NOTIFY_ID,DEPT,CREATED_TM,CREATED_BY,UPDATED_TM,UPDATED_BY) " +
								"values (?,?,?,?,sysdate,?,sysdate,?)");*/
					log.info("query generated --- "+qry1.toString());
					ps1=con2.prepareStatement(qry1.toString());
					ps1.setString(1, salesOrg);
					ps1.setString(2, role);
					ps1.setString(3, notifyId);
					ps1.setString(4, DEPT);
					ps1.setString(5, userId);
					ps1.setString(6, userId);	
					ps1.executeUpdate();
					
					}catch(Exception e){
						e.printStackTrace();
						throw e;
					}finally{
						if(null!=ps1){
							ps1.close();							
						}
					}
					
				}
			}
						
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=ps1){
				ps1.close();
			}
			if(null!=ps){
				ps.close();
			}
			if(null!=rs){
				rs.close();
			}
			if(null!=con1){
				con1.close();
			}
			if(null!=con2){
				con2.close();
			}
		}
		endTime = System.currentTimeMillis();
		log.info("insertAllNotificationDepts end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
	}

	public static void removeNotificationDepts(
			String toSalesOrg, ArrayList<String> toRoles) throws Exception{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("removeNotificationDepts start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("UPDATE NOTIFICATION_XREF_DEPTS SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE +"' "+
				" where " +
				" VKORG=? ");
		
		qry.append(" and ROLE in (");
		int count=toRoles.size();
		int i=1;
		for(String dpt:toRoles){
			if(count>i){
				qry.append("'"+dpt+"',");
			}else{
				qry.append("'"+dpt+"'");
			}
			i++;
		}		
		qry.append(" ) ");	
		
		Connection connection=null;
		PreparedStatement stmt=null;
		log.info("query generated --- "+qry.toString());
		int result=0;
		try{
			connection=DatabaseUtil.getConnection();
			stmt=connection.prepareStatement(qry.toString());
			stmt.setString(1, toSalesOrg);
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
		}
		
		endTime = System.currentTimeMillis();
		log.info("removeNotificationDepts end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
	}
	
	public static void removeNotificationSettings(
			String toSalesOrg, ArrayList<String> toRoles) throws Exception{
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("removeNotificationSettings start time --- " + startTime);
		
		StringBuffer qry=new StringBuffer("UPDATE NOTIFICATION_XREF_SETTINGS SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE+"' " +
				" where " +
				" vkorg=? ");
		
		qry.append(" and ROLE in (");
		int count=toRoles.size();
		int i=1;
		for(String dpt:toRoles){
			if(count>i){
				qry.append("'"+dpt+"',");
			}else{
				qry.append("'"+dpt+"'");
			}
			i++;
		}		
		qry.append(" ) ");	
		
		Connection connection=null;
		PreparedStatement stmt=null;
		log.info("query generated --- "+qry.toString());
		int result=0;
		try{
			connection=DatabaseUtil.getConnection();
			stmt=connection.prepareStatement(qry.toString());
			stmt.setString(1, toSalesOrg);
			result=stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt){
				stmt.close();
			}
			DatabaseUtil.releaseConnection(connection);
			}
		
		endTime = System.currentTimeMillis();
		log.info("removeNotificationSettings end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		}
	}
