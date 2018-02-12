var loggedInSiteNo=$('#posSite').val();
var loggedInSalesOrg=$('#salesOrg').val();
var loggedInUserId=$('#loginUserId').val();
var sessionId='';
var ibtOrderType='ZUB';
var Its = 'ITS';
var Ss = 'SS';
var Adm = 'ADM';
var Br = 'BR';
var POSRP = 'POSRP';
//newly added roles
var STOTM = 'STOTM';
var STTM = 'STTM';
var RDOU = 'RDOU';
var SLM = 'SLM';
var ITUA = 'ITUA';
var ITS1 = 'ITS1';
var ITS2 = 'ITS2';
var ITS1 = 'ITS1';

var MA = 'MA';
var TL = 'TL';
var STM = 'STM';
var OA = 'OA';
var OS = 'OS';
var TL = 'TM';
var updateUserDtl = 'AC_UUD';
var viewUserDtl = 'AC_VUD';
var SessionExpired = 'SessionExpired';
var ajaxerror = 'Error with searchRepairServiceOrder ajax call ';
//var ordersDsdFlag=true; // commented as its not used
//var ordersDispatchQtyFlag=true; // commented as its not used
var sap_user='';
var nt_currentPage=1;
var nt_limit=10;
var ticketNotifId = 'N110';
var specialActivity='ZSPA';
var localMarketing='ZLOM';
var advertised='ZADT';
// if any new tab created in the nav bar please update the rootCodeMap
// used in adminAppSettings.js for showing the tabs description
/*var rootCodeMap = {
	"LU" : "Lookup",
	"AD" : "Admin",
	"OD" : "Orders",
	"PR" : "Pricing",
	"RP" : "Reports",
	"SM" : "Stock Management",
	"RC" : "Repair Centre",
	"OT" : "Other Tools"
};
*/
var bigw_sales_org = '1060';
var supers_sales_org = '1005';
var dan_sales_org = '1015';
var bws_sales_org = '1010';
var count_sales_org = '2010';
var thom_sales_org = '1025';
var petrol_sales_org = '1020';
var small_sales_org = '1030';
var acccessLevel1 = '1';
var acccessLevel2 = '2';
var acccessLevel3 = '3';
var removeExpiryDate = '';
var updateExpiryDate = '';
//commenting for application settings CR var viewItemdetails = 'VID';
// applicationSettings CR var viewFinaliseDetails = 'RTVF';
var instoreClrDeactivateFlag=false;
var instoreCompDeactivateFlag=false;
var instoreDispCreateFlag=false;
var instoreClrCreateFlag=false;
var instoreCompCreateFlag=false;
var getnotificationSettingsUrl="../notification/getNotificationSettings.htm";
var setnotificationSettingsUrl="../notification/setNotificationSettings.htm";
var primaryDeprts=undefined;
var canViewOrderDetail=true;
var callMonitorNotification = true;
var secCounter = '';
var serverCallCounter = '';
var notIntrCounter = '';
var usrActive = true;
var encSapPwd = '';
var sapCallAgain = false;
var nationalSTBlockMap = {};
var oneHourNotiCount = 0;
try{
primaryDeprts=$.parseJSON($('#primaryDept').val()).data[$('#posSite').val()];
}catch(err){}

var allNotifications={};
var window_focus;
var $groupBy = function(array, predicate) {
	var grouped = {};
	for ( var i = 0; i < array.length; i++) {
		var groupKey = predicate(array[i]);
		if (typeof (grouped[groupKey]) === "undefined")
			grouped[groupKey] = [];
		grouped[groupKey].push(array[i]);
	}

	return grouped;
};
$(document)
		.ready(
				function() {
					$(window).focus(function() {
					    window_focus = true;
					    stopScroll();
					}).blur(function() {
					    window_focus = false;
					});
					 idleTime = 0;
					$(this).mousemove(function (e) {
						usrActive =  true;	
					});
					$(this).keypress(function (e) {
						usrActive =  true;	
					});
					serverCallCounter = setInterval(dummyServerCall, 15*60*1000); //will be triggered every 15Mins
					//serverCallCounter = setInterval(dummyServerCall, 5*1000); //will be triggered every 5 secs
					$('.userProfile [role="menuitem"]').click(function(e){
						e.preventDefault();
						if($(this).attr('href')!='#'){
							if(($('#navBarHighlight').val() == 'stockManage' || $('#navBarHighlight').val() == 'lookUp') && !$('#sohLookupContainer').is(':visible') && $('.sohArticleDetails').is(':visible'))
							{							
							if($('#endSOHValue').text() != $('#endSOHValue').attr('initialValue')){//some changes are there..so warning mesg
								//var returnMsg ='You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
								$.fn.warnPopup('warn',leaveScreenMsg,'Stock Adjustment',triggerLeaveStkAdjYes,triggerLeaveStkAdjNo,'',$(this),'Discard/Back');
							}else{//no changes.no warning.just redirect
								handleLeaveStkAdjYes(e);
							}
							}// defect 5891
							else if(($('#navBarHighlight').val() == 'reports') && $('#uldSweepForm').is(':visible')
									&& ($('#addULDTable tbody tr').length > 0 || $('#uldSweepForm').data('changed'))){	//Defect 5891						
							//if( $('#addULDTable tbody tr').length == 0 || $('#uldSweepForm').data('changed')){//some changes are there..so warning mesg
								//var returnMsg ='You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
								$.fn.warnPopup('warn',leaveScreenMsg,'Process ULDs',triggerLeaveProcessUldsYes,triggerLeaveStkAdjNo,'',$(this),'');
							//}/*if( $('#addULDTable tbody tr').length != 0){//some changes are there..so warning mesg
								//var returnMsg ='You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
								//$.fn.warnPopup('warn',leaveScreenMsg,'Process ULDs',triggerLeaveProcessUldsYes,triggerLeaveStkAdjNo,'',$(this),'Discard/Back');
							//}*/
							//else{//no changes.no warning.just redirect
								//generalRedirection(e);
							//}
							}
							else{
								window.location.href=$(this).attr('href');
							}
						}
						});
					$('#siteList').val( $('#siteList').val().replace('\`','\''));
					
					//used to allign the user name and store name in the right corner of header
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});
					
					

					$('.breadcrumbWrapper .statusWrapper #statusImg').remove();
					bindLoader();
					/*
					 * try { if ($('#posStore').val() != '' &&
					 * $('#posStore').val() != null && $('#posStore').val() !=
					 * undefined && $.parseJSON($('#posStore').val()) != null &&
					 * $.parseJSON($('#posStore').val()) != undefined &&
					 * $.parseJSON($('#posStore').val()).length > 0) { for ( var
					 * i = 0; i < $.parseJSON($('#posStore') .val()).length;
					 * i++) $( '.' + $.parseJSON($('#posStore')
					 * .val())[i].replace('"', '').replace('"', ''))
					 * .removeClass('hideBlock'); } } catch (err) {
					 * console.log(err); }
					 */

					$('.POSTAB,.PMTAB').removeClass('hideBlock');
					securityMatrix();
					/*
					 * if ($('.PMTAB').hasClass('hideBlock')) {
					 * $('.homeLinkBox.PM .homeLinkTextWrapper').removeAttr(
					 * 'onclick'); }
					 */
					/*$('.subMenu').filter(function() {
						var i = 0;
						$(this).find('li').filter(function() {
							if ($(this).hasClass('hideBlock'))
								i++;
						});
						if ($(this).find('li').length == i)
							$(this).addClass('hideBlock');
					});*/
					
//					
					$('body').on('change',function(){
						//securityMatrix();
						});
					//}
					/*
					 * if ($('#menuBarOptions').val() != "") { var options =
					 * $('#menuBarOptions').val().split(","); for ( var i = 0; i <
					 * options.length; i++) { if (options[i] != "") { $('li .' +
					 * options[i]).addClass('hideBlock'); $('.homeLinkBox.' +
					 * options[i]).children() .removeAttr('onclick'); } }
					 * $('.subMenu').filter(function() { var i = 0;
					 * $(this).find('li').filter(function() { if
					 * ($(this).hasClass('hideBlock')) i++; }); if
					 * ($(this).find('li').length == i)
					 * $(this).addClass('hideBlock'); }); }
					 */
					/*
					 * $('.updateSuccess').click(function(){
					 * window.location.href="../login/goingHome.htm?disableKey=disableKey";
					 * });
					 */

					generateTbIndex();
					$('body').on('change', function() {
						generateTbIndex();
					});
					var siteList = $('#siteList').val();
					if (siteList != null && siteList != undefined
							&& siteList.trim() != '') {
						iterateStoreList();
					}

					$('#changeStore').click(function() {
						window.location.href = '../login/changeStore.htm';
					});

					if ($('#changeStoreFlag').val() == 'Y') {
						if (!isAdminRole($('#roleId').val())) {
							createPopUp();
							// iterateStoreList();
							$("#dialog-changeStore").dialog("open");
						} else {
							$("#dialog-VerifyITAdminStore").dialog("open");
						}
					}
					// added for article detail screen create order button
					if ($('#dropdown li label').length == $('#dropdown li label.hideBlock').length) {
						$('#dropdown').addClass('hideBlock');
					}
/*
					$('.navWrapper ul,.navWrapper li').hover(function() {
						if ($(document).height() > 470) {
							var d = $(document).height() - $(window).height();
							// console.log(d);
							$('.footerWrapper').css('margin-top', d);
						} else {
							$('.footerWrapper').css('margin-top', '0px');
						}
					}, function() {
						$('.footerWrapper').css('margin-top', '0px');
					});*/
					//loadURLs();
					bindUserAccessEvents();

					/*$(".RPDG").click(function(){//To load DG report on click of the link
						
					});
					$(".RPSF").click(function(){//To load stock fill report on click of the link
						
					});	*/ //commented for defect 2898
					bindNotificationEvent();
					// add for NGBO Pilot will be commented later on
					if($('#ngboPilotStore').val() == 'Y' && callMonitorNotification){
						loadNotifications(); // loading notification on page load
						loadBroadcastMessage();						
						notIntrCounter = setInterval(function(){ monitorForNotification(); }, 300000);
					}
					/*setInterval(loadBroadcastMessage,5000);*/
//					bindNotification();
				    
				    
				    // calendar autoformatting
				    $('input.inputDate.hasDatepicker').change(function()
					  {
				  $(this).val(formateDate($(this).val()));
					  });
				    try{
				    	primaryDeprts=$.parseJSON($('#primaryDept').val()).data[$('#posSite').val()];
				    	}catch(err){}
				    	
				    	//$(".SALOC").removeAttr("style");$(".SALOC").removeClass("hideBlock");						    	

				});

 				var triggerLeaveStkAdjYes = function(e)
					{
						generalRedirection(e);
						
						//This method will unlock the current article being stock adjusted
						unlockSelectedArticle();
					};
					// defect 5891
					var triggerLeaveProcessUldsYes = function(e)
					{
						
						generalRedirection(e);
					};
					
					function generalRedirection(e)
					{
						var $elem = e.data.msg;
						$elem.dialog('close');
						var $elem = e.data.cache;
						var href = $elem.attr('href');
						if(href != '#'){
							window.location.href = href;
						}	
						else
						{
							if ($elem.parent().hasClass('AC_RPDG')) {
								downloadDGReportPDF();
							} else if ($elem.parent().hasClass('AC_RPSF')) {
								downloadStockFillReportPDF();
							} else if ($elem.parent().hasClass('AC_TKCT')) {
								redirectToCT();
							} else if ($elem.parent().hasClass('AC_UM')) {
								roleIdCall($(this));
							}else if ($elem.parent().hasClass('AC_LAYBY')) {
								redirectToLayBy();
							}
						}
					}
					
					function handleLeaveStkAdjYes(e){
						console.log(e);
						var href = $(e.target).attr('href');
						if(href != '#'){
							window.location.href = href;
						}	
						else
						{
							if ($(e.target).parent().hasClass('AC_RPDG')) {
								downloadDGReportPDF();
							} else if ($(e.target).parent().hasClass('AC_RPSF')) {
								downloadStockFillReportPDF();
							} else if ($(e.target).parent().hasClass('AC_TKCT')) {
								redirectToCT();
							} else if ($(e.target).parent().hasClass('AC_UM')) {
								roleIdCall($(e.target));
							}
						}
						
						//This method will unlock the current article being stock adjusted
						unlockSelectedArticle();
					}
					var triggerLeaveStkAdjNo = function(e)
					{
						var $elem = e.data.msg;
						$elem.dialog('close');
					};

var pos=0;var nar="   New Notification Received   ";
var scrollId=undefined;
var prevTitle=document.title;
function scroll() 
{   
  document.title=nar.substring(pos,nar.length)+nar.substring(0,pos); 
  pos=(pos+1)%nar.length;
}
 function initScroll() 
{ 		
	prevTitle=document.title;
//	scroll();
//	scrollId=setInterval(function(){scroll();},200);
	document.title=nar;
}
function stopScroll(){
//	if(scrollId!=undefined){
//		try{
//		clearInterval(scrollId);
//		document.title=prevTitle;
//		}catch(err){}
//	}
	document.title=prevTitle;
}

function bindUserAccessEvents(){
	$('#homeLinkNoAccess').click(function(){
		if($('#siteList').val()!=''){
			window.location.href='../login/goingHome.htm';
		}else{
			window.location.href='../../home.htm';
		}
	});
	$('#backButtonNoAccessLink').click(function(){
		$('#homeLinkNoAccess').trigger('click');
	});
	

}
function rearrange() {
	if ($('#navBarHighlight').val() == 'orders') {
		$('.parentTr').filter(function() {
			var id = $(this).attr('id').split('-')[1];
			var temp = $('#child-' + id);
			$('#child-' + id).remove();
			$('#parent-' + id).after(temp);
			// console.log(id);
		});
	}
}
function securityMatrix() {
	var userAcc = $('#userAccess').val();
	if (userAcc != undefined && userAcc != null && userAcc.trim() != '') {
		var userAccess = $.parseJSON($('#userAccess').val());
		if (userAccess.data != null && userAccess.data != undefined) {

			// var option = $("<h4>").html(response).find("#option").val();
			var storeMap = userAccess.data;
			$('.navWrapper li .reportBtmBrdr ').addClass('hideBlock');
			$('.navWrapper li.subMenu').removeClass('hideBlock');
			for ( var m in storeMap) {
				var list = [];
				list = storeMap[m];
				$('.' + m).removeClass('hideBlock').removeClass('R').show();
				for ( var i = 0; i < list.length; i++) {

					if (list[i].accessFlag == 'R' && m != 'AC_UM') {
						$('.' + m).addClass('R').unbind('click').removeAttr(
								'onclick');
						if (m == 'AC_VUD' || m == 'AC_UUD') {
							$('a.'+m).unbind('click').removeAttr('onclick');
							if (m == 'AC_UUD') {
								$('.' + m).find('td').find('label').unbind(
										'click').removeAttr('onclick');
							}
						}
						/*if( m == 'VID')
							{
							$('tr.'+m).unbind('click').removeAttr('onclick');
							}application settings CR */
						/*if (m == 'RTVF') {
							$('tr.' + m).unbind('click').removeAttr('onclick');
						}applicationSettings CR */
						if (m == 'AC_EPP') {
							blockPromotionDetailScreen();
						}
						/*if (m == 'AC_VOD') {
							canViewOrderDetail=false;
						}// Fix as per discussion with Sahithya for defect 14615*/
					}
					if (list[i].includeExcludeFlag != null
							&& list[i].includeExcludeFlag != ''
							&& list[i].includeExcludeFlag != undefined
							&& list[i].includeExcludeFlag == 'E') {
						$('.' + m).addClass('hideBlock');
						if(m == 'AC_MNT'){
							callMonitorNotification = false;
						}
						sohLoacalExclude(m);
					}
					if (list[i].includeExcludeFlag != null
							&& list[i].includeExcludeFlag != ''
							&& list[i].includeExcludeFlag != undefined
							&& list[i].includeExcludeFlag == 'R') {
						disableFunction(m);
					}
				}
			}
			hideSubmenu();
		}
	}

	if ($('#roleId').val() == 'ADM') {
		$('.applic-settings').removeClass('hideBlock');
		$('.applic-settings-pilot').removeClass('hideBlock');
	}

	$('.headWrapper .navWrapper a,[href="../login/goingHome.htm"]').unbind("click");
	$('.headWrapper .navWrapper a,[href="../login/goingHome.htm"]').bind("click", function(e) {

		e.preventDefault();
		var href = $(this).attr('href');
		
		//if (!$(this).parent().hasClass('R')) {
		
		//}
		//added for defect 2898+3489
		if(($('#navBarHighlight').val() == 'stockManage' || $('#navBarHighlight').val() == 'lookUp') && !$('#sohLookupContainer').is(':visible') && $('.sohArticleDetails').is(':visible'))
			{
			if($('#endSOHValue').text() != $('#endSOHValue').attr('initialValue')){//some changes are there..so warning mesg
				//var returnMsg ='You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
				$.fn.warnPopup('warn',leaveScreenMsg,'Stock Adjustment',triggerLeaveStkAdjYes,triggerLeaveStkAdjNo,'',$(this),'Discard/Back');
			}else{//no changes.no warning.just redirect
				handleLeaveStkAdjYes(e);
			}
			}// defect 5891
		else if(($('#navBarHighlight').val() == 'reports') && $('#uldSweepForm').is(':visible')
				&&  ($('#addULDTable tbody tr').length > 0 || $('#uldSweepForm').data('changed'))){//Defect 5891
			//if(){//some changes are there..so warning mesg
				//var returnMsg ='You have made changes on this page that you have not yet confirmed. If you navigate away from this page you will lose your unsaved changes';
				$.fn.warnPopup('warn',leaveScreenMsg,'Process ULDs',triggerLeaveProcessUldsYes,triggerLeaveStkAdjNo,'',$(this),'');
			//}else{//no changes.no warning.just redirect
				//generalRedirection(e);
			//}
			}else{
				if(href!= '#')
					window.location.href = href;
				else{
						if ($(this).parent().hasClass('AC_RPDG')) {
							downloadDGReportPDF();
						} else if ($(this).parent().hasClass('AC_RPSF')) {
							downloadStockFillReportPDF();
						} else if ($(this).parent().hasClass('AC_TKCT')) {
							redirectToCT();
						} else if ($(this).parent().hasClass('AC_UM')) {
							roleIdCall($(this));
						}else if ($(this).parent().hasClass('AC_LAYBY')) {
						redirectToLayBy();
					}					
					}
			}
		
		
	});
	
	// TODO to be removed temporarily hard coded to make reports menu visible
/*	$('.RPDL').removeClass('hideBlock');
	$('.RPDL').show();
	$('.RPPLU').removeClass('hideBlock');
	$('.RPPLU').show();
	$('.RPSA').removeClass('hideBlock');
	$('.RPSA').show();
	$('.RPIN').removeClass('hideBlock');
	$('.RPIN').show();
	$('.RPDG').removeClass('hideBlock');
	$('.RPDG').show();
	$('.RPRTC').removeClass('hideBlock');
	$('.RPRTC').show();
	$('.RPGS').removeClass('hideBlock');
	$('.RPGS').show();
	$('.RPOOC').removeClass('hideBlock');
	$('.RPOOC').show();
	$('.RPOS').removeClass('hideBlock');
	$('.RPOS').show();
	$('.RPSF').removeClass('hideBlock');
	$('.RPSF').show();
	$('.RPLTO').removeClass('hideBlock');
	$('.RPLTO').show();
	$('.STAKE').removeClass('hideBlock');
	$('.STAKE').show();*/
	blockNationalStocktakeFunctions();
}
/**
 * fOR ALL THE FUNCTION CODE recevied from this service, that function will be blocked for the user.
 * @param storeMap
 */
function sohLoacalExclude(m){
	 if (m == 'AC_SALOC' || m == 'AC_LEM' || m == 'AC_LEAD') { //changing code for application settings CR
		 $('.' + m).removeClass('hideBlock');
			if(m == 'AC_LEAD'){			
				$('.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
				'onclick');
				m = 'AC_LEM';
			}
			var attr = [];// fix to differentiate stock adjustment in header and in article lookup page
			attr= $('.'+m);
			var inHeader = false;
			if (attr.length == 1) {
				inHeader = true;
			}
			if(!inHeader)
			{
				for(var i=0;i<attr.length;i++)
					{
					if(i==0)
						{
						$('li.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
						'onclick');
						}
					if(i==1)
						{
						$('td.'+m+' a').removeClass('navigate').removeAttr('title').css('cursor',
						'default').css('color', '#222222').removeAttr(
						'onclick');//removed parent as we are having the onclick event in anchor tag not in its parent tag
			
						}
					}
			}
			if(inHeader)
				{
				$('li.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
				'onclick');
				}
		}
}
function blockNationalStocktakeFunctions(){
	var requestParam = {};
	nationalSTBlockMap = {};
	console.log("getNationalSTBlockingFunctionDetailsUrl"+getNationalSTBlockingFunctionDetailsUrl + ' ' + JSON.stringify(requestParam));	
	$.ajax({
	    type: "POST",
	    url: getNationalSTBlockingFunctionDetailsUrl,
	    data: JSON.stringify(requestParam),
	    beforeSend: function() {
	    	  //startLoading();
	      }
	  }).done(function(response) {
			//console.log(JSON.stringify(response));	
			if(response != undefined && response[0].msg_type == "S" ){				
				for(var i=0; i<response.length; i++){					
					if(response[i].function_code != undefined && response[i].function_code != ''){
						nationalSTBlockMap[response[i].function_code] = response[i];							
							var m = response[i].function_code;
							if (m == 'AC_SALOC') { //changing code for application settings CR
								var attr = [];// fix to differentiate stock adjustment in header and in article lookup page
								attr= $('.'+m);
								var inHeader = false;
								if (attr.length == 1) {
									inHeader = true;
								}
								if(!inHeader)
								{
									for(var k=0; k<attr.length; k++)
										{
										if(k==0)
											{
											$('li.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
											'onclick');
											}
										if(k==1)
											{
											$('td.'+m+' a').removeClass('navigate').removeAttr('title').css('cursor',
											'default').css('color', '#222222').removeAttr(
											'onclick');//removed parent as we are having the onclick event in anchor tag not in its parent tag
								
											}
										}
								}
								if(inHeader)
									{
									$('li.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
									'onclick');
									}
							}else{
								$('.'+response[i].function_code).addClass('hideBlock');
							}
					}					
				}	
				
				//stopLoading();
			} 
			//TODO remove below hardcoded val
			/*$('.ST').addClass('hideBlock');
			$('.SALOC').addClass('hideBlock');//hides the elem with particlular class-firstlink
			$('.SAC').addClass('hideBlock');//hides the elem with particlular class-seocnd link	
			$('.ROD').addClass('hideBlock');//receive order
			$('.UPRXQTY').addClass('hideBlock');//update rxd qty
			$('.RTNC').addClass('hideBlock');//Raise new claim
			$('.RTF').addClass('hideBlock');*/
	  }).fail(function() {
		  //stopLoading();
	  }).always(function() {
		  //stopLoading();
	  });	
}
function hideSubmenu() {
	$('.subMenu').filter(function() {
		var i = 0;
		$(this).find('li').filter(function() {
			if ($(this).hasClass('hideBlock'))
				i++;
		});
		if ($(this).find('li').length == i)
			$(this).addClass('hideBlock');
	});
}
function disableFunction(m) {

	if (m == 'AC_VUD' || m == 'AC_UUD') {
		$('a.'+m).unbind('click').removeAttr('onclick');
		if (m == 'AC_UUD') {
			$('.' + m).addClass('hideBlock');
		}
		
	}
	/*else if (m == 'RTVF') {
		$('tr.' + m).unbind('click').removeAttr('onclick');
	} applicationSettings CR*//*else if(m == 'VID')
		{
		$('tr.'+m).unbind('click').removeAttr('onclick');
		}application settings CR*/
	else if (m == 'AC_UM' || m == 'AC_RM') {
		console.log('AC_UM');
		$('.' + m).addClass('hideBlock');//defect 14736
	} else if (m == 'AC_SAFL'){
		$('.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
		'onclick');
	}
	else if (m == 'AC_EVCA') {
		if (!$('.AC_EVCA').hasClass('receive'))
			$('.AC_EVCA').parent().addClass('hideBlock');
		$('.AC_EVCA').addClass('hideBlock');
	} else if (m == 'AC_SALOC' || m == 'AC_LEM' || m == 'AC_LEAD') { //changing code for application settings CR
		if(m == 'AC_LEAD'){			
			$('.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
			'onclick');
			m = 'AC_LEM';
		}
		var attr = [];// fix to differentiate stock adjustment in header and in article lookup page
		attr= $('.'+m);
		var inHeader = false;
		if (attr.length == 1) {
			inHeader = true;
		}
		if(!inHeader)
		{
			for(var i=0;i<attr.length;i++)
				{
				if(i==0)
					{
					$('li.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
					'onclick');
					}
				if(i==1)
					{
					$('td.'+m+' a').removeClass('navigate').removeAttr('title').css('cursor',
					'default').css('color', '#222222').removeAttr(
					'onclick');//removed parent as we are having the onclick event in anchor tag not in its parent tag
		
					}
				}
		}
		if(inHeader)
			{
			$('li.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
			'onclick');
			}
	} else if (m == 'AC_ASOO') {
		$('.' + m).unbind('click');
		$('.AC_ASOO').removeClass('newWindowAfter').parent()
				.removeClass('linkBtn');
	} else if ($('.' + m).attr('onclick') != ''
			&& $('.' + m).attr('onclick') != undefined) {
		$('.' + m).removeProp('onclick');
	} else if (m == 'AC_EPP') {
		blockPromotionDetailScreen();
				}  else if (m == 'AC_MPGC') {
					$('.AC_MPGC input').attr('disabled','disabled');
				} else if (m == 'AC_USCD') {
					$('.AC_USCD').attr('disabled','disabled');
					$('.AC_USCD ').removeClass('inputDate');

	} /* else if (m == 'AC_DSDF') {
		ordersDsdFlag=true; // commenting out as this flag is never used
	}  else if (m == 'AC_RCDF') {
		ordersDispatchQtyFlag=true; // commenting out as this flag is never used
	} else if (m == 'AC_VOD') {
		canViewOrderDetail=false;
	}*/else if(m == 'AC_MNT'){
		callMonitorNotification = false;
	}else if(m == 'AC_GRS'){
		
                $('.grnClassHide').addClass('hideBlock').hide().unbind('click').removeProp(
				'onclick');
	}else if (m== 'AC_MPLSCD'){
		$('.' + m).prop('disabled',true);
}
	else {
		$('.' + m).addClass('hideBlock').hide().unbind('click').removeProp(
				'onclick');
	}
}

function blockPromotionDetailScreen() {
	$('#sections .saveBtn').addClass('hideBlock');
	$('#sections input.textbox').attr('disabled', 'disabled').css('background',
			'#d9d9d9');
	$('#sections .deactive-icon').removeClass('deactive-icon').unbind('click').removeAttr('title');
}
function createPopUp() {
	$("#dialog-changeStore").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 800
	});

	$("#dialog-changeStore").parent().addClass("popupWrapper");
	$("#dialog-changeStore").removeClass('hideBlock');
}
function iterateStoreList() {

	var val = $.parseJSON($('#siteList').val());
	if ($('#siteList').val() != '' && val.data != undefined && val.data != null) {
		var content = '<table class="ContentTable storeTbl" cellspacing="0"><tbody><tr><th>Site #</th><th>Site Name</th><th class="hideBlock">Address</th><th class="hideBlock">Phone #</th><th class="hideBlock">Sales Organisation</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
		// var val=$.parseJSON($('#siteList').val());
		if (val.data.length > 1) {
			var k = 1;
			$
					.each(
							val.data,
							function(i, item) {
								content += '<tr class="appendedStore ';
								content += 'pageNo-' + k;
								if (i > 9)
									content += ' hideBlock ';
								content += '"><td>'
										+ item.siteNo
										+ '</td><td>'
										+ item.siteName
										+ '</td><td class="hideBlock">'
										+ item.salesOrg
										+ ' | '
										+ item.salesOrgNm
										+ '</td><td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem" data_district="'+item.district+'" id='
										+ item.roleId
										+ '>Select</label></label></td></tr>';
								if ((i + 1) % 10 == 0)
									k++;
							});
			content += '</tbody></table>';
			// $( "#dialog-changeStore .popupData .ContentTableWrapper"
			// ).html('');
			$("#dialog-changeStore .popupData .ContentTableWrapper").find(
					'table').remove();
			$('#dialog-changeStore .tableFooter').before(content);
			// $(
			// "#dialog-selectStore").dialog('open').removeClass('visible-hide');
		} else if (val.data.length == 1 && $('#roleId').val() != ITSupport
				&& $('#roleId').val() != ADMIN
				&& $('#roleId').val() != StoreSupport) {
//			openVerifyPopup();
			$('.changeStr').addClass('hideBlock');
//			$('.changeStr').addClass('disableBlock secondaryActionBtn');
//			$('.changeStr').find('a').attr('href','');
		}

		/*
		 * else if(val.data!=null && val.data.length==0){ $( "#dialog-modal1
		 * .alertText" ).text('Sorry some technical issue occured while loading
		 * store.'); $( "#dialog-modal1 .alertText"
		 * ).dialog('open').removeClass('visible-hide'); }
		 */
		bindStoreItem();
	} else {
		//$('.changeStr').addClass('hideBlock');
		$('.changeStr').addClass('disableBlock secondaryActionBtn');
		$('.changeStr').find('a').attr('href','');
	}
}

function bindStoreItem() {
	setTimeout(
			function() {
				var recCnt = $('.appendedStore').length;
				currentPage = 1;
				if (recCnt > 10) {
					$('#dialog-changeStore .bottomPagination').removeClass(
							'hideBlock');
					$('#dialog-changeStore .bottomPagination').pagination({
						items : recCnt,
						itemsOnPage : 10,
						cssStyle : 'compact-theme',
						currentPage : currentPage,
						onPageClick : function(pageNumber) {
							showStorePage(pageNumber);

						}

					});
				} else {
					$('#dialog-changeStore .bottomPagination').addClass(
							'hideBlock');
				}
			}, 100);

	var value = '';
	$('.searchBoxStore')
			.keyup(
					function() {
						value = $(this).val();

						$('.appendedStore')
								.filter(
										function() {
											if (value != '') {
												if (($(this).children(
														':nth-child(1)').text()
														.trim().toLowerCase()
														.indexOf(value) != -1 || $(
														this).children(
														':nth-child(2)').text()
														.trim().toLowerCase()
														.indexOf(value) != -1))
													$(this).removeClass(
															'hideBlock');
												else
													$(this).addClass(
															'hideBlock');
											} else {
												$(this)
														.removeClass(
																'hideBlock');

											}

											if ($('.appendedStore:visible').length == 0) {
												$('.storeTbl')
														.find('tr :first')
														.addClass('hideBlock');
											} else {
												$('.storeTbl')
														.find('tr :first')
														.removeClass(
																'hideBlock');
											}
										});
						var recCnt = $('.appendedStore:visible').length;
						currentPage = 1;
						if (recCnt > 10) {
							$('#dialog-changeStore .bottomPagination')
									.removeClass('hideBlock');
							$('#dialog-changeStore .bottomPagination')
									.pagination({
										items : recCnt,
										itemsOnPage : 10,
										cssStyle : 'compact-theme',
										currentPage : currentPage,
										onPageClick : function(pageNumber) {
											showStorePage(pageNumber);

										}

									});
						} else {
							$('#dialog-changeStore .bottomPagination')
									.addClass('hideBlock');
						}

						if (value == '') {
							setTimeout(
									function() {
										var j = 1;
										var cont = 1;

										$('.appendedStore:visible')
												.each(
														function() {
															$(this)
																	.attr(
																			'class',
																			'');
															$(this)
																	.addClass(
																			'appendedStore')
																	.addClass(
																			'pageNo-'
																					+ cont);
															if (cont > 1) {
																$(this)
																		.addClass(
																				'hideBlock');
																// console.log('appendedStore');
															}
															if (j % 10 == 0) {
																cont++;
																// console.log(cnt);
															}

															j++;
															// //console.log(i++);
														});
									}, 50);
						} else {
							var i = 1;
							var cnt = 1;
							$('.appendedStore:visible').each(
									function() {
										$(this).attr('class', '');
										$(this).addClass('appendedStore')
												.addClass('pageNo-' + cnt);
										if (cnt > 1) {
											$(this).addClass('hideBlock');
											// console.log('appendedStore');
										}
										if (i % 10 == 0) {
											cnt++;
											// console.log(cnt);
										}

										i++;
										// //console.log(i++);
									});
						}
					});
	$('#dialog-changeStore .selectItem').click(
			function() {
				siteNo = $(this).parent().parent().parent().find('td :first')
						.text().trim();
				siteName = $(this).parent().parent().parent().find(
						'td:nth-child(2)').text().trim();
				salesOrg = $(this).parent().parent().parent().find(
						'td:nth-child(3)').text().trim().split('|')[0].trim();
				salesNm = $(this).parent().parent().parent().find(
						'td:nth-child(3)').text().trim().split('|')[1].trim();
				roleId = $(this).attr('id');
				district=$(this).attr('data_district');
				$("#dialog-confirm h4").html(
						'You have selected <strong>' + siteNo + ' | '
								+ siteName + '</strong> (' + salesNm
								+ ')<br><br>Do you want to continue?');
				$("#dialog-changeStore").dialog('close');
				$("#dialog-confirm ").dialog('open')
						.removeClass('visible-hide');
				$("#dialog-confirm #no").unbind('click');
				$("#dialog-confirm #no").click(
						function() {
							/*$("#dialog-changeStore").dialog('open')
									.removeClass('visible-hide');
							$("#dialog-confirm ").dialog('close');*/
							window.location.href='';
						});
				// var val=$( "#dialog-confirm strong").text().trim();
				/*
				 * $.ajax({ type : "get", url : "setStore.htm", data :
				 * {siteNo:siteNo,siteName:siteName,salesOrg:salesOrg,roleId:roleId},
				 * beforeSend : function() { startLoading(); }, success :
				 * function(response) { if(response!='false'){ $(
				 * "#dialog-confirm ").dialog('close'); $('.store
				 * .globalLinkLabel').text('Store: '+siteNo+' | '+siteName);
				 * window.location.href='../login/goingHome.htm'; } else{ $(
				 * "#dialog-modal1 .alertText" ).text('Sorry some technical
				 * issue occured while updating store.'); $( "#dialog-modal1
				 * .alertText" ).dialog('open').removeClass('visible-hide'); } },
				 * error : function() { // goToLogin(); }, });
				 */

			});

}
// Align element to the center of the page
function centerAlign(elem) {
	var topPos = $(window).height() / 2 - $(elem).height() / 2;
	var leftPos = $(window).width() / 2 - $(elem).width() / 2;
	$(elem).css({
		top : topPos,
		left : leftPos,
		position : 'fixed'
	});
}
function showStorePage(pageNo) {
	currentPage = pageNo;
	var pageClass = 'pageNo-' + pageNo;
	$('.appendedStore').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function bindLoader() {
	$('#statusImg').addClass('d');
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function sessionExpired() {
	try {
		window.location.href = (window.location.protocol + '//'
				+ window.location.host + '/' + window.location.pathname
				.split('/')[1]);
	} catch (err) {
		console.log(err);
	}
}
function dummyServerCall() {
 try {   
  if(usrActive){
	  $.ajax({
			type : "get",
			url : "reActivateSession.htm",			
			success : function(response) {
				if(response != undefined && response == 'true'){
					oneHourNotiCount = 0;
					console.log("reactivated.."+response);
				}else{
					callMonitorNotification = false;
					clearInterval(notIntrCounter);
				}
			},
			error : function() {
				console.log('Sorry, Some technical issue occured.');
			},
		});	 
  }else{
	  //showSessionExpPopup();
	  oneHourNotiCount ++;
	  if(oneHourNotiCount == 4){
		  callMonitorNotification = false;
		  clearInterval(notIntrCounter);
	  }
  } 
  usrActive = false;
 } catch (err) {
  console.log(err);
 }
}

function showSessionExpPopup(){	
	var minCount = 9;
	var secCount = 60;
	secCounter=setInterval(function() {
		if(minCount > 0 ||  (minCount == 0 && secCount >0)){
			$.fn.warnPopup('warn','Your session is going to Expire in '+ minCount+' Min :'
					+secCount+' Sec. Do you want to continue?','Session Expire',
					sessionExpYes,sessionExpired);
			
			secCount = secCount-1;
			if(secCount == 0){
				if(minCount != 0){	
					secCount = 60;
					minCount = minCount-1; 
				}
			}
		}else if(minCount == 0 && secCount == 0){
			minCount = 0;
			secCount = 0;
			sessionExpired();
		}
	}, 1000);
}

var sessionExpYes = function()
{
	/*for(var cnt = secCounter; cnt >= 0; cnt--){
		if(cnt != serverCallCounter && cnt != notIntrCounter){
		clearInterval(cnt);
		}
	}*/
	clearInterval(secCounter);
	secCounter = '';
	if(!$('#dialog-alert-conf').is("visible")){
		$('#dialog-alert-conf').dialog("close");
	}	
	usrActive = true;
	dummyServerCall();
}
function formateDate(v) {
	try {
		if(v.indexOf("-") > -1){//if date contains "-"
			return new date(v);
		}else if(v.indexOf(".") > -1){//if date contains "."
			return new date(v);
		}else if(v.length == 8) {
			var splitDate = v.split("/");
			var finalDate = new Date(splitDate[1] + "/" + splitDate[0] + '/'
					+ splitDate[2]);
			finalDate = splitDate[0] + "/" + splitDate[1] + "/"
					+ finalDate.getFullYear();
			return finalDate;
		} else {
			return v;
		}
	} catch (err) {
		return v;
	}
}

function generateTbIndex() {
	var index = 2;
	$('input:visible,select:visible').each(function() {
		$(this).attr('tabindex', index++);
	});
}

function bindEnterKeyEvent() {
	$(document).keypress(
			function(event) {
				if (event.which == 13) {
					if ($('.popupActions').is(':visible')) {
						$('.popupActions').find('.actionBtn:visible:first')
								.trigger('click');
					} else if ($(document.activeElement).hasClass('actionBtn')
							&& $(document.activeElement).parent()
									.is(':visible')) {
						$(document.activeElement).parent().trigger('click');
					} else {
						$('.actionBtn:visible:first').trigger('click');
					}
				}
			});
}
function getEncSapPasswordServiceCall(obj){
	var loggedInUserId = $('#loginUserId').val().trim();
	$.ajax({
		type : "get",
		url : "getEncSapPassword.htm",
		data :{userId:loggedInUserId},
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response != null && response != undefined) {
				encSapPwd = response;
						sessionStorage.password = loggedInUserId+getUTCDateForSAPPwd()+"_"+encSapPwd;
						if(obj != undefined  && obj != '')
							followAction(obj);
						else
							stopLoading();
					} else {
						$.fn.showCustomMsg(['User not authenticated, refresh and try again'],error,'Authentication Error');	
						stopLoading();
					}
				},
		error : function() {
			if(sapCallAgain){
				$.fn.showCustomMsg(['User not authenticated, refresh and try again'],error,'Authentication Error');
			}else{
				sapCallAgain = true;
				getEncSAPPassword(obj);				
			}			
		},
	});
}
//Password encrypt call change from SQLA to SCS
function getEncSAPPassword(obj) {	
	var loggedInUserId = $('#loginUserId').val().trim();
	var encPwdfromCntrl = $('#loggedInEncryptedSAPPwd').val();
	if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
			&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd())
		encSapPwd = sessionStorage.password.split("_")[1];
	else if (encPwdfromCntrl != "" && encPwdfromCntrl != undefined){
		encSapPwd = encPwdfromCntrl.trim();
	}
	else encSapPwd = "";	
	if(loggedInUserId == null || loggedInUserId =='' || loggedInUserId == undefined
	|| encSapPwd == null || encSapPwd == '' || encSapPwd == undefined){
		getEncSapPasswordServiceCall(obj);
	}else{
		if(obj != undefined  && obj != '')
			followAction(obj);
	}
}

function followAction(obj){
	if(obj.option == 'sohFullLog'){
		callReportSAPService(obj.dateT, obj.dateformat, obj.article);
	}else if(obj.option == 'showBlockingReason'){
		showBlockingReasonCall();
	}else if(obj.option == 'ibtCreateOrder'){
		callSubmitDraftToSAP(obj.itemList, obj.uldList, obj.finishButton);
	}else if(obj.option == 'finalizeReceive'){
		finalizeReceive();
	}else if(obj.option == 'orderOnReceipt'){
		submitOrderOnReceipt();
	}else if(obj.option == 'createOrder'){
		startLoading();
		submitDraftToSAPAfterConfirm(obj.drafts, obj.area, obj.submitButton);		
	}
}

function isAdminRole(role){
	if(role=='' || role==null || role==undefined)
		return false;
	
	if(role.trim() == Its
			|| role.trim() == Ss
			|| role.trim() == Adm
			|| role.trim() == Br
			|| role.trim() == POSRP
			|| role.trim() == STOTM
			|| role.trim() == STTM
			|| role.trim() == RDOU
			|| role.trim() == ITS1
			|| role.trim() == ITS2
			|| role.trim() == ITUA){
		return true;
	}else{
		return false;
	}
}

function getYesterdaysDate() {
    var date = new Date();
    date.setDate(date.getDate()-1);
    return leftPad(date.getDate(),2) + '/' + leftPad((date.getMonth()+1),2) + '/' + date.getFullYear();
}

function getTodayDate() {
    var date = new Date();
    return leftPad(date.getDate(),2) + '/' + leftPad((date.getMonth()+1),2) + '/' + date.getFullYear();
}

function leftPad(number, targetLength) {
    var output = number + '';
    while (output.length < targetLength) {
        output = '0' + output;
    }
    return output;
}

function notificationAlert() {
	document.getElementById('notificationAlert').play();
	initScroll();
	if(window_focus){
		setTimeout(function(){ stopScroll();},3000);
	}
}

function broadcastAlert() {
	document.getElementById('broadcastAlert').play();
	initScroll();
	if (window_focus) {
		setTimeout(function(){ stopScroll();},3000);
	}
}

function bindNotificationEvent() {

	// broadCast content
	$('.mainWrapper').prepend($('#broadCastContent').html());
	$('#broadCastContent').remove();
	// end broadCast content

	$('html')
			.click(
					function() {
						$('.notificationDetails.broadcastDetails')
								.addClass('hideBlock');
					});

	$('#headerNofifyArea').find('.priorityOne').addClass('hideBlock');
	$('#headerNofifyArea').find('.priorityTwo').addClass('hideBlock');
	$('#headerNofifyArea').find('.priorityThree').addClass('hideBlock');

	$('.notificationDetails,.alertsWrapper').click(function(event) {
		event.stopPropagation();
	});

	$(".alertsIcon").click(function() {
		var clickedPrior=3;
		
		if ($(this).hasClass('priorityOne')) {
			clickedPrior=1;
		} else if ($(this).hasClass('priorityTwo')) {
			clickedPrior=2;
		} else {
			clickedPrior=3;
		}

		var top = $(this).position().top;
		var left = $(this).position().left;
		$('.notificationDetails.broadcastDetails').css({
			top : top + 45,
			left : left - 305
		});
		
		if($('.notificationDetails.broadcastDetails:visible').length==1 && clickedPrior==$('.notificationDetails.broadcastDetails').data('prior')){
			$('.notificationDetails.broadcastDetails').addClass('hideBlock');
			
		}else{
			$('.notificationDetails.broadcastDetails').removeClass('hideBlock');
			$('.broadcastDetailsContent.actioned').addClass("hideBlock");
			$('.broadcastDetailsContent.settings').addClass("hideBlock");
			$('.broadcastDetailsContent.unactioned').removeClass("hideBlock");
			loadNoticationContentPriority(clickedPrior,allNotifications[clickedPrior]);
		}
		
	});

	$(
			".broadcastDetailsContent.settings .backBtn,.broadcastDetailsContent.settings .broadcastTitle.actioned")
			.click(
					function() {
						$('.broadcastDetailsContent.settings').toggleClass(
								"hideBlock");
						$('.broadcastDetailsContent.unactioned').toggleClass(
								"hideBlock");
					});
	$(
	".broadcastDetailsContent.unactioned .settings")
	.click(
			function() {
				
				$('.broadcastDetailsContent.settings').toggleClass(
						"hideBlock");
				$('.broadcastDetailsContent.unactioned').toggleClass(
						"hideBlock");
			});
	$(
			".broadcastDetailsContent.unactioned .broadcastTitle.actioned, .broadcastDetailsContent.actioned .broadcastTitle.actioned,.broadcastDetailsContent.actioned .backBtn")
			.click(
					function() {
						$(
								'.broadcastDetailsContent.unactioned,.broadcastDetailsContent.actioned')
								.toggleClass("hideBlock");
					});
	$(".broadcastText").click(function() {
		$('.lookupWrapper.detailedBroadcastContent').removeClass("hideBlock");
		$('.broadcastWrapper').addClass('hideBlock');
	});
	$("#closeBroadcastDetails").click(function() {
		$('.lookupWrapper.detailedBroadcastContent').addClass("hideBlock");
		$('.broadcastWrapper').removeClass('hideBlock');
	});
}

function loadNotification(priority){
	
}

function loadBroadcastMessage(){
	$.ajax({
		type : "get",
		url : "../broadcast/getMessage.htm",		
		beforeSend : function() {
//			console.log("broadcast message requested.")
		},
		success : function(res) {
//			console.log(res);
			var response=$.parseJSON(res); 
			buildBroadcastContent(response.data);
			bindEventForBroadCast();
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
		},
	});
}

function buildBroadcastContent(response){
	if(response!=undefined && response.length>0){
		
		if(response.length>1){
			$('.broadcastText').html('IMPORTANT : <B>'+ response.length +'</B> messages require your attention, View now.');
			var dtlContent='<div class="broadcastTitleText">List of Broadcasts ('+response.length+'): <label class="linkBtn" id="closeBroadcastDetails"><label class="closeWindow">Close</label></label><label class="actionBtn hideBlock">Acknowledge All</label></div>';
			for(var i in response){
				dtlContent+='<h3 class="broadcastLineItem">'+response[i].message+'.';
				if(response[i].isAckReq=='Y' && response[i].isAck!='Y'){
					dtlContent+='<label class="actionBtn" data-bid="'+response[i].messageId+'" >Done</label>';
				}
				dtlContent+='</h3>';
			}
			$('.detailedBroadcastContent').find('.broadcastContent').html(dtlContent);
			
			$(".broadcastText").unbind('click');
			$(".broadcastText").click(function() {
				$('.lookupWrapper.detailedBroadcastContent').removeClass("hideBlock");
				$('.broadcastWrapper').addClass('hideBlock');
			});
			
		}else{
			$('.broadcastText').html('IMPORTANT : '+response[0].message);
			if(response[0].isAckReq=='Y' && response[0].isAck!='Y') {
				$('.broadcastWrapper').find('.broadcastAction').removeClass('hideBlock').text('Done');
				$('.broadcastWrapper').find('.broadcastAction').attr('data-bid',response[0].messageId);
			}
			else{
				$('.broadcastWrapper').find('.broadcastAction').addClass('hideBlock');
			}
			$('.broadcastText').unbind('click');
			$('.lookupWrapper.detailedBroadcastContent').addClass('hideBlock');
		}
		if($('.lookupWrapper.detailedBroadcastContent:visible').length==0){
			$('.broadcastWrapper').removeClass('hideBlock');
		}
		playAlertOnNewMessage($('.broadcastText').data('obj'),response);		
		$('.broadcastText').data('obj',response);
	}
}

function playAlertOnNewMessage(oldObj,newObj){
	var flag=false;
	if(oldObj==undefined || newObj==undefined || newObj.length==0) return flag;
	for(var i in newObj){
		if(compareWithOld(newObj[i],oldObj)){
			flag=true;
		}
	}
	
	if(flag) broadcastAlert();
}

function compareWithOld(newObjItm,oldObj){
	var flag=true;
	for(var i in oldObj){
		if(oldObj[i].messageId==newObjItm.messageId){
			flag=false;
		}
	}
	return flag;
}

function bindEventForBroadCast(){
	
	$("#closeBroadcastDetails").unbind('click');
	$("#closeBroadcastDetails")
	.click(
			function() {
				$('.lookupWrapper.detailedBroadcastContent')
						.addClass("hideBlock");
				$('.broadcastWrapper').removeClass('hideBlock');
	});
	
	$('[data-bid]').unbind('click');
	$('[data-bid]').click(function(){
		sendAcknowledgement($(this).attr('data-bid'));
	});
}

function sendAcknowledgement(messageId){
	$.ajax({
		type : "post",
		url : "../broadcast/sendAcknowledge.htm",
		data : {"user_id":$('#loginUserId').val(),"bc_id":messageId},
		beforeSend : function() {
			console.log("Acknowlege is sending.");
		},
		success : function(res) {
			console.log(res,messageId);
			var response=$.parseJSON(res);
			if(response.typ=='S'){
				loadBroadcastMessage();
			}else{
				console.log('technical issue occured.');
			}
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
		},
	});
}

function bindNotification() {
	var wsocket=null;
	$(window).load(
			function() {
				wsocket = new WebSocket(
						"ws://NNORSOVMWS396:8025/websockets/broadcast");
				wsocket.onopen = function() {
					console.log('Connection open!');
				};
				wsocket.onclose = function() {
					console.log('Connection closed');
					bindNotification();
				};
				wsocket.onmessage = function(e) {
					try {
						var server_message = e.data;
						console.log(server_message);
						handleNewNotification($.parseJSON(server_message));
						notificationAlert();
					} catch (err) {
						console.log(err);
					}
				};
			});

	$(window).unload(function() {
		wsocket.close();
	});
}
function handleNewNotification(data){
	for(var i in data){
		var itm=data[i];
		
		if(allNotifications[itm.PRIORITY]==undefined){
			var x={};
			x[itm.NOTIFY_ID]=[itm];
			allNotifications[itm.PRIORITY]=x;
		}else if(allNotifications[itm.PRIORITY][itm.NOTIFY_ID]==undefined){
			allNotifications[itm.PRIORITY][itm.NOTIFY_ID]=[itm];
		}else{
			allNotifications[itm.PRIORITY][itm.NOTIFY_ID].push(itm);
		}
		loadNoticationContentPriority(itm.PRIORITY,allNotifications[itm.PRIORITY]);
	}
}

function monitorForNotification() {
	var data = {
		"userid" : $('#loginUserId').val(),
		"role" : $('#roleId').val(),
		"sales_org" : $('#salesOrg').val(),
		"site_no" : $('#posSite').val()
	};

	$.ajax({
		type : "post",
		url : notificationListUrl,
		data : JSON.stringify(data),
		contextType : "application/json",
		beforeSend : function() {
		},
		success : function(res) {
			var response = res;
			var allnoti=getAllNotificationDtl(response);
			if(checkIfAnyNewNotification(allnoti)){
				buildNoticationContent(response);
				setAllNotification(response);
				notificationAlert();
			}
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
		},
	});
}

var allNotificationsDtl=[];

function setAllNotification(response){
	var notificationDtl='';
	for(var i in response){
		notificationDtl+=response[i].notify_dtlid_list+',';
	}
	allNotificationsDtl=notificationDtl.split(',');
}

function getAllNotificationDtl(response){
	var notificationDtl='';
	for(var i in response){
		notificationDtl+=response[i].notify_dtlid_list+',';
	}
	return notificationDtl.split(',');
}

function checkIfAnyNewNotification(newNotication){
	newNotication = newNotication.filter(function(val) {
		  return allNotificationsDtl.indexOf(val) == -1;
	});
	if(newNotication.length>0){
		return true;
	}else{
		return false;
	}
}

function loadNotifications(){
	var data=	{ 		
					"userid":$('#loginUserId').val(),
		 			"role":$('#roleId').val() ,
		 			"sales_org":$('#salesOrg').val(),
		 			"site_no":$('#posSite').val()
				};
	
	$.ajax({
		type : "post",
		url : notificationListUrl,	
		data:JSON.stringify(data),
		contextType:"application/json",
		beforeSend : function() {
			console.log("broadcast message requested."+notificationListUrl);
		},
		success : function(res) {
//			console.log(res);
			var response=res; 
			buildNoticationContent(response);
			setAllNotification(response);
//			bindEventForBroadCast();
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
		},
	});
}
function buildNoticationContent(response){
	
	for(var i=0;i<response.length;i++){
		response[i].priorIndex=i;
	}
	
	var priorityGrp=$groupBy(response, function(obj) {
		return obj.priority;
	});
	allNotifications={};
	
	for(var key in priorityGrp){
		allNotifications[key]=$groupBy(priorityGrp[key], function(obj) {
			return obj.isread;
		});
	}
	
	for(var key in allNotifications){
		for(var key1 in allNotifications[key]){
			allNotifications[key][key1]=$groupBy(allNotifications[key][key1], function(obj) {
				return obj.notifyid;
			});
		}
		
	}
	console.log('All notification :',allNotifications);
	
	for(var pri in allNotifications){
			loadNoticationContentPriority(pri,allNotifications[pri]);
	}
}
function loadNoticationContentPriority(pri,notificationList){
	var priorityName=3;
	var total=0,readTotal=0;
	
	var content='';
	var readContent='';
	
	for(var key in notificationList){
		notification=notificationList[key];
		if(key=='Y'){
			var itemcount=0;
			var tmp=[];
			for(var key in notification){
				tmp.push(notification[key][0]);
			}
			notification=$groupBy(tmp, function(obj) {
				return obj.priorIndex;
			});
			console.log('Ordered index :'+JSON.stringify(notification));
			for(var key in notification){
				itemcount+=1;
				var lastRow='';
				if(Object.keys(notification).length==itemcount) lastRow='lastItem';
				var itemCount=notification[key][0].notify_dtlid_list.split(',').length;
				readTotal+=itemCount;
				if (notification[key][0].notifyid == ticketNotifId) {
                    readContent += '<div class="broadcastItem unactioned viewed ' +
                        lastRow +
                        '" data-notifyId="' +
                        notification[key][0].notifyid +
                        '" ><label class="title homeLinkText">' +
                        notification[key][0].notif_title 
                        //' <button id="' +
                        //notification[key][0].notifyid +
                        //'" '
                        //+'onclick="printTicketNotification()" style="padding: 5px!important;float:right;">Send</button>'
                        +'</label>'+'<label class="message"> '
                        // + notification[key].length+' '
                        +
                        itemCount +
                        ' ' +
                        notification[key][0].msgtext +
                        '</label> <label class="timestamp">' 
                        + getjsTimeDiff(notification[key][0].sec_diff)
                        +'</label></div></div>';
                } else {

                	readContent += '<div class="broadcastItem unactioned viewed ' +
                        lastRow +
                        '" data-notifyId="' +
                        notification[key][0].notifyid +
                        '" ><label class="title homeLinkText">' +
                        notification[key][0].notif_title +
                        '</label> <label class="message"> '
                        // + notification[key].length+' '
                        +
                        itemCount +
                        ' ' +
                        notification[key][0].msgtext +
                        '</label> <label class="timestamp">'
                        + getjsTimeDiff(notification[key][0].sec_diff)
                        +'</label></div></div>';

                }
			}
		}else{
			var itemcount=0;
			var tmp=[];
			for(var key in notification){
				tmp.push(notification[key][0]);
			}
			notification=$groupBy(tmp, function(obj) {
				return obj.priorIndex;
			});
			console.log('Ordered index :'+JSON.stringify(notification));
			for(var key in notification){
				itemcount+=1;
				var lastRow='';
				if(Object.keys(notification).length==itemcount) lastRow='lastItem';
				var itemCount=notification[key][0].notify_dtlid_list.split(',').length;
				total+=itemCount;
				if (notification[key][0].notifyid == ticketNotifId) {
                    content += '<div class="broadcastItem unactioned ' +
                        lastRow +
                        '" data-notifyId="' +
                        notification[key][0].notifyid +
                        '" ><label class="title homeLinkText">' +
                        notification[key][0].notif_title +
                        '</label><label class="message"> '
                        // + notification[key].length+' '
                        +
                        itemCount +
                        ' ' +
                        notification[key][0].msgtext +
                        '</label> <label id="' +
                        notification[key][0].notifyid +
                        '" onclick="printTicketNotification(\'\',$(this))"  class="ticket-btn">Send</button></label> <label class="timestamp">'
                        +getjsTimeDiff(notification[key][0].sec_diff)
                        +'</label></div></div>';
                } else {

                    content += '<div class="broadcastItem unactioned ' +
                        lastRow +
                        '" data-notifyId="' +
                        notification[key][0].notifyid +
                        '" ><label class="title homeLinkText">' +
                        notification[key][0].notif_title +
                        '</label> <label class="message"> '
                        // + notification[key].length+' '
                        +
                        itemCount +
                        ' ' +
                        notification[key][0].msgtext +
                        '</label> <label class="timestamp">'
                        +getjsTimeDiff(notification[key][0].sec_diff)
                        +'</label></div></div>';


                }
			}
		}
	}
	
	$('.notificationDetails.broadcastDetails').data('prior',pri);
	if(pri==1){
		priorityName='One';
		$('#headerNofifyArea').find('.priorityOne').removeClass('hideBlock').find('label').text(total);
	}else if(pri==2){
		priorityName='Two';
		$('#headerNofifyArea').find('.priorityTwo').removeClass('hideBlock').find('label').text(total);
	}else{
		priorityName='Three';
		$('#headerNofifyArea').find('.priorityThree').removeClass('hideBlock').find('label').text(total);
	}
	
	if(content=='') content='<div class="broadcastItem settings-radio">No new notification found.</div>';
	if(readContent=='') readContent='<div class="broadcastItem settings-radio">No notification found.</div>';
	
	var contentHdr=''
		 +'<div class="broadcastTitle ">Priority '+priorityName+' Notifications ('+total+')</div>'
		 +'<label class="settings"></label> <label class="notification-close">Close</label>';
	
	var readContentHdr=''
		  +'<div class="broadcastTitle">Previously Read ('+readTotal+')</div>'
		  +'<label class="backBtn"></label>';
	$('.broadcastDetailsContent.settings .actioned').text('View Notifications ('+total+')');
	
	content=contentHdr+content+'<div class="broadcastTitle actioned lastItem">Previously Read ('+readTotal+')</div>';
	
	$('.broadcastDetailsContent.unactioned').html(content);	
	$('.broadcastDetailsContent.actioned').html(readContentHdr+readContent);
	$('.notification-close').unbind('click');
	$('.notification-close').click(function(){
		$('.notificationDetails.broadcastDetails').addClass('hideBlock');
	});
	bindNotifyElemEvents();
}

function bindNotifyElemEvents(){
	$( ".broadcastDetailsContent.unactioned .settings" ).unbind('click');
	$( ".broadcastDetailsContent.unactioned .settings" ).click(function() {
		loadNotificationSettings();
		$('.broadcastDetailsContent.settings').toggleClass("hideBlock");
		$('.broadcastDetailsContent.unactioned').toggleClass("hideBlock");
	});
	$( ".broadcastDetailsContent.settings .backBtn,.broadcastDetailsContent.settings .broadcastTitle.actioned" ).unbind('click');
	$( ".broadcastDetailsContent.settings .backBtn,.broadcastDetailsContent.settings .broadcastTitle.actioned" ).click(function() {
		$('.broadcastDetailsContent.settings').toggleClass("hideBlock");
		$('.broadcastDetailsContent.unactioned').toggleClass("hideBlock");
	});
	$( ".broadcastItem.settings-radio input").unbind('click');
	$( ".broadcastItem.settings-radio input").click(function() {
		var notify_settings= "Y";
		if($('[name="notificationSettings"]:checked').attr('id')=="notification_allDepartments"){
			notify_settings= "Y";
		}else{
			notify_settings= "N";
		}
		setNotificationSettings(notify_settings);
	});
	
	$( ".broadcastDetailsContent.unactioned .broadcastTitle.actioned, .broadcastDetailsContent.actioned .broadcastTitle.actioned,.broadcastDetailsContent.actioned .backBtn" ).unbind('click');
	$( ".broadcastDetailsContent.unactioned .broadcastTitle.actioned, .broadcastDetailsContent.actioned .broadcastTitle.actioned,.broadcastDetailsContent.actioned .backBtn" ).click(function() {			
		$('.broadcastDetailsContent.unactioned,.broadcastDetailsContent.actioned').toggleClass("hideBlock");
	});
	
	$(".broadcastItem.settings-radio").unbind('click');
	$(".broadcastItem.settings-radio").click(function(){
		
	});
	
	$('[data-notifyid]').unbind('click');
	$('[data-notifyid]').click(function(e){
		 e.stopPropagation();
		if($(this).attr('data-notifyid') != ticketNotifId /*
				|| $(this).hasClass('viewed')*/ // 6490 for defect
				){
			loadNotifTbl($(this));
		}
	});
}

function loadNotifTbl($elem){
	var title=$elem.find('.homeLinkText').text();
	var data={ 		
		"userid":$('#loginUserId').val(),
			"sales_org":$('#salesOrg').val(),
			"notifyid":$elem.attr('data-notifyid'),
			"role":$('#roleId').val() ,
			"isread":($elem.hasClass('viewed')?'N':'Y')
	};
	$.ajax({
		type : "post",
		url : notificationDtlListUrl,	
		data:JSON.stringify(data),
		contextType:"application/json",
		beforeSend : function() {
//			console.log("broadcast message requested.")
		},
		success : function(res) {
//			console.log(res);
			var response;
			if(data.isread=='Y'){
				response = $.grep(res, function (element, index) {
				    return element.isread === 'N';
				});
			}else{
				response = $.grep(res, function (element, index) {
				    return element.isread === 'Y';
				});
			}
			if(data['notifyid'] == ticketNotifId && data['isread'] == 'Y'){
				printTicketsOutOfQueue();
			}else{
				 
				loadNoticationListContent(response,title);
				$('.notificationDetails.broadcastDetails').addClass('hideBlock');
				loadNotifications();
			}
//			bindEventForBroadCast();
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
		},
	});
		
}
function loadNoticationListContent(data,title){
	
	for(var i=0;i<data.length;i++){  
		data[i].priorIndex=i;
	}
	
	var map=$groupBy(data, function(obj) {
		return obj.notify_dtl_id;
	});
	var column=[];
	flag=false;
	var index=1;
	var totalRec=Object.keys(map).length;
	for(var key in map){
		
		if(!flag){
			for(var c in map[key]){
				column.push(map[key][c].col_name);
			}
			buildDetailTableHeader(column,title,Object.keys(map).length);
			flag=true;
		}
		var tr=getTrNotify(column,map[key],index,totalRec);	
		index++;
		$('#NotifyDtlItms').prepend(tr);
	}
	bindDynamicPagination();
}
function getTrNotify(column,list,index,totalRec){
	var pageNo=Math.floor((totalRec-index)/nt_limit)+1;
	var content='<tr class="ntRows ntPageNo-'+pageNo+'">';
	var colmap=$groupBy(list, function(obj) {
		return obj.col_name;
	});
	console.log(colmap);
	for(var i in column){
		console.log(column[i]);
		content+='<td class="centerValue">'+colmap[column[i]][0].col_value+'</td>';
	}
	content+='</tr>';
	return content;
}
function buildDetailTableHeader(column,title,count){
	buildBreadcrum();
	$('.notificationDetailPage').remove();
	$('.contentWrapper:visible:first').addClass('mainContentWrapper').addClass('hideBlock');
	var rowTemplate='<tr>';
	var content='<div class="tableInfo" style="padding-top: 7px;!important"><div class="tableTitle"><h4 class="sectionTitle">'+title+' ('+count+')</h4></div></div>';
	if(column.length>0){
		content+='<table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter" id="viewModeTable1"><thead>';
	}
	content+='<tr>';
	for(var i in column){
		content+='<th class="centerValue noSort">'+column[i]+'</th>';
		rowTemplate+='<td columnFor="'+column[i]+'">'+column[i]+'</td>';
	}
	rowTemplate+='</tr>';
	content+='</tr></thead><tbody id="NotifyDtlItms"></tbody></table><div id="nt_paginationArea" style="    float: right;"></div>';
	var contentWrapper='<div class="contentWrapper notificationDetailPage"> <div class="ContentTableWrapper" id="viewMode">'+content+'</div></div>';
	$('.mainContentWrapper:first').after(contentWrapper);
	return rowTemplate;
}
function bindDynamicPagination(){
	if($('.ntRows').length>nt_limit){
		$("#nt_paginationArea").pagination({
			items : $('.ntRows').length,
			itemsOnPage : nt_limit,
			cssStyle : 'compact-theme',
			currentPage : 1,
			onPageClick : function(pageNo) {
				//callClaimsSummaryService(pageNo, 10, 'DRAFT');
				$('.ntRows').addClass('hideBlock');
				$('.ntPageNo-'+pageNo).removeClass('hideBlock');
			}

		});
		$("#nt_paginationArea").removeClass('hideBlock');
		$('.ntRows').addClass('hideBlock');
		$('.ntPageNo-1').removeClass('hideBlock');
	}else{
		$("#nt_paginationArea").addClass('hideBlock');
	}
}
function buildBreadcrum(){
	$('.tmpBreadCrumb').remove();
	content='<div class="breadcrumbWrapper tmpBreadCrumb">'
		+'<div class="breadcrumbs"><label class="breadcrumbLabel"> You are here: </label>	<ul><li><a href="../login/goingHome.htm">Home</a></li><li class="currentPage">Notifications Details</li>	</ul></div><div class="statusWrapper"><label class="loading hideBlock">We are getting data,	please wait</label> <label class="secondaryActionBtn" id="tmpBackBtn">Back</label></div></div>';
	$('.breadcrumbWrapper').addClass('mainbreadcrumbWrapper').addClass('hideBlock');
	if($('.mainbreadcrumbWrapper')==undefined || $('.mainbreadcrumbWrapper').length<=0){
		$('.headWrapper').append(content);
	}else{
		$('.mainbreadcrumbWrapper:first').after(content);
	}
	$('#tmpBackBtn').unbind('click');
	$('#tmpBackBtn').click(function(){
		$('.tmpBreadCrumb').remove();
		$('.notificationDetailPage').remove();
		$('.mainbreadcrumbWrapper:first').removeClass('hideBlock').removeClass('mainbreadcrumbWrapper');
		$('.mainContentWrapper:first').removeClass('hideBlock').removeClass('mainContentWrapper');
	});
	
}
function printTicketNotification(e,$elem) {
	if (!e)e = window.event;
    if (e.stopPropagation) {
      e.stopPropagation();
    }
	loadNotifTbl($elem.parent());
}

function printTicketsOutOfQueue(){
	var user = $("#loginUserId").val();
    var siteNo = $("#posSite").val();
    var param = {
        "iv_session": "",
        "iv_site_no": siteNo,
        "iv_user": user,
        "iv_platform": ""

    };
    console.log(printTicketUrl + ' ' + JSON.stringify(param));
    $.ajax({
        type: "POST",
        url: printTicketUrl,
        data: JSON.stringify(param),
        beforeSend: function() {
            startLoading();
        }
    }).done(function(response) {
        stopLoading();
        loadNotifications();
    }).fail(function() {
        stopLoading();
    }).always(function() {
        stopLoading();
    });
}
function getjsTimeDiff(dateTime){
	//var nd=convertJSDate(dateTime);
	var cd=new Date();
	var diff=dateTime; //cd-nd;
	
	/*if(diff.getFullYear()>0){
		return diff.getFullYear()+"year "+diff.getFullYear()+" month ago";
	}else if(diff.getMonth()>0){
		return diff.getMonth()+"month "+diff.getDate()+" day ago";
	}else */
	var str='';
	if(getjsDate(diff)>0){
		str= (getjsDate(diff)+" day "+getjsHours(diff)+" hr ago");
	}else if(getjsHours(diff)>0){
		str= (getjsHours(diff)+" hr "+getjsMinutes(diff)+" min ago");
	}else{
		str= (getjsMinutes(diff)+" min "+getjsSeconds(diff)+" sec ago");
	}
	return str;
}
function getjsDate(diff){
	return  Math.round(diff / 86400000); // days
}
function getjsHours(diff){
	return Math.round((diff % 86400000) / 3600000); // hours
}
function getjsMinutes(diff){
	return Math.round(((diff % 86400000) % 3600000) / 60000); // minutes
}
function getjsSeconds(diff){
	return Math.round((((diff % 86400000) % 3600000) % 60000) / 1000); // secs
}
function convertJSDate(dateTime){
	var dd=dateTime.split(' ')[0].split('/')[1];
	var mm=dateTime.split(' ')[0].split('/')[0];
	var yy=dateTime.split(' ')[0].split('/')[2];
	var hh=dateTime.split(' ')[1].split(':')[0];
	var min=dateTime.split(' ')[1].split(':')[1];
	var sec=dateTime.split(' ')[1].split(':')[2];
	var retDate=new Date();
	retDate.setDate(dd);
	retDate.setMonth(mm-1);
	retDate.setYear(yy);
	retDate.setHours(hh);
	retDate.setMinutes(min);
	retDate.setSeconds(sec);
	return retDate;
}

function loadNotificationSettings(){
	
	var data=	{ 		
					"user_id":$('#loginUserId').val()
				};
	
	$.ajax({
		type : "post",
		url : getnotificationSettingsUrl,	
		data:data,
		beforeSend : function() {
			startLoading();
		},
		success : function(res) {
			console.log(res);
			res=$.parseJSON(res);
			if(res!=null && res!=undefined && res.typ!=undefined && res.typ=='S'){
				if(res.msg=='Y'){
					$('.broadcastItem.settings-radio #notification_allDepartments').prop('checked',true);
					$('.broadcastItem.settings-radio #notification_myDepartments').prop('checked',false);
				}else{
					$('.broadcastItem.settings-radio #notification_allDepartments').prop('checked',false);
					$('.broadcastItem.settings-radio #notification_myDepartments').prop('checked',true);
				}
			}
			stopLoading();
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
			stopLoading();
		},
	});
}

function setNotificationSettings(notify_settings){
	
	var data=	{ 		
					"user_id":$('#loginUserId').val(),
					"notify_settings":notify_settings
				};
	
	$.ajax({
		type : "post",
		url : setnotificationSettingsUrl,	
		data:data,
		beforeSend : function() {
//			console.log("broadcast message requested.")
			startLoading();
		},
		success : function(res) {
			res=$.parseJSON(res);
			if(res!=null && res!=undefined && res.typ!=undefined && res.typ=='S'){
				
			}else{
				console.log('Settings save failed');
			}
			stopLoading();
		},
		error : function() {
			console.log('Sorry, Some technical issue occured.');
			stopLoading();
		},
	});
}
/*$(function() {
    $(this).bind("contextmenu", function(e) {
        e.preventDefault();
    });
});*/