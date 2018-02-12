/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.IntransitOrderDtl;
import au.com.woolworths.portal.model.IntransitOrderResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.util.Constants;

/**
 * @author xrca4
 * 
 */
public class IntransitOrderServiceImpl extends CommonServiceImpl {

	@Value("#{url['IntransitOrderSearchServiceURL']}")
	private String intransitOrderSearchServiceURL;
	private static final Logger LOGGER = Logger.getLogger(IntransitOrderServiceImpl.class.getName());
	
	public ArrayList<IntransitOrderDtl> getIntransitOrderDtls(
			AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getSiteNo() != null && !param.getSiteNo().equals("")
				&& param.getArticleNo() != null
				&& !param.getArticleNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_article eq '").append(param.getArticleNo())
					.append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
//		urlParam = new StringBuffer(" iv_site eq '")
//		.append("0156").append("'")
//		.append(" and iv_article eq '").append("3040690")
//		.append("'");
		
		
		urlParam = new StringBuffer(" iv_site eq '")
		.append(param.getSiteNo()).append("'")
		.append(" and iv_article eq '").append(param.getArticleNo())
		.append("'");
		
		URI url;
		try {
			url = new URI(intransitOrderSearchServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			LOGGER.info(urlParam);
			LOGGER.info(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		IntransitOrderResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					IntransitOrderResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getIntransitOrderResponseHelper() != null
				&& response.getIntransitOrderResponseHelper()
						.getIntransitOrderDtlList() != null
				&& response.getIntransitOrderResponseHelper()
						.getIntransitOrderDtlList().size() > 0) {
			if (!response.getIntransitOrderResponseHelper()
					.getIntransitOrderDtlList().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<IntransitOrderDtl>) response
						.getIntransitOrderResponseHelper()
						.getIntransitOrderDtlList();
			else {
				param.setMsg(response.getIntransitOrderResponseHelper()
						.getIntransitOrderDtlList().get(0).getMsg().trim());
			}
		}

		return (ArrayList<IntransitOrderDtl>) response
				.getIntransitOrderResponseHelper()
				.getIntransitOrderDtlList();

	}
}
