package au.com.woolworths.portal.pos.model;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import net.sf.jasperreports.engine.JRScriptletException;
import au.com.woolworths.portal.reports.ScriptletUtil;

public class PaidInPaidOutScriptlet extends ScriptletUtil {
	//PaidInPaidOutGrpFtrAggrBean bean = new PaidInPaidOutScriptlet();
	private final Map<String, PaidInPaidOutGrpFtrAggrBean> instances = new HashMap<String, PaidInPaidOutGrpFtrAggrBean>();
	@Override
	public void beforeGroupInit(String arg0) throws JRScriptletException {
		if("groupByType".equalsIgnoreCase(arg0)) {
			instances.clear();
		}
		
	}
	@Override
	public void afterDetailEval() throws JRScriptletException {
		String tenderType = (String)this.getFieldValue("tenderType");
		Double payInPayOut = (Double)this.getVariableValue("payInPayOut");
		acumulateTenderTotalAmt(tenderType, payInPayOut);
		
	};
	public void acumulateTenderTotalAmt(String tenderType, double amount) {
		PaidInPaidOutGrpFtrAggrBean tmp = null;
		if(instances.containsKey(tenderType)) {
			tmp = instances.get(tenderType);
			tmp.setAmount(tmp.getAmount()+amount);
		}
		else {
			tmp = new PaidInPaidOutGrpFtrAggrBean(tenderType, amount);
			instances.put(tenderType, tmp);
		}
	}	
	
	@Override
	public void afterGroupInit(String arg0) throws JRScriptletException {
	}
	public String decodeGroupType(String groupType) {
		if(isNotNullNotEmptyNotWhiteSpace(groupType)) {
			return groupType.matches("PAIN|TAPI")?"Paid In":groupType.matches("POUT|TAPO")?"Paid Out":null;
		}
		return null;
	}
	public Double getPaidInPaidOutAmt(String groupType, String paidIn, String paidOut) {
		String type = decodeGroupType(groupType);
		try {
			if("Paid In".equals(type)) {
				return Double.parseDouble(paidIn);
			}
			else if("Paid Out".equals(type)) {
				return Double.parseDouble(paidOut);
			}			
		} catch (Exception e) {
			return 0.0;
		}
		return 0.0;
	}
	public List<PaidInPaidOutGrpFtrAggrBean> getTenderTypeGroups() {
		List<PaidInPaidOutGrpFtrAggrBean> beans =
			    new ArrayList<PaidInPaidOutGrpFtrAggrBean>(instances.values());
       return beans;
	}
}
