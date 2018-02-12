package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class UldSweepResult {
	
	@JsonProperty("iv_uld_id")
	private String iv_uld_id;
	
	@JsonProperty("iv_uld_recv_qty")
	private String iv_uld_recv_qty;
	
	@JsonProperty("iv_uld_return_qty")
	private String iv_uld_return_qty;
	
	@JsonProperty("uld_type")
	private String uld_type;

	public String getUld_type() {
		return (uld_type == null ? "" : uld_type);
	}

	public void setUld_type(String uld_type) {
		this.uld_type = uld_type;
	}

	public String getIv_uld_id() {
		return (iv_uld_id == null ? "" : iv_uld_id);
	}

	public void setIv_uld_id(String iv_uld_id) {
		this.iv_uld_id = iv_uld_id;
	}

	public String getIv_uld_recv_qty() {
		return (iv_uld_recv_qty == null ? "" : iv_uld_recv_qty);
	}

	public void setIv_uld_recv_qty(String iv_uld_recv_qty) {
		this.iv_uld_recv_qty = iv_uld_recv_qty;
	}

	public String getIv_uld_return_qty() {
		return (iv_uld_return_qty == null ? "" : iv_uld_return_qty);
	}

	public void setIv_uld_return_qty(String iv_uld_return_qty) {
		this.iv_uld_return_qty = iv_uld_return_qty;
	}

}
