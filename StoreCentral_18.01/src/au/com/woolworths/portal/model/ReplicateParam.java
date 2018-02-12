package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ReplicateParam {

	
	@JsonProperty("fromSite")
	private String fromSite;
	
	@JsonProperty("fromSorg")
	private String fromSorg;
	
	@JsonProperty("toSite")
	private String toSite;
	
	@JsonProperty("toSorg")
	private String toSorg;
	
	@JsonProperty("includeFlag")
	private String includeFlag;
	
	@JsonProperty("excludeFlag")
	private String excludeFlag;
	
	@JsonProperty("msg")
	private String msg;
	
	@JsonProperty("type")
	private String type;
	
	@JsonProperty("storeslist")
	private String storeslist;
	
	@JsonProperty("results")
	private ArrayList<ActivityOptions> results;
	
	@JsonProperty("verifiedStores")
	private ArrayList<SiteDtls> verifiedStores;
	
	@JsonProperty("queryList")
	private ArrayList<String> queryList;
	
	
	public ArrayList<SiteDtls> getVerifiedStores() {
		return verifiedStores;
	}

	public void setVerifiedStores(ArrayList<SiteDtls> verifiedStores) {
		this.verifiedStores = verifiedStores;
	}

	public String getStoreslist() {
		return storeslist;
	}

	public void setStoreslist(String storeslist) {
		this.storeslist = storeslist;
	}

	public ArrayList<String> getQueryList() {
		return queryList;
	}

	public void setQueryList(ArrayList<String> queryList) {
		this.queryList = queryList;
	}

	public String getFromSorg() {
		return fromSorg;
	}

	public void setFromSorg(String fromSorg) {
		this.fromSorg = fromSorg;
	}

	public String getToSorg() {
		return toSorg;
	}

	public void setToSorg(String toSorg) {
		this.toSorg = toSorg;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getType() {
		return type;
	}

	public void setType(String type) {
		this.type = type;
	}

	public ArrayList<ActivityOptions> getResults() {
		return results;
	}

	public void setResults(ArrayList<ActivityOptions> results) {
		this.results = results;
	}

	public String getFromSite() {
		return fromSite;
	}

	public void setFromSite(String fromSite) {
		this.fromSite = fromSite;
	}

	public String getToSite() {
		return toSite;
	}

	public void setToSite(String toSite) {
		this.toSite = toSite;
	}

	public String getIncludeFlag() {
		return includeFlag;
	}

	public void setIncludeFlag(String includeFlag) {
		this.includeFlag = includeFlag;
	}

	public String getExcludeFlag() {
		return excludeFlag;
	}

	public void setExcludeFlag(String excludeFlag) {
		this.excludeFlag = excludeFlag;
	}

}