/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.pos.controller;

import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.param.POSUnknowOrUnrangedParam;
import au.com.woolworths.portal.pos.service.UnknownandUnRangedArticleServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/unknownarticle")
@Scope("session")
public class UnknownandUnRangedArticleController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['UnknownArticlesUnRanged']}")
	private String screenCode;

	@Autowired
	private UnknownandUnRangedArticleServiceImpl unKnRngServImpl;

	private static final Logger LOGGER = Logger
	.getLogger(UnknownandUnRangedArticleController.class.getName());

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public Object onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		LOGGER.info("Store Weekly Report");
		return redirectToView(request, "1POS/unKnown&unRangedArticles");
	}

	@RequestMapping(value = "/getUnkownRanged.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getUnkownRanged(
			@ModelAttribute("unknownArticle") POSUnknowOrUnrangedParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws ParseException {

		if (setSessionAndReturnIfInvalid(request, unKnRngServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return unKnRngServImpl.getUnknownUnrangedArticles(param);
	}
	
	
	

}
