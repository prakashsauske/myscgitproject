package au.com.woolworths.portal.pos.service;

import java.lang.reflect.ParameterizedType;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Map;
import java.util.Map.Entry;

import javax.servlet.http.HttpSession;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.ParameterizedTypeReference;

import au.com.woolworths.portal.pos.controller.JasperRptResponseHandlerUtil;
import au.com.woolworths.portal.pos.model.ServiceResponse;
import au.com.woolworths.portal.pos.param.MandatoryReportParam;
import au.com.woolworths.portal.reports.PosReportConstantsInterfaces;
import au.com.woolworths.portal.service.CommonServiceImpl;
import au.com.woolworths.portal.util.CacheManagerUtil;
import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.Constants;

import com.google.common.base.Joiner;

public abstract class PosServiceImpl {
	public abstract String formUrlParam(MandatoryReportParam param);
	private static final Logger LOGGER = Logger
			.getLogger(PosServiceImpl.class.getName());
	private HttpSession session;

	@Autowired
	private CommonServiceImpl serviceImpl;

	public <E> List<E> invokeService(MandatoryReportParam param,
			String serviceUrl, ParameterizedTypeReference<ServiceResponse<E>> typeRef) {
		LOGGER.info("Service url : "+serviceUrl);
		List<E> list = null;
		try {
			list = serviceImpl.invokeServiceCall(param, serviceUrl, typeRef);
			LOGGER.info("Service invocation completed - Could be fine!!!!!!!");
		} catch (Exception e) {
			LOGGER.error("Exception occured while invoking service : ", e);
		}
		if(list==null && !CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getMsg())) {
			param.setMsg(Constants.NDF);
		}
		return list;
	}
	public <E> List<E> invokeService(MandatoryReportParam param,
			String serviceUrl, ParameterizedTypeReference<ServiceResponse<E>> typeRef, String action) {
		String serviceUrlWithParam = serviceUrl+formUrlParam(param);
		LOGGER.info("Service url : "+serviceUrlWithParam);
		List<E> list = null;
		try {
			list = serviceImpl.invokeServiceCall(param, serviceUrlWithParam, typeRef);
			 if(PosReportConstantsInterfaces.GENERATE_RPT.equals(action) 
					 && JasperRptResponseHandlerUtil.isReportCacheEnabled(this.getSession().getServletContext())) {
				 Class<?> tmpClz = ((Class<?>)((ParameterizedType)typeRef.getType()).getActualTypeArguments()[0]);
				 if("EHCACHE".equalsIgnoreCase(JasperRptResponseHandlerUtil.getReportCacheSource(this.getSession().getServletContext()))) {
					 LOGGER.info("Using EHCACHE for caching 1POS reports");
					 CacheManagerUtil.getInstance().put(this.getSession().getId(), tmpClz, list);					 
				 }
				 else {
					 LOGGER.info("Using HTTP Session for caching 1POS reports");
					 String className = tmpClz.getName();
					 this.getSession().setAttribute(this.getSession().getId()+"_"+className, list);
				 }
			 }
			LOGGER.info("Service invocation completed - Could be fine!!!!!!!");
		} catch (Exception e) {
			LOGGER.error("Exception occured while invoking service : ", e);
		}
		if(list==null && !CommonUtils.isNotNullNotEmptyNotWhiteSpace(param.getMsg())) {
			param.setMsg(Constants.NDF);
		}
		return list;
	}

	public <K> String convertTojson(List<K> obj, String msg) {

		return "{\"data\":" + Constants.convertToJsonString(obj)
				+ ",\"msg\":\"" + msg + "\"}";
	}
	public HttpSession getSession() {
		return session;
	}
	public void setSession(HttpSession session) {
		this.session = session;
	}
	public String formatDateForService(String inputDate) {
		String inputDateFormat = "dd/MM/yyyy HH:mm:ss";
		String dateFormatForService = "yyyy-MM-dd'T'HH:mm:ss";
		SimpleDateFormat sdf = null;
		SimpleDateFormat sdf1 = null;
		String result = null;
		try {
			sdf = new SimpleDateFormat(inputDateFormat);
			sdf.setLenient(false);
			sdf1 = new SimpleDateFormat(dateFormatForService);
			result = sdf1.format(sdf.parse(inputDate));
		}
		catch(Exception e){
			return null;
		}
		finally {
			sdf=null;
			sdf1=null;
		}
		return "datetime'"+result+"'";
	}
	public boolean checkAndUpdateMandatoryParams(Map<String, String> map, List<String> mandatoryParams, List<String> dateParams) {
		boolean isMandatory = true;
		String key = null;
		String value = null;
		boolean isBlank = false;
		String tmpDt = null;
		for (String dateKey : dateParams) {
			tmpDt = map.get(dateKey);
			if("ZV_DATE_IM".equalsIgnoreCase(dateKey) || "ZV_CALDAY_MIV_003".equalsIgnoreCase(dateKey)) {
				tmpDt +=" "+Constants.START_TIME;
			}
			else if("ZV_TDATE_IM".equalsIgnoreCase(dateKey) || "ZV_CALDAY_MIV_003To".equalsIgnoreCase(dateKey)) {
				tmpDt +=" "+Constants.END_TIME;
			}
			/*else {
				tmpDt +=" "+Constants.START_TIME;
			}*/
			map.put(dateKey, formatDateForService(tmpDt));
		}
		for (Entry<String, String> entry : map.entrySet()) {
			key = entry.getKey();
			value = entry.getValue();
			isBlank  = CommonUtils.isNullEmpty(value);
			if(mandatoryParams.contains(key) && isBlank) { // key.matches("")
				isMandatory = false;
				break;
			}
			if(!dateParams.contains(key)) {
				map.put(key, "'"+(isBlank?"":value)+"'");
			}
		}
		return isMandatory;
	}

	public String getUrlParams(Map<String, String> map) {
		if (map != null) {
			String str = "(" + Joiner.on(",").join(map.entrySet())
					+ ")/Results";
			return str;
		} else {
			return "";
		}
	}
	@SuppressWarnings("unchecked")
	public <T> List<T> getSessionCachePrintData(String action, Class<T> clz) {
		List<T> tmp = null;
		if(PosReportConstantsInterfaces.PRINT_RPT.equals(action) && JasperRptResponseHandlerUtil.isReportCacheEnabled(this.getSession().getServletContext())) {
			if("EHCACHE".equalsIgnoreCase(JasperRptResponseHandlerUtil.getReportCacheSource(this.getSession().getServletContext()))) {
				LOGGER.info("Retrieving from EHCACHE");
				tmp = CacheManagerUtil.getInstance().get(this.getSession().getId(), clz);
			} else {
				LOGGER.info("Retrieving from Http Session");
				tmp = (List<T>)session.getAttribute(this.getSession().getId()+"_"+clz.getName());				 
			}
			if(tmp!=null && tmp.size()>0) {
				Object o = tmp.get(0);
				if(clz != o.getClass()) {
					LOGGER.info("Looks like invlid session data, should attempt to hit service");
					tmp = null;
				}
				else {
					LOGGER.info("Valid Session data, Service call avoided BOOM!!!!...................");
				}
			}
			else {
				LOGGER.info("No session data, should attempt to hit service");
			}
		}
		return tmp;
	}

}
