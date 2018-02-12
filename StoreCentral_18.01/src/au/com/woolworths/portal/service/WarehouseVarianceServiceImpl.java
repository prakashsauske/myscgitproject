package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URLEncoder;
import java.util.ArrayList;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;

import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.model.WareHouseVarianceHdr;
import au.com.woolworths.portal.model.WareHouseVarianceHdrResponse;
import au.com.woolworths.portal.model.WarehouserVarianceItem;
import au.com.woolworths.portal.model.WarehouserVarianceItemResponse;
import au.com.woolworths.portal.param.WarehouseVarianceParam;

public class WarehouseVarianceServiceImpl extends CommonServiceImpl {

	@Value("#{url['WarehouseVarianceHdrServiceURL']}")
	private String warehouseVarianceHdrServiceURL;

	@Value("#{url['WarehouseVarianceItemServiceURL']}")
	private String warehouseVarianceItemServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	private static final Logger LOGGER = Logger.getLogger(WarehouseVarianceServiceImpl.class.getName());
	
	private String MANDATORY = "Please enter all mandatory inputs.";

	public ArrayList<WareHouseVarianceHdr> getOrderHdrDetails(
			WarehouseVarianceParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getOrderNo() != null && param.getSiteNo() != null
				&& !param.getOrderNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_order_no eq '").append(param.getOrderNo().toUpperCase())
					.append("'");
		} else {
			param.setMsg(MANDATORY);
			return null;
		}

		if (param.getDepartmentList() != null
				&& !param.getDepartmentList().equals(""))
			urlParam.append(" and iv_dept eq '")
					.append(param.getDepartmentList()).append("'");

		if (param.getSegme() != null && !param.getSegme().equals(""))
			urlParam.append(" and iv_segment eq '").append(param.getSegme())
					.append("'");

		if (param.getSubCat() != null && !param.getSubCat().equals(""))
			urlParam.append(" and iv_sub_category eq '")
					.append(param.getSubCat()).append("'");

		if (param.getCategory() != null && !param.getCategory().equals(""))
			urlParam.append(" and iv_category eq '")
					.append(param.getCategory()).append("'");
		
		if (param.getArticleNo() != null && !param.getArticleNo().equals(""))
			urlParam.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");

		LOGGER.info(urlParam);
		// urlParam=vendorServiceNewURL+URLEncoder.encode(urlParam,"UTF-8");
		URI url;
		try {
			url = new URI(warehouseVarianceHdrServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		WareHouseVarianceHdrResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					WareHouseVarianceHdrResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getWareHouseVarianceHdrResponseHelper() != null
				&& response.getWareHouseVarianceHdrResponseHelper()
						.getWareHouseVarianceHdrList() != null
				&& response.getWareHouseVarianceHdrResponseHelper()
						.getWareHouseVarianceHdrList().size() > 0
				) {
			if(!response.getWareHouseVarianceHdrResponseHelper()
					.getWareHouseVarianceHdrList().get(0).getMsg().trim()
					.contains(" "))
			return (ArrayList<WareHouseVarianceHdr>) response
					.getWareHouseVarianceHdrResponseHelper()
					.getWareHouseVarianceHdrList();
			else {
				param.setMsg(response.getWareHouseVarianceHdrResponseHelper()
						.getWareHouseVarianceHdrList().get(0).getMsg().trim());
			}
		} 

		return null;
	}
	
	public ArrayList<WarehouserVarianceItem> getOrderItemDetails(
			WarehouseVarianceParam param,UserContext user) throws UnsupportedEncodingException {

		StringBuffer urlParam = null;

		if (param.getOrderNo() != null && param.getSiteNo() != null
				&& !param.getOrderNo().equals("")
				&& !param.getSiteNo().equals("")) {
			urlParam = new StringBuffer(" iv_site eq '")
					.append(param.getSiteNo()).append("'")
					.append(" and iv_order_no eq '").append(param.getOrderNo().toUpperCase())
					.append("'").append(" and iv_mode eq 'B' ");
		} else {
			param.setMsg(MANDATORY);
			return null;
		}

		if (param.getDepartmentList() != null
				&& !param.getDepartmentList().equals(""))
			urlParam.append(" and iv_dept eq '")
					.append(param.getDepartmentList()).append("'");

		if (param.getSegme() != null && !param.getSegme().equals(""))
			urlParam.append(" and iv_segment eq '").append(param.getSegme())
					.append("'");

		if (param.getSubCat() != null && !param.getSubCat().equals(""))
			urlParam.append(" and iv_sub_category eq '")
					.append(param.getSubCat()).append("'");

		if (param.getCategory() != null && !param.getCategory().equals(""))
			urlParam.append(" and iv_category eq '")
					.append(param.getCategory()).append("'");
		
		if (param.getArticleNo() != null && !param.getArticleNo().equals(""))
			urlParam.append(" and iv_article eq '")
					.append(param.getArticleNo()).append("'");

		LOGGER.info(urlParam);
		// urlParam=vendorServiceNewURL+URLEncoder.encode(urlParam,"UTF-8");
		//urlParam=new StringBuffer(" iv_site eq '116' and iv_order_no eq '7010004826' ");
		URI url;
		try {
			url = new URI(warehouseVarianceItemServiceURL
					+ URLEncoder.encode(urlParam.toString(), "UTF-8"));

		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		WarehouserVarianceItemResponse response = null;

		try {
			response = getRestTemplate(user).getForObject(url,
					WarehouserVarianceItemResponse.class);
		} catch (Exception e) {
			LOGGER.error("Stack Trace :", e);
			return null;
		}

		if (response == null) {
			return null;
		} else if (response != null
				&& response.getWarehouserVarianceItemResponseHelper() != null
				&& response.getWarehouserVarianceItemResponseHelper()
						.getWarehouserVarianceItemList() != null
				&& response.getWarehouserVarianceItemResponseHelper()
						.getWarehouserVarianceItemList().size() > 0
				&& !response.getWarehouserVarianceItemResponseHelper()
						.getWarehouserVarianceItemList().get(0).getMsg().trim()
						.contains(" ")) {
			return (ArrayList<WarehouserVarianceItem>) response
					.getWarehouserVarianceItemResponseHelper()
					.getWarehouserVarianceItemList();
		} else {
			param.setMsg(response.getWarehouserVarianceItemResponseHelper()
					.getWarehouserVarianceItemList().get(0).getMsg().trim());
		}

		return null;
	}

}
