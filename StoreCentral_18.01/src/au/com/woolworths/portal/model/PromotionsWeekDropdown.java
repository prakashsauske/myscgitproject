package au.com.woolworths.portal.model;

public class PromotionsWeekDropdown {
	private String weekCode;
	private String weekDesc;
	private String title;

	public PromotionsWeekDropdown(String weekCode, String weekDesc, String title) {
		super();
		this.weekCode = weekCode;
		this.weekDesc = weekDesc;
		this.title = title;
	}

	public PromotionsWeekDropdown(String weekCode, String weekDesc) {
		// TODO Auto-generated constructor stub
		super();
		this.weekCode = weekCode;
		this.weekDesc = weekDesc;
	}

	public String getWeekCode() {
		return weekCode;
	}

	public void setWeekCode(String weekCode) {
		this.weekCode = weekCode;
	}

	public String getWeekDesc() {
		return weekDesc;
	}

	public void setWeekDesc(String weekDesc) {
		this.weekDesc = weekDesc;
	}

	public String getTitle() {
		return title;
	}

	public void setTitle(String title) {
		this.title = title;
	}

}
