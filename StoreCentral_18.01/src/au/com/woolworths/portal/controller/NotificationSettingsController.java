package au.com.woolworths.portal.controller;

import java.io.StringWriter;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ActivityOptions;
import au.com.woolworths.portal.model.BroadcastMessageModel;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.Notification;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.NotificationParam;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.param.UsrInfoParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ApplicationSettingDAOImpl;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.BroadcastDAOImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.NotificationSettingDAOImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.service.StoreSearchServiceImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/notification")
@Scope("session")
public class NotificationSettingsController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['NotificationSettings']}")
	private String screenCode;
	
	private ModelMap model;

	private UserContext userDetail;

	private static final Logger LOGGER = Logger.getLogger(Thread
			.currentThread().getStackTrace()[0].getClassName());

	@Autowired
	private StoreSearchServiceImpl storeSearchService;
	
	@Autowired
	private ArticleServiceImpl articleService;

	@Value("#{url['UserPreferencesSize']}")
	private String userPreferencesSize;

	@Autowired
	private UserAccessServiceImpl userAccessService;

	Map<String, String> salesOrgMap = null;
	Map<String, ArrayList<String>> menuExcludeMap = null;

	Map<String, ArrayList<MenuOptions>> manageFunctionMap = null;
	Map<String, ArrayList<String>> funcExcludeMap = null;
	ArrayList<RoleProfileDtl> roleList = null;
	ArrayList<String> additionalAccesList = null;

	@RequestMapping(value = "/settings.htm", method = RequestMethod.GET)
	public ModelAndView applicationSettings(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		ModelAndView modelAndView = new ModelAndView("notification");
		NotificationParam param = new NotificationParam();

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();

		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());

		getManageMenuDetails(param);

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/adminAppSettings.htm", method = RequestMethod.GET)
	public ModelAndView adminAppSettings(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("adminAppSettings");
		NotificationParam param = new NotificationParam();

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();

		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());

		getManageMenuDetails(param);
		// getManageRoleDetails();

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/saveAllRoleSettings.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String saveAllRoleSettings(
			@RequestBody ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		if (activityOptions == null || activityOptions.equals("")
				|| activityOptions.getSalesOrg() == null
				|| activityOptions.getSalesOrg().equals("")) {
			return "mandatory";
		}
		String updateStatus = "";

		updateStatus = ApplicationSettingDAOImpl.saveAllRoleSettings(
				userDetail.getUserId(), activityOptions);

		if (updateStatus != null && updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}
	}

	@RequestMapping(value = "/saveApllicationSettings.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String saveApllicationSettings(
			@RequestBody ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession(false);
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		if (activityOptions == null
				|| activityOptions.equals("")
				|| activityOptions.getSalesOrg() == null
				|| activityOptions.getSalesOrg().equals("")
				|| (((activityOptions.getRoleList() == null || activityOptions
						.getRoleList().size() == 0) && (activityOptions
						.getLevelList() == null || activityOptions
						.getLevelList().size() == 0)))) {
			return "mandatory";
		}
		String updateStatus = "";

		updateStatus = ApplicationSettingDAOImpl.updateApplicationSettings(
				userDetail.getUserId(), activityOptions);
		setUserAccessFunction(userDetail);
		session.setAttribute("user", userDetail);

		if (updateStatus != null && updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}
	}
	
	@RequestMapping(value = "/saveSettingsForRole.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String saveSettingsForRole(
			@RequestBody NotificationParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println(CommonUtils.convertObjectTojson(param));
		HttpSession session = request.getSession(false);
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "logout";

		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if (param == null
				|| param.equals("")
				|| param.getSaleOrg() == null
				|| param.getSaleOrg().equals("")
				|| param.getRoleId()== null
				|| param.getRoleId().equals("")) {
			return "mandatory";
		}
		param.setUserId(user.getUserId());
		String updateStatus = "flow success";
		updateStatus=NotificationSettingDAOImpl.saveSettingsForRole(param);
		
		System.out.println(CommonUtils.convertObjectTojson(param));

		if (updateStatus != null && updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}
	}
	
	@RequestMapping(value = "/getRoles.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getroles(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		HttpSession session = request.getSession(false);
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "logout";

		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		ArrayList<RoleProfileDtl> roles=RoleMgtDAOImpl.getRoleListBySalesOrg(request.getParameter("salesOrg"));
		
		return CommonUtils.convertObjectTojson(roles);
	}
	
	@RequestMapping(value = "/saveSettingsForAllRole.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String saveSettingsForAllRole(
			@RequestBody NotificationParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println(CommonUtils.convertObjectTojson(param));
		HttpSession session = request.getSession(false);
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "logout";

		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if (param == null
				|| param.equals("")
				|| param.getSaleOrg() == null
				|| param.getSaleOrg().equals("")
				|| param.getRoleId()== null
				|| param.getRoleId().equals("")) {
			return "mandatory";
		}
		param.setUserId(user.getUserId());
		String updateStatus = "flow success";
		
		updateStatus=NotificationSettingDAOImpl.saveSettingsForAllRole(param);

		System.out.println(CommonUtils.convertObjectTojson(param));

		if (updateStatus != null && updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}
	}

	private void setUserAccessFunction(UserContext userDetails) {

		Map<String, ArrayList<ActivityOptions>> userAccessMap = null;
		Map<String, ArrayList<ActivityOptions>> userAccessRemovedMap = null;
		StringBuffer articleStr = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter stw = new StringWriter();

		try {
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			userAccessMap = userAccessService.getUserFunctionacces(userDetails,
					true);

			if (userAccessMap != null && userAccessMap.size() > 0) {

				Iterator iter = userAccessMap.entrySet().iterator();
				while (iter.hasNext()) {
					Map.Entry pairss = (Entry) iter.next();

					if (articleStr == null)
						articleStr = new StringBuffer("'" + pairss.getKey()
								+ "'");
					articleStr.append(",'" + pairss.getKey() + "'");
				}
				userDetails.setFunctionCodeList(articleStr.toString());
			}

			userAccessRemovedMap = userAccessService.getUserFunctionacces(
					userDetails, false);
			if (userAccessRemovedMap != null && userAccessRemovedMap.size() > 0) {
				userAccessMap.putAll(userAccessRemovedMap);
			}
			mapper.writeValue(jsonGenerator, userAccessMap);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		// LOGGER.info("stw.toString()__" + stw.toString());
		userDetails.setUserAccess("{\"data\":" + stw.toString() + "}");
	}

	@RequestMapping(value = "/deleteStoreSettings.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String deleteStoreSettings(
			@RequestBody ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		if (activityOptions == null
				|| activityOptions.equals("")
				|| activityOptions.getSalesOrg() == null
				|| activityOptions.getSalesOrg().equals("")
				|| (((activityOptions.getRoleList() == null || activityOptions
						.getRoleList().size() == 0)
						&& (activityOptions.getLevelList() == null || activityOptions
								.getLevelList().size() == 0) && (activityOptions
						.getCodeList() == null || activityOptions.getCodeList()
						.size() == 0)))) {
			return "mandatory";
		}
		String updateStatus = "";

		updateStatus = ApplicationSettingDAOImpl.deleteStoreSettings(
				userDetail.getUserId(), activityOptions);

		if (updateStatus != null && updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}

	}

	@RequestMapping(value = "/copyAppSettings.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String copyAppSettings(@RequestBody ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		if (activityOptions == null
				|| activityOptions.equals("")
				|| activityOptions.getSalesOrg() == null
				|| activityOptions.getSalesOrg().equals("")
				|| (((activityOptions.getRoleList() == null || activityOptions
						.getRoleList().size() == 0)
						&& (activityOptions.getLevelList() == null || activityOptions
								.getLevelList().size() == 0) && (activityOptions
						.getCodeList() == null || activityOptions.getCodeList()
						.size() == 0)))) {
			return "mandatory";
		}
		String updateStatus = "";

		updateStatus = ApplicationSettingDAOImpl.copySettingsToRoles(
				userDetail.getUserId(), activityOptions);

		if (updateStatus != null && updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}

	}

	private void getManageMenuDetails(NotificationParam param) {
		Map<String, ArrayList<Notification>> notificationMap = null;
		Map<String, String> rootCodeMap = null;
		
		Gson gson = new Gson();
		try {
			salesOrgMap = ApplicationSettingDAOImpl.getAllSalesOrg();
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
		}

		model.addAttribute("salesOrgMap", (salesOrgMap != null && salesOrgMap
				.size() > 0) ? salesOrgMap : new HashMap<String, String>());

		try {
			NotificationSettingDAOImpl
					.getNotificationSettingsDetail(param);
			notificationMap = param.getManageMenuMap();
			rootCodeMap = param.getRootCodeMap();
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
		}
		if(rootCodeMap != null){
			String rootCodeMapJson = gson.toJson(rootCodeMap);
			rootCodeMapJson = rootCodeMapJson.replace("\"", "\\\"");
			
			model.addAttribute(
					"rootCodeMap",rootCodeMapJson);
		}
		if(notificationMap != null){
			model.addAttribute(
					"manageMenuMap",
					(notificationMap.size() > 0) ? notificationMap
							: new HashMap<String, ArrayList<MenuOptions>>());
			String manageMenuMapJson = gson.toJson(notificationMap);
			manageMenuMapJson = manageMenuMapJson.replace("\"", "\\\"");
			model.addAttribute(
					"manageMenuMapJson",
					(notificationMap.size() > 0) ? manageMenuMapJson
							: "");
		}
	
		try {
			roleList = RoleMgtDAOImpl.getRoleList();
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
		}

		model.addAttribute("roleList",
				(roleList != null && roleList.size() > 0) ? roleList
						: new ArrayList<String>());

	}

	@RequestMapping(value = "/getExcludeOption.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getExcludeOption(
			@ModelAttribute ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println(" getExcludeOption inside "+activityOptions.getAccessLevel());
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		Map<String, ArrayList<Notification>> activityOptionsMap = null;
		String activityOptionsMapJson = "{}";
		Gson gson = null;
		if (activityOptions == null || activityOptions.equals("")) {
			return "{\"activityOptionsMapJson\":" + activityOptionsMapJson
					+ ",\"msg\":\"" + Constants.MANDATORY + "\"}";
		}
		gson = new Gson();
		ArrayList<Department> deptInfoList=new ArrayList<Department>();
		if(null!=activityOptions.getAccessLevel() && activityOptions.getAccessLevel().equalsIgnoreCase("1")){
			String sOrg=activityOptions.getSalesOrg();
			String parent_node_no = "ALL DEPARTMENTS";	
			
			try{
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, Integer.parseInt(sOrg),userDetail);
					
			}catch(Exception e){
				e.printStackTrace();
			}
		}
		try {
			if(null!=activityOptions.getAccessLevel() && activityOptions.getAccessLevel().equalsIgnoreCase("2")){
				activityOptionsMap = NotificationSettingDAOImpl
						.getNotificationDetail(buildQueryForAllExcludeOption(activityOptions),activityOptions);
			}else{
				activityOptionsMap = NotificationSettingDAOImpl
						.getNotificationDetail(buildQueryForExcludeOption(activityOptions),activityOptions);
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (activityOptionsMap != null && activityOptionsMap.size() > 0) {
			activityOptionsMapJson = gson.toJson(activityOptionsMap);
		}
		System.out.println(" getExcludeOption outside ");
		System.out.println("{\"activityOptionsMapJson\":" + activityOptionsMapJson
				+ ",\"msg\":\"\""
				+ ",\"deptInfoList\":\"" + CommonUtils.convertObjectTojson(deptInfoList) + "\"}");
		return "{\"activityOptionsMapJson\":" + activityOptionsMapJson
				+ ",\"msg\":\"\""
				+ ",\"deptInfoList\":" + CommonUtils.convertObjectTojson(deptInfoList) + "}";

	}

	private String buildQueryForExcludeOption(ActivityOptions activityOptions) {
		
		StringBuffer  query = new StringBuffer();
		query.append("SELECT tbl1.*, ");
		query.append("  TBL2.dept ");
		query.append("FROM ");
		query.append("  (SELECT MAS.NOTIFY_ID, ");
		query.append("    MAS.NOTIFICATION_DESC, ");
		query.append("    MAS.NOTIFICATION_TITLE, ");
		query.append("    ST.role, ");
		query.append("    ST.vkorg AS sales_org, ");
		query.append("    ST.SORG_LEVEL, ");
		query.append("    ST.PRIORITY, ");
		query.append("    ST.ACK_REQ ");
		query.append("  FROM NOTIFICATION_MASTER MAS, ");
		query.append("    NOTIFICATION_XREF_SETTINGS st ");
		query.append("  WHERE mas.NOTIFY_ID  =st.NOTIFY_ID(+) ");
		query.append("  and st.isactive='"+Constants.ACTIVE+"' ");
		if (activityOptions.getSalesOrg() != null
				&& !activityOptions.getSalesOrg().equals("")) 
		query.append("and ST.vkorg='"+activityOptions.getSalesOrg()+"' ");
		if (activityOptions.getRoleId() != null
				&& !activityOptions.getRoleId().equals(""))
		query.append("and (ST.ROLE='"+(activityOptions.getRoleId()==null?"-1":activityOptions.getRoleId())+"' or (st.role = '-1' and ST.SORG_LEVEL=1) or ST.SORG_LEVEL=2)");
		query.append("  ) tbl1 left outer join ");
		query.append("  NOTIFICATION_XREF_DEPTS tbl2 ");
		query.append("on TBL1.NOTIFY_ID	  =TBL2.NOTIFY_ID ");
		query.append("AND tbl1.sales_org  =TBL2.VKORG ");
		query.append("AND tbl1.role       =tbl2.role ");
		query.append("  and tbl2.isactive='"+Constants.ACTIVE+"' ");
		if (activityOptions.getRoleId() != null
				&& !activityOptions.getRoleId().equals(""))
		query.append("ORDER BY  CASE WHEN tbl1.role = '"+(activityOptions.getRoleId()==null?"-1":activityOptions.getRoleId())+"' THEN 1 ELSE 2 END, tbl1.role");
		System.out.println();
		return query.toString();
	}
	
private String buildQueryForAllExcludeOption(ActivityOptions activityOptions) {		
		StringBuffer  query = new StringBuffer();
		query.append("SELECT MAS.NOTIFY_ID, ");
		query.append("    MAS.NOTIFICATION_DESC, ");
		query.append("    MAS.NOTIFICATION_TITLE, ");
		query.append("    rp.role_desc role, ");
		query.append("    ST.vkorg, ");
		query.append("    ST.SORG_LEVEL, ");
		query.append("    ST.PRIORITY, ");
		query.append("    ST.ACK_REQ ,");
		query.append("    '' dept ");
		query.append("  FROM NOTIFICATION_MASTER MAS, ");
		query.append("    NOTIFICATION_XREF_SETTINGS st, ");
		query.append("    role_profile rp ");
		query.append("  WHERE mas.NOTIFY_ID  =st.NOTIFY_ID(+) ");
		query.append("  and st.isactive='"+Constants.ACTIVE+"' ");
		query.append("  and st.role=rp.role_code(+) ");
		if (activityOptions.getSalesOrg() != null
				&& !activityOptions.getSalesOrg().equals("")) 
		query.append(" and ST.vkorg='"+activityOptions.getSalesOrg()+"' ");
		System.out.println();
		return query.toString();
	}


	@RequestMapping(value = "/getUserAccess.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getUserAccess(
			@ModelAttribute ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		Map<String, ArrayList<ActivityOptions>> userAccessMap = null;
		Map<String, ArrayList<ActivityOptions>> userAccessRemovedMap = null;
		StringBuffer articleStr = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter stw = new StringWriter();
		UserContext userDetails = (UserContext) (request.getSession(false)
				.getAttribute("user"));

		try {
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);
			userAccessMap = userAccessService.getUserFunctionacces(userDetails,
					true);

			if (userAccessMap != null && userAccessMap.size() > 0) {

				Iterator iter = userAccessMap.entrySet().iterator();
				while (iter.hasNext()) {
					Map.Entry pairss = (Entry) iter.next();

					if (articleStr == null)
						articleStr = new StringBuffer("'" + pairss.getKey()
								+ "'");
					articleStr.append(",'" + pairss.getKey() + "'");
				}
				userDetails.setFunctionCodeList(articleStr.toString());
			}

			userAccessRemovedMap = userAccessService.getUserFunctionacces(
					userDetails, false);
			if (userAccessRemovedMap != null && userAccessRemovedMap.size() > 0) {
				userAccessMap.putAll(userAccessRemovedMap);
			}
			mapper.writeValue(jsonGenerator, userAccessMap);
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		userDetails.setUserAccess("{\"data\":" + stw.toString() + "}");
		request.getSession(false).setAttribute("user", userDetails);
		// System.out.println("stw.toString()__" + stw.toString());
		return "{\"data\":" + stw.toString() + "}";
	}

	@RequestMapping(value = "/getStoreDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getStoreDtl(@ModelAttribute ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		System.out.println(" getExcludeOption inside ");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		ArrayList<ActivityOptions> activityOptionsList = null;
		String activityOptionsJson = "[]";
		Gson gson = null;
		if (activityOptions == null || activityOptions.equals("")
				|| activityOptions.getCode() == null
				|| activityOptions.getCode().equals("")
				|| activityOptions.getSalesOrg() == null
				|| activityOptions.getSalesOrg().equals("")
				|| activityOptions.getRoleId() == null
				|| activityOptions.getRoleId().equals("")) {
			return "{\"activityOptionsMapJson\":" + activityOptionsJson
					+ ",\"msg\":\"" + Constants.MANDATORY + "\"}";
		}
		gson = new Gson();
		try {
			activityOptionsList = ApplicationSettingDAOImpl
					.getStoreDtl(buildQueryForStoreDtl(activityOptions));
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (activityOptionsList != null && activityOptionsList.size() > 0) {
			activityOptionsJson = gson.toJson(activityOptionsList);
		}
		System.out.println(" getExcludeOption outside ");
		return "{\"activityOptionsList\":" + activityOptionsJson
				+ ",\"msg\":\"" + "" + "\"}";

	}

	private String buildQueryForStoreDtl(ActivityOptions activityOptions) {
		String query = "";

		StringBuffer select = new StringBuffer(
				" select ngbo_func.*,sm.* from ( SELECT ngbo_func.store  ");
		StringBuffer from = new StringBuffer(" FROM "
				+ ((activityOptions.getPlatform()!=null && activityOptions.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)) ?
						(Constants.NGBO_FUNCTION_EXCLUDE_RF):(Constants.NGBO_FUNCTION_EXCLUDE)) + " ngbo_func  ");
		StringBuffer where = new StringBuffer(" where 1 = 1 ");

		if (activityOptions.getAccessLevel() != null
				&& !activityOptions.getAccessLevel().equals(""))
			where.append(" and ngbo_func.access_level='")
					.append(activityOptions.getAccessLevel()).append("'");

		if (activityOptions.getSalesOrg() != null
				&& !activityOptions.getSalesOrg().equals(""))
			where.append(" and ngbo_func.sales_org='")
					.append(activityOptions.getSalesOrg()).append("'");
		if (activityOptions.getRoleId() != null
				&& !activityOptions.getRoleId().equals(""))
			where.append(" and ngbo_func.role_id ='")
					.append(activityOptions.getRoleId()).append("'");

		if (activityOptions.getCode() != null
				&& !activityOptions.getCode().equals(""))
			where.append(" and ngbo_func.function_code='")
					.append(activityOptions.getCode()).append("'");

		where.append(" ) ngbo_func join ").append(Constants.NGBO_SITEMASTER)
				.append(" sm on (ngbo_func.store = sm.SITE) ");
		query = select.append(from).append(where).toString();
		System.out.println("query_" + query);
		return query;
	}

	@RequestMapping(value = "/verifySiteNo.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyStore(@ModelAttribute ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String store = activityOptions.getSiteNo();
		String salesOrg = activityOptions.getSalesOrg();
		List<SiteDtls> siteDtlsList = null;
		String status = "false";
		if (store == null && salesOrg == null) {
			return "mandatory";
		}
		try {
			siteDtlsList = LoginServiceImpl
					.getSiteDtls(store, "", "", salesOrg,"");
			if (siteDtlsList != null && siteDtlsList.size() > 0) {

				return "true-" + siteDtlsList.get(0).getSalesOrg() + "-"
						+ siteDtlsList.get(0).getSiteNo() + "-"
						+ siteDtlsList.get(0).getSiteName().replace("-", "_");
			} else {
				return "false";
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return status;
	}
	
	@SuppressWarnings("null")
	@RequestMapping(value = "/replicate.htm", method = RequestMethod.POST)
	@ResponseBody
	public String replicate(
			@ModelAttribute("data") BroadcastMessageModel param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			param.setMsg("Session time out.");
			return CommonUtils.convertObjectTojson(param);
		}
		String fromSalesOrg=request.getParameter("fromSalesOrg");
		String toSalesOrg=request.getParameter("toSalesOrg");
		String fromRole=request.getParameter("fromRole");
		String toRolesStr=request.getParameter("toRoles");
		String userId=new String();
		ArrayList<String> toRoles=new ArrayList<String>();
		
		try {
			if (null != toRolesStr) {
				toRoles.addAll(
						Arrays.asList(toRolesStr.split(",")));
			}
			userId=((UserContext) request.getSession(false)
					.getAttribute("user")).getUserId();
			NotificationSettingDAOImpl.replicateNotification(fromSalesOrg,toSalesOrg,fromRole,toRoles,userId);
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		}
		return "success";
	}
	
	@RequestMapping(value = "/getNotificationSettings.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getNotificationSettings(
			@ModelAttribute UsrInfoParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String status=Constants.FALSE;
		String message="";

		LOGGER.info("method start of getNotificationSettings ");
		if (param.getUser_id() == null || param.getUser_id().equals("")) {
			LOGGER.info(Constants.MANDATOR_SCS);
			message=Constants.MANDATOR_SCS;
		}else{
			try {
				message=LoginServiceImpl.getNotificationSettings(param.getUser_id());
				status=Constants.SUCCESS_MSG;
			} catch (Exception e) {
				LOGGER.error(e);		
				message=Constants.TECHNICAL_ISSUE;
			}
		}
		return "{\"typ\":\"" + status + "\",\"msg\":\"" + message + "\"}";
	}
	
	@RequestMapping(value = "/setNotificationSettings.htm", method = RequestMethod.POST)
	@ResponseBody
	public String setNotificationSettings(
			@ModelAttribute UsrInfoParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String status=Constants.FALSE;
		String message="";
		LOGGER.info("method start of setNotificationSettings ");
		if (param.getUser_id() == null || param.getUser_id().equals("") 
				||param.getNotify_settings()==null||param.getNotify_settings().trim().equals("")) {
			LOGGER.info(Constants.MANDATOR_SCS);	
			message=Constants.MANDATOR_SCS;
		}else{
			try {
				message=LoginServiceImpl.setNotificationSettings(param.getUser_id(),param.getNotify_settings());
				status=Constants.SUCCESS_MSG;
			} catch (Exception e) {
				LOGGER.error(e);
				message=Constants.TECHNICAL_ISSUE;
			}
		}
		return "{\"typ\":\"" + status + "\",\"msg\":\"" + message + "\"}";
	}
	
}
