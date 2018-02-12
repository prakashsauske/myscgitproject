/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.IOException;
import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.dao.DatabaseUtil;
import au.com.woolworths.portal.model.Store;
import au.com.woolworths.portal.model.StoreResponse;
import au.com.woolworths.portal.model.StoresNearByModel;
import au.com.woolworths.portal.model.StoresNearByModelResponse;
import au.com.woolworths.portal.model.SupplierModel;
import au.com.woolworths.portal.model.SupplierModelResponse;
import au.com.woolworths.portal.model.UserContext;

/**
 * @author xrca4
 * 
 */
public class StockTransferServiceImpl extends CommonServiceImpl {

	

	@Value("#{url['StoresNearByURL']}")
	private String storesNearByURL;

	@Value("#{url['StoreServiceURL']}")
	private String storeServiceURL;
	
	
	@Value("#{url['SupplierSearchURL']}")
	private String supplierSearchURL;
	private static final Logger LOGGER = Logger.getLogger(StockTransferServiceImpl.class.getName());
	
	public ArrayList<Store> getStoreValidationDetails(String siteNo,UserContext user)
			throws Exception {

		// //System.out.println("******* get Store ******** ");

		String urlParam;
		try {
			int siteNoVal = Integer.parseInt(siteNo);
			urlParam = " iv_site_no eq '" + siteNoVal + "'";

		} catch (Exception e) {
			urlParam = " iv_site_name eq '" + siteNo + "'";
		}
		// urlParam=" iv_site_name  eq '" + siteNo + "'";

		//System.out.println("urlParam" + urlParam);
		try {
			StoreResponse response = getRestTemplate(user).getForObject(
					storeServiceURL, StoreResponse.class, urlParam);

			if (response == null
					|| response.getStoreDetailsResponseHelper() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList() == null
					|| response.getStoreDetailsResponseHelper()
							.getstoreDetailsList().size() == 0
			/*
			 * ||response.getWareHouseResponseHelper().getWareHouseList().get(0).
			 * getMsg().trim().length()>0
			 */) {
				return new ArrayList<Store>();
			}

			return (ArrayList<Store>) response.getStoreDetailsResponseHelper()
					.getstoreDetailsList();
		} catch (Exception e) {
			e.printStackTrace();
			return new ArrayList<Store>();
		}
	}
	
	public static List<Store> getSitesList(String store, String salesOrg)
			throws SQLException {

		String query = null;
		Store storeDtl = null;
		List<Store> siteDtlsList = null;
		ResultSet rs = null;
		Connection con = null;
		PreparedStatement stmt = null;

		query = "SELECT site, site_name, sales_org, sa.description FROM site_master sm LEFT OUTER JOIN sales_org sa on sm.sales_org= sa.no "
				+ " WHERE  sm.sales_org ='"
				+ salesOrg
				+ "' and (sm.site LIKE ('%"
				+ store
				+ "%')  OR sm.site_name LIKE ('%" + store + "%')) ";

		// System.out.println("query__" + query);

		try {

			con = DatabaseUtil.getConnection();
			stmt = con.prepareStatement(query);
			rs = stmt.executeQuery();

			if (rs != null) {
				siteDtlsList = new ArrayList<Store>();
				while (rs.next()) {
					storeDtl = new Store(rs.getString("site"),rs.getString("site_name"),rs.getString("sales_org"),rs.getString("description").replace("'", "`"));
					storeDtl.setSiteNo(rs.getString("site"));
					storeDtl.setSiteName(rs.getString("site_name"));
					storeDtl.setSalesOrg(rs.getString("sales_org"));
					storeDtl.setSalesOrgNm(rs.getString("description"));
					siteDtlsList.add(storeDtl);

				}
			}
		} catch (SQLException e) {
			e.printStackTrace();
		} catch (Exception e1) {
			e1.printStackTrace();
		} finally {
			if (rs != null)
				rs.close();
			if (stmt != null)
				stmt.close();
			DatabaseUtil.releaseConnection(con);//con.close();
		}

		return siteDtlsList;

	}


	public List<StoresNearByModel> getStoresNearBy(String[] checkBoxValues,
			String distance, String resSize, String siteNo,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		System.out.println("******* getStoresNearBy ******** ");

		String urlParam;
		urlParam="iv_site eq '1008' and iv_distance eq 25 and iv_records eq 20 and iv_s_org eq '1020'";
/* Ganesh
		urlParam = " iv_site eq '" + siteNo;

		urlParam += "' and iv_distance eq " + distance + " and iv_records eq "
				+ resSize;

		urlParam += " and iv_s_org eq '" + checkBoxValues[0];
		for (int i = 1; i < checkBoxValues.length; i++) {
			// //System.out.println("reasoncode" + checkBoxValues[i]);
			urlParam += ";" + checkBoxValues[i];
		}
		urlParam += "'";
ganesh  */
		System.out.println("storesNearByURL----->"+storesNearByURL);
		System.out.println("url param----->" + urlParam);
		try {
			StoresNearByModelResponse response = getRestTemplate(user)
					.getForObject(storesNearByURL,
							StoresNearByModelResponse.class, urlParam);

			if (response == null
					|| response.getStoresNearByModelResponseHelper() == null
					|| response.getStoresNearByModelResponseHelper()
							.getStoresNearByModelList() == null
					|| response.getStoresNearByModelResponseHelper()
							.getStoresNearByModelList().size() == 0
					|| response.getStoresNearByModelResponseHelper()
							.getStoresNearByModelList().get(0).getMsg().trim()
							.length() > 0)

			{
				return null;
			} else {
				return response.getStoresNearByModelResponseHelper()
						.getStoresNearByModelList();
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
	
	public List<SupplierModel> getSupplierLists(String siteNo,UserContext user)
			throws JsonParseException, JsonMappingException, IOException {
		// //System.out.println("******* getStoresNearBy ******** ");

		String urlParam;
		List<SupplierModel>  supplierModelList=null;

		urlParam = " iv_site eq '" + siteNo + "'";

		//System.out.println("url param----->" + urlParam);
		
	
		try {
			if (supplierModelListMap == null || (supplierModelListMap!=null && !supplierModelListMap.containsKey(siteNo))) {
				SupplierModelResponse response = getRestTemplate(user)
						.getForObject(supplierSearchURL,
								SupplierModelResponse.class, urlParam);
				LOGGER.info("Service call for Supplier List");
				if (response == null
						|| response.getSupplierModelResponseHelper() == null
						|| response.getSupplierModelResponseHelper()
								.getSupplierModelList() == null
						|| response.getSupplierModelResponseHelper()
								.getSupplierModelList().size() == 0
						|| response.getSupplierModelResponseHelper()
								.getSupplierModelList().get(0).getMsg()
								.equalsIgnoreCase("No Data Found"))

				{
					return null;
				} else {
					supplierModelList = response
							.getSupplierModelResponseHelper()
							.getSupplierModelList();
					
					if(supplierModelListMap==null){
						supplierModelListMap=new LinkedHashMap<String, List<SupplierModel>>();
						supplierModelListMap.put(siteNo, supplierModelList);
					}
					else{
						supplierModelListMap.put(siteNo, supplierModelList);
					}
				}
				return supplierModelList;
			} else {
				return supplierModelListMap.get(siteNo);
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

}
