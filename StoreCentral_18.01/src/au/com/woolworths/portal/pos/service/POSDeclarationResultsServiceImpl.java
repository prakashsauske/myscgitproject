package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.POSDeclarationDtl;
import au.com.woolworths.portal.pos.model.PosDeclarationGrpBean;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.POSDeclarationParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;

public class POSDeclarationResultsServiceImpl extends PosServiceImpl {

	@Value("${POSDeclarationURL}")
	private String posDeclarationURL;

	@Value("${StoreAndCashierNameURL}")
	private String storeAndCashierNameURL;

	@Autowired
	private JasperReportUtil jasper;

	public static Map<String, List<POSDeclarationDtl>> posDeclarationStorePOSMap = new HashMap<String, List<POSDeclarationDtl>>();

	private static final Logger LOGGER = Logger
			.getLogger(POSDeclarationResultsServiceImpl.class.getName());

	public String getStoreAndCashierName(POSDeclarationParam param) {
		List<POSDeclarationDtl> cashierList = null;

		try {

			if (!posDeclarationStorePOSMap.containsKey(param.getSiteNo())) {
				ParameterizedTypeReference<ServiceResponse<POSDeclarationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSDeclarationDtl>>() {
				};
				cashierList = invokeService(param, storeAndCashierNameURL
						+ "(VAR_20111208223707='" + param.getSiteNo()
						+ "')/Results", typeRef);
				posDeclarationStorePOSMap.put(param.getSiteNo(), cashierList);
			} else {
				cashierList = posDeclarationStorePOSMap.get(param.getSiteNo());
			}
			if (cashierList == null
					&& CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
				param.setMsg(Constants.TECH_ISSUE);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(cashierList, param.getMsg());
	}

	public String getPosDeclaration(POSDeclarationParam param) {
		List<POSDeclarationDtl> declarationList = null;
		List<POSDeclarationDtl> duplicateList = null;
		try {
			ParameterizedTypeReference<ServiceResponse<POSDeclarationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSDeclarationDtl>>() {
			};
			declarationList = invokeService(param, posDeclarationURL, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);
			if (declarationList == null
					|| (declarationList != null && declarationList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(declarationList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				duplicateList = CommonUtils.getCopyOfBeanList(declarationList);
				MultiAttributeDynaSortComparator comparator = MultiAttributeDynaSortComparator
						.getComparatorInstance("posNumber,int,asc,last,sortDate,date,asc,last,timeT,time,asc,last");// ,tenderTypeT,string,asc
				if (duplicateList == null || duplicateList.isEmpty()) {
					param.setMsg(Constants.NDF);
				} else {
					Collections.sort(duplicateList, comparator);
				}
				// ObjectWriteToNReadFromFile.writeToFile("C:\\PosDeclaration.ser",
				// duplicateList);
				setLastRecordInfoOnBeanList(duplicateList);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertPOSDeclarationDtlTojson(duplicateList, param.getMsg());
	}

	public ByteArrayOutputStream getPosDeclarationJasper(
			POSDeclarationParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<POSDeclarationDtl> declarationList = null;
		List<POSDeclarationDtl> duplicateList = null;
		try {
			declarationList = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT, POSDeclarationDtl.class);
			if (declarationList == null) {
				ParameterizedTypeReference<ServiceResponse<POSDeclarationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSDeclarationDtl>>() {
				};
				declarationList = invokeService(param, posDeclarationURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (declarationList == null
					|| (declarationList != null && declarationList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equalsIgnoreCase(declarationList.get(0)
									.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				duplicateList = CommonUtils.getCopyOfBeanList(declarationList);
				MultiAttributeDynaSortComparator comparator = MultiAttributeDynaSortComparator
						.getComparatorInstance("posNumber,int,asc,last,sortDate,date,asc,last,timeT,time,asc,last");// ,tenderTypeT,string,asc
				if (duplicateList == null || duplicateList.isEmpty()) {
					param.setMsg(Constants.NDF);
				} else {
					Collections.sort(duplicateList, comparator);
				}
				// setLastRecordInfoOnBeanList(duplicateList);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		List<PosDeclarationGrpBean> lst = null;
		if (duplicateList != null && !duplicateList.isEmpty()) {
			PosDeclarationGrpBean bean = new PosDeclarationGrpBean();
			bean.setOperatorName("yes".equalsIgnoreCase(param.getYes()));
			bean.setPosDeclaration(duplicateList);
			lst = new ArrayList<PosDeclarationGrpBean>();
			lst.add(bean);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(lst);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("dateFrom", param.getDateFrom());
		reportInputParams.put("pos", param.getPos());
		reportInputParams.put("weekFromDateHide", param.getWeekFromDateHide());
		reportInputParams.put("weekToDateHide", param.getWeekToDateHide());
		reportInputParams.put("msg", param.getMsg());
		reportInputParams.put("StoreName", param.getSiteName());
		reportInputParams.put("StoreNo", param.getSiteNo());
		// reportInputParams.put("yes", param.getYes());

		// param.setPrintReportFormat("PDF");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	private String convertPOSDeclarationDtlTojson(
			List<POSDeclarationDtl> declarationMap, String msg) {
		return "{\"data\":" + Constants.convertToJsonString(declarationMap)
				+ ",\"msg\":\"" + msg + "\"}";
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof POSDeclarationParam) {
			POSDeclarationParam param = (POSDeclarationParam) params;
			param.setWeekYear(param.getWeekYear());
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getWeekFromDateHide()); // ZV_CALDAY_MIV_003 SC 449
			map.put("ZV_TDATE_IM",
					(CommonUtils.isNullEmptyWhiteSpace(param
							.getWeekToDateHide()) ? param.getWeekFromDateHide()
							: param.getWeekToDateHide())); //ZV_CALDAY_MIV_003To SC 449 // ZV_POSD_C0001
			map.put("ZV_CASHR_C001", (Constants.POS_SINGLE.equals(param
					.getPos()) ? param.getUserID().trim() : null));
			map.put("ZV_POSD_C0001", null);
			map.put("VAR_20111208223707", param.getSiteNo());

			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("ZV_DATE_IM"); // ZV_CALDAY_MIV_003 SC 449
			mandatoryParams.add("ZV_TDATE_IM"); //ZV_CALDAY_MIV_003To SC 449
			mandatoryParams.add("VAR_20111208223707");

			List<String> dateParams = new ArrayList<String>();
			dateParams.add("ZV_DATE_IM"); // ZV_CALDAY_MIV_003 SC 449
			dateParams.add("ZV_TDATE_IM"); //ZV_CALDAY_MIV_003To SC 449

			if (checkAndUpdateMandatoryParams(map, mandatoryParams, dateParams) == false) {
				param.setMsg(PosReportConstantsInterfaces.MANDATORY);
				return null;
			}
			return getUrlParams(map);
		} else {
			return null;
		}
	}

	private void setLastRecordInfoOnBeanList(
			List<POSDeclarationDtl> posConsolidationList) {
		if (posConsolidationList != null && !posConsolidationList.isEmpty()) {
			POSDeclarationDtl prevBean = posConsolidationList.get(0);
			int size = posConsolidationList.size();
			for (int i = 1; i < size; i++) {
				POSDeclarationDtl currBean = posConsolidationList.get(i);
				String prevPosNumber = prevBean.getPosNumber();
				String currPosNumber = currBean.getPosNumber();
				if ((prevPosNumber == null && currPosNumber != null)
						|| (prevPosNumber != null && currPosNumber == null)
						|| !prevPosNumber.equals(currPosNumber)) {
					prevBean.setGrpLastRec(true);
				}
				prevBean = currBean;
			}
			prevBean.setGrpLastRec(true);
		}
	}

}
