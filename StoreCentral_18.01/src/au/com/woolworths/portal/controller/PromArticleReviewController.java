package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromoArticleReview;
import au.com.woolworths.portal.model.SiteHierarchy;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.param.PromoArticleReviewParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.ITAdminMgmtDAOImpl;
import au.com.woolworths.portal.service.PromotionsPlanningServiceImpl;
import au.com.woolworths.portal.service.SearchArticleServiceImpl;
import au.com.woolworths.portal.service.SiteHierarchyServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/articleReview")
@Scope("session")
public class PromArticleReviewController extends BaseController {

	private List<ArticleDetail> articleSearchResutlsList = null;
	private List<ArticleSearchResults> articleSearchResults = null;
	private List<ArticleSearchResults> articleDescriptionResults;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['PromotionArticleReveiw']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private SearchArticleServiceImpl SearchArticleService;

	@Autowired
	private PromotionsPlanningServiceImpl promotionsPlanningService;

	@Autowired
	private SiteHierarchyServiceImpl siteHierarchyService;
	
	@Autowired
	private ArticleServiceImpl articleService;

	private ModelMap model;

	private UserContext userDetail;

	/*
	 * private String NO_DATA = "noData"; private String SINGLE_RESULT =
	 * "singleResult"; private String PROMODETAIL = "promotionDetails"; private
	 * String MANDATORY = "Please fill all the mandatory fields.";
	 */

	private String MULTIPLE_RESULT = "multipleResult";
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";

	private PromoArticleReviewParam paramForPagination = null;

	private static final Logger LOGGER = Logger.getLogger(PromArticleReviewController.class.getName());

	// METHOD USED TO LOAD PROMOTIONS AUDIT DETAILS SCREEN
	@RequestMapping(value = "/onPageLoadArticleReview.htm")
	public ModelAndView onPageLoadAuditTrail(HttpServletRequest request,
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
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		Map<String, String> salesOrgMap = null;

		// getting all the sales orgs for tab setttings
		try {
			salesOrgMap = ITAdminMgmtDAOImpl.getAllSalesOrg(userDetail.getSalesOrg().toString());
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		// if(salesOrgMap!=null && salesOrgMap.size()>0)
		model.addAttribute(
				"salesOrgMap",
				(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
						: new HashMap<String, String>());

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("promArticleReview");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * //method called when description search happend in create warehouse order
	 * screen.
	 * 
	 * @RequestMapping(value = "/getDescription.htm", method =
	 * RequestMethod.GET) public ModelAndView getDescription(HttpServletRequest
	 * request, HttpServletResponse response) throws Exception { ModelMap
	 * model=new ModelMap(); ModelAndView modelAndView=new ModelAndView("");
	 * ////System.out.println("getDescription" ); String vendordesc=(String)
	 * request.getParameter("vendorDesc"); String sourceSupply=(String)
	 * request.getParameter("sourceSupply");
	 * ////System.out.println("sourceSupply"+sourceSupply); String
	 * suppName=(String) request.getParameter("suppName");
	 * ////System.out.println("suppName"+suppName); String warehouse=(String)
	 * request.getParameter("warehouse"); articleDescriptionResults = new
	 * ArrayList<ArticleSearchResults>(); ManualOrderParam orderParam =new
	 * ManualOrderParam(); orderParam.setArticleType("desc");
	 * orderParam.setArticleNo(vendordesc);
	 * orderParam.setSrcOfSupply(sourceSupply);
	 * orderParam.setSuppName(suppName);
	 * orderParam.setWarehouseDropdown(warehouse);
	 * orderParam.setSiteNo(((UserContext) request.getSession()
	 * .getAttribute("user")).getSiteNo());
	 * 
	 * try{ if(articleDescriptionResults!=null &&
	 * articleDescriptionResults.size()>0) { modelAndView = new
	 * ModelAndView("descriptionLookup"); model.addAttribute("nodata","N");
	 * model.addAttribute("vendordesc",vendordesc);
	 * model.addAttribute("size",articleDescriptionResults.size());
	 * model.addAttribute("divideSubmit","Y");
	 * model.addAttribute("receiveCall","M");
	 * model.addAttribute("receiveCall1","O");
	 * model.addAttribute("vendorList",articleDescriptionResults);
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; } else{
	 * modelAndView = new ModelAndView("descriptionLookup");
	 * model.addAttribute("nodata","Y");
	 * model.addAttribute("vendordesc",vendordesc);
	 * model.addAttribute("size","0"); model.addAttribute("divideSubmit","Y");
	 * model.addAttribute("receiveCall","M");
	 * model.addAttribute("receiveCall1","O");
	 * model.addAttribute("vendorList",new ArrayList<ArticleSearchResults>());
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 * 
	 * 
	 * 
	 * } catch(Exception e) {
	 * 
	 * } return modelAndView;
	 * 
	 * 
	 * }
	 */
	private String convertPromoAuditListTojson(
			List<PromoArticle> promoArticleReviewList) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoArticleReviewList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/
		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(promoArticleReviewList)  + "}";
	}

	// METHOD USED TO GET PROMOTIONS AUDIT DETAILS
	@RequestMapping(value = "/getPromoArticleReview.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoArticleReview(
			@ModelAttribute("promotionsPlanning") PromoArticleReviewParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		ArrayList<PromoArticle> promoArticleReviewList = null;
		PromoArticle promoArticleReview = null;
		ArticleDetail articleDetail = null;
		Map<String, String> userDetails = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if (param.getPageNo() != null && param.getPageNo() != "") {
			//System.out.println("pageNO" + param.getPageNo());
			paramForPagination.setPageNo(param.getPageNo());
			param = paramForPagination;
		}

		else if (param.getSearchByOptions() != null
				&& param.getSearchByOptions().trim() != ""
				) {

			if (param.getIndex() != null && param.getIndex().trim() != ""
					&& ((articleSearchResutlsList != null
					&& articleSearchResutlsList.size() > 0) || (articleSearchResults != null
							&& articleSearchResults.size() > 0) )) {
				//System.out.println("param.getIndex" + param.getIndex());
				if(!param.getSearchByOptions().equalsIgnoreCase("reference"))
				{
				param.setArticleNo(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getArticleNo());
				param.setUom(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getUom());
				param.setArticleDesc(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getDescription());
				articleSearchResutlsList = new ArrayList<ArticleDetail>();
				paramForPagination = param;
			}else
			{

				param.setArticleNo(articleSearchResults.get(
						Integer.parseInt(param.getIndex())).getArticle());
				param.setUom(articleSearchResults.get(
						Integer.parseInt(param.getIndex())).getBase_uom());
				param.setArticleDesc(articleSearchResults.get(
						Integer.parseInt(param.getIndex())).getDescription());
				articleSearchResults = new ArrayList<ArticleSearchResults>();
				paramForPagination = param;
			
			}

			} else if(!param.getSearchByOptions().equalsIgnoreCase("reference")) {
				//System.out.println("param.getArticleNo()"
						//+ param.getArticleNo());
				ArticleSearchParam articleParam = new ArticleSearchParam(
						param.getSiteNo(), param.getSalesOrg(),
						param.getSearchByOptions(), param.getArticleNo());
				articleSearchResutlsList = searchAndAddArticle(articleParam);

				if (articleSearchResutlsList != null
						&& articleSearchResutlsList.size() > 0) {
					if (articleSearchResutlsList.size() == 1) {
						param.setArticleNo(articleSearchResutlsList.get(0)
								.getArticleNo());
						param.setUom(articleSearchResutlsList.get(0).getUom());
						param.setArticleDesc(articleSearchResutlsList.get(0)
								.getDescription());
						paramForPagination = param;
						articleSearchResutlsList = new ArrayList<ArticleDetail>();
					} else {
						articleSearchResutlsList.get(0).setMsg(MULTIPLE_RESULT);
						return convertArticleListTojson(articleSearchResutlsList);
					}

				} else {
					articleDetail = new ArticleDetail();
					articleDetail.setMsg((articleParam.getMsg()));
					articleSearchResutlsList = new ArrayList<ArticleDetail>();
					articleSearchResutlsList.add(articleDetail);
					return convertArticleListTojson(articleSearchResutlsList);
				}
			}
			else if(param.getSearchByOptions().equalsIgnoreCase("reference"))
			{
				ArticleParam newArticleParam = new ArticleParam();
				
				try {
					if(param.getSearchByOptions().equalsIgnoreCase("reference"))// fix for defect 14621
					{
						newArticleParam.setSalesOrg(userDetail.getSalesOrg().toString());
						newArticleParam.setSiteNo(userDetail.getSiteNo());
						newArticleParam.setGtin(param.getArticleNo());
						articleSearchResults = new ArrayList<ArticleSearchResults>();
						articleSearchResults =  articleService.getArticleDetails(newArticleParam,userDetail);
						if(articleSearchResults != null && articleSearchResults.size() > 0)
						{
							if (articleSearchResults.size() == 1) {
								param.setArticleNo(articleSearchResults.get(0)
										.getArticle());
								param.setUom(articleSearchResults.get(0).getBase_uom());
								param.setArticleDesc(articleSearchResults.get(0)
										.getDescription());
								paramForPagination = param;
								articleSearchResults = new ArrayList<ArticleSearchResults>();
							} else {
							articleSearchResults.get(0).setMsg(MULTIPLE_RESULT);
							return "{\"data\":" +Constants.convertToJsonString(articleSearchResults)  + "}";
						}
						}
						else {
							ArticleSearchResults articleSearchResult = new ArticleSearchResults();
							articleSearchResult.setMsg((newArticleParam.getMsg()));
							articleSearchResults = new ArrayList<ArticleSearchResults>();
							articleSearchResults.add(articleSearchResult);
							return "{\"data\":" +Constants.convertToJsonString(articleSearchResults)  + "}";
						}
					}
				
				} catch (Exception e) {
					e.printStackTrace();
				}
			}

		}
		// TODO NEEDTO WRITE ELSE CONDINTION
		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getUom() != null && param.getUom().trim() != "")
				|| !(param.getSearchByOptions() != null
						&& param.getSearchByOptions().trim() != "" && !param
						.getSearchByOptions().equalsIgnoreCase("reference"))) {
			
			// CALLING PROMO AUDIT WEB SERVICE
						promoArticleReviewList = siteHierarchyService
								.getSiteHierarchyDetails(param,userDetail);

			// IF THE RESULT IS NULL SETTING THE MSG GIVEN BY WEBSERVICE
			if (!(promoArticleReviewList != null && promoArticleReviewList
					.size() > 0)) {
				promoArticleReviewList = new ArrayList<PromoArticle>();
				promoArticleReview = new PromoArticle();
				promoArticleReview.setMsg((param.getMsg() != null && param
						.getMsg().trim() != "") ? param.getMsg() : EXCEPTION);
				promoArticleReviewList.add(promoArticleReview);
			} else {
				if (promoArticleReviewList.get(0).getArticle() == null) {
					promoArticleReviewList.get(0).setArticleDesc(
							param.getArticleDesc());
					promoArticleReviewList.get(0).setArticle(
							param.getArticleNo());
				}

			}
		}
		return convertPromoAuditListTojson(promoArticleReviewList);

	}

	@RequestMapping(value = "/fetchDistricts.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		/* Map<String, String> options = optionDAO.find(selectedValue); */

		List<SiteHierarchy> districtList = new ArrayList<SiteHierarchy>();

		String nodeId = request.getParameter("iv_parent_node");
		districtList = (ArrayList<SiteHierarchy>) siteHierarchyService
				.getSiteHierarchy(nodeId,null,null, "district",userDetail);
		Map<String, List<SiteHierarchy>> districtDetails = new HashMap<String, List<SiteHierarchy>>();
		districtDetails.put("districtList", districtList);
		String json = new Gson().toJson(districtDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if (districtList != null && districtList.size() > 0) {
			//System.out.println("districtList ___ " + districtList.size());
			response.getWriter().write(json);
		} else if (districtList == null || districtList.size() <= 0) {
			String s1 = "{\"categoryInfoList\":" + "\"node\": \"" + 0
					+ " \", \"nodeDesc\": \"" + "Select" + "\"}";

			response.getWriter().write(s1);
		}

	}

	@RequestMapping(value = "/fetchRegion.htm", method = RequestMethod.GET)
	public void fetchSubCategoryDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<SiteHierarchy> districtList = new ArrayList<SiteHierarchy>();

		String nodeId = request.getParameter("iv_parent_node");
		String banner = request.getParameter("banner");
		districtList = (ArrayList<SiteHierarchy>) siteHierarchyService
				.getSiteHierarchy(banner,nodeId,null, "region",userDetail);
		/*
		 * Map<String, List<SiteHierarchy>> districtDetails = new
		 * HashMap<String, List<SiteHierarchy>>();
		 * districtDetails.put("districtList", districtList); String json = new
		 * Gson().toJson(districtDetails);
		 */

		Map<String, List<SiteHierarchy>> subCategoryDetails = new HashMap<String, List<SiteHierarchy>>();
		subCategoryDetails.put("subCategoryInfoList", districtList);
		String json = new Gson().toJson(subCategoryDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	@RequestMapping(value = "/fetchArea.htm", method = RequestMethod.GET)
	public void fetchSegmentDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<SiteHierarchy> districtList = new ArrayList<SiteHierarchy>();

		String nodeId = request.getParameter("iv_parent_node");
		String banner = request.getParameter("banner");
		String state = request.getParameter("state");
		districtList = (ArrayList<SiteHierarchy>) siteHierarchyService
				.getSiteHierarchy(banner,state,nodeId, "area",userDetail);
		/*
		 * Map<String, List<SiteHierarchy>> districtDetails = new
		 * HashMap<String, List<SiteHierarchy>>();
		 * districtDetails.put("districtList", districtList); String json = new
		 * Gson().toJson(districtDetails);
		 */

		Map<String, List<SiteHierarchy>> segmentDetails = new HashMap<String, List<SiteHierarchy>>();
		segmentDetails.put("segmentInfoList", districtList);
		String json = new Gson().toJson(segmentDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);

	}

	// METHOD USED TO GET PROMOTIONS AUDIT DETAILS
	/*
	 * @RequestMapping(value = "/getPromoArticleReview.htm", method =
	 * RequestMethod.POST) public ModelAndView getDailyStoreProfileReport(
	 * 
	 * @ModelAttribute("promoArticleReview") PromoArticleReviewParam param,
	 * BindingResult result, HttpServletRequest request, HttpServletResponse
	 * response) {
	 * 
	 * //System.out.println("comes inside pal controller"); if
	 * (request.getSession(false) == null || (request.getSession(false) != null
	 * && request.getSession( false).getAttribute("user") == null)) { return new
	 * ModelAndView(""); }
	 * 
	 * ModelAndView modelAndView = new ModelAndView(
	 * "promoArticleReviewContent"); UserContext userDetail = ((UserContext)
	 * request.getSession() .getAttribute("user"));
	 * 
	 * String siteNo = userDetail.getSiteNo(); String pagetNo = "1"; Integer
	 * salesOrg = userDetail.getSalesOrg();
	 * 
	 * ArrayList<PromoArticleReview> promoArticleReviewList = null;
	 * 
	 * if (param != null) { param.setSiteNo(siteNo); param.setPageNo(pagetNo);
	 * param.setSalesOrg(salesOrg.toString()); } paramForPagination = param;
	 * 
	 * promoArticleReviewList = siteHierarchyService
	 * .getSiteHierarchyDetails(param);
	 * 
	 * //System.out.println("called in par report");
	 * 
	 * LOGGER.info("promoArticleReviewList size" +
	 * promoArticleReviewList.size());
	 * model.addAttribute("promoArticleReviewList", promoArticleReviewList);
	 * 
	 * model.addAttribute("param", param); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model); return modelAndView; }
	 */

	/*
	 * @RequestMapping(value = "/getPromoArticleReviewForPagination.htm", method
	 * = RequestMethod.POST) public ModelAndView
	 * getDailyStoreProfileReportForPagination(
	 * 
	 * @ModelAttribute("dailyStoreProfileReport") DailyStoreProfileReportParam
	 * param, BindingResult result, HttpServletRequest request,
	 * HttpServletResponse response) {
	 * 
	 * if (request.getSession(false) == null || (request.getSession(false) !=
	 * null && request.getSession( false).getAttribute("user") == null)) {
	 * return new ModelAndView(""); } LOGGER.info(
	 * "INSIDE getDailyStoreProfileReportForPagination mehtod of DailyStoreProfileReportController"
	 * );
	 * 
	 * ModelAndView modelAndView = new ModelAndView("dailyStoreProfileContent");
	 * UserContext userDetail = ((UserContext) request.getSession()
	 * .getAttribute("user")); if (param != null && param.getPageNo() != null &&
	 * param.getPageNo() != "") {
	 * paramForPagination.setPageNo(param.getPageNo()); }
	 * 
	 * ArrayList<DailyStoreProfileReport> dailyStoreProfileReportList = null; if
	 * (!result.hasErrors()) { LOGGER.info("Binding successful");
	 * //System.out.println(param.getDate()); } else {
	 * LOGGER.info("Binding error"); }
	 * 
	 * dailyStoreProfileReportList = dailyStoreProfileReportService
	 * .getDailyStoreProfileReport(paramForPagination);
	 * 
	 * 
	 * 
	 * if (dailyStoreProfileReportList != null &&
	 * dailyStoreProfileReportList.size() > 0) {
	 * //System.out.println("called in daily store profile report pagination");
	 * //TODO: department list to be changed
	 * //dailyStoreProfileReportList=(ArrayList<DailyStoreProfileReport>)
	 * updateDepartmentNames
	 * (dailyStoreProfileReportList,userDetail.getSalesOrg());
	 * updateDepartmentNames
	 * (dailyStoreProfileReportList,userDetail.getSalesOrg());
	 * param.setOption("1"); if (dailyStoreProfileReportList.get(0).getMsg() !=
	 * null && dailyStoreProfileReportList.get(0).getMsg().trim() != "" &&
	 * Integer.parseInt(dailyStoreProfileReportList.get(0) .getMsg().trim()) >
	 * 20) param.setOption("2"); //
	 * if(orderRosterReportList.get(0).getMsg().trim()!=null && //
	 * Integer.parseInt(orderRosterReportList.get(0).getMsg().trim())>20) //
	 * if(orderRosterReportList.size() > 2) // param.setOption("2");
	 * 
	 * 
	 * 
	 * LOGGER.info("dailyStoreProfileReportList size" +
	 * dailyStoreProfileReportList.size());
	 * model.addAttribute("dailyStoreProfileReportList",
	 * dailyStoreProfileReportList); } else { param.setOption("3");
	 * model.addAttribute("dailyStoreProfileReportList", new
	 * ArrayList<DailyStoreProfileReport>()); } model.addAttribute("param",
	 * param); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 */
	private String convertPromoReviewListTojson(
			List<PromoArticleReview> promoArticleReviewList) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoArticleReviewList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/
		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(promoArticleReviewList)  + "}";
	}

	private String convertArticleListTojson(
			List<ArticleDetail> articleDetailList) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articleDetailList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/
		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" +Constants.convertToJsonString(articleDetailList)  + "}";
	}

	public ArrayList<ArticleDetail> searchAndAddArticle(ArticleSearchParam param) {
		List<ArticleDetail> articleSearchResult = null;
		//System.out.println("param.getArticleDescrition() "
				//+ param.getArticleDescrition());
		try {
			if(param.getArticleDescrition() != null && param.getArticleDescrition() != "")
			{			// added for defect 14651
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("/", "*"));
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("\\\\", "^"));
			}
			articleSearchResult = SearchArticleService.searchArticleRc(param,userDetail);

			if (articleSearchResult != null && articleSearchResult.size() > 0) {
				return (ArrayList<ArticleDetail>) articleSearchResult;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return null;
	}

}