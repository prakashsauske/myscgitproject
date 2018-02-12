package au.com.woolworths.portal.service;

import java.util.ArrayList;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.model.NightFillBreakLoadFutureResponse;
import au.com.woolworths.portal.model.TobaccoPricing;
import au.com.woolworths.portal.model.TobaccoPricingResponse;
import au.com.woolworths.portal.model.TobaccoPricingResponseHelper;

public class TobaccoPricingServiceImpl extends CommonServiceImpl {

	@Value("#{url['TobaccoPricingURL']}")
	private String TobaccoPricingURL;
	
	
	public ArrayList<TobaccoPricing> fetchTobaccoPricing(String site){
		HttpHeaders requestHeaders = new HttpHeaders();
		TobaccoPricingResponse response = null;
		ArrayList<TobaccoPricing> responseData = new ArrayList<TobaccoPricing>();
		
		
				try {
					
			String urlParam = " '" + site + "' ";
			System.out.println("URL : " + TobaccoPricingURL+urlParam);
			response = getRestTemplateForTOPR().getForObject(
					TobaccoPricingURL+urlParam, TobaccoPricingResponse.class);
			
			System.out.println(response.toString());
			responseData =response.getTobaccoPricingResponseHelper().getTobaccoPricingList();

		} catch (Exception e) {
			e.printStackTrace();
		}

		return responseData;
	}
}
