package au.com.woolworths.portal.service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.JsonParseException;
import org.codehaus.jackson.map.JsonMappingException;
import org.springframework.http.converter.HttpMessageConverter;
import org.springframework.http.converter.json.MappingJacksonHttpMessageConverter;

import au.com.woolworths.portal.model.Site;
import au.com.woolworths.portal.model.SiteResponse;
import au.com.woolworths.portal.model.SiteResponseHelper;

public class StoreODataImpl extends CommonServiceImpl {

	private final static String siteServiceUrl = "http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZMAS_STORE_DETAILS/zmas_store_detailsCollection?$filter={filter}";

	public Site getSite(String siteNo) throws JsonParseException,
			JsonMappingException, IOException {
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();

		// Add the Jackson Message converter
		messageConverters.add(new MappingJacksonHttpMessageConverter());

		// Add the message converters to the restTemplate
		restTemplate.setMessageConverters(messageConverters);

		// {"d":{"results":[{"__metadata":{"uri":"http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZMAS_STORE_DETAILS/zmas_store_detailsCollection('')","type":"ZMAS_STORE_DETAILS.zmas_store_details"},"name1":"Wentworthville","werks":"1183","site":""}]}}
		SiteResponse response = restTemplate.getForObject(siteServiceUrl,
				SiteResponse.class, "site eq '" + siteNo + "'");

		if (response != null && response.getResponse() != null) {
			for (Site site : response.getResponse().getSites()) {

				// system.err.println("---Name " + site.getName());
				// system.err.println("---No " + site.getNo());

				return site;
			}
		}
		return null;
	}

	public SiteResponseHelper getSiteRes(String siteNo)
			throws JsonParseException, JsonMappingException, IOException {

		// //System.out.println("------ StoreODataImpl ------ ");
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();

		// Add the Jackson Message converter
		messageConverters.add(new MappingJacksonHttpMessageConverter());

		// Add the message converters to the restTemplate
		restTemplate.setMessageConverters(messageConverters);

		// {"d":{"results":[{"__metadata":{"uri":"http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZMAS_STORE_DETAILS/zmas_store_detailsCollection('')","type":"ZMAS_STORE_DETAILS.zmas_store_details"},"name1":"Wentworthville","werks":"1183","site":""}]}}
		SiteResponse response = restTemplate.getForObject(siteServiceUrl,
				SiteResponse.class, "site eq '" + siteNo + "'");

		// //System.out.println("**** response "+response);
		// //System.out.println("**** response.getResponse() "+response.getResponse());

		if (response != null && response.getResponse() != null) {
			return response.getResponse();
		}

		return null;
	}

	public List<Site> getSiteList(String siteNo) throws JsonParseException,
			JsonMappingException, IOException {

		// //System.out.println("------ StoreODataImpl ------ ");
		List<HttpMessageConverter<?>> messageConverters = new ArrayList<HttpMessageConverter<?>>();

		// Add the Jackson Message converter
		messageConverters.add(new MappingJacksonHttpMessageConverter());

		// Add the message converters to the restTemplate
		restTemplate.setMessageConverters(messageConverters);

		// {"d":{"results":[{"__metadata":{"uri":"http://sapiecci.woolworths.com.au:8061/sap/opu/odata/sap/ZMAS_STORE_DETAILS/zmas_store_detailsCollection('')","type":"ZMAS_STORE_DETAILS.zmas_store_details"},"name1":"Wentworthville","werks":"1183","site":""}]}}
		SiteResponse response = restTemplate.getForObject(siteServiceUrl,
				SiteResponse.class, "site eq '" + siteNo + "'");

		if (response != null && response.getResponse() != null) {
			return response.getResponse().getSites();
		}

		return new ArrayList<Site>();
	}
}
