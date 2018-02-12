package au.com.woolworths.portal.model;

import java.util.ArrayList;
import java.util.List;

import org.codehaus.jackson.annotate.JsonProperty;

public class InStorePromoArticleISDInfoList {
	
	@JsonProperty("inStorePromoArticleISDInfo")
	private ArrayList<InStorePromoArticleISDInfo> inStorePromoArticleISDInfo;

	public ArrayList<InStorePromoArticleISDInfo> getInStorePromoArticleISDInfo() {
		return inStorePromoArticleISDInfo;
	}

	public void setInStorePromoArticleISDInfo(
			ArrayList<InStorePromoArticleISDInfo> inStorePromoArticleISDInfo) {
		this.inStorePromoArticleISDInfo = inStorePromoArticleISDInfo;
	}
	
	
	
}
