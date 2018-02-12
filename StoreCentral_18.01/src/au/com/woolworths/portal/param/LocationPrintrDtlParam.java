package au.com.woolworths.portal.param;

import java.awt.image.BufferedImage;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class LocationPrintrDtlParam{

	@JsonProperty("iv_shop_desc")
	private String shopField;

	@JsonProperty("iv_shop_count")
	private String shopCount;

	@JsonProperty("iv_barcode")
	private String barcode;

	private BufferedImage logo;
	
	public String getShopField() {
		return shopField;
	}

	public void setShopField(String shopField) {
		this.shopField = shopField;
	}

	public String getShopCount() {
		return shopCount;
	}

	public void setShopCount(String shopCount) {
		this.shopCount = shopCount;
	}

	public String getBarcode() {
		return barcode;
	}

	public void setBarcode(String barcode) {
		this.barcode = barcode;
	}

	public BufferedImage getLogo() {
		return logo;
	}

	public void setLogo(BufferedImage logo) {
		this.logo = logo;
	}

}
