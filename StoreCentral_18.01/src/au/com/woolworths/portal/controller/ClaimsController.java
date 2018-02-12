package au.com.woolworths.portal.controller;


import java.util.ArrayList;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.UserSiteDtl;
import au.com.woolworths.portal.param.AQMSearchQueryParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.UserMgtDAOImpl;

@Controller
@RequestMapping(value = "*/claims")
@Scope("session")
public class ClaimsController extends BaseController {
	
	
	@RequestMapping(value = "/createClaim.htm", method = RequestMethod.GET)
	public ModelAndView createClaim(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		ModelAndView modelAndView = new ModelAndView("createClaim");
		return modelAndView;
	}
	
	@RequestMapping(value = "/draftClaim.htm", method = RequestMethod.GET)
	public ModelAndView draftClaim(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		ModelAndView modelAndView = new ModelAndView("claimDraft");
		return modelAndView;
	}
	
	@RequestMapping(value = "/finaliseClaim.htm", method = RequestMethod.GET)
	public ModelAndView finaliseClaim(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		ModelAndView modelAndView = new ModelAndView("claimFinalisation");
		return modelAndView;
	}
	
	@RequestMapping(value = "/claimLookup.htm", method = RequestMethod.GET)
	public ModelAndView claimLookup(HttpServletRequest request, HttpServletResponse response) throws Exception{
		
		ModelAndView modelAndView = new ModelAndView("claimLookup");
		return modelAndView;
	}
	
	
}
