package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;
import org.codehaus.jackson.map.annotate.JsonDeserialize;

import au.com.woolworths.portal.util.JsonAbsStringDeserializer;


/**
 * 
 * @author xsvm1
 *
 * 
 */

@JsonIgnoreProperties(ignoreUnknown = true)
public class StoreWeeklyMarkdownDtl implements Serializable {
	
	/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

	@JsonProperty("A0CM_CDT1_T")
	public void setDepartment2(String department) {
		setDepartment( department);
	}
	private String department;
	
	@JsonProperty("A0CM_CDT1")
	public void setDepartmentNumber2(String departmentNumber) {
		setDepartmentNumber( departmentNumber);
	}
	private String departmentNumber;

	@JsonProperty("A7YUV5W359XPW1AKCK45G3X4AR")
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setDamagedStock2(String damagedStock) {
		setDamagedStock( damagedStock);
	}
	private String damagedStock;

	/**
	 * @return the departmentNumber
	 */
	public String getDepartmentNumber() {
		return departmentNumber;
	}

	/**
	 * @param departmentNumber the departmentNumber to set
	 */
	public void setDepartmentNumber(String departmentNumber) {
		this.departmentNumber = departmentNumber;
	}

	@JsonProperty("A7YUV5W359XPVXO8861V3T7LKZ")
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setStockWriteOff2(String stockWriteOff) {
		setStockWriteOff( stockWriteOff);
	}
	private String stockWriteOff;

	@JsonProperty("A7YUV5W359XPVXO8861V44YR5V")
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setTheft2(String theft) {
		setTheft( theft);
	}
	private String theft;
	
	@JsonProperty("A00O2TFH9JBU38AI1FG0WOV9UX")
	/**
	 * @param scanningPolicy the scanningPolicy to set
	 */
	public void setScanningPolicy2(String scanningPolicy) {
		setScanningPolicy(scanningPolicy);
	}
	private String scanningPolicy;
	
	
	/**
	 * @return the scanningPolicy
	 */
	public String getScanningPolicy() {
		return scanningPolicy;
	}

	/**
	 * @param scanningPolicy the scanningPolicy to set
	 */
	public void setScanningPolicy(String scanningPolicy) {
		this.scanningPolicy = scanningPolicy;
	}

	

	@JsonProperty("A7YUV5W359XPW1AM63A8G6XS77")
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setOutOfDate2(String outOfDate) {
		setOutOfDate( outOfDate);
	}
	private String outOfDate;

	@JsonProperty("A7YUV5W359XPVXO8861V4S6J2B")
	public void setPromotions2(String promotions) {
		setPromotions( promotions);
	}
	private String promotions;

	@JsonProperty("A7YUV5W359XPVXO8861V52TATF")
	public void setSpecialActivity2(String specialActivity) {
		setSpecialActivity( specialActivity);
	}
	private String specialActivity;

	@JsonProperty("A7YUV5W359XPW1AMAYV72U3GN4")
	public void setComp2(String comp) {
		setComp( comp);
	}
	private String comp;
	
	@JsonProperty("A7YUV5W359XPVXO8861V5SGV7N")
	public void setDeleted2(String deleted) {
		setDeleted( deleted);
	}
	private String deleted;

	@JsonProperty("A7YUV5W359XPVXO8861V635E6B")
	public void setAdvertisements2(String advertisements) {
		setAdvertisements( advertisements);
	}
	private String advertisements;

	@JsonProperty("A7YUV5W359XPVXO8861V6DTX4Z")
	public void setClearance2(String clearance) {
		setClearance( clearance);
	}
	private String clearance;

	@JsonProperty("A7YUV5W359XPVXO8861V6POL4Z")
	public void setPriceOverrideRTC2(String priceOverrideRTC) {
		setPriceOverrideRTC( priceOverrideRTC);
	}
	private String priceOverrideRTC;

	@JsonProperty("A7YUV5W359XPVXO8861V70BCW3")
	public void setLoyalty2(String loyalty) {
		setLoyalty( loyalty);
	}
	private String loyalty;

	@JsonProperty("A7YUV5W359XPVXO8861V7C7S3N")
	public void setStaffDiscount2(String staffDiscount) {
		setStaffDiscount( staffDiscount);
	}
	private String staffDiscount;

	@JsonProperty("A7YUV5W359XPVXO8861V7NYXOJ")
	public void setMarkdownRetailVal2(String markdownRetailVal) {
		setMarkdownRetailVal( markdownRetailVal);
	}
	private String markdownRetailVal;

	@JsonProperty("B0ZI8KYVSWSLBFE2STDI1KVSX")
	public void setDeferredLoyalty2(String deferredLoyalty) {
		setDeferredLoyalty( deferredLoyalty);
	}
	private String deferredLoyalty;

	/**
	 * @return the department
	 */
	public String getDepartment() {
		return department;
	}

	/**
	 * @param department the department to set
	 */
	public void setDepartment(String department) {
		this.department = department;
	}

	/**
	 * @return the damagedStock
	 */
	public String getDamagedStock() {
		return damagedStock;
	}

	/**
	 * @param damagedStock the damagedStock to set
	 */
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setDamagedStock(String damagedStock) {
		this.damagedStock = damagedStock;
	}

	/**
	 * @return the stockWriteOff
	 */
	public String getStockWriteOff() {
		return stockWriteOff;
	}

	/**
	 * @param stockWriteOff the stockWriteOff to set
	 */
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setStockWriteOff(String stockWriteOff) {
		this.stockWriteOff = stockWriteOff;
	}

	/**
	 * @return the theft
	 */
	public String getTheft() {
		return theft;
	}

	/**
	 * @param theft the theft to set
	 */
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setTheft(String theft) {
		this.theft = theft;
	}

	/**
	 * @return the outOfDate
	 */
	public String getOutOfDate() {
		return outOfDate;
	}

	/**
	 * @param outOfDate the outOfDate to set
	 */
	@JsonDeserialize(using = JsonAbsStringDeserializer.class)
	public void setOutOfDate(String outOfDate) {
		this.outOfDate = outOfDate;
	}

	/**
	 * @return the promotions
	 */
	public String getPromotions() {
		return promotions;
	}

	/**
	 * @param promotions the promotions to set
	 */
	public void setPromotions(String promotions) {
		this.promotions = promotions;
	}

	/**
	 * @return the specialActivity
	 */
	public String getSpecialActivity() {
		return specialActivity;
	}

	/**
	 * @param specialActivity the specialActivity to set
	 */
	public void setSpecialActivity(String specialActivity) {
		this.specialActivity = specialActivity;
	}

	/**
	 * @return the comp
	 */
	public String getComp() {
		return comp;
	}

	/**
	 * @param comp the comp to set
	 */
	public void setComp(String comp) {
		this.comp = comp;
	}

	/**
	 * @return the deleted
	 */
	public String getDeleted() {
		return deleted;
	}

	/**
	 * @param deleted the deleted to set
	 */
	public void setDeleted(String deleted) {
		this.deleted = deleted;
	}

	/**
	 * @return the advertisements
	 */
	public String getAdvertisements() {
		return advertisements;
	}

	/**
	 * @param advertisements the advertisements to set
	 */
	public void setAdvertisements(String advertisements) {
		this.advertisements = advertisements;
	}

	/**
	 * @return the clearance
	 */
	public String getClearance() {
		return clearance;
	}

	/**
	 * @param clearance the clearance to set
	 */
	public void setClearance(String clearance) {
		this.clearance = clearance;
	}

	/**
	 * @return the priceOverrideRTC
	 */
	public String getPriceOverrideRTC() {
		return priceOverrideRTC;
	}

	/**
	 * @param priceOverrideRTC the priceOverrideRTC to set
	 */
	public void setPriceOverrideRTC(String priceOverrideRTC) {
		this.priceOverrideRTC = priceOverrideRTC;
	}

	/**
	 * @return the loyalty
	 */
	public String getLoyalty() {
		return loyalty;
	}

	/**
	 * @param loyalty the loyalty to set
	 */
	public void setLoyalty(String loyalty) {
		this.loyalty = loyalty;
	}

	/**
	 * @return the staffDiscount
	 */
	public String getStaffDiscount() {
		return staffDiscount;
	}

	/**
	 * @param staffDiscount the staffDiscount to set
	 */
	public void setStaffDiscount(String staffDiscount) {
		this.staffDiscount = staffDiscount;
	}

	/**
	 * @return the markdownRetailVal
	 */
	public String getMarkdownRetailVal() {
		return markdownRetailVal;
	}

	/**
	 * @param markdownRetailVal the markdownRetailVal to set
	 */
	public void setMarkdownRetailVal(String markdownRetailVal) {
		this.markdownRetailVal = markdownRetailVal;
	}

	public String getDeferredLoyalty() {
		return deferredLoyalty;
	}

	public void setDeferredLoyalty(String deferredLoyalty) {
		this.deferredLoyalty = deferredLoyalty;
	}

	@Override
	public int hashCode() {
		try {
			return Integer.parseInt(departmentNumber.substring(1));
		} catch (Exception e) {
		}
		return super.hashCode();
	}
	public void aggregate(StoreWeeklyMarkdownDtl args) {
		double staffDiscountFirst = 0;
		double staffDiscountSecond = 0;
		try {
			staffDiscountFirst = Double.parseDouble(this.staffDiscount);
		} catch (Exception e) {
		}
		try {
			staffDiscountSecond = Double.parseDouble(args.staffDiscount);
		} catch (Exception e) {
		}
		this.setStaffDiscount((staffDiscountFirst + staffDiscountSecond) + "");
		
		double loyaltyFirst = 0;
		double loyaltySecond = 0;
		try {
			loyaltyFirst = Double.parseDouble(this.loyalty);
		} catch (Exception e) {
		}
		try {
			loyaltySecond = Double.parseDouble(args.loyalty);
		} catch (Exception e) {
		}
		this.setLoyalty((loyaltyFirst + loyaltySecond) + "");

		double promotionsFirst = 0;
		double promotionsSecond = 0;
		try {
			promotionsFirst = Double.parseDouble(this.promotions);
		} catch (Exception e) {
		}
		try {
			promotionsSecond = Double.parseDouble(args.promotions);
		} catch (Exception e) {
		}
		this.setPromotions((promotionsFirst + promotionsSecond) + "");

		double priceOverrideRTCFirst = 0;
		double priceOverrideRTCSecond = 0;
		try {
			priceOverrideRTCFirst = Double.parseDouble(this.priceOverrideRTC);
		} catch (Exception e) {
		}
		try {
			priceOverrideRTCSecond = Double.parseDouble(args.priceOverrideRTC);
		} catch (Exception e) {
		}
		this.setPriceOverrideRTC((priceOverrideRTCFirst + priceOverrideRTCSecond) + "");

		double clearanceFirst = 0;
		double clearanceSecond = 0;
		try {
			clearanceFirst = Double.parseDouble(this.clearance);
		} catch (Exception e) {
		}
		try {
			clearanceSecond = Double.parseDouble(args.clearance);
		} catch (Exception e) {
		}
		this.setClearance((clearanceFirst + clearanceSecond) + "");

		double advertisementsFirst = 0;
		double advertisementsSecond = 0;
		try {
			advertisementsFirst = Double.parseDouble(this.advertisements);
		} catch (Exception e) {
		}
		try {
			advertisementsSecond = Double.parseDouble(args.advertisements);
		} catch (Exception e) {
		}
		this.setAdvertisements((advertisementsFirst + advertisementsSecond) + "");
		
		double scanningPolicyFirst = 0;
		double scanningPolicySecond = 0;
		try {
			scanningPolicyFirst = Double.parseDouble(this.scanningPolicy);
		} catch (Exception e) {
		}
		try {
			scanningPolicySecond = Double.parseDouble(args.scanningPolicy);
		} catch (Exception e) {
		}
		this.setScanningPolicy((scanningPolicyFirst + scanningPolicySecond) + "");

		double deletedFirst = 0;
		double deletedSecond = 0;
		try {
			deletedFirst = Double.parseDouble(this.deleted);
		} catch (Exception e) {
		}
		try {
			deletedSecond = Double.parseDouble(args.deleted);
		} catch (Exception e) {
		}
		this.setDeleted((deletedFirst + deletedSecond) + "");

		double outOfDateFirst = 0;
		double outOfDateSecond = 0;
		try {
			outOfDateFirst = Math.abs(Double.parseDouble(this.outOfDate));
		} catch (Exception e) {
		}
		try {
			outOfDateSecond = Math.abs(Double.parseDouble(args.outOfDate));
		} catch (Exception e) {
		}
		this.setOutOfDate((outOfDateFirst + outOfDateSecond) + "");

		double theftFirst = 0;
		double theftSecond = 0;
		try {
			theftFirst = Math.abs(Double.parseDouble(this.theft));
		} catch (Exception e) {
		}
		try {
			theftSecond = Math.abs(Double.parseDouble(args.theft));
		} catch (Exception e) {
		}
		this.setTheft((theftFirst + theftSecond) + "");

		double stockWriteOffFirst = 0;
		double stockWriteOffSecond = 0;
		try {
			stockWriteOffFirst = Math.abs(Double.parseDouble(this.stockWriteOff));
		} catch (Exception e) {
		}
		try {
			stockWriteOffSecond = Math.abs(Double.parseDouble(args.stockWriteOff));
		} catch (Exception e) {
		}
		this.setStockWriteOff((stockWriteOffFirst + stockWriteOffSecond) + "");

		double damagedStockFirst = 0;
		double damagedStockSecond = 0;
		try {
			damagedStockFirst = Math.abs(Double.parseDouble(this.damagedStock));
		} catch (Exception e) {
		}
		try {
			damagedStockSecond = Math.abs(Double.parseDouble(args.damagedStock));
		} catch (Exception e) {
		}
		this.setDamagedStock((damagedStockFirst + damagedStockSecond) + "");

		double compFirst = 0;
		double compSecond = 0;
		try {
			compFirst = Double.parseDouble(this.comp);
		} catch (Exception e) {
		}
		try {
			compSecond = Double.parseDouble(args.comp);
		} catch (Exception e) {
		}
		this.setComp((compFirst + compSecond) + "");

		double specialActivityFirst = 0;
		double specialActivitySecond = 0;
		try {
			specialActivityFirst = Double.parseDouble(this.specialActivity);
		} catch (Exception e) {
		}
		try {
			specialActivitySecond = Double.parseDouble(args.specialActivity);
		} catch (Exception e) {
		}
		this.setSpecialActivity((specialActivityFirst + specialActivitySecond) + "");
	}
	@Override
	public boolean equals(Object obj) {
		StoreWeeklyMarkdownDtl tmpObj = (StoreWeeklyMarkdownDtl) obj;
		return tmpObj!=null && (tmpObj==this || this.getDepartment() == tmpObj.getDepartment() || (department!=null && this.getDepartment().equals(tmpObj.getDepartment())));
	}
}
