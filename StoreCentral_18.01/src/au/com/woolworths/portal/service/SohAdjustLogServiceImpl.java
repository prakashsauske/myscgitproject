package au.com.woolworths.portal.service;

import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.MovementType;
import au.com.woolworths.portal.model.MovementTypeResponse;
import au.com.woolworths.portal.model.SohAdjustLogModel;
import au.com.woolworths.portal.model.SohAdjustLogModelResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.SohAdjustLogParam;
import au.com.woolworths.portal.util.PortalUtil;

public class SohAdjustLogServiceImpl extends CommonServiceImpl {

	@Value("#{url['sohAdjustLogURL']}")
	private String sohAdjustLogURL;

	@Value("#{url['MvmtTypeURL']}")
	private String mvmtTypeURL;
	@Value("#{url['PageSize']}")
	private String pageSize;

	public ArrayList<SohAdjustLogModel> getSohAdjustLog(
			SohAdjustLogParam param, String indicator,UserContext user) throws Exception {

		// //System.out.println("******* getSohAdjustLog ******** ");

		// //System.out.println(" param from date->" + param.getFromDate());
		// //System.out.println(" param to date->" + param.getToDate());
		// //System.out.println(" param reason code->" +
		// param.getSingleReasonCode());
		// //System.out.println(" param site no ->" + param.getSiteNo());
		// //System.out.println(" param employee ->" + param.getEmployee());
		// //System.out.println(" param trading dept type ->"
		// + param.getTradingDeptType());
		// //System.out.println(" param transaction type ->"
		// + param.getTransactionType());

		String urlParam;

		/*
		 * iv_site eq '1008' and iv_mvmt_type eq 'Z35;Z85' and iv_reason_code eq
		 * '0000;0001' and iv_dept eq '27' and iv_date_from eq '20120621' and
		 * iv_date_to eq '20130621'
		 */

		urlParam = " iv_site eq '"
				+ param.getSiteNo()
				+ "'"
				// + " and iv_reason_code eq '" + param.getSingleReasonCode()+
				// "'"
				+ " and iv_date_from eq '"
				+ PortalUtil.convertToSAPDate(param.getFromDate())
				+ "' and iv_date_to eq '"
				+ PortalUtil.convertToSAPDate(param.getToDate()) + "'";
		// + "' and iv_dept eq '" +param.getTradingDeptType()

		// if(param.getTradingDeptType()!=null &&
		// param.getTradingDeptType().trim().length()>0){
		// urlParam += " and iv_dept eq '" + param.getTradingDeptType() + "'";
		// }
		//
		// if(param.getEmployee()!=null &&
		// param.getEmployee().trim().length()>0){
		// urlParam += " and iv_user_id eq '" + param.getEmployee() + "'";
		// }
		if (!param.getTransactionType().equalsIgnoreCase("default")) {
			urlParam += " and iv_mvmt_type eq '" + param.getTransactionType()
					+ "'";
		}

		if (!param.getTradingDeptType().equalsIgnoreCase("default")) {
			urlParam += " and iv_dept eq '" + param.getTradingDeptType() + "'";
		} else {
			urlParam += " and iv_dept eq 'ALL DEPARTMENTS'";
		}

		if (param.getEmployee() != null
				&& param.getEmployee().trim().length() > 0) {
			urlParam += " and iv_user_id eq '"
					+ param.getEmployee().toUpperCase() + "'";
		}

		if (indicator.equalsIgnoreCase("print")) {

		} else {
			urlParam = urlParam + " and iv_records eq " + pageSize
					+ " and iv_page_no eq " + param.getPageNo();
		}
		// //System.out.println("url param-->"+urlParam);
		// //System.out.println(" getSohAdjustLog url param-->" + urlParam);
		// +PortalUtil.convertToSAPDate(param.getRosterDate())+"'";
		try {
			SohAdjustLogModelResponse response = getRestTemplate(user)
					.getForObject(sohAdjustLogURL,
							SohAdjustLogModelResponse.class, urlParam);

			if (response == null
					|| response.getSohAdjustLogModelResponseHelper() == null
					|| response.getSohAdjustLogModelResponseHelper()
							.getSohAdjustLogModelList() == null
					|| response.getSohAdjustLogModelResponseHelper()
							.getSohAdjustLogModelList().size() == 0)

			{
				// //System.out.println("list is empty");
				return null;

			}
			// //System.out.println("list is not empty");
			// //System.out.println("");
			return (ArrayList<SohAdjustLogModel>) response
					.getSohAdjustLogModelResponseHelper()
					.getSohAdjustLogModelList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}

	public List<MovementType> getMvmtTypeList(String source,UserContext user) {
		MovementTypeResponse mvmtTypeResponse;
		// TODO Auto-generated method stub
		try {
			mvmtTypeResponse = getRestTemplate(user)
					.getForObject(mvmtTypeURL, MovementTypeResponse.class,
							"iv_source eq '" + source + "'");
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

		if (mvmtTypeResponse.getMvmtTypeResponseHelper() != null) {

			// //System.out.println("departmentResponse."
			// + mvmtTypeResponse.getMvmtTypeResponseHelper()
			// .getMvmtTypeList().get(0).getMvmtType());
			return mvmtTypeResponse.getMvmtTypeResponseHelper()
					.getMvmtTypeList();

		} else {
			// //System.out.println("departmentResponse. in null");
			return null;

		}
	}

	public ArrayList<SohAdjustLogModel> getSohHistory(SohAdjustLogParam param,UserContext user)
			throws Exception {

		// //System.out.println("******* getSohHistory ******** ");

		// //System.out.println(" param from date->" + param.getFromDate());
		// //System.out.println(" param to date->" + param.getToDate());
		// //System.out.println(" param article no->" + param.getArticleNo());
		// //System.out.println(" param site no ->" + param.getSiteNo());

		String urlParam;

		/*
		 * iv_site eq '1008' and iv_mvmt_type eq 'Z35;Z85' and iv_reason_code eq
		 * '0000;0001' and iv_dept eq '27' and iv_date_from eq '20120621' and
		 * iv_date_to eq '20130621'
		 */

		urlParam = " iv_site eq '" + param.getSiteNo() + "'"
				+ " and iv_date_from eq '"
				+ PortalUtil.convertToSAPDate(param.getFromDate())
				+ "' and iv_date_to eq '"
				+ PortalUtil.convertToSAPDate(param.getToDate()) + "'"
				+ " and iv_article eq '" + param.getArticleNo() + "'";

		// //System.out.println(" getSohAdjustLog url param-->" + urlParam);
		// +PortalUtil.convertToSAPDate(param.getRosterDate())+"'";

		try {
			SohAdjustLogModelResponse response = getRestTemplate(user)
					.getForObject(sohAdjustLogURL,
							SohAdjustLogModelResponse.class, urlParam);

			if (response == null
					|| response.getSohAdjustLogModelResponseHelper() == null
					|| response.getSohAdjustLogModelResponseHelper()
							.getSohAdjustLogModelList() == null
					|| response.getSohAdjustLogModelResponseHelper()
							.getSohAdjustLogModelList().size() == 0)

			{
				// //System.out.println("list is empty");
				return null;

			}
			// //System.out.println("list is not empty");
			// //System.out.println("");
			return (ArrayList<SohAdjustLogModel>) response
					.getSohAdjustLogModelResponseHelper()
					.getSohAdjustLogModelList();
		} catch (Exception e) {
			e.printStackTrace();
			return null;
		}

	}
}
