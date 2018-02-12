package au.com.woolworths.portal.pos.service;

import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.SalesByArticlesDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.SalesByArticleParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SalesOrgUtil;

public class SalesByArticleServiceImpl extends PosServiceImpl {

	private static final Logger LOGGER = Logger
			.getLogger(SalesByArticleServiceImpl.class.getName());

	@Autowired
	private JasperReportUtil jasper;

	@Value("${POSSalesByArticle}")
	private String posSalesByArticle;

	public String getSalesByArticle(SalesByArticleParam param) {
		List<SalesByArticlesDtl> salesArticleList = null;
		try {
			ParameterizedTypeReference<ServiceResponse<SalesByArticlesDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<SalesByArticlesDtl>>(){};
			salesArticleList = invokeService(param, posSalesByArticle, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			if(salesArticleList==null
					|| (salesArticleList!=null && salesArticleList.size()==1 && PosReportConstantsInterfaces.NO_DATA_FOUND.equals(salesArticleList.get(0).getNoDataFound()))) {
				if(CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
			else {
				param.setMsg("");
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertSalesByArticleDtlTojson(salesArticleList, param.getMsg(),
				SalesOrgUtil.salesOrgMap.get(param.getSalesOrg()));
	}
	public ByteArrayOutputStream getSalesByArticleJasper(SalesByArticleParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<SalesByArticlesDtl> salesArticleList = null;
		List<SalesByArticlesDtl> salesArticleListDup = null;

		try {
			
			//salesArticleList = getSalesByArticleDtl.getSalesByArticleDtl(param);
			salesArticleList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT, SalesByArticlesDtl.class);
			if(salesArticleList  == null) {
				ParameterizedTypeReference<ServiceResponse<SalesByArticlesDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<SalesByArticlesDtl>>(){};
				salesArticleList = invokeService(param, posSalesByArticle, typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}
			if(salesArticleList==null
					|| (salesArticleList!=null && salesArticleList.size()==1 && PosReportConstantsInterfaces.NO_DATA_FOUND.equals(salesArticleList.get(0).getNoDataFound()))) {
				if(CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		MultiAttributeDynaSortComparator mul = MultiAttributeDynaSortComparator.getComparatorInstance(
				param.getSaleByArtSortAttr());
		if(salesArticleList!=null) {
			salesArticleListDup = CommonUtils.getCopyOfBeanList(salesArticleList);
		}
		if(mul != null && salesArticleListDup!=null) {
			Collections.sort(salesArticleListDup, mul);
		}
		JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(
				salesArticleListDup);


		HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
		reportInputParams.put("FromDate", param.getDateFrom());
		reportInputParams.put("ToDate", param.getDateTo());
		reportInputParams.put("StoreNo", param.getSiteNo());
		reportInputParams.put("StoreName", param.getSiteName());
		reportInputParams.put("deptName", param.getDepartment());
		reportInputParams.put("category", param.getCategory());
		reportInputParams.put("subCategory", param.getSubCat());
		reportInputParams.put("segment", param.getSegme());
		reportInputParams.put("promo", param.getPromotionButtonCheck());
		reportInputParams.put("key", SalesOrgUtil.salesOrgMap.get(param.getSalesOrg()));
		
		reportInputParams.put("deptArtr", param.getDeptArtr());
		reportInputParams.put("deptArtd", param.getDeptArtd());
		reportInputParams.put("deptCat", param.getDeptCat());
		reportInputParams.put("deptSub", param.getDeptSub());
		reportInputParams.put("deptSeg", param.getDeptSeg());
		reportInputParams.put("deptRetp", param.getDeptRetp());
		reportInputParams.put("deptQty", param.getDeptQty());
		reportInputParams.put("deptVal", param.getDeptVal());
		reportInputParams.put("deptUnit", param.getDeptUnit());
		reportInputParams.put("totDfrdLyl", param.getTotDfrdLyl());
		
		reportInputParams.put("msg", param.getMsg());
		jasper.setTimeZoneOffSet(reportInputParams, request, null);
		ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(),
				beanDS, reportInputParams, srcPath, binPath);
		return byos;

	}
	private String convertSalesByArticleDtlTojson(
			List<SalesByArticlesDtl> salesArticleList, String msg, String key) {
		return "{\"data\":" + Constants.convertToJsonString(salesArticleList)
				+ ",\"msg\":\"" + msg + "\",\"key\":\"" + key + "\"}";
	}
	
	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof SalesByArticleParam) {
			SalesByArticleParam param = (SalesByArticleParam)params;
			String salesOrg = SalesOrgUtil.salesOrgMap.get(param.getSalesOrg());
			Map<String, String> map = new HashMap<String, String>();
			map.put("ZV_DATE_IM", param.getDateFrom());
			map.put("ZV_TDATE_IM", param.getDateTo());
			map.put("VAR_20111208223707", param.getSiteNo());
			if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getDepH())) {
				map.put("ZV_CM_CDT1_IMT_0001", salesOrg+param.getDepartmentList());
				map.put("ZV_0CM_CDT2_IO", (CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getCategory())?salesOrg+param.getCategory():param.getCategory()));
				map.put("ZV_0CM_CDT3_SO_01", (CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getSubCat())?salesOrg+param.getSubCat():param.getSubCat()));
				map.put("ZM_O_SEGMENT", (CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getSegme())?salesOrg+param.getSegme():param.getSegme()));
			}
			else {
				map.put("ZV_CM_CDT1_IMT_0001", salesOrg+param.getDepartment());
				map.put("ZV_0CM_CDT2_IO", null);
				map.put("ZV_0CM_CDT3_SO_01", null);
				map.put("ZM_O_SEGMENT", null);
			}
			
			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("ZV_DATE_IM");
			mandatoryParams.add("ZV_TDATE_IM");
			mandatoryParams.add("VAR_20111208223707");
			mandatoryParams.add("ZV_CM_CDT1_IMT_0001");
			
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
}
