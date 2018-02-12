package au.com.woolworths.portal.service;

import java.io.IOException;
import java.net.URI;
import java.util.List;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.ArticleDetail;
import au.com.woolworths.portal.model.ArticleDetailResponse;
import au.com.woolworths.portal.model.ArticleResultsResponse;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ArticleSearchParam;
import au.com.woolworths.portal.util.Constants;

public class SearchArticleServiceImpl extends CommonServiceImpl {

	@Value("#{url['ArticleListingServiceURL']}")
	private String articleListingServiceURL;

	@Value("#{url['ArticleSearchServiceURL']}")
	private String articleSearchServiceURL;
	
	@Value("#{url['ArticleSearchServiceAQMURL']}")
	private String articleSearchServiceAQMURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(SearchArticleServiceImpl.class.getName());
	
	public List<ArticleSearchResults> searchArticle(ArticleSearchParam param,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		String urlParam = null;

		urlParam = " iv_site eq '" + param.getSiteNo() + "'";

		if (param.getArticleNo() != null
				&& param.getArticleNo().trim().length() > 0) {
			if (param.getSearchByOptions().equalsIgnoreCase("ArticleNumber")) {
				urlParam = urlParam + " and iv_article eq '"
						+ param.getArticleNo() + "'";
			} else if (param.getSearchByOptions().equalsIgnoreCase("EAN")) {
				urlParam = urlParam + " and iv_gtin eq '"
						+ param.getArticleNo() + "'";

			} else if (param.getSearchByOptions().equalsIgnoreCase(
					"Description")) {
				urlParam = urlParam + " and iv_desc eq '"
						+ param.getArticleNo() + "'";
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

	public List<ArticleDetail> searchArticleRc(ArticleSearchParam param,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		StringBuffer urlParam = new StringBuffer();
		//System.out.println(param.getArticleDescrition() + "5445");
		// storeNo/2500/salesOrg/1005/article/121212/articleDesc/null/sos/0/suppNo/null/ranged/Y/node/null/nodeLvl/null/pageNo/1/recCnt/10

		urlParam.append("storeNo/")
				.append((param.getSiteNo() != null && param.getSiteNo().trim()
						.length() > 0) ? param.getSiteNo().trim() : "null")

				.append("/salesOrg/")
				.append((param.getSaleOrg() != null && param.getSaleOrg()
						.trim().length() > 0) ? (param.getSaleOrg().trim()) : "null")

				.append("/article/")
				.append((param.getArticleNo() != null && param.getArticleNo()
						.trim().length() > 0) ? (param.getArticleNo().trim()) : "null")

				.append("/ean/")
				.append((param.getEan() != null && param.getEan() != "") ? (param
						.getEan().trim()) : "null")

				.append("/articleDesc/")
				.append((param.getArticleDescrition() != null && param
						.getArticleDescrition().trim().length() > 0) ? (param
						.getArticleDescrition().trim()) : "null")

				.append("/sos/")
				.append((param.getSos() != null && param.getSos() != "") ? (param
						.getSos().trim()) : "0")

				.append("/suppNo/")
				.append((param.getSuppNo() != null && param.getSuppNo().trim()
						.length() > 0) ? (param.getSuppNo().trim()) : "null")

				.append("/ranged/")
				.append("Y")

				/*
				 * .append("/ranged/") .append((param.getRangedFlag()!=null &&
				 * param.getRangedFlag()!="") ?"Y" :"null")
				 */
				.append("/node/")
				.append((param.getNode() != null && param.getNode().trim()
						.length() > 0) ? (param.getNode()) : "null")

				.append("/nodeLvl/")
				.append((param.getNodeLvl() != null && param.getNodeLvl()
						.trim().length() > 0) ? (param.getNodeLvl()) : "null")

				.append("/pageNo/")
				.append((param.getPageNo() != null && param.getPageNo().trim()
						.length() > 0) ? (param.getPageNo()) : "1")

				.append("/recCnt/")
				.append((param.getRecCnt() != null && param.getRecCnt().trim()
						.length() > 0) ? (param.getRecCnt()) : pageSize)
				
						.append("/autoStockRFlag/")
				.append((param.getAutoStockRFlag() != null && param.getAutoStockRFlag().trim()
						.length() > 0) ? (param.getAutoStockRFlag()) : Constants.FALSE);
		
		

		// .append("/recCnt/" + "null");

		/*
		 * } else { urlParam += "/pageNo/" + "1" + "/recordCnt/" + pageSize; }
		 */
		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";

		// comment start it
		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer("storeNo/1030/salesOrg/1020/articleNo/null/queryId/1002/queryStatus/null/submitBy/null/submitDate/null/recCount/1/pageNo/1");
		// comment end it

		LOGGER.info(articleSearchServiceURL + urlParam);

		ArticleDetailResponse response = null;
		URI url = null;
		/*try {
			url = new URI(articleSearchServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}*/

		try {
			response = getRestTemplateForReplenishment(user).getForObject(articleSearchServiceURL + urlParam, ArticleDetailResponse.class, "");
					//getForObject(url,
					//ArticleDetailResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null
				|| response.getArticleDetailResponseHelper() == null
				|| response.getArticleDetailResponseHelper()
						.getArticleDetailList() == null
				|| response.getArticleDetailResponseHelper()
						.getArticleDetailList().size() == 0
				|| response.getArticleDetailResponseHelper()
						.getArticleDetailList().get(0).getMsg() != null
				&& response.getArticleDetailResponseHelper()
						.getArticleDetailList().get(0).getMsg() != "")

		// .equalsIgnoreCase("No Data Found"))

		{
			if (response.getArticleDetailResponseHelper()
					.getArticleDetailList().get(0).getMsg() != null
					&& response.getArticleDetailResponseHelper()
							.getArticleDetailList().get(0).getMsg().trim()
							.length() > 0)
				param.setMsg(response.getArticleDetailResponseHelper()
						.getArticleDetailList().get(0).getMsg());

			return null;
		} else {
			return response.getArticleDetailResponseHelper()
					.getArticleDetailList();
		}

	}
	public List<ArticleDetail> searchArticleRcAQM(ArticleSearchParam param,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		StringBuffer urlParam = new StringBuffer();
		//System.out.println(param.getArticleDescrition() + "5445");
		// storeNo/2500/salesOrg/1005/article/121212/articleDesc/null/sos/0/suppNo/null/ranged/Y/node/null/nodeLvl/null/pageNo/1/recCnt/10

		urlParam.append("/storeNo/")
				.append((param.getSiteNo() != null && param.getSiteNo().trim()
						.length() > 0) ? param.getSiteNo().trim() : "null")

				.append("/salesOrg/")
				.append((param.getSaleOrg() != null && param.getSaleOrg()
						.trim().length() > 0) ? (param.getSaleOrg().trim()) : "null")

				.append("/article/")
				.append((param.getArticleNo() != null && param.getArticleNo()
						.trim().length() > 0) ? (param.getArticleNo().trim()) : "null")

				.append("/ean/")
				.append((param.getEan() != null && param.getEan() != "") ? (param
						.getEan().trim()) : "null")

				.append("/articleDesc/")
				.append((param.getArticleDescrition() != null && param
						.getArticleDescrition().trim().length() > 0) ? (param
						.getArticleDescrition().trim()) : "null")

				.append("/sos/")
				.append((param.getSos() != null && param.getSos() != "") ? (param
						.getSos().trim()) : "0")

				.append("/suppNo/")
				.append((param.getSuppNo() != null && param.getSuppNo().trim()
						.length() > 0) ? (param.getSuppNo().trim()) : "null")

				.append("/ranged/")
				.append("Y")

				/*
				 * .append("/ranged/") .append((param.getRangedFlag()!=null &&
				 * param.getRangedFlag()!="") ?"Y" :"null")
				 */
				.append("/node/")
				.append((param.getNode() != null && param.getNode().trim()
						.length() > 0) ? (param.getNode()) : "null")

				.append("/nodeLvl/")
				.append((param.getNodeLvl() != null && param.getNodeLvl()
						.trim().length() > 0) ? (param.getNodeLvl()) : "null")

				.append("/pageNo/")
				.append((param.getPageNo() != null && param.getPageNo().trim()
						.length() > 0) ? (param.getPageNo()) : "1")

				.append("/recCnt/")
				.append((param.getRecCnt() != null && param.getRecCnt().trim()
						.length() > 0) ? (param.getRecCnt()) : pageSize)
				
						.append("/autoStockRFlag/")
				.append((param.getAutoStockRFlag() != null && param.getAutoStockRFlag().trim()
						.length() > 0) ? (param.getAutoStockRFlag()) : Constants.FALSE);
		
		

		// .append("/recCnt/" + "null");

		/*
		 * } else { urlParam += "/pageNo/" + "1" + "/recordCnt/" + pageSize; }
		 */
		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";

		// comment start it
		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer("storeNo/1030/salesOrg/1020/articleNo/null/queryId/1002/queryStatus/null/submitBy/null/submitDate/null/recCount/1/pageNo/1");
		// comment end it

		LOGGER.info(articleSearchServiceAQMURL + urlParam);

		ArticleDetailResponse response = null;
		URI url = null;
		/*try {
			url = new URI(articleSearchServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}*/

		try {
			response = getRestTemplateForReplenishment(user).getForObject(articleSearchServiceAQMURL + urlParam, ArticleDetailResponse.class, "");
					//getForObject(url,
					//ArticleDetailResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null
				|| response.getArticleDetailResponseHelper() == null
				|| response.getArticleDetailResponseHelper()
						.getArticleDetailList() == null
				|| response.getArticleDetailResponseHelper()
						.getArticleDetailList().size() == 0
				|| response.getArticleDetailResponseHelper()
						.getArticleDetailList().get(0).getMsg() != null
				&& response.getArticleDetailResponseHelper()
						.getArticleDetailList().get(0).getMsg() != "")

		// .equalsIgnoreCase("No Data Found"))

		{
			if (response.getArticleDetailResponseHelper()
					.getArticleDetailList().get(0).getMsg() != null
					&& response.getArticleDetailResponseHelper()
							.getArticleDetailList().get(0).getMsg().trim()
							.length() > 0)
				param.setMsg(response.getArticleDetailResponseHelper()
						.getArticleDetailList().get(0).getMsg());

			return null;
		} else {
			return response.getArticleDetailResponseHelper()
					.getArticleDetailList();
		}

	}
}
