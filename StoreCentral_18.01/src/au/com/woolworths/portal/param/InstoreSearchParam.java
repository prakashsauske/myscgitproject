package au.com.woolworths.portal.param;


public class InstoreSearchParam {
   
	private String sr_article;
	private String sr_searchOption;
	private String sr_startDate;
	private String sr_endDate;
	private String sr_adType;
	
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
	private String records;
	private String rangedFlag;
	private String uom;
	private String ean;
	private String promoType;
	private String promoTypeInPast;
	private ArticleSearchParam articleSearchParam;
	
	public ArticleSearchParam getParam(){
		this.articleSearchParam.setArticleNo(this.getSr_article());
		this.articleSearchParam.setSearchByOptions(this.getSearchByOptions());
		return this.articleSearchParam;
	}
	
	public InstoreSearchParam() {
		
		this.articleSearchParam = new ArticleSearchParam();
	}

	/**
	 * @return the articleSearchParam
	 */
	public ArticleSearchParam getArticleSearchParam() {
		return getParam();
	}
	/**
	 * @param articleSearchParam the articleSearchParam to set
	 */
	public void setArticleSearchParam(ArticleSearchParam articleSearchParam) {
		this.articleSearchParam = articleSearchParam;
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
	 * @return the articleNo
	 */
	public String getArticleNo() {
		return articleNo;
	}
	/**
	 * @param articleNo the articleNo to set
	 */
	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}
	/**
	 * @return the articleDescrition
	 */
	public String getArticleDescrition() {
		return articleDescrition;
	}
	/**
	 * @param articleDescrition the articleDescrition to set
	 */
	public void setArticleDescrition(String articleDescrition) {
		this.articleDescrition = articleDescrition;
	}
	/**
	 * @return the searchByOptions
	 */
	public String getSearchByOptions() {
		return searchByOptions;
	}
	/**
	 * @param searchByOptions the searchByOptions to set
	 */
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
	/**
	 * @return the siteNo
	 */
	public String getSiteNo() {
		return siteNo;
	}
	/**
	 * @param siteNo the siteNo to set
	 */
	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}
	/**
	 * @return the option
	 */
	public String getOption() {
		return option;
	}
	/**
	 * @param option the option to set
	 */
	public void setOption(String option) {
		this.option = option;
	}
	/**
	 * @return the index
	 */
	public String getIndex() {
		return index;
	}
	/**
	 * @param index the index to set
	 */
	public void setIndex(String index) {
		this.index = index;
	}
	/**
	 * @return the saleOrg
	 */
	public String getSaleOrg() {
		return saleOrg;
	}
	/**
	 * @param saleOrg the saleOrg to set
	 */
	public void setSaleOrg(String saleOrg) {
		this.saleOrg = saleOrg;
	}
	/**
	 * @return the msg
	 */
	public String getMsg() {
		return msg;
	}
	/**
	 * @param msg the msg to set
	 */
	public void setMsg(String msg) {
		this.msg = msg;
	}
	/**
	 * @return the sos
	 */
	public String getSos() {
		return sos;
	}
	/**
	 * @param sos the sos to set
	 */
	public void setSos(String sos) {
		this.sos = sos;
	}
	/**
	 * @return the suppNo
	 */
	public String getSuppNo() {
		return suppNo;
	}
	/**
	 * @param suppNo the suppNo to set
	 */
	public void setSuppNo(String suppNo) {
		this.suppNo = suppNo;
	}
	/**
	 * @return the node
	 */
	public String getNode() {
		return node;
	}
	/**
	 * @param node the node to set
	 */
	public void setNode(String node) {
		this.node = node;
	}
	/**
	 * @return the nodeLvl
	 */
	public String getNodeLvl() {
		return nodeLvl;
	}
	/**
	 * @param nodeLvl the nodeLvl to set
	 */
	public void setNodeLvl(String nodeLvl) {
		this.nodeLvl = nodeLvl;
	}
	/**
	 * @return the pageNo
	 */
	public String getPageNo() {
		return pageNo;
	}
	/**
	 * @param pageNo the pageNo to set
	 */
	public void setPageNo(String pageNo) {
		this.pageNo = pageNo;
	}
	/**
	 * @return the rangedFlag
	 */
	public String getRangedFlag() {
		return rangedFlag;
	}
	/**
	 * @param rangedFlag the rangedFlag to set
	 */
	public void setRangedFlag(String rangedFlag) {
		this.rangedFlag = rangedFlag;
	}
	/**
	 * @return the uom
	 */
	public String getUom() {
		return uom;
	}
	/**
	 * @param uom the uom to set
	 */
	public void setUom(String uom) {
		this.uom = uom;
	}
	/**
	 * @return the ean
	 */
	public String getEan() {
		return ean;
	}
	/**
	 * @param ean the ean to set
	 */
	public void setEan(String ean) {
		this.ean = ean;
	}
	/**
	 * @return the sr_article
	 */
	public String getSr_article() {
		return sr_article;
	}
	/**
	 * @param sr_article the sr_article to set
	 */
	public void setSr_article(String sr_article) {
		this.sr_article = sr_article;
		this.setArticleNo(sr_article);
	}
	/**
	 * @return the sr_searchOption
	 */
	public String getSr_searchOption() {
		return sr_searchOption;
	}
	/**
	 * @param sr_searchOption the sr_searchOption to set
	 */
	public void setSr_searchOption(String sr_searchOption) {
		this.sr_searchOption = sr_searchOption;
		this.setSearchByOptions(sr_searchOption);
	}
	/**
	 * @return the sr_startDate
	 */
	public String getSr_startDate() {
		return sr_startDate;
	}
	/**
	 * @param sr_startDate the sr_startDate to set
	 */
	public void setSr_startDate(String sr_startDate) {
		this.sr_startDate = sr_startDate;
	}
	/**
	 * @return the sr_endDate
	 */
	public String getSr_endDate() {
		return sr_endDate;
	}
	/**
	 * @param sr_endDate the sr_endDate to set
	 */
	public void setSr_endDate(String sr_endDate) {
		this.sr_endDate = sr_endDate;
	}
	/**
	 * @return the sr_adType
	 */
	public String getSr_adType() {
		return sr_adType;
	}
	/**
	 * @param sr_adType the sr_adType to set
	 */
	public void setSr_adType(String sr_adType) {
		this.sr_adType = sr_adType;
	}

	/**
	 * @return the records
	 */
	public String getRecords() {
		return records;
	}

	/**
	 * @param records the records to set
	 */
	public void setRecords(String records) {
		this.records = records;
	}

	/**
	 * @return the promoType
	 */
	public String getPromoType() {
		return promoType;
	}

	/**
	 * @param promoType the promoType to set
	 */
	public void setPromoType(String promoType) {
		this.promoType = promoType;
	}

	/**
	 * @return the promoTypeInPast
	 */
	public String getPromoTypeInPast() {
		return promoTypeInPast;
	}

	/**
	 * @param promoTypeInPast the promoTypeInPast to set
	 */
	public void setPromoTypeInPast(String promoTypeInPast) {
		this.promoTypeInPast = promoTypeInPast;
	}
	
}
