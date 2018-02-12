package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.EDGMSDiscrepancy;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.EdgmsDiscrepancyParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.EdgmsDiscrepancyServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/edgmsDiscrepancy")
@Scope("session")
public class EdgmsDiscrepancyController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['eDGMSDiscrepanciesReport']}")
	private String screenCode;
	@Value("#{properties['eDGMSDiscrepancies']}")
	private String eDGMSDiscrepancies=null;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private EdgmsDiscrepancyServiceImpl edgmsDiscrepancyServiceImpl;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;


	private ModelMap model;
	private EdgmsDiscrepancyParam param;
	private byte[] pdfArray = null;
	private String convertedDate = null;
	private Map<String, List<EDGMSDiscrepancy>> edgmsDiscrepancyMap = null;
	List<EDGMSDiscrepancy> edgmsDiscrepancyList = new ArrayList<EDGMSDiscrepancy>();

	public EdgmsDiscrepancyServiceImpl getEdgmsDiscrepancyServiceImpl() {
		return edgmsDiscrepancyServiceImpl;
	}

	public void setEdgmsDiscrepancyServiceImpl(
			EdgmsDiscrepancyServiceImpl edgmsDiscrepancyServiceImpl) {
		this.edgmsDiscrepancyServiceImpl = edgmsDiscrepancyServiceImpl;
	}

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadEDGMS(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode)){
			if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model = new ModelMap();
		param = new EdgmsDiscrepancyParam();
		model.addAttribute("noData", "");
		model.addAttribute("today", "today");
		param.setDiscrpAmt("20");

		/*
		 * List<EDGMSDiscrepancy> edgmsDiscrepancyList = null; String vendorDesc
		 * = null;
		 */
		try {

			Map<String, String> weekMap = new LinkedHashMap<String, String>();
			DateFormat dateFormat = new SimpleDateFormat("EEE, dd MMM");

			// DateFormat dateSAPFormat = new SimpleDateFormat("yyyyMMdd");
			DateFormat dateSAPFormat = new SimpleDateFormat("dd/MM/yyyy");
			Calendar cal = Calendar.getInstance();

			weekMap.put(dateSAPFormat.format(new Date()), "Today");

			for (int index = -1; index > -7; index--) {
				cal = Calendar.getInstance();
				cal.add(Calendar.DATE, index);

				weekMap.put(dateSAPFormat.format(cal.getTime()),
						dateFormat.format(cal.getTime()));
			}
			model.addAttribute("weekMap", weekMap);

			model.addAttribute("param", param);

			UserContext userContext = (UserContext) (request.getSession()
					.getAttribute("user"));
			param.setSiteNo(userContext.getSiteNo());
			param.setInputDate(dateSAPFormat.format(new Date()));
			edgmsDiscrepancyMap = new HashMap<String, List<EDGMSDiscrepancy>>();

			/*
			 * TODO : Hardcoded for now. Needs to be set from the dropdown
			 * value.
			 */
			/*
			 * ////System.out.println("today date-->"+dateSAPFormat.format(new
			 * Date())); param.setInputDate(dateSAPFormat.format(new Date()));
			 * 
			 * edgmsDiscrepancyList =
			 * (ArrayList<EDGMSDiscrepancy>)getEdgmsDiscrepancyServiceImpl
			 * ().getEDGMSDiscrepancies(param);
			 * 
			 * 
			 * 
			 * if(edgmsDiscrepancyList != null && edgmsDiscrepancyList.size() !=
			 * 0 &&
			 * (!edgmsDiscrepancyList.get(0).getPoNo().equalsIgnoreCase(""))){
			 * 
			 * for(EDGMSDiscrepancy edgmsDiscrepancy : edgmsDiscrepancyList){
			 * vendorDesc = edgmsDiscrepancy.getVendorNo() + " " +
			 * edgmsDiscrepancy.getVendorName();
			 * 
			 * if(edgmsDiscrepancyMap.get(vendorDesc) != null){
			 * edgmsDiscrepancyMap.get(vendorDesc).add(edgmsDiscrepancy); }else{
			 * List<EDGMSDiscrepancy> edgmsDiscrepancies = new
			 * ArrayList<EDGMSDiscrepancy>();
			 * edgmsDiscrepancies.add(edgmsDiscrepancy);
			 * 
			 * edgmsDiscrepancyMap.put(vendorDesc, edgmsDiscrepancies); } }
			 * }else{
			 * model.addAttribute("noData","No Goods Receipt found for today");
			 * }
			 */

			model.addAttribute("edgmsDiscrepancyMap", edgmsDiscrepancyMap);

		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("edgmsDiscrepancyMap",
					new HashMap<String, List<EDGMSDiscrepancy>>());

		}
		model.addAttribute("param", param);

		ModelAndView modelAndView = new ModelAndView("edgmsDiscrepancies");

		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	@RequestMapping(value = "/edgmsDiscrepanciesSearch.htm", method = RequestMethod.GET)
	public ModelAndView requestSearchReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		// //System.out.println("Inside requestSearchReport:");
		// //System.out.println("week selected:"+request.getParameter("weekParam"));

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		/*
		 * model = new ModelMap(); param = new EdgmsDiscrepancyParam();
		 */
		model.addAttribute("noData", "");
		model.addAttribute("today", "");
		String vendorDesc = null;
		param.setInputDate(request.getParameter("weekParam"));
		param.setDiscrpAmt(request.getParameter("discrpAmt"));

		DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(param.getInputDate()));
		//cal.setTime(dateFormat.parse(new Date());
		cal.add(Calendar.DATE, -1);

		convertedDate = dateFormat.format(cal.getTime());

		param.setPrevInputDate(convertedDate);
		// //System.out.println("convertedDate----->" + convertedDate);
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			edgmsDiscrepancyList = (ArrayList<EDGMSDiscrepancy>) getEdgmsDiscrepancyServiceImpl()
					.getEDGMSDiscrepancies(param,user);

			Map<String, List<EDGMSDiscrepancy>> edgmsDiscrepancyMap = new LinkedHashMap<String, List<EDGMSDiscrepancy>>();
			Map<String, List<EDGMSDiscrepancy>> edgmsDiscrepancyUnSortedMap = new HashMap<String, List<EDGMSDiscrepancy>>();

			if (edgmsDiscrepancyList != null
					&& edgmsDiscrepancyList.size() != 0
					&& (!edgmsDiscrepancyList.get(0).getPoNo()
							.equalsIgnoreCase(""))) {

				for (EDGMSDiscrepancy edgmsDiscrepancy : edgmsDiscrepancyList) {
					edgmsDiscrepancy.setNgboStoreFlag(user.getNGBO1S3StoreFlag());
					vendorDesc = edgmsDiscrepancy.getVendorNo() + " "
							+ edgmsDiscrepancy.getVendorName();

					if (edgmsDiscrepancyUnSortedMap.get(vendorDesc) != null) {
						edgmsDiscrepancyUnSortedMap.get(vendorDesc).add(
								edgmsDiscrepancy);
					} else {
						List<EDGMSDiscrepancy> edgmsDiscrepancies = new ArrayList<EDGMSDiscrepancy>();
						edgmsDiscrepancies.add(edgmsDiscrepancy);

						edgmsDiscrepancyUnSortedMap.put(vendorDesc, edgmsDiscrepancies);
					}
				}
				
				List<String> sortedKeys = new ArrayList<String>(edgmsDiscrepancyUnSortedMap.size());
				sortedKeys.addAll(new ArrayList<String>(edgmsDiscrepancyUnSortedMap.keySet()));
				Collections.sort(sortedKeys);
				
				for (String key : sortedKeys) {
					//log.info(" *** "+key);
					edgmsDiscrepancyMap.put(key, edgmsDiscrepancyUnSortedMap.get(key));
				}
				
			} else {
				if(param.getMsg()!=null && !param.getMsg().equals(""))
				{
					model.addAttribute(
							"noData",
							param.getMsg());
					/*model.addAttribute(
							"noData",
							"No Goods Receipts found with discrepancy for the date "
									+ param.getPrevInputDate());*/
				}else{
					model.addAttribute(
							"noData",
							"Technical issue occurred. Please contact technical support.");
				}
			}

			model.addAttribute("edgmsDiscrepancyMap", edgmsDiscrepancyMap);

			/*
			 * model.addAttribute("param", param);
			 * 
			 * edgmsDiscrepancyList =
			 * (ArrayList<EDGMSDiscrepancy>)getEdgmsDiscrepancyServiceImpl
			 * ().getEDGMSDiscrepancies(param);
			 * 
			 * model.addAttribute("edgmsDiscrepancyList", edgmsDiscrepancyList);
			 */

		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "Technical issue occurred. Please contact technical support."
					+ param.getPrevInputDate());
			model.addAttribute("edgmsDiscrepancyMap",
					new HashMap<String, List<EDGMSDiscrepancy>>());

		}

		ModelAndView modelAndView = new ModelAndView("edgmsDiscrepancies");
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/printReportEDGMSDiscrepancyPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportGapScanPDF(
			@RequestBody EDGMSDiscrepancy gapScanResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		return CommonUtils.convertObjectTojson("success");

	}
	
	private boolean genPdf(HttpServletRequest request) throws Throwable{
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();

		
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");

		reportInputParams.put("storeNo", user.getSiteNo());
		reportInputParams.put("storeName", user.getSiteName());
		reportInputParams.put("selectedDate", convertedDate);

		JasperParamsBean bean = new JasperParamsBean(eDGMSDiscrepancies,
				new JRBeanCollectionDataSource(edgmsDiscrepancyList), reportInputParams, 1);
		beanList.add(bean);
		try {
			
			byte[] byos = jasper.printReportTimeZone(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), request).toByteArray();
			pdfArray = byos;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@ResponseBody
	@RequestMapping(value = "/downloadEDGMSDiscrepancyPDF", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			genPdf(request);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}


}
