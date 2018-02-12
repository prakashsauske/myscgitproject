package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SCOSalesSummaryDTL implements Serializable {

	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@JsonProperty("A0RPA_WID")
	public void setPosNumber2(String posNumber) {
		setPosNumber(posNumber);
	}

	private String posNumber;

	@JsonProperty("RPOSTYP")
	public void setPosType2(String posType) {
		setPosType(posType);
	}

	private String posType;

	@JsonProperty("A7YUV5W359XPXNXL44QATSBNR4")
	public void setOtherTenderTransaction2(String otherTenderTransaction) {
		setOtherTenderTransaction(otherTenderTransaction);
	}

	private String otherTenderTransaction;

	@JsonProperty("A7YUV5W359XPXNXL44QAUEYD4W")
	public void setOfeftTransaction2(String ofeftTransaction) {
		setOfeftTransaction(ofeftTransaction);
	}

	private String ofeftTransaction;

	@JsonProperty("A7YUV5W359XPXNXL44QAV02N0G")
	public void setCashTransaction2(String cashTransaction) {
		setCashTransaction(cashTransaction);
	}

	private String cashTransaction;

	@JsonProperty("A7YUV5W359XPXNXL44QAVLC6IO")
	public void setAvgTransacSize2(String avgTransacSize) {
		setAvgTransacSize(avgTransacSize);
	}

	private String avgTransacSize;

	@JsonProperty("A7YUV5W359XPXNXL44QAVW2GOW")
	public void setAvgSalesPerTransac2(String avgSalesPerTransac) {
		setAvgSalesPerTransac(avgSalesPerTransac);
		setDeferedLoyalty(avgSalesPerTransac);// remove this
	}

	private String avgSalesPerTransac;

	@JsonProperty("A7YUV5W359XPXNXL44QAW6UI2O")
	public void setNetSalesTaxExcl2(String netSalesTaxExcl) {
		setNetSalesTaxExcl(netSalesTaxExcl);
	}

	private String netSalesTaxExcl;

	@JsonProperty("A7YUV5W359XPVXN6UPNZT1R9C1")
	public void setTransactionCount2(String transactionCount) {
		setTransactionCount(transactionCount);
	}

	private String transactionCount;

	@JsonProperty("A7YUV5W359XPVXN6UPNZTJWFEP")
	public void setItemSoldCount2(String itemSoldCount) {
		setItemSoldCount(itemSoldCount);
	}

	private String itemSoldCount;

	@JsonProperty("A7YUV5W359XPVXN6UPNZTJWFEP_DEFLYL")
	public void setDeferedLoyalty2(String deferedLoyalty) {
		// setDeferedLoyalty( deferedLoyalty);
	}

	private String deferedLoyalty;

	/**
	 * @return the posNumber
	 */
	public String getPosNumber() {
		return posNumber;
	}

	/**
	 * @param posNumber
	 *            the posNumber to set
	 */
	public void setPosNumber(String posNumber) {
		this.posNumber = posNumber;
	}

	/**
	 * @return the posType
	 */
	public String getPosType() {
		return posType;
	}

	/**
	 * @param posType
	 *            the posType to set
	 */
	public void setPosType(String posType) {
		this.posType = posType;
	}

	/**
	 * @return the otherTenderTransaction
	 */
	public String getOtherTenderTransaction() {
		return otherTenderTransaction;
	}

	/**
	 * @param otherTenderTransaction
	 *            the otherTenderTransaction to set
	 */
	public void setOtherTenderTransaction(String otherTenderTransaction) {
		this.otherTenderTransaction = otherTenderTransaction;
	}

	/**
	 * @return the ofeftTransaction
	 */
	public String getOfeftTransaction() {
		return ofeftTransaction;
	}

	/**
	 * @param ofeftTransaction
	 *            the ofeftTransaction to set
	 */
	public void setOfeftTransaction(String ofeftTransaction) {
		this.ofeftTransaction = ofeftTransaction;
	}

	/**
	 * @return the cashTransaction
	 */
	public String getCashTransaction() {
		return cashTransaction;
	}

	/**
	 * @param cashTransaction
	 *            the cashTransaction to set
	 */
	public void setCashTransaction(String cashTransaction) {
		this.cashTransaction = cashTransaction;
	}

	/**
	 * @return the avgTransacSize
	 */
	public String getAvgTransacSize() {
		return avgTransacSize;
	}

	/**
	 * @param avgTransacSize
	 *            the avgTransacSize to set
	 */
	public void setAvgTransacSize(String avgTransacSize) {
		this.avgTransacSize = avgTransacSize;
	}

	/**
	 * @return the avgSalesPerTransac
	 */
	public String getAvgSalesPerTransac() {
		return avgSalesPerTransac;
	}

	/**
	 * @param avgSalesPerTransac
	 *            the avgSalesPerTransac to set
	 */
	public void setAvgSalesPerTransac(String avgSalesPerTransac) {
		this.avgSalesPerTransac = avgSalesPerTransac;
	}

	/**
	 * @return the netSalesTaxExcl
	 */
	public String getNetSalesTaxExcl() {
		return netSalesTaxExcl;
	}

	/**
	 * @param netSalesTaxExcl
	 *            the netSalesTaxExcl to set
	 */
	public void setNetSalesTaxExcl(String netSalesTaxExcl) {
		this.netSalesTaxExcl = netSalesTaxExcl;
	}

	/**
	 * @return the transactionCount
	 */
	public String getTransactionCount() {
		return transactionCount;
	}

	/**
	 * @param transactionCount
	 *            the transactionCount to set
	 */
	public void setTransactionCount(String transactionCount) {
		this.transactionCount = transactionCount;
	}

	/**
	 * @return the itemSoldCount
	 */
	public String getItemSoldCount() {
		return itemSoldCount;
	}

	/**
	 * @param itemSoldCount
	 *            the itemSoldCount to set
	 */
	public void setItemSoldCount(String itemSoldCount) {
		this.itemSoldCount = itemSoldCount;
	}

	public String getDeferedLoyalty() {
		return deferedLoyalty;
	}

	public void setDeferedLoyalty(String deferedLoyalty) {
		this.deferedLoyalty = deferedLoyalty;
	}
}
