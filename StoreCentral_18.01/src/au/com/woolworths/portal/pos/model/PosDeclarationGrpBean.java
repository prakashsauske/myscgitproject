package au.com.woolworths.portal.pos.model;

import java.util.List;

public class PosDeclarationGrpBean {
	private boolean operatorName;
	private List<POSDeclarationDtl> posDeclaration;
	public boolean isOperatorName() {
		return operatorName;
	}
	public void setOperatorName(boolean operatorName) {
		this.operatorName = operatorName;
	}
	public List<POSDeclarationDtl> getPosDeclaration() {
		return posDeclaration;
	}
	public void setPosDeclaration(List<POSDeclarationDtl> posDeclaration) {
		this.posDeclaration = posDeclaration;
	}

}
