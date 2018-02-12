package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.InvoiceReconcilationModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ZeroMPLReport;
import au.com.woolworths.portal.param.InvoiceReconcilationParam;
import au.com.woolworths.portal.param.ZeroMPLReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.service.InvoiceReconServiceImpl;
import au.com.woolworths.portal.service.ZeroMPLReportServiceImpl;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/invoiceRecon")
@Scope("session")
public class InvoiceReconController extends BaseController {

	private ModelMap model;
	private UserContext userDetail;
	ArrayList<InvoiceReconcilationModel> invoiceReconcilationList = null;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['InvoiceReconciliationReport']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private InvoiceReconServiceImpl invoiceReconService;

	private static final Logger LOGGER = Logger.getLogger(InvoiceReconController.class.getName());

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
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
		
		LOGGER.info("onpaljsdlkfjlksd");
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),userDetail);

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		ModelAndView modelAndView = new ModelAndView("invoiceReconReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("invoiceRecon") InvoiceReconcilationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		HttpSession session=null;
		param.setSiteNo(userDetail.getSiteNo());

		try {
			invoiceReconcilationList = invoiceReconService
					.generateReport(param,userDetail);
			if (invoiceReconcilationList == null && param.getMsg() == null)
				param.setMsg(Constants.EXCEPTION);
			else if(invoiceReconcilationList!=null && invoiceReconcilationList.size()>0)
				param.setMsg("");
			
			
			if(request.getSession(false) != null){
				session=request.getSession(false);
				session.setAttribute("invoiceReconcilationList", invoiceReconcilationList);
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.EXCEPTION);
		}

		return convertinvoiceReconcilationListTojson(
				updateList(invoiceReconcilationList), param.getMsg());

	}
	
	private Map<String, List<InvoiceReconcilationModel>> updateList(
			List<InvoiceReconcilationModel> invoiceReconcilationList) {
		Map<String, List<InvoiceReconcilationModel>> invoiceReconcilationMap = null;
		List<InvoiceReconcilationModel> invoiceReconcilationTemp = null;
		String key = "";
		if (invoiceReconcilationList != null
				&& invoiceReconcilationList.size() > 0) {
			invoiceReconcilationMap = new LinkedHashMap<String, List<InvoiceReconcilationModel>>();
			for (InvoiceReconcilationModel inv : invoiceReconcilationList) {
				key = inv.getPurchaseOrder();
				if (invoiceReconcilationMap.containsKey(key)) {
					invoiceReconcilationTemp = invoiceReconcilationMap.get(key);
					invoiceReconcilationTemp.add(inv);
				} else {
					invoiceReconcilationTemp = new ArrayList<InvoiceReconcilationModel>();
					invoiceReconcilationTemp.add(inv);
				}
				invoiceReconcilationMap.put(key, invoiceReconcilationTemp);
			}
		}
		
		return invoiceReconcilationMap;
	}

	private String convertinvoiceReconcilationListTojson(
			Map<String, List<InvoiceReconcilationModel>> invoiceReconcilationMap,
			String msg) {

/*		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, invoiceReconcilationMap);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		LOGGER.info("stw.toString()="+stw.toString());
*/		return "{\"data\":" +  Constants.convertToJsonString(invoiceReconcilationMap) + ",\"msg\":\"" + msg + "\"}";
	}
	
	@RequestMapping(value = "/getOrderDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getOrderDtl(
			@ModelAttribute InvoiceReconcilationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "false";
		}
		HttpSession session=null;
		if(request.getSession(false) != null){
			session=request.getSession(false);
			session.setAttribute("invoiceReconcilationList", invoiceReconcilationList);
			session.setAttribute("orderNo", param.getOrderNo());
		}
		LOGGER.info("orderNo_"+param.getOrderNo());
			return "true";
		
	}
	/*@RequestMapping(value = "/saveOrderDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getOrderDetails(
			@ModelAttribute InvoiceReconcilationParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		HttpSession session=null;
		if(request.getSession(false) != null){
			session=request.getSession(false);
			session.setAttribute("invoiceReconcilationList", invoiceReconcilationList);
		}
			return "";
		
	}*/

}
