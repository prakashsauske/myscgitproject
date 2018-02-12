package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.UserManagementParam;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.param.UsrInfoParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.service.UserMgtDAOImpl;

@Controller
@RequestMapping(value = "*/usrMgt")
@Scope("session")
public class UserManagementController extends BaseController {

	private ModelMap model;
	private UserContext userDetail;
	// private ZeroMPLReportParam paramForPagination;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";

	ArrayList<UserSiteDtl> userSiteDtlList = null;

	@Autowired
	private ArticleServiceImpl articleService;
	
	@Autowired
	private LoginServiceImpl loginServiceImpl;

	@RequestMapping(value = "/storeManagerUserMgt.htm", method = RequestMethod.GET)
	public ModelAndView storeManagerUserMgt(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("userStoreManagement");

		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();

		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		ArrayList<RoleProfileDtl> roleList = null;

		try {
			userSiteDtlList = UserMgtDAOImpl.getUserSiteDtls(param);

			model.addAttribute(
					"recordCnt",
					(userSiteDtlList != null && userSiteDtlList.size() > 0) ? userSiteDtlList
							.size() : "0");

			model.addAttribute(
					"userSiteDtlList",
					(userSiteDtlList != null && userSiteDtlList.size() > 0) ? userSiteDtlList
							: new ArrayList<UserSiteDtl>());

			roleList = RoleMgtDAOImpl.getRoleList();
			// if(salesOrgExcludeMap!=null && salesOrgExcludeMap.size()>0)
			model.addAttribute("roleList",
					(roleList != null && roleList.size() > 0) ? roleList
							: new ArrayList<String>());

			List<Department> deptInfoList = new ArrayList<Department>();
			try {

				String parent_node_no = "ALL DEPARTMENTS";
				deptInfoList = (ArrayList<Department>) articleService
						.getDeptDetails(parent_node_no, ((UserContext) request
								.getSession().getAttribute("user"))
								.getSalesOrg(),userDetail);

				model.addAttribute("deptInfoList", deptInfoList);

			} catch (Exception e) {
				e.printStackTrace();			
				model.addAttribute("deptInfoList", new ArrayList<Department>());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/itAdminUserMgt.htm", method = RequestMethod.GET)
	public ModelAndView itAdminUserMgt(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("itAdminManagement");
		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();
		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());

		/*
		 * Map<String, String> salesOrgMap = null; Map<String,
		 * ArrayList<MenuOptions>> applicationSettingsDetailMap = null;
		 * Map<String, ArrayList<String>> salesOrgExcludeMap = null;
		 * ArrayList<RoleProfileDtl> roleList=null;
		 * 
		 * try{ // getting all the sales orgs for tab setttings salesOrgMap =
		 * LoginServiceImpl.getAllSalesOrg(); // if(salesOrgMap!=null &&
		 * salesOrgMap.size()>0) model.addAttribute("salesOrgMap", (salesOrgMap
		 * != null && salesOrgMap .size() > 0) ? salesOrgMap : new
		 * HashMap<String, String>());
		 * 
		 * // getting all the applications settings detail of user sales org
		 * applicationSettingsDetailMap = LoginServiceImpl .getRoleMgtDetail();
		 * // if(applicationSettingsDetailMap!=null && //
		 * applicationSettingsDetailMap.size()>0) model.addAttribute(
		 * "applicationSettingsDetailMap", (applicationSettingsDetailMap != null
		 * && applicationSettingsDetailMap .size() > 0) ?
		 * applicationSettingsDetailMap : new HashMap<String,
		 * ArrayList<MenuOptions>>());
		 * 
		 * // getting all the sales orgs excluded menu salesOrgExcludeMap =
		 * LoginServiceImpl.getRoleExcludeDetail(); //
		 * if(salesOrgExcludeMap!=null && salesOrgExcludeMap.size()>0)
		 * model.addAttribute( "salesOrgExcludeMap", (salesOrgExcludeMap != null
		 * && salesOrgExcludeMap.size() > 0) ? salesOrgExcludeMap : new
		 * HashMap<String, ArrayList<String>>());
		 * 
		 * // getting all the sales orgs excluded menu roleList =
		 * LoginServiceImpl.getRoleList(); // if(salesOrgExcludeMap!=null &&
		 * salesOrgExcludeMap.size()>0) model.addAttribute( "roleList",
		 * (roleList != null && roleList.size() > 0) ? roleList : new
		 * ArrayList<String>()); }catch(Exception e){ e.printStackTrace(); }
		 */
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/verifyUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyUser(
			@ModelAttribute("viewQuery") AQMSearchQueryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());
		param.setSubmitBy(request.getParameter("userId"));
		param.setMsg(userDetail.getUserId());
		String msg = "";

		try {
			userSiteDtlMap = UserMgtDAOImpl.verifyUser(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userSiteDtlMap != null && userSiteDtlMap.size() > 0)
			msg = "true";
		else
			msg = "false";
		return convertUserSiteDtlListTempTojson(userSiteDtlMap, msg);

	}

	@RequestMapping(value = "/createUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String createUser(
			@ModelAttribute("viewQuery") UserManagementParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		boolean status = false;
		param.setSiteNo(userDetail.getSiteNo());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		param.setCreatedUserId(userDetail.getUserId());

		try {
			status = UserMgtDAOImpl.creatUser(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (status)
			return "true";

		else
			return "false";

	}

	@RequestMapping(value = "/updateUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updateUser(
			@ModelAttribute("viewQuery") UserManagementParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		boolean status = false;
		param.setSiteNo(userDetail.getSiteNo());
		param.setSaleOrg(userDetail.getSalesOrg().toString());

		try {
			status = UserMgtDAOImpl.updateUser(param,userDetail.getUserId());
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (status)
			return "true";

		else
			return "false";

	}

	@RequestMapping(value = "/deActivateUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String deActivateUser(
			@ModelAttribute("viewQuery") UserManagementParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		boolean status = false;
		param.setSiteNo(userDetail.getSiteNo());
		//System.out.println("deActivateUser");

		try {
			status = UserMgtDAOImpl.deActivateUser(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		//System.out.println(status);
		if (status)
			return "true";

		else
			return "false";

	}

	@RequestMapping(value = "/resetPwd.htm", method = RequestMethod.GET)
	@ResponseBody
	public String resetPwd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		String status = "";
		String newPwd = (String) request.getParameter("newPwd");
		// String oldPwd = (String) request.getParameter("oldPwd");
		String userId = (String) request.getParameter("userNo");
		// String curPwd=((UserContext)
		// request.getSession().getAttribute("user")).getPassword();
		
		UsrInfoParam usrInfoParam = new UsrInfoParam();
		usrInfoParam.setUser_id(userId);
		usrInfoParam.setPwd(newPwd);
		ArrayList<UsrInfoParam> paramList = new ArrayList<UsrInfoParam>();
		ArrayList<UsrInfoParam> responseList = new ArrayList<UsrInfoParam>();
		paramList.add(usrInfoParam);

		try {
			responseList = loginServiceImpl.getEncryptPassword(paramList,userDetail);
			status = UserMgtDAOImpl.updatePwd(userId, responseList.get(0).getEncPassword());
		} catch (Exception e) {
			e.printStackTrace();
			status = "Password update failed.";
		}

		return status;
	}

	@RequestMapping(value = "/userDtls.htm", method = RequestMethod.GET)
	@ResponseBody
	public String userDtls(
			@ModelAttribute("viewQuery") AQMSearchQueryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap = null;
		param.setSiteNo(userDetail.getSiteNo());
		param.setSubmitBy(request.getParameter("userId"));
		// param.setMsg(userDetail.getUserId());
		String msg = "";

		try {
			userSiteDtlMap = UserMgtDAOImpl.getUserDtl(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (userSiteDtlMap != null && userSiteDtlMap.size() > 0)
			msg = "true";
		else
			msg = "false";
		return convertUserSiteDtlListTempTojson(userSiteDtlMap, msg);

	}

	private String convertUserSiteDtlListTempTojson(
			Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap, String msg) {

		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, userSiteDtlMap);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}

		System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/userRoleMgt.htm", method = RequestMethod.GET)
	public ModelAndView userRoleMgt(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("adminRoleManagement");
		UserPreferencesParam param = new UserPreferencesParam();
		// userDetail = ((UserContext)
		// request.getSession().getAttribute("user"));
		model = new ModelMap();
		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(request.getParameter("userNo"));
		param.setSaleOrg(userDetail.getSalesOrg().toString());

		Map<String, String> salesOrgMap = null;
		Map<String, ArrayList<MenuOptions>> applicationSettingsDetailMap = null;
		Map<String, ArrayList<String>> salesOrgExcludeMap = null;
		ArrayList<RoleProfileDtl> roleList = null;
		ArrayList<String> additionalAccesList = null;

		salesOrgMap = new HashMap<String, String>();

		salesOrgMap.put(userDetail.getSalesOrg().toString(), "Sm");

		try {

			model.addAttribute(
					"salesOrgMap",
					(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
							: new HashMap<String, String>());

			// getting all the applications settings detail of user sales org
//			applicationSettingsDetailMap = RoleMgtDAOImpl.getRoleMgtDetail();

			model.addAttribute(
					"applicationSettingsDetailMap",
					(applicationSettingsDetailMap != null && applicationSettingsDetailMap
							.size() > 0) ? applicationSettingsDetailMap
							: new HashMap<String, ArrayList<MenuOptions>>());

			// getting all the sales orgs excluded menu
			salesOrgExcludeMap = RoleMgtDAOImpl.getRoleExcludeDetail();
			model.addAttribute(
					"salesOrgExcludeMap",
					(salesOrgExcludeMap != null && salesOrgExcludeMap.size() > 0) ? salesOrgExcludeMap
							: new HashMap<String, ArrayList<String>>());

			additionalAccesList = UserMgtDAOImpl.getUsrFuncExc(
					param.getSiteNo(), param.getUserId());
			model.addAttribute(
					"additionalAccess",
					(additionalAccesList != null && additionalAccesList.size() > 0) ? additionalAccesList
							: new ArrayList<String>());

			model.addAttribute("roleList",
					(roleList != null && roleList.size() > 0) ? roleList
							: new ArrayList<String>());
		} catch (Exception e) {
			e.printStackTrace();
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/saveRolePrflSettings.htm", method = RequestMethod.GET)
	@ResponseBody
	public String saveRolePrflSettings(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		String[] selectedApllicationSettings = request.getParameter(
				"selectedApllicationSettings").split(",");
		String userId = request.getParameter("userId");
		//System.out.println("saveApllicationSettings");
		String updateStatus = "";
		/*
		 * UserPreferencesParam param = new UserPreferencesParam(); Map<String,
		 * UserPreferences> defaultPreferenceMap = null; Map<String,
		 * UserPreferences> userPreferenceMap = null;
		 * param.setSiteNo(userDetail.getSiteNo());
		 * param.setOption("preferences");
		 * param.setUserId(userDetail.getUserId());
		 * param.setSaleOrg(userDetail.getSalesOrg().toString());
		 */
		// param.setUserPreferencesSize(userPreferencesSize);
		// HttpSession session = request.getSession(false);

		if (selectedApllicationSettings != null
				&& selectedApllicationSettings.length > 0
				&& selectedApllicationSettings[0] != ""
				&& selectedApllicationSettings[0].split(":")[0] != "")
			updateStatus = UserMgtDAOImpl.updateUserFuncSettings(userId,
					userDetail.getSiteNo(), selectedApllicationSettings);

		if (updateStatus.equalsIgnoreCase("true")) {
			return "success";
		} else {
			return updateStatus;
		}

	}




}
