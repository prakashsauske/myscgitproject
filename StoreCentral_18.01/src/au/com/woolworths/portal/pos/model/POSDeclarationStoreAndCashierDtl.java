package au.com.woolworths.portal.pos.model;

import java.io.Serializable;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class POSDeclarationStoreAndCashierDtl implements Serializable {
		
		/**
	 * 
	 */
	private static final long serialVersionUID = 1L;

		@JsonProperty("ID")
		public void setId2(String id) {
			setId( id);
		}
		private String id;

		@JsonProperty("TotaledProperties")
		public void setTotaled_properties_list2(String totaled_properties_list) {
			setTotaled_properties_list( totaled_properties_list);
		}
		private String totaled_properties_list;
		
		@JsonProperty("A0RT_CASHNO")
		public void setCashierNumber2(String cashierNumber) {
			setCashierNumber( cashierNumber);
		}
		private String cashierNumber;

		@JsonProperty("ZRT_CASHR")
		public void setCashierName2(String cashierName) {
			setCashierName( cashierName);
		}
		private String cashierName;

		@JsonProperty("A0PLANT")
		public void setSite2(String site) {
			setSite( site);
		}
		private String site;

		/**
		 * @return the id
		 */
		public String getId() {
			return id;
		}

		/**
		 * @param id the id to set
		 */
		public void setId(String id) {
			this.id = id;
		}

		/**
		 * @return the totaled_properties_list
		 */
		public String getTotaled_properties_list() {
			return totaled_properties_list;
		}

		/**
		 * @param totaled_properties_list the totaled_properties_list to set
		 */
		public void setTotaled_properties_list(String totaled_properties_list) {
			this.totaled_properties_list = totaled_properties_list;
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
		 * @return the cashierName
		 */
		public String getCashierName() {
			return cashierName;
		}

		/**
		 * @param cashierName the cashierName to set
		 */
		public void setCashierName(String cashierName) {
			this.cashierName = cashierName;
		}

		/**
		 * @return the site
		 */
		public String getSite() {
			return site;
		}

		/**
		 * @param site the site to set
		 */
		public void setSite(String site) {
			this.site = site;
		}

}
