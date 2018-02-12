package au.com.woolworths.portal.service;

import java.io.IOException;
import java.util.List;
//import java.util.logging.Logger;
import org.apache.log4j.Logger;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.ArticleResultsResponse;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.MPLorSCAdjParam;

public class MPLorSCAdjServiceImpl extends CommonServiceImpl {

	@Value("#{url['ArticleListingServiceURL']}")
	private String articleListingServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;

	
	private static final Logger LOGGER = Logger.getLogger(MPLorSCAdjServiceImpl.class.getName());

	public List<ArticleSearchResults> getArticleDetails(
			MPLorSCAdjParam MplOrScAdjParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		String urlParam = null;

		urlParam = " iv_site eq '" + MplOrScAdjParam.getSiteNo() + "'";

		if (MplOrScAdjParam.getArticleNo() != null
				&& MplOrScAdjParam.getArticleNo().trim().length() > 0) {
			if (MplOrScAdjParam.getArticleType().equalsIgnoreCase(
					"ArticleNumber")) {
				urlParam = urlParam + " and iv_article eq '"
						+ MplOrScAdjParam.getArticleNo() + "'";
			} else if (MplOrScAdjParam.getArticleType().equalsIgnoreCase("EAN")) {
				urlParam = urlParam + " and iv_gtin eq '"
						+ MplOrScAdjParam.getArticleNo() + "'";

			} else if (MplOrScAdjParam.getArticleType().equalsIgnoreCase(
					"Description")) {
				urlParam = urlParam + " and iv_desc eq '"
						+ MplOrScAdjParam.getArticleNo() + "'";
				urlParam = urlParam + "and iv_ranged eq 'X'";
			}
		}
		/*
		 * if(MplOrScAdjParam.getPageNo()!=null){ urlParam =
		 * urlParam+" and iv_records eq "
		 * +pageSize+" and iv_page_no eq "+MplOrScAdjParam.getPageNo(); }
		 */

		LOGGER.info(urlParam);

		ArticleResultsResponse response = getRestTemplate(user).getForObject(
				articleListingServiceURL, ArticleResultsResponse.class,
				urlParam);

		if (response == null
				|| response.getArticleResultsResponseHelper() == null
				|| response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList() == null
				|| response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList().size() == 0
				|| response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList().get(0).getMsg()
						.equalsIgnoreCase("No Data Found"))

		{
			return null;
		} else {
			return response.getArticleResultsResponseHelper()
					.getArticleSearchResultsList();
		}

	}
}
