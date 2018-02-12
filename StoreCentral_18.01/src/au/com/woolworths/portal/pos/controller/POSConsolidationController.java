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
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.param.POSConsolidationParam;
import au.com.woolworths.portal.pos.service.POSConsolidationServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author
 * 
 */
@Controller
@RequestMapping(value = "*/posconsolidation")
@Scope("session")
public class POSConsolidationController extends BaseController {
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['POSConsolidationReport']}")
	private String screenCode;
	private static final Logger LOGGER = Logger
			.getLogger(POSConsolidationController.class.getName());

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private POSConsolidationServiceImpl posConsServImpl;

	@Value("#{properties['posConsolidation']}")
	private String posConsolidation = null;
	
	@Value("#{properties['ALHFinancialData']}")
	private String ALHFinancialData = null;
	
	@Value("#{properties['count']}")
	private String count = null;

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public Object onPageLoad(HttpServletRequest request,
			HttpServletResponse response, POSConsolidationParam param) {
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		LOGGER.info("POS Consolidation Controller");
		return redirectToView(request, "1POS/posConsolidation");
	}
	
	@RequestMapping(value = "/onPageLoad1.htm", method = RequestMethod.GET)
	public Object onPageLoad1(HttpServletRequest request,
			HttpServletResponse response, POSConsolidationParam param) {
		System.out.println("controller1");
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		LOGGER.info("ALH Financial data Controller");
		return redirectToView(request, "1POS/ALHFinancialReport");
	}
	@RequestMapping(value = "/getStoreAndPOS.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getStoreAndPOS(
			@ModelAttribute("posConsolidation") POSConsolidationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (setSessionAndReturnIfInvalid(request, posConsServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return posConsServImpl.getStoreAndPOS(param);
	}

	@RequestMapping(value = "/getPOSConsolidation.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPOSConsolidation(
			@ModelAttribute("posConsolidation") POSConsolidationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		if (setSessionAndReturnIfInvalid(request, posConsServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		try{
		return posConsServImpl.getPosConsolidation(param);
		}catch(Exception ex){
			ex.printStackTrace();
			return "";
		}
	}
	
	@RequestMapping(value = "/getALHFinancial.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPOSConsolidation1(
			@ModelAttribute("posConsolidation") POSConsolidationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		if (setSessionAndReturnIfInvalid(request, posConsServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		try{
		return posConsServImpl.getALHdata(param);
		}catch(Exception ex){
			ex.printStackTrace();
			return "";
		}
	}

	@RequestMapping(value = "/getPOSConsolidation.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getPOSConsolidationJasper(
			@ModelAttribute("posConsolidation") POSConsolidationParam param,
		//	@RequestParam("count") String count,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {
		//System.out.println("count" +count);
		if (setSessionAndReturnIfInvalid(request, posConsServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		
		ByteArrayOutputStream byos = posConsServImpl.getPOSConsolidationJasper(
				param, posConsolidation,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(posConsolidation, byos,
				param.getPrintReportFormat(), response);
		return null;
	}
	

	@RequestMapping(value = "/getALHFinancialData.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getPOSConsolidationJasper1(
			@ModelAttribute("ALHFinancialData") POSConsolidationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {
		System.out.println("For jasper report printing: POS Controller");
		if (setSessionAndReturnIfInvalid(request, posConsServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		
		ByteArrayOutputStream byos = posConsServImpl.getALHFinData(
				param, "ALHFinancialData",
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse("ALHFinancialData", byos,
				param.getPrintReportFormat(), response);
		return null;
	}
}
