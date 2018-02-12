package au.com.woolworths.portal.controller;

import java.util.ArrayList;

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

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.RepairCreateParam;
import au.com.woolworths.portal.param.RepairSearchParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.RepairCentreServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/repair")
@Scope("session")
public class RepairCentreController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['RepairAndSpares']}")
	private String screenCode1;
	
	@Value("#{properties['NewServiceOrder']}")
	private String screenCode2;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private RepairCentreServiceImpl repairCentreService;

	private ModelMap model;

	//private UserContext userDetail;

	// On click of Repair and Spares in Navigation bar this function is called
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
		if(user.getUserAccessMap().containsKey(screenCode1)){
			if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		System.out
				.println("inside method start onPageLoad RepairCentreController");

		model = new ModelMap();
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		model.addAttribute("closureList", setClosureList());
		model.addAttribute("created_order", request.getParameter("serviceOrderNo"));
		ModelAndView modelAndView = new ModelAndView("repair-Lookup");
		modelAndView.addObject("banner", userDetail.getImgLocation());
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		System.out
				.println("inside method end onPageLoad RepairCentreController");
		return modelAndView;
	}

	private ArrayList<String> setClosureList() {

		ArrayList<String> clousreList = null;

		clousreList = new ArrayList<String>();

		clousreList.add("Replacement Processed");
		clousreList.add("Claim Processed");
		clousreList.add("Repaired and returned");
		clousreList.add("Cancelled - Duplicate/Incorrect");
		clousreList.add("Payment Adjusted");
		clousreList.add("Others");

		return clousreList;

	}

	// Navigating to create Repair service order
	@RequestMapping(value = "/redirectToCreateRepairServiceOrder.htm", method = RequestMethod.GET)
	public ModelAndView redirectToCreateRepairServiceOrder(
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode2)){
			if((user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		System.out
				.println("inside method start redirectToCreateRepairServiceOrder RepairCentreController");

		String fromPage = request.getParameter("fromPage");

		model = new ModelMap();
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView(
				"repair-CreateServiceOrder");
		model.addAttribute("fromPage", fromPage);
		modelAndView.addObject("banner", userDetail.getImgLocation());
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		System.out
				.println("inside method end redirectToCreateRepairServiceOrder RepairCentreController");
		return modelAndView;
	}

	// this function is called when search is done from create service order
	@RequestMapping(value = "/searchArticle.htm", method = RequestMethod.POST)
	@ResponseBody
	public String searchArticle(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println("inside method start searchArticle RepairCentreController");

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		System.out
				.println("inside method start searchArticle RepairCentreController");

		return repairCentreService.searchArticle(param,userDetail);
	}

	// this function is called after a valid article number is populated in
	// create screen
	@RequestMapping(value = "/getArticleServiceAggrement.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getArticleServiceAggrement(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		if (param.getArticleNo() == null
				|| param.getArticleNo().trim().equalsIgnoreCase("")) {
			param.setArticleNo(request.getParameter("articleNo"));
			System.out.println("articleNo :" + param.getArticleNo() + " "
					+ param.getSiteNo());
		}

		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		return repairCentreService.getServiceAgreementForArticle(param,userDetail);
	}

	// On click of submit after validation Service order is created
	@RequestMapping(value = "/createRepairServiceOrder.htm", method = RequestMethod.GET)
	@ResponseBody
	public String createRepairServiceOrder(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}

		System.out
				.println(" method start inside searchRepairServiceOrder controller");
		UserContext userDetail = ((UserContext) request.getSession()
				.getAttribute("user"));
		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		System.out
				.println(" method start inside searchRepairServiceOrder controller");
		return repairCentreService.createServiceOrder(param,userDetail);

	}

	// On click of cancel button on in service order detail screen
	@RequestMapping(value = "/cancelRepairServiceOrder.htm", method = RequestMethod.POST)
	@ResponseBody
	public String cancelRepairServiceOrder(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside cancelServiceOrder controller");

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		System.out
				.println(" method start inside cancelServiceOrder controller");
		return repairCentreService.cancelServiceOrder(param,userDetail);

	}

	// On click of complete button on in service order detail screen
	@RequestMapping(value = "/completeRepairServiceOrder.htm", method = RequestMethod.POST)
	@ResponseBody
	public String completeRepairServiceOrder(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside cancelServiceOrder controller");

		param.setSiteNo(userDetail.getSiteNo());

		System.out
				.println(" method start inside cancelServiceOrder controller");
		return repairCentreService.completeServiceOrder(param,userDetail);

	}

	// On click of submit after validation Service order is created
	@RequestMapping(value = "/updateRepairServiceOrder.htm")
	@ResponseBody
	public String updateRepairServiceOrder(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		param.setSiteNo(userDetail.getSiteNo());

		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		return repairCentreService.updateServiceOrder(param,userDetail);

	}

	// METHOD CALLED ON CLICK OF GO BUTTON IN SERVICE ORDER LOOK UP SCREEN
	@RequestMapping(value = "/searchRepairServiceOrder.htm", method = RequestMethod.POST)
	@ResponseBody
	public String searchRepairServiceOrder(
			@ModelAttribute("RepairSearchParam") RepairSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		param.setSiteNo(userDetail.getSiteNo());

		System.out
				.println(" method start inside searchRepairServiceOrder controller");
		return repairCentreService.searchServiceOrder(param,userDetail);
	}

	// METHOD CALLED ON CLICK OF SERVICE ORDER NO IN SEARCH SCREEN
	@RequestMapping(value = "/getServiceOrderDetails.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getServiceOrderDetails(
			@ModelAttribute("RepairUpdateParam") RepairSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside getServiceOrderDetails controller");

		param.setSiteNo(userDetail.getSiteNo());

		System.out
				.println(" method start inside getServiceOrderDetails controller"
						+ CommonUtils.convertObjectTojson(param));
		return repairCentreService.getServiceOrderDetails(param,userDetail);
	}

	// METHOD CALLED ON CLICK OF SERVICE ORDER NO IN SEARCH SCREEN TO PRINT THE
	// CARTON LABEL
	@RequestMapping(value = "/getCartonLabelForServiceOrder.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getCartonLabelForServiceOrder(
			@ModelAttribute("RepairUpdateParam") RepairSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside getCartonLabelForServiceOrder controller");

		param.setSiteNo(userDetail.getSiteNo());

		System.out
				.println(" method start inside getCartonLabelForServiceOrder controller"
						+ CommonUtils.convertObjectTojson(param));
		return repairCentreService.getCartonLabelForServiceOrder(param,userDetail);
	}

	// METHOD CALLED ON CLICK OF REMINDER BUTTON IN SEARCH SCREEN
	@RequestMapping(value = "/remindRepairServiceOrder.htm")
	@ResponseBody
	public String remindRepairServiceOrder(
			@ModelAttribute("RepairCreateParam") RepairCreateParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return Constants.SESSION_EXPIRED;
		}
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		param.setSiteNo(userDetail.getSiteNo());
		param.setReminderFlag(Constants.TRUE);

		System.out
				.println(" method start inside searchRepairServiceOrder controller");

		return repairCentreService.updateServiceOrder(param,userDetail);

	}
}
