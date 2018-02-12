package au.com.woolworths.portal.service;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.ArticleSiteView;
import au.com.woolworths.portal.model.ArticleSiteViewResponse;
import au.com.woolworths.portal.model.NearbyStoreSearchInfo;
import au.com.woolworths.portal.model.NearbyStoreSearchResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InventoryParam;

public class InventoryServiceImpl extends CommonServiceImpl {

	@Value("#{url['NearbyStoreSearchServiceUrl']}")
	private String NearbyStoreSearchServiceUrl;
	private final static String SitesbyDistanceServiceUrl = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_STORE_SEARCH/zsp_store_searchCollection?$filter={filter}";
	private final static String SiteViewServiceUrl = "http://clsapd320.woolworths.com.au:8011/sap/opu/odata/sap/ZSP_ART_LISTING/zsp_art_listingCollection{(1)}/et_site_view_r";
	private final static String InventoryServiceSOHUrl = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_STOCKS_ON_HAND/zsp_stock_on_handCollection({1})/et_basic_level3_r";
	private final static String InventoryServiceSITUrl = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_STOCKS_ON_HAND/zsp_stock_on_handCollection({1})/et_plant_stock_r";
	private final static String InventoryServiceSOOUrl = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_STOCKS_ON_HAND/zsp_stock_on_handCollection({1})/et_commitment_r";
	private final static String PurchaseViewServiceURL = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_ART_LISTING/zsp_art_listingCollection{(1)}/et_purchase_view_r";
	private final static String REST_HOST = "http://sapiecci.woolworths.com.au:8061/";
	private final static String REST_PATH = "sap/opu/odata/sap/";

	private final static String ZSP_ART_LISTING = "ZSP_ART_LISTING/";
	private final static String ZSP_ART_LOOKUP = "ZSP_ART_LOOKUP/";
	private final static String ZSP_ART_SORGDC = "ZSP_ART_SORGDC/";

	private final static String ZSP_ART_EAN_LOOKUP = "ZSP_ART_EAN_LOOKUP/";
	private final static String ZSP_ART_EAN_LISTING = "ZSP_ART_EAN_LISTING/";
	private final static String ZSP_ART_EAN_SORG_DC = "ZSP_ART_EAN_SORG_DC/";

	private final static String ZSP_ART_DESCR_LOOKUP = "ZSP_ART_DESCR_LOOKUP/";
	private final static String ZSP_ART_DESCR_LISTING = "ZSP_ART_DESCR_LISTING/";
	private final static String ZSP_ART_DESCR_SORG_DC = "ZSP_ART_DESCR_SORG_DC/";

	private final static String ARTICLE_LOOKUP_COLLECTION = "zsp_art_lookupCollection{(1)}/";
	private final static String ARTICLE_LISTING_COLLECTION = "zsp_art_listingCollection{(1)}/";
	private final static String ARTICLE_SORG_DC_COLLECTION = "zsp_art_sorgdcCollection{(1)}/";
	private final static String GTIN_LOOKUP_COLLECTION = "zsp_art_ean_lookupCollection{(1)}/";
	private final static String GTIN_LISTING_COLLECTION = "zsp_art_ean_listingCollection{(1)}/";
	private final static String GTIN_SORG_DC_COLLECTION = "zsp_art_ean_sorg_dcCollection{(1)}/";
	private final static String ARTICLE_DESC_LOOKUP_COLLECTION = "zsp_art_descr_lookupCollection{(1)}/";
	private final static String ARTICLE_DESC_LISTING_COLLECTION = "zsp_art_descr_listingCollection{(1)}/";
	private final static String ARTICLE_DESC_SORG_DC_COLLECTION = "zsp_art_descr_sorg_dcCollection{(1)}/";

	private final static String SUFFIX_BASIC = "et_basic_view_r";
	private final static String SUFFIX_GTIN = "et_gtin_r";

	private final static String SUFFIX_SELL_PRICE = "et_sellpr_r";
	private boolean isGTIN = false;
	private boolean isSiteFilled = false;
	private boolean isSalesOrgFilled = false;
	private boolean isArticleDesc = false;

	/*
	 * private String getURL(InventoryParam inventorParam) {
	 * 
	 * isGTIN = false; isSiteFilled = false; isSalesOrgFilled = false;
	 * isArticleDesc = false; String url = REST_HOST + REST_PATH;
	 * 
	 * if (inventorParam.getArticleNo() != null &&
	 * !(inventorParam.getArticleNo().isEmpty())) {
	 * 
	 * if (inventorParam.getArticleNo().length() > 6) {// GTIN
	 * 
	 * ////System.out.println("GTIN *********** "); isGTIN = true;
	 * 
	 * if ((inventorParam.getSiteNo() != null && !(inventorParam
	 * .getSiteNo().equals(""))) && (inventorParam.getSalesOrg() == null ||
	 * (inventorParam .getSalesOrg().equals("")))) {
	 * 
	 * url = url + ZSP_ART_EAN_LISTING + GTIN_LISTING_COLLECTION; isSiteFilled =
	 * true; ////System.out.println("GTIN SITE *********** "+url);
	 * 
	 * } else if (inventorParam.getSalesOrg() != null &&
	 * !(inventorParam.getSalesOrg().equals("")) && (inventorParam.getSiteNo()
	 * == null || (inventorParam .getSiteNo().equals("")))) {
	 * 
	 * url = url + ZSP_ART_EAN_SORG_DC + GTIN_SORG_DC_COLLECTION;
	 * isSalesOrgFilled = true;
	 * ////System.out.println("GTIN SALES ORG *********** "+url);
	 * 
	 * } else { url = url + ZSP_ART_EAN_LOOKUP + GTIN_LOOKUP_COLLECTION;
	 * ////System.out.println("GTIN NO *********** "+url); } } else {// ARTICLE
	 * 
	 * ////System.out.println("ARTICLE *********** "); if
	 * ((inventorParam.getSiteNo() != null && !(inventorParam
	 * .getSiteNo().equals(""))) && (inventorParam.getSalesOrg() == null ||
	 * (inventorParam .getSalesOrg().equals("")))) {
	 * 
	 * url = url + ZSP_ART_LISTING + ARTICLE_LISTING_COLLECTION; isSiteFilled =
	 * true; ////System.out.println("ARTICLE SITE *********** "+url);
	 * 
	 * } else if (inventorParam.getSalesOrg() != null &&
	 * !(inventorParam.getSalesOrg().equals("")) && (inventorParam.getSiteNo()
	 * == null || (inventorParam .getSiteNo().equals("")))) { url = url +
	 * ZSP_ART_SORGDC + ARTICLE_SORG_DC_COLLECTION; isSalesOrgFilled = true;
	 * ////System.out.println("ARTICLE SALES ORG *********** "+url);
	 * 
	 * } else { url = url + ZSP_ART_LOOKUP + ARTICLE_LOOKUP_COLLECTION;
	 * ////System.out.println("ARTICLE NO *********** "+url); } }
	 * 
	 * } else if (inventorParam.getArticleName() != null &&
	 * !(inventorParam.getArticleName().isEmpty())) { // ARTICEL DESC // is
	 * filled ////System.out.println("ARTICLE DESC *********** "); isArticleDesc =
	 * true; if ((inventorParam.getSiteNo() != null &&
	 * !(inventorParam.getSiteNo() .equals(""))) && (inventorParam.getSalesOrg()
	 * == null || (inventorParam .getSalesOrg().equals("")))) {
	 * 
	 * url = url + ZSP_ART_DESCR_LISTING + ARTICLE_DESC_LISTING_COLLECTION;
	 * isSiteFilled = true;
	 * ////System.out.println("ARTICLE DESC- SITE*********** "+url);
	 * 
	 * } else if (inventorParam.getSalesOrg() != null &&
	 * !(inventorParam.getSalesOrg().equals("")) && (inventorParam.getSiteNo()
	 * == null || (inventorParam .getSiteNo().equals("")))) {
	 * 
	 * url = url + ZSP_ART_DESCR_SORG_DC + ARTICLE_DESC_SORG_DC_COLLECTION;
	 * isSalesOrgFilled = true;
	 * ////System.out.println("ARTICLE DESC- SALES ORG*********** "+url);
	 * 
	 * } else { url = url + ZSP_ART_DESCR_LOOKUP +
	 * ARTICLE_DESC_LOOKUP_COLLECTION;
	 * ////System.out.println("ARTICLE DESC *********** "+url); } }
	 * 
	 * return url; }
	 */

	/*
	 * private String getURLParam(InventoryParam inventoryParam) { String
	 * urlParam = null;
	 * 
	 * if (isGTIN) {
	 * 
	 * if (isSiteFilled) {// set GTIN no and SITE no iv_gtin
	 * 
	 * urlParam = "(iv_gtin='" + inventoryParam.getArticleNo() + "',iv_site='" +
	 * inventoryParam.getSiteNo() + "')";
	 * 
	 * } else if (isSalesOrgFilled) {// set GTIN no and SALES ORG and DC is //
	 * 10
	 * 
	 * urlParam = "(iv_gtin='" + inventoryParam.getArticleNo() + "',iv_s_org='"
	 * + inventoryParam.getSalesOrg() + "',iv_dc='" + "10" + "')"; } else {//
	 * set GTIN no urlParam = "(iv_gtin='" + inventoryParam.getArticleNo() +
	 * "')"; }
	 * 
	 * } else { // ARTICLE
	 * 
	 * if (isSiteFilled) {// set ARTICLE no and SITE no
	 * 
	 * urlParam = "(iv_article='" + inventoryParam.getArticleNo() +
	 * "',iv_site='" + inventoryParam.getSiteNo() + "')";
	 * 
	 * } else if (isSalesOrgFilled) {// set ARTICLE no and SALES ORG and DC //
	 * is 10
	 * 
	 * urlParam = "(iv_article='" + inventoryParam.getArticleNo() +
	 * "',iv_s_org='" + inventoryParam.getSalesOrg() + "',iv_dc='" + "10" +
	 * "')";
	 * 
	 * } else {// set ARTICLE no urlParam = "(iv_article='" +
	 * inventoryParam.getArticleNo() + "')"; } }
	 * 
	 * if (isArticleDesc) { if (isSiteFilled) {// set ARTICLE no and SITE no
	 * 
	 * urlParam = "(iv_desc='" + inventoryParam.getArticleName() + "',iv_site='"
	 * + inventoryParam.getSiteNo() + "')";
	 * 
	 * } else if (isSalesOrgFilled) {// set ARTICLE no and SALES ORG and DC //
	 * is 10
	 * 
	 * urlParam = "(iv_desc='" + inventoryParam.getArticleName() +
	 * "',iv_s_org='" + inventoryParam.getSalesOrg() + "',iv_dc='" + "10" +
	 * "')";
	 * 
	 * } else {// set ARTICLE no urlParam = "(iv_desc='" +
	 * inventoryParam.getArticleName() + "')"; } }
	 * 
	 * ////System.out.println("*** urlParam " + urlParam); return urlParam; }
	 */

	private String getURLParamNearbyStoreSearch(InventoryParam inventoryParam) {
		String urlParam = null;
		if (inventoryParam.getSiteNo() != null
				&& !(inventoryParam.getSiteNo().isEmpty())
				&& inventoryParam.getArticleNo() != null
				&& !(inventoryParam.getArticleNo().isEmpty())
				&& inventoryParam.getDistance() >= 0
				&& inventoryParam.getSalesOrg() != null
				&& !(inventoryParam.getSalesOrg().isEmpty())
				&& inventoryParam.getMaxStores() >= 0) {
			urlParam = "(iv_article eq '" + inventoryParam.getArticleNo()
					+ "' and iv_site eq '" + inventoryParam.getSiteNo()
					+ "' and iv_distance eq " + inventoryParam.getDistance()
					+ " and iv_records eq " + inventoryParam.getMaxStores()
					+ " and iv_dc eq '" + "10" + "' and iv_s_org eq '"
					+ inventoryParam.getSalesOrg() + "' and iv_ranged eq 'X')"; // added

		} else if (inventoryParam.getSiteNo() != null
				&& !(inventoryParam.getSiteNo().isEmpty())
				&& inventoryParam.getArticleNo() != null
				&& !(inventoryParam.getArticleNo().isEmpty())
				&& inventoryParam.getDistance() >= 0
				&& inventoryParam.getMaxStores() >= 0) {
			urlParam = "(iv_article eq '" + inventoryParam.getArticleNo()
					+ "' and iv_site eq '" + inventoryParam.getSiteNo()
					+ "' and iv_distance eq " + inventoryParam.getDistance()
					+ " and iv_records eq " + inventoryParam.getMaxStores()
					+ " and iv_dc eq '" + "10" + "' and iv_ranged eq 'X')"; // added
		}

		// //System.out.println("*** urlParam " + urlParam);
		return urlParam;
	}

	/*
	 * private String getURLParamSitesbyDistance(InventoryParam inventoryParam)
	 * { String urlParam = null;
	 * 
	 * 
	 * 
	 * if (inventoryParam.getSiteNo() != null &&
	 * !(inventoryParam.getSiteNo().isEmpty()) && inventoryParam.getDistance()
	 * >= 0 && inventoryParam.getSalesOrg() != null &&
	 * !(inventoryParam.getSalesOrg().isEmpty())) { urlParam = "(iv_site eq '" +
	 * inventoryParam.getSiteNo() + "' and iv_distance eq " +
	 * inventoryParam.getDistance() + " and iv_dc eq '"+ "10" +
	 * "' and iv_s_org eq '" + inventoryParam.getSalesOrg() +"')";
	 * 
	 * } else if (inventoryParam.getSiteNo() != null &&
	 * !(inventoryParam.getSiteNo().isEmpty()) && inventoryParam.getDistance()
	 * >= 0 ) {
	 * 
	 * urlParam = "(iv_site eq '" + inventoryParam.getSiteNo() +
	 * "' and iv_distance eq " + inventoryParam.getDistance() +
	 * " and iv_dc eq '"+ "10"+"')"; }
	 * 
	 * 
	 * ////System.out.println("*** urlParam " + urlParam); return urlParam; }
	 */

	/*
	 * public List<ArticleGtinInfo> getGtinViewList(InventoryParam
	 * inventoryParam) throws JsonParseException, JsonMappingException,
	 * IOException { ////System.out.println("inside calling getGtinViewList");
	 * 
	 * 
	 * ////System.out.println("After ResponseEntity"); ArticleGtinResponse
	 * articleGtinResponse = getRestTemplate().getForObject(
	 * getURL(inventoryParam) + SUFFIX_GTIN, ArticleGtinResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * if (articleGtinResponse.getArticleGtinResponseHelper() != null) {
	 * 
	 * return articleGtinResponse.getArticleGtinResponseHelper()
	 * .getArticleGtinInfoList(); } else { return null; } }
	 */
	/*
	 * public List<ArticleGtinInfo> getGtinView(InventoryParam inventoryParam)
	 * throws JsonParseException, JsonMappingException, IOException {
	 * ////System.out.println("inside calling getGtinView");
	 * 
	 * 
	 * ////System.out.println("After ResponseEntity"); ArticleGtinResponse
	 * articleGtinResponse = getRestTemplate().getForObject(
	 * getURL(inventoryParam) + SUFFIX_GTIN, ArticleGtinResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * if (articleGtinResponse.getArticleGtinResponseHelper() != null) {
	 * 
	 * return articleGtinResponse.getArticleGtinResponseHelper()
	 * .getArticleGtinInfoList(); } else { return null; } }
	 */

	/*
	 * public List<ArticleBasicViewDetails> getArticleBasicViewList(
	 * InventoryParam inventoryParam) throws JsonParseException,
	 * JsonMappingException, IOException {
	 * 
	 * ////System.out.println("******* BASIC VIEW ******** " +
	 * getURL(inventoryParam) + SUFFIX_BASIC);
	 * ////System.out.println("*******  PARAM ***** " +
	 * getURLParam(inventoryParam));
	 * 
	 * 
	 * ArticleBasicViewDetailsResponse basicViewDetailsResponse =
	 * getRestTemplate() .getForObject(getURL(inventoryParam) +
	 * "et_basic_view_r", ArticleBasicViewDetailsResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * if (basicViewDetailsResponse.getArticleBasicViewDetailsResponseHelper()
	 * != null) {
	 * 
	 * return basicViewDetailsResponse
	 * .getArticleBasicViewDetailsResponseHelper()
	 * .getArticleBasicViewDetailsList(); } else { return null; }
	 * 
	 * } public List<ArticleBasicViewDetails> getArticleBasicView(
	 * InventoryParam inventoryParam) throws JsonParseException,
	 * JsonMappingException, IOException {
	 * 
	 * ////System.out.println("******* BASIC VIEW ******** " +
	 * getURL(inventoryParam) + SUFFIX_BASIC);
	 * ////System.out.println("*******  PARAM ***** " +
	 * getURLParam(inventoryParam));
	 * 
	 * 
	 * ArticleBasicViewDetailsResponse basicViewDetailsResponse =
	 * getRestTemplate() .getForObject(getURL(inventoryParam) +
	 * "et_basic_view_r", ArticleBasicViewDetailsResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * if (basicViewDetailsResponse.getArticleBasicViewDetailsResponseHelper()
	 * != null) {
	 * 
	 * return basicViewDetailsResponse
	 * .getArticleBasicViewDetailsResponseHelper()
	 * .getArticleBasicViewDetailsList(); } else { return null; }
	 * 
	 * }
	 */

	// method to call the Service-SOH
	/*
	 * public List<InventorySOHInfo> getStockOnHand(InventoryParam
	 * inventoryParam) throws JsonParseException, JsonMappingException,
	 * IOException {
	 * 
	 * 
	 * 
	 * InventorySOHResponse response = getRestTemplate().getForObject(
	 * InventoryServiceSOHUrl, InventorySOHResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * if (response.getResponse() != null) { return
	 * response.getResponse().getSOH(); } else { return null; }
	 * 
	 * }
	 * 
	 * // method to call the Service-SIT public List<InventorySITInfo>
	 * getStockinTransit(InventoryParam inventoryParam) throws
	 * JsonParseException, JsonMappingException, IOException {
	 * 
	 * 
	 * 
	 * InventorySITResponse response = getRestTemplate().getForObject(
	 * InventoryServiceSITUrl, InventorySITResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * if (response.getResponse() != null) { return
	 * response.getResponse().getSIT(); } else { return null; }
	 * 
	 * }
	 * 
	 * // method to call the Service-SOO public List<InventorySOOInfo>
	 * getStockonOrder(InventoryParam inventoryParam) throws JsonParseException,
	 * JsonMappingException, IOException {
	 * 
	 * 
	 * InventorySOOResponse response = getRestTemplate().getForObject(
	 * InventoryServiceSOOUrl, InventorySOOResponse.class,
	 * getURLParam(inventoryParam)); if (response.getResponse() != null) {
	 * return response.getResponse().getSOO(); } else { return null; } }
	 */

	/*
	 * public List<Location> getSitesbyDistance(InventoryParam inventoryParam)
	 * throws JsonParseException, JsonMappingException, IOException {
	 * 
	 * LocationResponse response = getRestTemplate().getForObject(
	 * SitesbyDistanceServiceUrl, LocationResponse.class,
	 * getURLParamSitesbyDistance(inventoryParam));
	 * 
	 * List<Location> locationList = new ArrayList<Location>();
	 * 
	 * // Take only top 20 stores if (response != null && response.getResponse()
	 * != null) { List<Location> locList =
	 * response.getResponse().getLocations(); for (int iLoc = 0; iLoc <
	 * inventoryParam.getMaxStores(); iLoc ++) {
	 * locationList.add(locList.get(iLoc)); } }
	 * ////System.out.println("Location List size: " + locationList.size());
	 * return locationList; }
	 */

	public List<ArticleSiteView> getSiteViewList(String articleno,
			String sitenos,UserContext user) throws JsonParseException, JsonMappingException,
			IOException {

		try {
			ArticleSiteViewResponse articleSiteViewResponse = getRestTemplate(user)
					.getForObject(
							SiteViewServiceUrl,
							ArticleSiteViewResponse.class,
							"(iv_article='" + articleno + "',iv_site='"
									+ sitenos + "')");

			if (articleSiteViewResponse.getArticleSiteViewResponseHelper() != null) {

				return articleSiteViewResponse
						.getArticleSiteViewResponseHelper()
						.getArticleSiteViewList();
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	/*
	 * public List<ArticlePurchasingView> getPurchasingViewList(String
	 * articleno,String sitenos) throws JsonParseException,
	 * JsonMappingException, IOException {
	 * 
	 * 
	 * 
	 * ArticlePurchasingViewResponse articlePurchasingViewResponse =
	 * getRestTemplate().getForObject( PurchaseViewServiceURL,
	 * ArticlePurchasingViewResponse.class,"(iv_article='" + articleno +
	 * "',iv_site='" + sitenos + "')");
	 * 
	 * if(articlePurchasingViewResponse.getArticlePurchasingViewResponseHelper()
	 * !=null){
	 * 
	 * return
	 * articlePurchasingViewResponse.getArticlePurchasingViewResponseHelper()
	 * .getArticlePurchasingViewList(); }else{ return null; } }
	 */

	private final static String SalesViewServiceURL = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_ART_LISTING/zsp_art_listingCollection{(1)}/et_sales_view_r";
	private final static String SellPriceViewServiceURL = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZSP_ART_LISTING/zsp_art_listingCollection{(1)}/et_sellpr_r";

	/*
	 * public List<ArticleSalesView> getSalesViewList(String articleno,String
	 * sitenos) throws JsonParseException, JsonMappingException, IOException {
	 * 
	 * 
	 * 
	 * ArticleSalesViewResponse articleSalesViewResponse = getRestTemplate()
	 * .getForObject(SalesViewServiceURL , ArticleSalesViewResponse.class,
	 * "(iv_article='" + articleno + "',iv_site='" + sitenos + "')");
	 * 
	 * if (articleSalesViewResponse.getArticleSalesViewResponseHelper() != null)
	 * {
	 * 
	 * return articleSalesViewResponse.getArticleSalesViewResponseHelper()
	 * .getArticleSalesView(); } else { return null; } }
	 */
	/*
	 * public List<ArticleSellPriceView> getSellPriceViewList(String
	 * articleno,String sitenos) throws JsonParseException,
	 * JsonMappingException, IOException {
	 * 
	 * 
	 * 
	 * ArticleSellPriceViewResponse articleSellPriceViewResponse =
	 * getRestTemplate() .getForObject(SellPriceViewServiceURL,
	 * ArticleSellPriceViewResponse.class, "(iv_article='" + articleno +
	 * "',iv_site='" + sitenos + "')");
	 * 
	 * 
	 * if (articleSellPriceViewResponse .getArticleSellPriceViewResponseHelper()
	 * != null) {
	 * 
	 * return articleSellPriceViewResponse
	 * .getArticleSellPriceViewResponseHelper() .getArticleSellPriceView(); }
	 * else { return null; } }
	 */
	/*
	 * public List<ArticleSellPriceView> getSellPriceView(InventoryParam
	 * inventoryParam) throws JsonParseException, JsonMappingException,
	 * IOException {
	 * 
	 * 
	 * 
	 * ArticleSellPriceViewResponse articleSellPriceViewResponse =
	 * getRestTemplate() .getForObject(getURL(inventoryParam) +
	 * SUFFIX_SELL_PRICE, ArticleSellPriceViewResponse.class,
	 * getURLParam(inventoryParam));
	 * 
	 * 
	 * if (articleSellPriceViewResponse .getArticleSellPriceViewResponseHelper()
	 * != null) {
	 * 
	 * return articleSellPriceViewResponse
	 * .getArticleSellPriceViewResponseHelper() .getArticleSellPriceView(); }
	 * else { return null; } }
	 */

	public List<NearbyStoreSearchInfo> NearbyStoreSearch(InventoryParam param,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		// //System.out.println("inside NearbyStoreSearch");

		try {
			NearbyStoreSearchResponse nearbyStoreSearchResponse = getRestTemplate(user)
					.getForObject(NearbyStoreSearchServiceUrl,
							NearbyStoreSearchResponse.class,
							getURLParamNearbyStoreSearch(param));

			// //System.out.println("after calling service NearbyStoreSearch");
			/*
			 * if (nearbyStoreSearchResponse .getResponse() != null) {
			 * 
			 * return nearbyStoreSearchResponse .getResponse()
			 * .getNearbyStoreSearch(); } else { return null; }
			 */

			if (nearbyStoreSearchResponse == null
					|| nearbyStoreSearchResponse.getResponse() == null
					|| nearbyStoreSearchResponse.getResponse()
							.getNearbyStoreSearch() == null
					|| nearbyStoreSearchResponse.getResponse()
							.getNearbyStoreSearch().size() == 0
					|| nearbyStoreSearchResponse.getResponse()
							.getNearbyStoreSearch().get(0).getMsg()
							.equalsIgnoreCase("No Data Found")) {
				// //System.out.println("list is empty");
				return null;

			}
			// //System.out.println("list is not empty");
			// articleParam.setRecordCount(Integer.parseInt(response.getArticleResultsResponseHelper().getArticleSearchResultsList().get(0).getMsg().trim()));
			return nearbyStoreSearchResponse.getResponse()
					.getNearbyStoreSearch();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	public List<NearbyStoreSearchInfo> NearbyStoreSearchNew(
			InventoryParam param, String[] checkBoxValues,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {

		// //System.out.println("inside NearbyStoreSearch New");
		try {
			NearbyStoreSearchResponse nearbyStoreSearchResponse = getRestTemplate(user)
					.getForObject(
							NearbyStoreSearchServiceUrl,
							NearbyStoreSearchResponse.class,
							getURLParamNearbyStoreSearchNew(param,
									checkBoxValues));

			// //System.out.println("after calling service NearbyStoreSearch New");
			if (nearbyStoreSearchResponse == null
					|| nearbyStoreSearchResponse.getResponse() == null
					|| nearbyStoreSearchResponse.getResponse()
							.getNearbyStoreSearch() == null
					|| nearbyStoreSearchResponse.getResponse()
							.getNearbyStoreSearch().size() == 0
					|| nearbyStoreSearchResponse.getResponse()
							.getNearbyStoreSearch().get(0).getMsg()
							.equalsIgnoreCase("No Data Found")) {
				// //System.out.println("list is empty");
				return null;

			}
			// //System.out.println("list is not empty");
			// articleParam.setRecordCount(Integer.parseInt(response.getArticleResultsResponseHelper().getArticleSearchResultsList().get(0).getMsg().trim()));
			return nearbyStoreSearchResponse.getResponse()
					.getNearbyStoreSearch();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

	private String getURLParamNearbyStoreSearchNew(
			InventoryParam inventoryParam, String[] checkBoxValues) {
		String urlParam = null;
		if (inventoryParam.getSiteNo() != null
				&& !(inventoryParam.getSiteNo().isEmpty())
				&& inventoryParam.getArticleNo() != null
				&& !(inventoryParam.getArticleNo().isEmpty())
				&& inventoryParam.getDistance() >= 0
				&& inventoryParam.getSalesOrg() != null
				&& !(inventoryParam.getSalesOrg().isEmpty())
				&& inventoryParam.getMaxStores() >= 0) {

			urlParam = "(iv_article eq '" + inventoryParam.getArticleNo()
					+ "' and iv_site eq '" + inventoryParam.getSiteNo()
					+ "' and iv_distance eq " + inventoryParam.getDistance()
					+ " and iv_records eq " + inventoryParam.getMaxStores()
					+ " and iv_dc eq '" + "10";
			// + "' and iv_s_org eq '" + inventoryParam.getSalesOrg()
			
			urlParam += "' and iv_s_org eq '";
			for (int i = 0; i < checkBoxValues.length; i++) {
				// //System.out.println("reasoncode" + checkBoxValues[i]);
				if(!checkBoxValues[i].equals("All"))
				{
				urlParam +=checkBoxValues[i];
				if(i!=checkBoxValues.length-1)
				{
					urlParam +=";";
				}
				}
				
			}
			urlParam += "' and iv_ranged eq 'X')"; // added

		} else if (inventoryParam.getSiteNo() != null
				&& !(inventoryParam.getSiteNo().isEmpty())
				&& inventoryParam.getArticleNo() != null
				&& !(inventoryParam.getArticleNo().isEmpty())
				&& inventoryParam.getDistance() >= 0
				&& inventoryParam.getMaxStores() >= 0) {
			urlParam = "(iv_article eq '" + inventoryParam.getArticleNo()
					+ "' and iv_site eq '" + inventoryParam.getSiteNo()
					+ "' and iv_distance eq " + inventoryParam.getDistance()
					+ " and iv_records eq " + inventoryParam.getMaxStores()
					+ " and iv_dc eq '" + "10" + "' and iv_ranged eq 'X')"; // added
		}

		// //System.out.println("*** urlParam " + urlParam);
		return urlParam;
	}
}
