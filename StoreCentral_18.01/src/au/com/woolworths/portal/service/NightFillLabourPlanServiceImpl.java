package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClientException;

import au.com.woolworths.portal.model.NightFillBreakLoad;
import au.com.woolworths.portal.model.NightFillBreakLoadResponse;
import au.com.woolworths.portal.model.NightFillBulkOrder;
import au.com.woolworths.portal.model.NightFillBulkOrderResponse;
import au.com.woolworths.portal.model.NightFillDropCarton;
import au.com.woolworths.portal.model.NightFillDropCartonResponse;
import au.com.woolworths.portal.model.NightFillFillCarton;
import au.com.woolworths.portal.model.NightFillFillCartonResponse;
import au.com.woolworths.portal.model.NightFillPresentation;
import au.com.woolworths.portal.model.NightFillPresentationResponse;
import au.com.woolworths.portal.model.NightFillReportSummary;
import au.com.woolworths.portal.model.NightFillReportSummaryResponse;
import au.com.woolworths.portal.model.NightFillRubbishCarton;
import au.com.woolworths.portal.model.NightFillRubbishCartonResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.NightFillBreakLoadParam;
import au.com.woolworths.portal.param.NightFillLabourPlanParam;
import au.com.woolworths.portal.util.Constants;

public class NightFillLabourPlanServiceImpl extends CommonServiceImpl {

	@Value("#{url['NightFillLabourPlanURL']}")
	private String nightFillLabourPlanURL;
	
	
	@Value("#{url['NightFillBreakLoadURL']}")
	private String nightFillBreakLoadURL;
	
	@Value("#{url['NightFillDropCartonURL']}")
	private String nightFillDropCartonURL;
	
	@Value("#{url['NightFillReportSummaryURL']}")
	private String nightFillReportSummaryURL;
	
	
	@Value("#{url['NightFillFillCartonURL']}")
	private String nightFillFillCartonURL;
	
	@Value("#{url['NightFillRubbishCartonURL']}")
	private String nightFillRubbishCartonURL;
	
	@Value("#{url['NightFillPresentationURL']}")
	private String nightFillPresentationURL;
	
	@Value("#{url['NightFillBulkOrderURL']}")
	private String nightFillBulkOrderURL;
	
	private static final Logger LOGGER = Logger.getLogger(NightFillLabourPlanServiceImpl.class.getName());
	
	public String getKRONOSdetails(NightFillLabourPlanParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		String response = null;
		
		if (param.getStoreId() != null && !param.getStoreId().equals("")
				&& param.getFromDate() != null
				&& !param.getFromDate().equals("")) {
			urlParam = new StringBuffer("businessDate=")
					.append(param.getFromDate()).append("&storeId=")
					.append(param.getStoreId()).append("");
		} else {
			response =Constants.MANDATORY;
			return null;
		}

		System.out.println(urlParam);
		System.out.println("nightFillLabourPlanURL :::::"+nightFillLabourPlanURL );

		try {
			response = getRestTemplateForReplenishment(user).getForObject(nightFillLabourPlanURL+urlParam,
					String.class);
 			System.out.println("Get Kronos Success :: >"+param.getStoreId());
		} catch (Exception e) {
			System.out.println("Get Kronos Failure :: >"+param.getStoreId());
			LOGGER.error(e);
			response =Constants.SERVICE_ISSUE;
			return null;
		}
		// System.out.println(response);

		if (response != null && !response.equals("")) {
			return response;
		}
		response =Constants.NDF;
		return null;

	}	
	
	public List<NightFillBreakLoad> getBreakLoad(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;
		
		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"')/Results";
				System.out.println("Exiting gggggggg");	
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}	
		System.out.println("URL Formed _"+nightFillBreakLoadURL + urlParam);
		
		NightFillBreakLoadResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillBreakLoadURL+urlParam, NightFillBreakLoadResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		if (response == null) {		
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillBreakLoadResponseHelper() != null
				&& response.getNightFillBreakLoadResponseHelper().getNightFillBreakLoadDetails() != null
				&& response.getNightFillBreakLoadResponseHelper()
						.getNightFillBreakLoadDetails().size() > 0) {
			if( response.getNightFillBreakLoadResponseHelper()
					.getNightFillBreakLoadDetails().size()==1 && response.getNightFillBreakLoadResponseHelper()
							.getNightFillBreakLoadDetails().get(0).getDepartmentNumber()==null ||  response.getNightFillBreakLoadResponseHelper()
					.getNightFillBreakLoadDetails().get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			return (List<NightFillBreakLoad>) response.getNightFillBreakLoadResponseHelper()
					.getNightFillBreakLoadDetails();
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;

}

	
	public List<NightFillDropCarton> getDropCarton(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;


		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"',ZV_JOBBUY_IND='"+param.getJobBuyIndicator() +"',ZV_ADVERT_IND='"+param.getAdvertIndicator()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"')/Results";
		
		
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillDropCartonURL + urlParam);
		
		NightFillDropCartonResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillDropCartonURL+urlParam, NightFillDropCartonResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillDropCartonResponseHelper() != null
				&& response.getNightFillDropCartonResponseHelper().getNightFillDropCarton() != null
				&& response.getNightFillDropCartonResponseHelper()
						.getNightFillDropCarton().size() > 0) {
			
			if( response.getNightFillDropCartonResponseHelper()
					.getNightFillDropCarton().size()==1 && response.getNightFillDropCartonResponseHelper()
							.getNightFillDropCarton().get(0).getDepartmentNumber()==null ||  response.getNightFillDropCartonResponseHelper()
					.getNightFillDropCarton().get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return (List<NightFillDropCarton>) response.getNightFillDropCartonResponseHelper()
					.getNightFillDropCarton();
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	public List<NightFillFillCarton> getFillCarton(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;

		
		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"',ZV_JOBBUY_IND='"+param.getJobBuyIndicator() +"',ZV_ADVERT_IND='"+param.getAdvertIndicator()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillFillCartonURL + urlParam);
		
		NightFillFillCartonResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillFillCartonURL+urlParam, NightFillFillCartonResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillFillCartonResponseHelper() != null
				&& response.getNightFillFillCartonResponseHelper().getNightFillFillCartonDetails() != null
				&& response.getNightFillFillCartonResponseHelper()
						.getNightFillFillCartonDetails().size() > 0) {
			
			if( response.getNightFillFillCartonResponseHelper ()
					.getNightFillFillCartonDetails().size()==1 && response.getNightFillFillCartonResponseHelper()
							.getNightFillFillCartonDetails().get(0).getDepartmentNumber()==null ||  response.getNightFillFillCartonResponseHelper()
					.getNightFillFillCartonDetails().get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return (List<NightFillFillCarton>) response.getNightFillFillCartonResponseHelper()
					.getNightFillFillCartonDetails();
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	public List<NightFillRubbishCarton> getRubbishCarton(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;

		

		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"',ZV_JOBBUY_IND='"+param.getJobBuyIndicator() +"',ZV_ADVERT_IND='"+param.getAdvertIndicator()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillRubbishCartonURL + urlParam);
		
		NightFillRubbishCartonResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillRubbishCartonURL+urlParam, NightFillRubbishCartonResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillRubbishCartonResponseHelper() != null
				&& response.getNightFillRubbishCartonResponseHelper().getNightFillRubbishCartonDetails() != null
				&& response.getNightFillRubbishCartonResponseHelper()
						.getNightFillRubbishCartonDetails().size() > 0) {
			
			if( response.getNightFillRubbishCartonResponseHelper ()
					.getNightFillRubbishCartonDetails().size()==1 && response.getNightFillRubbishCartonResponseHelper()
							.getNightFillRubbishCartonDetails().get(0)==null ||  response.getNightFillRubbishCartonResponseHelper()
					.getNightFillRubbishCartonDetails().get(0).equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return (List<NightFillRubbishCarton>) response.getNightFillRubbishCartonResponseHelper()
					.getNightFillRubbishCartonDetails();
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	
	public List<NightFillReportSummary> getReportSummary(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;
		
		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"',ZV_JOBBUY_IND='"+param.getJobBuyIndicator()+"',ZV_ADVERT_IND='"+param.getAdvertIndicator()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillReportSummaryURL + urlParam);
		
		NightFillReportSummaryResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillReportSummaryURL+urlParam, NightFillReportSummaryResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillReportSummaryResponseHelper() != null
				&& response.getNightFillReportSummaryResponseHelper().getNightFillReportSummary() != null
				&& response.getNightFillReportSummaryResponseHelper()
						.getNightFillReportSummary().size() > 0) {
			
			if( response.getNightFillReportSummaryResponseHelper ()
					.getNightFillReportSummary().size()==1 && response.getNightFillReportSummaryResponseHelper()
							.getNightFillReportSummary().get(0).getDepartmentNumber()==null ||  response.getNightFillReportSummaryResponseHelper()
					.getNightFillReportSummary().get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return (List<NightFillReportSummary>) response.getNightFillReportSummaryResponseHelper()
					.getNightFillReportSummary();
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	
	public List<NightFillPresentation> getPresentation(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;
		

		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(A0P_0PLANT_MM_01='" +param.getStoreNumber()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillPresentationURL + urlParam);
		
		NightFillPresentationResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillPresentationURL+urlParam, NightFillPresentationResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillPresentationResponseHelper() != null
				&& response.getNightFillPresentationResponseHelper().getNightFillPresentation() != null
				&& response.getNightFillPresentationResponseHelper()
						.getNightFillPresentation().size() > 0) {
			
			if( response.getNightFillPresentationResponseHelper()
					.getNightFillPresentation().size()==1 && response.getNightFillPresentationResponseHelper()
							.getNightFillPresentation().get(0).getSiteNo()==null ||  response.getNightFillPresentationResponseHelper()
					.getNightFillPresentation().get(0).getSiteNo().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return (List<NightFillPresentation>) response.getNightFillPresentationResponseHelper()
					.getNightFillPresentation();
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}


	public List<NightFillBulkOrder> getBulkOrderList(
			NightFillBreakLoadParam param) {


		String urlParam = null;
		

		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			/*urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"+param.getStoreNumber()+"')/Results";*/
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"',ZV_JOBBUY_IND='"+param.getJobBuyIndicator()+"',ZV_ADVERT_IND='"+param.getAdvertIndicator()+"')/Results";
							
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillBulkOrderURL + urlParam);
		
		NightFillBulkOrderResponse response =null;
		try {
			 response = getRestTemplateForNFLPOld().getForObject(
					 nightFillBulkOrderURL+urlParam, NightFillBulkOrderResponse.class);
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& response.getNightFillBulkOrderResponseHelper() != null
				&& response.getNightFillBulkOrderResponseHelper().getNightFillBulkOrder() != null
				&& response.getNightFillBulkOrderResponseHelper()
						.getNightFillBulkOrder().size() > 0) {
			
			/*if( response.getNightFillBulkOrderResponseHelper()
					.getNightFillBulkOrder().size()==1 && response.getNightFillBulkOrderResponseHelper()
							.getNightFillBulkOrder().get(0).getSiteNo()==null ||  response.getNightFillBulkOrderResponseHelper()
					.getNightFillPresentation().get(0).getSiteNo().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");*/
			
			return (List<NightFillBulkOrder>) response.getNightFillBulkOrderResponseHelper()
					.getNightFillBulkOrder();
			}
		
		param.setMsg(Constants.NDF);
		return null;	

	}
}
