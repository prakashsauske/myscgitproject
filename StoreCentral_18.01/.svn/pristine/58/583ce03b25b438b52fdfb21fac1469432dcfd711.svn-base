package au.com.woolworths.portal.service;

import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Map;

import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.ActivityOptions;
import au.com.woolworths.portal.model.BroadcastMessage;
import au.com.woolworths.portal.model.UserContext;

public class UserAccessServiceImpl extends CommonServiceImpl {

	@Value("#{properties['ViewSOHofotherstores']}")
	private String viewSOHofotherstores;

	@Value("#{properties['ViewSellPriceofotherstores']}")
	private String viewSellPriceofotherstores;

	@Value("#{properties['ViewRangingofotherstores']}")
	private String viewRangingofotherstores;

	@Value("#{properties['Manager']}")
	private String manager;

	@Value("#{properties['TeamLeader']}")
	private String teamLeader;

	@Value("#{properties['TeamMember']}")
	private String teamMember;

	@Value("#{properties['OfficeSupervisor']}")
	private String officeSupervisor;

	@Value("#{properties['OfficeAssistant']}")
	private String officeAssistant;

	@Value("#{properties['StoreSupport']}")
	private String storeSupport;

	// ************** POG UPDATE SERVICE CALLS ***********************//
	public Map<String, ArrayList<ActivityOptions>> getUserFunctionacces(UserContext userContext,boolean flag)
			throws Exception {
		Map<String, ArrayList<ActivityOptions>> userAccessMap = null;

		userAccessMap = UserAccessDAOImpl.getUserFunctionAccess(userContext,flag);
		if (userAccessMap != null && userAccessMap.size() > 0)
			{
			//applyBusinessRole(userAccessMap, userContext);
			}
		return userAccessMap;

	}

	/*private void applyBusinessRole(Map<String, UserAccess> userAccessMap,
			UserContext userContext) {

		if (userContext.getRoleID().equals(manager)
				|| userContext.getRoleID().equals(teamLeader)
				|| userContext.getRoleID().equals(teamMember)
				|| userContext.getRoleID().equals(officeAssistant)
				|| userContext.getRoleID().equals(officeSupervisor)
				|| userContext.getRoleID().equals(storeSupport)) {
			if (userAccessMap.containsKey(viewRangingofotherstores)) {
				userAccessMap.remove(viewRangingofotherstores);
			}
			if (userAccessMap.containsKey(viewSellPriceofotherstores)) {
				userAccessMap.remove(viewSellPriceofotherstores);
			}
			if (userAccessMap.containsKey(viewSOHofotherstores)) {
				userAccessMap.remove(viewSOHofotherstores);
			}
		}
	}*/

	// ************** POG UPDATE SERVICE CALLS ***********************//
		public ArrayList<BroadcastMessage> getBroadcastMessages(UserContext userContext)
				throws Exception {			
			ArrayList<BroadcastMessage> result=new ArrayList<BroadcastMessage>();
			result = UserAccessDAOImpl.getBroadcastMessages(userContext);			
			return result;
		}
		public boolean updateAcknowledgement(String user_id,String broadcast_id) throws SQLException {
			
			return UserAccessDAOImpl.updateAcknowledgement(user_id, broadcast_id);
		}
	
	
}
