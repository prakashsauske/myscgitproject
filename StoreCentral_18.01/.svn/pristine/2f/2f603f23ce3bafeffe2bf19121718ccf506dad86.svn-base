package au.com.woolworths.portal.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.sql.Array;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.krysalis.barcode4j.ChecksumMode;
import org.krysalis.barcode4j.HumanReadablePlacement;
import org.krysalis.barcode4j.impl.upcean.EAN8Bean;
import org.krysalis.barcode4j.output.bitmap.BitmapCanvasProvider;
import org.krysalis.barcode4j.tools.UnitConv;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import au.com.woolworths.portal.model.ClaimsPrintResult;
import au.com.woolworths.portal.model.LTOPrintBarcodeResult;
import au.com.woolworths.portal.param.LTOBarcodePrintParam;
import au.com.woolworths.portal.param.LTOPrintBarcodeParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;

@Controller
@RequestMapping(value = "*/ltoBarcode")
@Scope("session")
public class LTOBarcodePrintController extends BaseController {

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['ltoBarcodeReportName']}")
	private String ltoBarcodeReportName = null;
 
	@Value("#{properties['bigwLtoBarcodeReportName']}")
	private String bigwLtoBarcodeReportName = null;

	private byte[] pdfArray = null;
		
	private static final String BIGW_BANNER ="bigw";
	
	List<LTOPrintBarcodeResult> arrayList = null;
	String BigW;
    String banner;
	@RequestMapping(method = RequestMethod.POST, value = "/printLTOReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printPLUReportPDF(
			@RequestBody LTOBarcodePrintParam LTOBarcodeParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		// if (setSessionAndReturnIfInvalid(request) == true) {
		// return "";
		// }
		//List<LTOPrintBarcodeResult> arrayList = null;	
		arrayList = LTOBarcodeParam.getResultList();
		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");
		
		BigW=LTOBarcodeParam.getLtoBarcodeBanner();
		banner=LTOBarcodeParam.getLtoBarcodeBanner();
		if(BIGW_BANNER.equalsIgnoreCase(LTOBarcodeParam.getLtoBarcodeBanner())) {
			pdfArray = getPrintContent(LTOBarcodeParam.getBarcode(),
					LTOBarcodeParam.getBarcodeText(), LTOBarcodeParam.getAisle(),
					LTOBarcodeParam.getLocationDesc(),
					LTOBarcodeParam.getLocation(), LTOBarcodeParam.getRC(), LTOBarcodeParam.getFirstAisle(), LTOBarcodeParam.getLtoId(),LTOBarcodeParam.getCategory(), bigwLtoBarcodeReportName,
					reportRealPath, request);
		}
		else {
						
		}
		return CommonUtils.convertObjectTojson("success");

	}
	
	@RequestMapping(method = RequestMethod.POST, value = "/printLTOBarcodeReportPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printLTOReportPDF(
			@RequestBody LTOPrintBarcodeParam ltoPrintBarcodeParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {			
						
		 List<String> resultList=new ArrayList<String>();
		 resultList.addAll(ltoPrintBarcodeParam.getResultList());		
		
		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");
		if(BIGW_BANNER.equalsIgnoreCase(BigW)){
			pdfArray = getMultiplePrintContent(bigwLtoBarcodeReportName,
					reportRealPath, request,resultList);
			
		}else
		pdfArray = getMultiplePrintContent(ltoBarcodeReportName,
				reportRealPath, request,resultList);		
		
		return CommonUtils.convertObjectTojson("success");

	}
	

	private byte[] getPrintContent(String barcode, String barcodeText,
			String aisle, String locationDesc, String location, String RC, String firstAisle, String ltoId,String Category,
			String fileName, String binPath, HttpServletRequest request) {
		// location = barcode;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		byte[] byos = null;
		System.out.println("jasper object creating ");
		JasperReportUtil jasper = new JasperReportUtil();
		System.out.println("jasper object created ");
		try {
			reportInputParams.put("barcode", barcode);
			reportInputParams.put("barcodeText", barcodeText);
			reportInputParams.put("locationDesc", locationDesc);
			reportInputParams.put("location", location);
			reportInputParams.put("aisle", aisle);
			reportInputParams.put("logo", generateBarcode(barcode));
			reportInputParams.put("RC", RC);
			reportInputParams.put("firstAisle", firstAisle);
			reportInputParams.put("ltoId", ltoId);
			reportInputParams.put("Category", Category);
			
			System.out.println("jasper printe method calling ");
			byos = jasper.printReport(fileName, new JREmptyDataSource(),
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request),
					reportInputParams);
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
		EAN8Bean bean = null;
		try {
			// Create the barcode bean
			bean = new EAN8Bean();

			final int dpi = 140;

			// Configure the barcode generator
			bean.setModuleWidth(UnitConv.in2mm(1.0f / dpi));
			bean.doQuietZone(false);
			bean.setChecksumMode(ChecksumMode.CP_AUTO);
			bean.setMsgPosition(HumanReadablePlacement.HRP_NONE);

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
	@RequestMapping(value = "/downloadLTOReportPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
		return null;
	}
	
	@ResponseBody
	@RequestMapping(method = RequestMethod.POST, value = "/downloadMultipleLTOReportPdf.htm", consumes = "application/json")	
	public byte[] downloadLTOReportPdf(
			@RequestBody LTOPrintBarcodeParam ltoPrintBarcodeParam,
			HttpServletRequest request, HttpServletResponse response) throws IOException {
		 List<String> resultList=new ArrayList<String>();
		 resultList.addAll(ltoPrintBarcodeParam.getResultList());
		String reportRealPath = request.getSession().getServletContext()
				.getRealPath("");
	
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
		return null;
	}
	
	private byte[] getMultiplePrintContent(String fileName, String binPath, HttpServletRequest request, List<String> resultList) throws IOException {
		// location = barcode;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		
		List<LTOPrintBarcodeResult> sepList = new ArrayList<LTOPrintBarcodeResult>();
			for(int i = 0;i<arrayList.size();i++){
				for(int j=0;j<resultList.size();j++){
				if(arrayList.get(i).getBarcode().equalsIgnoreCase((resultList).get(j))){
					arrayList.get(i).setGenerateBarcode(generateBarcode(arrayList.get(i).getBarcode()));
					sepList.add(arrayList.get(i));	
				}
				}
			
		}
			reportInputParams.put("banner", banner);
		
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(sepList);
		System.out.println("jasper object creating ");
		JasperReportUtil jasper = new JasperReportUtil();
		System.out.println("jasper object created ");
		byte[] byos = null;
		try {
			
			byos = JasperReportUtil.getInstance().printPdfReport(fileName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
					reportInputParams).toByteArray();
			

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
}
