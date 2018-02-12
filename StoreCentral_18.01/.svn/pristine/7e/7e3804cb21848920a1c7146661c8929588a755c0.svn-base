package au.com.woolworths.portal.pos.model;

import java.util.ArrayList;
import java.util.LinkedHashSet;
import java.util.List;

import net.sf.jasperreports.engine.JRScriptletException;
import au.com.woolworths.portal.reports.ScriptletUtil;

public class PosConsolidationScriptlet extends ScriptletUtil {
	private double openingLoan;
	private final LinkedHashSet<POSConsolidationAggrBean> set = new LinkedHashSet<POSConsolidationAggrBean>();
	/**
	 * A clumsy logic, But I could not find a better way than this.
	 * @return
	 * @throws JRScriptletException
	 */
	public String evalTenderTypeGrpFooterBand(String tenderTypeT) throws JRScriptletException {
		POSConsolidationAggrBean obj = new POSConsolidationAggrBean();
		obj.setTenderTypeT(tenderTypeT);
		obj.setOpeningLoan(((Double)this.getVariableValue("openingLoan")).doubleValue());
		obj.setSalesTender(((Double)this.getVariableValue("salesTender")).doubleValue());
		obj.setTenderLoan(((Double)this.getVariableValue("tenderLoan")).doubleValue());
		obj.setBorrowedFunds(((Double)this.getVariableValue("borrowedFunds")).doubleValue());

		obj.setPaidIns(((Double)this.getVariableValue("paidIns")).doubleValue());
		obj.setPaidOuts(((Double)this.getVariableValue("paidOuts")).doubleValue());
		obj.setPickUps(((Double)this.getVariableValue("pickUps")).doubleValue());
		obj.setExpectedFunds(((Double)this.getVariableValue("expectedFunds")).doubleValue());
		set.add(obj);
		return tenderTypeT;
	}
	public List<POSConsolidationAggrBean> getPosConsAggregation() {
		return new ArrayList<POSConsolidationAggrBean>(set);
	}
	@Override
	public void beforeDetailEval() throws JRScriptletException {
		String sttlInd = (String)this.getFieldValue("sttlIndicator");
		String openLn = (String)this.getFieldValue("openingLoan");
		double openLnDbl = 0.0;
		try {
			openLnDbl = Double.parseDouble(openLn);
		}
		catch(Exception e) {
			
		}
		if("STTL".equals(sttlInd)) {
			openingLoan = openLnDbl;
			this.setVariableValue("openingLoan", openLnDbl);
		}
	}
	@Override
	public void beforeGroupInit(String arg0) throws JRScriptletException {
		if("GroupTenderType".equalsIgnoreCase(arg0)) {
			openingLoan = 0.0;
		}
	}
	
	public double getOpeningLoan() {
		return openingLoan;
	}
	public void setOpeningLoan(double openingLoan) {
		this.openingLoan = openingLoan;
	}

}
