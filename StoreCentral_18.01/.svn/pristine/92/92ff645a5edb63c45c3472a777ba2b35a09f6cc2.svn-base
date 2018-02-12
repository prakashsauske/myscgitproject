/**
 * Controller used for create order on receipt
 */
package au.com.woolworths.portal.controller;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.InvoiceReconcilationModel;
import au.com.woolworths.portal.model.Order;
import au.com.woolworths.portal.model.OrderDetail;
import au.com.woolworths.portal.model.OrderType;
import au.com.woolworths.portal.model.SalesHistory;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoresNearByModel;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.CancelOrderParam;
import au.com.woolworths.portal.param.CreateParam;
import au.com.woolworths.portal.param.InvoiceReconcilationParam;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.param.OrderParam;
import au.com.woolworths.portal.param.ReceiveParam;
import au.com.woolworths.portal.param.TemperatureSetParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.service.InvoiceReconcilationServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.PReqServiceImpl;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/poReceipt")
@Scope("session")
public class POReciptController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['CreateOrderOnReceipt']}") applicationSettings CR
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private PReqServiceImpl orderService;

	@Autowired
	private OrderServiceImpl orderNormalService;

	@Autowired
	private ArticleServiceImpl articleService;

	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	private ArrayList<OrderDetail> orderAdjust;
	private ManualOrderParam manualOrderParam;
	private List<ArticleSearchResults> articleDescriptionResults;

	private CreateParam createOrderParam;
	private OrderDetail orderDet;
	private String disable;
	private boolean cancelStatus;
	private boolean receiveStatus;

	private ArrayList<OrderDetail> orderDetails;
	private ArrayList<OrderDetail> orderDetailBackup;
	private ArrayList<OrderDetail> bkUpOrderDetail;

	List<ArticleSearchResults> articleSearchResults = new ArrayList<ArticleSearchResults>();

	ArrayList<ArticleSearchResults> updatedArticleResults = new ArrayList<ArticleSearchResults>();

	List<ArticleSearchResults> articleSearchResultsFetched = null;

	List<ArticleSearchResults> articleSearchResultsforCreate;

	List<ArticleSearchResults> addArtSearchResults = new ArrayList<ArticleSearchResults>();
	List<ArticleSearchResults> articleSearchResultsForReceive;

	private boolean postSuccessFlag = false;

	private OrderParam param;
	private ModelMap model;
	private Order order;
	private Integer backUpIndex;
	private ArrayList<OrderDetail> orderDetail;
	ReceiveParam receiveParam;

	List<Order> orderList = null;
	List<ArticleSearchResults> articleList;

	private final static String Open = "open";
	private final static String Authorized = "Authorised";
	private final static String All = "All";
	private final static String Cancelled = "Cancelled";
	private final static String Received = "Received";
	private final static String Closed = "Closed";

	private ModelMap modelRecon;
	private InvoiceReconcilationParam paramRecon;

	List<Department> deptInfoList;

	private ArrayList<InvoiceReconcilationModel> reconciliationReport;
	private ArrayList<InvoiceReconcilationModel> reconciliationReportPrint;

	@Autowired
	private InvoiceReconcilationServiceImpl invoiceReconcileServiceImpl;

	public InvoiceReconcilationServiceImpl getInvoiceReconcileServiceImpl() {
		return invoiceReconcileServiceImpl;
	}

	public void setInvoiceReconcileServiceImpl(
			InvoiceReconcilationServiceImpl invoiceReconcileServiceImpl) {
		this.invoiceReconcileServiceImpl = invoiceReconcileServiceImpl;
	}

	// public OrderController() {
	//
	// this.param = new OrderParam();
	// this.model = new ModelMap();
	//
	// }
	/*
	 * private String dateConverter(String ){ try{ DateFormat dateFormat = new
	 * SimpleDateFormat("dd/MM/yyyy"); Date date = new Date();
	 * ////System.out.println(dateFormat.format(date)); String currentDate =
	 * dateFormat.format(date); Calendar cal = Calendar.getInstance();
	 * cal.setTime(dateFormat.parse(currentDate)); cal.add(Calendar.DATE, 1);
	 * cal.add(Calendar.DATE, 1); String convertedDate =
	 * dateFormat.format(cal.getTime()); return convertedDate; }
	 */
	// catch(Exception e)
	// {
	// return "";
	// }
	// }
	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		param = new OrderParam();
		model = new ModelMap();
		setOrderType();
		setSalesOrg();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		// //System.out.println(dateFormat.format(date));
		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		try {
			cal.setTime(dateFormat.parse(currentDate));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		cal.add(Calendar.DATE, 30);
		String toDate = dateFormat.format(cal.getTime());
		String deliveryFromDate = currentDate;

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		param.setPageNo(1);
		param.setFromDate(deliveryFromDate);
		param.setToDate(toDate);
		String listCount = "";
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {

			model.addAttribute("noData", "");
			orderList = orderService.getOrders(param,user);

			if (orderList != null && orderList.size() == 1) {

				if (orderList.get(0).getOrderNo() == ""
						|| orderList.get(0).getOrderNo() == null
						|| orderList.get(0).getMsg()
								.equalsIgnoreCase("No Data Found")) {
					model.addAttribute("noResults",
							"Sorry, no results found for your search criteria. Please try again");
					orderList = new ArrayList<Order>();
				} else {
					model.addAttribute("noResults", "");
					listCount = "0";
					param.setRecordCount(Integer.parseInt(listCount));
					return requestOrderDetail(request, response);
				}

			} else if (orderList != null && orderList.size() > 1) {
				listCount = orderList.get(0).getMsg();
				param.setRecordCount(Integer.parseInt(listCount));
				model.addAttribute("noResults", "");
			} else if (orderList == null || orderList.size() == 0) {
				model.addAttribute("noResults",
						"Sorry, no results found for your search criteria. Please try again");
			}

		} catch (Exception e) {

			orderList = new ArrayList<Order>();
			model.addAttribute("param", param);
			model.addAttribute("noResults",
					"Sorry, no results found for your search criteria. Please try again");
		}
		model.addAttribute("orderList", orderList);
		model.addAttribute("param", param);
		// model.addAttribute("noResults", "");

		ModelAndView modelAndView = new ModelAndView("orderLookup");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	private void setOrderType() {

		ArrayList<OrderType> orderTypes = new ArrayList<OrderType>();

		OrderType type1 = new OrderType("ZNB", "Standard PO");
		OrderType type2 = new OrderType("ZUB", "Retail STO(IBT)");
		OrderType type3 = new OrderType("ZB", "BOM Pur Req");
		OrderType type4 = new OrderType("ZP", "5 Std PReq Prd");

		orderTypes.add(type1);
		orderTypes.add(type2);
		orderTypes.add(type3);
		orderTypes.add(type4);

		model.addAttribute("orderTypes", orderTypes);

		model.addAttribute("param", param);

	}

	private void setSalesOrg() {

		ArrayList<SalesOrgModel> salesOrgTypes = new ArrayList<SalesOrgModel>();
		SalesOrgModel type11 = new SalesOrgModel("1005",
				"Woolworths Supermarkets");
		SalesOrgModel type1 = new SalesOrgModel("1010", "BWS");
		SalesOrgModel type2 = new SalesOrgModel("1015", "Dan Murphy's");
		SalesOrgModel type3 = new SalesOrgModel("1020", "Woolworths Petrol");
		SalesOrgModel type4 = new SalesOrgModel("1025", "Thomas Dux");
		SalesOrgModel type5 = new SalesOrgModel("1030", "New Small Stores");
		SalesOrgModel type6 = new SalesOrgModel("2010", "Countdown");
		SalesOrgModel type7 = new SalesOrgModel("2015", "Gull Petrol");
		SalesOrgModel type8 = new SalesOrgModel("2030",
				"NZ Distribution Centres");
		SalesOrgModel type9 = new SalesOrgModel("9050", "SuperValue");
		SalesOrgModel type10 = new SalesOrgModel("9060", "Fresh Choice");

		salesOrgTypes.add(type1);
		salesOrgTypes.add(type2);
		salesOrgTypes.add(type3);
		salesOrgTypes.add(type4);
		salesOrgTypes.add(type5);
		salesOrgTypes.add(type6);
		salesOrgTypes.add(type7);
		salesOrgTypes.add(type8);
		salesOrgTypes.add(type9);
		salesOrgTypes.add(type10);
		salesOrgTypes.add(type11);

		model.addAttribute("salesOrgTypes", salesOrgTypes);

		model.addAttribute("param", param);

	}

	public static String formatDate(String textDate) {
		// String textDate = "03/18/01";
		Date actualDate = null;

		SimpleDateFormat yy = new SimpleDateFormat("dd/MM/yy");
		SimpleDateFormat yyyy = new SimpleDateFormat("dd/MM/yyyy");

		try {
			actualDate = yy.parse(textDate);
		} catch (Exception pe) {
			// //System.out.println( pe.toString() );
		}

		// system.out.print( textDate + " enhanced:  " );
		// //System.out.println( yyyy.format( actualDate ) );
		return yyyy.format(actualDate);
	}

	@RequestMapping(value = "/advancedOrderSearch.htm", method = RequestMethod.POST)
	public ModelAndView advancedOrderSearch(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		model.addAttribute("openOrder", "");
		String advaceFlag = request.getParameter("advanceFlag");
		String deliveryFromDate = request.getParameter("deliveryFromDate");
		String fromDate = request.getParameter("fromDate");
		// //System.out.println("fromDate"+fromDate);
		// //System.out.println("deliveryFromDate"+deliveryFromDate);
		if (fromDate == "" || fromDate == null) {
			if (deliveryFromDate != ""
					&& !deliveryFromDate.equalsIgnoreCase("dd/mm/yyyy")
					&& deliveryFromDate != null) {
				if (deliveryFromDate.length() == 8) {
					deliveryFromDate = OrderController
							.formatDate(deliveryFromDate);

				}
				param.setFromDate(deliveryFromDate);
				param.setParamRetain("true");
				model.addAttribute("paramRetain", true);
			} else {
				model.addAttribute("paramRetain", false);
				param.setParamRetain("false");
				if (advaceFlag.equalsIgnoreCase("true"))
					param.setFromDate(fromDate);
				else
					param.setFromDate("");

			}
		} else {
			if (fromDate.length() == 8) {
				fromDate = OrderController.formatDate(fromDate);

			}
			model.addAttribute("paramRetain", false);
			if (advaceFlag.equalsIgnoreCase("true"))
				param.setFromDate(fromDate);
			else
				param.setFromDate("");
			param.setParamRetain("false");
		}
		String deliveryToDate = request.getParameter("deliveryToDate");
		String toDate = request.getParameter("toDate");
		if (toDate == "" || toDate == null) {

			if (deliveryToDate != ""
					&& !deliveryToDate.equalsIgnoreCase("dd/mm/yyyy")
					&& deliveryToDate != null) {
				if (deliveryToDate.length() == 8) {
					deliveryToDate = OrderController.formatDate(deliveryToDate);

				}
				param.setToDate(deliveryToDate);
			} else {
				if (advaceFlag.equalsIgnoreCase("true"))
					param.setToDate(toDate);
				else
					param.setToDate("");
			}
		} else {
			if (toDate.length() == 8) {
				toDate = OrderController.formatDate(toDate);

			}
			if (advaceFlag.equalsIgnoreCase("true"))
				param.setToDate(toDate);
			else
				param.setToDate("");
		}
		// String pageNo=request.getParameter("1");
		// ////System.out.println("pageNo"+pageNo);
		String listCount = "";
		param.setOrderNo(request.getParameter("orderNo"));
		param.setPageNo(1);
		param.setSearchByOptions(request.getParameter("searchByOptions"));
		param.setOrderType(request.getParameter("orderType"));
		if (advaceFlag.equalsIgnoreCase("true")) {

			param.setOrderStatus(request.getParameter("orderStatus"));

			param.setSrcOfSuppliy(request.getParameter("dropdown"));
			param.setSuppNo(request.getParameter("suppNo"));
			param.setSuppName(request.getParameter("suppName"));
			param.setStoreOrVendor(request.getParameter("storeOrVendor"));
			param.setWareHouseFlag(request.getParameter("wareHouseFlag"));

			if (request.getParameter("rosterFromDate") != null
					&& request.getParameter("rosterFromDate") != ""
					&& request.getParameter("rosterFromDate").length() == 8) {

				param.setRosterFromDate(OrderController.formatDate(request
						.getParameter("rosterFromDate")));

			} else {
				param.setRosterFromDate(request.getParameter("rosterFromDate"));
			}
			if (request.getParameter("rosterToDate") != null
					&& request.getParameter("rosterToDate") != ""
					&& request.getParameter("rosterToDate").length() == 8) {

				param.setRosterToDate(OrderController.formatDate(request
						.getParameter("rosterToDate")));

			} else {
				param.setRosterToDate(request.getParameter("rosterToDate"));
			}
		} else {
			param.setOrderStatus("");
			param.setSrcOfSuppliy("");
			param.setSuppNo("");
			param.setSuppName("");
			param.setRosterFromDate("");
			param.setRosterToDate("");
		}

		// param.setRosterToDate(request.getParameter("rosterToDate"));
		// param.setFromDate(request.getParameter("fromDate"));
		// param.setToDate(request.getParameter("toDate"));
		model.addAttribute("orderList", new ArrayList<Order>());
		cancelStatus = false;
		model.addAttribute("cancelStatus", cancelStatus);

		// String ordertype = request.getParameter("orderType");
		// String rosterDate = request.getParameter("rosterDate");

		try {
			/*
			 * if (ordertype.equals("0") || (StringUtils.hasText(rosterDate) &&
			 * StringUtils.hasText(request.getParameter("orderNo")))) {
			 * 
			 * ModelAndView modelAndView = new ModelAndView("orderLookup",
			 * "param", param); model.addAttribute("noResults",
			 * "Please select order type & roster date to search");
			 * model.addAttribute("param", param);
			 * modelAndView.addObject("model", model);
			 * 
			 * modelAndView.addAllObjects(model); return modelAndView;
			 * 
			 * } else {
			 */
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			model.addAttribute("noData", "");
			orderList = orderService.getOrders(param,user);

			if (orderList != null && orderList.size() == 1) {

				if (orderList.get(0).getOrderNo() == ""
						|| orderList.get(0).getOrderNo() == null
						|| orderList.get(0).getMsg()
								.equalsIgnoreCase("No Data Found")) {
					model.addAttribute("noResults",
							"Sorry, no results found for your search criteria. Please try again");
					orderList = new ArrayList<Order>();
				} else {
					model.addAttribute("noResults", "");
					listCount = "0";
					param.setRecordCount(Integer.parseInt(listCount));
					return requestOrderDetail(request, response);
				}

			} else if (orderList != null && orderList.size() > 1) {
				listCount = orderList.get(0).getMsg();
				param.setRecordCount(Integer.parseInt(listCount));
				model.addAttribute("noResults", "");
			} else if (orderList == null || orderList.size() == 0) {
				model.addAttribute("noResults",
						"Sorry, no results found for your search criteria. Please try again");
			}

		} catch (Exception e) {

			orderList = new ArrayList<Order>();
			model.addAttribute("param", param);
			model.addAttribute("noResults",
					"Sorry, no results found for your search criteria. Please try again");
		}

		model.addAttribute("orderList", orderList);
		model.addAttribute("pagecount", listCount);
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("orderLookup", "param",
				param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	@RequestMapping(value = "/basicOrderSearch.htm", method = RequestMethod.POST)
	public ModelAndView basicOrderSearch(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}

		param.setOrderNo(request.getParameter("orderNo"));
		param.setOrderStatus("");
		param.setFromDate("");
		param.setToDate("");
		param.setOrderType(request.getParameter("orderType"));
		param.setSrcOfSuppliy("");
		param.setSuppNo("");
		param.setSuppName("");
		param.setRosterFromDate("");
		param.setRosterToDate("");

		model.addAttribute("orderList", new ArrayList<Order>());

		// String ordertype = request.getParameter("orderType");
		// String rosterDate = request.getParameter("rosterDate");

		try {
			/*
			 * if (ordertype.equals("0") || (StringUtils.hasText(rosterDate) &&
			 * StringUtils.hasText(request.getParameter("orderNo")))) {
			 * 
			 * ModelAndView modelAndView = new ModelAndView("orderLookup",
			 * "param", param); model.addAttribute("noResults",
			 * "Please select order type & roster date to search");
			 * model.addAttribute("param", param);
			 * modelAndView.addObject("model", model);
			 * 
			 * modelAndView.addAllObjects(model); return modelAndView;
			 * 
			 * } else {
			 */
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			model.addAttribute("noData", "");
			orderList = orderService.getOrders(param,user);

			if (orderList != null && orderList.size() == 1) {
				if (orderList.get(0).getMsg().trim().length() > 0) {
					model.addAttribute("noResults", orderList.get(0).getMsg());
					orderList = new ArrayList<Order>();
				} else {
					model.addAttribute("noResults", "");
					return requestOrderDetail(request, response);
				}

			} else if (orderList != null && orderList.size() > 1) {
				model.addAttribute("noResults", "");
			} else if (orderList == null || orderList.size() == 0) {
				model.addAttribute("noResults",
						"Sorry, no results found for your search criteria. Please try again");
			}

		} catch (Exception e) {

			orderList = new ArrayList<Order>();
			model.addAttribute("param", param);
			model.addAttribute("noResults",
					"Sorry, no results found for your search criteria. Please try again");
		}

		model.addAttribute("orderList", orderList);
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("orderLookup", "param",
				param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	/********************* ORDER DETAILS **********************/

	@RequestMapping(value = "/requestOrderDetail.htm", method = RequestMethod.POST)
	public ModelAndView requestOrderDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestOrderDetail");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		cancelStatus = false;
		receiveStatus = false;
		order = null;
		String reconFlag = request.getParameter("reconFlag");
		if (reconFlag == null || reconFlag == "") {
			param.setReconFlag("");
			model.addAttribute("openOrder", "");
			if (request.getParameter("index") != null
					&& request.getParameter("index").trim().length() > 0) {
				if (orderList != null && orderList.size() > 0) {
					order = (Order) orderList.get(Integer.parseInt(request
							.getParameter("index")));
				}

			} else {
				if (orderList != null && orderList.size() > 0) {
					order = (Order) orderList.get(0);
				}
			}
		} else if (reconFlag != null && reconFlag != ""
				&& reconFlag.equalsIgnoreCase("true")) {
			// String orderNo=request.getParameter("orderNo");
			param = new OrderParam();
			model = new ModelMap();
			param.setReconFlag("true");
			if (reconciliationReport != null && reconciliationReport.size() > 0
					&& reconciliationReport.get(0).getPurchaseOrder() != "") {
				String orderNo = "";
				if (request.getParameter("index") != null
						&& request.getParameter("index").trim().length() > 0) {
					orderNo = reconciliationReport.get(
							Integer.parseInt(request.getParameter("index")))
							.getPurchaseOrder();
				}
				// //System.out.println("orderNO"+orderNo);
				param.setOrderNo(orderNo);
				param.setSearchByOptions("number");
				param.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
				UserContext user=(UserContext) request.getSession(
						false).getAttribute("user");
				try {
					orderList = orderService.getOrders(param,user);
				} catch (Exception e) {
					e.printStackTrace();
					paramRecon.setRecordCount(0);
					modelRecon.addAttribute("reconcileList",
							new ArrayList<InvoiceReconcilationModel>());
					modelRecon
							.addAttribute("noData",
									"Could not find order details. Please try after some time.");
					ModelAndView modelAndView1 = new ModelAndView(
							"reconciliationReport");
					modelAndView1.addObject("model", modelRecon);
					modelAndView1.addAllObjects(modelRecon);
					return modelAndView1;

				}
				if (orderList != null && orderList.size() > 0) {
					order = (Order) orderList.get(0);

				}
			}

		}

		model.addAttribute("cancelStatus", cancelStatus);
		model.addAttribute("receiveStatus", receiveStatus);
		model.addAttribute("hideContent", "false");
		String updateRights = "";
		if (order != null) {
			// //System.out.println("order.getOrderStatus()="+order.getOrderStatus());
			/*
			 * if(order.getOrderStatus().equalsIgnoreCase(Authorized) ||
			 * order.getOrderStatus().equalsIgnoreCase(Open)) {
			 */
			if (order.getOrderStatus().equalsIgnoreCase(Open)) {
				updateRights = "true";
				model.addAttribute("updateRights", updateRights);
			} else {
				updateRights = "false";
				// disable="OPEN";
				model.addAttribute("updateRights", updateRights);
			}
		}
		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");
		String orderType = "";
		String orderNo = "";
		if (order != null) {
			String rosterDate = order.getRosterDate();
			orderNo = order.getOrderNo();
			orderType = order.getOrderType();
		}
		String siteNo = userContext.getSiteNo();

		// param = new OrderParam();
		// model = new ModelMap();

		// param.setRosterDate(rosterDate);
		param.setSiteNo(siteNo);

		String tempOrderType = param.getOrderType();

		param.setOrderType(orderType);
		orderDetail = new ArrayList<OrderDetail>();
		bkUpOrderDetail = new ArrayList<OrderDetail>();
		try {
			orderDetail = orderService.getOrderDetails(param, orderNo,userContext);

			param.setOrderType(tempOrderType);

		} catch (Exception e) {
			// //System.out.println("Exception" + e + "in order details method");

		}

		if (orderDetail != null && orderDetail.size() != 0) {
			orderDet = orderDetail.get(0);
			model.addAttribute("orderdet", orderDet);
			model.addAttribute("size", orderDetail.size());

		} else {
			orderDet = new OrderDetail();
			model.addAttribute("orderdet", orderDet);
			model.addAttribute("size", "0");

		}
		/*
		 * if(order!=null && (order.getOrderStatus().equalsIgnoreCase("Open")
		 * ||order.getOrderStatus().equalsIgnoreCase("Closed")
		 * ||order.getOrderStatus().equalsIgnoreCase("Cancelled")
		 * ||order.getOrderStatus().equalsIgnoreCase("Received"))) {
		 */
		// for open order
		if (order != null
				&& (order.getOrderStatus().equalsIgnoreCase("Closed")
						|| order.getOrderStatus().equalsIgnoreCase("Cancelled") || order
						.getOrderStatus().equalsIgnoreCase("Received"))) {
			String invoiceNo = orderDet.getInvoiceNo();
			String invoiceTotal = orderDet.getInvoiceTotal();
			String gst = orderDet.getGstAmount();
			String delDock = orderDet.getDockCode();
			orderAdjust = new ArrayList<OrderDetail>();
			ModelAndView modelAndView;
			receiveParam = new ReceiveParam();
			// new
			if (param != null && param.getReconFlag() != null
					&& param.getReconFlag().equalsIgnoreCase("true")) {
				receiveParam.setReconFlag("true");
				// //System.out.println(receiveParam.getReconFlag());
			} else {
				receiveParam.setReconFlag("");
			}
			receiveParam.setVendorAuthNo(order.getVendorclaim());
			model.addAttribute("receiveParam", receiveParam);
			model.addAttribute("msg", "");
			model.addAttribute("hideContent", "true");
			/*
			 * if(orderDetail!=null&&orderDetail.size()>0) { for(int
			 * i=0;i<orderDetail.size();i++) {
			 * orderDetail.get(i).setReceivedQty(
			 * orderDetail.get(i).getOrderQty()); } }
			 */

			receiveParam.setInvoiceNo(invoiceNo);
			receiveParam.setInvoiceTotal(invoiceTotal);
			receiveParam.setGst(gst);
			receiveParam.setDelDock(delDock);
			model.addAttribute("receiveParam", receiveParam);
			model.addAttribute("msg", "");
			if (order.getOrderType().equalsIgnoreCase("ZUB")) {
				modelAndView = new ModelAndView("ibtGoodsReceipt");
			} else {
				modelAndView = new ModelAndView("receiveOrder");
			}
			model.addAttribute("order", order);
			model.addAttribute("param", param);
			model.addAttribute("orderDetails", orderDetail);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
		if (order != null && (order.getOrderStatus().equalsIgnoreCase(Open))) {
			model.addAttribute("openOrder", "true");
		}
		model.addAttribute("param", param);
		model.addAttribute("receiveParam", new ReceiveParam());

		// setting the store name

		if (order != null && "ZUB".equalsIgnoreCase(order.getOrderType())) {
			ArrayList<Store> storeList = serviceImpl.getStoreDetails("", "",
					order.getRecvSite(),userContext);
			order.setRecvSiteName((storeList.get(0).getSiteDescription()));

		} else {
			order.setRecvSiteName(((UserContext) request.getSession()
					.getAttribute("user")).getSiteName());
		}
		model.addAttribute("order", order);
		model.addAttribute("orderDetails", orderDetail);
		ModelAndView modelAndView = new ModelAndView("orderDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/backToOrderDetails.htm", method = RequestMethod.GET)
	public ModelAndView backToOrderDetails(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestOrderDetail");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("param", param);
		model.addAttribute("updateRights", "");

		/*
		 * order = null; if (request.getParameter("index") != null &&
		 * request.getParameter("index").trim().length()>0) { order = (Order)
		 * orderList.get(Integer.parseInt(request .getParameter("index"))); }
		 * else { order = (Order) orderList.get(0); }
		 */

		if (cancelStatus == true) {
			model.addAttribute("cancelStatus", cancelStatus);
		}

		if (receiveStatus == true) {
			model.addAttribute("receiveStatus", receiveStatus);
			model.remove("orderDetails");
			model.addAttribute("orderDetails", orderDetailBackup);

		} else {

			model.addAttribute("orderDetails", orderDetail);
		}
		/*
		 * if(order!=null) {
		 * ////System.out.println("order.getOrderStatus()="+order
		 * .getOrderStatus());
		 * 
		 * if(order.getOrderStatus().equalsIgnoreCase("Fully Invoiced") ||
		 * order.getOrderStatus().equalsIgnoreCase("Fully Received")
		 * ||order.getOrderStatus().equalsIgnoreCase("Closed")||
		 * order.getOrderStatus().equalsIgnoreCase("Cancelled") ||
		 * order.getOrderStatus().equalsIgnoreCase("Received") ) {
		 * disable="CLOSE"; model.addAttribute("disable","CLOSE"); } else
		 * if(order.getOrderStatus().equalsIgnoreCase("Partially Invoiced")
		 * ||order.getOrderStatus().equalsIgnoreCase("Partially Received")) {
		 * disable="PARTIAL"; model.addAttribute("disable","PARTIAL"); } else {
		 * disable="OPEN"; model.addAttribute("disable","OPEN"); } }
		 */
		/*
		 * UserContext userContext = (UserContext) request.getSession()
		 * .getAttribute("user"); String orderNo=""; String orderType
		 * if(order!=null){ String rosterDate = order.getRosterDate(); orderNo =
		 * order.getOrderNo(); String orderType = order.getOrderType(); String
		 * siteNo = userContext.getSiteNo(); }
		 */

		// param = new OrderParam();
		// model = new ModelMap();

		// param.setRosterDate(rosterDate);
		// param.setSiteNo(siteNo);
		// param.setOrderType(orderType);
		// orderDetail = new ArrayList<OrderDetail>();
		// bkUpOrderDetail = new ArrayList<OrderDetail>();
		/*
		 * try { orderDetail = orderService.getOrderDetails(param, orderNo);
		 * 
		 * } catch (Exception e) { ////System.out.println("Exception" + e +
		 * "in order details method");
		 * 
		 * }
		 */

		if (orderDetail != null && orderDetail.size() != 0) {
			orderDet = orderDetail.get(0);
			model.addAttribute("orderdet", orderDet);
			model.addAttribute("size", orderDetail.size());

		} else {
			orderDet = new OrderDetail();
			model.addAttribute("orderdet", orderDet);
			model.addAttribute("size", "0");

		}

		model.addAttribute("order", order);

		ModelAndView modelAndView = new ModelAndView("orderDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/********************* RECEIVE ORDER **********************/

	/*
	 * @RequestMapping(value = "/updateOrderPageLoad.htm", method =
	 * RequestMethod.GET) public ModelAndView
	 * updateOrderPageLoad(HttpServletRequest request, HttpServletResponse
	 * response) {
	 * 
	 * if (request.getSession(false) == null || (request.getSession(false) !=
	 * null && request.getSession( false).getAttribute("user") == null)) {
	 * return new ModelAndView(new RedirectView("../../"));
	 * 
	 * }
	 * 
	 * model.addAttribute("receiveParam", receiveParam);
	 * model.addAttribute("msg", ""); ModelAndView modelAndView = new
	 * ModelAndView("updateOrder");
	 * 
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 */

	/********************* BACK TO ORDER SEARCH FROM ORDER DETAILS **********************/

	@RequestMapping(value = "/backToOrderSearch.htm", method = RequestMethod.GET)
	public ModelAndView backToOrderSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("orderLookup");
		model.addAttribute("openOrder", "");
		model.addAttribute("param", param);
		// model.addAttribute("disable",disable);
		// model.addAttribute("status", postStatus);
		if (cancelStatus == true) {
			if (orderList != null && orderList.size() >= 1) {
				for (int i = 0; i < orderList.size(); i++) {
					if (orderList.get(i).getOrderNo()
							.equals(order.getOrderNo())) {
						orderList.get(i).setOrderStatus("Cancelled");
					}

				}
			}
		}
		if (receiveStatus == true) {
			if (orderList != null && orderList.size() >= 1) {
				for (int i = 0; i < orderList.size(); i++) {
					if (orderList.get(i).getOrderNo()
							.equals(order.getOrderNo())) {
						orderList.get(i).setOrderStatus("Received");
					}

				}
			}
		}

		model.addAttribute("postStatus", "");
		model.addAttribute("orderList", orderList);
		model.addAttribute("noResults", "");
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/addArticle.htm", method = RequestMethod.GET)
	public ModelAndView addArticle(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}

		ModelAndView modelAndView = new ModelAndView("receiveOrder");

		List<ArticleSearchResults> articleSearchResults = null;
		if (request.getParameter("flag").equalsIgnoreCase("Finalize")) {
			model.addAttribute("invalidQty", "");
			receiveParam.setSiteNo(param.getSiteNo());
			receiveParam.setOrderNo(order.getOrderNo());
			receiveParam.setVendorNo(order.getSuppNo());
			receiveParam.setOrder_received(order.getOrder_received());

			// boolean statusArticlePost=false;
			// //System.out.println("inv no"+receiveParam.getInvoiceNo());
			// //System.out.println("dock "+receiveParam.getDelDock());
			/*
			 * try{ statusArticlePost =
			 * orderService.receiveOrderAddArticle(orderDetail, receiveParam);
			 * ////System.out.println("statusArticlePost"+statusArticlePost);
			 * }catch(Exception e){ e.printStackTrace(); }
			 */
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			String successStatus = "false";
			try {
				if (receiveParam.getInvoiceNo() != null
						&& receiveParam.getInvoiceNo().trim().length() > 0) {
					// //System.out.println("call add inv");
					String status = orderService.receiveOrderAddInv(
							orderDetailBackup, receiveParam,user);
					// //System.out.println("status in add inv cntrlr:"+status);

					if (status == null) {
						successStatus = "true";
						receiveStatus = true;
						order.setOrderStatus("Received");
					} else {
						successStatus = status;
						receiveStatus = false;
					}
					model.addAttribute("receiveStatus", receiveStatus);
					model.addAttribute("receiveParam", receiveParam);
					model.addAttribute("msg", successStatus);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}
			try {
				if (receiveParam.getDelDock() != null
						&& receiveParam.getDelDock().trim().length() > 0) {

					// //System.out.println("test call add dock");
					String status = orderService.receiveOrderAddDock(
							orderDetailBackup, receiveParam,user);
					// //System.out.println("status in add dock cntrlr:"+status);

					if (status == null) {
						successStatus = "Request for cancelling the order successfully submitted";
						receiveStatus = true;
						order.setOrderStatus("Received");
					} else {
						successStatus = status;
						receiveStatus = false;
						// order.setOrderStatus("Received");
					}
					model.addAttribute("receiveStatus", receiveStatus);
					model.addAttribute("receiveParam", receiveParam);
					model.addAttribute("msg", successStatus);

				}
			} catch (Exception e) {
				e.printStackTrace();
			}

			// new line

			/*
			 * if(status && statusArticlePost){ successStatus="true";
			 * receiveStatus=true; order.setOrderStatus("Received"); }
			 */

		} else if (request.getParameter("flag").equalsIgnoreCase("cancelOrder")) {

			// //System.out.println("inside cancel cal blk in controller");
			receiveParam.setOrderNo(order.getOrderNo());
			// model = new ModelMap();

			// ModelAndView modelAndViewforCancel = new
			// ModelAndView("receiveOrder");

			CancelOrderParam cancelOrderParam = new CancelOrderParam();

			cancelOrderParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());
			cancelOrderParam.setPurOrdNo(order.getOrderNo());
			// //System.out.println("order no from object"+order.getOrderNo());
			String createStatus = "";
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			try {
				createStatus = orderService.cancelOrder(cancelOrderParam,user);
			} catch (Exception e) {
				e.printStackTrace();
			}
			String postStatus = null;
			if (createStatus == null) {
				postStatus = "Request for cancelling the order successfully submitted";
				cancelStatus = true;
				order.setOrderStatus("Cancelled");
			} else {
				postStatus = createStatus;
				cancelStatus = false;
			}
			receiveParam.setSiteNo(param.getSiteNo());
			// //System.out.println("site"+receiveParam.getSiteNo());
			receiveParam.setOrderNo(order.getOrderNo());
			// //System.out.println("order"+receiveParam.getOrderNo());
			receiveParam.setVendorNo(order.getSuppNo());
			// //System.out.println("vendor no"+receiveParam.getVendorNo());
			receiveParam.setOrder_received(order.getOrder_received());
			// //System.out.println("ord rec"+receiveParam.getOrder_received());

			model.addAttribute("cancelStatus", cancelStatus);
			model.addAttribute("receiveParam", receiveParam);
			model.addAttribute("msg", postStatus);
			model.addAttribute("invalidQty", "");

		} else {
			// receiveParam.setRadioBtn(request.getParameter("radioBtn"));
			receiveParam.setArticleNo(request.getParameter("artEAN"));
			receiveParam.setRecqty(request.getParameter("recqty"));
			if (request.getParameter("articleType").equalsIgnoreCase(
					"ArticleNumber")) {
				receiveParam.setArticleType("articleNo");
			} else if (request.getParameter("articleType").equalsIgnoreCase(
					"EAN")) {
				receiveParam.setArticleType("ean");
			} else {
				receiveParam.setArticleType("articleNo");
			}
			receiveParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());
			if (order != null) {
				receiveParam.setSuppName(order.getSuppNo());
				receiveParam.setSrcOfSupply(order.getSos());
			}

			model.addAttribute("receiveParam", receiveParam);

			if (orderDetailBackup != null && orderDetailBackup.size() != 0) {

				for (int i = 0; i < orderDetailBackup.size(); i++) {
					if (receiveParam.getArticleNo().equals(
							orderDetailBackup.get(i).getArticle())) {
						model.addAttribute("invalidQty", "");
						model.addAttribute("msg",
								"Article already exists in the list");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}

				}
			}

			// //System.out.println("receiveParam.getRadioBtn()="
			// + receiveParam.getRadioBtn());
			OrderDetail orde = new OrderDetail();
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			try {

				articleSearchResults = orderService.searchArticle(receiveParam,user);
				/*
				 * receiveParam.getArtEAN(), param.getSiteNo(),
				 * receiveParam.getRadioBtn());
				 */

			} catch (Exception e) {
				e.printStackTrace();
			}
			if (orderDetailBackup != null && orderDetailBackup.size() != 0) {
				for (int i = 0; i < orderDetailBackup.size(); i++) {
					if (articleSearchResults != null
							&& articleSearchResults.size() != 0) {
						if (orderDetailBackup
								.get(i)
								.getArticle()
								.equals(articleSearchResults.get(0)
										.getArticleNo())) {
							model.addAttribute("invalidQty", "");
							model.addAttribute("msg", "Article '"
									+ articleSearchResults.get(0)
											.getArticleNo()
									+ "' already exists in the list.");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					}

				}
			}

			if (articleSearchResults != null
					&& articleSearchResults.size() != 0
					&& articleSearchResults.get(0).getArticleNo() != null
					&& articleSearchResults.get(0).getArticleNo() != "") {

				ArticleSearchResults results = articleSearchResults.get(0);
				if (results.getBaseUOMDesc() != null
						&& results.getBaseUOMDesc() != "") {
					if (results.getBaseUOMDesc().equalsIgnoreCase("each")) {
						if (receiveParam.getOrderQty() != null
								&& receiveParam.getOrderQty() != "") {
							if (Double.parseDouble(receiveParam.getOrderQty()) % 1 == 0) {
								results.setInputQty(receiveParam.getOrderQty());
							} else {
								Integer qty = (int) Double
										.parseDouble(receiveParam.getOrderQty());
								results.setInputQty(qty.toString());
								model.addAttribute("invalidQty", "true");
							}
						} else {
							results.setInputQty("0");
							model.addAttribute("invalidQty", "");
						}
					} else if (receiveParam.getOrderQty() != null
							&& receiveParam.getOrderQty() != "") {
						results.setInputQty(receiveParam.getOrderQty());
						model.addAttribute("invalidQty", "");
					}
				} else {
					model.addAttribute("invalidQty", "");
				}
				orde.setOrderNo(order.getOrderNo());
				orde.setArticle(results.getArticleNo());
				orde.setReceivedQty(results.getInputQty());
				orde.setArticleDesc(results.getDescription());
				orde.setOrderQty("0");
				orde.setDespatchQty("0");
				orde.setOM(results.getOM());
				if (orderDetail != null && orderDetail.size() > 0) {
					orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo());
				}
				Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
				// //System.out.println("itemNo=" + itemNo);
				orde.setItemNo(itemNo.toString());
				orderDetailBackup.add(orde);
				receiveParam.setArtEAN("");
				receiveParam.setRecqty("");
				model.addAttribute("msg", "");
			} else
				model.addAttribute(
						"msg",
						"Article '"
								+ receiveParam.getArticleNo()
								+ "' not found. Please try a different article number.");
			// orderDetailBackup
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// ####################################################################

	/********************* ON PAGE LOAD CREATE MANUAL ORDER **********************/
	// method called when create order on receipt icon in header is clicked
	@RequestMapping(value = "/onPageLoadPORecipt.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadPORecipt(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
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

		// updatedArticleResults = new ArrayList<ArticleSearchResults>();
		manualOrderParam = new ManualOrderParam();
		articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
		manualOrderParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		manualOrderParam.setArticleNo("");
		model = new ModelMap();
		model.addAttribute("manualOrderParam", manualOrderParam);
		model.addAttribute("articleSearchResults",
				new ArrayList<ArticleSearchResults>());
		model.addAttribute("size", "0");

		// addArtSearchResults = new ArrayList<ArticleSearchResults>();
		model.addAttribute("articleNo", "");
		model.addAttribute("article-suppNo", "");
		model.addAttribute("article-suppName", "");
		model.addAttribute("article-srcsupply", "");
		List<SupplierModel> whInfoList = new ArrayList<SupplierModel>();

		try {
			whInfoList = (ArrayList<SupplierModel>) orderService
					.getSupplierLists(manualOrderParam.getSiteNo(),user);

			// model.addAttribute("param", param);
			model.addAttribute("whList", whInfoList);

		} catch (Exception e) {
			e.printStackTrace();
			// model.addAttribute("noResults", "");
			// model.addAttribute("size", "0");
			model.addAttribute("whList", new ArrayList<SupplierModel>());
		}

		model.addAttribute("errorMsg", "");
		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/orderCreate.htm", method = RequestMethod.GET)
	public ModelAndView orderCreate(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		/*
		 * ArticleSearchResults articleSearchResults;
		 * articleSearchResults=(ArticleSearchResults)
		 * model.get("articleSearchResutls");
		 * ////System.out.println("uom"+articleSearchResults.getArticleNo());
		 */
		// //System.out.println(request.getParameter("article-suppNo"));
		// //System.out.println(request.getParameter("article-suppName"));
		// //System.out.println(request.getParameter("article-srcsupply"));

		manualOrderParam = new ManualOrderParam();
		articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
		manualOrderParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		manualOrderParam.setArticleNo("");
		model = new ModelMap();
		model.addAttribute("manualOrderParam", manualOrderParam);
		model.addAttribute("articleSearchResults",
				new ArrayList<ArticleSearchResults>());
		model.addAttribute("size", "0");
		List<SupplierModel> whInfoList = new ArrayList<SupplierModel>();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			whInfoList = (ArrayList<SupplierModel>) orderService
					.getSupplierLists(manualOrderParam.getSiteNo(),user);

			// model.addAttribute("param", param);
			model.addAttribute("whList", whInfoList);

		} catch (Exception e) {
			e.printStackTrace();
			// model.addAttribute("noResults", "");
			// model.addAttribute("size", "0");
			model.addAttribute("whList", new ArrayList<SupplierModel>());
		}
		model.addAttribute("articleNo",
				request.getParameter("article-articleNo"));
		model.addAttribute("articlesuppNo",
				request.getParameter("article-suppNo"));
		model.addAttribute("articlesuppName",
				request.getParameter("article-suppName"));
		model.addAttribute("articlesrcsupply",
				request.getParameter("article-srcsupply"));

		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/********************* MANUAL ORDER SEARCH **********************/

	@RequestMapping(value = "/manualOrderSearch.htm", method = RequestMethod.POST)
	public ModelAndView manualOrderSearch(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("entered manualOrderSearch");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		if (postSuccessFlag == true) {
			// //System.out.println(" inside succes check");
			articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
			updatedArticleResults = new ArrayList<ArticleSearchResults>();
			addArtSearchResults = new ArrayList<ArticleSearchResults>();
			postSuccessFlag = false;
		}

		manualOrderParam.setArticleNo(request.getParameter("articleNo"));
		// manualOrderParam.setArticleDesc(request.getParameter("articleDesc"));
		manualOrderParam.setSuppNo(request.getParameter("suppNo"));
		manualOrderParam.setSuppName(request.getParameter("suppName"));
		manualOrderParam.setSrcOfSupply(request.getParameter("dropdown"));

		if (request.getParameter("articleType").equalsIgnoreCase(
				"ArticleNumber")) {
			manualOrderParam.setArticleType("articleNo");
		} else if (request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			manualOrderParam.setArticleType("ean");
		} else {
			manualOrderParam.setArticleType("desc");
		}

		// //System.out.println("art no" + request.getParameter("articleNo"));

		model.addAttribute("articleSearchResults",
				new ArrayList<ArticleSearchResults>());

		String articleNo = request.getParameter("articleNo");
		String articleDesc = request.getParameter("articleDesc");
		String srcOfSupply = request.getParameter("dropdown");
		model.addAttribute("errorMsg", "");
		if (request.getParameter("buttonVal").equalsIgnoreCase("Search")) {
			// //System.out.println("inside search");
			try {

				// SEARCH ARTICLE
				addArtSearchResults = new ArrayList<ArticleSearchResults>();
				model.addAttribute("multiArtRes",
						new ArrayList<ArticleSearchResults>());

				model.addAttribute("errorMsg", "");

				if (postSuccessFlag == true) {
					// //System.out.println(" inside succes check");
					articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
					updatedArticleResults = new ArrayList<ArticleSearchResults>();
					addArtSearchResults = new ArrayList<ArticleSearchResults>();
					postSuccessFlag = false;
				}
				articleSearchResultsFetched = new ArrayList<ArticleSearchResults>();

				if (articleSearchResultsforCreate != null
						&& articleSearchResultsforCreate.size() > 0) {
					for (int index = 0; index < articleSearchResultsforCreate
							.size(); index++) {
						if (articleNo.equals(articleSearchResultsforCreate.get(
								index).getArticleNo())) {
							model.addAttribute("errorMsg",
									"Article already exists in the list");

							model.addAttribute("articleSearchResults",
									articleSearchResultsforCreate);
							model.addAttribute("manualOrderParam",
									manualOrderParam);
							ModelAndView modelAndView = new ModelAndView(
									"createPORecipt", "manualOrderParam",
									manualOrderParam);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					}
				}
				// SERVICE CALL
				UserContext user=(UserContext) request.getSession(
						false).getAttribute("user");
				articleSearchResultsFetched = orderService
						.getManualOrders(manualOrderParam,user);

				if (articleSearchResultsFetched.size() == 1) {
					model.addAttribute("size", "1");
					// //System.out.println(" inside 1");
					if (articleSearchResultsFetched.get(0).getRangedFlag()
							.equalsIgnoreCase("Y")) {
						if (articleSearchResultsFetched.get(0).getPackBrkFlag()
								.equalsIgnoreCase("N")) {
							model.addAttribute("errorMsg", "");
							articleSearchResultsforCreate
									.addAll(articleSearchResultsFetched);
							return requestManualOrderDetail(request, response);
						} else {
							// //System.out.println("Pack breakdown");
							model.addAttribute("errorMsg",
									"Article is pack breakdown");
						}
					} else {
						// //System.out.println("Not ranged");
						model.addAttribute("errorMsg",
								"Article is not ranged to this store.");
					}

				} else if (articleSearchResultsFetched.size() > 1) {
					model.addAttribute("errorMsg", "");
					addArtSearchResults = new ArrayList<ArticleSearchResults>();
					for (int i = 0; i < articleSearchResultsFetched.size(); i++) {
						if (articleSearchResultsFetched.get(i).getRangedFlag()
								.equalsIgnoreCase("Y")
								&& articleSearchResultsFetched.get(i)
										.getPackBrkFlag().equalsIgnoreCase("N")) {
							addArtSearchResults.add(articleSearchResultsFetched
									.get(i));

						}
					}
					// //System.out.println("addArtSearchResults size--->" +
					// addArtSearchResults.size());
					model.addAttribute("multiArtRes", addArtSearchResults);
					if (addArtSearchResults.size() > 0) {
						model.addAttribute("size", "2");
					}

				} else if (articleSearchResultsFetched.size() <= 0
						|| articleSearchResultsFetched == null) {
					model.addAttribute("size", "0");
					// //System.out.println("no data found");
					model.addAttribute("errorMsg", "No data found");
				}
			} catch (Exception e) {
				// //System.out.println("exception -->661");
				// articleSearchResultsforCreate = new
				// ArrayList<ArticleSearchResults>();
				model.addAttribute("manualOrderParam", manualOrderParam);
				model.addAttribute("size", "0");
				model.addAttribute("errorMsg", "No Data found");
			}
			model.addAttribute("articleSearchResults",
					articleSearchResultsforCreate);
			model.addAttribute("manualOrderParam", manualOrderParam);
			ModelAndView modelAndView = new ModelAndView("createPORecipt",
					"manualOrderParam", manualOrderParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		} else if (request.getParameter("buttonVal").equalsIgnoreCase(
				"multiArticleSelect")) { // / multiple article select
			// //System.out.println("multi index--->"
			// + request.getParameter("multipleArtIndex"));
			try {
				return requestManualOrderDetail(request, response);
			} catch (Exception e) {
				e.printStackTrace();
				model.addAttribute("size", "0");
				model.addAttribute("param", param);
				model.addAttribute("errorMsg", "No Data found");
				model.addAttribute("articleSearchResults",
						articleSearchResultsforCreate);
				model.addAttribute("param", param);
				ModelAndView modelAndView = new ModelAndView("createPORecipt",
						"param", param);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} else {

			// //System.out.println("inside finalise");
			// FINALISE ORDER
			boolean unfilledData = false;
			ModelAndView modelAndView = new ModelAndView("createPORecipt");
			model.addAttribute("errorMsg", "");
			try {
				/*
				 * for(int i=0;i<articleSearchResultsforCreate.size();i++){
				 * ////System.out.println("i val  "+i);
				 * if(articleSearchResultsforCreate.get(i).getInputQty()==null
				 * ||
				 * articleSearchResultsforCreate.get(i).getInputQty().trim().length
				 * ()<=0){
				 * 
				 * unfilledData=true; break; }
				 * 
				 * }
				 */
				/*
				 * else if(unfilledData==true){ model.addAttribute("errorMsg",
				 * "Cannot finalise");
				 * ////System.out.println("not each article filled"); }
				 */

				if (articleSearchResultsforCreate == null
						|| articleSearchResultsforCreate.size() <= 0) {
					model.addAttribute("errorMsg",
							"Please update the article details and finalise");
					// //System.out.println("updatedArticleResults size zero");
				} else {

					updatedArticleResults.addAll(articleSearchResultsforCreate);
					// system.out
					// .println("updatedArticleResults size before submit--------> "
					// + updatedArticleResults.size());
					// //System.out.println("calling service");
					// boolean createStatus =
					// orderService.createOrder(updatedArticleResults,
					// createOrderParam);
					boolean createStatus = true;
					if (createStatus == true) {
						// //System.out.println(" created");
						model.addAttribute("errorMsg",
								"Order creation request was successfully submitted");
						postSuccessFlag = true;
					} else {
						// //System.out.println(" not created");
						model.addAttribute("errorMsg", "Order creation failed");
					}
					if (postSuccessFlag == true) {
						// //System.out.println(" inside succes check");
						articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
						updatedArticleResults = new ArrayList<ArticleSearchResults>();
						addArtSearchResults = new ArrayList<ArticleSearchResults>();
						postSuccessFlag = false;
					}

				}

			} catch (Exception e) {
				e.printStackTrace();
				model.addAttribute("manualOrderParam", manualOrderParam);

			}

			model.addAttribute("manualOrderParam", manualOrderParam);
			model.addAttribute("articleSearchResults",
					articleSearchResultsforCreate);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

	}

	/********************* BACK TO MANUAL ORDER SEARCH **********************/

	@RequestMapping(value = "/backToManualOrderSearch.htm", method = RequestMethod.GET)
	public ModelAndView backToManualOrderSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		String artNo = request.getParameter("articleNo");
		// //System.out.println(" art no--->" + artNo);

		if (request.getParameter("status") != null
				&& request.getParameter("status").trim().length() > 0) {
			if (request.getParameter("status").equals("Cancel")) {
				for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
					if (artNo.equals(articleSearchResultsforCreate.get(i)
							.getArticleNo())) {
						articleSearchResultsforCreate.remove(i);
						// //System.out.println("removed");
					}
				}
			}
		}

		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		model.addAttribute("errorMsg", "");
		model.addAttribute("articleSearchResults",
				articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/************************** MANUAL ORDER details PAGE ****************/
	@RequestMapping(value = "/requestManualOrderDetail.htm", method = RequestMethod.GET)
	public ModelAndView requestManualOrderDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestManualOrderDetail");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		model.addAttribute("size", "0");
		model.addAttribute("orderList", "");
		String listIndex = null;
		createOrderParam = new CreateParam();
		ArticleSearchResults articleOrderDetails = null;

		if (request.getParameter("multipleArtIndex") != null
				&& request.getParameter("multipleArtIndex").trim().length() > 0) {
			articleOrderDetails = (ArticleSearchResults) addArtSearchResults
					.get(Integer.parseInt(request
							.getParameter("multipleArtIndex")));
			listIndex = request.getParameter("multipleArtIndex");
			// //System.out.println("in if");
		} else if (request.getParameter("ibtIndex") != null
				&& request.getParameter("ibtIndex").trim().length() > 0) {
			articleOrderDetails = (ArticleSearchResults) articleSearchResultsforCreate
					.get(Integer.parseInt(request.getParameter("ibtIndex")));
			listIndex = request.getParameter("ibtIndex");
			// //System.out.println("in else if");

		} else {
			// //System.out.println("inSide articleDetails Search");
			articleOrderDetails = (ArticleSearchResults) articleSearchResultsFetched
					.get(0);
		}

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");

		String siteNo = userContext.getSiteNo();

		createOrderParam.setSiteNo(siteNo);

		if (articleOrderDetails.getOrderDate() != null
				&& articleOrderDetails.getOrderDate().trim().length() > 0
				&& articleOrderDetails.getDeliveryDate() != null
				&& articleOrderDetails.getDeliveryDate().trim().length() > 0
				&& articleOrderDetails.getInputQty() != null
				&& articleOrderDetails.getInputQty().trim().length() > 0) {

			createOrderParam.setOrderDate(articleOrderDetails.getOrderDate());
			createOrderParam.setDeliveryDate(articleOrderDetails
					.getDeliveryDate());
			createOrderParam.setOrderQty(articleOrderDetails.getInputQty());

			model.addAttribute("confirmed", "confirmed");
			createOrderParam.setStatus("Remove");

		} else {
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			// //System.out.println(dateFormat.format(date));

			String currentDate = dateFormat.format(date);
			Calendar cal = Calendar.getInstance();
			cal.setTime(dateFormat.parse(currentDate));
			cal.add(Calendar.DATE, 1);
			String convertedDate = dateFormat.format(cal.getTime());
			createOrderParam.setOrderDate(currentDate);
			createOrderParam.setDeliveryDate(convertedDate);
			model.addAttribute("confirmed", "");
			createOrderParam.setStatus("Cancel");
		}

		model.addAttribute("articleOrderDetails", articleOrderDetails);
		model.addAttribute("listIndex", listIndex);
		ModelAndView modelAndView = new ModelAndView("orderSearchDetails");
		model.addAttribute("createOrderParam", createOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/************************** CONFIRM ORDER - BACK TO CREATE MANUAL ORDER RPAGE ****************/
	@RequestMapping(value = "/confirmOrder.htm", method = RequestMethod.POST)
	public ModelAndView confirmOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		model.addAttribute("errorMsg", "");

		ArticleSearchResults updatedArticleOrderDetails = null;

		String artNo = request.getParameter("articleNumber");

		for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
			if (artNo.equals(articleSearchResultsforCreate.get(i)
					.getArticleNo())) {
				updatedArticleOrderDetails = articleSearchResultsforCreate
						.get(i);
			}
		}
		if (updatedArticleOrderDetails == null) {
			for (int i = 0; i < addArtSearchResults.size(); i++) {
				if (artNo.equals(addArtSearchResults.get(i).getArticleNo())) {
					updatedArticleOrderDetails = addArtSearchResults.get(i);
				}
			}

		}
		if (request.getParameter("buttonValue").equalsIgnoreCase("Confirm")) {// confirm

			updatedArticleOrderDetails.setDeliveryDate(request
					.getParameter("deliveryDate"));
			updatedArticleOrderDetails.setInputQty(request
					.getParameter("orderQty"));
			updatedArticleOrderDetails.setOrderDate(request
					.getParameter("orderDate"));
			updatedArticleOrderDetails.setOrderedQuantity(request
					.getParameter("orderedQty"));

			createOrderParam.setDeliveryDate(request
					.getParameter("deliveryDate"));
			createOrderParam.setOrderQty(request.getParameter("orderedQty"));

			boolean exists = false;
			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				if (updatedArticleOrderDetails.getArticleNo() == articleSearchResultsforCreate
						.get(i).getArticleNo()) {
					articleSearchResultsforCreate.get(i).setDeliveryDate(
							updatedArticleOrderDetails.getDeliveryDate());
					articleSearchResultsforCreate.get(i).setOrderDate(
							updatedArticleOrderDetails.getOrderDate());
					articleSearchResultsforCreate.get(i).setInputQty(
							updatedArticleOrderDetails.getInputQty());
					articleSearchResultsforCreate.get(i).setOrderedQuantity(
							updatedArticleOrderDetails.getOrderedQuantity());
					exists = true;

				}
			}
			if (!exists) {
				articleSearchResultsforCreate.add(updatedArticleOrderDetails);
				exists = false;

			}

			model.addAttribute("articleSearchResults",
					articleSearchResultsforCreate);
			model.addAttribute("manualOrderParam", manualOrderParam);
			model.addAttribute("createOrderParam", createOrderParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		} else if (request.getParameter("buttonValue").equalsIgnoreCase(
				"Cancel")) {// cancel

			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				if (updatedArticleOrderDetails.getArticleNo() == articleSearchResultsforCreate
						.get(i).getArticleNo()) {
					articleSearchResultsforCreate.remove(i);

				}
			}

			model.addAttribute("articleSearchResults",
					articleSearchResultsforCreate);
			model.addAttribute("manualOrderParam", manualOrderParam);
			model.addAttribute("createOrderParam", createOrderParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		} else if (request.getParameter("buttonValue").equalsIgnoreCase(
				"Show Sales History")) { // sHOW SALES HISTORY
			ModelAndView modelAndViewSSH = new ModelAndView(
					"orderSearchDetails");
			try {
				List<OrderDetail> orderList = null;
				OrderParam orderParam = new OrderParam();

				createOrderParam.setDeliveryDate(request
						.getParameter("deliveryDate"));
				createOrderParam.setOrderQty(request.getParameter("orderQty"));
				createOrderParam
						.setOrderDate(request.getParameter("orderDate"));

				model.addAttribute("createOrderParam", createOrderParam);

				// //System.out.println("entered show sales history");
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				/*
				 * String date = "02/02/2012";
				 * ////System.out.println(dateFormat.format(date));
				 */
				// //System.out.println("request.getParameter(orderDate)"+request.getParameter("orderDate"));
				// //System.out.println("request.getParameter(deliveryDate)"+request.getParameter("deliveryDate"));
				/*
				 * Date rosterDate=null;
				 * if(request.getParameter("orderDate")!=null &&
				 * request.getParameter("orderDate").trim().length() > 0){
				 * rosterDate = new
				 * SimpleDateFormat("dd/MM/yyyy").parse(request.
				 * getParameter("orderDate")); //deducting a month to roster
				 * date Calendar cal = Calendar.getInstance();
				 * cal.setTime(rosterDate); cal.add(Calendar.MONTH, -1); String
				 * convertedRosterDate = dateFormat.format(cal.getTime());
				 * //system
				 * .out.println("convertedRosterDate"+convertedRosterDate);
				 * 
				 * 
				 * orderParam.setRosterDate(convertedRosterDate); }
				 */

				Date deliveryDate = null;

				if (request.getParameter("deliveryDate") != null
						&& request.getParameter("deliveryDate").trim().length() > 0) {
					deliveryDate = new SimpleDateFormat("dd/MM/yyyy")
							.parse(request.getParameter("deliveryDate"));
					// adding a month for delivery date
					Calendar cal1 = Calendar.getInstance();
					cal1.setTime(deliveryDate);
					cal1.add(Calendar.MONTH, 1);
					String convertedDeliveryToDate = dateFormat.format(cal1
							.getTime());
					// //System.out.println("convertedDeliveryToDate"+convertedDeliveryToDate);

					orderParam.setToDate(convertedDeliveryToDate);

					Calendar cal = Calendar.getInstance();
					cal.setTime(deliveryDate);
					cal.add(Calendar.MONTH, -1);
					String convertedDeliveryFromDate = dateFormat.format(cal
							.getTime());
					orderParam.setFromDate(convertedDeliveryFromDate);
					// //System.out.println("convertedDeliveryFromDate"+convertedDeliveryFromDate);
				}

				// //System.out.println("end ");
				// temp code end
				UserContext user=(UserContext) request.getSession(
						false).getAttribute("user");
				orderParam.setOrderType("ZNB");
				orderParam.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
				orderParam.setArticleNo(request.getParameter("articleNumber"));
				orderList = orderService.getOrderDetails(orderParam, "",user);

				if (orderList != null && orderList.size() > 0
						&& orderList.get(0).getMsg().equalsIgnoreCase("")) {
					// //System.out.println("data fetched -->999");
					// //System.out.println("size of orderList --> "+orderList.size());
					model.addAttribute("orderList", orderList);

				} else {
					// //System.out.println("no data found");
					if (orderList != null && orderList.size() > 0) {
						model.addAttribute("errorMsg", orderList.get(0)
								.getMsg());
					} else {
						model.addAttribute("errorMsg", "No data found");
					}

				}

			} catch (Exception e) {
				e.printStackTrace();

			}

			model.addAttribute("articleSearchResults",
					articleSearchResultsforCreate);
			model.addAttribute("manualOrderParam", manualOrderParam);
			model.addAttribute("createOrderParam", createOrderParam);
			modelAndViewSSH.addObject("model", model);
			modelAndViewSSH.addAllObjects(model);
			return modelAndViewSSH;

		} else {// remove

			// removing from articleSearchResultsforCreate

			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				if (updatedArticleOrderDetails.getArticleNo() == articleSearchResultsforCreate
						.get(i).getArticleNo()) {
					articleSearchResultsforCreate.remove(i);
				}
			}

			model.addAttribute("articleSearchResults",
					articleSearchResultsforCreate);
			model.addAttribute("manualOrderParam", manualOrderParam);
			model.addAttribute("createOrderParam", createOrderParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

	}

	/************************** FINALISE ORDER ****************/
	@RequestMapping(value = "/finaliseOrder.htm", method = RequestMethod.POST)
	public ModelAndView finaliseOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		model.addAttribute("errorMsg", "");
		boolean createStatus = true;
		// boolean createStatus =
		// orderService.createOrder(updatedArticleResults,createOrderParam);
		String postStatus = null;
		if (createStatus == true) {
			postStatus = "Order is created successfully";
		} else {
			postStatus = "Order creation failed";
		}
		model.addAttribute("articleSearchResults", updatedArticleResults);
		model.addAttribute("postStatus", postStatus);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/************************** CAncel ORder ****************/
	@RequestMapping(value = "/cancelOrder.htm", method = RequestMethod.POST)
	public ModelAndView cancelOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("entered contorller cancelOrder method");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// remove below line
		model = new ModelMap();

		ModelAndView modelAndView = new ModelAndView("orderDetails");
		model.addAttribute("errorMsg", "");
		CancelOrderParam cancelOrderParam = new CancelOrderParam();
		/*
		 * cancelOrderParam.setSiteNo("1193");
		 * cancelOrderParam.setPurOrdNo("10000082");
		 */
		cancelOrderParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		cancelOrderParam.setPurOrdNo(request.getParameter("purOrdNo"));
		// //System.out.println("order no from page"+request.getParameter("purOrdNo"));
		String createStatus = "";
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			createStatus = orderService.cancelOrder(cancelOrderParam,user);
		} catch (Exception e) {

		}
		String postStatus = null;
		if (createStatus == null) {
			postStatus = "Request for cancelling the order is successfully submitted";
		} else {
			postStatus = createStatus;
		}
		// model.addAttribute("articleSearchResults", updatedArticleResults);
		model.addAttribute("disable", disable);
		// model.addAttribute("status", postStatus);
		model.addAttribute("postStatus", postStatus);
		model.addAttribute("orderdet", orderDet);
		model.addAttribute("order", order);
		model.addAttribute("orderDetails", orderDetail);
		model.addAttribute("cancelOrderParam", cancelOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/updateDeliveryDate.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updateDeliveryDate(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("entered contorller updateDeliveryDate method");

		// //System.out.println("request.getParameter(\"delButton\")="+request.getParameter("delDate"));

		String delDate = request.getParameter("delDate");
		String orderNo = request.getParameter("orderNo");

		String converteddelDate = "";
		try {
			converteddelDate = PortalUtil.convertToSAPDateForOrder(delDate);
			// //System.out.println("converteddelDate"+converteddelDate);
		} catch (Exception e) {
			e.printStackTrace();
		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String createStatus = null;
		try {
			createStatus = orderService.updateDeliveryDate(orderNo,
					converteddelDate,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		String postStatus = null;
		if (createStatus == null) {
			// postStatus =
			// "Request for updating the order is successfully submitted";
			if (orderDetail != null && orderDetail.size() > 0) {
				for (int index = 0; index < orderDetail.size(); index++) {
					if (orderDetail.get(index).getOrderNo()
							.equalsIgnoreCase(orderNo)) {
						try {
							orderDetail
									.get(index)
									.setDeliveryDate(
											PortalUtil
													.convertToSAPDateForOrderDetailScreen(delDate));
							break;
						} catch (Exception e) {
							e.printStackTrace();
						}
					}
				}
				if (order != null) {
					try {
						order.setDeliveryDate(PortalUtil
								.convertToSAPDateForOrderDetailScreen(delDate));
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
				if (orderDet != null) {
					try {
						orderDet.setDeliveryDate(PortalUtil
								.convertToSAPDateForOrderDetailScreen(delDate));
					} catch (Exception e) {
						e.printStackTrace();
					}
				}

			}

			postStatus = "true";
		} else {
			postStatus = createStatus;
		}
		return postStatus;

	}

	// method called when search and add button clicked in create order on
	// receipt screen.
	@RequestMapping(value = "/createManualOrder.htm", method = RequestMethod.POST)
	public ModelAndView createManualOrder(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		ArrayList<ArticleSearchResults> articleSearchResultsFetched = new ArrayList<ArticleSearchResults>();

		// //System.out.println("request.getParameter(\"articleNo\")"+request.getParameter("articleNo"));
		// //System.out.println("request.getParameter(\"ordqty\")"+request.getParameter("ordqty"));
		// //System.out.println("request.getParameter(\"sourceSupply\")"+request.getParameter("sourceSupply"));
		// //System.out.println("request.getParameter(\"suppName\")"+request.getParameter("suppName"));
		// //System.out.println("request.getParameter(\"dropdownVal\")"+request.getParameter("warehouseValue"));
		model.addAttribute("articleNo", "");
		model.addAttribute("articlesuppNo", "");
		model.addAttribute("articlesuppName", "");
		model.addAttribute("articlesrcsupply", "");
		model.addAttribute("listSize", "");

		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();

		manualOrderParam.setArticleNo(request.getParameter("articleNo"));
		manualOrderParam.setOrderQty(request.getParameter("ordqty"));
		manualOrderParam.setSrcOfSupply(request.getParameter("sourceSupply"));
		manualOrderParam.setSuppName(request.getParameter("suppName"));
		manualOrderParam.setWarehouseDropdown(request
				.getParameter("warehouseValue"));
		model.addAttribute("buttonRetain", request.getParameter("sourceSupply"));
		if (request.getParameter("suppName") != null
				|| request.getParameter("suppName") != "") {
			String suppName = request.getParameter("suppName");
			manualOrderParam.setSupplierDesc(suppName);
			if (suppName.contains("-")) {
				manualOrderParam.setSuppName(suppName.split("-")[0]);
				// //System.out.println("suppName"+suppName.split("-")[0]);
			}

		}
		String srcOfSupp = manualOrderParam.getSrcOfSupply();
		String vendordesc = manualOrderParam.getSuppName();
		String maxRows = "";

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {

			model.addAttribute("listSize", articleSearchResultsforCreate.size());
		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if ("1".equalsIgnoreCase(srcOfSupp)
				|| "vendor".equalsIgnoreCase(srcOfSupp)) {

			try {
				if (vendordesc != null && vendordesc.trim().length() > 0) {
					// param.setSuppName(articleSearchResultsFetched.get(0).getVendor()+"-"+articleSearchResultsFetched.get(0).getVendorName());

					ArrayList<Vendor> supplierList = articleService
							.getVendorList(vendordesc, maxRows, vendordesc,
									siteNo,user);
					if (supplierList != null && supplierList.size() > 0)
						model.addAttribute("msg", "");
					else {
						model.addAttribute("msg", "Not a valid vendor number");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}
				}
			} catch (Exception e) {
				model.addAttribute("msg", "Not a valid vendor number");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		}

		else if ("2".equalsIgnoreCase(srcOfSupp)
				|| "warehouse".equalsIgnoreCase(srcOfSupp)) {

			/*
			 * try{ if(vendordesc!=null && vendordesc.trim().length()>0){
			 * 
			 * ArrayList<WareHouse>
			 * supplierList1=articleService.getWareHouseList
			 * (vendordesc,maxRows,vendordesc); if(supplierList1!=null &&
			 * supplierList1.size()>0) model.addAttribute("msg",""); else
			 * model.addAttribute("msg","Not a valid warehouse number"); }
			 * 
			 * } catch(Exception e){
			 * model.addAttribute("msg","Not a valid vendor number"); }
			 */

		}

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {
			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				if (articleSearchResultsforCreate.get(i).getEan11()
						.equals(manualOrderParam.getArticleNo())
						|| articleSearchResultsforCreate.get(i).getArticleNo()
								.equals(manualOrderParam.getArticleNo())) {
					model.addAttribute("msg",
							"Article already exist in the list");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}

			}
		}

		if (request.getParameter("articleType").equalsIgnoreCase(
				"ArticleNumber")) {
			manualOrderParam.setArticleType("articleNo");
		} else if (request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			manualOrderParam.setArticleType("ean");
		} else {
			manualOrderParam.setArticleType("articleNo");
		}

		// //System.out.println("art no" + request.getParameter("articleNo"));
		model.addAttribute("msg", "");
		try {

			// SERVICE CALL
			articleSearchResultsFetched = (ArrayList<ArticleSearchResults>) orderService
					.getManualOrders(manualOrderParam,user);

			if (articleSearchResultsFetched != null
					&& articleSearchResultsFetched.size() == 1) {
				model.addAttribute("size", "1");
				// //System.out.println(" inside 1");

				// deleted flag check
				if (articleSearchResultsFetched.get(0).getDeleteInd()
						.equalsIgnoreCase("Y")) {
					model.addAttribute(
							"msg",
							"Article '"
									+ manualOrderParam.getArticleNo()
									+ "' is deleted from your Store and cannot be ordered");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}

				if (articleSearchResultsforCreate != null
						&& articleSearchResultsforCreate.size() != 0) {
					for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
						if (articleSearchResultsforCreate
								.get(i)
								.getEan11()
								.equals(articleSearchResultsFetched.get(0)
										.getEan11())
								|| articleSearchResultsforCreate
										.get(i)
										.getArticleNo()
										.equals(articleSearchResultsFetched
												.get(0).getArticleNo())) {
							model.addAttribute("msg",
									"Article already exist in the list");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}

					}
				}

				if (articleSearchResultsFetched.get(0).getRangedFlag()
						.equalsIgnoreCase("Y")) {

					// new
					if ((vendordesc == null || vendordesc.trim().length() <= 0)) {

						if (articleSearchResultsFetched.get(0).getVendorNo() != null
								&& articleSearchResultsFetched.get(0)
										.getVendorNo().trim().length() > 0
								&& articleSearchResultsFetched.get(0)
										.getSrcOfSupply().equalsIgnoreCase("1")) {
							manualOrderParam
									.setSuppName(articleSearchResultsFetched
											.get(0).getVendorNo());
							vendordesc = articleSearchResultsFetched.get(0)
									.getVendorNo();
							manualOrderParam
									.setSupplierDesc(articleSearchResultsFetched
											.get(0).getVendorNo());
							if (articleSearchResultsFetched.get(0)
									.getVendorName() != null
									&& articleSearchResultsFetched.get(0)
											.getVendorName().trim().length() > 0)
								manualOrderParam.setSuppName(manualOrderParam
										.getSuppName()
										+ "-"
										+ articleSearchResultsFetched.get(0)
												.getVendorName());
							manualOrderParam.setSupplierDesc(manualOrderParam
									.getSupplierDesc()
									+ "-"
									+ articleSearchResultsFetched.get(0)
											.getVendorName());
							// manualOrderParam.setWarehouseDropdown(articleSearchResultsFetched.get(0).getVendorNo());
							// +"-"+articleSearchResultsFetched.get(0).getVendorName());
							model.addAttribute("buttonRetain",
									articleSearchResultsFetched.get(0)
											.getSrcOfSupply());
							// manualOrderParam.setSrcOfSupply(articleSearchResultsFetched.get(0).getSrcOfSupply());
						} else {
							model.addAttribute(
									"msg",
									"Article '"
											+ manualOrderParam.getArticleNo()
											+ "' is not linked to any vendor. Please try a different article.");
							model.addAttribute("articleList",
									articleSearchResultsforCreate);
							model.addAttribute("manualOrderParam",
									manualOrderParam);
							model.addAttribute("size", "0");
							model.addAttribute("invalidQty", "");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
						// +"-"+articleSearchResultsFetched.get(0).getVendorName());
					}
					// vendor link check
					if (articleSearchResultsFetched.get(0).getVendorNo() != null
							&& articleSearchResultsFetched.get(0).getVendorNo()
									.trim().length() > 0
							&& articleSearchResultsFetched.get(0)
									.getSrcOfSupply().equalsIgnoreCase("1")) {

					} else {
						// if(vendordesc!=null && vendordesc.trim().length()>0)
						model.addAttribute("msg", "Article '"
								+ manualOrderParam.getArticleNo()
								+ "' is not linked to the vendor '"
								+ manualOrderParam.getSuppName() + "'.");
						model.addAttribute("articleList",
								articleSearchResultsforCreate);
						model.addAttribute("manualOrderParam", manualOrderParam);
						model.addAttribute("size", "0");
						model.addAttribute("invalidQty", "");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}

					/*
					 * if(articleSearchResultsFetched.get(0).getPackBrkFlag().
					 * equalsIgnoreCase("Y")) {
					 */
					Double totalOrdered = null;

					if (articleSearchResultsFetched.get(0).getBaseUOMDesc() != null
							&& articleSearchResultsFetched.get(0)
									.getBaseUOMDesc() != "") {
						if (articleSearchResultsFetched.get(0).getBaseUOMDesc()
								.equalsIgnoreCase("each")) {
							if (manualOrderParam.getOrderQty() != null
									&& manualOrderParam.getOrderQty() != "") {
								if (Double.parseDouble(manualOrderParam
										.getOrderQty()) % 1 == 0) {
									totalOrdered = Double
											.parseDouble(articleSearchResultsFetched
													.get(0).getOM())
											* Double.parseDouble(manualOrderParam
													.getOrderQty());
									articleSearchResultsFetched.get(0)
											.setInputQty(
													manualOrderParam
															.getOrderQty());
									articleSearchResultsFetched.get(0)
											.setTotalOrdered(
													String.valueOf(totalOrdered
															.intValue()));
								} else {
									Integer qty = (int) Double
											.parseDouble(manualOrderParam
													.getOrderQty());
									Integer om = (int) Double
											.parseDouble(articleSearchResultsFetched
													.get(0).getOM());
									Integer total = qty * om;
									articleSearchResultsFetched.get(0)
											.setInputQty(qty.toString());
									articleSearchResultsFetched.get(0)
											.setTotalOrdered(total.toString());
									model.addAttribute("invalidQty", "true");
								}
							} else {
								articleSearchResultsFetched.get(0).setInputQty(
										"");
								articleSearchResultsFetched.get(0)
										.setTotalOrdered("0");
								model.addAttribute("invalidQty", "");
							}
						} else if (manualOrderParam.getOrderQty() != null
								&& manualOrderParam.getOrderQty() != "") {
							totalOrdered = Double
									.parseDouble(articleSearchResultsFetched
											.get(0).getOM())
									* Double.parseDouble(manualOrderParam
											.getOrderQty());
							articleSearchResultsFetched.get(0).setInputQty(
									manualOrderParam.getOrderQty());
							articleSearchResultsFetched.get(0).setTotalOrdered(
									String.valueOf(totalOrdered.intValue()));
							model.addAttribute("invalidQty", "");
						}
					} else {
						totalOrdered = Double
								.parseDouble(articleSearchResultsFetched.get(0)
										.getOM())
								* Double.parseDouble(manualOrderParam
										.getOrderQty());
						articleSearchResultsFetched.get(0).setInputQty(
								manualOrderParam.getOrderQty());
						articleSearchResultsFetched.get(0).setTotalOrdered(
								String.valueOf(totalOrdered.intValue()));
						model.addAttribute("invalidQty", "");
					}

					model.addAttribute("msg", "");
					DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					Date date = new Date();
					// //System.out.println(dateFormat.format(date));
					String currentDate = dateFormat.format(date);
					Calendar cal = Calendar.getInstance();
					cal.setTime(dateFormat.parse(currentDate));
					cal.add(Calendar.DATE, 1);
					String convertedDate = dateFormat.format(cal.getTime());
					if (articleSearchResultsforCreate != null
							&& articleSearchResultsforCreate.size() > 0) {
						articleSearchResultsFetched.get(0).setDeliveryDate(
								articleSearchResultsforCreate.get(0)
										.getDeliveryDate());
						articleSearchResultsFetched.get(0).setOrderDate(
								articleSearchResultsforCreate.get(0)
										.getOrderDate());
					} else {
						articleSearchResultsFetched.get(0).setOrderDate(
								currentDate);
						articleSearchResultsFetched.get(0).setDeliveryDate(
								convertedDate);
					}
					articleSearchResultsFetched.get(0).setSaveFlag("N");
					articleSearchResultsforCreate
							.addAll(articleSearchResultsFetched);
					model.addAttribute("articleList",
							articleSearchResultsforCreate);
					if (articleSearchResultsforCreate != null
							&& articleSearchResultsforCreate.size() != 0) {

						model.addAttribute("listSize",
								articleSearchResultsforCreate.size());
					}
					// ////System.out.println();

					/*
					 * }else{ ////System.out.println("Pack breakdown");
					 * model.addAttribute("msg", "Article is Pack breakdown"); }
					 */
				} else {
					// //System.out.println("Not ranged");
					model.addAttribute("msg",
							"Article is not ranged to this store.");
					model.addAttribute("invalidQty", "");
				}

			} else {
				model.addAttribute("articleList", articleSearchResultsforCreate);
				model.addAttribute("manualOrderParam", manualOrderParam);
				model.addAttribute("size", "0");
				// model.addAttribute("msg",
				// "Article '"+manualOrderParam.getArticleNo()+"' not found. Please try a different article number.");
				if (manualOrderParam.getSuppName().trim().length() <= 0) {
					model.addAttribute(
							"msg",
							"Article '"
									+ manualOrderParam.getArticleNo()
									+ "' not found. Please try a different article number.");
				} else {
					if (manualOrderParam.getSrcOfSupply().equalsIgnoreCase("1"))
						model.addAttribute("msg", "Article '"
								+ manualOrderParam.getArticleNo()
								+ "' not found or not linked to vendor '"
								+ manualOrderParam.getSuppName() + "'.");
					else
						model.addAttribute("msg", "Article '"
								+ manualOrderParam.getArticleNo()
								+ "' not found or not linked to warehouse '"
								+ manualOrderParam.getWarehouseDropdown()
								+ "'.");
				}
				model.addAttribute("invalidQty", "");
			}
		} catch (Exception e) {
			e.printStackTrace();
			// articleSearchResultsforCreate = new
			// ArrayList<ArticleSearchResults>();
			model.addAttribute("articleList", articleSearchResultsforCreate);
			model.addAttribute("manualOrderParam", manualOrderParam);
			model.addAttribute("size", "0");
			if (manualOrderParam.getSuppName().trim().length() <= 0) {
				model.addAttribute(
						"msg",
						"Article '"
								+ manualOrderParam.getArticleNo()
								+ "' not found. Please try a different article number.");
			} else {
				if (manualOrderParam.getSrcOfSupply().equalsIgnoreCase("1"))
					model.addAttribute("msg",
							"Article '" + manualOrderParam.getArticleNo()
									+ "' not found or not linked to vendor '"
									+ manualOrderParam.getSuppName() + "'.");
				else
					model.addAttribute(
							"msg",
							"Article '"
									+ manualOrderParam.getArticleNo()
									+ "' not found or not linked to warehouse '"
									+ manualOrderParam.getWarehouseDropdown()
									+ "'.");
			}
			// model.addAttribute("msg",
			// "Article '"+manualOrderParam.getArticleNo()+"' not found. Please try a different article number.");
			model.addAttribute("invalidQty", "");
		}
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when select button of description search result is clicked
	// on create order on receipt screen.
	@RequestMapping(value = "/addArticleDescription.htm", method = RequestMethod.GET)
	public ModelAndView addArticleDescription(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("addArticleDescription");
		String index = request.getParameter("desIndex");
		ModelAndView modelAndView = new ModelAndView("createPORecipt");
		manualOrderParam.setArticleNo(request.getParameter("articleNo"));
		manualOrderParam.setOrderQty(request.getParameter("ordqty"));
		manualOrderParam.setSrcOfSupply(request.getParameter("sourceSupply"));
		manualOrderParam.setSuppName(request.getParameter("suppName"));
		model.addAttribute("buttonRetain", request.getParameter("sourceSupply"));
		manualOrderParam.setWarehouseDropdown(request
				.getParameter("warehouseValue"));
		if (request.getParameter("suppName") != null
				|| request.getParameter("suppName") != "") {
			String suppName = request.getParameter("suppName");
			manualOrderParam.setSupplierDesc(suppName);
			if (suppName.contains("-")) {
				manualOrderParam.setSuppName(suppName.split("-")[0]);
				// //System.out.println("suppName"+suppName.split("-")[0]);
			}

		}
		// //System.out.println("index"+index);
		ArticleSearchResults article = null;

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {

			model.addAttribute("listSize", articleSearchResultsforCreate.size());
		}
		String[] indexArray = index.split(":");
		for (int k = 0; k < indexArray.length; k++) {
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));

				// deleted flag check
				if (article.getDeleteInd().equalsIgnoreCase("Y")) {
					model.addAttribute(
							"msg",
							"Article '"
									+ article.getArticleNo()
									+ "' is deleted from your Store and cannot be ordered");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}

				if (articleSearchResultsforCreate != null
						&& articleSearchResultsforCreate.size() != 0) {
					for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
						if (articleSearchResultsforCreate.get(i).getEan11()
								.equals(article.getEan11())
								|| articleSearchResultsforCreate.get(i)
										.getArticleNo()
										.equals(article.getArticleNo())) {
							model.addAttribute("msg",
									"Article already exist in the list");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}

					}
				}
				try {
					if ((manualOrderParam.getSuppName() == null || manualOrderParam
							.getSuppName().trim().length() <= 0)) {

						if (article.getVendorNo() != null
								&& article.getVendorNo().trim().length() > 0
								&& article.getSrcOfSupply().equalsIgnoreCase(
										"1")) {
							manualOrderParam.setSuppName(article.getVendorNo());
							manualOrderParam.setSupplierDesc(article
									.getVendorNo());
							if (article.getVendorName() != null
									&& article.getVendorName().trim().length() > 0)
								manualOrderParam.setSuppName(manualOrderParam
										.getSuppName()
										+ "-"
										+ article.getVendorName());
							manualOrderParam.setSupplierDesc(manualOrderParam
									.getSupplierDesc()
									+ "-"
									+ article.getVendorName());
							manualOrderParam.setWarehouseDropdown(article
									.getVendorNo());
							// +"-"+articleSearchResultsFetched.get(0).getVendorName());
							model.addAttribute("buttonRetain",
									article.getSrcOfSupply());
							// manualOrderParam.setSrcOfSupply(articleSearchResultsFetched.get(0).getSrcOfSupply());
						} else {
							model.addAttribute(
									"msg",
									"Article '"
											+ manualOrderParam.getArticleNo()
											+ "' is not linked to any vendor. Please try a different article.");
							model.addAttribute("articleList",
									articleSearchResultsforCreate);
							model.addAttribute("manualOrderParam",
									manualOrderParam);
							model.addAttribute("size", "0");
							model.addAttribute("invalidQty", "");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
						// +"-"+articleSearchResultsFetched.get(0).getVendorName());
					}
					if (article.getVendorNo() != null
							&& article.getVendorNo().trim().length() > 0
							&& article.getSrcOfSupply().equalsIgnoreCase("1")) {

					} else {

						model.addAttribute("msg",
								"Article '" + article.getArticleNo()
										+ "' is not linked to the Vendor '"
										+ manualOrderParam.getSuppName() + "'.");
						model.addAttribute("articleList",
								articleSearchResultsforCreate);
						model.addAttribute("manualOrderParam", manualOrderParam);
						model.addAttribute("size", "0");
						model.addAttribute("invalidQty", "");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}
					Double totalOrdered = null;

					if (article.getBaseUOMDesc() != null
							&& article.getBaseUOMDesc() != "") {
						if (article.getBaseUOMDesc().equalsIgnoreCase("each")) {
							if (manualOrderParam.getOrderQty() != null
									&& manualOrderParam.getOrderQty() != "") {
								if (Double.parseDouble(manualOrderParam
										.getOrderQty()) % 1 == 0) {
									totalOrdered = Double.parseDouble(article
											.getOM())
											* Double.parseDouble(manualOrderParam
													.getOrderQty());
									article.setInputQty(manualOrderParam
											.getOrderQty());
									article.setTotalOrdered(String
											.valueOf(totalOrdered.intValue()));
								} else {
									Integer qty = (int) Double
											.parseDouble(manualOrderParam
													.getOrderQty());
									Integer om = (int) Double
											.parseDouble(article.getOM());
									Integer total = qty * om;
									article.setInputQty(qty.toString());
									article.setTotalOrdered(total.toString());
									model.addAttribute("invalidQty", "true");
								}
							} else {
								article.setInputQty("");
								article.setTotalOrdered("0");
								model.addAttribute("invalidQty", "");
							}
						} else if (manualOrderParam.getOrderQty() != null
								&& manualOrderParam.getOrderQty() != "") {
							totalOrdered = Double.parseDouble(article.getOM())
									* Double.parseDouble(manualOrderParam
											.getOrderQty());
							article.setInputQty(manualOrderParam.getOrderQty());
							article.setTotalOrdered(String.valueOf(totalOrdered
									.intValue()));
							model.addAttribute("invalidQty", "");
						}
					} else {
						totalOrdered = Double.parseDouble(article.getOM())
								* Double.parseDouble(manualOrderParam
										.getOrderQty());
						article.setInputQty(manualOrderParam.getOrderQty());
						article.setTotalOrdered(String.valueOf(totalOrdered
								.intValue()));
						model.addAttribute("invalidQty", "");
					}

					// Double totalOrdered=null;
					// totalOrdered=Double.parseDouble(article.getOM())*Double.parseDouble(manualOrderParam.getOrderQty());
					model.addAttribute("msg", "");
					DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					Date date = new Date();
					// //System.out.println(dateFormat.format(date));
					String currentDate = dateFormat.format(date);
					Calendar cal = Calendar.getInstance();
					cal.setTime(dateFormat.parse(currentDate));
					cal.add(Calendar.DATE, 1);
					String convertedDate = dateFormat.format(cal.getTime());
					if (articleSearchResultsforCreate != null
							&& articleSearchResultsforCreate.size() > 0) {
						article.setDeliveryDate(articleSearchResultsforCreate
								.get(0).getDeliveryDate());
						article.setOrderDate(articleSearchResultsforCreate.get(
								0).getOrderDate());
					} else {
						article.setOrderDate(currentDate);
						article.setDeliveryDate(convertedDate);
					}
					article.setSaveFlag("N");
					// article.setInputQty(manualOrderParam.getOrderQty());
					// article.setTotalOrdered(String.valueOf(totalOrdered.intValue()));
					articleSearchResultsforCreate.add(article);
					model.addAttribute("articleList",
							articleSearchResultsforCreate);
					if (articleSearchResultsforCreate != null
							&& articleSearchResultsforCreate.size() != 0) {

						model.addAttribute("listSize",
								articleSearchResultsforCreate.size());
					}
					// ////System.out.println();
					// articleSearchResultsforCreate.add(article);
				} catch (Exception e) {
					model.addAttribute("articleList",
							articleSearchResultsforCreate);
					model.addAttribute("manualOrderParam", manualOrderParam);
					model.addAttribute("msg", "");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
				}

			}
		}

		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/addArticleDescriptionDetail.htm", method = RequestMethod.GET)
	public ModelAndView addArticleDescriptionDetail(HttpServletRequest request,
			HttpServletResponse response) {
		model.addAttribute("invalidQty", "");
		// //System.out.println("addArticleDescription");
		String index = request.getParameter("desIndex");
		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		receiveParam.setOrderQty(request.getParameter("recqty"));
		// //System.out.println("index"+index);
		ArticleSearchResults article = null;
		// ArticleSearchResults article=null;
		String[] indexArray = index.split(":");
		for (int k = 0; k < indexArray.length; k++) {
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));

				if (orderDetailBackup != null && orderDetailBackup.size() != 0) {
					for (int i = 0; i < orderDetailBackup.size(); i++) {
						if (article != null) {
							if (orderDetailBackup.get(i).getArticle()
									.equals(article.getArticleNo())) {
								model.addAttribute(
										"msg",
										"Article '"
												+ article.getArticleNo()
												+ "' already exists in the list");
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}
						}

					}
				}
				if (article.getBaseUOMDesc() != null
						&& article.getBaseUOMDesc() != "") {
					if (article.getBaseUOMDesc().equalsIgnoreCase("each")) {
						if (receiveParam.getOrderQty() != null
								&& receiveParam.getOrderQty() != "") {
							if (Double.parseDouble(receiveParam.getOrderQty()) % 1 == 0) {
								article.setInputQty(receiveParam.getOrderQty());
							} else {
								Integer qty = (int) Double
										.parseDouble(receiveParam.getOrderQty());
								article.setInputQty(qty.toString());
								model.addAttribute("invalidQty", "true");
							}
						} else {
							article.setInputQty("0");
							model.addAttribute("invalidQty", "");
						}
					} else if (receiveParam.getOrderQty() != null
							&& receiveParam.getOrderQty() != "") {
						article.setInputQty(receiveParam.getOrderQty());
						model.addAttribute("invalidQty", "");
					}
				} else {
					model.addAttribute("invalidQty", "");
				}
				OrderDetail orde = new OrderDetail();
				if (article != null) {
					orde.setOrderNo(order.getOrderNo());
					orde.setArticle(article.getArticleNo());
					orde.setReceivedQty(article.getInputQty());
					orde.setArticleDesc(article.getDescription());
					orde.setOrderQty("0");
					orde.setDespatchQty("0");
					orde.setOM(article.getOM());
					if (orderDetail != null && orderDetail.size() > 0) {
						orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo());
					}
					Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
					// //System.out.println("itemNo=" + itemNo);
					orde.setItemNo(itemNo.toString());
					orderDetailBackup.add(orde);
					// receiveParam.setArtEAN("");
					// receiveParam.setRecqty("");
					model.addAttribute("msg", "");
				}

			}
		}

		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when save icon clicked on the create order on receipt
	// screen
	@RequestMapping(value = "/saveDetail.htm", method = RequestMethod.GET)
	public void saveDetail(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside Save");
		String index = request.getParameter("index");
		String orderDate = request.getParameter("orderDate");
		String deliveryDate = request.getParameter("deliveryDate");
		String inputQty = request.getParameter("inputQty");
		String totalOrdered = request.getParameter("totalOrdered");
		// //System.out.println("request.getParameter(\"index\")"+request.getParameter("index"));
		// //System.out.println("request.getParameter(\"orderDate\")"+request.getParameter("orderDate"));
		// //System.out.println("request.getParameter(\"deliveryDate\")"+request.getParameter("deliveryDate"));
		// //System.out.println("request.getParameter(\"inputQty\")"+request.getParameter("inputQty"));
		// //System.out.println("request.getParameter(\"totalOrdered\")"+request.getParameter("totalOrdered"));

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() > 0) {
			articleSearchResultsforCreate.get(Integer.parseInt(index) - 1)
					.setOrderDate(orderDate);
			articleSearchResultsforCreate.get(Integer.parseInt(index) - 1)
					.setDeliveryDate(deliveryDate);
			articleSearchResultsforCreate.get(Integer.parseInt(index) - 1)
					.setInputQty(inputQty);
			articleSearchResultsforCreate.get(Integer.parseInt(index) - 1)
					.setTotalOrdered(totalOrdered);
			articleSearchResultsforCreate.get(Integer.parseInt(index) - 1)
					.setSaveFlag("Y");
			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				articleSearchResultsforCreate.get(i).setOrderDate(orderDate);
				articleSearchResultsforCreate.get(i).setDeliveryDate(
						deliveryDate);
			}
		}

	}

	// method called when delete icon clicked on the create order on receipt
	// screen
	@RequestMapping(value = "/deleteItem.htm", method = RequestMethod.GET)
	public ModelAndView deleteItem(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// //System.out.println("inside Delete");
		// //System.out.println("index"+request.getParameter("index"));
		ModelAndView modelAndView = new ModelAndView("createPORecipt");

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() > 0) {
			articleSearchResultsforCreate.remove((Integer.parseInt(request
					.getParameter("index")) - 1));
			// String msg="Deleted";
		}
		model.addAttribute("invalidQty", "");
		model.addAttribute("articleList", articleSearchResultsforCreate);
		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {

			model.addAttribute("listSize", articleSearchResultsforCreate.size());
		}
		// model.addAttribute("msg", msg);
		model.addAttribute("msg", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// //method called when confirm and finalise icon clicked on the create
	// order on receipt screen
	@RequestMapping(value = "/finalizePOWithReceipt.htm", method = RequestMethod.GET)
	@ResponseBody
	public String finalizePOWithReceipt(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside finalise");
		model.addAttribute("msg", "");
		String createStatus = null;

		try {

			Integer salesOrg = ((UserContext) request.getSession()
					.getAttribute("user")).getSalesOrg();
			String orderType = PortalUtil.ZX;

			if (PortalUtil.PETROL_SALES_ORG.intValue() == salesOrg.intValue()) {
				orderType = PortalUtil.ZX;
			} else {
				for (ArticleSearchResults article : articleSearchResultsforCreate) {
					if (PortalUtil.PRODUCE_DEPT.equals(article.getDept())) {
						orderType = PortalUtil.ZXP;
					}
				}
			}
			UserContext user=(UserContext) request.getSession(
					false).getAttribute("user");
			createStatus = orderService.createPurchaseReq(
					articleSearchResultsforCreate, manualOrderParam, orderType,user);
		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase Requisition creation failed because of service unavailability.";
		}
		if (createStatus == null) {
			// articleSearchResultsforCreate=new
			// ArrayList<ArticleSearchResults>();
			return "true:" + manualOrderParam.getOrderRefNo();

		}
		return "false:Purchase Requisition creation failed due to SAP error - "
				+ createStatus;

	}

	// //method called when create po icon clicked on the create order on
	// receipt screen
	@RequestMapping(value = "/sendOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String sendOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside finalise");
		model.addAttribute("msg", "");
		String createStatus = null;
		String purReqNo = (String) request.getParameter("prNo");
		manualOrderParam.setPurReqNo(purReqNo);
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {

			Integer salesOrg = ((UserContext) request.getSession()
					.getAttribute("user")).getSalesOrg();
			String orderType = PortalUtil.ZNB;

			if (PortalUtil.PETROL_SALES_ORG.intValue() == salesOrg.intValue()) {
				orderType = PortalUtil.ZNB;
			} else {
				for (ArticleSearchResults article : articleSearchResultsforCreate) {
					if (PortalUtil.PRODUCE_DEPT.equals(article.getDept())) {
						orderType = PortalUtil.ZNBP;
					}
				}
			}
			createStatus = orderService.sendOrder(
					articleSearchResultsforCreate, manualOrderParam, orderType,user);
		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase Order creation failed because of service unavailability.";
		}
		if (createStatus == null) {

			// getting the order details

			OrderParam param = new OrderParam();
			param.setSiteNo(((UserContext) request.getSession().getAttribute(
					"user")).getSiteNo());
			param.setOrderType("ZNB");

			try {
				orderDetails = orderNormalService.getOrderDetails(param,
						manualOrderParam.getOrderRefNo(),user);
			} catch (Exception e) {
				e.printStackTrace();
				return "false:Purchase Order Loading has  failed due to SAP error";

			}
			if (orderDetails != null && orderDetails.size() > 0) {
				/*
				 * //for finding temperature range---start
				 * 
				 * //double lowerBoundArray[]=
				 * ////System.out.println("po receipt controller"); double
				 * finalLowerBound=0; double finalUpperBound=0; double
				 * tempLowerBound=0; double tempUpperBound=0; boolean
				 * isTempAvailable=false;
				 * 
				 * String Str2;
				 * 
				 * 
				 * for(int i=0;i<orderDetails.size();i++){ String Str = new
				 * String(orderDetails.get(i).getTemperature().trim());
				 * ////System.out.println("i="+i+"tempe"+Str); if(Str!=null &&
				 * Str.trim().length()!=0){ isTempAvailable=true; try{ int
				 * offset=Str.indexOf( '(' ); int count=Str.indexOf( ')' ); Str2
				 * =Str.substring(offset+1,count); String[] range1=
				 * Str2.split("to",2 );
				 * 
				 * 
				 * tempLowerBound=Integer.parseInt(range1[0].trim());
				 * tempUpperBound=Integer.parseInt(range1[1].trim());
				 * ////System.out.println("lower"+i+"  "+tempLowerBound);
				 * ////System.out.println("upper"+i+"  "+tempUpperBound);
				 * if(finalLowerBound>tempLowerBound){
				 * 
				 * finalLowerBound=tempLowerBound;
				 * ////System.out.println("finalLowerBound"
				 * +i+"  "+finalLowerBound);
				 * 
				 * 
				 * 
				 * } if(finalUpperBound<tempUpperBound){
				 * 
				 * finalUpperBound=tempUpperBound;
				 * ////System.out.println("finalUpperBound"
				 * +i+"  "+finalUpperBound); }
				 * 
				 * } catch(Exception e){ e.printStackTrace();
				 * 
				 * }
				 * 
				 * } } String temperature=""; if(isTempAvailable){
				 * 
				 * temperature="("+finalLowerBound+" to "+finalUpperBound+")";
				 * ////System.out.println("calculated temperature"+temperature);
				 * 
				 * //model.addAttribute("tempFromServiceIbtCreate",
				 * temperature);
				 * //model.addAttribute("deptFromServiceIbtCreate", ""); }else{
				 * //model.addAttribute("tempFromServiceIbtCreate", "");
				 * //model.addAttribute("deptFromServiceIbtCreate", ""); }
				 */
				String temperature = "";
				String department = "";

				temperature = serviceImpl.getTemperatureForTempCheck(orderDetails);
				department = serviceImpl.getDepartmentForTempCheck(orderDetails,
						((UserContext) request.getSession()
								.getAttribute("user")).getSalesOrg().toString());
				model.addAttribute("tempFromServiceIbtCreate", temperature);
				model.addAttribute("deptFromServiceIbtCreate", department);
				// //System.out.println("calculated temperature"+temperature);
				// //System.out.println("calculated rank"+department);
				articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
				return "true:" + manualOrderParam.getOrderRefNo() + ":"
						+ temperature + ":" + department;
			} else {
				articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
				return "true:" + manualOrderParam.getOrderRefNo() + ":" + ":";

			}

		}
		String[] msgs = createStatus.split(":");

		if (msgs.length == 1)
			return "false:Purchase Order creation failed due to SAP error - "
					+ createStatus;
		else {
			String totalMsg = "";
			for (String msg : msgs) {
				totalMsg = totalMsg + msg;
			}
			return "false:Purchase Order creation failed due to SAP error - "
					+ totalMsg;
		}

	}

	// //method called when description search happend on the create order on
	// receipt screen
	@RequestMapping(value = "/getDescription.htm", method = RequestMethod.GET)
	public ModelAndView getDescription(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("");
		// //System.out.println("getDescription" );
		String vendordesc = (String) request.getParameter("vendorDesc");
		String sourceSupply = (String) request.getParameter("sourceSupply");
		// //System.out.println("sourceSupply"+sourceSupply);

		String suppName = (String) request.getParameter("suppName");
		// //System.out.println("suppName"+suppName);
		// String warehouse=(String) request.getParameter("warehouse");
		String warehouse = "0";
		// //System.out.println("warehouse"+warehouse);

		/*
		 * String maxRows="0"; String
		 * vendorNo=(String)request.getParameter("vendorNo"); vendorNo=null;
		 * String srcOfSupp=(String)request.getParameter("sourceSupply");
		 * ////System.out.println("srcOfSupp"+srcOfSupp);
		 * ////System.out.println("vendorNo"+vendordesc);
		 */ArrayList<Vendor> supplierList;
		ArrayList<WareHouse> supplierList1;
		// //System.out.println("vendorDesc"+vendordesc);
		articleDescriptionResults = new ArrayList<ArticleSearchResults>();
		ManualOrderParam orderParam = new ManualOrderParam();
		orderParam.setArticleType("desc");
		orderParam.setArticleNo(vendordesc);
		orderParam.setSrcOfSupply(sourceSupply);
		orderParam.setSuppName(suppName);
		orderParam.setWarehouseDropdown(warehouse);
		orderParam.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");

		try {
			articleDescriptionResults = (ArrayList<ArticleSearchResults>) orderService
					.getManualOrders(orderParam,user);

			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				modelAndView = new ModelAndView("descriptionLookup");
				model.addAttribute("nodata", "N");
				model.addAttribute("vendordesc", vendordesc);
				model.addAttribute("size", articleDescriptionResults.size());
				model.addAttribute("divideSubmit", "Y");
				model.addAttribute("receiveCall", "M");
				model.addAttribute("vendorList", articleDescriptionResults);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			} else {
				modelAndView = new ModelAndView("descriptionLookup");
				model.addAttribute("nodata", "Y");
				model.addAttribute("vendordesc", vendordesc);
				model.addAttribute("size", "0");
				model.addAttribute("divideSubmit", "Y");
				model.addAttribute("receiveCall", "M");
				model.addAttribute("vendorList",
						new ArrayList<ArticleSearchResults>());
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} catch (Exception e) {

		}
		return modelAndView;

	}

	// //method called when verify icon clicked on the create order on receipt
	// screen
	@RequestMapping(value = "/autocomplete.htm", method = RequestMethod.GET)
	public ModelAndView autocomplete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		// //System.out.println("autocomplete" );
		// String vendordesc=(String) request.getParameter("vendorDesc");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		String vendorName = (String) request.getParameter("vendorName");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
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

				modelAndView = new ModelAndView("VendorLookup");
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
				modelAndView = new ModelAndView("VendorLookup");
				model.addAttribute("vendorList", supplierList1);

			}
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
		return modelAndView;

	}

	@RequestMapping(value = "/saveReceiveQty.htm", method = RequestMethod.GET)
	public void saveReceiveQty(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside Receive Save");
		String index = request.getParameter("index");
		String receiveQty = request.getParameter("recQty");
		String packOm = request.getParameter("packOm");
		// //System.out.println("request.getParameter(\"index\")"+request.getParameter("index"));
		// //System.out.println("request.getParameter(\"receiveQty\")"+request.getParameter("recQty"));

		if (order.getOrderType().equalsIgnoreCase("ZUB")) {
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				orderDetailBackup.get(Integer.parseInt(index) - 1)
						.setReceivedQty(receiveQty);
			}

		} else {
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				orderDetailBackup.get(Integer.parseInt(index) - 1)
						.setReceivedQty(receiveQty);
				// String msg="Deleted";
			}
		}

	}

	@RequestMapping(value = "/goodsReceive.htm", method = RequestMethod.GET)
	public ModelAndView goodsReceive(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		receiveParam.setSiteNo(param.getSiteNo());
		receiveParam.setOrderNo(order.getOrderNo());
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String adjustStatus = null;

		// ////System.out.println("AdjustmentQtyLength= "+request.getParameterValues("adjQty").length);
		String createStatus = orderService.goodsReceipt(receiveParam,
				orderDetail,user);
		if (orderAdjust.size() > 0)
			adjustStatus = orderService.orderAdjust(receiveParam, orderAdjust,user);

		String postStatus = null;
		if (createStatus == null && adjustStatus == null) {
			postStatus = "created:" + createStatus;
			// IBT goods received successfully
			orderAdjust = new ArrayList<OrderDetail>();
			receiveStatus = true;
			order.setOrderStatus("Received");
		} else if (createStatus == null && adjustStatus != null) {
			postStatus = "adjusted:" + adjustStatus;
			receiveStatus = false;
			// Order adjustment failed
			// orderAdjust=new ArrayList<OrderDetail>();
		} else {
			postStatus = "false:" + createStatus;
			receiveStatus = false;
			// IBT goods received failed
			// orderAdjust=new ArrayList<OrderDetail>();
		}
		model.addAttribute("receiveStatus", receiveStatus);
		model.addAttribute("msg", postStatus);
		ModelAndView modelAndView = new ModelAndView("ibtGoodsReceipt");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/cancelGoodsOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String cancelGoodsOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside cancel cal blk in controller");
		try {
			// receiveParam.setOrderNo(request.getParameter("poNoToCancel"));
		} catch (Exception e) {
			// receiveParam.setOrderNo(request.getParameter("orderNo"));
		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		CancelOrderParam cancelOrderParam = new CancelOrderParam();
		cancelOrderParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		cancelOrderParam.setPurOrdNo(request.getParameter("poNoToCancel"));
		// //System.out.println("order no from page"+request.getParameter("poNoToCancel"));
		String createStatus = "";
		try {
			createStatus = orderService.cancelOrder(cancelOrderParam,user);
		} catch (Exception e) {
		}
		String postStatus = null;
		if (createStatus == null) {
			postStatus = "true";
			// Request for cancelling the Order is successfully submitted
			cancelStatus = true;
			// order.setOrderStatus("Cancelled");
			/*
			 * if(orderList!=null && orderList.size()>=1){ for(int
			 * i=0;i<orderList.size();i++) {
			 * if(orderList.get(i).getOrderNo().equals(order.getOrderNo())) {
			 * orderList.get(i).setOrderStatus("Cancelled"); }
			 * 
			 * } }
			 */
		} else {
			postStatus = createStatus;
			// Request for cancelling the Order failed
			cancelStatus = false;
		}

		return postStatus;
	}

	@RequestMapping(value = "/confirmAdjustedQty.htm", method = RequestMethod.GET)
	public void confirmAdjustedQty(HttpServletRequest request,
			HttpServletResponse response) {

		String index = request.getParameter("index");
		String mvmType = request.getParameter("mvmType");
		String adjVal = request.getParameter("adjVal");
		// //System.out.println("index="+index);
		// //System.out.println("mvType="+mvmType);
		// //System.out.println("adjVal="+adjVal);
		if (adjVal != "" && adjVal != null) {
			OrderDetail adjustOrder = orderDetail
					.get(Integer.parseInt(index) - 1);
			adjustOrder.setAdjustedQty(adjVal);
			// //System.out.println("mvmtype"+ mvmType);
			/*
			 * ////System.out.println("boolean"+mvmType.startsWith("-"));
			 * if(mvmType.equalsIgnoreCase("Stock Correction")) mvmType="252";
			 * else mvmType="251"; ////System.out.println("mvmtype"+ mvmType);
			 */
			adjustOrder.setMvtType(mvmType);
			if (orderAdjust != null && orderAdjust.size() > 0) {
				for (int i = 0; i < orderAdjust.size(); i++) {
					if (orderAdjust.get(i).getArticle()
							.equalsIgnoreCase(adjustOrder.getArticle())) {
						orderAdjust.remove(i);
						break;
					}
				}
			}
			orderAdjust.add(adjustOrder);
			// //System.out.println("orderAdjust.size()"+orderAdjust.size());
		}

	}

	@RequestMapping(value = "/deleteArticle.htm", method = RequestMethod.GET)
	public ModelAndView deleteArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		model.addAttribute("invalidQty", "");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		if (order.getOrderType().equalsIgnoreCase("ZUB")) {

		} else {
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				orderDetailBackup.remove((Integer.parseInt(request
						.getParameter("index")) - 1));
				// String msg="Deleted";
			}
		}

		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("msg", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when receive order icon clicked on the create order on
	// receipt screen
	@RequestMapping(value = "/receiveOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String receiveOrder(HttpServletRequest request,
			HttpServletResponse response) {

		String invoiceNo = request.getParameter("invoiceNo");
		String invoiceTotal = request.getParameter("invoiceTotal");
		String gst = request.getParameter("gst");
		String delDock = request.getParameter("delDock");
		String temperature = "";
		try {
			if (request.getParameter("temperature") != null
					&& request.getParameter("temperature") != "") {
				temperature = request.getParameter("temperature");
			}

		} catch (Exception e) {
			e.printStackTrace();
		}
		// //System.out.println("temperature="+temperature);
		orderAdjust = new ArrayList<OrderDetail>();

		receiveParam = new ReceiveParam();
		if (param != null && param.getReconFlag() != null
				&& param.getReconFlag().equalsIgnoreCase("true")) {
			receiveParam.setReconFlag("true");
			// //System.out.println(receiveParam.getReconFlag());
		} else {
			receiveParam.setReconFlag("");
		}
		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("msg", "");
		orderDetailBackup = new ArrayList<OrderDetail>();
		orderDetailBackup.addAll(orderDetails);
		if (orderDetails != null && orderDetails.size() > 0) {
			for (int i = 0; i < orderDetails.size(); i++) {
				orderDetails.get(i).setReceivedQty(
						orderDetails.get(i).getOrderQty());

				receiveParam.setVendorNo(orderDetails.get(0).getSuppNo());
			}
		}

		receiveParam.setInvoiceNo(invoiceNo);
		receiveParam.setInvoiceTotal(invoiceTotal);
		receiveParam.setGst(gst);
		receiveParam.setDelDock(delDock);
		receiveParam.setTemperature(temperature);
		receiveParam.setOrderNo(manualOrderParam.getOrderRefNo());
		receiveParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		String receiveStatus = "true";
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			if (receiveParam.getInvoiceNo() != null
					&& receiveParam.getInvoiceNo().trim().length() > 0) {
				// //System.out.println("call add inv");
				receiveStatus = orderNormalService.receiveOrderAddInv(
						orderDetails, receiveParam,user);
			}
			if (receiveParam.getDelDock() != null
					&& receiveParam.getDelDock().trim().length() > 0) {
				// //System.out.println("test call add dock");
				receiveStatus = orderNormalService.receiveOrderAddDock(
						orderDetails, receiveParam,user);
			}
			if (receiveStatus == null) {

				receiveStatus = "true";

				// adding temperature in SAP
				try {
					// //System.out.println("adding temperature in SAP--->po receipt controler");
					TemperatureSetParam temperatureParam = new TemperatureSetParam();
					temperatureParam.setPurOrdNo(receiveParam.getOrderNo());
					temperatureParam.setGrTemp1(request
							.getParameter("temperature"));
					// //System.out.println("ord no"+temperatureParam.getPurOrdNo());
					// //System.out.println("temp gr 1"+temperatureParam.getGrTemp1());
					String temperatureUpdateStatus = orderNormalService
							.updateTemperature(temperatureParam,user);

					// //System.out.println("temperatureUpdateStatus"+temperatureUpdateStatus);

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
			model.addAttribute("receiveStatus", receiveStatus);
			model.addAttribute("receiveParam", receiveParam);
		} catch (Exception e) {
			e.printStackTrace();
		}

		return receiveStatus;
	}

	@RequestMapping(value = "/requestSearchForPagination.htm", method = RequestMethod.POST)
	public ModelAndView requestSearchForPagination(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		String pageNumber = request.getParameter("pageNumber");

		// system.err.println(pageNumber + "pageNumber");
		ModelAndView modelAndView = new ModelAndView("orderLookup", "param",
				param);
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");

		if (pageNumber != null && pageNumber.trim().length() > 0) {
			param.setPageNo(Integer.parseInt(pageNumber) > 0 ? Integer
					.parseInt(pageNumber) : 1);
		} else {
			param.setPageNo(1);
		}

		try {
			orderList = orderService.getOrders(param,user);
			model.addAttribute("param", param);
			if (orderList != null && orderList.size() > 0) {
				if (orderList.size() == 1) {
					return requestOrderDetail(request, response);
				} else if (orderList != null && orderList.size() > 1) {
					model.addAttribute("orderList", orderList);
					if (orderList.get(0).getMsg().trim().length() > 0
							&& orderList.get(0).getMsg() != null)
						param.setRecordCount(Integer.parseInt(orderList.get(0)
								.getMsg()));
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}
			} else {

			}

		} catch (Exception e) {

			orderList = new ArrayList<Order>();
			model.addAttribute("param", param);
			model.addAttribute("noResults",
					"Sorry, no results found for your search criteria. Please try again");
		}

		model.addAttribute("orderList", orderList);
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when open orders icon clicked on the create order on
	// receipt screen
	@RequestMapping(value = "/getOrderWithOpenStatus.htm", method = RequestMethod.GET)
	public ModelAndView getOrderWithOpenStatus(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		OrderParam param = new OrderParam();
		ModelMap model = new ModelMap();
		String articleNo = request.getParameter("articleNo");
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		// //System.out.println(dateFormat.format(date));
		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		Calendar cal1 = Calendar.getInstance();
		try {
			cal.setTime(dateFormat.parse(currentDate));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		cal.add(Calendar.DATE, 21);
		String toDate = dateFormat.format(cal.getTime());
		cal1.add(Calendar.DATE, -7);
		String deliveryFromDate = dateFormat.format(cal1.getTime());

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		param.setPageNo(1);
		param.setFromDate(deliveryFromDate);
		param.setToDate(toDate);
		param.setOrderStatus("Open");
		param.setOrderType("ZY");
		param.setArticleNo(articleNo);
		ArrayList<Order> orderListOfOpenStatus = new ArrayList<Order>();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		// ArrayList<Order> orderListOfOpenStatusOfZY =new ArrayList<Order>();
		try {

			// model.addAttribute("noData", "");
			orderListOfOpenStatus = orderService.getOrders(param,user);
			param.setOrderType("ZY");
			// orderListOfOpenStatusOfZY = orderService.getOrders(param);
			/*
			 * if(orderListOfOpenStatusOfZY!=null &&
			 * orderListOfOpenStatusOfZY.size()>0) {
			 * orderListOfOpenStatus.addAll(orderListOfOpenStatusOfZY); }
			 */
			if (orderListOfOpenStatus != null
					&& orderListOfOpenStatus.size() == 1) {

				if (orderListOfOpenStatus.get(0).getOrderNo() == ""
						|| orderListOfOpenStatus.get(0).getOrderNo() == null
						|| orderListOfOpenStatus.get(0).getMsg()
								.equalsIgnoreCase("No Data Found")) {
					model.addAttribute("noResults",
							"Sorry, no results found for your search criteria. Please try again");
					orderListOfOpenStatus = new ArrayList<Order>();
				}

			} else if (orderListOfOpenStatus != null
					&& orderListOfOpenStatus.size() > 1) {
				model.addAttribute("noResults", "");
			} else if (orderListOfOpenStatus == null
					|| orderListOfOpenStatus.size() == 0) {
				model.addAttribute("noResults",
						"Sorry, no results found for your search criteria. Please try again");
			}

		} catch (Exception e) {
			orderListOfOpenStatus = new ArrayList<Order>();
			model.addAttribute("param", param);
			model.addAttribute("noResults",
					"Sorry, no results found for your search criteria. Please try again");
		}
		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {
			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				if (articleSearchResultsforCreate.get(i).getArticleNo()
						.equals(articleNo)) {
					model.addAttribute("articleNo",
							articleSearchResultsforCreate.get(i).getArticleNo());
					model.addAttribute("articleName",
							articleSearchResultsforCreate.get(i)
									.getDescription());
					break;
				}

			}
		}
		if (orderListOfOpenStatus != null && orderListOfOpenStatus.size() > 0)
			model.addAttribute("size", orderListOfOpenStatus.size());
		else
			model.addAttribute("size", "0");
		model.addAttribute("openOrderList", orderListOfOpenStatus);

		model.addAttribute("noResults", "");
		ModelAndView modelAndView = new ModelAndView("ordersWithOpenStatus");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// saveVendorClaimAuth
	@RequestMapping(value = "/saveVendorClaimAuth.htm", method = RequestMethod.POST)
	public ModelAndView saveVendorClaimAuth(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		String authNo = request.getParameter("vendorClaimVal");
		// receiveParam.setVendorAuthNo();
		receiveParam.setAuthNo(authNo);
		receiveParam.setVendorClaimOrderNo(request
				.getParameter("orderNoVendorClaim"));

		model.addAttribute("noResults", "");
		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("msg", "");
		// model.addAttribute("hideContent","true");
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String status = orderService.getVendorClaims(receiveParam,user);
		if (status == null) {
			if (order != null) {
				String siteNo = ((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo();
				ArrayList<Order> tempList = callOrderService(
						order.getOrderNo(), siteNo,user);
				if (tempList != null && tempList.size() > 0
						&& tempList.get(0).getVendorclaim() != null
						&& tempList.get(0).getVendorclaim() != "") {
					receiveParam.setVendorAuthNo(tempList.get(0)
							.getVendorclaim());
					// //System.out.println("vendorclaimNo"+tempList.get(0).getVendorclaim());
					order.setVendorclaim(tempList.get(0).getVendorclaim());
					// orderd
					if (orderList != null && orderList.size() > 0) {
						for (int i = 0; i < orderList.size(); i++) {
							if (orderList
									.get(i)
									.getOrderNo()
									.equalsIgnoreCase(
											receiveParam
													.getVendorClaimOrderNo())) {
								orderList.get(i).setVendorclaim(
										tempList.get(0).getVendorclaim());
							}
						}
					}

					// //system.err.println(" vendor claim authority success");

				} else {
					/*
					 * //receiveParam.setVendorAuthNo("");
					 * //system.err.println(" vendor claim authority failure");
					 * model.addAttribute("msg", "vendorfailure");
					 * model.addAttribute("status", status);
					 */
				}
			} else {
				// receiveParam.setVendorAuthNo("");
				/*
				 * //system.err.println(" vendor claim authority failure");
				 * model.addAttribute("msg", "vendorfailure");
				 * model.addAttribute("status", status);
				 */
			}
			// system.err.println(" vendor claim authority success");
			model.addAttribute("msg", "vendorsuccess");
			model.addAttribute("status", status);
		} else {
			// receiveParam.setVendorAuthNo("");
			// system.err.println(" vendor claim authority failure");
			model.addAttribute("msg", "vendorfailure");
			model.addAttribute("status", status);
		}
		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/storeNoValidation.htm", method = RequestMethod.GET)
	@ResponseBody
	public String storeNoValidation(HttpServletRequest request,
			HttpServletResponse response) {
		String storeNumber = "";
		String storeName = "";
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if (request.getParameter("ibtSiteType") != null
				&& request.getParameter("ibtSiteType").trim().length() > 0
				&& request.getParameter("ibtSiteType")
						.equalsIgnoreCase("Store")) {
			// boolean validStore = false;
			if (request.getParameter("vendorDesc") != null
					&& request.getParameter("vendorDesc").trim().length() > 0) {

				ArrayList<Store> storeList = null;
				/*
				 * String[] storeNo = request.getParameter("vendorDesc")
				 * .split("-");
				 */
				String storeVal = request.getParameter("vendorDesc");

				try {
					if (storeVal != null) {
						// storeVal = storeNo[0];
						storeList = orderService
								.getStoreValidationDetails(storeVal,user);

					}

					if (storeList != null && storeList.size() == 1) {
						storeNumber = storeList.get(0).getSiteNumber();
						storeName = storeList.get(0).getSiteDescription();
						return "true-" + storeNumber + "-" + storeName;
					} else if (storeList != null && storeList.size() > 1) {
						// //System.out.println("storeList grater than 1");
						return "multiple-" + storeNumber + "-" + storeName;
					} else {
						return "false";
					}

				} catch (Exception e) {
					e.printStackTrace();
					return "false";
				}
			}
		}
		return "false";
	}

	@RequestMapping(value = "/nearByStoreValidation.htm", method = RequestMethod.GET)
	public ModelAndView nearByStoreValidation(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("siteDetails");
		String distance = request.getParameter("distance");
		String maxResults = request.getParameter("maxResults");
		String[] salesOrg = request.getParameterValues("salesOrg");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		List<StoresNearByModel> storeList = null;
		if (salesOrg != null && salesOrg.length != 0) {

			try {
				storeList = orderService.getStoresNearBy(salesOrg, distance,
						maxResults, siteNo,user);

				if (storeList != null && storeList.size() > 0) {
					// //System.out.println("inside 1");
					// //System.out.println("storeDetailsList--->"
					// + storeList.get(0).getSiteNo());
					model.addAttribute("siteDtlsList", storeList);
					model.addAttribute("noSearchResults", "");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
				} else {
					model.addAttribute("siteDtlsList",
							new ArrayList<StoresNearByModel>());
					model.addAttribute("noSearchResults",
							"Sorry, no results found for your search criteria. Please try again");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
				}
				return modelAndView;

			} catch (Exception e) {
				e.printStackTrace();
				storeList = new ArrayList<StoresNearByModel>();
				model.addAttribute("siteDtlsList", storeList);
				model.addAttribute("noSearchResults",
						"Sorry, no results found for your search criteria. Please try again");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}
		}
		storeList = new ArrayList<StoresNearByModel>();
		model.addAttribute("siteDtlsList", storeList);
		model.addAttribute("noSearchResults", "No Data Found");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/siteSearch.htm", method = RequestMethod.GET)
	public ModelAndView siteSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("siteDetails");
		String distance = (String) request.getParameter("distance");
		// String options = request.getParameter("optionsList");
		String[] checkBoxValues = new String[30];
		checkBoxValues = request.getParameterValues("optionsList");
		// //System.out.println("chk box vals in controller");
		for (int i = 0; i < checkBoxValues.length; i++) {
			// //System.out.println("" + checkBoxValues[i]);
		}
		String maxRows = "0";
		String siteNo = param.getSiteNo();
		String resSize = (String) request.getParameter("resSize");
		ArrayList<StoresNearByModel> storeDetailsList;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			storeDetailsList = (ArrayList<StoresNearByModel>) orderService
					.getStoresNearBy(checkBoxValues, distance, resSize, siteNo,user);
			if (storeDetailsList != null && storeDetailsList.size() > 0) {
				// //System.out.println("inside 1");
				// //System.out.println("storeDetailsList--->"
				// + storeDetailsList.get(0).getSiteNo());
				model.addAttribute("siteDtlsList", storeDetailsList);
				model.addAttribute("size", storeDetailsList.size());
				model.addAttribute("noSearchResults", "");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
			} else {
				model.addAttribute("siteDtlsList",
						new ArrayList<StoresNearByModel>());
				model.addAttribute("noSearchResults", "No Data Found");
				model.addAttribute("size", "0");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
			}
			return modelAndView;

		} catch (Exception e) {
			e.printStackTrace();
			storeDetailsList = new ArrayList<StoresNearByModel>();
			model.addAttribute("siteDtlsList", storeDetailsList);
			model.addAttribute("noSearchResults", "No Data Found");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

	}

	@RequestMapping(value = "/onPageLoadRecon.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadRecon(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		modelRecon = new ModelMap();
		paramRecon = new InvoiceReconcilationParam();
		paramRecon.setStore(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo()
				+ "-"
				+ ((UserContext) request.getSession().getAttribute("user"))
						.getSiteName());
		paramRecon.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());
		paramRecon.setInvFlag("off");
		paramRecon.setAdjFlag("off");
		paramRecon.setDiscrpAmt("20");
		modelRecon.addAttribute("noData", "");
		deptInfoList = new ArrayList<Department>();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);
			modelRecon.addAttribute("param", paramRecon);
			modelRecon.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			modelRecon.addAttribute("noData", "No Department Data Found ");
			modelRecon
					.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		ModelAndView modelAndView = new ModelAndView("reconciliationReport");
		modelRecon.addAttribute("param", paramRecon);
		modelAndView.addObject("model", modelRecon);
		modelAndView.addAllObjects(modelRecon);
		return modelAndView;
	}

	// generateReconcilReport.htm
	@RequestMapping(value = "/generateReconcilReport.htm", method = RequestMethod.GET)
	public ModelAndView generateReconcilReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("generateReconcilReport");

		ModelAndView modelAndView = new ModelAndView("reconciliationReport");

		reconciliationReport = new ArrayList<InvoiceReconcilationModel>();
		reconciliationReportPrint = new ArrayList<InvoiceReconcilationModel>();

		paramRecon.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());

		paramRecon.setOrderNo(request.getParameter("orderNo"));
		paramRecon.setDept(request.getParameter("department"));
		paramRecon.setDiscrpAmt(request.getParameter("discrpAmt"));
		paramRecon.setFromDateGrn(request.getParameter("grnFromDate"));
		paramRecon.setToDateGrn(request.getParameter("grnToDate"));

		if (paramRecon.getFromDateGrn().length() == 8) {
			// //System.out.println("4");
			paramRecon.setFromDateGrn(y2ToY4Converter(paramRecon
					.getFromDateGrn()));
		}
		if (paramRecon.getToDateGrn().length() == 8) {
			// //System.out.println("3");

			paramRecon.setToDateGrn(y2ToY4Converter(paramRecon.getToDateGrn()));
		}

		paramRecon.setStoreNo(request.getParameter("storeNo"));
		paramRecon.setInvFlag(request.getParameter("invoiceHidden"));
		paramRecon.setAdjFlag(request.getParameter("rangedHidden"));

		paramRecon.setPageNumber(1);

		modelRecon.addAttribute("noData", "");
		modelRecon.addAttribute("reconcileList",
				new ArrayList<InvoiceReconcilationModel>());
		paramRecon.setRecordCount(0);

		// set department text for print
		if (paramRecon.getDept() != null
				&& paramRecon.getDept().trim().length() <= 0) {
			paramRecon.setDepartmentText("ALL");
		} else {
			for (int i = 0; i < deptInfoList.size(); i++) {
				if (deptInfoList.get(i).equals(paramRecon.getDept())) {
					paramRecon.setDepartmentText(deptInfoList.get(i).getNode()
							+ " - " + deptInfoList.get(i).getNodeDesc());
				}
			}

		}
		paramRecon.setReceiptsWithText("");
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		// set Receipt with text for print
		if (paramRecon.getInvFlag() != null
				&& paramRecon.getInvFlag().trim().length() > 0
				&& paramRecon.getInvFlag().equalsIgnoreCase("on")) {
			paramRecon.setReceiptsWithText("No Invoice");
		}
		if (paramRecon.getAdjFlag() != null
				&& paramRecon.getAdjFlag().trim().length() > 0
				&& paramRecon.getAdjFlag().equalsIgnoreCase("on")) {
			if (paramRecon.getReceiptsWithText().trim().length() > 0)
				paramRecon.setReceiptsWithText(paramRecon.getReceiptsWithText()
						+ " , Adjustment");
			else
				paramRecon.setReceiptsWithText("Adjustment");
		}

		try {
			reconciliationReport = (ArrayList<InvoiceReconcilationModel>) invoiceReconcileServiceImpl
					.getInvoiceReconcilationDetails(paramRecon, "normal",user);

			if (reconciliationReport != null && reconciliationReport.size() > 0) {
				if (reconciliationReport.get(0).getPurchaseOrder() != null
						&& reconciliationReport.get(0).getPurchaseOrder()
								.trim().length() > 0) {
					// for print
					reconciliationReportPrint = (ArrayList<InvoiceReconcilationModel>) invoiceReconcileServiceImpl
							.getInvoiceReconcilationDetails(paramRecon, "print",user);

					modelRecon.addAttribute("reconcilePrintList",
							reconciliationReportPrint);
					if (reconciliationReport.get(0).getMsg().trim().length() > 0
							&& reconciliationReport.get(0).getMsg() != null) {
						paramRecon
								.setRecordCount(Integer
										.parseInt(reconciliationReport.get(0)
												.getMsg()));
						modelRecon.addAttribute("reconcileList",
								reconciliationReport);
					}
					// model.addAttribute("reconcileList",
					// reconciliationReport);
				} else {
					modelRecon
							.addAttribute(
									"noData",
									"Could not generate the report since there is no data for selected parameters. Please try different parameters.");
				}
				// //System.out.println(" po----->" +
				// reconciliationReport.get(0).getPurchaseOrder());

			} else {
				paramRecon.setRecordCount(0);
				modelRecon.addAttribute("reconcileList",
						new ArrayList<InvoiceReconcilationModel>());
				modelRecon
						.addAttribute(
								"noData",
								"Could not generate the report since there is no data for selected parameters. Please try different parameters.");
				modelAndView.addObject("model", modelRecon);
				modelAndView.addAllObjects(modelRecon);
				return modelAndView;
			}

		} catch (Exception e) {
			paramRecon.setRecordCount(0);
			modelRecon.addAttribute("reconcileList",
					new ArrayList<InvoiceReconcilationModel>());
			modelRecon
					.addAttribute(
							"noData",
							"Could not generate the report since there is no data for selected parameters. Please try different parameters.");

			modelAndView.addObject("model", modelRecon);
			modelAndView.addAllObjects(modelRecon);
			return modelAndView;
		}

		modelRecon.addAttribute("param", paramRecon);
		modelAndView.addObject("model", modelRecon);
		modelAndView.addAllObjects(modelRecon);
		return modelAndView;

	}

	@RequestMapping(value = "/requestSearchForPaginationRecon.htm", method = RequestMethod.GET)
	public ModelAndView requestSearchForPaginationRecon(
			HttpServletRequest request, HttpServletResponse response) {
		// //System.out.println("requestSearchForPagination");
		modelRecon.addAttribute("noData", "");
		ModelAndView modelAndView = new ModelAndView("reconciliationReport");

		String pageNumber = request.getParameter("pageNumber");

		if (pageNumber != null && pageNumber.trim().length() > 0) {
			paramRecon.setPageNumber(Integer.parseInt(pageNumber) > 0 ? Integer
					.parseInt(pageNumber) : 1);
		} else {
			paramRecon.setPageNumber(1);
		}

		modelRecon.addAttribute("noData", "");
		// param.setPaginationCheck(true);

		reconciliationReport = new ArrayList<InvoiceReconcilationModel>();

		/*
		 * param.setSiteNo(((UserContext) request.getSession()
		 * .getAttribute("user")).getSiteNo());
		 */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		paramRecon.setRecordCount(0);
		try {
			reconciliationReport = (ArrayList<InvoiceReconcilationModel>) invoiceReconcileServiceImpl
					.getInvoiceReconcilationDetails(paramRecon, "normal",user);

			if (reconciliationReport != null && reconciliationReport.size() > 0) {
				if (reconciliationReport.get(0).getPurchaseOrder() != null
						&& reconciliationReport.get(0).getPurchaseOrder()
								.trim().length() > 0) {
					if (reconciliationReport.get(0).getMsg().trim().length() > 0
							&& reconciliationReport.get(0).getMsg() != null)
						paramRecon
								.setRecordCount(Integer
										.parseInt(reconciliationReport.get(0)
												.getMsg()));
					modelRecon.addAttribute("reconcileList",
							reconciliationReport);
				}

			} else {
				paramRecon.setRecordCount(0);
				modelRecon.addAttribute("reconcileList",
						new ArrayList<InvoiceReconcilationModel>());
				modelRecon
						.addAttribute(
								"noData",
								"Could not generate the report since there is no data for selected parameters. Please try different parameters.");
				modelAndView.addObject("model", modelRecon);
				modelAndView.addAllObjects(modelRecon);
				return modelAndView;
			}

		} catch (Exception e) {
			paramRecon.setRecordCount(0);
			modelRecon.addAttribute("reconcileList",
					new ArrayList<InvoiceReconcilationModel>());
			modelRecon
					.addAttribute(
							"noData",
							"Could not generate the report since there is no data for selected parameters. Please try different parameters.");
			modelAndView.addObject("model", modelRecon);
			modelAndView.addAllObjects(modelRecon);
			return modelAndView;
		}

		modelRecon.addAttribute("param", paramRecon);
		modelAndView.addObject("model", modelRecon);
		modelAndView.addAllObjects(modelRecon);
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

	public ArrayList<Order> callOrderService(String orderNo, String siteNo,UserContext user) {
		ArrayList<Order> tempList = null;
		// //System.out.println("orderNO"+orderNo);
		OrderParam vendorParam = new OrderParam();
		vendorParam.setOrderNo(orderNo);
		vendorParam.setSearchByOptions("number");
		vendorParam.setSiteNo(siteNo);
		try {
			tempList = orderService.getOrders(vendorParam,user);
		} catch (Exception e) {
			e.printStackTrace();
			return tempList;

		}
		return tempList;
	}

	public PReqServiceImpl getOrderService() {
		return orderService;
	}

	public void setOrderService(PReqServiceImpl orderService) {
		this.orderService = orderService;
	}

	public OrderServiceImpl getOrderNormalService() {
		return orderNormalService;
	}

	public void setOrderNormalService(OrderServiceImpl orderNormalService) {
		this.orderNormalService = orderNormalService;
	}

	/********************* SALES HISTORY ********************************/

	@RequestMapping(value = "/getSalesHistory.htm", method = RequestMethod.GET)
	public ModelAndView getSalesHistory(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("salesHistory");
		String articleNo = (String) request.getParameter("articleNo");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();

		ArrayList<SalesHistory> SalesHistoryList = null;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");

		try {

			SalesHistoryList = (ArrayList<SalesHistory>) orderService
					.getSalesHistoryList(articleNo, siteNo,user);

			if (SalesHistoryList != null && SalesHistoryList.size() > 0) {
				model.addAttribute("salesHistoryList", SalesHistoryList);
			} else {
				model.addAttribute("salesHistoryList",
						new ArrayList<SalesHistory>());
			}
		} catch (Exception e) {

			model.addAttribute("salesHistoryList",
					new ArrayList<SalesHistory>());

		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}
}
