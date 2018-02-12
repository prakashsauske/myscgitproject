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

import au.com.woolworths.portal.model.PromoArticle;
import au.com.woolworths.portal.model.PromoArticleResponce;
import au.com.woolworths.portal.model.PromotionServiceResponce;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InStorePromoDisplayReportParam;

import com.google.gson.Gson;

public class InstoreDisplayReportServiceImpl extends CommonServiceImpl {

	
	@Value("#{url['InstorePromoDisplayServiceURL']}")
	private String instorePromoDisplayServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger
			.getLogger(InstoreDisplayReportServiceImpl.class.getName());
	
	public ArrayList<PromoArticle> getInstorePromotionDtls(
			InStorePromoDisplayReportParam param,UserContext user) {

		String urlParam = null;

		LOGGER.info(urlParam);

		URI url;
		try {
			url = new URI(instorePromoDisplayServiceURL);
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

		ResponseEntity<PromotionServiceResponce> response = null;

		try {

			response = getForPostRestTemplate(user).exchange(

					instorePromoDisplayServiceURL, HttpMethod.POST, requestEntity,

			PromotionServiceResponce.class);

			if (response != null
					&& response.getBody() != null
					&& response.getBody().getPromotionServiceResponceHelper() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList() != null
					&& response.getBody().getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg() != null) {
				if (!(response.getBody().getPromotionServiceResponceHelper()
						.getPromSearchResultList().get(0).getMsg().trim()
						.length() > 0))
					return (ArrayList<PromoArticle>) response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0)
							.getPromArticleList();
				else
					param.setMsg(response.getBody()
							.getPromotionServiceResponceHelper()
							.getPromSearchResultList().get(0).getMsg());
			}

			return null;

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		// return response.getBody().getPromotionServiceResponceHelper();
	}
}
