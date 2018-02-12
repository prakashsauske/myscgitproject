package au.com.woolworths.portal.pos.model;


public class PaidInPaidOutGrpFtrAggrBean {
	private String tenderType;
	private double amount;
	public PaidInPaidOutGrpFtrAggrBean(String tenderType, double amount) {
		this.setTenderType(tenderType);
		this.setAmount(amount);
	}
	public String getTenderType() {
		return tenderType;
	}
	public void setTenderType(String tenderType) {
		this.tenderType = tenderType;
	}
	public double getAmount() {
		return amount;
	}
	public void setAmount(double amount) {
		this.amount = amount;
	}
}
