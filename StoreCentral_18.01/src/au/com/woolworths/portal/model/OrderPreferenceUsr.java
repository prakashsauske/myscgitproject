package au.com.woolworths.portal.model;

public class OrderPreferenceUsr {
	private String orderType;
	private String lableId;

	public OrderPreferenceUsr(String orderType, String lableId) {
		super();
		this.orderType = orderType;
		this.lableId = lableId;
	}

	public OrderPreferenceUsr() {

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

}
