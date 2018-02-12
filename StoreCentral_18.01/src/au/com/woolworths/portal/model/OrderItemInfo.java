/**
 * 
 */
package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

/**
 * @author xmrah
 * 
 */
@JsonIgnoreProperties(ignoreUnknown = true)
public class OrderItemInfo {

	@JsonProperty("article_type")
	private String article_type;

	@JsonProperty("preq_type")
	private String preq_type;

	@JsonProperty("po_type")
	private String po_type;

	@JsonProperty("item_no")
	private String item_no;

	@JsonProperty("article_no")
	private String article_no;

	@JsonProperty("article_uom")
	private String article_uom;

	@JsonProperty("qty")
	private String qty;

	@JsonProperty("action_flag")
	private String action_flag;

	@JsonProperty("supplier")
	private String supplier;

	@JsonProperty("delvery_date")
	private String delvery_date;

	@JsonProperty("roaster_date")
	private String roaster_date;

	public OrderItemInfo() {

	}

	public OrderItemInfo(String article_type, String preq_type, String po_type,
			String article_no, String article_uom, String qty,
			String action_flag) {
		super();
		this.article_type = article_type;
		this.preq_type = preq_type;
		this.po_type = po_type;
		this.article_no = article_no;
		this.article_uom = article_uom;
		this.qty = qty;
		this.action_flag = action_flag;
	}

	public String getArticle_type() {
		return article_type;
	}

	public void setArticle_type(String article_type) {
		this.article_type = article_type;
	}

	public String getPreq_type() {
		return preq_type;
	}

	public void setPreq_type(String preq_type) {
		this.preq_type = preq_type;
	}

	public String getPo_type() {
		return po_type;
	}

	public void setPo_type(String po_type) {
		this.po_type = po_type;
	}

	public String getArticle_no() {
		return article_no;
	}

	public void setArticle_no(String article_no) {
		this.article_no = article_no;
	}

	public String getQty() {
		return qty;
	}

	public void setQty(String qty) {
		this.qty = qty;
	}

	public String getArticle_uom() {
		return article_uom;
	}

	public void setArticle_uom(String article_uom) {
		this.article_uom = article_uom;
	}

	public String getAction_flag() {
		return action_flag;
	}

	public void setAction_flag(String action_flag) {
		this.action_flag = action_flag;
	}

	public String getSupplier() {
		return supplier;
	}

	public void setSupplier(String supplier) {
		this.supplier = supplier;
	}

	public String getDelvery_date() {
		return delvery_date;
	}

	public void setDelvery_date(String delvery_date) {
		this.delvery_date = delvery_date;
	}

	public String getRoaster_date() {
		return roaster_date;
	}

	public void setRoaster_date(String roaster_date) {
		this.roaster_date = roaster_date;
	}

	public String getItem_no() {
		return item_no;
	}

	public void setItem_no(String item_no) {
		this.item_no = item_no;
	}

}