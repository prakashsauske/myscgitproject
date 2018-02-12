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
import au.com.woolworths.portal.pos.param.SalesByArticleParam;
import au.com.woolworths.portal.pos.service.SalesByArticleServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xkaew
 * 
 */
@Controller
@RequestMapping(value = "*/salesByArticle")
@Scope("session")
public class SalesByArticleController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['SalesByArticle']}")
	private String screenCode;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private SalesByArticleServiceImpl salesByArtServImpl;

	@Value("#{properties['salesByArticle']}")
	private String salesByArticle = null;

	private static final Logger LOGGER = Logger
			.getLogger(SalesByArticleController.class.getName());

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
		LOGGER.info("Sales By Article Report");
		return redirectWithDepartmentToView(request, "1POS/salesByArticles");
	}

	@RequestMapping(value = "/getSalesByArticle.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSalesByArticle(
			@ModelAttribute("salesByArticle") SalesByArticleParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, salesByArtServImpl)) {
			return "";
		}
		LOGGER.info("Sales By Article Controller");
		// setSaleByArticleParam(param);
		setSiteDetailsInParams(param);
		return salesByArtServImpl.getSalesByArticle(param);
	}

	@RequestMapping(value = "/getSalesByArticletoPDF.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getSalesByArticletoPDF(
			@ModelAttribute("salesByArticle") SalesByArticleParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, salesByArtServImpl)) {
			return "";
		}

		setSaleByArticleParam(param);
		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = salesByArtServImpl
				.getSalesByArticleJasper(param, salesByArticle,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(salesByArticle, byos,
				param.getPrintReportFormat(), response);
		return null;

	}

	private void setSaleByArticleParam(SalesByArticleParam param) {
		if (param.getCategory() == "" || param.getCategory() == null) {
			param.setCategory("All");
		}
		if (param.getSubCat() == "" || param.getSubCat() == null) {
			param.setSubCat("All");
		}
		if (param.getSegme() == "" || param.getSegme() == null) {
			param.setSegme("All");
		}
		if (param.getDepartment() == "" || param.getDepartment() == null) {
			param.setDepartment(param.getDepartmentList());
		}
	}
}
