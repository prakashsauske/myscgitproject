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

import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.ArticleQueryStatus;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.OrderRosterReport;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ViewArticleQuery;
import au.com.woolworths.portal.model.ViewArticleQueryDetails;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.AQMDAOImpl;
import au.com.woolworths.portal.service.AQMSearchQueryServiceImpl;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.MPLorSCAdjServiceImpl;
import au.com.woolworths.portal.service.SearchArticleServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/articleQuery")
public class AQMSearchQueryController extends BaseController {

	private static final String ONE = "1";
	private static final String TWO = "2";
	private static final String THREE = "3";
	private static final String FOUR = "4";

	AQMSearchQueryController() {
		model = new ModelMap();
	}

	private static final Logger LOGGER = Logger.getLogger(AQMSearchQueryController.class.getName());

	private AQMSearchQueryParam paramForPagination;

	private ModelMap model;

	private UserContext userDetail;

	private List<ViewArticleQuery> viewArticleQueryList = null;
	
	private List<ArticleDetail> articleSearchResultsFetched = null;

	private Map<String, String> userList = null;
	
	@Autowired
	private ArticleServiceImpl articleService;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ViewArticleQuery']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private AQMSearchQueryServiceImpl aQMSearchQueryService;

	@Autowired
	private MPLorSCAdjServiceImpl MPLorSCAdjServiceImpl;

	@Autowired
	private SearchArticleServiceImpl SearchArticleService;

	// method called when view query icon is selected from navigation bar
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
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		List<ArticleQueryStatus> articleQueryStatusList = null;
		userDetail = ((UserContext) request.getSession().getAttribute("user"));

		articleQueryStatusList = aQMSearchQueryService.getQueryStatusList(user);
		if (articleQueryStatusList != null && articleQueryStatusList.size() > 0) {

			LOGGER.info("articleQueryStatusList size"
					+ articleQueryStatusList.size());
			model.addAttribute("articleQueryStatusList", articleQueryStatusList);
		} else {
			model.addAttribute("articleQueryStatusList",
					new ArrayList<OrderRosterReport>());
		}
		model.addAttribute("queryNo", request.getParameter("queryNo"));
		model.addAttribute("option", request.getParameter("option"));
		ModelAndView modelAndView = new ModelAndView("viewArticleQuery");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when go button clicked view query page
	@RequestMapping(value = "/getQueryList.htm", method = RequestMethod.POST)
	public ModelAndView getQuery(
			@ModelAttribute("viewQuery") AQMSearchQueryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		LOGGER.info("INSIDE getQueryList mehtod of OrderRosterReportController");

		ModelAndView modelAndView = new ModelAndView("viewArticleQueryContent");

		Map<String, String> userDetails = null;

		String siteNo = userDetail.getSiteNo();
		String pagetNo = "1";
		Integer salesOrg = userDetail.getSalesOrg();

		if (!result.hasErrors()) {
			LOGGER.info("Binding successful");
			
		} else {
			LOGGER.info("Binding error");
		}

		if (param != null) {
			param.setSiteNo(siteNo);
			param.setPageNo(pagetNo);
			param.setSalesOrg(salesOrg.toString());
			if (param.getSubmitBy() != null && param.getSubmitBy() != "") {
				if (userList != null && userList.size() > 0
						&& userList.containsKey(param.getSubmitBy()))
					param.setSubmitBy(userList.get(param.getSubmitBy()));
			}

		}
		System.out.println("&& param.getQueryId() == null   "+param.getQueryId()+" "+ param.getQueryId() == null);
		paramForPagination = param;

		viewArticleQueryList = aQMSearchQueryService.getQueryList(param,userDetail);
		

		if (viewArticleQueryList != null && viewArticleQueryList.size() > 0) {
			param.setOption(ONE);
			/*
			 * if(viewArticleQueryList.size() ==1 ){ LOGGER.info("size==1");
			 * param.setQueryId(viewArticleQueryList.get(0).getQueryId());
			 * param.setIndex("0"); return
			 * requestArticleQueryDetail(param,result,request,response);
			 * 
			 * }
			 */
			try {
				if (viewArticleQueryList.get(0).getTotalSize() != null
						&& viewArticleQueryList.get(0).getTotalSize().trim() != ""
						&& Integer.parseInt(viewArticleQueryList.get(0)
								.getTotalSize().trim()) > 20)
					param.setOption(TWO);

				LOGGER.info("viewArticleQueryList size"
						+ viewArticleQueryList.size());

				// Method to update employee name from the result list

				userDetails = AQMDAOImpl
						.updateArticleQueryList(viewArticleQueryList);
			} catch (Exception e) {
				param.setOption(FOUR);
				// TODO Auto-generated catch block
				e.printStackTrace();

			}

			if (userDetails != null && userDetails.size() > 0) {
				for (ViewArticleQuery query : viewArticleQueryList) {
					query.setUserName((userDetails.get(query.getSubmitBy()) != null && userDetails
							.get(query.getSubmitBy()).trim() != "") ? userDetails
							.get(query.getSubmitBy())
							: "NON STORE CENTRAL user");
				}
			}

			model.addAttribute("viewArticleQueryList", viewArticleQueryList);
		} else {
			if (param.getOption() != null
					&& param.getOption().equalsIgnoreCase("NDF"))
				param.setOption(THREE);
			else
				param.setOption(FOUR);
			model.addAttribute("viewArticleQueryList",
					new ArrayList<OrderRosterReport>());
		}
		
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// method called when pagination numbers are clicked on view query page
	@RequestMapping(value = "/getQueryListForPagination.htm", method = RequestMethod.POST)
	public ModelAndView getQueryListForPagination(
			@ModelAttribute("viewQuery") AQMSearchQueryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		LOGGER.info("INSIDE getOrderRosterReport mehtod of OrderRosterReportController");

		ModelAndView modelAndView = new ModelAndView("viewArticleQueryContent");

		Map<String, String> userDetails = null;

		//ArrayList<ViewArticleQuery> viewArticleQueryList = null;
		if (!result.hasErrors()) {
			LOGGER.info("Binding successful");
			
		} else {
			LOGGER.info("Binding error");
		}

		if (param != null && param.getPageNo() != null
				&& param.getPageNo() != "") {
			paramForPagination.setPageNo(param.getPageNo());
		}

		viewArticleQueryList = aQMSearchQueryService
				.getQueryList(paramForPagination,userDetail);

		if (viewArticleQueryList != null && viewArticleQueryList.size() > 0) {
			param.setOption(ONE);
			try {
				if (viewArticleQueryList.get(0).getTotalSize() != null
						&& viewArticleQueryList.get(0).getTotalSize().trim() != ""
						&& Integer.parseInt(viewArticleQueryList.get(0)
								.getTotalSize().trim()) > 20)
					param.setOption(TWO);

				LOGGER.info("viewArticleQueryList size"
						+ viewArticleQueryList.size());

				userDetails = AQMDAOImpl
						.updateArticleQueryList(viewArticleQueryList);
			} catch (Exception e) {
				param.setOption(FOUR);
				// TODO Auto-generated catch block
				e.printStackTrace();
			}

			if (userDetails != null && userDetails.size() > 0) {
				for (ViewArticleQuery query : viewArticleQueryList) {
					query.setUserName((userDetails.get(query.getSubmitBy()) != null && userDetails
							.get(query.getSubmitBy()).trim() != "") ? userDetails
							.get(query.getSubmitBy())
							: "NON STORE CENTRAL user");
				}
			}

			model.addAttribute("viewArticleQueryList", viewArticleQueryList);
		} else {
			param.setOption(THREE);
			model.addAttribute("viewArticleQueryList",
					new ArrayList<OrderRosterReport>());
		}
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// called when any one of the query of the query list is clicked
	@RequestMapping(value = "/requestArticleQueryDetail.htm", method = RequestMethod.GET)
	public ModelAndView requestArticleQueryDetail(
			@ModelAttribute("viewQuery") AQMSearchQueryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}

		System.out.println("INSIDE getOrderRosterReport mehtod of OrderRosterReportController");

		ModelAndView modelAndView = new ModelAndView("viewArticleQueryDetails");

		String siteNo = userDetail.getSiteNo();
		String pagetNo = "1";
		Integer salesOrg = userDetail.getSalesOrg();
		List<ViewArticleQuery> queryListHdr = new ArrayList<ViewArticleQuery>();	
		queryListHdr.add(viewArticleQueryList.get(Integer.parseInt(param.getIndex())));
		ArrayList<ViewArticleQueryDetails> viewArticleQueryDetailList = null;
		if (!result.hasErrors()) {
			System.out.println("Binding successful");
			
			
		} else {
			System.out.println("Binding error");
		}

		if (param != null) {
			param.setSiteNo(siteNo);
			param.setPageNo(pagetNo);
			param.setSalesOrg(salesOrg.toString());

		}

		try{
		viewArticleQueryDetailList = aQMSearchQueryService
				.getQueryDetail(param,userDetail);
		
		if (viewArticleQueryDetailList != null
				&& viewArticleQueryDetailList.size() > 0) {
			param.setOption(ONE);

			// if(orderRosterReportList.size() > 2)

			System.out.println("viewArticleQueryDetailList size"
					+ viewArticleQueryDetailList.size());
			System.out.println(viewArticleQueryDetailList.get(0).getQueryId()+"--"+viewArticleQueryDetailList.get(0).getSubmitBy());
			model.addAttribute("viewArticleQueryDetailList",
					viewArticleQueryDetailList);
		} else {
			param.setOption(THREE);
			model.addAttribute("viewArticleQueryDetailList",
					new ArrayList<ViewArticleQueryDetails>());
		}
		}
		catch(Exception e)
		{
		System.out.println(e);	
		}
		model.addAttribute("queryListHdr", queryListHdr);	
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/searchArticle.htm", method =
	 * RequestMethod.POST) public ModelAndView searchArticle(
	 * 
	 * @ModelAttribute("mPLorSCAdj") MPLorSCAdjParam param, BindingResult
	 * result, HttpServletRequest request, HttpServletResponse response) throws
	 * Exception { if (request.getSession(false) == null ||
	 * (request.getSession(false) != null && request.getSession(
	 * false).getAttribute("user") == null)) { return new ModelAndView(""); }
	 * 
	 * model.addAttribute("noDataFound", "");
	 *//******************** FORM ELEMENT BINDING **********************/
	/*
	 * 
	 * if (!result.hasErrors()) {
	 * LOGGER.info("Binding successful in searchArticle");
	 * LOGGER.info(param.getArticleType()); } else {
	 * LOGGER.info("Binding failed"); ModelAndView modelAndView = new
	 * ModelAndView("MPLorSCAdj"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 * 
	 * param.setSiteNo(userDetail.getSiteNo());
	 * 
	 * // service call try { articleSearchResultsFetched = MPLorSCAdjServiceImpl
	 * .getArticleDetails(param); } catch (Exception e) { e.printStackTrace(); }
	 * 
	 * // setting switch option for JSP param.setOption("1");
	 * 
	 * model.addAttribute("articleSearchResutlsList",
	 * articleSearchResultsFetched); if (articleSearchResultsFetched != null &&
	 * articleSearchResultsFetched.size() > 0) { if (articleSearchResultsFetched
	 * != null && articleSearchResultsFetched.size() == 1) {
	 * param.setOption(TWO); model.addAttribute("articleSelected",
	 * articleSearchResultsFetched.get(0)); } else { param.setOption("1"); } }
	 * else { model.addAttribute("noDataFound",
	 * "Sorry, no results found for your search criteria. Please try again");
	 * if(!param.getArticleType().equalsIgnoreCase("Description"))
	 * param.setOption(THREE); else param.setOption("1");
	 * model.addAttribute("articleSelected",new ArticleSearchResults());
	 * model.addAttribute("articleSearchResutlsList", new
	 * ArrayList<ArticleSearchResults>() ); }
	 * 
	 * model.addAttribute("param", param); ModelAndView modelAndView = new
	 * ModelAndView("MPLorSCAdjUpdate"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 */
	// method called when description search is done on view query page
	@RequestMapping(value = "/searchArticle.htm", method = RequestMethod.POST)
	public ModelAndView searchArticle(
			@ModelAttribute("viewQuery") ArticleSearchParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}

		param.setSiteNo(userDetail.getSiteNo());
		param.setSaleOrg(userDetail.getSalesOrg().toString());
		ArticleParam newArticleParam = new ArticleParam();
		articleSearchResultsFetched = new ArrayList<ArticleDetail>();
		
		// service call
		try {
			// added for defect 14627
			if(param.getArticleDescrition() != null && param.getArticleDescrition() != "")
			{
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("/", "*"));
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("\\\\", "^"));
			}
			if(param.getSearchByOptions().equalsIgnoreCase("reference"))
			{
				newArticleParam.setSalesOrg(userDetail.getSalesOrg().toString());
				newArticleParam.setSiteNo(userDetail.getSiteNo());
				newArticleParam.setGtin(param.getEan());
				
				List<ArticleSearchResults> articleSearchResults =  articleService.getArticleDetails(newArticleParam,userDetail);
				if(articleSearchResults.size() > 0)
				{
					for(ArticleSearchResults obj : articleSearchResults)
					{
						ArticleDetail articleDetail = new ArticleDetail();
						articleDetail.setArticleNo(obj.getArticle());
						articleDetail.setDescription(obj.getDescription());
						articleDetail.setUom(obj.getBase_uom());
						articleSearchResultsFetched.add(articleDetail);
					}
				}
			}
			if(!param.getSearchByOptions().equalsIgnoreCase("reference"))
			articleSearchResultsFetched = SearchArticleService
					.searchArticleRc(param,userDetail);
		} catch (Exception e) {
			e.printStackTrace();
		}
		param.setOption(ONE);
		if (articleSearchResultsFetched != null
				&& articleSearchResultsFetched.size() > 0) {
			model.addAttribute("articleSearchResutlsList",
					articleSearchResultsFetched);
		} else {
			model.addAttribute("articleSearchResutlsList",
					new ArrayList<ArticleSearchResults>());
		}

		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("MPLorSCAdjUpdate");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	// method called when verify button clicked on view query page
	@RequestMapping(value = "/verifyUser.htm", method = RequestMethod.GET)
	public ModelAndView verifyUser(
			@ModelAttribute("viewQuery") AQMSearchQueryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		userList = new HashMap<String, String>();
		model.addAttribute("noDataFound", "");
		/******************** FORM ELEMENT BINDING **********************/

		param.setSiteNo(userDetail.getSiteNo());

		// service call
		try {
			userList = AQMDAOImpl.getUserDetailList(param);
		} catch (Exception e) {
			e.printStackTrace();
		}
		model.addAttribute("userList", userList);
		// setting switch option for JSP
		param.setOption(ONE);
		if (userList != null && userList.size() > 0) {
			if (userList != null && userList.size() == 1) {
				param.setOption("single");
			} else {
				param.setOption("multiple");
			}
		} else {
			model.addAttribute("noDataFound",
					"Sorry, no results found for your search criteria. Please try again");
			param.setOption("noData");
			model.addAttribute("userList", new HashMap<String, String>());
		}
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("userDetail");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/*
	 * @RequestMapping(value = "/requestArticleQueryDetail.htm") public
	 * ModelAndView requestArticleQueryDetail(HttpServletRequest
	 * request,HttpServletResponse response ){ if (request.getSession(false) ==
	 * null || (request.getSession(false) != null && request.getSession(
	 * false).getAttribute("user") == null)) { return new ModelAndView(new
	 * RedirectView("../../")); }
	 * 
	 * ModelAndView modelAndView= new ModelAndView("viewArticleQueryDetails");
	 * return modelAndView; }
	 */
}