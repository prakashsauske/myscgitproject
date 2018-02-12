package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.text.DecimalFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.concurrent.CompletionService;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.ExecutorCompletionService;
import java.util.concurrent.ExecutorService;
import java.util.concurrent.Executors;
import java.util.concurrent.Future;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.ArticleSoldByDeptBean;
import au.com.woolworths.portal.pos.model.DepartmentSalesTaxDtl;
import au.com.woolworths.portal.pos.model.POSStarArticleVoidItemDtl;
import au.com.woolworths.portal.pos.model.POSStarArticleVoidTransactionDtl;
import au.com.woolworths.portal.pos.model.POSStarNoSalesDtl;
import au.com.woolworths.portal.pos.model.POSStarRefundDtl;
import au.com.woolworths.portal.pos.model.POSStarSavedTransactionDtl;
import au.com.woolworths.portal.pos.model.PriceInquiryBean;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.model.StaffDiscountBean;
import au.com.woolworths.portal.pos.model.StarPriceMarkDownBean;
import au.com.woolworths.portal.pos.model.StarReportDtl;
import au.com.woolworths.portal.pos.model.StarStaffBean;
import au.com.woolworths.portal.pos.model.StarStatisticsBean;
import au.com.woolworths.portal.pos.model.StarStoreBean;
import au.com.woolworths.portal.pos.model.StarStoreIndividualBean;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.StarReportParam;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CallableTask;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.ReflectionUtil;

import com.google.common.base.Joiner;

public class StarReportServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	@Value("${POSStarArticleVoidTransactionURL}")
	private String posStarArticleVoidTransactionURL;

	@Value("${POSStarArticleTransactionURL}")
	private String posStarArticleTransactionURL;

	@Value("${POSStarReportDtlURL}")
	private String posStarReportDtlURL;

	@Value("${POSStarRefundsURL}")
	private String posStarRefundsURL;

	@Value("${POSPriceMarkdownURL}")
	private String posPriceMarkDownURL;

	@Value("${POSStarNoSalesTransactionURL}")
	private String posStarNoSalesTransactionURL;

	@Value("${POSStarSavedTransactionURL}")
	private String posStarSavedTransactionURL;

	@Value("${POSDepartmentSalesTaxURL}")
	private String posDepartmentSalesTaxURL;

	@Value("${POSStarPriceInquiry}")
	private String POSStarPriceInquiry;

	@Value("${POSStarStaffCard}")
	private String POSStarStaffCard;

	@Value("${POSStarDeptSale}")
	private String POSStarDeptSale;
	
	@Value("#{properties['StarStaffRpt']}")
	private String StarStaffRpt = null;
	
	@Value("#{properties['StarStoreRpt']}")
	private String StarStoreRpt = null;

	private static final String stringFormatter = "\"%1$2s\": {\"%1$2s\":%2$2s,\"msg\":\"%3$2s\"}";

	private static final Logger LOGGER = Logger
			.getLogger(StarReportServiceImpl.class.getName());

	public String getStarReport(StarReportParam param) {
		List<String> resp = new ArrayList<String>();
		long startTime = System.currentTimeMillis();
		Map<String, StarReportParam> map = new LinkedHashMap<String, StarReportParam>();
		StarReportParam params = null;
		try {
			params = new StarReportParam();
			ReflectionUtil.copy(params, param);
			map.put("getPOSOperatorDetails", params);

			if ("Store".equalsIgnoreCase(param.getPerformance())
					|| "Both".equalsIgnoreCase(param.getPerformance())) {
				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getPriceMarkdownDetails", params);

				/*
				 * params = new StarReportParam(); ReflectionUtil.copy(params,
				 * param); map.put("getStatisticsSummaryDetails", params);
				 */

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getDepartmentSalesTaxDetails", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getNoSalesDetails", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getSavedTransactionDetails", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getVoidDetails", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getVoidItemDetails", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getRefundDetails", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getPriceInquiry", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getStaffDiscount", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getArticleSoldByDept", params);
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}

		ExecutorService taskExecutor = Executors.newFixedThreadPool(3);
		CompletionService<List<String>> taskCompletionService = new ExecutorCompletionService<List<String>>(
				taskExecutor);
		for (Map.Entry<String, StarReportParam> entry : map.entrySet()) {
			String taskName = entry.getKey();
			Class<?> parameterTypes[] = new Class[2];
			parameterTypes[0] = StarReportParam.class;
			parameterTypes[1] = String.class;
			Object parameterObjects[] = new Object[2];
			parameterObjects[0] = entry.getValue();
			parameterObjects[1] = PosReportConstantsInterfaces.GENERATE_RPT;
			taskCompletionService.submit(new CallableTask<List<String>>(
					taskName, this, parameterTypes, parameterObjects));

		}
		for (int tasksHandled = 0; tasksHandled < map.size(); tasksHandled++) {
			try {
				LOGGER.info("trying to take from Completion service");
				Future<List<String>> res = taskCompletionService.take();
				List<String> tmp = res.get();
				resp.addAll(tmp);
			} catch (InterruptedException e) {
				// Something went wrong with a task submitted
				LOGGER.error("Error Interrupted exception", e);
			} catch (ExecutionException e) {
				// Something went wrong with the result
				LOGGER.error("Error get() threw exception", e);
			}
		}
		taskExecutor.shutdown();

		long endTime = System.currentTimeMillis();
		LOGGER.info("" + (((double) endTime - (double) startTime) / 1000)
				+ " Seconds");
		String responseStr = "{" + Joiner.on(",").join(resp) + "}";
		// LOGGER.info(responseStr);

		return responseStr;

	}
	
	@SuppressWarnings("unchecked")
	public ByteArrayOutputStream getStarReportJasper(StarReportParam param, String srcPath,
			String binPath, HttpServletRequest request) throws Throwable {
		List<Object> resp = new ArrayList<Object>();
		Map<String, StarReportParam> map = new LinkedHashMap<String, StarReportParam>();
		StarReportParam params = null;
		try {
			params = new StarReportParam();
			ReflectionUtil.copy(params, param);
			map.put("getPOSOperatorDetailsPdf", params);

			if ("Store".equalsIgnoreCase(param.getPerformance())
					|| "Both".equalsIgnoreCase(param.getPerformance())) {
				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getPriceMarkdownDetailsPdf", params);

				/*
				 * params = new StarReportParam(); ReflectionUtil.copy(params,
				 * param); map.put("getStatisticsSummaryDetailsPdf", params);
				 */

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getDepartmentSalesTaxDetailsPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getNoSalesDetailsPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getSavedTransactionDetailsPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getVoidDetailsPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getVoidItemDetailsPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getRefundDetailsPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getPriceInquiryPdf", params);

				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getStaffDiscountPdf", params);


				params = new StarReportParam();
				ReflectionUtil.copy(params, param);
				map.put("getArticleSoldByDeptPdf", params);
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}

		ExecutorService taskExecutor = Executors.newFixedThreadPool(3);
		CompletionService<List<?>> taskCompletionService = new ExecutorCompletionService<List<?>>(
				taskExecutor);
		for (Map.Entry<String, StarReportParam> entry : map.entrySet()) {
			String taskName = entry.getKey();
			Class<?> parameterTypes[] = new Class[2];
			parameterTypes[0] = StarReportParam.class;
			parameterTypes[1] = String.class;
			Object parameterObjects[] = new Object[2];
			parameterObjects[0] = entry.getValue();
			parameterObjects[1] = PosReportConstantsInterfaces.PRINT_RPT;
			taskCompletionService.submit(new CallableTask<List<?>>(taskName,
					this, parameterTypes, parameterObjects));

		}
		for (int tasksHandled = 0; tasksHandled < map.size(); tasksHandled++) {
			try {
				LOGGER.info("trying to take from Completion service");
				Future<List<?>> res = taskCompletionService.take();
				List<?> tmp = res.get();
				resp.addAll(tmp);
			} catch (InterruptedException e) {
				// Something went wrong with a task submitted
				LOGGER.error("Error Interrupted exception", e);
			} catch (ExecutionException e) {
				// Something went wrong with the result
				LOGGER.error("Error get() threw exception", e);
			}
		}
		taskExecutor.shutdown();

		List<StarStoreIndividualBean> storeBeans = new ArrayList<StarStoreIndividualBean>();
		List<StarStaffBean> staffBeans = new ArrayList<StarStaffBean>();
		List<DepartmentSalesTaxDtl> dept = null;
		List<StarStatisticsBean> lstBn = new ArrayList<StarStatisticsBean>();
		List<StarStatisticsBean> firstList = null;
		List<StarStatisticsBean> secondList = null;
		for (Object object : resp) {
			if (object instanceof StarStoreIndividualBean) {
				StarStoreIndividualBean t = (StarStoreIndividualBean) object;
				if (t.getJasperName() != null) {
					storeBeans.add(t);
				} else {
					List<?> tmp = t.getReportData();
					if (tmp != null && tmp.size() > 0
							&& tmp.get(0) instanceof DepartmentSalesTaxDtl) {
						dept = (List<DepartmentSalesTaxDtl>) t.getReportData();
						getDeptSaleTax(dept, lstBn);
					}
				}
			} else if (object instanceof StarStaffBean) {
				StarStaffBean t = (StarStaffBean) object;
				if (!"StarStatistics".equals(t.getReportFor())) {
					staffBeans.add(t);
				} else {
					getStarStatistics(t.getLeadingList(), lstBn);
				}
			}
		}
		// List<JRBeanCollectionDataSource> beanDSLst = new
		// ArrayList<JRBeanCollectionDataSource>();
		// List<String> strLst = new ArrayList<String>();
		List<JasperParamsBean> jasperParamList = new ArrayList<JasperParamsBean>();
		// report input Params
		Map<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("dateFrom", param.getDateFrom());
		reportInputParams.put("dateTo", param.getDateTo());
		reportInputParams.put("msg", param.getMsg());
		reportInputParams.put("storeName", param.getSiteName());
		reportInputParams.put("storeNo", param.getSiteNo());
		reportInputParams.put("type", param.getPerformance());
		reportInputParams.put("staffNoOfRecords", param.getStaffNoOfRecs());
		reportInputParams.put("storeNoOfRecords", param.getStoreNoOfRecs());
		if ("Staff".equalsIgnoreCase(param.getPerformance())
				|| "Both".equalsIgnoreCase(param.getPerformance())) {
			Collections.sort(staffBeans, new Comparator<StarStaffBean>() {
				@Override
				public int compare(StarStaffBean o1, StarStaffBean o2) {
					return o1.getOrdinalValue() - o2.getOrdinalValue();
				}
			});
			jasperParamList.add(new JasperParamsBean(StarStaffRpt,
					new JRBeanCollectionDataSource(staffBeans),
					reportInputParams, 1));
		}
		if (("Store".equalsIgnoreCase(param.getPerformance()) || "Both"
				.equalsIgnoreCase(param.getPerformance()))
				&& lstBn != null && !lstBn.isEmpty()) {
			int siz = lstBn.size();
			Collections.sort(lstBn, new Comparator<StarStatisticsBean>() {
				@Override
				public int compare(StarStatisticsBean o1, StarStatisticsBean o2) {
					return o1.getOrdinalValue() - o2.getOrdinalValue();
				}
			});
			if (siz <= 7) {
				firstList = lstBn.subList(0, siz);
			} else {
				firstList = lstBn.subList(0, 7);
				secondList = lstBn.subList(7, siz);
			}
			if (storeBeans != null && storeBeans.size() % 2 == 1 && siz > 7) {
				StarStoreIndividualBean bn = new StarStoreIndividualBean();
				bn.setJasperName("StarStats.jasper");
				bn.setOrdinalValue(11);
				bn.setReportData(null);
				storeBeans.add(bn);
			}
			if (firstList != null && !firstList.isEmpty()) {
				StarStoreIndividualBean bn = new StarStoreIndividualBean();
				bn.setJasperName("StarStats.jasper");
				bn.setOrdinalValue(12);
				bn.setReportData(firstList);
				bn.setDisplayHeading(true);
				storeBeans.add(bn);
			}
			if (secondList != null && !secondList.isEmpty()) {
				StarStoreIndividualBean bn = new StarStoreIndividualBean();
				bn.setJasperName("StarStats.jasper");
				bn.setOrdinalValue(13);
				bn.setReportData(secondList);
				storeBeans.add(bn);
			}
			Collections.sort(storeBeans,
					new Comparator<StarStoreIndividualBean>() {
						@Override
						public int compare(StarStoreIndividualBean o1,
								StarStoreIndividualBean o2) {
							return o1.getOrdinalValue() - o2.getOrdinalValue();
						}
					});
			List<StarStoreBean> beanList = new ArrayList<StarStoreBean>();
			ListIterator<StarStoreIndividualBean> itr = storeBeans
					.listIterator();
			StarStoreIndividualBean starStoreIndividualBean = null;
			StarStoreBean bean = null;
			while (itr.hasNext()) {
				bean = new StarStoreBean();
				starStoreIndividualBean = itr.next();
				bean.setLeftSideTable(starStoreIndividualBean);
				if (itr.hasNext()) {
					starStoreIndividualBean = itr.next();
					bean.setRightSideTable(starStoreIndividualBean);
				}
				beanList.add(bean);
			}
			jasperParamList
					.add(new JasperParamsBean(StarStoreRpt,
							new JRBeanCollectionDataSource(beanList),
							reportInputParams, 2));
		}
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(jasperParamList, param.getPrintReportFormat(), srcPath, binPath);
		return byos;

	}

	public List<String> getPOSOperatorDetails(StarReportParam param,
			String action) {
		List<String> list = new ArrayList<String>();
		List<StarReportDtl> starReportOperatorDtlList = null;
		List<StarReportDtl> duplicateList = null;
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				starReportOperatorDtlList = getSessionCachePrintData(action,
						StarReportDtl.class);
			}
			if (starReportOperatorDtlList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<StarReportDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<StarReportDtl>>() {
				};
				starReportOperatorDtlList = invokeService(param, posStarReportDtlURL, typeRef,
						action);
			}
			if (starReportOperatorDtlList == null
					|| (starReportOperatorDtlList != null
							&& starReportOperatorDtlList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(starReportOperatorDtlList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				if ("Staff".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posOperatorList", null, param));
					list
							.add(Constants.formatToJsonResponseString(
									stringFormatter, "posOperatorOppList",
									null, param));
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posTenderingTimeList", null,
							param));
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posTenderingTimeOppList", null,
							param));
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posCashOutList", null, param));
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posCashOutOppList", null, param));
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posEDRList", null, param));
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "posEDROppList", null, param));
				}
				if ("Store".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "statisticsList",
							starReportOperatorDtlList, param));
				}
			} else {
				// param.setMsg("");
				if ("Staff".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroScannerFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("articlesPerMinute,java_double,desc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posOperatorList",
								duplicateList, param));

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("articlesPerMinute,java_double,asc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posOperatorOppList",
								duplicateList, param));
					} else {
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posOperatorList",
								duplicateList, param));
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posOperatorOppList",
								duplicateList, param));
					}
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroTenderingFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("tenderingTime,java_double,asc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posTenderingTimeList",
								duplicateList, param));

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("tenderingTime,java_double,desc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posTenderingTimeOppList",
								duplicateList, param));
					} else {
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posTenderingTimeList",
								duplicateList, param));
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posTenderingTimeOppList",
								duplicateList, param));
					}
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroCashOutAmountFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("cashOutAmount,java_double,desc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posCashOutList",
								duplicateList, param));

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("cashOutAmount,java_double,asc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posCashOutOppList",
								duplicateList, param));
					} else {
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posCashOutList",
								duplicateList, param));
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posCashOutOppList",
								duplicateList, param));
					}
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroEdrFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("percentageEDR,java_double,desc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posEDRList", duplicateList,
								param));

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("percentageEDR,java_double,asc,last");
						Collections.sort(duplicateList, sort);
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posEDROppList",
								duplicateList, param));
					} else {
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posEDRList", duplicateList,
								param));
						list.add(Constants.formatToJsonResponseString(
								stringFormatter, "posEDROppList",
								duplicateList, param));
					}
				}
				if ("Store".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					list.add(Constants.formatToJsonResponseString(
							stringFormatter, "statisticsList",
							starReportOperatorDtlList, param));
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
			list.add(Constants.formatToJsonResponseString(stringFormatter,
					"posOperatorList", null, param));
		}
		return list;
	}

	public List<String> getPriceMarkdownDetails(StarReportParam param,
			String action) {
		List<StarPriceMarkDownBean> priceMarkdownDetailList = null;
		List<String> list = new ArrayList<String>();
		List<StarPriceMarkDownBean> lst = null;
		Map<String, StarPriceMarkDownBean> map = new HashMap<String, StarPriceMarkDownBean>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				priceMarkdownDetailList = getSessionCachePrintData(action,
						StarPriceMarkDownBean.class);
			}
			if (priceMarkdownDetailList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<StarPriceMarkDownBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<StarPriceMarkDownBean>>() {
				};
				priceMarkdownDetailList = invokeService(param, posPriceMarkDownURL, typeRef, 
						action);
			}
			if (priceMarkdownDetailList == null
					|| (priceMarkdownDetailList != null
							&& priceMarkdownDetailList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(priceMarkdownDetailList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				list.add(Constants.formatToJsonResponseString(stringFormatter,
						"priceMarkDownList", null, param));
			} else {
				StarPriceMarkDownBean tmpObj = null;
				for (StarPriceMarkDownBean obj : priceMarkdownDetailList) {
					obj.setCashName(obj.getCashierFirstName() + " "
							+ obj.getCashierLastName());
					if (map.containsKey(obj.getCashName())) {
						tmpObj = map.get(obj.getCashName());
						tmpObj.add(obj);
					} else {
						tmpObj = new StarPriceMarkDownBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashName(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<StarPriceMarkDownBean>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("priceDifference,double,desc,last");
						Collections.sort(lst, comp);
						
					}
					
				}
			}
			
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"priceMarkDownList", lst, param));
		return list;
	}

	public List<String> getDepartmentSalesTaxDetails(StarReportParam param,
			String action) {
		List<String> list = new ArrayList<String>();
		List<DepartmentSalesTaxDtl> departmentSalesTax = null;
		try {

			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				departmentSalesTax = getSessionCachePrintData(action,
						DepartmentSalesTaxDtl.class);
			}
			if (departmentSalesTax == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>>() {
				};
				departmentSalesTax = invokeService(param, posDepartmentSalesTaxURL, typeRef, action);
			}
			if (departmentSalesTax == null
					|| (departmentSalesTax != null
							&& departmentSalesTax.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(departmentSalesTax.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"departmentSalesTax", departmentSalesTax, param));
		return list;

	}

	public List<String> getNoSalesDetails(StarReportParam param, String action) {
		List<String> list = new ArrayList<String>();
		List<POSStarNoSalesDtl> noSalesDetailsList = null;
		List<POSStarNoSalesDtl> lst = null;
		Map<String, POSStarNoSalesDtl> map = new HashMap<String, POSStarNoSalesDtl>();

		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				noSalesDetailsList = getSessionCachePrintData(action,
						POSStarNoSalesDtl.class);
			}
			if (noSalesDetailsList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarNoSalesDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarNoSalesDtl>>() {
				};
				noSalesDetailsList = invokeService(param, posStarNoSalesTransactionURL, typeRef, action);
			}
			if (noSalesDetailsList == null
					|| (noSalesDetailsList != null
							&& noSalesDetailsList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(noSalesDetailsList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				POSStarNoSalesDtl tmpObj = null;
				for (POSStarNoSalesDtl obj : noSalesDetailsList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarNoSalesDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarNoSalesDtl>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("salesUnit,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"noSalesList", lst, param));
		return list;
	}

	public List<String> getSavedTransactionDetails(StarReportParam param,
			String action) {
		List<String> list = new ArrayList<String>();
		List<POSStarSavedTransactionDtl> savedTransactionList = null;
		List<POSStarSavedTransactionDtl> lst = null;
		Map<String, POSStarSavedTransactionDtl> map = new HashMap<String, POSStarSavedTransactionDtl>();

		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				savedTransactionList = getSessionCachePrintData(action,
						POSStarSavedTransactionDtl.class);
			}
			if (savedTransactionList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarSavedTransactionDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarSavedTransactionDtl>>() {
				};
				savedTransactionList = invokeService(param, posStarSavedTransactionURL, typeRef, 
						action);
			}
			if (savedTransactionList == null
					|| (savedTransactionList != null
							&& savedTransactionList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(savedTransactionList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				POSStarSavedTransactionDtl tmpObj = null;
				for (POSStarSavedTransactionDtl obj : savedTransactionList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarSavedTransactionDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarSavedTransactionDtl>(map
							.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("savedTransactionAmount,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"savedTransList", lst, param));
		return list;

	}

	public List<String> getVoidDetails(StarReportParam param, String action) {
		List<String> list = new ArrayList<String>();
		List<POSStarArticleVoidTransactionDtl> articleVoidTransactionList = null;
		List<POSStarArticleVoidTransactionDtl> lst = null;
		Map<String, POSStarArticleVoidTransactionDtl> map = new HashMap<String, POSStarArticleVoidTransactionDtl>();

		try {

			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleVoidTransactionList = getSessionCachePrintData(action,
						POSStarArticleVoidTransactionDtl.class);
			}
			if (articleVoidTransactionList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidTransactionDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidTransactionDtl>>() {
				};
				articleVoidTransactionList = invokeService(param, posStarArticleVoidTransactionURL, typeRef,
						action);
			}
			if (articleVoidTransactionList == null
					|| (articleVoidTransactionList != null
							&& articleVoidTransactionList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleVoidTransactionList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				POSStarArticleVoidTransactionDtl tmpObj = null;
				for (POSStarArticleVoidTransactionDtl obj : articleVoidTransactionList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarArticleVoidTransactionDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarArticleVoidTransactionDtl>(map
							.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		}

		catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"voidTransList", lst, param));
		return list;

	}

	public List<String> getVoidItemDetails(StarReportParam param, String action) {
		List<String> list = new ArrayList<String>();
		List<POSStarArticleVoidItemDtl> articleVoidItemLineList = null;
		List<POSStarArticleVoidItemDtl> lst = null;
		Map<String, POSStarArticleVoidItemDtl> map = new HashMap<String, POSStarArticleVoidItemDtl>();

		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleVoidItemLineList = getSessionCachePrintData(action,
						POSStarArticleVoidItemDtl.class);
			}
			if (articleVoidItemLineList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidItemDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidItemDtl>>() {
				};
				articleVoidItemLineList = invokeService(param, posStarArticleTransactionURL, typeRef, action);
			}
			if (articleVoidItemLineList == null
					|| (articleVoidItemLineList != null
							&& articleVoidItemLineList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleVoidItemLineList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				POSStarArticleVoidItemDtl tmpObj = null;
				for (POSStarArticleVoidItemDtl obj : articleVoidItemLineList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarArticleVoidItemDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarArticleVoidItemDtl>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"voidArticleList", lst, param));
		return list;

	}

	public List<String> getRefundDetails(StarReportParam param, String action) {
		List<String> list = new ArrayList<String>();
		List<POSStarRefundDtl> articleRefundList = null;
		List<POSStarRefundDtl> lst = null;
		Map<String, POSStarRefundDtl> map = new HashMap<String, POSStarRefundDtl>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleRefundList = getSessionCachePrintData(action,
						POSStarRefundDtl.class);
			}
			if (articleRefundList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarRefundDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarRefundDtl>>() {
				};
				articleRefundList = invokeService(param, posStarRefundsURL, typeRef, action);
			}
			if (articleRefundList == null
					|| (articleRefundList != null
							&& articleRefundList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleRefundList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				POSStarRefundDtl tmpObj = null;
				for (POSStarRefundDtl obj : articleRefundList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarRefundDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarRefundDtl>(map.values());
					for (POSStarRefundDtl refundDtlAggrBean : lst) {
						if (CommonUtils.getNumericVal(refundDtlAggrBean
								.getRefundItem()) < 0.0) {
							refundDtlAggrBean.setRefundItem(Math
									.abs(CommonUtils
											.getNumericVal(refundDtlAggrBean
													.getRefundItem()))
									+ "");
						}
					}
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("refundItem,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"refundList", lst, param));
		return list;
	}

	public List<String> getPriceInquiry(StarReportParam param, String action) {
		List<PriceInquiryBean> priceInquiryList = null;
		List<String> list = new ArrayList<String>();
		List<PriceInquiryBean> lst = null;
		Map<String, PriceInquiryBean> map = new HashMap<String, PriceInquiryBean>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				priceInquiryList = getSessionCachePrintData(action,
						PriceInquiryBean.class);
			}
			if (priceInquiryList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<PriceInquiryBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<PriceInquiryBean>>() {
				};
				priceInquiryList = invokeService(param, POSStarPriceInquiry, typeRef, action);
				// priceInquiryList =
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.mockPriceInquiry();
			}
			if (priceInquiryList == null
					|| (priceInquiryList != null
							&& priceInquiryList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(priceInquiryList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				PriceInquiryBean tmpObj = null;
				for (PriceInquiryBean obj : priceInquiryList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						tmpObj = new PriceInquiryBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<PriceInquiryBean>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("quantity,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"priceInquiry", lst, param));
		return list;
	}

	public List<String> getArticleSoldByDept(StarReportParam param,
			String action) {
		List<ArticleSoldByDeptBean> articleSldByDeptList = null;
		List<String> list = new ArrayList<String>();
		List<ArticleSoldByDeptBean> lst = null;
		Map<String, ArticleSoldByDeptBean> map = new HashMap<String, ArticleSoldByDeptBean>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleSldByDeptList = getSessionCachePrintData(action,
						ArticleSoldByDeptBean.class);
			}
			if (articleSldByDeptList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<ArticleSoldByDeptBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<ArticleSoldByDeptBean>>() {
				};
				articleSldByDeptList = invokeService(param, POSStarDeptSale, typeRef,
						action);
				// articleSldByDeptList =
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.mockArticleSoldByDept();
			}
			if (articleSldByDeptList == null
					|| (articleSldByDeptList != null
							&& articleSldByDeptList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleSldByDeptList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				ArticleSoldByDeptBean tmpObj = null;
				for (ArticleSoldByDeptBean obj : articleSldByDeptList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						tmpObj = new ArticleSoldByDeptBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<ArticleSoldByDeptBean>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"articleSoldByDept", lst, param));
		return list;
	}

	public List<String> getStaffDiscount(StarReportParam param, String action) {
		List<StaffDiscountBean> staffDiscountList = null;
		List<String> list = new ArrayList<String>();
		List<StaffDiscountBean> lst = null;
		Map<String, StaffDiscountBean> map = new HashMap<String, StaffDiscountBean>();
		List<StaffDiscountBean> staffDiscountListCpy = null;
		List<StaffDiscountBean> oneCardList = null;
		StarReportParam oneCardParam = new StarReportParam();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				staffDiscountList = getSessionCachePrintData(action,
						StaffDiscountBean.class);
			}
			if (staffDiscountList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<StaffDiscountBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<StaffDiscountBean>>() {
				};
				staffDiscountList = invokeService(param, POSStarStaffCard, typeRef, action);
				// staffDiscountList =
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.mockStaffDiscount();
			}
			if (staffDiscountList == null
					|| (staffDiscountList != null
							&& staffDiscountList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(staffDiscountList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				StaffDiscountBean tmpObj = null;
				for (StaffDiscountBean obj : staffDiscountList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						tmpObj = new StaffDiscountBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<StaffDiscountBean>(map.values());
					oneCardList = CommonUtils.getCopyOfBeanList(lst);
					staffDiscountListCpy = CommonUtils.getCopyOfBeanList(lst);
					if (staffDiscountListCpy != null) {
						removeOneCardFromStaffDiscount(staffDiscountListCpy);
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(staffDiscountListCpy, comp);
					}
					if (oneCardList != null) {
						removeStaffDiscountFromOneCard(oneCardList);
						if(!oneCardList.isEmpty()) {
							MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
									.getComparatorInstance("quantityOneCard,double,desc,last");
							Collections.sort(oneCardList, comp);
						}
						else {
							ReflectionUtil.copy(oneCardParam, param);
							oneCardParam.setMsg(Constants.NDF);
						}
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"staffDiscount", staffDiscountListCpy, param));
		list.add(Constants.formatToJsonResponseString(stringFormatter,
				"oneCard", oneCardList, oneCardParam));
		return list;
	}

	// ///////////////
	public void removeStaffDiscountFromOneCard(List<StaffDiscountBean> list) {
		ListIterator<StaffDiscountBean> iter = list.listIterator();
		while(iter.hasNext()) {
			StaffDiscountBean obj = iter.next();
			if(obj ==null || ((CommonUtils.isNullEmptyWhiteSpace(obj.getRepeatOneCard()) 
								|| !CommonUtils.isNumeric(obj.getRepeatOneCard()) || Double.parseDouble(obj.getRepeatOneCard())==0.0)  
					&&  (CommonUtils.isNullEmptyWhiteSpace(obj.getQuantityOneCard()) 
							|| !CommonUtils.isNumeric(obj.getQuantityOneCard()) || Double.parseDouble(obj.getQuantityOneCard())==0.0))) {
				iter.remove();
			}
		}
	}
	public void removeOneCardFromStaffDiscount(List<StaffDiscountBean> list) {
		ListIterator<StaffDiscountBean> iter = list.listIterator();
		while(iter.hasNext()) {
			StaffDiscountBean obj = iter.next();
			if(obj ==null || ((CommonUtils.isNullEmptyWhiteSpace(obj.getRepeat()) 
								|| !CommonUtils.isNumeric(obj.getRepeat()) || Double.parseDouble(obj.getRepeat())==0.0)
					&&  (CommonUtils.isNullEmptyWhiteSpace(obj.getQuantity()) 
							|| !CommonUtils.isNumeric(obj.getQuantity()) || Double.parseDouble(obj.getQuantity())==0.0)
					&&  (CommonUtils.isNullEmptyWhiteSpace(obj.getTotal()) 
							|| !CommonUtils.isNumeric(obj.getTotal()) || Double.parseDouble(obj.getTotal())==0.0)
					)) {
				iter.remove();
			}
		}
	}
	public List<StarStaffBean> getPOSOperatorDetailsPdf(StarReportParam param,
			String action) {
		List<StarStaffBean> list = new ArrayList<StarStaffBean>();
		List<StarReportDtl> starReportOperatorDtlList = null;
		List<StarReportDtl> duplicateList = null;
		List<StarReportDtl> duplicateOppList = null;
		StarStaffBean staffList = null;
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				starReportOperatorDtlList = getSessionCachePrintData(action,
						StarReportDtl.class);
			}
			if (starReportOperatorDtlList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<StarReportDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<StarReportDtl>>() {
				};
				starReportOperatorDtlList = invokeService(param, posStarReportDtlURL, typeRef,
						action);
			}
			if (starReportOperatorDtlList == null
					|| (starReportOperatorDtlList != null
							&& starReportOperatorDtlList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(starReportOperatorDtlList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				if ("Staff".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					starReportOperatorDtlList = new ArrayList<StarReportDtl>();
					setStarStaffList(starReportOperatorDtlList, param);
					staffList = new StarStaffBean();
					staffList.setReportFor("Scanning Rate");
					staffList.setLeadingList(starReportOperatorDtlList);
					staffList.setOrdinalValue(1);
					staffList.setOppertunityList(starReportOperatorDtlList);
					staffList.setMsg(Constants.NDF);
					list.add(staffList);

					staffList = new StarStaffBean();
					staffList.setReportFor("Tendering Time");
					staffList.setLeadingList(starReportOperatorDtlList);
					staffList.setOrdinalValue(2);
					staffList.setOppertunityList(starReportOperatorDtlList);
					staffList.setMsg(Constants.NDF);
					list.add(staffList);

					staffList = new StarStaffBean();
					staffList.setReportFor("EDR");
					staffList.setLeadingList(starReportOperatorDtlList);
					staffList.setOrdinalValue(3);
					staffList.setOppertunityList(starReportOperatorDtlList);
					staffList.setMsg(Constants.NDF);
					list.add(staffList);

					staffList = new StarStaffBean();
					staffList.setReportFor("Cashout");
					staffList.setLeadingList(starReportOperatorDtlList);
					staffList.setOrdinalValue(4);
					staffList.setOppertunityList(starReportOperatorDtlList);
					staffList.setMsg(Constants.NDF);
					list.add(staffList);
				}
				if ("Store".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					staffList = new StarStaffBean();
					staffList.setReportFor("StarStatistics");
					staffList.setLeadingList(null);
					list.add(staffList);
				}
			} else {
				// param.setMsg("");
				if ("Staff".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroScannerFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("articlesPerMinute,java_double,desc,last");
						duplicateOppList = CommonUtils
						.getCopyOfBeanList(duplicateList);
						Collections.sort(duplicateList, sort);

						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("Scanning Rate");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(1);

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("articlesPerMinute,java_double,asc,last");
						Collections.sort(duplicateOppList, sort);
						setStarStaffList(duplicateOppList, param);
						staffList.setOppertunityList(duplicateOppList);
						list.add(staffList);
					} else {
						duplicateList = new ArrayList<StarReportDtl>();
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("Scanning Rate");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(1);
						staffList.setOppertunityList(duplicateList);
						staffList.setMsg(Constants.NDF);
						list.add(staffList);
					}
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroTenderingFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("tenderingTime,java_double,asc,last");
						duplicateOppList = CommonUtils
						.getCopyOfBeanList(duplicateList);
						Collections.sort(duplicateList, sort);
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("Tendering Time");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(2);

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("tenderingTime,java_double,desc,last");
						Collections.sort(duplicateOppList, sort);
						setStarStaffList(duplicateOppList, param);
						staffList.setOppertunityList(duplicateOppList);
						list.add(staffList);
					} else {
						duplicateList = new ArrayList<StarReportDtl>();
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("Tendering Time");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(2);
						staffList.setOppertunityList(duplicateList);
						staffList.setMsg(Constants.NDF);
						list.add(staffList);
					}
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroCashOutAmountFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("cashOutAmount,java_double,desc,last");
						duplicateOppList = CommonUtils
						.getCopyOfBeanList(duplicateList);
						Collections.sort(duplicateList, sort);
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("Cashout");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(4);

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("cashOutAmount,java_double,asc,last");
						Collections.sort(duplicateOppList, sort);
						setStarStaffList(duplicateOppList, param);
						staffList.setOppertunityList(duplicateOppList);
						list.add(staffList);
					} else {
						duplicateList = new ArrayList<StarReportDtl>();
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("Cashout");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(4);
						staffList.setOppertunityList(duplicateList);
						staffList.setMsg(Constants.NDF);
						list.add(staffList);
					}
					duplicateList = CommonUtils
							.getCopyOfBeanList(starReportOperatorDtlList);
					removeZeroEdrFrmLst(duplicateList);
					if (duplicateList != null && !duplicateList.isEmpty()) {
						MultiAttributeDynaSortComparator sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("percentageEDR,java_double,desc,last");
						duplicateOppList = CommonUtils
						.getCopyOfBeanList(duplicateList);
						Collections.sort(duplicateList, sort);
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("EDR");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(3);

						sort = MultiAttributeDynaSortComparator
								.getComparatorInstance("percentageEDR,java_double,asc,last");
						Collections.sort(duplicateOppList, sort);
						setStarStaffList(duplicateOppList, param);
						staffList.setOppertunityList(duplicateOppList);
						list.add(staffList);
					} else {
						duplicateList = new ArrayList<StarReportDtl>();
						setStarStaffList(duplicateList, param);
						staffList = new StarStaffBean();
						staffList.setReportFor("EDR");
						staffList.setLeadingList(duplicateList);
						staffList.setOrdinalValue(3);
						staffList.setOppertunityList(duplicateList);
						staffList.setMsg(Constants.NDF);
						list.add(staffList);
					}
				}
				if ("Store".equalsIgnoreCase(param.getPerformance())
						|| "Both".equalsIgnoreCase(param.getPerformance())) {
					staffList = new StarStaffBean();
					staffList.setReportFor("StarStatistics");
					staffList.setLeadingList(starReportOperatorDtlList);
					list.add(staffList);
				}
				// list.add(Constants.formatToJsonResponseString(stringFormatter,
				// "statisticsList", starReportOperatorDtlList, param));
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		return list;
	}
	
	private void setStarStaffList(List<StarReportDtl> list, StarReportParam param) {
		int tmp = list.size();
		//if(tmp<param.getStaffNoOfRecs()) {
			for (int i = tmp; i < param.getStaffNoOfRecs(); i++) {
				list.add(new StarReportDtl());
			}
		//}
	}

	public void getDeptSaleTax(List<DepartmentSalesTaxDtl> deptSaleTx,
			List<StarStatisticsBean> lstBn) {
		double totFrontSale = 0.0;
		double totCigrSale = 0.0;
		if (deptSaleTx != null) {
			for (DepartmentSalesTaxDtl dept : deptSaleTx) {
				if (dept.getDepartmentNo() != null
						&& dept.getDepartmentNo().length() > 2) {
					if ("28".equals(dept.getDepartmentNo().substring(2))
							&& CommonUtils.isNumeric(dept
									.getSalesTaxRetailIncl())) {
						totFrontSale += Double.parseDouble(dept
								.getSalesTaxRetailIncl());
					} else if ("27".equals(dept.getDepartmentNo().substring(2))
							&& CommonUtils.isNumeric(dept
									.getSalesTaxRetailIncl())) {
						totCigrSale += Double.parseDouble(dept
								.getSalesTaxRetailIncl());
					}
				}
			}
			StarStatisticsBean bean = new StarStatisticsBean();
			bean.setDescription("Total Front of Store Sales ($)");
			bean.setValue(new DecimalFormat("###0.00").format(totFrontSale));
			bean.setOrdinalValue(6);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("Total Cigarette Sales ($)");
			bean.setValue(new DecimalFormat("###0.00").format(totCigrSale));
			bean.setOrdinalValue(7);
			lstBn.add(bean);
		}
	}

	public List<StarStoreIndividualBean> getDepartmentSalesTaxDetailsPdf(
			StarReportParam param, String action) {
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<DepartmentSalesTaxDtl> departmentSalesTax = null;
		try {

			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				departmentSalesTax = getSessionCachePrintData(action,
						DepartmentSalesTaxDtl.class);
			}
			if (departmentSalesTax == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>>() {
				};
				departmentSalesTax = invokeService(param, posDepartmentSalesTaxURL, typeRef, action);
			}
			if (departmentSalesTax == null
					|| (departmentSalesTax != null
							&& departmentSalesTax.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(departmentSalesTax.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
			StarStoreIndividualBean o1 = new StarStoreIndividualBean();
			// o1.setJasperName("PriceOverrideRpt.jasper");
			o1.setReportData(departmentSalesTax);
			o1.setOrdinalValue(11);
			list.add(o1);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		return list;

	}

	public List<StarStoreIndividualBean> getPriceMarkdownDetailsPdf(
			StarReportParam param, String action) {
		List<StarPriceMarkDownBean> priceMarkdownDetailList = null;
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		// Set<StarPriceMarkDownBeanAggrBean> set = new
		// HashSet<StarPriceMarkDownBeanAggrBean>();
		Map<String, StarPriceMarkDownBean> map = new HashMap<String, StarPriceMarkDownBean>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				priceMarkdownDetailList = getSessionCachePrintData(action,
						StarPriceMarkDownBean.class);
			}
			if (priceMarkdownDetailList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<StarPriceMarkDownBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<StarPriceMarkDownBean>>() {
				};
				priceMarkdownDetailList = invokeService(param, posPriceMarkDownURL, typeRef, 
						action);
			}
			List<StarPriceMarkDownBean> lst = null;
			if (priceMarkdownDetailList == null
					|| (priceMarkdownDetailList != null
							&& priceMarkdownDetailList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(priceMarkdownDetailList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<StarPriceMarkDownBean>();
				setStarStoreList(lst, StarPriceMarkDownBean.class, param);
				o1.setJasperName("PriceOverrideRpt.jasper");
				o1.setOrdinalValue(1);
				o1.setReportData(lst);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				StarPriceMarkDownBean tmpObj = null;
				for (StarPriceMarkDownBean obj : priceMarkdownDetailList) {
					obj.setCashName(obj.getCashierFirstName() + " "
							+ obj.getCashierLastName());
					if (map.containsKey(obj.getCashName())) {
						tmpObj = map.get(obj.getCashName());
						tmpObj.add(obj);
					} else {
						tmpObj = new StarPriceMarkDownBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashName(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<StarPriceMarkDownBean>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("priceDifference,double,desc,last");
						Collections.sort(lst, comp);
						StarStoreIndividualBean o1 = new StarStoreIndividualBean();
						setStarStoreList(lst, StarPriceMarkDownBean.class, param);
						o1.setJasperName("PriceOverrideRpt.jasper");
						o1.setOrdinalValue(1);
						o1.setReportData(lst);
						list.add(o1);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		return list;
	}

	public List<StarStoreIndividualBean> getSavedTransactionDetailsPdf(
			StarReportParam param, String action) {
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<POSStarSavedTransactionDtl> savedTransactionList = null;
		Map<String, POSStarSavedTransactionDtl> map = new HashMap<String, POSStarSavedTransactionDtl>();

		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				savedTransactionList = getSessionCachePrintData(action,
						POSStarSavedTransactionDtl.class);
			}
			if (savedTransactionList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarSavedTransactionDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarSavedTransactionDtl>>() {
				};
				savedTransactionList = invokeService(param, posStarSavedTransactionURL, typeRef, 
						action);
			}
			List<POSStarSavedTransactionDtl> lst = null;
			if (savedTransactionList == null
					|| (savedTransactionList != null
							&& savedTransactionList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(savedTransactionList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<POSStarSavedTransactionDtl>();
				setStarStoreList(lst, POSStarSavedTransactionDtl.class, param);
				o1.setJasperName("UnrecallSavedTrans.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(2);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				POSStarSavedTransactionDtl tmpObj = null;
				for (POSStarSavedTransactionDtl obj : savedTransactionList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarSavedTransactionDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarSavedTransactionDtl>(map
							.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("savedTransactionAmount,double,desc,last");
						Collections.sort(lst, comp);
						StarStoreIndividualBean o1 = new StarStoreIndividualBean();
						setStarStoreList(lst, POSStarSavedTransactionDtl.class, param);
						o1.setJasperName("UnrecallSavedTrans.jasper");
						o1.setReportData(lst);
						o1.setOrdinalValue(2);
						list.add(o1);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		return list;

	}

	public List<StarStoreIndividualBean> getVoidDetailsPdf(
			StarReportParam param, String action) {
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();

		List<POSStarArticleVoidTransactionDtl> articleVoidTransactionList = null;

		Map<String, POSStarArticleVoidTransactionDtl> map = new HashMap<String, POSStarArticleVoidTransactionDtl>();

		try {

			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleVoidTransactionList = getSessionCachePrintData(action,
						POSStarArticleVoidTransactionDtl.class);
			}
			if (articleVoidTransactionList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidTransactionDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidTransactionDtl>>() {
				};
				articleVoidTransactionList = invokeService(param, posStarArticleVoidTransactionURL, typeRef,
						action);
			}
			List<POSStarArticleVoidTransactionDtl> lst = null;
			if (articleVoidTransactionList == null
					|| (articleVoidTransactionList != null
							&& articleVoidTransactionList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleVoidTransactionList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<POSStarArticleVoidTransactionDtl>();
				setStarStoreList(lst, POSStarArticleVoidTransactionDtl.class, param);
				o1.setJasperName("VoidTransaction.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(3);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				POSStarArticleVoidTransactionDtl tmpObj = null;
				for (POSStarArticleVoidTransactionDtl obj : articleVoidTransactionList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarArticleVoidTransactionDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarArticleVoidTransactionDtl>(map
							.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(lst, comp);
						StarStoreIndividualBean o1 = new StarStoreIndividualBean();
						setStarStoreList(lst, POSStarArticleVoidTransactionDtl.class, param);
						o1.setJasperName("VoidTransaction.jasper");
						o1.setReportData(lst);
						o1.setOrdinalValue(3);
						list.add(o1);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		return list;

	}

	public List<StarStoreIndividualBean> getVoidItemDetailsPdf(
			StarReportParam param, String action) {
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<POSStarArticleVoidItemDtl> articleVoidItemLineList = null;

		Map<String, POSStarArticleVoidItemDtl> map = new HashMap<String, POSStarArticleVoidItemDtl>();

		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleVoidItemLineList = getSessionCachePrintData(action,
						POSStarArticleVoidItemDtl.class);
			}
			if (articleVoidItemLineList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidItemDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarArticleVoidItemDtl>>() {
				};
				articleVoidItemLineList = invokeService(param, posStarArticleTransactionURL, typeRef, action);
			}
			List<POSStarArticleVoidItemDtl> lst = null;
			if (articleVoidItemLineList == null
					|| (articleVoidItemLineList != null
							&& articleVoidItemLineList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleVoidItemLineList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<POSStarArticleVoidItemDtl>();
				setStarStoreList(lst, POSStarArticleVoidItemDtl.class, param);
				o1.setJasperName("VoidArticle.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(4);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				POSStarArticleVoidItemDtl tmpObj = null;
				for (POSStarArticleVoidItemDtl obj : articleVoidItemLineList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarArticleVoidItemDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarArticleVoidItemDtl>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(lst, comp);
						StarStoreIndividualBean o1 = new StarStoreIndividualBean();
						setStarStoreList(lst, POSStarArticleVoidItemDtl.class, param);
						o1.setJasperName("VoidArticle.jasper");
						o1.setReportData(lst);
						o1.setOrdinalValue(4);
						list.add(o1);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		return list;

	}

	public List<StarStoreIndividualBean> getNoSalesDetailsPdf(
			StarReportParam param, String action) {
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<POSStarNoSalesDtl> noSalesDetailsList = null;
		Map<String, POSStarNoSalesDtl> map = new HashMap<String, POSStarNoSalesDtl>();

		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				noSalesDetailsList = getSessionCachePrintData(action,
						POSStarNoSalesDtl.class);
			}
			if (noSalesDetailsList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarNoSalesDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarNoSalesDtl>>() {
				};
				noSalesDetailsList = invokeService(param, posStarNoSalesTransactionURL, typeRef, action);
			}
			List<POSStarNoSalesDtl> lst = null;
			if (noSalesDetailsList == null
					|| (noSalesDetailsList != null
							&& noSalesDetailsList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(noSalesDetailsList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<POSStarNoSalesDtl>();
				setStarStoreList(lst, POSStarNoSalesDtl.class, param);
				o1.setJasperName("NoSales.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(5);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				POSStarNoSalesDtl tmpObj = null;
				for (POSStarNoSalesDtl obj : noSalesDetailsList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarNoSalesDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarNoSalesDtl>(map.values());
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("salesUnit,double,desc,last");
						Collections.sort(lst, comp);
						StarStoreIndividualBean o1 = new StarStoreIndividualBean();
						setStarStoreList(lst, POSStarNoSalesDtl.class, param);
						o1.setJasperName("NoSales.jasper");
						o1.setReportData(lst);
						o1.setOrdinalValue(5);
						list.add(o1);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		return list;
	}

	public List<StarStoreIndividualBean> getRefundDetailsPdf(
			StarReportParam param, String action) {
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<POSStarRefundDtl> articleRefundList = null;
		List<POSStarRefundDtl> lst = null;
		Map<String, POSStarRefundDtl> map = new HashMap<String, POSStarRefundDtl>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleRefundList = getSessionCachePrintData(action,
						POSStarRefundDtl.class);
			}
			if (articleRefundList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<POSStarRefundDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSStarRefundDtl>>() {
				};
				articleRefundList = invokeService(param, posStarRefundsURL, typeRef, action);
			}
			if (articleRefundList == null
					|| (articleRefundList != null
							&& articleRefundList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleRefundList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<POSStarRefundDtl>();
				setStarStoreList(lst, POSStarRefundDtl.class, param);
				o1.setJasperName("Refunds.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(6);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				POSStarRefundDtl tmpObj = null;
				for (POSStarRefundDtl obj : articleRefundList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						obj.setCashName(obj.getCashierFirstName() + " "
								+ obj.getCashierLastName());
						tmpObj = new POSStarRefundDtl();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<POSStarRefundDtl>(map.values());
					for (POSStarRefundDtl refundDtlAggrBean : lst) {
						if (CommonUtils.getNumericVal(refundDtlAggrBean
								.getRefundItem()) < 0.0) {
							refundDtlAggrBean.setRefundItem(Math
									.abs(CommonUtils
											.getNumericVal(refundDtlAggrBean
													.getRefundItem()))
									+ "");
						}
					}
					if (lst != null) {
						MultiAttributeDynaSortComparator comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("refundItem,double,desc,last");
						Collections.sort(lst, comp);
						StarStoreIndividualBean o1 = new StarStoreIndividualBean();
						setStarStoreList(lst, POSStarRefundDtl.class, param);
						o1.setJasperName("Refunds.jasper");
						o1.setReportData(lst);
						o1.setOrdinalValue(6);
						list.add(o1);
					}
				}
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.EXCEPTION);
		}
		return list;
	}

	public List<StarStoreIndividualBean> getArticleSoldByDeptPdf(
			StarReportParam param, String action) {
		List<ArticleSoldByDeptBean> articleSldByDeptList = null;
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<ArticleSoldByDeptBean> lst = null;
		Map<String, ArticleSoldByDeptBean> map = new HashMap<String, ArticleSoldByDeptBean>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleSldByDeptList = getSessionCachePrintData(action,
						ArticleSoldByDeptBean.class);
			}
			if (articleSldByDeptList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<ArticleSoldByDeptBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<ArticleSoldByDeptBean>>() {
				};
				articleSldByDeptList = invokeService(param, POSStarDeptSale, typeRef,
						action);
				// articleSldByDeptList =
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.mockArticleSoldByDept();
			}
			if (articleSldByDeptList == null
					|| (articleSldByDeptList != null
							&& articleSldByDeptList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(articleSldByDeptList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<ArticleSoldByDeptBean>();
				setStarStoreList(lst, ArticleSoldByDeptBean.class, param);
				o1.setJasperName("ArticleSoldByDept.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(7);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				ArticleSoldByDeptBean tmpObj = null;
				for (ArticleSoldByDeptBean obj : articleSldByDeptList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						tmpObj = new ArticleSoldByDeptBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				MultiAttributeDynaSortComparator comp = null;
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<ArticleSoldByDeptBean>(map.values());
					if (lst != null) {
						comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				setStarStoreList(lst, ArticleSoldByDeptBean.class, param);
				o1.setJasperName("ArticleSoldByDept.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(7);
				list.add(o1);
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		return list;
	}

	public List<StarStoreIndividualBean> getStaffDiscountPdf(
			StarReportParam param, String action) {
		List<StaffDiscountBean> staffDiscountList = null;
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<StaffDiscountBean> lst = null;
		Map<String, StaffDiscountBean> map = new HashMap<String, StaffDiscountBean>();
		List<StaffDiscountBean> oneCardList = null;
		List<StaffDiscountBean> staffDiscountListCpy = null;
		StarReportParam oneCardParam = new StarReportParam();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				staffDiscountList = getSessionCachePrintData(action,
						StaffDiscountBean.class);
			}
			if (staffDiscountList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<StaffDiscountBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<StaffDiscountBean>>() {
				};
				staffDiscountList = invokeService(param, POSStarStaffCard, typeRef, action);
				// staffDiscountList =
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.mockStaffDiscount();
			}
			if (staffDiscountList == null
					|| (staffDiscountList != null
							&& staffDiscountList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(staffDiscountList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<StaffDiscountBean>();
				setStarStoreList(lst, StaffDiscountBean.class, param);
				o1.setJasperName("StaffDiscount.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(8);
				o1.setMsg(param.getMsg());
				list.add(o1);
				
				o1 = new StarStoreIndividualBean();
				setStarStoreList(lst, StaffDiscountBean.class, param);
				o1.setJasperName("OneCard.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(10);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				StaffDiscountBean tmpObj = null;
				for (StaffDiscountBean obj : staffDiscountList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						tmpObj = new StaffDiscountBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				MultiAttributeDynaSortComparator comp = null;
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<StaffDiscountBean>(map.values());
					oneCardList = CommonUtils.getCopyOfBeanList(lst);
					staffDiscountListCpy = CommonUtils.getCopyOfBeanList(lst);
					ReflectionUtil.copy(oneCardParam, param);
					if (lst != null) {
						removeStaffDiscountFromOneCard(oneCardList);
						removeOneCardFromStaffDiscount(staffDiscountListCpy);
						comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("total,double,desc,last");
						Collections.sort(staffDiscountListCpy, comp);
					}
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				setStarStoreList(staffDiscountListCpy, StaffDiscountBean.class, param);
				o1.setJasperName("StaffDiscount.jasper");
				o1.setReportData(staffDiscountListCpy);
				o1.setOrdinalValue(8);
				list.add(o1);
				
				//lst = CommonUtils.getCopyOfBeanList(lst);
				if (oneCardList != null && !oneCardList.isEmpty()) {
					comp = MultiAttributeDynaSortComparator
							.getComparatorInstance("quantityOneCard,double,desc,last");
					Collections.sort(oneCardList, comp);
				}
				else {
					oneCardParam.setMsg(Constants.NDF);
				}
				o1 = new StarStoreIndividualBean();
				setStarStoreList(oneCardList, StaffDiscountBean.class, oneCardParam);
				o1.setJasperName("OneCard.jasper");
				o1.setReportData(oneCardList);
				o1.setOrdinalValue(10);
				list.add(o1);
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		return list;
	}

	public List<StarStoreIndividualBean> getPriceInquiryPdf(
			StarReportParam param, String action) {
		List<PriceInquiryBean> priceInquiryList = null;
		List<StarStoreIndividualBean> list = new ArrayList<StarStoreIndividualBean>();
		List<PriceInquiryBean> lst = null;
		Map<String, PriceInquiryBean> map = new HashMap<String, PriceInquiryBean>();
		try {
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				priceInquiryList = getSessionCachePrintData(action,
						PriceInquiryBean.class);
			}
			if (priceInquiryList == null
					|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
				ParameterizedTypeReference<ServiceResponse<PriceInquiryBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<PriceInquiryBean>>() {
				};
				priceInquiryList = invokeService(param, POSStarPriceInquiry, typeRef, action);
				// priceInquiryList =
				// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.mockPriceInquiry();
			}
			if (priceInquiryList == null
					|| (priceInquiryList != null
							&& priceInquiryList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(priceInquiryList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				lst = new ArrayList<PriceInquiryBean>();
				setStarStoreList(lst, PriceInquiryBean.class, param);
				o1.setJasperName("PriceInquiry.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(9);
				o1.setMsg(param.getMsg());
				list.add(o1);
			} else {
				PriceInquiryBean tmpObj = null;
				for (PriceInquiryBean obj : priceInquiryList) {
					if (map.containsKey(obj.getCashierNumber())) {
						tmpObj = map.get(obj.getCashierNumber());
						tmpObj.add(obj);
					} else {
						tmpObj = new PriceInquiryBean();
						ReflectionUtil.copy(tmpObj, obj);
						map.put(tmpObj.getCashierNumber(), tmpObj);
					}
				}
				MultiAttributeDynaSortComparator comp = null;
				if (map != null && !map.isEmpty()) {
					lst = new ArrayList<PriceInquiryBean>(map.values());
					if (lst != null) {
						comp = MultiAttributeDynaSortComparator
								.getComparatorInstance("quantity,double,desc,last");
						Collections.sort(lst, comp);
					}
				}
				StarStoreIndividualBean o1 = new StarStoreIndividualBean();
				setStarStoreList(lst, PriceInquiryBean.class, param);
				o1.setJasperName("PriceInquiry.jasper");
				o1.setReportData(lst);
				o1.setOrdinalValue(9);
				list.add(o1);
			}
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			param.setMsg(Constants.TECH_ISSUE);
		}
		return list;
	}

	public List<StarStatisticsBean> getStarStatistics(
			List<StarReportDtl> statisticsList, List<StarStatisticsBean> lstBn) {
		StarReportDtl statisticsBean = new StarReportDtl();
		statisticsBean.setScanTimeFormatted("00:00:00");
		statisticsBean.setIdleTimeFormatted("00:00:00");
		statisticsBean.setTransactionCount(0.0);
		statisticsBean.setArticlesPerMinute(0.0);
		statisticsBean.setAverageBasketSize(0.0);
		statisticsBean.setAverageArticlePrice(0.0);
		statisticsBean.setSelfCheckOutTransactions(0.0);
		statisticsBean.setSalesRetailIncT(0.0);
		statisticsBean.setItemsScannedCount(0.0);

		statisticsBean.setTenderingTime(0.0);
		statisticsBean.setCashOutAmount(0.0);
		if (statisticsList != null) {
			for (StarReportDtl starReportDtl : statisticsList) {
				statisticsBean.add(starReportDtl);
			}
			StarStatisticsBean bean = new StarStatisticsBean();
			bean.setDescription("Total Customers");
			bean.setValue(new DecimalFormat("###0").format(statisticsBean.getTransactionCount()));
			bean.setOrdinalValue(1);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("Average Scan Rate (articles per minute)");
			bean.setValue(new DecimalFormat("###0.0").format(statisticsBean.getArticlesPerMinute()));
			bean.setOrdinalValue(2);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("Average Article Price ($ per article)");
			statisticsBean.setAverageArticlePrice(statisticsBean.getItemsScannedCount()==0.0?0.0:(statisticsBean.getSalesRetailIncT()/statisticsBean.getItemsScannedCount()));
			bean.setValue(new DecimalFormat("###0.00").format(statisticsBean.getAverageArticlePrice()));
			bean.setOrdinalValue(3);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("Average Basket Size (articles per customer)");
			bean.setValue(new DecimalFormat("###0.00").format(statisticsBean.getAverageBasketSize()));
			bean.setOrdinalValue(4);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("Total Register Sales ($)");
			bean.setValue(new DecimalFormat("###0.00").format(statisticsBean.getSalesRetailIncT()));
			bean.setOrdinalValue(5);
			lstBn.add(bean);

			/*
			 * bean = new StarStatisticsBean();
			 * bean.setDescription("Total Front of Store Sales ($)");
			 * bean.setValue(statisticsBean.getCashOutAmount());
			 * bean.setOrdinalValue(6); lstBn.add(bean);
			 * 
			 * bean = new StarStatisticsBean();
			 * bean.setDescription("Total Cigarette Sales ($)");
			 * bean.setValue(statisticsBean.getCashOutAmount());
			 * bean.setOrdinalValue(7); lstBn.add(bean);
			 */

			/*bean = new StarStatisticsBean();
			bean.setDescription("Self Checkout Transactions");
			bean
					.setValue(new DecimalFormat("###0'%'").format(statisticsBean
									.getSelfCheckOutTransactions()));
			bean.setOrdinalValue(8);
			lstBn.add(bean);*/

			/*bean = new StarStatisticsBean();
			bean.setDescription("Other Transactions");
			bean.setValue(null);// new
								// DecimalFormat("###0.00").format(Double.parseDouble(statisticsBean.getCashOutAmount()))
			bean.setOrdinalValue(9);
			lstBn.add(bean);*/

			bean = new StarStatisticsBean();
			bean.setDescription("POS Operator Name Time Distribution - Tender");
			bean.setValue(new DecimalFormat("###0'%'").format(statisticsBean.getTenderingTime()));
			bean.setOrdinalValue(10);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("POS Operator Name Time Distribution - Scan");
			bean.setValue(statisticsBean.getScanTimeFormatted());
			bean.setOrdinalValue(11);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("POS Operator Name Time Distribution - Idle");
			bean.setValue(statisticsBean.getIdleTimeFormatted());
			bean.setOrdinalValue(12);
			lstBn.add(bean);

			bean = new StarStatisticsBean();
			bean.setDescription("Total Cashout ($)");
			bean.setValue(new DecimalFormat("$#,##0.00").format(statisticsBean.getCashOutAmount()));
			bean.setOrdinalValue(13);
			bean.setDisplayBold(true);
			lstBn.add(bean);
		}
		return lstBn;
	}
	private <T> void setStarStoreList(final List<T> list, final Class<T> clazz, final StarReportParam param) {
		int tmp = list.size();
		//if(tmp<param.getStaffNoOfRecs()) {
			for (int i = tmp; i < param.getStoreNoOfRecs(); i++) {
				try {
					list.add(clazz.newInstance());
				} catch (InstantiationException e) {
					e.printStackTrace();
				} catch (IllegalAccessException e) {
					e.printStackTrace();
				}
			}
		//}
	}
	// ///////////////
	private void removeZeroScannerFrmLst(List<StarReportDtl> starReportList) {
		if (starReportList != null) {
			ListIterator<StarReportDtl> itr = starReportList.listIterator();
			while (itr.hasNext()) {
				StarReportDtl tmp = itr.next();
				if (tmp.getArticlesPerMinute() == 0.0) {
					itr.remove();
				}
			}
		}
	}

	private void removeZeroTenderingFrmLst(List<StarReportDtl> starReportList) {
		if (starReportList != null) {
			ListIterator<StarReportDtl> itr = starReportList.listIterator();
			while (itr.hasNext()) {
				StarReportDtl tmp = itr.next();
				if (tmp.getTenderingTime() == 0.0) {
					itr.remove();
				}
			}
		}
	}

	private void removeZeroCashOutAmountFrmLst(
			List<StarReportDtl> starReportList) {
		if (starReportList != null) {
			ListIterator<StarReportDtl> itr = starReportList.listIterator();
			while (itr.hasNext()) {
				StarReportDtl tmp = itr.next();
				if (tmp.getCashOutAmount() == 0.0) {
					itr.remove();
				}
			}
		}
	}

	private void removeZeroEdrFrmLst(List<StarReportDtl> starReportList) {
		if (starReportList != null) {
			ListIterator<StarReportDtl> itr = starReportList.listIterator();
			while (itr.hasNext()) {
				StarReportDtl tmp = itr.next();
				if (tmp.getPercentageEDR() == 0.0) {
					itr.remove();
				}
			}
		}
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof StarReportParam) {
			StarReportParam tmpParam = (StarReportParam) params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			// map.put("ZV_DATE_IM", tmpParam.getDateFrom());
			// map.put("ZV_TDATE_IM",
			// (CommonUtils.isNullEmptyWhiteSpace(tmpParam.getDateTo())?tmpParam.getDateFrom():tmpParam.getDateTo()));//ZV_POSD_C0001
			map.put("ZV_DATE_IM", tmpParam.getDateFrom());
			map.put("ZV_TDATE_IM", tmpParam.getDateTo());
			map.put("VAR_20111208223707", tmpParam.getSiteNo());
	
			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("ZV_DATE_IM");
			mandatoryParams.add("ZV_TDATE_IM");
			mandatoryParams.add("VAR_20111208223707");
	
			List<String> dateParams = new ArrayList<String>();
			dateParams.add("ZV_DATE_IM");
			dateParams.add("ZV_TDATE_IM");
			if (checkAndUpdateMandatoryParams(map, mandatoryParams, dateParams) == false) {
				tmpParam.setMsg(PosReportConstantsInterfaces.MANDATORY);
				return null;
			}
			return getUrlParams(map);
		}
		else {
			return null;
		}
	}

}
