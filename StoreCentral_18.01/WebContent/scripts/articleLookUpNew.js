var DaysOnHand = '';
var change = '';
var isRandomWghtArticle = false;
var nonPiItem = false;
var articleDraftObj = {};
var $sohAdjelem = undefined;
var rangingAndDeranging = false;
var $sohDtlCont = undefined;
var deleteFlag=false;
var uomRadio_ticketContent ='';
var globelResponse = '';
var isCPBDarticle = false;
var selectedArticleMPL = '';
var isScalledFlag = true;
var articleMplScUom = '';
var nextOrderedQty = ''; //Defect 11994 & 12277 - R18.01
var nextDeliveryDate = ''; //Defect 11994 & 12277 - R18.01
$(document)
		.ready(
				function() {
					hideWarn();
					getEncSAPPassword();
					salesOrg = $('#salesOrg').val();
					$('.articleSearch').keydown(
							function() {
								if ($('.pageErrorsWrapper').is(':visible')
										&& $(this).val().length > 0) {
									clearAllErrors();
								}
							});
					$('.nearbyStore')
							.find('input[type="checkbox"]')
							.click(
									function() {
										clearAllErrors();
										if ($(this).val() == 'All') {
											if ($(this).is(':checked')) {
												$('.nearbyStore')
														.find(
																'input[type="checkbox"]')
														.prop('checked', true);
											} else {
												$('.nearbyStore')
														.find(
																'input[type="checkbox"]')
														.prop('checked', false);
											}
										} else {
											if ($('.nearbyStore')
													.find(
															'input[type="checkbox"]:checked').length == $(
													'.nearbyStore').find(
													'input[type="checkbox"]').length - 1) {
												if ($(this).is(':checked')) {
													$('.nearbyStore')
															.find(
																	'input[value="All"]')
															.prop('checked',
																	true);
												} else {
													$('.nearbyStore')
															.find(
																	'input[value="All"]')
															.prop('checked',
																	false);
												}
											}
										}

									});
					// setErrorWrapper();
					//getEncryptedPassword();
									
					bindEnterSpecKeyEvent();
					tempSort('instorePromoReportTable');

					$(window).resize(function() {
						// setErrorWrapper(); // commenting as per discussion
						// with Guru
					});

					$("#dialog-printall").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 500,
						width : 300
					});
					
					$("#dialog-printall").parent().addClass("popupWrapper");
					$("#dialog-printall").parent().find('.popupData').addClass(
							"print-all-width");
					vendorSmart($('#vendorText'), '', '', 10, true);
					
					
					styleSearch('#styleInput','#verifyStyle');
					
					$("#verifyStyle")
					.click(
							function() {
								
								startLoading();
								styleBox=$('#styleInput').val();
								var param = {
										   "iv_style": styleBox,
										   "iv_auto_stockR": "",
										   "iv_ranged": "",
										   "iv_session_id": "",
										   "iv_auto_stockr_flag": ""
										};
								console.log(getInfoByStyleURL + ' ' + JSON.stringify(param));
								$.post(getInfoByStyleURL, JSON.stringify(param)).done(
										function(data) {
											var response = data;
											populateColorList(response);
											populateSizeList(response);
											stopLoading();
										});
							}
							);
					
					$('#styleInput').on('input', function() {
					   //on change of style
						response=[];
						populateColorList(response);
						populateSizeList(response);
					});
					
					
					
					if(salesOrg=="1060"){
						    $("#sizeTab").removeClass('hideBlock');
						    $("#styleTab").removeClass('hideBlock');
						    $("#seasonTab").removeClass('hideBlock'); 
		                }
		               		
					//added to set the soh dialog box
					$sohAdjelem = $("#dialog-soh-adjust-modal");
					$sohAdjelem.find('.popupContent').html('');
					$sohAdjelem.dialog({ autoOpen : false, modal : true, resizable : false, minHeight : 300, maxHeight : 400, width : 950 }).removeClass('visible-hide');
					$sohAdjelem.parent().addClass("popupWrapper");
					$('.sadjDetail').click(function()
							{
						$('#backBtn').trigger('click');
							});
				});

function setErrorWrapper() {
	$(
			'#errorWrapper1,#noDataWarningWrapper,#warningWrapper,#errorMsgDivEmailPop,#errorWrapperForEdit')
			.css('margin-left', ($(window).width() - 980) / 2);
}

function showblockingReason() {
	var loggedInUserId = $('#loginUserId').val();	
	if(sessionStorage.password != "" &&  sessionStorage.password != undefined 
			&& sessionStorage.password.split("_")[0] == loggedInUserId+getUTCDateForSAPPwd()){
		showBlockingReasonCall();
	}else{
		getEncSAPPassword({option:'showBlockingReason'});			
	}
}

function showBlockingReasonCall(){	
	var siteNo = $('#posSite').val();
	var param = {
		"iv_article" : articleNo,
		"iv_site" : siteNo,
		"iv_session_id" : "",
		"iv_ranged" : "N",
		"iv_src_supply" : "",
		"iv_supplier" : "",
		"iv_barcode" : "",
		"iv_node_id" : "",
		"iv_node_level" : "",
		"iv_desc" : "",
		"iv_article_no" : "Y",
		"iv_gtin" : "",
		"iv_barcode_flag" : "",
		"iv_sales_org" : salesOrg,
		"iv_sap" : encSapPwd,
		"iv_user_id" : $('#loginUserId').val(),
		"iv_auto_stockr_flag" : ""
	};	
	console.log(articleBlockingReasonServiceURL + ' ' + JSON.stringify(param));
	$.ajax({
		type : "post",
		url : articleBlockingReasonServiceURL,
		data : JSON.stringify(param),
		beforeSend : function() {
			clearAllErrors();
			startLoading();
		},
		success : function(response) {			
			if (response == null || response == undefined ||
					response.length == 0){
				errors = 'Sorry, Some technical issue occured.';
			}else if (checkResult(response,'article_no')) {
				if (response[0].msg_type != null && response[0].msg_type != undefined && response[0].msg_type == 'E'){
					if(response[0].msg != null && response[0].msg != undefined && response[0].msg != '')
						errors = response[0].msg;
					else
						errors = sapSerErrMsg;
					$.fn.showCustomMsg([errors], error, "Article Lookup");
				}else{
					showBlockingReasonPopup(response[0]);
				}
			} 
			stopLoading();
		},
		error : function() {
			var errors = 'Sorry, Some technical issue occured.';
			showAllErrors(errors);
			stopLoading();
		},
	});

}
function showBlockingReasonPopup(response){
	clearAllErrors();	
	var cont = '';
	$('#dialog-blocking-reason').parent().find('.ui-dialog-title').text(
			'Replenishment Blocking');
	$('#dialog-blocking-reason').find('popupActionsWrapper').removeClass(
			'margni-top30');
	
	cont += '<div>';
		
	cont += '<div class="pos_prc_cont">'
		+ '<table class="ContentTable sc-mpl-edit" width="100%" cellspacing="0"><tbody class="uomRadioTablePopUp">'
		+'<tr class="lastRow">'
		+ '<td width="50%">Replenishment Block Reason:</td><td width="50%" align="center" class="valueInfo price">'
		+ (response.future_plan_reason  == "" ? "":response.future_plan_reason)		
		+'</td>' + '</tr>'
		+'<tr class="lastRow">'
		+ '<td width="50%">Replenishment Blocking Date:</td><td width="50%" align="center" class="valueInfo price">'
		+ (response.reason_valid_from  == "" ? "":response.reason_valid_from.replace(/\./g,'/'))
		+ (response.reason_valid_from  != "" && response.reason_valid_to != "" ?' to ':"")
		+ (response.reason_valid_to  == "" ? "":response.reason_valid_to.replace(/\./g,'/'))
		+'</td>' + '</tr>'
		+'</tbody></table></div>';	
	
	cont += ('</div>');
	
	var $dialog = $('#dialog-blocking-reason');
	$dialog.find('#blocking_reason_content').html(cont);
	$dialog.dialog('open');
	$('#dialog-blocking-reason').parent().css('width', '460px');	
}


var currentPage = 1;
var currentPageInPopup = 1;
var currentPageInNear = 1;
var currentPageInCurrent = 1;
var currentPageInPast = 1;
var currentPageInFuture = 1;
var currentPageInOnOrder = 1;
var itemsOnPage = 10;
var recordCount;
var recordCountInOnOrder;
var articleDisplayList = [];
var articleNo;
var articleDesc;
var articleUom;
var autoStockRflag;
var rplArray = '';
var nxtDlvryData = '';
var additionalEan = '';
var linkedItemsArray = '';
var outOfCdAry = '';
var posArray = '';
var additionalDetails = '';
var securityFlag = '';
var localSecurityFlag = '';
var securityTag = '';
var roasterDate;
var nodeId;
var nodeLevel;
var isBigw;
var suggestionList;
var confirmmsg = 'Please Confirm to remove Aisle Info from the list?';
var salesOrg = $('#salesOrg').val();
var articleDtlInfo = {};
var packBreakInd;
var complexPBDFlag;
var rangedFlag;
var articleType;
var deptNo = '';
var category = '';
var subCategory = '';
var segment = '';
var articleGST = '';
var articleSellGrp = '';
var nearByStoreResults = [];
var recordCountInNear;
var itemsOnPageInNear = 10;
var isRecalled = false;
var isArchived = false;
var isALCStatus = false;
var isDeleted = false;
var loggedInUser;
var currentPageInExpire = 1;
var repUomArray = [];
var articleHdrObj = '';
var fromController;
$(document)
		.ready(
				function() {
					isBigw = $('#isBigw').val();
					salesOrg = $('#salesOrg').val();
					loggedInUser = $('#loginUserId').val();
					fromController = $('#fromScreen').val();
					if (fromController != null && fromController != undefined
							&& fromController != ''
							&& fromController == 'navigate')
						fromScreen = undefined;
					else
						fromScreen = 'fromLookup';
					$('body')
							.keypress(
									function(e) {
										var code = e.keyCode || e.which;
										if (code === 13
												&& $('#dialog-editFunctions')
														.dialog('isOpen')) {
											$('#createOrderButton').trigger(
													'click');
										} else if (code === 13
												&& $('.nearByLookup').is(
														':visible')) {
											e.preventDefault();
											$('#searchNear').trigger('click');
											// validateFields();
										} else if (code === 13
												&& $('#dialog-email').dialog(
														'isOpen')) {
											$("#emailSend").trigger('click');
										} else if (code === 13
												&& $('#dialog-supplier-modal')
														.dialog('isOpen')) {
											$("#goButtonSample1").trigger(
													'click');
										} else if (code === 13
												&& $('#lookUpDivision').is(
														':visible')) {
											$('#searchBox').blur();
											$("#errorWrapper").find('.close').trigger('click')
											$('#articleGO').trigger('click');
											$('#searchBox').focus();
										} else if (code === 13
												&& $('#sohLookupContainer').is(
														':visible')) {
											$('#sohSearchBox').blur();
											$('#sohArticleSearch').trigger(
													'click');
											$('#sohSearchBox').focus();
										} else if (event.which == 13
												&& $('#transferToDivId').is(
														':visible')
												&& $("#transToArticle").val().length > 0) {// on
											// click
											// of
											// enter
											// key
											$('#transToArticleSearch').trigger(
													'click');
											$('#transToArticle').focus();
											$(".ui-menu").children().remove();// To
											// hide
											// the
											// list
											// of
											// suggestions
											// displayed
											$(".ui-menu")
													.css("display", "none");// To
											// hide
											// the
											// list
											// of
											// suggestions
											// displayed
											return false;
										} else if (code === 13) {
											$("#error-warn-wrapper")
													.fadeOut(50);
										}
										e.stopPropagation();
									});

					// code for article auto suggest in the text box
					createAutoSuggest('#searchBox', '#articleGO');

					$("#dialog-selectArticle").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 700
					});
					$("#dialog-blocking-reason").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 400,
						width : 400
					}).parent().addClass("popupWrapper");
					;
					getWarehouseList();
					$('.articleSearch').focus();
					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});
					$("#dialog-pos-price").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 400,
						width : 400
					}).parent().addClass("popupWrapper");
					;
					
					$("#dialog-blocking-reason").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 400,
						width : 400
					}).parent().addClass("popupWrapper");
					;
 
					/*
					 * $("#dialog-conformation").dialog({ autoOpen : false,
					 * modal : true, resizable : false, minHeight : 100,
					 * maxHeight : 600, width : 350 });
					 * $("#dialog-conformation").parent().addClass("popupWrapper");
					 */
					$("#dialog-supplier-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 865
					});

					$("#dialog-supplier-modal1").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					populateDepartment();

					// checks radio buttons in IBT Site
					$('#warehouse').click(function() {
						clearAllErrors();
						$("#warehouseField").removeClass('hideBlock');
						$("#vendorField").addClass('hideBlock');
						$("#allField").addClass('hideBlock');
						$('#vendorText').val("");
					});

					$('#vendor').click(function() {
						clearAllErrors();
						$("#vendorField").removeClass('hideBlock');
						$("#warehouseField").addClass('hideBlock');
						$("#allField").addClass('hideBlock');
						$('#warehouseID').val("0");
						$('#vendorText').focus();
					});

					$('#all').click(function() {
						clearAllErrors();
						$("#allField").removeClass('hideBlock');
						$("#warehouseField").addClass('hideBlock');
						$("#vendorField").addClass('hideBlock');
						$('#vendorText').val("");
						$('#warehouseID').val("0");
					});

					$('#searchPageLink').click(function() {
						clearAllErrors();
						$("#lookUpDivision").removeClass("hideBlock");
						$('.articleSearch').focus();
						$("#detailsDivision").addClass("hideBlock");
						$("#backDiv").addClass("hideBlock");
						$("#topLink1").addClass("hideBlock");
						$("#topLink").removeClass("hideBlock");
						if (articleDisplayList.length > 0) {
							//$("#clearDiv").removeClass("hideBlock");
						}
					});

					$('#backBtn,#detailsPageLink')
							.click(
									function() {
										clearAllErrors();
										if (!$('#backBtn').hasClass('nearBy')
												&& !$('#backBtn').hasClass(
														'adjustSOH') && !$('#backBtn').hasClass('directAdjustSoh')) {
											$("#lookUpDivision").removeClass(
													"hideBlock");
											$('.articleSearch').focus();
											$("#detailsDivision").addClass(
													"hideBlock");
											$("#backDiv").addClass("hideBlock");
											$("#topLink1")
													.addClass("hideBlock");
											$("#topLink").removeClass(
													"hideBlock");
											if (articleDisplayList.length > 0) {
												/*$("#clearDiv").removeClass(
														"hideBlock");*/
											}
											$(
													'#repTabF,#priTabF,#offerTabF,#ltoTabF,#expTabF,#curActTabF,#futActTabF,#posTabF,#detTabF,#vendorTabF,#gftTabF,#pastActTabF,#sizeTabF,#styleTabF,#seasonTabF')
													.val('0');
											$('.ticketButton').removeClass(
													'loaded');
											$("#beforeHistory").removeClass(
													'hideBlock');
											$("#afterHistory").addClass(
													'hideBlock');
											$('#dialog-pos-price').removeClass(
													'gploaded');
											
										} else if ($('#backBtn').hasClass(
												'nearBy')
												&& !$('#topLink2').hasClass(
														'hideBlock')) {
											loadLookUpDetailsPage();
										} else if (($('#backBtn').hasClass(
												'adjustSOH')
												&& !$('#topLink3').hasClass(
														'hideBlock'))  || $('#backBtn').hasClass('directAdjustSoh')) {// Back
											// button
											// In
											// stock
											// adjustment
											// screen
											var inSohLookUpScreen = !$('#sohLookupContainer').hasClass('hideBlock');
											if(inSohLookUpScreen  && $('#backBtn').hasClass('directAdjustSoh')){
												window.location.href = '../login/goingHome.htm';
											}else{
												if ($('#endSOHValue').attr('initialValue') 
														!=undefined && $('#endSOHValue').text() != $(
														'#endSOHValue').attr(
														'initialValue')) {// some
													// changes
													// are
													// there..so
													// warning
													// mesg
													// var returnMsg = 'You have
													// made changes on this page
													// that you have not yet
													// confirmed. If you navigate
													// away from this page you will
													// lose your unsaved changes';
													$.fn
															.warnPopup(
																	'warn',
																	leaveScreenMsg,
																	'Stock Adjustment',
																	triggerLeaveStkAdjFromArticleYes,
																	triggerLeaveStkAdjNo,
																	'', $(this),
																	'Discard/Back');
												} else {// no changes.no
													// warning.just redirect
													if (fromScreen == undefined) {
														showStockAdjustScreen();
													}else{
														handleLeaveStkAdjFromArticleYes();
													}
												}
											}

										}
									});

					// <!-- shows advanced search box when advanced search link
					// is clicked-->
					$("#advLink1")
							.click(
									function() {
										clearAllErrors();
										var scroll = $(window).scrollTop();

										var lookupHeight = $('#lookupContainer')
												.height();

										document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
										document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
										
                                       if(salesOrg==1060){
										$("#advWrapper").css("height", "260px");

										$("#advWrapper").css("width", "640px");
										$("#hideColor").removeClass('hideBlock');
  									    $("#hideSize").removeClass('hideBlock');
  									    $("#hideStyle").removeClass('hideBlock');
                                        }
                                        else {
                                        	$("#advWrapper").css("height", "150px");
    										$("#advWrapper").css("width", "640px"); 
                                       }
										$("#advDiv").removeClass(
												'advancedParam hideBlock');
										$("#advDiv").addClass('advancedParam');

										$("#advWrapper")
												.removeClass(
														'advancedSearchFormatWrapper hideBlock');
										$("#advWrapper").addClass(
												'advancedSearchFormatWrapper');

										$("#closeLink").removeClass(
												'linkBtn hideBlock');
										$("#closeLink").addClass('linkBtn');

										$("#advLink1").hide();
										$("#value").val("");

									});

					// <!-- closes advanced search when close is clicked -->
					$("#closeLink").click(function() {
						// clearAllErrors();
						closeAdvSearchClasses();
						$('#ranged').prop("checked", true);
					});

					// <!-- closes advanced search box when windowed are
					// scrolled unless in popup menu -->
					$(window)
							.scroll(
									function() {
										if ($('#dialog-modal').dialog("isOpen") == true) {
											var scroll = $(window).scrollTop();
											var lookupHeight = $(
													'#lookupContainer')
													.height();
											document
													.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
											document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
										} else {
											closeAdvSearchClasses();
										}
									});

					// <!-- closes advanced search box when cotent out side of
					// the box is clicked -->
					$('.mainWrapper').click(function() {
						// clearAllErrors();
						closeAdvSearchClasses();
					});

					// <!-- disable close box function when lookup box is
					// clicked -->
					$('#lookupContainer').click(function(event) {
						event.stopPropagation();
					});

					// <!-- disable close box function when lookup box is
					// clicked -->
					$('.popupWrapper').click(function(event) {
						event.stopPropagation();
					});

					// <!-- Code for Scrolling -->
					$(window).scroll(function() {
						if ($(this).scrollTop() > 50) {
							$('.scrollup').fadeIn();
						} else {
							$('.scrollup').fadeOut();
						}
					});

					$('.scrollup').click(function() {
						$("html, body").animate({
							scrollTop : 0
						}, 400);
						return false;
					});

					// code for go button pop up window for multiple articles
					$(
							'#articleGO,#tooManysupplier,#deptBtn,#catBtn,#subCatBtn,#segmentBtn')
							.click(
									function searchArticle(data) {
										//$("#clearDiv").addClass("hideBlock");
										$('#dialog-pos-price').removeClass(
												'loaded').removeClass(
												'gploaded');
										clearAllErrors();
										var errors = '';
										var flag = true;
										hideReportTable();
										var searchText = '';
										closeAdvSearchClasses();
										var aritcleText = $('#searchBox').val()
												.split('-')[0].trim();
										salesOrg = $('#salesOrg').val();
										styleBox='';
										color='';
										size='';
										
										if (salesOrg!="1060"){
										if ($('#warehouse').is(":checked")
												|| $('#vendor').is(":checked")) {

										} else {
											if ($('#searchBox').val().trim() == ''
													&& $('#hierarchyID').val() == 'select') {
												errors += getError('Please enter keyword to lookup or Select any Department Hierarchy');
												$('.articleSearch').focus();
												flag = false;
											}
										else {
											if (aritcleText != ''
													&& isNaN(aritcleText) && !(aritcleText.length > 2)) {
												errors += getError("Please input a minimum of 3 characters.");
												$('.articleSearch').focus();
												flag = false;
											}
										}
										}
										}
										else
										{
											styleBox=$('#styleInput').val();
											size=$('#size').val();
											if(size=='0' || size==null)
											{
											size='';	
											}
											color=$('#color').val();
											if(color=='0' || color==null)
											{
											color='';	
											}
											if ($('#warehouse').is(":checked")
													|| $('#vendor').is(":checked")) {

											} else {
												if ($('#searchBox').val().trim() == ''
														&& $('#hierarchyID').val() == 'select' && $('#styleInput').val().trim() == '') {
													errors += getError('Please enter keyword to lookup or Select any Department Hierarchy');
													$('.articleSearch').focus();
													flag = false;
												}
											else {
												if (aritcleText != ''
														&& isNaN(aritcleText) && !(aritcleText.length > 2) && !(styleBox.length>2 ) ) {
													errors += getError("Please input a minimum of 3 characters.");
													$('.articleSearch').focus();
													flag = false;
												}
											}
											}	
										}
										var str = '{';
										str += '"iv_user_id":"'+loggedInUser+'",';
										str += '"iv_sap":"'+encSapPwd+'",';
										str += '"iv_article":';
										str += '"'
												+ $('#searchBox').val().split(
														'-')[0].trim() + '"';
										str += ',"iv_sales_org":"' + salesOrg
												+ '"';
										if ($('#warehouse').is(":checked")) {
											if ($('#warehouseID').val() == 0) {
												errors += getError('Please select a warehouse to lookup');
												flag = false;
												focusSupplier();
											} else {
												str += ',"iv_supplier":"';
												str += $('#warehouseID').val();
												str += '","iv_src_supply":';
												str += '"2"';
												searchText += ' Warehouse : '
														+ $('#warehouseID')
																.val();
											}
										}
										if ($('#vendor').is(":checked")) {
											if ($('#vendorText').val().trim() == '') {
												errors += getError('Please enter vendor to lookup');
												flag = false;
												focusSupplier();
											} else {
												/*
												 * if ($('#vendorCheck').val() ==
												 * 'false') { errors +=
												 * getError('Please click on
												 * "verify" before lookup the
												 * article'); flag = false;
												 * focusSupplier(); }
												 */
												str += ',"iv_supplier":"';
												str += $('#vendorText').val()
														.split('-')[0];
												str += '","iv_src_supply":';
												str += '"1"';
												searchText += ' Vendor : '
														+ $('#vendorText')
																.val();
											}
										}
										if ($('#all').is(":checked")) {
											str += ',"iv_supplier":';
											str += '""';
											str += ',"iv_src_supply":';
											str += '""';
										}
										if ($('#ranged').is(":checked")) {
											str += ',"iv_ranged":';
											str += '"Y"';
										} else {
											str += ',"iv_ranged":';
											str += '"N"';
										}
										str += ',"iv_session_id":"","iv_barcode":""';
										str += ',"iv_site":"'
												+ $('#posSite').val() + '"';
										str += ',"iv_node_level":';
										if ($('#hierarchyLVL').val() == 'Select'
												|| $('#hierarchyLVL').val() == 'select')
											str += '""';
										else {
											str += '"'
													+ $('#hierarchyLVL').val()
													+ '"';
											if ($('#hierarchyLVL').val() == '2')
												searchText += ' Department :';
											else if ($('#hierarchyLVL').val() == '3')
												searchText += ' Category :';
											else if ($('#hierarchyLVL').val() == '4')
												searchText += ' Sub-category :';
											else
												searchText += ' Segment :';
										}

										str += ',"iv_node_id":';
										if ($('#hierarchyID').val() == 'Select'
												|| $('#hierarchyID').val() == 'select')
											str += '""';
										else {
											str += '"'
													+ $('#hierarchyID').val()
													+ '"';
											searchText += ' '
													+ $(
															'label[for="'
																	+ $(
																			'#hierarchyID')
																			.val()
																	+ '"]')
															.text();
										}

										if (aritcleText != ''
												&& aritcleText != undefined
												&& aritcleText != null) {
											if (isNaN(aritcleText)) {
												str += ',"iv_desc":"Y"';
												str += ',"iv_article_no":""';
												str += ',"iv_gtin":""';
											} else {
												if (aritcleText.length < 7) {
													str += ',"iv_desc":""';
													str += ',"iv_article_no":"Y"';
													str += ',"iv_gtin":""';
												} else {
													str += ',"iv_desc":""';
													str += ',"iv_article_no":""';
													str += ',"iv_gtin":"Y"';
												}
											}
										} else {
											str += ',"iv_desc":""';
											str += ',"iv_article_no":""';
											str += ',"iv_gtin":""';
										}
										str += ',"iv_barcode_flag":"","iv_auto_stockr_flag":"", "iv_style":"'+styleBox+'", "iv_colour":"'+color+'","iv_article_size":"'+size+'"}';
										console.log(articleHdrInfoServiceURL
												+ ' ' + str);
										if (!flag) {
											showAllErrors(errors);
											return false;
										}
										startLoading();
										// clearAllErrors();
										// hideError();
										$
												.post(articleHdrInfoServiceURL,
														str)
												.done(
														function(response) {
															var articleList = response;
															if (articleList.length >= 1
																	&& articleList[0].article_no != null
																	&& articleList[0].article_no != undefined) {
																
																displayImageForAnArticle(articleList[0].article_no);
																$(
																		'.articleSearch')
																		.focus();
																$(
																		'#instoreReport_t')
																		.addClass(
																				'hideBlock');
																articleDisplayList = articleList;
																var resultCount = articleList.length;
																recordCount = resultCount;
																$(
																		'.totalRecCount strong:first')
																		.text(
																				articleList.length);
																if (aritcleText
																		.trim() != '') {
																	$(
																			'.totalRecCount .searchString')
																			.text(
																					aritcleText);
																} else {
																	$(
																			'.totalRecCount .searchString')
																			.text(
																					searchText);
																}

																currentPage = 1;
																itemsOnPage = 10;
																if (resultCount <= itemsOnPage)
																	itemsOnPage = resultCount;
																articleList = jQuery
																		.grep(
																				articleList,
																				function(
																						n,
																						i) {
																					return (i < itemsOnPage);
																				});
																iterateArticles(
																		articleList,
																		'');
																$(
																		'.sortTableArticleLookupTable')
																		.data(
																				'content',
																				articleDisplayList);
																$('.searchByDept')[0]
																		.reset();
																$('.searchByDept')[1]
																		.reset();
																hideHierarchyList();
																stopLoading();
																if (articleList.length == 1  && articleList[0].article_no != "") {
																	$(
																			".appendedRow")
																			.trigger(
																					'click');
																}
																$(
																		'.sortTableArticleLookupTable thead th')
																		.removeClass(
																				'sorted')
																		.removeClass(
																				'ascending')
																		.removeClass(
																				'descending');
																$(
																		'.sortTableArticleLookupTable thead')
																		.find(
																				':nth-child(2)')
																		.trigger(
																				'click');

															} else {
																$("#pageErrors")
																		.find(
																				'.description')
																		.html(
																				"Article "
																						+ $(
																								'#searchBox')
																								.val()
																						+ " - article description");
																$("#pageErrors")
																		.removeClass(
																				"hideBlock");
																$(
																		"#nodata-error-warn-wrapper")
																		.fadeIn(
																				50);// defect
																// no
																// 5954
																// var errors =
																// getError('Sorry
																// , no results
																// found for the
																// search
																// criteria.
																// Please try
																// again.');
																$(
																		'#instoreReport_t')
																		.addClass(
																				'hideBlock');
																$(
																		'#hierarchyDiv1')
																		.removeClass(
																				'hideBlock');
																$(
																		'#hierarchyDiv2')
																		.removeClass(
																				'hideBlock');
																// resetAdvanceSearch();
																// showNoDataWarning(errors);
																// showWarn();
																stopLoading();
																return false;
															}

														});
									});

					// code to verify the supplier
					$("#verifySupplier")
							.click(
									function() {
										clearAllErrors();
										var vendorNo = '';
										var vendorName = '';
										if ($(this).attr('id') == 'verifySupplier') {
											vendorNo += $('#vendorText').val()
													.split("-")[0];
											/*
											 * vendorName += $('#vendorText')
											 * .val().split("-")[1];
											 */
										} else {
											$('#vendorText').val();
										}
										if ($(this).attr('id') == 'goButtonSample1') {
											vendorNo += $('#vendorDesc').val()
													.split("-")[0];
											vendorName += $('#vendorDesc')
													.val().split("-")[1];
										}
										if (($('#vendorText').val() != '' && $(
												'#supplier').val() != 'Type number or name and click verify')) {
											getVendorLookuplist(vendorNo);
										} else {
											var errors = getError('Please fill supplier field');
											showAllErrors(errors);
											$('#vendorText').focus();
										}
									});

					$("#goButtonSample1")
							.click(
									function() {
										clearAllErrors();
										if ($('#vendorDesc').val().trim() == '') {
											$('.message-div').parent().parent()
													.addClass('errorDiv');
											$('.message-div').parent().parent()
													.removeClass(
															'warningMessage');
											$(
													'.message-div,.paginationDivVerifyVendorPopup')
													.addClass('hideBlock');
											$('.error-div')
													.removeClass('hideBlock')
													.text(
															'Please fill supplier field.');
											$('.verifyVendorContent').parent()
													.addClass('hideBlock');
											$('#vendorDesc').focus();
										} else {
											getVendorLookuplist($('#vendorDesc')
													.val());
										}
									});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					// scripts for details page

					$("#dialog-display, #dialog-competition, #dialog-clearance")
							.dialog({
								autoOpen : false,
								modal : true,
								resizable : false,
								minHeight : 100,
								maxHeight : 600,
								width : 380
							});

					$("#dialog-display, #dialog-competition, #dialog-clearance")
							.parent().addClass("popupWrapper");

					$("#createDisplay").click(function() {
						clearAllErrors();
						$("#dialog-display").dialog("open");
						$("#d2").focus();
					});

					$("#createCompetition").click(function() {
						clearAllErrors();
						$("#dialog-competition").dialog("open");
						$("#co2").focus();
					});

					$("#createClearance").click(function() {
						clearAllErrors();
						$("#dialog-clearance").dialog("open");
						$("#cl2").focus();
					});

					// End

					$(" .popupActions .secondaryActionBtn").click(function() {
						// clearAllErrors();
						$("#dialog-display").dialog("close");
						$("#dialog-clearance").dialog("close");
						$("#dialog-competition").dialog("close");	
						if ($('#mplAndScTab').hasClass('ui-tabs-active ui-state-active')) {						
							checkEditDetails();
							if( change==true){							
							$.fn
							.warnPopup(
									'warn',
									leaveScreenMsg,
									'Article Details',
									triggerUpdateMPLChangesNo,
									triggerUpdateMPLChangesYes,
									'', $(this),'');
							
						}
							else
								{
								
							$("#dialog-editFunctions").dialog("close");
								}
						}
						else
							{
							$("#dialog-editFunctions").dialog("close");
						
							}
					});

					$('.popupActions .actionBtn').click(function() {
						// clearAllErrors();
						$("#dialog-display").dialog("close");
						$("#dialog-clearance").dialog("close");
						$("#dialog-competition").dialog("close");
						$("#dialog-modal-his").dialog("close");
						$("#dialog-openOrders").dialog("close");
						$('#openOrders').tabs({
							active : 0
						});
						// $("#dialog-editFunctions").dialog("close");

					});

					
					// Edit functions popup

					$("#dialog-editFunctions").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						width : 850
					});

					$("#dialog-editFunctions").parent()
							.addClass("popupWrapper");

					$(".sectionTitle input").change(function() {
						$(".innerSectionContent").addClass("hideBlock");
						tempSelected = "#" + $(this).val() + "content";
						$(tempSelected).removeClass("hideBlock");
					});

					// new code for ranging

					$('#rangingAction').click(function() {
						//callServiceToRangeItem();
						if(!$(this).hasClass('disabled')){
							rangingAndDeranging = true;
							$('#sohSearchBox').val(articleNo);
							$('#sohArticleSearch').trigger('click');
						}else{
							$.fn.showCustomMsg(['Ranging request already submitted, Kindly verify after sometimes'],information,'Stock Adjustment','',$('#uomRadioContent .weight-box'));
							$('#information-wrapper').find('.quickHelpWrapper').removeClass('hideBlock');
						}
					});

					$("#editActions")
							.click(
									function(e) {
										securityMatrix();
										$('#beforeHistory').removeClass('hideBlock');
										$('#afterHistory').addClass('hideBlock');
										$('#MPLCallFlag').val('false');
										$('#SCCallFlag').val('false');
										$('#FacingCallFlag').val('false');
										if (salesOrg == '1060') {
											$('.othersEditTitle').addClass(
													'hideBlock');
											$('.bigwEditTitle').removeClass(
													'hideBlock');
										} else {
											$('.othersEditTitle').removeClass(
													'hideBlock');
											$('.bigwEditTitle').addClass(
													'hideBlock');
										}
										clearAllErrors();
										hideErrorInEditPop();
										$('.sc-mpl-edit-form').trigger('reset');
										$('#aisle').val('');
										$('#start').val('');
										$('input[name="searchByOptionsExpPopUp"][value="'+articleUom+'"]')
												.prop('checked', true);
										$('input[name="searchByOptionsPopUp"][value="'+articleUom+'"]').trigger('click');
										
										$("#tableAddActionPopUp").removeClass(
												'hideBlock');
										// $('#mplAndScTab').trigger('click');
										formExpireDateContent([]);
										/*$('#editTabs').tabs({
											active : 0
										});*/
										if(!$("#dialog-editFunctions").dialog("isOpen"))
											{
											if(!$('#expireTab').hasClass('hideBlock'))
											{
											$('.alertText').removeClass("hideBlock");
											$('#editTabs').tabs({
												active : 0
											});
											$('#expireTab').trigger('click');
											}
										else if(!$('#mplAndScTab').hasClass('hideBlock'))
												{
											  $('.alertText').removeClass("hideBlock");
												$('#editTabs').tabs({
													active : 1
												});
												$('#mplAndScTab').trigger('click');
												}
											else if(!$('#securityTAG').hasClass('hideBlock'))
												{
												$('.alertText').removeClass("hideBlock");
												$('#editTabs').tabs({
													active : 2
												});
												$('#securityTAG').trigger('click');
												
												}
											$("#dialog-editFunctions").dialog("open");
											$('#createOrderButton').removeClass('hideBlock');
											}
										e.stopPropagation();
									});

					$("#dialog-copies").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 250
					});

					$("#dialog-copies").parent().addClass("popupWrapper");

					$("#dialog-email").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 450
					});

					$("#dialog-email").parent().addClass("popupWrapper");

					$("#dialog-email .popupActions label#cancelBtn").click(
							function() {
								clearAllErrors();
								$("#dialog-email").dialog("close");
							});

					$("#emailSend").unbind('click');

					$("#emailSend").click(function() {
						if (validateEmailPopUp())
							sendEmail();
					});

					$('#emailBtn').click(function() {
						$("#dialog-email").dialog("open");
					});

					$("#dialog-priceHistory").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 500
					});

					$("#dialog-priceHistory").parent().addClass("popupWrapper");

					$("#otherPriceHistory").click(function() {
						clearAllErrors();
						callPriceHistory();
						$("#dialog-priceHistory").dialog("open");
					});

					$("#dialog-priceHistory .popupActions label").click(
							function() {
								clearAllErrors();
								$("#dialog-priceHistory").dialog("close");
							});

					// Checkbox DropDown functions

					/*
					 * $(".selectDropdown").click(function() { //
					 * clearAllErrors();
					 * $(this).find(".dropdown").hasClass('active'); if
					 * ($(this).find(".dropdown").is(':visible')) {
					 * $(this).find(".dropdown").css('display','none'); } else {
					 * $(this).find(".dropdown").css('display','block'); } });
					 */

					/*
					 * $('html').click(function() {
					 * $(".selectDropdown").removeClass('active'); });
					 */

					$('.selectDropdown .actionBtn').click(function(event) {
						// clearAllErrors();
						event.stopPropagation();
					});

					$(document)
							.ready(
									function() {
										var articleTable0Height = $(
												'#articleTable0').height();
										var articleTable1Height = $(
												'#articleTable1').height();
										var articleTable2Height = $(
												'#articleTable2').height();
										var articleTable3Height = $(
												'#articleTable3').height();

										var tableHeight = Math.max(
												articleTable0Height,
												articleTable1Height,
												articleTable2Height,
												articleTable3Height);

										document
												.getElementById("articleTable0").style.height = tableHeight
												+ "px";
										document
												.getElementById("articleTable1").style.height = tableHeight
												+ "px";
										document
												.getElementById("articleTable2").style.height = tableHeight
												+ "px";
										document
												.getElementById("articleTable3").style.height = tableHeight
												+ "px";
									});

					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$("#dialog-modal-his").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$("#dialog-modal-his").parent().addClass("popupWrapper");

					$("#salesHistory").click(function() {
						clearAllErrors();
						getSalesHistory();
						$("#dialog-modal-his").dialog("open");
					});

					$(".accordionWrapper").accordion({
						header : "h3",
						collapsible : true,
						active : true,
						heightStyle : "content"
					});

					$("#tabs, #itemInfo, #mainTabs, #editTabs, .filterTabs")
							.tabs();

					$("#editTabs").tabs().addClass(
							"ui-tabs-vertical ui-helper-clearfix");
					$("#editTabs li").removeClass("ui-corner-top").addClass(
							"ui-corner-left");

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					$(".buttonMenu").menu({
						position : {
							my : "left top",
							at : "left+3 top+23"
						}
					});

					// code for Open orders requirement

					$("#openOrders").tabs();

					$("#dialog-openOrders").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 750
					});

					$("#openOrdersLink").click(
							function() {
								clearAllErrors();
								$('#orderTabInPopUp').trigger('click');
								$("#dialog-openOrders").parent().addClass(
										"popupWrapper");
								$("#dialog-openOrders").dialog("open");
							});

					// code for add to list
					$(
							"#dialog-listDisplay, #dialog-listClearance, #dialog-listCompetition, #dialog-listSpecial")
							.dialog({
								autoOpen : false,
								modal : true,
								resizable : false,
								minHeight : 100,
								maxHeight : 600,
								width : 400
							});

					/*
					 * $("#addToDisplay").click( function() { clearAllErrors();
					 * $("#dialog-listDisplay").parent().addClass(
					 * "popupWrapper");
					 * //$("#dialog-listDisplay").dialog("open"); });
					 * 
					 * $("#addToClearance").click( function() {
					 * clearAllErrors();
					 * $("#dialog-listClearance").parent().addClass(
					 * "popupWrapper");
					 * $("#dialog-listClearance").dialog("open"); });
					 * 
					 * $("#addToCompetition").click( function() {
					 * clearAllErrors();
					 * $("#dialog-listCompetition").parent().addClass(
					 * "popupWrapper");
					 * $("#dialog-listCompetition").dialog("open"); });
					 */

					$(
							".popupActions .actionBtn, .popupActions .secondaryActionBtn ")
							.click(function() {
								// clearAllErrors();
								$("#dialog-listDisplay").dialog("close");
								$("#dialog-listClearance").dialog("close");
								$("#dialog-listCompetition").dialog("close");
								$("#dialog-listSpecial").dialog("close");
							});

					$(".inputDate").datepicker({
						firstDay : 1,
						zIndex : 50
					});

					/*
					 * when edit button is clicked displays input box in
					 * editable cells
					 */
					$(".editRowBtn").click(
							function() {
								clearAllErrors();
								var id = (this.id).split('-')[1];
								tempParent = $(this).parents().eq(1).attr('id')
										.split('-')[0];

								if (tempParent == "rowExpiry") {

									$(("#rowExpiry-").concat(id)).addClass(
											'rowHighlight');

									$(("#aisleEdit-").concat(id)).removeClass(
											'hideBlock');
									$(("#aisle-").concat(id)).addClass(
											'hideBlock');

									$(("#qtyEdit-").concat(id)).removeClass(
											'hideBlock');
									$(("#qty-").concat(id)).addClass(
											'hideBlock');

									$(("#expDateEdit-").concat(id))
											.removeClass('hideBlock');
									$(("#expDate-").concat(id)).addClass(
											'hideBlock');

									$(("#saveExpiryRecord-").concat(id))
											.removeClass('hideBlock');
									$(("#editExpiryRecord-").concat(id))
											.addClass('hideBlock');

								} else if (tempParent == "rowLTO") {

									$(("#rowLTO-").concat(id)).addClass(
											'rowHighlight');

									$(("#typeLTOEdit-").concat(id))
											.removeClass('hideBlock');
									$(("#typeLTO-").concat(id)).addClass(
											'hideBlock');

									$(("#aisleLTOEdit-").concat(id))
											.removeClass('hideBlock');
									$(("#aisleLTO-").concat(id)).addClass(
											'hideBlock');

									$(("#locLTOEdit-").concat(id)).removeClass(
											'hideBlock');
									$(("#locLTO-").concat(id)).addClass(
											'hideBlock');

									$(("#notesLTOEdit-").concat(id))
											.removeClass('hideBlock');
									$(("#notesLTO-").concat(id)).addClass(
											'hideBlock');

									$(("#activeLTOEdit-").concat(id))
											.removeClass('hideBlock');
									$(("#activeLTO-").concat(id)).addClass(
											'hideBlock');

									$(("#saveLTORecord-").concat(id))
											.removeClass('hideBlock');
									$(("#editLTORecord-").concat(id)).addClass(
											'hideBlock');

								}

							});

					/*
					 * when save button is clicked displays input box is
					 * disabled
					 */
					$(".saveRowBtn").click(
							function() {
								clearAllErrors();
								var id = (this.id).split('-')[1];
								tempParent = $(this).parents().eq(1).attr('id')
										.split('-')[0];

								if (tempParent == "rowExpiry") {

									$(("#rowExpiry-").concat(id)).removeClass(
											'rowHighlight');

									$(("#aisleEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#aisle-").concat(id)).removeClass(
											'hideBlock');

									$(("#qtyEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#qty-").concat(id)).removeClass(
											'hideBlock');

									$(("#expDateEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#expDate-").concat(id)).removeClass(
											'hideBlock');

									$(("#saveExpiryRecord-").concat(id))
											.addClass('hideBlock');
									$(("#editExpiryRecord-").concat(id))
											.removeClass('hideBlock');

								} else if (tempParent == "rowLTO") {

									$(("#rowLTO-").concat(id)).removeClass(
											'rowHighlight');

									$(("#typeLTOEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#typeLTO-").concat(id)).removeClass(
											'hideBlock');

									$(("#aisleLTOEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#aisleLTO-").concat(id)).removeClass(
											'hideBlock');

									$(("#locLTOEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#locLTO-").concat(id)).removeClass(
											'hideBlock');

									$(("#notesLTOEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#notesLTO-").concat(id)).removeClass(
											'hideBlock');

									$(("#activeLTOEdit-").concat(id)).addClass(
											'hideBlock');
									$(("#activeLTO-").concat(id)).removeClass(
											'hideBlock');

									$(("#saveLTORecord-").concat(id)).addClass(
											'hideBlock');
									$(("#editLTORecord-").concat(id))
											.removeClass('hideBlock');

								}
							});

					// Code to show and hide add Aisle
					$("#addActionBtn").click(function() {
						clearAllErrors();
						$("#tableAddAction").toggleClass('hideBlock');
					});
					$("#addActionBtnPopUp").click(function() {
						clearAllErrors();
						$("#tableAddActionPopUp").toggleClass('hideBlock');
					});
					$("#closeLinkPopUp").click(function() {
						clearAllErrors();
						$("#tableAddActionPopUp").addClass('hideBlock');
					});
					$("#addLTOBtn").click(function() {
						clearAllErrors();
						$("#tableLTOAction").toggleClass('hideBlock');
					});

					/*
					 * $( ".formActions .actionBtn, .formActions
					 * .secondaryActionBtn") .click(function() {
					 * $("#tableAddAction").addClass('hideBlock'); });
					 */

					// Code to show history
					$("#fullHistory")
							.click(
									function() {
										clearAllErrors();
										$('#fullHstryCntnt').html('');
										if ((complexPBDFlag == 'Y')
												|| (packBreakInd == 'Y')) {
											var selectedUom = $(
													'input[name="searchByOptionsPopUpUOM"]:checked')
													.val();
											var $dataRow = $('input[name="searchByOptionsPopUpUOM"]:checked');
											var selectedArticleNo = $dataRow.attr('isis-ref-no');
											
										if(selectedArticleNo == undefined && complexPBDFlag == 'Y')	{
											$dataRow = $('#mplAndScTable').find('tr[data-mplupdate-bind]:visible')
											selectedArticleNo = $dataRow.attr('isis-ref-no');
											console.log('selectedArticleNo ' + selectedArticleNo);
											selectedUom = $('input[name="searchByOptionsPopUp"]:checked').attr(
													'complex-pbd-uom');
											if(selectedUom == undefined){
											for(var i=0;i<rplArray.length;i++){
												if(rplArray[i].isis_ref_no == selectedArticleNo){
													selectedUom = rplArray[i].complex_pack_brk_uom;
												}
											}
											}
										}
											
											getFullHistory('MPL', 'M',
													selectedArticleNo,
													selectedUom);
										} else {
											getFullHistory('MPL', 'M');
										}
										$("#beforeHistory").addClass(
												'hideBlock');
										$("#afterHistory").removeClass(
												'hideBlock');
									});

					$('#securityTAG')
							.click(
									function() {
										$('#editTabs').tabs({
											active : 2
										});
										$('#createOrderButton').removeClass(
												'hideBlock');
										if (complexPBDFlag != 'Y') {
											$('#STcontent').removeClass(
													'hideBlock');
											$('#STcontentForCPBD').addClass(
													'hideBlock');
											clearAllErrors();
											$
													.ajax({
														type : "get",
														url : getsecurityarticleData
																+ articleNo,
														beforeSend : function() {
															startLoading();
														},
														success : function(
																response) {
															var dat = response;
															if (dat != null
																	&& dat != undefined
																	&& dat.length != 0) {
																if (dat[0].security_tag == 'Y') {
																	securityTag = 'Y';
																	$('#yST')
																			.prop(
																					'checked',
																					true);
																} else {
																	securityTag = 'N';
																	$('#yST')
																			.prop(
																					'checked',
																					false);
																}
															}
															stopLoading();
														},
														error : function() {
															var errors = getError('Sorry, Some technical issue occured.');
															showAllErrors(errors);
															// showError('Sorry,
															// Some technical
															// issue
															// occured.');
															stopLoading();
														},
													});
										} else if (complexPBDFlag == 'Y') {
											$('#STcontent').addClass(
													'hideBlock');
											$('#STcontentForCPBD').removeClass(
													'hideBlock');

											clearAllErrors();
											$
													.ajax({
														type : "get",
														url : getCPBDsecurityarticleData
																+ articleNo,
														beforeSend : function() {
															startLoading();
														},
														success : function(
																response) {

															var list = response;
															var content2PopUp = '<p class="notes"><strong>Select UOM:</strong>';
															var content = '';
															var checked;
															var hideTableBlock;

															if (list != null
																	&& list != undefined
																	&& list.length != 0) {
																for ( var i = 0; i < list.length; i++) {
																	content2PopUp += '<input type="radio"  name="searchByOptionsPopUpSecurity" value="'
																			+ (list[i].pack_break_uom == null ? ''
																					: list[i].pack_break_uom)
																			+ '" id="stPopUpUOM'
																			+ (list[i].pack_break_uom == null ? ''
																					: list[i].pack_break_uom)
																			+ i
																			+ '" ';
																	if (i == 0)
																		content2PopUp += 'checked="checked" ><label for="stPopUpUOM'
																				+ (list[i].pack_break_uom == null ? ''
																						: list[i].pack_break_uom)
																				+ i
																				+ '" class="labelText">'
																				+ (list[i].pack_break_uom == null ? ''
																						: list[i].pack_break_uom)
																				+ '</label>';
																	else
																		content2PopUp += '><label for="stPopUpUOM'
																				+ (list[i].pack_break_uom == null ? ''
																						: list[i].pack_break_uom)
																				+ i
																				+ '" class="labelText">'
																				+ (list[i].pack_break_uom == null ? ''
																						: list[i].pack_break_uom)
																				+ '</label>';
																	if (i == 0) {
																		hideTableBlock = '';
																	} else {
																		hideTableBlock = ' hideBlock';
																	}

																	content += '<table class="plainTable securityTablePopUp stPopUpUOM'
																			+ (list[i].pack_break_uom == null ? ''
																					: list[i].pack_break_uom)
																			+ i
																			+ ' '
																			+ hideTableBlock
																			+ '" ><tr data-complex-PBD ><td><label for="newST">Security Tag</label></td>'
																			+ '<td><input type="checkbox" prev-sec-tag="'
																			+ (list[i].security_tag != null
																					&& list[i].security_tag
																							.trim() != '' ? list[i].security_tag
																					: 'N')
																			+ '" global-sec-flag="'
																			+ (list[i].security_article
																					.trim() != '' ? list[i].security_article
																					: 'N')
																			+ '" complex-pbd-uom="'
																			+ (list[i].complex_pack_brk_uom == null ? ''
																					: list[i].complex_pack_brk_uom)
																			+ '" isis-ref-no="'
																			+ list[i].isis_ref_no
																			+ '"';
																	if (list[i].security_tag == 'Y') {
																		checked = 'checked="checked"';
																	} else {
																		checked = '';
																	}
																	content += checked
																			+ ' id="cPBDSecurity-'
																			+ list[i].pack_break_uom
																			+ '" value="yST"'
																			+ ' name=""><label class="labelText" for="yST">Yes</label></td></tr></table>';

																}

																$('#cPBDTable')
																		.html(
																				'');
																$('#cPBDTable')
																		.html(
																				content2PopUp
																						+ '</p>'
																						+ content);
																for ( var i = 0; i < list.length; i++) {
																	var secId = 'stPopUpUOM'
																			+ list[i].pack_break_uom
																			+ i;
																	$(
																			'#'
																					+ secId)
																			.click(
																					function() {
																						bindSecurityUOMClickPopUp(this.id);
																					});
																	if (i == 0) {
																		$(
																				'#'
																						+ secId)
																				.prop(
																						'checked',
																						true);
																	}
																}
															}
															stopLoading();
														},
														error : function() {
															var errors = getError('Sorry, Some technical issue occured.');
															showAllErrors(errors);
															// showError('Sorry,
															// Some technical
															// issue
															// occured.');
															stopLoading();
														},
													});

										}
									});

					$("#addToDisplay").click(function() {
						callServiceForInstoreAddList('display');
					});

					$("#addToClearance").click(function() {
						callServiceForInstoreAddList('clearance');
					});

					$("#addToCompetition").click(function() {
						callServiceForInstoreAddList('competition');
					});

					$("#addToSpecial").click(function() {
						callServiceForInstoreAddList('special');
					});
					
					$("#addToAdvertised").click(function() {
						callServiceForInstoreAddList('advertised');
					});
					
					$("#addToLocalMarketing").click(function() {
						callServiceForInstoreAddList('marketing');
					});

					$("#dialog-display, #dialog-competition, #dialog-clearance")
							.dialog({
								autoOpen : false,
								modal : true,
								resizable : false,
								minHeight : 100,
								maxHeight : 600,
								width : 380
							});

					$("#dialog-addToDraft").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 250
					});
					$('#popupOrderOty').numbersonly();

					$("#addToDraftOrder").click(function() {
						// Add to draft order
						showPopupWithData();

					});
					$("#addToDraftSubmit")
							.click(
									function() {
										// Add to draft order
										if ($('#popupOrderOty').val().trim() == '') {
											$.fn
													.showCustomMsg(
															[ 'Please enter order quantity.' ],
															error,
															'Add article to Draft Order');
										} else {
											callCreateDraftOrderService();
										}
									});
					$("#addToDraftCancel").click(function() {
						// Add to draft order
						$("#dialog-addToDraft").dialog("close");
					});
					$('#popupOrderOty').keyup(function() {
						var va = $(this).val();
						var om = Number($('#popupOrderOM').text());
						var tot = (va * om).toFixed(2);
						if (!isNaN(tot) && tot != undefined && tot != null)
							$('#popupTotalUnit').text(tot);
					});
					// Redirection code
					$("#redirectDisplay").click(function() {
						location.href = '../instore/onPageLoad.htm';
					});

					$("#redirectClearance").click(function() {
						location.href = '../instore/clearanceOnPageLoad.htm';
					});

					$("#redirectCompetition").click(function() {
						location.href = '../instore/compOnPageLoad.htm';
					});

					$("#redirectSpecial")
							.click(
									function() {
										location.href = '../instore/otherMarkdownOnPageLoad.htm';
									});

					$('#nearBy').click(function() {
						$('.nearByPagination').addClass('hideBlock');
						getNearByStores();
					});

					bindTabClickEvents();

					bindAdditionalTabClickEvents();

					$('#printNutriInfo').click(function() {
						articleNutritionInfoPrint();
					});

					/** *********Scripts related to Stores near by********** */

					document.forms[0].autocomplete = "off";

					$("#dialog-verify").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$("#dialog-verify").parent().addClass("popupWrapper");

					$('#dialog-verify .filterWrapper').addClass('hideBlock');

					// $(".sortTable").tablesort();
					if ($('#checkedValues').val() != "") {
						if ($('#checkedValues').val().split(',').length > 1)
							$('#dropdownSelect').text(
									$('input[name=salesOrg]:checked').length
											+ " out of "
											+ $('input[name=salesOrg]').length
											+ " selected");
						else if ($('#checkedValues').val().split(',').length == 0)
							$('#dropdownSelect').text('Select');
						else
							$('#dropdownSelect').text(
									$('input[name=salesOrg]:checked').next()
											.text());

					}

					// Checkbox DropDown functions
					$("#dropdownDoneBtn")
							.click(
									function() {
										$("#dropdown").removeClass('active');
										checkedValues = $("input:checked")
												.valList();
										$('#checkedValues').val(checkedValues);
										if ($('#checkedValues').val() != "") {
											if ($('#checkedValues').val()
													.split(',').length > 1)
												$('#dropdownSelect')
														.text(
																$('input[name=salesOrg]:checked').length
																		+ " out of "
																		+ $('input[name=salesOrg]').length
																		+ " selected");
											else if ($('#checkedValues').val()
													.split(',').length == 0)
												$('#dropdownSelect').text(
														'Select');
											else
												$('#dropdownSelect')
														.text(
																$(
																		'input[type=checkbox]:checked')
																		.next()
																		.text());
										}

										if ($('input[type=checkbox]:checked').length == 0) {
											$('#dropdownSelect').text('Select');
										}
									});
					$("#dropdownCancelBtn")
							.click(
									function() {
										$("#dropdown").removeClass('active');
										salesOrgNumber = $('#retainSalesOrg')
												.val();
										if ($('#checkedValues').val() == "")
											$("[type=checkbox]").prop(
													'checked', false);
										else {
											$("[type=checkbox]").prop(
													'checked', false);
											var i = 0;
											for (i = 0; i < $('#checkedValues')
													.val().split(',').length; i++) {
												$('input[name=salesOrg]')
														.each(
																function() {
																	if ($(this)
																			.val() == $(
																			'#checkedValues')
																			.val()
																			.split(
																					',')[i])
																		$(this)
																				.prop(
																						'checked',
																						true);
																});
											}

										}
										$('input[name=salesOrg]')
												.each(
														function() {
															if ($(this).val() == salesOrgNumber)
																$(this)
																		.prop(
																				'checked',
																				true);
														});
									});

					var dropretainSalesOrg = $('#dropretainSalesOrg').val();
					$("#salesOrg option[value='" + dropretainSalesOrg + "']")
							.prop('selected', true);
					var dropretainMaxStore = $('#dropretainMaxStore').val();
					$("#maxStores option[value='" + dropretainMaxStore + "']")
							.prop('selected', true);
					var dropretainDistance = $('#dropretainDistance').val();
					$("#distance option[value='" + dropretainDistance + "']")
							.prop('selected', true);

					$("#addActionBtn").click(function() {
						$("#tableAddAction").removeClass('hideBlock');
					});
					$("#closeLinkNear").click(function() {
						$("#tableAddAction").addClass('hideBlock');
					});
					$("#clsLink").click(function() {
						$("#errorMsgDivNear").addClass('errorDiv hideBlock');
						$("#errorMsgDivNear").removeClass('errorDiv');
					});

					$('.textbox').focus(function() {
						if ($(this).val() == $(this).attr('defaultVal')) {
							$(this).val('');
							$(this).removeClass("textboxDefaultText");
						}
					});

					$('.textbox').blur(function() {
						if ($(this).val() == '') {
							$(this).val($(this).attr('defaultVal'));
							$(this).addClass("textboxDefaultText");
						}
					});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					$("#searchNear").click(function(e) {
						e.stopPropagation();
						validateFields();
					});

					$(window).load(function() {
						(function($) {
							$.fn.valList = function() {
								return $.map(this, function(elem) {
									return elem.value || "";
								}).join(",");
							};
						})(jQuery);

					});

					$(".secondaryActionBtnBack").click(function(e) {
						$("#lookUpDivision").addClass("hideBlock");
						$("#topLink").addClass("hideBlock");
						//$("#clearDiv").addClass("hideBlock");
						$("#backDiv").removeClass("hideBlock");
						$("#topLink1").removeClass("hideBlock");
						$("#detailsDivision").removeClass("hideBlock");
						$('.nearByLookup').addClass('hideBlock');
					});

					// Checkbox DropDown functions
					$("#dropdownDoneBtn").click(function() {
						$("#dropdown").removeClass('active');
					});
					$("#dropdownCancelBtn").click(function() {
						$("#dropdown").removeClass('active');
					});

					$("#dropdownSelect").click(function() {
						if ($('#dropdown').hasClass('active')) {
							$("#dropdown").removeClass('active');
						} else {
							$("#dropdown").addClass('active');
						}
					});

					$('html').click(function() {
						$("#dropdown").removeClass('active');
					});

					$('#dropdown').click(function(event) {
						event.stopPropagation();
					});

					/*
					 * $('.verifyStore') .click( function() {
					 * hideErrorInNearBy();
					 * 
					 * 
					 * 
					 * });
					 */
					$('#dialog-verify .textbox ')
							.keyup(
									function() {
										value = $(this).val();

										$('.verifyContent')
												.filter(
														function() {

															if (value != '') {
																if (($(this)
																		.children(
																				':nth-child(1)')
																		.text()
																		.trim()
																		.toLowerCase()
																		.indexOf(
																				value) != -1 || $(
																		this)
																		.children(
																				':nth-child(2)')
																		.text()
																		.trim()
																		.toLowerCase()
																		.indexOf(
																				value) != -1)) {
																	$(this)
																			.removeClass(
																					'hideBlock');
																	// //console.log(i++);
																} else
																	$(this)
																			.addClass(
																					'hideBlock');
															} else {
																$(this)
																		.removeClass(
																				'hideBlock');
															}
														});
										$('.verifyPagination').addClass(
												'hideBlock');
										var recCnt = $('.verifyContent:visible').length;
										currentPage = 1;
										if (recCnt > 9) {
											$('.verifyPagination').removeClass(
													'hideBlock');
											$('.verifyPagination')
													.pagination(
															{
																items : recCnt,
																itemsOnPage : 9,
																cssStyle : 'compact-theme',
																currentPage : currentPage,
																onPageClick : function(
																		pageNumber) {
																	showVerifyPage(pageNumber);

																}

															});
										} else {
											$('.verifyPagination').addClass(
													'hideBlock');
										}

										var i = 1;
										var cnt = 1;
										$('.verifyContent:visible ')
												.each(
														function() {
															$(this)
																	.attr(
																			'class',
																			'');
															$(this)
																	.addClass(
																			'verifyContent')
																	.addClass(
																			'pagNo-'
																					+ cnt);
															if (cnt > 1)
																$(this)
																		.addClass(
																				'hideBlock');
															if (i % 9 == 0) {
																cnt++;
															}
															i++;
															// //console.log(i++);
														});
									});

					$(".close").click(function() {
						$(".quickHelpWrapper").addClass('hideBlock');
						// $(".pageErrorsWrapper").addClass('hideBlock');
					});

					$(".jw-button-finish span").text("Print");

					$("#dialog-printer-list").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 515
					});

					if (fromScreen == undefined) {
						$('#navBarHighlight').val('stockManage');
						showStockAdjustScreen();
					} else {
						$('#navBarHighlight').val('lookUp');
					}
					
				});

// <!-- method called to close advanced search box in css -->
function closeAdvSearchClasses() {
	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');

	$("#advLink1").show();

	// $("#suppName").val("");
	// $("#suppNo").val("");
}
function focusSupplier() {
	// $("#advDiv").removeClass('advancedParam');
	$("#advDiv").removeClass('hideBlock');

	// $("#advWrapper").addClass('advancedSearchFormatWrapper');
	$("#advWrapper").removeClass('hideBlock');

	$("#closeLink").addClass('linkBtn');
	$("#closeLink").removeClass('hideBlock');

	$("#closeLink").show();
	$("#advLink1").hide();

	$("#vendorText").focus();
}

function generatePopUpContent(data) {
	var content = '<tr><th>Article</th><th>Description</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < data.length; i++) {
		content += generatePopUpRows(data[i], i);
	}
	return content;
}

function generatePopUpRows(data, rownum) {
	var content = '<tr><td id="popArticle' + rownum + '">' + data.article_no
			+ '</td><td>' + data.article_desc
			+ '</td><td class="sorted lastColumn"><label class="linkBtn" id="'
			+ rownum
			+ '"><label class="selectItem" >Select</label></label></td></tr>';
	return content;
}
function getArticleHdrInfo(data) {
	$('#dialog-pos-price').removeClass('loaded');
	var siteNo = $('#posSite').val();
	/*
	 * var flag; if ($('#ranged').is(":checked")) { flag='Y'; } else { flag='N'; }
	 */
	var param = {
		"iv_article" : data.article_no,
		"iv_site" : siteNo,
		"iv_session_id" : "",
		"iv_ranged" : data.ranged_flag,// flag,
		"iv_src_supply" : "",
		"iv_supplier" : "",
		"iv_barcode" : "",
		"iv_node_id" : "",
		"iv_node_level" : "",
		"iv_desc" : "",
		"iv_article_no" : "Y",
		"iv_gtin" : "",
		"iv_barcode_flag" : "",
		"iv_sales_org" : salesOrg,
		"iv_sap" : encSapPwd,
		"iv_user_id" : $('#loginUserId').val(),
		"iv_auto_stockr_flag" : ""
	};
	console.log(articleDtlInfoServiceURL + ' ' + JSON.stringify(param));
	$.ajax({
		type : "post",
		url : articleDtlInfoServiceURL,
		data : JSON.stringify(param),
		beforeSend : function() {
			clearAllErrors();
			startLoading();
		},
		success : function(response) {
			if (response != null && response != undefined
					&& response.length > 0
					&& response[0].article_no != undefined
					&& response[0].article_no != null
					&& response[0].article_no != "") {
				//window.location.replace("http://localhost:8080/StoreCentral_1.9");
				articleDtlInfo = response[0];
				globelResponse = response[0];
				generateArticleDetails(data, response[0]);
			} else {
				var errors = '';
				if (response.length == 0)
					errors = 'No Data Found.';
				else if (response[0].article_no == undefined)
					errors = 'Sorry, Some technical issue occured.';
				else if (response[0].article_no == "")
					errors = 'No Data Found.';
				showAllErrors(errors);
				// showError('Sorry, Some technical issue occured.');
				stopLoading();
			}
			// stopLoading();
		},
		error : function() {
			var errors = 'Sorry, Some technical issue occured.';
			showAllErrors(errors);
			// showError('Sorry, Some technical issue occured.');
			stopLoading();
		},
	});

}

function displayImageForAnArticle(article_no) {
	$('.ImgForAnArticle').html('');
	var param = {
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_site_no" : $('#posSite').val(),
		"iv_image_artnum" : article_no.trim()
	};
	console
			.log(articleImageServiceURL
					+ JSON.stringify(param));
	startLoading();
	$
			.ajax({
				type : "POST",
				url : articleImageServiceURL,//"http://10.136.228.230:8080/ws_wow_data_controller?WOW_SERVICE=GET_IMAGE_URL",//articleImageServiceURL,
				data : JSON.stringify(param),
				success : function(response) {
					if (null != response && response.length > 0
							&& response[0].url_out != undefined) {
						console.log("displayImageForAnArticle"
								+ JSON.stringify(response[0].url_out));

						$('.articleImg').addClass('hideBlock');
						var image = new Image();
						image.src = response[0].url_out;
						if (image.width == 0) {
							$('.articleImg').removeClass('hideBlock');
						} else {
							$('.ImgForAnArticle').prepend(
									"<img class='instagram-image' style='margin-top: 35px;' src='"
											+ response[0].url_out
											+ "'/></a></div>");
						}

					} else {
						
						$('.articleImg').removeClass('hideBlock');
					}
					//stopLoading();
				},
				error : function(response) {
					$('.articleImg').removeClass('hideBlock');
				},
			});

}


function generateArticleDetails(data, response) {
	startLoading();
	response.ranged_flag = data.ranged_flag;
	DaysOnHand = response.days_on_hand;
	articleHdrObj = response;
	articleNo = response.article_no.trim();
	articleDesc = response.article_desc.trim();
	articleUom = response.article_uom.trim();
	autoStockRflag = response.auto_stockr_flag;
	articleType = response.article_type;
	$('#articleTitle').text(articleNo + ' - ' + articleDesc);
	$('.nearByTitle').text(articleNo + ' - ' + articleDesc);
	$('.articleNo').val(articleNo);
	$('.articleName').val(articleDesc);
	$('.uom').val(articleUom);
	
	populateHeaderDetails(response);
	getArticleHierarchyInfo(response);
	$("#lookUpDivision").addClass("hideBlock");
	$("#topLink").addClass("hideBlock");
	//$("#clearDiv").addClass("hideBlock");

	// As of now Hiding the below
	// $('.ticketButton').addClass("hideBlock");
	// $('#expireTab').addClass("hideBlock");
	// $('#aisleInfo').css('visibility', 'hidden');
	// $('#salesHistory').addClass('hideBlock');
	// $('.ltoTr').addClass('hideBlock');
	// $('.priceHistoryDiv').addClass('hideBlock');
	// $('.posInd').addClass('hideBlock');
	// $('#ltoTab').addClass('hideBlock');
	// $('#expTab').addClass('hideBlock');

	$("#backDiv").removeClass("hideBlock");
	$("#topLink1").removeClass("hideBlock");
	$("#detailsDivision").removeClass("hideBlock");
	$(
	'#repTabF,#priTabF,#offerTabF,#ltoTabF,#expTabF,#curActTabF,#futActTabF,#posTabF,#detTabF,#vendorTabF,#gftTabF,#pastActTabF,#sizeTabF,#styleTabF,seasonTabF')
	.val('0');
	$('.ticketButton').removeClass('loaded');
	$('#repTab').trigger('click');
	$('#mainTabs').tabs({
		active : 0
	});
	$('#itemInfo').tabs({
		active : 0
	});
	$('#editTabs').tabs({
		active : 0
	});

	$('#openOrders').tabs({
		active : 0
	});

	$('#MPLCallFlag').val('false');
	$('#SCCallFlag').val('false');
	$('#FacingCallFlag').val('false');
	currentPageInPast = 1;
	currentPageInFuture = 1;
	currentPageInCurrent = 1;
	if (articleType == "VERP") {
		$('#posTab').addClass('hideBlock');
	} else {
		$('#posTab').removeClass('hideBlock');
	}

	if (isBigw != 'true') {
		$('#facingsText').addClass('hideBlock');
		$('#facingsValue').addClass('hideBlock');
	} else {
		$('#facingsText').removeClass('hideBlock');
		$('#facingsValue').removeClass('hideBlock');

	}

	$('#frcstOrdersPopUpCntnt').html('');
	$('#orderPopUpCntnt').html('');

	if (autoStockRflag != 'Y') {
		$('#addToDisplay').addClass('hideBlock');
	} else {
		$('#addToDisplay').removeClass('hideBlock');
	}
	$('#rangingAction').addClass('hideButtons');
	if (response.ranged_flag != 'Y') {
		$('.selectDropdown.AC_LMI').addClass('hideBlock');
		$('#rangingAction').removeClass('hideButtons');
		if(response.disable_ranging  == 'Y'){
			$('#rangingAction').addClass('disabled');
		}else{
			$('#rangingAction').removeClass('disabled');
		}
	} else if (isRecalled || isArchived || isALCStatus) {
		$('.selectDropdown.AC_LMI').addClass('hideBlock');
	}

	if (isDeleted) {
		$('.selectDropdown.AC_LMI').removeClass('hideBlock');
		$('.selectDropdown.AC_LMI').removeClass('hideButtons');
		$('.buttonMenu ').css('display', '');
	}
	if(isDeleted)
		{
		$('#addToDraftOrder').closest('li').removeClass('hideBlock').addClass('hideBlock');
		$('#mplAndScTab, .mplAndScTab').removeClass('hideButtons').addClass('hideButtons');
		$('#minPresLevelValue').removeClass('navigate').attr('title',false).css('cursor',
		'default').css('color', '#222222').attr("onclick", false);
		$('#shelfcapacityValue').removeClass('navigate').attr('title',false).css('cursor',
		'default').css('color', '#222222').attr("onclick", false);
		$('#facingsValue').removeClass('navigate').attr('title',false).css('cursor',
		'default').css('color', '#222222').attr("onclick", false);
		}
	else
		{
		$('#addToDraftOrder').closest('li').addClass('hideBlock').removeClass('hideBlock');
		$('#mplAndScTab, .mplAndScTab').addClass('hideButtons').removeClass('hideButtons'); 
		if(!$('.AC_LEM').hasClass('hideBlock') && !$('.AC_LEAD').hasClass('hideBlock') && !isBigw){
			$('#minPresLevelValue').addClass('navigate').attr('title','Adjust MPL/SC').attr("onclick",'attachMPLScreen()').removeAttr('style');
			$('#shelfcapacityValue').addClass('navigate').attr('title','Adjust MPL/SC').attr("onclick",'attachMPLScreen()').removeAttr('style');
			$('#facingsValue').addClass('navigate').attr('title','Adjust MPL/SC').attr("onclick",'attachMPLScreen()').removeAttr('style');
		}
		}

	if ($('.selectDropdown.AC_LMI .dropdown li:not(.hideBlock)').length == 1) {
		if (autoStockRflag != 'Y')
			$('.selectDropdown.AC_LMI').addClass('hideBlock');
	} else if ($('.selectDropdown.AC_LMI .dropdown li:not(.hideBlock)').length == 0) {
		$('.selectDropdown.AC_LMI').addClass('hideBlock');
	}

	if ($('.selectDropdown.AC_LC .dropdown li:not(.hideBlock)').length == 0) {
		$('.selectDropdown.AC_LC').addClass('hideBlock');
	}

	if (($('.AC_LEM').hasClass('hideBlock') || $('.AC_LEM').hasClass('hideButtons') )&& $('.AC_LEST').hasClass('hideBlock') && $('.AC_LEED').hasClass('hideBlock')
			&& response.ranged_flag == 'Y') {
		$('#editActions').addClass('hideBlock');
	}

	if ($('.AC_LEM').hasClass('hideBlock') && response.ranged_flag == 'Y'
			&& !$('#editActions').hasClass('hideBlock'))
		$('.mplAndScTab').addClass('hideBlock');
	else
		$('.mplAndScTab').removeClass('hideBlock');

	if ($('.AC_LEST').hasClass('hideBlock') && response.ranged_flag == 'Y'
			&& !$('#editActions').hasClass('hideBlock'))
		$('.securityTab').addClass('hideBlock');
	else
		$('.securityTab').removeClass('hideBlock');
	
	if ($('.AC_LEED').hasClass('hideBlock') && response.ranged_flag == 'Y'
		&& !$('#editActions').hasClass('hideBlock'))
	$('.expireTab').addClass('hideBlock');
	else
	$('.expireTab').removeClass('hideBlock');

	if ($('.AC_LEM').hasClass('hideBlock') && response.ranged_flag == 'Y'
			&& !$('#editActions').hasClass('hideBlock')
			&& !$('.AC_LEST').hasClass('hideBlock')
			&& $('.AC_LEED').hasClass('hideBlock')) {
		$('#editTabs').tabs({
			active : 2
		// Changed as hiding expire date content
		});
	}
	
	if ($('.AC_LEM').hasClass('hideBlock') && response.ranged_flag == 'Y'
		&& !$('#editActions').hasClass('hideBlock')
		&& $('.AC_LEST').hasClass('hideBlock')
		&& !$('.AC_LEED').hasClass('hideBlock')) {
	$('#editTabs').tabs({
		active : 0
	// Changed as hiding expire date content
	});
}
	
	if (!$('.AC_LEM').hasClass('hideBlock') && response.ranged_flag == 'Y'
		&& !$('#editActions').hasClass('hideBlock')
		&& $('.AC_LEST').hasClass('hideBlock')
		&& $('.AC_LEED').hasClass('hideBlock')) {
	$('#editTabs').tabs({
		active : 1
	// Changed as hiding expire date content
	});
}
	
	populateDefaultTicketingValues();// defect no 6104
	bindTicketingPrintClickEvent();
	;// defect no 6104
	bindEventsForTicketing();
	// as per the Fwd: GP functionality in RF gun mail restricting the GP look
	// up
	if (deptNo == '20') {
		$('#gpLookUP,#gpLookLink').addClass('hideBlock');
	}
	//$('#prod-img').attr('src','https://www.woolworths.com.au/Content/wowProductImages/large/'+articleNo+'.jpg');
	stopLoading();
}

function saveSecurityArticle() {
	// $('#searchBox').val().split('-')[0];
	if (complexPBDFlag != 'Y') {
		if (localSecurityFlag == 'N') {
			var dataFlag;
			if ($('#yST').is(':checked')) {
				dataFlag = "Y";
			} else {
				dataFlag = "N";
			}
			if (securityTag == dataFlag) {
				showAllErrorsInEdit('No changes in values.');
				return false;
			}
			var param = {
				iv_article : articleNo,
				iv_uom : articleUom,
				iv_session_id : "12345",
				iv_user_id : $('#loginUserId').val(),
				iv_security_new : dataFlag,
				iv_security_old : ""
			};
			console.log(updatesecurityarticle + JSON.stringify(param));
			$
					.ajax({
						type : "post",
						url : updatesecurityarticle,
						data : JSON.stringify(param),
						beforeSend : function() {
							clearAllErrors();
							hideErrorInEditPop();
							startLoading();
						},
						success : function(response) {
							if (response[0].ErrorMsg != undefined) {
								showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
								if (securityTag == 'N' || securityTag == "") {
									$('#yST').prop('checked', false);
								} else if (securityTag == 'Y') {
									$('#yST').prop('checked', true);
								}
							} else if (response[0].msg_type == 'S') {
								if ($('#posTabF').val() != '0') {
									if (dataFlag == 'Y')
										$('#security_flag').removeClass(
												'negativeFlag').addClass(
												'positiveFlag');
									else
										$('#security_flag').removeClass(
												'positiveFlag').addClass(
												'negativeFlag');
								}

								$.fn.showCustomMsg([ response[0].msg ],
										success, "Article Lookup");
								// Defect
								/*
								 * showStatusContent('', '<li>' +
								 * response[0].msg + '</li>');
								 */
								$("#dialog-editFunctions").dialog("close");
								
							} else if (response[0].msg_type == 'E') {
								showAllErrorsInEdit('' + response[0].msg
										+ '');
								if (securityTag == 'N' || securityTag == "") {
									$('#yST').prop('checked', false);
								} else if (securityTag == 'Y') {
									$('#yST').prop('checked', true);
								}
							}
							stopLoading();

						},
						error : function(response) {
							showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
							stopLoading();
						},
					});
		} else if (localSecurityFlag == 'Y') {
			showAllErrorsInEdit('Cannot Update As Security Tag Is Enabled In Central');
		}
	} else if (complexPBDFlag == 'Y') {

		var $dataRow = $('#cPBDTable').find('tr[data-complex-PBD]:visible');
		var oldSecValue = $dataRow.find('input').attr('prev-sec-tag');
		var securityFlagForCPBD = $dataRow.find('input')
				.attr('global-sec-flag');

		var selectedArticleNo = $dataRow.find('input').attr('isis-ref-no');
		console.log('selectedArticleNo ' + selectedArticleNo);
		var selectedUom = $dataRow.find('input').attr('complex-pbd-uom');
		console.log('selectedUom ' + selectedUom);

		if (securityFlagForCPBD == 'N') {
			var dataFlag;
			if ($dataRow.find('input').is(':checked')) {
				dataFlag = "Y";
			} else {
				dataFlag = "N";
			}
			if (oldSecValue == dataFlag) {
				showAllErrorsInEdit('No changes in values.');
				return false;
			}
			var param = {
				iv_article : selectedArticleNo,
				iv_uom : selectedUom,
				iv_session_id : "12345",
				iv_user_id : $('#loginUserId').val(),
				iv_security_new : dataFlag,
				iv_security_old : ""
			};
			console.log(updatesecurityarticle + JSON.stringify(param));
			$
					.ajax({
						type : "post",
						url : updatesecurityarticle,
						data : JSON.stringify(param),
						beforeSend : function() {
							clearAllErrors();
							hideErrorInEditPop();
							startLoading();
						},
						success : function(response) {
							if (response[0].ErrorMsg != undefined) {
								showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
								if (oldSecValue == 'N' || oldSecValue == "") {
									$dataRow.find('input').prop('checked',
											false);
								} else if (oldSecValue == 'Y') {
									$dataRow.find('input')
											.prop('checked', true);
								}
							} else if (response[0].msg_type == 'S') {
								if ($('#posTabF').val() != '0') {
									if (dataFlag == 'Y'
											&& (selectedUom == articleUom))
										$('#security_flag').removeClass(
												'negativeFlag').addClass(
												'positiveFlag');
									else
										$('#security_flag').removeClass(
												'positiveFlag').addClass(
												'negativeFlag');
								}

								$.fn.showCustomMsg([ response[0].msg ],
										success, "Article Lookup");

								/*
								 * showStatusContent('', '<li>' +
								 * response[0].msg + '</li>');
								 */
								$("#dialog-editFunctions").dialog("close");
								
							} else if (response[0].msg_type == 'E') {
								showAllErrorsInEdit('' + response[0].msg
										+ '');
								if (securityTag == 'N' || securityTag == "") {
									$('#yST').prop('checked', false);
								} else if (securityTag == 'Y') {
									$('#yST').prop('checked', true);
								}
							}
							stopLoading();

						},
						error : function(response) {
							showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
							stopLoading();
						},
					});
		} else if (securityFlagForCPBD == 'Y') {
			showAllErrorsInEdit('Cannot Update As Security Tag Is Enabled In Central');
		}

	}
}

function getArticlesForPagination(pageNo) {

	var actualIndex = pageNo - 1;
	var articleList = '';
	articleList = articleDisplayList;
	var startIndex = '';
	var endIndex = '';
	if (actualIndex == 0) {
		startIndex = 0;
		endIndex = itemsOnPage;
	} else if (actualIndex != 0) {
		startIndex = actualIndex * itemsOnPage;
		endIndex = pageNo * itemsOnPage;
	}
	articleList = jQuery.grep(articleList, function(n, i) {
		return (i >= startIndex && i < endIndex);
	});
	currentPage = pageNo;
	iterateArticles(articleList, '');
}

function iterateArticles(articleList, subCatId, startIndex, endIndex) {
	var content = "";
	if (articleList != null && articleList.length > 0 && articleList[0].article_no != "") {
		$
				.each(
						articleList,
						function(i, item) {
//							console.log(item);
							item.standard_sell_price = (item.standard_sell_price != null
									&& item.standard_sell_price != undefined && isNaN(item.standard_sell_price) == false) ? Number(
									item.standard_sell_price).toFixed(2)
									: '0.00';
							item.promo_sell_price = (item.promo_sell_price != null
									&& item.promo_sell_price != ""
									&& item.promo_sell_price != undefined && isNaN(item.promo_sell_price) == false) ? Number(
									item.promo_sell_price).toFixed(2)
									: '';// Removed 0.00 for UAT defect 2081
							item.soh = (item.soh != null
									&& item.soh != undefined && isNaN(item.soh) == false) ? Number(
									item.soh).toFixed(3)
									: '0.00';
							item.article_uom = (item.article_uom != null
									&& item.article_uom != undefined && isNaN(item.article_uom)) ? (item.article_uom)
									: ''; // removed == false condition as the
							// isNaN(uom) will always be true
							content += '<tr id="'
									+ i
									+ '" class="articleEnqNew subHeader appendedRow">'
									/*+ viewItemdetails + applicationSettingsCR*/
									+ '<td class="leftValue artNoArtSrchDet" id="art' + i
									+ '" >' + item.article_no + '</td>'
									+ '<td class="leftValue">'
									+ item.article_desc + '</td>'
									+ '<td class="rightValue">';
							if (item.ranged_flag == 'Y')
								content += Number(item.standard_sell_price)
										.toFixed(2);
							content += '</td>' + '<td class="rightValue">';
							if (item.ranged_flag == 'Y')
								content += (item.promo_sell_price);// Removed
							// Number(price).toFixed(2)
							// for UAT
							// defect
							// 2081
							content += '</td>' + '<td class="leftValue sohArtSrchDet">';
							if(item.perpetual_flag == 'Y')
							{
							if (item.article_uom == 'EA')

								content += deciValues(item.random_weight_flag,
										'', '', '', item.soh, item.pi_soh, '',
										item.article_uom, true,
										'articleLookup');// defect no 6066
							else
								content += deciValues(item.random_weight_flag,
										(((item.weighted_article_flag||'') == 'Y' || (item.allow_decimal_adj||'') == 'Y') ? 'Y' : 'N'), '', '', item.soh, item.pi_soh, '',
										item.article_uom, true,
										'articleLookup');// defect no 6066
							if (item.random_weight_flag == 'Y')// defect no
								// 6066
								content += ' ' /*+ item.pi_uom*/ + '</td>';
							else
								content += ' ' + item.article_uom + '</td>';
						}
							else
								{
								content +='</td>';
								}
							if (item.ranged_flag == 'Y')
								content += '<td class="lastColumn rightValue numberColumn"> <label class="positiveStatus">&nbsp;</label></td>';
							else
								content += '<td class="lastColumn rightValue numberColumn"> <label class="negativeStatus">&nbsp;</label></td>';
							+'</tr>';

						});

		$('.lookupPagination').pagination({
			items : recordCount,
			itemsOnPage : itemsOnPage,
			cssStyle : 'compact-theme',
			currentPage : currentPage,
			selectOnClick : false,
			onPageClick : function(pageNumber, event) {
				getArticlesForPagination(pageNumber);
			}
		});
		if (recordCount / itemsOnPage > 1) {
			$('.lookupPagination').removeClass('hideBlock');
		} else {
			$('.lookupPagination').addClass('hideBlock');
		}
		$('#instorePromoReportTable tbody').html('');
		$('#instorePromoReportTable tbody').append(content);
		$(".appendedRow").unbind('click');
		$(".appendedRow").click(function() {
			getArticleHdrInfo(articleList[$(this).attr("id")]);
		});
		//$("#clearDiv").removeClass("hideBlock");
		addScrollToTable();
		bindScrollBar();
		showReportTable();
		securityMatrix();
		$('#createDrpDwn,#ticketDrpDwn,#orderDrpDwn').css('display','');
		showOrHideButtons();
		// tempSort('instorePromoReportTable');
	}else{
		var errors = 'No Data Found.';
		showAllErrors(errors);
	}

}

function showReportTable() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	$('#instoreReport_t').removeClass('hideBlock');
	$('#hierarchyDiv1').addClass('hideBlock');
	$('#hierarchyDiv2').addClass('hideBlock');
}

function hideReportTable() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('#instoreReport_t').addClass('hideBlock');
	$('#hierarchyDiv1').removeClass('hideBlock');
	$('#hierarchyDiv2').removeClass('hideBlock');
	// $('#hierarchyID').val('select');
}

function addScrollToTable() {
	// Code for adding scorllers to the table
	var tableCols = 0;
	$("#instorePromoReportTable tbody tr").each(function() {
		var currCount = 0;
		$(this).children("td").each(function() {
			currCount++;
			var colSpan = $(this).attr("colspan");
			if (colSpan > 0) {
				currCount = currCount + (colSpan - 1);
			}
			if (currCount > tableCols)
				tableCols = currCount;
		}); // next td
	}); // next tr
	var width = 0;
	if (tableCols < 12) {
		$("#scrollTable").removeClass('scrollTableContainer');
		$("#scrollWindow").removeClass('scrollWindow');
		$("#scrollBtns").addClass('hideBlock');
	}
	if (tableCols > 11) {
		width = (tableCols * 45) - 100;
		if (width > 1004)
			document.getElementById("scrollWindow").style.width = width + "px";
		else
			document.getElementById("scrollWindow").style.width = "1004px";
	}
}

function bindScrollBar() {
	$('#next-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});

	$('#previous-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
	$('.bottomPagination ').css('margin-top', '10px');
}

function callServiceForInstoreAddList(promType) {
	clearAllErrors();
	var daraft = [];

	daraft.push(getDraftObj(articleNo, articleDesc, articleUom, promType));

	modifyDraft(daraft, promType);

}

function getDraftObj(articleNo, description, uom, promType, dispType) {
	var promoReason ="";
	if (promType == 'display') {
		promType = 'ZDIS';
	} else if (promType == 'clearance') {
		promType = 'ZCLR';
	} else if (promType == 'special') {
		promType = 'ZSPA';
		promoReason=promType;
	} else if (promType == 'marketing') {
		promType = 'ZLOM';
		promoReason=promType;
	} else if (promType == 'advertised') {
		promType = 'ZADT';
		promoReason=promType;
	} else {
		promType = 'ZCOM';
	}

	var draft = {
		"MATNR" : articleNo,
		"ISIS_MATNR" : articleNo,
		"MAKTX" : description,
		"USER_ID" : $('#loginUserId').val(),
		"MEINH" : uom,
		"START_DATE" : null,
		"END_DATE" : null,
		"DISPLAY_TYPE" : (dispType == undefined || dispType == '') ? 'F'
				: dispType,
		"JOB_MODE" : "I",
		"PROMO_TYPE" : promType,
		"PROMO_REASON":promoReason,
		"STATUS" : "DRAFT",
		"DEPARTMENT" : deptNo,
		"STATUS_MESSAGE" : " "
	};

	return draft;
}

function modifyDraft(dataObj, promType) {
	// service call to put my draft list
	try {
		var param = {
			"ItemArray" : dataObj
		};
		console.log('', JSON.stringify(param));
		$
				.post(modifyMyDraftURL, JSON.stringify(param))
				.done(
						function(data) {
							console.log('Added to My draft:' + data);
							if (promType == 'display') {
								$("#dialog-listDisplay").parent().addClass(
										"popupWrapper");
								$("#dialog-listDisplay").dialog("open");
								$("#dialog-listDisplay")
										.find('#msgId')
										.text(
												"The article has been added to the in-store display List.");
							} else if (promType == 'clearance') {
								$("#dialog-listClearance").parent().addClass(
										"popupWrapper");
								$("#dialog-listClearance").dialog("open");
								$("#dialog-listClearance")
										.find('#msgId')
										.text(
												"The article has been added to the in-store clearance List.");
							} else if (promType == 'special' || promType == 'marketing' || promType == 'advertised') {
								$("#dialog-listSpecial").parent().addClass(
										"popupWrapper");
								$("#dialog-listSpecial").dialog("open");
								$("#dialog-listSpecial")
										.find('#msgId')
										.text(
												"The article has been added to the in-store Other Markdown List.");
							} else {
								$("#dialog-listCompetition").parent().addClass(
										"popupWrapper");
								$("#dialog-listCompetition").dialog("open");
								$("#dialog-listCompetition")
										.find('#msgId')
										.text(
												"The article has been added to the in-store competition List.");
							}
							stopLoading();
						});
	} catch (err) {
		console.log(err);
		stopLoading();
		if (promType == 'display') {
			$("#dialog-listDisplay").parent().addClass("popupWrapper");
			$("#dialog-listDisplay").dialog("open");
			$("#dialog-listDisplay").find('#msgId').text(
					"Failed to add article to in-store display List.");
		} else if (promType == 'clearance') {
			$("#dialog-listClearance").parent().addClass("popupWrapper");
			$("#dialog-listClearance").dialog("open");
			$("#dialog-listClearance").find('#msgId').text(
					"Failed to add article to in-store clearance List.");
		} else if (promType == 'specialActivity') {
			$("#dialog-listSpecial").parent().addClass("popupWrapper");
			$("#dialog-listSpecial").dialog("open");
			$("#dialog-listSpecial").find('#msgId').text(
					"Failed to add article to in-store clearance List.");
		} else {
			$("#dialog-listCompetition").parent().addClass("popupWrapper");
			$("#dialog-listCompetition").dialog("open");
			$("#dialog-listCompetition").find('#msgId').text(
					"Failed to add article to in-store competition List.");
		}
	}
}

function showError(msg) {
	$('#errorMsgDiv').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
}

function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
}


function getNearByStores() {
	$('#distance').val('20');
	$('#siteNo').val('');
	$('#maxStores').val('10');
	$('#dropdown li input').prop('checked', false);
	$('#dropdown li input[value="' + $('#salesOrg').val() + '"]').prop(
			'checked', true);
	$('#dropdownSelect').text($('#dropdown li input:checked').next().text());
	hideErrorInNearBy();
	var param = formNearByStoreSearchInputParam($('#posSite').val());
	console.log(nearbyStoreSearchInArticleLookupURL+JSON.stringify(param));
	$.ajax({
		type : "post",
		url : nearbyStoreSearchInArticleLookupURL,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if(response != null && response != undefined){
				var output = response;
				if(output != null && output.data != null &&
					output != undefined && output.data != undefined
					&& output.data.length >0){				
					var storeList = output.data;
					var msg = storeList[0].msg;
					if (msg != '' && msg != null && msg != undefined && msg != 'null') {
						showErrorInNearBy(msg);
					} else if (storeList != null && storeList.length > 0) {
						currentPageInNear = 1;
						itemsOnPageInNear = 10;
						recordCountInNear = storeList.length;
						formNearbyStoresSearchResults(storeList);
						$('#nearbyStoresResultTable').removeClass('hideBlock');
					}
					}else{		
						showErrorInNearBy('Sorry, No Data Found.');
					}
				}else{		
					showErrorInNearBy('Sorry, No Data Found.');
				}		
			stopLoading();
		},
		error : function(response) {
			console.log(response);
			stopLoading();
		},
	});

	$("#lookUpDivision").addClass("hideBlock");
	$("#topLink").addClass("hideBlock");
	//$("#clearDiv").addClass("hideBlock");
	$("#backDiv").removeClass("hideBlock");
	$("#topLink1").addClass("hideBlock");
	$("#topLink2").removeClass("hideBlock");
	$('#backBtn').addClass('nearBy');
	$("#detailsDivision").addClass("hideBlock");
	$('.nearByLookup').removeClass('hideBlock');
}

function getWarehouseList() {
	// service call to get warehouse list
	startLoading();
	var param = {
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : ""
	};
	console.log(warehouseLookupServiceURL + ' ' + JSON.stringify(param));
	$.post(warehouseLookupServiceURL, JSON.stringify(param)).done(
			function(data) {
				var response = data;
				populateWarehouseList(response);
				stopLoading();
			});
}

function populateWarehouseList(list) {
	var content = '';
	content += '<option value="0">Select</option>';
	for ( var i = 0; i < list.length; i++) {
		content += '<option value="' + list[i].site_no + '">' + list[i].site_no
				+ ' | ' + list[i].site_desc + '</option>';
	}
	$('#warehouseID').html('');
	$('#warehouseID').append(content);
}

function getVendorLookuplist(vendor, from) {

	startLoading();

	var param = {
		"iv_vendor" : vendor,
		"iv_session_id" : ""
	};
	console.log(vendorLookupServiceURL + ' ' + JSON.stringify(param));
	$.post(vendorLookupServiceURL, JSON.stringify(param)).done(
			function(data) {
				if (data != undefined && data != null && data.length > 0
						&& data[0].vendor_no != undefined) {
					var response = data;
					var content = formVendorSearchResults(response, vendor);
					$('#popupDataDiv').html('');
					$('#popupDataDiv').append(content);

					var recCnt = response.length;
					currentPageInPopup = 1;
					if (recCnt > 9) {
						$('.paginationDivVerifyVendorPopup').removeClass(
								'hideBlock');
						$('.paginationDivVerifyVendorPopup').pagination({
							items : recCnt,
							itemsOnPage : 9,
							cssStyle : 'compact-theme',
							currentPage : currentPageInPopup,
							onPageClick : function(pageNumber) {
								getVendorsForPagination(pageNumber);

							}

						});
					} else {
						$('.paginationDivVerifyVendorPopup').addClass(
								'hideBlock');
					}

					var i = 1;
					var cnt = 1;
					$('.verifyVendorContent tbody tr ').each(
							function() {
								$(this).attr('class', '');
								$(this).addClass('verifyContentInPopUp')
										.addClass('pagNo-' + cnt);
								if (cnt > 1)
									$(this).addClass('hideBlock');
								if (i % 9 == 0) {
									cnt++;
								}
								i++;
								// //console.log(i++);
							});
					if ($('#sizeCheck').val() == 0) {
						if ($("#dialog-supplier-modal").dialog("isOpen")) {
							$("#dialog-supplier-modal").dialog("close");
						}
						if ($("#dialog-supplier-modal").dialog("isOpen")) {
							$('.message-div').parent().parent().addClass(
									'warningMessage').removeClass('errorDiv');
							$('.message-div,.paginationDivVerifyVendorPopup')
									.addClass('hideBlock');
							$('.error-div').removeClass('hideBlock').text(
									'Invalid supplier');
						} else {
							var errors = getError('Invalid supplier');
							showAllErrors(errors);
							$('#vendorText').focus();
						}
						focusSupplier();
					} else if ($('#sizeCheck').val() > 1) {
						if (!$("#dialog-supplier-modal").dialog("isOpen")) {
							$('#vendorDesc').val($('#vendorText').val());
							$("#dialog-supplier-modal").parent().addClass(
									"popupWrapper");
							$("#dialog-supplier-modal").dialog("open");
							$('.verifyVendorContent').parent().removeClass(
									'hideBlock');
							$("#searchWarning").addClass('hideBlock');
							$("#popupSearchVendor").removeClass('hideBlock');
							$('.message-div').parent().parent().removeClass(
									'warningMessage').removeClass('errorDiv');
							$('.message-div,.paginationDivVerifyVendorPopup')
									.removeClass('hideBlock');
							$('.error-div').addClass('hideBlock');
						}
					} else {
						$("#vendorText").val(
								$("#suppNo0").text() + "-"
										+ $("#suppName0").text());
						$('#vendorCheck').val(true);
						$("#dialog-supplier-modal").dialog("close");
					}
					bindPopUpEvents();
				} else {
					if ($("#dialog-supplier-modal").dialog("isOpen")) {
						$('.message-div').parent().parent()
								.addClass('errorDiv').removeClass(
										'warningMessage');
						$('.message-div,.paginationDivVerifyVendorPopup')
								.addClass('hideBlock');
						$('.error-div').removeClass('hideBlock').text(
								'Invalid supplier');
						$('.verifyVendorContent').parent()
								.addClass('hideBlock');
					} else {
						var errors = getError('Invalid supplier');
						showAllErrors(errors);
					}
				}
				stopLoading();
			});

}

function formVendorSearchResults(list, text) {
	var content = '';
	var rowContent = '';

	content += '<div class="popupSearchWrapper" id="">';
	content += '<div class="tableInfo "style="display: inline-block;float: left;"><h4 class="message-div">Total <strong>'
			+ list.length
			+ '</strong> results found for <strong class="searchString">"'
			+ text
			+ '"</strong>. Please select a vendor from the list below.</h4></div>'
			+ '<h4 class="error-div"></h4>';

	content += '<div class="paginationWrapper  paginationDivVerifyVendorPopup paginationDiv hideBlock" id="paginationDiv1">'
			+ '<div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>'
			+ '</div></div></div><!-- End of search wrapper --></div>';

	content += '<div class="ContentTableWrapper"><table class="ContentTable verifyVendorContent" cellspacing="0">'
			+ '<thead><tr><th>Vendor #</th><th>Description</th><th>Phone Number</th><th>Fax Number</th>'
			+ '<th>Suburb</th><th>State</th><th>Lead Time</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead><tbody>';
	if (list != null && list != undefined && list.length > 0) {
		for ( var i = 0; i < list.length; i++) {

			rowContent += '<tr><td class="pagNo-';
			if (i > 9)
				rowContent += 'hideBlock';
			rowContent += '" id="suppNo'
					+ i
					+ '">'
					+ list[i].vendor_no
					+ '</td><td id="suppName'
					+ i
					+ '">'
					+ list[i].vendor_name
					+ '</td><td>'
					+ list[i].telephone
					+ '</td><td>'
					+ list[i].fax
					+ '</td><td>'
					+ list[i].city
					+ '</td><td>'
					+ list[i].region
					+ '</td><td>'
					+ (list[i].lead_time != null
							&& list[i].lead_time != undefined ? list[i].lead_time
							: '')
					+ '</td><td class="sorted lastColumn"><label class="linkBtn linkBtn1" id="'
					+ i
					+ '"><label class="selectItem">Select</label></label></td></tr>';

		}
	}
	content += rowContent
			+ '</tbody></table>'
			+ '<div class="tableFooter"><div class="paginationWrapper bottomPagination  paginationDivVerifyVendorPopup paginationDiv hideBlock"'
			+ 'id="paginationDiv2"><div class="pagination-holder clearfix"><div id="compact-pagination" class="compact-theme simple-pagination"></div>'
			+ '</div></div></div>' + '</div><input type="hidden" value="'
			+ list.length + '" id="sizeCheck" />';
	return content;
}

function bindPopUpEvents() {
	$(".linkBtn1").click(
			function() {
				clearAllErrors();
				var id = $(this).attr("id");
				$("#vendorText").val(
						$("#suppNo" + id + "").text() + "-"
								+ $("#suppName" + id + "").text());
				$('#vendorCheck').val(true);
				if ($("#dialog-supplier-modal").dialog("isOpen"))
					$("#dialog-supplier-modal").dialog("close");
			});
}
//Defect 11994 & 12277 - R18.01 Ends
function populateNextDeliveryInfo(data){
	var param = {
		"iv_article" : articleNo,
		"iv_cpbd_flag" : complexPBDFlag,
	};
	console.log(getNextDeliveryDetails + ' ' + JSON.stringify(param));
	$.post(getNextDeliveryDetails, JSON.stringify(param))
	.done(function(resp) {
		nxtDlvryData = resp;
		if (nxtDlvryData != null
				&& nxtDlvryData != undefined
				&& nxtDlvryData.length > 0) {
				data[0].next_delivery_qty = nxtDlvryData[0].next_delivery_qty;
				data[0].next_delivery_date = nxtDlvryData[0].next_delivery_date;
				data[0].last_ordered_qty = nxtDlvryData[0].last_ordered_qty;
		}else{
			data[0].next_delivery_qty = '';
			data[0].next_delivery_date = '';
			data[0].last_ordered_qty = '';
		}
		frameReplenishmentContent(data)
	}).fail(function(resp) {
		data[0].next_delivery_qty = '';
		data[0].next_delivery_date = '';
		data[0].last_ordered_qty = '';
		frameReplenishmentContent(data)
	});

}
//Defect 11994 & 12277 - R18.01 Ends
function frameReplenishmentContent(data){

	rplArray = data;
	if (rplArray != null
			&& rplArray != undefined
			&& rplArray.length > 0) {

		if (rplArray[0].security_article == 'Y') {
			localSecurityFlag = 'Y';
		} else {
			localSecurityFlag = 'N';
		}
		var printOrderQ = '';    // for Defect_7411&  Defect_7292 
		var printReceivedQ = '';
		/*var nextOdrQty = rplArray[0].next_delivery_details != null
				&& rplArray[0].next_delivery_details != '' ? rplArray[0].next_delivery_details
				.split('|')
				: '';*/
		if (isRandomWghtArticle) {
			//11994 & 12277
			//var cond = (rplArray[0].last_ord_qty == null
					//|| rplArray[0].last_ord_qty == undefined ? ''
					//: rplArray[0].last_ord_qty);
			var condition = (rplArray[0].last_rec_qty == null
					|| rplArray[0].last_rec_qty == undefined ? ''
							: Number(
									rplArray[0].last_rec_qty)
									.toFixed(2)+" "+(rplArray[0].last_rec_uom || ''));
			/*if (cond != '' && cond !=0) {
				var arrayOfStrings = cond
						.split(" ");

				printOrderQ = Number(arrayOfStrings[0]).toFixed(2)
						+ " "
						+ arrayOfStrings[1];
			}else {
				
				printOrderQ = 0;
			}*/
			
			if (condition != ''){
				
				printReceivedQ = (rplArray[0].last_rec_qty == null
						|| rplArray[0].last_rec_qty == undefined ? ''
								: Number(
										rplArray[0].last_rec_qty)
										.toFixed(2)+" "+(rplArray[0].last_rec_uom || ''));
				}
			}

		else {
			//11994 & 12277
			/*if (rplArray[0].last_ord_qty == null
					|| rplArray[0].last_ord_qty == 0) {

				printOrderQ = 0;
			}
			else {
				var cond = (rplArray[0].last_ord_qty == null
						|| rplArray[0].last_ord_qty == undefined ? ''
						: rplArray[0].last_ord_qty);
				if (cond != '') {
					var arrayOfStrings = cond
							.split(" ");

					printOrderQ = +Math
							.round(arrayOfStrings[0])
							+ " "
							+ arrayOfStrings[1];
				}
			}*/
			if(rplArray[0].last_rec_qty == null	|| rplArray[0].last_rec_qty == 0)												
			{	
				printReceivedQ = 0;
			}
			else {
				var condition = (rplArray[0].last_rec_qty == null
						|| rplArray[0].last_rec_qty == undefined ? ''
								: Number(
										rplArray[0].last_rec_qty)
										.toFixed(2)+" "+(rplArray[0].last_rec_uom || ''));
																			
				if (condition != '') {
						var arrayOfStr = condition
								.split(" ");

						printReceivedQ = +Math
								.round(arrayOfStr[0])
								+ " "
								+ arrayOfStr[1];
				}
			}
		}
		var content = '';
		content += '<tr><td>Delivery Roster:</td><td class="valueInfo">'
				+ (rplArray[0].delivery_roaster == null
						|| rplArray[0].delivery_roaster == undefined ? ''
						: formatDateMobi(rplArray[0].delivery_roaster))
				+ '</td>'
				+ '<td width="30%">Last Received:</td><td width="20%" class="valueInfo">'
				+ (rplArray[0].last_del_date == null
						|| rplArray[0].last_del_date == undefined ? ''
						: formatDateMobi(rplArray[0].last_del_date))
				+ '</td>'
				+ '</tr><tr><td width="30%">Next Delivery:</td>'
				+ '<td width="20%" class="valueInfo">'
				+ (rplArray[0].next_delivery_date == null
						|| rplArray[0].next_delivery_date == undefined ? ''
						: formatDateMobi(rplArray[0].next_delivery_date))
				//+ ( nextDeliveryDate != '' ? formatDateMobiFmt(nextDeliveryDate) : '') //Defect 11994 & 12277 - R18.01
				+ '</td>'
				+ '<td>Last Ordered Qty: </td>'
				+ '<td class="valueInfo">'
				//11994 & 12277
				//+ printOrderQ
				+ (rplArray[0].last_ordered_qty||'')
				+ '</td>'
				+ '</tr>'
				+ '<tr><td>Following Delivery : </td><td class="valueInfo">'
				+ (rplArray[0].next_del_date_two == null
						|| rplArray[0].next_del_date_two == undefined ? ''
						: formatDateMobi(rplArray[0].next_del_date_two))
				+ '</td>'
				+ '<td>Last Received Qty:</td><td class="valueInfo">'
				+ printReceivedQ
				+ '</td>'
				+ '</tr><tr>'															
				+ '<td id="perInventoryUomLabel">Perpetual Inventory UOM: </td><td id="perInventoryUom" class="valueInfo">'
				+ (rplArray[0].pi_uom == null ? ''
						: rplArray[0].pi_uom)
				+ '</td><td id="daysOnHandLabel">Days On Hand:</td>'
				+ '<td id="daysOnHand" class="valueInfo">'
				+ (DaysOnHand == null
						|| DaysOnHand == undefined ? ''
						: Number(
								DaysOnHand)
								.toFixed(
										3))															
				+ '</td>'
				+ '</tr><tr><td id="perInventoryOmLabel">Perpetual Inventory OM:	</td><td id="perInventoryOm" class="valueInfo">'
				+ (rplArray[0].pi_om == null ? ''
						: rplArray[0].pi_om)
				+ '</td><td id="perNextOdrQtyLabel">Next Order Qty:</td><td id="perNextOdrQty" class="valueInfo">'
				+ ( rplArray[0].next_delivery_qty||'' ) //Defect 11994 & 12277 - R18.01
				+ '</td></tr>'
				+ '<tr class="lastRow"><td class="lastColumn " colspan="6">';
		
		if (rplArray[0].shelf_ready_flag == 'Y')
			content += '<label class="positiveFlag">Shelf Ready</label>';
		else
			content += '<label class="negativeFlag">Shelf Ready</label>';
		if (rplArray[0].security_article == 'Y')
			content += '<label class="positiveFlag">Security Item</label>';
		else
			content += '<label class="negativeFlag">Security Item</label>';
		if (autoStockRflag == 'Y')
			content += '<label class="positiveFlag">Automatic Store Replenishment</label>';
		else
			content += '<label class="negativeFlag">Automatic Store Replenishment</label>';

		//profitable line indicator
		if (rplArray[0].profitable_line == 'Y'){
			content += '<label class="positiveFlag">Profitable Line</label>';
			}
	/*	else {			// Defect_9221
			if(salesOrg!=1060){
			content += '<label class="negativeFlag">Profitable Line</label>';
			}	}	*/
        
		//Image line indicator
		if (rplArray[0].image_line == 'Y'){
			content += '<label class="positiveFlag">Image Line</label>';
			}
	/*	else{			///Defect_9221
			if(salesOrg!=1060){
			content += '<label class="negativeFlag">Image Line</label>';
			}}	*/
		
		//prepack indicator
		if (rplArray[0].prepack_item_flag == 'Y')
			content += '<label class="positiveFlag">Prepack</label>';
		else
			content += '<label class="negativeFlag">Prepack</label>';
        
		// display indicator
		if (rplArray[0].display_item_flag == 'Y')
			content += '<label class="positiveFlag">Display</label>';
		else
			content += '<label class="negativeFlag">Display</label>';
        
		//Key Item indicator
		if (rplArray[0].key_item == 'Y'){
			content += '<label class="positiveFlag">Key Item</label>';
		}
	/*	else{		//Defect_9221
			if(salesOrg!=1060){
			content += '<label class="negativeFlag">Key Item</label>';
		} }	*/
		content += //'<label class="history" id="sohFullLog" style="float:right" onclick="showFullAdjLog(\''+articleNo+'\');">SOH Full Log</label></td></tr>';
			'</td></tr>';
		$('#replenishmentTop')
				.html(content);
		
		var content1 = '&nbsp; Unit of Measure(UOM): ';
		uomRadio_ticketContent = '<div id="uomRadio_ticket"><p class="notes"><strong>Select UOM:</strong>'
		var tableContents = '';
		repUomArray = [];

		if (rplArray.length > 0) {
			var hideTableBlock = ' hideBlock';// ganesh
			// Defect_319
			for ( var i = 0; i < rplArray.length; i++) {

				if (i == 0) {// ganesh
					// Defect_319
					hideTableBlock = '';
				} else {
					hideTableBlock = ' hideBlock';// ganesh
					// Defect_319
				}
				tableContents += '<table class="ContentTable '
						+ hideTableBlock
						+ '" cellspacing="0"><tbody class="uomRadioTable rpl'
						+ (rplArray[i].pack_break_uom == null
								|| rplArray[i].pack_break_uom == undefined ? ''
								: rplArray[i].pack_break_uom)
						+ i
						+ '"></tbody>';

				tableContents += '<tr><td width="20%">Current MPL:</td>'
						+ '<td width="13%" class="valueInfo" id="curMPL">'
						+ (rplArray[i].curr_mpl == null
								|| rplArray[i].curr_mpl == undefined ? ''
								: Number(
										rplArray[i].curr_mpl)
										.toFixed(
												0))
						+ '</td>'
						+ '<td width="20%">Current Shelf Capacity:</td>'
						+ '<td width="13%" class="valueInfo" id="curShelfLif">'
						+ (rplArray[i].curr_sc == null
								|| rplArray[i].curr_sc == undefined ? ''
								: Number(
										rplArray[i].curr_sc)
										.toFixed(
												0))
						+ '</td>'
						// + '<td
						// width="33%"
						// class="lastColumn">&nbsp;</td>'
						+ '</tr><tr>'
						+ '<td width="20%">Previous MPL:</td>'
						+ '<td width="13%" class="valueInfo" id="">'
						+ (rplArray[i].prev_mpl == null
								|| rplArray[i].prev_mpl == undefined ? ''
								: Number(
										rplArray[i].prev_mpl)
										.toFixed(
												0))
						+ '</td>'
						+ '<td width="20%">Previous Shelf Capacity:</td>'
						+ '<td width="13%" class="valueInfo"  id="">'
						+ (rplArray[i].prev_sc == null
								|| rplArray[i].prev_sc == undefined ? ''
								: Number(
										rplArray[i].prev_sc)
										.toFixed(
												0))
						+ '</td>'
						// + '<td
						// width="33%"
						// class="lastColumn">&nbsp;</td>'
						+ '</tr>'
						+ '<tr class="lastRow"><td width="20%">Default MPL:</td>'
						+ '<td width="13%" class="valueInfo" id="">'
						+ (rplArray[i].default_mpl == null
								|| rplArray[i].default_mpl == undefined ? ''
								: Number(
										rplArray[i].default_mpl)
										.toFixed(
												0))
						+ '</td>'
						+ '<td width="20%">Default Shelf Capacity:</td>'
						+ '<td width="13%" class="valueInfo" id="">'
						+ (rplArray[i].default_sc == null
								|| rplArray[i].default_sc == undefined ? ''
								: Number(
										rplArray[i].default_sc)
										.toFixed(
												0))
						+ '</td>'
						// + '<td
						// width="33%"
						// class="lastColumn">&nbsp;</td>'
						+ '</tr></table>';
				content1 += '<input type="radio" name="searchByOptions" value="'
						+ i
						+ '" id="rpl'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
						+ i + '" ';
				repUomArray
						.push((rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom));
				if (i == 0) {
					content1 += '><label for="rpl'
							+ (rplArray[i].pack_break_uom == null ? ''
									: (isRandomWghtArticle ? "EA" : rplArray[i].pack_break_uom))
							+ i
							+ '" class="labelText notRangedUOMText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: (isRandomWghtArticle ? "EA" :rplArray[i].pack_break_uom))
							+ '</label>';
				} else {
					content1 += '><label for="rpl'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ '</label>';
				}
				uomRadio_ticketContent += '<input id="tic_'+rplArray[i].pack_break_uom+'" type="checkbox" isis_ref_no ="'+rplArray[i].isis_ref_no+'" complex_pack_brk_uom= "'+rplArray[i].complex_pack_brk_uom+'" name="searchByOptionsPopUp" uomValue ="'+(rplArray[i].pack_break_uom == null ? '':rplArray[i].pack_break_uom)+'" data_index = "'+i+'"><label for="tic_'+rplArray[i].pack_break_uom+'" class="pos_prc_cont">'
					+(rplArray[i].pack_break_uom == null ? '':rplArray[i].pack_break_uom);
			}														
			$('#rplRadioUOM').html(
					content1);
			var $dialog = $('#dialog-copies');
			var $printAllDialog = $('#dialog-printall');
			$dialog.find('#ticketUomDiv').html(uomRadio_ticketContent);
			$printAllDialog.find('#allticketUomDiv').html(uomRadio_ticketContent);
			if (packBreakInd == 'N'
					&& rangedFlag == 'N') {
				$(
						'.notRangedUOMText')
						.text(
								articleUom);
			}

			$('.uomRadioTables')
					.html(
							tableContents);
			for ( var i = 0; i < rplArray.length; i++) {
				var rplId = 'rpl'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
								+ i;
				$('#' + rplId)
						.click(
								function() {
									clearAllErrors();
									bindReplenishmentUomClick(this.id);																				
								});
				if (i == 0) {
					$('#' + rplId).prop('checked',true);
				}
			}
		}
	} else {
		var error = '<table class="ContentTable" cellspacing="0"><tbody id="repErrorTable"></tbody></table>';
		$('.repTabDiv').html(error);
		$('#repErrorTable')
				.html(
						'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
	}
	if (rangedFlag == 'Y'){
		if(!isCPBDarticle){
		formMPLandSCContent();
		}
	}
	$('#mainTabs-2').removeClass(
			'visible-hide');
	stopLoading();


}
function bindTabClickEvents() {
	// $('#repTab').unbind('click');
	//Defect 11994 & 12277 - R18.01 Ends
	$('#repTab')
			.click(
					function() {
						clearAllErrors();
						$('#mainTabs').tabs({
							active : 0
						});

						var flg = $('#repTabF').val();
						if (flg == '0') {
							$('#mainTabs-2').addClass('visible-hide');
							$('#repTabF').val('1');
							var param = {
								"iv_site" : $('#posSite').val(),
								"iv_article" : articleNo,
								"iv_ranged" : rangedFlag,
								"iv_pbd_flag" : packBreakInd,
								"iv_complex_pbd_flag" : complexPBDFlag,
								"iv_sap" : encSapPwd,
								"iv_user_id" : $('#loginUserId').val(),
								"iv_session_id" : ""
							};
							console.log(getReplenishmentDetailsURL + ' '
									+ JSON.stringify(param));
							startLoading();
							$
									.post(getReplenishmentDetailsURL,
											JSON.stringify(param))
									.done(
											function(data) {
												if(data!=null && data.length>0){
													populateNextDeliveryInfo(data);
												}else{
													stopLoading();
												}
											});
						} else {
							$('html, body').animate(
									{
										scrollTop : ($(".tabContent:visible")
												.offset().top) + 10
									}, 1000);
						}
					});

	$('#priTab')
			.click(
					function() {
						clearAllErrors();
						$('#mainTabs').tabs({
							active : 1
						});
						var flg = $('#priTabF').val();
						$('html, body').animate(
								{
									scrollTop : ($(".tabContent:visible")
											.offset().top) + 10
								}, 1000);
						if (flg == '0') {
							$('#mainTabs-3').addClass('visible-hide');
							var param = {
								"iv_site" : $('#posSite').val(),
								"iv_article" : articleNo,
								"iv_ranged" : rangedFlag,
								"iv_pbd_flag" : packBreakInd,
								"iv_complex_pbd_flag" : complexPBDFlag,
								"iv_sap" : encSapPwd,
								"iv_user_id" : $('#loginUserId').val(),
								"iv_session_id" : ""
							};
							console.log(getPriceDetailsURL + ' '
									+ JSON.stringify(param));
							$
									.ajax({
										type : "post",
										url : getPriceDetailsURL,
										data : JSON.stringify(param),
										beforeSend : function() {
											startLoading();
										},
										success : function(response) {
											// $('#mainTabs-3').addClass('visible-show');
											$('#priTabF').val('1');
											var priceUnitArray = response;
											if (priceUnitArray != null
													&& priceUnitArray != undefined
													&& priceUnitArray.length > 0) {
												$('.price-tab-content')
														.removeClass(
																'hideBlock');
												$('#priceErrorTable').remove();

												var priceHd = '';
												var pricRad = 'Unit of Measure (UOM): ';
												priceHd += '<tr class="lastRow"><td width="20%">Sell Price Group: </td>'
														+ '<td width="20%" class="valueInfo" id="">';
												if (rangedFlag == 'N') {
													priceHd += articleSellGrp;
												} else
													priceHd += (priceUnitArray[0].sell_price_grp == null ? ''
															: priceUnitArray[0].sell_price_grp);
												priceHd += '</td>'
														+ '<td width="20%">GST Rate:</td>'
														+ '<td width="20%" class="valueInfo" id="">';
												if (rangedFlag == 'N') {
													priceHd += articleGST;
												} else
													priceHd += (priceUnitArray[0].gst_rate == null ? ''
															: priceUnitArray[0].gst_rate);
												priceHd += ' %</td>'
														+ '<td width="33%" class="lastColumn">&nbsp;</td>';

												$('#priceUnitHead').html(
														priceHd);
												var uomDtlsContent = '';
												var otherPriceContent = '';
												var addEanContent = '';
												if (rangedFlag != 'N'
														&& (packBreakInd == 'Y' || complexPBDFlag == 'Y')) {
													if (priceUnitArray.length > 0) {
														var uomList = [];
														for ( var i = 0; i < priceUnitArray.length; i++) {
															if (priceUnitArray[i].z2_ind == 'Y')
																uomList
																		.push(priceUnitArray[i].pack_break_uom);
														}
														var optionList = unique(uomList);
														var lengthMap = {};
														var count = 0;
														for ( var j = 0; j < optionList.length; j++) {
															for ( var i = 0; i < priceUnitArray.length; i++) {
																if ((priceUnitArray[i].pack_break_uom == null ? ''
																		: priceUnitArray[i].pack_break_uom) == (optionList[j])) {
																	count = count + 1;
																}
															}
															lengthMap[optionList[j]] = count;
															count = 0;
														}
														console.log(lengthMap);
														for ( var j = 0; j < optionList.length; j++) {
															// if(priceUnitArray[i].pack_break_uom
															// != null)
															// {
															pricRad += '<input type="radio" name="searchByOptionsPrice" value="'
																	+ j
																	+ '" id="unitPrc'
																	+ (optionList[j])
																	+ '-'
																	+ j
																	+ '" ';
															var count = 0;
															for ( var i = 0; i < priceUnitArray.length; i++) {
																if ((priceUnitArray[i].pack_break_uom == null ? ''
																		: priceUnitArray[i].pack_break_uom) == (optionList[j])) {

																	if (priceUnitArray[i].z2_ind == 'Y') {
																		uomDtlsContent += '<table class="ContentTable" cellspacing="0"><tbody class="priceAndUnitInfo unitPrc'
																				+ (optionList[j])
																				+ '-'
																				+ j
																				+ '">'
																				+ '<tr> <td width="20%">ISIS Ref #:</td>'
																				+ '<td colspan="5" class="lastColumn" id="isisRef">'
																				+ (priceUnitArray[i].isis_ref_no == null ? ''
																						: priceUnitArray[i].isis_ref_no)
																				+ '</td></tr>	'
																				+ '<tr> <td width="20%">Description:</td>'
																				+ '<td colspan="5" class="lastColumn" id="descrp">'
																				+ (priceUnitArray[i].isis_article_desc == null ? ''
																						: priceUnitArray[i].isis_article_desc)
																				+ '</td></tr>	<tr>'
																				+ '<td width="20%">Scan Description:</td>'
																				+ '<td colspan="5" class="lastColumn" id="scanDescrip">'
																				+ (priceUnitArray[i].scan_desc == null ? ''
																						: priceUnitArray[i].scan_desc)
																				+ '</td>'
																				+ '</tr><tr> <td width="20%">Standard CUP Price:</td>'
																				+ '<td width="20%" class="valueInfo" id="scupPrce">'
																				+ (priceUnitArray[i].standard_cup_price == null
																						|| priceUnitArray[i].standard_cup_price == undefined ? ''
																						: ('$ ' + Number(
																								priceUnitArray[i].standard_cup_price)
																								.toFixed(
																										2)))
																				+ '</td>'
																				+ '<td colspan="4" class="lastColumn"><strong></strong></td>'
																+ '</tr>';
																if(salesOrg==1060){  
																
																uomDtlsContent += '<tr><td width="20%">Standard Sell Price:</td>'
																				+ '<td width="20%" class="valueInfo" id="ssPrce">'
																				+ (priceUnitArray[i].standard_sell_price == null
																						|| priceUnitArray[i].standard_sell_price == undefined ? ''
																						: ('$ ' + Number(
																								priceUnitArray[i].standard_sell_price)
																								.toFixed(
																										2)))
																				+ '</td>'
																				+ '<td colspan="4" class="lastColumn"><strong></strong></td></tr>'
																				+'<tr ><td width="20%">RRP(recommended retail price)</td><td colspan="5" class="lastColumn">'+(priceUnitArray[0].rec_retail_price != undefined && priceUnitArray[0].rec_retail_price != null ? (priceUnitArray[0].rec_retail_price)
																						: '')																						
																						+ '</td></tr>'
																				+'<tr class="lastRow"><td width="20%">Clearance Cycle Code</td><td colspan="5" class="lastColumn">'+(priceUnitArray[0].clearance_cycle != undefined && priceUnitArray[0].clearance_cycle != null ? (priceUnitArray[0].clearance_cycle)
																						: '')																						
																						+'</td></tr>';
																} else {
																	
																	uomDtlsContent += '<tr class="lastRow"><td width="20%">Standard Sell Price:</td>'
																		+ '<td width="20%" class="valueInfo" id="ssPrce">'
																		+ (priceUnitArray[i].standard_sell_price == null
																				|| priceUnitArray[i].standard_sell_price == undefined ? ''
																				: ('$ ' + Number(
																						priceUnitArray[i].standard_sell_price)
																						.toFixed(
																								2)))
																		+ '</td>'
																		+ '<td colspan="4" class="lastColumn"><strong></strong></td></tr>'
																}
																
															uomDtlsContent += '</tbody></table>';
															

																	} else {
																		if (count == 0) {
																			addEanContent += '<table class="ContentTable" cellspacing="0"><tbody class="priceAndUnitInfo unitPrc'
																					+ (optionList[j])
																					+ '-'
																					+ j
																					+ '" >'
																					+ '<tr><th width="25%">EAN / TUN</th><th width="25%">Unit of Measure (UOM)</th><th width="25%">Base UOM</th><th width="25%" class="lastColumn">Pack Size</th></tr>';
																		}
																		count = count + 1;
																		addEanContent += '<tr class=""><td id="">'
																				+ (priceUnitArray[i].ean_tun == null ? ''
																						: priceUnitArray[i].ean_tun)
																				+ '</td> <td id="">'
																				+ (priceUnitArray[i].ean_tun_uom == null ? ''
																						: priceUnitArray[i].ean_tun_uom)
																				+ '</td><td id="">'
																				+ (priceUnitArray[i].base_uom == null ? ''
																						: priceUnitArray[i].base_uom)
																				+ '</td> <td class="lastColumn" id="">'
																				+ (priceUnitArray[i].pack_size == null
																						|| priceUnitArray[i].pack_size == undefined ? ''
																						: Number(
																								priceUnitArray[i].pack_size)
																								.toFixed(
																										2))
																				+ '</td></tr>';

																		if ((lengthMap[optionList[j]]) - 1 == (count)) {
																			addEanContent += '</tbody></table>';
																			count = 0;
																		}
																	}
																}
															}
															if (j == 0) {
																pricRad += 'checked="checked"><label for="unitPrc'
																		+ (optionList[j])
																		+ '-'
																		+ j
																		+ '" class="labelText">'
																		+ (optionList[j])
																		+ '</label>';
															} else {
																pricRad += '><label for="unitPrc'
																		+ (optionList[j])
																		+ '-'
																		+ j
																		+ '" class="labelText">'
																		+ (optionList[j])
																		+ '</label>';
															}
															// }
														}
														$('#prcUnitRadio')
																.html(pricRad);
														$('.uomDtlsInfo').html(
																uomDtlsContent);

														$('.addEanInfo').html(
																addEanContent);

														bindPriceUomClick();

														$(
																'input[name="searchByOptionsPrice"]:first')
																.trigger(
																		'click');
													}
												} else if (packBreakInd == 'N') {
													if (priceUnitArray.length > 0) {
														// for ( var i = 0; i <
														// priceUnitArray.length;
														// i++) {
														// if(priceUnitArray[i].pack_break_uom
														// != null)
														// {
														pricRad += '<input type="radio" name="searchByOptionsPrice" value="'
																+ 0
																+ '" id="unitPrc'
																+ articleUom
																+ '-'
																+ 0
																+ '" ';
														uomDtlsContent += '<table class="ContentTable" cellspacing="0"><tbody class="priceAndUnitInfo unitPrc'
																+ articleUom
																+ '-'
																+ 0
																+ '">'
																+ '<tr> <td width="20%">ISIS Ref #:</td>'
																+ '<td colspan="5" class="lastColumn" id="isisRef">'
																+ (priceUnitArray[0].isis_ref_no == null ? ''
																		: priceUnitArray[0].isis_ref_no)
																+ '</td></tr>	'
																+ '<tr> <td width="20%">Description:</td>'
																+ '<td colspan="5" class="lastColumn" id="descrp">'
																+ (priceUnitArray[0].isis_article_desc == null ? ''
																		: priceUnitArray[0].isis_article_desc)
																+ '</td></tr>	<tr>'
																+ '<td width="20%">Scan Description:</td>'
																+ '<td colspan="5" class="lastColumn" id="scanDescrip">'
																+ (priceUnitArray[0].scan_desc == null ? ''
																		: priceUnitArray[0].scan_desc)
																+ '</td>'
																+ '</tr><tr> <td width="20%">Standard CUP Price:</td>'
																+ '<td width="20%" class="valueInfo" id="scupPrce">'
																+ (priceUnitArray[0].standard_cup_price == null
																		|| priceUnitArray[0].standard_cup_price == undefined ? ''
																		: ('$ ' + Number(
																				priceUnitArray[0].standard_cup_price)
																				.toFixed(
																						2)))
																+ '</td>'
																	+ '<td colspan="4"><strong></strong></td>'
																	+ '</tr>';
														if(salesOrg==1060){  
															
															uomDtlsContent += '<tr><td width="20%">Standard Sell Price:</td>'
																			+ '<td width="20%" class="valueInfo" id="ssPrce">'
																			+ (priceUnitArray[0].standard_sell_price == null
																					|| priceUnitArray[0].standard_sell_price == undefined ? ''
																					: ('$ ' + Number(
																							priceUnitArray[0].standard_sell_price)
																							.toFixed(
																									2)))
																			+ '</td>'
																+ '<td colspan="4" class="lastColumn"><strong></strong></td>'
																			+'<tr ><td width="20%">RRP(recommended retail price)</td><td colspan="5" class="lastColumn">'+(priceUnitArray[0].rec_retail_price != undefined && priceUnitArray[0].rec_retail_price != null ? (priceUnitArray[0].rec_retail_price)
																					: '')																						
																					+'</td></tr>'
																			+'<tr class="lastRow"><td width="20%">Clearance Cycle Code</td><td colspan="5" class="lastColumn">'+(priceUnitArray[0].clearance_cycle != undefined && priceUnitArray[0].clearance_cycle != null ? (priceUnitArray[0].clearance_cycle)
																					: '')																						
																					+'</td></tr>';
															} else {
																
																uomDtlsContent += '<tr class="lastRow"><td width="20%">Standard Sell Price:</td>'
																+ '<td width="20%" class="valueInfo" id="ssPrce">'
																+ (priceUnitArray[0].standard_sell_price == null
																		|| priceUnitArray[0].standard_sell_price == undefined ? ''
																		: ('$ ' + Number(
																				priceUnitArray[0].standard_sell_price)
																				.toFixed(
																						2)))
																+ '</td>'
																	+ '<td colspan="4" class="lastColumn"><strong></strong></td></tr>'
															}
															
														uomDtlsContent += '</tbody></table>';

														addEanContent += '<table class="ContentTable" cellspacing="0"><tbody class="priceAndUnitInfo unitPrc'
																+ articleUom
																+ '" >'
																+ '<tr><th width="25%">EAN / TUN</th><th width="25%">Unit of Measure (UOM)</th><th width="25%">Base UOM</th><th width="25%" class="lastColumn">Pack Size</th></tr><tbody>';
														for ( var i = 0; i < priceUnitArray.length; i++) {
															addEanContent += '<tr class=""><td id="">'
																	+ (priceUnitArray[i].ean_tun == null ? ''
																			: priceUnitArray[i].ean_tun)
																	+ '</td> <td id="">'
																	+ (priceUnitArray[i].ean_tun_uom == null ? ''
																			: priceUnitArray[i].ean_tun_uom)
																	+ '</td><td id="">'
																	+ (priceUnitArray[i].base_uom == null ? ''
																			: priceUnitArray[i].base_uom)
																	+ '</td> <td class="lastColumn" id="">'
																	+ (priceUnitArray[i].pack_size == null
																			|| priceUnitArray[i].pack_size == undefined ? ''
																			: Number(
																					priceUnitArray[i].pack_size)
																					.toFixed(
																							2))
																	+ '</td></tr>';
														}
														addEanContent += '</tbody></table>';

														pricRad += 'checked="checked"><label for="unitPrc'
																+ articleUom
																+ '" class="labelText">'
																+ articleUom
																+ '</label>';
														// }
														// }
														$('#prcUnitRadio')
																.html(pricRad);
														$('.uomDtlsInfo').html(
																uomDtlsContent);

														$('.addEanInfo').html(
																addEanContent);

													}

												} else if (packBreakInd == 'Y') {

													if (priceUnitArray.length > 0) {
														for ( var i = 0; i < priceUnitArray.length; i++) {
															// if(priceUnitArray[i].pack_break_uom
															// != null)
															// {
															pricRad += '<input type="radio" name="searchByOptionsPrice" value="'
																	+ i
																	+ '" id="unitPrc'
																	+ (priceUnitArray[i].pack_break_uom == null ? ''
																			: priceUnitArray[i].pack_break_uom)
																	+ '-'
																	+ i
																	+ '" ';
															uomDtlsContent += '<table class="ContentTable" cellspacing="0"><tbody class="priceAndUnitInfo unitPrc'
																	+ (priceUnitArray[i].pack_break_uom == null ? ''
																			: priceUnitArray[i].pack_break_uom)
																	+ '-'
																	+ i
																	+ '">'
																	+ '<tr> <td width="20%">ISIS Ref #:</td>'
																	+ '<td colspan="5" class="lastColumn" id="isisRef">'
																	+ (priceUnitArray[i].isis_ref_no == null ? ''
																			: priceUnitArray[i].isis_ref_no)
																	+ '</td></tr>	'
																	+ '<tr> <td width="20%">Description:</td>'
																	+ '<td colspan="5" class="lastColumn" id="descrp">'
																	+ (priceUnitArray[i].isis_article_desc == null ? ''
																			: priceUnitArray[i].isis_article_desc)
																	+ '</td></tr>	<tr>'
																	+ '<td width="20%">Scan Description:</td>'
																	+ '<td colspan="5" class="lastColumn" id="scanDescrip">'
																	+ (priceUnitArray[i].scan_desc == null ? ''
																			: priceUnitArray[i].scan_desc)
																	+ '</td>'
																	+ '</tr><tr> <td width="20%">Standard CUP Price:</td>'
																	+ '<td width="20%" class="valueInfo" id="scupPrce">'
																	+ (priceUnitArray[i].standard_cup_price == null
																			|| priceUnitArray[i].standard_cup_price == undefined ? ''
																			: ('$ ' + Number(
																					priceUnitArray[i].standard_cup_price)
																					.toFixed(
																							2)))
																	+ '</td>'
																	+ '<td colspan="4" class="lastColumn"><strong></strong></td>'
																	+ '</tr>';
															if(salesOrg==1060){  
																		
																		uomDtlsContent += '<tr><td width="20%">Standard Sell Price:</td>'
																						+ '<td width="20%" class="valueInfo" id="ssPrce">'
																						+ (priceUnitArray[0].standard_sell_price == null
																								|| priceUnitArray[0].standard_sell_price == undefined ? ''
																								: ('$ ' + Number(
																										priceUnitArray[0].standard_sell_price)
																										.toFixed(
																												2)))
																						+ '</td>'
																						+ '<td colspan="4" class="lastColumn"><strong></strong></td></tr>'
																						+'<tr><td width="20%">RRP(recommended retail price)</td><td colspan="5" class="lastColumn">'+(priceUnitArray[0].rec_retail_price != undefined && priceUnitArray[0].rec_retail_price != null ? (priceUnitArray[0].rec_retail_price)
																								: '')																						
																								+'</td></tr>'
																						+'<tr class="lastRow"><td width="20%">Clearance Cycle Code</td><td colspan="5" class="lastColumn">'+(priceUnitArray[0].clearance_cycle != undefined && priceUnitArray[0].clearance_cycle != null ? (priceUnitArray[0].clearance_cycle)
																								: '')																						
																								+'</td></tr>';
																		} else {
																			
																			uomDtlsContent += '<tr class="lastRow"><td width="20%">Standard Sell Price:</td>'
																	+ '<td width="20%" class="valueInfo" id="ssPrce">'
																	+ (priceUnitArray[i].standard_sell_price == null
																			|| priceUnitArray[i].standard_sell_price == undefined ? ''
																			: ('$ ' + Number(
																					priceUnitArray[i].standard_sell_price)
																					.toFixed(
																							2)))
																	+ '</td>'
																	+ '<td colspan="4" class="lastColumn"><strong></strong></td>'
																		}
																		
																	uomDtlsContent += '</tbody></table>';

															addEanContent += '<table class="ContentTable" cellspacing="0"><tbody class="priceAndUnitInfo unitPrc'
																	+ (priceUnitArray[i].pack_break_uom == null ? ''
																			: priceUnitArray[i].pack_break_uom)
																	+ '-'
																	+ i
																	+ '" >'
																	+ '<tr><th width="25%">EAN / TUN</th><th width="25%">Unit of Measure (UOM)</th><th width="25%">Base UOM</th><th width="25%" class="lastColumn">Pack Size</th></tr>'
																	+ '<tr class="lastRow"><td id="">'
																	+ (priceUnitArray[i].ean_tun == null ? ''
																			: priceUnitArray[i].ean_tun)
																	+ '</td> <td id="">'
																	+ (priceUnitArray[i].ean_tun_uom == null ? ''
																			: priceUnitArray[i].ean_tun_uom)
																	+ '</td><td id="">'
																	+ (priceUnitArray[i].base_uom == null ? ''
																			: priceUnitArray[i].base_uom)
																	+ '</td> <td class="lastColumn" id="">'
																	+ (priceUnitArray[i].pack_size == null
																			|| priceUnitArray[i].pack_size == undefined ? ''
																			: Number(
																					priceUnitArray[i].pack_size)
																					.toFixed(
																							2))
																	+ '</td></tr></tbody></table>';
															if (i == 0) {
																pricRad += 'checked="checked"><label for="unitPrc'
																		+ (priceUnitArray[i].pack_break_uom == null ? ''
																				: priceUnitArray[i].pack_break_uom)
																		+ '-'
																		+ i
																		+ '" class="labelText">'
																		+ (priceUnitArray[i].pack_break_uom == null ? ''
																				: priceUnitArray[i].pack_break_uom)
																		+ '</label>';
															} else {
																pricRad += '><label for="unitPrc'
																		+ (priceUnitArray[i].pack_break_uom == null ? ''
																				: priceUnitArray[i].pack_break_uom)
																		+ '-'
																		+ i
																		+ '" class="labelText">'
																		+ (priceUnitArray[i].pack_break_uom == null ? ''
																				: priceUnitArray[i].pack_break_uom)
																		+ '</label>';
															}
															// }
														}
														$('#prcUnitRadio')
																.html(pricRad);
														$('.uomDtlsInfo').html(
																uomDtlsContent);

														$('.addEanInfo').html(
																addEanContent);

														bindPriceUomClick();

														$(
																'input[name="searchByOptionsPrice"]:first')
																.trigger(
																		'click');
													}

												}
												$(
												'.linked-item-info-tbl')
												.addClass(
														'hideBlock');
												$(
												'#prciceParentChild')
												.parent()
												.addClass(
														'hideBlock');
												// ajax for Linked Items
												if (articleDtlInfo != null
														&& articleDtlInfo != ''
														&& articleDtlInfo != undefined
														&& articleDtlInfo.linked_article_flag != null
														&& articleDtlInfo.linked_article_flag != ''
														&& articleDtlInfo.linked_article_flag == 'Y') {

													var param = {
														"iv_site" : $(
																'#posSite')
																.val(),
														"iv_article" : articleNo,
														"iv_ranged" : rangedFlag,
														"iv_pbd_flag" : packBreakInd,
														"iv_sap" : encSapPwd,
														"iv_user_id" : $(
																'#loginUserId')
																.val(),
														"iv_session_id" : ""
													};

													$
															.ajax({
																type : "post",
																url : getLinkedItemsURL,
																data : JSON
																		.stringify(param),
																beforeSend : function() {
																	startLoading();
																},
																success : function(
																		response) {
																	linkedItemsArray = response;
																	if (linkedItemsArray != null
																			&& linkedItemsArray != undefined
																			&& linkedItemsArray.length > 0) {
																		var oprChld = '';
																		for ( var i = 0; i < linkedItemsArray.length; i++) {
																			oprChld += '<tr><td width="20%">Parent Article :</td><td colspan="5" class="lastColumn" id="" >'
																					+ (linkedItemsArray[i].parent_article == null ? ''
																							: linkedItemsArray[i].parent_article)
																					+ '</td></tr>';
																			oprChld += '<tr><td width="20%">Child Article :</td>'
																					+ '<td width="13%" class="valueInfo" id="">'
																					+ (linkedItemsArray[i].child_article == null ? ''
																							: linkedItemsArray[i].child_article)
																					+ '</td>'
																					+ '<td width="20%">Order Multiple (OM):</td>'
																					+ '<td width="13%" class="valueInfo" id="">'
																					+ (linkedItemsArray[i].child_article_om == null ? ''
																							: linkedItemsArray[i].child_article_om)
																					+ '</td>'
																					+ '<td width="20%">Linkage Factor:</td>'
																					+ '<td width="13%" class="lastColumn valueInfo" id="">'
																					+ (linkedItemsArray[i].linkage_factor == null ? ''
																							: linkedItemsArray[i].linkage_factor)
																					+ '</td>'
																					+ '</tr>';
																		}
																		$(
																				'#prciceParentChild')
																				.html(
																						oprChld);
																		$(
																				'.linked-item-info-tbl')
																				.removeClass(
																						'hideBlock');
																		$(
																				'#prciceParentChild')
																				.parent()
																				.removeClass(
																						'hideBlock');

																	}
																	stopLoading();
																}
															});
												} else {
													$('.linked-item-info-tbl')
															.addClass(
																	'hideBlock');
													$('#prciceParentChild')
															.parent()
															.addClass(
																	'hideBlock');
												}
												var param = {
													"iv_site" : $('#posSite')
															.val(),
													"iv_article" : articleNo,
													"iv_ranged" : rangedFlag,
													"iv_sales_org" : $(
															'#salesOrg').val(),
													"iv_session_id" : ""
												};

												$
														.ajax({
															type : "post",
															url : getOtherPriceURL,
															data : JSON
																	.stringify(param),
															beforeSend : function() {
																startLoading();
															},
															success : function(
																	response) {
																var otherPriceArray = response;
																$('.otherPriceInfo').addClass('hideBlock');
																$('.other-price-info-tbl').addClass('hideBlock');
																if (otherPriceArray != null
																		&& otherPriceArray != undefined
																		&& otherPriceArray.length > 0) {
																	var content = '';
																	otherPriceContent += '<table class="ContentTable" cellspacing="0"><tbody class="'
																			+ '"><tr class="lastRow">';
																	for ( var i = 0; i < otherPriceArray.length; i++) {
																		if (i == 2) {
																			content += '<td width="20%" class="noDivider">'
																					+ (otherPriceArray[i].price_type_desc == null ? ''
																							: otherPriceArray[i].price_type_desc)
																					+ '('
																					+ (otherPriceArray[i].price_type == null ? ''
																							: otherPriceArray[i].price_type)
																					+ '):</td><td width="13%" class="lastColumn ">$ '
																					+ (otherPriceArray[i].sell_price == null ? ''
																							: Number(
																									otherPriceArray[i].sell_price)
																									.toFixed(
																											2))
																					+ '</td>';
																		} else {
																			content += '<td width="20%">'
																					+ (otherPriceArray[i].price_type_desc == null ? ''
																							: otherPriceArray[i].price_type_desc)
																					+ '('
																					+ (otherPriceArray[i].price_type == null ? ''
																							: otherPriceArray[i].price_type)
																					+ '):</td>'
																					+ '<td width="13%" class="valueInfo" id="mhdPRC">$ '
																					+ (otherPriceArray[i].sell_price == null ? ''
																							: Number(
																									otherPriceArray[i].sell_price)
																									.toFixed(
																											2))
																					+ '</td>';
																		}
																		if (i == 1
																				&& i == otherPriceArray.length - 1) {
																			content += '<td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td>';
																		}
																	}
																	var newContent = otherPriceContent
																			+ content
																			+ '</tr></tbody></table>';
																	$(
																			'.other-price-info-tbl')
																			.removeClass(
																					'hideBlock');
																	$('.otherPriceInfo').removeClass('hideBlock');
																	$(
																			'.otherPriceInfo')
																			.html(
																					newContent);
																}
																stopLoading();
															}
														});

											} else {
												var error = '<table class="ContentTable" cellspacing="0"><tbody id="priceErrorTable"></tbody></table>';
												$('#priceErrorTable').remove();
												$('.priceTabDiv').append(error);
												$('.price-tab-content')
														.addClass('hideBlock');
												$('.other-price-info-tbl')
														.addClass('hideBlock');
												$('.otherPriceInfo').html('');

												$('#prciceParentChild')
														.html('');
												$('.linked-item-info-tbl')
														.addClass('hideBlock');

												$('#priceErrorTable')
														.html(
																'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
											}
											$('#mainTabs-3').removeClass(
													'visible-hide');
											stopLoading();

										},
										error : function(response) {
											$('#mainTabs-3').removeClass(
													'visible-hide');
										}
									});

						}
					});

	$('#offerTab').click(function() {
		clearAllErrors();
		$('#mainTabs-7').addClass('visible-hide');
		$('#mainTabs').tabs({
			active : 2
		});
		$('#curActTab').trigger('click');
		$('#mainTabs-7').removeClass('visible-hide');
	});

	$('#curActTab').click(
			function() {
				clearAllErrors();
				var flag = $('#curActTabF').val();
				$('#promo').tabs({
					active : 0
				});
				$('html, body').animate({
					scrollTop : ($(".tabContent:visible").offset().top) + 10
				}, 1000);
				if ($('#curPromContent').html() != '' && flag == '0') {
					$('#curActTabF').val('1');
					getPromoDetails(
					/* formatDateToMDY(getDesiredPastDate(0)) */'',
					/* formatDateToMDY(getDesiredPastDate(0)) */'', "Y",
							'current', 'C');

				}
			});

	$('#futActTab').click(
			function() {
				clearAllErrors();
				$('#promo').tabs({
					active : 2
				});
				var flag = $('#futActTabF').val();
				$('html, body').animate({
					scrollTop : ($(".tabContent:visible").offset().top) + 10
				}, 1000);
				if ($('#futurePromTable').html() != '' && flag == 0) {
					$('#futActTabF').val('1');
					getPromoDetails(
					/* formatDateToMDY(getDesiredFutureDate(1)) */'',
					/* formatDateToMDY(getDesiredFutureDate(8)) */'', "Y",
							'future', 'F');
				}
			});

	$('#pastActTab').click(function() {
		clearAllErrors();
		var flag = $('#pastActTabF').val();
		$('#promo').tabs({
			active : 1
		});
		$('html, body').animate({
			scrollTop : ($(".tabContent:visible").offset().top) + 10
		}, 1000);
		if ($('#pasPromContent').html() != '' && flag == '0') {
			$('#pastActTabF').val('1');
			getPromoDetails(
			/* formatDateToMDY(getDesiredPastDate(8)) */'',
			/* formatDateToMDY(getDesiredPastDate(1)) */'', "Y", 'past', 'P');

		}
	});

	$('#ltoTab')
			.click(
					function() {
						clearAllErrors();
						var flg = $('#ltoTabF').val();
						$('html, body').animate(
								{
									scrollTop : ($(".tabContent:visible")
											.offset().top) + 10
								}, 1000);
						if (flg == '0') {
							$('#ltoTabF').val('1');
							var param = {
								"iv_sales_org" : salesOrg,
								"iv_site_no" : $('#posSite').val(),
								"iv_article_no" : articleNo,
								"iv_ranged" : rangedFlag,
								"iv_article_barcode" : '',
								"iv_barcode_flag" : "N",
								"iv_lto_id" : '',
								"iv_audit_flag" : '',
								"iv_complex_pbd_flag" : complexPBDFlag,
								"iv_session_id" : "",
								"iv_session_mntnc_flg": "",
								"iv_userid": "",
								"iv_platform": "B",
								"iv_dept_id": "",
								"iv_second_audit": ""
							};
							console.log("LTO--" + getLTODetailsURL + "---"
									+ JSON.stringify(param));
							$
									.ajax({
										type : "post",
										url : getLTODetailsURL,
										data : JSON.stringify(param),
										beforeSend : function() {
											startLoading();

										},
										success : function(response) {
											var ltoArray = response;
											if (ltoArray != null
													&& ltoArray != undefined
													&& ltoArray.length > 0
													&& ltoArray[0].fixture_type != undefined
													&& ltoArray[0].lto_status == 'IN_USE') {
												ltoArray = reframeLTOResponse(ltoArray);
												var content = '<tr><th width="">Type</th>';
													if(salesOrgVal == '1015'){
														content+='<th class="centerValue">Category</th>';
													}else if (salesOrgVal == '1010' ){
														content+='<th class="centerValue">Sub-Category</th>';
													}else if (salesOrgVal == '1060' ){
														content+='<th class="centerValue">Department</th>';
													}else{
														content+='<th class="centerValue">Aisle</th>';
													}
												content+='<th class="centerValue">Location</th><th class="centerValue">Qty.</th><th width="">Notes</th><th class="centerValue lastColumn">Active</th></tr>';
												var tempArr = []
												for ( var i = 0; i < ltoArray.length; i++) {
													
													if (ltoArray[i].lto_status == 'IN_USE') {
														content += '<tr class=""><td id="">'
																+ (ltoArray[i].location_name || '')
																+ '</td>'
																+ '<td class="centerValue" id="">';
																if(salesOrgVal == '1010' || salesOrgVal == '1015' || salesOrgVal == '1060'){
																	content += (showSplitedCategory(ltoArray[i].category_name));
																}else{
																	content += (ltoArray[i].aisle_name || '');
																}
														content+= '</td>'
																+ '<td class="centerValue" id="">'
																+ (ltoArray[i].lto_id || '')
																+ '</td>'
																+ '<td class="centerValue" id="">'
																+ (ltoArray[i].lto_qty_final || '')
																+ '</td>'
																+ '<td id="ltonotes">'
																+ (ltoArray[i].lto_notes || '')
																+ '</td>';
														// + ('Extra' || '') +
														// '</td>';
														if (ltoArray[i].lto_status == 'IN_USE') {
															content += '<td class="lastColumn centerValue" id=""><label class="positiveFlag">&nbsp;</label></td>';
														} /*
															 * else { content += '<td class="lastColumn centerValue" id=""><label
															 * class="negativeFlag">&nbsp;</label></td>'; }
															 */
														content += '</tr>';
													}
												}
												$('#ltoTabData').html(content);
												$('#mainTabs-5 .moreNumber').tooltip({
													tooltipClass : 'tmptooltipClass'
												});
											} else {
												var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
												$('#ltoTabData').html(error);
											}
											stopLoading();
										},
										error : function() {
											// showError('Sorry, Some technical
											// issue occured.');
											stopLoading();
										},
									});
						}
					});

	$('#expTab')
			.click(
					function() {
						clearAllErrors();
						var flg = $('#expTabF').val();
						if (!($('#dialog-editFunctions').dialog('isOpen'))) {
							$('html, body').animate(
									{
										scrollTop : ($(".tabContent:visible")
												.offset().top) + 10
									}, 1000);
						}
						if (flg == '0' || $('#outOfCodeData').html() == '') {
							$('#expTabF').val('1');
							var param = {
								"iv_site" : $('#posSite').val(),
								"iv_article" : articleNo,
								"iv_gtin_flag" : '',
								"iv_barcode" : '',
								"iv_barcode_flag" : '',
								"iv_sales_org" : salesOrg,
								"iv_user" : loggedInUser,
								"iv_platform" : 'B',
								"iv_complex_pbd_flag" : complexPBDFlag,
								"iv_ranged" : rangedFlag,
								"iv_pbd_flag" : packBreakInd,
								"iv_session_id" : ""
							};
							console.log(getOutOfCodeURL+' '+JSON.stringify(param));
							$
									.ajax({
										type : "post",
										url : getOutOfCodeURL,
										data : JSON.stringify(param),
										beforeSend : function() {
											startLoading();
										},
										success : function(response) {
											var outOfCdAry = response;
											if (outOfCdAry != null
													&& outOfCdAry != undefined
													&& outOfCdAry.length > 0
													&& outOfCdAry[0].article_no != undefined) {
												// var
												// expireTabRadioContent='&nbsp;
												// Unit of Measure(UOM): ';
												var count = 0;
												var pageNo = 1;
												/*
												 * var uomArrayOriginal= []; var
												 * list = outOfCdAry; for(var
												 * k=0;k<list.length;k++) {
												 * uomArrayOriginal.push(list[k].scan_uom ||
												 * ''); }
												 * 
												 * var uomArray =
												 * getUniqueList(uomArrayOriginal);
												 * for(var k=0;k<uomArray.length;k++) {
												 * if(k ==0 )
												 * expireTabRadioContent += '<input
												 * type="radio"
												 * checked="checked"
												 * id="expireTabResults-'+(uomArray[k])+'"
												 * value="'+(uomArray[k])+'"'
												 * +'name="searchByOptionsExp"><label
												 * class="labelText"
												 * for="'+(uomArray[k])+'">'+(uomArray[k])+'</label>';
												 * else expireTabRadioContent += '<input
												 * type="radio"
												 * id="expireTabResults-'+(uomArray[k])+'"
												 * value="'+(uomArray[k])+'"'
												 * +'name="searchByOptionsExp"><label
												 * class="labelText"
												 * for="'+(uomArray[k])+'">'+(uomArray[k])+'</label>'; }
												 * expireTabRadioContent += '';
												 */

												var content = '<tr>'
														+ '<!--<th class="centerValue">Aisle</th>-->'
														+ '<th class="centerValue">Expiry Date</th>'
														+ '<th class="centerValue lastColumn">UOM</th>'
														+ '</tr>';
												var isEmpty = true;
												for ( var i = 0; (i < outOfCdAry.length && i < 5); i++) {
													if (outOfCdAry[i].use_by_date != null
															&& outOfCdAry[i].use_by_date != ''
															&& outOfCdAry[i].use_by_date != undefined) {
														isEmpty = false;
														content += '<tr class=" pageNo-'
																+ pageNo;
														if (count >= 9)
															content += ' hideBlock ';
														content += ' expireTabResults-'
																+ (outOfCdAry[i].scan_uom || '')
																+ '">'
																+ '<!--<td class="centerValue" id="">'
																+ (outOfCdAry[i].article_aisle || '')
																+ '</td>-->'
																+ '<td class="centerValue" id="">'
																+ (outOfCdAry[i].use_by_date != null
																		&& outOfCdAry[i].use_by_date != ''
																		&& outOfCdAry[i].use_by_date != undefined ? formatDateMobi(outOfCdAry[i].use_by_date)
																		: '')
																+ '</td>'
																+ '<td class="lastColumn centerValue" id="">'
																+ (outOfCdAry[i].scan_uom || '')
																+ '</td>'
																+ '</tr>';
														count++;
														if (count % 9 == 0) {
															pageNo++;
														}
													}
													// $('#expDateRadioUOM').html(expireTabRadioContent);
													$('#outOfCodeData').html(
															content);
													// bindExpireTabRadioClickEvents();
													// $('input[name="searchByOptionsExp"][type="radio"]:first').trigger('click');

													$(
															'.expireTabResultsPagination')
															.pagination(
																	{
																		items : count,
																		itemsOnPage : 9,
																		cssStyle : 'compact-theme',
																		currentPage : currentPageInExpire,
																		onPageClick : function(
																				pageNumber) {
																			showExpireTabResults(pageNumber);

																		}

																	});
													if (count > 9) {
														$(
																'.expireTabResultsPagination')
																.removeClass(
																		'hideBlock');
													} else {
														$(
																'.expireTabResultsPagination')
																.addClass(
																		'hideBlock');
													}
												}
												if (isEmpty) {
													var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
													$('#expDateRadioUOM')
															.addClass(
																	'hideBlock');
													$('#outOfCodeData').html(
															error);
												}
											} else {
												var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
												$('#expDateRadioUOM').addClass(
														'hideBlock');
												$('#outOfCodeData').html(error);
											}
											stopLoading();
										},
										error : function() {
											// showError('Sorry, Some technical
											// issue occured.');
											stopLoading();
										},
									});
						}
					});

	$('#posTab')
			.click(
					function() {
						clearAllErrors();
						$('#mainTabs').tabs({
							active : 5
						});
						var flg = $('#posTabF').val();
						$('html, body').animate(
								{
									scrollTop : ($(".tabContent:visible")
											.offset().top) + 10
								}, 1000);
						if (flg == '0') {
							$('#posTabF').val('1');
							$('#mainTabs-8').addClass('visible-hide');
							var param = {
								"iv_site" : $('#posSite').val(),
								"iv_article" : articleNo,
								"iv_ranged" : rangedFlag,
								"iv_sap" : encSapPwd,
								"iv_user_id" : $('#loginUserId').val(),
								"iv_session_id" : ""
							};
							console.log(getPOSDetailsURL + ' '
									+ JSON.stringify(param));
							$
									.ajax({
										type : "post",
										url : getPOSDetailsURL,
										data : JSON.stringify(param),
										beforeSend : function() {
											startLoading();
										},
										success : function(response) {
											var posArray = response;
											if (posArray != null
													&& posArray != undefined
													&& posArray.length > 0) {

												var content = '';
												content += '<tr><td ><label class="';
												if (posArray[0].prohibit_discount == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '" id="">Prohibit Discount</label></td><td colspan="3" class="lastColumn" ><label class="';
												if (posArray[0].prohibit_prc_override == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '" id="">Prohibit Price Override</label></td></tr>';
												content += '<tr><td ><label class="';
												if (posArray[0].inhibit_qty_repeat == "Y")
													content += 'positiveFlag" id="">Inhibit QTY Repeat</label>';
												else
													content += 'negativeFlag" id="">Don\'t Inhibit QTY Repeat</label>';
												content += '</td><td colspan="3" class="lastColumn" ><label class="';
												if (posArray[0].force_qty == "Y")
													content += 'positiveFlag" id="">Force QTY</label>';
												else
													content += 'negativeFlag" id="">Don\'t Force QTY</label>';
												content += '</td></tr>';
												content += '<tr><td ><label class="';
												if (posArray[0].manual_price == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '" id="">Manual Price</label></td><td colspan="3" class="lastColumn" ><label class="';
												if (posArray[0].default_price == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '" id="">Default Price</label></td></tr>';
												content += '<tr><td width="25%" ><label class="';
												if (posArray[0].pos_weighted == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '" id="">POS Weighed</label></td><td width="25%" ><label class="';
												if (posArray[0].sales_prohibit == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '" id="">Sale Prohibited</label></td><td width="25%"><label class="';
												if (posArray[0].proof_of_age == "Y")
													content += 'positiveFlag"  id="">Proof of Age Required</label>';
												else
													content += 'negativeFlag"  id="">Proof of Age Not Required</label>';
												content += '</td><td width="25%" class="lastColumn" ><!--<label class="';
												if (posArray[0].food_stamp == "Y")
													content += 'positiveFlag" id="">Food Stamp</label>';
												else
													content += 'negativeFlag" id="">No Food Stamp</label>';
												content += '--></td></tr>';
												content += '<tr><td ><label class="';
												if (posArray[0].sales_set == "Y")
													content += 'positiveFlag" id="">Sales Set Flag </label>';
												else
													content += 'negativeFlag" id="">No Sales Set Flag</label>';
												content += '</td>';//'<td>';//'<label class="';
												//if (posArray[0].kit_flag == "Y")
												//	content += 'positiveFlag" id="">Kit Flag</label>';
												//else
												//	content += 'negativeFlag" id="">No Kit Flag</label>';
												content += '<td colspan="3" class="lastColumn"><label id="security_flag" class="';
												if (posArray[0].security_tag == "Y")
													content += 'positiveFlag';
												else
													content += 'negativeFlag';
												content += '"  id="">Security Tag</label></td></tr>';
												content += '<tr class="lastRow"><td colspan="4" class="lastColumn" >POS Tare Weight (G): <strong id="">'
														+ (posArray[0].pos_tare_weight != null
																&& posArray[0].pos_tare_weight != undefined ? posArray[0].pos_tare_weight
																: '')
														+ '</strong></td></tr>';
												$('#posDetailsContent').html(
														content);
											} else {
												var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
												$('#posDetailsContent').html(
														error);

											}
											$('#mainTabs-8').removeClass(
													'visible-hide');
											stopLoading();
										},
										error : function() {
											// showError('Sorry, Some technical
											// issue occured.');
											$('#mainTabs-8').removeClass(
													'visible-hide');
											stopLoading();
										},
									});
						}
					});

	$('#detTab')
			.click(
					function() {
						clearAllErrors();
						$('#mainTabs').tabs({
							active : 6
						});
						$('.additionalTab:visible:first').trigger('click');
						$('html, body').animate(
								{
									scrollTop : ($(".tabContent:visible")
											.offset().top) + 10
								}, 1000);
						var flg = $('#detTabF').val();
						if (flg == '0') {
							$('#mainTabs-4').addClass('visible-hide');
							$('#detTabF').val('1');
							var param = {
								"iv_site" : $('#posSite').val(),
								"iv_article" : articleNo,
								"iv_ranged" : rangedFlag,
								"iv_sap" : encSapPwd,
								"iv_user_id" : $('#loginUserId').val(),
								"iv_session_id" : ""
							};
							console.log(getAdditionalDetailsURL + ' '
									+ JSON.stringify(param));
							$
									.ajax({
										type : "post",
										url : getAdditionalDetailsURL,
										data : JSON.stringify(param),
										beforeSend : function() {
											startLoading();
										},
										success : function(response) {
											additionalDetails = response;

											if (additionalDetails != null
													&& additionalDetails != undefined
													&& additionalDetails.length > 0) {

												formPrintContent(additionalDetails[0]);
												formFreshTableContent(additionalDetails[0]);
												formNutritionTableContent(additionalDetails[0]);
												formNutritionValueContent(additionalDetails[0]);
												formCustomerNotesContent(additionalDetails[0]);
												formTastingNotesContent(additionalDetails[0]);
												//ProductColorDetails(additionalDetails[0]);
												//ProductSizeDetails(additionalDetails[0]);
												bindPrintEvent(additionalDetails[0]);
												// giftCardDetails(additionalDetails[0]);
												if (additionalDetails[0].fresh_food_item_flag != undefined
														&& additionalDetails[0].fresh_food_item_flag != null
														&& additionalDetails[0].fresh_food_item_flag != 'Y') {
													$('#freTab, #itemInfo-1')
															.removeClass(
																	'hideBlock')
															.addClass(
																	'hideBlock');
													$('#itemInfo').tabs({
														active : 1
													});
													$('.printAndEmailDiv')
															.removeClass(
																	'hideBlock');
												} else {
													$('#freTab, #itemInfo-1')
															.addClass(
																	'hideBlock')
															.removeClass(
																	'hideBlock');
													$('#itemInfo').tabs({
														active : 0
													});
												}

											} else {
												hidePrintAndEmail();
												var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
												showErrorInAdditionalDetailsTab(error);
											}
											$('#mainTabs-4').removeClass(
													'visible-hide');
											if(isBigw  == 'true'){
											$('#emailBtn').removeClass("hideBlock").addClass("hideBlock");
											$('#printNutriInfo').removeClass("hideBlock").addClass("hideBlock");											
											$('#nriTab').removeClass("hideBlock").addClass("hideBlock");
											$('#cusTab').removeClass("hideBlock").addClass("hideBlock");
											$('#tstTab').removeClass("hideBlock").addClass("hideBlock");
											$('#itemInfo').tabs({
												active : 4
											});
											$('#gftTab').trigger('click');
											}
											
											stopLoading();
										},
										error : function() {
											// showError('Sorry, Some technical
											// issue occured.');
											$('#mainTabs-4').removeClass(
													'visible-hide');
											stopLoading();
										},
									});
						}
					});

	$('#vendorTab')
			.click(
					function() {
						clearAllErrors();
						$('#mainTabs').tabs({
							active : 7
						});
						var flg = $('#vendorTabF').val();
						$('html, body').animate(
								{
									scrollTop : ($(".tabContent:visible")
											.offset().top) + 10
								}, 1000);

						if (flg == '0') {
							$('#mainTabs-9').addClass('visible-hide');
							$('#vendorTabF').val('1');

							var param = {
								"iv_site" : $('#posSite').val(),
								"iv_article" : articleNo,
								"iv_ranged" : rangedFlag,
								"iv_session_id" : ""
							};
							console.log(getVendorDetailsURL + ' '
									+ JSON.stringify(param));
							$
									.ajax({
										type : "post",
										url : getVendorDetailsURL,
										data : JSON.stringify(param),
										beforeSend : function() {
											startLoading();
										},
										success : function(response) {

											var supplierDtlArray = response;
											if (supplierDtlArray != null
													&& supplierDtlArray != undefined
													&& supplierDtlArray.length > 0
													&& supplierDtlArray[0].ErrorId == undefined) {
												var content = '';
												content += '<tr class=""><td width="20%">Supplier #:</td><td class="lastColumn" colspan="5" id="">'
														+ (supplierDtlArray[0].vendor_no != null ? supplierDtlArray[0].vendor_no
																: '')
														+ '</td></tr><tr class=""><td>Name:</td><td class="lastColumn" colspan="5" id="">'
														+ (supplierDtlArray[0].vendor_name != null ? supplierDtlArray[0].vendor_name
																: '')
														+ '</td></tr><tr class=""><td>Address:</td><td class="lastColumn" colspan="5" id="">'
														+ (supplierDtlArray[0].door_no != null ? (supplierDtlArray[0].door_no + ' ')
																: '')
														+ (supplierDtlArray[0].street != null ? (supplierDtlArray[0].street + ', ')
																: '')
														+ (supplierDtlArray[0].city != null ? (supplierDtlArray[0].city + ', ')
																: '')
														+ (supplierDtlArray[0].district != null ? (supplierDtlArray[0].district + ' - ')
																: '')
														+ (supplierDtlArray[0].po_box != null ? (supplierDtlArray[0].po_box)
																: '')
														+ '</td></tr><tr class="lastRow"><td>Contact:</td><td class="lastColumn" colspan="5" id="" >'
														+ (supplierDtlArray[0].telephone != null ? supplierDtlArray[0].telephone
																: '')
														+ '</td></tr>';
												$('#vendorInfoTable').html(
														content);
												// var content =
												// '<tr><th>Article
												// </th><th>Description</th><th
												// class="centerValue">UOM</th><th
												// class="centerValue">Order
												// Multiple (OM)</th><th
												// class="centerValue">Minimum
												// Order Qty.</th> <th
												// class="lastColumn
												// centerValue">Minimum Order
												// Value ($)</th> </tr>';
												var content = '';
												/*
												 * content += '<tr class=""><td>' +
												 * articleNo + '</td><td>' +
												 * articleDesc + '</td><td class="centerValue">' +
												 * articleUom + '</td>
												 * <td class="centerValue">' +
												 * (supplierDtlArray[0].om !=
												 * null ? supplierDtlArray[0].om :
												 * '') + '</td>
												 * <td class="centerValue">' +
												 * (supplierDtlArray[0].min_order_qty !=
												 * null ? Number(
												 * supplierDtlArray[0].min_order_qty)
												 * .toFixed(2) : '') + '</td>
												 * <td class="lastColumn centerValue">' +
												 * (supplierDtlArray[0].min_order_value !=
												 * null ?
												 * supplierDtlArray[0].min_order_value :
												 * '') + '</td></tr>';
												 */
												content += '<tr class="">'
														+ '<!--<td width="20%">Order Multiple:</td>'
														+ '<td class="" colspan="5">'
														+ (supplierDtlArray[0].om != null ? Number(
																supplierDtlArray[0].om)
																.toFixed(0)
																: '')
														+ '</td>-->'
														+ '<td>Minimum Order Qty:</td>'
														+ '<td class="" colspan="5">'
														+ (supplierDtlArray[0].min_order_qty != null ? Number(
																supplierDtlArray[0].min_order_qty)
																.toFixed(2)
																: '')
														+ '</td>'
														+ '<td>Minimum Order Value:</td>'
														+ '<td class="lastColumn" colspan="5">'
														+ (supplierDtlArray[0].min_order_value != null ? supplierDtlArray[0].min_order_value
																: '')
														+ '</td></tr>';
												$('#suplierUOM').html(content);
												$('.vendorTabDiv')
														.find(
																'.ContentTable,.tableInfo')
														.removeClass(
																'hideBlock');
												$('.vendorTabDiv').find(
														'#erro-cont-hold')
														.remove();
											} else {
												$('.vendorTabDiv')
														.find(
																'.ContentTable,.tableInfo')
														.addClass('hideBlock');
												var error = '<table class="ContentTable" id="erro-cont-hold" cellspacing="0"><tbody id="vendorErrorTable"></tbody></table>';
												$('.vendorTabDiv').find(
														'#erro-cont-hold')
														.remove();
												$('.vendorTabDiv')
														.append(error);
												$('#vendorErrorTable')
														.html(
																'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
											}
											$('#mainTabs-9').removeClass(
													'visible-hide');
											stopLoading();

										},
										error : function() {
											// showError('Sorry, Some technical
											// issue occured.');
											$('#mainTabs-9').removeClass(
													'visible-hide');
											stopLoading();
										},
									});

						}
					});

	$('#expireTab').click(
			function(e) {
				e.stopPropagation();
				clearAllErrors();
				$('#editTabs').tabs({
					active : 0
				});
				$('#createOrderButton').addClass('hideBlock');
				$('#articleExpireDateForm')[0].reset();
				var param = {
					"iv_site" : $('#posSite').val(),
					"iv_article" : articleNo,
					"iv_gtin_flag" : '',
					"iv_barcode" : '',
					"iv_barcode_flag" : '',
					"iv_sales_org" : salesOrg,
					"iv_user" : loggedInUser,
					"iv_platform" : 'B',
					"iv_complex_pbd_flag" : complexPBDFlag,
					"iv_ranged" : rangedFlag,
					"iv_pbd_flag" : packBreakInd,
					"iv_session_id" : ""
				};
				console.log(getOutOfCodeURL + ' ' + JSON.stringify(param));
				$.ajax({
					type : "post",
					url : getOutOfCodeURL,
					data : JSON.stringify(param),
					beforeSend : function() {
						startLoading();
					},
					success : function(response) {
						var outOfCdAry = response;
						if (outOfCdAry != null && outOfCdAry != undefined
								&& outOfCdAry.length > 0
								&& outOfCdAry[0].article_no != undefined) {
							formExpireDateContent(outOfCdAry);
						} else {
							$('#expireDatePopUpTable').closest('table')
									.addClass('hideBlock');
						}
						$("#dialog-editFunctions").dialog("open");
						stopLoading();
					},
					error : function() {
						// showError('Sorry, Some technical issue occured.');
						stopLoading();
					},
				});
			});

	function showSelectPopupMPLSC(response, formData) {

		$.fn.loadArticlePopUpNewLkpUom(response, '', '', onArticleTdSelectInMPLSC,
				selectOption, formData.iv_article, '', formData);
	}
var onArticleTdSelectInMPLSC = function(event) {
		event.stopPropagation();
		var $elem = $(this);
		var $tr = $elem.closest('tr');
		var obj = $tr.data('obj');
		var id = '';
		var articleInRepl = true;
		var articleNo = obj.article_no;
		selectedArticleMPL = articleNo;
		console.log("articleNo --- >"+articleNo);
		for (var i=0;i< rplArray.length;i++){
			if(rplArray[i].isis_ref_no == selectedArticleMPL){
				 id = 'rplPopUp' + rplArray[i].pack_break_uom + i;
				// obj.article_uom = rplArray[i].pack_break_uom;
				 articleInRepl = false;
			}
		}
		
		$('.uomRadioTablePopUp').closest('table').addClass('hideBlock');
		if(articleInRepl) {
			formMPLandSCContentCPBDNotMtain(selectedArticleMPL,obj);
			articleMplScUom = obj.article_uom;    //globel variable for sending uom
		}else{
		formMPLandSCContentCPBD(selectedArticleMPL,obj);
		}
		for ( var i = 0; i < rplArray.length; i++) {
			var rplId = 'rplPopUp' + rplArray[i].pack_break_uom + i;
			if(rplArray[i].isis_ref_no == selectedArticleMPL){
			$('#' + rplId).click(function() {
				bindReplenishmentUomClickPopUpMPL(this.id);
			});
			}
			
			if (i == 0) {
				$('#' + rplId).prop('checked', true);
			}
		}
		if(articleInRepl) {
			$('.uomRadioTablePopUp').closest('table').removeClass('hideBlock');
		}else{		
			$('.' + id).closest('table').removeClass('hideBlock');
		}
		$('#dialog-mulipleArticles').dialog('close');
	};
	function bindReplenishmentUomClickPopUpMPL(id) {
		$('.uomRadioTablePopUp').closest('table').addClass('hideBlock');
		$('.' + id).closest('table').removeClass('hideBlock');

	}
	
	
	$('#mplAndScTab').click(function() {
		//isCPBDarticle = false;
		$('#editTabs').tabs({
			active : 1
		});
		if(isCPBDarticle){
			var param = {
					"iv_article_no":globelResponse.article_no ,
					"iv_sales_org": $('#salesOrg').val(),
					"iv_site": $('#posSite').val(),
					"iv_platform": "B"
			};
			console.log(getCPBDArticleDetails + ' ' + JSON.stringify(param));
			$.ajax({
				type : "POST",
				url : getCPBDArticleDetails,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				}
			}).done(
					function(response) {
						if (response != null && response != undefined
								&& response.length >0 ) {
							isScalledFlag = true;
							formMPLandSCContentCPBD(globelResponse.article_no,response);
							showSelectPopupMPLSC(response,globelResponse.article_no);
							
						} else {
							$.fn.showCustomMsg([ mobiSerErrCode ], error);
						}
						stopLoading();
					}).fail(function() {
				$.fn.showCustomMsg([ mobiSerErrCode ], error);
				stopLoading();
			});
		}/*else{
		$('#editTabs').tabs({
			active : 1
		});
		}*/
		if(isRandomWghtArticle){
			$('input[name="searchByOptionsPopUp"]:checked').next(
			'label').text("EA");
		}
		$('#createOrderButton').removeClass('hideBlock');
	});

	$('#createOrderButton').click(function() {
		clearAllErrors();
		if ($('#mplAndScTab').hasClass('ui-tabs-active ui-state-active')) {
			callServiceToUpdateMpl();
		}
		if ($('#securityTAG').hasClass('ui-tabs-active ui-state-active'))
			saveSecurityArticle();

	});

	$('#posInd').unbind('click').bind(
			'click',
			function() {
				clearAllErrors();
				$('#dialog-pos-price').parent().find('.ui-dialog-title').text(
						'POS Price');
				$('#dialog-pos-price').find('popupActionsWrapper').removeClass(
						'margni-top30');
				getEANInfo();
			});
	$('#getGP').unbind('click').bind(
			'click',
			function() {
				clearAllErrors();
				$('#dialog-pos-price').parent().find('.ui-dialog-title').text(
						'Gross Profit');
				$('#dialog-pos-price').find('popupActionsWrapper').addClass(
						'margni-top30');
				getGProfitInfo();
			});
	$('#orderTabInPopUp').click(function() {
		clearAllErrors();
		callOnOrderService();
	});
	$('#frcstTabInPopUp').click(function() {
		clearAllErrors();
		var data = {
			articleNo : articleNo,
			departmentList : deptNo,
			subCat : category,
			category : subCategory,
			segme : segment
		};
		getForecastOrders(data);
	});

	$('#searchAndAdd')
			.click(
					function() {
						clearAllErrors();
						if (validateExpireDateAdd($('#start').val())) {
							var expDate = $('#start').val();
							var rowNo;
							var selectedUom = $(
									'input[name="searchByOptionsExpPopUp"]:checked')
									.val();
							if ($('#expireDatePopUpTable').find('tr:last').length == 0)
								rowNo = 0;
							else
								rowNo = Number($('#expireDatePopUpTable').find(
										'tr:last').attr('id').split('-')[1]) + 1;
							var content = '<tr class="expireDatePopUp-'
									+ selectedUom
									+ '" id="rowExpiry-'
									+ rowNo
									+ '"><!--<td class="centerValue aisle " id="aisle-'
									+ rowNo
									+ '">'
									+ '</td><td class="centerValue hideBlock" id="aisleEdit-'
									+ rowNo
									+ '"><input  class="editNumCell textbox textboxDefaultText" value="'
									+ '"></td>-->'
									+ '<td class="centerValue expDate " id="expDate-'
									+ rowNo
									+ '">'
									+ expDate
									+ '</td><td class="centerValue  hideBlock" id="expDateEdit-'
									+ rowNo
									+ '"><input  class="textbox textboxDefaultText inputDate editDateCell" value="'
									+ expDate
									+ '"></td>'
									+ '<td class="centerValue uomPass" id="uom-'
									+ rowNo
									+ '">'
									+ selectedUom
									+ '</td><td class="centerValue"><label class="linkBtn editRowBtn '
									+ updateExpiryDate
									+ '" id="editExpiryRecord-'
									+ rowNo
									+ '"><label class="editRecord" id="editExpiryRecordBtn-'
									+ rowNo
									+ '">Edit</label></label><label class="linkBtn saveRowBtn hideBlock" id="saveExpiryRecord-'
									+ rowNo
									+ '"><label class="saveRecord" id="saveExpiryRecordBtn-'
									+ rowNo
									+ '">Save</label></label><label class="linkBtn '
									+ removeExpiryDate
									+ '" id="DeleteExpiryRecord-'
									+ rowNo
									+ '"><label class="deleteRecord">Delete</label></label></td></tr>';
							if ($('#expireDatePopUpTable').closest('table')
									.hasClass('hideBlock'))
								$('#expireDatePopUpTable').closest('table')
										.removeClass('hideBlock');
							$('#expireDatePopUpTable').append(content);
							bindExpireRowClickEvents(rowNo);
							securityMatrix();
							$('#createDrpDwn,#ticketDrpDwn,#orderDrpDwn').css('display','');
							showOrHideButtons();
							callServiceToUpdateExpiryDate(expDate, selectedUom,
									'I', 'DeleteExpiryRecord-' + rowNo);
						}
					});
}

function bindReplenishmentUomClick(id) {
	$('.uomRadioTable').closest('table').addClass('hideBlock');
	$('.' + id).closest('table').removeClass('hideBlock');
}
function bindPriceUomClick(id) {

	$('input[name="searchByOptionsPrice"]').click(function() {
		clearAllErrors();
		$('.priceAndUnitInfo').closest('table').addClass('hideBlock');
		var selectedValue = this.id;
		$('.' + selectedValue).closest('table').removeClass('hideBlock');
	});

}

function getDesiredPastDate(count) {
	clearAllErrors();
	var desiredDate = '';
	var thatDay = new Date(new Date().getTime() - 86400000 * count);
	var newDate = thatDay.getDate();
	var newMonth = thatDay.getMonth() + 1;

	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
	return desiredDate;

}

function getDesiredFutureDate(count) {
	var desiredDate = '';
	var thatDay = new Date(new Date().getTime() + 86400000 * count);
	var newDate = thatDay.getDate();
	var newMonth = thatDay.getMonth() + 1;

	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	desiredDate = (newDate + "/" + (newMonth) + "/" + thatDay.getFullYear());
	return desiredDate;

}

function getPromoDetails(from, to, ranged, tab, flag) {
	var param = {
		"iv_site" : $('#posSite').val(),
		"iv_article" : articleNo,
		"iv_ranged" : ranged,
		"iv_promo_start_date" : from,
		"iv_promo_end_date" : to,
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_department_no" : (deptNo != null && deptNo != undefined ? deptNo
				: ''),
		"iv_category_no" : (category != null && category != undefined ? category
				: ''),
		"iv_sub_category_no" : (subCategory != null && subCategory != undefined ? subCategory
				: ''),
		"iv_segment_no" : (segment != null && segment != undefined ? segment
				: ''),
		"iv_promo_flag" : flag,
		"iv_complex_pbd_flag" : complexPBDFlag,
		"iv_session_id" : ""
	};
	console.log(getOfferDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : getOfferDetails,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {

					if (tab == 'current') {
						var offersArray = response;
						if (offersArray != null && offersArray != undefined
								&& offersArray.length > 0
								&& offersArray[0].ErrorID == undefined) {
							$('#offerTabF').val('1');
							if ($('#curPromContent').html() != '') {
								if (offersArray.length > 0
										&& offersArray[0].ErrorID == undefined) {
									$('#curPromoCount')
											.text(offersArray.length);
									$('.currentTitle').removeClass('hideBlock');
									var cur = '<tr><th class="centerValue">Type</th><th class="centerValue">Start Date</th>	<th class="centerValue">End Date</th><th class="">Promo #</th> <th class="">Description</th><th class="centerValue">UOM</th>	<!--<th class="centerValue">Standard Price</th>--><th class="centerValue">Promo Price ($)</th> <th class="centerValue lastColumn">Price Type</th>	</tr>';
									cur += formPromoContent(offersArray);
									$('#curPromContent').html(cur);
									var recordCount = offersArray.length;
									var itemsOnPage = 10;

									$('.paginationDivCurrentPromo')
											.pagination(
													{
														items : recordCount,
														itemsOnPage : itemsOnPage,
														cssStyle : 'compact-theme',
														currentPage : currentPageInCurrent,
														onPageClick : function(
																pageNumber,
																event) {
															showPromoPage(
																	pageNumber,
																	'curPromContent',
																	'current');
														}
													});
									if (recordCount / itemsOnPage > 1) {
										$('.paginationDivCurrentPromo')
												.removeClass('hideBlock');
									} else {
										$('.paginationDivCurrentPromo')
												.addClass('hideBlock');
									}
								}

							}
						} else {
							$('.currentTitle').addClass('hideBlock');
							var error = '<div class="errorDiv promoError"><label>No Active Promotions Found.</label></div>';
							$('#curPromContent').html(error);
						}
						stopLoading();

					} else if (tab == 'future') {
						var offersArray = response;
						if (offersArray != null && offersArray != undefined
								&& offersArray.length > 0
								&& offersArray[0].ErrorID == undefined) {
							if (offersArray.length > 0
									&& offersArray[0].ErrorID == undefined) {
								$('#futurePromoCount').text(offersArray.length);
								$('.futureTitle').removeClass('hideBlock');
								var future = '<tr><th class="centerValue">Type</th><th class="centerValue">Start Date</th>	<th class="centerValue">End Date</th><th class="">Promo #</th> <th class="">Description</th><th class="centerValue">UOM</th>	<!--<th class="centerValue">Standard Price</th>--><th class="centerValue">Promo Price ($)</th> <th class="centerValue lastColumn">Price Type</th>	</tr>';
								future += formPromoContent(offersArray);
								$('#futurePromTable').html(future);
								var recordCount = offersArray.length;
								var itemsOnPage = 10;
								//var currentPage = 1;
								$('.paginationDivFuturePromo').pagination(
										{
											items : recordCount,
											itemsOnPage : itemsOnPage,
											cssStyle : 'compact-theme',
											currentPage : currentPageInFuture,
											onPageClick : function(pageNumber,
													event) {
												showPromoPage(pageNumber,
														'futurePromTable',
														'future');
											}
										});
								if (recordCount / itemsOnPage > 1) {
									$('.paginationDivFuturePromo').removeClass(
											'hideBlock');
								} else {
									$('.paginationDivFuturePromo').addClass(
											'hideBlock');
								}
							}

						} else {
							$('.futureTitle').addClass('hideBlock');
							var error = '<div class="errorDiv promoError"><label>No Future Promotions Found.</label></div>';
							$('#futurePromTable').html(error);
						}

						stopLoading();
					} else if (tab == 'past') {
						var offersArray = response;
						if (offersArray != null && offersArray != undefined
								&& offersArray.length > 0
								&& offersArray[0].ErrorID == undefined) {
							if (offersArray.length > 0) {
								$('#pastPromoCount').text(offersArray.length);
								$('.pastTitle').removeClass('hideBlock');
								var past = '<tr><th class="centerValue">Type</th><th class="centerValue">Start Date</th>	<th class="centerValue">End Date</th><th class="">Promo #</th> <th class="">Description</th><th class="centerValue">UOM</th><!--	<th class="centerValue">Standard Price</th>--><th class="centerValue">Promo Price ($)</th> <th class="centerValue lastColumn">Price Type</th>	</tr>';
								past += formPromoContent(offersArray);
								$('#pasPromContent').html(past);
								var recordCount = offersArray.length;
								var itemsOnPage = 10;
								// var currentPage = 1;
								$('.paginationDivPastPromo').pagination(
										{
											items : recordCount,
											itemsOnPage : itemsOnPage,
											cssStyle : 'compact-theme',
											currentPage : currentPageInPast,
											onPageClick : function(pageNumber,
													event) {
												showPromoPage(pageNumber,
														'pasPromContent',
														'past');
											}
										});
								if (recordCount / itemsOnPage > 1) {
									$('.paginationDivPastPromo').removeClass(
											'hideBlock');
								} else {
									$('.paginationDivPastPromo').addClass(
											'hideBlock');
								}
							}
						} else {
							$('.pastTitle').addClass('hideBlock');
							var error = '<div class="errorDiv promoError"><label>No Past Promotions Found.</label></div>';
							$('#pasPromContent').html(error);
						}

						stopLoading();
					}
				},
				error : function() {
					// showError('Sorry, Some technical issue occured.');
					stopLoading();
				},
			});

}

function formPromoContent(offersArr) {
	var content = '';
	var j = 1;
	var k = 1;
	for ( var i = 0; i < offersArr.length; i++) {
		content += '<tr class="page-' + j + ' ';
		if (i > 9) {
			content += 'hideBlock';

		}
		content += ' "><td class="centerValue">'
				+ offersArr[i].promo_type
				+ '</td>	<td class="centerValue">'
				+ formatDateMobi(offersArr[i].promo_start_date)
				+ '</td> <td class="centerValue">'
				+ formatDateMobi(offersArr[i].promo_end_date)
				+ '</td><td class="">'
				+ offersArr[i].promo_off_no
				+ '</td>	<td class="">'
				+ offersArr[i].promo_desc
				+ '</td>	<td class="centerValue">'
				+ offersArr[i].uom
				+ '</td><!-- <td class="centerValue">'
				+ offersArr[i].pos_price
				+ '</td>--><td class="centerValue">'
				+ (offersArr[i].promo_price != null
						&& offersArr[i].promo_price != undefined ? Number(
						offersArr[i].promo_price).toFixed(2) : '')
				+ '</td> <td class="centerValue lastColumn">'
				+ offersArr[i].promo_price_type + '</td>	</tr>';

		if (k % 10 == 0) {
			j++;
		}
		k++;

	}
	return content;
}

function formFreshTableContent(obj) {
	obj.label_desc = (obj.label_desc != null && obj.label_desc != '' && obj.label_desc != undefined) ? obj.label_desc
			: '';
	obj.label_format = (obj.label_format != null && obj.label_format != '' && obj.label_format != undefined) ? obj.label_format
			: '';
	obj.best_before_days = (obj.best_before_days != null
			&& obj.best_before_days != '' && obj.best_before_days != undefined) ? obj.best_before_days
			: '';
	obj.fresh_food_item_flag = (obj.fresh_food_item_flag != null
			&& obj.fresh_food_item_flag != '' && obj.fresh_food_item_flag != undefined) ? obj.fresh_food_item_flag
			: '';
	obj.mand_warning = (obj.mand_warning != null && obj.mand_warning != '' && obj.mand_warning != undefined) ? obj.mand_warning
			: '';
	obj.use_by_days = (obj.use_by_days != null && obj.use_by_days != '' && obj.use_by_days != undefined) ? obj.use_by_days
			: '';
	obj.counter_wgt_flag = (obj.counter_wgt_flag != null
			&& obj.counter_wgt_flag != '' && obj.counter_wgt_flag != undefined) ? obj.counter_wgt_flag
			: '';
	obj.storage_handling = (obj.storage_handling != null
			&& obj.storage_handling != '' && obj.storage_handling != undefined) ? obj.storage_handling
			: '';
	obj.shelf_life = (obj.shelf_life != null && obj.shelf_life != '' && obj.shelf_life != undefined) ? obj.shelf_life
			: '';
	obj.tare = (obj.tare != null && obj.tare != '' && obj.tare != undefined) ? obj.tare
			: '';
	obj.tray_no = (obj.tray_no != null && obj.tray_no != '' && obj.tray_no != undefined) ? obj.tray_no
			: '';
	obj.wrap_tare = (obj.wrap_tare != null && obj.wrap_tare != '' && obj.wrap_tare != undefined) ? obj.wrap_tare
			: '';
	var content = '';
	content += '<tr><td>Label Description:</td><td class="lastColumn" colspan="5" id="">'
			+ obj.label_desc
			+ '</td></tr><tr><td>Label Format:</td><td class="lastColumn" colspan="5" id="">'
			+ obj.label_format
			+ '</td></tr><tr><td width="20%">Best Before Days:</td><td width="13%" class="valueInfo" id="">'
			+ obj.best_before_days
			+ '</td><td width="20%">Fresh Food Item Flag:</td><td width="13%" class="valueInfo" id="">'
			+ obj.fresh_food_item_flag
			+ '</td><td width="20%">Mandatory Warning:</td><td width="13%" class="lastColumn valueInfo" id="">'
			+ obj.mand_warning
			+ '</td></tr><tr><td>Use By Days:</td><td class="valueInfo" id="">'
			+ obj.use_by_days
			+ '</td><td>Counter Weighed Flag:</td><td class="valueInfo" id="">'
			+ obj.counter_wgt_flag
			+ '</td><td>Storage &amp; Handling:</td><td class="lastColumn valueInfo" id="">'
			+ obj.storage_handling
			+ '</td></tr><tr><td>Shelf Life:</td><td class="valueInfo" id="">'
			+ obj.shelf_life
			+ '</td><td>Tare (G):</td><td class="valueInfo" id="">'
			+ obj.tare
			+ '</td><td class="lastColumn" colspan="2"></td></tr><tr class="lastRow"><td>Tray No.:</td><td class="valueInfo" id="">'
			+ obj.tray_no
			+ '</td><td>Wrap Tare (G):</td><td class="valueInfo" id="">'
			+ obj.wrap_tare
			+ '</td><td colspan="2" class="lastColumn">&nbsp;</td></tr>';
	$('#freshTable').html(content);
}

function formNutritionTableContent(obj) {
	var content = '';
	content += '<tr><td width="20%">Nutritional Claim:</td><td width="13%" class="valueInfo" id="">'
			+ (obj.nutri_claim != null ? obj.nutri_claim : '')
			+ '</td><td width="20%">Serving Size:</td><td width="13%" class="lastColumn valueInfo" id="">'
			+ (obj.serving_size != null ? (obj.serving_size).toLowerCase() : '')
			+ '</td><td width="20%">&nbsp;</td><td width="13%" class="valueInfo" id="">&nbsp;'
			+ '</td></tr><tr><td>Approval Status:</td><td class="valueInfo" id="" >'
			+ (obj.approval_status != null ? obj.approval_status : '')
			+ '</td><td>Health Nutrition Info:</td><td class="valueInfo" id="">'
			+ (obj.health_nutri_info != null ? obj.health_nutri_info : '')
			+ '</td><td>Servings Per Pack Size:</td><td class="lastColumn valueInfo" id="">'
			+ (obj.serving_per_pack != null ? obj.serving_per_pack : '')
			+ '</td></tr><tr class=""><td>Ingredients:</td><td colspan="5" class="lastColumn" id="">'
			+ (obj.ingredients != null ? obj.ingredients : '')
			+ '</td></tr><tr class="lastRow"><td>Country of Origin:</td>'
			+ '<td colspan="5" class="lastColumn">'
			+ (obj.country_of_origin != null ? obj.country_of_origin : '')
			+ '</td></tr>';

	$('#nutritionTable').html(content);
}

function formNutritionValueContent(obj) {
	if (obj.nutrient_details != null && obj.nutrient_details != undefined
			&& obj.nutrient_details != '') {
		var str = obj.nutrient_details;
		var list = str.split('|');
		// var j = 1;
		var content = '';
		content += '<tr><th>Nutrition</th><th colspan="2" class="centerValue">Serving Qty.</th><th colspan="2" class="centerValue lastColumn">Per 100 Qty.</th></tr>';
		var tempArray = [];
		var obj = [];
		for ( var j = 0; j < list.length; j++) {

			tempArray = list[j].split('#');
			obj.push(tempArray);
		}

		for ( var i = 0; i < obj.length; i++) {
			content += '<tr>';
			for ( var j = 0; j < 5; j++) {
				if (j == 0) {
					content += '<td>' + obj[i][j] + '</td>';
				}
				if (j == 1) {
					content += '<td class="numberColumn ">' + Number(obj[i][j])
							+ '</td>';
				}
				if (j == 2) {
					content += '<td class="">' + (obj[i][j])
							+ '</td>';
				}
				if (j == 3) {
					content += '<td class="numberColumn ">' + Number(obj[i][j])
							+ '</td>';
				}
				if (j == 4) {
					content += '<td class="lastColumn">'
							+ (obj[i][j]) + '</td>';
				}
			}
			content += '</tr>';
		}
		$('#nutriVal').html(content);
		$('#nutriVal').parent().removeClass('hideBlock');
		$('.divNutriValTitle').removeClass('hideBlock');
	} else {
		$('#nutriVal').parent().addClass('hideBlock');
		$('.divNutriValTitle').addClass('hideBlock');
	}
}

function formCustomerNotesContent(obj) {
	var content = '';
	content += '<tr><td width="20%">Customer Product Notes:</td><td class="lastColumn" id="">';

	var productNotesArray = (obj.product_notes != null ? obj.product_notes
			.split('|') : '');
	for ( var i = 0; i < productNotesArray.length; i++) {
		if (i == 0)
			content += '<strong>' + productNotesArray[i] + '</strong>';
		if (i != 0) {
			content += '<br>' + productNotesArray[i];
		}
	}
			content += '</td></tr><!--<tr><td>ftr_brand_name:</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_desc
				+ '</td></tr><tr><td>ftr_product_title:</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_desc
				+ '</td></tr><tr><td>ftr_model_number  :</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_format
				+ '</td></tr><tr><td>ftr_feature_pnt_1 :</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_desc
				+ '</td></tr><tr><td>ftr_feature_pnt_2:</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_format
				+ '</td></tr><tr><td>ftr_feature_pnt_3:</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_desc
				+ '</td></tr><tr><td>ftr_feature_pnt_4:</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_desc
				+ '</td></tr><tr><td>ftr_feature_pnt_5</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_format
				+ '</td></tr><tr><td>ftr_feature_pnt_6</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_desc
				+ '</td></tr><tr><td>ftr_feature_pnt_7:</td><td class="lastColumn" colspan="5" id="">'
				+ obj.label_format
				+ '</td></tr>-->';
			
			
	$('#customerNotesTable').html(content);
}

function formTastingNotesContent(obj) {
	var content = '';
	content += '<tr><td width="20%">Tasting Notes:</td><td class="lastColumn" id="">'
			+ (obj.tasting_notes != null ? obj.tasting_notes : '')
			+ '</td></tr>';
	$('#tastingNotesTable').html(content);
}

function giftCardDetails(obj) {
	var content = '';
	content += '<tr><td width="20%">Min Value:</td><td width="13%" class="valueInfo" id="">'
			+ (obj.min_value != null && obj.min_value != undefined ? Number(
					obj.min_value).toFixed(2) : '')
			+ '</td><td width="20%">Expiry Period:</td><td width="13%" class="valueInfo" id="">'
			+ (obj.exp_period != null ? obj.exp_period : '')
			+ '</td><td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td></tr>'
			+ '<tr class="lastRow"><td>Max Value:</td><td class="valueInfo" id="">'
			+ (obj.max_value != null && obj.max_value != undefined ? Number(
					obj.max_value).toFixed(2) : '')
			+ '</td><td>Expiry Type:</td><td class="valueInfo" id="">'
			+ (obj.exp_type != null ? obj.exp_type : '')
			+ '<td colspan="2" class="lastColumn">&nbsp;</td></tr>';
	$('#giftCardTable').html(content);
}


function ProductStyleDetails(obj) {
	var content = '';
	content += '<tr><td width="20%">Article Style:</td><td width="13%" class="valueInfo" id="">'
		+(obj.style != undefined && obj.style != null ? (obj.style)
				: '')	
		+ '</td><td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td></tr>';
	$('#styleTable').html(content);
}

function ProductSeasonDetails(obj) {
	var content = '';
	content += '<tr><td width="20%">Season Name:</td><td width="13%" class="valueInfo" id="">'
			+(obj.season_name != undefined && obj.season_name != null ? (obj.season_name)
					: '')					
			+ '</td><td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td></tr>'
			+ '<tr class="lastRow"><td>Season Year:</td><td class="valueInfo" id="">'
			+ (obj.season_year != undefined && obj.season_year != null ? (obj.season_year)
					: '')									
			+ '<td colspan="2" class="lastColumn">&nbsp;</td></tr>';
	$('#seasonTable').html(content);
}


function ProductSizeDetails(obj) {
	var content = '';
	content += '<tr><td width="20%">Article Size:</td><td width="13%" class="valueInfo" id="">'
		+ (obj.article_size != undefined && obj.article_size != null ? (obj.article_size)
				: '')
		+'</td><td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td></tr>';
		content += '<tr><td width="20%">Article Colour:</td><td width="13%" class="valueInfo" id="">'
		+(obj.colour != undefined && obj.colour != null ? (obj.colour)
				: '')	
		+ '</td><td width="20%" class="noDivider">&nbsp;</td><td width="13%" class="lastColumn ">&nbsp;</td></tr>';
	$('#sizeTable').html(content);
}
function formPrintContent(obj) {
	var content = '';
	content += '<strong>' + articleNo + ' - ' + articleDesc + '</strong><br>'
			//+ 'Price: ' + $('#standardPrice').text() + "  ";
	/* Removed as part of Defect _ 7730
	 * if ($('#promoPrice').text() != "") {
		content +="Promo Price: " + $('#promoPrice').text();
	}
	if ($('#proDateInfo').text() != "") {
		content +="  " + $('#proDateInfo').text();
	}*/
	content +='<br>'
			+ '<strong>Nutritional Info</strong><br><br>'
			+ '<strong>Serving Size: </strong>'
			+ (obj.serving_size != undefined && obj.serving_size != null ? (obj.serving_size)
					.toLowerCase()
					: '')
			+ '<br>'
			+ '<strong>Servings Per Pack Size: </strong>'
			+ (obj.serving_per_pack != undefined
					&& obj.serving_per_pack != null ? obj.serving_per_pack : '')
			+ '<br><br>' + '<strong>Ingredients: </strong>'
			+ (obj.ingredients != null ? obj.ingredients : '') + '<br><br>';

	if (obj.nutrient_details != null && obj.nutrient_details != undefined
			&& obj.nutrient_details != '') {
		var str = obj.nutrient_details;
		var list = str.split('|');
		// var j = 1;
		var tempArray = [];
		var object = [];
		// var startIndex = 0;
		// var endIndex = 3;
		content += '<table width="100%"><tr class="greyRow" ><td style="text-align:left;font-weight:bold;padding:10px;border-bottom:solid 1px black" class="leftValue">Nutrition</td><td style="padding:10px;font-weight:bold;border-bottom:solid 1px black" class="centerValue">Serving Qty.</td><td style="padding:10px;font-weight:bold;border-bottom:solid 1px black" class="centerValue lastColumn">Per 100 Qty.</th></tr>';
		for ( var j = 0; j < list.length; j++) {

			tempArray = list[j].split('#');
			object.push(tempArray);
		}

		for ( var i = 0; i < object.length; i++) {
			content += '<tr>';
			for ( var j = 0; j < 5; j++) {
				if (j == 0) {
					content += '<td style="text-align:left;padding:10px;border-bottom:solid 1px black">'
							+ object[i][j] + '</td>';
				}
				if (j == 1) {
					content += '<td style="padding:10px;border-bottom:solid 1px black" class="centerValue">'
							+ Number(object[i][j]) + '';
				}
				if (j == 2) {
					content += ' ' + (object[i][j]) + '</td>';
				}
				if (j == 3) {
					content += '<td style="padding:10px;border-bottom:solid 1px black" class="centerValue lastColumn">'
							+ Number(object[i][j]) + '';
				}
				if (j == 4) {
					content += ' ' + (object[i][j])+ '</td>';
				}
			}
			content += '</tr>';
		}

		content += '</table>';

	}

	content += '<br><strong>Customer Product Notes:</strong> ';

	var productNotesArray = (obj.product_notes != null ? obj.product_notes
			.split('|') : '');
	for ( var i = 0; i < productNotesArray.length; i++) {
		if (i == 0)
			content += '' + productNotesArray[i] + '';
		if (i != 0) {
			content += ',' + productNotesArray[i];
		}
	}

	content += '<br><br><strong>Tasting Notes:</strong> '
			+ (obj.tasting_notes != null ? obj.tasting_notes : '');

	content += '<br><br><br><strong>Note:</strong><i> While every care has been taken to ensure this information is correct, food products are constantly being reformulated '
			+ 'and ingredients and nutrition content may change. If you have an allergy or specific dietary requirement you should always check the '
			+ 'label of a food before consuming it. This information may not be reproduced without the prior consent of ';
		content += 'Woolworths Group.</i>';
	var printFoot = '<br><br><br><br><br><br><br><br><br><br><br><br><br><br><div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width48 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Page</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';
	$('#printbodyForNutrition').html('').append(content + printFoot).append(
			'<link rel="stylesheet" href="../../styles/printstyle.css" />');
	$('#emailbodyForNutrition').html('').append(content).append(
			'<link rel="stylesheet" href="../../styles/printstyle.css" />');

}

function sendEmail() {
	$
			.ajax({
				type : "POST",
				url : "sendNutritionInfoMail.htm",
				data : {
					toMailId : $('#customerEmailId').val(),
					mailBody : document.getElementById('emailDataForNutrition').innerHTML,
					stdSellPrice : $('#standardPrice').text(),
					promoPrice : $('#promoPrice').text(),
					promoDate : $('#proDateInfo').text()
				},
				
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if (response) {
						$('#customerEmailId').val('');
						$("#dialog-email").dialog("close");
						$.fn.showCustomMsg([ "EMail sent successfully." ],
								success, "Article Lookup");

						// Defect_6443 - SMKT_REGRESSION_Lookup_UI issues in
						// messages in lookup
						/*
						 * showStatusContent('', '<li>EMail sent successfully.</li>');
						 */
					} else {
						showAllErrorsInEdit("Email delivery failed, Due to service issue.");
					}
					stopLoading();
				},
				error : function(response) {

					if (response.status == '406') {

						// FIX for Defect_6443 - SMKT_REGRESSION_Lookup_UI
						// issues in messages in lookup

						$.fn.showCustomMsg([ "EMail sent successfully." ],
								success, "Article Lookup");

						/*
						 * showStatusContent('', '<li>EMail sent successfully.</li>');
						 */
					} else
						showAllErrorsInEdit("Email delivery failed, Due to service issue.");
					$("#dialog-email").dialog("close");
					stopLoading();
				},
			});
}

function validateEmailPopUp() {
	// $("#dialog-email").dialog("open");
	var emailId = $('#customerEmailId').val();
	if (emailId == '') {
		showAllErrorsInEdit('Please Enter Customer Email ID');
		$('#customerEmailId').focus();
		return false;
	} else if (!validateEmail(emailId)) {
		showAllErrorsInEdit('Please Enter Valid Email ID');
		$('#customerEmailId').focus();
		return false;
	}
	clearAllErrors();
	return true;
}

function validateEmail(sEmail) {
	var filter = /^([\w-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
	if (filter.test(sEmail)) {
		return true;
	} else {
		return false;
	}
}

function showErrorInEmailPop(msg) {
	/*
	 * $('#errorMsgDivEmailPop').addClass('hideBlock').removeClass('hideBlock');
	 * $('#errorMsgEmailPop').text(msg);
	 */
	$.fn.showCustomMsg([ msg ], error, 'Article Details');
}

function hideErrorInEmailPop() {
	$('#errorMsgDivEmailPop').removeClass('hideBlock').addClass('hideBlock');
}

function showErrorInEditPop(msg) {
	/*
	 * $('#errorMsgDivEditPop').addClass('hideBlock').removeClass('hideBlock');
	 * $('#errorMsgDivEditPop').addClass('errorDiv').removeClass('warningImage')
	 * .find('#errorMsgEditPop').text(msg);
	 */
	$.fn.showCustomMsg([ msg ], error, 'Article Details');
	$('#error-warn-wrapper').find('.pageErrorsWrapper')
			.removeClass('hideBlock');

}

function hideErrorInEditPop() {
	$('#errorMsgDivEditPop').removeClass('hideBlock').addClass('hideBlock');
}

function showWarningInEditPop(msg) {
	/*
	 * $('#errorMsgDivEditPop').addClass('hideBlock').removeClass('hideBlock');
	 * $('#errorMsgDivEditPop').addClass('warningImage').removeClass('errorDiv')
	 * .find('#errorMsgEditPop').text(msg);
	 */

	$.fn.showCustomMsg([ msg ], error, 'Article Details');
}

function formExpireDateContent(list) {
	var content = '';
	var flag = false;
	var count = 0;
	var pageNo = 1;
	var uomRadioContent = '<label for="uom" class="">UOM</label> ';

	var uomArray = getUniqueList(repUomArray);
	for ( var k = 0; k < uomArray.length; k++) {
		if (k == 0)
			uomRadioContent += '<input type="radio" checked="checked" id="expireDatePopUp-'
					+ (uomArray[k])
					+ '" value="'
					+ (uomArray[k])
					+ '"'
					+ 'name="searchByOptionsExpPopUp"><label class="labelText" for="'
					+ (uomArray[k]) + '">' + (uomArray[k]) + '</label>';
		else
			uomRadioContent += '<input type="radio"  id="expireDatePopUp-'
					+ (uomArray[k])
					+ '" value="'
					+ (uomArray[k])
					+ '"'
					+ 'name="searchByOptionsExpPopUp"><label class="labelText" for="'
					+ (uomArray[k]) + '">' + (uomArray[k]) + '</label>';

	}
	var isEmpty = true;
	for ( var i = 0; (i < list.length && i < 5); i++) {// only first five
		// recent expiry dates
		// should be displayed.
		// Sorted by expiry date
		// in asc order will be
		// sent by Servoce
		flag = true;
		if (list[i].use_by_date != null && list[i].use_by_date != undefined
				&& list[i].use_by_date != '') {
			isEmpty = false;
			list[i].use_by_date = (list[i].use_by_date != null
					&& list[i].use_by_date != undefined
					&& list[i].use_by_date != '' ? list[i].use_by_date : '');
			var j = 0;
			content += '<tr expdate ="' + list[i].use_by_date
					+ '" class=" pageNo-' + pageNo;
			if (count >= 8)
				content += ' hideBlock ';
			content += ' expireDatePopUp-'
					+ (list[i].scan_uom || '')
					+ '" id="rowExpiry-'
					+ i
					+ j
					+ '"><!--<td class="centerValue aisle " id="aisle-'
					+ i
					+ j
					+ '">'
					+ (list[i].article_aisle || '')
					+ '</td><td class="centerValue  hideBlock" id="aisleEdit-'
					+ i
					+ j
					+ '"><input  class="editNumCell textbox textboxDefaultText" value="'
					+ (list[i].article_aisle || '')
					+ '"></td>-->'
					+ '<td class="centerValue expDate" id="expDate-'
					+ i
					+ j
					+ '">'
					+ (list[i].use_by_date != null
							&& list[i].use_by_date != undefined
							&& list[i].use_by_date != '' ? formatDateMobi(list[i].use_by_date)
							: '')
					+ '</td><td class="centerValue  hideBlock" id="expDateEdit-'
					+ i
					+ j
					+ '"><input  class="textbox textboxDefaultText inputDate editDateCell" value="'
					+ (list[i].use_by_date != null
							&& list[i].use_by_date != undefined
							&& list[i].use_by_date != '' ? formatDateMobi(list[i].use_by_date)
							: '')
					+ '"></td>'
					+ '<td class="centerValue uomPass" id="uom-'
					+ i
					+ j
					+ '">'
					+ (list[i].scan_uom || '')
					+ '</td><td class="centerValue">'
					/*+'<label class="linkBtn editRowBtn '
					+ updateExpiryDate
					+ '" id="editExpiryRecord-'
					+ i
					+ j
					+ '"><label class="editRecord" id="editExpiryRecordBtn-'
					+ i
					+ j
					+ '">Edit</label></label><label class="linkBtn saveRowBtn hideBlock" id="saveExpiryRecord-'
					+ i
					+ j
					+ '"><label class="saveRecord" id="saveExpiryRecordBtn-'
					+ i
					+ j
					+ '">Save</label></label>'*/
					+'<label class="linkBtn '
					+ removeExpiryDate
					+ '" id="DeleteExpiryRecord-'
					+ i
					+ j
					+ '"><label class="deleteRecord">Delete</label></label></td></tr>';
			count++;
			if (count % 8 == 0) {
				pageNo++;
			}
		}
	}
	var completeExpiryDate = '';
	for ( var s = 0; s < list.length; s++) {
		completeExpiryDate = completeExpiryDate + "," + list[s].use_by_date;
	}
	$('#uomForExpirePopUp').html(uomRadioContent);
	$('#expireDatePopUpTable').html(content);
	$('#expireDateCompleteData').html(completeExpiryDate);
	$('.expirePopUpResultsPagination').pagination({
		items : count,
		itemsOnPage : 8,
		cssStyle : 'compact-theme',
		currentPage : currentPageInExpire,
		onPageClick : function(pageNumber) {
			showExpirePopUpResults(pageNumber);

		}

	});
	if (count > 8) {
		$('.expirePopUpResultsPagination').removeClass('hideBlock');
	} else {
		$('.expirePopUpResultsPagination').addClass('hideBlock');
	}
	if (content == '' || !flag)
		$('#expireDatePopUpTable').closest('table').addClass('hideBlock');
	else
		$('#expireDatePopUpTable').closest('table').removeClass('hideBlock');
	for ( var i = 0; i < list.length; i++) {
		var j = 0;
		bindExpireRowClickEvents(i.toString() + j.toString());
	}
	securityMatrix();
	$('#createDrpDwn,#ticketDrpDwn,#orderDrpDwn').css('display','');
	showOrHideButtons();
	if (isEmpty) {
		$('#expireDatePopUpTable').closest('table').addClass('hideBlock');
	}
	// bindExpireRadioClickEvents();
	// $('input[name="searchByOptionsExpPopUp"][type="radio"]:first').trigger('click');
}

function formMPLandSCContentCPBDNotMtain(selectedArticleMPL,obj){
	
	var content1PopUp = '';
	var content2PopUp = '';
	var radioContentPopUp = '<p class="notes">Article : <strong>'+selectedArticleMPL+  '</strong>  Description :<strong> '+(obj.article_desc != undefined ? obj.article_desc : globelResponse.article_desc)+'</strong>';
	var radioContentPopUp2 = '<p class="notes"> UOM : <strong>'+(obj.article_uom != undefined ? obj.article_uom :  obj.article_uom)+' </strong>';
	var tableContentPopUp = '';
	if (isBigw != 'true' ) {
		var hideTableBlock = ' hideBlock';// ganesh Defect_319

			tableContentPopUp += '<form class="sc-mpl-edit-form"><table class="ContentTable sc-mpl-edit '
					+ hideTableBlock
					+ '" cellspacing="0"><tbody class="uomRadioTablePopUp rplPopUp'
					+ (obj.article_uom == null ? ''
							: obj.article_uom)
					+ '"><tr data-mplupdate-bind isis-ref-no="'
					+ obj.article_no
					+ '" ><td width="20%">Current MPL:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
					+ (obj.curr_mpl == null
							|| obj.curr_mpl == undefined ? ''
							: Number(obj.curr_mpl).toFixed(0))
					+ '"><input class="editNumCell currentMpl AC_MPLSCD textbox textboxDefaultText" value="'
					+ (obj.curr_mpl == null
							|| obj.curr_mpl == undefined ? ''
							: Number(obj.curr_mpl).toFixed(0))
					+ '"></td><td width="20%">Current SC:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
					+ (obj.curr_sc == null
							|| obj.curr_sc == undefined ? ''
							: Number(obj.curr_sc).toFixed(0))
					+ '"><input  class="editNumCell AC_MPLSCD textbox currentSc textboxDefaultText" value="'
					+ (obj.curr_sc == null
							|| obj.curr_sc == undefined ? ''
							: Number(obj.curr_sc).toFixed(0))
					+ '"></td><td class="hideBlock" width="20%">Current Facing:</td><td width="15%" align="center" class="valueInfo currentFac hideBlock" data-prev-value="'
					+ (obj.curr_facing == null
							|| obj.curr_facing == undefined ? ''
							: Number(obj.curr_facing).toFixed(0))
					+ '">'
					+ (obj.curr_facing == null
							|| obj.curr_facing == undefined ? ''
							: Number(obj.curr_facing).toFixed(0))
					+ '</td></tr><tr><td width="20%">Previous MPL:</td><td width="15%" align="center" class="valueInfo">'
					+ (obj.prev_mpl == null ? '' : Number(
							obj.prev_mpl).toFixed(0))
					+ '</td><td width="20%">Previous SC:</td><td width="15%" align="center" class="valueInfo">'
					+ (obj.prev_sc == null ? '' : Number(
							obj.prev_sc).toFixed(0))
					+ '</td><td class="hideBlock" width="20%">Previous Facing:</td><td width="15%" align="center" class="valueInfo hideBlock">'
					+ (obj.prev_facing == null ? '' : Number(
							obj.prev_facing).toFixed(0))
					+ '</td></tr><tr class="lastRow"><td width="20%">Default MPL:</td><td width="15%" align="center" class="valueInfo">'
					+ (obj.default_mpl == null ? '' : Number(
							obj.default_mpl).toFixed(0))
					+ '</td><td width="20%">Default SC:</td><td width="15%" align="center" class="valueInfo">'
					+ (obj.default_sc == null ? '' : Number(
							obj.default_sc).toFixed(0))
					+ '</td><td class="hideBlock" width="20%">Default Facing:</td><td width="15%" align="center" class="valueInfo hideBlock">'
					+ (obj.default_facing == null ? '' : Number(
							obj.default_facing).toFixed(0))
					+ '</td></tr></tbody></table></form>';

			content1PopUp += '<input type="radio" name="searchByOptionsPopUp" complex-pbd-uom="'
					+ (obj.article_uom == null ? ''
							: obj.article_uom)
					+ '" value="'
				
					+ '" id="rplPopUp'
					+ (obj.article_uom == null ? ''
							: obj.article_uom)  + '" ';
		
		//$('#uomRadio').html(radioContentPopUp );
		$('#uomRadio').html(radioContentPopUp +radioContentPopUp2 + '</p>');
		$('#mplAndScTable').html(tableContentPopUp);
		$("#beforeHistory").removeClass(
		'hideBlock');
		$("#afterHistory").addClass(
		'hideBlock');
		
	}
}

function formMPLandSCContentCPBD(selectedArticleMPL,obj){
	
	var content1PopUp = '';
	var content2PopUp = '';
	var radioContentPopUp = '<p class="notes">Article : <strong>'+selectedArticleMPL+  '</strong>  Description :<strong> '+(obj.article_desc != undefined ? obj.article_desc : globelResponse.article_desc)+'</strong>';
	//var radioContentPopUp2 = '<p class="notes"> ';
	var radioContentPopUp2 = '<p class="notes"> UOM : <strong>'+(obj.article_uom != undefined ? obj.article_uom : globelResponse.article_uom )+' </strong>';
	//var radioContentPopUp2 = '<p class="notes" style="padding-top: 6px;padding-left: 0px;"><strong>Select UOM:</strong> ';
	var tableContentPopUp = '';
	if (isBigw != 'true' ) {
		var hideTableBlock = ' hideBlock';// ganesh Defect_319
		for ( var i = 0; i < rplArray.length; i++) {

			if (i == 0) {// ganesh Defect_319
				hideTableBlock = '';
			} else {
				hideTableBlock = ' hideBlock';// ganesh Defect_319
			}
		if(rplArray[i].isis_ref_no == selectedArticleMPL){
			tableContentPopUp += '<form class="sc-mpl-edit-form"><table class="ContentTable sc-mpl-edit '
					+ hideTableBlock
					+ '" cellspacing="0"><tbody class="uomRadioTablePopUp rplPopUp'
					+ (rplArray[i].pack_break_uom == null ? ''
							: rplArray[i].pack_break_uom)
					+ i
					+ '"><tr data-mplupdate-bind isis-ref-no="'
					+ rplArray[i].isis_ref_no
					+ '" ><td width="20%">Current MPL:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
					+ (rplArray[i].curr_mpl == null
							|| rplArray[i].curr_mpl == undefined ? ''
							: Number(rplArray[i].curr_mpl).toFixed(0))
					+ '"><input class="editNumCell currentMpl AC_MPLSCD textbox textboxDefaultText" value="'
					+ (rplArray[i].curr_mpl == null
							|| rplArray[i].curr_mpl == undefined ? ''
							: Number(rplArray[i].curr_mpl).toFixed(0))
					+ '"></td><td width="20%">Current SC:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
					+ (rplArray[i].curr_sc == null
							|| rplArray[i].curr_sc == undefined ? ''
							: Number(rplArray[i].curr_sc).toFixed(0))
					+ '"><input  class="editNumCell AC_MPLSCD textbox currentSc textboxDefaultText" value="'
					+ (rplArray[i].curr_sc == null
							|| rplArray[i].curr_sc == undefined ? ''
							: Number(rplArray[i].curr_sc).toFixed(0))
					+ '"></td><td class="hideBlock" width="20%">Current Facing:</td><td width="15%" align="center" class="valueInfo currentFac hideBlock" data-prev-value="'
					+ (rplArray[i].curr_facing == null
							|| rplArray[i].curr_facing == undefined ? ''
							: Number(rplArray[i].curr_facing).toFixed(0))
					+ '">'
					+ (rplArray[i].curr_facing == null
							|| rplArray[i].curr_facing == undefined ? ''
							: Number(rplArray[i].curr_facing).toFixed(0))
					+ '</td></tr><tr><td width="20%">Previous MPL:</td><td width="15%" align="center" class="valueInfo">'
					+ (rplArray[i].prev_mpl == null ? '' : Number(
							rplArray[i].prev_mpl).toFixed(0))
					+ '</td><td width="20%">Previous SC:</td><td width="15%" align="center" class="valueInfo">'
					+ (rplArray[i].prev_sc == null ? '' : Number(
							rplArray[i].prev_sc).toFixed(0))
					+ '</td><td class="hideBlock" width="20%">Previous Facing:</td><td width="15%" align="center" class="valueInfo hideBlock">'
					+ (rplArray[i].prev_facing == null ? '' : Number(
							rplArray[i].prev_facing).toFixed(0))
					+ '</td></tr><tr class="lastRow"><td width="20%">Default MPL:</td><td width="15%" align="center" class="valueInfo">'
					+ (rplArray[i].default_mpl == null ? '' : Number(
							rplArray[i].default_mpl).toFixed(0))
					+ '</td><td width="20%">Default SC:</td><td width="15%" align="center" class="valueInfo">'
					+ (rplArray[i].default_sc == null ? '' : Number(
							rplArray[i].default_sc).toFixed(0))
					+ '</td><td class="hideBlock" width="20%">Default Facing:</td><td width="15%" align="center" class="valueInfo hideBlock">'
					+ (rplArray[i].default_facing == null ? '' : Number(
							rplArray[i].default_facing).toFixed(0))
					+ '</td></tr></tbody></table></form>';

			content1PopUp += '<input type="radio" name="searchByOptionsPopUp" complex-pbd-uom="'
					+ (rplArray[i].complex_pack_brk_uom == null ? ''
							: rplArray[i].complex_pack_brk_uom)
					+ '" value="'
					+ i
					+ '" id="rplPopUp'
					+ (rplArray[i].pack_break_uom == null ? ''
							: rplArray[i].pack_break_uom) + i + '" ';
			if (i == 0)
				content1PopUp += 'checked="checked" ><label for="rplPopUp'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
						+ i
						+ '" class="labelText">'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom) + '</label>';
			else
				content1PopUp += '><label for="rplPopUp'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
						+ i
						+ '" class="labelText">'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom) + '</label>';
			if ((complexPBDFlag == 'Y')) {
				content2PopUp += '<input type="radio" isis-ref-no="'
						+ rplArray[i].isis_ref_no
						+ '"  name="searchByOptionsPopUpUOM" value="'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
						+ '" id="rplPopUpUOM'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom) + i + '" ';
				if (i == 0)
					content2PopUp += 'checked="checked" ><label for="rplPopUpUOM'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ '</label>';
				else
					content2PopUp += '><label for="rplPopUpUOM'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ '</label>';
			}
		}
		}
		//$('#uomRadio').html(radioContentPopUp );
		$('#uomRadio').html(radioContentPopUp +radioContentPopUp2 + '</p>');
		$('#mplAndScTable').html(tableContentPopUp);
		$("#beforeHistory").removeClass(
		'hideBlock');
		$("#afterHistory").addClass(
		'hideBlock');
		
	}
}

function formMPLandSCContent() {
	if (rplArray.length > 0) {
		var content1PopUp = '';
		var content2PopUp = '';
		var radioContentPopUp = '<p class="notes"><strong>Select UOM:</strong>';
		var radioContentPopUp2 = '<p class="notes" style="padding-top: 6px;padding-left: 0px;"><strong>Select UOM:</strong> ';
		var tableContentPopUp = '';
		if (isBigw != 'true') {
			var hideTableBlock = ' hideBlock';// ganesh Defect_319
			for ( var i = 0; i < rplArray.length; i++) {

				if (i == 0) {// ganesh Defect_319
					hideTableBlock = '';
				} else {
					hideTableBlock = ' hideBlock';// ganesh Defect_319
				}
				tableContentPopUp += '<form class="sc-mpl-edit-form"><table class="ContentTable sc-mpl-edit '
						+ hideTableBlock
						+ '" cellspacing="0"><tbody class="uomRadioTablePopUp rplPopUp'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
						+ i
						+ '"><tr data-mplupdate-bind isis-ref-no="'
						+ rplArray[i].isis_ref_no
						+ '" ><td width="20%">Current MPL:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
						+ (rplArray[i].curr_mpl == null
								|| rplArray[i].curr_mpl == undefined ? ''
								: Number(rplArray[i].curr_mpl).toFixed(0))
						+ '"><input class="editNumCell currentMpl AC_MPLSCD textbox AC_MPLSCD textboxDefaultText" value="'
						+ (rplArray[i].curr_mpl == null
								|| rplArray[i].curr_mpl == undefined ? ''
								: Number(rplArray[i].curr_mpl).toFixed(0))
						+ '"></td><td width="20%">Current SC:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
						+ (rplArray[i].curr_sc == null
								|| rplArray[i].curr_sc == undefined ? ''
								: Number(rplArray[i].curr_sc).toFixed(0))
						+ '"><input  class="editNumCell AC_MPLSCD textbox currentSc textboxDefaultText" value="'
						+ (rplArray[i].curr_sc == null
								|| rplArray[i].curr_sc == undefined ? ''
								: Number(rplArray[i].curr_sc).toFixed(0))
						+ '"></td><td class="hideBlock" width="20%">Current Facing:</td><td width="15%" align="center" class="valueInfo currentFac hideBlock" data-prev-value="'
						+ (rplArray[i].curr_facing == null
								|| rplArray[i].curr_facing == undefined ? ''
								: Number(rplArray[i].curr_facing).toFixed(0))
						+ '">'
						+ (rplArray[i].curr_facing == null
								|| rplArray[i].curr_facing == undefined ? ''
								: Number(rplArray[i].curr_facing).toFixed(0))
						+ '</td></tr><tr><td width="20%">Previous MPL:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].prev_mpl == null ? '' : Number(
								rplArray[i].prev_mpl).toFixed(0))
						+ '</td><td width="20%">Previous SC:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].prev_sc == null ? '' : Number(
								rplArray[i].prev_sc).toFixed(0))
						+ '</td><td class="hideBlock" width="20%">Previous Facing:</td><td width="15%" align="center" class="valueInfo hideBlock">'
						+ (rplArray[i].prev_facing == null ? '' : Number(
								rplArray[i].prev_facing).toFixed(0))
						+ '</td></tr><tr class="lastRow"><td width="20%">Default MPL:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].default_mpl == null ? '' : Number(
								rplArray[i].default_mpl).toFixed(0))
						+ '</td><td width="20%">Default SC:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].default_sc == null ? '' : Number(
								rplArray[i].default_sc).toFixed(0))
						+ '</td><td class="hideBlock" width="20%">Default Facing:</td><td width="15%" align="center" class="valueInfo hideBlock">'
						+ (rplArray[i].default_facing == null ? '' : Number(
								rplArray[i].default_facing).toFixed(0))
						+ '</td></tr></tbody></table></form>';

				content1PopUp += '<input type="radio" name="searchByOptionsPopUp" complex-pbd-uom="'
						+ (rplArray[i].complex_pack_brk_uom == null ? ''
								: rplArray[i].complex_pack_brk_uom)
						+ '" value="'
						+ i
						+ '" id="rplPopUp'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom) + i + '" ';
				if (i == 0)
					content1PopUp += 'checked="checked" ><label for="rplPopUp'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom) + '</label>';
				else
					content1PopUp += '><label for="rplPopUp'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom) + '</label>';
				if ((complexPBDFlag == 'Y')) {
					content2PopUp += '<input type="radio" isis-ref-no="'
							+ rplArray[i].isis_ref_no
							+ '"  name="searchByOptionsPopUpUOM" value="'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ '" id="rplPopUpUOM'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom) + i + '" ';
					if (i == 0)
						content2PopUp += 'checked="checked" ><label for="rplPopUpUOM'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ i
								+ '" class="labelText">'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ '</label>';
					else
						content2PopUp += '><label for="rplPopUpUOM'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ i
								+ '" class="labelText">'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ '</label>';
				}
			}
		} else {
			var hideTableBlock = ' hideBlock';// ganesh Defect_319
			for ( var i = 0; i < rplArray.length; i++) {

				if (i == 0) {
					hideTableBlock = '';// ganesh Defect_319
				} else {
					hideTableBlock = ' hideBlock';// ganesh Defect_319
				}
				tableContentPopUp += '<form class="sc-mpl-edit-form"><table class="ContentTable sc-mpl-edit '
						+ hideTableBlock
						+ '" cellspacing="0"><tbody class="uomRadioTablePopUp rplPopUp'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom)
						+ i
						+ '"><tr data-mplupdate-bind isis-ref-no="'
						+ rplArray[i].isis_ref_no
						+ '" ><td width="20%">Current MPL:</td><td width="15%" align="center" class="valueInfo currentMpl" data-prev-value="'
						+ (rplArray[i].curr_mpl == null ? '' : Number(
								rplArray[i].curr_mpl).toFixed(0))
						+ '">'
						+ (rplArray[i].curr_mpl == null ? '' : Number(
								rplArray[i].curr_mpl).toFixed(0))
						+ '</td><td width="20%">Current SC:</td><td width="15%" align="center" class="valueInfo currentSc" data-prev-value="'
						+ (rplArray[i].curr_sc == null ? '' : Number(
								rplArray[i].curr_sc).toFixed(0))
						+ '">'
						+ (rplArray[i].curr_sc == null ? '' : Number(
								rplArray[i].curr_sc).toFixed(0))
						+ '</td><td width="20%">Current Facing:</td><td width="15%" align="center" class="valueInfo" data-prev-value="'
						+ (rplArray[i].curr_facing == null ? '' : Number(
								rplArray[i].curr_facing).toFixed(0))
						+ '"><input  class="editNumCell AC_MPLSCD textbox currentFac textboxDefaultText" value="'
						+ (rplArray[i].curr_facing == null ? '' : Number(
								rplArray[i].curr_facing).toFixed(0))
						+ '"></td></tr><tr><td width="20%">Previous MPL:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].prev_mpl == null ? '' : Number(
								rplArray[i].prev_mpl).toFixed(0))
						+ '</td><td width="20%">Previous SC:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].prev_sc == null ? '' : Number(
								rplArray[i].prev_sc).toFixed(0))
						+ '</td><td width="20%">Previous Facing:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].prev_facing == null ? '' : Number(
								rplArray[i].prev_facing).toFixed(0))
						+ '</td></tr><tr class="lastRow"><td width="20%">Default MPL:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].default_mpl == null ? '' : Number(
								rplArray[i].default_mpl).toFixed(0))
						+ '</td><td width="20%">Default SC:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].default_sc == null ? '' : Number(
								rplArray[i].default_sc).toFixed(0))
						+ '</td><td width="20%">Default Facing:</td><td width="15%" align="center" class="valueInfo">'
						+ (rplArray[i].default_facing == null ? '' : Number(
								rplArray[i].default_facing).toFixed(0))
						+ '</td></tr></tbody></table></form>';

				content1PopUp += '<input type="radio" name="searchByOptionsPopUp" complex-pbd-uom="'
						+ (rplArray[i].complex_pack_brk_uom == null ? ''
								: rplArray[i].complex_pack_brk_uom)
						+ '" value="'
						+ i
						+ '" id="rplPopUp'
						+ (rplArray[i].pack_break_uom == null ? ''
								: rplArray[i].pack_break_uom) + i + '" ';
				if (i == 0)
					content1PopUp += 'checked="checked" ><label for="rplPopUp'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom) + '</label>';
				else
					content1PopUp += '><label for="rplPopUp'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ i
							+ '" class="labelText">'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom) + '</label>';
				if ((complexPBDFlag == 'Y')) {
					content2PopUp += '<input type="radio" isis-ref-no="'
							+ rplArray[i].isis_ref_no
							+ '" name="searchByOptionsPopUpUOM" value="'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom)
							+ '" id="rplPopUpUOM'
							+ (rplArray[i].pack_break_uom == null ? ''
									: rplArray[i].pack_break_uom) + i + '" ';
					if (i == 0)
						content2PopUp += 'checked="checked" ><label for="rplPopUpUOM'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ i
								+ '" class="labelText">'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ '</label>';
					else
						content2PopUp += '><label for="rplPopUpUOM'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ i
								+ '" class="labelText">'
								+ (rplArray[i].pack_break_uom == null ? ''
										: rplArray[i].pack_break_uom)
								+ '</label>';
				}

			}

		}
		$('#uomRadio').html(radioContentPopUp + content1PopUp + '</p>');
		if ((complexPBDFlag == 'Y')) {
			$('#fullHstryUomRadioCntnt').html('');
			$('#fullHstryUomRadioCntnt').html(
					radioContentPopUp2 + content2PopUp + '</p>');
			var optionList = [ {
				id : 'MPL',
				value : 'M'
			}, {
				id : 'SC',
				value : 'S'
			}, {
				id : 'Facing',
				value : 'F'
			} ];

			if (isBigw != 'true')
				optionList.splice(2, 1);
			var hiddenContent = '';
			for ( var i = 0; i < rplArray.length; i++) {
				for ( var j = 0; j < optionList.length; j++) {
					hiddenContent += '<input type="hidden" id="'
							+ rplArray[i].pack_break_uom + optionList[j].value
							+ 'CallFlag" value="false">';
				}
			}
			$('#fullHstryUomRadioCntnt').append(hiddenContent);

			for ( var i = 0; i < rplArray.length; i++) {
				var rplId = 'rplPopUpUOM' + rplArray[i].pack_break_uom + i;
				$('#' + rplId).click(function() {
					bindReplenishmentUomClickHistoryPopUp(this);
				});
				if (i == 0) {
					$('#' + rplId).prop('checked', true);
				}
			}

		} else {
			$('#fullHstryUomRadioCntnt').html('');
		}
		$('#mplAndScTable').html(tableContentPopUp);
		for ( var i = 0; i < rplArray.length; i++) {
			var rplId = 'rplPopUp' + rplArray[i].pack_break_uom + i;
			$('#' + rplId).click(function() {
				bindReplenishmentUomClickPopUp(this.id);
			});
			if (i == 0) {
				$('#' + rplId).prop('checked', true);
			}
		}

		$('.currentMpl').isWithin9999();
		$('.currentSc').isWithin9999();
		$('.currentFac').isWithin9999();

	} else {
		var error = '<table class="ContentTable" cellspacing="0"><tbody id="mplAndScErrorTable"></tbody></table>';
		$('#mplAndScTable').html(error);
		$('#mplAndScErrorTable')
				.html(
						'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
	}

	// getLast2FullHistory();

}

function bindExpireRowClickEvents(id) {
	/* when edit button is clicked displays input box in editable cells */
	$(("#editExpiryRecordBtn-").concat(id)).click(function() {

		$(("#rowExpiry-").concat(id)).addClass('rowHighlight');

		/*
		 * $(("#aisleEdit-").concat(id)).removeClass('hideBlock');
		 * $(("#aisle-").concat(id)).addClass('hideBlock');
		 */

		$(("#expDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#expDate-").concat(id)).addClass('hideBlock');

	/*	$(("#saveExpiryRecord-").concat(id)).removeClass('hideBlock');
		$(("#editExpiryRecord-").concat(id)).addClass('hideBlock');*/

	});

	/* when save button is clicked displays input box is disabled */
	$(("#saveExpiryRecord-").concat(id)).click(
			function() {

				clearAllErrors();
				var $parentElem = $(this).closest('tr');
				var expDate = $parentElem.find('input').val();
				if (validateExpireDateSave(expDate)) {
					$(("#rowExpiry-").concat(id)).find('input,select').parent()
							.each(
									function() {
										try {
											var labelid = $(this).attr('id')
													.split('-')[0].replace(
													'Edit', '');
											$(("#" + labelid + '-').concat(id))
													.text(
															$(this).find(
																	'input')
																	.val());
										} catch (err) {

										}
									});

					$(("#rowExpiry-").concat(id)).removeClass('rowHighlight');

					/*
					 * $(("#aisleEdit-").concat(id)).addClass('hideBlock');
					 * $(("#aisle-").concat(id)).removeClass('hideBlock');
					 */

					$(("#expDateEdit-").concat(id)).addClass('hideBlock');
					$(("#expDate-").concat(id)).removeClass('hideBlock');

					$(("#saveExpiryRecord-").concat(id)).addClass('hideBlock');
					$(("#editExpiryRecord-").concat(id)).removeClass(
							'hideBlock');

					expDate = $parentElem.find('.expDate').text();
					var selectedUom = $(
							'input[name="searchByOptionsExpPopUp"]:checked')
							.val();
					// get the inputs
					callServiceToUpdateExpiryDate(expDate, selectedUom, 'I',
							this.id);
				}

			});

	$("#DeleteExpiryRecord-" + id).click(function(e) {
		/*clearAllErrors();
		confirmation(confirmmsg, $(this));*/
		var $parentElem = $(this).closest('tr');			// removed pop-up as per Defect_9971
		var expDate = $parentElem.find('.expDate').text();
		var selectedUom = $parentElem.find('.uomPass').text();
		var rowID = ((this.id).split('-')[1] != undefined ? (this.id).split('-')[1] : $(this).closest('tr').index());		// id passing
		deleteFlag=true;
		callServiceToUpdateExpiryDate(expDate, selectedUom, 'X', rowID);
		clearAllErrors();
		if ($('#expireDatePopUpTable').html() == '')
			$('#expireDatePopUpTable').closest('table').addClass('hideBlock');
		else
			$('#expireDatePopUpTable').closest('table').removeClass('hideBlock');
	});

	Date.format = 'dd/mm/yy';
	$(".inputDateInput").datepicker({
		zIndex : 50
	});

	$(".inputDate").datepicker({
		zIndex : 50
	});
}

function confirmation(msg, elem) {

	$.fn.warnPopup('warn', msg, 'Confirmation', triggerDeleteYes,
			triggerDeleteNo, '', elem, okButtons);

}

var triggerDeleteYes = function(e) {
	var $popUp = e.data.msg;
	var elem = e.data.cache;

	var $parentElem = $(elem).closest('tr');
	var expDate = $parentElem.find('.expDate').text();
	var selectedUom = $parentElem.find('.uomPass').text();
	//var selectedUom = $('input[name="searchByOptionsExpPopUp"]:checked').val();
	// get the inputs
	deleteFlag=true;
	callServiceToUpdateExpiryDate(expDate, selectedUom, 'X', elem.id);
	clearAllErrors();
	//$parentElem.remove();

	if ($('#expireDatePopUpTable').html() == '')
		$('#expireDatePopUpTable').closest('table').addClass('hideBlock');
	else
		$('#expireDatePopUpTable').closest('table').removeClass('hideBlock');

	$popUp.dialog('close');
};

var triggerDeleteNo = function(e) {
	var $elem = e.data.msg;
	clearAllErrors();
	$elem.dialog('close');
};

function bindReplenishmentUomClickPopUp(id) {

	$('.uomRadioTablePopUp').closest('table').addClass('hideBlock');
	$('.' + id).closest('table').removeClass('hideBlock');

}

function bindReplenishmentUomClickHistoryPopUp(obj) {
	clearAllErrors();
	var selectedUom = $('input[name="searchByOptionsPopUpUOM"]:checked').val();
	var $dataRow = $('input[name="searchByOptionsPopUpUOM"]:checked');
	var selectedArticleNo = $dataRow.attr('isis-ref-no');
	$('.fullHstryRow').addClass('hideBlock');
	var selectedValue = $('input[name="searchByMPLSCPBD"]:checked').val();
	var selectedText = $('input[name="searchByMPLSCPBD"]:checked').attr('id');
	if ($('#' + selectedUom + selectedValue + 'CallFlag').val() == 'false') {
		getFullHistory(selectedText, selectedValue, selectedArticleNo,
				selectedUom);
	} else {
		$('.fullHstry' + selectedUom + selectedValue).removeClass('hideBlock');
	}

}

function callServiceToUpdateMpl() {
	// if (isBigw != 'true') {
	var $dataRow = $('#mplAndScTable').find('tr[data-mplupdate-bind]:visible');
	var oldMPLValue;
	var newMPLValue;
	var oldSCValue;
	var newSCValue;
	var oldFCValue;
	var newFCValue;
	var mplChng = 'N';
	var scChng = 'N';
	var fcChng = 'N';
	var loggedInUser = $('#loginUserId').val();
	var sessionId = '100';
	var oldValues = [];
	var setArticleUomFlg = true;
	var selectedUom = $('input[name="searchByOptionsPopUp"]:checked').next(
			'label').text().trim();
	var selectedArticleNo = articleNo;
	if ((complexPBDFlag == 'Y')) {
		selectedArticleNo = $dataRow.attr('isis-ref-no');
		console.log('selectedArticleNo ' + selectedArticleNo);
		selectedUom = $('input[name="searchByOptionsPopUp"]:checked').attr(
				'complex-pbd-uom');
		if(selectedUom == undefined){
			for(var i=0;i<rplArray.length;i++){
				if(rplArray[i].isis_ref_no == selectedArticleNo){
					selectedUom = rplArray[i].complex_pack_brk_uom;
					setArticleUomFlg = false;
				}
			}
		}
		if(setArticleUomFlg){
			selectedUom = articleMplScUom;
		}
			
		console.log('selectedUom ' + selectedUom);
	}
	$dataRow.find('td.valueInfo').each(function() {
		var value = $(this).attr('data-prev-value');
		oldValues.push(value);
	});
	oldMPLValue = oldValues[0];
	newMPLValue = ($dataRow.find('.currentMpl').val() != undefined && $dataRow
			.find('.currentMpl').val() != '') ? $dataRow.find('.currentMpl')
			.val() : $dataRow.find('.currentMpl').text().trim();
	oldSCValue = oldValues[1];
	newSCValue = ($dataRow.find('.currentSc').val() != undefined && $dataRow
			.find('.currentSc').val() != '') ? $dataRow.find('.currentSc')
			.val() : $dataRow.find('.currentSc').text().trim();
	oldFCValue = oldValues[2];
	newFCValue = ($dataRow.find('.currentFac').val() != undefined && $dataRow
			.find('.currentFac').val() != '') ? $dataRow.find('.currentFac')
			.val() : $dataRow.find('.currentFac').text().trim();
	if (isBigw != 'true') {
		if (oldMPLValue != newMPLValue) {
			mplChng = 'Y';
			if (newMPLValue == '0') {
				showAllErrorsInEdit('MPL should be greater than 0.');
				$dataRow.find('.currentMpl').val(oldMPLValue);
				return false;
			}
		}
		if (oldSCValue != newSCValue) {
			scChng = 'Y';
			if (newSCValue == '0') {
				showAllErrorsInEdit('SC should be greater than 0.');
				$dataRow.find('.currentSc').val(oldSCValue);
				return false;
			}
		}
		oldFCValue = newFCValue;
	} else {
		if (oldFCValue != newFCValue) {
			fcChng = 'Y';
			if (newFCValue == '0') {
				showAllErrorsInEdit('Facing should be greater than 0.');
				$dataRow.find('.currentFac').val(oldFCValue);
				return false;
			}
		}

		//newSCValue = oldMPLValue;
		//newMPLValue = oldMPLValue;
		if(oldFCValue!=null && oldFCValue!='' && Number(oldFCValue)!=0 && newFCValue!=null && newFCValue!='' && Number(newFCValue)!=0){
			oldFCValue = Number(oldFCValue);
			newMPLValue = Math.trunc(Number(newFCValue) * (Number(oldMPLValue)/Number(oldFCValue)));
			newSCValue = Math.trunc(Number(newFCValue) * (Number(oldSCValue)/Number(oldFCValue)));
		}else{
			newMPLValue = oldMPLValue;
			newSCValue = oldSCValue;
		}
		if (oldMPLValue != newMPLValue) {
			mplChng = 'Y';
		}
		if (oldSCValue != newSCValue) {
			scChng = 'Y';
		}
	}
	if (isBigw != 'true') {
		if (scChng == 'N' && mplChng == 'N') {
			showAllErrorsInEdit('No changes in values.');
			return false;
		} else if (Number(newSCValue) < Number(newMPLValue)) {// Ganesh:Fix
			// for
			// Defect_294
			showAllErrorsInEdit('MPL should be less than or equal to SC.');
			$dataRow.find('.currentSc').val(oldSCValue);
			$dataRow.find('.currentMpl').val(oldMPLValue);
			return false;
		} else {// Start of else condition Defect 266
			var param = {
				"iv_article" : selectedArticleNo,
				"iv_uom" : selectedUom,
				"iv_session_id" : sessionId,
				"iv_user_id" : loggedInUser,
				"iv_mpl_old" : oldMPLValue,
				"iv_sc_old" : oldSCValue,
				"iv_facing_old" : oldFCValue,
				"iv_sc_new" : newSCValue,
				"iv_facing_new" : newFCValue,
				"iv_mpl_new" : newMPLValue,
				"iv_mpl_change" : mplChng,
				"iv_sc_change" : scChng,
				"iv_facing_change" : fcChng

			};
			console.log(updateMPLandSCURL + JSON.stringify(param));
			$
					.ajax({
						type : "post",
						url : updateMPLandSCURL,
						data : JSON.stringify(param),
						beforeSend : function() {
							clearAllErrors();
							startLoading();
						},
						success : function(response) {
							// $("#dialog-editFunctions").dialog("close");
							// $('#repTabF').val('0');
							// $('#repTabF').trigger('click');
							if (response.length > 0) {
								if (response[0].ErrorMsg != undefined)
									showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
								else if (response[0].msg_type == 'S') {
									// callPriceHistory();// ganesh: Defect_321
									if ((selectedUom == articleUom || isRandomWghtArticle) && globelResponse.article_no == selectedArticleNo) {		// base article alone MPL & SC updated
										$('#minPresLevelValue').text(
												Number(newMPLValue).toFixed(0));		//Defect_10397
										$('#shelfcapacityValue').text(
												Number(newSCValue).toFixed(0));
									}
									$('#repTabF').val('0');
									$('#repTab').trigger('click');
									// FIX for Defect_6443 -
									// SMKT_REGRESSION_Lookup_UI issues in
									// messages in lookup
									$.fn.showCustomMsg([ response[0].msg ],
											success, "Article Lookup");

									/*
									 * showStatusContent('', '<li>' +
									 * response[0].msg + '</li>');
									 */
									$("#dialog-editFunctions").dialog("close");
								} else if (response[0].msg_type == 'E') {
									showAllErrorsInEdit('' + response[0].msg
											+ '');
									$dataRow.find('.currentSc').val(oldSCValue);
									$dataRow.find('.currentMpl').val(
											oldMPLValue);
								}
							}
							stopLoading();

						},
						error : function(response) {
							showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
							stopLoading();
						},
					});
			// }
		}// End of else condition
	} else if (isBigw == 'true') {
		if (fcChng == 'N') {
			showAllErrorsInEdit('No changes in values.');
			return false;
		} else if (Number(newSCValue) < Number(newMPLValue)) {// Ganesh:Fix
			// for
			// Defect_294
			showAllErrorsInEdit('MPL should be less than or equal to SC.');
			$dataRow.find('.currentSc').val(oldSCValue);
			$dataRow.find('.currentMpl').val(oldMPLValue);
			return false;
		} else {// Start of else condition Defect 266
			var param = {
				"iv_article" : articleNo,
				"iv_uom" : selectedUom,
				"iv_session_id" : sessionId,
				"iv_user_id" : loggedInUser,
				"iv_mpl_old" : oldMPLValue,
				"iv_sc_old" : oldSCValue,
				"iv_facing_old" : oldFCValue,
				"iv_sc_new" : newSCValue,
				"iv_facing_new" : newFCValue,
				"iv_mpl_new" : newMPLValue,
				"iv_mpl_change" : mplChng,
				"iv_sc_change" : scChng,
				"iv_facing_change" : fcChng

			};
			console.log(updateMPLandSCURL + JSON.stringify(param));
			$
					.ajax({
						type : "post",
						url : updateMPLandSCURL,
						data : JSON.stringify(param),
						beforeSend : function() {
							clearAllErrors();
							startLoading();
						},
						success : function(response) {
							// $("#dialog-editFunctions").dialog("close");
							// $('#repTabF').val('0');
							// $('#repTabF').trigger('click');
							if (response.length > 0) {
								if (response[0].ErrorMsg != undefined)
									showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
								else if (response[0].msg_type == 'S') {
									// callPriceHistory();// ganesh: Defect_321
									if (selectedUom == articleUom) {
										$('#minPresLevelValue').text(
												Number(newMPLValue).toFixed(0));
										$('#shelfcapacityValue').text(
												Number(newSCValue).toFixed(0));
										$('#facingsValue').text(
												Number(newFCValue).toFixed(0));
									}
									$('#repTabF').val('0');
									$('#repTab').trigger('click');

									// FIX for Defect_6443 -
									// SMKT_REGRESSION_Lookup_UI issues in
									// messages in lookup
									$.fn.showCustomMsg([ response[0].msg ],
											success, "Article Lookup");
									/*
									 * showStatusContent('', '<li>' +
									 * response[0].msg + '</li>');
									 */
									$("#dialog-editFunctions").dialog("close");
								} else if (response[0].msg_type == 'E') {
									showAllErrorsInEdit('' + response[0].msg
											+ '');
									$dataRow.find('.currentSc').val(oldSCValue);
									$dataRow.find('.currentMpl').val(
											oldMPLValue);
								}
							}
							stopLoading();

						},
						error : function(response) {
							showAllErrorsInEdit('Technical Issue occured. Please contact technical support.');
							stopLoading();
						},
					});
			// }
		}// End of else condition
	}
}

function populateHeaderDetails(obj) {
	$('#promoPrice').text('');
	$('#proDateInfo').text('');		//Defect_9595
	$('#standardPrice').text(
			'$ '
					+ (obj.standard_sell_price == null
							|| obj.standard_sell_price == undefined ? ''
							: Number(obj.standard_sell_price).toFixed(2)));
	if ((obj.promo_sell_price == '' || obj.promo_sell_price == null || obj.promo_sell_price == undefined)
			&& (obj.promo_start_date == '' || obj.promo_start_date == null || obj.promo_start_date == undefined)
			&& (obj.promo_end_date == '' || obj.promo_end_date == null || obj.promo_end_date == undefined)) {
		$('.promoLabel').addClass('hideBlock');
	} else {
		$('.promoLabel').removeClass('hideBlock');
		$('#promoPrice').text(
				'$ '
						+ (obj.promo_sell_price == null
								|| obj.promo_sell_price == undefined ? ''
								: Number(obj.promo_sell_price).toFixed(2)));
		$('#proDateInfo')
				.text(
						'('
								+ ((obj.promo_start_date != null
										&& obj.promo_start_date != ""
										&& obj.promo_start_date != undefined && obj.promo_start_date != "null") ? getPromodateInFormat(obj.promo_start_date)
										: '')
								+ ' - '
								+ ((obj.promo_end_date != null
										&& obj.promo_end_date != ""
										&& obj.promo_end_date != undefined && obj.promo_end_date != "null") ? getPromodateInFormat(obj.promo_end_date)
										: '') + ')');
		if ($('#proDateInfo').text() == '( - )') {
			$('#proDateInfo').addClass('hideBlock');
		} else {
			$('#proDateInfo').removeClass('hideBlock');
		}
	}

	if (obj.offer_flag == 'Y')
		$('.offers').removeClass('hideBlock');
	else
		$('.offers').addClass('hideBlock');

	// need to remove
	/*
	 * if(articleNo == '190702') obj.ranged_flag = "N";
	 */// / need to change to Y
	if (obj.ranged_flag == 'Y') {
		$('.rangedInd').removeClass('hideBlock');
		$('.notRangedInd').addClass('hideBlock');
		$('#editActions').removeClass('hideButtons');
		$('.buttonMenu ').removeClass('hideButtons');
		$('.buttonMenu ').css('display', '');
		/*
		 * if(articleNo == '190702') rangedFlag = "N"; /// need to change to Y
		 * else
		 */
		rangedFlag = "Y";
	} else {
		$('.rangedInd').addClass('hideBlock');
		$('.notRangedInd').removeClass('hideBlock');
		$('#editActions').addClass('hideButtons');
		$('.buttonMenu ').addClass('hideButtons');
		rangedFlag = "N";
	}
	$('#aisleInfo').html(
			'Aisle '
					+ (obj.aisle != null && obj.aisle != undefined ? obj.aisle
							: '')
					+ ' / Bay '
					+ (obj.bay != null && obj.bay != undefined ? obj.bay : '')
					+ ' / Shelf '
					+ (obj.shelf != null && obj.shelf != undefined ? obj.shelf
							: '') + '');
	
	displayImageForAnArticle(obj.article_no);

	if (obj.perpetual_flag == 'Y') {
		$('#perpInd').html('<label class="positiveFlag">Perpetual</label>');
		nonPiItem = false;
	} else {
		$('#perpInd')
				.html('<label class="negativeFlag ">Not Perpetual</label>');
		nonPiItem = true;
	}

	if (obj.sales_return_flag == 'Y')
		$('#saleInd')
				.html('<label class="positiveFlag">Sale or Return</label>');
	else
		$('#saleInd')
				.html('<label class="negativeFlag">Sale or Return</label>');

	packBreakInd = (obj.pack_break_down_flag != null
			&& obj.pack_break_down_flag != undefined ? obj.pack_break_down_flag
			: 'N');
	complexPBDFlag = (obj.complex_pbd_flag != null
			&& obj.complex_pbd_flag != undefined ? obj.complex_pbd_flag : 'N');

	if (packBreakInd == 'Y' || complexPBDFlag == 'Y') {
		$('#packBrkInd').html(
				'<label class="positiveFlag">Pack Breakdown</label>');
		$('#packBrkInd').removeClass('hideBlock');
	} else {
		$('#packBrkInd').html(
				'<label class="positiveFlag hideBlock">Pack Breakdown</label>');
		$('#packBrkInd').addClass('hideBlock');
	}

	if ((complexPBDFlag == 'Y')) {
		$('.paraNotes').removeClass('notesPaddingFix').addClass(
				'notesPaddingFix');
		$('.pbd-uom').addClass('hideBlock').removeClass('hideBlock');
		$('.PBDNotes').addClass('hideBlock').removeClass('hideBlock');
		$('.nonPBDNotes').removeClass('hideBlock').addClass('hideBlock');

	} else {
		$('.paraNotes').addClass('notesPaddingFix').removeClass(
				'notesPaddingFix');
		$('.pbd-uom').removeClass('hideBlock').addClass('hideBlock');
		$('.PBDNotes').removeClass('hideBlock').addClass('hideBlock');
		$('.nonPBDNotes').addClass('hideBlock').removeClass('hideBlock');
	}
	/*
	 * article_uom_desc aricle_life_cycle_info days_on_hand linked_article_flag
	 * sales_set_flag for_sales_flag order_uom_desc order_uom
	 */

	if (obj.linked_article_flag == 'Y')
		$('#linkArtInd').html(
				'<label class="positiveFlag">Linked Article</label>');
	else
		$('#linkArtInd').html('');

	$('#flagValue').text('');
	$('#flagValue').addClass('hideBlock');
	$('#flagValueForRecall').text('');
	$('#flagValueForRecall').addClass('hideBlock');

	if (obj.ps_article_status == '08') {
		$('#flagValueForRecall').text('Product Recall');
		isRecalled = true;
	} else if (obj.ps_article_status == '02') {

		$('#flagValueForRecall').text('Blocked');

	} else if (obj.ps_article_status == 'ZA') {
		isArchived = true;
	} else {
		isArchived = false;
		isRecalled = false;
	}

	if (obj.recall_flag == 'Y' && obj.ranged_flag != 'Y') {

		$('#flagValueForRecall').text('Product Recall');
		isRecalled = true;

	}

	if (obj.ps_article_status == undefined && obj.ranged_flag != 'Y') {

		isRecalled = true;

	}

	if (obj.sales_return_flag == 'Y' && obj.ranged_flag != 'Y') {
		$('#flagValue').text('Not For Sale');
		isRecalled = true;

	}

	if (obj.not_for_sale == 'Y') {
		$('#flagValue').text('Not For Sale');
	}

	if (obj.delete_ind == 'Y') {
		$('#flagValue').text('Deleted');
		isDeleted = true;
	} else {
		isDeleted = false;
	}

	if ($('#flagValue').text() == '')
		$('#flagValue').addClass('hideBlock');
	else{
		$('#flagValue').removeClass('hideBlock');
		$('#rangingAction').addClass('hideButtons');
	}
	
	if ($('#flagValueForRecall').text() == '')
		$('#flagValueForRecall').addClass('hideBlock');
	else{
		$('#flagValueForRecall').removeClass('hideBlock');		
	}

	if (obj.alc_status != ''
			&& (obj.alc_status == 'ES' || obj.alc_status == 'EC' || obj.alc_status == undefined)) {
		isALCStatus = true;
	} else {
		isALCStatus = false;
	}
	if (((obj.allow_only_initial_count || '') == 'Y')) {
		$('#sohValue').text('0');
	} else {
		if(nonPiItem)
			{
			$('#sohValue').text('');
			}
		else{										//Defect_9649 
			var sohVal =deciValues(
					obj.random_weight_flag,
					((obj.weighted_article_flag == 'Y' || obj.allow_decimal_adj == 'Y') ? 'Y'
							: 'N'), obj.linked_article_flag,
					obj.pack_break_down_flag, obj.soh, obj.pi_soh,
					obj.article_type, obj.article_uom, true,
					'articleLookup', obj.pi_uom);
			console.log(sohVal);
			var addVal ='';
			if(sohVal > 0){ 
			    addVal = ((obj.order_uom != null && obj.order_uom != '' && obj.order_uom != obj.article_uom) ? " (" + Math.floor(obj.soh / obj.om) + " " + obj.order_uom + " & " + (Math.round((obj.soh % obj.om) * 1e3) / 1e3) + " " + obj.article_uom + ")" : '');			
			console.log(addVal);
			}else {
				addVal = '';
			}
			
			var actualSoh = '';
			if(obj.random_weight_flag != 'Y' /*&& (obj.weighted_article_flag != 'Y' || obj.allow_decimal_adj != 'Y'*/){
				actualSoh = sohVal+' '+obj.article_uom+' '+(addVal);
			}else{
				actualSoh = sohVal;
			}
		$('#sohValue')
				.text(actualSoh).removeClass(
						'hideBlock');// ;//defect no 6066
		}
	}

	// Need to uncomment once soh value is fixed
	// if (obj.soh == null) $('#sohValue').removeClass('navigate');

	$('#minPresLevelValue').text(
			obj.mpl == null || obj.mpl == undefined ? '' : Number(obj.mpl)
					.toFixed(0));
	if(obj.ranged_flag == 'N' || isBigw){						// not ranged navigation removed
		$('#minPresLevelValue').removeClass('navigate').attr('title',false).css('cursor',
		'default').css('color', '#222222').attr("onclick", false);
	}else {
		$('#minPresLevelValue').addClass('navigate').attr('title','Adjust MPL/SC').attr("onclick",'attachMPLScreen()').removeAttr('style');
	}
	$('#shelfcapacityValue').text(
			obj.shelf_capacity == null || obj.shelf_capacity == undefined ? ''
					: Number(obj.shelf_capacity).toFixed(0));
	if(obj.ranged_flag == 'N' || isBigw){						// not ranged navigation removed
		$('#shelfcapacityValue').removeClass('navigate').attr('title',false).css('cursor',
		'default').css('color', '#222222').attr("onclick", false);
	}else {
		$('#shelfcapacityValue').addClass('navigate').attr('title','Adjust MPL/SC').attr("onclick",'attachMPLScreen()').removeAttr('style');
	}
	$('#inTransitValue').text(
			obj.sit == null || obj.sit == undefined ? '' : Math.floor(obj.sit));
	$('.onOrderValue').text(
			obj.soo == null || obj.soo == undefined ? '' : Math.floor(obj.soo));
	if (obj.soo == null) {
		$('#openOrdersLink').addClass('brudcrumHide');
	}else{
		$('#openOrdersLink').removeClass('brudcrumHide');
	}
	$('#facingsValue').text(
			obj.facing == null || obj.facing == undefined ? '' : Number(
					obj.facing).toFixed(0));
	if(obj.ranged_flag == 'N'){						// not ranged navigation removed
		$('#facingsValue').removeClass('navigate').attr('title',false).css('cursor',
		'default').css('color', '#222222').attr("onclick", false);
	}else {
		$('#facingsValue').addClass('navigate').attr('title','Adjust MPL/SC').attr("onclick",'attachMPLScreen()').removeAttr('style');
	}
	$('#ltoOversValue').text(
			(obj.lto == null || obj.lto == undefined) ? '' : ((obj.allow_decimal_adj != 'Y') ? obj.lto : Number(obj.lto).toFixed(3)));
	/*$('#omValue').text(
			obj.om == null || obj.om == undefined ? '' : Number(obj.om)
					.toFixed(0));*/	
	//17.06 ZEA/ZKG OM Value changes
	$('#omValue').text(
			(obj.om == null || obj.om == undefined ? '' : ((obj.om.toString().split('.')[1] > 0)?Number(obj.om): Number(obj.om).toFixed(0))
	)+' '+obj.article_uom );
	var sourceOfSupplyInd = (obj.source == null || obj.source == undefined) ? ''
			: obj.source;
	var source = '';
	if (sourceOfSupplyInd != '') {
		if (sourceOfSupplyInd == '1') {
			source = 'Vendor';
		} else if (sourceOfSupplyInd == '2') {
			source = 'Warehouse';
		}else{		//Defect_9197 - source
			source = sourceOfSupplyInd;
		}
	}
	$('#sourceValue').text(source);
	$('#supplierNoValue').text(
			obj.supplier_no == null || obj.supplier_no == undefined ? ''
					: obj.supplier_no);
	$('#supplierNameValue').text(
			obj.supplier_name == null || obj.supplier_name == undefined ? ''
					: obj.supplier_name.trim());
	$('#eanValue').text(obj.ean == null || obj.ean == undefined ? '' : obj.ean);
	$('#uomValue').text(articleUom);
	$('#pluValue').text(obj.plu == null || obj.plu == undefined ? '' : obj.plu);
	$('#brandValue').text(
			obj.brand == null || obj.brand == undefined ? '' : obj.brand);

	// For non ranged articles
	if (rangedFlag == 'N') {
		articleGST = obj.gst_rate;
		articleSellGrp = obj.sell_price_grp;
	}
	if(obj.complex_pbd_flag == 'Y'){
		isCPBDarticle = true;
	}else {
		isCPBDarticle = false;
	}
	
if(obj.random_weight_flag == 'Y')
	{
	isRandomWghtArticle = true;
	}
else
	{
	isRandomWghtArticle = false;
	}
	securityMatrix();
	$('#createDrpDwn,#ticketDrpDwn,#orderDrpDwn').css('display','');
}

function getArticleHierarchyInfo(obj) {
	/*
	 * var param = { "iv_article" : articleNo, "iv_sales_org" :
	 * $('#salesOrg').val(), "iv_session_id" : "", "iv_ranged" : rangedFlag, };
	 */
	/*
	 * msg: "" msg_type: "" department_no: "20" department_name: "LIQUOR TEST
	 * 01" category_no: "2075" category_name: "WINE TESTING AUTO93 4ATEST"
	 * sub_category_no: "2075637" sub_category_name: "RED WINE TEST" segment_no:
	 * "207563707" segment_name:
	 */

	/*
	 * $.ajax({ type : "post", url : getArticleHierarchyURL, data :
	 * JSON.stringify(param), beforeSend : function() { startLoading(); },
	 * success : function(response) { var hierarchyInfo = response; if
	 * (hierarchyInfo != null && hierarchyInfo != undefined &&
	 * hierarchyInfo.length > 0) {
	 */
	obj.department_name = obj.department_name != null
			&& obj.department_name != undefined ? obj.department_name : '';
	obj.category_name = obj.category_name != null
			&& obj.category_name != undefined ? obj.category_name : '';
	obj.sub_category_name = obj.sub_category_name != null
			&& obj.sub_category_name != undefined ? obj.sub_category_name : '';
	obj.segment_name = obj.segment_name != null
			&& obj.segment_name != undefined ? obj.segment_name : '';

	$('#articleHierarchy').html(
			'<li>' + obj.department_name + '</li><li>' + obj.category_name
					+ '</li><li>' + obj.sub_category_name + '</li><li>'
					+ obj.segment_name + '</li>');
	deptNo = obj.department_no;
	category = obj.category_no;
	subCategory = obj.sub_category_no;
	segment = obj.segment_no;
	/*
	 * } stopLoading(); }, error : function() { // showError('Sorry, Some
	 * technical issue occured.'); stopLoading(); }, });
	 */

}
/**
 * **********************Stores near by functions
 * **********************************
 */

function showStorePageInArticleLookup(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function verifyStore(data, flag) {
	console.log(getSiteDescriptionUrl + ' ' + JSON.stringify(data));
	$
			.ajax({
				data : JSON.stringify(data),
				url : getSiteDescriptionUrl,
				type : 'post',
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					var res = response;// $.parseJSON(response);
					var tblHdr = '<thead><tr><th data-sort="string">Store ID</td><th data-sort="string" class="sorted ascending" >Store Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
					// myMap
					if (res != null && res != undefined && res.length > 0
							&& res[0].site_no != undefined) {
						var list = res;
						var j = 0;
						var k = 1;
						var siteNo = '';
						// var siteName = '';
						siteNo = list[0].site_no;
						// siteName = list[0].site_desc;
						for ( var i = 0; i < list.length; i++) {
							j++;

							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>'
									+ list[i].site_no + '</td><td>'
									+ list[i].site_desc + '</td>';
							tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectStore">Select</label></label></td></tr>';

							if (j % 9 == 0) {
								k++;
							}

						}
						if (j > 1) {
							currPage = 1;
							$('#dialog-verify h4 strong').text(
									$('#tableAddAction input:first').val()
											.trim());
							$('#dialog-verify .ContentTable').html('');
							$('#dialog-verify .ContentTable').html(tblHdr);
							$('#dialog-verify').parent().find(
									'.ui-dialog-title').text('Verify Store');
							$('#dialog-verify .warningMessage h4')
									.html(
											'Too many search results for <strong>'
													+ $('#siteNo').val()
													+ '</strong>. Please select a store from the list below');
							$("#dialog-verify").dialog("open");
							$('.verifyPagination').addClass('hideBlock');
							if (j > 9) {
								$('.verifyPagination').removeClass('hideBlock');
								$('.verifyPagination')
										.pagination(
												{
													items : j,
													itemsOnPage : 9,
													cssStyle : 'compact-theme',
													currentPage : currPage,
													onPageClick : function(
															pageNumber) {
														showStorePageInArticleLookup(pageNumber);

													}

												});
							} else {
								$('.verifyPagination').addClass('hideBlock');
							}
							bindStoreContent(flag);
							stopLoading();

						} else {
							if (flag) {
								if (siteNo != '' && siteNo != undefined
										&& siteNo != null) {
									$('#siteNo').val(siteNo);
									getNearByStoreSearchResults();
								} else {
									showErrorInNearBy('Invalid store No/Name');
									stopLoading();
								}
								// + siteName
								// removeStore();
							}
						}

					} else {
						if (flag) {
							showErrorInNearBy('Invalid store No/Name');
							stopLoading();
						} else {
							showErrorInNearByInPopup('Invalid store No/Name');
							stopLoading();
						}
						// $('#dialog-modal').dialog('open');
					}

				},
				error : function() {
					// goToLogin();
				}
			});
}

function bindStoreContent(flag) {
	$(".sortPopUpTbl").tablesort();
	if (flag) {
		$('.selectStore').click(
				function() {
					clearAllErrors();
					hideErrorInNearBy();
					$('#siteNo').val(
							$(this).parent().parent().parent().find('td:first')
									.text().trim());

					$("#dialog-verify").dialog("close");
					getNearByStoreSearchResults();
				});
	} else {
		$('.selectStore').click(
				function() {
					clearAllErrors();
					hideErrorInNearBy();
					$('#dialog-modal-Edit #singlePOS input').val(
							$(this).parent().parent().parent().find('td:first')
									.text().trim()
									+ ' - '
									+ $(this).parent().parent().parent().find(
											'td:nth-child(2)').text().trim());
					$("#dialog-verify").dialog("close");
				});
	}
}

function showErrorInNearByInPopup(msg, id) {

	//
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg);
	else {
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').addClass('popupError').text(msg);
		$('#' + id + ' .popupActions').parent().removeClass('hideBlock');
	}
}

function showWarningInPopup(msg, id) {
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text(msg).removeClass(
				'popupWarning').addClass('popupWarning').text(msg);
	else
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').addClass('popupWarning').text(msg);
	// $('#'+id+' .popupActions').parent().removeClass('hideBlock');
}

function hideErrorInNearByInPopup(id) {
	// $('#'+id+'
	// .popupActions').prev().removeClass('popupError,popupWarning').addClass('popupError').text('');
	if (id == 'dialog-forgotWizard')
		$('.formWrapper:visible .errorDiv label:first').text('');
	else
		$('#' + id + ' .popupActions').prev().removeClass('popupError')
				.removeClass('popupWarning').text('');
}

function navigateToDetail(index) {
	$('tr td').addClass('cursorProgress');
	$('#index').val(index);
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
	// $('#NearbyStoreSearchForm').attr('method', 'GET');
	// $('#NearbyStoreSearchForm').attr('action',
	// 'requestStoreArticleDetail.htm');
	// $("#NearbyStoreSearchForm").submit();
}

function validateFields() {
	hideErrorInNearBy();
	$("#dropdown").removeClass('active');
	$("#nearbyStoresResultTable").addClass('hideBlock');
	if ($('#siteNo').val() == "" || $.trim($('#siteNo').val()).length == 0) {
		$('#siteNo').focus();
		showErrorInNearBy("Please enter Store No");
	} else {
		startLoading();
		verifyStore({
			"iv_site" : $('#siteNo').val().trim(),
			"iv_session_id" : "22"
		}, true);
	}
}

function showErrorInNearBy(msg) {
	$(".tableActionsBtnsWrapper #errorMsgDivNear #msg").html(msg);
	$("#errorMsgDivNear").removeClass('errorDiv hideBlock');
	$("#errorMsgDivNear").addClass('errorDiv');
}

function hideErrorInNearBy() {
	$(".tableActionsBtnsWrapper #errorMsgDivNear #msg").html('');
	$("#errorMsgDivNear").addClass('errorDiv hideBlock');
	$("#errorMsgDivNear").removeClass('errorDiv');
}

function getNearByStoreSearchResults() {
	console.log(nearbyStoreSearchInArticleLookupURL+JSON.stringify(param));
	var param = formNearByStoreSearchInputParam($('#siteNo').val());
	$.ajax({
		data : JSON.stringify(param),
		url : nearbyStoreSearchInArticleLookupURL,
		type : "POST",

		beforeSend : function() {
			startLoading();
			hideErrorInNearBy();
			// resetNearbyFormValue();
		},
		success : function(response) {
			startLoading();
			// console.log(response);
			if(response!=null && response!=undefined && response!='' && response.data!=null && response.data!=undefined
					&& response.data!='' && response.data.length>0){
				var output = response;
				var list = output.data;
				var msg = list[0].msg;
				if (list != null && list.length > 0) {
					recordCountInNear = list.length;
					nearByStoreResults = list;
					var storeList = [];
					storeList = list;
					currentPageInNear = 1;
					itemsOnPageInNear = 10;
					if (recordCountInNear <= itemsOnPageInNear)
						itemsOnPageInNear = recordCountInNear;
					storeList = jQuery.grep(storeList, function(n, i) {
						return (i < itemsOnPageInNear);
					});
					formNearbyStoresSearchResults(storeList);

				} else if (msg != '') {
					showErrorInNearBy(msg);
					stopLoading();
				}
			}else{
				showErrorInNearBy('Sorry, No Data Found.');
				stopLoading();
			}

		},
		error : function() {
			// goToLogin();
			stopLoading();
		}
	});

}

function formNearbyStoresSearchResults(list) {
	var content = '';
	var j = 0;
	for ( var i = 0; i < list.length; i++) {
		list[i].site_no = (list[i].site_no || '');
		content += '<tr data-tt-id="'
				+ j
				+ '" class="collapsed" data-site="'
				+ list[i].site_no
				+ '"><td class="expander" width="10px"><!--<span class="indenter"><a title="Expand All" class="expandAll" id="expandAll">&nbsp;</a></span>--></td><td>'
				+ list[i].site_no
				+ '</td><td>'
				+ (list[i].site_name != null && list[i].site_name != undefined ? list[i].site_name
						: '') + '</td><td class=" ' + $('#soh').attr("class");
		if ($('input[name="articleBaseUom"]').val() != 'KG')
			content += ' trimDecimalForSoh';
		content += '">'
				+ (list[i].stock_on_hand != null
						&& list[i].stock_on_hand != undefined ? list[i].stock_on_hand
						: '')
				+ '</td><td class="numberColumn '
				+ $('#sp').attr("class")
				+ '">'
				+ (list[i].std_sell_price != null
						&& list[i].std_sell_price != undefined ? list[i].std_sell_price
						: '')
				+ '</td><td class="numberColumn">'
				+ (list[i].promo_sell_price != null
						&& list[i].promo_sell_price != undefined ? list[i].promo_sell_price
						: '') + '</td>';
		if (list[i].ranged_flag == 'Y')
			content += '<td class="' + $('#rangedFlag').attr("class")
					+ '"><label class="positiveStatus">&nbsp;</label></td>';
		if (list[i].ranged_flag == undefined || list[i].ranged_flag == 'N'
				|| list[i].ranged_flag == '')
			content += '<td class="' + $('#rangedFlag').attr("class")
					+ '"><label class="negativeStatus">&nbsp;</label></td>';
		content += '<td class="numberColumn lastColumn">' + parseFloat((list[i].distance)).toFixed(2)
				+ '</td></tr>';
		j++;
		content += '<tr data-tt-id="'
				+ j
				+ '" data-tt-parent-id="'
				+ (j - 1)
				+ '" class="collapsed" style="display: table-row;"><td colspan="8"><span class="indenter" style="padding-left: 19px;"></span>'
				+ '<table cellspacing="0" class="ContentTable" width="100%"><tbody><tr><td class="keyInfo">Address:</td><td class="address"></td>'
				+ '<td rowspan="3" class="lastColumn" width="50%" ><div class="map" style="width:470px;height:250px;overflow:auto;"></div></td></tr>'
				+ '<tr><td class="keyInfo">Contact:</td><td class="contact" style="border-right: solid 1px #eee;"></td></tr><tr class="lastRow"><td class="keyInfo">Opening Hours:</td>'
				+ '<td class=" store_active_hrs"  style="border-right: solid 1px #eee;"></td></tr></tbody></table></td></tr>';
	}

	$('#nearbyStoresResultTable tbody').html('');
	$('#nearbyStoresResultTable tbody').append(content);
	$('#siteNo').focus();

	$('.nearByPagination').pagination({
		items : recordCountInNear,
		itemsOnPage : 10,
		cssStyle : 'compact-theme',
		currentPage : currentPageInNear,
		onPageClick : function(pageNumber) {
			getStoresForPagination(pageNumber);

		}

	});

	if (recordCountInNear / itemsOnPageInNear > 1) {
		$('.nearByPagination').removeClass('hideBlock');
	} else {
		$('.nearByPagination').addClass('hideBlock');
	}
	bindNearbyStoresEvents();
	$('#siteNo').focus();
	$('#nearbyStoresResultTable').removeClass('hideBlock');
	stopLoading();
}

function bindNearbyStoresEvents() {
	$('.trimDecimalForSoh').filter(function() {
		var value = $(this).text();
		$(this).text(value.split(".")[0]);
	});
	$("#nearbyStoresResultTable").treetable('destroy').treetable({
		expandable : true,
		onNodeExpand : function() {
			getNearbyStrDtlInf(this);
		}
	});
}

function getStoresForPagination(pageNo) {

	var actualIndex = pageNo - 1;
	var storeList = '';
	storeList = nearByStoreResults;
	var startIndex = '';
	var endIndex = '';
	if (actualIndex == 0) {
		startIndex = 0;
		endIndex = itemsOnPageInNear;
	} else if (actualIndex != 0) {
		startIndex = actualIndex * itemsOnPageInNear;
		endIndex = pageNo * itemsOnPageInNear;
	}
	storeList = jQuery.grep(storeList, function(n, i) {
		return (i >= startIndex && i < endIndex);
	});
	currentPageInNear = pageNo;
	formNearbyStoresSearchResults(storeList, '');
}
/**
 * ************************************Functions used For hierarchy population
 * in look up page********************************************************
 */
function populateDepartment() {
	var so = $('#salesOrg').val();
	var param = {
		"iv_sales_org" : so,
		"iv_node_id" : "ALL DEPARTMENTS",
		"iv_session_id" : "100"
	};
	console.log(gethierarchyDetails + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "POST",
				url : gethierarchyDetails,
				data : JSON.stringify(param),
				success : function(response) {
					var temList = response;
					if (temList.length > 0) {
						var content = '';
						for ( var i = 0; i < temList.length; i++) {
							content += '<li >	<input class="department" type="radio" name="departmentList" '
									+ 'value="'
									+ temList[i].node_id
									+ '" id="'
									+ temList[i].node_id
									+ '">'
									+ '<label for="'
									+ temList[i].node_id
									+ '" class="labelText">'
									+ temList[i].node_desc + '</label></li>';
						}
						$('#deptlst').html(content);
						$("#deptLstCnt").text(temList.length);
						bindDepartmentSelectEvent();
					}
				},
				error : function(response) {
				},
			});

}

function bindDepartmentSelectEvent() {
	$('.department')
			.on(
					'click',
					function() {
						clearAllErrors();
						var selectedValue = this.id.toString();
						if (selectedValue != $('#hierarchyID').val()) {

							$("#segmentLst").addClass('hideBlock');
							$("#segmentBtn").addClass('hideBlock');
							$("#catGo").addClass('hideBlock');
							$("#subCatGo").addClass('hideBlock');
							$("#deptGo").removeClass('hideBlock');
							$("#subCategoryLst").addClass('hideBlock');
							$("#segment").removeClass('hideBlock');
							$("#subCat").removeClass('hideBlock');
							$("#noSelectionCat").addClass('hideBlock');
							$("#segmentLst").addClass('hideBlock');
							$("#subCategoryLst").addClass('hideBlock');
							// my line
							$("#subCatTotal").addClass('hideBlock');
							$("#segmentTotal").addClass('hideBlock');

							$("#categoryLst").removeClass('hideBlock');
							$("#categoryLst").empty();
							$("#categoryLstCnt").text('');
							$("#subTotal").text('');
							$("#segmentTotalCnt").text('');

							$('#hierarchyID').val(selectedValue);
							$('#hierarchyLVL').val(2);

							// category ajax call

							var so = $('#salesOrg').val();
							var no = selectedValue;
							var param = {
								"iv_sales_org" : so,
								"iv_node_id" : no,
								"iv_session_id" : "100"
							};
							$
									.ajax({
										type : "POST",
										url : gethierarchyDetails,
										data : JSON.stringify(param),
										success : function(response) {
											var temList = response;
											if (temList.length > 0) {
												var content = '';
												for ( var i = 0; i < temList.length; i++) {
													content += '<li><input type="radio" name="category" class="category" data-tt-id="'
															+ temList[i].node_id
															+ '" data-tt-parent-id="'
															+ no
															+ '" id="'
															+ temList[i].node_id
															+ '" value="'
															+ temList[i].node_id
															+ '"/><label for="'
															+ temList[i].node_id
															+ '" class="lastColumn">'
															+ temList[i].node_desc
															+ '</label></li>';
												}
												$('#categoryLst').html(content);
												$("#categoryLstCnt").text(
														temList.length);
												$("#categoryLstTotal")
														.removeClass(
																'hideBlock');
												bindCategorySelectEvent();
											}
										},
										error : function(response) {

										},
									});

						}

					});
}

function bindCategorySelectEvent() {
	$(document)
			.on(
					"click",
					".category",
					function() {
						clearAllErrors();
						var selectedValue = this.id.toString();
						if (selectedValue != $('#hierarchyID').val()) {

							$("#segmentLst").addClass('hideBlock');
							$("#segmentBtn").addClass('hideBlock');
							$("#deptGo").addClass('hideBlock');
							$("#subCatGo").addClass('hideBlock');
							$("#catGo").removeClass('hideBlock');
							$("#segment").removeClass('hideBlock');
							// my line
							$("#segmentTotal").addClass('hideBlock');

							$("#subCategoryLst").empty();
							$("#subTotal").text('');
							$("#segmentTotalCnt").text('');
							$('#subCat').addClass('hideBlock');
							$('#subCategoryLst').removeClass('hideBlock');
							var selectedValue = this.id.toString();
							$('#hierarchyID').val(selectedValue);
							$('#hierarchyLVL').val(3);

							var so = $('#salesOrg').val();
							var no = selectedValue;
							var param = {
								"iv_sales_org" : so,
								"iv_node_id" : no,
								"iv_session_id" : "100"
							};
							$
									.ajax({
										type : "POST",
										url : gethierarchyDetails,
										data : JSON.stringify(param),
										success : function(response) {
											var temList = response;
											if (temList.length > 0) {
												var content = '';
												for ( var i = 0; i < temList.length; i++) {
													content += '<li><input type="radio" name="subCat" class="subCat" data-tt-id="'
															+ temList[i].node_id
															+ '" data-tt-parent-id="'
															+ no
															+ '" id="'
															+ temList[i].node_id
															+ '" value="'
															+ temList[i].node_id
															+ '"/><label for="'
															+ temList[i].node_id
															+ '" class="lastColumn">'
															+ temList[i].node_desc
															+ '</label></li>';
												}
												$('#subCategoryLst').html(
														content);
												$("#subTotal").text(
														temList.length);
												$("#subCatTotal").removeClass(
														'hideBlock');
												bindSubCategorySelectEvent();
											}
										},
										error : function(response) {

										},
									});

						}
					});

}

function bindSubCategorySelectEvent() {
	$(document)
			.on(
					"click",
					".subCat",
					function() {
						clearAllErrors();
						var selectedValue = this.id.toString();
						if (selectedValue != $('#hierarchyID').val()) {

							$('#segment').addClass('hideBlock');
							$('#segmentLst').removeClass('hideBlock');
							$("#segmentBtn").addClass('hideBlock');
							$("#catGo").addClass('hideBlock');
							$("#deptGo").addClass('hideBlock');
							$("#subCatGo").removeClass('hideBlock');
							$("#segmentTotalCnt").text('');
							$("#segmentLst").empty();

							var selectedValue = this.id.toString();

							$('#hierarchyID').val(selectedValue);
							$('#hierarchyLVL').val(4);

							var so = $('#salesOrg').val();
							var no = selectedValue;
							var param = {
								"iv_sales_org" : so,
								"iv_node_id" : no,
								"iv_session_id" : "100"
							};

							$
									.ajax({
										type : "POST",
										url : gethierarchyDetails,
										data : JSON.stringify(param),
										success : function(response) {
											var temList = response;
											if (temList.length > 0) {
												var content = '';
												for ( var i = 0; i < temList.length; i++) {
													content += '<li><input type="radio" name="hierarchySearch" class="segment" data-tt-id="'
															+ temList[i].node_id
															+ '" data-tt-parent-id="'
															+ no
															+ '" id="'
															+ temList[i].node_id
															+ '" value="'
															+ temList[i].node_id
															+ '"/><label for="'
															+ temList[i].node_id
															+ '" class="lastColumn">'
															+ temList[i].node_desc
															+ '</label></li>';
												}
												$('#segmentLst').html(content);
												$("#segmentTotalCnt").text(
														temList.length);
												$("#segmentTotal").removeClass(
														'hideBlock');
												bindSegmentSelectEvent();
											}
										},
										error : function(response) {

										},
									});
						}
					});

}

function bindSegmentSelectEvent() {
	$(document).on("click", ".segment", function() {
		clearAllErrors();
		var selectedValue = this.id.toString();
		if (selectedValue != $('#hierarchyID').val()) {
			$("#subCatGo").addClass('hideBlock');
			$("#segmentBtn").removeClass('hideBlock');
			var selectedValue = this.id.toString();
			$('#hierarchyID').val(selectedValue);
			$('#hierarchyLVL').val(5);
		}
	});
}
/**
 * **************************Functions used to show error in Additional tab
 * ***************************************
 */
function hidePrintAndEmail() {
	$('.printAndEmailDiv').addClass('hideBlock');
}

function showErrorInAdditionalDetailsTab(content) {
	$('#freshTable').html(content);
	$('#customerNotesTable').html(content);
	$('#tastingNotesTable').html(content);
	$('#nutritionTable').html(content);
	$('#nutriVal').closest('table').addClass('hideBlock');
	$('.divNutriValTitle').addClass('hideBlock');
}

function getPromodateInFormat(s) {
	y = +s.substr(0, 4), // get the year
	m = +s.substr(5, 2) - 1, // get the month
	d = +s.substr(8, 2), // get the date of the month
	date = new Date(y, m, d);

	var days = [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ];
	var months = [ 'January', 'February', 'March', 'April', 'May', 'June',
			'July', 'August', 'September', 'October', 'November', 'December' ];
	var formatted = days[date.getDay()] + ',' + d;

	if (Math.floor(d % 100 / 10) === 1) { // add 'th' for the 11th, 12th, and
		// 13th
		formatted += 'th';
	} else {
		formatted += {
			1 : 'st',
			2 : 'nd',
			3 : 'rd'
		}[d % 10] || 'th';
	}
	formatted += ' ' + months[date.getMonth()];
	return formatted;
}
/**
 * *********************************Histort Related functions
 * ******************************************
 */
function callPriceHistory() {
	var param = {
		"iv_article" : articleNo,
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : "",
		"iv_sales_org" : $('#salesOrg').val()

	};

	startLoading();
	console.log(getPriceHistoryURL, JSON.stringify(param));
	$
			.post(getPriceHistoryURL, JSON.stringify(param))
			.done(
					function(response) {
						var content = '';
						var historyList = response;
						if (historyList != null && historyList != undefined
								&& historyList.length > 0
								&& historyList[0].std_sell_price != null
								&& historyList[0].std_sell_price != undefined) {
							var tempList = [];
							for ( var i = 0; i < historyList.length; i++) {
								if (historyList[i].meinh != null)
									tempList.push(historyList[i].meinh);
							}
							var optionList = unique(tempList);
							var options = '<option value="Select">Select</option>';
							for ( var i = 0; i < optionList.length; i++) {
								options += '<option value="pricHstry'
										+ optionList[i] + '">' + optionList[i]
										+ ' '
										// +
										+ '</option>';

							}
							$('#prcHstrySlct').html(options);
							var tableHeadContent = '<table class="ContentTable" id="prcHstryTbl" cellspacing="0"><thead><tr><th>Date</th><th class="centerValue">UOM</th>'
									+ '<th>Price Type</th><th class="lastColumn centerValue">Price </th></tr></thead>';
							var tableEndContent = '</table>';
							for ( var i = 0; i < historyList.length; i++) {
								content += '<tr class=" pricHstryRow pricHstry'
										+ (historyList[i].meinh != null ? historyList[i].meinh
												: '')
										+ '"><td>'
										+ (historyList[i].start_date != null ? formatDateMobiNew(historyList[i].start_date)
												: '')
										+ '</td><td class="centerValue">'
										+ (historyList[i].meinh != null ? historyList[i].meinh
												: '')
										+ '</td><td>'
										+ (historyList[i].uom_desc != null ? historyList[i].uom_desc
												: '')
										// +'('
										// +
										// +')'
										+ '</td><td class="centerValue lastColumn">'
										+ (historyList[i].std_sell_price != null ? Number(historyList[i].std_sell_price||'').toFixed(2)
												: '') + '</td></tr>';
							}
							$('#prcHstryContnt').html(
									tableHeadContent + content
											+ tableEndContent);
							bindSelectInPriceHistory();
							$('#prcHstrySlct option:eq(1)').attr('selected',
									'selected').trigger('change');
						} else {
							$('#prcHstrySlct').parent().addClass('hideBlock');
							var error = '<table class="ContentTable" cellspacing="0"><tbody id="prcHstryErrorTable"></tbody></table>';
							$('#prcHstryContnt').html(error);
							$('#prcHstryErrorTable')
									.html(
											'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
						}
						stopLoading();
					});

}

function formatDateMobiNew(date) {
	var newDate = '';
	if (date != null && date != '' && date != undefined) {
		if (date.split('-').length > 2) {
			newDate = date.split('-')[2] + '/' + date.split('-')[1] + '/'
					+ date.split('-')[0];
		}
	}
	return newDate;
}
function formatDateMobiFmt(date) {
	var newDate = '';
	if (date != null && date != '' && date != undefined) {
		if(date.split('-').length > 2){
			newDate = date.split('-')[0] + '/' + date.split('-')[1] + '/'
					+ date.split('-')[2];
		}
	}
	return newDate;
}
function getSalesHistory() {
	var param = {
		"iv_article_no" : articleNo,
		"iv_site_no" : $('#posSite').val(),
		"iv_user" : $('#loginUserId').val()
	};
	startLoading();
	console.log(getSalesHistoryURL + ' ' + JSON.stringify(param));
	$
			.post(getSalesHistoryURL, JSON.stringify(param))
			.done(
					function(response) {
						if(checkResult(response, 'base_uom'))
						{
						$('.articleNoAndName').text(
								articleNo + ' - ' + articleDesc);
						$('.unitOrCarton').text();
						$('.cartonQty').text();
						var salesHstryList = response;

						if (salesHstryList != null
								&& salesHstryList != undefined
								&& salesHstryList.length > 0) {

							var radioNamePackSizeMap = {};

							if (packBreakInd == 'Y') {
								for ( var i = 0; i < rplArray.length; i++) {
									radioNamePackSizeMap[rplArray[i].pack_break_uom] = rplArray[i].pack_size;
								}
							} else {
								radioNamePackSizeMap[articleDtlInfo.article_uom] = '1';
								if((articleDtlInfo.order_uom||'')!=''){
									radioNamePackSizeMap[articleDtlInfo.order_uom||''] = salesHstryList[0].pack_size;
								}
							}
							buildSalesHistPopUpContent(salesHstryList,
									radioNamePackSizeMap,packBreakInd);

						} else {
							var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
							$('#salesHistContent').closest('table').html(error);
						}
						stopLoading();
					}
					}).fail(function() {
						$.fn.showCustomMsg([ mobiSerErrCode ], error);
						stopLoading();
					}).always(function() {
						$('#error-warn-wrapper #error_title').addClass('hideBlock');
						stopLoading();
					});

}
function buildSalesHistPopUpContent(salesHstryList, radioNamePackSizeMap,packBreakInd) {

	var content = '';
	var weekArray = [ 'This Week', 'Last Week', 'Week Before', '15 Week Avg.' ];

	var uomRadioContent = '<p class="notes"><strong>Select UOM:</strong>';

	for ( var m in radioNamePackSizeMap) {
		if((m||'')!=''){
			if (m == articleDtlInfo.article_uom) {
				uomRadioContent += '<input type="radio" checked ';
			} else {
				uomRadioContent += '<input type="radio" ';
			}
			uomRadioContent += 'name="searchByOptionsSalesHistPopUp"  onclick="getSalesHistContentByUOM(\''
					+ m
					+ '\');" tabindex="1"><label class="labelText">'
					+ m
					+ '</label>';
		}
	}

	uomRadioContent += '</p>';
	
	$('#uomRadio_salesHist').html('');
	$('#uomRadio_salesHist').html(uomRadioContent);
	var spanClass = "salesHistPopUpUomAll salesHistPopUpUom" ;
	var j=0;
	for ( var i = 0; i < salesHstryList.length; i++) {
		
			content += '<tr class="'+spanClass+salesHstryList[i].base_uom+'">';
			
				content += '<td>' + (weekArray[j]) + '</td>';
			
			
			content += '<td>'+getSalesHistColunCont(salesHstryList[i].day1_promo_ind,
					salesHstryList[i].day1_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day2_promo_ind,
					salesHstryList[i].day2_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day3_promo_ind,
					salesHstryList[i].day3_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day4_promo_ind,
					salesHstryList[i].day4_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day5_promo_ind,
					salesHstryList[i].day5_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day6_promo_ind,
					salesHstryList[i].day6_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td><td>';
			content += getSalesHistColunCont(salesHstryList[i].day7_promo_ind,
					salesHstryList[i].day7_sales, radioNamePackSizeMap,packBreakInd)
					+ '</td>';
			content += '<td class="sorted lastColumn">'
					+ getSalesHistColunCont('', salesHstryList[i].week_total,
							radioNamePackSizeMap,packBreakInd);
			content += '</td></tr>';
			j++;
			if(j==4){
				j=0;
			}
		
		
	}
	
	$('#dailyAvgSales').text(
			'- ' + (salesHstryList[0].avg_daily_sales || '') + ' '
					+ (salesHstryList[0].base_uom || ''));
	$('#weeklyAvgSales').text(
			' ' + (salesHstryList[0].avg_wkly_sales || '') + ' '
					+ (salesHstryList[0].base_uom || ''));
	$('#avgSales15Week').text(
			' ' + (salesHstryList[0].avg_15week_sales || '') + ' '
					+ (salesHstryList[0].base_uom || ''));
	$('#packSizeValue').text(' ' + (salesHstryList[0].pack_size || ''));
	$('#salesHistContent').html(content);
	// To show EA initially
	$(".salesHistPopUpUomAll").addClass("hideBlock");
	$(".salesHistPopUpUom"+salesHstryList[0].base_uom).removeClass("hideBlock");
	
	$('input[name="searchByOptionsSalesHistPopUp"]:first').trigger("click");
	
}
function getSalesHistColunCont(promoInd, daySales, radioNamePackSizeMap,packBreakInd) {
	var content = '';
	daySales = (daySales || '');
	if (daySales != '' && promoInd != undefined && promoInd != ''
			&& promoInd == 'Y') {
		content += '<span>*</span>';
	}
	if(packBreakInd == "Y"){
		var daySalesByUom = '';
		for ( var m in radioNamePackSizeMap) {
			
			
			if (daySales != '' && radioNamePackSizeMap[m] != undefined
					&& radioNamePackSizeMap[m] != '') {
				daySalesByUom = formatTo3DecimalPlaces(Number(daySales));
			}
		}
		
		content += '<span class="">' + daySalesByUom
		+ '</span>';
	}
	else{
		var daySalesByUom = '';
		for ( var m in radioNamePackSizeMap) {
			
			
			if (daySales != '' && radioNamePackSizeMap[m] != undefined
					&& radioNamePackSizeMap[m] != '') {
				daySalesByUom = formatTo3DecimalPlaces(Number(daySales)
						/ Number(radioNamePackSizeMap[m]));
			}

			content += '<span class="uom_content uom_cont_'+m+' hideBlock">' + daySalesByUom
			+ '</span>';
		}
		
	
	}
	return content;
}
function formatTo3DecimalPlaces(inputString) {
	var str = Number(inputString).toFixed(3);
	if (str.substr(str.length - 4, str.length) == ".000") {
		return str.substr(0, str.length - 4);
	} else {
		return str;
	}
}
function getSalesHistContentByUOM(uomType) {
	if(packBreakInd == 'Y'){
		$(".salesHistPopUpUomAll").addClass("hideBlock");
		var uomClass = "salesHistPopUpUom" + uomType;
		$("." + uomClass).removeClass("hideBlock");
	}else{
		$('#dialog-modal-his').find('.uom_content').addClass('hideBlock');
		$('#dialog-modal-his').find('.uom_cont_'+uomType).removeClass('hideBlock');
	}
}
function bindSelectInPriceHistory() {
	$('#prcHstrySlct').change(function() {
		$('.pricHstryRow').addClass('hideBlock');
		var selectedValue = this.value;
		if (selectedValue != 'Select') {
			$('.' + selectedValue).removeClass('hideBlock');
			$('#prcHstryTbl').removeClass('hideBlock');
		} else {
			$('.pricHstryRow').addClass('hideBlock');
			$('#prcHstryTbl').addClass('hideBlock');
		}
	});
}

function unique(list) {
	var result = [];
	$.each(list, function(i, e) {
		if ($.inArray(e, result) == -1)
			result.push(e);
	});
	return result;
}

function formatMobilinkDate(dateStr) {
	var d = dateStr;

	d = d.substr(0, 10).split("-");

	d = d[2] + "/" + d[1] + "/" + d[0];

	return d;
}

function getFullHistory(mplValue, mplFlag, selectedArticleNo, selectedUom) {

	var optionList = [ {
		id : 'MPL',
		value : 'M'
	}, {
		id : 'SC',
		value : 'S'
	}, {
		id : 'Facing',
		value : 'F'
	} ];

	if (isBigw != 'true')
		optionList.splice(2, 1);

	var param = '';
	
	if(mplFlag == 'S' && complexPBDFlag == 'Y'){	// SC service call
		isScalledFlag = false;
	}
	
	if ((complexPBDFlag == 'Y')) {
		param = {
			"iv_site" : $('#posSite').val(),
			"iv_article" : selectedArticleNo,
			"iv_from_date" : getDesiredPastDate(28),
			"iv_to_date" : getDesiredPastDate(0),
			"iv_mpl_flag" : mplFlag,
			"pwd" : encSapPwd,
			"user_id" : $('#loginUserId').val()
		};
	} else {

		param = {
			"iv_site" : $('#posSite').val(),
			"iv_article" : articleNo,
			"iv_from_date" : getDesiredPastDate(28),
			"iv_to_date" : getDesiredPastDate(0),
			"iv_mpl_flag" : mplFlag,
			"pwd" : encSapPwd,
			"user_id" : $('#loginUserId').val()
		};

	}

	console.log(getFullHistoryURL + ' ' + JSON.stringify(param));

	startLoading();
	// $.ajaxSetup({contentType:"application/json"});
	$
			.post(getFullHistoryURL, JSON.stringify(param))
			.done(
					function(response) {

						var content = '';
						// var output = $.parseJSON(response);

						// response[0].ErrorCode != undefined
						if (response != null && response != undefined
								&& response.d != undefined
								&& response.d != null
								&& response.d.results != undefined
								&& response.d.results != null) {
							var fullHistoryList = response.d.results;

							if ((complexPBDFlag == 'Y')) {

								var options = '<p class="notes" id=""><strong>Show Only:</strong>';
								for ( var i = 0; i < optionList.length; i++) {
									options += '<input type="radio" value="'
											+ optionList[i].value
											+ '" id="'
											+ optionList[i].id
											+ '" name="searchByMPLSCPBD" ><label class="labelText" for="'
											+ optionList[i].id + '">'
											+ optionList[i].id + '</label>';

								}
								$('#fullHstryMplRadioCntnt').html(
										options + '</p>');

								if (fullHistoryList != null
										&& fullHistoryList != undefined
										&& fullHistoryList.length > 0
										&& fullHistoryList[0].value_old != null
										&& fullHistoryList[0].value_old != undefined) {

									for ( var i = 0; i < fullHistoryList.length; i++) {

										var timeStamp = '';
										if (fullHistoryList[i].time_of_change != null
												&& fullHistoryList[i].time_of_change != undefined) {
											var time = fullHistoryList[i].time_of_change;
											var hours = time.substring(0, 2);
											var minutes = time.substring(2, 4);
											var seconds = time.substring(4, 8);
											timeStamp = hours + ' : ' + minutes
													+ ' : ' + seconds;
										}
										content += '<tr class=" fullHstryRow fullHstry'
												+ selectedUom
												+ (mplFlag != null ? mplFlag
														: '')
												+ '"><td>'
												+ (mplValue != null ? mplValue
														: '')
												+ '</td><td>'
												+ (fullHistoryList[i].uom != undefined && fullHistoryList[i].uom != null ? fullHistoryList[i].uom
														: '')
												+ '</td><td>'
												+ (fullHistoryList[i].date != null ? fullHistoryList[i].date
														: '')
												+ ' '
												+ timeStamp
												+ '</td><td class="centerValue">'
												+ (fullHistoryList[i].changed_by != null ? fullHistoryList[i].changed_by
														: '')
												+ '</td><td>'
												+ (fullHistoryList[i].value_old != null ? Number(fullHistoryList[i].value_old||'').toFixed(0)
														: '')
												+ '</td><td class="centerValue lastColumn">'
												+ (fullHistoryList[i].value_new != null ? Number(fullHistoryList[i].value_new||'').toFixed(0)
														: '') + '</td></tr>';
									}

									$('#' + selectedUom + mplFlag + 'CallFlag')
											.val('true');
									$('#fullHstryCntnt').closest('table').find(
											'thead').removeClass('hideBlock');
									$('#fullHstryCntnt').append(content);
								} else {
									$('#' + selectedUom + mplFlag + 'CallFlag')
											.val('true');
									// $('input[name="searchByMPLSC"]:first').prop('checked',true);
									// $('#fullHstryCntnt').closest('table').find('thead').addClass('hideBlock');
									var error = '<div class="errorDiv promoError fullHstryRow fullHstry'
											+ selectedUom
											+ mplFlag
											+ '"><label>No Data Found.</label></div>';
									$('#fullHstryCntnt').append(error);
								}
								bindRadioInFullHistoryForPBD();
								if ($('#' + selectedUom + mplFlag + 'CallFlag')
										.val() == 'false')
									$('input[name="searchByMPLSCPBD"]:first')
											.trigger('click');
								else
									$(
											'input[name="searchByMPLSCPBD"][id="'
													+ mplValue + '"]').prop(
											'checked', true);
							} else {

								var options = '<p class="notes" style="padding-top: 0px;" id=""><strong>Show Only:</strong>';
								// var checkFlag = '';
								for ( var i = 0; i < optionList.length; i++) {
									if (mplFlag == optionList[i].value) {
										checkFlag = 'checked';
									} else {
										checkFlag = '';
									}
									options += '<input type="radio" value="'
											+ optionList[i].value
											+ '" id="'
											+ optionList[i].id
											+ '" name="searchByMPLSC" ><label class="labelText" for="'
											+ optionList[i].id + '">'
											+ optionList[i].id + '</label>';

								}
								$('#fullHstryRadioCntnt')
										.html(options + '</p>');

								if (fullHistoryList != null
										&& fullHistoryList != undefined
										&& fullHistoryList.length > 0
										&& fullHistoryList[0].value_old != null
										&& fullHistoryList[0].value_old != undefined) {

									for ( var i = 0; i < fullHistoryList.length; i++) {

										var timeStamp = '';
										if (fullHistoryList[i].time_of_change != null
												&& fullHistoryList[i].time_of_change != undefined) {
											var time = fullHistoryList[i].time_of_change;
											var hours = time.substring(0, 2);
											var minutes = time.substring(2, 4);
											var seconds = time.substring(4, 8);
											timeStamp = hours + ' : ' + minutes
													+ ' : ' + seconds;
										}
										content += '<tr class=" fullHstryRow fullHstry'
												+ (mplFlag != null ? mplFlag
														: '')
												+ '"><td>'
												+ (mplValue != null ? mplValue
														: '')
												+ '</td><td>'
												+ (fullHistoryList[i].uom != undefined && fullHistoryList[i].uom != null ? fullHistoryList[i].uom
														: '')
												+ '</td><td>'
												+ (fullHistoryList[i].date != null ? fullHistoryList[i].date
														: '')
												+ ' '
												+ timeStamp
												+ '</td><td class="centerValue">'
												+ (fullHistoryList[i].changed_by != null ? fullHistoryList[i].changed_by
														: '')
												+ '</td><td>'
												+ (fullHistoryList[i].value_old != null ? Number(fullHistoryList[i].value_old||'').toFixed(0)
														: '')
												+ '</td><td class="centerValue lastColumn">'
												+ (fullHistoryList[i].value_new != null ? Number(fullHistoryList[i].value_new||'').toFixed(0)
														: '') + '</td></tr>';
									}

									$('#' + mplValue + 'CallFlag').val('true');
									$('#fullHstryCntnt').closest('table').find(
											'thead').removeClass('hideBlock');
									$('#fullHstryCntnt').append(content);
								} else {
									$('#' + mplValue + 'CallFlag').val('true');
									// $('input[name="searchByMPLSC"]:first').prop('checked',true);
									// $('#fullHstryCntnt').closest('table').find('thead').addClass('hideBlock');
									var error = '<div class="errorDiv promoError fullHstryRow fullHstry'
											+ mplFlag
											+ '"><label>No Data Found.</label></div>';
									$('#fullHstryCntnt').append(error);
								}
								bindRadioInFullHistory();
								if ($('#' + mplValue + 'CallFlag').val() == 'false')
									$('input[name="searchByMPLSC"]:first')
											.trigger('click');
								else
									$(
											'input[name="searchByMPLSC"][id="'
													+ mplValue + '"]').prop(
											'checked', true);

							}
						} else {
							var error = '<div class="errorDiv promoError fullHstryRow fullHstry'
									+ mplFlag
									+ '"><label>Technical issue occred.</label></div>';
							$('#fullHstryCntnt').append(error);
						}

						stopLoading();
					});
}

function bindRadioInFullHistory() {

	$('input[name="searchByMPLSC"]').click(function() {
		clearAllErrors();
		$('.fullHstryRow').addClass('hideBlock');
		var selectedValue = this.value;

		if ($('#' + this.id + 'CallFlag').val() == 'false') {
			getFullHistory(this.id, selectedValue);
		} else {
			$('.fullHstry' + selectedValue).removeClass('hideBlock');
		}
		/*
		 * if (selectedValue != 'All') { $('.' +
		 * selectedValue).removeClass('hideBlock'); } else {
		 * $('.fullHstryRow').removeClass('hideBlock'); }
		 */
	});

}

function bindRadioInFullHistoryForPBD() {

	$('input[name="searchByMPLSCPBD"]')
			.click(
					function() {
						clearAllErrors();
						var selectedUom = $(
								'input[name="searchByOptionsPopUpUOM"]:checked')
								.val();
						var $dataRow = $('input[name="searchByOptionsPopUpUOM"]:checked');
						var selectedArticleNo = $dataRow.attr('isis-ref-no');
						$('.fullHstryRow').addClass('hideBlock');
						var selectedValue = this.value;
						
						if(selectedArticleNo == undefined && complexPBDFlag == 'Y')	{
							$dataRow = $('#mplAndScTable').find('tr[data-mplupdate-bind]:visible');
							selectedArticleNo = $dataRow.attr('isis-ref-no');
							console.log('selectedArticleNo ' + selectedArticleNo);
							selectedUom = $('input[name="searchByOptionsPopUp"]:checked').attr(
									'complex-pbd-uom');
							if(selectedUom == undefined){
							for(var i=0;i<rplArray.length;i++){
								if(rplArray[i].isis_ref_no == selectedArticleNo){
									selectedUom = rplArray[i].complex_pack_brk_uom;
								}
							}
							}
						}
						if ($('#' + selectedUom + selectedValue + 'CallFlag')
								.val() == 'false') {
							 if(selectedValue == 'S' && complexPBDFlag == 'Y'){
								isScalledFlag = false;
							}
							getFullHistory(this.id, selectedValue,
									selectedArticleNo, selectedUom);
						} else {
							
							if(isScalledFlag){
								getFullHistory(this.id, selectedValue,
										selectedArticleNo, selectedUom);
							}
							$('.fullHstry' + selectedUom + selectedValue)
									.removeClass('hideBlock');
						}
						/*
						 * if (selectedValue != 'All') { $('.' +
						 * selectedValue).removeClass('hideBlock'); } else {
						 * $('.fullHstryRow').removeClass('hideBlock'); }
						 */
					});

}

function getMplFlag(value) {
	var mplFlag = '';

	if (value == 'SC') {
		mplFlag = 'S';
	} else if (value == 'MPL') {
		mplFlag = 'M';
	} else if (value == 'Facing') {
		mplFlag = 'F';
	}

	return mplFlag;
}

function getLast2FullHistory() {
	var param = {
		"iv_article" : articleNo,
		"iv_article_uom" : articleUom,
		"iv_session_id" : "",
		"iv_field" : "ALL",
		"iv_days" : "2"
	};

	startLoading();

	$
			.post(getFullHistoryURL, JSON.stringify(param))
			.done(
					function(response) {

						var fullHistoryList = response;
						if (fullHistoryList != null
								&& fullHistoryList != undefined
								&& fullHistoryList.length > 0) {
							var tableStart = '<table class="plainTable">';
							var tableEnd = '</table>';
							var content = '';
							var count = '';
							if (fullHistoryList.length == 1)
								count = 1;
							else
								count = 2;
							for ( var i = 0; i < count; i++) {
								content += '<tr><td>'
										+ (fullHistoryList[i].info_for != null ? fullHistoryList[i].info_for
												: '')
										+ ' changed on '
										+ (fullHistoryList[i].date_time != null ? fullHistoryList[i].date_time
												: '')
										+ ' by '
										+ (fullHistoryList[i].user_id != null ? fullHistoryList[i].user_id
												: '') + ' </td></tr>';
							}
							$('#last2Hstry').html(
									tableStart + content + tableEnd);
						} else {
							var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
							$('#last2Hstry').html(error);
						}
						stopLoading();
					});

}
/**
 * *******************************************Call On Order
 * functions******************************************************
 */
function callOnOrderService() {
	currentPageInOnOrder = 1;
	if ($('#orderPopUpCntnt').html() == '') {

		var hdrParam = {

			"iv_article" : articleNo,
			"iv_order_no" : "",
			"iv_delivery_from" : "",
			"iv_delivery_to" : "",
			"iv_order_type" : "",
			"iv_order_status" : "",
			"iv_node_id" : "",
			"iv_node_lvl" : "",
			"iv_srs_ind" : "",
			"iv_supplier_no" : "",
			"iv_session_id" : "111",
			"iv_site" : $('#posSite').val(),
			"iv_sales_org" : $('#salesOrg').val(),
			"iv_check_alloc" : "",
			"iv_alloc_flag" : "Y",
			"iv_article_filter" : 'Y',
			"iv_deleted_flag" : 'N',
			"iv_tab_code" : "SOO"
		};
		var inputDataForHdr = JSON.stringify(hdrParam);
		console.log(getOrderHdrBasicInfoUrl + ' ' + inputDataForHdr);
		startLoading();

		$
				.post(getOrderHdrBasicInfoUrl, inputDataForHdr)
				.done(
						function(response) {

							var orderList = response;
							if (orderList != null && orderList != undefined
									&& orderList.length > 0
									&& orderList[0].order_no != undefined) {
								recordCountInOnOrder = orderList.length;
								var j = 1;
								var k = 1;
								var content = '';

								var tableStart = '<table cellspacing="0" class=" ContentTable " id="onOrderTable"><thead><tr><th class="">Order #</th><th class="centerValue">Order Qty.</th>'
										+ '<th class="centerValue">Delivery Date</th><th class="">Supplier</th><th class="">Source</th><th class="lastColumn centerValue">Status</th>'
										+ '</tr></thead><tbody >';
								var tableEnd = '</tbody></table>';
								var list = orderList;
								for ( var i = 0; i < list.length; i++) {
									list[i].som_order_no = list[i].som_order_no != null ? list[i].som_order_no
											: "";
									list[i].order_no = list[i].order_no != null ? list[i].order_no
											: "";
									list[i].order_status = list[i].order_status != null ? list[i].order_status
											: "";
									list[i].supplier_name = list[i].supplier_name != null ? list[i].supplier_name
											: "";
									list[i].supplier_no = list[i].supplier_no != null ? list[i].supplier_no
											: "";
									list[i].source = list[i].source != null ? list[i].source
											: "";
									list[i].total_cartons = list[i].total_cartons != null ? list[i].total_cartons
											: "";
									list[i].total_pallets = list[i].total_pallets != null ? list[i].total_pallets
											: "";
									list[i].delivery_date = list[i].delivery_date != null ? list[i].delivery_date
											: "";
									content += '<tr class="page-' + j + ' ';
									if (i > 6) {
										content += 'hideBlock';

									}
									content += '" ><td>';
									if (list[i].som_order_no == "") {
										content += list[i].order_no.replace(
												/^0+/, '')
												+ '</td>';
									} else if (list[i].som_order_no != list[i].order_no) {
										content += list[i].som_order_no
												+ ' ('
												+ list[i].order_no.replace(
														/^0+/, '') + ')'
												+ '</td>';
									} else {
										content += list[i].order_no.replace(
												/^0+/, '')
												+ '</td>';
									}
									content += '<td class="centerValue">'
											+ list[i].total_cartons
											+ '</td><td class="centerValue">'
											+ (list[i].delivery_date != '' ? (list[i].delivery_date)		// defect Defect_9935
													: '') + '</td>'
											+ '<td class="">';
									if (list[i].supplier_name != '')
										content += list[i].supplier_name;
									if (list[i].supplier_no != '')
										content += '(' + list[i].supplier_no
												+ ')';
									content += '</td>'
											+ '<td class="centerValue">'
											+ list[i].source + '</td>'
											+ '<td class="centerValue">'
											+ list[i].order_status + '</td>';
									content += '</tr>';

									if (k % 7 == 0) {
										j++;
									}
									k++;

								}
								$('#orderPopUpCntnt').html(
										tableStart + content + tableEnd);
								$('.onOrderTitle').removeClass('hideBlock');
								$('#onOrderCount').text(recordCountInOnOrder);
								$('.onOrderPaginationDiv').pagination({
									items : recordCountInOnOrder,
									itemsOnPage : 7,
									cssStyle : 'compact-theme',
									currentPage : currentPageInOnOrder,
									onPageClick : function(pageNumber, event) {
										getOnOrdersForPagination(pageNumber);
									}
								});
								if (recordCountInOnOrder / itemsOnPage > 1) {
									$('.onOrderPaginationDiv').removeClass(
											'hideBlock');
								} else {
									$('.onOrderPaginationDiv').addClass(
											'hideBlock');
								}

							} else {
								$('.onOrderPaginationDiv')
										.addClass('hideBlock');
								$('.onOrderTitle').addClass('hideBlock');
								var error = '<table class="ContentTable" cellspacing="0"><tbody id="orderPopUpErrorTable"></tbody></table>';
								$('#orderPopUpCntnt').html(error);
								$('#orderPopUpErrorTable')
										.html(
												'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
							}
							stopLoading();

						});
	}
}

/**
 * *********************************************POS Indicator
 * function*****************************************************************
 */
function getPosPrice() {
	var param = {
		"iv_article" : articleNo,
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : "12345"
	};
	startLoading();
	/*
	 * $.post( getPOSPriceURL,JSON.stringify(param)) .done(function( response ) {
	 */
	var posPrice = response.pos_price;
	if (posPrice != null)
		return posPrice;
	else
		return 0;
	stopLoading();
	/* }); */
}
/**
 * ****************************************************Reset advance search
 * options***************************************
 */
function resetAdvanceSearch() {
	// $('#searchBox').val('');
	$('input[name="sourceSupply"][id="all"]').trigger('click');
	$('input[name="ranged"][id="ranged"]').prop('checked', true);
}
/**
 * **********************function to validate aisle update
 * *************************
 */
function validateExpireDateAdd(expDate) {
	// var expDate = $('#start').val();
	var selectedUom = "";
	selectedUom = $('input[name="searchByOptionsExpPopUp"]:checked').val();
	var uomFromTable = [];
	var expUomMatch = false;
	uomFromTable = $("#expireDatePopUpTable tr td:nth-child(3)").map(
			function() {
				return $(this).text();
			});
	uomFromTable = $.makeArray(uomFromTable);
	var expDateFromTable = [];

	expDateFromTable = $("#expireDatePopUpTable tr td:nth-child(1)").map(
			function() {
				return $(this).text()
			});
	expDateFromTable = $.makeArray(expDateFromTable);
	//Defect_9189 - removed the pop-up
/*	for ( var i = 0; i < expDateFromTable.length; i++) {
		if (expDateFromTable[i].indexOf((expDate)) > -1
				&& uomFromTable[i].indexOf(selectedUom) > -1) {
			expUomMatch = true;
		}
	}*/

	if (expDate == '') {
		showErrorInEditPop('Please enter expire date.');
		return false;
	} else if (!isValidDate(expDate)) {
		showErrorInEditPop('Please enter Valid date');
		return false;
	} else if (isPastDate(expDate)) {
		showErrorInEditPop('Date should not be Past');
		return false;
	} else if (diff(dateformat(), formateDate(expDate)) > 730) {
		showErrorInEditPop('All expiry dates should be less than 2yrs in the future.');
		return false;
	} else if (expUomMatch == true) {
		showErrorInEditPop('Same expiry date already added for the article.');
		return false;
	} else {
		return true;
	}

}

function validateExpireDateSave(expDate) {
	// var expDate = $('#start').val();
	var selectedUom = $('input[name="searchByOptionsExpPopUp"]:checked').val();
	if (expDate == '') {
		showErrorInEditPop('Please enter expire date.');
		return false;
	} else if (!isValidDate(expDate)) {
		showErrorInEditPop('Please enter Valid date');
		return false;
	} else if (isPastDate(expDate)) {
		showErrorInEditPop('Date should not be Past');
		return false;
	} else if (diff(dateformat(), formateDate(expDate)) > 730) {
		showErrorInEditPop('All expiry dates should be less than 2yrs in the future.');
		return false;
	}
	/*
	 * else if ($('#expireDateCompleteData').html().indexOf(
	 * convertDDMMtoMMDD(expDate)) > -1) { showErrorInEditPop('Same expiry date
	 * already added for the article.'); return false; }
	 */
	else {
		return true;
	}

}
function convertDDMMtoMMDD(date) {
	if (date != '' && date != undefined && date != null) {
		var dateArray = date.split("/");
		return dateArray[1] + "/" + dateArray[0] + "/" + dateArray[2];
	} else {
		return date;
	}

}
function resetNearbyFormValue() {
	$('#NearbyStoreSearchForm')[0].reset();
}
function bindAdditionalTabClickEvents() {
	$('.additionalTab ')
			.click(
					function() {
						clearAllErrors();

						$('html, body').animate(
								{
									scrollTop : ($(".tabContent:visible")
											.offset().top) + 10
								}, 1000);

						if (this.id == "freTab" || this.id == "gftTab"||this.id == "sizeTab"||this.id == "styleTab"||this.id == "seasonTab") {
							$('.printAndEmailDiv').addClass('hideBlock');
							if (this.id == "gftTab") {
								var flg = $('#gftTabF').val();
								if (flg == '0') {
									$('#gftTabF').val('1');
									var param = {
										"iv_site" : $('#posSite').val(),
										"iv_article" : articleNo,
										"iv_ranged" : rangedFlag,
										"iv_sap" : encSapPwd,
										"iv_user_id" : $('#loginUserId').val(),
										"iv_session_id" : ""
									};
									console.log(getGiftCardDetails + ' '
											+ JSON.stringify(param));
									$
											.ajax({
												type : "post",
												url : getGiftCardDetails,
												data : JSON.stringify(param),
												beforeSend : function() {
													startLoading();
												},
												success : function(response) {
													additionalDetails = response;
													if (additionalDetails != null
															&& additionalDetails != undefined
															&& additionalDetails.length > 0) {

														giftCardDetails(additionalDetails[0]);

													} else {
														hidePrintAndEmail();
														var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
														showErrorInGiftCardTab(error);
													}

													stopLoading();
												},
												error : function() {
													// showError('Sorry, Some
													// technical
													// issue occured.');
													stopLoading();
												},
											});
								}
							}
							else if(this.id == "sizeTab"){
								
									var flg = $('#sizeTabF').val();
									if (flg == '0') {
										$('#sizeTabF').val('1');
										var param = {
											"iv_site" : $('#posSite').val(),
											"iv_article" : articleNo,
											"iv_ranged" : rangedFlag,
											"iv_sap" : encSapPwd,
											"iv_user_id" : $('#loginUserId').val(),
											"iv_session_id" : ""
										};
										console.log(testFreshFoodUrl + ' '
												+ JSON.stringify(param));
										$
												.ajax({
													type : "post",
													url : testFreshFoodUrl,
													data : JSON.stringify(param),
													beforeSend : function() {
														startLoading();
													},
													success : function(response) {
														additionalDetails = response;
														if (additionalDetails != null
																&& additionalDetails != undefined
																&& additionalDetails.length > 0) {

															ProductSizeDetails(additionalDetails[0]);

														} else {
															hidePrintAndEmail();
															var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
															showErrorInGiftCardTab(error);
														}

														stopLoading();
													},
													error : function() {
														// showError('Sorry, Some
														// technical
														// issue occured.');
														stopLoading();
													},
												});
									}
								
							}else if(this.id == "seasonTab"){
								
								var flg = $('#seasonTabF').val();
								if (flg == '0') {
									$('#seasonTabF').val('1');
									var param = {
											"iv_site" : $('#posSite').val(),
											"iv_article" : articleNo,
											"iv_ranged" : rangedFlag,
											"iv_sap" : encSapPwd,
											"iv_user_id" : $('#loginUserId').val(),
											"iv_session_id" : ""
										};
									console.log(testFreshFoodUrl + ' '
											+ JSON.stringify(param));
									$
											.ajax({
												type : "post",
												url : testFreshFoodUrl,
												data : JSON.stringify(param),
												beforeSend : function() {
													startLoading();
												},
												success : function(response) {
													additionalDetails = response;
													if (additionalDetails != null
															&& additionalDetails != undefined
															&& additionalDetails.length > 0) {

														ProductSeasonDetails(additionalDetails[0]);

													} else {
														hidePrintAndEmail();
														var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
														showErrorInGiftCardTab(error);
													}

													stopLoading();
												},
												error : function() {
													// showError('Sorry, Some
													// technical
													// issue occured.');
													stopLoading();
												},
											});
								}
							
						}
							
							else if(this.id == "styleTab"){
								
								var flg = $('#styleTabF').val();
								if (flg == '0') {
									$('#styleTabF').val('1');
									var param = {
										"iv_site" : $('#posSite').val(),
										"iv_article" : articleNo,
										"iv_ranged" : rangedFlag,
										"iv_sap" : encSapPwd,
										"iv_user_id" : $('#loginUserId').val(),
										"iv_session_id" : ""
									};
									console.log(testFreshFoodUrl + ' '
											+ JSON.stringify(param));
									$
											.ajax({
												type : "post",
												url : testFreshFoodUrl,
												data : JSON.stringify(param),
												beforeSend : function() {
													startLoading();
												},
												success : function(response) {
													additionalDetails = response;
													if (additionalDetails != null
															&& additionalDetails != undefined
															&& additionalDetails.length > 0) {

														ProductStyleDetails(additionalDetails[0]);

													} else {
														hidePrintAndEmail();
														var error = '<div class="errorDiv promoError"><label>No Data Found.</label></div>';
														showErrorInGiftCardTab(error);
													}

													stopLoading();
												},
												error : function() {
													// showError('Sorry, Some
													// technical
													// issue occured.');
													stopLoading();
												},
											});
								}
							
						}
							  
							
						} else {
							if ($('.printAndEmailDiv').hasClass('hideBlock'))
								$('.printAndEmailDiv').removeClass('hideBlock');
						}

					});
}
function showAllErrors(content) {
	
	$.fn.showCustomMsg([ content ], error, 'Article Details');
	
	/*$('#errorWrapper1').removeClass('hideBlock');
	$('#validateErrors').html(content);*/
}
function getError(msg) {
	return msg;// removed for defect 7176
}
function clearAllErrors() {
	$('#errorWrapper1').addClass('hideBlock');
	$('#warningWrapper').addClass('hideBlock');
	$('#errorWrapperForEdit').addClass('hideBlock');
	$('#noDataWarningWrapper').addClass('hideBlock');
	$('#errorMsgDivEmailPop').removeClass('hideBlock').addClass('hideBlock');
	$('.' + errorFieldClass).each(function() {
		$(this).removeAttr('title');
		$(this).removeClass(errorFieldClass);
	});
	hideWarn();
	$(".quickHelpWrapper").addClass('hideBlock');
	// $(".pageErrorsWrapper").addClass('hideBlock');

}
function showWarn() {
	$('.ContentTableWrapper.records-section').removeClass('hideBlock');
}
function hideWarn() {
	$('.ContentTableWrapper.records-section').addClass('hideBlock');
}
function hideHierarchyList() {
	$("#noSelectionCat").removeClass('hideBlock');
	$("#categoryLst").empty();
	$('#subCat').removeClass('hideBlock');
	$("#subCategoryLst").empty();
	$('#segment').removeClass('hideBlock');
	$("#segmentLst").empty();
}
function showStatusContent(title, errorContent) {
	$('#st_titleContent').html(title);
	$('#st_errorContent').html(errorContent);
	$('#warningWrapper').removeClass('hideBlock');
}
function showAllErrorsInEdit(content) {
	/*
	 * $('#errorWrapperForEdit').removeClass('hideBlock');
	 * $('#validateErrorsForEdit').html(content);
	 */
	$.fn.showCustomMsg([ content ], error, 'Article Details');
}
function showErrorInGiftCardTab(content) {
	$('#giftCardTable').html(content);
}
function showVerifyPage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function showPromoPage(pageNo, tableId, from) {
	currPage = pageNo;
	var pageClass = 'page-' + pageNo;
	$('#' + tableId + ' tr:gt(0)').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
	if (from == 'current') {
		currentPageInCurrent = pageNo;
	} else if (from == 'past') {
		currentPageInPast = pageNo;
	} else if (from == 'future') {
		currentPageInFuture = pageNo;
	}
}

function getOnOrdersForPagination(pageNo) {
	var pageClass = 'page-' + pageNo;
	$('#onOrderTable  tbody tr').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
	currentPageInOnOrder = pageNo;

}
function triggerSort(prop, thead, flag, tableId) {
	var toBeSortList = articleDisplayList;
	sortBasedOnHdr(toBeSortList, prop, thead, flag);
	frameResultRowsInArticleEnquiry(toBeSortList, tableId);
}
function tempSort(id) {

	$('#' + id + ' .table-sort-hdr th').not($('.table-sort-hdr th.noSort'))
			.click(
					function() {
						var flag = true;
						var tableId = $(this).closest('table').attr('id');
						if ($(this).hasClass('sorted')) {
							if ($(this).hasClass('ascending')) {
								flag = false;
							}
						}
						$(this).closest('tr').find('th').removeClass('sorted')
								.removeClass('ascending').removeClass(
										'descending');
						var prop = $(this).attr('data_prop');
						var thead = $(this);
						if (prop != '' && prop != undefined) {
							triggerSort(prop, thead, flag, id);
						}
					});
}
function sortBasedOnHdr(list, prop, thead, flag) {

	if (!flag) {
		$(thead).addClass('sorted').removeClass('ascending').addClass(
				'descending');
		// flag=false;
	} else {
		$(thead).addClass('sorted').addClass('ascending').removeClass(
				'descending');
		// flag=true;
	}
	$.fn.sortArrOfObjectsByParam(list, prop, flag);

}
function frameResultRowsInArticleEnquiry(articleList, tableId) {

	var actualIndex = currentPage - 1;
	var startIndex = '';
	var endIndex = '';
	if (actualIndex == 0) {
		startIndex = 0;
		endIndex = 10;
	} else if (actualIndex != 0) {
		startIndex = actualIndex * itemsOnPage;
		endIndex = currentPage * itemsOnPage;
	}
	articleList = jQuery.grep(articleList, function(n, i) {
		return (i >= startIndex && i < endIndex);
	});
	iterateArticles(articleList, '');
}
function getVendorsForPagination(pageNo) {
	currentPageInPopup = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContentInPopUp').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}
function showNoDataWarning(content) {
	/*
	 * $('#noDataWarningWrapper').removeClass('hideBlock');
	 * $('#noDataWarning').html(content);
	 */
	$.fn.showCustomMsg([ content ], success, "Article Lookup");

}
function bindPrintEvent(obj) {
	$('#printBtnInLookup').unbind('click');
	$('#printBtnInLookup').click(function() {
		NutrionInfoGetPrinterDetails(obj);
	});
}
function NutrionInfoGetPrinterDetails(obj) {

	var param = {};
	// obj, articleList;
	$.ajax({
		type : "post",
		url : getPrinterList,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(responseStr) {

			console.log(responseStr);
			var response = (responseStr);

			if (response != null && response != undefined
					&& response.length > 0) {
				if (response[0].ErrorMsg == undefined)
					showPrintSelectPopup(response, obj);
				else
					showAllErrorsInEdit('' + response[0].ErrorMsg + '');
			} else {
				showNoDataWarning("No Printers connected to the system.");
				stopLoading();
			}
			stopLoading();
		},
		error : function() {
			stopLoading();
		},
	});
}

function showPrintSelectPopup(response, obj, articleList) {
	var popupArea = $('#dialog-printer-list #articleSearchTbody');
	$('#dialog-printer-list .appendedItem').remove();
	for ( var i = 0; i < response.length; i++) {
		popupArea.append(getPrinterRowContent(response[i], i));
	}
	obj = printList(obj, articleList);
	popupArea.data('obj', obj);
	$('#dialog-printer-list #searchArticleCount').text(response.length);
	$('#dialog-printer-list').parent().find('.ui-dialog-title').text(
			'Printer list');
	$("#dialog-printer-list").parent().addClass("popupWrapper");
	$("#dialog-printer-list").dialog("open");
	bindPrinterListContent();
}
function bindPrinterListContent() {
	$('.selectItem').unbind('click');
	$('.selectItem').click(function() {
		var obj = {};
		obj = $('#dialog-printer-list #articleSearchTbody').data('obj');
		obj.printer_no = $(this).closest('tr').attr('id').split('-')[1];
		if ($('#dialog-printer-list #invoice').val() == 0) {
			showAllErrorsInEdit('Please select valid no of copy.');
			$('#dialog-printer-list #invoice').focus();
		} else {
			obj.no_of_copy = $('#dialog-printer-list #invoice').val();
			$('#dialog-printer-list').dialog('close');
			printInfo(obj);
		}
	});
}
function printInfo(param) {
	// obj, articleList;
	$
			.ajax({
				type : "post",
				url : printInfoUrl,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				},
				success : function(responseStr) {

					console.log(responseStr);
					// var response = (responseStr);//ganesh
					var response = responseStr[0].iv_json;// ganesh

					if (response != null && response != undefined
							&& (response != 'false')) {// Ganesh
						if (response == 'true')// Ganesh
						{
							// FIX for Defect_6443 - SMKT_REGRESSION_Lookup_UI
							// issues in messages in lookup
							$.fn.showCustomMsg([ "Printed successfully." ],
									success, "Article Lookup");
							// Defect
							/*
							 * showStatusContent('', '<li>Printed
							 * successfully.</li>');
							 */
						} else if (response.length > 0
								&& response[0].ErrorMsg == undefined)
							showAllErrorsInEdit('' + response[0].ErrorMsg + '');
						else
							showAllErrorsInEdit("Printing Failed, Due to service issue.");
					} else {
						showAllErrorsInEdit("Printing Failed, Due to service issue.");
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
				},
			});

}

function printList(obj, articleList) {
	var salesOrg = $('#salesOrg').val();
	var store_no = $('#posSite').val();
	obj.sales_org = salesOrg;
	obj.store_no = store_no;
	obj.printer_no = '';
	obj.printer_name = ' ';
	obj.no_of_copy = '';
	obj.data = articleList;
	obj.supp_no = obj.supplier_no;
	return obj;
}
function getPrinterRowContent(obj, i) {
	var line_num = obj.line_num == undefined ? '0' : obj.line_num;
	var tr = '<tr id="popup-'
			+ i
			+ '" class="appendedItem"><td id="articleNo">'
			+ obj.row_value
			+ '</td><td class="sorted lastColumn"><label class="linkBtn selectInEnquiry" id="">'
			+ '<label class="selectItem">Select</label></label></td></tr>';
	// + '<td widtd="40px" class="centerValue lastColumn"><input type="checkbox"
	// name="articlecheckbox"></td></tr>';
	return tr;
}

function iterateResult(response) {
	var output = $.parseJSON(response);

	if ((output.data != null && output.data != undefined
			&& output.data[0].msg != undefined && output.data[0].msg.trim() != '')
			|| (output.msg != null && output.msg.length > 0)) {
		var error = '<table class="ContentTable" cellspacing="0"><tbody id="orderfcstPopUpErrorTable"></tbody></table>';
		$('#frcstOrdersPopUpCntnt').html(error);
		$('#orderfcstPopUpErrorTable')
				.html(
						'<div class="errorDiv promoError"><label>No Data Found.</label></div>');
	} else if (output.data != null && output.data.length > 0) {
		var descList = output.data;
		//recordCount = descList[0].count;
		//currentPage = pageNumber;
		// var myDate = new Date();
		var dayOne = new Date();
		var dayTwo = new Date();
		var dayThree = new Date();
		var dayFour = new Date();
		var dayFive = new Date();
		var daySix = new Date();
		dayOne.setDate(dayOne.getDate() + 1);
		dayTwo.setDate(dayTwo.getDate() + 2);
		dayThree.setDate(dayThree.getDate() + 3);
		dayFour.setDate(dayFour.getDate() + 4);
		dayFive.setDate(dayFive.getDate() + 5);
		daySix.setDate(daySix.getDate() + 6);
		var content = '';
		var tableStart = '<table cellspacing="0" class="ContentTable" id=""><thead><tr><th class="centerValue">3/10</th><th class="centerValue">4/10</th>'
				+ '<th class="centerValue">5/10</th><th class="centerValue">6/10</th><th class="centerValue">7/10</th><th class="centerValue">8/10</th>'
				+ '<th class="lastColumn centerValue">9/10</th></tr></thead><tbody>';
		var tableEnd = '</tbody></table>';
		$.each(descList, function(i, item) {

			content += '<tr class="appended ';
			if (i == descList.length)
				content += content + ' lastRow ';
			content += '" id=" ' + i + '">' + '<td class="art-no hideBlock">'
					+ item.articleNo + '</td>' + '<td class="hideBlock">'
					+ item.articleDesc + '</td>' + '<td class="centerValue">'
					+ (item.day1Qty || '') + '</td>' + '<td class="centerValue">'
					+ (item.day2Qty || '') + '</td>' + '<td class="centerValue">'
					+ (item.day3Qty || '') + '</td>' + '<td class="centerValue">'
					+ (item.day4Qty || '') + '</td>' + '<td class="centerValue">'
					+ (item.day5Qty || '') + '</td>' + '<td class="centerValue">'
					+ (item.day6Qty || '') + '</td>' + '<td class="centerValue">'
					+ (item.day7Qty || '') + '</td> </tr>';

		});
		$('#frcstOrdersPopUpCntnt').html(tableStart + content + tableEnd);

	}
	stopLoading();
}
function getForecastOrders(data) {
	if ($('#frcstOrdersPopUpCntnt').html() == '') {
		$.ajax({
			type : "get",
			url : "../article/generateReport.htm",
			data : data,
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
				iterateResult(response);
				stopLoading();
				// getIntrasitOrders(data);
			},
			error : function() {
				// goToLogin();
			},
		});
	}

}
function bindSecurityUOMClickPopUp(id) {

	$('.securityTablePopUp').closest('table').addClass('hideBlock');
	$('.' + id).closest('table').removeClass('hideBlock');
}

function getEANPosPrice(ean, holder) {
	var $dialog = $('#dialog-pos-price');
	var $holder = $dialog.find('#' + holder);
	$dialog.find('.pos_prc_cont').addClass('hideBlock');
	$holder.removeClass('hideBlock');
	if (!($holder.hasClass('loaded'))) {
		$holder.addClass('loaded').removeClass('gploaded');
		callPOSService(ean, $holder);
	}
}
function getGpPriceInfo() {
		var $dialog = $('#dialog-pos-price');
		$dialog.find('#pos_pop_cont').html(getGpCont());
		var $holder = $dialog.find('#SCcontent .pos_prc_cont');
		$dialog.find('.pos_prc_cont').addClass('hideBlock');
		$holder.removeClass('hideBlock');
		if (!($holder.hasClass('gploaded'))) {
			$holder.addClass('gploaded').removeClass('loaded');
			callGPService(articleNo, $holder);
			$dialog.dialog('open');
		}
}
function getGProfitInfo() {
	var $dialog = $('#dialog-pos-price');
	if ($dialog.hasClass('gploaded')) {
		$dialog.dialog('open');
	} else {
		$('#dialog-pos-price').addClass('gploaded').removeClass('loaded');
		getGpPriceInfo();
	}
}
function getEANInfo() {
	var $dialog = $('#dialog-pos-price');
	if ($dialog.hasClass('loaded')) {
		$dialog.dialog('open');
		$dialog.find('#uomRadio_pos input[type="radio"]:first')
				.trigger('click');
		return true;
	} else {
		$('#dialog-pos-price').addClass('loaded').removeClass('gploaded');
		if (packBreakInd == 'Y' || complexPBDFlag == 'Y') {
			var param = {
				"iv_site" : $('#posSite').val(),
				"iv_article" : articleNo,
				"iv_ranged" : rangedFlag,
				"iv_pbd_flag" : packBreakInd,
				"iv_complex_pbd_flag" : complexPBDFlag,
				"iv_sap" : encSapPwd,
				"iv_user_id" : $('#loginUserId').val(),
				"iv_session_id" : ""
			};
			console.log(getPriceDetailsURL + ' ' + JSON.stringify(param));
			$.ajax({
				type : "POST",
				url : getPriceDetailsURL,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				}
			}).done(function(response) {
				if (checkResult(response, 'ean_tun')) {
					openPosPricePopup(response);
				}else{
					stopLoading();
				}
			}).fail(function() {
				$.fn.showCustomMsg([ mobiSerErrCode ], error);
				stopLoading();
			}).always(function() {
				$('#error-warn-wrapper #error_title').addClass('hideBlock');
				//stopLoading();
			});
		} else {
			openPosPricePopup([ {
				ean_tun : $('#eanValue').text(),
				pack_break_uom : $('#uomValue').text(),
				z2_ind : "Y"
			} ]);
		}
	}
}

function openPosPricePopup(response) {
	var $dialog = $('#dialog-pos-price');
	$dialog.find('#pos_pop_cont').html(getPosUomCont(response));
	$dialog.dialog('open');
	$dialog.find('#uomRadio_pos input[type="radio"]:first').trigger('click');
}

function getPosUomCont(list) {
	var cont = '';
	var uomradio = '';
	var uomcont = '';
	var map = $groupBy(list, function(obj) {
		if (obj.z2_ind == 'Y') {
			return obj.pack_break_uom;
		} else {
			return ' ';
		}
	});
	cont += '<div class="innerSectionContent formWrapper" id="SCcontent"><div id="uomRadio_pos">'
			+ '<p class="notes"><strong>Select UOM:</strong>';
	var list = [];
	for (m in map) {
		if (m != ' ') {
			list = map[m];
			uomradio += '<input type="radio" name="searchByOptionsPopUp" id="'
					+ m + '_' + list[0].ean_tun
					+ '" onclick="getEANPosPrice(\'' + list[0].ean_tun
					+ '\',\'' + m + '_' + list[0].ean_tun + '_cont' + '\');">'
					+ '<label for="' + m + '_' + list[0].ean_tun
					+ '" class="labelText">' + m + '</label>';
			uomcont += '<div id="'
					+ m
					+ '_'
					+ list[0].ean_tun
					+ '_cont" class="hideBlock pos_prc_cont">'
					+ '<table class="ContentTable sc-mpl-edit" width="100%" cellspacing="0"><tbody class="uomRadioTablePopUp"><tr class="lastRow">'
					+ '<td width="50%">POS Price:</td><td width="50%" align="center" class="valueInfo price" id="'
					+ m + '_price"></td>' + '</tr></tbody></table></div>';
		}
	}
	cont += (uomradio + '</p></div>' + uomcont + '</div>');
	return cont;
}

function getGpCont() {
	var cont = '';
	var uomradio = '';
	var uomcont = '';
	// var map = $groupBy(list,function(obj){if(obj.z2_ind =='Y'){return
	// obj.pack_break_uom;} else {return ' ';}});
	cont += '<div class="innerSectionContent formWrapper" id="SCcontent"><div id="uomRadio_pos">'
			+ '<p class="notes hideBlock"><strong>Select UOM:</strong>';
	var m = articleUom;
	// for(m in map){
	// if(m !=' '){
	// list = map[m];
	/*
	 * uomradio+= '<input type="radio" name="searchByOptionsPopUp" >' +'<label
	 * for="'+m+'_GP" class="labelText">'+m+'</label>';
	 */
	uomcont += '<div id="'
			+ m
			+ '_GP" class=" pos_prc_cont">'
			+ '<table class="ContentTable sc-mpl-edit" width="100%" cellspacing="0"><tbody class="uomRadioTablePopUp"><tr class="lastRow">'
			+ '<td width="50%" align="center">Gross Profit % :</td><td width="50%" align="center" class="valueInfo price" id=""></td>'
			+ '</tr></tbody></table></div>';
	// }
	// }
	cont += (uomradio + '</p></div>' + uomcont + '</div>');
	return cont;
}

function callPOSService(ean, $holder) {
	var param = {
		"iv_article" : ean
	};
	console.log(getPosPrice + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : getPosPrice,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (checkResult(response, 'msg_typ')) {
					if (response[0].msg_typ == 'S' && response[0].msg == '') {
						$holder.find('.price').text(
								'$ ' + (response[0].netPrice || '0.00'));
					} else {
						$holder.find('.price').text('$ ' + ('0.00'));
						$.fn.showCustomMsg([ response[0].msg ], error);
					}
				}
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error);
		stopLoading();
	}).always(function() {
		$('#error-warn-wrapper #error_title').addClass('hideBlock');
		stopLoading();
	});
}

function callGPService(ean, $holder) {
	var param = {
		iv_article : ean,
		iv_site : $('#posSite').val(),
		iv_user_id : $('#loginUserId').val(),
		iv_sap : encSapPwd
	};
	console.log(getGpInfoURL + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : getGpInfoURL,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (checkResult(response, 'article_no')) {
					if (response[0].msg.trim().indexOf(' ') < 0) {
						$holder.find('.price').text(
								''
										+ (Number(response[0].unitgppercentage
												|| '') / 100));
					} else {
						$holder.find('.price').text(' ' + (''));
						$.fn.showCustomMsg([ response[0].msg ], error);
					}
				}
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error);
		stopLoading();
	}).always(function() {
		$('#error-warn-wrapper #error_title').addClass('hideBlock');
		stopLoading();
	});
}

function callServiceToUpdateExpiryDate(expDate, selectedUom, addOrDelete, id) {
	var param = {
		"iv_article" : articleNo,
		"iv_uom" : selectedUom,
		"iv_user" : loggedInUser,
		"iv_site" : $('#posSite').val(),
		"iv_sales_org" : salesOrg,
		"iv_use_by_date" : formatDateToMDY(expDate),
		"iv_update_mode" : "OOC-BROWSER",
		"iv_action_flag" : addOrDelete
	};
	console.log(updateExpiryDateUrl + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : updateExpiryDateUrl,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (checkResult(response, 'msg_type')) {
					if (response[0].msg_type == 'S') {
						$('#expTabF').val('0');
						$('#expTab').trigger('click');
						$('#expireTab').trigger('click');
						if(deleteFlag){
							$('#'+id).closest('tr').remove();
							deleteFlag=false;
						}
						/*
						 * $.fn.showCustomMsg([ response[0].msg ], success,
						 * 'Article Details');
						 */

					} else {
						$.fn.showCustomMsg([ response[0].msg ], error,
								'Article Details');
						var $parentElem = $('#' + id).closest('tr');
						if(!deleteFlag){
							$parentElem.remove();
						}
					}
				}
				$('#articleExpireDateForm')[0].reset();
				$('input[name="searchByOptionsExpPopUp"][type="radio"]:first')
						.trigger('click');
				stopLoading();
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error);
		stopLoading();
	});

}

function bindExpireRadioClickEvents() {

	$('input[name="searchByOptionsExpPopUp"][type="radio"]').unbind('click');
	$('input[name="searchByOptionsExpPopUp"][type="radio"]').click(
			function() {
				var toBeShown = this.id;
				$('#expireDatePopUpTable tr:not(.' + toBeShown + ')')
						.removeClass('hideBlock').addClass('hideBlock');
				$('#expireDatePopUpTable tr.' + toBeShown)
						.addClass('hideBlock').removeClass('hideBlock');
			});
}
function bindExpireTabRadioClickEvents() {
	$('input[name="searchByOptionsExp"][type="radio"]').unbind('click');
	$('input[name="searchByOptionsExp"][type="radio"]').click(
			function() {
				var toBeShown = this.id;
				$('#outOfCodeData tr:not(:first):not(.' + toBeShown + ')')
						.removeClass('hideBlock').addClass('hideBlock');
				$('#outOfCodeData tr.' + toBeShown).addClass('hideBlock')
						.removeClass('hideBlock');
			});
}
function showExpireTabResults(pageNumber) {
	var toBeShown = 'pageNo-' + pageNumber;
	$('#outOfCodeData tr:not(:first):not(.' + toBeShown + ')').removeClass(
			'hideBlock').addClass('hideBlock');
	$('#outOfCodeData tr.' + toBeShown).addClass('hideBlock').removeClass(
			'hideBlock');
}
function showExpirePopUpResults(pageNumber) {
	var toBeShown = 'pageNo-' + pageNumber;
	$('#expireDatePopUpTable tr:not(.' + toBeShown + ')').removeClass(
			'hideBlock').addClass('hideBlock');
	$('#expireDatePopUpTable tr.' + toBeShown).addClass('hideBlock')
			.removeClass('hideBlock');
}
function populateDefaultTicketingValues()// defect no 6104
{
	var content = '';
	/*
	 * for ( var i = 0; i < list.length; i++) { content += '<li ><a><label
	 * size_var="' + list[i].size_variation + '" temp_grp="' +
	 * list[i].template_group + '" template_id="' + list[i].template_type + '"
	 * class="printTemplate dropdownLabel">' + list[i].template_name + '</label></a></li>'; }
	 */
	content += '<li><a><label size_var="" temp_grp="" template_id="DEFAULTL" class="printTemplate dropdownLabel">Default Label</label></a></li>';
	content += '<li><a><label size_var="" temp_grp="" template_id="DEFAULT" class="printTemplate dropdownLabel">Default Talker</label></a></li>';
	content += '<li ><a><label  template_id="5" class="dropdownLabel printAllTemplate">All Ticket Templates</label></a></li>';
	$('#templateList').html(content);
	$('.numberBox').onlyNumbers();
}
function bindEventsForTicketing() {
	$('.printAllTemplate').unbind('click');
	;// defect no 6104
	$('.printAllTemplate').click(hoverOrClick);
}
var hoverOrClick = function(e) {
	if (!$(this).hasClass('loaded')) {
		$(this).addClass('loaded');
		var param = {
			"iv_article_no" : '',// articleNo, hardcode
			"iv_user" : loggedInUser,
			"iv_session_id" : 'dhfg',
			"iv_site_no" : $('#posSite').val(),
			"iv_sales_org" : salesOrg,
			"iv_platform" : "B",
			"iv_temp_type" : "",
			"iv_temp_name" : ""
		};
		console.log(getPrintTemplateDetailsUrl + ' ' + JSON.stringify(param));
		$.ajax({
			type : "POST",
			url : getPrintTemplateDetailsUrl,
			data : JSON.stringify(param),
			beforeSend : function() {
				startLoading();
			}
		}).done(
				function(response) {
					if (response != null && response != undefined
							&& response.length > 0
							&& response[0].ErrorId == undefined
							&& response[0].template_type != undefined) {
						formTicketingTemplateOptions(response);
						bindPrintAllTicketingEvents();
						$('.numberBox').within999();// Defect 9393
					}
					stopLoading();
				}).fail(function() {
			$.fn.showCustomMsg([ mobiSerErrCode ], error);
			stopLoading();
		});

	}
	bindPrintAllTicketingEvents();
	$('.numberBox').within999();// Defect 9393
};

function formTicketingTemplateOptions(list) {
	var groupedContent = '';
	var groupByTempType = $groupBy(list, function(obj) {
		return obj.template_group;
	});

	groupedContent += '<div class="parameter"><table class="plainTable treetable drilldownTable" cellspacing="0"><tbody>';

	for (key in groupByTempType) {
		var list = [];
		if (key != '' && key != null && key != undefined) {
			list = groupByTempType[key];
			if (list != '' && list != null && list != undefined) {
				/*if (list.length == 1) {
					groupedContent += '<tr size_var="'
							+ (list[0].size_variation || '')
							+ '" temp_name="'
							+ list[0].template_name
							+ '" temp_grp="'
							+ (list[0].template_group || '')
							+ '" template_id="'
							+ list[0].template_type
							+ '" ><td width="8px"><input class="ticketCheck" type="checkbox" id="ticket-'
							+ list[0].template_type
							+ '"></td>'
							+ '<td width="100px"><label for="ticket-'
							+ list[0].template_type
							+ '">'
							+ list[0].size_variation
							+ '</label></td>'
							+ '<td><input id="ticketCopies" type="#" class="textbox numberBox" maxlength="2" value=""></td></tr>';
				} else */if (list.length > 0) {
					groupedContent += '<tr data-tt-id="'
							+ key
							+ '" class="collapsed"><td class="expander" width="8px">&nbsp;</td>'
							+ '<td><strong>' + key+'('+list.length+')'
							+ '</strong></td><td>&nbsp;</td></tr>';
					for ( var i = 0; i < list.length; i++) {
						groupedContent += '<tr size_var="'
								+ (list[i].size_variation || '')
								+ '" temp_name="'
								+ list[i].template_name
								+ '" temp_grp="'
								+ (list[i].template_group || '')
								+ '" template_id="'
								+ list[i].template_type// defect 6553
								+ '" data-tt-id="subRow-'
								+ i
								+ '" data-tt-parent-id="'
								+ key
								+ '" class="noChild collapsed" style="display: table-row;">'
								+ '<td><input class="ticketCheck" type="checkbox" id="ticket-'
								+ list[i].template_type
								+ '"></td>'
								+ '<td><label for="ticket-'
								+ list[i].template_type
								+ '">'
								+ list[i].size_variation
								+ '</label></td><td><input id="ticketCopies" type="#" class="textbox numberBox" maxlength="3" value=""></td>'
								+ '</tr>';
					}
				}
			}
		}
	}
	groupedContent += '</tbody></table></div> <!-- End of parameter -->';

	$('#printallcntnt').html(groupedContent);

	$('#printallcntnt').find('.treetable').treetable({
		expandable : true
	});
}

function bindTicketingPrintClickEvent() {
	$(".printTemplate").unbind('click');
	$(".printTemplate").click(
			function() {
				var templateName = $(this).text();
				var templateId = $(this).attr('template_id');
				var template_size = $(this).attr('size_var');
				var template_grp = $(this).attr('temp_grp');
				$('#dialog-copies').find('#ticketUomDiv').find("input").each(function() {
					if($(this).is(':checked')){
					$(this).trigger("click");
					}});
				$('#dialog-copies').find('#ticketUomDiv').find("input :first").trigger("click");				
				$('#dialog-copies').parent().find('.ui-dialog-title').text(
						'Print ' + templateName);
				$('#dialog-copies').find('#ticketCopies').val("");
				$('#dialog-copies').find('#ticketCopies').within999();// Defect 9393
				$("#dialog-copies").dialog("open");
				$("#dialog-copies .cancelTicket").unbind('click');
				$("#dialog-copies .cancelTicket").click(function() {
					$("#dialog-copies").dialog("close");
				});
				$("#dialog-copies .printTicket").unbind('click');
				$("#dialog-copies .printTicket").click(
						function() {
							var noOfCopies = $('#dialog-copies').find(
									'#ticketCopies').val();
							if (validateBeforePrint()) {
								var list = [];								
								$('#dialog-copies').find('#ticketUomDiv').find("input")
								.each(function() {
									if ($(this).is(':checked')) {
										var selectedUom = $(this).attr("uomValue");
										if(complexPBDFlag == 'Y'){
											selectedUom = $(this).attr("complex_pack_brk_uom");
										}
										var obj = {
												templateName : templateName,
												templateId : templateId,
												template_size : template_size,
												template_grp : template_grp,
												noOfCopies : noOfCopies,
												isisRef: $(this).attr("isis_ref_no"),
												uom :  selectedUom
											};
											list.push(obj);
											}
										});
								callServiceToPrintTicket(list);
							}

						});

			});

}
function bindPrintAllTicketingEvents() {
	$('#dialog-printall').parent().find('.ui-dialog-title')
			.text('Print Ticket');
	$('#printallcntnt').find('input').val("");
	$('#printallcntnt').find('input[type="checkbox"]').attr('checked', false);
	$('#dialog-printall').find('#allticketUomDiv').find("input").each(function() {
		if($(this).is(':checked')){
		$(this).trigger("click");
		}});
	$('#dialog-printall').find('#allticketUomDiv').find("input :first").trigger("click");
	$("#dialog-printall").dialog("open");
	$('#dialog-printall').parent().css('top', '110px');
	$('#printAllTemp').unbind('click');
	$('#printAllTemp')
			.click(
					function() {
						var list = [];
						var copiesNotSelectedList = [];
						var uomAvail = false;
						$('#dialog-printall').find('#allticketUomDiv').find("input")
						.each(function() {
						if ($(this).is(':checked')) {
							uomAvail = true;
						}
						});
						if(uomAvail)
						$('#printallcntnt input.ticketCheck')
								.each(
										function() {
											if ($(this).is(':checked')) {
												var $parentTr = $(this).closest('tr');
												var templateName = $parentTr.attr('temp_name');
												var templateId = $parentTr.attr('template_id');
												var template_size = $parentTr.attr('size_var');
												var template_grp = $parentTr.attr('temp_grp');
												var noOfCopies = $parentTr.find('#ticketCopies').val();
												$parentTr.find('#ticketCopies').within999();// Defect 9393
												$('#dialog-printall').find('#allticketUomDiv').find("input")
												.each(function() {
												if ($(this).is(':checked')) {	
													var selectedUom = $(this).attr("uomValue");
													if(complexPBDFlag == 'Y'){
														selectedUom = $(this).attr("complex_pack_brk_uom");
													}
												var obj = {														
													templateName : templateName,
													templateId : templateId,
													template_size : template_size,
													template_grp : template_grp,
													noOfCopies : noOfCopies,
													isisRef: $(this).attr("isis_ref_no"),
													uom :  selectedUom
												};
												if (noOfCopies != ''
														&& noOfCopies != 0)
													list.push(obj);
												else
													copiesNotSelectedList
															.push(obj);
													}
												});
											}
										});
						if(!uomAvail){
							$.fn.showCustomMsg(
									[ 'Please Select Any UOM.' ],
									error, 'Article Details');
						}
						else if (list.length == 0
								&& copiesNotSelectedList.length == 0) {
							$.fn.showCustomMsg(
									[ 'Please Select Any Ticket Template.' ],
									error, 'Article Details');
						} else if (copiesNotSelectedList.length > 0) {
							$.fn
									.showCustomMsg(
											[ 'Please Enter No. Of Copies For Selected Ticket Template(s).' ],
											error, 'Article Details');
						} else
							callServiceToPrintTicket(list, 'printAll');

					});

	$("#dialog-printall .popupActions label#cancelPrintAll").click(function() {
		$("#dialog-printall").dialog("close");
	});

}
function validateBeforePrint() {
	var uomAvail = false;
	var noOfCopies = $('#dialog-copies').find('#ticketCopies').val();	
	$('#dialog-copies').find('#ticketUomDiv').find("input")
	.each(function() {
		if ($(this).is(':checked')) {
			uomAvail = true;
		}
	});
	if(!uomAvail){
		$.fn.showCustomMsg(
				[ 'Please Select Any UOM.' ],
				error, 'Article Details');
		return false;
	}
	else if (noOfCopies == '' || noOfCopies == 0) {
		$.fn.showCustomMsg([ 'Please enter valid Number of copies' ], error,
				'Article Details');
		return false;
	}
	
	return true;	
}
function callServiceToPrintTicket(list, from) {	
	var param = getPrintTicketParam(list); 
	console.log(sendDetailsToPrinterUrl + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : sendDetailsToPrinterUrl,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (response != null && response != undefined
						&& response.length > 0
						&& response[0].ErrorID == undefined) {
					if (response[0].msg_code == 'S') {
						$.fn.showCustomMsg([ response[0].msg ], success,
								'Article Details');
						if (from == undefined)
							$("#dialog-copies").dialog("close");
						else if (from != undefined) {
							$("#dialog-printall").dialog("close");
						}
					} else if (response[0].msg != undefined
							&& response[0].msg != '') {
						$.fn.showCustomMsg([ response[0].msg ], error,
								'Article Details');
					}
					//Release - 17.11 -Refreshing Notifications 
					loadNotifications();
				} else if (response[0].ErrorID != undefined) {
					$.fn.showCustomMsg([ mobiSerErrCode ], error,
							'Article Details');
				}
				stopLoading();
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error, 'Article Details');
		stopLoading();
	});
}
function getPrintTicketParam(list) {	
	var itemArray = [];
	for ( var i = 0; i < list.length; i++) {
		var obj = {
			"iv_article_no" : (list[i].isisRef == "" || list[i].isisRef == undefined? articleNo: list[i].isisRef),
			"iv_uom" : (list[i].uom == "" || list[i].uom == undefined? articleUom : list[i].uom),
			"iv_temp_type" : list[i].templateId,
			"iv_temp_name" : list[i].templateName,
			"iv_temp_group" : (list[i].template_grp || ''),
			"iv_size_var" : (list[i].template_size || ''),
			"iv_num_of_tkts" : list[i].noOfCopies,
			"iv_ticket_data" : "",
			"iv_action_flag" : "add"
		};
		itemArray.push(obj);
	}

	var hdrParam = {
		"iv_session_id" : "fdg",
		"iv_sales_org" : salesOrgVal,
		"iv_site_no" : siteVal,
		"iv_user" : loggedInUser,
		"iv_platform" : "B",
		"iv_location_name" : "",
		"iv_flag":"REPRINT",
		"article_list" : itemArray
	};

	return hdrParam;

}
function attachSOHScreen(){
	//Attach again to soh screen
	if($sohDtlCont!=undefined){
		$sohDtlCont.appendTo('#adjustSOHDiv');
		$sohDtlCont.find('#editActions.sohAdjustHistory').removeClass('hideBlock');
		$sohDtlCont = undefined;
	}
	$('#reasonsForSOHAdjust').removeClass('loaded');
	populateStockAdjustmentReason();
}

function attachMPLScreen(){
	//$('#editActions').trigger("click");
	$("#dialog-editFunctions").dialog("open");
	$('#mplAndScTab').trigger("click");
	$('.alertText').removeClass("hideBlock").addClass("hideBlock");
	$('#expireTab').removeClass("hideBlock").addClass("hideBlock");
	$('#securityTAG').removeClass("hideBlock").addClass("hideBlock");	
}

function navigateToSOHWithPiVerify() {
	$("#lookUpDivision").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink").removeClass("hideBlock").addClass("hideBlock");
	$("#clearDiv").removeClass("hideBlock").addClass("hideBlock");
	$("#backDiv").addClass("hideBlock").removeClass("hideBlock");
	$("#topLink1").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink2").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink4").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink3").addClass("hideBlock").removeClass("hideBlock");
	$("#detailsDivision").removeClass("hideBlock").addClass("hideBlock");
	$("#adjustSOHDiv").addClass("hideBlock").removeClass("hideBlock");
	$('#backBtn').removeClass('nearBy').addClass('adjustSOH');
}

function showSOHAdjPopUp() {
	$sohDtlCont = $('#soh-adj-dtl-cont').detach();
	$sohDtlCont.appendTo($sohAdjelem.find('.popupContent'));
	$sohAdjelem.find('#editActions.sohAdjustHistory').addClass('hideBlock');
	$sohAdjelem.find('#reasonsForSOHAdjust option[value="PI"]').remove();
	$sohAdjelem.find('#reasonsForSOHAdjust').val('92');
	$sohAdjelem.find('#reasonsForSOHAdjust').trigger('change');
	$sohAdjelem.dialog('open');
}

function showSelectPopupUOM(response, formData) {

	$.fn.loadArticlePopUpNewLkpUom(response, '', '', onArticleTdSelectInUOM,
			selectOption, formData.iv_article, '', formData);
}



var onArticleTdSelectInUOM = function(event) {
	event.stopPropagation();
	var formData = [];
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var articleNo = obj.article_no;
	rangingAndDeranging = false;
	attachSOHScreen();
	$('#sohSearchBox').val(articleNo);
	$('#sohArticleSearch').trigger('click');
	$('#dialog-mulipleArticles').dialog('close');
};



function navigateToSOHWithPiVerifyReasonCode() {
	/*
	 * $("#lookUpDivision").removeClass("hideBlock").addClass("hideBlock");
	 * $("#topLink").removeClass("hideBlock").addClass("hideBlock");
	 * $("#clearDiv").removeClass("hideBlock").addClass("hideBlock");
	 * $("#backDiv").addClass("hideBlock").removeClass("hideBlock");
	 * $("#topLink1").removeClass("hideBlock").addClass("hideBlock");
	 * $("#topLink2").removeClass("hideBlock").addClass("hideBlock");
	 * $("#topLink4").removeClass("hideBlock").addClass("hideBlock");
	 * $("#topLink3").addClass("hideBlock").removeClass("hideBlock");
	 * $("#detailsDivision").removeClass("hideBlock").addClass("hideBlock");
	 * $("#adjustSOHDiv").addClass("hideBlock").removeClass("hideBlock");
	 * $('#backBtn').removeClass('nearBy').addClass('adjustSOH');
	 */
	if (globelResponse.complex_pbd_flag == 'Y'){
		
		var param = {
				"iv_article_no":globelResponse.article_no ,
				"iv_sales_org": $('#salesOrg').val(),
				"iv_site": $('#posSite').val(),
				"iv_platform": "B"
		};
		console.log(getCPBDArticleDetails + ' ' + JSON.stringify(param));
		$.ajax({
			type : "POST",
			url : getCPBDArticleDetails,
			data : JSON.stringify(param),
			beforeSend : function() {
				startLoading();
			}
		}).done(
				function(response) {
					if (response != null && response != undefined
							&& response.length >0 ) {
						showSelectPopupUOM(response,globelResponse.article_no);
						/*showCPBDArticles(response);
						$('#dialog-article-uom').find('.popupActionsWrapper').find('.actionBtn').removeClass('hideBlock');*/
					} else {
						$.fn.showCustomMsg([ mobiSerErrCode ], error);
					}
					stopLoading();
				}).fail(function() {
			$.fn.showCustomMsg([ mobiSerErrCode ], error);
			stopLoading();
		});
			
	}else{
	rangingAndDeranging = false;
	attachSOHScreen();
	$('#sohSearchBox').val(articleNo);
	$('#sohArticleSearch').trigger('click');
	}
}

function showStockAdjustScreen() {
	$("#lookUpDivision").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink").removeClass("hideBlock").addClass("hideBlock");
	$("#clearDiv").removeClass("hideBlock").addClass("hideBlock");
	$("#backDiv").removeClass("hideBlock");//.addClass("hideBlock");
	$("#topLink1").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink2").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink3").removeClass("hideBlock").addClass("hideBlock");
	$("#topLink4").addClass("hideBlock").removeClass("hideBlock");
	$('.sadjDetail').removeClass('hideBlock').addClass('hideBlock');
	$('.sadjMain').addClass('hideBlock').removeClass('hideBlock');
	$("#detailsDivision,.sohArticleDetails").removeClass("hideBlock").addClass("hideBlock");
	$("#adjustSOHDiv").addClass("hideBlock").removeClass("hideBlock");
	$('#sohLookupContainer').addClass("hideBlock").removeClass("hideBlock");
	$('#backBtn').removeClass('nearBy').removeClass('adjustSOH').addClass(
			'directAdjustSoh');
	$('#sohDetails')[0].reset();
}
function showOrHideButtons() {
	if ($('.selectDropdown.AC_LMI .dropdown li:not(.hideBlock)').length == 1) {
		if (autoStockRflag != 'Y')
			$('.selectDropdown.AC_LMI').addClass('hideBlock');
	} else if ($('.selectDropdown.AC_LMI .dropdown li:not(.hideBlock)').length == 0) {
		$('.selectDropdown.AC_LMI').addClass('hideBlock');
	}

	if ($('.selectDropdown.AC_LC .dropdown li:not(.hideBlock)').length == 0) {
		$('.selectDropdown.AC_LC').addClass('hideBlock');
	}
	// as per the Fwd: GP functionality in RF gun mail restricting the GP look
	// up
	if (deptNo == '20') {
		$('#gpLookUP,#gpLookLink').addClass('hideBlock');
	}
}
// new code to range an article
function callServiceToRangeItem(sohParam,obj) {
	var param = {
		"iv_article" : articleNo,
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : "111",
		"iv_user_id" : $('#loginUserId').val(),
		"iv_sap" : encSapPwd
	};

	console.log(rangeArticleToSiteURL + ' ' + JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : rangeArticleToSiteURL,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				if (response != null && response != undefined
						&& response.result !=undefined
						&& response.result.length >0 
						&& response.result[0].ErrorId == undefined) {
					response = response.result;
					if (response[0].typ == 'S') {
						$.fn.showCustomMsg([ 'Ranged article ' + articleNo
								+ ' - ' + articleDesc + ' Successfully' ],
								success, 'Article Details');
						callServiceToAdjustSOH(sohParam,obj);
					} else if (response[0].msg != undefined
							&& response[0].msg != '') {
						$.fn.showCustomMsg([ response[0].msg ], error,
								'Article Details');
					}
				} else if (response.result[0].ErrorId != undefined) {
					$.fn.showCustomMsg([ mobiSerErrCode ], error);
				}
				stopLoading();
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error);
		stopLoading();
	});

}

function callCreateDraftOrderService() {
	startLoading();
	var param = {
		"ItemArray" : [ getOrderParam() ]
	};
	console.log(createOrdersDraftList + ' ' + JSON.stringify(param));
	$
			.post(createOrdersDraftList, JSON.stringify(param))
			.done(
					function(data) {
						console.log('Added to My draft:' + data[0].msg);
						if (data[0].msg_type == 'S') {
							// show success message
							$.fn
									.showCustomMsg(
											[ 'You can access draft order from Orders menu.' ],
											success,
											'Article added to draft Order');
							$("#dialog-addToDraft").dialog("close");
						} else if (data[0].msg == undefined) {
							$.fn
									.showCustomMsg(
											[ 'Technical issue occured,Please contact java support.' ],
											error,
											'Failed to add article to draft Order');
						} else if (data[0].msg_type == 'E') {
							$.fn.showCustomMsg([ data[0].msg ], error,
									'Failed to add article to draft Order');
						}
					}).fail(function() {
				$.fn.showCustomMsg([ mobiSerErrCode ], error);
				stopLoading();
			}).always(function() {
				stopLoading();
			});
}

function getOrderParam() {
	var deliverDate = "";
	if ($("#popUpOrderDeliveryDate").val() != null
			&& $("#popUpOrderDeliveryDate").val() != "")
		deliverDate = ($("#popUpOrderDeliveryDate").val());

	var obj = {
		"iv_site" : $('#posSite').val(),
		"iv_session_id" : "1000",
		"iv_article" : articleDraftObj.article,
		"iv_article_uom" : (articleDraftObj.order_uom != undefined ? articleDraftObj.order_uom
				: articleDraftObj.article_uom),
		"iv_action" : "D",
		"iv_qty" : $('#popupOrderOty').val(),
		"iv_om" : Math.floor(Number(articleDraftObj.om)),
		"iv_delivery_date" : deliverDate,
		"iv_supplier" : (articleDraftObj.supplier||'').trim(),
		"iv_roster_date" : "",
		"iv_draft_type" : (articleDraftObj.source == '1' ? 'PO' : 'SO'),
		"iv_user" : $('#loginUserId').val(),
		"iv_weight" : "",
		"iv_new_uom" : (articleDraftObj.order_uom||''),
		"iv_expiry_date1" : "",
		"iv_expiry_date2" : "",
		"iv_expiry_date3" : "",
		"iv_expiry_date4" : "",
		"iv_expiry_date5" : "",
		"iv_platform" : "B",
                "iv_cost_price": (articleDraftObj.cost_price != undefined) ?articleDraftObj.cost_price : "",
 		"iv_greenlife_flag": (articleDraftObj.cost_price != undefined) ?articleDraftObj.greenlife_flag : "",
 		"iv_alternate_vendor_flag" : (articleDraftObj.alternate_vendor_flag||'')
	};
	return obj;
}

function getSearchArticleUOMParam() {
	var param = {
		"iv_desc" : "N",
		"iv_article_no" : "Y",
		"iv_gtin" : "N",
		"iv_article" : articleDtlInfo.article_no,
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_supplier" : '',//(articleDtlInfo.supplier_no||'').trim(),
		"iv_src_supply" : '',//((articleDtlInfo.supplier_no||'').trim() != '' ? articleDtlInfo.source : '') ,
		"iv_ranged" : "Y",
		"iv_session_id" : "",
		"iv_barcode" : "",
		"iv_site" : $('#posSite').val(),
		"iv_node_id" : "",
		"iv_node_level" : "",
		"iv_barcode_flag" : "",
		"iv_prime_vendor" : "",
		"iv_uom_flag" : "N",
		"iv_auto_stockr_flag" : "",
		"iv_delisted_flag" : "N",
		"iv_deleted_flag" : "N"
	};
	return param;
}

function showPopupWithData() {
	var param = getSearchArticleUOMParam();
	console.log("packBreakArticleSearchDraft"+packBreakArticleSearchDraft + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : packBreakArticleSearchDraft,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					if (response != undefined && response[0] != undefined
							&& response[0].order_uom != undefined
							&& response[0].order_uom.trim() != '') {
						articleHdrObj.order_uom = response[0].order_uom;
						articleDraftObj = response[0];
						$('#popupOrderOM').text(articleDraftObj.om);
						$('#popupOrderOty').val('');  // For Defect_7319
						$('#popupTotalUnit').text(0);
						$('#orderPopupUom')
								.text((articleDraftObj.order_uom||''));
						$('#orderPopupLUom').text(articleHdrObj.article_uom);
						$('#popUpOrderDeliveryDate').val(
								articleDraftObj.delivery_date);
						$("#dialog-addToDraft").parent().addClass(
								"popupWrapper");
						$("#dialog-addToDraft").dialog("open");
					} 
					//Defect_12772 - Fix
					else if(response.length == 1 && (response[0].supplier||'').trim()==''){
		    			$.fn.showCustomMsg(["No supplier found in Store Central please contact support."],error);
		    		}
					else {
						$.fn
								.showCustomMsg(
										[ 'Technical issue occured,Please contact java support.' ],
										error,
										'Failed to add article to draft Order');
					}
					stopLoading();
				},
				error : function() {
					stopLoading();
				},
			});
}

var triggerLeaveStkAdjFromArticleYes = function(e) {
	var $elem = e.data.msg;
	$elem.dialog('close');
	if (fromScreen == undefined) {
		showStockAdjustScreen();
	}else{
		handleLeaveStkAdjFromArticleYes();
	}
};

var triggerUpdateMPLChangesYes = function(e) {
	var $elem = e.data.msg;
	$elem.dialog('close');
	// $("#createOrderButton").trigger('click');

};

var triggerUpdateMPLChangesNo = function(e) {
	var $elem = e.data.msg;
	$elem.dialog('close');
	$("#dialog-editFunctions").dialog("close");

};

function handleLeaveStkAdjFromArticleYes() {
	$("#detailsDivision").removeClass("hideBlock");
	$("#backDiv").removeClass("hideBlock");
	$('#backBtn').removeClass('adjustSOH');
	$("#topLink3").addClass("hideBlock");
	$("#topLink2").addClass("hideBlock");
	$("#topLink1").removeClass("hideBlock");
	$("#adjustSOHDiv").addClass('hideBlock');
}
function loadLookUpDetailsPage() {
	if(rangingAndDeranging){
		rangingAndDeranging =false;
		$sohAdjelem.dialog('close');
	}else{
		$("#detailsDivision").removeClass("hideBlock");
		$("#backDiv").removeClass("hideBlock");
		$('#backBtn').removeClass('nearBy').removeClass('adjustSOH');
		$("#topLink2,#topLink3").addClass("hideBlock");
		$("#topLink1").removeClass("hideBlock");
		$('.nearByLookup').addClass('hideBlock');
		$("#nearbyStoresResultTable,.sohArticleDetails").addClass('hideBlock');
	}
}
function reframeLTOResponse(response) {
	var ltoArray = [];
	var constructedLTOIds = new Array();
	var obj = {};
	for ( var i = 0; i < response.length; i++) {
		obj = {};
		obj = response[i];
		var tempQtyChk='';
		var tempQty = (response[i].lto_qty||'');
		if(response[i].random_weight_flag == 'Y'){			///Defect_7970
		tempQtyChk = (tempQty||(response[i].weight_qty||''));
		tempQty=Math.round(tempQtyChk);
				obj.lto_qty_final = (response[i].scan_uom == response[i].base_uom) ? (tempQty+' '+response[i].pi_uom) :(tempQty+' '+response[i].scan_uom); 
		}else{
			tempQty = (tempQty||(response[i].weight_qty||''));
			obj.lto_qty_final = (tempQty+' '+response[i].scan_uom); 
		}

		if ($.inArray(response[i].lto_id, constructedLTOIds) > -1) {		
			// In the array! so add the qty
			for ( var j = 0; j < ltoArray.length; j++) {				//Defect_7970
				if (ltoArray[j].lto_id == response[i].lto_id) {
					tempQty = (response[i].lto_qty||'');
					if(response[i].random_weight_flag == 'Y'){
						tempQtyChk = (tempQty||(response[i].weight_qty||''));
						tempQty=Math.round(tempQtyChk);
						tempQty = (response[i].scan_uom == response[i].base_uom) ? (tempQty+' '+response[i].pi_uom) :(tempQty+' '+response[i].scan_uom); 
					}else{
						tempQtyChk = (tempQty||(response[i].weight_qty||''));
						tempQty=Math.round(tempQtyChk);
						tempQty = (tempQty+' '+response[i].scan_uom); 
					}
					ltoArray[j].lto_qty_final = ltoArray[j].lto_qty_final +'+'+ tempQty;
				}
			}
		} else {
			// Not in the array
			constructedLTOIds[constructedLTOIds.length] = response[i].lto_id;
			ltoArray.push(obj);
		}
	}
	return ltoArray;
}
function getNearbyStrDtlInf(node) {
	if (!node.row.hasClass('loaded')) {
		node.row.addClass('loaded');
		var $holder = node.children[0].row;
		var siteNo = node.row.attr('data-site');
		loadNearbyDtlCont(siteNo, $holder);
	}
}
function loadNearbyDtlCont(siteNo, $holder) {
	var param = {
		iv_site : siteNo
	};
	console.log('URL =' + getNearbyStoreDtlInfo + " data "
			+ JSON.stringify(param));
	$.ajax({
		type : "POST",
		url : getNearbyStoreDtlInfo,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(data) {
				if (checkResult(data, 'address')) {
					$holder.find('.address').text((data[0].address || ''));
					$holder.find('.contact').text((data[0].contact || ''));
					$holder.find('.store_active_hrs').html(
							formActiveHoursContent(data[0]));
					triggerMap(data[0].latitude, data[0].longitude, $holder);
				} else {
					checkResult(data, 'password');
				}
			}).fail(function() {
		$.fn.showCustomMsg([ mobiSerErrCode ], error);
		stopLoading();
	}).always(function() {
		// getGpPriceInfo();
		stopLoading();
	});
}

function formActiveHoursContent(obj) {
	var content = '';
	content = '<b>Monday</b>		 : '
			+ (obj.store_active_hrs_mon != null
					&& obj.store_active_hrs_mon != "" ? obj.store_active_hrs_mon
					: 'Holiday') + '<br>';
	content += '<b>Tuesday</b>	 : '
			+ (obj.store_active_hrs_tue != null
					&& obj.store_active_hrs_tue != "" ? obj.store_active_hrs_tue
					: 'Holiday') + '<br>';
	content += '<b>Wednesday</b>	 : '
			+ (obj.store_active_hrs_wed != null
					&& obj.store_active_hrs_wed != "" ? obj.store_active_hrs_wed
					: 'Holiday') + '<br>';
	content += '<b>Thursday</b>	 : '
			+ (obj.store_active_hrs_thu != null
					&& obj.store_active_hrs_thu != "" ? obj.store_active_hrs_thu
					: 'Holiday') + '<br>';
	content += '<b>Friday</b> 	 : '
			+ (obj.store_active_hrs_fri != null
					&& obj.store_active_hrs_fri != "" ? obj.store_active_hrs_fri
					: 'Holiday') + '<br>';
	content += '<b>Saturday</b>	 : '
			+ (obj.store_active_hrs_sat != null
					&& obj.store_active_hrs_sat != "" ? obj.store_active_hrs_sat
					: 'Holiday') + '<br>';
	content += '<b>Sunday</b>		 : '
			+ (obj.store_active_hrs_sun != null
					&& obj.store_active_hrs_sun != "" ? obj.store_active_hrs_sun
					: 'Holiday') + '<br>';
	return content;
}
function triggerMap(lat, lon, $holder) {
	var myCenter = new google.maps.LatLng(lat, lon);
	var mapProp = {
		center : myCenter,
		zoom : 15,
		mapTypeId : google.maps.MapTypeId.ROADMAP
	};
	var marker = new google.maps.Marker({
		position : myCenter,
		animation : google.maps.Animation.BOUNCE
	});
	var map = new google.maps.Map($holder.find('.map')[0], mapProp);
	marker.setMap(map);
	// setTimeout(function(){marker.setMap(map);},100);
}

function hideNoDataError() {
	$("#nodata-error-warn-wrapper").fadeOut(50);
}

function checkEditDetails() {
	var $dataRow = $('#mplAndScTable').find('tr[data-mplupdate-bind]:visible');
	var oldMPLValue;
	var newMPLValue;
	var oldSCValue;
	var newSCValue;
	var oldValues = [];
	var selectedUom = $('input[name="searchByOptionsPopUp"]:checked').next(
			'label').text().trim();
	
	var selectedArticleNo = articleNo;
	if ((complexPBDFlag == 'Y')) {
		selectedArticleNo = $dataRow.attr('isis-ref-no');
		console.log('selectedArticleNo ' + selectedArticleNo);
		selectedUom = $('input[name="searchByOptionsPopUp"]:checked').attr(
				'complex-pbd-uom');
		if(selectedUom == undefined){
			for(var i=0;i<rplArray.length;i++){
				if(rplArray[i].isis_ref_no == selectedArticleNo){
					selectedUom = rplArray[i].complex_pack_brk_uom;
				}
			}
		}
		console.log('selectedUom ' + selectedUom);
	}
	$dataRow.find('td.valueInfo').each(function() {
		var value = $(this).attr('data-prev-value');
		oldValues.push(value);
	});
	oldMPLValue = oldValues[0];
	newMPLValue = ($dataRow.find('.currentMpl').val() != undefined && $dataRow
			.find('.currentMpl').val() != '') ? $dataRow.find('.currentMpl')
			.val() : $dataRow.find('.currentMpl').text().trim();
	oldSCValue = oldValues[1];
	newSCValue = ($dataRow.find('.currentSc').val() != undefined && $dataRow
			.find('.currentSc').val() != '') ? $dataRow.find('.currentSc')
			.val() : $dataRow.find('.currentSc').text().trim();
	oldFCValue = oldValues[2];
	newFCValue = ($dataRow.find('.currentFac').val() != undefined && $dataRow
			.find('.currentFac').val() != '') ? $dataRow.find('.currentFac')
			.val() : $dataRow.find('.currentFac').text().trim();

	if (oldMPLValue == newMPLValue && oldSCValue == newSCValue) {
		change = false;
	} else {
		change = true;
	}
}
function formNearByStoreSearchInputParam(siteNo)
{
	var selectedSalesOrg = [];
	$('input[name=salesOrg]:checked')
	.each(
			function() {
				selectedSalesOrg.push($(this).val());
			});
	var param = {
			"articleNo":articleNo,
			"siteNo":siteNo,
			"salesOrg":selectedSalesOrg,
			"distance":$('#distance').val(),
			"maxStores":$('#maxStores').val(),
			"userId":$('#loginUserId').val(),
			"sap":encSapPwd};
	return param;
}
var showSplitedCategory = function(str)
{
	var catList = str.split(',');
	var content = '';
	if (catList.length > 0) {
		
		content += catList[0];

		if (catList.length > 1) {
			content += '<a class="moreNumber moredept" title="';
			for ( var k = 1; k < catList.length; k++) {
				content += '&#13;'
						+ catList[k];
			}
			content += '" > + '
					+ (catList.length - 1)
					+ 'more</a>';
		}
	}
	return content;
};

function bindEnterSpecKeyEvent(){
	$('#advDiv').find('#testinput').keypress(function(event) {
		if (event.which == 13){
			searchArticleForReceiveOrders(advDiv);
		}
		
	});
}




function searchArticleForReceiveOrders(advDiv) {

	var searchTxt = $('#advDiv').find('#testinput').val();
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
	else if (!isNaN((searchTxt).split('-')[0])
			&& (searchTxt).split('-')[0].length <= 7)
		articleNoFlag = "Y";
	else if (!isNaN((searchTxt).split('-')[0])
			&& (searchTxt).split('-')[0].length > 7)
		gtinFlag = "Y";

	if (nodeLevel == undefined && nodeId == undefined) {
		nodeLevel = "";
		nodeId = "";
	}
	srcOfSupplyInd = "2";
	/*if(commonOrder.order_type == 'VENDOR')
	{
		supplierNo = getEmptyIfNull(commonOrder.supplier_no);
		srcOfSupplyInd = "1";
	}*/	
	var param = {
			"iv_article"	: (searchTxt).split('-')[0],
			"iv_site"		: siteVal,
			"iv_sales_org"	: $("#salesOrg").val(),
			"iv_supplier"	: supplierNo,
			"iv_src_supply"	: srcOfSupplyInd,
			"iv_ranged"		: "Y",
			"iv_session_id"	: "",
			"iv_barcode"	: "",
			"iv_node_level"	: nodeLevel,
			"iv_node_id"	:  nodeId,
			"iv_desc"		:descFlag,
			"iv_article_no"	: articleNoFlag,
			"iv_gtin"		: gtinFlag,
			"iv_barcode_flag":"",
			"iv_auto_stockr_flag":"",
			"iv_style": "",
    		"iv_colour": "",
    		"iv_article_size": ""
	};

	console.log(articleHeaderBasicUrl + ' ' + JSON.stringify(param));
	$.ajax({
		type : "post",
		url : articleHeaderBasicUrl,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response.length == 1 && response[0].article_no != undefined) {
				var articleNo=response[0].article_no;
				var articleDesc=response[0].article_desc;
				$('#advDiv').find('#testinput').val(articleNo+"-"+articleDesc);
				
			} else if (response.length > 1) {
				var area = $('#dialog-selectArticle');
				showRecvArticleSelectPopup(area, response);
			} else {
				showRecvErrorMsg('No Data Found', 'Search and Add');
				stopLoading();
			}
			stopLoading();
		},
		error : function() {
			showRecvErrorMsg('Sorry, Some technical issue occured', 'Search and Add');
			stopLoading();
		},
	});	
}

function showRecvArticleSelectPopup(area, response) {
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
			bindPopUpEventsForSelectArticle(area, response);
		}
	} else {
		//triggerOrderHeaderService(response[0], srArea, toAddArea);
	}
}


function bindPopUpEventsForSelectArticle(area, list) {

	$(".selectInArticle").click(function() {
		var id = $(this).attr("id");
		var $tr = $(this).closest('tr');
		var articleNo=$tr.find('.articleNo').text();
		var articleDesc=$tr.find('.articleDesc').text();
		$('#advDiv').find('#testinput').val(articleNo+"-"+articleDesc)
		if ($("#dialog-selectArticle").dialog("isOpen"))
			$("#dialog-selectArticle").dialog("close");
		
		$("#advDiv").removeClass(
		'advancedParam hideBlock');
$("#advDiv").addClass('advancedParam');

$("#advWrapper")
		.removeClass(
				'advancedSearchFormatWrapper hideBlock');
$("#advWrapper").addClass(
		'advancedSearchFormatWrapper');
//dummy content for text and color boxes
var content = '';
content += '<option value="0">Select</option>';
for ( var i = 0; i < list.length; i++) {
	content += '<option value="' + list[i].article_no + '">' + list[i].article_no
	+ '</option>';
}
$('#size').html('');
$('#size').append(content);

$('#color').html('');
$('#color').append(content);

	});
}

function formMultipleArticlesContent(list) {
	var content = '';
	var rowContent = '';
	content += '<div class="tableInfo"><div class="tableTitle hideBlock"><h4 class="countTitle">'
			+ 'Total <strong class="titleCount">526</strong> results found for '
			+ '<strong class="searchString"> apple </strong></h4><h4 class="popupError"></h4></div></div>';

	content += '<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0">'
			+ '<tr><th>Article</th><th>Description</th><th>UOM</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
	if (list != null && list != undefined && list.length > 0) {
		for ( var i = 0; i < list.length; i++) {

			rowContent += '<tr><td class="articleNo">'
					+ list[i].article_no
					+ '</td><td class="articleDesc">'
					+ list[i].article_desc
					+ '</td><td>'
					+ list[i].article_uom
					+ '</td><td class="sorted lastColumn"><label class="linkBtn selectInArticle" id="'
					+ i
					+ '"><label class="selectItem">Select</label></label></td></tr>';

		}
	}
	content += rowContent + '</table></div><input type="hidden" value="'
			+ list.length + '" id="sizeCheck" />';
	return content;
}


function showRecvErrorMsg(msg, title){
	$.fn.showCustomMsg([msg],error,title);
}

function styleSearch(elem,elemToBeTriggered){
	
		  // code for article auto suggest in the text box
		 var maxAutoListSize = 10;
		 var param = {};
		  $(elem)
		    .autocomplete({
		      delay: 0,
		      source: function(request, response) {
		    	param ={
		    			   "iv_style": request.term,
		    			   "iv_auto_stockR": "N",
		    			   "iv_ranged": "Y",
		    			   "iv_session_id": "",
		    			   "iv_auto_stockr_flag": ""
		    			}
		    	//changed search length 2 as 3 for better performance
		        if (request.term.length == 3) {
		          console.log(getarticleStyleSuggestions + ' ' + JSON.stringify(param));
		          // $.ajaxSetup({async: false});
		          $.post(getarticleStyleSuggestions, JSON.stringify(param), function(data) {
		            if (data != '') {
		              suggestionList = data;
		              response($.map(data.slice(0, maxAutoListSize), function(item) {
		                return {
		                  value: item.style,
		                  text: item.style
		                };
		              }));
		            }
		          });
		        } else {
		          setTimeout(function() {
		            if (suggestionList != null && suggestionList != undefined && suggestionList.length > 0) {
		              response(sliceFilteredList(request, suggestionList, maxAutoListSize));
		            }
		          }, 50);
		        }
		      },
		      select: function(event, ui) {
		        $(':hidden[id=hdnmedicineid]')
		          .val(ui.item.text.toString());
		        $(':hidden[id=hdnmedicinenm]')
		          .val(ui.item.value.toString());
		        /*if (elemToBeTriggered != undefined) {
		          setTimeout(function() {
		            $(elemToBeTriggered)
		              .trigger('click');
		          }, 10);
		        }*/
		      },
		      minLength: 2,
		      autoFocus: true
		    });
	
}


function populateColorList(list) {
	var content = '';
	content += '<option value="0">Select</option>';
	for ( var i = 0; i < list.length; i++) {
		content += '<option value="' + list[i].colour + '">' + list[i].colour+ '</option>';
	}
	$('#color').html('');
	$('#color').append(content);
	
}

function populateSizeList(list) {
	var content = '';
	content += '<option value="0">Select</option>';
	for ( var i = 0; i < list.length; i++) {
		content += '<option value="' + list[i].article_size + '">' + list[i].article_size+ '</option>';
	}
	$('#size').html('');
	$('#size').append(content);
	
}
