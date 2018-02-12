package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.io.UnsupportedEncodingException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import au.com.woolworths.portal.model.AllocationOrderSearchDtl;
import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.InstorePromotionModel;
import au.com.woolworths.portal.model.PromSearchResult;
import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromoAuditTrail;
import au.com.woolworths.portal.model.PromoDisplayType;
import au.com.woolworths.portal.model.PromoSales;
import au.com.woolworths.portal.model.PromoSearchResultMetadata;
import au.com.woolworths.portal.model.PromotionsWeekDropdown;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.param.InStorePromoParam;
import au.com.woolworths.portal.param.PromotionsAuditTrailParam;
import au.com.woolworths.portal.param.PromotionsPlanningParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.AllocationSearchServiceImpl;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.InStorePromoServiceImpl;
import au.com.woolworths.portal.service.LoginServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.PromotionsPlanningServiceImpl;
import au.com.woolworths.portal.service.SearchArticleServiceImpl;
import au.com.woolworths.portal.service.ValidationServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/promoPlanning")
@Scope("session")
public class PromotionsPlanningController extends BaseController {

	private List<ArticleDetail> articleSearchResutlsList = null;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['PromotionPlanning']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private SearchArticleServiceImpl SearchArticleService;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private PromotionsPlanningServiceImpl promotionsPlanningService;

	@Autowired
	private AllocationSearchServiceImpl allocationService;

	@Autowired
	private InStorePromoServiceImpl inStorePromoService;
	
	@Autowired
	private ValidationServiceImpl validationServiceImpl;

	private ModelMap model;

	private UserContext userDetail;

	private List<PromoSales> promoSalesHistoryListMap;
	private Map<String, List<PromoDisplayType>> promoDisplayMap = null;

	private PromotionsAuditTrailParam paramForPagination;

	private PromotionsPlanningParam paramToGetArticles;

	private String COUNT;
	private String AUTO_FCT_FLAG;
	private String LOCK_FLAG;

	private static final Logger LOGGER = Logger.getLogger(PromotionsPlanningController.class.getName());

	private Map<String, List<PromoSearchResultMetadata>> promSearchResultMetadata = new LinkedHashMap<String, List<PromoSearchResultMetadata>>();

	private Map<String, List<String>> articleListMap = new LinkedHashMap<String, List<String>>();

	private List<PromoArticle> promoArticleList = new ArrayList<PromoArticle>();

	@RequestMapping(value = "/onPageLoad.htm")
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("inside onPageLoad of Promotion planning.." + "Logging out as session is :--- "+ request.getSession());
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
		promoDisplayMap = new LinkedHashMap<String, List<PromoDisplayType>>();
		List<Department> deptInfoList = new ArrayList<Department>();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		SimpleDateFormat formDate = new SimpleDateFormat("dd/MM/yyyy");
		String strDate = formDate.format(new Date()); // set today date if RC DB down
		//setReplenishmentDate
		try {
			//System.out.println("b4 serv hit");
			
			userDetail.setReplenishmentDate(validationServiceImpl.getReplenishmentDate(user).replaceAll("\"", ""));
			//System.out.println("userDetail.getReplenishmentDate()="+userDetail.getReplenishmentDate());
			request.setAttribute("user", userDetail);
			//System.out.println("aftr serv hit");
		} catch (UnsupportedEncodingException e1) {
			// TODO Auto-generated catch block
			e1.printStackTrace();
		}
		catch (Exception e) {
			// TODO Auto-generated catch block
			userDetail.setReplenishmentDate(strDate);// set today date if RC DB down
		}
		setPromotionWeekDropdown(userDetail.getSalesOrg());
		// calling service to load department
		try {
			String prod_no = "ALL DEPARTMENTS";

			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		
		if("1060".equalsIgnoreCase(""+userDetail.getSalesOrg())){
			try {
				model.addAttribute("restrictionParam",validationServiceImpl.getRestrictionParam(user));
			} catch (UnsupportedEncodingException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		
		
		/*
		 * // calling service to load display types try { promoDisplayMap =
		 * promotionsPlanningService .getDisplayTypes(userDetail.getSiteNo(),
		 * userDetail .getSalesOrg().toString()); if (promoDisplayMap != null &&
		 * promoDisplayMap.size() > 0) model.addAttribute( "promoDisplayList",
		 * (promoDisplayMap.get(Constants.currentWeek) != null) ?
		 * promoDisplayMap .get(Constants.currentWeek) : new
		 * ArrayList<PromoDisplayType>()); else
		 * model.addAttribute("promoDisplayList", new
		 * ArrayList<PromoDisplayType>()); } catch (Exception e) {
		 * e.printStackTrace(); model.addAttribute("promoDisplayList", new
		 * ArrayList<PromoDisplayType>()); }
		 */
		ModelAndView modelAndView = new ModelAndView("promotionsPlanning");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/onPageLoad.htm")
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();
		promoDisplayMap = new LinkedHashMap<String, List<PromoDisplayType>>();
		List<Department> deptInfoList = new ArrayList<Department>();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		setPromotionWeekDropdown(userDetail.getSalesOrg());
		// calling service to load department
		try {
			String prod_no = "ALL DEPARTMENTS";
			ArrayList <String> deptStr1005=new ArrayList<String>();
			ArrayList <String> deptStr1030=new ArrayList<String>();
			
			deptStr1030.add("45,BAKEHOUSE");
			deptStr1030.add("27,CIGARETTES");
			deptStr1030.add("28,FRONT OF STORE");
			deptStr1030.add("15,GENERAL MERCHANDISE");
			deptStr1030.add("05,GROCERY");
			deptStr1030.add("20,LIQUOR");
			deptStr1030.add("25,MEAT");
			deptStr1030.add("00,NON TRADING");
			deptStr1030.add("10,PERISHABLES");
			deptStr1030.add("30,PRODUCE");
			deptStr1030.add("47,PROPRIETARY BAKERY");
			deptStr1030.add("55,SEAFOOD");
			deptStr1030.add("40,SERVICED DELICATESSEN");
			
			
			
			
			
			deptStr1005.add("45,BAKEHOUSE");
			deptStr1005.add("27,CIGARETTES");
			deptStr1005.add("28,FRONT OF STORE");
			deptStr1005.add("15,GENERAL MERCHANDISE");
			deptStr1005.add("05,GROCERY");
			deptStr1005.add("20,LIQUOR");
			deptStr1005.add("25,MEAT");
			deptStr1005.add("00,NON TRADING");
			deptStr1005.add("10,PERISHABLES");
			deptStr1005.add("30,PRODUCE");
			deptStr1005.add("47,PROPRIETARY BAKERY");
			deptStr1005.add("55,SEAFOOD");
			deptStr1005.add("40,SERVICED DELICATESSEN");
			deptStr1005.add("56,TEST");
			deptStr1005.add("49,TEST1");
			deptStr1005.add("31,UAT");
			
			
ArrayList <String> deptStr2010=new ArrayList<String>();
			
deptStr2010.add("45,BAKEHOUSE");
deptStr2010.add("27,CIGARETTES");
deptStr2010.add("28,FRONT OF STORE");
deptStr2010.add("15,GENERAL MERCHANDISE");
deptStr2010.add("05,GROCERY");
deptStr2010.add("20,LIQUOR");
deptStr2010.add("25,MEAT");
deptStr2010.add("00,NON TRADING");
deptStr2010.add("10,PERISHABLES");
deptStr2010.add("29,PHARMACY");
			
deptStr2010.add("30,PRODUCE");
deptStr2010.add("47,PROPRIETARY BAKERY");
deptStr2010.add("55,SEAFOOD");
deptStr2010.add("40,SERVICED DELICATESSEN");
deptStr2010.add("19,UAT RETEST");

ArrayList <String> deptStr1015=new ArrayList<String>();//DAN 1015
ArrayList <String> deptStr1010=new ArrayList<String>();//

deptStr1015.add("20,LIQUOR");
deptStr1015.add("00,NON TRADING");

deptStr1010.add("20,LIQUOR");

ArrayList <String> deptStr1060=new ArrayList<String>();//

deptStr1060.add("9859,95");
deptStr1060.add("9899,ASSOCIATED SELLING");
deptStr1060.add("9800,B");
deptStr1060.add("9810,CHILDRENSWEAR");
deptStr1060.add("9809,DEFAULT DIVISION");
deptStr1060.add("9808,DEFAULT DIVISION");
deptStr1060.add("9877,DEFAULT DIVISION");
deptStr1060.add("9570,ENTERTAINMENT");
deptStr1060.add("9530,EVERYDAY NEEDS");
deptStr1060.add("9897,FAMILY FOOTWEAR");
deptStr1060.add("9820,FOOTWEAR");
deptStr1060.add("9502,GENERAL MERCHANDIS");
deptStr1060.add("9501,GENERAL MERCHANDISE");
deptStr1060.add("9895,HARDGOODS");
deptStr1060.add("9890,HOME");
deptStr1060.add("9580,LEISURE");
deptStr1060.add("9840,MENSWEAR");
deptStr1060.add("9595,NON TRADE DIV");
deptStr1060.add("9594,NON TRADE DIV");
deptStr1060.add("9560,OFFICE");
deptStr1060.add("9587,OPTICAL");

deptStr1060.add("9896,SNACKBAR");
deptStr1060.add("9898,SOFTGOODS");
deptStr1060.add("9550,TOYS/SPORTING");
deptStr1060.add("9845,UNDERWEAR/SLEEP/HS");
deptStr1060.add("9815,WOMENSWEAR");






		
			Department temp=null;
			if(((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg()==1005 ){
					for (int i=0;i<16 ;i++){
						 temp= new Department();
						temp.setChildExists(false);
						temp.setDateFrom("11.08.2012");
						temp.setDateTo("11.08.9999");
						temp.setTreeLevel("02");
						temp.setHierId("W1");
						temp.setLevel(1);
						temp.setLevelCount(0);
						//temp.setNode("45");
						//temp.setNodeDesc("BAKEHOUSE");
						temp.setParent("ALL DEPARTMENTS");
						temp.setParentId(0);
						temp.setNode(deptStr1005.get(i).split(",")[0]);
						temp.setNodeDesc(deptStr1005.get(i).split(",")[1]);
						deptInfoList.add(temp);
					}
			}
			if(((UserContext) request
					.getSession().getAttribute("user")).getSalesOrg()==1060 ){
			for (int i=0;i<16 ;i++){
				 temp= new Department();
				temp.setChildExists(false);
				temp.setDateFrom("11.08.2012");
				temp.setDateTo("11.08.9999");
				temp.setTreeLevel("02");
				temp.setHierId("W1");
				temp.setLevel(1);
				temp.setLevelCount(0);
				//temp.setNode("45");
				//temp.setNodeDesc("BAKEHOUSE");
				temp.setParent("ALL DEPARTMENTS");
				temp.setParentId(0);
				temp.setNode(deptStr1060.get(i).split(",")[0]);
				temp.setNodeDesc(deptStr1060.get(i).split(",")[1]);
				deptInfoList.add(temp);
			}
	}
			if(((UserContext) request
					.getSession().getAttribute("user")).getSalesOrg()==1030 ){
			for (int i=0;i<16 ;i++){
				 temp= new Department();
				temp.setChildExists(false);
				temp.setDateFrom("11.08.2012");
				temp.setDateTo("11.08.9999");
				temp.setTreeLevel("02");
				temp.setHierId("W1");
				temp.setLevel(1);
				temp.setLevelCount(0);
				//temp.setNode("45");
				//temp.setNodeDesc("BAKEHOUSE");
				temp.setParent("ALL DEPARTMENTS");
				temp.setParentId(0);
				temp.setNode(deptStr1030.get(i).split(",")[0]);
				temp.setNodeDesc(deptStr1030.get(i).split(",")[1]);
				deptInfoList.add(temp);
			}
	}
			if( ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg()==2010 ){
					for (int i=0;i<15 ;i++){
						 temp= new Department();
						temp.setChildExists(false);
						temp.setDateFrom("11.08.2012");
						temp.setDateTo("11.08.9999");
						temp.setTreeLevel("02");
						temp.setHierId("W1");
						temp.setLevel(1);
						temp.setLevelCount(0);
						//temp.setNode("45");
					//	temp.setNodeDesc("BAKEHOUSE");
						temp.setParent("ALL DEPARTMENTS");
						temp.setParentId(0);
						temp.setNode(deptStr2010.get(i).split(",")[0]);
						temp.setNodeDesc(deptStr2010.get(i).split(",")[1]);
						deptInfoList.add(temp);
					}
			}
	
			if( ((UserContext) request
					.getSession().getAttribute("user")).getSalesOrg()==1015 ){
			for (int i=0;i<15 ;i++){
				 temp= new Department();
				temp.setChildExists(false);
				temp.setDateFrom("11.08.2012");
				temp.setDateTo("11.08.9999");
				temp.setTreeLevel("02");
				temp.setHierId("W1");
				temp.setLevel(1);
				temp.setLevelCount(0);
				//temp.setNode("45");
			//	temp.setNodeDesc("BAKEHOUSE");
				temp.setParent("ALL DEPARTMENTS");
				temp.setParentId(0);
				temp.setNode(deptStr1015.get(i).split(",")[0]);
				temp.setNodeDesc(deptStr1015.get(i).split(",")[1]);
				deptInfoList.add(temp);
			}
	}

			
			if(((UserContext) request
					.getSession().getAttribute("user")).getSalesOrg()==1010 ){
	for (int i=0;i<1 ;i++){
		 temp= new Department();
		temp.setChildExists(false);
		temp.setDateFrom("11.08.2012");
		temp.setDateTo("11.08.9999");
		temp.setTreeLevel("02");
		temp.setHierId("W1");
		temp.setLevel(1);
		temp.setLevelCount(0);
		//temp.setNode("45");
		//temp.setNodeDesc("BAKEHOUSE");
		temp.setParent("ALL DEPARTMENTS");
		temp.setParentId(0);
		temp.setNode(deptStr1010.get(i).split(",")[0]);
		temp.setNodeDesc(deptStr1010.get(i).split(",")[1]);
		deptInfoList.add(temp);
	}
	}
			
			/*temp.setChildExists(false);
			temp.setDateFrom("11.08.2012");
			temp.setDateTo("11.08.9999");
			temp.setTreeLevel("02");
			temp.setHierId("W1");
			temp.setLevel(1);
			temp.setLevelCount(0);
			//temp.setNode("45");
			//temp.setNodeDesc("BAKEHOUSE");
			temp.setParent("ALL DEPARTMENTS");
			temp.setParentId(0);
			
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg());

			model.addAttribute("deptInfoList", deptInfoList);
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		
		/* * // calling service to load display types try { promoDisplayMap =
		 * promotionsPlanningService .getDisplayTypes(userDetail.getSiteNo(),
		 * userDetail .getSalesOrg().toString()); if (promoDisplayMap != null &&
		 * promoDisplayMap.size() > 0) model.addAttribute( "promoDisplayList",
		 * (promoDisplayMap.get(Constants.currentWeek) != null) ?
		 * promoDisplayMap .get(Constants.currentWeek) : new
		 * ArrayList<PromoDisplayType>()); else
		 * model.addAttribute("promoDisplayList", new
		 * ArrayList<PromoDisplayType>()); } catch (Exception e) {
		 * e.printStackTrace(); model.addAttribute("promoDisplayList", new
		 * ArrayList<PromoDisplayType>()); }
		 
		ModelAndView modelAndView = new ModelAndView("promotionsPlanning");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}*/
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

	@RequestMapping(value = "/autocomplete.htm", method = RequestMethod.GET)
	public ModelAndView autocomplete(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		String vendorName = (String) request.getParameter("vendorName");

		String srcOfSupp = (String) request.getParameter("sourceSupply");
		ArrayList<Vendor> supplierList;
		ArrayList<WareHouse> supplierList1;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
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
			LOGGER.error(Constants.EXCEPTION, e);

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

	@RequestMapping(value = "/loadArticles.htm", method = RequestMethod.POST)
	public ModelAndView loadArticles(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("inside loadArticles of Promotion planning.." + "Logging out as session is :--- "+ request.getSession());
			return new ModelAndView(new RedirectView("../../"));
		}
		ModelAndView modelAndView = new ModelAndView("promotionsPopupContent");
		List<ArticleDetail> articleDetail = null;

		// checking whether add to list button is clicked on description search
		if (param.getSelectedArticles() != null
				&& param.getSelectedArticles().trim() != "") {
			if (articleSearchResutlsList != null
					&& articleSearchResutlsList.size() > 0) {
				articleDetail = new ArrayList<ArticleDetail>();
				try {
					for (int i = 0; i < param.getSelectedArticles().split(":").length; i++) {
						articleDetail.add(articleSearchResutlsList.get(Integer
								.parseInt(param.getSelectedArticles()
										.split(":")[i])));
					}
					param.setPromoArticleInfoList(articleDetail);
				} catch (Exception e) {
					e.printStackTrace();
					articleDetail = new ArrayList<ArticleDetail>();
				}
			}
		}

		// checking whether the article search is called
		else if (param.getArticleNo() != null
				&& param.getArticleNo().trim().length() > 0) {
			ArticleSearchParam articleSearchParam = new ArticleSearchParam(
					userDetail.getSiteNo(),
					userDetail.getSalesOrg().toString(),
					param.getSearchByOptions(), param.getArticleNo());

			// calling article search service
			articleSearchResutlsList = callArticleService(articleSearchParam);

			if (articleSearchResutlsList != null) {
				if (articleSearchParam.getMsg() != null
						&& articleSearchParam.getMsg().trim().length() > 0) {
					param.setOption(Constants.NO_DATA);
					modelAndView = new ModelAndView("promotionsPopupContent");
					
					return returnToPage(modelAndView, param);
				} else if (articleSearchResutlsList.size() == 1) {
					param.setOption(Constants.SINGLE_RESULT);
					articleDetail = new ArrayList<ArticleDetail>();
					articleDetail.add(articleSearchResutlsList.get(0));
					param.setPromoArticleInfoList(articleDetail);

				} else if (articleSearchResutlsList.size() > 1) {
					param.setOption(Constants.MULTIPLE_RESULT);
					model.addAttribute("articleSearchResutlsList",
							articleSearchResutlsList);
					modelAndView = new ModelAndView("promotionsPopupContent");
					
					return returnToPage(modelAndView, param);
				}

			} else {
				param.setOption(Constants.NO_DATA);
				modelAndView = new ModelAndView("promotionsPopupContent");
			
				return returnToPage(modelAndView, param);
			}

		}

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
		param.setPageNoChange("1");
		param.setRecordCount(Constants.RECORD_COUNT);
		param.setCount("0");

		// checking whether need to call promotion service
		if (((articleDetail != null && articleDetail.size() > 0) || (param
				.getNodelvl() != null
				&& (param.getNodelvl().equalsIgnoreCase(Constants.SEG) || param
						.getNodelvl().equalsIgnoreCase(Constants.SUBCAT)) && (param
				.getSortByOptions().equalsIgnoreCase("category") || param
				.getSortByOptions().equalsIgnoreCase("media"))))) {

			if (getLockDetails(param)) {
				getPromoArticles(param);
				param.setOption(Constants.articleListJson);
				paramToGetArticles = param;
				String articleList = getPromoArticleDetails(param);
				model.addAttribute("articleList", articleList);
			} else {
				if (param.getMsg() == null || param.getMsg().equals("")) {
					param.setMsg(Constants.PROMO_LOCKED);
				}

			}
			if (param.getMsg() != null && param.getMsg().trim().length() > 0)
				param.setOption(param.getMsg());
			modelAndView = new ModelAndView("promotionsDetailsContent");
			/*Date dt2=new Date();
			LOGGER.info("Time for loadArticles : "+CommonUtils.timeDifference(dt1,dt2));
			System.out.println("Time for loadArticles = "+CommonUtils.timeDifference(dt1,dt2));*/
			return returnToPage(modelAndView, param);
		} /*
		 * else if ((((articleDetail != null && articleDetail.size() > 0) ||
		 * (param .getNodelvl() != null && (param.getNodelvl().equalsIgnoreCase(
		 * SEG) || param.getNodelvl().equalsIgnoreCase(SUBCAT))) &&
		 * (param.getSortByOptions().equalsIgnoreCase("media") // || param //
		 * .getSortByOptions().equalsIgnoreCase("display") ))) ||
		 * ((param.getNodelvl() != null && (param.getNodelvl()
		 * .equalsIgnoreCase(SEG) || param.getNodelvl()
		 * .equalsIgnoreCase(SUBCAT))) && param.getSortByOptions()
		 * .equalsIgnoreCase("category"))) { if (getLockDetails(param)) {
		 * callPromoServiceForHierarchy(param); } else { if (param.getMsg() ==
		 * null || param.getMsg().equals("")) { param.setMsg(PROMO_LOCKED); } }
		 * // String articleList=getPromoArticles(param); //
		 * //System.out.println("articleList " + articleList);
		 * param.setOption(articleHierarchy); //
		 * model.addAttribute("articleList",articleList); if (param.getMsg() !=
		 * null && param.getMsg().trim().length() > 0)
		 * param.setOption(param.getMsg()); modelAndView = new
		 * ModelAndView("promotionsDetailsContent"); return
		 * returnToPage(modelAndView, param); }
		 */else if (param.getNodeId() != null && param.getNodeId() != ""
				&& param.getNodelvl() != null && param.getNodelvl() != "") {
			param.setOption(Constants.PROMODETAIL);
			if (getLockDetails(param)) {
				callPromoServiceForHierarchy(param);
			} else {
				if (param.getMsg() == null || param.getMsg().equals("")) {
					param.setMsg(Constants.PROMO_LOCKED);
				}
			}
			if (param.getMsg() != null && param.getMsg().trim().length() > 0)
				param.setOption(param.getMsg());
			modelAndView = new ModelAndView("promotionsDetailsContent");
			/*Date dt2=new Date();
			LOGGER.info("Time for loadArticles : "+CommonUtils.timeDifference(dt1,dt2));
			System.out.println("Time for loadArticles = "+CommonUtils.timeDifference(dt1,dt2));*/
			return returnToPage(modelAndView, param);
		}
		/*Date dt2=new Date();
		LOGGER.info("Time for loadArticles : "+CommonUtils.timeDifference(dt1,dt2));
		System.out.println("Time for loadArticles = "+CommonUtils.timeDifference(dt1,dt2));*/
		return returnToPage(modelAndView, param);
	}

	private void callPromoServiceForHierarchy(PromotionsPlanningParam param) {
		paramToGetArticles = param;
		List<PromSearchResult> promSearchResultList = null;
		try {
			promSearchResultList = promotionsPlanningService
					.getPromotionHierarchyDtls(param,userDetail);
			model.addAttribute("promSearchResult",
					promSearchResultList != null ? promSearchResultList
							: new ArrayList<PromSearchResult>());

			if (promSearchResultList != null
					&& promSearchResultList.size() > 0
					&& promSearchResultList.get(0)
							.getPromoSearchResultMetadataMap() != null
					&& promSearchResultList.get(0)
							.getPromoSearchResultMetadataMap().size() > 0) {
				promSearchResultMetadata = promSearchResultList.get(0)
						.getPromoSearchResultMetadataMap();
				model.addAttribute("promSearchResultMetadata",
						promSearchResultList.get(0)
								.getPromoSearchResultMetadataMap());
			}
		} catch (Exception e) {
			e.printStackTrace();
			model.addAttribute("promSearchResult",
					promSearchResultList != null ? promSearchResultList
							: new ArrayList<PromSearchResult>());
			model.addAttribute(
					"promSearchResultMetadata",
					new LinkedHashMap<String, List<PromoSearchResultMetadata>>());
		}
	}

	@RequestMapping(value = "/getArticles.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getArticles(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
	//	Date dt1=new Date();

		List<PromoSearchResultMetadata> promoSearchResultMetadataList = null;
		PromoSearchResultMetadata promoSearchResultMetadata = null;

		if (promSearchResultMetadata != null
				&& promSearchResultMetadata.size() > 0) {
			if (param.getCateDesc() != null && param.getCateDesc().trim() != ""
					&& param.getNodeId() != null && param.getNodeId() != ""
					&& !param.getNodeId().equalsIgnoreCase("tabs")
					&& param.getIndex() != null
					&& param.getIndex().trim() != "") {
				promoSearchResultMetadataList = promSearchResultMetadata
						.get(param.getCateDesc());
				if (promoSearchResultMetadataList != null
						&& promoSearchResultMetadataList.size() > 0) {
					promoSearchResultMetadata = promoSearchResultMetadataList
							.get(Integer.parseInt(param.getIndex()));
				}
			} else if (param.getCateDesc() != null
					&& param.getCateDesc().trim() != ""
					&& param.getNodeId() != null && param.getNodeId() != ""
					&& param.getNodeId().equalsIgnoreCase("tabs")) {
				promoSearchResultMetadataList = promSearchResultMetadata
						.get(param.getCateDesc());
				if (promoSearchResultMetadataList != null
						&& promoSearchResultMetadataList.size() > 0) {
					promoSearchResultMetadata = promoSearchResultMetadataList
							.get(0);
				}
			}
		}

		if (paramToGetArticles != null) {
			paramToGetArticles
					.setPromoSearchResultMetadata(promoSearchResultMetadata);
			paramToGetArticles.setPageNoChange("1");
			paramToGetArticles.setPaginationFlag("Y");

		}
		getPromoArticles(paramToGetArticles);
		
		/*Date dt2=new Date();
		LOGGER.info("Time for getArticles : "+CommonUtils.timeDifference(dt1,dt2));
		System.out.println("Time for getArticles = "+CommonUtils.timeDifference(dt1,dt2));*/
		return getPromoArticleDetails(paramToGetArticles);

	}

	@RequestMapping(value = "/getPromoArticleDetails.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getPromoArticleDetails(PromotionsPlanningParam param) {

		ObjectMapper mapper = null;
		StringWriter stw = null;
		List<String> articlesList = null;
		//Date dt1=new Date();
		// List<PromoArticle> promoArticleList = null;
		// BELOW LINE CODE IS ADDED TO RESET THE GLOBAL VARIABLE,SO DONT REMOVE.
		promoArticleList = new ArrayList<PromoArticle>();
		try {
			if (articleListMap != null && articleListMap.size() > 0) {
				articlesList = articleListMap.get(param.getPageNoChange());

				// System.out.println("articlesList_" + articlesList.size());
				if (articlesList != null && articlesList.size() > 0) {
					paramToGetArticles.setArticleList(articlesList);
					paramToGetArticles.setPageNo(param.getPageNoChange());
					paramToGetArticles.setRecordCount(Constants.RECORD_COUNT);
					paramToGetArticles.setCount(COUNT);
					/*
					 * if (paramToGetArticles.getSortByOptions() != null &&
					 * paramToGetArticles
					 * .getSortByOptions().equalsIgnoreCase(Constants.DISPLAY)
					 * && paramToGetArticles.getPromoSearchResultMetadata() !=
					 * null &&
					 * paramToGetArticles.getPromoSearchResultMetadata().
					 * getFirstLevelType() != null &&
					 * paramToGetArticles.getPromoSearchResultMetadata
					 * ().getFirstLevelType()
					 * .equalsIgnoreCase(Constants.DISPLAY_LEVEL)){
					 * paramToGetArticles.setFixtureFlag("Y"); }else{
					 * paramToGetArticles.setFixtureFlag("N"); }
					 */
					// paramToGetArticles.setPromoSearchResultMetadata(null);
					paramToGetArticles.setLockFlag(LOCK_FLAG);
					paramToGetArticles.setAutoForeFlag(AUTO_FCT_FLAG);

				}
				promoArticleList = promotionsPlanningService
						.getPromotionArticleDetails(paramToGetArticles,userDetail);
				if (promoArticleList != null && promoArticleList.size() > 0) {
					promoArticleList.get(0).setAutoFrctFlag(AUTO_FCT_FLAG);
					promoArticleList.get(0).setLockFlag(LOCK_FLAG);
				}
				// updateAllocationFlag(promoArticleList);

			}
			mapper = new ObjectMapper();
			stw = new StringWriter();
			JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoArticleList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());
		/*Date dt2=new Date();
		LOGGER.info("Time for getPromoArticleDetails : "+CommonUtils.timeDifference(dt1,dt2));
		System.out.println("Time for getPromoArticleDetails = "+CommonUtils.timeDifference(dt1,dt2));*/
		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + param.getMsg()
				+ "\"}";
	}

	@RequestMapping(value = "/updatePromoArticles.htm", method = RequestMethod.POST)
	@ResponseBody
	public String updatePromoArticles(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		
		
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		UserContext user = (UserContext) request.getSession().getAttribute(
				"user");
		
		
		// List<PromoArticle> promoArticleList=null;
		int index;
		String details;
		String resultJson = "";
		try {
			if (promoArticleList != null
					&& promoArticleList.size() > 0
					&& param.getIndexListForUpdate() != null
					&& param.getIndexListForUpdate() != ""
					&& param.getIndexListForUpdate().split(",") != null
					&& param.getIndexListForUpdate().split(",").length > 0
					&& param.getIndexListForUpdate().split(",")[0] != null
					&& param.getIndexListForUpdate().split(",")[0] != ""
					&& param.getIndexListForUpdate().split(",")[0].split(":") != null
					&& param.getIndexListForUpdate().split(",")[0].split(":")[0] != "") {
				for (int i = 0; i < param.getIndexListForUpdate().split(",").length; i++) {
					// System.out.println("index" + i);
					index = Integer.parseInt(param.getIndexListForUpdate()
							.split(",")[i].split(":")[0]);
					details = param.getIndexListForUpdate().split(",")[i]
							.split(":")[1];
					
				//	System.out.println("Prom*Plan*cont="+user.getReplenishmentDate());
					
					if (paramToGetArticles != null)
						promoArticleList.get(index).setPromoWeek(
								paramToGetArticles.getPromotionWeek());
					promoArticleList.get(index).updateDetail(
							details.split("_")[2], details.split("_")[0],
							details.split("_")[1], details.split("_")[3], "Y",user.getReplenishmentDate());
					// System.out.println("getNewDisplayQty="+promoArticleList.get(index).getNewDisplayQty());
				}
				resultJson = callUpdateService(param, promoArticleList);

				/*
				 * for (int i = 0; i <
				 * param.getIndexListForUpdate().split(",").length; i++) { //
				 * System.out.println("index" + i); index =
				 * Integer.parseInt(param.getIndexListForUpdate().split(
				 * ",")[i].split(":")[0]); details =
				 * param.getIndexListForUpdate().split(",")[i] .split(":")[1];
				 * promoArticleList
				 * .get(index).updateDetail(details.split("_")[2],
				 * details.split("_")[0], details.split("_")[1],
				 * details.split("_")[3], "Y");
				 * promoArticleList.get(index).resetDetail();
				 * 
				 * }
				 */
			}
		} catch (Exception e) {
			//e.printStackTrace();
			LOGGER.info("Save&Next :  catch block: SC-updatePromoArticles.htm  #" +user.getUserId()+"#" +user.getSiteNo());
			LOGGER.info("Save&Next :  catch block: SC-updatePromoArticles.htm  #"+e);
			e.printStackTrace();
			
		}
		
		return resultJson;
	}

	private String callUpdateService(PromotionsPlanningParam param,
			List<PromoArticle> promoArticleListBUpdate) {

		List<PromSearchResult> promoArticleListAUpdate = null;
		ObjectMapper mapper = null;
		StringWriter stw = null;

		try {
			promoArticleListAUpdate = promotionsPlanningService
					.updatePromoArticles(
							(ArrayList<PromoArticle>) promoArticleListBUpdate,
							param,userDetail);
			
		//	LOGGER.info("Save&Next :  after db hit & before updateArticleList SC-callUpdateService ");
			updateArticleList(param, promoArticleListAUpdate.get(0)
					.getPromArticleList());
		//	LOGGER.info("Save&Next :  after db hit & after updateArticleList SC-callUpdateService ");
		} catch (Exception e) {
		//	e.printStackTrace();
			LOGGER.info("Save&Next :  catch after db hit & after updateArticleList SC-callUpdateService " +e);

		}
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoArticleListAUpdate.get(0)
					.getPromArticleList());
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + ",\"msg\":\"" + param.getMsg()
				+ "\"}";
	}

	private void updateArticleList(PromotionsPlanningParam param,
			List<PromoArticle> promoArticleListAUpdate) {
		int index;
		// String details;
		PromoArticle article = null;
		for (int i = 0; i < param.getIndexListForUpdate().split(",").length; i++) {
			// System.out.println("index" + i);
			index = Integer
					.parseInt(param.getIndexListForUpdate().split(",")[i]
							.split(":")[0]);
			/*
			 * details = param.getIndexListForUpdate().split(",")[i]
			 * .split(":")[1];
			 */
			article = promoArticleListAUpdate.get(index);
			/*
			 * System.out.println("index_"+index
			 * +"_article.equals_"+article.equals("Y")
			 * +"article.getDemandQtyUpdateFlag"
			 * +article.getDemandQtyUpdateFlag()
			 * +"article.getDemandQtyUpdateStatusFlag()"
			 * +article.getDemandQtyUpdateStatusFlag());
			 */

			/*
			 * if(article.getUpdateArticleFlag()!=null && article.equals("Y"))
			 */{
				if (article.getBuildQtyUpdateFlag() != null
						&& article.getBuildQtyUpdateFlag().equals("Y")
						&& article.getBuildQtyUpdateStatusFlag() != null
						&& article.getBuildQtyUpdateStatusFlag().equals("Y")) {
					
					//System.out.println("article.getBuildQtyUpdateStatusFlag()");
					
					if (promoArticleList.get(index).getOrginal_build() == null
							|| promoArticleList.get(index).getOrginal_build()
									.equals("")) {
						promoArticleList.get(index).setOrginal_build(
								article.getOrginal_build());
					}
					
					//System.out.println("promoArticlecont_"+ article.getOrginal_build());
					
					promoArticleList.get(index).setOldBuildQty(
							article.getNewBuildQty());
					promoArticleList.get(index).setNewBuildQty("");

				}
				if (article.getDemandQtyUpdateFlag() != null
						&& article.getDemandQtyUpdateFlag().equals("Y")
						&& article.getDemandQtyUpdateStatusFlag() != null
						&& article.getDemandQtyUpdateStatusFlag().equals("Y")) {
				//	System.out.println("article.getDemandQtyUpdateStatusFlag()");
					if (promoArticleList.get(index).getOrginal_demand() == null
							|| promoArticleList.get(index).getOrginal_demand()
									.equals("")) {
						promoArticleList.get(index).setOrginal_demand(
								article.getOrginal_demand());
					}
					promoArticleList.get(index).setOldDemandQty(
							article.getNewDemandQty());
					promoArticleList.get(index).setNewDemandQty("");
				}
				if (article.getDisplayQtyUpdateFlag() != null
						&& article.getDisplayQtyUpdateFlag().equals("Y")
						&& article.getDisplayQtyUpdateStatusFlag() != null
						&& article.getDisplayQtyUpdateStatusFlag().equals("Y")) {
					//System.out.println("article.getDisplayQtyUpdateStatusFlag()");
					if (promoArticleList.get(index).getOrginal_display() == null
							|| promoArticleList.get(index).getOrginal_display()
									.equals("")) {
						promoArticleList.get(index).setOrginal_display(
								article.getOrginal_display());
					}
					promoArticleList.get(index).setOldDisplayQty(
							article.getNewDisplayQty());
					promoArticleList.get(index).setNewDisplayQty("");
					promoArticleList.get(index).setPsdDisplayStartDate(
							article.getPsdDisplayStartDate() != null ? article
									.getPsdDisplayStartDate() : "");
					promoArticleList.get(index).setPsdDisplayEndDate(
							article.getPsdDisplayEndDate() != null ? article
									.getPsdDisplayEndDate() : "");
				}
				if (article.getDeliveryDateUpdateFlag() != null
						&& article.getDeliveryDateUpdateFlag().equals("Y")
						&& article.getDeliveryDateUpdateStatusFlag() != null
						&& article.getDeliveryDateUpdateStatusFlag()
								.equals("Y")) {
					promoArticleList.get(index).setOldDeliveryDate(
							article.getNewDeliveryDate());
					promoArticleList.get(index).setNewDeliveryDate("");
				}
				if (article.getNewBuildDate() != null
						&& !article.getNewBuildDate().equals("")) {
					promoArticleList.get(index).setBuildOrderDate(
							article.getNewBuildDate());
				}
				if (article.getNewDeliveryDate() != null
						&& !article.getNewDeliveryDate().equals("")) {
					promoArticleList.get(index).setOldDeliveryDate(
							article.getNewDeliveryDate());
				}

				promoArticleList.get(index).resetDetail();
			}
		}
	}

	private boolean getLockDetails(PromotionsPlanningParam param) {
		boolean flag = true;

		try {
			promotionsPlanningService.getLockDetails(param,userDetail);
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		if (param.getAutoForeFlag() != null && param.getLockFlag() != null) {

			LOCK_FLAG = param.getLockFlag();
			AUTO_FCT_FLAG = param.getAutoForeFlag();
			// System.out.println("LOCK_FLAG __ AUTO_FCT_FLAG" + LOCK_FLAG +
			// "___"
			// + AUTO_FCT_FLAG);
			if (param.getSortByOptions().equalsIgnoreCase(PortalUtil.DISPLAY)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.YES)
					&& param.getLockFlag().equalsIgnoreCase(Constants.LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions().equalsIgnoreCase(
					PortalUtil.CATEGORY)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.YES)
					&& param.getLockFlag().equalsIgnoreCase(Constants.LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions()
					.equalsIgnoreCase(PortalUtil.MEDIA)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.YES)
					&& param.getLockFlag().equalsIgnoreCase(Constants.LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions().equalsIgnoreCase(
					PortalUtil.DISPLAY)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.NO)
					&& param.getLockFlag().equalsIgnoreCase(Constants.LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions().equalsIgnoreCase(
					PortalUtil.CATEGORY)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.NO)
					&& param.getLockFlag().equalsIgnoreCase(Constants.LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions()
					.equalsIgnoreCase(PortalUtil.MEDIA)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.NO)
					&& param.getLockFlag().equalsIgnoreCase(Constants.LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions().equalsIgnoreCase(
					PortalUtil.CATEGORY)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.YES)
					&& param.getLockFlag().equalsIgnoreCase(
							Constants.NOT_LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
			else if (param.getSortByOptions()
					.equalsIgnoreCase(PortalUtil.MEDIA)
					&& param.getPromotionWeek().equalsIgnoreCase(
							PortalUtil.CURRENT_WEEK)
					&& param.getAutoForeFlag().equalsIgnoreCase(Constants.YES)
					&& param.getLockFlag().equalsIgnoreCase(
							Constants.NOT_LOCKED))
				// change done for locking Fwd: Promotion - Locking - Minutes
				// flag = false;
				flag = true;
		} else {
			flag = false;
			if (param.getMsg() == null || param.getMsg().equals("")) {
				param.setMsg(Constants.LOCK_ISSUE);
			} // param.setMsg(Constants.LOCK_ISSUE);
		}

		return flag;
	}

	private void getPromoArticles(PromotionsPlanningParam param) {

		try {
			articleListMap = promotionsPlanningService
					.getPromotionArticles(param,userDetail);

			if (param.getCount() != null && param.getCount().trim() != "") {
				COUNT = param.getCount();
			} else {
				COUNT = "0";

			}

		} catch (Exception e) {
			e.printStackTrace();

		}

	}

	public List<ArticleDetail> callArticleService(ArticleSearchParam param) {

		List<ArticleDetail> articleDetail = null;

		try {
			param.setAutoStockRFlag(Constants.TRUE);
			if(param.getArticleDescrition() != null && param.getArticleDescrition() != "")
			{// added for defect 14651
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("/", "*")); 
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("\\\\", "^"));
			}
			articleDetail = SearchArticleService.searchArticleRc(param,userDetail);

			if (articleDetail != null && articleDetail.size() > 0) {
			//	System.out.println("articleDetail.size()__"	+ articleDetail.size());
				return articleDetail;

			} else
				return null;

		} catch (Exception e) {
			e.printStackTrace();
		}

		return null;
	}

	private ModelAndView returnToPage(ModelAndView modelAndView,
			PromotionsPlanningParam param) {
		model.addAttribute("param", param);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// METHOD USED TO GET PROMOTIONS ADDTIONAL DETAILS
	@RequestMapping(value = "/getPromoAddtionalDtls.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoAddtionalDtls(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		//Date dt1=new Date();
		List<PromoArticle> promoArticleList = null;
		PromoArticle promoArticle = null;
		ObjectMapper mapper = null;
		StringWriter stw = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getWeekStartDate() != null && param.getWeekStartDate()
				.trim() != "")) {

	LOGGER.info("History Start: Store:" +userDetail.getSiteNo()+" Article:"+param.getArticleNo());

			promoArticleList = promotionsPlanningService
					.getPromoAddtionalDtls(param,userDetail);
			// setting global data for save functionality
			if (promoArticleList != null
					&& promoArticleList.size() > 0
					&& promoArticleList.get(0).getPromoSalesHistList() != null
					&& promoArticleList.get(0).getPromoSalesHistList().size() > 0)
				promoSalesHistoryListMap = promoArticleList.get(0)
						.getPromoSalesHistList();

	LOGGER.info("History End: Store:" +userDetail.getSiteNo()+" Article:"+param.getArticleNo());

		} else {
			promoArticleList = new ArrayList<PromoArticle>();
			promoArticle = new PromoArticle();
			promoArticle.setMsg(Constants.MANDATORY);
			promoArticleList.add(promoArticle);
		}

		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoArticleList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());
		/*Date dt2=new Date();
		LOGGER.info("Time for getPromoAddtionalDtls : "+CommonUtils.timeDifference(dt1,dt2));
		System.out.println("Time for getPromoAddtionalDtls = "+CommonUtils.timeDifference(dt1,dt2));*/
		return "{\"data\":" + stw.toString() + "}";
	}
	@RequestMapping(value = "/getPromoAddtionalDtlsMultiBuy.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoAddtionalDtlsMultiBuy(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		//Date dt1=new Date();
		List<PromoArticle> promoArticleList = null;
		PromoArticle promoArticle = null;
		ObjectMapper mapper = null;
		StringWriter stw = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getWeekStartDate() != null && param.getWeekStartDate()
				.trim() != "")) {
			promoArticleList = promotionsPlanningService
					.getPromoAddtionalDtlsMultiBuy(param,userDetail);
			// setting global data for save functionality
			if (promoArticleList != null
					&& promoArticleList.size() > 0
					&& promoArticleList.get(0).getPromoSalesHistList() != null
					&& promoArticleList.get(0).getPromoSalesHistList().size() > 0)
				promoSalesHistoryListMap = promoArticleList.get(0)
						.getPromoSalesHistList();
		} else {
			promoArticleList = new ArrayList<PromoArticle>();
			promoArticle = new PromoArticle();
			promoArticle.setMsg(Constants.MANDATORY);
			promoArticleList.add(promoArticle);
		}

		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoArticleList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());
		/*Date dt2=new Date();
		LOGGER.info("Time for getPromoAddtionalDtlsMultiBuy : "+CommonUtils.timeDifference(dt1,dt2));
		System.out.println("Time for getPromoAddtionalDtlsMultiBuy = "+CommonUtils.timeDifference(dt1,dt2));*/
		return "{\"data\":" + stw.toString() + "}";
	}

	// METHOD USED TO LOAD PROMOTIONS AUDIT DETAILS SCREEN
	@RequestMapping(value = "/onPageLoadAuditTrail.htm")
	public ModelAndView onPageLoadAuditTrail(HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			LOGGER.info("inside onPageLoadAuditTrail of Promotion planning.." + "Logging out as session is :--- "+ request.getSession(false));
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));

		ModelAndView modelAndView = new ModelAndView("promotionalAuditTrail");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	// METHOD USED TO GET PROMOTIONS AUDIT DETAILS
	@RequestMapping(value = "/getPromoAuditDetail.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPromoAuditDetail(
			@ModelAttribute("promotionsPlanning") PromotionsAuditTrailParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		List<PromoAuditTrail> promoAuditTrailList = null;
		PromoAuditTrail promoAuditTrail = null;
		ArticleDetail articleDetail = null;
		Map<String, String> userDetails = null;
		param.setSalesOrg(userDetail.getSalesOrg().toString());
		param.setSiteNo(userDetail.getSiteNo());

		if (param.getPageNo() != null && param.getPageNo() != "") {
			// System.out.println("pageNO" + param.getPageNo());
			paramForPagination.setPageNo(param.getPageNo());
			param = paramForPagination;
		}

		else if (param.getSearchByOptions() != null
				&& param.getSearchByOptions().trim() != ""
				&& !param.getSearchByOptions().equalsIgnoreCase("reference")) {

			if (param.getIndex() != null && param.getIndex().trim() != ""
					&& articleSearchResutlsList != null
					&& articleSearchResutlsList.size() > 0) {
				// System.out.println("param.getIndex" + param.getIndex());
				param.setArticleNo(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getArticleNo());
				param.setUom(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getUom());
				param.setArticleDesc(articleSearchResutlsList.get(
						Integer.parseInt(param.getIndex())).getDescription());
				articleSearchResutlsList = new ArrayList<ArticleDetail>();
				paramForPagination = param;

			} else {
				ArticleSearchParam articleParam = new ArticleSearchParam(
						param.getSiteNo(), param.getSalesOrg(),
						param.getSearchByOptions(), param.getArticleNo());
				articleSearchResutlsList = searchAndAddArticle(articleParam);

				if (articleSearchResutlsList != null
						&& articleSearchResutlsList.size() > 0) {
					if (articleSearchResutlsList.size() == 1) {
						param.setArticleNo(articleSearchResutlsList.get(0)
								.getArticleNo());
						param.setUom(articleSearchResutlsList.get(0).getUom());
						param.setArticleDesc(articleSearchResutlsList.get(0)
								.getDescription());
						paramForPagination = param;
						articleSearchResutlsList = new ArrayList<ArticleDetail>();
					} else {
						articleSearchResutlsList.get(0).setMsg(
								Constants.MULTIPLE_RESULT);
						return convertArticleListTojson(articleSearchResutlsList);
					}

				} else {
					articleDetail = new ArticleDetail();
					articleDetail.setMsg((articleParam.getMsg()));
					articleSearchResutlsList = new ArrayList<ArticleDetail>();
					articleSearchResutlsList.add(articleDetail);
					return convertArticleListTojson(articleSearchResutlsList);
				}
			}

		}
		// TODO NEEDTO WRITE ELSE CONDINTION
		if ((param.getArticleNo() != null && param.getArticleNo().trim() != ""
				&& param.getUom() != null && param.getUom().trim() != "")
				|| !(param.getSearchByOptions() != null
						&& param.getSearchByOptions().trim() != "" && !param
						.getSearchByOptions().equalsIgnoreCase("reference"))) {

			// CALLING PROMO AUDIT WEB SERVICE
			promoAuditTrailList = promotionsPlanningService
					.getPromoAuditDetails(param,userDetail);

			// IF THE RESULT IS NULL SETTING THE MSG GIVEN BY WEBSERVICE
			if (!(promoAuditTrailList != null && promoAuditTrailList.size() > 0)) {
				promoAuditTrailList = new ArrayList<PromoAuditTrail>();
				promoAuditTrail = new PromoAuditTrail();
				promoAuditTrail.setMsg((param.getMsg() != null && param
						.getMsg().trim() != "") ? param.getMsg()
						: Constants.EXCEPTION);
				promoAuditTrailList.add(promoAuditTrail);
			} else {
				if (promoAuditTrailList.get(0).getArticleNo() == null) {
					promoAuditTrailList.get(0).setArticleDesc(
							param.getArticleDesc());
					promoAuditTrailList.get(0).setArticleNo(
							param.getArticleNo());
				}
				try {
					// Method to update employee name from the result list
					userDetails = LoginServiceImpl
							.updatepromoAuditTrailList(promoAuditTrailList);
				} catch (Exception e) {
					e.printStackTrace();
				}

				if (userDetails != null && userDetails.size() > 0) {
					for (PromoAuditTrail query : promoAuditTrailList) {
						query.setUpdatedUserName((userDetails.get(query
								.getUpdatedUser()) != null && userDetails.get(
								query.getUpdatedUser()).trim() != "") ? userDetails
								.get(query.getUpdatedUser()) : "");
					}
				}

			}
		}
		return convertPromoAuditListTojson(promoAuditTrailList);

	}

	private String convertPromoAuditListTojson(
			List<PromoAuditTrail> promoAuditTrailList) {
		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoAuditTrailList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + "}";
	}

	private String convertArticleListTojson(
			List<ArticleDetail> articleDetailList) {
		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, articleDetailList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}
		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + "}";
	}

	public ArrayList<ArticleDetail> searchAndAddArticle(ArticleSearchParam param) {
		List<ArticleDetail> articleSearchResult = null;
		try {
			if(param.getArticleDescrition() != null && param.getArticleDescrition() != "")
			{// added for defect 14651
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("/", "*")); 
			param.setArticleDescrition(param.getArticleDescrition().replaceAll("\\\\", "^"));
			}

			articleSearchResult = SearchArticleService.searchArticleRc(param,userDetail);

			if (articleSearchResult != null && articleSearchResult.size() > 0) {
				return (ArrayList<ArticleDetail>) articleSearchResult;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		return null;
	}

	@RequestMapping(value = "/saveSaleHistoryStoreComment.htm", method = RequestMethod.POST)
	@ResponseBody
	public String saveSaleHistoryStoreComment(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		List<PromoSales> promoSalesList = null;
		PromoSales promoSales = null;
		String msg = "";

		// checking whether inputs store comments are present
		if (param.getRecordsIndex() != null
				&& param.getRecordsIndex().trim() != ""
				&& param.getRecordsIndex().split(",") != null
				&& param.getRecordsIndex().split(",").length > 0
				&& param.getRecordsIndex().split(",")[0].split(":")[0] != ""
				&& promoSalesHistoryListMap != null
				&& promoSalesHistoryListMap.size() > 0) {
			promoSalesList = new ArrayList<PromoSales>();

			// parsing the global sale history list and setting in new list
			for (int i = 0; i < param.getRecordsIndex().split(",").length; i++) {
				promoSales = new PromoSales();
				promoSales.setFromDate(param.getRecordsIndex().split(",")[i]
						.split(":")[0]);
				promoSales.setFeedback(param.getRecordsIndex().split(",")[i]
						.split(":")[1]);
				promoSales.setSalesOrg(userDetail.getSalesOrg().toString());
				promoSales.setSite(userDetail.getSiteNo());
				promoSales.setArticleNo((param.getRecordsIndex().split(",")[i]
						.split(":")[2].split("-")[0]));
				promoSales.setArticleUom((param.getRecordsIndex().split(",")[i]
						.split(":")[2].split("-")[1]));
				promoSalesList.add(promoSales);
			}
			// calling web service
			if (promoSalesList != null && promoSalesList.size() > 0)
				msg = promotionsPlanningService
						.updateSalesHistoryComments(promoSalesList,userDetail);
			if (msg.equalsIgnoreCase("false"))
				msg = Constants.HIST_CMTS_EXCEPTION;//for Defect_14643

		}
		// checking whether the article search is called
		else {
			msg = "No changes performed";
		}

		return msg;
	}

	@RequestMapping(value = "/getPromoAllocationDtls.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getPromoAllocationDtls(
			@ModelAttribute("promotionsPlanning") AllocationOrderSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		List<AllocationOrderSearchDtl> allocationSearchList = null;
		param.setSiteNo(userDetail.getSiteNo());

		try {
			allocationSearchList = allocationService
					.getAllocationOrderSearchDtls(param,userDetail);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION ,e);

		}
		return convertAllocationListTojson(allocationSearchList);
	}

	@RequestMapping(value = "/getDisplay.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getDisplay(
			@ModelAttribute("promotionsPlanning") PromotionsPlanningParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String week = "";
		String key = "";
		key = request.getParameter("key");
		Map<String, List<PromoDisplayType>> promoDisplayMapTemp = null;
		if (key != null && !key.equals("")) {
			if (key.equals(Constants.CURRENT_WEEK))
				week = Constants.currentWeek;
			else if (key.equals(Constants.NEXT_WEEK))
				week = Constants.nextWeek;
			else if (key.equals(Constants.TWO_WEEKS_OUT))
				week = Constants.twoWeek;
			else if (key.equals(Constants.THREE_WEEKS_OUT))
				week = Constants.threeWeek;

			else if (key.equals(Constants.FOUR_WEEKS_OUT))
				week = Constants.fourWeek;
			else if (key.equals(Constants.FIVE_WEEKS_OUT))
				week = Constants.fiveWeek;
			else if (key.equals(Constants.SIX_WEEKS_OUT))
				week = Constants.sixWeek;
			else if (key.equals(Constants.SEVEN_WEEKS_OUT))
				week = Constants.sevenWeek;
			else if (key.equals(Constants.EIGHT_WEEKS_OUT))
				week = Constants.eightWeek;
		}
		// calling service to load display types
		if (week != null && promoDisplayMap != null
				&& promoDisplayMap.get(week) != null
				&& promoDisplayMap.containsKey(week)) {
			return convertDisplayListTojson(promoDisplayMap.get(week));
		} else {
			try {
				promoDisplayMapTemp = promotionsPlanningService
						.getDisplayTypes(userDetail.getSiteNo(), userDetail
								.getSalesOrg().toString(), key,userDetail);
				if (promoDisplayMapTemp != null
						&& promoDisplayMapTemp.size() > 0
						&& promoDisplayMapTemp.get(week) != null) {
					if (promoDisplayMap == null) {
						promoDisplayMap = new LinkedHashMap<String, List<PromoDisplayType>>();
					}
					promoDisplayMap.put(week, promoDisplayMapTemp.get(week));
				}
			} catch (Exception e) {
				e.printStackTrace();

			}
		}

		return convertDisplayListTojson(week != null ? (promoDisplayMap != null && promoDisplayMap
				.get(week) != null) ? promoDisplayMap.get(week)
				: new ArrayList<PromoDisplayType>()
				: new ArrayList<PromoDisplayType>());
	}

	private String convertDisplayListTojson(
			List<PromoDisplayType> promoDisplayTypeList) {
		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, promoDisplayTypeList);
		} catch (JsonGenerationException e1) {

			LOGGER.error(Constants.EXCEPTION ,e1);
		} catch (JsonMappingException e) {

			LOGGER.error(Constants.EXCEPTION ,e);
		} catch (IOException e) {

			LOGGER.error(Constants.EXCEPTION ,e);
		}
		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + "}";
	}

	private String convertAllocationListTojson(
			List<AllocationOrderSearchDtl> allocationSearchList) {
		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, allocationSearchList);
		} catch (JsonGenerationException e1) {

			LOGGER.error(Constants.EXCEPTION ,e1);
		} catch (JsonMappingException e) {

			LOGGER.error(Constants.EXCEPTION ,e);
		} catch (IOException e) {

			LOGGER.error(Constants.EXCEPTION ,e);
		}
		// System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" + stw.toString() + "}";
	}

	private void updateAllocationFlag(List<PromoArticle> promoArticleList) {
		List<String> articleList = null;
		AllocationOrderSearchParam param = null;
		try {
			if (promoArticleList != null && promoArticleList.size() > 0) {
				articleList = new ArrayList<String>();
				param = new AllocationOrderSearchParam();
				param.setSiteNo(userDetail.getSiteNo());
				param.setFromDate(promoArticleList.get(0).getPromoStartDate());
				param.setToDate(promoArticleList.get(0).getPromoEndDate());
				for (int i = 0; i < promoArticleList.size(); i++) {
					articleList.add(appendZeros(promoArticleList.get(i)
							.getArticle(), 18));
				}
				if (articleList != null && articleList.size() > 0) {
					param.setArticleList((ArrayList<String>) articleList);
					allocationService.getAllocationOrderSearchDtls(param,userDetail);
					if (param.getArticlesAllocationFlagMap() != null
							&& param.getArticlesAllocationFlagMap().size() > 0) {
						for (PromoArticle promoArticle : promoArticleList) {
							promoArticle
									.setAllocationFlag(param
											.getArticlesAllocationFlagMap()
											.containsKey(
													(promoArticle.getArticle())) ? "Y"
											: "N");
						}
					}
				}
			}
		} catch (UnsupportedEncodingException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
	}

	private String appendZeros(String num, int size) {
		String s = num + "";
		while (s.length() < size)
			s = "0" + s;
		return s;
	}

	// Added for deactivate instore promotion
	@RequestMapping(value = "/deactivateInstorePromotion.htm")
	@ResponseBody
	public String deactivateInstorePromotion(
			@RequestParam(value = "index", required = false) String indexParam,
			HttpServletRequest request, HttpServletResponse response) {
		
		//System.out.println("Entering");
		Integer index;
		PromoArticle promoArticleForDeactivate;
		String responsefromSAP = "";
		InstorePromotionModel param = null;
		try {
			if (promoArticleList != null && promoArticleList.size() > 0) {
				// System.out.println("index" + i);
				index = Integer.parseInt(indexParam);
				promoArticleForDeactivate = promoArticleList.get(index);

				param = new InstorePromotionModel();
				param.setArticle(promoArticleForDeactivate.getArticle());
				param.setArticleDesc(promoArticleForDeactivate.getArticleDesc());
				param.setArticleUom(promoArticleForDeactivate.getArticleUom());
				param.setPromoStartDate(promoArticleForDeactivate
						.getPromoStartDate());
				param.setPromoEndDate(promoArticleForDeactivate
						.getPromoEndDate());
				param.setStandardPrice(promoArticleForDeactivate
						.getStandardPrice());
				param.setPromoOfferNo(promoArticleForDeactivate
						.getPromOfferNo());
				param.setPromoPrice(promoArticleForDeactivate.getPromoPrice());

				InStorePromoParam inStorePromoParam = new InStorePromoParam();
				// -------------
				inStorePromoParam.setSiteNo(userDetail.getSiteNo());
				inStorePromoParam.setSalesOrg(userDetail.getSalesOrg()
						.toString());
				inStorePromoParam.setUsername(userDetail.getUserId());
				inStorePromoParam.setSapPassword(userDetail.getSapPwd());
				inStorePromoParam
						.setInstorePromoType(Constants.PROMO_TYPE_DISPLAY);
				inStorePromoParam
						.setServiceConfig(Constants.SERVICE_CONFIG_CREATE);
				inStorePromoParam
						.setInstorePromoSearchRes(new ArrayList<InstorePromotionModel>());
				param.setMsg(Constants.UPDATE);
				inStorePromoParam.setPromoArticle(promoArticleForDeactivate);

				inStorePromoParam.getInstorePromoSearchRes().add(param);
				responsefromSAP = inStorePromoService
						.updatePromo(inStorePromoParam,userDetail);
				
				//System.out.println("responsefromSAP" + responsefromSAP);
				return CommonUtils.convertObjectTojson(responsefromSAP);
			}
		} catch (Exception e) {
			return CommonUtils.convertObjectTojson(Constants.FALSE);
		}
		return CommonUtils.convertObjectTojson(Constants.FALSE);
	}
}