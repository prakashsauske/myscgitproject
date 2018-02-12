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

import com.google.gson.Gson;

import au.com.woolworths.portal.model.AQMReasonCode;
import au.com.woolworths.portal.model.AQMReasonCodeResponse;
import au.com.woolworths.portal.model.ReplenishmentPostResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AQMSubmitQueryHdrParam;

public class AQMInitiateQueryServiceImpl extends CommonServiceImpl {

	@Value("#{url['SubmitArticleQueryServiceURL']}")
	private String submitArticleQueryServiceURL;

	@Value("#{url['AQMReasonCodeServiceURL']}")
	private String aQMReasonCodeServiceURL;
	private static final Logger LOGGER = Logger
			.getLogger(AQMInitiateQueryServiceImpl.class.getName());
	
	
	public ArrayList<AQMReasonCode> getAQMResonCode(UserContext user) {

		AQMReasonCodeResponse response = null;
		URI url = null;
		try {
			url = new URI(aQMReasonCodeServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					AQMReasonCodeResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		}

		return (ArrayList<AQMReasonCode>) response
				.getaQMReasonCodeResponseHelper().getaQMReasonCodeList();

	}

	public String submitQueryDetails(AQMSubmitQueryHdrParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url = null;
		try {
			url = new URI(submitArticleQueryServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		HttpHeaders postrequestHeaders = new HttpHeaders();

		Gson gson = new Gson();
		LOGGER.info(gson.toJson(param));

		postrequestHeaders.setContentType(MediaType.APPLICATION_JSON);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(param,
				postrequestHeaders);

		ResponseEntity<ReplenishmentPostResponse> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

			submitArticleQueryServiceURL, HttpMethod.POST, requestEntity,

			ReplenishmentPostResponse.class);

			if (response == null
					|| response.getBody() == null
					|| response.getBody().getReplenishmentPostResponseHelper() == null
					|| response.getBody().getReplenishmentPostResponseHelper() == null
					|| response.getBody().getReplenishmentPostResponseHelper()
							.getMsg() == null
					|| response.getBody().getReplenishmentPostResponseHelper()
							.getMsg().equalsIgnoreCase("Failed")) {
				return null;
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return "Query ID "
				+ response.getBody().getReplenishmentPostResponseHelper()
						.getQueryId() + " is submitted successfully";
		/*return response.getBody().getReplenishmentPostResponseHelper()
				.getQueryId();*/
	}
}
