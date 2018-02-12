/**controller used for create Stock transfer */
package au.com.woolworths.portal.controller;

import java.util.HashMap;
import java.util.Map;

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
import au.com.woolworths.portal.service.ApplicationSettingDAOImpl;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author ganesh
 * 
 */
@Controller
@RequestMapping(value = "*/stockTransfer")
@Scope("session")
public class StockTransferController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['StockTransfer']}")
	private String screenCode;

	/**
	 * Ganesh changes start
	 * 
	 * @param request
	 * @param response
	 * @return
	 * @throws Exception
	 */

	@RequestMapping(value = "/stockTransferOnPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView stockTransferOnPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		System.out.println("inside stockTransferOnPageLoad method start ");
		ModelMap model = null;
		ModelAndView modelAndView = null;
		Map<String, String> salesOrgMap = null;
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
		modelAndView = new ModelAndView("stockTransfer");
		try {
			System.out
					.println("calling ApplicationSettingDAOImpl to get the list of sales org ");

			salesOrgMap = ApplicationSettingDAOImpl.getAllSalesOrg();

			System.out
					.println("response from ApplicationSettingDAOImpl to get the list of sales org ");
			model.addAttribute(
					"salesOrgMap",
					(salesOrgMap != null && salesOrgMap.size() > 0) ? salesOrgMap
							: new HashMap<String, String>());
		} catch (Exception e) {
			e.printStackTrace();
		}

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		System.out.println("inside stockTransferOnPageLoad method end ");
		return modelAndView;
	}

}