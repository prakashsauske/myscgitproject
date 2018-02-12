package au.com.woolworths.portal.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.NightFillLabourPlanParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.NightFillLabourPlanServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/nightFillReport")
@Scope("session")
public class NightFillLabourPlanController extends BaseController {

	@Autowired
	private NightFillLabourPlanServiceImpl nightFillLabourPlanService;

	private UserContext userDetail;

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		ModelAndView modelAndView = new ModelAndView("nightFillLabourPlan");
		return modelAndView;
	}

	@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("nightFill") NightFillLabourPlanParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		String status = "";
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setStoreId(userDetail.getSiteNo());
			System.out.println("Get Kronos :: >"+userDetail.getSiteNo());
		try {
			status = nightFillLabourPlanService.getKRONOSdetails(param,userDetail);
		} catch (Exception e) {
			status = Constants.EXCEPTION;

		}
		return status;
	}

}
