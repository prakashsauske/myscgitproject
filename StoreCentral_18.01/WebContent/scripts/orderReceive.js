var oldRecvMethod = '';
var globalTempFlag = false;
var recvMethodChgFlag = false;
var ordSegNo = '';
var notRangedAllowed =true;
var urqFlag = false;
var SSCC_CartonIdForNewRow;
var SSCC_IdForNewRow='';
var SSCCforTable='';
var cartonCount='';
var discpCarton='';
var CartonIdForHeader='';
var componentArtMap = {};
var mainArticleChkd=false;
var dialog_open_CmpntArticles = '<div id="dialog-com-CmpntArticles" title="Component Articles"><div class="popupContent "><div class="popupData contentWrapper "><div id="openCmpntArticles"></div></div><div class="popupActionsWrapper"><span class="popupActions"><label onclick="$(\'#dialog-com-CmpntArticles\').dialog(\'close\');" class="actionBtn">OK</label></span></div></div></div>';
var discCount = 0;
var discTblArea = '';
var newArticleCount = 0;
var receiveByExpStepProceed = false;
var receiveByExpOKProceed = false;
var headarea='<table cellspacing="0" class="ContentTable drilldownTable treetab treetable recvArticleTable" id=""  style=" margin-top: 5px;" >'+
'<thead>'+ 
'<tr>'+
	'<th rowspan="2">Article # </th>'+
	'<th rowspan="2">Vendor Ref #</th>'+
	'<th rowspan="2">Description</th>'+	
	'<th class="centerValue columnDivider"  rowspan="2">OM</th>'+
	'<th class="centerValue columnDivider" colspan="2">Ordered </th>'+	
	'<th class="centerValue columnDivider" colspan="2">Dispatched </th>	'+
	'<th class="centerValue columnDivider" colspan="2">Received</th>'+
	'<th class="centerValue columnHide" width="70px" rowspan="2">New OM</th>'+
	'<th class="centerValue columnHide" width="70px" rowspan="2">Expiry Date</th>'+
    '<th class="lastColumn centerValue confirmCol lineByLine removeRC" width="80px" rowspan="2">Confirm<br>Received<br>(<span class="confirmed">0</span>/<span class="totConfirmed">0</span>)</th>'+
'</tr>'+
'<tr class="subHeader">'+
							
	'<th class="centerValue">Qty.</th>	'+					
	'<th class="centerValue columnDivider">Total Units</th>'+
	'<th class="centerValue">Qty.</th>'+						
	'<th class="centerValue columnDivider">Total Units</th>'+
	'<th class="centerValue">Qty.</th>'+						
	'<th class="centerValue columnDivider">Total Units</th>'+
'</tr>'+

'</thead>'+
'<tbody></tbody>'+
'</table>';
var discrepenciesHdr='<table cellspacing="0" class="ContentTable discrepancyTable" id="">'+
'<thead><tr>'+
'<th rowspan="2">Article #</th>'+
'<th rowspan="2">Vendor<br>Ref #</th>'+
'<th rowspan="2">Description</th>'+
'<th class="centerValue" colspan="2">Ordered </th>'+
'<th class="centerValue" colspan="2">Dispatched </th>'+
'<th class="centerValue" colspan="2">Received </th>'+						

'<th rowspan="2" width="40px" class="centerValue ">Difference</th>'+
'<th rowspan="2" class="">Reason</th>'+
'<th class="lastColumn centerValue confirmCol lineByLine" width="80px" rowspan="2">Confirm<br>Discrepancies<br>(<span class="DiscpConfirmed">0</span>/<span class="totDiscp">0</span>)</th>'+
'</tr>'+
'<tr class="subHeader">'+
'<th class="centerValue">Qty.</th>'+
'<th class="centerValue">Total Units</th>'+
'<th class="centerValue">Qty.</th>'+
'<th class="centerValue">Total Units</th>'+
'<th class="centerValue">Qty.</th>'+
'<th class="centerValue">Total Units</th>'+
'</tr>'+
'</thead>'+'<tbody></tbody>'+
'</table>';
var addArticle='<div class="lineByLine searchBoxArea hideBlock">'+
'<div class="tableActionsBtnsWrapper">'+
    '<div class="lookupActionWrapper">'+
        '<label class="linkBtn addRow addActionBtn" onclick="getAddArticle(this);" addcarton="">Add Missing Article</label>'+
       								
       /* '<span style="float:right">'+
	      '<input type="checkbox" id="changeOM" />'+'<label for="checkboxActive">Change order multiple and input expiry date</label>'+
        '</span>'+ */

        '<div class="errorDiv hideBlock" id="artErrorDiv" style="float:right">'+
	       '<label id="errorMsg">No article found for '+'<strong>3234</strong>'+'. Please try a different number.</label>'+
	       '<label class="closeMessage">&nbsp;</label>'+
      '</div>'+

  '</div> <!-- End of lookup action wrapper -->'+
' </div> <!-- End of table actions btn wrapper -->'+
'<div class="tableActionsWrapper tableAddAction" id="">'+
    '<div class="formWrapper">'+

           '<div class="parameter">'+
             '<label class="searchBox" for="searchBox">Article</label>'+							
             '<input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="">'+
            '</div>	'+						

           '<div class="parameter">'+
              '<label class="" for="qty">Received Qty.</label>'+
              '<input type="#" tabindex="2" id="qty" class="textbox numberBox">'+

           '</div>'+

            '<div class="formActions">'+
              '<label class="actionBtn searchAndAdd" onclick="getSearchAndAdd(this);"  carton_id=""><a >Search & Add</a></label>'+
             '<label class="secondaryActionBtn closeLink" onclick="getCloseId(this);" close_id=""><a >Close</a></label>'+						
            '</div> <!-- End of form actions -->'+
					
       '</div> <!-- End of formWrapper  -->'+
 '</div> <!-- End of table Actions Wrapper -->'+
'</div>';


function bindOnPageLoadEventsForReceiveOrder() {
	console.log('123');
    $('.closeMessage').click(function() {
        $(this).parent().addClass('hideBlock');
    });
    current_line_count =  $('#order_detail').data('contObj').max_line_number;

    // ganesh 02062015
    $("#dialog-selectArticle").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minHeight: 120,
        maxHeight: 600,
        width: 700
    });

    $("#dialog-recvConfirmation").dialog({
        autoOpen: false,
        modal: true,
        resizable: false,
        minHeight: 100,
        maxHeight: 600,
        width: 350
    });

    $("#dialog-recvConfirmation").parent().addClass("popupWrapper");
    // ganesh

    // Next Button Click Event
    $('#nextbtn')
        .unbind('click').bind('click',
            function(e) {
                trigNxtBtn();
            });

    // Previous Button Click Event
    $('#prevbtn')
        .click(
            function() {
                console.log("Clicked prev button");
                var currentId = Number($(
                    '.ui-state-highlight').attr(
                    'id').split('-')[1]);
                var checkedValue = $('.reportRadio')
                    .find(
                        'input[type="radio"]:checked')
                    .val();
                navigateToPreviousStep(currentId,
                    checkedValue);
            });

    // Save & Continue Later Button Click Event
    $('#savebtn').click(
        function() {

            var currentId = Number($('.ui-state-highlight')
                .attr('id').split('-')[1]);
            if (window[validateMethodMap[currentId]]()) {
                var recvParam = getReceiveParam(false, false,'S','Save');
                callCommonReceivingService(recvParam, true, 'save');
            }
        });

    // Submit Button Click Event
    $('#submitbtn')
        .click(
            function() {
            	var rejectedTempArticle  = 0;
            	var showSOHUpdatePopup = true;
                var currentId = Number($(
                    '.ui-state-highlight').attr(
                    'id').split('-')[1]);
                if (window[validateMethodMap[currentId]]
                    ()) {
                	var action_flag= $('.postRadio').find('input[type="radio"]:checked').val();
                    var recvParam = getReceiveParam(false, false,action_flag, 'Submit');
                    recvParam.iv_action_flag = action_flag;
                    //Defect_11021 - Fix - Added as the popup of SOH update should not display when only temp reject articles are present 
                    for (var i = 0; i < recvItemInfo.length; i++) {
                        if(globalTempFlag && recvItemInfo[i].temp_chk_flag =='Y')
                        {
                        	rejectedTempArticle++;
                        }
                    }
                    showSOHUpdatePopup = (rejectedTempArticle > 0 && rejectedTempArticle == recvItemInfo.length)?false:showSOHUpdatePopup;
                    if (recvParam.iv_action_flag == 'P' && showSOHUpdatePopup) {
                        showRecvPostConfirmation(recvParam, true, 'submit');
                    } else {
                        callCommonReceivingService(recvParam, true, 'submit');
                    }
                }
            });

    $('#cancelbtn').click(function() {
        var receiveMsg = 'Current receiving process will be cancelled. Are you sure you want to proceed?';
        $.fn.warnPopup('warn', receiveMsg, 'Receive Articles', triggerReceiveCancelYes, triggerDeleteNo, '', '');
    });

    var triggerReceiveCancelYes = function(e) {
        var $elem = e.data.msg;
        var recvParam = getReceiveParam(true, false,'X');
        recvParam.iv_action_flag = 'X';
        callCommonReceivingService(recvParam, true, 'cancel');
        //	navigate(detail);
        $elem.dialog('close');
    };

    // Step Click Event
    $('.tabAnchor')
        .click(
            function() {
                var currentTabId = Number($(
                    '.ui-state-highlight').attr(
                    'id').split('-')[1]);
                var clickedTabId = Number($(this)
                    .parent().attr('id').split('-')[1]);
                var checkedValue = $('.reportRadio')
                    .find(
                        'input[type="radio"]:checked')
                    .val();
                //1927 - remove ULD for vendor order code here
                if (!((checkedValue == 'MM' && (clickedTabId == 2 || clickedTabId == 3)) || 
                		(clickedTabId == 3 && $('#discrepancyTable tbody tr').length <= 0) ||
                        (clickedTabId == 4 && isPO($('h2.articleTitle:visible').attr('order_type'))))) {

                    if (clickedTabId < currentTabId) {



                        $('#recvArticleTable').find('tbody tr').removeClass('rowHighlight');
                        $('.ui-menu-item').removeClass(
                            'ui-state-highlight');
                        $(
                                'li[id="tab-' +
                                clickedTabId +
                                '"]')
                            .addClass(
                                'ui-state-highlight');
                        $(
                            'div[id="step-' +
                            currentTabId +
                            '"]').toggle(
                            100);
                        $(
                            'div[id="step-' +
                            clickedTabId +
                            '"]').toggle(
                            100);
						if (clickedTabId == 1) {
							$('.orderReceive').find('#changeOM').prop('disabled', false);
							//$('.orderReceive').find('#changeOM').prop('checked', false);
							$('.orderReceive').find('#changeOM').trigger('click');
						}

                        toggleButtonsDisplay(clickedTabId);
                    }
                }
            });

    $('.reportRadio').find('input[type="radio"]').click(
        function() {
            newRecvMethod = $('.reportRadio').find(
                'input[type="radio"]:checked').val();

            if (oldRecvMethod != newRecvMethod) {
                recvMethodChgFlag = true;
            }
        });

    $('.orderReceive').find('#changeOM').unbind('click');
    $('.orderReceive').find('#changeOM').click(
        function() {
        	if($('.orderReceive').find('#changeOM').prop('checked')==true){
                        
        		$('.orderReceive #recvArticleTable').find('.columnHide').show();
        	}else{
        		$('.orderReceive #recvArticleTable').find('.columnHide').hide();
        	}
        });

    $('.updateRecvdQty').find('#changeOM').unbind('click');
    $('.updateRecvdQty').find('#changeOM').click(
        function() {
            $('.updateRecvdQty #editArticleTable').find(
                '.columnHide').toggle();
        });

    bindEnterSpecKeyEvent();

    bindSearchAndAddEvents($('.recvArticleStep'), false);
    
    bindCartonAddBox();

    //bindSearchAndAddEvents($('.updateRecvdQty'), true);

    bindAddULDEvents($('#step-4'));

   /* $('.temperatureChange').unbind('change');
    $('.temperatureChange').change(function() {
        var integerValue = $(this).val();
        //$(this).val(Number(integerValue).toFixed(1));
        $(this).val(Number(integerValue).toFixed(2));
    });*/
   invoiceAlphaNumeric();
     
}
function checkGroupALL(id){
	cartonId=id;
	if($('#'+id).is(':checked') )
		$('.'+id).prop("checked",true);
	else{
		$('.'+id).prop("checked",false);
	}        
	SSCCforTable=cartonId;
	cartonConfirmBoxCheck(cartonId);
	}
function getCloseId(close_id){
	area=$('.recvArticleStep');
	closeId=$(close_id).attr("close_id");
	area.find('.tableAddAction.'+closeId).slideToggle(100);
	
}
function getSearchAndAdd(searchId){
	var area=$('.recvArticleStep');
	closeId=$(searchId).attr("carton_id");
	CartonIdForHeader=closeId;
	srArea=area.find('.searchBoxArea.'+closeId);	
	toAddArea=area.find('.recvArticleTable.'+closeId);
	//area.find('.recvArticleTable.'+closeId).removeClass('hideBlock');
    SSCC_IdForNewRow=closeId.replace('carton', '');
    SSCC_CartonIdForNewRow=closeId.replace('carton', '');
	searchAndAddArticleBySSCC_Id(srArea, toAddArea, false);
	
	//addToArticleTable(item, srArea, toAddArea, urqFlag)
	
}
function getAddArticle(addId){
	closeId=$(addId).attr("addcarton");
	area.find('.tableAddAction.'+closeId).slideToggle(100);
	
}
function checkGroup(checkboxClass){
       var totalCheckboxes = $('.'+checkboxClass).length;
	   var checkedCheckboxes = $('.'+checkboxClass+':checked').length;
	   if(totalCheckboxes == checkedCheckboxes){
			$('#'+checkboxClass).prop("checked",true);}
	   else{
			$('#'+checkboxClass).prop("checked",false);}
	   SSCCforTable=checkboxClass;
	 
	}
function checkGroupALL2(id){
	if($('#'+id).is(':checked') )
		$('.'+id).prop("checked",true);
	else
		$('.'+id).prop("checked",false);
	discpCarton=id;
	}
function checkGroup2(checkboxClass){
       var totalCheckboxes = $('.'+checkboxClass).length;
	   var checkedCheckboxes = $('.'+checkboxClass+':checked').length;
	   if(totalCheckboxes == checkedCheckboxes)
			$('#'+checkboxClass).prop("checked",true);
	   else
			$('#'+checkboxClass).prop("checked",false);
	   discpCarton=checkboxClass;
	}	
	
function trigNxtBtn() {
    $('#recvArticleTable').find('tbody tr').removeClass('rowHighlight');
      
    var currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
    var checkedValue = $('.reportRadio').find('input[type="radio"]:checked').val();
 
    //commenting the code for defect-8734
	/*if((checkedValue == 'MM')){	
	currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
	   callItemInfoForReceivingInFull(receiveInFull_retainSessionFlag,receiveInFull_orderNo,receiveInFull_sourceFlag,receiveInFull_dataObj,receiveInFull_asnNo)
	   }	
 else{	*/   
	 
    if (window[validateMethodMap[currentId]]()) {
        var nextId = currentId + 1;
      //Release 17.08 -  Defect_10527 Fix
       if(!receiveByExpOKProceed && currentId == 2 && checkedValue == 'MF' 
    	   && ($('#recvArticleTable input:checkbox:checked').length != $('#recvArticleTable tbody tr').length)){
    	   receiveByExpStepProceed = false;
    	   var msg ="Remaining items will be received in Full.";
        	$.fn.warnPopup('warn', msg, 'Receiving By Exception Confirmation',  triggerReceivebyExpOK, triggerReceivebyExpCancel, '', '', 'Proceed/Back');
        }else { receiveByExpStepProceed = true; }
        if(receiveByExpStepProceed) {      
        //1927 - remove ULD for vendor order code here
        if (checkedValue == 'MM' && currentId == 1) {
        	//Defect_10395 - removing ULD step restriction for vendor order 
            /*if (isPO($('h2.articleTitle:visible').attr('order_type')) && currentId == 1)
                nextId = currentId + 4;
            else*/
                nextId = currentId + 3;
        }
        //1927 - remove ULD for vendor order code here
        //Defect_10395 - removing ULD step restriction for vendor order 
        /*if (isPO($('h2.articleTitle:visible').attr('order_type')) && currentId == 3) {
            nextId = currentId + 2;
        }*/
        if(checkedValue == 'RC' && nextId == 3){
            nextId = 4;    
        }		
        if(nextId == 4 && !(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y')){	
		nextId = nextId + 1;
        }
        
        $('.ui-menu-item').removeClass('ui-state-highlight');
        $('li[id="tab-' + nextId + '"]').addClass('ui-state-highlight');
        $('div[id="step-' + currentId + '"]').toggle(100);
        $('div[id="step-' + nextId + '"]').toggle(100);
        if (currentId == 1 && recvMethodChgFlag) {
            clearRecvContent();
        }
        toggleButtonsDisplay(nextId);
        frameStepContent(nextId);
        area.find('#closebtn').trigger('click');
   // }
	}
    }
}

// Exception Handling - Starts

function showRecvErrorMsg(msg, title) {
    $.fn.showCustomMsg([msg], error, title);
}

/*
function showErrorMsg(msg, area, id) {
	area.find('#errorMsg').text(msg);
	area.find('#' + id).removeClass('hideBlock');
}

function hideAllErrorMsg(area) {
	area.find('#dockErrorDiv').addClass('hideBlock');
	area.find('#artErrorDiv').addClass('hideBlock');
	area.find('#uldErrorDiv').addClass('hideBlock');
	area.find('#uldAddErrorDiv').addClass('hideBlock');
}
*/

function showNotRangedContent(wrapperMsg) {

    $.fn.showCustomMsg([wrapperMsg], information, 'Articles Not-ranged');
}

function hideNotRangedContent() {
    //$('#recvNotRangedWrapper').addClass('hideBlock');
}
// Exception Handling - Ends
function updateOrderHdrInfo() {
    var area = $('.orderReceive .articleHead');
    var orderType = '';

    if (fullObject.hdrObj.order_type == 'VENDOR') {
        orderType = 'Vendor Order';
    } else if (fullObject.hdrObj.order_type == 'WAREHOUSE') {
        orderType = 'Warehouse Order';
    }
    area.find('.orderNumber')
        .text(orderType + ' #' + Number(getEmptyIfNull(fullObject.hdrObj.order_no)));
    area.find('.recvSupplier').text(
        getEmptyIfNull(fullObject.hdrObj.supplier_name) + ' (' +
        getEmptyIfNull(fullObject.hdrObj.supplier_no) + ')');
    area.find('.recvDispDate').text(
        getEmptyIfNull(fullObject.hdrObj.dispatched_date));
    area.find('.recvDelvDate').text(
        formatDateMobi(fullObject.hdrObj.delv_date).replace('.', '/').replace(
            '.', '/'));
}

function resetFieldsOnPageLoad() {
    var area = $('.orderReceive');
    area.find('.textbox').val('');
    area.find('.reportRadio').find('input[type=radio]:first').prop('checked',
        true);
    oldRecvMethod = area.find('.reportRadio').find('input[type="radio"]:checked').val();
    area.find('#recvArticleTable').removeClass('framed');
    area.find('#addULDTable').addClass('hideBlock');
    area.find('#addULDTable tbody').html('');
    var currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
    area.find('div[id="step-' + currentId + '"]').toggle();
    area.find('.ui-menu-item').removeClass('ui-state-highlight');
    area.find('#tab-1').addClass('ui-state-highlight');
    area.find('div[id="step-1"]').toggle();
    if (area.find('#changeOM').is(':checked')) {
        area.find('#changeOM').trigger('click');
        area.find('#changeOM').prop('disabled', false);
    }
    toggleButtonsDisplay(1);
}

function bindEnterSpecKeyEvent() {
    $('.orderReceive').keypress(function(event) {
        if (event.which == 13) {
            if ($('.popupActions').is(':visible')) {
                $('.popupActions').find('.actionBtn:visible:first').trigger('click');
            } else if ($(document.activeElement).hasClass('actionBtn') && $(document.activeElement).parent().is(':visible')) {
                $(document.activeElement).parent().trigger('click');
            } else {
                $('.actionBtn:visible:first').trigger('click');
            }
        }
    });
}

function navigateToPreviousStep(currentId, checkedValue) {
    //hideAllErrorMsg($('.wizardContent'));

    $('#recvArticleTable').find('tbody tr').removeClass('rowHighlight');
    var prevId = currentId - 1;

    // Defect Fix - Removing Order type check for Receive in Full Method
    //if (isPO($('h2.articleTitle:visible').attr('order_type')) && currentId == 5 && prevId == 4) {
    if (currentId == 5 && prevId == 4) {
        if (checkedValue == 'MM' && currentId == 5){
        	if(!(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y') && !isPO($('h2.articleTitle:visible').attr('order_type'))
        			|| isPO($('h2.articleTitle:visible').attr('order_type')))
        	 prevId = currentId - 4;
        	else
        	 prevId = currentId - 1;        	
        }else if (recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y'){
        	 prevId = currentId - 1;
        }else
            prevId = currentId - 2;
    }


    if (checkedValue == 'MM' && currentId == 4) {
        prevId = currentId - 3;
    } else if (!isPO($('h2.articleTitle:visible').attr('order_type')) && currentId == 5 && prevId == 3) {
        prevId = currentId - 1;
    }
	
	if(prevId == 4 && !(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y')){	
			 prevId = prevId - 1;
	}
   if(salesOrg==1060 && era_prof=="Y"){
	   if (prevId == 3 && $('.discrepancyTable tbody tr').length <= 0) {
	        prevId = prevId - 1;
	    } 
   }
   else{
	   if (prevId == 3 && $('#discrepancyTable tbody tr').length <= 0) {
	        prevId = prevId - 1;
	    }  
   }
    

    if (prevId == 3 && $('#discrepancyTable tbody tr').length <= 0) {
        prevId = prevId - 1;
    }
	
    if (prevId == 1) {
        $('.orderReceive').find('#changeOM').prop('disabled', false);
        //$('.orderReceive').find('#changeOM').prop('checked', false);
        $('.orderReceive').find('#changeOM').trigger('click');
    }

    $('.ui-menu-item').removeClass(
        'ui-state-highlight');
    $('li[id="tab-' + prevId + '"]').addClass(
        'ui-state-highlight');
    $('div[id="step-' + currentId + '"]').toggle(
        100);
    $('div[id="step-' + prevId + '"]').toggle(100);
    toggleButtonsDisplay(prevId);
    receiveByExpStepProceed = false;
    receiveByExpOKProceed = false;
}



function frameStepContent(nextId) {
    if (nextId == 2) {
            if (!$('.recvArticleTable').hasClass('framed')) {
                formRecvArticlesContent();
            } else {
                $('.recvArticleStep .lineByLine').show();
            }
    $('.recvArticleStep').find('#tableAddAction').hide();
    } else if (nextId == 3) {
        formDiscrepancyContent();
    } else if (nextId == 4) {
    	 var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val();
    	if(containsNotRangedItem && recvMethod == 'MM'){
                var notRangedMsg = '<ul><li>Total <strong>' + notRangedItem + ' articles</strong> in this order are not ranged to your store. </li>' +
                    '<li>&nbsp;</li><li>Click on Accept to receive those articles or reject it.</li></ul>';
                showNotRangedPopup(notRangedMsg);
    	}
    	formULDContent();
    } else if (nextId == 5) {
        formRecvSummaryContent();
    }
}

// This method manages the display of Prev, Next & Submit Buttons in each step
function toggleButtonsDisplay(selectedId) {
    $('.orderReceive').find('.actionBtn , .secondaryActionBtn').removeClass('hideBlock');
    (selectedId == 5) ? ($('#nextbtn').addClass('hideBlock')) :
    ($('#submitbtn').addClass('hideBlock'));
    (selectedId == 1) ? ($('#prevbtn, #savebtn').addClass('hideBlock')) : '';
}

// This method forms the article table in 2. receive articles step
function formRecvArticlesContent() {
    var area = $('.recvArticleStep');
    var tblArea = area.find('#recvArticleTable');
    var $tempTr = '';
    var notRanged = 0;
    var notRangedMsg = '';
    var cartonIdGroupingMap={};
    cartonCount='';
    recvMethod = $('.reportRadio').find('input[type="radio"]:checked')
        .val();
    if(headerObj != '' && headerObj != undefined && headerObj['itemCompObjFlag']){
        componentArtMap = headerObj['itemCompObjMap'];        
    }
	
    if (recvMethod != 'MM') {
    	$('#SSCCGroup')
        .treetable('destroy');
        area.find('.lineByLine').show();
        tblArea.find('tbody').html('');
        area.find('.articleHdr').html(
            '<strong>List of Articles (' + (recvItemInfo.length) + ') </strong>');
        
        if (recvItemInfo.length > 0) {
		 cartonIdGroupingMap={};
		for(var i=0;i<recvItemInfo.length;i++){
		if(cartonIdGroupingMap[recvItemInfo[i].sscc_carton_num] == undefined)
            		  {
            		  var newArray = [];
            		  newArray.push(recvItemInfo[i]);
            		  cartonIdGroupingMap[recvItemInfo[i].sscc_carton_num] = newArray;
            		  }
            	  else
            		  {
            		  var existingArray = [];
            		  existingArray = cartonIdGroupingMap[recvItemInfo[i].sscc_carton_num];
            		  existingArray.push(recvItemInfo[i]);
            		  cartonIdGroupingMap[recvItemInfo[i].sscc_carton_num] = existingArray;
            		  }
					 				  				
		}
		
		if(salesOrg==1060 && era_prof=="Y"){
			area.find('.articleHdr').html(
		            '<strong>List of cartons (' + (Object.keys(cartonIdGroupingMap).length) + ') </strong>');
			
		var articlesNo='';	
	    $("#searchBoxArea").addClass("hideBlock");	
        $("#CartonAddBox").removeClass("hideBlock");
		area.find('#SSCCGroup thead').empty();
		//var addArt=area.find('#CartonAddBox');		
		headerCont='<tr class="collapsed"><th width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter expandAll" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span></th><th col width="300">'+"SSCC id"+'</th><th class="centerValue" col width="300">'+"No. Of Articles"+'</th><th class="lastColumn centerValue confirmCol lineByLine" width="300px" rowspan="2">Confirm Received(<span class="confirmedIn">0</span>/<span class="CartonCount">3</span>)</th></tr>';
		/*'<tr class="subHeader">'+
		'<th class="centerValue"></th>	'+					
	    '<th class="centerValue columnDivider"></th>'+
		'<th class="centerValue"></th>'+								
	'</tr>';*/
		var articleList;
		area.find('#SSCCGroup thead').append(headerCont);	
		for (var vendor in cartonIdGroupingMap) {
			articleList='';
			 articleList = cartonIdGroupingMap[vendor];
			 // tempId=articleList[0].sscc_carton_num;
			    //area.find('#SSCCGroup tbody tr').remove('tr');
			    var cartonCheckboxArea = (recvMethod != 'RM')?('<input class="cartonSelect confirmCheck " type="checkbox" onclick="checkGroupALL(this.id);"  id='+articleList[0].sscc_carton_num+'>'):'';
	            cont = '<tr data-tt-id="' +articleList[0].sscc_carton_num+ '" class="rowHighlight groupByExpand1"><td width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter">&nbsp;</span></td><td class="groupedBy rowSection rowHighlight" colspan="1"><strong>sscc: '+articleList[0].sscc_carton_num+ '</strong></td><td class="rowSection rowHighlight centerValue articleCount">'+articlesNo+'</td><td class="rowSection rowHighlight centerValue ">'+cartonCheckboxArea+'</td><tr data-tt-id="' +articleList[0].sscc_carton_num+ '_sub" data-tt-parent-id="' +articleList[0].sscc_carton_num+ '"><td colspan="10" class="padright8" id="groupBy_' +articleList[0].sscc_carton_num+ '"><span class="indenter" style="padding-left: 19px;"></span></td></tr>';
				area.find('#SSCCGroup').append(cont);
				area.find('#SSCCGroup>tbody').addClass('mainTable');
				area.find('#SSCCGroup').show();
				$('#SSCCGroup').find('#qty').within999();
				area.find('#groupBy_'+articleList[0].sscc_carton_num).append(addArticle);
	            area.find('#groupBy_'+articleList[0].sscc_carton_num).append(headarea);
                if(recvMethod == 'RC'){
                   area.find(".removeRC").addClass("hideBlock");       
                }else{
                    area.find(".removeRC").removeClass("hideBlock");        
                }
                var max_line_number = 0;
		for (var i in articleList) {
                var changeOMFlag = false;
                if ((recvMethod == 'RM' || recvMethod == 'MF') && recvConfigMap['EDOR'] != null && recvConfigMap['EDOR'] == 'Y')
                    changeOMFlag = true;				
                $tempTr = $(getRowContent(articleList[i], changeOMFlag))
                    .data('obj', articleList[i]);
               if(articleList[i].display_article_flag=="Y"){
			$tempTr.find('.confirmCheck').addClass('component_Flag');
		}
                area.find('#groupBy_'+articleList[0].sscc_carton_num+' tbody').append($tempTr);
                 if(recvMethod == 'RC'){
                         area.find('.recvTextBox').prop("readonly", true);
                 }
               // area.find('#SSCCGroup tbody  #groupBy_'+articleList[0].sscc_carton_num).append($tempTr);
                initializeDatePicker();
                if (articleList[i].ranged_flag != undefined && articleList[i].ranged_flag != 'Y') {
                    notRanged++;
                }
                if(articleList[i].article_line!=undefined && articleList[i].article_line!=''){
    				max_line_number = ( Number(articleList[i].article_line) > max_line_number  ? Number(articleList[i].article_line) : max_line_number);
    			}
            }
		current_line_count = max_line_number;
				    area.find('td#groupBy_'+articleList[0].sscc_carton_num+' .recvArticleTable').addClass('framed');
	                area.find('td#groupBy_'+articleList[0].sscc_carton_num+' .recvArticleTable').addClass('carton'+articleList[0].sscc_carton_num);
	        		var Newarea=$('td#groupBy_'+articleList[0].sscc_carton_num);
	        		Newarea.find('.searchBoxArea').addClass('carton'+articleList[0].sscc_carton_num);
	        		//area.find('#searchBoxArea #addActionBtn').addClass('add'+articleList[0].sscc_carton_num);
	        		Newarea.find('.searchBoxArea .addActionBtn').attr('addcarton','carton'+articleList[0].sscc_carton_num);
	        		Newarea.find('.searchBoxArea .tableAddAction').addClass('carton'+articleList[0].sscc_carton_num);
	        		Newarea.find('.searchBoxArea .searchBox').attr('addcarton','carton'+articleList[0].sscc_carton_num);
	        		//$('#searchBoxArea #tableAddAction').attr('addcarton','carton'+articleList[0].sscc_carton_num);
	        		Newarea.find('.searchBoxArea .searchAndAdd').attr('carton_id','carton'+articleList[0].sscc_carton_num);
	        		Newarea.find('.searchBoxArea .closeLink').attr('Close_id','carton'+articleList[0].sscc_carton_num);
	        		articlesCountInExistingCarton(area,vendor);
		
	        		var articleNo_SSCC = Number(Newarea.find('tbody tr .confirmCheck').length);	        			        		
	        		Newarea
	                .find('.confirmCol')
	                .html(
	                    'Confirm<br>Received<br>(<span class="confirmed">0</span>/<span class="totConfirmed">' +
	                    articleNo_SSCC + '</span>)');
		}
		cartonCount=area.find('#SSCCGroup tbody.mainTable td.articleCount').length;
		area.find('#SSCCGroup thead th .CartonCount').html(cartonCount)
		tblArea = area.find('.recvArticleTable');

        $(".tooltip").tooltip({
            position: {
                my: "right top-20",
                at: "right+5 top-10"
            }
        });

        /*If ordersDispatchQtyFlag is configured as false in application settings, 
         received quantity field should be empty for the user to enter */
        if (!(recvConfigMap['PRQ'] != null && recvConfigMap['PRQ'] == 'Y')) {
            tblArea.find('.recvTextBox').val('');
        }

        if (!(recvConfigMap['PRW'] != null && recvConfigMap['PRW'] == 'Y')) {
            tblArea.find('.wtTextBox').val('');
        }

       // tblArea.find('.recvTextBox').within999();//defect_8850
   //     tblArea.find('.recvTextBox').within9999();
          tblArea.find('.wtTextBox').isWithin999Or3Decimal();
       // tblArea.find('.packOM').within999();
        tblArea.find('.columnHide').hide();
        tblArea.addClass('framed');
        area.find('#searchBoxArea').find('#qty').within999();
       /* if ((recvMethod == 'RM' || recvMethod == 'MF') && recvConfigMap['EDOR'] != null && recvConfigMap['EDOR'] == 'Y') {
            if (!area.find('#searchBoxArea').find('#changeOM').is(':checked'))
                area.find('#searchBoxArea').find('#changeOM').trigger('click');
            area.find('#searchBoxArea').find('#changeOM').prop('disabled', true);
        }*/
        
        
    bindReceiveQtyEvent(tblArea);
    if (($('#order_detail').data('contObj') != undefined && ($('#order_detail').data('contObj').hdrDtlObj[0].asn_no || '') != '' && isPO($('#order_detail').data('contObj').hdrObj.order_type)) || isST($('#order_detail').data('contObj').hdrObj.order_type)){
        area.find('#addActionBtn').addClass('hideBlock');
    } else {
        area.find('#addActionBtn').removeClass('hideBlock');
    }
    bindConfirmCheckBoxEvent(tblArea, true);
    bindExpiryDateMoreEvent(tblArea);
    bindSearchAndAddEvents($('.recvArticleStep'), false);

    /*if (recvMethod == 'MF') {
    	area.find('.lineByLine').hide();
    	area.find('.columnHide').hide();
    }*/ //Showing change om and expiry date for receiving with exzception 
    if (notRanged > 0) {
        notRangedMsg += '<ul><li>Total <strong>' + notRanged + ' articles</strong> in this order are not ranged to your store. </li>' +
            '<li>&nbsp;</li><li>Click on Accept to receive those articles or reject it.</li></ul>';
        showNotRangedPopup(notRangedMsg);
    }
		
		}
					  
			else{
				
				$("#recvArticleTable").removeClass("hideBlock")
				var max_line_number = 0;				  									  
            for (var i in recvItemInfo) {
                var changeOMFlag = false;
                if ((recvMethod == 'RM' || recvMethod == 'MF') && recvConfigMap['EDOR'] != null && recvConfigMap['EDOR'] == 'Y')
                    changeOMFlag = true;
                $tempTr = $(getRowContent(recvItemInfo[i], changeOMFlag))
                    .data('obj', recvItemInfo[i]);
			if(recvItemInfo[i].display_article_flag=="Y"){
				$tempTr.find('.confirmCheck').addClass('component_Flag');
			}
                tblArea.find('tbody').append($tempTr);
                initializeDatePicker();
                if (recvItemInfo[i].ranged_flag != undefined && recvItemInfo[i].ranged_flag != 'Y') {
                    notRanged++;
                }
                if(recvItemInfo[i].article_line!=undefined && recvItemInfo[i].article_line!=''){
					max_line_number = ( Number(recvItemInfo[i].article_line) > max_line_number  ? Number(recvItemInfo[i].article_line) : max_line_number);
				}
            }
            current_line_count = max_line_number;
            $(".tooltip").tooltip({
                position: {
                    my: "right top-20",
                    at: "right+5 top-10"
                }
            });
           
            /*If ordersDispatchQtyFlag is configured as false in application settings, 
             received quantity field should be empty for the user to enter */
            if (!(recvConfigMap['PRQ'] != null && recvConfigMap['PRQ'] == 'Y')) {
                tblArea.find('.recvTextBox').val('');
            }

            if (!(recvConfigMap['PRW'] != null && recvConfigMap['PRW'] == 'Y')) {
                tblArea.find('.wtTextBox').val('');
            }

           // tblArea.find('.recvTextBox').within999(); //defect_8850
      //      tblArea.find('.recvTextBox').within9999(); 
           tblArea.find('.wtTextBox').isWithin999Or3Decimal();
            //tblArea.find('.packOM').within999();
            newOm4DecimalCheck();
            tblArea.find('.columnHide').hide();
            tblArea.addClass('framed');
            area.find('#searchBoxArea').find('#qty').within999();
            if ((recvMethod == 'RM' || recvMethod == 'MF') && recvConfigMap['EDOR'] != null && recvConfigMap['EDOR'] == 'Y') {            	
            	if(isSTO($('#order_detail').data('contObj').hdrObj.order_type)){
            		                     
                        area.find('#searchBoxArea').find('#changeOM').trigger('click');
                        area.find('#searchBoxArea').find('#changeOM').prop('disabled', true);
                        area.find('#searchBoxArea').addClass("hideBlock");
	            }else{
	            	if (!area.find('#searchBoxArea').find('#changeOM').is(':checked'))
	                    area.find('#searchBoxArea').find('#changeOM').trigger('click');
	                	area.find('#searchBoxArea').find('#changeOM').prop('disabled', true);
	            	}
            }       

        tblArea
            .find('.confirmCol')
            .html(
                'Confirm<br>Received<br>(<span class="confirmed">0</span>/<span class="totConfirmed">' +
                recvItemInfo.length + '</span>)');
        bindReceiveQtyEvent(tblArea);
        if (($('#order_detail').data('contObj') != undefined && ($('#order_detail').data('contObj').hdrDtlObj[0].asn_no || '') != '' && isPO($('#order_detail').data('contObj').hdrObj.order_type)) || isST($('#order_detail').data('contObj').hdrObj.order_type)){
            area.find('#addActionBtn').addClass('hideBlock');
        } else {
            area.find('#addActionBtn').removeClass('hideBlock');
        }
        bindConfirmCheckBoxEvent(tblArea, true);
        bindExpiryDateMoreEvent(tblArea);

        /*if (recvMethod == 'MF') {
        	area.find('.lineByLine').hide();
        	area.find('.columnHide').hide();
        }*/ //Showing change om and expiry date for receiving with exzception 
        if (notRanged > 0) {
            notRangedMsg += '<ul><li>Total <strong>' + notRanged + ' articles</strong> in this order are not ranged to your store. </li>' +
                '<li>&nbsp;</li><li>Click on Accept to receive those articles or reject it.</li></ul>';
            showNotRangedPopup(notRangedMsg);
        }
    }
    }
    

    console.log(recvMethod);
    
    $('#SSCCGroup')
    .treetable({
      expandable: true
    });
	
    }
 }
function newOm4DecimalCheck(){
	$('.newOM4Decimal').on('keypress', function(e) {
	       var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');

	       if ((k < '0' || k > '9') && k !== '.' && k !== '-') return false;

	       // reject any input that takes the length
	       // two or more beyond the decimal point
	       if (dp >= 0 && v.length > dp + 3) {
	           return false;
	       }

	       // don't accept >1 decimal point, or as first char
	       if (k === '.' && (dp >= 0 || v.length === 0)) {
	           return false;
	       }

	   });
	   $('.newOM4Decimal').on('keyup', function(e) {
	       var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');
	       if (this.value >= 10000 || this.value <= -10000)
	       	{//this.value='';
	        if(this.value.indexOf('-') == 0){
	             this.value= this.value.substr(0, 5);
	        }else {
	             this.value= this.value.substr(0, 4);
	        }
	           return false;
	       }

	   });
}

//This method shows the confirmation popup for not ranged articles
function showNotRangedPopup(msg) {
    try {
        $("#dialog-recvConfirmation").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            minHeight: 100,
            maxHeight: 600,
            width: 700
        });

        var totCartonsOrdered =0;
        var  totCartonsReceived=0;
        var zeroQtyafterNotRangedCheck=0;
        
        $("#dialog-recvConfirmation").parent().addClass("popupWrapper");

        $('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#continue, #cancel')
            .addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#acceptbtn, #rejectbtn')
            .removeClass("hideBlock");
        // $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
        $("#dialog-recvConfirmation").dialog("open");
        $("#dialog-recvConfirmation").find('#message').html(msg);
        $("#dialog-recvConfirmation").parent().find('.ui-dialog-title').text(
            'Articles Not-ranged');
        $("#dialog-recvConfirmation").find('#acceptbtn').unbind('click');
        $("#dialog-recvConfirmation").find('#acceptbtn').click(function() {
            $("#dialog-recvConfirmation").dialog("close");

            var wrapperMsg = 'The articles marked in red are not-ranged to your store';
            notRangedAllowed = true; // need fix
            if($('.reportRadio').find('input[type="radio"]:checked')
        	        .val() != 'MM'){
            	showNotRangedContent(wrapperMsg);
            }
            if($('.reportRadio').find('input[type="radio"]:checked')
        	        .val() == 'MM')
				{
				for(var i=0;i<recvItemInfo.length;i++)
					{
					var obj = recvItemInfo[i];
					if(obj.ranged_flag == 'N')
						{
					obj.received_qty_not_ranged = obj.received_qty;
						}
					}
					
				}
            
            for (var i = 0; i < recvItemInfo.length; i++) {
            	totCartonsOrdered += Number(getEmptyIfNull(recvItemInfo[i].order_qty));
            	totCartonsReceived += Number(getEmptyIfNull(recvItemInfo[i].order_qty));
                if(recvItemInfo[i].received_qty_not_ranged == '0')
            	{
                	totCartonsReceived -= Number(getEmptyIfNull(recvItemInfo[i].order_qty));
                	zeroQtyafterNotRangedCheck++;
            	}
                if(globalTempFlag && recvItemInfo[i].temp_chk_flag =='Y' && recvItemInfo[i].received_qty_not_ranged != '0')
                	{
                	totCartonsReceived -= Number(getEmptyIfNull(recvItemInfo[i].order_qty));
                	zeroQtyafterNotRangedCheck++;
                	}
                //Defect_12756 - Fix
               /* if(!jQuery.isEmptyObject(componentArtMap) && componentArtMap[recvItemInfo[i].article] != ''
                	&& recvItemInfo[i].ranged_flag == 'N'){                		
                		var list = componentArtMap[recvItemInfo[i].article];
                		for(var i in list){
                		list[i].selected = false;                		
                	}                	
                }*/
            }          
            var summaryArea=$('#step-5').find('#recvSummaryTable');           
            summaryArea.find('.totRecvCartons').html((commonOrder.order_type == 'VENDOR' &&
            		!jQuery.isEmptyObject(componentArtMap) && recvMethod != 'MM')?'<label>'+totCartonsReceived+'</label><label class="receiveingInfoFlag"></label>':
            	 '<label>'+totCartonsReceived+'</label>' );
            addtooltip($('.receiveingInfoFlag'), 'Excludes display articles. Refer to List of Articles');
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            $('#step-5').find('#discDetails').find('.zeroQty').text(zeroQtyafterNotRangedCheck);
        });
        $("#dialog-recvConfirmation").find('#rejectbtn').unbind('click');
        $("#dialog-recvConfirmation").find('#rejectbtn').click(function() {
            $("#dialog-recvConfirmation").dialog("close");
			if($('#recvArticleTable .notRangedRecvField')!=undefined && $('#recvArticleTable .notRangedRecvField').length>0 && salesOrg!=1060)
				{
			$('#recvArticleTable .notRangedRecvField').text('0');
			$('#recvArticleTable .notRangedRecvField').parent().next().text('0');
			$('#recvArticleTable .notRangedRecvField').parent().find('input').each(function()
				{
				$(this).val('0');
				});
			}
		if($('.recvArticleTable .notRangedRecvField')!=undefined && $('.recvArticleTable .notRangedRecvField').length>0 && salesOrg==1060)
			{
		$('.recvArticleTable .notRangedRecvField').text('0');
		$('.recvArticleTable .notRangedRecvField').parent().next().text('0');
		$('.recvArticleTable .notRangedRecvField').parent().find('input').each(function()
			{
			$(this).val('0');
			});
		}
			if($('.reportRadio').find('input[type="radio"]:checked')
        	        .val() == 'MM')
				{
				for(var i=0;i<recvItemInfo.length;i++)
					{
					var obj = recvItemInfo[i];
					if(obj.ranged_flag == 'N')
					{
					obj.received_qty_not_ranged = '0';
                    }
					}
					
				}
            notRangedAllowed = false;
           
            for (var i = 0; i < recvItemInfo.length; i++) {                
            	totCartonsOrdered += Number(getEmptyIfNull(recvItemInfo[i].order_qty));
            	totCartonsReceived += Number(getEmptyIfNull(recvItemInfo[i].order_qty));
                if(recvItemInfo[i].received_qty_not_ranged == '0')
            	{
                	totCartonsReceived -= Number(getEmptyIfNull(recvItemInfo[i].order_qty));
                	zeroQtyafterNotRangedCheck++;
            	}
                if(globalTempFlag && recvItemInfo[i].temp_chk_flag =='Y' && recvItemInfo[i].received_qty_not_ranged != '0')
                {
                	totCartonsReceived -= Number(getEmptyIfNull(recvItemInfo[i].order_qty));
                	zeroQtyafterNotRangedCheck++;
                }
                //Defect_12756 - Fix
                /*if(!jQuery.isEmptyObject(componentArtMap) && componentArtMap[recvItemInfo[i].article] != ''
                	&& recvItemInfo[i].ranged_flag == 'N'){                		
                		var list = componentArtMap[recvItemInfo[i].article];
                		for(var i in list){
                		list[i].selected = false;
                	}
                }*/
            }
            var summaryArea=$('#step-5').find('#recvSummaryTable');           
            summaryArea.find('.totRecvCartons').html((commonOrder.order_type == 'VENDOR' &&
            		!jQuery.isEmptyObject(componentArtMap) && recvMethod != 'MM')?'<label>'+totCartonsReceived+'</label><label class="receiveingInfoFlag"></label>':
            	 '<label>'+totCartonsReceived+'</label>' );
            addtooltip($('.receiveingInfoFlag'), 'Excludes display articles. Refer to List of Articles');
            $(".tooltip")
              .tooltip({
                position: {
                  my: "left center",
                  at: "right+10 center"
                }
              });
            $('#step-5').find('#discDetails').find('.zeroQty').text(zeroQtyafterNotRangedCheck);
        });
    } catch (err) {
        showNotRangedPopup(msg);
    }
}

// This method frames each row in the article table
function getRowContent(obj, changeOMFlag) {
    var content = '';
    var rowClass = '';
    var cellClass = '';
    var title = '';
    var disabled = '';
    var recvValue = '';
	var recvOrgValue = '';
    var chkDisabled = '';
    var qtyHideBlock = '';
    var wtHideBlock = '';
    var recvWtValue = '';
    var recvTd = '';
    var tot_units_recvd = '';
    var expireDateDisable = '';
    var received_qty_uom = '';
	var wgt_required = 'N';
    var receivedTotalDefault =false;

    obj.pack_size = getOneIfEmpty(obj.pack_size);
    obj.pi_om = getOneIfEmpty(obj.pi_om);
    obj.base_uom = getOneIfEmpty(obj.base_uom);
    obj.order_qty = getEmptyIfNull(obj.order_qty);
    if (obj.order_qty == "")
        obj.order_qty = 0;
    obj.dispatched_qty = getEmptyIfNull(obj.dispatched_qty);
   /* if (obj.dispatched_qty == "")
        obj.dispatched_qty = 0;*/
    obj.article = getEmptyIfNull(obj.article);
    obj.vendor_ref_no = getEmptyIfNull(obj.vendor_ref_no);
    obj.article_desc = getEmptyIfNull(obj.article_desc);
    //obj.tot_units_uom = getEmptyIfNull(obj.tot_units_uom);
    obj.tot_units_uom = getEmptyIfNull(obj.base_uom);
    obj.order_uom = getEmptyIfNull(obj.order_uom);
    obj.dispatched_uom = getEmptyIfNull(obj.dispatched_qty_uom);
    obj.received_qty = getEmptyIfNull(obj.received_qty);
    var tot_units_order = '';
    var tot_ord_rand_wght_units = '';
    var tot_dispt_rand_wght_units = '';
    var tot_recv_rand_wght_units = '';
   
    tot_units_order = Number(obj.om || '') * Number(obj.order_qty);   
    
    var tot_units_dispatched = '';
        tot_units_dispatched = (obj.dispatched_qty!=null && obj.dispatched_qty!="")?(Number(obj.dispatched_om||obj.om) * Number(obj.dispatched_qty)):'';
        tot_units_dispatched =(obj.dispatched_qty!=null && obj.dispatched_qty!="")?
        		((tot_units_dispatched != '' && tot_units_dispatched.toString().indexOf('.') != "-1")?Number(tot_units_dispatched).toFixed(3):(tot_units_dispatched))+" "+        		
        ((obj.dispatched_qty!=null && obj.dispatched_qty!="" && obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:''):'NA';
        
        if (obj.received_qty!=null && obj.received_qty!=undefined && obj.received_qty.toString()!='') {
        	recvValue = obj.received_qty;
        	received_qty_uom = obj.received_qty_uom;
        	tot_units_recvd = Number(obj.recv_om||obj.om||'') * Number(recvValue);
        } else if(obj.dispatched_qty!=null && obj.dispatched_qty!=undefined && obj.dispatched_qty.toString()!=''){
        	recvValue = obj.dispatched_qty;
        	received_qty_uom = obj.dispatched_uom;
        	tot_units_recvd = Number(obj.dispatched_om||'') * Number(recvValue);
        } else if(obj.order_qty!=null && obj.order_qty!=undefined && obj.order_qty.toString()!=''){
        	recvValue = obj.order_qty;
        	received_qty_uom = obj.order_uom;
        	tot_units_recvd = Number(obj.om || '') * Number(recvValue);
        }
        received_qty_uom = (obj.received_qty!=null && obj.received_qty!=undefined && obj.received_qty.toString()!='' && (received_qty_uom||'') == '')
        		?((obj.dispatched_uom)||(obj.order_uom)):received_qty_uom;
	if(obj.dispatched_qty!=null && obj.dispatched_qty!=undefined && obj.dispatched_qty.toString()!=''){
		recvOrgValue = obj.dispatched_qty;
	} else if(obj.order_qty!=null && obj.order_qty!=undefined && obj.order_qty.toString()!=''){
		recvOrgValue = obj.order_qty;
	}
	
	if(obj.random_wt_flag == 'Y' || (obj.weighted_flag == 'Y' && received_qty_uom == 'KG')){
		if (obj.rnd_wgt!=null && obj.rnd_wgt!=undefined && obj.rnd_wgt.toString()!='') {
			recvWtValue = obj.rnd_wgt;
		} else if(obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined && obj.dispathced_wgt.toString()!=''){
			recvWtValue = obj.dispathced_wgt;
		} else if(obj.ordered_wgt!=null && obj.ordered_wgt!=undefined && obj.ordered_wgt.toString()!=''){
			recvWtValue = obj.ordered_wgt;
		}
		recvWtValue = (recvWtValue != '0' && recvWtValue.toString().indexOf('.') != "-1")?
				Number(recvWtValue).toFixed(3):(recvWtValue == ''?'0':recvWtValue);
		wtHideBlock =  '';
		wgt_required = 'Y';
	}
	//R18.01 - Meat Co - Weighted Article Receiving - Changes
	else if(obj.weight_flag !=  undefined  && obj.weight_flag == 'Y'){
		if (obj.rnd_wgt!=null && obj.rnd_wgt!=undefined && obj.rnd_wgt.toString()!='') {
			recvWtValue = obj.rnd_wgt;
		} else if(obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined && obj.dispathced_wgt.toString()!=''){
			recvWtValue = obj.dispathced_wgt;
		}
		recvWtValue = (recvWtValue != '0' && recvWtValue.toString().indexOf('.') != "-1")?
				Number(recvWtValue).toFixed(3):(recvWtValue == ''?'0':recvWtValue);
		wtHideBlock =  '';
		wgt_required = 'Y';
	}else{
		wtHideBlock =  'hideBlock';
	}
	//4554 change
	var temp_qty = '';
	if(obj.random_wgt_flg == 'Y' && obj.order_uom == obj.base_uom){
		temp_qty = ((obj.received_pi_qty||'')!= '' ? obj.received_pi_qty : (((obj.ordered_pi_qty||'') !='') ? obj.ordered_pi_qty : (recvValue * obj.pi_om)));
		recvValue = temp_qty;
		recvOrgValue = temp_qty;
		received_qty_uom = obj.pi_uom;		
	}
    //recvWtValue = (obj.dispathced_wgt != undefined && obj.dispathced_wgt != null && $.trim(obj.dispathced_wgt) != '') ? obj.dispathced_wgt : Number(obj.ordered_wgt || '');
    expireDateDisable = '';
    chkDisabled = (recvValue.toString() == '') ? 'disabled' : '';
    qtyHideBlock = ((obj.weighted_flag||'' ) == 'Y' && received_qty_uom == 'KG') ? 'hideBlock' : '';
    //wtHideBlock = (obj.random_wt_flag == 'Y' || (obj.weighted_flag == 'Y' && received_qty_uom == 'KG')) ? '' : 'hideBlock';

    if (obj.temp_chk_flag != undefined && obj.temp_chk_flag != null && obj.temp_chk_flag == 'Y') {
        disabled = ' disabled';
        recvValue = '0';
        recvWtValue = '0';
        tot_units_recvd = '0';
    }
    if(salesOrg==1060 && era_prof=="Y" && auditFlag  == "Y"){
        recvValue = '';
        recvWtValue = '';
        tot_units_recvd = '0';
     }
    disabled = (((isPO($('#order_detail').data('contObj').hdrObj.order_type)) 
    		&& (obj.display_article_flag =="Y")) ? '  disabled' : disabled);
    recvTd = '<input wgt_required = "'+wgt_required+'" type="text" ' + disabled + ' value="' + recvValue + '" maxlength="14" qty_org="'+recvOrgValue+'" class="recvTextBox numBox editNumCell textbox textboxDefaultText ' + qtyHideBlock + '"><label class="moreInput wtLabel ' + wtHideBlock + '"><strong>Total Weight (kg)</strong></label>' +
        '<input type="text" '+disabled+' qty_required="'+obj.random_wt_flag+'" value="' + (obj.weighted_flag == 'Y' && received_qty_uom == 'KG' ? recvValue : recvWtValue)+'" wgt_org="'+(obj.weighted_flag == 'Y' && received_qty_uom == 'KG' ? recvValue : recvWtValue)+'" maxlength="8" class="wtTextBox wtTextBoxFix editNumCell numBox textbox textboxDefaultText ' + wtHideBlock + '">';

    if (obj.ranged_flag != undefined && obj.ranged_flag != 'Y') {
        rowClass = 'warningIndicator';
        cellClass = 'tooltip';
        title = 'Article is not-ranged';
        recvTd = '<label class="notRangedRecvField">' + recvValue + '</label><input type="text"  value="' + recvValue + '"maxlength="14" qty_org="'+recvOrgValue+'" class="recvTextBox numBox editNumCell textbox textboxDefaultText hideBlock">';
    } else if (obj.product_recall != undefined && obj.product_recall != 'N') {
        rowClass = 'urgentIndicator';
        cellClass = 'tooltip';
        title = 'Article is Recalled';
    }
    if(obj.display_article_flag =="Y"){
        recvTd = (isPO($('#order_detail').data('contObj').hdrObj.order_type))?
        '<a class="newWindowDisPre showComponentReceive"><label class="linkBtn"></label></a>'
        :recvTd +'<a class="newWindowDisPre showComponentReceive"><label class="linkBtn"></label></a>'; 
        receivedTotalDefault = (isPO($('#order_detail').data('contObj').hdrObj.order_type))?true:false;
    }
    if(/*obj.article_life_cycle_info  != 'NA' && obj.article_life_cycle_info  != 'RA' && */obj.article_status_desc != undefined && obj.article_status_desc != ''){
    	rowClass = 'warningIndicator';
    	title = obj.article_status_desc;
	}
   
    if (changeOMFlag) {
        if (obj.recv_om != '' && obj.recv_om != null)
            tot_units_recvd = Number(obj.recv_om || '') * Number(recvValue);
    }
    //17.06 Random Weight Article Total Units Display Changes
    if(obj.random_wt_flag !=  undefined  && obj.random_wt_flag == 'Y'){  
		//Defect_4554  Defect_12081 - Fix
    	if(isST(commonOrder.order_type) && ((obj.ordered_pi_qty||'') != '') && (obj.pi_uom||'')!=''){
			tot_ord_rand_wght_units = '<br> ('+ (obj.ordered_pi_qty||'') +' '+ obj.pi_uom +')';
			tot_recv_rand_wght_units = (((obj.received_pi_qty||'') != '')) ?
					'('+ Number(obj.received_pi_qty || '') +' '+ obj.pi_uom +')' : '('+ Number(obj.ordered_pi_qty || '') +' '+ obj.pi_uom +')';   
		}else{
			tot_ord_rand_wght_units = (obj.pi_om != '' && obj.order_qty != '' &&
					obj.pi_uom != '')?('<br> '+ randomWghtTotUnits(obj, Number(obj.order_qty), obj.order_uom)):''; 
			tot_recv_rand_wght_units = (obj.pi_om != '' && recvValue != '' && 
					obj.pi_uom != '')?(randomWghtTotUnits(obj, Number(recvValue), received_qty_uom)):'';    	
		}
		//Defect_4554 Defect_12081 - Fix
		//tot_ord_rand_wght_units = (obj.pi_om != '' && obj.order_qty != '' &&
			//		obj.pi_uom != '')?'<br> ('+ Number(obj.pi_om || '') * Number(obj.order_qty) +' '+ obj.pi_uom +')':''; 
		tot_units_dispatched =(obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined)?(/*Number(obj.dispatched_om||obj.om) * */Number(obj.dispathced_wgt).toFixed(3)/*)*/+" "+
    	        ((obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined&& obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:'')):'NA';
    	tot_dispt_rand_wght_units = (obj.pi_om != '' && obj.dispatched_qty != '' &&
    			obj.pi_uom != '')?('<br> '+ randomWghtTotUnits(obj, Number(obj.dispatched_qty), obj.dispatched_qty_uom)):'';    	
    	tot_units_recvd = (recvWtValue!=null && recvWtValue!=undefined)?(/*Number(obj.recv_om||obj.om) **/Number(recvWtValue).toFixed(3)+" "+
    	    	((recvWtValue!=null && recvWtValue!=undefined && obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:'')):'NA';
    	tot_units_order = (tot_units_order != null && tot_units_order != '' && tot_units_order.toString().indexOf('.') != -1)?tot_units_order.toFixed(3):tot_units_order;
    	obj.order_qty = (obj.order_qty != null && obj.order_qty != '' && obj.order_qty.toString().indexOf('.') != -1)?Number(obj.order_qty).toFixed(3):obj.order_qty;
		//Defect_4554
		//tot_recv_rand_wght_units = (obj.pi_om != '' && recvValue != '' && 
			//		obj.pi_uom != '')?'('+ Number(obj.pi_om || '') * Number(recvValue) +' '+ obj.pi_uom +')':'';    
	}
  //R18.01 - Meat Co - Weighted Article Receiving - Changes
	else if(obj.weight_flag !=  undefined  && obj.weight_flag == 'Y'){
		tot_units_order = (tot_units_order != null && tot_units_order != '' && tot_units_order.toString().indexOf('.') != -1)?tot_units_order.toFixed(3):tot_units_order;
		tot_units_dispatched = (obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined)?(Number(obj.dispathced_wgt).toFixed(3)+" "+
    	        ((obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined&& obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:'')):'NA';
		tot_units_recvd = (recvWtValue!=null && recvWtValue!=undefined)?(/*Number(obj.recv_om||obj.om) **/Number(recvWtValue).toFixed(3)+" "+
    	    	((recvWtValue!=null && recvWtValue!=undefined && obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:'')):'NA';
	}
    else{
    	tot_units_order = (tot_units_order != null && tot_units_order != '' && tot_units_order.toString().indexOf('.') != -1)?tot_units_order.toFixed(3):tot_units_order;    	
    	tot_units_recvd = (tot_units_recvd != null && tot_units_recvd != '' && tot_units_recvd.toString().indexOf('.') != -1)?tot_units_recvd.toFixed(3):tot_units_recvd;
    	tot_units_recvd = tot_units_recvd + ' '+ obj.tot_units_uom;
    }
    content += '<tr class="contentRowDet ' + rowClass + '" id="row-' +
        obj.article +
        '" class="rowHighlight"><td class="' + cellClass + '" title="' + title + '">' +
        obj.article       
        +'</td><td>' +
        (obj.vendor_ref_no) +
        '</td>' +
        '<td>' +
        obj.article_desc +
        '</td><td class="centerValue columnDivider">' +
        //( /*obj.random_wt_flag == 'Y' ? obj.pi_om :*/ obj.om) //for defect 2281
        //17.06 ZEA/ZKG OM Value changes
        ((obj.om != '' && obj.om != null && obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0))
        +
        ' ' +
        //4554 change
		obj.base_uom + (obj.random_wgt_flg=='Y' ? ('<br>' + (obj.pi_om||'') + ((obj.pi_uom||'')!='' ? (' ('+obj.pi_uom+')') : '')) : '') +
        '</td>' +
        '<td class="displayAttrFlag hideBlock">' +
        obj.display_article_flag   +    
        '</td>' + 
        '<td class="isComponentViewed hideBlock">N</td>' +         
        '<td class="displayAttrLineNo hideBlock">' +
        obj.article_line   +    
        '</td>' + '<td class="displayTempCheckFlag hideBlock">' +
        obj.temp_chk_flag  +    
        '</td>' +
        '<td class="centerValue">' +
        obj.order_qty +
        ' ' +
        obj.order_uom +
        '</td><td class="centerValue columnDivider"><strong>' +
        tot_units_order +
        ' ' +
        obj.tot_units_uom +
        tot_ord_rand_wght_units +
        '</strong></td><td class="centerValue ">' +
        //obj.dispatched_qty +     ' ' +      obj.dispatched_uom +
        ((obj.dispatched_qty!=null && obj.dispatched_qty!="")?obj.dispatched_qty+' '+obj.dispatched_qty_uom:'NA' )+
        '</td>' +
        '<td class="centerValue columnDivider"><strong>' +
        tot_units_dispatched +
        tot_dispt_rand_wght_units+
        '</strong></td><td id="receivedEdit-' +
        obj.article +
        '" class="centerValue" >'+
        recvTd;
   // var newOMDisabled = (obj.random_wt_flag == 'Y' || (obj.weighted_flag == 'Y' && received_qty_uom == 'KG') || obj.order_uom == 'EA' || obj.order_uom == 'KG' || obj.ranged_flag != undefined && obj.ranged_flag != 'Y' || (obj.om == '1')) ? 'readonly' : '';
if (isSTO($('#order_detail').data('contObj').hdrObj.order_type)){
        var newOMDisabled = 'readonly';
}else {
        var newOMDisabled = (obj.random_wt_flag == 'Y' || (obj.weighted_flag == 'Y' && received_qty_uom == 'KG') || obj.order_uom == 'EA' || obj.order_uom == 'KG' || obj.ranged_flag != undefined && obj.ranged_flag != 'Y' || (obj.om == '1')) ? 'readonly' : '';
}
    
    content += '</td><td class="recvTotUnits centerValue columnDivider"><strong>' + ((!receivedTotalDefault)?tot_units_recvd:"NA")+'<br>' +tot_recv_rand_wght_units+ '</strong></td>' +
        '<td id="packOMEdit-1" class="centerValue columnHide"><input type="text"  ' + newOMDisabled + '  '+(isSTO(obj.order_type) || (obj.random_wt_flag == 'Y' || (obj.weighted_flag == 'Y' && received_qty_uom == 'KG')) ? 'readonly' : '')+'  rece_om_org = "'+getEmptyIfNull(obj.recv_om)+'" om_org= "'+(obj.dispatched_om||obj.om)+'" value="'+(obj.recv_om!=null && obj.recv_om!=undefined && obj.recv_om.toString()!='' ? obj.recv_om : '')+'" class="packOM newOM4Decimal editNumCell numBox textbox textboxDefaultText"></td>';
    content += '<td id="expiryEdit-1" class="centerValue columnHide"><input type="#" ' + expireDateDisable + ' value="' +
        (obj.expiry_date1 != null && obj.expiry_date1 != '' ? formatDateMobi(obj.expiry_date1) : '') +
        '" placeholder="dd/mm/yyyy" exp_flag = "'+(obj.expiry_flag||'')+'" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
        '<label class="linkBtn"><a class="more moreLink" >+ more </a></label>' +
        '<span class="more moreExpDt hideBlock">';
    if(salesOrg==1060 && era_prof=="Y"){
    	if(SSCC_IdForNewRow!="" && (obj.sscc_carton_num=='' || obj.sscc_carton_num==undefined) ){
    		obj.sscc_carton_num=SSCC_IdForNewRow;
    		obj["sscc_carton_num"] = SSCC_IdForNewRow;
    	}
    	 content += '<input type="#" ' + expireDateDisable + ' exp_flag = "'+(obj.expiry_flag||'')+'" value="' +
         (obj.expiry_date2 != null && obj.expiry_date2 != '' ? formatDateMobi(obj.expiry_date2) : '') +
         '" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
         '<input type="#" ' + expireDateDisable + ' exp_flag = "'+(obj.expiry_flag||'')+'" value="' +
         (obj.expiry_date3 != null && obj.expiry_date3 != '' ? formatDateMobi(obj.expiry_date3) : '') +
         '" placeholder="dd/mm/yyyy" exp_flag = "'+(obj.expiry_flag||'')+'" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
         '<input type="#" ' + expireDateDisable + ' value="' +
         (obj.expiry_date4 != null && obj.expiry_date4 != '' ? formatDateMobi(obj.expiry_date4) : '') +
         '" exp_flag = "'+(obj.expiry_flag||'')+'" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
         '<input exp_flag = "'+(obj.expiry_flag||'')+'" type="#" ' + expireDateDisable + ' value="' +
         (obj.expiry_date5 != null && obj.expiry_date5 != '' ? formatDateMobi(obj.expiry_date5) : '') +
         '" exp_flag = "'+(obj.expiry_flag||'')+'" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell"></span>' +
         '</td><td class="displayAttrCartonNo hideBlock">' + obj.sscc_carton_num   +
         '</td>'
        if($('.reportRadio').find('input[type="radio"]:checked').val() != "RC"){
         content +='<td class="centerValue lastColumn lineByLine"><input value="'+obj.sscc_carton_num+'" onclick="checkGroup(this.value);" class="confirmCheck '+obj.sscc_carton_num+'" type="checkbox" ' + chkDisabled + '></td>'
        }
         content +='</tr>';

    	 SSCC_IdForNewRow='';
    }else{
    	 content += '<input type="#" ' + expireDateDisable + ' exp_flag = "'+(obj.expiry_flag||'')+'" value="' +
         (obj.expiry_date2 != null && obj.expiry_date2 != '' ? formatDateMobi(obj.expiry_date2) : '') +
         '" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
         '<input type="#" ' + expireDateDisable + ' exp_flag = "'+(obj.expiry_flag||'')+'" value="' +
         (obj.expiry_date3 != null && obj.expiry_date3 != '' ? formatDateMobi(obj.expiry_date3) : '') +
         '" placeholder="dd/mm/yyyy" exp_flag = "'+(obj.expiry_flag||'')+'" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
         '<input type="#" ' + expireDateDisable + ' value="' +
         (obj.expiry_date4 != null && obj.expiry_date4 != '' ? formatDateMobi(obj.expiry_date4) : '') +
         '" exp_flag = "'+(obj.expiry_flag||'')+'" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
         '<input exp_flag = "'+(obj.expiry_flag||'')+'" type="#" ' + expireDateDisable + ' value="' +
         (obj.expiry_date5 != null && obj.expiry_date5 != '' ? formatDateMobi(obj.expiry_date5) : '') +
         '" exp_flag = "'+(obj.expiry_flag||'')+'" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell"></span>' +
         '</td>'
         if($('.reportRadio').find('input[type="radio"]:checked').val() != "RC"){
         content += '<td class="centerValue lastColumn lineByLine"><input class="confirmCheck" type="checkbox"  value='+obj.article+' ' + chkDisabled + '></td>'
         }
         content +='</tr>';

    }
   
    return content;
}

// This method binds the events for the search and add module in receive
// articles step
function bindSearchAndAddEvents(area, urqFlag) {

    createAutoSuggest(area.find('#searchBox'));
    /*
     * area.find('input.orderQty').onlyNumbers(); if (obj != undefined) {
     * area.find('#supplier').val(obj.supplier_no + "-" + obj.supplier_name); }
     */
    if(salesOrg==1060 && era_prof=="Y"){
    	
    	area.find('#SSCCGroup .tableAddAction  .textbox.searchbox').each(function() {					
    		 createAutoSuggest($(this));
    	});
    	
        area.find('#closebtn').unbind('click');
        area.find('#closebtn').click(function() {
            area.find('#cartonAddAction').slideToggle(100);
        });
        
        area.find('#addCartonBtn').unbind('click');
        area.find('#addCartonBtn').click(function() {
            area.find('#cartonAddAction').slideToggle(100);
        });
        
        area.find('.searchAndAdd').unbind('click');
        /*area.find('.searchAndAdd').click(function() {
        	var cartonID= $(this).attr("carton_id");    	
            var toAddArea;
            
            	 if (urqFlag) {
                     toAddArea = area.find('#editArticleTable');
                 } else {
                     toAddArea = area.find('#recvArticleTable.'+cartonID);
                 }	
            	 
            	 var srArea = area.find('#searchBoxArea.'+cartonID);
                 //hideAllErrorMsg(srArea);
                 searchAndAdd(srArea, toAddArea, urqFlag);
            	 
            })*/;            
        }

   else
   {
	   createAutoSuggest(area.find('#searchBox'));
	   area.find('#addActionBtn').unbind('click');
		area.find('#addActionBtn').click(function() {
			area.find('#tableAddAction').slideToggle(100);
		});

		area.find('#closeLink').unbind('click');
		area.find('#closeLink').click(function() {
			area.find('#tableAddAction').slideToggle(100);
		});

		area.find('#searchAndAdd').unbind('click');
		area.find('#searchAndAdd').click(function() {
			var toAddArea;
			if(urqFlag){
				toAddArea = area.find('#editArticleTable');	
			} else {
				toAddArea = area.find('#recvArticleTable');
			}
			
			var srArea = area.find('#searchBoxArea');
			//hideAllErrorMsg(srArea);
			searchAndAdd(srArea, toAddArea, urqFlag);
		});  
   }
}

function searchAndAdd(srArea, toAddArea, urqFlag) {
    if (validateSearch(srArea, toAddArea)) {
        searchArticleForReceiveOrders(srArea, toAddArea, urqFlag);
    }
}

function validateSearch(srArea, toAddArea) {
    if (srArea.find('#searchBox').val().trim() == '') {
        showRecvErrorMsg('Please fill search text', 'Search and Add');
        return false;
    }
    return true;
}

function bindCartonAddBox(){
	area=$('.recvArticleStep');
	area.find('#addCartonRow').unbind('click');
	area.find('#addCartonRow').click(function() {
		var toAddArea;
		area=$('.recvArticleStep');
			toAddArea = area.find('#SSCCGroup');		
		
		var srArea = area.find('#CartonAddBox');
		//hideAllErrorMsg(srArea);
		SearchAndAddCarton(srArea, toAddArea);
		area.find('#cartonToAdd').val('');
	}); 	
}

function SearchAndAddCarton(srArea, toAddArea){
	if (validateCarton(srArea, toAddArea)) {
        addingCarton(srArea, toAddArea);
    }	
	
}

function validateCarton(srArea, toAddArea) {
    if (srArea.find('#cartonToAdd').val().trim() == '') {
        showRecvErrorMsg('Please fill carton number', ' SSCC Carton');
        return false;
    }
    return true;
}

function addingCarton(srArea, toAddArea){
	 var cartonNo = srArea.find('#cartonToAdd').val();	
	 if($('#SSCCGroup')
			    .find('tbody tr[data-tt-id='+cartonNo+']').length==1){
		 showRecvErrorMsg('Carton number Already exists', ' SSCC Carton'); 
	 }	    
        	else{
        		content = '<tr data-tt-id="' +cartonNo+ '" class="rowHighlight groupByExpand1"><td width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter">&nbsp;</span></td><td class="groupedBy rowSection rowHighlight" colspan="1"><strong>SSCC: '+cartonNo+ '</strong></td><td class="rowSection rowHighlight centerValue articleCount">0</td><td class="rowSection rowHighlight centerValue"><input class="cartonSelect confirmCheck" type="checkbox" onclick="checkGroupALL(this.id);"  id='+cartonNo+'></td><tr data-tt-id="' +cartonNo+ '_sub" data-tt-parent-id="' +cartonNo+ '"><td colspan="10" class="padright8" id="groupBy_' +cartonNo+ '"><span class="indenter" style="padding-left: 19px;"></span></td></tr>';
        		$('#SSCCGroup').find('tbody.mainTable').append(content);	        		
        		
       var addArticle=      '<div id="" class="lineByLine searchBoxArea">'+
                                  '<div class="tableActionsBtnsWrapper">'+
                                          '<div class="lookupActionWrapper">'+
                                               '<label class="linkBtn addRow addActionBtn" onclick="getAddArticle(this);" addcarton="">Add Missing Article</label>'+
                                               '&nbsp;'+									
                                           /*'<span style="float:right">'+
   	                                       '<input type="checkbox" id="changeOM" />'+'<label for="checkboxActive">Change order multiple and input expiry date</label>'+
                                           '</span>'+*/
                                        '<div class="errorDiv hideBlock" id="artErrorDiv" style="float:right">'+
   	                                       '<label id="errorMsg">No article found for '+'<strong>3234</strong>'+'. Please try a different number.</label>'+
   	                                       '<label class="closeMessage">&nbsp;</label>'+
                                        '</div>'+

                                       '</div> <!-- End of lookup action wrapper -->'+
                                      ' </div> <!-- End of table actions btn wrapper -->'+
                                   			 
			                       '<div class="tableActionsWrapper tableAddAction" id="">'+								
				                        '<div class="formWrapper">'+				
					                        '<div class="parameter">'+'<label class="" for="searchBox">Article</label>'+'<input type="#" class="textbox textboxDefaultText searchbox" placeholder="Type number, description, or EAN / TUN / PLU and press Enter" id="">'+
					                        '</div>'+							
                                            '<div class="parameter">'+'<label class="" for="qty">Received Qty.</label>'+'<input type="#" tabindex="2" id="qty" class="textbox numberBox">'+
                                            '</div>'+														
                	                        '<div class="formActions">'+'<label class="actionBtn searchAndAdd" onclick="getSearchAndAdd(this);" id="" carton_id="">'+'<a >Search & Add</a>'+'</label>'+'<label class="secondaryActionBtn closeLink " onclick="getCloseId(this);"  id="" Close_id=""><a >Close</a></label>'+						
				 	                        '</div>'+											
				                        '</div>'+		
		                           '</div> '+
	                         '</div>';	
       
       newCartonTable='<table cellspacing="0" class="ContentTable drilldownTable treetab treetable hideBlock recvArticleTable" id=""  style=" margin-top: 5px;" >'+
		'<thead> '+
		'<tr>'+
			'<th rowspan="2">Article # </th>'+
			'<th rowspan="2">Vendor Ref #</th>'+
			'<th rowspan="2">Description</th>	'+
			'<th class="centerValue columnDivider"  rowspan="2">OM</th>'+
			'<th class="centerValue columnDivider" colspan="2">Ordered </th>'+	
			'<th class="centerValue columnDivider" colspan="2">Dispatched </th>	'+
			'<th class="centerValue columnDivider" colspan="2">Received</th>'+
			'<th class="centerValue columnHide" width="70px" rowspan="2">New OM</th>'+
			'<th class="centerValue columnHide" width="70px" rowspan="2">Expiry Date</th>'+
			'<th class="lastColumn centerValue confirmCol lineByLine" width="80px" rowspan="2">Confirm<br>Received<br>(<span class="confirmed">0</span>/<span class="totConfirmed">0</span>)</th>'+
		'</tr>'+
		'<tr class="subHeader">'+
									
			'<th class="centerValue">Qty.</th>	'+					
			'<th class="centerValue columnDivider">Total Units</th>'+
			'<th class="centerValue">Qty.</th>'+						
			'<th class="centerValue columnDivider">Total Units</th>'+
			'<th class="centerValue">Qty.</th>'+						
			'<th class="centerValue columnDivider">Total Units</th>'+
		'</tr>'+
		
		'</thead>'+
		'<tbody>'+'</tbody>'+
    	   '</table>';			
        		area.find('table#SSCCGroup td#groupBy_'+cartonNo).append(addArticle);
        		area.find('table#SSCCGroup td#groupBy_'+cartonNo).append(newCartonTable);
        		area.find('td#groupBy_'+cartonNo+' .recvArticleTable').addClass('carton'+cartonNo);
        		var Newarea=$('td#groupBy_'+cartonNo);
        		Newarea.find('.searchBoxArea').addClass('carton'+cartonNo);
        		//area.find('#searchBoxArea #addActionBtn').addClass('add'+articleList[0].sscc_carton_num);
        		Newarea.find('.searchBoxArea .addActionBtn').attr('addcarton','carton'+cartonNo);
        		Newarea.find('.searchBoxArea .tableAddAction').addClass('carton'+cartonNo);
        		//$('#searchBoxArea #tableAddAction').attr('addcarton','carton'+articleList[0].sscc_carton_num);
        		Newarea.find('.searchBoxArea .searchAndAdd').attr('carton_id','carton'+cartonNo);
        		Newarea.find('.searchBoxArea .closeLink').attr('Close_id','carton'+cartonNo);
        		$('#SSCCGroup').find('#qty').within999();
        		$('#SSCCGroup').treetable('destroy');
        		$('#SSCCGroup').find('tbody td span.indenter').remove();
        		$('#SSCCGroup').treetable({expandable: true});
        	}
	 bindSearchAndAddEvents($('.recvArticleStep'), false);
	    
	 cartonCount=toAddArea.find('.mainTable td.articleCount').length;	
	 toAddArea.find('.CartonCount').html(cartonCount);
	 area.find('.articleHdr').html(
	            '<strong>List of cartons (' + (cartonCount) + ') </strong>');
}

// This method calls the article search mobilink service and passes inputs to
// order header service call
function searchArticleForReceiveOrders(srArea, toAddArea, urqFlag) {

    var searchTxt = srArea.find('#searchBox').val();
    var supplierNo = '';

    var articleNoFlag = "";
    var descFlag = "";
    var gtinFlag = "";
    var srcOfSupplyInd;
    // var supplierNo;
    var nodeLevel = "";
    var nodeId = "";

    // supplierNo = srArea.find('#supplier').val().split('-')[0];

    if (isNaN((searchTxt).split('-')[0]))
        descFlag = "Y";
    else if (!isNaN((searchTxt).split('-')[0]) &&
        (searchTxt).split('-')[0].length <= 7)
        articleNoFlag = "Y";
    else if (!isNaN((searchTxt).split('-')[0]) &&
        (searchTxt).split('-')[0].length > 7)
        gtinFlag = "Y";

    if (nodeLevel == undefined && nodeId == undefined) {
        nodeLevel = "";
        nodeId = "";
    }
    srcOfSupplyInd = "2";
    if (commonOrder.order_type == 'VENDOR') {
        supplierNo = getEmptyIfNull(commonOrder.supplier_no);
        srcOfSupplyInd = "1";
    }
    
    if(isST(commonOrder.order_type)){
    	srcOfSupplyInd = '';
    }
    if(isNaN((searchTxt).split('-')[0])){
          var createParam = {
				"iv_article"	: searchTxt,
				"iv_site"		: siteVal,
				"iv_sales_org"	: $("#salesOrg").val(),
				"iv_supplier"	:supplierNo,
				"iv_src_supply"	: srcOfSupplyInd,
				"iv_ranged"		: "Y",
				"iv_session_id"	: "",
				"iv_barcode"	: "",
				"iv_node_level"	: nodeLevel,
				"iv_node_id"	:  nodeId,
				"iv_desc"		:"Y",
				"iv_article_no"	: "N",
				"iv_gtin"		: gtinFlag,
				"iv_barcode_flag":"",
				"iv_auto_stockr_flag":"",
				"iv_style": "",
				"iv_colour": "",
				"iv_article_size": "",
				"iv_supplier":"",
				"iv_src_supply":""
		};
		url = articleHeaderBasicUrl;
		console.log(url + ' ' + JSON.stringify(createParam));  
                $.ajax({
			type: "post",
			url: url,
			data: JSON.stringify(createParam),
			success: function(response) {
				if(response.length > 0){
				var area = $('#dialog-selectArticle');
                                showRecvArticleSelectPopupDesc(area, response, srArea, toAddArea, urqFlag);
                                
				} else {
				
					$.fn.showCustomMsg(["Sorry , no results found for the search criteria. Please try again."],error);
					stopLoading();
				}
				stopLoading();
			},error : function() {
				showAllErrors([ mobiSerErrMsg ]);
				stopLoading();
			},
			});
            
            
    }else {
    var param = {
        "iv_desc": descFlag,
        "iv_article_no": articleNoFlag,
        "iv_gtin": gtinFlag,
        "iv_article": (searchTxt).split('-')[0],
        "iv_sales_org": $('#salesOrg').val(),
        "iv_supplier": supplierNo,
        "iv_src_supply": srcOfSupplyInd,
        "iv_ranged": "Y",
        "iv_session_id": "",
        "iv_barcode": "",
        "iv_site": siteVal,
        "iv_node_id": nodeId,
        "iv_node_level": nodeLevel,
        "iv_barcode_flag": "",
        "iv_uom_flag": "N",
        "iv_prime_vendor": "",
        "iv_auto_stockr_flag": "",
        "iv_delisted_flag": "N",
        "iv_deleted_flag": "N"
    };

    console.log(packBreakArticleSearch + ' ' + JSON.stringify(param));
    $.ajax({
        type: "post",
        url: packBreakArticleSearch,
        data: JSON.stringify(param),
        beforeSend: function() {
            startLoading();
        },
        success: function(response) {
            if (response.length == 1 && response[0].article != undefined) {
                if (urqFlag && addMissingArticleValidation(response[0]) ) {
                    addToArticleTable(response[0], srArea, toAddArea, urqFlag);
                } else if(addMissingArticleValidation(response[0])){
                    triggerOrderHeaderService(response[0], srArea, toAddArea);
                } 
            } else if (response.length > 1) {
                var area = $('#dialog-selectArticle');
                showRecvArticleSelectPopup(area, response, srArea, toAddArea, urqFlag);
            } else {
                showRecvErrorMsg('Cannot add article. Please check article or Supplier, then try again.', 'Search and Add');
                stopLoading();
            }
            stopLoading();
        },
        error: function() {
            showRecvErrorMsg('Sorry, Some technical issue occured', 'Search and Add');
            stopLoading();
        },
    });
    }
}

var addMissingArticleValidation = function(article){
    var valid = true;
    if(!jQuery.isEmptyObject(componentArtMap)){
    	for(key in componentArtMap){
    		if(componentArtMap[key] != ''){
    		var list = componentArtMap[key];
    		for(var i in list){
    		if(list[i].article == article.article){
    			valid = false;
    			} 
    		}
    	}
    	}
    	if(!valid){
    	   showRecvErrorMsg('Component Article already Exists. Cannot add in this order.', 'Search and Add');    		
            stopLoading();           
    	}
    }
    if(valid && recvItemInfo != '' && recvItemInfo.length >0 && article != ''){
    	for(var i in recvItemInfo){
    		if(recvItemInfo[i].article == article.article){
    			valid = false;
    		} 
    	}
    	if(!valid){
    		showRecvErrorMsg('Article already Exists. Cannot add in this order.', 'Search and Add');
            stopLoading();           
    	}
    }
    if(valid && (article.display_article_flag != undefined && article.display_article_flag == 'Y')){
        valid = false;
        showRecvErrorMsg('Add article function not allowed for Display/Prepack article types or linked components', 'Search and Add');
        stopLoading();    
    } 
    return valid;                
};
// This method calls order header mobilink service and decides whether to show
// confirmation popup or not
function triggerOrderHeaderService(item, srArea, toAddArea) {

    var confirmMsg = '';
    var param = getOrderHeaderParam(item);
    console.log(getTabResults + ' ' + JSON.stringify(param));
    startLoading();
    $
        .post(
            getTabResults,
            JSON.stringify(param),
            function(response) {
                if (response.length == 0 || (response.length == 1 && (response[0].order_no||'') == commonOrder.order_no)) {
                   recvItemInfo.push(new articleObjtoReceiveObj(item));
                    addToArticleTable(item, srArea, toAddArea, false);
                    resetSearchFields(srArea);
                } else {
                    if (response[0].order_no != undefined) {
                    	var text = '';
                    	response.forEach(function(item){
                    		if(commonOrder.order_no != item.order_no)
                    			text += text =='' ? getEmptyIfNull(item.order_no) : (', '+getEmptyIfNull(item.order_no)); 
                    	});
                        confirmMsg = 'Item ' +
                            getEmptyIfNull(item.article) +
                            ' exists in order no ' +
                            getEmptyIfNull(text) +
                            '. <br> Are you sure you want to add item to this order?';
                        showArticleAddConfirmation(confirmMsg, item,
                            srArea, toAddArea);
                    } else {
                    	
                        showInformationInOrderOnReceipt(['Sorry, Some technical issue occured.'], error, 'Add Missing Article.');
                    }
                }
                stopLoading();
            });
}

function showInformationInOrderOnReceipt(content, flag, title) {
    $.fn.showCustomMsg(content, flag, title);
}

function getOrderHeaderParam(item) {
    var param;
    var articleStr = getEmptyIfNull(item.article);
    var supplierNo = '';
    /*
     * var length = itemList.length;
     * 
     * if(length == 1){ articleStr = itemList[0].article; } else{ for(var i=0; i<
     * (length - 1); i++){ articleStr += itemList[i].article + ','; }
     * 
     * articleStr += itemList[length]; }
     */

    supplierNo = ($('#supplier') != undefined) ? $('#supplier').val()
        .split('-')[0] : '';

    param = {
        "iv_article": articleStr,
        "iv_order_no": "",
        "iv_delivery_from": "",
        "iv_delivery_to": "",
        "iv_order_type": "",
        "iv_order_status": "",
        "iv_node_id": "",
        "iv_node_lvl": "",
        "iv_srs_ind": "",
        "iv_supplier_no": supplierNo,
        "iv_session_id": "",
        "iv_site": "",
        "iv_sales_org": $('#salesOrg').val(),
        "iv_check_alloc": "",
        "iv_alloc_flag": "N",
        "iv_tab_code": "",
    };

    return param;
}

// This method adds the article searched by the user
function addToArticleTable(item, srArea, toAddArea, urqFlag) {
    var $tblArea = toAddArea;
    var changeOMFlag = srArea.find('#changeOM').is(':checked');
    var tempTr = '';
    var totVal = 0;
    var qty = srArea.find('#qty').val();
    if (qty != undefined && qty != null && qty != '') {
        item.received_qty = qty;
    }
    if ($tblArea.find('tbody').find('tr[id="row-' + item.article + '"]').length >= 1) {
        if (qty != undefined && qty != null && qty != '') {
            $tblArea.find('tbody').find('tr[id="row-' + item.article + '"]')
                .find('.recvTextBox').val(qty);
        }
        tempTr = $tblArea.find('tbody').find(
            'tr[id="row-' + item.article + '"]').detach();
        $tblArea.find('tbody').append($(tempTr).data('obj', item));
		 updateReceivedTotalUnits($tblArea, tempTr);//bindReceiveQtyEvent($tblArea, true);
    } else {
        (urqFlag) ? (tempTr = getRowContentForEditPage(item)) : (tempTr = getRowContent(new articleObjtoReceiveObj(item), changeOMFlag));
        if (qty != undefined && qty != null && qty != '') {
            $tblArea.find('tbody').find('tr[id="row-' + item.article + '"]')
                .find('.recvTextBox').val(qty);
        }
        if(salesOrg==1060 && era_prof=="Y"){
        	 $tblArea.find('tbody').append(
        	            $(tempTr).data('obj', item).addClass('rowHighlight'));	
        	 totVal = Number($tblArea.find('tbody tr .confirmCheck').length);
 	        $tblArea.find('.confirmCol .totConfirmed').text(totVal); 
 	       checkGroup(SSCC_CartonIdForNewRow);
 	        TotalCartonsChecked();
        }else{
        	  $tblArea.find('tbody').append(
        	            $(tempTr).data('obj', item).addClass('rowHighlight'));
        	        totVal = Number($tblArea.find('.confirmCol .totConfirmed').text());
        	        $tblArea.find('.confirmCol .totConfirmed').text(totVal + 1); 	
        }
      
        //Need to put the fix here for defect no 2145
        if (!changeOMFlag)
            $tblArea.find('.columnHide').hide();

        //$tblArea.find('tbody').find('tr[id="row-' + item.article + '"]').find('.recvTextBox').within999(); //defect_8850
        $tblArea.find('tbody').find('tr[id="row-' + item.article + '"]').find('.wtTextBox').isWithin999Or3Decimal();
        $tblArea.find('tbody').find('tr[id="row-' + item.article + '"]').find('.packOM').isWithinOnly3Decimal();
        bindConfirmCheckBoxEvent($tblArea, true);
        bindReceiveQtyEvent($tblArea, true);
        if(salesOrg==1060 && era_prof=="Y"){
        articlesCountInNewCarton();}
    }

    initializeDatePicker();
}

// This method shows the confirmation popup after order header service
function showArticleAddConfirmation(msg, item, srArea, toAddArea) {
    try {
        $("#dialog-recvConfirmation").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            minHeight: 100,
            maxHeight: 600,
            width: 350
        });

        $("#dialog-recvConfirmation").parent().addClass("popupWrapper");

        $('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#acceptbtn, #rejectbtn')
            .addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#continue')
            .removeClass("hideBlock");
        // $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
        $("#dialog-recvConfirmation").dialog("open");
        $("#dialog-recvConfirmation").find('#message').html(msg);
        $("#dialog-recvConfirmation").parent().find('.ui-dialog-title').text(
            'Confirmation');
        $("#dialog-recvConfirmation").find('#continue').unbind('click');
        $("#dialog-recvConfirmation").find('#continue').click(function() {
            $("#dialog-recvConfirmation").dialog("close");

            addToArticleTable(item, srArea, toAddArea, false);
            resetSearchFields(srArea);

        });
        $("#dialog-recvConfirmation").find('#cancel').removeClass('hideBlock');
        $("#dialog-recvConfirmation").find('#cancel').unbind('click');
        $("#dialog-recvConfirmation").find('#cancel').click(function() {
            $("#dialog-recvConfirmation").dialog("close");
        });
    } catch (err) {
        showArticleAddConfirmation(msg, item, srArea, toAddArea);
    }
}

// Popup to show the search results for the article description search
function showRecvArticleSelectPopup(area, response, srArea, toAddArea, urqFlag) {
    area.find('#popupDataDivItem').html(formMultipleArticlesContent(response));
    if (area.find('#popupDataDivItem').find('#sizeCheck').val() == 0) {
        // showAlert('Invalid Supplier.', 'supplier');
    } else if (area.find('#popupDataDivItem').find('#sizeCheck').val() > 1) {
        if (!$("#dialog-selectArticle").dialog("isOpen")) {
            // area.find('#vendorDesc').val($('#supplier').val());
            $("#dialog-selectArticle").parent().addClass("popupWrapper");
            $("#dialog-selectArticle").removeClass('hideBlock').dialog("open");
            area.find('#popupDataDivItem').find('.tableTitle').removeClass(
                'hideBlock');
            area.find('#popupDataDivItem').find('.titleCount').text(
                response.length);
            area.find('#popupDataDivItem').find('.searchString').text(
                'the selected criteria');
            // $("#searchWarning").addClass('hideBlock');
            // $("#popupSearch").removeClass('hideBlock');
            bindPopUpEventsForSelectArticle(area, response, srArea, toAddArea, urqFlag);
        }
    } else {
        triggerOrderHeaderService(response[0], srArea, toAddArea);
    }
}

function showRecvArticleSelectPopupDesc(area, response, srArea, toAddArea, urqFlag) {
    area.find('#popupDataDivItem').html(formMultipleArticlesContentDesc(response));
    if (area.find('#popupDataDivItem').find('#sizeCheck').val() == 0) {
    } else if (area.find('#popupDataDivItem').find('#sizeCheck').val() >= 1) {
        if (!$("#dialog-selectArticle").dialog("isOpen")) {
            $("#dialog-selectArticle").parent().addClass("popupWrapper");
            $("#dialog-selectArticle").removeClass('hideBlock').dialog("open");
            area.find('#popupDataDivItem').find('.tableTitle').removeClass(
                'hideBlock');
            area.find('#popupDataDivItem').find('.titleCount').text(
                response.length);
            area.find('#popupDataDivItem').find('.searchString').text(
                'the selected criteria');
            bindPopUpEventsForSelectArticleDesc(area, response, srArea, toAddArea, urqFlag);
        }
    } /*else {
        triggerOrderHeaderService(response[0], srArea, toAddArea);
    }*/
}

function formMultipleArticlesContent(list) {
    var content = '';
    var rowContent = '';
    content += '<div class="tableInfo"><div class="tableTitle hideBlock"><h4 class="countTitle">' +
        'Total <strong class="titleCount">526</strong> results found for ' +
        '<strong class="searchString"> apple </strong></h4><h4 class="popupError"></h4></div></div>';

    content += '<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0">' +
        '<tr><th>Article</th><th>Description</th><th>UOM</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
    if (list != null && list != undefined && list.length > 0) {
        for (var i = 0; i < list.length; i++) {

            rowContent += '<tr><td>' +
                list[i].article +
                '</td><td>' +
                list[i].article_desc +
                '</td><td>' +
                list[i].article_uom +
                '</td><td class="sorted lastColumn"><label class="linkBtn selectInArticle" id="' +
                i +
                '"><label class="selectItem">Select</label></label></td></tr>';

        }
    }
    content += rowContent + '</table></div><input type="hidden" value="' +
        list.length + '" id="sizeCheck" />';
    return content;
}
function formMultipleArticlesContentDesc(list) {
    var content = '';
    var rowContent = '';
    content += '<div class="tableInfo"><div class="tableTitle hideBlock"><h4 class="countTitle">' +
        'Total <strong class="titleCount">526</strong> results found for ' +
        '<strong class="searchString"> apple </strong></h4><h4 class="popupError"></h4></div></div>';

    content += '<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0">' +
        '<tr><th>Article</th><th>Description</th><th>UOM</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
    if (list != null && list != undefined && list.length > 0) {
        for (var i = 0; i < list.length; i++) {

            rowContent += '<tr><td>' +
                list[i].article_no +
                '</td><td>' +
                list[i].article_desc +
                '</td><td>' +
                list[i].article_uom +
                '</td><td class="sorted lastColumn"><label class="linkBtn selectInArticle" id="' +
                i +
                '"><label class="selectItem">Select</label></label></td></tr>';

        }
    }
    content += rowContent + '</table></div><input type="hidden" value="' +
        list.length + '" id="sizeCheck" />';
    return content;
}


function bindPopUpEventsForSelectArticle(pr, list, srArea, toAddArea, urqFlag) {

    $(".selectInArticle").click(function() {
        var id = $(this).attr("id");
        if ($("#dialog-selectArticle").dialog("isOpen"))
            $("#dialog-selectArticle").dialog("close");
        if (urqFlag) {
            addToArticleTable(list[id], srArea, toAddArea, urqFlag);
        } else {
            triggerOrderHeaderService(list[id], srArea, toAddArea);
        }
    });
}
function bindPopUpEventsForSelectArticleDesc(pr, list, srArea, toAddArea, urqFlag) {

    $(".selectInArticle").click(function() {
        var id = $(this).attr("id");
        if ($("#dialog-selectArticle").dialog("isOpen"))
            $("#dialog-selectArticle").dialog("close");
    
    var supplierNo = '';

    var articleNoFlag = "";
    var descFlag = "";
    var gtinFlag = "";
    var srcOfSupplyInd;
    var nodeLevel = "";
    var nodeId = "";

    if (isNaN(list[id].article_no))
        descFlag = "Y";
    else if (!isNaN(list[id].article_no) &&
        (list[id].article_no).length <= 7)
        articleNoFlag = "Y";
    else if (!isNaN(list[id].article_no) &&
        (list[id].article_no).length > 7)
        gtinFlag = "Y";
    if (nodeLevel == undefined && nodeId == undefined) {
        nodeLevel = "";
        nodeId = "";
    }
    srcOfSupplyInd = "2";
    if (commonOrder.order_type == 'VENDOR') {
        supplierNo = getEmptyIfNull(commonOrder.supplier_no);
        srcOfSupplyInd = "1";
    }
    if(isST(commonOrder.order_type)){
    	srcOfSupplyInd = '';
    }
    
     var param = {
        "iv_desc": descFlag,
        "iv_article_no": articleNoFlag,
        "iv_gtin": gtinFlag,
        "iv_article": list[id].article_no,
        "iv_sales_org": $('#salesOrg').val(),
        "iv_supplier": supplierNo,
        "iv_src_supply": srcOfSupplyInd,
        "iv_ranged": "Y",
        "iv_session_id": "",
        "iv_barcode": "",
        "iv_site": siteVal,
        "iv_node_id": nodeId,
        "iv_node_level": nodeLevel,
        "iv_barcode_flag": "",
        "iv_uom_flag": "N",
        "iv_prime_vendor": "",
        "iv_auto_stockr_flag": "",
        "iv_delisted_flag": "N",
        "iv_deleted_flag": "N"
    };
        var url = packBreakArticleSearch;
    console.log(url + ' ' + JSON.stringify(param));
    $.ajax({
        type: "post",
        url: packBreakArticleSearch,
        data: JSON.stringify(param),
        beforeSend: function() {
            startLoading();
        },
        success: function(response) {
            if (response.length > 0 && response[0].article != undefined) {
                if (urqFlag && addMissingArticleValidation(response[0])) {
                    addToArticleTable(response[0], srArea, toAddArea, urqFlag);
                } else if(addMissingArticleValidation(response[0])) {
                    triggerOrderHeaderService(response[0], srArea, toAddArea);
                }
            } else {
                showRecvErrorMsg('Article not linked to vendor.', 'Search and Add');
                stopLoading();
            }
            stopLoading();
        },
        error: function() {
            showRecvErrorMsg('Sorry, Some technical issue occured', 'Search and Add');
            stopLoading();
        },
    });
    
/*        if (urqFlag) {
            addToArticleTable(list[id], srArea, toAddArea, urqFlag);
        } else {
            triggerOrderHeaderService(list[id], srArea, toAddArea);
        }       */
    });
}

function resetSearchFields(srArea) {
    srArea.find('input:visible').each(function() {
        if (!$(this).hasClass('disabled'))
            $(this).val('');
    });
}

function formDiscrepancyContent() {
    discTblArea = $('#discrepancyTable');
    var item = '';
    var diff = '';
    var diffClass = '';
    var rowContent = '';
    discCount = 0;
    var tot_units_order = 0;
    var tot_units_dispatched = 'NA';
    var tot_units_received = 0;
    var recvQty = '';
    var orderMultiple = 0;
    var reason = '';
	var dataStore=[];
         if(salesOrg==1060 && era_prof=="Y"){
		 $('#SSCCGroupForDescripencies').treetable('destroy');
            area= $('#step-3');
        	area.find('#SSCCGroupForDescripencies tbody').html('');
                var SSCCcartonIdGroupingMap={};
        	    $('.recvArticleTable').find('tbody tr').each(function() {
        	          if($(this).find('.confirmCheck').prop("checked") == true){					
		          if(SSCCcartonIdGroupingMap[$(this).find('.confirmCheck').val()] == undefined)
            		  {
            		  var newArray = [];
            		  newArray.push($(this));
            		  SSCCcartonIdGroupingMap[$(this).find('.confirmCheck').val()] = newArray;
            		  }
                      else
            		  {
            		  var existingArray = [];
            		  existingArray = SSCCcartonIdGroupingMap[$(this).find('.confirmCheck').val()];
            		  existingArray.push($(this));
            		  SSCCcartonIdGroupingMap[$(this).find('.confirmCheck').val()] = existingArray;
            		  }
			}
        	        });
                        if(SSCCcartonIdGroupingMap != ''){
			area=$('.receiveDiv');
				area.find('#SSCCGroupForDescripencies thead').empty();
				area.find('#SSCCGroupForDescripencies').removeClass('hideBlock');								
				headerCont='<tr colspan=12 class="collapsed"><th width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter expandAll" style="padding-left: 0px;"><a href="#" title="Expand">&nbsp;</a></span></th><th col width="300">'+"SSCC id"+'</th><th col width="300">'+"No. Of Articles"+'</th><th col width="300">'+"Confirm Articles"+'</th></tr>'
				area.find('#SSCCGroupForDescripencies thead').append(headerCont);
                        }                                
		
			for (var vendor in SSCCcartonIdGroupingMap) {				
			var articleList = SSCCcartonIdGroupingMap[vendor];			
			contnt = '<tr data-tt-id="' +vendor+ '" class="rowHighlight groupByExpand1"><td width="25px" colspan="1" class="expandTd expander rowSection rowHighlight"><span class="indenter">&nbsp;</span></td><td class="groupedBy rowSection rowHighlight" colspan="1"><strong>sscc: '+vendor+ '</strong></td><td class="rowSection rowHighlight articleCount"></td><td class="rowSection rowHighlight"><input class="confirmCheck " type="checkbox" onclick="checkGroupALL2(this.id);"  id="discp'+vendor+'"></td><tr data-tt-id="' +vendor+ '_sub" data-tt-parent-id="' +vendor+ '"><td colspan="10" class="padright8" id="groupBy_discp' +vendor+ '"><span class="indenter" style="padding-left: 19px;"></span></td></tr>';
			 area.find('#SSCCGroupForDescripencies').append(contnt);
			 area.find('#SSCCGroupForDescripencies').show();
                            area.find('#groupBy_discp'+vendor).append(discrepenciesHdr);	
                            //var discrepAddArea= area.find('#SSCCGroupForDescripencies #groupBy_discp'+vendor+' tbody');
                            //discTblArea = area.find('#SSCCGroupForDescripencies #groupBy_discp'+vendor+' tbody');
                            discTblArea = area.find('#SSCCGroupForDescripencies #groupBy_discp'+vendor);
                            discTblArea.find('tbody').html('');
                            discTblArea.removeClass('hideBlock');
			for (var i in articleList) {
			rowContent='';
                        item=articleList[i].data('obj');
                        if(item.display_article_flag != "Y"){
                         formDiscByDiff(true,area,articleList[i], diff,diffClass,rowContent, tot_units_order,tot_units_dispatched,
                        tot_units_received,recvQty,orderMultiple,reason,dataStore); 
                        discTblArea.find('.confirmCheck').addClass('discp'+vendor);
                        discTblArea.find('.confirmCheck').attr('value' , 'discp'+vendor);
                        discTblArea.find('.confirmCheck').attr('onclick' , 'checkGroup2("discp'+vendor+'")');
                        } 
            }            
            if(componentArtMap != ''){
            for(key in componentArtMap){
                   var list = componentArtMap[key];
                   if(list != '' && list != undefined && key != null && key != "" && key.split('_')[1] != null &&
                		   key.split('_')[1] == vendor)
                   for(var i=0; i<list.length; i++){
                        formDiscByDiff(false,area,list[i], diff,diffClass,rowContent, tot_units_order,tot_units_dispatched,
                        tot_units_received,recvQty,orderMultiple,reason,dataStore);
                        discTblArea.find('.confirmCheck').addClass('discp'+vendor);
                        discTblArea.find('.confirmCheck').attr('value' , 'discp'+vendor);
                        discTblArea.find('.confirmCheck').attr('onclick' , 'checkGroup2("discp'+vendor+'")');
                   }
                }   
                }
                if($('.discrepancyTable').has('hideBlock') && $('.discrepancyTable tbody tr').length >0){
            	   $('.discrepancyTable').remove('hideBlock');
               }
                if(area.find('#SSCCGroupForDescripencies #groupBy_discp'+vendor+' tbody tr').length<1){
                discrepArea=area.find('#SSCCGroupForDescripencies tbody')
                discrepArea.find('[data-tt-id='+vendor+']').remove();
                discrepArea.find('[data-tt-id='+vendor+'_sub]').remove();
                }             	
                if (area.find('#SSCCGroupForDescripencies tbody tr').length > 0) {
                        var discpArea=$('#SSCCGroupForDescripencies #groupBy_discp'+vendor);
                        var articlesNo_SSCC = Number(discpArea.find('tbody tr .confirmCheck').length);	        			        		
                        discpArea.find('.confirmCol').html(
                        'Confirm<br>Received<br>(<span class="DiscpConfirmed">0</span>/<span class="totDiscp">'+articlesNo_SSCC+'</span>)');
                        articlesNo=$('#SSCCGroupForDescripencies td#groupBy_discp'+vendor+' tbody tr').length;
                        $('#SSCCGroupForDescripencies tr[data-tt-id='+vendor+'] .articleCount').html(articlesNo);				
                //bindConfirmCheckBoxEvent(area, false);
                bindConfirmCheckBoxEvent(discTblArea, false);
                discpCartonCount= $('#SSCCGroupForDescripencies').find('tbody td.articleCount').length;	
                 $('#discrepancyHdr').html(
                            '<strong>Discrepancies (' + discCount/*discpCartonCount*/ + ')</strong>');
                }                
        }
        if (area.find('#SSCCGroupForDescripencies tbody tr').length > 0) {
                        $('#SSCCGroupForDescripencies')
                .treetable({
                        expandable: true
                });
                }else {
                discTblArea = '';
                $('#SSCCGroupForDescripencies').treetable('destroy');
                area= area = $('#step-3');
        	area.find('#SSCCGroupForDescripencies tbody').html('');
                $('#nextbtn').trigger('click');
                }  
   }			
   else  
   {  
    discTblArea = $('#discrepancyTable');  
	discTblArea.find('tbody').html('');
	discTblArea.removeClass('hideBlock');
        //componentArtMap
    var area =   $('#recvArticleTable').find('tbody tr');      
	area.each(function() {
		if($(this) != '' && $(this).find('.confirmCheck') != '' &&
				!$(this).find('.confirmCheck').is(':disabled')){
                formDiscByDiff(true,area,$(this), diff,diffClass,rowContent, tot_units_order,tot_units_dispatched,
                tot_units_received,recvQty,orderMultiple,reason,dataStore);
		}
        });
        if(componentArtMap != ''){
           for(key in componentArtMap){
                   var list = componentArtMap[key];
                   if(list != '' && list != undefined)
                   for(var i=0; i<list.length; i++){
                         formDiscByDiff(false,area,list[i], diff,diffClass,rowContent, tot_units_order,tot_units_dispatched,
                        tot_units_received,recvQty,orderMultiple,reason,dataStore);
                   }
           }   
        }
    if (discTblArea.find('tbody tr').length > 0) {
        discTblArea.find('.confirmCol').html(
            'Confirm<br>Discrepancies<br>(<span class="confirmed">0</span>/' +
            discCount + ')');
        $('#discrepancyHdr').html(
            '<strong>Discrepancies (' + discCount + ')</strong>');
        bindConfirmCheckBoxEvent(discTblArea, false);        
        console.log(recvMethod);
    } else {
    	discTblArea = '';
        $('#nextbtn').trigger('click');
    }

}
}
function formDiscByDiff(other, area,currentItem, diff,diffClass,rowContent, tot_units_order,tot_units_dispatched,
tot_units_received,recvQty,orderMultiple,reason,dataStore){
         //var discTblArea = $('#discrepancyTable');  
        //$(this) = currentItem;
        var item = '';
        var recvWtValue = '';
                item = (other)?currentItem.data('obj'):currentItem;
                if (other && currentItem.find('.packOM').is(':visible') &&
                    currentItem.find('.packOM') != undefined && $.trim(currentItem.find('.packOM').val()) != '') {
                    orderMultiple = Number(currentItem.find('.packOM').val());
                    reason = 'Pack Size Difference';
                } else {
                    //	if(item.random_wt_flag != 'Y')
                    //orderMultiple = item.om;
                    orderMultiple = (item.dispatched_om || item.om);           
                    /*else
                    orderMultiple = item.pi_om;	*/ //for defect 2281

                    reason = 'Quantity Difference';
                }
                //Defect_12753 - Fix
                if(other){
                recvQty = getEmptyIfNull(currentItem.find('.recvTextBox').val());
                recvWtValue = (getEmptyIfNull(currentItem.find('.wtTextBoxFix').val()) 
                		|| getEmptyIfNull(item.dispathced_wgt) || getEmptyIfNull(item.ordered_wgt));
                recvQty = (currentItem.find('.recvTextBox').hasClass('hideBlock'))?recvWtValue:recvQty;
                }
                else
                recvQty = getEmptyIfNull(item.qty);

                if (recvQty == '') {
                    recvQty = ($.trim(item.dispatched_qty) != '') ? item.dispatched_qty : item.order_qty;
                }
                if (item.order_qty != null && item.order_qty != undefined && item.order_qty != '' && item.order_qty != 0)
                    tot_units_order = Number(item.om) *
                    getOneIfEmpty(Number(item.order_qty)); // Qty calculation was wrong
                else
                    tot_units_order = 0;
                if (item.ranged_flag != 'Y' && other) {
                    reason = 'Not Ranged';
                    recvQty = Number(currentItem.find('.notRangedRecvField').html()|| ''); 
                }
                if(Number(recvQty||'') == 0){
                	recvWtValue = 0;
                }
                //4554 change R18.01 - Meat Co - Weighted Article Receiving - Changes
                tot_units_received = ((item.random_wgt_flg == 'Y' && (item.dispatched_qty_uom||item.dispatched_uom||item.order_uom) == item.base_uom)
                && isST(commonOrder.order_type)|| item.weight_flag == 'Y') ? recvWtValue : getOneIfEmpty(orderMultiple) * Number(recvQty);
                if(item.dispatched_qty!=null && item.dispatched_qty!=undefined && item.dispatched_qty!=''){
                	if (item.dispatched_qty != null && item.dispatched_qty != undefined && item.dispatched_qty != '' && item.dispatched_qty != 0)
                    	tot_units_dispatched = Number(item.dispatched_om) * getOneIfEmpty(Number(item.dispatched_qty)); // Qty calculation was wrong
                    else
                    	tot_units_dispatched = 0;
                    //R18.01 - Meat Co - Weighted Article Receiving - Changes
                	if(item.weight_flag == 'Y'){
                		tot_units_dispatched = (item.dispathced_wgt != null &&	item.dispathced_wgt !=  ""
                			&& item.dispathced_wgt)?Number(item.dispathced_wgt).toFixed(3):item.dispathced_wgt;
                	}
            		diff = tot_units_dispatched - tot_units_received;
                }else{
                	tot_units_dispatched = 'NA';
                	diff = tot_units_order - tot_units_received;
                }
                

                if (diff != 0){ 
                   addDiscrepencyTable( diffClass,diff, rowContent, item, tot_units_order, 
                    tot_units_dispatched, recvQty, tot_units_received, diffClass, reason, false,recvWtValue);
                 }
                                    
}

/*function bindReceiveQtyEntr(){
$('.dispatchQtyEntr').isNumberOrDecimal();
	
	 $('.dispatchQtyEntr').on('keypress', function(e) {
		var k = String.fromCharCode(e.charCode);
	       var v = this.value;
	       var dp = v.indexOf('.');
	       if (dp >= 0 && v.length > dp + 3) {
	           return false;
	       }
	}); 
	
}*/
function addDiscrepencyTable(diffClass,diff, rowContent, item, tot_units_order, 
                    tot_units_dispatched, recvQty, tot_units_received, diffClass, reason, isDisplay, recvWtValue){	
		var tot_units_uom = getEmptyIfNull(item.base_uom);
		var tot_ord_rand_wght_units = '';
		var tot_recv_rand_wght_units ='';
		var tot_dispt_rand_wght_units = '';
		//17.06 Random Weight Article Total Units Display Changes
	    //R18.01 - Meat Co - Weighted Article Receiving - Changes
	    if((item.random_wt_flag !=  undefined  && item.random_wt_flag == 'Y') || item.weight_flag == 'Y'){
	    	if(recvWtValue ==  undefined ||  recvWtValue ==  ''){
	    	if (item.rnd_wgt!=null && item.rnd_wgt!=undefined && item.rnd_wgt.toString()!='') {
				recvWtValue = item.rnd_wgt;
			} else if(item.dispathced_wgt!=null && item.dispathced_wgt!=undefined && item.dispathced_wgt.toString()!=''){
				recvWtValue = item.dispathced_wgt;
			} else if(item.ordered_wgt!=null && item.ordered_wgt!=undefined && item.ordered_wgt.toString()!=''){
				recvWtValue = item.ordered_wgt;
			}
	    	recvWtValue = (recvWtValue != '0' && (recvWtValue||'').toString().indexOf('.') != "-1")?
					Number(recvWtValue).toFixed(3):(recvWtValue == ''?'0':recvWtValue);
			}
	    	if(recvQty == 0){
				recvWtValue = 0;
			}
	    	//Defect_4554	 Defect_12081 - Fix
			if(isST(commonOrder.order_type) && (item.dispatched_qty_uom||item.dispatched_uom||item.order_uom) == item.base_uom){
				if(((item.ordered_pi_qty||'') != '') && (item.pi_uom||'') != '')
					tot_ord_rand_wght_units = '<br> ('+ (item.ordered_pi_qty||'') +' '+ item.pi_uom +')';
				else
					tot_ord_rand_wght_units = '<br> ('+ (item.order_qty||'') +' '+ item.pi_uom +')';
					
				tot_recv_rand_wght_units ='('+ Number(recvQty|| '') +' '+ item.pi_uom +')';   
			}else{
				tot_ord_rand_wght_units = (item.pi_om != '' && item.order_qty != '' &&
	    			item.pi_uom != '')?('<br> '+randomWghtTotUnits(item, Number(item.order_qty), item.order_uom)):'';  
				tot_recv_rand_wght_units = (item.pi_om != '' && recvQty != '' && 
	    			item.pi_uom != '')?(randomWghtTotUnits(item, Number(recvQty), item.received_qty_uom)):'';   	
			}
			//Defect_4554 Defect_12081 - Fix //R18.01 - Meat Co - Weighted Article Receiving - Changes
	    	//tot_ord_rand_wght_units = (item.pi_om != '' && item.order_qty != '' &&
	    		//	item.pi_uom != '')?'<br> ('+ Number(item.pi_om || '') * Number(item.order_qty) +' '+ item.pi_uom +')':'';    	
			item.dispathced_wgt = (item.dispathced_wgt != '0' && (item.dispathced_wgt||'').toString().indexOf('.') != "-1")?
					Number(item.dispathced_wgt).toFixed(3):(item.dispathced_wgt == ''?'0':item.dispathced_wgt);
			tot_units_dispatched =(item.dispathced_wgt!=null && item.dispathced_wgt!=undefined)?(/*Number(obj.dispatched_om||obj.om) * */Number(item.dispathced_wgt)/*)*/+" "+
	    	        ((item.dispathced_wgt!=null && item.dispathced_wgt!=undefined&& tot_units_uom!=null && tot_units_uom!="")? tot_units_uom:'')):'NA';
	    	tot_dispt_rand_wght_units = (item.pi_om != '' && item.dispatched_qty != '' &&
	    			item.pi_uom != '')?('<br> '+randomWghtTotUnits(item, Number(item.dispatched_qty), item.dispatched_qty_uom)):'';    	
	    	tot_units_received = (recvWtValue!=null && recvWtValue!=undefined)?(/*Number(obj.recv_om||obj.om) **/Number(recvWtValue)+" "+
	    	    	((recvWtValue!=null && recvWtValue!=undefined && tot_units_uom!=null && tot_units_uom!="")? tot_units_uom:'')):'NA';
	    	//Defect_4554 //R18.01 - Meat Co - Weighted Article Receiving - Changes
			//tot_recv_rand_wght_units = (item.pi_om != '' && recvQty != '' && 
	    		//	item.pi_uom != '')?'('+ Number(item.pi_om || '') * Number(recvQty) +' '+ item.pi_uom +')':'';    	
	    	if(item.weight_flag == 'Y'){
	    		tot_ord_rand_wght_units = '';
	    		tot_recv_rand_wght_units = '';
	    		tot_dispt_rand_wght_units = '';
	    	}
	    }
	    else{
	    	diff = (diff != null && diff != '' && diff.toString().indexOf('.') != -1)?diff.toFixed(3):diff;
	    	tot_units_order = (tot_units_order != null && tot_units_order != '' && tot_units_order.toString().indexOf('.') != -1)?tot_units_order.toFixed(3):tot_units_order;
	    	tot_units_dispatched = (tot_units_dispatched != null && tot_units_dispatched != '' && tot_units_dispatched.toString().indexOf('.') != -1)?tot_units_dispatched.toFixed(3):tot_units_dispatched;
	    	tot_units_received = (tot_units_received != null && tot_units_received != '' && tot_units_received.toString().indexOf('.') != -1)?tot_units_received.toFixed(3):tot_units_received;
	    	tot_units_dispatched = ((tot_units_dispatched!=null && tot_units_dispatched!="" 
	    		&& tot_units_dispatched != 'NA')?tot_units_dispatched+' '+tot_units_uom:'NA' ) ;
	    	tot_units_received = tot_units_received+' '+tot_units_uom; 		
	    }
        diffClass = (diff < 0) ? 'valueUp' : 'valueDown'; // for defect no 2236
                    rowContent = '<tr><td>' +
                        item.article + 
                        '</td><td>' +
                        (item.vendor_ref_no ||"") +
                        '</td>' +
                        '<td>' +
                        item.article_desc +
                        '</td><td class="centerValue ">' +
                        //(item.order_qty||'NA') +
                        ((item.order_qty!=null && item.order_qty!="")?item.order_qty+' '+item.order_uom:'NA' )+                       
                        '</td>' +
                        '<td class="centerValue  ">' +
                        //tot_units_order +
                        tot_units_order +
                        ' ' +
                        tot_units_uom +
                        tot_ord_rand_wght_units +
                        '</td><td class="centerValue ">' +
                        //(item.dispatched_qty||'NA') +
                        //dispatched_uom
                        ((item.dispatched_qty!=null && item.dispatched_qty!="")?item.dispatched_qty+' '+(item.dispatched_uom || item.dispatched_qty_uom):'NA' )+
                        '</td>' +
                        '<td class="centerValue  ">' +
                        //tot_units_dispatched +
                        tot_units_dispatched +
                        tot_dispt_rand_wght_units+
                        '</td><td class="centerValue ">' +
                        //recvQty +
                        //4554 change
                        ((((item.random_wt_flag||'') == 'Y' && isST(commonOrder.order_type) && (item.dispatched_qty_uom||item.dispatched_uom||item.order_uom == item.base_uom)) ? recvWtValue : recvQty) +' '+(item.received_qty_uom || (item.dispatched_uom ||item.dispatched_qty_uom) || item.order_uom || ''))+
                        '</td><td class="centerValue ">' +
                       // tot_units_received +
                        tot_units_received+'<br>' +tot_recv_rand_wght_units
                        +'</td>' +
                        '<td class="sorted centerValue "><label class="' +
                        diffClass +
                        '">' +
                        //4554 change
                        correctDecimalPostion(Math.abs(diff)) +
                        '</label></td>' +
                        '<td class="sorted">' + reason + ' </td><td class="lastColumn centerValue sorted"><input class="confirmCheck" type="checkbox"> </td></tr>';
                    discCount++;
                    discTblArea.find('tbody').append(rowContent);                    
}
function bindReceiveQtyEvent(area) {

    area.find('.recvTextBox').on('input', function() {
        var $checkBox = $(this).closest('tr').find('.confirmCheck');
       if(salesOrg==1060 && era_prof=="Y"){
    	   
       }
       else{
    	   if ($checkBox.is(':checked')) {
               $checkBox.prop('checked', false);
               var value = Number(area.find('.confirmCol .confirmed').text());
               area.find('.confirmCol .confirmed').text(--value);
               if ($(this).val().trim() == '' || ($(this).attr('wgt_required') == 'Y' && $(this).closest('tr').find('.wtTextBox').val().trim()=='')) {
                   $checkBox.prop('disabled', true);
               } else {
                   $checkBox.prop('disabled', false);
               }
           }   
       } 
        updateReceivedTotalUnits(area, $(this).closest('tr'));
    });
	area.find('.wtTextBox').on('input', function() {
        var $checkBox = $(this).closest('tr').find('.confirmCheck');
        if(salesOrg==1060 && era_prof=="Y"){
        	
        }else{
        	 if ($checkBox.is(':checked')) {
                 $checkBox.prop('checked', false);
                 var value = Number(area.find('.confirmCol .confirmed').text());
                 area.find('.confirmCol .confirmed').text(--value);
             }

             if ($(this).val().trim() == '' || ($(this).attr('qty_required') == 'Y' && $(this).closest('tr').find('.recvTextBox').val().trim()=='')) {
                 $checkBox.prop('disabled', true);
             } else {
                 $checkBox.prop('disabled', false);
             }
        }   
        //R18.01 - Meat Co - Weighted Article Receiving - Changes   
        updateReceivedTotalUnits(area, $(this).closest('tr'), 'W');
    });
	 
    // fix for newOm on change event here
	area.find('.packOM').isWithinOnly3Decimal();
    area.find('.packOM').on('input', function() {
        var $checkBox = $(this).closest('tr').find('.confirmCheck');
        if ($checkBox.is(':checked')) {
            $checkBox.prop('checked', false);
            var value = Number(area.find('.confirmCol .confirmed').text());
            area.find('.confirmCol .confirmed').text(--value);
        }
        //OM can be given or need not be given it is optional
        /*if($(this).val().trim() == ''){
        	$checkBox.prop('disabled',  true);
        } else {
        	$checkBox.prop('disabled',  false);
        }*/
        updateReceivedTotalUnits(area, $(this).closest('tr'));
    });


    area.find('.expiryDt').on('input', function() {
        var $checkBox = $(this).closest('tr').find('.confirmCheck');
        if ($checkBox.is(':checked')) {
            $checkBox.prop('checked', false);
            var value = Number(area.find('.confirmCol .confirmed').text());
            area.find('.confirmCol .confirmed').text(--value);
        }

        /*if ($(this).val().trim() == '') {
            $checkBox.prop('disabled', true);
        } else {
            $checkBox.prop('disabled', false);
        }*/
    });

}

function bindExpiryDateMoreEvent(area) {

    area.find('.moreLink').unbind('click');
    area.find(".moreLink").click(function() {
    	if($(this).hasClass('more')){
    		//$(this).parent().addClass("hideBlock");
        	$(this).closest('tr').find("span.moreExpDt").removeClass("hideBlock");
        	$(this).removeClass('more').addClass('less');
        	$(this).text('- less');
    	}else{
    		//$(this).parent().removeClass("hideBlock");
        	$(this).closest('tr').find("span.moreExpDt").addClass("hideBlock");
    		$(this).addClass('more').removeClass('less');
    		$(this).text('+ more');
    	}
    });
}


function bindConfirmCheckBoxEvent(area, articleStepFlag) {
	var value = 0;
	var no_cartonsChecked;
	var articlesCheckedInCarton;
        if(!isSTO(commonOrder.order_type)){
                $('.confirmCheck').each(function(){
                        if($(this).closest('tr').find('.displayAttrFlag').html() == 'Y') $(this).attr('disabled', true);
                });
        }       
	if(salesOrg==1060 && era_prof=="Y"){
		area.find('.confirmCheck').unbind('click');
		area.find('.confirmCheck').click(function() {			
			if ($(this).is(':checked')) {
				//area.find('.confirmCol .confirmed').text(++value);
				if(articleStepFlag){
					var recvParam = getReceiveParam(false, false,'D');
					recvParam.iv_action_flag = 'D';
					callCommonReceivingService(recvParam, false);
				}
			}
			articlesCheckedInCarton=0;
			 $('.recvArticleStep').find('#groupBy_'+SSCCforTable+' tr').each(function() {
				 
            	 if( $(this).find('td .confirmCheck').is(':checked'))
            	{
            		 articlesCheckedInCarton ++;	 
            	 }	
             });
			 $('.recvArticleStep').find('#groupBy_'+SSCCforTable+' .confirmed').html(articlesCheckedInCarton); 
			 
			 DiscpArticlesCheckedInCarton=0;
			 $('#SSCCGroupForDescripencies').find('#groupBy_'+discpCarton+' tr').each(function() {
				 
            	 if( $(this).find('td .confirmCheck').is(':checked'))
            	{
            		 DiscpArticlesCheckedInCarton ++;	 
            	 }	
             });
			 $('#SSCCGroupForDescripencies').find('#groupBy_'+discpCarton+' .DiscpConfirmed').html(DiscpArticlesCheckedInCarton); 
			 
			 TotalCartonsChecked();
			 
		});	
		
		$('.expandAll').unbind('click');
		$('.expandAll').click(function(){
			var currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
			var $tblArea = (currentId == 2)?$('#SSCCGroup'):$('#SSCCGroupForDescripencies');				
			if($tblArea != "" && $tblArea.find('.expandAll').closest('tr').hasClass("collapsed")){
				$tblArea.find('.expandAll').closest('tr').removeClass("collapsed");
				$tblArea.find('.expandAll').closest('tr').addClass("expanded");
				$tblArea.find('.expandAll a').prop('title', "Collapse");
				$tblArea.find('td .indenter a').each(function(){
					if($(this).prop("title") != "Collapse"){
						$(this).trigger('click');
					}
				});
			}else if($tblArea != ""){
				$tblArea.find('.expandAll').closest('tr').removeClass("expanded");
				$tblArea.find('.expandAll').closest('tr').addClass("collapsed");
				$tblArea.find('.expandAll a').prop('title', "Expand");
				$tblArea.find('td .indenter a').each(function(){
				if($(this).prop("title") == "Collapse"){
					$(this).trigger('click');
				}
				});
			}
			
		});
	}
	else{
		area.find('.confirmCheck').unbind('click');
		area.find('.confirmCheck').click(function() {
			value = Number(area.find('.confirmCol .confirmed').text());
			if ($(this).is(':checked')) {
				area.find('.confirmCol .confirmed').text(++value);
				if(articleStepFlag){
					var recvParam = getReceiveParam(false, false,'D');
					recvParam.iv_action_flag = 'D';
					callCommonReceivingService(recvParam, false);
				}
			} else {
				area.find('.confirmCol .confirmed').text(--value);
			}
		});	
	}
	 area.find('.showComponentReceive').unbind('click').bind('click',function(){
		 showComponentReceive($(this).closest('tr').data('obj'));
 });

}

function cartonConfirmBoxCheck(id){			            	
        var no_of_cartonsChecked=0;
        var componentList =[];
        var recvParam =  getReceiveParam(false, false,'D');
        var commonObj = getCommonObject(); 
        if(componentArtMap != '' && commonObj.orderType == 'PO')
        for(key in componentArtMap)
        {
                if(key.split("_")[1] == id 
                        && componentArtMap[key] != '' && componentArtMap[key].length >0){
                                var compList  =  componentArtMap[key];
                                for(var i in compList){
                                compList[i].qty = compList[i].received_qty;
                                isComponent = 'C';
                                displayArticle = key.split("_")[0];                                
                                recvParam.iv_item_info.push(formArticlesConentForReceiving('D', '', 
                                'C', commonObj, displayArticle, {}, 0, {}, [], compList[i]));
                                }
                        
                }
        };
        recvParam.iv_action_flag = 'D';
        callCommonReceivingService(recvParam, false);	
        TotalCartonsChecked();         
        articlesCheckedInCarton=0;
                 $('.recvArticleStep').find('#groupBy_'+SSCCforTable+' tr').each(function() {                         
                 if( $(this).find('td .confirmCheck').is(':checked'))
                {
                         articlesCheckedInCarton ++;	 
                 }	
        });
        $('.recvArticleStep').find('#groupBy_'+SSCCforTable+' .confirmed').html(articlesCheckedInCarton);
}
//R18.01 - Meat Co - Weighted Article Receiving - Changes
function updateReceivedTotalUnits(area, $tr, changedField) {
    var om = 1;
    var totUnits = 0;
    if ($tr.find('.packOM').is(':visible') && !$tr.find('.packOM').val() == "") {
        om = getOneIfEmpty($tr.find('.packOM').val());
    } else {
        var obj = $tr.data('obj');
        om = (obj.dispatched_om || obj.om);
    }
    var obj = $tr.data('obj');
    totUnits = Number(om) * Number($tr.find('.recvTextBox').val());
    obj.received_qty= Number($tr.find('.recvTextBox').val());
    obj.tot_units_uom = getEmptyIfNull(obj.base_uom);
    if(obj.display_article_flag =='Y' && isSTO(commonOrder.order_type) && componentArtMap != ''){        
        for(key in componentArtMap)
        {
                if(key.split("_")[0] == obj.article
                        && componentArtMap[key] != '' && componentArtMap[key].length >0){
                                var compList  =  componentArtMap[key];
                                for(var i in compList){
                                        var conversionFactor =  (compList[i].order_qty != null && compList[i].order_qty != ''
                                        && obj.order_qty != null &&obj.order_qty != '')?Number(compList[i].order_qty) /Number(obj.order_qty):'';
                                        compList[i].received_qty = (conversionFactor != '' && obj.received_qty != '' && obj.received_qty != null)?
                                        (Number(obj.received_qty) * conversionFactor):compList[i].received_qty ;
                                }
                        
                }
        };
    }
    var received_qty_uom = '';
    if(obj.dispatched_qty!=null && obj.dispatched_qty!=undefined && obj.dispatched_qty.toString()!=''){
    	//4554 change
    	received_qty_uom = (obj.dispatched_uom || obj.dispatched_qty_uom);
    } else if(obj.order_qty!=null && obj.order_qty!=undefined && obj.order_qty.toString()!=''){
    	received_qty_uom = obj.order_uom;
    }
   if(obj.random_wt_flag == 'Y' || ((obj.weighted_flag||'' ) == 'Y' && received_qty_uom == 'KG')){
    	 var recvValue =  $tr.find('.recvTextBox').val();
    	 if(recvValue == '0'){
    		 $tr.find('.wtTextBoxFix').val('0');
    		 obj.tot_weight = recvValue;
    	 }
    	 var recvWtValue =  $tr.find('.wtTextBoxFix').val();
    	 var recvWtRecvBox = (recvWtValue!=null && recvWtValue!="")?Number(recvWtValue)+" "+
    	    	((recvWtValue!=null && recvWtValue!="" && obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:''):'NA';
    	 var totUnitsValue = (obj.pi_om != '' && recvValue != '' && 
    			obj.pi_uom != '' &&  !$tr.find('.recvTextBox').hasClass('hideBlock'))?(randomWghtTotUnits(obj, Number(recvValue), received_qty_uom)):''; 
		//Defect_4554 Defect_12081 - Fix
		var totUnitsValue = '';
		if(isST(commonOrder.order_type) && (obj.base_uom == obj.order_uom) && obj.random_wt_flag == 'Y'){
			totUnitsValue = (obj.pi_om != '' && recvValue != '' && 
				obj.pi_uom != '' &&  !$tr.find('.recvTextBox').hasClass('hideBlock'))?'('+ (recvValue||'') +' '+ obj.pi_uom +')':''; 
			//Defect -12752 Fix 
			if(changedField != 'W'){
				var actualPiQty = Number((obj.ordered_pi_qty||'')!='' ? obj.ordered_pi_qty : (obj.dispatched_qty||obj.order_qty));
				var actualWeight = Number($tr.find('.wtTextBoxFix').attr('wgt_org'));
				var correctedPiQty = Number(recvValue);
				var correctedWeight = (!isNaN(actualPiQty) && !isNaN(actualWeight) && !isNaN(correctedPiQty)) ? ((correctedPiQty/actualPiQty)*actualWeight).toFixed(3) : 0;
				$tr.find('.wtTextBoxFix').val(correctedWeight);
				recvWtValue =  $tr.find('.wtTextBoxFix').val();	
			}
    	 	recvWtRecvBox = (recvWtValue!=null && recvWtValue!="")?Number(recvWtValue).toFixed(3)+" "+
    	    	((recvWtValue!=null && recvWtValue!="" && obj.tot_units_uom!=null && obj.tot_units_uom!="")? obj.tot_units_uom:''):'NA';
			//obj.tot_weight = correctedWeight;
		}else{
			totUnitsValue = (obj.pi_om != '' && recvValue != '' && 
				obj.pi_uom != '' &&  !$tr.find('.recvTextBox').hasClass('hideBlock'))?(randomWghtTotUnits(obj, Number(recvValue), received_qty_uom)):''; 
		}				
    	 $tr.find('.recvTotUnits').html('<strong>'+recvWtRecvBox+'<br>'+totUnitsValue+ '<br></strong>');
    }
   //R18.01 - Meat Co - Weighted Article Receiving - Changes, 12761 - Fix
    else if(obj.weight_flag !=  undefined  && obj.weight_flag == 'Y'){
    	if(changedField != 'W'){
    		var dispatchedWeightRatio  = Number(obj.dispathced_wgt) / Number(obj.dispatched_qty);
        	totUnits = dispatchedWeightRatio * Number($tr.find('.recvTextBox').val());       
        	totUnits = (totUnits != '' && totUnits.toString().indexOf('.') != -1)?Number(totUnits).toFixed(3):totUnits;
    	}else
    	{
    		totUnits = $tr.find('.wtTextBoxFix').val();
    		$tr.find('.wtTextBoxFix').val(totUnits);
    	}
    	obj.tot_weight = (totUnits != null && totUnits!= '')?totUnits:0;
    	totUnitsValue = (totUnits != null && totUnits!= '')?('<strong>' + totUnits +' '+obj.tot_units_uom+'</strong>'):'NA';
    	$tr.find('.recvTotUnits').html(totUnitsValue);
    }else{
    	 totUnits = (totUnits != '' && totUnits.toString().indexOf('.') != -1)?totUnits.toFixed(3):totUnits;
    	 $tr.find('.recvTotUnits').html('<strong>' + totUnits +' '+obj.tot_units_uom+'</strong>');
    }
   
}

function formRecvSummaryContent() {	
    var area = $('#step-5');
    var sumArea = area.find('#recvSummaryTable');
    var articleArea = $('#recvArticleTable');
    var zeroQtyCount = 0;
    var otherQtyCount = 0;
    var packSizeChangeCount = 0;
    var totULDRec = 0;
    var totULDRet = 0;
    var totCartonsOrd = 0;
    var totCartonsRecvd = 0;
    var recvMethod = '';
    var totArticlesRecvd = 0;
    var notRanged = 0;
    var notRangedMsg = '';
    var cartonArea = $('#SSCCGroup');
    //R18.01 Defect_10319 - Fix
	var ssccCartonOrderedSummary = 0;
	var ssccCartonReceivedSummary = 0;
    if(salesOrg==1060 && era_prof=="Y")
    	{
    	articleArea = $('.recvArticleTable');
    	}
    $('#addULDTable').find('tbody tr').each(function() {
        totULDRec += Number(getEmptyIfNull($(this).find('.recQty').val()));
        totULDRet += Number(getEmptyIfNull($(this).find('.retQty').val()));
    });

    recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val();

    var tmpQty = 0;
    //R18.01 Defect_12600 - Fix
    totArticlesOrd = recvItemInfo.length;
    for (var i = 0; i < recvItemInfo.length; i++) {
        totCartonsOrd += Number(getEmptyIfNull(recvItemInfo[i].order_qty));
        tmpQty = 0;
        if(recvItemInfo[i].dispatched_qty != null && recvItemInfo[i].dispatched_qty != ''){
        	tmpQty = Number(getEmptyIfNull(recvItemInfo[i].dispatched_qty));
        }else{
        	tmpQty = Number(getEmptyIfNull(recvItemInfo[i].order_qty));
        }
        totCartonsRecvd += tmpQty;
        if(recvItemInfo[i].received_qty_not_ranged == '0')
    	{
        	totCartonsRecvd -= tmpQty;
        	zeroQtyCount++;
        	qtyUpdated = true;
    	}
        if(globalTempFlag && recvItemInfo[i].temp_chk_flag =='Y' && recvItemInfo[i].received_qty_not_ranged != '0')
        {
        	 totCartonsRecvd -= tmpQty;
        	 zeroQtyCount++;
        }
    }
    if (recvMethod == 'MM') {
    	totArticlesRecvd = recvItemInfo.length;
    	var currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
        if(currentId == 5/* && !(recvConfigMap['ULD'] != null && recvConfigMap['ULD'] == 'Y')*/){  
        	//12688
        	if (isPO(commonOrder.order_type) && containsNotRangedItem > 0) {        		
                notRangedMsg += '<ul><li>Total <strong>' + containsNotRangedItem + ' articles</strong> in this order are not ranged to your store. </li>' +
                    '<li>&nbsp;</li><li>Click on Accept to receive those articles or reject it.</li></ul>';
                showNotRangedPopup(notRangedMsg);
            }
        }
    }else {
    	//R18.01 Defect_12600 - Fix
		zeroQtyCount = 0;
		tmpQty = 0;
		totCartonsRecvd = 0; //Resetting fully received value.
        if(salesOrg==1060 && era_prof=="Y" && recvMethod == 'MF' ){				// condition for ERA and receive by exception -  # sibi mail issue
        	  var grpArea = $('.recvArticleStep').find('tr.groupByExpand1');
        	  grpArea.each(function(){
        		  var ssccId =  $(this).attr('data-tt-id');
        		  var grpContArea = $('#SSCCGroup').find("[data-tt-id='"+ssccId+"_sub']").find('.recvArticleTable');
        		  grpContArea.find('tbody tr').each(function() { 
        			  if(grpContArea.find('input[type="checkbox"]').is(':checked')){
        				 // totCartonsOrd += Number(getEmptyIfNull($(this).data('obj').order_qty));           
        					if ((($(this).find('.displayAttrFlag').html() != 'Y' && isPO(commonOrder.order_type))) || isSTO(commonOrder.order_type) || isST(commonOrder.order_type) ) {
        						totCartonsRecvd += ($(this).data('obj').ranged_flag != 'Y'  || $(this).data('obj').temp_chk_flag =='Y')?
        			  	  			(($(this).data('obj').ranged_flag != 'Y' && notRangedAllowed)?(Number(getEmptyIfNull($(this).data('obj').dispatched_qty|| $(this).data('obj').order_qty))):
        			  	  				(!globalTempFlag && $(this).data('obj').temp_chk_flag =='Y')?(Number(getEmptyIfNull($(this).data('obj').dispatched_qty|| $(this).data('obj').order_qty))):0):
        			  	  			(($(this).data('obj').weight_flag == 'Y' || ($(this).data('obj').weighted_flag == 'Y' && 
        			  	  					($(this).data('obj').dispatched_qty_uom || $(this).data('obj').dispatched_uom || $(this).data('obj').order_uom || '') == 'KG') 
        								 || (($(this).data('obj').random_wt_flag == 'Y' || $(this).data('obj').random_wgt_flag == 'Y') && isST(commonOrder.order_type)))
        								?Number(getEmptyIfNull($(this).find('.wtTextBox').val())): Number(getEmptyIfNull($(this).find('.recvTextBox').val())));
        						  totArticlesRecvd++;
        						  if (getEmptyIfNull($(this).find('.recvTextBox').val()) == 0) {
        							  zeroQtyCount++;
        						  } else if(getEmptyIfNull(($(this).data('obj').dispatched_qty)||($(this).data('obj').order_qty)) != getEmptyIfNull($(this).find('.recvTextBox').val())
        								  && (($(this).find('.displayAttrFlag').html() != 'Y' && isPO(commonOrder.order_type)) || isSTO(commonOrder.order_type) || isST(commonOrder.order_type))){
        							  otherQtyCount++;
        						  }

        						  if ($(this).find('.packOM').val() != '') {
        							  if (getEmptyIfNull($(this).data('obj').om) != getEmptyIfNull($(this).find('.packOM').val())) {
        								  packSizeChangeCount++;
        							  }
        						  }
        					  }
        			  }/*else{
        				  totCartonsOrd += Number(getEmptyIfNull($(this).data('obj').order_qty)); 
        			  }*/
        		  });
        	  });
          }else{
           articleArea.find('tbody tr').each(function() {           
          // totCartonsOrd += Number(getEmptyIfNull($(this).data('obj').order_qty));           
           if(!(salesOrg==1060 && era_prof=="Y") || (recvMethod == 'RC' && salesOrg==1060 && era_prof=="Y" && $(this).hasClass("confirmReceive"))
                   || (recvMethod != 'RC' && salesOrg==1060 && era_prof=="Y")){ 
         
           /*//totCartonsRecvd += Number(getEmptyIfNull($(this).find('.recvTextBox').val()));*/
         // if (salesOrg==1060 && era_prof=="Y" && recvMethod == 'MF' ||(getEmptyIfNull($(this).data('obj').order_qty) != getEmptyIfNull($(this).find('.recvTextBox').val()))) {
          if (recvMethod == 'RC' || (recvMethod != 'RC' && salesOrg==1060 && era_prof=="Y" && $(this).find('input:checkbox:checked').length > 0)
                  || !(salesOrg==1060 && era_prof=="Y")) {
          if ((($(this).find('.displayAttrFlag').html() != 'Y' && isPO(commonOrder.order_type))) || isSTO(commonOrder.order_type) || isST(commonOrder.order_type) ) {
        	  totCartonsRecvd += ($(this).data('obj').ranged_flag != 'Y'  || $(this).data('obj').temp_chk_flag =='Y')?
		  	  			(($(this).data('obj').ranged_flag != 'Y' && notRangedAllowed)?(Number(getEmptyIfNull($(this).data('obj').dispatched_qty|| $(this).data('obj').order_qty))):
		  	  				(!globalTempFlag && $(this).data('obj').temp_chk_flag =='Y')?(Number(getEmptyIfNull($(this).data('obj').dispatched_qty|| $(this).data('obj').order_qty))):0):
		  	  			(($(this).data('obj').weight_flag == 'Y' || ($(this).data('obj').weighted_flag == 'Y' && 
		  	  					($(this).data('obj').dispatched_qty_uom || $(this).data('obj').dispatched_uom || $(this).data('obj').order_uom || '') == 'KG') 
							 || (($(this).data('obj').random_wt_flag == 'Y' || $(this).data('obj').random_wgt_flag == 'Y') && isST(commonOrder.order_type)))
							?Number(getEmptyIfNull($(this).find('.wtTextBox').val())): Number(getEmptyIfNull($(this).find('.recvTextBox').val())));
		  	  	totArticlesRecvd++;
                if (getEmptyIfNull($(this).find('.recvTextBox').val()) == 0) {
                    zeroQtyCount++;
                } else if(getEmptyIfNull(($(this).data('obj').dispatched_qty)||($(this).data('obj').order_qty)) != getEmptyIfNull($(this).find('.recvTextBox').val())
                   && (($(this).find('.displayAttrFlag').html() != 'Y' && isPO(commonOrder.order_type)) || isSTO(commonOrder.order_type) || isST(commonOrder.order_type))){
                    otherQtyCount++;
                }
            
                if ($(this).find('.packOM').val() != '') {
                 if (getEmptyIfNull($(this).data('obj').om) != getEmptyIfNull($(this).find('.packOM').val())) {
                       packSizeChangeCount++;
                  }
                }
                }
           }
                
             }
             });
       }
    }
    //defect_12776 fix
    if (totCartonsOrd != parseInt(totCartonsOrd)){
        totCartonsOrd=totCartonsOrd.toFixed(3);
        }
        
    
    sumArea.find('.recvBy').text($('#loginUserId').val());
  	sumArea.find('.CHTemp').text($('#step-1').find('#temperature1').val());
    sumArea.find('.HFTemp').text($('#step-1').find('#temperature2').val());
    sumArea.find('.totOrdArticles').text(recvItemInfo.length);
    sumArea.find('.totOrdCartons').text(totCartonsOrd);
    
    //R18.01 Defect_10319 - Fix
    if(salesOrg == '1060'){
    sumArea.find('#cartonsOrderedRecvSumTxt').text("Total Ordered Qty:");
    sumArea.find('#cartonsReceivedRecvSumTxt').text("Total Received Qty:");     
    }
    
    if(salesOrg == '1060'&& era_prof=="Y"){
    $('#bigwSSCCCartonDtls').removeClass("hideBlock");
    //ssccCartonOrderedSummary = $('.recvArticleStep').find('tr.groupByExpand1').length;
    if($('.reportRadio').find('input[type="radio"]:checked').val() != 'RC')
    ssccCartonReceivedSummary = CalculateCartonsReceivedSummaryScreen();
    else
    ssccCartonReceivedSummary = $('#SSCCGroup tr').find('.cartonSelect:checked').length;
    //R18.01 Defect_12600 - Fix
    if(commonOrder.order_status == 'PARTIALLY RECEIVED' && salesOrg == '1060'&& era_prof=="Y"){    	
    	ssccCartonReceivedSummary = ssccCartonReceivedSummary + ssccCartonReceived.length;
    	totCartonsRecvd = totCartonsRecvd + totalCartonsReceivedERA;
    	totArticlesRecvd = totArticlesRecvd +totalArticlesReceivedERA;    	
    	sumArea.find('.totOrdArticles').text(totalArticlesOrderedERA);
    	sumArea.find('.totOrdCartons').text(totalCartonsOrderedERA);  
    }
    $('.totalSSCCCartonsOrdered').text(ssccCartonOrdered.length);   
    $('.totalSSCCCartonsReceived').text(ssccCartonReceivedSummary);
    }else{
    $('#bigwSSCCCartonDtls').addClass("hideBlock");
    } 
  //DEFECT_12776 fix
    if (totCartonsRecvd != parseInt(totCartonsRecvd)){
    totCartonsRecvd=totCartonsRecvd.toFixed(3);
    }
    
    sumArea.find('.totULDRec').text(totULDRec);
    sumArea.find('.totRecvArticles').text(
        totArticlesRecvd);      
    sumArea.find('.totRecvCartons').html((commonOrder.order_type == 'VENDOR' &&
    		!jQuery.isEmptyObject(componentArtMap) && recvMethod != 'MM')?'<label>'+totCartonsRecvd+'</label><label class="receiveingInfoFlag"></label>':
    	 '<label>'+totCartonsRecvd+'</label>' );
    addtooltip($('.receiveingInfoFlag'), 'Excludes display articles. Refer to List of Articles');
    $(".tooltip")
      .tooltip({
        position: {
          my: "left center",
          at: "right+10 center"
        }
      });
    sumArea.find('.totULDRet').text(totULDRet);

    area.find('#discDetails').find('.packSize').text(packSizeChangeCount);
    area.find('#discDetails').find('.zeroQty').text(zeroQtyCount);
    area.find('#discDetails').find('.otherQty').text(otherQtyCount);

    if (commonOrder.on_show_date != undefined &&
        (isPastDate(commonOrder.on_show_date) ||
            isCurrentDate(commonOrder.on_show_date))) {
        $('.orderReceive #step-5').find('.postRadio input[type=radio]').attr('disabled', true);
    }
}

function formULDContent() {
    var area = $('.orderReceive #step-4');
    var options = '<option value="">Select</option>';
    var splitVal = '';
    var recType = '';
    //Based on email BigW_0858_Clarification on mandatory filed in IBT receiving from tamer.
    if ($('#salesOrg').val() == '1060') {
        area.find('.uldFields').removeClass('hideBlock');
        //area.find('#carLabel').addClass('mandatory');
    }

    area.find('#did').val($('.orderReceive #step-1').find('#invoice').val());
    if(commonOrder.order_type == 'WAREHOUSE'  || commonOrder.order_type == 'STOCK TRANSFER' ){
    	area.find('#did').parent().find('label').removeClass("mandatory");
    }
    var masterParam = {
        "iv_user_id": $('#loginUserId').val(),
        "iv_pwd": "",
        "iv_session_id": "111",
        "iv_site_no": $('#posSite').val(),
        "iv_sales_org": $('#salesOrg').val()
    };

    splitVal = $('.orderReceive').find('#asnNo').val().split('_');
    recType = (commonOrder.order_type == 'VENDOR' || commonOrder.order_type == 'WAREHOUSE') ? 'O' :
        'I';

    var deliveryParam = {
        "iv_order_no": (commonOrder.order_type == 'WAREHOUSE' && consignmentFlag == "C")?
        		getEmptyIfNull(receiveInFull_asnNo) :getEmptyIfNull(commonOrder.order_no),
        "iv_seg_no": getEmptyIfNull(splitVal[1]),
        "iv_rec_type": recType,
        "iv_user_id": $('#loginUserId').val(),
        "iv_pwd": "",
        "iv_session_id": "111",
        "iv_sales_org": $('#salesOrg').val()
    };

    console.log(getULDMasterInfoUrl + ' ' + JSON.stringify(masterParam));

    $.ajax({
        type: "POST",
        url: getULDMasterInfoUrl,
        data: JSON.stringify(masterParam),
        beforeSend: function() {
            startLoading();
        }
    }).done(function(data) {
        if (checkResult(data, 'uld_id')) {
            var response = data;
            for (var i = 0; i < response.length; i++) {
            //Defect_12500
                options += '<option  plt_type ="'+(response[i].plt_type||'')+'" value="' +
                    $.trim(response[i].uld_id) + '">' +
                    $.trim(response[i].uld_desc) + '</options>';
            }
            area.find('#typeSelect').html(options);
        }
    }).fail(function() {
        $.fn.showCustomMsg([mobiSerErrCode], error);
        stopLoading();
    }).always(function() {
        triggerAnotherAjax(deliveryParam, area);
    });

}

function triggerAnotherAjax(deliveryParam, area) {
    console.log(getULDDeliveryInfoUrl + ' ' + JSON.stringify(deliveryParam));
    $.ajax({
        type: "POST",
        url: getULDDeliveryInfoUrl,
        data: JSON.stringify(deliveryParam),
    }).done(function(data) {
        var response = data;
        clearULDDetails(area);       
        if (response != null && response != undefined && response[0].ref_no != undefined && response[0].msg_type != 'E') {
            formULDTableContent(response, area);        	
        	frameDeliveryDetails(response);
        }
        /* else if(response != null && response[0].ref_no != undefined && response[0].msg_type == 'E')
			  {
			  $.fn.showCustomMsg([response[0].msg],error);
			  }*/
    }).fail(function() {
        $.fn.showCustomMsg([mobiSerErrCode], error);
        stopLoading();
    }).always(function() {
        stopLoading();
    });
}
function clearULDDetails(area){
	$('#car').val('');
	$('#consign').val('');
	$('#sen').val('');
	$('#reg').val('');
	$('#tra').val('');
	$('#comments').html('');
	$('#rec').val('');
	$('#req').val('');
	$('#ret').val('');
	area.find('tbody').html("");
	$('#addULDTable').addClass('hideBlock');
}
function frameDeliveryDetails(response){
	if(response != null && response != '' && response[0] != ""){
	$('#car').val(((response[0].carrier_no != "" && response[0].carrier_no != undefined)
			 ?response[0].carrier_no.replace(/^0+/, ""):"")
			 +((response[0].carrier_name != "" && response[0].carrier_name != undefined)
			 ?("-"+response[0].carrier_name):""));
	$('#consign').val(response[0].consignment_note_no);
	$('#sen').val(response[0].sender);
	$('#reg').val(response[0].trailer_rego_no);
	$('#tra').val(response[0].trailer_rego_no);
	$('#comments').html(response[0].comments);
	$('#rec').val($('#posSite').val());	
	}
}

function formULDTableContent(response, toAddArea) {
    var $tempTr = '';
    var uldId;
	var plt_type='00';
    if(commonOrder.order_type == 'WAREHOUSE'){
    	toAddArea.find('#did').val(response[0].delivery_doc_no || '');    	
    } 
    toAddArea.find('tbody').html("");
    for (var i = 0; i < response.length; i++) {
        uldId = response[i].ref_no;
        //Defect_12500
        plt_type = (response[i].plt_type||'00');
        $tempTr = '<tr plt_type="'+plt_type+'" id="row-' +
            uldId +
            '"><td>' +
            response[i].uld_desc +
            '</td><td class="centerValue"><input type="#" id="uldRec-"' +
            uldId +
            ' class="textbox xsmallbox recQty"  maxlength = "3" value="' +
            response[i].uld_qty +
            '">' +
            '</td><td class="centerValue" id="uom-1"><input type="#" class="textbox xsmallbox retQty"  maxlength = "3" value="">' +
            '</td><td class="centerValue">' +
            '<label class="linkBtn" id="deleteULD-1"><label id="delete-' +
            uldId + '" class="deleteRecord">Delete</label>' +
            '</label></td></tr>';

        $tempTr = $($tempTr);
        $tempTr.data('oldRecQty', response[i].uld_qty);
        $tempTr.find('.xsmallbox').onlyNumbers();
        toAddArea.find('tbody').append($tempTr);
        bindULDRecvQtyEvent(toAddArea, uldId);
        bindDeleteULDEvent(toAddArea, uldId);
        toAddArea.find('#addULDTable').removeClass('hideBlock');
        if(commonOrder.order_type == 'STOCK TRANSFER')
        	toAddArea.find('tbody').find('.retQty').prop('disabled',true);
    }
}

function bindULDRecvQtyEvent(toAddArea, uldId) {
    var btnId = 'uldRec-' + uldId;
    toAddArea
        .find('#' + btnId)
        .on(
            'input',
            function() {
                var oldRecQty = Number($.trim($(this).closest('tr')
                    .data('oldRecQty')));
                var newRecQty = Number($.trim($(this).val()));
                var variance = (Math.abs(oldRecQty - newRecQty) / newRecQty) * 100;
                if (variance > 15) {
                    showULDRecQtyVariancePopup(
                        'Variance is high, Continue?', $(this));
                }
            });
}

// This method shows the confirmation popup after order header service
function showULDRecQtyVariancePopup(msg, srcElem) {
    try {
        $("#dialog-recvConfirmation").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            minHeight: 100,
            maxHeight: 600,
            width: 350
        });

        $("#dialog-recvConfirmation").parent().addClass("popupWrapper");

        $('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
        $("#dialog-recvConfirmation").find('#continue, #cancel').addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#acceptbtn, #rejectbtn').addClass("hideBlock");
        $("#dialog-recvConfirmation").dialog("open");
        $("#dialog-recvConfirmation").find('#message').text(msg);
        $("#dialog-recvConfirmation").parent().find('.ui-dialog-title').text(
            'Confirmation');
        $("#dialog-recvConfirmation").find('.confirmation-yesbtn').unbind(
            'click');
        $("#dialog-recvConfirmation").find('.confirmation-yesbtn').click(
            function() {
                $("#dialog-recvConfirmation").dialog("close");
                srcElem.closest('.retQty').focus();

            });
        $("#dialog-recvConfirmation").find('.confirmation-nobtn').removeClass(
            'hideBlock');
        $("#dialog-recvConfirmation").find('.confirmation-nobtn').unbind(
            'click');
        $("#dialog-recvConfirmation").find('.confirmation-nobtn').click(
            function() {
                $("#dialog-recvConfirmation").dialog("close");
            });
    } catch (err) {
        showULDRecQtyVariancePopup(msg, srcElem);
    }
}

function validateStepOne() {
    var flag = true;
    var area = $('#step-1');
    var content = [];

     if (area.find('#invoice').is(':visible') &&
        area.find('#invoice').val().trim() == '') {
        content.push('Invoice / Docket # is Mandatory');
        area.find('#invoice').error('Invoice / Docket # is Mandatory');
        flag = false;
    }
    if (area.find('#temperature1').is(':visible') &&
        area.find('#temperature1').val().trim() == '') {
        content.push('Chilled Temperature is Mandatory');
        area.find('#temperature1').error('Chilled Temperature is Mandatory');
        flag = false;
    }

    if (area.find('#temperature2').is(':visible') &&
        area.find('#temperature2').val().trim() == '') {
        content.push('Hard Frozen Temperature is Mandatory');
        area.find('#temperature2')
            .error('Hard Frozen Temperature is Mandatory');
        flag = false;
    }
    
    var receiveMethodSelected = false; 
    $('.orderReceive').find('.reportRadio').find('span').each(function(){
    	if(!$(this).hasClass("hideBlock")){receiveMethodSelected = true;
    }});
    if(!receiveMethodSelected){
    	 flag = false;
    	 content.push('Receiving Method is Mandatory');
    }

    if (!flag) {
        $.fn.showCustomMsg(content, error, 'Receive Articles');
    } else {
        if (!globalTempFlag) {
            globalTempFlag = checkTemperatureForArticles();
            flag = !globalTempFlag;
            if (globalTempFlag) {
            //Defect_11021 - Fix
        	//Temp too high warning
			//Temp too high warning Durai change
			$.fn.warnPopup('warn', 'Temperature out of range! <br>Some articles have failed temperature check. Re-enter temperature or click \'next step\' to reject failed chilled articles.', 'Temperature out of range!', continueToNext ,triggerReEnter, '', '','',function(e){e.data.msg.dialog('close');if(globalTempFlag!=undefined)globalTempFlag = false;});
			$('#dialog-alert-conf #yes .actionBtn').text('Next');
			$('#dialog-alert-conf #no .actionBtn').text('Re-Enter');
            }
            $('.orderReceive #recvArticleTable').removeClass('framed');
        }
    }
    
    

    return flag;
}
   $('#temperature1,#temperature2').on('keypress', function(e) {
       var k = String.fromCharCode(e.charCode);
       var v = this.value;
       var dp = v.indexOf('.');

       if ((k < '0' || k > '9') && k !== '.' && k !== '-') return false;

       // reject any input that takes the length
       // two or more beyond the decimal point
       if (dp >= 0 && v.length > dp + 2) {
           return false;
       }

       // don't accept >1 decimal point, or as first char
       if (k === '.' && (dp >= 0 || v.length === 0)) {
           return false;
       }

   });
   $('#temperature1,#temperature2').on('keyup', function(e) {
       var k = String.fromCharCode(e.charCode);
       var v = this.value;
       var dp = v.indexOf('.');
       if (this.value >= 1000 || this.value <= -1000)
       	{//this.value='';
        if(this.value.indexOf('-') == 0){
             this.value= this.value.substr(0, 4);
        }else {
             this.value= this.value.substr(0, 3);
        }
           return false;
       }

   });

   $('#temperature1,#temperature2').blur(function(){
	    if($(this).val().trim() != ''){
	        $(this).val(Number($(this).val()).toFixed(2));
	    }
	});
   
   
function validateStepTwo() {
    // $('.errorField').removeClass('errorField').removeAttr('title');
	//if($('#salesOrg').val()=="1060" && era_prof=="Y"){
		
		 var area = $('#step-2');
		    var flag = true;
		    var innerFlag = false;
		    var errorContent = [];
		    var changeOMFlag = area.find('#searchBoxArea #changeOM').is(':checked');
		    var checkedValue = $('.reportRadio').find('input[type="radio"]:checked').val();
	
		    if (checkedValue == 'RM' || checkedValue == 'MF') {
		        area
		            .find('#recvArticleTable tbody tr')
		            .each(
		                function() {
		                    var article = $(this).attr('id').split('-')[1];

		                    if ($(this).find('.recvTextBox').is(':visible') &&
		                        $(this).find('.recvTextBox').val().trim() == '') {
		                        errorContent.push('Article : ' + article + ' Received Quantity is Mandatory');
		                        $(this).find('.recvTextBox').error(
		                            'Received Quantity is Mandatory');
		                        innerFlag = true;
		                    }

		                    if ($(this).find('.wtTextBox').is(':visible') &&
		                        $(this).find('.wtTextBox').val().trim() == '') {
		                        errorContent.push('Article : ' + article + ' Total Weight is Mandatory');
		                        $(this).find('.wtTextBox ').error(
		                            'Total Weight is Mandatory');
		                        innerFlag = true;
		                    }
		                    
		                    if ($(this).find('.recvTextBox').is(':visible') && $(this).find('.wtTextBox').is(':visible')) {
		                    	var tempQty = $(this).find('.recvTextBox').val().trim();
		                    	var tempWgt = $(this).find('.wtTextBox').val().trim();
		                    	if((Number(tempQty) == 0 && Number(tempWgt) >0)){
									errorContent.push('Article : ' + article + ' Received Quantity is Mandatory');
									$(this).find('.recvTextBox').error('Received Quantity is Mandatory');
									innerFlag = true;
		                    	}else if((Number(tempQty) >0 && Number(tempWgt) == 0)){
		                    		errorContent.push('Article : ' + article + ' Total Weight is Mandatory');
		                        	$(this).find('.wtTextBox ').error('Total Weight is Mandatory');
									innerFlag = true;
		                    	}
		                    }

		                    if (changeOMFlag) {
		                        if ($(this).find('.packOM').val().trim() == '0') {
		                            errorContent.push('Article : ' + article + ' Order Multiple should be greater than 0.');
		                            $(this).error('Order Multiple should be greater than 0.');
		                            innerFlag = true;
		                        }

		                        var count = 1;

		                        $(this).find('.expiryDt').each(function() {

		                            if ($(this).is(':visible:not(:disabled)')) {
		                                if ($.trim($(this).val()) == '') {
		                                    if (count == 1 && $(this).attr('exp_flag')=='Y') {
		                                        errorContent.push('Article : ' + article + ' Expiry Date '+count+' is Mandatory.');
		                                        $(this).error('Expiry Date is Mandatory');
		                                        innerFlag = true;//Removed validation
		                                    }
		                                } else {
		                                    if (!isValidDate($(this).val())) {
		                                        errorContent.push('Article : ' + article + ' Expiry Date ' + count + ' is invalid.');
		                                        $(this).error('Expiry Date is invalid');
		                                        innerFlag = true;
		                                    }
		                                    if (isPastDate($(this).val())) {
		                                        errorContent.push('Article : ' + article + ' Expiry Date ' + count + ' should not be in Past');
		                                        $(this).error('Expiry Date should not be in Past');
		                                        innerFlag = true;
		                                    }
		                                }
		                            }

		                            count++;
		                        });
		                    }

		                });
                        if (checkedValue == 'RM' && ($('#salesOrg').val()=="1060" && era_prof=="Y") 
                                /*&& $('#SSCCGroup tr').find('.cartonSelect:checked').length == 0*/) {
                        var a = [];
                        $('#SSCCGroup tr').each(function(){ 
                        if($(this).find('.confirmCheck').val() != undefined)
                         a.push($(this).find('.confirmCheck').val()); 
                        });
                        a = unique(a);                       
                        var validate = false;
                        if(a != '' && a != undefined){
                                var count = 0;
                                for(var i in a){
                                      $('.'+a[i]).each(function(){ 
                                        if($(this).is(':checked')){
                                        count++;
                                        }
                                        });
                                 if(count == $('.'+a[i]).length)   {
                                        validate = true;     
                                 }else if(count !=0){
                                    validate = false;          
                                 }   
                                count = 0; 
                                }                                                    
                        }                       
                        if(!validate){
                        flag = false;
                        var title = 'Receive Cartons';
		            errorContent.push('Please confirm the received cartons ');
                            $.fn.showCustomMsg(errorContent, error, title);
                        }
                     }else if(checkedValue == 'MF'){
                     var noComp = true;
                     if(componentArtMap != ''){
                     for(key in componentArtMap){
                             if(key != "" && componentArtMap[key] != "" ){
                               var list = componentArtMap[key];
                               if(list != undefined && list !="" && list.length >0)
                               for(var i=0; i<list.length; i++){
                                    if(list[i].qty !="" && list[i].qty != null){
                                    noComp = false;
                                    break;
                                    }             
                               }
                            }     
                    }
                    }
                    /* $('#recvArticleTable tbody').find('.contentRowDet').each(function(){
                    	 if($(this).attr('id') == "row-"+recvItemInfo[0].article) 
                    	 {console.log("got row"+$(this).find('.recvTextBox').val());  console.log("recv Qty"+recvItemInfo[0].received_qty);
                    	 } });*/
                     var changed = false;
                     for(var i=0; i<recvItemInfo.length; i++){ 
                    	 if(recvItemInfo[i].received_qty != '' 
                    		 && recvItemInfo[i].received_qty != (recvItemInfo[i].dispatched_qty
                    				 || recvItemInfo[i].order_qty|| '')
                    				 && (((recvItemInfo[i].sscc_carton_num||'')!='') ?  
                    						 (!$('#SSCCGroup [data-tt-id="'+recvItemInfo[i].sscc_carton_num+'_sub"]').find('#'+"row-"+recvItemInfo[i].article).find('.confirmCheck').is(':checked')) : !$('#'+"row-"+recvItemInfo[i].article).find('.confirmCheck').is(':checked'))){
                    		 changed = true;
                          }
                    	  //Defect_12747 - Fix
                		  var thisRow =$('#row-'+recvItemInfo[i].article);
                		  if(!changed &&( recvItemInfo[i].random_wgt_flg == 'Y' || recvItemInfo[i].weight_flag == 'Y') && thisRow.find('.wtTextBox').is(':visible')
                				 && (Number(thisRow.find('.wtTextBox').val() || '').toFixed(3) != Number(recvItemInfo[i].dispathced_wgt || recvItemInfo[i].ordered_wgt || '').toFixed(3)
                						 && !thisRow.find('.confirmCheck').is(':checked'))
                				){
                		  changed = true;
                    	 }
                    }
                    
                    if(noComp && $('#salesOrg').val()=="1060" && era_prof=="Y"
                    	&& (area.find('.recvArticleTable input:checkbox:checked').length == 0 || changed)){
                          flag = false;
                          errorContent.push('Please confirm the articles');    
                    }else if(noComp && !($('#salesOrg').val()=="1060" && era_prof=="Y")
                    		&& (area.find('#recvArticleTable input:checkbox:checked').length == 0 || changed)){
                            flag = false;
                          errorContent.push('Please confirm the articles');
                          
                     }                             
                        //}
                        }else if(checkedValue == 'RM' /*&& area.find('#recvArticleTable input:checkbox').is(':visible') */
                                && (area.find('#recvArticleTable input:checkbox:checked').length != area
                                .find('#recvArticleTable tbody tr').length)) {
                        errorContent.push('All Articles : Please confirm the received articles ');
                        }
		        if (errorContent != '' && errorContent.length > 0) {
		            flag = false;
		            var title = 'Receive Articles';
		            $.fn.showCustomMsg(errorContent, error, title);
		        }
		    }else if (checkedValue == 'RC' && $('#SSCCGroup tr').find('.confirmCheck:checked').length == 0) {
                    flag = false;
                    var title = 'Receive Cartons';
		            errorContent.push('Please confirm the received cartons ');
                            $.fn.showCustomMsg(errorContent, error, title);
		    }
		    return flag;		
	}
	
	/*else{	
	
    var area = $('#step-2');
    var flag = true;
    var innerFlag = false;
    var errorContent = [];
    var changeOMFlag = area.find('#searchBoxArea #changeOM').is(':checked');
    var checkedValue = $('.reportRadio').find('input[type="radio"]:checked').val();

    if (checkedValue == 'RM' || checkedValue == 'MF') {
        area
            .find('#recvArticleTable tbody tr')
            .each(
                function() {
                    var article = $(this).attr('id').split('-')[1];

                    if ($(this).find('.recvTextBox').is(':visible') &&
                        $(this).find('.recvTextBox').val().trim() == '') {
                        errorContent.push('Article : ' + article + ' Received Quantity is Mandatory');
                        $(this).find('.recvTextBox').error(
                            'Received Quantity is Mandatory');
                        innerFlag = true;
                    }

                    if ($(this).find('.wtTextBox').is(':visible') &&
                        $(this).find('.wtTextBox').val().trim() == '') {
                        errorContent.push('Article : ' + article + ' Total Weight is Mandatory');
                        $(this).find('.wtTextBox ').error(
                            'Total Weight is Mandatory');
                        innerFlag = true;
                    }

                    if (changeOMFlag) {
                        if ($(this).find('.packOM').val().trim() == '0') {
                            errorContent.push('Article : ' + article + ' Order Multiple should be greater than 0.');
                            $(this).error('Order Multiple should be greater than 0.');
                            innerFlag = true;
                        }

                        var count = 1;

                        $(this).find('.expiryDt').each(function() {

                            if ($(this).is(':visible:not(:disabled)')) {
                                if ($.trim($(this).val()) == '') {
                                    if (count == 1 && $(this).attr('exp_flag')=='Y') {
                                        errorContent.push('Article : ' + article + ' Expiry Date '+count+' is Mandatory.');
                                        $(this).error('Expiry Date is Mandatory');
                                        innerFlag = true;//Removed validation
                                    }
                                } else {
                                    if (!isValidDate($(this).val())) {
                                        errorContent.push('Article : ' + article + ' Expiry Date ' + count + ' is invalid.');
                                        $(this).error('Expiry Date is invalid');
                                        innerFlag = true;
                                    }
                                    if (isPastDate($(this).val())) {
                                        errorContent.push('Article : ' + article + ' Expiry Date ' + count + ' should not be in Past');
                                        $(this).error('Expiry Date should not be in Past');
                                        innerFlag = true;
                                    }
                                }
                            }

                            count++;
                        });
                    }

                });

        if (checkedValue == 'RM' && area.find('#recvArticleTable input:checkbox').is(':visible') && (area.find('#recvArticleTable input:checkbox:checked').length != area
                .find('#recvArticleTable tbody tr').length)) {
            errorContent.push('All Articles : Please confirm the received articles ');
        }

        if (errorContent != '' && errorContent.length > 0) {
            flag = false;
            var title = 'Receive Articles';
            $.fn.showCustomMsg(errorContent, error, title);
        }
    }

    return flag;
}*/
//}
var triggerReceivebyExpOK = function(e) {
    var $elem = e.data.msg;
    receiveByExpStepProceed = true;
    receiveByExpOKProceed = true;
    trigNxtBtn();
    $elem.dialog('close');
};

var triggerReceivebyExpCancel = function(e) {
    var $elem = e.data.msg;
    receiveByExpStepProceed = false;
    receiveByExpOKProceed = false;
    $elem.dialog('close');
};

function validateStepFour() {
    var flag = true;
    var area = $('#step-4');
    var content = [];
    var uldList = getULDList();
    if (area.find('#did').val().trim() == '' && uldList != '' && uldList != undefined
    	/* && commonOrder.order_type != 'STOCK TRANSFER'*/) {
        content.push('Docket ID is Mandatory');
        area.find('#did').error('Docket ID is Mandatory');
        flag = false;
    }else{    	 
    	 area.find('#did').error(null);
    	 area.find('#did').removeClass(errorFieldClass);
    	 flag = true;
    }
    /*	if (area.find('#rec').val().trim() == '') {
    		content += '<li>Receiver is Mandatory</li>';
    		area.find('#rec').error('Receiver is Mandatory');
    		flag = false;
    	}*/
     //Based on email BigW_0858_Clarification on mandatory filed in IBT receiving from tamer.
    /*if ($('#salesOrg').val() == '1060' &&
        area.find('#car').is(':visible') &&
        area.find('#car').val().trim() == '') {
        content.push('Carrier is Mandatory');
        area.find('#car').error('Carrier is Mandatory');
        flag = false;
    }*/
    /*	if (area.find('#sen').val().trim() == '') {
    		content += '<li>Docket ID is Mandatory</li>';
    		area.find('#sen').error('Sender is Mandatory');
    		flag = false;
    	} 
    	if (area.find('#consign').val().trim() == '') {
    		content += '<li>Consignment Note # is Mandatory</li>';
    		area.find('#consign').error('Consignment Note # is Mandatory');
    		flag = false;
    	} 
    	if (area.find('#reg').val().trim() == '') {
    		content += '<li>Rego # is Mandatory</li>';
    		area.find('#reg').error('Rego # is Mandatory');
    		flag = false;
    	} 
    	if (area.find('#tra').val().trim() == '') {
    		content += '<li>Trailer # is Mandatory</li>';
    		area.find('#tra').error('Trailer # is Mandatory');
    		flag = false;
    	}*/

    if (!flag) {
        var title = 'ULD Details';
        $.fn.showCustomMsg(content, error, title);
    }

    return flag;
}

function validateStepThree() {
	   var flag = true;
	   var area = $('#step-3');
	   var content = [];
           var checkArea = area.find('#discrepancyTable input:checkbox:checked');            
	   if($('#salesOrg').val()=="1060" && era_prof=="Y")
           {
            checkArea = area.find('.discrepancyTable tbody tr input:checkbox:checked');
            if( area.find('#SSCCGroupForDescripencies tbody tr').length > 0
		 && (checkArea.length !=  area.find('.discrepancyTable tbody tr input:checkbox').length)){               
                flag = false;
	       content.push('All Articles : Please confirm the discrepancies');
	       $.fn.showCustomMsg(content, error, 'Discrepancies');                          
              }
           }else if (area.find('#discrepancyTable input:checkbox') 
			   && (checkArea.length != area.find('#discrepancyTable tbody tr').length)) {
	       flag = false;
	       content.push('All Articles : Please confirm the discrepancies');
	       $.fn.showCustomMsg(content, error, 'Discrepancies');
	   }
	return flag;	
	}

function skipValidation() {
    return true;
}

function initializeDatePicker() {
    $('.inputDate').datepicker({
        firstDay: 1,
        dateFormat: "dd/mm/yy",
        zIndex: 50

    });
}

function bindAddULDEvents(area) {

    area.find('#addActionBtn').unbind('click');
    area.find('#addActionBtn').click(function() {
        area.find('#tableAddAction').slideToggle(100);
    });

    area.find('#closeLink').unbind('click');
    area.find('#closeLink').click(function() {
        area.find('#tableAddAction').slideToggle(100);
    });

    area.find('#addULD').unbind('click');
    area.find('#addULD').click(function() {
        var toAddArea = area.find('#addULDTable');
        var srArea = area.find('#uldSearchArea');
        addULDRow(srArea, toAddArea);
        //Defect_12849
        $('#req').val('');
    	$('#ret').val('');
    	$('#typeSelect').val('Select');
    });
    if(commonOrder.order_type == 'STOCK TRANSFER')
    	{
    	var srArea = area.find('#uldSearchArea');
    	srArea.find('#ret').prop('disabled',true);
    	}
    
}

function addULDRow(srArea, toAddArea) {
    if (validateULDSearch(srArea, toAddArea)) {
        addToULDTable(srArea, toAddArea);
    }
}

function validateULDSearch(srArea, toAddArea) {
    if (srArea.find('#typeSelect').val().trim() == '') {
        showRecvErrorMsg('Please select Type.', 'Add ULD Type');
        return false;
    } else if (srArea.find('#req').val().trim() == '') {
        showRecvErrorMsg('Please fill Received Quantity.', 'Add ULD Type');
        return false;
    }
    return true;
}

function addToULDTable(srArea, toAddArea) {
    var tempTr = '';
    var selectedElem = srArea.find('#typeSelect').children(':selected');
    var uldId = selectedElem.val();
    var recQty = srArea.find('#req').val();
    var retQty = srArea.find('#ret').val();
	//Defect_12500
	var pld_type = selectedElem.attr('plt_type');
    if (toAddArea.find('tbody').find('tr[id="row-' + uldId + '"]').length >= 1) {
    	$.fn.showCustomMsg(["Selected ULD is already added in the list."], error, 'Receive Articles');
    } else {
	//Defect_12500
        tempTr = '<tr plt_type = "'+pld_type+'" id="row-' + uldId + '"><td>' + selectedElem.text() +
            '</td><td class="centerValue"><input type="#" class="textbox xsmallbox recQty"  maxlength = "3" value="' + recQty + '">' +
            '</td><td class="centerValue" id="uom-1"><input type="#" class="textbox xsmallbox retQty"  maxlength = "3" value="' + retQty + '">' +
            '</td><td class="centerValue">' +
            '<label class="linkBtn" id="deleteULD-1"><label id="delete-' +
            uldId + '" class="deleteRecord">Delete</label>' +
            '</label></td></tr>';

        toAddArea.find('tbody').append(tempTr);
        toAddArea.removeClass('hideBlock');
        toAddArea.find('#row-' + uldId+' .xsmallbox').onlyNumbers();
        bindDeleteULDEvent(toAddArea, uldId);
    }
    if(commonOrder.order_type == 'STOCK TRANSFER')
    	 toAddArea.find('tbody').find('.retQty').prop('disabled',true);
}

function bindDeleteULDEvent(toAddArea, id) {
    var btnId = 'delete-' + id;
    toAddArea.find('#' + btnId).unbind('click');
    toAddArea.find('#' + btnId).click(function() {
        toAddArea.find('#' + btnId).closest('tr').detach();
    });
}

// This method shows the confirmation popup after order header service
function showCancelRecvConfirmation(msg) {
    try {
        $("#dialog-recvConfirmation").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            minHeight: 100,
            maxHeight: 600,
            width: 350
        });

        $("#dialog-recvConfirmation").parent().addClass("popupWrapper");

        $('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#acceptbtn, #rejectbtn')
            .addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#continue')
            .removeClass("hideBlock");
        // $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
        $("#dialog-recvConfirmation").dialog("open");
        $("#dialog-recvConfirmation").find('#message').text(msg);
        $("#dialog-recvConfirmation").parent().find('.ui-dialog-title').text(
            'Confirmation');
        $("#dialog-recvConfirmation").find('#continue').unbind('click');
        $("#dialog-recvConfirmation").find('#continue').click(function() {
            $("#dialog-recvConfirmation").dialog("close");

            var recvParam = getReceiveParam(true, false,'X');
            recvParam.iv_action_flag = 'X';
            callCommonReceivingService(recvParam, true, 'cancel');
        });
        $("#dialog-recvConfirmation").find('#cancel').removeClass('hideBlock');
        $("#dialog-recvConfirmation").find('#cancel').unbind('click');
        $("#dialog-recvConfirmation").find('#cancel').click(function() {
            $("#dialog-recvConfirmation").dialog("close");
        });
    } catch (err) {
        showCancelRecvConfirmation(msg);
    }
}

function callCommonReceivingService(recvParam, redirectFlag, key) {
    //var recvParam = getReceiveParam();
    if (key == 'submit') {
        recvParam.iv_multi_receipt = 'X';
    } else {
        recvParam.iv_multi_receipt = '';
    }
    var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').parent().find('.actualReceiveMethod').text();
    recvParam.iv_order_recv_method = recvMethod;
    recvParam.iv_receive_method = recvMethod;
    console.log(addReceivingTransactionUrl + ' ' + JSON.stringify(recvParam));
    startLoading();
    $.post(addReceivingTransactionUrl, JSON.stringify(recvParam)).done(function(response) {
        console.log(JSON.stringify(response));
        if (redirectFlag) {
            if (checkResult(response, 'typ')) {
                if (response[0].typ == 'S') {
                    navigate(detail);
                    resetFieldsOnPageLoad();
                    $.fn.showCustomMsg([recvSuccessMsg[key]], success, 'Receive Articles');
                    if (key == 'submit') {
                    	callDailyStockCheckService(recvParam);
                        if (deliveryList.length == 0) {
                            //commonOrder.order_status = 'RECEIVED';
                            commonOrder.order_status = ((recvParam.iv_era_partial_recv_flag == 'Y')? partialStatus :'RECEIVED');
                            commonOrder.post_flag = (recvParam.iv_action_flag == 'P') ? 'N' : 'Y';
                            //call service for daily stock check here
                        } else {
                            deliverySegNo = $('.orderReceive').find('#deliverySegNo').val();
                           //Defect - 12769 Fix
                            var recvdSegments  = 0;
                            for (var i = 0; i < deliveryList.length; i++) {
                                if (deliveryList[i].delv_ref_no == deliverySegNo || deliveryList[i].delivery_no == deliverySegNo) {
                                    deliveryList[i].status = 'RECEIVED';
                                    deliveryList[i].post_flag = (recvParam.iv_action_flag == 'P') ? 'N' : 'Y';
                                }else{
                                	if(deliveryList[i].status == 'RECEIVED'){recvdSegments++;}
                                }
                            }
                            recvdSegments++;//currenty delivery should be received.
                            commonOrder.order_status = ((recvdSegments != deliveryList.length)? partialStatus :'RECEIVED');
                        }
                        commonOrder.chilled_temp = recvParam.iv_chilled_temp;
                        commonOrder.frozen_temp = recvParam.iv_frozen_temp;
                        //commonOrder.iv_order_no = commonOrder.order_no;
                        //var param1 =  new orderParam('',commonOrder.order_no,'','','','','','','','');
                        //commonOrder.followUp = getOrderDeliveryInfo;
                        //getOrderBasicDetails(commonOrder);
                        getOrderDeliveryInfo(commonOrder);
                    }else{
                        stopLoading();
                    }
                } else if(response[0].typ == 'R'){
                	 if(key == "save" || key == "cancel"){
                		 $('#mainBackBtn').trigger('click');
                		 $.fn.showCustomMsg(["Order has already been received. Refresh to view updated status. "], error, 'Receive Articles');
                		 stopLoading();
                	 }else{
                		 $.fn.showCustomMsg(["Order has already been received. Refresh to view updated status. "], error, 'Receive Articles');
                		 stopLoading();
                	 }
                }else {
                    $.fn.showCustomMsg([mobiSerErrMsg], error, 'Receive Articles');
                    stopLoading();
                }
            }
        }else{
        	 stopLoading();
        }
    }).fail(function() {
        console.log('daily stock check service failed');
        stopLoading();
    });
}

function callUrqReceivingService(orderNo) {
    var transData = {
        "iv_user_id": $('#loginUserId').val(),
        "iv_delivery_no": getEmptyIfNull(commonOrder.order_no_new),
        "iv_platform": "B",
        "iv_action": "V",
        "iv_session_id": ""
    };

    console.log(getReceivingTransactionUrl + ' ' + JSON.stringify(transData));
    $.post(getReceivingTransactionUrl, JSON.stringify(transData)).done(function(response) {
        if (response != undefined && response != null && response[0].TRANSID != undefined) {
        	
            transInfo = response[0];
            var action_flag = getActionFlagForURQ(orderNo);
            var recvParam = getReceiveParam(false, true,action_flag);
            recvParam.iv_action_flag = getActionFlagForURQ(orderNo);
            recvParam.iv_order_recv_method = '';
            console.log(addReceivingTransactionUrl + ' ' + JSON.stringify(recvParam));
            $.post(addReceivingTransactionUrl, JSON.stringify(recvParam)).done(function(response) {
                console.log(JSON.stringify(response));
                if (response != undefined && response[0].typ != undefined && response[0].typ == 'S') {
                    backActionFromUrq();
                    $('#recvStatusWrapper').find('.description').text(recvSuccessMsg['save']);
                    $('#recvStatusWrapper').removeClass('hideBlock');
                } else {
                    showRecvErrorMsg('Sorry, Some technical issue occured ', 'Update Received Quantity');
                }
            });
        } else {
            showRecvErrorMsg('Sorry, Some technical issue occured ', 'Update Received Quantity');
        }

    });

}

function getActionFlagForURQ(orderNo) {
    var actionFlag = 'L';
    if (deliveryList.length == 0) {
        actionFlag = (commonOrder.post_flag == 'Y') ? 'P' : 'L';
    } else {
        for (var i = 0; i < deliveryList.length; i++) {
            actionFlag = (deliveryList[i].post_flag == 'Y') ? 'P' : 'L';
        }
    }

    return actionFlag;
}

function getReceiveParam(cancelFlag, urqFlag,action_flag, compInd, dispObj, compObj) {
    var area;
    var commonObj = getCommonObject();
    var recvItemsList = [];
    newArticleCount = 0;
    var uldList = [];
    var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val();
    if (urqFlag) {
        area = $('.updateRecvdQty');
    } else {
        area = $('.orderReceive');
    }

    if (!cancelFlag) {
         //Receiving only Components in Draft
        if(compInd =='C' && dispObj != "" && action_flag =="D" && compObj != '' && commonObj.orderType == 'PO'){                
               $('#openCmpntArticles').find('tbody tr').each(function() {
                if($(this).find('.cmpntFlag').is(':checked')){ 
                   	$(this).addClass("confirmReceive");
                       var iv_qty = getEmptyIfNull($(this).find('td .recvTextBox').val());                      
                       $(this).data('obj').qty = iv_qty;
                       $(this).data('obj').received_qty=iv_qty;
                      }else{  
                	   $(this).data('obj').qty = "";
                       $(this).data('obj').received_qty="";
                      $(this).removeClass("confirmReceive");           
                   } 
            	   //recvItemsList.push(formArticlesConentForReceiving(action_flag, $(this), 'C', commonObj,  dispObj.article));
            	   recvItemsList.push(formArticlesConentForReceiving(action_flag, '', 'C', commonObj,  dispObj.article, '', '', '', '', $(this).data('obj')));            	   
            	   if(recvMethod == 'MF' && salesOrg==1060 && era_prof=="Y" && $(this).find('.cmpntFlag').is(':checked') 
            			   &&  $('.'+dispObj.sscc_carton_num+':checked').length == 0){            		 
            		   var recvItems = [];
            		   recvItems = getReceiveItemListExpRecv(urqFlag,action_flag,compInd,dispObj.sscc_carton_num);
            		   if(recvItems != '' && recvItems.length>0){
            			   for(var i=0; i<recvItems.length; i++){
            				   recvItemsList.push(recvItems[i]);
            			   }
            		   }
            	   }
        });
        }else if(salesOrg==1060 && era_prof=="Y"){        
        //Express Receiving Display / Normal Articles in Draft and Submit
        recvItemsList = getReceiveItemListExpRecv(urqFlag,action_flag,compInd);
        }else{
       //Receiving Display / Normal Articles in Draft and Submit
        recvItemsList = getReceiveItemList(urqFlag,action_flag,compInd);
        }
        uldList = getULDList();
        formRecvItemWithZero((isSTO(commonOrder.order_type) || isST(commonOrder.order_type)),recvItemsList);
    }

    if(commonOrder.order_type == 'VENDOR'){
        commonOrder.order_no_new = orderNoDtl[0].order_no;
        if(commonOrder.order_no_new == '' || commonOrder.order_no_new == undefined){
            commonOrder.order_no_new = commonOrder.order_no;    
        }
       } 
    var iv_era_partial_recv_flag = '';
    if($('#SSCCGroup tr') != '' &&  salesOrg==1060 && era_prof=="Y"){    	 
    	 if(recvMethod == 'RC' || recvMethod == 'RM'){
    	 iv_era_partial_recv_flag =  ($('#SSCCGroup tr') != '' &&  salesOrg==1060 && era_prof=="Y" &&
	        ($('#SSCCGroup tr').find('.confirmCheck').length != $('#SSCCGroup tr').find('.confirmCheck:checked').length))?"Y":
	        (salesOrg==1060 && era_prof=="Y")?"N":""; 
    	 }
	     else if(recvMethod == 'MF'){	    
	     var count = 0;
	     $('#SSCCGroup tr').find('.cartonSelect').each(function(){
	    	 var id = $(this).prop('id');
	    	 if($('.'+id+':checked').length > 0){
	    		 count ++;
	    	 }
	     });
	     iv_era_partial_recv_flag =  ($('#SSCCGroup tr') != '' &&  salesOrg==1060 && era_prof=="Y" &&
	    	(count != $('#SSCCGroup tr').find('.cartonSelect').length))?"Y":(salesOrg==1060 && era_prof=="Y")?"N":""; 
	     }
	     iv_era_partial_recv_flag = (iv_era_partial_recv_flag == "N" && commonOrder.order_status == 'DISPATCHED')?"C":iv_era_partial_recv_flag;
    }
    // 17.08 Meat Co Vendor Changes
    var multiple_delivery = (orderNoDtl[0].delivery_no == null || orderNoDtl[0].delivery_no == undefined ||orderNoDtl[0].delivery_no == '')?'':
    	(orderNoDtl[0].delivery_no.split(',').length == 1?'S':'M');
    var param = {
        "iv_site_no": $('#posSite').val(),
        "iv_user_id": $('#loginUserId').val(),
        "iv_pwd": encSapPwd,
        "iv_session_id": "100",
        //"iv_order_no": getEmptyIfNull(commonOrder.order_no_new),
        "iv_order_no":((isPO(commonOrder.order_type) && getEmptyIfNull(area.find('#asnNo').val()) != ''
        		)?getEmptyIfNull(area.find('#asnNo').val()):getEmptyIfNull(commonOrder.order_no_new)),
       // "iv_action_flag": commonObj.action_flag,
        "iv_action_flag": action_flag,
        "iv_order_type": commonObj.orderType,
        "iv_trans_id": commonObj.trans_id,
        "iv_receive_method": "",
        "iv_delivery_date": getEmptyIfNull(commonOrder.delivery_date),
        "iv_invoice_no": (getEmptyIfNull($('.orderReceive #step-4').find('#did').val()) == '' ? getEmptyIfNull(area.find('#invoice').val()) : getEmptyIfNull($('.orderReceive #step-4').find('#did').val())), //invoice no was not sent for warehouse
        "iv_delivery_no": "",
        "iv_asn_no": getEmptyIfNull(area.find('#asnNo').val()),
        "iv_sap_order_type": commonObj.sap_order_type,
        "iv_multi_receipt": "X",
        "iv_supplier_no": getEmptyIfNull(commonOrder.supplier_no),
        "iv_cons_freight": ($('#consign').val()||'').trim(),
        "iv_carrier": ($('#car').val()||'').trim(),
        "iv_rego": getEmptyIfNull(area.find('#reg').val()),
        "iv_trailer": getEmptyIfNull(area.find('#tra').val()),
        "iv_comments": getEmptyIfNull(area.find('#comments').val()),
        "iv_chilled_temp": getEmptyIfNull(area.find('#temperature1').val()),
        "iv_frozen_temp": getEmptyIfNull(area.find('#temperature2').val()),
        "iv_delivery_doc_id": getEmptyIfNull(area.find('#did').val()),
        "iv_item_info": recvItemsList,
        "iv_uld_info": uldList,
        "iv_platform" : "B",
        "iv_era_partial_recv_flag":iv_era_partial_recv_flag,
        "iv_multiple_delivery":((multiple_delivery !=null && multiple_delivery !=undefined )?multiple_delivery:'')
    };
    console.log(param);
    return param;
}


function getReceiveItemListExpRecv(urqFlag,action_flag,comInd,compId) {
    var recvItemsList = [];
    var recvItem = {};
    var tempObj = {};
    var lineCount = 0;
    var $tblArea;
    var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val();
    var commonObj = getCommonObject();
    var excepPartRecvCheck = 0;
    if(recvMethod == 'MF' || recvMethod =='RC'){
   $('#SSCCGroup tr').find('.cartonSelect').each(function(){
        var id = $(this).prop('id');
        $tblArea = $('#SSCCGroup').find('tr[data-tt-id="'+id+'_sub"]');
        if(($(this).is(':checked') && recvMethod == 'RC') || ((recvMethod == 'RM' && action_flag == 'D') || (recvMethod == 'MF' && ($('.'+id+':checked').length > 0 || id== compId))) || 
        ($(this).is(':checked') && (recvMethod == 'RM') &&  action_flag != 'D')){        
        $tblArea.find('tbody tr').each(function() {
                if(recvMethod == 'RC' && !$(this).find('.confirmCheck').is(':disabled')){
                   $(this).addClass("confirmReceive");
                   if($(this).find('.displayAttrFlag').html() != 'Y'){
                   recvItemsList.push(formArticlesConentForReceiving(action_flag, $(this), ($(this).find('.displayAttrFlag').html() == 'Y')?'D':'', 
                   commonObj, '', tempObj, lineCount, recvItem, recvItemsList, ''));  
                   }
                }
        	    else if(recvMethod != 'RC' && ((compId != undefined && compId != "") || 
        	    		action_flag != 'D' || (action_flag == 'D' && $(this).find('.confirmCheck').is(':checked'))) && 
        			!$(this).find('.confirmCheck').is(':disabled')){
	               recvItemsList.push(formArticlesConentForReceiving(action_flag, $(this), ($(this).find('.displayAttrFlag').html() == 'Y')?'D':'', 
                   commonObj, '', tempObj, lineCount, recvItem, recvItemsList, ''));
                   excepPartRecvCheck++;
        	}
        });
        if(action_flag != 'D' && !jQuery.isEmptyObject(componentArtMap) && commonObj.orderType =="PO"){
             for(key in componentArtMap){
                if(key != "" && componentArtMap[key] != "" && key.split("_")[1] != '' && key.split("_")[1] == id && key.split("_")[0] != ''){
                var list = componentArtMap[key];
                if(list != undefined && list !="")
                for(var i=0; i<list.length; i++){
               // if(list[i].received_qty != undefined && list[i].received_qty != null && list[i].received_qty != ""){    
                 recvItemsList.push(formArticlesConentForReceiving(action_flag, '', 'C', commonObj, key.split("_")[0], tempObj, lineCount, recvItem, recvItemsList, list[i]));
                 excepPartRecvCheck++;
               // }
                }
                }
        }
        }
        }else{
                $('#SSCCGroup').find('tr[data-tt-id="'+id+'_sub"]').find('tbody tr').each(function(){  
                        $(this).removeClass("confirmReceive");
                });
        }
     });
    }else{
    	var cartonList = [];
    	$('#SSCCGroup tr').each(function(){ 
            if($(this).find('.confirmCheck').val() != undefined)
            	cartonList.push($(this).find('.confirmCheck').val()); 
        });
    	cartonList = unique(cartonList);    	
    	for(var i in cartonList){
    	       // var id = $(this).prop('id');
                var count = 0;
    		var id =cartonList[i];
    	        $tblArea = $('#SSCCGroup').find('tr[data-tt-id="'+id+'_sub"]');
    	        if(recvMethod == 'RM' /*&& action_flag == 'D'*/){        
    	        $tblArea.find('tbody tr').each(function() {
    	            if((/*action_flag != 'D' ||*/ (/*action_flag == 'D' &&*/ $(this).find('.confirmCheck').is(':checked'))) && !$(this).find('.confirmCheck').is(':disabled')){
    		           recvItemsList.push(formArticlesConentForReceiving(action_flag, $(this), ($(this).find('.displayAttrFlag').html() == 'Y')?'D':'', 
    	                   commonObj, '', tempObj, lineCount, recvItem, recvItemsList, ''));
    	                   excepPartRecvCheck++;
    	        	}
    	        });
    	        $('.'+cartonList[i]).each(function(){  	            
    	        	if($(this).is(':checked')){
    	             count++;
    	             }
    	         });
    	      	    	  
    	      
    	        if(action_flag != 'D' && !jQuery.isEmptyObject(componentArtMap) && count == $('.'+cartonList[i]).length && commonObj.orderType =="PO"){
    	             for(key in componentArtMap){
    	                if(key != "" && componentArtMap[key] != "" && key.split("_")[1] != '' && key.split("_")[1] == id && key.split("_")[0] != ''){
    	                var list = componentArtMap[key];
    	                if(list != undefined && list !="")
    	                for(var i=0; i<list.length; i++){
    	               // if(list[i].received_qty != undefined && list[i].received_qty != null && list[i].received_qty != ""){    
    	                 recvItemsList.push(formArticlesConentForReceiving(action_flag, '', 'C', commonObj, key.split("_")[0], tempObj, lineCount, recvItem, recvItemsList, list[i]));
    	                 excepPartRecvCheck++;
    	               // }
    	                }
    	                }
    	        }
    	        }
    	    
    	        }else{
    	                $('#SSCCGroup').find('tr[data-tt-id="'+id+'_sub"]').find('tbody tr').each(function(){  
    	                        $(this).removeClass("confirmReceive");
    	                });
    	        }
    	     }
    	    }
    return recvItemsList;
}



function getReceiveItemList(urqFlag,action_flag) {
    var recvItemsList = [];
    var recvItem = {};
    var tempObj = {};
    var lineCount = 0;
    var $tblArea;
    var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val();
    var commonObj = getCommonObject();
    if (urqFlag)
        $tblArea = $('.updateRecvdQty').find('#editArticleTable');     
    else if(salesOrg==1060 && era_prof=="Y")    	
        $tblArea = $('.orderReceive').find('.recvArticleTable');       
    else
        $tblArea = $('.orderReceive').find('#recvArticleTable');       
    console.log('d');
    if (recvMethod == 'MM') {
        for (var i = 0; i < recvItemInfo.length; i++) {
            lineCount = recvItemInfo[i].article_line;
            //if (lineCount.length == 5)
            if(lineCount != null) lineCount = lineCount.trim();
                lineCount = padzero(lineCount,5);
            //			lineCount=lineCount+10;
            tempObj = getRecvInFullObj(recvItemInfo[i]);
            //17.04 change
            if (commonObj.orderType == 'IBT' || commonObj.orderType == 'STO'){
           	 tempObj.iv_receive_method = 'F'; 
            }else if(commonObj.orderType == 'PO' && source_flag == 'D'){
           	 tempObj.iv_receive_method = 'F'; 
           	if((!$('.tempDtl ').hasClass('hideBlock')) && (Number($('#temperature1').val()) > Number(tempObj.main_obj.temperature_range_max ))&& tempObj.main_obj.temp_chk_flag=="Y" ){           	
           		 tempObj.iv_receive_method = 'E';
               }
            }else
               tempObj.iv_receive_method = '';
            //if (tempObj.new_om != undefined && (tempObj.new_om == null || tempObj.new_om == '' || tempObj.new_om == 0))
            tempObj.new_om = (tempObj.main_obj.dispatched_om || '') == '' ? tempObj.main_obj.om : tempObj.main_obj.dispatched_om;
            recvItem = formRecvItem(tempObj, lineCount, tempObj.main_obj,action_flag,(commonObj.orderType == 'IBT' || commonObj.orderType == 'STO'),tempObj.main_obj.order_no);
            recvItemsList.push(recvItem);
        }
    } else {
        $tblArea.find('tbody tr').each(function() {
        	if((action_flag != 'D' || (action_flag == 'D' && $(this).find('.confirmCheck').is(':checked'))) && !$(this).find('.confirmCheck').is(':disabled')){
	           recvItemsList.push(formArticlesConentForReceiving(action_flag, $(this), ($(this).find('.displayAttrFlag').html() == 'Y')?'D':'', 
                   commonObj, '', tempObj, lineCount, recvItem, recvItemsList, ''));
        	}else if(recvMethod == 'MF' && !$(this).find('.confirmCheck').is(':disabled')){
        		 recvItemsList.push(formArticlesConentForReceiving(action_flag, $(this), ($(this).find('.displayAttrFlag').html() == 'Y')?'D':'', 
                         commonObj, '', tempObj, lineCount, recvItem, recvItemsList, ''));
        	}
        });
        if(/*recvMethod == 'MF' &&*/ action_flag != 'D' && !jQuery.isEmptyObject(componentArtMap) && commonObj.orderType =="PO"){
             for(key in componentArtMap){
                if(key != "" && componentArtMap[key] != "" && key.split("_")[0] != ''){
                var list = componentArtMap[key];
                if(list != undefined && list !="")
                for(var i=0; i<list.length; i++){
               /* if(list[i].received_qty != undefined && list[i].received_qty != null && list[i].received_qty != ""
                	&& list[i].qty != undefined && list[i].qty != null && list[i].qty != ""){    */
                 recvItemsList.push(formArticlesConentForReceiving(action_flag, '', 'C', commonObj, key.split("_")[0], tempObj, lineCount, recvItem, recvItemsList, list[i]));
                //}
        }
        }
        }    
        }

    }

    return recvItemsList;
}

function formArticlesConentForReceiving(action_flag, item, isComponent, commonObj, displayArticle, tempObj, lineCount, recvItem, recvItemsList, object){
       // var recItemNew = {};
        var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val();       
	        tempObj = getArticleObj(item, isComponent, displayArticle, object, action_flag);                                           
		if (commonObj.orderType == 'IBT' || commonObj.orderType == 'STO') {
	         if ((tempObj.new_om !='' && item != '' && item != null &&  Number(item.find('[om_org]').attr('om_org')) != Number(tempObj.new_om)) || 
	        		 (item != '' && item != null && Number(tempObj.qty)!= Number(item.find('[qty_org]').attr('qty_org')))
	                || (item != '' && item != null && Number(tempObj.random_wgt)!= Number(item.find('[wgt_org]').attr('wgt_org'))))
	                    tempObj.iv_receive_method = 'E';
	                else
	                    tempObj.iv_receive_method = 'F';
	            } else {
	                tempObj.iv_receive_method = ''; 
	            }
                if(recvMethod == 'RC' && salesOrg==1060 && era_prof=="Y")
                   tempObj.iv_receive_method = 'F';
                else if((recvMethod == 'RM' || recvMethod == 'MF') && salesOrg==1060 && era_prof=="Y")
                   tempObj.iv_receive_method = '';     
	            if (tempObj.new_om == '' && action_flag != 'D' && action_flag != 'S')
                    tempObj.new_om = (tempObj.main_obj.dispatched_om || '') == '' ? tempObj.main_obj.om : tempObj.main_obj.dispatched_om;
                else if(tempObj.new_om == ''){
                	tempObj.new_om == null;
                }
	            if (tempObj.article_line != undefined && tempObj.article_line != null && tempObj.article_line != '') {
	                lineCount = Number(tempObj.article_line);
	                lineCount = padzero(lineCount,5);
	            } else{       
	            	//newArticleCount++;
	            	current_line_count = current_line_count +10;
                    lineCount = padzero((current_line_count), 5);                        
                }
	   return formRecvItem(tempObj, lineCount, tempObj.main_obj,action_flag,(commonObj.orderType == 'IBT' || commonObj.orderType == 'STO'),tempObj.main_obj.order_no);
}

function formRecvItem(tempObj, lineCount, main_obj,action_flag,isSTOorIBT) {

	/*var adj_qty = '';
	var adj_uom = '';
	var screenCode = '';
	var isOMChangedFlag = false;
	var isQTYChangedFlag = false;
	
	if($(".receiveOuterDiv").is(":visible")){//receive order
		screenCode = 'RXNG';
	}else if($("#updateQtyTbl_head").is(":visible")){//updae rx order qty
		screenCode = 'UPD';
	}
	
	if(tempObj.qty != main_obj.order_qty){
		isQTYChangedFlag = true;
	}
	
	if(tempObj.new_om != undefined || tempObj.new_om != ''){
		if(main_obj.om != tempObj.new_om){
			isOMChangedFlag = true;
		}		
	}
	
	
	//Determine adj_qty and adj_uom values
	if(screenCode == 'RXNG'){
		if(main_obj.random_wgt_flg == 'Y'){//if random weight article
			if(tempObj.new_om == undefined || tempObj.new_om == ''){
				//adj_qty = Number(tempObj.qty) * Number(main_obj.om);
				//adj_uom = main_obj.base_uom;
			}else{
				adj_qty = Number(tempObj.qty) * Number(main_obj.new_om);
				adj_uom = main_obj.base_uom;
			}			
		}else{//if normal article			
			adj_qty = tempObj.qty;
			adj_uom = main_obj.order_uom;			
		}
	}else if(screenCode == 'UPD'){
		if(main_obj.random_wgt_flg == 'Y'){//if random weight article
			adj_qty = Number(tempObj.qty) * Number(main_obj.new_om) - Number(main_obj.order_qty) * Number(main_obj.om);
			adj_uom = main_obj.base_uom;
		}else{//if normal article
			if(isOMChangedFlag && isQTYChangedFlag){//both qty and om changed
				adj_qty = (Number(tempObj.qty) * Number(main_obj.order_qty)) - (Number(tempObj.new_om) * Number(main_obj.order_uom));
				adj_uom = main_obj.base_uom;
			}else if(isOMChangedFlag){//only om changed,qty not changed
				adj_qty = (Number(tempObj.qty) * Number(main_obj.order_qty)) - (Number(tempObj.new_om) * Number(main_obj.order_uom));
				adj_uom = main_obj.base_uom;
			}else if(isQTYChangedFlag){//only qty changed,om not changed
				adj_qty = Number(tempObj.qty) - Number(main_obj.order_qty);
				adj_uom = main_obj.order_uom;
			}else{//if no cahnge
				adj_qty = tempObj.qty;
				adj_uom = main_obj.order_uom;
			}
		}
	}*/
	var key = (main_obj.sscc_carton_num != undefined && main_obj.sscc_carton_num != "")?
			tempObj.iv_display_article+"_"+main_obj.sscc_carton_num:tempObj.iv_display_article;
        if(tempObj.iv_display_article != ""  && key != ""  && componentArtMap[key] != "" ){
           var list = componentArtMap[key];
           if(list != undefined && list !="")
           for(var i=0; i<list.length; i++){
              if(list[i].article == tempObj.article){                   
                   list[i].qty = tempObj.qty; 
                   list[i].received_qty = tempObj.qty;
                   /*if(list[i].received_qty != '' && list[i].received_qty != null){
                     list[i].selected = true;      
                   }*/
              }
           }
        }
    var iv_adj_qty_om = ((tempObj.new_om != undefined && tempObj.new_om != '' &&  tempObj.new_om != null)?tempObj.new_om:
    	(main_obj.dispatched_om != undefined && main_obj.dispatched_om != '' &&  main_obj.dispatched_om != null? main_obj.dispatched_om:main_obj.om));  
    var recvItem = {
	"iv_article": getStringinParam((tempObj.article == null ? "":(isNaN(tempObj.article)?(tempObj.article).toString():tempObj.article))),
        "iv_uom": getStringinParam((tempObj.article_uom == null ? "":(isNaN(tempObj.article_uom)?(tempObj.article_uom).toString():tempObj.article_uom))),
        "iv_qty": getStringinParam((containsNotRangedItem ? (notRangedAllowed ? tempObj.qty : (main_obj.ranged_flag != 'Y' ? '0' : tempObj.qty)) : tempObj.qty)),
        "iv_line_no": getStringinParam(padzero(lineCount.trim(), 5)),
        "iv_new_om": getStringinParam((containsNotRangedItem ? (notRangedAllowed ? (tempObj.new_om == undefined || tempObj.new_om == '' ? null : tempObj.new_om) : (main_obj.ranged_flag != 'Y' ? '0' : tempObj.new_om)) : (tempObj.new_om == undefined  || tempObj.new_om == '' ? null : tempObj.new_om))),
        "iv_expiry_date1": getStringinParam((getEmptyIfNull(tempObj.expiry_date1) != '' || action_flag=='D' || action_flag == 'S') ? convertDateStringToMMDDYYYY(tempObj.expiry_date1) : ''),
        "iv_expiry_date2": getStringinParam(convertDateStringToMMDDYYYY(tempObj.expiry_date2)),
        "iv_expiry_date3": getStringinParam(convertDateStringToMMDDYYYY(tempObj.expiry_date3)),
        "iv_expiry_date4": getStringinParam(convertDateStringToMMDDYYYY(tempObj.expiry_date4)),
        "iv_expiry_date5": getStringinParam(convertDateStringToMMDDYYYY(tempObj.expiry_date5)),
        "iv_random_ea_as_uom": "",
        "iv_random_wgt_flag": getStringinParam(main_obj.random_wgt_flg == undefined ? '' : main_obj.random_wgt_flg),
        "iv_random_weight_qty":(main_obj.random_wgt_flg == 'Y')?getStringinParam((containsNotRangedItem ? (notRangedAllowed ? (tempObj.random_wgt_qty) : (main_obj.ranged_flag != 'Y' ? '0' : tempObj.random_wgt_qty)) : (tempObj.random_wgt_qty))):'',
        "iv_random_weight_uom":getStringinParam(tempObj.random_wgt_uom),
        "iv_random_weight": getStringinParam((containsNotRangedItem ? (notRangedAllowed ? (tempObj.random_wgt) : (main_obj.ranged_flag != 'Y' ? '0' : tempObj.random_wgt)) : (tempObj.random_wgt))),
        "iv_unknow_ref_flag": "",
        "iv_tun": "",
        "iv_ean": "",
        "iv_exidv":getStringinParam(main_obj.sscc_carton_num == undefined ? '' : main_obj.sscc_carton_num) ,
        "iv_article_tun_flag": "006",
        "main_obj": '',//main_obj,
        "iv_receive_method": getStringinParam(tempObj.iv_receive_method),
        "iv_base_order_no": getStringinParam(tempObj.main_obj.order_no || ((recvItemInfo != '' && recvItemInfo.length >0 && recvItemInfo[0].order_no != '')?recvItemInfo[0].order_no:'') || ''),
        //R18.01 - Meat Co - Weighted Article Receiving - Changes
        "iv_adj_qty": getStringinParam(((main_obj.random_wgt_flg == 'Y' || main_obj.weight_flag == 'Y') ? tempObj.random_wgt :((isSTO(commonOrder.order_type))?(Number(tempObj.qty) * Number(iv_adj_qty_om)):tempObj.qty))),
        "iv_adj_qty_uom": getStringinParam(((main_obj.random_wgt_flg == 'Y' || main_obj.weight_flag == 'Y') ? main_obj.base_uom : ((isSTO(commonOrder.order_type))? main_obj.base_uom:tempObj.article_uom))),
		"iv_adj_pi_qty": getStringinParam(main_obj.random_wgt_flg == 'Y' ? tempObj.random_wgt_qty:''),
		"iv_base_uom": getStringinParam(main_obj.base_uom||''),
		"iv_pack_size_base": getStringinParam(main_obj.pack_size_base||''),
		"iv_article_cat_id": getStringinParam(main_obj.article_cat_id||''),
		"iv_pbd_flag": getStringinParam(main_obj.pbd_flag||''),
		"iv_display_ind":getStringinParam(tempObj.iv_display_ind),
		"iv_display_article":getStringinParam(tempObj.iv_display_article),
		"iv_art_delivery_no":((main_obj.delivery_no !=null && main_obj.delivery_no !=undefined)?getStringinParam(main_obj.delivery_no):''), // 17.08 Meat Co Vendor Changes
		"iv_zero_qty_flag":'N'  //Defect - 11767 - Indicated as Y only for substitution articles in ADD RECEIVING TRANSACTION
    };
	if(containsNotRangedItem && !notRangedAllowed && main_obj.ranged_flag != 'Y'){
		recvItem.iv_adj_qty = '0';
		recvItem.iv_adj_pi_qty = '0';
		recvItem.iv_adj_qty = '0';
		if(isSTOorIBT){
			recvItem.iv_receive_method = 'E';
		}
	}
	if(globalTempFlag && main_obj.temp_chk_flag == 'Y'){
		recvItem.iv_adj_qty = '0';
		recvItem.iv_adj_pi_qty = '0';
		recvItem.iv_adj_qty = '0';
		recvItem.iv_qty = '0';
		recvItem.iv_new_om = '0';
		recvItem.iv_random_weight = '0';
		recvItem.iv_random_weight_qty = '0';
		if(isSTOorIBT){
			recvItem.iv_receive_method = 'E';
		}
	}

    return recvItem;
}
function formRecvItemWithZero(isSTOorIBT,receiveList) {
	for(var i = 0;i<recvItemInfo_zero.length;i++){
		var recvItem = {
			"iv_article": getStringinParam(recvItemInfo_zero[i].article),
			"iv_uom": getStringinParam(((recvItemInfo_zero[i].dispatched_qty_uom||'')!='' ?  recvItemInfo_zero[i].dispatched_qty_uom : getEmptyIfNull(recvItemInfo_zero[i].order_uom))),
			"iv_qty": '0',
			"iv_line_no": getStringinParam(padzero(recvItemInfo_zero[i].article_line.trim(), 5)),
			"iv_new_om": getStringinParam(((recvItemInfo_zero[i].dispatched_om||'')!='' ?  recvItemInfo_zero[i].dispatched_om : getEmptyIfNull(recvItemInfo_zero[i].om))),
			"iv_expiry_date1": '',
			"iv_expiry_date2": '',
			"iv_expiry_date3": '',
			"iv_expiry_date4": '',
			"iv_expiry_date5": '',
			"iv_random_ea_as_uom": "",
			"iv_random_wgt_flag": getStringinParam(recvItemInfo_zero[i].random_wgt_flg),
			"iv_random_weight_qty": '',
			"iv_random_weight_uom": '',
			"iv_random_weight": '',
			"iv_unknow_ref_flag": "",
			"iv_tun": "",
			"iv_ean": "",
			"iv_exidv":getStringinParam(recvItemInfo_zero[i].sscc_carton_num == undefined ? '' : recvItemInfo_zero[i].sscc_carton_num) ,
			"iv_article_tun_flag": "006",
			"main_obj": '',//list[i],
			"iv_receive_method": 'F',
			"iv_base_order_no": getStringinParam(recvItemInfo_zero[i].order_no|| ''),
			"iv_adj_qty": 0,
			//Defect_12769 - Fix
			"iv_adj_qty_uom": getStringinParam(((recvItemInfo_zero[i].random_wgt_flg == 'Y' || recvItemInfo_zero[i].weight_flag == 'Y') ? recvItemInfo_zero[i].base_uom : ((isSTOorIBT)? recvItemInfo_zero[i].base_uom:(getStringinParam(((recvItemInfo_zero[i].dispatched_qty_uom||'')!='' ?  recvItemInfo_zero[i].dispatched_qty_uom : getEmptyIfNull(recvItemInfo_zero[i].order_uom))))))),
			"iv_adj_pi_qty": '0',
			"iv_base_uom": getStringinParam(recvItemInfo_zero[i].base_uom||''),
			"iv_pack_size_base": getStringinParam(recvItemInfo_zero[i].pack_size_base||''),
			"iv_article_cat_id": getStringinParam(recvItemInfo_zero[i].article_cat_id||''),
			"iv_pbd_flag": getStringinParam(recvItemInfo_zero[i].pbd_flag||''),
			"iv_display_ind":'',
			"iv_display_article":'',
			"iv_art_delivery_no":((recvItemInfo_zero[i].delivery_no !=null && recvItemInfo_zero[i].delivery_no !=undefined)?getStringinParam(recvItemInfo_zero[i].delivery_no):''), // 17.08 Meat Co Vendor Changes
			"iv_zero_qty_flag":'Y'  //Defect - 11767 - Indicated as Y only for substitution articles in ADD RECEIVING TRANSACTION
		};
		if(containsNotRangedItem && !notRangedAllowed && recvItemInfo_zero[i].ranged_flag != 'Y'){
			recvItem.iv_adj_qty = '0';
			recvItem.iv_adj_pi_qty = '0';
			recvItem.iv_adj_qty = '0';
			if(isSTOorIBT){
				recvItem.iv_receive_method = 'E';
			}
		}
		if(globalTempFlag && recvItemInfo_zero[i].temp_chk_flag == 'Y'){
			recvItem.iv_adj_qty = '0';
			recvItem.iv_adj_pi_qty = '0';
			recvItem.iv_adj_qty = '0';
			recvItem.iv_qty = '0';
			recvItem.iv_new_om = '0';
			recvItem.iv_random_weight = '0';
			recvItem.iv_random_weight_qty = '0';
			if(isSTOorIBT){
				recvItem.iv_receive_method = 'E';
			}
		}
		receiveList.push(recvItem);
	}
}
function getStringinParam(field){
	return (field == null ? "":(isNaN(field)?field.toString():field));
}
function getULDList() {
    var uldList = [];
    var uldItem = {};
    var $tblArea;

    $tblArea = $('.orderReceive').find('#addULDTable');

    $tblArea.find('tbody tr').each(function() {

        uldItem = {
            "iv_uld_id": getEmptyIfNull($(this).attr('id').split('-')[1]),
            "iv_uld_recv_qty": getEmptyIfNull($(this).find('.recQty').val()),
            "iv_uld_return_qty": getEmptyIfNull($(this).find('.retQty').val()),
            //Defect_12500
            "iv_plt_type": getEmptyIfNull($(this).attr('plt_type'))
        };

        uldList.push(uldItem);
    });

    return uldList;
}

function getCommonObject() {
    var recvMethod = '';
    var sapOrderType = '';
    var orderType = '';

    if (commonOrder.order_type == 'VENDOR') {
        recvMethod = '';
        orderType = 'PO';
        sapOrderType = 'DGR';
    } else if (commonOrder.order_type == 'WAREHOUSE') {
        recvMethod = 'IBT';
        orderType = 'STO';
        sapOrderType = 'WGR';
    } else if (commonOrder.order_type == 'STOCK TRANSFER') {
        orderType = 'IBT';
        sapOrderType = 'IRE';
    }

    var commonObject = {
        "action_flag": "S",
        "trans_id": getEmptyIfNull(transInfo.TRANSID),
        "recv_method": recvMethod,
        "sap_order_type": sapOrderType,
        "orderType": orderType
    };

    return commonObject;
}

function getArticleObj($tr, dispInd, dispArticle, object, actionFlag) {
	 var recvMethod = $('.reportRadio').find('input[type="radio"]:checked').val(); 
    var obj = ($tr ==''?object:$tr.data('obj'));
    var wt_qty = '';
    var wt_uom = '';
    var random_wt = '';
    var count = 1;
    var iv_qty = '';
    var iv_art_uom = ((obj.dispatched_qty_uom||'')!='' ?  obj.dispatched_qty_uom : getEmptyIfNull(obj.order_uom));
   // var notRngedWgt = '';
    //R18.01 - Meat Co - Weighted Article Receiving - Changes
    if($tr != ''){
    if (obj.random_wt_flag == 'Y' || obj.weight_flag == 'Y') {
		if(obj.ranged_flag != 'Y'){
    		//Defect_4554 Change
			if(iv_art_uom != 'KG' && iv_art_uom != 'KGM')
			wt_qty = Number(getEmptyIfNull(Number($tr.find('.notRangedRecvField').text()))) * (obj.pi_om);
			else
			wt_qty = Number(getEmptyIfNull(Number($tr.find('.notRangedRecvField').text())));
			wt_uom = '';
			random_wt = getEmptyIfNull(Number($tr.find('.recvTotUnits strong').text()));
				/*if (obj.rnd_wgt!=null && obj.rnd_wgt!=undefined && obj.rnd_wgt.toString()!='') {
					notRngedWgt = obj.rnd_wgt;
				} else if(obj.dispathced_wgt!=null && obj.dispathced_wgt!=undefined && obj.dispathced_wgt.toString()!=''){
					notRngedWgt = obj.dispathced_wgt;
				} else if(obj.ordered_wgt!=null && obj.ordered_wgt!=undefined && obj.ordered_wgt.toString()!=''){
					notRngedWgt = obj.ordered_wgt;
				}
			
			random_wt = getEmptyIfNull(Number(notRngedWgt));*/
		}else{
    		//Defect_4554 Change
			if(iv_art_uom != 'KG' && iv_art_uom != 'KGM')
			wt_qty = Number(getEmptyIfNull($tr.find('.recvTextBox').val())) * (obj.pi_om);
			else
			wt_qty = Number(getEmptyIfNull($tr.find('.recvTextBox').val()));
			wt_uom = '';
			random_wt = getEmptyIfNull($tr.find('.wtTextBox').val());
		}
		//Defect_4554 Change
		//wt_qty = isST(commonOrder.order_type) && ((Number(getEmptyIfNull($tr.find('.recvTextBox').val())) == Number(obj.order_qty))) && (obj.ordered_pi_qty||'')!='' ?  Number(obj.ordered_pi_qty||'') : wt_qty;
    }else {
        wt_qty = null;
        wt_uom = null;
        random_wt = null;
    }   
    //4554 change   R18.01 - Meat Co - Weighted Article Receiving - Changes
    /* Commented for the 12792 Fix - Need to get Clarification from Guru need of this block
     * if(iv_art_uom == 'KG' && (obj.weighted_flag == 'Y' || obj.random_wt_flag == 'Y' || obj.weight_flag == 'Y') && $tr.find('.wtTextBox').length!= 0){
		iv_qty = getEmptyIfNull($tr.find('.wtTextBox').val());
	}*/
    if(((obj.weighted_flag == 'Y' && iv_art_uom == 'KG') ||obj.weight_flag == 'Y') && $tr.find('.wtTextBox').length!= 0){
		iv_qty = getEmptyIfNull($tr.find('.wtTextBox').val());
	}else if ($tr.find('.recvTextBox').length != 0) {
        iv_qty = getEmptyIfNull($tr.find('td .recvTextBox').val());
    } else {
        iv_qty = getEmptyIfNull($tr.find('.notRangedRecvField').html());
    }
    //obj["sscc_carton_num"] = $tr.find('.confirmCheck').attr("value");
    }else if(object != undefined && object!= ''){
    	iv_qty = object.qty;
    	if(recvMethod =='MF' || (recvMethod =='RC' && actionFlag =='P')){    
    	iv_qty = (object.received_qty != '')?object.received_qty:object.qty;
        iv_qty = ((iv_qty != '' && iv_qty != undefined)?iv_qty:
        	((object.dispatched_qty != undefined && object.dispatched_qty != null 
           	 && $.trim(object.dispatched_qty) != '')? object.dispatched_qty:Number(object.order_qty || '')));
    	}
       //var recvWtValue = ((object.dispathced_wgt != undefined && object.dispathced_wgt != null 
       //&& $.trim(object.dispathced_wgt) != '')? object.dispathced_wgt : Number(object.ordered_wgt || '');
        if (object.random_wt_flag == 'Y') {
                //wt_qty = Number(iv_qty) * (object.pi_om);
        		//Defect_4554 Change
                wt_qty = isST(commonOrder.order_type) && ((object.ordered_pi_qty||'') != '') ? Number(object.ordered_pi_qty||'') : (Number(iv_qty) * (object.pi_om));
                wt_uom = '';
                random_wt = '';//recvWtValue;
        } else {
                wt_qty = null;
                wt_uom = null;
                random_wt = null;
        }
    }
    if(getEmptyIfNull(obj.article_line) == ''){
    	current_line_count = current_line_count +10;
        lineCount = padzero((current_line_count), 5); 
     	obj.article_line = (lineCount);
    }	
	//Defect_12683
	if(obj.random_wt_flag == 'Y' && ((wt_qty||0) == 0 || (random_wt||0) == 0 || (iv_qty||0) == 0)){
		wt_qty = '0';
		random_wt = '0';
		iv_qty = '0';
	}
    var articleObj = {
        "article": getEmptyIfNull(obj.article),
        "article_uom": iv_art_uom,
        "article_line": getEmptyIfNull(obj.article_line),
        "qty": iv_qty,
        "new_om": getEmptyIfNull($tr !=''?$tr.find('.packOM').val():''),
        "expiry_date1": '',
        "expiry_date2": '',
        "expiry_date3": '',
        "expiry_date4": '',
        "expiry_date5": '',
        "random_wgt_flag": (obj.random_wt_flag != undefined && obj.random_wt_flag == 'Y') ? obj.random_wt_flag : 'N',
        "random_wgt_qty": (wt_qty||'').toString(),
        "random_wgt_uom": wt_uom,
        "random_wgt": (random_wt||'').toString(),
        "main_obj": obj,
        "iv_display_ind":dispInd,
        "iv_display_article":dispArticle
    };
    if($tr != '')
    $tr.find('.expiryDt:not(:disabled)').each(function() {
        articleObj['expiry_date' + count] = getEmptyIfNull($.trim($(this).val()));
        count++;
    });

    return articleObj;
}

function getRecvInFullObj(obj) {
    var wt_qty = '';
    var wt_uom = '';
    var random_wt = '';
    var recvValue = ($.trim(obj.dispatched_qty) != '') ? obj.dispatched_qty : obj.order_qty;
    var recvWtValue = (obj.dispathced_wgt != undefined && obj.dispathced_wgt != null && $.trim(obj.dispathced_wgt) != '') ? obj.dispathced_wgt : Number(obj.ordered_wgt || '');
  //R18.01 - Meat Co - Weighted Article Receiving - Changes
    if (obj.random_wt_flag == 'Y' || obj.weight_flag == 'Y') {
		//Defect_4554 Change
		wt_qty = isST(commonOrder.order_type) && ((obj.ordered_pi_qty||'') != '') ? Number(obj.ordered_pi_qty||'') : ((obj.dispatched_qty_uom||obj.order_uom) == obj.base_uom ? (Number(recvValue) * Number(obj.pi_om_base)) : (Number(recvValue) * (obj.pi_om)));
        wt_qty = (wt_qty!= null && wt_qty != '' && wt_qty != '0' && !Number.isInteger(Number(wt_qty)))? (Number(wt_qty).toFixed(3) || ''):wt_qty;
		wt_uom = '';
		random_wt = recvWtValue;
	    random_wt = (random_wt!= null && random_wt != '' && random_wt != '0' && !Number.isInteger(Number(random_wt)))? (Number(random_wt).toFixed(3) || ''):random_wt;       
        //Defect_12683
	    if((wt_qty||0) == 0 || (random_wt||0) == 0 || (recvValue||0) == 0){
	    	wt_qty = 0;
	    	random_wt = 0;
	    	recvValue = 0;
	    }
    } else {
        wt_qty = null;
        wt_uom = null;
        random_wt = null;
    }
    var articleObj = {
        "article": getEmptyIfNull(obj.article),
        "article_uom": ((obj.dispatched_qty_uom||'')!='' ?  obj.dispatched_qty_uom : getEmptyIfNull(obj.order_uom)),
        "article_line": getEmptyIfNull(obj.article_line),
        "qty": (recvValue||'').toString(),
        "new_om": obj.om,
        "expiry_date1": '',
        "expiry_date2": '',
        "expiry_date3": '',
        "expiry_date4": '',
        "expiry_date5": '',
        "random_wgt_flag": (obj.random_wt_flag != undefined && obj.random_wt_flag == 'Y') ? obj.random_wgt_flag : 'N',
        "random_wgt_qty": (wt_qty||'').toString(),
        "random_wgt_uom": wt_uom,
        "random_wgt": (random_wt||'').toString(),
        "main_obj": obj,
        "iv_display_ind":obj.display_article_flag,
        "iv_display_article":""
    };

    return articleObj;
}

//This method shows the confirmation popup after order header service
function showRecvPostConfirmation(recvParam, redirectFlag, key) {
    try {
        var msg = 'Do you want to apply the Stock on Hand updates for this order now?';
        $("#dialog-recvConfirmation").dialog({
            autoOpen: false,
            modal: true,
            resizable: false,
            minHeight: 100,
            maxHeight: 600,
            width: 350
        });

        $("#dialog-recvConfirmation").parent().addClass("popupWrapper");

        $('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#acceptbtn, #rejectbtn')
            .addClass("hideBlock");
        $("#dialog-recvConfirmation").find('#continue')
            .removeClass("hideBlock");
        // $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
        $("#dialog-recvConfirmation").dialog("open");
        $("#dialog-recvConfirmation").find('#message').text(msg);
        $("#dialog-recvConfirmation").parent().find('.ui-dialog-title').text(
            'Confirmation');
        $("#dialog-recvConfirmation").find('#continue').unbind('click');
        $("#dialog-recvConfirmation").find('#continue').click(function() {
            $("#dialog-recvConfirmation").dialog("close");
            callCommonReceivingService(recvParam, redirectFlag, key);
        });
        $("#dialog-recvConfirmation").find('#cancel').removeClass('hideBlock');
        $("#dialog-recvConfirmation").find('#cancel').unbind('click');
        $("#dialog-recvConfirmation").find('#cancel').click(function() {
            $("#dialog-recvConfirmation").dialog("close");
        });
    } catch (err) {
        showRecvPostConfirmation(recvParam, redirectFlag, key);
    }
}

function getRowContentForEditPage(obj) {
    var content = '';

    obj.pack_size = getOneIfEmpty(obj.pack_size);
    obj.order_qty = getEmptyIfNull(obj.order_qty);
    obj.dispatched_qty = getEmptyIfNull(obj.dispatched_qty);
    obj.article = getEmptyIfNull(obj.article);
    obj.vendor_ref_no = getEmptyIfNull(obj.vendor_ref_no);
    obj.article_desc = getEmptyIfNull(obj.article_desc);
    obj.tot_units_uom = getEmptyIfNull(obj.tot_units_uom);
    obj.order_uom = getEmptyIfNull(obj.order_uom);
    obj.dispatched_uom = getEmptyIfNull(obj.dispatched_uom);
    obj.received_qty = getEmptyIfNull(obj.received_qty);

    var tot_units_order = Number(obj.pack_size) * Number(obj.order_qty);
    var tot_units_dispatched = Number(obj.pack_size) *
        Number(obj.dispatched_qty);
    var tot_units_recvd = Number(obj.pack_size) *
        Number(obj.received_qty);
    var edit_not_allowed = (isSTO(orderType) && (obj.component_article_flag||'') == 'Y'); 
    content = '<tr id="row-' +
        obj.article +
        '"><td>' +
        obj.article +
        '</td><td>' +
        (obj.vendor_ref_no) +
        '</td>' +
        '<td>' +
        obj.article_desc +
        '</td><td class="centerValue columnDivider">' +
        obj.pack_size +
        ' ' +
        obj.tot_units_uom +
        '</td>' +
        '<td class="centerValue">' +
        obj.order_qty +
        ' ' +
        obj.order_uom +
        '</td><td class="centerValue columnDivider"><strong>' +
        tot_units_order +
        ' ' +
        obj.tot_units_uom +
        '</strong></td><td class="centerValue ">' +
        obj.dispatched_qty +
        ' ' +
        obj.dispatched_uom +
        '</td>' +
        '<td class="centerValue columnDivider"><strong>' +
        tot_units_dispatched +
        ' ' +
        obj.tot_units_uom +
        '</strong></td><td id="receivedEdit-' +
        obj.article +
        '" class="centerValue ">' +
        '<input type="text" '+(edit_not_allowed ? 'readonly' : '')+' value="' + obj.received_qty + '" maxlength="14" class="recvTextBox numBox editNumCell textbox textboxDefaultText"><label class="moreInput wtLabel hideBlock"><strong>Total Weight (kg)</strong></label>' +
        '<input type="text" value="" maxlength="8" class="wtTextBox wtTextBoxFix editNumCell numBox textbox textboxDefaultText hideBlock"></td><td class="recvTotUnits centerValue columnDivider">' + tot_units_recvd + '</td>' +
        '<td id="packOMEdit-1" class="centerValue columnHide"><input '+(isSTO(commonOrder.order_type) || (commonOrder.random_wt_flag == 'Y') || edit_not_allowed ? 'readonly' : '')+' type="text" maxlength="14" value="" class="packOM newOM4Decimal editNumCell numBox textbox textboxDefaultText"></td>' +
        '<td id="expiryEdit-1" class="centerValue columnHide"><input type="#" placeholder="dd/mm/yyyy" class="expiryDt textbox textboxDefaultText inputDate editDateCell">' +
        '</td></tr>';

    return content;
}
var recv_chilledFlag = false;
var recv_frozenFlag = false;
function checkTemperatureForArticles() {
    var tempChkFlag = false;
    recv_chilledFlag = false;
    recv_frozenFlag = false;
    if(!temperatureDisableFlg){
    	var temperature = 0;
    	var tempMin = 0;
    	var tempMax = 0;

    	for (var i = 0; i < recvItemInfo.length; i++) {
    		if (recvItemInfo[i].temperature_range_code != undefined && recvItemInfo[i].temperature_range_code != null) {
    			if (recvItemInfo[i].temperature_range_code == 'CH') {
    				temperature = Number(getEmptyIfNull($('.orderReceive #step-1').find('#temperature1').val()));
    			} else if (recvItemInfo[i].temperature_range_code == 'HF') {
    				temperature = Number(getEmptyIfNull($('.orderReceive #step-1').find('#temperature2').val()));
    			}

    			tempMin = recvItemInfo[i].temperature_range_min;
    			tempMax = recvItemInfo[i].temperature_range_max;

    			if ((getEmptyIfNull(tempMin) != '' && temperature < Number(tempMin)) ||
    					(getEmptyIfNull(tempMax) != '' && temperature > Number(tempMax))) {
    				recvItemInfo[i].temp_chk_flag = 'Y';
    				tempChkFlag = true;
    				//Defect_12710
    				if(recvItemInfo[i].temperature_range_code == 'CH'){
						recv_chilledFlag = true;    				
					}else{
						recv_frozenFlag = true;	
					}
    			} else {
    				recvItemInfo[i].temp_chk_flag = 'N';
    			}
    		} else {
    			recvItemInfo[i].temp_chk_flag = 'N';
    		}
    	}
    	for(var i =0 ; i< recvItemInfo_zero.length;i++){
    		if (recvItemInfo_zero[i].temperature_range_code != undefined && recvItemInfo_zero[i].temperature_range_code != null) {
    			if (recvItemInfo_zero[i].temperature_range_code == 'CH') {
    				temperature = Number(getEmptyIfNull($('.orderReceive #step-1').find('#temperature1').val()));
    			} else if (recvItemInfo_zero[i].temperature_range_code == 'HF') {
    				temperature = Number(getEmptyIfNull($('.orderReceive #step-1').find('#temperature2').val()));
    			}

    			tempMin = recvItemInfo_zero[i].temperature_range_min;
    			tempMax = recvItemInfo_zero[i].temperature_range_max;

    			if ((getEmptyIfNull(tempMin) != '' && temperature < Number(tempMin)) ||
    					(getEmptyIfNull(tempMax) != '' && temperature > Number(tempMax))) {
    				recvItemInfo_zero[i].temp_chk_flag = 'Y';
    				tempChkFlag = true;
    			} else {
    				recvItemInfo_zero[i].temp_chk_flag = 'N';
    			}
    		} else {
    			recvItemInfo_zero[i].temp_chk_flag = 'N';
    		}
    	}
    }else{
    	for (var i = 0; i < recvItemInfo.length; i++) {
    		recvItemInfo[i].temp_chk_flag = 'N';
    	}
    	for(var i =0 ; i< recvItemInfo_zero.length;i++){
    		recvItemInfo_zero[i].temp_chk_flag = 'N';
    	}
    }
    return tempChkFlag;
}

function clearRecvContent() {
    var area = $('.orderReceive');
    area.find('.searchBoxArea').find('#changeOM').prop('checked', false);
    area.find('.recvArticleTable').removeClass('framed');
    area.find('#addULDTable').addClass('hideBlock');
    area.find('#addULDTable tbody').html('');
    if(salesOrg==1060 && era_prof=="Y"){
    area.find('#step-2').find('#SSCCGroup thead').html('');
    area.find('#step-2').find('#SSCCGroup tbody').html('');
    area.find('#step-3').find('#SSCCGroupForDescripencies thead').html('');
    area.find('#step-3').find('#SSCCGroupForDescripencies tbody').html('');
    area.find('#step-4').find('input[type=text]').val('');
    area.find('#step-4').find('#comments').val('');
	}
	else{
    area.find('#step-2').find('#recvArticleTable tbody ').html(''); //for defect no 2938
    area.find('#step-3').find('#discrepancyTable tbody ').html(''); //for defect no 2938
    area.find('#step-4').find('input[type=text]').val('');
    area.find('#step-4').find('#comments').val('');
	}
}

function callDailyStockCheckService(recvParam) {
    var param = {
        "iv_session_id": "4545",
        "iv_sales_org": $('#salesOrg').val(),
        "iv_site_no": $('#posSite').val(),
        "article_list": "",
        "iv_stock_check_type": "VA",
        "iv_stock_check_reason": "VERIFY ARTICLE"
    };
    var itemArray = [];


    for (var i = 0; i < recvParam.iv_item_info.length; i++) {
        var obj = {};
        if ((recvParam.iv_order_type == 'STO' || recvParam.iv_order_type == 'IBT') && recvParam.iv_item_info[i].iv_receive_method == 'E') {
            obj.iv_article_no = recvParam.iv_item_info[i].iv_article;
            obj.iv_article_uom = recvParam.iv_item_info[i].iv_uom;
            itemArray.push(obj);
        } else if (recvParam.iv_order_type == 'PO') {
            if ((recvParam.iv_item_info[i].new_om != undefined && recvParam.iv_item_info[i].new_om != null && recvParam.iv_item_info[i].new_om != '' && recvParam.iv_item_info[i].new_om != 0) ||
                (recvParam.iv_item_info[i].iv_qty != undefined && recvParam.iv_item_info[i].iv_qty != null && recvParam.iv_item_info[i].iv_qty != '' && ((recvParam.iv_item_info[i].iv_qty != recvParam.iv_item_info[i].main_obj.dispatched_qty || recvParam.iv_item_info[i].iv_qty != recvParam.iv_item_info[i].main_obj.order_qty)))) {
                obj.iv_article_no = recvParam.iv_item_info[i].iv_article;
                obj.iv_article_uom = recvParam.iv_item_info[i].iv_uom;
                itemArray.push(obj);
            }
        }

    }
    param.article_list = itemArray;
    if (itemArray.length > 0) {
        var url = dailyStockCheckURL;
        console.log(url + ' ' + JSON.stringify(param));
        $.ajax({
            data: JSON.stringify(param),
            url: url,
            type: 'post',
            beforesend: function(){
            	//startLoading();
            }
        }).done(function(response) {
            if (response[0].type == 'S') {
                console.log(response[0].msg);
            } else if (response[0].type == 'E') {
                console.log(response[0].msg);
            } else if (response[0].ErrorID != undefined) {
                console.log(response[0].ErrorID + ' daily stock check service failed');
            }
           // stopLoading();
        }).fail(function() {
            console.log('daily stock check service failed');
           // stopLoading();
        });
    }

}
var articleObjtoReceiveObj = function(obj)
{
  this.msg= null;
  this.suggested_qty  = null;
  this.pack_size   = obj.om;
  this.dispatched_qty   = null;
  this.dispatched_qty_uom   = null;
  this.vendor_ref_no   = obj.vendor_ref_no;
  this.allocated_qty_uom  = null;
  this.order_uom  = obj.order_uom;
  this.article_desc  = obj.article_desc;
  this.received_qty_uom  = obj.order_uom;
  this.order_qty  = '';
  this.allocated_qty  = null;
  this.article  = obj.article;
  this.article_line  = null;
  this.supplier_name  = obj.supplier_name;
  this.soh  = obj.soh;
  this.om  = obj.om;
  this.overlay_qty  = null;
  this.demand_qty  = null;
  this.received_qty  = obj.received_qty;
  this.department_no  = obj.department_no;
  this.department_name  = null;
  this.category_no  = obj.category_no;
  this.category_name  = null;
  this.sub_category_no  = obj.sub_category_no;
  this.sub_category_name  = null;
  this.segment_no  = obj.segment_no;
  this.segment_name  = null;
  this.random_wt_flag  = obj.random_wt_flag;
  this.article_life_cycle_info  = obj.alc_status;
  this.ps_article_status  = obj.ps_article_status;
  this.temperature_ind  = obj.child_article||obj.refrigent_flg;
  this.temperature_range_code  = null;
  this.temperature_range_min  = null;
  this.temperature_range_max  = null;
  this.rnd_wgt  = (obj.random_wt_flag=='Y' ? (Number(obj.received_qty||'')*Number(obj.om||'')) : null);
  this.expiry_date1  = null;
  this.expiry_date2  = null;
  this.expiry_date3  = null;
  this.expiry_date4  = null;
  this.expiry_date5  = null;
  this.recv_om  = null;
  this.pi_om  = obj.pi_om;
  this.pi_uom = (obj.pi_uom||'');
  this.pi_om_base = (obj.pi_om_base||'');
  this.base_uom  = obj.base_uom;
  this.ranged_flag  = obj.ranged_flag;
  this.ordered_wgt  = null;
  this.dispathced_wgt  = null;
  this.pbd_flag  = obj.pack_break_down_flag;
  this.expiry_flag  = obj.expiry_flag;
  this.dispatched_om  = null;
  this.random_wgt_flg  = obj.random_wgt_flg;
  this.stock_take_flg  = 'N';
  this.article_status_desc  = '';
  this.temp_chk_flag  = '';
  this.tot_units_uom  = null;
  this.dispatched_uom  = null;
  this.weighted_flag = obj.weighted_flag;
  if((salesOrg==1060 && era_prof=="Y") && this.sscc_carton_num==undefined){
	  obj["sscc_carton_num"]=SSCC_IdForNewRow;
	  
  }
};

function searchAndAddArticleBySSCC_Id(srArea, toAddArea, urqFlag) {
	
    var searchTxt = srArea.find('.tableAddAction .textbox.searchbox').val();
    var supplierNo = '';
    var receiveQty = srArea.find('.tableAddAction .textbox.numberBox').val();
    var articleNoFlag = "";
    var descFlag = "";
    var gtinFlag = "";
    var srcOfSupplyInd;
    // var supplierNo;
    var nodeLevel = "";
    var nodeId = "";

    // supplierNo = srArea.find('#supplier').val().split('-')[0];

    if (isNaN((searchTxt).split('-')[0]))
        descFlag = "Y";
    else if (!isNaN((searchTxt).split('-')[0]) &&
        (searchTxt).split('-')[0].length <= 7)
        articleNoFlag = "Y";
    else if (!isNaN((searchTxt).split('-')[0]) &&
        (searchTxt).split('-')[0].length > 7)
        gtinFlag = "Y";

    if (nodeLevel == undefined && nodeId == undefined) {
        nodeLevel = "";
        nodeId = "";
    }
    srcOfSupplyInd = "2";
    if (commonOrder.order_type == 'VENDOR') {
        supplierNo = getEmptyIfNull(commonOrder.supplier_no);
        srcOfSupplyInd = "1";
    }
    
    if(isST(commonOrder.order_type)){
    	srcOfSupplyInd = '';
    }
    if(searchTxt !='' && searchTxt !=null ){					//search and add
		if (receiveQty !=null && receiveQty !=''){
    var param = {
        "iv_desc": descFlag,
        "iv_article_no": articleNoFlag,
        "iv_gtin": gtinFlag,
        "iv_article": (searchTxt).split('-')[0],
        "iv_sales_org": $('#salesOrg').val(),
        "iv_supplier": supplierNo,
        "iv_src_supply": srcOfSupplyInd,
        "iv_ranged": "Y",
        "iv_session_id": "",
        "iv_barcode": "",
        "iv_site": siteVal,
        "iv_node_id": nodeId,
        "iv_node_level": nodeLevel,
        "iv_barcode_flag": "",
        "iv_uom_flag": "N",
        "iv_prime_vendor": "",
        "iv_auto_stockr_flag": "",
        "iv_delisted_flag": "N",
        "iv_deleted_flag": "N"
    };

    console.log(packBreakArticleSearch + ' ' + JSON.stringify(param));
    $.ajax({
        type: "post",
        url: packBreakArticleSearch,
        data: JSON.stringify(param),
        beforeSend: function() {
            startLoading();
        },
        success: function(response) {
            if (response.length == 1 && response[0].article != undefined) {
                if (urqFlag && addMissingArticleValidation(response[0])) {
                	$('.recvArticleStep').find('.recvArticleTable.'+CartonIdForHeader).removeClass('hideBlock');
                    addToArticleTable(response[0], srArea, toAddArea, urqFlag);                   
                } else if(addMissingArticleValidation(response[0])){
                	$('.recvArticleStep').find('.recvArticleTable.'+CartonIdForHeader).removeClass('hideBlock');
                    triggerOrderHeaderService(response[0], srArea, toAddArea);                    
                }
            } else if (response.length > 1) {
                var area = $('#dialog-selectArticle');
                area.find('.recvArticleTable.'+CartonIdForHeader).removeClass('hideBlock');
                showRecvArticleSelectPopup(area, response, srArea, toAddArea, urqFlag);
            } else {
                showRecvErrorMsg('Article not linked to vendor.', 'Search and Add');
                stopLoading();
            }
            stopLoading();
        },
        error: function() {
            showRecvErrorMsg('Sorry, Some technical issue occured', 'Search and Add');
            stopLoading();
        },
    });
   
		}
		else {
	        showRecvErrorMsg('Please enter the Received qty.', 'Search and Add');
	        stopLoading();
	    }
	    
	    
	    }else {
	        showRecvErrorMsg('Please enter the Article Id/Name/Details ', 'Search and Add');
	        stopLoading();
	    }   
}

function articlesCountInNewCarton(){
	articlesNo=$('#SSCCGroup td#groupBy_'+SSCC_CartonIdForNewRow+' tbody tr').length;
	$('#SSCCGroup tr[data-tt-id='+SSCC_CartonIdForNewRow+'] .articleCount').html(articlesNo);
	
}

function articlesCountInExistingCarton(area,vendor){	
	articlesNo=$('td#groupBy_'+vendor+' tbody tr').length;
	$('#SSCCGroup tr[data-tt-id='+vendor+'] .articleCount').html(articlesNo);
}

function TotalCartonsChecked(){
	var chkarea ='';
	if ($('#step-2').is(':visible')){
		
		chkarea = $('#step-2');
	}
	else {
		chkarea = $('#step-3');
	}
	  var cartonsChecked=0;
	  var grpArea = $('.recvArticleStep').find('tr.groupByExpand1');
	  grpArea.each(function() {
		  if(salesOrg==1060 && era_prof=="Y" && recvMethod == 'RM'){			// since the check box will not available for SSCC - line by line # sibi mail issue
			  var ssccId =  $(this).attr('data-tt-id');
			  var grpContArea = $('#SSCCGroup').find("[data-tt-id='"+ssccId+"_sub']").find('.recvArticleTable');
			  var checkedL = grpContArea.find('input[type="checkbox"]:checked').length;
			  var totalL = grpContArea.find('input[type="checkbox"]').length;
			  if(checkedL != 0 && checkedL == totalL){
				  cartonsChecked ++;	 
			  }
		  }else{
			  if( $(this).find('td .confirmCheck').is(':checked'))
			  {
				  cartonsChecked ++;	 
			  }
		  }
	  });	      
      chkarea.find('.confirmedIn').html(cartonsChecked); 
}


function CalculateCartonsReceivedSummaryScreen(){
	var cartonsChecked=0;
	var grpArea = $('.recvArticleStep').find('tr.groupByExpand1');
	grpArea.each(function() {
		  if(salesOrg==1060 && era_prof=="Y" && recvMethod == 'RM'){			// since the check box will not available for SSCC - line by line # sibi mail issue
			  var ssccId =  $(this).attr('data-tt-id');
			  var grpContArea = $('#SSCCGroup').find("[data-tt-id='"+ssccId+"_sub']").find('.recvArticleTable');
			  var checkedL = grpContArea.find('input[type="checkbox"]:checked').length;
			  var totalL = grpContArea.find('input[type="checkbox"]').length;
			  if(checkedL != 0 && checkedL == totalL){
				  cartonsChecked ++;	 
			  }
		  }else if(salesOrg==1060 && era_prof=="Y" && recvMethod == 'MF'){
			  var ssccId =  $(this).attr('data-tt-id');
			  var grpContArea = $('#SSCCGroup').find("[data-tt-id='"+ssccId+"_sub']").find('.recvArticleTable');
			  var checkedL = grpContArea.find('input[type="checkbox"]:checked').length;
			  if(checkedL > 0){
				  cartonsChecked ++;	 
			  }
		  }else if($(this).find('td .confirmCheck').is(':checked'))
			  {
				  cartonsChecked ++;	 
			  }
	  });
      return cartonsChecked;
}

function callItemInfoForReceivingInFull(retainSessionFlag, orderNo, sourceFlag,dataObj,asnNo){

		param = {
			"iv_order_no" : ((isPO(commonOrder.order_type)?orderNoDtl[0].delivery_no:getEmptyIfNull(orderNo)) || getEmptyIfNull(orderNo)), // 17.08 Meat Co Vendor Changes
			"iv_site" : siteNo,
			"iv_session_id" : "111",
			"iv_user_id" : "",
			"iv_source_flag" : sourceFlag,
			"iv_retain_session_flag" : retainSessionFlag,
			"iv_sales_org" : salesOrg,
			//"iv_receive_flag":"",			
            "iv_receive_flag":retainSessionFlag,			
			"iv_display_flag":"N"
			
		};
		
		console.log(orderItemInfoURL+' '+JSON.stringify(param));
		$.ajax({
		    type: "post",
		    url: orderItemInfoURL,
		    data: JSON.stringify(param),
		    beforeSend: function(){
		    	startLoading();
		    }
		  }).done(function(response) {
			  if(response['LV_QTY']== undefined || response['LV_QTY'].length == 0 || !checkResult(response['LV_QTY'],'article')){
		  			$.fn.showCustomMsg([mobiSerErrCode],error);
		  			stopLoading();
			  }else{
			  //if(checkResult(response,'article')){
					recvItemInfo = response['LV_QTY'];
					currentId = Number($('.ui-state-highlight').attr('id').split('-')[1]);
					checkedValue = $('.reportRadio').find('input[type="radio"]:checked').val();
					if (window[validateMethodMap[currentId]]()) {
						var nextId = currentId + 1;
				        //1927 - remove ULD for vendor order code here
				        if (checkedValue == 'MM' && currentId == 1) {
				           //Defect_10395 - removing ULD step restriction for vendor order
				           /* if (isPO($('h2.articleTitle:visible').attr('order_type')) && currentId == 1)
				                nextId = currentId + 4;
				            else*/
				                nextId = currentId + 3;
				        }
	
				        //1927 - remove ULD for vendor order code here
				        //Defect_10395 - removing ULD step restriction for vendor order 
				        /*if (isPO($('h2.articleTitle:visible').attr('order_type')) && currentId == 3) {
				            nextId = currentId + 2;
				        }*/
	
				        $('.ui-menu-item').removeClass('ui-state-highlight');
				        $('li[id="tab-' + nextId + '"]').addClass('ui-state-highlight');
				        $('div[id="step-' + currentId + '"]').toggle(100);
				        $('div[id="step-' + nextId + '"]').toggle(100);
				        if (currentId == 1 && recvMethodChgFlag) {
				            clearRecvContent();
				        }
	       
				        toggleButtonsDisplay(nextId);
				        frameStepContent(nextId);
				        area.find('#closebtn').trigger('click');
					}
			  //}
			  }
		  }).fail(function() {
			  $.fn.showCustomMsg([mobiSerErrCode],error);
			  stopLoading();
		  });
		stopLoading();
	}
var showComponentReceive = function(object){      
        mainArticleChkd=false; 
        if($('#row-'+object.article).find('.confirmCheck').is(':checked')){
        	mainArticleChkd=true;
        }
        var param = new orderParamForCmpntArticles((headerObj.hdrObj.source_flag != "" 
        && headerObj.hdrObj.source_flag =="D")?(headerObj.hdrObj.order_no):headerObj.itemObj[0].order_no,siteVal,'',
        		headerObj.hdrObj.source_flag,'',salesOrg,'',object.article,headerObj.hdrObj.order_status,object.order_no);
	$.fn.loadComponentArticlesPopUp(param, object);
};

$.fn.loadComponentArticlesPopUp = function (param, obj){
		var $popUp = $('#dialog-com-CmpntArticles');
		var $body = $('body');
		var $popupCont ='';
		if($popUp == undefined || $popUp.length == 0){
			$body.append($(dialog_open_CmpntArticles));
			$popUp = $('#dialog-com-CmpntArticles');
			$popUp.dialog({autoOpen: false,modal: true,resizable: false,minHeight: 200,maxHeight: 600,width: 1000});
		}
		$popupCont = $('#dialog-com-CmpntArticles .popupData');
		var key = (obj != "" && obj != undefined && obj.article != "" && obj.sscc_carton_num != ""
                &&  obj.sscc_carton_num != null )?obj.article+"_"+obj.sscc_carton_num:obj.article;
                if((key != null && key != "") && componentArtMap[key] == undefined || componentArtMap[key] == ''){
                   getCmpntArticles(param,$popupCont,$popUp,obj);                    
                }else{ 
                var compList = componentArtMap[key];
                frameCmpntContent(compList,$popupCont,$popUp, obj);
                }		
		return true;
	};
	
var getCmpntArticles = function(param,$hold,$dialog,obj){     
	console.log(getcmpntArticlesInfoUrl  + ' ' + JSON.stringify(param));
	  $.ajax({
	    type: "POST",
	    url:  getcmpntArticlesInfoUrl,
	    data: JSON.stringify(param),
		beforeSend: function(){
			startLoading();
		}
	  }).done(function(response) {
		  if(checkResult(response,'order_no')){
            if(response != '' && response != undefined && response.length>0){
            var list = [];
            var key = (obj.sscc_carton_num != "" && obj.sscc_carton_num != undefined)?param.iv_display_article+"_"+obj.sscc_carton_num:param.iv_display_article;
            for(var i=0; i<response.length; i++){
                response[i].article_line = obj.article_line;                
               if(response[i].sscc_carton_num != "" && response[i].sscc_carton_num != undefined 
                		&& obj.sscc_carton_num != "" && obj.sscc_carton_num != undefined && response[i].sscc_carton_num == obj.sscc_carton_num){                            	  
                    list.push(response[i]);                            	   
                }
             }
            componentArtMap[key]=(obj.sscc_carton_num != "" && obj.sscc_carton_num != undefined)?list:response;
            frameCmpntContent(((obj.sscc_carton_num != "" && obj.sscc_carton_num != undefined)?list:response),$hold,$dialog, obj);
            }
		  } 
		  stopLoading();                  
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  populateWarehouse();
		  stopLoading();
	  });         
};
//17.04 changes - Framing Component Popup
var frameCmpntContent = function(data,$hold,$dialog, dispObj){
	for(var i =0; i<data.length; i++){
        data[i].confirm_articles =''; 
        data[i].temp_chk_flag = dispObj.temp_chk_flag;
        data[i].ranged_flag = dispObj.ranged_flag;
	}        
	var obj = new tblConfObjCmpnt(data);
	$dialog.find('#openCmpntArticles').loadtbl(obj);
	$hold.addClass('ContentTableWrapper').find('.tableFooter').addClass('hideBlock');
	$dialog.dialog('open');
	$dialog.dialog('open').parent().addClass('popupWrapper');
        bindComponentReceiveCheckBox(dispObj);
	cmpntChngeQty(dispObj);
	// for component articles 
	/*$dialog.find('#openCmpntArticles .recvTextBox').within9999();
	$dialog.find('#openCmpntArticles .wtTextBox').isWithin999Or3Decimal();*/
	//updateSelectCheckBox();
};
//17.04 changes - component table 
function tblConfObjCmpnt(data){
	this.option = 'build';
	this.key = ['article','article_desc','vendor_ref_no','order_qty','dispatched_qty','received_qty'];   
        if(isPO(commonOrder.order_type) && $('.reportRadio').find('input[type="radio"]:checked').val() != "RC"){
        this.key.push('confirm_articles');
        }
	this.table_name = 'cmpnt_order_tbl';
	this.table_title = 'List of orders';
	this.table_class = ' ContentTable ';
	this.header_tr_class = 'collapsed';
	this.content_tr_class = ' mainTr ';
        this.header_name = {article:'Article #',vendor_ref_no:'Vendor',article_desc:'Article Description', order_qty:'Ordered',
        dispatched_qty:'Dispatched',received_qty:'Received',
        confirm_articles:((isSTO(commonOrder.order_type) || $('.reportRadio').find('input[type="radio"]:checked').val() == "RC")?'':'Confirm<br>Received<br>(<span class="confirmed">0</span>/<span class="totConfirmed">0</span>)')},
	this.header_data_type = {article:'number',vendor_ref_no:'number',article_desc:'char',order_qty:'char',received_qty:'char',dispatched_qty:'char',
       showOrderQty:'number',confirm_articles:''},
	this.header_row_type = {article:'main',vendor_ref_no:'main',article_desc:'main',order_qty:'sub',received_qty:'sub',dispatched_qty:'sub',
       confirm_articles:'main'},
	this.header_td_label = {showOrdQty:'Total Units Ordered',showOrdQty:'Ordered',showDisQty:'Dispatched',showReceQty:'Received',showOrderQty:'Qty.',showOrderTotQty:'Total Units',showDispQty:'Qty.',showDispTotQty:'Total Units',showReceiveQty:'Qty.',showReceTotQty:'Total Units',
        Confirm_Articles:'Confirm Articles'};	
	this.header_sub_rows = {order_qty:{colspan : 2,subKeys: ['showOrderQty','showOrderTotQty']},received_qty:{colspan : 2, subKeys: ['showReceiveQty','showReceTotQty']},dispatched_qty:{colspan : 2, subKeys: ['showDispQty','showDispTotQty']}};	
	this.cont_data_function = {showOrderQty:showOrderQtyCmpntRecv,showDispQty:showDispQtyCmpntRecv,showOrderTotQty:showOrderTotQtyCmpntRecv,
                showDispTotQty:showDispTotQtyCmpntRecv,showReceTotQty:showReceTotQtyCmpntRecv,
               confirm_articles:((isSTO(commonOrder.order_type))?'':getCnfrmTrue),
                showReceiveQty:((isSTO(commonOrder.order_type) || $('.reportRadio').find('input[type="radio"]:checked').val() == "RC")?showReceiveQtyDisabledCmpntRecv:showReceiveQtyCmpntRecv)};
	this.header_class = {article:'',article_desc:''},
	this.header_title = {},
	this.header_width = {article:'',article_desc:''},
	this.content_class = {article:'',article_desc:'',showReceiveQty:'recvTextBox',showReceTotQty:'recvTotUnits'},
	this.content_title = {},
        this.content_format = {article:'removeNull',vendor_ref_no:'removeNull',article_desc:'removeNull'};
	this.content_width =  {article:'',article_desc:''},
	this.comp_key_parser = {};//{supplier_name: 'twoKeySplit'};
	this.content =  data;
	this.pagination = false;
	this.groupby= false;
	this.recordPerPage= 10;
	this.groupbyColumn =[];
	this.filter= false;
	this.curr_page= 1;
	this.sort=false;	
	this.cont_sort_function = {};
	this.content_bind_event = {click: ''};
	this.content_tr_addon = {click: ''};
	this.content_td_addon = {click: ''};
        this.data_tr_class = {func_class:getArticleTrclass};
	this.data_td_class = {article:getArticleTdclass};		
}
var showDifferce =function(obj){
    return obj.diff;    
};
var getCnfrmTrue=function(obj){
	if(mainArticleChkd || obj.selected ){
		return '<input class="cmpntFlag" displayArticle="'+obj.display_article+'" cartonNum="'+obj.sscc_carton_num+'" name="cmpntFlag" type="checkbox"  checked></input>';
	}else{
		return '<input class="cmpntFlag" displayArticle="'+obj.display_article+'" cartonNum="'+obj.sscc_carton_num+'" name="cmpntFlag" type="checkbox" ></input>';
	}
};
var getCnfrmFalse=function(obj){	
	if(mainArticleChkd){
		return '<input class="cmpntFlag" displayArticle="'+obj.display_article+'"  cartonNum="'+obj.sscc_carton_num+'" name="cmpntFlag" type="checkbox" checked disabled></input>';
	}else{
		return '<input class="cmpntFlag" displayArticle="'+obj.display_article+'"  cartonNum="'+obj.sscc_carton_num+'" name="cmpntFlag" type="checkbox" disabled></input>';
	}	
};
var showOrderQtyCmpntRecv = function(obj,key){
return (obj.order_qty!=null && obj.order_qty!=undefined)?(obj.order_qty+' '+obj.order_uom):'';	
};
var showOrderTotQtyCmpntRecv = function(obj,key){
	return ((obj.order_qty!=null && obj.order_qty!=undefined)?(Number(obj.om || '') * Number(obj.order_qty)):'')+" "+ ((obj.order_qty!=null && obj.order_qty!=undefined && obj.base_uom!=null && obj.base_uom!=undefined)? obj.base_uom:'NA');	
};
var showDispQtyCmpntRecv = function(obj){
return (obj.dispatched_qty!=null && obj.dispatched_qty!=undefined)?obj.dispatched_qty+' '+obj.dispatched_qty_uom:'NA';
};
var showDispTotQtyCmpntRecv = function(obj){
	return (obj.dispatched_qty!=null && obj.dispatched_qty!=undefined)?(Number(obj.dispatched_om||obj.om) * Number(obj.dispatched_qty))+" "+
        ((obj.dispatched_qty!=null && obj.dispatched_qty!=undefined && obj.dispatched_qty_uom!=null && obj.dispatched_qty_uom!=undefined)? obj.dispatched_qty_uom:''):'NA';
};
var showReceiveQtyCmpntRecv = function(obj){	
    var disabled = (commonOrder.order_status == 'RECEIVED')?'disabled':'';   
    if((obj != '' && !notRangedAllowed && obj.ranged_flag == 'N') || obj.temp_chk_flag =='Y'){
		obj.received_qty  = '0';
		disabled = 'disabled';
    }else{
        obj.received_qty  = (obj.received_qty != '' && obj.received_qty != null && obj.received_qty != '0')?obj.received_qty:
        (!(salesOrg==1060 && era_prof=="Y" && auditFlag  == "Y" && receiveInFull_retainSessionFlag != "Y")?(obj.dispatched_qty||obj.order_qty):'');    
    }        
    return '<input  '+ disabled+' type="text" '+(false ? 'readonly' : '')+' value="' + ((obj.received_qty != null && obj.received_qty != undefined)?obj.received_qty:"")
        + '" maxlength="14" class="orderReceive recvTextBox numBox editNumCell textbox textboxDefaultText"><label class="moreInput wtLabel hideBlock"><strong>Total Weight (kg)</strong></label>' ;
};
var showReceiveQtyDisabledCmpntRecv = function(obj){
	if($('.reportRadio').find('input[type="radio"]:checked').val() == "RC" && (obj.received_qty == null || obj.received_qty == undefined)){
		  obj.received_qty = (obj.received_qty|| obj.dispatched_qty || obj.order_qty || '');
	}
	return ((obj.received_qty != null && obj.received_qty != undefined)?obj.received_qty+' '+(obj.received_qty_uom != null && 
		obj.received_qty_uom != undefined ? obj.received_qty_uom : obj.order_uom):'NA');
	
};
var showReceTotQtyCmpntRecv = function(obj){
return ((obj.received_qty!=null && obj.received_qty!=undefined)?
(Number(obj.om || '') * Number(obj.received_qty)):'')+" "+ ((obj.received_qty!=null && obj.received_qty!=undefined && obj.base_uom!=null && obj.base_uom!=undefined)? obj.base_uom:"");	        
};

function bindComponentReceiveCheckBox(dispObj){
        $('#cmpnt_order_tbl_table').find('.totConfirmed').html(
        $('#cmpnt_order_tbl_table').find('.mainTr').length);
        $('#openCmpntArticles').find('.cmpntFlag').unbind('click');
	    $('#openCmpntArticles').find('.cmpntFlag').click(function() {
	    	var recvParam = getReceiveParam(false, false,'D', 'C', dispObj, $(this).closest('tr'));
            recvParam.iv_action_flag = 'D';                         
            callCommonReceivingService(recvParam, false);
            ChkBoxNewCnt($(this).attr("displayArticle"));            
            updateSelectCheckBox($(this).is(':checked'),dispObj, $(this).closest('tr'));
        });     
}

function ChkBoxNewCnt(dispArticle){
var articlesChecked=0;  
$('#cmpnt_order_tbl_table').find('td .cmpntFlag').each(function() {
  if( $(this).is(':checked'))
        {
                articlesChecked ++;		 
        }					
  });            			 
  $('#cmpnt_order_tbl_table').find('th .confirmed').html(articlesChecked); 
  if($('#cmpnt_order_tbl_table').find('.mainTr').length == articlesChecked){
       $('#row-'+dispArticle).find('.confirmCheck').prop('checked', true);
  }else{
       $('#row-'+dispArticle).find('.confirmCheck').prop('checked', false);  
  }
  $('#recvArticleTable').find('th .confirmed').html($('#recvArticleTable input:checkbox:checked').length);
} 
function updateSelectCheckBox(isChecked, displayArticle, cmpntRow){
	var obj = cmpntRow.data('obj');
	var key = (displayArticle.sscc_carton_num != undefined && displayArticle.sscc_carton_num != "")?
		obj.display_article+"_"+displayArticle.sscc_carton_num:obj.display_article;
        if(obj.display_article != ""  && key != ""  && componentArtMap[key] != "" ){
           var list = componentArtMap[key];
           if(list != undefined && list !="")
           for(var i=0; i<list.length; i++){
              if(list[i].article == obj.article){                   
                   /*list[i].qty = obj.qty; 
                   list[i].received_qty = obj.qty;*/                   
                     list[i].selected = isChecked;
              }
           }
        }
}

function cmpntChngeQty(dispObj){
 $('#openCmpntArticles').find('.recvTextBox').on('input', function(){
	$(this).closest('tr').find('.cmpntFlag').prop('checked', false);
	updateSelectCheckBox($(this).is(':checked'),dispObj, $(this).closest('tr'));
    var totUnits = 0;
    var obj = $(this).closest('tr').data('obj');
    totUnits = Number(obj.om) * Number($(this).closest('tr .recvTextBox').val());
    obj.received_qty= Number($tr.find('.recvTextBox').val());
    $(this).closest('tr').find('.recvTextBox input').val($(this).val());
    $(this).closest('tr').find('.recvTotUnits').html('<strong>' + totUnits +' '+ obj.base_uom+'</strong>');
    return false;
 });
}
function unique(list) {
  var result = [];
  $.each(list, function(i, e) {
    if ($.inArray(e, result) == -1) result.push(e);
  });
  return result;
}

function invoiceAlphaNumeric(){
    $('#invoice').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});
$('#did').keypress(function (e) {
    var regex = new RegExp("^[a-zA-Z0-9]+$");
    var str = String.fromCharCode(!e.charCode ? e.which : e.charCode);
    
    if (regex.test(str)) {
        return true;
    }
    e.preventDefault();
    return false;
});
}
//# sourceURL=orderReceive.js
