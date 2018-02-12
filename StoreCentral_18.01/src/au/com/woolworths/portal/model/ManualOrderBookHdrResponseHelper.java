package au.com.woolworths.portal.model;

import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class ManualOrderBookHdrResponseHelper {

	@JsonProperty("results")
	private List<ManualOrderBookHdrDtl> manualOrderBookHdrDtlList;

	public List<ManualOrderBookHdrDtl> getManualOrderBookHdrDtlList() {
		return manualOrderBookHdrDtlList;
	}

	public void setManualOrderBookHdrDtlList(
			List<ManualOrderBookHdrDtl> manualOrderBookHdrDtlList) {
		this.manualOrderBookHdrDtlList = manualOrderBookHdrDtlList;
	}

}
