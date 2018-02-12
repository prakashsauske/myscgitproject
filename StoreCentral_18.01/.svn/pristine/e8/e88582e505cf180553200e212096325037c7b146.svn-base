package au.com.woolworths.portal.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.TreeMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.MovementType;
import au.com.woolworths.portal.model.Order;
import au.com.woolworths.portal.model.SohAdjustLogModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.SohAdjustLogParam;
import au.com.woolworths.portal.param.UserIdNameParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.SohAdjustLogServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/sohAdjustLog")
public class SohAdjustLogController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['StockAdjustmentLog']}") applicationSettings CR
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
	@Autowired
	private SohAdjustLogServiceImpl sohAdjustLogServiceImpl;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private LoginServiceImpl loginServiceImpl;

	private ModelMap model;
	SohAdjustLogParam param = null;
	List<SohAdjustLogModel> sohAdjustLogList = null;
	List<SohAdjustLogModel> sohAdjustLogListWith20Records = null;
	List<SohAdjustLogModel> sohAdjustLogListForPrint = null;

	public SohAdjustLogServiceImpl getSohAdjustLogServiceImpl() {
		return sohAdjustLogServiceImpl;
	}

	public void setSohAdjustLogServiceImpl(
			SohAdjustLogServiceImpl sohAdjustLogServiceImpl) {
		this.sohAdjustLogServiceImpl = sohAdjustLogServiceImpl;
	}

	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	public LoginServiceImpl getLoginServiceImpl() {
		return loginServiceImpl;
	}

	public void setLoginServiceImpl(LoginServiceImpl loginServiceImpl) {
		this.loginServiceImpl = loginServiceImpl;
	}

	// ************************* on page load*********
	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
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
		/*if (user.getUserAccessMap().containsKey(screenCode)){
			if(user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		param = new SohAdjustLogParam();
		model = new ModelMap();
		sohAdjustLogList = new ArrayList<SohAdjustLogModel>();

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		model.addAttribute("param", param);
		model.addAttribute("noResults", "");

		// ***********************************

		List<Department> deptInfoList = new ArrayList<Department>();
		List<MovementType> mvmtTypeList = new ArrayList<MovementType>();
		List<UserIdNameParam> userIdNameParamList = new ArrayList<UserIdNameParam>();
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);
			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No Department Data Found ");
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		try {
			String source = "A";
			mvmtTypeList = sohAdjustLogServiceImpl.getMvmtTypeList(source,user);
			model.addAttribute("mvmtTypeList", mvmtTypeList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No reason code Data Found ");
			model.addAttribute("mvmtTypeList", new ArrayList<MovementType>());
		}
		try {
			UserContext userContext = (UserContext) request.getSession()
					.getAttribute("user");
			userIdNameParamList = loginServiceImpl
					.getUserNamesForStore(userContext.getSiteNo());
			model.addAttribute("userIdNameList", userIdNameParamList);

		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No user Data Found ");
			model.addAttribute("userIdNameList",
					new ArrayList<UserIdNameParam>());
		}

		// ***********************************

		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("sohAdjustLogReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// ********************fetching log details ***********************

	@RequestMapping(value = "/sohAdjustLog.htm", method = RequestMethod.GET)
	public ModelAndView sohAdjustLog(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("entered sohAdjustLog in controller");

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}

		// param.setEmployeeIndicator(request.getParameter("employeeIndicator"));
		// param.setCheckboxFlag(request.getParameter("checkboxFlag"));

		// param.setDeptRadio(request.getParameter("deptRadio"));
		/*
		 * ////System.out.println("employeeIndicator"+request.getParameter(
		 * "employeeIndicator"));
		 * ////System.out.println("checkboxFlag"+request.getParameter
		 * ("checkboxFlag"));
		 * ////System.out.println("reasonCodeRadio value"+request
		 * .getParameter("reasonCodeRadio")); String[] checkBoxValues = new
		 * String[4];
		 * 
		 * ////System.out.println();
		 */

		/*
		 * if(param.getDeptRadio().equalsIgnoreCase("Single")){
		 * param.setTradingDeptType(request.getParameter("tradingDeptType")); }
		 * else{ param.setTradingDeptType("ALL DEPARTMENTS"); }
		 */

		/*
		 * if(request.getParameter("checkboxFlag").equalsIgnoreCase("true")){
		 * checkBoxValues=request.getParameterValues("reasonCodeCheckBox");
		 * ////System.out.println("chk box vals in controller"); for(int
		 * i=0;i<checkBoxValues.length;i++){
		 * ////System.out.println(""+checkBoxValues[i]); }
		 * 
		 * }else{ checkBoxValues[0]=request.getParameter("reasonCodeRadio"); }
		 * param.setReasonCode(checkBoxValues);
		 */

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");

		String siteNo = userContext.getSiteNo();
		param.setSiteNo(siteNo);
		param.setFromDate(request.getParameter("fromDate"));
		param.setToDate(request.getParameter("toDate"));
		param.setDropretainEmployee(request.getParameter("userIdNameList"));
		if (param.getFromDate().length() == 8) {
			param.setFromDate(y2ToY4Converter(param.getFromDate()));
			// //System.out.println("param.getFromDate"+param.getFromDate());
		}
		if (param.getToDate().length() == 8) {
			param.setToDate(y2ToY4Converter(param.getToDate()));
			// //System.out.println("param.getToDate"+param.getToDate());
		}
		String emp = request.getParameter("userIdNameList");

		// //System.out.println("emp"+emp);
		if (emp.equalsIgnoreCase("default")) {
			param.setEmployee("");
		} else {
			param.setEmployee(emp);
		}

		param.setTransactionType(request.getParameter("transactionType"));
		param.setSingleReasonCode(request.getParameter("reasonCode"));
		param.setTradingDeptType(request.getParameter("tradingDeptType"));
		param.setPageNo(1);

		model.addAttribute("sohAdjustLogList",
				new ArrayList<SohAdjustLogModel>());

		try {
			// //System.out.println("inside try");

			model.addAttribute("noData", "");
			// sohAdjustLogList =
			// sohAdjustLogServiceImpl.getSohAdjustLog(param,"pagination");
			sohAdjustLogListForPrint = sohAdjustLogServiceImpl.getSohAdjustLog(
					param, "print",userContext);

			int no = param.getPageNo();
			int endIndex = ((no - 1) * 20) + 20;

			sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
			for (int i = ((no - 1) * 20); i < (endIndex > sohAdjustLogListForPrint
					.size() ? sohAdjustLogListForPrint.size() : (endIndex)); i++) {
				sohAdjustLogList.add(sohAdjustLogListForPrint.get(i));
			}
			// sohAdjustLogList.addAll(sohAdjustLogListForPrint);

			if (sohAdjustLogList != null
					&& sohAdjustLogList.size() > 0
					&& !sohAdjustLogList.get(0).getAdjustmentDate()
							.equalsIgnoreCase("")) {

				param.setRecordCount(Integer.parseInt(sohAdjustLogList.get(0)
						.getMessage()));

				// //System.out.println("inside if size>=1");
				model.addAttribute("noResults", "");
				// //System.out.println(sohAdjustLogList.get(0).getAdjustmentTime());
				// //System.out.println(sohAdjustLogList.get(0).getAdjustmentDate());
				param.setAdjustmentDate(sohAdjustLogList.get(0)
						.getAdjustmentDate());
				param.setTradingDeptNo(sohAdjustLogList.get(0).getDeptId());
				param.setTradingDeptName(sohAdjustLogList.get(0).getDeptName());
				// if(param.getEmployeeIndicator().equalsIgnoreCase("single")){
				param.setEmpName(sohAdjustLogList.get(0).getUserName());
				// }
				/*
				 * for(int i=0;i<sohAdjustLogList.size();i++){
				 * if(!uomVal.equalsIgnoreCase("kg")){ Double
				 * temp=Double.parseDouble
				 * (sohAdjustLogList.get(i).getEndSoh().trim()); temp=temp/1;
				 * int soh=temp.intValue();
				 * 
				 * sohAdjustLogList.get(i).setEndSoh(String.valueOf(soh));
				 * 
				 * 
				 * Double temp1=Double.parseDouble(sohAdjustLogList.get(i).
				 * getAdjustmentQuantity().trim()); temp1=temp1/1; int
				 * soh1=temp1.intValue();
				 * sohAdjustLogList.get(i).setAdjustmentQuantity
				 * (String.valueOf(soh1)); } }
				 */

				// group by date
				/*
				 * Map<String, List<SohAdjustLogModel> > map = new
				 * HashMap<String, List<SohAdjustLogModel> >(); for
				 * (SohAdjustLogModel sohLog : sohAdjustLogList) { String key =
				 * sohLog.getAdjustmentDate(); List<SohAdjustLogModel> innerList
				 * = map.containsKey(key) ? map.get(key) : new
				 * ArrayList<SohAdjustLogModel>(); innerList.add(sohLog);
				 * map.put(key, innerList); }
				 * ////System.out.println("map size---->" + map.size());
				 * model.addAttribute("map", map);
				 */
				param.setRecordCount(Integer.parseInt(sohAdjustLogList.get(0)
						.getMessage()));
				// for print

				if (sohAdjustLogListForPrint != null
						&& sohAdjustLogListForPrint.size() > 0
						&& !sohAdjustLogListForPrint.get(0).getAdjustmentDate()
								.equalsIgnoreCase("")) {

					// group by date
					Map<String, List<SohAdjustLogModel>> mapForPrint = new TreeMap<String, List<SohAdjustLogModel>>();
					for (SohAdjustLogModel sohLog : sohAdjustLogListForPrint) {
						String key = sohLog.getAdjustmentDate();
						List<SohAdjustLogModel> innerList = mapForPrint
								.containsKey(key) ? mapForPrint.get(key)
								: new ArrayList<SohAdjustLogModel>();
						innerList.add(sohLog);
						mapForPrint.put(key, innerList);
					}
					// //System.out.println("mapForPrint size---->" +
					// mapForPrint.size());
					model.addAttribute("mapForPrint", mapForPrint);

				}

			} else {
				// //System.out.println("inside if size==0");
				if (sohAdjustLogList != null && sohAdjustLogList.size() > 0) {
					model.addAttribute(
							"noResults",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
					// //System.out.println("error-->"+sohAdjustLogList.get(0).getMessage());
				} else
					model.addAttribute(
							"noResults",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				param.setAdjustmentDate("");
				param.setTradingDeptNo("");
				param.setTradingDeptName("");
				model.addAttribute("map", "");
				sohAdjustLogList = new ArrayList<SohAdjustLogModel>();

			}

		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
			model.addAttribute("param", param);
			model.addAttribute(
					"noResults",
					"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
			model.addAttribute("map", "");
			param.setAdjustmentDate("");
			param.setTradingDeptNo("");
			param.setTradingDeptName("");
		}
		/*
		 * if(sohAdjustLogList.size()<21){
		 * sohAdjustLogListWith20Records=sohAdjustLogList;
		 * 
		 * }else{ sohAdjustLogListWith20Records=sohAdjustLogList.subList(0, 20);
		 * }
		 */

		model.addAttribute("sohAdjustLogList", sohAdjustLogList);
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("sohAdjustLogReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		// //System.out.println("b4 return ");
		return modelAndView;
	}

	@RequestMapping(value = "/sohAdjustLogForPagination.htm", method = RequestMethod.GET)
	public ModelAndView sohAdjustLogForPagination(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("entered sohAdjustLog in controller");

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}

		/*
		 * UserContext userContext = (UserContext) request.getSession()
		 * .getAttribute("user");
		 * 
		 * String siteNo = userContext.getSiteNo(); param.setSiteNo(siteNo);
		 * param.setFromDate(request.getParameter("fromDate"));
		 * param.setToDate(request.getParameter("toDate"));
		 * param.setEmployee(request.getParameter("employeeId"));
		 * param.setTransactionType(request.getParameter("transactionType"));
		 * param.setSingleReasonCode(request.getParameter("reasonCode"));
		 * param.setTradingDeptType(request.getParameter("tradingDeptType"));
		 */
		String pageNumber = request.getParameter("pageNumber");

		if (pageNumber != null && pageNumber.trim().length() > 0) {
			param.setPageNo(Integer.parseInt(pageNumber) > 0 ? Integer
					.parseInt(pageNumber) : 1);
		} else {
			param.setPageNo(1);
		}
		model.addAttribute("sohAdjustLogList",
				new ArrayList<SohAdjustLogModel>());

		try {
			// //System.out.println("inside try");

			model.addAttribute("noData", "");
			// sohAdjustLogList =
			// sohAdjustLogServiceImpl.getSohAdjustLog(param,"pagination");
			sohAdjustLogList = new ArrayList<SohAdjustLogModel>();

			int no = param.getPageNo();
			int endIndex = ((no - 1) * 20) + 20;

			for (int i = ((no - 1) * 20); i < (endIndex > sohAdjustLogListForPrint
					.size() ? sohAdjustLogListForPrint.size() : (endIndex)); i++) {
				sohAdjustLogList.add(sohAdjustLogListForPrint.get(i));
			}

			if (sohAdjustLogList != null
					&& sohAdjustLogList.size() > 0
					&& !sohAdjustLogList.get(0).getAdjustmentDate()
							.equalsIgnoreCase("")) {

				// //System.out.println("first rec"+sohAdjustLogList.get(0).getAdjustmentTime()+"|"+sohAdjustLogList.get(0).getAdjustmentDate());
				// //System.out.println("last rec"+sohAdjustLogList.get((sohAdjustLogList.size()-1)).getAdjustmentTime()+"|"+sohAdjustLogList.get(0).getAdjustmentDate());

				// //System.out.println("inside if size>=1");
				model.addAttribute("noResults", "");
				// //System.out.println(sohAdjustLogList.get(0).getAdjustmentTime());
				// //System.out.println(sohAdjustLogList.get(0).getAdjustmentDate());
				param.setAdjustmentDate(sohAdjustLogList.get(0)
						.getAdjustmentDate());
				param.setTradingDeptNo(sohAdjustLogList.get(0).getDeptId());
				param.setTradingDeptName(sohAdjustLogList.get(0).getDeptName());
				// if(param.getEmployeeIndicator().equalsIgnoreCase("single")){
				param.setEmpName(sohAdjustLogList.get(0).getUserName());
				// }
				/*
				 * for(int i=0;i<sohAdjustLogList.size();i++){
				 * if(!uomVal.equalsIgnoreCase("kg")){ Double
				 * temp=Double.parseDouble
				 * (sohAdjustLogList.get(i).getEndSoh().trim()); temp=temp/1;
				 * int soh=temp.intValue();
				 * 
				 * sohAdjustLogList.get(i).setEndSoh(String.valueOf(soh));
				 * 
				 * 
				 * Double temp1=Double.parseDouble(sohAdjustLogList.get(i).
				 * getAdjustmentQuantity().trim()); temp1=temp1/1; int
				 * soh1=temp1.intValue();
				 * sohAdjustLogList.get(i).setAdjustmentQuantity
				 * (String.valueOf(soh1)); } }
				 */

				// group by date
				/*
				 * Map<String, List<SohAdjustLogModel> > map = new
				 * HashMap<String, List<SohAdjustLogModel> >(); for
				 * (SohAdjustLogModel sohLog : sohAdjustLogList) { String key =
				 * sohLog.getAdjustmentDate(); List<SohAdjustLogModel> innerList
				 * = map.containsKey(key) ? map.get(key) : new
				 * ArrayList<SohAdjustLogModel>(); innerList.add(sohLog);
				 * map.put(key, innerList); }
				 * ////System.out.println("map size---->" + map.size());
				 * model.addAttribute("map", map);
				 */
				// param.setRecordCount(Integer.parseInt(sohAdjustLogList.get(0).getMessage()));

			} else {
				// //System.out.println("inside if size==0");
				if (sohAdjustLogList != null && sohAdjustLogList.size() > 0) {
					model.addAttribute(
							"noResults",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
					// //System.out.println("error-->"+sohAdjustLogList.get(0).getMessage());
				} else
					model.addAttribute(
							"noResults",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				param.setAdjustmentDate("");
				param.setTradingDeptNo("");
				param.setTradingDeptName("");
				model.addAttribute("map", "");
				sohAdjustLogList = new ArrayList<SohAdjustLogModel>();

			}

		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
			model.addAttribute("param", param);
			model.addAttribute(
					"noResults",
					"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
			model.addAttribute("map", "");
			param.setAdjustmentDate("");
			param.setTradingDeptNo("");
			param.setTradingDeptName("");
		}
		model.addAttribute("sohAdjustLogList", sohAdjustLogList);
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("sohAdjustLogReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		// //System.out.println("b4 return ");
		return modelAndView;
	}

	public String y2ToY4Converter(String textDate) {

		Date actualDate = null;

		SimpleDateFormat yyyy = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat yy = new SimpleDateFormat("dd/MM/yy");

		try {
			actualDate = yy.parse(textDate);
		} catch (Exception pe) {
			pe.printStackTrace();
		}

		// system.out.print( textDate + " enhanced:  " );
		// //System.out.println( yyyy.format( actualDate ) );
		return yyyy.format(actualDate);
	}

}
