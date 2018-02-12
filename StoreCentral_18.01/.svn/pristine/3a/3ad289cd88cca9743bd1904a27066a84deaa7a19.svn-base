package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class PassWordMgtDAOImpl {
	private static final Logger LOGGER = Logger.getLogger(PassWordMgtDAOImpl.class.getName());
	private static String secretQuesCount = "10";

	public static ArrayList<String> getUserSecretQues(String userId) throws Exception {

		// UserContext context = new UserContext();
		ArrayList<String> secreQuesList = null;
		Connection con = DatabaseUtil.getConnection();
		PreparedStatement stmt = con
				.prepareStatement("select * from NGBO_SECRET_QUS where rownum <="
						+ secretQuesCount + "");
		ResultSet rs = stmt.executeQuery();

		try {
			if (rs != null) {
				secreQuesList = new ArrayList<String>();
				while (rs.next()) {
					// Check for password and only then set the properties
					secreQuesList.add(rs.getString("qus_desc"));
					// //System.out.println("name-->"+userIdNameParam.getUserName());

				}
				//System.out.println("secreQuesList" + secreQuesList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return secreQuesList;
	}
	
	public static ArrayList<String> getSecretQues() throws Exception {

		// UserContext context = new UserContext();
		ArrayList<String> secreQuesList = null;
		Connection con = DatabaseUtil.getConnection();
		PreparedStatement stmt = con
				.prepareStatement("select * from NGBO_SECRET_QUS where rownum <="
						+ secretQuesCount + "");
		//System.out.println("qry" + "select * from ques_master where rownum <="
				//+ secretQuesCount + "");
		// stmt.setString(1, storeNo);
		ResultSet rs = stmt.executeQuery();

		try {
			if (rs != null) {
				secreQuesList = new ArrayList<String>();
				while (rs.next()) {
					// Check for password and only then set the properties
					secreQuesList.add(rs.getString("QUS_DESC"));
					// //System.out.println("name-->"+userIdNameParam.getUserName());

				}
				//System.out.println("secreQuesList" + secreQuesList);
			}
		} catch (Exception e) {
			e.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return secreQuesList;
	}

	public static boolean updatePassword(String userId, String newPassword) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int rs = 0;
		String sqlStatement = "UPDATE "+Constants.NGBO_USR
				
				+ " set PASSWORD = ? , PASSWORD_EXPIRY_DATE = sysdate+1, locked_date = null ,LAST_UPDATED_DATE=sysdate ,LAST_UPDATED_USER='"+Constants.NGBO_UPDATED_USER_PREFIX+userId+"' where upper(usr_id) = upper(?)";
		LOGGER.info("updatePassword query"+sqlStatement);
		PreparedStatement stmt = null;
		if(newPassword==null){
			return false;
		}
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, newPassword);
//			stmt.setString(2, passwordExpiryDate);
			stmt.setString(2, userId);
			rs = stmt.executeUpdate();
			if (rs > 0) {
				return true;				
			}
		} catch (SQLException e) {
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
	
	public static boolean updatePassword(String userId, String newPassword,
			String passwordExpiryDate) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int rs = 0;
		String sqlStatement = "UPDATE "+Constants.NGBO_USR
				
				+ " set PASSWORD = ? , PASSWORD_EXPIRY_DATE = TO_DATE(?,'dd/mm/yy'),changed_ts=TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'), locked_date = null ,LAST_UPDATED_DATE=sysdate ,LAST_UPDATED_USER='"+Constants.NGBO_UPDATED_USER_PREFIX+userId+"' where upper(usr_id) = upper(?)";
		LOGGER.info("updatePassword query"+sqlStatement);
		PreparedStatement stmt = null;
		if(newPassword==null){
			return false;
		}
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, newPassword);
			stmt.setString(2, passwordExpiryDate);
			stmt.setString(3, userId);
			rs = stmt.executeUpdate();
			if (rs > 0) {
				return true;				
			}
		} catch (SQLException e) {
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
	
	public static boolean updatePasswordExpToToday(String userId) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		int rs = 0;
		String sqlStatement = "UPDATE "+Constants.NGBO_USR
				+ " set PASSWORD_EXPIRY_DATE = sysdate+1 where lower(usr_id) = lower('"+userId+"')";
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			rs = stmt.executeUpdate();
			if (rs > 0) {
				return true;
			}
		} catch (SQLException e) {
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

	public static ArrayList<String> getPrevPasswords(String userName) throws SQLException {
		ArrayList<String> prevPassword=new ArrayList<String>();
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		
		String sqlStatement = "SELECT * FROM "+Constants.NGBO_USR_PWD_ATTEMPT+" where upper(usr_id) = upper(?)";
		PreparedStatement stmt = null;

		try {
			stmt = con.prepareStatement(sqlStatement);		
			stmt.setString(1, userName);
			rs = stmt.executeQuery();
			while(rs.next()){
				for(int i=1;i<=4;i++){
					if(null!=rs.getString("password_"+i)){
						prevPassword.add(rs.getString("password_"+i));
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

		return prevPassword;
	}
	
	public static int getLastUpdatedColumn(String userName) throws SQLException {
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		String sqlStatement = "SELECT NVL(LAST_CHANGED_COLUMN,0) FROM "+Constants.NGBO_USR_PWD_ATTEMPT+" where upper(usr_id) = upper(?)";
		PreparedStatement stmt = null;

		try {
			stmt = con.prepareStatement(sqlStatement);		
			stmt.setString(1, userName);
			rs = stmt.executeQuery();
			while(rs.next()){
				if(rs.getInt(1)==4){
					return 0;
				}else{
					return rs.getInt(1);
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
		return 0;
	}
	
	public static boolean updateNewPassword(String userName,String newPassword) throws SQLException {
		Connection con = DatabaseUtil.getConnection();
		int rs = 0;
		int lastUpdatedColumn=getLastUpdatedColumn(userName)+1;
		LOGGER.info("lastUpdatedColumn "+lastUpdatedColumn);
		
		String sqlStatement = "UPDATE "+Constants.NGBO_USR_PWD_ATTEMPT+" SET PASSWORD_"+lastUpdatedColumn+"= ?,LAST_CHANGED_COLUMN=? where upper(usr_id) = upper(?)";
		PreparedStatement stmt = null;
		LOGGER.info("PWD update Query"+sqlStatement);

		try {
			stmt = con.prepareStatement(sqlStatement);	
			stmt.setString(1, newPassword);
			stmt.setString(2, ""+lastUpdatedColumn+"");
			stmt.setString(3, userName);
			rs = stmt.executeUpdate();
			if(rs>0) return true;
		} catch (SQLException e) {
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
	public static boolean isUserLocked(String userId) throws Exception {
		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		String sqlStatement = " select usr_id from "+Constants.NGBO_USR+" where upper(usr_id) = upper(?) and locked_date is not null ";
		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, userId);
			rs = stmt.executeQuery();
			if (rs!=null && rs.next()) {
				return true;				
			}
		} catch (SQLException e) {
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
}
