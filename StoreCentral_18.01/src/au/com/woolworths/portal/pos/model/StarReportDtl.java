package au.com.woolworths.portal.pos.model;

import java.io.Serializable;
import java.text.DecimalFormat;
import java.text.NumberFormat;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import au.com.woolworths.portal.util.CommonUtils;
import au.com.woolworths.portal.util.JsonDoubleDeserializer;


@JsonIgnoreProperties(ignoreUnknown = true)
public class StarReportDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@JsonProperty("RCASHFNAM")
	public void setCashierFirstName2(String cashierFirstName) {
		setCashierFirstName( cashierFirstName);
	}
	private String cashierFirstName;

	@JsonProperty("RCASHLNAM")
	public void setCashierLastName2(String cashierLastName) {
		setCashierLastName( cashierLastName);
	}
	private String cashierLastName;

	@JsonProperty("A0RPA_OID")
	public void setCashierNumber2(String cashierNumber) {
		setCashierNumber( cashierNumber);
	}
	private String cashierNumber;
	
	@JsonProperty("A7YUV5W359XPXR4H9XYXOID43O")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCashOutCount2(Double cashOutCount) {
		setCashOutCount(cashOutCount);
	}
	private Double cashOutCount;
	
	@JsonProperty("A7YUV5W359XPW0U31BQZ8WSZCX")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCashOutAmount2(Double cashOutAmount) {
		setCashOutAmount( cashOutAmount);
	}
	private Double cashOutAmount;
				
	@JsonProperty("A7YUV5W359XPXNZN7E1QC39B0L")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCigaretteSales2(Double cigaretteSales) {
		setCigaretteSales( cigaretteSales);
	}
	private Double cigaretteSales;

	@JsonProperty("A7YUV5W359XPVXOONDCXFB3SW0")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setSelfCheckOutTransactions2(Double selfCheckOutTransactions) {
		setSelfCheckOutTransactions( selfCheckOutTransactions);
	}
	private Double selfCheckOutTransactions;
	
	@JsonProperty("A7YUV5W359XPVXOONDCXFMUYGW")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setFrontOfStoreSales2(Double frontOfStoreSales) {
		setFrontOfStoreSales( frontOfStoreSales);
	}
	private Double frontOfStoreSales;
	
	@JsonProperty("A7YUV5W359XPVXOON7YYLO06BN")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setQuantity2(Double quantity) {
		setQuantity( quantity);
	}
	private Double quantity;
	
	@JsonProperty("A7YUV5W359XPXNZ2SY5JBIBKZM")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setSalesQuantityBaseUoM2(Double salesQuantityBaseUoM) {
		setSalesQuantityBaseUoM( salesQuantityBaseUoM);
	}
	private Double salesQuantityBaseUoM;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUDNAO04")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setAverageBasketSize2(Double averageBasketSize) {
		setAverageBasketSize( averageBasketSize);
	}
	private Double averageBasketSize;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUEGIEPW")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setAverageArticlePrice2(Double averageArticlePrice) {
		setAverageArticlePrice(averageArticlePrice);
	}
	private Double averageArticlePrice;
	
	@JsonProperty("A7YUV5W359XPXNZ2SY5JAB3X1E")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setTenderingTime3(Double tenderingTime) {
		setTenderingTime( tenderingTime);
	}
	private Double tenderingTime;
	
	@JsonProperty("A7YUV5W359XPXNZ2SY5JB7QKG2")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setArticlesPerMinute2(Double articlesPerMinute) {
		setArticlesPerMinute( articlesPerMinute);
	}
	private Double articlesPerMinute;
	
	@JsonProperty("A7YUV5W359XPXNZ2SY5JBST342")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setSalesRetailIncT2(Double salesRetailIncT) {
		setSalesRetailIncT( salesRetailIncT);
	}
	private Double salesRetailIncT;
	

	public void setItemsScannedCount2(Double itemsScannedCount) {
		setItemsScannedCount( itemsScannedCount);
	}
	private Double itemsScannedCount = salesQuantityBaseUoM;
	
	@JsonProperty("A7YUV5W359XPXNZ2SY5JAMDIIQ")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setTenderingTime4(Double tenderingTime2) {
		setTenderingTime2( tenderingTime2);
	}
	private Double tenderingTime2;
	
	@JsonProperty("A7YUV5W359XPXNZ2SY5JAX5JWI")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setTransactionCount2(Double transactionCount) {
		setTransactionCount( transactionCount);
	}
	private Double transactionCount;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUEWR3LW")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setReducedToClearSal2(Double reducedToClearSal) {
		setReducedToClearSal( reducedToClearSal);
	}
	private Double reducedToClearSal;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUFFQ490")
	public void setIdleTime2(String idleTime) {
		setIdleTime( idleTime);
	}
	private String idleTime;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUFFQ490_F")
	public void setIdleTimeFormatted2(String idleTimeFormatted) {
		setIdleTimeFormatted( idleTimeFormatted);
	}
	private String idleTimeFormatted;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUG96N0K")
	public void setScanTime2(String scanTime) {
		setScanTime( scanTime);
	}
	private String scanTime;
	
	@JsonProperty("A7YUV5W359XPVXOOMMRUG96N0K_F")
	public void setScanTimeFormatted2(String scanTimeFormatted) {
		setScanTimeFormatted( scanTimeFormatted);
	}
	private String scanTimeFormatted;
	
	@JsonProperty("A7YUV5W359XPXR4F5W1JK15JB8")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setWithdrawal2(Double withdrawal) {
		setWithdrawal( withdrawal);
	}
	private Double withdrawal;
	
	@JsonProperty("A7YUV5W359XPW0U31BQZ99AH35")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCashback2(Double cashback) {
		setCashback( cashback);
	}
	private Double cashback;
	
	@JsonProperty("A7YUV5W359XPXR0RVAPQN4B5DV")
	public void settValue2(String tValue) {
		settValue( tValue);
	}
	private String tValue;
	
	@JsonProperty("A7YUV5W359XPXR0RVAPQN4B5DV_F")
	public void setNoDataFound2(String noDataFound) {
		setNoDataFound( noDataFound);
	}
	private String noDataFound;
	
	@JsonProperty("A7YUV5W359XPXR67BU5ZFOVK74")
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setPercentageEDR2(Double percentageEDR) {
		setPercentageEDR( percentageEDR);
	}
	private Double percentageEDR;
	
	/**
	 * @return the cashierFirstName
	 */
	public String getCashierFirstName() {
		return cashierFirstName;
	}

	/**
	 * @param cashierFirstName the cashierFirstName to set
	 */
	public void setCashierFirstName(String cashierFirstName) {
		this.cashierFirstName = cashierFirstName;
	}

	/**
	 * @return the cashierLastName
	 */
	public String getCashierLastName() {
		return cashierLastName;
	}

	/**
	 * @param cashierLastName the cashierLastName to set
	 */
	public void setCashierLastName(String cashierLastName) {
		this.cashierLastName = cashierLastName;
	}

	/**
	 * @return the cashierNumber
	 */
	public String getCashierNumber() {
		return cashierNumber;
	}

	/**
	 * @param cashierNumber the cashierNumber to set
	 */
	public void setCashierNumber(String cashierNumber) {
		this.cashierNumber = cashierNumber;
	}

	/**
	 * @return the cashOutCount
	 */
	public Double getCashOutCount() {
		return cashOutCount;
	}

	/**
	 * @param cashOutCount the cashOutCount to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCashOutCount(Double cashOutCount) {
		this.cashOutCount = cashOutCount;
	}

	/**
	 * @return the cashOutAmount
	 */
	public Double getCashOutAmount() {
		return cashOutAmount;
	}

	/**
	 * @param cashOutAmount the cashOutAmount to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCashOutAmount(Double cashOutAmount) {
		this.cashOutAmount = cashOutAmount;
	}

	/**
	 * @return the cigaretteSales
	 */
	public Double getCigaretteSales() {
		return cigaretteSales;
	}

	/**
	 * @param cigaretteSales the cigaretteSales to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCigaretteSales(Double cigaretteSales) {
		this.cigaretteSales = cigaretteSales;
	}

	/**
	 * @return the selfCheckOutTransactions
	 */
	public Double getSelfCheckOutTransactions() {
		return selfCheckOutTransactions;
	}

	/**
	 * @param selfCheckOutTransactions the selfCheckOutTransactions to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setSelfCheckOutTransactions(Double selfCheckOutTransactions) {
		this.selfCheckOutTransactions = selfCheckOutTransactions;
	}

	/**
	 * @return the frontOfStoreSales
	 */
	public Double getFrontOfStoreSales() {
		return frontOfStoreSales;
	}

	/**
	 * @param frontOfStoreSales the frontOfStoreSales to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setFrontOfStoreSales(Double frontOfStoreSales) {
		this.frontOfStoreSales = frontOfStoreSales;
	}

	/**
	 * @return the quantity
	 */
	public Double getQuantity() {
		return quantity;
	}

	/**
	 * @param quantity the quantity to set
	 */
	public void setQuantity(Double quantity) {
		this.quantity = quantity;
	}

	/**
	 * @return the salesQuantityBaseUoM
	 */
	public Double getSalesQuantityBaseUoM() {
		return salesQuantityBaseUoM;
	}

	/**
	 * @param salesQuantityBaseUoM the salesQuantityBaseUoM to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setSalesQuantityBaseUoM(Double salesQuantityBaseUoM) {
		this.salesQuantityBaseUoM = salesQuantityBaseUoM;
	}

	/**
	 * @return the averageBasketSize
	 */
	public Double getAverageBasketSize() {
		return averageBasketSize;
	}

	/**
	 * @param averageBasketSize the averageBasketSize to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setAverageBasketSize(Double averageBasketSize) {
		this.averageBasketSize = averageBasketSize;
	}

	/**
	 * @return the averageArticlePrice
	 */
	public Double getAverageArticlePrice() {
		return averageArticlePrice;
	}

	/**
	 * @param averageArticlePrice the averageArticlePrice to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setAverageArticlePrice(Double averageArticlePrice) {
		this.averageArticlePrice = averageArticlePrice;
	}

	/**
	 * @return the tenderingTime
	 */
	public Double getTenderingTime() {
		return tenderingTime;
	}

	/**
	 * @param tenderingTime the tenderingTime to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setTenderingTime(Double tenderingTime) {
		this.tenderingTime = tenderingTime;
	}

	/**
	 * @return the articlesPerMinute
	 */
	public Double getArticlesPerMinute() {
		return articlesPerMinute;
	}

	/**
	 * @param articlesPerMinute the articlesPerMinute to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setArticlesPerMinute(Double articlesPerMinute) {
		this.articlesPerMinute = articlesPerMinute;
	}

	/**
	 * @return the salesRetailIncT
	 */
	public Double getSalesRetailIncT() {
		return salesRetailIncT;
	}

	/**
	 * @param salesRetailIncT the salesRetailIncT to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setSalesRetailIncT(Double salesRetailIncT) {
		this.salesRetailIncT = salesRetailIncT;
	}

	/**
	 * @return the itemsScannedCount
	 */
	public Double getItemsScannedCount() {
		return itemsScannedCount;
	}

	/**
	 * @param itemsScannedCount the itemsScannedCount to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setItemsScannedCount(Double itemsScannedCount) {
		this.itemsScannedCount = itemsScannedCount;
	}

	/**
	 * @return the tenderingTime2
	 */
	public Double getTenderingTime2() {
		return tenderingTime2;
	}

	/**
	 * @param tenderingTime2 the tenderingTime2 to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setTenderingTime2(Double tenderingTime2) {
		this.tenderingTime2 = tenderingTime2;
	}

	/**
	 * @return the transactionCount
	 */
	public Double getTransactionCount() {
		return transactionCount;
	}

	/**
	 * @param transactionCount the transactionCount to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setTransactionCount(Double transactionCount) {
		this.transactionCount = transactionCount;
	}

	/**
	 * @return the reducedToClearSal
	 */
	public Double getReducedToClearSal() {
		return reducedToClearSal;
	}

	/**
	 * @param reducedToClearSal the reducedToClearSal to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setReducedToClearSal(Double reducedToClearSal) {
		this.reducedToClearSal = reducedToClearSal;
	}

	/**
	 * @return the idleTime
	 */
	public String getIdleTime() {
		return idleTime;
	}

	/**
	 * @param idleTime the idleTime to set
	 */
	public void setIdleTime(String idleTime) {
		this.idleTime = idleTime;
	}

	/**
	 * @return the idleTimeFormatted
	 */
	public String getIdleTimeFormatted() {
		return idleTimeFormatted;
	}

	/**
	 * @param idleTimeFormatted the idleTimeFormatted to set
	 */
	public void setIdleTimeFormatted(String idleTimeFormatted) {
		this.idleTimeFormatted = idleTimeFormatted;
	}

	/**
	 * @return the scanTime
	 */
	public String getScanTime() {
		return scanTime;
	}

	/**
	 * @param scanTime the scanTime to set
	 */
	public void setScanTime(String scanTime) {
		this.scanTime = scanTime;
	}

	/**
	 * @return the scanTimeFormatted
	 */
	public String getScanTimeFormatted() {
		return scanTimeFormatted;
	}

	/**
	 * @param scanTimeFormatted the scanTimeFormatted to set
	 */
	public void setScanTimeFormatted(String scanTimeFormatted) {
		this.scanTimeFormatted = scanTimeFormatted;
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
	 * @return the withdrawal
	 */
	public Double getWithdrawal() {
		return withdrawal;
	}

	/**
	 * @param withdrawal the withdrawal to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setWithdrawal(Double withdrawal) {
		this.withdrawal = withdrawal;
	}

	/*public String getWithdrawalFormatted() {
		return withdrawalFormatted;
	}

	public void setWithdrawalFormatted(String withdrawalFormatted) {
		this.withdrawalFormatted = withdrawalFormatted;
	}*/

	public Double getCashback() {
		return cashback;
	}

	/**
	 * @param cashback the cashback to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setCashback(Double cashback) {
		this.cashback = cashback;
	}

/*	public String getCashbackFormatted() {
		return cashbackFormatted;
	}

	public void setCashbackFormatted(String cashbackFormatted) {
		this.cashbackFormatted = cashbackFormatted;
	}
*/
	/**
	 * @return the percentageEDR
	 */
	public Double getPercentageEDR() {
		return percentageEDR;
	}

	/**
	 * @param percentageEDR the percentageEDR to set
	 */
	@JsonDeserialize(using = JsonDoubleDeserializer.class)
	public void setPercentageEDR(Double percentageEDR) {
		this.percentageEDR = percentageEDR;
	}

	/*public String getPercentageEDRFormatted() {
		return percentageEDRFormatted;
	}

	public void setPercentageEDRFormatted(String percentageEDRFormatted) {
		this.percentageEDRFormatted = percentageEDRFormatted;
	}*/
	public void add(StarReportDtl bean) {
		if(this.getIdleTimeFormatted()!=null 
				&& CommonUtils.isNotNullNotEmptyNotWhiteSpace(bean.getIdleTimeFormatted()) 
				&& !"#".equals(bean.getIdleTimeFormatted())) {
			this.setIdleTimeFormatted(sumTimes(this.getIdleTimeFormatted(), bean.getIdleTimeFormatted()));
		}
		if(this.getScanTimeFormatted()!=null 
				&& CommonUtils.isNotNullNotEmptyNotWhiteSpace(bean.getScanTimeFormatted()) 
				&& !"#".equals(bean.getScanTimeFormatted())) {
			this.setScanTimeFormatted(sumTimes(this.getScanTimeFormatted(), bean.getScanTimeFormatted()));
		}
		//if(CommonUtils.isNumeric(this.getTransactionCount())) {
			this.setTransactionCount(this.getTransactionCount()+bean.getTransactionCount());
		//}
		//if(CommonUtils.isNumeric(this.getArticlesPerMinute())) {
			this.setArticlesPerMinute(this.getArticlesPerMinute()+bean.getArticlesPerMinute());
		//}
		//if(CommonUtils.isNumeric(this.getAverageBasketSize())) {
			this.setAverageBasketSize(this.getAverageBasketSize()+bean.getAverageBasketSize());
		//}
		//if(CommonUtils.isNumeric(this.getAverageArticlePrice())) {
			this.setAverageArticlePrice(this.getAverageArticlePrice()+bean.getAverageArticlePrice());
		//}
		//if(CommonUtils.isNumeric(this.getSelfCheckOutTransactions())) {
			this.setSelfCheckOutTransactions(this.getSelfCheckOutTransactions()+bean.getSelfCheckOutTransactions());
		//}
		//if(CommonUtils.isNumeric(this.getSalesRetailIncT())) {
			this.setSalesRetailIncT(this.getSalesRetailIncT()+bean.getSalesRetailIncT());
			//this.setItemsScannedCount(this.getSalesQuantityBaseUoM()+bean.getSalesQuantityBaseUoM());
		//}
		
		//if(CommonUtils.isNumeric(this.getTenderingTime())) {
			this.setTenderingTime(this.getTenderingTime()+bean.getTenderingTime());
		//}
		//if(CommonUtils.isNumeric(this.getCashOutAmount())) {
			this.setCashOutAmount(this.getCashOutAmount()+bean.getCashOutAmount());
		//}
	}
    private String sumTimes(String time1, String time2) {
    	NumberFormat nf = new DecimalFormat("00");
        long timeSec = 0L;
        int time1Neg = 1;
        int time2Neg = 1;
        String timeNeg = "";
		if(CommonUtils.isValidNegTimemmmss(time2)) {
			if("-".equals(time2.substring(0, 1))) {
				time2Neg = -1;
				time2 = time2.substring(1);
			}
			if("-".equals(time1.substring(0, 1))) {
				time1Neg = -1;
				time1 = time1.substring(1);
			}
			String[] arr = time1.split(":");
			timeSec = time1Neg * (Integer.parseInt(arr[0])*60*60 + Integer.parseInt(arr[1])*60 + Integer.parseInt(arr[2]));
			arr = time2.split(":");
			timeSec+= time2Neg * (Integer.parseInt(arr[0])*60*60 + Integer.parseInt(arr[1])*60 + Integer.parseInt(arr[2]));
			if(timeSec<0) {
				timeNeg = "-";
				timeSec = Math.abs(timeSec);
			}
			long hrs = timeSec / (60*60);
			timeSec = timeSec % (60*60);
	    	long mins = timeSec / 60;
	    	timeSec = timeSec % 60;
	        return timeNeg+nf.format(hrs) + ":" + nf.format(mins) + ":" + nf.format(timeSec);
		}
		/*else if(CommonUtils.isValidTime24hhmmmss(time1)) {
			return time1;
		}
		else if(CommonUtils.isValidTime24hhmmmss(time2)) {
			return time2;
		}*/
		return null;
	}

	
		}
