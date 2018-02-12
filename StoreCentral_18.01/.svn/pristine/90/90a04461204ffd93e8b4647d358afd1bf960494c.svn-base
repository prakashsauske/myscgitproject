package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleBasicViewDetails;
import au.com.woolworths.portal.model.ArticleFreshFoodLabels;
import au.com.woolworths.portal.model.ArticleGtinInfo;
import au.com.woolworths.portal.model.ArticleNutritionalResult;
import au.com.woolworths.portal.model.ArticlePackBreakdown;
import au.com.woolworths.portal.model.ArticleProductNotes;
import au.com.woolworths.portal.model.ArticlePurchasingView;
import au.com.woolworths.portal.model.ArticleSalesView;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.ArticleSellPriceView;
import au.com.woolworths.portal.model.ArticleSiteView;
import au.com.woolworths.portal.model.InventorySITInfo;
import au.com.woolworths.portal.model.InventorySOHInfo;
import au.com.woolworths.portal.model.InventorySOOInfo;
import au.com.woolworths.portal.model.Location;
import au.com.woolworths.portal.model.NearbySiteInventory;
import au.com.woolworths.portal.model.NearbyStoreSearchInfo;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.param.InventoryParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InventoryServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

@Controller
@RequestMapping(value = "*/inventory")
@Scope("session")
public class InventoryController extends BaseController {
	@Autowired
	private InventoryServiceImpl inventoryService;

	public InventoryServiceImpl getInventoryService() {
		return inventoryService;
	}

	@Autowired
	public void setInventoryService(InventoryServiceImpl inventoryService) {
		this.inventoryService = inventoryService;
	}

	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private ArticleServiceImpl articleService;

	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	@Autowired
	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	public InventoryController() {
		this.param = new InventoryParam();
		this.model = new ModelMap();
	}

	String noData = "NO DATA FOUND";
	private InventoryParam param;
	private ModelMap model;
	List<NearbyStoreSearchInfo> nearbyStoreSearchInfo = null;
	List<InventorySOHInfo> inventorySOHInfo = null;
	List<InventorySITInfo> inventorySITInfo = null;
	List<InventorySOOInfo> inventorySOOInfo = null;
	List<ArticleSiteView> articleSiteViewList = null;
	List<ArticlePurchasingView> articlePurchasingViewList = null;
	List<Location> locationList = null;
	List<ArticleSellPriceView> articleSellPriceViewList = null;
	List<ArticleBasicViewDetails> articleBasicViewDetailsList = null;
	List<ArticleSalesView> articleSalesViewList = null;
	List<NearbySiteInventory> displayInventoryList = null;

	ArrayList<SalesOrgModel> salesOrgTypes;
	private ArticleParam artiparam;

	@RequestMapping(value = "/onPageLoadNearbyStoreSearch.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadNearbyStoreSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// //System.out.println("articleNo : "+request.getParameter("articleNo"));
		String articleNo = null;
		String articleBaseUom = null;
		articleBaseUom = request.getParameter("articleBaseUom");
		model.addAttribute("articleBaseUom", articleBaseUom);
		articleNo = request.getParameter("articleNo");
		articleNo = articleNo.replaceFirst("^0+(?!$)", "");
		// //System.out.println("articleNo : "+articleNo);
		param = new InventoryParam();
		setSalesOrg(request, true);

		param.setArticleNo(articleNo);
		// param.setArticleNo(request.getParameter("articleNo"));
		param.setArticleName(request.getParameter("articleName"));

		param.setDistance(20);
		param.setMaxStores(10);
		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		param.setSiteNo(context.getSiteNo());
		param.setSalesOrg(String.valueOf(context.getSalesOrg()));// sales org
		model.addAttribute("param", param);
		model.addAttribute("msg", "");
		nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();

		ModelAndView modelAndView = new ModelAndView("NearbyStoreSearch");

		model.addAttribute("msg", "");
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		// Calling nearby StoreSearch
		try {

			nearbyStoreSearchInfo = inventoryService.NearbyStoreSearch(param,user);
			if (nearbyStoreSearchInfo == null
					|| nearbyStoreSearchInfo.size() <= 0) {
				model.addAttribute(
						"msg",
						"We could not find store information for selected parameters. Please try different parameters.");

			} else if (nearbyStoreSearchInfo != null
					&& nearbyStoreSearchInfo.size() == 1
					&& nearbyStoreSearchInfo.get(0).getSiteNo().trim().length() <= 0
					&& nearbyStoreSearchInfo.get(0).getSiteName().trim()
							.length() <= 0) {
				model.addAttribute(
						"msg",
						"We could not find store information for selected parameters. Please try different parameters.");

			} else if (nearbyStoreSearchInfo != null
					&& nearbyStoreSearchInfo.size() > 1
					&& nearbyStoreSearchInfo.get(0).getSiteNo().trim().length() <= 0
					&& nearbyStoreSearchInfo.get(0).getSiteName().trim()
							.length() <= 0) {
				nearbyStoreSearchInfo.remove(0);
				for (NearbyStoreSearchInfo nearbyStoreSearchData : nearbyStoreSearchInfo) {
					nearbyStoreSearchData.setArticleNo(nearbyStoreSearchData
							.getArticleNo().replaceFirst("^0+(?!$)", ""));
					nearbyStoreSearchData
							.setProximity(Math.round(Double
									.parseDouble(nearbyStoreSearchData
											.getDistance()) * 100.00) / 100.00);
				}

			} else {
				for (NearbyStoreSearchInfo nearbyStoreSearchData : nearbyStoreSearchInfo) {
					nearbyStoreSearchData.setArticleNo(nearbyStoreSearchData
							.getArticleNo().replaceFirst("^0+(?!$)", ""));
					nearbyStoreSearchData
							.setProximity(Math.round(Double
									.parseDouble(nearbyStoreSearchData
											.getDistance()) * 100.00) / 100.00);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			// //System.out.println("exception" );
			model.addAttribute(
					"msg",
					"We could not find store information for selected parameters. Please try different parameters.");
			nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		}
		param.setSiteNo("");
		model.addAttribute("nearbyStoreSearchInfo", nearbyStoreSearchInfo);
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/onPageLoadNearbySiteSearch.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadNearbySiteSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		// //System.out.println("articleNo : "+request.getParameter("articleNo"));

		param = new InventoryParam();
		param.setArticleNo(request.getParameter("articleNo"));
		param.setDistance(20);
		param.setMaxStores(10);
		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		param.setSiteNo(context.getSiteNo());
		model.addAttribute("param", param);
		displayInventoryList = new ArrayList<NearbySiteInventory>();
		model.addAttribute("displayInventoryList", displayInventoryList);
		ModelAndView modelAndView = new ModelAndView("NearbySiteSearch");

		setSalesOrg(request, true);

		nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		model.addAttribute("msg", "");
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		// Calling nearby StoreSearch
		try {

			nearbyStoreSearchInfo = inventoryService.NearbyStoreSearch(param,user);
			if (nearbyStoreSearchInfo == null
					|| nearbyStoreSearchInfo.size() <= 0) {
				model.addAttribute(
						"msg",
						"We could not find store information for selected parameters. Please try different parameters.");

			} else {
				for (NearbyStoreSearchInfo nearbyStoreSearchData : nearbyStoreSearchInfo) {
					nearbyStoreSearchData.setArticleNo(nearbyStoreSearchData
							.getArticleNo().replaceFirst("^0+(?!$)", ""));
					nearbyStoreSearchData
							.setProximity(Math.round(Double
									.parseDouble(nearbyStoreSearchData
											.getDistance()) * 100.00) / 100.00);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			// //System.out.println("exception" );
			model.addAttribute(
					"msg",
					"We could not find store information for selected parameters. Please try different parameters.");
			nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		}

		model.addAttribute("nearbyStoreSearchInfo", nearbyStoreSearchInfo);
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/onPageLoadNearbyStoreSearchBack.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadNearbyStoreSearchBack(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// //System.out.println("Calling onPageLoadNearbyStoreSearchBack");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// ////System.out.println("WebUtils.hasSubmitParameter"+WebUtils.hasSubmitParameter(request,
		// "requestStoreArticleDetail"));
		ModelAndView modelAndView = new ModelAndView("NearbyStoreSearch");
		model.addAttribute("msg", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
		// return new ModelAndView("NearbyStoreSearch");
	}

	@RequestMapping(value = "/onPageLoadArticleDetail.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadArticleDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// //System.out.println("calling onPageLoadArticleDetail");
		ModelAndView modelAndView = new ModelAndView("articleDetails");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/requestNearbyStoreSearch.htm", method = RequestMethod.POST)
	public ModelAndView requestNearbyStoreSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestNearbyStoreSearch--InventoryController");

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		// Call service and populate
		// //System.out.println("Article: " + request.getParameter("articleNo")
		// + ", Site: " + request.getParameter("siteNo") + ", Sales Org: "
		// + request.getParameter("salesOrg") + ", Dist Chnl: "
		// + request.getParameter("distributionChannel"));
		param = new InventoryParam();
		param.setSiteNo(request.getParameter("siteNo"));
		param.setArticleNo(request.getParameter("articleNo"));
		param.setDistance(Integer.parseInt(request.getParameter("distance")));
		param.setMaxStores(Integer.parseInt(request.getParameter("maxStores")));
		param.setSalesOrg(request.getParameter("salesOrg"));

		// new
		param.setCheckedValues(request.getParameter("checkedValues"));

		param.setArticleName(request.getParameter("articleName"));
		nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		model.addAttribute("msg", "");

		String[] checkBoxValues = new String[30];
		checkBoxValues = request.getParameterValues("salesOrg");
		// //System.out.println("chk box vals in controller");

		setSalesOrg(request, false);

		if (checkBoxValues != null) {

			for (int i = 0; i < checkBoxValues.length; i++) {
				param.setSalesOrg(checkBoxValues[i]);
				// //System.out.println("" + checkBoxValues[i]);

				if (null != salesOrgTypes) {
					for (SalesOrgModel salesOrg : salesOrgTypes) {
						if (salesOrg.getSalesOrgNO().equals(checkBoxValues[i])) {
							salesOrg.setChecked("Y");
							if (i == 0)
								param.setSalesOrgLabel(salesOrg.getSalesOrgNO()
										+ "|" + salesOrg.getSalesOrgName());
							break;
						}
					}
				}

			}
			model.addAttribute("salesOrgTypes", salesOrgTypes);
		} else {
			param.setSalesOrgLabel("Select");
		}
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		
		// Calling nearby StoreSearch
		try {

			nearbyStoreSearchInfo = inventoryService.NearbyStoreSearchNew(
					param, checkBoxValues,user);
			if (nearbyStoreSearchInfo == null
					|| nearbyStoreSearchInfo.size() <= 0) {
				model.addAttribute("msg",
						"Sorry no results returned for your search criteria. Please try again");

			} else if (nearbyStoreSearchInfo != null
					&& nearbyStoreSearchInfo.size() == 1
					&& nearbyStoreSearchInfo.get(0).getSiteNo().trim().length() <= 0
					&& nearbyStoreSearchInfo.get(0).getSiteName().trim()
							.length() <= 0) {
				model.addAttribute(
						"msg",
						"We could not find store information for selected parameters. Please try different parameters.");

			} else if (nearbyStoreSearchInfo != null
					&& nearbyStoreSearchInfo.size() > 1
					&& nearbyStoreSearchInfo.get(0).getSiteNo().trim().length() <= 0
					&& nearbyStoreSearchInfo.get(0).getSiteName().trim()
							.length() <= 0) {
				nearbyStoreSearchInfo.remove(0);
				for (NearbyStoreSearchInfo nearbyStoreSearchData : nearbyStoreSearchInfo) {
					nearbyStoreSearchData.setArticleNo(nearbyStoreSearchData
							.getArticleNo().replaceFirst("^0+(?!$)", ""));
					nearbyStoreSearchData
							.setProximity(Math.round(Double
									.parseDouble(nearbyStoreSearchData
											.getDistance()) * 100.00) / 100.00);
				}

			} else {
				for (NearbyStoreSearchInfo nearbyStoreSearchData : nearbyStoreSearchInfo) {
					nearbyStoreSearchData.setArticleNo(nearbyStoreSearchData
							.getArticleNo().replaceFirst("^0+(?!$)", ""));
					nearbyStoreSearchData
							.setProximity(Math.round(Double
									.parseDouble(nearbyStoreSearchData
											.getDistance()) * 100.00) / 100.00);
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			// //System.out.println("exception" );
			model.addAttribute("msg",
					"Sorry no results returned for your search criteria. Please try again");
			nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		}

		model.addAttribute("nearbyStoreSearchInfo", nearbyStoreSearchInfo);
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("NearbyStoreSearch");
		modelAndView.addObject("model", model);

		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/requestStoreArticleDetail.htm", method = RequestMethod.GET)
	public ModelAndView requestStoreArticleDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("inside requestStoreArticleDetail");

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = null;
		// //System.out.println(" in try");
		try {

			// TODO change
			NearbyStoreSearchInfo nearbyStoreSearchArticleInfo = null;
			if (request.getParameter("index") != null) {
				nearbyStoreSearchArticleInfo = (NearbyStoreSearchInfo) nearbyStoreSearchInfo
						.get(Integer.parseInt(request.getParameter("index")));
			} else {
				nearbyStoreSearchArticleInfo = (NearbyStoreSearchInfo) nearbyStoreSearchInfo
						.get(0);
			}
			UserContext user = ((UserContext) request.getSession().getAttribute("user"));
			model.addAttribute("msg", "");
			artiparam = new ArticleParam();
			artiparam.setArticleNo(nearbyStoreSearchArticleInfo.getArticleNo());
			artiparam.setSiteNo(nearbyStoreSearchArticleInfo.getSiteNo());
			artiparam.setRangeFlag("N");
			List<ArticleSearchResults> articleSearchResults = articleService
					.getArticleDetails(artiparam,user);

			if (articleSearchResults == null
					|| articleSearchResults.size() == 0) {

				model.addAttribute("articleSearchResutls",
						new ArticleSearchResults());
				model.addAttribute("noData", "No Data Found");
				model.addAttribute("isSellPrice", false);
				return modelAndView;
			} else {

				modelAndView = new ModelAndView("articleDtls", "param",
						artiparam);
				model.addAttribute("articleSearchResutls",
						articleSearchResults.get(0));

				if ("Y".equalsIgnoreCase(articleSearchResults.get(0)
						.getRangedFlag()))
					model.addAttribute("isSellPrice", true);
				else
					model.addAttribute("isSellPrice", false);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);

				return modelAndView;
			}

			// BASIC
			/*
			 * try { List<ArticleBasicViewDetails> articleBasicViewDetailsList =
			 * articleService .getArticleBasicView(artiparam); if
			 * (articleBasicViewDetailsList != null &&
			 * articleBasicViewDetailsList.size() != 0) {
			 * 
			 * model.addAttribute("articleBasicViewDetails",
			 * articleBasicViewDetailsList.get(0)); } else {
			 * 
			 * model.addAttribute("articleBasicViewDetails", new
			 * ArticleBasicViewDetails()); modelAndView = new
			 * ModelAndView("articleSearch", "param", param);
			 * model.addAttribute("noData", "No Data Found");
			 * modelAndView.addObject("model", model);
			 * modelAndView.addAllObjects(model); return modelAndView; } } catch
			 * (Exception e) {
			 * 
			 * model.addAttribute("noData", "No Data Found");
			 * model.addAttribute("articleBasicViewDetails", new
			 * ArticleBasicViewDetails()); modelAndView = new
			 * ModelAndView("articleSearch", "param", param); //
			 * model.addAttribute("noData", noData);
			 * modelAndView.addObject("model", model);
			 * modelAndView.addAllObjects(model); return modelAndView; } // SELL
			 * PRICE List<ArticleSellPriceView> articleSellPriceViewList = null;
			 * try { articleSellPriceViewList = articleService
			 * .getSellPriceView(artiparam);
			 * 
			 * ////System.out.println("******* articleSellPriceViewList "+
			 * articleSellPriceViewList);
			 * 
			 * if (articleSellPriceViewList != null &&
			 * articleSellPriceViewList.size() != 0) {
			 * model.addAttribute("articleSellPriceViewList",
			 * articleSellPriceViewList); } else {
			 * model.addAttribute("articleSellPriceViewList", new
			 * ArrayList<ArticleSellPriceView>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("articleSellPriceViewList", new
			 * ArrayList<ArticleSellPriceView>()); } boolean isSellPrice = true;
			 * if(articleSellPriceViewList == null){ isSellPrice = false; }else
			 * if (articleSellPriceViewList != null &&
			 * articleSellPriceViewList.size() != 0) { ArticleSellPriceView
			 * articleSellPriceView = articleSellPriceViewList .get(0);
			 * 
			 * String sellPrice = articleSellPriceView.getSalesPrice();
			 * ////System.out.println(" request article details sellPrice "
			 * +sellPrice); if (sellPrice == null || sellPrice.equals("")) {
			 * //system
			 * .out.println("request article details sellPrice null checker");
			 * isSellPrice = false; } }else if (articleSellPriceViewList != null
			 * && articleSellPriceViewList.size() == 0) { isSellPrice = false; }
			 * ////System.out.println(" ***** SELL PRICE " + isSellPrice);
			 * model.addAttribute("isSellPrice", isSellPrice); // GTIN try {
			 * List<ArticleGtinInfo> articleGtinList = articleService
			 * .getGtinView(artiparam);
			 * 
			 * if (articleGtinList != null && articleGtinList.size() != 0) {
			 * model.addAttribute("articleGtinList", articleGtinList); } else {
			 * model.addAttribute("articleGtinList", new
			 * ArrayList<ArticleGtinInfo>()); } } catch (Exception e) {
			 * model.addAttribute("noData", "No Data Found");
			 * model.addAttribute("articleGtinList", new
			 * ArrayList<ArticleGtinInfo>()); }
			 * 
			 * if (isSellPrice) { // SALE VIEW try { List<ArticleSalesView>
			 * articleSalesViewList = articleService
			 * .getSalesViewInfo(artiparam); if (articleSalesViewList != null &&
			 * articleSalesViewList.size() != 0) {
			 * model.addAttribute("articleSalesViewList", articleSalesViewList);
			 * } else { model.addAttribute("articleSalesViewList", new
			 * ArrayList<ArticleSalesView>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("articleSalesViewList", new
			 * ArrayList<ArticleSalesView>()); } // PURCHASE VIEW try {
			 * List<ArticlePurchasingView> articlePurchasingViewList =
			 * articleService .getPurchasingView(artiparam); if
			 * (articlePurchasingViewList != null &&
			 * articlePurchasingViewList.size() != 0) {
			 * model.addAttribute("articlePurchasingViewList",
			 * articlePurchasingViewList); } else {
			 * model.addAttribute("articlePurchasingViewList", new
			 * ArrayList<ArticlePurchasingView>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("articlePurchasingViewList", new
			 * ArrayList<ArticlePurchasingView>()); } // SITE
			 * 
			 * // INVENTORY SOH try { List<InventorySOHInfo> inventorySOHInfo =
			 * articleService .getStockOnHand(artiparam.getArticleNo(),
			 * artiparam.getSiteNo()); if (inventorySOHInfo != null &&
			 * inventorySOHInfo.size() != 0) {
			 * model.addAttribute("inventorySOHInfo", inventorySOHInfo); } else
			 * { model.addAttribute("inventorySOHInfo", new
			 * ArrayList<InventorySOHInfo>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("inventorySOHInfo", new
			 * ArrayList<InventorySOHInfo>()); } // INVENTORY SIT try {
			 * List<InventorySITInfo> inventorySITInfo = articleService
			 * .getStockinTransit(artiparam.getArticleNo(),
			 * artiparam.getSiteNo()); if (inventorySITInfo != null &&
			 * inventorySITInfo.size() != 0) {
			 * model.addAttribute("inventorySITInfo", inventorySITInfo); } else
			 * { model.addAttribute("inventorySITInfo", new
			 * ArrayList<InventorySITInfo>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("inventorySITInfo", new
			 * ArrayList<InventorySITInfo>()); }
			 * 
			 * // INVENTORY SOO try { List<InventorySOOInfo> inventorySOOInfo =
			 * articleService .getStockonOrder(artiparam.getArticleNo(),
			 * artiparam.getSiteNo()); if (inventorySOOInfo != null &&
			 * inventorySOOInfo.size() != 0) {
			 * model.addAttribute("inventorySOOInfo", inventorySOOInfo); } else
			 * { model.addAttribute("inventorySOOInfo", new
			 * ArrayList<InventorySOOInfo>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("inventorySOOInfo", new
			 * ArrayList<InventorySOOInfo>()); } } // CUSTOM DATA try {
			 * List<ArticlePOSData> posDataInfo = articleService
			 * .getArticlePosData(artiparam);
			 * 
			 * if (posDataInfo != null && posDataInfo.size() != 0) {
			 * model.addAttribute("posDataInfo", posDataInfo); } else {
			 * model.addAttribute("posDataInfo", new
			 * ArrayList<ArticlePOSData>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("posDataInfo", new
			 * ArrayList<ArticlePOSData>()); }
			 */

			// if (param.getArticleNo() != null && param.getSiteNo() != null
			// && !param.getSiteNo().equals("")
			// && !param.getArticleNo().equals("")) {

		} catch (Exception e) {
			e.printStackTrace();

			model.addAttribute("noData", "No Data Found");
			model.addAttribute("articleSearchResutls",
					new ArticleSearchResults());
			modelAndView = new ModelAndView("articleDtls", "param", artiparam);
			model.addAttribute("inventoryFlag", "inventoryFlag");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);

		}

		modelAndView = new ModelAndView("articleDtls");
		model.addAttribute("inventoryFlag", "inventoryFlag");
		model.addAttribute("param", artiparam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	@RequestMapping(value = "/requestNearbySiteSearch.htm", method = RequestMethod.GET)
	public String requestNearbySiteSearchGet(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("requestSearch--InventoryController");

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "redirect:/";
		} else {
			return "NearbySiteSearch";
		}
	}

	/*
	 * @RequestMapping(value = "/requestNearbySiteSearch.htm", method =
	 * RequestMethod.POST) public ModelAndView
	 * requestNearbySiteSearch(HttpServletRequest request, HttpServletResponse
	 * response) throws Exception {
	 * ////System.out.println("requestSearch--InventoryController");
	 * 
	 * if (request.getSession(false) == null || (request.getSession(false) !=
	 * null && request.getSession( false).getAttribute("user") == null)) {
	 * return new ModelAndView(new RedirectView("../../")); }
	 * 
	 * // Call service and populate ////System.out.println("Article: " +
	 * request.getParameter("articleNo") + ", Site: " +
	 * request.getParameter("siteNo") + ", Sales Org: " +
	 * request.getParameter("salesOrg") + ", Dist Chnl: " +
	 * request.getParameter("distributionChannel")); param = new
	 * InventoryParam(); param.setSiteNo(request.getParameter("siteNo"));
	 * param.setArticleNo(request.getParameter("articleNo"));
	 * param.setDistance(Integer.parseInt(request.getParameter("distance")));
	 * param.setMaxStores(Integer.parseInt(request.getParameter("maxStores")));
	 * param.setSalesOrg(request.getParameter("salesOrg"));
	 * //model.addAttribute("param", param); locationList =
	 * inventoryService.getSitesbyDistance(param);
	 * 
	 * StringBuilder sb = new StringBuilder(); for (int i = 0; i <
	 * locationList.size(); i++) { if (sb.length() > 0) { sb.append(';'); }
	 * sb.append(locationList.get(i).getNo()); }
	 * ////System.out.println(locationList.get(0).getNo());
	 * 
	 * String Locationresult = sb.toString();
	 * param.setLocationResult(Locationresult);
	 * ////System.out.println("Locationresult: " + Locationresult); // try { //
	 * ////System.out.println("calling getGtinViewList"); // List<ArticleGtinInfo>
	 * articleGtinList = inventoryService // .getGtinViewList(param); // // if
	 * (articleGtinList != null && articleGtinList.size() != 0) { //
	 * model.addAttribute("articleGtinList", articleGtinList); // } else { //
	 * model.addAttribute("articleGtinList", new ArticleGtinInfo()); // } // }
	 * catch (Exception e) { // model.addAttribute("noData", "No Data Found");
	 * // model.addAttribute("articleSellPriceViewList", // new
	 * ArrayList<ArticleSellPriceView>()); // } // try { //
	 * ////System.out.println("calling getGtinViewList"); //
	 * inventoryService.getadjustedSOHService(); // // // } catch (Exception e)
	 * { // e.printStackTrace(); // } // try{ // articleBasicViewDetailsList =
	 * inventoryService // .getArticleBasicViewList(param); // if
	 * (articleBasicViewDetailsList != null // &&
	 * articleBasicViewDetailsList.size() != 0) { // // //
	 * model.addAttribute("articleBasicViewDetails", //
	 * articleBasicViewDetailsList.get(0)); // } else { // //
	 * model.addAttribute("articleBasicViewDetails", // new
	 * ArticleBasicViewDetails()); // } // } catch (Exception e) { //
	 * model.addAttribute("noData", "No Data Found"); //
	 * model.addAttribute("articleSellPriceViewList", // new
	 * ArrayList<ArticleSellPriceView>()); // } // List<ArticleSellPriceView>
	 * articleSellPriceViewList=new ArrayList<ArticleSellPriceView>(); // try {
	 * // articleSalesViewList = inventoryService //
	 * .getSalesViewList(param.getArticleNo(), Locationresult); //
	 * model.addAttribute("articleSalesViewList",articleSalesViewList); // }
	 * catch (Exception e) { // model.addAttribute("notRanged",
	 * "Article Not Ranged"); // model.addAttribute("articleSalesViewList", //
	 * new ArrayList<ArticleSalesView>()); // } // // Calling Stock On Hand
	 * Service try {
	 * 
	 * inventorySOHInfo = inventoryService .getStockOnHand(param);
	 * ////System.out.println("inventorySOHInfo"+ inventorySOHInfo.size());
	 * 
	 * } catch(Exception e) { ////System.out.println("exception");
	 * inventorySOHInfo= new ArrayList<InventorySOHInfo>(); }
	 * 
	 * // Calling Stock in Transit Service try { inventorySITInfo =
	 * inventoryService .getStockinTransit(param);
	 * ////System.out.println("inventorySITInfo"+ inventorySITInfo.size());
	 * 
	 * } catch(Exception e) { ////System.out.println("exception");
	 * inventorySITInfo= new ArrayList<InventorySITInfo>(); } try { // Calling
	 * Stock on Order Service inventorySOOInfo = inventoryService
	 * .getStockonOrder(param); ////System.out.println("inventorySOOInfo"+
	 * inventorySOOInfo.size());
	 * 
	 * }
	 * 
	 * catch(Exception e) { ////System.out.println("exception"); inventorySOOInfo=
	 * new ArrayList<InventorySOOInfo>(); } // try // { // articleSiteViewList =
	 * inventoryService // .getSiteViewList(param.getArticleNo(),
	 * Locationresult); // ////System.out.println("articleSiteViewList"+
	 * articleSiteViewList.size()); // // } // catch(Exception e) // { //
	 * ////System.out.println("exception"); // articleSiteViewList= new
	 * ArrayList<ArticleSiteView>(); // } // // try // { //
	 * articlePurchasingViewList = //
	 * inventoryService.getPurchasingViewList(param.getArticleNo(),
	 * Locationresult); // ////System.out.println("articlePurchasingViewList"+
	 * articlePurchasingViewList.size()); // // } // catch(Exception e) // { //
	 * ////System.out.println("exception"); // articlePurchasingViewList= new
	 * ArrayList<ArticlePurchasingView>(); // } // // //
	 * 
	 * List<ArticleSellPriceView> articleSellPriceViewList=new
	 * ArrayList<ArticleSellPriceView>(); try { articleSellPriceViewList =
	 * inventoryService .getSellPriceViewList(param.getArticleNo(),
	 * Locationresult);
	 * model.addAttribute("articleSellPriceViewList",articleSellPriceViewList );
	 * } catch (Exception e) { model.addAttribute("notRanged",
	 * "Article Not Ranged"); model.addAttribute("articleSellPriceViewList", new
	 * ArrayList<ArticleSellPriceView>()); }
	 * 
	 * 
	 * Map<String,InventorySOHInfo> getSOHsiteNos = new
	 * TreeMap<String,InventorySOHInfo>(); for (InventorySOHInfo SOHInfo :
	 * inventorySOHInfo) {
	 * 
	 * getSOHsiteNos.put(SOHInfo.getSiteNo(),SOHInfo); }
	 * ////System.out.println("getSOHsiteNos" + getSOHsiteNos.size());
	 * 
	 * Map<String,InventorySITInfo> getSITsiteNos = new
	 * TreeMap<String,InventorySITInfo>(); for (InventorySITInfo SITInfo :
	 * inventorySITInfo) { getSITsiteNos.put(SITInfo.getSiteNo(),SITInfo); }
	 * ////System.out.println("getSITsiteNos" + getSITsiteNos.size());
	 * 
	 * Map<String,InventorySOOInfo> getSOOsiteNos = new
	 * TreeMap<String,InventorySOOInfo>(); for (InventorySOOInfo SOOInfo :
	 * inventorySOOInfo) { getSOOsiteNos.put(SOOInfo.getSiteNo(),SOOInfo); }
	 * ////System.out.println("getSOOsiteNos" + getSOOsiteNos.size());
	 * 
	 * 
	 * // Map<String,ArticleSiteView> getarticlesiteNos = new
	 * TreeMap<String,ArticleSiteView>(); // for (ArticleSiteView siteInfo :
	 * articleSiteViewList) { //
	 * getarticlesiteNos.put(siteInfo.getSiteNo(),siteInfo); // } //
	 * ////System.out.println("getarticlesiteNos" + getarticlesiteNos.size()); //
	 * // Map<String,ArticlePurchasingView> getPurchasingViewList = new
	 * TreeMap<String,ArticlePurchasingView>(); // for (ArticlePurchasingView
	 * purchaseView : articlePurchasingViewList) { //
	 * getPurchasingViewList.put(purchaseView.getSiteNo(),purchaseView); // } //
	 * ////System.out.println("getPurchasingViewList" +
	 * getPurchasingViewList.size()); // // Map<String,ArticleSalesView>
	 * getSaleViewList = new TreeMap<String,ArticleSalesView>(); // for
	 * (ArticleSalesView saleView : articleSalesViewList) { //
	 * getSaleViewList.put(saleView.getSiteNo(),saleView); // } //
	 * ////System.out.println("saleView" + getSaleViewList.size());
	 * 
	 * Map<String,ArticleSellPriceView> getSellPriceViewList = new
	 * TreeMap<String,ArticleSellPriceView>(); for (ArticleSellPriceView
	 * salesPrice : articleSellPriceViewList) {
	 * getSellPriceViewList.put(salesPrice.getSiteNo(),salesPrice); }
	 * ////System.out.println("getSellPriceViewList" +
	 * getSellPriceViewList.size());
	 * 
	 * 
	 * int i=0; String siteNoKey =null; NearbySiteInventory nearbySiteInv =null;
	 * displayInventoryList = new ArrayList<NearbySiteInventory>(); for(Location
	 * location: locationList){ siteNoKey = location.getNo();
	 * //////System.out.println("siteNoKey"+siteNoKey); nearbySiteInv = new
	 * NearbySiteInventory(); // nearbySiteInv.setSalePriceView(salePriceView);
	 * // nearbySiteInv.setSaleView(saleView); DecimalFormat twoDForm = new
	 * DecimalFormat("#.##");
	 * 
	 * //////System.out.println(twoDForm.format(Double.parseDouble(location.
	 * getDistance()))); nearbySiteInv.setSiteNo(siteNoKey);
	 * nearbySiteInv.setSiteName(location.getName());
	 * nearbySiteInv.setMaxStores(param.getMaxStores());
	 * nearbySiteInv.setDistance
	 * (twoDForm.format(Math.ceil(Double.parseDouble(location.getDistance()))));
	 * 
	 * if(getSOHsiteNos.containsKey(siteNoKey)){
	 * nearbySiteInv.setSohView(getSOHsiteNos.get(siteNoKey)); }else{
	 * nearbySiteInv.setSohView(new InventorySOHInfo()); }
	 * if(getSITsiteNos.containsKey(siteNoKey)){
	 * nearbySiteInv.setSitView(getSITsiteNos.get(siteNoKey)); }else{
	 * nearbySiteInv.setSitView(new InventorySITInfo()); }
	 * if(getSOOsiteNos.containsKey(siteNoKey)){
	 * nearbySiteInv.setSooView(getSOOsiteNos.get(siteNoKey)); }else{
	 * nearbySiteInv.setSooView(new InventorySOOInfo()); } //
	 * if(getPurchasingViewList.containsKey(siteNoKey)){ //
	 * nearbySiteInv.setPurchaseView(getPurchasingViewList.get(siteNoKey)); //
	 * }else{ // nearbySiteInv.setPurchaseView(new ArticlePurchasingView()); //
	 * } // if(getarticlesiteNos.containsKey(siteNoKey)){ //
	 * nearbySiteInv.setSiteView(getarticlesiteNos.get(siteNoKey)); // }else{ //
	 * nearbySiteInv.setSiteView(new ArticleSiteView()); // } if(i==0) { //
	 * if(getSaleViewList.containsKey(siteNoKey)){ //
	 * nearbySiteInv.setSaleView(getSaleViewList.get(siteNoKey)); // }else{ //
	 * nearbySiteInv.setSaleView(new ArticleSalesView()); // }
	 * if(getSellPriceViewList.containsKey(siteNoKey)){
	 * nearbySiteInv.setSalePriceView(getSellPriceViewList.get(siteNoKey));
	 * }else{ nearbySiteInv.setSalePriceView(new ArticleSellPriceView()); } }
	 * else { i++; } // if(getSalePriceViewList.containsKey(siteNoKey)){ //
	 * nearbySiteInv.setSalePriceView(getSalePriceViewList.get(siteNoKey)); //
	 * }else{ // nearbySiteInv.setSalePriceView(new ArticleSellPriceView()); //
	 * } displayInventoryList.add(nearbySiteInv);
	 * 
	 * } model.addAttribute("articleNo", param.getArticleNo());
	 * model.addAttribute("displayInventoryList", displayInventoryList);
	 * 
	 * ////System.out.println("Loation list size   "+locationList.size());
	 * //system
	 * .out.println("displayInventoryList size "+displayInventoryList.size());
	 * // model.addAttribute("getarticlesiteNos", getarticlesiteNos); //
	 * model.addAttribute("articleSiteViewList", articleSiteViewList);
	 * 
	 * // model.addAttribute("getPurchasingViewList", getPurchasingViewList); //
	 * model
	 * .addAttribute("articlePurchasingViewList",articlePurchasingViewList); //
	 * // model.addAttribute("getSOHsiteNos", getSOHsiteNos); //
	 * model.addAttribute("getSITsiteNos", getSITsiteNos); //
	 * model.addAttribute("getSOOsiteNos", getSOOsiteNos); // //
	 * model.addAttribute("inventorySOHInfo", inventorySOHInfo); //
	 * model.addAttribute("inventorySITInfo", inventorySITInfo); //
	 * model.addAttribute("inventorySOOInfo", inventorySOOInfo);
	 * 
	 * // String locval=null; // for(Location location: locationList){ // locval
	 * = location.getNo(); //
	 * callServiceforEachSite(param.getArticleNo(),locval); // // }
	 * 
	 * 
	 * model.addAttribute("param", param); ModelAndView modelAndView = new
	 * ModelAndView("NearbySiteSearch"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); //modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; }
	 */
	/*
	 * @RequestMapping(value = "/requestServiceforEachSite.htm", method =
	 * RequestMethod.GET) public ModelAndView
	 * requestServiceforEachSite(HttpServletRequest request, HttpServletResponse
	 * response) throws Exception { if (request.getSession(false) == null ||
	 * (request.getSession(false) != null && request.getSession(
	 * false).getAttribute("user") == null)) { return new ModelAndView(new
	 * RedirectView("../../")); }
	 * ////System.out.println("---------------------------------");
	 * ////System.out.println
	 * ("inside callEachService"+request.getParameter("siteNo")); // try // { //
	 * articleSiteViewList = inventoryService //
	 * .getSiteViewList(request.getParameter
	 * ("articleNo"),request.getParameter("siteNo")); //
	 * ////System.out.println("articleSiteViewList"+ articleSiteViewList.size());
	 * // // } // catch(Exception e) // { // ////System.out.println("exception");
	 * // articleSiteViewList= new ArrayList<ArticleSiteView>(); // } // // //
	 * try // { // articlePurchasingViewList = //
	 * inventoryService.getPurchasingViewList(param.getArticleNo(),siteno); //
	 * ////System.out.println("articlePurchasingViewList"+
	 * articlePurchasingViewList.size()); // // } // catch(Exception e) // { //
	 * ////System.out.println("exception"); // articlePurchasingViewList= new
	 * ArrayList<ArticlePurchasingView>(); // } // // try { //
	 * articleSalesViewList = inventoryService //
	 * .getSalesViewList(param.getArticleNo(),siteno); //
	 * model.addAttribute("articleSalesViewList",articleSalesViewList); //
	 * ////System.out.println("articleSalesViewList"+
	 * articleSalesViewList.size()); // } catch (Exception e) { //
	 * model.addAttribute("notRanged", "Article Not Ranged"); //
	 * model.addAttribute("articleSalesViewList", // new
	 * ArrayList<ArticleSalesView>()); // } List<ArticleSellPriceView>
	 * articleSellPriceViewList=new ArrayList<ArticleSellPriceView>(); try {
	 * articleSellPriceViewList = inventoryService
	 * .getSellPriceViewList(request.
	 * getParameter("articleNo"),request.getParameter("siteNo"));
	 * model.addAttribute("articleSellPriceViewList",articleSellPriceViewList );
	 * ////System.out.println("articleSellPriceViewList"+
	 * articleSellPriceViewList.size()); } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("articleSellPriceViewList", new
	 * ArrayList<ArticleSellPriceView>()); }
	 * 
	 * 
	 * //model.addAttribute("param", param); ModelAndView modelAndView = new
	 * ModelAndView("ArticleSellPriceView"); modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView;
	 * 
	 * }
	 */

	@RequestMapping(value = "/gtin.htm", method = RequestMethod.GET)
	public ModelAndView gtin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ArticleParam param = new ArticleParam();
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticleGtinInfo> articleGtinList = articleService
					.getGtinView(param,user);

			if (articleGtinList != null && articleGtinList.size() != 0) {
				model.addAttribute("articleGtinList", articleGtinList);
			} else {
				model.addAttribute("articleGtinList",
						new ArrayList<ArticleGtinInfo>());
			}
		} catch (Exception e) {
			e.printStackTrace();
			// model.addAttribute("noData", "No Data Found");
			model.addAttribute("articleGtinList",
					new ArrayList<ArticleGtinInfo>());
		}
		ModelAndView modelAndView = new ModelAndView("ArticleGtin");
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/freshFoodLabel.htm", method = RequestMethod.GET)
	public ModelAndView freshFoodLabel(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ArticleParam param = new ArticleParam();
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticleFreshFoodLabels> freshFoodLabelinfo = articleService
					.getFreshFoodLabelInformation(param,user);
			if (freshFoodLabelinfo != null && freshFoodLabelinfo.size() != 0) {
				model.addAttribute("freshFoodLabelinfo", freshFoodLabelinfo);
			} else {
				model.addAttribute("freshFoodLabelinfo",
						new ArrayList<ArticleFreshFoodLabels>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("freshFoodLabelinfo",
					new ArrayList<ArticleFreshFoodLabels>());
		}
		try {
			List<ArticleProductNotes> productNotesList = articleService
					.getProductNotesInfo(param,user);
			if (productNotesList != null && productNotesList.size() != 0) {
				model.addAttribute("productNotesList", productNotesList);
			} else {
				model.addAttribute("productNotesList",
						new ArrayList<ArticleProductNotes>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("productNotesList",
					new ArrayList<ArticleProductNotes>());
		}

		try {

			List<ArticleNutritionalResult> articleNutritionalResult = articleService
					.getArticleCustcomNutritionalInfo(param,user);
			if (articleNutritionalResult != null
					&& articleNutritionalResult.size() != 0) {
				model.addAttribute("articleNutritionalResult",
						articleNutritionalResult);
			} else {
				model.addAttribute("articleNutritionalResult",
						new ArrayList<ArticleNutritionalResult>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("articleNutritionalResult",
					new ArrayList<ArticleNutritionalResult>());
		}

		ModelAndView modelAndView = new ModelAndView("ArticleFreshFoodLabel");
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	@RequestMapping(value = "/packBreakdown.htm", method = RequestMethod.GET)
	public ModelAndView packBreakdown(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ArticleParam param = new ArticleParam();
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticlePackBreakdown> packBreakdown = articleService
					.getPackBreakdownInfo(param,user);
			if (packBreakdown != null && packBreakdown.size() != 0) {
				model.addAttribute("packBreakdown", packBreakdown);
			} else {
				model.addAttribute("packBreakdown",
						new ArrayList<ArticlePackBreakdown>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("packBreakdown",
					new ArrayList<ArticlePackBreakdown>());
		}

		ModelAndView modelAndView = new ModelAndView("ArticlePackBreakdown");
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/articleSiteView.htm", method = RequestMethod.GET)
	public ModelAndView articleSiteView(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));

		try {

			model.addAttribute("articleSiteViewList",
					new ArrayList<ArticleSiteView>());

		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("articleSiteViewList",
					new ArrayList<ArticleSiteView>());
		}

		ModelAndView modelAndView = new ModelAndView("ArticleSiteView");
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/articleHierarchy.htm", method = RequestMethod.GET)
	public ModelAndView articleHierarchy(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		try {

			model.addAttribute("articleSalesViewList",
					new ArrayList<ArticleSalesView>());

		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("articleSalesViewList",
					new ArrayList<ArticleSalesView>());
		}
		ModelAndView modelAndView = new ModelAndView("ArticleHierarchyRelation");
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/******************** SET SALES ORG VALUES ******************/
	private void setSalesOrg(HttpServletRequest request, boolean flag) {

		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		salesOrgTypes = new ArrayList<SalesOrgModel>();
		SalesOrgModel org;

		// //System.out.println(" sales org---->" + context.getSalesOrg() );

		if (context.getSalesOrg() == PortalUtil.PETROL_SALES_ORG.intValue()) {
			// //System.out.println("in 1");
			org = new SalesOrgModel("1020", "Woolworths Petrol");
			salesOrgTypes.add(org);
		} else if (context.getSalesOrg() == PortalUtil.SM_SALES_ORG.intValue()) {
			// //System.out.println("in 2");
			org = new SalesOrgModel("1005", "Woolworths Supermarkets");
			salesOrgTypes.add(org);
			// //System.out.println("added" +
			// salesOrgTypes.get(0).getSalesOrgNO());
		} else if (context.getSalesOrg() == PortalUtil.SFS_SALES_ORG.intValue()) {
			org = new SalesOrgModel("1030", "Small Format Stores");
			salesOrgTypes.add(org);
		} else if (context.getSalesOrg() == PortalUtil.BWS_SALES_ORG.intValue()
				|| context.getSalesOrg() == PortalUtil.DM_SALES_ORG.intValue()
				|| context.getSalesOrg() == PortalUtil.THMSDUX_SALES_ORG
						.intValue()) {
			// //System.out.println("in 3");
			org = new SalesOrgModel("1005", "Woolworths Supermarkets");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1010", "BWS");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1015", "Dan Murphy's");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1020", "Woolworths Petrol");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1025", "Thomas Dux");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1030", "New Small Stores");
			salesOrgTypes.add(org);
		} else if (context.getSalesOrg() == PortalUtil.BIGW_SALES_ORG
				.intValue()) {
			// //System.out.println("in 4");
			org = new SalesOrgModel("1060", "BigW");
			salesOrgTypes.add(org);
		} else if (context.getSalesOrg() == PortalUtil.CNTDWN_SALES_ORG
				.intValue()) {
			// //System.out.println("in 4");
			org = new SalesOrgModel("2010", "Countdown");
			salesOrgTypes.add(org);
		}
		/*
		 * 
		 * 
		 * org = new SalesOrgModel("2010", "Countdown"); salesOrgTypes.add(org);
		 * org = new SalesOrgModel("2015", "Gull Petrol");
		 * salesOrgTypes.add(org); org= new
		 * SalesOrgModel("2030","NZ Distribution Centres");
		 * salesOrgTypes.add(org); org= new SalesOrgModel("9050", "SuperValue");
		 * salesOrgTypes.add(org); org = new SalesOrgModel("9060",
		 * "Fresh Choice"); salesOrgTypes.add(org);
		 */
		// //System.out.println("sales org size-->" + salesOrgTypes.size() );
		ArrayList<SalesOrgModel> temp1 = new ArrayList<SalesOrgModel>();
		ArrayList<SalesOrgModel> temp2 = new ArrayList<SalesOrgModel>();

		for (SalesOrgModel org2 : salesOrgTypes) {
			if (context != null
					&& String.valueOf(context.getSalesOrg()).equals(
							org2.getSalesOrgNO())) {

				if (flag) {
					org2.setChecked("Y");

					param.setSalesOrgLabel(org2.getSalesOrgNO() + "|"
							+ org2.getSalesOrgName());
				} else {
					org2.setChecked("N");
				}
				temp1.add(org2);

			} else {
				org2.setChecked("N");
				temp2.add(org2);
			}
		}
		salesOrgTypes = new ArrayList<SalesOrgModel>();
		salesOrgTypes.addAll(temp1);
		salesOrgTypes.addAll(temp2);
		// //System.out.println("sales org size  333333-->" + salesOrgTypes.size()
		// );
		model.addAttribute("salesOrgTypes", salesOrgTypes);

		model.addAttribute("param", param);

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
		// param.setMsg(userDetail.getUserId());
		String msg = "";
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));

		try {
			storeList = orderService.getStoreDetails(siteNo,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (storeList != null && storeList.size() > 0)
			msg = "true";
		else
			msg = "false";
		return convertStoreListTojson(storeList, msg);

	}

	private String convertStoreListTojson(ArrayList<Store> storeList, String msg) {

		/*ObjectMapper mapper = null;
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

}
