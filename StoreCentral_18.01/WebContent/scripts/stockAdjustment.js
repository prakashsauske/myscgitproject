//Code is taken from http://flaviusmatis.github.io/simplePagination.js/#page-20 -->
var warningQty='';
var maxLimitQty='';
var idtPurchaseLimitQty='';
var historyDaysRange='';
var warningMsg='';
var plusMinusInd='';
var reasonCode='';
var movementType='';
var reasonDesc ='';
var randomWgt='';
var randomWgtQty='';
var randomWgtUom ='';
var charityCode='';
var charityDesc='';
var currentSOH='';
var fromScreen;
var adjustReasonMap={};
var adjustedQty=0;
var articleType = '';
var orderSearchDetailsArray = new Array();
var orderDispatchQtyMap = {};
var orderRxdDate ='';
var orderRecvdQtyMap = {};
var orderReceivedQtyUOM = '';
var orderReceivedQtyOM = '';
var orderDispatchQtyUOM = '';
var orderDispatchQtyOM = '';
var wareHouseStockAdjDayLimit = '';
var returnMsg ='Sale Or Return item. Return to vendor for credit. Do you want to raise a claim?';
var leaveScreenMsg = 'You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
var claimLink = '../order/claimsOnPageLoad.htm?param=createNewClaim&from=stockAdj&articleNo=';
var selectedArticle={};
var articleAdjusted='';
var initCount='Z41';
var iv_order_supplier = '';
var seg_no ='';
var transQtyReasonStockAdjItem = 1;
var transFromEndSOH = '';
var transToEndSOH = '';
var idtReverseGroupBySubCatMap = {};
var endSOHInitialValueSetFlag = false;
var supplierNo ='';
var srcOfSupplyInd ='';
var uomRvreIDT = '';
var globelObj = '';
var currentSOHQty = '';
var transfQtyCpbd = '';
var useLessUOM=['YLD','LNK']; 
		$(document).ready(function() {
			$('#dialog-common').dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 150,
				maxHeight : 600,
				width : 530
			});
			$('#dialog-unreceived-orders').dialog({
				autoOpen : false,
				modal : true,
				resizable : false,
				minHeight : 150,
				maxHeight : 600,
				width : 530
			});
			$("#dialog-common").parent().addClass("popupWrapper");
			
			$("#dialog-unreceived-orders").parent().addClass("popupWrapper");
			
			$("#menu").menu({ position: { my: "right top", at: "right top+20" } });
			
			$("#sections").tabs({ active: 0});
		
			$(window).scroll(function(){
			if ($(this).scrollTop() > 50) {
				$('.scrollup').fadeIn();
			} else {
				$('.scrollup').fadeOut();
			}
		});
		
		$('.scrollup').click(function(){
			$("html, body").animate({ scrollTop: 0 }, 400);
			return false;
		});
		
 
		$('#sohArticleSearch').click(function()
				{
			var sohArticleNo=$('#sohSearchBox').val().trim().split('-')[0];
			if(validateForm())
			{				
				if(isNaN(sohArticleNo)){				
					//getArticleDetailsForStockAdjust(sohArticleNo,fromScreen);
					//getArticleDetForDesSearch(sohArticleNo)
					var param = {
							"iv_article"	: sohArticleNo,
							"iv_site"		: siteVal,
							"iv_sales_org"	: salesOrgVal,
							"iv_supplier"	: supplierNo,
							"iv_src_supply"	: srcOfSupplyInd,
							"iv_ranged"		: "Y",
							"iv_session_id"	: "",
							"iv_barcode"	: "",
							"iv_node_level"	: "",
							"iv_node_id"	:  "",
							"iv_desc"		:"",
							"iv_article_no"	: "N",
							"iv_gtin"		: "N",
							"iv_barcode_flag":"",
							"iv_auto_stockr_flag":"",
							 "iv_style": "",
							  "iv_colour": "",
							  "iv_article_size": ""
						};
						url = getArticleHeaderBasicRoutine;
						console.log(url+'  '+JSON.stringify(param));
					$.ajax({
					      data: JSON.stringify(param),
					      url: url,
					      type: 'post',
					      beforeSend: function() {
					    	  startLoading();
					      }
					}).done(function(response) {
						if(response != undefined && response.length > 0){
						$.fn.loadArticlePopUpForStkAdjNew(response,'','',onArticleTdSelectInSOHAdjustNew,selectOption,$("#sohSearchBox").val());
						}else {
							$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
			    			stopLoading();	
						}
						stopLoading();
					});
				}else{
					getArticleDetailsForStockAdjust(sohArticleNo,fromScreen);
				}
			}
			});
			
			createAutoSuggest($('#sohSearchBox'),$('#sohArticleSearch'));
			createAutoSuggest($('#transToArticle'),$('#transToArticleSearch'));
			
			populateStockAdjustmentReason((fromScreen == undefined || fromScreen == '') ? '' : 'INIT');
			
			$('.sohAdjustHistory').click(function()
					{
				var sohArticleNo= $('#sohArticleTitle').text().split('-')[0].trim();
				//$('#sohHistoryInAdjustNewContent').addClass('hideBlock');
				getAdjustPostedHistory(sohArticleNo);
					});
			/* 17.08 - SOH History Changes
			 * $('.sohHistoryinAdjustNew').click(function()
					{
				var sohArticleNo= $('#sohArticleTitle').text().split('-')[0].trim();				
				$('#sohHistoryInAdjustNewContent').removeClass('hideBlock');
				showSOHHistoryinAdjustment(sohArticleNo);
					});*/
			$('#saveSOH').click(function(){
				/*if(validateAdjustSOHForm()){
				calculateSOHAdjustment();
				}*/
				 if($("#reasonsForSOHAdjust").val() == '83'){//Transfer Qty BWS
					 if(validateFieldsForTransferToReasonCode()){
							var elem = $("#transQty");
							var number_single_unit = Number(selectedArticle.num_of_soh_units||'1');
							var testValue = $("#transQty").val();
							var fromArticle = $('#selectedArticleObj').data('obj');
							if(fromArticle.complex_pbd_flag == 'Y' && fromArticle.display_item_ind == 'Y'){	// Reason code 83 -popup
							testValue = (testValue *Number (fromArticle.cpbd_pack_size));
							}
							testValue = (testValue*number_single_unit);
							if(testValue<= warningQty) {
								calculateSOHAdjustment();				
							}else{
								if(testValue > maxLimitQty){
									okElem=elem;
									warningMsg='Your adjustment value cannot exceed '+maxLimitQty+'';
									$.fn.warnPopup('alert',warningMsg,'Stock Adjustment','','',triggerOk,'');
								}else{			
									warningMsg='You are adjusting SOH by '+testValue+', do you wish to continue?';
									$.fn.warnPopup('warn',warningMsg,'Stock Adjustment',triggerYesTransferTo,triggerNo,'',elem);
								}			
							}
					 }					
				 }else{
					 updateCurrentEndSOH($('#uomRadioContent input[name="adjustSOH"]:first'),this);
				 }
			});
			
			$('#reasonsForSOHAdjust').change(function()
					{
				 if(($("#reasonsForSOHAdjust").val() == 'PI' || $("#reasonsForSOHAdjust").val() == '1') && selectedArticle.linkage_factor < 1){
					 $.fn.warnPopup('','PI Verify is not allowed for this child article. Please select parent article to adjust SOH.','Stock Adjustment',
							 '','',function(){$('#dialog-alert-conf').dialog('close');},'');
                     $('#reasonsForSOHAdjust').val("");
				 }else if(($("#reasonsForSOHAdjust").val() == 'PI' || $("#reasonsForSOHAdjust").val() == '1') && selectedArticle.complex_pbd_flag != null
						 && selectedArticle.complex_pbd_flag != undefined && selectedArticle.complex_pbd_flag == 'Y' 
							 && selectedArticle.cpbd_pack_size != '1'){
					 $.fn.warnPopup('','PI Verify is not allowed for complex pack break down article. Please select base article to adjust SOH.','Stock Adjustment',
							 '','',function(){$('#dialog-alert-conf').dialog('close');},'');
                     $('#reasonsForSOHAdjust').val("");
				 }
				if(nonPiItem)//for defect 5006
					{
					if($(this).val()=='30'||$(this).val()=='70' || $(this).val() == 'PI')
						{
						var $focusElem = $('#reasonsForSOHAdjust');
						var $selectedOption = $('#reasonsForSOHAdjust :selected');
						var reasonDescNew =$selectedOption.text();
						var reasonCodeNew =$(this).val();
						//$.fn.showCustomMsg(['Stock Adjustment for "'+reasonCodeNew+', '+reasonDescNew+'" is Not Applicable For Non-Perpetual Articles'],error,'Stock Adjustment','',$focusElem);
						$.fn.showCustomMsg(['Stock Adjustment for "'+reasonDescNew+'" is Not Applicable For Non-Perpetual Articles'],error,'Stock Adjustment','',$focusElem);   //defect_9395
						$('#reasonsForSOHAdjust').val("");
						}
				else
					{
				var $selectedOption = $('#reasonsForSOHAdjust :selected');
				var recue_stock = $selectedOption.attr('recue_stock'); 
				plusMinusInd=$selectedOption.attr('plus_or_minus_ind');
				reasonCode=$(this).val();
				reasonDesc=$selectedOption.text();
				movementType=$selectedOption.attr('movement_type');
				resetFieldsOfTransferToReasonCode();
				hideOrShowBasedOnReasonChange(reasonCode,recue_stock);
				if(isPBDarticle){
					if($(this).val()=='75'||$(this).val()=='10'){
						$('#uomRadioContent input').removeClass('hideBlock').addClass('hideBlock');
						$('#uomRadioContent').find('#'+sohArticleObj.order_uom).removeClass('hideBlock');
					}else if($(this).val()=='PI'){//added for defect 6327
						$('#uomRadioContent input').removeClass('hideBlock').addClass('hideBlock');
						$('#uomRadioContent').find('#'+sohArticleObj.base_uom).removeClass('hideBlock');
					}else{
						$('#uomRadioContent input').removeClass('hideBlock');
					}
				}
					}
					}
				else
					{
				var $selectedOption = $('#reasonsForSOHAdjust :selected');
				var recue_stock = $selectedOption.attr('recue_stock'); 
				plusMinusInd=$selectedOption.attr('plus_or_minus_ind');
				reasonCode=$(this).val();
				reasonDesc=$selectedOption.text();
				movementType=$selectedOption.attr('movement_type');
				resetFieldsOfTransferToReasonCode();
				hideOrShowBasedOnReasonChange(reasonCode,recue_stock);
				if(isPBDarticle){
					if($(this).val()=='75'||$(this).val()=='10'){
						$('#uomRadioContent input').removeClass('hideBlock').addClass('hideBlock');
						$('#uomRadioContent').find('#'+sohArticleObj.order_uom).removeClass('hideBlock');
					}else if($(this).val()=='PI'){//added for defect 6327
						$('#uomRadioContent input').removeClass('hideBlock').addClass('hideBlock');
						$('#uomRadioContent').find('#'+sohArticleObj.base_uom).removeClass('hideBlock');
					}else{
						$('#uomRadioContent input').removeClass('hideBlock');
					}
				}
					}
					});
			
			$('#charityList').change(function()
					{
				var $selectedOption = $('#charityList :selected');
				charityCode=$(this).val();
				charityDesc=$selectedOption.text();
					});
			
			$('#cancelCharity').click(function(){
				 $('#dialog-common').dialog('close');
			});
			
			$('#backBtnId').click(function()
					{
				$(this).removeClass('hideBlock').addClass('hideBlock');
				showSOHLookUp();
					});
			
			$('#searchOrder').click(function()
					{ 	
				//if(validateOrderNoVerify())
				orderSearchDetailsArray = new Array();
				callServiceToSearchOrder($('#orderNoUndrWhse').val());
					});
			$('#cancelSOH').click(function()
			{
				if($('#endSOHValue').text() != $('#endSOHValue').attr('initialValue')){//some changes are there..so warning mesg
					$.fn.warnPopup('warn',leaveScreenMsg,'Stock Adjustment',triggerLeaveStkAdjScreenYes,triggerLeaveStkAdjScreenNo,'',$(this),'Discard/Back');
				}else{//no changes.no warning.just redirect
					handleLeaveStkAdjScreenYes();
				}
				
			});
			
			
			
		/*	window.onbeforeunload = function() {
				if(fromScreen == undefined && $('#sohLookupContainer').hasClass('hideBlock') && !$('.sohArticleDetails ').hasClass('hideBlock') )
				return "You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes";
				else
					return null;
			};*/

			if(fromScreen == undefined && !$('#sohLookupContainer').hasClass('hideBlock') && $('.sohArticleDetails ').hasClass('hideBlock') )
			$('#sohSearchBox').focus();
			
			
			$('#yes-btn-orders').click(function(){
				calculateSOHAdjustment('Y');
			});
			
			loadConfiguration();
			//For BWS - Transfer qty reason code
			$(".adjustTransferSOHKeyPress").onChangeOfTransferQtyField();
			
			$('#transToArticleSearch').click(function() {
				var tmpsohArticleNo= $('#transToArticle').val().split('-')[0].trim();
				if(validateArticleNoTransferQty()){
					getTransferToArticleDetailsForStockAdjust(tmpsohArticleNo);
				}				
				calculateEndSOHForTransferQty();
			});
			$('#transToArticle').change(function() {
				$("#verifyTransToArticleLabel").attr('verified',false);
				$("#transToEndSOHDiv").addClass("hideBlock");
				unlockSecondArticle();
				$('#selectedArticleObjTransferTo').data('obj','');
				calculateEndSOHForTransferQty();
			});
			$('#transQty').onlyNumbers();
			
			if($('#claimArticle').val()  != undefined && $('#claimArticle').val() != ""){
				$('#sohSearchBox').val($('#claimArticle').val());
				$('#sohArticleSearch').trigger('click');
			}
			
		});
var configObj={stk_adj_warning_qty: 99, stk_adj_blocking_qty: 999, idt_purchase_limit: 25, adjustment_history_days: 28, wh_over_delv_days_limit: 28};//If service fails 
var loadConfiguration=function(){
	var param ={
		  "iv_session_id": "111",
		  "iv_site_no": $("#posSite").val(),
		  "iv_sales_org": $("#salesOrg").val(),
	};
	  
	var url = getSOHConfigURL;
	console.log(url+' '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
      }
	}).done(function(response) {
//		configObj=response[0];
	}).fail(function() {
	
	});
};
var triggerLeaveStkAdjScreenYes = function(e)
{
handleLeaveStkAdjScreenYes(e);
var $elem = e.data.msg;
$elem.dialog('close');
};


var onArticleTdCheckInStockAdj = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	var len =0;
	var unChecked;
	var position;
	var $selectBtn = $('#dialog-mulipleArticles #addtolist');
	var checkedObj = $selectBtn.data('checkedObj');
	checkedObj = checkedObj == undefined ? [] :checkedObj;
		if($elem.is(':checked')){
			obj.checked = true;
			checkedObj.push(obj);
		}else{
			obj.checked = false;
			unChecked = obj,
		    position = checkedObj.indexOf(unChecked);
		if ( ~position ) checkedObj.splice(position, 1);
		}
		len = Object.keys(checkedObj).length;
		if(len == 0){
			$selectBtn.text('Add to List').addClass('hideBlock');
		}else{
			$selectBtn.text('Add to List ('+(len >9 ? len : '0'+len)+')').removeClass('hideBlock').data('checkedObj',checkedObj);
		}
	};

var recallArticleSearchUOM = function (event){	
	$elem = $(this);
	var list =[];
	list = $elem.data('checkedObj');  
	var artNumList ='';
	 if ($('#all1')
			    .is(':checked')) {
			    srcOfSupplyInd = "";
			    supplierNo = "";
			  } else if ($('#warehouse1')
			    .is(':checked') && $('#mo_wareHouseDropDown')
			    .val() != '0') {
			    srcOfSupplyInd = "2";
			    supplierNo = $('#mo_wareHouseDropDown')
			      .val();;
			  } else if ($('#vendor1')
			    .is(':checked')) {
			    srcOfSupplyInd = "1";
			    supplierNo = $('#vendorText')
			      .val()
			      .split('-')[0];
			  }
	for (var i = 0; i < list.length; i++) {
      var articleNo = list[i].article == undefined ? list[i].article_no : list[i].article;
      artNumList = (artNumList!= '' || artNumList != undefined)? artNumList+",":artNumList;	
      artNumList +=  articleNo;
	}
	if(artNumList != ''){
		
	}
}

function handleLeaveStkAdjScreenYes(e){
	$('#sohSearchForm')[0].reset();
	 $('#sohDetails')[0].reset();
	 $('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
	 $('.otherReasonsDiv').addClass('hideBlock').removeClass('hideBlock');
	 if(fromScreen != undefined){
		 $("#detailsDivision").removeClass(
			"hideBlock");
		$("#backDiv").removeClass(
				"hideBlock");
		$('#backBtn').removeClass('adjustSOH');
		$("#topLink3")
				.addClass("hideBlock");
		$("#topLink2").addClass(
				"hideBlock");
		$("#topLink1").removeClass(
				"hideBlock");
		$("#adjustSOHDiv")
				.addClass('hideBlock');	
		if(rangingAndDeranging){
			$sohAdjelem.dialog('close');
		}
	 }					 
	 else{
		 showSOHLookUp();
	 }
	
//This method will unlock the current article being stock adjusted
unlockSelectedArticle();	
unlockSecondArticle();
var $elem = e.data.msg;
$elem.dialog('close');
};
var triggerLeaveStkAdjScreenNo = function(e)
{
	var $elem = e.data.msg;
$elem.dialog('close');
};
		
var triggerYes = function(e){
	var $elem = e.data.msg;
	//calculateEndSOH();
	if(validateAdjustSOHForm()){
		calculateSOHAdjustment();
	}
	$elem.dialog('close');
};
var triggerYesTransferTo = function(e){
	var $elem = e.data.msg;
	//calculateEndSOH();
	calculateSOHAdjustment();
	
	$elem.dialog('close');
};
var okElem;
var triggerOk = function(){
	$('#dialog-alert-conf').dialog('close');	
	$('#uomRadioContent input[name="adjustSOH"]').val('');
	okElem.val('').focus();	//Defect 4989
	if(reasonCode == "83"){
		calculateEndSOHForTransferQty();
	}else{
	calculateEndSOH();
	}
	/*$('#uomRadioContent input[name="adjustSOH"]').each(function(){
		$(this).focus();
	});*/
};

var triggerNo = function(e){
	var $elem = e.data.msg;
	var $textboxElem = e.data.cache;
	//setTimeout(function(){$textboxElem.focus();}, 0);
	$textboxElem.val('').focus();
	if(reasonCode == "83"){
		calculateEndSOHForTransferQty();
	}else{
		calculateEndSOH();
	}
	
	$elem.dialog('close');
};

function validateForm(){
		var $focusElem =$('#sohSearchBox');
		var aritcleText=$focusElem.val().trim().split('-')[0];
		var errors=[];
		if (aritcleText == '') {
			errors.push('Please enter keyword to lookup');
			showErrors(errors,$focusElem);
			$('#sohSearchBox').focus();
			return false;
		}
	else {
		if (aritcleText != ''
				&& isNaN(aritcleText) && !(aritcleText.length > 2)) {
			errors.push("Please input a minimum of 3 characters.");
			showErrors(errors,$focusElem);
			$('#sohSearchBox').focus();
			return false;
		}
	}
										
		return true;
	}
function validateArticleNoTransferQty(){
	
	var $focusElem = $('#transToArticle');
	var aritcleText = $focusElem.val().trim().split('-')[0];
	var errors=[];
	if (aritcleText == '') {
		errors.push('Please enter keyword to lookup Transfer To Article');
		showErrors(errors,$focusElem);
		$('#sohSearchBox').focus();
		return false;
	}
else {
	if (aritcleText != ''
			&& isNaN(aritcleText) && !(aritcleText.length > 2)) {
		errors.push("Please input a minimum of 3 characters in Transfer To Article.");
		showErrors(errors,$focusElem);
		$('#transToArticle').focus();
		return false;
	}
}
									
	return true;
}
	
function showErrors(errors,$focusElem)
{
	/*var stockAdjQtyError = false;
	if(errors != undefined && errors.length > 0){			
		for(var i=0;i<errors.length;i++){
			if(errors[i].indexOf('Qty') > -1 || errors[i].indexOf('Quantity') > -1){
				stockAdjQtyError = true;
			}
		}		
		if(stockAdjQtyError){
			$.fn.showCustomMsg(errors,'error-SAQTY','Stock Adjustment');
		}else{
			$.fn.showCustomMsg(errors,error,'Stock Adjustment');
		}
							
	}else{*/
			$.fn.showCustomMsg(errors,error,'Stock Adjustment','',$focusElem);
	/*}*/	
}
function handleStockAdjQTYError(){
	//set focus to qty field
	/*$("#error-warn-SAQTY-wrapper").fadeOut(50);
	$('#uomRadioContent input[name="adjustSOH"]').each(function(){
		$(this).focus();
	});*/
	$("#error-warn-SAQTY-wrapper").fadeOut(50);
}

var sohArticleObj={};
var isPBDarticle=false;
function getArticleDetForDesSearch(sohArticleNo,from){
var param = {
	"iv_article"	: sohArticleNo,
	"iv_site"		: siteVal,
	"iv_sales_org"	: salesOrgVal,
	"iv_supplier"	: supplierNo,
	"iv_src_supply"	: srcOfSupplyInd,
	"iv_ranged"		: "Y",
	"iv_session_id"	: "",
	"iv_barcode"	: "",
	"iv_node_level"	: "",
	"iv_node_id"	:  "",
	"iv_desc"		:"",
	"iv_article_no"	: "N",
	"iv_gtin"		: "N",
	"iv_barcode_flag":"",
	"iv_auto_stockr_flag":"",
	 "iv_style": "",
	  "iv_colour": "",
	  "iv_article_size": ""
};
url = articleHeaderBasicUrl;
console.log(url+'  '+JSON.stringify(param));
};
function getArticleDetailsForStockAdjust(sohArticleNo,from)
{
	var url = getArticleDetailsForStockAdjustURL;
	var gtinFlag = '';
	if (!isNaN(sohArticleNo) && ((sohArticleNo).length > 7)) 
		gtinFlag = "Y";
	var stkMultipleArticle = sohArticleNo;
	var param={
			"iv_article" : sohArticleNo,
			"iv_gtin_flag": gtinFlag,
			"iv_barcode": '',
			"iv_barcode_flag" : '' ,
			"iv_sales_org" : salesOrgVal,
			"iv_site" : siteVal,
			"iv_session_id" : '000',
			"iv_user": userId,
			"iv_platform" : 'B',
			"iv_unknown_flag" : (rangingAndDeranging ? "Y" : "N")
	};
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		console.log(response);
		var validate = true;
		if(!checkResult(response,'msg_type','Stock Adjustment')){
			validate = false;	
			if(rangingAndDeranging){
			$('#errorWrapper').hide();
				validate = true	
				response[0] = createRangingObj();
			}
		}
		if(validate){
			uomRvreIDT = response;
			if(response.length > 0){
					endSOHInitialValueSetFlag = false;//For new article reset this to set the initial value
					if(response.length == 1 && response[0].msg_type == 'F'){
						if(from != undefined){
							$('#backBtn').trigger('click');
							}
						$.fn.showCustomMsg([response[0].msg],error,'Stock Adjustment');
					}else if(fromScreen !=undefined && response.length == 1 && response[0].linkage_factor < 1){
						/*if(from != undefined){
							$('#backBtn').trigger('click');
							}*/
						$.fn.warnPopup('','Child Article. Please use parent article to adjust.','Stock Adjustment','','',function(){$('#dialog-alert-conf').dialog('close');},'');
					}else {
							//getRecentHistory(response[0]);
							if(from !=undefined){
								if(rangingAndDeranging == false){
									navigateToSOHWithPiVerify();
								}
							}
							var sohArticleNumber ='';
							if(from !=undefined && response.length >1){
								for(var i=0;i<response.length;i++){
									if(stkMultipleArticle != '' && stkMultipleArticle !=undefined &&(stkMultipleArticle == response[i].article_no)){
										$('#selectedArticleObj').data('obj',response[i]);
										articleType = response[i].article_type;
										sohArticleNumber = response[i].article == undefined ? response[i].article_no
												: response[i].article;
										sohArticleObj=response[i];
									}
								}
							}else {
								$('#selectedArticleObj').data('obj',response[0]);
								articleType = response[0].article_type;
								sohArticleNumber = response[0].article == undefined ? response[0].article_no
										: response[0].article;
								sohArticleObj=response[0];
							}
							
							var sohArticleNo = sohArticleNumber;
							var param=
								{
									"iv_article" : sohArticleNo,
									"iv_user_id" : userId,
									"iv_session_id" : '00',
									"iv_routine": "STK_ADJ",
									"iv_lock_flag" : 'L'
								};
							
							var list = [];
							isPBDarticle=false;
							if(response.length == 1){
								if(preCheck(param,response[0],list,"")){
									lockSelectedArticle(param,response[0], list,"");
								}
							}else{
								if(checkIfSameArticleInResponse(response)){
									if(response[0].msg_type == 'F'){
										if(from != undefined){
											$('#backBtn').trigger('click');
											}
										$.fn.showCustomMsg([response[0].msg],error,'Stock Adjustment');
									}else{
										list = response;
										isPBDarticle=true;
										if(preCheck(param,response[0],list,"")){
											lockSelectedArticle(param,response[0], list,"");
										}
									}
								}else{
									var correctArray = [];
									correctArray = response;/*.filter(function (el) {
				                        return el.article_no !='' && el.article_no != null;
				                       });*/
										console.log('correctarray length : '+correctArray.length);
										if(checkResult(correctArray,'article_no','Stock Adjustment')){
											$.fn.loadArticlePopUpForStkAdj(correctArray,'','',onArticleTdSelectInSOHAdjust,selectOption,$("#sohSearchBox").val());
										}
										if(from != undefined){
											//$('#article_search_result_table tbody tr:first').find('.selectItem').trigger('click');
											var configObj = $('#article_search_result_table').data('confObj');
											var contentLength = configObj.content;
											for(var i=0;i<contentLength.length;i++){
												if(sohArticleNo == configObj.content[i].article_no){
													$('#article_search_result_table tbody tr:eq('+i+')').find('.selectItem').trigger('click');
												}
											}
										}
										
									stopLoading();
								}
							}
					}
				}
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	}).always(function() {
		//$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}
function createRangingObj(){
	var pi_uom = '';
	var pi_om = '';
	var rnd_wgt = 'N';
	if( rplArray != null && rplArray.length > 0 && rplArray[0].pi_uom !=undefined){
		pi_uom = rplArray[0].pi_uom;
		pi_om = (rplArray[0].pi_om||1);
	}
	if(pi_uom =='EA' && globelResponse.article_uom == 'KG'){
		rnd_wgt = 'Y';
	}
	var dummyObj = {
		"msg_type": "S",
		"msg": null,
		"article_no": globelResponse.article_no,
		"article_desc": globelResponse.article_desc,
		"pbd_uom": "",
		"scan_uom": null,
		"base_uom": globelResponse.article_uom,
		"soh": globelResponse.soh,
		"pi_soh": null,
		"lto": 0,
		"pbd_flag": "N",			//globelResponse.pack_break_down_flag
		"cpbd_flag": "N",
		"pack_size": "1",
		"perpetual_flag":globelResponse.perpetual_flag,
		"supplier_no": "",
		"source_of_supply": "",
		"sale_or_return_flag": "",
		"random_weight_flag": rnd_wgt,
		"weighted_article_flag": "N",
		"article_type": "",
		"om": globelResponse.om,
		"department": globelResponse.department_no,
		"category": globelResponse.category_no,
		"sub_category": globelResponse.sub_category_no,
		"segment":globelResponse.segment_no,
		"delivery_date": null,
		"qty": null,
		"received_uom": null,
		"article_short_desc": "",
		"std_sell_price": globelResponse.standard_sell_price,
		"promo_sell_price": globelResponse.promo_sell_price,
		"deleted_ind": globelResponse.delete_ind,
		"was_on_promo_flag": null,
		"allow_only_initial_count": "Y" ,
		"order_uom": null,
		"pi_om": pi_om,
		"linkage_factor": 1,
		"display_item_ind": "",
		"prepack_item_ind": "",
		"pi_uom": pi_uom,
		"sales_set_flag": "",
		"allow_decimal_adj": globelResponse.allow_decimal_adj,
		"linked_article_flag": "N",
		"complex_pbd_flag": "N",
		"cpbd_pack_size": 0,
		"num_of_soh_units": 0,
		"zea_zkg_flag": "N",
		"pack_size_numerator": 1,
		"pack_size_denominator": 1
	}
	return dummyObj;
}
function getTransferToArticleDetailsForStockAdjust(sohArticleNo)
{
	var url = getArticleDetailsForStockAdjustURL;
	var gtinFlag = '';
	if (!isNaN(sohArticleNo) && ((sohArticleNo).length > 7)) 
		gtinFlag = "Y";
	var param={
			"iv_article" : sohArticleNo,
			"iv_gtin_flag": gtinFlag,
			"iv_barcode": '',
			"iv_barcode_flag" : '' ,
			"iv_sales_org" : salesOrgVal,
			"iv_site" : siteVal,
			"iv_session_id" : '000',
			"iv_user": userId,
			"iv_platform" : 'B',
			"iv_unknown_flag" : 'N'
	};
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'msg_type','Stock Adjustment')){
			
				if(response.length > 0){
					if(response.length == 1 && response[0].msg_type == 'F'){						
						$.fn.showCustomMsg([response[0].msg],error,'Stock Adjustment');
					}else {
							//getRecentHistory(response[0]);
							$('#selectedArticleObjTransferTo').data('obj',response[0]);
							articleType = response[0].article_type;
							var sohArticleNo = response[0].article == undefined ? response[0].article_no
									: response[0].article;
							sohArticleObj=response[0];
							var param=
								{
									"iv_article" : sohArticleNo,
									"iv_user_id" : userId,
									"iv_session_id" : '00',
									"iv_routine": "STK_ADJ",
									"iv_lock_flag" : 'L'
								};
							
							var list = [];
							isPBDarticle=false;
							if(response.length == 1){
								if(preCheck(param,response[0],list,"TRANS")){
									lockSelectedArticle(param,response[0], list,"TRANS");
									$("#verifyTransToArticleLabel").attr('verified',true);
									$("#transToEndSOHDiv").removeClass("hideBlock");
									calculateEndSOHForTransferQty();
									//$("#transToEndSOHDiv").removeClass("hideBlock");
									
								}
							}else{
								if(response[0].pbd_flag == 'Y' && checkIfSameArticleInResponse(response)){
									list = response;
									isPBDarticle=true;
									if(preCheck(param,response[0],list,"TRANS")){
										lockSelectedArticle(param,response[0], list,"TRANS");
										$("#verifyTransToArticleLabel").attr('verified',true);
										$("#transToEndSOHDiv").removeClass("hideBlock");
										calculateEndSOHForTransferQty();
									}
								}else{
									var correctArray = [];
									correctArray = response;/*.filter(function (el) {
				                        return el.article_no !='' && el.article_no != null;
				                       });*/
									
										console.log('correctarray length : '+correctArray.length);
										if(checkResult(correctArray,'article_no','Stock Adjustment')){
											$.fn.loadArticlePopUpForStkAdj(correctArray,'','',onTransferArticleTdSelectInSOHAdjust,selectOption,$("#transToArticle").val());
										
										}
										
										
									stopLoading();
								}
							}
					}
				}
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	}).always(function() {
		//$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}
function checkIfSameArticleInResponse(response){
	var rtnFlag = true;
	for(var i=0;i<response.length;i++){
		if(response[0].article_no != response[i].article_no){
			rtnFlag = false;
			return rtnFlag;
		}
	}
	return rtnFlag;
}

var onArticleTdSelectInSOHAdjust = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	if(obj.msg_type == 'F'){
		$.fn.showCustomMsg([obj.msg],error,'Stock Adjustment');
	}else{
		$('#selectedArticleObj').data('obj',obj);
		var sohArticleNo = obj.article == undefined ? obj.article_no
				: obj.article;
		var param=
			{
				"iv_article" : sohArticleNo,
				"iv_user_id" : userId,
				"iv_session_id" : '00',
				"iv_routine": "STK_ADJ",
				"iv_lock_flag" : 'L'
			};
		var list=[];
		if(obj.pbd_flag == 'Y')
			{
			var confObj = $('#article_search_result_table').data('confObj');
			var response= confObj.content;
			list = response.filter(function(obj)
					{
				return obj.article_no == sohArticleNo;
					});
			}
		if(preCheck(param,obj,list,"")){
			lockSelectedArticle(param,obj,list,"");
		}
	}
		
	};
var onArticleTdSelectInSOHAdjustNew = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
getArticleDetailsForStockAdjust(obj.article_no,fromScreen);
/*	if(obj.msg_type == 'F'){
		$.fn.showCustomMsg([obj.msg],error,'Stock Adjustment');
	}else{
		$('#selectedArticleObj').data('obj',obj);
		var sohArticleNo = obj.article == undefined ? obj.article_no
				: obj.article;
		var param=
			{
				"iv_article" : sohArticleNo,
				"iv_user_id" : userId,
				"iv_session_id" : '00',
				"iv_routine": "STK_ADJ",
				"iv_lock_flag" : 'L'
			};
		var list=[];
		if(obj.pbd_flag == 'Y')
			{
			var confObj = $('#article_search_result_table').data('confObj');
			var response= confObj.content;
			list = response.filter(function(obj)
					{
				return obj.article_no == sohArticleNo;
					});
			}
		if(preCheck(param,obj,list,"")){
			lockSelectedArticle(param,obj,list,"");
		}
	}       */
		
	};


var onTransferArticleTdSelectInSOHAdjust = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	if(obj.msg_type == 'F'){
		$.fn.showCustomMsg([obj.msg],error,'Stock Adjustment');
	}else{
		var sohArticleNo = obj.article == undefined ? obj.article_no
				: obj.article;
		var sohArticleDesc =obj.article_desc == undefined ? obj.article_desc
				: obj.article_desc;
		$("#transToArticle").val(sohArticleNo+'-'+sohArticleDesc);
		var param=
			{
				"iv_article" : sohArticleNo,
				"iv_user_id" : userId,
				"iv_session_id" : '00',
				"iv_routine": "STK_ADJ",
				"iv_lock_flag" : 'L'
			};
		var list=[];
		if(obj.pbd_flag == 'Y')
			{
			var confObj = $('#article_search_result_table').data('confObj');
			var response= confObj.content;
			list = response.filter(function(obj)
					{
				return obj.article_no == sohArticleNo;
					});
			}
		if(preCheck(param,obj,list,"TRANS")){
			lockSelectedArticle(param,obj,list,"TRANS");
			$('#selectedArticleObjTransferTo').data('obj',obj);
			$("#verifyTransToArticleLabel").attr('verified',true);
			$("#transToEndSOHDiv").removeClass("hideBlock");
			calculateEndSOHForTransferQty();
		}
	}
	$('#dialog-mulipleArticles').dialog('close');
		
};
	
var onOrderSearchTdSelectInSOHAdjust = function(event){
	event.stopPropagation();
	var $elem = $(this);
	var $tr =$elem.closest('tr');
	var obj =$tr.data('obj');
	seg_no = (obj.seg_no != null ? obj.seg_no : '');
	$("#orderNoUndrWhse").val(obj.order_no); 
	$('#dialog-mulipleOrders').dialog('close');
	orderDispatchQtyMap = {};
	orderRecvdQtyMap = {};
	orderDispatchQtyMap[obj.order_no]=obj.dispatched_qty;
	orderRecvdQtyMap[obj.order_no]=obj.received_qty;
	orderRxdDate ='';
	orderRxdDate =$tr.find('td:eq(2)').html();	
	orderDispatchQtyUOM = obj.dispatched_qty_uom;
	orderDispatchQtyOM = obj.dispatched_om;
	orderReceivedQtyUOM = obj.received_qty_uom;
	orderReceivedQtyOM = obj.received_om;
	iv_order_supplier = obj.supplier_no;
	if(orderDispatchQtyUOM!=null && (orderDispatchQtyUOM||'') != ''){
		updateInputUOM(orderDispatchQtyUOM,orderDispatchQtyOM);
		calculateEndSOH();
	}else{
		 resetInputUOM($('#reasonsForSOHAdjust').val());
	}
};
function updateInputUOM(uom,om){
	if($('#uomRadioContent input').length >=1){
		$('#uomRadioContent input').val('');
		$('#uomRadioContent input').addClass('hideBlock');
		if($('#uomRadioContent input[id="'+uom+'"]')!=undefined && $('#uomRadioContent input[id="'+uom+'"]').length>0){
			$('#uomRadioContent input[id="'+uom+'"]').removeClass('hideBlock');
			if(uom == 'KG'){
			//	$('#uomRadioContent input[id="'+uom+'"]').isValidWeight(3);
				$('#uomRadioContent input[id="'+uom+'"]').val('0.000')/*.isValidWeightKeyDwn(3)*/;		//Defect_9837 
			//	$('#uomRadioContent input[id="'+uom+'"]').addClass('weight-box');
				}
		}else{
			$('#uomRadioContent input[id="'+selectedArticle.base_uom+'"]').removeClass('hideBlock').attr('pack_size',om);
			$('#uomRadioContent input[id="'+selectedArticle.base_uom+'"]').removeClass('hideBlock').attr('placeholder',uom);
			//$('#uomRadioContent input[id="'+selectedArticle.base_uom+'"]').removeClass('hideBlock').attr('id',uom);
		}
	}
}

function resetInputUOM(reasoncode){
	//if($('#uomRadioContent input').length >=1){
		$('#uomRadioContent input').removeClass('hideBlock');
		if($('#uomRadioContent input[placeholder="'+selectedArticle.base_uom+'"]') ==undefined || $('#uomRadioContent input[placeholder="'+selectedArticle.base_uom+'"]').length ==0){
			$('#uomRadioContent input:first').attr('placeholder',selectedArticle.base_uom);	
		}
		if(reasoncode == 'PI'){
			$('#uomRadioContent input').addClass('hideBlock');$('#uomRadioContent input[id="'+selectedArticle.base_uom+'"]').removeClass('hideBlock');
			$('#uomRadioContent input[base_uom!="'+selectedArticle.base_uom+'"]').val('').focus();
		}
	//}
}

function showSOHLookUp()
{
$('#sohLookupContainer').addClass('hideBlock').removeClass('hideBlock');
$('.sohArticleDetails').removeClass('hideBlock').addClass('hideBlock');
$('#historyDiv').removeClass('hideBlock').addClass('hideBlock');
if(fromScreen == undefined && !$('#sohLookupContainer').hasClass('hideBlock') && $('.sohArticleDetails ').hasClass('hideBlock') )
$('#sohSearchBox').focus();

}

function showSOHArticleDetails()
{
$('#sohLookupContainer').removeClass('hideBlock').addClass('hideBlock');
$('.sohArticleDetails ').addClass('hideBlock').removeClass('hideBlock');
$('#historyDiv').removeClass('hideBlock').addClass('hideBlock');
}
function showSOHHistoryDetails()
{
$('#sohLookupContainer').removeClass('hideBlock').addClass('hideBlock');
$('.sohArticleDetails ').addClass('hideBlock').removeClass('hideBlock');
$('#historyDiv').addClass('hideBlock').removeClass('hideBlock');
}
function getRecentHistory(obj,list)
{
var param ={
		"iv_site": siteVal, 
		"iv_sales_org": salesOrgVal,
		"iv_session_id":'00',
		"iv_article":obj.article_no,
		"iv_history_days" : historyDaysRange
};	

var url = getUnpostedStockAdjustmentHistoryURL;//getUnpostedStockAdjustmentHistoryURL; for defect 2814,3468
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post'
	}).done(function(response) {
		var content='';
		if(response != null && response != undefined && response.length > 0 && response[0].article_no != null && response[0].article_no != undefined){
			var histObj = response[0];
			content+='Recent History: '+histObj.reason_desc+' - Changed from '+Number(histObj.adjusted_from || '')+' to '+Number(histObj.adjusted_to || '')+' by '+(histObj.user_name || '')+' on '+ getAdjDateTime(histObj);
			
		}
		$('#sohRecentHistory').html(content);
		populateSOHArticlesDetailsContent(obj,list);
		if(rangingAndDeranging){
			showSOHAdjPopUp();
		}
		stopLoading();
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});

}
function populateSOHArticlesDetailsContent(obj,list)
{
	$('.sadjDetail').addClass('hideBlock').removeClass('hideBlock');
	$('.sadjMain').removeClass('hideBlock').addClass('hideBlock');
	charityCode='';
	charityDesc='';
	$('#sohArticleTitle').text(obj.article_no+' - '+obj.article_desc);
	$("#adjustSOHWeight").val('');//.within999();
	articleAdjusted = obj.article_no;
	$('#endSOHValue,#endSOHUom').removeClass('hideBlock');
	if(fromScreen == undefined)
		{
	$('.sohByText').addClass('hideBlock').removeClass('hideBlock');
	$('.endSohText').removeClass('hideBlock').addClass('hideBlock');
	if(nonPiItem)
		{
		$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
		$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
		$("#endSOHValue").addClass("hideBlock");
		 $("#endSOHUom").addClass("hideBlock");
		}
	else
		{
	$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
	$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
	//$("#adjustSOHWeight").addClass("hideBlock");//Defect 2830
		}
		}
	else
		{
		$('.sohByText').removeClass('hideBlock').addClass('hideBlock');
		$('.endSohText').addClass('hideBlock').removeClass('hideBlock');
		if(nonPiItem)
		{
		$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
		$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
		$("#endSOHValue").addClass("hideBlock");
		 $("#endSOHUom").addClass("hideBlock");
		}
	else
		{
		$('.sohByTextTotal').addClass('hideBlock').removeClass('hideBlock');
		$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
		}
		$('#reasonsForSOHAdjust option[value="PI"]').remove();
		$('#reasonsForSOHAdjust').append('<option recue_stock="'+'N'+'" display_sequence="" movement_type="" plus_or_minus_ind="1" value="PI">'+'PI Verify'+'</option>');
		if(!nonPiItem)//for defect 5006
	{
		$('#reasonsForSOHAdjust').val('PI');	
	}
		else
			{
			$("#reasonsForSOHAdjust").val($('#reasonsForSOHAdjust option:eq(1)').val());
			$("#reasonsForSOHAdjust").trigger('change');
			}
		//$('#reasonsForSOHAdjust option:contains("Stock Correction")').text('PI Verify');
		/*$('#reasonsForSOHAdjust').prop('disabled',true);
			if(obj.pbd_flag=='Y'){
				
			}*/
		}
	$('#backBtnId').removeClass('hideBlock');
	if(obj.random_weight_flag == 'Y'){
		$('#weightSpan').removeClass('hideBlock');
		$("#adjustSOHWeight").onChangeOfSOHField(obj);
			if(!nonPiItem){
				$('.pisohFix').addClass('hideBlock').removeClass('hideBlock');
			}else{
				$('.pisohFix').removeClass('hideBlock').addClass('hideBlock');
			}
		}else{
			$('#weightSpan').addClass('hideBlock');
			$('.pisohFix').removeClass('hideBlock').addClass('hideBlock');
		}
	if(obj.pbd_flag == 'Y')
		{
			var uomContent = '';
			for(var i=0;i<list.length;i++)
				{
				if($.inArray(list[i].pbd_uom.trim().toUpperCase(),useLessUOM) < 0)
				{
					if($('#reasonsForSOHAdjust').val()=='PI'){
						if(list[i].pack_size==1){
							uomContent += '<input type="#" style="margin-right: 3px;" name="adjustSOH" pack_size="'+list[i].pack_size+'" class="textbox numberBox adjustSOHKeyPress" base_uom="'+obj.base_uom+'" id="'+list[i].pbd_uom+'" placeholder="'+list[i].pbd_uom.trim().toUpperCase()+'">';
						}
						else //added for defect 6327
							{
							uomContent += '<input type="#" style="margin-right: 3px;" name="adjustSOH" pack_size="'+list[i].pack_size+'" class="textbox numberBox hideBlock adjustSOHKeyPress" base_uom="'+obj.base_uom+'" id="'+list[i].pbd_uom+'" placeholder="'+list[i].pbd_uom.trim().toUpperCase()+'">';
							}
					}else{
						uomContent += '<input type="#" style="margin-right: 3px;" name="adjustSOH" pack_size="'+list[i].pack_size+'" class="textbox numberBox adjustSOHKeyPress" base_uom="'+obj.base_uom+'" id="'+list[i].pbd_uom+'" placeholder="'+list[i].pbd_uom.trim().toUpperCase()+'">';
					}
				}
				}
			$('#uomRadioContent').html(uomContent);
		}else if(obj.complex_pbd_flag == 'Y'){
			var vpbdVariable = '';
			if(obj.complex_pbd_flag == 'Y' && obj.display_item_ind == 'Y'){
				vpbdVariable = obj.cpbd_pack_size;
			}
			var uomContent = '';
			if($.inArray(obj.base_uom.trim().toUpperCase(),useLessUOM) < 0)
			uomContent = '<input type="#" name="adjustSOH" pack_size="'+obj.pack_size+'" cpbd_pack_size="'+vpbdVariable+'" class="textbox numberBox adjustSOHKeyPress" base_uom="'+obj.base_uom+'" id="'+obj.base_uom+'" placeholder="'+obj.base_uom.trim().toUpperCase()+'">';
			
			if(((obj.order_uom||'') !=''  && obj.order_uom != obj.base_uom) && $.inArray(obj.order_uom.trim().toUpperCase(),useLessUOM) < 0)
			uomContent+= '  <input type="#" name="adjustSOH" pack_size="'+obj.om+'" class="textbox numberBox adjustSOHKeyPress" base_uom="'+obj.order_uom+'" id="'+obj.order_uom+'" placeholder="'+obj.order_uom.trim().toUpperCase()+'">';
			
				$('#uomRadioContent').html(uomContent);
		}
	else
		{
		
		var uomContent = '';
		if($.inArray(obj.base_uom.trim().toUpperCase(),useLessUOM) < 0)
		uomContent = '<input type="#" name="adjustSOH" pack_size="'+obj.pack_size+'" class="textbox numberBox adjustSOHKeyPress" base_uom="'+obj.base_uom+'" id="'+obj.base_uom+'" placeholder="'+obj.base_uom.trim().toUpperCase()+'">';
		
		if(((obj.order_uom||'') !=''  && obj.order_uom != obj.base_uom) && $.inArray(obj.order_uom.trim().toUpperCase(),useLessUOM) < 0)
		uomContent+= '  <input type="#" name="adjustSOH" pack_size="'+obj.om+'" class="textbox numberBox adjustSOHKeyPress" base_uom="'+obj.order_uom+'" id="'+obj.order_uom+'" placeholder="'+obj.order_uom.trim().toUpperCase()+'">';
		
			$('#uomRadioContent').html(uomContent);
		}
	
	
	$('.adjustSOHKeyPress').onChangeOfSOHField(obj);
	if(obj.allow_decimal_adj == 'Y')// defect 5006
		{
		if(/*obj.zea_zkg_flag == 'Y' &&*/   obj.order_uom != null && obj.order_uom != undefined && obj.order_uom.trim() != '' 
			&&	obj.base_uom != obj.order_uom && $('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]') != '' 
			&& !$('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').hasClass('hideBlock')
			){
			$('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').unbind('keypress').onBlurOfSOHField();
			$('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').unbind('keypress').isWith2Decimal();			
		}else{
			$('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').onlyNumbers();
		}
		$('.adjustSOHKeyPress[base_uom="'+obj.base_uom+'"]').onlyNumbers();
		$('.adjustSOHKeyPress[base_uom="'+obj.base_uom+'"]').unbind('keypress').onBlurOfSOHField();
		}
	else
	{
	if(((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N') == 'Y' || obj.random_weight_flag == 'Y'){
		   $('.adjustSOHKeyPress[base_uom="'+obj.base_uom+'"]').onBlurOfSOHField();
		}else{
		   $('.adjustSOHKeyPress').onBlurOfSOHField();
		}
	}
	if(obj.random_weight_flag == 'Y')
		{
		$('input[name="adjustSOH"][id="'+obj.base_uom+'"]').attr('placeholder',obj.base_uom);
		$('#endSOHUom').text(obj.base_uom);
		}else{
			$('#endSOHUom').text(obj.base_uom);
		}
	$('#adjustSOHWeight').onlyNumbers();
	var content = '';
	//if(obj.soh != undefined){
		if(obj.allow_only_initial_count == 'Y' || obj.allow_only_initial_count == 'y'){
			content += '<label class="articlePriceLabel">Stock on Hand: <strong></strong> </label>';
			currentSOH = 0;
		}else{
			content += '<label class="articlePriceLabel">Stock on Hand: ';
			if(!nonPiItem)
				{
			content+='<strong>'+deciValues(obj.random_weight_flag,((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.linked_article_flag,obj.pbd_flag,obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,true)
			+' '
			+((obj.random_weight_flag != null && obj.random_weight_flag != "" && obj.random_weight_flag != 'Y')? obj.base_uom : '') +'</strong>';
				}
			content +='</label>';
			currentSOH = Number(obj.soh || '');
			if(obj.random_weight_flag == 'Y'){
			currentSOHQty = Number(obj.pi_soh || '');
			}
			
		}		
	//}
	
	//Defualt values for PI verify reason code -Defect_3491
	if(fromScreen != undefined && Number(currentSOH) <= 0){
		$('#uomRadioContent input[placeholder="EA"]').val("0");
	}else{
		$('#uomRadioContent input[placeholder="EA"]').val("");
	}
	//17.06 ZEA/ZKG OM Value changes
	var omValue = (obj.om == null || obj.om == undefined ? '' : (((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0))+' '+obj.base_uom));
	content += '<label class="articlePriceLabel"> | </label>'							
		+'<label class="articlePriceLabel">OM: <strong>'+omValue+'</strong></label>';
	//calculateEndSOH();
	/*if(obj.delivery_date != null && obj.delivery_date != undefined)
		{*/ //Defect no 2816
		var delivery_date = (obj.delivery_date || '');
		//if(delivery_date != '')
	content += '<label class="articlePriceLabel"> | </label>'							
			+'<label class="articlePriceLabel">Last Delivery: <strong>'+$.tablebuild.dataparse.mobi_date(delivery_date)+'</strong></label>';
		//} Defect no 2816
	
	/*if(obj.qty != null && obj.qty != undefined)//Defect no 2816
		{*/
	content += '<label class="articlePriceLabel"> | </label>'
			+'<label class="articlePriceLabel">Received Qty.: <strong>'+(obj.qty || '')+' '+(obj.received_uom || '')+'</strong></label>';
		//}Defect no 2816
							
		$('#secondaryDetails').html(content);
		
		showSOHArticleDetails();
		bindSOHDetailsEvents(obj.random_weight_flag,((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.allow_decimal_adj);//Defect 2830-add paramto this method // added allow decimal flag for defect 5006
		$('#reasonsForSOHAdjust option[value="'+initCount+'"]').remove();
		if(obj.allow_only_initial_count == 'Y' || obj.allow_only_initial_count == 'y'){
			$('#reasonsForSOHAdjust').append('<option recue_stock="'+'N'+'" display_sequence="" movement_type="" plus_or_minus_ind="1" value="'+initCount+'">'+'Initial Count'+'</option>');
			$('#reasonsForSOHAdjust').val(initCount);
			$('#reasonsForSOHAdjust').prop('disabled',true);
		}else{
			$('#reasonsForSOHAdjust').prop('disabled',false);
		}
		$('#reasonsForSOHAdjust').trigger('change');
		if(obj.linkage_factor < 1){
			$('#linkFactor .likageFactor').removeClass('hideBlock');
			$('#linkageFactorVal').text(obj.linkage_factor);
		}else{
			$('#linkFactor .likageFactor').addClass('hideBlock');
		}
		
}

var getAdjDateTime = function(obj){
	var cutOffDate = (obj.adj_date || '');
	var cutOffTime = formatTime(padzero((obj.adj_time || ''),6));
	var cutOff ='';
	if(cutOffDate!= '' && cutOffTime!=''){
		 cutOff = $.tablebuild.dataparse.mobi_date(cutOffDate)+' '+cutOffTime;
	}
	return cutOff;
};

function populateStockAdjustmentReason(reason)
{
if(!$('#reasonsForSOHAdjust').hasClass('loaded'))
{
var param ={
		"iv_reason_code": ((reason == undefined || reason == '') ? "ALL" : reason),
		"iv_site": siteVal, 
		"iv_sales_org": salesOrgVal
};	

var url = getReasonCodeForStockAdjustmentURL;
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post'
	}).done(function(response) {
		$('#reasonsForSOHAdjust').addClass('loaded');
		var options='<option value="Select" plus_or_minus_ind="1">Select Reason</option>';
		if(checkResult(response,'reason_code','Stock Adjustment')){
			adjustReasonMap = formMapFromAdjustReasonList(response) ;
			for(var i=0;i<response.length;i++)
				{
				if(response[i].reason_code == "1" && response[i].long_desc == "PI Verify"){
					response[i].reason_code = "PI";
				}
				options +='<option recue_stock="'+response[i].rescue_stk_ind+'" display_sequence="'+response[i].display_sequence+'" movement_type="'+response[i].movement_type+'" plus_or_minus_ind="'+response[i].plus_or_minus_ind+'" value="'+response[i].reason_code+'">'+response[i].long_desc+'</option>';
				}
		}
		$('#reasonsForSOHAdjust').html(options);
		getStockAdjustmentConfiguration();
	}).fail(function() {
		
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}
}

function getStockAdjustmentConfiguration()
{
	
var param ={
		"iv_session_id": "100",
		"iv_site": siteVal, 
		"iv_sales_org": salesOrgVal
};	
var url = getStockAdjustmentConfigurationURL;
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post'
	}).done(function(response) {
		if(checkResult(response,'stk_adj_warning_qty','Stock Adjustment')){
			var obj = response[0];
			warningQty=obj.stk_adj_warning_qty ; 
			maxLimitQty=obj.stk_adj_blocking_qty ;
			idtPurchaseLimitQty=obj.idt_purchase_limit ;
			historyDaysRange=obj.adjustment_history_days ;
			wareHouseStockAdjDayLimit=obj.wh_over_delv_days_limit;
		}
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});

}
//@@@placed new method for confirmation
//var preCkeckFlag=false;

function lockSelectedArticle(param,obj,list,forArticle)
{
	selectedArticle = obj;
		var url = lockArticleForStockAdjustmentURL;
		console.log(url+'  '+JSON.stringify(param));
		$.ajax({
	      data: JSON.stringify(param),
	      url: url,
	      type: 'post',
	      beforeSend: function() {
	    	  startLoading();
	      }
		}).done(function(response) {
			
			console.log(response);
			if(checkResult(response,'msg_type','Stock Adjustment')){
				if(response[0].msg_type == 'S')
					{
						if(param.iv_lock_flag != 'U' && forArticle !="TRANS"){//No need to update history is second article selected
							getRecentHistory(obj,list);
							$('#dialog-mulipleArticles').dialog('close');
						}
					}
				else
					{
					$.fn.showCustomMsg([response[0].msg],error,'Stock Adjustment');
					}
				stopLoading();	
			}
			else
			stopLoading();	
		}).fail(function() {
			$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
			stopLoading();
		});
}

function preCheck(param,obj,list,forArticle){
	var preCkeckFlag = false;
	var firstArticle= $('#selectedArticleObj').data('obj');
	if(forArticle == "TRANS" && param.iv_article == firstArticle.article_no){//If transfer from and transfer to article same erro message
		$.fn.showCustomMsg(["Transfer From and Transfer To Article cannot be the same."],error,'Stock Adjustment');
		preCkeckFlag = false;
		return preCkeckFlag;
	}
	if(obj.perpetual_flag=='N'){
		//stopLoading();
		nonPiItem = true;
		//defaulting true for non-pi article ..
		//preCkeckFlag=true;
		lockSelectedArticle(param,obj,list,forArticle);
		if(forArticle == "TRANS"){
			$("#verifyTransToArticleLabel").attr('verified',true);
			calculateEndSOHForTransferQty();
		}
		/*$.fn.warnPopup('warn',
				'Non-PI item. Stock on Hand is not maintained on this article, do you want to adjust it?','Stock Adjustment',
				function(){
					preCkeckFlag=true;
					lockSelectedArticle(param,obj,list,forArticle);
					if(forArticle == "TRANS"){
						$("#verifyTransToArticleLabel").attr('verified',true);
						calculateEndSOHForTransferQty();
					}
					$('#dialog-alert-conf').dialog('close');
					},
				function(){
						if(forArticle == "TRANS"){
							$('#transToArticle').val('').trigger('change').focus();
						}else{
							handleLeaveStkAdjScreenYes();
						}
						$('#dialog-alert-conf').dialog('close');
				},'');*/
	}
	else
		{
		nonPiItem = false;
		}
	if(obj.source_of_supply=='A'){//Defect 3871 
		//stopLoading();
		$.fn.warnPopup('warn',
				'Pay on Scan item. Return to vendor for credit. Do you want to raise a claim?','Stock Adjustment',
				function(){//Yes
					$('#dialog-alert-conf').dialog('close');
					window.location.replace(claimLink+articleAdjusted);
					},
				function(){//No
					//preCkeckFlag=true;
					lockSelectedArticle(param,obj,list,forArticle);
					if(forArticle == "TRANS"){
						$("#verifyTransToArticleLabel").attr('verified',true);
						calculateEndSOHForTransferQty();
					}
					$('#dialog-alert-conf').dialog('close');
				},'');
	}
	if(obj.perpetual_flag!='N' && obj.source_of_supply!='A'){
		preCkeckFlag=true;
	}
	return preCkeckFlag;
}

function getAdjustPostedHistory(sohArticleNo)
{
	var param ={
			"iv_site" : siteVal,
			"iv_sales_org" : salesOrgVal,
			"iv_session_id" : "100",
			"iv_article" : sohArticleNo,
			"iv_history_days" : historyDaysRange
	};
	
	var url = getPostedStockAdjustmentHistoryURL;
	console.log(url+'  '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'article_no','Stock Adjustment')){
			if(response.length>0){
				formPostedHistoryContent(response);
				showSOHHistoryDetails();
			}/*else{
				showFullAdjLog(articleNo);
			}*/
		}/*else{
			showFullAdjLog(articleNo);
		}*/
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
	
}

function formPostedHistoryContent(list)
{
	var content = '';
	for(var i=0;i<list.length;i++)
		{
		content+='<tr class=""><td>'
			+ list[i].reason_desc
			+'</td><td>'
			+getAdjDateTime(list[i])
			+'</td><td>'
			+list[i].user_name
			+'</td><td class="centerValue">'
			+(Number(list[i].adjusted_to-list[i].adjusted_from)).toFixed(3)
			+'</td><td class="centerValue">'
			+list[i].adjusted_from
			+'</td><td class="centerValue lastColumn">'
			+list[i].adjusted_to
			+'</td></tr>';
		}
	$('#historyTable').html(content);
}

function validateAdjustSOHForm()
{
	var $focusElem = '';
	var selectVal = $('#reasonsForSOHAdjust').val();
	var AdjustSOHVal= 0;
	var selectedArt = $('#selectedArticleObj').data('obj');
	var zeroAdjust = false;
	$('#uomRadioContent input[name="adjustSOH"]').each(function()
			{
		var packSize = $(this).attr('pack_size');
		AdjustSOHVal += Number($(this).val() || '') * Number(packSize || '');
			});
	var errorsArray=[];
	/*if(selectVal == 'PI' && selectedArt.random_weight_flag == 'Y'){// Defect_5046
		var qtyNonZeroFlag = false;
		var kgNonZeroFlag = false;
		$('#uomRadioContent input[name="adjustSOH"]').each(function()
		{		
			if($(this).attr('base_uom') != undefined && $(this).attr('base_uom') == 'KG'){//means KG field
				if($(this).val() != undefined && $(this).val() != '' && $(this).val() != 0){
					kgNonZeroFlag = true;
				}
			}
			
		});
		if($("#adjustSOHWeight").is(':visible')){//means Qty field
			if($("#adjustSOHWeight").val() != undefined && $("#adjustSOHWeight").val() != '' && $("#adjustSOHWeight").val() != 0){
				qtyNonZeroFlag = true;
			}
		}
		if((qtyNonZeroFlag && !kgNonZeroFlag) || (!qtyNonZeroFlag && kgNonZeroFlag)){//If one is non zero and other is zero
			if(qtyNonZeroFlag){
				errorsArray.push('Units cannot be zero when weight is present.');
			}else if(kgNonZeroFlag){
				errorsArray.push('Weight cannot be zero when units is present.');
			}
			
		}
	}*/
	/*if(selectedArt.random_weight_flag == 'Y' && selectVal == 'PI'){
		var isQtyGrtr = false;
		//var isWgtGrtr = false;
		var wghtVal = $('#uomRadioContent').find('#KG').val();
		var packSize = $(this).attr('pack_size');
		if(packSize == undefined){
			packSize = selectedArt.pack_size;
		}
		var updatedVal = $('#adjustSOHWeight').val();
		console.log(updatedVal);
		var calValue = Number(wghtVal || '') * Number(packSize || '') * Number(plusMinusInd) * Number(updatedVal);
		console.log(calValue);
		if(updatedVal >= currentSOHQty && calValue >= currentSOH){ isQtyGrtr = true; }
		if(updatedVal <= currentSOHQty && calValue <= currentSOH){ isQtyGrtr = true; }
		if(!isQtyGrtr){
			errorsArray.push('Stock adjustment both values should be either positive or negative');
			$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first') : $focusElem;
		}
		
		
	}*/
	if(selectVal == 'Select')
		{
		errorsArray.push('Please Select a Reason to Adjust Stock.');
		$focusElem = $focusElem == '' ? $('#reasonsForSOHAdjust') : $focusElem;
		}
	if($('#uomRadioContent input[name="adjustSOH"]').is(':visible') && ((selectedArt.random_weight_flag != 'Y' && (AdjustSOHVal == '' || AdjustSOHVal == 0))
			|| (selectedArt.random_weight_flag == 'Y' && (AdjustSOHVal == '' || AdjustSOHVal == 0) && ($('#endPiSOHValue').is(':visible') && Number($('#endPiSOHValue').text()) == 0))))
		{
		if($("#endSOHValue").is(':visible')){ //Defect_5100
			if(Number($("#endSOHValue").text()) == 0){
				errorsArray.push('Please Enter a Valid Quantity to Adjust Stock.');
			}
		}else{
			zeroAdjust = true;
			errorsArray.push('Please Enter a Valid Quantity to Adjust Stock.');
		}
		$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first') : $focusElem;
		}
	if(selectVal == 'PI' && ((selectedArt.random_weight_flag != 'Y' && Number($('#endSOHValue').text()) == 0) 
			|| (selectedArt.random_weight_flag == 'Y' && Number($('#endPiSOHValue').text()) == 0 && Number($('#endSOHValue').text()) == 0))){
		errorsArray.push('Stock adjustment quantity cannot be zero or empty.');
		$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first') : $focusElem;
		}
	/*if(selectVal == '76' && AdjustSOHVal > idtPurchaseLimitQty)
		{
		errorsArray.push('IDT Purchase Maximum Limit is '+idtPurchaseLimitQty+'.');
		}*/
	if(selectVal == '76' && $("#subCatToList").val()== "Select")//IDT purchase
		{
		errorsArray.push('Please select a Sub-Cateogry.');
		$focusElem = $focusElem == '' ? $('#subCatToList') : $focusElem;
		}
	if(selectVal == '26' && ($("#idtToQtyList").val()== "Select" ||  $("#idtToQtyList").val()== ""))//IDT Reverse
	{
	errorsArray.push('Please select a IDT Purchase Quantity.');
	$focusElem = $focusElem == '' ? $('#idtToQtyList') : $focusElem;
	}
	if(selectVal == '26' && ($("#idtToSubCatList").val()== "Select" || $("#idtToSubCatList").val() == ""))//IDT Reverse
	{
	errorsArray.push('Please select a IDT Purchase Subcategory.');
	$focusElem = $focusElem == '' ? $('#idtToSubCatList') : $focusElem;
	}
	
	if((selectVal != 'PI' && selectVal != '75' && AdjustSOHVal > maxLimitQty) || (selectVal == 'PI' && (Math.abs(($('#endSOHValue').text())) > maxLimitQty || Math.abs(($('#endPiSOHValue').text())) > maxLimitQty))){
		errorsArray.push('Stock Adjust Maximum Limit is '+maxLimitQty+'.');
		$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first') : $focusElem;
		}
	if((selectVal == '75' || selectVal == '10')&& $('#authCodeUndrWhse').is(':visible') && $('#authCodeUndrWhse').val() == '' )
		{
		errorsArray.push('Please Enter Authorization Code.');
		$focusElem = $focusElem == '' ? $('#authCodeUndrWhse') : $focusElem;
		}
	if((selectVal == '75' || selectVal == '10') && $('#orderNoUndrWhse').is(':visible') && $('#orderNoUndrWhse').val() == '' )
		{
		errorsArray.push('Please Enter Order No.');
		$focusElem = $focusElem == '' ? $('#orderNoUndrWhse') : $focusElem;
		}
	if((selectVal == '75' || selectVal == '10') && $('#orderNoUndrWhse').is(':visible') && $('#orderNoUndrWhse').val() != ''  && $.inArray($('#orderNoUndrWhse').val(), orderSearchDetailsArray) <= -1){
			errorsArray.push('Please choose a valid Order No.');
			$focusElem = $focusElem == '' ? $('#orderNoUndrWhse') : $focusElem;
		}
	/*if($('#adjustSOHWeight').val() > 999 && selectVal == 'PI'){
		errorsArray.push('Total Qty. cannot be greater than 999.');
		$focusElem = $focusElem == '' ? $('#adjustSOHWeight') : $focusElem;
	}*/
	var totalQty = 0;
	var totRecvdQty = 0;
	if((selectVal == '75' || selectVal == '10') && $('#orderNoUndrWhse').is(':visible')
			&& $('#orderNoUndrWhse').val() != ''  && $.inArray($('#orderNoUndrWhse').val(), orderSearchDetailsArray) >= 0){
		//validtae for rxd date of order within config date limit
		if(orderRxdDate != ''){
			var dateArray = orderRxdDate.split("/");//mm/dd/yyyy
			var formattedDate = dateArray[1]+"/"+dateArray[0]+"/"+dateArray[2];//dd/mm/yyyy
			if(!iswithinDays(orderRxdDate,wareHouseStockAdjDayLimit)){
				errorsArray.push('Order Received date should be within '+wareHouseStockAdjDayLimit+" days for Stock Adjustment.");
				$focusElem = $focusElem == '' ? $('#orderNoUndrWhse') : $focusElem;
			}
		}		
		//Check With Dispatched Qty for warehouse under delivery
		
		/*if(orderDispatchQtyMap != undefined && orderDispatchQtyMap[$('#orderNoUndrWhse').val()] != undefined && selectVal != '10'){
			$('#uomRadioContent input[name="adjustSOH"]').each(function(){
				totalQty = Number(totalQty) + Number(((orderDispatchQtyOM||'') != '' ? orderDispatchQtyOM : $(this).attr('pack_size'))*$(this).val());		
			});
			var orderDispatchQtyInBaseUOM = Number(orderDispatchQtyMap[$('#orderNoUndrWhse').val()]) * Number(orderDispatchQtyOM);
			if(totalQty == 0 && !zeroAdjust){
				errorsArray.push('Please Enter a Valid Quantity to Adjust Stock.');
				$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first')  : $focusElem;
			}
			else if(orderDispatchQtyInBaseUOM == 0 || orderDispatchQtyMap[$('#orderNoUndrWhse').val()] == 0){
				errorsArray.push('Stock Adjustment cannot be performed for this order '+$('#orderNoUndrWhse').val());
			}
			else if(totalQty > orderDispatchQtyInBaseUOM){
				errorsArray.push('Entered Adjustment Qty. cannot be greater than Order dispatch Qty. '+orderDispatchQtyMap[$('#orderNoUndrWhse').val()]+" "+orderDispatchQtyUOM);
				$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first')  : $focusElem;
			}			
		} */
		//Check With Received Qty for warehouse under delivery
		if(orderRecvdQtyMap != undefined && orderRecvdQtyMap[$('#orderNoUndrWhse').val()] != undefined && selectVal != '10'){
			$('#uomRadioContent input[name="adjustSOH"]').each(function(){
				totRecvdQty = Number(totRecvdQty) + Number(((orderReceivedQtyOM||'') != '' ? orderReceivedQtyOM : $(this).attr('pack_size'))*$(this).val());		
			});
			var orderReceivedQtyInBaseUOM = Number(orderRecvdQtyMap[$('#orderNoUndrWhse').val()]) * Number(orderReceivedQtyOM);
			if(totRecvdQty == 0 && !zeroAdjust){
				errorsArray.push('Please Enter a Valid Quantity to Adjust Stock.');
				$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first')  : $focusElem;
			}
			else if(orderReceivedQtyInBaseUOM == 0 || orderRecvdQtyMap[$('#orderNoUndrWhse').val()] == 0){
				errorsArray.push('Stock Adjustment cannot be performed for this order '+$('#orderNoUndrWhse').val());
			}
			//Defect_12343
			else if(totRecvdQty > orderReceivedQtyInBaseUOM && errorsArray.length == 0){
				$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first')  : $focusElem;
				$.fn.warnPopup('warn','Under received quantity is greater than the received quantity. Continue?','Stock Adjustment',triggerYesTransferTo,triggerNo,'',$focusElem);
				return false;
			}			
		} 
	}
	/*if((selectVal == '75' || selectVal == '10') && $('#orderNoUndrWhse').is(':visible') && $('#orderNoUndrWhse').val() != '' && $('#orderVerify').val() == "false" )
		{
		errorsArray.push('Please Verify Entered Order No.');
		}*/
	else if(selectVal == '91' && $('#prodDate').is(':visible'))//visible only for bakery articles
	{
		if($('#prodDate').val() == ''){
			errorsArray.push('Production Date is mandatory for Bakery Articles.');
			$focusElem = $focusElem == '' ? $('#prodDate')  : $focusElem;
		}else{
			var prodDate = $('#prodDate').val();
			if(!isValidDate(prodDate))
				{
				errorsArray.push('Please Enter a Valid Production Date.');
				$focusElem = $focusElem == '' ? $('#prodDate')  : $focusElem;
				}
			if(isValidDate(prodDate) && isFutureDate(prodDate))
				{
				errorsArray.push('Production Date should not be Future.');
				$focusElem = $focusElem == '' ? $('#prodDate')  : $focusElem;
				}
			var oneWeekBeforeDate = getDesiredPastDate(7);
			if(isValidDate(prodDate) && !isFutureDate(prodDate) )
			{
			if(Number(diff(oneWeekBeforeDate, prodDate)) < 0 || Number(diff(oneWeekBeforeDate, prodDate)) == 8 )
				{
				/*if($('#prodDate').isToday())
					{
					errorsArray.push('Production Date should not be current Date');
					$focusElem = $focusElem == '' ? $('#uomRadioContent input[name="adjustSOH"]:visible:first')  : $focusElem;
					}
				else*/
				errorsArray.push('Production Date should be within past 7 days.');
				$focusElem = $focusElem == '' ? $('#prodDate')  : $focusElem;
				}
			}
		}
		
	}
	//commenting because waiting for confirmation from tracy. defect is still pending with tracy
	/*if(selectedArt.display_item_ind == 'Y'){  //Defect_8757
		errorsArray.push('Display Article cannot be adjusted');		
	 }
	if(selectedArt.prepack_item_ind == 'Y'){  //Defect_8757
		errorsArray.push('Prepack Article cannot be adjusted');		
	 }*/
	if(errorsArray.length > 0)
		{
		showErrors(errorsArray,$focusElem);
		return false;
		}
	return true;
}
function iswithinDays(enteredDateString,noOfdays){
	var rtnFlag = true;	
	var todayDate = new Date();
	var datebeforeDays = new Date();
	datebeforeDays.setDate(todayDate.getDate() - noOfdays+1);
	var enteredDateArray = enteredDateString.split("/");//dd/mm/yyyy
	var enteredDate = new Date(enteredDateArray[2]+"-"+enteredDateArray[1]+"-"+enteredDateArray[0]);//YYYY-MM-DD
	if(!(datebeforeDays <= enteredDate && enteredDate <= todayDate)){
		rtnFlag = false;
	}
	
	return rtnFlag;
}

function calculateSOHAdjustment(overrideFlag)
{
	var flag = true;
	var idtDept = '';
	var idtFromSubCat ='';
	var idtToSubCat = '';
	overrideFlag = (overrideFlag||'N');
	var obj = $('#selectedArticleObj').data('obj');
	var idtComments = '';
	var adjustedSoh =0;
	var subCatetransCde = '';
	if(transQtyReasonStockAdjItem == 2){
		obj = $('#selectedArticleObjTransferTo').data('obj');
		if(transfQtyCpbd != undefined && obj.complex_pbd_flag == 'Y' /*&& obj.display_item_ind == 'Y'*/){
		adjustedSoh = transfQtyCpbd;
		}
	}
	
	if(obj.random_weight_flag == 'Y')
		{		
		randomWgtUom = obj.base_uom;
		randomWgt =  adjustedSoh;
		randomWgtQty = 0;
		$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){
			if($(this).attr('base_uom') == obj.base_uom  && Number($(this).val())>0){
				randomWgtQty += 1;	
			}else{
				randomWgtQty += Number($(this).val() || '') * Number(obj.pi_om || '');
			}
		});
		/*if(randomWgtQty == 0 && randomWgt !=0){//Defect 5046
			flag = false;
			$.fn.showCustomMsg(['Units cannot be zero when weight is present.'],error,'Stock Adjustment Failed');
		}
		if(randomWgtQty != 0 && randomWgt ==0){
			flag = false;
			$.fn.showCustomMsg(['Weight cannot be zero when units is present.'],error,'Stock Adjustment Failed');
			
		}*/
		}
	else
		{
		randomWgtQty = '';
		randomWgtUom = '';
		randomWgt = '';
		}
	
	var tempPack ='';
	var orderMultiple = obj.om;
	if((($('#reasonsForSOHAdjust').val() == '75' || $('#reasonsForSOHAdjust').val() == '10') && (orderDispatchQtyOM||'')!='')){
		tempPack = orderDispatchQtyOM;
		orderMultiple = orderDispatchQtyOM;
	}
	$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){
				var packSize = (tempPack||$(this).attr('pack_size'));
				if(packSize < 1)
					packSize = 1;
				adjustedSoh += Number($(this).val() || '') * Number(packSize || '');
	});
	
	if($('#reasonsForSOHAdjust').val() == 'PI'){
		endSOH = '';
		$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){
			var packSize = $(this).attr('pack_size');
			endSOH = Number($(this).val() || '') * Number(packSize || '');
		});
		var qty = 1;
		var newobj =$('#selectedArticleObj').data('obj');
		if((newobj.random_weight_flag||'') == 'Y'){
			 qty = Number($("#adjustSOHWeight").val());
			 endSOH = qty * endSOH;
		}
		//randomWgtQty = Math.abs(Number(selectedArticle.pi_soh) - Number($('#adjustSOHWeight').val()));
		randomWgtQty = Math.abs(Number(selectedArticle.pi_soh) - Number($('#adjustSOHWeight').val()));
		if(endSOH > currentSOH)
			{
			reasonCode = '30';
			reasonDesc = adjustReasonMap['30'][0].long_desc;
			plusMinusInd=adjustReasonMap['30'][0].plus_or_minus_ind;
			movementType=adjustReasonMap['30'][0].movement_type;
			adjustedSoh = endSOH - currentSOH;
			}
		else
			{
			reasonCode = '70';
			reasonDesc = adjustReasonMap['70'][0].long_desc;
			plusMinusInd=adjustReasonMap['70'][0].plus_or_minus_ind;
			movementType=adjustReasonMap['70'][0].movement_type;
			adjustedSoh = endSOH - currentSOH;
			}
	}
	
	var articleNo = obj.article_no;
	if($('#reasonsForSOHAdjust').val() == '83'){//Trans qty reason code
		endSOH = '';
		charityCode = '';
		charityDesc = '';
		subCatetransCde = '';
		if(transQtyReasonStockAdjItem == 1){
			
			transfQtyCpbd = $("#transQty").val();

			reasonCode = '30';
			reasonDesc = adjustReasonMap['30'][0].long_desc;
			var newobj = $('#selectedArticleObjTransferTo').data('obj');
			if(newobj != undefined && newobj != null && newobj != ''){
				var tmpsohArticleNo = newobj.article == undefined ? newobj.article_no
						: newobj.article;
			articleNo = tmpsohArticleNo;
			var subCateService = $('#selectedArticleObj').data('obj');
			if (subCateService != undefined && subCateService != null && subCateService != ''){
				subCatetransCde = newobj.sub_category+","+subCateService.sub_category;
				}
			}
			endSOH = transToEndSOH;
			if(newobj.complex_pbd_flag == 'Y' && newobj.display_item_ind == 'Y'){
				adjustedSoh= Number(transfQtyCpbd);
			}else {
				adjustedSoh = Number(endSOH) - Number(newobj.soh);
			}
			//adjustedSoh = Number(endSOH) - Number(newobj.soh);
			plusMinusInd=adjustReasonMap['30'][0].plus_or_minus_ind;; // 1 +ve correction
			movementType=adjustReasonMap['30'][0].movement_type;
		
		}else if(transQtyReasonStockAdjItem == 2){	
			overrideFlag = 'Y';
			var newobj = $('#selectedArticleObj').data('obj');
			if(newobj != undefined && newobj != null && newobj != ''){
				var tmpsohArticleNo = newobj.article == undefined ? newobj.article_no
						: newobj.article;
				articleNo = tmpsohArticleNo;
				var subCateService = $('#selectedArticleObjTransferTo').data('obj');
				if (subCateService != undefined && subCateService != null && subCateService != ''){
					subCatetransCde = newobj.sub_category+","+subCateService.sub_category;		
					}
			}
			reasonCode = '70';
			reasonDesc = adjustReasonMap['70'][0].long_desc;
			endSOH = transFromEndSOH;

			if(newobj.complex_pbd_flag == 'Y' && newobj.display_item_ind == 'Y'){
				adjustedSoh= Number(transfQtyCpbd);
			}else {
				adjustedSoh = Number(endSOH) - Number(currentSOH);
			}
			console.log("transfQtyCpbd -->"+transfQtyCpbd);
			
			//adjustedSoh = Number(endSOH) - Number(currentSOH);
			plusMinusInd=adjustReasonMap['70'][0].plus_or_minus_ind;; // -1 -ve correction
			//movementType=adjustReasonMap['70'][0].movement_type;
			movementType= 'Z51'; 
			reasonCode = '83';
			}		
	}
	if($('#reasonsForSOHAdjust').val() == '76'){//IDT purchase
		idtDept = obj.department;
		idtFromSubCat = obj.sub_category;
		idtToSubCat = $("#subCatToList").val();
		idtComments = $('#idt_comments').val();
	}
	if($('#reasonsForSOHAdjust').val() == '26'){//IDT Reverse
		var transId = $("#idtToQtyList").val(); //Value selected in quantity drop down.
		idtToSubCat = obj.sub_category;
		adjustedSoh = $("#idtToQtyList").find('option[value="'+transId+'"]').attr('idt_quantity');
		if(obj.random_weight_flag == 'Y'){
			randomWgtQty = $("#idtToQtyList").find('option[value="'+transId+'"]').attr('idt_quantity_pi');
		}
		idtComments = $('#idt_comments').val();
	}
	
	if(reasonCode == 'Z41'){
		movementType = 'Z41';
		reasonCode = '92';
	}
	// below condtion is based on assumption that bws store will not have random weight articles
	var endSOH = '';
	var pisoh = selectedArticle.pi_soh;
	if($('#reasonsForSOHAdjust').val() != 'PI'){
	   endSOH = Number($('#endSOHValue').text());
	   pisoh = pisoh  + (Number($('#reasonsForSOHAdjust [value="'+$('#reasonsForSOHAdjust').val()+'"]').attr('plus_or_minus_ind')) * Number($('#adjustSOHWeight').val()));
	}else{
	   endSOH = Number($('#uomRadioContent [name="adjustSOH"]').val());
	   pisoh =  Number($('#adjustSOHWeight').val());
	}
	console.log('endSOH ='+endSOH+ '   pisoh =' + pisoh );
	
	if(obj.random_weight_flag == 'Y'){
		if(endSOH == 0 && (pisoh !=0 && pisoh >0)){//Defect 5046
			flag = false;
			$.fn.showCustomMsg(['Weight cannot be zero when units is present.'],error,'Stock Adjustment Failed');
		}
		if((endSOH != 0 && endSOH >0) && pisoh ==0){
			flag = false;
			$.fn.showCustomMsg(['Units cannot be zero when weight is present.'],error,'Stock Adjustment Failed');
			
		}
	}
	var pi_verify_flag = 'N';
	var transferQtyFlag = false;
	if(obj.random_weight_flag == 'Y' && $('#reasonsForSOHAdjust').val() == 'PI'){
		var tmpwgt = Number($('#adjustSOHWeight').val()) - Number(selectedArticle.pi_soh);
		if((tmpwgt> 0 && adjustedSoh<0) || (tmpwgt< 0 && adjustedSoh>0) || (tmpwgt != 0 && adjustedSoh==0)){
			pi_verify_flag = 'Y';
			randomWgtQty = tmpwgt;
		}else{
			randomWgtQty = Math.abs(randomWgtQty);
			adjustedSoh = Math.abs(adjustedSoh);
		}
	}else{
		randomWgtQty = Math.abs(randomWgtQty);
		adjustedSoh = Math.abs(adjustedSoh);
	}
	if($('#reasonsForSOHAdjust').val() == '83'){
		transferQtyFlag = true;
	}else {
		transferQtyFlag = false;
	}
	var param={
    "iv_site": siteVal,
    "iv_session_id": "12345",
    "iv_article": articleNo,
    "iv_base_uom": obj.base_uom,
    "iv_soh": obj.soh,
    "iv_soh_adj": (adjustedSoh),
    "iv_reason_code": reasonCode,
    "iv_reason_desc": reasonDesc,
    "iv_movement_type":movementType,
    "iv_charity_code": charityCode,
    "iv_charity_desc": charityDesc,
    "iv_user": userId,
    "iv_supplier": obj.supplier_no,
    "iv_resk_stk_ind": '',
    "iv_art_dump_date": '',
    "iv_om": orderMultiple,
    "iv_rnd_wgt": ((obj.random_weight_flag == 'Y') ? (adjustedSoh) : ''),
    "iv_rnd_wgt_qty": randomWgtQty,
    "iv_rnd_wgt_uom": randomWgtUom,
    "iv_platform": "B",
    "iv_idt_dept":idtDept,
    "iv_department":obj.department,
	"iv_idt_from_sub_cat":idtFromSubCat,
	"iv_doc_no":'',
	"iv_orgl_adj_no":'',
	"iv_reference_no":'',
	"iv_order_no":'',
	"iv_segmt_no":seg_no,
	"iv_surcharge":'',
	"iv_inv_no":'',
	"iv_inv_amt":'',
	"iv_delv_number":$('#orderNoUndrWhse').val().trim(),
	"iv_idt_to_sub_cat":idtToSubCat,
	"iv_multiplication_factor":plusMinusInd,
	"iv_override_flag":overrideFlag,
	"iv_order_supplier":iv_order_supplier,
	"iv_idt_comments" : idtComments,
	"iv_pi_verify_flag": pi_verify_flag,
	"iv_sub_category_no": transferQtyFlag ? subCatetransCde : obj.sub_category
	};

	/*if(reasonCode == '76'){
		callServiceToGetIDTDeptList(param,obj);
		flag=false;
	}
	elseif(reasonCode == '26'){
		callServiceToGetIDTPurchaseList(param,obj);
		flag=false;
	}*/ 
	if(flag){
		if(rangingAndDeranging){
			callServiceToRangeItem(param,obj);
		}else{
			callServiceToAdjustSOH(param,obj);
		}
	}
}

function callServiceToAdjustSOH(param,obj)
{
	var url = postStockAdjustURL;
	console.log(url+' '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'msg_type','Stock Adjustment')){
			var tempNewSOH = '';
			var tempNewSOHVal = '';
			 if(response[0].msg_type == 'S')
				 {				 
				 if($('#reasonsForSOHAdjust').val() == '26'){//IDT Reverse
					 callServiceToReverseIDT();//calling this service to update that idt reverse was done
				 }
				 var tempNewSOHFirstArticle = '';
				 if($('#reasonsForSOHAdjust').val() == '83' && transQtyReasonStockAdjItem == 1){//Trans qty reason code
					 transQtyReasonStockAdjItem = 2;
					 calculateSOHAdjustment();					 
				 }else if(transQtyReasonStockAdjItem == 2){//Trans qty reason code -secondarticle
					 transQtyReasonStockAdjItem = 1;
					 var firstArticle= $('#selectedArticleObj').data('obj');
					 //here obj contains second article
					 var title = 'Article '+ firstArticle.article_no+' - '+firstArticle.article_desc+", "+obj.article_no+' - '+obj.article_desc;
					 var msgArray = [];
					 if(firstArticle.complex_pbd_flag == 'Y' && firstArticle.display_item_ind == 'Y'){		//Defect_10241
						 tempNewSOHFirstArticle = (Number(firstArticle.soh || '')+ (Number(param.iv_soh_adj || '') *(-1)* Number(firstArticle.cpbd_pack_size)));
					 }else{
						 tempNewSOHFirstArticle = (Number(firstArticle.soh || '')+ (Number(param.iv_soh_adj || '') *(-1))); 
					 }
					 //tempNewSOHFirstArticle = (Number(firstArticle.soh || '')+ (Number(param.iv_soh_adj || '') *(-1)));
					 tempNewSOHVal = tempNewSOHFirstArticle;
					 tempNewSOHFirstArticle = deciValues(firstArticle.random_weight_flag,((firstArticle.weighted_article_flag == 'Y' || (firstArticle.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),firstArticle.linked_article_flag,firstArticle.pbd_flag,tempNewSOHFirstArticle,firstArticle.pi_soh,firstArticle.article_type,firstArticle.base_uom,true);
					 var tempNewSOHSecondArticle ='';
					 if(obj.complex_pbd_flag == 'Y' && obj.display_item_ind == 'Y'){		//Defect_10241
						 tempNewSOHSecondArticle = (Number(obj.soh || '')+ (Number(param.iv_soh_adj || '') *(1) * Number(obj.cpbd_pack_size)));
					 }else{
						 tempNewSOHSecondArticle = (Number(obj.soh || '')+ (Number(param.iv_soh_adj || '') *(1)));
					 }
					// tempNewSOHSecondArticle = (Number(obj.soh || '')+ (Number(param.iv_soh_adj || '') *(1)));
					 tempNewSOHSecondArticle = deciValues(obj.random_weight_flag,((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.linked_article_flag,obj.pbd_flag,tempNewSOHSecondArticle,obj.pi_soh,obj.article_type,obj.base_uom,true);
					 var oldSOHFirstArticle = deciValues(firstArticle.random_weight_flag,((firstArticle.weighted_article_flag == 'Y' || (firstArticle.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.linked_article_flag,firstArticle.pbd_flag,currentSOH,firstArticle.pi_soh,firstArticle.article_type,firstArticle.base_uom,true);
					 var oldSOHSecondArticle = deciValues(obj.random_weight_flag,((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.linked_article_flag,obj.pbd_flag,obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,true);
					 msgArray.push(adjustReasonMap['70'][0].long_desc+' - ' + 'Stock On Hand changed from '+oldSOHFirstArticle+' to '+ tempNewSOHFirstArticle+" for article "+firstArticle.article_no);
					 msgArray.push(adjustReasonMap['30'][0].long_desc+' - ' + 'Stock On Hand changed from '+oldSOHSecondArticle+' to '+ tempNewSOHSecondArticle+" for article "+obj.article_no);
					 $.fn.showCustomMsg(msgArray,success,'Stock Adjustment Successful',title);						 
				 }else{
					 tempNewSOH = (Number(obj.soh || '')+ (Number(param.iv_soh_adj || '') *(1 * plusMinusInd)));
					 tempNewSOHVal = tempNewSOH;
					 //tempNewSOH = deciValues(obj.random_weight_flag,obj.weighted_article_flag,'',obj.pbd_flag,tempNewSOH,obj.pi_soh,obj.article_type,obj.base_uom,true);
					 var oldSOH = deciValues(obj.random_weight_flag,((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.linked_article_flag,obj.pbd_flag,obj.soh,obj.pi_soh,obj.article_type,obj.base_uom,true);
					 tempNewSOH = deciValues(obj.random_weight_flag,((obj.weighted_article_flag == 'Y' || (obj.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'),obj.linked_article_flag,obj.pbd_flag,response[0].soh,(response[0].pi_soh||'0'),obj.article_type,obj.base_uom,true);
					 if(obj.display_item_ind == 'Y' || obj.sales_set_flag == 'Y')
						 {
						 var msgArray = [];
						 msgArray.push("Stock Adjustment posted successfully. Posted adjustment will be reflected at component level.");
						 $.fn.showCustomMsg(msgArray,success,'Stock Adjustment Successful','Article '+ obj.article_no+' - '+obj.article_desc);
						 }
					 else{
						 if(obj.perpetual_flag=='N'){
							  $.fn.showCustomMsg([param.iv_reason_desc+' - ' + 'Stock On Hand changed successfully'],success,'Stock Adjustment Successful','Article '+ obj.article_no+' - '+obj.article_desc);	 
						    }
						 else{
					          $.fn.showCustomMsg([param.iv_reason_desc+' - ' + 'Stock On Hand changed from '+oldSOH+' to '+ tempNewSOH],success,'Stock Adjustment Successful','Article '+ obj.article_no+' - '+obj.article_desc);
						     }
					     }
					}
					 $('#sohSearchForm')[0].reset();
					 $('#sohDetails')[0].reset();
					 $('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
					 $('.otherReasonsDiv').addClass('hideBlock').removeClass('hideBlock');
					 if(rangingAndDeranging){
						$('#success-wrapper').find('#error_title').text('Ranging Request has been successfully submitted');
						$('#success-wrapper').find('.pageStatusContent').find('#noteContent').remove();
					 	$('#success-wrapper').find('.pageStatusContent').append('<div class="content" id="noteContent"><strong>Please Note: Your request may take up to 1 hour to process</strong></div>');
					 	$('#success-wrapper').bind('click',function(){if($(this).find('#noteContent').length>0)$(this).find('#noteContent').remove();})
					 	$('#rangingAction').addClass('disabled');
					 }
					 if(fromScreen != undefined)
					 {
					 if(tempNewSOHFirstArticle != undefined && tempNewSOHFirstArticle !=''){//for transfer from qty reason
						 	 			// Can be added when they requetsed - for transfer reason, need some clarification
						   var addVal ='';
						 if(tempNewSOHVal > 0){ 
							 addVal = ((globelResponse.order_uom != null && globelResponse.order_uom != '' && globelResponse.order_uom != globelResponse.article_uom) ? " (" + Math.floor(tempNewSOHVal / globelResponse.om) + " " + globelResponse.order_uom + " & " + (Math.round((tempNewSOHVal % globelResponse.om) * 1e3) / 1e3) + " " + globelResponse.article_uom + ")" : '');			
						 }else {
							 addVal = '';
						 }
						 console.log(" addval "+addVal);
						 var actualSoh = '';
						 var actualSohDetail = '';
						 if(obj.random_weight_flag != 'Y' /*&& (obj.weighted_article_flag != 'Y' || obj.allow_decimal_adj != 'Y') */){
							 actualSoh = tempNewSOHVal+' '+obj.base_uom+' '+addVal ;		// added split for transfer reason code
							 actualSohDetail = tempNewSOHVal+' '+obj.base_uom;
						 }else{
							 actualSoh = tempNewSOHVal;
							 actualSohDetail = tempNewSOHVal;
						 }
						 
						 $("#sohValue").text(actualSoh);//Defect fix 3667
						 $('.artNoArtSrchDet').each(function() {

							 if($(this).html() == obj.article_no){
								 var uom = $(this).closest('tr').find('.sohArtSrchDet').text().split(" ")[1];
								 $(this).closest('tr').find('.sohArtSrchDet').text(actualSohDetail);
							 }else if($(this).html() == globelResponse.article_no){
								 $(this).closest('tr').find('.sohArtSrchDet').text(actualSohDetail);    // for transfer reason - detail soh not getting updated as obj.article_no has different value
							 }
						 });
					 }else{
						 if(obj.perpetual_flag!='N'){
							 // defect fix
							 var addVal ='';
							 if(tempNewSOH > 0){ 
								 addVal = ((globelResponse.order_uom != null && globelResponse.order_uom != '' && globelResponse.order_uom != globelResponse.article_uom) ? " (" + Math.floor(tempNewSOH / globelResponse.om) + " " + globelResponse.order_uom + " & " + (Math.round((tempNewSOH % globelResponse.om) * 1e3) / 1e3) + " " + globelResponse.article_uom + ")" : '');			
							 }else {
								 addVal = '';
							 }
							 console.log(" addval "+addVal);
							 var actualSoh = '';
							 var actualSohDetail = '';
							 if(obj.random_weight_flag != 'Y'/* && (obj.weighted_article_flag != 'Y' || obj.allow_decimal_adj != 'Y')*/ ){
								 actualSoh = tempNewSOH+' '+obj.base_uom+' '+(addVal);
								 actualSohDetail = tempNewSOH+' '+obj.base_uom;
							 }else{
								 actualSoh = tempNewSOH;
								 actualSohDetail = tempNewSOH;
							 }
							 $("#sohValue").text(actualSoh);//Defect fix 3667
							 $('.artNoArtSrchDet').each(function() {
								 if($(this).html() == obj.article_no){
									 var uom = $(this).closest('tr').find('.sohArtSrchDet').text().split(" ")[1];
									 $(this).closest('tr').find('.sohArtSrchDet').text(actualSohDetail);
								 }
								 else if($(this).html() == globelResponse.article_no){
									 $(this).closest('tr').find('.sohArtSrchDet').text(actualSohDetail);    // for transfer reason - detail soh not getting updated as obj.article_no has different value
								 }
							 });
						 }	
						 }					 
					 loadLookUpDetailsPage();
					 }
					 else
					 showSOHLookUp();
				 }				 
			 else  if(response[0].msg_type == 'W' || response[0].msg_type == 'w'){
				 //if(checkResult(response,'article_no','Stock Adjustment')){
					 var content = formUnreceivedOrderPopUpContent(response[0].msg.split(','));
			        $('#dialog-unreceived-orders .popupData').html('').append(content);
			        $('#dialog-unreceived-orders').parent().find(
								'.ui-dialog-titlebar .ui-dialog-title').text(
								'List of Unreceived/Non-Posted Orders');
			        $('#dialog-unreceived-orders').dialog('open').removeClass('visible-hide');
				//}
			 }
			 else
			 {
				 $.fn.showCustomMsg([response[0].msg],error,'Stock Adjustment Failed');
			 }
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
	
}
function callServiceToReverseIDT()
{
	var transId = $("#idtToQtyList").val();
	var url = getIDTReverseUrl;
	var param = {
			 	"iv_transid":transId,
			    "iv_sales_org":$("#salesOrg").val(),
			    "iv_session_id":""
			};
	console.log(url+' '+JSON.stringify(param));
	
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(response != undefined && response.length > 0 && response[0].msg_type != undefined ){
			if(response[0].msg_type == 'S'){
				
			}else if(response[0].msg_type == "E" || response[0].msg_type == "F"){
				$.fn.showCustomMsg([response[0].msg],error,'Stock Adjustment');
			}			
		}else{
			$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}

/*function callServiceToGetIDTDeptList(mainParam,obj)
{
	var url = getIDTDepartmentListURL;
	var param = {
			iv_sales_org : salesOrgVal,
			iv_session_id : '00',
			iv_department : obj.department,
			iv_sub_category : obj.sub_category
	};
	console.log(url+' '+JSON.stringify(param));
	
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'idt_dept','Stock Adjustment')){
			 var content = formIDTDeptPopUpContent(response);
	        $('#popupDataDiv').html('').append(content);
	        $('#dialog-common').parent().find(
						'.ui-dialog-titlebar .ui-dialog-title').text(
						'Select IDT Department');
	        bindSelectIDTDeptEvents(mainParam,obj);
	        $('#dialog-common').dialog('open').removeClass('visible-hide');
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
	
}*/
/*function callServiceToGetIDTPurchaseList(mainParam,obj)
{
	var url = getIDTPurchaseListURL;
	var param = {
			iv_sales_org : salesOrgVal,
			iv_session_id : '45',
			iv_reason_code : reasonCode,
			iv_article : obj.article_no
	};
	console.log(url+' '+JSON.stringify(param));
	
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'article_no','Stock Adjustment')){
			 var content = formIDTPurchasePopUpContent(response);
	        $('#popupDataDiv').html('').append(content);
	        $('#dialog-common').parent().find(
						'.ui-dialog-titlebar .ui-dialog-title').text(
						'Select IDT Purchase');
	        bindSelectIDTPurchaseEvents(mainParam,obj);
	        $('#dialog-common').dialog('open').removeClass('visible-hide');
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
	
}*/
function callServiceToGetCharityList(mainParam,obj)
{
	var url = getCharityCodeListURL;
	var param = {
			iv_charity_code : 'ALL',
			iv_site : siteVal,
			iv_sales_org : salesOrgVal
	};
	console.log(url+' '+JSON.stringify(param));
	
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(checkResult(response,'charity_code','Stock Adjustment')){
			
			 var content = formCharityPopUpContent(response);
	        $('#charityList').html('').append(content);
	        $('#charityList').addClass('loaded');
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}
function callServiceToGetSubCategoryTo()
{
	var url = getIDTPurchaseDept;
	var selectedArticle =  $('#selectedArticleObj').data('obj');
	var param = {
			"iv_session_id"	:"",
			"iv_sales_org"	:$("#salesOrg").val(),
			"iv_department"	:selectedArticle.department,
			"iv_sub_category":selectedArticle.sub_category
			};
	console.log(url+' '+JSON.stringify(param));
	
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		if(response != undefined && response.length > 0 && response[0].idt_dept != undefined ){
			 var content = formSubCatToDropDwnContent(response);
	        $('#subCatToList').html('').append(content);
		}else{
			if(response != undefined && response.length <= 0 ){
				$("#reasonsForSOHAdjust").val('Select');
				hideOrShowBasedOnReasonChange();
				$.fn.showCustomMsg(['Article cannot be purchased.'],error,'Stock Adjustment');
			}else{
				$.fn.showCustomMsg(['Sorry, Some technical issue occured.'],error,'Stock Adjustment:Sub-Cateogry');
			}
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}
function callServiceToGetIDTPurchaseList()
{
	var url = getIDTPurchaseList;
	var selectedArticle =  $('#selectedArticleObj').data('obj');
	var param = {
			"iv_article"	:selectedArticle.article_no,
			"iv_reason_code":"76"//76 is reasoncode for IDT purchase
			};
	console.log(url+' '+JSON.stringify(param));
	
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		//response = [{"transid":"2016040117311012380967","article_no":"100036","created_date":"04/01/2016","created_time":"173110","idt_quantity":0.001,"idt_uom":"KG","department":null,"to_fine_dept":"1","to_fine_dept_name":"sub-1","created_user":"100046","user_name":"Test User 46"},{"transid":"2016040116233112380939","article_no":"100036","created_date":"04/01/2016","created_time":"162331","idt_quantity":1,"idt_uom":"KG","department":null,"to_fine_dept":"1","to_fine_dept_name":"sub-cat1","created_user":"100046","user_name":"Test User 46"},{"transid":"2016040116010712380918","article_no":"100036","created_date":"04/01/2016","created_time":"160107","idt_quantity":10,"idt_uom":"KG","department":null,"to_fine_dept":"2","to_fine_dept_name":"subcat2","created_user":"100046","user_name":"Test User 46"},{"transid":"2016040110154512380842","article_no":"100036","created_date":"04/01/2016","created_time":"101545","idt_quantity":40,"idt_uom":"KG","department":null,"to_fine_dept":" ","to_fine_dept_name":null,"created_user":"100046","user_name":"Test User 46"},{"transid":"2016040100330812380640","article_no":"100036","created_date":"04/01/2016","created_time":"003308","idt_quantity":0.005,"idt_uom":"KG","department":null,"to_fine_dept":" ","to_fine_dept_name":null,"created_user":"100046","user_name":"Test User 46"},{"transid":"2016033110295112380112","article_no":"100036","created_date":"03/31/2016","created_time":"102951","idt_quantity":20,"idt_uom":"KG","department":null,"to_fine_dept":" ","to_fine_dept_name":null,"created_user":"100046","user_name":"Test User 46"},{"transid":"2016033110113812380110","article_no":"100036","created_date":"03/31/2016","created_time":"101138","idt_quantity":21,"idt_uom":"KG","department":null,"to_fine_dept":" ","to_fine_dept_name":null,"created_user":"100046","user_name":"Test User 46"}];
		//console.log(response);
		if(checkResult(response,'idt_quantity','Stock Adjustment')){	
			 idtReverseGroupBySubCatMap = $groupBy(response, function(obj) {
				return obj.to_fine_dept_name+" | "+obj.to_fine_dept;
			});
			$("#idtToSubCatList").unbind('click');
			$("#idtToSubCatList").change(function(){
				populateIDTToSubCatList($(this));
			});
			var content = formSubCatDropDownForIDTReverseContent(idtReverseGroupBySubCatMap);
			//var content = formQuantityDropDownForIDTReverseContent(response);
	        $('#idtToSubCatList').html('').append(content);
	        $('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
			$('.idtReverseDiv').addClass('hideBlock').removeClass('hideBlock');
			$('#endSOHValue,#endSOHUom').removeClass('hideBlock');
			if(nonPiItem)
				{
				$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
				$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
				$("#endSOHValue").addClass("hideBlock");
				$("#endSOHUom").addClass("hideBlock");
				}
			else
				{
					$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
					$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
				}
			
		}else{//if no result.. no purchase done before to reverse so this reason code should not be allowed.
			$("#reasonsForSOHAdjust").val('Select');
			hideOrShowBasedOnReasonChange();
			$.fn.showCustomMsg(['Item cannot be reversed, no purchase found.'],error,'Stock Adjustment');
		}
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
}
function populateIDTToSubCatList(selVal){
	var content ='';
	if(idtReverseGroupBySubCatMap != '' && idtReverseGroupBySubCatMap[selVal.val()] != undefined){
		content = formQuantityDropDownForIDTReverseContent(idtReverseGroupBySubCatMap[selVal.val()]);
	}	
	$('#idtToQtyList').html('').append(content);
	bindQtyDropDwn();
	
}
function bindQtyDropDwn(){
	$('#idtToQtyList').unbind('change');
	$('#idtToQtyList').change(function(){
		var qty = ($('#idtToQtyList').find('option[value="'+$(this).val()+'"]').attr('idt_quantity'));
		var pi_qty = ($('#idtToQtyList').find('option[value="'+$(this).val()+'"]').attr('idt_quantity_pi'));
		if((qty||'')!=''){
			$('#endSOHValue').text(Number(currentSOH+Number(qty)).toFixed(3));
			if((pi_qty||'')!=''){
				$('#endPiSOHValue').text(Number(selectedArticle.pi_soh)+Number(pi_qty));
			}
		}
	});
}

function formCharityPopUpContent(list)
{
var content ='<option value="Select">Select Charity</option>';

for(var i=0;i<list.length;i++)
	{
	content +='<option charity_code="'
		+ list[i].charity_code
		+'" charity_code_desc="'
		+ list[i].charity_code_desc
		+'" value="'+list[i].charity_code+'">'
		+ list[i].charity_code_desc
		+'</option>';
	}


return content;
}
function formSubCatToDropDwnContent(list)
{
var content ='<option value="Select">Select Sub-Category</option>';

for(var i=0;i<list.length;i++)
	{
	content +='<option '
		+'value="'+list[i].idt_to_sub_cat+'">'
		+ list[i].idt_to_sub_cat+"-"+list[i].idt_to_sub_cat_name 
		+'</option>';
	}


return content;
}
function formQuantityDropDownForIDTReverseContent(list)
{
var content ='<option value="Select">Date Time (Qty)</option>';
 
for(var i=0;i<list.length;i++)
	{
	var displayVal = (uomRvreIDT[0].base_uom  == 'KG' ? (list[i].idt_quantity).toFixed(3) : list[i].idt_quantity);
	content +='<option '
		+'value="'+list[i].transid+'" idt_quantity="'+list[i].idt_quantity+'" idt_quantity_pi="'+list[i].idt_quantity_pi+'">'
		+formatDateMobi(list[i].created_date)+' '+formatTime(list[i].created_time)+' ('+ list[i].idt_quantity_pi+''+uomRvreIDT[0].pi_uom+ '&'+displayVal+''+uomRvreIDT[0].base_uom+')</option>';
	}


return content;
}
function formSubCatDropDownForIDTReverseContent(map){
	var content ='<option value="Select">Subcategory name | Subcategory ID</option>';
	
	for ( var m in map) {
		content +='<option '
			+'value="'+m+'">'
			+ m
			+'</option>';
	}
	return content;
}

function bindSelectCharityEvents(mainParam,obj)
{
$('.selectCharity').unbind('click');
$('.selectCharity').click(function()
		{
	var $parentTr = $(this).closest('tr');
	var charityCode= $parentTr.attr('charity_code');
	var charityDesc = $parentTr.attr('charity_code_desc');
	mainParam.iv_charity_code = charityCode;
	mainParam.iv_charity_desc = charityDesc;
	callServiceToAdjustSOH(mainParam,obj);
	 $('#dialog-common').dialog('close');
		});
}

function formIDTPurchasePopUpContent(list)
{
	
var content ='<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0"<thead><tr><th>Department</th><th>IDT Qty.</th>'
	+'<th>Created By</th><th>Created On</th><th>Select</th></tr></thead>';

for(var i=0;i<list.length;i++)
	{
	content +='<tr department="'
		+ list[i].department
		+'" idt_quantity="'
		+ list[i].idt_quantity
		+'" idt_quantity_pi="'
		+ list[i].idt_quantity_pi
		+'" ><td>'
		+ list[i].department
		+'</td><td>'
		+ list[i].idt_quantity
		+'</td><td>'
		+ list[i].created_user
		+'</td><td>'
		+ $.tablebuild.dataparse.mobi_date(list[i].created_date) + ' '+ formatTime(padzero((obj.created_time || ''),6));
		+'</td><td class=""><label class="linkBtn linkBtn1" id="'
		+ i 
		+ '"><label class="selectCharity">Select</label></label>'
		+'</td></tr>';
	}

content += '</table></div>';

return content;

}

function formUnreceivedOrderPopUpContent(cont)
{
	
var content ='<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0"<thead><tr><th>Order #</th><th>Expected </br> Delivery date</th>'
	+'<th>Order Status</th></tr></thead>';
var list = [];
for(var i=0;i<cont.length;i++)
	{
	list = cont[i].split('|');
	content +='<tr><td>'
		+ list[0]
		+'</td><td>'
		+ formatDateMobi(list[1])
		+'</td><td>'
		+ list[2]
		+'</td>'
		+'</tr>';
	}

content += '</table></div>';

return content;

}

function bindSelectIDTPurchaseEvents(mainParam,obj)
{
$('.selectPurchase').unbind('click');
$('.selectPurchase').click(function()
		{
	var $parentTr = $(this).closest('tr');
	var charityCode= $parentTr.attr('charity_code');
	var charityDesc = $parentTr.attr('charity_code_desc');
	mainParam.iv_charity_code = charityCode;
	mainParam.iv_charity_desc = charityDesc;
	callServiceToAdjustSOH(mainParam,obj);
	 $('#dialog-common').dialog('close');
		});
}

function formIDTDeptPopUpContent(list)
{
	
var content ='<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0"<thead><tr><th>Department</th><th>IDT From</th>'
	+'<th>IDT To</th><th>Select</th></tr></thead>';

for(var i=0;i<list.length;i++)
	{
	content +='<tr idt_dept="'
		+ list[i].idt_dept
		+'" idt_from_sub_cat="'
		+ list[i].idt_from_sub_cat
		+'" idt_to_sub_cat="'+
		list[i].idt_to_sub_cat
		+'" ><td>'
		+ list[i].idt_dept
		+'</td><td>'
		+ list[i].idt_from_sub_cat
		+'</td><td>'
		+ list[i].idt_to_sub_cat
		+'</td><td class=""><label class="linkBtn linkBtn1" id="'
		+ i 
		+ '"><label class="selectIDTDept">Select</label></label>'
		+'</td></tr>';
	}

content += '</table></div>';

return content;

}

function bindSelectIDTDeptEvents(mainParam,obj)
{
$('.selectIDTDept').unbind('click');
$('.selectIDTDept').click(function()
		{
	var $parentTr = $(this).closest('tr');
	var department= $parentTr.attr('idt_dept');
	var from_sub_cat = $parentTr.attr('idt_from_sub_cat');
	var to_sub_cat = $parentTr.attr('idt_to_sub_cat');
	mainParam.iv_idt_dept =department;
	mainParam.iv_idt_from_sub_cat=from_sub_cat;
	mainParam.iv_idt_to_sub_cat=to_sub_cat;
	callServiceToAdjustSOH(mainParam,obj);
	 $('#dialog-common').dialog('close');
		});
}
function hideOrShowBasedOnReasonChange(reasoncode,recue_stock)
{
	charityCode='';
	charityDesc='';
	var obj= $('#selectedArticleObj').data('obj');
	var flag = recue_stock == 'Y';
	if( $('#prodDate').is(':visible'))$('#prodDate').val();
	$('#endSOHValue,#endSOHUom').removeClass('hideBlock');
	if(reasoncode == '75' || reasonCode == '10')
		{
		$('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
		$('.undrDelvryDiv').addClass('hideBlock').removeClass('hideBlock');
		$('.undrDelvryDiv input').val('');
		$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
		//$('.sohByTextTotal,.endSohTextTotal,#endSOHValue,#endSOHUom').addClass('hideBlock');
		$('.sohByTextTotal').addClass('hideBlock');
		}
	else if(reasoncode == '91' && flag)
		{
		$('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
		$('.damagedDiv').addClass('hideBlock').removeClass('hideBlock');
		if(articleType == "ZBAK"){//only for bakery item this field should be visible
			$('.writeOffDiv').addClass('hideBlock').removeClass('hideBlock');
		}		
		$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
		$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
		
		if(!$('#charityList').hasClass('loaded'))
		{
		callServiceToGetCharityList(obj);
		}
		else
			{
			$('#charityList').val('');
			}
		if( $('#prodDate').is(':visible'))$('#prodDate').val(getDesiredPastDate(1));			 
		}
	else if(flag && (reasoncode == '89' || reasoncode == '52' || reasoncode == '99' 
		|| reasoncode == '14' || reasoncode == '3' || reasoncode == '8' || reasoncode == '49'))
		{
		$('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
		$('.damagedDiv').addClass('hideBlock').removeClass('hideBlock');
		$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
		$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
		
		if(!$('#charityList').hasClass('loaded'))
		{
		callServiceToGetCharityList(obj);
		}
		else
		{
			$('#charityList').val('');
		}
		}
	else if((reasoncode == '83'))//only for BWS salesrog
		{
			$('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
			$(".transferToDiv").removeClass("hideBlock");
			$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
			$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');			
			$('#endSOHValue').addClass('hideBlock').removeClass('hideBlock');
			$('#endSOHUom').removeClass('hideBlock').addClass('hideBlock');
			calculateEndSOHForTransferQty();
			
		}
	else if(reasoncode == '76')//IDT purchase
		{
			$('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
			$('.idtPurchaseDiv').addClass('hideBlock').removeClass('hideBlock');
				
			$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
			$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
			
			
			callServiceToGetSubCategoryTo();
		}
	else if(reasoncode == '26')//IDT Reverse
	{
		callServiceToGetIDTPurchaseList();
	}
	else 
		{
		$('.allParamdivs').removeClass('hideBlock').addClass('hideBlock');
		$('.otherReasonsDiv').addClass('hideBlock').removeClass('hideBlock');
		$('.endSohTextTotal').addClass('hideBlock').removeClass('hideBlock');
		$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
		}
	
	if(reasoncode == '89' || reasoncode == '52' || reasoncode == '91')
		{
		if(obj.sale_or_return_flag == 'Y')
			{
			$.fn.warnPopup('warn',returnMsg,'Stock Adjustment',triggerReturnYes,triggerReturnNo,'',$(this));
			}
		}
	 if(reasoncode == 'PI'){
			$('.sohByText').removeClass('hideBlock').addClass('hideBlock');
			$('.endSohText').addClass('hideBlock').removeClass('hideBlock');
			$('.sohByTextTotal').addClass('hideBlock').removeClass('hideBlock');
			$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
			$("#adjustSOHWeight").prop("disabled",false);
			$("#adjustSOHWeight").val('');
		}else{
			if((reasoncode != '83')){//Transer qTY.
				$('.endSohText').removeClass('hideBlock').addClass('hideBlock');
				$('.sohByText').addClass('hideBlock').removeClass('hideBlock');
				$("#adjustSOHWeight").prop("disabled",true);
				$("#adjustSOHWeight").val("1");
			}			
		}
	 if(reasoncode != '75' && reasonCode != '10'){
		 resetInputUOM(reasoncode);
	 }else{
		 	$('#uomRadioContent input').addClass('hideBlock');
			if((selectedArticle.order_uom||'') != ''){
				$('#uomRadioContent input[placeholder="'+selectedArticle.order_uom+'"]').removeClass('hideBlock');
				$('#uomRadioContent input[placeholder !="'+selectedArticle.order_uom+'"]').val('').focus();
			}else{
				$('#uomRadioContent input[placeholder="'+selectedArticle.base_uom+'"]').removeClass('hideBlock');
				$('#uomRadioContent input[placeholder !="'+selectedArticle.base_uom+'"]').val('').focus();
			}
		 }
	 
	 if(obj.random_weight_flag == 'Y'){ 
		 if(reasoncode == '75' && reasonCode == '10'){
		 	$('#uomRadioContent input').addClass('hideBlock');
			 if((selectedArticle.order_uom||'') != ''){
					$('#uomRadioContent input[placeholder="'+selectedArticle.order_uom+'"]').removeClass('hideBlock');
					$('#uomRadioContent input[placeholder !="'+selectedArticle.order_uom+'"]').val('').focus();
				}else{
					$('#uomRadioContent input[placeholder="'+selectedArticle.base_uom+'"]').removeClass('hideBlock');
					$('#uomRadioContent input[placeholder !="'+selectedArticle.base_uom+'"]').val('').focus();
				}
		 }}		
	if(obj.display_item_ind == 'Y' || obj.prepack_item_ind == 'Y'){  //Defect_5049
		
		if (obj.complex_pbd_flag == 'Y'){
			 $("#endSOHValue").removeClass("hideBlock");
			 $("#endSOHUom").removeClass("hideBlock");
			 $(".endSohTextTotal").removeClass("hideBlock");
			 $(".sohByTextTotal").removeClass("hideBlock"); 
			 $('#uomRadioContent').find('#CAR').addClass('hideBlock');
		}else {
		 $("#endSOHValue").addClass("hideBlock");
		 $("#endSOHUom").addClass("hideBlock");
		 $(".endSohTextTotal").addClass("hideBlock");
		 $(".sohByTextTotal").addClass("hideBlock"); 
		}
		if(reasonCode == '83'){
			
			$('#endSOHValueAdj').addClass('hideBlock');
			$('#endSOHUomAdj').addClass('hideBlock');
			$('.sohByTextTotal').addClass('hideBlock');
			$('#endSOHUom').addClass('hideBlock');
			$('.endSohTextTotal').addClass('hideBlock');
		}else if(reasonCode == 'PI'){
			$('#endSOHValueAdj').addClass('hideBlock');
			$('#endSOHUomAdj').addClass('hideBlock');
			$('.sohByTextTotal').removeClass('hideBlock');
			$('#endSOHUom').removeClass('hideBlock');
			$('.endSohTextTotal').addClass('hideBlock');
		}else{
			$('#endSOHValueAdj').removeClass('hideBlock');
			$('#endSOHUomAdj').removeClass('hideBlock');
			$('.sohByTextTotal').addClass('hideBlock');
			$('#endSOHUom').removeClass('hideBlock');
			$('.endSohTextTotal').removeClass('hideBlock');
		}
	 } 
	 if(nonPiItem)// for defect 5006
		{
		$('.sohByTextTotal').removeClass('hideBlock').addClass('hideBlock');
		$('.endSohTextTotal').removeClass('hideBlock').addClass('hideBlock');
		$("#endSOHValue").addClass("hideBlock");
		 $("#endSOHUom").addClass("hideBlock");
		}
		
		
	$('#uomRadioContent input[name="adjustSOH"]').trigger('change');
	if(rangingAndDeranging){
		setTimeout(function(){$('#uomRadioContent input[name="adjustSOH"]:first').val('').focus();},300);
		
	}
}
var triggerReturnYes = function(e)
{
	var $elem = e.data.msg;
	$elem.dialog('close');
	window.location.replace(claimLink+articleAdjusted);
	
};
var triggerReturnNo = function(e)
{
	var $elem = e.data.msg;
	$elem.dialog('close');
};
function bindSOHDetailsEvents(random_weight_flag,weighted_article_flag,allow_decimal_ind)
{
	if(allow_decimal_ind == 'Y')
		{
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').isValidWeight(3);
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').val('0.000').isValidWeightKeyDwn(3);
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').addClass('weight-box');
			//Defect_11002 - Commenting order uom issue to fix decimal issues
			//if(/*selectedArticle.zea_zkg_flag == 'Y' &&*/selectedArticle.order_uom != undefined &&
					/*selectedArticle.order_uom !=  null &&  selectedArticle.order_uom.trim() != '' && selectedArticle.order_uom !=selectedArticle.base_uom 
				&&  $('.adjustSOHKeyPress[base_uom="'+selectedArticle.order_uom+'"]') != ''
				&& !$('.adjustSOHKeyPress[base_uom="'+selectedArticle.order_uom+'"]').hasClass('hideBlock')
				&& $('.adjustSOHKeyPress[base_uom="'+selectedArticle.order_uom+'"]').is(':visible')){				
				$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.order_uom+'"]').isValidWeight(2);
				$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.order_uom+'"]').val('0.00').isValidWeightKeyDwn(2);
				$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.order_uom+'"]').addClass('weight-box');
			}*/
		}
else
	{
	if(random_weight_flag == 'Y' || weighted_article_flag == 'Y'){//Defect 2830-based on flag bind event
		if(selectedArticle.base_uom == selectedArticle.order_uom){
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').isValidWeight(3);
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').val('0.000').isValidWeightKeyDwn(3);
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').addClass('weight-box');
		}else{
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.order_uom+'"]').onlyNumbers();
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').isValidWeight(3);
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').val('0.000').isValidWeightKeyDwn(3);
			$('#uomRadioContent input[name="adjustSOH"][base_uom="'+selectedArticle.base_uom+'"]').addClass('weight-box');
		}		
		$('#endSOHUndrWhse').isValidWeight(3);
		$('#endSOHUndrWhse').val('0.000').isValidWeightKeyDwn(3);
		$('#endSOHUndrWhse').addClass('weight-box');
		if(random_weight_flag == 'Y')
		$.fn.showCustomMsg(['Please enter average weight.'],information,'Stock Adjustment','',$('#uomRadioContent .weight-box'));
	}else{
		$('#uomRadioContent input[name="adjustSOH"]').onlyNumbers();
		$('#endSOHUndrWhse').onlyNumbers();
	}
}
	
	$('#uomRadioContent input[name="adjustSOH"]').unbind('change');
	$('#uomRadioContent input[name="adjustSOH"]').change(function(e)
	{
		if($("#reasonsForSOHAdjust").val() != '83'){//only for BWS salesrog
			calculateEndSOH($(this),e);
		}
	});
	
	/*$('#endSOHUndrWhse').unbind('change');
	$('#endSOHUndrWhse').change(function()
			{
		var currentEndSOH  = (Number($(this).val()) * Number(plusMinusInd));
		$('#endSOHValue').text(currentEndSOH);
			});*/
	if(random_weight_flag == 'Y')
		$.fn.showCustomMsg(['Please enter average weight.'],information,'Stock Adjustment','',$('#uomRadioContent .weight-box'));
}
function updateCurrentEndSOH(elem,e){
	var testValue=0;
	
	if($('#reasonsForSOHAdjust').val()=='PI'){
		testValue=Number(calculateEndSOHVal());
	}else{
		//testValue=elem.val();
		$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){
			var packSize = 0;
			if(globelObj.complex_pbd_flag == 'Y' && globelObj.display_item_ind == 'Y'){
				 packSize = $(this).attr('cpbd_pack_size');
			}else{
			 packSize = $(this).attr('pack_size');
			}
			var calValue = Number($(this).val() || '') * Number(packSize || '') * Number(plusMinusInd);
			if(selectedArticle.linkage_factor < 1){
				calValue= calValue*selectedArticle.linkage_factor;
			}
			testValue = Number(testValue) + calValue;
		});
	}
	testValue = Math.abs(testValue);
	var number_single_unit = Number(selectedArticle.num_of_soh_units||'1');
	var fixedVal = (testValue*number_single_unit);
	testValue = correctDecimalPostionSTKADJ(fixedVal);
	if((testValue<= warningQty) || $('#reasonsForSOHAdjust').val()=='75') {//Under W/Hse Delivery Check
		//calculateEndSOH();
		if($('#reasonsForSOHAdjust').val()=='76'){ //IDT Purchase
			if(testValue > idtPurchaseLimitQty){				
				warningMsg='You are adjusting SOH by '+testValue+', do you wish to continue?';
				$.fn.warnPopup('warn',warningMsg,'Stock Adjustment',triggerYes,triggerNo,'',elem);
			}else{
				if(validateAdjustSOHForm()){
					calculateSOHAdjustment();
				}
			}
		}else{
			if(validateAdjustSOHForm()){
				calculateSOHAdjustment();
			}
		}		
	}else{
		//$('#endSOHValue').text(calculateEndSOHVal());  for defect Defect_7815
		if($('#reasonsForSOHAdjust').val()=='76'){ //IDT Purchase
			if(testValue > idtPurchaseLimitQty){				
				warningMsg='You are adjusting SOH by '+testValue+', do you wish to continue?';
				$.fn.warnPopup('warn',warningMsg,'Stock Adjustment',triggerYes,triggerNo,'',elem);
			}
		}
		if(testValue > maxLimitQty){
			okElem=elem;
			warningMsg='Your adjustment value cannot exceed '+maxLimitQty+'';
			$.fn.warnPopup('alert',warningMsg,'Stock Adjustment','','',triggerOk,'');
		}else{
			if($('#reasonsForSOHAdjust').val()!='76'){ //IDT Purchase
				warningMsg='You are adjusting SOH by '+testValue+', do you wish to continue?';
				$.fn.warnPopup('warn',warningMsg,'Stock Adjustment',triggerYes,triggerNo,'',elem);
			}
		}
		
	}
}
var correctDecimalPostionSTKADJ = function(val){
	if(val != null && val != '' && val != undefined){
		var negChk = (val < 0 ? (Number(Math.abs(val)%1>0)) :false);		//negative value Chk
		if((Number(val)%1>0)||(negChk)){
			val = Number(val).toFixed(3);
		}else{
			val = Number(val).toFixed(0);
		}
	}
	return val;
}
function calculateEndSOH(){
	var currentEndSOH  ='';
	var calValue = 0;
	var calPiVal = 0;
	//if(fromScreen == undefined){
	if($('#reasonsForSOHAdjust').val()!='PI'){
		currentEndSOH = currentSOH;
		$('#uomRadioContent input[name="adjustSOH"]').each(function(){
			if ((($('#uomRadioContent').find('#CAR').is(":hidden") == true) || $('#uomRadioContent').find('#CAR').length == 0 )&& globelObj.display_item_ind == 'Y')	{
				if(globelObj.complex_pbd_flag == 'Y'){
					 
					$('.sohByTextTotal').removeClass('hideBlock');
					$('#endSOHValueAdj').removeClass('hideBlock');
					$('#endSOHUomAdj').removeClass('hideBlock');
					$('#uomRadioContent ').find('#EA').removeClass('hideBlock');
					if($('#uomRadioContent').find('#EA') == ''){
					$('#endSOHValueAdj').text(calValue);
					$('#endSOHUomAdj').text(globelObj.base_uom);
					
					}
				}else {
					$('#endSOHValueAdj').addClass('hideBlock');
					$('#endSOHUomAdj').addClass('hideBlock');
					$('#endSOHValueAdj').text('');
					$('#endSOHUomAdj').text('');
				}
			 }else {
					$('#endSOHValueAdj').addClass('hideBlock');
					$('#endSOHUomAdj').addClass('hideBlock');
					
				}
			var packSize = '';
			if(globelObj.complex_pbd_flag == 'Y' && globelObj.display_item_ind == 'Y'){
				 packSize = globelObj.cpbd_pack_size;
				// packSize = $(this).attr('cpbd_pack_size');
				 var textVal = $('#uomRadioContent').find('#EA').val();
				 var calculateAdj = Number(textVal) * Number(packSize || '') * Number(plusMinusInd);
				 $('#endSOHValueAdj').text(calculateAdj);
				 $('#endSOHUomAdj').text(globelObj.base_uom);
			}else{
			 packSize = $(this).attr('pack_size');
			}
			calValue = Number($(this).val() || '') * Number(packSize || '') * Number(plusMinusInd);
			calPiVal += Number($(this).hasClass('weight-box') && $(this).val() >0  ? (1* Number(plusMinusInd)) : (($(this).val() || '') * Number(selectedArticle.pi_om || '') * Number(plusMinusInd)));
			/*if($(this).attr('base_uom') == selectedArticle.base_uom  && Number($(this).val())>0){
				calPiVal += 1;	
			}else{
				calPiVal += Number($(this).val() || '') * Number(selectedArticle.pi_om || '');
			}*/
			if(selectedArticle.linkage_factor < 1){
				calValue= calValue*selectedArticle.linkage_factor;
			}
			currentEndSOH =Number(currentEndSOH) + calValue;
		});
		$('#endSOHValue').text(currentEndSOH);
		var obj =$('#selectedArticleObj').data('obj');
		if((obj.random_weight_flag||'') == 'Y')
			{
			var finalPiSOH = (obj.pi_soh || '')+ /*Number($("#adjustSOHWeight").val()) * Number(plusMinusInd)**/calPiVal;
		$('#endPiSOHValue').text(finalPiSOH);
			}
		if(obj.linked_article_flag != 'Y')
		{
		var newEndSoh = currentSOH;
		var adjustedSoh = 0;
		if(!nonPiItem && obj.sales_set_flag == 'Y')
			{
			$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){
				var packSize = $(this).attr('pack_size');
				if(packSize < 1)
					packSize = 1;
				adjustedSoh += Number($(this).val() || '') * Number(packSize || '') * Number(plusMinusInd);
				newEndSoh = Number(newEndSoh) + adjustedSoh;
			});
			$('#endSOHValue').text(newEndSoh);
			}
	}
	}else {
		$('.endSohTextTotal').addClass('hideBlock');
		$('#endSOHValueAdj').addClass('hideBlock');
		$('#endSOHUomAdj').addClass('hideBlock');
		$('#endSOHValueAdj').text('');
		$('#endSOHUomAdj').text('');
		
		var adjustSOH = '' ;		
		$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){		
			if($(this).val() != ''){
				var packSize = 0;
				if(globelObj.complex_pbd_flag == 'Y' && globelObj.display_item_ind == 'Y'){
					packSize = globelObj.cpbd_pack_size;
				}else{
				packSize = $(this).attr('pack_size');
				}
				adjustSOH += Number($(this).val() || '') * Number(packSize || '');
			}		
		});
		var qty = 1;
		var obj =$('#selectedArticleObj').data('obj');
		if((obj.random_weight_flag||'') == 'Y'){
			 qty = Number($("#adjustSOHWeight").val());
		var finalPiSOH =  Number(qty || '')-(obj.pi_soh || '0');
		$('#endPiSOHValue').text(finalPiSOH);
			 
		}
		
		var tempEndSOH = (Number(adjustSOH)*qty);
		if(adjustSOH != ''){
			if(Number(currentSOH) > Number(tempEndSOH)){
				adjustSOH = Number(currentSOH) - tempEndSOH;
				$('#endSOHValue').text("-"+adjustSOH);
			}else{
				adjustSOH = tempEndSOH - Number(currentSOH);
				$('#endSOHValue').text(adjustSOH);
			}
		}else{
			$('#endSOHValue').text("0");
		}
		if(obj.linked_article_flag != 'Y')
		{
		var newEndSoh = currentSOH;
		var adjustedSoh = 0;
		if(!nonPiItem && obj.sales_set_flag == 'Y')
			{
			$('#uomRadioContent input[name="adjustSOH"]:visible').each(function(){
				var packSize = $(this).attr('pack_size');
				if(packSize < 1)
					packSize = 1;
				adjustedSoh += Number($(this).val() || '') * Number(packSize || '') * Number(plusMinusInd);
				newEndSoh = Number(newEndSoh) + adjustedSoh;
	});
			$('#endSOHValue').text(newEndSoh);
			}
	}
		
	}
	if(selectedArticle.random_weight_flag == 'Y' || selectedArticle.weighted_article_flag == 'Y'|| selectedArticle.allow_decimal_adj == 'Y')
	$('#endSOHValue').text(Number($('#endSOHValue').text()).toFixed(3));
	else
	$('#endSOHValue').text(correctDecimalPostion($('#endSOHValue').text()));
	if(!endSOHInitialValueSetFlag){
		if(selectedArticle.random_weight_flag == 'Y' || selectedArticle.weighted_article_flag == 'Y'|| selectedArticle.allow_decimal_adj == 'Y')
		$('#endSOHValue').attr('initialValue',Number($('#endSOHValue').text()).toFixed(3));
		else
		$('#endSOHValue').attr('initialValue',correctDecimalPostion($('#endSOHValue').text()));	
		endSOHInitialValueSetFlag = true;
	}
}
function calculateEndSOHForTransferQty(){
	var transfQty = $("#transQty").val();
	var tranFromArticleObj = $('#selectedArticleObj').data('obj');
	var packSize='';
	//-ive correction for Transfer from article
	//$("#transFromEndSOH").val(Number(currentSOH) - (Number(transfQty) * Number(tranFromArticleObj.pack_size)));
	if(tranFromArticleObj.complex_pbd_flag == 'Y' && tranFromArticleObj.display_item_ind == 'Y'){
		 packSize = tranFromArticleObj.cpbd_pack_size;
		 transFromEndSOH = Number(currentSOH) - (Number(transfQty) * Number(packSize));
	}else{
		transFromEndSOH = Number(currentSOH) - (Number(transfQty) * Number(tranFromArticleObj.pack_size));
	}
	//transFromEndSOH = Number(currentSOH) - (Number(transfQty) * Number(tranFromArticleObj.pack_size));
	if($("#transToArticle").val() != '' && $("#verifyTransToArticleLabel").attr('verified') == 'true'){//means both article selected and valid
		var tranToArticleObj = $('#selectedArticleObjTransferTo').data('obj');
		//+ive correction for Transfer to article
		if(tranToArticleObj != undefined && tranToArticleObj != ""){
			//$("#transToEndSOH").val(Number(tranToArticleObj.soh) + (Number(transfQty) * Number(tranToArticleObj.pack_size)));
			//transToEndSOH = Number(tranToArticleObj.soh) + (Number(transfQty) * Number(tranToArticleObj.pack_size));
			if(tranToArticleObj.complex_pbd_flag == 'Y' && tranToArticleObj.display_item_ind == 'Y'){
				//var fromArticlePackSize = tranFromArticleObj.cpbd_pack_size;
				packSize = tranToArticleObj.cpbd_pack_size;
				transToEndSOH = Number(tranToArticleObj.soh) + (Number(transfQty) * Number(packSize));
			}else {
				transToEndSOH = Number(tranToArticleObj.soh) + (Number(transfQty) * 1);
			}
			
			//transToEndSOH = Number(tranToArticleObj.soh) + (Number(transfQty) * 1);
			var endSOHText = "End SOH of Article("+tranFromArticleObj.article_no+"): "+Number(transFromEndSOH).toFixed(3)+" EA"+ " | "+
									"End SOH of Article("+tranToArticleObj.article_no+"): "+Number(transToEndSOH).toFixed(3)+" EA";
			
			$("#endSOHValue").text(endSOHText);
		}	
	}else{//means only transfer from selected.
		var endSOHText = "End SOH of Article("+tranFromArticleObj.article_no+"): "+Number(transFromEndSOH).toFixed(3)+" EA";
		$("#endSOHValue").text(endSOHText);
	}
}
/* 
 function calculateEndSOHVal(){
	var result=0;
	var currentEndSOH  ='';
	if(fromScreen == undefined)
	{
	currentEndSOH = currentSOH;
	$('#uomRadioContent input[name="adjustSOH"]').each(function()
	{
		var packSize = $(this).attr('pack_size');
		var calValue = Number($(this).val() || '') * Number(packSize || '') * Number(plusMinusInd);
		if(selectedArticle.linkage_factor < 1){
			calValue= calValue*selectedArticle.linkage_factor;
		}
		currentEndSOH =Number(currentEndSOH) + calValue;
	});	
		result=currentEndSOH;
	}else {
		var adjustSOH = '' ;		
		$('#uomRadioContent input[name="adjustSOH"]').each(function()
		{		
			if($(this).val() != ''){
				var packSize = $(this).attr('pack_size');
				adjustSOH += Number($(this).val() || '') * Number(packSize || '');
			}		
		});
		if(adjustSOH != ''){
			if(Number(currentSOH) > Number(adjustSOH)){
				adjustSOH = Number(currentSOH) - Number(adjustSOH);
				result="-"+adjustSOH;
			}else{
				adjustSOH = Number(adjustSOH) - Number(currentSOH);
				result=adjustSOH;
			}
		}else{
			result=0;
		}
		
	}
	return result;
} 
 */

function calculateEndSOHVal(){		//Defect_9804 - fix
	var result=0;
	var currentEndSOH  ='';
	var obj =$('#selectedArticleObj').data('obj');
	if(fromScreen == undefined)
	{
		$('#uomRadioContent input[name="adjustSOH"]:visible').each(function()
				{
			if($(this).val() != ''){
				var packSize = $(this).attr('pack_size');
				var updatedVal = ((obj != '' && (obj.random_weight_flag||'') == 'Y')?$('#adjustSOHWeight').val():'');
				if(updatedVal == 0 || updatedVal == ''){
					updatedVal = 1;
				}
				var calValue = Number($(this).val() || '') * Number(packSize || '') * Number(plusMinusInd) * Number(updatedVal);
				currentEndSOH += calValue;
			}

				});	

		if(currentEndSOH != ''){
			if(Number(currentSOH) > Number(currentEndSOH)){
				currentEndSOH = Number(currentSOH) - Number(currentEndSOH);
				result="-"+currentEndSOH;
			}else{
				currentEndSOH = Number(currentEndSOH) - Number(currentSOH);
				result=currentEndSOH;
			}
		}else{
			result=0;
		}
	}else {
		var adjustSOH = '' ;		
		$('#uomRadioContent input[name="adjustSOH"]:visible').each(function()
				{		
			if($(this).val() != ''){
				var packSize = $(this).attr('pack_size');
				var updatedVal = ((obj != '' && (obj.random_weight_flag||'') == 'Y')?$('#adjustSOHWeight').val():'');	
				if(updatedVal == 0 || updatedVal == ''){
					updatedVal = 1;
				}
				adjustSOH += Number($(this).val() || '')  * Number(packSize || '') * Number(updatedVal || '');
				}		
				});
		if(adjustSOH != ''){
			if(Number(currentSOH) > Number(adjustSOH)){
				adjustSOH = Number(currentSOH) - Number(adjustSOH);
				result="-"+adjustSOH;
			}else{
				adjustSOH = Number(adjustSOH) - Number(currentSOH);
				result=adjustSOH;
			}
		}else{
			result=0;
		}

	}
	return result;
}
function callServiceToSearchOrder(orderNo){
	sohArticleNo = $('#sohArticleTitle').text().split('-')[0].trim();
	var article = sohArticleNo;
	/*if((orderNo||'') != ''){
		article = '';
	}*/
	  var param ={
		   "iv_user_id": $("#loginUserId").val(),
		   "iv_pwd": "",
		   "iv_session_id": "111",
		   "iv_site_no": $("#posSite").val(),
		   "iv_sales_org": $("#salesOrg").val(),
		   "iv_article_no":article,
		   "iv_start_date":"",
		   "iv_end_date":"",
		   "iv_order_no":orderNo
		};
	  
	var url = getOrderDispInfoURL;
	console.log(url+' '+JSON.stringify(param));
	$.ajax({
      data: JSON.stringify(param),
      url: url,
      type: 'post',
      beforeSend: function() {
    	  startLoading();
      }
	}).done(function(response) {
		
		console.log(response);
		$.fn.loadOrdersForStkAdj(response,'','',onOrderSearchTdSelectInSOHAdjust,selectOption,sohArticleNo);
		for(var i=0;i<response.length;i++){
			orderSearchDetailsArray[orderSearchDetailsArray.length] = response[i].order_no;
		}		
		stopLoading();	
	}).fail(function() {
		$.fn.showCustomMsg([mobiSerErrCode],error,'Stock Adjustment');
		stopLoading();
	});
	
}
function orderParam(article, orderNo, fromDate,toDate,orderType,orderStatus,nodeId,nodeLvl,srcInd,supplier,tab_code,article_filter){
	this.iv_article =article;
	this.iv_order_no = orderNo;
	this.iv_delivery_from =fromDate;
	this.iv_delivery_to = toDate;
	this.iv_order_type = orderType;
	this.iv_order_status = orderStatus;
	this.iv_node_id = nodeId;
	this.iv_node_lvl =nodeLvl;
	this.iv_node_level =nodeLvl;
	this.iv_srs_ind =srcInd;
	this.iv_src_supply = srcInd;
	this.iv_supplier_no = supplier;
	this.iv_supplier = supplier;
	this.iv_session_id = '';
	this.iv_site = siteNo;
	this.iv_sales_org = salesOrg;
	this.iv_check_alloc ='';
	this.iv_alloc_flag ='Y';
	this.iv_ranged= 'Y';
	this.iv_barcode = '';
	this.iv_desc='';
	this.iv_article_no ='Y';
	this.iv_gtin ='';
	this.iv_barcode_flag ='';
	this.iv_auto_stockr_flag ='N';
	this.iv_prime_vendor = '';
	this.iv_auto_stockr_flag ='N';
	this.iv_delisted_flag ='N';
	this.iv_uom_flag = 'N';
	this.iv_tab_code =(tab_code||'');
	this.iv_article_filter =(article_filter||'N');	
	this.iv_deleted_flag= ' N';
	
};

function validateOrderNoVerify()
{
if($('#orderNoUndrWhse').val() == '')
	{
	$.fn.showCustomMsg(['Please Enter Order No. Before Verifying.'],error,'Stock Adjustment');
	return false;
	}
return true;
}
function formMapFromAdjustReasonList(list) {
	var hdrMap = {};
	for ( var i = 0; i < list.length; i++) {
		if(list[i].reason_code == "1" && list[i] == "PI Verify"){
			list[i].reason_code  = "PI";
		}
		var key = list[i].reason_code;
		var value = list[i];
		var newList = [];
		if ($(hdrMap).attr(key) != undefined) {
			newList = $(hdrMap).attr(key);
		}
		newList.push(value);
		hdrMap[key] = newList;
	}

	return hdrMap;
}
function unlockSelectedArticle(){
	var obj = $('#selectedArticleObj').data('obj');
	var sohArticleNo = obj.article == undefined ? obj.article_no
			: obj.article;
	var param=
		{
			"iv_article" : sohArticleNo,
			"iv_user_id" : userId,
			"iv_session_id" : '00',
			"iv_routine": "STK_ADJ",
			"iv_lock_flag" : 'U'
		};
	var list=[];
	lockSelectedArticle(param,obj,list);
}
function unlockSecondArticle(){
	var obj = $('#selectedArticleObjTransferTo').data('obj');
	if(obj != undefined && obj != null && obj != ''){
		var sohArticleNo = obj.article == undefined ? obj.article_no
				: obj.article;
		var param=
			{
				"iv_article" : sohArticleNo,
				"iv_user_id" : userId,
				"iv_session_id" : '00',
				"iv_routine": "STK_ADJ",
				"iv_lock_flag" : 'U'
			};
		var list=[];
		lockSelectedArticle(param,obj,list);
		$('#selectedArticleObjTransferTo').data('obj','');//reset after unlock
	}	
}

$.fn.onChangeOfSOHField = function(obj) {
	globelObj = obj;
	this.each(function() {
		$(this).keyup(
				function(e) {					
					calculateEndSOH($(this),e);		
				});
	});
};
$.fn.onChangeOfTransferQtyField = function() {
	this.each(function() {
		$(this).keyup(
				function(e) {					
					calculateEndSOHForTransferQty($(this),e);		
				});
	});
};
$.fn.onBlurOfSOHField = function() {
	this.each(function() {
		$(this).blur(
				function(e) {					
					var obj =$('#selectedArticleObj').data('obj');
					/*if(//obj.zea_zkg_flag == 'Y' && 
					 * obj.allow_decimal_adj == 'Y'  && obj.order_uom != null && obj.order_uom != undefined && obj.order_uom.trim() != ''
						&& obj.base_uom != obj.order_uom && $('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]') != '' && !$('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').hasClass('hideBlock')
					&& $('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').is(':visible')){
						var val = $('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').val();						
						$('.adjustSOHKeyPress[base_uom="'+obj.order_uom+'"]').val(Number(val).toFixed(2));						
					}*/
					var flag = ((obj.random_weight_flag||'') == 'Y' || ((obj.weighted_article_flag == 'Y' || obj.allow_decimal_adj == 'Y') ? 'Y' : 'N') == 'Y') && ($(this).attr('id') != "adjustSOHWeight");
					if(flag && $(this).attr('id') != obj.order_uom){
							if($(this).val().indexOf('.')== -1){
								$(this).val(Number($(this).val()/1000).toFixed(3));
								calculateEndSOH($(this),e);
							}else if($(this).val().indexOf('.') >-1  && $(this).val().indexOf('.') == $(this).val().length-1){
								$(this).val(Number($(this).val()).toFixed(3));
							}
					}
				});
	});
};
function frameUnreceivedOrdersPopUp(response){
	var obj = $('#selectedArticleObj').data('obj');
	var sohArticleNo = obj.article == undefined ? obj.article_no
			: obj.article;
	var param=
		{
			"iv_article" : sohArticleNo,
			"iv_user_id" : userId,
			"iv_session_id" : '00',
			"iv_routine": "STK_ADJ",
			"iv_lock_flag" : 'U'
		};
	var list=[];
	lockSelectedArticle(param,obj,list);
}
function goBack(){
	var e= {data:{msg:$('#dialog-unreceived-orders')}};
	triggerLeaveStkAdjScreenYes(e);
}
function validateFieldsForTransferToReasonCode(){
	var rtnFlag = true;
	var errorsArray = [];
	var $focusElem ='';
	if($("#transQty").val() == ''){
		errorsArray.push('Please enter Tansfer Qty.');
		$focusElem = $focusElem == '' ? $("#transQty")  : $focusElem;
	}
	if($("#transToArticle").val() == ''){
		errorsArray.push('Please enter Tansfer To Article.');
		$focusElem = $focusElem == '' ? $('#transToArticle')  : $focusElem;
	}else{
		if($("#verifyTransToArticleLabel").attr('verified') != 'true'){
			errorsArray.push('Please verify the Article.');
			$focusElem = $focusElem == '' ? $('#transToArticle')  : $focusElem;
		}
	}
	if(errorsArray.length > 0)
	{
		showErrors(errorsArray,$focusElem);
		rtnFlag = false;
	}
	return rtnFlag;
}
function resetFieldsOfTransferToReasonCode(){
	$("#transQty").val('').focus();
	$("#transFromEndSOH").val('');
	$("#transToEndSOH").val('');
	$("#transToArticle").val('');
	$("#verifyTransToArticleLabel").attr('verified',false);
	$("#transToEndSOHDiv").addClass("hideBlock");
}