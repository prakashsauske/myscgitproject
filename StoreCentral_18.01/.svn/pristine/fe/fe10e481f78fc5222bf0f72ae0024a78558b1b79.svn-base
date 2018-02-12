package au.com.woolworths.portal.controller;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;
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

import com.jcraft.jsch.Logger;

import au.com.woolworths.portal.model.AcceptancePrintResult;
import au.com.woolworths.portal.model.ClaimsPrintResult;
import au.com.woolworths.portal.param.AcceptanceNotePrintParam;
import au.com.woolworths.portal.param.AcceptanceNotePrintParam;

import au.com.woolworths.portal.param.claimsPrintParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xprnx a
 */
@Controller
@RequestMapping(value = "*/claimsPrint")
@Scope("session")
public class RtvClaimsPrintController extends BaseController {

	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['claimNotePrintName']}")
	private String claimNotePrintName = null;
	
	@Value("#{properties['cartonLblPrintName']}")
	private String cartonLblPrintName = null;

	@Value("#{properties['acceptancePrintName']}")
	private String acceptancePrintName = null;

	private byte[] claimPdfArray = null;

	private byte[] cartonPdfArray = null;

	private byte[] pdfArray = null;
	private ModelMap model;

	@RequestMapping(method = RequestMethod.POST, value = "/printClaimNotePDF.htm", consumes = "application/json")
	@ResponseBody
	public String printClaimNotePDF(
			@RequestBody claimsPrintParam claimsPrintParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();		
		List<ClaimsPrintResult> claimsPrintResultList = null;		
		claimsPrintResultList = claimsPrintParam.getResultList();
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(claimsPrintResultList);

		try{
			
			String reportRealPath = request.getSession().getServletContext()
					.getRealPath("");
			
		//reportInputParams.put("reportResult", inventoryReportsResults.getResultList());
		reportInputParams.put("calimNo", claimsPrintParam.getClaimNo());
		reportInputParams.put("claimDate", claimsPrintParam.getClaimDate());
		//reportInputParams.put("claimDate", "02/02/1777");
		reportInputParams.put("claimReason", claimsPrintParam.getClaimReason());
		reportInputParams.put("createdBy", claimsPrintParam.getCreatedBy());
		reportInputParams.put("finalisedBy", claimsPrintParam.getFinalisedBy());
		reportInputParams.put("finalisedDate", claimsPrintParam.getFinalisedDate());
		reportInputParams.put("cancelledBy", claimsPrintParam.getCancelledBy());
		reportInputParams.put("cancelledDate", claimsPrintParam.getCancelledDate());
		reportInputParams.put("toVendorName", claimsPrintParam.getToVendorName());
		reportInputParams.put("toVendorStreetName", claimsPrintParam.getToVendorStreetName());
		reportInputParams.put("toVendorStrName2", claimsPrintParam.getToVendorStrName2());
		reportInputParams.put("fromStoreName", claimsPrintParam.getFromStoreName());
		reportInputParams.put("fromStreetName", claimsPrintParam.getFromStreetName());
		reportInputParams.put("fromStreetName2", claimsPrintParam.getFromStreetName2());
		reportInputParams.put("vendorContactNum", claimsPrintParam.getVendorContactNum());
		reportInputParams.put("vendorFaxNum", claimsPrintParam.getVendorFaxNum());
		reportInputParams.put("contactNumber", claimsPrintParam.getContactNumber());
		reportInputParams.put("carrierName", claimsPrintParam.getCarrierName());
		reportInputParams.put("vehicleRego", claimsPrintParam.getVehicleRego());
		reportInputParams.put("consignNo", claimsPrintParam.getConsignNo());
		reportInputParams.put("status", claimsPrintParam.getStatus());
		reportInputParams.put("cartonCount", claimsPrintParam.getCartonCount());
		reportInputParams.put("authorityNo", claimsPrintParam.getAuthorityNo());		
		reportInputParams.put("imagePath", reportRealPath + claimsPrintParam.getImagePath());
	

		byte[] byos = JasperReportUtil.getInstance().printPdfReport(claimNotePrintName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
				reportInputParams).toByteArray();
		 
		claimPdfArray = byos;
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadClaimNotePdf.pdf", method=RequestMethod.GET)
	public byte[] downloadClaimNotePdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		try{
			response.setContentType("application/pdf");
			response.setContentLength(claimPdfArray.length);
			response.getOutputStream().write(claimPdfArray);
		}catch(Exception e){
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>Exception</title></title>");
			pw.println("<body>");
			pw.println("<h1>"+Constants.EXCEPTION+"</h1>");
			pw.println("</body></html>");
		}
	    return null;
	}
	
	private HashMap<String, Object> reportInputParams = null;
	@RequestMapping(method = RequestMethod.POST, value = "/printCartonLblPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printCartonLblPDF(
			@RequestBody claimsPrintParam claimsPrintParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		reportInputParams = new HashMap<String, Object>();		
		try{
			
			String reportRealPath = request.getSession().getServletContext()
					.getRealPath("");
			reportInputParams.put("supplier", claimsPrintParam.getSupplier());
			reportInputParams.put("claimNo", claimsPrintParam.getClaimNo());
			reportInputParams.put("supplierName", claimsPrintParam.getSupplierName());
			reportInputParams.put("supplierStreet", claimsPrintParam.getSupplierStreet());
			reportInputParams.put("supplierCity", claimsPrintParam.getSupplierCity());
			reportInputParams.put("supplierPhone", claimsPrintParam.getSupplierPhone());
			reportInputParams.put("attention", claimsPrintParam.getAttention());
			reportInputParams.put("fromSite", claimsPrintParam.getFromSite());
			reportInputParams.put("fromSiteStreet", claimsPrintParam.getFromSiteStreet());
			reportInputParams.put("fromSiteCity", claimsPrintParam.getFromSiteCity());
			reportInputParams.put("fromSitePhone", claimsPrintParam.getFromSitePhone());
			reportInputParams.put("dangerNotes", claimsPrintParam.getDangerNotes());
			reportInputParams.put("imagePath", reportRealPath + claimsPrintParam.getImagePath());
			
			
		}catch(Exception e){
			e.printStackTrace();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadCartonLblPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadCartonLblPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		List<ClaimsPrintResult> claimsPrintResultList = null;		
		String cartonCnt = request.getParameter("cartonCnt");
		try{
			if(cartonCnt!=null && !cartonCnt.isEmpty() && reportInputParams!=null && reportInputParams.get("claimNo")!=null){
				claimsPrintResultList = new ArrayList<ClaimsPrintResult>();
				int cnt = Integer.parseInt(cartonCnt);
				String claimNo = (String) reportInputParams.get("claimNo");
				for(int i = 0;i<cnt;i++){
					claimsPrintResultList.add(new ClaimsPrintResult(claimNo,String.valueOf(i+1),cartonCnt));
				}
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(claimsPrintResultList);
				byte[] byos = JasperReportUtil.getInstance().printPdfReport(cartonLblPrintName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
						reportInputParams).toByteArray();
				cartonPdfArray = byos;
				response.setContentType("application/pdf");
				response.setContentLength(cartonPdfArray.length);
				response.getOutputStream().write(cartonPdfArray);
			}
		}catch(Exception e){
			e.printStackTrace();
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>Exception</title></title>");
			pw.println("<body>");
			pw.println("<h1>"+Constants.EXCEPTION+"</h1>");
			pw.println("</body></html>");
		}
	    return null;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/acceptanceNote.htm", consumes = "application/json")
	@ResponseBody
	public String acceptanceNote(
			@RequestBody AcceptanceNotePrintParam AcceptanceNotePrintParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		// HashMap<String, Object> reportInputParams = new HashMap<String,
		// Object>();
		reportInputParams = new HashMap<String, Object>();
		try {

			String reportRealPath = request.getSession().getServletContext()
					.getRealPath("");

			reportInputParams.put("requestType",
					AcceptanceNotePrintParam.getRequestType());
			reportInputParams.put("amount",
					AcceptanceNotePrintParam.getAmount());
			reportInputParams.put("article",
					AcceptanceNotePrintParam.getArticle());
			reportInputParams.put("articleDesc",
					AcceptanceNotePrintParam.getArticleDesc());
			reportInputParams.put("createdDate",
					AcceptanceNotePrintParam.getCreatedDate());
			reportInputParams.put("articleQuantity",
					AcceptanceNotePrintParam.getArticleQuantity());
			reportInputParams.put("contactNo",
					AcceptanceNotePrintParam.getContactNo());
			reportInputParams.put("custAdress",
					AcceptanceNotePrintParam.getCustAdress());
			reportInputParams.put("customerName",
					AcceptanceNotePrintParam.getCustomerName());
			reportInputParams.put("email", AcceptanceNotePrintParam.getEmail());
			reportInputParams.put("faultDesc",
					AcceptanceNotePrintParam.getFaultDesc());
			reportInputParams.put("purchaseDate",
					AcceptanceNotePrintParam.getPurchaseDate());
			reportInputParams.put("repairAgentContactNumber",
					AcceptanceNotePrintParam.getRepairAgentContactNumber());
			reportInputParams.put("resolutionDate",
					AcceptanceNotePrintParam.getResolutionDate());
			reportInputParams.put("service",
					AcceptanceNotePrintParam.getService());
			reportInputParams.put("serviceOrderNo",
					AcceptanceNotePrintParam.getServiceOrderNo());
			reportInputParams.put("storeCity",
					AcceptanceNotePrintParam.getStoreCity());
			reportInputParams.put("storeContactNumber",
					AcceptanceNotePrintParam.getStoreContactNumber());
			reportInputParams.put("storeName",
					AcceptanceNotePrintParam.getStoreName());
			reportInputParams.put("storeStreet",
					AcceptanceNotePrintParam.getStoreStreet());
			reportInputParams.put("repairAgentCity",
					AcceptanceNotePrintParam.getRepairAgentCity());
			reportInputParams.put("cartonCount",
					AcceptanceNotePrintParam.getCartonCount());
			reportInputParams.put("claimNo",
					AcceptanceNotePrintParam.getClaimNo());
			reportInputParams.put("repairAgentStreet",
					AcceptanceNotePrintParam.getRepairAgentStreet());
			reportInputParams.put("imagePath", reportRealPath
					+ AcceptanceNotePrintParam.getImagePath());

		} catch (Exception e) {
			e.printStackTrace();
		}

		return CommonUtils.convertObjectTojson("success");

	}

	@ResponseBody
	@RequestMapping(value = "/downloadAcceptancePrintPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadAcceptancePrintPdf(HttpServletRequest request,
			HttpServletResponse response) throws Throwable {
		List<AcceptancePrintResult> AcceptancePrintResultList = null;
		String cartonCnt = (String) (reportInputParams.get("cartonCount"));
		System.out.println(reportInputParams.get("claimNo"));
		System.out.println(reportInputParams.get("cartonCount"));

		try {
			if (cartonCnt != null && !cartonCnt.isEmpty()
					&& reportInputParams != null
					&& reportInputParams.get("claimNo") != null) {
				AcceptancePrintResultList = new ArrayList<AcceptancePrintResult>();
				int cnt = Integer.parseInt(cartonCnt);
				String claimNo = (String) reportInputParams.get("claimNo");
				for (int i = 0; i < cnt; i++) {
					AcceptancePrintResultList.add(new AcceptancePrintResult(
							claimNo, String.valueOf(i + 1), cartonCnt));
				}
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
						AcceptancePrintResultList);

				ByteArrayOutputStream byos = jasper.printPdfReportTimeZone(
						acceptancePrintName, beanDS,
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request),
						reportInputParams, request);
				jasperRptResponseHandler.handleJasperResponse(
						acceptancePrintName, byos, "pdf", response);

			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>Exception</title></title>");
			pw.println("<body>");
			pw.println("<h1>" + Constants.EXCEPTION + "</h1>");
			pw.println("</body></html>");
		}

		return null;
	}

	/*
	 * @Override public String formUrlParam(MandatoryReportParam param) { //
	 * TODO Auto-generated method stub return null; }
	 */

	// new method for Acceptance print
	@RequestMapping(method = RequestMethod.POST, value = "/acceptanceNoteParam.htm", consumes = "application/json")
	@ResponseBody
	public String acceptanceNoteParam(
			@RequestBody AcceptanceNotePrintParam AcceptanceNotePrintParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		// HashMap<String, Object> reportInputParams = new HashMap<String,
		// Object>();
		reportInputParams = new HashMap<String, Object>();
		try {

			String reportRealPath = request.getSession().getServletContext()
					.getRealPath("");

			reportInputParams.put("requestType",
					AcceptanceNotePrintParam.getRequestType());
			reportInputParams.put("amount",
					AcceptanceNotePrintParam.getAmount());
			reportInputParams.put("article",
					AcceptanceNotePrintParam.getArticle());
			reportInputParams.put("articleDesc",
					AcceptanceNotePrintParam.getArticleDesc());
			reportInputParams.put("createdDate",
					AcceptanceNotePrintParam.getCreatedDate());
			reportInputParams.put("articleQuantity",
					AcceptanceNotePrintParam.getArticleQuantity());
			reportInputParams.put("contactNo",
					AcceptanceNotePrintParam.getContactNo());
			
			reportInputParams.put("custPostCode",
					AcceptanceNotePrintParam.getCustPostCode());
			
			reportInputParams.put("custAdress",
					AcceptanceNotePrintParam.getCustAdress());
			reportInputParams.put("customerName",
					AcceptanceNotePrintParam.getCustomerName());
			reportInputParams.put("email", AcceptanceNotePrintParam.getEmail());
			reportInputParams.put("faultDesc",
					AcceptanceNotePrintParam.getFaultDesc());

			reportInputParams.put("purchaseDate",
					AcceptanceNotePrintParam.getPurchaseDate());
			reportInputParams.put("repairAgentContactNumber",
					AcceptanceNotePrintParam.getRepairAgentContactNumber());
			reportInputParams.put("resolutionDate",
					AcceptanceNotePrintParam.getResolutionDate());
			reportInputParams.put("service",
					AcceptanceNotePrintParam.getService());
			reportInputParams.put("serviceOrderNo",
					AcceptanceNotePrintParam.getServiceOrderNo());
			reportInputParams.put("storeCity",
					AcceptanceNotePrintParam.getStoreCity());
			reportInputParams.put("storeContactNumber",
					AcceptanceNotePrintParam.getStoreContactNumber());
			reportInputParams.put("storeName",
					AcceptanceNotePrintParam.getStoreName());
			reportInputParams.put("storeStreet",
					AcceptanceNotePrintParam.getStoreStreet());
			reportInputParams.put("repairAgentCity",
					AcceptanceNotePrintParam.getRepairAgentCity());
			reportInputParams.put("cartonCount",
					AcceptanceNotePrintParam.getCartonCount());
			reportInputParams.put("claimNo",
					AcceptanceNotePrintParam.getClaimNo());
			reportInputParams.put("disclaimerNotes1",
					AcceptanceNotePrintParam.getDisclaimerNotes1());
			reportInputParams.put("disclaimerNotes2",
					AcceptanceNotePrintParam.getDisclaimerNotes2());
			reportInputParams.put("disclaimerNotes3",
					AcceptanceNotePrintParam.getDisclaimerNotes3());
			reportInputParams.put("disclaimerNotes4",
					AcceptanceNotePrintParam.getDisclaimerNotes4());
			reportInputParams.put("disclaimerNotes5",
					AcceptanceNotePrintParam.getDisclaimerNotes5());
			reportInputParams.put("disclaimerNotes6",
					AcceptanceNotePrintParam.getDisclaimerNotes6());
			reportInputParams.put("comments",
					AcceptanceNotePrintParam.getComments());
			reportInputParams.put("repairAgentNo",
					AcceptanceNotePrintParam.getRepairAgentNo());
			reportInputParams.put("repairAgentName",
					AcceptanceNotePrintParam.getRepairAgentName());
			reportInputParams.put("repairAgentStreet",
					AcceptanceNotePrintParam.getRepairAgentStreet());
			reportInputParams.put("imagePath", reportRealPath
					+ AcceptanceNotePrintParam.getImagePath());

			// parameters for cartonLabelPrint
			reportInputParams.put("supplier",
					AcceptanceNotePrintParam.getSupplier());
			reportInputParams.put("supplierName",
					AcceptanceNotePrintParam.getSupplierName());
			reportInputParams.put("supplierStreet",
					AcceptanceNotePrintParam.getSupplierStreet());
			reportInputParams.put("supplierCity",
					AcceptanceNotePrintParam.getSupplierCity());
			reportInputParams.put("supplierPhone",
					AcceptanceNotePrintParam.getSupplierPhone());
			reportInputParams.put("fromSite",
					AcceptanceNotePrintParam.getFromSite());
			reportInputParams.put("fromSiteStreet",
					AcceptanceNotePrintParam.getFromSiteStreet());
			reportInputParams.put("fromSiteCity",
					AcceptanceNotePrintParam.getFromSiteCity());
			reportInputParams.put("dangerNotes",
					AcceptanceNotePrintParam.getDangerNotes());
			reportInputParams.put("fromSitePhone",
					AcceptanceNotePrintParam.getFromSitePhone());

		} catch (Exception e) {
			e.printStackTrace();
		}

		return CommonUtils.convertObjectTojson("success");

	}

	@RequestMapping(value = "/downloadAcceptancePrintNewPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadAcceptancePrintNewPdf(HttpServletRequest request,
			HttpServletResponse response) throws Throwable {
		List<AcceptancePrintResult> acceptancePrintResultList = null;
		String cartonCnt = (String) (reportInputParams.get("cartonCount"));
		System.out.println(reportInputParams.get("claimNo"));
		System.out.println(reportInputParams.get("cartonCount"));
		List<JasperParamsBean> beanList = null;
		byte[] byos = null;
		try {
			if (cartonCnt != null && !cartonCnt.isEmpty()
					&& reportInputParams != null
					&& reportInputParams.get("claimNo") != null) {
				acceptancePrintResultList = new ArrayList<AcceptancePrintResult>();
				String claimNo = (String) reportInputParams.get("claimNo");
				int cnt = Integer.parseInt(cartonCnt);
				for (int i = 0; i < cnt; i++) {
					acceptancePrintResultList.add(new AcceptancePrintResult(
							claimNo, String.valueOf(i + 1), cartonCnt));
				}
				// JRBeanCollectionDataSource beanDS = new
				// JRBeanCollectionDataSource(
				// acceptancePrintResultList);
				// AcceptancePrintResultList = new
				// ArrayList<AcceptancePrintResult>();
				beanList = new ArrayList<JasperParamsBean>();
				JasperParamsBean bean = null;
				for (int i = 0; i < cnt; i++) {
					if (i == 2) {
						HashMap<String, Object> tempMap = new HashMap<String, Object>(
								reportInputParams);
						tempMap.put("show_customer_dtl", "N");
						System.out.println("reportInputParams"+reportInputParams.get("hide_customer_dtl") +" tempMap = "+tempMap.get("hide_customer_dtl"));
						bean = new JasperParamsBean(acceptancePrintName,
								new JRBeanCollectionDataSource(
										acceptancePrintResultList), tempMap,
								i + 1);
					} else {
						bean = new JasperParamsBean(acceptancePrintName,
								new JRBeanCollectionDataSource(
										acceptancePrintResultList),
								reportInputParams, i + 1);
					}
					beanList.add(bean);
				}
				byos = jasper.printReport(beanList, "pdf",
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request))
						.toByteArray();
				response.setContentType("application/pdf");
				response.setContentLength(byos.length);
				response.getOutputStream().write(byos);

			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>Exception</title></title>");
			pw.println("<body>");
			pw.println("<h1>" + Constants.EXCEPTION + "</h1>");
			pw.println("</body></html>");
		}

		return null;
	}

	@RequestMapping(value = "/downloadCartonLblNewPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadCartonLblNewPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		List<ClaimsPrintResult> claimsPrintResultList = null;
		byte[] byos = null;
		String cartonCnt = request.getParameter("carCount");
		String attention = request.getParameter("attention");
		reportInputParams.put("attention", attention);
		try {
			if (cartonCnt != null && !cartonCnt.isEmpty()
					&& reportInputParams != null
					&& reportInputParams.get("claimNo") != null) {
				claimsPrintResultList = new ArrayList<ClaimsPrintResult>();
				int cnt = Integer.parseInt(cartonCnt);
				String claimNo = (String) reportInputParams.get("claimNo");
				for (int i = 0; i < cnt; i++) {
					claimsPrintResultList.add(new ClaimsPrintResult(claimNo,
							String.valueOf(i + 1), cartonCnt));
				}
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
						claimsPrintResultList);
				byos = JasperReportUtil
						.getInstance()
						.printPdfReport(
								cartonLblPrintName,
								beanDS,
								jasperRptResponseHandler
										.getReportSourcePath(request),
								jasperRptResponseHandler
										.getReportBinPath(request),
								reportInputParams).toByteArray();
				response.setContentType("application/pdf");
				response.setContentLength(byos.length);
				response.getOutputStream().write(byos);
			}
		} catch (Exception e) {
			e.printStackTrace();
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>Exception</title></title>");
			pw.println("<body>");
			pw.println("<h1>" + Constants.EXCEPTION + "</h1>");
			pw.println("</body></html>");
		}
		return null;
	}

}