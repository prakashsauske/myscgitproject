package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.client.RestClientException;

import au.com.woolworths.portal.model.NightFillBreakLoadFuture;
import au.com.woolworths.portal.model.NightFillBreakLoadFutureResponse;
import au.com.woolworths.portal.model.NightFillDropCartonFuture;
import au.com.woolworths.portal.model.NightFillDropCartonFutureResponse;
import au.com.woolworths.portal.model.NightFillFillCartonFuture;
import au.com.woolworths.portal.model.NightFillFillCartonFutureResponse;
import au.com.woolworths.portal.model.NightFillPresentationFuture;
import au.com.woolworths.portal.model.NightFillPresentationFutureResponse;
import au.com.woolworths.portal.model.NightFillReportSummaryFuture;
import au.com.woolworths.portal.model.NightFillReportSummaryFutureResponse;
import au.com.woolworths.portal.model.NightFillRubbishCartonFuture;
import au.com.woolworths.portal.model.NightFillRubbishCartonFutureResponse;
import au.com.woolworths.portal.param.NightFillBreakLoadParam;
import au.com.woolworths.portal.util.Constants;

public class NightFillLabourPlanFutureServiceImpl extends CommonServiceImpl {

	@Value("#{url['NightFillLabourPlanURLFuture']}")
	private String nightFillLabourPlanURLFuture;
	
	
	@Value("#{url['NightFillBreakLoadURLFuture']}")
	private String nightFillBreakLoadURLFuture;
	
	@Value("#{url['NightFillDropCartonURLFuture']}")
	private String nightFillDropCartonURLFuture;
	
	@Value("#{url['NightFillReportSummaryURLFuture']}")
	private String nightFillReportSummaryURLFuture;
	
	
	@Value("#{url['NightFillFillCartonURLFuture']}")
	private String nightFillFillCartonURLFuture;
	
	@Value("#{url['NightFillRubbishCartonURLFuture']}")
	private String nightFillRubbishCartonURLFuture;
	
	@Value("#{url['NightFillPresentationURLFuture']}")
	private String nightFillPresentationURLFuture;
	
	private static final Logger LOGGER = Logger.getLogger(NightFillLabourPlanFutureServiceImpl.class.getName());
	
	public List<NightFillBreakLoadFuture> getBreakLoad(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;
		
		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		List<NightFillBreakLoadFuture> breakLoadFutureList = new ArrayList<NightFillBreakLoadFuture>();
		System.out.println("URL Formed _"+nightFillBreakLoadURLFuture + urlParam);
		
		NightFillBreakLoadFutureResponse response =null;
		try {
			 response = getRestTemplateForNFLP().getForObject(
					 nightFillBreakLoadURLFuture+urlParam, NightFillBreakLoadFutureResponse.class);
			
			 breakLoadFutureList = response.getNightFillBreakLoadFutureResponseHelper().getNightFillBreakLoadFutureDetails();
		} catch (RestClientException e) {
			e.printStackTrace();
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		if (breakLoadFutureList == null ) {		
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& breakLoadFutureList != null
				&& breakLoadFutureList.size() > 0) {
			if( breakLoadFutureList.size()==1 && breakLoadFutureList.get(0).getDepartmentNumber()==null || breakLoadFutureList.get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			return breakLoadFutureList;
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;

}

	
	public List<NightFillDropCartonFuture> getDropCarton(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;

		

		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"')/Results";
				
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		List<NightFillDropCartonFuture> dropCartonListFuture = null;
		
		System.out.println("URL Formed _"+nightFillDropCartonURLFuture + urlParam);
		
		NightFillDropCartonFutureResponse response =null;
		try {
			 response = getRestTemplateForNFLP().getForObject(
					 nightFillDropCartonURLFuture+urlParam, NightFillDropCartonFutureResponse.class);
			 dropCartonListFuture = response.getNightFillDropCartonFutureResponseHelper().getNightFillDropCartonFuture();
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (dropCartonListFuture == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& dropCartonListFuture != null
				&& dropCartonListFuture.size() > 0) {
			
			if( dropCartonListFuture.size()==1 && dropCartonListFuture.get(0).getDepartmentNumber()==null ||  dropCartonListFuture.get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return dropCartonListFuture;
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	public List<NightFillFillCartonFuture> getFillCarton(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;


		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		List<NightFillFillCartonFuture> fillCartonListFuture = null;
		
		System.out.println("URL Formed _"+nightFillFillCartonURLFuture + urlParam);
		
		NightFillFillCartonFutureResponse response =null;
		try {
			 response = getRestTemplateForNFLP().getForObject(
					 nightFillFillCartonURLFuture+urlParam, NightFillFillCartonFutureResponse.class);
			 fillCartonListFuture = response.getNightFillFillCartonFutureResponseHelper().getNightFillFillCartonFutureDetails();
			 
		} catch (RestClientException e) {
			e.printStackTrace();
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (fillCartonListFuture == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& fillCartonListFuture != null
				&& fillCartonListFuture.size() > 0) {
			
			if( fillCartonListFuture.size()==1 && fillCartonListFuture.get(0).getDepartmentNumber()==null ||  fillCartonListFuture.get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return fillCartonListFuture;
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	public List<NightFillRubbishCartonFuture> getRubbishCarton(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;

		

		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		
		
		System.out.println("URL Formed _"+nightFillRubbishCartonURLFuture + urlParam);
		List<NightFillRubbishCartonFuture> rubbishCartonListFuture = new ArrayList<NightFillRubbishCartonFuture>();
		NightFillRubbishCartonFutureResponse response =null;
		try {
			 response = getRestTemplateForNFLP().getForObject(
					 nightFillRubbishCartonURLFuture+urlParam, NightFillRubbishCartonFutureResponse.class);
			 rubbishCartonListFuture =  response.getNightFillRubbishCartonFutureResponseHelper().getNightFillRubbishCartonFutureDetails();
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (rubbishCartonListFuture == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& rubbishCartonListFuture != null
				&& rubbishCartonListFuture.size() > 0) {
			
			if( rubbishCartonListFuture.size()==1 && rubbishCartonListFuture.get(0)==null ||  rubbishCartonListFuture.get(0).equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return rubbishCartonListFuture;
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	
	public List<NightFillReportSummaryFuture> getReportSummary(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

		String urlParam = null;


		LOGGER.info("Formatted From Date == " + param.getFromDate() + "__"
				+ "Formatted To Date == " + param.getFromDate()+"SITENO---"+param.getStoreNumber());
		
		if (param.getStoreNumber() != null && !param.getStoreNumber().equals("")
				&&param.getFromDate() != null && !param.getFromDate().equals("")) {
			
			urlParam = "(CAL_DAY=datetime'" +param.getFromDate()+"T"+param.getFromTime()+
					"',A0P_0PLANT_MM_01='"
					+param.getStoreNumber()+"',ZV_BULK_IND='"+param.getBulkIndicator()+"',ZV_PROM_IND='"+param.getPromotionIndicator()+"')/Results";
					
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		List<NightFillReportSummaryFuture> reportSummaryListFuture = null;
		
		System.out.println("URL Formed _"+nightFillReportSummaryURLFuture + urlParam);
		
		NightFillReportSummaryFutureResponse response =null;
		try {
			 response = getRestTemplateForNFLP().getForObject(
					 nightFillReportSummaryURLFuture+urlParam, NightFillReportSummaryFutureResponse.class);
			 
			 reportSummaryListFuture = response.getNightFillReportSummaryFutureResponseHelper().getNightFillReportSummaryFuture();
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (reportSummaryListFuture == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
				&& reportSummaryListFuture != null
				&& reportSummaryListFuture.size() > 0) {
			
			if( reportSummaryListFuture.size()==1 && reportSummaryListFuture.get(0).getDepartmentNumber()==null ||  reportSummaryListFuture.get(0).getDepartmentNumber().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return reportSummaryListFuture;
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
	
	
	public List<NightFillPresentationFuture> getPresentation(NightFillBreakLoadParam param)	throws UnsupportedEncodingException {

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
		System.out.println("URL Formed _"+nightFillPresentationURLFuture + urlParam);
		List<NightFillPresentationFuture> presentationFutureList = new ArrayList<NightFillPresentationFuture>();
		
		NightFillPresentationFutureResponse response =null;
		try {
			 response = getRestTemplateForNFLP().getForObject(
					 nightFillPresentationURLFuture+urlParam,NightFillPresentationFutureResponse.class);
			 presentationFutureList =  response.getNightFillPresentationFutureResponseHelper().getNightFillPresentationFuture();
			 
		} catch (RestClientException e) {
			LOGGER.error(e);
			param.setIserror(true);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (presentationFutureList == null) {
			
			param.setMsg(Constants.NDF);
			return null;
		} else if (response != null
			
				&& presentationFutureList != null
				&& presentationFutureList.size() > 0) {
			
			if( presentationFutureList.size()==1 && presentationFutureList.get(0).getSiteNo()==null || presentationFutureList.get(0).getSiteNo().equals("")){
				param.setMsg(Constants.NDF);
				return null;
			}else{
			param.setMsg("");
			
			return presentationFutureList;
			}
		}

		
		param.setMsg(Constants.NDF);
		return null;	
}
}
