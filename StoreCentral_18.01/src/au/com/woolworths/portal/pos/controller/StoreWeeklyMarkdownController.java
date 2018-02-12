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
import au.com.woolworths.portal.pos.param.StoreWeeklyMarkdownParam;
import au.com.woolworths.portal.pos.service.StoreWeeklyMarkdownServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author
 * 
 */
@Controller
@RequestMapping(value = "*/storeWeekly")
@Scope("session")
public class StoreWeeklyMarkdownController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['storeWeeklyMarkdowns']}")
	private String screenCode;

	@Autowired
	private StoreWeeklyMarkdownServiceImpl storeWeekServImpl;

	@Value("#{properties['storeWeeklyMarkDown']}")
	private String storeWeeklyMarkDown = null;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	private static final Logger LOGGER = Logger
			.getLogger(StoreWeeklyMarkdownController.class.getName());

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
		LOGGER.info("Store Weekly Report");
		return redirectToView(request, "1POS/storeWeeklyMarkdown");
	}

	@RequestMapping(value = "/getStoreWeeklyMarkdown.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getStoreWeeklyMarkdown(
			@ModelAttribute("storeWeeklyMarkdown") StoreWeeklyMarkdownParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, storeWeekServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return storeWeekServImpl.getStoreWeeklyMarkdown(param);
	}

	@RequestMapping(value = "/getStoreWeeklyMarkdown.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getStoreWeeklyMarkdownJasper(
			@ModelAttribute("storeWeeklyMarkdown") StoreWeeklyMarkdownParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, IOException,
			JRException {

		if (setSessionAndReturnIfInvalid(request, storeWeekServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = storeWeekServImpl
				.getStoreWeeklyMarkdownJasper(param, storeWeeklyMarkDown,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(storeWeeklyMarkDown,
				byos, param.getPrintReportFormat(), response);
		return null;
	}

}
