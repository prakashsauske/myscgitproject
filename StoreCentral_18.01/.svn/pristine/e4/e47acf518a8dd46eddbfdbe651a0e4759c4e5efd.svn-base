/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.controller;

import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

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

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.SUGOReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.SUGOServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xkaew
 * 
 */
@Controller
@RequestMapping(value = "*/SUGOController")
@Scope("session")
public class SUGOController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['SUGOReport']}")
	private String screenCode;
	

	@Autowired
	private SUGOServiceImpl sugoServiceImpl;
	private ModelMap model;
	private UserContext userDetail;


	

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
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();
		userDetail = (UserContext) request.getSession().getAttribute("user");
		
		//system.out.println("SUGO Onpage Load ::> "+userDetail.getSiteNo());
		ModelAndView modelAndView = new ModelAndView("sugoreviewReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getSUGOReports.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getMarkdownDetails(@ModelAttribute("viewQuery") SUGOReportParam param, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		//system.out.println("HI  I am in controller");
		//system.out.println(param.getStoreNumber());
		SUGOReportParam result=null;
		try{
			
			result=sugoServiceImpl.getSUGOReports(param,userDetail);
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return Constants.convertToJsonString(result);
		
	}

	
}
