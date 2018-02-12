package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.model.POSConsolidationDtl;
import au.com.woolworths.portal.pos.model.POSConsolidationStoreAndPOSDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.POSConsolidationParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;

public class POSConsolidationServiceImpl extends PosServiceImpl {

	private static final Logger LOGGER = Logger
			.getLogger(POSConsolidationServiceImpl.class.getName());
	private static Map<String, List<POSConsolidationStoreAndPOSDtl>> posConsolidationStorePOSIDMap = new HashMap<String, List<POSConsolidationStoreAndPOSDtl>>();

	@Value("${StoreAndPOSURL}")
	private String storeAndPOSURL;

	@Value("${POSConsolidationURL}")
	private String posConsolidationURL;

	@Autowired
	private JasperReportUtil jasper;

	@Autowired
	private JasperRptResponseHandlerUtil jasperRptResponseHandler;

	public String getStoreAndPOS(POSConsolidationParam param) {
		// setSiteDetailsInParams(param);
		List<POSConsolidationStoreAndPOSDtl> consolIdList = null;

		try {

			if (!posConsolidationStorePOSIDMap.containsKey(param.getSiteNo())) {
				ParameterizedTypeReference<ServiceResponse<POSConsolidationStoreAndPOSDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSConsolidationStoreAndPOSDtl>>() {
				};
				consolIdList = invokeService(param, storeAndPOSURL
						+ "(VAR_20111208223707='" + param.getSiteNo()
						+ "')/Results", typeRef);
				posConsolidationStorePOSIDMap.put(param.getSiteNo(),
						consolIdList);
			} else {
				consolIdList = posConsolidationStorePOSIDMap.get(param
						.getSiteNo());
			}

			if (consolIdList == null
					&& CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
				param.setMsg(Constants.TECH_ISSUE);
			}
		}

		catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(consolIdList, param.getMsg());

	}

	public String getPosConsolidation(POSConsolidationParam param) {
		List<POSConsolidationDtl> consolidationList = null;
		List<POSConsolidationDtl> duplicateList = null;
		List<String> posList = null;
		try {

			ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>>() {
			};
			consolidationList = invokeService(param, posConsolidationURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			if (consolidationList == null
					|| (consolidationList != null
							&& consolidationList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(consolidationList.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				duplicateList = CommonUtils
						.getCopyOfBeanList(consolidationList);
				ListIterator<POSConsolidationDtl> itr = duplicateList
						.listIterator();
				if (Constants.POS_MULTIPLE.equals(param.getPos())
						&& CommonUtils.isNotNullNotEmptyNotWhiteSpace(param
								.getPosIds())) {
					posList = Arrays.asList(param.getPosIds().split(","));
				}

				while (itr.hasNext()) {
					POSConsolidationDtl removePOS = itr.next();
					if (isZeroVal(removePOS.getOpeningLoan(),
							removePOS.getSalesTender(),
							removePOS.getTenderLoan(), removePOS.getPickUps(),
							removePOS.getPaidIns(), removePOS.getPaidOuts(),removePOS.getBorrowedFunds(),
							removePOS.getExpectedFunds())
							|| (posList != null && !posList.contains(removePOS
									.getPosNumber()))) {
						itr.remove();
					}
				}
				MultiAttributeDynaSortComparator comparator = MultiAttributeDynaSortComparator
						.getComparatorInstance("posNumber,int,asc,last");// ,tenderTypeT,string,asc
				if (duplicateList == null || duplicateList.isEmpty()) {
					param.setMsg(Constants.NDF);
				} else {
					Collections.sort(duplicateList, comparator);
				}
				// ObjectWriteToNReadFromFile.writeToFile("C:\\PosConsolidation.ser",
				// duplicateList);
				setLastRecordInfoOnBeanList(duplicateList);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(duplicateList, param.getMsg());

	}
	
	public String getALHdata(POSConsolidationParam param) {
		List<POSConsolidationDtl> consolidationList = null;
		List<POSConsolidationDtl> consolidationList1 = new ArrayList<POSConsolidationDtl>();
		List<POSConsolidationDtl> consolidationList2 = new ArrayList<POSConsolidationDtl>();
		List<POSConsolidationDtl> duplicateList = null;
		List<String> posList = null;
		try {

			ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>>() {
			};
			consolidationList = invokeService(param, posConsolidationURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			if (consolidationList == null
					|| (consolidationList != null
							&& consolidationList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(consolidationList.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				for(POSConsolidationDtl posdtl: consolidationList){
					if(!(posdtl.getPaidIns().equalsIgnoreCase("0.00000000000000") && posdtl.getPaidOuts().equalsIgnoreCase("0.00000000000000") && 
								posdtl.getBorrowedFunds().equalsIgnoreCase("0.00000000000000") && posdtl.getSalesTender().equalsIgnoreCase("0.00000000000000")
								&& posdtl.getPickUps().equalsIgnoreCase("0.00000000000000") && posdtl.getTenderLoan().equalsIgnoreCase("0.00000000000000"))){
							
							consolidationList1.add(posdtl);
						}
						/*System.out.println(posdtl.getPaidIns()); 
						System.out.println(posdtl.getPaidOuts());
						System.out.println(posdtl.getBorrowedFunds());*/
						
					}
					consolidationList2.addAll(consolidationList1);
					duplicateList = CommonUtils
							.getCopyOfBeanList(consolidationList2);
				ListIterator<POSConsolidationDtl> itr = duplicateList
						.listIterator();
				if (Constants.POS_MULTIPLE.equals(param.getPos())
						&& CommonUtils.isNotNullNotEmptyNotWhiteSpace(param
								.getPosIds())) {
					posList = Arrays.asList(param.getPosIds().split(","));
				}

				while (itr.hasNext()) {
					POSConsolidationDtl removePOS = itr.next();
					if (isZeroVal(removePOS.getOpeningLoan(),
							removePOS.getSalesTender(),
							removePOS.getTenderLoan(), removePOS.getPickUps(),
							removePOS.getPaidIns(), removePOS.getPaidOuts(),removePOS.getBorrowedFunds(),
							removePOS.getExpectedFunds())
							|| (posList != null && !posList.contains(removePOS
									.getPosNumber()))) {
						itr.remove();
					}
				}
				MultiAttributeDynaSortComparator comparator = MultiAttributeDynaSortComparator
						.getComparatorInstance("posNumber,int,asc,last");// ,tenderTypeT,string,asc
				if (duplicateList == null || duplicateList.isEmpty()) {
					param.setMsg(Constants.NDF);
				} else {
					Collections.sort(duplicateList, comparator);
				}
				// ObjectWriteToNReadFromFile.writeToFile("C:\\PosConsolidation.ser",
				// duplicateList);
				setLastRecordInfoOnBeanList(duplicateList);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(duplicateList, param.getMsg());

	}

	public ByteArrayOutputStream getPOSConsolidationJasper(
			POSConsolidationParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<POSConsolidationDtl> consolidationList = null;
		List<POSConsolidationDtl> duplicateList = null;
		List<String> posList = null;
		try {

			consolidationList = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT, POSConsolidationDtl.class);
			if (consolidationList == null) {
				ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>>() {
				};
				consolidationList = invokeService(param, posConsolidationURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (consolidationList == null
					|| (consolidationList != null
							&& consolidationList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(consolidationList.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				duplicateList = CommonUtils
						.getCopyOfBeanList(consolidationList);
				ListIterator<POSConsolidationDtl> itr = duplicateList
						.listIterator();
				if (Constants.POS_MULTIPLE.equals(param.getPos())
						&& CommonUtils.isNotNullNotEmptyNotWhiteSpace(param
								.getPosIds())) {
					posList = Arrays.asList(param.getPosIds().split(","));
				}

				while (itr.hasNext()) {
					POSConsolidationDtl removePOS = itr.next();
					if (isZeroVal(removePOS.getOpeningLoan(),
							removePOS.getSalesTender(),
							removePOS.getTenderLoan(), removePOS.getPickUps(),
							removePOS.getPaidIns(), removePOS.getPaidOuts(), removePOS.getBorrowedFunds(),
							removePOS.getExpectedFunds())
							|| (posList != null && !posList.contains(removePOS
									.getPosNumber()))) {
						itr.remove();
					}
				}
				MultiAttributeDynaSortComparator comparator = MultiAttributeDynaSortComparator
						.getComparatorInstance("posNumber,int,asc,last");
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
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				duplicateList);
		Map<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("dateFrom", param.getDateFrom());
		reportInputParams.put("pos", param.getPos());
		reportInputParams.put("weekFromDateHide", param.getWeekFromDateHide());
		reportInputParams.put("weekToDateHide", param.getWeekToDateHide());
		reportInputParams.put("msg", param.getMsg());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("StoreNo", param.getSiteNo());

		// param.setPrintReportFormat("PDF");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}
	
	public ByteArrayOutputStream getALHFinData(
			POSConsolidationParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<POSConsolidationDtl> consolidationList = null;
		List<POSConsolidationDtl> consolidationList1 = new ArrayList<POSConsolidationDtl>();
		List<POSConsolidationDtl> consolidationList2 = new ArrayList<POSConsolidationDtl>();
		List<POSConsolidationDtl> duplicateList = null;
		List<String> posList = null;
		try {

			consolidationList = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT, POSConsolidationDtl.class);
			if (consolidationList == null) {
				ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<POSConsolidationDtl>>() {
				};
				consolidationList = invokeService(param, posConsolidationURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (consolidationList == null
					|| (consolidationList != null
							&& consolidationList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(consolidationList.get(0)
										.getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				for(POSConsolidationDtl posdtl: consolidationList){
				if(!(posdtl.getPaidIns().equalsIgnoreCase("0.00000000000000") && posdtl.getPaidOuts().equalsIgnoreCase("0.00000000000000") && 
							posdtl.getBorrowedFunds().equalsIgnoreCase("0.00000000000000") && posdtl.getSalesTender().equalsIgnoreCase("0.00000000000000")
							&& posdtl.getPickUps().equalsIgnoreCase("0.00000000000000") && posdtl.getTenderLoan().equalsIgnoreCase("0.00000000000000"))){
						
						consolidationList1.add(posdtl);
					}
					/*System.out.println(posdtl.getPaidIns()); 
					System.out.println(posdtl.getPaidOuts());
					System.out.println(posdtl.getBorrowedFunds());*/
					
				}
				consolidationList2.addAll(consolidationList1);
				duplicateList = CommonUtils
						.getCopyOfBeanList(consolidationList2);
				ListIterator<POSConsolidationDtl> itr = duplicateList
						.listIterator();
				if (Constants.POS_MULTIPLE.equals(param.getPos())
						&& CommonUtils.isNotNullNotEmptyNotWhiteSpace(param
								.getPosIds())) {
					posList = Arrays.asList(param.getPosIds().split(","));
				}

				while (itr.hasNext()) {
					POSConsolidationDtl removePOS = itr.next();
					if (isZeroVal(removePOS.getOpeningLoan(),
							removePOS.getSalesTender(),
							removePOS.getTenderLoan(), removePOS.getPickUps(),
							removePOS.getPaidIns(), removePOS.getPaidOuts(), removePOS.getBorrowedFunds(),
							removePOS.getExpectedFunds())
							|| (posList != null && !posList.contains(removePOS
									.getPosNumber()))) {
						itr.remove();
					}
				}
				MultiAttributeDynaSortComparator comparator = MultiAttributeDynaSortComparator
						.getComparatorInstance("posNumber,int,asc,last");
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
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				duplicateList);
		Map<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("dateFrom", param.getDateFrom());
		reportInputParams.put("pos", param.getPos());
		reportInputParams.put("weekFromDateHide", param.getWeekFromDateHide());
		reportInputParams.put("weekToDateHide", param.getWeekToDateHide());
		reportInputParams.put("msg", param.getMsg());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("StoreNo", param.getSiteNo());

		// param.setPrintReportFormat("PDF");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	public void setLastRecordInfoOnBeanList(
			List<POSConsolidationDtl> posConsolidationList) {
		if (posConsolidationList != null && !posConsolidationList.isEmpty()) {
			POSConsolidationDtl prevBean = posConsolidationList.get(0);
			int size = posConsolidationList.size();
			for (int i = 1; i < size; i++) {
				POSConsolidationDtl currBean = posConsolidationList.get(i);
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

	private boolean isZeroVal(String... val) {
		boolean isAllZero = true;
		for (int i = 0; i < val.length; i++) {
			if (!isZeroVal(val[i])) {
				isAllZero = false;
				break;
			}
		}
		return isAllZero;
	}

	private boolean isZeroVal(String val) {
		try {
			if (CommonUtils.isNullEmptyWhiteSpace(val)
					|| Double.parseDouble(val) == 0.0) {
				return true;
			}
		} catch (Exception e) {
			return true;
		}
		return false;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof POSConsolidationParam) {
			POSConsolidationParam param = (POSConsolidationParam) params;
			param.setWeekYear(param.getWeekYear());
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getWeekFromDateHide());// ZV_CALDAY_MIV_003 SC 449
			map.put("ZV_TDATE_IM",
					(CommonUtils.isNullEmptyWhiteSpace(param
							.getWeekToDateHide()) ? param.getWeekFromDateHide()
							: param.getWeekToDateHide())); //ZV_CALDAY_MIV_003To SC 449 // ZV_POSD_C0001
			map.put("ZV_POSD_C0001", (Constants.POS_SINGLE.equals(param
					.getPos()) ? param.getUserID().trim() : null));
			map.put("VAR_20111208223707", param.getSiteNo());

			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("ZV_DATE_IM"); // ZV_CALDAY_MIV_003 SC 449 
			mandatoryParams.add("ZV_TDATE_IM"); //ZV_CALDAY_MIV_003To SC 449
			mandatoryParams.add("VAR_20111208223707");

			List<String> dateParams = new ArrayList<String>();
			dateParams.add("ZV_DATE_IM"); // ZV_CALDAY_MIV_003 SC 449
			dateParams.add("ZV_TDATE_IM");//ZV_CALDAY_MIV_003To SC 449

			if (checkAndUpdateMandatoryParams(map, mandatoryParams, dateParams) == false) {
				param.setMsg(PosReportConstantsInterfaces.MANDATORY);
				return null;
			}
			return getUrlParams(map);
		} else {
			return null;
		}
	}
}
