/**
 * 
 */
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.StringWriter;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.codehaus.jackson.JsonGenerationException;
import org.codehaus.jackson.JsonGenerator;
import org.codehaus.jackson.map.JsonMappingException;
import org.codehaus.jackson.map.ObjectMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.OrderType;
import au.com.woolworths.portal.model.POrderDetails;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.service.POrderDetailsServiceImpl;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xkaew
 *
 */
@Controller
@Scope("session")
@RequestMapping("*/orderDetails")
public class POrderDetailsController  extends BaseController {
	
	@Autowired
	private POrderDetailsServiceImpl porderService;

	private UserContext userDetail = null;

	private Map<String, List<POrderDetails>> porderDetailsMap;

	private ModelMap model = null;

	

	private void setOrderType() {

		ArrayList<OrderType> orderTypes = new ArrayList<OrderType>();

		OrderType type1 = new OrderType("ZY", "Normal Preq");
		OrderType type2 = new OrderType("ZX", "Preq at GR");
		OrderType type10 = new OrderType("ZNB", "Vendor Order");
		OrderType type16 = new OrderType("WOD", "Warehouse Order");
		OrderType type11 = new OrderType("ZUB", "Retail STO (IBT All)");
		OrderType type12 = new OrderType("ZUBIN", "Retail STO (IBT In)");
		OrderType type13 = new OrderType("ZUBOUT", "Retail STO (IBT Out)");
		OrderType type14 = new OrderType("ALC", "Allocations");
		OrderType type15 = new OrderType("PLO", "Planned Order");

		orderTypes.add(type1);
		orderTypes.add(type2);
		orderTypes.add(type10);
		orderTypes.add(type11);
		orderTypes.add(type12);
		orderTypes.add(type13);
		orderTypes.add(type14);
		orderTypes.add(type15);
		orderTypes.add(type16);
		model.addAttribute("orderTypes", orderTypes);

	}

	private void setSalesOrg() {

		ArrayList<SalesOrgModel> salesOrgTypes = new ArrayList<SalesOrgModel>();
		SalesOrgModel type11 = new SalesOrgModel("1005",
				"Woolworths Supermarkets");
		SalesOrgModel type1 = new SalesOrgModel("1010", "BWS");
		SalesOrgModel type2 = new SalesOrgModel("1015", "Dan Murphy's");
		SalesOrgModel type3 = new SalesOrgModel("1020", "Woolworths Petrol");
		SalesOrgModel type4 = new SalesOrgModel("1025", "Thomas Dux");
		SalesOrgModel type5 = new SalesOrgModel("1030", "New Small Stores");
		SalesOrgModel type6 = new SalesOrgModel("2010", "Countdown");
		SalesOrgModel type7 = new SalesOrgModel("2015", "Gull Petrol");
		SalesOrgModel type8 = new SalesOrgModel("2030",
				"NZ Distribution Centres");
		SalesOrgModel type9 = new SalesOrgModel("9050", "SuperValue");
		SalesOrgModel type10 = new SalesOrgModel("9060", "Fresh Choice");

		salesOrgTypes.add(type1);
		salesOrgTypes.add(type2);
		salesOrgTypes.add(type3);
		salesOrgTypes.add(type4);
		salesOrgTypes.add(type5);
		salesOrgTypes.add(type6);
		salesOrgTypes.add(type7);
		salesOrgTypes.add(type8);
		salesOrgTypes.add(type9);
		salesOrgTypes.add(type10);
		salesOrgTypes.add(type11);

		model.addAttribute("salesOrgTypes", salesOrgTypes);

	}

}
