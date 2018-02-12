package au.com.woolworths.portal.model;

public class OrderPreferenceMaster {

	private String orderType;
	private String lableId;
	private String lableDesc;

	public OrderPreferenceMaster(String orderType, String lableId,
			String lableDesc) {
		super();
		this.orderType = orderType;
		this.lableId = lableId;
		this.lableDesc = lableDesc;
	}

	public OrderPreferenceMaster() {

	}

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getLableId() {
		return lableId;
	}

	public void setLableId(String lableId) {
		this.lableId = lableId;
	}

	public String getLableDesc() {
		return lableDesc;
	}

	public void setLableDesc(String lableDesc) {
		this.lableDesc = lableDesc;
	}

}
