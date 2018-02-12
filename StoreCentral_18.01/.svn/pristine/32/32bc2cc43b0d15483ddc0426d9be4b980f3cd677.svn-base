package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class Department {

	@JsonProperty("parent")
	private String parent;

	@JsonProperty("iv_s_org")
	private String salesOrg;
	@JsonProperty("node_desc")
	private String nodeDesc;
	@JsonProperty("responsibility")
	private String responsibility;
	@JsonProperty("iv_dc")
	private String distChan;
	@JsonProperty("date_from")
	private String dateFrom;
	@JsonProperty("role")
	private String role;
	@JsonProperty("date_to")
	private String dateTo;
	@JsonProperty("tree_level")
	private String treeLevel;
	@JsonProperty("hier_id")
	private String hierId;
	@JsonProperty("node")
	private String node;
	@JsonProperty("price_group")
	private String priceGroup;
	@JsonProperty("strategy")
	private String strategy;
	@JsonProperty("reference")
	private String articreferenceleNo;
	
	@JsonProperty("checked")
	private String checked;

	public String getChecked() {
		return checked;
	}

	public void setChecked(String checked) {
		this.checked = checked;
	}

	@Override
	public int hashCode() {
		final int prime = 31;
		int result = 1;
		result = prime * result + ((node == null) ? 0 : node.hashCode());
		result = prime * result
				+ ((nodeDesc == null) ? 0 : nodeDesc.hashCode());
		return result;
	}

	@Override
	public boolean equals(Object obj) {
		if (this == obj)
			return true;
		if (obj == null)
			return false;
		if (getClass() != obj.getClass())
			return false;
		Department other = (Department) obj;
		if (node == null) {
			if (other.node != null)
				return false;
		} else if (!node.equals(other.node))
			return false;
		if (nodeDesc == null) {
			if (other.nodeDesc != null)
				return false;
		} else if (!nodeDesc.equals(other.nodeDesc))
			return false;
		return true;
	}

	public String getParent() {
		return parent;
	}

	public void setParent(String parent) {
		this.parent = parent;
	}

	public String getSalesOrg() {
		return salesOrg;
	}

	public void setSalesOrg(String salesOrg) {
		this.salesOrg = salesOrg;
	}

	public String getNodeDesc() {
		if(nodeDesc!=null && nodeDesc.length()>0){
			this.nodeDesc=nodeDesc.toUpperCase();
		}
		return nodeDesc;
	}

	public void setNodeDesc(String nodeDesc) {
		this.nodeDesc = nodeDesc;
	}

	public String getResponsibility() {
		return responsibility;
	}

	public void setResponsibility(String responsibility) {
		this.responsibility = responsibility;
	}

	public String getDistChan() {
		return distChan;
	}

	public void setDistChan(String distChan) {
		this.distChan = distChan;
	}

	public String getDateFrom() {
		if (this.dateFrom != null) {
			String result = PortalUtil.convertToStandard(dateFrom);
			if (result != null && result != "")
				return result;
		}
		return dateFrom;
	}

	public void setDateFrom(String dateFrom) {
		this.dateFrom = dateFrom;
	}

	public String getRole() {
		return role;
	}

	public void setRole(String role) {
		this.role = role;
	}

	public String getDateTo() {
		if (this.dateTo != null) {
			String result = PortalUtil.convertToStandard(dateTo);
			if (result != null && result != "")
				return result;
		}
		return dateTo;
	}

	public void setDateTo(String dateTo) {
		this.dateTo = dateTo;
	}

	public String getTreeLevel() {
		return treeLevel;
	}

	public void setTreeLevel(String treeLevel) {
		this.treeLevel = treeLevel;
	}

	public String getHierId() {
		return hierId;
	}

	public void setHierId(String hierId) {
		this.hierId = hierId;
	}

	public String getNode() {
		return node;
	}

	public void setNode(String node) {
		this.node = node;
	}

	public String getPriceGroup() {
		return priceGroup;
	}

	public void setPriceGroup(String priceGroup) {
		this.priceGroup = priceGroup;
	}

	public String getStrategy() {
		return strategy;
	}

	public void setStrategy(String strategy) {
		this.strategy = strategy;
	}

	public String getArticreferenceleNo() {
		return articreferenceleNo;
	}

	public void setArticreferenceleNo(String articreferenceleNo) {
		this.articreferenceleNo = articreferenceleNo;
	}

	public String getProductClf() {
		return productClf;
	}

	public void setProductClf(String productClf) {
		this.productClf = productClf;
	}

	public String getParentNnode() {
		return parentNnode;
	}

	public void setParentNnode(String parentNnode) {
		this.parentNnode = parentNnode;
	}

	public String getCategoryflag() {
		return categoryflag;
	}

	public void setCategoryflag(String categoryflag) {
		this.categoryflag = categoryflag;
	}

	@JsonProperty("productclf")
	private String productClf;
	@JsonProperty("iv_parent_node")
	private String parentNnode;
	@JsonProperty("catflg")
	private String categoryflag;

	private int levelCount;

	private boolean childExists = false;

	public boolean isChildExists() {
		return childExists;
	}

	public void setChildExists(boolean childExists) {
		this.childExists = childExists;
	}

	public int getLevelCount() {
		return levelCount;
	}

	public void setLevelCount(int levelCount) {
		this.levelCount = levelCount;
	}

	private ArrayList<Department> subLevles;

	public ArrayList<Department> getSubLevles() {
		return subLevles;
	}

	public void setSubLevles(ArrayList<Department> subLevles) {
		this.subLevles = subLevles;
	}

	private int parentId;

	private int level = 1;

	public int getLevel() {
		return level;
	}

	public void setLevel(int level) {
		this.level = level;
	}

	public int getParentId() {
		return parentId;
	}

	public void setParentId(int parentId) {
		this.parentId = parentId;
	}

}
