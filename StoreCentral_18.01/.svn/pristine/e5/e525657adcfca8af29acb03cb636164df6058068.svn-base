package au.com.woolworths.portal.pos.model;

import net.sf.jasperreports.engine.JRScriptletException;
import au.com.woolworths.portal.reports.ScriptletUtil;
import au.com.woolworths.portal.util.TimeAcumm;

public class StorePerformanceScriptlet extends ScriptletUtil {
	TimeAcumm tenderPerCust = new TimeAcumm();
	TimeAcumm idlePerCust = new TimeAcumm();
	TimeAcumm totalSecure = new TimeAcumm();
	@Override
	public void afterDetailEval() throws JRScriptletException {
		String tenderP_CustFormatted = (String)this.getFieldValue("tenderP_CustFormatted");
		tenderPerCust.incrementFromFormattedString(tenderP_CustFormatted);
		String idleTimeFormatted = (String)this.getFieldValue("idleTimeFormatted");
		idlePerCust.incrementFromFormattedString(idleTimeFormatted);
		String sercureTimeFormatted = (String)this.getFieldValue("sercureTimeFormatted");
		totalSecure.incrementFromFormattedString(sercureTimeFormatted);
	}
	public String getAvgTenderPerCust() throws JRScriptletException {
		int totalRec = (Integer)this.getVariableValue("REPORT_COUNT");
		tenderPerCust.divideBy(totalRec);
		return tenderPerCust.toString();
	}
	public String getAvgIdlePerCust() throws JRScriptletException {
		int totalRec = (Integer)this.getVariableValue("REPORT_COUNT");
		idlePerCust.divideBy(totalRec);
		return idlePerCust.toString();
	}
	public String getAvgTotalSecure() throws JRScriptletException {
		int totalRec = (Integer)this.getVariableValue("REPORT_COUNT");
		totalSecure.divideBy(totalRec);
		return totalSecure.toString();
	}
	public String getSumTenderPerCust() throws JRScriptletException {
		return tenderPerCust.toString();
	}
	public String getSumIdlePerCust() throws JRScriptletException {
		return idlePerCust.toString();
	}
	public String getSumTotalSecure() throws JRScriptletException {
		return totalSecure.toString();
	}
}
