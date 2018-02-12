package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class MovementTypeResponseHelper {

	@JsonProperty("results")
	private List<MovementType> mvmtTypeList;

	@JsonProperty("results")
	public List<MovementType> getMvmtTypeList() {
		return mvmtTypeList;
	}

	@JsonProperty("results")
	public void setMvmtTypeList(List<MovementType> mvmtTypeList) {
		this.mvmtTypeList = mvmtTypeList;
	}

}
