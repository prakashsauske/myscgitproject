/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.InvoiceReconcilationModel;
import au.com.woolworths.portal.model.MovementType;
import au.com.woolworths.portal.model.Order;
import au.com.woolworths.portal.model.OrderDetail;
import au.com.woolworths.portal.model.OrderItemInfo;
import au.com.woolworths.portal.model.OrderPreferenceMaster;
import au.com.woolworths.portal.model.OrderPreferenceUsr;
import au.com.woolworths.portal.model.OrderType;
import au.com.woolworths.portal.model.ReturnOrderDtl;
import au.com.woolworths.portal.model.ReturnOrderLookup;
import au.com.woolworths.portal.model.SalesHistory;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoresNearByModel;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.CancelOrderParam;
import au.com.woolworths.portal.param.CreateParam;
import au.com.woolworths.portal.param.InvoiceReconcilationParam;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.param.OrderHdrInfoParam;
import au.com.woolworths.portal.param.OrderParam;
import au.com.woolworths.portal.param.ReceiveParam;
import au.com.woolworths.portal.param.ReturnHdrInfoParam;
import au.com.woolworths.portal.param.ReturnOrderInfoParam;
import au.com.woolworths.portal.param.TemperatureSetParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InvoiceReconcilationServiceImpl;
import au.com.woolworths.portal.service.OrderPreferenceDAOImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.PReqServiceImpl;
import au.com.woolworths.portal.service.ReturnOrderSearchServiceImpl;
import au.com.woolworths.portal.service.SohAdjustLogServiceImpl;
import au.com.woolworths.portal.service.UserMgtDAOImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/order")
public class OrderController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['claimsLookUp']}")
	private String screenCode;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['returnCreateClaims']}")
	private String screenCode1;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['CreateWarehouseOrder']}") applicationSettings CR
	//private String screenCode1;
	
	@Value("#{properties['Enquiry']}")
	private String screenCode2;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private PReqServiceImpl pReqService;

	@Autowired
	private SohAdjustLogServiceImpl sohAdjustLogServiceImpl;

	@Autowired
	private ArticleServiceImpl articleService;

	@Value("#{url['DateRange']}")
	private Integer dateRange;

	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	public SohAdjustLogServiceImpl getSohAdjustLogServiceImpl() {
		return sohAdjustLogServiceImpl;
	}

	public void setSohAdjustLogServiceImpl(
			SohAdjustLogServiceImpl sohAdjustLogServiceImpl) {
		this.sohAdjustLogServiceImpl = sohAdjustLogServiceImpl;
	}

	private ArrayList<OrderDetail> orderAdjust;
	private ManualOrderParam manualOrderParam;
	private List<ArticleSearchResults> articleDescriptionResults;

	private CreateParam createOrderParam;
	private OrderDetail orderDet;
	private String disable;
	private boolean cancelStatus;
	private boolean receiveStatus;
	private boolean descriptionFlag;

	private ArrayList<OrderDetail> bkUpOrderDetail;
	private ArrayList<OrderDetail> orderDetailBackup;
	private ArrayList<OrderDetail> orderDetailLookUp;
	private ArrayList<OrderDetail> orderDetailForAddArticle;

	List<ArticleSearchResults> articleSearchResults = new ArrayList<ArticleSearchResults>();

	ArrayList<ArticleSearchResults> updatedArticleResults = new ArrayList<ArticleSearchResults>();

	List<ArticleSearchResults> articleSearchResultsFetched = null;

	List<ArticleSearchResults> articleSearchResultsforCreate;

	List<ArticleSearchResults> addArtSearchResults = new ArrayList<ArticleSearchResults>();
	List<ArticleSearchResults> articleSearchResultsForReceive;
	private ArrayList<Order> orderListForReceive;
	private ArrayList<Order> orderListForPR;

	private UserContext userDetail;

	private boolean postSuccessFlag = false;
	private boolean existingInd = false;

	private OrderParam param;
	private ModelMap model;
	private Order order;
	private Integer backUpIndex;
	private ArrayList<OrderDetail> orderDetail;
	ReceiveParam receiveParam;

	List<Order> orderList = null;
	List<ArticleSearchResults> articleList;

	public OrderServiceImpl getOrderService() {
		return orderService;
	}

	public void setOrderService(OrderServiceImpl orderService) {
		this.orderService = orderService;
	}

	private final static String Open = "open";
	private final static String Authorized = "Authorised";
	private final static String All = "All";
	private final static String Cancelled = "Cancelled";
	private final static String Received = "Received";
	private final static String Closed = "Closed";
	private final static String NDF = "No Data Found";
	private final static String UPDATED = "Updated Succesfully.";
	private final static String NO_CHG = "No Change Done.";

	private ModelMap modelRecon;
	private InvoiceReconcilationParam paramRecon;

	List<Department> deptInfoList;

	private ArrayList<InvoiceReconcilationModel> reconciliationReport;
	private ArrayList<InvoiceReconcilationModel> reconciliationReportPrint;

	@Autowired
	private InvoiceReconcilationServiceImpl invoiceReconcileServiceImpl;
	@Autowired
	private ReturnOrderSearchServiceImpl returnOrderSearchService;

	public InvoiceReconcilationServiceImpl getInvoiceReconcileServiceImpl() {
		return invoiceReconcileServiceImpl;
	}

	public void setInvoiceReconcileServiceImpl(
			InvoiceReconcilationServiceImpl invoiceReconcileServiceImpl) {
		this.invoiceReconcileServiceImpl = invoiceReconcileServiceImpl;
	}

	// orderlook up onpageload method

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
		/*if(user.getUserAccessMap().containsKey(screenCode2)){
			if(user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		param = new OrderParam();
		model = new ModelMap();
		orderListForPR = new ArrayList<Order>();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		setOrderType();
		setSalesOrg();
		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		try {
			cal.setTime(dateFormat.parse(currentDate));
		} catch (ParseException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		cal.add(Calendar.DATE, -dateRange);
		String fromDate = dateFormat.format(cal.getTime());
		String toDate = currentDate;

		param.setSiteNo(userDetail.getSiteNo());
		param.setPageNo(1);
		param.setFromDate(fromDate);
		param.setToDate(toDate);
		param.setOrderType("");
		param.setOrderStatus(Authorized);
		String listCount = "";
		model.addAttribute("noData", "");

		try {

			getPreferenceDetails(param, request, response);
			// orderList = orderService.getOrders(param);

			/*
			 * Order order1=new Order(); order1.setOrderNo("sdjfkl");
			 * order1.setMsg("fjdklsjf"); orderList=new ArrayList<Order>();
			 * orderList.add(order1);
			 */

			/*
			 * if (orderList != null && orderList.size() == 1) {
			 * 
			 * if (orderList.get(0).getOrderNo() == "" ||
			 * orderList.get(0).getOrderNo() == null ||
			 * orderList.get(0).getMsg() .equalsIgnoreCase("No Data Found")) {
			 * model.addAttribute("noResults",
			 * "Sorry, no results found for your search criteria. Please try again"
			 * ); orderList = new ArrayList<Order>(); } else {
			 * model.addAttribute("noResults", ""); listCount =
			 * orderList.get(0).getMsg();
			 * param.setRecordCount(Integer.parseInt(listCount)); // return
			 * requestOrderDetail(request, response); }
			 * 
			 * } else if (orderList != null && orderList.size() > 1) { listCount
			 * = orderList.get(0).getMsg();
			 * param.setRecordCount(Integer.parseInt(listCount));
			 * model.addAttribute("noResults", ""); } else if (orderList == null
			 * || orderList.size() == 0) { model.addAttribute("noResults",
			 * "Sorry, no results found for your search criteria. Please try again"
			 * ); }
			 */
		} catch (Exception e) {

			e.printStackTrace();
			/*
			 * orderList = new ArrayList<Order>(); model.addAttribute("param",
			 * param); model.addAttribute("noResults",
			 * "Sorry, no results found for your search criteria. Please try again"
			 * );
			 */
		}
		List<Department> deptInfoList = new ArrayList<Department>();
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		model.addAttribute("orderList", orderList);
		model.addAttribute("param", param);
		// model.addAttribute("noResults", "");

		ModelAndView modelAndView = new ModelAndView("orderLookup");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method used to set order types before going to order lookup page.
	private void setOrderType() {

		ArrayList<OrderType> orderTypes = new ArrayList<OrderType>();

		OrderType type1 = new OrderType("ZY", "Normal Preq");
		OrderType type2 = new OrderType("ZX", "Preq at GR");
		OrderType type3 = new OrderType("ZP", "Normal Preq (Produce)");
		OrderType type4 = new OrderType("ZPX", "Preq at GR (Produce)");
		OrderType type5 = new OrderType("ZPE", "Emergency Preq (Produce)");
		OrderType type6 = new OrderType("ZNBP",
				"Vendor Authorised PO (Produce)");
		OrderType type7 = new OrderType("ZN", "Normal Preq (Supermarkets)");
		OrderType type8 = new OrderType("ZNX", "Preq at GR (Supermarkets)");
		OrderType type9 = new OrderType("ZNE", "Emergency Preq (Supermarkets)");
		OrderType type10 = new OrderType("ZNB", "Vendor Authorised PO (Petrol)");

		OrderType type11 = new OrderType("ZUB", "Retail STO (IBT All)");
		OrderType type12 = new OrderType("ZUBIN", "Retail STO (IBT In)");
		OrderType type13 = new OrderType("ZUBOUT", "Retail STO (IBT Out)");

		// OrderType type5 = new OrderType("ZUBPO",
		// "Warehouse PO (Retail STO)");

		// OrderType type6 = new OrderType("ZB", "BOM Pur Req");

		// OrderType type10 = new OrderType("ZXP", "BR 5 PReq Prd NoPrnt");

		orderTypes.add(type1);
		orderTypes.add(type2);
		orderTypes.add(type3);

		orderTypes.add(type4);
		orderTypes.add(type5);
		orderTypes.add(type6);
		orderTypes.add(type7);
		orderTypes.add(type8);
		orderTypes.add(type9);
		orderTypes.add(type10);
		orderTypes.add(type11);
		orderTypes.add(type12);
		orderTypes.add(type13);
		model.addAttribute("orderTypes", orderTypes);

		model.addAttribute("param", param);

	}

	// method called when before going to order lookup page.
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
		}

		return yyyy.format(actualDate);
	}

	// method called when clicking go button on orderlookup page.
	@RequestMapping(value = "/advancedOrderSearch.htm", method = RequestMethod.POST)
	public ModelAndView advancedOrderSearch(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		param = new OrderParam();
		orderListForPR = new ArrayList<Order>();
		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		model.addAttribute("openOrder", "");
		String advaceFlag = request.getParameter("advanceFlag");
		String deliveryFromDate = request.getParameter("deliveryFromDate");
		String fromDate = request.getParameter("fromDate");
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
		if (request.getParameter("orderType") != null
				&& request.getParameter("orderType").trim().length() > 0) {
			if (request.getParameter("orderType").equalsIgnoreCase("ZUBIN")) {
				param.setIbtFlag("IN");
				param.setOrderType("ZUB");
			} else if (request.getParameter("orderType").equalsIgnoreCase(
					"ZUBOUT")) {
				param.setIbtFlag("OUT");
				param.setOrderType("ZUB");
			} else if (request.getParameter("orderType").equalsIgnoreCase(
					"ZUBPO")) {
				param.setIbtFlag("PO");
				param.setOrderType("ZUB");
			} else if (request.getParameter("orderType")
					.equalsIgnoreCase("ZUB")) {
				param.setIbtFlag("ALL");
				param.setOrderType("ZUB");
			}

			else {
				param.setIbtFlag("OTHERS");
				param.setOrderType(request.getParameter("orderType"));
			}
		} else {
			param.setOrderType(request.getParameter("orderType"));
		}
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
			model.addAttribute("noData", "");
			if (param.getIbtFlag().equalsIgnoreCase("IN")) {
				param.setStoreOrderFlag("A");
				orderList = orderService.getOrdersIn(param,userDetail);
			} else if (param.getIbtFlag().equalsIgnoreCase("OUT")) {
				param.setStoreOrderFlag("A");
				orderList = orderService.getOrdersOut(param,userDetail);
			} else if (param.getIbtFlag().equalsIgnoreCase("ALL")) {
				param.setStoreOrderFlag("A");
				orderList = orderService.getOrdersALL(param,userDetail);
			} else if (param.getIbtFlag().equalsIgnoreCase("PO")) {
				param.setStoreOrderFlag("B");
				orderList = orderService.getOrdersIn(param,userDetail);
			} else {
				param.setStoreOrderFlag("");
				orderList = orderService.getOrders(param,userDetail);
			}

			if (orderList != null && orderList.size() == 1) {

				if (orderList.get(0).getOrderNo() == ""
						|| orderList.get(0).getOrderNo() == null
						|| orderList.get(0).getMsg()
								.equalsIgnoreCase("No Data Found")) {
					if (orderList.get(0).getpReqNo() == null
							|| orderList.get(0).getpReqNo().trim().length() == 0) {
						model.addAttribute("noResults",
								"Sorry, no results found for your search criteria. Please try again");
						model.addAttribute("orderList", null);
					} else {
						model.addAttribute("noResults", "");
						listCount = "0";
						param.setRecordCount(Integer.parseInt(listCount));
						if ("PR".equals(orderList.get(0).getType())) {

							return requestPReqDetail(request, response);
						} else {

						}
						return requestOrderDetail(request, response);
					}
				} else {
					model.addAttribute("noResults", "");
					listCount = "0";
					param.setRecordCount(Integer.parseInt(listCount));

					if ((orderList.get(0).getpReqNo() != null && orderList
							.get(0).getpReqNo().trim().length() > 0)
							|| (orderList.get(0).getOrderNo() != null && orderList
									.get(0).getOrderNo().trim().length() > 0)) {

						if ("PR".equals(orderList.get(0).getType())) {
							return requestPReqDetail(request, response);
						} else {

						}
						return requestOrderDetail(request, response);
					} else {
						orderList = null;
						model.addAttribute("noResults",
								"Sorry, no results found for your search criteria. Please try again");
					}
				}

			} else if (orderList != null && orderList.size() > 1) {

				if ((!param.getOrderType().equals("ZX") && !param
						.getOrderType().equals("ZY"))) {
					listCount = orderList.get(0).getMsg().trim();
					param.setRecordCount(Integer.parseInt(listCount));
				} else {
					if (param.getOrderStatus() != null
							&& param.getOrderStatus().trim().length() > 0
							&& !(param.getOrderStatus().equalsIgnoreCase(
									"Select") || param.getOrderStatus()
									.equalsIgnoreCase("All"))) {
						Integer size = orderList.size();
						listCount = size.toString();
						if (listCount != null && listCount.trim().length() > 0)
							param.setRecordCount(Integer.parseInt(listCount
									.trim()));
						orderListForPR = new ArrayList<Order>();
						orderListForPR.addAll(orderList);
						orderList = new ArrayList<Order>();
						for (int i = 0; i < (orderListForPR.size() >= 20 ? 20
								: orderListForPR.size()); i++) {
							orderList.add(orderListForPR.get(i));
						}
					} else {
						listCount = orderList.get(0).getMsg().trim();
						param.setRecordCount(Integer.parseInt(listCount));
					}

				}
				model.addAttribute("noResults", "");
			} else if (orderList == null || orderList.size() == 0) {
				model.addAttribute("noResults",
						"Sorry, no results found for your search criteria. Please try again");
			}

		} catch (Exception e) {

			e.printStackTrace();
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

	// not used
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
		if (request.getParameter("orderType") != null
				&& request.getParameter("orderType").trim().length() > 0) {
			if (request.getParameter("orderType").equalsIgnoreCase("ZUBIN")) {
				param.setIbtFlag("IN");
				param.setOrderType(request.getParameter("ZUB"));
			} else if (request.getParameter("orderType").equalsIgnoreCase(
					"ZUBOUT")) {
				param.setIbtFlag("OUT");
				param.setOrderType(request.getParameter("ZUB"));
			} else {
				param.setOrderType(request.getParameter("orderType"));
			}
		} else {
			param.setIbtFlag("ALL");
			param.setOrderType(request.getParameter("orderType"));
		}
		// param.setOrderType(request.getParameter("orderType"));
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
			model.addAttribute("noData", "");
			orderList = orderService.getOrders(param,userDetail);

			if (orderList != null && orderList.size() == 1) {
				if (orderList.get(0).getMsg().trim().length() > 0) {
					model.addAttribute("noResults", orderList.get(0).getMsg());
					orderList = new ArrayList<Order>();
				} else {
					model.addAttribute("noResults", "");

					if ("PR".equals(orderList.get(0).getType())) {
						return requestPReqDetail(request, response);
					} else {

					}
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

	/********************* SOURCE OF SUPPLY SEARCH **********************/
	/*
	 * @RequestMapping(value = "/autocomplete.htm", method = RequestMethod.GET)
	 * public ModelAndView autocomplete(HttpServletRequest request,
	 * HttpServletResponse response) throws Exception { ModelMap model = new
	 * ModelMap(); ModelAndView modelAndView = new
	 * ModelAndView("vendorDetails"); //////System.out.println("autocomplete");
	 * String vendordesc = (String) request.getParameter("vendordesc"); String
	 * maxRows = "0"; String vendorNo = (String)
	 * request.getParameter("vendorNo"); String srcOfSupp = (String)
	 * request.getParameter("srcOfSupp"); ArrayList<Vendor> supplierList;
	 * ArrayList<WareHouse> supplierList1;
	 * 
	 * try { if ("1".equalsIgnoreCase(srcOfSupp)) {
	 * 
	 * supplierList = orderService.getVendorList(vendordesc, maxRows, vendorNo);
	 * if (supplierList != null && supplierList.size() > 0) {
	 * 
	 * modelAndView = new ModelAndView("vendorDetails");
	 * model.addAttribute("noSearchResults", "");
	 * model.addAttribute("vendorList", supplierList);
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); } else { modelAndView = new
	 * ModelAndView("vendorDetails"); model.addAttribute("vendorList", new
	 * ArrayList<Vendor>()); model.addAttribute("noSearchResults",
	 * "No Data Found"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); } return modelAndView; }
	 * 
	 * else if ("2".equalsIgnoreCase(srcOfSupp)) {
	 * 
	 * supplierList1 = orderService.getWareHouseList(vendordesc, maxRows,
	 * vendorNo); if (supplierList1 != null && supplierList1.size() > 0) {
	 * 
	 * modelAndView = new ModelAndView("wareHouse");
	 * model.addAttribute("vendorList", supplierList1);
	 * model.addAttribute("noSearchResults", "");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); } else { modelAndView = new
	 * ModelAndView("wareHouse"); model.addAttribute("vendorList", new
	 * ArrayList<WareHouse>()); model.addAttribute("noSearchResults",
	 * "No Data Found"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); }
	 * 
	 * return modelAndView;
	 * 
	 * }
	 * 
	 * } catch (Exception e) { e.printStackTrace();
	 * 
	 * if ("1".equalsIgnoreCase(srcOfSupp)) { supplierList = new
	 * ArrayList<Vendor>(); modelAndView = new ModelAndView("vendorDetails");
	 * model.addAttribute("noSearchResults", "No Data Found");
	 * model.addAttribute("vendorList", supplierList);
	 * 
	 * } else { supplierList1 = new ArrayList<WareHouse>(); modelAndView = new
	 * ModelAndView("wareHouse"); model.addAttribute("noSearchResults",
	 * "No Data Found"); model.addAttribute("vendorList", supplierList1);
	 * 
	 * } modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; } return
	 * modelAndView;
	 * 
	 * }
	 */

	/********************* ORDER DETAILS **********************/

	// method called onclicking on the search results of preq enquiry.
	@RequestMapping(value = "/requestPReqDetail.htm", method = RequestMethod.POST)
	public ModelAndView requestPReqDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}

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
		String currentDate = "";
		String rosterDate = "";
		try {
			DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
			Date date = new Date();
			// //////System.out.println(dateFormat.format(date));
			currentDate = PortalUtil.convertToSAPDateForOrder(dateFormat
					.format(date));
			// ////System.out.println("currentDate="+currentDate);
			if (order != null && order.getRosterDate() != null) {
				rosterDate = PortalUtil.convertToSAPDateForOrder(order
						.getRosterDate());
				// ////System.out.println("rosterDate="+rosterDate);
			}
			if (currentDate.equalsIgnoreCase(rosterDate)) {
				order.setRosterDateFlag("Y");
			}

		} catch (Exception e) {
			e.printStackTrace();
			order.setRosterDateFlag("N");
		}

		orderDetail = new ArrayList<OrderDetail>();

		OrderParam param1 = new OrderParam();

		param1.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());
		order.setRecvSite(param1.getSiteNo());
		param1.setSearchByOptions("PReq");
		order.setRecvSiteName(((UserContext) request.getSession().getAttribute(
				"user")).getSiteName());
		param1.setOrderNo(order.getpReqNo());
		param1.setType("PR");
		try {
			orderDetail = orderService.getOrderDetails(param1,
					order.getpReqNo(),userDetail);

		} catch (Exception e) {
			// ////System.out.println("Exception" + e +
			// "in order details method");

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
		model.addAttribute("order", order);

		;
		if (orderDetail != null && orderDetail.size() > 0) {
			for (OrderDetail detail : orderDetail) {

				detail.setDateCreated(detail.getDateCreated() != null
						&& detail.getDateCreated().trim().length() > 0 ? PortalUtil
						.convertToSAPDateForPReqScreen(detail.getDateCreated())
						: "");
				detail.setDeliveryDate(detail.getDeliveryDate() != null
						&& detail.getDeliveryDate().trim().length() > 0 ? PortalUtil
						.convertToSAPDateForPReqScreen(detail.getDeliveryDate())
						: "");

			}
		}
		model.addAttribute("orderDetails", orderDetail);
		model.addAttribute("updateStatus", "true");

		ModelAndView modelAndView = new ModelAndView("pReqDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called onclicking on the search results of order enquiry.
	@RequestMapping(value = "/requestOrderDetail.htm", method = RequestMethod.POST)
	public ModelAndView requestOrderDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// ////System.out.println("requestOrderDetail");
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
			model.addAttribute("hideAll", "");
			if (request.getParameter("index") != null
					&& request.getParameter("index").trim().length() > 0) {
				param.setIndex(request.getParameter("index"));
				if (orderList != null && orderList.size() > 0) {
					order = (Order) orderList.get(Integer.parseInt(request
							.getParameter("index")));
					ArrayList<Order> tempList = null;
					String siteNo = ((UserContext) request.getSession()
							.getAttribute("user")).getSiteNo();
					if (request.getParameter("fromReceive") != null
							&& request.getParameter("fromReceive").trim()
									.length() > 0
							&& request.getParameter("fromReceive")
									.equalsIgnoreCase("true")) {
						if (order != null) {
							tempList = callOrderService(order.getOrderNo(),
									siteNo);
							if (tempList != null) {
								order = tempList.get(0);
								orderList.remove(Integer.parseInt(request
										.getParameter("index")));
								orderList.add(Integer.parseInt(request
										.getParameter("index")), order);
							}

						}
					}
				}

			} else {
				if (orderList != null && orderList.size() > 0) {
					order = (Order) orderList.get(0);
					ArrayList<Order> tempList = null;
					String siteNo = ((UserContext) request.getSession()
							.getAttribute("user")).getSiteNo();
					if (request.getParameter("fromReceive") != null
							&& request.getParameter("fromReceive").trim()
									.length() > 0
							&& request.getParameter("fromReceive")
									.equalsIgnoreCase("true")) {
						if (order != null) {
							tempList = callOrderService(order.getOrderNo(),
									siteNo);
							if (tempList != null) {
								order = tempList.get(0);
								orderList.remove(0);
								orderList.add(0, order);
							}

						}
					}
				}
			}
		} else if (reconFlag != null && reconFlag != ""
				&& reconFlag.equalsIgnoreCase("true")) {
			// String orderNo=request.getParameter("orderNo");
			param = new OrderParam();
			model = new ModelMap();
			model.addAttribute("openOrder", "");
			model.addAttribute("hideAll", "");
			param.setReconFlag("true");
			if (reconciliationReport != null && reconciliationReport.size() > 0
					&& reconciliationReport.get(0).getPurchaseOrder() != "") {
				String orderNo = "";
				if (request.getParameter("index") != null
						&& request.getParameter("index").trim().length() > 0) {
					param.setIndex(request.getParameter("index"));
					orderNo = reconciliationReport.get(
							Integer.parseInt(request.getParameter("index")))
							.getPurchaseOrder();
				}
				// ////System.out.println("orderNO"+orderNo);
				param.setOrderNo(orderNo);
				param.setSearchByOptions("number");
				param.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
				try {
					orderList = orderService.getOrders(param,userDetail);
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
			// ////System.out.println("order.getOrderStatus()="+order.getOrderStatus());
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

		// String tempOrderType=param.getOrderType();

		// param.setOrderType(orderType);
		orderDetail = new ArrayList<OrderDetail>();
		bkUpOrderDetail = new ArrayList<OrderDetail>();
		try {
			orderDetail = orderService.getOrderDetails(param, orderNo,userContext);

			// param.setOrderType(tempOrderType);

		} catch (Exception e) {
			// ////System.out.println("Exception" + e +
			// "in order details method");

		}

		if (orderDetail != null && orderDetail.size() != 0) {
			orderDet = orderDetail.get(0);
			model.addAttribute("orderdet", orderDet);
			model.addAttribute("size", orderDetail.size());
			/*
			 * //for finding temperature range---start
			 * 
			 * //double lowerBoundArray[]=
			 * //////System.out.println("request order detail--order controller"
			 * ); double finalLowerBound=0; double finalUpperBound=0; double
			 * tempLowerBound=0; double tempUpperBound=0; boolean
			 * isTempAvailable=false;
			 * 
			 * String Str2; String Str = new String("(-3 to 6)");
			 * 
			 * int offset=Str.indexOf( '(' ); int count=Str.indexOf( ')' ); Str2
			 * =Str.substring(offset+1,count); String[] range1=
			 * Str2.split("to",2 );
			 * 
			 * 
			 * ////System.out.println("offset"+offset);
			 * ////System.out.println("count"+count);
			 * ////System.out.println("Str2 "+Str2);
			 * ////System.out.println("range1-0"+range1[0]);
			 * ////System.out.println("range1-1"+range1[1]);
			 * 
			 * 
			 * for(int i=0;i<orderDetail.size();i++){ String Str = new
			 * String(orderDetail.get(i).getTemperature().trim());
			 * ////System.out.println
			 * ("i**"+i+" "+orderDetail.get(i).getTemperature());
			 * ////System.out.println
			 * ("i**"+i+" "+orderDetail.get(i).getArticle()); if(Str!=null &&
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
			 * ////System.out.println("finalLowerBound"+i+"  "+finalLowerBound);
			 * 
			 * finalLowerBound=tempLowerBound;
			 * 
			 * } if(finalUpperBound<tempUpperBound){
			 * 
			 * finalUpperBound=tempUpperBound;
			 * ////System.out.println("finalUpperBound"+i+"  "+finalUpperBound);
			 * }
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
			 * model.addAttribute("tempFromServiceIbtCreate", temperature);
			 * model.addAttribute("deptFromServiceIbtCreate", ""); }else{
			 * model.addAttribute("tempFromServiceIbtCreate", "");
			 * model.addAttribute("deptFromServiceIbtCreate", ""); }
			 */
			String temperature = "";
			String department = "";

			temperature = serviceImpl.getTemperatureForTempCheck(orderDetail);
			department = serviceImpl.getDepartmentForTempCheck(orderDetail,
					((UserContext) request.getSession().getAttribute("user"))
							.getSalesOrg().toString());
			model.addAttribute("tempFromServiceIbtCreate", temperature);
			model.addAttribute("deptFromServiceIbtCreate", department);
			// ////System.out.println("calculated temperature"+temperature);
			// ////System.out.println("calculated rank"+department);

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
			// String invoiceNo=orderDet.getInvoiceNo();
			// service update for ven_invoice
			String invoiceNo = orderDet.getVenInvoice();
			String invoiceTotal = orderDet.getInvoiceTotal();
			String gst = orderDet.getGstAmount();
			String delDock = orderDet.getDockCode();
			String temperature = order.getGrTemp1();
			orderAdjust = new ArrayList<OrderDetail>();
			ModelAndView modelAndView;
			receiveParam = new ReceiveParam();
			// new
			if (param != null && param.getReconFlag() != null
					&& param.getReconFlag().equalsIgnoreCase("true")) {
				receiveParam.setReconFlag("true");
				// ////System.out.println(receiveParam.getReconFlag());
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
			receiveParam.setTemperature(temperature);
			receiveParam.setIndex(param.getIndex());
			model.addAttribute("receiveParam", receiveParam);
			model.addAttribute("msg", "");
			if (order.getOrderType().equalsIgnoreCase("ZUB")) {
				modelAndView = new ModelAndView("orderDetails");
				model.addAttribute("hideAll", "Y");
			} else {
				modelAndView = new ModelAndView("receiveOrder");
			}

			if (order != null && "ZUB".equalsIgnoreCase(order.getOrderType())) {
				ArrayList<Store> storeList = serviceImpl.getStoreDetails("", "",
						order.getRecvSite(),userContext);
				order.setRecvSiteName((storeList.get(0).getSiteDescription()));

			} else {
				order.setRecvSiteName(((UserContext) request.getSession()
						.getAttribute("user")).getSiteName());
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
		model.addAttribute("orderDetails", orderDetail);
		if (order != null && order.getOrderType() != null
				&& order.getOrderType().equalsIgnoreCase("ZUB")
				&& order.getOrderStatus() != null
				&& order.getOrderStatus().equalsIgnoreCase(Open)) {
			orderDetailBackup = new ArrayList<OrderDetail>();
			if (orderDetail != null) {

				for (OrderDetail copyOrderDetail : orderDetail) {
					orderDetailBackup
							.add((OrderDetail) copyOrderDetail.clone());
				}// orderDetailBackup.addAll(orderDetail);
			}
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				for (int i = 0; i < orderDetailBackup.size(); i++) {
					orderDetailBackup.get(i).setSaveFlag("Y");
					orderDetailBackup.get(i).setEditFlag("Y");
					if (orderDetailBackup
							.get(i)
							.getOrderUOM()
							.equalsIgnoreCase(
									orderDetailBackup.get(i).getBaseUom())) {
						orderDetailBackup.get(i).setUOMFlag(
								orderDetailBackup.get(i).getBaseUOMDesc());
						orderDetailBackup.get(i).setSaveUOMFlag("2");

					} else {
						orderDetailBackup.get(i).setUOMFlag(
								orderDetailBackup.get(i).getOrdUOMDesc());
						orderDetailBackup.get(i).setSaveUOMFlag("1");
					}
					// orderDetailBackup.get(i).setOrdUOM(orderDetailBackup.get(i).getOrderUOM());
					// orderDetailBackup.get(i).setBaseUom(orderDetailBackup.get(i).getOrderUOM());
					// orderDetailBackup.get(i).setReceivedQty(orderDetailBackup.get(i).getOrderQty());
				}
			}
			model.addAttribute("orderDetails", orderDetailBackup);
			model.addAttribute("invalidQty", "");
		}

		model.addAttribute("order", order);

		ModelAndView modelAndView = new ModelAndView("orderDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when brudcrum "back to order detail" is clicked.
	@RequestMapping(value = "/backToOrderDetails.htm", method = RequestMethod.GET)
	public ModelAndView backToOrderDetails(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// ////System.out.println("requestOrderDetail");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		model.addAttribute("hideAll", "");
		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("param", param);
		model.addAttribute("updateRights", "");

		/*
		 * order = null; if (request.getParameter("index") != null &&
		 * request.getParameter("index").trim().length()>0) { order = (Order)
		 * orderList.get(Integer.parseInt(request .getParameter("index"))); }
		 * else { order = (Order) orderList.get(0); }
		 */
		// ////System.out.println("receiveStatus"+receiveStatus);

		if (cancelStatus == true) {
			model.addAttribute("cancelStatus", cancelStatus);
		}

		if (receiveStatus == true) {
			model.addAttribute("receiveStatus", receiveStatus);
			model.remove("orderDetails");
			model.addAttribute("orderDetails", orderDetailBackup);

		} else {
			model.remove("orderDetails");
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
	// method called when brudcrum "back to order lookup" is clicked.
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
		model.addAttribute("msg", "");
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

	// method called to for adding article in receive order screen and also used
	// for confirm and finalise the order.
	@RequestMapping(value = "/addArticle.htm", method = RequestMethod.GET)
	public ModelAndView addArticle(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}

		model.addAttribute("focusIndex", "");
		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		// System.out.println("request.getParameter(\"flag\")"
		// +request.getParameter("flag"));
		List<ArticleSearchResults> articleSearchResults = null;
		if (request.getParameter("flag").equalsIgnoreCase("Finalize")) {
			model.addAttribute("invalidQty", "");
			// new receiveParam.setSiteNo(param.getSiteNo());
			receiveParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());
			receiveParam.setOrderNo(order.getOrderNo());
			receiveParam.setVendorNo(order.getSuppNo());
			receiveParam.setOrder_received(order.getOrder_received());
			receiveParam.setDeliveryDate(orderDet.getDeliveryDate());

			boolean statusArticlePost = false;
			// ////System.out.println("inv no"+receiveParam.getInvoiceNo());
			// ////System.out.println("dock "+receiveParam.getDelDock());
			ArrayList<OrderDetail> newlyAddedArticleList = new ArrayList<OrderDetail>();

			for (int i = 0; i < orderDetailBackup.size(); i++) {
				// ////System.out.println("i="+i+";operation="+orderDetailBackup.get(i).getOperation());
				// ////System.out.println("i="+i+";orderuom="+orderDetailBackup.get(i).getOrderUOM());
				if (orderDetailBackup.get(i).getOperation()
						.equalsIgnoreCase("5")) {
					orderDetailBackup.get(i).setOperation("I");
					newlyAddedArticleList.add(orderDetailBackup.get(i));
				}
			}
			if (newlyAddedArticleList.size() != 0) {
				try {

					statusArticlePost = orderService.receiveOrderAddArticleNew(
							newlyAddedArticleList, receiveParam,userDetail);
					// ////System.out.println("statusArticlePost "+statusArticlePost);
				} catch (Exception e) {
					// ////System.out.println("article addition failed --- statusArticlePost"+statusArticlePost);
					e.printStackTrace();
				}
			}
			String successStatus = "false";
			try {
				if (receiveParam.getInvoiceNo() != null
						&& receiveParam.getInvoiceNo().trim().length() > 0) {
					// ////System.out.println("call add inv");
					String status = orderService.receiveOrderAddInv(
							orderDetailBackup, receiveParam,userDetail);
					// ////System.out.println("status in add inv cntrlr:"+status);

					if (status == null) {
						successStatus = "Order is received successfully.";
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

					// ////System.out.println("test call add dock");
					String status = orderService.receiveOrderAddDock(
							orderDetailBackup, receiveParam,userDetail);
					// ////System.out.println("status in add dock cntrlr:"+status);

					if (status == null) {
						successStatus = "Order is received successfully.";
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
			// adding temperature in SAP
			String temperatureUpdateStatus = "";
			try {
				// ////System.out.println("adding temperature in SAP");
				TemperatureSetParam temperatureParam = new TemperatureSetParam();
				temperatureParam.setPurOrdNo(receiveParam.getOrderNo());
				// temperatureParam.setGrTemp1(request.getParameter("tempFromUserStdPoReceive"));
				temperatureParam.setGrTemp1(receiveParam.getTemperature());
				// ////System.out.println("ord no"+temperatureParam.getPurOrdNo());
				// ////System.out.println("temp gr 1"+temperatureParam.getGrTemp1());
				if (temperatureParam.getGrTemp1() != null
						&& temperatureParam.getGrTemp1().trim() != "")
					temperatureUpdateStatus = orderService
							.updateTemperature(temperatureParam,userDetail);

				// ////System.out.println("temperatureUpdateStatus"+temperatureUpdateStatus);

			} catch (Exception e) {
				e.printStackTrace();
			}

			// new line

			/*
			 * if(status && statusArticlePost){ successStatus="true";
			 * receiveStatus=true; order.setOrderStatus("Received"); }
			 */

		} else if (request.getParameter("flag").equalsIgnoreCase("cancelOrder")) {

			// ////System.out.println("inside cancel cal blk in controller");
			receiveParam.setOrderNo(order.getOrderNo());
			// model = new ModelMap();

			// ModelAndView modelAndViewforCancel = new
			// ModelAndView("receiveOrder");

			CancelOrderParam cancelOrderParam = new CancelOrderParam();

			cancelOrderParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());
			cancelOrderParam.setPurOrdNo(order.getOrderNo());
			// ////System.out.println("order no from object"+order.getOrderNo());
			String createStatus = "";
			try {
				createStatus = orderService.cancelOrder(cancelOrderParam,userDetail);
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
			// ////System.out.println("site"+receiveParam.getSiteNo());
			receiveParam.setOrderNo(order.getOrderNo());
			// ////System.out.println("order"+receiveParam.getOrderNo());
			receiveParam.setVendorNo(order.getSuppNo());
			// ////System.out.println("vendor no"+receiveParam.getVendorNo());
			receiveParam.setOrder_received(order.getOrder_received());
			// ////System.out.println("ord rec"+receiveParam.getOrder_received());

			model.addAttribute("cancelStatus", cancelStatus);
			model.addAttribute("receiveParam", receiveParam);
			model.addAttribute("msg", postStatus);
			model.addAttribute("invalidQty", "");

		} else {
			// receiveParam.setRadioBtn(request.getParameter("radioBtn"));
			model.addAttribute("focusIndex", "");
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
						model.addAttribute("focusIndex", i + 1);
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
			try {

				articleSearchResults = orderService.searchArticle(receiveParam,userDetail);
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
							model.addAttribute("focusIndex", i + 1);
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
					&& articleSearchResults.size() != 0) {

				// deleted flag check
				if (articleSearchResults.get(0).getDeleteInd()
						.equalsIgnoreCase("Y")) {
					model.addAttribute(
							"msg",
							""
									+ articleSearchResults.get(0)
											.getDescription()
									+ " ("
									+ articleSearchResults.get(0)
											.getArticleNo()
									+ ") is deleted from your Store and cannot be ordered");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}
				// linked to vendor check
				if (articleSearchResults.get(0).getVendorNo() == null
						|| articleSearchResults.get(0).getVendorNo().trim()
								.length() <= 0) {
					model.addAttribute("msg",
							"Article '" + receiveParam.getArticleNo()
									+ "' is not linked to vendor '"
									+ receiveParam.getSuppName() + "'.");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}
			}
			if (articleSearchResults != null
					&& articleSearchResults.size() != 0) {

				orde.setOperation("5");
				orde.setBaseUom(articleSearchResults.get(0).getBaseUom());
				orde.setOrderQty(articleSearchResults.get(0).getInputQty());
				OrderParam orderParamForReceive = new OrderParam();
				// //System.out.println("articleSearchResults.get(0).getArticleNo()"+articleSearchResults.get(0).getArticleNo());
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
				Date date = new Date();
				// //System.out.println(dateFormat.format(date));
				String currentDate = dateFormat.format(date);
				orderParamForReceive.setArticleNo(articleSearchResults.get(0)
						.getArticleNo());
				orderParamForReceive.setFromDate(currentDate);
				orderParamForReceive.setToDate(currentDate);
				// orderParamForReceive.setOrderType("ZNB");
				orderParamForReceive.setOrderStatus(Authorized);
				orderParamForReceive.setOrderType("");
				orderParamForReceive.setPageNo(1);
				orderParamForReceive.setSiteNo(((UserContext) request
						.getSession().getAttribute("user")).getSiteNo());
				orderListForReceive = new ArrayList<Order>();
				// ////System.out.println("orderNO"+orderNo);
				// OrderParam vendorParam=new OrderParam();
				// vendorParam.setOrderNo(orderNo);
				// //vendorParam.setSearchByOptions("number");
				// vendorParam.setSiteNo(siteNo);
				// vendorParam.setSearchByOptions("number");
				try {
					orderListForReceive = orderService
							.getOrders(orderParamForReceive,userDetail);
					if (orderListForReceive != null
							&& orderListForReceive.size() > 0) {
						for (int i = 0; i < orderListForReceive.size(); i++) {
							if (orderListForReceive.get(i).getOrderNo()
									.equalsIgnoreCase(order.getOrderNo())) {
								orderListForReceive.remove(i);
								break;
							}
						}
						if (orderListForReceive != null
								&& orderListForReceive.size() > 0) {
							articleSearchResultsForReceive = new ArrayList<ArticleSearchResults>();
							articleSearchResultsForReceive
									.addAll(articleSearchResults);
							model.addAttribute("msg", "");

							model.addAttribute("popupFlag", "true");
							model.addAttribute("orderListForReceive",
									orderListForReceive);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					}
				} catch (Exception e) {
					e.printStackTrace();
					model.addAttribute("msg", "");
					model.addAttribute("popupFlag", "");
					model.addAttribute("orderListForReceive",
							new ArrayList<Order>());

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
						if (receiveParam.getRecqty() != null
								&& receiveParam.getRecqty() != "") {
							if (Double.parseDouble(receiveParam.getRecqty()) % 1 == 0) {
								results.setInputQty(receiveParam.getRecqty());
							} else {
								Integer qty = (int) Double
										.parseDouble(receiveParam.getRecqty());
								results.setInputQty(qty.toString());
								model.addAttribute("invalidQty", "true");
							}
						} else {
							results.setInputQty("0");
							model.addAttribute("invalidQty", "");
						}
					} else if (receiveParam.getRecqty() != null
							&& receiveParam.getRecqty() != "") {
						results.setInputQty(receiveParam.getRecqty());
						model.addAttribute("invalidQty", "");
					}
				} else {
					model.addAttribute("invalidQty", "");
				}
				orde.setOrderNo(order.getOrderNo());
				orde.setBaseUom(articleSearchResults.get(0).getBaseUom());
				orde.setArticle(results.getArticleNo());
				orde.setReceivedQty(results.getInputQty());
				orde.setArticleDesc(results.getDescription());
				orde.setOrderQty(results.getInputQty());
				orde.setDespatchQty("0");

				if (results.getOM() != null
						&& Double.parseDouble(results.getOM()) % 1 == 0) {
					Integer qty3 = (int) Double.parseDouble(results.getOM());
					orde.setOM(qty3.toString());
				} else {
					orde.setOM(results.getOM());
				}

				orde.setOrderUOM(results.getOrdUOM());
				orde.setSaveFlag("N");
				/*
				 * if(orderDetail!=null && orderDetail.size()>0) {
				 * orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo()); }
				 */
				Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
				// //System.out.println("itemNo=" + itemNo);
				orde.setItemNo(itemNo.toString());
				orde.setOperation("5");
				orderDetailBackup.add(orde);
				receiveParam.setArtEAN("");
				receiveParam.setRecqty("");
				model.addAttribute("msg", "");
			} else
				model.addAttribute("msg",
						"Article '" + receiveParam.getArticleNo()
								+ "' not found or not linked to vendor '"
								+ receiveParam.getSuppName() + "'.");
			// model.addAttribute("msg",
			// "Article '"+receiveParam.getArticleNo()+"' not found. Please try a different article number.");
			// orderDetailBackup
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// ####################################################################

	/********************* ON PAGE LOAD CREATE MANUAL ORDER **********************/
	// not used
	@RequestMapping(value = "/onPageLoadCreateManualOrder.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadCreateManualOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		/*if (user.getUserAccessMap().containsKey(screenCode1)){
			if(user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		
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
		ModelAndView modelAndView = new ModelAndView("createOrder");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/claimsOnPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView claimsOnPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String param = new String();
		String from = new String();
		String articleNo = new String();
		if (null != request.getParameter("from") && null != request.getParameter("articleNo")) {
			from = request.getParameter("from");
			articleNo = request.getParameter("articleNo");
		}
		if (null != request.getParameter("param")) {
			param = request.getParameter("param");
			
			if (param.equalsIgnoreCase("createNewClaim")) {
				screenCode1="AC_RTNC";
				if(user.getUserAccessMap().containsKey(screenCode1)){
					if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
				/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

				ModelAndView modelAndView = new ModelAndView(
						"claimsReturnsEnquiry");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				modelAndView.addObject("newClaim", "true");
				if (from.equalsIgnoreCase("stockAdj"))
				{
				modelAndView.addObject("from", "true");
				modelAndView.addObject("articleNo", articleNo);
				}
				else
				{
				modelAndView.addObject("from", "false");
				}
				return modelAndView;
			}
		}
		else {
			/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
			if(user.getUserAccessMap().containsKey(screenCode)){
				if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
					return new ModelAndView("noAccess");
				}
				
			}
			/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		}

		ModelAndView modelAndView = new ModelAndView("claimsReturnsEnquiry");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		modelAndView.addObject("from", "false");
		modelAndView.addObject("newClaim", "false");
		return modelAndView;

	}

	// not used
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
		try {
			whInfoList = (ArrayList<SupplierModel>) orderService
					.getSupplierLists(manualOrderParam.getSiteNo(),userDetail);

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

		ModelAndView modelAndView = new ModelAndView("createOrder");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/********************* MANUAL ORDER SEARCH **********************/
	// not used
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
									"createOrder", "manualOrderParam",
									manualOrderParam);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					}
				}
				// SERVICE CALL
				articleSearchResultsFetched = orderService
						.getManualOrders(manualOrderParam,userDetail);

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
			ModelAndView modelAndView = new ModelAndView("createOrder",
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
				ModelAndView modelAndView = new ModelAndView("createOrder",
						"param", param);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} else {

			// //System.out.println("inside finalise");
			// FINALISE ORDER
			boolean unfilledData = false;
			ModelAndView modelAndView = new ModelAndView("createOrder");
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
					// System.out
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
	// not used
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

		ModelAndView modelAndView = new ModelAndView("createOrder");
		model.addAttribute("errorMsg", "");
		model.addAttribute("articleSearchResults",
				articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/************************** MANUAL ORDER details PAGE ****************/
	// not used
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
	// not used
	@RequestMapping(value = "/confirmOrder.htm", method = RequestMethod.POST)
	public ModelAndView confirmOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		ModelAndView modelAndView = new ModelAndView("createOrder");
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
				 * //System
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

				orderParam.setOrderType("ZNB");
				orderParam.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
				orderParam.setArticleNo(request.getParameter("articleNumber"));
				orderList = orderService.getOrderDetails(orderParam, "",userDetail);

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
	// not used
	@RequestMapping(value = "/finaliseOrder.htm", method = RequestMethod.POST)
	public ModelAndView finaliseOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("createOrder");
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
	// not used
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
		model.addAttribute("hideAll", "");
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
		try {
			createStatus = orderService.cancelOrder(cancelOrderParam,userDetail);
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

	// method called when update delivery date is clicked.
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
		String createStatus = null;
		try {
			createStatus = orderService.updateDeliveryDate(orderNo,
					converteddelDate,userDetail);
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

	// method called when search and add article button clicked in create
	// warehouse order screen.
	@RequestMapping(value = "/createManualOrder.htm", method = RequestMethod.POST)
	public ModelAndView createManualOrder(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		ModelAndView modelAndView = new ModelAndView("createOrder");
		ArrayList<ArticleSearchResults> articleSearchResultsFetched = new ArrayList<ArticleSearchResults>();
		ArrayList<Vendor> supplierList = null;
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
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
		model.addAttribute("msg", "");

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
		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {

			model.addAttribute("listSize", articleSearchResultsforCreate.size());
		}
		String srcOfSupp = manualOrderParam.getSrcOfSupply();
		String vendordesc = manualOrderParam.getSuppName();
		String maxRows = "";
		if ("1".equalsIgnoreCase(srcOfSupp)
				|| "vendor".equalsIgnoreCase(srcOfSupp)) {
			// //System.out.println("vendordesc"+vendordesc);
			try {
				if (vendordesc != null && vendordesc.trim().length() > 0) {
					// param.setSuppName(articleSearchResultsFetched.get(0).getVendor()+"-"+articleSearchResultsFetched.get(0).getVendorName());
					// if(articleSearchResultsforCreate!=null &&
					// articleSearchResultsforCreate.size()<=1)
					// {
					supplierList = articleService.getVendorList(vendordesc,
							maxRows, vendordesc, siteNo,userDetail);
					if (supplierList != null && supplierList.size() > 0)
						model.addAttribute("msg", "");
					else {
						model.addAttribute("msg", "Not a valid vendor number");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}
					// }
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
		/*
		 * if (articleSearchResultsforCreate != null &&
		 * articleSearchResultsforCreate.size() != 0) {
		 * 
		 * model.addAttribute("listSize", articleSearchResultsforCreate.size());
		 * }
		 */

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {
			for (int i = 0; i < articleSearchResultsforCreate.size(); i++) {
				if (articleSearchResultsforCreate.get(i).getEan11()
						.equals(manualOrderParam.getArticleNo())
						|| articleSearchResultsforCreate.get(i).getArticleNo()
								.equals(manualOrderParam.getArticleNo())) {
					model.addAttribute("msg",
							"Article already exists in the list");
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
					.getManualOrders(manualOrderParam,userDetail);

			if (articleSearchResultsFetched != null
					&& articleSearchResultsFetched.size() == 1) {
				model.addAttribute("size", "1");
				// //System.out.println(" inside 1");

				// deleted flag check
				if (articleSearchResultsFetched.get(0).getDeleteInd()
						.equalsIgnoreCase("Y")) {

					model.addAttribute(
							"msg",
							""
									+ articleSearchResultsFetched.get(0)
											.getDescription()
									+ " ("
									+ manualOrderParam.getArticleNo()
									+ ") is deleted from your Store and cannot be ordered");
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
									"Article already exists in the list");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}

					}
				}

				if (articleSearchResultsFetched.get(0).getRangedFlag()
						.equalsIgnoreCase("Y")) {

					// new
					// if((vendordesc==null || vendordesc.trim().length()<=0) &&
					// manualOrderParam.getWarehouseDropdown().equalsIgnoreCase("0")){
					if (manualOrderParam.getWarehouseDropdown()
							.equalsIgnoreCase("0")) {

						if (articleSearchResultsFetched.get(0).getVendorNo() != null
								&& articleSearchResultsFetched.get(0)
										.getVendorNo().trim().length() > 0
								&& articleSearchResultsFetched.get(0)
										.getSrcOfSupply().equalsIgnoreCase("2")) {
							{
								manualOrderParam
										.setSuppName(articleSearchResultsFetched
												.get(0).getVendorNo());
								manualOrderParam
										.setSupplierDesc(articleSearchResultsFetched
												.get(0).getVendorNo());
							}
							if (articleSearchResultsFetched.get(0)
									.getVendorName() != null
									&& articleSearchResultsFetched.get(0)
											.getVendorName().trim().length() > 0) {
								manualOrderParam.setSuppName(manualOrderParam
										.getSuppName()
										+ "-"
										+ articleSearchResultsFetched.get(0)
												.getVendorName());
								manualOrderParam
										.setSupplierDesc(manualOrderParam
												.getSupplierDesc()
												+ "-"
												+ articleSearchResultsFetched
														.get(0).getVendorName());
							}
							manualOrderParam
									.setWarehouseDropdown(articleSearchResultsFetched
											.get(0).getVendorNo());
							if (articleSearchResultsFetched.get(0)
									.getSrcOfSupply().equalsIgnoreCase("1")) {
								try {
									vendordesc = articleSearchResultsFetched
											.get(0).getVendorNo();
									supplierList = articleService
											.getVendorList(vendordesc, maxRows,
													vendordesc, siteNo,userDetail);
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
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
											+ "' is not linked to any warehouse. Please try a different article.");
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
					if (articleSearchResultsFetched.get(0).getVendorNo() != null
							&& articleSearchResultsFetched.get(0).getVendorNo()
									.trim().length() > 0
							&& articleSearchResultsFetched.get(0)
									.getSrcOfSupply().equalsIgnoreCase("2")) {

					} else {
						model.addAttribute("msg", "Article '"
								+ manualOrderParam.getArticleNo()
								+ "' is not linked to the warehouse '"
								+ manualOrderParam.getWarehouseDropdown()
								+ "'.");
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
					int leadTime = 1;

					if (supplierList != null
							&& supplierList.size() > 0
							&& supplierList.get(0).getLeadTime() != null
							&& supplierList.get(0).getLeadTime() != ""
							&& !supplierList.get(0).getLeadTime()
									.equalsIgnoreCase("0")) {

						try {
							leadTime = Integer.parseInt(supplierList.get(0)
									.getLeadTime());
						} catch (Exception e) {
							e.printStackTrace();
						}
						cal.add(Calendar.DATE, leadTime);
					} else {
						cal.add(Calendar.DATE, leadTime);
					}

					// //System.out.println("leadTime"+leadTime);
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
					model.addAttribute("listSize",
							articleSearchResultsforCreate.size());
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
				if (manualOrderParam.getSuppName().trim().length() <= 0
						&& manualOrderParam.getWarehouseDropdown()
								.equalsIgnoreCase("0")) {
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
			if (manualOrderParam.getSuppName().trim().length() <= 0
					&& manualOrderParam.getWarehouseDropdown()
							.equalsIgnoreCase("0")) {
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

	// method called when select button of an article description search result
	// is clicked, on create warehouse screen.
	@RequestMapping(value = "/addArticleDescription.htm", method = RequestMethod.GET)
	public ModelAndView addArticleDescription(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("addArticleDescription");
		String index = request.getParameter("desIndex");
		ModelAndView modelAndView = new ModelAndView("createOrder");
		// manualOrderParam.setArticleNo(request.getParameter("articleNo"));
		manualOrderParam.setOrderQty(request.getParameter("ordqty"));
		manualOrderParam.setSrcOfSupply(request.getParameter("sourceSupply"));
		manualOrderParam.setSuppName(request.getParameter("suppName"));
		model.addAttribute("buttonRetain", request.getParameter("sourceSupply"));
		model.addAttribute("listSize", "");
		manualOrderParam.setWarehouseDropdown(request
				.getParameter("warehouseValue"));
		String vendordesc = null;
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		// //System.out.println("index"+index);
		ArticleSearchResults article = null;
		ArrayList<Vendor> supplierList = null;
		String[] indexArray = index.split(":");
		StringBuffer notRanged = new StringBuffer();
		StringBuffer deleted = new StringBuffer();
		boolean flag = true;
		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() != 0) {

			model.addAttribute("listSize", articleSearchResultsforCreate.size());
		}
		for (int k = 0; k < indexArray.length; k++) {
			flag = true;
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));
				// article.setVendorNo("1917");
				manualOrderParam.setArticleNo(article.getArticleNo());
				// deleted flag check
				if (article.getDeleteInd().equalsIgnoreCase("Y")) {
					flag = false;
					deleted.append(" " + article.getDescription() + " ("
							+ article.getArticleNo() + ")" + ",");
					/*
					 * model.addAttribute("msg", "" + article.getDescription() +
					 * " (" + article.getArticleNo() +
					 * ") is deleted from your Store and cannot be ordered");
					 * 
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
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
									"Article already exists in the list");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}

					}
				}
				if ("1".equalsIgnoreCase(request.getParameter("sourceSupply"))
						|| "vendor".equalsIgnoreCase(request
								.getParameter("sourceSupply"))) {

					try {
						if (manualOrderParam.getSuppName() != null
								&& manualOrderParam.getSuppName().trim()
										.length() > 0
								&& manualOrderParam.getSuppName().split("-")[0]
										.trim().length() > 0) {

							supplierList = articleService
									.getVendorList(manualOrderParam
											.getSuppName().split("-")[0], "",
											manualOrderParam.getSuppName()
													.split("-")[0], siteNo,userDetail);

						}
					} catch (Exception e) {
						e.printStackTrace();
						supplierList = new ArrayList<Vendor>();
					}

				}
				try {
					// if((manualOrderParam.getSuppName()==null ||
					// manualOrderParam.getSuppName().trim().length()<=0 &&
					// manualOrderParam.getWarehouseDropdown().equalsIgnoreCase("0")
					// )){
					if (manualOrderParam.getWarehouseDropdown()
							.equalsIgnoreCase("0")) {
						if (article.getVendorNo() != null
								&& article.getVendorNo().trim().length() > 0
								&& article.getSrcOfSupply().equalsIgnoreCase(
										"2")) {
							manualOrderParam.setSuppName(article.getVendorNo());
							if (article.getVendorName() != null
									&& article.getVendorName().trim().length() > 0)
								manualOrderParam.setSuppName(manualOrderParam
										.getSuppName()
										+ "-"
										+ article.getVendorName());
							manualOrderParam.setWarehouseDropdown(article
									.getVendorNo());
							// +"-"+articleSearchResultsFetched.get(0).getVendorName());
							if (request.getParameter("sourceSupply")
									.equalsIgnoreCase("1")
									|| article.getSrcOfSupply()
											.equalsIgnoreCase("1")) {
								try {
									vendordesc = article.getVendorNo();
									supplierList = articleService
											.getVendorList(vendordesc, "",
													vendordesc, siteNo,userDetail);
								} catch (Exception e) {
									e.printStackTrace();
								}
							}
							model.addAttribute("buttonRetain",
									article.getSrcOfSupply());
							// manualOrderParam.setSrcOfSupply(articleSearchResultsFetched.get(0).getSrcOfSupply());
						} else {
							flag = false;
							notRanged.append(" '"
									+ manualOrderParam.getArticleNo() + "',");
							/*
							 * model.addAttribute("msg",
							 * "Article '"+manualOrderParam.getArticleNo()+
							 * "' is not linked to any warehouse. Please try a different article."
							 * ); model.addAttribute("articleList",
							 * articleSearchResultsforCreate);
							 * model.addAttribute("manualOrderParam",
							 * manualOrderParam); model.addAttribute("size",
							 * "0"); model.addAttribute("invalidQty", "");
							 * modelAndView.addObject("model", model);
							 * modelAndView.addAllObjects(model); return
							 * modelAndView;
							 */
						}
						// +"-"+articleSearchResultsFetched.get(0).getVendorName());
					}
					if (article.getVendorNo() != null
							&& article.getVendorNo().trim().length() > 0
							&& article.getSrcOfSupply().equalsIgnoreCase("2")) {

					} else {
						flag = false;
						// notRanged.append(" '"+manualOrderParam.getArticleNo()+"',");
						/*
						 * model.addAttribute("msg",
						 * "Article '"+manualOrderParam
						 * .getArticleNo()+"' is not linked to the warehouse '"
						 * +manualOrderParam.getWarehouseDropdown()+"'.");
						 * model.addAttribute("articleList",
						 * articleSearchResultsforCreate);
						 * model.addAttribute("manualOrderParam",
						 * manualOrderParam); model.addAttribute("size", "0");
						 * model.addAttribute("invalidQty", "");
						 * modelAndView.addObject("model", model);
						 * modelAndView.addAllObjects(model); return
						 * modelAndView;
						 */
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
					int leadTime = 1;
					model.addAttribute("msg", "");
					DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					Date date = new Date();
					// //System.out.println(dateFormat.format(date));
					String currentDate = dateFormat.format(date);
					Calendar cal = Calendar.getInstance();
					cal.setTime(dateFormat.parse(currentDate));
					if (supplierList != null
							&& supplierList.size() > 0
							&& supplierList.get(0).getLeadTime() != null
							&& supplierList.get(0).getLeadTime() != ""
							&& !supplierList.get(0).getLeadTime()
									.equalsIgnoreCase("0")) {

						try {
							leadTime = Integer.parseInt(supplierList.get(0)
									.getLeadTime());
						} catch (Exception e) {
							e.printStackTrace();
						}
						cal.add(Calendar.DATE, leadTime);
					} else {
						cal.add(Calendar.DATE, leadTime);
					}
					// cal.add(Calendar.DATE, 1);
					String convertedDate = dateFormat.format(cal.getTime());
					article.setOrderDate(currentDate);
					article.setDeliveryDate(convertedDate);
					// article.setInputQty(manualOrderParam.getOrderQty());
					// article.setTotalOrdered(String.valueOf(totalOrdered.intValue()));
					article.setSaveFlag("N");
					if (flag)
						articleSearchResultsforCreate.add(article);
					model.addAttribute("articleList",
							articleSearchResultsforCreate);
					model.addAttribute("listSize",
							articleSearchResultsforCreate.size());
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
		if (notRanged != null && notRanged.toString().trim() != ""
				&& notRanged.toString().trim().length() > 0) {
			if (deleted != null && deleted.toString().trim() != ""
					&& deleted.toString().trim().length() > 0) {
				model.addAttribute("msg", "" + deleted.toString()
						+ "is deleted from your Store and cannot be ordered");
			} else {
				if (manualOrderParam.getWarehouseDropdown() != null
						&& manualOrderParam.getWarehouseDropdown().trim()
								.length() > 0
						&& !manualOrderParam.getWarehouseDropdown()
								.equalsIgnoreCase("0"))
					model.addAttribute("msg",
							"Article '" + notRanged.toString()
									+ "' is/are not linked to the warehouse '"
									+ manualOrderParam.getWarehouseDropdown()
									+ "'.");
				else
					model.addAttribute(
							"msg",
							"Article '"
									+ notRanged.toString()
									+ "' is/are not linked to any warehouse. Please try a different article.");

			}
		}
		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// //method called when select button of an article description search
	// result is clicked, on receive order screen.
	@RequestMapping(value = "/addArticleDescriptionDetail.htm", method = RequestMethod.GET)
	public ModelAndView addArticleDescriptionDetail(HttpServletRequest request,
			HttpServletResponse response) {
		model.addAttribute("invalidQty", "");
		// //System.out.println("addArticleDescription");
		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		String index = request.getParameter("desIndex");

		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		// //System.out.println("request.getParameter(\"recqty\")"+request.getParameter("recqty"));
		receiveParam.setRecqty(request.getParameter("recqty"));
		articleSearchResultsForReceive = new ArrayList<ArticleSearchResults>();
		// //System.out.println("index"+index);
		ArticleSearchResults article = null;
		StringBuffer notRanged = new StringBuffer();
		StringBuffer deleted = new StringBuffer();
		StringBuffer exists = new StringBuffer();
		boolean flag = true;
		String[] indexArray = index.split(":");
		for (int k = 0; k < indexArray.length; k++) {
			flag = true;
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));
				receiveParam.setArticleNo(article.getArticleNo());
				if (orderDetailBackup != null && orderDetailBackup.size() != 0) {
					for (int i = 0; i < orderDetailBackup.size(); i++) {
						if (article != null) {
							if (orderDetailBackup.get(i).getArticle()
									.equals(article.getArticleNo())) {
								model.addAttribute("focusIndex", i + 1);
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
				// deleted flag check
				if (article.getDeleteInd().equalsIgnoreCase("Y")) {
					flag = false;
					notRanged.append(" '" + article.getArticleNo() + "',");
					/*
					 * model.addAttribute("msg", "" + article.getDescription() +
					 * " (" + article.getArticleNo() +
					 * ") is deleted from your Store and cannot be ordered");
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				// linked to vendor check
				if (article.getVendorNo() == null
						|| article.getVendorNo().trim().length() <= 0) {
					flag = false;
					deleted.append(" " + article.getDescription() + " ("
							+ article.getArticleNo() + ")" + ",");
					/*
					 * model.addAttribute("msg",
					 * "Article '"+article.getArticleNo
					 * ()+"' is not linked to vendor '" + orderDet.getSuppNo() +
					 * "'."); modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				if (article != null) {
					OrderParam orderParamForReceive = new OrderParam();
					// //System.out.println("articleSearchResults.get(0).getArticleNo()"+article.getArticleNo());
					DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
					Date date = new Date();
					// //System.out.println(dateFormat.format(date));
					String currentDate = dateFormat.format(date);
					orderParamForReceive.setArticleNo(article.getArticleNo());
					orderParamForReceive.setFromDate(currentDate);
					orderParamForReceive.setToDate(currentDate);
					// orderParamForReceive.setOrderType("ZNB");
					orderParamForReceive.setOrderStatus(Authorized);
					orderParamForReceive.setOrderType("");
					orderParamForReceive.setPageNo(1);
					orderParamForReceive.setSiteNo(((UserContext) request
							.getSession().getAttribute("user")).getSiteNo());
					orderListForReceive = new ArrayList<Order>();
					// ////System.out.println("orderNO"+orderNo);
					// OrderParam vendorParam=new OrderParam();
					// vendorParam.setOrderNo(orderNo);
					// //vendorParam.setSearchByOptions("number");
					// vendorParam.setSiteNo(siteNo);
					// vendorParam.setSearchByOptions("number");
					try {
						orderListForReceive = orderService
								.getOrders(orderParamForReceive,userDetail);
						if (orderListForReceive != null
								&& orderListForReceive.size() > 0) {
							for (int i = 0; i < orderListForReceive.size(); i++) {
								if (orderListForReceive.get(i).getOrderNo()
										.equalsIgnoreCase(order.getOrderNo())) {
									orderListForReceive.remove(i);
									break;
								}
							}
							if (orderListForReceive != null
									&& orderListForReceive.size() > 0) {
								flag = false;
								articleSearchResultsForReceive.add(article);
								model.addAttribute("msg", "");

								model.addAttribute("popupFlag", "true");
								exists.append("Item '"
										+ article.getArticleNo()
										+ "' exists in order "
										+ orderListForReceive.get(0)
												.getOrderNo() + ",");
								model.addAttribute("exists", exists.toString());
								/*
								 * model.addAttribute("orderListForReceive",
								 * orderListForReceive);
								 * modelAndView.addObject("model", model);
								 * modelAndView.addAllObjects(model); return
								 * modelAndView;
								 */
							}
						}
					} catch (Exception e) {
						e.printStackTrace();
						model.addAttribute("msg", "");
						model.addAttribute("popupFlag", "");
						model.addAttribute("orderListForReceive",
								new ArrayList<Order>());

					}

				}

				if (article.getBaseUOMDesc() != null
						&& article.getBaseUOMDesc() != "") {
					if (article.getBaseUOMDesc().equalsIgnoreCase("each")) {
						if (receiveParam.getRecqty() != null
								&& receiveParam.getRecqty() != "") {
							if (Double.parseDouble(receiveParam.getRecqty()) % 1 == 0) {
								article.setInputQty(receiveParam.getRecqty());
							} else {
								Integer qty = (int) Double
										.parseDouble(receiveParam.getRecqty());
								article.setInputQty(qty.toString());
								model.addAttribute("invalidQty", "true");
							}
						} else {
							article.setInputQty("0");
							model.addAttribute("invalidQty", "");
						}
					} else if (receiveParam.getRecqty() != null
							&& receiveParam.getRecqty() != "") {
						article.setInputQty(receiveParam.getRecqty());
						model.addAttribute("invalidQty", "");
					}
				} else {
					model.addAttribute("invalidQty", "");
				}
				OrderDetail orde = new OrderDetail();
				if (article != null) {
					orde.setBaseUom(article.getBaseUom());
					orde.setOrderNo(order.getOrderNo());
					orde.setArticle(article.getArticleNo());
					orde.setReceivedQty(article.getInputQty());
					orde.setArticleDesc(article.getDescription());
					orde.setOrderQty("0");
					orde.setDespatchQty("0");
					if (article.getOM() != null
							&& Double.parseDouble(article.getOM()) % 1 == 0) {
						Integer qty3 = (int) Double
								.parseDouble(article.getOM());
						orde.setOM(qty3.toString());
					} else {
						orde.setOM(article.getOM());
					}
					// orde.setOM(article.getOM());
					orde.setOperation("5");
					orde.setOrderQty(article.getInputQty());
					orde.setOrderUOM(article.getOrdUOM());
					/*
					 * if(orderDetail!=null && orderDetail.size()>0) {
					 * orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo());
					 * }
					 */
					Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
					// //System.out.println("itemNo=" + itemNo);
					orde.setSaveFlag("N");
					orde.setItemNo(itemNo.toString());
					if (flag)
						orderDetailBackup.add(orde);
					// receiveParam.setArtEAN("");
					// receiveParam.setRecqty("");
					model.addAttribute("msg", "");
				}

			}
		}
		if (notRanged != null && notRanged.toString().trim() != ""
				&& notRanged.toString().trim().length() > 0) {
			if (deleted != null && deleted.toString().trim() != ""
					&& deleted.toString().trim().length() > 0) {
				model.addAttribute("msg", "" + deleted.toString()
						+ "is deleted from your Store and cannot be ordered");
			} else {
				model.addAttribute("msg", "Article '" + notRanged.toString()
						+ "' is not linked to vendor '" + orderDet.getSuppNo()
						+ "'.");
			}
		}
		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called to save item detail in create warehouse screen(save icon
	// clicked).
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

	// method called to save details in preqdetail screen (save icon clicked).
	@RequestMapping(value = "/savePReqDetail.htm", method = RequestMethod.GET)
	public void savePReqDetail(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside savePReqDetail");
		String index = request.getParameter("index");
		String orderDate = request.getParameter("orderDate");
		String deliveryDate = request.getParameter("deliveryDate");
		String inputQty = request.getParameter("inputQty");
		String totalOrdered = request.getParameter("totalOrdered");
		String articleIndex = request.getParameter("articleIndex");

		// //System.out.println("request.getParameter(\"index\")"+request.getParameter("index"));
		// //System.out.println("request.getParameter(\"orderDate\")"+request.getParameter("orderDate"));
		// //System.out.println("request.getParameter(\"deliveryDate\")"+request.getParameter("deliveryDate"));
		// //System.out.println("request.getParameter(\"inputQty\")"+request.getParameter("inputQty"));
		// //System.out.println("request.getParameter(\"totalOrdered\")"+request.getParameter("totalOrdered"));

		if (orderDetail != null && orderDetail.size() > 0) {
			// ////System.out.println(orderDetail.get(Integer.parseInt(index)-1).getArticle());
			for (int i = 0; i < orderDetail.size(); i++) {
				orderDetail.get(i).setDeliveryDate(deliveryDate);
				if (orderDetail.get(i).getArticle()
						.equalsIgnoreCase(articleIndex)) {

					if (!orderDetail.get(i).getOperation()
							.equalsIgnoreCase("D")) {
						orderDetail.get(i).setDeliveryDate(deliveryDate);
						orderDetail.get(i).setOrderQty(inputQty);
						orderDetail.get(i).setTotalOrd(totalOrdered);
						/*
						 * orderDetailBackup.get(i).setOrderQty(receiveQty);
						 * orderDetailBackup.get(i).setSaveFlag("Y");
						 * 
						 * orderDetailBackup.get(i).setOperation("U");
						 * orderDetailBackup
						 * .get(i).setOrderUOM(uomFlag.substring
						 * (uomFlag.length()
						 * -1).equalsIgnoreCase("1")?orderDetailBackup
						 * .get(Integer
						 * .parseInt(index)-1).getOrdUOM():orderDetailBackup
						 * .get(Integer.parseInt(index)-1).getBaseUom());
						 */
					}
				}

			}
			// orderDetail.get(Integer.parseInt(index)-1).setDateCreated(orderDate);

		}
	}

	// method called to delete an article from the list shown in create
	// warehouse screen(delete icon clicked).
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
		ModelAndView modelAndView = new ModelAndView("createOrder");

		if (articleSearchResultsforCreate != null
				&& articleSearchResultsforCreate.size() > 0) {
			articleSearchResultsforCreate.remove((Integer.parseInt(request
					.getParameter("index")) - 1));
			// String msg="Deleted";
		}
		model.addAttribute("invalidQty", "");
		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("listSize", articleSearchResultsforCreate.size());
		// model.addAttribute("msg", msg);
		model.addAttribute("msg", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when confirm and finalise button clicked on create
	// warehouse screen.
	@RequestMapping(value = "/finalizeManualOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String finalizeManualOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside finalise");
		model.addAttribute("msg", "");
		String createStatus = null;

		try {
			createStatus = orderService.createOrder(
					articleSearchResultsforCreate, manualOrderParam,userDetail);
		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase Order creation failed because of service unavailability.";
		}
		if (createStatus == null) {
			articleSearchResultsforCreate = new ArrayList<ArticleSearchResults>();
			return "true:" + manualOrderParam.getOrderRefNo();

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

	// method called when sendIBT button clicked on order detail screen.
	@RequestMapping(value = "/sendIBT.htm", method = RequestMethod.GET)
	@ResponseBody
	public String sendIBT(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside sendIBT");
		model.addAttribute("msg", "");
		String createStatus = null;
		String orderNo = "";
		String temperature = request.getParameter("temperatureForRecord");

		if (order != null) {
			orderNo = order.getOrderNo();
		}

		try {
			createStatus = orderService.sendIBT(orderNo, temperature,userDetail);
		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:IBT send failed,Due to Service unavaliabilty";
		}
		if (createStatus == null) {
			// articleSearchResultsforCreate=new
			// ArrayList<ArticleSearchResults>();
			String siteNo = ((UserContext) request.getSession().getAttribute(
					"user")).getSiteNo();
			ArrayList<Order> tempList = callOrderService(orderNo, siteNo);

			if (tempList != null
					&& tempList.size() > 0
					&& tempList.get(0).getOrderStatus() != null
					&& tempList.get(0).getOrderStatus() != ""
					&& tempList.get(0).getOrderStatus()
							.equalsIgnoreCase(Authorized)) {
				if (order != null) {
					order.setOrderStatus(Authorized);
				}
				if (orderDet != null) {
					orderDet.setOrderStatus(Authorized);
				}
				if (orderList != null && orderList.size() > 0) {
					for (int i = 0; i < orderList.size(); i++) {
						if (orderList.get(i).getOrderNo()
								.equalsIgnoreCase(orderNo)) {
							orderList.get(i).setOrderStatus(Authorized);
							break;
						}
					}
				}
				return "true:IBT Order sent successfully";

			} else {
				return "false:Sending IBT failed because of service unavaliabilty";
			}

		}
		return "false:IBT send failed due to SAP error -" + createStatus;

	}

	// method called when description search happend in create warehouse order
	// screen.
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
		String warehouse = (String) request.getParameter("warehouse");
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

		try {
			articleDescriptionResults = (ArrayList<ArticleSearchResults>) orderService
					.getManualOrders(orderParam,userDetail);

			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				/*
				 * for(int i=0;i<articleDescriptionResults.size();i++){
				 * if(articleDescriptionResults.get(i).getVendorNo()==null ||
				 * articleDescriptionResults
				 * .get(i).getVendorNo().trim().length()<=0){
				 * articleDescriptionResults.remove(i); } }
				 */
				modelAndView = new ModelAndView("descriptionLookup");
				model.addAttribute("nodata", "N");
				model.addAttribute("vendordesc", vendordesc);
				model.addAttribute("size", articleDescriptionResults.size());
				model.addAttribute("divideSubmit", "Y");
				model.addAttribute("receiveCall", "M");
				model.addAttribute("receiveCall1", "O");
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
				model.addAttribute("receiveCall1", "O");
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

		try {
			if ("1".equalsIgnoreCase(srcOfSupp)
					|| "vendor".equalsIgnoreCase(srcOfSupp)) {

				supplierList = articleService.getVendorList(vendorName,
						maxRows, vendorNo, siteNo,userDetail);
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
						maxRows, vendorNo,userDetail);
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

	// method used to save the receive quantity and pack om in receive order
	// page.
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
				if (receiveQty != null && receiveQty != "")
					orderDetailBackup.get(Integer.parseInt(index) - 1)
							.setReceivedQty(receiveQty);
			}

		} else {
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				if (receiveQty != null && receiveQty != "")
					orderDetailBackup.get(Integer.parseInt(index) - 1)
							.setReceivedQty(receiveQty);
				if (packOm != null && packOm != "")
					orderDetailBackup.get(Integer.parseInt(index) - 1).setOM(
							packOm);
				orderDetailBackup.get(Integer.parseInt(index) - 1).setSaveFlag(
						"Y");

				// String msg="Deleted";
			}
		}

	}

	// method called when confirm and finalise button clicked on IBT receive
	// screen.
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

		String adjustStatus = null;

		// ////System.out.println("AdjustmentQtyLength= "+request.getParameterValues("adjQty").length);
		String createStatus = orderService.goodsReceipt(receiveParam,
				orderDetail,userDetail);
		if (orderAdjust.size() > 0)
			adjustStatus = orderService.orderAdjust(receiveParam, orderAdjust,userDetail);

		String postStatus = null;
		if (createStatus == null && adjustStatus == null) {
			postStatus = "created:" + createStatus;

			// adding temperature in SAP
			String temperatureUpdateStatus = "";
			try {
				TemperatureSetParam temperatureParam = new TemperatureSetParam();
				temperatureParam.setPurOrdNo(order.getOrderNo());
				temperatureParam.setGrTemp1(request
						.getParameter("temperatureFromUser"));
				// //System.out.println("ord no"+temperatureParam.getPurOrdNo());
				// //System.out.println("temp gr 1"+temperatureParam.getGrTemp1());
				if (temperatureParam.getGrTemp1() != null
						&& temperatureParam.getGrTemp1().trim() != "")
					temperatureUpdateStatus = orderService
							.updateTemperature(temperatureParam,userDetail);
				updateOrderDetails(order.getOrderNo());
				// //System.out.println("temperatureUpdateStatus"+temperatureUpdateStatus);

			} catch (Exception e) {
				e.printStackTrace();
			}
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

	// method called when cancel order button clicked on orderdetail screen
	@RequestMapping(value = "/cancelGoodsOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String cancelGoodsOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside cancel cal blk in controller");
		try {
			receiveParam.setOrderNo(order.getOrderNo());
		} catch (Exception e) {
			// receiveParam.setOrderNo(request.getParameter("orderNo"));
		}
		CancelOrderParam cancelOrderParam = new CancelOrderParam();
		if (request.getParameter("goodsSite") != null
				&& request.getParameter("goodsSite").trim().length() > 0
				&& order.getOrderType().equalsIgnoreCase("ZUB")) {
			cancelOrderParam.setSiteNo(request.getParameter("goodsSite"));
		} else {
			cancelOrderParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());
		}
		cancelOrderParam.setPurOrdNo(order.getOrderNo());
		// //System.out.println("order no from object"+order.getOrderNo());
		String createStatus = "";
		try {
			createStatus = orderService.cancelOrder(cancelOrderParam,userDetail);
		} catch (Exception e) {
		}
		String postStatus = null;
		if (createStatus == null) {
			postStatus = "true";
			// Request for cancelling the Order is successfully submitted
			cancelStatus = true;
			order.setOrderStatus("Cancelled");
			if (orderList != null && orderList.size() >= 1) {
				for (int i = 0; i < orderList.size(); i++) {
					if (orderList.get(i).getOrderNo()
							.equals(order.getOrderNo())) {
						orderList.get(i).setOrderStatus("Cancelled");
					}

				}
			}
		} else {
			postStatus = createStatus;
			// Request for cancelling the Order failed
			cancelStatus = false;
		}

		return postStatus;
	}

	// method called when save icon clicked on ibt receive screen
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

	// method used to delete the artice in receive order page.
	@RequestMapping(value = "/deleteArticle.htm", method = RequestMethod.GET)
	public ModelAndView deleteArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		model.addAttribute("invalidQty", "");
		model.addAttribute("focusIndex", "");
		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		if (order.getOrderType().equalsIgnoreCase("ZUB")) {

		} else {
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				orderDetailBackup.remove((Integer.parseInt(request
						.getParameter("index1")) - 1));
				// String msg="Deleted";
			}
		}

		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("msg", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called onclicking the receive order button on the orderdetail
	// screen.
	@RequestMapping(value = "/receiveOrder.htm", method = RequestMethod.GET)
	public ModelAndView receiveOrder(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		List<MovementType> mvmtTypeList = new ArrayList<MovementType>();
		List<MovementType> mvmtTypeListNew = new ArrayList<MovementType>();
		String tempFromUserStdPoReceive = null;
		model.addAttribute("focusIndex", "");
		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		articleSearchResultsForReceive = new ArrayList<ArticleSearchResults>();
		String invoiceNo = request.getParameter("invoiceNo");
		String invoiceTotal = request.getParameter("invoiceTotal");
		String gst = request.getParameter("gst");
		String delDock = request.getParameter("delDock");
		String temperature = "";
		// orderDetailBackup=new ArrayList<OrderDetail>();
		try {
			String source = "A";
			mvmtTypeList = sohAdjustLogServiceImpl.getMvmtTypeList(source,userDetail);
			if (mvmtTypeList != null && mvmtTypeList.size() > 0) {
				for (int i = (mvmtTypeList.size() - 1); i > -1; i--) {
					if (mvmtTypeList.get(i).getMvmtType()
							.equalsIgnoreCase("Z85")
							|| mvmtTypeList.get(i).getMvmtType()
									.equalsIgnoreCase("Z86"))
						mvmtTypeListNew.add(mvmtTypeList.get(i));
				}
			}
			model.addAttribute("mvmtTypeList", mvmtTypeListNew);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No reason code Data Found ");
			model.addAttribute("mvmtTypeList", new ArrayList<MovementType>());
		}
		try {
			if (request.getParameter("temperature") != null
					&& request.getParameter("temperature") != "") {
				temperature = request.getParameter("temperature");
				tempFromUserStdPoReceive = request.getParameter("temperature");
				model.addAttribute("tempFromUserStdPoReceive",
						tempFromUserStdPoReceive);
			}
			/*
			 * else{ if(orderDet!=null &&
			 * orderDet.getTemperature().trim().length()>0){
			 * temperature=orderDet.getTemperature(); } else{ temperature=""; }
			 * }
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}
		// //System.out.println("temperature="+temperature);
		orderAdjust = new ArrayList<OrderDetail>();
		ModelAndView modelAndView;
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

		/*
		 * orderDetailBackup.addAll(orderDetail);
		 * if(orderDetailBackup!=null&&orderDetailBackup.size()>0) { for(int
		 * i=0;i<orderDetailBackup.size();i++) {
		 * orderDetailBackup.get(i).setReceivedQty
		 * (orderDetailBackup.get(i).getOrderQty()); } }
		 */
		if (orderDetail != null) {
			orderDetailBackup = new ArrayList<OrderDetail>(orderDetail.size());
			for (OrderDetail copyOrderDetail : orderDetail) {
				orderDetailBackup.add((OrderDetail) copyOrderDetail.clone());
			}
		}
		if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
			for (int i = 0; i < orderDetailBackup.size(); i++) {
				orderDetailBackup.get(i).setSaveFlag("N");

				orderDetailBackup.get(i).setReceivedQty(
						orderDetailBackup.get(i).getOrderQty());
				if (orderDetailBackup.get(i).getOM() != null
						&& orderDetailBackup.get(i).getOM() != "") {
					try {
						if (Double
								.parseDouble(orderDetailBackup.get(i).getOM()) % 1 == 0) {
							Integer qty = (int) Double
									.parseDouble(orderDetailBackup.get(i)
											.getOM());
							orderDetailBackup.get(i).setOM(qty.toString());
							Integer qty1 = (int) Double
									.parseDouble(orderDetailBackup.get(i)
											.getReceivedQty());
							orderDetailBackup.get(i).setReceivedQty(
									qty1.toString());
						} else {
							String qty = orderDetailBackup.get(i).getOM();
							orderDetailBackup.get(i).setOM(qty);

							// model.addAttribute("invalidQty", "true");
						}
					} catch (Exception e) {
						e.printStackTrace();
					}
				}
			}
		}
		model.remove("orderDetails");
		receiveParam.setInvoiceNo(invoiceNo);
		receiveParam.setInvoiceTotal(invoiceTotal);
		receiveParam.setGst(gst);
		receiveParam.setDelDock(delDock);
		receiveParam.setTemperature(temperature);

		receiveParam.setIndex(param.getIndex());

		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("msg", "");
		if (order.getOrderType().equalsIgnoreCase("ZUB")) {
			/*
			 * //for finding temperature range---start
			 * 
			 * //double lowerBoundArray[]=
			 * ////System.out.println("receive order-- ord contrllr--"); double
			 * finalLowerBound=0; double finalUpperBound=0; double
			 * tempLowerBound=0; double tempUpperBound=0; boolean
			 * isTempAvailable=false;
			 * 
			 * String Str2;
			 * 
			 * for(int i=0;i<orderDetailBackup.size();i++){ String Str = new
			 * String(orderDetailBackup.get(i).getTemperature().trim());
			 * //System
			 * .out.println("i**"+i+" "+orderDetailBackup.get(i).getTemperature
			 * ()); ////System.out.println("i**"+i+" "+orderDetailBackup.get(i).
			 * getArticle ()); if(Str!=null && Str.trim().length()!=0){
			 * isTempAvailable=true;
			 * ////System.out.println("temp from ser"+i+"  "+Str); try{ int
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
			 * ////System.out.println("finalLowerBound"+i+"  "+finalLowerBound);
			 * 
			 * } if(finalUpperBound<tempUpperBound){
			 * 
			 * finalUpperBound=tempUpperBound;
			 * ////System.out.println("finalUpperBound"+i+"  "+finalUpperBound);
			 * }
			 * 
			 * } catch(Exception e){ e.printStackTrace();
			 * 
			 * }
			 * 
			 * } } String temperatureFromService=""; if(isTempAvailable){
			 * 
			 * temperatureFromService="("+finalLowerBound+" to "+finalUpperBound+
			 * ")";
			 * ////System.out.println("calculated temperature in ibt receive *** "
			 * +temperatureFromService);
			 * 
			 * model.addAttribute("temperatureForIbtReceive",
			 * temperatureFromService); model.addAttribute("deptForIbtReceive",
			 * ""); }else{ model.addAttribute("temperatureForIbtReceive", "");
			 * model.addAttribute("deptForIbtReceive", ""); }
			 */
			String temperature1 = "";
			String department = "";

			temperature1 = serviceImpl.getTemperatureForTempCheck(orderDetail);
			department = serviceImpl.getDepartmentForTempCheck(orderDetail,
					((UserContext) request.getSession().getAttribute("user"))
							.getSalesOrg().toString());
			model.addAttribute("temperatureForIbtReceive", temperature1);
			model.addAttribute("deptForIbtReceive", department);
			// //System.out.println("calculated temperature"+temperature1);
			// //System.out.println("calculated rank"+department);

			modelAndView = new ModelAndView("ibtGoodsReceipt");
		} else {
			modelAndView = new ModelAndView("receiveOrder");
		}
		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("orderDetails", orderDetailBackup);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when pagination button clicked on order lookup screen.
	@RequestMapping(value = "/requestSearchForPagination.htm", method = RequestMethod.POST)
	public ModelAndView requestSearchForPagination(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		String pageNumber = request.getParameter("pageNumber");

		// System.err.println(pageNumber + "pageNumber");
		ModelAndView modelAndView = new ModelAndView("orderLookup", "param",
				param);

		if (pageNumber != null && pageNumber.trim().length() > 0) {
			param.setPageNo(Integer.parseInt(pageNumber) > 0 ? Integer
					.parseInt(pageNumber) : 1);
		} else {
			param.setPageNo(1);
		}

		try {
			if ((!param.getOrderType().equals("ZX") && !param.getOrderType()
					.equals("ZY"))) {

				orderList = orderService.getOrders(param,userDetail);
			} else {
				if (param.getOrderStatus() != null
						&& param.getOrderStatus().trim().length() > 0
						&& !(param.getOrderStatus().equalsIgnoreCase("Select") || param
								.getOrderStatus().equalsIgnoreCase("All"))) {
					if (orderListForPR != null && orderListForPR.size() > 0) {
						int no = param.getPageNo();
						int endIndex = ((no - 1) * 20) + 20;
						orderList = new ArrayList<Order>();
						for (int i = ((no - 1) * 20); i < (endIndex > orderListForPR
								.size() ? orderListForPR.size() : (endIndex)); i++) {
							orderList.add(orderListForPR.get(i));
						}
					}
				} else {
					orderList = orderService.getOrders(param,userDetail);
				}

			}
			model.addAttribute("param", param);
			if (orderList != null && orderList.size() > 0) {
				if (orderList.size() == 1) {
					return requestOrderDetail(request, response);
				} else if (orderList != null && orderList.size() > 1) {
					model.addAttribute("orderList", orderList);
					if (orderList.get(0).getMsg().trim().length() > 0
							&& orderList.get(0).getMsg() != null)
						param.setRecordCount(Integer.parseInt(orderList.get(0)
								.getMsg().trim()));
					if (orderListForPR != null && orderListForPR.size() > 0) {
						param.setRecordCount(orderListForPR.size());
					}
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

	// not used
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
		param.setArticleNo(articleNo);
		param.setOrderStatus(Open);
		param.setOpenFlag("true");
		param.setOrderType("");
		ArrayList<Order> orderListOfOpenStatus = new ArrayList<Order>();
		try {

			// model.addAttribute("noData", "");
			orderListOfOpenStatus = orderService.getOrders(param,userDetail);

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
		String status = orderService.getVendorClaims(receiveParam,userDetail);
		if (status == null) {
			if (order != null) {
				String siteNo = ((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo();
				ArrayList<Order> tempList = callOrderService(
						order.getOrderNo(), siteNo);
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

					// //System.err.println(" vendor claim authority success");

				} else {
					/*
					 * //receiveParam.setVendorAuthNo("");
					 * //System.err.println(" vendor claim authority failure");
					 * model.addAttribute("msg", "vendorfailure");
					 * model.addAttribute("status", status);
					 */
				}
			} else {
				// receiveParam.setVendorAuthNo("");
				/*
				 * //System.err.println(" vendor claim authority failure");
				 * model.addAttribute("msg", "vendorfailure");
				 * model.addAttribute("status", status);
				 */
			}
			// System.err.println(" vendor claim authority success");
			model.addAttribute("msg", "vendorsuccess");
			model.addAttribute("status", status);
		} else {
			// receiveParam.setVendorAuthNo("");
			// System.err.println(" vendor claim authority failure");
			model.addAttribute("msg", "vendorfailure");
			model.addAttribute("status", status);
		}
		ModelAndView modelAndView = new ModelAndView("receiveOrder");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// not used
	@RequestMapping(value = "/storeNoValidation.htm", method = RequestMethod.GET)
	@ResponseBody
	public String storeNoValidation(HttpServletRequest request,
			HttpServletResponse response) {
		String storeNumber = "";
		String storeName = "";
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
								.getStoreValidationDetails(storeVal,userDetail);

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

	// not used
	@RequestMapping(value = "/nearByStoreValidation.htm", method = RequestMethod.GET)
	public ModelAndView nearByStoreValidation(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("siteDetails");
		String distance = request.getParameter("distance");
		String maxResults = request.getParameter("maxResults");
		String[] salesOrg = request.getParameterValues("salesOrg");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		List<StoresNearByModel> storeList = null;
		if (salesOrg != null && salesOrg.length != 0) {

			try {
				storeList = orderService.getStoresNearBy(salesOrg, distance,
						maxResults, siteNo,userDetail);

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

	// not used
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
		try {
			storeDetailsList = (ArrayList<StoresNearByModel>) orderService
					.getStoresNearBy(checkBoxValues, distance, resSize, siteNo,userDetail);
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

	// onpage load for reconcilation report
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

		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),userDetail);
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

	// method to generateReconcilReport
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
		}/*
		 * else{ ////System.out.println("in else"); for(int
		 * i=0;i<deptInfoList.size();i++){
		 * if(deptInfoList.get(i).equals(paramRecon.getDept())){
		 * ////System.out.println("in if");
		 * paramRecon.setDepartmentText(deptInfoList
		 * .get(i).getNode()+" - "+deptInfoList.get(i).getNodeDesc()); } }
		 * 
		 * }
		 */

		paramRecon.setReceiptsWithText("");
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
			// reconciliationReport = (ArrayList<InvoiceReconcilationModel>)
			// invoiceReconcileServiceImpl
			// .getInvoiceReconcilationDetails(paramRecon,"normal");

			reconciliationReportPrint = (ArrayList<InvoiceReconcilationModel>) invoiceReconcileServiceImpl
					.getInvoiceReconcilationDetails(paramRecon, "print",userDetail);

			Integer no = paramRecon.getPageNumber();
			int endIndex = ((no - 1) * 20) + 20;

			reconciliationReport = new ArrayList<InvoiceReconcilationModel>();
			for (int i = ((no - 1) * 20); i < (endIndex > reconciliationReportPrint
					.size() ? reconciliationReportPrint.size() : (endIndex)); i++) {
				reconciliationReport.add(reconciliationReportPrint.get(i));
			}

			if (reconciliationReport != null && reconciliationReport.size() > 0) {
				if (reconciliationReport.get(0).getPurchaseOrder() != null
						&& reconciliationReport.get(0).getPurchaseOrder()
								.trim().length() > 0) {

					// for print
					// reconciliationReportPrint =
					// (ArrayList<InvoiceReconcilationModel>)
					// invoiceReconcileServiceImpl
					// .getInvoiceReconcilationDetails(paramRecon,"print");

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

	// method called when pagination icon clicked on reconcilation report
	// screen.
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
		// paramRecon.setRecordCount(0);

		try {
			// reconciliationReport = (ArrayList<InvoiceReconcilationModel>)
			// invoiceReconcileServiceImpl
			// .getInvoiceReconcilationDetails(paramRecon,"normal");

			Integer no = paramRecon.getPageNumber();
			int endIndex = ((no - 1) * 20) + 20;

			reconciliationReport = new ArrayList<InvoiceReconcilationModel>();
			for (int i = ((no - 1) * 20); i < (endIndex > reconciliationReportPrint
					.size() ? reconciliationReportPrint.size() : (endIndex)); i++) {
				reconciliationReport.add(reconciliationReportPrint.get(i));
			}

			if (reconciliationReport != null && reconciliationReport.size() > 0) {

				/*
				 * if (reconciliationReport.get(0).getPurchaseOrder() != null &&
				 * reconciliationReport.get(0).getPurchaseOrder()
				 * .trim().length() > 0) { if
				 * (reconciliationReport.get(0).getMsg().trim().length() > 0 &&
				 * reconciliationReport.get(0).getMsg() != null)
				 * paramRecon.setRecordCount(Integer
				 * .parseInt(reconciliationReport.get(0).getMsg()));
				 * modelRecon.addAttribute("reconcileList",
				 * reconciliationReport); }
				 */
				modelRecon.addAttribute("reconcileList", reconciliationReport);

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

		// System.out.print( textDate + " enhanced:  " );
		// //System.out.println( yyyy.format( actualDate ) );
		return yyyy.format(actualDate);
	}

	@RequestMapping(value = "/backToRecon.htm", method = RequestMethod.GET)
	public ModelAndView backToRecon(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("reconciliationReport");
		modelRecon.addAttribute("reconcileList", reconciliationReport);
		modelRecon.addAttribute("param", paramRecon);
		modelAndView.addObject("model", modelRecon);
		modelAndView.addAllObjects(modelRecon);
		return modelAndView;
	}

	public ArrayList<Order> callOrderService(String orderNo, String siteNo) {
		ArrayList<Order> tempList = null;
		// //System.out.println("orderNO"+orderNo);
		OrderParam vendorParam = new OrderParam();
		vendorParam.setOrderNo(orderNo);
		vendorParam.setSearchByOptions("number");
		vendorParam.setSiteNo(siteNo);
		// param.setOrderType("");
		try {
			tempList = orderService.getOrders(vendorParam,userDetail);
		} catch (Exception e) {
			e.printStackTrace();
			return tempList;

		}
		return tempList;
	}

	// method called when create po button clicked on preq detail screen.
	@RequestMapping(value = "/createOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String createOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside finalise");
		model.addAttribute("msg", "");
		String createStatus = null;
		String purReqNo = (String) request.getParameter("prNo");

		String dept = (String) request.getParameter("dept");

		manualOrderParam = new ManualOrderParam();

		manualOrderParam.setPurReqNo(purReqNo);

		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();

		manualOrderParam.setSiteNo(siteNo);
		if (order != null) {
			manualOrderParam.setSuppName(order.getSuppNo());
		}
		try {

			Integer salesOrg = ((UserContext) request.getSession()
					.getAttribute("user")).getSalesOrg();
			String orderType = PortalUtil.ZNB;

			if (PortalUtil.PETROL_SALES_ORG.intValue() == salesOrg.intValue()) {
				orderType = PortalUtil.ZNB;
			} else {
				if (PortalUtil.PRODUCE_DEPT.equals(dept)) {
					orderType = PortalUtil.ZNBP;
				}

			}

			List<ArticleSearchResults> articleDescriptionResults = new ArrayList<ArticleSearchResults>();

			ArticleSearchResults article = new ArticleSearchResults();
			article.setVendorNo(orderDet.getSuppNo());

			articleDescriptionResults.add(article);
			createStatus = pReqService.sendOrder(articleDescriptionResults,
					manualOrderParam, orderType,userDetail);
		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase Order creation failed because of service unavailability.";
		}
		if (createStatus == null) {
			order.setOrderStatus(Closed);
			if (orderList != null && orderList.size() > 0) {
				for (Order ord : orderList) {
					if (ord.getpReqNo().equalsIgnoreCase(order.getpReqNo())) {
						ord.setOrderStatus(Closed);
						ord.setOrderNo(manualOrderParam.getOrderRefNo());
					}
				}
			}
			return "true:" + manualOrderParam.getOrderRefNo();

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

	public PReqServiceImpl getpReqService() {
		return pReqService;
	}

	public void setpReqService(PReqServiceImpl pReqService) {
		this.pReqService = pReqService;
	}

	// method called when update preq button clicked on preq detail screen
	@RequestMapping(value = "/updatePurchaseReq.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updatePurchaseReq(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside updatePurchaseReq");
		model.addAttribute("msg", "");
		String createStatus = null;
		String purReqNo = (String) request.getParameter("prNo");

		try {
			manualOrderParam = new ManualOrderParam();
			manualOrderParam.setPurReqNo(purReqNo);
			String siteNo = ((UserContext) request.getSession().getAttribute(
					"user")).getSiteNo();

			manualOrderParam.setSiteNo(siteNo);

			createStatus = pReqService
					.updatePReq(orderDetail, manualOrderParam,userDetail);

		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase Requisition update failed because of service unavailability.";
		}
		if (createStatus == null) {
			// articleSearchResultsforCreate=new
			// ArrayList<ArticleSearchResults>();
			return "true:" + manualOrderParam.getOrderRefNo();

		}
		return "false:Purchase Requisition update failed due to SAP error - "
				+ createStatus;

	}

	// method called when cancel button clicked on preq detail screen
	@RequestMapping(value = "/cancelPurchaseReq.htm", method = RequestMethod.GET)
	@ResponseBody
	public String cancelPurchaseReq(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside cancelPurchaseReq");
		model.addAttribute("msg", "");
		String createStatus = null;
		String purReqNo = (String) request.getParameter("prNo");

		try {

			String siteNo = ((UserContext) request.getSession().getAttribute(
					"user")).getSiteNo();

			createStatus = pReqService.cancelPReq(purReqNo, siteNo,userDetail);

		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase requisition cancellation failed,Due to Service unavailability";
		}
		if (createStatus == null) {
			// articleSearchResultsforCreate=new
			// ArrayList<ArticleSearchResults>();

			order.setOrderStatus(Closed);
			if (orderList != null && orderList.size() > 0) {
				for (int j = 0; j < orderList.size(); j++) {
					if (orderList.get(j).getpReqNo()
							.equalsIgnoreCase(order.getpReqNo())) {
						orderList.get(j).setOrderStatus(Closed);
						orderList.remove(j);
					}
				}
			}
			return "true";

		}
		return "false:Purchase requisition cancellation failed due to SAP error - "
				+ createStatus;

	}

	// method called when delete icon clicked in preq detail screnn
	@RequestMapping(value = "/deletePReqArticle.htm", method = RequestMethod.POST)
	public ModelAndView deletePReqArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("deleteArticle");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}

		if (request.getParameter("index1") != null
				&& request.getParameter("index1").trim().length() > 0) {
			String articleNo = request.getParameter("articleIndex").trim();
			if (orderDetail != null && orderDetail.size() > 0) {

				for (int i = 0; i < orderDetail.size(); i++) {
					if (orderDetail.get(i).getArticle()
							.equalsIgnoreCase(articleNo)) {
						if (!(orderDetail.get(i).getOperation() != null
								&& orderDetail.get(i).getOperation() != "" && orderDetail
								.get(i).getOperation().equalsIgnoreCase("I")))
							orderDetail.get(i).setOperation("D");
						else {
							orderDetail.remove(i);
						}
					}

				}

				/*
				 * if(orderDetail!=null && orderDetail.size()>0){ OrderDetail
				 * detail = (OrderDetail)
				 * orderDetail.get(Integer.parseInt(request
				 * .getParameter("index1"))-1);
				 * 
				 * detail.setOperation("D"); }
				 */
			}
		}
		model.addAttribute("msg", "");
		model.addAttribute("orderDetails", orderDetail);
		model.addAttribute("updateStatus", "false");
		ModelAndView modelAndView = new ModelAndView("pReqDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when search and add button clicked on preq detail screen
	@RequestMapping(value = "/addPReqArticle.htm", method = RequestMethod.GET)
	public ModelAndView addPReqArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("addPReqArticle");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		model.addAttribute("msg", "");
		ModelAndView modelAndView = new ModelAndView("pReqDetails");
		receiveParam = new ReceiveParam();
		receiveParam.setArticleNo(request.getParameter("artEAN"));
		receiveParam.setRecqty(request.getParameter("recqty"));
		if (request.getParameter("articleType").equalsIgnoreCase(
				"ArticleNumber")) {
			receiveParam.setArticleType("articleNo");
		} else if (request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			receiveParam.setArticleType("ean");
		} else {
			receiveParam.setArticleType("articleNo");
		}
		receiveParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		if (order != null) {
			receiveParam.setSuppName(order.getSuppNo());
			receiveParam.setSrcOfSupply("1");
		}

		model.addAttribute("receiveParam", receiveParam);

		if (orderDetail != null && orderDetail.size() != 0) {

			for (int i = 0; i < orderDetail.size(); i++) {
				if (receiveParam.getArticleNo().equals(
						orderDetail.get(i).getArticle())
						&& !"D".equals(orderDetail.get(i).getOperation())) {
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
		try {

			articleSearchResults = orderService.searchArticle(receiveParam,userDetail);
			/*
			 * receiveParam.getArtEAN(), param.getSiteNo(),
			 * receiveParam.getRadioBtn());
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}
		if (orderDetail != null && orderDetail.size() != 0) {
			for (int i = 0; i < orderDetail.size(); i++) {
				if (articleSearchResults != null
						&& articleSearchResults.size() != 0) {
					if (orderDetail.get(i).getArticle()
							.equals(articleSearchResults.get(0).getArticleNo())
							&& !"D".equals(orderDetail.get(i).getOperation())) {
						model.addAttribute("invalidQty", "");
						model.addAttribute("msg", "Article '"
								+ articleSearchResults.get(0).getArticleNo()
								+ "' already exists in the list.");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}
				}

			}
		}
		if (articleSearchResults != null && articleSearchResults.size() != 0) {

			// deleted flag check
			if (articleSearchResults.get(0).getDeleteInd()
					.equalsIgnoreCase("Y")) {
				model.addAttribute("msg", ""
						+ articleSearchResults.get(0).getDescription() + " ("
						+ articleSearchResults.get(0).getArticleNo()
						+ ") is deleted from your Store and cannot be ordered");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

			// linked to vendor check
			if (articleSearchResults.get(0).getVendorNo() == null
					|| articleSearchResults.get(0).getVendorNo().trim()
							.length() <= 0) {
				model.addAttribute(
						"msg",
						"Article '" + receiveParam.getArticleNo()
								+ "' is not linked to vendor '"
								+ receiveParam.getSuppName() + "'.");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}
		}
		if (articleSearchResults != null && articleSearchResults.size() != 0
				&& articleSearchResults.get(0).getArticleNo() != null
				&& articleSearchResults.get(0).getArticleNo() != "") {

			ArticleSearchResults results = articleSearchResults.get(0);
			if (results.getBaseUOMDesc() != null
					&& results.getBaseUOMDesc() != "") {
				if (results.getBaseUOMDesc().equalsIgnoreCase("each")) {
					if (receiveParam.getRecqty() != null
							&& receiveParam.getRecqty() != "") {
						if (Double.parseDouble(receiveParam.getRecqty()) % 1 == 0) {
							results.setInputQty(receiveParam.getRecqty());
						} else {
							Integer qty = (int) Double.parseDouble(receiveParam
									.getRecqty());
							results.setInputQty(qty.toString());
							model.addAttribute("invalidQty", "true");
						}
					} else {
						results.setInputQty("0");
						model.addAttribute("invalidQty", "");
					}
				} else if (receiveParam.getRecqty() != null
						&& receiveParam.getRecqty() != "") {
					results.setInputQty(receiveParam.getRecqty());
					model.addAttribute("invalidQty", "");
				}
			} else {
				model.addAttribute("invalidQty", "");
			}
			orde.setpReqNo(order.getpReqNo());
			orde.setArticle(results.getArticleNo());
			orde.setReceivedQty(results.getInputQty());
			orde.setArticleDesc(results.getDescription());
			orde.setOrderQty(receiveParam.getRecqty());
			orde.setOperation("I");
			orde.setSuppNo(results.getVendorNo());
			// orde.setUOM(results.getOrdUOM());
			orde.setUOM(results.getBaseUom());

			int lineNo = 0;
			for (OrderDetail detail : orderDetail) {

				if (detail.getItemNo() != null
						&& lineNo < Integer.parseInt(detail.getItemNo())) {

					lineNo = Integer.parseInt(detail.getItemNo());

				}

			}
			orde.setItemNo(String.valueOf(lineNo + 10));
			// new
			Double totalOrdered = null;
			orde.setTotalOrd("");
			orde.setOM(results.getOM());
			if (Double.parseDouble(orde.getOrderQty()) % 1 == 0) {
				totalOrdered = Double.parseDouble(orde.getOM())
						* Double.parseDouble(orde.getOrderQty());
				orde.setTotalOrd(String.valueOf(totalOrdered.intValue()));
			} else {
				Integer qty = (int) Double.parseDouble(orde.getOrderQty());
				Integer om = (int) Double.parseDouble(orde.getOM());
				Integer total = qty * om;
				orde.setTotalOrd(total.toString());
			}

			if (null != orderDetail && orderDetail.size() > 0) {
				orde.setDateCreated(orderDetail.get(0).getDateCreated());
				orde.setDeliveryDate(orderDetail.get(0).getDeliveryDate());

				for (OrderDetail detail : orderDetail) {
					if (detail.getArticle().equals(orde.getArticle())
							&& "D".equals(detail.getOperation())) {

						detail.setOperation("I");
						detail.setOrderQty(orde.getOrderQty());
						detail.setUOM(orde.getUOM());
						// new--
						detail.setOM(orde.getOM());
						detail.setTotalOrd(orde.getTotalOrd());
						model.addAttribute("orderDetails", orderDetail);
						model.addAttribute("updateStatus", "false");
						modelAndView = new ModelAndView("pReqDetails");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;

					}
				}
			}

			orderDetail.add(orde);
			receiveParam.setArtEAN("");
			receiveParam.setRecqty("");
			model.addAttribute("msg", "");
		} else
			model.addAttribute("msg",
					"Article '" + receiveParam.getArticleNo()
							+ "' not found or not linked to vendor '"
							+ receiveParam.getSuppName() + "'.");
		// model.addAttribute("msg",
		// "Article '"+receiveParam.getArticleNo()+"' not found. Please try a different article number.");
		model.addAttribute("orderDetails", orderDetail);
		model.addAttribute("updateStatus", "false");
		modelAndView = new ModelAndView("pReqDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// //method called when select button of an article description search
	// result is clicked, on PREQ detail screen.
	@RequestMapping(value = "/addArticlePreqDescriptionDetail.htm", method = RequestMethod.GET)
	public ModelAndView addArticlePreqDescriptionDetail(
			HttpServletRequest request, HttpServletResponse response) {
		model.addAttribute("invalidQty", "");
		// //System.out.println("addArticleDescription");
		String index = request.getParameter("desIndex");
		ModelAndView modelAndView = new ModelAndView("pReqDetails");
		receiveParam = new ReceiveParam();
		receiveParam.setOrderQty(request.getParameter("recqty"));
		// //System.out.println("index"+index);
		ArticleSearchResults article = null;
		StringBuffer notRanged = new StringBuffer();
		StringBuffer deleted = new StringBuffer();
		boolean flag = true;
		String[] indexArray = index.split(":");
		for (int k = 0; k < indexArray.length; k++) {
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));

				if (orderDetail != null && orderDetail.size() != 0) {
					for (int i = 0; i < orderDetail.size(); i++) {
						if (article != null) {
							if (orderDetail.get(i).getArticle()
									.equals(article.getArticleNo())
									&& !"D".equals(orderDetail.get(i)
											.getOperation())) {
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
				// deleted flag check
				if (article.getDeleteInd().equalsIgnoreCase("Y")) {
					notRanged.append(" '" + article.getArticleNo() + "',");
					/*
					 * model.addAttribute("msg", "" + article.getDescription() +
					 * " (" + article.getArticleNo() +
					 * ") is deleted from your Store and cannot be ordered");
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				// linked to vendor check
				if (article.getVendorNo() == null
						|| article.getVendorNo().trim().length() <= 0) {
					deleted.append(" " + article.getDescription() + " ("
							+ article.getArticleNo() + ")" + ",");
					/*
					 * model.addAttribute("msg", "Article '" +
					 * article.getArticleNo()+"' is not linked to vendor '" +
					 * order.getSuppNo() + "'.");
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
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
					orde.setpReqNo(order.getpReqNo());
					orde.setArticle(article.getArticleNo());
					orde.setReceivedQty(article.getInputQty());
					orde.setArticleDesc(article.getDescription());
					orde.setOrderQty(receiveParam.getOrderQty());
					orde.setOperation("I");
					orde.setSuppNo(article.getVendorNo());
					// orde.setUOM(article.getOrdUOM());
					orde.setUOM(article.getBaseUom());
					int lineNo = 0;
					for (OrderDetail detail : orderDetail) {

						if (detail.getItemNo() != null
								&& lineNo < Integer
										.parseInt(detail.getItemNo())) {

							lineNo = Integer.parseInt(detail.getItemNo());

						}

					}
					orde.setItemNo(String.valueOf(lineNo + 10));
					// new
					Double totalOrdered = null;
					orde.setTotalOrd("");
					orde.setOM(article.getOM());

					if (Double.parseDouble(orde.getOrderQty()) % 1 == 0) {
						totalOrdered = Double.parseDouble(orde.getOM())
								* Double.parseDouble(orde.getOrderQty());
						orde.setTotalOrd(String.valueOf(totalOrdered.intValue()));
					} else {
						Integer qty = (int) Double.parseDouble(orde
								.getOrderQty());
						Integer om = (int) Double.parseDouble(orde.getOM());
						Integer total = qty * om;
						orde.setTotalOrd(total.toString());
					}

					if (null != orderDetail && orderDetail.size() > 0) {
						orde.setDateCreated(orderDetail.get(0).getDateCreated());
						orde.setDeliveryDate(orderDetail.get(0)
								.getDeliveryDate());

						for (OrderDetail detail : orderDetail) {
							if (detail.getArticle().equals(orde.getArticle())
									&& "D".equals(detail.getOperation())) {

								detail.setOperation("I");
								detail.setOrderQty(orde.getOrderQty());
								detail.setUOM(orde.getUOM());
								// new
								detail.setOM(orde.getOM());
								detail.setTotalOrd(orde.getTotalOrd());
								model.addAttribute("orderDetails", orderDetail);
								model.addAttribute("updateStatus", "false");
								modelAndView = new ModelAndView("pReqDetails");
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;

							}
						}
					}

					if (flag)
						orderDetail.add(orde);
					// receiveParam.setArtEAN("");
					// receiveParam.setRecqty("");
					model.addAttribute("msg", "");
				}

			}
		}
		if (notRanged != null && notRanged.toString().trim() != ""
				&& notRanged.toString().trim().length() > 0) {
			if (deleted != null && deleted.toString().trim() != ""
					&& deleted.toString().trim().length() > 0) {
				model.addAttribute("msg", "" + deleted.toString()
						+ "is deleted from your Store and cannot be ordered");
			} else {
				model.addAttribute("msg", "Article '" + notRanged.toString()
						+ "' is not linked to vendor '" + order.getSuppNo()
						+ "'.");
			}
		}
		model.addAttribute("updateStatus", "false");
		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/addToReceiveList.htm", method = RequestMethod.GET)
	public ModelAndView addToReceiveList(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("receiveOrder");

		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		if (articleSearchResultsForReceive != null
				&& articleSearchResultsForReceive.size() != 0
				&& articleSearchResultsForReceive.get(0).getArticleNo() != null
				&& articleSearchResultsForReceive.get(0).getArticleNo() != "") {
			for (int i = 0; i < articleSearchResultsForReceive.size(); i++) {
				OrderDetail orde = new OrderDetail();
				ArticleSearchResults results = articleSearchResultsForReceive
						.get(i);
				if (results.getBaseUOMDesc() != null
						&& results.getBaseUOMDesc() != "") {
					if (results.getBaseUOMDesc().equalsIgnoreCase("each")) {
						if (receiveParam.getRecqty() != null
								&& receiveParam.getRecqty() != "") {
							if (Double.parseDouble(receiveParam.getRecqty()) % 1 == 0) {
								results.setInputQty(receiveParam.getRecqty());
							} else {
								Integer qty = (int) Double
										.parseDouble(receiveParam.getRecqty());
								results.setInputQty(qty.toString());
								model.addAttribute("invalidQty", "true");
							}
						} else {
							results.setInputQty("0");
							model.addAttribute("invalidQty", "");
						}
					} else if (receiveParam.getRecqty() != null
							&& receiveParam.getRecqty() != "") {
						results.setInputQty(receiveParam.getRecqty());
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
				orde.setOperation("5");
				orde.setOrderQty(results.getInputQty());
				orde.setOrderUOM(results.getOrdUOM());
				/*
				 * if(orderDetail!=null && orderDetail.size()>0) {
				 * orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo()); }
				 */
				Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
				// //System.out.println("itemNo=" + itemNo);
				orde.setItemNo(itemNo.toString());
				orderDetailBackup.add(orde);
				// receiveParam.setArtEAN("");
				// receiveParam.setRecqty("");
				model.addAttribute("msg", "");

			}
		} else {
			model.addAttribute("msg", "Article '" + receiveParam.getArticleNo()
					+ "' not found. Please try a different article number.");
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	public void updateOrderDetails(String orderNo) {
		ArrayList<OrderDetail> orderDetailNew = new ArrayList<OrderDetail>();

		try {

			orderDetail = orderService.getOrderDetails(param, orderNo,userDetail);
			// model.remove("orderDetails");
			if (orderDetail != null) {
				orderDetailBackup = new ArrayList<OrderDetail>(
						orderDetail.size());
				for (OrderDetail copyOrderDetail : orderDetail) {
					orderDetailBackup
							.add((OrderDetail) copyOrderDetail.clone());
				}
			}
			// ////System.out.println(orderDetailNew.get(0).getSOH());

			model.addAttribute("orderDetails", orderDetail);

		} catch (Exception e) {
			// //System.out.println("Exception" + e +
			// "in order details method");

			model.addAttribute("orderDetails", orderDetail);

		}

		/*
		 * if (orderDetail != null && orderDetail.size() != 0) { orderDet =
		 * orderDetail.get(0); model.addAttribute("orderdet", orderDet);
		 * model.addAttribute("size", orderDetail.size());
		 * 
		 * }
		 */
		ArrayList<Order> tempList = null;
		String siteNo = param.getSiteNo();
		tempList = callOrderService(orderNo, siteNo);
		if (tempList != null) {
			String siteName = order.getRecvSiteName();
			// Order orderNew=new Order();
			order = tempList.get(0);
			order.setRecvSiteName(siteName);
			model.addAttribute("order", order);
			if (orderList != null && orderList.size() > 0) {
				for (int i = 0; i < orderList.size(); i++) {
					if (orderList.get(i).getOrderNo().equalsIgnoreCase(orderNo)) {
						orderList.remove(i);
						orderList.add(i, order);
					}
				}
				model.addAttribute("orderList", orderList);
			}
		}

	}

	// method called once preq update successful.
	@RequestMapping(value = "/requestPReqDetailRefresh.htm", method = RequestMethod.GET)
	public ModelAndView requestPReqDetailRefresh(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestOrderDetail");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		/*
		 * if (request.getParameter("index") != null &&
		 * request.getParameter("index").trim().length()>0) { if(orderList!=null
		 * && orderList.size()>0){ order = (Order)
		 * orderList.get(Integer.parseInt(request .getParameter("index"))); }
		 * 
		 * } else { if(orderList!=null && orderList.size()>0){ order = (Order)
		 * orderList.get(0); }
		 * 
		 * 
		 * 
		 * }
		 */

		ArrayList<Order> orderListNew = new ArrayList<Order>();
		orderDetail = new ArrayList<OrderDetail>();

		OrderParam param1 = new OrderParam();
		param1.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());
		order.setRecvSite(param1.getSiteNo());
		param1.setSearchByOptions("PReq");
		order.setRecvSiteName(((UserContext) request.getSession().getAttribute(
				"user")).getSiteName());
		param1.setOrderNo(order.getpReqNo());
		param1.setType("PR");
		try {
			orderListNew = orderService.getOrders(param1,userDetail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (orderListNew != null && orderListNew.size() > 0) {
			order = orderListNew.get(0);
		}
		String currentDate = "";
		String rosterDate = "";
		try {
			DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
			Date date = new Date();
			// //System.out.println(dateFormat.format(date));
			currentDate = PortalUtil.convertToSAPDateForOrder(dateFormat
					.format(date));
			if (order != null && order.getRosterDate() != null) {
				rosterDate = PortalUtil.convertToSAPDateForOrder(order
						.getRosterDate());
			}
			if (currentDate.equalsIgnoreCase(rosterDate)) {
				order.setRosterDateFlag("Y");
			}

		} catch (Exception e) {
			e.printStackTrace();
			order.setRosterDateFlag("N");
		}
		try {
			orderDetail = orderService.getOrderDetails(param1,
					order.getpReqNo(),userDetail);

		} catch (Exception e) {
			// //System.out.println("Exception" + e +
			// "in order details method");

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
		model.addAttribute("order", order);

		;
		if (orderDetail != null && orderDetail.size() > 0) {
			for (OrderDetail detail : orderDetail) {

				detail.setDateCreated(detail.getDateCreated() != null
						&& detail.getDateCreated().trim().length() > 0 ? PortalUtil
						.convertToSAPDateForPReqScreen(detail.getDateCreated())
						: "");
				detail.setDeliveryDate(detail.getDeliveryDate() != null
						&& detail.getDeliveryDate().trim().length() > 0 ? PortalUtil
						.convertToSAPDateForPReqScreen(detail.getDeliveryDate())
						: "");

			}
		}
		model.addAttribute("orderDetails", orderDetail);
		model.addAttribute("updateStatus", "true");

		ModelAndView modelAndView = new ModelAndView("pReqDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when add article to the open IBT
	@RequestMapping(value = "/addPoArticle.htm", method = RequestMethod.GET)
	public ModelAndView addPoArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("deleteArticle");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}

		ModelAndView modelAndView = new ModelAndView("orderDetails");
		receiveParam = new ReceiveParam();
		receiveParam.setArticleNo(request.getParameter("artEAN"));
		receiveParam.setRecqty(request.getParameter("recqty"));
		if (request.getParameter("articleType").equalsIgnoreCase(
				"ArticleNumber")) {
			receiveParam.setArticleType("articleNo");
		} else if (request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			receiveParam.setArticleType("ean");
		} else {
			receiveParam.setArticleType("articleNo");
		}
		receiveParam.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		if (order != null) {
			receiveParam.setSuppName("");
			receiveParam.setSrcOfSupply("");
		}

		model.addAttribute("receiveParam", receiveParam);

		if (orderDetailBackup != null && orderDetailBackup.size() != 0) {

			for (int i = 0; i < orderDetailBackup.size(); i++) {
				if (receiveParam.getArticleNo().equals(
						orderDetailBackup.get(i).getArticle())) {
					if (!orderDetailBackup.get(i).getOperation()
							.equalsIgnoreCase("D")) {
						model.addAttribute("invalidQty", "");
						model.addAttribute("focusIndex", i + 1);
						model.addAttribute("msg",
								"Article already exists in the list");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					} else {
						// /have to change based on service updat
						// orderDetailBackup.remove(i);
					}
				}

			}
		}

		// //System.out.println("receiveParam.getRadioBtn()="
		// + receiveParam.getRadioBtn());
		OrderDetail orde = new OrderDetail();
		try {

			articleSearchResults = orderService.searchArticle(receiveParam,userDetail);
			/*
			 * receiveParam.getArtEAN(), param.getSiteNo(),
			 * receiveParam.getRadioBtn());
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}
		// if(orderDetailBackup.get(i).getOperation().equalsIgnoreCase("D"))
		if (orderDetailBackup != null && orderDetailBackup.size() != 0) {
			for (int i = 0; i < orderDetailBackup.size(); i++) {
				if (articleSearchResults != null
						&& articleSearchResults.size() != 0) {
					if (orderDetailBackup.get(i).getArticle()
							.equals(articleSearchResults.get(0).getArticleNo())) {
						if (!orderDetailBackup.get(i).getOperation()
								.equalsIgnoreCase("D")) {
							model.addAttribute("invalidQty", "");
							model.addAttribute("focusIndex", i + 1);
							model.addAttribute("msg", "Article '"
									+ articleSearchResults.get(0)
											.getArticleNo()
									+ "' already exists in the list.");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						} else {

						}
					}
				}

			}
		}
		if (articleSearchResults != null && articleSearchResults.size() != 0) {

			// deleted flag check
			if (articleSearchResults.get(0).getDeleteInd()
					.equalsIgnoreCase("Y")) {
				model.addAttribute("msg", ""
						+ articleSearchResults.get(0).getDescription() + " ("
						+ articleSearchResults.get(0).getArticleNo()
						+ ") is deleted from your Store and cannot be ordered");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}
			// linked to vendor check
			/*
			 * if(articleSearchResults.get(0).getVendorNo()==null ||
			 * articleSearchResults.get(0).getVendorNo().trim().length()<=0){
			 * model.addAttribute("msg", "Article '" +
			 * receiveParam.getArticleNo()+"' is not linked to vendor " +
			 * receiveParam.getSuppName() ); modelAndView.addObject("model",
			 * model); modelAndView.addAllObjects(model); return modelAndView; }
			 */
		}

		if (articleSearchResults != null && articleSearchResults.size() != 0
				&& articleSearchResults.get(0).getArticleNo() != null
				&& articleSearchResults.get(0).getArticleNo() != "") {
			receiveParam.setSiteNo(order.getRecvSite());
			List<ArticleSearchResults> articleSearchResultsOnReceiving = new ArrayList<ArticleSearchResults>();
			try {
				articleSearchResultsOnReceiving = orderService
						.searchArticle(receiveParam,userDetail);
				receiveParam.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
			}

			catch (Exception e) {
				receiveParam.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
				model.addAttribute("articleList", articleSearchResults);
				model.addAttribute("size", "0");
				model.addAttribute("msg",
						"Article '" + receiveParam.getArticleNo()
								+ "' is not ranged to receiving site.");
				model.addAttribute("invalidQty", "");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}
			if (articleSearchResultsOnReceiving == null) {
				model.addAttribute("articleList", articleSearchResults);
				model.addAttribute("size", "0");
				model.addAttribute("msg",
						"Article '" + receiveParam.getArticleNo()
								+ "' is not ranged to receiving site.");
				model.addAttribute("invalidQty", "");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

			ArticleSearchResults results = articleSearchResults.get(0);
			if (results.getBaseUOMDesc() != null
					&& results.getBaseUOMDesc() != "") {
				if (results.getBaseUOMDesc().equalsIgnoreCase("each")) {
					if (receiveParam.getRecqty() != null
							&& receiveParam.getRecqty() != "") {
						if (Double.parseDouble(receiveParam.getRecqty()) % 1 == 0) {
							results.setInputQty(receiveParam.getRecqty());
						} else {
							Integer qty = (int) Double.parseDouble(receiveParam
									.getRecqty());
							results.setInputQty(qty.toString());
							model.addAttribute("invalidQty", "true");
						}
					} else {
						results.setInputQty("0");
						model.addAttribute("invalidQty", "");
					}
				} else if (receiveParam.getRecqty() != null
						&& receiveParam.getRecqty() != "") {
					results.setInputQty(receiveParam.getRecqty());
					model.addAttribute("invalidQty", "");
				}
			} else {
				model.addAttribute("invalidQty", "");
			}
			orde.setOrderNo(order.getOrderNo());
			orde.setArticle(results.getArticleNo());
			orde.setOrdUOM(results.getOrdUOM());
			orde.setOrdUOMDesc(results.getOrdUOMDesc());
			orde.setBaseUom(results.getBaseUom());
			orde.setBaseUOMDesc(results.getBaseUOMDesc());
			orde.setReceivedQty("0");
			orde.setArticleDesc(results.getDescription());
			orde.setOrderQty(results.getInputQty());
			orde.setDespatchQty("0");
			orde.setOM(results.getOM());
			orde.setOrderUOM(results.getOrdUOM());
			orde.setSaveFlag("N");
			orde.setSiteNo(order.getRecvSite());

			/*
			 * if(orderDetail!=null && orderDetail.size()>0) {
			 * orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo()); }
			 */
			// Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
			// ////System.out.println("itemNo=" + itemNo);
			// orde.setItemNo(itemNo.toString());
			int lineNo = 0;
			for (OrderDetail detail : orderDetailBackup) {

				if (detail.getItemNo() != null
						&& lineNo < Integer.parseInt(detail.getItemNo())) {

					lineNo = Integer.parseInt(detail.getItemNo());

				}

			}
			orde.setItemNo(String.valueOf(lineNo + 10));
			orde.setOperation("I");
			orderDetailBackup.add(orde);
			receiveParam.setArtEAN("");
			receiveParam.setRecqty("");
			model.addAttribute("msg", "");
		} else {
			model.addAttribute("msg", "Article '" + receiveParam.getArticleNo()
					+ "' not found. Please try a different article number.");
			// orderDetailBackup
		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when deleting article from the open IBT
	@RequestMapping(value = "/deletePoArticle.htm", method = RequestMethod.GET)
	public ModelAndView deletePoArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelAndView modelAndView = new ModelAndView("orderDetails");
		model.addAttribute("invalidQty", "");
		model.addAttribute("focusIndex", "");
		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		if (request.getParameter("index1") != null
				&& request.getParameter("index1").trim().length() > 0
				&& request.getParameter("articleIndex") != null
				&& request.getParameter("articleIndex").trim().length() > 0) {
			String articleNo = request.getParameter("articleIndex").trim();
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {

				for (int i = 0; i < orderDetailBackup.size(); i++) {
					if (orderDetailBackup.get(i).getArticle()
							.equalsIgnoreCase(articleNo))
						if (!(orderDetailBackup.get(i).getOperation() != null
								&& orderDetailBackup.get(i).getOperation() != "" && orderDetailBackup
								.get(i).getOperation().equalsIgnoreCase("I"))) {
							orderDetailBackup.get(i).setOperation("D");
						} else {
							orderDetailBackup.remove(i);
						}

				}
				/*
				 * OrderDetail detail = (OrderDetail)
				 * orderDetailBackup.get(Integer.parseInt(request
				 * .getParameter("index1"))-1);
				 * ////System.out.println(detail.getArticle());
				 * detail.setOperation("D");
				 */
			}

		}/*
		 * else{ if (orderDetailBackup != null && orderDetailBackup.size() > 0)
		 * {
		 * orderDetailBackup.remove((Integer.parseInt(request.getParameter("index1"
		 * ))-1)); // String msg="Deleted"; } }
		 */

		model.addAttribute("receiveParam", receiveParam);
		model.addAttribute("msg", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when add article to the open IBT when description search is
	// used
	@RequestMapping(value = "/addPoArticleDescriptionDetail.htm", method = RequestMethod.GET)
	public ModelAndView addPoArticleDescriptionDetail(
			HttpServletRequest request, HttpServletResponse response) {
		model.addAttribute("invalidQty", "");
		// //System.out.println("addArticleDescription");
		model.addAttribute("popupFlag", "");
		model.addAttribute("orderListForReceive", new ArrayList<Order>());
		String index = request.getParameter("desIndex");
		ModelAndView modelAndView = new ModelAndView("orderDetails");
		// //System.out.println("request.getParameter(\"recqty\")"+request.getParameter("recqty"));
		receiveParam = new ReceiveParam();
		receiveParam.setRecqty(request.getParameter("recqty"));
		StringBuffer notRanged = new StringBuffer();
		StringBuffer deleted = new StringBuffer();
		StringBuffer notLinked = new StringBuffer();
		boolean flag = true;
		// //System.out.println("index"+index);
		ArticleSearchResults article = null;
		String[] indexArray = index.split(":");
		for (int k = 0; k < indexArray.length; k++) {
			flag = true;
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));
				receiveParam.setArticleNo(article.getArticleNo());
				if (orderDetailBackup != null && orderDetailBackup.size() != 0) {
					for (int i = 0; i < orderDetailBackup.size(); i++) {
						if (article != null) {
							if (orderDetailBackup.get(i).getArticle()
									.equals(article.getArticleNo())) {
								if (!orderDetailBackup.get(i).getOperation()
										.equalsIgnoreCase("D")) {
									model.addAttribute("focusIndex", i + 1);
									model.addAttribute("msg", "Article '"
											+ article.getArticleNo()
											+ "' already exists in the list");
									modelAndView.addObject("model", model);
									modelAndView.addAllObjects(model);
									return modelAndView;
								} else {
									// orderDetailBackup.remove(i);
								}
							}
						}

					}
				}
				// deleted flag check
				if (article.getDeleteInd().equalsIgnoreCase("Y")) {
					flag = false;
					deleted.append(" " + article.getDescription() + " ("
							+ article.getArticleNo() + ")" + ",");
					/*
					 * model.addAttribute("msg", "" + article.getDescription() +
					 * " (" + article.getArticleNo() +
					 * ") is deleted from your Store and cannot be ordered");
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				// linked to vendor check
				if (article.getVendorNo() == null
						|| article.getVendorNo().trim().length() <= 0) {
					notLinked.append(" '" + article.getArticleNo() + "',");
					flag = false;
					/*
					 * model.addAttribute("msg",
					 * "Article '"+article.getArticleNo
					 * ()+"' is not linked to vendor " + orderDet.getSuppNo());
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				/*
				 * if (article != null ) { OrderParam orderParamForReceive=new
				 * OrderParam(); ////System.out.println(
				 * "articleSearchResults.get(0).getArticleNo()"
				 * +article.getArticleNo()); DateFormat dateFormat = new
				 * SimpleDateFormat("dd/MM/yyyy"); Date date = new Date();
				 * ////System.out.println(dateFormat.format(date)); String
				 * currentDate = dateFormat.format(date);
				 * orderParamForReceive.setArticleNo(article.getArticleNo());
				 * orderParamForReceive.setFromDate(currentDate);
				 * orderParamForReceive.setToDate(currentDate);
				 * //orderParamForReceive.setOrderType("ZNB");
				 * orderParamForReceive.setOrderStatus(Authorized);
				 * orderParamForReceive.setOrderType("");
				 * orderParamForReceive.setPageNo(1);
				 * orderParamForReceive.setSiteNo(((UserContext)
				 * request.getSession().getAttribute("user")).getSiteNo());
				 * orderListForReceive=new ArrayList<Order>();
				 * //////System.out.println("orderNO"+orderNo); //OrderParam
				 * vendorParam=new OrderParam();
				 * //vendorParam.setOrderNo(orderNo);
				 * ////vendorParam.setSearchByOptions("number");
				 * //vendorParam.setSiteNo(siteNo);
				 * //vendorParam.setSearchByOptions("number"); try{
				 * orderListForReceive =
				 * orderService.getOrders(orderParamForReceive);
				 * if(orderListForReceive!=null &&
				 * orderListForReceive.size()>0){ for(int
				 * i=0;i<orderListForReceive.size();i++){
				 * if(orderListForReceive.
				 * get(i).getOrderNo().equalsIgnoreCase(order.getOrderNo())) {
				 * orderListForReceive.remove(i); break; } }
				 * if(orderListForReceive!=null &&
				 * orderListForReceive.size()>0){
				 * articleSearchResultsForReceive=new
				 * ArrayList<ArticleSearchResults>();
				 * articleSearchResultsForReceive.add(article);
				 * model.addAttribute("msg", "");
				 * 
				 * model.addAttribute("popupFlag","true");
				 * model.addAttribute("orderListForReceive",
				 * orderListForReceive); modelAndView.addObject("model", model);
				 * modelAndView.addAllObjects(model); return modelAndView; } } }
				 * catch(Exception e){ e.printStackTrace();
				 * model.addAttribute("msg", "");
				 * model.addAttribute("popupFlag", "");
				 * model.addAttribute("orderListForReceive", new
				 * ArrayList<Order>());
				 * 
				 * }
				 * 
				 * }
				 */
				receiveParam.setSiteNo(order.getRecvSite());
				receiveParam.setArticleType("articleNo");
				List<ArticleSearchResults> articleSearchResultsOnReceiving = new ArrayList<ArticleSearchResults>();
				try {
					articleSearchResultsOnReceiving = orderService
							.searchArticle(receiveParam,userDetail);
					receiveParam.setSiteNo(((UserContext) request.getSession()
							.getAttribute("user")).getSiteNo());
				} catch (Exception e) {
					flag = false;
					notRanged.append(" '" + article.getArticleNo() + "',");
					/*
					 * receiveParam.setSiteNo(((UserContext)
					 * request.getSession().getAttribute("user")).getSiteNo());
					 * e.printStackTrace(); model.addAttribute("articleList",
					 * articleSearchResults); model.addAttribute("size", "0");
					 * model.addAttribute("msg","Article '" +
					 * receiveParam.getArticleNo() +
					 * "' is not ranged to receiving site.");
					 * model.addAttribute("invalidQty", "");
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}

				if (articleSearchResultsOnReceiving == null) {
					flag = false;
					notRanged.append(" '" + article.getArticleNo() + "',");
					/*
					 * model.addAttribute("articleList", articleSearchResults);
					 * model.addAttribute("size", "0");
					 * model.addAttribute("msg","Article '" +
					 * receiveParam.getArticleNo() +
					 * "' is not ranged to receiving site.");
					 * model.addAttribute("invalidQty", "");
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				if (article.getBaseUOMDesc() != null
						&& article.getBaseUOMDesc() != "") {
					if (article.getBaseUOMDesc().equalsIgnoreCase("each")) {
						if (receiveParam.getRecqty() != null
								&& receiveParam.getRecqty() != "") {
							if (Double.parseDouble(receiveParam.getRecqty()) % 1 == 0) {
								article.setInputQty(receiveParam.getRecqty());
							} else {
								Integer qty = (int) Double
										.parseDouble(receiveParam.getRecqty());
								article.setInputQty(qty.toString());
								model.addAttribute("invalidQty", "true");
							}
						} else {
							article.setInputQty("0");
							model.addAttribute("invalidQty", "");
						}
					} else if (receiveParam.getRecqty() != null
							&& receiveParam.getRecqty() != "") {
						article.setInputQty(receiveParam.getRecqty());
						model.addAttribute("invalidQty", "");
					}
				} else {
					model.addAttribute("invalidQty", "");
				}
				OrderDetail orde = new OrderDetail();
				if (article != null) {
					orde.setOrderNo(order.getOrderNo());
					orde.setArticle(article.getArticleNo());
					orde.setOrderQty(article.getInputQty());
					orde.setArticleDesc(article.getDescription());
					// orde.setOrderQty("0");
					orde.setReceivedQty("0");
					orde.setDespatchQty("0");
					orde.setOM(article.getOM());
					orde.setOperation("I");
					orde.setOrderQty(article.getInputQty());
					orde.setOrderUOM(article.getOrdUOM());
					orde.setOrdUOM(article.getOrdUOM());
					orde.setOrdUOMDesc(article.getOrdUOMDesc());
					orde.setBaseUom(article.getBaseUom());
					orde.setBaseUOMDesc(article.getBaseUOMDesc());
					orde.setSiteNo(order.getRecvSite());
					/*
					 * if(orderDetail!=null && orderDetail.size()>0) {
					 * orde.setVendorRefNo(orderDetail.get(0).getVendorRefNo());
					 * }
					 */
					// Integer itemNo = ((orderDetailBackup.size() + 1) * 10);
					// ////System.out.println("itemNo=" + itemNo);
					int lineNo = 0;
					for (OrderDetail detail : orderDetailBackup) {

						if (detail.getItemNo() != null
								&& lineNo < Integer
										.parseInt(detail.getItemNo())) {

							lineNo = Integer.parseInt(detail.getItemNo());

						}

					}
					orde.setItemNo(String.valueOf(lineNo + 10));
					orde.setSaveFlag("N");
					// orde.setItemNo(itemNo.toString());
					if (flag)
						orderDetailBackup.add(orde);
					// receiveParam.setArtEAN("");
					// receiveParam.setRecqty("");
					// model.addAttribute("msg", "");
				}

			}
		}
		if (notLinked != null && notLinked.toString().trim() != ""
				&& notLinked.toString().trim().length() > 0) {
			if (deleted != null && deleted.toString().trim() != ""
					&& deleted.toString().trim().length() > 0) {
				model.addAttribute("msg", "" + deleted.toString()
						+ "is deleted from your Store and cannot be ordered");
			} else if (notRanged != null && notRanged.toString().trim() != ""
					&& notRanged.toString().trim().length() > 0) {

				model.addAttribute(

				"msg", "Article \"" + notRanged.toString()
						+ "\" is/are not ranged to receiving site.");

			} else {
				model.addAttribute("msg", "Article '" + notLinked.toString()
						+ "' is not linked to vendor " + orderDet.getSuppNo());

			}
		}
		model.addAttribute("articleList", articleSearchResultsforCreate);
		model.addAttribute("manualOrderParam", manualOrderParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when description search happened in order detail screen.
	@RequestMapping(value = "/getPoDescription.htm", method = RequestMethod.GET)
	public ModelAndView getPoDescription(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("");
		// //System.out.println("getDescription" );
		String vendordesc = (String) request.getParameter("vendorDesc");
		String sourceSupply = (String) request.getParameter("sourceSupply");
		// //System.out.println("sourceSupply"+sourceSupply);
		String suppName = (String) request.getParameter("suppName");
		// //System.out.println("suppName"+suppName);
		String warehouse = (String) request.getParameter("warehouse");
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
		orderParam.setSrcOfSupply("");
		orderParam.setSuppName("");
		orderParam.setWarehouseDropdown("");
		orderParam.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());

		try {
			articleDescriptionResults = (ArrayList<ArticleSearchResults>) orderService
					.getManualOrders(orderParam,userDetail);

			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				/*
				 * for(int i=0;i<articleDescriptionResults.size();i++){
				 * if(articleDescriptionResults.get(i).getVendorNo()==null ||
				 * articleDescriptionResults
				 * .get(i).getVendorNo().trim().length()<=0){
				 * articleDescriptionResults.remove(i); } }
				 */
				modelAndView = new ModelAndView("descriptionLookup");
				model.addAttribute("nodata", "N");
				model.addAttribute("vendordesc", vendordesc);
				model.addAttribute("size", articleDescriptionResults.size());
				model.addAttribute("divideSubmit", "Y");
				model.addAttribute("receiveCall", "M");
				model.addAttribute("receiveCall1", "P");
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
				model.addAttribute("receiveCall1", "P");
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

	// method called when save article detail while updating open IBT (Save icon
	// click on orderdetail screen)
	@RequestMapping(value = "/savePoReceiveQty.htm", method = RequestMethod.GET)
	@ResponseBody
	public String savePoReceiveQty(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside Receive Save");
		String index = request.getParameter("index");
		String receiveQty = request.getParameter("recQty");
		String packOm = request.getParameter("packOm");
		String uomFlag = request.getParameter("uom");
		String articleIndex = request.getParameter("articleIndex");
		// //System.out.println("request.getParameter(\"index\")"+request.getParameter("index"));
		// //System.out.println("request.getParameter(\"receiveQty\")"+request.getParameter("recQty"));
		// //System.out.println("request.getParameter(\"uom\")"+request.getParameter("uom"));

		/*
		 * if(order.getOrderType().equalsIgnoreCase("ZUB")) { if
		 * (orderDetailBackup != null && orderDetailBackup.size() > 0) {
		 * if(receiveQty!=null && receiveQty!="")
		 * orderDetailBackup.get(Integer.parseInt
		 * (index)-1).setReceivedQty(receiveQty); }
		 * 
		 * } else{
		 */
		if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
			if (receiveQty != null && receiveQty != "" && articleIndex != null
					&& articleIndex != "") {
				// //System.out.println(orderDetailBackup.get(Integer.parseInt(index)-1).getArticle());
				for (int i = 0; i < orderDetailBackup.size(); i++) {
					if (orderDetailBackup.get(i).getArticle()
							.equalsIgnoreCase(articleIndex)) {
						if (!orderDetailBackup.get(i).getOperation()
								.equalsIgnoreCase("D")) {
							orderDetailBackup.get(i).setOrderQty(receiveQty);
							orderDetailBackup.get(i).setSaveFlag("Y");
							/*
							 * if(!orderDetailBackup.get(i).getOperation().
							 * equalsIgnoreCase("I")){
							 * orderDetailBackup.get(i).setOperation("U"); }
							 */
							orderDetailBackup
									.get(i)
									.setOrderUOM(
											uomFlag.substring(
													uomFlag.length() - 1)
													.equalsIgnoreCase("1") ? orderDetailBackup
													.get(i).getOrdUOM()
													: orderDetailBackup.get(i)
															.getBaseUom());
							if (orderDetailBackup
									.get(i)
									.getOrderUOM()
									.equalsIgnoreCase(
											orderDetailBackup.get(i)
													.getBaseUom())) {
								orderDetailBackup.get(i).setUOMFlag(
										orderDetailBackup.get(i)
												.getBaseUOMDesc());
								orderDetailBackup.get(i).setSaveUOMFlag("2");
							} else {
								orderDetailBackup.get(i).setUOMFlag(
										orderDetailBackup.get(i)
												.getOrdUOMDesc());
								orderDetailBackup.get(i).setSaveUOMFlag("1");
							}
						}
					}

				}
			}
			// String msg="Deleted";
		}
		// }
		return "true";
	}

	// method called update ibt button clicked on order detail screen
	@RequestMapping(value = "/updatePurchaseOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updatePurchaseOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside updatePurchasePo");
		model.addAttribute("msg", "");
		String createStatus = null;
		// String purReqNo=(String) request.getParameter("prNo");

		try {
			ReceiveParam receiveParamForUpdate = new ReceiveParam();
			receiveParamForUpdate.setOrderNo(order.getOrderNo());

			String siteNo = ((UserContext) request.getSession().getAttribute(
					"user")).getSiteNo();

			receiveParamForUpdate.setSiteNo(siteNo);
			// boolean status=orderDetailBackup.removeAll(orderDetail);
			if (orderDetailBackup != null && orderDetailBackup.size() > 0) {
				for (int i = 0; i < orderDetailBackup.size(); i++) {
					orderDetailBackup.get(i).setDeliveryDate(
							order.getDeliveryDate());
					orderDetailBackup.get(i).setSiteNo(order.getRecvSite());
				}
			}
			createStatus = orderService.UpdatePo(orderDetailBackup,
					receiveParamForUpdate,userDetail);

		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:Purchase Order update failed because of service unavailability.";
		}
		if (createStatus == null) {
			// updatePoOrderDetails(order.getOrderNo());
			/*
			 * if(orderDetailBackup!=null && orderDetailBackup.size()>0){
			 * for(int i=0;i<orderDetailBackup.size();i++) {
			 * if(orderDetailBackup.get(i).getOperation().equalsIgnoreCase("I"))
			 * orderDetailBackup.get(i).setOperation(""); } }
			 */
			// articleSearchResultsforCreate=new
			// ArrayList<ArticleSearchResults>();
			return "true^";

		}
		return "false^Purchase Requisition update failed due to SAP error - "
				+ createStatus;

	}

	@RequestMapping(value = "/updatePoOrderDetails.htm", method = RequestMethod.GET)
	public ModelAndView updatePoOrderDetails(HttpServletRequest request,
			HttpServletResponse response) {
		ArrayList<OrderDetail> orderDetailNew = new ArrayList<OrderDetail>();
		String orderNo = order.getOrderNo();
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		try {
			OrderParam orderParam = new OrderParam();

			orderParam.setSiteNo(siteNo);
			orderDetail = orderService.getOrderDetails(param, orderNo,userDetail);
			// model.remove("orderDetails");
			if (orderDetail != null) {
				orderDetailBackup = new ArrayList<OrderDetail>(
						orderDetail.size());
				for (OrderDetail copyOrderDetail : orderDetail) {
					// copyOrderDetail.setOrdUOM(copyOrderDetail.getOrderUOM());
					// copyOrderDetail.setBaseUom(copyOrderDetail.getOrderUOM());
					copyOrderDetail.setSaveFlag("Y");
					copyOrderDetail.setEditFlag("Y");
					if (copyOrderDetail.getOrderUOM().equalsIgnoreCase(
							copyOrderDetail.getBaseUom())) {
						copyOrderDetail.setUOMFlag(copyOrderDetail
								.getBaseUOMDesc());
						copyOrderDetail.setSaveUOMFlag("2");

					} else {
						copyOrderDetail.setUOMFlag(copyOrderDetail
								.getOrdUOMDesc());
						copyOrderDetail.setSaveUOMFlag("1");
					}
					orderDetailBackup
							.add((OrderDetail) copyOrderDetail.clone());
				}
			}
			// ////System.out.println(orderDetailNew.get(0).getSOH());

			model.addAttribute("orderDetails", orderDetailBackup);
			model.addAttribute("invalidQty", "");

		} catch (Exception e) {
			// //System.out.println("Exception" + e +
			// "in order details method");

			model.addAttribute("orderDetails", orderDetailBackup);

		}

		/*
		 * if (orderDetail != null && orderDetail.size() != 0) { orderDet =
		 * orderDetail.get(0); model.addAttribute("orderdet", orderDet);
		 * model.addAttribute("size", orderDetail.size());
		 * 
		 * }
		 */
		ArrayList<Order> tempList = null;

		tempList = callOrderService(orderNo, siteNo);
		if (tempList != null) {
			String siteName = order.getRecvSiteName();
			// Order orderNew=new Order();
			order = tempList.get(0);
			order.setRecvSiteName(siteName);
			model.addAttribute("order", order);
			if (orderList != null && orderList.size() > 0) {
				for (int i = 0; i < orderList.size(); i++) {
					if (orderList.get(i).getOrderNo().equalsIgnoreCase(orderNo)) {
						orderList.remove(i);
						orderList.add(i, order);
					}
				}
				model.addAttribute("orderList", orderList);
			}
		}
		// //System.out.println(" ibt send later article update");
		// temperature check
		String temperature = "";
		String department = "";

		temperature = serviceImpl.getTemperatureForTempCheck(orderDetailBackup);
		department = serviceImpl.getDepartmentForTempCheck(orderDetailBackup,
				((UserContext) request.getSession().getAttribute("user"))
						.getSalesOrg().toString());
		model.addAttribute("tempFromServiceIbtCreate", temperature);
		model.addAttribute("deptFromServiceIbtCreate", department);
		// //System.out.println("calculated temperature"+temperature);
		// //System.out.println("calculated rank"+department);

		model.addAttribute("orderDetails", orderDetailBackup);
		model.addAttribute("order", order);

		ModelAndView modelAndView = new ModelAndView("orderDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

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

		try {

			SalesHistoryList = (ArrayList<SalesHistory>) orderService
					.getSalesHistoryList(articleNo, siteNo,userDetail);

			if (SalesHistoryList != null && SalesHistoryList.size() > 0) {
				/*
				 * for (int i=0;i<SalesHistoryList.size();i++) {
				 * //System.out.println
				 * (SalesHistoryList.get(i).getTotaledProperties().trim());
				 * //System.out.println("size"+SalesHistoryList.size());
				 * if(SalesHistoryList
				 * .get(i).getTotaledProperties().trim().length()!=0)
				 * SalesHistoryList.remove(i);
				 * //System.out.println("size"+SalesHistoryList.size()); }
				 */
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

	@RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		/* Map<String, String> options = optionDAO.find(selectedValue); */

		List<Department> categoryInfoList = new ArrayList<Department>();

		String prod_no = request.getParameter("iv_parent_node");
		categoryInfoList = (ArrayList<Department>) articleService
				.getDeptDetail(prod_no, ((UserContext) request.getSession()
						.getAttribute("user")).getSalesOrg(),userDetail);

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

		try {
			String prod_no = request.getParameter("iv_parent_node");
			subCategoryInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),userDetail);
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

		try {
			String prod_no = request.getParameter("iv_parent_node");
			segmentInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),userDetail);

			if (segmentInfoList == null) {
				segmentInfoList = new ArrayList<Department>();
			}
			// system.out
			// .println("segment name not null" + segmentInfoList.size());
		} catch (Exception e) {
		}

		Map<String, List<Department>> segmentDetails = new HashMap<String, List<Department>>();
		segmentDetails.put("segmentInfoList", segmentInfoList);
		String json = new Gson().toJson(segmentDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);

	}

	@SuppressWarnings("unused")
	@RequestMapping(value = "/getPreferenceDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPreferenceDetails(
			@ModelAttribute("orderLookup") OrderParam param,
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String userId = userDetail.getUserId();
		List<OrderPreferenceMaster> orderPreferenceMasterList = new ArrayList<OrderPreferenceMaster>();
		;
		List<OrderPreferenceUsr> orderPreferenceUsrList = new ArrayList<OrderPreferenceUsr>();
		HttpSession session = null;
		String msg = "", masterList = null, userList = null;
		try {

			OrderPreferenceDAOImpl.getOrderPreferenceDetails(userId,
					orderPreferenceMasterList, orderPreferenceUsrList);

			masterList = convertListTojson(orderPreferenceMasterList, null,
					true);
			userList = convertListTojson(null, orderPreferenceUsrList, false);

			session = request.getSession(false);
			session.setAttribute("userList", "{\"userList\":" + userList + "}");
			if (orderPreferenceMasterList != null
					&& orderPreferenceMasterList.size() > 0) {
				session.setAttribute("masterList", "{\"masterList\":"
						+ masterList + "}");
			} else {
				msg = NDF;
			}
		} catch (Exception e) {
		}

		return "{\"masterList\":" + masterList + ",\"msg\":\"" + msg
				+ "\",\"userList\":" + userList + "}";
	}

	@RequestMapping(value = "/updatePreferenceDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String updatePreferenceDetails(
			@ModelAttribute("orderLookup") OrderParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String userId = userDetail.getUserId();
		String status = "";
		// String changedVal="";
		if (param.getUnselectedVal() != null) {
			try {
				status = OrderPreferenceDAOImpl.updateOrderPreferenceDetails(
						userId, param.getUnselectedVal());
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			if (status.equals("true")) {
				status = UPDATED;
				getPreferenceDetails(param, request, response);
			}

		}

		return status;
	}

	private String convertListTojson(
			List<OrderPreferenceMaster> orderPreferenceMasterList,
			List<OrderPreferenceUsr> orderPreferenceUsrList, boolean flag) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw); if
		 * (flag) mapper.writeValue(jsonGenerator, orderPreferenceMasterList);
		 * else mapper.writeValue(jsonGenerator, orderPreferenceUsrList); }
		 * catch (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * e.printStackTrace(); } catch (IOException e) {
		 * 
		 * e.printStackTrace(); }
		 */

		// System.out.println("stw.toString()" + stw.toString());

		if (flag)
			return Constants.convertToJsonString(orderPreferenceMasterList);
		else
			return Constants.convertToJsonString(orderPreferenceUsrList);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/createOrFinaliseOrder.htm", consumes = "application/json")
	@ResponseBody
	public String createOrFinaliseOrder(@RequestBody ReturnHdrInfoParam param)
			throws IllegalArgumentException, IllegalAccessException {

		System.out.println("createOrFinaliseOrder controller method start ");
		ArrayList<OrderHdrInfoParam> orderHdrInfoParamList = null;
		Long startTime, endTime;
		OrderHdrInfoParam response = null;

		if (param.getSite_no() == null || param.getSite_no().equals("")
				|| param.getUser_id() == null || param.getUser_id().equals("")
				|| param.getPwd() == null || param.getPwd().equals("")
				|| param.getArticle_list_info() == null
				|| param.getArticle_list_info().size() == 0) {
			System.out.println(Constants.MANDATORY);
			response = new OrderHdrInfoParam("", "", "",
					Constants.MANDATOR_SCS, Constants.ERROR_MSG,
					new ArrayList<OrderItemInfo>());
			orderHdrInfoParamList = new ArrayList<OrderHdrInfoParam>();
			orderHdrInfoParamList.add(response);
			return CommonUtils.convertObjectTojson(orderHdrInfoParamList);
		}

		// for validating the user
		/*
		 * String sapPwd = LoginServiceImpl.checkValidUser(param.getUser_id(),
		 * param.getPwd()); if (sapPwd.equals("")) {
		 * System.out.println(Constants.INVALID_SAP_USER); response = new
		 * OrderHdrInfoParam("", "", "", Constants.INVALID_SAP_USER,
		 * Constants.ERROR_MSG, new ArrayList<OrderItemInfo>());
		 * orderHdrInfoParamList = new ArrayList<OrderHdrInfoParam>();
		 * orderHdrInfoParamList.add(response); return "{\"result\":" +
		 * CommonUtils.convertObjectTojson(orderHdrInfoParamList) + "}"; }
		 * param.setPwd(Constants.encriptPwd(param.getPwd()));
		 */
		startTime = System.currentTimeMillis();
		System.out
				.println("createOrFinaliseOrder service request start time --- "
						+ startTime);

		param.setPwd(Constants.encriptPwd(param.getPwd()));
		try {
			orderHdrInfoParamList = new ArrayList<OrderHdrInfoParam>();
			//orderService.createReturnOrder(param);
			orderHdrInfoParamList.add(new OrderHdrInfoParam("", "", "", param
					.getMsg(), param.getTyp(), (ArrayList<OrderItemInfo>) param
					.getArticle_list_info()));
		} catch (Exception e) {
			e.printStackTrace();
			System.out.println(Constants.EXCEPTION);
			response = new OrderHdrInfoParam("", "", "", Constants.EXCEPTION,
					Constants.ERROR_MSG, new ArrayList<OrderItemInfo>());
			orderHdrInfoParamList = new ArrayList<OrderHdrInfoParam>();
			orderHdrInfoParamList.add(response);
		}

		endTime = System.currentTimeMillis();

		System.out
				.println("createOrFinaliseOrder service request end time --- "
						+ endTime);

		System.out.println("createOrFinaliseOrder controller method end ");

		return CommonUtils.convertObjectTojson(orderHdrInfoParamList);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/getReturnOrderlookup.htm", consumes = "application/json")
	@ResponseBody
	public String getReturnOrderlookup(@RequestBody ReturnOrderInfoParam param) {

		System.out.println("getReturnOrderlookup method start ");

		Long startTime, endTime;
		List<ReturnOrderLookup> returnOrderLookupList = null;
		ReturnOrderLookup returnOrderLookup = null;
		if (param.getIv_site() == null || param.getIv_site().equals("")
				|| param.getUser_id() == null || param.getUser_id().equals("")
				|| param.getPwd() == null || param.getPwd().equals("")) {
			System.out.println(Constants.MANDATOR_SCS);
			returnOrderLookup = new ReturnOrderLookup();
			returnOrderLookup.setMsg(Constants.MANDATOR_SCS);
			returnOrderLookupList = new ArrayList<ReturnOrderLookup>();
			returnOrderLookupList.add(returnOrderLookup);
			return CommonUtils.convertObjectTojson(returnOrderLookupList);
		}

		// for validating the user
		/*
		 * String sapPwd = LoginServiceImpl.checkValidUser(param.getUser_id(),
		 * param.getPwd()); if (sapPwd.equals("")) {
		 * System.out.println(Constants.INVALID_SAP_USER); returnOrderLookup =
		 * new ReturnOrderLookup();
		 * returnOrderLookup.setMsg(Constants.INVALID_SAP_USER);
		 * returnOrderLookupList = new ArrayList<ReturnOrderLookup>();
		 * returnOrderLookupList.add(returnOrderLookup); return
		 * "{\"d:\": {\"results\":" +
		 * Constants.convertToJSON(returnOrderLookupList) + "}}"; }
		 */
		param.setPwd(Constants.encriptPwd(param.getPwd()));
		startTime = System.currentTimeMillis();

		System.out
				.println("getReturnOrderlookup service request start time --- "
						+ startTime);
		try {
			returnOrderLookupList = returnOrderSearchService
					.getReturnOrderLookup(param,userDetail);
			if (returnOrderLookupList == null) {
				returnOrderLookup = new ReturnOrderLookup();
				if (param.getMsg() != null && !param.getMsg().trim().equals("")) {
					returnOrderLookup.setMsg(Constants.EXCEPTION);
				} else {
					returnOrderLookup.setMsg(param.getMsg());
				}
				returnOrderLookupList = new ArrayList<ReturnOrderLookup>();
				returnOrderLookupList.add(returnOrderLookup);
			}

		} catch (Exception e) {
			System.out.println(Constants.EXCEPTION);
			returnOrderLookup = new ReturnOrderLookup();
			returnOrderLookup.setMsg(Constants.EXCEPTION);
			returnOrderLookupList = new ArrayList<ReturnOrderLookup>();
			returnOrderLookupList.add(returnOrderLookup);
			e.printStackTrace();
			return CommonUtils.convertObjectTojson(returnOrderLookupList);
		}

		endTime = System.currentTimeMillis();

		System.out.println("getReturnOrderlookup end time --- " + endTime);

		System.out.println("getReturnOrderlookup  method end ");

		return CommonUtils.convertObjectTojson(returnOrderLookupList);

	}

	@RequestMapping(method = RequestMethod.POST, value = "/getReturnOrderDtl.htm", consumes = "application/json")
	@ResponseBody
	public String getReturnOrderDtl(@RequestBody ReturnOrderInfoParam param) {

		System.out.println("getReturnOrderDtl method start ");

		Long startTime, endTime;
		List<ReturnOrderDtl> returnOrderLookupList = null;
		ReturnOrderDtl returnOrderLookup = null;
		if (param.getIv_site() == null || param.getIv_site().equals("")
				|| param.getUser_id() == null || param.getUser_id().equals("")
				|| param.getPwd() == null || param.getPwd().equals("")) {
			System.out.println(Constants.MANDATOR_SCS);
			returnOrderLookup = new ReturnOrderDtl();
			returnOrderLookup.setMsg(Constants.MANDATOR_SCS);
			returnOrderLookupList = new ArrayList<ReturnOrderDtl>();
			returnOrderLookupList.add(returnOrderLookup);
			return CommonUtils.convertObjectTojson(returnOrderLookupList);
		}

		// for validating the user
		// String sapPwd = LoginServiceImpl.checkValidUser(param.getUser_id(),
		// param.getPwd());
		// if (sapPwd.equals("")) {
		// System.out.println(Constants.INVALID_SAP_USER);
		// returnOrderLookup = new ReturnOrderDtl();
		// returnOrderLookup.setMsg(Constants.INVALID_SAP_USER);
		// returnOrderLookupList = new ArrayList<ReturnOrderDtl>();
		// returnOrderLookupList.add(returnOrderLookup);
		// return "{\"d:\": {\"results\":"
		// + Constants.convertToJSON(returnOrderLookupList) + "}}";
		// }
		param.setPwd(Constants.encriptPwd(param.getPwd()));
		startTime = System.currentTimeMillis();

		System.out.println("getReturnOrderDtl service request start time --- "
				+ startTime);
		try {
			returnOrderLookupList = returnOrderSearchService
					.getReturnOrderDtl(param,userDetail);
			if (returnOrderLookupList == null) {
				returnOrderLookup = new ReturnOrderDtl();
				if (param.getMsg() != null && !param.getMsg().trim().equals("")) {
					returnOrderLookup.setMsg(Constants.EXCEPTION);
				} else {
					returnOrderLookup.setMsg(param.getMsg());
				}
				returnOrderLookupList = new ArrayList<ReturnOrderDtl>();
				returnOrderLookupList.add(returnOrderLookup);
			}

		} catch (Exception e) {
			System.out.println(Constants.EXCEPTION);
			returnOrderLookup = new ReturnOrderDtl();
			returnOrderLookup.setMsg(Constants.EXCEPTION);
			returnOrderLookupList = new ArrayList<ReturnOrderDtl>();
			returnOrderLookupList.add(returnOrderLookup);
			return CommonUtils.convertObjectTojson(returnOrderLookupList);
		}

		endTime = System.currentTimeMillis();

		System.out.println("getReturnOrderDtl end time --- " + endTime);

		System.out.println("getReturnOrderDtl  method end ");

		return CommonUtils.convertObjectTojson(returnOrderLookupList);

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
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());
		param.setSubmitBy(request.getParameter("userId"));
		param.setMsg(userDetail.getUserId());
		String msg = "";

		try {
			userSiteDtlMap = UserMgtDAOImpl.verifyUser(param);
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
			Map<String, ArrayList<UserSiteDtl>> userSiteDtlMap, String msg) {

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

		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}
}
