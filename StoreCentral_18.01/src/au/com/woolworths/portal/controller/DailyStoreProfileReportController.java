package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.DailyStoreProfileReport;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.DailyStoreProfileReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.DailyStoreProfileReportServiceImpl;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

@Controller
@RequestMapping(value = "*/dailyStoreProfile")
public class DailyStoreProfileReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['DailyStoreProfiles']}") applicationSettings CR
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	DailyStoreProfileReportController() {
		model = new ModelMap();
	}

	private static final Logger LOGGER = Logger.getLogger(DailyStoreProfileReportController.class.getName());
	private ModelMap model;

	private List<Department> deptInfoList;
	private Map<String, String> deptInfoMap;
	private DailyStoreProfileReportParam paramForPagination;
	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private DailyStoreProfileReportServiceImpl dailyStoreProfileReportService;

	@RequestMapping(value = "/onPageLoad.htm")
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		/*if(user.getUserAccessMap().containsKey(screenCode)){
			if(user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		// model = new ModelMap();
		deptInfoList = new ArrayList<Department>();
		try {
			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("deptInfoList", deptInfoList);
			if (deptInfoList != null && deptInfoList.size() > 0) {
				deptInfoMap = new HashMap<String, String>();
				for (Department dept : deptInfoList) {
					deptInfoMap.put(dept.getNode(), dept.getNodeDesc());
					
				}
			}
			DailyStoreProfileReportParam param = new DailyStoreProfileReportParam();
			UserContext userDetail = ((UserContext) request.getSession()
					.getAttribute("user"));
			String siteNo = userDetail.getSiteNo();
			Integer salesOrg = userDetail.getSalesOrg();
			param.setSiteNo(siteNo);
			param.setSalesOrg(salesOrg.toString());
			DailyStoreProfileReport dailyStoreProfileReport = new DailyStoreProfileReport();
			dailyStoreProfileReport = dailyStoreProfileReportService.getRecentDailyStoreProfile(param,user);
			if(dailyStoreProfileReport != null)
			{
				model.addAttribute("recentProfileDate", dailyStoreProfileReport.getStartDate());
			}
System.out.println("recentProfileDate ::::::: "+ dailyStoreProfileReport.getStartDate());
		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		ModelAndView modelAndView = new ModelAndView("dailyStoreProfile");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getDailyStoreProfileReport.htm", method = RequestMethod.POST)
	public ModelAndView getDailyStoreProfileReport(
			@ModelAttribute("dailyStoreProfileReport") DailyStoreProfileReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		LOGGER.info("INSIDE getDailyStoreProfileReport mehtod of DailyStoreProfileReportController");

		ModelAndView modelAndView = new ModelAndView("dailyStoreProfileContent");
		UserContext userDetail = ((UserContext) request.getSession()
				.getAttribute("user"));

		String siteNo = userDetail.getSiteNo();
		String pagetNo = "1";
		Integer salesOrg = userDetail.getSalesOrg();

		ArrayList<DailyStoreProfileReport> dailyStoreProfileReportList = null;
		if (!result.hasErrors()) {
			LOGGER.info("Binding successful");
			
		} else {
			LOGGER.info("Binding error");
		}

		if (param != null) {
			param.setSiteNo(siteNo);
			param.setPageNo(pagetNo);
			param.setSalesOrg(salesOrg.toString());
		}
		paramForPagination = param;

		dailyStoreProfileReportList = dailyStoreProfileReportService
				.getDailyStoreProfileReport(param,userDetail);

		if (dailyStoreProfileReportList != null
				&& dailyStoreProfileReportList.size() > 0) {
			// TODO: department list to be changed
			updateDepartmentNames(dailyStoreProfileReportList, salesOrg);
			param.setOption("1");
			if (dailyStoreProfileReportList.get(0).getMsg() != null
					&& dailyStoreProfileReportList.get(0).getMsg().trim() != ""
					&& Integer.parseInt(dailyStoreProfileReportList.get(0)
							.getMsg().trim()) > 20)
				param.setOption("2");

			System.out.println("DailyStoreProfileReports size"
					+ dailyStoreProfileReportList.size());
			model.addAttribute("dailyStoreProfileReportList",
					dailyStoreProfileReportList);
			model.addAttribute("startDate", dailyStoreProfileReportList.get(0)
					.getPromoStartDate());
			model.addAttribute("endDate", dailyStoreProfileReportList.get(0)
					.getPromoEndDate());
		} else {
			param.setOption("3");
			model.addAttribute("dailyStoreProfileReportList",
					new ArrayList<DailyStoreProfileReport>());
		}
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getDailyStoreProfileReportForPagination.htm", method = RequestMethod.POST)
	public ModelAndView getDailyStoreProfileReportForPagination(
			@ModelAttribute("dailyStoreProfileReport") DailyStoreProfileReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		LOGGER.info("INSIDE getDailyStoreProfileReportForPagination mehtod of DailyStoreProfileReportController");

		ModelAndView modelAndView = new ModelAndView("dailyStoreProfileContent");
		UserContext userDetail = ((UserContext) request.getSession()
				.getAttribute("user"));
		if (param != null && param.getPageNo() != null
				&& param.getPageNo() != "") {
			paramForPagination.setPageNo(param.getPageNo());
		}

		ArrayList<DailyStoreProfileReport> dailyStoreProfileReportList = null;
		if (!result.hasErrors()) {
			LOGGER.info("Binding successful");
			
		} else {
			LOGGER.info("Binding error");
		}

		dailyStoreProfileReportList = dailyStoreProfileReportService
				.getDailyStoreProfileReport(paramForPagination,userDetail);

		if (dailyStoreProfileReportList != null
				&& dailyStoreProfileReportList.size() > 0) {
			
			// TODO: department list to be changed
			// dailyStoreProfileReportList=(ArrayList<DailyStoreProfileReport>)
			// updateDepartmentNames(dailyStoreProfileReportList,userDetail.getSalesOrg());
			updateDepartmentNames(dailyStoreProfileReportList,
					userDetail.getSalesOrg());
			param.setOption("1");
			if (dailyStoreProfileReportList.get(0).getMsg() != null
					&& dailyStoreProfileReportList.get(0).getMsg().trim() != ""
					&& Integer.parseInt(dailyStoreProfileReportList.get(0)
							.getMsg().trim()) > 20)
				param.setOption("2");
			// if(orderRosterReportList.get(0).getMsg().trim()!=null &&
			// Integer.parseInt(orderRosterReportList.get(0).getMsg().trim())>20)
			// if(orderRosterReportList.size() > 2)
			// param.setOption("2");

			LOGGER.info("dailyStoreProfileReportList size"
					+ dailyStoreProfileReportList.size());
			model.addAttribute("dailyStoreProfileReportList",
					dailyStoreProfileReportList);
		} else {
			param.setOption("3");
			model.addAttribute("dailyStoreProfileReportList",
					new ArrayList<DailyStoreProfileReport>());
		}
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	private void updateDepartmentNames(
			List<DailyStoreProfileReport> dailyStoreProfileReportList,
			Integer sales_org) {

		for (DailyStoreProfileReport dailyStoreProfileReport : dailyStoreProfileReportList) {

			String department = dailyStoreProfileReport.getDeptNo();

			

			if (deptInfoMap != null && !deptInfoMap.isEmpty()) {
				dailyStoreProfileReport.setDeptName(deptInfoMap
						.get(dailyStoreProfileReport.getDeptNo()));
			}

		}
		// return dailyStoreProfileReportList;
	}
}