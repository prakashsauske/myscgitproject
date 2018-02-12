/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.IOException;
import java.net.URI;
import java.net.URLEncoder;
import java.security.MessageDigest;
import java.security.NoSuchAlgorithmException;
import java.sql.SQLException;
import java.text.DateFormat;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Date;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.http.auth.AuthScope;
import org.apache.http.client.HttpClient;
import org.apache.http.impl.client.BasicCredentialsProvider;
import org.apache.http.impl.client.DefaultHttpClient;
import org.apache.http.impl.conn.PoolingClientConnectionManager;
import org.apache.http.params.BasicHttpParams;
import org.apache.http.params.CoreConnectionPNames;
import org.apache.http.params.HttpParams;
import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.http.client.ClientHttpRequestFactory;
import org.springframework.http.client.HttpComponentsClientHttpRequestFactory;
import org.springframework.http.converter.FormHttpMessageConverter;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.StringHttpMessageConverter;
import org.springframework.http.converter.feed.AtomFeedHttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;
import org.springframework.http.converter.xml.XmlAwareFormHttpMessageConverter;
import org.springframework.web.client.HttpStatusCodeException;
import org.springframework.web.client.ResourceAccessException;
import org.springframework.web.client.RestClientException;
import org.springframework.web.client.RestTemplate;

import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.Department;
import au.com.woolworths.portal.model.DepartmentResponse;
import au.com.woolworths.portal.model.OrderDetail;
import au.com.woolworths.portal.model.SalesHistory;
import au.com.woolworths.portal.model.SalesHistoryResponse;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoreResponse;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.SupplierModelResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.Vendor;
import au.com.woolworths.portal.model.VendorResponse;
import au.com.woolworths.portal.model.WareHouse;
import au.com.woolworths.portal.model.WareHouseResponse;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

/**
 * @author xrca4
 * 
 */
public class CommonServiceImpl {

	private BasicCredentialsProvider credentialProvider;

	private BasicCredentialsProvider credentialProviderForNFLP;

	private BasicCredentialsProvider credentialProviderForTOPR;

	private BasicCredentialsProvider credentialProviderForNFLPOld;

	@Autowired
	protected RestTemplate forPostRestTemplate;

	@Autowired
	protected RestTemplate restTemplateForReplenishment;

	@Autowired
	protected RestTemplate restTemplate;

	@Autowired
	protected RestTemplate restTemplateNFLP;
	@Autowired
	protected RestTemplate restTemplateTOPR;
	@Autowired
	protected RestTemplate restTemplateNFLPOld;

	@Autowired
	protected RestTemplate restTemplatePostForReplenishment;

	private DefaultHttpClient httpClient;

	private DefaultHttpClient httpClientForReplenishment;

	private DefaultHttpClient httpClientFor1POS;
	private DefaultHttpClient httpClientForNFLP;

	private DefaultHttpClient httpClientForTOPR;

	private DefaultHttpClient httpClientForNFLPOld;

	private HttpComponentsClientHttpRequestFactory factory;

	private HttpComponentsClientHttpRequestFactory factoryForReplenishment;

	private HttpComponentsClientHttpRequestFactory factoryFor1POS;
	private HttpComponentsClientHttpRequestFactory factoryForNFLP;

	private HttpComponentsClientHttpRequestFactory factoryForTOPR;

	private HttpComponentsClientHttpRequestFactory factoryForNFLPOld;

	@Value("#{url['WareHouseServiceURL']}")
	private String wareHouseServiceURL;

	@Value("#{url['vendorServiceURL']}")
	private String vendorServiceURL;

	@Value("#{url['StoreServiceURL']}")
	private String storeServiceURL;

	@Value("#{url['SocketTimeout']}")
	private Integer socketTimeout;
	@Value("#{url['ConnectionTimeout']}")
	private Integer connectionTimeout;

	@Value("#{url['MaxNoOfConnecitons']}")
	private Integer maxNoOfConnecitons;

	@Value("#{url['LoginServiceURL']}")
	private String LoginServiceURL;

	@Value("#{url['SalesHistoryURL']}")
	private String salesHistoryURL;

	@Value("${POSUserName}")
	private String posUserName;

	@Value("${POSPassword}")
	private String posPassword;

	@Value("#{url['TOPR_username']}")
	private String topr_username;

	@Value("#{url['TOPR_password']}")
	private String topr_password;

	@Value("#{url['NFLPUserName']}")
	private String nflpUserName;

	@Value("#{url['NFLPPassword']}")
	private String nflpPassword;

	@Value("#{url['NFLPUserNameOld']}")
	private String nflpUserNameOld;

	@Value("#{url['NFLPPasswordOld']}")
	private String nflpPasswordOld;

	/**
	 * @return the credentialProviderForNFLP
	 */
	public BasicCredentialsProvider getCredentialProviderForNFLP() {
		return credentialProviderForNFLP;
	}

	/**
	 * @param credentialProviderForNFLP
	 *            the credentialProviderForNFLP to set
	 */
	public void setCredentialProviderForNFLP(
			BasicCredentialsProvider credentialProviderForNFLP) {
		this.credentialProviderForNFLP = credentialProviderForNFLP;
	}

	public BasicCredentialsProvider getCredentialProviderForTOPR() {
		return credentialProviderForTOPR;
	}

	public BasicCredentialsProvider getCredentialsProviderForTOPR() {

		if (credentialProviderForTOPR == null) {
			credentialProviderForTOPR = new BasicCredentialsProvider();
		}
		// LOGGER.info("NFLP New username ____ posPassword"+ nflpUserName
		// +"____"+nflpPassword);
		credentialProviderForTOPR.setCredentials(new AuthScope(null,
				AuthScope.ANY_PORT),
				new org.apache.http.auth.UsernamePasswordCredentials(
						topr_username, topr_password));

		return credentialProviderForTOPR;

	}

	public void setCredentialProviderForTOPR(
			BasicCredentialsProvider credentialProviderForTOPR) {
		this.credentialProviderForTOPR = credentialProviderForTOPR;
	}

	public static Integer PETROL_SALES_ORG = 1020;

	public static Integer SM_SALES_ORG = 1005;

	public static Integer BWS_SALES_ORG = 1010;

	public static Integer DM_SALES_ORG = 1015;

	public static Integer CNTDWN_SALES_ORG = 2010;

	public static Integer BIGW_SALES_ORG = 1060;

	public static Integer THMSDUX_SALES_ORG = 1025;

	public static Integer UNKNOWN_SALES_ORG = 1025;

	private static int dept[];
	private static int rank[];
	// private static int salesOrg[] = { 1010, 1020, 2012, 1015, 1030, 1025,
	// 1005 };

	private static int deptFor1010[] = { 20 };
	private static int rankFor1010[] = { 1 };

	private static int deptFor2010[] = { 05, 10, 25, 30, 40, 45, 55 };
	private static int rankFor2010[] = { 4, 1, 3, 2, 1, 1, 1 };

	private static int deptFor1015[] = { 20 };
	private static int rankFor1015[] = { 1 };

	private static int deptFor1020[] = { 70 };
	private static int rankFor1020[] = { 1 };

	private static int deptFor1030[] = { 5, 10, 54, 25, 30, 40, 45, 55 };
	private static int rankFor1030[] = { 4, 1, 2, 3, 2, 1, 1, 1 };

	private static int deptFor1025[] = { 5, 10, 25, 30, 40, 45, 55 };
	private static int rankFor1025[] = { 4, 1, 3, 2, 1, 1, 1 };

	private static int deptFor1005[] = { 5, 10, 54, 25, 30, 40, 45, 55 };
	private static int rankFor1005[] = { 4, 1, 2, 3, 2, 1, 1, 1 };

	@Value("#{url['Password']}")
	private String password;
	@Value("#{url['UserName']}")
	private String userName;

	public static Map<String, List<Department>> departmentListMap;

	public static Map<String, List<Department>> departmentListManualOrderBookMap;

	public static Map<String, List<SupplierModel>> supplierModelListMap;

	@Value("#{url['DepartmentServiceUrl']}")
	private String departmentServiceUrl;

	@Value("#{url['ManualOrderBookDepartmentServiceUrl']}")
	private String manualOrderBookDepartmentServiceUrl;

	@Value("#{url['SupplierSearchURL']}")
	private String supplierSearchURL;

	private static final Logger LOGGER = Logger
			.getLogger(CommonServiceImpl.class.getName());

	public List<Department> getDeptDetails(String prod_no, Integer salesOrg,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		List<Department> departmentList = null;

		try {
			if (departmentListMap == null
					|| (departmentListMap != null && !departmentListMap
							.containsKey(salesOrg.toString()))) {
				DepartmentResponse departmentResponse = getRestTemplate(user)
						.getForObject(
								departmentServiceUrl,
								DepartmentResponse.class,
								"iv_s_org eq '"
										+ salesOrg
										+ "' and iv_dc eq '10' and iv_parent_node eq '"
										+ prod_no + "'");
				LOGGER.info("Service call for Department List");
				if (departmentResponse.getDepartmentResponseHelper() != null) {

					// //LOGGER.info("departmentResponse."
					// + departmentResponse.getDepartmentResponseHelper()
					// .getDepartmentList().get(0).getNode());
					departmentList = departmentResponse
							.getDepartmentResponseHelper().getDepartmentList();
					if (departmentListMap == null) {
						departmentListMap = new LinkedHashMap<String, List<Department>>();
						departmentListMap.put(salesOrg.toString(),
								departmentList);
					} else {
						departmentListMap.put(salesOrg.toString(),
								departmentList);
					}

				} else {
					// //LOGGER.info("departmentResponse. in null"
					// + departmentResponse.getDepartmentResponseHelper()
					// .getDepartmentList().get(0).getNode());
					return null;

				}
				return departmentList;
			} else {
				return departmentListMap.get(salesOrg.toString());
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return null;
		}

	}

	public List<Department> getManualOrderBookDeptDetails(String prod_no,
			Integer salesOrg,UserContext user) throws JsonParseException, JsonMappingException,
			IOException {
		List<Department> departmentList = null;

		try {
			// NEED TO UNCOMMENT THE BELOW TWO LING FOR CASHING
			// if (departmentListManualOrderBookMap == null ||
			// (departmentListManualOrderBookMap!=null &&
			// !departmentListManualOrderBookMap.containsKey(salesOrg.toString())))
			// {
			DepartmentResponse departmentResponse = getRestTemplate(user)
					.getForObject(
							manualOrderBookDepartmentServiceUrl,
							DepartmentResponse.class,
							"iv_s_org eq '"
									+ salesOrg
									+ "' and iv_dc eq '10' and iv_parent_node eq '"
									+ prod_no + "'");
			LOGGER.info("Service call for Department List_"
					+ manualOrderBookDepartmentServiceUrl);
			
			if (departmentResponse.getDepartmentResponseHelper() != null) {

				// //LOGGER.info("departmentResponse."
				// + departmentResponse.getDepartmentResponseHelper()
				// .getDepartmentList().get(0).getNode());
				departmentList = departmentResponse
						.getDepartmentResponseHelper().getDepartmentList();
				if (departmentListManualOrderBookMap == null) {
					departmentListManualOrderBookMap = new LinkedHashMap<String, List<Department>>();
					departmentListManualOrderBookMap.put(salesOrg.toString(),
							departmentList);
				} else {
					departmentListManualOrderBookMap.put(salesOrg.toString(),
							departmentList);
				}
				LOGGER.info("departmentList__" + departmentList);

			} else {
				// //LOGGER.info("departmentResponse. in null"
				// + departmentResponse.getDepartmentResponseHelper()
				// .getDepartmentList().get(0).getNode());
				return null;

			}
			return departmentList;
			// NEED TO UNCOMMENT THE BELOW TWO LING FOR CASHING
			/*
			 * } else { return
			 * departmentListManualOrderBookMap.get(salesOrg.toString()); }
			 */
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return null;
		}

	}

	public List<SupplierModel> getSupplierLists(String siteNo,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		// //LOGGER.info("******* getStoresNearBy ******** ");

		String urlParam;
		List<SupplierModel> supplierModelList = null;

		urlParam = " iv_site eq '" + siteNo + "'";

		// LOGGER.info("url param----->" + urlParam);

		try {
			if (supplierModelListMap == null
					|| (supplierModelListMap != null && !supplierModelListMap
							.containsKey(siteNo))) {
				SupplierModelResponse response = getRestTemplate(user)
						.getForObject(supplierSearchURL,
								SupplierModelResponse.class, urlParam);
				LOGGER.info("Service call for Supplier List");
				if (response == null
						|| response.getSupplierModelResponseHelper() == null
						|| response.getSupplierModelResponseHelper()
								.getSupplierModelList() == null
						|| response.getSupplierModelResponseHelper()
								.getSupplierModelList().size() == 0
						|| response.getSupplierModelResponseHelper()
								.getSupplierModelList().get(0).getMsg()
								.equalsIgnoreCase("No Data Found"))

				{
					return null;
				} else {
					supplierModelList = response
							.getSupplierModelResponseHelper()
							.getSupplierModelList();

					if (supplierModelListMap == null) {
						supplierModelListMap = new LinkedHashMap<String, List<SupplierModel>>();
						supplierModelListMap.put(siteNo, supplierModelList);
					} else {
						supplierModelListMap.put(siteNo, supplierModelList);
					}
				}
				return supplierModelList;
			} else {
				return supplierModelListMap.get(siteNo);
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return null;
		}

	}

	public RestTemplate getRestTemplateForReplenishment(UserContext user) {
		if (null == restTemplateForReplenishment) {

			restTemplateForReplenishment = new RestTemplate(
					getClientHttpRequestFactoryForReplenishment());

			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
			messageConverters.add(new MappingJacksonHttpMessageConverter());
			restTemplateForReplenishment
					.setMessageConverters(messageConverters);
		}

		restTemplateForReplenishment
				.setRequestFactory(getClientHttpRequestFactoryForReplenishment());
		return restTemplateForReplenishment;
	}

	public void setRestTemplateForReplenishment(
			RestTemplate restTemplateForReplenishment) {
		this.restTemplateForReplenishment = restTemplateForReplenishment;
	}

	public RestTemplate getRestTemplate(UserContext user) {

		if (null == restTemplate) {

			restTemplate = new RestTemplate(getClientHttpRequestFactory(user));

			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
			messageConverters.add(new MappingJacksonHttpMessageConverter());
			restTemplate.setMessageConverters(messageConverters);
		}

		restTemplate.setRequestFactory(getClientHttpRequestFactory(user));
		return restTemplate;
	}

	public RestTemplate getRestTemplateFor1POS() {
		RestTemplate restTemplate1POS = new RestTemplate(
				getClientHttpRequestFactoryFor1POS());
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
		messageConverters.add(new MappingJacksonHttpMessageConverter());
		restTemplate1POS.setMessageConverters(messageConverters);
		return restTemplate1POS;
	}

	public <T> List<T> getServiceRepsonseFor1POS(String url,
			MandatoryReportParam param,
			ParameterizedTypeReference<ServiceResponse<T>> typeRef,
			ResponseEntity<ServiceResponse<T>> responseEntity,
			ServiceResponse<T> serviceResponse) {
		try {
			long startTime = System.currentTimeMillis();
			responseEntity = getRestTemplateFor1POS().exchange(url,
					HttpMethod.GET, null, typeRef);
			serviceResponse = responseEntity.getBody();
			long endTime = System.currentTimeMillis();
			LOGGER.info("Serive Response Time : " + (endTime - startTime)
					+ " Milli Seconds");
			try {
				if (serviceResponse.getServiceResponseHelper().getBeanDtl()
						.size() > 0) {

					return serviceResponse.getServiceResponseHelper()
							.getBeanDtl();
				}
			} catch (Exception e) {
				LOGGER.error(
						"There could be a chance of either service response blank : "
								+ e.getMessage(), e);
				param.setMsg(Constants.NDF);
				return null;
			}
		} catch (HttpStatusCodeException ex) {
			LOGGER.error("Caught HttpStatusCodeException : " + ex.getMessage(),
					ex);
			param.setMsg(Constants.TECH_ISSUE + " : " + ex.getStatusCode()
					+ " " + ex.getStatusText());
			return null;
		} catch (RestClientException ee) {
			LOGGER.error("Caught RestClientException : " + ee.getMessage(), ee);
			if (ee instanceof ResourceAccessException) {
				param.setMsg(Constants.TECH_ISSUE + " "
						+ ee.getRootCause().getMessage());
			} else {
				param.setMsg(Constants.TECH_ISSUE + " " + ee.getMessage());
			}
			return null;
		} catch (Exception ex) {
			LOGGER.error("Caught Exception : " + ex.getMessage(), ex);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		param.setMsg(Constants.NDF);
		return null;
	}

	/**
	 * Override this method in your service implementation class check for no
	 * data found check I could not make this method as abstract, as this class
	 * is in use in production so providing the default blank implementation
	 * 
	 * @param param
	 * @param response
	 */
	public void customResponseNDFValidation(MandatoryReportParam param,
			List<?> response) {
	}

	public <T> List<T> invokeServiceCall(MandatoryReportParam param,
			String serviceUrl,
			ParameterizedTypeReference<ServiceResponse<T>> typeRef) {
		ServiceResponse<T> serviceResponse = null;
		ResponseEntity<ServiceResponse<T>> responseEntity = null;
		List<T> response = getServiceRepsonseFor1POS(serviceUrl, param,
				typeRef, responseEntity, serviceResponse);
		customResponseNDFValidation(param, response);
		if (Constants.NDF.equals(param.getMsg())) {
			return null;
		}
		return response;
	}

	public RestTemplate getRestTemplateForNFLP() {
		if (restTemplateNFLP == null) {

			restTemplateNFLP = new RestTemplate(
					getClientHttpRequestFactoryForNFLP());

			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
			messageConverters.add(new MappingJacksonHttpMessageConverter());
			restTemplateNFLP.setMessageConverters(messageConverters);
			LOGGER.info("getRestTemplateNFLP inside IF");
		}

		restTemplateNFLP
				.setRequestFactory(getClientHttpRequestFactoryForNFLP());
		return restTemplateNFLP;
	}

	public RestTemplate getRestTemplateForTOPR() {
		if (restTemplateTOPR == null) {

			restTemplateTOPR = new RestTemplate(
					getClientHttpRequestFactoryForTOPR());

			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
			messageConverters.add(new MappingJacksonHttpMessageConverter());
			restTemplateTOPR.setMessageConverters(messageConverters);
			LOGGER.info("restTemplateTOPR inside IF");
		}

		restTemplateTOPR
				.setRequestFactory(getClientHttpRequestFactoryForTOPR());
		return restTemplateTOPR;
	}

	public RestTemplate getRestTemplateForNFLPOld() {
		if (restTemplateNFLPOld == null) {

			restTemplateNFLPOld = new RestTemplate(
					getClientHttpRequestFactoryForNFLPOld());

			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();
			messageConverters.add(new MappingJacksonHttpMessageConverter());
			restTemplateNFLPOld.setMessageConverters(messageConverters);
			LOGGER.info("getRestTemplateNFLP inside Old IF");
		}

		restTemplateNFLPOld
				.setRequestFactory(getClientHttpRequestFactoryForNFLPOld());
		return restTemplateNFLPOld;
	}

	public void setRestTemplate(RestTemplate restTemplate) {
		this.restTemplate = restTemplate;
	}

	public void setRestTemplateForNFLP(RestTemplate restTemplateNFLP) {
		this.restTemplateNFLP = restTemplateNFLP;
	}

	public void setRestTemplateForNFLPOld(RestTemplate restTemplateNFLPOld) {
		this.restTemplateNFLPOld = restTemplateNFLPOld;
	}

	public RestTemplate getForPostRestTemplate(UserContext user) {

		if (null == forPostRestTemplate) {
			forPostRestTemplate = new RestTemplate(
					getClientHttpRequestFactory(user));
			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();

			messageConverters.add(new FormHttpMessageConverter());

			messageConverters.add(new StringHttpMessageConverter());

			messageConverters.add(new MappingJacksonHttpMessageConverter());

			messageConverters.add(new AtomFeedHttpMessageConverter());

			messageConverters.add(new XmlAwareFormHttpMessageConverter());

			forPostRestTemplate.setMessageConverters(messageConverters);
		}

		forPostRestTemplate.setRequestFactory(getClientHttpRequestFactory(user));
		return forPostRestTemplate;
	}

	public RestTemplate getRestTemplatePostForReplenishment() {
		if (null == restTemplatePostForReplenishment) {
			restTemplatePostForReplenishment = new RestTemplate(
					getClientHttpRequestFactoryForReplenishment());
			List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();

			messageConverters.add(new FormHttpMessageConverter());

			messageConverters.add(new StringHttpMessageConverter());

			messageConverters.add(new MappingJacksonHttpMessageConverter());

			messageConverters.add(new AtomFeedHttpMessageConverter());

			messageConverters.add(new XmlAwareFormHttpMessageConverter());

			restTemplatePostForReplenishment
					.setMessageConverters(messageConverters);
		}

		restTemplatePostForReplenishment
				.setRequestFactory(getClientHttpRequestFactoryForReplenishment());
		return restTemplatePostForReplenishment;
	}

	public void setRestTemplatePostForReplenishment(
			RestTemplate restTemplatePostForReplenishment) {
		this.restTemplatePostForReplenishment = restTemplatePostForReplenishment;
	}

	public void setForPostRestTemplate(RestTemplate restTemplate) {
		this.forPostRestTemplate = restTemplate;
	}

	public ArrayList<Vendor> getVendorList(String searchFilter, String maxRows,
			String vendorNo, String siteNo,UserContext user) throws Exception {
		// //LOGGER.info("******* getVendorList ******** ");

		// //LOGGER.info("vendorNo  " + vendorNo);
		// //LOGGER.info("searchFilter  " + searchFilter);
		String urlParam;

		try {
			int suppNo = Integer.parseInt(vendorNo);
			urlParam = " iv_vendor_no eq '" + suppNo + "'";
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);

			urlParam = " iv_vendor_name eq '" + vendorNo + "'";
		}
		if (siteNo != "" && siteNo != null) {
			urlParam += "and iv_site eq '" + siteNo + "'";
		}

		// LOGGER.info("urlParam" + urlParam);
		urlParam = vendorServiceURL + URLEncoder.encode(urlParam, "UTF-8");
		// VendorResponse response =
		// getRestTemplate().getForObject(vendorServiceURL,
		// VendorResponse.class, urlParam);
		// vendorServiceURL

		URI url = new URI(urlParam);
		// url.

		// //LOGGER.info(url.toString());
		// //LOGGER.info(url.toASCIIString());
		// //LOGGER.info(url.toURL());
		try {
			VendorResponse response = getRestTemplate(user).getForObject(url,
					VendorResponse.class);
			if (response == null
					|| response.getVendorResponseHelper() == null
					|| response.getVendorResponseHelper().getVendorList() == null
					|| response.getVendorResponseHelper().getVendorList()
							.size() == 0
					|| response.getVendorResponseHelper().getVendorList()
							.get(0).getMsg().equalsIgnoreCase("No Data Found")
			/*
			 * ||
			 * response.getVendorResponseHelper().getVendorList().get(0).getMsg
			 * (). trim().length()>0
			 */) {
				return new ArrayList<Vendor>();
			}

			return (ArrayList<Vendor>) response.getVendorResponseHelper()
					.getVendorList();
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return new ArrayList<Vendor>();
		}
	}

	public ArrayList<WareHouse> getWareHouseList(String searchFilter,
			String maxRows, String siteNo,UserContext user) throws Exception {

		// //LOGGER.info("searchFilter" + searchFilter);
		// //LOGGER.info("siteNo" + siteNo);
		// //LOGGER.info("******* getWareHouseList ******** ");

		String urlParam;

		/*
		 * try { int suppNo = Integer.parseInt(siteNo); urlParam =
		 * " iv_site_no eq '" + siteNo + "'"; } catch (Exception e) {
		 * //LOGGER.info(e); urlParam = " iv_site_name eq '" + siteNo + "'"; }
		 */
		// LOGGER.info("urlParam" + urlParam);
		if (siteNo.matches("\\d+")) {
			urlParam = " iv_site_no eq '" + siteNo + "'";
		} else {
			urlParam = " iv_site_name eq '" + siteNo + "'";
		}
		try {
			WareHouseResponse response = getRestTemplate(user).getForObject(
					wareHouseServiceURL, WareHouseResponse.class, urlParam);

			if (response == null
					|| response.getWareHouseResponseHelper() == null
					|| response.getWareHouseResponseHelper().getWareHouseList() == null
					|| response.getWareHouseResponseHelper().getWareHouseList()
							.size() == 0
					|| response.getWareHouseResponseHelper().getWareHouseList()
							.get(0).getMsg().equalsIgnoreCase("No Data Found")

			) {
				return new ArrayList<WareHouse>();
			}

			return (ArrayList<WareHouse>) response.getWareHouseResponseHelper()
					.getWareHouseList();
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return new ArrayList<WareHouse>();
		}
	}

	public ArrayList<Store> getStoreDetails(String searchFilter,
			String maxRows, String siteNo,UserContext user) throws Exception {

		// //LOGGER.info("******* get Store ******** ");

		String urlParam;

		/*
		 * try {
		 * 
		 * urlParam = " iv_site_no eq '" + siteNo + "'";
		 * Integer.parseInt(siteNo); } catch (Exception e) { //LOGGER.info(e);
		 * urlParam = " iv_site_name eq '" + siteNo + "'"; }
		 */
		// LOGGER.info("urlParam" + urlParam);
		if (siteNo.matches("\\d+")) {
			urlParam = " iv_site_no eq '" + siteNo + "'";
		} else {
			urlParam = " iv_site_name eq '" + siteNo + "'";
		}
		try {
			StoreResponse response = getRestTemplate(user).getForObject(
					storeServiceURL, StoreResponse.class, urlParam);

			if (response == null
					|| response.getStoreDetailsResponseHelper() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList().size() == 0
			/*
			 * ||response.getWareHouseResponseHelper().getWareHouseList().get(0).
			 * getMsg().trim().length()>0
			 */) {
				return new ArrayList<Store>();
			}

			return (ArrayList<Store>) response.getStoreDetailsResponseHelper()
					.getstoreDetailsList();
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return new ArrayList<Store>();
		}
	}

	public static String encryptPassword(String pass) {
		MessageDigest md = null;
		byte[] bytes = null;
		StringBuilder sb = null;

		try {
			// Create MessageDigest instance for MD5
			md = MessageDigest.getInstance("MD5");
			// Add password bytes to digest
			md.update(pass.getBytes());
			// Get the hash's bytes
			bytes = md.digest();
			// This bytes[] has bytes in decimal format;
			// Convert it to hexadecimal format
			sb = new StringBuilder();
			for (int i = 0; i < bytes.length; i++) {
				sb.append(Integer.toString((bytes[i] & 0xff) + 0x100, 16)
						.substring(1));
			}
			// Get complete hashed password in hex format

		} catch (NoSuchAlgorithmException e) {
			LOGGER.error("NoSuchAlgorithmException", e);
		}
		return sb != null ? sb.toString() : null;
	}

	public HttpClient getHttpClient(UserContext user) {
		if (httpClient == null) {
			PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager();
			connectionManager.setMaxTotal(maxNoOfConnecitons);
			HttpParams params = new BasicHttpParams();

			params.setIntParameter(CoreConnectionPNames.SO_TIMEOUT,
					new Integer(connectionTimeout));
			params.setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
					new Integer(socketTimeout));
			params.setBooleanParameter(CoreConnectionPNames.TCP_NODELAY, true);

			httpClient = new org.apache.http.impl.client.DefaultHttpClient(
					connectionManager, params);

		}

		httpClient.setCredentialsProvider(getCredentialsProvider(user));

		// httpClient.setCredentialsProvider(credentialProvider);

		return httpClient;
	}

	public HttpClient getHttpClientFor1POS() {
		if (httpClientFor1POS == null) {
			PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager();
			connectionManager.setMaxTotal(maxNoOfConnecitons);
			HttpParams params = new BasicHttpParams();

			params.setIntParameter(CoreConnectionPNames.SO_TIMEOUT,
					new Integer(connectionTimeout));
			params.setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
					new Integer(socketTimeout));
			params.setBooleanParameter(CoreConnectionPNames.TCP_NODELAY, true);

			httpClientFor1POS = new org.apache.http.impl.client.DefaultHttpClient(
					connectionManager, params);

		}

		httpClientFor1POS
				.setCredentialsProvider(getCredentialsProviderFor1POS());

		// httpClient.setCredentialsProvider(credentialProvider);

		return httpClientFor1POS;
	}

	public HttpClient getHttpClientForNFLP() {
		if (httpClientForNFLP == null) {
			PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager();
			connectionManager.setMaxTotal(maxNoOfConnecitons);
			HttpParams params = new BasicHttpParams();

			params.setIntParameter(CoreConnectionPNames.SO_TIMEOUT,
					new Integer(connectionTimeout));
			params.setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
					new Integer(socketTimeout));
			params.setBooleanParameter(CoreConnectionPNames.TCP_NODELAY, true);

			httpClientForNFLP = new org.apache.http.impl.client.DefaultHttpClient(
					connectionManager, params);

		}

		httpClientForNFLP
				.setCredentialsProvider(getCredentialsProviderForNFLP());

		// httpClient.setCredentialsProvider(credentialProvider);

		return httpClientForNFLP;
	}

	public HttpClient getHttpClientForTOPR() {

		if (httpClientForTOPR == null) {
			PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager();
			connectionManager.setMaxTotal(maxNoOfConnecitons);
			HttpParams params = new BasicHttpParams();

			params.setIntParameter(CoreConnectionPNames.SO_TIMEOUT,
					new Integer(connectionTimeout));
			params.setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
					new Integer(socketTimeout));
			params.setBooleanParameter(CoreConnectionPNames.TCP_NODELAY, true);

			httpClientForTOPR = new org.apache.http.impl.client.DefaultHttpClient(
					connectionManager, params);

		}

		httpClientForTOPR
				.setCredentialsProvider(getCredentialsProviderForTOPR());

		// httpClient.setCredentialsProvider(credentialProvider);

		return httpClientForTOPR;

	}

	public HttpClient getHttpClientForNFLPOld() {
		if (httpClientForNFLPOld == null) {
			PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager();
			connectionManager.setMaxTotal(maxNoOfConnecitons);
			HttpParams params = new BasicHttpParams();

			params.setIntParameter(CoreConnectionPNames.SO_TIMEOUT,
					new Integer(connectionTimeout));
			params.setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
					new Integer(socketTimeout));
			params.setBooleanParameter(CoreConnectionPNames.TCP_NODELAY, true);

			httpClientForNFLPOld = new org.apache.http.impl.client.DefaultHttpClient(
					connectionManager, params);

		}

		httpClientForNFLPOld
				.setCredentialsProvider(getCredentialsProviderForNFLPOld());

		// httpClient.setCredentialsProvider(credentialProvider);

		return httpClientForNFLPOld;
	}

	public HttpClient getHttpClientForReplenishment() {
		if (httpClientForReplenishment == null) {
			PoolingClientConnectionManager connectionManager = new PoolingClientConnectionManager();
			connectionManager.setMaxTotal(maxNoOfConnecitons);
			HttpParams params = new BasicHttpParams();

			params.setIntParameter(CoreConnectionPNames.SO_TIMEOUT,
					new Integer(connectionTimeout));
			params.setIntParameter(CoreConnectionPNames.CONNECTION_TIMEOUT,
					new Integer(socketTimeout));
			params.setBooleanParameter(CoreConnectionPNames.TCP_NODELAY, true);

			httpClientForReplenishment = new org.apache.http.impl.client.DefaultHttpClient(
					connectionManager, params);

		}

		// httpClient.setCredentialsProvider(getCredentialsProvider());

		httpClientForReplenishment.setCredentialsProvider(credentialProvider);

		return httpClientForReplenishment;
	}

	public BasicCredentialsProvider getCredentialsProvider(UserContext user) {

		if (null == credentialProvider) {
			credentialProvider = new BasicCredentialsProvider();
		}
		// LOGGER.info("UserContext.getSalesOrgAuth()__userName__password"+UserContext.getLoggedInUser()+"_"+UserContext
		// .getLoggedInSAPPwd());

		/*
		 * credentialProvider.setCredentials( new AuthScope(null,
		 * AuthScope.ANY_PORT
		 * ),UserContext.getSalesOrgAuth().equals(PETROL_SALES_ORG.toString()) ?
		 * new org.apache.http.auth.UsernamePasswordCredentials(
		 * UserContext.getLoggedInUser(), UserContext .getLoggedInPwd()) : new
		 * org.apache.http.auth.UsernamePasswordCredentials( userName,
		 * password));
		 */

		// TODO NEED TO UNCOMMENT THE BELOW AND HAVE TO COMMENT THE ABOVE
		credentialProvider.setCredentials(
				new AuthScope(null, AuthScope.ANY_PORT),
				new org.apache.http.auth.UsernamePasswordCredentials(
						user.getLoggedInUser(), user
								.getLoggedInSAPPwd()));

		return credentialProvider;
	}

	public BasicCredentialsProvider getCredentialsProviderFor1POS() {

		BasicCredentialsProvider credentialProviderFor1POS = new BasicCredentialsProvider();
		credentialProviderFor1POS.setCredentials(new AuthScope(null,
				AuthScope.ANY_PORT),
				new org.apache.http.auth.UsernamePasswordCredentials(
						posUserName, posPassword));

		return credentialProviderFor1POS;
	}

	public BasicCredentialsProvider getCredentialsProviderForNFLP() {

		if (credentialProviderForNFLP == null) {
			credentialProviderForNFLP = new BasicCredentialsProvider();
		}
		// LOGGER.info("NFLP New username ____ posPassword"+ nflpUserName
		// +"____"+nflpPassword);
		credentialProviderForNFLP.setCredentials(new AuthScope(null,
				AuthScope.ANY_PORT),
				new org.apache.http.auth.UsernamePasswordCredentials(
						nflpUserName, nflpPassword));

		return credentialProviderForNFLP;
	}

	public BasicCredentialsProvider getCredentialsProviderForNFLPOld() {

		if (credentialProviderForNFLPOld == null) {
			credentialProviderForNFLPOld = new BasicCredentialsProvider();
		}
		// LOGGER.info("NFLPOld ____ posPassword"+ nflpUserNameOld
		// +"____"+nflpPasswordOld);
		credentialProviderForNFLPOld.setCredentials(new AuthScope(null,
				AuthScope.ANY_PORT),
				new org.apache.http.auth.UsernamePasswordCredentials(
						nflpUserNameOld, nflpPasswordOld));

		return credentialProviderForNFLPOld;
	}

	public ClientHttpRequestFactory getClientHttpRequestFactory(UserContext user) {
		if (null == factory) {
			factory = new HttpComponentsClientHttpRequestFactory(
					getHttpClient(user));
		}
		factory.setHttpClient(getHttpClient(user));

		factory.setReadTimeout(socketTimeout);

		return factory;
	}

	public ClientHttpRequestFactory getClientHttpRequestFactoryFor1POS() {
		if (null == factoryFor1POS) {
			factoryFor1POS = new HttpComponentsClientHttpRequestFactory(
					getHttpClientFor1POS());
		}
		factoryFor1POS.setHttpClient(getHttpClientFor1POS());

		factoryFor1POS.setReadTimeout(socketTimeout);

		return factoryFor1POS;
	}

	public ClientHttpRequestFactory getClientHttpRequestFactoryForNFLP() {
		if (null == factoryForNFLP) {
			factoryForNFLP = new HttpComponentsClientHttpRequestFactory(
					getHttpClientForNFLP());

		}

		factoryForNFLP.setHttpClient(getHttpClientForNFLP());

		factoryForNFLP.setReadTimeout(socketTimeout);

		return factoryForNFLP;
	}

	public ClientHttpRequestFactory getClientHttpRequestFactoryForTOPR() {
		if (null == factoryForTOPR) {
			factoryForTOPR = new HttpComponentsClientHttpRequestFactory(
					getHttpClientForTOPR());

		}

		factoryForTOPR.setHttpClient(getHttpClientForTOPR());

		factoryForTOPR.setReadTimeout(socketTimeout);

		return factoryForTOPR;
	}

	public ClientHttpRequestFactory getClientHttpRequestFactoryForNFLPOld() {
		if (null == factoryForNFLPOld) {
			factoryForNFLPOld = new HttpComponentsClientHttpRequestFactory(
					getHttpClientForNFLPOld());

		}

		factoryForNFLPOld.setHttpClient(getHttpClientForNFLPOld());

		factoryForNFLPOld.setReadTimeout(socketTimeout);

		return factoryForNFLPOld;
	}

	public ClientHttpRequestFactory getClientHttpRequestFactoryForReplenishment() {
		if (null == factoryForReplenishment) {
			factoryForReplenishment = new HttpComponentsClientHttpRequestFactory(
					getHttpClientForReplenishment());
		}
		factoryForReplenishment.setHttpClient(getHttpClientForReplenishment());

		factoryForReplenishment.setReadTimeout(socketTimeout);

		return factoryForReplenishment;
	}

	public BasicCredentialsProvider getCredentialProvider() {
		return credentialProvider;
	}

	public void setCredentialProvider(
			BasicCredentialsProvider credentialProvider) {
		this.credentialProvider = credentialProvider;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getTemperatureForTempCheck(
			ArrayList<OrderDetail> orderDetailList) {

		// for finding temperature range---start

		// //LOGGER.info("request order detail--order controller");
		double finalLowerBound = 0;
		double finalUpperBound = 0;
		double tempLowerBound = 0;
		double tempUpperBound = 0;
		boolean isTempAvailable = false;

		String Str2;

		for (int i = 0; i < orderDetailList.size(); i++) {
			String Str = new String(orderDetailList.get(i).getTemperature()
					.trim());
			// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getTemperature());
			// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getArticle());
			if (Str != null && Str.trim().length() != 0) {
				isTempAvailable = true;
				try {
					int offset = Str.indexOf('(');
					int count = Str.indexOf(')');
					Str2 = Str.substring(offset + 1, count);
					String[] range1 = Str2.split("to", 2);

					tempLowerBound = Integer.parseInt(range1[0].trim());
					tempUpperBound = Integer.parseInt(range1[1].trim());
					// //LOGGER.info("lower"+i+"  "+tempLowerBound);
					// //LOGGER.info("upper"+i+"  "+tempUpperBound);
					if (finalLowerBound > tempLowerBound) {
						// //LOGGER.info("finalLowerBound"+i+"  "+finalLowerBound);

						finalLowerBound = tempLowerBound;

					}
					if (finalUpperBound < tempUpperBound) {

						finalUpperBound = tempUpperBound;
						// //LOGGER.info("finalUpperBound"+i+"  "+finalUpperBound);
					}

				} catch (Exception e) {
					LOGGER.error(e.getMessage(), e);
					e.printStackTrace();

				}

			}
		}
		String temperature = "";
		if (isTempAvailable) {

			temperature = "(" + finalLowerBound + " to " + finalUpperBound
					+ ")";
			// LOGGER.info("calculated temperature" + temperature);
			return temperature;

		} else {
			return temperature;

		}
	}

	public String getTemperatureForTempCheckArtiDetails(
			List<ArticleSearchResults> orderDetailList) {

		// for finding temperature range---start

		// //LOGGER.info("request order detail--order controller");
		double finalLowerBound = 0;
		double finalUpperBound = 0;
		double tempLowerBound = 0;
		double tempUpperBound = 0;
		boolean isTempAvailable = false;

		String Str2;

		for (int i = 0; i < orderDetailList.size(); i++) {
			String Str = new String(orderDetailList.get(i).getTemperature()
					.trim());
			// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getTemperature());
			// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getArticleNo());
			if (Str != null && Str.trim().length() != 0) {
				isTempAvailable = true;
				try {
					int offset = Str.indexOf('(');
					int count = Str.indexOf(')');
					Str2 = Str.substring(offset + 1, count);
					String[] range1 = Str2.split("to", 2);

					tempLowerBound = Integer.parseInt(range1[0].trim());
					tempUpperBound = Integer.parseInt(range1[1].trim());
					// //LOGGER.info("lower"+i+"  "+tempLowerBound);
					// //LOGGER.info("upper"+i+"  "+tempUpperBound);
					if (finalLowerBound > tempLowerBound) {
						// //LOGGER.info("finalLowerBound"+i+"  "+finalLowerBound);

						finalLowerBound = tempLowerBound;

					}
					if (finalUpperBound < tempUpperBound) {

						finalUpperBound = tempUpperBound;
						// //LOGGER.info("finalUpperBound"+i+"  "+finalUpperBound);
					}

				} catch (Exception e) {
					LOGGER.error(e.getMessage(), e);
					e.printStackTrace();

				}

			}
		}
		String temperature = "";
		if (isTempAvailable) {

			temperature = "(" + finalLowerBound + " to " + finalUpperBound
					+ ")";
			// LOGGER.info("calculated temperature" + temperature);
			return temperature;

		} else {
			return temperature;

		}
	}

	public String getDepartmentForTempCheck(
			ArrayList<OrderDetail> orderDetailList, String salesOrg) {

		int tempRank = 4;
		try {
			int salesOrgNo = Integer.parseInt(salesOrg.trim());

			switch (salesOrgNo) {

			case 1010:
				dept = deptFor1010;
				rank = rankFor1010;
				break;
			case 1020:
				dept = deptFor1020;
				rank = rankFor1020;
				break;

			case 2010:
				dept = deptFor2010;
				rank = rankFor2010;
				break;

			case 1015:
				dept = deptFor1015;
				rank = rankFor1015;
				break;

			case 1030:
				dept = deptFor1030;
				rank = rankFor1030;
				break;

			case 1025:
				dept = deptFor1025;
				rank = rankFor1025;
				break;

			case 1005:
				dept = deptFor1005;
				rank = rankFor1005;
				break;

			}

			for (int i = 0; i < orderDetailList.size(); i++) {
				String Str = new String(orderDetailList.get(i)
						.getTradingDepNo().trim());
				// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getTradingDepNo());
				// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getArticle());
				if (Str != null && Str.trim().length() != 0) {
					int tempDept = Integer.parseInt(Str);

					for (int j = 0; j < dept.length; j++) {

						if (tempDept == dept[j]) {
							if (tempRank > rank[j]) {
								tempRank = rank[j];
							}
						}
					}

				}
			}

		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();

		}

		return String.valueOf(tempRank);

	}

	public String getDepartmentForTempCheckArtiDetails(
			List<ArticleSearchResults> orderDetailList, String salesOrg) {

		int tempRank = 4;
		try {
			int salesOrgNo = Integer.parseInt(salesOrg.trim());

			switch (salesOrgNo) {

			case 1010:
				// //LOGGER.info("salesOrgNo"+salesOrgNo);
				dept = deptFor1010;
				rank = rankFor1010;
				break;

			case 1020:
				dept = deptFor1020;
				rank = rankFor1020;
				break;
			case 2010:
				// //LOGGER.info("salesOrgNo"+salesOrgNo);
				dept = deptFor2010;
				rank = rankFor2010;
				break;

			case 1015:
				// //LOGGER.info("salesOrgNo"+salesOrgNo);
				dept = deptFor1015;
				rank = rankFor1015;
				break;

			case 1030:
				// //LOGGER.info("salesOrgNo"+salesOrgNo);
				dept = deptFor1030;
				rank = rankFor1030;
				break;

			case 1025:
				// //LOGGER.info("salesOrgNo"+salesOrgNo);
				dept = deptFor1025;
				rank = rankFor1025;
				break;

			case 1005:
				// //LOGGER.info("salesOrgNo"+salesOrgNo);
				dept = deptFor1005;
				rank = rankFor1005;
				break;

			}

			for (int i = 0; i < orderDetailList.size(); i++) {
				// //LOGGER.info("dept[1]"+dept[1]);
				String Str = new String(orderDetailList.get(i).getDept().trim());
				// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getDept());
				// //LOGGER.info("i**"+i+" "+orderDetailList.get(i).getArticleNo());
				if (Str != null && Str.trim().length() != 0) {
					int tempDept = Integer.parseInt(Str);

					for (int j = 0; j < dept.length; j++) {

						if (tempDept == dept[j]) {
							if (tempRank > rank[j]) {
								tempRank = rank[j];
							}
							// //LOGGER.info("rank"+tempRank);
						}
					}

				}
			}

		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();

		}

		return String.valueOf(tempRank);

	}

	public String isUserAuthorised(String userName, String password,UserContext user) {
		// //LOGGER.info("******* isUserAuthorised ******** ");

		String urlParam;

		urlParam = " IV_USERID eq '" + userName + "' and IV_PASSWORD eq '"
				+ password + "'";
		// LOGGER.info("urlParam" + urlParam);

		try {
			StoreResponse response = getRestTemplate(user).getForObject(
					LoginServiceURL, StoreResponse.class, urlParam);

			if (response == null
					|| response.getStoreDetailsResponseHelper() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList().size() == 0
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList().get(0).getError().trim()
							.length() == 0) {
				return null;
			}

			else {

				// LOGGER.info("Response error:"
				// + response.getStoreDetailsResponseHelper()
				// .getstoreDetailsList().get(0).getError());

				return response.getStoreDetailsResponseHelper()
						.getstoreDetailsList().get(0).getError();

			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();

			return null;
		}
	}

	/****************** SALES HISTORY SERVICE CALL ***************************/

	public ArrayList<SalesHistory> getSalesHistoryList(String articleNo,
			String siteNo,UserContext user) throws Exception {

		// LOGGER.info("siteNo" + siteNo);
		// LOGGER.info("article No" + articleNo);
		// LOGGER.info("******* getSalesHistoryList ******** ");

		DateFormat dateFormat = new SimpleDateFormat("dd/mmm/yyyy");
		Date date = new Date();
		String currentDate = dateFormat.format(date);
		Calendar cal = Calendar.getInstance();
		cal.setTime(dateFormat.parse(currentDate));
		// cal.add(Calendar.DATE, 1);
		// String convertedDate = dateFormat.format(cal.getTime());
		cal.setTime(date);
		int week = cal.get(Calendar.WEEK_OF_YEAR);
		int year = cal.get(Calendar.YEAR);

		// LOGGER.info("week=" + week + "." + year);

		String urlParam;

		SalesHistoryResponse response = null;
		try {

			// urlParam
			// ="(ZV_O_SITE='"+1003+"',ZV_MAT_IM='"+213971+"',A0P_CALWE='"+week+"."+year+"')";
			urlParam = "(ZV_O_SITE='" + siteNo + "',ZV_MAT_IM='" + articleNo
					+ "',A0P_CALWE='" + week + "." + year + "')";
			// LOGGER.info("urlParam" + urlParam);

			// LOGGER.info("salesHistoryURL=" + salesHistoryURL);

			response = getRestTemplate(user).getForObject(salesHistoryURL,
					SalesHistoryResponse.class, urlParam);

			/*
			 * if(response!=null &&
			 * response.getSalesHistoryResponseHelper()!=null &&
			 * response.getSalesHistoryResponseHelper
			 * ().getSalesHistoryList()!=null &&
			 * response.getSalesHistoryResponseHelper
			 * ().getSalesHistoryList().size()>0){ ArrayList<SalesHistory>
			 * salesHistoryList=(ArrayList<SalesHistory>)
			 * response.getSalesHistoryResponseHelper().getSalesHistoryList();
			 * Double thisWeekTotal=0.0; Double lastWeekTotal=0.0; Double
			 * lastWeekTotal1=0.0; Double lastWeekTotal2=0.0; Double
			 * weekAvgTotal2=0.0; for(SalesHistory
			 * salesHistory:salesHistoryList){
			 * 
			 * if(salesHistory.getTotaledProperties().trim().length()==0){
			 * thisWeekTotal+=((salesHistory.getSalesQtyThisWeek()!=null &&
			 * salesHistory.getSalesQtyThisWeek()!="")?
			 * Double.parseDouble(salesHistory.getSalesQtyThisWeek()):0);
			 * lastWeekTotal+=((salesHistory.getSalesQtyLastWeek()!=null &&
			 * salesHistory.getSalesQtyLastWeek()!="")?
			 * Double.parseDouble(salesHistory.getSalesQtyLastWeek()):0);
			 * lastWeekTotal1+=((salesHistory.getSalesQtyLastWeek1()!=null &&
			 * salesHistory.getSalesQtyLastWeek1()!="")?
			 * Double.parseDouble(salesHistory.getSalesQtyLastWeek1()):0);
			 * lastWeekTotal2+=((salesHistory.getSalesQtyLastWeek2()!=null &&
			 * salesHistory.getSalesQtyLastWeek2()!="")?
			 * Double.parseDouble(salesHistory.getSalesQtyLastWeek2()):0);
			 * weekAvgTotal2+=((salesHistory.getSalesQty15WeekAvg()!=null &&
			 * salesHistory.getSalesQty15WeekAvg()!="")?
			 * Double.parseDouble(salesHistory.getSalesQty15WeekAvg()):0); }
			 * 
			 * } for(SalesHistory salesHistory:salesHistoryList){
			 * salesHistory.setThisWeekTotal(thisWeekTotal);
			 * salesHistory.setLastWeekTotal(lastWeekTotal);
			 * salesHistory.setLastWeekTotal1(lastWeekTotal1);
			 * salesHistory.setLastWeekTotal2(lastWeekTotal2);
			 * salesHistory.setWeekAvgTotal2(weekAvgTotal2); }
			 * 
			 * }
			 */

			if (response == null) {
				return new ArrayList<SalesHistory>();

			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return new ArrayList<SalesHistory>();
		}
		return (ArrayList<SalesHistory>) response
				.getSalesHistoryResponseHelper().getSalesHistoryList();

	}

	public static void updateUserContext(HttpServletRequest request) {
		HttpSession session = request.getSession(false);
		UserContext user = (UserContext) session.getAttribute("user");
		List<String> tabCodeList = null;
		try {
			tabCodeList = LoginServiceImpl.isPosStore(user.getSiteNo());
		} catch (SQLException e) {
			LOGGER.error(e.getMessage(), e);
			// TODO Auto-generated catch block
			e.printStackTrace();

		}
		user.setPosStore(new Gson().toJson((tabCodeList != null && tabCodeList
				.size() > 0) ? tabCodeList : ""));
		session.setAttribute("user", user);

	}

	public List<Department> fethHierarchyDetail(String prod_no, Integer salesOrg,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		try {
			DepartmentResponse departmentResponse = getRestTemplate(user)
					.getForObject(
							manualOrderBookDepartmentServiceUrl,
							DepartmentResponse.class,
							"iv_s_org eq '"
									+ salesOrg
									+ "' and iv_dc eq '10' and iv_parent_node eq '"
									+ prod_no + "'");

			if (departmentResponse.getDepartmentResponseHelper() != null) {

				// //LOGGER.info("departmentResponse."
				// + departmentResponse.getDepartmentResponseHelper()
				// .getDepartmentList().get(0).getNode());
				return departmentResponse.getDepartmentResponseHelper()
						.getDepartmentList();

			} else {
				// //LOGGER.info("departmentResponse. in null"
				// + departmentResponse.getDepartmentResponseHelper()
				// .getDepartmentList().get(0).getNode());
				return null;

			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
			e.printStackTrace();
			return null;
		}

	}

	/*@Value("${javax.net.ssl.trustStore}")
	private String trustStore;
	@Value("${javax.net.ssl.trustStorePassword}")
	private String trustStorePassword;

	@Value("${java.naming.provider.url}")
	private String provider_url;
	@Value("${java.naming.security.principal}")
	private String security_principal;
	@Value("${java.naming.security.credentials}")
	private String security_credentials;

	@Value("${sim.ngbo.target.services}")
	private String target_services;
	@Value("${sim.storecentral.service.dn}")
	private String service_dn;

	@Value("${isim.wssessionservice.principal}")
	private String wssessionservice_principal;
	@Value("${isim.wssessionservice.credentials}")
	private String wssessionservice_credentials;

	@Value("${isim.wssessionservice.wsdlurl}")
	private String wssessionservice_wsdlurl;
	@Value("${isim.wsrequestservice.wsdlurl}")
	private String wsrequestservice_wsdlurl;
	@Value("${isim.wspersonservice.wsdlurl}")
	private String wspersonservice_wsdlurl;
	@Value("${isim.wspasswordservice.wsdlurl}")
	private String wspasswordservice_wsdlurl;
	@Value("${isim.wsaccountservice.wsdlurl}")
	private String wsaccountservice_wsdlurl;*/

	/*public void loadParams(HttpServletRequest request) {
		
		 //if(propLoad){ propLoad = false;
		 
		LOGGER.info("inside loadParams");
		Properties props = new Properties();
		InputStream is = null;
		OutputStream os = null;
		// OutputStream out =null;

		try {
			if (is == null) {
				is = CommonServiceImpl.class
						.getResourceAsStream("/prop/ldap.properties");
			}
			props.load(is);
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.info("Error " + e);
		}

		props.setProperty("javax.net.ssl.trustStore", trustStore);
		props.setProperty("javax.net.ssl.trustStorePassword",
				trustStorePassword);

		props.setProperty("java.naming.provider.url", provider_url);
		props.setProperty("java.naming.security.principal", security_principal);
		props.setProperty("java.naming.security.credentials",
				security_credentials);

		props.setProperty("sim.ngbo.target.services", target_services);
		props.setProperty("sim.storecentral.service.dn", service_dn);

		props.setProperty("isim.wssessionservice.principal",
				wssessionservice_principal);
		props.setProperty("isim.wssessionservice.credentials",
				wssessionservice_credentials);

		props.setProperty("isim.wssessionservice.wsdlurl",
				wssessionservice_wsdlurl);
		props.setProperty("isim.wsrequestservice.wsdlurl",
				wsrequestservice_wsdlurl);
		props.setProperty("isim.wspersonservice.wsdlurl",
				wspersonservice_wsdlurl);
		props.setProperty("isim.wspasswordservice.wsdlurl",
				wspasswordservice_wsdlurl);
		props.setProperty("isim.wsaccountservice.wsdlurl",
				wsaccountservice_wsdlurl);
		try {
			props.store(new FileOutputStream(request.getSession()
					.getServletContext().getRealPath("")
					+ "/WEB-INF/classes/" + "prop/ldap" + ".properties"), null);
		} catch (IOException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		} finally {
			if (is != null) {
				try {
					is.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
			if (os != null) {
				try {
					os.close();
				} catch (IOException e) {
					// TODO Auto-generated catch block
					e.printStackTrace();
				}
			}
		}
		LOGGER.info("inside loadParams end");
		// }
	}*/
}