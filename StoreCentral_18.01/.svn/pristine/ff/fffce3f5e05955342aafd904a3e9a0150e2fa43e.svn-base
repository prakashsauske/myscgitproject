package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.ViewArticleQuery;
import au.com.woolworths.portal.param.AQMSearchQueryParam;

/**
 * @author xrca4
 * 
 */
public class AQMDAOImpl {

	public static Map<String, String> getUserDetailList(
			AQMSearchQueryParam param) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, String> userDetail = null;
		 //"select usr_id , usr_nm from usr where loc_value_id =? and (usr_id =? or usr_nm=? or upper(usr_nm) like upper(?)  OR UPPER(usr_id) like upper(?))";
		//need to add condition for locked
		String sqlStatement = "select usr_id , usr_nm from usr where (usr_id =? or usr_nm=? or upper(usr_nm) like upper(?)  OR UPPER(usr_id) like upper(?))  AND deleted_date IS NULL  AND locked_date  IS NULL ";

		PreparedStatement stmt = null;
		try {

			stmt = con.prepareStatement(sqlStatement);
			stmt.setString(1, param.getSiteNo());
			stmt.setString(2, param.getSubmitBy());
			stmt.setString(3, "%" + param.getSubmitBy() + "%");
			stmt.setString(4, "%" + param.getSubmitBy() + "%");
			//stmt.setString(5, "%" + param.getSubmitBy() + "%");
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userDetail = new HashMap<String, String>();
				while (rs.next())
					userDetail.put(rs.getString("USR_NM"),
							rs.getString("USR_ID"));
				//System.out.println(userDetail.size());
				return userDetail;
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

		return userDetail;
	}

	public static Map<String, String> updateArticleQueryList(
			List<ViewArticleQuery> viewArticleQueryList) throws Exception {

		Connection con = DatabaseUtil.getConnection();
		ResultSet rs = null;
		Map<String, String> userDetail = null;

		StringBuilder builder = new StringBuilder();
		for (int i = 0; i < viewArticleQueryList.size(); i++) {
			builder.append("?,");
		}
		String sqlStatement = "select USR_ID, USR_NM FROM USR WHERE USR_ID in ("
				+ builder.deleteCharAt(builder.length() - 1).toString() + ")";

		PreparedStatement stmt = null;
		try {
			stmt = con.prepareStatement(sqlStatement);
			int index = 1;
			for (ViewArticleQuery query : viewArticleQueryList) {
				stmt.setObject(index, query.getSubmitBy());
				index++;// or whatever it applies
			}
			rs = stmt.executeQuery();
			if (rs != null) {
				// rs.next();
				userDetail = new HashMap<String, String>();
				while (rs.next())
					userDetail.put(rs.getString("USR_ID"),
							rs.getString("USR_NM"));
				return userDetail;
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

		return userDetail;
	}

}
