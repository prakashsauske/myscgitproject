package au.com.woolworths.portal.reports;

import net.sf.jasperreports.engine.JRScriptletException;

public class ManualPromoScriptlet extends ScriptletUtil {
	@Override
	public void afterReportInit() throws JRScriptletException {
		this.setVariableValue("groupFooterDisplay", new Boolean(false));
	}
	@Override
	public void beforeGroupInit(String arg0) throws JRScriptletException {
		if("VoucherValGrp".equalsIgnoreCase(arg0)) {
			this.setVariableValue("groupFooterDisplay", new Boolean(false));
		}
	}
	@Override
	public void afterDetailEval() throws JRScriptletException {
		Boolean isRecordDisplayed = (Boolean)this.getVariableValue("evalFilter");
		Boolean alreadySet = (Boolean)this.getVariableValue("groupFooterDisplay");
		if(isRecordDisplayed == true && alreadySet == false) {
			this.setVariableValue("groupFooterDisplay", new Boolean(true));
		}
	}
}
