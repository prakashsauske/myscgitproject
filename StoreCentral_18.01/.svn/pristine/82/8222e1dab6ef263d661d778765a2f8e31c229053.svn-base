
package au.com.woolworths.portal.controller;

import java.io.IOException;
import java.io.PrintWriter;
import java.text.DateFormat;
import java.text.Format;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.Date;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

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

import au.com.woolworths.portal.model.OutofCodeResponse;
import au.com.woolworths.portal.model.OutofCodeResult;
import au.com.woolworths.portal.model.OutofCodeResultResponseHelper;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.OOCReportParam;
import au.com.woolworths.portal.pos.controller.BaseController;
import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.service.ReportServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xlki1
 * a
 */
@Controller
@RequestMapping(value = "*/oocReport")
@Scope("session")
public class OOCReportController extends BaseController {

	/*XPSNV - Code for Backend Restriction - Redirection to Not Authorized Page - Begin */
	@Value("#{properties['reportOOC']}")
	private String screenCode;
	
	@Autowired
	private JasperReportUtil jasper;
	
	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;
	
	@Value("#{properties['oocReportName']}")
	private String oocReportName = null;

	private ModelMap model;
	
	public String noDataorError = "" ;
	
	public String error ="";
	
	@Autowired
	private ReportServiceImpl reportService;
	
	private byte[] pdfArray = null;
	
	DateFormat RESULT_DATE_FORMAT = new SimpleDateFormat("dd/MM/yyyy");
	DateFormat EXPIRY_DATE_FORMAT = new SimpleDateFormat("MM/dd/yyyy");
	SimpleDateFormat PRINT_COLUMN_HEADER_DATE_FORMAT = new SimpleDateFormat("dd/MM");
	Format PRINT_COLUMN_HEADER_DAY_FORMAT = new SimpleDateFormat("EEEE"); 
	
	private List<String> columnHeaderDateList = null;


	@RequestMapping(value = "/loadOOCReport.htm", method = RequestMethod.GET)
	public ModelAndView loadOOCReport(HttpServletRequest request,
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
		ModelAndView modelAndView = new ModelAndView("ReportOOC");
		return modelAndView;
	}

	@RequestMapping(method = RequestMethod.POST, value = "/printReportOOCPDF.htm", consumes = "application/json")
	@ResponseBody
	public String printReportOOCPDF(
			@RequestBody OOCReportParam oocReportParam,
			HttpServletRequest request, HttpServletResponse response)
			throws Throwable , Exception {
		try{
		if (setSessionAndReturnIfInvalid(request, null) == true) {
			return "";
		}
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();	
		
		UserContext userDetail = ((UserContext) request.getSession().getAttribute("user"));
		
		
		
		OutofCodeResponse outOfCodeResultArray = new OutofCodeResponse();
		
	
		 outOfCodeResultArray = reportService.getOOCReportFromMobilink(userDetail, userDetail.getDomain(),oocReportParam);
		
		
			if ((outOfCodeResultArray.getOutofCodeResultResponseHelper().size() != 0
					&& outOfCodeResultArray.getOutofCodeResultResponseHelper() != null
					&& !outOfCodeResultArray.getOutofCodeResultResponseHelper()
							.isEmpty() &&  outOfCodeResultArray.getOutofCodeResultResponseHelper().get(0).getOutofCodeResult() != null) || (outOfCodeResultArray.getOutofCodeResultResponseHelperToday().size() != 0
									&& outOfCodeResultArray.getOutofCodeResultResponseHelperToday() != null
									&& !outOfCodeResultArray.getOutofCodeResultResponseHelperToday()
											.isEmpty() && outOfCodeResultArray.getOutofCodeResultResponseHelperToday().get(0).getOutofCodeResult() != null)){
				
				
				
				//System.out.println("OutofCodeLength--"+outOfCodeResultArray.length);
				reportInputParams.put("reportFor", oocReportParam.getReportFor());
				reportInputParams.put("StoreNo", oocReportParam.getStoreNo());
				reportInputParams.put("StoreName", oocReportParam.getStoreName());
				reportInputParams.put("dateFrom", oocReportParam.getDateFrom());
				reportInputParams.put("dateTo", oocReportParam.getDateTo());
				
				setWeekColumnHeaders(reportInputParams);
				
				Map<String,List<OutofCodeResult>> grpBySubCatMap = groupBySubCat(outOfCodeResultArray.getOutofCodeResultResponseHelper(),outOfCodeResultArray.getOutofCodeResultResponseHelperToday());
				
				List<OutofCodeResult> occReportReults = getSOHValue(grpBySubCatMap);
				
				int dateRangeExp =0;
				int todayExp=0;
				if(outOfCodeResultArray.getOutofCodeResultResponseHelper() != null && !outOfCodeResultArray
				.getOutofCodeResultResponseHelper().isEmpty()) 
				{
				dateRangeExp= (outOfCodeResultArray
				.getOutofCodeResultResponseHelper().get(0).getOutofCodeResult() != null ? outOfCodeResultArray
				.getOutofCodeResultResponseHelper().size()
				: 0);
				}
				if(outOfCodeResultArray
				.getOutofCodeResultResponseHelperToday() != null && !outOfCodeResultArray
				.getOutofCodeResultResponseHelperToday().isEmpty()){
				todayExp = (outOfCodeResultArray
				.getOutofCodeResultResponseHelperToday().get(0).getOutofCodeResult() != null ? outOfCodeResultArray
				.getOutofCodeResultResponseHelperToday().size()
				: 0);
				}
				int expiringArticles = dateRangeExp + todayExp;
				/*int expiringArticles = (outOfCodeResultArray
						.getOutofCodeResultResponseHelper().get(0).getOutofCodeResult() != null ? outOfCodeResultArray
						.getOutofCodeResultResponseHelper().size()
						: 0) + (outOfCodeResultArray
								.getOutofCodeResultResponseHelperToday().get(0).getOutofCodeResult() != null ? outOfCodeResultArray
								.getOutofCodeResultResponseHelperToday().size()
								: 0);*/
				reportInputParams.put("expiring", String.valueOf(expiringArticles));
				
				JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(reFrameResponseForJasper(reportInputParams, occReportReults));

				/*String reportRealPath = request.getSession().getServletContext()
						.getRealPath("");*/

				/* byte[] byos = JasperReportUtil.getInstance().printPdfReport(oocReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request),
						reportInputParams).toByteArray();*/
				byte[] byos = jasper.
						printPdfReportTimeZone(oocReportName, beanDS, jasperRptResponseHandler.getReportSourcePath(request), jasperRptResponseHandler.getReportBinPath(request), reportInputParams, request).toByteArray();
				 pdfArray = byos;
				 noDataorError="";

				
			}
			else{
				pdfArray = null;
				noDataorError ="NoData";
			}
		
			}catch(Exception e){
			e.printStackTrace();
			pdfArray = null;
			noDataorError ="Error";
			error = e.getMessage();
		}
		
		return CommonUtils.convertObjectTojson("success");

	}

	private Map<String, List<OutofCodeResult>> groupBySubCat(
			ArrayList<OutofCodeResultResponseHelper> dateRangeList, ArrayList<OutofCodeResultResponseHelper> todayList) {
		Map<String, List<OutofCodeResult>> grpBySubCatMap = new LinkedHashMap<String, List<OutofCodeResult>>();
		
		ArrayList<OutofCodeResultResponseHelper> duplicateList = new ArrayList<OutofCodeResultResponseHelper>();
		
		if((!dateRangeList.isEmpty() && dateRangeList.size()!=0 && dateRangeList.get(0).getOutofCodeResult() != null) &&  (!todayList.isEmpty() && todayList.size() !=0 && todayList.get(0).getOutofCodeResult() != null))
		{
			for(OutofCodeResultResponseHelper oocReportDateRange : dateRangeList)
			{
				for(OutofCodeResultResponseHelper oocReportToday : todayList)
				{
					if(oocReportDateRange.getOutofCodeResult().getArticle_no().trim().equals(oocReportToday.getOutofCodeResult().getArticle_no().trim()) &&
							oocReportDateRange.getOutofCodeResult().getArticle_desc().trim().equals(oocReportToday.getOutofCodeResult().getArticle_desc().trim())){
						duplicateList.add(oocReportDateRange);
						
					}
				}
			
			}
			
			dateRangeList.removeAll(duplicateList);
			
		}
		if(!dateRangeList.isEmpty() && dateRangeList.size()!=0 && dateRangeList.get(0).getOutofCodeResult() != null)
		{
		for(OutofCodeResultResponseHelper oocReport : dateRangeList)
		{
			List<OutofCodeResult> oocReportList = null;
			
			oocReport.getOutofCodeResult().setTab_name("DATE_RANGE");
			if(grpBySubCatMap.containsKey(oocReport.getOutofCodeResult().getDepartment_no()))
			{
				 grpBySubCatMap.get(oocReport.getOutofCodeResult().getDepartment_no()).add(oocReport.getOutofCodeResult());
			}
			else
			{
				oocReportList = new ArrayList<OutofCodeResult>();
				oocReportList.add(oocReport.getOutofCodeResult());
				grpBySubCatMap.put(oocReport.getOutofCodeResult().getDepartment_no(), oocReportList);
			}
			
			
		}
		}
		
		if(!todayList.isEmpty() && todayList.size() !=0 && todayList.get(0).getOutofCodeResult() != null)
		{
		for(OutofCodeResultResponseHelper oocReport : todayList)
		{
			
			List<OutofCodeResult> oocReportList = null;
			
			oocReport.getOutofCodeResult().setTab_name("ACTION_TODAY");
			if(grpBySubCatMap.containsKey(oocReport.getOutofCodeResult().getDepartment_no()))
			{	
				grpBySubCatMap.get(oocReport.getOutofCodeResult().getDepartment_no()).add(oocReport.getOutofCodeResult());
			}
			else
			{
				oocReportList = new ArrayList<OutofCodeResult>();
				oocReportList.add(oocReport.getOutofCodeResult());
				grpBySubCatMap.put(oocReport.getOutofCodeResult().getDepartment_no(), oocReportList);
			}
			
			
		}
		}
		
		return grpBySubCatMap;
	}
	private List<OutofCodeResult> getSOHValue(Map<String,List<OutofCodeResult>> grpBySubCatMap) {
		// TODO Auto-generated method stub
		
		List<OutofCodeResult> newResultList = new ArrayList<OutofCodeResult>();
		for(Entry<String, List<OutofCodeResult>> entry : grpBySubCatMap.entrySet())
		{
		for(OutofCodeResult oocReportResult : entry.getValue())
		{
			if(null!=oocReportResult.getSoh() && !oocReportResult.getSoh().isEmpty())
			{
				String value = "";

				if(oocReportResult.getRandom_weight_flag() !=null && oocReportResult.getRandom_weight_flag().equalsIgnoreCase("Y")){
					value = oocReportResult.getPi_soh()+" "+oocReportResult.getPi_uom()+" & "+CommonUtils.formatTo3DecimalPlaces(oocReportResult.getSoh())+" "+oocReportResult.getBase_uom();
				}else{
					if(oocReportResult.getBase_uom().equalsIgnoreCase("KG") || oocReportResult.getBase_uom().equalsIgnoreCase("L")){
						value = CommonUtils.formatTo3DecimalPlaces(oocReportResult.getSoh())+" "+oocReportResult.getBase_uom();
					}else{
						value = new java.text.DecimalFormat("###0").format(Double.valueOf(oocReportResult.getSoh()))+" "+oocReportResult.getBase_uom();
					}
				}
				oocReportResult.setSoh(value);
				newResultList.add(oocReportResult);
			}
			else
			{
				oocReportResult.setSoh("");
				newResultList.add(oocReportResult);
				
			}
			
		}
		}
		return newResultList;
	}

	@ResponseBody
	@RequestMapping(value = "/downloadOOCReportPdf.pdf", method=RequestMethod.GET)
	public byte[] downloadGapScanReportPdf(HttpServletRequest request, HttpServletResponse response) throws IOException {
		
		if(pdfArray != null && noDataorError.equalsIgnoreCase("")){
		response.setContentType("application/pdf");
		response.setContentLength(pdfArray.length);
		response.getOutputStream().write(pdfArray);
	    return null;
		}
		else if(pdfArray == null && noDataorError.equalsIgnoreCase("NoData")){
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>No records available</title></title>");
			pw.println("<body>");
			pw.println("<h1>No records available to generate Out of code  report. </h1>");
			pw.println("</body></html>");
			return null;
		}
		else if(pdfArray == null && noDataorError.equalsIgnoreCase("Error")){
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>Technical issue occured.</title></title>");
			pw.println("<body>");
			pw.println("<h1>Technical issue occured "+error+" </h1>");
			pw.println("</body></html>");
			return null;
			
		}
		else
		{
			response.setContentType("text/html");
			PrintWriter pw = response.getWriter();
			pw.println("<html>");
			pw.println("<head><title>No records available</title></title>");
			pw.println("<body>");
			pw.println("<h1>No records available to generate Out of code  report. </h1>");
			pw.println("</body></html>");
			return null;
		}
	}
	
	/*@Override
	public String formUrlParam(MandatoryReportParam param) {
		// TODO Auto-generated method stub
		return null;
	}*/
	public void setWeekColumnHeaders(HashMap<String, Object> reportInputParams){
		try {
			Date dateFrom = RESULT_DATE_FORMAT.parse((String) reportInputParams.get("dateFrom"));
			Date dateTo = RESULT_DATE_FORMAT.parse((String) reportInputParams.get("dateTo"));
			columnHeaderDateList = new ArrayList<String>();
			int weekNo = 1;
			while(dateFrom.before(dateTo) || dateFrom.equals(dateTo)){
				columnHeaderDateList.add(RESULT_DATE_FORMAT.format(dateFrom));//used For reframing the response
				addDateDayToInputParam(dateFrom,reportInputParams,weekNo);
				dateFrom = CommonUtils.addDays(dateFrom,1);
				weekNo++;
			}
			//if(weekNo != 28){
				while(weekNo <= 28){
					reportInputParams.put("week" + weekNo + "Date","");//Eg:week1Date value will be set
					reportInputParams.put("week" + weekNo + "Day","");//Eg:week1Day value will be set
					weekNo++;	
				}
			//}
			
		} catch (ParseException e) {
			// TODO Auto-generated catch blocks
			e.printStackTrace();
		}catch(Exception excep){
			excep.printStackTrace();
		}
		
	}
	public void addDateDayToInputParam(Date dateFrom,HashMap<String, Object> reportInputParams,int weekNo){	
		try {
			reportInputParams.put("week" + weekNo + "Date",
					PRINT_COLUMN_HEADER_DATE_FORMAT.format(dateFrom));//Eg:week1Date value will be set
			String day = PRINT_COLUMN_HEADER_DAY_FORMAT.format(dateFrom);
			reportInputParams.put("week" + weekNo + "Day",day.substring(0, 3));//Eg:week1Day value will be set
			
		} catch (Exception e) {
			e.printStackTrace();
		}
	}
	public List<OutofCodeResult> reFrameResponseForJasper(HashMap<String, Object> reportInputParams,List<OutofCodeResult> occReportReults){
		List<OutofCodeResult> oocReportResultListNew = new ArrayList<OutofCodeResult>();
		OutofCodeResult oocReportResultNew = null;
		try{
			//Date dateFrom = RESULT_DATE_FORMAT.parse((String) reportInputParams.get("dateFrom"));
			//Date dateTo = RESULT_DATE_FORMAT.parse((String) reportInputParams.get("dateTo"));
			//int weekNo = 1;
			/*while(dateFrom.before(dateTo) || dateFrom.equals(dateTo)){
				addDateDayToInputParam(dateFrom,reportInputParams,weekNo);
				dateFrom = CommonUtils.addDays(dateFrom,1);
				weekNo++;
			}*/
			
			
			Collections.sort(occReportReults, new CustomComparator());
			for(OutofCodeResult oocReportResult : occReportReults){
				oocReportResultNew = oocReportResult;
				oocReportResultNew.setUrgentFlag(oocReportResultNew.getTab_name().equalsIgnoreCase("ACTION_TODAY") ? "X":"");
				if(null != columnHeaderDateList && columnHeaderDateList.size() > 0){
				/*	
					for(int j=0;j<columnHeaderDateList.size();j++){
					for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
						
						oocWeek( j,  i, oocReportResultNew);
					}
					}
					*/
					

					int s = 0;
					for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
						for(int j=0;j<columnHeaderDateList.size();j++){
						if(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(j))){
							s=j;
							oocWeek(s, oocReportResultNew);
							
						}
						}
						s=0;
						
					}
					
				
					
					/*if(null != columnHeaderDateList.get(0))
					if(columnHeaderDateList.size() >=  1){
						int s = 0;
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							for(int j=0;j<columnHeaderDateList.size();j++){
							if(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(j))){
								s++;
								oocWeek(s, oocReportResultNew);
								
							}
							}
							s=0;
							
						}
						
					}
					
					if(columnHeaderDateList.size() >=  2){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek2Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(1)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  3)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek3Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(2)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  4)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek4Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(3)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  5)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek5Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(4)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  6)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek6Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(5)) ? "X":"");	
						}
					}
				
					if(columnHeaderDateList.size() >=  7)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek7Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(6)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  8)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek8Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(7)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  9)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek9Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(8)) ? "X":"");	
						}
					}
				
					if(columnHeaderDateList.size() >=  10)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek10Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(9)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  11)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek11Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(10)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  12)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek12Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(11)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  13)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek13Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(12)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  14)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek14Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(13)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  15)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek15Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(14)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  16)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek16Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(15)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  17)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek17Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(16)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >= 18)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek18Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(17)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >= 19)
					{
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek19Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(18)) ? "X":"");
						}
					}
				
					if(columnHeaderDateList.size() >=  20){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek20Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(19)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  21){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek21Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(20)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  22){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek22Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(21)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  23){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek23Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(22)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  24){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek24Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(23)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  25){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek25Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(24)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  26){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek26Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(25)) ? "X":"");
						}
					}
					
					if(columnHeaderDateList.size() >=  27){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek27Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(26)) ? "X":"");	
						}
					}
					
					if(columnHeaderDateList.size() >=  28){
						for(int i=0;i<oocReportResultNew.getUse_by_dates().size();i++){
							oocReportResultNew.setWeek28Val(oocReportResultNew.getUse_by_dates().get(i).getUse_by_date().contains(columnHeaderDateList.get(27)) ? "X":"");
						}
					}*/
														
				}
				oocReportResultListNew.add(oocReportResultNew);
				
			}
			
		}catch(Exception e){
			e.printStackTrace();
		}		
		return oocReportResultListNew;		
	}

	private void oocWeek(int s, OutofCodeResult oocReportResultNew) {
		
		
		if(s==0){
			 oocReportResultNew.setWeek1Val("X");
		}
		if(s==1){
			 oocReportResultNew.setWeek2Val("X");
		}
		if(s==2){
			 oocReportResultNew.setWeek3Val("X");
		}
		if(s==3){
			 oocReportResultNew.setWeek4Val("X");
		}
		if(s==4){
			 oocReportResultNew.setWeek5Val("X");
		}
		if(s==5){
			 oocReportResultNew.setWeek6Val("X");
		}
		if(s==6){
			 oocReportResultNew.setWeek7Val("X");
		}
		if(s==7){
			 oocReportResultNew.setWeek8Val("X");
		}
		if(s==8){
			 oocReportResultNew.setWeek9Val("X");
		}
		if(s==9){
			 oocReportResultNew.setWeek10Val("X");
		}
		if(s==10){
			 oocReportResultNew.setWeek11Val("X");
		}
		if(s==11){
			 oocReportResultNew.setWeek12Val("X");
		}
		if(s==12){
			 oocReportResultNew.setWeek13Val("X");
		}
		if(s==13){
			 oocReportResultNew.setWeek14Val("X");
		}
		if(s==14){
			 oocReportResultNew.setWeek15Val("X");
		}
		if(s==15){
			 oocReportResultNew.setWeek16Val("X");
		}
		if(s==16){
			 oocReportResultNew.setWeek17Val("X");
		}
		if(s==17){
			 oocReportResultNew.setWeek18Val("X");
		}
		if(s==18){
			 oocReportResultNew.setWeek19Val("X");
		}if(s==19){
			 oocReportResultNew.setWeek20Val("X");
		}
		if(s==20){
			 oocReportResultNew.setWeek21Val("X");
		}
		if(s==21){
			 oocReportResultNew.setWeek22Val("X");
		}
		if(s==22){
			 oocReportResultNew.setWeek23Val("X");
		}
		if(s==23){
			 oocReportResultNew.setWeek24Val("X");
		}
		if(s==24){
			 oocReportResultNew.setWeek25Val("X");
		}
		if(s==25){
			 oocReportResultNew.setWeek26Val("X");
		}
		if(s==26){
			 oocReportResultNew.setWeek27Val("X");
		}
		if(s==27){
			 oocReportResultNew.setWeek28Val("X");
		}
		
	}
	
	public class CustomComparator implements Comparator<OutofCodeResult> {
	    @Override
	    public int compare(OutofCodeResult subCate1, OutofCodeResult subCate2) {
	        return subCate1.getDepartment_name().compareTo(subCate2.getDepartment_name());
	    }
	}

}
