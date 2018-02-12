package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.regex.Pattern;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.BroadcastMessageModel;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xmtu6
 * 
 */
public class BroadcastDAOImpl {

	//static SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	private static final Logger log = Logger.getLogger(BroadcastDAOImpl.class
			.getName());

	public static ArrayList<BroadcastMessageModel> getBrodcastMessage()
			throws SQLException {

		String getbrodcastQry = "select id,message,to_char(active_from,'dd/mm/yyyy hh:mi AM') start_date,to_char(active_to,'dd/mm/yyyy hh:mi AM') end_date,ACKNOWLEGEMNET,sales_org from broadcast_details order by modified_ts desc";
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		ArrayList<BroadcastMessageModel> res = new ArrayList<BroadcastMessageModel>();

		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(getbrodcastQry);
			rs = stmt.executeQuery();
			while (rs.next()) {
				BroadcastMessageModel itm = new BroadcastMessageModel();
				itm.setMessage_id(rs.getString("id"));
				itm.setBroadcastMessage(rs.getString("message"));
				itm.setStartDate(rs.getString("start_date"));
				itm.setEndDate(rs.getString("end_date"));
				itm.setSalesOrg(rs.getString("sales_org"));
				if (rs.getString("ACKNOWLEGEMNET") != null
						&& rs.getString("ACKNOWLEGEMNET").equalsIgnoreCase("Y")) {
					itm.setAckRequired("Required");
				} else {
					itm.setAckRequired("Not Required");
				}
				res.add(itm);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		return res;
	}

	public static BroadcastMessageModel createBroadcast(
			BroadcastMessageModel param) throws SQLException {

		String getbcidQry = "select BC_DETAILS_SEQ.nextval seq from dual";
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;

		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(getbcidQry);
			rs = stmt.executeQuery();
			while (rs.next()) {
				param.setMessage_id(rs.getString("seq"));
			}
			insertBrodcastDetail(param, con);

			if (!param.getSalesOrg().equalsIgnoreCase("All")) {
				insertDepartmentDetails(param, con);
				insertRoles(param, con);
				if (param.getSiteOrRegion().equalsIgnoreCase("site")) {
					insertStores(param, con);
				} else if (param.getSiteOrRegion().equalsIgnoreCase("region")){
					insertRegion(param, con);
				}
			}
			param.setMsg(Constants.SUCCESS);
		} catch (SQLException e) {
			e.printStackTrace();
			param.setMsg(Constants.FALSE);
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		return param;
	}

	public static BroadcastMessageModel updateBroadcast(
			BroadcastMessageModel param) throws SQLException {

		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;

		try {
			con = DatabaseUtil.getConnection();
			updateBrodcastDetail(param, con);
			insertDepartmentDetails(param, con);
			insertRoles(param, con);
			if (param.getSiteOrRegion().equalsIgnoreCase("site")) {
				insertStores(param, con);
			} else if (param.getSiteOrRegion().equalsIgnoreCase("region")){
				insertRegion(param, con);
			}
			param.setMsg(Constants.SUCCESS);
		} catch (SQLException e) {
			e.printStackTrace();
			param.setMsg(Constants.FALSE);
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.FALSE);
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		return param;
	}

	private static void updateBrodcastDetail(BroadcastMessageModel param,
			Connection con) throws Exception {
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("updateBrodcastDetail start time --- " + startTime);
		
		String updateQry = "" + "UPDATE BROADCAST_DETAILS "
				+ "  SET UPDATED_USER   = '"
				+ param.getUserid()
				+ "' , "
				+ "    MODIFIED_TS      = sysdate , "
				+ "    STORE_OR_REGION  = '"
				+ (param.getSiteOrRegion().equalsIgnoreCase("site") ? "S"
						: (param.getSiteOrRegion().equalsIgnoreCase("region") ? "R"
								: "A"))
				+ "' , "
				+ "    SALES_ORG        = '"
				+ param.getSalesOrg()
				+ "' , "
				+ "    ACTIVE_TO        = to_date('"
				+ param.getEndDate()
				+ param.getEndTime()
				+ "','dd/mm/yyyyhhmiAM') , "
				+ "    MESSAGE          = '"
				+ param.getBroadcastMessage()
				+ "' , "
				+ "    ACTIVE_FROM      = to_date('"
				+ param.getStartDate()
				+ param.getStartTime()
				+ "','dd/mm/yyyyhhmiAM'), "
				+ "    ACKNOWLEGEMNET   = '"
				+ (param.getAckRequired().equalsIgnoreCase("TRUE") ? "Y" : "N")
				+ "' , "
				+ "    UPDATED_TS       = sysdate "
				+ "  WHERE ID           = '" + param.getMessage_id() + "'";
		PreparedStatement stmt =null;
		log.info("query generated --- "+updateQry);
		try{
		stmt= con.prepareStatement(updateQry);
		stmt.executeUpdate();
		}catch(Exception e){
			e.printStackTrace();
			throw e;
		}finally{
			if(null!=stmt) stmt.close();
		}
		endTime = System.currentTimeMillis();
		log.info("updateBrodcastDetail end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));

	}

	private static void insertStores(BroadcastMessageModel param, Connection con)
			throws SQLException {
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertStores start time --- " + startTime);
		
		String deleteQry = "delete from bc_details_stores where bc_details_id=?";
		String insertQrt = "insert into bc_details_stores(id,bc_details_id,store_or_region,description) values(bc_stores_seq.nextval,?,?,?)";

		PreparedStatement stmt = null;
		log.info("query generated --- "+deleteQry);
		log.info("query generated --- "+insertQrt);
		try {
			stmt = con.prepareStatement(deleteQry);
			stmt.setString(1, param.getMessage_id());
			stmt.executeUpdate();
			if (!param.getSalesOrg().equalsIgnoreCase("All")) {
				for (String itm : param.getSiteList()) {
					stmt = null;
					stmt = con.prepareStatement(insertQrt);
					stmt.setString(1, param.getMessage_id());
					stmt.setString(2, itm.split(Pattern.quote("|"))[0].trim());
					stmt.setString(3, itm.split(Pattern.quote("|"))[1].trim());
					stmt.executeUpdate();
				}
			}
		} catch (Exception e) {
		} finally {
			if (null != stmt)
				stmt.close();
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertStores end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		

	}

	private static void insertRegion(BroadcastMessageModel param, Connection con)
			throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertRegion start time --- " + startTime);
		
		String deleteQry = "delete from bc_details_stores where bc_details_id=?";
		String insertQrt = "insert into bc_details_stores(id,bc_details_id,store_or_region,description) values(bc_stores_seq.nextval,?,?,'Region')";

		PreparedStatement stmt = null;
		
		log.info("query generated --- "+deleteQry);
		log.info("query generated --- "+insertQrt);
		
		try {
			stmt = con.prepareStatement(deleteQry);
			stmt.setString(1, param.getMessage_id());
			stmt.executeUpdate();
			if (!param.getSalesOrg().equalsIgnoreCase("All")) {
				stmt = null;
				stmt = con.prepareStatement(insertQrt);
				stmt.setString(1, param.getMessage_id());
				stmt.setString(2, param.getRegion());
				stmt.executeUpdate();
			}
		} catch (Exception e) {
		} finally {
			if (null != stmt)
				stmt.close();
		}

		endTime = System.currentTimeMillis();
		log.info("insertRegion end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
	}

	private static void insertRoles(BroadcastMessageModel param, Connection con)
			throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertRoles start time --- " + startTime);
		
		String deleteQry = "delete from bc_details_roles where bc_details_id=?";
		String insertQrt = "insert into bc_details_roles(id,bc_details_id,role_id) values(bc_roles_seq.nextval,?,?)";

		PreparedStatement stmt = null;
		
		log.info("query generated --- "+deleteQry);
		
		log.info("query generated --- "+insertQrt);
		
		try {
			stmt = con.prepareStatement(deleteQry);
			stmt.setString(1, param.getMessage_id());
			stmt.executeUpdate();
			if (!param.getSalesOrg().equalsIgnoreCase("All")) {
				for (String itm : param.getRolesList()) {
					stmt = null;
					stmt = con.prepareStatement(insertQrt);
					stmt.setString(1, param.getMessage_id());
					stmt.setString(2, itm);
					stmt.executeUpdate();
				}
			}
		} catch (Exception e) {
		} finally {
			if (null != stmt)
				stmt.close();
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertRoles end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
	}

	private static void insertDepartmentDetails(BroadcastMessageModel param,
			Connection con) throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertDepartmentDetails start time --- " + startTime);
		
		String deleteQry = "delete from bc_details_depts where bc_details_id=?";
		String insertQrt = "insert into bc_details_depts(id,bc_details_id,primary_dept) values(bc_depts_seq.nextval,?,?)";
		
		PreparedStatement stmt = null;
		
		log.info("query generated --- "+deleteQry);
		
		log.info("query generated --- "+deleteQry);
		try {
			stmt = con.prepareStatement(deleteQry);
			stmt.setString(1, param.getMessage_id());
			stmt.executeUpdate();
			if (!param.getSalesOrg().equalsIgnoreCase("All")) {
				for (String itm : param.getDepartmentList()) {
					stmt = null;
					stmt = con.prepareStatement(insertQrt);
					stmt.setString(1, param.getMessage_id());
					stmt.setString(2, itm);
					stmt.executeUpdate();
				}
			}
		} catch (Exception e) {
		} finally {
			if (null != stmt)
				stmt.close();
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertDepartmentDetails end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));

	}

	private static void insertBrodcastDetail(BroadcastMessageModel param,
			Connection con) throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("insertBrodcastDetail start time --- " + startTime);
		
		PreparedStatement stmt = null;
		try {
			String insertQrt = "INSERT INTO BROADCAST_"
					+ "DETAILS(UPDATED_USER,MODIFIED_TS,CREATED_USER,CREATED_TS,STORE_OR_REGION,SALES_ORG,ACTIVE_TO,MESSAGE,ACTIVE_FROM,ACKNOWLEGEMNET,ID,MAX_ACK_REQUIRED,UPDATED_TS) "
					+ "VALUES ('"
					+ param.getUserid()
					+ "',sysdate,'"
					+ param.getUserid()
					+ "',sysdate,'"
					+ (param.getSiteOrRegion().equalsIgnoreCase("site") ? "S"
							: (param.getSiteOrRegion().equalsIgnoreCase("region") ? "R"
									: "A"))
					+ "'"
					+ ",'"
					+ param.getSalesOrg()
					+ "',to_date('"
					+ param.getEndDate()
					+ param.getEndTime()
					+ "','dd/mm/yyyyhhmiAM'),"
					+ "'"
					+ param.getBroadcastMessage()
					+ "',to_date('"
					+ param.getStartDate()
					+ param.getStartTime()
					+ "','dd/mm/yyyyhhmiAM'),'"
					+ (param.getAckRequired().equalsIgnoreCase("TRUE") ? "Y"
							: "N")
					+ "',"
					+ param.getMessage_id()
					+ ",1000,sysdate)";
			log.info("query generated --- "+insertQrt);
			stmt = con.prepareStatement(insertQrt);
			stmt.executeUpdate();
		} catch (Exception e) {
		} finally {
			if (null != stmt)
				stmt.close();
		}
		
		endTime = System.currentTimeMillis();
		log.info("insertBrodcastDetail end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
	}

	public static BroadcastMessageModel getBrodcastMessageDetail(
			String parameter) throws SQLException {

		String getbrodcastQry = "select id,message,to_char(active_from,'dd/mm/yyyy hh24:mi') start_date,to_char(active_to,'dd/mm/yyyy hh24:mi') end_date,ACKNOWLEGEMNET,sales_org,store_or_region from broadcast_details where id='"
				+ parameter + "'";
		Connection con = null;
		PreparedStatement stmt = null;
		ResultSet rs = null;
		BroadcastMessageModel itm = new BroadcastMessageModel();
		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(getbrodcastQry);
			rs = stmt.executeQuery();
			while (rs.next()) {
				itm.setMessage_id(rs.getString("id"));
				itm.setBroadcastMessage(rs.getString("message"));
				itm.setStartDate(rs.getString("start_date").split(" ")[0]);
				itm.setStartTime(rs.getString("start_date").split(" ")[1]);
				itm.setEndDate(rs.getString("end_date").split(" ")[0]);
				itm.setEndTime(rs.getString("end_date").split(" ")[1]);
				itm.setSalesOrg(rs.getString("sales_org"));
				if (rs.getString("ACKNOWLEGEMNET") != null
						&& rs.getString("ACKNOWLEGEMNET").equalsIgnoreCase("Y")) {
					itm.setAckRequired("TRUE");
				} else {
					itm.setAckRequired("FALSE");
				}
				itm.setSiteOrRegion(rs.getString("store_or_region"));
			}

			if (itm.getSalesOrg() != null
					&& !itm.getSalesOrg().equalsIgnoreCase("All")) {
				getOtherDetails(itm, con);
			}

		} catch (SQLException e) {
			e.printStackTrace();
			return null;
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);
		}
		return itm;
	}

	private static void getOtherDetails(BroadcastMessageModel itm,
			Connection con) throws SQLException {
		PreparedStatement ps = null;
		ResultSet rs = null;
		String getDeptListQry = "select primary_dept from bc_details_depts where bc_details_id='"
				+ itm.getMessage_id() + "'";
		String getSiteListQry = "select store_or_region,description from bc_details_stores where bc_details_id='"
				+ itm.getMessage_id() + "'";
		String getRoleListQry = "select role_id from bc_details_roles where bc_details_id='"
				+ itm.getMessage_id() + "'";

		itm.setDepartmentList(new ArrayList<String>());
		try {
			ps = con.prepareStatement(getDeptListQry);
			rs = ps.executeQuery();
			while (rs.next()) {
				itm.getDepartmentList().add(rs.getString(1));
			}
		} catch (Exception e) {

		} finally {
			if (null != rs)
				rs.close();
			if (null != ps)
				ps.close();
		}
		try {
			itm.setSiteList(new ArrayList<String>());
			ps = con.prepareStatement(getSiteListQry);
			rs = ps.executeQuery();
			while (rs.next()) {
				itm.getSiteList()
						.add(rs.getString(1) + " | " + rs.getString(2));
			}
		} catch (Exception e) {

		} finally {
			if (null != rs)
				rs.close();
			if (null != ps)
				ps.close();
		}

		itm.setRolesList(new ArrayList<String>());
		try {
			ps = con.prepareStatement(getRoleListQry);
			rs = ps.executeQuery();
			while (rs.next()) {
				itm.getRolesList().add(rs.getString(1));
			}
		} catch (Exception e) {

		} finally {
			if (null != rs)
				rs.close();
			if (null != ps)
				ps.close();
		}

	}

	public static boolean deactivate(BroadcastMessageModel param)
			throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("deactivate start time --- " + startTime);
		
		Connection con = null;
		PreparedStatement stmt = null;
		boolean flag = true;
		try {
			con = DatabaseUtil.getConnection();
			
			String updateQry = "" + "UPDATE BROADCAST_DETAILS "
					+ "  SET UPDATED_USER   = '" + param.getUserid() + "' , "
					+ "    MODIFIED_TS      = sysdate , "
					+ "    ACTIVE_TO        = sysdate-1 , "
					+ "    UPDATED_TS       = sysdate "
					+ "  WHERE ID           = '" + param.getMessage_id() + "'";
			log.info("query generated --- "+updateQry);
			stmt = con.prepareStatement(updateQry);
			int cnt = stmt.executeUpdate();
			if (cnt == 0)
				flag = false;
		} catch (Exception e) {
			e.printStackTrace();
			flag = false;
		} finally {
			if (null != stmt) {
				stmt.close();
			}
			DatabaseUtil.releaseConnection(con);
		}
		
		endTime = System.currentTimeMillis();
		log.info("deactivate end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		
		return flag;
	}
	
	public static boolean delete(BroadcastMessageModel param)
			throws SQLException {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("delete start time --- " + startTime);
		
		Connection con = null;
		PreparedStatement stmt = null;
		boolean flag = true;
		try {
			con = DatabaseUtil.getConnection();
			String deleteDptQry="delete from bc_details_depts where bc_details_id= '" + param.getMessage_id() + "'";
			String deleteStoreQry="delete from bc_details_stores where bc_details_id= '" + param.getMessage_id() + "'";
			String deleteRolesQry="delete from bc_details_roles where bc_details_id= '" + param.getMessage_id() + "'";
			String deleteDtlQry = "" + "delete from BROADCAST_DETAILS "
					+ "  WHERE ID           = '" + param.getMessage_id() + "'";
			
			log.info("query generated --- "+deleteDptQry);
			
			log.info("query generated --- "+deleteStoreQry);
			
			log.info("query generated --- "+deleteRolesQry);
			
			log.info("query generated --- "+deleteDtlQry);
			
			try{
				stmt = con.prepareStatement(deleteDptQry);
				stmt.executeUpdate();
				
				}catch(Exception e){
					e.printStackTrace();
				}finally{
					if(null!=stmt) stmt.close();
			}
			try{
				stmt = con.prepareStatement(deleteStoreQry);
				stmt.executeUpdate();
				
				}catch(Exception e){
					e.printStackTrace();
				}finally{
					if(null!=stmt) stmt.close();
			}
			try{
				stmt = con.prepareStatement(deleteRolesQry);
				stmt.executeUpdate();
				}catch(Exception e){
					e.printStackTrace();
				}finally{
					if(null!=stmt) stmt.close();
			}
			
			
			try{
			stmt = con.prepareStatement(deleteDtlQry);
			int cnt = stmt.executeUpdate();
			if (cnt == 0)
				flag = false;
			}catch(Exception e){
				e.printStackTrace();
			}finally{
				if(null!=stmt) stmt.close();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			flag = false;
		} finally {
			if (null != stmt) {
				stmt.close();
			}
			DatabaseUtil.releaseConnection(con);
		}
		
		endTime = System.currentTimeMillis();
		log.info("delete end time --- " + endTime);
		log.info("total taken time--- " + (endTime - startTime));
		return flag;
	}

}
