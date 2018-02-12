package au.com.woolworths.portal.pos.model;

import java.util.List;

public class StarStoreIndividualBean {
	private String jasperName;
	private int ordinalValue;
	private List<?> reportData;
	private boolean displayHeading;
	private String msg;
	public String getJasperName() {
		return jasperName;
	}
	public List<?> getReportData() {
		return reportData;
	}
	@SuppressWarnings("unchecked")
	public <T> List<T> getTypeCastedListData(Class<T> clz) {
		List<T> tmp = null;
		if(reportData!=null && reportData.size()>0) {
			Object o = reportData.get(0);
			if(clz == o.getClass()) {
				tmp = (List<T>) reportData;
			}
		}
		return tmp;
	}

	public void setJasperName(String jasperName) {
		this.jasperName = jasperName;
	}
	public void setReportData(List<?> reportData) {
		this.reportData = reportData;
	}
	public int getOrdinalValue() {
		return ordinalValue;
	}
	public void setOrdinalValue(int ordinalValue) {
		this.ordinalValue = ordinalValue;
	}
	public boolean isDisplayHeading() {
		return displayHeading;
	}
	public void setDisplayHeading(boolean displayHeading) {
		this.displayHeading = displayHeading;
	}
	public String getMsg() {
		return msg;
	}
	public void setMsg(String msg) {
		this.msg = msg;
	}
}
