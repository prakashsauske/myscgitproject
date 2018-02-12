package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class ArticleHierarchyRelation {
	@JsonProperty("article")
	private String articleNo;
	@JsonProperty("con_prod_grp_hier")
	private String consumerProductGroupHierarchy;
	@JsonProperty("id")
	private String id;
	@JsonProperty("parent_con_prod_grp")
	private String parentConsumerProductGroup;
	@JsonProperty("parent_con_prod_grp_desc")
	private String parentConsumerProductGroupDesc;
	@JsonProperty("start_date")
	private String startDate;
	@JsonProperty("end_date")
	private String endDate;

	public String getArticleNo() {
		return articleNo;
	}

	public void setArticleNo(String articleNo) {
		this.articleNo = articleNo;
	}

	public String getConsumerProductGroupHierarchy() {
		return consumerProductGroupHierarchy;
	}

	public void setConsumerProductGroupHierarchy(
			String consumerProductGroupHierarchy) {
		this.consumerProductGroupHierarchy = consumerProductGroupHierarchy;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getParentConsumerProductGroup() {
		return parentConsumerProductGroup;
	}

	public void setParentConsumerProductGroup(String parentConsumerProductGroup) {
		this.parentConsumerProductGroup = parentConsumerProductGroup;
	}

	public String getParentConsumerProductGroupDesc() {
		return parentConsumerProductGroupDesc;
	}

	public void setParentConsumerProductGroupDesc(
			String parentConsumerProductGroupDesc) {
		this.parentConsumerProductGroupDesc = parentConsumerProductGroupDesc;
	}

	public String getStartDate() {
		if (this.startDate != null) {
			String result = PortalUtil.convertToStandard(startDate);
			if (result != null && result != "")
				return result;
		}
		return startDate;
	}

	public void setStartDate(String startDate) {
		this.startDate = startDate;
	}

	public String getEndDate() {
		if (this.endDate != null) {
			String result = PortalUtil.convertToStandard(endDate);
			if (result != null && result != "")
				return result;
		}
		return endDate;
	}

	public void setEndDate(String endDate) {
		this.endDate = endDate;
	}

}
