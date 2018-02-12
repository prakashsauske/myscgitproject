package au.com.woolworths.portal.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import au.com.woolworths.portal.model.EDGMSDiscrepancy;
import au.com.woolworths.portal.model.EDGMSDiscrepancyResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.EdgmsDiscrepancyParam;
import au.com.woolworths.portal.util.PortalUtil;

@Service
public class EdgmsDiscrepancyServiceImpl extends CommonServiceImpl {

	@Value("#{url['EDGMSDiscrepancyURL']}")
	private String edgmsDiscrepancyURL;

	public ArrayList<EDGMSDiscrepancy> getEDGMSDiscrepancies(
			EdgmsDiscrepancyParam param,UserContext user) throws Exception {

		// //System.out.println("******* getEDGMS Discrepancy ******** ");

		String urlParam;

		urlParam = " iv_site eq '" + param.getSiteNo() + "'";

		if (param.getPrevInputDate() != null
				&& param.getPrevInputDate().trim().length() > 0) {

			urlParam += " and iv_date eq '"
					+ PortalUtil.convertToSAPDate(param.getPrevInputDate())
					+ "'";
		}

		if (param.getDiscrpAmt() != null
				&& param.getDiscrpAmt().trim().length() > 0) {
			urlParam += " and iv_dis_amt eq " + param.getDiscrpAmt() + "";
		}

		//System.out.println(" url param --->" + urlParam);

		try {
			EDGMSDiscrepancyResponse response = getRestTemplate(user).getForObject(
					edgmsDiscrepancyURL, EDGMSDiscrepancyResponse.class,
					urlParam);

			if (response != null
					&& response.getEdgmsDiscrepancyHelper() != null
					&& response.getEdgmsDiscrepancyHelper()
							.getEdgmsDiscrepancy() != null
					&& response.getEdgmsDiscrepancyHelper()
							.getEdgmsDiscrepancy().size() > 0
					&& response.getEdgmsDiscrepancyHelper()
							.getEdgmsDiscrepancy().get(0).getMsg() != null)

			{
				if (!response.getEdgmsDiscrepancyHelper().getEdgmsDiscrepancy()
						.get(0).getMsg().trim().contains(" ")) {
					param.setMsg("");
					return (ArrayList<EDGMSDiscrepancy>) response
							.getEdgmsDiscrepancyHelper().getEdgmsDiscrepancy();
				} else {
					param.setMsg("No Goods Receipts found with discrepancy for the date "
							+ param.getPrevInputDate());
				}
			}

		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}
		return null;
	}

}
