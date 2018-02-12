package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URISyntaxException;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.DailyStoreProfileReport;
import au.com.woolworths.portal.model.DailyStoreProfileReportResponse;
import au.com.woolworths.portal.model.OrderRosterReport;
import au.com.woolworths.portal.model.OrderRosterReportResponse;
import au.com.woolworths.portal.model.RecentDailyStoreProfileReportResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.DailyStoreProfileReportParam;
import au.com.woolworths.portal.param.OrderRosterReportParam;
import au.com.woolworths.portal.util.PortalUtil;

public class DailyStoreProfileReportServiceImpl extends CommonServiceImpl {

	@Value("#{url['DailyStoreProfileReportServiceURL']}")
	private String dailyStoreProfileReportServiceURL;
	
	@Value("#{url['RecentDailyStoreProfileReportServiceURL']}")
	private String recentDailyStoreProfileReportServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger
			.getLogger(DailyStoreProfileReportServiceImpl.class.getName());
	
	public ArrayList<DailyStoreProfileReport> getDailyStoreProfileReport(
			DailyStoreProfileReportParam param,UserContext user) {

		StringBuffer urlParam = new StringBuffer();
		// urlParam = null;

		if (param.getSiteNo() != null && param.getSiteNo().trim().length() > 0) {

			urlParam.append("storNo/" + param.getSiteNo());
		}
		if (param.getSalesOrg() != null
				&& param.getSalesOrg().trim().length() > 0) {

			urlParam.append("/salesOrg/" + param.getSalesOrg());

		}

		if (param.getDate() != null && param.getDate().trim().length() > 0) {

			urlParam.append("/date/"
					+ PortalUtil.convertToDBDate(param.getDate()));

		} else {
			urlParam.append("/date/" + "null");
		}

		if (param.getProfileIndicator() != null
				&& param.getProfileIndicator().trim().length() > 0) {

			urlParam.append("/profileInd/" + param.getProfileIndicator());

		} else {
			urlParam.append("/profileInd/" + "null");
		}
		if (param.getDeparmentNo() != null
				&& param.getDeparmentNo().trim().length() > 0) {

			urlParam.append("/deptId/" + param.getDeparmentNo());

		} else {
			urlParam.append("/deptId/" + "null");
		}

		if (param.getPageNo() != null && param.getPageNo().trim().length() > 0) {

			urlParam.append("/pageNo/" + param.getPageNo() + "/recordCnt/"
					+ pageSize);

		} else {
			urlParam.append("/pageNo/" + "null" + "/recordCnt/" + pageSize);
		}

		// urlParam =
		// "storNo/1007/salesOrg/1005/sos/3/suppNo/null/fromDte/12122013/toDte/13122013/pageNo/1/recordCnt/1";
		LOGGER.info(urlParam.toString());

		DailyStoreProfileReportResponse response = null;
		URI url = null;
		try {
			url = new URI(dailyStoreProfileReportServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					DailyStoreProfileReportResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		}

		return (ArrayList<DailyStoreProfileReport>) response.getResponse()
				.getDailyStoreProfileReportList();

	}

	public DailyStoreProfileReport getRecentDailyStoreProfile(
			DailyStoreProfileReportParam param,UserContext user) {

		StringBuffer urlParam = new StringBuffer();

		if (param.getSiteNo() != null && param.getSiteNo().trim().length() > 0) {

			urlParam.append("/storNo/" + param.getSiteNo());
		}
		if (param.getSalesOrg() != null
				&& param.getSalesOrg().trim().length() > 0) {

			urlParam.append("/salesOrg/" + param.getSalesOrg());

		}

		System.out.println(urlParam.toString());

		RecentDailyStoreProfileReportResponse response = null;
		URI url = null;
		try {
			url = new URI(recentDailyStoreProfileReportServiceURL + urlParam);
		} catch (URISyntaxException e1) {
			System.out.println(e1);
			return null;
		}

		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,
					RecentDailyStoreProfileReportResponse.class);
		} catch (Exception e) {
			System.out.println(e);
			return null;
		}

		if (response == null) {
			return null;
		}

		return (DailyStoreProfileReport) response.getResponse()
				.getDailyStoreProfileReport();

	}
	
}
