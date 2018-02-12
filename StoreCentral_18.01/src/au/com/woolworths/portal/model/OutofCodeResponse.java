package au.com.woolworths.portal.model;

import java.util.ArrayList;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class OutofCodeResponse {

	@JsonProperty("DATE_RANGE")
	private ArrayList<OutofCodeResultResponseHelper> outofCodeResultResponseHelper;
	
	@JsonProperty("ACTION_TODAY")
	private ArrayList<OutofCodeResultResponseHelper> outofCodeResultResponseHelperToday;

	/**
	 * @return the outofCodeResultResponseHelper
	 */
	public ArrayList<OutofCodeResultResponseHelper> getOutofCodeResultResponseHelper() {
		return outofCodeResultResponseHelper;
	}

	/**
	 * @param outofCodeResultResponseHelper the outofCodeResultResponseHelper to set
	 */
	public void setOutofCodeResultResponseHelper(
			ArrayList<OutofCodeResultResponseHelper> outofCodeResultResponseHelper) {
		this.outofCodeResultResponseHelper = outofCodeResultResponseHelper;
	}

	/**
	 * @return the outofCodeResultResponseHelperToday
	 */
	public ArrayList<OutofCodeResultResponseHelper> getOutofCodeResultResponseHelperToday() {
		return outofCodeResultResponseHelperToday;
	}

	/**
	 * @param outofCodeResultResponseHelperToday the outofCodeResultResponseHelperToday to set
	 */
	public void setOutofCodeResultResponseHelperToday(
			ArrayList<OutofCodeResultResponseHelper> outofCodeResultResponseHelperToday) {
		this.outofCodeResultResponseHelperToday = outofCodeResultResponseHelperToday;
	}

	



	

	
}
