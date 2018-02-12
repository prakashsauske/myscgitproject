/**controller used for create IBT orders*/
package au.com.woolworths.portal.controller;

import java.text.DateFormat;
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
import au.com.woolworths.portal.model.OrderDetail;
import au.com.woolworths.portal.model.SalesHistory;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoresNearByModel;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.CancelOrderParam;
import au.com.woolworths.portal.param.IBTDetailsParam;
import au.com.woolworths.portal.param.IBTOrderParam;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.param.OrderParam;
import au.com.woolworths.portal.param.ReceiveParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/ibtOrder")
@Scope("session")
public class IBTOrderController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['InterBranchTranfer']}") applicationSettings CR
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private ArticleServiceImpl articleService;

	private ModelMap model;

	private IBTOrderParam param;

	private IBTDetailsParam ibtDetailsParam;

	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	public OrderServiceImpl getOrderService() {
		return orderService;
	}

	public void setOrderService(OrderServiceImpl orderService) {
		this.orderService = orderService;
	}

	List<ArticleSearchResults> postArticleSearchResults = new ArrayList<ArticleSearchResults>();

	ArrayList<ArticleSearchResults> updatedArticleResults = new ArrayList<ArticleSearchResults>();

	List<ArticleSearchResults> articleSearchResultsFetched = null;

	List<ArticleSearchResults> articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();

	List<ArticleSearchResults> addArtSearchResults = new ArrayList<ArticleSearchResults>();

	private boolean postSuccessFlag = false;
	private boolean existingInd = false;
	private List<ArticleSearchResults> articleDescriptionResults;
	ReceiveParam receiveParam;

	// method called on clicking Create ibt on header link
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
		
		param = new IBTOrderParam();
		model = new ModelMap();
		param.setArticleNo("");

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();
		addArtSearchResults = new ArrayList<ArticleSearchResults>();
		List<SupplierModel> whInfoList = new ArrayList<SupplierModel>();
		setSalesOrg();
		try {
			whInfoList = (ArrayList<SupplierModel>) orderService
					.getSupplierLists(param.getSiteNo(),user);

			model.addAttribute("param", param);
			model.addAttribute("whList", whInfoList);

		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noResults", "");
			model.addAttribute("size", "0");
			model.addAttribute("whList", new ArrayList<Department>());
		}

		model.addAttribute("param", param);
		model.addAttribute("articleSearchResults",
				new ArrayList<ArticleSearchResults>());
		model.addAttribute("multiArtRes", new ArrayList<ArticleSearchResults>());
		model.addAttribute("errorMsg", "");
		ModelAndView modelAndView = new ModelAndView("ibtSite");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/******************** SET SALES ORG VALUES ******************/
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

	/********************* ARTICLE SEARCH **********************/

	@RequestMapping(value = "/addArticle.htm", method = RequestMethod.POST)
	public ModelAndView articleSearch(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("entered articleSearch");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		param.setArticleNo(request.getParameter("articleNo"));
		param.setStoreNo(request.getParameter("storeNo"));
		param.setStoreName(request.getParameter("storeName"));
		param.setWarehouse(request.getParameter("warehouse"));

		param.setIbtNo("New");
		DateFormat dateFormat = new SimpleDateFormat("EEE dd/MM/yyyy");
		Date date = new Date();
		param.setOrderDate(dateFormat.format(date));
		param.setIbtStatus("Open");

		/*
		 * if
		 * (request.getParameter("ibtSiteType").equalsIgnoreCase("wareHouse")) {
		 * param.setSupplier(request.getParameter("warehouse")); } else if
		 * (request.getParameter("ibtSiteType") .equalsIgnoreCase("Store")) {
		 * param.setSupplier(request.getParameter("storeNo")); }
		 */
		if (request.getParameter("articleType").equalsIgnoreCase(
				"ArticleNumber")) {
			param.setArticleType("articleNo");
		} else if (request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			param.setArticleType("ean");
		} else {
			param.setArticleType("desc");
		}

		if (postSuccessFlag == true) {
			// //System.out.println(" inside succes check");
			articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();
			updatedArticleResults = new ArrayList<ArticleSearchResults>();
			addArtSearchResults = new ArrayList<ArticleSearchResults>();
			postSuccessFlag = false;
		}

		// //System.out.println("art no" + request.getParameter("articleNo"));

		model.addAttribute("articleSearchResults",
				new ArrayList<ArticleSearchResults>());

		String articleNo = request.getParameter("articleNo");

		model.addAttribute("param", param);
		model.addAttribute("errorMsg", "");
		if (request.getParameter("buttonVal").equalsIgnoreCase("addArticle")) {
			// //System.out.println("inside search");
			try {
				addArtSearchResults = new ArrayList<ArticleSearchResults>();
				model.addAttribute("multiArtRes",
						new ArrayList<ArticleSearchResults>());
				// SEARCH ARTICLE
				model.addAttribute("errorMsg", "");

				if (postSuccessFlag == true) {
					// //System.out.println(" inside succes check");
					articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();
					updatedArticleResults = new ArrayList<ArticleSearchResults>();
					addArtSearchResults = new ArrayList<ArticleSearchResults>();
					postSuccessFlag = false;
				}
				articleSearchResultsFetched = new ArrayList<ArticleSearchResults>();

				if (articleSearchResultsforIBT != null
						&& articleSearchResultsforIBT.size() > 0) {
					for (int index = 0; index < articleSearchResultsforIBT
							.size(); index++) {
						if (articleNo.equals(articleSearchResultsforIBT.get(
								index).getArticleNo())) {
							model.addAttribute("errorMsg",
									"Article already exists in the list");

							model.addAttribute("articleSearchResults",
									articleSearchResultsforIBT);
							model.addAttribute("param", param);
							ModelAndView modelAndView = new ModelAndView(
									"ibtSite", "param", param);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					}
				}
				// SERVICE CALL
				UserContext user = ((UserContext) request.getSession().getAttribute("user"));
				articleSearchResultsFetched = orderService
						.getArticleDetails(param,user);
				model.addAttribute("errorMsg", "");

				if (articleSearchResultsFetched.size() == 1) {
					model.addAttribute("size", "1");
					// //System.out.println(" inside 1");
					if (articleSearchResultsFetched.get(0).getRangedFlag()
							.equalsIgnoreCase("Y")) {
						if (articleSearchResultsFetched.get(0).getPackBrkFlag()
								.equalsIgnoreCase("N")) {
							model.addAttribute("errorMsg", "");
							model.addAttribute("param", param);
							articleSearchResultsforIBT
									.addAll(articleSearchResultsFetched);
							return requestIBTOrderDetail(request, response);
						} else {
							// //System.out.println("Pack breakdown");
							model.addAttribute("errorMsg",
									"Article is Pack breakdown");
						}
					} else {
						// //System.out.println("Not ranged");
						model.addAttribute("param", param);
						model.addAttribute("errorMsg",
								"Article '" + param.getArticleNo()
										+ "' is not ranged to your store");
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
					// //System.out.println("addArtSearchResults size--->"
					// + addArtSearchResults.size());
					model.addAttribute("multiArtRes", addArtSearchResults);
					if (addArtSearchResults.size() > 0) {
						model.addAttribute("size", "2");
					}

				} else if (articleSearchResultsFetched.size() <= 0
						|| articleSearchResultsFetched == null) {
					model.addAttribute("size", "0");
					// //System.out.println("no data found");
					model.addAttribute("errorMsg",
							"Sorry no results returned for your search criteria. Please try again");
				}

			} catch (Exception e) {

				// articleSearchResultsforIBT = new
				// ArrayList<ArticleSearchResults>();
				e.printStackTrace();
				model.addAttribute("size", "0");
				model.addAttribute("param", param);
				model.addAttribute("errorMsg", "No Data found");
			}

			model.addAttribute("articleSearchResults",
					articleSearchResultsforIBT);
			model.addAttribute("param", param);
			ModelAndView modelAndView = new ModelAndView("ibtSite", "param",
					param);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		} else if (request.getParameter("buttonVal").equalsIgnoreCase(
				"multiArticleSelect")) {
			// //System.out.println("multi index--->"
			// + request.getParameter("multipleArtIndex"));
			try {
				return requestIBTOrderDetail(request, response);
			} catch (Exception e) {
				e.printStackTrace();
				model.addAttribute("size", "0");
				model.addAttribute("param", param);
				model.addAttribute("errorMsg", "No Data found");
				model.addAttribute("articleSearchResults",
						articleSearchResultsforIBT);
				model.addAttribute("param", param);
				ModelAndView modelAndView = new ModelAndView("ibtSite",
						"param", param);

				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} else {
			// //System.out.println("inside finalise");
			// FINALISE ORDER
			ModelAndView modelAndView = new ModelAndView("ibtSite");
			model.addAttribute("errorMsg", "");
			try {

			} catch (Exception e) {
				e.printStackTrace();
				model.addAttribute("param", param);

			}
			model.addAttribute("param", param);
			model.addAttribute("articleSearchResults",
					articleSearchResultsforIBT);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		}
	}

	@RequestMapping(value = "/requestIBTOrderDetail.htm", method = RequestMethod.GET)
	public ModelAndView requestIBTOrderDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestIBTOrderDetail");
		model.addAttribute("size", "0");
		model.addAttribute("orderList", "");

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		// //System.out.println(" done");
		String listIndex = null;
		ibtDetailsParam = new IBTDetailsParam();
		ArticleSearchResults articleOrderDetails = null;

		param.setStoreNo(request.getParameter("storeNo"));
		param.setStoreName(request.getParameter("storeName"));
		param.setWarehouse(request.getParameter("warehouse"));
		model.addAttribute("param", param);
		if (request.getParameter("multipleArtIndex") != null
				&& request.getParameter("multipleArtIndex").trim().length() > 0) {
			articleOrderDetails = (ArticleSearchResults) addArtSearchResults
					.get(Integer.parseInt(request
							.getParameter("multipleArtIndex")));
			listIndex = request.getParameter("multipleArtIndex");
			// //System.out.println("in if");
		} else if (request.getParameter("ibtIndex") != null
				&& request.getParameter("ibtIndex").trim().length() > 0) {
			articleOrderDetails = (ArticleSearchResults) articleSearchResultsforIBT
					.get(Integer.parseInt(request.getParameter("ibtIndex")));
			listIndex = request.getParameter("ibtIndex");
			// //System.out.println("in else if");

		} else {
			articleOrderDetails = (ArticleSearchResults) articleSearchResultsFetched
					.get(0);
			listIndex = "";
			// //System.out.println("in else");
		}

		// //System.out.println(" done");

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");

		String siteNo = userContext.getSiteNo();

		ibtDetailsParam.setSiteNo(siteNo);

		if (articleOrderDetails.getOrderDate() != null
				&& articleOrderDetails.getOrderDate().trim().length() > 0
				&& articleOrderDetails.getDeliveryDate() != null
				&& articleOrderDetails.getDeliveryDate().trim().length() > 0
				&& articleOrderDetails.getInputQty() != null
				&& articleOrderDetails.getInputQty().trim().length() > 0) {

			ibtDetailsParam.setOrderDate(articleOrderDetails.getOrderDate());
			ibtDetailsParam.setDeliveryDate(articleOrderDetails
					.getDeliveryDate());
			ibtDetailsParam.setTransferQty(articleOrderDetails.getInputQty());
			ibtDetailsParam.setOrderedQty(articleOrderDetails
					.getOrderedQuantity());

			// //System.out.println(" articleOrderDetails.getUomType()-->"
			// + articleOrderDetails.getUomType());
			ibtDetailsParam.setUomValType(articleOrderDetails.getUomType());
			model.addAttribute("confirmed", "confirmed");
			ibtDetailsParam.setStatus("Remove");

		} else {
			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			Date date = new Date();
			// //System.out.println(dateFormat.format(date));

			String currentDate = dateFormat.format(date);
			Calendar cal = Calendar.getInstance();
			cal.setTime(dateFormat.parse(currentDate));
			cal.add(Calendar.DATE, 2);
			String convertedDate = dateFormat.format(cal.getTime());
			ibtDetailsParam.setOrderDate(currentDate);
			ibtDetailsParam.setDeliveryDate(currentDate);
			ibtDetailsParam.setUomValType("order");
			model.addAttribute("confirmed", "");
			ibtDetailsParam.setStatus("Cancel");
		}

		ModelAndView modelAndView = new ModelAndView("ibtOrderDetails");
		// //System.out.println(" model set");
		model.addAttribute("articleOrderDetails", articleOrderDetails);
		model.addAttribute("listIndex", listIndex);
		model.addAttribute("ibtDetailsParam", ibtDetailsParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/********************* BACK TO IBT SEARCH **********************/

	@RequestMapping(value = "/backToIBTSite.htm", method = RequestMethod.GET)
	public ModelAndView backToIBTSite(HttpServletRequest request,
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
				for (int i = 0; i < articleSearchResultsforIBT.size(); i++) {
					if (artNo.equals(articleSearchResultsforIBT.get(i)
							.getArticleNo())) {
						articleSearchResultsforIBT.remove(i);
						// //System.out.println("removed");
					}
				}
			}
		}
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("ibtSite");
		model.addAttribute("errorMsg", "");
		model.addAttribute("articleSearchResults", articleSearchResultsforIBT);
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/************************** CONFIRM ORDER - BACK TO IBT ORDER RPAGE ****************/
	@RequestMapping(value = "/confirmOrder.htm", method = RequestMethod.POST)
	public ModelAndView confirmOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("ibtSite");
		model.addAttribute("errorMsg", "");

		ArticleSearchResults updatedArticleOrderDetails = null;
		String artNo = request.getParameter("articleNumber");
		for (int i = 0; i < articleSearchResultsforIBT.size(); i++) {
			if (artNo.equals(articleSearchResultsforIBT.get(i).getArticleNo())) {
				updatedArticleOrderDetails = articleSearchResultsforIBT.get(i);
			}
		}
		if (updatedArticleOrderDetails == null) {
			for (int i = 0; i < addArtSearchResults.size(); i++) {
				if (artNo.equals(addArtSearchResults.get(i).getArticleNo())) {
					updatedArticleOrderDetails = addArtSearchResults.get(i);
				}
			}
		} /*
		 * else { double cost = 0; cost =
		 * Double.parseDouble(updatedArticleOrderDetails.getInputQty())
		 * Double.parseDouble(updatedArticleOrderDetails .getSalesPrice());
		 * ////System.out.println(" cost--->" + cost); double updatedCost =
		 * param.getTotalCost() - cost; ////System.out.println(" updatedCost--->"
		 * + updatedCost); param.setTotalCost(updatedCost);
		 * ////System.out.println(" param.getTotalCost()---->" +
		 * param.getTotalCost());
		 * 
		 * }
		 */
		if (updatedArticleOrderDetails.getInputQty() != null
				&& updatedArticleOrderDetails.getInputQty().trim().length() > 0) {
			double cost = 0;
			cost = Double.parseDouble(updatedArticleOrderDetails.getInputQty())
					* Double.parseDouble(updatedArticleOrderDetails
							.getSalesPrice());
			// //System.out.println(" cost--->" + cost);
			double updatedCost = param.getTotalCost() - cost;
			// //System.out.println(" updatedCost--->" + updatedCost);
			param.setTotalCost(updatedCost);
			// //System.out.println(" param.getTotalCost()---->"
			// + param.getTotalCost());
		} else {
			// //System.out.println(" null val");
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
			updatedArticleOrderDetails.setUomType(request
					.getParameter("uomTypeVal"));

			// //System.out.println("updatedArticleOrderDetails.getUomType()---> "
			// + updatedArticleOrderDetails.getUomType());

			ibtDetailsParam.setDeliveryDate(request
					.getParameter("deliveryDate"));
			ibtDetailsParam.setTransferQty(request.getParameter("orderedQty"));
			ibtDetailsParam.setUomValType(request.getParameter("uomTypeVal"));
			// //System.out.println("ibtDetailsParam.getUomValType()---> "
			// + ibtDetailsParam.getUomValType());

			// updating the existing list
			boolean exists = false;
			for (int i = 0; i < articleSearchResultsforIBT.size(); i++) {
				if (updatedArticleOrderDetails.getArticleNo() == articleSearchResultsforIBT
						.get(i).getArticleNo()) {
					articleSearchResultsforIBT.get(i).setDeliveryDate(
							updatedArticleOrderDetails.getDeliveryDate());
					articleSearchResultsforIBT.get(i).setOrderDate(
							updatedArticleOrderDetails.getOrderDate());
					articleSearchResultsforIBT.get(i).setInputQty(
							updatedArticleOrderDetails.getInputQty());
					articleSearchResultsforIBT.get(i).setOrderedQuantity(
							updatedArticleOrderDetails.getOrderedQuantity());
					articleSearchResultsforIBT.get(i).setUomType(
							updatedArticleOrderDetails.getUomType());
					exists = true;

				}
			}
			if (!exists) {
				articleSearchResultsforIBT.add(updatedArticleOrderDetails);
				exists = false;

			}
			// updating the cost
			double cost = 0;
			cost = Double.parseDouble(updatedArticleOrderDetails.getInputQty())
					* Double.parseDouble(updatedArticleOrderDetails
							.getSalesPrice());
			// //System.out.println(" cost--->" + cost);

			double updatedCost = param.getTotalCost() + cost;
			// //System.out.println(" updatedCost--->" + updatedCost);
			param.setTotalCost(updatedCost);

			// //System.out.println(" param.getTotalCost()---->"
			// + param.getTotalCost());
			model.addAttribute("articleSearchResults",
					articleSearchResultsforIBT);
			model.addAttribute("param", param);
			model.addAttribute("ibtDetailsParam", ibtDetailsParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		} else if (request.getParameter("buttonValue").equalsIgnoreCase(
				"Show Sales History")) {// Show History

			ModelAndView modelAndViewSSH = new ModelAndView("ibtOrderDetails");
			try {
				List<OrderDetail> orderList = null;
				OrderParam orderParam = new OrderParam();

				/*
				 * ibtDetailsParam createOrderParam.setDeliveryDate(request
				 * .getParameter("deliveryDate")); createOrderParam
				 * .setOrderQty(request.getParameter("orderQty"));
				 * createOrderParam.setOrderDate(request
				 * .getParameter("orderDate"));
				 */
				ibtDetailsParam
						.setTransferQty(request.getParameter("orderQty"));

				ibtDetailsParam.setUomValType(request
						.getParameter("uomTypeVal"));
				// //System.out.println("request.getParameter(uomTypeVal)---->"
				// + request.getParameter("uomTypeVal"));

				if (request.getParameter("orderedQty") != null
						&& request.getParameter("orderedQty").trim().length() > 0) {
					ibtDetailsParam.setOrderedQty(request
							.getParameter("orderedQty"));
				}

				// //System.out.println("entered show sales history");
				DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

				// //System.out.println("request.getParameter(orderDate)"
				// + request.getParameter("orderDate"));
				// //System.out.println("request.getParameter(deliveryDate)"
				// + request.getParameter("deliveryDate"));

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
					// //System.out.println("convertedDeliveryToDate"
					// + convertedDeliveryToDate);

					orderParam.setToDate(convertedDeliveryToDate);

					Calendar cal = Calendar.getInstance();
					cal.setTime(deliveryDate);
					cal.add(Calendar.MONTH, -1);
					String convertedDeliveryFromDate = dateFormat.format(cal
							.getTime());
					orderParam.setFromDate(convertedDeliveryFromDate);
					// //System.out.println("convertedDeliveryFromDate"
					// + convertedDeliveryFromDate);
				}

				// //System.out.println("end ");

				orderParam.setOrderType("ZUB");
				orderParam.setSiteNo(((UserContext) request.getSession()
						.getAttribute("user")).getSiteNo());
				orderParam.setArticleNo(request.getParameter("articleNumber"));
				orderList = orderService.getOrderDetails(orderParam, "",user);

				if (orderList != null && orderList.size() > 0
						&& orderList.get(0).getMsg().equalsIgnoreCase("")) {
					// //System.out.println("data fetched -->573");
					// //System.out.println("size of orderList --> "
					// + orderList.size());
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
				model.addAttribute("errorMsg", "No Sales History found");

			}

			/*
			 * model.addAttribute("articleSearchResults",
			 * articleSearchResultsforCreate);
			 * model.addAttribute("manualOrderParam", manualOrderParam);
			 * model.addAttribute("createOrderParam", createOrderParam);
			 * modelAndViewSSH.addObject("model", model);
			 * modelAndViewSSH.addAllObjects(model); return modelAndViewSSH;
			 */
			model.addAttribute("articleSearchResults",
					articleSearchResultsforIBT);
			model.addAttribute("param", param);
			model.addAttribute("ibtDetailsParam", ibtDetailsParam);
			modelAndViewSSH.addObject("model", model);
			modelAndViewSSH.addAllObjects(model);
			return modelAndViewSSH;

		} else if (request.getParameter("buttonValue").equalsIgnoreCase(
				"Cancel")) {// cancel
			// remove the data from articleSearchResultsforIBT

			for (int i = 0; i < articleSearchResultsforIBT.size(); i++) {
				if (updatedArticleOrderDetails.getArticleNo() == articleSearchResultsforIBT
						.get(i).getArticleNo()) {
					articleSearchResultsforIBT.remove(i);

				}
			}

			model.addAttribute("articleSearchResults",
					articleSearchResultsforIBT);
			model.addAttribute("param", param);
			model.addAttribute("ibtDetailsParam", ibtDetailsParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		} else {// remove

			// removing from articleSearchResultsforIBT

			for (int i = 0; i < articleSearchResultsforIBT.size(); i++) {
				if (updatedArticleOrderDetails.getArticleNo() == articleSearchResultsforIBT
						.get(i).getArticleNo()) {
					articleSearchResultsforIBT.remove(i);
				}
			}
			model.addAttribute("articleSearchResults",
					articleSearchResultsforIBT);
			model.addAttribute("param", param);
			model.addAttribute("ibtDetailsParam", ibtDetailsParam);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

	}

	/************************** SITE SEARCH ***********************/
	@RequestMapping(value = "/siteSearch.htm", method = RequestMethod.GET)
	public ModelAndView siteSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		model.addAttribute("flag", "Y");
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
			UserContext user = ((UserContext) request.getSession().getAttribute("user"));
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

	@RequestMapping(value = "/finaliseIBTOrder.htm", method = RequestMethod.POST)
	public ModelAndView finaliseIBTOrder(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("entered contorller updateDeliveryDate method");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// //System.out.println("inside finalise");
		// FINALISE ORDER
		ModelAndView modelAndView = new ModelAndView("ibtSite");
		model.addAttribute("errorMsg", "");
		// //System.out.println("request.getParameter(ibtSiteType)"
		// + request.getParameter("ibtSiteType"));

		if (request.getParameter("ibtSiteType").equalsIgnoreCase("wareHouse")) {
			// //System.out.println("request.getParameter(warehouse)"
			// + request.getParameter("warehouse"));
			param.setSupplier(request.getParameter("warehouse"));

		} else if (request.getParameter("ibtSiteType")
				.equalsIgnoreCase("Store")) {
			// //System.out.println("request.getParameter(storeNo)"
			// + request.getParameter("storeNo"));
			param.setSupplier(request.getParameter("storeNo"));
		}

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		// //System.out.println(dateFormat.format(date));
		param.setOrderDate(dateFormat.format(date));

		String createStatus = "";
		String postStatus = "";
		try {
			UserContext user = ((UserContext) request.getSession().getAttribute("user"));
			createStatus = orderService.createIbtOrder(
					articleSearchResultsforIBT, param,user);
			// //System.out.println("createStatus" + createStatus);
			if (createStatus == null) {
				// postStatus =
				// "Order Creation request was successfully submitted ";
				postStatus = createStatus;
				postSuccessFlag = true;
			} else {
				postStatus = "Order creation failed";
			}
			if (postSuccessFlag == true) {
				// //System.out.println(" inside succes check");
				articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();
				updatedArticleResults = new ArrayList<ArticleSearchResults>();
				addArtSearchResults = new ArrayList<ArticleSearchResults>();
				postSuccessFlag = false;
			}

		} catch (Exception e) {
			e.printStackTrace();
			postStatus = "Order creation failed";
			model.addAttribute("param", param);

		}
		model.addAttribute("param", param);
		model.addAttribute("errorMsg", postStatus);
		model.addAttribute("articleSearchResults", articleSearchResultsforIBT);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when search add button clicked on ibt order create page.
	@RequestMapping(value = "/createManualOrder.htm", method = RequestMethod.POST)
	public ModelAndView createManualOrder(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		ModelAndView modelAndView = new ModelAndView("ibtSite");
		ArrayList<ArticleSearchResults> articleSearchResultsFetched = new ArrayList<ArticleSearchResults>();

		/*
		 * ////System.out.println("request.getParameter(\"articleNo\")"+request.
		 * getParameter("articleNo"));
		 * ////System.out.println("request.getParameter(\"ordqty\")"
		 * +request.getParameter("ordqty"));
		 * ////System.out.println("request.getParameter(\"sourceSupply\")"
		 * +request.getParameter("sourceSupply"));
		 * ////System.out.println("request.getParameter(\"suppName\")"
		 * +request.getParameter("suppName"));
		 */
		param.setArticleNo(request.getParameter("articleNo"));
		param.setStoreNo(request.getParameter("storeNo"));
		param.setStoreName(request.getParameter("storeName"));
		param.setOrderQty(request.getParameter("ordqty"));
		param.setWarehouse(request.getParameter("warehouse"));
		model.addAttribute("buttonRetain", request.getParameter("ibtSiteType"));
		model.addAttribute("listSize", "");
		/*
		 * manualOrderParam.setArticleNo(request.getParameter("articleNo"));
		 * manualOrderParam.setOrderQty(request.getParameter("ordqty"));
		 * manualOrderParam
		 * .setSrcOfSupply(request.getParameter("sourceSupply"));
		 * manualOrderParam.setSuppName(request.getParameter("suppName"));
		 */
		model.addAttribute("param", param);

		if (addArtSearchResults != null && addArtSearchResults.size() != 0) {

			model.addAttribute("listSize", addArtSearchResults.size());
		}
		if (addArtSearchResults != null && addArtSearchResults.size() != 0) {
			for (int i = 0; i < addArtSearchResults.size(); i++) {
				if (addArtSearchResults.get(i).getEan11()
						.equals(param.getArticleNo())
						|| addArtSearchResults.get(i).getArticleNo()
								.equals(param.getArticleNo())) {
					model.addAttribute("msg",
							"Article already exists in the list");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}

			}
		}

		if (request.getParameter("articleType") != null
				&& request.getParameter("articleType").equalsIgnoreCase(
						"ArticleNumber")) {
			param.setArticleType("articleNo");
		} else if (request.getParameter("articleType") != null
				&& request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			param.setArticleType("ean");
		}
		model.addAttribute("articleList", addArtSearchResults);
		// //System.out.println("art no" + request.getParameter("articleNo"));
		model.addAttribute("msg", "");
		boolean validStore = false;
		String storeNum = request.getParameter("storeNo");
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			if (request.getParameter("ibtSiteType") != null
					&& request.getParameter("ibtSiteType").trim().length() > 0) {

				if (request.getParameter("ibtSiteType").equalsIgnoreCase(
						"Store")) {
					if (request.getParameter("storeNo") != null
							&& request.getParameter("storeNo").trim().length() > 0) {
						ArrayList<Store> storeList = null;
						String[] storeNo = request.getParameter("storeNo")
								.split("-");
						try {
							if (storeNo[0] != null) {
								storeNum = storeNo[0];
								storeList = orderService
										.getStoreDetails(storeNo[0],user);
							} else {
								storeList = orderService
										.getStoreDetails(storeNum,user);
							}

							if (storeList != null && storeList.size() > 0) {
								for (int index = 0; index < storeList.size(); index++) {
									if (storeNum.equalsIgnoreCase(storeList
											.get(index).getSiteNumber())) {
										param.setReceiveSiteNo(storeList.get(
												index).getSiteNumber());
										validStore = true;
									}
								}
							} else {
								/*
								 * param.setSiteNo(((UserContext) request
								 * .getSession().getAttribute("user"))
								 * .getSiteNo());
								 */
								model.addAttribute("msg",
										"Please enter valid Store");
								model.addAttribute("manualOrderParam", param);
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}

							if (validStore) {

							} else {
								param.setSiteNo(((UserContext) request
										.getSession().getAttribute("user"))
										.getSiteNo());
								model.addAttribute("msg",
										"Please enter valid Store");
								model.addAttribute("manualOrderParam", param);
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}

						} catch (Exception e) {
							e.printStackTrace();
						}
					}
					// //System.out.println(" valid store--->" + validStore);
				} else {
					if (request.getParameter("warehouse") != null
							&& !request.getParameter("warehouse")
									.equalsIgnoreCase("0")) {
						param.setReceiveSiteNo(request
								.getParameter("warehouse"));
					}/*
					 * else if(param.getWarehouse()==null ||
					 * param.getWarehouse().trim().length()<=0){
					 * param.setWarehouse
					 * (request.getParameter("dropDownValWarehouse"));
					 * param.setReceiveSiteNo
					 * (request.getParameter("dropDownValWarehouse"));
					 * 
					 * }
					 */

				}

			}

			// SERVICE CALL
			articleSearchResultsFetched = (ArrayList<ArticleSearchResults>) orderService
					.getArticleDetails(param,user);
			if (addArtSearchResults != null && addArtSearchResults.size() != 0) {
				for (int i = 0; i < addArtSearchResults.size(); i++) {
					if (addArtSearchResults.get(i).getEan11()
							.equals(param.getArticleNo())
							|| addArtSearchResults
									.get(i)
									.getArticleNo()
									.equals(articleSearchResultsFetched.get(0)
											.getArticleNo())) {
						model.addAttribute("msg",
								"Article already exists in the list");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}

				}
			}
			if ((articleSearchResultsFetched != null && articleSearchResultsFetched
					.size() == 1)) {
				String artRecvSiteChk = orderService
						.getArticleDetailsRecvSite(param,user);
				if (artRecvSiteChk.equalsIgnoreCase("false")) {

					model.addAttribute("articleList", addArtSearchResults);
					model.addAttribute("size", "0");
					model.addAttribute("msg",
							"Article '" + param.getArticleNo()
									+ "' is not ranged to receiving site.");
					model.addAttribute("invalidQty", "");
				} else {
					model.addAttribute("size", "1");
					// //System.out.println(" inside 1");

					// resetting the site
					param.setSiteNo(((UserContext) request.getSession()
							.getAttribute("user")).getSiteNo());

					// deleted flag check
					if (articleSearchResultsFetched.get(0).getDeleteInd()
							.equalsIgnoreCase("Y")) {

						model.addAttribute(
								"msg",
								""
										+ articleSearchResultsFetched.get(0)
												.getDescription()
										+ " ("
										+ param.getArticleNo()
										+ ") is deleted from your Store and cannot be ordered");

						model.addAttribute("articleList", addArtSearchResults);
						model.addAttribute("manualOrderParam", param);
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}
					// Uom flag setting
					articleSearchResultsFetched.get(0).setUomFlag("1");

					if (addArtSearchResults != null
							&& addArtSearchResults.size() != 0) {
						for (int i = 0; i < addArtSearchResults.size(); i++) {
							if (addArtSearchResults
									.get(i)
									.getEan11()
									.equals(articleSearchResultsFetched.get(0)
											.getArticleNo())
									|| addArtSearchResults
											.get(i)
											.getArticleNo()
											.equals(articleSearchResultsFetched
													.get(0).getEan11())) {
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
						/*
						 * if(articleSearchResultsFetched.get(0).getPackBrkFlag()
						 * . equalsIgnoreCase("Y")) {
						 */
						if (request.getParameter("warehouse") != null
								&& !request.getParameter("warehouse")
										.equalsIgnoreCase("0")) {
							if (articleSearchResultsFetched.get(0)
									.getVendorNo() != null
									&& articleSearchResultsFetched.get(0)
											.getVendorNo().trim().length() > 0
									&& articleSearchResultsFetched.get(0)
											.getSrcOfSupply()
											.equalsIgnoreCase("2")) {

							} else {
								// if(vendordesc!=null &&
								// vendordesc.trim().length()>0)
								model.addAttribute(
										"msg",
										"Article '"
												+ param.getArticleNo()
												+ "' is not linked to the warehouse '"
												+ request
														.getParameter("warehouse")
												+ "'.");
								model.addAttribute("articleList",
										addArtSearchResults);
								model.addAttribute("manualOrderParam", param);
								model.addAttribute("size", "0");
								model.addAttribute("invalidQty", "");
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}
						}
						Double totalOrdered = null;
						if (articleSearchResultsFetched.get(0).getBaseUOMDesc() != null
								&& articleSearchResultsFetched.get(0)
										.getBaseUOMDesc() != "") {
							if (articleSearchResultsFetched.get(0)
									.getBaseUOMDesc().equalsIgnoreCase("each")) {
								if (param.getOrderQty() != null
										&& param.getOrderQty() != "") {
									if (Double.parseDouble(param.getOrderQty()) % 1 == 0) {
										totalOrdered = Double
												.parseDouble(articleSearchResultsFetched
														.get(0).getOM())
												* Double.parseDouble(param
														.getOrderQty());
										articleSearchResultsFetched.get(0)
												.setInputQty(
														param.getOrderQty());
										articleSearchResultsFetched
												.get(0)
												.setTotalOrdered(
														String.valueOf(totalOrdered
																.intValue()));
									} else {
										Integer qty = (int) Double
												.parseDouble(param
														.getOrderQty());
										Integer om = (int) Double
												.parseDouble(articleSearchResultsFetched
														.get(0).getOM());
										Integer total = qty * om;
										articleSearchResultsFetched.get(0)
												.setInputQty(qty.toString());
										articleSearchResultsFetched.get(0)
												.setTotalOrdered(
														total.toString());
										model.addAttribute("invalidQty", "true");
									}
								} else {
									articleSearchResultsFetched.get(0)
											.setInputQty("");
									articleSearchResultsFetched.get(0)
											.setTotalOrdered("0");
									model.addAttribute("invalidQty", "");
								}
							} else if (param.getOrderQty() != null
									&& param.getOrderQty() != "") {
								totalOrdered = Double
										.parseDouble(articleSearchResultsFetched
												.get(0).getOM())
										* Double.parseDouble(param
												.getOrderQty());
								articleSearchResultsFetched.get(0).setInputQty(
										param.getOrderQty());
								articleSearchResultsFetched.get(0)
										.setTotalOrdered(
												String.valueOf(totalOrdered
														.intValue()));
								model.addAttribute("invalidQty", "");
							}
						} else {
							totalOrdered = Double
									.parseDouble(articleSearchResultsFetched
											.get(0).getOM())
									* Double.parseDouble(param.getOrderQty());
							articleSearchResultsFetched.get(0).setInputQty(
									param.getOrderQty());
							articleSearchResultsFetched.get(0).setTotalOrdered(
									String.valueOf(totalOrdered.intValue()));
							model.addAttribute("invalidQty", "");
						}

						/*
						 * totalOrdered=Double.parseDouble(
						 * articleSearchResultsFetched
						 * .get(0).getOM())*Double.parseDouble
						 * (param.getOrderQty());
						 */
						model.addAttribute("msg", "");

						DateFormat dateFormat = new SimpleDateFormat(
								"dd/MM/yyyy");
						Date date = new Date();
						// //System.out.println(dateFormat.format(date));
						String currentDate = dateFormat.format(date);
						Calendar cal = Calendar.getInstance();
						cal.setTime(dateFormat.parse(currentDate));
						cal.add(Calendar.DATE, 0);
						String convertedDate = dateFormat.format(cal.getTime());
						if (addArtSearchResults != null
								&& addArtSearchResults.size() > 0) {

							articleSearchResultsFetched.get(0).setDeliveryDate(
									addArtSearchResults.get(0)
											.getDeliveryDate());
							articleSearchResultsFetched.get(0).setOrderDate(
									addArtSearchResults.get(0).getOrderDate());
						} else {
							articleSearchResultsFetched.get(0).setOrderDate(
									currentDate);
							articleSearchResultsFetched.get(0).setDeliveryDate(
									convertedDate);
						}
						articleSearchResultsFetched.get(0).setSaveFlag("N");
						// articleSearchResultsFetched.get(0).setInputQty(param.getOrderQty());
						// articleSearchResultsFetched.get(0).setTotalOrdered(String.valueOf(totalOrdered.intValue()));
						// articleSearchResultsFetched.get(0).setTotalCost(0.0);

						/*
						 * Double
						 * cost=articleSearchResultsFetched.get(0).getSalesPrice
						 * ()!=null?
						 * Double.parseDouble(articleSearchResultsFetched.get
						 * (0).getSalesPrice())* Double.parseDouble("0"):0.0;
						 * cost+=param.getTotalCost(); param.setTotalCost(cost);
						 */
						addArtSearchResults.addAll(articleSearchResultsFetched);
						model.addAttribute("articleList", addArtSearchResults);
						if (addArtSearchResults != null
								&& addArtSearchResults.size() != 0) {

							model.addAttribute("listSize",
									addArtSearchResults.size());
						}
						// ////System.out.println();

						/*
						 * }else{ ////System.out.println("Pack breakdown");
						 * model.addAttribute("msg",
						 * "Article is Pack breakdown"); }
						 */
					} else {
						// //System.out.println("Not ranged");
						model.addAttribute("msg", "Article is not ranged");
						model.addAttribute("invalidQty", "");
					}
				}
			} else {
				model.addAttribute("articleList", addArtSearchResults);
				model.addAttribute("size", "0");
				model.addAttribute(
						"msg",
						"No article found for article number '"
								+ param.getArticleNo()
								+ "'. Please try a different number.");
				model.addAttribute("invalidQty", "");
			}

		} catch (Exception e) {
			e.printStackTrace();
			// articleSearchResultsforCreate = new
			// ArrayList<ArticleSearchResults>();
			/*
			 * ArticleSearchResults obj=new ArticleSearchResults();
			 * obj.setArticleNo("1"); obj.setOrderDate("28/07/2013");
			 * obj.setDeliveryDate("29/07/2013"); addArtSearchResults.add(obj);
			 */
			model.addAttribute("invalidQty", "");
			model.addAttribute("articleList", addArtSearchResults);

			model.addAttribute("size", "0");
			model.addAttribute("msg", "No article found for article number '"
					+ param.getArticleNo()
					+ "'. Please try a different number.");
		}
		model.addAttribute("manualOrderParam", param);
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when save icon clicked on IBT order create page
	@RequestMapping(value = "/saveDetail.htm", method = RequestMethod.GET)
	@ResponseBody
	public String saveDetail(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside Save");
		String index = request.getParameter("index");
		String orderDate = request.getParameter("orderDate");
		String deliveryDate = request.getParameter("deliveryDate");
		String inputQty = request.getParameter("inputQty");
		String totalOrdered = request.getParameter("totalOrdered");
		String uom = request.getParameter("uom");
		// //System.out.println("request.getParameter(\"index\")"
		// + request.getParameter("index"));
		// //System.out.println("request.getParameter(\"orderDate\")"
		// + request.getParameter("orderDate"));
		// //System.out.println("request.getParameter(\"deliveryDate\")"
		// + request.getParameter("deliveryDate"));
		// //System.out.println("request.getParameter(\"inputQty\")"
		// + request.getParameter("inputQty"));
		// //System.out.println("request.getParameter(\"totalOrdered\")"
		// + request.getParameter("totalOrdered"));
		Double updatedCost = 0.0;
		if (addArtSearchResults != null && addArtSearchResults.size() > 0) {
			addArtSearchResults.get(Integer.parseInt(index) - 1).setInputQty(
					inputQty);
			Double cost = Double.parseDouble(addArtSearchResults.get(
					(Integer.parseInt(index) - 1)).getInputQty())
					* Double.parseDouble(addArtSearchResults.get(
							(Integer.parseInt(index) - 1)).getSalesPrice());
			updatedCost = param.getTotalCost() - cost;
			param.setTotalCost(updatedCost);
			cost = Double.parseDouble(inputQty)
					* Double.parseDouble(addArtSearchResults.get(
							(Integer.parseInt(index) - 1)).getSalesPrice());
			updatedCost = param.getTotalCost() + cost;
			param.setTotalCost(updatedCost);
			// //System.out.println("updatedCost  =" + updatedCost);
			addArtSearchResults.get(Integer.parseInt(index) - 1).setOrderDate(
					orderDate);
			if (deliveryDate != null && deliveryDate != ""
					&& deliveryDate.length() == 8) {
				addArtSearchResults.get(Integer.parseInt(index) - 1)
						.setDeliveryDate(
								OrderController.formatDate(deliveryDate));
				// param.setRosterFromDate(OrderController.formatDate(request.getParameter("rosterFromDate")));

			} else {
				addArtSearchResults.get(Integer.parseInt(index) - 1)
						.setDeliveryDate(deliveryDate);
				// param.setRosterFromDate(request.getParameter("rosterFromDate"));
			}

			addArtSearchResults.get(Integer.parseInt(index) - 1)
					.setTotalOrdered(totalOrdered);
			addArtSearchResults.get(Integer.parseInt(index) - 1)
					.setUomFlag(uom);
			addArtSearchResults.get(Integer.parseInt(index) - 1).setSaveFlag(
					"Y");
			for (int i = 0; i < addArtSearchResults.size(); i++) {
				addArtSearchResults.get(i).setOrderDate(orderDate);
				addArtSearchResults.get(i).setDeliveryDate(deliveryDate);
			}
		}
		return updatedCost.toString();
	}

	// method called when delete icon clicked on IBT order create page
	@RequestMapping(value = "/deleteItem.htm", method = RequestMethod.GET)
	public ModelAndView deleteItem(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model.addAttribute("invalidQty", "");
		// //System.out.println("inside Delete");
		// //System.out.println("index" + request.getParameter("index"));
		param.setWarehouse(request.getParameter("warehouse"));
		ModelAndView modelAndView = new ModelAndView("ibtSite");

		if (addArtSearchResults != null && addArtSearchResults.size() > 0) {
			addArtSearchResults.get(
					(Integer.parseInt(request.getParameter("index")) - 1))
					.setInputQty("0");
			Double cost = Double.parseDouble(addArtSearchResults.get(
					(Integer.parseInt(request.getParameter("index")) - 1))
					.getInputQty())
					* Double.parseDouble(addArtSearchResults
							.get((Integer.parseInt(request
									.getParameter("index")) - 1))
							.getSalesPrice());
			double updatedCost = param.getTotalCost() - cost;
			param.setTotalCost(updatedCost);
			// //System.out.println("updatedCost  =" + updatedCost);
			addArtSearchResults.remove((Integer.parseInt(request
					.getParameter("index")) - 1));
			// String msg="Deleted";
		}
		if (addArtSearchResults != null && addArtSearchResults.size() != 0) {

			model.addAttribute("listSize", addArtSearchResults.size());
		}
		model.addAttribute("articleList", addArtSearchResults);
		model.addAttribute("msg", "");
		model.addAttribute("param", param);
		model.addAttribute("manualOrderParam", param);
		// model.addAttribute("msg", msg);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when confirm and finalise icon clicked on IBT order create
	// page
	@RequestMapping(value = "/finalizeManualOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String finalizeManualOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside finalise");
		model.addAttribute("msg", "");
		String createStatus = "false";
		if (request.getParameter("ibtSiteType").equalsIgnoreCase("wareHouse")) {
			// //System.out.println("request.getParameter(warehouse)"
			// + request.getParameter("warehouse"));
			param.setSupplier(request.getParameter("warehouse"));

		} else if (request.getParameter("ibtSiteType")
				.equalsIgnoreCase("Store")) {
			// //System.out.println("request.getParameter(storeNo)"
			// + request.getParameter("storeNo"));

			param.setSupplier(request.getParameter("storeNo"));
		}

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
		Date date = new Date();
		// //System.out.println(dateFormat.format(date));
		param.setOrderDate(dateFormat.format(date));
		/*
		 * //for finding temperature range---start
		 * 
		 * //double lowerBoundArray[]= double finalLowerBound=0; double
		 * finalUpperBound=0; double tempLowerBound=0; double tempUpperBound=0;
		 * boolean isTempAvailable=false;
		 * 
		 * String Str2; String Str = new String("(-3 to 6)");
		 * 
		 * int offset=Str.indexOf( '(' ); int count=Str.indexOf( ')' ); Str2
		 * =Str.substring(offset+1,count); String[] range1= Str2.split("to",2 );
		 * 
		 * 
		 * ////System.out.println("offset"+offset);
		 * ////System.out.println("count"+count);
		 * ////System.out.println("Str2 "+Str2);
		 * ////System.out.println("range1-0"+range1[0]);
		 * ////System.out.println("range1-1"+range1[1]);
		 * 
		 * 
		 * for(int i=0;i<addArtSearchResults.size();i++){ String Str = new
		 * String(addArtSearchResults.get(i).getTemperature().trim());
		 * ////System.out.println("i="+i+"tempe"+Str); if(Str!=null &&
		 * Str.trim().length()!=0){ isTempAvailable=true; try{ int
		 * offset=Str.indexOf( '(' ); int count=Str.indexOf( ')' ); Str2
		 * =Str.substring(offset+1,count); String[] range1= Str2.split("to",2 );
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
		 * ////System.out.println("finalUpperBound"+i+"  "+finalUpperBound); }
		 * 
		 * } catch(Exception e){ e.printStackTrace();
		 * 
		 * }
		 * 
		 * } } String temperature=""; String department=""; if(isTempAvailable){
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
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		temperature = serviceImpl.getTemperatureForTempCheckArtiDetails(addArtSearchResults);
		department = serviceImpl.getDepartmentForTempCheckArtiDetails(addArtSearchResults,
				((UserContext) request.getSession().getAttribute("user"))
						.getSalesOrg().toString());
		model.addAttribute("tempFromServiceIbtCreate", temperature);
		model.addAttribute("deptFromServiceIbtCreate", department);
		// //System.out.println("calculated temperature"+temperature);
		// //System.out.println("calculated rank"+department);

		try {
			createStatus = orderService.createIbtOrder(addArtSearchResults,
					param,user);
			// //System.out.println("createStatus=" + createStatus);

		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
		}
		if (createStatus == null) {
			addArtSearchResults = new ArrayList<ArticleSearchResults>();
			model.addAttribute("articleList", addArtSearchResults);
			model.addAttribute("msg", "");
			// //System.out.println("true#" +
			// param.getOrderRefNo()+"#"+temperature+"#"+department);
			return "true#" + param.getOrderRefNo() + "#" + temperature + "#"
					+ department;
		} else {
			return createStatus;
		}

	}

	// method called to verify the store no validation on IBT order create page
	// this method is called to validate the store no before adding article to
	// the list
	@RequestMapping(value = "/validateStore.htm", method = RequestMethod.GET)
	@ResponseBody
	public String validateStore(HttpServletRequest request,
			HttpServletResponse response) {
		String storeNumber = "";
		String storeName = "";
		if (request.getParameter("ibtSiteType") != null
				&& request.getParameter("ibtSiteType").trim().length() > 0
				&& request.getParameter("ibtSiteType")
						.equalsIgnoreCase("Store")) {
			boolean validStore = false;
			UserContext user = ((UserContext) request.getSession().getAttribute("user"));
			if (request.getParameter("storeNo") != null
					&& request.getParameter("storeNo").trim().length() > 0) {

				ArrayList<Store> storeList = null;
				String[] storeNo = request.getParameter("storeNo").split("-");
				String storeVal = request.getParameter("storeNo");

				try {
					if (storeNo[0] != null) {
						storeVal = storeNo[0];
						storeList = orderService.getStoreDetails(storeVal,user);

					} else {
						storeList = orderService.getStoreDetails(storeVal,user);
					}

					if (storeList != null && storeList.size() > 0) {
						for (int index = 0; index < storeList.size(); index++) {
							if (storeVal.equalsIgnoreCase(storeList.get(index)
									.getSiteNumber())) {
								validStore = true;
								storeNumber = storeList.get(index)
										.getSiteNumber();
								storeName = storeList.get(index)
										.getSiteDescription();
							}
						}
					} else {
						return "false";
					}

					if (validStore) {
						String ibtNo = "New";
						String creationDate = "";
						String status = "Open";
						DateFormat dateFormat1 = new SimpleDateFormat(
								"EEE dd/MM/yyyy");
						Date date1 = new Date();
						// //System.out.println(dateFormat1.format(date1));
						creationDate = dateFormat1.format(date1);
						Double totalValue = 0.0;
						if (addArtSearchResults != null
								&& addArtSearchResults.size() > 0) {
							for (int i = 0; i < addArtSearchResults.size(); i++) {
								totalValue += (Double
										.parseDouble(addArtSearchResults.get(i)
												.getSalesPrice()) * Double
										.parseDouble(addArtSearchResults.get(i)
												.getTotalOrdered()));
								// //System.out.println("salesPrice"+Double.parseDouble(addArtSearchResults.get(i).getPurChasePrice()));
								// //System.out.println("totalOrder"+Double.parseDouble(addArtSearchResults.get(i).getTotalOrdered()));

							}
							// //System.out.println("Before rounding"+totalValue);
							totalValue = (double) Math.round(totalValue * 100) / 100;
							// //System.out.println("rounded"+totalValue);
						}
						return "true-" + ibtNo + "-" + creationDate + "-"
								+ status + "-" + totalValue + "-" + storeNumber
								+ "-" + storeName;

					} else {

						return "false";
					}

				} catch (Exception e) {
					e.printStackTrace();
				}
			}
		} else if (request.getParameter("ibtSiteType") != null
				&& request.getParameter("ibtSiteType").trim().length() > 0
				&& request.getParameter("ibtSiteType").equalsIgnoreCase(
						"Warehouse")) {
			if (request.getParameter("warehouse") != null
					&& request.getParameter("warehouse") != ""
					&& request.getParameter("warehouse") != "0") {
				String ibtNo = "New";
				String creationDate = "";
				String status = "Open";
				DateFormat dateFormat1 = new SimpleDateFormat("EEE dd/MM/yyyy");
				Date date1 = new Date();
				// //System.out.println(dateFormat1.format(date1));
				creationDate = dateFormat1.format(date1);
				Double totalValue = 0.0;
				if (addArtSearchResults != null
						&& addArtSearchResults.size() > 0) {
					for (int i = 0; i < addArtSearchResults.size(); i++) {
						// //System.out.println(addArtSearchResults.get(i)
						// .getPurChasePrice());
						// //System.out.println(addArtSearchResults.get(i)
						// .getInputQty());
						totalValue += (Double.parseDouble(addArtSearchResults
								.get(i).getSalesPrice()) * Double
								.parseDouble(addArtSearchResults.get(i)
										.getTotalOrdered()));
						// //System.out.println(totalValue);
						// //System.out.println("salesPrice"+Double.parseDouble(addArtSearchResults.get(i).getPurChasePrice()));
						// //System.out.println("totalOrder"+Double.parseDouble(addArtSearchResults.get(i).getTotalOrdered()));

					}
					// //System.out.println("Before rounding"+totalValue);
					totalValue = (double) Math.round(totalValue * 100) / 100;
					// //System.out.println("rounded"+totalValue);
				}
				return "true-" + ibtNo + "-" + creationDate + "-" + status
						+ "-" + totalValue + "-" + storeNumber + "-"
						+ storeNumber;
			} else {
				return "false";
			}
		}
		return "false";

	}

	// method called when verify button clicked on the IBT order create page
	@RequestMapping(value = "/autocomplete.htm", method = RequestMethod.GET)
	public ModelAndView autocomplete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		// //System.out.println("autocomplete");
		String vendordesc = (String) request.getParameter("vendorDesc");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		vendorNo = null;
		String srcOfSupp = (String) request.getParameter("sourceSupply");
		// //System.out.println("srcOfSupp" + srcOfSupp);
		// //System.out.println("vendorNo" + vendordesc);
		ArrayList<Vendor> supplierList;
		ArrayList<WareHouse> supplierList1;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));

		try {
			if ("1".equalsIgnoreCase(srcOfSupp)) {

				supplierList = articleService.getVendorList(vendordesc,
						maxRows, vendordesc, siteNo,user);
				modelAndView = new ModelAndView("VendorLookup");
				model.addAttribute("vendorList", supplierList);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

			else if ("2".equalsIgnoreCase(srcOfSupp)) {

				supplierList1 = articleService.getWareHouseList(vendordesc,
						maxRows, vendordesc,user);
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

	// method called when description search happened in IBT order create page
	@RequestMapping(value = "/getDescription.htm", method = RequestMethod.GET)
	public ModelAndView getDescription(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("");
		// //System.out.println("getDescription");
		String vendordesc = (String) request.getParameter("vendorDesc");

		String srcOfSupp = (String) request.getParameter("sourceSupply");
		// //System.out.println("srcOfSupp"+srcOfSupp);
		// //System.out.println("vendorNo"+vendordesc);
		String suppName = (String) request.getParameter("suppName");
		// //System.out.println("suppName"+suppName);

		model.addAttribute("param", param);

		ArrayList<Vendor> supplierList;
		ArrayList<WareHouse> supplierList1;
		// //System.out.println("vendorDesc" + vendordesc);
		articleDescriptionResults = new ArrayList<ArticleSearchResults>();
		ManualOrderParam orderParam = new ManualOrderParam();
		orderParam.setArticleType("desc");
		orderParam.setArticleNo(vendordesc);
		orderParam.setSiteNo(((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());

		boolean validStore = false;
		String storeNum = suppName;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			model.addAttribute("msgChk", "");
			if (srcOfSupp != null && srcOfSupp.trim().length() > 0) {

				if (srcOfSupp.equalsIgnoreCase("Store")) {
					if (suppName != null && suppName.trim().length() > 0) {
						ArrayList<Store> storeList = null;
						String[] storeNo = suppName.split("-");
						try {
							if (storeNo[0] != null) {
								storeNum = storeNo[0];
								storeList = orderService
										.getStoreDetails(storeNo[0],user);
							} else {
								storeList = orderService
										.getStoreDetails(storeNum,user);
							}

							if (storeList != null && storeList.size() > 0) {
								for (int index = 0; index < storeList.size(); index++) {
									if (storeNum.equalsIgnoreCase(storeList
											.get(index).getSiteNumber())) {
										param.setReceiveSiteNo(storeList.get(
												index).getSiteNumber());
										validStore = true;
									}
								}
							} else {
								modelAndView = new ModelAndView(
										"descriptionLookup");
								model.addAttribute("msgChk",
										"Please enter valid Store");
								model.addAttribute("manualOrderParam", param);
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}

							if (validStore) {

							} else {
								// //System.out.println(" valid store--->" +
								// validStore);
								modelAndView = new ModelAndView(
										"descriptionLookup");
								model.addAttribute("msgChk",
										"Please enter valid Store");
								model.addAttribute("manualOrderParam", param);
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}

						} catch (Exception e) {
							e.printStackTrace();
							modelAndView = new ModelAndView("descriptionLookup");
							model.addAttribute("msgChk",
									"Please enter valid Store");
							model.addAttribute("param", param);
							model.addAttribute("manualOrderParam", param);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					}

				} else {
					if (request.getParameter("warehouse") != null
							&& !request.getParameter("warehouse")
									.equalsIgnoreCase("0")) {
						param.setReceiveSiteNo(request
								.getParameter("warehouse"));
					}/*
					 * else{ if(param.getWarehouse()==null ||
					 * param.getWarehouse().trim().length()<=0){
					 * param.setReceiveSiteNo
					 * (request.getParameter("dropDownValWarehouse"));
					 * 
					 * } }
					 */

				}

			}

			// service call
			articleDescriptionResults = (ArrayList<ArticleSearchResults>) orderService
					.getManualOrders(orderParam,user);

			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				modelAndView = new ModelAndView("descriptionLookup");
				model.addAttribute("nodata", "N");
				model.addAttribute("vendordesc", vendordesc);
				model.addAttribute("size", articleDescriptionResults.size());
				model.addAttribute("divideSubmit", "N");
				model.addAttribute("vendorList", articleDescriptionResults);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			} else {
				modelAndView = new ModelAndView("descriptionLookup");
				model.addAttribute("nodata", "Y");
				model.addAttribute("divideSubmit", "N");
				model.addAttribute("vendordesc", vendordesc);
				model.addAttribute("size", "0");
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

	// method called when select button of description search result is clicked
	@RequestMapping(value = "/addArticleDescription.htm", method = RequestMethod.GET)
	public ModelAndView addArticleDescription(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("addArticleDescription");
		String index = request.getParameter("desIndex");
		ModelAndView modelAndView = new ModelAndView("ibtSite");
		param.setArticleNo(request.getParameter("articleNo"));
		param.setOrderQty(request.getParameter("ordqty"));
		param.setStoreNo(request.getParameter("storeNo"));
		param.setStoreName(request.getParameter("storeName"));
		param.setWarehouse(request.getParameter("warehouse"));
		model.addAttribute("buttonRetain", request.getParameter("ibtSiteType"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		model.addAttribute("param", param);
		// //System.out.println("index" + index);
		ArticleSearchResults article = null;
		if (addArtSearchResults != null && addArtSearchResults.size() != 0) {

			model.addAttribute("listSize", addArtSearchResults.size());
		}
		String[] indexArray = index.split(":");
		StringBuffer notRanged = new StringBuffer();
		StringBuffer deleted = new StringBuffer();
		for (int k = 0; k < indexArray.length; k++) {
			boolean flag = true;
			if (articleDescriptionResults != null
					&& articleDescriptionResults.size() > 0) {
				article = articleDescriptionResults.get(Integer
						.parseInt(indexArray[k]));
				// recv site check
				param.setArticleNo(article.getArticleNo());
				param.setArticleType("articleNo");
				String artRecvSiteChk = orderService
						.getArticleDetailsRecvSite(param,user);

				if (artRecvSiteChk.equalsIgnoreCase("false")) {
					notRanged.append(" '" + param.getArticleNo() + "',");
					flag = false;

					/*
					 * model.addAttribute( "msg", "Article '" +
					 * param.getArticleNo() +
					 * "' is not ranged to receiving site.");
					 * model.addAttribute("manualOrderParam", param);
					 * model.addAttribute("param", param);
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */

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
					 * model.addAttribute("manualOrderParam", param);
					 * model.addAttribute("param", param);
					 * modelAndView.addObject("model", model);
					 * modelAndView.addAllObjects(model); return modelAndView;
					 */
				}
				if (flag) {
					article.setUomFlag("1");
					if (addArtSearchResults != null
							&& addArtSearchResults.size() != 0) {
						for (int i = 0; i < addArtSearchResults.size(); i++) {
							if (addArtSearchResults.get(i).getEan11()
									.equals(article.getEan11())
									|| addArtSearchResults.get(i)
											.getArticleNo()
											.equals(article.getArticleNo())) {
								model.addAttribute("msg",
										"Article already exists in the list");
								model.addAttribute("param", param);
								modelAndView.addObject("model", model);
								modelAndView.addAllObjects(model);
								return modelAndView;
							}

						}
					}
					boolean validStore = false;
					String storeNum = request.getParameter("storeNo");
					try {
						if (request.getParameter("ibtSiteType") != null
								&& request.getParameter("ibtSiteType").trim()
										.length() > 0) {

							if (request.getParameter("ibtSiteType")
									.equalsIgnoreCase("Store")) {
								if (request.getParameter("storeNo") != null
										&& request.getParameter("storeNo")
												.trim().length() > 0) {
									ArrayList<Store> storeList = null;
									String[] storeNo = request.getParameter(
											"storeNo").split("-");
									try {
										if (storeNo[0] != null) {
											storeNum = storeNo[0];
											storeList = orderService
													.getStoreDetails(storeNo[0],user);
										} else {
											storeList = orderService
													.getStoreDetails(storeNum,user);
										}

										if (storeList != null
												&& storeList.size() > 0) {
											for (int index1 = 0; index1 < storeList
													.size(); index1++) {
												if (storeNum
														.equalsIgnoreCase(storeList
																.get(index1)
																.getSiteNumber())) {
													param.setReceiveSiteNo(storeList
															.get(index1)
															.getSiteNumber());
													validStore = true;
												}
											}
										} else {
											/*
											 * param.setSiteNo(((UserContext)
											 * request
											 * .getSession().getAttribute
											 * ("user")) .getSiteNo());
											 */
											model.addAttribute("msg",
													"Please enter valid Store");
											model.addAttribute(
													"manualOrderParam", param);
											modelAndView.addObject("model",
													model);
											modelAndView.addAllObjects(model);
											return modelAndView;
										}

										if (validStore) {

										} else {
											param.setSiteNo(((UserContext) request
													.getSession().getAttribute(
															"user"))
													.getSiteNo());
											model.addAttribute("msg",
													"Please enter valid Store");
											model.addAttribute(
													"manualOrderParam", param);
											modelAndView.addObject("model",
													model);
											modelAndView.addAllObjects(model);
											return modelAndView;
										}

									} catch (Exception e) {
										e.printStackTrace();
									}
								}
								// //System.out.println(" valid store--->" +
								// validStore);
							} else {
								if (request.getParameter("warehouse") != null
										&& !request.getParameter("warehouse")
												.equalsIgnoreCase("0")) {
									param.setReceiveSiteNo(request
											.getParameter("warehouse"));
								}/*
								 * else if(param.getWarehouse()==null ||
								 * param.getWarehouse().trim().length()<=0){
								 * param.setWarehouse(request.getParameter(
								 * "dropDownValWarehouse"));
								 * param.setReceiveSiteNo
								 * (request.getParameter("dropDownValWarehouse"
								 * ));
								 * 
								 * }
								 */

							}

						}
					} catch (Exception e) {
						e.printStackTrace();
					}

					try {
						Double totalOrdered = null;
						if (article.getBaseUOMDesc() != null
								&& article.getBaseUOMDesc() != "") {
							if (article.getBaseUOMDesc().equalsIgnoreCase(
									"each")) {
								if (param.getOrderQty() != null
										&& param.getOrderQty() != "") {
									if (Double.parseDouble(param.getOrderQty()) % 1 == 0) {
										totalOrdered = Double
												.parseDouble(article.getOM())
												* Double.parseDouble(param
														.getOrderQty());
										article.setInputQty(param.getOrderQty());
										article.setTotalOrdered(String
												.valueOf(totalOrdered
														.intValue()));
									} else {
										Integer qty = (int) Double
												.parseDouble(param
														.getOrderQty());
										Integer om = (int) Double
												.parseDouble(article.getOM());
										Integer total = qty * om;
										article.setInputQty(qty.toString());
										article.setTotalOrdered(total
												.toString());
										model.addAttribute("invalidQty", "true");
									}
								} else {
									article.setInputQty("");
									article.setTotalOrdered("0");
									model.addAttribute("invalidQty", "");
								}
							} else if (param.getOrderQty() != null
									&& param.getOrderQty() != "") {
								totalOrdered = Double.parseDouble(article
										.getOM())
										* Double.parseDouble(param
												.getOrderQty());
								article.setInputQty(param.getOrderQty());
								article.setTotalOrdered(String
										.valueOf(totalOrdered.intValue()));
								model.addAttribute("invalidQty", "");
							}
						} else {
							totalOrdered = Double.parseDouble(article.getOM())
									* Double.parseDouble(param.getOrderQty());
							article.setInputQty(param.getOrderQty());
							article.setTotalOrdered(String.valueOf(totalOrdered
									.intValue()));
							model.addAttribute("invalidQty", "");
						}
						// Double totalOrdered=null;
						// totalOrdered=Double.parseDouble(article.getOM())*Double.parseDouble(param.getOrderQty());
						model.addAttribute("msg", "");
						DateFormat dateFormat = new SimpleDateFormat(
								"dd/MM/yyyy");
						Date date = new Date();
						// //System.out.println(dateFormat.format(date));
						String currentDate = dateFormat.format(date);
						Calendar cal = Calendar.getInstance();
						cal.setTime(dateFormat.parse(currentDate));
						cal.add(Calendar.DATE, 0);
						String convertedDate = dateFormat.format(cal.getTime());
						article.setOrderDate(currentDate);
						article.setDeliveryDate(convertedDate);
						article.setSaveFlag("N");
						// article.setInputQty(param.getOrderQty());
						// article.setTotalOrdered(String.valueOf(totalOrdered.intValue()));
						addArtSearchResults.add(article);
						model.addAttribute("articleList", addArtSearchResults);
						if (addArtSearchResults != null
								&& addArtSearchResults.size() != 0) {

							model.addAttribute("listSize",
									addArtSearchResults.size());
						}
						// ////System.out.println();
						// articleSearchResultsforCreate.add(article);
					} catch (Exception e) {
						model.addAttribute("articleList", addArtSearchResults);
						model.addAttribute("manualOrderParam", param);
						model.addAttribute("param", param);
						model.addAttribute("msg", "");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
					}

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
				model.addAttribute("msg", "Article \"" + notRanged.toString()
						+ "\" is/are not ranged to receiving site.");
			}
		}

		model.addAttribute("articleList", addArtSearchResults);
		model.addAttribute("manualOrderParam", param);
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// this method is called to check store no validity.
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
				UserContext user = ((UserContext) request.getSession().getAttribute("user"));
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

	// this method is called to check the store no validation when verify button
	// clicked
	@RequestMapping(value = "/nearByStoreValidation.htm", method = RequestMethod.GET)
	public ModelAndView nearByStoreValidation(HttpServletRequest request,
			HttpServletResponse response) {
		ModelAndView modelAndView = new ModelAndView("siteDetails");
		String distance = request.getParameter("distance");
		String maxResults = request.getParameter("maxResults");
		String[] salesOrg = request.getParameterValues("salesOrg");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		model.addAttribute("flag", "Y");
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
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
							"Sorry no results returned for your search criteria. Please try again");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
				}
				return modelAndView;

			} catch (Exception e) {
				e.printStackTrace();
				storeList = new ArrayList<StoresNearByModel>();
				model.addAttribute("siteDtlsList", storeList);
				model.addAttribute("noSearchResults",
						"Sorry no results returned for your search criteria. Please try again");
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

	// method called when send now option is clicked on create IBT screen
	@RequestMapping(value = "/sendIBT.htm", method = RequestMethod.GET)
	@ResponseBody
	public String sendIBT(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside sendIBT");
		model.addAttribute("msg", "");
		String createStatus = null;
		String orderNo = request.getParameter("orderNo");
		String temperature = request.getParameter("temperatureForRecord");
		// //System.out.println(temperature);
		/*
		 * if(order!=null) { orderNo=order.getOrderNo(); }
		 */
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			createStatus = orderService.sendIBT(orderNo, temperature,user);
		} catch (Exception e) {
			// //System.out.println("inside catch");
			e.printStackTrace();
			return "false:IBT send failed,Due to Service unavaliabilty";
		}
		if (createStatus == null) {
			// articleSearchResultsforCreate=new
			// ArrayList<ArticleSearchResults>();
			/*
			 * String siteNo=((UserContext)
			 * request.getSession().getAttribute("user")).getSiteNo();
			 * ArrayList<Order> tempList=callOrderService(orderNo, siteNo);
			 *//*
				 * if(tempList!=null && tempList.size()>0 &&
				 * tempList.get(0).getOrderStatus()!=null &&
				 * tempList.get(0).getOrderStatus()!="" &&
				 * tempList.get(0).getOrderStatus
				 * ().equalsIgnoreCase(Authorized)){ if(order!=null){
				 * order.setOrderStatus(Authorized); } if(orderDet!=null){
				 * orderDet.setOrderStatus(Authorized); } if(orderList!=null &&
				 * orderList.size()>0){ for(int i=0;i<orderList.size();i++){
				 * if(orderList.get(i).getOrderNo().equalsIgnoreCase(orderNo)) {
				 * orderList.get(i).setOrderStatus(Authorized); break; } } }
				 */
			return "true:IBT Order sent successfully";

		} else {
			return "false:IBT send failed due to SAP error -" + createStatus;
		}

		// return "false:IBT send failed due to SAP error -"+createStatus;

	}

	// this method is called to cancel the goods order
	@RequestMapping(value = "/cancelGoodsOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String cancelGoodsOrder(HttpServletRequest request,
			HttpServletResponse response) {
		// //System.out.println("inside cancel cal blk in controller");
		receiveParam = new ReceiveParam();
		/*
		 * try{ receiveParam.setOrderNo(order.getOrderNo()); }catch(Exception
		 * e){ //receiveParam.setOrderNo(request.getParameter("orderNo")); }
		 */
		CancelOrderParam cancelOrderParam = new CancelOrderParam();
		// //System.out.println(request.getParameter("goodsSite")+"Site NO");
		if (request.getParameter("goodsSite") != null
				&& request.getParameter("goodsSite").trim().length() > 0) {
			cancelOrderParam.setSiteNo(request.getParameter("goodsSite"));
		} else {
			cancelOrderParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());
		}
		if (request.getParameter("orderNoToCanel") != null
				&& request.getParameter("orderNoToCanel").trim().length() > 0) {
			cancelOrderParam
					.setPurOrdNo(request.getParameter("orderNoToCanel"));
		}

		// ////System.out.println("order no from object"+order.getOrderNo());
		String createStatus = "";
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			createStatus = orderService.cancelOrder(cancelOrderParam,user);
		} catch (Exception e) {
		}
		String postStatus = null;
		if (createStatus == null) {
			postStatus = "true";
			// Request for cancelling the Order is successfully submitted
			/*
			 * cancelStatus=true; order.setOrderStatus("Cancelled");
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
			// cancelStatus=false;
		}

		return postStatus;
	}

	@RequestMapping(value = "/validateStoreForDes.htm", method = RequestMethod.GET)
	@ResponseBody
	public String validateStoreForDes(HttpServletRequest request,
			HttpServletResponse response) {
		String storeNumber = "";
		String storeName = "";
		if (request.getParameter("ibtSiteType") != null
				&& request.getParameter("ibtSiteType").trim().length() > 0
				&& request.getParameter("ibtSiteType")
						.equalsIgnoreCase("Store")) {
			boolean validStore = false;
			if (request.getParameter("storeNo") != null
					&& request.getParameter("storeNo").trim().length() > 0) {

				ArrayList<Store> storeList = null;
				String[] storeNo = request.getParameter("storeNo").split("-");
				String storeVal = request.getParameter("storeNo");
				UserContext user = ((UserContext) request.getSession().getAttribute("user"));
				try {
					if (storeNo[0] != null) {
						storeVal = storeNo[0];
						storeList = orderService.getStoreDetails(storeVal,user);

					} else {
						storeList = orderService.getStoreDetails(storeVal,user);
					}

					if (storeList != null && storeList.size() > 0) {
						for (int index = 0; index < storeList.size(); index++) {
							if (storeVal.equalsIgnoreCase(storeList.get(index)
									.getSiteNumber())) {
								validStore = true;
								storeNumber = storeList.get(index)
										.getSiteNumber();
								storeName = storeList.get(index)
										.getSiteDescription();
								return "true";
							}
						}
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
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
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
