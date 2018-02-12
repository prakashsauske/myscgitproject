package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.SQLException;

import org.apache.log4j.Logger;

import au.com.woolworths.portal.dao.DatabaseUtil;

/**
 * @author xrca4
 * 
 */
public class SecretMgtDAOImpl {
	
	private static final Logger log = Logger.getLogger(SecretMgtDAOImpl.class
			.getName());

	//static SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
	//static Date currDate = new Date();

	public static boolean updateSecFlag(String userId) throws Exception {
		
		Long startTime, endTime;
		startTime = System.currentTimeMillis();
		log.info("updateSecFlag start time --- " + startTime);
		
		Connection con = DatabaseUtil.getConnection();
		int result = 0;
		String deleteStmt = " delete from usr_sec_question sec where sec.user_id='"
				+ userId + "'";
		String insertStatement = " insert into usr_sec_question (user_id, create_on, sec_que_flag) values('"
				+ userId + "', sysdate,'Y') ";
		PreparedStatement stmt = null;
		log.info("query generated --- "+deleteStmt);
		try {

			stmt = con.prepareStatement(deleteStmt);
			result = stmt.executeUpdate();
			log.info("query generated --- "+insertStatement);
			stmt = con.prepareStatement(insertStatement);
			result = stmt.executeUpdate();
			if (result > 0) {
				return true;
			}
		} catch (SQLException e) {
			e.printStackTrace();
			return false;
		} catch (Exception e) {
			e.printStackTrace();
			return false;
		} finally {

			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}
		
		endTime = System.currentTimeMillis();
		log.info("lock end time --- " + endTime);
		log.info("updateSecFlag taken time--- " + (endTime - startTime));

		return false;
	}

}
