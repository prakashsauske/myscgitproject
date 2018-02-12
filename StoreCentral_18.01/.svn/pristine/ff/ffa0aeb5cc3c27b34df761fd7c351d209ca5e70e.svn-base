package au.com.woolworths.portal.controller;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.text.DecimalFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

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

import au.com.woolworths.portal.model.DGMSReport;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.RTCPDF;
import au.com.woolworths.portal.model.RTCPDFParam;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.DGMSReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ArticleServiceImpl;
import au.com.woolworths.portal.service.ReportServiceImpl;
import au.com.woolworths.portal.util.Constants;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

@Controller
@RequestMapping(value = "*/report")
@Scope("session")
public class ReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['DailyGoodsMovementSummary']}")
	private String screenCode;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportDeviceLog']}")
	private String screenCode1;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportLTO']}")
	private String screenCode2;
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	private byte[] pdfArray = null;
	@Autowired
	private ReportServiceImpl reportService;
	@Autowired
	private ArticleServiceImpl articleService;

	private ModelMap model;
	private DGMSReportParam param;
	private ArrayList<DGMSReport> dgmsReport;
	
	@Autowired
	private JasperReportUtil jasper;

	  private static final int BUFFER_SIZE = 4096;
	  
	public ArticleServiceImpl getArticleService() {
		return articleService;
	}

	public void setArticleService(ArticleServiceImpl articleService) {
		this.articleService = articleService;
	}

	public ReportServiceImpl getReportService() {
		return reportService;
	}

	public void setReportService(ReportServiceImpl reportService) {
		this.reportService = reportService;
	}

	@RequestMapping(value = "/onPageLoad.htm", method = RequestMethod.GET)
	public ModelAndView onPageLoad(HttpServletRequest request,
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
		List<Department> deptInfoList = new ArrayList<Department>();
		try {

			String prod_no = "ALL DEPARTMENTS";
			deptInfoList = (ArrayList<Department>) articleService
					.getDeptDetails(prod_no, ((UserContext) request
							.getSession().getAttribute("user")).getSalesOrg(),user);

			model.addAttribute("deptInfoList", deptInfoList);
			for (int i = 0; i < deptInfoList.size(); i++) {
				// //System.out.println("deptInfoList " + i + " --->" +
				// deptInfoList.get(i).getNode());
			}
		} catch (Exception e) {
			model.addAttribute("deptInfoList", new ArrayList<Department>());
		}

		model.addAttribute("param", new DGMSReportParam());
		ModelAndView modelAndView = new ModelAndView("dgmsReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;
	}
	@RequestMapping(value = "/loadDeviceLogReport.htm", method = RequestMethod.GET)
	public ModelAndView loadDeviceLogReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode1)){
			if((user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode1).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportDeviceLog");
		return modelAndView;
	}
	
	
	
	
	@RequestMapping(value = "/rtcPrintOld.htm", method = RequestMethod.GET)
	public String rtcPrint(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		String prod_no = request.getParameter("fromDate");
		String date = prod_no.split("/")[0].trim() + "-"
				+ prod_no.split("/")[1].trim() + "-"
				+ prod_no.split("/")[2].trim();

		UserContext userContext = (UserContext) (request.getSession()
				.getAttribute("user"));

		String site = userContext.getSiteNo();

		// ByteArrayOutputStream baos = ftpServer();
		ArrayList<RTCPDF> rtcpdfList = new ArrayList<RTCPDF>();
		rtcpdfList = sftpServerTransfer(date, site);

		if (rtcpdfList != null) {
			response.setContentType("application/pdf");

			String filename = "report1";
			String extension = "pdf";

			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
					rtcpdfList);
			HashMap<String, Object> tempMap = new HashMap<String, Object>();
		/*	jasper.printReport(filename, extension, beanDS, tempMap, request,
					response);*/ /* commeneted as its showing error */
		} else {
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>File not found</title></title>");
			pw.println("<body>");
			pw.println("<h1>File not found for site : " + site + " and date : "
					+ date + "</h1>");
			pw.println("</body></html>");
		}

		return null;
	}
	
	
	@RequestMapping(value = "/rtcTablePrint.htm", method = RequestMethod.POST, consumes = "application/json")
	@ResponseBody
	public String rtcTablePrint(@RequestBody RTCPDFParam param,HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		

		UserContext userContext = (UserContext) (request.getSession()
				.getAttribute("user"));
		String date = request.getParameter("date");
		String site = userContext.getSiteNo();
		String siteDesc = userContext.getSiteName();

		// ByteArrayOutputStream baos = ftpServer();
		ArrayList<RTCPDF> rtcpdfList = param.getData();
		// = sftpServerTransfer(date, site);
		
		System.out.println("rtcpdfList size " + rtcpdfList.size());
		
		Comparator<RTCPDF> rtscComparator = new Comparator<RTCPDF>() {
			 
	        @Override
	        public int compare(RTCPDF e1, RTCPDF e2) {
	            return  Integer.parseInt(e1.getDepartment().trim())
						- Integer.parseInt(e2.getDepartment().trim());
	        }
	    };
	    
	    Collections.sort(rtcpdfList, rtscComparator);
		
		for(RTCPDF rtcpdf : rtcpdfList){
			DecimalFormat decimalFormat = new DecimalFormat("#0.00");
			rtcpdf.setSite(site + " | " + siteDesc);
			rtcpdf.setDepartment(rtcpdf.getDepartment() + " " + rtcpdf.getDepartmentDesc());
			rtcpdf.setFromToDate(date);
			rtcpdf.setRtcTo(String.valueOf(decimalFormat.format(Double.valueOf(rtcpdf.getRtcTo()))));
			
			rtcpdf.setFromDate(rtcpdf.getFromDate().split(" ")[0]);
		}
		
	

		if (rtcpdfList != null) {
			response.setContentType("application/pdf");

			String filename = "report1";
			String extension = "pdf";

			
			HashMap<String, Object> reportInputParams = new HashMap<String, Object>();	
			
			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
					rtcpdfList);
			HashMap<String, Object> tempMap = new HashMap<String, Object>();
			/*pdfArray = jasper.printReport(filename, extension, beanDS, tempMap, request,
					response).toByteArray();*/
			pdfArray = JasperReportUtil.getInstance().printPdfReport(filename, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
					reportInputParams).toByteArray();
		} 

		return "success";
	}
	
	@ResponseBody
	@RequestMapping(value = "/rtcReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
	}
	
	private ArrayList<RTCPDF>  ftpServer(){ 
	String SFTPHOST = "clerct1";
    int SFTPPORT = 22;
    String SFTPUSER = "javadm";
    String SFTPPASS = "ERC#WOW123";
    String SFTPWORKINGDIR = "/applic/wow/RTC/20-11-2015/2000.csv";
    ByteArrayOutputStream bos = null;
    Session session = null;
    Channel channel = null;
    Channel channelSftp = null;
    System.out.println("preparing the host information for sftp.");
    ArrayList<RTCPDF> rtcpdfList = new ArrayList<RTCPDF>();
    try {
        JSch jsch = new JSch();
        session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
        session.setPassword(SFTPPASS);
        java.util.Properties config = new java.util.Properties();
        config.put("StrictHostKeyChecking", "no");
        session.setConfig(config);
        session.connect();
        System.out.println("Host connected.");
        channel = session.openChannel("sftp");
        channel.connect();
        System.out.println("sftp channel opened and connected.");
        channelSftp = (ChannelSftp) channel;
        /* commented as get is showing error */
      /*  
        InputStream stream = channelSftp.get(SFTPWORKINGDIR);
        
        bos = new ByteArrayOutputStream();
        
        BufferedReader br = null;
        br = new BufferedReader(new InputStreamReader(stream));
        StringBuilder out = new StringBuilder();
        String line;
       
        RTCPDF rtcpdf = null;
        while ((line = br.readLine()) != null) {
        	rtcpdf = new RTCPDF();
        	if(line.contains(",")){
        		rtcpdf.setSite(line.split(",")[0]);
    			rtcpdf.setFromToDate(line.split(",")[1]);
    			rtcpdf.setDepartment(line.split(",")[2]);
    			rtcpdf.setArticle(line.split(",")[3]);
    			rtcpdf.setArticleDesc(line.split(",")[4]);
    			rtcpdf.setSellPrice(line.split(",")[5]);
    			rtcpdf.setRtcFrom(line.split(",")[6]);
    			rtcpdf.setRtcTo(line.split(",")[7]);
    			rtcpdf.setPerc(line.split(",")[8]);
    		//	rtcpdf.setReason(line.split(",")[9]);
    			rtcpdf.setVal(line.split(",")[9]);
    			rtcpdf.setFromDate(line.split(",")[10]);
    			rtcpdf.setUser(line.split(",")[11]);
    			rtcpdf.setTickets("10");
    			rtcpdfList.add(rtcpdf);
        	}
        }
        System.out.println(out.toString()); 
        
	   byte[] buf = new byte[256];
	   
	            for (int readNum; (readNum = stream.read(buf)) != -1;) {
	                bos.write(buf, 0, readNum); //no doubt here is 0
	                //Writes len bytes from the specified byte array starting at offset off to this byte array output stream.
              //  System.out.println("read " + readNum + " bytes,");
            }

	        */
	    
    } catch (Exception ex) {
    	ex.printStackTrace();
         System.out.println("Exception found while tranfer the response.");
    }finally{
    			
      //  channelSftp.exit(); /* commented as its showing error*/
        System.out.println("sftp Channel exited.");
        channel.disconnect();
        System.out.println("Channel disconnected.");
        session.disconnect();
        System.out.println("Host Session disconnected.");        
    }
    return rtcpdfList;
    }
	
	private  ArrayList<RTCPDF> sftpServerTransfer(String date,String site){ 
		String SFTPHOST = "clerct1";
	    int SFTPPORT = 22;
	    String SFTPUSER = "javadm";
	    String SFTPPASS = "ERC#WOW123";
	    String SFTPWORKINGDIR = "/applic/wow/RTC/"+date+"/"+site+".csv";
	    ByteArrayOutputStream bos = null;
	    Session session = null;
	    Channel channel = null;
	    ChannelSftp channelSftp = null;
	    System.out.println("preparing the host information for sftp.");
	    ArrayList<RTCPDF> rtcpdfList = new ArrayList<RTCPDF>();
	    try {
	        JSch jsch = new JSch();
	        session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
	        session.setPassword(SFTPPASS);
	        java.util.Properties config = new java.util.Properties();
	        config.put("StrictHostKeyChecking", "no");
	        session.setConfig(config);
	        session.connect();
	        System.out.println("Host connected.");
	        channel = session.openChannel("sftp");
	        channel.connect();
	        System.out.println("sftp channel opened and connected.");
	        channelSftp = (ChannelSftp) channel;
	        
	        InputStream stream = channelSftp.get(SFTPWORKINGDIR);
	       
	        BufferedReader br = null;
	        br = new BufferedReader(new InputStreamReader(stream));
	        StringBuilder out = new StringBuilder();
	        String line;
	       
	        RTCPDF rtcpdf = null;
	        while ((line = br.readLine()) != null) {
	        	rtcpdf = new RTCPDF();
	        	if(line.contains(",")){
	        		rtcpdf.setSite(line.split(",")[0]);
	    			rtcpdf.setFromToDate(line.split(",")[1]);
	    			rtcpdf.setDepartment(line.split(",")[2]);
	    			rtcpdf.setArticle(line.split(",")[3]);
	    			rtcpdf.setArticleDesc(line.split(",")[4]);
	    			rtcpdf.setSellPrice(line.split(",")[5]);
	    			rtcpdf.setRtcFrom(line.split(",")[6]);
	    			rtcpdf.setRtcTo(line.split(",")[7]);
	    			rtcpdf.setPerc(line.split(",")[8]);
	    		//	rtcpdf.setReason(line.split(",")[9]);
	    			rtcpdf.setVal(line.split(",")[9]);
	    			rtcpdf.setFromDate(line.split(",")[10]);
	    			rtcpdf.setUser(line.split(",")[11]);
	    			rtcpdf.setTickets(line.split(",")[12]);
	    			rtcpdfList.add(rtcpdf);
	        	}
	        }
	        
	        System.out.println(out.toString()); 
	        
	        bos = new ByteArrayOutputStream();
		    byte[] buf = new byte[256];
		   
		            for (int readNum; (readNum = stream.read(buf)) != -1;) {
		                bos.write(buf, 0, readNum); //no doubt here is 0
		                //Writes len bytes from the specified byte array starting at offset off to this byte array output stream.
		                System.out.println("read " + readNum + " bytes,");
		            }

		        
		    
	    } catch (Exception ex) {
	    	//ex.printStackTrace();
	         System.out.println("Exception found while tranfer the response.");
	    }finally{
	    			
	        channelSftp.exit();
	        System.out.println("sftp Channel exited.");
	        channel.disconnect();
	        System.out.println("Channel disconnected.");
	        session.disconnect();
	        System.out.println("Host Session disconnected.");        
	    }
	    return rtcpdfList;
	 }
	
	@RequestMapping(value = "/loadOverstockReport.htm", method = RequestMethod.GET)
	public ModelAndView loadOverstockReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportOverstock");
		return modelAndView;
	}
	@RequestMapping(value = "/loadLTOReport.htm", method = RequestMethod.GET)
	public ModelAndView loadLTOReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
		UserContext user=(UserContext) request.getSession(
				false).getAttribute("user");
		if(user.getUserAccessMap().containsKey(screenCode2)){
			if((user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.EXCLUDE_FLAG)) || (user.getUserAccessMap().get(screenCode2).get(0).getIncludeExcludeFlag().equalsIgnoreCase(Constants.READ_ACCESS))){
				return new ModelAndView("noAccess");
			}
			
		}
		/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - End */

		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportLTO");
		return modelAndView;
	}		
	@RequestMapping(value = "/loadSUGO1Report.htm", method = RequestMethod.GET)
	public ModelAndView loadSUGO1Report(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportSUGO1");
		return modelAndView;
	}
	@RequestMapping(value = "/loadSUGO2Report.htm", method = RequestMethod.GET)
	public ModelAndView loadSUGO2Report(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportSUGO2");
		return modelAndView;
	}
	@RequestMapping(value = "/loadSUGO3Report.htm", method = RequestMethod.GET)
	public ModelAndView loadSUGO3Report(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportSUGO3");
		return modelAndView;
	}
	@RequestMapping(value = "/loadSUGO4Report.htm", method = RequestMethod.GET)
	public ModelAndView loadSUGO4Report(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportSUGO4");
		return modelAndView;
	}
	
	
	
	@RequestMapping(value = "/loadTopSalesReport.htm", method = RequestMethod.GET)
	public ModelAndView loadTopSalesReport(HttpServletRequest request,
			HttpServletResponse response) throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		model = new ModelMap();		
		ModelAndView modelAndView = new ModelAndView("ReportTopSales");
		return modelAndView;
	}
	

	@RequestMapping(value = "/reportSearch.htm", method = RequestMethod.GET)
	public ModelAndView reportSearchGet(
			@ModelAttribute DGMSReportParam reportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		param = reportParam;
		model.addAttribute("param", param);
		model.addAttribute("dgmsReport", new ArrayList<DGMSReport>());
		ModelAndView modelAndView = new ModelAndView("dgmsReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	@RequestMapping(value = "/reportSearch.htm", method = RequestMethod.POST)
	public ModelAndView reportSearch(
			@ModelAttribute DGMSReportParam reportParam, BindingResult result,
			HttpServletRequest request, HttpServletResponse response)
			throws Exception {
		// //System.out.println("entered report search");
		if (result.hasErrors()) {
			// //System.out.println("error while binding");
		}
		if (request.getSession(false) == null
				|| (request.getSession(false) != null && request.getSession(
						false).getAttribute("user") == null)) {
			return new ModelAndView(new RedirectView("../../"));
		}
		ArrayList<DGMSReport> dgmsReportWithInvoice = new ArrayList<DGMSReport>();
		ArrayList<DGMSReport> dgmsReportWithOutInvoice = new ArrayList<DGMSReport>();
		/*
		 * ////System.out.println("inputdate from report"+reportParam.getInputDate(
		 * ));
		 * //////System.out.println("inputdate from report"+reportParam.getRadio1
		 * ());
		 * //////System.out.println("inputdate from report"+reportParam.getRadio2
		 * ());
		 * ////System.out.println("reportParam.getRadio()="+reportParam.getRadio
		 * ());
		 * ////System.out.println("inputdate from report"+reportParam.getSiteNo
		 * ());
		 * ////System.out.println("inputdate from report"+reportParam.getTradingDept
		 * ());
		 * ////System.out.println("inputdate from report"+reportParam.getWcDate
		 * ());
		 */
		// //System.out.println("inputdate from report"+reportParam.getTradingDept());
		param = reportParam;
		// //System.out.println("param.getInputDate()"+param.getInputDate());
		if (((param.getInputDate() == "") || (param.getInputDate() == null))) { // //System.out.println("-->129");
			model.addAttribute("msg", "Please enter Date ");
		} else {
			// //System.out.println("entered actual function");
			model.addAttribute("msg", "");
			UserContext userContext = (UserContext) (request.getSession()
					.getAttribute("user"));
			param.setSiteNo(userContext.getSiteNo());
			// for other siteno its not working
			// param.setSiteNo("3911");
			//
			// param.setTradingDept("02");

			// param.setWcDate("10/06/2013");
			/*
			 * ////System.out.println("siteNo="+param.getSiteNo());
			 * ////System.out.println("department="+param.getTradingDept());
			 * ////System.out.println("inputDate="+param.getInputDate());
			 * ////System.out.println("wcDate="+param.getWcDate());
			 */
			if (request.getParameter("searchByOptions")
					.equalsIgnoreCase("Date")) {
				// //System.out.println("2");
				param.setInputDate(request.getParameter("inputDate"));
				param.setWcDate("");
				param.setRadio("Date");
			} else {
				// //System.out.println("3");
				param.setWcDate(request.getParameter("inputDate"));
				param.setInputDate("");
				param.setRadio("WCDate");
			}

			if (param.getInputDate().length() == 8) {
				// //System.out.println("4");
				param.setInputDate(y2ToY4Converter(param.getInputDate()));
				// //System.out.println("param.getInputDate"+param.getInputDate());
			}
			if (param.getWcDate().length() == 8) {
				// //System.out.println("3");
				param.setWcDate(y2ToY4Converter(param.getWcDate()));
				// //System.out.println("param.getWcDate"+param.getWcDate());
			}
			try {
				/* param.setPageNo(1); */
				// //System.out.println("inside try 5");
				dgmsReport = reportService.getDGMSReport(param,userContext);
			} catch (Exception e) {
				// //System.out.println("error in line 74 = "+e);
				model.addAttribute(
						"msg",
						"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
			}

			Map<String, DGMSReport> mapWithInvoice = new HashMap<String, DGMSReport>();
			Map<String, DGMSReport> mapWithOutInvoice = new HashMap<String, DGMSReport>();
			model.addAttribute("storeNo", "");
			model.addAttribute("storeName", "");
			model.addAttribute("map", "");

			if (dgmsReport != null && dgmsReport.size() != 0
					&& !dgmsReport.get(0).getOrderNo().equalsIgnoreCase("")) {

				/*
				 * param.setRecordCount(Integer
				 * .parseInt(dgmsReport.get(0).getMsg().trim()));
				 */

				// //System.out.println("valid data");
				model.addAttribute("msg", "");
				for (int i = 0; i < dgmsReport.size(); i++) {
					if (dgmsReport.get(i).getInvoiceNo() != null
							&& dgmsReport.get(i).getInvoiceNo() != "") {
						// //System.out.println("not null"+dgmsReport.get(i).getInvoiceNo());
						int a = dgmsReport.get(i).getUserName().indexOf(" ");
						if (a != 0) {
							dgmsReport.get(i).setUserName(
									dgmsReport
											.get(i)
											.getUserName()
											.substring(
													a + 1,
													dgmsReport.get(i)
															.getUserName()
															.length()));
						}
						dgmsReportWithInvoice.add(dgmsReport.get(i));
					} else {
						// //System.out.println("null"+dgmsReport.get(i).getInvoiceNo());
						int b = dgmsReport.get(i).getUserName().indexOf(" ");
						if (b != 0) {
							dgmsReport.get(i).setUserName(
									dgmsReport
											.get(i)
											.getUserName()
											.substring(
													b + 1,
													dgmsReport.get(i)
															.getUserName()
															.length()));
						}
						dgmsReportWithOutInvoice.add(dgmsReport.get(i));
					}
				}
				Double cost = 0.00;
				Double gst = 0.00;

				if (dgmsReportWithInvoice.size() != 0
						&& dgmsReportWithInvoice.get(0).getCost() != "") {
					for (int j = 0; j < dgmsReportWithInvoice.size(); j++) {
						String key = dgmsReportWithInvoice.get(j)
								.getTradingDeptNo();
						DGMSReport innerList = mapWithInvoice.containsKey(key) ? mapWithInvoice
								.get(key) : new DGMSReport();
						// innerList.add(dgmsGroup);
						if (innerList.getInvoiceTotal() != null
								&& innerList.getInvoiceTotal() != ""
								&& dgmsReportWithInvoice.get(j)
										.getInvoiceTotal() != ""
								&& dgmsReportWithInvoice.get(j)
										.getInvoiceTotal() != null) {
							cost = Double.parseDouble(innerList
									.getInvoiceTotal())
									+ Double.parseDouble(dgmsReportWithInvoice
											.get(j).getInvoiceTotal());

						} else if (dgmsReportWithInvoice.get(j)
								.getInvoiceTotal() != ""
								&& dgmsReportWithInvoice.get(j)
										.getInvoiceTotal() != null) {
							cost = Double.parseDouble(dgmsReportWithInvoice
									.get(j).getInvoiceTotal());
						}
						if (innerList.getGstValue() != null
								&& innerList.getGstValue() != ""
								&& dgmsReportWithInvoice.get(j).getGstValue() != ""
								&& dgmsReportWithInvoice.get(j).getGstValue() != null) {
							gst = Double.parseDouble(innerList.getGstValue())
									+ Double.parseDouble(dgmsReportWithInvoice
											.get(j).getGstValue());

						} else if (dgmsReportWithInvoice.get(j).getGstValue() != ""
								&& dgmsReportWithInvoice.get(j).getGstValue() != null) {

							gst = Double.parseDouble(dgmsReportWithInvoice.get(
									j).getGstValue());
						}
						innerList.setInvoiceTotal(cost.toString());
						innerList.setGstValue(gst.toString());
						innerList.setTradingDeptNo(dgmsReportWithInvoice.get(j)
								.getTradingDeptNo());
						innerList.setTradingDeptName(dgmsReportWithInvoice.get(
								j).getTradingDeptName());

						mapWithInvoice.put(key, innerList);
						// //System.out.println("cost.toString()="+cost.toString());
					}
					// //System.out.println("map size---->" +
					// mapWithInvoice.size());

					model.addAttribute("mapWithInvoice", mapWithInvoice);
				} else {
					model.addAttribute("mapWithInvoice",
							new HashMap<String, DGMSReport>());
				}

				Double totalCost = 0.00;
				Double totalGst = 0.00;
				if (dgmsReportWithInvoice != null
						&& dgmsReportWithInvoice.size() > 0) {
					for (int j = 0; j < dgmsReportWithInvoice.size(); j++) {

						totalCost += (dgmsReportWithInvoice.get(j)
								.getInvoiceTotal() != null && dgmsReportWithInvoice
								.get(j).getInvoiceTotal() != "") ? Double
								.parseDouble(dgmsReportWithInvoice.get(j)
										.getInvoiceTotal()) : 0.00;

						totalGst += (dgmsReportWithInvoice.get(j).getGstValue() != null && dgmsReportWithInvoice
								.get(j).getGstValue() != "") ? Double
								.parseDouble(dgmsReportWithInvoice.get(j)
										.getGstValue()) : 0.00;
					}
					// //System.out.println("totalCost---->" + totalCost);

					model.addAttribute("totalCost", totalCost);
					model.addAttribute("totalGst", totalGst);
				} else {
					model.addAttribute("totalCost", "");
					model.addAttribute("totalGst", "");
				}

				cost = 0.00;
				gst = 0.00;
				if (dgmsReportWithOutInvoice.size() != 0
						&& dgmsReportWithOutInvoice.get(0).getCost() != "") {
					for (int j = 0; j < dgmsReportWithOutInvoice.size(); j++) {
						String key = dgmsReportWithOutInvoice.get(j)
								.getTradingDeptNo();
						DGMSReport innerList = mapWithOutInvoice
								.containsKey(key) ? mapWithOutInvoice.get(key)
								: new DGMSReport();
						if (innerList.getCost() != null
								&& innerList.getCost() != ""
								&& dgmsReportWithOutInvoice.get(j).getCost() != ""
								&& dgmsReportWithOutInvoice.get(j).getCost() != null) {
							cost = Double.parseDouble(innerList.getCost())
									+ Double.parseDouble(dgmsReportWithOutInvoice
											.get(j).getCost());

						} else if (dgmsReportWithOutInvoice.get(j).getCost() != ""
								&& dgmsReportWithOutInvoice.get(j).getCost() != null) {
							cost = Double.parseDouble(dgmsReportWithOutInvoice
									.get(j).getCost());
						}
						if (innerList.getGstValue() != null
								&& innerList.getGstValue() != ""
								&& dgmsReportWithOutInvoice.get(j)
										.getGstValue() != ""
								&& dgmsReportWithOutInvoice.get(j)
										.getGstValue() != null) {
							gst = Double.parseDouble(innerList.getGstValue())
									+ Double.parseDouble(dgmsReportWithOutInvoice
											.get(j).getGstValue());

						} else if (dgmsReportWithOutInvoice.get(j)
								.getGstValue() != ""
								&& dgmsReportWithOutInvoice.get(j)
										.getGstValue() != null) {
							gst = Double.parseDouble(dgmsReportWithOutInvoice
									.get(j).getGstValue());
						}
						innerList.setCost(cost.toString());
						innerList.setGstValue(gst.toString());
						innerList.setTradingDeptNo(dgmsReportWithOutInvoice
								.get(j).getTradingDeptNo());
						innerList.setTradingDeptName(dgmsReportWithOutInvoice
								.get(j).getTradingDeptName());
						mapWithOutInvoice.put(key, innerList);

						// //System.out.println("cost.toString()="+cost.toString());
					}
					// //System.out.println("map size---->" +
					// mapWithOutInvoice.size());
					// //System.out.println("map"+mapWithOutInvoice);

					model.addAttribute("mapWithOutInvoice", mapWithOutInvoice);
				} else {
					model.addAttribute("mapWithOutInvoice",
							new HashMap<String, DGMSReport>());
				}
				Double totalCostOut = 0.00;
				Double totalGstOut = 0.00;
				if (dgmsReportWithOutInvoice != null
						&& dgmsReportWithOutInvoice.size() > 0) {
					for (int j = 0; j < dgmsReportWithOutInvoice.size(); j++) {

						totalCostOut += (dgmsReportWithOutInvoice.get(j)
								.getCost() != null && dgmsReportWithOutInvoice
								.get(j).getCost() != "") ? Double
								.parseDouble(dgmsReportWithOutInvoice.get(j)
										.getCost()) : 0.00;
						totalGstOut += (dgmsReportWithOutInvoice.get(j)
								.getGstValue() != null && dgmsReportWithOutInvoice
								.get(j).getGstValue() != "") ? Double
								.parseDouble(dgmsReportWithOutInvoice.get(j)
										.getGstValue()) : 0.00;
					}
					// //System.out.println("totalCostOut---->" + totalCostOut);

					model.addAttribute("totalCostOut", totalCostOut);
					model.addAttribute("totalGstOut", totalGstOut);
				} else {
					model.addAttribute("totalCostOut", "");
					model.addAttribute("totalGstOut", "");
				}
				if (dgmsReport.size() != 0) {
					// //System.out.println("dgmsReport.get(0).getStoreNo()"+dgmsReport.get(0).getStoreNo());
					model.addAttribute("storeNo", dgmsReport.get(0)
							.getStoreNo());
					model.addAttribute("storeName", dgmsReport.get(0)
							.getStoreName());
				}

			} else {
				// //System.out.println("in else part");

				if (dgmsReport != null && dgmsReport.size() > 0) {
					// //System.out.println("1");
					model.addAttribute(
							"msg",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				} else {
					// //System.out.println("2");
					model.addAttribute(
							"msg",
							"We could not generate the report since there is no data for selected parameters. Please try different parameters.");
				}

			}
		}
		if (request.getParameter("searchByOptions").equalsIgnoreCase("Date")) {
			param.setSearchByOptions("Date");
		} else {
			param.setSearchByOptions("WCDate");
		}

		model.addAttribute("dgmsReportWithInvoice", dgmsReportWithInvoice);
		model.addAttribute("dgmsReportWithOutInvoice", dgmsReportWithOutInvoice);
		model.addAttribute("param", param);
		ModelAndView modelAndView = new ModelAndView("dgmsReport");
		modelAndView.addObject("model", model);
		modelAndView.addAllObjects(model);
		return modelAndView;

	}

	/*
	 * @RequestMapping(value = "/reportSearchForPagination.htm", method =
	 * RequestMethod.POST) public ModelAndView
	 * reportSearchForPagination(@ModelAttribute DGMSReportParam
	 * reportParam,BindingResult result, HttpServletRequest request,
	 * HttpServletResponse response) throws Exception {
	 * ////System.out.println("entered report search"); if(result.hasErrors()) {
	 * ////System.out.println("error while binding"); } if
	 * (request.getSession(false) == null || (request.getSession(false) != null
	 * && request.getSession( false).getAttribute("user") == null)) { return new
	 * ModelAndView(new RedirectView("../../")); } ArrayList<DGMSReport>
	 * dgmsReportWithInvoice=new ArrayList<DGMSReport>(); ArrayList<DGMSReport>
	 * dgmsReportWithOutInvoice=new ArrayList<DGMSReport>();
	 * ////System.out.println("inputdate from report"+reportParam.getInputDate());
	 * //////System.out.println("inputdate from report"+reportParam.getRadio1());
	 * //////System.out.println("inputdate from report"+reportParam.getRadio2());
	 * ////System.out.println("reportParam.getRadio()="+reportParam.getRadio());
	 * ////System.out.println("inputdate from report"+reportParam.getSiteNo());
	 * //system
	 * .out.println("inputdate from report"+reportParam.getTradingDept());
	 * ////System.out.println("inputdate from report"+reportParam.getWcDate());
	 * //system
	 * .out.println("inputdate from report"+reportParam.getTradingDept());
	 * param=reportParam;
	 * ////System.out.println("param.getInputDate()"+param.getInputDate());
	 * if(((param.getInputDate()=="")||(param.getInputDate()==null))) {
	 * ////System.out.println("-->129"); model.addAttribute("msg",
	 * "Please enter Date "); }else{
	 * ////System.out.println("entered actual function");
	 * model.addAttribute("msg", ""); UserContext
	 * userContext=(UserContext)(request.getSession().getAttribute("user"));
	 * param.setSiteNo(userContext.getSiteNo()); //for other siteno its not
	 * working //param.setSiteNo("3911"); // //param.setTradingDept("02");
	 * 
	 * //param.setWcDate("10/06/2013");
	 * ////System.out.println("siteNo="+param.getSiteNo());
	 * ////System.out.println("department="+param.getTradingDept());
	 * ////System.out.println("inputDate="+param.getInputDate());
	 * ////System.out.println("wcDate="+param.getWcDate());
	 * if(request.getParameter("searchByOptions").equalsIgnoreCase("Date")){
	 * ////System.out.println("2");
	 * param.setInputDate(request.getParameter("inputDate"));
	 * param.setWcDate(""); param.setRadio("Date"); } else{
	 * ////System.out.println("3");
	 * param.setWcDate(request.getParameter("inputDate"));
	 * param.setInputDate(""); param.setRadio("WCDate");}
	 * 
	 * if(param.getInputDate().length()==8){ ////System.out.println("4");
	 * param.setInputDate(y2ToY4Converter(param.getInputDate()));
	 * ////System.out.println("param.getInputDate"+param.getInputDate()); }
	 * if(param.getWcDate().length()==8){ ////System.out.println("3");
	 * param.setWcDate(y2ToY4Converter(param.getWcDate()));
	 * ////System.out.println("param.getWcDate"+param.getWcDate()); } String
	 * pageNumber = request.getParameter("pageNumber");
	 * 
	 * if (pageNumber != null && pageNumber.trim().length() > 0) {
	 * param.setPageNo(Integer.parseInt(pageNumber) > 0 ?
	 * Integer.parseInt(pageNumber) : 1); } else { param.setPageNo(1); } try{
	 * ////System.out.println("inside try 5");
	 * dgmsReport=reportService.getDGMSReport(param); } catch(Exception e){
	 * ////System.out.println("error in line 74 = "+e); model.addAttribute("msg",
	 * "We could not generate the report since there is no data for selected parameters. Please try different parameters."
	 * ); }
	 * 
	 * Map<String, DGMSReport> mapWithInvoice = new HashMap<String, DGMSReport
	 * >(); Map<String, DGMSReport> mapWithOutInvoice = new HashMap<String,
	 * DGMSReport >(); model.addAttribute("storeNo","");
	 * model.addAttribute("storeName",""); model.addAttribute("map","");
	 * 
	 * if(dgmsReport!=null&&dgmsReport.size()!=0 &&
	 * !dgmsReport.get(0).getOrderNo().equalsIgnoreCase("")){
	 * param.setRecordCount
	 * (Integer.parseInt(dgmsReport.get(0).getMsg().trim()));
	 * ////System.out.println("valid data"); model.addAttribute("msg", "");
	 * for(int i=0;i<dgmsReport.size();i++) {
	 * if(dgmsReport.get(i).getInvoiceNo()
	 * !=null&&dgmsReport.get(i).getInvoiceNo()!="") {
	 * ////System.out.println("not null"+dgmsReport.get(i).getInvoiceNo()); int
	 * a=dgmsReport.get(i).getUserName().indexOf(" "); if(a!=0) {
	 * dgmsReport.get(
	 * i).setUserName(dgmsReport.get(i).getUserName().substring(a+1,
	 * dgmsReport.get(i).getUserName().length())); }
	 * dgmsReportWithInvoice.add(dgmsReport.get(i)); } else{
	 * ////System.out.println("null"+dgmsReport.get(i).getInvoiceNo()); int
	 * b=dgmsReport.get(i).getUserName().indexOf(" "); if(b!=0) {
	 * dgmsReport.get(
	 * i).setUserName(dgmsReport.get(i).getUserName().substring(b+1,
	 * dgmsReport.get(i).getUserName().length())); }
	 * dgmsReportWithOutInvoice.add(dgmsReport.get(i)); } } Double cost=0.00;
	 * Double gst=0.00;
	 * 
	 * if(dgmsReportWithInvoice.size()!=0&&dgmsReportWithInvoice.get(0).getCost()
	 * !=""){ for (int j=0;j<dgmsReportWithInvoice.size();j++) { String key =
	 * dgmsReportWithInvoice.get(j).getTradingDeptNo(); DGMSReport innerList =
	 * mapWithInvoice.containsKey(key) ? mapWithInvoice.get(key) : new
	 * DGMSReport(); //innerList.add(dgmsGroup);
	 * if(innerList.getInvoiceTotal()!=null && innerList.getInvoiceTotal()!=""
	 * && dgmsReportWithInvoice.get(j).getInvoiceTotal()!=""
	 * &&dgmsReportWithInvoice.get(j).getInvoiceTotal()!=null){
	 * cost=Double.parseDouble
	 * (innerList.getInvoiceTotal())+Double.parseDouble(dgmsReportWithInvoice
	 * .get(j).getInvoiceTotal());
	 * 
	 * } else if(dgmsReportWithInvoice.get(j).getInvoiceTotal()!=""
	 * &&dgmsReportWithInvoice.get(j).getInvoiceTotal()!=null){
	 * cost=Double.parseDouble(dgmsReportWithInvoice.get(j).getInvoiceTotal());
	 * } if(innerList.getGstValue()!=null && innerList.getGstValue()!="" &&
	 * dgmsReportWithInvoice.get(j).getGstValue()!=""
	 * &&dgmsReportWithInvoice.get(j).getGstValue()!=null){
	 * gst=Double.parseDouble
	 * (innerList.getGstValue())+Double.parseDouble(dgmsReportWithInvoice
	 * .get(j).getGstValue());
	 * 
	 * } else if(dgmsReportWithInvoice.get(j).getGstValue()!=""
	 * &&dgmsReportWithInvoice.get(j).getGstValue()!=null){
	 * 
	 * gst=Double.parseDouble(dgmsReportWithInvoice.get(j).getGstValue()); }
	 * innerList.setInvoiceTotal(cost.toString());
	 * innerList.setGstValue(gst.toString());
	 * innerList.setTradingDeptNo(dgmsReportWithInvoice
	 * .get(j).getTradingDeptNo());
	 * innerList.setTradingDeptName(dgmsReportWithInvoice
	 * .get(j).getTradingDeptName());
	 * 
	 * mapWithInvoice.put(key, innerList);
	 * ////System.out.println("cost.toString()="+cost.toString()); }
	 * ////System.out.println("map size---->" + mapWithInvoice.size());
	 * 
	 * model.addAttribute("mapWithInvoice", mapWithInvoice); } else{
	 * model.addAttribute("mapWithInvoice", new HashMap<String, DGMSReport >());
	 * }
	 * 
	 * 
	 * Double totalCost=0.00; Double totalGst=0.00;
	 * if(dgmsReportWithInvoice!=null&&dgmsReportWithInvoice.size()>0){ for (int
	 * j=0;j<dgmsReportWithInvoice.size();j++) {
	 * 
	 * totalCost+=(dgmsReportWithInvoice.get(j).getInvoiceTotal()!=null &&
	 * dgmsReportWithInvoice
	 * .get(j).getInvoiceTotal()!="")?Double.parseDouble(dgmsReportWithInvoice
	 * .get(j).getInvoiceTotal()):0.00;
	 * 
	 * totalGst+=(dgmsReportWithInvoice.get(j).getGstValue()!=null &&
	 * dgmsReportWithInvoice
	 * .get(j).getGstValue()!="")?Double.parseDouble(dgmsReportWithInvoice
	 * .get(j).getGstValue()):0.00; } ////System.out.println("totalCost---->" +
	 * totalCost);
	 * 
	 * model.addAttribute("totalCost", totalCost);
	 * model.addAttribute("totalGst", totalGst); } else{
	 * model.addAttribute("totalCost", ""); model.addAttribute("totalGst", "");
	 * }
	 * 
	 * 
	 * cost=0.00; gst=0.00;
	 * if(dgmsReportWithOutInvoice.size()!=0&&dgmsReportWithOutInvoice
	 * .get(0).getCost()!=""){ for (int
	 * j=0;j<dgmsReportWithOutInvoice.size();j++) { String key =
	 * dgmsReportWithOutInvoice.get(j).getTradingDeptNo(); DGMSReport innerList
	 * = mapWithOutInvoice.containsKey(key) ? mapWithOutInvoice.get(key) : new
	 * DGMSReport(); if(innerList.getCost()!=null && innerList.getCost()!="" &&
	 * dgmsReportWithOutInvoice.get(j).getCost()!=""
	 * &&dgmsReportWithOutInvoice.get(j).getCost()!=null){
	 * cost=Double.parseDouble
	 * (innerList.getCost())+Double.parseDouble(dgmsReportWithOutInvoice
	 * .get(j).getCost());
	 * 
	 * } else if(dgmsReportWithOutInvoice.get(j).getCost()!=""
	 * &&dgmsReportWithOutInvoice.get(j).getCost()!=null){
	 * cost=Double.parseDouble(dgmsReportWithOutInvoice.get(j).getCost()); }
	 * if(innerList.getGstValue()!=null && innerList.getGstValue()!="" &&
	 * dgmsReportWithOutInvoice.get(j).getGstValue()!=""
	 * &&dgmsReportWithOutInvoice.get(j).getGstValue()!=null){
	 * gst=Double.parseDouble
	 * (innerList.getGstValue())+Double.parseDouble(dgmsReportWithOutInvoice
	 * .get(j).getGstValue());
	 * 
	 * } else if(dgmsReportWithOutInvoice.get(j).getGstValue()!=""
	 * &&dgmsReportWithOutInvoice.get(j).getGstValue()!=null){
	 * gst=Double.parseDouble(dgmsReportWithOutInvoice.get(j).getGstValue()); }
	 * innerList.setCost(cost.toString());
	 * innerList.setGstValue(gst.toString());
	 * innerList.setTradingDeptNo(dgmsReportWithOutInvoice
	 * .get(j).getTradingDeptNo());
	 * innerList.setTradingDeptName(dgmsReportWithOutInvoice
	 * .get(j).getTradingDeptName()); mapWithOutInvoice.put(key, innerList);
	 * 
	 * ////System.out.println("cost.toString()="+cost.toString()); }
	 * ////System.out.println("map size---->" + mapWithOutInvoice.size());
	 * ////System.out.println("map"+mapWithOutInvoice);
	 * 
	 * model.addAttribute("mapWithOutInvoice", mapWithOutInvoice); } else{
	 * model.addAttribute("mapWithOutInvoice", new HashMap<String, DGMSReport
	 * >()); } Double totalCostOut=0.00; Double totalGstOut=0.00;
	 * if(dgmsReportWithOutInvoice!=null&&dgmsReportWithOutInvoice.size()>0){
	 * for (int j=0;j<dgmsReportWithOutInvoice.size();j++) {
	 * 
	 * totalCostOut+=(dgmsReportWithOutInvoice.get(j).getCost()!=null &&
	 * dgmsReportWithOutInvoice
	 * .get(j).getCost()!="")?Double.parseDouble(dgmsReportWithOutInvoice
	 * .get(j).getCost()):0.00;
	 * totalGstOut+=(dgmsReportWithOutInvoice.get(j).getGstValue()!=null &&
	 * dgmsReportWithOutInvoice
	 * .get(j).getGstValue()!="")?Double.parseDouble(dgmsReportWithOutInvoice
	 * .get(j).getGstValue()):0.00; } ////System.out.println("totalCostOut---->" +
	 * totalCostOut);
	 * 
	 * model.addAttribute("totalCostOut", totalCostOut);
	 * model.addAttribute("totalGstOut", totalGstOut); } else{
	 * model.addAttribute("totalCostOut", ""); model.addAttribute("totalGstOut",
	 * ""); } if(dgmsReport.size()!=0){
	 * ////System.out.println("dgmsReport.get(0).getStoreNo()"
	 * +dgmsReport.get(0).getStoreNo());
	 * model.addAttribute("storeNo",dgmsReport.get(0).getStoreNo());
	 * model.addAttribute("storeName",dgmsReport.get(0).getStoreName()); }
	 * 
	 * } else{ ////System.out.println("in else part");
	 * 
	 * if(dgmsReport!=null && dgmsReport.size()>0){ ////System.out.println("1");
	 * model.addAttribute("msg",
	 * "We could not generate the report since there is no data for selected parameters. Please try different parameters."
	 * ); } else{ ////System.out.println("2"); model.addAttribute("msg",
	 * "We could not generate the report since there is no data for selected parameters. Please try different parameters."
	 * ); }
	 * 
	 * } } if(request.getParameter("searchByOptions").equalsIgnoreCase("Date")){
	 * param.setSearchByOptions("Date"); } else{
	 * param.setSearchByOptions("WCDate"); }
	 * 
	 * model.addAttribute("dgmsReportWithInvoice",dgmsReportWithInvoice);
	 * model.addAttribute("dgmsReportWithOutInvoice",dgmsReportWithOutInvoice);
	 * model.addAttribute("param",param); ModelAndView modelAndView = new
	 * ModelAndView("dgmsReport"); modelAndView.addObject("model", model);
	 * modelAndView.addAllObjects(model); return modelAndView;
	 * 
	 * }
	 */

	/*
	 * @RequestMapping(value = "/dateFormatter.htm", method = RequestMethod.GET)
	 * 
	 * @ResponseBody public String dateFormatter(HttpServletRequest request,
	 * HttpServletResponse response){ String
	 * textDate=request.getParameter("date"); Date actualDate = null;
	 * 
	 * SimpleDateFormat yyyy = new SimpleDateFormat( "MM/dd/yyyy" );
	 * SimpleDateFormat yy = new SimpleDateFormat( "MM/dd/yy" );
	 * 
	 * try { actualDate = yy.parse( textDate ); } catch (Exception pe ) {
	 * pe.printStackTrace(); }
	 * 
	 * //system.out.print( textDate + " enhanced:  " ); ////System.out.println(
	 * yyyy.format( actualDate ) ); return yyyy.format( actualDate ); }
	 */
	public String y2ToY4Converter(String textDate) {

		Date actualDate = null;

		SimpleDateFormat yyyy = new SimpleDateFormat("dd/MM/yyyy");
		SimpleDateFormat yy = new SimpleDateFormat("dd/MM/yy");

		try {
			actualDate = yy.parse(textDate);
		} catch (Exception pe) {
			pe.printStackTrace();
		}

		// system.out.print( textDate + " enhanced:  " );
		// //System.out.println( yyyy.format( actualDate ) );
		return yyyy.format(actualDate);
	}

}
