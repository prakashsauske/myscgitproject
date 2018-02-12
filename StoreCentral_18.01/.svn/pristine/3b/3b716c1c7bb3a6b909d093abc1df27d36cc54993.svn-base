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
import au.com.woolworths.portal.util.PortalUtil;

public class PlannedOrderServiceImpl extends CommonServiceImpl {

	@Value("#{url['PlannedOrderServiceURL']}")
	private String plannedOrderServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(PlannedOrderServiceImpl.class.getName());
	
	private String MANDATORY = "Please enter all mandatory inputs.";

	public ArrayList<PlannedOrders> generateReport(PlannedOrdersParam param,UserContext user) {

		SimpleDateFormat df = new SimpleDateFormat("ddMMyyyy");
		StringBuffer urlParam = new StringBuffer();
		urlParam.append("storeNo/")
				.append((param.getSiteNo() != null && param.getSiteNo().trim()
						.length() > 0) ? param.getSiteNo() : "null")

				.append("/salesOrg/")
				.append((param.getSalesOrg() != null && param.getSalesOrg()
						.trim().length() > 0) ? (param.getSalesOrg()) : "null")

				.append("/rosterDt/").append(df.format(new Date()));

		if (param.getSegme() != null && !param.getSegme().equals(""))
			urlParam.append("/nodeLevel/").append(PortalUtil.SEG)
					.append("/nodeId/").append(param.getSegme());
		else if (param.getSubCat() != null && !param.getSubCat().equals(""))
			urlParam.append("/nodeLevel/").append(PortalUtil.SUBCAT)
					.append("/nodeId/").append(param.getSubCat());
		else if (param.getCategory() != null && !param.getCategory().equals(""))
			urlParam.append("/nodeLevel/").append(PortalUtil.CAT)
					.append("/nodeId/").append(param.getCategory());
		else if (param.getDepartmentList() != null
				&& !param.getDepartmentList().equals(""))
			urlParam.append("/nodeLevel/").append(PortalUtil.DEP)
					.append("/nodeId/").append(param.getDepartmentList());
		else {
			param.setMsg(MANDATORY);
			return null;
		}

		urlParam.append("/recCount/" + pageSize)
				.append("/pageNo/")
				.append((param.getPageNo() != null && param.getPageNo().trim()
						.length() > 0) ? (param.getPageNo()) : "1");

		LOGGER.info(urlParam);

		PlannedOrdersResponse response = null;
		URI url = null;
		try {
			url = new URI(plannedOrderServiceURL + urlParam);
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
