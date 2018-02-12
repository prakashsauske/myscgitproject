package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeStockValuationReportResult {

	@JsonProperty("department_name")
	private String department_name;
	@JsonProperty("ttl_trdng_flr_val")
	private String ttl_trdng_flr_val;
	@JsonProperty("ttl_rsrv_flr_val")
	private String ttl_rsrv_flr_val;
	@JsonProperty("ttl_stock_val")
	private String ttl_stock_val;
	
	public String getDepartment_name() {
		return (department_name == null ? "" : department_name);
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public String getTtl_trdng_flr_val() {
		return (ttl_trdng_flr_val == null ? "" : ttl_trdng_flr_val);
	}
	public void setTtl_trdng_flr_val(String ttl_trdng_flr_val) {
		this.ttl_trdng_flr_val = ttl_trdng_flr_val;
	}
	public String getTtl_rsrv_flr_val() {
		return (ttl_rsrv_flr_val == null ? "" : ttl_rsrv_flr_val);
	}
	public void setTtl_rsrv_flr_val(String ttl_rsrv_flr_val) {
		this.ttl_rsrv_flr_val = ttl_rsrv_flr_val;
	}
	public String getTtl_stock_val() {
		return (ttl_stock_val == null ? "" : ttl_stock_val);
	}
	public void setTtl_stock_val(String ttl_stock_val) {
		this.ttl_stock_val = ttl_stock_val;
	}
	
}
