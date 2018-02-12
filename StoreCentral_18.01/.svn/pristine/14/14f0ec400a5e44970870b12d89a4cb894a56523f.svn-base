package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

//import java.util.logging.Logger;
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

import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.MPLorSCAdjParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.MPLorSCAdjServiceImpl;

@Controller
@RequestMapping("*/MPLorSCAdj")
public class MPLorSCAdjController extends BaseController {

	private static final Logger LOGGER = Logger.getLogger(MPLorSCAdjController.class.getName());

	private ModelMap model = null;
	private List<ArticleSearchResults> articleSearchResultsFetched = null;

	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['MPLSCAdjustment']}") applicationSettings CR
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private MPLorSCAdjServiceImpl MPLorSCAdjServiceImpl;

	public MPLorSCAdjServiceImpl getMPLorSCAdjServiceImpl() {
		return MPLorSCAdjServiceImpl;
	}

	public void setMPLorSCAdjServiceImpl(
			MPLorSCAdjServiceImpl mPLorSCAdjServiceImpl) {
		MPLorSCAdjServiceImpl = mPLorSCAdjServiceImpl;
	}

	/*****************
	 * PAGE LOAD OF MPLorSCADJ *******************************************
	 * CALLED ON CLICK OF THE ICON MPL / SC Adjustment IN THE HEADER MENU
	 ****************/

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView stockAdjustFromHome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		/*if(user.getUserAccessMap().containsKey(screenCode)){
			if(user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		//LOGGER.setLevel(java.util.logging.Level.INFO);
		String noDataFound = "";
		LOGGER.info("INSIDE ONPAGE LOAD MPLorSCADJController");
		model = new ModelMap();
		model.addAttribute("noDataFound", noDataFound);
		ModelAndView modelAndView = new ModelAndView("MPLorSCAdj");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/******************************* END OF ON PAGE LOAD *********************************/

	/******************************** REFRESH OF BUTTON CLICK OF BROWSER ******************/

	@RequestMapping(value = "/searchArticle.htm", method = RequestMethod.GET)
	public ModelAndView searchArticleGet(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		ModelAndView modelAndView = new ModelAndView("MPLorSCAdj");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/******************************* END OF REFRESH OF BUTTON CLICK OF BROWSER ********************/

	/******************************* GO BUTTON CLICK ON MPLorSCADJ SCREEN *************************/

	@RequestMapping(value = "/searchArticle.htm", method = RequestMethod.POST)
	public ModelAndView searchArticle(
			@ModelAttribute("MPLorSCAdj") MPLorSCAdjParam MplOrScAdjParam,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		model.addAttribute("noDataFound", "");

		/******************** FORM ELEMENT BINDING **********************/

		if (!result.hasErrors()) {
			LOGGER.info("Binding successful in searchArticle");
			LOGGER.info(MplOrScAdjParam.getArticleNo());
		} else {
			LOGGER.info("Binding failed");
			ModelAndView modelAndView = new ModelAndView("MPLorSCAdj");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");

		// setting siteNo
		MplOrScAdjParam.setSiteNo(userContext.getSiteNo());

		// service call
		try {
			articleSearchResultsFetched = MPLorSCAdjServiceImpl
					.getArticleDetails(MplOrScAdjParam,userContext);
		} catch (Exception e) {
			e.printStackTrace();
		}

		// setting switch option for JSP
		MplOrScAdjParam.setOption("1");

		model.addAttribute("articleSearchResutlsList",
				articleSearchResultsFetched);
		if (articleSearchResultsFetched != null
				&& articleSearchResultsFetched.size() > 0) {
			if (articleSearchResultsFetched != null
					&& articleSearchResultsFetched.size() == 1) {
				MplOrScAdjParam.setOption("2");
				model.addAttribute("articleSelected",
						articleSearchResultsFetched.get(0));
			} else {
				MplOrScAdjParam.setOption("1");
			}
		} else {
			model.addAttribute("noDataFound",
					"Sorry, no results found for your search criteria. Please try again");
			if (!MplOrScAdjParam.getArticleType().equalsIgnoreCase(
					"Description"))
				MplOrScAdjParam.setOption("3");
			else
				MplOrScAdjParam.setOption("1");
			model.addAttribute("articleSelected", new ArticleSearchResults());
			model.addAttribute("articleSearchResutlsList",
					new ArrayList<ArticleSearchResults>());
		}

		model.addAttribute("param", MplOrScAdjParam);
		ModelAndView modelAndView = new ModelAndView("MPLorSCAdjUpdate");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/******************************* END OF GO BUTTON CLICK ON MPLorSCADJ SCREEN *************************/

	/******************************* SELECT BUTTON CLICK OFF DESCRIPTION RESULT IN MPLorSCADJ SCREEN *************************/

	@RequestMapping(value = "/selectArticle.htm", method = RequestMethod.POST)
	public ModelAndView selectArticle(
			@ModelAttribute("MPLorSCAdj") MPLorSCAdjParam MplOrScAdjParam,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView("");
		}
		model.addAttribute("noDataFound", "");

		/******************** FORM ELEMENT BINDING **********************/

		if (!result.hasErrors()) {
			LOGGER.info("Binding successful in searchArticle");
			LOGGER.info(MplOrScAdjParam.getIndex());
		} else {
			LOGGER.info("Binding failed");
			ModelAndView modelAndView = new ModelAndView("MPLorSCAdj");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}

		if (articleSearchResultsFetched != null
				&& articleSearchResultsFetched.size() > 0) {
			LOGGER.info(String.valueOf(articleSearchResultsFetched.size()));
			MplOrScAdjParam.setOption("2");
			model.addAttribute("articleSelected", articleSearchResultsFetched
					.get(Integer.parseInt(MplOrScAdjParam.getIndex())));
		}
		model.addAttribute("param", MplOrScAdjParam);
		ModelAndView modelAndView = new ModelAndView("MPLorSCAdjUpdate");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/******************************* END OF SELECT BUTTON CLICK OFF DESCRIPTION RESULT IN MPLorSCADJ SCREEN *************************/
}
