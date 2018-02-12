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
import au.com.woolworths.portal.pos.param.AgeVerificationSummaryParam;
import au.com.woolworths.portal.pos.service.AgeVerificationSummaryServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xkaew
 * 
 */
@Controller
@RequestMapping(value = "*/ageVerificationSummary")
@Scope("session")
public class AgeVerificationSummaryController extends BaseController {


	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['AgeVerificationSummary']}")
	private String screenCode;
	
	@Autowired
	private AgeVerificationSummaryServiceImpl ageVerfSmryServImpl;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['ageVerificationSummary']}")
	private String ageVerificationSummary = null;

	private static final Logger LOGGER = Logger
			.getLogger(AgeVerificationSummaryController.class.getName());

	@Value("${POSAgeVerificationSummaryURL}")
	private String ageVerificationSummaryURL;

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
		LOGGER.info("Age verification summary Report");
		return redirectToView(request, "1POS/ageVerificationSummaryReport");
	}

	@RequestMapping(value = "/getageVerifSummaryReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getageVerifSummaryReport(
			@ModelAttribute("ageVerificationSummary") AgeVerificationSummaryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, ageVerfSmryServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		return ageVerfSmryServImpl.getAgeVerificationSummary(param);

	}

	@RequestMapping(value = "/getAgeVerificationSummaryPDF.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getAgeVerificationSummaryPDF(
			@ModelAttribute("ageVerificationSummary") AgeVerificationSummaryParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, ageVerfSmryServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = ageVerfSmryServImpl
				.getAgeVerificationSummaryJasper(param, ageVerificationSummary,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);

		jasperRptResponseHandler.handleJasperResponse(ageVerificationSummary,
				byos, param.getPrintReportFormat(), response);
		return null;

	}
}
