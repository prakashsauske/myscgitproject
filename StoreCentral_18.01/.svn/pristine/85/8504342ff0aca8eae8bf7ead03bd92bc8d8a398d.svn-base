/**
 * 
 */
package au.com.woolworths.portal.controller;

import java.util.ArrayList;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoresNearByModel;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.StockTransferParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.StoreSearchServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */

@Controller
@RequestMapping(value = "*/common")
@Scope("session")
public class CommonInfoController extends BaseController {

	@Autowired
	private OrderServiceImpl orderService;

	@Autowired
	private StoreSearchServiceImpl storeService;

	@RequestMapping(value = "/verifyStore.htm", method = RequestMethod.POST)
	@ResponseBody
	public String verifyStore(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		System.out.println("method start of verify store ");

		System.out.println("storeId::::" + request.getParameter("storeId"));
		ArrayList<Store> storeList = null;
		String siteNo = request.getParameter("storeId");

		try {
			storeList = storeService.getStoreDetails("", "", siteNo,user);
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("method start of verify store ");
		return Constants.convertToJsonString(storeList);

	}

	@RequestMapping(value = "/getNearbyStoreSearch.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getNearbyStoreSearch(
			@ModelAttribute StockTransferParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		System.out.println("method start of getNearbyStoreSearch ");

		System.out.println("getSalesOrg::::" + param.getSalesOrg());
		String[] salesOrg = new String[1];
		salesOrg[0] = param.getSalesOrg();
		List<StoresNearByModel> storeList = null;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			storeList = orderService.getStoresNearBy(salesOrg,
					param.getDistance(), param.getMaxStores(),
					param.getSiteNo(),user);
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("method end of getNearbyStoreSearch ");
		return Constants.convertToJsonString(storeList);

	}

	@RequestMapping(value = "/getWareHouseList.htm", method = RequestMethod.POST)
	@ResponseBody
	public String getWareHouseList(@ModelAttribute StockTransferParam param,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}

		System.out.println("method start of getWareHouseList ");

		System.out.println("storeId::::" + param.getSiteNo());
		//String[] salesOrg = new String[1];
		//salesOrg[0] = param.getSalesOrg();
		List<SupplierModel> wareHouseList = null;
		UserContext user = ((UserContext) request.getSession().getAttribute("user"));
		try {
			wareHouseList = orderService.getSupplierLists(param.getSiteNo(),user);
		} catch (Exception e) {
			e.printStackTrace();
		}

		System.out.println("method end of getWareHouseList store ");
		return Constants.convertToJsonString(wareHouseList);

	}
}
