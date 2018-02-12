/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JRException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.param.SCOSalesSummaryParam;
import au.com.woolworths.portal.pos.service.SCOSalesSummaryServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xkaew
 * 
 */
@Controller
@RequestMapping(value = "*/salesSummary")
@Scope("session")
public class SCOSalesSummaryController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['SCOSalesSummary']}")
	private String screenCode;

	@Autowired
	private SCOSalesSummaryServiceImpl salesSmryServImpl;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['posScoSalesSummary']}")
	private String posScoSalesSummary = null;

	private static final Logger LOGGER = Logger.getLogger(SCOSalesSummaryController.class.getName());

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
		LOGGER.info("POS SCO Sales summary");
		return redirectToView(request, "1POS/posSCOSalesSummary");
	}
	
	@RequestMapping(value = "/getSCOSummaryBoth.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSCOSummaryBoth(
			@ModelAttribute("posSCOSalesSummary") SCOSalesSummaryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, salesSmryServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return salesSmryServImpl.getSCOSummaryBoth(param);
	}
	@RequestMapping(value = "/getSCOSummaryBoth.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getSCOSummaryBothJasper(
			@ModelAttribute("posSCOSalesSummary") SCOSalesSummaryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException, IOException {

		if (setSessionAndReturnIfInvalid(request, salesSmryServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = salesSmryServImpl.getSCOSummaryBothJasper(param, posScoSalesSummary, jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(posScoSalesSummary, byos, param.getPrintReportFormat(), response);
		return null;
	}

}
