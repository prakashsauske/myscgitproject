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
import java.util.LinkedHashMap;
import java.util.Map;

import org.apache.log4j.Logger;



import au.com.woolworths.identity.exceptions.InvalidInputException;
import au.com.woolworths.identity.exceptions.InvalidSecondaryRoleException;
import au.com.woolworths.identity.exceptions.InvalidUserException;
import au.com.woolworths.identity.exceptions.SuspendedUserException;
import au.com.woolworths.identity.exceptions.SystemException;
import au.com.woolworths.identity.exceptions.timRequestFailedException;
import au.com.woolworths.identity.exceptions.timRequestNotStartedException;
import au.com.woolworths.identity.exceptions.timRequestPendingException;
import au.com.woolworths.portal.model.UserInfoModel;
import au.com.woolworths.ngbo.identity.AdditionalRole;
import au.com.woolworths.ngbo.identity.NGBOServices;
import au.com.woolworths.ngbo.identity.SecondaryRole;
import au.com.woolworths.ngbo.identity.SpecialRole;
import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.UserManagementParam;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;


/**
 * @author xrca4
 * 
 */
public class ITAdminMgmtDAOImpl {

	//static SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	private static final Logger logger = Logger
	.getLogger(ITAdminMgmtDAOImpl.class.getName());
	public static Map<String, ArrayList<UserSiteDtl>> getUserSiteDtls(
			UserPreferencesParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap = null;
		ArrayList<UserSiteDtl> userSiteDtlList = null;
		String notInBanner="not in ('"+Constants.COUNTDOWN+"') ";
		
		if(param.getSaleOrg().equalsIgnoreCase(Constants.COUNTDOWN)){
			notInBanner="in ('"+Constants.COUNTDOWN+"') ";
		}
		

		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		/*String commonWhere = " US.USR_ID!='" + param.getUserId()
				+ "' and (US.usr_id ='" + param.getOption()
				+ "' or US.usr_nm='" + param.getOption()
				+ "' or upper(US.usr_nm)" + " like upper('%"
				+ param.getOption() + "%')  OR UPPER(US.usr_id) like upper('%"
				+ param.getOption() + "%')) ";

		String sqlStatementForUsrDtl = "select US.USR_NM,USD.USR_ID,USD.SITE_ID,USD.DEPT,USD.ROLE_ID,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE,"
				+ "	to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,RP.ROLE_DESC, USD.SALES_ORG,"
				+ "	to_char(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE,"
				+ "	USD.LAST_CREATED_USER,to_char(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE,USD.LAST_UPDATED_USER,"
				+ "	sal.DESCRIPTION sales_org_name,nvl('',sm.site_name) site_name,'N' as reset_only "
				+ "	from  USR_SITE_DTL USD LEFT OUTER join "+Constants.NGBO_SITEMASTER+" sm  on sm.site= usd.site_id  left outer join sales_org sal on USD.SALES_ORG=sal.sales_org ,ROLE_PROFILE RP,USR US  WHERE "
				+ commonWhere
				+ " AND RP.ROLE_CODE=USD.ROLE_ID AND USD.USR_ID=US.USR_ID and trunc(USD.ACTV_END_DATE) >= trunc(sysdate) order by USR_ID asc,reset_only asc  ";

		String sqlStatementForUsr = " SELECT US.USR_NM,US.USR_ID, '' as SITE_ID,'' as DEPT,idm.ngbo_role as ROLE_ID,'' as ACTV_START_DATE,'' as ACTV_END_DATE, "
				+ " '' as ROLE_DESC,'' as SALES_ORG,'' as LAST_CREATED_DATE,'' as LAST_CREATED_USER,'' as LAST_UPDATED_DATE,'' as LAST_UPDATED_USER, "
				+ " '' as sales_org_name,'' as site_name,'Y' as reset_only  FROM usr us, ngbo_idm_role_map idm WHERE "
				+ commonWhere
				+ " and idm.IDM_ROLE_DESC  = us.ROLE_ID and idm.ngbo_role in ("
				+ Constants.getAdminUsers()
				+ ") AND deleted_date IS NULL AND locked_date  IS NULL ";*/
		
		
		String activeSearch=new String("");
		if(param.getSearchStatus()!=null && param.getSearchStatus().equalsIgnoreCase("Active")){
			activeSearch=" and TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) and TRUNC(USD.ACTV_START_DATE) <= TRUNC(sysdate) ";
		}else if(param.getSearchStatus()!=null && param.getSearchStatus().equalsIgnoreCase("inActive")){
			activeSearch=" and (TRUNC(USD.ACTV_END_DATE) < TRUNC(sysdate) or TRUNC(USD.ACTV_START_DATE) > TRUNC(sysdate)) ";
		}
		
		String commonWhere = " US.USR_ID!='" + param.getUserId()
				+ "' and (US.usr_id ='" + param.getOption()
				+ "' or US.usr_nm='" + param.getOption()
				+ "' or upper(US.usr_nm)" + " like upper('%"
				+ param.getOption() + "%')  OR UPPER(US.usr_id) like upper('%"
				+ param.getOption() + "%')) and us.deleted_date is null ";
		
		
		
		
		String defaultSearchKey1="";
		String sqlStatementForUsr="";
		
		String stotmWhere="";
		
		if(Constants.isStockTakeManager(param.getRoleId())){
			stotmWhere=" and RP.ROLE_CODE in ('"+Constants.STOCKTAKE_MANAGER+"','"+Constants.STOCKtAKE_TEAMMEMBER+"') ";
			defaultSearchKey1="";
		}
		
		if(param.getOption().trim().equalsIgnoreCase("") || Constants.isStoreManagers(param.getRoleId())|| Constants.isSalesOrgManager(param.getRoleId()) || param.getRoleId().equalsIgnoreCase(Constants.AREA_MANAGER)){
			//Added for default search
			defaultSearchKey1=" and USD.USR_ID IN (select DISTINCT usr_id from "+Constants.NGBO_USR_SITE+" where store_cost_centre_id = '"+param.getSiteNo()+"' and sc_role<>'D' ) ";
			
			if(param.getSearchStatus()!=null && param.getSearchStatus().equalsIgnoreCase("Active")){
				defaultSearchKey1=" and USD.USR_ID IN (select DISTINCT usr_id from "+Constants.NGBO_USR_SITE+" where store_cost_centre_id = '"+param.getSiteNo()+"' and sc_role<>'D' AND TRUNC(ACTV_END_DATE) >= TRUNC(sysdate) and TRUNC(ACTV_START_DATE) <= TRUNC(sysdate)) ";
			}else if(param.getSearchStatus()!=null && param.getSearchStatus().equalsIgnoreCase("inActive")){
				defaultSearchKey1=" and USD.USR_ID IN (select DISTINCT usr_id from "+Constants.NGBO_USR_SITE+" where store_cost_centre_id = '"+param.getSiteNo()+"' and sc_role<>'D' and (TRUNC(ACTV_END_DATE) < TRUNC(sysdate) or TRUNC(ACTV_START_DATE) > TRUNC(sysdate))) ";
			}
			
		}else if(!param.getOption().trim().equalsIgnoreCase("")){
			sqlStatementForUsr ="SELECT US.USR_NM, USD.USR_ID, 'NONE' as STORE_COST_CENTRE_ID, dpt.DEPT_ID AS DEPT, dpt.DEPT_name AS DEPT_name, USD.ROLE as sc_role, TO_CHAR(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE," +
					" TO_CHAR(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE, RP.ROLE_DESC, TO_CHAR(USD.SALES_ORG) AS SALES_ORG," +
					" TO_CHAR(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE," +
					" USD.LAST_CREATED_USER, TO_CHAR(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE, USD.LAST_UPDATED_USER, CASE WHEN usd.source = 'SC' then 'P' else CASE WHEN TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) and TRUNC(USD.ACTV_START_DATE) <= TRUNC(sysdate) THEN 'Y' ELSE 'N' END end AS active_flag," +
					" nvl('',sal.sales_org_name) sales_org_name, '' as site_name, 'N' AS reset_only, CASE WHEN us.STORE_COST_CENTRE_ID is null THEN 'Y' ELSE 'N' END AS primary_store, TO_CHAR(USD.LAST_LOGIN_TIME,'dd/mm/yyyy hh:mi AM') AS last_login," +
					" 'Y' as special_role,CASE WHEN us.locked_date is null THEN 'N' ELSE 'Y' END AS is_locked, '' as STORE_STATUS FROM " +Constants. NGBO_USR_SPECIAL_ROLES+ " USD LEFT OUTER JOIN "+Constants.NGBO_PRIMARY_DPT+" dpt ON dpt.site ='NONE' AND usd.usr_id =dpt.usr_id and dpt.isactive='"+Constants.ACTIVE+"' LEFT OUTER JOIN sales_org sal ON USD.SALES_ORG=sal.sales_org , ROLE_PROFILE RP, "+Constants.NGBO_USR+" US WHERE " +
					commonWhere +stotmWhere;
					if(!Constants.isAdminUser(param.getRoleId())){
						sqlStatementForUsr +=" and usd.sales_org "+notInBanner+" ";
					}
					sqlStatementForUsr +=" AND RP.ROLE_CODE=USD.ROLE AND USD.USR_ID =US.USR_ID "+activeSearch;
		}		
	

		String sqlStatementForUsrDtl = "select US.USR_NM,USD.USR_ID,TO_CHAR(USD.STORE_COST_CENTRE_ID) AS STORE_COST_CENTRE_ID,dpt.DEPT_ID AS DEPT,dpt.DEPT_name as DEPT_name,USD.SC_ROLE,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE,"
				+ "	to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,RP.ROLE_DESC, TO_CHAR(sm.SALES_ORG) AS SALES_ORG,"
				+ "	to_char(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE,"
				+ "	USD.LAST_CREATED_USER,to_char(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE,USD.LAST_UPDATED_USER,CASE WHEN usd.source = 'SC' then 'P' else case when TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) and TRUNC(USD.ACTV_START_DATE) <= TRUNC(sysdate) then 'Y' else 'N' end end as active_flag,"
				+ "	nvl('',sal.sales_org_name) sales_org_name,nvl('',sm.site_name) site_name,'N' as reset_only,case when us.STORE_COST_CENTRE_ID=cast(usd.store_cost_centre_id as number) then 'Y' else 'N' end as primary_store,TO_CHAR(USD.LAST_LOGIN_TIME,'dd/mm/yyyy hh:mi AM') as last_login, 'N' as special_role"
				+ " ,CASE WHEN us.locked_date is null THEN 'N' ELSE 'Y' END AS is_locked, sm.Status as STORE_STATUS  from " + Constants.NGBO_USR_SITE + " USD LEFT OUTER join "+Constants.NGBO_SITEMASTER_ALLSTORE+" sm  on sm.site= USD.STORE_COST_CENTRE_ID LEFT OUTER JOIN "+Constants.NGBO_PRIMARY_DPT+" dpt ON usd.store_cost_centre_id=dpt.site and usd.usr_id=dpt.usr_id and dpt.isactive='"+Constants.ACTIVE+"'  left outer join sales_org sal on sm.SALES_ORG=sal.sales_org ,ROLE_PROFILE RP,"+Constants.NGBO_USR+" US  WHERE "
				+ commonWhere+defaultSearchKey1+stotmWhere+" and sm.sales_org "+notInBanner+" "
				+ " AND RP.ROLE_CODE=USD.SC_ROLE AND USD.USR_ID=US.USR_ID "+activeSearch+" ";
		
		
		
		if(!sqlStatementForUsr.equalsIgnoreCase("")){
			sqlStatementForUsr = "select final_tbl.* from ("+sqlStatementForUsr+" union " + sqlStatementForUsrDtl+") final_tbl ORDER BY final_tbl.active_flag DESC,case when final_tbl.LAST_LOGIN is null then 1 else 0 end,to_date(final_tbl.LAST_LOGIN,'dd/mm/yyyy hh:mi AM') desc, final_tbl.USR_ID ASC";
		}else{
			sqlStatementForUsr="select final_tbl.* from ("+sqlStatementForUsrDtl+") final_tbl ORDER BY final_tbl.active_flag DESC,case when final_tbl.LAST_LOGIN is null then 1 else 0 end, to_date(final_tbl.LAST_LOGIN,'dd/mm/yyyy hh:mi AM') desc, final_tbl.USR_ID ASC";
		}

		logger.info("sqlStatement_" + sqlStatementForUsr);
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatementForUsr);

			rs = stmt.executeQuery();
			if (rs != null) {
				userSiteDtlMap = new LinkedHashMap<String, ArrayList<UserSiteDtl>>();
				// rs.next();
				while (rs.next()) {

					if (rs.getString("usr_id") != null) {
						if (userSiteDtlMap.containsKey(rs.getString("usr_id"))) {
							userSiteDtlList = userSiteDtlMap.get(rs
									.getString("usr_id"));
							int index=UserSiteDtl.hasKey(userSiteDtlList, rs.getString("STORE_COST_CENTRE_ID"));
							
							if(index>0){
								if(null !=rs.getString("DEPT"))
								userSiteDtlList.get(index-1).getDeptList().add(rs.getString("DEPT")+"-"+rs.getString("DEPT_NAME"));
							}else{							
								UserSiteDtl usd=new UserSiteDtl(
										rs.getString("usr_id"),
										rs.getString("usr_nm"),
										rs.getString("STORE_COST_CENTRE_ID"),
										rs.getString("SC_ROLE"),
										rs.getString("ROLE_DESC"),
										rs.getString("ACTV_START_DATE"),
										rs.getString("ACTV_END_DATE"),
										rs
												.getString("active_flag"),
										rs.getString("DEPT"), rs
												.getString("SALES_ORG"),
										rs.getString("sales_org_name"),
										rs.getString("LAST_CREATED_USER"),
										rs.getString("LAST_UPDATED_USER"),
										rs.getString("LAST_CREATED_DATE"),
										rs.getString("LAST_UPDATED_DATE"),
										rs.getString("site_name"), "");
								usd.setLastLoggedinTime(rs.getString("LAST_LOGIN"));
								usd.setPrimary_strore(rs.getString("PRIMARY_STORE"));
								usd.setIsLocked(rs.getString("is_locked"));
								usd.setStoreStatus(rs.getString("STORE_STATUS"));
								if(null!=rs.getString("DEPT")){
									usd.getDeptList().add(rs.getString("DEPT")+"-"+rs.getString("DEPT_NAME"));
								}
								userSiteDtlList
										.add(usd);
							}
						} else {
							System.out.println(rs.getString("usr_id"));
							userSiteDtlList = new ArrayList<UserSiteDtl>();
							UserSiteDtl usd=new UserSiteDtl(
									rs.getString("usr_id"),
									rs.getString("usr_nm"),
									rs.getString("STORE_COST_CENTRE_ID"),
									rs.getString("SC_ROLE"),
									rs.getString("ROLE_DESC"),
									rs.getString("ACTV_START_DATE"),
									rs.getString("ACTV_END_DATE"),
									rs
											.getString("active_flag"),
									rs.getString("DEPT"), rs
											.getString("SALES_ORG"),
									rs.getString("sales_org_name"),
									rs.getString("LAST_CREATED_USER"),
									rs.getString("LAST_UPDATED_USER"),
									rs.getString("LAST_CREATED_DATE"),
									rs.getString("LAST_UPDATED_DATE"),
									rs.getString("site_name"), "");
							usd.setLastLoggedinTime(rs.getString("LAST_LOGIN"));
							usd.setPrimary_strore(rs.getString("primary_STORE"));
							usd.setIsLocked(rs.getString("is_locked"));
							usd.setStoreStatus(rs.getString("STORE_STATUS"));
							if(null!=rs.getString("DEPT")){
								usd.getDeptList().add(rs.getString("DEPT")+"-"+rs.getString("DEPT_NAME"));
							}
							userSiteDtlList
									.add(usd);
						}
						userSiteDtlMap.put(rs.getString("usr_id"), userSiteDtlList);
						// System.out.println("menuBarOptions.size()"
						// + userDetail.size());
					}
				}

				return userSiteDtlMap;

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

	public static Map<String, ArrayList<UserSiteDtl>> verifyUser(
			AQMSearchQueryParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, ArrayList<UserSiteDtl>> userDetail = null;
		ArrayList<UserSiteDtl> userSiteDtlList = null;
		String notInBanner=" not in ('"+Constants.COUNTDOWN+"') ";
		
		if(param.getSalesOrg().equalsIgnoreCase(Constants.COUNTDOWN)){
			notInBanner=" in ('"+Constants.COUNTDOWN+"') ";
		}
		// My change
		// "SELECT DISTINCT usr.usr_id, usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,usr.DIV_ID,USD.SITE_ID FROM usr "
		// String sqlStatement =
		// "SELECT DISTINCT usr.usr_id, usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,USD.SITE_ID,nvl('',sm.site_name) site_name,sm.sales_org,sa.sales_org_name, to_char(usd.actv_end_date,'dd/mm/yyyy') actv_end_date FROM usr join ngbo_idm_role_map ng  on (upper(usr.role_id)= upper(ng.idm_role_desc))"
		// +
		// " LEFT OUTER JOIN USR_SITE_DTL USD on (usr.usr_id=USD.USR_ID ) LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm ON (USD.SITE_ID   = sm.site) LEFT OUTER JOIN sales_org sa ON (sm.sales_org   = sa.no) left outer join ROLE_PROFILE RP on (USD.ROLE_ID=RP.ROLE_CODE) "
		// +
		// " where (usr.usr_id =? or usr.usr_nm=? or upper(usr.usr_nm) like upper(?)  OR UPPER(usr.usr_id) like upper(?)) AND usr.deleted_date IS NULL  AND usr.locked_date  IS NULL and USD.ROLE_ID!='ITS' and USD.ROLE_ID!='SS' ";

		//
		// String sqlStatement =
		// "SELECT DISTINCT usr.usr_id,usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,USD.SITE_ID,nvl('',sm.site_name) site_name,usd.sales_org,usr.div_id as DEFAULT_SALES_ORG,sa.sales_org_name,TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date"
		// +" FROM usr"
		// +" LEFT OUTER JOIN ngbo_idm_role_map ng ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS'))"
		// +" LEFT OUTER JOIN USR_SITE_DTL USD	ON (usr.usr_id=USD.USR_ID  AND ( to_date(sysdate,'dd-mm-yyyy') between to_date(usd.actv_start_date,'dd-mm-yyyy') and to_date(usd.actv_end_date,'dd-mm-yyyy')) ) "
		// +" LEFT OUTER JOIN sales_org sa		ON (sa.no=USD.sales_org OR sa.no= usr.div_id)"
		// +" LEFT OUTER JOIN ROLE_PROFILE RP		ON (USD.ROLE_ID   =RP.ROLE_CODE)"
		// +" LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm    ON (USD.SITE_ID = sm.site OR usr.loc_value_id=sm.site)"
		// +" WHERE (usr.usr_id =?		OR usr.usr_nm     =?		OR upper(usr.usr_nm) LIKE upper(?)		OR UPPER(usr.usr_id) LIKE upper(?))		AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL ";

		// SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC ,
		// '' SITE_ID,'' SALES_ORG,usr.loc_value_id as DEFAULT_SITE, usr.div_id
		// as DEFAULT_SALES_ORG, nvl('',sm.site_name) site_name, sa.sales_org_name, ' '
		// actv_end_date,'N' LINKED_FLAG
		// FROM usr
		// LEFT OUTER JOIN ngbo_idm_role_map ng ON (upper(usr.role_id)=
		// upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<>
		// 'SS'))
		// LEFT OUTER JOIN sales_org sa ON (sa.no= usr.div_id)
		// LEFT OUTER JOIN ROLE_PROFILE RP ON (ng.ngbo_role =RP.ROLE_CODE)
		// LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm ON (usr.LOC_VALUE_ID = sm.site)
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
		// as DEFAULT_SITE, usr.div_id as DEFAULT_SALES_ORG,nvl('',sm.site_name) site_name,
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
		// LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm ON (USD.SITE_ID = sm.site)
		// WHERE (usr.usr_id ='perftest18'
		// OR usr.usr_nm ='perftest18'
		// OR upper(usr.usr_nm) LIKE upper('perftest18%')
		// OR UPPER(usr.usr_id) LIKE upper('perftest18%'))
		// AND usr.deleted_date IS NULL
		// AND usr.locked_date IS NULL
		// AND USR.DIV_ID='1010' AND USD.SALES_ORG='1010'
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */

		/*String sqlStatement = "SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , '' SITE_ID,'' SALES_ORG,nvl('',sm.site_name) site_name, usr.loc_value_id as DEFAULT_SITE,  usr.div_id as DEFAULT_SALES_ORG,   sa.description, ' ' actv_end_date, 'N' AS LINKED_FLAG  "
				+ " FROM usr "
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng	ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.no= usr.div_id) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP 		ON (ng.ngbo_role   =RP.ROLE_CODE) "
				+ "  LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm  ON (usr.LOC_VALUE_ID = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm=? OR upper(usr.usr_nm) LIKE upper(?) OR UPPER(usr.usr_id) LIKE upper(?)) AND usr.deleted_date IS NULL	AND usr.locked_date  IS NULL "
				+ " AND usr.USR_ID NOT IN (select USR_ID from USR_SITE_DTL usd where usr.usr_id=USD.USR_ID AND trunc(usd.actv_end_date) > trunc(sysdate))   "
				+ " UNION "
				+ " SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , usd.site_id as SITE_ID, usd.sales_org as SALES_ORG, nvl('',sm.site_name) site_name, usr.loc_value_id as DEFAULT_SITE,  usr.div_id as DEFAULT_SALES_ORG, sa.description,  TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date, 'Y' AS LINKED_FLAG  "
				+ " FROM usr"
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng		ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " JOIN USR_SITE_DTL USD		ON (usr.usr_id=USD.USR_ID		 AND trunc(usd.actv_end_date) > trunc(sysdate) ) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.no=USD.sales_org) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP		ON (USD.ROLE_ID   =RP.ROLE_CODE) "
				+ " LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm  ON (USD.SITE_ID = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm =? OR upper(usr.usr_nm) LIKE upper(?)	OR UPPER(usr.usr_id) LIKE upper(?))	AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL ";*/
		
		/*String sqlStatement = "SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , '' SITE_ID,'' SALES_ORG,nvl('',sm.site_name) site_name, usr.location_id as DEFAULT_SITE,  usr.sales_org_no as DEFAULT_SALES_ORG,   sa.sales_org_name, ' ' actv_end_date, 'N' AS LINKED_FLAG  "
				+ " FROM " + Constants.NGBO_USR + " USR"
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng	ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.sales_org= usr.sales_org_no) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP 		ON (ng.ngbo_role   =RP.ROLE_CODE) "
				+ "  LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm  ON (usr.location_id = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm=? OR upper(usr.usr_nm) LIKE upper(?) OR UPPER(usr.usr_id) LIKE upper(?)) AND usr.deleted_date IS NULL	AND usr.locked_date  IS NULL "
				+ " AND usr.USR_ID NOT IN (select USR_ID from " + Constants.NGBO_USR_SITE + " USD where usr.usr_id=USD.USR_ID AND trunc(usd.actv_end_date) > trunc(sysdate))   "
				+ " UNION "
				+ " SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , to_char(usd.STORE_COST_CENTRE_ID) as SITE_ID, to_char(usd.sales_org) as SALES_ORG, nvl('',sm.site_name) site_name, usr.location_id as DEFAULT_SITE,  usr.sales_org_no as DEFAULT_SALES_ORG, sa.sales_org_name,  TO_CHAR(usd.actv_end_date,'dd/mm/yyyy') actv_end_date, 'Y' AS LINKED_FLAG  "
				+ " FROM " + Constants.NGBO_USR + " USR"
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng		ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " JOIN " + Constants.NGBO_USR_SITE + " USD		ON (usr.usr_id=USD.USR_ID		 AND trunc(usd.actv_end_date) > trunc(sysdate) ) "
//				+ " JOIN " + Constants.NGBO_USR_SPECIAL_ROLES + " USDA		ON (usr.usr_id=USDA.USR_ID		 AND trunc(USDA.actv_end_date) > trunc(sysdate) ) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.sales_org=USD.sales_org) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP		ON (USD.SC_ROLE   =RP.ROLE_CODE) "
				+ " LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm  ON (USD.STORE_COST_CENTRE_ID = sm.site) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm =? OR upper(usr.usr_nm) LIKE upper(?)	OR UPPER(usr.usr_id) LIKE upper(?))	AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL "
				+ " UNION "
				+ " SELECT DISTINCT usr.usr_id,usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , 'NONE' as SITE_ID, to_char(usda.sales_org) as SALES_ORG, '' as site_name, usr.location_id as DEFAULT_SITE,  usr.sales_org_no as DEFAULT_SALES_ORG, sa.sales_org_name,  TO_CHAR(usda.actv_end_date,'dd/mm/yyyy') actv_end_date, 'Y' AS LINKED_FLAG  "
				+ " FROM " + Constants.NGBO_USR + " USR"
				+ " LEFT OUTER JOIN ngbo_idm_role_map ng		ON (upper(usr.role_id)= upper(ng.idm_role_desc) AND (ng.ngbo_role <> 'ITS' OR ng.ngbo_role<> 'SS' OR ng.ngbo_role<> 'ADM')) "
				+ " JOIN " + Constants.NGBO_USR_SPECIAL_ROLES + " USDA		ON (usr.usr_id=USDA.USR_ID		 AND trunc(usda.actv_end_date) > trunc(sysdate) ) "
				+ " LEFT OUTER JOIN sales_org sa		ON (sa.sales_org=USDa.sales_org) "
				+ " LEFT OUTER JOIN ROLE_PROFILE RP		ON (USDA.ROLE   =RP.ROLE_CODE) "
				+ " WHERE (usr.usr_id =? OR usr.usr_nm =? OR upper(usr.usr_nm) LIKE upper(?)	OR UPPER(usr.usr_id) LIKE upper(?))	AND usr.deleted_date IS NULL AND usr.locked_date  IS NULL ";
		
		 XPSNV - Query Commented / Modified for Security Requirment Change - End */
		
//		String sqlStatement="select user_table.*,rp.role_desc,sm.site_name,sm.sales_org ,so.sales_org_name,user_table.sales_org_no default_sales_org from " +
//				"(SELECT ur.*, case when usd.actv_end_date > sysdate then 'Y' else 'N' end as active_flag, case when ur.usr_id=usd.usr_id then 'Y' else case when ur.usr_id=ussr.usr_id then 'Y' else 'N' end end as linked_flag, case when ur.usr_id=usd.usr_id then to_char(usd.sc_role) else case when ur.usr_id=ussr.usr_id then to_char(ussr.role) else '' end end as ngbo_role, case when ur.usr_id=usd.usr_id then to_char(usd.store_cost_centre_id) else case when ur.usr_id=ussr.usr_id then to_char('NONE') else '' end end as site FROM usr ur LEFT OUTER JOIN usr_site_dtl usd ON ur.usr_id = usd.usr_id LEFT OUTER JOIN usr_special_roles ussr ON ur.usr_id = ussr.usr_id) user_table left outer join role_profile rp on user_table.ngbo_role=rp.role_code left outer join "+Constants.NGBO_SITEMASTER+" sm on sm.site=USER_TABLE.SITE left outer join sales_org so on sm.sales_org=so.sales_org where user_table.deleted_date is null and (lower(user_table.usr_id) like lower('%"+param.getSubmitBy()+"%') or lower(user_table.usr_nm) like lower('%"+param.getSubmitBy()+"%')) and user_table.usr_id <>'"+param.getMsg().split("-")[0].trim()+"'";
		
		
		
		//String sqlStatement="select distinct * from ((SELECT user_table.*, rp.role_desc, to_char(sm.site_name) site_name, to_char(sm.sales_org) as sales_org_1, to_char(so.sales_org_name) sales_org_name, user_table.sales_org_no default_sales_org FROM ( SELECT ur.*, CASE WHEN (usd.actv_end_date > sysdate) THEN 'Y' ELSE 'N' END AS active_flag, CASE WHEN ur.usr_id=usd.usr_id THEN 'Y' END AS linked_flag, CASE WHEN ur.usr_id=usd.usr_id THEN TO_CHAR(usd.sc_role) END AS ngbo_role, CASE WHEN ur.usr_id=usd.usr_id THEN TO_CHAR(usd.store_cost_centre_id) END AS site,'' sales_org FROM usr ur left outer JOIN usr_site_dtl usd ON ur.usr_id = usd.usr_id and usd.sc_role<>'DEFAULT' ) user_table LEFT OUTER JOIN role_profile rp ON user_table.ngbo_role=rp.role_code LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm ON sm.site=USER_TABLE.SITE LEFT OUTER JOIN sales_org so ON sm.sales_org=so.sales_org WHERE user_table.deleted_date IS NULL AND ( lower(user_table.usr_id) LIKE lower('%"+param.getSubmitBy()+"%') OR lower(user_table.usr_nm) LIKE lower('%"+param.getSubmitBy()+"%') ) ) union (SELECT user_table.*, rp.role_desc, '' as site_name, to_char(user_table.sales_org) as sales_org_1 , to_char(so.sales_org_name) sales_org_name, user_table.sales_org_no default_sales_org FROM ( SELECT ur.*, CASE WHEN (ussr.actv_end_date > sysdate) THEN 'Y' ELSE 'N' END AS active_flag, CASE WHEN ur.usr_id=ussr.usr_id THEN 'Y' ELSE 'N' END AS linked_flag, to_char(ussr.role) ngbo_role, 'NONE' site, to_char(ussr.sales_org) sales_org FROM usr ur left outer JOIN usr_special_roles ussr ON ur.usr_id = ussr.usr_id ) user_table LEFT OUTER JOIN role_profile rp ON user_table.ngbo_role=rp.role_code LEFT OUTER JOIN sales_org so ON user_table.sales_org=to_char(so.sales_org) WHERE user_table.deleted_date IS NULL AND ( lower(user_table.usr_id) LIKE lower('%"+param.getSubmitBy()+"%') OR lower(user_table.usr_nm) LIKE lower('%"+param.getSubmitBy()+"%') ))) where usr_id<>'"+param.getMsg().split("-")[0].trim()+"' AND DELETED_DATE IS NULL and sales_org_1 "+notInBanner+" ";
		String sqlStatement="select distinct USR_ID,USR_NM,SITE,NGBO_ROLE,ROLE_DESC,'' ACTIVE_START_DATE,'' ACTIVE_END_DATE,ACTIVE_FLAG,'' DEPT,sales_org_1,site_name,sales_org_name,PRIMARY_STORE,default_sales_org,LINKED_FLAG" +
				" from ((SELECT user_table.*, rp.role_desc, to_char(sm.site_name) site_name, to_char(sm.sales_org) as sales_org_1, to_char(so.sales_org_name) sales_org_name, user_table.sales_org_no default_sales_org FROM ( SELECT ur.*, CASE WHEN (usd.actv_end_date > sysdate) THEN 'Y' ELSE 'N' END AS active_flag, CASE WHEN ur.usr_id=usd.usr_id THEN 'Y' ELSE 'N' END AS linked_flag, CASE WHEN ur.usr_id=usd.usr_id THEN TO_CHAR(usd.sc_role) END AS ngbo_role, CASE WHEN ur.usr_id=usd.usr_id THEN TO_CHAR(usd.store_cost_centre_id) END AS site,'' sales_org FROM usr ur left outer JOIN usr_site_dtl usd ON ur.usr_id = usd.usr_id and usd.sc_role<>'D' ) user_table LEFT OUTER JOIN role_profile rp ON user_table.ngbo_role=rp.role_code LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER+" sm ON sm.site=USER_TABLE.SITE LEFT OUTER JOIN sales_org so ON sm.sales_org=so.sales_org WHERE user_table.deleted_date IS NULL AND ( lower(user_table.usr_id) LIKE lower('%"+param.getSubmitBy()+"%') OR lower(user_table.usr_nm) LIKE lower('%"+param.getSubmitBy()+"%') ) ) union (SELECT user_table.*, rp.role_desc, '' as site_name, to_char(user_table.sales_org) as sales_org_1 , to_char(so.sales_org_name) sales_org_name, user_table.sales_org_no default_sales_org FROM ( SELECT ur.*, CASE WHEN (ussr.actv_end_date > sysdate) THEN 'Y' ELSE 'N' END AS active_flag, CASE WHEN ur.usr_id=ussr.usr_id THEN 'Y' ELSE 'N' END AS linked_flag, to_char(ussr.role) ngbo_role,  CASE WHEN ur.usr_id=ussr.usr_id THEN 'NONE' END AS site, to_char(ussr.sales_org) sales_org FROM usr ur left outer JOIN usr_special_roles ussr ON ur.usr_id = ussr.usr_id ) user_table LEFT OUTER JOIN role_profile rp ON user_table.ngbo_role=rp.role_code LEFT OUTER JOIN sales_org so ON user_table.sales_org=to_char(so.sales_org) WHERE user_table.deleted_date IS NULL AND ( lower(user_table.usr_id) LIKE lower('%"+param.getSubmitBy()+"%') OR lower(user_table.usr_nm) LIKE lower('%"+param.getSubmitBy()+"%') ))) where usr_id<>'"+param.getMsg().split("-")[0].trim()+"' AND DELETED_DATE IS NULL  AND DECODE(SALES_ORG_1,null,DEFAULT_SALES_ORG, SALES_ORG_1) "+notInBanner+" ";
		System.out.println("sqlStatement__" + sqlStatement);
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
//			// Following fields are for validations in first sub query - usr
//			// table query.
//			stmt.setString(1, param.getSubmitBy());
//			stmt.setString(2, param.getSubmitBy());
//			stmt.setString(3, "%" + param.getSubmitBy() + "%");
//			stmt.setString(4, "%" + param.getSubmitBy() + "%");
//			// stmt.setString(5, param.getSalesOrg());
//
//			// Following fields are for validations in second sub query - user
//			// site detail table query.
//			stmt.setString(5, param.getSubmitBy());
//			stmt.setString(6, param.getSubmitBy());
//			stmt.setString(7, "%" + param.getSubmitBy() + "%");
//			stmt.setString(8, "%" + param.getSubmitBy() + "%");
//			
//			stmt.setString(9, param.getSubmitBy());
//			stmt.setString(10, param.getSubmitBy());
//			stmt.setString(11, "%" + param.getSubmitBy() + "%");
//			stmt.setString(12, "%" + param.getSubmitBy() + "%");
			// stmt.setString(10, param.getSalesOrg());
			// stmt.setString(11, param.getSalesOrg());
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
											rs.getString("SITE"),
											rs.getString("NGBO_ROLE"),
											rs.getString("ROLE_DESC"),
											"",
											"",
											rs
													.getString("ACTIVE_FLAG"),
											"", (rs.getString("sales_org_1")), rs
													.getString("site_name"), rs
													.getString("sales_org_name"),
											rs.getString("PRIMARY_STORE"),
											rs.getString("default_sales_org"),
											rs.getString("LINKED_FLAG")));
							// My change
							// rs.getString("DIV_ID")));
						} else {
							userSiteDtlList = new ArrayList<UserSiteDtl>();
							userSiteDtlList
							.add(new UserSiteDtl(
									rs.getString("usr_id"),
									rs.getString("usr_nm"),
									rs.getString("SITE"),
									rs.getString("NGBO_ROLE"),
									rs.getString("ROLE_DESC"),
									"",
									"",
									rs
											.getString("ACTIVE_FLAG"),
									"", (rs.getString("sales_org_1")), rs
											.getString("site_name"), rs
											.getString("sales_org_name"),
									rs.getString("PRIMARY_STORE"),
									rs.getString("default_sales_org"),
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
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
			logger.error(e);
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return userDetail;
	}

	public static boolean creatUser(UserManagementParam param, String userId)
			throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result = 0;

		/*
		 * String sqlStatement =
		 * "insert into usr_site_dtl (USR_ID,SITE_ID,ROLE_ID,ACTV_START_DATE,ACTV_END_DATE,SALES_ORG,LAST_CREATED_DATE,LAST_CREATED_USER) values "
		 * +
		 * " (?,?,?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),?, CURRENT_TIMESTAMP,?)"
		 * ;
		 */
//		param.setDept((param.getDept() != null && !param.getDept()
//				.equalsIgnoreCase(Constants.SELECT)) ? param.getDept() : "");

		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ALL ");
		for (int i = 0; i < param.getStoreList().split(",").length; i++) {
			insertStatement
					.append(" into usr_site_dtl (USR_ID,SITE_ID,DEPT,ROLE_ID,ACTV_START_DATE,ACTV_END_DATE,SALES_ORG,LAST_CREATED_DATE,LAST_CREATED_USER,SUPER_ROLE_FLAG) values ('"
							+ param.getUserId().split("-")[0].trim()
							+ "','"
							+ param.getStoreList().split(",")[i]
							+ "','"
							+ param.getDept()
							+ "','"
							+ param.getRoleId()
							+ "',to_date('"
							+ param.getDateFrom()
							+ "','dd/mm/yyyy'),to_date('"
							+ param.getDateTo()
							+ "','dd/mm/yyyy'),'"
							+ param.getSaleOrg()
							+ "',CURRENT_TIMESTAMP,'" + userId + "',")
					.append((param.getStoreList().split(",")[i] != null && param
							.getStoreList().split(",")[i]
							.equalsIgnoreCase("NONE")) ? "'Y'" : null)
					.append(")");
		}
		insertStatement.append(" SELECT * FROM dual");

		PreparedStatement stmt = null;
		try {

			String deleteStmt = " delete from usr_site_dtl where USR_ID = '"
					+ param.getUserId().split("-")[0].trim() + "' ";
			//if (!Constants.isAdminUser(param.getRoleId())) {
				deleteStmt += " and SITE_ID = '" + param.getSiteNo()
				// + "' and ROLE_ID = '" + param.getRoleId() + "' ";
						+ "' ";
			//}

			// + " and SITE_ID = '" + param.getSiteNo() + "' ";
			/*
			 * + "' and SITE_ID = '" + param.getSiteNo() + "' and ROLE_ID = '" +
			 * param.getRoleId() + "' ";
			 */

			System.out
					.println(" delete statement user management" + deleteStmt);

			stmt = con.prepareStatement(deleteStmt);
			result = stmt.executeUpdate();

			stmt = con.prepareStatement(insertStatement.toString());
			/*
			 * stmt.setString(1, param.getUserId().split("-")[0].trim());
			 * stmt.setString(2, param.getSiteNo()); stmt.setString(3,
			 * param.getRoleId()); stmt.setString(4, param.getDateFrom());
			 * stmt.setString(5, param.getDateTo()); stmt.setString(6,
			 * param.getSaleOrg()); stmt.setString(7, userId);
			 */

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

	public static boolean updateUser(UserManagementParam param, String userId, boolean timOffline, NGBOServices timService)
			{

		Connection con = DatabaseUtil.getConnection();
		int result = 0;

		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "insert into usr_site_dtl (ROLE_ID,ACTV_START_DATE,ACTV_END_DATE,LAST_UPDATED_DATE,LAST_UPDATED_USER,LAST_CREATED_DATE,LAST_CREATED_USER,SITE_ID,dept,SALES_ORG,USR_ID)  ";
		sqlStatement += " values (?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),sysdate,'"
				+ userId + "',sysdate,'" + userId + "',?,?,?,?) ";*/
//		String updateUserQry = "UPDATE " + Constants.NGBO_USR + " SET PRIMARY_STORE=?,ROLE_ID=?,SALES_ORG_NO=?,LAST_UPDATED_USER=?,LAST_UPDATED_DATE=SYSDATE where USR_ID=?";
		String sqlStatement = "INSERT INTO " + Constants.NGBO_USR_SITE + "(SC_ROLE,ACTV_START_DATE,ACTV_END_DATE,LAST_UPDATED_DATE,LAST_UPDATED_USER,LAST_CREATED_DATE,LAST_CREATED_USER,STORE_COST_CENTRE_ID,USR_ID,SALES_ORG,source)";
		String admRoleInsertStatement = "INSERT INTO " + Constants.NGBO_USR_SPECIAL_ROLES + "(ROLE,ACTV_START_DATE,ACTV_END_DATE,LAST_UPDATED_DATE,LAST_UPDATED_USER,LAST_CREATED_DATE,LAST_CREATED_USER,SALES_ORG,USR_ID,source)";
		admRoleInsertStatement+=" values (?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),sysdate,'"
				+ Constants.NGBO_UPDATED_USER_PREFIX+userId + "',sysdate,'" + Constants.NGBO_UPDATED_USER_PREFIX+userId + "',?,?,'SC') ";
		sqlStatement += " values (?,to_date(?,'dd/mm/yyyy'),to_date(?,'dd/mm/yyyy'),sysdate,'"
				+ Constants.NGBO_UPDATED_USER_PREFIX+userId + "',sysdate,'" + Constants.NGBO_UPDATED_USER_PREFIX+userId + "',?,?,?,'SC') ";
		String updateUserSiteQry = "UPDATE " + Constants.NGBO_USR_SITE + " SET SC_ROLE=?,ACTV_START_DATE=to_date(?,'dd/mm/yyyy'),ACTV_END_DATE=to_date(?,'dd/mm/yyyy'),LAST_UPDATED_USER=?,LAST_UPDATED_DATE=SYSDATE,source='SC' where USR_ID=? AND STORE_COST_CENTRE_ID=?";
		String admRoleUpdateQry = "UPDATE " + Constants.NGBO_USR_SPECIAL_ROLES + " SET ROLE=?,SALES_ORG=?,ACTV_START_DATE=to_date(?,'dd/mm/yyyy'),ACTV_END_DATE=to_date(?,'dd/mm/yyyy'),LAST_UPDATED_USER=?,LAST_UPDATED_DATE=SYSDATE,source='SC' where USR_ID=?";
		String admRoleUpdateOnlineQry = "UPDATE " + Constants.NGBO_USR_SPECIAL_ROLES + " SET ROLE=?,SALES_ORG=?,ACTV_START_DATE=to_date(?,'dd/mm/yyyy'),ACTV_END_DATE=to_date(?,'dd/mm/yyyy'),LAST_UPDATED_USER=?,LAST_UPDATED_DATE=SYSDATE,source='TIM' where USR_ID=?";
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
		
		PreparedStatement stmt = null;
		SpecialRole roleTobeRemoved = null;
		SecondaryRole secondaryroleTobeRemoved=null;

		try {
			
			/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */

			/*String deleteStmt = " delete from usr_site_dtl where USR_ID = '"
					+ param.getUserId().split("-")[0].trim() + "' ";

			if (!Constants.isAdminUser(param.getRoleId())) {
				deleteStmt += " and SITE_ID = '" + param.getSiteNo()
				// + "' and ROLE_ID = '" + param.getRoleId() + "' ";
						+ "' ";
			}else {
				param.setSiteNo("NONE");
			}*/
			
//			String deleteStmt = "delete from " + Constants.NGBO_USR_SITE + " where USR_ID = '"
//					+ param.getUserId().split("-")[0].trim() + "' ";

			if (!Constants.isAdminUser(param.getRoleId())) {
//				deleteStmt += " and STORE_COST_CENTRE_ID = '" + param.getSiteNo()
//				// + "' and ROLE_ID = '" + param.getRoleId() + "' ";
//						+ "' ";
//				param.setSiteNo(param.getStoreList());
			}else {
				param.setSiteNo("NONE");
			}
			
//			String deleteQry="delete from " + Constants.NGBO_USR_SITE + " where USR_ID = '"
//					+ param.getUserId().split("-")[0].trim() + "' and STORE_COST_CENTRE_ID='"+param.getSiteNo()+"' ";
			
			/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
			
			
//			System.out
//			.println(" insert statement user management" + sqlStatement );
			int isUpdate=0;
			if(param.getIsUpdate()!=null && param.getIsUpdate().equalsIgnoreCase("true")){
				if(Constants.isAdminUser(param.getRoleId())){
	//				stmt = con.prepareStatement(deleteStmt);
	//				result = stmt.executeUpdate();
					if(timOffline){
						con.setAutoCommit(false);
						stmt = con.prepareStatement(admRoleUpdateQry);
						stmt.setString(1, param.getRoleId());
						stmt.setString(2, param.getSaleOrg());
						stmt.setString(3, param.getDateFrom());
						stmt.setString(4, param.getDateTo());
						stmt.setString(5, Constants.NGBO_UPDATED_USER_PREFIX+userId);
						stmt.setString(6, param.getUserId().split("-")[0].trim());
						isUpdate = stmt.executeUpdate();
					}else{
						try{

							roleTobeRemoved = createSpecialRoleObj(Constants.toDate(param.getPrev_dateTo()),Constants.toDate(param.getPrev_dateFrom()),param.getPrev_saleOrg(),param.getPrev_roleId());
							SpecialRole specialRole= new SpecialRole();
							specialRole.setRoleCode(param.getRoleId());
							specialRole.setSalesOrgNo(param.getSaleOrg());
							specialRole.setValidFrom(Constants.toDate(param.getDateFrom()));
							specialRole.setValidTill(Constants.toDate(param.getDateTo()));
							logger.info("Object data:"+param.getUserId().split("-")[0].trim()+"---"+param.getRoleId()+"---"
									+param.getSaleOrg()+"---"
									+param.getDateFrom()+"---"
									+param.getDateTo());
							logger.info("param.getUserId() =====" + param.getUserId().split("-")[0]);
							logger.info("  roleTobeRemoved.getRoleCode() "+ roleTobeRemoved.getRoleCode());
							logger.info("  roleTobeRemoved.getSalesOrgNo() "+ roleTobeRemoved.getSalesOrgNo());
							logger.info("  roleTobeRemoved.getValidFrom() "+ roleTobeRemoved.getValidFrom());
							logger.info("  roleTobeRemoved.getValidTill() "+ roleTobeRemoved.getValidTill());

							logger.info("  specialRole.getRoleCode() "+ specialRole.getRoleCode());
							logger.info("  specialRole.getSalesOrgNo() "+ specialRole.getSalesOrgNo());
							logger.info("  specialRole.getValidFrom() "+ specialRole.getValidFrom());
							logger.info("  specialRole.getValidTill() "+ specialRole.getValidTill());
							if(!checkSameRole(specialRole,roleTobeRemoved)){
								// add seconcondary role with default role id 
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								con.setAutoCommit(false);
								stmt = con.prepareStatement(admRoleUpdateQry);
								stmt.setString(1, param.getRoleId());
								stmt.setString(2, param.getSaleOrg());
								stmt.setString(3, param.getDateFrom());
								stmt.setString(4, param.getDateTo());
								stmt.setString(5, Constants.NGBO_UPDATED_USER_PREFIX+userId);
								stmt.setString(6, param.getUserId().split("-")[0].trim());
								isUpdate = stmt.executeUpdate();
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								
								//timService.addSpecialUserRole(param.getUserId().split("-")[0].trim(), param.getRoleId(),Constants.toDate(param.getDateFrom()),Constants.toDate(param.getDateTo()));
								timService.modifySpecialUserRole(userId,param.getUserId().split("-")[0].trim(), roleTobeRemoved, specialRole);
							}else{
								// add seconcondary role with default role id 
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								con.setAutoCommit(false);
								stmt = con.prepareStatement(admRoleUpdateOnlineQry);
								stmt.setString(1, param.getRoleId());
								stmt.setString(2, param.getSaleOrg());
								stmt.setString(3, param.getDateFrom());
								stmt.setString(4, param.getDateTo());
								stmt.setString(5, userId);
								stmt.setString(6, param.getUserId().split("-")[0].trim());
								isUpdate = stmt.executeUpdate();
								//--------------TIM ROLE OFFLINE CHANGES-------------------
							}
							con.commit();
							con.setAutoCommit(true);
							if(specialRole.getRoleCode().equalsIgnoreCase(roleTobeRemoved.getRoleCode()) && !(Constants.toDate(param.getPrev_dateTo()).equals(Constants.getYesterday())||Constants.toDate(param.getPrev_dateTo()).before(Constants.getYesterday()))){
								updateApdditionlRoles(logger,timService, param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateFrom(), Constants.toDate(param.getDateTo()), param.getPrev_dateFrom(), param.getPrev_dateTo(),userId);
							}else{
								updateApdditionlRoles(logger,timService, param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateFrom(), Constants.getYesterday(), param.getPrev_dateFrom(), param.getPrev_dateTo(),userId);
							}
							
							isUpdate=1;
						}catch(Exception e){
							logger.error((Constants.EXCEPTION + e),e);
							con.rollback();
							con.setAutoCommit(true);
							param.setMsg(Constants.getTimerror(e.getMessage().split(":")[0]));
							isUpdate=0;
						}
					}
					
					
				}else{
					if(timOffline){
						stmt = con.prepareStatement(updateUserSiteQry);
						stmt.setString(1, param.getRoleId());
//						stmt.setString(2, param.getSaleOrg());
						stmt.setString(2, param.getDateFrom());
						stmt.setString(3, param.getDateTo());
						stmt.setString(4, Constants.NGBO_UPDATED_USER_PREFIX+userId);
						stmt.setString(5, param.getUserId().split("-")[0].trim());
						stmt.setString(6, param.getSiteNo());
						isUpdate = stmt.executeUpdate();
					}else{
						try{
							//--------------TIM ROLE OFFLINE CHANGES-------------------
							con.setAutoCommit(false);
							stmt = con.prepareStatement(updateUserSiteQry);
							stmt.setString(1, param.getRoleId());
//							stmt.setString(2, param.getSaleOrg());
							stmt.setString(2, param.getDateFrom());
							stmt.setString(3, param.getDateTo());
							stmt.setString(4, Constants.NGBO_UPDATED_USER_PREFIX+userId);
							stmt.setString(5, param.getUserId().split("-")[0].trim());
							stmt.setString(6, param.getSiteNo());
							//isUpdate = stmt.executeUpdate();
							//--------------TIM ROLE OFFLINE CHANGES-------------------
							SecondaryRole[] scroleList=new SecondaryRole[1];
							SecondaryRole role=new SecondaryRole();
							role.setStoreID(param.getSiteNo());
							role.setRoleCode(param.getRoleId());
							role.setSalesOrgNo(param.getSaleOrg());
							role.setValidFrom(Constants.toDate(param.getDateFrom()));
							role.setValidTill(Constants.toDate(param.getDateTo()));
							scroleList[0]=role;					
							secondaryroleTobeRemoved=new SecondaryRole();
							secondaryroleTobeRemoved.setRoleCode(param.getPrev_roleId());
							secondaryroleTobeRemoved.setStoreID(param.getSiteNo());
							secondaryroleTobeRemoved.setSalesOrgNo(param.getSaleOrg());
							secondaryroleTobeRemoved.setValidFrom(Constants.toDate(param.getPrev_dateFrom()));
							secondaryroleTobeRemoved.setValidTill(Constants.toDate(param.getPrev_dateTo()));
							logger.info("to remove obj:"+CommonUtils.convertObjectTojson(secondaryroleTobeRemoved));
							logger.info("to add after remove obj:"+CommonUtils.convertObjectTojson(role));
//							System.out.println(CommonUtils.convertObjectTojson(secondaryroleTobeRemoved));
							logger.info(" ------- update secondary role ------");
							logger.info("param.getUserId() =====" + param.getUserId().split("-")[0]);
							logger.info("  secondaryRole.getRoleCode() "+ secondaryroleTobeRemoved.getRoleCode());
							logger.info("  secondaryRole.getSalesOrgNo() "+ secondaryroleTobeRemoved.getSalesOrgNo());
							logger.info("  secondaryRole.getValidFrom() "+ secondaryroleTobeRemoved.getValidFrom());
							logger.info("  secondaryRole.getValidTill() "+ secondaryroleTobeRemoved.getValidTill());
							logger.info("  secondaryRole.getStoreID() "+ secondaryroleTobeRemoved.getStoreID());
							logger.info("  secondaryRole.getRoleCode() "+ role.getRoleCode());
							logger.info("  secondaryRole.getSalesOrgNo() "+ role.getSalesOrgNo());
							logger.info("  secondaryRole.getValidFrom() "+ role.getValidFrom());
							logger.info("  secondaryRole.getValidTill() "+ role.getValidTill());
							logger.info("  secondaryRole.getStoreID() "+ role.getStoreID());
							//if(param.getIsDefaultFlag()==1){
							//	timService.addSecondaryRoles(userId,param.getUserId().split("-")[0].trim(), scroleList);
							//}else{
								timService.modifySecondaryRole(userId,param.getUserId().split("-")[0].trim(), secondaryroleTobeRemoved, role);
							//}
							con.commit();
							con.setAutoCommit(true);
//							timService.modifySecondaryRole(param.getUserId().split("-")[0].trim(), scroleList);
//							timService.addSecondaryRoles(param.getUserId().split("-")[0].trim(), scroleList);
							if(secondaryroleTobeRemoved.getRoleCode().equalsIgnoreCase(role.getRoleCode()) && !(Constants.toDate(param.getPrev_dateTo()).equals(Constants.getYesterday())||Constants.toDate(param.getPrev_dateTo()).before(Constants.getYesterday()))){
								updateApdditionlRoles(logger,timService, param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateFrom(), Constants.toDate(param.getDateTo()), param.getPrev_dateFrom(), param.getPrev_dateTo(),userId);
							}else{
								updateApdditionlRoles(logger,timService, param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateFrom(), Constants.getYesterday(), param.getPrev_dateFrom(), param.getPrev_dateTo(),userId);
							}
							
							isUpdate=1;
						}catch(Exception e){
							logger.error((Constants.EXCEPTION + e),e);
							con.rollback();
							con.setAutoCommit(true);
							param.setMsg(Constants.getTimerror(e.getMessage().split(":")[0]));
							isUpdate=0;
						}
					}
				}
				
			}else{
			
//			if(param.getIsPrimary().equalsIgnoreCase("Y")){
//				System.out.println(updateUserQry+CommonUtils.convertObjectTojson(param));
//				stmt = con.prepareStatement(updateUserQry);
//				stmt.setString(1, param.getSiteNo());
//				stmt.setString(2, param.getRoleId());
//				stmt.setString(3, param.getSaleOrg());
//				stmt.setString(4, param.getUserId().split("-")[0].trim());
//				stmt.setString(5, param.getUserId().split("-")[0].trim());
//				result = stmt.executeUpdate();
//			}
			
					if(Constants.isAdminUser(param.getRoleId())){
						
						if(timOffline){
							stmt = con.prepareStatement(admRoleInsertStatement);
							stmt.setString(1, param.getRoleId());
							stmt.setString(2, param.getDateFrom());
							stmt.setString(3, param.getDateTo());
							stmt.setString(4, param.getSaleOrg());
							stmt.setString(5, param.getUserId().split("-")[0].trim());
							result = stmt.executeUpdate();
						}else{
							try{
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								con.setAutoCommit(false);
								stmt = con.prepareStatement(admRoleInsertStatement);
								stmt.setString(1, param.getRoleId());
								stmt.setString(2, param.getDateFrom());
								stmt.setString(3, param.getDateTo());
								stmt.setString(4, param.getSaleOrg());
								stmt.setString(5, param.getUserId().split("-")[0].trim());
								result = stmt.executeUpdate();
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								//TODO: Changed on 04-Sep-15
								SpecialRole specialRole= new SpecialRole();
								specialRole.setRoleCode(param.getRoleId());
								specialRole.setSalesOrgNo(param.getSaleOrg());
								specialRole.setValidFrom(Constants.toDate(param.getDateFrom()));
								specialRole.setValidTill(Constants.toDate(param.getDateTo()));
								logger.info("Object data:"+param.getUserId().split("-")[0].trim()+"---"+param.getRoleId()+"---"
										+param.getSaleOrg()+"---"
										+param.getDateFrom()+"---"
										+param.getDateTo());
								//timService.addSpecialUserRole(param.getUserId().split("-")[0].trim(), param.getRoleId(),Constants.toDate(param.getDateFrom()),Constants.toDate(param.getDateTo()));
								timService.addSpecialUserRole(userId,param.getUserId().split("-")[0].trim(), specialRole);
								//timService.addSpecialUserRole(param.getUserId().split("-")[0].trim(), param.getRoleId(),Constants.toDate(param.getDateFrom()),Constants.toDate(param.getDateTo()));
								result=1;
								con.commit();
								con.setAutoCommit(true);
							}catch(Exception e){
								con.rollback();
								con.setAutoCommit(true);
								logger.error((Constants.EXCEPTION + e),e);
								param.setMsg(Constants.getTimerror(e.getMessage().split(":")[0]));
								result=0;
							}
						}
					}else{					
						
						if(timOffline){
							stmt = con.prepareStatement(sqlStatement);
							stmt.setString(1, param.getRoleId());
							stmt.setString(2, param.getDateFrom());
							stmt.setString(3, param.getDateTo());
							stmt.setString(4, param.getSiteNo());
//							stmt.setString(5, param.getSaleOrg());
							stmt.setString(5, param.getUserId().split("-")[0].trim());
							stmt.setString(6, param.getSaleOrg());
							result = stmt.executeUpdate();
						}else{
							try{
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								con.setAutoCommit(false);
								stmt = con.prepareStatement(sqlStatement);
								stmt.setString(1, param.getRoleId());
								stmt.setString(2, param.getDateFrom());
								stmt.setString(3, param.getDateTo());
								stmt.setString(4, param.getSiteNo());
//								stmt.setString(5, param.getSaleOrg());
								stmt.setString(5, param.getUserId().split("-")[0].trim());
								stmt.setString(6, param.getSaleOrg());
								result = stmt.executeUpdate();
								//--------------TIM ROLE OFFLINE CHANGES-------------------
								SecondaryRole[] scroleList=new SecondaryRole[1];
								SecondaryRole role=new SecondaryRole();
								role.setStoreID(param.getSiteNo());
								role.setRoleCode(param.getRoleId());
								role.setSalesOrgNo(param.getSaleOrg());
								role.setValidFrom(Constants.toDate(param.getDateFrom()));
								role.setValidTill(Constants.toDate(param.getDateTo()));
								scroleList[0]=role;		
//								System.out.println(CommonUtils.convertObjectTojson(secondaryroleTobeRemoved));
								logger.info(" ------- add secondary role ------");
								logger.info("param.getUserId() =====" + param.getUserId().split("-")[0]);
								logger.info("  secondaryRole.getRoleCode() "+ role.getRoleCode());
								logger.info("  secondaryRole.getSalesOrgNo() "+ role.getSalesOrgNo());
								logger.info("  secondaryRole.getValidFrom() "+ role.getValidFrom());
								logger.info("  secondaryRole.getValidTill() "+ role.getValidTill());
								logger.info("  secondaryRole.getStoreID() "+ role.getStoreID());
								logger.info("Add secondary role data:"+CommonUtils.convertObjectTojson(role));
								timService.addSecondaryRoles(userId,param.getUserId().split("-")[0].trim(), scroleList);
								result=1;
								con.commit();
								con.setAutoCommit(true);
							}catch(Exception e){
								con.rollback();
								con.setAutoCommit(true);
								logger.error((Constants.EXCEPTION + e),e);
								param.setMsg(Constants.getTimerror(e.getMessage().split(":")[0]));
								result=0;
							}
						}
					}
				
			}	
			
			logger.info("Updated count:"+isUpdate);
			logger.info("New count:"+result);
			
			if (result > 0 || isUpdate>0) {
				logger.info("Returing Success message.");
				try{
					updateDepartmentList(param.getUserId().split("-")[0].trim(),param.getSiteNo(),param.getDept(),stmt,con,userId);
				}catch(Exception e){
					logger.error(e);
				}
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
				try {
					stmt.close();
				} catch (SQLException e1) {
					// TODO Auto-generated catch block
					e1.printStackTrace();
				}
			try {
				if(!con.getAutoCommit()) con.setAutoCommit(true);
				DatabaseUtil.releaseConnection(con);//con.close();
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}

		return false;
	}
	
	private static SpecialRole createSpecialRoleObj(Date validTill,Date validFrom,String salesOrgNo,String roleCode){
		SpecialRole  specialRole = new SpecialRole();
		specialRole.setRoleCode(roleCode);
		specialRole.setSalesOrgNo(salesOrgNo);
		specialRole.setValidFrom(validFrom);
		specialRole.setValidTill(validTill);
		return specialRole;
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
				+ "','dd/mm/yyyy'),source='SC' where USD.USR_ID='"
				+ param.getUserId()
				+ "' and USD.STORE_COST_CENTRE_ID='" + param.getSiteNo() + "'";
		String admSqlStatement = "update " + Constants.NGBO_USR_SPECIAL_ROLES + " USD set USD.ACTV_END_DATE=to_date('"
				+ df.format(cal.getTime())
				+ "','dd/mm/yyyy'),source='SC' where USD.USR_ID='"
				+ param.getUserId()+ "' ";
//				+ "' and USD.STORE_COST_CENTRE_ID='" + param.getSiteNo() + "'";
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */

		PreparedStatement stmt = null;
		
		try {
			if(Constants.isAdminUser(param.getRoleId())){
				System.out.println("sqlStatement__" + admSqlStatement);
				stmt = con.prepareStatement(admSqlStatement);
			}else{
				System.out.println("sqlStatement__" + sqlStatement);
				stmt = con.prepareStatement(sqlStatement);
			}
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
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		String currentDate = null;
		Date currDate = null;
		if (date == null || date.trim().equals("")) {
			return flag;
		}
		try {
			endDate = df.parse(date);
			currentDate = df.format(new Date());
			currDate = df.parse(currentDate);
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
		if (endDate != null && endDate.compareTo(currDate) >= 0) {
			flag = "Y";
		} else
			flag = "N";
		return flag;

	}

	public static String updatePwd(String userId, String newPassword,String updatedUser)
			throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int rs = 0;
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
		
		/*String sqlStatement = "update usr us "
				+ " set us.PASSWORD = ?  where us.usr_id = ?";*/
		String sqlStatement = "update "+ Constants.NGBO_USR + " us "
				+ " set us.PASSWORD = ?,us.LOCKED_DATE = NULL,us.PASSWORD_EXPIRY_DATE=SYSDATE-1,us.last_updated_date=sysdate,us.last_updated_user=?  where lower(us.usr_id) = lower(?)";
		
		//System.out.println("sqlStatement_" + sqlStatement+newPassword);
		PreparedStatement stmt = null;
		//newPassword = PwdEncryptDecryptService.encrypt(newPassword);
		
		/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
		
		if (newPassword == null) {
			return "false";
		}
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, newPassword);
			// stmt.setString(2, passwordExpiryDate);
			stmt.setString(2, "SC_"+updatedUser);
			stmt.setString(3, userId);
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
		
		System.out.println("site no"+param.getSiteNo());
		String sqlStatement="";
		if(param.getSiteNo().equalsIgnoreCase("NONE")){
			sqlStatement ="SELECT DISTINCT usr.usr_id, usr.usr_nm , RP.ROLE_CODE, RP.ROLE_DESC , " +
					" usd.SALES_ORG, 'NONE' AS STORE_COST_CENTRE_ID , TO_CHAR(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE, " +
					" TO_CHAR(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE, USD.SALES_ORG, dpt.DEPT_ID AS dept, dpt.DEPT_name AS DEPT_name," +
					" TO_CHAR(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE," +
					" USD.LAST_CREATED_USER, TO_CHAR(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE," +
					" USD.LAST_UPDATED_USER, sal.sales_org_name sales_org_name, '' AS site_name," +
					" (SELECT USR.usr_nm FROM USR where USR.usr_id   = usd.LAST_UPDATED_USER) AS LAST_UPDATED_USER_NAME," +
					" TO_CHAR(USD.LAST_LOGIN_TIME,'dd/mm/yyyy hh:mi AM') AS LAST_LOGIN_TIME ," +
					" CASE WHEN usr.STORE_COST_CENTRE_ID is null THEN 'Y' ELSE 'N' END AS primary_flag ," +
					" CASE WHEN usd.source = 'SC' then 'P' else CASE WHEN TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) and TRUNC(USD.ACTV_START_DATE) <= TRUNC(sysdate) THEN 'Y' ELSE 'N' end END AS active_flag FROM "+Constants.NGBO_USR+" USR JOIN " +Constants. NGBO_USR_SPECIAL_ROLES+ " USD " +
					" ON (usr.usr_id=USD.USR_ID ) JOIN ROLE_PROFILE RP ON (USD.ROLE=RP.ROLE_CODE) LEFT OUTER JOIN sales_org sal ON USD.SALES_ORG=sal.sales_org LEFT OUTER JOIN "+Constants.NGBO_PRIMARY_DPT+" dpt ON dpt.site='NONE' AND usd.usr_id =dpt.usr_id and dpt.isactive = '"+Constants.ACTIVE+"' WHERE LOWER(usr.usr_id) =LOWER(?)  ";
		}else{
			sqlStatement = "SELECT DISTINCT usr.usr_id, usr.usr_nm ,RP.ROLE_CODE,RP.ROLE_DESC ,"
				+ " sm.SALES_ORG,USD.STORE_COST_CENTRE_ID,to_char(USD.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE, "
				+ " to_char(USD.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,sm.SALES_ORG,dpt.DEPT_ID as dept,dpt.DEPT_name as DEPT_name, "
				+ " to_char(USD.LAST_CREATED_DATE,'dd/mm/yyyy') LAST_CREATED_DATE, "
				+ " USD.LAST_CREATED_USER,to_char(USD.LAST_UPDATED_DATE,'dd/mm/yyyy') LAST_UPDATED_DATE,USD.LAST_UPDATED_USER,"
				+ " (SELECT USR.usr_nm FROM USR where USR.usr_id  = usd.LAST_UPDATED_USER) AS LAST_UPDATED_USER_NAME," 
				+ " sal.sales_org_name sales_org_name,nvl('',sm.site_name) site_name,to_char(USD.LAST_LOGIN_TIME,'dd/mm/yyyy hh:mi AM') as LAST_LOGIN_TIME ,case when usr.STORE_COST_CENTRE_ID=cast(usd.STORE_COST_CENTRE_ID as number) then 'Y' else 'N' end as primary_flag," +
				  " CASE WHEN usd.source = 'SC' then 'P' else CASE WHEN TRUNC(USD.ACTV_END_DATE) >= TRUNC(sysdate) and TRUNC(USD.ACTV_START_DATE) <= TRUNC(sysdate) THEN 'Y' ELSE 'N' end END AS active_flag FROM "+Constants.NGBO_USR+"  USR JOIN "+Constants.NGBO_USR_SITE+" USD on (usr.usr_id=USD.USR_ID ) join "
				+ " ROLE_PROFILE RP on (USD.SC_ROLE=RP.ROLE_CODE) LEFT OUTER JOIN "+Constants.NGBO_SITEMASTER_ALLSTORE+" sm  ON sm.site =USD.STORE_COST_CENTRE_ID left outer join sales_org sal on sm.SALES_ORG=sal.sales_org LEFT OUTER JOIN "+Constants.NGBO_PRIMARY_DPT+" dpt ON  usd.store_cost_centre_id=dpt.site and dpt.isactive = '"+Constants.ACTIVE+"' and usd.usr_id=dpt.usr_id "
				+ " where lower(usr.usr_id) =lower(?)  and USD.STORE_COST_CENTRE_ID=? ";
		}

		PreparedStatement stmt = null;
		try {
			logger.info("get User detail Query:"+sqlStatement);
			stmt = con.prepareStatement(sqlStatement);
			if(param.getSiteNo().equalsIgnoreCase("NONE")){
				stmt.setString(1, param.getSubmitBy());
			}else{
				stmt.setString(1, param.getSubmitBy());
				stmt.setString(2, param.getSiteNo());
			}

			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userDetail = new HashMap<String, ArrayList<UserSiteDtl>>();
				while (rs.next()) {

					if (rs.getString("usr_id") != null) {
						if (userDetail.containsKey(rs.getString("usr_id"))) {
							userSiteDtlList = userDetail.get(rs
									.getString("usr_id"));
							int index=UserSiteDtl.hasKey(userSiteDtlList, rs.getString("STORE_COST_CENTRE_ID"));
							
							if(index>0){
								userSiteDtlList.get(index-1).getDeptList().add(rs.getString("DEPT")+"-"+rs.getString("DEPT_NAME"));
							}else{							
								UserSiteDtl usd=new UserSiteDtl(
										rs.getString("usr_id"),
										rs.getString("usr_nm"),
										rs.getString("STORE_COST_CENTRE_ID"),
										rs.getString("ROLE_CODE"),
										rs.getString("ROLE_DESC"),
										rs.getString("ACTV_START_DATE"),
										rs.getString("ACTV_END_DATE"),
										rs.getString("active_flag"),
										rs.getString("DEPT"), rs
												.getString("SALES_ORG"),
										rs.getString("sales_org_name"),
										rs.getString("LAST_CREATED_USER"),
										rs.getString("LAST_UPDATED_USER"),
										rs.getString("LAST_CREATED_DATE"),
										rs.getString("LAST_UPDATED_DATE"),
										rs.getString("site_name"), "");
								usd.setLastLoggedinTime(rs.getString("LAST_LOGIN_TIME"));
								usd.setPrimary_strore(rs.getString("primary_flag"));
								usd.setUpdatedUserName(rs.getString("LAST_UPDATED_USER_NAME"));
								if(null!=rs.getString("DEPT")){
									usd.getDeptList().add(rs.getString("DEPT")+"-"+rs.getString("DEPT_NAME"));
								}
								userSiteDtlList
										.add(usd);
							}
						} else {
							userSiteDtlList = new ArrayList<UserSiteDtl>();
							UserSiteDtl usd=new UserSiteDtl(
									rs.getString("usr_id"),
									rs.getString("usr_nm"),
									rs.getString("STORE_COST_CENTRE_ID"),
									rs.getString("ROLE_CODE"),
									rs.getString("ROLE_DESC"),
									rs.getString("ACTV_START_DATE"),
									rs.getString("ACTV_END_DATE"),
									rs.getString("active_flag"),
									rs.getString("DEPT"), rs
											.getString("SALES_ORG"),
									rs.getString("sales_org_name"),
									rs.getString("LAST_CREATED_USER"),
									rs.getString("LAST_UPDATED_USER"),
									rs.getString("LAST_CREATED_DATE"),
									rs.getString("LAST_UPDATED_DATE"),
									rs.getString("site_name"), "");
							usd.setLastLoggedinTime(rs.getString("LAST_LOGIN_TIME"));
							usd.setPrimary_strore(rs.getString("primary_flag"));
							usd.setUpdatedUserName(rs.getString("LAST_UPDATED_USER_NAME"));
							if(null!=rs.getString("DEPT")){
								usd.getDeptList().add(rs.getString("DEPT")+"-"+rs.getString("DEPT_NAME"));
							}
							userSiteDtlList
									.add(usd);
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
		CommonUtils.convertObjectTojson(userDetail);
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

	
	public static String updateUserFuncSettings(String userId, String siteId,String createduserId,
			String[] userSelectedPreferences) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result;
		if(siteId==null || siteId.equalsIgnoreCase("")) siteId="NONE";
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.sales_org_name  from USR_SHORTCUT_FCTN uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
		String deleteStatement = "delete from USER_EXCEPTION_TBL s where s.usr_id=? and s.site_id=? ";
		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ALL ");
		for (int i = 0; i < userSelectedPreferences.length; i++) {
			insertStatement
					.append("INTO USER_EXCEPTION_TBL (usr_id,site_id,FUNCTN_CODE,CHANGED_TS,created_usr,created_date,UPDATED_USR,UPDATED_DATE) "
							+ " VALUES ('"
							+ userId
							+ "',"
							+ "'"
							+ siteId
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[1] + "',TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS')"
							+ ","
							+ "'"
							+ createduserId + "',SYSDATE"
							+ ","
							+ "'"
							+ createduserId + "',SYSDATE"
							+")");
		}
		insertStatement.append(" SELECT * FROM dual");

		System.out.println("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {
			System.out.println(deleteStatement+"user "+userId+"Site "+siteId);
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
				return Constants.TRUE;
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
	
	public static String updateUserAdditionalRoles(String userId, String siteId,String createduserId,
			String[] userSelectedPreferences, String actStartDate, String actEndDate) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		int result;
		if(siteId==null || siteId.equalsIgnoreCase("")) siteId="NONE";
		// Map<String, UserPreferences> userPreferences = null;

		// String sqlStatement =
		// "select uf.HOME_SHORTCUT_FCTN_ID,uf.PRIORITY,hf.DESCRIPTION  from USR_SHORTCUT_FCTN uf,HOME_SHORTCUT_FCTN hf where usr_id= ? and uf.HOME_SHORTCUT_FCTN_ID=hf.code order by uf.priority";
//		String deleteStatement = "delete from "+Constants.NGBO_USR_ADDITIONAL_ROLES+" s where s.usr_id=? and s.store_cost_centre_id=? ";
//		System.out.println("Delete Qry :"+deleteStatement);
		StringBuffer insertStatement = new StringBuffer();
		insertStatement.append("INSERT ALL ");
		for (int i = 0; i < userSelectedPreferences.length; i++) {
			insertStatement
					.append("INTO "+Constants.NGBO_USR_ADDITIONAL_ROLES+" (usr_id,store_cost_centre_id,role,system,actv_start_date,actv_end_date,changed_ts,last_created_user,last_created_date,last_updated_user,last_updated_date) "
							+ " VALUES ('"
							+ userId
							+ "',"
							+ "'"
							+ siteId
							+ "',"
							+ "'"
							+ userSelectedPreferences[i].split(":")[1]
							+ "',"
							+ "'"
							+ "1POS"
							+ "',"
							+ ""
							+ "to_date('"+actStartDate+"','DD/MM/YYYY')"
							+ ","
							+ ""
							+ "to_date('"+actEndDate+"','DD/MM/YYYY')"
							+ ",TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') "
							+ ","
							+ "'"
							+ createduserId + "',sysdate"
							+ ","
							+ "'"
							+ createduserId + "',sysdate"
							+")");
		}
		insertStatement.append(" SELECT * FROM dual");

		System.out.println("insert query" + insertStatement.toString());
		PreparedStatement stmt = null;
		try {

//			stmt = con.prepareStatement(deleteStatement);
//			stmt.setString(1, userId);
//			stmt.setString(2, siteId);
//
//			result = stmt.executeUpdate();
//			System.out.println("DELETE Result" + result);
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
				return Constants.TRUE;
			}
			// }
			else {
				return Constants.FALSE;
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

	public static Map<String, String> getAllSalesOrg(String salesOrg) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, String> saleOrgs = null;
		String where=" where SALES_ORG not in ('"+Constants.COUNTDOWN+"') ";
		if(salesOrg.equalsIgnoreCase(Constants.COUNTDOWN)){
			where=" where SALES_ORG in ('"+Constants.COUNTDOWN+"') ";
		}
		
		String sqlStatement = "select * from "+Constants.NGBO_SALES_ORG +where;
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
							rs.getString("SALES_ORG_name"));
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return null;
	}
	
	public static Map<String, String> getAllSalesAllOrg() throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, String> saleOrgs = null;
//		String where=" where SALES_ORG not in ('"+Constants.COUNTDOWN+"') ";
//		if(salesOrg.equalsIgnoreCase(Constants.COUNTDOWN)){
//			where=" where SALES_ORG in ('"+Constants.COUNTDOWN+"') ";
//		}
		
		String sqlStatement = "select * from "+Constants.NGBO_SALES_ORG ;
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
							rs.getString("SALES_ORG_name"));
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
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return null;
	}
	
	public static boolean updateDepartmentList(String userId,String site,String[] departments, PreparedStatement stmt, Connection con,String createdUser)
			throws Exception {

		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		logger.info("updateDepartmentList start time --- " + startTime);
		
		String deleteQry="UPDATE "+Constants.NGBO_PRIMARY_DPT+" SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.SOFT_DELETE+"' WHERE USR_ID=? AND SITE=?";
		String sqlStatement = "MERGE INTO "+Constants.NGBO_PRIMARY_DPT+" dept "
				+" USING ( select '"+userId+"' usr_id  from dual) d "
				+" on (dept.usr_id = d.usr_id and dept.site='"+site+"' and dept.dept_id = ? )"
				+" WHEN MATCHED THEN "
				+" UPDATE SET CHANGED_TS = TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') , ISACTIVE = '"+Constants.ACTIVE+"' WHERE LOWER(USR_ID)=lower('"+userId+"') and dept_id = ? and site='"+site+"' "
				+" WHEN NOT MATCHED THEN "
				+" INSERT (USR_ID,DEPT_ID,LAST_CREATED_USER,LAST_CREATED_DATE,SITE,DEPT_NAME) "
				+" VALUES ('"+userId+"',?,'"+userId+"',sysdate,'"+site+"',?)";
		
		try {
			stmt = con.prepareStatement(deleteQry);
			stmt.setString(1, userId);
			stmt.setString(2, site);
			stmt.executeUpdate();
			
			if(departments==null || departments.length<=0) return false;
			
			logger.info("query generated --- "+ sqlStatement);
			
			stmt = con.prepareStatement(sqlStatement);
			
			for(int i=0;i<departments.length;i++){
				
				stmt.setObject(1,departments[i].split("-")[0]);
				stmt.setObject(2,departments[i].split("-")[0]);
				stmt.setObject(3, departments[i].split("-")[0]);
				stmt.setObject(4,departments[i].split("-")[1]);
				stmt.executeUpdate();
			}
			
		
			
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			
		}

		endTime = System.currentTimeMillis();
		logger.info("updateDepartmentList end time --- " + endTime);
		logger.info("total taken time--- " + (endTime - startTime));
		
		return true;
	}

	public static boolean isDepartmentMandatory(String userId,
			UserManagementParam param) throws SQLException {
		
		if(Constants.isAdminUser(param.getRoleId())){
			return false;
		}
//		String str="select count(*) row_count from usr u,usr_site_dtl usd where u.usr_id=usd.usr_id and u.primary_store=usd.store_cost_centre_id and u.usr_id='"+userId+"' and u.primary_store='"+param.getSiteNo()+"'";
		String str="select count(*) row_count from usr u where lower(u.usr_id)=lower('"+userId+"') and u.STORE_COST_CENTRE_ID="+param.getSiteNo()+"";
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(str);
			rs = stmt.executeQuery();
			if (rs != null) {
				while (rs.next()) {
					if(rs.getInt("row_count")==0){
						return false;
					}else{
						return true;
					}
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}		
		return false;
	}

	public static String removeUserAdditionalRoles(String userId,
			String siteNo, String userId2, String[] selectedAdditionalRoles,
			String actStartDate, String actEndDate) throws SQLException {
		// TODO Auto-generated method stub
		Connection  con=null;
		PreparedStatement stmt=null;
		String deleteQry="DELETE FROM "+Constants.NGBO_USR_ADDITIONAL_ROLES+" WHERE lower(USR_ID)=lower('"+userId+"') AND store_cost_centre_id='"+siteNo+"' ";	
		System.out.println(deleteQry);
		try {
			con=DatabaseUtil.getConnection();
			stmt = con.prepareStatement(deleteQry);
		
			stmt.executeUpdate();
			
			if(selectedAdditionalRoles!=null && selectedAdditionalRoles.length>0){
				deleteQry+=" and role in('"+selectedAdditionalRoles[0]+"'";
				for(int i=0;i<selectedAdditionalRoles.length;i++){
					deleteQry+=",'"+selectedAdditionalRoles[i].split(":")[1]+"'";	
				}
				deleteQry+=")";
			}
			System.out.println(deleteQry);
		
			stmt = con.prepareStatement(deleteQry);
			stmt.executeUpdate();
			
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return Constants.FALSE;
		} catch (Exception e) {
			e.printStackTrace();
			return Constants.FALSE;
		} finally {
			if(null!=stmt) stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();			
		}
		return Constants.TRUE;
		
	}
 
	public static void updateApdditionlRoles(Logger log,NGBOServices timService,String UserId,String site,String actStartDate,Date actEndDate,String prev_actStartDate,String prev_actEndDate, String requestor) throws SystemException, InvalidInputException, InvalidUserException, SuspendedUserException, timRequestNotStartedException, timRequestPendingException, timRequestFailedException, SQLException, InvalidSecondaryRoleException{
		if(site==null || site.equalsIgnoreCase("")){
			site="NONE";
		}
		
		ArrayList<String> additonalRoles=null;
		additonalRoles=getAllAdditionalRoles( UserId,site,prev_actEndDate);
		
		if(site==null || site.equalsIgnoreCase("") || site.equalsIgnoreCase("NONE") ||site.equalsIgnoreCase("ALL")){
			site="";
		}
		
		for(String str:additonalRoles){	    	
			AdditionalRole toRemoveadditionalRole= new AdditionalRole();
			toRemoveadditionalRole.setTargetSystem("1POS");
			toRemoveadditionalRole.setRoleCode(str);
			toRemoveadditionalRole.setStoreID(site);
			toRemoveadditionalRole.setValidFrom(Constants.toDate(prev_actStartDate));
			toRemoveadditionalRole.setValidTill(Constants.toDate(prev_actEndDate));
			
			AdditionalRole additionalRole= new AdditionalRole();
			additionalRole.setTargetSystem("1POS");
			additionalRole.setRoleCode(str);
			additionalRole.setStoreID(site);
			additionalRole.setValidFrom(Constants.toDate(actStartDate));
			additionalRole.setValidTill(actEndDate);
			log.info("addtional role remove->"+CommonUtils.convertObjectTojson(toRemoveadditionalRole));
			log.info("addtional role add->"+CommonUtils.convertObjectTojson(additionalRole));
			log.info(" removing additional roles"+ toRemoveadditionalRole.getTargetSystem() );
			log.info(" removing additional roles"+ toRemoveadditionalRole.getRoleCode() );
			log.info(" removing additional roles"+ toRemoveadditionalRole.getStoreID() );
			log.info(" removing additional roles getValidFrom"+ toRemoveadditionalRole.getValidFrom());
			log.info(" removing additional roles getValidTill"+ toRemoveadditionalRole.getValidTill());
			log.info(" adding  additional roles"+ additionalRole.getTargetSystem());
			log.info(" adding  additional roles"+ additionalRole.getRoleCode());
			log.info(" adding  additional roles"+ additionalRole.getStoreID());
			log.info(" adding  additional roles getValidFrom"+ additionalRole.getValidFrom());
			log.info(" adding  additional roles getValidTill"+ additionalRole.getValidTill());
			
			timService.modifyAdditionalRole(requestor,UserId, toRemoveadditionalRole, additionalRole);
		
	    }
	}

	public static ArrayList<String> getAllAdditionalRoles(String userId, String site,String endDate) throws SQLException {
		// TODO Auto-generated method stub
		
		ArrayList<String> res=new ArrayList<String>();
		logger.info(" End date :"+endDate);
		if(site==null||site.equalsIgnoreCase("NONE")||site.trim().equalsIgnoreCase("")) site="All";
		String getAddRoleQry="select role from USR_ADDITIONAL_ROLES where lower(USR_ID)=lower('"+userId+"') and STORE_COST_CENTRE_ID='"+site+"' and ACTV_END_DATE='"+new SimpleDateFormat("dd/MMM/yyyy").format(Constants.toDate(endDate))+"'";
		logger.info("Get all aditional roles qry:"+getAddRoleQry);
		Connection con=null;
		PreparedStatement stmt=null;
		ResultSet rs=null;
		
		con=DatabaseUtil.getConnection();
		try {
			stmt=con.prepareStatement(getAddRoleQry);		
			rs=stmt.executeQuery();
			while(rs.next()){
				res.add(rs.getString("role"));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(rs!=null) rs.close();
			if(stmt!=null) stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}
		System.out.println(CommonUtils.convertObjectTojson(res));
		return res;
	}
	
public static AdditionalRole checkIfAdditionalRoleExist(String userId, String site,String addtionalRoleCode) throws SQLException {
		// TODO Auto-generated method stub
		AdditionalRole res=null;
		if(site==null||site.trim().equalsIgnoreCase("")) site="All";
		String getAddRoleQry="select role,TO_CHAR(actv_start_date,'DD/MM/YYYY') actv_start_date,TO_CHAR(actv_end_date,'DD/MM/YYYY') actv_end_date from USR_ADDITIONAL_ROLES where lower(USR_ID)=lower('"+userId+"') and STORE_COST_CENTRE_ID='"+site+"' and role='"+addtionalRoleCode+"'";
		logger.info("Get aditional roles qry:"+getAddRoleQry);
		Connection con=null;
		PreparedStatement stmt=null;
		ResultSet rs=null;
		
		con=DatabaseUtil.getConnection();
		try {
			stmt=con.prepareStatement(getAddRoleQry);		
			rs=stmt.executeQuery();
			while(rs.next()){
				res=new AdditionalRole();
				res.setTargetSystem("1POS");
				res.setRoleCode(rs.getString("role"));
				res.setStoreID(((site.equalsIgnoreCase("NONE")||site.equalsIgnoreCase("All"))?"":site));
				res.setValidFrom(Constants.toDate(rs.getString("actv_start_date")));
				res.setValidTill(Constants.toDate(rs.getString("actv_end_date")));
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}finally{
			if(rs!=null) rs.close();
			if(stmt!=null) stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		System.out.println(CommonUtils.convertObjectTojson(res));
		return res;
}
	
public static ArrayList<UserInfoModel> getAdminRoleFromSc(String userId,String role,String site){
		
		String getAdminDtlQry="select U.USR_ID,to_char(US.sales_org) sales_org,TO_CHAR(us.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE,TO_CHAR(us.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,US.ROLE ROLE,'NONE' STORE,case when us.usr_id=u.usr_id and TRUNC(us.ACTV_END_DATE) >= TRUNC(sysdate) then 'Y' else 'N' end as isAdminRoleActive,case when us.ROLE='"+role+"' then 'Y' else 'N' end as isAdminRoleEXIST,'N' ISSTOREROLEACTIVE,'N' ISSTOREROLEEXIST,'N' ISPRIMARYROLE from USR u left outer join USR_SPECIAL_ROLES us on us.usr_id=u.usr_id ";
		
		String getSecRoleDtlQry="select US.USR_ID,to_char(US.sales_org) sales_org,TO_CHAR(us.ACTV_START_DATE,'dd/mm/yyyy') ACTV_START_DATE,TO_CHAR(us.ACTV_END_DATE,'dd/mm/yyyy') ACTV_END_DATE,US.SC_ROLE ROLE,to_char(US.STORE_COST_CENTRE_ID) STORE,'N' isAdminRoleActive, 'N' isAdminRoleEXIST,case when us.usr_id=u.usr_id AND TRUNC(us.ACTV_END_DATE) >= TRUNC(sysdate) then 'Y' else 'N' end as ISSTOREROLEACTIVE,'N' as ISSTOREROLEEXIST,'N' as ISPRIMARYROLE from USR u left outer join USR_SITE_DTL us on us.usr_id=u.usr_id";

		String unitedQry=" select distinct tbl.* from ( "+getAdminDtlQry+" ) tbl";
		
		if(Constants.isAdminUser(role)){
			unitedQry=" select distinct tbl.* from ( "+getSecRoleDtlQry+" ) tbl";
		}
		
		String where=" where tbl.usr_id='"+userId+"' ";
		
		unitedQry+=where;

		ArrayList<UserInfoModel> result= new ArrayList<UserInfoModel>();
		
		PreparedStatement stmt = null;
		Connection con = null;
		ResultSet rs = null;
		try {
			logger.info("Get Existing roles:"+unitedQry);
			con=DatabaseUtil.getConnection();
			stmt = con
					.prepareStatement(unitedQry);
			
			rs = stmt.executeQuery();
			System.out.println("unitedQry"+ unitedQry);
			while (rs.next()) {
				UserInfoModel itm=new UserInfoModel(rs.getString("usr_id"),
						rs.getString("store"),
						rs.getString("sales_org"),
						rs.getString("role"),
						rs.getString("ACTV_START_DATE"),
						rs.getString("ACTV_END_DATE"),
						rs.getString("ISPRIMARYROLE"),
						rs.getString("ISSTOREROLEEXIST"),
						rs.getString("ISSTOREROLEACTIVE"),
						rs.getString("isAdminRoleEXIST"),
						rs.getString("isAdminRoleActive"));
				result.add(itm);				
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			try {
				if (rs != null)
					rs.close();
				if (stmt != null)
					stmt.close();
				DatabaseUtil.releaseConnection(con);//con.close();
			} catch (SQLException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		return result;
	
	}

public static int countAdditionalRole (UserManagementParam param)
		throws Exception {

	
	
String str="select count(*) from "+Constants.NGBO_USR_ADDITIONAL_ROLES + " where USR_ID=? and STORE_COST_CENTRE_ID=?";
	Connection con= null;
	ResultSet rs = null;
	PreparedStatement stmt = null;
	int countFromQuery = 0;
	try {
		con = DatabaseUtil.getConnection();
		stmt = con.prepareStatement(str);
		stmt.setObject(1, param.getUserId());
		stmt.setObject(2, param.getSiteNo());
		rs = stmt.executeQuery();
		if (rs != null) {
			while (rs.next()) {
				countFromQuery = rs.getInt(1);
				return countFromQuery;
			}
		}
	} catch (SQLException e) {
		e.printStackTrace();
		return 0;
	} catch (Exception e) {
		e.printStackTrace();
		
	} finally {
		if (rs != null)
			rs.close();
		if (stmt != null)
			stmt.close();
		DatabaseUtil.releaseConnection(con);
	}		
	return 0;
}


public static boolean deactiveAdditioanlRoleDAO(UserManagementParam param)throws Exception {

	Connection con = null;// initi to null here
	int result = 0;
	SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	// ResultSet rs=null;

	Calendar cal = Calendar.getInstance();
	cal.setTime(new Date());
	cal.add(Calendar.DATE, -1);
	

	String sqlStatement = "update "+Constants.NGBO_USR_ADDITIONAL_ROLES+" USD set USD.ACTV_END_DATE=to_date('"
			+ df.format(cal.getTime())
			+ "','dd/mm/yyyy') where USD.USR_ID=? and USD.STORE_COST_CENTRE_ID=?";
			

	PreparedStatement stmt = null;
	
	
	try {
		con = DatabaseUtil.getConnection();
		stmt = con.prepareStatement(sqlStatement);
		stmt.setObject(1, param.getUserId());
		stmt.setObject(2, param.getSiteNo());
		// give store details
		result = stmt.executeUpdate();
		if (result > 0) {
			return true;
		} else {
			return false;
		}
	}
	catch (SQLException e) {
		e.printStackTrace();
		
	}
	finally {
		
		if (stmt != null)
			stmt.close();
		DatabaseUtil.releaseConnection(con);//con.close();
	}	
	return false;
		
}
public static int countTimServicecall(UserManagementParam param)throws Exception {
	
	String str="SELECT COUNT(*) FROM ( (SELECT usd.usr_id AS col_1,to_char(usd.store_cost_centre_id) as site FROM usr_site_dtl usd, usr u WHERE u.usr_id =usd.usr_id AND usd.USR_ID =? AND usd.actv_start_date<=sysdate AND usd.actv_end_date >=sysdate ) UNION (SELECT usd.usr_id AS col_1,'NONE' as site FROM usr_special_roles usd, usr u WHERE u.usr_id =usd.usr_id AND usd.USR_ID =? AND usd.actv_start_date<=sysdate AND usd.actv_end_date >=sysdate ))";
	Connection con= null;
	ResultSet rs = null;
	PreparedStatement stmt = null;
	int countFromQuery = 0;
	try {
		con = DatabaseUtil.getConnection();
		stmt = con.prepareStatement(str);
		stmt.setObject(1, param.getUserId());
		stmt.setObject(2, param.getUserId());
		//stmt.setObject(2, param.getSiteNo());
		rs = stmt.executeQuery();
		if (rs != null) {
			while (rs.next()) {
				countFromQuery = rs.getInt(1);
				return countFromQuery;
			}
		}
	} catch (SQLException e) {
		e.printStackTrace();
		return 0;
	} catch (Exception e) {
		e.printStackTrace();
		
	} finally {
		if (rs != null)
			rs.close();
		if (stmt != null)
			stmt.close();
		DatabaseUtil.releaseConnection(con);
	}		
	return 0;
}

public static void getIfDefaultRoleAlreadyDeactvated(UserManagementParam param)throws Exception {
	
	String str="select to_char(default_prev_date,'DD/MM/YYYY') default_prev_date,default_flag,default_store from usr where usr_id=?";
	Connection con= null;
	ResultSet rs = null;
	PreparedStatement stmt = null;
	try {
		con = DatabaseUtil.getConnection();
		stmt = con.prepareStatement(str);
		stmt.setObject(1, param.getUserId());
		rs = stmt.executeQuery();
		if (rs != null) {
			while (rs.next()) {
				param.setDefaultStore(rs.getString("default_store"));
				param.setDefaultPrevDate(rs.getString("default_prev_date"));
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
		DatabaseUtil.releaseConnection(con);
	}
}

public static int getIsDefaultRoleActive(UserManagementParam param)throws Exception {
	
	if(param.getPrev_dateTo()==null || Constants.toDate(param.getPrev_dateTo()).equals(Constants.getYesterday())||Constants.toDate(param.getPrev_dateTo()).before(Constants.getYesterday())){		
		String str="select u.default_flag,u.default_store from USR u where u.usr_id=?";
		Connection con= null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		int countFromQuery = 0;
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(str);
			stmt.setObject(1, param.getUserId().split("-")[0].trim());
			rs = stmt.executeQuery();
			if (rs != null) {
				while (rs.next()) {
					countFromQuery = rs.getInt("default_flag");
					param.setDefaultStore(rs.getString("default_store"));
					return countFromQuery;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
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
	return 0;
}

public static int getIsDefaultRoleFlag(UserManagementParam param)throws Exception {
	
	if(param.getPrev_dateTo()==null || Constants.toDate(param.getPrev_dateTo()).equals(Constants.getYesterday())||Constants.toDate(param.getPrev_dateTo()).before(Constants.getYesterday())){		
		String str="select u.default_flag,u.default_store,sm.sales_org from USR u,"+Constants.NGBO_SITEMASTER+" sm where u.usr_id=? and sm.site=u.default_store";
		Connection con= null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		int countFromQuery = 0;
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(str);
			stmt.setObject(1, param.getUserId().split("-")[0].trim());
			//stmt.setObject(2, param.getSiteNo());
			rs = stmt.executeQuery();
			if (rs != null) {
				while (rs.next()) {
					countFromQuery = rs.getInt("default_flag");
					param.setDefaultStore(rs.getString("default_store"));
					param.setDefaultSalesOrg(rs.getString("sales_org"));
					return countFromQuery;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
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
	return 0;
}

public static int getIsDefaultRoleFlagForSpecial(UserManagementParam param)throws Exception {
	if(param.getPrev_dateTo()==null || Constants.toDate(param.getPrev_dateTo()).equals(Constants.getYesterday())||Constants.toDate(param.getPrev_dateTo()).before(Constants.getYesterday())){		
		String str="select u.default_flag,u.default_store,usd.sales_org from USR u,usr_special_roles usd where u.usr_id=? and u.usr_id=usd.usr_id(+)";
		Connection con= null;
		ResultSet rs = null;
		PreparedStatement stmt = null;
		int countFromQuery = 0;
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(str);
			stmt.setObject(1, param.getUserId().split("-")[0].trim());
			//stmt.setObject(2, param.getSiteNo());
			rs = stmt.executeQuery();
			if (rs != null) {
				while (rs.next()) {
					countFromQuery = rs.getInt("default_flag");
					param.setDefaultStore(rs.getString("default_store"));
					param.setDefaultSalesOrg(rs.getString("sales_org"));
					return countFromQuery;
				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return 0;
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
	return 0;
}

public static boolean checkSameRole(SpecialRole sr1,SpecialRole sr2){
	boolean flag=false;
	if(sr1.getRoleCode().equalsIgnoreCase(sr2.getRoleCode())
			&& sr1.getSalesOrgNo().equalsIgnoreCase(sr2.getSalesOrgNo())
			&& sr1.getValidFrom().equals(sr2.getValidFrom())
			&& sr1.getValidTill().equals(sr2.getValidTill())){
		flag=true;
	}
	return flag;
}

}
	

