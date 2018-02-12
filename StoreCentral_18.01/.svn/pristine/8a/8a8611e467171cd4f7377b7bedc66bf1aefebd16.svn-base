package au.com.woolworths.portal.model;

import org.codehaus.jackson.annotate.JsonIgnoreProperties;
import org.codehaus.jackson.annotate.JsonProperty;

@JsonIgnoreProperties(ignoreUnknown = true)
public class TobaccoPricing {
	
	@JsonProperty("brand_desc")
	private String brand;
	
	@JsonProperty("master_size")
	private String size;
	
	@JsonProperty("pack_price")
	private String pack;
	
	@JsonProperty("car_price")
	private String carton;
	
	@JsonProperty("sort_seq")
	private Integer sort;

	
	public TobaccoPricing(String brand, String size, String pack, String carton,int i) {
		super();
		this.brand = brand;
		this.size = size;
		this.pack = pack;
		this.carton = carton;
		this.sort=i;
	}

	public TobaccoPricing(String brand, String size, String pack,
			String carton, String pageNo, String id) {
		super();
		this.brand = brand;
		this.size = size;
		this.pack = pack;
		this.carton = carton;	
	}

	public TobaccoPricing() {
		super();
	}

	
	public Integer getSort() {
		return sort;
	}

	public void setSort(Integer sort) {
		this.sort = sort;
	}

	public String getBrand() {
		return brand;
	}

	public void setBrand(String brand) {
		this.brand = brand;
	}

	public String getSize() {
		return size;
	}

	public void setSize(String size) {
		this.size = size;
	}

	public String getPack() {
		return pack;
	}

	public void setPack(String pack) {
		this.pack = pack;
	}

	public String getCarton() {
		return carton;
	}

	public void setCarton(String carton) {
		this.carton = carton;
	}
	
	

}
