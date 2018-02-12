package au.com.woolworths.portal.param;

public class ArticleSearchParam {

	public ArticleSearchParam(String siteNo, String saleOrg,
			String searchByOptions, String articleNo) {
		super();
		this.articleNo = articleNo;
		// this.searchByOptions = searchByOptions;
		if (searchByOptions != null
				&& searchByOptions.equalsIgnoreCase("Description")) {
			this.articleDescrition = this.articleNo;
			this.articleNo = "";
		} else if (searchByOptions != null
				&& searchByOptions.equalsIgnoreCase("EAN")
				|| searchByOptions.equalsIgnoreCase("reference")) {
			this.ean = this.articleNo;
			this.articleNo = "";
		}
		this.siteNo = siteNo;
		this.saleOrg = saleOrg;
	}

	public ArticleSearchParam() {

	}
	private String linkFlag;
	private String articleNo;
	private String articleDescrition;
	private String searchByOptions;
	private String siteNo;
	private String option;
	private String index;
	private String saleOrg;
	private String msg;

	private String sos;
	private String suppNo;
	private String node;
	private String nodeLvl;
	private String pageNo;
	private String recCnt;
	private String rangedFlag;
	private String uom;
	private String srcSupplyInd;
	private String orderUom;

	private String ean;

	private String autoStockRFlag;
	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getSearchByOptions() {
		return searchByOptions;
	}

	public void setSearchByOptions(String searchByOptions) {
		if (searchByOptions.equalsIgnoreCase("Description")) {
			this.articleDescrition = this.articleNo;
			this.articleNo = "";
		} else if (searchByOptions.equalsIgnoreCase("EAN")
				|| searchByOptions.equalsIgnoreCase("reference")) {
			this.ean = this.articleNo;
			this.articleNo = "";
		}
		this.searchByOptions = searchByOptions;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getOption() {
		return option;
	}

	public void setOption(String option) {
		this.option = option;
	}

	public String getIndex() {
		return index;
	}

	public String getMsg() {
		return msg;
	}

	public void setMsg(String msg) {
		this.msg = msg;
	}

	public void setIndex(String index) {
		this.index = index;
	}

	public String getArticleDescrition() {
		return articleDescrition;
	}

	public void setArticleDescrition(String articleDescrition) {
		this.articleDescrition = articleDescrition;
	}

	public String getSaleOrg() {
		return saleOrg;
	}

	public void setSaleOrg(String saleOrg) {
		this.saleOrg = saleOrg;
	}

	public String getSos() {
		return sos;
	}

	public void setSos(String sos) {
		this.sos = sos;
	}

	public String getSuppNo() {
		return suppNo;
	}

	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getNodeLvl() {
		return nodeLvl;
	}

	public void setNodeLvl(String nodeLvl) {
		this.nodeLvl = nodeLvl;
	}

	public String getPageNo() {
		return pageNo;
	}

	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}

	public String getRecCnt() {
		return recCnt;
	}

	public void setRecCnt(String recCnt) {
		this.recCnt = recCnt;
	}

	public String getRangedFlag() {
		return rangedFlag;
	}

	public void setRangedFlag(String rangedFlag) {
		this.rangedFlag = rangedFlag;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

	public String getEan() {
		return ean;
	}

	public void setEan(String ean) {
		this.ean = ean;
	}

	/**
	 * @return the linkFlag
	 */
	public String getLinkFlag() {
		return linkFlag;
	}

	/**
	 * @param linkFlag the linkFlag to set
	 */
	public void setLinkFlag(String linkFlag) {
		this.linkFlag = linkFlag;
	}

	/**
	 * @return the srcSupplyInd
	 */
	public String getSrcSupplyInd() {
		return srcSupplyInd;
	}

	/**
	 * @param srcSupplyInd the srcSupplyInd to set
	 */
	public void setSrcSupplyInd(String srcSupplyInd) {
		this.srcSupplyInd = srcSupplyInd;
	}

	/**
	 * @return the orderUom
	 */
	public String getOrderUom() {
		return orderUom;
	}

	/**
	 * @param orderUom the orderUom to set
	 */
	public void setOrderUom(String orderUom) {
		this.orderUom = orderUom;
	}

	public String getAutoStockRFlag() {
		return autoStockRFlag;
	}

	public void setAutoStockRFlag(String autoStockRFlag) {
		this.autoStockRFlag = autoStockRFlag;
	}

}
