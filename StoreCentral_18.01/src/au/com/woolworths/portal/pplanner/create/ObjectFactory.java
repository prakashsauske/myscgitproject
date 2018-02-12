
package au.com.woolworths.portal.pplanner.create;

import javax.xml.bind.JAXBElement;
import javax.xml.bind.annotation.XmlElementDecl;
import javax.xml.bind.annotation.XmlRegistry;
import javax.xml.namespace.QName;


/**
 * This object contains factory methods for each 
 * Java content interface and Java element interface 
 * generated in the au.com.woolworths.portal.pplanner.create package. 
 * <p>An ObjectFactory allows you to programatically 
 * construct new instances of the Java representation 
 * for XML content. The Java representation of XML 
 * content can consist of schema derived interfaces 
 * and classes representing the binding of schema 
 * type definitions, element declarations and model 
 * groups.  Factory methods for each of these are 
 * provided in this class.
 * 
 */
@XmlRegistry
public class ObjectFactory {

    private final static QName _GetPlanInfo_QNAME = new QName("http://service.replenishment.woolworths.com.au/", "getPlanInfo");
    private final static QName _ServiceException_QNAME = new QName("http://service.replenishment.woolworths.com.au/schema", "ServiceException");
    private final static QName _GetPlanInfoResponse_QNAME = new QName("http://service.replenishment.woolworths.com.au/", "getPlanInfoResponse");

    /**
     * Create a new ObjectFactory that can be used to create new instances of schema derived classes for package: au.com.woolworths.portal.pplanner.create
     * 
     */
    public ObjectFactory() {
    }

    /**
     * Create an instance of {@link GetPlanInfo }
     * 
     */
    public GetPlanInfo createGetPlanInfo() {
        return new GetPlanInfo();
    }

    /**
     * Create an instance of {@link GetPlanInfoResponse }
     * 
     */
    public GetPlanInfoResponse createGetPlanInfoResponse() {
        return new GetPlanInfoResponse();
    }

    /**
     * Create an instance of {@link ServiceFault }
     * 
     */
    public ServiceFault createServiceFault() {
        return new ServiceFault();
    }

    /**
     * Create an instance of {@link RequestData }
     * 
     */
    public RequestData createRequestData() {
        return new RequestData();
    }

    /**
     * Create an instance of {@link FaultDetail }
     * 
     */
    public FaultDetail createFaultDetail() {
        return new FaultDetail();
    }

    /**
     * Create an instance of {@link ResponseData }
     * 
     */
    public ResponseData createResponseData() {
        return new ResponseData();
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPlanInfo }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://service.replenishment.woolworths.com.au/", name = "getPlanInfo")
    public JAXBElement<GetPlanInfo> createGetPlanInfo(GetPlanInfo value) {
        return new JAXBElement<GetPlanInfo>(_GetPlanInfo_QNAME, GetPlanInfo.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link ServiceFault }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://service.replenishment.woolworths.com.au/schema", name = "ServiceException")
    public JAXBElement<ServiceFault> createServiceException(ServiceFault value) {
        return new JAXBElement<ServiceFault>(_ServiceException_QNAME, ServiceFault.class, null, value);
    }

    /**
     * Create an instance of {@link JAXBElement }{@code <}{@link GetPlanInfoResponse }{@code >}}
     * 
     */
    @XmlElementDecl(namespace = "http://service.replenishment.woolworths.com.au/", name = "getPlanInfoResponse")
    public JAXBElement<GetPlanInfoResponse> createGetPlanInfoResponse(GetPlanInfoResponse value) {
        return new JAXBElement<GetPlanInfoResponse>(_GetPlanInfoResponse_QNAME, GetPlanInfoResponse.class, null, value);
    }

}
