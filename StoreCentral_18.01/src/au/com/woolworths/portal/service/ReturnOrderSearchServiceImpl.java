/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.ReturnOrderDtl;
import au.com.woolworths.portal.model.ReturnOrderDtlResponse;
import au.com.woolworths.portal.model.ReturnOrderLookup;
import au.com.woolworths.portal.model.ReturnOrderLookupResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ReturnOrderInfoParam;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class ReturnOrderSearchServiceImpl extends CommonServiceImpl {

	@Value("#{url['ReturnOrderLookupSCSURL']}")
	private String returnOrderLookupSCSURL;

	@Value("#{url['ReturnOrderDtlSCSURL']}")
	private String returnOrderDtlSCSURL;
	private static final Logger LOGGER = Logger.getLogger(ReturnOrderSearchServiceImpl.class.getName());
	
	public List<ReturnOrderLookup> getReturnOrderLookup(
			ReturnOrderInfoParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		if (!(param.getIv_site() != null && !param.getIv_site().equals("")
				&& param.getIv_from_date() != null
				&& !param.getIv_from_date().equals("")
				&& param.getIv_to_date() != null
				&& !param.getIv_to_date().equals(""))) {
			param.setMsg(Constants.MANDATOR_SCS);
			return null;
		}
		URI url;
		try {
			url = new URI(returnOrderLookupSCSURL);
			LOGGER.info(urlParam);
			LOGGER.info(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}

		ResponseEntity<ReturnOrderLookupResponse> response = null;

		try {
			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);
			response = getRestTemplate(user).exchange(url, HttpMethod.POST, requestEntity, ReturnOrderLookupResponse.class);
			
			System.out.println(CommonUtils.convertObjectTojson(response));
			
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.EXCEPTION);
			e.printStackTrace();
			return null;
		}
		
		if (response == null) {
			return null;
		} else if (response != null
				&& response.getBody().getReturnOrderLookupResponseHelper() != null
				&& response.getBody().getReturnOrderLookupResponseHelper()
						.getReturnOrderLookup() != null
				&& response.getBody().getReturnOrderLookupResponseHelper()
						.getReturnOrderLookup().size() > 0) {
			if (!response.getBody().getReturnOrderLookupResponseHelper()
					.getReturnOrderLookup().get(0).getMsg().trim()
					.contains(" ")) {
				param.setMsg(response.getBody().getReturnOrderLookupResponseHelper()
						.getReturnOrderLookup().get(0).getMsg().trim());
				return (ArrayList<ReturnOrderLookup>) response.getBody()
						.getReturnOrderLookupResponseHelper()
						.getReturnOrderLookup();
			} else {
				param.setMsg(response.getBody().getReturnOrderLookupResponseHelper()
						.getReturnOrderLookup().get(0).getMsg().trim());
			}
		}

		return null;

	}

	public List<ReturnOrderDtl> getReturnOrderDtl(ReturnOrderInfoParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		if (!(param.getIv_site() != null && !param.getIv_site().equals("")
				&& param.getIv_order_no() != null
				&& !param.getIv_order_no().equals(""))) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getIv_site())
					.append("' and iv_order_no  eq '")
					.append(param.getIv_order_no()).append("'");
			param.setMsg(Constants.MANDATOR_SCS);
			return null;
		}

		System.out.println("urlParam __" + urlParam);
		URI url;
		try {
			url = new URI(returnOrderDtlSCSURL);
			LOGGER.info(urlParam);
			LOGGER.info(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}

		ResponseEntity<ReturnOrderDtlResponse> response = null;

		try {
			HttpHeaders postrequestHeaders = new HttpHeaders();

			postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

			HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
					postrequestHeaders);
			response = getRestTemplate(user).exchange(url, HttpMethod.POST, requestEntity, ReturnOrderDtlResponse.class);
			
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.EXCEPTION);
			return null;
		}
		if (response == null) {
			return null;
		} else if (response != null
				&& response.getBody().getReturnOrderDtlResponseHelper() != null
				&& response.getBody().getReturnOrderDtlResponseHelper()
						.getReturnOrderDtl() != null
				&& response.getBody().getReturnOrderDtlResponseHelper()
						.getReturnOrderDtl().size() > 0) {
			if (!response.getBody().getReturnOrderDtlResponseHelper().getReturnOrderDtl()
					.get(0).getMsg().trim().contains(" ")) {
				param.setMsg(response.getBody().getReturnOrderDtlResponseHelper()
						.getReturnOrderDtl().get(0).getMsg().trim());
				return (ArrayList<ReturnOrderDtl>) response.getBody()
						.getReturnOrderDtlResponseHelper().getReturnOrderDtl();
			} else {
				param.setMsg(response.getBody().getReturnOrderDtlResponseHelper()
						.getReturnOrderDtl().get(0).getMsg().trim());
			}
		}

		return (ArrayList<ReturnOrderDtl>) response.getBody()
				.getReturnOrderDtlResponseHelper().getReturnOrderDtl();

	}

}
