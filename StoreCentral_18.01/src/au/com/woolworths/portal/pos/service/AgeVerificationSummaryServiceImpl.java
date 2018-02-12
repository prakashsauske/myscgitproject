package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.AgeVerificationSummaryDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.AgeVerificationSummaryParam;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class AgeVerificationSummaryServiceImpl extends PosServiceImpl {

	private static final Logger LOGGER = Logger
			.getLogger(AgeVerificationSummaryServiceImpl.class.getName());

	@Value("${POSAgeVerificationSummaryURL}")
	private String ageVerificationSummaryURL;

	@Autowired
	private JasperReportUtil jasper;

	public String getAgeVerificationSummary(AgeVerificationSummaryParam param) {
		List<AgeVerificationSummaryDtl> ageVerfSummaryList = new ArrayList<AgeVerificationSummaryDtl>();
		try {
			ParameterizedTypeReference<ServiceResponse<AgeVerificationSummaryDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<AgeVerificationSummaryDtl>>() {
			};
			ageVerfSummaryList = invokeService(param, ageVerificationSummaryURL, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);

			if (ageVerfSummaryList == null
					|| (ageVerfSummaryList != null
							&& ageVerfSummaryList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equals(ageVerfSummaryList.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}

		return convertTojson(ageVerfSummaryList, param.getMsg());
	}
	
	public ByteArrayOutputStream getAgeVerificationSummaryJasper(AgeVerificationSummaryParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<AgeVerificationSummaryDtl> ageVerfSummaryList = new ArrayList<AgeVerificationSummaryDtl>();
		try {
			ageVerfSummaryList = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT, AgeVerificationSummaryDtl.class);
			if (ageVerfSummaryList == null) {
				ParameterizedTypeReference<ServiceResponse<AgeVerificationSummaryDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<AgeVerificationSummaryDtl>>() {
				};
				ageVerfSummaryList = invokeService(param, ageVerificationSummaryURL, typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (ageVerfSummaryList == null
					|| (ageVerfSummaryList != null
							&& ageVerfSummaryList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equals(ageVerfSummaryList.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param
								.getAgeVerificationSummaryAttr());
				if (comparator != null) {
					Collections.sort(ageVerfSummaryList, comparator);
				}

			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				ageVerfSummaryList);

		// String remportName = investTransOperatorHistory;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());
		reportInputParams.put("msg", param.getMsg());

		reportInputParams.put("posOperName", param.getPosOperName());
		reportInputParams.put("totVerf", param.getTotVerf());
		reportInputParams.put("approvedVerf", param.getApprovedVerf());
		reportInputParams.put("approvedVerfTran", param.getApprovedVerfTran());
		reportInputParams.put("rejectVerf", param.getRejectVerf());
		reportInputParams.put("rejectVerfTran", param.getRejectVerfTran());
		reportInputParams.put("keyedVerf", param.getKeyedVerf());
		reportInputParams.put("keyedVerfTran", param.getKeyedVerfTran());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName,
				param.getPrintReportFormat(), beanDS, reportInputParams,
				srcPath, binPath);
		return byos;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof AgeVerificationSummaryParam) {
			AgeVerificationSummaryParam param = (AgeVerificationSummaryParam)params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getDateFrom());
			map.put("ZV_TDATE_IM", param.getDateTo());
			map.put("VAR_20111208223707", param.getSiteNo());
	
			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("ZV_DATE_IM");
			mandatoryParams.add("ZV_TDATE_IM");
			mandatoryParams.add("VAR_20111208223707");
	
			List<String> dateParams = new ArrayList<String>();
			dateParams.add("ZV_DATE_IM");
			dateParams.add("ZV_TDATE_IM");
	
			if (checkAndUpdateMandatoryParams(map, mandatoryParams, dateParams) == false) {
				param.setMsg(PosReportConstantsInterfaces.MANDATORY);
				return null;
			}
			return getUrlParams(map);
		}
		else {
			return null;
		}
	}

	static class CustomMultiAttributeDynaSortComparator extends
			MultiAttributeDynaSortComparator {
		private CustomMultiAttributeDynaSortComparator() {
		}

		public CustomMultiAttributeDynaSortComparator(String attribute,
				String type, String sortingOrder, String nullsLast) {
			super(attribute, type, sortingOrder, nullsLast);
		}

		public CustomMultiAttributeDynaSortComparator(String attribute,
				String type, String sortingOrder, String nullsLast,
				LinkedList<SecondSortAttributeDetails> queue) {
			super(attribute, type, sortingOrder, nullsLast, queue);
		}

		public MultiAttributeDynaSortComparator getMultiAttributeDynaSortComparator(String attribute, String type, String sortingOrder, String nullsLast, LinkedList<SecondSortAttributeDetails> q) {
			return new CustomMultiAttributeDynaSortComparator(
					attribute, type, sortingOrder, nullsLast, q);
		}

		public static CustomMultiAttributeDynaSortComparator getComparatorInstance(
				String input) {
			CustomMultiAttributeDynaSortComparator comparator = new CustomMultiAttributeDynaSortComparator();
			LinkedList<SecondSortAttributeDetails> list = MultiAttributeDynaSortComparator
					.convertStringToSortAttrList(input);
			comparator.populateComparatorInstance(list);
			if (input != null && "".equals(input.trim()) == false) {
				return comparator;
			} else {
				return null;
			}
		}

		@Override
		public CompareAttributes inputAttribtes(Object o1, Object o2) {
			if ("cashierName".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierFirstName");
				String CashFirstNameAttr = (String) super.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierLastName");
				String CashLastNameAttr = (String) super.getObjectAttributeValue(o1);
				comAttr.setFirstObjectAttribute(getCashierName(
						CashFirstNameAttr, CashLastNameAttr));

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierFirstName");
				CashFirstNameAttr = (String) super.getObjectAttributeValue(o2);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierLastName");
				CashLastNameAttr = (String) super.getObjectAttributeValue(o2);
				comAttr.setSecondObjectAttribute(getCashierName(
						CashFirstNameAttr, CashLastNameAttr));
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierName");

				return comAttr;
			} else if ("approvedAgeVerifTransPer".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalAgeVerification");
				String totalAgeVrfn = (String) super.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("approvedAgeVerifitn");
				String aprvdAgeVrfn = (String) super.getObjectAttributeValue(o1);
				comAttr.setFirstObjectAttribute(getPercentage(totalAgeVrfn,
						aprvdAgeVrfn));

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalAgeVerification");
				totalAgeVrfn = (String) super.getObjectAttributeValue(o2);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("approvedAgeVerifitn");
				aprvdAgeVrfn = (String) super.getObjectAttributeValue(o2);
				comAttr.setSecondObjectAttribute(getPercentage(totalAgeVrfn,
						aprvdAgeVrfn));
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("approvedAgeVerifTransPer");

				return comAttr;
			} else if ("rejectedAgeVerificationPer".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalAgeVerification");
				String totalAgeVrfn = (String) super.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("rejectedAgeVerifTrans");
				String rjctdAgeVrfn = (String) super.getObjectAttributeValue(o1);
				comAttr.setFirstObjectAttribute(getPercentage(totalAgeVrfn,
						rjctdAgeVrfn));

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalAgeVerification");
				totalAgeVrfn = (String) super.getObjectAttributeValue(o2);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("rejectedAgeVerifTrans");
				rjctdAgeVrfn = (String) super.getObjectAttributeValue(o2);
				comAttr.setSecondObjectAttribute(getPercentage(totalAgeVrfn,
						rjctdAgeVrfn));
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("rejectedAgeVerificationPer");

				return comAttr;
			} else if ("keyedAgedVerificationTransactionPer".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalAgeVerification");
				String totalAgeVrfn = (String) super.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("keyedAgeVerifTrans");
				String keyedAgeVrfn = (String) super.getObjectAttributeValue(o1);
				comAttr.setFirstObjectAttribute(getPercentage(totalAgeVrfn,
						keyedAgeVrfn));

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalAgeVerification");
				totalAgeVrfn = (String) super.getObjectAttributeValue(o2);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("keyedAgeVerifTrans");
				keyedAgeVrfn = (String) super.getObjectAttributeValue(o2);
				comAttr.setSecondObjectAttribute(getPercentage(totalAgeVrfn,
						keyedAgeVrfn));
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("keyedAgedVerificationTransactionPer");

				return comAttr;
			}
			return super.inputAttribtes(o1, o2);
		}

		public String getCashierName(String firstName, String lastName) {
			if (firstName != null) {
				return firstName + " " + (lastName == null ? "" : lastName);
			} else {
				return lastName == null ? "" : lastName;
			}
		}

		public String getPercentage(String totalAgeVrfn, String nrFn) {
			if (CommonUtils.isNotNullNotEmptyNotWhiteSpace(totalAgeVrfn)) {
				double per = 0.0;
				try {
					double tot = Double.parseDouble(totalAgeVrfn);
					double nr = Double.parseDouble(nrFn);
					if (tot != 0.0) {
						per = nr * 100 / tot;
					}
				} catch (Exception e) {
				}
				DecimalFormat df = new DecimalFormat("##0");
				return df.format(per);
			} else {
				return "";
			}
		}
	}
}
