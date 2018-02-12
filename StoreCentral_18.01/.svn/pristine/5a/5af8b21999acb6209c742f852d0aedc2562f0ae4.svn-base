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
import au.com.woolworths.portal.pos.param.DepartmentSalesTaxParam;
import au.com.woolworths.portal.pos.service.POSDepartmentandSalesTaxServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
@Controller
@RequestMapping(value = "*/posdepartmentsales")
@Scope("session")
public class POSDepartmentandSalesTaxController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['DepartmentSales']}")
	private String screenCode;

	private static final Logger LOGGER = Logger
			.getLogger(POSDepartmentandSalesTaxController.class.getName());

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private POSDepartmentandSalesTaxServiceImpl deptSalTaxServImpl;

	@Value("#{properties['departmentSalesTax']}")
	private String departmentSalesTax = null;

	@Value("#{properties['departmentSalesTaxFuel']}")
	private String departmentSalesTaxFuel = null;

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
		LOGGER.info("departmentSalesTax controller");
		return redirectToView(request, "1POS/departmentSales&Tax");
	}

	@RequestMapping(value = "/getDeartmentSaleTax.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getDeartmentSaleTax(
			@ModelAttribute("departmentSalestax") DepartmentSalesTaxParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, deptSalTaxServImpl) == true) {
			return "";
		}
		setSiteDetailsInParams(param);
		return deptSalTaxServImpl.getDeartmentSaleTax(param);
	}

	@RequestMapping(value = "/printReportDeptSalesTaxPDF.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String printReportDeptSalesTaxPDF(
			@ModelAttribute("departmentSalestax") DepartmentSalesTaxParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException,
			ParseException {
		if (setSessionAndReturnIfInvalid(request, deptSalTaxServImpl) == true) {
			return "";
		}
		setSiteDetailsInParams(param);
		if("petrol".equals(param.getDeptSaleTaxBanner())) {
			ByteArrayOutputStream byos = deptSalTaxServImpl
					.getDeartmentSaleTaxJasper(param, departmentSalesTaxFuel,
							jasperRptResponseHandler.getReportSourcePath(request),
							jasperRptResponseHandler.getReportBinPath(request),request);
			jasperRptResponseHandler.handleJasperResponse(departmentSalesTaxFuel, byos,
					param.getPrintReportFormat(), response);
		}
		else {
			ByteArrayOutputStream byos = deptSalTaxServImpl
					.getDeartmentSaleTaxJasper(param, departmentSalesTax,
							jasperRptResponseHandler.getReportSourcePath(request),
							jasperRptResponseHandler.getReportBinPath(request),request);
			jasperRptResponseHandler.handleJasperResponse(departmentSalesTax, byos,
					param.getPrintReportFormat(), response);
		}
		return null;

	}
}
