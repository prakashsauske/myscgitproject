package au.com.woolworths.portal.pos.model;

/**
 * 
 * @author xsvm1
 * 
 *         Do not use this class in searching object from hash or list data
 *         structures. It would have side effect on the list or hash data. It is
 *         not recommended for search.
 * 
 */

public class POSConsolidationAggrBean {
	private String tenderTypeT;
	private double openingLoan;
	private double salesTender;
	private double tenderLoan;
	private double borrowedFunds;
	private double paidIns;
	private double paidOuts;
	private double pickUps;
	private double expectedFunds;

	public POSConsolidationAggrBean() {
	}

	public POSConsolidationAggrBean(String tenderTypeT, double openingLoan,
			double salesTender, double tenderLoan, double borrowedFunds,
			double paidIns, double paidOuts, double pickUps,
			double expectedFunds) {
		this.tenderTypeT = tenderTypeT;
		
		this.openingLoan += openingLoan;
		this.salesTender += salesTender;
		this.tenderLoan += tenderLoan;
		this.borrowedFunds += borrowedFunds;

		this.paidIns += paidIns;
		this.paidOuts += paidOuts;
		this.pickUps += pickUps;
		this.expectedFunds += expectedFunds;
	}

	public String getTenderTypeT() {
		return tenderTypeT;
	}

	public void setTenderTypeT(String tenderTypeT) {
		this.tenderTypeT = tenderTypeT;
	}

	public double getOpeningLoan() {
		return openingLoan;
	}

	public void setOpeningLoan(double openingLoan) {
		this.openingLoan = openingLoan;
	}

	public double getSalesTender() {
		return salesTender;
	}

	public void setSalesTender(double salesTender) {
		this.salesTender = salesTender;
	}

	public double getTenderLoan() {
		return tenderLoan;
	}

	public void setTenderLoan(double tenderLoan) {
		this.tenderLoan = tenderLoan;
	}

	public double getPaidIns() {
		return paidIns;
	}

	public void setPaidIns(double paidIns) {
		this.paidIns = paidIns;
	}

	public double getPaidOuts() {
		return paidOuts;
	}

	public void setPaidOuts(double paidOuts) {
		this.paidOuts = paidOuts;
	}

	public double getPickUps() {
		return pickUps;
	}

	public void setPickUps(double pickUps) {
		this.pickUps = pickUps;
	}

	public double getExpectedFunds() {
		return expectedFunds;
	}

	public void setExpectedFunds(double expectedFunds) {
		this.expectedFunds = expectedFunds;
	}

	public double getBorrowedFunds() {
		return borrowedFunds;
	}

	public void setBorrowedFunds(double borrowedFunds) {
		this.borrowedFunds = borrowedFunds;
	}

	@Override
	public int hashCode() {
		return this.getTenderTypeT().hashCode();
	}

	@Override
	public boolean equals(Object obj) {
		POSConsolidationAggrBean tmpObj = (POSConsolidationAggrBean) obj;
		if ((this.getTenderTypeT() == tmpObj.getTenderTypeT())
				|| (this.getTenderTypeT() != null && this.getTenderTypeT()
						.equals(tmpObj.getTenderTypeT()))) {
			tmpObj.openingLoan += this.openingLoan;
			tmpObj.salesTender += this.salesTender;
			tmpObj.tenderLoan += this.tenderLoan;
			tmpObj.borrowedFunds += this.borrowedFunds;
			tmpObj.paidIns += this.paidIns;
			tmpObj.paidOuts += this.paidOuts;
			tmpObj.pickUps += this.pickUps;
			tmpObj.expectedFunds += this.expectedFunds;
			return true;
		}
		return false;
	}
}
