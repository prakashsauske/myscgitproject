package au.com.woolworths.portal.model;

import java.text.DecimalFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xlki1
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class StockTakeTeamPerformanceReportResult {

	@JsonProperty("department_name")
	private String department_name;
	@JsonProperty("cnt_upto_pls_or_mns_9")
	private String cnt_upto_pls_or_mns_9;
	@JsonProperty("prcntg_upto_pls_or_mns_9")
	private String prcntg_upto_pls_or_mns_9;
	@JsonProperty("cnt_btw_10_29")
	private String cnt_btw_10_29;
	@JsonProperty("prcntg_btw_10_29")
	private String prcntg_btw_10_29;
	@JsonProperty("cnt_btw_30_49")
	private String cnt_btw_30_49;
	@JsonProperty("prcntg_btw_30_49")
	private String prcntg_btw_30_49;
	@JsonProperty("cnt_btw_50_99")
	private String cnt_btw_50_99;
	@JsonProperty("prcntg_btw_50_99")
	private String prcntg_btw_50_99;
	@JsonProperty("cnt_over_99")
	private String cnt_over_99;
	@JsonProperty("prcntg_over_99")
	private String prcntg_over_99;
	@JsonProperty("ttl_cnt")
	private String ttl_cnt;
	@JsonProperty("tt_prcntg")
	private String total_per;
	@JsonProperty("cnt")
	private String cnt;
	@JsonProperty("percentage")
	private String percentage;
	
	
	
	public String getCnt() {
		return (cnt == null ? "" : cnt);
	}
	public void setCnt(String cnt) {
		this.cnt = cnt;
	}
	public String getPercentage() {
		return (percentage == null ? "" : formatNumber(percentage));
	}
	public void setPercentage(String percentage) {
		this.percentage = percentage;
	}
	public String getDepartment_name() {
		return (department_name == null ? "" : department_name);
	}
	public void setDepartment_name(String department_name) {
		this.department_name = department_name;
	}
	public String getCnt_upto_pls_or_mns_9() {
		return (cnt_upto_pls_or_mns_9 == null ? "" : cnt_upto_pls_or_mns_9);
	}
	public void setCnt_upto_pls_or_mns_9(String cnt_upto_pls_or_mns_9) {
		this.cnt_upto_pls_or_mns_9 = cnt_upto_pls_or_mns_9;
	}
	public String getPrcntg_upto_pls_or_mns_9() {
		return (prcntg_upto_pls_or_mns_9 == null ? "" : formatNumber(prcntg_upto_pls_or_mns_9));
	}
	public void setPrcntg_upto_pls_or_mns_9(String prcntg_upto_pls_or_mns_9) {
		this.prcntg_upto_pls_or_mns_9 = prcntg_upto_pls_or_mns_9;
	}
	public String getCnt_btw_10_29() {
		return (cnt_btw_10_29 == null ? "" : cnt_btw_10_29);
	}
	public void setCnt_btw_10_29(String cnt_btw_10_29) {
		this.cnt_btw_10_29 = cnt_btw_10_29;
	}
	public String getPrcntg_btw_10_29() {
		return (prcntg_btw_10_29 == null ? "" : formatNumber(prcntg_btw_10_29));
	}
	public void setPrcntg_btw_10_29(String prcntg_btw_10_29) {
		this.prcntg_btw_10_29 = prcntg_btw_10_29;
	}
	public String getCnt_btw_30_49() {
		return (cnt_btw_30_49 == null ? "" : cnt_btw_30_49);
	}
	public void setCnt_btw_30_49(String cnt_btw_30_49) {
		this.cnt_btw_30_49 = cnt_btw_30_49;
	}
	public String getPrcntg_btw_30_49() {
		return (prcntg_btw_30_49 == null ? "" : formatNumber(prcntg_btw_30_49));
	}
	public void setPrcntg_btw_30_49(String prcntg_btw_30_49) {
		this.prcntg_btw_30_49 = prcntg_btw_30_49;
	}
	public String getCnt_btw_50_99() {
		return (cnt_btw_50_99 == null ? "" : cnt_btw_50_99);
	}
	public void setCnt_btw_50_99(String cnt_btw_50_99) {
		this.cnt_btw_50_99 = cnt_btw_50_99;
	}
	public String getPrcntg_btw_50_99() {
		return (prcntg_btw_50_99 == null ? "" : formatNumber(prcntg_btw_50_99));
	}
	public void setPrcntg_btw_50_99(String prcntg_btw_50_99) {
		this.prcntg_btw_50_99 = prcntg_btw_50_99;
	}
	public String getCnt_over_99() {
		return (cnt_over_99 == null ? "" : cnt_over_99);
	}
	public void setCnt_over_99(String cnt_over_99) {
		this.cnt_over_99 = cnt_over_99;
	}
	public String getPrcntg_over_99() {
		return (prcntg_over_99 == null ? "" : formatNumber(prcntg_over_99));
	}
	public void setPrcntg_over_99(String prcntg_over_99) {
		this.prcntg_over_99 = prcntg_over_99;
	}
	public String getTtl_cnt() {
		return (ttl_cnt == null ? "" : ttl_cnt);
	}
	public void setTtl_cnt(String ttl_cnt) {
		this.ttl_cnt = ttl_cnt;
	}
	public String getTotal_per() {
		return (total_per == null ? "" : formatNumber(total_per));
	}
	public void setTotal_per(String total_per) {
		this.total_per = total_per;
	}
	
	private String formatNumber(String val){
		DecimalFormat sf= new DecimalFormat("0.##");
		String retVal = val;
		try{
			retVal = sf.format(Double.parseDouble(val));
		}catch(Exception e){
			e.printStackTrace();
		}
		return retVal;
	}

}
