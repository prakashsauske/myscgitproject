package au.com.woolworths.portal.param;



import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class UsrInfoParam {

	@JsonProperty("user_id")
	private String user_id;

	@JsonProperty("pwd")
	private String pwd;

	@JsonProperty("site_no")
	private String site_no;

	@JsonProperty("encPassword")
	private String encPassword;
	
	@JsonProperty("notify_settings")
	private String notify_settings;
	
	public String getNotify_settings() {
		return notify_settings;
	}

	public void setNotify_settings(String notify_settings) {
		this.notify_settings = notify_settings;
	}

	public UsrInfoParam(String user_id,String pwd){
		this.user_id=user_id;
		this.pwd=pwd;
	}
	
	public UsrInfoParam(){
		
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public String getSite_no() {
		return site_no;
	}

	public void setSite_no(String site_no) {
		this.site_no = site_no;
	}

	public String getEncPassword() {
		return encPassword;
	}

	public void setEncPassword(String encPassword) {
		this.encPassword = encPassword;
	}

}
