package au.com.woolworths.portal.service;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.util.List;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.OrderPreferenceMaster;
import au.com.woolworths.portal.model.OrderPreferenceUsr;

/**
 * @author xrca4
 * 
 */
public class OrderPreferenceDAOImpl {

	public static void getOrderPreferenceDetails(String userId,
			List<OrderPreferenceMaster> orderPreferenceMasterList,
			List<OrderPreferenceUsr> orderPreferenceUsrList) throws Exception {

		String masterTblQuery = "SELECT * from ORDR_PREF_MASTER ";
		String userTblQuery = "SELECT * from ORDR_PREF_USER usr where usr.USER_ID='"
				+ userId + "'";

		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(masterTblQuery);
			rs = stmt.executeQuery();
			if (rs != null) {
				// orderPreferenceMasterList = new
				// ArrayList<OrderPreferenceMaster>();
				while (rs.next()) {
					orderPreferenceMasterList
							.add(new OrderPreferenceMaster(rs
									.getString("ORDR_TYPE_ID"), rs
									.getString("LABL_ID"), rs
									.getString("LABL_DESC")));
				}
				//System.out.println("orderPreferenceMasterList"
						//+ orderPreferenceMasterList);
			}
			stmt = con.prepareStatement(userTblQuery);
			rs = stmt.executeQuery();
			if (rs != null) {
				// orderPreferenceUsrList = new ArrayList<OrderPreferenceUsr>();
				while (rs.next()) {
					orderPreferenceUsrList
							.add(new OrderPreferenceUsr(rs
									.getString("ORDR_TYPE_ID"), rs
									.getString("LABL_ID")));
				}
				//System.out.println("orderPreferenceUsrList"
						//+ orderPreferenceUsrList);
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

	}

	public static String updateOrderPreferenceDetails(String userId,
			String changedVal) throws Exception {

		String deleteQuery = "DELETE ORDR_PREF_USER WHERE USER_ID='" + userId
				+ "'";
		StringBuffer insertStatement = null;
		if (!changedVal.trim().equals("") && changedVal.split(":").length > 0) {
			insertStatement = new StringBuffer();
			insertStatement.append("INSERT ALL ");
			for (int i = 0; i < changedVal.split(":").length; i++) {
				insertStatement
						.append("INTO ORDR_PREF_USER (ORDR_TYPE_ID,LABL_ID,USER_ID) VALUES ('"
								+ changedVal.split(":")[i].split("-")[1]
								+ "',"
								+ "'"
								+ changedVal.split(":")[i].split("-")[0]
								+ "'," + "'" + userId + "')");
			}
			insertStatement.append(" SELECT * FROM dual");
		}
		// //System.out.println("query"+ insertStatement.toString());
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;
		int result = 0;

		try {
			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(deleteQuery);
			rs = stmt.executeQuery();
			if (insertStatement != null) {
				stmt = con.prepareStatement(insertStatement.toString());
				result = stmt.executeUpdate();

				if (result != 0) {
					return "true";
				}
			} else
				return "true";
		} catch (Exception e) {
			e.printStackTrace();
			return "Technical issue occurred. Please contact support";
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}
		return "Technical issue occurred. Please contact support";
	}
}
