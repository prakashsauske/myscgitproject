/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.text.ParseException;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.param.POSArticleVoidRefundParam;
import au.com.woolworths.portal.pos.service.POSArticleVoidRefundServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/voidrefund")
@Scope("session")
public class POSArticleVoidRefundController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['VoidRefund']}")
	private String screenCode;

	@Value("#{properties['voidsReport']}")
	private String voidsReport = null;

	@Value("#{properties['refundsReport']}")
	private String refundsReport = null;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private POSArticleVoidRefundServiceImpl voidRefServImpl;

	private static final Logger LOGGER = Logger
			.getLogger(POSArticleVoidRefundController.class.getName());

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
		LOGGER.info("articleVoidRefund");
		return redirectToView(request, "1POS/articleVoidRefund");
	}

	@RequestMapping(value = "/getArticleVoidAndRefundDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleVoidAndRefundDtl(POSArticleVoidRefundParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws ParseException {
		if (setSessionAndReturnIfInvalid(request, voidRefServImpl)) {
			return "";

		}
		setSiteDetailsInParams(param);
		return voidRefServImpl.getArticleVoidAndRefundDtl(param);
	}

	@RequestMapping(value = "/getArticleVoidDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleVoidDtl(POSArticleVoidRefundParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws ParseException {
		if (setSessionAndReturnIfInvalid(request, voidRefServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);

		String obj = voidRefServImpl.getArticleVoidDtlInvokeService(param);
		return "{" + obj + "}";

	}

	@RequestMapping(value = "/getArticleRefundDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleRefundDtl(POSArticleVoidRefundParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws ParseException {

		if (setSessionAndReturnIfInvalid(request, voidRefServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		String obj = voidRefServImpl.getArticleRefundDtlInvokeService(param);
		return "{" + obj + "}";

	}

	@RequestMapping(value = "/getArticleVoidAndRefundDtl.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getArticleVoidAndRefundDtlJasper(
			POSArticleVoidRefundParam param, HttpServletRequest request,
			HttpServletResponse response) throws Throwable {
		if (setSessionAndReturnIfInvalid(request, voidRefServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		
		ByteArrayOutputStream byos = voidRefServImpl.getArticleVoidAndRefundDtlJasper(param, jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse("VoidsAndRefunds", byos, param.getPrintReportFormat(), response);

		// ObjectWriteToNReadFromFile.writeToFile("c:/voidRefund.ser", obj);

		return null;
	}
}
