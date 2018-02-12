package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Comparator;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
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

import au.com.woolworths.portal.pos.model.POSArticleRefundsDtl;
import au.com.woolworths.portal.pos.model.POSArticleVoidDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.POSArticleVoidRefundParam;
import au.com.woolworths.portal.reports.JasperParamsBean;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CallableTask;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.ReflectionUtil;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

import com.google.common.base.Joiner;
import com.google.gson.Gson;

public class POSArticleVoidRefundServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	@Value("${POSArticleVoidDtlURL}")
	private String posArticleVoidDtlURL;
	
	@Value("${POSArticleRefundDtlURL}")
	private String posArticleRefundDtlURL;

	@Value("#{properties['voidsReport']}")
	private String voidsReport = null;

	@Value("#{properties['refundsReport']}")
	private String refundsReport = null;

	private static final Logger LOGGER = Logger
			.getLogger(POSArticleVoidRefundServiceImpl.class.getName());

	public String getArticleVoidAndRefundDtl(POSArticleVoidRefundParam param) {
		
		List<String> resp = new ArrayList<String>();
		Map<String, POSArticleVoidRefundParam> map = new LinkedHashMap<String, POSArticleVoidRefundParam>();
		POSArticleVoidRefundParam params = null;
		try {
			params = new POSArticleVoidRefundParam();
			ReflectionUtil.copy(params, param);
			map.put("getArticleVoidDtlInvokeService", params);

			params = new POSArticleVoidRefundParam();
			ReflectionUtil.copy(params, param);
			map.put("getArticleRefundDtlInvokeService", params);
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}

		ExecutorService taskExecutor = Executors.newFixedThreadPool(2);
		CompletionService<String> taskCompletionService = new ExecutorCompletionService<String>(
				taskExecutor);
		for (Map.Entry<String, POSArticleVoidRefundParam> entry : map
				.entrySet()) {
			String taskName = entry.getKey();
			Class<?> parameterTypes[] = new Class[1];
			parameterTypes[0] = POSArticleVoidRefundParam.class;
			Object parameterObjects[] = new Object[1];
			parameterObjects[0] = entry.getValue();
			taskCompletionService.submit(new CallableTask<String>(taskName,
					this, parameterTypes, parameterObjects));
		}
		LOGGER.info("trying to take from Completion service");
		for (int tasksHandled = 0; tasksHandled < map.size(); tasksHandled++) {
			try {
				Future<String> res = taskCompletionService.take();
				String tmp = res.get();
				resp.add(tmp);
			} catch (InterruptedException e) {
				// Something went wrong with a task submitted
				LOGGER.error("Error Interrupted exception", e);
			} catch (ExecutionException e) {
				// Something went wrong with the result
				LOGGER.error("Error get() threw exception", e);
			}
		}
		LOGGER.info("Completed multi thread execution");
		taskExecutor.shutdown();
		return "{" + Joiner.on(",").join(resp) + "}";
	}
	@SuppressWarnings("unchecked")
	public ByteArrayOutputStream getArticleVoidAndRefundDtlJasper(POSArticleVoidRefundParam param, String srcPath,
			String binPath, HttpServletRequest request) throws Throwable {
		Map<String, POSArticleVoidRefundParam> map = new LinkedHashMap<String, POSArticleVoidRefundParam>();
		POSArticleVoidRefundParam voidsParams = null;
		POSArticleVoidRefundParam refundsParams = null;
		try {
			if (param.getTransactionType() != null) {
				if (param.getTransactionType().matches("Both|Voids")) {
					voidsParams = new POSArticleVoidRefundParam();
					ReflectionUtil.copy(voidsParams, param);
					map.put("getArticleVoidDtlBean", voidsParams);
				} 
				if (param.getTransactionType().matches("Both|Refunds")) {
					refundsParams = new POSArticleVoidRefundParam();
					ReflectionUtil.copy(refundsParams, param);
					map.put("getArticleRefundDtlBean", refundsParams);
				}
			}
		} catch (Exception e) {
			LOGGER.error(e.getMessage(), e);
		}

		ExecutorService taskExecutor = Executors.newFixedThreadPool(2);
		CompletionService<List<?>> taskCompletionService = new ExecutorCompletionService<List<?>>(
				taskExecutor);
		for (Map.Entry<String, POSArticleVoidRefundParam> entry : map
				.entrySet()) {
			String taskName = entry.getKey();
			Class<?> parameterTypes[] = new Class[2];
			parameterTypes[0] = POSArticleVoidRefundParam.class;
			parameterTypes[1] = String.class;
			Object parameterObjects[] = new Object[2];
			parameterObjects[0] = entry.getValue();
			parameterObjects[1] = PosReportConstantsInterfaces.PRINT_RPT;
			taskCompletionService.submit(new CallableTask<List<?>>(taskName,
					this, parameterTypes, parameterObjects));
		}
		LOGGER.info("trying to take from Completion service");
		List<JasperParamsBean> jasperParamList = new ArrayList<JasperParamsBean>();
		for (int tasksHandled = 0; tasksHandled < map.size(); tasksHandled++) {
			try {
				Future<List<?>> res = taskCompletionService.take();
				List<?> tmp = res.get();
				if (tmp != null && tmp.isEmpty() == false) {
					Object o = tmp.get(0);
					if (o instanceof POSArticleVoidDtl) {
						CustomMultiAttributeDynaSortComparator mul = CustomMultiAttributeDynaSortComparator.getComparatorInstance(
								voidsParams.getVoidTblSortAttr(), "Void");
						if (mul != null) {
							Collections
									.sort((List<POSArticleVoidDtl>) tmp, mul);
						}
						HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
						reportInputParams.put("FromDate", param.getDateFrom());
						reportInputParams.put("ToDate", param.getDateTo());
						reportInputParams.put("StoreNo", param.getSiteNo());
						reportInputParams.put("StoreName", param.getSiteName());
						
						reportInputParams.put("voidDate", param.getVoidDate());
						reportInputParams.put("voidTime", param.getVoidTime());
						reportInputParams.put("voidTran", param.getVoidTran());
						reportInputParams.put("voidPoso", param.getVoidPoso());
						reportInputParams.put("voidAuth", param.getVoidAuth());
						reportInputParams.put("voidArti", param.getVoidArti());
						reportInputParams.put("voidDesc", param.getVoidDesc());
						reportInputParams.put("voidType", param.getVoidType());
						reportInputParams.put("voidReas", param.getVoidReas());
						reportInputParams.put("voidDepa", param.getVoidDepa());
						reportInputParams.put("voidTota", param.getVoidTota());
						reportInputParams.put("filterRadio", param.getFilterRadio());
						reportInputParams.put("voidTblSortAttr", param.getVoidTblSortAttr());
						reportInputParams.put("msg", param.getMsg());
						jasper.setTimeZoneOffSet(reportInputParams, request, null);
						jasperParamList.add(new JasperParamsBean(voidsReport,
							new JRBeanCollectionDataSource(tmp),
							reportInputParams, 1));
					} else if (o instanceof POSArticleRefundsDtl) {
						CustomMultiAttributeDynaSortComparator mul = CustomMultiAttributeDynaSortComparator.getComparatorInstance(
								refundsParams.getRefundTblSortAttr(), "Refund");
						if (mul != null) {
							Collections.sort((List<POSArticleRefundsDtl>) tmp,
									mul);
						}
						HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
						reportInputParams.put("FromDate", param.getDateFrom());
						reportInputParams.put("ToDate", param.getDateTo());
						reportInputParams.put("StoreNo", param.getSiteNo());
						reportInputParams.put("StoreName", param.getSiteName());
						
						reportInputParams.put("refundDate", param.getRefundDate());
						reportInputParams.put("refundTime", param.getRefundTime());
						reportInputParams.put("refundTran", param.getRefundTran());
						reportInputParams.put("refundPosi", param.getRefundPosi());
						reportInputParams.put("refundPoso", param.getRefundPoso());
						reportInputParams.put("refundAuth", param.getRefundAuth());
						reportInputParams.put("refundArti", param.getRefundArti());
						reportInputParams.put("refundDesc", param.getRefundDesc());
						reportInputParams.put("refundType", param.getRefundType());
						reportInputParams.put("refundReas", param.getRefundReas());
						reportInputParams.put("refundTota", param.getRefundTota());
						reportInputParams.put("refundTblSortAttr", param.getRefundTblSortAttr());
						reportInputParams.put("msg", param.getMsg());
						jasper.setTimeZoneOffSet(reportInputParams, request, null);
						jasperParamList.add(new JasperParamsBean(refundsReport,
							new JRBeanCollectionDataSource(tmp),
							reportInputParams, 2));
					}
				}
			} catch (InterruptedException e) {
				// Something went wrong with a task submitted
				LOGGER.error("Error Interrupted exception", e);
			} catch (ExecutionException e) {
				// Something went wrong with the result
				LOGGER.error("Error get() threw exception", e);
			}
		}
		LOGGER.info("Completed multi thread execution");
		taskExecutor.shutdown();
		Collections.sort(jasperParamList, new Comparator<JasperParamsBean>() {
			@Override
			public int compare(JasperParamsBean o1,
					JasperParamsBean o2) {
				return o1.getOrdinalVal() - o2.getOrdinalVal();
			}
		});
		
		ByteArrayOutputStream byos = jasper.printReport(jasperParamList, param.getPrintReportFormat(), srcPath, binPath);
		return byos;
	}

	public String getArticleVoidDtlInvokeService(POSArticleVoidRefundParam param) {
		Gson gson = new Gson();

		List<POSArticleVoidDtl> articleVoidRefundList = getArticleVoidDtlBean(param, PosReportConstantsInterfaces.GENERATE_RPT);

		return "\"voidList\": {\"voidList\":"
		+ gson.toJson(articleVoidRefundList != null ? articleVoidRefundList
				: new ArrayList<POSArticleVoidDtl>())
		+ ",\"msg\": \"" + param.getMsg() + "\" }";
	}

	public String getArticleRefundDtlInvokeService(
			POSArticleVoidRefundParam param) {
		Gson gson = new Gson();
		List<POSArticleRefundsDtl> articleRefundList = getArticleRefundDtlBean(param, PosReportConstantsInterfaces.GENERATE_RPT);
		return "\"refundList\": {\"refundList\":"
				+ gson.toJson(articleRefundList != null ? articleRefundList
						: new ArrayList<POSArticleRefundsDtl>())
				+ ",\"msg\": \"" + param.getMsg() + "\" }";
	}
	public List<POSArticleVoidDtl> getArticleVoidDtlBean(POSArticleVoidRefundParam param, String action) {
		List<POSArticleVoidDtl> articleVoidRefundList = null;
		if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
			articleVoidRefundList = getSessionCachePrintData(action,
					POSArticleVoidDtl.class);
		}
		if (articleVoidRefundList == null
				|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
			ParameterizedTypeReference<ServiceResponse<POSArticleVoidDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSArticleVoidDtl>>(){};
			articleVoidRefundList = invokeService(param, posArticleVoidDtlURL, typeRef, action);
		}
		if (articleVoidRefundList == null 
				|| (articleVoidRefundList != null
				&& articleVoidRefundList.size() ==1 
				&&  PosReportConstantsInterfaces.NO_DATA_FOUND.equalsIgnoreCase(articleVoidRefundList.get(0).getNoDataFound())) ) {
			if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
				param.setMsg(Constants.NDF);
			}
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleVoidRefundList = null;
			}
		}
		else {
			param.setMsg("");
		}
		return articleVoidRefundList;
	}
	public List<POSArticleRefundsDtl> getArticleRefundDtlBean(POSArticleVoidRefundParam param, String action) {
		List<POSArticleRefundsDtl> articleRefundList = null;
		if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
			articleRefundList = getSessionCachePrintData(action,
					POSArticleRefundsDtl.class);
		}
		if (articleRefundList == null
				|| PosReportConstantsInterfaces.GENERATE_RPT.equals(action)) {
			ParameterizedTypeReference<ServiceResponse<POSArticleRefundsDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSArticleRefundsDtl>>(){};
			articleRefundList = invokeService(param, posArticleRefundDtlURL, typeRef, action);
		}
		if (articleRefundList == null 
				|| (articleRefundList != null
				&& articleRefundList.size() ==1 
				&&  PosReportConstantsInterfaces.NO_DATA_FOUND.equalsIgnoreCase(articleRefundList.get(0).getNoDataFound())) ) {
			if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
				param.setMsg(Constants.NDF);
			}
			if (PosReportConstantsInterfaces.PRINT_RPT.equals(action)) {
				articleRefundList = null;
			}
		}
		else {
			param.setMsg("");
		}
		return articleRefundList;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof POSArticleVoidRefundParam) {
			POSArticleVoidRefundParam param = (POSArticleVoidRefundParam)params;
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
			
			if(checkAndUpdateMandatoryParams(map, mandatoryParams, dateParams) == false) {
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
		private String listType;
		
		private CustomMultiAttributeDynaSortComparator() {
		}

		public CustomMultiAttributeDynaSortComparator(String attribute,
				String type, String sortingOrder, String nullsLast, String listType) {
			super(attribute, type, sortingOrder, nullsLast);
			this.listType = listType;
		}

		public CustomMultiAttributeDynaSortComparator(String attribute,
				String type, String sortingOrder, String nullsLast, String listType,
				LinkedList<SecondSortAttributeDetails> queue) {
			super(attribute, type, sortingOrder, nullsLast, queue);
			this.listType = listType;
		}

		@Override
		public MultiAttributeDynaSortComparator getMultiAttributeDynaSortComparator(
				String attribute, String type, String sortingOrder, String nullsLast,
				LinkedList<SecondSortAttributeDetails> q) {
			return new CustomMultiAttributeDynaSortComparator(attribute, type,
					sortingOrder, nullsLast, this.getListType(), q);
		}

		public String getListType() {
			return listType;
		}

		public void setListType(String listType) {
			this.listType = listType;
		}

		public static CustomMultiAttributeDynaSortComparator getComparatorInstance(String input, String listType) {
			LinkedList<SecondSortAttributeDetails> list = MultiAttributeDynaSortComparator.convertStringToSortAttrList(input);
			CustomMultiAttributeDynaSortComparator comparator = null;
			if(list!=null) {
				comparator = new CustomMultiAttributeDynaSortComparator();
				comparator.setListType(listType);
				comparator.populateComparatorInstance(list);
			}
			return comparator;
		}
		@Override
		public CompareAttributes inputAttribtes(Object o1, Object o2) {
			if ("refundType".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();
				comAttr.setFirstObjectAttribute(getRefundType(o1));
				comAttr.setSecondObjectAttribute(getRefundType(o2));
				this.setAttribute("refundType");
				return comAttr;
			} else if ("totalValue".equals(this.getAttribute())) {
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("returnAll");
				CompareAttributes comAttr = new CompareAttributes();
				CompareAttributes returnAllAttr = super.inputAttribtes(o1, o2);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute(deriveAttirbuteFromRetAll((String) returnAllAttr
								.getFirstObjectAttribute()));
				String totalStrVal = getTotalValue(o1);
				comAttr.setFirstObjectAttribute(totalStrVal);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute(deriveAttirbuteFromRetAll((String) returnAllAttr
								.getSecondObjectAttribute()));
				totalStrVal = getTotalValue(o2);
				comAttr.setSecondObjectAttribute(totalStrVal);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("totalValue");

				return comAttr;
			} else if ("cashierName".equals(this.getAttribute())) {
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
			} else if ("voidItem".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();
				comAttr.setFirstObjectAttribute(getVoidItemFromTransRecAttr(o1));

				comAttr.setSecondObjectAttribute(getVoidItemFromTransRecAttr(o2));
				return comAttr;
			} else if ("article".equals(this.getAttribute())
					&& "Void".equals(this.getListType())) {
				CompareAttributes comAttr = super.inputAttribtes(o1, o2);
				if ("Transaction".equals(getVoidItemFromTransRecAttr(o1)) == true) {
					comAttr.setFirstObjectAttribute(null);
				}
				if ("Transaction".equals(getVoidItemFromTransRecAttr(o2)) == true) {
					comAttr.setSecondObjectAttribute(null);
				}
				//this.setAttribute("article");
				return comAttr;
			} else if ("article_T".equals(this.getAttribute())
					&& "Void".equals(this.getListType())) {
				CompareAttributes comAttr = super.inputAttribtes(o1, o2);
				if ("Transaction".equals(getVoidItemFromTransRecAttr(o1)) == true) {
					comAttr.setFirstObjectAttribute(null);
				}
				if ("Transaction".equals(getVoidItemFromTransRecAttr(o2)) == true) {
					comAttr.setSecondObjectAttribute(null);
				}
				//this.setAttribute("article_T");
				return comAttr;
			} else if ("department".equals(this.getAttribute())
					&& "Void".equals(this.getListType())) {
				CompareAttributes comAttr = super.inputAttribtes(o1, o2);
				if ("Transaction".equals(getVoidItemFromTransRecAttr(o1)) == true) {
					comAttr.setFirstObjectAttribute(null);
				}
				if ("Transaction".equals(getVoidItemFromTransRecAttr(o2)) == true) {
					comAttr.setSecondObjectAttribute(null);
				}
				//this.setAttribute("department");
				return comAttr;
			}
			return super.inputAttribtes(o1, o2);
		}

		public String getRefundType(Object o) {
			String attribute = this.getAttribute();
			String retVal = null;
			CustomMultiAttributeDynaSortComparator.this
					.setAttribute("refundTransaction");
			String refundTransStr = (String) this.getObjectAttributeValue(o);
			if (refundTransStr != null && !"".equals(refundTransStr.trim()) && Double.parseDouble(refundTransStr.trim())!=0.0) {
				retVal = "Transaction";
			} else {
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("refundItem");
				String refundItemStr = (String) this.getObjectAttributeValue(o);
				if (refundItemStr != null && !"".equals(refundItemStr.trim()) && Double.parseDouble(refundItemStr.trim())!=0.0) {
					retVal = "ITEM/LINE";
				}
			}
			this.setAttribute(attribute);
			return retVal;
		}

		public String deriveAttirbuteFromRetAll(String retAll) {
			if ("X".equals(retAll)) {
				return "refundTransaction";
			} else {
				return "refundItem";
			}

		}

		public String getTotalValue(Object o) {
			String totalStrVal = (String) super.getObjectAttributeValue(o);
			if (totalStrVal != null && !"".equals(totalStrVal.trim())) {
				totalStrVal = String.valueOf(Math.abs(Double
						.parseDouble(totalStrVal)));
			}
			return totalStrVal;
		}

		public String getCashierName(String firstName, String lastName) {
			if (firstName != null) {
				return firstName + " " + (lastName == null ? "" : lastName);
			} else {
				return lastName == null ? "" : lastName;
			}
		}

		public String getVoidItemFromTransRecAttr(Object o) {
			String attribute = this.getAttribute();
			this.setAttribute("transactionRecType");
			String transRecType = (String) super.getObjectAttributeValue(o);
			this.setAttribute("transactionType");
			String transType = (String) super.getObjectAttributeValue(o);
			String retVal = null;
			if ("1000".equals(transRecType)
					&& ("S102".equals(transType) || "RT01".equals(transType))) {
				// if(transType!=null && transType.matches("S102|RT01")) {
				retVal = "Transaction";
				// }
			} else if ("1100".equals(transRecType) && "S101".equals(transType)) {
				// if("S101".equals(transType)) {
				this.setAttribute("salesItemType");
				String salesItemType = (String) super.getObjectAttributeValue(o);
				if ("S203".equals(salesItemType)) {
					retVal = "ITEM/LINE";
				}
				// }
			}
			this.setAttribute(attribute);
			/*
			 * CustomMultiAttributeDynaSortComparator.this.setAttribute(
			 * "transItemLine"); String tranLineItem =
			 * super.getObjectAttributeValue(o); if(!(retVal==tranLineItem ||
			 * (tranLineItem !=null && tranLineItem.equals(retVal)))) {
			 * System.out.println("This is not equal "+retVal+" "+tranLineItem);
			 * }
			 */
			return retVal;
		}
	}
}
