/**
Controller used for order enquiry, create warehouse orders, preq enquiry
 * 
 */
package au.com.woolworths.portal.controller;

/*import java.io.FileOutputStream;*/
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.AllocationOrderSearchDtl;
import au.com.woolworths.portal.model.DeliveryData;
import au.com.woolworths.portal.model.GRArticle;
import au.com.woolworths.portal.model.GoodReceiptDetailforPO;
import au.com.woolworths.portal.model.InvoiceDetailsforPO;
import au.com.woolworths.portal.model.OrderDetailItem;
import au.com.woolworths.portal.model.OrderType;
import au.com.woolworths.portal.model.POrderDetails;
import au.com.woolworths.portal.model.PReqDetails;
import au.com.woolworths.portal.model.PReqItemData;
import au.com.woolworths.portal.model.SalesOrgModel;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.param.ReceiveParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.service.AllocationSearchServiceImpl;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.OrderServiceImpl;
import au.com.woolworths.portal.service.POrderDetailsServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;


/*import java.io.OutputStream;*/
/*import javax.xml.bind.DatatypeConverter;

 import org.apache.poi.ss.usermodel.ClientAnchor;
 import org.apache.poi.ss.usermodel.CreationHelper;
 import org.apache.poi.ss.usermodel.Drawing;
 import org.apache.poi.ss.usermodel.Picture;
 import org.apache.poi.ss.usermodel.Sheet;
 import org.apache.poi.ss.usermodel.Workbook;
 import org.apache.poi.xssf.usermodel.XSSFWorkbook;*/

/**
 * @author xrca4
 * 
 */

@Controller
@RequestMapping(value = "*/allocation")
public class AllocationOrderSearchController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['EnquiryCentral']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	@Autowired
	private AllocationSearchServiceImpl allocationService;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private POrderDetailsServiceImpl porderService;

	@Autowired
	private OrderServiceImpl orderService;

	private static final Logger LOGGER = Logger
			.getLogger(AllocationOrderSearchController.class.getName());
	
	private UserContext userDetail = null;

	private Map<String, List<AllocationOrderSearchDtl>> allocationOrderSearchMap;

	// private Map<String, List<PReqItemData>> preqItemDataMap;

	private ModelMap model = null;

	Gson gson = new Gson();

	// private List<InvoiceDetailsforPO> invoiceDetailsforPO = null;

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
		String fromDate = request.getParameter("delvFromDate");
		if( fromDate ==null || fromDate.isEmpty()){
			if(user.getUserAccessMap().containsKey(screenCode)){
				if((user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
					return new ModelAndView("noAccess");
				}

			}
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
				
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		setOrderType();
		setSalesOrg();
		model.addAttribute("delvFromDate", request.getParameter("delvFromDate"));
		model.addAttribute("delvToDate", request.getParameter("delvToDate"));
		ModelAndView modelAndView = new ModelAndView("allocationOrderSearch");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	/*
	 * @RequestMapping(value = "/convertToExcel.htm", method =
	 * RequestMethod.POST) public void convertToExcel(HttpServletRequest
	 * request, HttpServletResponse response) throws Exception {
	 * 
	 * OutputStream out = null; byte[] data = null; String contentType =
	 * "application/vnd.ms-excel";
	 * 
	 * response.setContentType(contentType);
	 * response.setHeader("Content-Disposition",
	 * "attachment;filename=myExcel.xlsx"); out = response.getOutputStream();
	 * String param = request.getParameter("convertToExcel");
	 * 
	 * System.out.println("param__" + param);
	 * 
	 * 
	 * data = DatatypeConverter.parseBase64Binary(param);
	 * 
	 * System.out.println("data" + data); try { OutputStream stream = new
	 * FileOutputStream("c:/abc.bmp"); stream.write(data); stream.close(); }
	 * catch (Exception e) { e.printStackTrace(); }
	 * 
	 * Workbook wb = new XSSFWorkbook(); Sheet sheet =
	 * wb.createSheet("My Sample Excel");
	 * 
	 * int pictureIdx = wb.addPicture(data, Workbook.PICTURE_TYPE_PNG);
	 * 
	 * CreationHelper helper = wb.getCreationHelper();
	 * 
	 * Drawing drawing = sheet.createDrawingPatriarch();
	 * 
	 * ClientAnchor anchor = helper.createClientAnchor();
	 * 
	 * anchor.setCol1(1); anchor.setRow1(2);
	 * 
	 * Picture pict = drawing.createPicture(anchor, pictureIdx);
	 * 
	 * pict.resize();
	 * 
	 * wb.write(out); out.flush(); out.close();
	 * 
	 * }
	 */

	@RequestMapping(value = "/getOrderDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getOrderDetails(@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());

		param.setInvoiceInfo(getInvoiceDetails(param, request, response));
		param.setItemInfo(getOrderItemDetails(param, request, response));
		param.setDeliveryInfo(getDeliveryData(param, request, response));

		return convertOrderDetailsTojson(param, param.getMsg());

	}
	

	@RequestMapping(value = "/getGrInfoDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getGrInfoDetails(@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		param.setGrInfo(getGrInfo(param, request, response));
		return convertOrderDetailsTojson(param, param.getMsg());
	}
	
	

	@RequestMapping(value = "/getInvoiceOrderDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getInvoiceOrderDetails(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		String orderNo = null;
		if (param == null) {
			param = new AllocationOrderSearchParam();
		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		orderNo = ((String) request.getSession().getAttribute("orderNo"));
		if (orderNo == null) {
			return convertOrderDetailsTojson(param, Constants.TECHNICAL_ISSUE);
		}

		param.setSiteNo(userDetail.getSiteNo());
		param.setOrderNo(orderNo);
		param.setSiteNo(userDetail.getSiteNo());
		param.setOrderNo(orderNo);
		// param.setSiteNo("0156");
		// param.setOrderNo("0080007640");
		param.setInvoiceInfo(getInvoiceDetails(param, request, response));
		param.setItemInfo(getOrderItemDetails(param, request, response));
		param.setGrInfo(getGrInfo(param, request, response));
		param.setDeliveryInfo(getDeliveryData(param, request, response));

		return convertOrderDetailsTojson(param, param.getMsg());

	}

	@RequestMapping(value = "/getPreqDtls.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPreqDtls(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());

		param.setItemInfo(getPReqOrderItem(param, request, response));

		return convertOrderDetailsTojson(param, param.getMsg());

	}

	private String convertOrderDetailsTojson(AllocationOrderSearchParam param,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, param); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */

		String listStr = "[]";
		if (param != null) {
			listStr = gson.toJson(param);
			System.out.println("Converted json list object " + listStr);
		}
		System.out.println("Converted listStr " + listStr);
		return "{\"data\":" + listStr + ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/getInvoiceDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getInvoiceDetails(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());

		List<InvoiceDetailsforPO> invoiceDetail = null;

		try {
			invoiceDetail = new ArrayList<InvoiceDetailsforPO>();

			invoiceDetail = porderService.getInvoiceDetails(param,userDetail);
			if (param.getMsg() != null && param.getMsg().equals("")
					&& invoiceDetail == null)
				param.setMsg(Constants.NDF);

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		return convertInvoiceDtlTojson(invoiceDetail, param.getMsg());

	}

	@RequestMapping(value = "/getGrAtricles.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getGrAtricles(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());

		List<GRArticle> grArticleDtl = null;

		try {
			grArticleDtl = new ArrayList<GRArticle>();

			grArticleDtl = porderService.getGrAticles(param,userDetail);
			if (param.getMsg() != null && param.getMsg().equals("")
					&& grArticleDtl == null)
				param.setMsg(Constants.NDF);

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		return convertGRArticleDtllTojson(grArticleDtl, param.getMsg());

	}

	private String convertGRArticleDtllTojson(List<GRArticle> grArticleDtl,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, grArticleDtl); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */

		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
		return "{\"data\":" + Constants.convertToJsonString(grArticleDtl)
				+ ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/getOrderItemDetails.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getOrderItemDetails(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		List<OrderDetailItem> getOrderItem = null;

		try {
			getOrderItem = new ArrayList<OrderDetailItem>();

			getOrderItem = porderService.getOrderItemDtls(param,userDetail);
			if (param.getMsg() != null && param.getMsg().equals("")
					&& getOrderItem == null)
				param.setMsg(Constants.NDF);

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		return convertOrderItemDtlTojson(getOrderItem, param.getMsg());

	}

	@RequestMapping(value = "/getGrInfo.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getGrInfo(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}

		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		List<GoodReceiptDetailforPO> goodReceitpDetail = null;
		param.setSiteNo(userDetail.getSiteNo());

		try {

			goodReceitpDetail = new ArrayList<GoodReceiptDetailforPO>();
			goodReceitpDetail = porderService.getGoodReceiptDetails(param,userDetail);
			if (param.getMsg() != null && param.getMsg().equals("")
					&& goodReceitpDetail == null)
				param.setMsg(Constants.NDF);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		return convertGoodReceiptDtlTojson(goodReceitpDetail, param.getMsg());

	}

	@RequestMapping(value = "/getDeliveryData.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getDeliveryData(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}

		List<DeliveryData> deliveryData = null;
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		try {
			deliveryData = porderService.getDeliveryData(param,userDetail);
			if (param.getMsg() != null && param.getMsg().equals("")
					&& deliveryData == null)
				param.setMsg(Constants.NDF);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		return convertDeliveryDataTojson(deliveryData, param.getMsg());
	}

	private void convertAllocationListToMap(
			List<AllocationOrderSearchDtl> allocationOrderSearchDtlList,
			AllocationOrderSearchParam param) {
		String key = "";
		List<AllocationOrderSearchDtl> tempAllocationList = null;
		if (allocationOrderSearchDtlList != null
				&& allocationOrderSearchDtlList.size() > 0) {
			allocationOrderSearchMap = new LinkedHashMap<String, List<AllocationOrderSearchDtl>>();
			for (AllocationOrderSearchDtl allocationOrderSearchDtl : allocationOrderSearchDtlList) {
				key = allocationOrderSearchDtl.getAllocationNo();
				if (allocationOrderSearchMap.containsKey(key)) {
					tempAllocationList = allocationOrderSearchMap.get(key);
					tempAllocationList.add(allocationOrderSearchDtl);
				} else {
					tempAllocationList = new ArrayList<AllocationOrderSearchDtl>();
					tempAllocationList.add(allocationOrderSearchDtl);
				}
				allocationOrderSearchMap.put(key, tempAllocationList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
	}

	/*
	 * private void convertPReqItemListToMap(List<PReqItemData>
	 * preqItemdataList, AllocationOrderSearchParam param) { String key = "";
	 * List<PReqItemData> tempAllocationList = null; if (preqItemdataList !=
	 * null && preqItemdataList.size() > 0) { preqItemDataMap = new
	 * LinkedHashMap<String, List<PReqItemData>>(); for (PReqItemData preqItem :
	 * preqItemdataList) { key = preqItem.getIvPReqNo(); if
	 * (preqItemDataMap.containsKey(key)) { tempAllocationList =
	 * preqItemDataMap.get(key); tempAllocationList.add(preqItem); } else {
	 * tempAllocationList = new ArrayList<PReqItemData>();
	 * tempAllocationList.add(preqItem); } preqItemDataMap.put(key,
	 * tempAllocationList); } } else { if (param.getMsg() != null &&
	 * param.getMsg().equals("")) param.setMsg(Constants.NDF); } }
	 */
	private String convertAllocationDtlTojson(
			Map<String, List<AllocationOrderSearchDtl>> allocationOrderSearchMap,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, allocationOrderSearchMap); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */
		return "{\"data\":"
				+ Constants.convertToJsonString(allocationOrderSearchMap)
				+ ",\"msg\":\"" + msg + "\"}";
		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	private String convertOrderItemDtlTojson(
			List<OrderDetailItem> orderDtlItem, String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, orderDtlItem); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */
		return "{\"data\":" + Constants.convertToJsonString(orderDtlItem)
				+ ",\"msg\":\"" + msg + "\"}";
		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	private String convertPReqItemDtlTojson(List<PReqItemData> preqItemData,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, preqItemData); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */

		return "{\"data\":" + Constants.convertToJsonString(preqItemData)
				+ ",\"msg\":\"" + msg + "\"}";

		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	private String convertDeliveryDataTojson(List<DeliveryData> deliveryData,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, deliveryData); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */

		return "{\"data\":" + Constants.convertToJsonString(deliveryData)
				+ ",\"msg\":\"" + msg + "\"}";

		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	private String convertInvoiceDtlTojson(List<InvoiceDetailsforPO> invoicePO,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, invoicePO); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */

		return "{\"data\":" + Constants.convertToJsonString(invoicePO)
				+ ",\"msg\":\"" + msg + "\"}";
		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	private String convertGoodReceiptDtlTojson(
			List<GoodReceiptDetailforPO> goodReceiptPO, String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, goodReceiptPO); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */
		return "{\"data\":" + Constants.convertToJsonString(goodReceiptPO)
				+ ",\"msg\":\"" + msg + "\"}";

		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/getPOrderDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPOrderDtl(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		List<POrderDetails> pOrderDtl = null;
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());

		try {
			pOrderDtl = porderService.getPOrderDtls(param,userDetail);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
		}

		if (pOrderDtl == null) {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}

		return convertOrderDtlTojson(pOrderDtl, param.getMsg());
	}

	@RequestMapping(value = "/invoiceDetailsforPO.htm", method = RequestMethod.GET)
	public ModelAndView invoiceDetailsforPO(HttpServletRequest request,
			HttpServletResponse response, AllocationOrderSearchParam param) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));

		}
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));

		try {
			// invoiceDetailsforPO = porderService.getInvoiceDetails(param);
		} catch (Exception e) {
			LOGGER.info("Exeption throw:", e);
		}

		ModelAndView modelAndView = new ModelAndView("articleDtl");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	private String convertOrderDtlTojson(List<POrderDetails> pOrderDtl,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, pOrderDtl); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * System.out.println("stw.toString()__" + stw.toString());
		 */
		return "{\"data\":" + Constants.convertToJsonString(pOrderDtl)
				+ ",\"msg\":\"" + msg + "\"}";
	}

	private void setOrderType() {

		ArrayList<OrderType> orderTypes = new ArrayList<OrderType>();

		OrderType type1 = new OrderType("ZY", "PReq (Draft)");
		OrderType type10 = new OrderType("VENDOR", "Vendor Order");
		OrderType type16 = new OrderType("WAREHOUSE", "Warehouse Order");
		OrderType type11 = new OrderType("IBT ALL", "Retail STO (IBT All)");
		OrderType type12 = new OrderType("IBT IN", "Retail STO (IBT In)");
		OrderType type13 = new OrderType("IBT OUT", "Retail STO (IBT Out)");
		OrderType type14 = new OrderType("ALC", "Allocation");
		/* OrderType type15 = new OrderType("PLO", "Planned Order"); */

		orderTypes.add(type1);
		// orderTypes.add(type2);
		orderTypes.add(type10);
		orderTypes.add(type11);
		orderTypes.add(type12);
		orderTypes.add(type13);
		orderTypes.add(type14);
		// orderTypes.add(type15);
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

				supplierList = articleService.getVendorList(vendorName,
						maxRows, vendorNo, siteNo,userDetail);
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
						maxRows, vendorNo,userDetail);
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

	@RequestMapping(value = "/getPReqDetail.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPReqDetail(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		List<PReqDetails> preqDetails = null;
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());

		try {
			preqDetails = porderService.getPreqDetails(param,userDetail);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		// convertPReqDetailListToMap(preqDetails, param);
		if (preqDetails == null) {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}

		return convertPReqDtlTojson(preqDetails, param.getMsg());
	}

	private String convertPReqDtlTojson(List<PReqDetails> preqDetails,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, preqDetails); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */
		return "{\"data\":" + Constants.convertToJsonString(preqDetails)
				+ ",\"msg\":\"" + msg + "\"}";
		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}

	@RequestMapping(value = "/getAllocationDtl.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getAllocationDtl(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		List<AllocationOrderSearchDtl> allocationOrderSearchDtl = null;
		model = new ModelMap();
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		try {
			allocationOrderSearchDtl = allocationService
					.getAllocationOrderSearchDtls(param,userDetail);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		convertAllocationListToMap(allocationOrderSearchDtl, param);

		return convertAllocationDtlTojson(allocationOrderSearchMap,
				param.getMsg());
	}

	@RequestMapping(value = "/getPReqOrderItem.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getPReqOrderItem(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}

		List<PReqItemData> preqItemData = null;
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		try {
			preqItemData = porderService.getPReqItemDetails(param,userDetail);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
		}

		// convertPReqItemListToMap(preqItemData, param);

		return convertPReqItemDtlTojson(preqItemData, param.getMsg());
	}

	@RequestMapping(value = "/saveVendorClaimAuth.htm", method = RequestMethod.POST)
	@ResponseBody
	public String saveVendorClaimAuth(
			@ModelAttribute("viewQuery") ReceiveParam param,
			HttpServletRequest request, HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		String status = "";
		try {
			status = orderService.getVendorClaims(param,userDetail);
		} catch (Exception e) {
			LOGGER.info(Constants.EXCEPTION + e);
			status = (status != null && status.equals("")) ? "false" : status;
		}
		if (status == null) {
			status = "true";
			return status;
		} else {
			return status;
		}
	}

	@RequestMapping(value = "/getSegmentDeliveryDtls.htm", method = RequestMethod.GET)
	@ResponseBody
	public String getSegmentDeliveryDtls(
			@ModelAttribute("viewQuery") AllocationOrderSearchParam param,
			HttpServletRequest request, HttpServletResponse response) {

		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";

		}
		userDetail = ((UserContext) request.getSession().getAttribute("user"));
		param.setSiteNo(userDetail.getSiteNo());
		List<OrderDetailItem> getSegmentDeliveryDtl = null;

		try {
			getSegmentDeliveryDtl = new ArrayList<OrderDetailItem>();

			getSegmentDeliveryDtl = porderService.getSegmentDeliveryDtls(param,userDetail);
			if (param.getMsg() != null && param.getMsg().equals("")
					&& getSegmentDeliveryDtl == null)
				param.setMsg(Constants.NDF);

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION + e);
			param.setMsg(Constants.TECHNICAL_ISSUE);
		}

		return convertOrderItemDtlTojson(getSegmentDeliveryDtl, param.getMsg());

	}

	
	@RequestMapping(value = "/verifyVendor.htm", method = RequestMethod.GET)
	@ResponseBody
	public String verifyVendor(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String siteNo = ((UserContext) request.getSession()
				.getAttribute("user")).getSiteNo();
		String maxRows = "0";
		String vendorNo = (String) request.getParameter("vendorNo");
		String vendorName = (String) request.getParameter("vendorName");

		ArrayList<Vendor> supplierList;


				try {
					supplierList = articleService.getVendorList(vendorName,
							maxRows, vendorNo, siteNo,userDetail);
					if (supplierList != null && supplierList.size() > 0)
						return convertVendorListTojson(supplierList,"");
					else
						supplierList = new ArrayList<Vendor>();

					
					return convertVendorListTojson(supplierList,"");
				} catch (Exception e) {
					e.printStackTrace();
					return null;
				}


	}
	
	private String convertVendorListTojson(List<Vendor> vendorList,
			String msg) {

		/*
		 * ObjectMapper mapper = null; StringWriter stw = null; try { mapper =
		 * new ObjectMapper(); stw = new StringWriter(); final JsonGenerator
		 * jsonGenerator = mapper.getJsonFactory() .createJsonGenerator(stw);
		 * mapper.writeValue(jsonGenerator, preqDetails); } catch
		 * (JsonGenerationException e1) {
		 * 
		 * e1.printStackTrace(); } catch (JsonMappingException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); } catch (IOException e) {
		 * 
		 * LOGGER.error(Constants.EXCEPTION, e); }
		 * 
		 * LOGGER.info("stw.toString()__" + stw.toString());
		 */
		return "{\"data\":" + Constants.convertToJsonString(vendorList)
				+ ",\"msg\":\"" + msg + "\"}";
		// return "{\"data\":" + stw.toString() + ",\"msg\":\"" + msg + "\"}";
	}
	
}
