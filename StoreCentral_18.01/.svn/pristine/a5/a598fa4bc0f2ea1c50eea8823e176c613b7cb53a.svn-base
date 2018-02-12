package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;
import java.net.URLEncoder;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.PPArticleResultsResponse;
import au.com.woolworths.portal.model.PPArticleSearchResults;
import au.com.woolworths.portal.model.PPBakeryArticleResultsResponse;
import au.com.woolworths.portal.model.PPCategoryResults;
import au.com.woolworths.portal.model.PPCategoryResultsResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.PPlanerParam;
import au.com.woolworths.portal.pplanner.create.MeatPlannerServiceEndPoint;
import au.com.woolworths.portal.pplanner.create.MeatPlannerServiceImpl;
import au.com.woolworths.portal.pplanner.create.RequestData;
import au.com.woolworths.portal.pplanner.create.ResponseData;
import au.com.woolworths.portal.pplanner.create.ServiceFault_Exception;
import au.com.woolworths.portal.util.Constants;

public class PPArticleServiceImpl extends CommonServiceImpl {

	@Value("#{url['ProductionPlannerDailyUrl']}")
	private String productionPlannerDailyUrl;

	@Value("#{url['ProductionPlannerWeeklyUrl']}")
	private String productionPlannerWeeklyUrl;
	
	@Value("#{url['rcProductionPlannerUrl']}")
	public  String rcProductionPlannerUrl;

	@Value("#{url['ProductionPlannerCategoryUrl']}")
	private String productionPlannerCategoryUrl;
	
	@Value("#{url['ProductionPlannerBakeryEnquiryPostUrl']}")
	private String productionPlannerBakeryEnquiryPostUrl;
	
	@Value("#{url['ProductionPlannerBakeryEnquiryTokenUrl']}")
	private String productionPlannerBakeryEnquiryTokenUrl;
	
	private static final Logger LOGGER = Logger.getLogger(PPArticleServiceImpl.class.getName());
	
	/****** newly added for production planner article fetch 
	 * @throws Exception ******/
	public List<PPArticleSearchResults> getPPArticleDetails(
			PPlanerParam PPlannerParam,UserContext user) throws Exception {
		
		if(!PPlannerParam.getDepartment().equalsIgnoreCase("") && !PPlannerParam.getDepartment().equalsIgnoreCase(null) && PPlannerParam.getDepartment().equalsIgnoreCase("BAKERY DOUGH"))
		{
			return getBakeryDoughArticleDetails(PPlannerParam,user);
		}
		else
		{
		// //LOGGER.info("******* getArticleDetails ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + PPlannerParam.getSiteNo() + "'";
		LOGGER.info(rcProductionPlannerUrl);
		
		// Pagination check
		if (PPlannerParam.isPaginationCheck()) {
			if (PPlannerParam.getArticleNo() != null
					&& PPlannerParam.getArticleNo().trim().length() > 0) {
				urlParam = urlParam + " and iv_article eq '"
						+ PPlannerParam.getArticleNo() + "'";
			} else if (PPlannerParam.getArticleName() != null
					&& PPlannerParam.getArticleName().trim().length() > 0) {
				urlParam = urlParam + " and iv_art_desc  eq '"
						+ PPlannerParam.getArticleName() + "'";
			} else if (PPlannerParam.getGtin() != null
					&& PPlannerParam.getGtin().trim().length() > 0)
				urlParam = urlParam + " and iv_ean eq '" + PPlannerParam.getGtin()
						+ "'";

			urlParam = urlParam + " and iv_records  eq " + 10
					+ " and iv_page_no eq " + PPlannerParam.getPageNumber() + " ";
			// articleParam.setPaginationCheck(false);
		}
		 SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
		    Date convertedCurrentDate = null;
			try {
				convertedCurrentDate = sdf.parse(PPlannerParam.getCurrentDate());
			} catch (ParseException e1) {
				// TODO Auto-generated catch block
				e1.printStackTrace();
			}
			sdf.applyPattern("yyyyMMdd");
		    String date=sdf.format(convertedCurrentDate );
		    //date = new SimpleDateFormat("yyyymmdd").format(date);
		    LOGGER.info(date);
		//urlParam = urlParam + "and iv_day eq '" + date + "'";
		   /* String department = "MEAT";
		    if(department == "BAKERY")
		    {
		    	department = PPlannerParam.getDepartment();
		    }*/
		urlParam = urlParam + "and iv_department eq '" + PPlannerParam.getDepartment() + "'" ;
		// urlParam = urlParam + "and iv_department eq MEAT'";
		String productionPlannerSAPUrl = productionPlannerDailyUrl;
		if(PPlannerParam.getSchedule().equalsIgnoreCase("daily"))
		{
			urlParam = urlParam + "and iv_day eq '" + date + "'";
		}
		if(PPlannerParam.getSchedule().equalsIgnoreCase("weekly"))
		{
			
			urlParam = urlParam + "and iv_day eq '" + PPlannerParam.getWeek() +"' and iv_weekly eq" + "'X'";
			productionPlannerSAPUrl = productionPlannerWeeklyUrl;
		}
		/*if(!PPlannerParam.getCategoryList().equalsIgnoreCase("") && !PPlannerParam.getCategoryList().equalsIgnoreCase(null))
		{
			urlParam = urlParam + "and IV_CATEGORY eq '"+PPlannerParam.getCategoryList()+"'";
		}*///uncomment once SAP is done with their development
		LOGGER.info(urlParam);
		try {
			PPArticleResultsResponse response = getRestTemplate(user).getForObject(
					productionPlannerSAPUrl, PPArticleResultsResponse.class,
					urlParam);
			if (response == null
					|| response.getPPArticleResultsResponseHelper() == null
					|| response.getPPArticleResultsResponseHelper()
							.getPPArticleSearchResultsList() == null
					|| response.getPPArticleResultsResponseHelper()
							.getPPArticleSearchResultsList().size() == 0
					|| response.getPPArticleResultsResponseHelper()
							.getPPArticleSearchResultsList().get(0).getMsg()
							.trim().contains(" ")
					|| response.getPPArticleResultsResponseHelper()
							.getPPArticleSearchResultsList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found")		
					)

			{
				return null;
			} else {
				return response.getPPArticleResultsResponseHelper()
						.getPPArticleSearchResultsList();
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			throw e;
		}
		}
	}

	public List<ResponseData> getRCPlannerData(List<PPArticleSearchResults> ppArticleSearchResults,PPlanerParam param) throws Exception{
		
		List<RequestData> arg0 = new ArrayList<RequestData>();
		List<ResponseData> rcSalesData  = new ArrayList<ResponseData>();
		for( PPArticleSearchResults  resultSet : ppArticleSearchResults)
		{
			String articleNo =  resultSet.getArticle();
			articleNo = articleNo.replaceFirst("^0+(?!$)", "");
			RequestData article = new RequestData();
			article.setArticle(articleNo);
			article.setSite(param.getSiteNo());
			if (param.getSchedule().equalsIgnoreCase("daily")) {
				article.setRequestType("D");
				article.setTransDate(param.getCurrentDate());
			} else if (param.getSchedule().equalsIgnoreCase("weekly")) {
				article.setRequestType("W");
				article.setTransDate(param.getFromDate());
			}
			article.setPlannerType(param.getDepartment());
			article.setRequiredQty(param.getRequiredQty());
			LOGGER.info("Value of the Required Param " +param.getRequiredQty());
			article.setUpdateFlag(param.getUpdateFlag());
			arg0.add(article);
		}
		MeatPlannerServiceImpl service;
		try {
			URL url = new URL(rcProductionPlannerUrl);
			service = new MeatPlannerServiceImpl(url);
			MeatPlannerServiceEndPoint port = service.getMeatPlannerServiceEndPointPort();
			rcSalesData = port.getPlanInfo(arg0);
		} catch (ServiceFault_Exception e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
			throw e;
		}
		catch(Exception e )
		{
			e.printStackTrace();
			throw e;
		}
		return rcSalesData;
		
	}


public List<ResponseData> getTestRCPlannerData(List<RequestData> arg0) throws Exception{
		List<ResponseData> rcSalesData  = new ArrayList<ResponseData>();
		MeatPlannerServiceImpl service;
		try {
			URL url = new URL("http://clerca201:8380/MeatPlannerSCService/service/getPlanInfo?wsdl");
			service = new MeatPlannerServiceImpl(url);
			MeatPlannerServiceEndPoint port = service.getMeatPlannerServiceEndPointPort();
			rcSalesData = port.getPlanInfo(arg0);
		} catch (ServiceFault_Exception e) {
			e.printStackTrace();
			throw e;
		}
		catch(Exception e )
		{
			e.printStackTrace();
			throw e;
		}
		return rcSalesData;
	}

/****** newly added for production planner category fetch for Bakery dough calculator 
 * @throws Exception ******/
public List<PPCategoryResults> getCategories(UserContext user) throws Exception {

	// //LOGGER.info("******* getCategories ******** ");

	String urlParam;

	urlParam ="iv_catg_list eq 'X'" ;
	
	LOGGER.info(productionPlannerCategoryUrl);
	LOGGER.info(urlParam);
	
	URI url;
	try {
		url = new URI(productionPlannerCategoryUrl
				+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

	} catch (URISyntaxException e1) {
		LOGGER.error(e1);
		return null;
	}
	PPCategoryResultsResponse response = null;
	
	try {
		response = getRestTemplate(user).getForObject(
				url, PPCategoryResultsResponse.class);
		if (response == null
				|| response.getPpCategoryResultsResponseHelper() == null
				|| response.getPpCategoryResultsResponseHelper()
						.getPpCategoryResults() == null
				|| response.getPpCategoryResultsResponseHelper()
						.getPpCategoryResults().size() == 0
				|| response.getPpCategoryResultsResponseHelper()
						.getPpCategoryResults().get(0).getMsg()
						.equalsIgnoreCase("No Data Found")		
				)

		{
			return null;
		} else {
			return response.getPpCategoryResultsResponseHelper()
					.getPpCategoryResults();
		}
		
	} catch (Exception e) {
		e.printStackTrace();
		throw e;
	}
}

private String construcXMLForBakeryCalculatorInput(PPlanerParam pplannerParam)
{
	StringBuffer xml = new StringBuffer();
	
	SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy");
    Date convertedCurrentDate = null;
	try {
		convertedCurrentDate = sdf.parse(pplannerParam.getCurrentDate());
	} catch (ParseException e1) {
		// TODO Auto-generated catch block
		e1.printStackTrace();
	}
	sdf.applyPattern("yyyyMMdd");
    String date=sdf.format(convertedCurrentDate );
	
	xml.append("<?xml version='1.0' encoding='UTF-8' ?>")
	.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='")
				.append(productionPlannerBakeryEnquiryPostUrl)
				.append("'> ")
				
				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>")

				.append("<d:IV_SITE>")
				.append(pplannerParam.getSiteNo())
				.append("</d:IV_SITE>");
				if(pplannerParam.isPaginationCheck())
				{
				xml.append("<d:IV_ARTICLE>");
			if (pplannerParam.getArticleNo() != null
					&& pplannerParam.getArticleNo().trim().length() > 0)
				xml.append(pplannerParam.getArticleNo());// for defect 14743
				
				xml.append("</d:IV_ARTICLE>")

				.append("<d:IV_ART_DESC>");
				if (pplannerParam.getArticleName() != null
						&& pplannerParam.getArticleName().trim().length() > 0)
				xml.append(pplannerParam.getArticleName());// for defect 14743
				
				xml.append("</d:IV_ART_DESC>")
				
				.append("<d:IV_EAN>");
				if (pplannerParam.getGtin() != null
						&& pplannerParam.getGtin().trim().length() > 0)
				xml.append(pplannerParam.getGtin());// for defect 14743
				
				xml.append("</d:IV_EAN>");
				
				xml.append("<d:IV_PAGE_NO>");
				if(pplannerParam.getPageNumber() != null && !pplannerParam.getPageNumber().equalsIgnoreCase(""))
				xml.append(pplannerParam.getPageNumber());
				
				xml.append("</d:IV_PAGE_NO>");
				
				xml.append("<d:IV_RECORDS>")
				.append("10")
				.append("</d:IV_RECORDS>");
				
}
				xml.append("<d:IV_DEPARTMENT>")
				.append(pplannerParam.getDepartment())
				.append("</d:IV_DEPARTMENT>")
				
				.append("<d:IV_WEEKLY>");
				if(pplannerParam.getSchedule().equalsIgnoreCase("weekly"))
				xml.append("X");
				
				xml.append("</d:IV_WEEKLY>")
				
				.append("<d:IV_DAY>");
				
				if(pplannerParam.getSchedule().equalsIgnoreCase("daily"))
				xml.append(date);
				
				xml.append("</d:IV_DAY>")

				.append("</m:properties> ")
				.append("</atom:content>")

				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/PPItems' type='application/atom+xml;type=feed'  title='ZSP_PROD_PLAN_DAILY_ENQ.PPHeader_PPItem'>")
				.append("<m:inline><atom:feed>");
	String[] categoryList = pplannerParam.getCategoryList();
	for(String category : categoryList)
	{
		xml.append(
				"<atom:entry> <atom:content type='application/xml'><m:properties>")
				.append("<d:IV_SITE>")
				.append(pplannerParam.getSiteNo())
				.append("</d:IV_SITE>")

				.append("<d:CATEGORY_DESC>")
				.append(category)
				.append("</d:CATEGORY_DESC>")
				.append("</m:properties> </atom:content></atom:entry>");
	}

	xml.append("</atom:feed></m:inline></atom:link></atom:entry>");
	
	return xml.toString();
}

public List<PPArticleSearchResults> getBakeryDoughArticleDetails(
		PPlanerParam PPlannerParam,UserContext user) throws Exception
		{
	
	HttpHeaders requestHeaders = new HttpHeaders();
	requestHeaders.add(Constants.X_CSRF_TOKEN, Constants.FETCH);
	HttpEntity<String> requestEntity = new HttpEntity<String>(
			requestHeaders);
	ResponseEntity<Object> response = null;
	try {
		response = getForPostRestTemplate(user).exchange(productionPlannerBakeryEnquiryTokenUrl,
				HttpMethod.GET, requestEntity, Object.class);
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		String token = responseHeaders.getFirst(Constants.X_CSRF_TOKEN);
		LOGGER.info("bakery dough token __" + token);
		return getBakeryDoughArticleDetailsFromSAP(token,
				PPlannerParam,user);
	} catch (Exception e) {

		return null;
	}
		}

public List<PPArticleSearchResults> getBakeryDoughArticleDetailsFromSAP(String token,
		PPlanerParam PPlannerParam,UserContext user) throws Exception
		{
	HttpHeaders postrequestHeaders = new HttpHeaders();

	postrequestHeaders.add(Constants.X_CSRF_TOKEN, token);

	postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

	String postXml = construcXMLForBakeryCalculatorInput(PPlannerParam);

	LOGGER.info("postXml__" + postXml);
	HttpEntity<Object> requestEntity = new HttpEntity<Object>(postXml,
			postrequestHeaders);
	ResponseEntity<PPBakeryArticleResultsResponse> response = null;
	try {

		response = getForPostRestTemplate(user).exchange(

		productionPlannerBakeryEnquiryPostUrl, HttpMethod.POST, requestEntity,

		PPBakeryArticleResultsResponse.class);
		LOGGER.info("response ::::::::" + response);
		if (response == null
				|| response.getBody().getBakeryArticleResultsResponseHelper() == null
				|| response.getBody().getBakeryArticleResultsResponseHelper()
						.getPpArticleResponseItems() == null
				|| response.getBody().getBakeryArticleResultsResponseHelper().getPpArticleResponseItems()
						.getPpArticleSearchResultsList().size() == 0
				|| response.getBody().getBakeryArticleResultsResponseHelper().getPpArticleResponseItems()
						.getPpArticleSearchResultsList().get(0).getMsg()
						.trim().contains(" ")
				|| response.getBody().getBakeryArticleResultsResponseHelper().getPpArticleResponseItems()
						.getPpArticleSearchResultsList().get(0).getMsg()
						.equalsIgnoreCase("No Data Found")		
				)

		{
			return null;
		} else {
			return response.getBody().getBakeryArticleResultsResponseHelper().getPpArticleResponseItems()
					.getPpArticleSearchResultsList();
		}

	} catch (Exception e) {
		
		LOGGER.error(e);
		return null;
	}
	}
}
