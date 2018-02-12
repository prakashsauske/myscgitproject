package au.com.woolworths.portal.pos.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.service.PosServiceImpl;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

/**
 * 
 * @author xsvm1
 *
 */


public abstract class BaseController {
	private static final Logger LOGGER = Logger.getLogger(BaseController.class.getName());
	private HttpSession session;
	
	protected static final Logger log = Logger.getLogger(Thread.currentThread()
			.getStackTrace()[0].getClassName());
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Autowired
	protected CommonServiceImpl serviceImpl;
	//@Value("#{properties['reportDataAttribute']}")
	//private String reportDataAttribute;

	@Autowired
	private ArticleServiceImpl articleService;
	
	@Autowired
	private LoginServiceImpl loginService;

	

	public Object redirectToView(HttpServletRequest request,
			String viewName) {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return new ModelAndView(new RedirectView("../../"));
		}
		//ModelAndView modelAndView = new ModelAndView(viewName);
		return viewName;
	}
	public Object redirectWithDepartmentToView(HttpServletRequest request,
			String viewName) {
		if (setSessionAndReturnIfInvalid(request, null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		ModelMap model = new ModelMap();
		List<Department> deptInfoList = null;
		UserContext userDetail = this.getUserCtxObject();
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, userDetail.getSalesOrg(),userDetail);

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		request.setAttribute("model", model);
		return viewName;
	}
	public boolean setSessionAndReturnIfInvalid(HttpServletRequest request, PosServiceImpl posServImpl) {
		/*ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
		HttpServletRequest request = attr.getRequest();*/
		boolean isSessionInvalid = (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null));
		if(posServImpl!=null && posServImpl.getSession()==null && !isSessionInvalid) {
			this.setSession(request.getSession());
			posServImpl.setSession(request.getSession());
		}
		else if(this.getSession() == null && !isSessionInvalid) {
			this.setSession(request.getSession());
		}
		return isSessionInvalid;
	}
	public UserContext getUserCtxObject() {
		return (UserContext) this.getSession().getAttribute("user");
	}
	public void setSiteDetailsInParams(MandatoryReportParam param) {
		UserContext usrCtxt = getUserCtxObject();
		param.setSiteNo(usrCtxt.getSiteNo());
		param.setSiteName(usrCtxt.getSiteName());
		param.setSalesOrg((usrCtxt.getSalesOrg()==null?"":usrCtxt.getSalesOrg()+""));
		param.setPrintReportFormat("PDF");
	}
	public void setSiteDetailsInParams(MandatoryReportParam param, UserContext usrCtxt) {
		param.setSiteNo(usrCtxt.getSiteNo());
		param.setSiteName(usrCtxt.getSiteName());
		param.setSalesOrg((usrCtxt.getSalesOrg()==null?"":usrCtxt.getSalesOrg()+""));
	}
	public HttpSession getSession() {
		if(session == null) {
			ServletRequestAttributes attr = (ServletRequestAttributes) RequestContextHolder.currentRequestAttributes();
			HttpServletRequest request = attr.getRequest();
			session = request.getSession();
		}
		return session;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
	
	@RequestMapping(value = "/autocompletePOS.htm", method = RequestMethod.GET)
	public ModelAndView autocompletePOS(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		String vendorName = (String) request.getParameter("vendorName");

		String srcOfSupp = (String) request.getParameter("sourceSupply");
		ArrayList<Vendor> supplierList;
		ArrayList<WareHouse> supplierList1;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			if ("1".equalsIgnoreCase(srcOfSupp)
					|| "vendor".equalsIgnoreCase(srcOfSupp)) {

				supplierList = articleService.getVendorList(vendorName,
						maxRows, vendorNo, siteNo,user);
				if (supplierList != null && supplierList.size() > 0)
					model.addAttribute("vendorList", supplierList);
				else
					model.addAttribute("vendorList", new ArrayList<Vendor>());

				modelAndView = new ModelAndView("1POS/vendorLookupPos");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

			else if ("2".equalsIgnoreCase(srcOfSupp)
					|| "warehouse".equalsIgnoreCase(srcOfSupp)) {

				supplierList1 = articleService.getWareHouseList(vendorName,
						maxRows, vendorNo,user);
				if (supplierList1 != null && supplierList1.size() > 0)
					model.addAttribute("vendorList", supplierList1);
				else
					model.addAttribute("vendorList", new ArrayList<WareHouse>());

				modelAndView = new ModelAndView("wareHouseLookup");
				model.addAttribute("vendorList", supplierList1);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);

			if ("1".equalsIgnoreCase(srcOfSupp)) {
				supplierList = new ArrayList<Vendor>();
				modelAndView = new ModelAndView("VendorLookup");
				model.addAttribute("vendorList", supplierList);

			} else {
				supplierList1 = new ArrayList<WareHouse>();
				modelAndView = new ModelAndView("wareHouseLookup");
				model.addAttribute("vendorList", supplierList1);

			}
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
		return modelAndView;

	}

	@RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {

		List<Department> categoryInfoList = null;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String prod_no = request.getParameter("iv_parent_node");
		categoryInfoList = (ArrayList<Department>) articleService
				.getDeptDetail(prod_no, this.getUserCtxObject().getSalesOrg(),user);

		Map<String, List<Department>> categoryDetails = new HashMap<String, List<Department>>();
		categoryDetails.put("categoryInfoList", categoryInfoList);
		String json = new Gson().toJson(categoryDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if (categoryInfoList.size() > 0) {
			response.getWriter().write(json);
		} else if (categoryInfoList == null || categoryInfoList.size() <= 0) {
			String s1 = "{\"categoryInfoList\":" + "\"node\": \"" + 0
					+ " \", \"nodeDesc\": \"" + "Select" + "\"}";

			response.getWriter().write(s1);
		}

	}

	@RequestMapping(value = "/fetchSubCategoryDetails.htm", method = RequestMethod.GET)
	public void fetchSubCategoryDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Department> subCategoryInfoList = null;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			String prod_no = request.getParameter("iv_parent_node");
			subCategoryInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, this.getUserCtxObject().getSalesOrg(),user);
			if (subCategoryInfoList == null) {
				subCategoryInfoList = new ArrayList<Department>();
			}
		} catch (Exception e) {
		}

		Map<String, List<Department>> subCategoryDetails = new HashMap<String, List<Department>>();
		subCategoryDetails.put("subCategoryInfoList", subCategoryInfoList);
		String json = new Gson().toJson(subCategoryDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	@RequestMapping(value = "/fetchSegmentDetails.htm", method = RequestMethod.GET)
	public void fetchSegmentDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Department> segmentInfoList = null;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			String prod_no = request.getParameter("iv_parent_node");
			segmentInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),user);

			if (segmentInfoList == null) {
				segmentInfoList = new ArrayList<Department>();
			}
		} catch (Exception e) {
		}

		Map<String, List<Department>> segmentDetails = new HashMap<String, List<Department>>();
		segmentDetails.put("segmentInfoList", segmentInfoList);
		String json = new Gson().toJson(segmentDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}
	@RequestMapping(value = "/reActivateSession.htm", method = RequestMethod.GET)
	@ResponseBody
	public String reActivateSession(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		String isActive ="false";		
		try {			
			HttpSession session = request.getSession(false);
			if(session == null){
				isActive = "false";
				log.info("Session Expired in Server");
			}else{
				isActive =  "true";
				UserContext user=(UserContext) request.getSession(
						false).getAttribute("user");
				log.info("Re Activating Session for "+user.getUserId() +"Session ID "+session.getId());
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return isActive;
	}
	
	@RequestMapping(value = "/getEncSapPassword.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getEncSapPassword(HttpServletRequest request,
			HttpServletResponse response) throws Exception {	
		String encSapPwd = "";
		try {
			String userid = (String) request.getParameter("userId");
			LOGGER.info("User ID"+userid);
			String finalUsrID = Constants.getUTCUserforSAPPwd(userid);
			if(finalUsrID != null && finalUsrID != ""){
				encSapPwd = loginService.encryptSAPPassword(userid, finalUsrID);
				return encSapPwd;
			}			
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		return encSapPwd;
	}
}
