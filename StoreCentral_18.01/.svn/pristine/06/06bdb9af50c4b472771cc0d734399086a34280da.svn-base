package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.BroadcastMessage;
import au.com.woolworths.portal.model.BroadcastMessageModel;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.RegionDetail;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.BroadcastDAOImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.service.UserAccessServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xmtu6
 * 
 */
@Controller
@RequestMapping(value = "*/broadcast")
@Scope("session")
public class BroadcastController extends BaseController {

	@Value("#{properties['broadcastCreate']}")
	private String screenCode;

	@Autowired
	private UserAccessServiceImpl userAccessService;
	@Autowired
	private ArticleServiceImpl articleService;

	@RequestMapping(value = "/create.htm", method = RequestMethod.GET)
	public ModelAndView onPageload(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		UserContext user = (UserContext) request.getSession(false)
				.getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		ModelAndView modelAndView = new ModelAndView("broadcastCreate");
		Map<String, String> salesOrgList = RoleMgtDAOImpl.getAllSalesOrg();
		modelAndView.addObject("salesOrgList", salesOrgList);
		return modelAndView;
	}

	@RequestMapping(value = "/getMessage.htm", method = RequestMethod.GET)
	@ResponseBody
	public String homepage(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "{\"typ\":\"F\",\"msg\":\"Failed\"}";
		}
		ArrayList<BroadcastMessage> broadMessage = userAccessService
				.getBroadcastMessages(((UserContext) request.getSession()
						.getAttribute("user")));
		return CommonUtils.convertObjectTojson(broadMessage);
	}

	@RequestMapping(value = "/loadDeptAndRole.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getDeptAndRoles(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "{\"typ\":\"F\",\"msg\":\"Failed\"}";
		}

		String salesOrg = request.getParameter("salesOrg");
		ArrayList<RoleProfileDtl> roleList = RoleMgtDAOImpl
				.getRoleListBySalesOrg(salesOrg);
		String prod_no = "ALL DEPARTMENTS";
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		ArrayList<Department> categoryInfoList = (ArrayList<Department>) articleService
				.getDeptDetail(prod_no,
						salesOrg != null ? Integer.parseInt(salesOrg) : null,user);
		ArrayList<RegionDetail> regionList = RoleMgtDAOImpl
				.getAllRegions(salesOrg);

		return "{\"typ\":\"S\",\"msg\":\"success\",\"deptList\":"
				+ CommonUtils.convertObjectTojson(categoryInfoList)
				+ ",\"regionList\":"
				+ CommonUtils.convertObjectTojson(regionList)
				+ ",\"rolesList\":" + CommonUtils.convertObjectTojson(roleList)
				+ "}";
	}

	@RequestMapping(value = "/sendAcknowledge.htm", method = RequestMethod.POST)
	@ResponseBody
	public String sendAck(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "{\"typ\":\"F\",\"msg\":\"Failed\"}";
		}
		String userId = request.getParameter("user_id");
		String broadcastId = request.getParameter("bc_id");
		boolean flag = userAccessService.updateAcknowledgement(userId,
				broadcastId);
		if (flag) {
			return "{\"typ\":\"S\",\"msg\":\"Success\"}";
		} else {
			return "{\"typ\":\"F\",\"msg\":\"Failed\"}";
		}
	}

	@RequestMapping(value = "/verifyStore.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		ArrayList<Store> storeList = null;
		String siteNo = request.getParameter("storeId");
		String salesOrg = request.getParameter("salesOrg");
		String msg = "";

		try {
			storeList = (ArrayList<Store>) LoginServiceImpl.getSitesListNew(
					siteNo, salesOrg);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (storeList != null && storeList.size() > 0) {
			if (storeList.size() == 1
					&& storeList.get(0).getError() != null
					&& storeList.get(0).getError()
							.equalsIgnoreCase(Constants.ERROR_MSG)) {
				msg = "no_sales_org_map";
			} else {
				msg = "true";
			}
		} else {
			msg = "false";
		}
		return convertStoreListTojson1(storeList, msg);
	}

	@RequestMapping(value = "/districtStores.htm", method = RequestMethod.GET)
	@ResponseBody
	public String districtStores(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		ArrayList<Store> storeList = null;
		String region = request.getParameter("region");
		String salesorg = request.getParameter("salesOrg");

		String msg = "";

		try {
			storeList = (ArrayList<Store>) LoginServiceImpl
					.getSitesListFromRegion(region, salesorg);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (storeList != null && storeList.size() > 0) {
			if (storeList.size() == 1
					&& storeList.get(0).getError() != null
					&& storeList.get(0).getError()
							.equalsIgnoreCase(Constants.ERROR_MSG)) {
				msg = "no_sales_org_map";
			} else {
				msg = "true";
			}
		} else {
			msg = "false";
		}
		return convertStoreListTojson1(storeList, msg);
	}

	@RequestMapping(value = "/getMessageDetail.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getMessageDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "sessionout";
		}
		BroadcastMessageModel result = new BroadcastMessageModel();
		try {
			result = BroadcastDAOImpl.getBrodcastMessageDetail(request
					.getParameter("message_id"));
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		}
		return CommonUtils.convertObjectTojson(result);
	}

	@RequestMapping(value = "/getAllMessages.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getAllMessages(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "sessionout";
		}
		ArrayList<BroadcastMessageModel> result = new ArrayList<BroadcastMessageModel>();
		try {
			result = BroadcastDAOImpl.getBrodcastMessage();
		} catch (Exception e) {
			e.printStackTrace();
			return "failed";
		}
		return CommonUtils.convertObjectTojson(result);
	}

	private String convertStoreListTojson1(ArrayList<Store> storeList,
			String msg) {

		return "{\"data\":" + Constants.convertToJsonString(storeList)
				+ ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/createBroadcast.htm", method = RequestMethod.POST)
	@ResponseBody
	public String createBroadcast(
			@ModelAttribute("data") BroadcastMessageModel param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			param.setMsg("Session time out.");
			return CommonUtils.convertObjectTojson(param);
		}
		try {
			if (null != param.getDepartmentListStr()) {
				param.setDepartmentList(new ArrayList<String>());
				param.getDepartmentList().addAll(
						Arrays.asList(param.getDepartmentListStr().split(",")));
			}
			if (null != param.getSiteListStr()) {
				param.setSiteList(new ArrayList<String>());
				param.getSiteList().addAll(
						Arrays.asList(param.getSiteListStr().split(",")));
			}
			if (null != param.getRolesListStr()) {
				param.setRolesList(new ArrayList<String>());
				param.getRolesList().addAll(
						Arrays.asList(param.getRolesListStr().split(",")));
			}

			param.setUserid(((UserContext) request.getSession(false)
					.getAttribute("user")).getUserId());
			BroadcastDAOImpl.createBroadcast(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return CommonUtils.convertObjectTojson(param);
	}

	@RequestMapping(value = "/updateBroadcast.htm", method = RequestMethod.POST)
	@ResponseBody
	public String updateBroadcast(
			@ModelAttribute("data") BroadcastMessageModel param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			param.setMsg("Session time out.");
			return CommonUtils.convertObjectTojson(param);
		}
		try {
			if (null != param.getDepartmentListStr()) {
				param.setDepartmentList(new ArrayList<String>());
				param.getDepartmentList().addAll(
						Arrays.asList(param.getDepartmentListStr().split(",")));
			}
			if (null != param.getSiteListStr()) {
				param.setSiteList(new ArrayList<String>());
				param.getSiteList().addAll(
						Arrays.asList(param.getSiteListStr().split(",")));
			}
			if (null != param.getRolesListStr()) {
				param.setRolesList(new ArrayList<String>());
				param.getRolesList().addAll(
						Arrays.asList(param.getRolesListStr().split(",")));
			}

			param.setUserid(((UserContext) request.getSession(false)
					.getAttribute("user")).getUserId());
			BroadcastDAOImpl.updateBroadcast(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return CommonUtils.convertObjectTojson(param);
	}

	@RequestMapping(value = "/deactivate.htm", method = RequestMethod.POST)
	@ResponseBody
	public String deactivate(
			@ModelAttribute("data") BroadcastMessageModel param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			param.setMsg("Session time out.");
			return CommonUtils.convertObjectTojson(param);
		}
		try {
			param.setUserid(((UserContext) request.getSession(false)
					.getAttribute("user")).getUserId());
			if (BroadcastDAOImpl.deactivate(param)) {
				param.setMsg("success");
				param.setTyp("S");
			} else {
				param.setMsg("failed");
				param.setTyp("F");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg("failed");
			param.setTyp("F");
		}
		return CommonUtils.convertObjectTojson(param);
	}

	@RequestMapping(value = "/delete.htm", method = RequestMethod.POST)
	@ResponseBody
	public String delete(@ModelAttribute("data") BroadcastMessageModel param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			param.setMsg("Session time out.");
			return CommonUtils.convertObjectTojson(param);
		}
		try {
			param.setUserid(((UserContext) request.getSession(false)
					.getAttribute("user")).getUserId());
			if (BroadcastDAOImpl.delete(param)) {
				param.setMsg("success");
				param.setTyp("S");
			} else {
				param.setMsg("failed");
				param.setTyp("F");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg("failed");
			param.setTyp("F");
		}
		return CommonUtils.convertObjectTojson(param);
	}

}
