var salesOrgVal=$('#posSite').val();
var siteVal=$('#salesOrg').val();
var hostVal=$('#storeHost').val();
var userId = $('#loginUserId').val();
var storeType='';
var storeServerNames;
var selectedServer;
var serverNo;
var host='';
var port='';
var domain='';//'http://'+host+':'+port+'/';
var SERVER_INSTANCE="001";
var STORE_SYSTEM="SS";
var STORE_SERVER="RS";

//list of services
var orderOnReceiptURL = '';
var getMyDraftURL='';
var modifyMyDraftURL='';
//for Article Lookup
var searchArticleURL='';
var loadMoreInfo='';
//for Order Enquiry 
var getTabCodeInfo='';
var getTabResults='';
var receiveOrders='';
var printTicket='';
var getNationalSTBlockingFunctionDetailsUrl = '';
var getarticleguggestions='';
var getsecurityarticleData='';
var updatesecurityarticle='';
var vendorLookupServiceURL='';
var warehouseLookupServiceURL='';
var getReplenishmentDetailsURL='';
var getPriceDetailsURL='';
var gethierarchyDetails='';
var getAdditionalEANURL='';
var getLinkedItemsURL='';
var getOtherPriceURL='';
var getOfferDetails='';
var getLTODetailsURL='';
var getOutOfCodeURL='';
var getPOSDetailsURL='';
var getAdditionalDetailsURL='';
var getVendorDetailsURL='';
var updateMPLandSCURL='';
var getArticleHierarchyURL='';
var getArticleHeaderURL='';
var getSalesHistoryURL='';
var getPriceHistoryURL='';
var getFullHistoryURL='';
var getForeCastOrderURL='';
var articleHdrInfoServiceURL='';
var articleDtlInfoServiceURL='';
var articleBlockingReasonServiceURL='';
var articleImageServiceURL='';
var verifyStoreURL='';
var stocktakeFinaliseUrl = '';
var nearbyStoreSearchURL='';
var nearbyStoreSearchInArticleLookupURL='';
var getOrdersDraftList='';
var getOrdersDraftListIBT = '';
var createOrdersDraftList='';
var packBreakArticleSearch='';
var packBreakArticleSearchRTV='';
var packBreakArticleDescSearch='';
var getIBTDraftHdrList='';
var createOrderPreqURL = '';
var getDeliveryDateURL='';
var getAllocationOrderURL='';
var getOrderDeliveryInfoURL = '';
var getOrderGrInfoURL = '';
var getOrderGrItemInfoURL = '';
var getOrderInvoiceInfoURL = '';
var limitOrderQty='';
var allocationStartDay='';
var allocationEndDay='';
var gerOrderedItemUrl = '';
var getClaimsLookupInfoUrl = '';
var vendorClaimAuthorisationSAPServiceURL ='';
var getClaimArticleUOMUrl='';
var getPwd='';
var getLimitQty='';
var rtvClaimsLookup='';
var rtvClaimsDetail='';
var rtvClaimsUpdate='';
var rtvClaimsCreate='';
var getSiteDescriptionUrl='';
var getPrinterList='';
var printInfoUrl='';
var rtvClaimsReasonCode= '';
var maxRangeValue='';
var minRangeValue='';
var getGiftCardDetails='';
var getPromoCount='';
var articleSearchInISPUrl='';
var getMarkdownPercentUrl='';
var getCPBDsecurityarticleData='';
var getPromoConfigurationURL = '';
var addReceivingTransactionUrl = '';
var receiveMethodConfigUrl = '';
var postReceivedDetailsUrl = '';
var getReceivingTransactionUrl = '';
var getReceiveConfigUrl = '';
var getULDMasterInfoUrl = '';
var getULDDeliveryInfoUrl = '';
var temperatureValidateUrl = '';
var getOtherPriceInfoUrl = '';
var printIbtInfoUrl = '';

var getOrderTabCodeOnloadUrl = '';
var getOrderTabCodeOnsearchUrl = '';
var getSmartOrderNumbers ='';
var reportDeviceLogUrl = '';
var reportStockFillUrl = '';
var getPosPrice = '';
var getPrintTemplateDetailsUrl = '';
var sendDetailsToPrinterUrl = '';
var getArticleDetailsForIbtUrl = '';
var getArticleDetailsForStockAdjustURL = '';
var lockArticleForStockAdjustmentURL = '';
var getReasonCodeForStockAdjustmentURL = '';
var getUnpostedStockAdjustmentHistoryURL='';
var getPostedStockAdjustmentHistoryURL = '';
var getIDTPurchaseDept = '';
var getIDTPurchaseList = '';
var getIDTReverseUrl = '';
var getStockAdjustmentConfigurationURL='';
var getCharityCodeListURL='';
var postStockAdjustURL='';
var getIDTPurchaseListURL='';
var getIDTDepartmentListURL='';
var reportStockAdjCentralUrl='';
var reportSTAcceptVarianceUrl = '';
var reportSTUpdateLocationUrl = '';
var reportReasonCodeUrl = '';
var rtvHistoryLogUrl ='';
var rangeArticleToSiteURL ='';
var dailyStockCheckURL= '';
var reportDailyStockCheckUrl = '';
var reportDailyStockCheckNewUrl = '';
var getLTOLocations='';
var getLTOAisleInfo='';
var getLTOFixtureTypes='';
var createOrEditLTOLocation='';
var getLTOCategories='';
var getSupplierSuggestionsUrl = '';
var getSupplierSuggestionsLookupUrl = '';
var getULDDetailsUrl='';
var updateULDDetailsUrl='';
var verifyUserURL ='';
var getCarrierSuggestionsUrl='';
var getULDReceiveInfoUrl = '';
var getStockAdjUsers = '';
var getSOHConfigURL = '';
var getGpInfoURL = '';
var getSTDetailsForEditUrl = '';
var getNearbyStoreDtlInfo = '';
var notificationListUrl='';
var notificationDtlListUrl='';
var rejectIBTOrderURL = '';
var changePwdLocalURL = '';
var vendorLookupRTVServiceURL = '';
var getInfoByStyleURL ='';
var getarticleStyleSuggestions=''; var testFreshFoodUrl = '';
var getarticleStyleSuggestions ='';
var getInfoByStyleURL ='';
var otherMarkdownReasonUrl = '';
var getcmpntArticlesInfoUrl='';
var orderItemInfoMobileURL ='';
var getOrderHdrBasicInfoUrlOnLoad ='';
var getArticleHeaderBasicCreate = '';
var getArticleHeaderBasicRoutine ='';
var getSTLocationStatusUrl ='';
var getCPBDArticleDetails = '';
var inventorySeaonCodeUrl = '';
var getStoreSohLogDetailsURL  = '';
var gethierarchyDetailsST = '';
var displaySTStatusUrl = '';
var adjustLocalSohForRepairs = '';
var reportSTSubCatVarianceUrl = '';
//"SC-526/12014"
var getSTCoutedLocation = '';
$(document).ready(function(){
	 salesOrgVal=$('#salesOrg').val();
	 siteVal=$('#posSite').val();
	 hostVal = $('#storeHost').val();
	 userId = $('#loginUserId').val();
	 storeServerNames=['1.0','2.0'];
	 selectedServer=storeServerNames[0];
	 allocationStartDay=0;
	 allocationEndDay=21;
	 maxRangeValue="90";
	 minRangeValue="60";
	 
	 host=hostVal;
	 port='8080';

	/*host='4033smssfs001';
	port='8080';
	 
	if(siteVal=='4033'){
		host='4033smssfs001';
		port='8080';
	}else if(siteVal=='1883'){
		host='10.138.129.165';
		port='8080';
	}else if(siteVal=='2774'){
		host='NCDWIN7PXD10059';
		port='8080';
	}else if(siteVal=='4290'){
		host='NCDWIN7PXD10054';
		port='8080';
	}else if(siteVal=='9698'){
		host='NCDWIN7PXD10055';
		port='8080';
	}else if(siteVal=='4293'){
		host='NCDWIN7PXD10056';
		port='8080';
	}else if(siteVal=='0869'){
		host='NCDWIN7PXD10057';
		port='8080';
	}else if(siteVal=='4546'){
		host='NCDWIN7PXD10058';
		port='8080';
	}else if(siteVal=='7557'){
		host= '10.136.230.16';
		port='8080';
	}else if(siteVal=='1003'|| siteVal=='1004' || siteVal=='1005'){
		host='nnorsoeglt103';
		port='8080';
	}else if(siteVal=='1786'){
		host='4033smssfs001';
		port='8080';
	}else if(siteVal=='1234'){
		host='4033smssfs001';
		port='8180';
	}else if(siteVal=='1111'){
		host='4033smssfs001';
		port='8280';
	}else if(siteVal=='1008'){
		host='NCDWMBLAST0003.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='0150'){
		host='10.168.245.223';
		port='8080';
	}else if(siteVal=='1883'){
		host='10.208.80.240';
		port='8080';
	}else if(siteVal=='3798'){
		host='10.224.152.222';
		port='8080';
	}else if(siteVal=='4295'){
		host='10.224.160.240';
		port='8080';
	}else if(siteVal=='7985'){
		host='10.224.200.240';
		port='8080';
	}else if(siteVal=='1008'){
		host='NCDWMBLAST0003.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='3114'){
		host='NCDWMBLAST0005.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='3260'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='0173'){
		host='NCDWMBLAST0004.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='9096'){
		host='NCDWMBLAST0006.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='1535'){
		host='NCDWMBLAST0007.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='1614'){
		host='NCDWMBLAST0001.wowcorp.com.au';
		port='8080';
	}else if(siteVal=='1264'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8090';
	}else if(siteVal=='1395'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8070';
	}else if(siteVal=='0163'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8060';
	}else if(siteVal=='9094'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8050';
	}else if(siteVal=='0157'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8030';
	}else if(siteVal=='0179'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8020';
	}else if(siteVal=='1243'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8040';
	}else if(siteVal=='1237'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8010';
	}else if(siteVal=='9142'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8110';
	}else if(siteVal=='9216'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8120';
	}else if(siteVal=='7241'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8130';
	}else if(siteVal=='9384'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8140';
	}else if(siteVal=='7133'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8150';
	}else if(siteVal=='5097'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8160';
	}else if(siteVal=='0858'){
		host='NCDWMBLAST0002.wowcorp.com.au';
		port='8170';
	}else{*/
			if(salesOrgVal=='1060'){
				storeType='BW';
			}else if(salesOrgVal=='1005' || salesOrgVal=='1025' || salesOrgVal=='1030' || salesOrgVal=='2010'){
				storeType='SM';
			}else if(salesOrgVal=='1020'){
				storeType='PT';
				STORE_SERVER = 'FS';
			}else if(salesOrgVal=='1010' || salesOrgVal=='1015'){
				if(salesOrgVal=='1010'){
					STORE_SERVER = 'FS';
				}
				storeType='LQ';
			}
			if($('#ngboPilotStore').val() == 'Y' && hostVal!=undefined && hostVal!='' && storehostdefined!=undefined && storehostdefined!=null && storehostdefined == 'Y'){
				host= hostVal;
			}else if(storeType!='' && environment!=undefined && environment!=null && environment=='P'){
				host=siteVal+storeType+STORE_SYSTEM+STORE_SERVER+SERVER_INSTANCE;
			}
	/*}*/

	domain='http://'+host+':'+port+'/';
	//domain='http://10.138.129.197:8080/';
	//list of services
	 getMyDraftURL=domain+'ws_wow_data_controller?WOW_SERVICE=DRAFT_PROMO_DETAILS_GET&PLATFORM=B';
	 modifyMyDraftURL=domain+'ws_wow_data_controller?WOW_SERVICE=DRAFT_PROMO_DETAILS_PUT&PLATFORM=B';
	//for Article Lookup
	 searchArticleURL=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_DETAILS_BY_STRING_GET&PLATFORM=B';
	 loadMoreInfo=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_INFO_BY_DETAILS&PLATFORM=B';
	 //getReplenishmentDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=TEST_REPL_INFO&PLATFORM=B';//REPL_INFO_GET';
	 getReplenishmentDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=REPL_INFO_GET&PLATFORM=B';//REPL_INFO_GET';
	 //
	 getNextDeliveryDetails=domain+'ws_wow_data_controller?WOW_SERVICE=GET_NEXT_DELIVERY_DETAILS&PLATFORM=B';
	 //
	 //getPriceDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=TEST_PRICE_INFO&PLATFORM=B';//PRICE_TAB_INFO_GET';
	 getPriceDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=PRICE_TAB_INFO_GET&PLATFORM=B';//PRICE_TAB_INFO_GET';
	 getAdditionalEANURL=domain+'ws_wow_data_controller?WOW_SERVICE=EAN_DTLS_GET&PLATFORM=B';
	 getLinkedItemsURL=domain+'ws_wow_data_controller?WOW_SERVICE=LINK_FACTOR_INFO&PLATFORM=B';
	 getOfferDetails=domain+'ws_wow_data_controller?WOW_SERVICE=PROMO_INFO_GET&PLATFORM=B';
	 getLTODetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_LTO_ARTICLE_DETAILS&PLATFORM=B';
	 getOutOfCodeURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ARTICLE_EXPIRY_DATE&PLATFORM=B';
	 //getPOSDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=TEST_POS_INFO&PLATFORM=B';//POS_DETAILS_GET';
	 getPOSDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=POS_DETAILS_GET&PLATFORM=B';//POS_DETAILS_GET';
	 //getAdditionalDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=TEST_FRESH_FOOD&PLATFORM=B';//FRESH_FOOD_INFO_GET';
	 getAdditionalDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=FRESH_FOOD_INFO_GET&PLATFORM=B';//FRESH_FOOD_INFO_GET';
	 getVendorDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=SUPPLIER_INFO_GET&PLATFORM=B';
	 updateMPLandSCURL=domain+'ws_wow_data_controller?WOW_SERVICE=MPL_SC_FACING_UPDATE&PLATFORM=B';//MPL_UPDATE
	 getArticleHierarchyURL=domain+'ws_wow_data_controller?WOW_SERVICE=HIERARCHY_INFO_GET&PLATFORM=B';
	 getArticleHeaderURL=domain+'ws_wow_data_controller?WOW_SERVICE=HEADER_INFO_NEW&PLATFORM=B';
	 getSalesHistoryURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_SALES_HISTORY_BY_ART&PLATFORM=B';
	 getPriceHistoryURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ARTICLE_PRICE_HISTORY&PLATFORM=B';
	 getFullHistoryURL=domain+'ws_wow_data_controller?WOW_SERVICE=UPDATE_HISTORY_GET&PLATFORM=B';
	 getForeCastOrderURL='';
	//for Order Enquiry 
	 getTabCodeInfo=domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_ENQUIRY&PLATFORM=B';
	 getTabResults=domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_HEADER&PLATFORM=B';
	 receiveOrders=domain+'ws_wow_data_controller?SAAP_SERVICE=MDOC_ADD&PLATFORM=B';

	 getarticleguggestions=domain+'ws_wow_data_controller?WOW_SERVICE=SMART_SEARCH&PLATFORM=B';
	 getsecurityarticleData=domain+'ws_wow_data_controller?WOW_SERVICE=SECURITY_GET&PLATFORM=B&MATNR=';
	 getCPBDsecurityarticleData=domain+'ws_wow_data_controller?WOW_SERVICE=CPBD_SECURITY_GET&PLATFORM=B&MATNR=';
	 updatesecurityarticle=domain+'ws_wow_data_controller?WOW_SERVICE=SEC_TAG_UPDATE&PLATFORM=B'; //SECURITY_UPDATE'

	 getTabCodeInfo=domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_ENQUIRY&PLATFORM=B';
	 getTabResults=domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_HEADER&PLATFORM=B';

	 gethierarchyDetails=domain+'ws_wow_data_controller?WOW_SERVICE=HIERARCHY_GET&PLATFORM=B';
	 articleHdrInfoServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_HEADER_BASIC&PLATFORM=B';
	 //articleDtlInfoServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=TEST_HEADER&PLATFORM=B';//ARTICLE_HEADER_DETAIL';
	 articleDtlInfoServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_HEADER_DETAIL&PLATFORM=B';//ARTICLE_HEADER_DETAIL';
	 articleBlockingReasonServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_HEADER_CENTRAL&PLATFORM=B';//ARTICLE_HEADER_CENTRAL';
	 articleImageServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_IMAGE_URL&PLATFORM=B';//Product Image Repository 
	 verifyStoreURL= "../common/verifyStore.htm";
	 //nearbyStoreSearchURL="../common/getNearbyStoreSearch.htm";
	 nearbyStoreSearchURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_NEAR_BY_STORES&PLATFORM=B';
	 nearbyStoreSearchInArticleLookupURL=domain+'ws_wow_data_controller?WOW_SERVICE=NEARBY_STORE_SEARCH&PLATFORM=B';
	 vendorLookupServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=VENDOR_DETAILS_GET&PLATFORM=B';
	 vendorLookupRTVServiceURL=domain+'ws_wow_data_controller?WOW_SERVICE=VENDOR_DETAILS_GET_RTV&PLATFORM=B';
		 //'../allocation/verifyVendor.htm';
	 warehouseLookupServiceURL= domain+'ws_wow_data_controller?WOW_SERVICE=WAREHOUSE_GET&PLATFORM=B';  
		 //"../common/getWareHouseList.htm";
	 //createOrdersDraftList=domain+'ws_wow_data_controller?WOW_SERVICE=CREATE_DRAFT_ORDER';
	 //getOrdersDraftList=domain+'ws_wow_data_controller?WOW_SERVICE=LIST_DRAFT_ORDERS';
	 createOrdersDraftList=domain+'ws_wow_data_controller?WOW_SERVICE=CREATE_DRAFT_ORDER&PLATFORM=B';
	 getOrdersDraftList=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_DRAFT_DETAILS&PLATFORM=B';
	 getOrdersDraftListIBT=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_DRAFT_DETAILS_IBT&PLATFORM=B';
	 packBreakArticleSearch=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_UOM&PLATFORM=B';
	 packBreakArticleDescSearch=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_UOM_DESC&PLATFORM=B';
	 packBreakArticleSearchRTV=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_UOM_RTV&PLATFORM=B';
	 getIBTDraftHdrList=domain+'ws_wow_data_controller?WOW_SERVICE=GET_IBT_DRAFT_HDR&PLATFORM=B';
	 createIBTDraftHdrList=domain+'ws_wow_data_controller?WOW_SERVICE=CREATE_IBT_HEADER_DRAFT&PLATFORM=B';
	 createOrderSAP=domain+'ws_wow_data_controller?WOW_SERVICE=CREATE_ORDER_IBT&PLATFORM=B';
	 
	 createOrderPreqURL = domain+'ws_wow_data_controller?WOW_SERVICE=CREATE_ORDER_PREQ&PLATFORM=B';
	 getDeliveryDateURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_DELIVERY_INFO_RAP&PLATFORM=B';
	 getAllocationOrderURL='http://10.23.212.171:8080/';
	 getAllocationOrderFromSAPURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ALLOC_INFO&PLATFORM=B';
	 getOrderDeliveryInfoURL = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_DELIVERY_INFO&PLATFORM=B'; 
	 getOrderGrInfoURL = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_GR_INFO_NEW&PLATFORM=B';
	 getOrderGrItemInfoURL = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_GR_ITEM_INFO_NEW1&PLATFORM=B';
	 getOrderInvoiceInfoURL = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_INVOICE_INFO&PLATFORM=B';
	 gerOrderedItemUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_ITEM_INFO&PLATFORM=B';
	 //getClaimsLookupInfoUrl='http://cljbot1:8280/StoreCentralServices/orders/getReturnOrderlookup';
	 vendorClaimAuthorisationURL=domain+'ws_wow_data_controller?WOW_SERVICE=SAVE_VENDOR_CLAIM_NO&PLATFORM=B';
	 getPwd=domain+'ws_wow_data_controller?WOW_SERVICE=GET_PASSWORD_BY_USER&PLATFORM=B';
	 getClaimArticleUOMUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ARTICLE_UOM&PLATFORM=B';
	 getLimitQty=domain+'ws_wow_data_controller?WOW_SERVICE=GET_SALES_ORG_CONFIG&PLATFORM=B';
	 getSiteDescriptionUrl=domain+'ws_wow_data_controller?WOW_SERVICE=SITE_DESCRIPTION_GET&PLATFORM=B';
	 rtvClaimsLookup=domain+'ws_wow_data_controller?WOW_SERVICE=RTV_ORDER_LOOKUP&PLATFORM=B';
	 rtvClaimsDetail=domain+'ws_wow_data_controller?WOW_SERVICE=RTV_ORDER_DETAIL&PLATFORM=B';
	 rtvClaimsUpdate=domain+'ws_wow_data_controller?WOW_SERVICE=RTV_ORDER_UPDATE&PLATFORM=B';
	 rtvClaimsCreate=domain+'ws_wow_data_controller?WOW_SERVICE=RTV_ORDER_CREATE&PLATFORM=B';
	 getPrinterList=domain+'ws_wow_data_controller?WOW_SERVICE=PRINT_LIST_GET&PLATFORM=B';
	 printInfoUrl=domain+'ws_wow_data_controller?WOW_SERVICE=PRINT_SUPPLIER_VENDOR_DTLS&PLATFORM=B';
	 rtvClaimsReasonCode=domain+'ws_wow_data_controller?WOW_SERVICE=RTV_GET_REASONCODE&PLATFORM=B';
	 getGiftCardDetails=domain+'ws_wow_data_controller?WOW_SERVICE=GET_GIFT_CARD_DETAILS&PLATFORM=B';
	 getOtherPriceURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_OTHER_PRICE_INFO&PLATFORM=B';
	 getPromoCount=domain+'ws_wow_data_controller?WOW_SERVICE=GET_INSTORE_PROMO_COUNT&PLATFORM=B';
	 articleSearchInISPUrl=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_FOR_ISP&PLATFORM=B';
	 getMarkdownPercentUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_MARKDOWN_PERCENT&PLATFORM=B';

	 addReceivingTransactionUrl=domain+'ws_wow_data_controller?WOW_SERVICE=ADD_RECEIVING_TRANSACTION1&PLATFORM=B';
	 receiveMethodConfigUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_RECEIVE_CONFIG&PLATFORM=B';
	 postReceivedDetailsUrl=domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_RECEIVE_POST_NOW&PLATFORM=B';
	 getReceivingTransactionUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_RECEIVING_TRANS_ID&PLATFORM=B';
	 getReceiveConfigUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_RECEIVE_CONFIG&PLATFORM=B';
	 getULDMasterInfoUrl =domain+'ws_wow_data_controller?WOW_SERVICE=GET_ULD_DETAILS&PLATFORM=B';
	 getULDDeliveryInfoUrl =domain+'ws_wow_data_controller?WOW_SERVICE=GET_DELIVERY_ULD_INFO&PLATFORM=B';
	 temperatureValidateUrl =domain+'ws_wow_data_controller?WOW_SERVICE=GET_TEMPERATURE_DETAILS&PLATFORM=B';
	 getOtherPriceInfoUrl =domain+'ws_wow_data_controller?WOW_SERVICE=GET_OTHER_PRICE_INFO&PLATFORM=B';
	 //printIbtInfoUrl = 'http://10.57.23.167:8080/ws_wow_data_controller?WOW_SERVICE=PRINT_IBT';
	 printIbtInfoUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=PRINT_IBT&PLATFORM=B';
	 getOrderTabCodeOnloadUrl =  domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_ENQUIRY_PAGE_LOAD&PLATFORM=B';
	 getOrderTabCodeOnsearchUrl =  domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_ENQUIRY_TEST1&PLATFORM=B';
	//ORDER_HEADER_BASIC1 service perfomance tuning service url change
	 getOrderHdrBasicInfoUrl =  domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_HEADER_BASIC1&PLATFORM=B';
	 getcmpntArticlesInfoUrl= domain+'ws_wow_data_controller?WOW_SERVICE=GET_COMPONENT_ART_INFO&PLATFORM=B';
	 getOrderHdrBasicInfoUrlOnLoad =  domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_HEADER_BASIC_PAGE_LOAD&PLATFORM=B';	 
	 getSmartOrderNumbers = domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_NO_SMART_SEARCH&PLATFORM=B';
	 articleSearchInISPUrl= domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_FOR_ISP&PLATFORM=B';
	 
	 getArticleHeaderBasicCreate = domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_FOR_ORDER_CREATION&PLATFORM=B';
	 
	 orderDeliveryInfoURL= domain+'ws_wow_data_controller?WOW_SERVICE=TEST_DELIVERY_INFO&PLATFORM=B';
	 //orderItemInfoURL= domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_ITEM_INFO1&PLATFORM=B';
	 orderItemInfoURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_ITEM_INFO_SINGLE&PLATFORM=B';
	 orderItemInfoMobileURL = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ORDER_ITEM_INFO_MOBILE&PLATFORM=B';
	 articleStockInfoUrl= domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_STOCK_INFO&PLATFORM=B';
	 inventorySeaonCodeUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ARTICLE_SEASON_CODE&PLATFORM=B';
	 
	 getOrderHdrDetailoUrl =  domain+'ws_wow_data_controller?WOW_SERVICE=ORDER_HEADER_DETAIL&PLATFORM=B';
	 updatePreqURL= domain+'ws_wow_data_controller?WOW_SERVICE=UPDATE_ORDER_PREQ&PLATFORM=B';
	 updatePOURL= domain+'ws_wow_data_controller?WOW_SERVICE=UPDATE_ORDER_PO&PLATFORM=B';
	 cancelIBTUrl= domain+'ws_wow_data_controller?WOW_SERVICE=CANCEL_IBT_ORDER&PLATFORM=B';
	 
	 reportDeviceLogUrl= domain+'ws_wow_data_controller?WOW_SERVICE=DEVICE_LOG_REPORT&PLATFORM=B';
	 reportPLUUrl = domain+'ws_wow_data_controller?WOW_SERVICE=PLU_REPORT&PLATFORM=B';
	 reportStockAdjUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=POST_STK_ADJ_HISTORY_LOG&PLATFORM=B';
	 reportStockAdjSAPUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_CENTRAL_STK_ADJ_LOG&PLATFORM=B';
	 reportStockAdjMPLSCUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ADJUSTMENT_LOG_REPORT_MPLSC&PLATFORM=B';
	 reportReasonCodeUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_STK_ADJ_REASON_CODE&PLATFORM=B';
	 reportDGUrl = domain+'ws_wow_data_controller?WOW_SERVICE=REPORT_DG_HAZARD&PLATFORM=B';
	 reportInventoryUrl = domain+'ws_wow_data_controller?WOW_SERVICE=INVENTORY_REPORT&PLATFORM=B';
	 reportGapScanUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GAPSCAN_REPORT_BROWSER&PLATFORM=B';
	 reportRTCUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_RTC_REPORT&PLATFORM=B';
	 reportOOCUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_OOC_REPORT&PLATFORM=B';
	 reportOverstockDailyUrl = domain+'ws_wow_data_controller?WOW_SERVICE=OVERSTOCK_DAILY_REPORT&PLATFORM=B';
	 reportOverstockWeeklyUrl = domain+'ws_wow_data_controller?WOW_SERVICE=OVERSTOCK_WEEKLY_REPORT&PLATFORM=B';
	 reportStockFillUrl = domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_DISPLAY_FOR_STOCK_FILL&PLATFORM=B';
	// reportSTArticleCountUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_ARTICLE_STOCK_COUNT_REPORT&PLATFORM=B';
	 reportSTArticleCountUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_STOCK_COUNT_REPORT&PLATFORM=B';
	 reportSTArticleCountStatusUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_ARTICLE_STOCK_COUNT_STATUS_DETAILS&PLATFORM=B';
	 reportSTMissedArticlesUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_MISSED_ARTICLE_REPORT&PLATFORM=B';
	 reportSTVarianceSummaryUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_VARIANCE_SUMMARY&PLATFORM=B';
	 reportSTMissedArticleRegenerateUrl= domain + 'ws_wow_data_controller?WOW_SERVICE=START_STOCKTAKE_COUNT&PLATFORM=B';
	 reportSTVarianceUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_VARIANCE_BY_ARTICLE&PLATFORM=B';
	 reportSTSubCatVarianceUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_VARIANCE_BY_SUB_CAT&PLATFORM=B';
	 //reportSTVarianceUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_VARIANCE_BY_ARTICLE_1&PLATFORM=B';
	 reportSTAcceptVarianceUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=ST_ACCEPT_VARIANCE&PLATFORM=B';
	 reportSTStartCountUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=START_STOCKTAKE_COUNT&PLATFORM=B';
	 reportSTPostStockAdjUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=POST_ST_STK_ADJ&PLATFORM=B';
	 reportSTAuditSummaryUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_AUDIT_REPORT&PLATFORM=B';
	 reportSTValuationUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_STOCK_VALUATION_REPORT&PLATFORM=B';
	 reportSTUserPerformanceUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_USER_PERFORMANCE_REPORT&PLATFORM=B';
	 reportSTTeamPerformanceUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_TEAM_PERFORMANCE_REPORT&PLATFORM=B';
	 reportSTTeamPerformanceDefaultUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_TEAM_PERFORMANCE_DEFAULT_REPORT&PLATFORM=B';
	 reportSTUpdateLocationUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=UPDATE_ST_LOCATION_STATUS&PLATFORM=B';
	 reportDailyStockCheckNewUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ARTICLE_DISP_FOR_DSC_BASIC&PLATFORM=B';
	 reportDailyStockCheckOldUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_DSC_REPORT_BROWSER&PLATFORM=B';
	 reportLTOUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_LTO_REPORT&PLATFORM=B';		
	 getUsersGapScanUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GAPSCAN_GET_USERS&PLATFORM=B';
	 articleHeaderBasicUrl = domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_HEADER_BASIC&PLATFORM=B';
	 listStockTakeOverrideReasonsUrl = domain+'ws_wow_data_controller?WOW_SERVICE=LIST_STOCKTAKE_OVERRIDE_REASONS&PLATFORM=B';
	 stocktakeFinaliseUrl = domain+'ws_wow_data_controller?WOW_SERVICE=FINALIZE_STOCKTAKE&PLATFORM=B';
	 
	 createEditSTUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=CREATE_STOCKTAKE&PLATFORM=B';
	 getSTCountUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_SCHED_STATUS_COUNT_DTLS&PLATFORM=B';
	 getSTFreqUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_STOCKTAKE_FREQUENCY_TYPES&PLATFORM=B';
	 getSTByStatusUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_BY_STATUS&PLATFORM=B';
	 displaySTUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=DISPLAY_STOCKTAKE&PLATFORM=B';
	 changeSTModeUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=CHANGE_STOCKTAKE_MODE&PLATFORM=B';
	 stockTakeModeUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_MODE_STATUS&PLATFORM=B';
	 getSTSummaryUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_STOCKTAKE_SUMMARY&PLATFORM=B';
	 getSTArticleStockCountStatus = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_ARTICLE_STOCK_COUNT_STATUS&PLATFORM=B';
	 getSTMissedArticleSummaryUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_MISSED_ARTICLE_SUMMARY&PLATFORM=B';
	 getSTMissedArticleSummaryDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_MISSED_ARTICLE_SUMMARY_DETAILS&PLATFORM=B';
	 getUserDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_USER_LIST&PLATFORM=B';
	 getAisleDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_AISLE_DETAILS&PLATFORM=B';
	 getAisleSideDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_AISLE_SIDE_DETAILS&PLATFORM=B';
	 getBayDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_BAY_DETAILS&PLATFORM=B';
	 getSTLocationsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_LOCATIONS&PLATFORM=B';
	 getSTLocationStatusUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_LOCATION_STATUS&PLATFORM=B';
	 getCPBDArticleDetails = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_CPBD_ARTICLE_DETAILS&PLATFORM=B';
	 getSTSubLocationsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_SUB_LOCATIONS&PLATFORM=B';
	 getSTArticleDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_ARTICLE_DETAILS&PLATFORM=B';
	 getSTDetailsForEditUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_STOCKTAKE_DETAILS_FOR_EDIT&PLATFORM=B';
	 getNationalSTBlockingFunctionDetailsUrl = domain + 'ws_wow_data_controller?WOW_SERVICE=GET_ST_FUNCTION_EXCLUDE&PLATFORM=B';
	 
	 getPosPrice = domain+'ws_wow_data_controller?WOW_SERVICE=GET_POS_PRICE&PLATFORM=B';
	 updateExpiryDateUrl=domain+'ws_wow_data_controller?WOW_SERVICE=UPDATE_USE_BY_DATE&PLATFORM=B';
	 getPrintTemplateDetailsUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_TEMPLATE_DTLS_DB_TKTG&PLATFORM=B';
	 sendDetailsToPrinterUrl=domain+'ws_wow_data_controller?WOW_SERVICE=ADD_TICKETS_DB_TKTG&PLATFORM=B';
	 getArticleDetailsForIbtUrl=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_UOM_IBT&PLATFORM=B';
	 //STock Adjust URLS
	 getArticleDetailsForStockAdjustURL=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_FOR_STK_ADJ&PLATFORM=B';
	 lockArticleForStockAdjustmentURL=domain+'ws_wow_data_controller?WOW_SERVICE=STK_ADJ_ARTICLE_LOCK&PLATFORM=B';
	 getReasonCodeForStockAdjustmentURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STK_ADJ_REASON_CODE&PLATFORM=B';
	 getUnpostedStockAdjustmentHistoryURL=domain+'ws_wow_data_controller?WOW_SERVICE=UNPOSTED_STK_ADJ_HISTORY&PLATFORM=B';
	 getPostedStockAdjustmentHistoryURL=domain+'ws_wow_data_controller?WOW_SERVICE=POSTED_STK_ADJ_HISTORY&PLATFORM=B';
	 getIDTPurchaseDept=domain+'ws_wow_data_controller?WOW_SERVICE=GET_IDT_PURCHASE_DEPT&PLATFORM=B';
	 getIDTPurchaseList=domain+'ws_wow_data_controller?WOW_SERVICE=GET_IDT_PURCHASE_LIST&PLATFORM=B';
	 getIDTReverseUrl=domain+'ws_wow_data_controller?WOW_SERVICE=IDT_REVERSE&PLATFORM=B';
	 getStockAdjustmentConfigurationURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STK_ADJ_CONFIG&PLATFORM=B';
	 getCharityCodeListURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STK_ADJ_CHARITY_CODE&PLATFORM=B';
	 postStockAdjustURL=domain+'ws_wow_data_controller?WOW_SERVICE=POST_STK_ADJ&PLATFORM=B';
	 getIDTPurchaseListURL='http://nnorsow3lt326:8080/ws_wow_data_controller?WOW_SERVICE=GET_IDT_PURCHASE_LIST&PLATFORM=B';
	 getOrderDispInfoURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_DISP_INFO&PLATFORM=B';
	 getIDTDepartmentListURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_IDT_PURCHASE_DEPT&PLATFORM=B';
	 rtvHistoryLogUrl=domain+'ws_wow_data_controller?WOW_SERVICE=SAVE_RTV_LOG&PLATFORM=B';
	 getPromoConfigurationURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ISP_CONFIG&PLATFORM=B';
	 rangeArticleToSiteURL=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_DELISTING&PLATFORM=B';
	 dailyStockCheckURL=domain+'ws_wow_data_controller?WOW_SERVICE=INSERT_ARTICLE_DAILY_STOCK_CHK&PLATFORM=B';
	 getLTOLocations=domain+'ws_wow_data_controller?WOW_SERVICE=GET_LTO_LOC_LST&PLATFORM=B';
	 getLTOAisleInfo=domain+'ws_wow_data_controller?WOW_SERVICE=GET_LTO_AISLE&PLATFORM=B';
	 getLTOFixtureTypes=domain+'ws_wow_data_controller?WOW_SERVICE=GET_FIXTURES&PLATFORM=B';
	 createOrEditLTOLocation=domain+'ws_wow_data_controller?WOW_SERVICE=CREATE_OR_EDIT_LTO_LOCATION&PLATFORM=B';
	 getLTOCategories=domain+'ws_wow_data_controller?WOW_SERVICE=GET_LTO_CATEGORIES&PLATFORM=B';
	 getSupplierSuggestionsUrl=domain+'ws_wow_data_controller?WOW_SERVICE=SUPPLIER_SMART_SEARCH&PLATFORM=B';
	 getSupplierSuggestionsLookupUrl=domain+'ws_wow_data_controller?WOW_SERVICE=SUPPLIER_SMART_SEARCH_LOOKUP&PLATFORM=B';
	 getULDDetailsUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_PALLET_DETAILS&PLATFORM=B';
	 updateULDDetailsUrl=domain+'ws_wow_data_controller?WOW_SERVICE=UPDATE_ULD_SWEEP&PLATFORM=B';
	 verifyUserURL = domain+'ws_wow_data_controller?WOW_SERVICE=GET_USR_INFO&PLATFORM=B';
	 getCarrierSuggestionsUrl = domain+'ws_wow_data_controller?WOW_SERVICE=CARRIER_SMART_SEARCH&PLATFORM=B';
	 getULDReceiveInfoUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_ULD_RECV_INFO&PLATFORM=B';
	 getStockAdjUsers=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STK_ADJ_USERS&PLATFORM=B';
	 getSOHConfigURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STK_ADJ_CONFIG&PLATFORM=B';
	 getGpInfoURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_GROSS_PROFIT&PLATFORM=B';
	 getNearbyStoreDtlInfo=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STORE_DTL_INFO&PLATFORM=B';
	 printTicketUrl=domain+'ws_wow_data_controller?WOW_SERVICE=PRINT_TICKETS&PLATFORM=B';
	 notificationListUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_NOTIFICATION_HDR&PLATFORM=B';
	 notificationDtlListUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_NOTIFICATION_DETAIL&PLATFORM=B';
	 rejectIBTOrderURL=domain+'ws_wow_data_controller?WOW_SERVICE=REJECT_IBT_ORDER&PLATFORM=B';
	 changePwdLocalURL=domain+'ws_wow_data_controller?WOW_SERVICE=CHANGE_PASSWORD_LOCAL&PLATFORM=B';
	 orderOnReceiptURL = domain+ 'ws_wow_data_controller?WOW_SERVICE=ORDER_ON_RECEIPT1&PLATFORM=B';
	 otherMarkdownReasonUrl = domain+'ws_wow_data_controller?WOW_SERVICE=GET_OTHER_MARKDOWN_REASONS&PLATFORM=B';
	 //testFreshFoodUrl= domain+'ws_wow_data_controller?WOW_SERVICE=TEST_FRESH_FOOD&Platform=B';
	 testFreshFoodUrl= domain+'ws_wow_data_controller?WOW_SERVICE=FRESH_FOOD_INFO_GET&Platform=B';
	 getarticleStyleSuggestions=domain+'ws_wow_data_controller?WOW_SERVICE=STYLE_SMART_SEARCH&Platform=B';
	 getInfoByStyleURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_INFO_BY_STYLE&Platform=B';
	 getStoreSohLogDetailsURL=domain+'ws_wow_data_controller?WOW_SERVICE=GET_STORE_SOH_LOG_DETAILS&Platform=B'; 
	 getArticleHeaderBasicRoutine = domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_HEADER_BASIC_ROUTINES&Platform=B';
	 getIsFreshfoodFlag=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ST_FRESHFOOD_ONLY&Platform=B';
	 getAlterNateVendor=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ALTERNATE_SUPPLIERS&Platform=B';
	 packBreakArticleSearchDraft=domain+'ws_wow_data_controller?WOW_SERVICE=ARTICLE_SEARCH_UOM_DRAFT&Platform=B';
	 gethierarchyDetailsST=domain+'ws_wow_data_controller?WOW_SERVICE=HIERARCHY_GET_ST&PLATFORM=B';
	 //gethierarchyDetailsST=domain+'ws_wow_data_controller?WOW_SERVICE=HIERARCHY_GET&PLATFORM=B';
	 displaySTStatusUrl=domain+'ws_wow_data_controller?WOW_SERVICE=GET_ST_STATUS&Platform=B';
	 adjustLocalSohForRepairs=domain+'ws_wow_data_controller?WOW_SERVICE=ADJUST_REPAIRS_SOH&Platform=B';
	 validateSTInprogress=domain+'ws_wow_data_controller?WOW_SERVICE=VALIDATE_ST_INPROGRESS&Platform=B';
	 //"SC-526/12014"
	 getSTCoutedLocation =domain+'ws_wow_data_controller?WOW_SERVICE=GET_ST_LOC_DTLS_FOR_BC_REPORT&Platform=B';
	 
	 //add for NGBO Pilot will be commented later on
	 /*if($('#ngboPilotStore').val() == 'Y' && callMonitorNotification){
	 	//loadNotifications();
	 	//blockNationalStocktakeFunctions();
	 }*/
	 
});
