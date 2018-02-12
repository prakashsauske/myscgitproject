package au.com.woolworths.portal.model;


public class RoleProfileDtl {
	private String code;

	private String desc;
	
	private String salesOrg;

	public RoleProfileDtl() {

	}

	public RoleProfileDtl(String code, String desc,String salesOrg) {
		super();
		this.code = code;
		this.desc = desc;
		this.salesOrg=salesOrg;
	}

	public String getCode() {
		return code;
	}

	public void setCode(String code) {
		this.code = code;
	}

	public String getDesc() {
		return desc;
	}

	public void setDesc(String desc) {
		this.desc = desc;
	}

	/**
	 * @return the salesOrg
	 */
	public String getSalesOrg() {
		return salesOrg;
	}

	/**
	 * @param salesOrg the salesOrg to set
	 */
	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

}
