package au.com.woolworths.portal.controller;

import java.awt.image.BufferedImage;
import java.io.IOException;
import java.util.ArrayList;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

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

import au.com.woolworths.portal.param.LocationPrintHdrParam;
import au.com.woolworths.portal.param.LocationPrintrDtlParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

@Controller
@RequestMapping(value = "*/locationBarcode")
@Scope("session")
public class LocationBarcodePrintController extends BaseController {
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['LocationBarcodePrintName']}")
	private String locationBarcodePrintName = null;
	
	private byte[] pdfArray = null;
	
	@RequestMapping(method = RequestMethod.POST, value = "/printLocationBarcode.htm", consumes = "application/json")
	@ResponseBody
	public String printLocationBarcode(@RequestBody LocationPrintHdrParam locationPrintHdrParam,
			HttpServletRequest request, HttpServletResponse response){		
		
		ArrayList<LocationPrintrDtlParam> locationDtlList = null;
		System.out.println("printLocationBarcode");
		try {
			locationDtlList = locationPrintHdrParam.getLocationDtlParamList();
			generateBarcode(locationDtlList);
			pdfArray = getPrintContent(locationDtlList, locationBarcodePrintName, request);
			if (pdfArray == null) {
				return CommonUtils.convertObjectTojson(Constants.locPrint_pdfGenerationError);
			}else{
				return CommonUtils.convertObjectTojson("success");
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return CommonUtils.convertObjectTojson(Constants.locPrint_failure);
	}

	@ResponseBody
	@RequestMapping(value = "/downloadLocationBarcode.pdf", method = RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
		return null;
	}
	
	private byte[] getPrintContent(
			ArrayList<LocationPrintrDtlParam> returnOrderDtlList, String reportName, HttpServletRequest request) {
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		byte[] pdfData = null;
		try {			
			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(returnOrderDtlList);			
			
			pdfData = JasperReportUtil.getInstance().printPdfReport(reportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), 
					jasperRptResponseHandler.getReportBinPath(request),
					reportInputParams).toByteArray();
			
		} catch (Exception e) {
			e.printStackTrace();
		}
		return pdfData;
	}

	private void generateBarcode(ArrayList<LocationPrintrDtlParam> codeDigits)
			throws IOException {

		BitmapCanvasProvider canvas = null;
		BufferedImage img = null;
		EAN8Bean bean = null;

		for (LocationPrintrDtlParam dtl : codeDigits) {
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
				bean.generateBarcode(canvas, dtl.getBarcode());

				img = canvas.getBufferedImage();
				// Signal end of generation

				canvas.finish();

			} catch (Exception e) {
				e.printStackTrace();
			}
			dtl.setLogo(img);
		}
	}

}
