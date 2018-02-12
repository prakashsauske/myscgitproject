package au.com.woolworths.portal.model;

public class PlannerMeatDailyReport {

	private String plu;
	
	public String getPlu() {
		return plu;
	}

	public void setPlu(String plu) {
		this.plu = plu;
	}

	public String getArticle() {
		return article;
	}

	public void setArticle(String article) {
		this.article = article;
	}

	public String getDescription() {
		return description;
	}

	public void setDescription(String description) {
		this.description = description;
	}

	public String getTray() {
		return tray;
	}

	public void setTray(String tray) {
		this.tray = tray;
	}

	public String getSoh() {
		return soh;
	}

	public void setSoh(String soh) {
		this.soh = soh;
	}

	public String getPromo() {
		return promo;
	}

	public void setPromo(String promo) {
		this.promo = promo;
	}

	public String getQwin() {
		return qwin;
	}

	public void setQwin(String qwin) {
		this.qwin = qwin;
	}

	public String getMpl() {
		return mpl;
	}

	public void setMpl(String mpl) {
		this.mpl = mpl;
	}

	public String getCut3() {
		return cut3;
	}

	public void setCut3(String cut3) {
		this.cut3 = cut3;
	}

	public String getpReq() {
		return pReq;
	}

	public void setpReq(String pReq) {
		this.pReq = pReq;
	}

	public String getOpCut() {
		return opCut;
	}

	public void setOpCut(String opCut) {
		this.opCut = opCut;
	}

	public String getCut2() {
		return cut2;
	}

	public void setCut2(String cut2) {
		this.cut2 = cut2;
	}

	public String getPlannReq() {
		return plannReq;
	}

	public void setPlannReq(String plannReq) {
		this.plannReq = plannReq;
	}

	private String article;
	
	private String description;
	
	private String tray;
	
	private String soh;
	
	private String promo;
	
	private String qwin;
	
	private String mpl;
	
	private String cut3;
	
	private String pReq;
	
	private String opCut;
	
	private String cut2;
	
	private String plannReq;
	
	public PlannerMeatDailyReport(){
		this.plu = "";
		this.article="";
		this.description = "";
		this.tray = "";
		this.soh = "";
		this.promo = "";
		this.qwin = "";
		this.mpl = "";
		this.cut3 = "";
		this.pReq = "";
		this.opCut = "";
		this.cut2 = "";
		this.plannReq = "";
	}
	
	
}
