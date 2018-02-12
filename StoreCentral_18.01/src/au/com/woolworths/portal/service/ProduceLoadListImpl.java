package au.com.woolworths.portal.service;

import java.io.IOException;
import java.util.List;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.ProduceLoadListInfo;
import au.com.woolworths.portal.model.ProduceLoadListResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ProduceParam;
import au.com.woolworths.portal.util.PortalUtil;

public class ProduceLoadListImpl extends CommonServiceImpl {

	@Value("#{url['ProduceLoadListServiceUrl']}")
	private String ProduceLoadListServiceUrl;

	public List<ProduceLoadListInfo> ProduceLoadListSearch(
			ProduceParam produceLoadparam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		// //System.out.println("inside ProduceLoadListSearch");

		String urlParam = "iv_site eq '"
				+ produceLoadparam.getStoreNo()
				+ "' and iv_warehouse eq '"
				+ produceLoadparam.getWarehouseNo().split("-")[0].trim()
				+ "' "
				+ "and iv_roster_date eq '"
				+ PortalUtil.convertToSAPDate(produceLoadparam
						.getRosterDateInRequiredFormat()) + "'";
		if (produceLoadparam.getStoreOrder() != null
				&& produceLoadparam.getStoreOrder().trim().length() > 0) {
			// urlParam+="and iv_order_no eq '"+produceLoadparam.getLoadListNo()+"'";
			urlParam += " and iv_order_no eq '"
					+ produceLoadparam.getStoreOrder() + "'";
		}
		try {
			System.out.println("urlParam"+urlParam);
			ProduceLoadListResponse produceLoadListResponse = getRestTemplate(user)
					.getForObject(ProduceLoadListServiceUrl,
							ProduceLoadListResponse.class, urlParam);

			/*
			 * ProduceLoadListResponse produceLoadListResponse =
			 * getRestTemplate() .getForObject(ProduceLoadListServiceUrl,
			 * ProduceLoadListResponse.class,
			 * "iv_site eq '"+produceLoadparam.getStoreNo
			 * ()+"' and iv_warehouse eq '"
			 * +produceLoadparam.getWarehouseNo()+"' " +
			 * "and iv_roster_date eq '"+produceLoadparam.getRosterDate()+"'");
			 */
			// //System.out.println("after calling service ProduceLoadListSearch");
			if (produceLoadListResponse.getResponse() != null) {

				return produceLoadListResponse.getResponse()
						.getProduceLoadListSearch();
			} else {
				return null;
			}
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
