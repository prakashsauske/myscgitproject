package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.SUGOReportParam;

public class SUGOServiceImpl extends CommonServiceImpl {

	@Value("#{url['SugoOrderServiceURL']}")
	private String sugoOrderServiceURL;
	private static final Logger LOGGER = Logger.getLogger(SUGOServiceImpl.class.getName());
	
	
	public SUGOReportParam getSUGOReports(SUGOReportParam param,UserContext user)
			throws UnsupportedEncodingException {
		//system.out.println("In Store central service Impl");
		StringBuffer urlParam = new StringBuffer();
		urlParam.append("getSugoSearchResults/storeNo/").append(param.getStoreNumber()).append("/submitDateTo/").append(formatDate(param.getFromDate()));
		urlParam.append("/recCount/" + 20).append("/pageNo/").append((param.getPageNo() != null && param.getPageNo().trim().length() > 0) ? (param.getPageNo()) : "1");

		//system.out.println("URL Replinishment ::: > "+urlParam);
		//system.out.println("sugoOrderServiceURL ::>"+sugoOrderServiceURL);

		SUGOReportParam response = null;
		URI url = null;
		try {
			url = new URI(sugoOrderServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,SUGOReportParam.class);
		} catch (Exception e) {
			LOGGER.error(e);
			return null;
		}
		//system.out.println(Constants.convertToJsonString(response));
		if (response == null) {
			param.setMsg("Error In Replenishment service, contact java support");
			return param;
		} else if (response != null 	&& response.getOrderReports() != null) {
			return response;
		}else{
			param.setMsg("No SUGO Reports available to display");
			return param;
		}
	}
	
	public static String formatDate(String format) {
		String day=format.split("/")[0];
		String month=format.split("/")[1];
		String year=format.split("/")[2];
        return day+month+year;
    }
	
	public static String formatDateBack(String format) {
		String day=format.substring(0, 2);
		String month=format.substring(2, 4);;
		String year=format.substring(4, 8);;
        return day+"/"+month+"/"+year;
    }
	
}
