/**
 * 
 */
package au.com.woolworths.portal.service;

import au.com.woolworths.portal.model.UserContext;

/**
 * @author xrca4
 * 
 */
public interface LoginService {
	public UserContext getUserInfo(String userID, String password)
			throws Exception;

	public String getOrderRefNo(String type, String application, String storeNo)
			throws Exception;
}
