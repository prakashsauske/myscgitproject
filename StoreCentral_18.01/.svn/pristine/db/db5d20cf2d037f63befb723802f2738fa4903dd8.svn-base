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

import au.com.woolworths.portal.pos.model.ManualFuelSalesBean;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.ManualFuelSalesParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class ManualFuelSalesServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	private static final Logger LOGGER = Logger
			.getLogger(ManualFuelSalesServiceImpl.class.getName());

	@Value("${ManualFuelSalesUrl}")
	private String manualFuelSalesServiceUrl;

	public String getManualFuelSales(ManualFuelSalesParam param) {
		List<ManualFuelSalesBean> manualFuelSalesLst = null;
		List<ManualFuelSalesBean> manualFuelSalesCopy = null;

		try {
			ParameterizedTypeReference<ServiceResponse<ManualFuelSalesBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<ManualFuelSalesBean>>() {
			};
			manualFuelSalesLst = invokeService(param,
					manualFuelSalesServiceUrl, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);
			if (manualFuelSalesLst == null
					|| (manualFuelSalesLst != null
							&& manualFuelSalesLst.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(manualFuelSalesLst.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				manualFuelSalesCopy = CommonUtils
						.getCopyOfBeanList(manualFuelSalesLst);
			}
		}

		catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(manualFuelSalesCopy, param.getMsg());

	}

	public ByteArrayOutputStream getManualFuelSalesJasper(
			ManualFuelSalesParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<ManualFuelSalesBean> manualFuelSalesLst = null;
		List<ManualFuelSalesBean> manualFuelSalesCopy = null;
		try {
			manualFuelSalesLst = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					ManualFuelSalesBean.class);
			if (manualFuelSalesLst == null) {
				ParameterizedTypeReference<ServiceResponse<ManualFuelSalesBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<ManualFuelSalesBean>>() {
				};
				manualFuelSalesLst = invokeService(param,
						manualFuelSalesServiceUrl, typeRef,
						PosReportConstantsInterfaces.GENERATE_RPT);
			}

			if (manualFuelSalesLst == null
					|| (manualFuelSalesLst != null
							&& manualFuelSalesLst.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
									.equalsIgnoreCase(manualFuelSalesLst.get(0)
											.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				manualFuelSalesCopy = CommonUtils
						.getCopyOfBeanList(manualFuelSalesLst);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getManualFuelSaleAttr());
				if (comparator != null) {
					Collections.sort(manualFuelSalesCopy, comparator);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				manualFuelSalesCopy);
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
		reportInputParams.put("manArticle", param.getManArticle());
		reportInputParams.put("manLitreSold", param.getManLitreSold());
		reportInputParams.put("manTotal", param.getManTotal());
		reportInputParams.put("msg", param.getMsg());

		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName,
				param.getPrintReportFormat(), beanDS, reportInputParams,
				srcPath, binPath);
		return byos;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof ManualFuelSalesParam) {
			ManualFuelSalesParam param = (ManualFuelSalesParam) params;
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
