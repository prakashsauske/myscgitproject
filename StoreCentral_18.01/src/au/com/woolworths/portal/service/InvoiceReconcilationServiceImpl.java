package au.com.woolworths.portal.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.InvoiceReconcilationModel;
import au.com.woolworths.portal.model.InvoiceReconcilationResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InvoiceReconcilationParam;
import au.com.woolworths.portal.util.PortalUtil;

public class InvoiceReconcilationServiceImpl extends CommonServiceImpl {

	@Value("#{url['InvoiceReconcilationURL']}")
	private String invoiceReconcilationURL;

	@Value("#{url['PageSize']}")
	private String pageSize;

	public ArrayList<InvoiceReconcilationModel> getInvoiceReconcilationDetails(
			InvoiceReconcilationParam param, String indicator,UserContext user) throws Exception {

		// //System.out.println("******* getInvoiceReconcilationDetails ******** ");

		String urlParam;
		urlParam = " iv_site eq '" + param.getSiteNo() + "'";

		// changed - if order number is given, don't consider other parameters

		if (param.getOrderNo() != null
				&& param.getOrderNo().trim().length() > 0) {
			urlParam += " and iv_order_no eq '" + param.getOrderNo() + "'";
		} else {
			// department
			if (param.getDept() != null && param.getDept().trim().length() > 0) {
				urlParam += " and iv_dept eq '" + param.getDept() + "'";
			}
			// from date Grn
			if (param.getFromDateGrn() != null
					&& param.getFromDateGrn().trim().length() > 0) {
				urlParam += " and iv_from_date eq '"
						+ PortalUtil.convertToSAPDate(param.getFromDateGrn())
						+ "'";
			}

			// to date Grn
			if (param.getToDateGrn() != null
					&& param.getToDateGrn().trim().length() > 0) {
				urlParam += " and iv_to_date eq '"
						+ PortalUtil.convertToSAPDate(param.getToDateGrn())
						+ "'";
			}

			// discrp amount
			if (param.getDiscrpAmt() != null
					&& param.getDiscrpAmt().trim().length() > 0) {
				urlParam += " and iv_dis_amt eq " + param.getDiscrpAmt() + "";
			}

			if (param.getInvFlag() != null
					&& param.getInvFlag().trim().length() > 0
					&& param.getInvFlag().equalsIgnoreCase("on")) {
				urlParam += " and iv_wo_inv_flag eq 'X'";
			}
			if (param.getAdjFlag() != null
					&& param.getAdjFlag().trim().length() > 0
					&& param.getAdjFlag().equalsIgnoreCase("on")) {
				urlParam += " and iv_adj_flag eq 'X'"; // + param.getAdjFlag() +
														// "'";
			}

		}

		if (indicator.equalsIgnoreCase("print")) {

		} else {
			urlParam += " and iv_records eq " + pageSize
					+ " and iv_page_no eq " + param.getPageNumber();
		}

		// //System.out.println("url param-->"+urlParam);
		try {
			InvoiceReconcilationResponse response = getRestTemplate(user)
					.getForObject(invoiceReconcilationURL,
							InvoiceReconcilationResponse.class, urlParam);

			if (response == null
					|| response.getInvoiceReconcilationResponseHelper() == null
					|| response.getInvoiceReconcilationResponseHelper()
							.getInvoiceReconcilation() == null
					|| response.getInvoiceReconcilationResponseHelper()
							.getInvoiceReconcilation().size() == 0
					|| response.getInvoiceReconcilationResponseHelper()
							.getInvoiceReconcilation().get(0).getMsg()
							.equalsIgnoreCase("Invalid Order Number")
					|| response.getInvoiceReconcilationResponseHelper()
							.getInvoiceReconcilation().get(0).getMsg()
							.equalsIgnoreCase("No Goods Receipts found"))

			{
				// //System.out.println("list is empty");
				return null;

			}
			// //System.out.println("list is not empty");
			return (ArrayList<InvoiceReconcilationModel>) response
					.getInvoiceReconcilationResponseHelper()
					.getInvoiceReconcilation();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
}
