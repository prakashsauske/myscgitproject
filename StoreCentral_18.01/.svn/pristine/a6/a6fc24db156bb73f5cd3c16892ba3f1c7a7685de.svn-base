/**
 * 
 */
package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class LimitQuantityResponse {

	@JsonProperty("result")
	private  List<LimitQuantity> limitQtyList;
	
	@JsonProperty("ErrorCode")
	private String errorCode;

	/**
	 * @return the limitQtyList
	 */
	public List<LimitQuantity> getLimitQtyList() {
		return limitQtyList;
	}

	/**
	 * @param limitQtyList the limitQtyList to set
	 */
	public void setLimitQtyList(List<LimitQuantity> limitQtyList) {
		this.limitQtyList = limitQtyList;
	}

	/**
	 * @return the errorCode
	 */
	public String getErrorCode() {
		return errorCode;
	}

	/**
	 * @param errorCode the errorCode to set
	 */
	public void setErrorCode(String errorCode) {
		this.errorCode = errorCode;
	}
	
	
}
