package au.com.woolworths.portal.reports;

import java.io.ByteArrayOutputStream;
import java.io.File;
import java.io.IOException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.Locale;
import java.util.Map;
import java.util.StringTokenizer;
import java.util.TimeZone;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.crosstabs.JRCrosstab;
import net.sf.jasperreports.engine.JRBreak;
import net.sf.jasperreports.engine.JRChart;
import net.sf.jasperreports.engine.JRComponentElement;
import net.sf.jasperreports.engine.JRElementGroup;
import net.sf.jasperreports.engine.JREllipse;
import net.sf.jasperreports.engine.JREmptyDataSource;
import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.JRFrame;
import net.sf.jasperreports.engine.JRGenericElement;
import net.sf.jasperreports.engine.JRImage;
import net.sf.jasperreports.engine.JRLine;
import net.sf.jasperreports.engine.JRParameter;
import net.sf.jasperreports.engine.JRPrintElement;
import net.sf.jasperreports.engine.JRPrintPage;
import net.sf.jasperreports.engine.JRRectangle;
import net.sf.jasperreports.engine.JRStaticText;
import net.sf.jasperreports.engine.JRSubreport;
import net.sf.jasperreports.engine.JRTextField;
import net.sf.jasperreports.engine.JRVisitor;
import net.sf.jasperreports.engine.JasperCompileManager;
import net.sf.jasperreports.engine.JasperExportManager;
import net.sf.jasperreports.engine.JasperFillManager;
import net.sf.jasperreports.engine.JasperPrint;
import net.sf.jasperreports.engine.JasperReport;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;
import net.sf.jasperreports.engine.design.JasperDesign;
import net.sf.jasperreports.engine.export.JRPdfExporter;
import net.sf.jasperreports.engine.export.JRXlsExporter;
import net.sf.jasperreports.engine.export.ooxml.JRXlsxExporter;
import net.sf.jasperreports.engine.fill.JRTemplatePrintText;
import net.sf.jasperreports.engine.util.JRElementsVisitor;
import net.sf.jasperreports.engine.util.JRLoader;
import net.sf.jasperreports.engine.util.JRSaver;
import net.sf.jasperreports.engine.xml.JRXmlLoader;
import net.sf.jasperreports.export.SimpleExporterInput;
import net.sf.jasperreports.export.SimpleOutputStreamExporterOutput;

import org.apache.http.HttpRequest;
import org.apache.log4j.Logger;

import au.com.woolworths.portal.model.UserContext;

/**
 * 
 * @author xsvm1
 * 
 * 
 */
public class JasperReportUtil {

	// @Value("#{properties['reportSessionCacheEnabled']}")
	// private String reportSessionCacheEnabled;

	private static JasperReportUtil instance = null;
	private static final Logger logger = Logger
			.getLogger(JasperReportUtil.class.getName());

	/*
	 * protected JasperReportUtil() { // Exists only to defeat instantiation. }
	 */
	public static JasperReportUtil getInstance() {
		if (instance == null) {
			instance = new JasperReportUtil();
		}
		return instance;
	}

	/*
	 * public boolean isReportSessionCacheEnabled() { return
	 * isReportSessionCacheEnabled(reportSessionCacheEnabled); }
	 */
	public boolean isLatestBinaryAlreadyAvail(String reportName,
			String reportRealPath) throws IOException {

		logger.info("jasper compile path in server : " + reportRealPath
				+ "/WEB-INF/classes/" + reportName);
		File srcFile = new File(reportRealPath + "/jasperreports/src/"
				+ reportName + ".jrxml");
		File binFile = new File(reportRealPath + "/WEB-INF/classes/"
				+ reportName + ".jasper");
		if (binFile.exists()) {
			logger.info("The binary file " + reportName
					+ ".jasper already exists");
			Date binaryCreateDt = new Date(binFile.lastModified());
			Date srcCreateDt = new Date(srcFile.lastModified());
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss.SSS a");
			logger.info("Source file date : " + df.format(srcCreateDt)
					+ "; mills : " + srcFile.lastModified());
			logger.info("Binary file date : " + df.format(binaryCreateDt)
					+ "; mills : " + binFile.lastModified());
			if (srcCreateDt.after(binaryCreateDt)) {
				logger.info("The binary file "
						+ reportName
						+ ".jasper is outdated, will attempt compile one at runtime");
				return false;
			} else {
				logger.info("The binary file " + reportName
						+ ".jasper is available and using this");
				return true;
			}
		} else {
			logger.info("The binary file "
					+ reportName
					+ ".jasper does not exists, will attempt compile one at runtime");
			return false;
		}
	}

	public boolean isLatestBinaryAlreadyAvail(String reportName,
			String srcPath, String binPath) throws IOException {

		logger.info("jasper compile path in server : " + binPath + reportName);
		File srcFile = new File(srcPath + reportName + ".jrxml");
		File binFile = new File(binPath + reportName + ".jasper");
		if (binFile.exists()) {
			logger.info("The binary file " + reportName
					+ ".jasper already exists");
			Date binaryCreateDt = new Date(binFile.lastModified());
			Date srcCreateDt = new Date(srcFile.lastModified());
			DateFormat df = new SimpleDateFormat("dd/MM/yyyy hh:mm:ss.SSS a");
			logger.info("Source file date : " + df.format(srcCreateDt)
					+ "; mills : " + srcFile.lastModified());
			logger.info("Binary file date : " + df.format(binaryCreateDt)
					+ "; mills : " + binFile.lastModified());
			if (srcCreateDt.after(binaryCreateDt)) {
				logger.info("The binary file "
						+ reportName
						+ ".jasper is outdated, will attempt compile one at runtime");
				return false;
			} else {
				logger.info("The binary file " + reportName
						+ ".jasper is available and using this");
				return true;
			}
		} else {
			logger.info("The binary file "
					+ reportName
					+ ".jasper does not exists, will attempt compile one at runtime");
			return false;
		}
	}

	/**
	 * 
	 * @param reportName
	 *            - Name of the report to be printed
	 * @param reportRealPath
	 *            - Actual location of the print report
	 * @return
	 * @throws JRException
	 * @throws IOException
	 */
	public JasperReport getJasperReport(String reportName, String srcPath,
			String binPath) throws JRException, IOException {
		JasperReport rep = null;
		if (isLatestBinaryAlreadyAvail(reportName, srcPath, binPath) == false) {
			logger.info("Either Binary for report not available or outdated : "
					+ reportName + ". Will attempt to compile one at runtime");
			try {
				rep = compileReport(reportName, srcPath, binPath);
			} catch (Throwable e) {
				logger.error("Error while compiling the jasper report", e);
				e.printStackTrace();
			}

		} else {
			logger.info("using the binary already availble for the report : "
					+ reportName);
			rep = (JasperReport) JRLoader.loadObject(new File(binPath
					+ reportName + ".jasper"));
		}
		if (rep != null) {// && !"StarStoreRpt".equals(reportName)
			JRElementsVisitor.visitReport(rep,
					new MyJRVisitor(srcPath, binPath));
		}
		return rep;
	}

	/**
	 * Force compile report
	 */
	public String forceCompileReport(String srcPath, String binPath) {
		// String reportRealPath = ctx.getRealPath("");
		File[] files = new File(srcPath).listFiles();
		// If this pathname does not denote a directory, then listFiles()
		// returns null.
		int count = 0;
		int fail = 0;
		int invalid = 0;
		if (files != null) {
			String regEx = "(.*)(?=.[jJ][rR][xX][mM][lL])";
			Pattern pattern = Pattern.compile(regEx);
			Matcher matcher = null;
			for (File file : files) {
				if (file.isFile()) {
					try {
						matcher = pattern.matcher(file.getName());
						if (matcher.find()) {
							compileReport(matcher.group(), srcPath, binPath);
							count++;
						} else {
							invalid++;
							logger.error("Looks like an invalid report file to compile : "
									+ file.getName());
						}
					} catch (Throwable e) {
						fail++;
						logger.error("Error while compiling the reports "
								+ file.getName() + " : ", e);
					}
				}
			}
		}
		return "Compiled : " + count + "; Failed : " + fail + "; Invalid : "
				+ invalid;
	}

	/**
	 * Compile report
	 */
	public JasperReport compileReport(String reportName, String srcPath,
			String binPath) throws Throwable {
		JasperReport jasperReport = null;
		if (isLatestBinaryAlreadyAvail(reportName, srcPath, binPath) == false) {
			jasperReport = compileMyJasper(reportName, srcPath, binPath);
		} else {
			jasperReport = (JasperReport) JRLoader.loadObject(new File(binPath
					+ reportName + ".jasper"));
		}
		return jasperReport;
	}

	/**
	 * Recursively compile report and subreports
	 */
	public JasperReport compileMyJasper(String reportName,
			final String srcPath, final String binPath) throws Throwable {
		JasperDesign jasperDesign = JRXmlLoader.load(srcPath + reportName
				+ ".jrxml");
		JasperReport jasperReport = JasperCompileManager
				.compileReport(jasperDesign);
		JRSaver.saveObject(jasperReport, binPath + reportName + ".jasper");
		logger.info("Saving compiled report to: " + binPath + reportName
				+ ".jasper");
		return jasperReport;
	}

	/**
	 * @throws IOException
	 * @throws JRException
	 * 
	 */
	private JasperPrint getJasperPrint(String reportName, String srcPath,
			String binPath, Map<String, Object> reportInputParams,
			JRBeanCollectionDataSource beanDS) throws JRException, IOException {
		JasperReport rep = getJasperReport(reportName, srcPath, binPath);
		logger.info("Report " + rep);
		JasperPrint printedReport = JasperFillManager.fillReport(rep,
				reportInputParams, beanDS);
		return printedReport;

	}

	/**
	 * 
	 * @param reportName
	 *            - Name of the report to be printed
	 * @param beanDS
	 *            - Data source for the report
	 * @param reportRealPath
	 *            - Actual location of the print report
	 * @param reportInputParams
	 *            - input parameter to the report
	 * @return ByteArrayOutputStream - Format of the report to be printed
	 * @throws JRException
	 * @throws IOException
	 */
	public ByteArrayOutputStream printPdfReport(String reportName,
			JRBeanCollectionDataSource beanDS, String srcPath, String binPath,
			Map<String, Object> reportInputParams) throws JRException,
			IOException {
		logger.info("Entering the pdf format report for :: " + reportName);
		/* Create the JasperPrint object with the template and the data */
		JasperPrint jasperPrint = getJasperPrint(reportName, srcPath, binPath,
				reportInputParams, beanDS);
		ByteArrayOutputStream byos = new ByteArrayOutputStream();
		JRPdfExporter exporter = new JRPdfExporter();
		exporter.setExporterInput(new SimpleExporterInput(jasperPrint));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byos));

		exporter.exportReport();
		logger.info("Exiting the pdf format report for :: " + reportName);
		return byos;
	}

	/**
	 * 
	 * @param reportName
	 *            - Name of the report to be printed
	 * @param beanDS
	 *            - Data source for the report
	 * @param reportRealPath
	 *            - Actual location of the print report
	 * @param reportInputParams
	 *            - input parameter to the report
	 * @return ByteArrayOutputStream - Format of the report to be printed
	 * @throws JRException
	 * @throws IOException
	 */
	public ByteArrayOutputStream printExcelReport(String reportName,
			JRBeanCollectionDataSource beanDS, String srcPath, String binPath,
			Map<String, Object> reportInputParams) throws JRException,
			IOException {
		logger.info("Entering the Excel format report for :: " + reportName);
		/* Create the JasperPrint object with the template and the data */
		JasperPrint prn = getJasperPrint(reportName, srcPath, binPath,
				reportInputParams, beanDS);
		ByteArrayOutputStream byos = new ByteArrayOutputStream();
		JRXlsExporter exporter = new JRXlsExporter();
		exporter.setExporterInput(new SimpleExporterInput(prn));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byos));
		exporter.exportReport();
		logger.info("Exiting the Excel format report for :: " + reportName);
		return byos;
	}

	/**
	 * 
	 * @param reportName
	 *            - Name of the report to be printed
	 * @param beanDS
	 *            - Data source for the report
	 * @param reportRealPath
	 *            - Actual location of the print report
	 * @param reportInputParams
	 *            - input parameter to the report
	 * @return ByteArrayOutputStream - Format of the report to be printed
	 * @throws JRException
	 * @throws IOException
	 */
	public ByteArrayOutputStream printExcelXReport(String reportName,
			JRBeanCollectionDataSource beanDS, String srcPath, String binPath,
			Map<String, Object> reportInputParams) throws JRException,
			IOException {
		logger.info("Entering the ExcelX format report for :: " + reportName);
		/* Create the JasperPrint object with the template and the data */
		JasperPrint prn = getJasperPrint(reportName, srcPath, binPath,
				reportInputParams, beanDS);

		ByteArrayOutputStream byos = new ByteArrayOutputStream();
		JRXlsxExporter exporter = new JRXlsxExporter();
		exporter.setExporterInput(new SimpleExporterInput(prn));
		exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(byos));
		exporter.exportReport();
		logger.info("Exiting the ExcelX format report for :: " + reportName);
		return byos;
	}

	/**
	 * 
	 * @param reportName
	 *            - Name of the report to be printed
	 * @param printReportFormat
	 *            - Format of the report to be printed
	 * @param beanDS
	 *            - Data source for the report
	 * @param reportRealPath
	 *            - Actual location of the print report
	 * @param reportInputParams
	 *            - input parameter to the report
	 * @return ByteArrayOutputStream - Format of the report to be printed
	 * @throws JRException
	 * @throws IOException
	 */
	public ByteArrayOutputStream printReport(String reportName,
			String printReportFormat, JRBeanCollectionDataSource beanDS,
			Map<String, Object> reportInputParams, String srcPath,
			String binPath) throws JRException, IOException {
		ByteArrayOutputStream byos = null;
		reportInputParams.put("SUBREPORT_DIR", binPath);
		reportInputParams.put("REPORT_FORMAT_FACTORY",
				new CustomNumberFormatFactory());
		if ("pdf".equalsIgnoreCase(printReportFormat)) {

			byos = printPdfReport(reportName, beanDS, srcPath, binPath,
					reportInputParams);
		} else if ("xls".equalsIgnoreCase(printReportFormat)) {

			byos = printExcelReport(reportName, beanDS, srcPath, binPath,
					reportInputParams);
		} else if ("xlsx".equalsIgnoreCase(printReportFormat)) {

			byos = printExcelXReport(reportName, beanDS, srcPath, binPath,
					reportInputParams);
		}
		return byos;
	}

	public ByteArrayOutputStream printReportTimeZone(
			List<JasperParamsBean> jasperParams, String printReportFormat,
			String srcPath, String binPath, HttpServletRequest request)
			throws Throwable {
		setTimeZoneOffSet(null, request, jasperParams);
		return printReport(jasperParams, printReportFormat, srcPath, binPath);
	}

	public ByteArrayOutputStream printPdfReportTimeZone(String reportName,
			JRBeanCollectionDataSource beanDS, String srcPath, String binPath,
			Map<String, Object> reportInputParams, HttpServletRequest request)
			throws Throwable {
		setTimeZoneOffSet(reportInputParams, request, null);
		return printPdfReport(reportName, beanDS, srcPath, binPath,
				reportInputParams);
	}

	public byte[] printReportTimeZone(String reportName,
			JREmptyDataSource beanDS, String srcPath, String binPath,
			Map<String, Object> reportInputParams, HttpServletRequest request)
			throws JRException, IOException, ClassNotFoundException {
		setTimeZoneOffSet(reportInputParams, request, null);
		return printReport(reportName, beanDS, srcPath, binPath,
				reportInputParams);
	}

	public void setTimeZoneOffSet(Map<String, Object> reportInputParams,
			HttpServletRequest request, List<JasperParamsBean> jasperParams) {

		try {
			String user = ((UserContext) request.getSession().getAttribute(
					"user")).getTimeZoneOffSet();
			if (user == null || user.isEmpty()) {
				user = "-600";
			}
			//Defect_12074
			if (reportInputParams != null && reportInputParams.size() > 0) {
				reportInputParams.put(
						JRParameter.REPORT_TIME_ZONE,
						TimeZone.getTimeZone(user));
				reportInputParams.put(JRParameter.REPORT_LOCALE,
						Locale.getDefault());
			} else if (jasperParams != null && jasperParams.size() > 0) {
				for (JasperParamsBean bean : jasperParams) {
					if (bean.getReportInputParams() != null
							&& bean.getReportInputParams().size() > 0) {
						bean.getReportInputParams().put(
								JRParameter.REPORT_TIME_ZONE,
								TimeZone.getTimeZone(user));
						bean.getReportInputParams().put(
								JRParameter.REPORT_LOCALE, Locale.getDefault());
					}
				}
			}
		} catch (Exception e) {
			e.printStackTrace();
		}

	}

	public ByteArrayOutputStream printReport(
			List<JasperParamsBean> jasperParams, String printReportFormat,
			String srcPath, String binPath) throws Throwable {

		ByteArrayOutputStream byos = null;
		Map<String, Object> rptParam = null;
		List<JasperPrint> jasperPrints = new ArrayList<JasperPrint>();
		if ("pdf".equalsIgnoreCase(printReportFormat)) {
			for (JasperParamsBean tmp : jasperParams) {
				rptParam = tmp.getReportInputParams();
				rptParam.put("SUBREPORT_DIR", binPath);
				rptParam.put("REPORT_FORMAT_FACTORY",
						new CustomNumberFormatFactory());
				jasperPrints.add(getJasperPrint(tmp.getReportName(), srcPath,
						binPath, rptParam, tmp.getBeanDs()));
				logger.info("Exiting the Excel format report for :: "
						+ tmp.getReportName());
			}
			drawPageNumbers(jasperPrints);
			byos = new ByteArrayOutputStream();

			JRPdfExporter exporter = new JRPdfExporter();
			// JasperPrint prn = getAllPages(jasperPrints);
			exporter.setExporterInput(SimpleExporterInput
					.getInstance(jasperPrints));
			// exporter.setExporterInput(new SimpleExporterInput(prn));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(
					byos));

			exporter.exportReport();

		} else if ("xls".equalsIgnoreCase(printReportFormat)) {
			String reportName = null;
			for (JasperParamsBean tmp : jasperParams) {
				reportName = tmp.getReportName();
				rptParam = tmp.getReportInputParams();
				rptParam.put("SUBREPORT_DIR", binPath);
				rptParam.put("REPORT_FORMAT_FACTORY",
						new CustomNumberFormatFactory());
				jasperPrints.add(getJasperPrint(reportName, srcPath, binPath,
						rptParam, tmp.getBeanDs()));
				logger.info("Exiting the Excel format report for :: "
						+ tmp.getReportName());
			}
			byos = new ByteArrayOutputStream();
			JRXlsExporter exporter = new JRXlsExporter();
			exporter.setExporterInput(SimpleExporterInput
					.getInstance(jasperPrints));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(
					byos));
			exporter.exportReport();
		} else if ("xlsx".equalsIgnoreCase(printReportFormat)) {
			String reportName = null;
			for (JasperParamsBean tmp : jasperParams) {
				reportName = tmp.getReportName();
				rptParam = tmp.getReportInputParams();
				rptParam.put("SUBREPORT_DIR", binPath);
				rptParam.put("REPORT_FORMAT_FACTORY",
						new CustomNumberFormatFactory());
				jasperPrints.add(getJasperPrint(reportName, srcPath, binPath,
						rptParam, tmp.getBeanDs()));
				logger.info("Exiting the Excel format report for :: "
						+ tmp.getReportName());
			}
			byos = new ByteArrayOutputStream();
			JRXlsxExporter exporter = new JRXlsxExporter();
			exporter.setExporterInput(SimpleExporterInput
					.getInstance(jasperPrints));
			exporter.setExporterOutput(new SimpleOutputStreamExporterOutput(
					byos));
			exporter.exportReport();
		}
		return byos;
	}

	public byte[] printReport(String reportName, JREmptyDataSource beanDS,
			String srcPath, String binPath,
			Map<String, Object> reportInputParams) throws JRException,
			IOException, ClassNotFoundException {
		ByteArrayOutputStream byos = null;
		byos = printPdfReport(reportName, beanDS, srcPath, binPath,
				reportInputParams);
		return byos.toByteArray();
	}

	public ByteArrayOutputStream printPdfReport(String reportName,
			JREmptyDataSource beanDS, String srcPath, String binPath,
			Map<String, Object> reportInputParams) throws JRException,
			IOException, ClassNotFoundException {
		ByteArrayOutputStream byos = new ByteArrayOutputStream();

		/* Create the JasperPrint object with the template and the data */
		JasperReport Rep = getJasperReport(reportName, srcPath, binPath);
		JasperPrint Prn = JasperFillManager.fillReport(Rep, reportInputParams,
				beanDS);
		try {
			JasperExportManager.exportReportToPdfStream(Prn, byos);
		} catch (Exception e) {
			e.printStackTrace();
		}
		return byos;
	}

	private void drawPageNumbers(List<JasperPrint> listJasperPrint)
			throws JRException {

		int pageCount = 0;
		int totPages = 0;

		for (JasperPrint jasperPrint : listJasperPrint) {
			totPages += jasperPrint.getPages().size();
		}

		for (JasperPrint jasperPrint : listJasperPrint) {
			for (JRPrintPage currentPage : jasperPrint.getPages()) {
				pageCount++;
				List<JRPrintElement> listElements = currentPage.getElements();

				for (Object element : listElements) {
					// logger.info("element ? "+element.getClass().getName());
					if (element instanceof JRTemplatePrintText) {
						JRTemplatePrintText templatePrintText = (JRTemplatePrintText) element;

						// set currrent page
						if (templatePrintText.getKey() != null
								&& templatePrintText.getKey().equalsIgnoreCase(
										"textFieldDynaPage")) {
							templatePrintText.setText("Page "
									+ String.valueOf(pageCount) + " of "
									+ totPages);
						}

						// set total number of pages
						/*
						 * if (templatePrintText.getKey() != null &&
						 * templatePrintText
						 * .getKey().equalsIgnoreCase("textFieldNumberOfPages"))
						 * {
						 * templatePrintText.setText(String.valueOf(totPages));
						 * }
						 */
					}
				}
			}
		}

		// return;
	}

	class MyJRVisitor implements JRVisitor {
		private String srcPath;
		private String binPath;
		private List<String> completedSubReports = new ArrayList<String>(30);

		public String getSrcPath() {
			return srcPath;
		}

		public void setSrcPath(String srcPath) {
			this.srcPath = srcPath;
		}

		public String getBinPath() {
			return binPath;
		}

		public void setBinPath(String binPath) {
			this.binPath = binPath;
		}

		public MyJRVisitor(String srcPath, String binPath) {
			this.srcPath = srcPath;
			this.binPath = binPath;
		}

		@Override
		public void visitBreak(JRBreak breakElement) {
		}

		@Override
		public void visitChart(JRChart chart) {
		}

		@Override
		public void visitCrosstab(JRCrosstab crosstab) {
		}

		@Override
		public void visitElementGroup(JRElementGroup elementGroup) {
		}

		@Override
		public void visitEllipse(JREllipse ellipse) {
		}

		@Override
		public void visitFrame(JRFrame frame) {
		}

		@Override
		public void visitImage(JRImage image) {
		}

		@Override
		public void visitLine(JRLine line) {
		}

		@Override
		public void visitRectangle(JRRectangle rectangle) {
		}

		@Override
		public void visitStaticText(JRStaticText staticText) {
		}

		@Override
		public void visitSubreport(JRSubreport subreport) {
			try {
				String expression = subreport.getExpression().getText()
						.replace(".jasper", "");
				StringTokenizer st = new StringTokenizer(expression, "\"/");
				String subReportName = null;
				while (st.hasMoreTokens())
					subReportName = st.nextToken();
				// Sometimes the same subreport can be used multiple times, but
				// there is no need to compile multiple times
				if (completedSubReports.contains(subReportName)
						|| isLatestBinaryAlreadyAvail(subReportName, srcPath,
								binPath) == true) {
					return;
				}
				completedSubReports.add(subReportName);
				compileReport(subReportName, srcPath, binPath);
			} catch (Throwable e) {
				logger.error(e.getMessage(), e);
				// subReportException = e;
			}
		}

		@Override
		public void visitTextField(JRTextField textField) {
		}

		@Override
		public void visitComponentElement(JRComponentElement componentElement) {
		}

		@Override
		public void visitGenericElement(JRGenericElement element) {
		}
	}
}
