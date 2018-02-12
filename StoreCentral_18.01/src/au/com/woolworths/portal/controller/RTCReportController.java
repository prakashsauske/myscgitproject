package au.com.woolworths.portal.controller;

import java.io.BufferedReader;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Scope;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.view.RedirectView;

import au.com.woolworths.portal.model.RTCPDF;
import au.com.woolworths.portal.model.RTCPDFParam;
import au.com.woolworths.portal.model.RTCReportSubReportInfo;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.jcraft.jsch.Channel;
import com.jcraft.jsch.ChannelSftp;
import com.jcraft.jsch.JSch;
import com.jcraft.jsch.Session;

/**
 * @author xlki1 a
 */
@Controller
@RequestMapping(value = "*/rtcReport")
@Scope("session")
public class RTCReportController extends BaseController {
	
	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportRTC']}")
	private String screenCode;

	@Autowired
	private JasperReportUtil jasper;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	@Value("#{properties['rtcReportName']}")
	private String rtcReportName = null;

	@Value("#{properties['rtcSubReportNameDept']}")
	private String rtcSubReportNameDept = null;

	@Value("#{properties['rtcSubReportNameArticle']}")
	private String rtcSubReportNameArticle = null;

	@Value("#{properties['rtcSubReportNamePercent']}")
	private String rtcSubReportNamePercent = null;

	@Value("#{url['sftphost']}")
	private String sftphost;

	@Value("#{url['sftpport']}")
	private int sftpport;

	@Value("#{url['sftpuser']}")
	private String sftpuser;

	@Value("#{url['sftppassword']}")
	private String sftppassword;

	@Value("#{url['sftpfilename']}")
	private String sftpfilename;

	@Value("#{url['sftpfiletype']}")
	private String sftpfiletype;

	private byte[] pdfArray = null;

	private RTCPDFParam rtcParamGlobal;
	private static final Logger log = Logger
			.getLogger(RTCReportController.class.getName());

	@RequestMapping(value = "/loadRTCReport.htm", method = RequestMethod.GET)
	public ModelAndView loadRTCReport(HttpServletRequest request,
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
		log.info("Inside loadRTCReport");
		ModelAndView modelAndView = new ModelAndView("ReportRTC");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/rtcTablePrint.htm", consumes = "application/json")
	@ResponseBody
	public String rtcPrint(@RequestBody RTCPDFParam rtcParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable, Exception {
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		rtcParamGlobal=rtcParam;
		return CommonUtils.convertObjectTojson("success");

	}
	
	private boolean genPDFrtcTable(HttpServletRequest request) throws Throwable{
		RTCPDFParam rtcParam= rtcParamGlobal;
		UserContext userContext = (UserContext) (request.getSession()
				.getAttribute("user"));

		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();

		ArrayList<RTCReportSubReportInfo> mainList = null;
		RTCReportSubReportInfo mainData = new RTCReportSubReportInfo();

		mainData.setDataList(rtcParam.getData());

		mainList = new ArrayList<RTCReportSubReportInfo>();
		mainList.add(mainData);

		reportInputParams.put("storeNo", userContext.getSiteNo());
		reportInputParams.put("storeName", userContext.getSiteName());
		reportInputParams.put("reportFor", rtcParam.getReportFor());
		reportInputParams.put("totalCount",
				String.valueOf(rtcParam.getData().size()));
		reportInputParams.put("SUBREPORT_NAME",
				findRTCSubReportName(rtcParam.getGroupBy()));

		JasperParamsBean bean = new JasperParamsBean(rtcReportName,
				new JRBeanCollectionDataSource(mainList), reportInputParams, 1);
		beanList.add(bean);
		try {
			byte[] byos = jasper.printReportTimeZone(beanList, "pdf",
					jasperRptResponseHandler.getReportSourcePath(request),
					jasperRptResponseHandler.getReportBinPath(request),request)
					.toByteArray();
			pdfArray = byos;
		} catch (Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			return false;
		}
		return true;
	}

	@ResponseBody
	@RequestMapping(value = "/downloadRTCReportPdf.pdf", method = RequestMethod.GET)
	public byte[] downloadRTCReportPdf(HttpServletRequest request,
			HttpServletResponse response) throws IOException {
		response.setContentType("application/pdf");
		try {
			genPDFrtcTable(request);
		} catch (Throwable e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
		return null;
	}

	public String findRTCSubReportName(String groupBy) {
		String rtcSubReportName = rtcSubReportNameDept;
		try {
			if (groupBy.equals("D")) {// Dept
				rtcSubReportName = rtcSubReportNameDept;
			} else if (groupBy.equals("A")) {// Article
				rtcSubReportName = rtcSubReportNameArticle;
			} else if (groupBy.equals("M")) {// Markdown percent
				rtcSubReportName = rtcSubReportNamePercent;
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return rtcSubReportName;
	}

	@RequestMapping(value = "/rtcPrint.htm", method = RequestMethod.GET)
	public String rtcPrint(HttpServletRequest request,
			HttpServletResponse response) throws Throwable, Exception {
		String prod_no = request.getParameter("fromDate");
		String date = prod_no.split("/")[0].trim() + "-"
				+ prod_no.split("/")[1].trim() + "-"
				+ prod_no.split("/")[2].trim();

		UserContext userContext = (UserContext) (request.getSession()
				.getAttribute("user"));

		String site = userContext.getSiteNo();

		// ByteArrayOutputStream baos = ftpServer();
		ArrayList<RTCPDF> rtcpdfList = new ArrayList<RTCPDF>();
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		rtcpdfList = sftpServerTransfer(date, site);

		ArrayList<RTCReportSubReportInfo> mainList = null;
		RTCReportSubReportInfo mainData = new RTCReportSubReportInfo();

		mainData.setDataList(rtcpdfList);

		mainList = new ArrayList<RTCReportSubReportInfo>();
		mainList.add(mainData);

		reportInputParams.put("storeNo", userContext.getSiteNo());
		reportInputParams.put("storeName", userContext.getSiteName());
		reportInputParams.put("reportFor", date);
		reportInputParams.put("totalCount", String.valueOf(rtcpdfList.size()));
		reportInputParams.put("SUBREPORT_NAME", findRTCSubReportName("D"));

		List<JasperParamsBean> beanList = new ArrayList<JasperParamsBean>();
		if (rtcpdfList != null && rtcpdfList.size() > 0) {
			JasperParamsBean bean = new JasperParamsBean(rtcReportName,
					new JRBeanCollectionDataSource(mainList),
					reportInputParams, 1);
			beanList.add(bean);
			try {
				byte[] byos = jasper.printReport(beanList, "pdf",
						jasperRptResponseHandler.getReportSourcePath(request),
						jasperRptResponseHandler.getReportBinPath(request))
						.toByteArray();
				pdfArray = byos;
				response.setContentType("application/pdf");
				response.setContentLength(pdfArray.length);
				response.getOutputStream().write(pdfArray);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
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

	private ArrayList<RTCPDF> sftpServerTransfer(String date, String site) {

		String SFTPHOST = sftphost;
		int SFTPPORT = sftpport;
		String SFTPUSER = sftpuser;
		String SFTPPASS = sftppassword;
		String SFTPWORKINGDIR = sftpfilename + date + "/" + site + sftpfiletype;

		log.info("SFTPHOST =" + sftphost + " sftpport =" + sftpport
				+ " sftpuser =" + sftpuser + " sftppassword =" + sftppassword);
		Session session = null;
		Channel channel = null;
		ChannelSftp channelSftp = null;
		log.info("preparing the host information for sftp.");
		ArrayList<RTCPDF> rtcpdfList = new ArrayList<RTCPDF>();
		try {
			JSch jsch = new JSch();
			session = jsch.getSession(SFTPUSER, SFTPHOST, SFTPPORT);
			session.setPassword(SFTPPASS);
			java.util.Properties config = new java.util.Properties();
			config.put("StrictHostKeyChecking", "no");
			session.setConfig(config);
			session.connect();
			log.info("Host connected.");
			channel = session.openChannel("sftp");
			channel.connect();
			log.info("sftp channel opened and connected.");
			channelSftp = (ChannelSftp) channel;
			log.info("trying to fetch the file " + SFTPWORKINGDIR);
			InputStream stream = channelSftp.get(SFTPWORKINGDIR);
			log.info("fetched info " + stream);

			BufferedReader br = null;
			br = new BufferedReader(new InputStreamReader(stream));
			StringBuilder out = new StringBuilder();
			String line;

			RTCPDF rtcpdf = null;
			while ((line = br.readLine()) != null) {
				rtcpdf = new RTCPDF();
				if (line.contains(",")) {
					rtcpdf.setSite(line.split(",")[0]);
					rtcpdf.setDepartment(line.split(",")[1] );
					rtcpdf.setDepartmentDesc(line.split(",")[2]);
					rtcpdf.setFromToDate(line.split(",")[3]);
					rtcpdf.setArticle(line.split(",")[4]);
					rtcpdf.setArticleDesc(line.split(",")[5]);
					// rtcpdf.setSellPrice(line.split(",")[5]);
					rtcpdf.setRtcFrom(line.split(",")[6]);
					rtcpdf.setRtcTo(line.split(",")[7]);
					rtcpdf.setPerc(line.split(",")[8]);
					rtcpdf.setVal(line.split(",")[9]);
					rtcpdf.setReason(line.split(",")[10]);
					rtcpdf.setFromDate(line.split(",")[11]);
					rtcpdf.setUserFinal(line.split(",")[12]);
					rtcpdf.setUser(line.split(",")[12]);
					rtcpdf.setTickets(line.split(",")[13]);
					rtcpdf.setUser_name(line.split(",")[14]);
					rtcpdf.setSellPrice(line.split(",")[15]);
					
					rtcpdfList.add(rtcpdf);
				}
			}

			ByteArrayOutputStream bos = null;
			log.info(out.toString());

			bos = new ByteArrayOutputStream();
			byte[] buf = new byte[256];

			for (int readNum; (readNum = stream.read(buf)) != -1;) {
				bos.write(buf, 0, readNum); // no doubt here is 0
				// Writes len bytes from the specified byte array starting at
				// offset off to this byte array output stream.
				log.info("read " + readNum + " bytes,");
			}

		} catch (Exception ex) {
			// ex.printStackTrace();
			log.info("Exception found while tranfer the response.");
		} finally {

			channelSftp.exit();
			log.info("sftp Channel exited.");
			channel.disconnect();
			log.info("Channel disconnected.");
			session.disconnect();
			log.info("Host Session disconnected.");
		}
		return rtcpdfList;
	}
}
