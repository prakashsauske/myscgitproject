package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleBasicViewDetails;
import au.com.woolworths.portal.model.ArticlePurchasingView;
import au.com.woolworths.portal.model.ArticleSalesView;
import au.com.woolworths.portal.model.ArticleSellPriceView;
import au.com.woolworths.portal.model.ArticleSiteView;
import au.com.woolworths.portal.model.InventorySITInfo;
import au.com.woolworths.portal.model.InventorySOHInfo;
import au.com.woolworths.portal.model.InventorySOOInfo;
import au.com.woolworths.portal.model.Location;
import au.com.woolworths.portal.model.NearbySiteInventory;
import au.com.woolworths.portal.model.NearbyStoreSearchInfo;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.StoresSearchResult;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InventoryParam;
import au.com.woolworths.portal.param.NutritionInfoMailParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InventoryServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

@Controller
@RequestMapping(value = "*/articlelookup")
@Scope("session")
public class ArticleLookUpController extends BaseController {

	// private ModelMap model;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ArticlesLocal']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['StockAdjustmentLocal']}")
	private String screenCode1;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private InventoryServiceImpl inventoryService;
	private ModelMap model;
	private UserContext userDetail;
	String noData = "NO DATA FOUND";
	private InventoryParam param;
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

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// This block of code is used for session expiry detection
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String siteNo=((UserContext) request.getSession().getAttribute("user")).getSiteNo();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("articleLookupNew");
		List<SupplierModel> whInfoList = new ArrayList<SupplierModel>();
		
		String fromPage = new String();
		if(null != request.getParameter("param"))
		{
			fromPage = request.getParameter("param");
			if(fromPage.equalsIgnoreCase("navigate"))
			{
				/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
				screenCode1="AC_SALOC";
				if(user.getUserAccessMap().containsKey(screenCode1)){
					if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
				/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
				modelAndView.addObject("fromScreen", "navigate");
			}else
			{
				modelAndView.addObject("fromScreen", "");
			}
		}else
		{
			/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
			if(user.getUserAccessMap().containsKey(screenCode)){
				if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
					return new ModelAndView("noAccess");
				}
				
			}
			/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
			
			modelAndView.addObject("fromScreen", "");
		}

		if(null != request.getParameter("claimArticle")){
			modelAndView.addObject("claimArticle", request.getParameter("claimArticle"));
		} else {
			modelAndView.addObject("claimArticle", "");
		}
		
		param = new InventoryParam();
		try {
			param.setDistance(20);
			param.setMaxStores(10);
			UserContext context = (UserContext) request.getSession(false)
					.getAttribute("user");
			param.setSiteNo(context.getSiteNo());
			param.setSalesOrg(String.valueOf(context.getSalesOrg()));// sales org
			setSalesOrg(request, true);
			// for populating warehouse list
			whInfoList = (ArrayList<SupplierModel>) orderService.getSupplierLists(siteNo,user);

			model.addAttribute("whList", whInfoList);
			//System.out.println("whList size "+whInfoList.size());
			
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("isbigw", false);
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("whList", new ArrayList<SupplierModel>());
		}
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView; 
	}

	@RequestMapping(value = "/onPageLoadNearbyStoreSearch.htm", method = RequestMethod.GET)
	@ResponseBody
	public String onPageLoadNearbyStoreSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// //System.out.println("articleNo : "+request.getParameter("articleNo"));
		String articleNo = null;
		String articleBaseUom = null;
		articleBaseUom = request.getParameter("articleBaseUom");
		model.addAttribute("articleBaseUom", articleBaseUom);
		articleNo = request.getParameter("articleNo");
		articleNo = articleNo.replaceFirst("^0+(?!$)", "");
		// //System.out.println("articleNo : "+articleNo);
		param = new InventoryParam();

		param.setArticleNo(articleNo);
		// param.setArticleNo(request.getParameter("articleNo"));
		param.setArticleName(request.getParameter("articleName"));

		param.setDistance(20);
		param.setMaxStores(10);
		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		param.setSiteNo(context.getSiteNo());
		param.setSalesOrg(String.valueOf(context.getSalesOrg()));// sales org
		nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		String msg = null;
		// Calling nearby StoreSearch
		try {

			nearbyStoreSearchInfo = inventoryService.NearbyStoreSearch(param,userDetail);
			if (nearbyStoreSearchInfo == null
					|| nearbyStoreSearchInfo.size() <= 0) {
				msg = "No store info found. Try different criteria.";//Defect 1414

			} else if (nearbyStoreSearchInfo != null
					&& nearbyStoreSearchInfo.size() == 1
					&& nearbyStoreSearchInfo.get(0).getSiteNo().trim().length() <= 0
					&& nearbyStoreSearchInfo.get(0).getSiteName().trim()
							.length() <= 0) {
				msg = "No store info found. Try different criteria.";//Defect 1414

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
			msg = "No store info found. Try different criteria.";//Defect 1414
			nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		}
		/*
		 * List temp = new ArrayList<NearbyStoreSearchInfo>();
		 * NearbyStoreSearchInfo obj = new NearbyStoreSearchInfo();
		 * obj.setMsg(Constants.NDF); temp.add(obj);
		 */
		return convertNearByStoreSearchResultTojson(nearbyStoreSearchInfo, msg);
	}

	@RequestMapping(value = "/requestNearbyStoreSearch.htm", method = RequestMethod.POST)
	@ResponseBody
	public String requestNearbyStoreSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

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
		String msg = null;
		String[] checkBoxValues = new String[30];
		checkBoxValues = request.getParameterValues("salesOrg");
		System.out.println("checkBoxValues ::" + checkBoxValues);

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
		// Calling nearby StoreSearch
		try {

			nearbyStoreSearchInfo = inventoryService.NearbyStoreSearchNew(
					param, checkBoxValues,userDetail);
			if (nearbyStoreSearchInfo == null
					|| nearbyStoreSearchInfo.size() <= 0) {
				msg = "No store info found. Try different criteria.";//Defect 1414

			} else if (nearbyStoreSearchInfo != null
					&& nearbyStoreSearchInfo.size() == 1
					&& nearbyStoreSearchInfo.get(0).getSiteNo().trim().length() <= 0
					&& nearbyStoreSearchInfo.get(0).getSiteName().trim()
							.length() <= 0) {
				msg = "No store info found. Try different criteria.";//Defect 1414

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
			msg = "No store info found. Try different criteria.";//Defect 1414
			nearbyStoreSearchInfo = new ArrayList<NearbyStoreSearchInfo>();
		}

		return convertNearByStoreSearchResultTojson(nearbyStoreSearchInfo, msg);
	}

	/******************** SET SALES ORG VALUES ******************/
	private void setSalesOrg(HttpServletRequest request, boolean flag) {

		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		salesOrgTypes = new ArrayList<SalesOrgModel>();
		SalesOrgModel org;

// defect no 838
		if (context.getSalesOrg() == PortalUtil.PETROL_SALES_ORG.intValue()
			|| context.getSalesOrg() == PortalUtil.SFS_SALES_ORG.intValue()
			|| context.getSalesOrg() == PortalUtil.THMSDUX_SALES_ORG.intValue()
				) {
			// SFS PETROL and THOMAS DUX
			org = new SalesOrgModel("1005", "Woolworths Supermarkets");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1020", "Woolworths Petrol");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1025", "Thomas Dux");
			salesOrgTypes.add(org);	
			org = new SalesOrgModel("1030", "Small Format Stores");
			salesOrgTypes.add(org);
			
		} else if (context.getSalesOrg() == PortalUtil.SM_SALES_ORG.intValue()) {
			// SUPERS 
			org = new SalesOrgModel("1005", "Woolworths Supermarkets");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1020", "Woolworths Petrol");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1025", "Thomas Dux");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1010", "BWS");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1015", "Dan Murphy's");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1030", "Small Format Stores");
			salesOrgTypes.add(org);			
			
		} else if (context.getSalesOrg() == PortalUtil.BWS_SALES_ORG.intValue()
				|| context.getSalesOrg() == PortalUtil.DM_SALES_ORG.intValue()
				) {
					//DAN MURPHY and BWS
			org = new SalesOrgModel("1005", "Woolworths Supermarkets");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1010", "BWS");
			salesOrgTypes.add(org);
			org = new SalesOrgModel("1015", "Dan Murphy's");
			salesOrgTypes.add(org);
			
		} else if (context.getSalesOrg() == PortalUtil.BIGW_SALES_ORG
				.intValue()) {
			//BIG W
			org = new SalesOrgModel("1060", "BigW");
			salesOrgTypes.add(org);
		} else if (context.getSalesOrg() == PortalUtil.CNTDWN_SALES_ORG
				.intValue()) {
			//PEL
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
		
		if (context.getSalesOrg() == PortalUtil.BWS_SALES_ORG.intValue()
				|| context.getSalesOrg() == PortalUtil.DM_SALES_ORG.intValue()
				) {
		org = new SalesOrgModel("All", "Select All");
		salesOrgTypes.add(org);
		}else if (context.getSalesOrg() == PortalUtil.SFS_SALES_ORG.intValue()
				|| context.getSalesOrg() == PortalUtil.PETROL_SALES_ORG.intValue()
				|| context.getSalesOrg() == PortalUtil.THMSDUX_SALES_ORG
						.intValue()) {
		org = new SalesOrgModel("All", "Select All");
		salesOrgTypes.add(org);
		}else if (context.getSalesOrg() == PortalUtil.SM_SALES_ORG.intValue()
				) {
		org = new SalesOrgModel("All", "Select All");
		salesOrgTypes.add(org);
		}
		salesOrgTypes.addAll(temp1);
		salesOrgTypes.addAll(temp2);
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
		ArrayList<StoresSearchResult> storeList = null;
		// param.setSiteNo(userDetail.getSiteNo());
		String siteNo = request.getParameter("storeId");
		// param.setMsg(userDetail.getUserId());
		String msg = "";

		try {
			storeList = orderService.getStoreDetailsForNearBy(siteNo,userDetail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		if (storeList != null && storeList.size() > 0)
			msg = "true";
		else
			msg = "false";
		return convertStoreListTojson(storeList, msg);

	}

	private String convertStoreListTojson(ArrayList<StoresSearchResult> storeList, String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * 
		 * mapper.writeValue(jsonGenerator, storeList); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * e.printStackTrace(); } catch (IOException e) {
		 * 
		 * e.printStackTrace(); }
		 */

		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(storeList)
				+ ",\"msg\":\"" + msg + "\"}";
	}

	private String convertNearByStoreSearchResultTojson(
			List<NearbyStoreSearchInfo> resultList, String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * 
		 * mapper.writeValue(jsonGenerator, resultList); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * e.printStackTrace(); } catch (IOException e) {
		 * 
		 * e.printStackTrace(); }
		 */

		System.out.println("{\"data\":"
				+ Constants.convertToJsonString(resultList) + ",\"msg\":\""
				+ msg + "\"}");

		return "{\"data\":" + Constants.convertToJsonString(resultList)
				+ ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/sendNutritionInfoMail.htm", method = RequestMethod.POST)
	@ResponseBody
	public boolean sendNutritionInfoMail(
			@ModelAttribute("nutriInfo") NutritionInfoMailParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		boolean status = false;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			status = articleService.sendNutritionInfoMail(param,user);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return status;
	}

}