package au.com.woolworths.portal.service;

import java.text.DateFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.DGMSReport;
import au.com.woolworths.portal.model.DGMSResponse;
import au.com.woolworths.portal.model.DGReportResult;
import au.com.woolworths.portal.model.EDGMSReport;
import au.com.woolworths.portal.model.EDGMSResponse;
import au.com.woolworths.portal.model.LTOArticlestoFillReportResult;
import au.com.woolworths.portal.model.LTODiscrepancyReportResult;
import au.com.woolworths.portal.model.OutofCodeResponse;
import au.com.woolworths.portal.model.StockFillReportResult;
import au.com.woolworths.portal.model.StockTakeVarianceResult;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.DGMSReportParam;
import au.com.woolworths.portal.param.DGReportParam;
import au.com.woolworths.portal.param.LTOArticlestoFillReportParam;
import au.com.woolworths.portal.param.LTODiscrepancyReportParam;
import au.com.woolworths.portal.param.OOCReportParam;
import au.com.woolworths.portal.param.OutofCodeReportParam;
import au.com.woolworths.portal.param.StockFillReportParam;
import au.com.woolworths.portal.param.StockTakeVarianceArticleParam;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

public class ReportServiceImpl extends CommonServiceImpl {

	@Value("#{url['EDGMSReportEnquiryURLURL']}")
	private String edgmsReportEnquiryURL;

	@Value("#{url['DGMSReportEnquiryURLURL']}")
	private String dgmsReportEnquiryURL;
	
	@Value("#{properties['dgReportURL']}")
	private String dgReportURL;
	
	@Value("#{properties['stockFillReportURL']}")
	private String stockFillReportURL;
	
	@Value("#{properties['stVarainceByArticle']}")
	private String stVarainceByArticle;
	
	@Value("#{properties['ltoDiscrepancyReportURL']}")
	private String ltoDiscrepancyReportURL;
	

	@Value("#{properties['ltoArticlestoFillReportURL']}")
	private String ltoArticlestoFillReportURL;
	
	@Value("#{properties['oocReportURL']}")
	private String oocReportURL;
	
	/*
	 * @Value("#{url['PageSize']}") private String pageSize;
	 */
	
	protected static final Logger logger = Logger.getLogger(Thread.currentThread()
			.getStackTrace()[0].getClassName());
	
	/********** get EDGMS report ******/

	public ArrayList<EDGMSReport> getEDGMSReport(DGMSReportParam param,UserContext user)
			throws Exception {

		// //System.out.println("******* getEDGMSReport ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + param.getSiteNo() + "'";

		// //System.out.println(" url 1-->" + urlParam);

		if (param.getTradingDept() != null
				&& param.getTradingDept().trim().length() > 0) {

			urlParam += " and iv_trading_dept eq '" + param.getTradingDept()
					+ "'";

		}

		if (param.getWcDate() != null && param.getWcDate().trim().length() > 0) {

			urlParam += " and iv_wc_date eq '"
					+ PortalUtil.convertToSAPDate(param.getWcDate()) + "'";

		}

		if (param.getInputDate() != null
				&& param.getInputDate().trim().length() > 0) {

			urlParam += " and iv_date eq '"
					+ PortalUtil.convertToSAPDate(param.getInputDate()) + "'";

		}

		// urlParam="iv_site eq '1008' and iv_order_type eq 'ZNB' and iv_roster_date eq '20120202'";
		// //System.out.println(" url param --->" + urlParam);
		try {
			EDGMSResponse response = getRestTemplate(user).getForObject(
					edgmsReportEnquiryURL, EDGMSResponse.class, urlParam);

			if (response == null
					|| response.getEdgmsResponseHelper() == null
					|| response.getEdgmsResponseHelper().getEdgmsReport() == null
					|| response.getEdgmsResponseHelper().getEdgmsReport()
							.size() == 0)

			{
				return null;
			}

			return (ArrayList<EDGMSReport>) response.getEdgmsResponseHelper()
					.getEdgmsReport();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	/********** get DGMS report ******/

	public ArrayList<DGMSReport> getDGMSReport(DGMSReportParam param,UserContext user)
			throws Exception {

		// //System.out.println("******* getDGMSReport ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + param.getSiteNo() + "'";

		// //System.out.println(" url 1-->" + urlParam);

		if (param.getTradingDept() != null
				&& param.getTradingDept().trim().length() > 0) {

			urlParam += " and iv_trading_dept eq '" + param.getTradingDept()
					+ "'";

		}

		if (param.getWcDate() != null && param.getWcDate().trim().length() > 0) {

			urlParam += " and iv_wc_date eq '"
					+ PortalUtil.convertToSAPDate(param.getWcDate()) + "'";

		}

		if (param.getInputDate() != null
				&& param.getInputDate().trim().length() > 0) {

			urlParam += " and iv_date eq '"
					+ PortalUtil.convertToSAPDate(param.getInputDate()) + "'";

		}
		/*
		 * urlParam =
		 * urlParam+" and iv_records eq "+pageSize+" and iv_page_no eq "
		 * +param.getPageNo();
		 */
		// urlParam="iv_site eq '1008' and iv_order_type eq 'ZNB' and iv_roster_date eq '20120202'";
		// //System.out.println(" url param --->" + urlParam);
		try {
			DGMSResponse response = getRestTemplate(user).getForObject(
					dgmsReportEnquiryURL, DGMSResponse.class, urlParam);

			if (response == null
					|| response.getDgmsResponseHelper() == null
					|| response.getDgmsResponseHelper().getDgmsReport() == null
					|| response.getDgmsResponseHelper().getDgmsReport().size() == 0)

			{
				return null;
			}

			return (ArrayList<DGMSReport>) response.getDgmsResponseHelper()
					.getDgmsReport();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public DGReportResult[] getDGReportReportFromMobilink(UserContext userDetails,String domain)
	{
		DGReportParam dgReportParam = new DGReportParam(); 
		dgReportParam.setIv_session_id("");
		HttpHeaders postrequestHeaders = new HttpHeaders();


		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(dgReportParam, postrequestHeaders);

		logger.info(domain+dgReportURL);
		ResponseEntity<DGReportResult[]> response = null;

		try {
			response = getForPostRestTemplate(userDetails).exchange(domain+dgReportURL, HttpMethod.POST, requestEntity,
					DGReportResult[].class);
		} catch (Exception e) {
			e.printStackTrace();
			return response.getBody(); 	
		}		
		
		return response.getBody();
	}
	
	public StockFillReportResult[] getStockFillReportReportFromMobilink(UserContext userDetails,String domain)
	{
		StockFillReportParam stockFillReportParam = new StockFillReportParam(); 
		stockFillReportParam.setIv_article("");
		stockFillReportParam.setIv_barcode("");
		stockFillReportParam.setIv_barcode_flag("");
		stockFillReportParam.setIv_department("ALL");
		stockFillReportParam.setIv_lto_barcode("");
		stockFillReportParam.setIv_sales_org(String.valueOf(userDetails.getSalesOrg()));
		stockFillReportParam.setIv_session("");
		stockFillReportParam.setIv_action("N");// replacing Y to N as Tennille confirmed
		stockFillReportParam.setIv_refresh_flg("");
		stockFillReportParam.setIv_site_no(String.valueOf(userDetails.getSiteNo()));
		HttpHeaders postrequestHeaders = new HttpHeaders();


		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(stockFillReportParam, postrequestHeaders);

		logger.info(domain+stockFillReportURL);
		logger.info(Constants.convertToJSON(stockFillReportParam));
		ResponseEntity<StockFillReportResult[]> response = null;

		try {
			response = getForPostRestTemplate(userDetails).exchange(domain+stockFillReportURL, HttpMethod.POST, requestEntity,
					StockFillReportResult[].class);
		} catch (Exception e) {
			e.printStackTrace();
			return response.getBody(); 	
		}		
		
		return response.getBody();
	}
	
	public StockTakeVarianceResult[] getVarianceInfoMobilink(UserContext userDetails,String domain,StockTakeVarianceArticleParam param)
	{
		HttpHeaders postrequestHeaders = new HttpHeaders();
		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param, postrequestHeaders);

		System.out.println(domain+stVarainceByArticle);
		System.out.println(Constants.convertToJSON(param));
		ResponseEntity<StockTakeVarianceResult[]> response = null;

		try {
			response = getForPostRestTemplate(userDetails).exchange(domain+stVarainceByArticle, HttpMethod.POST, requestEntity,
					StockTakeVarianceResult[].class);
		} catch (Exception e) {
			e.printStackTrace();
			return response.getBody(); 	
		}		
		
		return response.getBody();
	}
	
	public LTODiscrepancyReportResult[] getLTODispReportReportFromMobilink(UserContext userDetails,String domain)
	{
		LTODiscrepancyReportParam ltoDispReportParam = new LTODiscrepancyReportParam(); 
		ltoDispReportParam.setIv_session_id("");
		ltoDispReportParam.setIv_sales_org(String.valueOf(userDetails.getSalesOrg()));
		ltoDispReportParam.setIv_site_no(String.valueOf(userDetails.getSiteNo()));
		ltoDispReportParam.setIv_article_no("");
		ltoDispReportParam.setIv_article_barcode("");
		ltoDispReportParam.setIv_lto_id("");
		ltoDispReportParam.setIv_barcode_flag("");
		
		ltoDispReportParam.setIv_audit_flag("Y");
		ltoDispReportParam.setIv_dept_id("");
		ltoDispReportParam.setIv_second_audit("");
		ltoDispReportParam.setIv_session_mntnc_flg("");
		ltoDispReportParam.setIv_userid("");
		ltoDispReportParam.setIv_platform("B");
		
		HttpHeaders postrequestHeaders = new HttpHeaders();


		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(ltoDispReportParam, postrequestHeaders);

		logger.info(domain+ltoDiscrepancyReportURL);
		logger.info(Constants.convertToJSON(ltoDispReportParam));
		ResponseEntity<LTODiscrepancyReportResult[]> response = null;

		try {
			response = getForPostRestTemplate(userDetails).exchange(domain+ltoDiscrepancyReportURL, HttpMethod.POST, requestEntity,
					LTODiscrepancyReportResult[].class);
		} catch (Exception e) {
			e.printStackTrace();
			return response.getBody(); 	
		}		
		
		return response.getBody();
	}
	public LTOArticlestoFillReportResult[] getLTOArticlestoFillReportReportFromMobilink(UserContext userDetails,String domain)
	{
		LTOArticlestoFillReportParam ltoArticlestofillReportParam = new LTOArticlestoFillReportParam(); 
		ltoArticlestofillReportParam.setIv_fixture_lst("ALL");
		ltoArticlestofillReportParam.setIv_sales_org(String.valueOf(userDetails.getSalesOrg()));
		ltoArticlestofillReportParam.setIv_site_no(String.valueOf(userDetails.getSiteNo()));
		ltoArticlestofillReportParam.setIv_aisle_lst("");
		ltoArticlestofillReportParam.setIv_cat_lst("");
		ltoArticlestofillReportParam.setIv_dept_id("");
		if(String.valueOf(userDetails.getSalesOrg()) != null && String.valueOf(userDetails.getSalesOrg()) !=""
				&& String.valueOf(userDetails.getSalesOrg()).equalsIgnoreCase("1005")){
			ltoArticlestofillReportParam.setIv_aisle_lst("ALL");			
		}	
		if(String.valueOf(userDetails.getSalesOrg()) != null && String.valueOf(userDetails.getSalesOrg()) !=""
				&& (String.valueOf(userDetails.getSalesOrg()).equalsIgnoreCase("1060")||String.valueOf(userDetails.getSalesOrg()).equalsIgnoreCase("1015")||String.valueOf(userDetails.getSalesOrg()).equalsIgnoreCase("1010")) ){
			ltoArticlestofillReportParam.setIv_cat_lst("ALL");
			ltoArticlestofillReportParam.setIv_dept_id("ALL");	
		}		
		ltoArticlestofillReportParam.setIv_session_id("");
		ltoArticlestofillReportParam.setIv_userid(userDetails.getUserId());
		ltoArticlestofillReportParam.setIv_refresh_flg("N");
		
		HttpHeaders postrequestHeaders = new HttpHeaders();


		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(ltoArticlestofillReportParam, postrequestHeaders);

		logger.info(domain+ltoArticlestoFillReportURL);
		logger.info(Constants.convertToJSON(ltoArticlestofillReportParam));
		ResponseEntity<LTOArticlestoFillReportResult[]> response = null;

		try {
			response = getForPostRestTemplate(userDetails).exchange(domain+ltoArticlestoFillReportURL, HttpMethod.POST, requestEntity,
					LTOArticlestoFillReportResult[].class);
		} catch (Exception e) {
			e.printStackTrace();
			return response.getBody(); 	
		}		
		
		return response.getBody();
	}
	
	public OutofCodeResponse getOOCReportFromMobilink(UserContext userDetails,String domain, OOCReportParam oocReportParam2)
	{
		OutofCodeReportParam oocReportParam = new OutofCodeReportParam(); 
		
		
		
		    Date fromDate = new Date();
		    Date toDate = new Date();
		    logger.info(fromDate);

		    SimpleDateFormat mdyFormat = new SimpleDateFormat("dd/MM/yyyy");
		    SimpleDateFormat dmyFormat = new SimpleDateFormat("MM/dd/yyyy");

		
		    try {
		    	fromDate = mdyFormat.parse(oocReportParam2.getDateFrom());
		    	
		    	toDate = mdyFormat.parse(oocReportParam2.getDateTo());
		    	/*oocReportParam2.setDateFrom(dmyFormat.format(fromDate));
		    	oocReportParam2.setDateTo(dmyFormat.format(toDate));*/
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
		
		oocReportParam.setIv_sales_org(String.valueOf(userDetails.getSalesOrg()));
		oocReportParam.setIv_site(String.valueOf(userDetails.getSiteNo()));
		oocReportParam.setIv_session_id("");
		oocReportParam.setIv_start_date(dmyFormat.format(fromDate));
		oocReportParam.setIv_end_date(dmyFormat.format(toDate));
		oocReportParam.setIv_dept_list(oocReportParam2.getDeptNo());
		oocReportParam.setIv_cat_list(oocReportParam2.getCatNo());
		oocReportParam.setIv_sub_cat_list(oocReportParam2.getSubCatNo());
		oocReportParam.setIv_seg_list(oocReportParam2.getSegment());
		oocReportParam.setIv_node_id("");
		oocReportParam.setIv_node_level(oocReportParam2.getNodelevel());
		oocReportParam.setIv_action_flag("A");
		
		logger.info("deptno--"+oocReportParam2.getDeptNo());
		
		
		HttpHeaders postrequestHeaders = new HttpHeaders();


		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);
		
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(oocReportParam, postrequestHeaders);

		logger.info(domain+oocReportURL);
		logger.info(Constants.convertToJSON(oocReportParam));
		ResponseEntity<OutofCodeResponse> response = null;

		try {
			
			
			response = getForPostRestTemplate(userDetails).exchange(domain+oocReportURL, HttpMethod.POST, requestEntity,
					OutofCodeResponse.class);
		} catch (Exception e) {
			e.printStackTrace();
			return response.getBody(); 	
		}		
		
		return response.getBody();
	}
}
