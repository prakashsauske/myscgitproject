/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.AllocationOrderSearchDtl;
import au.com.woolworths.portal.model.AllocationOrderSearchResponse;
import au.com.woolworths.portal.model.OrderPopUpTabSearchDtl;
import au.com.woolworths.portal.model.OrderPopupTabSearchResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.param.AllocationOrderTabSearchParam;
import au.com.woolworths.portal.param.ArticleParam;

/**
 * @author xrca4
 * 
 */
public class OrderPopupTabSearchServiceImpl extends CommonServiceImpl {


	
	@Value("#{url['OrderTabSearchServiceURL']}")
	private String orderTabSearchServiceURL;
	
	private static final Logger LOGGER = Logger.getLogger(OrderPopupTabSearchServiceImpl.class.getName());
	
	private String MANDATORY = "Please enter all mandatory inputs.";

	// Order Tab Search Service
		public List<OrderPopUpTabSearchDtl> getOrderSearch(ArticleParam param,UserContext user)
				throws UnsupportedEncodingException {

			StringBuffer urlParam = null;

			if (param.getSiteNo() != null && !param.getSiteNo().equals("")) {
				urlParam = new StringBuffer(" iv_site eq '").append(
						"0156").append("'").append(" and iv_article eq '").append("3040690").append("'");
			} else {
				param.setMsg(MANDATORY);
				return null;
			}
			// urlParam=vendorServiceNewURL+URLEncoder.encode(urlParam,"UTF-8");
			URI url;
			try {
				url = new URI(orderTabSearchServiceURL
						+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
				LOGGER.info(urlParam);
				LOGGER.info(url);

			} catch (URISyntaxException e1) {
				LOGGER.error(e1);
				return null;
			}

			OrderPopupTabSearchResponse response = null;

			try {
				response = getRestTemplate(user).getForObject(url,
						OrderPopupTabSearchResponse.class);
			} catch (Exception e) {
				LOGGER.error("Stack Trace :", e);
				return null;
			}
			// LOGGER.info(response);

			if (response == null) {
				return null;
			} else if (response != null
					&& response.getOrderTabSearchResponseHelper() != null
					&& response.getOrderTabSearchResponseHelper()
							.getOrderTabSearchDtl() != null
					&& response.getOrderTabSearchResponseHelper()
							.getOrderTabSearchDtl().size() > 0) {
				if (!response.getOrderTabSearchResponseHelper()
						.getOrderTabSearchDtl().get(0).getMsg().trim()
						.contains(" "))
					return (ArrayList<OrderPopUpTabSearchDtl>) response
							.getOrderTabSearchResponseHelper()
							.getOrderTabSearchDtl();
				else {
					param.setMsg(response.getOrderTabSearchResponseHelper()
							.getOrderTabSearchDtl().get(0).getMsg().trim());
				}
			}

			return (ArrayList<OrderPopUpTabSearchDtl>) response
					.getOrderTabSearchResponseHelper()
					.getOrderTabSearchDtl();

		}
}
