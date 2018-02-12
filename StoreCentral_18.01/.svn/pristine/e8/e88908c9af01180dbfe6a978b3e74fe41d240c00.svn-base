/**
 * 
 */
package au.com.woolworths.portal.pos.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author 
 *
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class ServiceResponse<T> {
	
	@JsonProperty("d")
	private ServiceResponseHelper<T> serviceResponseHelper;

	/**
	 * @return the serviceResponseHelper
	 */
	public ServiceResponseHelper<T> getServiceResponseHelper() {
		return serviceResponseHelper;
	}

	/**
	 * @param serviceResponseHelper the serviceResponseHelper to set
	 */
	public void setServiceResponseHelper(
			ServiceResponseHelper<T> serviceResponseHelper) {
		this.serviceResponseHelper = serviceResponseHelper;
	}


	
	

}
