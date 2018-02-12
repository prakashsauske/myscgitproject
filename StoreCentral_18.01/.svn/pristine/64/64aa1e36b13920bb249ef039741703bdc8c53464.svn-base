package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
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
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.SiteDtls;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserPreferences;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.service.StoreSearchServiceImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.service.UserPreferenceDAOImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/prefer")
@Scope("session")
public class UserPreferencesController extends BaseController {
	private ModelMap model;

	private static final Logger LOGGER = Logger.getLogger(UserPreferencesController.class.getName());

	@Autowired
	private StoreSearchServiceImpl storeSearchService;

	@Value("#{url['UserPreferencesSize']}")
	private String userPreferencesSize;

	@Autowired
	private UserAccessServiceImpl userAccessService;
	
	@Autowired
	private ArticleServiceImpl articleService;

	Map<String, ArrayList<UserPreferences>> defaultPreferenceMap = null;
	Map<String, UserPreferences> userPreferenceMap = null;
	Map<String, UserPreferences> userPreferenceUrlMap = null;

	// ON PAGE LOAD METHOD FOR USER PREFERENCES
	@RequestMapping(value = "/userPreferences.htm", method = RequestMethod.GET)
	public ModelAndView userPreferences(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("inside userPreferences_");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		UserContext usr=(UserContext) request.getSession(
				false).getAttribute("user");
		
		UserContext userDetail = (UserContext) (request.getSession(false)
				.getAttribute("user"));
		if(Constants.isAdminUser(userDetail.getRoleID())){
			return new ModelAndView("noAccess");
		}
		
		model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("userPreferences");
		UserPreferencesParam param = new UserPreferencesParam();
		String platform = request.getParameter("platform");
		param.setPlatform((null==platform)?Constants.BROWSER:((platform.equalsIgnoreCase(Constants.BROWSER)||platform.equalsIgnoreCase(Constants.MOBILE))?platform:Constants.BROWSER));
		model.addAttribute("loginFlag", "");
		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		param.setRoleId(userDetail.getRoleID());
		param.setUserPreferencesSize(userPreferencesSize);
		model.addAttribute("roleList", getUniquRoleList(usr));
		/*defaultPreferenceMap = UserPreferenceDAOImpl
				.getHomeShortcutFunction(param);
		userPreferenceUrlMap = param.getUserPreferencesURLMap();
		userPreferenceMap = (LinkedHashMap<String, UserPreferences>) request
				.getSession(false).getAttribute("userPreferenceMap");*/
		model.addAttribute(
				"defaultPreferenceMap",
				(defaultPreferenceMap != null && defaultPreferenceMap.size() > 0) ? defaultPreferenceMap
						: new LinkedHashMap<String, ArrayList<UserPreferences>>());
		model.addAttribute(
				"userPreferenceMap",
				(userPreferenceMap != null && userPreferenceMap.size() > 0) ? userPreferenceMap
						: new LinkedHashMap<String, UserPreferences>());
		List<String> salOrgList=new ArrayList<String>();
		List<Department> deptInfoList = new ArrayList<Department>();
		Map<String,List<Department>> deptInfoListMap = new HashMap<String,List<Department>>();
		List<Department> usrDeptInfoList = new ArrayList<Department>();
		try {
//			if(Constants.isAdminUser(userDetail.getRoleID())){
//				salOrgList=UserPreferenceDAOImpl.getUserAllSalesOrg(Constants.ALL);
//			}else{
//				salOrgList=UserPreferenceDAOImpl.getUserAllSalesOrg(userDetail.getUserId());
//			}
			salOrgList.add(userDetail.getSalesOrg().toString());
			String parent_node_no = "ALL DEPARTMENTS";
			
			if(null!=salOrgList){
				for(String so :salOrgList){
					deptInfoList=new ArrayList<Department>();
					deptInfoList = (ArrayList<Department>) articleService
							.getDeptDetails(parent_node_no, ((UserContext) request
									.getSession().getAttribute("user"))
									.getSalesOrg(),userDetail);
					deptInfoListMap.put(so, deptInfoList);
				}
			}
			
			
			usrDeptInfoList=UserPreferenceDAOImpl.getUserPrimaryDepartments(userDetail.getUserId(),userDetail.getSiteNo());

			model.addAttribute("deptInfoList", CommonUtils.convertObjectTojson(deptInfoListMap));
			model.addAttribute("usrDeptInfoList",CommonUtils.convertObjectTojson(usrDeptInfoList));
			

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// called when preview button is clicked on home preference screen
	@RequestMapping(value = "/showHomePreview.htm", method = RequestMethod.GET)
	public ModelAndView showHomePreview(
			@ModelAttribute("userPreferences") UserPreferencesParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		ModelAndView modelAndView = new ModelAndView("homePreview");
		Map<String, UserPreferences> preferenceMap = null;
		UserPreferences userPreferences = null;
		String platform = request.getParameter("platform");
		param.setPlatform((null==platform)?Constants.BROWSER:((platform.equalsIgnoreCase(Constants.BROWSER)||platform.equalsIgnoreCase(Constants.MOBILE))?platform:Constants.BROWSER));
		if(param.getPlatform().equalsIgnoreCase(Constants.MOBILE)){
			modelAndView = new ModelAndView("mobileHomePreview");
		}
		
		String[] userSelectedPreferences = request.getParameter(
				"userSelectedPreference").split(",");

		try {
			if (userSelectedPreferences != null
					&& userSelectedPreferences.length > 0
					&& userSelectedPreferences[0] != ""
					&& userSelectedPreferences[0].split(":")[0] != "") {
				preferenceMap = new LinkedHashMap<String, UserPreferences>();
				for (Integer i = 1; i <= userSelectedPreferences.length; i++) {
					userPreferences = userPreferenceUrlMap
							.get(userSelectedPreferences[i - 1].split(":")[0]);
					preferenceMap.put(
							userSelectedPreferences[i - 1].split(":")[0],
							userPreferences);
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		model = new ModelMap();
		// to resolve ajax success call.
		param.setOption("preview");
		model.addAttribute(
				"preferenceMap",
				(preferenceMap != null && preferenceMap.size() > 0) ? preferenceMap
						: new LinkedHashMap<String, UserPreferences>());
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// called when save Preferences button is clicked from header option
	@RequestMapping(value = "/savePreferences.htm", method = RequestMethod.GET)
	@ResponseBody
	public String savePreferences(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		UserContext userDetail;
		String[] userSelectedPreferences = request.getParameter(
				"userSelectedPreference").split(",");
		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession(false).getAttribute(
				"user"));
		String platform = request.getParameter("platform");
		param.setPlatform((null==platform)?Constants.BROWSER:((platform.equalsIgnoreCase(Constants.BROWSER)||platform.equalsIgnoreCase(Constants.MOBILE))?platform:Constants.BROWSER));
		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		param.setRoleId(request.getParameter("roleId"));
		param.setSiteNo(request.getParameter("siteNo"));
		param.setUserPreferencesSize(userPreferencesSize);
		HttpSession session = request.getSession(false);
		Map<String, UserPreferences> defaultPreferenceMap = null;
		Map<String, UserPreferences> userPreferenceMap = null;

		String updateStatus = UserPreferenceDAOImpl.updateUserPreferences(
				param, userSelectedPreferences);

		if (updateStatus.equalsIgnoreCase("true")) {
			if(userDetail.getRoleID()!=null && param.getRoleId().equals(userDetail.getRoleID())){
			userPreferenceMap = UserPreferenceDAOImpl.getUserPreferences(param);

			if (!(userPreferenceMap != null && userPreferenceMap.size() > 0)) {
				defaultPreferenceMap = UserPreferenceDAOImpl
						.getDefaultPreferences(param);
				session.setAttribute("defaultPreferenceMap",
						(defaultPreferenceMap != null && defaultPreferenceMap
								.size() > 0) ? defaultPreferenceMap
								: new LinkedHashMap<String, UserPreferences>());
			}
			userPreferenceUrlMap = param.getUserPreferencesURLMap();
			session.removeAttribute("userPreferenceMap");
			session.setAttribute(
					"userPreferenceMap",
					(userPreferenceMap != null && userPreferenceMap.size() > 0) ? userPreferenceMap
							: new LinkedHashMap<String, UserPreferences>());
			}
			return "success";
		} else {
			return updateStatus;
		}

	}

	@RequestMapping(value = "/getDefaultAndUserPreferences.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getDefaultAndUserPreferences(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		UserContext userDetail;
		String defaultPrf = request.getParameter("defaultPrf");
		String userPrf = request.getParameter("userPrf");
		
		String defaultPrfJson = "";
		String userPrfJson = "";
		UserPreferencesParam param = new UserPreferencesParam();
		String platform = request.getParameter("platform");
		param.setPlatform((null==platform)?Constants.BROWSER:((platform.equalsIgnoreCase(Constants.BROWSER)||platform.equalsIgnoreCase(Constants.MOBILE))?platform:Constants.BROWSER));
		userDetail = ((UserContext) request.getSession(false).getAttribute(
				"user"));
		Gson gson = new Gson();
		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		param.setRoleId(request.getParameter("roleId"));
		//param.setSiteNo(request.getParameter("siteNo")); defect 14768
		param.setUserPreferencesSize(userPreferencesSize);
		
		
		Map<String, ArrayList<UserPreferences>> defaultPreferenceMap = new LinkedHashMap<String, ArrayList<UserPreferences>>();
		Map<String, UserPreferences> userPreferenceMap =  new LinkedHashMap<String, UserPreferences>();
		try {
			if (defaultPrf != null && !defaultPrf.equals("")) {
				defaultPreferenceMap = UserPreferenceDAOImpl
						.getHomeShortcutFunction(param);
			}
			if (userPrf != null && !userPrf.equals("")) {
				userPreferenceMap = UserPreferenceDAOImpl
						.getUserPreferences(param);
			}
			if (userPreferenceMap != null && userPreferenceMap.size() > 0)
				userPrfJson = gson.toJson(userPreferenceMap);
			else
				userPrfJson="{}";
			if (defaultPreferenceMap != null && defaultPreferenceMap.size() > 0)
				defaultPrfJson = gson.toJson(defaultPreferenceMap);
			else
				defaultPrfJson="{}";
			userPreferenceUrlMap = param.getUserPreferencesURLMap();
			return "{\"userPrfJson\":" + userPrfJson + ",\"defaultPrfJson\":"
					+ defaultPrfJson + "}";
		} catch (Exception e) {
			e.printStackTrace();
		}
		return "false";

	}
	
	private ArrayList<SiteDtls> getUniquRoleList(UserContext user){
		ArrayList<SiteDtls> result=new ArrayList<SiteDtls>();
		for(SiteDtls itm:user.getSiteDtlsList()){
			if(!isAlreadyExist(result,itm.getRoleId()) && itm.getSalesOrg().equalsIgnoreCase(""+user.getSalesOrg()+"")){
				result.add(itm);
			}
		}
		return result;
		
	}
	
	private boolean isAlreadyExist(ArrayList<SiteDtls> itms,String role){
		for(SiteDtls itm:itms){
			if(itm.getRoleId().equalsIgnoreCase(role)){
				return true;
			}
		}
		return false;
	}
	@RequestMapping(value = "/savePrimaryDepartments.htm", method = RequestMethod.GET)
	@ResponseBody
	public String savePrimaryDepartments(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		String updateStatus = "";
		
		try{
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String toDeleteString=request.getParameter("toDeleteList")!=null?request.getParameter("toDeleteList"):"";
		String toAddString=request.getParameter("toAddList")!=null?request.getParameter("toAddList"):"";
		
		String[] toDeleteList=new String[toDeleteString.split(":").length];
		String[] toAddList=new String[toAddString.split(":").length];
		
		toDeleteList=toDeleteString.split(":");
		toAddList=toAddString.split(":");
		
		if(toAddList.length==1 && toAddList[0].equalsIgnoreCase(""))toAddList = new String[0];
		if(toDeleteList.length==1 && toDeleteList[0].equalsIgnoreCase(""))toDeleteList = new String[0];
		
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		LOGGER.info(toDeleteString+toAddString+CommonUtils.convertObjectTojson(toDeleteList)+"\n"+CommonUtils.convertObjectTojson(toAddList));
		
		updateStatus=UserPreferenceDAOImpl.updateUserPrimaryDepartments(toDeleteList,toAddList,user,LOGGER);
		
		}catch(Exception e){
			e.printStackTrace();
			LOGGER.error("Stack Trace :", e);
		}
			
		if (updateStatus.equalsIgnoreCase(Constants.TRUE)) {
			return Constants.SUCCESS;
		} else {
			return Constants.TECHNICAL_ISSUE;
		}

	}
}
