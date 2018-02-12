package au.com.woolworths.portal.pos.model;

import net.sf.jasperreports.engine.JRScriptletException;
import au.com.woolworths.portal.reports.ScriptletUtil;

public class PaidInPaidOutGrpFtrScriptlet extends ScriptletUtil {
	public String groupFooterFirstRow() throws JRScriptletException {
		Integer payInPayOut = (Integer)this.getVariableValue("REPORT_COUNT");
		String groupName = (String)this.getParameterValue("groupName");
		if(payInPayOut.intValue()==1) {
			return "Paid In".equals(groupName)?"TOTAL PAID IN'S":"Paid Out".equals(groupName)?"TOTAL PAID OUT'S":null;
		}
		return null;
	}
}
