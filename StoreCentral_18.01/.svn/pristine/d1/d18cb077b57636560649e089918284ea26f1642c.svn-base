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
import au.com.woolworths.portal.pos.param.ManualFuelPromotionsParam;
import au.com.woolworths.portal.pos.service.ManualFuelPromotionsServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xsvm1
 * 
 */
@Controller
@RequestMapping(value = "*/manualFuelPromotions")
@Scope("session")
public class ManualFuelPromotionsController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ManaualFuelPromotions']}")
	private String screenCode;

	@Autowired
	private ManualFuelPromotionsServiceImpl manualFuelPriceInfo;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['manualFuelPromotionsReport']}")
	private String manualFuelPromotionsReport = null;

	private static final Logger LOGGER = Logger
			.getLogger(ManualFuelPromotionsController.class.getName());

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
		LOGGER.info("Manual Fuel promotions on page load");
		return redirectToView(request, "1POS/ManualFuelPromotions");
	}

	@RequestMapping(value = "/getManualFuelPromo.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSCOSummaryBoth(
			@ModelAttribute("manualFuelPromo") ManualFuelPromotionsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, manualFuelPriceInfo)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return manualFuelPriceInfo.getManualFuelPromo(param);
	}

	@RequestMapping(value = "/getManualFuelPromo.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getManualFuelPromoJasper(
			@ModelAttribute("manualFuelPromo") ManualFuelPromotionsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, manualFuelPriceInfo)) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = manualFuelPriceInfo
				.getManualFuelPromoJasper(param, manualFuelPromotionsReport,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(
				manualFuelPromotionsReport, byos, param.getPrintReportFormat(),
				response);
		return null;
	}

}
