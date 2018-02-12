package au.com.woolworths.portal.service;

import java.io.UnsupportedEncodingException;
import java.net.URI;
import java.net.URISyntaxException;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;


import au.com.woolworths.portal.model.RestrictionParam;
import au.com.woolworths.portal.model.UserContext;

public class ValidationServiceImpl extends CommonServiceImpl {

	@Value("#{url['RestrictionParamServiceURL']}")
	private String restrictionParamServiceURL;
	
	private static final Logger LOGGER = Logger.getLogger(ValidationServiceImpl.class.getName());
	@Value("#{url['ReplenishmentDateServiceURL']}")
	private String replenishmentDateServiceURL;
	
	
	public RestrictionParam getRestrictionParam(UserContext user)
			throws UnsupportedEncodingException {

		RestrictionParam response = null;
		URI url = null;
		try {
			url = new URI(restrictionParamServiceURL+"getRestrictionParamDtls");
		} catch (URISyntaxException e1) {
			LOGGER.error("",e1);
			return null;
		}
		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,RestrictionParam.class);
			if (response != null) {
				System.out.println("Restriction Param ::> "+response.toString());
			}
		} catch (Exception e) {
			LOGGER.error("",e);
			return null;
		}
		return response;
	}
	public String getReplenishmentDate(UserContext user)
			throws UnsupportedEncodingException {

		String response = null;
		URI url = null;
		try {
			url = new URI(replenishmentDateServiceURL);
		} catch (URISyntaxException e1) {
			LOGGER.error(e1);
			return null;
		}
		try {
			response = getRestTemplateForReplenishment(user).getForObject(url,String.class);
			if (response != null) {
				System.out.println("Response ::> "+response.toString());
			}
		} catch (Exception e) {
			LOGGER.error(e);
			return null;
		}
		return response.toString();
	}
	
}
