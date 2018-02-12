package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.text.DecimalFormat;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.util.Collections;
import java.util.Date;
import java.util.HashMap;
import java.util.Iterator;
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

import au.com.woolworths.portal.pos.controller.StorePerformanceController;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.model.StorePerformanceDtl;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.StorePerformancePOSParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;
import au.com.woolworths.portal.util.TimeAcumm;

public class StorePerformanceServiceImpl extends PosServiceImpl {
	@Value("${POSStorePerformanceURL}")
	private String posStorePerformanceURL;

	@Autowired
	private JasperReportUtil jasper;

	private static final Logger LOGGER = Logger
			.getLogger(StorePerformanceController.class.getName());

	public String getStorePerformance(StorePerformancePOSParam param) {
		List<StorePerformanceDtl> storePerf = null;
		List<StorePerformanceDtl> duplicate = null;
		try {
			ParameterizedTypeReference<ServiceResponse<StorePerformanceDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<StorePerformanceDtl>>() {
			};
			storePerf = invokeService(param, posStorePerformanceURL, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);
			if (storePerf == null
					|| (storePerf != null && storePerf.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(storePerf.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				duplicate = CommonUtils.getCopyOfBeanList(storePerf);
				duplicate = filterStorePerformanceList(duplicate, param);
				// ObjectWriteToNReadFromFile.writeToFile("C:\\StorePerformance.ser",
				// storePerf);
				param.setMsg(duplicate.size() + "");
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(duplicate, param.getMsg());

	}

	public ByteArrayOutputStream getStorePerformanceJasper(
			StorePerformancePOSParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<StorePerformanceDtl> storePerf = null;
		List<StorePerformanceDtl> duplicate = null;
		try {
			storePerf = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					StorePerformanceDtl.class);
			if (storePerf == null) {
				ParameterizedTypeReference<ServiceResponse<StorePerformanceDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<StorePerformanceDtl>>() {
				};
				storePerf = invokeService(param, posStorePerformanceURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (storePerf == null
					|| (storePerf != null && storePerf.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(storePerf.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				duplicate = CommonUtils.getCopyOfBeanList(storePerf);
				duplicate = filterStorePerformanceList(duplicate, param);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getStorePerformanceAttr());
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
		reportInputParams.put("dateFrom", param.getDateFrom());
		reportInputParams.put("fromTime", param.getFromTime());
		reportInputParams.put("dateTo", param.getDateTo());
		reportInputParams.put("toTime", param.getToTime());
		reportInputParams.put("storeNo", param.getSiteNo());
		reportInputParams.put("storeName", param.getSiteName());
		reportInputParams.put("msg", param.getMsg());

		// param.setPrintReportFormat("PDF");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName,
				param.getPrintReportFormat(), beanDS, reportInputParams,
				srcPath, binPath);
		return byos;
	}

	private List<StorePerformanceDtl> filterStorePerformanceList(
			List<StorePerformanceDtl> obj, StorePerformancePOSParam param) {
		SimpleDateFormat sdf = new SimpleDateFormat("dd/MM/yyyy HH:mm:ss");
		Date fromDate = null;
		Date toDate = null;
		try {
			String fromTime = param.getFromTime().split(":")[0] + ":00:00";
			String toTime = param.getToTime().split(":")[0] + ":00:00";
			fromDate = sdf.parse(param.getDateFrom() + " " + fromTime);
			toDate = sdf.parse(param.getDateTo() + " " + toTime);
		} catch (ParseException e) {
			LOGGER.error(e.getMessage(), e);
		}
		int count = 0;
		Calendar cal = Calendar.getInstance();
		SimpleDateFormat df = new SimpleDateFormat("dd/MM/yyyy");
		Iterator<StorePerformanceDtl> it = obj.iterator();

		// for (StorePerformanceDtl storePerformanceDtl : obj) {
		Date dt;
		int actualRecToDisplay = 0;
		int removedRecFromDisplay = 0;
		while (it.hasNext()) {
			StorePerformanceDtl storePerformanceDtl = it.next();
			if (storePerformanceDtl.getCalendarDayTo() != null) {
				long mSec = Long.parseLong(storePerformanceDtl
						.getCalendarDayTo().replaceAll("\\D+", ""));
				try {
					dt = df.parse(df.format(new Date(mSec)));
					cal.setTime(dt);
					try {
						cal.set(Calendar.HOUR_OF_DAY, Integer
								.parseInt(storePerformanceDtl.getTimeField()));
						if (cal.getTime().before(fromDate)
								|| cal.getTime().after(toDate)) {
							it.remove();
							removedRecFromDisplay++;
						} else {
							storePerformanceDtl.setCalendarDay(cal.getTime());
							actualRecToDisplay++;
						}
					} catch (Exception e) {
						it.remove();
						removedRecFromDisplay++;
						LOGGER.error(
								"TimeField Value : "
										+ storePerformanceDtl.getTimeField()
										+ " : " + e.getMessage());
					}
				} catch (ParseException e) {
					LOGGER.error(e.getMessage()+ " "+storePerformanceDtl.getTimeField());
					dt = null;
				}
			}
			if (storePerformanceDtl.getCalendarDayFrom() != null) {
				count++;
			}
		}
		calculateTenderPcust(obj);
		LOGGER.info("actualRecToDisplay : " + actualRecToDisplay
				+ " removedRecFromDisplay : " + removedRecFromDisplay
				+ " AOCALDAY : " + count);
		Map<String, StorePerformanceDtl> map = new LinkedHashMap<String, StorePerformanceDtl>();
		for (StorePerformanceDtl storePerformanceDtl : obj) {
			// LOGGER.info(">"+new
			// SimpleDateFormat("dd/MM/yyyy HH:mm:ss").format(storePerformanceDtl.getCalendarDay())+"<"+storePerformanceDtl.getTimeField());
			if (map.get(storePerformanceDtl.getTimeField()) != null) {
				StorePerformanceDtl dest = map.get(storePerformanceDtl
						.getTimeField());
				aggregateStorePerformance(dest, storePerformanceDtl);
			} else {
				map.put(storePerformanceDtl.getTimeField(), storePerformanceDtl);
			}
		}
		List<StorePerformanceDtl> tmp = new ArrayList<StorePerformanceDtl>();

		for (Map.Entry<String, StorePerformanceDtl> entry : map.entrySet()) {
			tmp.add(entry.getValue());
		}
		// response.getStorePerformanceResponseHelper().setStorePerformanceDtl(tmp);

		if (actualRecToDisplay == 0) {
			param.setMsg(Constants.NDF);
		}
		return tmp;
	}

	private void calculateTenderPcust(List<StorePerformanceDtl> obj) {
		//long activePos = 0;
		long transCount = 0;
		for (StorePerformanceDtl bn : obj) {
			if (!"#".equalsIgnoreCase(bn.getTenderP_CustFormatted())
					//&& !"#".equalsIgnoreCase(bn.getActivePOSTerminal())
					//&& !"#".equalsIgnoreCase(bn.getTransCount())
					) {
//				activePos = (long) Double
//						.parseDouble(bn.getActivePOSTerminal());
				transCount = (long) Double.parseDouble(bn.getTransCount());
				TimeAcumm tmp = new TimeAcumm(bn.getTenderP_CustFormatted());
//				tmp.divideBy(activePos);
				tmp.divideBy(transCount);
				bn.setTenderP_CustFormatted(tmp.toString());
			}
		}
	}

	private void aggregateStorePerformance(StorePerformanceDtl dest,
			StorePerformanceDtl source) {
		dest.setActivePOSTerminal(""
				+ (Double.parseDouble((dest.getActivePOSTerminal() == null ? "0"
						: dest.getActivePOSTerminal())) + Double.parseDouble((source
						.getActivePOSTerminal() == null ? "0" : source
						.getActivePOSTerminal()))));
		dest.setSalesRetailincT(""
				+ (Double.parseDouble((dest.getSalesRetailincT() == null ? "0"
						: dest.getSalesRetailincT())) + Double
						.parseDouble((source.getSalesRetailincT() == null ? "0"
								: source.getSalesRetailincT()))));
		/*
		 * dest.setAvgTrans("" + (Double.parseDouble((dest.getAvgTrans() == null
		 * ? "0" : dest .getAvgTrans())) + Double.parseDouble((source
		 * .getAvgTrans() == null ? "0" : source.getAvgTrans()))));
		 */

		dest.setArticlesScannedPerRegPerMin(""
				+ (Double
						.parseDouble((dest.getArticlesScannedPerRegPerMin() == null ? "0"
								: dest.getArticlesScannedPerRegPerMin())) + Double
						.parseDouble((source.getArticlesScannedPerRegPerMin() == null ? "0"
								: source.getArticlesScannedPerRegPerMin()))));
		dest.setTenderP_CustFormatted(new TimeAcumm(dest
				.getTenderP_CustFormatted()).incrementFromFormattedString(
				source.getTenderP_CustFormatted()).toString());
		dest.setIdleTimeFormatted(new TimeAcumm(dest.getIdleTimeFormatted())
				.incrementFromFormattedString(source.getIdleTimeFormatted())
				.toString());
		dest.setSercureTimeFormatted(new TimeAcumm(dest
				.getSercureTimeFormatted()).incrementFromFormattedString(
				source.getSercureTimeFormatted()).toString());

		dest.setTransCount(""
				+ (Double.parseDouble((dest.getTransCount() == null ? "0"
						: dest.getTransCount())) + Double.parseDouble((source
						.getTransCount() == null ? "0" : source.getTransCount()))));
		dest.setItemScannedCount(""
				+ (Double.parseDouble((dest.getItemScannedCount() == null ? "0"
						: dest.getItemScannedCount())) + Double.parseDouble((source
						.getItemScannedCount() == null ? "0" : source
						.getItemScannedCount()))));
		/*
		 * dest.setAvgPrice("" + (Double.parseDouble((dest.getAvgPrice() == null
		 * ? "0" : dest .getAvgPrice())) + Double.parseDouble((source
		 * .getAvgPrice() == null ? "0" : source.getAvgPrice()))));
		 */
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof StorePerformancePOSParam) {
			StorePerformancePOSParam param = (StorePerformancePOSParam) params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("VAR_20120111032926", param.getDateFrom() + " "
					+ Constants.START_TIME);
			map.put("VAR_20120111033035", param.getDateTo() + " "
					+ Constants.END_TIME);
			map.put("VAR_20111208223707", param.getSiteNo());

			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("VAR_20120111032926");
			mandatoryParams.add("VAR_20120111033035");
			mandatoryParams.add("VAR_20111208223707");

			List<String> dateParams = new ArrayList<String>();
			dateParams.add("VAR_20120111032926");
			dateParams.add("VAR_20120111033035");

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
			if ("timeField".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				String tmpTime = (String) super.getObjectAttributeValue(o1);

				comAttr.setFirstObjectAttribute(formatTime(tmpTime));

				tmpTime = (String) super.getObjectAttributeValue(o2);

				comAttr.setSecondObjectAttribute(formatTime(tmpTime));

				return comAttr;
			} else if ("avgPrice".equals(this.getAttribute())) {
				String tmpAttr = this.getAttribute();
				CompareAttributes comAttr = new CompareAttributes();

				this.setAttribute("salesRetailincT");
				String totalSales1 = (String) super.getObjectAttributeValue(o1);
				String totalSales2 = (String) super.getObjectAttributeValue(o2);

				this.setAttribute("itemScannedCount");
				String artcl1 = (String) super.getObjectAttributeValue(o1);
				String artcl2 = (String) super.getObjectAttributeValue(o2);

				comAttr.setFirstObjectAttribute(new Double(
						(CommonUtils.isNumeric(artcl1) && Double
								.parseDouble(artcl1) != 0.0) ? Double
								.parseDouble(totalSales1)
								/ Double.parseDouble(artcl1) : 0.0));
				comAttr.setSecondObjectAttribute(new Double(
						(CommonUtils.isNumeric(artcl2) && Double
								.parseDouble(artcl2) != 0.0) ? Double
								.parseDouble(totalSales2)
								/ Double.parseDouble(artcl2) : 0.0));

				this.setAttribute(tmpAttr);
				return comAttr;
			} else if ("avgTrans".equals(this.getAttribute())) {
				String tmpAttr = this.getAttribute();
				CompareAttributes comAttr = new CompareAttributes();

				this.setAttribute("salesRetailincT");
				String totalSales1 = (String) super.getObjectAttributeValue(o1);
				String totalSales2 = (String) super.getObjectAttributeValue(o2);

				this.setAttribute("transCount");
				String trans1 = (String) super.getObjectAttributeValue(o1);
				String trans2 = (String) super.getObjectAttributeValue(o2);

				comAttr.setFirstObjectAttribute(new Double(
						(CommonUtils.isNumeric(trans1) && Double
								.parseDouble(trans1) != 0.0) ? Double
								.parseDouble(totalSales1)
								/ Double.parseDouble(trans1) : 0.0));
				comAttr.setSecondObjectAttribute(new Double(
						(CommonUtils.isNumeric(trans2) && Double
								.parseDouble(trans2) != 0.0) ? Double
								.parseDouble(totalSales2)
								/ Double.parseDouble(trans2) : 0.0));

				this.setAttribute(tmpAttr);
				return comAttr;
			}
			return super.inputAttribtes(o1, o2);
		}

		public String formatTime(String time) {
			return time == null || "#".equals(time) ? "0000-0000"
					: new DecimalFormat("00").format(Integer.parseInt(time))
							+ "00-"
							+ new DecimalFormat("00").format(Integer
									.parseInt(time) + 1) + "00";
		}
	}

}
