package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.PlannedOrders;
import au.com.woolworths.portal.model.PlannedOrdersResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.PlannedOrdersParam;

public class PlannedFcstOrderServiceImpl extends CommonServiceImpl {

	@Value("#{url['PlannedFcstOrderServiceURL']}")
	private String PlannedFcstOrderServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;

	private static final Logger LOGGER = Logger.getLogger(PlannedFcstOrderServiceImpl.class.getName());
	
	public ArrayList<PlannedOrders> generateReport(PlannedOrdersParam param,UserContext user) {

		SimpleDateFormat df = new SimpleDateFormat("ddMMyyyy");
		StringBuffer urlParam = new StringBuffer();
		urlParam.append("storeNo/")
				.append((param.getSiteNo() != null && param.getSiteNo().trim().length() > 0) ? param.getSiteNo() : "null").append("/salesOrg/")
				.append((param.getSalesOrg() != null && param.getSalesOrg().trim().length() > 0) ? (param.getSalesOrg()) : "null")
				.append("/rosterDt/").append(df.format(new Date()));
		
			urlParam.append("/article/").append(param.getArticleNo());
	

		urlParam.append("/recCount/" + pageSize).append("/pageNo/")
				.append((param.getPageNo() != null && param.getPageNo().trim()
						.length() > 0) ? (param.getPageNo()) : "1");

		LOGGER.info(urlParam);

		PlannedOrdersResponse response = null;
		URI url = null;
		try {
			url = new URI(PlannedFcstOrderServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					PlannedOrdersResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getPlannedOrdersResponseHelper() != null
				&& response.getPlannedOrdersResponseHelper()
						.getPlannedOrdersList() != null
				&& response.getPlannedOrdersResponseHelper()
						.getPlannedOrdersList().size() > 0
				&& !response.getPlannedOrdersResponseHelper()
						.getPlannedOrdersList().get(0).getMsg().trim()
						.contains(" ")) {
			return (ArrayList<PlannedOrders>) response
					.getPlannedOrdersResponseHelper().getPlannedOrdersList();
		} else {
			param.setMsg(response.getPlannedOrdersResponseHelper()
					.getPlannedOrdersList().get(0).getMsg().trim());
		}
		return null;

	}

}
