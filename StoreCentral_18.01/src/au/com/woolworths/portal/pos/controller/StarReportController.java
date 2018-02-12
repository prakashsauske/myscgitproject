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
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.param.StarReportParam;
import au.com.woolworths.portal.pos.service.StarReportServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author 
 * 
 */
@Controller
@RequestMapping(value = "*/starreport")
@Scope("session")
public class StarReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['StarReport']}")
	private String screenCode;

	@Autowired
	private StarReportServiceImpl starRptServImpl;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	private static final Logger LOGGER = Logger
			.getLogger(StarReportController.class.getName());

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
		LOGGER.info("Star Report");
		return redirectToView(request, "1POS/starReport");
	}

	@RequestMapping(value = "/printStarReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String printReport(
			@ModelAttribute("starReport") StarReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		if (setSessionAndReturnIfInvalid(request, starRptServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return starRptServImpl.getStarReport(param);
	}

	@RequestMapping(value = "/printStarReport.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String printReportJasper(
			@ModelAttribute("starReport") StarReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Throwable {
		long startTime = System.currentTimeMillis();
		if (setSessionAndReturnIfInvalid(request, starRptServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		setStoreStaffNoRecs(param);

		ByteArrayOutputStream byos = starRptServImpl.getStarReportJasper(param, jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse("StarReport", byos, param.getPrintReportFormat(), response);

		long endTime = System.currentTimeMillis();
		LOGGER.info("" + (((double) endTime - (double) startTime) / 1000)
				+ " Seconds");
		return null;
	}
	private void setStoreStaffNoRecs(StarReportParam param) {
		if ("Both".equalsIgnoreCase(param.getPerformance())) {
			param.setStaffNoOfRecs(5);
			param.setStoreNoOfRecs(5);
		} else if ("Staff".equalsIgnoreCase(param.getPerformance())) {
			param.setStaffNoOfRecs(Integer.parseInt(param
					.getPosDropDwn()));
		} else if ("Store".equalsIgnoreCase(param.getPerformance())) {
			param.setStoreNoOfRecs(Integer.parseInt(param
					.getPosDropDwn()));
		}
	}
}
