package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.InvoiceReconcilationModel;
import au.com.woolworths.portal.model.InvoiceReconcilationResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.InvoiceReconcilationParam;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

public class InvoiceReconServiceImpl extends CommonServiceImpl {

	@Value("#{url['InvoiceReconcilationURL']}")
	private String invoiceReconcilationURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(InvoiceReconServiceImpl.class.getName());
	

	public ArrayList<InvoiceReconcilationModel> generateReport(
			InvoiceReconcilationParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		urlParam = new StringBuffer(" iv_site eq '").append(
				//'0156'
				param.getSiteNo()
				)
				.append("' ");

		if (param.getOrderNo() != null
				&& param.getOrderNo().trim().length() > 0) {
			urlParam.append(" and iv_order_no eq '").append(param.getOrderNo().toUpperCase())
					.append("'");
		} else {
			if (param.getDept() != null && param.getDept().trim().length() > 0 && !param.getDept().equals(PortalUtil.ALL_DEPT)) {
				urlParam.append(" and iv_dept eq '").append(param.getDept())
						.append("'");
			}
			if (param.getFromDateGrn() != null
					&& param.getFromDateGrn().trim().length() > 0) {
				urlParam.append(" and iv_from_date eq '")
						.append(PortalUtil.convertToSAPDate(param
								.getFromDateGrn())).append("'");
			}

			if (param.getToDateGrn() != null
					&& param.getToDateGrn().trim().length() > 0) {
				urlParam.append(" and iv_to_date eq '")
						.append(PortalUtil.convertToSAPDate(param
								.getToDateGrn())).append("'");
			}

			if (param.getDiscrpAmt() != null
					&& param.getDiscrpAmt().trim().length() > 0) {
				urlParam.append(" and iv_dis_amt eq ").append(
						param.getDiscrpAmt());
			}

			if (param.getInvFlag() != null
					&& param.getInvFlag().trim().length() > 0
					) {
				urlParam.append(" and iv_wo_inv_flag eq 'X'");
			}
			if (param.getAdjFlag() != null
					&& param.getAdjFlag().trim().length() > 0
					) {
				urlParam.append(" and iv_adj_flag eq 'X'");
			}
			
			urlParam.append(" and iv_records eq ").append(Constants.PAGE_SIZE).append(" and iv_page_no eq ")
			.append((param.getPageNo()!=null && !"".equals(param.getPageNo()))? param.getPageNo() : 1 );
			

		}

		LOGGER.info(urlParam);
		//urlParam=new StringBuffer(" iv_site eq '0156' and iv_from_date eq '20140519' and iv_to_date eq '20140519' ");
		URI url;
		try {
			url = new URI(invoiceReconcilationURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			System.out.println("URL---"+url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		InvoiceReconcilationResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					InvoiceReconcilationResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getInvoiceReconcilationResponseHelper() != null
				&& response.getInvoiceReconcilationResponseHelper()
						.getInvoiceReconcilation() != null
				&& response.getInvoiceReconcilationResponseHelper()
						.getInvoiceReconcilation().size() > 0) {
			if (!response.getInvoiceReconcilationResponseHelper()
					.getInvoiceReconcilation().get(0).getMsg().trim()
					.contains(" "))
				return (ArrayList<InvoiceReconcilationModel>) response
						.getInvoiceReconcilationResponseHelper()
						.getInvoiceReconcilation();
			else {
				param.setMsg(response.getInvoiceReconcilationResponseHelper()
						.getInvoiceReconcilation().get(0).getMsg().trim());
			}
		}
		return null;
	}
}
