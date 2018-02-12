
package au.com.woolworths.portal.pplanner.create;

import javax.xml.bind.annotation.XmlAccessType;
import javax.xml.bind.annotation.XmlAccessorType;
import javax.xml.bind.annotation.XmlElement;
import javax.xml.bind.annotation.XmlType;


/**
 * <p>Java class for RequestData complex type.
 * 
 * <p>The following schema fragment specifies the expected content contained within this class.
 * 
 * <pre>
 * &lt;complexType name="RequestData">
 *   &lt;complexContent>
 *     &lt;restriction base="{http://www.w3.org/2001/XMLSchema}anyType">
 *       &lt;sequence>
 *         &lt;element name="site" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="article" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="transDate" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="requestType" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *         &lt;element name="requestField" type="{http://www.w3.org/2001/XMLSchema}string" minOccurs="0"/>
 *         &lt;element name="plannerType" type="{http://www.w3.org/2001/XMLSchema}string"/>
 *       &lt;/sequence>
 *     &lt;/restriction>
 *   &lt;/complexContent>
 * &lt;/complexType>
 * </pre>
 * 
 * 
 */
@XmlAccessorType(XmlAccessType.FIELD)
@XmlType(name = "RequestData", namespace = "http://service.replenishment.woolworths.com.au/schema", propOrder = {
    "site",
    "article",
    "transDate",
    "requestType",
    "requestField",
    "plannerType",
    "requiredQty",
    "updateFlag"
})
public class RequestData {

    @XmlElement(required = true)
    protected String site;
    @XmlElement(required = true)
    protected String article;
    @XmlElement(required = true)
    protected String transDate;
    @XmlElement(required = true)
    protected String requestType;
    protected String requestField;
    @XmlElement(required = true)
    protected String plannerType;
    @XmlElement(required = true)
    protected String requiredQty;
    
    public String getRequiredQty() {
		return requiredQty;
	}

	public void setRequiredQty(String requiredQty) {
		this.requiredQty = requiredQty;
	}

	public String getUpdateFlag() {
		return updateFlag;
	}

	public void setUpdateFlag(String updateFlag) {
		this.updateFlag = updateFlag;
	}

	@XmlElement(required = true)
    protected String updateFlag;

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
     * Gets the value of the requestType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRequestType() {
        return requestType;
    }

    /**
     * Sets the value of the requestType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRequestType(String value) {
        this.requestType = value;
    }

    /**
     * Gets the value of the requestField property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */
    public String getRequestField() {
        return requestField;
    }

    /**
     * Sets the value of the requestField property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
    public void setRequestField(String value) {
        this.requestField = value;
    }
    
    
    /**
     * Gets the value of the plannerType property.
     * 
     * @return
     *     possible object is
     *     {@link String }
     *     
     */

	public String getPlannerType() {
		return plannerType;
	}

	/**
     * Sets the value of the plannerType property.
     * 
     * @param value
     *     allowed object is
     *     {@link String }
     *     
     */
	public void setPlannerType(String plannerType) {
		this.plannerType = plannerType;
	}
    
    

}
