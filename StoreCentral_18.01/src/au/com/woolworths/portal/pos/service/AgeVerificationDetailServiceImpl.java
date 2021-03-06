package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.sql.Timestamp;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Calendar;
import java.text.ParseException;
import java.util.Collections;
import java.util.Date;
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

import au.com.woolworths.portal.pos.model.AgeVerificationDetailBean;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.AgeVerificationDetailsParam;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class AgeVerificationDetailServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	@Value("${AgeVerificationDetail}")
	private String ageVerificationDetailsUrl;

	private static final Logger LOGGER = Logger
			.getLogger(AgeVerificationDetailServiceImpl.class.getName());

	public String getAgeVerificationDetails(AgeVerificationDetailsParam param) {
		List<AgeVerificationDetailBean> ageVerificationDetailList = null;
		try {
			ParameterizedTypeReference<ServiceResponse<AgeVerificationDetailBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<AgeVerificationDetailBean>>() {
			};
			ageVerificationDetailList = invokeService(param,
					ageVerificationDetailsUrl, typeRef,
					PosReportConstantsInterfaces.GENERATE_RPT);
			// ageVerificationDetailList = getMockedResponse();
			if (ageVerificationDetailList == null
					|| (ageVerificationDetailList != null
							&& ageVerificationDetailList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(ageVerificationDetailList
										.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}else {
			
				processDateTime(ageVerificationDetailList, param);
				param.setMsg("");
			}
			
		} catch (Exception e) {
			e.printStackTrace();
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(ageVerificationDetailList, param.getMsg());
	}

	public ByteArrayOutputStream getAgeVerificationDetailsJasper(
			AgeVerificationDetailsParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) {
		List<AgeVerificationDetailBean> ageVerificationDetailList = null;
		ByteArrayOutputStream byos = null;
		try {
			/*ageVerificationDetailList = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT, AgeVerificationDetailBean.class);*/
			if (ageVerificationDetailList == null) {
				ParameterizedTypeReference<ServiceResponse<AgeVerificationDetailBean>> typeRef = new ParameterizedTypeReference<ServiceResponse<AgeVerificationDetailBean>>() {
				};
				ageVerificationDetailList = invokeService(param,
						ageVerificationDetailsUrl, typeRef,
						PosReportConstantsInterfaces.PRINT_RPT);
			}
			// ageVerificationDetailList = getMockedResponse();
			if (ageVerificationDetailList == null
					|| (ageVerificationDetailList != null
							&& ageVerificationDetailList.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
								.equalsIgnoreCase(ageVerificationDetailList
										.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				processDateTime(ageVerificationDetailList, param);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(param
								.getAgeVerificationDetailsAttr());
				if (comparator != null && ageVerificationDetailList != null) {
					Collections.sort(ageVerificationDetailList, comparator);
				}
			}
			JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
					ageVerificationDetailList);
			HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
			reportInputParams.put("FromDate", param.getDateFrom());
			reportInputParams.put("ToDate", param.getDateTo());
			reportInputParams.put("fromTime", param.getFromTime());
			reportInputParams.put("toTime", param.getToTime());
			reportInputParams.put("StoreNo", param.getSiteNo());
			reportInputParams.put("StoreName", param.getSiteName());

			reportInputParams.put("ageDate", param.getAgeDate());
			reportInputParams.put("ageName", param.getAgeName());
			reportInputParams.put("ageTran", param.getAgeTran());
			reportInputParams.put("ageTime", param.getAgeTime());
			reportInputParams.put("agePosi", param.getAgePosi());
			reportInputParams.put("ageKeyd", param.getAgeKeyd());
			reportInputParams.put("ageResu", param.getAgeResu());
			reportInputParams.put("selectType", param.getSelectType());
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

	private void processDateTime(List<AgeVerificationDetailBean> list,
			AgeVerificationDetailsParam param) {
		
		if (list != null) {
			ListIterator<AgeVerificationDetailBean> listIterator = list
					.listIterator();
			
			while (listIterator.hasNext()) {
				
				Date d1=new Date();
				AgeVerificationDetailBean ageVerificationDetailBean = listIterator
						.next();
				 SimpleDateFormat sdf = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy");
				    try {
						 d1 = sdf.parse(ageVerificationDetailBean.getTime());
					} catch (ParseException e) {
						// TODO Auto-generated catch block
						e.printStackTrace();
					}
				if (d1 != null
						&& (d1.before(
								param.getDtFrom()) || d1.after(param.getDtTo()))) {
					listIterator.remove();
				}
			}
			for (AgeVerificationDetailBean ageVerificationDetailBean : list) {
				// NumberFormat nf = new DecimalFormat("000000");
				 Date parsedDate = new Date();
				String tmpTime = (ageVerificationDetailBean.getTime() == null
						|| "#".equalsIgnoreCase(ageVerificationDetailBean.getTime()) ? "00:00"
						: ageVerificationDetailBean.getTime());
				String[] timeArray = tmpTime.split(":");
				Date tmpDate = ageVerificationDetailBean.getDate();
				if (tmpDate != null) {
					Calendar cal = Calendar.getInstance();
					cal.setTime(tmpDate);
					/*cal.set(Calendar.HOUR_OF_DAY,
							Integer.parseInt(timeArray[0]));
					cal.set(Calendar.MINUTE, Integer.parseInt(timeArray[1]));
					cal.set(Calendar.SECOND, Integer.parseInt(timeArray[2]));*/
					tmpDate = cal.getTime();
					ageVerificationDetailBean.setDateTime(tmpDate);
				}
				if (tmpTime != null && tmpTime != "00:00" && tmpTime.length()>5) {
					try {
					    SimpleDateFormat dateFormat = new SimpleDateFormat("EEE MMM dd HH:mm:ss z yyyy");
					    parsedDate = dateFormat.parse(tmpTime);
					    String newString = new SimpleDateFormat("HH:mm").format(parsedDate);
						ageVerificationDetailBean.setTime2(newString);
					    
					} catch(Exception e) { 
						e.printStackTrace();
					}
					
				}
			}
			/*ListIterator<AgeVerificationDetailBean> listIterator = list
					.listIterator();
			
			while (listIterator.hasNext()) {
				AgeVerificationDetailBean ageVerificationDetailBean = listIterator
						.next();
				System.out.println("ageVerificationDetailBean.getDateTime():" +ageVerificationDetailBean.getDateTime()+ "param.getDtFrom()" +param.getDtFrom());
				System.out.println("ageVerificationDetailBean.getDateTime()" +ageVerificationDetailBean.getDateTime()+ "param.getDtTo()" +param.getDtTo());
				if (ageVerificationDetailBean.getDateTime() != null
						&& (ageVerificationDetailBean.getDateTime().before(
								param.getDtFrom()) || ageVerificationDetailBean
								.getDateTime().after(param.getDtTo()))) {
					listIterator.remove();
				}
			}*/
		}
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof AgeVerificationDetailsParam) {
			AgeVerificationDetailsParam param = (AgeVerificationDetailsParam) params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getDateFrom());
			map.put("ZV_TDATE_IM", (CommonUtils.isNullEmptyWhiteSpace(param
					.getDateTo()) ? param.getDateFrom() : param.getDateTo()));
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
			} else if ("ageVerificationResult".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				String ageVerificationResultAttr = (String) super
						.getObjectAttributeValue(o1);

				comAttr.setFirstObjectAttribute(decodeAgeVerificationResult(ageVerificationResultAttr));

				ageVerificationResultAttr = (String) super
						.getObjectAttributeValue(o2);

				comAttr.setSecondObjectAttribute(decodeAgeVerificationResult(ageVerificationResultAttr));

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

		public String decodeAgeVerificationResult(String ageVfy) {
			return "YES".equalsIgnoreCase(ageVfy) ? "Approved" : "NO"
					.equalsIgnoreCase(ageVfy) ? "Rejected" : ageVfy;
		}
	}

}
