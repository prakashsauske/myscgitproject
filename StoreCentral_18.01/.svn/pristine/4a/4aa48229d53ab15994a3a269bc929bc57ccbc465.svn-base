package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

import au.com.woolworths.portal.util.PortalUtil;

@JsonIgnoreProperties(ignoreUnknown = true)
public class SohAdjustLogModel {

	@JsonProperty("mvmt_type")
	private String mvmtType;

	@JsonProperty("mvmt_type_desc")
	private String mvmtTypeDesc;

	@JsonProperty("reason_code_name")
	private String reasonCodeName;

	@JsonProperty("reason_code")
	private String outputReasonCode;

	@JsonProperty("adjustment_time")
	private String adjustmentTime;

	@JsonProperty("adjustment_date")
	private String adjustmentDate;

	@JsonProperty("adjustment_value")
	private String adjustmentValue;

	@JsonProperty("iv_site")
	private String siteNo;

	@JsonProperty("iv_date_from")
	private String fromDate;

	@JsonProperty("iv_mvmt_type")
	private String inputMvmtType;

	@JsonProperty("user_id")
	private String userId;

	@JsonProperty("iv_reason_code")
	private String reasonCode;

	@JsonProperty("end_soh")
	private String endSoh;

	@JsonProperty("adjustment_qty")
	private String adjustmentQuantity;

	@JsonProperty("article_no")
	private String articleNo;

	@JsonProperty("iv_date_to")
	private String toDate;

	@JsonProperty("article_desc")
	private String articleDesc;

	@JsonProperty("user_name")
	private String userName;

	@JsonProperty("iv_parent_node")
	private String parentNode;

	@JsonProperty("msg")
	private String message;

	@JsonProperty("iv_article")
	private String inputArticleNo;

	@JsonProperty("dept_id")
	private String deptId;

	@JsonProperty("dept_name")
	private String deptName;

	@JsonProperty("uom")
	private String uom;

	public String getMvmtTypeDesc() {
		return mvmtTypeDesc;
	}

	public void setMvmtTypeDesc(String mvmtTypeDesc) {
		this.mvmtTypeDesc = mvmtTypeDesc;
	}

	public String getInputMvmtType() {
		return inputMvmtType;
	}

	public void setInputMvmtType(String inputMvmtType) {
		this.inputMvmtType = inputMvmtType;
	}

	public String getAdjustmentTime() {
		return adjustmentTime;
	}

	public void setAdjustmentTime(String adjustmentTime) {
		this.adjustmentTime = adjustmentTime;
	}

	public String getAdjustmentDate() {
		if (this.adjustmentDate != null) {
			String result = PortalUtil.convertToStandard(adjustmentDate);
			if (result != null && result != "")
				return result;
		}
		return adjustmentDate;
	}

	public void setAdjustmentDate(String adjustmentDate) {
		this.adjustmentDate = adjustmentDate;
	}

	public String getAdjustmentValue() {
		return adjustmentValue;
	}

	public void setAdjustmentValue(String adjustmentValue) {
		this.adjustmentValue = adjustmentValue;
	}

	public String getSiteNo() {
		return siteNo;
	}

	public void setSiteNo(String siteNo) {
		this.siteNo = siteNo;
	}

	public String getFromDate() {
		if (this.fromDate != null) {
			String result = PortalUtil.convertToStandard(fromDate);
			if (result != null && result != "")
				return result;
		}
		return fromDate;
	}

	public void setFromDate(String fromDate) {
		this.fromDate = fromDate;
	}

	public String getMvmtType() {
		return mvmtType;
	}

	public void setMvmtType(String mvmtType) {
		this.mvmtType = mvmtType;
	}

	public String getUserId() {
		return userId;
	}

	public void setUserId(String userId) {
		this.userId = userId;
	}

	public String getReasonCode() {
		return reasonCode;
	}

	public void setReasonCode(String reasonCode) {
		this.reasonCode = reasonCode;
	}

	public String getEndSoh() {
		if (this.uom != null) {
			if (!this.uom.equalsIgnoreCase("kg")) {
				Double temp = Double.parseDouble(this.endSoh.trim());
				temp = temp / 1;
				int soh = temp.intValue();

				this.endSoh = String.valueOf(soh);

			}
		}
		return endSoh;
	}

	public void setEndSoh(String endSoh) {
		this.endSoh = endSoh;
	}

	public String getAdjustmentQuantity() {
		if (this.uom != null) {
			if (!this.uom.equalsIgnoreCase("kg")) {
				Double temp = Double
						.parseDouble(this.adjustmentQuantity.trim());
				temp = temp / 1;
				int soh = temp.intValue();

				this.adjustmentQuantity = String.valueOf(soh);

			}
		}
		return adjustmentQuantity;
	}

	public void setAdjustmentQuantity(String adjustmentQuantity) {
		this.adjustmentQuantity = adjustmentQuantity;
	}

	public String getArticleNo() {
		if (articleNo != null) {
			// //System.out.println("**** BEAN "
			// + articleNo.replaceFirst("^0+(?!$)", ""));
			articleNo = articleNo.replaceFirst("^0+(?!$)", "");
		}
		return articleNo;
	}

	public void setArticleNo(String articleNo) {

		if (articleNo != null) {
			articleNo = articleNo.replaceFirst("^0+(?!$)", "");
		}
		this.articleNo = articleNo;
	}

	public String getToDate() {
		if (this.toDate != null) {
			String result = PortalUtil.convertToStandard(toDate);
			if (result != null && result != "")
				return result;
		}
		return toDate;
	}

	public void setToDate(String toDate) {
		this.toDate = toDate;
	}

	public String getArticleDesc() {
		return articleDesc;
	}

	public void setArticleDesc(String articleDesc) {
		this.articleDesc = articleDesc;
	}

	public String getUserName() {
		return userName;
	}

	public void setUserName(String userName) {
		this.userName = userName;
	}

	public String getParentNode() {
		return parentNode;
	}

	public void setParentNode(String parentNode) {
		this.parentNode = parentNode;
	}

	public String getMessage() {
		return message;
	}

	public void setMessage(String message) {
		this.message = message;
	}

	public String getInputArticleNo() {
		return inputArticleNo;
	}

	public void setInputArticleNo(String inputArticleNo) {
		this.inputArticleNo = inputArticleNo;
	}

	public String getDeptId() {
		return deptId;
	}

	public void setDeptId(String deptId) {
		this.deptId = deptId;
	}

	public String getDeptName() {
		return deptName;
	}

	public void setDeptName(String deptName) {
		this.deptName = deptName;
	}

	public String getReasonCodeName() {
		return reasonCodeName;
	}

	public void setReasonCodeName(String reasonCodeName) {
		this.reasonCodeName = reasonCodeName;
	}

	public String getOutputReasonCode() {
		return outputReasonCode;
	}

	public void setOutputReasonCode(String outputReasonCode) {
		this.outputReasonCode = outputReasonCode;
	}

	public String getUom() {
		return uom;
	}

	public void setUom(String uom) {
		this.uom = uom;
	}

}
