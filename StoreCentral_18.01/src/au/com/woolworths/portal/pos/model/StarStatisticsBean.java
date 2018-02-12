package au.com.woolworths.portal.pos.model;

public class StarStatisticsBean {
	private String description;
	private String value;
	private int ordinalValue;
	private boolean displayBold;
	public String getDescription() {
		return description;
	}
	public void setDescription(String description) {
		this.description = description;
	}
	public String getValue() {
		return value;
	}
	public void setValue(String value) {
		this.value = value;
	}
	public int getOrdinalValue() {
		return ordinalValue;
	}
	public void setOrdinalValue(int ordinalValue) {
		this.ordinalValue = ordinalValue;
	}
	public boolean isDisplayBold() {
		return displayBold;
	}
	public void setDisplayBold(boolean displayBold) {
		this.displayBold = displayBold;
	}
}
