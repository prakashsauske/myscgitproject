package au.com.woolworths.portal.pos.service;

import java.util.ArrayList;
import java.util.Iterator;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.Set;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.model.UnknownandUnRangedArticleDtl;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.pos.param.POSUnknowOrUnrangedParam;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.google.gson.Gson;

public class UnknownandUnRangedArticleServiceImpl extends PosServiceImpl {

	@Value("${POSArticleUnknownItemURL}")
	private String posArticleUnknownItemURL;

	private Map<String, List<UnknownandUnRangedArticleDtl>> unknownRangedMap;
	
	
	private Map<String, List<UnknownandUnRangedArticleDtl>> unknownRangedPrintMap;

	private static final Logger LOGGER = Logger
	.getLogger(UnknownandUnRangedArticleServiceImpl.class.getName());
	
	public String getUnknownUnrangedArticles(POSUnknowOrUnrangedParam param) {
		String msg="";
		Gson gson=new Gson();

		List<UnknownandUnRangedArticleDtl> unknownandUnRangedArticleList = null;

		try {
			long startTime = System.nanoTime();
			ParameterizedTypeReference<ServiceResponse<UnknownandUnRangedArticleDtl>> typeRef = new ParameterizedTypeReference<ServiceResponse<UnknownandUnRangedArticleDtl>>() {
			};
			unknownandUnRangedArticleList = invokeService(param, posArticleUnknownItemURL, typeRef, PosReportConstantsInterfaces.GENERATE_RPT);
			long endTime = System.nanoTime();
			long duration = (endTime - startTime);
			LOGGER.info("duration_"+(duration/1000000));
			if (unknownandUnRangedArticleList == null) {
				if (param.getMsg() != null && !param.getMsg().equals("")) {
					msg=	param.getMsg();
				} else {
					msg=Constants.NDF;
				}

			}
			startTime = System.nanoTime();
			convertArticleUnknownListToMap(unknownandUnRangedArticleList, param);
			convertArticleUnknownListForcntToMap(param);
			convertPrintUnknownListToMap(unknownandUnRangedArticleList, param);
			endTime = System.nanoTime();
			duration = (endTime - startTime);
			LOGGER.info("duration_"+(duration/1000000));

		} catch (Exception e) {
			LOGGER.error(Constants.EXCEPTION, e);
			msg=Constants.TECHNICAL_ISSUE;
		}

		return "{\"data\":" + gson.toJson(unknownRangedMap!=null?unknownRangedMap:new LinkedHashMap<String, List<UnknownandUnRangedArticleDtl>>() ) 
		+ ",\"msg\":\"" + msg + "\",\"print\":"+gson.toJson(unknownRangedPrintMap!=null?unknownRangedPrintMap:new LinkedHashMap<String, List<UnknownandUnRangedArticleDtl>>() )+"}";

	}

	private void convertArticleUnknownListToMap(
			List<UnknownandUnRangedArticleDtl> unknownUnRangedArticleList,
			POSUnknowOrUnrangedParam param) {
		String key = "";
		List<UnknownandUnRangedArticleDtl> tempAllocationList = null;
		if (unknownUnRangedArticleList != null
				&& unknownUnRangedArticleList.size() > 0) {
			unknownRangedMap = new LinkedHashMap<String, List<UnknownandUnRangedArticleDtl>>();
			for (UnknownandUnRangedArticleDtl getUnkown : unknownUnRangedArticleList) {
				key = getUnkown.getArticle()+"-"+getUnkown.getCalendarDayTo()+"-"+getUnkown.getEan_upc();
				if (unknownRangedMap.containsKey(key)) {
					tempAllocationList = unknownRangedMap.get(key);
					tempAllocationList.add(getUnkown);
					/*try{
						tempAllocationList.get(0).setTotalArtPrc(
								(tempAllocationList.get(0).getTotalArtPrc()!=null && !tempAllocationList.get(0).getTotalArtPrc().equals(""))? (tempAllocationList.get(0).getTotalArtPrc()):0.00
								+(getUnkown.getTotalSales()!=null && !getUnkown.getTotalSales().equals("")? Double.parseDouble(getUnkown.getTotalSales()):0.00));
						}catch(Exception e){
							e.printStackTrace();
						}*/
				} else {
					tempAllocationList = new ArrayList<UnknownandUnRangedArticleDtl>();
					tempAllocationList.add(getUnkown);
					/*try{
					tempAllocationList.get(0).setTotalArtPrc(
							(tempAllocationList.get(0).getTotalArtPrc()!=null && !tempAllocationList.get(0).getTotalArtPrc().equals(""))? (tempAllocationList.get(0).getTotalArtPrc()):0.0
							+(getUnkown.getTotalSales()!=null && !getUnkown.getTotalSales().equals("")? Double.parseDouble(getUnkown.getTotalSales()):0.0));
					}catch(Exception e){
						e.printStackTrace();
					}*/
				}
				unknownRangedMap.put(key, tempAllocationList);
			}
			Double totalArc=0.00;
			//List<UnknownandUnRangedArticleDtl> noSalesTempList = new ArrayList<UnknownandUnRangedArticleDtl>();
			Set<String> setOfKeys = unknownRangedMap.keySet();
			  Iterator<String> iterator = setOfKeys.iterator();
	
			 while (iterator.hasNext()) {
			
			 String keyAdd = (String) iterator.next();
	 
			  List<UnknownandUnRangedArticleDtl> value = new ArrayList<UnknownandUnRangedArticleDtl>();
			  value = unknownRangedMap.get(keyAdd);
			  
	
			  totalArc=0.00;
			  
			 
			  for(int k=0; k<value.size();k++)
			  {
			
				  totalArc=totalArc+Double.parseDouble(value.get(k).getTotalSales());
				 
				    
				  
			  }
			 
			  value.get(0).setTotalArtPrc(totalArc);
			  //noSalesTempList.add(value.get(0));
			
			  }
			
			//param.setMsg(((Integer)unknownRangedMap.size()).toString());
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
	}
	
	
	private void convertArticleUnknownListForcntToMap(
			POSUnknowOrUnrangedParam param) {
		String key = "";
		LinkedHashMap<String, List<UnknownandUnRangedArticleDtl>> unknownRangedTempMap=null;
		List<UnknownandUnRangedArticleDtl> unknownUnRangedArticleList=null;
		List<UnknownandUnRangedArticleDtl> unknownUnRangedNewList=null;
		List<UnknownandUnRangedArticleDtl> tempAllocationList = null;
		try{
		if (unknownRangedMap != null
				&& unknownRangedMap.size() > 0) {
			for (Map.Entry<String, List<UnknownandUnRangedArticleDtl>> entry : unknownRangedMap.entrySet()) {
			    //System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
				unknownUnRangedArticleList = (List<UnknownandUnRangedArticleDtl>) entry.getValue();
				unknownRangedTempMap=new LinkedHashMap<String, List<UnknownandUnRangedArticleDtl>>();
			for (UnknownandUnRangedArticleDtl getUnkown : unknownUnRangedArticleList) {
				key = getUnkown.getSite();
				if (unknownRangedTempMap.containsKey(key)) {
					tempAllocationList = unknownRangedTempMap.get(key);
					tempAllocationList.add(getUnkown);
				} else {
					tempAllocationList = new ArrayList<UnknownandUnRangedArticleDtl>();
					tempAllocationList.add(getUnkown);
				}
				unknownRangedTempMap.put(key, tempAllocationList);
			}
			//param.setMsg(((Integer)unknownRangedMap.size()).toString());
			//System.out.println("unknownRangedTempMap size "+ unknownRangedTempMap.size());
			unknownUnRangedArticleList=new ArrayList<UnknownandUnRangedArticleDtl>();
			for (Map.Entry<String, List<UnknownandUnRangedArticleDtl>> newEntry : unknownRangedTempMap.entrySet()) {
			    //System.out.println("Key = " + entry.getKey() + ", Value = " + entry.getValue());
				unknownUnRangedNewList=newEntry.getValue();
				unknownUnRangedNewList.get(0).setCnt(unknownUnRangedNewList.size());
				//System.out.println("unknownUnRangedNewList size "+ unknownUnRangedNewList.size());
			unknownUnRangedArticleList.addAll(unknownUnRangedNewList);
			}
			unknownRangedMap.put(entry.getKey(), unknownUnRangedArticleList);
			}
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
		}catch(Exception e){
			e.printStackTrace();
		}
	}
	
	private void convertPrintUnknownListToMap(
			List<UnknownandUnRangedArticleDtl> unknownUnRangedArticleList,
			POSUnknowOrUnrangedParam param) {
		String key = "";
		List<UnknownandUnRangedArticleDtl> tempAllocationList = null;
		if (unknownUnRangedArticleList != null
				&& unknownUnRangedArticleList.size() > 0) {
			unknownRangedPrintMap = new LinkedHashMap<String, List<UnknownandUnRangedArticleDtl>>();
			for (UnknownandUnRangedArticleDtl getUnkown : unknownUnRangedArticleList) {
				key = getUnkown.getArticle()+"-"+getUnkown.getSite();
				if (unknownRangedPrintMap.containsKey(key)) {
					tempAllocationList = unknownRangedPrintMap.get(key);
					tempAllocationList.add(getUnkown);
				} else {
					tempAllocationList = new ArrayList<UnknownandUnRangedArticleDtl>();
					tempAllocationList.add(getUnkown);
				}
				unknownRangedPrintMap.put(key, tempAllocationList);
			}
			//param.setMsg(((Integer)unknownRangedPrintMap.size()).toString());
		} else {
			if (param.getMsg() != null && param.getMsg().equals(""))
				param.setMsg(Constants.NDF);
		}
	}

	@Override
	public String formUrlParam(MandatoryReportParam params) {
		if(params instanceof POSUnknowOrUnrangedParam) {
			POSUnknowOrUnrangedParam param = (POSUnknowOrUnrangedParam)params;
			Map<String, String> map = new LinkedHashMap<String, String>();
			map.put("ZV_DATE_IM", param.getDateFrom());
			map.put("ZV_TDATE_IM",
					(CommonUtils.isNullEmptyWhiteSpace(param.getDateTo()) ? param
							.getDateFrom() : param.getDateTo()));
			//map.put("VAR_20111208223707", param.getSiteNo());
	
			List<String> mandatoryParams = new ArrayList<String>();
			mandatoryParams.add("ZV_DATE_IM");
			mandatoryParams.add("ZV_TDATE_IM");
			//mandatoryParams.add("VAR_20111208223707");
	
			List<String> dateParams = new ArrayList<String>();
			dateParams.add("ZV_DATE_IM");
			dateParams.add("ZV_TDATE_IM");
	
			if (checkAndUpdateMandatoryParams(map, mandatoryParams, dateParams) == false) {
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
