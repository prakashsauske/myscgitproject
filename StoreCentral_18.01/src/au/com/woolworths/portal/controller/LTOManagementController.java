/**
 * 
 */
package au.com.woolworths.portal.controller;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xmrah
 *
 */
@Controller
@Scope("session")
@RequestMapping(value = "*/ltoMgmnt")
public class LTOManagementController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['LtoManagement']}")
	private String screenCode;
	


	private ModelMap model;
	
	// ************************* on page load*********
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
			if(user.getUserAccessMap().containsKey(screenCode)){
				if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
					return new ModelAndView("noAccess");
				}
				
			}
			/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
			model = new ModelMap();
			ModelAndView modelAndView = new ModelAndView("ltoManagement");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
	
	

}
