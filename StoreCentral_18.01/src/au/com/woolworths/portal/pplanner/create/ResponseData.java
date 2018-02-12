
package au.com.woolworths.portal.pplanner.create;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;

import org.codehaus.jackson.annotate.JsonProperty;


/**
 * <p>Java class for ResponseData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="ResponseData">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="site" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="article" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="transDate" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="promoPrice" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="errorMsg" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sunDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="monDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tueDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="wedDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="thuDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="friDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="satDemand" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastSunSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastMonSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastTueSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastWedSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastThuSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastFriSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastSatSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sunSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="monSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tueSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="wedSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="thuSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="friSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="satSale" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastSunRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastMonRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastTueRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastWedRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastThuRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastFriRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastSatRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sunRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="monRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tueRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="wedRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="thuRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="friRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="satRTC" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastSunPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastMonPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastTuePromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastWedPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastThuPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastFriPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="lastSatPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sunPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="monPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="tuePromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="wedPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="thuPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="friPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="satPromInd" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="plannerType" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="firstSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="secSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="thirdSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fourthSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="fifthSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="sixthSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="seventhSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="minceSlotPct" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "ResponseData", namespace = "http://service.replenishment.woolworths.com.au/schema", propOrder = {
	"day",
    "site",
    "article",
    "rtc",
    "sales",
    "promoInd",
    "requestType",
    "requestField",
    "transDate",
    "promoPrice",
    "errorMsg",
    "sunDemand",
    "monDemand",
    "tueDemand",
    "wedDemand",
    "thuDemand",
    "friDemand",
    "satDemand",
    "lastSunSale",
    "lastMonSale",
    "lastTueSale",
    "lastWedSale",
    "lastThuSale",
    "lastFriSale",
    "lastSatSale",
    "sunSale",
    "monSale",
    "tueSale",
    "wedSale",
    "thuSale",
    "friSale",
    "satSale",
    "lastSunRTC",
    "lastMonRTC",
    "lastTueRTC",
    "lastWedRTC",
    "lastThuRTC",
    "lastFriRTC",
    "lastSatRTC",
    "sunRTC",
    "monRTC",
    "tueRTC",
    "wedRTC",
    "thuRTC",
    "friRTC",
    "satRTC",
    "lastSunPromInd",
    "lastMonPromInd",
    "lastTuePromInd",
    "lastWedPromInd",
    "lastThuPromInd",
    "lastFriPromInd",
    "lastSatPromInd",
    "sunPromInd",
    "monPromInd",
    "tuePromInd",
    "wedPromInd",
    "thuPromInd",
    "friPromInd",
    "satPromInd",
    "demand",
    "plannerType",
    "firstSlotPct",
    "secSlotPct",
    "thirdSlotPct",
    "fourthSlotPct",
    "fifthSlotPct",
    "sixthSlotPct",
    "seventhSlotPct",
    "minceMornSlotPct",
    "minceEvenSlotPct",
    "country",
    "requiredQty"
})
public class ResponseData {

    @JsonProperty("site")
	@XmlElement(required = true)
    protected String site;
    
    @JsonProperty("article")
    @XmlElement(required = true)
    protected String article;
    
    @JsonProperty("transDate")
    @XmlElement(required = true)
    protected String transDate;
    
    @JsonProperty("promoPrice")
    protected String promoPrice;
    
    @JsonProperty("rtc")
    protected String rtc;
    
    public String getRtc() {
		return rtc;
	}

	public void setRtc(String rtc) {
		this.rtc = rtc;
	}

	public String getSales() {
		return sales;
	}

	public void setSales(String sales) {
		this.sales = sales;
	}

	public String getPromoInd() {
		return promoInd;
	}

	public void setPromoInd(String promoInd) {
		this.promoInd = promoInd;
	}
	
	@JsonProperty("sales")
	protected String sales;
    
	@JsonProperty("promoInd")
    protected String promoInd;
    
    @JsonProperty("requestType")
    protected String requestType;
    
    public String getRequestType() {
		return requestType;
	}

	public void setRequestType(String requestType) {
		this.requestType = requestType;
	}

	public String getRequestField() {
		return requestField;
	}

	public void setRequestField(String requestField) {
		this.requestField = requestField;
	}

	protected String requestField;
    
    @JsonProperty("errorMsg")
    protected String errorMsg;
    
    @JsonProperty("sunDemand")
    protected String sunDemand = "";
    
    @JsonProperty("monDemand")
    protected String monDemand = "";
    
    @JsonProperty("tueDemand")
    protected String tueDemand = "";
    
    @JsonProperty("wedDemand")
    protected String wedDemand = "";
    
    @JsonProperty("thuDemand")
    protected String thuDemand = "";
    
    @JsonProperty("friDemand")
    protected String friDemand = "";
    
    @JsonProperty("satDemand")
    protected String satDemand = "";
    
    @JsonProperty("lastSunSale")
    protected String lastSunSale = "";
    
    @JsonProperty("lastMonSale")
    protected String lastMonSale = "";
    
    @JsonProperty("lastTueSale")
    protected String lastTueSale = "";
    
    @JsonProperty("lastWedSale")
    protected String lastWedSale = "";
    
    @JsonProperty("lastThuSale")
    protected String lastThuSale = "";
    
    @JsonProperty("lastFriSale")
    protected String lastFriSale = "";
    
    @JsonProperty("lastSatSale")
    protected String lastSatSale = "";
    
    @JsonProperty("sunSale")
    protected String sunSale = "";
    
    @JsonProperty("monSale")
    protected String monSale = "";
    
    @JsonProperty("tueSale")
    protected String tueSale = "";
    
    @JsonProperty("wedSale")
    protected String wedSale = "";
    
    @JsonProperty("thuSale")
    protected String thuSale = "";
    
    @JsonProperty("friSale")
    protected String friSale = "";
    
    @JsonProperty("satSale")
    protected String satSale = "";
    
    @JsonProperty("lastSunRTC")
    protected String lastSunRTC = "";
    
    @JsonProperty("lastMonRTC")
    protected String lastMonRTC = "";
    
    @JsonProperty("lastTueRTC")
    protected String lastTueRTC = "";
    
    @JsonProperty("lastWedRTC")
    protected String lastWedRTC = "";
    
    @JsonProperty("lastThuRTC")
    protected String lastThuRTC = "";
    
    @JsonProperty("lastFriRTC")
    protected String lastFriRTC = "";
    
    @JsonProperty("lastSatRTC")
    protected String lastSatRTC = "";
    
    @JsonProperty("sunRTC")
    protected String sunRTC = "";
    
    @JsonProperty("monRTC")
    protected String monRTC = "";
    
    @JsonProperty("tueRTC")
    protected String tueRTC = "";
    
    @JsonProperty("wedRTC")
    protected String wedRTC = "";
    
    @JsonProperty("thuRTC")
    protected String thuRTC = "";
    
    @JsonProperty("friRTC")
    protected String friRTC = "";
    
    @JsonProperty("satRTC")
    protected String satRTC = "";
    
    @JsonProperty("lastSunPromInd")
    protected String lastSunPromInd;
    
    @JsonProperty("lastMonPromInd")
    protected String lastMonPromInd;
    
    @JsonProperty("lastTuePromInd")
    protected String lastTuePromInd;
    
    @JsonProperty("lastWedPromInd")
    protected String lastWedPromInd;
    
    @JsonProperty("lastThuPromInd")
    protected String lastThuPromInd;
    
    @JsonProperty("lastFriPromInd")
    protected String lastFriPromInd;
    
    @JsonProperty("lastSatPromInd")
    protected String lastSatPromInd;
    
    @JsonProperty("sunPromInd")
    protected String sunPromInd;
    
    @JsonProperty("monPromInd")
    protected String monPromInd;
    
    @JsonProperty("tuePromInd")
    protected String tuePromInd;
    
    @JsonProperty("wedPromInd")
    protected String wedPromInd;
    
    @JsonProperty("thuPromInd")
    protected String thuPromInd;
    
    @JsonProperty("friPromInd")
    protected String friPromInd;
    
    @JsonProperty("satPromInd")
    protected String satPromInd;
    
    @JsonProperty("demand")
    protected String demand;
    
    @JsonProperty("day")
    protected String day;
    
    @JsonProperty("plannerType")
    @XmlElement(required = true)
    protected String plannerType;
    
    @JsonProperty("firstSlotPct")
    protected String firstSlotPct;
    
    @JsonProperty("secSlotPct")
    protected String secSlotPct;
    
    @JsonProperty("thirdSlotPct")
    protected String thirdSlotPct;
    
    @JsonProperty("fourthSlotPct")
    protected String fourthSlotPct;
    
    @JsonProperty("fifthSlotPct")
    protected String fifthSlotPct;
    
    @JsonProperty("sixthSlotPct")
    protected String sixthSlotPct;
    
    @JsonProperty("seventhSlotPct")
    protected String seventhSlotPct;
    
    @JsonProperty("minceMornSlotPct")
    protected String minceMornSlotPct;
    
    @JsonProperty("minceEvenSlotPct")
    protected String minceEvenSlotPct;

    @JsonProperty("country")
    protected String country;
    
    @JsonProperty("requiredQty")
    protected String requiredQty;
    public String getRequiredQty() {
		return requiredQty;
	}
	public void setRequiredQty(String requiredQty) {
		this.requiredQty = requiredQty;
	}
    public String getDay() {
		return day;
	}

	public void setDay(String day) {
		this.day = day;
	}

	/**
     * Gets the value of the site property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSite() {
        return site;
    }

    public String getDemand() {
    	if(demand == null)
    		return "0";
		return demand;
	}

	public void setDemand(String demand) {
		this.demand = demand;
	}

	/**
     * Sets the value of the site property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSite(String value) {
        this.site = value;
    }

    /**
     * Gets the value of the article property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getArticle() {
        return article;
    }

    /**
     * Sets the value of the article property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setArticle(String value) {
        this.article = value;
    }

    /**
     * Gets the value of the transDate property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTransDate() {
        return transDate;
    }

    /**
     * Sets the value of the transDate property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTransDate(String value) {
        this.transDate = value;
    }

    /**
     * Gets the value of the promoPrice property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getPromoPrice() {
    	if(promoPrice == null)
    		return "0";
        return promoPrice;
    }

    /**
     * Sets the value of the promoPrice property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setPromoPrice(String value) {
        this.promoPrice = value;
    }

    /**
     * Gets the value of the errorMsg property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getErrorMsg() {
        return errorMsg;
    }

    /**
     * Sets the value of the errorMsg property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setErrorMsg(String value) {
        this.errorMsg = value;
    }

    /**
     * Gets the value of the sunDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSunDemand() {
    	if(sunDemand == null)
    		return "0";
        return sunDemand;
    }

    /**
     * Sets the value of the sunDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSunDemand(String value) {
        this.sunDemand = value;
    }

    /**
     * Gets the value of the monDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMonDemand() {
    	if(monDemand == null)
    		return "0";
        return monDemand;
    }

    /**
     * Sets the value of the monDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMonDemand(String value) {
        this.monDemand = value;
    }

    /**
     * Gets the value of the tueDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTueDemand() {
    	if(tueDemand == null)
    		return "0";
        return tueDemand;
    }

    /**
     * Sets the value of the tueDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTueDemand(String value) {
        this.tueDemand = value;
    }

    /**
     * Gets the value of the wedDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWedDemand() {
    	if(wedDemand == null)
    		return "0";
        return wedDemand;
    }

    /**
     * Sets the value of the wedDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWedDemand(String value) {
        this.wedDemand = value;
    }

    /**
     * Gets the value of the thuDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getThuDemand() {
    	if(thuDemand == null)
    		return "0";
        return thuDemand;
    }

    /**
     * Sets the value of the thuDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setThuDemand(String value) {
        this.thuDemand = value;
    }

    /**
     * Gets the value of the friDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFriDemand() {
    	if(friDemand == null)
    		return "0";
        return friDemand;
    }

    /**
     * Sets the value of the friDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFriDemand(String value) {
        this.friDemand = value;
    }

    /**
     * Gets the value of the satDemand property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSatDemand() {
    	if(satDemand == null)
    		return "0";
        return satDemand;
    }

    /**
     * Sets the value of the satDemand property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSatDemand(String value) {
        this.satDemand = value;
    }

    /**
     * Gets the value of the lastSunSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastSunSale() {
    	if(lastSunSale == null)
    		return "0";
        return lastSunSale;
    }

    /**
     * Sets the value of the lastSunSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastSunSale(String value) {
        this.lastSunSale = value;
    }

    /**
     * Gets the value of the lastMonSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastMonSale() {
    	if(lastMonSale == null)
    		return "0";
        return lastMonSale;
    }

    /**
     * Sets the value of the lastMonSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastMonSale(String value) {
        this.lastMonSale = value;
    }

    /**
     * Gets the value of the lastTueSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastTueSale() {
    	if(lastTueSale == null)
    		return "0";
        return lastTueSale;
    }

    /**
     * Sets the value of the lastTueSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastTueSale(String value) {
        this.lastTueSale = value;
    }

    /**
     * Gets the value of the lastWedSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastWedSale() {
    	if(lastWedSale == null)
    		return "0";
        return lastWedSale;
    }

    /**
     * Sets the value of the lastWedSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastWedSale(String value) {
        this.lastWedSale = value;
    }

    /**
     * Gets the value of the lastThuSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastThuSale() {
    	if(lastThuSale == null)
    		return "0";
        return lastThuSale;
    }

    /**
     * Sets the value of the lastThuSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastThuSale(String value) {
        this.lastThuSale = value;
    }

    /**
     * Gets the value of the lastFriSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastFriSale() {
    	if(lastFriSale == null)
    		return "0";
        return lastFriSale;
    }

    /**
     * Sets the value of the lastFriSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastFriSale(String value) {
        this.lastFriSale = value;
    }

    /**
     * Gets the value of the lastSatSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastSatSale() {
    	if(lastSatSale == null)
    		return "0";
        return lastSatSale;
    }

    /**
     * Sets the value of the lastSatSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastSatSale(String value) {
        this.lastSatSale = value;
    }

    /**
     * Gets the value of the sunSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSunSale() {
    	if(sunSale == null)
    		return "0";
        return sunSale;
    }

    /**
     * Sets the value of the sunSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSunSale(String value) {
        this.sunSale = value;
    }

    /**
     * Gets the value of the monSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMonSale() {
    	if(monSale == null)
    		return "0";
        return monSale;
    }

    /**
     * Sets the value of the monSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMonSale(String value) {
        this.monSale = value;
    }

    /**
     * Gets the value of the tueSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTueSale() {
    	if(tueSale == null)
    		return "0";
        return tueSale;
    }

    /**
     * Sets the value of the tueSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTueSale(String value) {
        this.tueSale = value;
    }

    /**
     * Gets the value of the wedSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWedSale() {
    	if(wedSale == null)
    		return "0";
        return wedSale;
    }

    /**
     * Sets the value of the wedSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWedSale(String value) {
        this.wedSale = value;
    }

    /**
     * Gets the value of the thuSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getThuSale() {
    	if(thuSale == null)
    		return "0";
        return thuSale;
    }

    /**
     * Sets the value of the thuSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setThuSale(String value) {
        this.thuSale = value;
    }

    /**
     * Gets the value of the friSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFriSale() {
    	if(friSale == null)
    		return "0";
        return friSale;
    }

    /**
     * Sets the value of the friSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFriSale(String value) {
        this.friSale = value;
    }

    /**
     * Gets the value of the satSale property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSatSale() {
    	if(satSale == null)
    		return "0";
        return satSale;
    }

    /**
     * Sets the value of the satSale property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSatSale(String value) {
        this.satSale = value;
    }

    /**
     * Gets the value of the lastSunRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastSunRTC() {
    	if(lastSunRTC == null)
    		return "0";
        return lastSunRTC;
    }

    /**
     * Sets the value of the lastSunRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastSunRTC(String value) {
        this.lastSunRTC = value;
    }

    /**
     * Gets the value of the lastMonRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastMonRTC() {
    	if(lastMonRTC == null)
    		return "0";
        return lastMonRTC;
    }

    /**
     * Sets the value of the lastMonRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastMonRTC(String value) {
        this.lastMonRTC = value;
    }

    /**
     * Gets the value of the lastTueRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastTueRTC() {
    	if(lastTueRTC == null)
    		return "0";
        return lastTueRTC;
    }

    /**
     * Sets the value of the lastTueRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastTueRTC(String value) {
        this.lastTueRTC = value;
    }

    /**
     * Gets the value of the lastWedRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastWedRTC() {
    	if(lastWedRTC == null)
    		return "0";
        return lastWedRTC;
    }

    /**
     * Sets the value of the lastWedRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastWedRTC(String value) {
        this.lastWedRTC = value;
    }

    /**
     * Gets the value of the lastThuRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastThuRTC() {
    	if(lastThuRTC == null)
    		return "0";
        return lastThuRTC;
    }

    /**
     * Sets the value of the lastThuRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastThuRTC(String value) {
        this.lastThuRTC = value;
    }

    /**
     * Gets the value of the lastFriRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastFriRTC() {
    	if(lastFriRTC == null)
    		return "0";
        return lastFriRTC;
    }

    /**
     * Sets the value of the lastFriRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastFriRTC(String value) {
        this.lastFriRTC = value;
    }

    /**
     * Gets the value of the lastSatRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastSatRTC() {
    	if(lastSatRTC == null)
    		return "0";
        return lastSatRTC;
    }

    /**
     * Sets the value of the lastSatRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastSatRTC(String value) {
        this.lastSatRTC = value;
    }

    /**
     * Gets the value of the sunRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSunRTC() {
    	if(sunRTC == null)
    		return "0";
        return sunRTC;
    }

    /**
     * Sets the value of the sunRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSunRTC(String value) {
        this.sunRTC = value;
    }

    /**
     * Gets the value of the monRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMonRTC() {
    	if(monRTC == null)
    		return "0";
        return monRTC;
    }

    /**
     * Sets the value of the monRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMonRTC(String value) {
        this.monRTC = value;
    }

    /**
     * Gets the value of the tueRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTueRTC() {
    	if(tueRTC == null)
    		return "0";
        return tueRTC;
    }

    /**
     * Sets the value of the tueRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTueRTC(String value) {
        this.tueRTC = value;
    }

    /**
     * Gets the value of the wedRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWedRTC() {
    	if(wedRTC == null)
    		return "0";
        return wedRTC;
    }

    /**
     * Sets the value of the wedRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWedRTC(String value) {
        this.wedRTC = value;
    }

    /**
     * Gets the value of the thuRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getThuRTC() {
    	if(thuRTC == null)
    		return "0";
        return thuRTC;
    }

    /**
     * Sets the value of the thuRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setThuRTC(String value) {
        this.thuRTC = value;
    }

    /**
     * Gets the value of the friRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFriRTC() {
    	if(friRTC == null)
    		return "0";
        return friRTC;
    }

    /**
     * Sets the value of the friRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFriRTC(String value) {
        this.friRTC = value;
    }

    /**
     * Gets the value of the satRTC property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSatRTC() {
    	if(satRTC == null)
    		return "0";
        return satRTC;
    }

    /**
     * Sets the value of the satRTC property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSatRTC(String value) {
        this.satRTC = value;
    }

    /**
     * Gets the value of the lastSunPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastSunPromInd() {
    	return lastSunPromInd;
    }

    /**
     * Sets the value of the lastSunPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastSunPromInd(String value) {
        this.lastSunPromInd = value;
    }

    /**
     * Gets the value of the lastMonPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastMonPromInd() {
        return lastMonPromInd;
    }

    /**
     * Sets the value of the lastMonPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastMonPromInd(String value) {
        this.lastMonPromInd = value;
    }

    /**
     * Gets the value of the lastTuePromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastTuePromInd() {
        return lastTuePromInd;
    }

    /**
     * Sets the value of the lastTuePromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastTuePromInd(String value) {
        this.lastTuePromInd = value;
    }

    /**
     * Gets the value of the lastWedPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastWedPromInd() {
        return lastWedPromInd;
    }

    /**
     * Sets the value of the lastWedPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastWedPromInd(String value) {
        this.lastWedPromInd = value;
    }

    /**
     * Gets the value of the lastThuPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastThuPromInd() {
        return lastThuPromInd;
    }

    /**
     * Sets the value of the lastThuPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastThuPromInd(String value) {
        this.lastThuPromInd = value;
    }

    /**
     * Gets the value of the lastFriPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastFriPromInd() {
        return lastFriPromInd;
    }

    /**
     * Sets the value of the lastFriPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastFriPromInd(String value) {
        this.lastFriPromInd = value;
    }

    /**
     * Gets the value of the lastSatPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getLastSatPromInd() {
        return lastSatPromInd;
    }

    /**
     * Sets the value of the lastSatPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setLastSatPromInd(String value) {
        this.lastSatPromInd = value;
    }

    /**
     * Gets the value of the sunPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSunPromInd() {
        return sunPromInd;
    }

    /**
     * Sets the value of the sunPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSunPromInd(String value) {
        this.sunPromInd = value;
    }

    /**
     * Gets the value of the monPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getMonPromInd() {
        return monPromInd;
    }

    /**
     * Sets the value of the monPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setMonPromInd(String value) {
        this.monPromInd = value;
    }

    /**
     * Gets the value of the tuePromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getTuePromInd() {
        return tuePromInd;
    }

    /**
     * Sets the value of the tuePromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setTuePromInd(String value) {
        this.tuePromInd = value;
    }

    /**
     * Gets the value of the wedPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getWedPromInd() {
        return wedPromInd;
    }

    /**
     * Sets the value of the wedPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setWedPromInd(String value) {
        this.wedPromInd = value;
    }

    /**
     * Gets the value of the thuPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getThuPromInd() {
        return thuPromInd;
    }

    /**
     * Sets the value of the thuPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setThuPromInd(String value) {
        this.thuPromInd = value;
    }

    /**
     * Gets the value of the friPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getFriPromInd() {
        return friPromInd;
    }

    /**
     * Sets the value of the friPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setFriPromInd(String value) {
        this.friPromInd = value;
    }

    /**
     * Gets the value of the satPromInd property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getSatPromInd() {
        return satPromInd;
    }

    /**
     * Sets the value of the satPromInd property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setSatPromInd(String value) {
        this.satPromInd = value;
    }

	public String getPlannerType() {
		return plannerType;
	}

	public void setPlannerType(String plannerType) {
		this.plannerType = plannerType;
	}

	public String getFirstSlotPct() {
		return firstSlotPct;
	}

	public void setFirstSlotPct(String firstSlotPct) {
		this.firstSlotPct = firstSlotPct;
	}

	public String getSecSlotPct() {
		return secSlotPct;
	}

	public void setSecSlotPct(String secSlotPct) {
		this.secSlotPct = secSlotPct;
	}

	public String getThirdSlotPct() {
		return thirdSlotPct;
	}

	public void setThirdSlotPct(String thirdSlotPct) {
		this.thirdSlotPct = thirdSlotPct;
	}

	public String getFourthSlotPct() {
		return fourthSlotPct;
	}

	public void setFourthSlotPct(String fourthSlotPct) {
		this.fourthSlotPct = fourthSlotPct;
	}

	public String getFifthSlotPct() {
		return fifthSlotPct;
	}

	public void setFifthSlotPct(String fifthSlotPct) {
		this.fifthSlotPct = fifthSlotPct;
	}

	public String getSixthSlotPct() {
		return sixthSlotPct;
	}

	public void setSixthSlotPct(String sixthSlotPct) {
		this.sixthSlotPct = sixthSlotPct;
	}

	public String getSeventhSlotPct() {
		return seventhSlotPct;
	}

	public void setSeventhSlotPct(String seventhSlotPct) {
		this.seventhSlotPct = seventhSlotPct;
	}

	public String getMinceMornSlotPct() {
		return minceMornSlotPct;
	}

	public void setMinceMornSlotPct(String minceMornSlotPct) {
		this.minceMornSlotPct = minceMornSlotPct;
	}

	public String getMinceEvenSlotPct() {
		return minceEvenSlotPct;
	}

	public void setMinceEvenSlotPct(String minceEvenSlotPct) {
		this.minceEvenSlotPct = minceEvenSlotPct;
	}

	public String getCountry() {
		return country;
	}

	public void setCountry(String country) {
		this.country = country;
	}

    
}
