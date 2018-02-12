package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
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

import au.com.woolworths.portal.pos.model.ManualFuelPromotionsBean;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.ManualFuelPromotionsParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class ManualFuelPromotionsServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	private static final Logger LOGGER = Logger
			.getLogger(ManualFuelPromotionsServiceImpl.class.getName());

	@Value("${ManualFuelPromoUrl}")
	private String manualFuelPromoServiceUrl;

	public String getManualFuelPromo(ManualFuelPromotionsParam param) {
		List<ManualFuelPromotionsBean> manualFuelPromoLst = null;
		List<ManualFuelPromotionsBean> manualFuelPromoCopy = null;

		try {
			ParameterizedTypeReference<ServiceResponse<ManualFuelPromotionsBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<ManualFuelPromotionsBean>>() {
			};
			manualFuelPromoLst = invokeService(param,
					manualFuelPromoServiceUrl, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);
			if (manualFuelPromoLst == null
					|| (manualFuelPromoLst != null
							&& manualFuelPromoLst.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(manualFuelPromoLst.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				manualFuelPromoCopy = CommonUtils
						.getCopyOfBeanList(manualFuelPromoLst);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance("cashierName,string,asc,last,voucherValue,double,asc,last,cashierNumber,string,asc,last");
				if (comparator != null) {
					Collections.sort(manualFuelPromoCopy, comparator);
				}
				updateGrpLastRecordInfo(manualFuelPromoCopy);
			}
		}

		catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(manualFuelPromoCopy, param.getMsg());

	}

	public ByteArrayOutputStream getManualFuelPromoJasper(
			ManualFuelPromotionsParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<ManualFuelPromotionsBean> manualFuelPromoLst = null;
		List<ManualFuelPromotionsBean> manualFuelPromoCopy = null;
		try {
			manualFuelPromoLst = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					ManualFuelPromotionsBean.class);
			if (manualFuelPromoLst == null) {
				ParameterizedTypeReference<ServiceResponse<ManualFuelPromotionsBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<ManualFuelPromotionsBean>>() {
				};
				manualFuelPromoLst = invokeService(param,
						manualFuelPromoServiceUrl, typeRef,
						PosReportConstantsInterfaces.GENERATE_RPT);
			}

			if (manualFuelPromoLst == null
					|| (manualFuelPromoLst != null
							&& manualFuelPromoLst.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
									.equalsIgnoreCase(manualFuelPromoLst.get(0)
											.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				manualFuelPromoCopy = CommonUtils
						.getCopyOfBeanList(manualFuelPromoLst);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance("cashierName,string,asc,last,voucherValue,double,asc,last,cashierNumber,string,asc,last");
				if (comparator != null) {
					Collections.sort(manualFuelPromoCopy, comparator);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				manualFuelPromoCopy);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("manDate", param.getManDate());
		reportInputParams.put("manTime", param.getManTime());
		reportInputParams.put("manTrans", param.getManTrans());
		reportInputParams.put("manPosid", param.getManPosid());
		reportInputParams.put("manOperNm", param.getManOperNm());
		reportInputParams.put("manVcher", param.getManVcher());
		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName,
				param.getPrintReportFormat(), beanDS, reportInputParams,
				srcPath, binPath);
		return byos;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof ManualFuelPromotionsParam) {
			ManualFuelPromotionsParam param = (ManualFuelPromotionsParam) params;
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
		} else {
			return null;
		}
	}

	private void updateGrpLastRecordInfo(
			List<ManualFuelPromotionsBean> manualFuelPromoList) {
		if (manualFuelPromoList != null) {
			if (manualFuelPromoList != null && !manualFuelPromoList.isEmpty()) {
				ManualFuelPromotionsBean prevBean = manualFuelPromoList.get(0);
				ManualFuelPromotionsBean currBean = null;
				String prevCashierNumber = null;
				String currCashierNumber = null;
				String prevCashierName = null;
				String currCashierName = null;
				double prevVoucherVal = 0.0;
				double currVoucherVal = 0.0;

				int size = manualFuelPromoList.size();
				for (int i = 1; i < size; i++) {
					currBean = manualFuelPromoList.get(i);
					prevCashierNumber = prevBean.getCashierNumber()==null?"":prevBean.getCashierNumber();
					currCashierNumber = currBean.getCashierNumber()==null?"":currBean.getCashierNumber();
					prevCashierName = getCashierDetail(prevBean);
					currCashierName = getCashierDetail(currBean);
					prevVoucherVal = getVoucherVal(prevBean);
					currVoucherVal = getVoucherVal(currBean);

					if (!prevCashierNumber.equalsIgnoreCase(currCashierNumber)
							|| !prevCashierName.equalsIgnoreCase(currCashierName) || prevVoucherVal != currVoucherVal) {
						prevBean.setGroupLastRecord(true);
					}
					prevBean = currBean;
				}
				prevBean.setGroupLastRecord(true);
			}
		}
	}

	private String getCashierDetail(ManualFuelPromotionsBean bean) {
		return (CommonUtils.isNullEmptyWhiteSpace(bean.getCashierFirstName()) ? ""
				: bean.getCashierFirstName())
				+ " "
				+ (CommonUtils.isNullEmptyWhiteSpace(bean.getCashierLastName()) ? ""
						: bean.getCashierLastName());
	}

	private double getVoucherVal(ManualFuelPromotionsBean bean) {
		return Double.parseDouble(bean.getVoucherValue());
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

		public MultiAttributeDynaSortComparator getMultiAttributeDynaSortComparator(
				String attribute, String type, String sortingOrder,
				String nullsLast, LinkedList<SecondSortAttributeDetails> q) {
			return new CustomMultiAttributeDynaSortComparator(attribute, type,
					sortingOrder, nullsLast, q);
		}

		public static CustomMultiAttributeDynaSortComparator getComparatorInstance(
				String input) {
			LinkedList<SecondSortAttributeDetails> list = MultiAttributeDynaSortComparator
					.convertStringToSortAttrList(input);
			CustomMultiAttributeDynaSortComparator comparator = null;
			if (list != null) {
				comparator = new CustomMultiAttributeDynaSortComparator();
				comparator.populateComparatorInstance(list);
			}
			return comparator;
		}

		@Override
		public CompareAttributes inputAttribtes(Object o1, Object o2) {
			if ("cashierName".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierFirstName");
				String CashFirstNameAttr = (String) super
						.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("cashierLastName");
				String CashLastNameAttr = (String) super
						.getObjectAttributeValue(o1);
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

	}
}
