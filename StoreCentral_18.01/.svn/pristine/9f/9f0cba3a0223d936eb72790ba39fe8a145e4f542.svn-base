package au.com.woolworths.portal.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.krysalis.barcode4j.ChecksumMode;
import org.krysalis.barcode4j.HumanReadablePlacement;
import org.krysalis.barcode4j.impl.int2of5.Interleaved2Of5Bean;
import org.krysalis.barcode4j.impl.upcean.EAN13Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;
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
import au.com.woolworths.portal.model.ManualOrderBookHdrDtl;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ManualOrderParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.ManualOrderBookServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

@Controller
@RequestMapping(value = "*/manualOrderBook")
@Scope("session")
public class ManualOrderBookController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['OrderBookReport']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	private ModelMap model;
	private UserContext userDetail;
	private String EXCEPTION = "Technical issue occurred. Please contact technical support.";
	ArrayList<ManualOrderBookHdrDtl> manualOrderBookHdrDtlList = null;
	ManualOrderParam manParam = null;
	private int REC_COUNT = 9;
	private Integer TOTAL_RECORDS;
	private Map<String, List<ManualOrderBookHdrDtl>> manualOrderBookHdrMap = null;

	@Autowired
	private ArticleServiceImpl articleService;

	@Autowired
	private ManualOrderBookServiceImpl manualOrderBookServiceImpl;
	
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['manualOrderBook']}")
	private String manualOrderBook = null;
 
	private byte[] pdfArray = null;
	private static final String BIGW_BANNER ="bigw";

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
		userDetail = (UserContext) request.getSession().getAttribute("user");
		try {

			String parent_node_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getManualOrderBookDeptDetails(parent_node_no, userDetail.getSalesOrg(),user);
			
			System.out.println("deptInfoList size::: " + deptInfoList.size());
			model.addAttribute("deptInfoList", deptInfoList);

		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}
		ModelAndView modelAndView = new ModelAndView("manualOrderBook");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}

	@RequestMapping(value = "/fetchDetails.htm", method = RequestMethod.GET)
	public void fetchDetails(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		/* Map<String, String> options = optionDAO.find(selectedValue); */

		List<Department> categoryInfoList = new ArrayList<Department>();

		String prod_no = request.getParameter("iv_parent_node");
		categoryInfoList = (ArrayList<Department>) articleService
				.fethHierarchyDetail(prod_no, userDetail.getSalesOrg(),userDetail);

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
					.fethHierarchyDetail(prod_no, userDetail.getSalesOrg(),userDetail);
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

	@RequestMapping(value = "/generateReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String generateReport(
			@ModelAttribute("orderBook") ManualOrderParam param, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		Map<String, List<ManualOrderBookHdrDtl>> manualOrderBookHdrMapTemp = null;
		param.setSiteNo(userDetail.getSiteNo());
		List<ManualOrderBookHdrDtl> manualOrderBookHdrDtlTempList = null;

		if (param.getPageNo() != null && param.getPageNo() != ""
				&& manualOrderBookHdrDtlList != null
				&& manualOrderBookHdrDtlList.size() > 0) {
			//System.out.println("pageNO" + param.getPageNo());
			int pageStart, pageEnd, recordCount, pageNo;
			recordCount = REC_COUNT;
			pageNo = Integer.parseInt(param.getPageNo());

			if (pageNo == 1)
				pageStart = 0;
			else
				pageStart = ((pageNo - 1) * recordCount) ;

			if ((pageNo * recordCount) > manualOrderBookHdrDtlList.size())
				pageEnd = manualOrderBookHdrDtlList.size();
			else
				pageEnd = pageNo * recordCount;

			//System.out.println("page Start __ page end " + pageStart + "__"
					//+ pageEnd);
			manualOrderBookHdrDtlTempList = new ArrayList<ManualOrderBookHdrDtl>();
			for (int i = pageStart; i < pageEnd; i++) {
				manualOrderBookHdrDtlList.get(i).setMsg(
						TOTAL_RECORDS.toString());
				manualOrderBookHdrDtlTempList.add(manualOrderBookHdrDtlList
						.get(i));
			}
			return convertManualOrderBookHdrListTojson(
					manualOrderBookHdrDtlTempList, "",
					manualOrderBookHdrDtlList.size());
		}
		/*
		 * else{ paramForPagination=param; }
		 */

		try {
			manParam = param;
			manualOrderBookHdrDtlList = manualOrderBookServiceImpl
					.getManualOrderBookDtls(param,userDetail);
			if (manualOrderBookHdrDtlList == null && param.getMsg() == null)
				param.setMsg(EXCEPTION);
			else if (manualOrderBookHdrDtlList != null
					&& manualOrderBookHdrDtlList.size() > 0) {

				manualOrderBookHdrMap = new LinkedHashMap<String, List<ManualOrderBookHdrDtl>>();

				TOTAL_RECORDS = Integer.parseInt(manualOrderBookHdrDtlList
						.get(0).getMsg().trim());

				String key = "";
				for (ManualOrderBookHdrDtl manualOrderBookHdrDtl : manualOrderBookHdrDtlList) {
					if (manualOrderBookHdrDtl.getSupplier() != null
							/*&& !manualOrderBookHdrDtl.getSupplier().trim()
									.equals("")*/) {
						key = manualOrderBookHdrDtl.getSupplier();
					}
					if (manualOrderBookHdrMap.containsKey(key)) {
						manualOrderBookHdrDtlTempList = manualOrderBookHdrMap
								.get(key);
						manualOrderBookHdrDtlTempList
								.add(manualOrderBookHdrDtl);
					} else {
						manualOrderBookHdrDtlTempList = new ArrayList<ManualOrderBookHdrDtl>();
						manualOrderBookHdrDtlTempList
								.add(manualOrderBookHdrDtl);
					}
					manualOrderBookHdrMap.put(key,
							manualOrderBookHdrDtlTempList);
				}

				if (manualOrderBookHdrMap != null
						&& manualOrderBookHdrMap.size() > 0) {

					manualOrderBookHdrDtlList = new ArrayList<ManualOrderBookHdrDtl>();

					for (Map.Entry<String, List<ManualOrderBookHdrDtl>> entry : manualOrderBookHdrMap
							.entrySet()) {
						manualOrderBookHdrDtlList.addAll(entry.getValue());
					}

					if (manualOrderBookHdrDtlList != null
							&& manualOrderBookHdrDtlList.size() > REC_COUNT) {

						manualOrderBookHdrDtlTempList = new ArrayList<ManualOrderBookHdrDtl>();
						for (int i = 0; i < REC_COUNT; i++) {
							manualOrderBookHdrDtlTempList
									.add(manualOrderBookHdrDtlList.get(i));
						}
						return convertManualOrderBookHdrListTojson(
								manualOrderBookHdrDtlTempList, "",
								manualOrderBookHdrDtlList.size());

					} else {
						return convertManualOrderBookHdrListTojson(
								manualOrderBookHdrDtlList, "",
								manualOrderBookHdrDtlList.size());
					}

				}
				param.setMsg("");
			}
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(EXCEPTION);
		}

		return convertManualOrderBookHdrListTojson(manualOrderBookHdrDtlList,
				param.getMsg(), manualOrderBookHdrDtlList!=null && manualOrderBookHdrDtlList.size()>0 ? manualOrderBookHdrDtlList.size() : 0);

	}

	@RequestMapping(value = "/printReport.htm", method = RequestMethod.GET)
	@ResponseBody
	public String printReport(
			@ModelAttribute("orderBook") ManualOrderParam param,
			BindingResult result, HttpServletRequest request,
			HttpServletResponse response) {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return "";
		}
		return convertManualOrderBookHdrListTojson(manualOrderBookHdrDtlList,
				"", manualOrderBookHdrDtlList.size());

	}

	private String convertManualOrderBookHdrListTojson(
			List<ManualOrderBookHdrDtl> manualOrderBookHdrDtlTempList,
			String msg, int count) {

		/*ObjectMapper mapper = null;
		StringWriter stw = null;
		try {
			mapper = new ObjectMapper();
			stw = new StringWriter();
			final JsonGenerator jsonGenerator = mapper.getJsonFactory()
					.createJsonGenerator(stw);

			mapper.writeValue(jsonGenerator, manualOrderBookHdrDtlTempList);
		} catch (JsonGenerationException e1) {

			e1.printStackTrace();
		} catch (JsonMappingException e) {

			e.printStackTrace();
		} catch (IOException e) {

			e.printStackTrace();
		}*/

		//System.out.println("stw.toString()" + stw.toString());

		return "{\"data\":" +  Constants.convertToJsonString(manualOrderBookHdrDtlTempList) + ",\"msg\":\"" + msg
				+ "\",\"count\":" + count + "}";
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printManualOrderBookReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printManualOrderBookReportPDF(
			ManualOrderParam param, HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		
		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");
		
		ArrayList<ManualOrderBookHdrDtl> manualOrderBookList= new ArrayList<ManualOrderBookHdrDtl>();

		for(ManualOrderBookHdrDtl orderBookObj : manualOrderBookHdrDtlList)
		{
			manualOrderBookList.add((ManualOrderBookHdrDtl) orderBookObj.clone());
		}
		
		for(ManualOrderBookHdrDtl orderBookObj : manualOrderBookList)
		{
			orderBookObj.setLogo(generateBarcode(orderBookObj.getBarcode()));;
		}
		
		ManualOrderParam manualOrderParam = manParam;
			pdfArray = getPrintContent(manualOrderParam.getDepName(),
					manualOrderParam.getCatName(), convertArrayToString(manualOrderParam.getSubcatName()),
					manualOrderBook,
					reportRealPath, request,manualOrderBookList);			
		return CommonUtils.convertObjectTojson("success");

	}

	private byte[] getPrintContent(String department, String category,
			String subCategory, String fileName, String binPath, HttpServletRequest request,ArrayList<ManualOrderBookHdrDtl> manualOrderBookList) {
		// location = barcode;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();
		byte[] byos = null;
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		System.out.println("jasper object creating ");
		JasperReportUtil jasper = new JasperReportUtil();
		System.out.println("jasper object created ");
		try {
			reportInputParams.put("StoreNo", user.getSiteNo());
			reportInputParams.put("StoreName", user.getSiteName());
			reportInputParams.put("department", department);
			reportInputParams.put("category", category);
			reportInputParams.put("subCategory", subCategory);
			JasperParamsBean bean = new JasperParamsBean(fileName,
					new JRBeanCollectionDataSource(manualOrderBookList), reportInputParams, 1);
			beanList.add(bean);
			
			System.out.println("jasper printe method calling ");
			try {
				byos = jasper
						.printReport(
								beanList,
								"pdf",
								jasperRptResponseHandler
										.getReportSourcePath(request),
								jasperRptResponseHandler.getReportBinPath(request)).toByteArray();
			} catch (Throwable e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
			System.out.println("jasper printe method called");

			/*
			 * FileOutputStream fo = new FileOutputStream("c:\\claims.pdf");
			 * fo.write(byos); fo.close();
			 */

		} catch (Exception e) {
			// TODO: handle exception
			e.printStackTrace();
		}
		return byos;
	}

	public static BufferedImage generateBarcode(String codeDigits)
			throws IOException {
		// ByteArrayOutputStream out = new ByteArrayOutputStream();
		BitmapCanvasProvider canvas = null;
		BufferedImage img = null;
			Interleaved2Of5Bean bean = null;
			
			try {
				// Create the barcode bean
					bean = new Interleaved2Of5Bean();
				final int dpi = 120;

				// Configure the barcode generator
				bean.setModuleWidth(UnitConv.in2mm(1.0f / dpi));
				bean.doQuietZone(false);
				bean.setChecksumMode(ChecksumMode.CP_AUTO);
				bean.setMsgPosition(HumanReadablePlacement.HRP_BOTTOM);

				// Set up the canvas provider for monochrome PNG output
				canvas = new BitmapCanvasProvider(// out,"image/x-png",
						dpi, BufferedImage.TYPE_BYTE_BINARY, false, 0);

				// Generate the barcode
				bean.generateBarcode(canvas, codeDigits);

				img = canvas.getBufferedImage();
				// Signal end of generation

				canvas.finish();
			} catch (Exception e) {
				e.printStackTrace();
			}

		
		return img;
	}

	@ResponseBody
	@RequestMapping(value = "/downloadManualOrderBookPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(@ModelAttribute("orderBook") ManualOrderParam param,HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			printManualOrderBookReportPDF(param, request, response);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}

	private String convertArrayToString(String[] subCategoryList)
	{
		StringBuilder sb = new StringBuilder();
		for (String n : subCategoryList) { 
		    if (sb.length() > 0) sb.append(',');
		    sb.append(n);
		}
		return sb.toString();
	}

}