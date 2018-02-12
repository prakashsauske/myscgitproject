package au.com.woolworths.portal.controller;

import java.io.UnsupportedEncodingException;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.OrderPopUpTabSearchDtl;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.OrderPopupTabSearchServiceImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/orderArticle")
@Scope("session")
public class OrdertabArticleDtlsController extends BaseController {

	private ModelMap model;
	private UserContext userDetail;
	// private ZeroMPLReportParam paramForPagination;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	
	private int REC_COUNT = 20;
	private Integer TOTAL_RECORDS;

	
	
	@Autowired
	private OrderPopupTabSearchServiceImpl orderListPopupSearvice;
	
	private static final Logger LOGGER = Logger.getLogger(OrdertabArticleDtlsController.class.getName());
	private List<OrderPopUpTabSearchDtl> orderListPopup = null;
	
	ArticleParam param = null;

	/*@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg());

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		// model.addAttribute("param", new DGMSReportParam());
		ModelAndView modelAndView = new ModelAndView("autoStockPlannedReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}*/
	
	@RequestMapping(value = "/orderListTabSearch.htm", method = RequestMethod.GET)
	@ResponseBody
	public String orderListTabSearch(
			@ModelAttribute("articleDtls") ArticleParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));

		param.setSiteNo(userDetail.getSiteNo());
		param.setSalesOrg(userDetail.getSalesOrg().toString());

	
		
		
		if (param.getSiteNo() != null && param.getSiteNo() != "") {
			//System.out.println("siteNo" + param.getSiteNo());
			
			try {
				orderListPopup = orderListPopupSearvice.getOrderSearch(param,userDetail);
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				LOGGER.info("Exception :" +e);
			}
			
			}
			// paramForPagination.setPageNo(param.getPageNo());
			// param = paramForPagination;
			return convertOrdersListTojson(orderListPopup, "");
		}
		/*
		 * else{ paramForPagination=param; }
		 */


	private String convertOrdersListTojson(
			List<OrderPopUpTabSearchDtl> orderListPopup, String msg) {

		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, orderListPopup);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + Constants.convertToJsonString(orderListPopup)+ ",\"msg\":\"" + msg + "\"}";
	}

}
