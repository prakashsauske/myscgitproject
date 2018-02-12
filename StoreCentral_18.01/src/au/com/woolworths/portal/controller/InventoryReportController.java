
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.InventoryReportResult;
import au.com.woolworths.portal.model.SubReportInfo;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InventoryReportParam;
import au.com.woolworths.portal.param.InventorySubReportInfo;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.ReportGlobalVariables;
import au.com.woolworths.portal.service.ReportServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xlki1
 * a
 */
@Controller
@RequestMapping(value = "*/inventoryReport")
@Scope("session")
public class InventoryReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportInventory']}")
	private String screenCode;

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['inventoryReportName']}")
	private String inventoryReportName = null;
	
	@Value("#{properties['inventorySubReportAll']}")
	private String inventorySubReportAll = null;
	
	@Value("#{properties['inventorySubReportFacing']}")
	private String inventorySubReportFacing = null;
	
	@Value("#{properties['inventorySubReportMPL']}")
	private String inventorySubReportMPL = null;	
	
	@Value("#{properties['inventorySubReportSOH']}")
	private String inventorySubReportSOH = null;	
	
	@Value("#{properties['inventorySubReportMPLFac']}")
	private String inventorySubReportMPLFac = null;
	
	@Value("#{properties['inventorySubReportSOHFac']}")
	private String inventorySubReportSOHFac = null;
	
	@Value("#{properties['inventorySubReportSOHMPL']}")
	private String inventorySubReportSOHMPL = null;
	
	@Value("#{properties['inventorySubReport']}")
	private String inventorySubReport = null;
	
	private InventoryReportParam inventoryReportsResultsGlobal;

	private ModelMap model;
	
	private byte[] pdfArray = null;

	@RequestMapping(value = "/loadInventoryReport.htm", method = RequestMethod.GET)
	public ModelAndView loadInventoryReport(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("ReportInventory");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printReportInventoryPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportInventoryPDF(
			@RequestBody InventoryReportParam inventoryReportsResults,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		inventoryReportsResultsGlobal=inventoryReportsResults;
		
		
		return CommonUtils.convertObjectTojson("success");

	}
	private boolean genPdf(HttpServletRequest request){
		InventoryReportParam inventoryReportsResults=inventoryReportsResultsGlobal;
		try{
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();	
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();
		
		Collections.sort(inventoryReportsResults.getResultList(), new CustomComparator());
		
		ArrayList<InventorySubReportInfo> mainList = null;
		InventorySubReportInfo mainData = new InventorySubReportInfo();

		mainData.setDataList(inventoryReportsResults.getResultList());				
		mainList = new ArrayList<InventorySubReportInfo>();
		mainList.add(mainData);
		ReportGlobalVariables.GROUP_BY_VALUE = inventoryReportsResults.getGroupByValue();
		reportInputParams.put("reportFor", inventoryReportsResults.getReportFor());
		reportInputParams.put("storeNo", inventoryReportsResults.getStoreNo());
		reportInputParams.put("storeName", inventoryReportsResults.getStoreName());
		reportInputParams.put("facingFlag", inventoryReportsResults.getFacingFlag());
		reportInputParams.put("sohFlag", inventoryReportsResults.getSohFlag());
		reportInputParams.put("mplFlag", inventoryReportsResults.getMplFlag());
		reportInputParams.put("totalCount", inventoryReportsResults.getTotalCount());//To display total articles		
		reportInputParams.put("SUBREPORT_NAME", findInventorySubReportName(inventoryReportsResults.getFacingFlag(), 
					inventoryReportsResults.getSohFlag(), inventoryReportsResults.getMplFlag()));//dynamic sub report name
		System.out.println("sub report :=="+findInventorySubReportName(inventoryReportsResults.getFacingFlag(), 
					inventoryReportsResults.getSohFlag(), inventoryReportsResults.getMplFlag()));
		JasperParamsBean bean = new JasperParamsBean(inventoryReportName,
				new JRBeanCollectionDataSource(mainList), reportInputParams, 1);
		beanList.add(bean);

		/*byte[] byos =  jasper.printReport(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request),
				jasperRptResponseHandler.getReportBinPath(request))
				.toByteArray();*/
		byte[] byos = null;
		try {
			byos = jasper.printReportTimeZone(beanList, "pdf", jasperRptResponseHandler.getReportSourcePath(request),

					jasperRptResponseHandler.getReportBinPath(request), request).toByteArray();
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		 pdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
			return false;
		}
		return true;
	}
	@ResponseBody
	@RequestMapping(value = "/downloadInventoryReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadInventoryReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		genPdf(request);
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}
	
	/*@Override
	public String formUrlParam(MandatoryReportParam param) {
		// TODO Auto-generated method stub
		return null;
	}*/
	
	public String findInventorySubReportName(String facingFlag,String sohFlag,String mplFlag){
		String inventorySubReportName = inventorySubReport;
		try {
			if(facingFlag.equals("true") && sohFlag.equals("true") && mplFlag.equals("true")){
				inventorySubReportName = inventorySubReportAll;
			}else if(facingFlag.equals("true") && sohFlag.equals("true") && mplFlag.equals("false")){
				inventorySubReportName = inventorySubReportSOHFac;
			}else if(facingFlag.equals("true") && sohFlag.equals("false") && mplFlag.equals("true")){
				inventorySubReportName = inventorySubReportMPLFac;
			}else if(facingFlag.equals("false") && sohFlag.equals("true") && mplFlag.equals("true")){
				inventorySubReportName = inventorySubReportSOHMPL;
			}else if(facingFlag.equals("true")){
				inventorySubReportName = inventorySubReportFacing;
			}else if(sohFlag.equals("true")){
				inventorySubReportName = inventorySubReportSOH;
			}else if(mplFlag.equals("true")){
				inventorySubReportName = inventorySubReportMPL;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return inventorySubReportName;
	}
	
	public class CustomComparator implements Comparator<InventoryReportResult> {
	    @Override
	    public int compare(InventoryReportResult subCate1, InventoryReportResult subCate2) {
	        return subCate1.getDept_name().compareTo(subCate2.getDept_name());
	    }
	}

}
