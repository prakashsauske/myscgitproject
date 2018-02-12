package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.ngbo.identity.AdditionalRole;
import au.com.woolworths.ngbo.identity.NGBOServices;
import au.com.woolworths.ngbo.identity.SecondaryRole;
import au.com.woolworths.ngbo.identity.SpecialRole;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.MenuOptions;
import au.com.woolworths.portal.model.RoleProfileDtl;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserInfoModel;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.UserManagementParam;
import au.com.woolworths.portal.param.UserPreferencesParam;
import au.com.woolworths.portal.param.UsrInfoParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.ITAdminMgmtDAOImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.PassWordMgtDAOImpl;
import au.com.woolworths.portal.service.RoleMgtDAOImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/itAdmin")
@Scope("session")
public class ITAdminManagementController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['UserManagement']}")
	private String screenCode;

	@Autowired
	private OrderServiceImpl orderService;
	
	/* XPSNV - Query Commented / Modified for Security Requirment Change - Begin */
	@Autowired
	private LoginServiceImpl loginService;
	/* XPSNV - Query Commented / Modified for Security Requirment Change - End */
	

	private static final Logger LOGGER = Logger
			.getLogger(ITAdminManagementController.class.getName());
	
	private ModelMap model;
	private UserContext userDetail;
	private NGBOServices timService;
	private boolean timOffline;
	// private ZeroMPLReportParam paramForPagination;
	// private String EXCEPTION =
	// "Technical issue occurred. Please contact technical support.";

	Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap = null;

	@Autowired
	private ArticleServiceImpl articleService;

	@RequestMapping(value = "/itAdminUserMgt.htm", method = RequestMethod.GET)
	public ModelAndView storeManagerUserMgt(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("itAdminManagement");

		UserPreferencesParam param = new UserPreferencesParam();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();
		
		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		System.out.println("New role :"+userDetail.getRoleID());
		ArrayList<RoleProfileDtl> roleList = null;
		if(Constants.isStoreManagers(userDetail.getRoleID())){
			model.addAttribute("isStoreManager","Y");
		}else if(Constants.isStockTakeManager(userDetail.getRoleID())){
			model.addAttribute("isStockTakeManager","Y");
		}else if(Constants.isSalesOrgManager(userDetail.getRoleID())){
			model.addAttribute("isSalesOrgManager","Y");
		}else if(Constants.isAdminUser(userDetail.getRoleID())){
			model.addAttribute("isItAdmin","Y");		
		}/*else{
			return new ModelAndView("noAccess");
		}*/
		
		/*//Access restriced for specified user roles
		if(!(userDetail.getRoleID().equalsIgnoreCase(Constants.IT_USER_ADMIN)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.ADMIN) 
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.SAlESORG_MANAGER) 
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.STOCKTAKE_MANAGER) 
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.STORE_MANAGER)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.AREA_MANAGER)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.IT_SUPPORT_ONE)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.IT_SUPPORT_TWO)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.BUSINESS_REVIEW) 
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.REPORTING_ROLE)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.STOCKtAKE_TEAMMEMBER)
				|| userDetail.getRoleID().equalsIgnoreCase(Constants.READONLY_USER))){
			return new ModelAndView("noAccess");
		}*/
		
		
		try {
			
			//userSiteDtlMap = ITAdminMgmtDAOImpl.getUserSiteDtls(param);
			userSiteDtlMap = null;

			model.addAttribute(
					"recordCnt",
					(userSiteDtlMap != null && userSiteDtlMap.size() > 0) ? userSiteDtlMap
							.size() : "0");

			model.addAttribute(
					"userSiteDtlList",
					(userSiteDtlMap != null && userSiteDtlMap.size() > 0) ? userSiteDtlMap
							: new ArrayList<UserSiteDtl>());
			
			roleList = RoleMgtDAOImpl.getRoleList(userDetail.getRoleID());
			
			// if(salesOrgExcludeMap!=null && salesOrgExcludeMap.size()>0)
			model.addAttribute("roleList",convertListTojson(roleList));

			/*
			 * Map<String, String> salesOrgMap = null;
			 * 
			 * 
			 * // getting all the sales orgs for tab setttings salesOrgMap =
			 * ApplicationSettingDAOImpl.getAllSalesOrg(); //
			 * if(salesOrgMap!=null && salesOrgMap.size()>0)
			 * model.addAttribute("salesOrgMap", (salesOrgMap != null &&
			 * salesOrgMap .size() > 0) ? salesOrgMap : new HashMap<String,
			 * String>());
			 */

			Map<String, String> salesOrgMap = null,salesOrgMapForEdit=null;

			// getting all the sales orgs for tab setttings
			salesOrgMap = ITAdminMgmtDAOImpl.getAllSalesOrg(""+userDetail.getSalesOrg());
			salesOrgMapForEdit = ITAdminMgmtDAOImpl.getAllSalesAllOrg();
			// if(salesOrgMap!=null && salesOrgMap.size()>0)
			model.addAttribute(
					"salesOrgMap",
					(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
							: new HashMap<String, String>());
			model.addAttribute(
					"salesOrgMapForEdit",
					(salesOrgMapForEdit != null && salesOrgMapForEdit.size() > 0) ? salesOrgMapForEdit
							: new HashMap<String, String>());

			List<Department> deptInfoList = new ArrayList<Department>();
			try {

				String parent_node_no = "ALL DEPARTMENTS";
				deptInfoList = (ArrayList<Department>) articleService
						.getDeptDetails(parent_node_no, ((UserContext) request
								.getSession().getAttribute("user"))
								.getSalesOrg(),userDetail);
				model.addAttribute("deptInfoList", deptInfoList);

			} catch (Exception e) {
				model.addAttribute("deptInfoList", new ArrayList<Department>());
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		try{
			timService=new NGBOServices();
			timOffline=false;
			LOGGER.info("tim offline value : -- " + timOffline);
		}catch(Exception e){
			LOGGER.error((Constants.EXCEPTION + e),e);
			timOffline=false;
			LOGGER.info("tim offline value : -- " + timOffline);
			model.addAttribute("timException",e.getMessage());
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	
	@RequestMapping(value = "/serarchUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String serarchUser(
			@ModelAttribute("viewQuery") UserPreferencesParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap = null;
		ArrayList<ArrayList<UserSiteDtl>> list=null;
		System.out.println("===="+userDetail.getSiteNo()+userDetail.getRoleID());
		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setRoleId(userDetail.getRoleID());
		param.setSaleOrg(""+userDetail.getSalesOrg()+"");
		
		String msg = "";
		
		try {
			userSiteDtlMap = ITAdminMgmtDAOImpl.getUserSiteDtls(param);
			list =updateUserSiteDtlMap(userSiteDtlMap);
		}
		catch(Exception e){
			LOGGER.error(Constants.EXCEPTION ,e);
		}
		if (list != null && list.size() > 0)
			msg = "true";
		else
			msg = "false";
		return convertUserSiteDtlListTempTojson(list, msg);

	}
	
	private ArrayList<ArrayList<UserSiteDtl>> updateUserSiteDtlMap(Map<String, ArrayList<UserSiteDtl>>  userSiteDtlMap){
		ArrayList<ArrayList<UserSiteDtl>> res=new ArrayList<ArrayList<UserSiteDtl>>();
		List<Department> deptInfoList = new ArrayList<Department>();
		List<UserSiteDtl> userSiteList=null;
		Iterator it = userSiteDtlMap.entrySet().iterator();
	    while (it.hasNext()) {
	        Map.Entry pairs = (Map.Entry)it.next();
	        userSiteList=(List<UserSiteDtl>) pairs.getValue();
	        if(userSiteList!=null && userSiteList.size()>0){
	        	res.add((ArrayList<UserSiteDtl>) userSiteList);
	        }
	       it.remove(); // avoids a ConcurrentModificationException
	    }
	    return res;
		
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
		param.setSiteNo(userDetail.getSiteNo());
		param.setSubmitBy(request.getParameter("userId"));
		param.setMsg(userDetail.getUserId());
		param.setSalesOrg(""+userDetail.getSalesOrg()+"");
		param.setRole(userDetail.getRoleID());
		String msg = "";

		try {
			userSiteDtlMap = ITAdminMgmtDAOImpl.verifyUser(param);
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
			Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap2, String msg) {
		// TODO Auto-generated method stub
		return "{\"data\":" +  Constants.convertToJsonString(userSiteDtlMap2) + ",\"msg\":\"" + msg + "\"}";
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
		// param.setSiteNo(userDetail.getSiteNo());
		String siteNo = request.getParameter("storeId");
		String salesOrg = request.getParameter("salesOrg");
		// param.setMsg(userDetail.getUserId());
		String msg = "";

		try {
			storeList = (ArrayList<Store>) LoginServiceImpl.getSitesListNew(siteNo, salesOrg);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (storeList != null && storeList.size() > 0){
			if(storeList.size()==1 && storeList.get(0).getError()!=null && storeList.get(0).getError().equalsIgnoreCase(Constants.ERROR_MSG)){
				msg="no_sales_org_map";
			}else{
				msg = "true";
			}
		}else{
			msg = "false";
		}
		return convertStoreListTojson(storeList, msg);

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
	

		try {
			if(param.getStoreList()!=null && !param.getStoreList().split(",")[0].equals(""))
			{
				param.setSiteNo(param.getStoreList().split(",")[0]);
				String spStr=param.getDeptList();
				String[] dep=new String[spStr.split(":").length-1];
				for(int i=1;i<spStr.split(":").length;i++){
					dep[i-1]=spStr.split(":")[i];
				}
				param.setDept(dep);
				if(ITAdminMgmtDAOImpl.isDepartmentMandatory(userDetail.getUserId(),param)){
					return Constants.PRIMARY_DEPT_MADATORY;
				}
				if(param.getRoleId() == null || param.getRoleId().trim() == "" )
				{
					return Constants.USER_ROLE_MADATORY;
				}
				
				if(updateUser(param, result, request, response).equals("false")){		
					status = ITAdminMgmtDAOImpl
						.creatUser(param, userDetail.getUserId());
				}else{
					status=true;
				}
			}
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
		try {
		System.out.println("Input Param"+CommonUtils.convertObjectTojson(param));
		LOGGER.info("Input Param"+CommonUtils.convertObjectTojson(param));
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String[] storeList=null;
		if(param.getIsUpdate()!=null && param.getIsUpdate().equalsIgnoreCase("false")){
			storeList=new String[param.getStoreList().split(",").length];
			storeList=param.getStoreList().split(",");
		}
		
		
		String spStr=param.getDeptList();
		String[] dep=new String[spStr.split(":").length-1];
		for(int i=1;i<spStr.split(":").length;i++){
			dep[i-1]=spStr.split(":")[i];
		}
		param.setDept(dep);
		boolean status = false;		
		
		boolean isPrimaryRole=ITAdminMgmtDAOImpl.isDepartmentMandatory(param.getUserId().split("-")[0].trim(),param);
		if(isPrimaryRole && (param.getDept()==null || param.getDept().length==0 )){			
				return Constants.PRIMARY_DEPT_MADATORY;
		}
		
		if((!isPrimaryRole && (param.getDateTo()==null || param.getDateTo().trim().equalsIgnoreCase("")))||(storeList!=null && storeList.length>1 && (param.getDateTo()==null || param.getDateTo().trim().equalsIgnoreCase("")))){
			if(Constants.isAdminUser(param.getRoleId())){
				return Constants.AC_ADM_DATE_MADATORY;
			}else{
				return Constants.AC_DATE_MADATORY;
			}
			
		}
		
		if(param.getRoleId() == null || param.getRoleId().trim() == "" )
		{
			return Constants.USER_ROLE_MADATORY;
		}
		
		if(param.getDateTo()==null || param.getDateTo().trim().equalsIgnoreCase("")){
			param.setDateTo(Constants.DEFAULT_END_DATE);
		}
		
		boolean isAdminRoleActivelyExist=false,isStoreRoleActivelyExist=false;
		
		ArrayList<UserInfoModel> exitingInfo=ITAdminMgmtDAOImpl.getAdminRoleFromSc(param.getUserId(), param.getRoleId(), param.getSiteNo());
		for(UserInfoModel itm:exitingInfo){
			if(itm.isAdminRoleActive()) isAdminRoleActivelyExist=true;
			if(itm.isStoreRoleActive()) isStoreRoleActivelyExist=true;
		}
		
		if(Constants.isAdminUser(param.getRoleId())&& isStoreRoleActivelyExist){
			return Constants.SC_ROLE_ALREADY_EXIST;
		}else if(!Constants.isAdminUser(param.getRoleId()) && isAdminRoleActivelyExist){
			return Constants.ADMIN_ROLE_ALREADY_EXIST;
		}
		if(storeList!=null && storeList.length>0){
			for(String str:storeList){
				param.setSiteNo(str);
				param.setIsDefaultFlag(ITAdminMgmtDAOImpl.getIsDefaultRoleActive(param));
				LOGGER.info("Sec Store : "+str);
				status = ITAdminMgmtDAOImpl.updateUser(param,
						userDetail.getUserId(),timOffline,timService);
				timServiceCallforDeactivateDefault(param);
			}
		}else{
			param.setIsDefaultFlag(ITAdminMgmtDAOImpl.getIsDefaultRoleActive(param));
			status = ITAdminMgmtDAOImpl.updateUser(param,
					userDetail.getUserId(),timOffline,timService);
			timServiceCallforDeactivateDefault(param);
		}
//		timServiceCallforDeactivateDefault(param,request,response);
		
		LOGGER.info("Update user SC status :"+status);
		if (status){
			LOGGER.info("Update user SC status success:"+status);
			return "true";
		}else{
			if(param.getMsg()!=null && !param.getMsg().equalsIgnoreCase("")){
				LOGGER.info("Update user SC status failed:"+param.getMsg());
				return param.getMsg();
			}
			LOGGER.info("Update user SC status failed.");
			return "false";
		}
			
		} catch (Exception e) {
			LOGGER.error("Update user SC status failed."+e);
			e.printStackTrace();
			return "false";
		}

	}

	@RequestMapping(value = "/deActivateUser.htm", method = RequestMethod.GET)
	@ResponseBody
	public String deActivateUser(
			@ModelAttribute("viewQuery") UserManagementParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response ) throws Exception {
		int dvalue=0;
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		boolean status = false;
		//param.setSiteNo(request.getParameter("siteId"));
		System.out.println("deActivateUser"+CommonUtils.convertObjectTojson(param));
		
		if(timOffline){
			try {			
				status = ITAdminMgmtDAOImpl.deActivateUser(param);
				deActivateAdditionalRole( param, request, response);
				} catch (Exception e) {
				e.printStackTrace();
			}
		}else{
			try{
				
				
				if(Constants.isAdminUser(param.getRoleId())){
					SpecialRole specialRole= new SpecialRole();
					specialRole.setRoleCode(param.getRoleId());
					specialRole.setSalesOrgNo(param.getSaleOrg().trim());
					specialRole.setValidFrom(Constants.toDate(param.getDateFrom()));
					specialRole.setValidTill(Constants.toDate(param.getDateTo()));
					SpecialRole specialRole1= new SpecialRole();
					specialRole1.setRoleCode(param.getRoleId());
					specialRole1.setSalesOrgNo(param.getSaleOrg().trim());
					specialRole1.setValidFrom(Constants.toDate(param.getDateFrom()));
					specialRole1.setValidTill(Constants.getYesterday());
					LOGGER.info("Object data:"+param.getUserId().split("-")[0].trim()+"---"+param.getRoleId()+"---"
							+param.getSaleOrg()+"---"
							+param.getDateFrom()+"---"
							+param.getDateTo());
					LOGGER.info(" ------- modifySpecialUserRole ------");
					LOGGER.info("param.getUserId() =====" + param.getUserId().split("-")[0]);
					LOGGER.info("  specialRole.getRoleCode() "+ specialRole.getRoleCode());
					LOGGER.info("  specialRole.getRoleCode() "+ specialRole.getSalesOrgNo());
					LOGGER.info("  specialRole.getRoleCode() "+ specialRole.getValidFrom());
					LOGGER.info("  specialRole.getRoleCode() "+ specialRole.getValidTill());

					LOGGER.info("  specialRole1.getRoleCode() "+ specialRole1.getRoleCode());
					LOGGER.info("  specialRole1.getRoleCode() "+ specialRole1.getSalesOrgNo());
					LOGGER.info("  specialRole1.getRoleCode() "+ specialRole1.getValidFrom());
					LOGGER.info("  specialRole1.getRoleCode() "+ specialRole1.getValidTill());
					
					param.setSiteNo(null);
					dvalue=timServiceCallUpdate( param, request, response);
					//---TIM OFFLINE CHANGES
					ITAdminMgmtDAOImpl.deActivateUser(param);
					timService.modifySpecialUserRole(userDetail.getUserId(), param.getUserId().split("-")[0].trim(), specialRole, specialRole1);
					ITAdminMgmtDAOImpl.updateApdditionlRoles(LOGGER,timService, param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateFrom(), Constants.getYesterday(), param.getDateFrom(), param.getDateTo(),userDetail.getUserId());
					status = true;
				}else{
					LOGGER.info(CommonUtils.convertObjectTojson(param));
					SecondaryRole toRemoveRole=new SecondaryRole();				
					SecondaryRole toAddRole=new SecondaryRole();
					toRemoveRole.setStoreID(param.getSiteNo());
					toRemoveRole.setRoleCode(param.getRoleId());
					toRemoveRole.setSalesOrgNo(param.getSaleOrg().trim());
					toRemoveRole.setValidFrom(Constants.toDate(param.getDateFrom()));
					toRemoveRole.setValidTill(Constants.toDate(param.getDateTo()));
					toAddRole.setStoreID(param.getSiteNo());
					toAddRole.setSalesOrgNo(param.getSaleOrg().trim());
					toAddRole.setRoleCode(param.getRoleId());
					toAddRole.setValidFrom(Constants.toDate(param.getDateFrom()));
					toAddRole.setValidTill(Constants.getYesterday());
					LOGGER.info(" ------- modifySecondaryRole ------");
					LOGGER.info("param.getUserId() =====" + param.getUserId().split("-")[0]);
					LOGGER.info("  Old Role: "+ toRemoveRole.getRoleCode());
					LOGGER.info("  Old Sales Org "+ toRemoveRole.getSalesOrgNo());
					LOGGER.info("  Old Valid From "+ toRemoveRole.getValidFrom());
					LOGGER.info("  Old Valid Till "+ toRemoveRole.getValidTill());
					LOGGER.info("  Old Store ID "+ toRemoveRole.getStoreID());
					LOGGER.info("  New Role: "+ toAddRole.getRoleCode());
					LOGGER.info("  New Sales Org "+ toAddRole.getSalesOrgNo());
					LOGGER.info("  New Valid From "+ toAddRole.getValidFrom());
					LOGGER.info("  New Valid Till "+ toAddRole.getValidTill());
					LOGGER.info("  New Store ID "+ toAddRole.getStoreID());
					dvalue=timServiceCallUpdate( param, request, response);
					//---TIM OFFLINE CHANGES
					ITAdminMgmtDAOImpl.deActivateUser(param);
					timService.modifySecondaryRole(userDetail.getUserId(),param.getUserId().split("-")[0].trim(), toRemoveRole, toAddRole);
					ITAdminMgmtDAOImpl.updateApdditionlRoles(LOGGER,timService, param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateFrom(), Constants.getYesterday(), param.getDateFrom(), param.getDateTo(),userDetail.getUserId());
					status = true;
				
				}
			}catch(Exception e){
				LOGGER.error((Constants.EXCEPTION + e.getLocalizedMessage()+CommonUtils.convertObjectTojson(e)),e);
				return Constants.getTimerror(e.getMessage().split(":")[0]);			
			}
		}
		//System.out.println(status);
		if (status && dvalue==1)
			{return "true+true";
			}
		else if(status && dvalue!=1) 
			{return "true";
			}
			
		else
			{return "false";
			}
	}
	
	@RequestMapping(value = "/checkIfAdditionalRolesExist.htm", method = RequestMethod.GET)
	@ResponseBody
	public String checkIfAdditionalRolesExist(
			@ModelAttribute("viewQuery") UserManagementParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response ) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		try{
			ArrayList<String> additonalRolesList=ITAdminMgmtDAOImpl.getAllAdditionalRoles(param.getUserId().split("-")[0].trim(), param.getSiteNo(), param.getDateTo());
			return CommonUtils.convertObjectTojson(additonalRolesList);
		}catch(Exception e){
			e.printStackTrace();
			LOGGER.error(e);
		}
		return "{}";
	}

	@RequestMapping(value = "/resetPwd.htm", method = RequestMethod.GET)
	@ResponseBody
	public String resetPwd(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		boolean timoffline=false;
		String type="";
		String status = "";
		String newPwd = (String) request.getParameter("newPwd").toLowerCase();//To avoid CAPS pwd being set 
		String userId = (String) request.getParameter("userNo").toLowerCase();
		int resetSeq=LoginServiceImpl.getResetSeq(userId);
		newPwd=userId+Constants.RESET_PREFIX+resetSeq; // changed as per discussion with PALANI and GURU
		String curPwd = null ;
		/*String curPwd = ((UserContext) request.getSession()
				.getAttribute("user")).getPassword();*/
		
		UserContext user = null;
		user = LoginServiceImpl.getUserContext(userId);
		curPwd = user.getPassword();
		
		ArrayList<String> prevPasswords = PassWordMgtDAOImpl
				.getPrevPasswords(userId);
		
		ArrayList<UsrInfoParam> paramList = new ArrayList<UsrInfoParam>();
		paramList.add(new UsrInfoParam(userId.toLowerCase(),newPwd));
		//paramList.add(new UsrInfoParam(userId,curPwd));
		paramList = loginService.getEncryptPassword(paramList,userDetail);
		
		UsrInfoParam userObj = new UsrInfoParam();
		userObj.setEncPassword(curPwd);
		
		paramList.add(userObj);
		// check if the new reset pwd is already present in the history table
		//include the current pwd also in comparision 
		prevPasswords.add(paramList.get(1).getEncPassword());
		
		//fix for infinite while loop
		ArrayList<UsrInfoParam> userParamlist = new ArrayList<UsrInfoParam>();
		String reset1Pwd = userId+Constants.RESET_PREFIX+1;
		String reset2Pwd = userId+Constants.RESET_PREFIX+2;
		String reset3Pwd = userId+Constants.RESET_PREFIX+3;
		String reset4Pwd = userId+Constants.RESET_PREFIX+4;
		String reset5Pwd = userId+Constants.RESET_PREFIX+5;
		
		userParamlist.add(new UsrInfoParam(userId,reset1Pwd));
		userParamlist.add(new UsrInfoParam(userId,reset2Pwd));
		userParamlist.add(new UsrInfoParam(userId,reset3Pwd));
		userParamlist.add(new UsrInfoParam(userId,reset4Pwd));
		userParamlist.add(new UsrInfoParam(userId,reset5Pwd));
		
		userParamlist = loginService.getEncryptPassword(userParamlist,userDetail);
		LOGGER.info("constants prefix : "+ userParamlist );

		ArrayList<String> resetPasswordsStringArray = new ArrayList<String>();
		
		for( UsrInfoParam obj : userParamlist)
		{
			resetPasswordsStringArray.add(obj.getEncPassword());
		}
		
		LOGGER.info("paramList.get(0).getEncPassword() before entering while --- >"+paramList.get(0).getEncPassword());
		LOGGER.info("paramList.get(1).getEncPassword() before entering while --- >"+paramList.get(1).getEncPassword());
		try {
			if(!equalLists(prevPasswords,resetPasswordsStringArray))
			{
			while(checkWithLastPassword(prevPasswords,paramList.get(0).getEncPassword()))
			{
				LOGGER.info("Inside while loop in ITADMIN*COntroller" );
				 
				if(resetSeq < Constants.RESET_SEQ_LIMIT)
				{
					// increment by one and update the same in reset seq field
					resetSeq = resetSeq+1;
					newPwd=userId+Constants.RESET_PREFIX+resetSeq;
					
					paramList = new ArrayList<UsrInfoParam>();
					paramList.add(new UsrInfoParam(userId.toLowerCase(),newPwd));
					paramList = loginService.getEncryptPassword(paramList,userDetail);
					UsrInfoParam userObjNew = new UsrInfoParam();
					userObjNew.setEncPassword(curPwd);//added for defect 6242
					paramList.add(userObjNew);
				}
				else if(resetSeq == Constants.RESET_SEQ_LIMIT)
				{
					
					// increment by one and update the same in reset seq field
					resetSeq = 1;
					newPwd=userId.toLowerCase()+Constants.RESET_PREFIX+resetSeq;
					
					paramList = new ArrayList<UsrInfoParam>();
					paramList.add(new UsrInfoParam(userId.toLowerCase(),newPwd));
					paramList = loginService.getEncryptPassword(paramList,userDetail);
					UsrInfoParam userObjNew = new UsrInfoParam();
					userObjNew.setEncPassword(curPwd);
					paramList.add(userObjNew);
					
				}
			}
		}
			LOGGER.info("paramList.get(0).getEncPassword() after entering while --- >"+paramList.get(0).getEncPassword());
			LOGGER.info("paramList.get(1).getEncPassword() after entering while --- >"+paramList.get(1).getEncPassword());
		} catch (Exception e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		LOGGER.error("Exception occurred while calcuating the reset password");
		}
		// remove the current pwd from list to put entry in history table
		if(prevPasswords.size() > 0)
		{// modified as doubting that array arrangements do not stay the same way as they were addes into it
			for (String str : prevPasswords) {
				if (str.equalsIgnoreCase(curPwd)) {
					prevPasswords.remove(str);
					break;
				}
			}
		}
		
		
		if(timOffline){
			timoffline=true;
			try {		
				// where ever we are updating the pwd in reset irrespective of locked or unlocked locked date is set to null
				status = ITAdminMgmtDAOImpl.updatePwd(userId, paramList.get(0).getEncPassword(),userDetail.getUserId());
				LoginServiceImpl.updateResetSeq(userId, resetSeq);
				//reset incorrect attempts password and secret ques
				loginService.resetIncorrectAttempt(userId);
				//copy the pwd to history table 
				if(!checkWithLastPassword(prevPasswords,paramList.get(1).getEncPassword()))
				{
					LOGGER.info("paramList.get(1).getEncPassword() Value to be updated in history offline  --- >"+paramList.get(1).getEncPassword());
				PassWordMgtDAOImpl.updateNewPassword(userId,paramList.get(1).getEncPassword());
				}
				if(status.trim().equalsIgnoreCase("")){
					type=Constants.SUCCESS;
					status=String.valueOf(resetSeq);
				}else{
					type=Constants.FALSE;
				}
//				PassWordMgtDAOImpl.updateNewPassword(userId,paramList.get(0).getEncPassword());
			} catch (Exception e) {
				e.printStackTrace();
				LOGGER.error((Constants.EXCEPTION + e),e);
				status = "Password update failed.";
				type=Constants.FALSE;
			}
		}else{
			try{
				LoginServiceImpl.updateResetSeq(userId, resetSeq);
				type=Constants.SUCCESS;
				status=String.valueOf(resetSeq);
				ITAdminMgmtDAOImpl.updatePwd(userId, paramList.get(0).getEncPassword(),userDetail.getUserId()); //changed as per discussion with GURU and PALANI
				//reset incorrect attempts password and secret ques
				loginService.resetIncorrectAttempt(userId);
				//copy the pwd to history table 
				if(!checkWithLastPassword(prevPasswords,paramList.get(1).getEncPassword()))
				{
					LOGGER.info("paramList.get(1).getEncPassword() Value to be updated in history online --- >"+paramList.get(1).getEncPassword());
				PassWordMgtDAOImpl.updateNewPassword(userId,paramList.get(1).getEncPassword());
				}
				//timService.unlockUser(userDetail.getUserId(), userId);
				timService.unlockUserAndChangePassword(userDetail.getUserId(),userId, newPwd,true);
			}catch(Exception e){
				LOGGER.error((Constants.EXCEPTION + e),e);
//				status=Constants.getTimerror(e.getMessage().split(":")[0]);
				status = ITAdminMgmtDAOImpl.updatePwd(userId, paramList.get(0).getEncPassword(),userDetail.getUserId());
				LoginServiceImpl.updateResetSeq(userId, resetSeq);
				status =String.valueOf(resetSeq);// "Password updated in Store DB but not updated in TIM.";// changed for defect no 6920
				type=Constants.SUCCESS;// changed for defect no 6920
				timoffline=true;
			}
		}
		return "{\"msg\":\"" + status + "\",\"typ\":\""
		+type + "\",\"timOffline\":\""
		+timoffline + "\"}";
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
		param.setSiteNo(request.getParameter("storeId"));
		param.setSubmitBy(request.getParameter("userId"));
		// param.setMsg(userDetail.getUserId());
		String msg = "";
		ArrayList<ArrayList<UserSiteDtl>> list=null;
		try {
			userSiteDtlMap = ITAdminMgmtDAOImpl.getUserDtl(param);
			list=updateUserSiteDtlMap(userSiteDtlMap);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (list != null && list.size() > 0)
			msg = "true";
		else
			msg = "false";
		return convertUserSiteDtlListTempTojson(list, msg);

	}

	private String convertUserSiteDtlListTempTojson(
			ArrayList<ArrayList<UserSiteDtl>> userSiteDtlMap, String msg) {

		/*	
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
		*/

		return "{\"data\":" +  Constants.convertToJsonString(userSiteDtlMap) + ",\"msg\":\"" + msg + "\"}";
	}

	private String convertStoreListTojson(ArrayList<Store> storeList, String msg) {

	/*	ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, storeList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" +  Constants.convertToJsonString(storeList) + ",\"msg\":\"" + msg + "\"}";
	}
	
	private String convertListTojson(ArrayList<RoleProfileDtl> roleProfileList) {

		String key = "";
		List<RoleProfileDtl> tempAllocationList = null;
		Map<String, List<RoleProfileDtl>> consolidationMap=null;
		if (roleProfileList != null
				&& roleProfileList.size() > 0) {
			consolidationMap = new LinkedHashMap<String, List<RoleProfileDtl>>();
			for (RoleProfileDtl getDeclList : roleProfileList) {
				key = getDeclList.getSalesOrg();
				if (consolidationMap.containsKey(key)) {
					tempAllocationList = consolidationMap.get(key);
					tempAllocationList.add(getDeclList);
				} else {
					tempAllocationList = new ArrayList<RoleProfileDtl>();
					tempAllocationList.add(getDeclList);
				}
				consolidationMap.put(key, tempAllocationList);
			}
			//param.setMsg("");
		}
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, consolidationMap);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(consolidationMap)+ ",\"msg\":\"" + "" + "\"}";
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
		param.setSiteNo(request.getParameter("userStore"));
		param.setRoleId(request.getParameter("userRole"));
		param.setOption("preferences");
		param.setUserId(request.getParameter("userNo"));
		param.setSaleOrg(request.getParameter("userDtlSalesOrg"));

		Map<String, String> salesOrgMap = null;
		Map<String, ArrayList<MenuOptions>> applicationSettingsDetailMap = null;
		Map<String, ArrayList<String>> salesOrgExcludeMap = null;
		ArrayList<RoleProfileDtl> roleList = null;
		ArrayList<String> additionalAccesList = null;

		salesOrgMap = new HashMap<String, String>();

		salesOrgMap.put(request.getParameter("sOrg"), "Sm");

		try {

			model.addAttribute(
					"salesOrgMap",
					(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
							: new HashMap<String, String>());

			// getting all the applications settings detail of user sales org
			try{
			applicationSettingsDetailMap = RoleMgtDAOImpl.getRoleMgtDetail(userDetail.getRoleID(),userDetail.getSalesOrg(),userDetail.getSiteNo(),param.getRoleId(),param.getSaleOrg(),param.getSiteNo(), userDetail.getUserId(),param.getUserId());
			}catch(Exception e){
				e.printStackTrace();
			}
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

			additionalAccesList = ITAdminMgmtDAOImpl.getUsrFuncExc(
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
			HttpServletResponse response) {
		try{
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		String[] selectedApllicationSettings = request.getParameter(
				"selectedApllicationSettings").split(",");
		String[] selectedAdditionalRoles = request.getParameter(
				"posroles_str").split(",");
		String[] removeAdditionalRoles = request.getParameter(
				"remove_posroles_str").split(",");
		
		String actStartDate=request.getParameter(
				"activeStartDate");
		String actEndDate=request.getParameter(
				"activeEndDate");
		
		String userId = request.getParameter("userId");
		String siteNo=request.getParameter("userStore");
		String updateStatus = "",updateStatusApp = "";

		if (selectedApllicationSettings != null
				&& selectedApllicationSettings.length > 0
				&& selectedApllicationSettings[0] != ""
				&& selectedApllicationSettings[0].split(":")[0] != ""){
			updateStatusApp = ITAdminMgmtDAOImpl.updateUserFuncSettings(userId,
					siteNo,userDetail.getUserId(), selectedApllicationSettings);
		}
		
		LOGGER.info("to remove roles:"+removeAdditionalRoles[0]);
		if (removeAdditionalRoles != null
				&& removeAdditionalRoles.length > 0
				&& removeAdditionalRoles[0] != ""
				&& !removeAdditionalRoles[0].split(":")[1].equalsIgnoreCase("empty")){
			
			if(timOffline){
				return "Technical issue occured,Please contact java support.";
			}else{
				try{
						LOGGER.info("to remove roles:"+removeAdditionalRoles);
					    for(String str:removeAdditionalRoles){
					    	LOGGER.info("selected role str:"+str);
					    	//TODO: Changed on 04-Sep-15
					    	if(siteNo.equalsIgnoreCase("All")||siteNo.equalsIgnoreCase("NONE")) siteNo="";
							AdditionalRole roleTobeRemoved= new AdditionalRole();
							roleTobeRemoved.setTargetSystem("1POS");
							roleTobeRemoved.setRoleCode(str.split(":")[1]);
							roleTobeRemoved.setStoreID(siteNo);
							roleTobeRemoved.setValidFrom(Constants.toDate(actStartDate));
							roleTobeRemoved.setValidTill(Constants.toDate(actEndDate));
							AdditionalRole roleTobeAdded= new AdditionalRole();
							roleTobeAdded.setTargetSystem("1POS");
							roleTobeAdded.setRoleCode(str.split(":")[1]);
							roleTobeAdded.setStoreID(siteNo);
							roleTobeAdded.setValidFrom(Constants.toDate(actStartDate));
							roleTobeAdded.setValidTill(Constants.getYesterday());

							LOGGER.info("Additionalrole to be removed -target system:"+roleTobeRemoved.getTargetSystem());
					    	LOGGER.info("Additionalrole to be removed -role code:"+roleTobeRemoved.getRoleCode());
					    	LOGGER.info("Additionalrole to be removed -store id:"+roleTobeRemoved.getStoreID());
					    	LOGGER.info("Additionalroleto be removed -valid date from:"+roleTobeRemoved.getValidFrom());
					    	LOGGER.info("Additionalrole to be removed -valid date till:"+roleTobeRemoved.getValidTill());
					    	
					    	LOGGER.info("Additionalrole to be added -target system:"+roleTobeAdded.getTargetSystem());
					    	LOGGER.info("Additionalrole to be  added -role code:"+roleTobeAdded.getRoleCode());
					    	LOGGER.info("Additionalrole to be  added -store id:"+roleTobeAdded.getStoreID());
					    	LOGGER.info("Additionalrole to be  added -valid date from::"+roleTobeAdded.getValidFrom());
					    	LOGGER.info("Additionalrole to be removed -valid date till:"+roleTobeAdded.getValidTill());
						    	
					    	//timService.removeAdditionalRole(userDetail.getUserId(),userId,additionalRole);
					    	timService.modifyAdditionalRole(userDetail.getUserId(),userId, roleTobeRemoved, roleTobeAdded);
					    }
				}catch(Exception e){
					LOGGER.error((Constants.EXCEPTION + e),e);
					e.printStackTrace();
					updateStatus=Constants.getTimerror(e.getMessage().split(":")[0]);
				}
			}
		}
		
		if (selectedAdditionalRoles != null
				&& selectedAdditionalRoles.length > 0
				&& selectedAdditionalRoles[0] != ""
				&& !selectedAdditionalRoles[0].split(":")[1].equalsIgnoreCase("empty")){
			
			if(timOffline){
				return "Technical issue occured,Please contact java support.";
			}else{
				try{
						LOGGER.info("selected roles:"+selectedAdditionalRoles);
						//AdditionalRole[] toAddList=new AdditionalRole[selectedAdditionalRoles.length];
						//int index=0;
					    for(String str:selectedAdditionalRoles){
					    	LOGGER.info("selected role str:"+str);
					    	//TODO: Changed on 04-Sep-15
					    	if(siteNo.equalsIgnoreCase("All")||siteNo.equalsIgnoreCase("NONE")) siteNo="";
					    	AdditionalRole additionalRole= new AdditionalRole();
					    	AdditionalRole toRemoveAdditional=RolecheckIfPosRolesExist(userId,siteNo,str.split(":")[1]);
					    	
					    	additionalRole.setTargetSystem("1POS");
							additionalRole.setRoleCode(str.split(":")[1]);
							additionalRole.setStoreID(siteNo);
							additionalRole.setValidFrom(Constants.toDate(actStartDate));
							additionalRole.setValidTill(Constants.toDate(actEndDate));
					    	
					    	if(null!=toRemoveAdditional){
					    		timService.modifyAdditionalRole(userDetail.getUserId(),userId, toRemoveAdditional,additionalRole);
					    	}else{
					    		timService.addAdditionalRole(userDetail.getUserId(),userId,additionalRole);
					    	}
					    	
							
							/*additionalRole.setTargetSystem("1POS");
							additionalRole.setRoleCode(str.split(":")[1]);
							additionalRole.setStoreID(siteNo);
							additionalRole.setValidFrom(Constants.toDate(actStartDate));
							additionalRole.setValidTill(Constants.toDate(actEndDate));
							toAddList[index++]=additionalRole;*/
							
							LOGGER.info("Object data:"+str+"---"+siteNo+"---"
									+actStartDate+"---"
									+actEndDate+"---"
									);
							//timService.addAdditionalRole(userDetail.getUserId(),userId,additionalRole);
					    }
					   // timService.addAdditionalRoles(userDetail.getUserId(),userId, toAddList);
				}catch(Exception e){
					e.printStackTrace();
					LOGGER.error((Constants.EXCEPTION + e),e);
					updateStatus= Constants.getTimerror(e.getMessage().split(":")[0]);					
					
				}
			}
		}
		
		
		
		
		
//		try{
//			String test[]={"1PCO","1PSA"};
//			LOGGER.info("removed  roles:"+test);
//			    for(String str:test){
//			    	LOGGER.info("selected removed role str:"+str);
//				timService.removeAdditionalRole(userDetail.getUserId(), "1pos", siteNo, str);
//			    }
//		}catch(Exception e){
//			LOGGER.error((Constants.EXCEPTION + e));
//			return Constants.getTimerror(e.getMessage().split(":")[0]);
//			
//		}
		if ((updateStatusApp.equalsIgnoreCase(Constants.TRUE) || updateStatusApp.equalsIgnoreCase(""))&& (updateStatus.equalsIgnoreCase(Constants.TRUE) || updateStatus.equalsIgnoreCase(""))) {
			return "success";
		} else if((updateStatusApp.equalsIgnoreCase(Constants.TRUE) || updateStatusApp.equalsIgnoreCase("")) && !(updateStatus.equalsIgnoreCase(Constants.TRUE) || updateStatus.equalsIgnoreCase(Constants.TRUE))){
			return "success:"+updateStatus;
		}else {
			return updateStatus;
		}
		}
		catch(Exception e){
			e.printStackTrace();
			return "Technical issue occured,Please contact java support.";
		}

	}
	private AdditionalRole RolecheckIfPosRolesExist(String user_id,String siteNo, String str) {
		try {
			return ITAdminMgmtDAOImpl.checkIfAdditionalRoleExist(user_id, siteNo, str);
		} catch (SQLException e) {
			// TODO Auto-generated catch block
			return null;
		}
	}

	@RequestMapping(value = "/fetchDept.htm", method = RequestMethod.GET)
	public void fetchDept(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		/* Map<String, String> options = optionDAO.find(selectedValue); */

		List<Department> categoryInfoList = new ArrayList<Department>();

		String prod_no = request.getParameter("iv_parent_node");
		String salesOrg = request.getParameter("salesOrg");
		categoryInfoList = (ArrayList<Department>) loginService
				.getDeptDetails(prod_no, salesOrg!=null? Integer.parseInt(salesOrg):null,userDetail);

		Map<String, List<Department>> categoryDetails = new HashMap<String, List<Department>>();
		categoryDetails.put("categoryInfoList", categoryInfoList);
		String json = new Gson().toJson(categoryDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if (categoryInfoList!=null && categoryInfoList.size() > 0) {
			response.getWriter().write(json);
		} else if (categoryInfoList == null || categoryInfoList.size() <= 0) {
			String s1 = "{\"categoryInfoList\":" + "\"node\": \"" + 0
					+ " \", \"nodeDesc\": \"" + "Select" + "\"}";

			response.getWriter().write(s1);
		}

	}

	private boolean checkWithLastPassword(ArrayList<String> prevPasswords,
			String encPassword) {
		// TODO Auto-generated method stub
		boolean flag = false;
		if(prevPasswords.size() > 0)
		{
		for (String str : prevPasswords) {
			if (str.equalsIgnoreCase(encPassword)) {
				return true;
			}
		}
		}
		return flag;
	}
	


		public int deActivateAdditionalRole( UserManagementParam param,HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		
		int status = 0;
		
		
			try {			
				status = ITAdminMgmtDAOImpl.countAdditionalRole (param);
				if(status > 0)
				{
					ITAdminMgmtDAOImpl.deactiveAdditioanlRoleDAO(param);
				}
			} catch (Exception e) {
				e.printStackTrace();
			}
		return 0;
}
		public int timServiceCallUpdate( UserManagementParam param,HttpServletRequest request,
				HttpServletResponse response) throws Exception {
			
			int count = 0;
				try {			
					count = ITAdminMgmtDAOImpl.countTimServicecall (param);
					if(count ==1 /*&& !Constants.isAdminUser(param.getRoleId())*/)
					{
						ITAdminMgmtDAOImpl.getIfDefaultRoleAlreadyDeactvated(param);
						if(param.getDefaultPrevDate()!=null && !param.getDefaultPrevDate().trim().equalsIgnoreCase(""))
						{
							SecondaryRole addSecondaryRole = new SecondaryRole();
							addSecondaryRole.setStoreID((param.getSiteNo()==null?"":param.getSiteNo()));
							addSecondaryRole.setRoleCode("D");
							addSecondaryRole.setValidFrom(Constants.toDate(Constants.DEFAULT_START_DATE));
							addSecondaryRole.setValidTill(Constants.toDate(Constants.DEFAULT_END_DATE));
							addSecondaryRole.setSalesOrgNo(param.getSaleOrg());
							LOGGER.info("default to be set in sc_role StoreID:"+addSecondaryRole.getStoreID());
							LOGGER.info("default to be set in sc_role ValidFrom:"+addSecondaryRole.getValidFrom());
							LOGGER.info("default to be set in sc_role ValidTill:"+addSecondaryRole.getValidTill());
							LOGGER.info("default to be set in sc_role  default string is set RoleCode:"+addSecondaryRole.getRoleCode());
							LOGGER.info("default to be set in sc_role  Sales org:"+addSecondaryRole.getRoleCode());
							
							SecondaryRole removeSecondaryRole = new SecondaryRole();
							removeSecondaryRole.setStoreID((param.getDefaultStore()==null?"":param.getDefaultStore()));
							removeSecondaryRole.setRoleCode("D");
							removeSecondaryRole.setValidFrom(Constants.toDate(Constants.DEFAULT_START_DATE));
							removeSecondaryRole.setValidTill(Constants.toDate(param.getDefaultPrevDate()));
							removeSecondaryRole.setSalesOrgNo(param.getSaleOrg());
							LOGGER.info("default to be remove in sc_role StoreID:"+removeSecondaryRole.getStoreID());
							LOGGER.info("default to be remove in sc_role ValidFrom:"+removeSecondaryRole.getValidFrom());
							LOGGER.info("default to be remove in sc_role ValidTill:"+removeSecondaryRole.getValidTill());
							LOGGER.info("default to be remove in sc_role  default string is set RoleCode:"+removeSecondaryRole.getRoleCode());
							LOGGER.info("default to be remove in sc_role  Sales org:"+removeSecondaryRole.getRoleCode());
							timService.modifySecondaryRole(userDetail.getUserId(),param.getUserId().split("-")[0].trim(),removeSecondaryRole,addSecondaryRole);	
							
						}else{
							SecondaryRole[] scroleList=new SecondaryRole[1];
							SecondaryRole secondaryRole = new SecondaryRole();
							secondaryRole.setStoreID((param.getSiteNo()==null?"":param.getSiteNo()));
							secondaryRole.setRoleCode("D");
							secondaryRole.setValidFrom(Constants.toDate(Constants.DEFAULT_START_DATE));
							secondaryRole.setValidTill(Constants.toDate(Constants.DEFAULT_END_DATE));
							secondaryRole.setSalesOrgNo(param.getSaleOrg());
							scroleList[0]=secondaryRole;	
							LOGGER.info("default to be set in sc_role StoreID:"+secondaryRole.getStoreID());
							LOGGER.info("default to be set in sc_role ValidFrom:"+secondaryRole.getValidFrom());
							LOGGER.info("default to be set in sc_role ValidTill:"+secondaryRole.getValidTill());
							LOGGER.info("default to be set in sc_role  default string is set RoleCode:"+secondaryRole.getRoleCode());
							LOGGER.info("default to be set in sc_role  Sales org:"+secondaryRole.getRoleCode());
							timService.addSecondaryRoles(userDetail.getUserId(),param.getUserId().split("-")[0].trim(),scroleList);	
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					LOGGER.error(e);
				}
			return count;
	}
		
		public int timServiceCallforDeactivateDefault( UserManagementParam param) throws Exception {
			int count = param.getIsDefaultFlag();
			LOGGER.info("Entering deactivate default role"+CommonUtils.convertObjectTojson(param));
				try {			
					if(param.getIsDefaultFlag()==1 /*&& (null!=param.getDefaultStore()||!param.getDefaultStore().equalsIgnoreCase(""))*/)
					{
						if(param.getDefaultSalesOrg()==null && param.getDefaultStore()==null){
							ITAdminMgmtDAOImpl.getIsDefaultRoleFlagForSpecial(param);
						}else if(param.getDefaultSalesOrg()==null && param.getDefaultStore()!=null){
							ITAdminMgmtDAOImpl.getIsDefaultRoleFlag(param);
						}
						
					LOGGER.info("Entering deactivate default role successfully");
					SecondaryRole secondaryRole = new SecondaryRole();
					secondaryRole.setStoreID((param.getDefaultStore()==null?"":param.getDefaultStore()));
					secondaryRole.setRoleCode("D");
					secondaryRole.setValidFrom(Constants.toDate(Constants.DEFAULT_START_DATE));
					secondaryRole.setValidTill(Constants.toDate(Constants.DEFAULT_END_DATE));
					secondaryRole.setSalesOrgNo(param.getDefaultSalesOrg());
					
					SecondaryRole secondaryRoletoAdd = new SecondaryRole();
					secondaryRoletoAdd.setStoreID(param.getDefaultStore()==null?"":param.getDefaultStore());
					secondaryRoletoAdd.setRoleCode("D");
					secondaryRoletoAdd.setValidFrom(Constants.toDate(Constants.DEFAULT_START_DATE));
					secondaryRoletoAdd.setValidTill(Constants.getYesterday());
					secondaryRoletoAdd.setSalesOrgNo(param.getDefaultSalesOrg());
					
					LOGGER.info("default to be set in sc_role StoreID:"+secondaryRole.getStoreID());
					LOGGER.info("default to be set in sc_role ValidFrom:"+secondaryRole.getValidFrom());
					LOGGER.info("default to be set in sc_role ValidTill:"+secondaryRole.getValidTill());
					LOGGER.info("default to be set in sc_role  default string is set RoleCode:"+secondaryRole.getRoleCode());
					LOGGER.info("default to be set in sc_role  Sales org:"+secondaryRole.getRoleCode());
					
					timService.modifySecondaryRole(userDetail.getUserId(),param.getUserId().split("-")[0].trim(), secondaryRole, secondaryRoletoAdd);
					//timService.removeSecondaryRoles(userDetail.getUserId(),param.getUserId().split("-")[0].trim(), secondaryRoles);
					
					}
				} catch (Exception e) {
					LOGGER.error("Error",e);
					e.printStackTrace();
				}
			return count;
	}
		
		public  boolean equalLists(List<String> one, List<String> two){     
		    if (one == null && two == null){
		        return true;
		    }

		    if((one == null && two != null) 
		      || one != null && two == null
		      || one.size() != two.size()){
		        return false;
		    }

		    //to avoid messing the order of the lists we will use a copy

		    one = new ArrayList<String>(one); 
		    two = new ArrayList<String>(two);   

		    Collections.sort(one);
		    Collections.sort(two);      
		    return one.equals(two);
		}
		
}
