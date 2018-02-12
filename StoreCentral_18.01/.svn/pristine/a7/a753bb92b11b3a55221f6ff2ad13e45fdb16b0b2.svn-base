/**
 * 
 */
package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.AllocationOrderSearchDtl;
import au.com.woolworths.portal.model.AllocationOrderSearchResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.AllocationOrderSearchParam;
import au.com.woolworths.portal.util.Constants;
import au.com.woolworths.portal.util.PortalUtil;

/**
 * @author xrca4
 * 
 */
public class AllocationSearchServiceImpl extends CommonServiceImpl {

	@Value("#{url['AllocationOrderSearchServiceURL']}")
	private String allocationOrderSearchServiceURL;
	
	@Value("#{url['AllocationNewServiceUrl']}")
	private String allocationNewServiceUrl;
	

	private static final Logger LOGGER = Logger
			.getLogger(AllocationSearchServiceImpl.class.getName());
	
	
	public List<AllocationOrderSearchDtl> getAllocationOrderSearchDtls(AllocationOrderSearchParam param,UserContext user)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		Map<String, String> allocationArticleFlag=null;
		List<AllocationOrderSearchDtl>  allocationOrderSearchDtlList=null;
		if (param.getSiteNo() != null && !param.getSiteNo().equals("") 
				&& param.getFromDate()!=null && !param.getFromDate().equals("")
				&& param.getToDate()!=null &&  !param.getToDate().equals("")) {
			urlParam = new StringBuffer(" IV_SITE eq '").append(
					param.getSiteNo()).append("' and IV_DELV_DATE_FROM  eq '")
					.append(PortalUtil.convertToSAPDate(param.getFromDate()))
					.append("' and IV_DELV_DATE_TO  eq '")
					.append(PortalUtil.convertToSAPDate(param.getToDate()))
					.append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		if(param.getArticleNo()!=null && !param.getArticleNo().equals("")){
			
				urlParam.append(" and IV_ARTICLE  eq '")
						.append(param.getArticleNo()).append("'");
			//urlParam.append(" and iv_article eq '").append(param.getArticleNo()).append("'");
		}
		
		if(param.getArticleList()!=null && !param.getArticleList().equals("") && param.getArticleList().size()>0){
			for(String article: param.getArticleList()){
			urlParam.append(" and IV_ARTICLE  eq '")
					.append(article).append("'");
			}
		//urlParam.append(" and iv_article eq '").append(param.getArticleNo()).append("'");
	}
		
		if(param.getOrderStatus()!=null && !param.getOrderStatus().equals("")){
			urlParam.append(" and IV_ALLOC_STATUS eq '").append(param.getOrderStatus()).append("'");
		}
		
		if(param.getTradingDept()!=null && !param.getTradingDept().equals("")){
		urlParam.append(" and IV_TRADING_DEPT eq '").append(param.getTradingDept()).append("'");
		}
		
		//urlParam=new StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		 //and iv_article eq '3040690'
		System.out.println("urlParam __"+urlParam);
		URI url;
		try {
			url = new URI(allocationNewServiceUrl
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			LOGGER.info(urlParam);
			LOGGER.info(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		AllocationOrderSearchResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					AllocationOrderSearchResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getAllocationOrderSearchResponseHelper() != null
				&& response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl() != null
				&& response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl().size() > 0) {
			if (!response.getAllocationOrderSearchResponseHelper()
					.getAllocationOrderSearchDtl().get(0).getMsg().trim()
					.contains(" ")){
				param.setMsg(response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl().get(0).getMsg().trim());
				
				allocationArticleFlag=new LinkedHashMap<String, String>();
				allocationOrderSearchDtlList=(ArrayList<AllocationOrderSearchDtl>) response
						.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl();
				for(AllocationOrderSearchDtl allocationOrderSearchDtl:allocationOrderSearchDtlList){
					allocationArticleFlag.put(allocationOrderSearchDtl.getArticle(), "Y");
				}
				param.setArticlesAllocationFlagMap(allocationArticleFlag);
				return (ArrayList<AllocationOrderSearchDtl>) response
						.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl();
			}
			else {
				param.setMsg(response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl().get(0).getMsg().trim());
			}
		}

		return (ArrayList<AllocationOrderSearchDtl>) response
				.getAllocationOrderSearchResponseHelper()
				.getAllocationOrderSearchDtl();

	}

	/*public List<AllocationOrderSearchDtl> getAllocationOrderSearchDtls(AllocationOrderSearchParam param)
			throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		
		if (param.getSiteNo() != null && !param.getSiteNo().equals("") 
				&& param.getFromDate()!=null && !param.getFromDate().equals("")
				&& param.getToDate()!=null &&  !param.getToDate().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '").append(
					param.getSiteNo()).append("' and iv_delv_date_from eq '")
					.append(PortalUtil.convertToSAPDate(param.getFromDate()))
					.append("' and iv_delv_date_to eq '")
					.append(PortalUtil.convertToSAPDate(param.getToDate()))
					.append("'");
		} else {
			param.setMsg(Constants.MANDATORY);
			return null;
		}
		
		if(param.getArticleNo()!=null && !param.getArticleNo().equals("")){
			urlParam.append(" and iv_article eq '").append(param.getArticleNo()).append("'");
		}
		
		if(param.getOrderStatus()!=null && !param.getOrderStatus().equals("")){
			urlParam.append(" and iv_alloc_status eq '").append(param.getOrderStatus()).append("'");
		}
		
		
		//urlParam=new StringBuffer(" iv_site eq '0156' and iv_delv_date_from eq '20140505' and iv_delv_date_to eq '20140514'");
		 //and iv_article eq '3040690'
		System.out.println("urlParam __"+urlParam);
		URI url;
		try {
			url = new URI(allocationOrderSearchServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));
			LOGGER.info(urlParam);
			LOGGER.info(url);

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}

		AllocationOrderSearchResponse response = null;

		try {
			response = getRestTemplate().getForObject(url,
					AllocationOrderSearchResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			param.setMsg(Constants.SERVICE_ISSUE);
			return null;
		}
		// LOGGER.info(response);

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getAllocationOrderSearchResponseHelper() != null
				&& response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl() != null
				&& response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl().size() > 0) {
			if (!response.getAllocationOrderSearchResponseHelper()
					.getAllocationOrderSearchDtl().get(0).getMsg().trim()
					.contains(" ")){
				param.setMsg(response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl().get(0).getMsg().trim());
				return (ArrayList<AllocationOrderSearchDtl>) response
						.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl();
			}
			else {
				param.setMsg(response.getAllocationOrderSearchResponseHelper()
						.getAllocationOrderSearchDtl().get(0).getMsg().trim());
			}
		}

		return (ArrayList<AllocationOrderSearchDtl>) response
				.getAllocationOrderSearchResponseHelper()
				.getAllocationOrderSearchDtl();

	}*/
	
	
}
