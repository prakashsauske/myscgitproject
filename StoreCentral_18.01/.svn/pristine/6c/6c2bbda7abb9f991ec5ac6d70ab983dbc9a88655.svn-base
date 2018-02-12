package au.com.woolworths.portal.param;

import java.util.List;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.OrderItemInfo;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderHdrInfoParam {

	@JsonProperty("user_id")
	private String user_id;

	@JsonProperty("pwd")
	private String pwd;

	@JsonProperty("site_no")
	private String site_no;

	@JsonProperty("msg")
	private String msg;

	@JsonProperty("typ")
	private String typ;

	@JsonProperty("po_no")
	private String po_no;

	@JsonProperty("preq_no")
	private String preq_no;

	@JsonProperty("article_list_info")
	private List<OrderItemInfo> article_list_info;

	public OrderHdrInfoParam() {

	}

	public OrderHdrInfoParam(String user_id, String pwd, String site_no,
			String msg, String typ, List<OrderItemInfo> article_list_info) {
		super();
		this.user_id = user_id;
		this.pwd = pwd;
		this.site_no = site_no;
		this.msg = msg;
		this.typ = typ;
		this.article_list_info = article_list_info;
	}

	public String getUser_id() {
		return user_id;
	}

	public void setUser_id(String user_id) {
		this.user_id = user_id;
	}

	public String getSite_no() {
		return site_no;
	}

	public void setSite_no(String site_no) {
		this.site_no = site_no;
	}

	public String getPwd() {
		return pwd;
	}

	public void setPwd(String pwd) {
		this.pwd = pwd;
	}

	public List<OrderItemInfo> getArticle_list_info() {
		return article_list_info;
	}

	public void setArticle_list_info(List<OrderItemInfo> article_list_info) {
		this.article_list_info = article_list_info;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public String getTyp() {
		return typ;
	}

	public void setTyp(String typ) {
		this.typ = typ;
	}

	public String getPo_no() {
		return po_no;
	}

	public void setPo_no(String po_no) {
		this.po_no = po_no;
	}

	public String getPreq_no() {
		return preq_no;
	}

	public void setPreq_no(String preq_no) {
		this.preq_no = preq_no;
	}

}
