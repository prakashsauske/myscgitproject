package au.com.woolworths.portal.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.EDGMSReport;
import au.com.woolworths.portal.model.EDGMSResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.EdgmsReportParam;
import au.com.woolworths.portal.util.PortalUtil;

public class EdgmsServiceImpl extends CommonServiceImpl {

	@Value("#{url['EDGMSReportEnquiryURL']}")
	private String edgmsReportEnquiryURL;

	/*
	 * @Value("#{url['PageSize']}") private String pageSize;
	 */

	/********** get EDGMS report ******/

	public ArrayList<EDGMSReport> getEDGMSReport(EdgmsReportParam param,UserContext user)
			throws Exception {

		// //System.out.println("******* getEDGMSReport ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + param.getSiteNo() + "'";

		// //System.out.println(" url 1-->" + urlParam);

		if (param.getTradingDept() != null
				&& param.getTradingDept().trim().length() > 0) {

			urlParam += " and iv_trading_dept eq '" + param.getTradingDept()
					+ "'";

		}

		if (param.getWcDate() != null && param.getWcDate().trim().length() > 0) {

			urlParam += " and iv_wc_date eq '"
					+ PortalUtil.convertToSAPDate(param.getWcDate()) + "'";

		}

		if (param.getInputDate() != null
				&& param.getInputDate().trim().length() > 0) {

			urlParam += " and iv_date eq '"
					+ PortalUtil.convertToSAPDate(param.getInputDate()) + "'";

		}
		/*
		 * urlParam =
		 * urlParam+" and iv_records eq "+pageSize+" and iv_page_no eq "
		 * +param.getPageNo();
		 */
		// urlParam="iv_site eq '1008' and iv_order_type eq 'ZNB' and iv_roster_date eq '20120202'";
		// //System.out.println(" url param --->" + urlParam);

		try {
			EDGMSResponse response = getRestTemplate(user).getForObject(
					edgmsReportEnquiryURL, EDGMSResponse.class, urlParam);

			if (response == null
					|| response.getEdgmsResponseHelper() == null
					|| response.getEdgmsResponseHelper().getEdgmsReport() == null
					|| response.getEdgmsResponseHelper().getEdgmsReport()
							.size() == 0)

			{
				return null;
			}

			return (ArrayList<EDGMSReport>) response.getEdgmsResponseHelper()
					.getEdgmsReport();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
	}

}
