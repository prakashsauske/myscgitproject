package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;

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
import au.com.woolworths.portal.pos.param.PaidInPaidOutParam;
import au.com.woolworths.portal.pos.service.PaidInPaidOutServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * 
 * @author xsvm1
 * 
 */
@Controller
@RequestMapping(value = "*/paidinpaidout")
@Scope("session")
public class PaidInPaidOutController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['PaidInPaidOut']}")
	private String screenCode;
	
	private static final Logger LOGGER = Logger
			.getLogger(PaidInPaidOutController.class.getName());

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private PaidInPaidOutServiceImpl pInOutServImpl;

	@Value("#{properties['paidInPaidOut']}")
	private String paidInPaidOut = null;

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
		LOGGER.info("Paid In Paid Out Report onPageLoad");
		return redirectToView(request, "1POS/paidInPaidOut");
	}

	@RequestMapping(value = "/getPaidInPaidOut.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPaidInPaidOut(
			@ModelAttribute("paidInPaidOut") PaidInPaidOutParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		if (setSessionAndReturnIfInvalid(request, pInOutServImpl) == true) {
			return "";
		}
		setSiteDetailsInParams(param);
		return pInOutServImpl.getPaidInPaidOut(param);
	}

	@RequestMapping(value = "/getPaidInPaidOut.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getPaidInPaidOutJasper(
			@ModelAttribute("paidInPaidOut") PaidInPaidOutParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, IOException {
		if (setSessionAndReturnIfInvalid(request, pInOutServImpl) == true) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = pInOutServImpl.getPaidInPaidOutJasper(param, paidInPaidOut,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
			jasperRptResponseHandler.handleJasperResponse(paidInPaidOut, byos, param.getPrintReportFormat(), response);
		return null;
	}

}
