package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.ManualOrderBookHdrDtl;
import au.com.woolworths.portal.model.ManualOrderBookHdrResponse;
import au.com.woolworths.portal.model.ManualOrderBookItem;
import au.com.woolworths.portal.model.ManualOrderBookItemResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.ManualOrderParam;

public class ManualOrderBookServiceImpl extends CommonServiceImpl {

	@Value("#{url['ManualOrderBookHdrServiceURL']}")
	private String manualOrderBookHdrServiceURL;

	@Value("#{url['ManualOrderBookItemServiceURL']}")
	private String manualOrderBookItemServiceURL;
	
	@Value("#{url['ManualOrderBookNewServiceUrl']}")
	private String manualOrderBookNewServiceUrl;
	

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(ManualOrderBookServiceImpl.class.getName());
	
	private String MISSING_INPUT = "Please enter all input.";

	
	public ArrayList<ManualOrderBookHdrDtl> getManualOrderBookDtls(
			ManualOrderParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");

		urlParam = new StringBuffer(" IV_STORE eq '")
				.append(param.getSiteNo())
				// .append("'")
				// .append(" and iv_s_org eq '").append(param.getSalesOrg())
				// .append("' and iv_dc eq '").append(param.getDc())
				// .append("' and iv_supp_id eq '").append(param.getSuppNo())
				.append("' and IV_DATE eq '").append(sf.format(new Date()))
				.append("'")
				.append(" and IV_MODE eq 'A'")
		;

		if (param.getSubCat() != null && !param.getSubCat().equals("") && param.getSubCat().length>0) {
			System.out.println("param.getSubCat()_"+ param.getSubCat());
			for(int i=0;i<param.getSubCat().length;i++){
			urlParam.append(" and IV_SUB_CATEGORY eq '")
					.append(param.getSubCat()[i]).append("'");
			}
		} else if (param.getCategory() != null
				&& !param.getCategory().equals("")) {
			urlParam.append(" and IV_CATEGORY eq '")
					.append(param.getCategory()).append("'");
		} else if (param.getDepartmentList() != null
				&& !param.getDepartmentList().equals("")) {
			urlParam.append(" and IV_DEPARTMENT eq '")
					.append(param.getDepartmentList()).append("'");
		} else {
			param.setMsg(MISSING_INPUT);
			return null;
		}

		System.out.println(urlParam);
		// urlParam=new
		// StringBuffer("iv_store eq '0156' and iv_date eq '20140305' and iv_department eq '9560'");
		URI url;
		try {
			url = new URI(manualOrderBookNewServiceUrl
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ManualOrderBookHdrResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ManualOrderBookHdrResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getManualOrderBookHdrResponseHelper() != null
				&& response.getManualOrderBookHdrResponseHelper()
						.getManualOrderBookHdrDtlList() != null
				&& response.getManualOrderBookHdrResponseHelper()
						.getManualOrderBookHdrDtlList().size() > 0
				&& !response.getManualOrderBookHdrResponseHelper()
						.getManualOrderBookHdrDtlList().get(0).getMsg().trim()
						.contains(" ")) {
			return (ArrayList<ManualOrderBookHdrDtl>) response
					.getManualOrderBookHdrResponseHelper()
					.getManualOrderBookHdrDtlList();
		} else {
			param.setMsg(response.getManualOrderBookHdrResponseHelper()
					.getManualOrderBookHdrDtlList().get(0).getMsg().trim());
		}

		return null;
	}
	
	
	public ArrayList<ManualOrderBookHdrDtl> getManualOrderBookHdtDtls(
			ManualOrderParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");

		urlParam = new StringBuffer(" iv_store eq '")
				.append(param.getSiteNo())
				// .append("'")
				// .append(" and iv_s_org eq '").append(param.getSalesOrg())
				// .append("' and iv_dc eq '").append(param.getDc())
				// .append("' and iv_supp_id eq '").append(param.getSuppNo())
				.append("' and iv_date eq '").append(sf.format(new Date()))
				.append("'")
				.append(" and iv_mode eq 'A'")
		;

		if (param.getSubCat() != null && !param.getSubCat().equals("")) {
			urlParam.append(" and iv_sub_category eq '")
					.append(param.getSubCat()).append("'");
		} else if (param.getCategory() != null
				&& !param.getCategory().equals("")) {
			urlParam.append(" and iv_category eq '")
					.append(param.getCategory()).append("'");
		} else if (param.getDepartmentList() != null
				&& !param.getDepartmentList().equals("")) {
			urlParam.append(" and iv_department eq '")
					.append(param.getDepartmentList()).append("'");
		} else {
			param.setMsg(MISSING_INPUT);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer("iv_store eq '0156' and iv_date eq '20140305' and iv_department eq '9560'");
		URI url;
		try {
			url = new URI(manualOrderBookHdrServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ManualOrderBookHdrResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ManualOrderBookHdrResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getManualOrderBookHdrResponseHelper() != null
				&& response.getManualOrderBookHdrResponseHelper()
						.getManualOrderBookHdrDtlList() != null
				&& response.getManualOrderBookHdrResponseHelper()
						.getManualOrderBookHdrDtlList().size() > 0
				&& !response.getManualOrderBookHdrResponseHelper()
						.getManualOrderBookHdrDtlList().get(0).getMsg().trim()
						.contains(" ")) {
			return (ArrayList<ManualOrderBookHdrDtl>) response
					.getManualOrderBookHdrResponseHelper()
					.getManualOrderBookHdrDtlList();
		} else {
			param.setMsg(response.getManualOrderBookHdrResponseHelper()
					.getManualOrderBookHdrDtlList().get(0).getMsg().trim());
		}

		return null;
	}

	public ArrayList<ManualOrderBookItem> getManualOrderBookItemDtls(
			ManualOrderParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;
		SimpleDateFormat sf = new SimpleDateFormat("yyyyMMdd");
		/*
		 * if (param.getDc() == null || param.getSiteNo() == null ||
		 * param.getDc() == null || param.getSuppNo() == null || param.getDate()
		 * == null || param.getVendor() == null) {
		 */

		urlParam = new StringBuffer(" iv_store eq '")
				.append(param.getSiteNo())
				// .append("'")
				// .append(" and iv_s_org eq '").append(param.getSalesOrg())
				// .append("' and iv_dc eq '").append(param.getDc())
				// .append("' and iv_supp_id eq '").append(param.getSuppNo())
				.append("' and iv_vendor eq '").append(param.getVendor())
				.append("' and iv_date eq '").append(sf.format(new Date()))
				.append("'")
		// .append(" and iv_mode eq 'B'")
		;

		if (param.getSubCat() != null && !param.getSubCat().equals("")) {
			urlParam.append(" and iv_sub_category eq '")
					.append(param.getSubCat()).append("'");
		} else if (param.getCategory() != null
				&& !param.getCategory().equals("")) {
			urlParam.append(" and iv_category eq '")
					.append(param.getCategory()).append("'");
		} else if (param.getDepartmentList() != null
				&& !param.getDepartmentList().equals("")) {
			urlParam.append(" and iv_department eq '")
					.append(param.getDepartmentList()).append("'");
		} else {
			param.setMsg(MISSING_INPUT);
			return null;
		}

		LOGGER.info(urlParam);
		// urlParam=new
		// StringBuffer("iv_store eq '0156' and iv_date eq '20140305' and iv_department eq '9560'");
		URI url;
		try {
			url = new URI(manualOrderBookItemServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		ManualOrderBookItemResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					ManualOrderBookItemResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getManualOrderBookItemResponseHelper() != null
				&& response.getManualOrderBookItemResponseHelper()
						.getManualOrderBookItemList() != null
				&& response.getManualOrderBookItemResponseHelper()
						.getManualOrderBookItemList().size() > 0
				&& !response.getManualOrderBookItemResponseHelper()
						.getManualOrderBookItemList().get(0).getMsg().trim()
						.contains(" ")) {
			return (ArrayList<ManualOrderBookItem>) response
					.getManualOrderBookItemResponseHelper()
					.getManualOrderBookItemList();
		} else {
			param.setMsg(response.getManualOrderBookItemResponseHelper()
					.getManualOrderBookItemList().get(0).getMsg().trim());
		}

		return null;
	}
}
