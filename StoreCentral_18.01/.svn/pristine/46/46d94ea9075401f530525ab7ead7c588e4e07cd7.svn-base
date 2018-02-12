package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.Iterator;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;
import au.com.woolworths.portal.model.ActivityOptions;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.UserAccess;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ZeroMPLReport;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.param.ZeroMPLReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.service.ZeroMPLReportServiceImpl;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/roleMgt")
@Scope("session")
public class RoleManagementController extends BaseController {

	private ModelMap model;
	private UserContext userDetail;
	// private ZeroMPLReportParam paramForPagination;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	ArrayList<ZeroMPLReport> zeroMPLReportList = null;
	private int REC_COUNT = 20;
	private Integer TOTAL_RECORDS;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private ZeroMPLReportServiceImpl zeroMPLReportService;

	@Autowired
	private UserAccessServiceImpl userAccessService;

	@RequestMapping(value = "/userRoleMgt.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("adminRoleManagement");
		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();
		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());

		Map<String, String> salesOrgMap = null;
		Map<String, ArrayList<MenuOptions>> applicationSettingsDetailMap = null;
		Map<String, ArrayList<String>> salesOrgExcludeMap = null;
		ArrayList<RoleProfileDtl> roleList = null;
		ArrayList<String> additionalAccesList = null;

		try {
			// getting all the sales orgs for tab setttings
			salesOrgMap = RoleMgtDAOImpl.getAllSalesOrg();
			// if(salesOrgMap!=null && salesOrgMap.size()>0)
			model.addAttribute(
					"salesOrgMap",
					(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
							: new HashMap<String, String>());

			// getting all the applications settings detail of user sales org
//			applicationSettingsDetailMap = RoleMgtDAOImpl.getRoleMgtDetail();
			// if(applicationSettingsDetailMap!=null &&
			// applicationSettingsDetailMap.size()>0)
			model.addAttribute(
					"applicationSettingsDetailMap",
					(applicationSettingsDetailMap != null && applicationSettingsDetailMap
							.size() > 0) ? applicationSettingsDetailMap
							: new HashMap<String, ArrayList<MenuOptions>>());

			// getting all the sales orgs excluded menu
			salesOrgExcludeMap = RoleMgtDAOImpl.getRoleExcludeDetail();
			// if(salesOrgExcludeMap!=null && salesOrgExcludeMap.size()>0)
			model.addAttribute(
					"salesOrgExcludeMap",
					(salesOrgExcludeMap != null && salesOrgExcludeMap.size() > 0) ? salesOrgExcludeMap
							: new HashMap<String, ArrayList<String>>());

			// getting all the sales orgs excluded menu
			roleList = RoleMgtDAOImpl.getRoleList();
			// if(salesOrgExcludeMap!=null && salesOrgExcludeMap.size()>0)
			model.addAttribute("roleList",
					(roleList != null && roleList.size() > 0) ? roleList
							: new ArrayList<String>());
			model.addAttribute(
					"additionalAccess",
					(additionalAccesList != null && additionalAccesList.size() > 0) ? additionalAccesList
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
		String roleId = request.getParameter("roleId");
		String salesOrg = request.getParameter("salesOrg");
		//System.out.println("saveApllicationSettings");
		String updateStatus = "";
		UserPreferencesParam param = new UserPreferencesParam();
		// Map<String, UserPreferences> defaultPreferenceMap = null;
		// Map<String, UserPreferences> userPreferenceMap = null;
		param.setSiteNo(userDetail.getSiteNo());
		param.setOption("preferences");
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		// param.setUserPreferencesSize(userPreferencesSize);
		// HttpSession session = request.getSession(false);

		if (selectedApllicationSettings != null
				&& selectedApllicationSettings.length > 0
				&& selectedApllicationSettings[0] != ""
				&& selectedApllicationSettings[0].split(":")[0] != "")
			updateStatus = RoleMgtDAOImpl.updateRolePrflSettings(roleId,
					selectedApllicationSettings, salesOrg);

		if (updateStatus.equalsIgnoreCase("true")) {
			setUserAccessFunction(request);
			return "success";
		} else {
			return updateStatus;
		}

	}

	private void setUserAccessFunction(HttpServletRequest request) {

		HttpSession session = request.getSession(false);
		UserContext userContext = (UserContext) session.getAttribute("user");

		Map<String, ArrayList<ActivityOptions>> userAccessMap = null;
		Map<String, ArrayList<ActivityOptions>> userAccessRemovedMap = null;
		StringBuffer articleStr = null;
		ObjectMapper mapper = new ObjectMapper();
		StringWriter stw = new StringWriter();

		try {
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			userAccessMap = userAccessService.getUserFunctionacces(userContext,
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
				userContext.setFunctionCodeList(articleStr.toString());
			}

			userAccessRemovedMap = userAccessService.getUserFunctionacces(
					userContext, false);
			if (userAccessRemovedMap != null && userAccessRemovedMap.size() > 0) {
				userAccessMap.putAll(userAccessRemovedMap);
			}
			mapper.writeValue(jsonGenerator, userAccessMap);

		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}

		//System.out.println("stw.toString() -__" + stw.toString());
		userContext.setUserAccess("{\"data\":" + stw.toString() + "}");
		session.removeAttribute("user");
		session.setAttribute("user", userContext);

	}

	

}
