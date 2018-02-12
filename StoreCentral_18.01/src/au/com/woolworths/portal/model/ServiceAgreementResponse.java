package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonProperty;

public class ServiceAgreementResponse {

	@JsonProperty("d")
	private ServiceAgreementDtlResponseHelper serviceAgreementDtlResponseHelper;

	public ServiceAgreementDtlResponseHelper getServiceAgreementDtlResponseHelper() {
		return serviceAgreementDtlResponseHelper;
	}

	public void setServiceAgreementDtlResponseHelper(
			ServiceAgreementDtlResponseHelper serviceAgreementDtlResponseHelper) {
		this.serviceAgreementDtlResponseHelper = serviceAgreementDtlResponseHelper;
	}

}
