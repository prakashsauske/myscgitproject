package au.com.woolworths.portal.reports;

import java.util.Map;

import net.sf.jasperreports.engine.data.JRBeanCollectionDataSource;

public class JasperParamsBean {
	private String reportName;
	private JRBeanCollectionDataSource beanDs;
	private Map<String, Object> reportInputParams;
	private int ordinalVal;
	
	
	public JasperParamsBean() {
	}
	public JasperParamsBean(String reportName, JRBeanCollectionDataSource beanDs, Map<String, Object> reportInputParams, int ordinalVal) {
		this.reportName = reportName;
		this.beanDs = beanDs;
		this.reportInputParams = reportInputParams;
		this.ordinalVal = ordinalVal;
	}
	public String getReportName() {
		return reportName;
	}
	public void setReportName(String reportName) {
		this.reportName = reportName;
	}
	public JRBeanCollectionDataSource getBeanDs() {
		return beanDs;
	}
	public void setBeanDs(JRBeanCollectionDataSource beanDs) {
		this.beanDs = beanDs;
	}
	public Map<String, Object> getReportInputParams() {
		return reportInputParams;
	}
	public void setReportInputParams(Map<String, Object> reportInputParams) {
		this.reportInputParams = reportInputParams;
	}
	public int getOrdinalVal() {
		return ordinalVal;
	}
	public void setOrdinalVal(int ordinalVal) {
		this.ordinalVal = ordinalVal;
	}
}
