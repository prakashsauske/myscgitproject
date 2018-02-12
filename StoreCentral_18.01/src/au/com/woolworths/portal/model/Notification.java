package au.com.woolworths.portal.model;

import java.util.ArrayList;

import au.com.woolworths.portal.util.Constants;

public class Notification {
	private String notifyId;
	private String notifyDesc;
	private String notifyTitle;
	private String salesOrg;
	private String role;
	private String priority;
	private String ackReq;
	private ArrayList<String> toAddDepts;
	private ArrayList<String> toRemoveDepts;
	
	public ArrayList<String> getToAddDepts() {
		return toAddDepts;
	}
	public void setToAddDepts(ArrayList<String> toAddDepts) {
		this.toAddDepts = toAddDepts;
	}
	public ArrayList<String> getToRemoveDepts() {
		return toRemoveDepts;
	}
	public void setToRemoveDepts(ArrayList<String> toRemoveDepts) {
		this.toRemoveDepts = toRemoveDepts;
	}
	private int noOfDepts;
	private String level;
	
	public ArrayList<String> getRoles() {
		return roles;
	}
	public void setRoles(ArrayList<String> roles) {
		this.roles = roles;
	}
	public String getLevel() {
		return level;
	}
	public void setLevel(String level) {
		this.level = level;
	}
	/**
	 * @return the priority
	 */
	public String getPriority() {
		return priority;
	}
	/**
	 * @return the ackReq
	 */
	public String getAckReq() {
		return ackReq;
	}
	/**
	 * @return the noOfDepts
	 */
	public int getNoOfDepts() {
		return noOfDepts;
	}
	/**
	 * @param priority the priority to set
	 */
	public void setPriority(String priority) {
		this.priority = priority;
	}
	/**
	 * @param ackReq the ackReq to set
	 */
	public void setAckReq(String ackReq) {
		this.ackReq = ackReq;
	}
	/**
	 * @param noOfDepts the noOfDepts to set
	 */
	public void setNoOfDepts(int noOfDepts) {
		this.noOfDepts = noOfDepts;
	}
	/**
	 * @return the notifyId
	 */
	public String getNotifyId() {
		return notifyId;
	}
	/**
	 * @return the notifyDesc
	 */
	public String getNotifyDesc() {
		return notifyDesc;
	}
	/**
	 * @return the notifyTitle
	 */
	public String getNotifyTitle() {
		return notifyTitle;
	}
	/**
	 * @return the salesOrg
	 */
	public String getSalesOrg() {
		return salesOrg;
	}
	/**
	 * @return the role
	 */
	public String getRole() {
		return role;
	}
	/**
	 * @return the checked
	 */
	public String getChecked() {
		return checked;
	}
	/**
	 * @return the depts
	 */
	public ArrayList<String> getDepts() {
		return depts;
	}
	/**
	 * @param notifyId the notifyId to set
	 */
	public void setNotifyId(String notifyId) {
		this.notifyId = notifyId;
	}
	/**
	 * @param notifyDesc the notifyDesc to set
	 */
	public void setNotifyDesc(String notifyDesc) {
		this.notifyDesc = notifyDesc;
	}
	/**
	 * @param notifyTitle the notifyTitle to set
	 */
	public void setNotifyTitle(String notifyTitle) {
		this.notifyTitle = notifyTitle;
	}
	/**
	 * @param salesOrg the salesOrg to set
	 */
	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}
	/**
	 * @param role the role to set
	 */
	public void setRole(String role) {
		this.role = role;
	}
	/**
	 * @param checked the checked to set
	 */
	public void setChecked(String checked) {
		this.checked = checked;
	}
	/**
	 * @param depts the depts to set
	 */
	public void setDepts(ArrayList<String> depts) {
		this.depts = depts;
	}
	private String checked;
	private ArrayList<String> depts;
	private ArrayList<String> roles;

}
