package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ArticleFreshFoodLabels;
import au.com.woolworths.portal.model.ArticleGtinInfo;
import au.com.woolworths.portal.model.ArticleInfo;
import au.com.woolworths.portal.model.ArticleNutritionalResult;
import au.com.woolworths.portal.model.ArticlePackBreakdown;
import au.com.woolworths.portal.model.ArticleProductNotes;
import au.com.woolworths.portal.model.ArticleSalesView;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.ArticleSiteView;
import au.com.woolworths.portal.model.CompetitorDtlList;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.MovementType;
import au.com.woolworths.portal.model.SalesHistory;
import au.com.woolworths.portal.model.SohAdjustLogModel;
import au.com.woolworths.portal.model.StockAdjustModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.model.inStorePromotionDisplayType;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.param.IBTOrderParam;
import au.com.woolworths.portal.param.SohAdjustLogParam;
import au.com.woolworths.portal.param.StockAdjustParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InStorePromoServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.SohAdjustLogServiceImpl;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.SalesOrgUtil;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/article")
public class ArticleController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['ArticlesCentral']}")
	private String screenCode;
	
	@Value("#{properties['StockAdjustment']}")
	private String screenCode1;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private SohAdjustLogServiceImpl sohAdjustLogServiceImpl;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private InStorePromoServiceImpl inStorePromoService;

	public OrderServiceImpl getOrderService() {
		return orderService;
	}

	public void setOrderService(OrderServiceImpl orderService) {
		this.orderService = orderService;
	}

	private ArrayList<ArticleInfo> articleInfoList;
	private List<ArticleSearchResults> addArtSearchResults;

	private List<ArticleSearchResults> articleSearchResults;

	public List<ArticleSearchResults> getArticleSearchResults() {
		return articleSearchResults;
	}

	public void setArticleSearchResults(
			List<ArticleSearchResults> articleSearchResults) {
		this.articleSearchResults = articleSearchResults;
	}

	public ArrayList<ArticleInfo> getArticleInfoList() {
		return articleInfoList;
	}

	public void setArticleInfoList(ArrayList<ArticleInfo> articleInfoList) {
		this.articleInfoList = articleInfoList;
	}

	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	@Autowired
	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	public ArticleController() {
		this.param = new ArticleParam();
		this.model = new ModelMap();
	}

	String articleNo = null;
	String uom = null;

	/* private ArrayList<ArticleInfo> articleInfoList; */
	String noData = "NO DATA FOUND";
	private ArticleParam param;
	private ModelMap model;
	private List<SohAdjustLogModel> sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
	private List<MovementType> mvmtTypeList = new ArrayList<MovementType>();

	@RequestMapping(value = "/onPageLoadArticleDetail.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadArticleDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		

		ModelAndView modelAndView = new ModelAndView("articleDtls");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/goToArticleDetail.htm", method = RequestMethod.GET)
	public ModelAndView goToArticleDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		ModelAndView modelAndView = new ModelAndView("articleDtls");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/goToHome.htm", method = RequestMethod.GET)
	public ModelAndView goToHome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		ModelAndView modelAndView = new ModelAndView("home");

		return modelAndView;

	}

	@RequestMapping(value = "/goTosohFromHome.htm", method = RequestMethod.GET)
	public ModelAndView goTosohFromHome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model.addAttribute("size", "0");
		model.addAttribute("noDataSoh", "");
		model.addAttribute("noDataFound", "");
		IBTOrderParam ibtParam = new IBTOrderParam();
		model.addAttribute("articleType", ibtParam);
		ModelAndView modelAndView = new ModelAndView("sohFromHome");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/onPageLoadArticleScreen.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadArticleScreen(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		// //System.out.println(param);
		// //System.out.println(" range flag val--->" + param.getRangeFlag());
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("articleSearch");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {

		// //System.out.println(" ************* onPageLoad");
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

		param = new ArticleParam();
		model = new ModelMap();

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		param.setOption("number");
		param.setRangeFlag("N");
		model.addAttribute("param", param);
		model.addAttribute("articleInfoList", new ArrayList<ArticleInfo>());
		model.addAttribute("isSellPrice", true);
		List<Department> deptInfoList = new ArrayList<Department>();
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("param", param);

			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No Department Data Found ");
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		ModelAndView modelAndView = new ModelAndView("articleLookup");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/articleSearchLocal.htm", method = RequestMethod.GET)
	public ModelAndView articleSearchLocal(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		param = new ArticleParam();
		model = new ModelMap();

		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());

		param.setOption("number");
		param.setRangeFlag("N");
		model.addAttribute("param", param);
		model.addAttribute("articleInfoList", new ArrayList<ArticleInfo>());
		model.addAttribute("isSellPrice", true);
		List<Department> deptInfoList = new ArrayList<Department>();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("param", param);

			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("noData", "No Department Data Found ");
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		ModelAndView modelAndView = new ModelAndView("articleSearch");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.POST)
	 * public ModelAndView fetchDetails(HttpServletRequest request,
	 * HttpServletResponse response) throws IOException {
	 * 
	 * List<Department> categoryInfoList = new ArrayList<Department>();
	 * 
	 * String prod_no = request.getParameter("iv_parent_node");
	 * 
	 * String index=request.getParameter("deptIndex"); ModelAndView modelAndView
	 * = new ModelAndView("articleSearch"); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model);
	 * 
	 * List<Department> deptInfoList= (List<Department>)
	 * model.get("deptInfoList");
	 * 
	 * Department
	 * deptObj=deptInfoList.get(Integer.parseInt(index)>=1?Integer.parseInt
	 * (index)-1:Integer.parseInt(index));
	 * 
	 * 
	 * 
	 * categoryInfoList = (ArrayList<Department>) articleService
	 * .getDeptDetail(prod_no); if(null!=categoryInfoList){
	 * deptObj.setChildExists(true); List<Department>
	 * part1=deptInfoList.subList(0, Integer.parseInt(index));
	 * 
	 * List<Department> part3=deptInfoList.subList(Integer.parseInt(index),
	 * deptInfoList.size());
	 * 
	 * List<Department> newList=new ArrayList<Department>();
	 * 
	 * for(Department dept:categoryInfoList){
	 * dept.setParentId(Integer.parseInt(index)); dept.setLevel(2);
	 * 
	 * }
	 * 
	 * newList.addAll(part1); newList.addAll(categoryInfoList);
	 * newList.addAll(part3);
	 * 
	 * model.addAttribute("deptInfoList",newList); }
	 * 
	 * 
	 * 
	 * 
	 * 
	 * 
	 * return modelAndView; }
	 * 
	 * @RequestMapping(value = "/fetchSubCategoryDetails.htm", method =
	 * RequestMethod.POST) public ModelAndView
	 * fetchSubCategoryDetails(HttpServletRequest request, HttpServletResponse
	 * response) throws IOException { List<Department> categoryInfoList = new
	 * ArrayList<Department>();
	 * 
	 * String prod_no = request.getParameter("iv_parent_node");
	 * 
	 * String parentIndex=request.getParameter("deptIndex"); String
	 * index=request.getParameter("index"); ModelAndView modelAndView = new
	 * ModelAndView("articleSearch"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * List<Department> deptInfoList= (List<Department>)
	 * model.get("deptInfoList");
	 * 
	 * 
	 * if(null!=deptInfoList && deptInfoList.size()>0 && parentIndex!= null &&
	 * parentIndex.trim().length()>0){ Department
	 * dept=deptInfoList.get(Integer.parseInt(parentIndex)>=1
	 * ?Integer.parseInt(parentIndex)-1 :Integer.parseInt(parentIndex));
	 * ArrayList<Department> subLevles=dept.getSubLevles();
	 * 
	 * Department subDept=subLevles.get(Integer.parseInt(index)>=1
	 * ?Integer.parseInt(index)-1 :Integer.parseInt(index));
	 * 
	 * 
	 * 
	 * categoryInfoList = (ArrayList<Department>) articleService
	 * .getDeptDetail(prod_no); if(null!=categoryInfoList){
	 * subDept.setSubLevles((ArrayList<Department>) categoryInfoList);
	 * subDept.setLevelCount( deptInfoList.size()); } else{
	 * subDept.setSubLevles(new ArrayList<Department>());
	 * subDept.setLevelCount(0); } } return modelAndView; }
	 * 
	 * @RequestMapping(value = "/fetchSegmentDetails.htm", method =
	 * RequestMethod.GET) public void fetchSegmentDetails(HttpServletRequest
	 * request, HttpServletResponse response) throws IOException {
	 * List<Department> segmentInfoList = null;
	 * 
	 * try { String prod_no = request.getParameter("iv_parent_node");
	 * segmentInfoList = (ArrayList<Department>) articleService
	 * .getDeptDetail(prod_no);
	 * 
	 * if (segmentInfoList == null) { segmentInfoList = new
	 * ArrayList<Department>(); } //system.out .println("segment name not null"
	 * + segmentInfoList.size()); } catch (Exception e) { }
	 * 
	 * Map<String, List<Department>> segmentDetails = new HashMap<String,
	 * List<Department>>(); segmentDetails.put("segmentInfoList",
	 * segmentInfoList); String json = new Gson().toJson(segmentDetails);
	 * 
	 * response.setContentType("application/json");
	 * response.setCharacterEncoding("UTF-8"); response.getWriter().write(json);
	 * 
	 * }
	 * 
	 * @RequestMapping(value = "/requestSearch.htm", method = RequestMethod.GET)
	 * public String requestSearchGet(HttpServletRequest request,
	 * HttpServletResponse response) { if (request.getSession(false) == null ||
	 * (request.getSession(false) != null && request.getSession(
	 * false).getAttribute("user") == null)) return "redirect:/";
	 * 
	 * return "articleSearch"; }
	 */

	/*
	 * @RequestMapping(value = "/requestSearch.htm", method =
	 * RequestMethod.POST) public ModelAndView requestSearch(HttpServletRequest
	 * request, HttpServletResponse response) { if (request.getSession(false) ==
	 * null || (request.getSession(false) != null && request.getSession(
	 * false).getAttribute("user") == null)) { return new ModelAndView(new
	 * RedirectView("../../")); }
	 * 
	 * 
	 * String option=request.getParameter("searchByOptions"); String
	 * value=request.getParameter("value");
	 * 
	 * String suppName=request.getParameter("suppName");
	 * 
	 * String suppNo=request.getParameter("suppNo");
	 * 
	 * String srcOfSuppliy=request.getParameter("sourceSupply");
	 * 
	 * String rangeFlag=request.getParameter("ranged");
	 * 
	 * 
	 * 
	 * ModelAndView modelAndView = null;
	 * 
	 * 
	 * if( (option== null || option.trim().length()==0)&& (value== null ||
	 * value.trim().length()==0) && (suppName== null ||
	 * suppName.trim().length()==0) && (suppNo== null ||
	 * suppNo.trim().length()==0) ){ modelAndView = new
	 * ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", "Please enter Value to Search.");
	 * model.addAttribute("param", param); modelAndView.addObject("model",
	 * model);
	 * 
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 * param.setValue(value); param.setOption(option);
	 * 
	 * 
	 * param.setValues(option,value);
	 * 
	 * //param.setArticleNo(request.getParameter("articleNo"));
	 * param.setSiteNo(request.getParameter("siteNo"));
	 * param.setSalesOrg(request.getParameter("salesOrg"));
	 * //param.setArticleName(request.getParameter("articleName"));
	 * param.setCategoryNo(request.getParameter("categaryId"));
	 * 
	 * param.setDepartment(request.getParameter("department"));
	 * param.setSegment(request.getParameter("segment"));
	 * param.setSubCategory(request.getParameter("subCategory"));
	 * param.setCategory(request.getParameter("category"));
	 * 
	 * if(rangeFlag==null){ param.setRangeFlag("N"); }else{
	 * param.setRangeFlag("Y"); }
	 * 
	 * 
	 * 
	 * 
	 * String pageNumber=request.getParameter("pageNumber");
	 * 
	 * 
	 * //system.err.println(pageNumber+ "pageNumber");
	 * 
	 * if(pageNumber!=null && pageNumber.trim().length()>0){
	 * param.setPageNumber(
	 * Integer.parseInt(pageNumber)>0?Integer.parseInt(pageNumber):1); }else{
	 * param.setPageNumber(1); }
	 * 
	 * param.setSuppNo(suppNo);
	 * 
	 * param.setSuppName(suppName);
	 * 
	 * param.setSrcOfSuppliy(srcOfSuppliy);
	 * 
	 * 
	 * //param.setRecordCount(0); //param.setGtin(gtin);
	 * 
	 * model.addAttribute("noData", "");
	 * model.addAttribute("articleSearchResutlsList", new
	 * ArrayList<ArticleSearchResults>());
	 * 
	 * 
	 * 
	 * try { if ((request.getParameter("advanceSearchFlag")) != null &&
	 * request.getParameter("advanceSearchFlag").equals("true")) {// Advance //
	 * search
	 * 
	 * try {
	 * 
	 * if ((param.getSegment() != null && param.getSegment() .equals("0")) &&
	 * (param.getSubCategory() != null && param .getSubCategory().equals("0"))
	 * && (param.getCategory() != null && param .getCategory().equals("0")) &&
	 * (param.getDepartment() != null && param .getDepartment().equals("0"))) {
	 * 
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", "Please select the search criteria.");
	 * model.addAttribute("param", param); modelAndView.addObject("model",
	 * model);
	 * 
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * } if ((param.getSubCategory() != null && param
	 * .getSubCategory().equals("0"))) {
	 * 
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("param", param); model.addAttribute("noData",
	 * "Please select till subcategory"); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 * 
	 * if ((param.getSegment() != null && !param.getSegment().equals("") &&
	 * !param .getSegment().equals("0"))) { articleSearchResults =
	 * (ArrayList<ArticleSearchResults>) articleService
	 * .getAdvanceSearchReults(param.getSegment());
	 * 
	 * } else if ((param.getSubCategory() != null &&
	 * !param.getSubCategory().equals("") && !param
	 * .getSubCategory().equals("0"))) { articleSearchResults =
	 * (ArrayList<ArticleSearchResults>) articleService
	 * .getAdvanceSearchReults(param.getSubCategory());
	 * 
	 * } else if ((param.getCategory() != null && !param
	 * .getCategory().equals(""))) { articleSearchResults =
	 * (ArrayList<ArticleSearchResults>) articleService
	 * .getAdvanceSearchReults(param.getCategory());
	 * 
	 * } else if ((param.getDepartment() != null && !param
	 * .getDepartment().equals(""))) { articleSearchResults =
	 * (ArrayList<ArticleSearchResults>) articleService
	 * .getAdvanceSearchReults(param.getDepartment()); }
	 * 
	 * model.addAttribute("param", param);
	 * model.addAttribute("articleSearchResutlsList", articleSearchResults);
	 * 
	 * if(articleSearchResults==null || articleSearchResults.size()==0){
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("articleSearchResutlsList", new
	 * ArrayList<ArticleSearchResults>()); model.addAttribute("noData",
	 * "No Data Found"); model.addAttribute("param", param);
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } if (articleSearchResults.size() == 1) { return
	 * requestArticleDetail(request, response);// TODO
	 * 
	 * } else if (articleSearchResults.size() > 1) { modelAndView = new
	 * ModelAndView("articleSearch");
	 * 
	 * }
	 * 
	 * 
	 * model.addAttribute("articleSearchResutlsList", articleSearchResults);
	 * 
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } catch (Exception e) { e.printStackTrace();
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", "No Data Found");
	 * model.addAttribute("articleSearchResutlsList", new
	 * ArrayList<ArticleSearchResults>()); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model); return modelAndView; }
	 * 
	 * } else {
	 * 
	 * if ((param.getArticleNo() == null || param.getArticleNo() .equals("")) &&
	 * (param.getArticleName() == null || param .getArticleName().equals("")) &&
	 * (param.getCategoryNo() == null || param .getCategoryNo().equals("")) &&
	 * (param.getSuppNo()==null || param.getSuppNo().trim().length()==0) &&
	 * (param.getGtin()==null || param.getGtin().trim().length()==0)
	 * 
	 * ) {
	 * 
	 * model.addAttribute("noData", "Please Enter Search Criteria.");
	 * model.addAttribute("articleInfoList", new ArrayList<ArticleInfo>());
	 * model.addAttribute("param", param); modelAndView = new
	 * ModelAndView("articleSearch"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; }
	 * if(param.getGtin()!=null && param.getGtin().trim().length()>0 &&
	 * param.getArticleNo()!=null && param.getArticleNo().trim().length()>0
	 * 
	 * ){ model.addAttribute("noData",
	 * "Please Enter Either Article No Or GTIN.");
	 * model.addAttribute("articleInfoList", new ArrayList<ArticleInfo>());
	 * model.addAttribute("param", param); modelAndView = new
	 * ModelAndView("articleSearch"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 * 
	 * if ( (param.getArticleNo() != null && !param.getArticleNo().equals(""))
	 * || (param.getGtin() != null && !param.getGtin().equals(""))
	 * 
	 * ) {
	 * 
	 * // BASIC try {
	 * 
	 * //Updated By Ravi //Calling the single service to fetch all the details
	 * List<ArticleSearchResults>
	 * articleSearchResults=articleService.getArticleDetails(param);
	 * 
	 * if(articleSearchResults==null || articleSearchResults.size()==0 ||
	 * "No Data Found".equalsIgnoreCase(articleSearchResults.get(0).getMsg())){
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("articleSearchResutls", new ArticleSearchResults());
	 * model.addAttribute("noData", "No Data Found");
	 * model.addAttribute("isSellPrice", false); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; }else{
	 * 
	 * modelAndView = new ModelAndView("articleDtls", "param", param);
	 * isSohGreaterThanZero(articleSearchResults.get(0));
	 * model.addAttribute("articleSearchResutls", articleSearchResults.get(0));
	 * 
	 * //additionalInfo(request,response);
	 * 
	 * if("Y".equalsIgnoreCase(articleSearchResults.get(0).getRangedFlag()))
	 * model.addAttribute("isSellPrice", true); else
	 * model.addAttribute("isSellPrice", false); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; }
	 * 
	 * 
	 * List<ArticleBasicViewDetails> articleBasicViewDetailsList =
	 * articleService .getArticleBasicView(param); if
	 * (articleBasicViewDetailsList != null &&
	 * articleBasicViewDetailsList.size() != 0) {
	 * 
	 * model.addAttribute("articleBasicViewDetails",
	 * articleBasicViewDetailsList.get(0)); articleNo =
	 * articleBasicViewDetailsList.get(0) .getArticleNo(); uom =
	 * articleBasicViewDetailsList.get(0) .getCompSizeAuUom(); } else {
	 * 
	 * model.addAttribute("articleBasicViewDetails", new
	 * ArticleBasicViewDetails());
	 * 
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", "No Data Found");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; } } catch
	 * (Exception e) {
	 * 
	 * e.printStackTrace();
	 * 
	 * model.addAttribute("noData", "No Data Found");
	 * model.addAttribute("articleBasicViewDetails", new
	 * ArticleBasicViewDetails()); modelAndView = new
	 * ModelAndView("articleSearch", "param", param);
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } // GTIN try { List<ArticleGtinInfo>
	 * articleGtinList = articleService .getGtinView(param);
	 * 
	 * if (articleGtinList != null && articleGtinList.size() != 0) {
	 * model.addAttribute("articleGtinList", articleGtinList); } else {
	 * model.addAttribute("articleGtinList", new ArrayList<ArticleGtinInfo>());
	 * } } catch (Exception e) { model.addAttribute("noData", "No Data Found");
	 * model.addAttribute("articleGtinList", new ArrayList<ArticleGtinInfo>());
	 * } // SELL PRICE List<ArticleSellPriceView> articleSellPriceViewList =
	 * null; try { articleSellPriceViewList = articleService
	 * .getSellPriceView(param); if (articleSellPriceViewList != null &&
	 * articleSellPriceViewList.size() != 0) {
	 * model.addAttribute("articleSellPriceViewList", articleSellPriceViewList);
	 * } else { model.addAttribute("articleSellPriceViewList", new
	 * ArrayList<ArticleSellPriceView>()); } } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("articleSellPriceViewList", new
	 * ArrayList<ArticleSellPriceView>()); }
	 * 
	 * boolean isSellPrice = true;
	 * ////System.out.println("***** articleSellPriceViewList "
	 * +articleSellPriceViewList); if (articleSellPriceViewList == null) {
	 * 
	 * isSellPrice = false;
	 * ////System.out.println(" articleSellPriceViewList == null "+isSellPrice );
	 * } else if (articleSellPriceViewList != null &&
	 * articleSellPriceViewList.size() != 0) { ArticleSellPriceView
	 * articleSellPriceView = articleSellPriceViewList .get(0);
	 * 
	 * String sellPrice = articleSellPriceView.getSalesPrice();
	 * 
	 * ////System.out.println(" articleSellPriceViewList != null "+isSellPrice );
	 * if (sellPrice == null || sellPrice.equals("")) {
	 * ////System.out.println(" sellPrice == null "+isSellPrice ); isSellPrice =
	 * false; } }else if (articleSellPriceViewList != null &&
	 * articleSellPriceViewList.size() == 0) { isSellPrice = false; }
	 * ////System.out.println("*******isSellPrice  "+isSellPrice);
	 * model.addAttribute("isSellPrice", isSellPrice); if (isSellPrice) {
	 * 
	 * // SITE try { List<ArticleSiteView> articleSiteViewList = articleService
	 * .getSiteView(param); if (articleSiteViewList != null &&
	 * articleSiteViewList.size() != 0) {
	 * model.addAttribute("articleSiteViewList", articleSiteViewList); } else {
	 * model.addAttribute("articleSiteViewList", new
	 * ArrayList<ArticleSiteView>()); } } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("articleSiteViewList", new
	 * ArrayList<ArticleSiteView>()); }
	 * 
	 * }
	 * 
	 * modelAndView = new ModelAndView("articleDetails");
	 * model.addAttribute("articleInfoList", new ArrayList<ArticleInfo>());
	 * model.addAttribute("param", param); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model);
	 * 
	 * } catch (Exception e) {
	 * 
	 * e.printStackTrace();
	 * 
	 * model.addAttribute("noData", "No Data Found");
	 * model.addAttribute("articleSearchResutls", new ArticleSearchResults());
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } }
	 * 
	 * else if (param.getArticleName() != null &&
	 * !param.getArticleName().equals("") || (param.getSuppNo() != null &&
	 * !param.getSuppNo().equals(""))) { try { articleInfoList =
	 * (ArrayList<ArticleInfo>) articleService .getArticleList(param);
	 * 
	 * model.addAttribute("param", param); model.addAttribute("articleInfoList",
	 * articleInfoList); if (articleInfoList.size() == 1) {
	 * 
	 * return requestArticleDetail(request, response);
	 * 
	 * } else if (articleInfoList.size() > 1) { modelAndView = new
	 * ModelAndView("articleSearch"); } modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * // Updated By Ravi // Calling the single service to fetch all the details
	 * articleSearchResults=articleService.getArticleDetails(param);
	 * 
	 * if(articleSearchResults==null || articleSearchResults.size()==0){
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("articleSearchResutlsList", new
	 * ArrayList<ArticleSearchResults>()); model.addAttribute("noData",
	 * "No Data Found"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; }else{
	 * 
	 * if (articleSearchResults.size() == 1) {
	 * 
	 * return requestArticleDetail(request, response);
	 * 
	 * } else if (articleSearchResults.size() > 1) { modelAndView = new
	 * ModelAndView("articleSearch");
	 * //param.setRecordCount(articleSearchResults.size()); }
	 * 
	 * 
	 * model.addAttribute("articleSearchResutlsList", articleSearchResults);
	 * 
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } } catch (Exception e) { e.printStackTrace();
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", "No Data Found");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; } } else if
	 * (param.getCategoryNo() != null && !param.getCategoryNo().equals("")) {
	 * try { // Updated By Ravi // Calling the single service to fetch all the
	 * details articleSearchResults=articleService.getArticleDetails(param);
	 * 
	 * if(articleSearchResults==null || articleSearchResults.size()==0){
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("articleSearchResutls", new ArticleSearchResults());
	 * model.addAttribute("noData", "No Data Found");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } else{
	 * 
	 * if (articleSearchResults.size() == 1) { return
	 * requestArticleDetail(request, response);
	 * 
	 * } else if (articleSearchResults.size() > 1) { modelAndView = new
	 * ModelAndView("articleSearch");
	 * //param.setRecordCount(articleSearchResults.size()); }
	 * 
	 * 
	 * model.addAttribute("articleSearchResutlsList", articleSearchResults);
	 * 
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model);
	 * 
	 * return modelAndView; } } catch (Exception e) { e.printStackTrace();
	 * modelAndView = new ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", "No Data Found");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView; } }
	 * 
	 * } } catch (Exception e) { modelAndView = new
	 * ModelAndView("articleSearch", "param", param);
	 * model.addAttribute("noData", noData); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * } // articleService.getadjustedSOHService(); return modelAndView;
	 * 
	 * }
	 */

	@RequestMapping(value = "/requestArticleDetail.htm", method = RequestMethod.POST)
	public ModelAndView requestArticleDetail(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = null;
		try {

			// TODO change
			ArticleSearchResults article = null;
			if (request.getParameter("index") != null
					&& request.getParameter("index").trim().length() > 0) {
				// //System.out.println(" index-->" +
				// request.getParameter("index"));
				article = (ArticleSearchResults) articleSearchResults
						.get(Integer.parseInt(request.getParameter("index")));
			} else {
				article = (ArticleSearchResults) articleSearchResults.get(0);
			}

			int recordCount = param.getRecordCount();
			int pageNo = param.getPageNumber();

			String desc = param.getArticleName();

			// //System.out.println("art no ---->" + article.getArticleNo());
			// param = new ArticleParam();
			param.setArticleNo(article.getArticleNo());
			param.setSiteNo(((UserContext) request.getSession().getAttribute(
					"user")).getSiteNo());
			param.setArticleName("");
			param.setRecordCount(recordCount);
			param.setPageNumber(pageNo);
			// model.addAttribute("param", param);

			// Updated By Ravi
			// Calling the single service to fetch all the details
			param.setRangeFlag(request.getParameter("rangedFlag"));

			param.setPaginationCheck(false);
			UserContext user = ((UserContext) request.getSession().getAttribute("user"));
			List<ArticleSearchResults> articleSearchResults = articleService
					.getArticleDetails(param,user);

			if (articleSearchResults == null
					|| articleSearchResults.size() == 0) {
				modelAndView = new ModelAndView("articleSearch", "param", param);
				model.addAttribute("articleSearchResutls",
						new ArticleSearchResults());
				model.addAttribute("noData", "No Data Found");
				model.addAttribute("isSellPrice", false);
				model.addAttribute("param", param);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);

				return modelAndView;
			} else {

				modelAndView = new ModelAndView("articleDtls", "param", param);
				isSohGreaterThanZero(articleSearchResults.get(0));

				// setting unit for cup price in article details page
				String country = SalesOrgUtil
						.getCountryFromSalesOrg(((UserContext) request
								.getSession().getAttribute("user"))
								.getSalesOrg());
				if (country.equalsIgnoreCase("australia")) {
					String cupUnit = "";
					if (!articleSearchResults.get(0).getCompSizeAu()
							.equalsIgnoreCase("0")
							&& articleSearchResults.get(0).getCompSizeAuUom()
									.trim().length() != 0) {
						cupUnit = "per "
								+ articleSearchResults.get(0).getCompSizeAu()
								+ " "
								+ articleSearchResults.get(0)
										.getCompSizeAuUom();
					}

					// //System.out.println(" aus cupUnit"+cupUnit);
					articleSearchResults.get(0).setCupUnit(cupUnit);
				} else {
					String cupUnit = "";
					if (!articleSearchResults.get(0).getCompSizeNz()
							.equalsIgnoreCase("0")
							&& articleSearchResults.get(0).getCompSizeNzUom()
									.trim().length() != 0) {
						cupUnit = "per "
								+ articleSearchResults.get(0).getCompSizeNz()
								+ " "
								+ articleSearchResults.get(0)
										.getCompSizeNzUom();
					}

					// //System.out.println(" new cupUnit"+cupUnit);
					articleSearchResults.get(0).setCupUnit(cupUnit);
				}
				model.addAttribute("articleSearchResutls",
						articleSearchResults.get(0));

				if ("Y".equalsIgnoreCase(articleSearchResults.get(0)
						.getRangedFlag()))
					model.addAttribute("isSellPrice", true);
				else
					model.addAttribute("isSellPrice", false);
				model.addAttribute("param", param);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				param.setArticleNo("");
				param.setArticleName(desc);
				return populateDropDown(modelAndView, request);
			}
			/*
			 * // BASIC try { List<ArticleBasicViewDetails>
			 * articleBasicViewDetailsList = articleService
			 * .getArticleBasicView(param); if (articleBasicViewDetailsList !=
			 * null && articleBasicViewDetailsList.size() != 0) {
			 * 
			 * model.addAttribute("articleBasicViewDetails",
			 * articleBasicViewDetailsList.get(0)); articleNo =
			 * articleBasicViewDetailsList.get(0) .getArticleNo(); uom =
			 * articleBasicViewDetailsList.get(0).getCompSizeAuUom(); } else {
			 * 
			 * model.addAttribute("articleBasicViewDetails", new
			 * ArticleBasicViewDetails());
			 * 
			 * modelAndView = new ModelAndView("articleSearch", "param", param);
			 * model.addAttribute("noData", "No Data Found");
			 * modelAndView.addObject("model", model);
			 * modelAndView.addAllObjects(model); return modelAndView; } } catch
			 * (Exception e) {
			 * 
			 * model.addAttribute("noData", "No Data Found");
			 * model.addAttribute("articleBasicViewDetails", new
			 * ArticleBasicViewDetails()); modelAndView = new
			 * ModelAndView("articleSearch", "param", param);
			 * modelAndView.addObject("model", model);
			 * modelAndView.addAllObjects(model);
			 * 
			 * return modelAndView; } // GTIN try { List<ArticleGtinInfo>
			 * articleGtinList = articleService .getGtinView(param);
			 * 
			 * if (articleGtinList != null && articleGtinList.size() != 0) {
			 * model.addAttribute("articleGtinList", articleGtinList); } else {
			 * model.addAttribute("articleGtinList", new
			 * ArrayList<ArticleGtinInfo>()); } } catch (Exception e) {
			 * model.addAttribute("noData", "No Data Found");
			 * model.addAttribute("articleGtinList", new
			 * ArrayList<ArticleGtinInfo>()); } // SELL PRICE
			 * List<ArticleSellPriceView> articleSellPriceViewList = null; try {
			 * articleSellPriceViewList = articleService
			 * .getSellPriceView(param); if (articleSellPriceViewList != null &&
			 * articleSellPriceViewList.size() != 0) {
			 * model.addAttribute("articleSellPriceViewList",
			 * articleSellPriceViewList); } else {
			 * model.addAttribute("articleSellPriceViewList", new
			 * ArrayList<ArticleSellPriceView>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("articleSellPriceViewList", new
			 * ArrayList<ArticleSellPriceView>()); }
			 * 
			 * boolean isSellPrice = true;
			 * ////System.out.println("**************** articleSellPriceViewList "
			 * +articleSellPriceViewList); if (articleSellPriceViewList == null)
			 * {
			 * 
			 * isSellPrice = false;
			 * ////System.out.println(" articleSellPriceViewList == null "
			 * +isSellPrice ); } else if (articleSellPriceViewList != null &&
			 * articleSellPriceViewList.size() != 0) { ArticleSellPriceView
			 * articleSellPriceView = articleSellPriceViewList .get(0);
			 * 
			 * String sellPrice = articleSellPriceView.getSalesPrice();
			 * 
			 * ////System.out.println(" articleSellPriceViewList != null "+isSellPrice
			 * ); if (sellPrice == null || sellPrice.equals("")) {
			 * ////System.out.println(" sellPrice == null "+isSellPrice );
			 * isSellPrice = false; } }else if (articleSellPriceViewList != null
			 * && articleSellPriceViewList.size() == 0) { isSellPrice = false; }
			 * ////System.out.println("******** isSellPrice "+isSellPrice);
			 * model.addAttribute("isSellPrice", isSellPrice); if (isSellPrice)
			 * {
			 * 
			 * // SITE try { List<ArticleSiteView> articleSiteViewList =
			 * articleService .getSiteView(param); if (articleSiteViewList !=
			 * null && articleSiteViewList.size() != 0) {
			 * model.addAttribute("articleSiteViewList", articleSiteViewList); }
			 * else { model.addAttribute("articleSiteViewList", new
			 * ArrayList<ArticleSiteView>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("articleSiteViewList", new
			 * ArrayList<ArticleSiteView>()); }
			 * 
			 * }
			 * 
			 * model.addAttribute("isSellPrice", isSellPrice); if (isSellPrice)
			 * {
			 * 
			 * // SITE try { List<ArticleSiteView> articleSiteViewList =
			 * articleService .getSiteView(param); if (articleSiteViewList !=
			 * null && articleSiteViewList.size() != 0) {
			 * model.addAttribute("articleSiteViewList", articleSiteViewList); }
			 * else { model.addAttribute("articleSiteViewList", new
			 * ArrayList<ArticleSiteView>()); } } catch (Exception e) {
			 * model.addAttribute("notRanged", "Article Not Ranged");
			 * model.addAttribute("articleSiteViewList", new
			 * ArrayList<ArticleSiteView>()); }
			 * 
			 * }
			 */

		} catch (Exception e) {
			e.printStackTrace();
		}

		modelAndView = new ModelAndView("articleDtls");
		model.addAttribute("inventoryFlag", "");
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return populateDropDown(modelAndView, request);
	}

	@RequestMapping(value = "/gtin.htm", method = RequestMethod.GET)
	public ModelAndView gtin(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ArticleParam param=new ArticleParam();
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticleGtinInfo> articleGtinList = articleService
					.getGtinView(param,user);

			if (articleGtinList != null && articleGtinList.size() != 0) {
				model.addAttribute("articleGtinList", articleGtinList);
			} else {
				model.addAttribute("articleGtinList",
						new ArrayList<ArticleGtinInfo>());
			}

			List<ArticlePackBreakdown> packBreakdown = articleService
					.getPackBreakdownInfo(param,user);
			if (packBreakdown != null && packBreakdown.size() != 0) {
				model.addAttribute("packBreakdown", packBreakdown);
			} else {
				model.addAttribute("packBreakdown",
						new ArrayList<ArticlePackBreakdown>());
			}
		} catch (Exception e) {
			e.printStackTrace();
			// model.addAttribute("noData", "No Data Found");
			model.addAttribute("articleGtinList",
					new ArrayList<ArticleGtinInfo>());
			model.addAttribute("packBreakdown",
					new ArrayList<ArticlePackBreakdown>());

		}
		ModelAndView modelAndView = new ModelAndView("ArticleGtin");
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/articleHierarchy.htm", method = RequestMethod.GET)
	public ModelAndView articleHierarchy(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticleSalesView> articleSalesViewList = articleService
					.getSalesViewInfo(param,user);
			if (articleSalesViewList != null
					&& articleSalesViewList.size() != 0) {
				model.addAttribute("articleSalesViewList", articleSalesViewList);
			} else {
				model.addAttribute("articleSalesViewList",
						new ArrayList<ArticleSalesView>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("articleSalesViewList",
					new ArrayList<ArticleSalesView>());
		}
		ModelAndView modelAndView = new ModelAndView("ArticleHierarchyRelation");
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/articleInventory.htm", method =
	 * RequestMethod.GET) public ModelAndView
	 * articleInventory(HttpServletRequest request, HttpServletResponse
	 * response) throws Exception {
	 * param.setArticleNo(request.getParameter("articleNo"));
	 * //param.setSiteNo(request.getParameter("siteNo")); //TODO change
	 * param.setSiteNo(((UserContext) request.getSession().getAttribute(
	 * "user")).getSiteNo());
	 * 
	 * ////System.out.println("******** *Inventory AJAX call "+request.getParameter
	 * ( "articleNo")+" "+request.getParameter("siteNo")); // INVENTORY SOH try
	 * { List<InventorySOHInfo> inventorySOHInfo = articleService
	 * .getStockOnHand(param.getArticleNo(), param.getSiteNo());
	 * ////System.out.println("inventorySOHInfo.size() "+inventorySOHInfo.size());
	 * if (inventorySOHInfo != null && inventorySOHInfo.size() != 0) {
	 * model.addAttribute("inventorySOHInfo", inventorySOHInfo); } else {
	 * model.addAttribute("inventorySOHInfo", new
	 * ArrayList<InventorySOHInfo>()); } } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("inventorySOHInfo", new
	 * ArrayList<InventorySOHInfo>()); ////System.out.println("Exception"); } //
	 * INVENTORY SIT try { List<InventorySITInfo> inventorySITInfo =
	 * articleService .getStockinTransit(param.getArticleNo(),
	 * param.getSiteNo()); if (inventorySITInfo != null &&
	 * inventorySITInfo.size() != 0) { model.addAttribute("inventorySITInfo",
	 * inventorySITInfo); } else { model.addAttribute("inventorySITInfo", new
	 * ArrayList<InventorySITInfo>()); } } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("inventorySITInfo", new
	 * ArrayList<InventorySITInfo>()); }
	 * 
	 * // INVENTORY SOO try { List<InventorySOOInfo> inventorySOOInfo =
	 * articleService .getStockonOrder(param.getArticleNo(), param.getSiteNo());
	 * if (inventorySOOInfo != null && inventorySOOInfo.size() != 0) {
	 * model.addAttribute("inventorySOOInfo", inventorySOOInfo); } else {
	 * model.addAttribute("inventorySOOInfo", new
	 * ArrayList<InventorySOOInfo>()); } } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("inventorySOOInfo", new
	 * ArrayList<InventorySOOInfo>()); } ModelAndView modelAndView = new
	 * ModelAndView("inventory"); modelAndView.addAllObjects(model); return
	 * modelAndView; }
	 */

	/*
	 * @RequestMapping(value = "/purchasingView.htm", method =
	 * RequestMethod.GET) public ModelAndView purchasingView(HttpServletRequest
	 * request, HttpServletResponse response) throws Exception {
	 * param.setArticleNo(request.getParameter("articleNo"));
	 * param.setSiteNo(request.getParameter("siteNo")); try {
	 * List<ArticlePurchasingView> articlePurchasingViewList = articleService
	 * .getPurchasingView(param); if (articlePurchasingViewList != null &&
	 * articlePurchasingViewList.size() != 0) {
	 * model.addAttribute("articlePurchasingViewList",
	 * articlePurchasingViewList); } else {
	 * model.addAttribute("articlePurchasingViewList", new
	 * ArrayList<ArticlePurchasingView>()); } } catch (Exception e) {
	 * model.addAttribute("notRanged", "Article Not Ranged");
	 * model.addAttribute("articlePurchasingViewList", new
	 * ArrayList<ArticlePurchasingView>()); } ModelAndView modelAndView = new
	 * ModelAndView("ArticlePurchasingView"); modelAndView.addAllObjects(model);
	 * return modelAndView; }
	 */

	@RequestMapping(value = "/packBreakdown.htm", method = RequestMethod.GET)
	public ModelAndView packBreakdown(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		try {
			List<ArticlePackBreakdown> packBreakdown = articleService
					.getPackBreakdownInfo(param,user);
			if (packBreakdown != null && packBreakdown.size() != 0) {
				model.addAttribute("packBreakdown", packBreakdown);
			} else {
				model.addAttribute("packBreakdown",
						new ArrayList<ArticlePackBreakdown>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("packBreakdown",
					new ArrayList<ArticlePackBreakdown>());
		}

		ModelAndView modelAndView = new ModelAndView("ArticlePackBreakdown");
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/articleSiteView.htm", method = RequestMethod.GET)
	public ModelAndView articleSiteView(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		param.setArticleNo(request.getParameter("articleNo"));
		param.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticleSiteView> articleSiteViewList = articleService
					.getSiteView(param,user);
			if (articleSiteViewList != null && articleSiteViewList.size() != 0) {
				model.addAttribute("articleSiteViewList", articleSiteViewList);
			} else {
				model.addAttribute("articleSiteViewList",
						new ArrayList<ArticleSiteView>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("articleSiteViewList",
					new ArrayList<ArticleSiteView>());
		}

		ModelAndView modelAndView = new ModelAndView("ArticleSiteView");
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/freshFoodLabel.htm", method = RequestMethod.GET)
	public ModelAndView freshFoodLabel(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		ArticleParam tempParam = new ArticleParam();
		tempParam.setArticleNo(request.getParameter("articleNo"));
		tempParam.setSiteNo(request.getParameter("siteNo"));
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			List<ArticleFreshFoodLabels> freshFoodLabelinfo = articleService
					.getFreshFoodFlagInformation(tempParam,user);
			if (freshFoodLabelinfo != null && freshFoodLabelinfo.size() != 0) {
				model.addAttribute("freshFoodLabel1", freshFoodLabelinfo.get(0));
			} else {
				model.addAttribute("freshFoodLabel1",
						new ArticleFreshFoodLabels());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("freshFoodLabel", new ArticleFreshFoodLabels());
		}
		try {
			List<ArticleFreshFoodLabels> freshFoodLabelinfo = articleService
					.getFreshFoodLabelInformation(tempParam,user);
			if (freshFoodLabelinfo != null && freshFoodLabelinfo.size() != 0) {
				model.addAttribute("freshFoodLabel", freshFoodLabelinfo.get(0));
			} else {
				model.addAttribute("freshFoodLabel",
						new ArticleFreshFoodLabels());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("freshFoodLabel", new ArticleFreshFoodLabels());
		}
		try {
			List<ArticleProductNotes> productNotesList = articleService
					.getProductNotesInfo(tempParam,user);
			if (productNotesList != null && productNotesList.size() != 0) {
				model.addAttribute("productNotesList", productNotesList);
			} else {
				model.addAttribute("productNotesList",
						new ArrayList<ArticleProductNotes>());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("productNotesList",
					new ArrayList<ArticleProductNotes>());
		}

		try {

			List<ArticleNutritionalResult> articleNutritionalResult = articleService
					.getArticleCustcomNutritionalInfo(tempParam,user);
			if (articleNutritionalResult != null
					&& articleNutritionalResult.size() != 0) {
				model.addAttribute("custNutritionalInfo",
						articleNutritionalResult.get(0));
			} else {
				model.addAttribute("custNutritionalInfo",
						new ArticleNutritionalResult());
			}
		} catch (Exception e) {
			model.addAttribute("notRanged", "Article Not Ranged");
			model.addAttribute("custNutritionalInfo",
					new ArticleNutritionalResult());
			e.printStackTrace();
		}

		ModelAndView modelAndView = new ModelAndView("ArticleFreshFoodLabel");
		modelAndView.addAllObjects(model);

		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/inventory.htm", method = RequestMethod.GET)
	 * public ModelAndView inventory(HttpServletRequest request,
	 * HttpServletResponse response) throws Exception { ArticleParam param = new
	 * ArticleParam();
	 * 
	 * param.setArticleNo(request.getParameter("articleNo"));
	 * param.setSiteNo(request.getParameter("siteNo"));
	 * param.setSalesOrg(request.getParameter("salesOrg")); ModelMap model = new
	 * ModelMap(); ModelAndView modelAndView = new ModelAndView("StockOnHand");
	 * if (param.getArticleNo() != null && param.getSiteNo() != null &&
	 * !param.getSiteNo().equals("") && !param.getArticleNo().equals("")) {
	 * 
	 * // Calling Stock On Hand Service List<InventorySOHInfo> inventorySOHInfo
	 * = articleService .getStockOnHand(param.getArticleNo(),
	 * param.getSiteNo()); // Calling Stock in Transit Service
	 * List<InventorySITInfo> inventorySITInfo = articleService
	 * .getStockinTransit(param.getArticleNo(), param.getSiteNo()); // Calling
	 * Stock on Order Service List<InventorySOOInfo> inventorySOOInfo =
	 * articleService .getStockonOrder(param.getArticleNo(), param.getSiteNo());
	 * 
	 * model.addAttribute("inventorySOHInfo", inventorySOHInfo);
	 * model.addAttribute("inventorySITInfo", inventorySITInfo);
	 * model.addAttribute("inventorySOOInfo", inventorySOOInfo); //
	 * model.addAttribute("artInvList", artInvInforesult);
	 * model.addAttribute("param", param); // ModelAndView modelAndView = new
	 * ModelAndView("ArticleInventory");
	 * 
	 * modelAndView.addAllObjects(model); } return modelAndView; }
	 */

	/*
	 * @RequestMapping(value = "/salesPrice.htm", method = RequestMethod.GET)
	 * public ModelAndView salesPrice(HttpServletRequest request,
	 * HttpServletResponse response) throws Exception {
	 * 
	 * ArticleParam param = new ArticleParam();
	 * param.setArticleNo(request.getParameter("articleNo"));
	 * param.setSiteNo(request.getParameter("siteNo"));
	 * param.setSalesOrg(request.getParameter("salesOrg"));
	 * 
	 * List<ArticleSalesPriceInfo> salesPriceList = articleService
	 * .getSalesPriceInfo(param);
	 * 
	 * if (salesPriceList == null) { return new
	 * ModelAndView("ArticleSalesPriceInfo", "salesPriceList", new
	 * ArrayList<ArticleSalesPriceInfo>()); } else { return new
	 * ModelAndView("ArticleSalesPriceInfo", "salesPriceList", salesPriceList);
	 * }
	 * 
	 * }
	 */

	/*
	 * @RequestMapping(value = "/hierarchyRelation.htm", method =
	 * RequestMethod.GET) public ModelAndView
	 * hierarchyRelation(HttpServletRequest request, HttpServletResponse
	 * response) throws Exception {
	 * 
	 * ArticleParam param = new ArticleParam();
	 * param.setArticleNo(request.getParameter("articleNo"));
	 * param.setSiteNo(request.getParameter("siteNo"));
	 * param.setSalesOrg(request.getParameter("salesOrg"));
	 * 
	 * List<ArticleHierarchyRelation> hierarchyRelationList = articleService
	 * .getHierarchyRelationInfo(param);
	 * 
	 * if (hierarchyRelationList == null) { return new
	 * ModelAndView("ArticleHierarchyRelation", "hierarchyRelationList", new
	 * ArrayList<ArticleHierarchyRelation>()); } else {
	 * 
	 * return new ModelAndView("ArticleHierarchyRelation",
	 * "hierarchyRelationList", hierarchyRelationList);
	 * 
	 * }
	 * 
	 * }
	 */

	@RequestMapping(value = "/onPageLoadSOH.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadSOH(HttpServletRequest request,
			HttpServletResponse response) throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView("Login");

		}
		param.setDistance(20);
		param.setMaxStores(25);
		param.setSiteNo(((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo());
		model.addAttribute("param", param);

		ModelAndView modelAndView = new ModelAndView("articleInventoryOdata");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/sohSearchArticle.htm", method = RequestMethod.GET)
	public ModelAndView sohSearchArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
		getReasonCodeForSoh(user);

		// //System.out.println("entered articleSearch");
		model.addAttribute("noDataSoh", " ");
		model.addAttribute("noDataFound", " ");
		model.addAttribute("sohPostStatus", " ");
		model.addAttribute("sohAdjustLogList",
				new ArrayList<SohAdjustLogModel>());
		model.addAttribute("prevPageIndicator", "Home");
		model.addAttribute("reasonCodeDropRetain", "");
		// param.setArticleNo(request.getParameter("articleNo"));

		List<ArticleSearchResults> articleSearchResultsFetched = new ArrayList<ArticleSearchResults>();

		List<ArticleSearchResults> articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();
		StockAdjustModel stockAdjustModel = new StockAdjustModel();
		StockAdjustParam stockAdjustParam = new StockAdjustParam();
		stockAdjustParam.setArticleNo(request.getParameter("articleNo"));
		model.addAttribute("stockAdjustParam", stockAdjustParam);
		// //System.out.println("articleNo"+stockAdjustParam.getArticleNo());

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");

		IBTOrderParam ibtParam = new IBTOrderParam();
		// param.setArticleNo(articleNo);
		ibtParam.setSiteNo(userContext.getSiteNo());
		ibtParam.setArticleNo(request.getParameter("articleNo"));

		// set below for stockAdjustParam

		// //System.out.println("article type"+request.getParameter("articleType"));
		if (request.getParameter("articleType").equalsIgnoreCase(
				"ArticleNumber")) {
			ibtParam.setArticleType("articleNo");
		} else if (request.getParameter("articleType").equalsIgnoreCase("EAN")) {
			ibtParam.setArticleType("ean");
		} else {
			ibtParam.setArticleType("desc");

		}
		model.addAttribute("articleType", ibtParam);

		// comment it
		/*
		 * if (postSuccessFlag == true) {
		 * ////System.out.println(" inside succes check");
		 * articleSearchResultsforIBT = new ArrayList<ArticleSearchResults>();
		 * updatedArticleResults = new ArrayList<ArticleSearchResults>();
		 * addArtSearchResults = new ArrayList<ArticleSearchResults>();
		 * postSuccessFlag = false; }
		 */

		// //System.out.println("art no" + request.getParameter("articleNo"));

		// String articleNo = request.getParameter("articleNo");

		model.addAttribute("stockAdjustParam", stockAdjustParam);
		model.addAttribute("errorMsg", "");

		if (request.getParameter("buttonVal").equalsIgnoreCase("addArticle")) {
			// //System.out.println("inside search");
			try {
				// //System.out.println("Inside try");
				// addArtSearchResults = new ArrayList<ArticleSearchResults>();
				model.addAttribute("multiArtRes",
						new ArrayList<ArticleSearchResults>());
				// SEARCH ARTICLE
				model.addAttribute("errorMsg", "");

				// SERVICE CALL
				articleSearchResultsFetched = orderService
						.getArticleDetailsForSOH(ibtParam,userContext);
				model.addAttribute("errorMsg", "");
				if (articleSearchResultsFetched != null
						&& articleSearchResultsFetched.size() == 1) {
					model.addAttribute("size", "0");
					if (articleSearchResultsFetched.get(0).getMsg()
							.equalsIgnoreCase("1")) {
						model.addAttribute("size", "1");
						// //System.out.println(" inside 1");

						if ((articleSearchResultsFetched.get(0).getRangedFlag()
								.equalsIgnoreCase("Y"))
								|| (articleSearchResultsFetched.get(0)
										.getRangedFlag().equalsIgnoreCase("N") && Double
										.parseDouble(articleSearchResultsFetched
												.get(0).getSOH().trim()) > 0)) {
							// ranged or (not ranged and soh>0)
							// //System.out.println("entered ranged or (not ranged and soh>0)");
							model.addAttribute("errorMsg", "");
							// model.addAttribute("param", param);
							stockAdjustModel
									.setArticleName(articleSearchResultsFetched
											.get(0).getDescription());
							stockAdjustModel
									.setArticleNo(articleSearchResultsFetched
											.get(0).getArticleNo());
							stockAdjustModel.setUom(articleSearchResultsFetched
									.get(0).getBaseUom());
							stockAdjustModel
									.setUomValue(articleSearchResultsFetched
											.get(0).getSOH());
							stockAdjustModel
									.setCarton(articleSearchResultsFetched.get(
											0).getOM());
							model.addAttribute("stockAdjustModel",
									stockAdjustModel);
							model.addAttribute("indicatorFromHome", "true");
							ModelAndView modelAndView = new ModelAndView("soh");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;

							// return requestIBTOrderDetail(request, response);
						} else {// not ranged
								// //System.out.println("entered not ranged ");

							model.addAttribute("stockAdjustModel",
									new StockAdjustModel());

							model.addAttribute("noDataFound",
									"Article not available in your store");
							ModelAndView modelAndView = new ModelAndView(
									"sohFromHome");
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return modelAndView;
						}
					} else {// nodata found
							// //System.out.println("entered no data found ");
						model.addAttribute("stockAdjustModel",
								new StockAdjustModel());
						if (articleSearchResults != null
								&& articleSearchResults.size() > 0) {
							model.addAttribute("noDataFound",
									"Sorry no results returned for your search criteria. Please try again");
						} else {
							model.addAttribute("noDataFound",
									"Sorry no results returned for your search criteria. Please try again");
						}
						ModelAndView modelAndView = new ModelAndView(
								"sohFromHome");
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return modelAndView;
					}

				} else if (articleSearchResultsFetched != null
						&& articleSearchResultsFetched.size() > 1) {
					// //System.out.println("size>1");
					model.addAttribute("errorMsg", "");
					// addArtSearchResults = new
					// ArrayList<ArticleSearchResults>();
					/*
					 * for (int i = 0; i < articleSearchResultsFetched.size();
					 * i++) { if
					 * ((articleSearchResultsFetched.get(i).getRangedFlag()
					 * .equalsIgnoreCase
					 * ("Y"))||(articleSearchResultsFetched.get(
					 * i).getRangedFlag() .equalsIgnoreCase("N") &&
					 * Double.parseDouble
					 * (articleSearchResultsFetched.get(0).getSOH())>0)){
					 * addArtSearchResults.add(articleSearchResultsFetched
					 * .get(i));
					 * 
					 * } }
					 */
					// //System.out.println("articleSearchResultsFetched size--->"
					// + articleSearchResultsFetched.size());

					model.addAttribute("multiArtRes",
							articleSearchResultsFetched);
					addArtSearchResults = articleSearchResultsFetched;
					/*
					 * if (addArtSearchResults.size() > 0) {
					 * ////System.out.println
					 * ("final result size"+addArtSearchResults.size());
					 * model.addAttribute("size", "2"); }else{
					 * model.addAttribute("noDataFound",
					 * "No ranged articles are found"); }
					 */
					model.addAttribute("size", "2");
					ModelAndView modelAndView = new ModelAndView("sohFromHome");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;

				} else {
					// //System.out.println("final size desc-->zero");
					model.addAttribute("size", "0");
					// //System.out.println("no data found");
					model.addAttribute("noDataFound",
							"Sorry no results returned for your search criteria. Please try again");
					ModelAndView modelAndView = new ModelAndView("sohFromHome");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				}

			} catch (Exception e) {
				// //System.out.println("Catch");
				e.printStackTrace();
				model.addAttribute("size", "0");
				model.addAttribute("noDataFound",
						"Sorry no results returned for your search criteria. Please try again");
				ModelAndView modelAndView = new ModelAndView("sohFromHome");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;
			}

		} else if (request.getParameter("buttonVal").equalsIgnoreCase(
				"multiArticleSelect")) {
			// //System.out.println("multi index--->"
			// + request.getParameter("multiArtIndex"));
			// //System.out.println("addArtSearchResults size"+addArtSearchResults.size());

			if (addArtSearchResults != null && addArtSearchResults.size() > 0) {
				addArtSearchResults.get(0).getDescription();
			}
			if (request.getParameter("multiArtIndex") != null
					&& request.getParameter("multiArtIndex").trim().length() > 0) {
				int index = Integer.parseInt(request
						.getParameter("multiArtIndex"));
				stockAdjustModel.setArticleName(addArtSearchResults.get(index)
						.getDescription());
				stockAdjustModel.setArticleNo(addArtSearchResults.get(index)
						.getArticleNo());
				stockAdjustModel.setUom(addArtSearchResults.get(index)
						.getBaseUom());
				stockAdjustModel.setUomValue(addArtSearchResults.get(index)
						.getSOH());
				stockAdjustModel.setCarton(addArtSearchResults.get(index)
						.getOM());

				// updatedArticleOrderDetails =
				// addArtSearchResults.get(Integer.parseInt(request.getParameter("multipleArtIndex")));
			}
			model.addAttribute("size", "0");
			model.addAttribute("stockAdjustModel", stockAdjustModel);
			model.addAttribute("indicatorFromHome", "true");
			ModelAndView modelAndView = new ModelAndView("soh");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		}

		model.addAttribute("noDataFound",
				"Sorry no results returned for your search criteria. Please try again");
		ModelAndView modelAndView = new ModelAndView("sohFromHome");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

		// ##########################################################################

		/*
		 * try {
		 * 
		 * 
		 * List<ArticleSearchResults>
		 * articleSearchResults=articleService.getArticleDetails(param);
		 * 
		 * if (articleSearchResults != null && articleSearchResults.size() != 0
		 * && articleSearchResults.get(0).getMsg().equalsIgnoreCase("1")) {
		 * 
		 * ArticleSearchResults results = articleSearchResults .get(0);
		 * ////System.out.println("range flag");
		 * ////System.out.println("results.getRangedFlag()="
		 * +results.getRangedFlag());
		 * if((!results.getRangedFlag().equalsIgnoreCase
		 * ("N"))||(results.getRangedFlag().equalsIgnoreCase("N")&&
		 * Double.parseDouble(results.getSOH())>0)){
		 * stockAdjustModel.setArticleNo(results.getArticleNo());
		 * stockAdjustModel.setArticleName(results .getDescription());
		 * stockAdjustModel.setUom(results .getBaseUom()); stockAdjustModel
		 * .setUomValue(results.getSOH());
		 * model.addAttribute("stockAdjustModel", stockAdjustModel);} else{
		 * model.addAttribute("stockAdjustModel", new StockAdjustModel());
		 * 
		 * model.addAttribute("noData", "Article not available in your store");
		 * ModelAndView modelAndView = new ModelAndView("sohFromHome");
		 * modelAndView.addObject("model", model);
		 * modelAndView.addAllObjects(model); return modelAndView;
		 * 
		 * } } else {
		 * 
		 * model.addAttribute("stockAdjustModel", new StockAdjustModel());
		 * if(articleSearchResults!=null && articleSearchResults.size()>0){
		 * model.addAttribute("noData", articleSearchResults.get(0).getMsg());
		 * }else{ model.addAttribute("noData", "No Data Found"); } ModelAndView
		 * modelAndView = new ModelAndView("sohFromHome");
		 * modelAndView.addObject("model", model);
		 * modelAndView.addAllObjects(model); return modelAndView;
		 * 
		 * } } catch (Exception e) {
		 * 
		 * model.addAttribute("c", "No Data Found"); ModelAndView modelAndView =
		 * new ModelAndView("sohFromHome"); modelAndView.addObject("model",
		 * model); modelAndView.addAllObjects(model); return modelAndView;
		 * 
		 * }
		 * 
		 * model.addAttribute("indicatorFromHome", "true"); ModelAndView
		 * modelAndView = new ModelAndView("soh");
		 * modelAndView.addObject("model", model);
		 * modelAndView.addAllObjects(model); return modelAndView;
		 */

	}

	/*
	 * // STOCK ADJUSTMENT
	 * 
	 * @RequestMapping(value = "/sohSearchArticle.htm", method =
	 * RequestMethod.GET) public ModelAndView
	 * sohSearchArticle(HttpServletRequest request, HttpServletResponse
	 * response) throws Exception { model.addAttribute("noData", " ");
	 * model.addAttribute("sohPostStatus", " ");
	 * model.addAttribute("sohAdjustLogList",new
	 * ArrayList<SohAdjustLogModel>()); model.addAttribute("prevPageIndicator",
	 * "Home");
	 * 
	 * 
	 * String articleNo = request.getParameter("articleNo"); StockAdjustParam
	 * stockAdjustParam= new StockAdjustParam();
	 * stockAdjustParam.setArticleNo(articleNo);
	 * model.addAttribute("stockAdjustParam", stockAdjustParam);
	 * ////System.out.println("articleNo"+articleNo);
	 * 
	 * UserContext userContext = (UserContext) request.getSession()
	 * .getAttribute("user"); String siteNo = userContext.getSiteNo();
	 * 
	 * StockAdjustModel stockAdjustModel = new StockAdjustModel(); try {
	 * ArticleParam param = new ArticleParam(); param.setArticleNo(articleNo);
	 * param.setSiteNo(siteNo);
	 * 
	 * List<ArticleSearchResults>
	 * articleSearchResults=articleService.getArticleDetails(param);
	 * 
	 * if (articleSearchResults != null && articleSearchResults.size() != 0 &&
	 * articleSearchResults.get(0).getMsg().equalsIgnoreCase("1")) {
	 * 
	 * ArticleSearchResults results = articleSearchResults .get(0);
	 * ////System.out.println("range flag");
	 * ////System.out.println("results.getRangedFlag()="+results.getRangedFlag());
	 * if
	 * ((!results.getRangedFlag().equalsIgnoreCase("N"))||(results.getRangedFlag
	 * ().equalsIgnoreCase("N")&& c(results.getSOH())>0)){
	 * stockAdjustModel.setArticleNo(results.getArticleNo());
	 * stockAdjustModel.setArticleName(results .getDescription());
	 * stockAdjustModel.setUom(results .getBaseUom()); stockAdjustModel
	 * .setUomValue(results.getSOH()); model.addAttribute("stockAdjustModel",
	 * stockAdjustModel);} else{ model.addAttribute("stockAdjustModel", new
	 * StockAdjustModel());
	 * 
	 * model.addAttribute("noData", "Article not available in your store");
	 * ModelAndView modelAndView = new ModelAndView("sohFromHome");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * } } else {
	 * 
	 * model.addAttribute("stockAdjustModel", new StockAdjustModel());
	 * if(articleSearchResults!=null && articleSearchResults.size()>0){
	 * model.addAttribute("noData", articleSearchResults.get(0).getMsg());
	 * }else{ model.addAttribute("noData", "No Data Found"); } ModelAndView
	 * modelAndView = new ModelAndView("sohFromHome");
	 * modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * } } catch (Exception e) {
	 * 
	 * model.addAttribute("noData", "No Data Found"); ModelAndView modelAndView
	 * = new ModelAndView("sohFromHome"); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 * 
	 * model.addAttribute("indicatorFromHome", "true"); ModelAndView
	 * modelAndView = new ModelAndView("soh"); modelAndView.addObject("model",
	 * model); modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 */

	@SuppressWarnings("unchecked")
	@RequestMapping(value = "/stockAdjustFromArticleDetail.htm", method = RequestMethod.GET)
	public ModelAndView stockAdjustFromArticleDetail(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
		getReasonCodeForSoh(user);
		model.addAttribute("noDataSoh", " ");
		model.addAttribute("sohAdjustLogList",
				new ArrayList<SohAdjustLogModel>());
		model.addAttribute("sohPostStatus", " ");
		model.addAttribute("prevPageIndicator", "");
		model.addAttribute("reasonCodeDropRetain", "");
		StockAdjustModel stockAdjustModel = new StockAdjustModel();
		model.addAttribute("indicatorFromHome", "false");
		ArticleSearchResults articleSearchResults;
		articleSearchResults = (ArticleSearchResults) model
				.get("articleSearchResutls");
		// //System.out.println("uom"+articleSearchResults.getSOH());
		// //System.out.println("uom"+articleSearchResults.getBaseUom());
		// //System.out.println("uom"+articleSearchResults.getArticleNo());
		// //System.out.println("uom"+articleSearchResults.getDescription());

		stockAdjustModel.setArticleName(articleSearchResults.getDescription());
		stockAdjustModel.setArticleNo(articleSearchResults.getArticleNo());
		stockAdjustModel.setUomValue(articleSearchResults.getSOH());
		stockAdjustModel.setUom(articleSearchResults.getBaseUom());
		stockAdjustModel.setCarton(articleSearchResults.getOM());

		model.addAttribute("stockAdjustModel", stockAdjustModel);
		ModelAndView modelAndView = new ModelAndView("soh");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/stockAdjustFromHome.htm", method = RequestMethod.GET)
	public ModelAndView stockAdjustFromHome(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		/*if(user.getUserAccessMap().containsKey(screenCode1)){
			if(user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
		
		model.addAttribute("noDataFound", " ");
		model.addAttribute("sohPostStatus", " ");
		model.addAttribute("noDataSoh", " ");
		model.addAttribute("reasonCodeDropRetain", "");
		StockAdjustModel stockAdjustModel = new StockAdjustModel();
		model.addAttribute("stockAdjustModel", stockAdjustModel);
		model.addAttribute("stockAdjustParam", new StockAdjustParam());

		ModelAndView modelAndView = new ModelAndView("sohFromHome");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/postSOHAdjustment.htm", method = RequestMethod.POST)
	public ModelAndView postSOHAdjustment(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		model.addAttribute("noDataSoh", " ");
		model.addAttribute("sohPostStatus", "");
		model.addAttribute("sohAdjustLogList",
				new ArrayList<SohAdjustLogModel>());
		String articleNo = request.getParameter("articleNumber");

		// //System.out.println("art no in post soh"+articleNo);
		String quantity = request.getParameter("adjust");
		String mvmtType = request.getParameter("selectReason");
		model.addAttribute("reasonCodeDropRetain", mvmtType);
		String newSoh = request.getParameter("new-soh");
		String articleDesc = request.getParameter("artDesc");
		String previousPage = (String) model.get("prevPageIndicator");
		String siteNo = (((UserContext) request.getSession().getAttribute(
				"user")).getSiteNo());

		String uomVal = request.getParameter("uomVal");
		// //System.out.println("contr  site no in post"+siteNo);
		/*
		 * DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd"); //get
		 * current date time with Date() Date date = new Date();
		 * ////System.out.println(dateFormat.format(date));
		 */
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		if (request.getParameter("sohHistory").equalsIgnoreCase(
				"sohHistoryFetch")) {

			sohAdjustLogList = new ArrayList<SohAdjustLogModel>();
			SohAdjustLogParam sohHistoryParam = new SohAdjustLogParam();
			sohHistoryParam.setArticleNo(request.getParameter("articleNumber"));
			sohHistoryParam.setSiteNo(((UserContext) request.getSession()
					.getAttribute("user")).getSiteNo());

			DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
			// get current date time with Date()
			Date date = new Date();
			// //System.out.println("to date"+dateFormat.format(date));

			// DateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");

			Calendar calFromDate = Calendar.getInstance();
			calFromDate.setTime(dateFormat.parse(dateFormat.format(date)));
			calFromDate.add(Calendar.DATE, -7);

			String convertedFromDate = dateFormat.format(calFromDate.getTime());
			// //System.out.println("todate");
			// //System.out.println("from date"+convertedFromDate);

			sohHistoryParam.setFromDate(convertedFromDate);
			sohHistoryParam.setToDate(dateFormat.format(date));
			
			sohAdjustLogList = sohAdjustLogServiceImpl
					.getSohHistory(sohHistoryParam,user);
			if (sohAdjustLogList != null
					&& sohAdjustLogList.size() > 0
					&& !sohAdjustLogList.get(0).getAdjustmentDate()
							.equalsIgnoreCase("")) {

				// //System.out.println("inside if size>=1");
				model.addAttribute("noDataSoh", "");
				model.addAttribute("sohAdjustLogList", sohAdjustLogList);
				// //System.out.println("uomVal"+uomVal);
				Double a = 5.9;
				int b = a.intValue();
				// //System.out.println("b"+b);
				for (int i = 0; i < sohAdjustLogList.size(); i++) {
					if (!uomVal.equalsIgnoreCase("kg")) {
						Double temp = Double.parseDouble(sohAdjustLogList
								.get(i).getEndSoh().trim());
						temp = temp / 1;
						int soh = temp.intValue();

						sohAdjustLogList.get(i).setEndSoh(String.valueOf(soh));

						Double temp1 = Double.parseDouble(sohAdjustLogList
								.get(i).getAdjustmentQuantity().trim());
						temp1 = temp1 / 1;
						int soh1 = temp1.intValue();
						sohAdjustLogList.get(i).setAdjustmentQuantity(
								String.valueOf(soh1));
					}
				}

			} else {
				// //System.out.println("inside if size==0");
				if (sohAdjustLogList != null && sohAdjustLogList.size() > 0)
					model.addAttribute("noDataSoh",
							"No adjustment history is available for the article");
				else
					model.addAttribute("noDataSoh",
							"No adjustment history is available for the article");
				model.addAttribute("sohAdjustLogList",
						new ArrayList<SohAdjustLogModel>());

			}

			// $('#sohHistory').val("sohHistoryFetch");
		} else {

			model.addAttribute("noDataSoh", "");
			String success = articleService.getadjustedSOHService(articleNo,
					quantity, mvmtType, siteNo, uomVal,user);
			if (success == null) {

				model.addAttribute("sohPostStatus", "True");

				if (previousPage == "Home") {

					DateFormat dateFormat = new SimpleDateFormat("dd.MM.yyyy");
					DateFormat timeFormat = new SimpleDateFormat("HH:mm:ss");
					// get current date time with Date()
					Date date = new Date();
					// //System.out.println("date-->"+dateFormat.format(date));
					// //System.out.println("time-->"+timeFormat.format(date));

					UserContext userContext = (UserContext) request
							.getSession().getAttribute("user");
					String userId = userContext.getUserId();
					String userName = userContext.getFirstName();
					// //System.out.println("user id"+userId);
					// //System.out.println("user name"+userName);

					SohAdjustLogModel sohAdjustLogModel = new SohAdjustLogModel();
					sohAdjustLogModel.setArticleNo(articleNo);
					sohAdjustLogModel.setArticleDesc(articleDesc);
					if (!uomVal.equalsIgnoreCase("kg")) {
						try {
							int a = newSoh.indexOf('.');
							sohAdjustLogModel.setEndSoh(newSoh.substring(0, a));
							// //System.out.println("1soh---->"+newSoh.substring(0,a));
						} catch (Exception e) {
							sohAdjustLogModel.setEndSoh(newSoh);
							// //System.out.println("2soh---->"+newSoh);
						}

					} else {
						sohAdjustLogModel.setEndSoh(newSoh);
						// //System.out.println("3soh---->"+newSoh);
					}

					sohAdjustLogModel
							.setAdjustmentDate(dateFormat.format(date));
					sohAdjustLogModel
							.setAdjustmentTime(timeFormat.format(date));
					sohAdjustLogModel.setUserId(userId);
					sohAdjustLogModel.setUserName(userName);

					double qty = Double.parseDouble(quantity.trim());
					if (qty < 0) {
						qty = qty * (-1);

					}

					if (!uomVal.equalsIgnoreCase("kg")) {
						try {
							int a = quantity.indexOf('.');
							sohAdjustLogModel.setAdjustmentQuantity(quantity
									.substring(0, a));
							// //System.out.println("1quantity"+quantity.substring(0,a));
						} catch (Exception e) {
							sohAdjustLogModel.setAdjustmentQuantity(quantity);
							// //System.out.println("2quantity"+quantity);
						}

					} else {
						sohAdjustLogModel.setAdjustmentQuantity(quantity);
						// //System.out.println("3quantity"+quantity);
					}

					// sohAdjustLogModel.setAdjustmentQuantity(""+qty);
					String outputReasonCode = null;

					for (int i = 0; i < mvmtTypeList.size(); i++) {
						if (mvmtTypeList.get(i).getMvmtType()
								.equalsIgnoreCase(mvmtType)) {
							outputReasonCode = mvmtTypeList.get(i)
									.getMvmtTypeDesc();
						}
					}

					sohAdjustLogModel.setMvmtTypeDesc(outputReasonCode);
					sohAdjustLogModel.setUom(uomVal);
					// Appending in top
					sohAdjustLogList.add(0, sohAdjustLogModel);

					/*
					 * for(int i=0;i<sohAdjustLogList.size();i++){
					 * if(!uomVal.equalsIgnoreCase("kg")){ Double
					 * temp=Double.parseDouble
					 * (sohAdjustLogList.get(i).getEndSoh()); temp=temp/1; int
					 * soh=temp.intValue();
					 * sohAdjustLogList.get(i).setEndSoh(String.valueOf(soh));
					 * 
					 * 
					 * Double temp1=Double.parseDouble(sohAdjustLogList.get(i).
					 * getAdjustmentQuantity()); temp1=temp1/1; int
					 * soh1=temp1.intValue();
					 * sohAdjustLogList.get(i).setAdjustmentQuantity
					 * (String.valueOf(soh1)); } }
					 */
					// sohAdjustLogList.add(sohAdjustLogModel);

					/*
					 * SohAdjustLogParam sohHistoryParam= new
					 * SohAdjustLogParam();
					 * sohHistoryParam.setArticleNo(request.
					 * getParameter("articleNumber"));
					 * sohHistoryParam.setSiteNo(((UserContext)
					 * request.getSession() .getAttribute("user")).getSiteNo());
					 * 
					 * 
					 * 
					 * DateFormat dateFormat = new
					 * SimpleDateFormat("dd/MM/yyyy"); //get current date time
					 * with Date() Date date = new Date();
					 * ////System.out.println(dateFormat.format(date));
					 * 
					 * 
					 * 
					 * sohHistoryParam.setFromDate(dateFormat.format(date));
					 * sohHistoryParam.setToDate(dateFormat.format(date));
					 * sohAdjustLogList= new ArrayList<SohAdjustLogModel>();
					 * sohAdjustLogList =
					 * sohAdjustLogServiceImpl.getSohHistory(sohHistoryParam);
					 * if (sohAdjustLogList != null && sohAdjustLogList.size()
					 * >0 &&
					 * sohAdjustLogList.get(0).getMessage().equalsIgnoreCase
					 * ("")) {
					 * 
					 * 
					 * 
					 * ////System.out.println("inside if size>=1");
					 * model.addAttribute("noDataSoh","");
					 * model.addAttribute("sohAdjustLogList",sohAdjustLogList);
					 * 
					 * 
					 * }else { ////System.out.println("inside if size==0");
					 * if(sohAdjustLogList!=null && sohAdjustLogList.size()>0)
					 * model
					 * .addAttribute("noDataSoh",sohAdjustLogList.get(0).getMessage
					 * () ); else
					 * model.addAttribute("noDataSoh","No Data found");
					 * model.addAttribute("sohAdjustLogList",new
					 * ArrayList<SohAdjustLogModel>());
					 * 
					 * }
					 */
					model.addAttribute("sohAdjustLogList", sohAdjustLogList);
					ModelAndView modelAndView = sohSearchNewArticle(request,
							response);

					model.addAttribute("noDataSoh",
							"Stock adjusted successfully");
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return modelAndView;
				} else {
					// //System.out.println("!fromHome---else part");

					ModelAndView modelAndView = sohGetArticleDetails(request,
							response);
					// modelAndView = sohGetArticleDetails(request,response);

					return modelAndView;
				}

			} else {
				model.addAttribute("sohPostStatus", success);
			}
		}

		/*
		 * boolean
		 * success=articleService.getadjustedSOHService(articleNo,quantity
		 * ,mvmtType,siteNo); if(success){
		 * 
		 * model.addAttribute("sohPostStatus", "True");
		 * if(previousPage=="Home"){ ModelAndView modelAndView =
		 * sohSearchNewArticle(request,response); // modelAndView =
		 * sohSearchNewArticle(request,response);
		 * 
		 * return modelAndView; }else{
		 * 
		 * ModelAndView modelAndView = sohGetArticleDetails(request,response);
		 * // modelAndView = sohGetArticleDetails(request,response);
		 * 
		 * return modelAndView; }
		 * 
		 * }else{ model.addAttribute("sohPostStatus", "False"); }
		 */

		if (previousPage == "Home") {
			ModelAndView modelAndView = new ModelAndView("soh");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		} else {
			ModelAndView modelAndView = new ModelAndView("soh");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);

			return modelAndView;
		}

	}

	public ModelAndView sohSearchNewArticle(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		// //System.out.println("new method");
		model.addAttribute("noDataSoh", " ");
		model.addAttribute("sohPostStatus", " ");
		model.addAttribute("prevPageIndicator", "Home");

		String articleNo = request.getParameter("articleNumber");

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");
		String siteNo = userContext.getSiteNo();
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		StockAdjustModel stockAdjustModel = new StockAdjustModel();
		try {
			// //System.out.println("inside try");
			ArticleParam param = new ArticleParam();

			articleNo = articleNo.replaceFirst("^0+(?!$)", "");
			param.setArticleNo(articleNo);
			// //System.out.println("art no b4 setting param in new funt"+articleNo);
			param.setSiteNo(siteNo);
			List<ArticleSearchResults> articleSearchResults = articleService
					.getArticleDetails(param,user);

			if (articleSearchResults != null
					&& articleSearchResults.size() != 0) {
				// //System.out.println("inside if");

				ArticleSearchResults articleSearchResultObject = articleSearchResults
						.get(0);

				stockAdjustModel.setArticleNo(articleSearchResultObject
						.getArticleNo());
				stockAdjustModel.setArticleName(articleSearchResultObject
						.getDescription());
				stockAdjustModel.setUom(articleSearchResultObject.getBaseUom());
				stockAdjustModel
						.setUomValue(articleSearchResultObject.getSOH());
				stockAdjustModel.setCarton(articleSearchResultObject.getOM());

				model.addAttribute("stockAdjustModel", stockAdjustModel);

			} else {
				// //System.out.println("inside else");
				model.addAttribute("stockAdjustModel", new StockAdjustModel());

				model.addAttribute("noDataSoh", "No Data Found");
				ModelAndView modelAndView = new ModelAndView("sohFromHome");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}
		} catch (Exception e) {

			// //System.out.println("inside catch");
			model.addAttribute("noDataSoh", "No Data Found");
			ModelAndView modelAndView = new ModelAndView("sohFromHome");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		}

		model.addAttribute("indicatorFromHome", "true");
		ModelAndView modelAndView = new ModelAndView("soh");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	public ModelAndView sohGetArticleDetails(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		// //System.out.println("new method sohGetArticleDetails");
		model.addAttribute("noDataSoh", " ");
		model.addAttribute("sohPostStatus", " ");
		model.addAttribute("prevPageIndicator", "Home");

		String articleNo = request.getParameter("articleNumber");

		UserContext userContext = (UserContext) request.getSession()
				.getAttribute("user");
		String siteNo = userContext.getSiteNo();

		ModelAndView modelAndView = null;
		ArticleParam articleParam = new ArticleParam();

		articleNo = articleNo.replaceFirst("^0+(?!$)", "");
		articleParam.setArticleNo(articleNo);
		// //System.out.println("art no b4 setting param in new funt"+articleNo);
		articleParam.setSiteNo(siteNo);
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			// //System.out.println("art no from param"+param.getArticleNo());
			List<ArticleSearchResults> articleSearchResults = articleService
					.getArticleDetails(articleParam,user);

			if (articleSearchResults == null
					|| articleSearchResults.size() == 0) {
				modelAndView = new ModelAndView("articleSearch", "param",
						articleParam);
				model.addAttribute("articleSearchResutls",
						new ArticleSearchResults());
				model.addAttribute("noDataSoh", "No Data Found");
				model.addAttribute("isSellPrice", false);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);

				return modelAndView;
			} else {

				modelAndView = new ModelAndView("articleDtls", "param", param);
				isSohGreaterThanZero(articleSearchResults.get(0));
				// setting unit for cup price in article details page
				String country = SalesOrgUtil
						.getCountryFromSalesOrg(((UserContext) request
								.getSession().getAttribute("user"))
								.getSalesOrg());
				if (country.equalsIgnoreCase("australia")) {
					String cupUnit = "";
					if (!articleSearchResults.get(0).getCompSizeAu()
							.equalsIgnoreCase("0")
							&& articleSearchResults.get(0).getCompSizeAuUom()
									.trim().length() != 0) {
						cupUnit = "per "
								+ articleSearchResults.get(0).getCompSizeAu()
								+ " "
								+ articleSearchResults.get(0)
										.getCompSizeAuUom();
					}

					// //System.out.println(" aus cupUnit"+cupUnit);
					articleSearchResults.get(0).setCupUnit(cupUnit);
				} else {
					String cupUnit = "";
					if (!articleSearchResults.get(0).getCompSizeNz()
							.equalsIgnoreCase("0")
							&& articleSearchResults.get(0).getCompSizeNzUom()
									.trim().length() != 0) {
						cupUnit = "per "
								+ articleSearchResults.get(0).getCompSizeNz()
								+ " "
								+ articleSearchResults.get(0)
										.getCompSizeNzUom();
					}

					// //System.out.println(" new cupUnit"+cupUnit);
					articleSearchResults.get(0).setCupUnit(cupUnit);
				}

				model.addAttribute("articleSearchResutls",
						articleSearchResults.get(0));

				if ("Y".equalsIgnoreCase(articleSearchResults.get(0)
						.getRangedFlag()))
					model.addAttribute("isSellPrice", true);
				else
					model.addAttribute("isSellPrice", false);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);

				return modelAndView;
			}

		} catch (Exception e) {
			e.printStackTrace();
		}

		modelAndView = new ModelAndView("articleDtls");
		model.addAttribute("inventoryFlag", "");
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/onPageLoadNearbyStoreSearchBack.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoadNearbyStoreSearchBack(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		// ////System.out.println("WebUtils.hasSubmitParameter"+WebUtils.hasSubmitParameter(request,
		// "requestStoreArticleDetail"));
		ModelAndView modelAndView = new ModelAndView("NearbyStoreSearch");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
		// return new ModelAndView("NearbyStoreSearch");
	}

	@RequestMapping(value = "/autocomplete.htm", method = RequestMethod.GET)
	public ModelAndView autocomplete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		// //System.out.println("autocomplete" );
		// String vendordesc=(String) request.getParameter("vendorDesc");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		String vendorName = (String) request.getParameter("vendorName");

		String srcOfSupp = (String) request.getParameter("sourceSupply");
		// //System.out.println("srcOfSupp"+srcOfSupp);
		// //System.out.println("vendorNo"+vendorNo);
		// //System.out.println("vendorName"+vendorName);
		ArrayList<Vendor> supplierList;
		ArrayList<WareHouse> supplierList1;

		try {
			if ("1".equalsIgnoreCase(srcOfSupp)
					|| "vendor".equalsIgnoreCase(srcOfSupp)) {

				supplierList = articleService.getVendorList(vendorName,
						maxRows, vendorNo, siteNo,user);
				if (supplierList != null && supplierList.size() > 0)
					model.addAttribute("vendorList", supplierList);
				else
					model.addAttribute("vendorList", new ArrayList<Vendor>());

				modelAndView = new ModelAndView("VendorLookup");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

			else if ("2".equalsIgnoreCase(srcOfSupp)
					|| "warehouse".equalsIgnoreCase(srcOfSupp)) {

				supplierList1 = articleService.getWareHouseList(vendorName,
						maxRows, vendorNo,user);
				if (supplierList1 != null && supplierList1.size() > 0)
					model.addAttribute("vendorList", supplierList1);
				else
					model.addAttribute("vendorList", new ArrayList<WareHouse>());

				modelAndView = new ModelAndView("wareHouseLookup");
				model.addAttribute("vendorList", supplierList1);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

		} catch (Exception e) {
			e.printStackTrace();

			if ("1".equalsIgnoreCase(srcOfSupp)) {
				supplierList = new ArrayList<Vendor>();
				modelAndView = new ModelAndView("VendorLookup");
				model.addAttribute("vendorList", supplierList);

			} else {
				supplierList1 = new ArrayList<WareHouse>();
				modelAndView = new ModelAndView("wareHouseLookup");
				model.addAttribute("vendorList", supplierList1);

			}
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
		return modelAndView;

	}

	void isSohGreaterThanZero(ArticleSearchResults articleSearchResults) {
		double sohVal = Double
				.parseDouble(articleSearchResults.getSOH().trim());
		if (sohVal > 0) {
			articleSearchResults.setIsSohGreaterThanZero("true");
		}
	}

	/***** new method for request search ****/
	@RequestMapping(value = "/requestSearch.htm", method = RequestMethod.POST)
	public ModelAndView requestSearch(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}

		String option = request.getParameter("searchByOptions");
		String value = request.getParameter("value");

		String suppName = request.getParameter("suppName");

		String suppNo = request.getParameter("suppNo");

		String srcOfSuppliy = request.getParameter("sourceSupply");

		String rangeFlag = request.getParameter("ranged");

		param.setCategoryNo(request.getParameter("hierarchySearchValue"));

		param.setSupplier(request.getParameter("supplier"));

		ModelAndView modelAndView = null;

		if ((option == null || option.trim().length() == 0)
				&& (value == null || value.trim().length() == 0)
				// && (suppName == null || suppName.trim().length() == 0)
				&& (suppNo == null || suppNo.trim().length() == 0)
				&& (param.getCategoryNo() == null || param.getCategoryNo()
						.trim().length() == 0)) {
			modelAndView = new ModelAndView("articleSearch", "param", param);
			model.addAttribute("noData", "Please enter Value to Search.");
			model.addAttribute("param", param);
			modelAndView.addObject("model", model);

			modelAndView.addAllObjects(model);
			return modelAndView;
		}
		param.setValue(value);
		param.setOption(option);

		param.setValues(option, value);

		param.setSiteNo(request.getParameter("siteNo"));
		param.setSalesOrg(request.getParameter("salesOrg"));

		if (rangeFlag == null) {
			param.setRangeFlag("N");
		} else {
			param.setRangeFlag("Y");
		}

		String pageNumber = request.getParameter("pageNumber");

		// system.err.println(pageNumber + "pageNumber");

		/*
		 * if (pageNumber != null && pageNumber.trim().length() > 0) {
		 * param.setPageNumber(Integer.parseInt(pageNumber) > 0 ? Integer
		 * .parseInt(pageNumber) : 1); } else { param.setPageNumber(1); }
		 */

		param.setPageNumber(1);

		param.setSuppNo(suppNo);

		param.setSuppName(suppName);

		param.setSrcOfSuppliy(srcOfSuppliy);

		param.setHierarchyText(request.getParameter("hierarchyText"));

		// set ranged flag
		if (param.getRangeFlag() != null
				&& param.getRangeFlag().equalsIgnoreCase("Y")) {
			param.setRangedChk(true);
			param.setRangeFlag("Y");
		} else {
			param.setRangedChk(false);
			param.setRangeFlag("N");
		}
		// //System.out.println(" ranged flag--->" + param.getRangeFlag());

		model.addAttribute("noData", "");
		model.addAttribute("articleSearchResutlsList",
				new ArrayList<ArticleSearchResults>());
		// set pagination check
		if ((param.getArticleName() != null && param.getArticleName().trim()
				.length() > 0)
				|| (param.getSuppNo() != null && param.getSuppNo().trim()
						.length() > 0)
				|| (param.getCategoryNo() != null && param.getCategoryNo()
						.trim().length() > 0)) {
			param.setPaginationCheck(true);
		} else {
			param.setPaginationCheck(false);
		}

		ArrayList<Vendor> supplierList;
		String maxRows = "0";
		boolean validSupplier = false;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			if (srcOfSuppliy != null && srcOfSuppliy.trim().length() > 0
					&& srcOfSuppliy.equalsIgnoreCase("1")) {
				try {

					supplierList = articleService.getVendorList(suppName,
							maxRows, suppNo, param.getSiteNo(),user);
					if (supplierList != null && supplierList.size() > 0) {
						for (int i = 0; i < supplierList.size(); i++) {
							if (supplierList.get(i).getSupplierNo()
									.equalsIgnoreCase(suppNo)) {
								validSupplier = true;
								param.setSuppName(supplierList.get(i)
										.getSupplierName());

							}
						}
						if (validSupplier) {

						} else {
							model.addAttribute("noData",
									"Please enter a valid vendor");
							model.addAttribute("articleSearchResutls",
									new ArticleSearchResults());
							modelAndView = new ModelAndView("articleSearch",
									"param", param);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return populateDropDown(modelAndView, request);
						}
					} else {

						model.addAttribute("noData",
								"Please enter a valid vendor");
						model.addAttribute("articleSearchResutls",
								new ArticleSearchResults());
						modelAndView = new ModelAndView("articleSearch",
								"param", param);
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return populateDropDown(modelAndView, request);
					}

				} catch (Exception e) {

					e.printStackTrace();

					if (null != e.getMessage()
							&& e.getMessage().indexOf("401") != -1)

						model.addAttribute("noData",
								"Please enter a valid vendor");
					else
						model.addAttribute("noData",
								"Please enter a valid vendor");
					model.addAttribute("articleSearchResutls",
							new ArticleSearchResults());
					modelAndView = new ModelAndView("articleSearch", "param",
							param);
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return populateDropDown(modelAndView, request);

				}
				
			} else if (srcOfSuppliy != null && srcOfSuppliy.trim().length() > 0
					&& srcOfSuppliy.equalsIgnoreCase("2")) {
				ArrayList<WareHouse> supplierList1;
				boolean validWarehouse = false;
				try {

					supplierList1 = articleService.getWareHouseList(suppNo,
							maxRows, suppNo,user);
					if (supplierList1 != null && supplierList1.size() > 0) {
						for (int i = 0; i < supplierList1.size(); i++) {
							if (supplierList1.get(i).getSupplierNo()
									.equalsIgnoreCase(suppNo)) {
								validWarehouse = true;
								param.setSuppName(supplierList1.get(i)
										.getSupplierName());

							}
						}
						if (validWarehouse) {

						} else {
							model.addAttribute("noData",
									"Please enter a valid warehouse");
							model.addAttribute("articleSearchResutls",
									new ArticleSearchResults());
							modelAndView = new ModelAndView("articleSearch",
									"param", param);
							modelAndView.addObject("model", model);
							modelAndView.addAllObjects(model);
							return populateDropDown(modelAndView, request);
						}
					} else {

						model.addAttribute("noData",
								"Please enter a valid warehouse");
						model.addAttribute("articleSearchResutls",
								new ArticleSearchResults());
						modelAndView = new ModelAndView("articleSearch",
								"param", param);
						modelAndView.addObject("model", model);
						modelAndView.addAllObjects(model);
						return populateDropDown(modelAndView, request);
					}

				} catch (Exception e) {

					e.printStackTrace();

					if (null != e.getMessage()
							&& e.getMessage().indexOf("401") != -1)

						model.addAttribute("noData",
								"Please enter a valid warehouse");
					else
						model.addAttribute("noData",
								"Please enter a valid warehouse");
					model.addAttribute("articleSearchResutls",
							new ArticleSearchResults());
					modelAndView = new ModelAndView("articleSearch", "param",
							param);
					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);
					return populateDropDown(modelAndView, request);

				}
			}

			model.addAttribute("param", param);
			// service call
			articleSearchResults = articleService.getArticleDetails(param,user);
			if (articleSearchResults != null && articleSearchResults.size() > 0) {
				if (articleSearchResults.size() == 1) {

					return requestArticleDetail(request, response);

				} else if (articleSearchResults.size() > 1) {
					modelAndView = new ModelAndView("articleSearch", "param",
							param);

					for (int i = 0; i < articleSearchResults.size(); i++) {
						if (!articleSearchResults.get(i).getBaseUom()
								.equalsIgnoreCase("kg")) {
							Double temp = Double
									.parseDouble(articleSearchResults.get(i)
											.getSOH().trim());
							temp = temp / 1;
							int soh = temp.intValue();

							articleSearchResults.get(i).setSOH(
									String.valueOf(soh));
						}
					}

					model.addAttribute("articleSearchResutlsList",
							articleSearchResults);
					if (articleSearchResults.get(0).getMsg().trim().length() > 0
							&& articleSearchResults.get(0).getMsg() != null)
						param.setRecordCount(Integer
								.parseInt(articleSearchResults.get(0).getMsg()));

					modelAndView.addObject("model", model);
					modelAndView.addAllObjects(model);

					// setting data for display types list---- instore
					UserContext userDetail = ((UserContext) request
							.getSession().getAttribute("user"));

					try {
						if (userDetail.getImgLocation()
								.equalsIgnoreCase("bigw")) {
							ArrayList<inStorePromotionDisplayType> displayList = new ArrayList<inStorePromotionDisplayType>();
							// ArrayList<inStorePromotionDisplayType>
							// displayList =
							// inStorePromoService.getDisplayTypeList(userDetail.getSiteNo());
							modelAndView.addObject("displaylist", displayList);
							modelAndView.addObject("isbigw", true);
						} else {
							modelAndView
									.addObject(
											"displaylist",
											new ArrayList<inStorePromotionDisplayType>());
							modelAndView.addObject("isbigw", false);
						}
						modelAndView.addObject("banner",
								userDetail.getImgLocation());
					} catch (Exception e) {
					}

					try {
						CompetitorDtlList competitorList = inStorePromoService
								.getCompetitorList(new CompetitorDtlList(
										userDetail.getUserId(), userDetail
												.getSapPwd(), userDetail
												.getSiteNo()),user);
						
						modelAndView.addObject("competitorList",
								competitorList.getResult());
					} catch (Exception e) {
						e.printStackTrace();
						System.out
								.println("Exception on load of competitorList");
					}

					// end
					return populateDropDown(modelAndView, request);
				}
			} else {
				modelAndView = new ModelAndView("articleSearch", "param", param);
				model.addAttribute("articleSearchResutls",
						new ArticleSearchResults());
				model.addAttribute("noData",
						"Sorry no results returned for your search criteria. Please try again");
				model.addAttribute("isSellPrice", false);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return populateDropDown(modelAndView, request);

			}

		} catch (Exception e) {

			e.printStackTrace();

			if (null != e.getMessage() && e.getMessage().indexOf("401") != -1)

				model.addAttribute("noData", "Sorry, not authorised to Lookup");
			else

				model.addAttribute("noData",
						"Sorry no results returned for your search criteria. Please try again");
			model.addAttribute("articleSearchResutls",
					new ArticleSearchResults());
			modelAndView = new ModelAndView("articleSearch", "param", param);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return populateDropDown(modelAndView, request);

		}
		return populateDropDown(modelAndView, request);
	}

	/*@RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		 Map<String, String> options = optionDAO.find(selectedValue); 

		List<Department> categoryInfoList = new ArrayList<Department>();
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		String prod_no = request.getParameter("iv_parent_node");
		categoryInfoList = (ArrayList<Department>) articleService
				.getDeptDetail(prod_no, ((UserContext) request.getSession()
						.getAttribute("user")).getSalesOrg(),user);

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

	}*/

	/*@RequestMapping(value = "/fetchSubCategoryDetails.htm", method = RequestMethod.GET)
	public void fetchSubCategoryDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Department> subCategoryInfoList = null;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			String prod_no = request.getParameter("iv_parent_node");
			subCategoryInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),user);
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
*/
	/*@RequestMapping(value = "/fetchSegmentDetails.htm", method = RequestMethod.GET)
	public void fetchSegmentDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<Department> segmentInfoList = null;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			String prod_no = request.getParameter("iv_parent_node");
			segmentInfoList = (ArrayList<Department>) articleService
					.getDeptDetail(prod_no, ((UserContext) request.getSession()
							.getAttribute("user")).getSalesOrg(),user);

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

	}*/

	@RequestMapping(value = "/requestSearchForPagination.htm", method = RequestMethod.POST)
	public ModelAndView requestSearchForPagination(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		String pageNumber = request.getParameter("pageNumber");

		// system.err.println(pageNumber + "pageNumber");

		ModelAndView modelAndView = null;

		if (pageNumber != null && pageNumber.trim().length() > 0) {
			param.setPageNumber(Integer.parseInt(pageNumber) > 0 ? Integer
					.parseInt(pageNumber) : 1);
		} else {
			param.setPageNumber(1);
		}

		model.addAttribute("noData", "");
		model.addAttribute("articleSearchResutlsList",
				new ArrayList<ArticleSearchResults>());
		param.setPaginationCheck(true);

		try {

			articleSearchResults = articleService.getArticleDetails(param,user);
			model.addAttribute("param", param);
			if (articleSearchResults != null && articleSearchResults.size() > 0) {
				/*
				 * if (articleSearchResults.size() == 1) {
				 * 
				 * return requestArticleDetail(request, response);
				 * 
				 * } else if (articleSearchResults != null &&
				 * articleSearchResults.size() > 0) {
				 */
				modelAndView = new ModelAndView("articleSearch", "param", param);

				for (int i = 0; i < articleSearchResults.size(); i++) {
					if (!articleSearchResults.get(i).getBaseUom()
							.equalsIgnoreCase("kg")) {
						Double temp = Double.parseDouble(articleSearchResults
								.get(i).getSOH().trim());
						temp = temp / 1;
						int soh = temp.intValue();

						articleSearchResults.get(i).setSOH(String.valueOf(soh));
					}
				}
				model.addAttribute("articleSearchResutlsList",
						articleSearchResults);
				if (articleSearchResults.get(0).getMsg().trim().length() > 0
						&& articleSearchResults.get(0).getMsg() != null)
					param.setRecordCount(Integer.parseInt(articleSearchResults
							.get(0).getMsg()));

				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);

				return modelAndView;
				// }
			} else {
				modelAndView = new ModelAndView("articleSearch", "param", param);
				model.addAttribute("articleSearchResutls",
						new ArticleSearchResults());
				model.addAttribute("noData", "No Data found");
				model.addAttribute("isSellPrice", false);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

		} catch (Exception e) {

			e.printStackTrace();
			model.addAttribute("noData", "No Data Found");
			model.addAttribute("articleSearchResutls",
					new ArticleSearchResults());
			modelAndView = new ModelAndView("articleSearch", "param", param);
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;

		}
		// return modelAndView;
	}

	public void getReasonCodeForSoh(UserContext user) {
		
		try {

			String source = "A";
			mvmtTypeList = sohAdjustLogServiceImpl.getMvmtTypeList(source,user);

			model.addAttribute("mvmtTypeList", mvmtTypeList);
			for (int i = 0; i < mvmtTypeList.size(); i++) {
				// //System.out.println("deptInfoList " + i + " --->" +
				// mvmtTypeList.get(i).getMvmtTypeDesc());
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("mvmtTypeList", new ArrayList<MovementType>());
		}

	}

	/********************* SALES HISTORY ********************************/

	@RequestMapping(value = "/getSalesHistory.htm", method = RequestMethod.GET)
	public ModelAndView getSalesHistory(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("salesHistory");
		String articleNo = (String) request.getParameter("articleNo");
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();

		ArrayList<SalesHistory> SalesHistoryList = null;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {

			SalesHistoryList = (ArrayList<SalesHistory>) articleService
					.getSalesHistoryList(articleNo, siteNo,user);

			if (SalesHistoryList != null && SalesHistoryList.size() > 0) {
				model.addAttribute("salesHistoryList", SalesHistoryList);
			} else {
				model.addAttribute("salesHistoryList",
						new ArrayList<SalesHistory>());
			}
		} catch (Exception e) {

			model.addAttribute("salesHistoryList",
					new ArrayList<SalesHistory>());

		}
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	private ModelAndView populateDropDown(ModelAndView modelAndView,
			HttpServletRequest request) {
		// setting data for display types list---- instore
		UserContext userDetail = ((UserContext) request.getSession()
				.getAttribute("user"));

		try {
			if (userDetail.getImgLocation().equalsIgnoreCase("bigw")) {
				ArrayList<inStorePromotionDisplayType> displayList = new ArrayList<inStorePromotionDisplayType>();
				// ArrayList<inStorePromotionDisplayType> displayList =
				// inStorePromoService.getDisplayTypeList(userDetail.getSiteNo());
				modelAndView.addObject("displaylist", displayList);
				modelAndView.addObject("isbigw", true);
			} else {
				modelAndView.addObject("displaylist",
						new ArrayList<inStorePromotionDisplayType>());
				modelAndView.addObject("isbigw", false);
			}
			modelAndView.addObject("banner", userDetail.getImgLocation());
		} catch (Exception e) {
		}

		try {
			CompetitorDtlList competitorList = inStorePromoService
					.getCompetitorList(new CompetitorDtlList(userDetail
							.getUserId(), userDetail.getSapPwd(), userDetail
							.getSiteNo()),userDetail);
			
			modelAndView
					.addObject("competitorList", competitorList.getResult());
		} catch (Exception e) {
			e.printStackTrace();
		}
		return modelAndView;

		// end
	}
}