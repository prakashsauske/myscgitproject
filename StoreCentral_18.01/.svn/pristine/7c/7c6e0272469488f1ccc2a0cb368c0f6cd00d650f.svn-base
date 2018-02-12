package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.PaidInPaidOutBean;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.PaidInPaidOutParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class PaidInPaidOutServiceImpl extends PosServiceImpl {

	private static final Logger LOGGER = Logger
			.getLogger(PaidInPaidOutServiceImpl.class.getName());

	@Autowired
	private JasperReportUtil jasper;

	@Value("${PaidInPaidOut}")
	private String paidInPaidOutUrl;

	public String getPaidInPaidOut(PaidInPaidOutParam param) {
		List<PaidInPaidOutBean> paidInPaidOutList = null;
		try {
			ParameterizedTypeReference<ServiceResponse<PaidInPaidOutBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<PaidInPaidOutBean>>(){};
			paidInPaidOutList = invokeService(param, paidInPaidOutUrl, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			 
			//paidInPaidOutList = mockPaidInPaidOutData();
			if (paidInPaidOutList==null || (paidInPaidOutList != null
					&& paidInPaidOutList.size() == 1
					&& PosReportConstantsInterfaces.NO_DATA_FOUND.equalsIgnoreCase(paidInPaidOutList
							.get(0).getNoDataFound()))) {
				if(CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				processPaidInPaidOutData(paidInPaidOutList);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance("type,int,asc,last,code,int,asc,last,date,date,asc,last");
				if (comparator != null) {
					Collections.sort(paidInPaidOutList, comparator);
					setLastRecordInfoOnBeanList(paidInPaidOutList);
				}
				param.setMsg("");
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(paidInPaidOutList, param.getMsg());

	}
	
	public ByteArrayOutputStream getPaidInPaidOutJasper(PaidInPaidOutParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) {
		List<PaidInPaidOutBean> paidInPaidOutList = null;
		ByteArrayOutputStream byos =  null;
		try {
			
			paidInPaidOutList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT, PaidInPaidOutBean.class);
			if(paidInPaidOutList  == null) {
				ParameterizedTypeReference<ServiceResponse<PaidInPaidOutBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<PaidInPaidOutBean>>(){};
				paidInPaidOutList = invokeService(param, paidInPaidOutUrl, typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			//paidInPaidOutList = mockPaidInPaidOutData();
			if (paidInPaidOutList==null || (paidInPaidOutList != null
					&& paidInPaidOutList.size() == 1
					&& PosReportConstantsInterfaces.NO_DATA_FOUND.equalsIgnoreCase(paidInPaidOutList
							.get(0).getNoDataFound()))) {
				if(CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}

			processPaidInPaidOutData(paidInPaidOutList);
			CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
					.getComparatorInstance("type,int,asc,last,code,int,asc,last,date,date,asc,last");
			if (comparator != null && paidInPaidOutList!=null) {
				Collections.sort(paidInPaidOutList, comparator);
				// setLastRecordInfoOnBeanList(paidInPaidOutList);
			}
			List<PaidInPaidOutBean> duplicate = null;
			if(paidInPaidOutList!=null) {
				duplicate = CommonUtils.getCopyOfBeanList(paidInPaidOutList);
				removeFromList(duplicate, param.getSelectType());
			}
			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
					duplicate);
			HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
			reportInputParams.put("dateFrom", param.getDateFrom());
			reportInputParams.put("weekFromDateHide",
					param.getWeekFromDateHide());
			reportInputParams.put("weekToDateHide",
					param.getWeekFromDateHide());
			reportInputParams.put("selectType", param.getSelectType());
			reportInputParams.put("StoreNo", param.getSiteNo());
			reportInputParams.put("StoreName", param.getSiteName());
			reportInputParams.put("msg", param.getMsg());

			// param.setPrintReportFormat("PDF");
			jasper.setTimeZoneOffSet(reportInputParams, request, null);
			byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS,
					reportInputParams, srcPath, binPath);
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return byos;
	}

	
	public void processPaidInPaidOutData(List<PaidInPaidOutBean> obj) {
		if(obj != null) {
			for (PaidInPaidOutBean paidInPaidOutBean : obj) {
				if (CommonUtils
						.isNotNullNotEmptyNotWhiteSpace(paidInPaidOutBean
								.getType())) {
					paidInPaidOutBean.setTypeName(paidInPaidOutBean.getType()
							.matches("PAIN|TAPI") ? "Paid In" : paidInPaidOutBean
							.getType().matches("POUT|TAPO") ? "Paid Out" : null);
					// paidInPaidOutBean.setTypeSorter(paidInPaidOutBean.getType().matches("PAIN|TAPI")?0:paidInPaidOutBean.getType().matches("POUT|TAPO")?1:2);
				}
			}
		}
	}

	public void setLastRecordInfoOnBeanList(
			List<PaidInPaidOutBean> paidInPaidOutList) {
		if (paidInPaidOutList != null && !paidInPaidOutList.isEmpty()) {
			PaidInPaidOutBean prevBean = paidInPaidOutList.get(0);
			int size = paidInPaidOutList.size();
			for (int i = 1; i < size; i++) {
				PaidInPaidOutBean currBean = paidInPaidOutList.get(i);
				String prevType = null;
				String currType = null;
				String prevCode = null;
				String currCode = null;
				try {
					prevType = prevBean.getType().matches("PAIN|TAPI") ? "Paid In"
							: prevBean.getType().matches("POUT|TAPO") ? "Paid Out"
									: null;
				} catch (Exception e) {
				}
				try {
					currType = currBean.getType().matches("PAIN|TAPI") ? "Paid In"
							: currBean.getType().matches("POUT|TAPO") ? "Paid Out"
									: null;
				} catch (Exception e) {
				}
				if ((prevType != null && currType == null)
						|| (prevType == null && currType != null)
						|| (prevType != null && currType != null && !prevType
								.equalsIgnoreCase(currType))) {
					// set previous as last record
					prevBean.setTypeLast(true);
				}
				try {
					prevCode = prevBean.getCode();
				} catch (Exception e) {
				}
				try {
					currCode = currBean.getCode();
				} catch (Exception e) {
				}
				if ((prevCode != null && currCode == null)
						|| (prevCode == null && currCode != null)
						|| (prevCode != null && currCode != null && !prevCode
								.equalsIgnoreCase(currCode))) {
					// set previous as last record
					prevBean.setCodeLast(true);
				}
				prevBean = currBean;
			}
			prevBean.setTypeLast(true);
			prevBean.setCodeLast(true);
		}

	}

	public void removeFromList(List<PaidInPaidOutBean> list, String type) {
		ListIterator<PaidInPaidOutBean> listIterator = list.listIterator();
		while (listIterator.hasNext()) {
			PaidInPaidOutBean obj = listIterator.next();
			if (("PaidOut".equalsIgnoreCase(type) && ("PAIN"
					.equalsIgnoreCase(obj.getType()) || "TAPI"
					.equalsIgnoreCase(obj.getType()) || CommonUtils.isNullEmptyWhiteSpace(obj.getType())))
					|| ("PaidIn".equalsIgnoreCase(type) && ("POUT"
							.equalsIgnoreCase(obj.getType()) || "TAPO"
							.equalsIgnoreCase(obj.getType()) || CommonUtils.isNullEmptyWhiteSpace(obj.getType())))) {
				listIterator.remove();
			}

		}
	}
	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof PaidInPaidOutParam) {
			PaidInPaidOutParam param = (PaidInPaidOutParam)params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getWeekFromDateHide());
			map.put("ZV_TDATE_IM", param.getWeekToDateHide());
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
			if ("type".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				String ageVerificationResultAttr = (String) super
						.getObjectAttributeValue(o1);

				comAttr.setFirstObjectAttribute(decodeType(ageVerificationResultAttr));

				ageVerificationResultAttr = (String) super.getObjectAttributeValue(o2);

				comAttr.setSecondObjectAttribute(decodeType(ageVerificationResultAttr));

				return comAttr;
			}
			return super.inputAttribtes(o1, o2);
		}

		public String decodeType(String type) {
			try {
				return type.matches("PAIN|TAPI") ? "0" : type
						.matches("POUT|TAPO") ? "1" : "2";
			} catch (Exception e) {
				return "2";
			}
		}
	}

}
