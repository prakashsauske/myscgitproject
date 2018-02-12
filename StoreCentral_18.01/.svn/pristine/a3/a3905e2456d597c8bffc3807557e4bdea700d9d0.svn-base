function ArticleSearchParam(aritcleText) {

	if (aritcleText != '' && aritcleText != undefined && aritcleText != null) {
		if (isNaN(aritcleText)) {
			this.iv_desc = "Y";
			this.iv_article_no = "";
			this.iv_gtin = "";
		} else {
			if (aritcleText.length < 7) {
				this.iv_desc = "";
				this.iv_article_no = "Y";
				this.iv_gtin = "";
			} else {
				this.iv_desc = "";
				this.iv_article_no = '';
				this.iv_gtin = "Y";
			}
		}
	}
	this.iv_article = aritcleText;
	this.iv_sales_org = loggedInSalesOrg;
	this.iv_supplier = "";
	this.iv_src_supply = "";
	this.iv_ranged = "Y";
	this.iv_session_id = "";
	this.iv_barcode = "";
	this.iv_site = loggedInSiteNo;
	this.iv_node_id = "";
	this.iv_node_level = "";
	this.iv_barcode_flag = "";
	this.iv_prime_vendor="";
	this.iv_uom_flag="N";
	this.iv_delisted_flag= "N";
	this.iv_deleted_flag=  "N";
}
function IBTArticleParam(userId, orderType, supplier, draft_type) {

	this.iv_user_id = userId;
	this.iv_session_id = sessionId;
	this.iv_draft_type = draft_type;
	this.iv_order_type = orderType;
	this.iv_supplier = supplier;
	this.iv_sales_org = loggedInSalesOrg;
}

function IBTCreateHdr(param) {
	
	/*
	 * if (today != '' && today != undefined && today.split('/').length > 1)
	 * this.IV_DEL_DATE = today.split('/')[1] +'/'+ today.split('/')[0] +'/'+ +
	 * today.split('/')[2]; else this.IV_DEL_DATE = '';
	 * 
	 * this.IV_DOC_DATE = ''; this.IV_DOC_SITE = param.supplier;
	 * this.IV_DOC_TYPE = ibtOrderType; this.IV_DOC_VENDOR = loggedInSiteNo;
	 * this.IV_MSG = ''; this.IV_PO_NO = ''; this.IV_PREQ_NO = '';
	 * this.IV_PR_TYPE = ''; this.IV_REL_DATE = ''; this.IV_ROSTER_DATE = '';
	 * this.IV_SAP =sap_user; this.IV_SITE = loggedInSiteNo; this.IV_TEST = '';
	 * this.IV_TYP = ''; this.IV_USER_NAME = loggedInUserId; this.IV_VENDOR =
	 * ''; this.ITEM_INFO = param.itemList;
	 */

	  this.IV_SAP = encSapPwd;
	  this.IV_SITE = loggedInSiteNo;
	  this.IV_USER_NAME = loggedInUserId;	
	  this.ITEM_INFO = param.itemList;
	
}

function IBTCreateItem(param) {
	this.IV_ARTICLE = param.article;
	this.IV_UOM = (param.new_uom !=null && param.new_uom !='' && param.new_uom !=undefined) ?param.new_uom:param.article_uom;
	this.IV_DOC_TYPE = ibtOrderType;
	this.IV_QUANTITY = param.qty;
	this.IV_FLAG = 'I';
	this.IV_ITEM_CAT = '';
	this.IV_ITEM_NO = '';
	this.IV_PO_NO = '';
	this.IV_PREQ_NO = '';
	this.IV_PR_TYPE = '';
	this.IV_RECEVING_SITE = '';
	this.IV_RETURNS = '';
	this.IV_SITE = '';
	this.IV_SUPPLYING_SITE = '';
	if (today != '' && today != undefined && today.split('/').length > 1)
		this.IV_DEL_DATE = today.split('/')[1] +'/'+ today.split('/')[0] +'/'+ 
				+ today.split('/')[2];
	else
		this.IV_DEL_DATE = '';
	
	this.IV_DOC_DATE = '';
	this.IV_DOC_SITE = param.supplier;
	this.IV_DOC_TYPE = ibtOrderType;
	this.IV_DOC_VENDOR = loggedInSiteNo;
	this.IV_MSG = '';
	this.IV_PO_NO = '';
	this.IV_PREQ_NO = '';
	this.IV_PR_TYPE = '';
	this.IV_REL_DATE = '';
	this.IV_ROSTER_DATE = '';

}
function OrderHdrInfo(msg,pwd,site_no,typ,user_id,article_list_info,preq_no,po_no,alh_flag,supplier_flag, iv_return, iv_exclude_rc_check)
{
	  this.msg = msg;
	  this.pwd = pwd;
	  this.site_no = site_no;
	  this.alh_flag = (alh_flag||'');
	  this.typ = typ;
	  this.user_id = user_id;
	  this.article_list_info=article_list_info;
	  this.preq_no = preq_no;
	  this.po_no=po_no;
	  this.supplier_flag = supplier_flag;	 
	  this.iv_return = iv_return;
	  this.iv_exclude_rc_check = iv_exclude_rc_check;
}
function OrderItemInfoForGL(roster_name,purchase_group,greenlife_flag,cost_price,cost_price_currency,base_uom,action_flag,article_no,article_type,article_uom,delvery_date,po_type,preq_type,preq_req,qty,roaster_date,supplier,random_weight,random_weight_uom,random_wgt_flg,pi_om)
{
	this.action_flag = action_flag;
     this.article_no = article_no;
     this.article_type = article_type;
     this.article_uom = article_uom;
     this.delvery_date = delvery_date;
     this.po_type = po_type;
     this.preq_type = preq_type;
     this.preq_req=preq_req;
     this.qty = qty;
     this.roaster_date = roaster_date;
     this.supplier = supplier;
     this.random_weight = random_weight;
     this.random_weight_uom= random_weight_uom;
     this.base_uom= base_uom;
     this.price_unit = base_uom;
     this.random_wgt_flg= random_wgt_flg;
     this.pi_om= pi_om;
     this.greenlife_flag = greenlife_flag;
     this.cost_price = cost_price;
     this.currency = cost_price_currency;
     this.cost_price_currency =cost_price_currency ;
     this.roster_name =roster_name ;
     this.purchase_group =purchase_group;
}
function OrderItemInfo(action_flag,article_no,article_type,article_uom,delvery_date,po_type,preq_type,preq_req,qty,roaster_date,supplier,random_weight,random_weight_uom,base_uom,random_wgt_flg,pi_om,cost_price,sub_category_no)
{
	this.action_flag = action_flag;
     this.article_no = article_no;
     this.article_type = article_type;
     this.article_uom = article_uom;
     this.delvery_date = delvery_date;
     this.po_type = po_type;
     this.preq_type = preq_type;
     this.preq_req=preq_req;
     this.qty = qty;
     this.roaster_date = roaster_date;
     this.supplier = supplier;
     this.random_weight = random_weight;
     this.random_weight_uom= random_weight_uom;
     this.base_uom= base_uom;
     this.random_wgt_flg= random_wgt_flg;
     this.pi_om= pi_om;
     this.cost_price= cost_price||'';
     this.sub_category_no = sub_category_no;
};