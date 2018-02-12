package au.com.woolworths.portal.controller;

import java.util.ArrayList;

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

import au.com.woolworths.portal.model.OrderRosterReport;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.OrderRosterReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.OrderRosterReportServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/orderRosterReport")
public class OrderRosterReportController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['OrderRosterReport']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	OrderRosterReportController() {
		model = new ModelMap();
	}

	private static final Logger LOGGER = Logger.getLogger(OrderRosterReportController.class.getName());
	private ModelMap model;

	private OrderRosterReportParam paramForPagination;
	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private OrderRosterReportServiceImpl orderRosterReportService;

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
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		// model.addAttribute("noData", "");
		LOGGER.info("onPageLoad method of OrderRosterReportController");
		ModelAndView modelAndView = new ModelAndView("orderRosterReport");
		// modelAndView.addObject("model", model);
		// modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getOrderRosterReport.htm", method = RequestMethod.POST)
	public ModelAndView getOrderRosterReport(
			@ModelAttribute("orderRosterReport") OrderRosterReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		LOGGER.info("INSIDE getOrderRosterReport mehtod of OrderRosterReportController");

		ModelAndView modelAndView = new ModelAndView("orderRosterContent");
		UserContext userDetail = ((UserContext) request.getSession()
				.getAttribute("user"));

		String siteNo = userDetail.getSiteNo();
		String pagetNo = "1";
		Integer salesOrg = userDetail.getSalesOrg();

		ArrayList<OrderRosterReport> orderRosterReportList = null;
		if (!result.hasErrors()) {
			LOGGER.info("Binding successful");
			//System.out.println(param.getFromDate());
		} else {
			LOGGER.info("Binding error");
		}

		if (param != null) {
			param.setSiteNo(siteNo);
			param.setPageNo(pagetNo);
			param.setSalesOrg(salesOrg.toString());
		}
		paramForPagination = param;

		// //System.out.println("before calling the aqm reason code service");
		// List<AQMReasonCode> list =
		// aqmReasonCodesServiceImpl.getAQMReasonCodes();
		// //System.out.println("after calling the aqm reason code service"+list.size());
		//
		try {
			orderRosterReportList = orderRosterReportService
					.getOrderRosterReport(param,userDetail);
			if (orderRosterReportList != null
					&& orderRosterReportList.size() > 0) {
				param.setOption("1");

				if (orderRosterReportList.get(0).getMsg() != null
						&& orderRosterReportList.get(0).getMsg().trim() != ""
						&& Integer.parseInt(orderRosterReportList.get(0)
								.getMsg().trim()) > 20)
					param.setOption("2");
				// if(orderRosterReportList.size() > 2)

				LOGGER.info("orderRosterReportList size"
						+ orderRosterReportList.size());
				model.addAttribute("orderRosterReportList",
						orderRosterReportList);
			} else {
				param.setOption("3");
				model.addAttribute("orderRosterReportList",
						new ArrayList<OrderRosterReport>());
			}
		} catch (Exception e) {
			param.setOption("4");
			model.addAttribute("orderRosterReportList",
					new ArrayList<OrderRosterReport>());
		}
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getOrderRosterReportForPagination.htm", method = RequestMethod.POST)
	public ModelAndView getOrderRosterReportForPagination(
			@ModelAttribute("orderRosterReport") OrderRosterReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		LOGGER.info("INSIDE getOrderRosterReportForPagination mehtod of OrderRosterReportController");

		ModelAndView modelAndView = new ModelAndView("orderRosterContent");
		UserContext userDetail = ((UserContext) request.getSession()
				.getAttribute("user"));
		if (param != null && param.getPageNo() != null
				&& param.getPageNo() != "") {
			paramForPagination.setPageNo(param.getPageNo());
		}

		ArrayList<OrderRosterReport> orderRosterReportList = null;
		if (!result.hasErrors()) {
			LOGGER.info("Binding successful");
			//System.out.println(param.getFromDate());
		} else {
			LOGGER.info("Binding error");
		}
		try {
			orderRosterReportList = orderRosterReportService
					.getOrderRosterReport(paramForPagination,userDetail);
			if (orderRosterReportList != null
					&& orderRosterReportList.size() > 0) {
				param.setOption("1");
				if (orderRosterReportList.get(0).getMsg() != null
						&& orderRosterReportList.get(0).getMsg().trim() != ""
						&& Integer.parseInt(orderRosterReportList.get(0)
								.getMsg().trim()) > 20)
					param.setOption("2");
				// if(orderRosterReportList.get(0).getMsg().trim()!=null &&
				// Integer.parseInt(orderRosterReportList.get(0).getMsg().trim())>20)
				// if(orderRosterReportList.size() > 2)
				// param.setOption("2");
				LOGGER.info("orderRosterReportList size"
						+ orderRosterReportList.size());
				model.addAttribute("orderRosterReportList",
						orderRosterReportList);
			} else {
				param.setOption("3");
				model.addAttribute("orderRosterReportList",
						new ArrayList<OrderRosterReport>());
			}
		} catch (Exception e) {
			param.setOption("4");
			model.addAttribute("orderRosterReportList",
					new ArrayList<OrderRosterReport>());
		}
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when verify button clicked on create warehouse order and
	// order lookup screen.
	@RequestMapping(value = "/autocomplete.htm", method = RequestMethod.GET)
	public ModelAndView autocomplete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		// //System.out.println("autocomplete" );
		// String vendordesc=(String) request.getParameter("vendorDesc");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		String vendorName = (String) request.getParameter("vendorName");

		String srcOfSupp = (String) request.getParameter("sourceSupply");
		// //System.out.println("srcOfSupp"+srcOfSupp);
		// //System.out.println("vendorNo"+vendorNo);
		// //System.out.println("vendorName"+vendorName);
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

				modelAndView = new ModelAndView("VendorLookup");
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
			e.printStackTrace();

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
}