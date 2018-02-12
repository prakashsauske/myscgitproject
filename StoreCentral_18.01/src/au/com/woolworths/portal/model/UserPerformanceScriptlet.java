package au.com.woolworths.portal.model;

import net.sf.jasperreports.engine.JRScriptletException;
import au.com.woolworths.portal.util.ScriptletUtil;
import au.com.woolworths.portal.util.TimeAcumm;

public class UserPerformanceScriptlet extends ScriptletUtil {
	TimeAcumm totalDuration = new TimeAcumm();
	@Override
	public void afterDetailEval() throws JRScriptletException {
		String duration = (String)this.getFieldValue("duration_final");
		totalDuration.incrementFromFormattedString(duration);
	}
	@Override
	public void beforeGroupInit(java.lang.String groupName)throws JRScriptletException {
		totalDuration = new TimeAcumm();
	}
	public String getSumDuration() throws JRScriptletException {
		System.out.println("getSumDuration "+ this.totalDuration);
		return totalDuration.toString();
	}
}
