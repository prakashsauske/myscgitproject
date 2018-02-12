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
import au.com.woolworths.portal.pos.param.POSDeclarationParam;
import au.com.woolworths.portal.pos.service.POSDeclarationResultsServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author 
 * 
 */
@Controller
@RequestMapping(value = "*/posdeclaration")
@Scope("session")
public class POSDeclarationResultsController  extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['POSDeclarationResult']}")
	private String screenCode;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private POSDeclarationResultsServiceImpl posDeclServImpl;

	@Value("#{properties['posDeclaration']}")
	private String posDeclaration = null;

	private static final Logger LOGGER = Logger.getLogger(POSDeclarationResultsController.class.getName());

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
		LOGGER.info("pos Declaration Resulsts");
		return redirectToView(request, "1POS/posDeclarationResults");
	}
	
	@RequestMapping(value = "/getStoreAndCashierName.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getStoreAndCashierName(
			@ModelAttribute("posDeclaration") POSDeclarationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (setSessionAndReturnIfInvalid(request, posDeclServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return posDeclServImpl.getStoreAndCashierName(param);
	}

	@RequestMapping(value = "/getposDeclaration.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPosDeclaration(
			@ModelAttribute("posDeclaration") POSDeclarationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		
		if (setSessionAndReturnIfInvalid(request, posDeclServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return posDeclServImpl.getPosDeclaration(param);
	}

	@RequestMapping(value = "/getposDeclaration.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getposDeclarationJasper(
			@ModelAttribute("posDeclaration") POSDeclarationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException, IOException {
		
		if (setSessionAndReturnIfInvalid(request, posDeclServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = posDeclServImpl.getPosDeclarationJasper(
				param, posDeclaration,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(posDeclaration, byos,
				param.getPrintReportFormat(), response);
		return null;
	}
}
