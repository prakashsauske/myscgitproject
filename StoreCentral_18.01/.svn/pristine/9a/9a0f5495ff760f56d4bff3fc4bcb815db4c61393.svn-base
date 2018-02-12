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

import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.model.StoreWeeklyMarkdownDtl;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.StoreWeeklyMarkdownParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class StoreWeeklyMarkdownServiceImpl extends PosServiceImpl {

	@Value("${StoreWeeklyMarkdownURL}")
	private String storeWeeklyMarkdownURL;

	@Autowired
	private JasperReportUtil jasper;

	private static final Logger LOGGER = Logger
			.getLogger(StoreWeeklyMarkdownServiceImpl.class.getName());

	public String getStoreWeeklyMarkdown(StoreWeeklyMarkdownParam param) {
		List<StoreWeeklyMarkdownDtl> markdownList = null;
		List<StoreWeeklyMarkdownDtl> duplicate = null;

		try {
			ParameterizedTypeReference<ServiceResponse<StoreWeeklyMarkdownDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<StoreWeeklyMarkdownDtl>>() {
			};
			markdownList = invokeService(param, storeWeeklyMarkdownURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			if (markdownList == null /*
									 * || (markdownList != null &&
									 * markdownList.size() == 1 &&
									 * PosReportConstantsInterfaces.NO_DATA_FOUND
									 * .equalsIgnoreCase(markdownList
									 * .get(0).getNoDataFound()))
									 */) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				duplicate = processStoreWeeklyMrkDwnList(markdownList);
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.writeToFile("c:\\StoreWeeklyMrkDwn.ser",
				// markdownList);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(duplicate, param.getMsg());

	}

	public ByteArrayOutputStream getStoreWeeklyMarkdownJasper(
			StoreWeeklyMarkdownParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<StoreWeeklyMarkdownDtl> markdownList = null;
		List<StoreWeeklyMarkdownDtl> duplicate = null;

		try {
			markdownList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT,
					StoreWeeklyMarkdownDtl.class);
			if (markdownList == null) {
				ParameterizedTypeReference<ServiceResponse<StoreWeeklyMarkdownDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<StoreWeeklyMarkdownDtl>>() {
				};
				markdownList = invokeService(param, storeWeeklyMarkdownURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (markdownList == null /*
									 * || (markdownList != null &&
									 * markdownList.size() == 1 &&
									 * PosReportConstantsInterfaces.NO_DATA_FOUND
									 * .equalsIgnoreCase(markdownList
									 * .get(0).getNoDataFound()))
									 */) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				duplicate = processStoreWeeklyMrkDwnList(markdownList);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getStoreWeeklyMrkDwnAttr());
				if (comparator != null && duplicate != null) {
					Collections.sort(duplicate, comparator);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				duplicate);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getWeekToDateHide());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());
		reportInputParams.put("msg", param.getMsg());

		// param.setPrintReportFormat("PDF");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	private List<StoreWeeklyMarkdownDtl> processStoreWeeklyMrkDwnList(
			List<StoreWeeklyMarkdownDtl> markdownList) {
		List<StoreWeeklyMarkdownDtl> duplicate = CommonUtils
				.getCopyOfBeanList(markdownList);
		Map<String, StoreWeeklyMarkdownDtl> map = new LinkedHashMap<String, StoreWeeklyMarkdownDtl>();
		for (StoreWeeklyMarkdownDtl storeWeeklyMarkdownDtl : duplicate) {
			String key = storeWeeklyMarkdownDtl.getDepartmentNumber() + " "
					+ storeWeeklyMarkdownDtl.getDepartment();
			StoreWeeklyMarkdownDtl mapObj = map.get(key);
			if (mapObj != null) {
				mapObj.aggregate(storeWeeklyMarkdownDtl);
			} else {
				map.put(key, storeWeeklyMarkdownDtl);
			}
		}
		duplicate = new ArrayList<StoreWeeklyMarkdownDtl>(map.values());
		return duplicate;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof StoreWeeklyMarkdownParam) {
			StoreWeeklyMarkdownParam param = (StoreWeeklyMarkdownParam) params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getWeekFromDateHide());
			map.put("ZV_TDATE_IM",
					(CommonUtils.isNullEmptyWhiteSpace(param
							.getWeekToDateHide()) ? param.getWeekFromDateHide()
							: param.getWeekToDateHide()));
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
			if ("departmentNumber".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				String departmentNumberAttr = (String) super
						.getObjectAttributeValue(o1);

				comAttr.setFirstObjectAttribute(getDepartment(departmentNumberAttr));

				departmentNumberAttr = (String) super
						.getObjectAttributeValue(o2);

				comAttr.setSecondObjectAttribute(getDepartment(departmentNumberAttr));

				return comAttr;
			} else if ("total".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();
				double o1StaffDiscount = getAttrDblVal(o1, "staffDiscount");
				double o1Loyalty = getAttrDblVal(o1, "loyalty");
				double o1Promotions = getAttrDblVal(o1, "promotions");
				double o1PriceOverrideRTC = getAttrDblVal(o1,
						"priceOverrideRTC");
				double o1ScanningPolicy= getAttrDblVal(o1,
						"scanningPolicy");
				double o1Clearance = getAttrDblVal(o1, "clearance");
				double o1Advertisements = getAttrDblVal(o1, "advertisements");
				double o1Deleted = getAttrDblVal(o1, "deleted");
				double o1OutOfDate = getAttrDblVal(o1, "outOfDate");

				double o1Theft = getAttrDblVal(o1, "theft");
				double o1StockWriteOff = getAttrDblVal(o1, "stockWriteOff");
				double o1DamagedStock = getAttrDblVal(o1, "damagedStock");
				double o1Comp = getAttrDblVal(o1, "comp");

				double o1SpecialActivity = getAttrDblVal(o1, "specialActivity");
				double o1Total = o1StaffDiscount + o1Loyalty + o1Promotions
						+ o1PriceOverrideRTC + o1Clearance + o1Advertisements + o1ScanningPolicy
						+ o1Deleted + o1OutOfDate + o1Theft + o1StockWriteOff
						+ o1DamagedStock + o1Comp + o1SpecialActivity;
				comAttr.setFirstObjectAttribute(Double.toString(o1Total));

				double o2StaffDiscount = getAttrDblVal(o2, "staffDiscount");
				double o2Loyalty = getAttrDblVal(o2, "loyalty");
				double o2Promotions = getAttrDblVal(o2, "promotions");
				double o2PriceOverrideRTC = getAttrDblVal(o2,
						"priceOverrideRTC");

				double o2Clearance = getAttrDblVal(o2, "clearance");
				double o2Advertisements = getAttrDblVal(o2, "advertisements");
				double o2Deleted = getAttrDblVal(o2, "deleted");
				double o2OutOfDate = getAttrDblVal(o2, "outOfDate");
				double o2ScanningPolicy = getAttrDblVal(o2, "scanningPolicy");
				double o2Theft = getAttrDblVal(o2, "theft");
				double o2StockWriteOff = getAttrDblVal(o2, "stockWriteOff");
				double o2DamagedStock = getAttrDblVal(o2, "damagedStock");
				double o2Comp = getAttrDblVal(o2, "comp");

				double o2SpecialActivity = getAttrDblVal(o2, "specialActivity");

				double o2Total = o2StaffDiscount + o2Loyalty + o2Promotions
						+ o2PriceOverrideRTC + o2Clearance + o2Advertisements + o2ScanningPolicy
						+ o2Deleted + o2OutOfDate + o2Theft + o2StockWriteOff
						+ o2DamagedStock + o2Comp + o2SpecialActivity;
				comAttr.setSecondObjectAttribute(Double.toString(o2Total));

				return comAttr;
			} else if ("totalAftrDfrdLylt".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();
				double o1StaffDiscount = getAttrDblVal(o1, "staffDiscount");
				double o1Loyalty = getAttrDblVal(o1, "loyalty");
				double o1Promotions = getAttrDblVal(o1, "promotions");
				double o1PriceOverrideRTC = getAttrDblVal(o1,
						"priceOverrideRTC");

				double o1Clearance = getAttrDblVal(o1, "clearance");
				double o1Advertisements = getAttrDblVal(o1, "advertisements");
				double o1Deleted = getAttrDblVal(o1, "deleted");
				double o1OutOfDate = getAttrDblVal(o1, "outOfDate");
				double o1ScanningPolicy= getAttrDblVal(o1,
						"scanningPolicy");
				double o1Theft = getAttrDblVal(o1, "theft");
				double o1StockWriteOff = getAttrDblVal(o1, "stockWriteOff");
				double o1DamagedStock = getAttrDblVal(o1, "damagedStock");
				double o1Comp = getAttrDblVal(o1, "comp");

				double o1SpecialActivity = getAttrDblVal(o1, "specialActivity");
				double o1DfrdLylt = getAttrDblVal(o1, "deferredLoyalty");
				double o1Total = o1StaffDiscount + o1Loyalty + o1Promotions
						+ o1PriceOverrideRTC + o1Clearance + o1Advertisements +o1ScanningPolicy
						+ o1Deleted + o1OutOfDate + o1Theft + o1StockWriteOff
						+ o1DamagedStock + o1Comp + o1SpecialActivity - o1DfrdLylt;
				comAttr.setFirstObjectAttribute(Double.toString(o1Total));

				double o2StaffDiscount = getAttrDblVal(o2, "staffDiscount");
				double o2Loyalty = getAttrDblVal(o2, "loyalty");
				double o2Promotions = getAttrDblVal(o2, "promotions");
				double o2PriceOverrideRTC = getAttrDblVal(o2,
						"priceOverrideRTC");

				double o2Clearance = getAttrDblVal(o2, "clearance");
			double o2Advertisements = getAttrDblVal(o2, "advertisements");
				double o2Deleted = getAttrDblVal(o2, "deleted");
				double o2OutOfDate = getAttrDblVal(o2, "outOfDate");

				double o2Theft = getAttrDblVal(o2, "theft");
				double o2StockWriteOff = getAttrDblVal(o2, "stockWriteOff");
				double o2DamagedStock = getAttrDblVal(o2, "damagedStock");
				double o2Comp = getAttrDblVal(o2, "comp");

				double o2SpecialActivity = getAttrDblVal(o2, "specialActivity");
				double o2DfrdLylt = getAttrDblVal(o2, "deferredLoyalty");
				double o2ScanningPolicy = getAttrDblVal(o2, "scanningPolicy");

				double o2Total = o2StaffDiscount + o2Loyalty + o2Promotions
						+ o2PriceOverrideRTC + o2Clearance + o2Advertisements+ o2ScanningPolicy
						+ o2Deleted + o2OutOfDate + o2Theft + o2StockWriteOff
						+ o2DamagedStock + o2Comp + o2SpecialActivity - o2DfrdLylt;
				comAttr.setSecondObjectAttribute(Double.toString(o2Total));

				return comAttr;
			}
			return super.inputAttribtes(o1, o2);
		}

		public String getDepartment(String departmentNumberAttr) {
			if (departmentNumberAttr != null
					&& !"#".equals(departmentNumberAttr.trim())) {
				return departmentNumberAttr.substring(1);
			} else {
				return departmentNumberAttr;
			}
		}

		public double getAttrDblVal(Object o, String attr) {
			String tmpAttr = this.getAttribute();
			this.setAttribute(attr);
			String tmpStr = (String) super.getObjectAttributeValue(o);
			double tmpDbl = 0.0;
			try {
				tmpDbl = Double.parseDouble(tmpStr);
			} catch (Exception e) {
			}
			this.setAttribute(tmpAttr);
			return tmpDbl;
		}
	}

}
