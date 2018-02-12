package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.ZeroMPLReport;
import au.com.woolworths.portal.model.ZeroMPLReportResponse;
import au.com.woolworths.portal.param.ZeroMPLReportParam;

public class ZeroMPLReportServiceImpl extends CommonServiceImpl {

	private static final Logger LOGGER = Logger
			.getLogger(ZeroMPLReportServiceImpl.class.getName());
	@Value("#{url['ZeroMPLReportServiceURL']}")
	private String zeroMPLReportServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;


	public ArrayList<ZeroMPLReport> generateReport(ZeroMPLReportParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		urlParam = new StringBuffer(" iv_site eq '").append(param.getSiteNo())
				.append("' and iv_dept eq '").append(param.getDepartmentList())
				.append("'");
		// .append(" and iv_page_no eq ")
		// .append((param.getPageNo() != null && !param.getPageNo()
		// .equals("")) ? param.getPageNo() : "1")
		// .append(" and iv_records eq ").append(pageSize);

		if (param.getSegme() != null && !param.getSegme().equals(""))
			urlParam.append(" and iv_segment eq '").append(param.getSegme())
					.append("'");

		else if (param.getSubCat() != null && !param.getSubCat().equals(""))
			urlParam.append(" and iv_sub_category eq '")
					.append(param.getSubCat()).append("'");

		else if (param.getCategory() != null && !param.getCategory().equals(""))
			urlParam.append(" and iv_category eq '")
					.append(param.getCategory()).append("'");
		

		LOGGER.info(urlParam);
		// urlParam=vendorServiceNewURL+URLEncoder.encode(urlParam,"UTF-8");
		URI url;
		try {
			url = new URI(zeroMPLReportServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ZeroMPLReportResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ZeroMPLReportResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getZeroMPLReportResponseHelper() != null
				&& response.getZeroMPLReportResponseHelper()
						.getZeroMPLReportList() != null
				&& response.getZeroMPLReportResponseHelper()
						.getZeroMPLReportList().size() > 0) {
			if (!response.getZeroMPLReportResponseHelper()
					.getZeroMPLReportList().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<ZeroMPLReport>) response
						.getZeroMPLReportResponseHelper()
						.getZeroMPLReportList();
			else {
				param.setMsg(response.getZeroMPLReportResponseHelper()
						.getZeroMPLReportList().get(0).getMsg().trim());
			}
		}
		return null;
	}
}
