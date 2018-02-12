package au.com.woolworths.portal.dao;

import java.sql.Connection;
import java.sql.SQLException;

import javax.naming.InitialContext;
import javax.naming.NamingException;
import javax.sql.DataSource;

import org.apache.log4j.Logger;

/**
 * @author
 * 
 */
public class DatabaseUtil {

	private static final Logger LOGGER = Logger.getLogger(DatabaseUtil.class
			.getName());
	private static DataSource DS = null;
	static {
		try {
			InitialContext ic = new InitialContext();
			DS = (DataSource) ic.lookup("java:/jdbc/StorePort_mobi");
			LOGGER.info("JNDI Lookup successfull");
		} catch (NamingException e) {
			LOGGER.error("JNDI Naming exception ::: ", e);
		}
	}

	public static Connection getConnection() {
		Connection con = null;
		try {
			synchronized (DS) {
				con = DS.getConnection();
			}
		} catch (NullPointerException e) {
			LOGGER.error("Problem in JNDI Lookup :: ", e);
		} catch (SQLException e) {
			LOGGER.error("Exception :: ", e);
		}
		if (null == con) {
			// This log statement will be monitored by SMA in prod. do not
			// remove this.
			LOGGER.info(" Connection is null for the data source : StorePort_mobi ");
		}
		LOGGER.info(">>>>>>>Connection established status : " + (con != null));
		return con;

	}

	public static void releaseConnection(Connection con) {
		try {
			if (con != null) {
				con.close();
				LOGGER.info("<<<<<<<Connection released to pool !!!!!!!!!");
			} else {
				LOGGER.info("<<<<<<<No connection object to relase");
			}
		} catch (SQLException e) {
			LOGGER.error("Problem in releasing the DB connection :: ", e);
		}
	}
}
