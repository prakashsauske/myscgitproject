/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;

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
import au.com.woolworths.portal.pos.param.StorePerformancePOSParam;
import au.com.woolworths.portal.pos.service.StorePerformanceServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author
 * 
 */
@Controller
@RequestMapping(value = "*/storeperfomance")
@Scope("session")
public class StorePerformanceController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['StorePerformance']}")
	private String screenCode;

	@Autowired
	private StorePerformanceServiceImpl storePerfServImpl;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['storePerformance']}")
	private String storePerformance = null;

	private static final Logger LOGGER = Logger
			.getLogger(StorePerformanceController.class.getName());

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
		LOGGER.info("Store Performance Controller");
		return redirectToView(request, "1POS/storePerformance");
	}

	@RequestMapping(value = "/getStorePerformance.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getStorePerformance(
			@ModelAttribute("storePerformance") StorePerformancePOSParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, storePerfServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		setParamTime(param);
		return storePerfServImpl.getStorePerformance(param);
	}

	@RequestMapping(value = "/getStorePerformance.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getStorePerformanceJasper(
			@ModelAttribute("storePerformance") StorePerformancePOSParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, storePerfServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		setParamTime(param);
		ByteArrayOutputStream byos = storePerfServImpl
				.getStorePerformanceJasper(param, storePerformance,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(storePerformance, byos,
				param.getPrintReportFormat(), response);
		return null;
	}

	private void setParamTime(StorePerformancePOSParam param)
			throws ParseException {
		SimpleDateFormat timeFormat1 = new SimpleDateFormat("HH:mm");
		SimpleDateFormat timeFormat2 = new SimpleDateFormat("HH:mm:ss");
		Date startTime = timeFormat1.parse(param.getFromTime());
		Date endTime = timeFormat1.parse(param.getToTime());

		param.setFromTime(timeFormat2.format(startTime));
		param.setToTime(timeFormat2.format(endTime));
	}
}
