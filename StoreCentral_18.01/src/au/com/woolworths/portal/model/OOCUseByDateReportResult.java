/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xkaew
 *
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OOCUseByDateReportResult {
	
	
	
	@JsonProperty("use_by_date")
	private String use_by_date;
	@JsonProperty("expires")
	private String expires ;
	
	@JsonProperty("mrkdwn_flag")
	private String mrkdwn_flag ;
	
	@JsonProperty("stk_adj_flag")
	private String stk_adj_flag ;

	/**
	 * @return the use_by_date
	 */
	public String getUse_by_date() {
		return use_by_date;
	}

	/**
	 * @param use_by_date the use_by_date to set
	 */
	public void setUse_by_date(String use_by_date) {
		this.use_by_date = use_by_date;
	}

	/**
	 * @return the expires
	 */
	public String getExpires() {
		return expires;
	}

	/**
	 * @param expires the expires to set
	 */
	public void setExpires(String expires) {
		this.expires = expires;
	}

	/**
	 * @return the mrkdwn_flag
	 */
	public String getMrkdwn_flag() {
		return mrkdwn_flag;
	}

	/**
	 * @param mrkdwn_flag the mrkdwn_flag to set
	 */
	public void setMrkdwn_flag(String mrkdwn_flag) {
		this.mrkdwn_flag = mrkdwn_flag;
	}

	/**
	 * @return the stk_adj_flag
	 */
	public String getStk_adj_flag() {
		return stk_adj_flag;
	}

	/**
	 * @param stk_adj_flag the stk_adj_flag to set
	 */
	public void setStk_adj_flag(String stk_adj_flag) {
		this.stk_adj_flag = stk_adj_flag;
	}

}
