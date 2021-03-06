package au.com.woolworths.portal.controller;

import java.io.StringWriter;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
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
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.ReplicateParam;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ApplicationSettingDAOImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.service.StoreSearchServiceImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/login")
@Scope("session")
public class ApplicationSettingsController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ADMIN']}")
	private String screenCode;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['pilotStrategy']}")
	private String screenCode1;
	
	private ModelMap model;

	private UserContext userDetail;

	private static final Logger LOGGER = Logger.getLogger(ApplicationSettingsController.class.getName());

	@Autowired
	private StoreSearchServiceImpl storeSearchService;

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

	@RequestMapping(value = "/applicationSettings.htm", method = RequestMethod.GET)
	public ModelAndView applicationSettings(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("applicationSettings");
		UserPreferencesParam param = new UserPreferencesParam();

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
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		ModelAndView modelAndView = new ModelAndView("adminAppSettings");
		UserPreferencesParam param = new UserPreferencesParam();

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
	
	@RequestMapping(value = "/pilotStrategy.htm", method = RequestMethod.GET)
	public ModelAndView pilotStrategy(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode1)){
			if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		ModelAndView modelAndView = new ModelAndView("pilotStrategy");
		UserPreferencesParam param = new UserPreferencesParam();

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

	private void getManageMenuDetails(UserPreferencesParam param) {
		Map<String, ArrayList<MenuOptions>> manageMenuMap = null;
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
			ApplicationSettingDAOImpl
					.getApplicationSettingsDetail(param);
			manageMenuMap = param.getManageMenuMap();
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
		if(manageMenuMap != null){
			model.addAttribute(
					"manageMenuMap",
					(manageMenuMap.size() > 0) ? manageMenuMap
							: new HashMap<String, ArrayList<MenuOptions>>());
			String manageMenuMapJson = gson.toJson(manageMenuMap);
			manageMenuMapJson = manageMenuMapJson.replace("\"", "\\\"");
			model.addAttribute(
					"manageMenuMapJson",
					(manageMenuMap.size() > 0) ? manageMenuMapJson
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
		LOGGER.info(" getExcludeOption inside ");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		Map<String, ArrayList<ActivityOptions>> activityOptionsMap = null;
		String activityOptionsMapJson = "{}";
		Gson gson = null;
		if (activityOptions == null || activityOptions.equals("")) {
			return "{\"activityOptionsMapJson\":" + activityOptionsMapJson
					+ ",\"msg\":\"" + Constants.MANDATORY + "\"}";
		}
		gson = new Gson();
		try {
			activityOptionsMap = ApplicationSettingDAOImpl
					.getSalesOrgExcludeDetail(buildQueryForExcludeOption(activityOptions));
		} catch (Exception e) {
			e.printStackTrace();
		}

		if (activityOptionsMap != null && activityOptionsMap.size() > 0) {
			activityOptionsMapJson = gson.toJson(activityOptionsMap);
		}
		LOGGER.info(" getExcludeOption outside ");
		return "{\"activityOptionsMapJson\":" + activityOptionsMapJson
				+ ",\"msg\":\"" + "" + "\"}";

	}

	private String buildQueryForExcludeOption(ActivityOptions activityOptions) {
		String query = "";
		StringBuffer select = new StringBuffer(
				"select distinct NGBO_FUNC.*, COUNT(1) OVER(PARTITION BY NGBO_FUNC.include_exclude_flag,NGBO_FUNC.function_code) CNT ");
		StringBuffer from = null;
		// changed for central cache sync issue
		StringBuffer where = new StringBuffer(" where isactive = '1' ");
		if(activityOptions.getPlatform()!=null && activityOptions.getPlatform().equalsIgnoreCase(Constants.RF_PLATFORM)){
			from = new StringBuffer(" from "
					+ Constants.NGBO_FUNCTION_EXCLUDE_RF + " NGBO_FUNC ");
		}else{
			from = new StringBuffer(" from "
					+ Constants.NGBO_FUNCTION_EXCLUDE + " NGBO_FUNC ");
		}
		if (activityOptions.getAccessLevel() != null
				&& !activityOptions.getAccessLevel().equals(""))
			where.append(" and ACCESS_LEVEL='")
					.append(activityOptions.getAccessLevel()).append("'");

		if (activityOptions.getSalesOrg() != null
				&& !activityOptions.getSalesOrg().equals("")) {
			where.append(" and SALES_ORG='")
					.append(activityOptions.getSalesOrg()).append("'");

			// added to avoid repair cental while bigW
			/*if (activityOptions.getSalesOrg().equalsIgnoreCase(
					"" + PortalUtil.BIGW_SALES_ORG + "")) {
				where.append(
						"AND FUNCTION_CODE not in (select distinct function_code from NGBO_SCREEN_FUNCTION_MASTER where root_code in('")
						.append(PortalUtil.REPARE_CENTAL_CODE).append("'))");
			}*/

		}

		if (activityOptions.getRoleId() != null
				&& !activityOptions.getRoleId().equals(""))
			where.append(" and ROLE_ID='").append(activityOptions.getRoleId())
					.append("'");

		if (activityOptions.getSiteNo() != null
				&& !activityOptions.getSiteNo().equals(""))
			where.append(" and STORE='").append(activityOptions.getSiteNo())
					.append("'");
		query = select
				.append(from)
				.append(where)
				.append(" order by include_exclude_flag nulls first,ACCESS_FLAG nulls last ")
				.toString();
		LOGGER.info("query = "+query);
		return query;
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
		// LOGGER.info("stw.toString()__" + stw.toString());
		return "{\"data\":" + stw.toString() + "}";
	}

	@RequestMapping(value = "/getStoreDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getStoreDtl(@ModelAttribute ActivityOptions activityOptions,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		LOGGER.info(" getExcludeOption inside ");
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
		LOGGER.info(" getExcludeOption outside ");
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
		// changed for central cache sync issue
		StringBuffer where = new StringBuffer(" where isactive = '1' ");

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
		LOGGER.info("query_" + query);
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
	
	@RequestMapping(value = "/accessAllAppCodes.htm", method = RequestMethod.POST)
	@ResponseBody
	public String accessAllAppCodes(
			@ModelAttribute ReplicateParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ArrayList<ActivityOptions> result=new ArrayList<ActivityOptions>();
		if(param.getFromSite()==null||param.getFromSite().trim().equalsIgnoreCase("")
				||param.getToSite()==null||param.getToSite().trim().equalsIgnoreCase("")
				||param.getExcludeFlag()==null||param.getExcludeFlag().trim().equalsIgnoreCase("")
				||param.getIncludeFlag()==null||param.getIncludeFlag().trim().equalsIgnoreCase("")){
			param.setMsg("Please enter all mandatory fields.");
			param.setType(Constants.FALSE);
		}else{
			
			if(ApplicationSettingDAOImpl.checkIfBackupDone()){
				if(validateStore(param)){
					result=ApplicationSettingDAOImpl
							.getAllApplicationCodes(buildQueryForGetFunctionCodes(param));
					if(result!=null && result.size()>0){
						param.setType(Constants.TRUE);
						param.setResults(result);
					}else{
						param.setType(Constants.FALSE);
						param.setMsg("No Results found.");
					}
				}
			}else{
				param.setType(Constants.FALSE);
				param.setMsg("Please take back up before you proceed.");
			}
		}
		return Constants.convertToJSON(param);
	}
	
	@RequestMapping(value = "/verifyStores.htm", method = RequestMethod.POST)
	@ResponseBody
	public String verifyStores(
			@ModelAttribute ReplicateParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if(param.getFromSite()==null||param.getFromSite().trim().equalsIgnoreCase("")
				||param.getToSite()==null||param.getToSite().trim().equalsIgnoreCase("")
				||param.getExcludeFlag()==null||param.getExcludeFlag().trim().equalsIgnoreCase("")
				||param.getIncludeFlag()==null||param.getIncludeFlag().trim().equalsIgnoreCase("")
				||param.getStoreslist()==null||param.getStoreslist().trim().equalsIgnoreCase("")){
			param.setMsg("Please enter all mandatory fields.");
			param.setType(Constants.FALSE);
		}else{
			ApplicationSettingDAOImpl.verifyStores(param);
		}
		return Constants.convertToJSON(param);
	}
	
	@RequestMapping(value = "/replicateSettingsPilot.htm", method = RequestMethod.POST,consumes = "application/json")
	@ResponseBody
	public String replicateSettingsPilot(
			@RequestBody ReplicateParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		LOGGER.info("param"+Constants.convertToJSON(param));
		ArrayList<String> insetQryList=new ArrayList<String>();
		if(param.getFromSite()==null||param.getFromSite().trim().equalsIgnoreCase("")
				||param.getToSite()==null||param.getToSite().trim().equalsIgnoreCase("")
				||param.getExcludeFlag()==null||param.getExcludeFlag().trim().equalsIgnoreCase("")
				||param.getIncludeFlag()==null||param.getIncludeFlag().trim().equalsIgnoreCase("")){
			param.setMsg("Please enter all mandatory fields.");
			param.setType(Constants.FALSE);
		}else{
			if(param.getVerifiedStores()!=null && param.getVerifiedStores().size()>0){
				String storesList="";
				for(SiteDtls sb:param.getVerifiedStores()){
					storesList+="'"+sb.getSiteNo()+"'";
					if(!(param.getVerifiedStores().lastIndexOf(sb)==param.getVerifiedStores().size()-1)){
						storesList+=",";
					}
				}
				insetQryList.add("update ngbo_function_exclude set isactive=0,changed_ts=TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') where store in ("+storesList+")");
			}else{
				insetQryList.add("update ngbo_function_exclude set isactive=0,changed_ts=TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') where store='"+param.getToSite()+"'");
			}
			if(param.getVerifiedStores()!=null && param.getVerifiedStores().size()>0){
				for(SiteDtls sb:param.getVerifiedStores()){
					for(ActivityOptions op:param.getResults()){
						insetQryList.add(generateInsertQry(op,param,sb));
					}
				}
			}else{
				for(ActivityOptions op:param.getResults()){
					insetQryList.add(generateInsertQry(op,param));
				}
			}
			if(insetQryList.size()>0){
				if(ApplicationSettingDAOImpl.insertAllSettings(insetQryList)){
					param.setType(Constants.TRUE);
				}else{
					param.setType(Constants.FALSE);
				}
			}else{
				param.setType(Constants.FALSE);
			}
		}
		return Constants.convertToJSON(param);
	}
	
	@RequestMapping(value = "/exportQuery.htm", method = RequestMethod.POST,consumes = "application/json")
	@ResponseBody
	public String exportQuery(
			@RequestBody ReplicateParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		try{
			LOGGER.info("param"+Constants.convertToJSON(param));
			ArrayList<String> insetQryList=new ArrayList<String>();
			if(param.getFromSite()==null||param.getFromSite().trim().equalsIgnoreCase("")
					||param.getToSite()==null||param.getToSite().trim().equalsIgnoreCase("")
					||param.getExcludeFlag()==null||param.getExcludeFlag().trim().equalsIgnoreCase("")
					||param.getIncludeFlag()==null||param.getIncludeFlag().trim().equalsIgnoreCase("")){
				param.setMsg("Please enter all mandatory fields.");
				param.setType(Constants.FALSE);
			}else{
				if(param.getVerifiedStores()!=null && param.getVerifiedStores().size()>0){
					String storesList="";
					for(SiteDtls sb:param.getVerifiedStores()){
						storesList+="'"+sb.getSiteNo()+"'";
						if(!(param.getVerifiedStores().lastIndexOf(sb)==param.getVerifiedStores().size()-1)){
							storesList+=",";
						}
					}
					insetQryList.add("update ngbo_function_exclude set isactive=0,changed_ts=TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') where store in ("+storesList+")");
				}else{
					insetQryList.add("update ngbo_function_exclude set isactive=0,changed_ts=TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS') where store='"+param.getToSite()+"'");
				}
				if(param.getVerifiedStores()!=null && param.getVerifiedStores().size()>0){
					for(SiteDtls sb:param.getVerifiedStores()){
						for(ActivityOptions op:param.getResults()){
							insetQryList.add(generateInsertQry(op,param,sb));
						}
					}
				}else{
					for(ActivityOptions op:param.getResults()){
						insetQryList.add(generateInsertQry(op,param));
					}
				}
				if(insetQryList.size()>0){
					param.setType(Constants.TRUE);
					param.setQueryList(insetQryList);
				}else{
					param.setType(Constants.FALSE);
				}
			}
		}catch(Exception e){
			e.printStackTrace();
		}
		return Constants.convertToJSON(param);
	}
	
	@RequestMapping(value = "/backupCheckpoint.htm", method = RequestMethod.GET)
	@ResponseBody
	public String backupCheckpoint(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ReplicateParam param=new ReplicateParam();
		Date dt=new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		try{
			if(!ApplicationSettingDAOImpl.generateCheckpoint(param)){
				param.setType(Constants.TRUE);
			}
		}catch(Exception e){
			e.printStackTrace();
			param.setType(Constants.FALSE);
		}
		return Constants.convertToJSON(param);
	}

	@RequestMapping(value = "/backup.htm", method = RequestMethod.GET)
	@ResponseBody
	public String backup(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		ReplicateParam param=new ReplicateParam();
		Date dt=new Date();
		Calendar cal = Calendar.getInstance();
		cal.setTime(dt);
		try{
			if(!ApplicationSettingDAOImpl.checkIfBackupDone()){
				String newTableName=new String("BACKUP_FUNCTION_EXCLUDE");
				ApplicationSettingDAOImpl.backupAppSettings(newTableName);
				param.setType(Constants.TRUE);
				ApplicationSettingDAOImpl.updateBackupStatus(userDetail.getUserId());
			}else{
				param.setType("AE");
			}
		}catch(Exception e){
			e.printStackTrace();
			param.setType(Constants.FALSE);
		}
		return Constants.convertToJSON(param);
	}
	
	private String generateInsertQry(ActivityOptions op, ReplicateParam param) {
		String qry="Insert into NGBO_FUNCTION_EXCLUDE (MANDT,SEQ_NUMBER,SALES_ORG,ROLE_ID,STORE,INCLUDE_EXCLUDE_FLAG,CREATE_DATE,CREATED_USER,ACCESS_FLAG,FUNCTION_CODE,SCREEN_FUNCTION_FLAG,ACCESS_LEVEL,CHANGED_TS,ISACTIVE) values " +
				"('200',NGBO_FUNCTION_EXCLUDE_SEQ.nextVal,'"+param.getToSorg()+"','"+op.getRoleId()+"','"+param.getToSite()+"','"+op.getIncludeExcludeFlag()+"',sysdate,'"+userDetail.getUserId()+"',"+(op.getAccessFlag()!="R"?null:"'R'")+",'"+op.getCode()+"','SC','3',TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'),'1')";
		return qry;
	}
	
	private String generateInsertQry(ActivityOptions op, ReplicateParam param,SiteDtls sd) {
		String qry="Insert into NGBO_FUNCTION_EXCLUDE (MANDT,SEQ_NUMBER,SALES_ORG,ROLE_ID,STORE,INCLUDE_EXCLUDE_FLAG,CREATE_DATE,CREATED_USER,ACCESS_FLAG,FUNCTION_CODE,SCREEN_FUNCTION_FLAG,ACCESS_LEVEL,CHANGED_TS,ISACTIVE) values " +
				"('200',NGBO_FUNCTION_EXCLUDE_SEQ.nextVal,'"+param.getToSorg()+"','"+op.getRoleId()+"','"+sd.getSiteNo()+"','"+op.getIncludeExcludeFlag()+"',sysdate,'"+userDetail.getUserId()+"',"+(op.getAccessFlag()!="R"?null:"'R'")+",'"+op.getCode()+"','SC','3',TO_CHAR(SYSDATE,'YYYYMMDDHH24MISS'),'1')";
		return qry;
	}
	
	public boolean validateStore(ReplicateParam param) {
		boolean flag = false;
		List<Store> siteDtlsList = null;
		try {
			siteDtlsList = LoginServiceImpl.getSitesListNew(param.getFromSite());
			if (siteDtlsList != null && siteDtlsList.size() > 0) {
				param.setFromSorg(siteDtlsList.get(0).getSalesOrg());
			}else{
				param.setType(Constants.FALSE);
				param.setMsg("Please enter valid copy from store.");
			}
			
			if(param.getType()==null||!param.getType().equals(Constants.FALSE)){
				siteDtlsList = LoginServiceImpl.getSitesListNew(param.getToSite());
				if (siteDtlsList != null && siteDtlsList.size() > 0) {
					param.setToSorg(siteDtlsList.get(0).getSalesOrg());
					if(!param.getToSorg().equalsIgnoreCase(param.getFromSorg())){
						param.setType(Constants.FALSE);
						param.setMsg("Both the stores should belong to same Sales Org.");
					}
				}else{
					param.setType(Constants.FALSE);
					param.setMsg("Please enter valid copy to store.");
				}
			}
			
			if(param.getType()==null||!param.getType().equals(Constants.FALSE)) flag=true;
			
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return flag;
	}
	
	public String buildQueryForGetFunctionCodes(ReplicateParam param){
		String includeExcludeWhere="";
		
		if(param.getIncludeFlag().equalsIgnoreCase("Y") && param.getExcludeFlag().equalsIgnoreCase("Y")){
			includeExcludeWhere=" nfe.include_exclude_flag='I' or nfe.include_exclude_flag='E' ";
		}else if(param.getIncludeFlag().equalsIgnoreCase("N") || param.getExcludeFlag().equalsIgnoreCase("N")){
			if(param.getIncludeFlag().equalsIgnoreCase("Y")){
				includeExcludeWhere=" nfe.include_exclude_flag='I' ";
			}else{
				includeExcludeWhere=" nfe.include_exclude_flag='E' ";
			}
		}
		
		String qry="select nfe.function_code,nfm.func_desc,nfe.role_id,nfe.include_exclude_flag, rp.role_desc,nfe.access_flag from ngbo_function_exclude nfe,ngbo_screen_function_master nfm,role_profile rp " +
				"where nfe.function_code=nfm.function_code and rp.role_code=nfe.role_id and store ='"+param.getFromSite()+"' " +
						"and ("+includeExcludeWhere+") " +
								"and nfe.role_id in (select role_id from sales_org_role_profile where sales_org_role_profile.sales_org = '"+param.getToSorg()+"') and nfe.isactive=1";
		return qry;
	}
	
}
