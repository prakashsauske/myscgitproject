package au.com.woolworths.portal.service;

import java.net.URI;
import java.net.URLEncoder;
import java.util.ArrayList;
import java.util.List;

import org.apache.log4j.Logger;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;

import au.com.woolworths.portal.controller.PlanOGramController;
import au.com.woolworths.portal.model.POGDataExtract;
import au.com.woolworths.portal.model.POGDataExtractResponse;
import au.com.woolworths.portal.model.PostResponse;
import au.com.woolworths.portal.model.UserContext;
import au.com.woolworths.portal.param.POGExtractDataParam;
import au.com.woolworths.portal.util.PortalUtil;

public class POGServiceImpl extends CommonServiceImpl {

	@Value("#{url['POGUpdatePostServiceURL']}")
	private String POGUpdatePostServiceURL;

	@Value("#{url['POGUpdateTokenServiceURL']}")
	private String POGUpdateTokenServiceURL;

	@Value("#{url['POGDataExtractServiceURL']}")
	private String POGDataExtractServiceURL;

	@Value("#{url['PageSize']}")
	private String pageSize;
	
	private static final Logger LOGGER = Logger.getLogger(POGServiceImpl.class.getName());

	// ************** POG UPDATE SERVICE CALLS ***********************//
	public String updatePogData(List<POGDataExtract> pogUpdateDtls,
			POGExtractDataParam param,UserContext user) throws Exception {

		HttpHeaders requestHeaders = new HttpHeaders();
		requestHeaders.add("x-csrf-token", "fetch");
		HttpEntity<String> requestEntity = new HttpEntity<String>(
				requestHeaders);
		ResponseEntity<Object> response = null;
		try {
			response = getForPostRestTemplate(user).exchange(
					POGUpdateTokenServiceURL, HttpMethod.GET, requestEntity,
					Object.class);

		} catch (Exception e) {

			String msg = "POG Update Failed,Due to Service unavaliabilty";
			e.printStackTrace();
			return msg;

		}
		HttpHeaders responseHeaders = new HttpHeaders();
		responseHeaders = response.getHeaders();

		String token = responseHeaders.getFirst("x-csrf-token");
		LOGGER.info("token_" + token);
		String val = updatePOGInfoInSAP(token, pogUpdateDtls, param,user);

		return val;

	}

	private String updatePOGInfoInSAP(String token,
			List<POGDataExtract> pogUpdateDtls, POGExtractDataParam param,UserContext user)
			throws Exception {

		HttpHeaders postrequestHeaders = new HttpHeaders();
		String msg = "";
		postrequestHeaders.add("x-csrf-token", token);

		postrequestHeaders.setContentType(MediaType.APPLICATION_ATOM_XML);

		String xml = construtXMLforPOGUpdate(token, pogUpdateDtls, param);

		LOGGER.info("xml data" + xml);

		HttpEntity<Object> requestEntity = new HttpEntity<Object>(xml,
				postrequestHeaders);
		ResponseEntity<PostResponse> response = null;
		try {

			response = getForPostRestTemplate(user).exchange(
					POGUpdatePostServiceURL, HttpMethod.POST, requestEntity,
					PostResponse.class);

			if (response != null && response.getBody() != null
					&& response.getBody().getPostResponseHelper() != null) {
				if (response.getBody().getPostResponseHelper().getError()
						.trim().length() == 0) {
					return null;
				} else {
					param.setMsg(response.getBody().getPostResponseHelper()
							.getError());
				}

			} else {
				msg = "Technical issue occured";
				return msg;
			}

		} catch (Exception e) {

			msg = "POG Update Failed,Due to Service unavaliabilty";
			e.printStackTrace();
			return msg;

		}
		return msg;

	}

	private String construtXMLforPOGUpdate(String token,
			List<POGDataExtract> pogUpdateDtls, POGExtractDataParam param)
			throws Exception {

		StringBuffer xml = new StringBuffer();

		xml.append("<?xml version='1.0' encoding='utf-8'?>")
				.append("<atom:entry xmlns:atom='http://www.w3.org/2005/Atom' ")
				.append("xmlns:d='http://schemas.microsoft.com/ado/2007/08/dataservices' ")
				.append("xmlns:m='http://schemas.microsoft.com/ado/2007/08/dataservices/metadata' ")
				.append("xmlns:sap='http://www.sap.com/Protocols/SAPData' ")
				.append(" xml:base='")
				.append(POGUpdatePostServiceURL)
				.append("'> ")

				.append("<atom:content type='application/xml'> ")
				.append("<m:properties>")

				.append("<d:WERKS>")
				.append(pogUpdateDtls.get(0).getSite())
				// site
				.append("</d:WERKS>")

				.append("<d:IV_TEST>")
				// .append(pogUpdateDtls.get(0).getTest())//update blank
				.append("</d:IV_TEST>")

				// .append("<d:IV_TYP>")
				// .append(pogUpdateDtls.get(0).getType())
				// .append("</d:IV_TYP>")

				// .append("<d:IV_MSG>")
				// .append(pogUpdateDtls.get(0).getm())
				// .append("</d:IV_MSG>")

				.append("</m:properties> ")
				.append("</atom:content>")

				.append("<atom:link rel='http://schemas.microsoft.com/ado/2007/08/dataservices/related/POGItems' type='application/atom+xml;type=feed'  title='ZSP_POG_UPDATE.POGHeader_POGItem'>")
				.append("<m:inline><atom:feed>");

		for (POGDataExtract detail : pogUpdateDtls) {
			// //LOGGER.info(detail.getVendorNo());
			xml.append(
					"<atom:entry> <atom:content type='application/xml'><m:properties>")
					.append("<d:WERKS>")
					.append(detail.getSite())
					// site
					.append("</d:WERKS>").append("<d:LAYGR>")
					.append(detail.getLayoutModule()).append("</d:LAYGR>")
					.append("<d:LMVER>").append(detail.getLayModVersion())
					.append("</d:LMVER>").append("<d:POG_IMP_STATUS>")
					.append(detail.getPog_imp_status())
					.append("</d:POG_IMP_STATUS>")
					.append("<d:POG_ACTIVATED_DATE>");
			// LOGGER.info("detail.getPogActivatedDate()"
			// + detail.getPogActivatedDate());
			xml.append(getPogFormattedDate(detail.getPogActivatedDate()))
					.append("</d:POG_ACTIVATED_DATE>")
					.append(" <d:POG_IMP_TIME>")
					.append(detail.getPog_imp_time())
					.append("</d:POG_IMP_TIME>")
					.append("<d:POG_ACTIVATED_TIME>")
					.append(getPogFormattedTime(detail.getPogActivatedTime()))
					.append("</d:POG_ACTIVATED_TIME>")

					.append("<d:POG_ISSUED_DATE>")
					.append(getPogFormattedDate(detail.getPogIssuedDate()))
					.append("</d:POG_ISSUED_DATE>")

					.append("<d:POG_ISSUED_TIME>")
					.append(getPogFormattedTime(detail.getPogIssuedTime()))
					.append("</d:POG_ISSUED_TIME>")

					.append("<d:POG_ACCEPT_RECV_ON>")
					.append(getPogFormattedDate(detail.getPogAcceptRecvOn()))
					.append("</d:POG_ACCEPT_RECV_ON>")

					.append("<d:POG_ACCEPT_RECV_TM>")
					.append(getPogFormattedTime(detail.getPogAcceptRecvTm()))
					.append("</d:POG_ACCEPT_RECV_TM>")

					.append("<d:POG_ACCEPT_DUEDATE>")
					.append(getPogFormattedDate(detail.getPogAcceptDuedate()))
					.append("</d:POG_ACCEPT_DUEDATE>")

					.append("<d:POG_PREV_ACTV_DATE>")
					.append(getPogFormattedDate(detail.getPogPrevActvDate()))
					.append("</d:POG_PREV_ACTV_DATE>")

					.append("<d:POG_OLD_DATE>")
					.append(getPogFormattedDate(detail.getPogOldDate()))
					.append("</d:POG_OLD_DATE>")

					.append("<d:MARC_UPDATE_FLAG>")
					.append(detail.getMarcUpdateFlag())
					.append("</d:MARC_UPDATE_FLAG>")

					.append("<d:SHELF_QUANTITY_SENT>")
					.append(detail.getShelfQuantitySent())
					.append("</d:SHELF_QUANTITY_SENT>")

					.append("<d:POG_SIZE>").append(detail.getPogSize())
					.append("</d:POG_SIZE>")

					.append("<d:EQUIPMENT>").append("")//detail.getEquipment()  removed as it contains special characters like &
					.append("</d:EQUIPMENT>")

					.append("<d:VARIATION>").append("")//detail.getVariation()) removed as it contains special characters like &
					.append("</d:VARIATION>")

					.append("<d:CREATED_BY>").append(detail.getCreatedBy())
					.append("</d:CREATED_BY>")

					.append("<d:CREATED_ON>")
					.append(getPogFormattedDate(detail.getCreatedOn()))
					.append("</d:CREATED_ON>")

					.append("<d:LAST_CHANGED_BY>")
					.append(detail.getLastChangedBy())
					.append("</d:LAST_CHANGED_BY>")

					.append("<d:LAST_CHANGED_ON>")
					.append(getPogFormattedDate(detail.getLastChangedOn()))
					.append("</d:LAST_CHANGED_ON>")

					.append("<d:DELETION_IND>").append(detail.getDeletionInd())
					.append("</d:DELETION_IND>")

					.append("<d:DELETION_DATE>")
					.append(getPogFormattedDate(detail.getDeletionDate()))
					.append("</d:DELETION_DATE>")

					.append("</m:properties> </atom:content></atom:entry>");
		}

		xml.append("</atom:feed></m:inline></atom:link></atom:entry>");

		return xml.toString();
	}

	// ************** POG EXTRACT SERIVE CALL ************************//
	public ArrayList<POGDataExtract> getPOGExtractDetails(
			POGExtractDataParam param,UserContext user) throws Exception {

		StringBuffer url = null;
		String finalUrl = "";

		url = new StringBuffer("iv_site eq '")
				.append((param.getSite() != null
						&& !("").equals(param.getSite()) ? param.getSite() : ""))
				// "1008" : ""))
				.append("'");

		/*
		 * if (param.getSorg() != null && !("").equals(param.getSorg().trim()))
		 * url.append(" and iv_sorg eq '").append(param.getSorg())
		 * .append("' ");
		 */
		/*
		 * if (param.getSorg() != null && !("").equals(param.getSite().trim()))
		 * url.append(" and iv_sorg eq '").append(param.getSorg())POGDataExtract
		 * .append("' ");
		 * 
		 * if (param.getPogAcceptDate() != null &&
		 * !("").equals(param.getPogAcceptDate().trim()))
		 * url.append(" and iv_pog_accept_date eq '")
		 * .append(param.getPogAcceptDate().replace("/", "")) .append("' ");
		 * 
		 * if (param.getPogIssueDate() != null &&
		 * !("").equals(param.getPogIssueDate().trim()))
		 * url.append(" and iv_pog_issue_date eq '")
		 * .append(param.getPogIssueDate().replace("/", "")) .append("' ");
		 * 
		 * if (param.getRecords() != null &&
		 * !("").equals(param.getRecords().trim()))
		 * url.append(" and iv_records eq ").append(param.getRecords());
		 * 
		 * if (param.getPateNo() != null &&
		 * !("").equals(param.getPateNo().trim()))
		 * url.append(" and iv_page_no eq ").append(param.getPateNo());
		 */

		// LOGGER.info("url" + url.toString());

		finalUrl = POGDataExtractServiceURL
				+ URLEncoder.encode(url.toString(), "UTF-8");
		
		LOGGER.info("POGDataExtractServiceURL :-- "+finalUrl);

		URI uri = new URI(finalUrl);

		try {
			POGDataExtractResponse response = getRestTemplate(user).getForObject(
					uri, POGDataExtractResponse.class);
			if (response == null
					|| response.getPogDataExtractResponseHelper() == null
					|| response.getPogDataExtractResponseHelper()
							.getPogDataExtract() == null
					|| response.getPogDataExtractResponseHelper()
							.getPogDataExtract().size() == 0
					|| response.getPogDataExtractResponseHelper()
							.getPogDataExtract().get(0).getMsg()
							.equalsIgnoreCase("No more records found")) {
				return new ArrayList<POGDataExtract>();
			}

			return (ArrayList<POGDataExtract>) response
					.getPogDataExtractResponseHelper().getPogDataExtract();
		} catch (Exception e) {
			e.printStackTrace();
			LOGGER.info("Exception in planogram :-- "+e);
			return new ArrayList<POGDataExtract>();
		}
	}

	private String getPogFormattedDate(String inputDate) {

		if (null == inputDate || "null".equalsIgnoreCase(inputDate)
				|| "".equalsIgnoreCase(inputDate))
			return POGDataExtract.SAP_DEFAULT_DATE_FORMAT;

		return PortalUtil.convertToSAPDate(inputDate);
	}

	private String getPogFormattedTime(String inputTime) {

		if (null == inputTime || "null".equalsIgnoreCase(inputTime)
				|| "".equalsIgnoreCase(inputTime))
			return POGDataExtract.SAP_DEFAULT_TIME_FORMAT;

		return inputTime;

	}
}
