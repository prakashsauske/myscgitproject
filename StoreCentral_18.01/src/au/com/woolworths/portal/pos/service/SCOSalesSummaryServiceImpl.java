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

import au.com.woolworths.portal.pos.model.SCOSalesSummaryDTL;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.SCOSalesSummaryParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class SCOSalesSummaryServiceImpl extends PosServiceImpl {

	@Autowired
	private JasperReportUtil jasper;

	private static final Logger LOGGER = Logger.getLogger(SCOSalesSummaryServiceImpl.class.getName());

	@Value("${POSSCOSummaryURL}")
	private String scoSummaryURL;
	
	public String getSCOSummaryBoth(SCOSalesSummaryParam param) {
		List<SCOSalesSummaryDTL> scoSaleSummary = null;
		
		try {
			ParameterizedTypeReference<ServiceResponse<SCOSalesSummaryDTL>> typeRef = new ParameterizedTypeReference<ServiceResponse<SCOSalesSummaryDTL>>(){};
			scoSaleSummary = invokeService(param, scoSummaryURL, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			if (scoSaleSummary == null 
					|| (scoSaleSummary!=null 
					&& scoSaleSummary.size()==1 
					&& CommonUtils.isNullEmptyWhiteSpace(scoSaleSummary.get(0).getPosNumber()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
			else{
				param.setMsg("");
			}
		}
		
	 catch (Exception e) {
		param.setMsg(Constants.TECH_ISSUE);
		LOGGER.error(Constants.EXCEPTION , e);
	}
	return convertTojson(scoSaleSummary, param.getMsg());

	}
	public ByteArrayOutputStream getSCOSummaryBothJasper(SCOSalesSummaryParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<SCOSalesSummaryDTL> scoSaleSummary = null;
		try {
			scoSaleSummary = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT, SCOSalesSummaryDTL.class);
			if(scoSaleSummary  == null) {
				ParameterizedTypeReference<ServiceResponse<SCOSalesSummaryDTL>> typeRef = new ParameterizedTypeReference<ServiceResponse<SCOSalesSummaryDTL>>(){};
				scoSaleSummary = invokeService(param, scoSummaryURL, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			}

			if (scoSaleSummary == null 
					|| (scoSaleSummary!=null 
					&& scoSaleSummary.size()==1 
					&& CommonUtils.isNullEmptyWhiteSpace(scoSaleSummary.get(0).getPosNumber()))) {
				if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
			else{
				CustomMultiAttributeDynaSortComparator  comparator = CustomMultiAttributeDynaSortComparator.getComparatorInstance(param.getScoSalesSummaryAttr());
				if(comparator!=null) {
					Collections.sort(scoSaleSummary, comparator);
				}
			}
		}
		catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION , e);
		}
		//au.com.woolworths.portal.util.ObjectWriteToNReadFromFile.writeToFile("c:\\SCOSalesSummary.ser", scoSaleSummary);
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(scoSaleSummary);
		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());
		
		reportInputParams.put("posPosi", param.getPosPosi());
		reportInputParams.put("posTran", param.getPosTran());
		reportInputParams.put("posArts", param.getPosArts());
		reportInputParams.put("posNets", param.getPosNets());
		reportInputParams.put("posDfrd", param.getPosDfrd());
		reportInputParams.put("posNsAD", param.getPosNsAD());
		reportInputParams.put("posAvet", param.getPosAvet());
		reportInputParams.put("posAvgs", param.getPosAvgs());
		reportInputParams.put("posPerc", param.getPosPerc());
		reportInputParams.put("posPere", param.getPosPere());
		reportInputParams.put("posPero", param.getPosPero());
		reportInputParams.put("selectType", param.getSelectType());
		reportInputParams.put("msg", param.getMsg());
		
		//param.setPrintReportFormat("PDF");
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS, reportInputParams,
				srcPath, binPath);
			return byos;
	}
		@Override
		public String formUrlParam(MandatoryReportParam params) {
			if(params instanceof SCOSalesSummaryParam) {
				SCOSalesSummaryParam param = (SCOSalesSummaryParam)params;
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

			public static CustomMultiAttributeDynaSortComparator getComparatorInstance(String input) {
				LinkedList<SecondSortAttributeDetails> list = MultiAttributeDynaSortComparator.convertStringToSortAttrList(input);
				CustomMultiAttributeDynaSortComparator comparator = null;
				if(list!=null) {
					comparator = new CustomMultiAttributeDynaSortComparator();
					comparator.populateComparatorInstance(list);
				}
				return comparator;
			}
		}
}
