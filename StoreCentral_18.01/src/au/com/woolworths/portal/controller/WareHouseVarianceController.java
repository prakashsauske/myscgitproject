package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.WareHouseVarianceHdr;
import au.com.woolworths.portal.model.WarehouserVarianceItem;
import au.com.woolworths.portal.param.WarehouseVarianceParam;
import au.com.woolworths.portal.param.ZeroMPLReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.WarehouseVarianceServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/allocation")
@Scope("session")
public class WareHouseVarianceController /*extends BaseController*/ {

	private ModelMap model;
	private UserContext userDetail;
	// private ZeroMPLReportParam paramForPagination;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	ArrayList<WarehouserVarianceItem> wareHouseVarianceItemList = null;
	// ArrayList<WarehouserVarianceItem> wareHouseVarianceItemList = null;

	private int REC_COUNT = 20;
	private Integer TOTAL_RECORDS;

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['WarehouseVarianceReport']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private WarehouseVarianceServiceImpl warehouseVarianceService;

	@RequestMapping(value = "/varianceOnPageLoad.htm", method = RequestMethod.GET)
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
		
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(parent_node_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		// model.addAttribute("param", new DGMSReportParam());
		ModelAndView modelAndView = new ModelAndView("wareHouseVarianceReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*@RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		 Map<String, String> options = optionDAO.find(selectedValue); 

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

	}*/

/*	@RequestMapping(value = "/fetchSubCategoryDetails.htm", method = RequestMethod.GET)
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
	}*/

	/*@RequestMapping(value = "/fetchSegmentDetails.htm", method = RequestMethod.GET)
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

	}*/

	@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("whvReport") WarehouseVarianceParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		userDetail=((UserContext) request.getSession().getAttribute("user"));
		ArrayList<WarehouserVarianceItem> wareHouseVarianceItemListTemp = null;
		param.setSiteNo(userDetail.getSiteNo());

		if (param.getPageNo() != null && param.getPageNo() != ""
				&& wareHouseVarianceItemList != null
				&& wareHouseVarianceItemList.size() > 0
				&& wareHouseVarianceItemList != null
				&& wareHouseVarianceItemList.size() > 0) {
			//System.out.println("pageNO" + param.getPageNo());
			int pageStart, pageEnd, recordCount, pageNo;
			recordCount = REC_COUNT;
			pageNo = Integer.parseInt(param.getPageNo());

			if (pageNo == 1)
				pageStart = 1;
			else
				pageStart = ((pageNo - 1) * recordCount) + 1;

			if ((pageNo * recordCount) > wareHouseVarianceItemList.size())
				pageEnd = wareHouseVarianceItemList.size();
			else
				pageEnd = pageNo * recordCount;

			//System.out.println("page Start __ page end " + pageStart + "__"
					//+ pageEnd);
			wareHouseVarianceItemListTemp = new ArrayList<WarehouserVarianceItem>();
			for (int i = pageStart; i < pageEnd; i++) {
				wareHouseVarianceItemList.get(i).setMsg(
						TOTAL_RECORDS.toString());
				wareHouseVarianceItemListTemp.add(wareHouseVarianceItemList
						.get(i));
			}

			return "{\"hdrList\":\""
					+ ""
					+ "\",\"msg\":\""
					+ ""
					+ "\",\"itemList\":"
					+ convertwareHouseVarianceListTojson(wareHouseVarianceItemList)
					+ "}";
		}

		try {
			wareHouseVarianceItemList = warehouseVarianceService
					.getOrderItemDetails(param,userDetail);

			if (wareHouseVarianceItemList == null
					&& wareHouseVarianceItemList == null
					&& param.getMsg() == null)
				param.setMsg(EXCEPTION);
			else if (wareHouseVarianceItemList != null
					&& wareHouseVarianceItemList.size() > 0
					&& wareHouseVarianceItemList != null
					&& wareHouseVarianceItemList.size() > 0) {
				if (wareHouseVarianceItemList.get(0).getMsg() != null
						&& !wareHouseVarianceItemList.get(0).getMsg().trim()
								.equals("")
						&& Integer.parseInt(wareHouseVarianceItemList.get(0)
								.getMsg().trim()) > 20) {
					wareHouseVarianceItemListTemp = new ArrayList<WarehouserVarianceItem>();
					TOTAL_RECORDS = Integer.parseInt(wareHouseVarianceItemList
							.get(0).getMsg().trim());
					for (int i = 0; i < 20; i++) {
						wareHouseVarianceItemListTemp
								.add(wareHouseVarianceItemList.get(i));
					}
					return "{\"hdrList\":\"" + "" + "\",\"msg\":\"" + ""
							+ "\",\"itemList\":" + "" + "}";
				}
				param.setMsg("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return "{\"hdrList\":\"" + "" + "\",\"msg\":\"" + param.getMsg()
				+ "\",\"itemList\":"
				+ convertwareHouseVarianceListTojson(wareHouseVarianceItemList)
				+ "}";

	}

	@RequestMapping(value = "/printReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String printReport(
			@ModelAttribute("zeroMPLReport") ZeroMPLReportParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		return "{\"hdrList\":\"" + "" + "\",\"msg\":\"" + ""
				+ "\",\"itemList\":"
				+ convertwareHouseVarianceListTojson(wareHouseVarianceItemList)
				+ "}";

	}

	private String convertwareHouseVarianceListTojson(
			List<WarehouserVarianceItem> wareHouseVarianceItemList) {

		ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, wareHouseVarianceItemList);

		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}

		//System.out.println("stw.toString()" + stw.toString());

		return stw.toString();
	}

}
