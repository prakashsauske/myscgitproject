package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.model.CompetitorDtl;

@JsonIgnoreProperties(ignoreUnknown = true)
public class CompetitorDtlList {
	
	@JsonProperty("username")
	private String username;
	
	@JsonProperty("sapPassword")
	private String sapPassword;
	
	@JsonProperty("message")
	private String message;
	
	/**
	 * @return the message
	 */
	public String getMessage() {
		return message;
	}

	/**
	 * @param message the message to set
	 */
	public void setMessage(String message) {
		this.message = message;
	}

	public CompetitorDtlList(String username, String sapPassword, String site) {
		super();
		this.username = username;
		this.sapPassword = sapPassword;
		this.site = site;
	}

	public CompetitorDtlList() {
		// TODO Auto-generated constructor stub
	}

	/**
	 * @return the username
	 */
	public String getUsername() {
		return username;
	}

	/**
	 * @param username the username to set
	 */
	public void setUsername(String username) {
		this.username = username;
	}

	/**
	 * @return the sapPassword
	 */
	public String getSapPassword() {
		return sapPassword;
	}

	/**
	 * @param sapPassword the sapPassword to set
	 */
	public void setSapPassword(String sapPassword) {
		this.sapPassword = sapPassword;
	}

	@JsonProperty("site")
	private String site;
	
	
	@JsonProperty("results")
	private ArrayList<CompetitorDtl> result;

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

	/**
	 * @return the result
	 */
	public ArrayList<CompetitorDtl> getResult() {
		return result;
	}

	/**
	 * @param result the result to set
	 */
	public void setResult(ArrayList<CompetitorDtl> result) {
		this.result = result;
	}

	
	

}
