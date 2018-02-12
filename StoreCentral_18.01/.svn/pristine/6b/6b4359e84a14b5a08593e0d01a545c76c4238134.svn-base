package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.HashSet;
import java.util.LinkedHashMap;
import java.util.LinkedList;
import java.util.List;
import java.util.ListIterator;
import java.util.Map;
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.DepartmentSalesTaxDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.DepartmentSalesTaxParam;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

import com.google.gson.Gson;

public class POSDepartmentandSalesTaxServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	@Value("${POSDepartmentSalesTaxURL}")
	private String posDepartmentSalesTaxURL;

	private static final Logger LOGGER = Logger
			.getLogger(POSDepartmentandSalesTaxServiceImpl.class.getName());

	@SuppressWarnings("unchecked")
	public String getDeartmentSaleTax(DepartmentSalesTaxParam param) {
		Set<String> set = null;
		double transCount = 0.0;
		Gson gson = new Gson();

		List<DepartmentSalesTaxDtl> deptSalesTax = null;
		List<DepartmentSalesTaxDtl> deptSalesTaxClone = null;
		
		try {
			ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>>() {
			};
			deptSalesTax = invokeService(param, posDepartmentSalesTaxURL,
					typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			if (deptSalesTax == null
					|| (deptSalesTax != null && deptSalesTax.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(deptSalesTax.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				deptSalesTaxClone = CommonUtils.getCopyOfBeanList(deptSalesTax);
				param.setMsg("");
			
				List<Object> lst = updateBeanListNReturnInfo(deptSalesTaxClone, param.getDeptSaleTaxBanner(),param.getYes());
				set = (Set<String>) lst.get(0);
				transCount = (Double) lst.get(1);
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance("groupNo,int,asc,last,subGroupNo,int,asc,last", null);
				if (comparator != null) {
					Collections.sort(deptSalesTaxClone, comparator);
				}
				// ObjectWriteToNReadFromFile.writeToFile("c:/DeptSaleTaxRpt.ser",
				// deptSalesTax);
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}

		return "{\"deptSalesTax\":"
				+ gson.toJson(deptSalesTaxClone != null ? deptSalesTaxClone
						: new ArrayList<DepartmentSalesTaxDtl>())
				+ ",\"groupCount\":" + (set == null ? 0 : set.size())
				+ ",\"transCount\":" + transCount + ",\"msg\":\""
				+ param.getMsg() + "\"}";

	}

	@SuppressWarnings("unchecked")
	public ByteArrayOutputStream getDeartmentSaleTaxJasper(
			DepartmentSalesTaxParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		Set<String> set = null;
		double transCount = 0.0;

		List<DepartmentSalesTaxDtl> deptSalesTax = null;
		List<DepartmentSalesTaxDtl> deptSalesTaxClone = null;

		try {
			deptSalesTax = getSessionCachePrintData(
					PosReportConstantsInterfaces.PRINT_RPT,
					DepartmentSalesTaxDtl.class);
			if (deptSalesTax == null) {
				ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<DepartmentSalesTaxDtl>>() {
				};
				deptSalesTax = invokeService(param, posDepartmentSalesTaxURL,
						typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if (deptSalesTax == null
					|| (deptSalesTax != null && deptSalesTax.size() == 1 && PosReportConstantsInterfaces.NO_DATA_FOUND
							.equals(deptSalesTax.get(0).getNoDataFound()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			} else {
				deptSalesTaxClone = CommonUtils.getCopyOfBeanList(deptSalesTax);
				List<Object> lst = updateBeanListNReturnInfo(deptSalesTaxClone, param.getDeptSaleTaxBanner(),param.getYes());
				set = (Set<String>) lst.get(0);
				transCount = (Double) lst.get(1);
				String sortAttr = CommonUtils.isNullEmptyWhiteSpace(param
						.getDeptSaleTaxAttr()) ? "groupNo,int,asc,last,subGroupNo,int,asc,last"
						: "groupNo,int,asc,last,subGroupNo,int,asc,last," + param.getDeptSaleTaxAttr();
				CustomMultiAttributeDynaSortComparator comparator = CustomMultiAttributeDynaSortComparator
						.getComparatorInstance(sortAttr, rptName);
				if (comparator != null) {
					Collections.sort(deptSalesTaxClone, comparator);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}

		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				deptSalesTaxClone);

		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());
		reportInputParams.put("groupCount", (set == null ? 0 : set.size()));
		reportInputParams.put("transCount", transCount);
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName,
				param.getPrintReportFormat(), beanDS, reportInputParams,
				srcPath, binPath);
		return byos;
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if (params instanceof DepartmentSalesTaxParam) {
			DepartmentSalesTaxParam param = (DepartmentSalesTaxParam) params;
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

	public List<Object> updateBeanListNReturnInfo(
			List<DepartmentSalesTaxDtl> deptSalesTax, String banner, String yesOrNo) {
		List<Object> lst = new ArrayList<Object>();
		double transCount = 0.0;
		Set<String> set = new HashSet<String>();
		ListIterator<DepartmentSalesTaxDtl> listIterator = deptSalesTax
				.listIterator();
		while (listIterator.hasNext()) {
			DepartmentSalesTaxDtl departmentSaleTaxBn = listIterator.next();
			
			 if (departmentSaleTaxBn.getDepartmentNo() != null
					&& departmentSaleTaxBn.getDepartmentNo().equals("#") ) {
				transCount = Double.parseDouble(departmentSaleTaxBn
						.getRegularSalesTXNC());
				if(isAllNotAssignedZero(departmentSaleTaxBn, banner)==true) {
					listIterator.remove();
				}
				else {
					departmentSaleTaxBn.setGroupNo("1");
					departmentSaleTaxBn.setSubGroupNo("2");
					set.add("1");
				}
			} else if (departmentSaleTaxBn.getDepartmentNo() != null
					&& departmentSaleTaxBn.getDepartmentNo().substring(1)
							.equals("100")) {
				departmentSaleTaxBn.setGroupNo("2");
				departmentSaleTaxBn.setSubGroupNo("3");
				set.add("2");
			} else if(departmentSaleTaxBn.getDepartmentNo() != null
					 && departmentSaleTaxBn.getDepartmentNo().substring(1)
						.equals("19594")){
					departmentSaleTaxBn.setGroupNo("2");
					departmentSaleTaxBn.setSubGroupNo("3");
					set.add("2");
				}else if (departmentSaleTaxBn.getDepartmentNo() != null 
						&& departmentSaleTaxBn.getDepartmentNo().substring(1)
						.equals("120") && yesOrNo.equalsIgnoreCase("yes")) {
			departmentSaleTaxBn.setGroupNo("2");
			departmentSaleTaxBn.setSubGroupNo("3");
			set.add("2");		
				}else {
				departmentSaleTaxBn.setGroupNo("1");
				departmentSaleTaxBn.setSubGroupNo("1");
				set.add("1");
			}
		}
		lst.add(set);
		lst.add(transCount);
		return lst;
	}
	private boolean isAllNotAssignedZero(DepartmentSalesTaxDtl bn, String banner) {
		boolean isAllZero = true;
		List<String> tmp = new ArrayList<String>();
		tmp.add("countSiteDayDept");
		tmp.add("noOfReceiptItems");
		if("petrol".equals(banner)) {
			tmp.add("litersSold");// fuel
		}
		else {
			tmp.add("avgArticlePrice");// for non fuel
			tmp.add("deferedLoyalty");
			tmp.add("onlineSales");
		}
		tmp.add("avgTransactionPurchase");
		tmp.add("salesTaxRetailIncl");
		tmp.add("totalTaxAmount");
		tmp.add("netSalesExlTax");
		
		
		//tmp.add("");
		MultiAttributeDynaSortComparator obj = new MultiAttributeDynaSortComparator(){};
		Object o = null;
		for (String string : tmp) {
			obj.setAttribute(string);
			o = obj.getObjectAttributeValue(bn);
			if(o!=null && Double.parseDouble((String)o)!=0.0) {
				isAllZero = false;
				break;
			}
		}
		return isAllZero;
	}

	static class CustomMultiAttributeDynaSortComparator extends
			MultiAttributeDynaSortComparator {
		private String reportName;

		public String getReportName() {
			return reportName;
		}

		public void setReportName(String reportName) {
			this.reportName = reportName;
		}

		private CustomMultiAttributeDynaSortComparator() {
		}

		public CustomMultiAttributeDynaSortComparator(String attribute,
				String type, String sortingOrder, String nullsLast, String reportName) {
			super(attribute, type, sortingOrder, nullsLast);
			this.setReportName(reportName);
		}

		public CustomMultiAttributeDynaSortComparator(String attribute,
				String type, String sortingOrder, String nullsLast,
				LinkedList<SecondSortAttributeDetails> queue, String reportName) {
			super(attribute, type, sortingOrder, nullsLast, queue);
			this.setReportName(reportName);
		}

		@Override
		public MultiAttributeDynaSortComparator getMultiAttributeDynaSortComparator(String attribute, String type, String sortingOrder, String nullsLast, LinkedList<SecondSortAttributeDetails> q) {
			return new CustomMultiAttributeDynaSortComparator(
					attribute, type, sortingOrder, nullsLast, q, this.getReportName());
		}

		public static CustomMultiAttributeDynaSortComparator getComparatorInstance(
				String input, String reportName) {
			CustomMultiAttributeDynaSortComparator comparator = new CustomMultiAttributeDynaSortComparator();
			LinkedList<SecondSortAttributeDetails> list = MultiAttributeDynaSortComparator
					.convertStringToSortAttrList(input);
			comparator.setReportName(reportName);
			comparator.populateComparatorInstance(list);
			if (input != null && "".equals(input.trim()) == false) {
				return comparator;
			} else {
				return null;
			}
		}

		@Override
		public CompareAttributes inputAttribtes(Object o1, Object o2) {
			if ("totalAftrDfrdLylt".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();
				double o1NetSalesExlTax = getAttrDblVal(o1, "netSalesExlTax");
				double o1DeferedLoyalty = getAttrDblVal(o1, "deferedLoyalty");
				comAttr.setFirstObjectAttribute(Double.toString(o1NetSalesExlTax-o1DeferedLoyalty));
				
				double o2NetSalesExlTax = getAttrDblVal(o2, "netSalesExlTax");
				double o2DeferedLoyalty = getAttrDblVal(o2, "deferedLoyalty");
				comAttr.setSecondObjectAttribute(Double.toString(o2NetSalesExlTax-o2DeferedLoyalty));
				
				return comAttr;
			}
			else if("DepartmentSalesTaxFuel".equals(this.getReportName()) && "avgArticlePrice".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();
				double o1NetSalesExlTax = getAttrDblVal(o1, "netSalesExlTax");
				double o1ArticleSold = getAttrDblVal(o1, "noOfReceiptItems");
				if(o1ArticleSold==0.0) {
					double o1LitersSold = getAttrDblVal(o1, "litersSold");
					if(o1LitersSold==0.0) {
						comAttr.setFirstObjectAttribute(null);
					}
					else {
						comAttr.setFirstObjectAttribute(Double.toString(o1NetSalesExlTax / o1LitersSold));
					}
				}
				else {
					comAttr.setFirstObjectAttribute(Double.toString(o1NetSalesExlTax / o1ArticleSold));
				}

				double o2NetSalesExlTax = getAttrDblVal(o2, "netSalesExlTax");
				double o2ArticleSold = getAttrDblVal(o2, "noOfReceiptItems");
				if(o2ArticleSold==0.0) {
					double o2LitersSold = getAttrDblVal(o2, "litersSold");
					if(o2LitersSold==0.0) {
						comAttr.setSecondObjectAttribute(null);
					}
					else {
						comAttr.setSecondObjectAttribute(Double.toString(o2NetSalesExlTax / o2LitersSold));
					}
				}
				else {
					comAttr.setSecondObjectAttribute(Double.toString(o2NetSalesExlTax / o2ArticleSold));
				}
				return comAttr;
			}
			return super.inputAttribtes(o1, o2);
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
