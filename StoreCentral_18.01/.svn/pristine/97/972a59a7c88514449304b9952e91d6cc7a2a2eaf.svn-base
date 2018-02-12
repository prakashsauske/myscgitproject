package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.text.ParseException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.commons.httpclient.util.DateUtil;
import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromotionsWeekDropdown;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InStorePromoDisplayReportParam;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InstoreDisplayReportServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/instoreDisplayReport")
@Scope("session")
public class InStorePromotionDisplayBigWController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['InstorePromotionsDisplayReport']}")
	private String screenCode;
	
	@Value("#{properties['instoreDisplayBigwReport']}")
	private String instoreDisplayBigwReport=null;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private InstoreDisplayReportServiceImpl instoreDisplayReportService;
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	private ModelMap model;

	private UserContext userDetail;

	private static final Logger LOGGER = Logger.getLogger(InStorePromotionDisplayBigWController.class.getName());
	
	List<PromoArticle> instorePromoArticleList = new ArrayList<PromoArticle>();
	StringBuffer printPdfHeaderDetail=new StringBuffer();
	InStorePromoDisplayReportParam dispReportParam = null;
	private byte[] pdfArray = null;

	@RequestMapping(value = "/onPageLoad.htm")
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
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
		List<Department> deptInfoList = new ArrayList<Department>();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		setPromotionWeekDropdown(userDetail.getSalesOrg());
		// calling service to load department
		try {
			String prod_no = "ALL DEPARTMENTS";

			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),userDetail);

			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		System.out.println("In-Store DIsplay Report On Page Load..");
		ModelAndView modelAndView = new ModelAndView(
				"inStorePromotionDisplayReport-BigW");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getInStoreDisplayReportDtls.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getInStoreDisplayReportDtls(
			@ModelAttribute("inStoreDisplay") InStorePromoDisplayReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();

		// TODO setting node level and id.. need to change
		if (param.getDepH() != null && param.getDepH().trim() != ""
				&& param.getNodeId() == null && param.getNodelvl() == null) {
			String nodeId = "";
			String nodelvl = "";

			if (param.getSegme() != null && param.getSegme().trim() != "") {
				nodeId = param.getSegme();
				nodelvl = Constants.SEG;
			} else if (param.getSubCat() != null
					&& param.getSubCat().trim() != "") {
				nodeId = param.getSubCat();
				nodelvl = Constants.SUBCAT;
			} else if (param.getCategory() != null
					&& param.getCategory().trim() != "") {
				nodeId = param.getCategory();
				nodelvl = Constants.CATEGO;
			} else if (param.getDepartmentList() != null
					&& param.getDepartmentList().trim() != "") {
				nodeId = param.getDepartmentList();
				nodelvl = Constants.DEPT;
			}

			param.setNodeId(nodeId);
			param.setNodelvl(nodelvl);
		}

		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());
		param.setUserId(userDetail.getUserId());
		param.setPageNo("1");
		param.setRecordCount(Constants.RECORD_COUNT);
		param.setCount("2");
		//param.setPromoType(Constants.ALL);
		param.setPromoType(Constants.INSTORE);
		
		System.out
				.println("param:---" + CommonUtils.convertObjectTojson(param));

		List<PromoArticle> promoArticleSearchResults = new ArrayList<PromoArticle>();

		try {

			promoArticleSearchResults = instoreDisplayReportService
					.getInstorePromotionDtls(param,userDetail);

			instorePromoArticleList=promoArticleSearchResults;

			dispReportParam=param;
			//printPdfHeaderDetail.append(param.getWeekStartDate()+" - "+DateUtil.parseDate(param.getWeekStartDate())+6+"");
			System.out.println("promoArticleSearchResults:---"
					+ CommonUtils
							.convertObjectTojson(promoArticleSearchResults));
			if (promoArticleSearchResults == null) {
				if (param.getMsg() != null && !param.getMsg().equals("")) {
					return convertArticleForInStoreTojson(
							promoArticleSearchResults, param.getMsg());
				} else {
					return convertArticleForInStoreTojson(
							promoArticleSearchResults, Constants.NDF);
				}

			}else{
				param.setPromoStartDate(promoArticleSearchResults.get(0).getPromoStartDate());
				param.setPromoEndDate(promoArticleSearchResults.get(0).getPromoEndDate());
				dispReportParam=param;
			}

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION , e);
			return convertArticleForInStoreTojson(promoArticleSearchResults,
					Constants.TECHNICAL_ISSUE);
		}

		return convertArticleForInStoreTojson(promoArticleSearchResults,
				param.getMsg());

	}

	private void setPromotionWeekDropdown(Integer salesOrg) {
		ArrayList<PromotionsWeekDropdown> promotionWeekDropdownList = new ArrayList<PromotionsWeekDropdown>();
		promotionWeekDropdownList.add(new PromotionsWeekDropdown("0",
				"Current Week", Constants.CurrentWeek));
		promotionWeekDropdownList.add(new PromotionsWeekDropdown("1",
				"Next Week", Constants.NextWeek));
		promotionWeekDropdownList.add(new PromotionsWeekDropdown("2",
				"Two Weeks Out", Constants.TwoWeeksOut));
		promotionWeekDropdownList.add(new PromotionsWeekDropdown("3",
				"Three Weeks Out", Constants.ThreeWeeksOut));

		if (salesOrg.equals(PortalUtil.BIGW_SALES_ORG)) {

			promotionWeekDropdownList.add(new PromotionsWeekDropdown("4",
					"Four Weeks Out", Constants.FourWeek));
			promotionWeekDropdownList.add(new PromotionsWeekDropdown("5",
					"Five Weeks Out", Constants.FiveWeek));
			promotionWeekDropdownList.add(new PromotionsWeekDropdown("6",
					"Six Weeks Out", Constants.SixWeeksOut));
			promotionWeekDropdownList.add(new PromotionsWeekDropdown("7",
					"Seven Weeks Out", Constants.SevenWeeksOut));
			promotionWeekDropdownList.add(new PromotionsWeekDropdown("8",
					"Eight Weeks Out", Constants.EigthWeeksOut));

		}
		model.addAttribute("promotionWeekDropdownList",
				promotionWeekDropdownList);
	}

	@RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		/* Map<String, String> options = optionDAO.find(selectedValue); */

		List<Department> categoryInfoList = new ArrayList<Department>();

		String prod_no = request.getParameter("iv_parent_node");
		categoryInfoList = (ArrayList<Department>) articleService
				.getDeptDetail(prod_no, ((UserContext) request.getSession()
						.getAttribute("user")).getSalesOrg(),userDetail);

		Map<String, List<Department>> categoryDetails = new HashMap<String, List<Department>>();
		categoryDetails.put("categoryInfoList", categoryInfoList);
		String json = new Gson().toJson(categoryDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		if (categoryInfoList.size() > 0) {
			response.getWriter().write(json);
		} else if (categoryInfoList == null || categoryInfoList.size() <= 0) {
			String s1 = "{\"categoryInfoList\":" + "\"node\": \"" + 0
					+ " \", \"nodeDesc\": \"" + "Select" + "\"}";

			response.getWriter().write(s1);
		}

	}

	@RequestMapping(value = "/fetchSubCategoryDetails.htm", method = RequestMethod.GET)
	public void fetchSubCategoryDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Department> subCategoryInfoList = null;

		try {
			String prod_no = request.getParameter("iv_parent_node");
			subCategoryInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),userDetail);
			if (subCategoryInfoList == null) {
				subCategoryInfoList = new ArrayList<Department>();
			}
		} catch (Exception e) {
		}

		Map<String, List<Department>> subCategoryDetails = new HashMap<String, List<Department>>();
		subCategoryDetails.put("subCategoryInfoList", subCategoryInfoList);
		String json = new Gson().toJson(subCategoryDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);
	}

	@RequestMapping(value = "/fetchSegmentDetails.htm", method = RequestMethod.GET)
	public void fetchSegmentDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Department> segmentInfoList = null;

		try {
			String prod_no = request.getParameter("iv_parent_node");
			segmentInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),userDetail);

			if (segmentInfoList == null) {
				segmentInfoList = new ArrayList<Department>();
			}
			// system.out
			// .println("segment name not null" + segmentInfoList.size());
		} catch (Exception e) {
		}

		Map<String, List<Department>> segmentDetails = new HashMap<String, List<Department>>();
		segmentDetails.put("segmentInfoList", segmentInfoList);
		String json = new Gson().toJson(segmentDetails);

		response.setContentType("application/json");
		response.setCharacterEncoding("UTF-8");
		response.getWriter().write(json);

	}

	private String convertArticleForInStoreTojson(
			List<PromoArticle> articleSearchResults, String msg) {
		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articleSearchResults);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";*/
		return "{\"data\":" + Constants.convertToJsonString(articleSearchResults)
				+ ",\"msg\":\"" + msg + "\"}";
	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/printInstoreDisplayBigwReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printInstoreDisplayBigwReportPDF(@ModelAttribute("inStoreDisplay") InStorePromoDisplayReportParam param,
			@RequestBody PromoArticle promoArticleResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		return CommonUtils.convertObjectTojson("success");

	}
	
	private boolean genPdf( InStorePromoDisplayReportParam param,HttpServletRequest request) throws Throwable{
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();

		
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		
		
		StringBuffer hierarchyDetail=new StringBuffer(" | Department:"+param.getDepName());
		if(param.getCatName().trim().length()!=0){
			hierarchyDetail.append(" | Category:"+param.getCatName());
			if(param.getSubCatName().trim().length()!=0){
				hierarchyDetail.append(" | Sub-Category:"+param.getSubCatName());
				if(param.getSegName().trim().length()!=0){
					hierarchyDetail.append(" | Segment:"+param.getSegName());
				}
			}
		}
			

		reportInputParams.put("storeNo", user.getSiteNo());
		reportInputParams.put("storeName", user.getSiteName());
		reportInputParams.put("promoDurationHierarchyDetails", param.getPromoStartDate()+" - "+param.getPromoEndDate()+""+hierarchyDetail.toString());

		
		JasperParamsBean bean = new JasperParamsBean(instoreDisplayBigwReport,
				new JRBeanCollectionDataSource(instorePromoArticleList), reportInputParams, 1);
		//System.out.println("list size:"+instorePromoArticleList.size());
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
	@RequestMapping(value = "/downloadInstoreDisplayBigwReportPDF", method=RequestMethod.GET)
	public byte[] downloadInstoreDisplayBigwReportPdf(@ModelAttribute("inStoreDisplay") InStorePromoDisplayReportParam param, HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			InStorePromoDisplayReportParam localParam=dispReportParam;
			genPdf(localParam,request);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}
}