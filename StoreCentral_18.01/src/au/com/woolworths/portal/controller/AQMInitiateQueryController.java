package au.com.woolworths.portal.controller;

import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.AQMReasonCode;
import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AQMSubmitQueryDtlParam;
import au.com.woolworths.portal.param.AQMSubmitQueryHdrParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.AQMInitiateQueryServiceImpl;
import au.com.woolworths.portal.service.SearchArticleServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/AQMInitiateQuery")
public class AQMInitiateQueryController extends BaseController {

	private List<AQMSubmitQueryDtlParam> articleList = null;

	private List<ArticleDetail> articleSearchResutlsList = null;

	private List<AQMReasonCode> aQMReasonCodeList = null;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['SubmitArticleQuery']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private SearchArticleServiceImpl SearchArticleService;

	@Autowired
	private AQMInitiateQueryServiceImpl aQMInitiateQueryService;

	private ModelMap model;

	private UserContext userDetail;

	private static final int size = 99;

	private static final Logger LOGGER = Logger.getLogger(AQMInitiateQueryController.class.getName());

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
		
		model = new ModelMap();
		articleSearchResutlsList = new ArrayList<ArticleDetail>();
		articleList = new ArrayList<AQMSubmitQueryDtlParam>();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("initiateArticleQuery");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/searchAndAddArticle.htm", method = RequestMethod.POST)
	public ModelAndView searchAndAddArticle(
			@ModelAttribute("submitQuery") ArticleSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		ModelAndView modelAndView = new ModelAndView(
				"initiateArticleQueryContent");
		List<ArticleDetail> articleDescriptionList = null;
		if (aQMReasonCodeList == null) {
			aQMReasonCodeList = aQMInitiateQueryService.getAQMResonCode(userDetail);
			model.addAttribute("aQMReasonCodeList", aQMReasonCodeList);
/*			System.out.println("******************** if part resoncode size "
					+ aQMReasonCodeList.size());*/
		} else {
			model.addAttribute("aQMReasonCodeList", aQMReasonCodeList);
			
		}

		LOGGER.info("rangedFlag" + param.getRangedFlag());
		if (param != null) {
			param.setSiteNo(userDetail.getSiteNo());
			param.setSaleOrg(userDetail.getSalesOrg().toString());
		}
		// since user is not entering uom cant use this entry check.
		/*
		 * param = compareList(param); if
		 * (param.getMsg().equalsIgnoreCase("true")) {
		 * param.setOption("Article '"
		 * +param.getArticleNo()+"' is already exist in the list."); return
		 * returnToPage(param, modelAndView); }
		 */

		try {
			if (param.getIndex() != null && param.getIndex() != ""
					&& articleSearchResutlsList != null
					&& articleSearchResutlsList.size() > 0) {
				articleDescriptionList = new ArrayList<ArticleDetail>();
				for (int i = 0; i < param.getIndex().split(":").length; i++) {
					ArticleDetail article = new ArticleDetail();
					article = articleSearchResutlsList.get(Integer
							.parseInt(param.getIndex().split(":")[i]));
					param.setArticleNo(article.getArticleNo());
					// articleSearchResutlsList = new
					// ArrayList<ArticleDetail>();
					articleDescriptionList.add(article);
				}
				/*
				 * param=compareList(param);
				 * if(param.getMsg().equalsIgnoreCase("true")) return
				 * returnToPage(param,modelAndView);
				 */
			} else {
				if(param.getArticleDescrition() != null && param.getArticleDescrition() != "")
				{// added for defect 14651
				param.setArticleDescrition(param.getArticleDescrition().replaceAll("/", "*"));
				param.setArticleDescrition(param.getArticleDescrition().replaceAll("\\\\", "^"));
				}
				articleSearchResutlsList = SearchArticleService
						.searchArticleRcAQM(param,userDetail);
			}
			if (articleSearchResutlsList != null
					&& articleSearchResutlsList.size() > 0
					|| (articleDescriptionList != null && articleDescriptionList
							.size() > 0)) {
				if (articleDescriptionList != null
						&& articleDescriptionList.size() > 0) {
					param.setOption("result");
					if (articleList == null)
						articleList = new ArrayList<AQMSubmitQueryDtlParam>();
					for (ArticleDetail artDetail : articleDescriptionList) {
						// since its restricted in screen itself
						/*
						 * param.setArticleNo(articleSearchResutlsList.get(0)
						 * .getArticleNo());
						 * param.setUom(articleSearchResutlsList
						 * .get(0).getUom());
						 * param.setUom(articleSearchResutlsList.get(0)
						 * .getPackBreakDownArticleNo()); param =
						 * compareList(param); if
						 * (param.getMsg().equalsIgnoreCase("true")) {
						 * param.setOption("Article '" + param.getArticleNo() +
						 * "' is already exist in the list."); return
						 * returnToPage(param, modelAndView); }
						 */
						AQMSubmitQueryDtlParam detail = new AQMSubmitQueryDtlParam(
								artDetail.getArticleNo(),
								artDetail.getDescription(),
								artDetail.getPackBreakDownArticleNo(),
								userDetail.getSiteNo(), artDetail.getUom(), artDetail.getPcode_id());
						if (articleList.size() != size)
							articleList.add(detail);
						else {
							param.setOption("msg");
							param.setMsg("Line Item cannot be more than 99.");
						}
						model.addAttribute("articleSearchResutlsList",
								articleList);
					}
				} else if (articleSearchResutlsList.size() == 1) {
					param.setOption("result");
					if (articleList == null)
						articleList = new ArrayList<AQMSubmitQueryDtlParam>();
					param.setArticleNo(articleSearchResutlsList.get(0)
							.getArticleNo());
					param.setUom(articleSearchResutlsList.get(0).getUom());
					param = compareList(param);
					if (param.getMsg().equalsIgnoreCase("true")) {
						param.setOption("Article '" + param.getArticleNo()
								+ "' is already exist in the list.");
						return returnToPage(param, modelAndView);
					}
					AQMSubmitQueryDtlParam detail = new AQMSubmitQueryDtlParam(
							articleSearchResutlsList.get(0).getArticleNo(),
							articleSearchResutlsList.get(0).getDescription(),
							articleSearchResutlsList.get(0)
									.getPackBreakDownArticleNo(),
							userDetail.getSiteNo(), articleSearchResutlsList
									.get(0).getUom(),articleSearchResutlsList
									.get(0).getPcode_id());
					if (articleList.size() != size)
						articleList.add(detail);
					else {
						param.setOption("msg");
						param.setMsg("Line Item cannot be more than 99.");
					}
					model.addAttribute("articleSearchResutlsList", articleList);
				} else {
					param.setOption("1");
					modelAndView = new ModelAndView("DescriptionPopUpContent");
					model.addAttribute("articleSearchResutlsList",
							articleSearchResutlsList);
				}

			} else {
				model.addAttribute("articleSearchResutlsList", articleList);
				model.addAttribute("noDataFound",
						"Sorry, no results found for your search criteria. Please try again");
				if (!param.getSearchByOptions().equalsIgnoreCase("Description"))
					param.setOption("noData");
				/*
				 * else { param.setOption("1"); modelAndView = new
				 * ModelAndView("MPLorSCAdjUpdate");
				 * model.addAttribute("articleSearchResutlsList", new
				 * ArrayList<ArticleSearchResults>()); }
				 */

			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		return returnToPage(param, modelAndView);
	}

	private ModelAndView returnToPage(ArticleSearchParam param,
			ModelAndView modelAndView) {
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	private ArticleSearchParam compareList(ArticleSearchParam param) {
		// Article already exist in the list
		param.setMsg("false");
		if (articleList != null && articleList.size() > 0) {
			for (AQMSubmitQueryDtlParam detail : articleList) {
				if (detail.getArticleNo()
						.equalsIgnoreCase(param.getArticleNo())
						&& detail.getUom().equalsIgnoreCase(param.getUom())) {
					LOGGER.info("equals");
					param.setMsg("true");
					return param;
				}
			}

		}
		return param;
	}

	@RequestMapping(value = "/editOrDeleteArticle.htm", method = RequestMethod.GET)
	@ResponseBody
	public String editOrDeleteArticle(
			@ModelAttribute("submitQuery") AQMSubmitQueryDtlParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		try {
			if (param.getIndex() != null && param.getArticleNo() != null
					&& articleList != null && articleList.size() > 0) {
				LOGGER.info(param.getSaveOrDeleteFlag());
				if (param.getSaveOrDeleteFlag().equalsIgnoreCase("s")) {
					int index = Integer.parseInt(param.getIndex());
					System.out.println(userDetail.getSalesOrg());
					if(param.getStoreReasonCode().equals(Constants.EXCLUSIVE_REQUEST) || param.getStoreReasonCode().equals(Constants.ZERO_MPL))
					{
						articleList.get(index).setItemQryStatusInd("9");
						articleList.get(index).setResolutionCmt("Your request will be actioned if valid");
					}
					else
					{
						articleList.get(index).setItemQryStatusInd("1");
					}
					System.out.println("param.getUom()+++++"+param.getUom());
					articleList.get(index).setUom(param.getUom());
					articleList.get(index).setStoreReasonCode(
							param.getStoreReasonCode());
					articleList.get(index).setLineItemComments(
							param.getLineItemComments());
					articleList.get(index).setStoreReasonCodeDesc(
							param.getStoreReasonCodeDesc());
					articleList.get(index).setSaveFlag(param.getSaveFlag());
					LOGGER.info(param.getStoreReasonCode() + "index"
							+ param.getIndex());
					return "saved";
				} else if (param.getSaveOrDeleteFlag().equalsIgnoreCase("d")) {
					if (articleList.size() > Integer.parseInt(param.getIndex())
							&& articleList
									.get(Integer.parseInt(param.getIndex()))
									.getArticleNo()
									.equalsIgnoreCase(param.getArticleNo())) {
						LOGGER.info(articleList.size());
						articleList.remove(Integer.parseInt(param.getIndex()));
						LOGGER.info(articleList.size());
					} else {
						for (int i = 0; i < articleList.size(); i++) {
							if (articleList.get(i).getArticleNo()
									.equalsIgnoreCase(param.getArticleNo()))
								articleList.remove(i);
						}
					}
					return "deleted";

				}

			}
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
		return "false";
	}

	@RequestMapping(value = "/submitQuery.htm", method = RequestMethod.POST)
	@ResponseBody
	public String submitQuery(
			@ModelAttribute("submitQuery") AQMSubmitQueryHdrParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String status = "false";

		//DateFormat dateFormat = new SimpleDateFormat("ddMMyyyy  hh:mm");
		DateFormat dateFormat = new SimpleDateFormat("ddMMyyyy");
		String currentDate = dateFormat.format(new Date());
		LOGGER.info("currentDate" + currentDate);//as requested by rc team
		param = new AQMSubmitQueryHdrParam(userDetail.getSiteNo(), userDetail
				.getSalesOrg().toString(), userDetail.getUserId(), userDetail.getUserId()+" - "+userDetail.getUserName(),
				currentDate.toString(), param.getStoreComment(),
				(ArrayList<AQMSubmitQueryDtlParam>) articleList);
		try {
			status = aQMInitiateQueryService.submitQueryDetails(param,userDetail);
			if (status == null)
				return "false";
		} catch (Exception e) {
			e.printStackTrace();
			return "false";
		}
		return status;
	}
	/*
	 * @RequestMapping(value = "/searchArticleWithDescription.htm", method =
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
	 * param.setOption("2"); model.addAttribute("articleSelected",
	 * articleSearchResultsFetched.get(0)); } else { param.setOption("1"); } }
	 * else { model.addAttribute("noDataFound",
	 * "Sorry, no results found for your search criteria. Please try again");
	 * if(!param.getArticleType().equalsIgnoreCase("Description"))
	 * param.setOption("3"); else param.setOption("1");
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
}