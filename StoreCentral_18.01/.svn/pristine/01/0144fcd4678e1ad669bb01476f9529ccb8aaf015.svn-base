package au.com.woolworths.portal.model;

public class SalesOrgModel {

	private String salesOrgNO;

	private String salesOrgName;

	private String checked = "N";

	public SalesOrgModel(String salesOrgNO, String salesOrgName) {
		super();
		this.salesOrgNO = salesOrgNO;
		this.salesOrgName = salesOrgName;
	}

	public String getSalesOrgNO() {
		return salesOrgNO;
	}

	public void setSalesOrgNO(String salesOrgNO) {
		this.salesOrgNO = salesOrgNO;
	}

	public String getSalesOrgName() {
		return salesOrgName;
	}

	public void setSalesOrgName(String salesOrgName) {
		this.salesOrgName = salesOrgName;
	}

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	@Override
	public boolean equals(Object obj) {
		SalesOrgModel org = (SalesOrgModel) obj;
		return this.salesOrgNO.equals(org.getSalesOrgNO());
	}

}
