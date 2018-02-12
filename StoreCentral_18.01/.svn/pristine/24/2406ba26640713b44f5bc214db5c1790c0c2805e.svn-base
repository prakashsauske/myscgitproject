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
import java.util.Set;

import javax.servlet.http.HttpServletRequest;

import net.sf.jasperreports.engine.JRException;
import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

import org.apache.log4j.Logger;
import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.model.ArticleResultsResponse;
import au.com.woolworths.portal.model.ArticleSearchResults;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.pos.model.MarkdownDetailsDtl;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.MarkdownDetailsParam;
import au.com.woolworths.portal.reports.JasperReportUtil;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.CompareAttributes;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.MultiAttributeDynaSortComparator;
import au.com.woolworths.portal.util.SecondSortAttributeDetails;

public class MarkdownDetailsServiceImpl extends PosServiceImpl {
	private static final Logger LOGGER = Logger
			.getLogger(MarkdownDetailsServiceImpl.class.getName());
	
	@Value("${MarkdownDetailsDtlURL}")
	private String markdownDetailsURL;
	
	@Value("#{url['ArticleListingServiceURL']}")
	private String articleListingServiceURL;
	
	@Value("#{url['PageSize']}")
	private String pageSize;
	
	@Autowired
	private JasperReportUtil jasper;

	@Autowired
	private CommonServiceImpl serviceImpl;
	
	public List<ArticleSearchResults> articleSearch(MarkdownDetailsParam param,UserContext user) {
		List<ArticleSearchResults> articleSearchResults = null;

		if (param.getOptionsArticle().equalsIgnoreCase("number")) {
			param.setArticleNo(param.getArticleSearchValue());
		} else if (param.getOptionsArticle().equalsIgnoreCase("description")) {
			param.setArticleName(param.getArticleSearchValue());
		} else if (param.getOptionsArticle().equalsIgnoreCase("reference")) {
			param.setGtin(param.getArticleSearchValue());
		}
		try {
			articleSearchResults = getArticleDetails(param,user);
		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return articleSearchResults;
	}
	public String getMarkdownDetails(MarkdownDetailsParam param) {
		List<MarkdownDetailsDtl> markdownList = null;
		List<MarkdownDetailsDtl> lst = null;
		try {

			ParameterizedTypeReference<ServiceResponse<MarkdownDetailsDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<MarkdownDetailsDtl>>(){};
			markdownList = invokeService(param, markdownDetailsURL, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);

			if(markdownList==null
					|| (markdownList!=null && markdownList.size()==1 && PosReportConstantsInterfaces.NO_DATA_FOUND.equals(markdownList.get(0).getNoDataFound()))) {
				if(CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
			else {
				param.setMsg("");
				lst = updateMarkDtl(param, markdownList);
			}
	
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
		return convertTojson(lst, param.getMsg());
	}
	
	public ByteArrayOutputStream getMarkdownDetailsJasper(MarkdownDetailsParam param, String rptName, String srcPath,
			String binPath, HttpServletRequest request) throws JRException, IOException {
		List<MarkdownDetailsDtl> markdownList = null;
		List<MarkdownDetailsDtl> lst = null;
		try {

			markdownList = getSessionCachePrintData(PosReportConstantsInterfaces.PRINT_RPT, MarkdownDetailsDtl.class);
			if(markdownList  == null) {
				ParameterizedTypeReference<ServiceResponse<MarkdownDetailsDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<MarkdownDetailsDtl>>(){};
				markdownList = invokeService(param, markdownDetailsURL, typeRef, PosReportConstantsInterfaces.PRINT_RPT);
			}

			if(markdownList==null
					|| (markdownList!=null && markdownList.size()==1 && PosReportConstantsInterfaces.NO_DATA_FOUND.equals(markdownList.get(0).getNoDataFound()))) {
				if(CommonUtils.isNullEmptyWhiteSpace(param.getMsg())) {
					param.setMsg(Constants.NDF);
				}
			}
			else {
				param.setMsg("");
				//createMarkMaps(param, markdownList);
				lst = updateMarkDtl(param, markdownList);
				CustomMultiAttributeDynaSortComparator markdownComparator = CustomMultiAttributeDynaSortComparator.getComparatorInstance(
							param.getMarkdownAttr());
					if (markdownComparator != null) {
						Collections.sort(lst, markdownComparator);
					}
			}
	
		} catch (Exception e) {
			param.setMsg(Constants.TECH_ISSUE);
			LOGGER.error(Constants.EXCEPTION, e);
		}
	    if(CommonUtils.isNullEmptyWhiteSpace(param.getDepartment()))
	    {
	    	param.setDepartment(param.getHdnDepLst());
	    }

	    JRBeanCollectionDataSource beanDS = new JRBeanCollectionDataSource(lst);
	    HashMap<String, Object> reportInputParams = new HashMap<String, Object>();
	    reportInputParams.put("FromDate",param.getDateFrom());
	    reportInputParams.put("ToDate",param.getDateTo());
	    reportInputParams.put("StoreNo",param.getSiteNo());
	    reportInputParams.put("StoreName",param.getSiteName());
	    reportInputParams.put("deptName", param.getDepartment());
	    reportInputParams.put("category", param.getCategory());
	    reportInputParams.put("subCategory", param.getSubCat());
	    reportInputParams.put("segment", param.getSegme());
	    reportInputParams.put("marticleNo", param.getArticleNo());
	    reportInputParams.put("supplierNo", param.getSupplierArticle());
	    jasper.setTimeZoneOffSet(reportInputParams, request, null);
	    ByteArrayOutputStream byos = jasper.printReport(rptName, param.getPrintReportFormat(), beanDS, reportInputParams, srcPath, binPath);
		return byos;
	}
	
	private List<MarkdownDetailsDtl> updateMarkDtl(MarkdownDetailsParam param,
			List<MarkdownDetailsDtl> markdownList) throws CloneNotSupportedException {
		List<MarkdownDetailsDtl> tempAllocationList = null;
		String grpKey = "";
		LOGGER.info("param.getDep()__" + (CommonUtils.isNullEmptyWhiteSpace(param.getDepartment())?param.getHdnDepLst():param.getDepartment()));
		if (param.getDepH() != null && !param.getDepH().equals("")) {
			if (param.getSegme() != null && !param.getSegme().equals("")) {
				tempAllocationList = getSegmentList(param.getSeg(), markdownList);
				//tempAllocationList = segMap.get(param.getSeg());
				grpKey = "seg";
			} else if (param.getSubCat() != null
					&& !param.getSubCat().equals("")) {
				tempAllocationList = getSubCategoryList(param.getSub(), markdownList);
				//tempAllocationList = subCatMap.get(param.getSub());
				grpKey = "sub";
			} else if (param.getCategory() != null
					&& !param.getCategory().equals("")) {
				tempAllocationList = getCategoryList(param.getCat(), markdownList);
				//tempAllocationList = catMap.get(param.getCat());
				grpKey = "cat";
			} else {
				tempAllocationList = getDepartmentList((CommonUtils.isNullEmptyWhiteSpace(param.getDepartment())?param.getHdnDepLst():param.getDepartment()), markdownList);
				//tempAllocationList = deptMap.get(param.getDepartment());
				grpKey = "dep";
			}
		} else {
			if (param.getDepartment() != null
					&& !param.getDepartment().equals("")) {
				tempAllocationList = getDepartmentList(param.getDepartment(), markdownList);
				//tempAllocationList = deptMap.get(param.getDepartment());
				grpKey = "dep";
			}
		}
		return getGroupedResult(grpKey, tempAllocationList, param);
	}
	private List<MarkdownDetailsDtl> getSegmentList(String key, List<MarkdownDetailsDtl> markdownList) {
		List<MarkdownDetailsDtl> tempAllocationList = new ArrayList<MarkdownDetailsDtl>();
		if (markdownList != null && markdownList.size() > 0) {
			for (MarkdownDetailsDtl getDept : markdownList) {
				if (key.equals(getDept.getSegment())) {
					tempAllocationList.add(getDept);
				}
			}
		}
		return tempAllocationList;
	}

	private List<MarkdownDetailsDtl> getSubCategoryList(String key, List<MarkdownDetailsDtl> markdownList) {
		List<MarkdownDetailsDtl> tempAllocationList = new ArrayList<MarkdownDetailsDtl>();
		if (markdownList != null && markdownList.size() > 0) {
			for (MarkdownDetailsDtl getDept : markdownList) {
				if (key.equals(getDept.getSubCategory())) {
					tempAllocationList.add(getDept);
				}
			}
		}
		return tempAllocationList;
	}

	private List<MarkdownDetailsDtl> getCategoryList(String key, List<MarkdownDetailsDtl> markdownList) {
		List<MarkdownDetailsDtl> tempAllocationList = new ArrayList<MarkdownDetailsDtl>();
		if (markdownList != null && markdownList.size() > 0) {
			for (MarkdownDetailsDtl getDept : markdownList) {
				if (key.equals(getDept.getCategory())) {
					tempAllocationList.add(getDept);
				}
			}
		}
		return tempAllocationList;
	}

	private List<MarkdownDetailsDtl> getDepartmentList(String key, List<MarkdownDetailsDtl> markdownList) {
		List<MarkdownDetailsDtl> tempAllocationList = new ArrayList<MarkdownDetailsDtl>();
		if (markdownList != null && markdownList.size() > 0) {
			for (MarkdownDetailsDtl getDept : markdownList) {
				if (getDept.getDepartmentNo() != null
						&& !getDept.getDepartmentNo().equalsIgnoreCase("#")
						&& getDept.getDepartmentNo() != "" && key.equals(getDept.getDepartmentNo().substring(2))) {
					tempAllocationList.add(getDept);
				}
			}
		}
		return tempAllocationList;
	}

	private List<MarkdownDetailsDtl> getGroupedResult(String grpKey,
			List<MarkdownDetailsDtl> markdownDetailsList,
			MarkdownDetailsParam param) throws CloneNotSupportedException {
		String key = "";
		List<MarkdownDetailsDtl> lst = null;
		Map<String, MarkdownDetailsDtl> map = new LinkedHashMap<String, MarkdownDetailsDtl>();
		String orderOrTransNumber = "";
		if (markdownDetailsList != null && markdownDetailsList.size() > 0) {
			for (MarkdownDetailsDtl getdept1 :markdownDetailsList) {
				if (grpKey.equals("dep")) {
					key = getdept1.getCategory();
				} else if (grpKey.equals("cat")) {
					key = getdept1.getSubCategory();
				} else if (grpKey.equals("sub")) {
					key = getdept1.getSegment();
				} else {
					key = getdept1.getArticle() + " - " + getdept1.getArticleT();
				}
				getdept1.setMapKey(key);
				
				if(orderOrTransNumber != null){
					if(getdept1.getOrderNumber() != null && !getdept1.getOrderNumber().isEmpty() && !getdept1.getOrderNumber().equalsIgnoreCase("#")){
						orderOrTransNumber = getdept1.getOrderNumber();
					}
					else{
						orderOrTransNumber = getdept1.getTransactionNumber();
					}
					
				}
				if(map.containsKey(key)) {
					MarkdownDetailsDtl getdept2 = map.get(key);
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getPriceOverrideRTCFormatted())  || getCount(getdept1.getPriceOverrideQty()) != 0 ) {
						getdept2.setPriceTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getClearanceFormatted())  || getCount(getdept1.getClearance()) != 0 ) {
						getdept2.setClearTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getAdvertisementsFormatted())  || getCount(getdept1.getAdvertisements()) != 0 ) {
						getdept2.setAdverTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getScanningPolicyFormatted())  || getCount(getdept1.getScanningPolicy()) != 0 ) {
						getdept2.setScanPTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getStaffDiscountFormatted())  || getCount(getdept1.getStaffDiscount()) != 0 ) {
						getdept2.setStaffTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getCompFormatted())  || getCount(getdept1.getComp()) != 0 ) {
						getdept2.setCompTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getSplActivityFormatted())  || getCount(getdept1.getSplActivity()) != 0 ) {
						getdept2.setSplActivityTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getLoyaltyFormatted()) || getCount(getdept1.getLoyalty()) != 0 ) {
						getdept2.setLoyaltyTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getPromotionsFormatted()) || getCount(getdept1.getPromotions()) != 0  ) {
						getdept2.setPromotionsTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getDeferedLoyaltyFormatted()) || getCount(getdept1.getDeferedLoyalty()) != 0 ) {
						getdept2.setDeferedLoyaltySetRaw(key + "__"	+ orderOrTransNumber);
					}
					getdept2.aggregate(getdept1);
				}
				else {
					MarkdownDetailsDtl getdept2 = (MarkdownDetailsDtl)getdept1.clone();
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getPriceOverrideRTCFormatted()) || getCount(getdept1.getPriceOverrideRTC()) != 0 ) {
						getdept2.setPriceTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getClearanceFormatted()) || getCount(getdept1.getClearance()) != 0 ) {
						getdept2.setClearTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getAdvertisementsFormatted()) || getCount(getdept1.getAdvertisements()) != 0 ) {
						getdept2.setAdverTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getScanningPolicyFormatted()) || getCount(getdept1.getScanningPolicy()) != 0 ) {
						getdept2.setScanPTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getStaffDiscountFormatted()) || getCount(getdept1.getStaffDiscount()) != 0 ) {
						getdept2.setStaffTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getCompFormatted()) || getCount(getdept1.getComp()) != 0 ) {
						getdept2.setCompTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getSplActivityFormatted()) || getCount(getdept1.getSplActivity()) != 0 ) {
						getdept2.setSplActivityTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getLoyaltyFormatted()) || getCount(getdept1.getLoyalty()) != 0 ) {
						getdept2.setLoyaltyTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getPromotionsFormatted()) || getCount(getdept1.getPromotions()) != 0 ) {
						getdept2.setPromotionsTransSetRaw(key + "__"	+ orderOrTransNumber);
					}
					if(CommonUtils.isNotNullNotEmptyNotWhiteSpace(getdept1.getDeferedLoyaltyFormatted()) || getCount(getdept1.getDeferedLoyalty()) != 0 ) {
						getdept2.setDeferedLoyaltySetRaw(key + "__"	+ orderOrTransNumber);
					}
					map.put(key, getdept2);
				}
			}
			lst = new ArrayList<MarkdownDetailsDtl>(map.values());
		} else {
			if (CommonUtils.isNullEmptyWhiteSpace(param.getMsg()))
				param.setMsg(Constants.NDF);
		}
		return lst;
	}
	private Double getCount(String amt) {
		if(CommonUtils.isNumeric(amt)) {
			return Double.parseDouble(amt);
		}
		return 0.0;
	}
	private List<ArticleSearchResults> getArticleDetails(
			MarkdownDetailsParam articleParam,UserContext user) throws JsonParseException,
			JsonMappingException, IOException {

		String urlParam = " iv_site eq '" + articleParam.getSiteNo() + "'";

		if (articleParam.getArticleNo() != null
				&& articleParam.getArticleNo().trim().length() > 0) {
			urlParam = urlParam + " and iv_article eq '"
					+ articleParam.getArticleNo() + "'";
		} else if (articleParam.getArticleName() != null
				&& articleParam.getArticleName().trim().length() > 0) {
			urlParam = urlParam + " and iv_desc eq '"
					+ articleParam.getArticleName() + "'";
		} else if (articleParam.getGtin() != null
				&& articleParam.getGtin().trim().length() > 0)
			urlParam = urlParam + " and iv_gtin eq '" + articleParam.getGtin()
					+ "'";
		LOGGER.info(articleListingServiceURL+urlParam);
		try {
			ArticleResultsResponse response = serviceImpl.getRestTemplate(user).getForObject(
					articleListingServiceURL, ArticleResultsResponse.class,
					urlParam);

			if (response == null
					|| response.getArticleResultsResponseHelper() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList() == null
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().size() == 0
					|| response.getArticleResultsResponseHelper()
							.getArticleSearchResultsList().get(0).getMsg()
							.trim().contains(" ")) {
				return null;
			} else {
				return response.getArticleResultsResponseHelper()
						.getArticleSearchResultsList();
			}
		} catch (Exception e) {
			LOGGER.error("Exception "+ e.getMessage(), e);
			return null;
		}
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof MarkdownDetailsParam) {
			MarkdownDetailsParam param = (MarkdownDetailsParam)params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getDateFrom());
			map.put("ZV_TDATE_IM", param.getDateTo());
			map.put("VAR_20111208223707", param.getSiteNo());
			map.put("ZV_MATERIAL", param.getMaterialArticle());
			map.put("ZVSSUPLY", param.getSupplierArticle());
			
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
		
		@Override
		public MultiAttributeDynaSortComparator getMultiAttributeDynaSortComparator(
				String attribute, String type, String sortingOrder, String nullsLast,
				LinkedList<SecondSortAttributeDetails> q) {
			return new CustomMultiAttributeDynaSortComparator(attribute, type,
					sortingOrder, nullsLast, q);
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
		@Override
		public CompareAttributes inputAttribtes(Object o1, Object o2) {
			if ("totalMarkdown".equals(this.getAttribute())) {
				String tmpAttr = this.getAttribute();
				CompareAttributes comAttr = new CompareAttributes();

				this.setAttribute("priceTransSet");
				@SuppressWarnings("unchecked")
				Set<String> price1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> price2 = (Set<String>) super.getObjectAttributeValue(o2);
				this.setAttribute("clearTransSet");
				@SuppressWarnings("unchecked")
				Set<String> clear1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> clear2 = (Set<String>) super.getObjectAttributeValue(o2);
				this.setAttribute("staffTransSet");
				@SuppressWarnings("unchecked")
				Set<String> adver1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> adver2 = (Set<String>) super.getObjectAttributeValue(o2);
				this.setAttribute("adverTransSet");
				@SuppressWarnings("unchecked")
				Set<String> scanP1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> scanP2 = (Set<String>) super.getObjectAttributeValue(o2);
				this.setAttribute("scanPTransSet");
				@SuppressWarnings("unchecked")
				Set<String> staff1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> staff2 = (Set<String>) super.getObjectAttributeValue(o2);
				this.setAttribute("loyaltyTransSet");
				@SuppressWarnings("unchecked")
				Set<String> loyal1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> loyal2 = (Set<String>) super.getObjectAttributeValue(o2);
				this.setAttribute("promotionsTransSet");
				@SuppressWarnings("unchecked")
				Set<String> promo1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> promo2 = (Set<String>) super.getObjectAttributeValue(o2);
				
				this.setAttribute("compTransSet");
				@SuppressWarnings("unchecked")
				Set<String> comp1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> comp2 = (Set<String>) super.getObjectAttributeValue(o2);
				
				this.setAttribute("splActivityTransSet");
				@SuppressWarnings("unchecked")
				Set<String> splAct1 = (Set<String>) super.getObjectAttributeValue(o1);
				@SuppressWarnings("unchecked")
				Set<String> splAct2 = (Set<String>) super.getObjectAttributeValue(o2);
				
				int totalMrkDwn1 = (price1!=null?price1.size():0) + (clear1!=null?clear1.size():0)+ (adver1!=null?adver1.size():0)+ (scanP1!=null?scanP1.size():0)
						 + (staff1!=null?staff1.size():0)  + (comp1!=null?comp1.size():0)  + (splAct1!=null?splAct1.size():0) + (loyal1!=null?loyal1.size():0)
						+ (promo1!=null?promo1.size():0);
				int totalMrkDwn2 = (price2!=null?price2.size():0) + (clear2!=null?clear2.size():0)+ (adver2!=null?adver2.size():0)+ (scanP2!=null?scanP2.size():0)
						 + (staff2!=null?staff2.size():0) + (comp2!=null?comp2.size():0) + (splAct2!=null?splAct2.size():0) + (loyal2!=null?loyal2.size():0)
						+ (promo2!=null?promo2.size():0);

				comAttr.setFirstObjectAttribute(totalMrkDwn1+"");
				comAttr.setSecondObjectAttribute(totalMrkDwn2+"");

				this.setAttribute(tmpAttr);
				return comAttr;
			}
			else if("totalMarkdownAftrDfrdLylt".equals(this.getAttribute())) {
				CompareAttributes comAttr = new CompareAttributes();

				double price1 = getAttrDblVal(o1,"priceOverrideRTC");
				double price2 = getAttrDblVal(o2,"priceOverrideRTC");
				
				double clear1 = getAttrDblVal(o1,"clearance");
				double clear2 = getAttrDblVal(o2,"clearance");
				
				double adver1 = getAttrDblVal(o1,"advertisements");
				double adver2 = getAttrDblVal(o2,"advertisements");
				
				double scanP1 = getAttrDblVal(o1,"scanningPolicy");
				double scanP2 = getAttrDblVal(o2,"scanningPolicy");
				
				double staff1 = getAttrDblVal(o1,"staffDiscount");
				double staff2 = getAttrDblVal(o2,"staffDiscount");
				
				double loyal1 = getAttrDblVal(o1,"loyalty");
				double loyal2 = getAttrDblVal(o2,"loyalty");
				
				double promo1 = getAttrDblVal(o1,"promotions");
				double promo2 = getAttrDblVal(o2,"promotions");
				
				double comp1 = getAttrDblVal(o1,"comp");
				double comp2 = getAttrDblVal(o2,"comp");
				
				double splAct1 = getAttrDblVal(o1,"splActivity");
				double splAct2 = getAttrDblVal(o2,"splActivity");
				
				double dfrdLylt1 = getAttrDblVal(o1,"deferedLoyalty");
				double dfrdLylt2 = getAttrDblVal(o2,"deferedLoyalty");
				
				double totalMrkDwn1 = price1 + clear1 + adver1 + scanP1 + comp1 + splAct1
						+ staff1 + loyal1
						+ promo1 + dfrdLylt1;
				double totalMrkDwn2 = price2 + clear2 + adver2 + scanP2 +comp2 +splAct2
						+ staff2 + loyal2
						+ promo2 + dfrdLylt2;

				comAttr.setFirstObjectAttribute(totalMrkDwn1+"");
				comAttr.setSecondObjectAttribute(totalMrkDwn2+"");

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
