package au.com.woolworths.portal.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.EDGMSReport;
import au.com.woolworths.portal.model.MovementType;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.EdgmsReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.EdgmsServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/edgms")
@Scope("session")
public class EdgmsController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ElectronicDailyGoodsMovementSummary']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private EdgmsServiceImpl edgmsServiceImpl;
	@Autowired
	private ArticleServiceImpl articleService;

	private ModelMap model;
	private EdgmsReportParam param;
	private ArrayList<EDGMSReport> edgmsReport;

	public EdgmsServiceImpl getEdgmsServiceImpl() {
		return edgmsServiceImpl;
	}

	public void setEdgmsServiceImpl(EdgmsServiceImpl edgmsServiceImpl) {
		this.edgmsServiceImpl = edgmsServiceImpl;
	}

	@RequestMapping(value = "/onPageLoadEDGMS.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadEDGMS(HttpServletRequest request,
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

		model = new ModelMap();
		model.addAttribute("param", new EdgmsReportParam());
		// ********************************
		List<Department> deptInfoList = new ArrayList<Department>();
		List<MovementType> mvmtTypeList = new ArrayList<MovementType>();
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			String source = "A";
			// mvmtTypeList = sohAdjustLogServiceImpl.getMvmtTypeList(source);

			model.addAttribute("param", param);
			model.addAttribute("deptInfoList", deptInfoList);
			model.addAttribute("mvmtTypeList", mvmtTypeList);
			for (int i = 0; i < deptInfoList.size(); i++) {
				// ////System.out.println("deptInfoList " + i + " --->" +
				// deptInfoList.get(i).getNode());
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No Department Data Found ");
			model.addAttribute("deptInfoList", new ArrayList<Department>());
			model.addAttribute("mvmtTypeList", new ArrayList<MovementType>());
		}

		// ********************************

		ModelAndView modelAndView = new ModelAndView("edgmsReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/reportSearchEDGMS.htm", method = RequestMethod.GET)
	public ModelAndView reportSearchEDGMSGet(
			@ModelAttribute EdgmsReportParam reportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		param = reportParam;
		model.addAttribute("param", param);
		model.addAttribute("dgmsReport", new ArrayList<EDGMSReport>());
		ModelAndView modelAndView = new ModelAndView("edgmsReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/reportSearchEDGMS.htm", method = RequestMethod.POST)
	public ModelAndView reportSearchEDGMS(
			@ModelAttribute EdgmsReportParam reportParam, BindingResult result,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (result.hasErrors()) {
			// //System.out.println("error while binding");
		}
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ArrayList<EDGMSReport> edgmsReportWithInvoice = new ArrayList<EDGMSReport>();
		ArrayList<EDGMSReport> edgmsReportWithOutInvoice = new ArrayList<EDGMSReport>();
		// //System.out.println("inputdate from report"+reportParam.getInputDate());
		// //System.out.println("inputdate from report"+reportParam.getSiteNo());
		// //System.out.println("inputdate from report"+reportParam.getTradingDept());
		// //System.out.println("inputdate from report"+reportParam.getWcDate());
		param = reportParam;
		if (((param.getInputDate() == "") || (param.getInputDate() == null))
				&& ((param.getWcDate() == "") || (param.getWcDate() == null))) {
			model.addAttribute("msg", "Please enter Date or W/C date");
		} else {
			model.addAttribute("msg", "");
			// doubt

			UserContext userContext = (UserContext) (request.getSession()
					.getAttribute("user"));
			// param.setSiteNo(userContext.getSiteNo());
			/*
			 * param.setSiteNo("1008"); param.setTradingDept("11");
			 * param.setWcDate("15/12/2011");
			 */

			param.setSiteNo(userContext.getSiteNo());

			if (request.getParameter("searchByOptions")
					.equalsIgnoreCase("Date")) {
				param.setInputDate(request.getParameter("inputDate"));
				param.setWcDate("");
				param.setRadio("Date");

			} else {
				param.setWcDate(request.getParameter("inputDate"));
				param.setInputDate("");
				param.setRadio("WCDate");
			}
			// //System.out.println("tradingDept-->"+request.getParameter("tradingDept"));
			// param.setWcDate("15/12/2011");
			// 20111215

			// //System.out.println("siteNo="+param.getSiteNo());
			// //System.out.println("department="+param.getTradingDept());
			// //System.out.println("inputDate="+param.getInputDate());
			// //System.out.println("wcDate="+param.getWcDate());
			if (param.getInputDate().length() == 8) {
				param.setInputDate(y2ToY4Converter(param.getInputDate()));
				// //System.out.println("param.getInputDate"+param.getInputDate());
			}
			if (param.getWcDate().length() == 8) {
				param.setWcDate(y2ToY4Converter(param.getWcDate()));
				// //System.out.println("param.getWcDate"+param.getWcDate());
			}
			// //System.out.println("after y2 to y4");
			// //System.out.println("siteNo="+param.getSiteNo());
			// //System.out.println("department="+param.getTradingDept());
			// //System.out.println("inputDate="+param.getInputDate());
			// //System.out.println("wcDate="+param.getWcDate());
			try {
				/* param.setPageNo(1); */
				edgmsReport = edgmsServiceImpl.getEDGMSReport(param,userContext);
			} catch (Exception e) {
				// //System.out.println("error in line 107 = "+e);
				model.addAttribute("msg", "No Data found");
			}

			if (edgmsReport != null && edgmsReport.size() != 0) {

				model.addAttribute("edgmsReport", edgmsReport);
			} else {
				model.addAttribute(
						"msg",
						"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
			}
			Double totalInvoice = 0.00;
			Double totalCost = 0.00;
			model.addAttribute("storeNo", "");
			model.addAttribute("storeName", "");
			model.addAttribute("totalInvoice", "");

			if (edgmsReport != null && edgmsReport.size() != 0
					&& !edgmsReport.get(0).getOrderNo().equalsIgnoreCase("")) {

				/*
				 * param.setRecordCount(Integer
				 * .parseInt(edgmsReport.get(0).getMsg().trim()));
				 */
				model.addAttribute("msg", "");
				for (int i = 0; i < edgmsReport.size(); i++) {
					if (edgmsReport.get(i).getInvoiceNo() != null
							&& edgmsReport.get(i).getInvoiceNo() != "") {
						// //System.out.println("not null"+edgmsReport.get(i).getInvoiceNo());
						int a = edgmsReport.get(i).getUserName().indexOf(" ");
						if (a != 0) {
							edgmsReport.get(i).setUserName(
									edgmsReport
											.get(i)
											.getUserName()
											.substring(
													a + 1,
													edgmsReport.get(i)
															.getUserName()
															.length()));
						}
						edgmsReportWithInvoice.add(edgmsReport.get(i));
					} else {
						// //System.out.println("null"+edgmsReport.get(i).getInvoiceNo());
						int b = edgmsReport.get(i).getUserName().indexOf(" ");
						if (b != 0) {
							edgmsReport.get(i).setUserName(
									edgmsReport
											.get(i)
											.getUserName()
											.substring(
													b + 1,
													edgmsReport.get(i)
															.getUserName()
															.length()));
						}
						edgmsReportWithOutInvoice.add(edgmsReport.get(i));
					}
				}
				if (edgmsReport.size() != 0) {
					// //System.out.println("dgmsReport.get(1).getStoreNo()"+edgmsReport.get(0).getStoreNo());
					model.addAttribute("storeNo", edgmsReport.get(0)
							.getStoreNo());
					model.addAttribute("storeName", edgmsReport.get(0)
							.getStoreName());
				}

				if (edgmsReportWithInvoice != null
						&& edgmsReportWithInvoice.size() != 0) {
					for (int j = 0; j < edgmsReportWithInvoice.size(); j++) {

						totalInvoice += Double
								.parseDouble(edgmsReportWithInvoice.get(j)
										.getInvoiceTotal());

					}
					model.addAttribute("totalInvoice", totalInvoice);
				} else {
					model.addAttribute("totalInvoice", "");
				}
				if (edgmsReportWithOutInvoice != null
						&& edgmsReportWithOutInvoice.size() != 0) {
					for (int j = 0; j < edgmsReportWithOutInvoice.size(); j++) {

						totalCost += Double
								.parseDouble(edgmsReportWithOutInvoice.get(j)
										.getCost());

					}
					model.addAttribute("totalCost", totalCost);
				} else {
					model.addAttribute("totalCost", "");
				}
			} else {
				// //System.out.println("in else part");

				if (edgmsReport != null && edgmsReport.size() > 0) {
					// //System.out.println("1");
					model.addAttribute(
							"msg",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				} else {
					// //System.out.println("2");
					model.addAttribute(
							"msg",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				}
			}

		}
		if (request.getParameter("searchByOptions").equalsIgnoreCase("Date")) {
			param.setSearchByOptions("Date");
		} else {
			param.setSearchByOptions("WCDate");
		}
		model.addAttribute("edgmsReportWithInvoice", edgmsReportWithInvoice);
		model.addAttribute("edgmsReportWithOutInvoice",
				edgmsReportWithOutInvoice);
		param = reportParam;
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("edgmsReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/reportSearchEDGMSForPagination.htm", method =
	 * RequestMethod.POST) public ModelAndView
	 * reportSearchEDGMSForPagination(@ModelAttribute EdgmsReportParam
	 * reportParam,BindingResult result, HttpServletRequest request,
	 * HttpServletResponse response) throws Exception { if(result.hasErrors()) {
	 * ////System.out.println("error while binding"); } if
	 * (request.getSession(false) == null || (request.getSession(false) != null
	 * && request.getSession( false).getAttribute("user") == null)) { return new
	 * ModelAndView(new RedirectView("../../")); } ArrayList<EDGMSReport>
	 * edgmsReportWithInvoice=new ArrayList<EDGMSReport>();
	 * ArrayList<EDGMSReport> edgmsReportWithOutInvoice=new
	 * ArrayList<EDGMSReport>();
	 * ////System.out.println("inputdate from report"+reportParam.getInputDate());
	 * ////System.out.println("inputdate from report"+reportParam.getSiteNo());
	 * //system
	 * .out.println("inputdate from report"+reportParam.getTradingDept());
	 * ////System.out.println("inputdate from report"+reportParam.getWcDate());
	 * param=reportParam;
	 * if(((param.getInputDate()=="")||(param.getInputDate()==
	 * null))&&((param.getWcDate()=="")||(param.getWcDate()==null))) {
	 * model.addAttribute("msg", "Please enter Date or W/C date"); }else{
	 * model.addAttribute("msg", ""); //doubt
	 * 
	 * 
	 * UserContext
	 * userContext=(UserContext)(request.getSession().getAttribute("user"));
	 * //param.setSiteNo(userContext.getSiteNo()); param.setSiteNo("1008");
	 * param.setTradingDept("11"); param.setWcDate("15/12/2011");
	 * 
	 * 
	 * param.setSiteNo(((UserContext) request.getSession()
	 * .getAttribute("user")).getSiteNo());
	 * 
	 * if(request.getParameter("searchByOptions").equalsIgnoreCase("Date")){
	 * param.setInputDate(request.getParameter("inputDate"));
	 * param.setWcDate(""); param.setRadio("Date");
	 * 
	 * } else{ param.setWcDate(request.getParameter("inputDate"));
	 * param.setInputDate(""); param.setRadio("WCDate"); }
	 * ////System.out.println("tradingDept-->"
	 * +request.getParameter("tradingDept")); //param.setWcDate("15/12/2011");
	 * //20111215
	 * 
	 * ////System.out.println("siteNo="+param.getSiteNo());
	 * ////System.out.println("department="+param.getTradingDept());
	 * ////System.out.println("inputDate="+param.getInputDate());
	 * ////System.out.println("wcDate="+param.getWcDate());
	 * if(param.getInputDate().length()==8){
	 * param.setInputDate(y2ToY4Converter(param.getInputDate()));
	 * ////System.out.println("param.getInputDate"+param.getInputDate()); }
	 * if(param.getWcDate().length()==8){
	 * param.setWcDate(y2ToY4Converter(param.getWcDate()));
	 * ////System.out.println("param.getWcDate"+param.getWcDate()); }
	 * ////System.out.println("after y2 to y4");
	 * ////System.out.println("siteNo="+param.getSiteNo());
	 * ////System.out.println("department="+param.getTradingDept());
	 * ////System.out.println("inputDate="+param.getInputDate());
	 * ////System.out.println("wcDate="+param.getWcDate());
	 * 
	 * String pageNumber = request.getParameter("pageNumber");
	 * 
	 * if (pageNumber != null && pageNumber.trim().length() > 0) {
	 * param.setPageNo(Integer.parseInt(pageNumber) > 0 ?
	 * Integer.parseInt(pageNumber) : 1); } else { param.setPageNo(1); } try{
	 * edgmsReport=edgmsServiceImpl.getEDGMSReport(param); } catch(Exception e){
	 * ////System.out.println("error in line 107 = "+e); model.addAttribute("msg",
	 * "No Data found"); }
	 * 
	 * if(edgmsReport!=null && edgmsReport.size()!=0){
	 * 
	 * model.addAttribute("edgmsReport",edgmsReport); }else{
	 * model.addAttribute("msg",
	 * "We could not generate the report since there is no data for selected parameters. Please try different parameters."
	 * ); } Double totalInvoice = 0.00; Double totalCost=0.00;
	 * model.addAttribute("storeNo",""); model.addAttribute("storeName","");
	 * model.addAttribute("totalInvoice","");
	 * 
	 * if(edgmsReport!=null&&edgmsReport.size()!=0&&
	 * !edgmsReport.get(0).getOrderNo().equalsIgnoreCase("")){
	 * param.setRecordCount
	 * (Integer.parseInt(edgmsReport.get(0).getMsg().trim()));
	 * 
	 * model.addAttribute("msg", ""); for(int i=0;i<edgmsReport.size();i++) {
	 * if(
	 * edgmsReport.get(i).getInvoiceNo()!=null&&edgmsReport.get(i).getInvoiceNo
	 * ()!="") {
	 * ////System.out.println("not null"+edgmsReport.get(i).getInvoiceNo()); int
	 * a=edgmsReport.get(i).getUserName().indexOf(" "); if(a!=0) {
	 * edgmsReport.get
	 * (i).setUserName(edgmsReport.get(i).getUserName().substring(a+1,
	 * edgmsReport.get(i).getUserName().length())); }
	 * edgmsReportWithInvoice.add(edgmsReport.get(i)); } else{
	 * ////System.out.println("null"+edgmsReport.get(i).getInvoiceNo()); int
	 * b=edgmsReport.get(i).getUserName().indexOf(" "); if(b!=0) {
	 * edgmsReport.get
	 * (i).setUserName(edgmsReport.get(i).getUserName().substring(b+1,
	 * edgmsReport.get(i).getUserName().length())); }
	 * edgmsReportWithOutInvoice.add(edgmsReport.get(i)); } }
	 * if(edgmsReport.size()!=0){
	 * ////System.out.println("dgmsReport.get(1).getStoreNo()"
	 * +edgmsReport.get(0).getStoreNo());
	 * model.addAttribute("storeNo",edgmsReport.get(0).getStoreNo());
	 * model.addAttribute("storeName",edgmsReport.get(0).getStoreName()); }
	 * 
	 * if(edgmsReportWithInvoice!=null && edgmsReportWithInvoice.size()!=0) {
	 * for (int j=0;j<edgmsReportWithInvoice.size();j++) {
	 * 
	 * totalInvoice+=Double.parseDouble(edgmsReportWithInvoice.get(j).
	 * getInvoiceTotal());
	 * 
	 * } model.addAttribute("totalInvoice", totalInvoice); } else{
	 * model.addAttribute("totalInvoice", ""); }
	 * if(edgmsReportWithOutInvoice!=null &&
	 * edgmsReportWithOutInvoice.size()!=0) { for (int
	 * j=0;j<edgmsReportWithOutInvoice.size();j++) {
	 * 
	 * totalCost+=Double.parseDouble(edgmsReportWithOutInvoice.get(j).getCost());
	 * 
	 * } model.addAttribute("totalCost", totalCost); } else{
	 * model.addAttribute("totalCost", ""); } }else{
	 * ////System.out.println("in else part");
	 * 
	 * if(edgmsReport!=null && edgmsReport.size()>0){ ////System.out.println("1");
	 * model.addAttribute("msg",
	 * "We could not generate the report since there is no data for selected parameters. Please try different parameters."
	 * ); } else{ ////System.out.println("2"); model.addAttribute("msg",
	 * "We could not generate the report since there is no data for selected parameters. Please try different parameters."
	 * ); } }
	 * 
	 * } if(request.getParameter("searchByOptions").equalsIgnoreCase("Date")){
	 * param.setSearchByOptions("Date"); } else{
	 * param.setSearchByOptions("WCDate"); }
	 * model.addAttribute("edgmsReportWithInvoice",edgmsReportWithInvoice);
	 * model
	 * .addAttribute("edgmsReportWithOutInvoice",edgmsReportWithOutInvoice);
	 * param=reportParam; model.addAttribute("param",param); ModelAndView
	 * modelAndView = new ModelAndView("edgmsReport");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 */
	/*
	 * @RequestMapping(value = "/checkParam.htm", method = RequestMethod.GET)
	 * public ModelAndView checkParam(HttpServletRequest request,
	 * HttpServletResponse response) throws Exception { if
	 * (request.getSession(false) == null || (request.getSession(false) != null
	 * && request.getSession( false).getAttribute("user") == null)) { return new
	 * ModelAndView(new RedirectView("../../")); }
	 * ////System.out.println("siteNo="+param.getSiteNo());
	 * ////System.out.println("department="+param.getTradingDept());
	 * ////System.out.println("inputDate="+param.getInputDate());
	 * ////System.out.println("wcDate="+param.getWcDate());
	 * model.addAttribute("param",param); ModelAndView modelAndView = new
	 * ModelAndView("dgmsReport"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 */
	public String y2ToY4Converter(String textDate) {

		Date actualDate = null;

		SimpleDateFormat yyyy = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat yy = new SimpleDateFormat("dd/MM/yy");

		try {
			// //System.out.println("textDate date:"+textDate);
			actualDate = yy.parse(textDate);
			// //System.out.println("actual date:"+actualDate);
		} catch (Exception pe) {
			pe.printStackTrace();
		}

		// system.out.print( textDate + " enhanced:  " );
		// //System.out.println( "output date:"+yyyy.format( actualDate ) );
		return yyyy.format(actualDate);
	}

}
