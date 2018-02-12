/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.model.ArticleViewList;
import au.com.woolworths.portal.pos.param.MarkdownDetailsParam;
import au.com.woolworths.portal.pos.service.MarkdownDetailsServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author 
 * 
 */
@Controller
@RequestMapping(value = "*/markdowndetails")
@Scope("session")
public class MarkdownDetailsController extends BaseController{

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['MarkdownDetails']}")
	private String screenCode;
	
	@Value("#{properties['markdownDetails']}")
	private String markdownDetails = null;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Autowired
	private MarkdownDetailsServiceImpl markDwnServImpl;
	
	private static final Logger LOGGER = Logger.getLogger(MarkdownDetailsController.class.getName());

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
		LOGGER.info("MarkDownDetails Report");
		return redirectWithDepartmentToView(request, "1POS/markdownDetails");
	}

	@RequestMapping(value = "/getMarkdownDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getMarkdownDetails(
			@ModelAttribute("markdownDetails") MarkdownDetailsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, markDwnServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		return markDwnServImpl.getMarkdownDetails(param);
	}
	
	@RequestMapping(value = "/articleSearch.htm", method = RequestMethod.GET)
	public ModelAndView articleSearch(
			@ModelAttribute("markdownDetails") MarkdownDetailsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (setSessionAndReturnIfInvalid(request, markDwnServImpl)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		setSiteDetailsInParams(param);
		List<ArticleSearchResults> articleSearchResults = markDwnServImpl.articleSearch(param,user);

		ModelMap model = new ModelMap();
		if (articleSearchResults != null && articleSearchResults.size() > 0) {
			model.addAttribute("articleList", articleSearchResults);
		}
		else {
			model.addAttribute("articleList",
					new ArrayList<ArticleViewList>());
		}
		ModelAndView modelAndView = new ModelAndView("1POS/articleLookupPos");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getMarkdownDetailsPdf.pdf", method = RequestMethod.GET)
	@ResponseBody
    public String getMarkdownDetailsPdf(@ModelAttribute("markdownDetails") MarkdownDetailsParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (setSessionAndReturnIfInvalid(request, markDwnServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = markDwnServImpl.getMarkdownDetailsJasper(param, markdownDetails, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(markdownDetails, byos, param.getPrintReportFormat(), response);
		return null;

	}
}
