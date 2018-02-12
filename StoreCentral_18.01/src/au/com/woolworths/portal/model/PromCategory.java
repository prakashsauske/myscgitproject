package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class PromCategory {

	@JsonProperty("nodeId")
	private String nodeId;

	@JsonProperty("parentNodeId")
	private String parentNodeId;

	@JsonProperty("nodeDesc")
	private String nodeDesc;

	public PromCategory(String nodeId, String nodeDesc, String parentNodeId) {
		super();
		this.nodeId = nodeId;
		this.nodeDesc = nodeDesc;
		this.parentNodeId = parentNodeId;

	}

	public PromCategory() {
	}

	public String getNodeId() {
		return nodeId;
	}

	public void setNodeId(String nodeId) {
		this.nodeId = nodeId;
	}

	public String getParentNodeId() {
		return parentNodeId;
	}

	public void setParentNodeId(String parentNodeId) {
		this.parentNodeId = parentNodeId;
	}

	public String getNodeDesc() {
		return nodeDesc;
	}

	public void setNodeDesc(String nodeDesc) {
		this.nodeDesc = nodeDesc;
	}

}
