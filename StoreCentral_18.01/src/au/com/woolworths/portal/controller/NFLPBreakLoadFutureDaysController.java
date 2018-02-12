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
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import au.com.woolworths.portal.model.NightFillBreakLoadFuture;
import au.com.woolworths.portal.model.NightFillDropCartonFuture;
import au.com.woolworths.portal.model.NightFillFillCartonFuture;
import au.com.woolworths.portal.model.NightFillPresentationFuture;
import au.com.woolworths.portal.model.NightFillReportSummaryFuture;
import au.com.woolworths.portal.model.NightFillRubbishCartonFuture;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.NightFillBreakLoadParam;
import au.com.woolworths.portal.param.NightFillSearchSection;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.NightFillLabourPlanFutureServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

/**
 * @author xkaew
 * 
 */
@Controller
@RequestMapping(value = "*/breakLoadFuture")
@Scope("session")
public class NFLPBreakLoadFutureDaysController extends BaseController {

	@Autowired
	private NightFillLabourPlanFutureServiceImpl nightFillLabourPlanService;

	
	private ModelMap model;
	private UserContext userDetail;

	private static final Logger LOGGER = Logger
			.getLogger(NFLPBreakLoadFutureDaysController.class.getName());
	
	List<NightFillBreakLoadFuture> breakLoadList = null;

	List<NightFillDropCartonFuture> dropCartonList = null;
	
	List<NightFillFillCartonFuture> fillCartonList = null;
	
	List<NightFillRubbishCartonFuture> rubbishCartonList = null;
	
	List<NightFillReportSummaryFuture> reportSummaryList = null;
	
	List<NightFillDropCartonFuture> dropCartonAggList = new ArrayList<NightFillDropCartonFuture>();
	
	List<NightFillFillCartonFuture> FillCartonAggList = new ArrayList<NightFillFillCartonFuture>();
	
	List<NightFillBreakLoadFuture> breakLoadCartonAggList = new ArrayList<NightFillBreakLoadFuture>();
	
	List<NightFillReportSummaryFuture> reportSummaryCartonAggList = new ArrayList<NightFillReportSummaryFuture>();
	
	List<NightFillRubbishCartonFuture> rubbishCartonListAgg = new ArrayList<NightFillRubbishCartonFuture>();
	
	List<NightFillPresentationFuture> presentationList = new ArrayList<NightFillPresentationFuture>();
	
	private Map<String, List<NightFillFillCartonFuture>> fillCartonMap = null;
	
	private Map<String, List<NightFillDropCartonFuture>> dropCartonMap = null;
	
	private Map<String, List<NightFillBreakLoadFuture>> breakLoadMap = null;
	
	private Map<String, List<NightFillReportSummaryFuture>> reportSummaryMap = null;
	
	List<NightFillSearchSection> warehouseList=new ArrayList<NightFillSearchSection>();
	Map<String,NightFillSearchSection>warehouseMap=new HashMap<String, NightFillSearchSection>();
	
	
	
	private String deptGM="";
	private String deptGroceries="";
	private String deptPerishables="";
	private String srcOfSupp = "";
	

/*
	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<Department> deptInfoList = new ArrayList<Department>();
		userDetail = (UserContext) request.getSession().getAttribute("user");
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) nightFillLabourPlanService
					.getDeptDetails(parent_node_no, userDetail.getSalesOrg());

			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		LOGGER.info("NFLP Report");

		ModelAndView modelAndView = new ModelAndView("NFLPBreakLoad");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}*/

	@RequestMapping(value = "/getNFLPBreakLoadFutureDays.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getNFLPFutureDays(
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
		LOGGER.info("NFLP Report Future ::> "+siteNo);
		System.out.println("NFLP Report Future ::> "+siteNo);
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
	     
	      param.setIserror(false);
		getBreakLoadDetails(param);
		getDropCarton(param);
		getFillCartons(param);
		getRubbishCartons(param);
		getReportSummaryCartons(param);
		getPresentationquery(param);
		if(param.isIserror()){
			LOGGER.info("NFLP Report Future Error by exception ::> "+siteNo);
			System.out.println("NFLP Report Future Error by exception ::> "+siteNo);
		}else{
			LOGGER.info("NFLP Report Future Succeeded ::> "+siteNo);
			System.out.println("NFLP Report Future Succeeded ::> "+siteNo);
		}
		/*addToWarehouseMap("1001","Dummy","Order1");
		 addToWarehouseMap("1002","Dummy","Order2");
		 addToWarehouseMap("1003","Dummy","Order3");*/
		if(warehouseMap!=null && warehouseMap.size()>0)
		{
			warehouseList = new ArrayList<NightFillSearchSection>(warehouseMap.values());
		}
		
		return "{\"breakLoadMap\":"
		+ gson.toJson(breakLoadMap != null ? breakLoadMap
				: new ArrayList<NightFillBreakLoadFuture>())
		+ ",\"dropCartonMap\":"
		+ gson.toJson(dropCartonMap != null ? dropCartonMap
				: new ArrayList<NightFillDropCartonFuture>())
				+ ",\"fillCartonMap\":"
		+ gson.toJson(fillCartonMap != null ? fillCartonMap
				: new LinkedHashMap<String,List<NightFillFillCartonFuture>>())
				+ ",\"rubbishCartonListAgg\":"
		+ gson.toJson(rubbishCartonListAgg != null ? rubbishCartonListAgg
				: new ArrayList<NightFillRubbishCartonFuture>())
				+ ",\"reportSummaryMap\":"
		+ gson.toJson(reportSummaryMap != null ? reportSummaryMap
				: new ArrayList<NightFillReportSummaryFuture>())
				+ ",\"presentationList\":"
		+ gson.toJson(presentationList != null ? presentationList
				: new ArrayList<NightFillPresentationFuture>())
		+ ",\"warehouseList\":"
		+ gson.toJson(warehouseList != null ? warehouseList
				: new ArrayList<NightFillSearchSection>())
		+ ",\"msg\":\""	+ param.getMsg() + "\"}";
	

	}

	private String getBreakLoadDetails(NightFillBreakLoadParam param)
 {
	try {

		breakLoadList = nightFillLabourPlanService.getBreakLoad(param);
		
		breakLoadCartonAggList = new ArrayList<NightFillBreakLoadFuture>();
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
		LOGGER.error(Constants.EXCEPTION ,e);
		param.setMsg(Constants.EXCEPTION);
		return null;
	}
	return null;
	
}
	
	private String getDropCarton(NightFillBreakLoadParam param)
	 {
		
		
		try {

			dropCartonList = nightFillLabourPlanService.getDropCarton(param);
			
			dropCartonAggList = new ArrayList<NightFillDropCartonFuture>();
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
			param.setIserror(true);
			e.printStackTrace();
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
			
			fillCartonMap = new LinkedHashMap<String, List<NightFillFillCartonFuture>>();
			
			FillCartonAggList = new ArrayList<NightFillFillCartonFuture>();
			

			deptGM = param.getDeptGM();
			deptGroceries = param.getDeptGroceries();
			deptPerishables = param.getDeptPerishables();
			
			
			
/*			if(param.getDeptGM() != "" && param.getDeptGM() != null)
			{
				param.setDeptGM("GENERAL MERCHANDISE");
			}
			if(param.getDeptGroceries() !="" && param.getDeptGroceries() != null)
			{
				param.setDeptGroceries("GROCERY");
			}
			
			if(param.getDeptPerishables() !=""  && param.getDeptPerishables() != null)
			{
				param.setDeptPerishables("W110");
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
			param.setIserror(true);
			e.printStackTrace();
			LOGGER.error(Constants.EXCEPTION ,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	}
	
	private void convertFillCartonToMap(
			List<NightFillFillCartonFuture> FillCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillFillCartonFuture> tempAllocationList = null;
		if (FillCartonAggList != null
				&& FillCartonAggList.size() > 0) {
			fillCartonMap = new LinkedHashMap<String, List<NightFillFillCartonFuture>>();
			for (NightFillFillCartonFuture getDept : FillCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (fillCartonMap.containsKey(key)) {
					tempAllocationList = fillCartonMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillFillCartonFuture>();
					tempAllocationList.add(getDept);
				}
				fillCartonMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		
	}
	
	
	private void convertDropCartonToMap(
			List<NightFillDropCartonFuture> dropCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillDropCartonFuture> tempAllocationList = null;
		if (dropCartonAggList != null
				&& dropCartonAggList.size() > 0) {
			dropCartonMap = new LinkedHashMap<String, List<NightFillDropCartonFuture>>();
			for (NightFillDropCartonFuture getDept : dropCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (dropCartonMap.containsKey(key)) {
					tempAllocationList = dropCartonMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillDropCartonFuture>();
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
			List<NightFillReportSummaryFuture> reportSummaryCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillReportSummaryFuture> tempAllocationList = null;
		if (reportSummaryCartonAggList != null
				&& reportSummaryCartonAggList.size() > 0) {
			reportSummaryMap = new LinkedHashMap<String, List<NightFillReportSummaryFuture>>();
			for (NightFillReportSummaryFuture getDept : reportSummaryCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (reportSummaryMap.containsKey(key)) {
					tempAllocationList = reportSummaryMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillReportSummaryFuture>();
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
			List<NightFillBreakLoadFuture> breakLoadCartonAggList,
			NightFillBreakLoadParam param) {
		String key = "";
		String cashFLName="";
		
		List<NightFillBreakLoadFuture> tempAllocationList = null;
		if (breakLoadCartonAggList != null
				&& breakLoadCartonAggList.size() > 0) {
			breakLoadMap = new LinkedHashMap<String, List<NightFillBreakLoadFuture>>();
			for (NightFillBreakLoadFuture getDept : breakLoadCartonAggList) {
				cashFLName=getDept.getDepartmentNumber();
				
				key = cashFLName;
				if (breakLoadMap.containsKey(key)) {
					tempAllocationList = breakLoadMap.get(key);
					tempAllocationList.add(getDept);
				} else {
					tempAllocationList = new ArrayList<NightFillBreakLoadFuture>();
					tempAllocationList.add(getDept);
				}
				breakLoadMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		
	}
	private String getRubbishCartons(NightFillBreakLoadParam param)
	 {
		try {

			rubbishCartonListAgg = new ArrayList<NightFillRubbishCartonFuture>();
			rubbishCartonList = nightFillLabourPlanService.getRubbishCarton(param);
			if(rubbishCartonList!=null && rubbishCartonList.size()>0){
				
				
				if(srcOfSupp.equalsIgnoreCase("all"))
				{
					rubbishCartonListAgg.addAll(rubbishCartonList);
				}
				
				else if(srcOfSupp.equalsIgnoreCase("warehouse"))
					{
					 for(int i =0; i< rubbishCartonList.size();i++)
				{
					
						 addToWarehouseMap(rubbishCartonList.get(i).getWareHouseNumber(),rubbishCartonList.get(i).getWareHouseName(),null);
						for(int j=0; j<param.getWarehouseNo().split(",").length;j++)
						{
							
						if(rubbishCartonList.get(i).getWareHouseNumber().equals(param.getWarehouseNo().split(",")[j]))
						{
							rubbishCartonListAgg.add(rubbishCartonList.get(i));	
						}
						
						else
						{
								
						}
						}
						}
				}

		} 
		}catch (Exception e) {
			param.setIserror(true);
			e.printStackTrace();
			LOGGER.error(Constants.EXCEPTION,e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		return null;
		
	}
	private String getPresentationquery(NightFillBreakLoadParam param)
	 {
		try {

			presentationList = new ArrayList<NightFillPresentationFuture>();
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
			
			reportSummaryCartonAggList = new ArrayList<NightFillReportSummaryFuture>();
			
			reportSummaryMap = new LinkedHashMap<String, List<NightFillReportSummaryFuture>>();
			
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

	
	
	
	/*@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("nightFill") NightFillLabourPlanParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		LOGGER.info("generateReportin NFLPBreakLoadController.java-------------------");
		String status = "";
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setStoreId(userDetail.getSiteNo());

		try {
			status = nightFillLabourPlanService.getKRONOSdetails(param);
		} catch (Exception e) {
			e.printStackTrace();
			status = Constants.EXCEPTION;

		}
		return status;
	}*/	
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
