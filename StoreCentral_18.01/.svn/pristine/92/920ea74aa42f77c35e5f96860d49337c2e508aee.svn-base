package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import au.com.woolworths.portal.pos.param.AgeVerificationDetailsParam;
import au.com.woolworths.portal.pos.service.AgeVerificationDetailServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xsvm1
 * 
 */
@Controller
@RequestMapping(value = "*/ageVerificationDetail")
@Scope("session")
public class AgeVerificationDetailController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['AgeVerificationDetail']}")
	private String screenCode;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private AgeVerificationDetailServiceImpl ageVerfDtlServImpl;

	@Value("#{properties['ageVerificationDetail']}")
	private String ageVerificationDetail = null;

	private static final Logger LOGGER = Logger
			.getLogger(AgeVerificationDetailController.class.getName());

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

		LOGGER.info("Age Verification Detail");
		return redirectToView(request, "1POS/ageVerificationDetail");
	}

	@RequestMapping(value = "/getAgeVerificationDetail.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getAgeVerificationDetailsBoth(
			@ModelAttribute("ageVerificationDetails") AgeVerificationDetailsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		if (setSessionAndReturnIfInvalid(request, ageVerfDtlServImpl) == true) {
			return "";
		}
		setAgeVerificationDetailsParams(param);
		setSiteDetailsInParams(param);
		return ageVerfDtlServImpl.getAgeVerificationDetails(param);
	}

	@RequestMapping(value = "/getAgeVerificationDetail.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getAgeVerificationDetailsJasper(
			@ModelAttribute("ageVerificationDetails") AgeVerificationDetailsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, IOException {
		if (setSessionAndReturnIfInvalid(request, ageVerfDtlServImpl) == true) {
			return "";
		}
		setAgeVerificationDetailsParams(param);
		setSiteDetailsInParams(param);

		ByteArrayOutputStream byos = ageVerfDtlServImpl
				.getAgeVerificationDetailsJasper(param, ageVerificationDetail,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);

		jasperRptResponseHandler.handleJasperResponse(ageVerificationDetail,
				byos, param.getPrintReportFormat(), response);
		return null;
	}

	private void setAgeVerificationDetailsParams(
			AgeVerificationDetailsParam param) throws ParseException {
		param.setDateTo(param.getDateFrom());
		DateFormat df2 = new SimpleDateFormat("dd/MM/yyyy HH:mm");
		param.setDtFrom(df2.parse(param.getDateFrom() + " "
				+ param.getFromTime()));
		param.setDtTo(df2.parse(param.getDateTo() + " " + param.getToTime()));
	}

}
