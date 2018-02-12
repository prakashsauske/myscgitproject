package au.com.woolworths.portal.service;

import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;

import au.com.woolworths.portal.model.ArticleFreshFoodLabels;
import au.com.woolworths.portal.model.ArticleFreshFoodLabelsResponse;
import au.com.woolworths.portal.model.ArticleGtinInfo;
import au.com.woolworths.portal.model.ArticleGtinResponse;
import au.com.woolworths.portal.model.ArticleHierarchy;
import au.com.woolworths.portal.model.ArticleHierarchyResponse;
import au.com.woolworths.portal.model.ArticleNutritionalResponse;
import au.com.woolworths.portal.model.ArticleNutritionalResult;
import au.com.woolworths.portal.model.ArticlePOSInfo;
import au.com.woolworths.portal.model.ArticlePOSInfoResponse;
import au.com.woolworths.portal.model.ArticlePackBreakdown;
import au.com.woolworths.portal.model.ArticlePackBreakdownResponse;
import au.com.woolworths.portal.model.ArticlePackBrkData;
import au.com.woolworths.portal.model.ArticlePackBrkDataResponse;
import au.com.woolworths.portal.model.ArticleProductNotes;
import au.com.woolworths.portal.model.ArticleProductNotesResponse;
import au.com.woolworths.portal.model.ArticleReplenishmentData;
import au.com.woolworths.portal.model.ArticleReplenishmentResponse;
import au.com.woolworths.portal.model.ArticleResultsResponse;
import au.com.woolworths.portal.model.ArticleSalesView;
import au.com.woolworths.portal.model.ArticleSalesViewResponse;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.ArticleSiteView;
import au.com.woolworths.portal.model.ArticleSiteViewResponse;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.DepartmentResponse;
import au.com.woolworths.portal.model.LinkedArticleData;
import au.com.woolworths.portal.model.LinkedArticleSearchResponse;
import au.com.woolworths.portal.model.PostResponse;
import au.com.woolworths.portal.model.Replenishment;
import au.com.woolworths.portal.model.ReplenishmentResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.param.ArticleParam;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.param.NutritionInfoMailParam;
import au.com.woolworths.portal.util.Constants;

public class ArticleServiceImpl extends CommonServiceImpl {

	@Value("#{url['AdjustedSOHServiceUrl']}")
	private String adjustedSOHServiceUrl;

	@Value("#{url['AdjustedSOHPostServiceUrl']}")
	private String adjustedSOHPostServiceUrl;

	@Value("#{url['FreshFoodLabelServiceUrl']}")
	private String FreshFoodLabelServiceUrl;

	@Value("#{url['ArticleCustcomServiceUrl']}")
	private String ArticleCustcomServiceUrl;

	@Value("#{url['ProductNotesServiceUrl']}")
	private String ProductNotesServiceUrl;

	@Value("#{url['PackBreakdownServiceUrl']}")
	private String PackBreakdownServiceUrl;

	@Value("#{url['ArticleListingServiceURL']}")
	private String articleListingServiceURL;

	@Value("#{url['LinkedArticleService']}")
	private String linkedArticleService;

	@Value("#{url['DepartmentServiceUrl']}")
	private String departmentServiceUrl;

	@Value("#{url['ArticlePackBrkURL']}")
	private String articlePackBrkURL;

	@Value("#{url['ArticlePOSDataURL']}")
	private String articlePOSDataURL;

	@Value("#{url['ArticleReplenishmentURL']}")
	private String articleReplenishmentURL;

	@Value("#{url['PageSize']}")
	private String pageSize;

	@Value("#{url['GTINServiceURL']}")
	private String GTINServiceURL;

	@Value("#{url['ArticleHierarchyTabServiceURL']}")
	private String articleHierarchyTabServiceURL;

	@Value("#{url['ReplenishmentTabServiceURL']}")
	private String replenishmentTabServiceURL;
	
	@Value("#{url['ScaleArticleServiceUrl']}")
	private String ScaleArticleServiceUrl;
	
	private final static String REST_HOST = "http://clsapd320.woolworths.com.au:8011/";
	private final static String REST_PATH = "sap/opu/odata/sap/";

	private final static String ZSP_ART_LISTING = "ZSP_ART_LISTING/";
	private final static String ZSP_ART_LOOKUP = "ZSP_ART_LOOKUP/";
	private final static String ZSP_ART_SORGDC = "ZSP_ART_SORGDC/";

	private final static String ZSP_ART_EAN_LOOKUP = "ZSP_ART_EAN_LOOKUP/";
	private final static String ZSP_ART_EAN_LISTING = "ZSP_ART_EAN_LISTING/";
	private final static String ZSP_ART_EAN_SORG_DC = "ZSP_ART_EAN_SORG_DC/";

	private final static String ZSP_ART_DESCR_LOOKUP = "ZSP_ART_DESCR_LOOKUP/";
	private final static String ZSP_ART_DESCR_LISTING = "ZSP_ART_DESCR_LISTING/";
	private final static String ZSP_ART_DESCR_SORG_DC = "ZSP_ART_DESCR_SORG_DC/";

	private final static String ARTICLE_LOOKUP_COLLECTION = "zsp_art_lookupCollection{(1)}/";
	private final static String ARTICLE_LISTING_COLLECTION = "zsp_art_listingCollection{(1)}/";
	private final static String ARTICLE_SORG_DC_COLLECTION = "zsp_art_sorgdcCollection{(1)}/";
	private final static String GTIN_LOOKUP_COLLECTION = "zsp_art_ean_lookupCollection{(1)}/";
	private final static String GTIN_LISTING_COLLECTION = "zsp_art_ean_listingCollection{(1)}/";
	private final static String GTIN_SORG_DC_COLLECTION = "zsp_art_ean_sorg_dcCollection{(1)}/";
	private final static String ARTICLE_DESC_LOOKUP_COLLECTION = "zsp_art_descr_lookupCollection{(1)}/";
	private final static String ARTICLE_DESC_LISTING_COLLECTION = "zsp_art_descr_listingCollection{(1)}/";
	private final static String ARTICLE_DESC_SORG_DC_COLLECTION = "zsp_art_descr_sorg_dcCollection{(1)}/";

	private final static String SUFFIX_SITE = "et_site_view_r";

	private final static String SUFFIX_SALE = "et_sales_view_r";

	private boolean isGTIN = false;
	private boolean isSiteFilled = false;
	private boolean isSalesOrgFilled = false;
	private boolean isArticleDesc = false;
	private boolean isCategory = false;
	
	/*@Autowired
	private MailSender mailSender;*/
	
	@Autowired
	private JavaMailSender mailSender;

	/*@Autowired
	private SimpleMailMessage NutritionInfoMailMessage;*/
	private static final Logger LOGGER = Logger
			.getLogger(ArticleServiceImpl.class.getName());
	
	private String getURL(ArticleParam articleParam) {

		isGTIN = false;
		isSiteFilled = false;
		isSalesOrgFilled = false;
		isArticleDesc = false;
		isCategory = false;
		String url = REST_HOST + REST_PATH;

		if (articleParam.getArticleNo() != null
				&& !(articleParam.getArticleNo().isEmpty())) {

			if (articleParam.getArticleNo().length() > 6) {// GTIN

				// //System.out.println("GTIN *********** ");
				isGTIN = true;

				if ((articleParam.getSiteNo() != null && !(articleParam
						.getSiteNo().equals("")))
						&& (articleParam.getSalesOrg() == null || (articleParam
								.getSalesOrg().equals("")))) {

					url = url + ZSP_ART_EAN_LISTING + GTIN_LISTING_COLLECTION;
					isSiteFilled = true;
					// //System.out.println("GTIN SITE *********** " + url);

				} else if (articleParam.getSalesOrg() != null
						&& !(articleParam.getSalesOrg().equals(""))
						&& (articleParam.getSiteNo() == null || (articleParam
								.getSiteNo().equals("")))) {

					url = url + ZSP_ART_EAN_SORG_DC + GTIN_SORG_DC_COLLECTION;
					isSalesOrgFilled = true;
					// ////System.out.println("GTIN SALES ORG *********** " +
					// url);

				} else {
					url = url + ZSP_ART_EAN_LOOKUP + GTIN_LOOKUP_COLLECTION;
					// //System.out.println("GTIN NO *********** " + url);
				}
			} else {// ARTICLE

				if ((articleParam.getSiteNo() != null && !(articleParam
						.getSiteNo().equals("")))
						&& (articleParam.getSalesOrg() == null || (articleParam
								.getSalesOrg().equals("")))) {

					url = url + ZSP_ART_LISTING + ARTICLE_LISTING_COLLECTION;
					isSiteFilled = true;

				} else if (articleParam.getSalesOrg() != null
						&& !(articleParam.getSalesOrg().equals(""))
						&& (articleParam.getSiteNo() == null || (articleParam
								.getSiteNo().equals("")))) {
					url = url + ZSP_ART_SORGDC + ARTICLE_SORG_DC_COLLECTION;
					isSalesOrgFilled = true;

				} else {
					url = url + ZSP_ART_LOOKUP + ARTICLE_LOOKUP_COLLECTION;
				}
			}

		} else if (articleParam.getArticleName() != null
				&& !(articleParam.getArticleName().isEmpty())) { // ARTICEL DESC
			// is filled
			isArticleDesc = true;
			if ((articleParam.getSiteNo() != null && !(articleParam.getSiteNo()
					.equals("")))
					&& (articleParam.getSalesOrg() == null || (articleParam
							.getSalesOrg().equals("")))) {

				url = url + ZSP_ART_DESCR_LISTING
						+ ARTICLE_DESC_LISTING_COLLECTION;
				isSiteFilled = true;
			} else if (articleParam.getSalesOrg() != null
					&& !(articleParam.getSalesOrg().equals(""))
					&& (articleParam.getSiteNo() == null || (articleParam
							.getSiteNo().equals("")))) {

				url = url + ZSP_ART_DESCR_SORG_DC
						+ ARTICLE_DESC_SORG_DC_COLLECTION;
				isSalesOrgFilled = true;

			} else {
				url = url + ZSP_ART_DESCR_LOOKUP
						+ ARTICLE_DESC_LOOKUP_COLLECTION;
			}
		} else if (articleParam.getCategoryNo() != null
				&& !(articleParam.getCategoryNo().isEmpty())) {

			isCategory = true;
			if ((articleParam.getSiteNo() != null && !(articleParam.getSiteNo()
					.equals("")))
					&& (articleParam.getSalesOrg() == null || (articleParam
							.getSalesOrg().equals("")))) {

				url = " http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_ART_CATG_LISTING/zsp_art_catg_listingCollection{(1)}";
				isSiteFilled = true;
			} else if (articleParam.getSalesOrg() != null
					&& !(articleParam.getSalesOrg().equals(""))
					&& (articleParam.getSiteNo() == null || (articleParam
							.getSiteNo().equals("")))) {

				url = " http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_ART_CATG_SORG_DC/zsp_art_catg_sorg_dcCollection{(1)}";
				isSalesOrgFilled = true;
			} else {
				url = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_ART_CATG_LOOKUP/zsp_art_catg_lookupCollection{(1)}/";
			}
		}

		return url;
	}

	private String getURLParam(ArticleParam articleParam) {
		String urlParam = null;

		if (isGTIN) {

			if (isSiteFilled) {// set GTIN no and SITE no iv_gtin

				urlParam = "(iv_gtin='" + articleParam.getArticleNo()
						+ "',iv_site='" + articleParam.getSiteNo() + "')";

			} else if (isSalesOrgFilled) {// set GTIN no and SALES ORG and DC is
				// 10

				urlParam = "(iv_gtin='" + articleParam.getArticleNo()
						+ "',iv_s_org='" + articleParam.getSalesOrg()
						+ "',iv_dc='" + "10" + "')";
			} else {// set GTIN no
				urlParam = "(iv_gtin='" + articleParam.getArticleNo() + "')";
			}

		} else { // ARTICLE

			if (isSiteFilled) {// set ARTICLE no and SITE no

				urlParam = "(iv_article='" + articleParam.getArticleNo()
						+ "',iv_site='" + articleParam.getSiteNo() + "')";

			} else if (isSalesOrgFilled) {// set ARTICLE no and SALES ORG and DC
				// is 10

				urlParam = "(iv_article='" + articleParam.getArticleNo()
						+ "',iv_s_org='" + articleParam.getSalesOrg()
						+ "',iv_dc='" + "10" + "')";

			} else {// set ARTICLE no
				urlParam = "(iv_article='" + articleParam.getArticleNo() + "')";
			}
		}

		if (isArticleDesc) {
			if (isSiteFilled) {// set ARTICLE no and SITE no

				urlParam = "(iv_desc='" + articleParam.getArticleName()
						+ "',iv_site='" + articleParam.getSiteNo() + "')";

			} else if (isSalesOrgFilled) {// set ARTICLE no and SALES ORG and DC
				// is 10

				urlParam = "(iv_desc='" + articleParam.getArticleName()
						+ "',iv_s_org='" + articleParam.getSalesOrg()
						+ "',iv_dc='" + "10" + "')";

			} else {// set ARTICLE no
				urlParam = "(iv_desc='" + articleParam.getArticleName() + "')";
			}
		}
		if (isCategory) {
			if (isSiteFilled) {// set ARTICLE no and SITE no

				urlParam = "(iv_hier_node='" + articleParam.getCategoryNo()
						+ "',iv_site='" + articleParam.getSiteNo() + "')";

			} else if (isSalesOrgFilled) {// set ARTICLE no and SALES ORG and DC
				// is 10

				urlParam = "(iv_hier_node='" + articleParam.getCategoryNo()
						+ "',iv_s_org='" + articleParam.getSalesOrg()
						+ "',iv_dc='" + "10" + "')";

			} else {// set ARTICLE no
				urlParam = "(iv_hier_node='" + articleParam.getCategoryNo()
						+ "')";
			}
		}
		// System.out.println("*** urlParam " + urlParam);
		return urlParam;
	}

	// ************** ARTICLE STANDARD SERVICE ***********************

	public List<ArticleGtinInfo> getGtinView(ArticleParam articleParam,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		try {

			ArticleGtinResponse articleGtinResponse = getRestTemplate(user)
					.getForObject(
							GTINServiceURL,
							ArticleGtinResponse.class,
							"iv_article eq '" + articleParam.getArticleNo()
									+ "'");

			if (articleGtinResponse.getArticleGtinResponseHelper() != null) {

				List<ArticleGtinInfo> gtinListResponse = articleGtinResponse
						.getArticleGtinResponseHelper()
						.getArticleGtinInfoList();

				List<ArticleGtinInfo> gtinList = new ArrayList<ArticleGtinInfo>();

				String articleEAN = "";
				for (ArticleGtinInfo gtin : gtinListResponse) {
					if (gtin.getEan11() != null && !gtin.getEan11().equals("")) {
						if (gtin.getBaseUom().equalsIgnoreCase("Yes")) {
							articleEAN = gtin.getEan11();
						}
						gtinList.add(gtin);
					}
				}

				// GN - 10-06-2013: Set EAN value in to each element of GTIN
				// list
				for (ArticleGtinInfo gtin : gtinList) {
					gtin.setArticleEAN(articleEAN);
				}

				return gtinList;
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<ArticleSiteView> getSiteView(ArticleParam articleParam,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		try {
			ArticleSiteViewResponse articleSiteViewResponse = getRestTemplate(user)
					.getForObject(getURL(articleParam) + SUFFIX_SITE,
							ArticleSiteViewResponse.class,
							getURLParam(articleParam));

			if (articleSiteViewResponse.getArticleSiteViewResponseHelper() != null) {

				return articleSiteViewResponse
						.getArticleSiteViewResponseHelper()
						.getArticleSiteViewList();
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<ArticleSalesView> getSalesViewInfo(ArticleParam articleParam,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		try {
			ArticleSalesViewResponse articleSalesViewResponse = getRestTemplate(user)
					.getForObject(getURL(articleParam) + SUFFIX_SALE,
							ArticleSalesViewResponse.class,
							getURLParam(articleParam));

			if (articleSalesViewResponse.getArticleSalesViewResponseHelper() != null) {

				return articleSalesViewResponse
						.getArticleSalesViewResponseHelper()
						.getArticleSalesView();
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}
	public List<ArticleFreshFoodLabels> getFreshFoodFlagInformation(
			ArticleParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		try {
			ArticleFreshFoodLabelsResponse response = getRestTemplate(user)
					.getForObject(
							ScaleArticleServiceUrl,
							ArticleFreshFoodLabelsResponse.class,
							"iv_article eq '" + articleParam.getArticleNo()
							+ "' and iv_site eq '"
									+ articleParam.getSiteNo()
									+ "'");

			if (response != null && response.getResponse() != null) {
				return response.getResponse().getFreshFoodLabelInfos();
			}
			return null;
		}
		catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<ArticleFreshFoodLabels> getFreshFoodLabelInformation(
			ArticleParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		try {
			ArticleFreshFoodLabelsResponse response = getRestTemplate(user)
					.getForObject(
							FreshFoodLabelServiceUrl,
							ArticleFreshFoodLabelsResponse.class,
							"iv_article eq '" + articleParam.getArticleNo()
									+ "'");

			if (response != null && response.getResponse() != null) {
				return response.getResponse().getFreshFoodLabelInfos();
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public List<ArticlePackBreakdown> getPackBreakdownInfo(
			ArticleParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		try {
			ArticlePackBreakdownResponse response = getRestTemplate(user)
					.getForObject(
							PackBreakdownServiceUrl,
							ArticlePackBreakdownResponse.class,
							"iv_article eq '" + articleParam.getArticleNo()
									+ "' and iv_site eq '"
									+ articleParam.getSiteNo() + "'");

			if (response != null && response.getResponse() != null) {
				return response.getResponse().getPackBreakdown();
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public List<ArticleNutritionalResult> getArticleCustcomNutritionalInfo(
			ArticleParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {
		try {
			ArticleNutritionalResponse response = getRestTemplate(user)
					.getForObject(
							ArticleCustcomServiceUrl,
							ArticleNutritionalResponse.class,
							"iv_article eq '" + articleParam.getArticleNo()
									+ "'");

			if (response != null
					&& response.getArticleNutritionalResponseHelper() != null) {
				return response.getArticleNutritionalResponseHelper()
						.getArticleCustomInfo();
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<ArticleProductNotes> getProductNotesInfo(
			ArticleParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		try {
			if (articleParam.getArticleNo() != null
					&& !articleParam.getArticleNo().equals("")
					&& articleParam.getSiteNo() != null
					&& !articleParam.getSiteNo().equals("")) {
				ArticleProductNotesResponse response = getRestTemplate(user)
						.getForObject(
								ProductNotesServiceUrl,
								ArticleProductNotesResponse.class,
								"iv_article eq '" + articleParam.getArticleNo()
										+ "' and iv_site eq '"
										+ articleParam.getSiteNo() + "'");

				if (response != null && response.getResponse() != null) {
					return response.getResponse().getProductNotes();
				}
			}
			return null;
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<ArticleSearchResults> getAdvanceSearchReults(String categoryNo,UserContext user) {

		// //System.out.println("********Advance search Category service ***** ");

		String urlParam = "iv_hier_node eq '" + categoryNo + "'";

		try {

			// //System.out.println("******* categoryNo " + categoryNo);
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0) {
				return null;
			} else {
				try {

					Integer.parseInt(response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.trim());

				} catch (Exception e) {
					return null;
				}
			}

			return response.getArticleResultsResponseHelper()
					.getArticleSearchResultsList();

		} catch (Exception e) {
			e.printStackTrace();

			return null;
		}

	}

	public List<Department> getDeptDetail(String prod_no, Integer salesOrg,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		try {
			DepartmentResponse departmentResponse = getRestTemplate(user)
					.getForObject(
							departmentServiceUrl,
							DepartmentResponse.class,
							"iv_s_org eq '"
									+ salesOrg
									+ "' and iv_dc eq '10' and iv_parent_node eq '"
									+ prod_no + "'");

			if (departmentResponse.getDepartmentResponseHelper() != null) {

				// //System.out.println("departmentResponse."
				// + departmentResponse.getDepartmentResponseHelper()
				// .getDepartmentList().get(0).getNode());
				return departmentResponse.getDepartmentResponseHelper()
						.getDepartmentList();

			} else {
				// //System.out.println("departmentResponse. in null"
				// + departmentResponse.getDepartmentResponseHelper()
				// .getDepartmentList().get(0).getNode());
				return null;

			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public String getadjustedSOHService(String articleNo, String quantity,
			String mvmtType, String siteNo, String uomVal,UserContext user) {
		/*
		 * List<HttpMessageConverter<?>> messageConverters = new
		 * ArrayList<HttpMessageConverter<?>>(); messageConverters.add(new
		 * MappingJacksonHttpMessageConverter());
		 * restTemplate.setMessageConverters(messageConverters);
		 */

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		/*
		 * restTemplate.getMessageConverters().add( new
		 * StringHttpMessageConverter());
		 */
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			// //System.out.println("inside try catch block");

			response = getForPostRestTemplate(user).exchange(adjustedSOHServiceUrl,
					HttpMethod.GET, requestEntity, Object.class);

			// //System.out.println("Headers" + response.getHeaders());
		} catch (Exception e) {
			String msg = "Stock Adjustment Failed,Due to Service unavaliabilty";
			e.printStackTrace();
			return msg;
		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		// Set<String> keys = responseHeaders.keySet();
		// //System.out.println("x-csrf-token Value "
		// + responseHeaders.getFirst("x-csrf-token"));

		String token = responseHeaders.getFirst("x-csrf-token");

		String val = callpostRequest(token, articleNo, quantity, mvmtType,
				siteNo, uomVal,user);
		return val;

	}

	public String callpostRequest(String token, String articleNo,
			String quantity, String mvmtType, String siteNo, String uomVal,UserContext user) {
		// //System.out.println("inside call post");
		// //System.out.println("art in  call post req" + articleNo);
		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		StringBuffer xml = new StringBuffer();

		DateFormat dateFormat = new SimpleDateFormat("yyyyMMdd");
		// get current date time with Date()
		Date date = new Date();
		// //System.out.println(dateFormat.format(date));

		String currentDate = dateFormat.format(date);

		// String siteNo = "1008";
		String storageLocation = "1000";
		// int mvmtType;
		double qty = (Double.parseDouble(quantity));

		/*
		 * if (qty < 0) { mvmtType = 252; } else { mvmtType = 251; }
		 */

		if (qty < 0) {
			qty = qty * (-1);
		}

		/*
		 * xml.append(
		 * " <atom:entry xml:lang='en' xmlns:atom='http://www.w3.org/2005/Atom'"
		 * );
		 * 
		 * xml.append(
		 * " xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");
		 * 
		 * xml.append(
		 * " xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'"
		 * );
		 * 
		 * xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData' ");
		 * 
		 * xml.append(
		 * " xml:base='http://clsapd320.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_STOCK_ADJ/'>"
		 * );
		 * 
		 * xml.append(" <atom:content type='application/xml'>");
		 * 
		 * xml.append(" <m:properties>");
		 * 
		 * xml.append(" <d:iv_qty>"); xml.append(qty);
		 * xml.append("</d:iv_qty>");
		 * 
		 * xml.append(" <d:iv_article>"); xml.append(Integer.parseInt(articleNo)
		 * / 1); xml.append("</d:iv_article>");
		 * 
		 * xml.append(" <d:iv_storage_loc>"); xml.append(storageLocation);
		 * xml.append("</d:iv_storage_loc>");
		 * 
		 * xml.append(" <d:iv_doc_date>"); xml.append(currentDate);
		 * xml.append("</d:iv_doc_date>");
		 * 
		 * 
		 * 
		 * xml.append(" <d:iv_site>"); xml.append(siteNo);
		 * xml.append("</d:iv_site>");
		 * 
		 * xml.append(" <d:iv_mvmt_type>"); xml.append(mvmtType);
		 * xml.append("</d:iv_mvmt_type> ");
		 * 
		 * xml.append(" </m:properties>");
		 * 
		 * xml.append(" </atom:content>");
		 * 
		 * xml.append(" </atom:entry>");
		 */

		xml.append(" <atom:entry xml:lang='en' xmlns:atom='http://www.w3.org/2005/Atom'");

		xml.append(" xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices'");

		xml.append(" xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata'");

		xml.append(" xmlns:sap='http://www.sap.com/Protocols/SAPData' ");

		xml.append(" xml:base='").append(adjustedSOHServiceUrl).append("'>");

		xml.append(" <atom:content type='application/xml'>");

		xml.append(" <m:properties>");

		xml.append(" <d:IV_SITE>");
		xml.append(siteNo);
		xml.append("</d:IV_SITE>");
		xml.append(" <d:IV_ARTICLE>");
		xml.append(Integer.parseInt(articleNo) / 1);
		// xml.append(234);
		xml.append("</d:IV_ARTICLE>");

		xml.append(" <d:IV_DOC_DATE>");
		xml.append(currentDate);
		xml.append("</d:IV_DOC_DATE>");

		xml.append(" <d:IV_MVMT_TYPE>");
		xml.append(mvmtType);
		xml.append("</d:IV_MVMT_TYPE> ");
		xml.append(" <d:IV_QTY>");
		xml.append(qty);
		xml.append("</d:IV_QTY>");
		xml.append(" <d:IV_UOM>");
		xml.append(uomVal);
		xml.append("</d:IV_UOM>");
		xml.append("<d:IV_TEST>");
		xml.append(" ");
		xml.append("</d:IV_TEST>");

		xml.append(" </m:properties>");

		xml.append(" </atom:content>");

		xml.append(" </atom:entry>");

		// System.out.println("xml data" + xml.toString());
		HttpEntity<Object> requestEntity = new HttpEntity<Object>(
				xml.toString(), postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			adjustedSOHPostServiceUrl, HttpMethod.POST, requestEntity,

			PostResponse.class);

			// //System.out.println("after post-exchange");

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null
					&& response.getBody().getPostResponseHelper().getError()
							.trim().length() == 0
					&& response.getBody().getPostResponseHelper().getType()
							.trim().length() == 0

			) {

				return null;

			} else {

				System.out
						.println("Response error:"
								+ response.getBody().getPostResponseHelper()
										.getError());

				return response.getBody().getPostResponseHelper().getError();

			}

		} catch (Exception e) {
			String msg = "Stock Adjustment Failed,Due to Service unavaliabilty";
			e.printStackTrace();
			return msg;

		}

	}

	/*
	 * public List<ArticleSearchResults> getArticleDetails(ArticleParam
	 * articleParam) throws JsonParseException, JsonMappingException,
	 * IOException {
	 * 
	 * 
	 * //System.out.println("******* getArticleDetails ******** ");
	 * 
	 * 
	 * String urlParam;
	 * 
	 * 
	 * urlParam=" iv_site eq '" + articleParam.getSiteNo() + "'";
	 * if(articleParam.getArticleNo()!=null &&
	 * articleParam.getArticleNo().trim().length()>0) urlParam = urlParam+
	 * " and iv_article eq '" + articleParam.getArticleNo()+ "'";
	 * 
	 * if(articleParam.getArticleName()!=null &&
	 * articleParam.getArticleName().trim().length()>0)
	 * 
	 * urlParam = urlParam+" and iv_desc eq '" + articleParam.getArticleName()+
	 * "'"+ " and iv_records eq "+pageSize+" and iv_page_no eq "+articleParam.
	 * getPageNumber();
	 * 
	 * if(articleParam.getCategoryNo()!=null &&
	 * articleParam.getCategoryNo().trim().length()>0)
	 * 
	 * urlParam = urlParam+" and iv_category eq '" +
	 * articleParam.getCategoryNo()+ "'"+
	 * " and iv_records eq "+pageSize+" and iv_page_no eq "
	 * +articleParam.getPageNumber();
	 * 
	 * if(articleParam.getSuppNo()!=null &&
	 * articleParam.getSuppNo().trim().length()>0)
	 * 
	 * urlParam = urlParam+" and iv_sos eq '" + articleParam.getSrcOfSuppliy()+
	 * "' and iv_supplier eq '"+articleParam.getSuppNo()+"'"+
	 * " and iv_records eq "
	 * +pageSize+" and iv_page_no eq "+articleParam.getPageNumber();
	 * 
	 * if(articleParam.getGtin()!=null &&
	 * articleParam.getGtin().trim().length()>0) urlParam = urlParam+
	 * " and iv_gtin eq '" + articleParam.getGtin()+ "'";
	 * 
	 * 
	 * //System.out.println( urlParam );
	 * 
	 * ArticleResultsResponse response= getRestTemplate(user)
	 * .getForObject(articleListingServiceURL, ArticleResultsResponse.class,
	 * urlParam);
	 * 
	 * if(response==null || response.getArticleResultsResponseHelper()==null ||
	 * response
	 * .getArticleResultsResponseHelper().getArticleSearchResultsList()==null
	 * ||response
	 * .getArticleResultsResponseHelper().getArticleSearchResultsList()
	 * .size()==0 ||
	 * response.getArticleResultsResponseHelper().getArticleSearchResultsList
	 * ().get(0).getMsg().trim().length()==0)
	 * 
	 * { return null; }else{ try{ if(articleParam.getArticleNo()==null ||
	 * articleParam.getArticleNo().trim().length()==0){
	 * articleParam.setRecordCount
	 * (Integer.parseInt(response.getArticleResultsResponseHelper
	 * ().getArticleSearchResultsList().get(0).getMsg().trim())); return
	 * response.getArticleResultsResponseHelper().getArticleSearchResultsList();
	 * }else{ return
	 * response.getArticleResultsResponseHelper().getArticleSearchResultsList();
	 * } }catch(Exception e){
	 * if(response.getArticleResultsResponseHelper().getArticleSearchResultsList
	 * ().get(0).getMsg().trim().length()>0) return null;
	 * 
	 * } }
	 * if(response.getArticleResultsResponseHelper().getArticleSearchResultsList
	 * ().get(0).getMsg().trim().length()==0) return
	 * response.getArticleResultsResponseHelper().getArticleSearchResultsList();
	 * else return null;
	 * 
	 * 
	 * 
	 * }
	 */
	public List<ArticleSearchResults> getArticleDetails(String articleNo,
			String siteNo, String flag,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		// //System.out.println("******* getArticleDetails  String articleNo,String siteNo ******** ");
		String urlParam;
		urlParam = " iv_site eq '" + siteNo + "'";
		if (articleNo != null && articleNo.trim().length() > 0
				&& flag.equals("1"))
			urlParam = urlParam + " and iv_article eq '" + articleNo + "'";
		if (articleNo != null && articleNo.trim().length() > 0
				&& flag.equals("2"))
			urlParam = urlParam + " and iv_gtin eq '" + articleNo + "'";

		// System.out.println(urlParam);
		try {
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.equalsIgnoreCase("No Data Found"))
				return null;
			else
				return response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/****** newly added ******/
	public List<ArticleSearchResults> getArticleDetails(
			ArticleParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		// //System.out.println("******* getArticleDetails ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + articleParam.getSiteNo() + "'";

		if (articleParam.getArticleNo() != null
				&& articleParam.getArticleNo().trim().length() > 0) {
			urlParam = urlParam + " and iv_article eq '"
					+ articleParam.getArticleNo() + "'";
		} else if (articleParam.getArticleName() != null
				&& articleParam.getArticleName().trim().length() > 0) {
			urlParam = urlParam + " and iv_desc eq '"
					+ articleParam.getArticleName() + "'";
		} else if (articleParam.getGtin() != null
				&& articleParam.getGtin().trim().length() > 0)
			urlParam = urlParam + " and iv_gtin eq '" + articleParam.getGtin()
					+ "'";

		// Advance Search
		if (articleParam.getSrcOfSuppliy() != null
				&& articleParam.getSrcOfSuppliy().trim().length() > 0
				&& articleParam.getSuppNo() != null
				&& articleParam.getSuppNo().trim().length() > 0) {
			urlParam = urlParam + " and iv_sos eq '"
					+ articleParam.getSrcOfSuppliy() + "' and iv_supplier eq '"
					+ articleParam.getSuppNo() + "'";
			// +
			// " and iv_records eq "+pageSize+" and iv_page_no eq "+articleParam.getPageNumber();
		}
		// Department Search
		if (articleParam.getCategoryNo() != null
				&& articleParam.getCategoryNo().trim().length() > 0)
			urlParam = urlParam + " and iv_hier_node eq '"
					+ articleParam.getCategoryNo() + "'";

		// Pagination check
		if (articleParam.isPaginationCheck()) {
			urlParam = urlParam + " and iv_records eq " + pageSize
					+ " and iv_page_no eq " + articleParam.getPageNumber();
			// articleParam.setPaginationCheck(false);
		}

		if (articleParam.isRangedChk()) {
			urlParam = urlParam + " and iv_ranged eq 'X'";
			// articleParam.setRangedChk(false);
		}
		// urlParam = urlParam+ " and iv_ranged eq 'X'";

		System.out.println(urlParam);
		try {
			ArticleResultsResponse response = getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			/*
			 * if(response==null ||
			 * response.getArticleResultsResponseHelper()==null ||
			 * response.getArticleResultsResponseHelper
			 * ().getArticleSearchResultsList()==null
			 * ||response.getArticleResultsResponseHelper
			 * ().getArticleSearchResultsList().size()==0) //||
			 * response.getArticleResultsResponseHelper
			 * ().getArticleSearchResultsList
			 * ().get(0).getMsg().trim().length()==0)
			 * 
			 * { return null; }else{ try{ if(articleParam.getArticleNo()==null
			 * || articleParam.getArticleNo().trim().length()==0){
			 * articleParam.setRecordCount
			 * (Integer.parseInt(response.getArticleResultsResponseHelper
			 * ().getArticleSearchResultsList().get(0).getMsg().trim())); return
			 * response
			 * .getArticleResultsResponseHelper().getArticleSearchResultsList();
			 * }else{ return response.getArticleResultsResponseHelper().
			 * getArticleSearchResultsList(); } }catch(Exception e){
			 * if(response.
			 * getArticleResultsResponseHelper().getArticleSearchResultsList
			 * ().get(0).getMsg().trim().length()>0) return null;
			 * 
			 * } } if(response.getArticleResultsResponseHelper().
			 * getArticleSearchResultsList().get(0).getMsg().trim().length()==0)
			 * return response.getArticleResultsResponseHelper().
			 * getArticleSearchResultsList(); else return null;
			 */
			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.trim().contains(" "))

			{
				// //System.out.println("list is empty");

				urlParam = " iv_site eq '" + articleParam.getSiteNo() + "'";
				if (articleParam.getArticleNo() != null
						&& articleParam.getArticleNo().trim().length() > 0) {

					urlParam = urlParam + " and iv_gtin eq '"
							+ articleParam.getArticleNo() + "'";

					// Advance Search
					if (articleParam.getSrcOfSuppliy() != null
							&& articleParam.getSrcOfSuppliy().trim().length() > 0
							&& articleParam.getSuppNo() != null
							&& articleParam.getSuppNo().trim().length() > 0) {
						urlParam = urlParam + " and iv_sos eq '"
								+ articleParam.getSrcOfSuppliy()
								+ "' and iv_supplier eq '"
								+ articleParam.getSuppNo() + "'";
						// +
						// " and iv_records eq "+pageSize+" and iv_page_no eq "+articleParam.getPageNumber();
					}
					// Department Search
					if (articleParam.getCategoryNo() != null
							&& articleParam.getCategoryNo().trim().length() > 0)
						urlParam = urlParam + " and iv_hier_node eq '"
								+ articleParam.getCategoryNo() + "'";

					// Pagination check
					if (articleParam.isPaginationCheck()) {
						urlParam = urlParam + " and iv_records eq " + pageSize
								+ " and iv_page_no eq "
								+ articleParam.getPageNumber();
						// articleParam.setPaginationCheck(false);
					}

					if (articleParam.isRangedChk()) {
						urlParam = urlParam + " and iv_ranged eq 'X'";
						// articleParam.setRangedChk(false);
					}
					// System.out.println("re running with GTIN" + urlParam);

					response = getRestTemplate(user).getForObject(
							articleListingServiceURL,
							ArticleResultsResponse.class, urlParam);

				}

				if (response == null
						|| response.getArticleResultsResponseHelper() == null
						|| response.getArticleResultsResponseHelper()
								.getArticleSearchResultsList() == null
						|| response.getArticleResultsResponseHelper()
								.getArticleSearchResultsList().size() == 0
						|| response.getArticleResultsResponseHelper()
								.getArticleSearchResultsList().get(0).getMsg()
								.trim().contains(" "))

				{
					return null;
				} else {
					return response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList();
				}

			}
			// //System.out.println("list is not empty");
			// articleParam.setRecordCount(Integer.parseInt(response.getArticleResultsResponseHelper().getArticleSearchResultsList().get(0).getMsg().trim()));
			return response.getArticleResultsResponseHelper()
					.getArticleSearchResultsList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public ArrayList<ArticleReplenishmentData> getArticleReplenishmentData(
			ArticleSearchParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer(" iv_site eq '1008' and iv_article eq '77117' ");
		URI url;
		try {
			url = new URI(articleReplenishmentURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ArticleReplenishmentResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ArticleReplenishmentResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getArticleReplenishmentResponseHelper() != null
				&& response.getArticleReplenishmentResponseHelper()
						.getArticleReplenishmentDataList() != null
				&& response.getArticleReplenishmentResponseHelper()
						.getArticleReplenishmentDataList().size() > 0) {
			if (!response.getArticleReplenishmentResponseHelper()
					.getArticleReplenishmentDataList().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<ArticleReplenishmentData>) response
						.getArticleReplenishmentResponseHelper()
						.getArticleReplenishmentDataList();
			else {
				param.setMsg(response.getArticleReplenishmentResponseHelper()
						.getArticleReplenishmentDataList().get(0).getMsg()
						.trim());
			}
		}

		return null;
	}

	public ArrayList<ArticlePOSInfo> getArticlePOSData(ArticleSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer(" iv_site eq '1008' and iv_article eq '77117'  ");
		URI url;
		try {
			url = new URI(articlePOSDataURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ArticlePOSInfoResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ArticlePOSInfoResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getArticlePOSInfoResponseHelper() != null
				&& response.getArticlePOSInfoResponseHelper()
						.getArticlePOSInfo() != null
				&& response.getArticlePOSInfoResponseHelper()
						.getArticlePOSInfo().size() > 0) {
			if (!response.getArticlePOSInfoResponseHelper().getArticlePOSInfo()
					.get(0).getMsg().trim().contains(" "))
				return (ArrayList<ArticlePOSInfo>) response
						.getArticlePOSInfoResponseHelper().getArticlePOSInfo();
			else {
				param.setMsg(response.getArticlePOSInfoResponseHelper()
						.getArticlePOSInfo().get(0).getMsg().trim());
			}
		}

		return null;
	}

	public ArrayList<ArticlePackBrkData> getArticlePackBrkData(
			ArticleSearchParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer(" iv_site eq '1008' and iv_article eq '77117'  ");
		URI url;
		try {
			url = new URI(articlePackBrkURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ArticlePackBrkDataResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ArticlePackBrkDataResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getArticlePackBrkDataResponseHelper() != null
				&& response.getArticlePackBrkDataResponseHelper()
						.getArticlePackBrkDataList() != null
				&& response.getArticlePackBrkDataResponseHelper()
						.getArticlePackBrkDataList().size() > 0) {
			if (!response.getArticlePackBrkDataResponseHelper()
					.getArticlePackBrkDataList().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<ArticlePackBrkData>) response
						.getArticlePackBrkDataResponseHelper()
						.getArticlePackBrkDataList();
			else {
				param.setMsg(response.getArticlePackBrkDataResponseHelper()
						.getArticlePackBrkDataList().get(0).getMsg().trim());
			}
		}

		return null;
	}

	public ArrayList<LinkedArticleData> getLinkedArticle(
			ArticleSearchParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer(" iv_article eq '8341635' and iv_site eq '0156'  ");
		URI url;
		try {
			url = new URI(linkedArticleService
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		LinkedArticleSearchResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					LinkedArticleSearchResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getLinkedArticleResponseHelper() != null
				&& response.getLinkedArticleResponseHelper()
						.getLinkedArticleDataList() != null
				&& response.getLinkedArticleResponseHelper()
						.getLinkedArticleDataList().size() > 0) {
			if (!response.getLinkedArticleResponseHelper()
					.getLinkedArticleDataList().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<LinkedArticleData>) response
						.getLinkedArticleResponseHelper()
						.getLinkedArticleDataList();
			else {
				param.setMsg(response.getLinkedArticleResponseHelper()
						.getLinkedArticleDataList().get(0).getMsg().trim());
			}
		}

		return null;
	}

	public ArrayList<ArticlePackBreakdown> getPackBreakArticles(
			ArticleSearchParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer(" iv_site eq '1008' and iv_article eq '77117'  ");
		/*
		 * URI url; try { url = new URI(PackBreakdownServiceUrl +
		 * URLEncoder.encode(urlParam.toString(), "UTF-8"));
		 * 
		 * } catch (URISyntaxException e1) { LOGGER.error(e1); return null; }
		 */
		ArticlePackBreakdownResponse response = null;
		try {
			response = getRestTemplate(user).getForObject(PackBreakdownServiceUrl,
					ArticlePackBreakdownResponse.class, urlParam.toString());

		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null && response.getResponse() != null
				&& response.getResponse().getPackBreakdown() != null
				&& response.getResponse().getPackBreakdown().size() > 0) {
			if (!response.getResponse().getPackBreakdown().get(0).getMsg()
					.trim().contains(" "))
				return (ArrayList<ArticlePackBreakdown>) response.getResponse()
						.getPackBreakdown();
			else {
				param.setMsg(response.getResponse().getPackBreakdown().get(0)
						.getMsg().trim());
			}
		}

		return null;
	}

	public List<ArticleHierarchy> getArticleHierarchy(
			AllocationOrderSearchParam param,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		StringBuffer urlParam = null;

		System.out.println("articleHierarchyTabServiceURL  "
				+ articleHierarchyTabServiceURL + "iv_site eq '"
				+ param.getSiteNo() + "' and iv_article eq '" + param.getArticleNo()+"'");

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		URI url;
		try {
			url = new URI(articleHierarchyTabServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ArticleHierarchyResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ArticleHierarchyResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null && response.getResponse() != null
				&& response.getResponse().getArticleHierarchy() != null
				&& response.getResponse().getArticleHierarchy().size() > 0) {
			if (!response.getResponse().getArticleHierarchy().get(0).getMsg()
					.trim().contains(" "))
				return (List<ArticleHierarchy>) response.getResponse()
						.getArticleHierarchy();
			else {
				param.setMsg(response.getResponse().getArticleHierarchy()
						.get(0).getMsg().trim());
			}
		}

		return null;

	}

	public List<Replenishment> getReplenishmentDtl(
			AllocationOrderSearchParam param,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		StringBuffer urlParam = null;

		System.out.println("replenishmentTabServiceURL"
				+ replenishmentTabServiceURL + "iv_article eq ' "
				+ param.getArticleNo() + "' and iv_site eq '" + param.getSiteNo()+"'");

		if (param.getArticleNo() != null && param.getSiteNo() != null
				&& !param.getArticleNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}

		URI url;
		try {
			url = new URI(replenishmentTabServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ReplenishmentResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ReplenishmentResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null && response.getResponse() != null
				&& response.getResponse().getReplenishmentDtl() != null
				&& response.getResponse().getReplenishmentDtl().size() > 0) {
			if (!response.getResponse().getReplenishmentDtl().get(0).getMsg()
					.trim().contains(" "))
				return 
						  (List<Replenishment>) response .getResponse()
						 .getReplenishmentDtl()
						 ;
			else {
				param.setMsg(response.getResponse().getReplenishmentDtl()
						.get(0).getMsg().trim());
			}
		}

		return null;

	}
	
	public boolean sendNutritionInfoMail(NutritionInfoMailParam param ,UserContext user) {
		/*SimpleMailMessage mailMessage = new SimpleMailMessage(NutritionInfoMailMessage);
		mailMessage.setSubject("Nutrition Info");
		mailMessage.setText(param.getMailBody());
		mailMessage.setTo(param.getToMailId().toLowerCase());
		mailSender.send(mailMessage);*/
		
		
		try {
			MimeMessage mimeMessage = mailSender.createMimeMessage();
			MimeMessageHelper helper;
			helper = new MimeMessageHelper(mimeMessage, false, "utf-8");
			String htmlMsg = param.getMailBody();
			mimeMessage.setContent(htmlMsg, "text/html");
			helper.setTo(param.getToMailId().toLowerCase());
			Integer salesOrg = user.getSalesOrg();
			if(salesOrg == 1010)
			helper.setSubject("Product Information");	
			else
			helper.setSubject("Nutrition Info");
			helper.setFrom("productinformation@woolworths.com.au");
			mailSender.send(mimeMessage);
		} catch (MessagingException e) {
			// TODO Auto-generated catch block
			
			e.printStackTrace();
			return false;
		}
		

		return true;
	}

}
