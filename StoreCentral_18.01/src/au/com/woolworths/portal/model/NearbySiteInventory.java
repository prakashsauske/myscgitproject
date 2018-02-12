package au.com.woolworths.portal.model;

public class NearbySiteInventory {

	private String siteNo;
	private String siteName;
	private String distance;
	private int maxStores;

	public int getMaxStores() {
		return maxStores;
	}

	public void setMaxStores(int maxStores) {
		this.maxStores = maxStores;
	}

	public String getSiteName() {
		return siteName;
	}

	public void setSiteName(String siteName) {
		this.siteName = siteName;
	}

	public String getDistance() {
		return distance;
	}

	public void setDistance(String distance) {
		this.distance = distance;
	}

	private ArticleSalesView saleView;
	private ArticleSellPriceView salePriceView;
	private ArticlePurchasingView purchaseView;
	private ArticleSiteView siteView;

	private InventorySOHInfo sohView;
	private InventorySITInfo sitView;
	private InventorySOOInfo sooView;

	public InventorySITInfo getSitView() {
		return sitView;
	}

	public void setSitView(InventorySITInfo sitView) {
		this.sitView = sitView;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public ArticleSalesView getSaleView() {
		return saleView;
	}

	public void setSaleView(ArticleSalesView saleView) {
		this.saleView = saleView;
	}

	public ArticleSellPriceView getSalePriceView() {
		return salePriceView;
	}

	public void setSalePriceView(ArticleSellPriceView salePriceView) {
		this.salePriceView = salePriceView;
	}

	public ArticlePurchasingView getPurchaseView() {
		return purchaseView;
	}

	public void setPurchaseView(ArticlePurchasingView purchaseView) {
		this.purchaseView = purchaseView;
	}

	public ArticleSiteView getSiteView() {
		return siteView;
	}

	public void setSiteView(ArticleSiteView siteView) {
		this.siteView = siteView;
	}

	public InventorySOHInfo getSohView() {
		return sohView;
	}

	public void setSohView(InventorySOHInfo sohView) {
		this.sohView = sohView;
	}

	public InventorySOOInfo getSooView() {
		return sooView;
	}

	public void setSooView(InventorySOOInfo sooView) {
		this.sooView = sooView;
	}

}
