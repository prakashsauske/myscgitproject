/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.pos.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Calendar;

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
import au.com.woolworths.portal.pos.param.InvesDepartmentSaleTransParam;
import au.com.woolworths.portal.pos.service.InvestigateTransactionServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author
 * 
 */
@Controller
@RequestMapping(value = "*/investigate")
@Scope("session")
public class InvestigateTransactionController extends BaseController {
	

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['departmentSaleTransactions']}")
	private String screenCode;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['operatorHistory']}")
	private String screenCode1;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['noSalesTransactions']}")
	private String screenCode2;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['markdownTransactions']}")
	private String screenCode3;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['savedTransactions']}")
	private String screenCode4;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['soldOverTransactions']}")
	private String screenCode5;
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['PriceInquiry']}")
	private String screenCode6;
	
	
	@Autowired
	private InvestigateTransactionServiceImpl invstTransServImpl;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['manualPriceRTC']}")
	private String manualPriceRTC = null;

	@Value("#{properties['articleSoldByDepartment']}")
	private String articleSoldByDepartment = null;

	@Value("#{properties['noSalesTransaction']}")
	private String noSalesPrint = null;

	@Value("#{properties['investTransOperatorHistory']}")
	private String investTransOperatorHistory = null;

	@Value("#{properties['savedTransaction']}")
	private String savedTransaction = null;

	@Value("#{properties['soldOverRestrictedQty']}")
	private String soldOverRestrictedQtyPrint = null;

	@Value("#{properties['priceInquiry']}")
	private String priceInquiry = null;

	private static final Logger LOGGER = Logger
			.getLogger(InvestigateTransactionController.class.getName());

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public Object onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String param = new String();
		if (null != request.getParameter("dropDown")) {
			param = request.getParameter("dropDown");
			
			if (param.equalsIgnoreCase("deptSales")) {
				screenCode="AC_DPST";
				if(user.getUserAccessMap().containsKey(screenCode)){
					if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
			else if (param.equalsIgnoreCase("operatorHistory")) {
				screenCode1="AC_OPRT";
				if(user.getUserAccessMap().containsKey(screenCode1)){
					if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
			else if (param.equalsIgnoreCase("noSales")) {
				screenCode2="AC_NST";
				if(user.getUserAccessMap().containsKey(screenCode2)){
					if((user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
			else if (param.equalsIgnoreCase("priceMarkdown")) {
				screenCode3="AC_MKT";
				if(user.getUserAccessMap().containsKey(screenCode3)){
					if((user.getUserAccessMap().get(screenCode3).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode3).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
			else if (param.equalsIgnoreCase("savedTrans")) {
				screenCode4="AC_SAVT";
				if(user.getUserAccessMap().containsKey(screenCode4)){
					if((user.getUserAccessMap().get(screenCode4).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode4).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
			else if (param.equalsIgnoreCase("soldOver")) {
				screenCode5="AC_SLDT";
				if(user.getUserAccessMap().containsKey(screenCode5)){
					if((user.getUserAccessMap().get(screenCode5).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode5).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
			else if (param.equalsIgnoreCase("priceInquiry")) {
				screenCode6="AC_PRCINQ";
				if(user.getUserAccessMap().containsKey(screenCode6)){
					if((user.getUserAccessMap().get(screenCode6).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode6).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
						return new ModelAndView("noAccess");
					}
					
				}
			}
		}


		LOGGER.info("Investigate Transaction controller");
		return redirectToView(request, "1POS/investigateTransactions");
	}

	@RequestMapping(value = "/printReportPriceMarkdown.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String printReportPriceMarkdown(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException,
			ParseException {
		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";

		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl.getPriceMarkdownJasper(
				param, manualPriceRTC,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(manualPriceRTC, byos,
				param.getPrintReportFormat(), response);
		return null;

	}

	@RequestMapping(value = "/getDepartSaleTransac.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getDepartSaleTransac(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		return invstTransServImpl.getArticleSoldByDept(param);
	}

	@RequestMapping(value = "/getNoSalesTransjasper.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getNoSalesTransjasper(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";

		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl.getNoSalesTransJasper(
				param, noSalesPrint,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(noSalesPrint, byos,
				param.getPrintReportFormat(), response);
		return null;
	}

	@RequestMapping(value = "/getSoldOverRestjasper.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getSoldOverRestjasper(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl.getSoldOverRestrJasper(
				param, soldOverRestrictedQtyPrint,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(
				soldOverRestrictedQtyPrint, byos, param.getPrintReportFormat(), response);
		return null;
	}

	@RequestMapping(value = "/getSavedTransjasper.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getSavedTransjasper(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";

		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl.getSavedTransJasper(
				param, savedTransaction,
				jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(savedTransaction, byos,
				param.getPrintReportFormat(), response);
		return null;
	}

	@RequestMapping(value = "/getDepartSaleTransac.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getDepartSaleTransacJasper(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException,
			IOException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";

		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl
				.getArticleSoldByDeptJasper(param, articleSoldByDepartment,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(articleSoldByDepartment,
				byos, param.getPrintReportFormat(), response);
		// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.writeToFile("c:\\ArticleSoldByDept.ser",
		// deptSaleTransac);

		return null;
	}

	@RequestMapping(value = "/getPriceMarkDown.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPriceMarkDown(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return invstTransServImpl.getPriceMarkdown(param);
	}

	@RequestMapping(value = "/getOperatorLocationHistory.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getOperatorLocationHistory(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return invstTransServImpl.getOperatorLocationHistory(param);
	}

	@RequestMapping(value = "/getOperatorLocationHistory.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getOperatorLocationHistoryPrint(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws JRException, IOException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl
				.getOperatorLocationHistoryJasper(param,
						investTransOperatorHistory,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(
				investTransOperatorHistory, byos, param.getPrintReportFormat(), response);
		return null;
	}

	@RequestMapping(value = "/getNoSales.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getNoSales(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		return invstTransServImpl.getNoSalesTrans(param);
	}

	public String convertDate(String date) throws ParseException {
		String convertedDate = "";
		DateFormat formatter = new SimpleDateFormat("dd/MM/yyyy");
		Calendar calendar = Calendar.getInstance();
		if (date != null && date != "") {
			String x = date.replaceAll("\\D+", "");

			long milliSeconds = Long.parseLong(x);
			calendar.setTimeInMillis(milliSeconds);
			convertedDate = formatter.format(calendar.getTime());
		}
		return convertedDate;
	}

	public String convertTime(String time) {
		String convertedTime = null;

		if (time != null && time != "") {
			String formatted = ("000000" + time).substring(time.length());

			convertedTime = formatted.substring(0, 2) + ":"
					+ formatted.substring(2, 4);
		}

		return convertedTime;
	}

	@RequestMapping(value = "/getSavedTrans.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSavedTrans(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		return invstTransServImpl.getSavedTrans(param);
	}

	@RequestMapping(value = "/getSoldOverRestricted.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSoldOverRestricted(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}
		setSiteDetailsInParams(param);
		return invstTransServImpl.getSoldOverRestr(param);
	}

	@RequestMapping(value = "/getPriceInquiry.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPriceInquiry(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		return invstTransServImpl.getPriceInquiry(param);
	}
	@RequestMapping(value = "/getPriceInquiry.pdf", method = RequestMethod.GET)
	@ResponseBody
	public String getPriceInquiryJasper(
			@ModelAttribute("investigateTransaction") InvesDepartmentSaleTransParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException, JRException, IOException {

		if (setSessionAndReturnIfInvalid(request, invstTransServImpl)) {
			return "";
		}

		setSiteDetailsInParams(param);
		ByteArrayOutputStream byos = invstTransServImpl
				.getPriceInquiryJasper(param,
						priceInquiry,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),request);
		jasperRptResponseHandler.handleJasperResponse(
				priceInquiry, byos, param.getPrintReportFormat(), response);
		return null;
	}
}
