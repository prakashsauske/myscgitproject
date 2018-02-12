package au.com.woolworths.portal.service;

import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.CompetitorDtlList;
import au.com.woolworths.portal.model.DisplayTypreResultsParent;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.inStorePromotionDisplayType;
import au.com.woolworths.portal.param.InStorePromoParam;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

public class InStorePromoServiceImpl extends CommonServiceImpl {

	@Value("#{url['InStorePromoDisplayTypeServiceURL']}")
	private String InStorePromoDisplayTypeServiceURL;

	@Value("#{url['InStorePromoArticleInfoServiceURL']}")
	private String InStorePromoArticleInfoServiceURL;
	
	@Value("#{url['InStorePromoArticleISDInfoServiceURL']}")
	private String InStorePromoArticleISDInfoServiceURL;

	@Value("#{url['InStorePromoCreateOrValidateURL']}")
	private String InStorePromoCreateOrValidateURL;

	@Value("#{url['InStorePromoEnquiryURL']}")
	private String InStorePromoEnquiryURL;

	@Value("#{url['InStorePromoUpdateURL']}")
	private String InStorePromoUpdateURL;

	@Value("#{url['getInstoreCompetitorListURL']}")
	private String getInstoreCompetitorListURL;

	@Value("#{url['validateInstoreURL']}")
	private String validateInstoreURL;
	
	@Value("#{url['InStorePromoGetDeliveryDateURL']}")
	private String InStorePromoGetDeliveryDateURL;
	
	private static final Logger LOGGER = Logger
			.getLogger(InStorePromoServiceImpl.class.getName());
	

	// ************** Get all Display types ***********************//
	@SuppressWarnings("unchecked")
	public ArrayList<inStorePromotionDisplayType> getDisplayTypeList(String site,UserContext user)
			throws Exception {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);

		ResponseEntity<DisplayTypreResultsParent> response = null;
		ArrayList<inStorePromotionDisplayType> responseData = new ArrayList<inStorePromotionDisplayType>();
		LOGGER.info("InStorePromoDisplayTypeServiceURL"
				+ InStorePromoDisplayTypeServiceURL);
		LOGGER.info("site" + site);
		try {
			String urlParam = "iv_site eq '" + site + "'";
			response = getForPostRestTemplate(user).exchange(
					InStorePromoDisplayTypeServiceURL, HttpMethod.GET,
					requestEntity, DisplayTypreResultsParent.class, urlParam);
			LOGGER.info(response.toString());
			responseData = response.getBody().getDisplayTypeResults()
					.getResponseData();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseData;

	}

	public InStorePromoParam getDeliveryDate(InStorePromoParam param,UserContext user) {
		LOGGER.info("Inside getDeliveryDate start");
		InStorePromoParam inStorePromoHdrInfo = null;
		// InStorePromoParam param=null;
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getInStorePromoArticleInfoList() == null
				|| param.getInStorePromoArticleInfoList().size() == 0) {
			System.out
					.println("Inside getDeliveryDate mandatory field missing");
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.MANDATORY);
			return inStorePromoHdrInfo;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);

			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user)
					.exchange(

					InStorePromoGetDeliveryDateURL, HttpMethod.POST,
							requestEntity,

							InStorePromoParam.class);
			LOGGER.info(response.getBody().toString());
			if (response != null
					&& response.getBody() != null
					&& response.getBody().getInStorePromoArticleInfoList() != null) {

				return response.getBody();

			} else {
				inStorePromoHdrInfo = new InStorePromoParam();
				inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
		}

		return inStorePromoHdrInfo;

	}
	
	public InStorePromoParam promoCreateOrValidate(InStorePromoParam param,UserContext user) {
		LOGGER.info("Inside promoCreateOrValidate start");
		InStorePromoParam inStorePromoHdrInfo = null;
		// InStorePromoParam param=null;
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getInStorePromoArticleInfoList() == null
				|| param.getInStorePromoArticleInfoList().size() == 0
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")) {
			System.out
					.println("Inside promoCreateOrValidate mandatory field missing");
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.MANDATORY);
			return inStorePromoHdrInfo;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);
			LOGGER.info("InStorePromoCreateOrValidateURL"+InStorePromoCreateOrValidateURL +"  input "+Constants.convertToJsonString(param));
			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user)
					.exchange(

					InStorePromoCreateOrValidateURL, HttpMethod.POST,
							requestEntity,

							InStorePromoParam.class);
			//LOGGER.info(response.getBody().toString());
			if (response != null
					&& response.getBody() != null
					&& response.getBody().getInStorePromoArticleInfoList() != null) {

				return response.getBody();

			} else {
				inStorePromoHdrInfo = new InStorePromoParam();
				inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
		}

		return inStorePromoHdrInfo;

	}
	
	public InStorePromoParam getPromoArticleISDList(InStorePromoParam param,UserContext user) {		
		LOGGER.info("Inside promoCreateOrValidate ISD article start");
		
		InStorePromoParam inStorePromoHdrInfo = null;
		
	//	ArrayList<InStorePromoArticleISDInfo> resObj = new ArrayList<InStorePromoArticleISDInfo>();
		
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getInStorePromoArticleInfoList() == null
				|| param.getInStorePromoArticleInfoList().size() == 0
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")) {
			
			System.out.println("Inside promoCreateOrValidate mandatory field missing");
			
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.MANDATORY);
			return inStorePromoHdrInfo;
			
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param, postrequestHeaders);

			System.out.println("before RC hit =====" );
			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user).exchange(InStorePromoArticleISDInfoServiceURL, HttpMethod.POST,requestEntity,InStorePromoParam.class);
			
			System.out.println("after RC hit =====" + response.getBody().toString());
			System.out.println(" InStorePromoArticleISDInfoServiceURL " + InStorePromoArticleISDInfoServiceURL);
			if (response != null
					&& response.getBody() != null
					&& response.getBody().getInStorePromoArticleInfoList() != null) {
				LOGGER.info("=====" + response.getBody().toString());
				return response.getBody();

			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
			return inStorePromoHdrInfo;
		}
		return inStorePromoHdrInfo;
	}

	public InStorePromoParam getPromoArticleInfo(InStorePromoParam param,UserContext user) {
		LOGGER.info("Inside promoCreateOrValidate start");
		InStorePromoParam inStorePromoHdrInfo = null;
		// InStorePromoParam param=null;
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getInStorePromoArticleInfoList() == null
				|| param.getInStorePromoArticleInfoList().size() == 0
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")) {
			System.out
					.println("Inside promoCreateOrValidate mandatory field missing");
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.MANDATORY);
			return inStorePromoHdrInfo;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);
			System.out.println("Json convert -- > "+CommonUtils.convertObjectTojson(param));
			
			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user)
					.exchange(

					InStorePromoArticleInfoServiceURL, HttpMethod.POST,
							requestEntity,

							InStorePromoParam.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getInStorePromoArticleInfoList() != null) {
				LOGGER.info("=====" + response.getBody().toString());
				return response.getBody();

			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
		}

		return inStorePromoHdrInfo;

	}

	public InStorePromoParam getActiveAndFuturePromotions(
			InStorePromoParam param,UserContext user) {
		LOGGER.info("Inside getActiveAndFuturePromotions start");
		InStorePromoParam inStorePromoHdrInfo = null;
		// InStorePromoParam param=null;
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")
				|| param.getDateFrom() == null
				|| param.getDateFrom().equals("") || param.getDateTo() == null
				|| param.getDateTo().equals("")) {
			System.out
					.println("Inside getActiveAndFuturePromotions mandatory field missing");
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.MANDATORY);
			return inStorePromoHdrInfo;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);

			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user)
					.exchange(

					InStorePromoEnquiryURL, HttpMethod.POST, requestEntity,
							InStorePromoParam.class);
			LOGGER.info("@ ngbo service "
					+ CommonUtils.convertObjectTojson(response));

			if (response != null && response.getBody() != null
					&& response.getBody().getInstorePromoSearchRes() != null) {
				if (response.getBody().getInstorePromoSearchRes().size() == 1) {
					if (response.getBody().getInstorePromoSearchRes().get(0)
							.getMsg().equalsIgnoreCase("No Data Found")) {
						inStorePromoHdrInfo = new InStorePromoParam();
						inStorePromoHdrInfo.setMsg(Constants.NO_DATA);
					} else if (response.getBody().getInstorePromoSearchRes().get(0)
							.getMsg().equalsIgnoreCase("No Article Hierarchy found")) {
						inStorePromoHdrInfo = new InStorePromoParam();
						inStorePromoHdrInfo.setMsg(response.getBody().getInstorePromoSearchRes().get(0)
								.getMsg());
					}
					else {
						return response.getBody();
					}
				} else if (response.getBody().getInstorePromoSearchRes().size() == 0) {
					inStorePromoHdrInfo = new InStorePromoParam();
					inStorePromoHdrInfo.setMsg(Constants.NO_DATA);
				} else {
					return response.getBody();
				}

			} else {

				inStorePromoHdrInfo = new InStorePromoParam();
				inStorePromoHdrInfo.setMsg(Constants.NO_DATA);
			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
		}

		return inStorePromoHdrInfo;

	}

	public String updatePromo(InStorePromoParam param,UserContext user) {
		LOGGER.info("Inside update promo start");
		String statusMsg = "";
		// InStorePromoParam param=null;
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")
				|| param.getInstorePromoSearchRes() == null) {
			LOGGER.info("Inside updatepromo mandatory field missing");
			return Constants.MANDATORY;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);

			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user)
					.exchange(InStorePromoUpdateURL, HttpMethod.POST,
							requestEntity, InStorePromoParam.class);
			// LOGGER.info("@ ngbo service "+CommonUtils.convertObjectTojson(response));

			if (response != null
					&& response.getBody() != null
					//&& response.getBody().getMsg() != null
					//&& response.getBody().getInstorePromoSearchRes().get(0) != null
					) {
//				if(response.getBody().getStatus().equalsIgnoreCase(Constants.SUCCESS_MSG)){
//					statusMsg=Constants.SUCCESS_MSG;
//				}else{
					if (response.getBody().getMsg()!= null
							&& response.getBody().getMsg().equals("")) {
						statusMsg = "";
						System.out
						.println("statusMsg = response.getBody().getInstorePromoSearchRes().get(0).getMsg()"
								+ response.getBody().getMsg());
					} else {
						statusMsg = response.getBody().getMsg();
						System.out
						.println("statusMsg = response.getBody().getInstorePromoSearchRes().get(0).getMsg()"
								+ response.getBody().getMsg());					
//					}
				}
			} else {
				statusMsg = Constants.EXCEPTION;
			}

		} catch (Exception e) {
			e.printStackTrace();
			statusMsg = Constants.EXCEPTION;
		}

		return statusMsg;

	}

	public CompetitorDtlList getCompetitorList(CompetitorDtlList param,UserContext user) {
		LOGGER.info("Inside getCompetitorList start"
				+ CommonUtils.convertObjectTojson(param));
		CompetitorDtlList inStorePromoCompetitorRes = new CompetitorDtlList();
		// InStorePromoParam param=null;
		if (param.getSite() == null || param.getSite().equals("")
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")) {
			System.out
					.println("Inside getCompetitorList mandatory field missing");
			inStorePromoCompetitorRes = new CompetitorDtlList();
			inStorePromoCompetitorRes.setMessage(Constants.MANDATORY);
			return inStorePromoCompetitorRes;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);

			ResponseEntity<CompetitorDtlList> response = getForPostRestTemplate(user)
					.exchange(getInstoreCompetitorListURL, HttpMethod.POST,
							requestEntity, CompetitorDtlList.class);

			LOGGER.info("@ ngbo service "
					+ CommonUtils.convertObjectTojson(response));

			if (response != null && response.getBody() != null
					&& response.getBody().getResult() != null) {
				return response.getBody();
			} else {

				inStorePromoCompetitorRes = new CompetitorDtlList();
				inStorePromoCompetitorRes.setMessage(Constants.NO_DATA);
			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoCompetitorRes = new CompetitorDtlList();
			inStorePromoCompetitorRes.setMessage(Constants.EXCEPTION);
		}

		return inStorePromoCompetitorRes;

	}

	public InStorePromoParam promoValidate(InStorePromoParam param,UserContext user) {
		LOGGER.info("Inside promoCreateOrValidate start");
		InStorePromoParam inStorePromoHdrInfo = null;
		// InStorePromoParam param=null;
		if (param.getServiceConfig() == null
				|| param.getServiceConfig().equals("")
				|| param.getSiteNo() == null || param.getSiteNo().equals("")
				|| param.getSalesOrg() == null
				|| param.getSalesOrg().equals("")
				|| param.getInstorePromoType() == null
				|| param.getInstorePromoType().equals("")
				|| param.getInStorePromoArticleInfoList() == null
				|| param.getInStorePromoArticleInfoList().size() == 0
				|| param.getUsername() == null
				|| param.getUsername().equals("")
				|| param.getSapPassword() == null
				|| param.getSapPassword().equals("")) {
			System.out
					.println("Inside promoCreateOrValidate mandatory field missing");
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.MANDATORY);
			return inStorePromoHdrInfo;
		}

		try {

			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);

			ResponseEntity<InStorePromoParam> response = getForPostRestTemplate(user)
					.exchange(
							validateInstoreURL, HttpMethod.POST,
							requestEntity,
							InStorePromoParam.class);
			LOGGER.info(response.getBody().toString());
			if (response != null && response.getBody() != null
					&& response.getBody().getInStorePromoArticleInfoList() != null) {

				return response.getBody();

			}
			else
			{
				inStorePromoHdrInfo = new InStorePromoParam();
				inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
			}

		} catch (Exception e) {
			e.printStackTrace();
			inStorePromoHdrInfo = new InStorePromoParam();
			inStorePromoHdrInfo.setMsg(Constants.EXCEPTION);
		}

		return inStorePromoHdrInfo;

	}
	
}
