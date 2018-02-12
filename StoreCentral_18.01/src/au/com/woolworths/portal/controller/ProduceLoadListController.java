package au.com.woolworths.portal.controller;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.StringTokenizer;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.ProduceLoadListInfo;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.ProduceParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.ProduceLoadListImpl;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/produce")
public class ProduceLoadListController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	//@Value("#{properties['ProduceLoadlist']}") applicationSettings CR
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private ProduceLoadListImpl produceLoadListService;

	List<ProduceLoadListInfo> produceLoadListInfo = null;
	List<ProduceLoadListInfo> produceLoadListInfoList = null;
	Map<String, List<ProduceLoadListInfo>> produceLoadListInfoMap = null;
	
	private ProduceParam produceParam;
	private ModelMap model;
	private String currentPage="1";
	private String storeNo="";
	
	@Autowired
	private ArticleServiceImpl articleService;

	
	@RequestMapping(value = "/onPageLoadProduceLoadListSearch.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		// //System.out.println("onPageLoadProduceLoadListSearch");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		/*if(user.getUserAccessMap().containsKey(screenCode)){
			if(user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS)){
				return new ModelAndView("noAccess");
			}
			
		}*/
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		produceParam = new ProduceParam();
		model = new ModelMap();
		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		produceParam.setStoreNo(context.getSiteNo());
		produceParam.setWarehouseNo("");
		produceParam.setRosterDate("");
		// produceParam.setLoadListNo("");
		produceParam.setStoreOrder("");
		model.addAttribute("warehouseName", "");
		model.addAttribute("storeName", "");
		model.addAttribute("deliveryDate", "");
		model.addAttribute("loadListNo", "");
		model.addAttribute("somOrder", "");
		model.addAttribute("produceParam", produceParam);
		model.addAttribute("noResults", "");
		model.addAttribute("currentPage", "1");
		//produceLoadListInfo = new ArrayList<ProduceLoadListInfo>();

		//model.addAttribute("produceLoadListInfo", produceLoadListInfoMap);
		ModelAndView modelAndView = new ModelAndView("produceLoadList");
		model.addAttribute("noData", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/requestProduceLoadListSearch.htm", method = RequestMethod.POST)
	public ModelAndView requestProduceLoadListSearch(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {

		//System.out.println("************* test1");
		
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		model.addAttribute("currentPage", "1");
		produceParam.setWarehouseNo(request.getParameter("suppNo"));
		produceParam.setStoreNo(request.getParameter("storeNo"));

		produceParam.setRosterDate(request.getParameter("rosterDate"));

		// produceParam.setLoadListNo(request.getParameter("loadListNo"));

		produceParam.setStoreOrder(request.getParameter("storeOrder"));
		String wh = request.getParameter("suppNo");
		String store = request.getParameter("storeNo");
		String rosterDate = request.getParameter("rosterDate");

		String delims = "/";

		String formattedDate = "";
		String[] date = new String[3];

		StringTokenizer st = new StringTokenizer(rosterDate, delims);
		int i = 0;
		while (st.hasMoreElements()) {

			date[i] = (String) st.nextElement();
			i++;
		}
		// //System.out.println("formattedDate---->" + date[2] + date[1] +
		// date[0]);
		formattedDate = date[2] + date[1] + date[0];
		// produceParam.setRosterDateInRequiredFormat(formattedDate);

		if (rosterDate.length() == 8) {
			// //System.out.println("4");
			produceParam
					.setRosterDateInRequiredFormat(y2ToY4Converter(rosterDate));
		} else {
			produceParam.setRosterDateInRequiredFormat(rosterDate);
		}

		produceParam.setRecordCount(0);

		try {
			if ((!StringUtils.hasText(wh) && !(produceParam.getStoreOrder()!=null 
					&& !produceParam.getStoreOrder().equals("")) ) || !StringUtils.hasText(store)
					|| !StringUtils.hasText(rosterDate)) {

				ModelAndView modelAndView = new ModelAndView("produceLoadList",
						"param", produceParam);
				model.addAttribute("noData",
						"Please enter Warehouse/order No & Store No & Roster Date to search");
				model.addAttribute("warehouseName", "");
				model.addAttribute("storeName", "");
				model.addAttribute("deliveryDate", "");
				model.addAttribute("loadListNo", "");
				model.addAttribute("somOrder", "");
				model.addAttribute("noResults", "");

				model.addAttribute("param", produceParam);
				modelAndView.addObject("model", model);

				modelAndView.addAllObjects(model);
				return modelAndView;

			} else {
				model.addAttribute("noData", "");
				produceLoadListInfo = produceLoadListService
						.ProduceLoadListSearch(produceParam,user);
				if(produceLoadListInfo!=null && produceLoadListInfo.size()>0 
						&& produceLoadListInfo.get(0).getMsg()!=null && produceLoadListInfo.get(0).getMsg().trim().contains(" ")){
					model.addAttribute(
							"noData",
							produceLoadListInfo.get(0).getMsg().trim());
					produceLoadListInfoMap=new LinkedHashMap<String, List<ProduceLoadListInfo>>();
					
				}else{
				
				produceLoadListInfoMap= updateList(produceLoadListInfo);
				
				if (produceLoadListInfoMap!=null && produceLoadListInfoMap.size() == 1) {
					// //System.out.println(" inside 1");
					if (produceLoadListInfoMap.get(0).get(0).getMsg().trim().length() > 0) {
						if (produceLoadListInfoMap.get(0).get(0).getMsg().trim().length() > 0
								&& produceLoadListInfoMap.get(0).get(0).getMsg() != null) {
							produceParam.setRecordCount(Integer
									.parseInt(produceLoadListInfoMap.get(0).get(0).getMsg().trim()));
						}
						return requestProduceLoadListDetail(request, response);
					} else {
						model.addAttribute(
								"noData",
								"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
					}

				} else if (produceLoadListInfoMap!=null && produceLoadListInfoMap.size() > 1) {
					if (produceLoadListInfoMap.get(0).get(0).getStoreOrder() != null
							&& produceLoadListInfoMap.get(0).get(0).getStoreOrder()
									.trim().length() > 0) {
						if (produceLoadListInfoMap.get(0).get(0).getMsg().trim().length() > 0
								&& produceLoadListInfoMap.get(0).get(0).getMsg() != null) {
							produceParam.setRecordCount(Integer
									.parseInt(produceLoadListInfoMap.get(0).get(0)
											.getMsg()));
						}
						model.addAttribute("noResults", "");
						model.addAttribute("warehouseName", produceLoadListInfoMap.get(0)
								.get(0).getWarehouseName());
						model.addAttribute("storeName", produceLoadListInfoMap.get(0)
								.get(0).getStoreName());
						model.addAttribute("listSize",
								produceLoadListInfoMap.size());
					} else {
						model.addAttribute(
								"noData",
								"We could not generate the report since there is no data for selected parameters. Please try different parameters. ");
					}

				}
				else {
					//produceLoadListInfo = new ArrayList<ProduceLoadListInfo>();
					model.addAttribute("warehouseName",
							request.getParameter("warehouseName"));
					model.addAttribute("storeName",
							request.getParameter("storeName"));
					model.addAttribute("deliveryDate", "");
					model.addAttribute("loadListNo", "");
					model.addAttribute("somOrder", "");
					model.addAttribute("noResults", "No Data found");
					model.addAttribute(
							"noData",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				}
			}
			}
		} catch (Exception e) {

			//produceLoadListInfo = new ArrayList<ProduceLoadListInfo>();
			model.addAttribute("warehouseName",
					request.getParameter("warehouseName"));
			model.addAttribute("storeName", request.getParameter("storeName"));
			model.addAttribute("deliveryDate", "");
			model.addAttribute("loadListNo", "");
			model.addAttribute("somOrder", "");
			model.addAttribute("noResults", "No Data found");
			model.addAttribute(
					"noData",
					"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
		}
		

		model.addAttribute("produceLoadListInfo", produceLoadListInfoMap);
		////System.out.println(produceLoadListInfoMap.size());
		// //System.out.println("produceLoadListInfo size "
		// + produceLoadListInfo.size());
		
		model.addAttribute("produceParam", produceParam);
		
		ModelAndView modelAndView = new ModelAndView("produceLoadList",
				"param", produceParam);
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);

		return modelAndView;

	}

	@RequestMapping(value = "/requestProduceLoadListDetail.htm", method = RequestMethod.POST)
	public ModelAndView requestProduceLoadListDetail(
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// //System.out.println("requestProduceLoadListDetail");
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {

			return new ModelAndView(new RedirectView("../../"));

		}
		List<ProduceLoadListInfo> produceLoadListDet = null;

		ProduceLoadListInfo produceLoadListDetails = null;
		////System.out.println(produceLoadListInfoMap.size() +"_" );
		if (request.getParameter("index") != null) {
			produceLoadListDet = produceLoadListInfoMap
					.get(request.getParameter("index"));
			
			produceLoadListDetails=produceLoadListInfoMap
					.get(request.getParameter("index")).get(0);
		} else {
			produceLoadListDet =  produceLoadListInfoMap
					.get(0);
			produceLoadListDetails=produceLoadListDet.get(0);
		}
		
		UserContext context = (UserContext) request.getSession(false)
				.getAttribute("user");
		produceParam.setStoreNo(context.getSiteNo());
		model.addAttribute("warehouseNo",
				produceLoadListDetails.getWarehouseNo());
		model.addAttribute("warehouseName",
				produceLoadListDetails.getWarehouseName());
		storeNo=produceLoadListDetails.getStoreNo();
		model.addAttribute("storeNo", produceLoadListDetails.getStoreNo());
		model.addAttribute("storeName", produceLoadListDetails.getStoreName());
		model.addAttribute("rosterDate", produceLoadListDetails.getRosterDate());
		model.addAttribute("deliveryDate",
				produceLoadListDetails.getDeliveryDate());
		model.addAttribute("loadListNo", produceLoadListDetails.getLoadlistNo());
		model.addAttribute("somOrder", produceLoadListDetails.getStoreOrder());
		//produceLoadListDet.add(produceLoadListDetails);
		model.addAttribute("produceLoadListDet", produceLoadListDet);
		currentPage=request.getParameter("currPage");
		model.addAttribute("currentPage", currentPage);
		ModelAndView modelAndView = new ModelAndView("produceLoadListDetails");
		model.addAttribute("noData", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/backToProduceList.htm", method = RequestMethod.GET)
	public ModelAndView backToProduceList(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		produceParam.setStoreNo(storeNo);
		ModelAndView modelAndView = new ModelAndView("produceLoadList");
		model.addAttribute("currentPage", currentPage);
		model.addAttribute("produceLoadListInfo", produceLoadListInfoMap);
		model.addAttribute("noData", "");
		model.addAttribute("noResults", "");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/wareHouseSearch.htm", method = RequestMethod.GET)
	public ModelAndView wareHouseSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		String vendordesc = (String) request.getParameter("vendordesc");
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		ArrayList<WareHouse> supplierList1;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			supplierList1 = produceLoadListService.getWareHouseList(vendordesc,
					maxRows, vendorNo,user);
			if (supplierList1 != null && supplierList1.size() > 0) {
				modelAndView = new ModelAndView("wareHouseList");
				model.addAttribute("vendorList", supplierList1);
				model.addAttribute("noSearchResults", "");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
			} else {
				modelAndView = new ModelAndView("wareHouseList");
				model.addAttribute("vendorList", new ArrayList<WareHouse>());
				model.addAttribute("noSearchResults", "No Data Found");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
			}
			return modelAndView;

		} catch (Exception e) {
			e.printStackTrace();
			supplierList1 = new ArrayList<WareHouse>();
			modelAndView = new ModelAndView("wareHouseList");
			model.addAttribute("vendorList", supplierList1);
			model.addAttribute("noSearchResults", "No Data Found");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
	}

	@RequestMapping(value = "/storeSearch.htm", method = RequestMethod.GET)
	public ModelAndView storeSearch(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		ModelMap model = new ModelMap();
		ModelAndView modelAndView = new ModelAndView("vendorDetails");
		String storeDesc = (String) request.getParameter("storeDesc");
		String maxRows = "0";
		String storeNo = (String) request.getParameter("storeNo");
		ArrayList<Store> storeDetailsList;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		try {
			storeDetailsList = produceLoadListService.getStoreDetails(
					storeDesc, maxRows, storeNo,user);
			if (storeDetailsList != null && storeDetailsList.size() > 0) {
				// //System.out.println("inside 1");
				modelAndView = new ModelAndView("storeList");
				model.addAttribute("storeDtlsList", storeDetailsList);
				model.addAttribute("noSearchResults", "");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
			} else {
				modelAndView = new ModelAndView("storeList");
				model.addAttribute("storeDtlsList", new ArrayList<Store>());
				model.addAttribute("noSearchResults", "No Data Found");
				modelAndView.addObject("model", model);
				modelAndView.addAllObjects(model);
			}
			return modelAndView;

		} catch (Exception e) {
			e.printStackTrace();
			storeDetailsList = new ArrayList<Store>();
			modelAndView = new ModelAndView("storeList");
			model.addAttribute("storeDtlsList", storeDetailsList);
			model.addAttribute("noSearchResults", "No Data Found");
			modelAndView.addObject("model", model);
			modelAndView.addAllObjects(model);
			return modelAndView;
		}
	}

	public String y2ToY4Converter(String textDate) {

		Date actualDate = null;

		SimpleDateFormat yyyy = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat yy = new SimpleDateFormat("dd/MM/yy");

		try {
			actualDate = yy.parse(textDate);
		} catch (Exception pe) {
			pe.printStackTrace();
		}

		// system.out.print(textDate + " enhanced:  ");
		// //System.out.println(yyyy.format(actualDate));
		return yyyy.format(actualDate);
	}
	private Map<String, List<ProduceLoadListInfo>> updateList(
			List<ProduceLoadListInfo> invoiceReconcilationList) {
		Map<String, List<ProduceLoadListInfo>> invoiceReconcilationMap = null;
		List<ProduceLoadListInfo> invoiceReconcilationTemp = null;
		String key = "";
		if (invoiceReconcilationList != null
				&& invoiceReconcilationList.size() > 0) {
			invoiceReconcilationMap = new LinkedHashMap<String, List<ProduceLoadListInfo>>();
			for (ProduceLoadListInfo inv : invoiceReconcilationList) {
				key = inv.getStoreOrder();
				if (invoiceReconcilationMap.containsKey(key)) {
					invoiceReconcilationTemp = invoiceReconcilationMap.get(key);
					invoiceReconcilationTemp.add(inv);
				} else {
					invoiceReconcilationTemp = new ArrayList<ProduceLoadListInfo>();
					invoiceReconcilationTemp.add(inv);
				}
				invoiceReconcilationMap.put(key, invoiceReconcilationTemp);
			}
		}
		return invoiceReconcilationMap;
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
			System.out.println(Constants.EXCEPTION +"__"+ e);

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
}
