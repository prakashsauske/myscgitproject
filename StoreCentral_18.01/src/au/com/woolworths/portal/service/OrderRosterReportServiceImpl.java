package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.OrderRosterReport;
import au.com.woolworths.portal.model.OrderRosterReportResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.OrderRosterReportParam;
import au.com.woolworths.portal.util.PortalUtil;

import com.google.gson.Gson;

public class OrderRosterReportServiceImpl extends CommonServiceImpl {

	@Value("#{url['OrderRosterReportServiceURL']}")
	private String orderRosterReportServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(OrderRosterReportServiceImpl.class.getName());
	
	public ArrayList<OrderRosterReport> getOrderRosterReport(
			OrderRosterReportParam param,UserContext user) {

		String urlParam = null;

		if (param.getSiteNo() != null && param.getSiteNo().trim().length() > 0) {

			urlParam = "storNo/" + param.getSiteNo();
		}
		if (param.getSalesOrg() != null
				&& param.getSalesOrg().trim().length() > 0) {

			urlParam += "/salesOrg/" + param.getSalesOrg();

		}

		if (param.getSourceSupply() != null
				&& param.getSourceSupply().trim().length() > 0) {

			urlParam += "/sos/" + param.getSourceSupply();

		}

		if (param.getSupplier() != null
				&& param.getSupplier().trim().length() > 0
				&& param.getSupplier().split("-")[0] != null
				&& param.getSupplier().split("-")[0] != "") {

			urlParam += "/suppNo/" + param.getSupplier().split("-")[0];

		} else {
			urlParam += "/suppNo/" + "null";
		}
		if (param.getFromDate() != null
				&& param.getFromDate().trim().length() > 0) {

			urlParam += "/fromDte/"
					+ PortalUtil.convertToDBDate(param.getFromDate());

		}
		if (param.getToDate() != null && param.getToDate().trim().length() > 0) {

			urlParam += "/toDte/"
					+ PortalUtil.convertToDBDate(param.getToDate());

		}
		if (param.getPageNo() != null && param.getPageNo().trim().length() > 0) {

			urlParam += "/pageNo/" + param.getPageNo() + "/recordCnt/"
					+ pageSize;

		} else {
			urlParam += "/pageNo/" + "1" + "/recordCnt/" + pageSize;
		}
		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";
		LOGGER.info(urlParam);

		OrderRosterReportResponse response = null;
		URI url = null;
		try {
			url = new URI(orderRosterReportServiceURL + urlParam.trim());
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					OrderRosterReportResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if ((response != null && response.getResponse() != null
				&& response.getResponse().getOrderRosterReportList() != null && !response
				.getResponse().getOrderRosterReportList().get(0).getMsg()
				.trim().equalsIgnoreCase("No Data Found"))) {
			return (ArrayList<OrderRosterReport>) response.getResponse()
					.getOrderRosterReportList();
		}

		return null;
	}

	public ArrayList<OrderRosterReport> getOrderRosterReport1(
			OrderRosterReportParam param,UserContext user) {

		String urlParam = null;

		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";
		LOGGER.info(urlParam);

		// OrderRosterReportResponse response = null;
		URI url = null;
		try {
			url = new URI(
					"http://10.23.212.174:8080/replenishmentServices/services/AQM/insertQuery");
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		/*
		 * AQMSubmitQueryDtlParam par=new AQMSubmitQueryDtlParam();
		 * par.setRefNo("15311"); AQMSubmitQueryDtlParam par1=new
		 * AQMSubmitQueryDtlParam(); par1.setRefNo("15311");
		 * ArrayList<AQMSubmitQueryDtlParam> par2=new
		 * ArrayList<AQMSubmitQueryDtlParam>(); par2.add(par); par2.add(par1);
		 */

		// AQMSubmitQueryHdrParam par3=new AQMSubmitQueryHdrParam();
		// par3.setaQMSubmitQueryDtl(par2);
		// par3.setCreatedBy("xgsaa");

		HttpHeaders postrequestHeaders = new HttpHeaders();

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		Gson gson = new Gson();
		// //System.out.println("Clien Gson"+gson.toJson(par3));

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<OrderRosterReportResponse> response = null;

		try {
			// //System.out.println("inside try");

			response = getForPostRestTemplate(user).exchange(

			url, HttpMethod.POST, requestEntity,

			OrderRosterReportResponse.class);

			if (response == null) {
				return null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return (ArrayList<OrderRosterReport>) response.getBody().getResponse()
				.getOrderRosterReportList();
	}
}
