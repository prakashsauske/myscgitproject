package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;


@JsonIgnoreProperties(ignoreUnknown = true)
public class POSConsolidationDtl implements Serializable, Cloneable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@JsonProperty("A0RPA_TCD")
	public void setTenderType2(String tenderType) {
		setTenderType( tenderType);
	}
	private String tenderType;
	
	@JsonProperty("A0RPA_TCD_T")
	public void setTenderTypeT2(String tenderTypeT) {
		setTenderTypeT( tenderTypeT);
	}
	private String tenderTypeT;
	
	@JsonProperty("A0RPA_FTG_T")
	public void setSttlIndicator2(String sttlIndicator) {
		setSttlIndicator( sttlIndicator);
	}
	private String sttlIndicator;
	
	@JsonProperty("A7YUV5W359XPVXP8SZWUPA0WLF")
	public void setSalesTender2(String salesTender) {
		setSalesTender( salesTender);
	}
	private String salesTender;

	@JsonProperty("A7YUV5W359XPW15Q3M36Y3FIM9")
	public void setTenderLoan2(String tenderLoan) {
		setTenderLoan( tenderLoan);
	}
	private String tenderLoan;

	@JsonProperty("A7YUV5W359XPW14H1NZ2IORF9F")
	public void setPaidIns2(String paidIns) {
		setPaidIns( paidIns);
	}
	private String paidIns;

	@JsonProperty("A7YUV5W359XPW15Q3UJJY5C4XV")
	public void setPaidOuts2(String paidOuts) {
		setPaidOuts( paidOuts);
	}
	private String paidOuts;

	@JsonProperty("A7YUV5W359XPW15Q423GV7DON6")
	public void setPickUps2(String pickUps) {
		setPickUps( pickUps);
	}
	private String pickUps;

	@JsonProperty("A7YUV5W359XPVXPBAODAQY2ADG")
	public void setExpectedFunds2(String expectedFunds) {
		setExpectedFunds( expectedFunds);
	}
	private String expectedFunds;
	
	@JsonProperty("A7YUV5W359XPXR0RVEKLZJ7WN5")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;
	
	@JsonProperty("A7YUV5W359XPXR0RVEKLZJ7WN5_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	@JsonProperty("B0ZI8KYVSWSJOUFMKF823USXS")
	public void setBorrowedFunds2(String borrowedFunds) {
		setBorrowedFunds(borrowedFunds);
	}
	private String borrowedFunds;
	
	@JsonProperty("A7YUV5W359XPW103CP0XVRVEO2")
	public void setOpeningLoan2(String openingLoan) {
		setOpeningLoan( openingLoan);
	}
	private String openingLoan;
	
	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber( posNumber);
	}
	private String posNumber;
	
	private String posNumberMap;
	
	private boolean grpLastRec;
	
	/**
	 * @return the posNumberMap
	 */
	public String getPosNumberMap() {
		return posNumberMap;
	}

	/**
	 * @param posNumberMap the posNumberMap to set
	 */
	public void setPosNumberMap(String posNumberMap) {
		this.posNumberMap = posNumberMap;
	}

	/**
	 * @return the tenderTypeT
	 */
	public String getTenderTypeT() {
		return tenderTypeT;
	}

	/**
	 * @param tenderTypeT the tenderTypeT to set
	 */
	public void setTenderTypeT(String tenderTypeT) {
		this.tenderTypeT = tenderTypeT;
	}

	/**
	 * @return the posNumber
	 */
	public String getPosNumber() {
		return posNumber;
	}

	/**
	 * @param posNumber the posNumber to set
	 */
	public void setPosNumber(String posNumber) {
		this.posNumber = posNumber;
	}

	/**
	 * @return the tenderType
	 */
	public String getTenderType() {
		return tenderType;
	}

	/**
	 * @param tenderType the tenderType to set
	 */
	public void setTenderType(String tenderType) {
		this.tenderType = tenderType;
	}

	/**
	 * @return the salesTender
	 */
	public String getSalesTender() {
		return salesTender;
	}

	/**
	 * @param salesTender the salesTender to set
	 */
	public void setSalesTender(String salesTender) {
		this.salesTender = salesTender;
	}

	/**
	 * @return the tenderLoan
	 */
	public String getTenderLoan() {
		return tenderLoan;
	}

	/**
	 * @param tenderLoan the tenderLoan to set
	 */
	public void setTenderLoan(String tenderLoan) {
		this.tenderLoan = tenderLoan;
	}

	/**
	 * @return the paidIns
	 */
	public String getPaidIns() {
		return paidIns;
	}

	/**
	 * @param paidIns the paidIns to set
	 */
	public void setPaidIns(String paidIns) {
		this.paidIns = paidIns;
	}

	/**
	 * @return the paidOuts
	 */
	public String getPaidOuts() {
		return paidOuts;
	}

	/**
	 * @param paidOuts the paidOuts to set
	 */
	public void setPaidOuts(String paidOuts) {
		this.paidOuts = paidOuts;
	}

	/**
	 * @return the pickUps
	 */
	public String getPickUps() {
		return pickUps;
	}

	/**
	 * @param pickUps the pickUps to set
	 */
	public void setPickUps(String pickUps) {
		this.pickUps = pickUps;
	}

	/**
	 * @return the expectedFunds
	 */
	public String getExpectedFunds() {
		return expectedFunds;
	}

	/**
	 * @param expectedFunds the expectedFunds to set
	 */
	public void setExpectedFunds(String expectedFunds) {
		this.expectedFunds = expectedFunds;
	}

	/**
	 * @return the tValue
	 */
	public String gettValue() {
		return tValue;
	}

	/**
	 * @param tValue the tValue to set
	 */
	public void settValue(String tValue) {
		this.tValue = tValue;
	}

	public String getNoDataFound() {
		return noDataFound;
	}

	public void setNoDataFound(String noDataFound) {
		this.noDataFound = noDataFound;
	}

	/**
	 * @return the openingLoan
	 */
	public String getOpeningLoan() {
		return openingLoan;
	}

	/**
	 * @param openingLoan the openingLoan to set
	 */
	public void setOpeningLoan(String openingLoan) {
		this.openingLoan = openingLoan;
	}

	public Object clone() {
		try {
			return super.clone();
		} catch (Exception e) {
			return null;
		}
	}

	public boolean isGrpLastRec() {
		return grpLastRec;
	}

	public void setGrpLastRec(boolean grpLastRec) {
		this.grpLastRec = grpLastRec;
	}

	public String getSttlIndicator() {
		return sttlIndicator;
	}

	public void setSttlIndicator(String sttlIndicator) {
		this.sttlIndicator = sttlIndicator;
	}
	/**
	 * @return the borrowedFunds
	 */
	public String getBorrowedFunds() {
		return borrowedFunds;
	}

	/**
	 * @param borrowedFunds the borrowedFunds to set
	 */
	public void setBorrowedFunds(String borrowedFunds) {
		this.borrowedFunds = borrowedFunds;
	}
		}
