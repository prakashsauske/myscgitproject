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
import au.com.woolworths.portal.pos.param.ManualFuelSalesParam;
import au.com.woolworths.portal.pos.service.ManualFuelSalesServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xsvm1
 * 
 */
@Controller
@RequestMapping(value = "*/manualFuelSales")
@Scope("session")
public class ManualFuelSalesController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ManaualFuelSales']}")
	private String screenCode;
	
	@Autowired
	private ManualFuelSalesServiceImpl manualFuelSales;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['manualFuelSalesReport']}")
	private String manualFuelSalesReport = null;

	private static final Logger LOGGER = Logger
			.getLogger(ManualFuelSalesController.class.getName());

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
		LOGGER.info("Manual Fuel Sales on page load");
		return redirectToView(request, "1POS/ManualFuelSales");
	}

	@RequestMapping(value = "/getManualFuelSales.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSCOSummaryBoth(
			@ModelAttribute("manualFuelPromo") ManualFuelSalesParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, manualFuelSales)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return manualFuelSales.getManualFuelSales(param);
	}

	@RequestMapping(value = "/getManualFuelSales.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getManualFuelPromoJasper(
			@ModelAttribute("manualFuelPromo") ManualFuelSalesParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, manualFuelSales)) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = manualFuelSales
				.getManualFuelSalesJasper(param, manualFuelSalesReport,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(
				manualFuelSalesReport, byos, param.getPrintReportFormat(),
				response);
		return null;
	}

}
