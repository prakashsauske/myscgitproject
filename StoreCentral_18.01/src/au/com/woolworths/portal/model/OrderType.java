/**
 * 
 */
package au.com.woolworths.portal.model;

/**
 * @author xrca4
 * 
 */
public class OrderType {

	private String orderType;

	private String orderDescription;

	private String category;

	public String getOrderType() {
		return orderType;
	}

	public void setOrderType(String orderType) {
		this.orderType = orderType;
	}

	public String getOrderDescription() {
		return orderDescription;
	}

	public void setOrderDescription(String orderDescription) {
		this.orderDescription = orderDescription;
	}

	public String getCategory() {
		return category;
	}

	public void setCategory(String category) {
		this.category = category;
	}

	public OrderType(String orderType, String orderDescription) {

		this.orderDescription = orderDescription;
		this.orderType = orderType;
	}

}
