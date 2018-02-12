package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
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

import au.com.woolworths.portal.pos.model.InvesNoSalesDtl;
import au.com.woolworths.portal.pos.model.InvesOperatorLocationHistoryTransacDtl;
import au.com.woolworths.portal.pos.model.InvestDepartmentSaleTransacDtl;
import au.com.woolworths.portal.pos.model.PriceInquiryDetailBean;
import au.com.woolworths.portal.pos.model.PriceMarkdownDtl;
import au.com.woolworths.portal.pos.model.SavedTransactionDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.model.SoldOverRestrictedQtyDtl;
import au.com.woolworths.portal.pos.param.InvesDepartmentSaleTransParam;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class InvestigateTransactionServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	@Value("${POSInvesArticleSoldByDepartURL}")
	private String posArticleSoldByDepartURL;

	@Value("${POSPriceMarkdownURL}")
	private String posPriceMarkDownURL;

	@Value("${POSInvesNoSalesURL}")
	private String posInvesNoSalesURL;

	@Value("${POSOperatorLocationHistoryURL}")
	private String posOperatorLocationHistoryURL;

	@Value("${POSInvesSoldOverRestQtyURL}")
	private String posInvesSoldOverRestQtyURL;

	@Value("${POSInvesSavedTransactionURL}")
	private String posInvesSavedTransactionURL;

	@Value("${priceInquiryURL}")
	private String priceInquiryURL;

	private static final Logger LOGGER = Logger
			.getLogger(InvestigateTransactionServiceImpl.class.getName());

	public String getPriceMarkdown(InvesDepartmentSaleTransParam param) {
		List<PriceMarkdownDtl> priceMarkDown = null;
		try {
			ParameterizedTypeReference<ServiceResponse<PriceMarkdownDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<PriceMarkdownDtl>>() {
			};
			priceMarkDown = invokeService(param, posPriceMarkDownURL, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);

			if (priceMarkDown == null
					|| (priceMarkDown != null && priceMarkDown.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(priceMarkDown.get(0).getNoDataFound()))) {
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

		return convertTojson(priceMarkDown, param.getMsg());

	}

	public ByteArrayOutputStream getPriceMarkdownJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<PriceMarkdownDtl> priceMarkDown = null;
		List<PriceMarkdownDtl> priceMarkDownCopy = null;
		try {
			priceMarkDown = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT,
					PriceMarkdownDtl.class);
			if (priceMarkDown == null) {
				ParameterizedTypeReference<ServiceResponse<PriceMarkdownDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<PriceMarkdownDtl>>() {
				};
				priceMarkDown = invokeService(param, posPriceMarkDownURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			CustomMultiAttributeDynaSortComparator priceMarkdownComparator = CustomMultiAttributeDynaSortComparator
					.getComparatorInstance(param.getPriceMarkAttr());
			priceMarkDownCopy = CommonUtils.getCopyOfBeanList(priceMarkDown);
			if (priceMarkdownComparator != null) {
				Collections.sort((List<PriceMarkdownDtl>) priceMarkDownCopy,
						priceMarkdownComparator);
			}

		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);

		}
		// au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.writeToFile("c:\\ManualPriceOverride.ser",
		// priceMarkDown);
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				priceMarkDownCopy);

		// String remportName = investTransOperatorHistory;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("priceDate", param.getPriceDate());
		reportInputParams.put("priceTime", param.getPriceTime());
		reportInputParams.put("priceTran", param.getPriceTran());
		reportInputParams.put("pricePosi", param.getPricePosi());
		reportInputParams.put("pricePoso", param.getPricePoso());
		reportInputParams.put("priceAuth", param.getPriceAuth());
		reportInputParams.put("priceArtn", param.getPriceArtn());
		reportInputParams.put("priceArtd", param.getPriceArtd());
		reportInputParams.put("priceQty", param.getPriceQty());
		reportInputParams.put("priceReas", param.getPriceReas());
		reportInputParams.put("priceRetp", param.getPriceRetp());
		reportInputParams.put("priceTot", param.getPriceTot());
		reportInputParams.put("pricePricd", param.getPricePricd());
		reportInputParams.put("pricePerc", param.getPricePerc());

		reportInputParams.put("reportNameInves",
				"Manual Price Override /RTC Transactions");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	public String getArticleSoldByDept(InvesDepartmentSaleTransParam param) {
		List<InvestDepartmentSaleTransacDtl> deptSaleTransac = null;
		try {
			ParameterizedTypeReference<ServiceResponse<InvestDepartmentSaleTransacDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<InvestDepartmentSaleTransacDtl>>() {
			};
			deptSaleTransac = invokeService(param, posArticleSoldByDepartURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);

			if (deptSaleTransac == null
					|| (deptSaleTransac != null && deptSaleTransac.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(deptSaleTransac.get(0).getNoDataFound()))) {
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
		return convertTojson(deptSaleTransac, param.getMsg());
	}

	public ByteArrayOutputStream getArticleSoldByDeptJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<InvestDepartmentSaleTransacDtl> deptSaleTransac = null;
		List<InvestDepartmentSaleTransacDtl> deptSaleTransacCopy = null;
		try {
			deptSaleTransac = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					InvestDepartmentSaleTransacDtl.class);
			if (deptSaleTransac == null) {
				ParameterizedTypeReference<ServiceResponse<InvestDepartmentSaleTransacDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<InvestDepartmentSaleTransacDtl>>() {
				};
				deptSaleTransac = invokeService(param,
						posArticleSoldByDepartURL, typeRef,
						PosReportConstantsInterfaces.PRINT_RPT);
			}

			if (deptSaleTransac == null
					|| (deptSaleTransac != null && deptSaleTransac.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(deptSaleTransac.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator deptSaleComparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getDeptSaleTranAttr());
				deptSaleTransacCopy = CommonUtils.getCopyOfBeanList(deptSaleTransac);
				if (deptSaleComparator != null) {
					Collections
							.sort((List<InvestDepartmentSaleTransacDtl>) deptSaleTransacCopy,
									deptSaleComparator);
				}
			}

		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				deptSaleTransacCopy);
		// String remportName = investTransOperatorHistory;
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("deptDate", param.getDeptDate());
		reportInputParams.put("deptTime", param.getDeptTime());
		reportInputParams.put("deptTran", param.getDeptTran());
		reportInputParams.put("deptPosi", param.getDeptPosi());
		reportInputParams.put("deptPoso", param.getDeptPoso());
		reportInputParams.put("deptAuth", param.getDeptAuth());
		reportInputParams.put("deptDept", param.getDeptDept());
		reportInputParams.put("deptTot", param.getDeptTot());
		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	public String getNoSalesTrans(InvesDepartmentSaleTransParam param) {
		List<InvesNoSalesDtl> noSalesList = null;
		try {
			ParameterizedTypeReference<ServiceResponse<InvesNoSalesDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<InvesNoSalesDtl>>() {
			};
			noSalesList = invokeService(param, posInvesNoSalesURL, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);

			if (noSalesList == null
					|| (noSalesList != null && noSalesList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(noSalesList.get(0).getNoDataFound()))) {
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

		return convertTojson(noSalesList, param.getMsg());
	}

	public ByteArrayOutputStream getNoSalesTransJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<InvesNoSalesDtl> noSalesList = null;
		List<InvesNoSalesDtl> noSalesListCopy = null;
		try {

			noSalesList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT,
					InvesNoSalesDtl.class);
			if (noSalesList == null) {
				ParameterizedTypeReference<ServiceResponse<InvesNoSalesDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<InvesNoSalesDtl>>() {
				};
				noSalesList = invokeService(param, posInvesNoSalesURL, typeRef,
						PosReportConstantsInterfaces.PRINT_RPT);
			}

			if (noSalesList == null
					|| (noSalesList != null && noSalesList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(noSalesList.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator noSalesComparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getNoSalesAttr());
				noSalesListCopy = CommonUtils.getCopyOfBeanList(noSalesList);
				if (noSalesComparator != null) {
					Collections.sort((List<InvesNoSalesDtl>) noSalesListCopy,
							noSalesComparator);
				}
			}

		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				noSalesListCopy);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("nosalesDate", param.getNosalesDate());
		reportInputParams.put("nosalesTime", param.getNosalesTime());
		reportInputParams.put("nosalesTran", param.getNosalesTran());
		reportInputParams.put("nosalesPosi", param.getNosalesPosi());
		reportInputParams.put("nosalesPoso", param.getNosalesPoso());
		reportInputParams.put("nosalesReas", param.getNosalesReas());

		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	public String getSoldOverRestr(InvesDepartmentSaleTransParam param) {
		List<SoldOverRestrictedQtyDtl> soldOverRestrictedDtl = new ArrayList<SoldOverRestrictedQtyDtl>();

		try {
			ParameterizedTypeReference<ServiceResponse<SoldOverRestrictedQtyDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<SoldOverRestrictedQtyDtl>>() {
			};
			soldOverRestrictedDtl = invokeService(param,
					posInvesSoldOverRestQtyURL, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);

			if (soldOverRestrictedDtl == null
					|| (soldOverRestrictedDtl != null
							&& soldOverRestrictedDtl.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equals(soldOverRestrictedDtl.get(0)
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

		return convertTojson(soldOverRestrictedDtl, param.getMsg());

	}

	public ByteArrayOutputStream getSoldOverRestrJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<SoldOverRestrictedQtyDtl> soldOverList = null;
		List<SoldOverRestrictedQtyDtl> soldOverListCopy = null;
		Double totSoldAmount = 0.00;
		try {
			soldOverList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT,
					SoldOverRestrictedQtyDtl.class);
			if (soldOverList == null) {
				ParameterizedTypeReference<ServiceResponse<SoldOverRestrictedQtyDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<SoldOverRestrictedQtyDtl>>() {
				};
				soldOverList = invokeService(param, posInvesSoldOverRestQtyURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}

			if (soldOverList == null
					|| (soldOverList != null && soldOverList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(soldOverList.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator soldOverComparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getSoldOverAttr());
				soldOverListCopy = CommonUtils.getCopyOfBeanList(soldOverList);
				if (soldOverComparator != null) {
					Collections.sort(
							(List<SoldOverRestrictedQtyDtl>) soldOverListCopy,
							soldOverComparator);
				}

			}
			for (int i = 0; i < soldOverListCopy.size(); i++) {
				totSoldAmount = totSoldAmount
						+ Double.parseDouble(soldOverListCopy.get(i)
								.getSoldOverAmount());
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				soldOverListCopy);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());
		reportInputParams.put("totSavedAmount", totSoldAmount);
		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	public String getSavedTrans(InvesDepartmentSaleTransParam param) {
		List<SavedTransactionDtl> savedTransDtl = new ArrayList<SavedTransactionDtl>();
		try {

			ParameterizedTypeReference<ServiceResponse<SavedTransactionDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<SavedTransactionDtl>>() {
			};
			savedTransDtl = invokeService(param, posInvesSavedTransactionURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);

			if (savedTransDtl == null
					|| (savedTransDtl != null && savedTransDtl.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(savedTransDtl.get(0).getNoDataFound()))) {
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

		return convertTojson(savedTransDtl, param.getMsg());

	}

	public ByteArrayOutputStream getSavedTransJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<SavedTransactionDtl> savedList = null;
		List<SavedTransactionDtl> savedListCopy = null;
		try {

			savedList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT,
					SavedTransactionDtl.class);
			if (savedList == null) {
				ParameterizedTypeReference<ServiceResponse<SavedTransactionDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<SavedTransactionDtl>>() {
				};
				savedList = invokeService(param, posInvesSavedTransactionURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}

			if (savedList == null
					|| (savedList != null && savedList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(savedList.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator savedComparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getSavedAttr());
				savedListCopy = CommonUtils.getCopyOfBeanList(savedList);
				if (savedComparator != null) {
					Collections.sort((List<SavedTransactionDtl>) savedListCopy,
							savedComparator);
				}
			}

		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				savedListCopy);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("saveTraDate", param.getSaveTraDate());
		reportInputParams.put("saveTraTime", param.getSaveTraTime());
		reportInputParams.put("saveTraTran", param.getSaveTraTran());
		reportInputParams.put("saveTraPosi", param.getSaveTraPosi());
		reportInputParams.put("saveTraPoso", param.getSaveTraPoso());
		reportInputParams.put("saveTraAmou", param.getSaveTraAmou());

		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
	}

	public String getOperatorLocationHistory(InvesDepartmentSaleTransParam param) {
		List<InvesOperatorLocationHistoryTransacDtl> opeatorLocation = null;
		try {
			ParameterizedTypeReference<ServiceResponse<InvesOperatorLocationHistoryTransacDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<InvesOperatorLocationHistoryTransacDtl>>() {
			};
			opeatorLocation = invokeService(param,
					posOperatorLocationHistoryURL, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);

			if (opeatorLocation == null
					|| (opeatorLocation != null && opeatorLocation.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(opeatorLocation.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				param.setMsg("");
				// ObjectWriteToNReadFromFile.writeToFile("c:/OperLocHist.ser",
				// opeatorLocation);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(opeatorLocation, param.getMsg());
	}

	public ByteArrayOutputStream getOperatorLocationHistoryJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<InvesOperatorLocationHistoryTransacDtl> opeatorLocation = null;
		List<InvesOperatorLocationHistoryTransacDtl> opeatorLocationCopy = null;
		try {
			opeatorLocation = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					InvesOperatorLocationHistoryTransacDtl.class);
			if (opeatorLocation == null) {
				ParameterizedTypeReference<ServiceResponse<InvesOperatorLocationHistoryTransacDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<InvesOperatorLocationHistoryTransacDtl>>() {
				};
				opeatorLocation = invokeService(param,
						posOperatorLocationHistoryURL, typeRef,
						PosReportConstantsInterfaces.PRINT_RPT);
			}

			if (opeatorLocation == null
					|| (opeatorLocation != null && opeatorLocation.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(opeatorLocation.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getOperatorLocAttr());
				opeatorLocationCopy = CommonUtils.getCopyOfBeanList(opeatorLocation);
				if (comparator != null) {
					Collections.sort(opeatorLocationCopy, comparator);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				opeatorLocationCopy);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("calendarDayTo", param.getCalendarDayTo());
		reportInputParams
				.put("cashierSignInTime", param.getCashierSignInTime());
		reportInputParams.put("calendarDayToEnd", param.getCalendarDayToEnd());
		reportInputParams.put("cashierSignOutTime",
				param.getCashierSignOutTime());
		reportInputParams.put("posNumber", param.getPosNumber());
		reportInputParams.put("cashierName", param.getCashierName());
		reportInputParams.put("startEndTrans", param.getStartEndTrans());
		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;

	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof InvesDepartmentSaleTransParam) {
			InvesDepartmentSaleTransParam param = (InvesDepartmentSaleTransParam) params;
			Map<String, String> map = new HashMap<String, String>();
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

	public String getPriceInquiry(InvesDepartmentSaleTransParam param) {
		List<PriceInquiryDetailBean> priceInquiryLst = null;
		try {
			ParameterizedTypeReference<ServiceResponse<PriceInquiryDetailBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<PriceInquiryDetailBean>>() {
			};
			priceInquiryLst = invokeService(param, priceInquiryURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);

			if (priceInquiryLst == null
					|| (priceInquiryLst != null && priceInquiryLst.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(priceInquiryLst.get(0).getNoDataFound()))) {
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
		return convertTojson(priceInquiryLst, param.getMsg());
	}
	public ByteArrayOutputStream getPriceInquiryJasper(
			InvesDepartmentSaleTransParam param, String rptName,
			String srcPath, String binPath, HttpServletRequest request) throws JRException, IOException {
		List<PriceInquiryDetailBean> priceInquiryLst = null;
		List<PriceInquiryDetailBean> priceInquiryLstCopy = null;
		try {
			priceInquiryLst = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					PriceInquiryDetailBean.class);
			if (priceInquiryLst == null) {
				ParameterizedTypeReference<ServiceResponse<PriceInquiryDetailBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<PriceInquiryDetailBean>>() {
				};
				priceInquiryLst = invokeService(param,
						priceInquiryURL, typeRef,
						PosReportConstantsInterfaces.PRINT_RPT);
			}

			if (priceInquiryLst == null
					|| (priceInquiryLst != null && priceInquiryLst.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(priceInquiryLst.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param.getPriceInquiryAttr());
				priceInquiryLstCopy = CommonUtils.getCopyOfBeanList(priceInquiryLst);
				if (comparator != null) {
					Collections.sort(priceInquiryLstCopy, comparator);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				priceInquiryLstCopy);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());

		reportInputParams.put("priceInqDate", param.getPriceInqDate());
		reportInputParams
				.put("priceInqTime", param.getPriceInqTime());
		reportInputParams.put("priceInqTran", param.getPriceInqTran());
		reportInputParams.put("priceInqPosi",
				param.getPriceInqPosi());
		reportInputParams.put("priceInqPoso", param.getPriceInqPoso());
		reportInputParams.put("priceInqArti", param.getPriceInqArti());
		reportInputParams.put("priceInqArtiDesc", param.getPriceInqArtiDesc());
		reportInputParams.put("priceInqArtiStats", param.getPriceInqArtiStats());
		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
				reportInputParams, srcPath, binPath);
		return byos;
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

		@Override
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
			} else if ("transNoRange".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("startOfTransaction");
				String startOfTransaction = (String) super
						.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("endOfTransaction");
				String endOfTransaction = (String) super
						.getObjectAttributeValue(o1);
				comAttr.setFirstObjectAttribute(getTransNoRange(
						startOfTransaction, endOfTransaction));

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("startOfTransaction");
				startOfTransaction = (String) super.getObjectAttributeValue(o1);

				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("endOfTransaction");
				endOfTransaction = (String) super.getObjectAttributeValue(o1);
				comAttr.setSecondObjectAttribute(getTransNoRange(
						startOfTransaction, endOfTransaction));
				CustomMultiAttributeDynaSortComparator.this
						.setAttribute("transNoRange");

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

		public String getTransNoRange(String startOfTransaction,
				String endOfTransaction) {
			return (startOfTransaction == null ? "" : startOfTransaction) + "-"
					+ (endOfTransaction == null ? "" : endOfTransaction);
		}
	}
}
