/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

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
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.NightFillBreakLoad;
import au.com.woolworths.portal.model.NightFillBulkOrder;
import au.com.woolworths.portal.model.NightFillBulkOrderArticles;
import au.com.woolworths.portal.model.NightFillDropCarton;
import au.com.woolworths.portal.model.NightFillFillCarton;
import au.com.woolworths.portal.model.NightFillPresentation;
import au.com.woolworths.portal.model.NightFillReportSummary;
import au.com.woolworths.portal.model.NightFillRubbishCarton;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.NightFillBreakLoadParam;
import au.com.woolworths.portal.param.NightFillLabourPlanParam;
import au.com.woolworths.portal.param.NightFillSearchSection;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.NightFillLabourPlanServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

/**
 * @author xkaew
 * 
 */
@Controller
@RequestMapping(value = "*/breakLoad")
@Scope("session")
public class NFLPBreakLoadController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['NightFillLabourPlan']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private NightFillLabourPlanServiceImpl nightFillLabourPlanService;

	
	private ModelMap model;
	private UserContext userDetail;
	private static final Logger LOGGER = Logger
			.getLogger(NFLPBreakLoadController.class.getName());

	List<NightFillBreakLoad> breakLoadList = null;

	List<NightFillDropCarton> dropCartonList = null;
	
	List<NightFillBulkOrder> bulkOrderList = null;
	
	List<NightFillFillCarton> fillCartonList = null;
	
	List<NightFillRubbishCarton> rubbishCartonList = null;
	
	List<NightFillReportSummary> reportSummaryList = null;
	
	List<NightFillDropCarton> dropCartonAggList = new ArrayList<NightFillDropCarton>();
	
	List<NightFillFillCarton> FillCartonAggList = new ArrayList<NightFillFillCarton>();
	
	List<NightFillBulkOrder> bulkOrderAggList = new ArrayList<NightFillBulkOrder>();;
	
	List<NightFillBreakLoad> breakLoadCartonAggList = new ArrayList<NightFillBreakLoad>();
	
	List<NightFillReportSummary> reportSummaryCartonAggList = new ArrayList<NightFillReportSummary>();
	
	List<NightFillRubbishCarton> rubbishCartonListAgg = new ArrayList<NightFillRubbishCarton>();
	
	List<NightFillPresentation> presentationList = new ArrayList<NightFillPresentation>();
	
	private Map<String, List<NightFillFillCarton>> fillCartonMap = null;
	
	private Map<String, List<NightFillDropCarton>> dropCartonMap = null;
	
	private Map<String, List<NightFillBulkOrder>> bulkOrderMap = null;
	
	private Map<String, NightFillBulkOrderArticles> bulkOrderArticleMap = null;
	
	private Map<String, List<NightFillBreakLoad>> breakLoadMap = null;
	
	private Map<String, List<NightFillReportSummary>> reportSummaryMap = null;
	
	List<NightFillSearchSection> warehouseList=new ArrayList<NightFillSearchSection>();
	Map<String,NightFillSearchSection>warehouseMap=new HashMap<String, NightFillSearchSection>();
	
	
	
	private String deptGM="";
	private String deptGroceries="";
	private String deptPerishables="";
	private String srcOfSupp = "";
	
	
	private List<ArticleSearchResults> articleSearchResults;

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
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
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();
		userDetail = (UserContext) request.getSession().getAttribute("user");
		/*try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) nightFillLabourPlanService
					.getDeptDetails(parent_node_no, userDetail.getSalesOrg());

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}*/
		System.out.println("NFLP Onpage Load ::> "+userDetail.getSiteNo());
		LOGGER.info("NFLP Onpage Load ::> "+userDetail.getSiteNo());
		ModelAndView modelAndView = new ModelAndView("NFLPBreakLoad");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/getNFLPBreakLoad.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getMarkdownDetails(
			@ModelAttribute("nightFillLabourPlan") NightFillBreakLoadParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) throws ParseException {
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		
		Gson gson = new Gson();
		SimpleDateFormat formatter1 = new SimpleDateFormat("yyyy-MM-dd");
		SimpleDateFormat formatter2 = new SimpleDateFormat("dd/MM/yyyy");

		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		LOGGER.info("NFLP Report Started :>> "+siteNo);
		System.out.println("NFLP Report Started :>> "+siteNo);
		param.setStoreNumber(siteNo);
		Date startDate = formatter2.parse(param.getFromDate());
		/*Date endDate = formatter2.parse(param.getDateTo());*/

		param.setFromDate(formatter1.format(startDate));
		/*param.setDateTo(formatter1.format(endDate));*/
		param.setFromTime(Constants.START_TIME);
		/*param.setToTime(Constants.END_TIME);*/
		
		 srcOfSupp = (String) request.getParameter("sourceSupply");

		 // create calendar objects.
	      Calendar cal = Calendar.getInstance();
	      Calendar future = Calendar.getInstance();

	      // print the current date
	     
	      int year = Integer.parseInt(param.getFromDate().split("-")[0]);
	      int month = Integer.parseInt(param.getFromDate().split("-")[1]);
	      int date = Integer.parseInt(param.getFromDate().split("-")[2]);
	      // change year in future calendar
	      future.set(Calendar.YEAR, year);
	      future.set(Calendar.MONTH, month-1);
	      future.set(Calendar.DATE, date);
	     
	      // check if calendar date is after current date
	      param.setIserror(false);
		getBreakLoadDetails(param, future, cal);
		getDropCarton(param);
		getFillCartons(param);
		getRubbishCartons(param);
		getReportSummaryCartons(param);
		getPresentationquery(param);
		getBulkOrderBreakUp(param);
		if(param.isIserror()){
			LOGGER.info("NFLP Report Error by exception :>> "+siteNo);
			System.out.println("NFLP Report Error by exception :>> "+siteNo);
		}else{
			LOGGER.info("NFLP Report Success :>> "+siteNo);
			System.out.println("NFLP Report Success :>> "+siteNo);
		}
		/*addToWarehouseMap("1001","Dummy","Order1");
		 addToWarehouseMap("1002","Dummy","Order2");
		 addToWarehouseMap("1003","Dummy","Order3");
		 addToWarehouseMap("1004","Dummy","Order3");
		 addToWarehouseMap("1005","Dummy","Order3");
		 addToWarehouseMap("1006","Dummy","Order3");
		 addToWarehouseMap("1007","Dummy","Order3");
		 addToWarehouseMap("1008","Dummy","Order3");*/
		
		if(warehouseMap!=null && warehouseMap.size()>0)
		{
			warehouseList = new ArrayList<NightFillSearchSection>(warehouseMap.values());
		}
		
		return "{\"breakLoadMap\":"
		+ gson.toJson(breakLoadMap != null ? breakLoadMap
				: new ArrayList<NightFillBreakLoad>())
		+ ",\"dropCartonMap\":"
		+ gson.toJson(dropCartonMap != null ? dropCartonMap
				: new ArrayList<NightFillDropCarton>())
				+ ",\"fillCartonMap\":"
		+ gson.toJson(fillCartonMap != null ? fillCartonMap
				: new LinkedHashMap<String,List<NightFillFillCarton>>())
				+ ",\"rubbishCartonListAgg\":"
		+ gson.toJson(rubbishCartonListAgg != null ? rubbishCartonListAgg
				: new ArrayList<NightFillRubbishCarton>())
				+ ",\"reportSummaryMap\":"
		+ gson.toJson(reportSummaryMap != null ? reportSummaryMap
				: new ArrayList<NightFillReportSummary>())
				+ ",\"bulkOrderMap\":"
		+ gson.toJson(bulkOrderMap != null ? bulkOrderMap
				: new ArrayList<NightFillBulkOrder>())
				+ ",\"bulkOrderArticleMap\":"
		+ gson.toJson(bulkOrderArticleMap != null ? bulkOrderArticleMap
				: new ArrayList<NightFillBulkOrderArticles>())
				+ ",\"presentationList\":"
		+ gson.toJson(presentationList != null ? presentationList
				: new ArrayList<NightFillPresentation>())
		+ ",\"warehouseList\":"
		+ gson.toJson(warehouseList != null ? warehouseList
				: new ArrayList<NightFillSearchSection>())
		+ ",\"msg\":\""	+ param.getMsg() + "\"}";
	

	}

	private String getBulkOrderBreakUp(NightFillBreakLoadParam param) {
		try {
			if(param.getBulkIndicator().equalsIgnoreCase("Y")){
				
			}else{
				bulkOrderList = nightFillLabourPlanService.getBulkOrderList(param);
			}
			
			
			bulkOrderAggList = new ArrayList<NightFillBulkOrder>();
			if(bulkOrderList!=null && bulkOrderList.size()>0){
			for(int i =0; i< bulkOrderList.size();i++)
			{
				
				addToWarehouseMap(bulkOrderList.get(i).getWareHouseNumber(),bulkOrderList.get(i).getWareHouseName(),null);
				if(srcOfSupp.equalsIgnoreCase("warehouse"))
				{
					for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
					{
							
						if(bulkOrderList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) && bulkOrderList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
						{
							bulkOrderAggList.add(bulkOrderList.get(i));	
						}
						else if(bulkOrderList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()) && bulkOrderList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
						{
							bulkOrderAggList.add(bulkOrderList.get(i));	
						}
						else if(bulkOrderList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()) && bulkOrderList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
						{
							bulkOrderAggList.add(bulkOrderList.get(i));	
						}
						else
						{
								
						}
					}
				}
				
				if(srcOfSupp.equalsIgnoreCase("all"))
				{
				
				if(bulkOrderList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) )
				{
					bulkOrderAggList.add(bulkOrderList.get(i));	
				}
				else if(bulkOrderList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()))
				{
					bulkOrderAggList.add(bulkOrderList.get(i));	
				}
				else if(bulkOrderList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()))
				{
					bulkOrderAggList.add(bulkOrderList.get(i));	
				}
				else
				{
						
				}
				
				}
			}
			convertBulkOrderToMap(bulkOrderAggList,param);
			convertBulkOrderArticleMap(reportSummaryMap, bulkOrderMap,param);
			
			}else{
				bulkOrderArticleMap = new LinkedHashMap<String, NightFillBulkOrderArticles>();
				bulkOrderMap = new LinkedHashMap<String, List<NightFillBulkOrder>>();
				LOGGER.info("bulkOrderAggList List is empty or null.");
				System.out.println("bulkOrderAggList List is empty or null.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setIserror(true);
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	
		
	}

	private String getBreakLoadDetails(NightFillBreakLoadParam param,Calendar future,Calendar cal)
 {
	try {

		breakLoadList = nightFillLabourPlanService.getBreakLoad(param);
		 if (future.after(cal)) {
	        
	      }
		breakLoadCartonAggList = new ArrayList<NightFillBreakLoad>();
		if(breakLoadList!=null && breakLoadList.size()>0){
		for(int i =0; i< breakLoadList.size();i++)
		{
			
			addToWarehouseMap(breakLoadList.get(i).getWareHouseNumber(),breakLoadList.get(i).getWareHouseName(),null);
			
			if(srcOfSupp.equalsIgnoreCase("all"))
			{
				if(breakLoadList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()))
				{
					breakLoadCartonAggList.add(breakLoadList.get(i));	
				}
				else if(breakLoadList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()))
				{
					breakLoadCartonAggList.add(breakLoadList.get(i));	
				}
				else if(breakLoadList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()))
				{
					breakLoadCartonAggList.add(breakLoadList.get(i));	
				}
				else
				{
						
				}
			}
			
			else if(srcOfSupp.equalsIgnoreCase("warehouse"))
			{
				for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
				{
					if(breakLoadList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) && breakLoadList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
					{
						breakLoadCartonAggList.add(breakLoadList.get(i));	
					}
					else if(breakLoadList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()) && breakLoadList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
					{
						breakLoadCartonAggList.add(breakLoadList.get(i));	
					}
					else if(breakLoadList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()) && breakLoadList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
					{
						breakLoadCartonAggList.add(breakLoadList.get(i));	
					}
					else
					{
							
					}
				}
			}
		}
		
		convertBreakLoadToMap(breakLoadCartonAggList, param);
		}else{
			LOGGER.info("breakLoadListList is empty or null.");
			System.out.println("breakLoadListList is empty or null.");
		}
	} catch (Exception e) {
		param.setIserror(true);
		e.printStackTrace();
		LOGGER.error(Constants.EXCEPTION,e);
		param.setMsg(Constants.EXCEPTION);
		return null;
	}
	return null;
	
}
	
	private String getDropCarton(NightFillBreakLoadParam param)
	 {
		
		
		try {

			dropCartonList = nightFillLabourPlanService.getDropCarton(param);
			
			dropCartonAggList = new ArrayList<NightFillDropCarton>();
			if(dropCartonList!=null && dropCartonList.size()>0){
			for(int i =0; i< dropCartonList.size();i++)
			{
				
				addToWarehouseMap(dropCartonList.get(i).getWareHouseNumber(),dropCartonList.get(i).getWareHouseName(),null);
				if(srcOfSupp.equalsIgnoreCase("warehouse"))
				{
					for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
					{
							
						if(dropCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) && dropCartonList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
						{
							dropCartonAggList.add(dropCartonList.get(i));	
						}
						else if(dropCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()) && dropCartonList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
						{
							dropCartonAggList.add(dropCartonList.get(i));	
						}
						else if(dropCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()) && dropCartonList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
						{
							dropCartonAggList.add(dropCartonList.get(i));	
						}
						else
						{
								
						}
					}
				}
				
				if(srcOfSupp.equalsIgnoreCase("all"))
				{
				
				if(dropCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) )
				{
					dropCartonAggList.add(dropCartonList.get(i));	
				}
				else if(dropCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()))
				{
					dropCartonAggList.add(dropCartonList.get(i));	
				}
				else if(dropCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()))
				{
					dropCartonAggList.add(dropCartonList.get(i));	
				}
				else
				{
						
				}
				
				}
			}
			
			convertDropCartonToMap(dropCartonAggList, param);
			}else{
				LOGGER.info("dropCartonList List is empty or null.");
				System.out.println("dropCartonList List is empty or null.");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setIserror(true);
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	}
	
	private String getFillCartons(NightFillBreakLoadParam param)
	 {
		try {

			fillCartonList = nightFillLabourPlanService.getFillCarton(param);
			
			fillCartonMap = new LinkedHashMap<String, List<NightFillFillCarton>>();
			
			FillCartonAggList = new ArrayList<NightFillFillCarton>();
			

			deptGM = param.getDeptGM();
			deptGroceries = param.getDeptGroceries();
			deptPerishables = param.getDeptPerishables();
			
			
			
			/*if(param.getDeptGM() != "" && param.getDeptGM() != null)
			{
				param.setDeptGM("GENERAL MERCHANDISE");
			}
			if(param.getDeptGroceries() !="" && param.getDeptGroceries() != null)
			{
				param.setDeptGroceries("GROCERY");
			}
			
			if(param.getDeptPerishables() !=""  && param.getDeptPerishables() != null)
			{
				param.setDeptPerishables("PERISHABLES");
			}*/
			if(fillCartonList!=null && fillCartonList.size()>0){
			for(int i =0; i< fillCartonList.size();i++)
			{
				addToWarehouseMap(fillCartonList.get(i).getWareHouseNumber(),fillCartonList.get(i).getWareHouseName(),null);
				if(srcOfSupp.equalsIgnoreCase("all"))
				{
				if(fillCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()))
				{
					FillCartonAggList.add(fillCartonList.get(i));	
				}
				else if(fillCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()))
				{
					FillCartonAggList.add(fillCartonList.get(i));	
				}
				else if(fillCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()))
				{
					FillCartonAggList.add(fillCartonList.get(i));	
				}
				else
				{
						
				}
				}
				else if(srcOfSupp.equalsIgnoreCase("warehouse"))
				{
					for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
					{
						
					if(fillCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) && fillCartonList.get(i).getWareHouseNumber().equals(param.getWarehouseNo().split(",")[j]))
					{
						FillCartonAggList.add(fillCartonList.get(i));	
					}
					else if(fillCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()) && fillCartonList.get(i).getWareHouseNumber().equals(param.getWarehouseNo().split(",")[j]))
					{
						FillCartonAggList.add(fillCartonList.get(i));	
					}
					else if(fillCartonList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()) && fillCartonList.get(i).getWareHouseNumber().equals(param.getWarehouseNo().split(",")[j]))
					{
						FillCartonAggList.add(fillCartonList.get(i));	
					}
					else
					{
							
					}
					}
					}
			}
			convertFillCartonToMap(FillCartonAggList, param);
			}else{
				LOGGER.info("fillCartonList List is Empty or null.");
				System.out.println("fillCartonList List is Empty or null.");
			}
			
			
			
		} catch (Exception e) {
			e.printStackTrace();
			param.setIserror(true);
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	}
	
	private void convertFillCartonToMap(
			List<NightFillFillCarton> FillCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillFillCarton> tempAllocationList = null;
		if (FillCartonAggList != null
				&& FillCartonAggList.size() > 0) {
			fillCartonMap = new LinkedHashMap<String, List<NightFillFillCarton>>();
			for (NightFillFillCarton getDept : FillCartonAggList) {
				cashFLName=getDept.getRaisle();
				
				key = cashFLName;
				if (fillCartonMap.containsKey(key)) {
					tempAllocationList = fillCartonMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillFillCarton>();
					tempAllocationList.add(getDept);
				}
				fillCartonMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		
	}
	
	private void convertBulkOrderToMap(
			List<NightFillBulkOrder> bulkOrderAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillBulkOrder> tempAllocationList = null;
		if (bulkOrderAggList != null
				&& bulkOrderAggList.size() > 0) {
			bulkOrderMap = new LinkedHashMap<String, List<NightFillBulkOrder>>();
			for (NightFillBulkOrder getDept : bulkOrderAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (bulkOrderMap.containsKey(key)) {
					tempAllocationList = bulkOrderMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillBulkOrder>();
					tempAllocationList.add(getDept);
				}
				bulkOrderMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
	}
	private void convertDropCartonToMap(
			List<NightFillDropCarton> dropCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillDropCarton> tempAllocationList = null;
		if (dropCartonAggList != null
				&& dropCartonAggList.size() > 0) {
			dropCartonMap = new LinkedHashMap<String, List<NightFillDropCarton>>();
			for (NightFillDropCarton getDept : dropCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (dropCartonMap.containsKey(key)) {
					tempAllocationList = dropCartonMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillDropCarton>();
					tempAllocationList.add(getDept);
				}
				dropCartonMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		
	}
	
	
	private void convertReportSummaryToMap(
			List<NightFillReportSummary> reportSummaryCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillReportSummary> tempAllocationList = null;
		if (reportSummaryCartonAggList != null
				&& reportSummaryCartonAggList.size() > 0) {
			reportSummaryMap = new LinkedHashMap<String, List<NightFillReportSummary>>();
			for (NightFillReportSummary getDept : reportSummaryCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (reportSummaryMap.containsKey(key)) {
					tempAllocationList = reportSummaryMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillReportSummary>();
					tempAllocationList.add(getDept);
				}
				reportSummaryMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		
	}
	private void convertBreakLoadToMap(
			List<NightFillBreakLoad> breakLoadCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillBreakLoad> tempAllocationList = null;
		if (breakLoadCartonAggList != null
				&& breakLoadCartonAggList.size() > 0) {
			breakLoadMap = new LinkedHashMap<String, List<NightFillBreakLoad>>();
			for (NightFillBreakLoad getDept : breakLoadCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (breakLoadMap.containsKey(key)) {
					tempAllocationList = breakLoadMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillBreakLoad>();
					tempAllocationList.add(getDept);
				}
				breakLoadMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		
	}
	private void convertBulkOrderArticleMap(Map<String, List<NightFillReportSummary>> reportSummaryMap, Map<String, List<NightFillBulkOrder>> depMap,NightFillBreakLoadParam param) {
		String key = "";
		bulkOrderArticleMap = new LinkedHashMap<String, NightFillBulkOrderArticles>();
		
	if(!param.getBulkIndicator().equalsIgnoreCase("Y")){
		for (String deptKey : reportSummaryMap.keySet()){
			System.out.println("Dept Key : " + deptKey);
			//List<NightFillBulkOrder> reportSummaries = depMap.get(deptKey);
		
		NightFillBulkOrderArticles bulkOrderArticles = null;
		for(Map.Entry entry : depMap.entrySet()){
			for (NightFillBulkOrder reportSummary : (List<NightFillBulkOrder>) entry.getValue()) {
				key=reportSummary.getArticleNumber();
				System.out.println("Article Key : " + key);
				if (bulkOrderArticleMap.containsKey(key)) 
				{
					bulkOrderArticles = bulkOrderArticleMap.get(key);
				}else 
				{
					bulkOrderArticles = new NightFillBulkOrderArticles();
				}
				
					if(param.getDeptGM().equalsIgnoreCase(deptKey)) 
					{						
						bulkOrderArticles.setDeptGm(true);
						if(reportSummary.getDepartmentNumber().equalsIgnoreCase(deptKey)){
							bulkOrderArticles.setArticleGMVal(String.valueOf(Double.valueOf(bulkOrderArticles.getArticleGMVal())+Double.valueOf(reportSummary.getNoOfCartons())));
						}
						
					}
					
					if(param.getDeptGroceries().equalsIgnoreCase(deptKey))
					{
						bulkOrderArticles.setDeptGroc(true);
						if(reportSummary.getDepartmentNumber().equalsIgnoreCase(deptKey)){
							bulkOrderArticles.setArticleGrocVal(String.valueOf((Double.valueOf(bulkOrderArticles.getArticleGrocVal())+Double.valueOf(reportSummary.getNoOfCartons()))));
						}						
					}
					
					if(param.getDeptPerishables().equalsIgnoreCase(deptKey))
					{
						bulkOrderArticles.setDeptPer(true);
						if(reportSummary.getDepartmentNumber().equalsIgnoreCase(deptKey)){
							bulkOrderArticles.setArticlePerVal((String.valueOf((Double.valueOf(bulkOrderArticles.getArticlePerVal())+Double.valueOf(reportSummary.getNoOfCartons())))));
						}						
					}
				
					if(deptKey.equalsIgnoreCase(param.getDeptPerishables()) && !bulkOrderArticles.isDeptPer()){
						bulkOrderArticles.setArticlePerVal("0");
						bulkOrderArticles.setDeptPer(true);
					}else if(deptKey.equalsIgnoreCase(param.getDeptGroceries())&& !bulkOrderArticles.isDeptGroc()){
						bulkOrderArticles.setArticleGrocVal("0");
						bulkOrderArticles.setDeptGroc(true);
					}else if(deptKey.equalsIgnoreCase(param.getDeptGM())&& !bulkOrderArticles.isDeptGm()){
						bulkOrderArticles.setArticleGMVal("0");
						bulkOrderArticles.setDeptGm(true);
					}
				
					bulkOrderArticles.setTotal(String.valueOf(Double.valueOf(bulkOrderArticles.getArticleGMVal())+Double.valueOf(bulkOrderArticles.getArticleGrocVal())+Double.valueOf(bulkOrderArticles.getArticlePerVal())));
					bulkOrderArticles.setArticle("  "+reportSummary.getArticleNumber());
					bulkOrderArticles.setArticleDesc(reportSummary.getArticleName());
				
					//if(!bulkOrderArticles.getTotal().equalsIgnoreCase("0.0"))
					{
						bulkOrderArticleMap.put(key, bulkOrderArticles);
					}
				} 
			} 
		}
		}
	}
	private String getRubbishCartons(NightFillBreakLoadParam param)
	 {
		try {
			
			rubbishCartonListAgg = new ArrayList<NightFillRubbishCarton>();
			rubbishCartonList = nightFillLabourPlanService.getRubbishCarton(param);
			
			List<NightFillRubbishCarton> rubbishCartonListFiltered = new ArrayList<NightFillRubbishCarton>();
			
			for(NightFillRubbishCarton rubbishCarton :  rubbishCartonList){
				if(param.getDeptGM()!=null && !param.getDeptGM().trim().equalsIgnoreCase("")){
					if(rubbishCarton.getDepartmentNumber().equalsIgnoreCase(param.getDeptGM())){
						rubbishCartonListFiltered.add(rubbishCarton);
					}
				}
				if(param.getDeptGroceries()!=null && !param.getDeptGroceries().trim().equalsIgnoreCase("")){
					if(rubbishCarton.getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries())){
						rubbishCartonListFiltered.add(rubbishCarton);
					}
				}
				if(param.getDeptPerishables()!=null && !param.getDeptPerishables().trim().equalsIgnoreCase("")){
					if(rubbishCarton.getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables())){
						rubbishCartonListFiltered.add(rubbishCarton);
					}
				}
			}
			if(rubbishCartonListFiltered!=null && rubbishCartonListFiltered.size()>0){
				
				if(srcOfSupp.equalsIgnoreCase("all"))
				{
					rubbishCartonListAgg.addAll(rubbishCartonListFiltered);
				}
				
				else if(srcOfSupp.equalsIgnoreCase("warehouse"))
					{
					 for(int i =0; i< rubbishCartonListFiltered.size();i++)
				{
					
						 addToWarehouseMap(rubbishCartonListFiltered.get(i).getWareHouseNumber(),rubbishCartonListFiltered.get(i).getWareHouseName(),null);
						for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
						{
							
						if(rubbishCartonListFiltered.get(i).getWareHouseNumber().equals(param.getWarehouseNo().split(",")[j]))
						{
							rubbishCartonListAgg.add(rubbishCartonListFiltered.get(i));	
						}
						
						else
						{
								
						}
						}
						}
				}

		} 
		}catch (Exception e) {
			e.printStackTrace();
			param.setIserror(true);
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	}
	private String getPresentationquery(NightFillBreakLoadParam param)
	 {
		try {
			presentationList = new ArrayList<NightFillPresentation>();
			presentationList = nightFillLabourPlanService.getPresentation(param);
		}catch (Exception e) {
			param.setIserror(true);
			e.printStackTrace();
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	}
	private String getReportSummaryCartons(NightFillBreakLoadParam param)
	 {
		try {

			reportSummaryList = nightFillLabourPlanService.getReportSummary(param);
			
			reportSummaryCartonAggList = new ArrayList<NightFillReportSummary>();
			
			reportSummaryMap = new LinkedHashMap<String, List<NightFillReportSummary>>();
			
			param.setDeptGM(deptGM);
			param.setDeptGroceries(deptGroceries);
			param.setDeptPerishables(deptPerishables);
			if(reportSummaryList!=null && reportSummaryList.size()>0){
			for(int i =0; i< reportSummaryList.size();i++)
			{
				
				
				if(srcOfSupp.equalsIgnoreCase("all"))
				{
				if(reportSummaryList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()))
				{
					
					reportSummaryCartonAggList.add(reportSummaryList.get(i));	
				}
				else if(reportSummaryList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()))
				{
					reportSummaryCartonAggList.add(reportSummaryList.get(i));
					
				}
				else if(reportSummaryList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()))
				{
					reportSummaryCartonAggList.add(reportSummaryList.get(i));
					
				}
				else
				{
						
				}
				}
				else if(srcOfSupp.equalsIgnoreCase("warehouse"))
				{
					for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
					{
				if(reportSummaryList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGM()) && reportSummaryList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]) )
				{
					
					reportSummaryCartonAggList.add(reportSummaryList.get(i));	
				}
				else if(reportSummaryList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptGroceries()) && reportSummaryList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
				{
					reportSummaryCartonAggList.add(reportSummaryList.get(i));
					
				}
				else if(reportSummaryList.get(i).getDepartmentNumber().equalsIgnoreCase(param.getDeptPerishables()) && reportSummaryList.get(i).getWareHouseNumber().equalsIgnoreCase(param.getWarehouseNo().split(",")[j]))
				{
					reportSummaryCartonAggList.add(reportSummaryList.get(i));
					
				}
				else
				{
						
				}
				}
				}
			}
			
			convertReportSummaryToMap(reportSummaryCartonAggList,param);
			}else{
				LOGGER.info("reportSummaryList List is Empty or null");
				System.out.println("reportSummaryList List is Empty or null");
			}
		} catch (Exception e) {
			param.setIserror(true);
			e.printStackTrace();
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
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

		try {
			if ("1".equalsIgnoreCase(srcOfSupp)
					|| "vendor".equalsIgnoreCase(srcOfSupp)) {

				supplierList = nightFillLabourPlanService.getVendorList(vendorName,
						maxRows, vendorNo, siteNo,userDetail);
				if (supplierList != null && supplierList.size() > 0)
					model.addAttribute("vendorList", supplierList);
				else
					model.addAttribute("vendorList", new ArrayList<Vendor>());

				modelAndView = new ModelAndView("vendorLookupNFLP");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

			else if ("2".equalsIgnoreCase(srcOfSupp)
					|| "warehouse".equalsIgnoreCase(srcOfSupp)) {

				supplierList1 = nightFillLabourPlanService.getWareHouseList(vendorName,
						maxRows, vendorNo,userDetail);
				if (supplierList1 != null && supplierList1.size() > 0)
					model.addAttribute("vendorList", supplierList1);
				else
					model.addAttribute("vendorList", new ArrayList<WareHouse>());

				modelAndView = new ModelAndView("wareHouseLookupNFLP");
				model.addAttribute("vendorList", supplierList1);
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
				return modelAndView;

			}

		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.error(Constants.EXCEPTION,e);

			if ("1".equalsIgnoreCase(srcOfSupp)) {
				supplierList = new ArrayList<Vendor>();
				modelAndView = new ModelAndView("vendorLookupNFLP");
				model.addAttribute("vendorList", supplierList);

			} else {
				supplierList1 = new ArrayList<WareHouse>();
				modelAndView = new ModelAndView("wareHouseLookupNFLP");
				model.addAttribute("vendorList", supplierList1);

			}
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
		return modelAndView;

	}

	
	
	
	@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("nightFill") NightFillLabourPlanParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		LOGGER.info("generateReportin NFLPBreakLoadController.java-------------------");
		System.out.println("generateReportin NFLPBreakLoadController.java-------------------");
		String status = "";
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setStoreId(userDetail.getSiteNo());

		try {
			status = nightFillLabourPlanService.getKRONOSdetails(param,userDetail);
		} catch (Exception e) {
			e.printStackTrace();
			status = Constants.EXCEPTION;

		}
		return status;
	}
	
	private void addToWarehouseMap(String siteNo,String siteName,String orderNumber)
	{
		NightFillSearchSection bean=new NightFillSearchSection();
		bean.setWarehouseNumber(siteNo);
		bean.setWarehouseName(siteName);
		bean.setOrderNumber(orderNumber!=null?orderNumber:"");
		
		if(warehouseMap!=null && warehouseMap.size()>0)
		{
			if(!warehouseMap.containsKey(siteNo))
			{
				warehouseMap.put(siteNo,bean );
			}
		}
		else
		{
			warehouseMap.put(siteNo,bean );
		}
	}
	
}
