var globalSearchParam;
var fromScreen = '';
var firsttimeLoadFlag = true;
var roleMap = {
	'ADM' : 'ADM',
	'ITS' : 'ITS',
	'POSRP' : 'POSRP',
	'RA' : 'RA'
};
var itmList;
var objt;
var dangerousGoodFlag = false;
var valueChange = false;
var createFlag = false;
var editFlag = false;
var yesFlag = false;
var attention='';
var articleDetails;
var draftAddArea;
var articleQuantity;
var popupAreaToAddArticle;
var addAreaToAddArticle;
var articleOrderQty;
var listOfArticleToAdd;
var keyChkList = [];
var getArticleUOMRes = '';
var leaveDangerNotes='Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to dispatch of this product/s.';
var dangerFlag='';
var dangerGoodMsg = 'STOP! Dangerous Goods Declaration on CONSIGNMENT NOTE must be read, understood and fully completed prior to despatch of this product/s. <br><br>Consignment Note Completed? ';

var draftClaimHeader = '<div class="tableInfo"><div class="tableTitle"><h5 class="sectionTitle"><strong>List of Draft Claims <label id="draftClaimCount"></label></strong></h5></div><div id="draftPagination" style="float: right;"></div></div>'
		+ '<div class="tableActionsBtnsWrapper "> <div class="lookupActionWrapper"> <label class="linkBtn" id="createNewClaimBtn"><a><label class="addRow">Create New Claim</label></a></label></div> </div>';

var draftSearchResHeader = '<table cellspacing="0" class="ContentTable tableSorter sortTabledraftClaimResults actionRows" id="draftClaimResults">'
		+ '<thead class="table-sort-hdr"> '
		+ '<tr>'
		+ '<th class="" data_prop="order_no" width="100px">Return Order # </th>'
		// + '<th class="centerValue noSort" width="100px">Claim #</th>'
		+ '<th class="" data_prop="supplier_name" >Supplier </th>'
		+ '<th class="" data_prop="source" >Source </th>'
		+ '<th class="" data_prop="reason" >Reason </th>'
		+ '<th class="centerValue " data_prop="creationdate" >Create Date</th>'
		+ '<th class=" centerValue  lastColumn" data_prop="status" width="100px">Status</th>'
		// + '<th class="lastColumn centerValue noSort" width="100px">Article
		// Count</th>'
		+ '</tr>' + '</thead> ' + '<tbody> ' + '</tbody> ' + '</table> ';

var finaliseSearchResHeader = '<table cellspacing="0" class="ContentTable tableSorter sortTablefinaliseClaimResults actionRows" id="finaliseClaimResults">'
		+ '<thead class="table-sort-hdr"> '
		+ '<tr>'
		+ '<th class="" data_prop="order_no" width="100px">Return Order # </th>'
		// + '<th class="centerValue noSort" width="100px">Claim #</th>'
		+ '<th class="" data_prop="supplier_name" >Supplier </th>'
		+ '<th class="" data_prop="source" >Source </th>'
		+ '<th class="" data_prop="reason" >Reason </th>'
		+ '<th class="centerValue " data_prop="finalized_date" >Finalised Date</th>'
		+ '<th class=" centerValue lastColumn" width="100px" data_prop="status">Status</th>'
		// + '<th class="lastColumn centerValue noSort" width="100px">Article
		// Count</th>'
		+ '</tr>' + '</thead> ' + '<tbody> ' + '</tbody> ' + '</table> ';

var finalisedClaimHeader = '<div class="tableInfo"><div class="tableTitle"><h5 class="sectionTitle"><strong>List of Finalised Claims <label id="fineClaimCount"></label></strong></h5></div><div id="finalisedPagination" style="float: right;"></div></div>';

var cancelledSearchResHeader = '<table cellspacing="0" class="ContentTable tableSorter sortTablecancelledClaimResults actionRows" id="cancelledClaimResults">'
	+ '<thead class="table-sort-hdr"> '
	+ '<tr>'
	+ '<th class="" data_prop="order_no" width="100px">Return Order # </th>'
	// + '<th class="centerValue noSort" width="100px">Claim #</th>'
	+ '<th class="" data_prop="supplier_name" >Supplier </th>'
	+ '<th class="" data_prop="source" >Source </th>'
	+ '<th class="" data_prop="reason" >Reason </th>'
	+ '<th class="centerValue " data_prop="cancelled_date" >Cancelled Date</th>'
	+ '<th class=" centerValue lastColumn" width="100px" data_prop="status">Status</th>'
	// + '<th class="lastColumn centerValue noSort" width="100px">Article
	// Count</th>'
	+ '</tr>' + '</thead> ' + '<tbody> ' + '</tbody> ' + '</table> ';

var cancelledClaimHeader = '<div class="tableInfo"><div class="tableTitle"><h5 class="sectionTitle"><strong>List of Cancelled Claims <label id="canClaimCount"></label></strong></h5></div><div id="cancelledPagination" style="float: right;"></div></div>';

var searchTableHdr = '<div class="tableTitle" style="padding-bottom:10px"><br><h4 class="sectionTitle"><strong>List of Articles <strong class="artCount">3</strong></strong>'
		+ '</h4></div></div><table cellspacing="0" class="ContentTable treetable drilldownTable tableSorter" id="editTable">'
		+ '<thead><tr>'
		+ '<th class="noSort">Article #</th>'
		+ '<th class="noSort">Description</th>'
		+ '<th class="centerValue noSort">UOM</th>'
		+ '<th class="centerValue noSort">Return Qty.</th>'
		+ '<th class="centerValue  noSort">OM</th>'
		+ '<th class="centerValue columnHide hideBlock noSort">New OM</th>'
		+ '<th class="centerValue  noSort">Total Units</th>'
		+ '<th class="centerValue onEditOnly noSort">Actions</th>'
		+ '</tr></thead><tbody></tbody><table>';

var searchTableHdrForEdit = '<table cellspacing="0" class="ContentTable treetable sortTableeditTable editTable drilldownTable tableSorter" id="editTable">'
		+ '<thead class="table-sort-hdr"><tr>'
		+ '<th data_prop="article" class="articleInEdit">Article #</th>'
		+ '<th data_prop="description" class="">Description</th>'
		+ '<th data_prop="uom" class="centerValue ">UOM</th>'
		+ '<th data_prop="qty" class="centerValue ">Return Qty.</th>'
		+ '<th data_prop="om" class="centerValue  ">OM</th>'
		+ '<th data_prop="new_om" class="centerValue columnHide hideBlock ">New OM</th>'
		+ '<th data_prop="total_units" class="centerValue  ">Total Units</th>'
		+ '<th class="centerValue noSort onEditOnly ">Actions</th>'
		+ '</tr></thead><tbody></tbody><table>';

var reasonOptions = '<option value="">Select Reason</option>';
var popupHeader = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckboxSelectAll" ></th></tr>';
var reasonSelect = '<select class="selectOptions supplyDrop reason" tabindex="68">'
		+ '</select>';
var toRemoveItems = [];

var reasonMap = {}

var itemsInClaim = [];
var artlmt = 0;
var imagePathMap = new Object();
var linkTrg= true;
var onPageLoadRTV = true;
$(document)
		.ready(
				function() {
					getEncSAPPassword();
					$("#checkboxActive ").click(
							function() {
								if ($("#checkboxActive").is(':checked'))
									$(".columnHide").removeClass('hideBlock');
								else {
									$(".columnHide").addClass('hideBlock');
									$('#editTable tbody tr').each(
											function() {
												var oldOmValue = $(this).find(
														'.omColumn').text()
														.trim();
												$(this).find('.changedOm').val(
														oldOmValue);
											});
									$('.changedOm').trigger('change');
								}
							});

					$("#checkboxActive_edit").click(
							function() {
								if ($("#checkboxActive_edit").is(':checked'))
									$(".columnHide").removeClass('hideBlock');
								else {
									$(".columnHide").addClass('hideBlock');
									$('#editClaimTable tbody tr').each(
											function() {
												var oldOmValue = $(this).find(
														'.omColumn').text()
														.trim();
												$(this).find('.changedOm').val(
														oldOmValue);
											});
									$('.changedOm').trigger('change');
								}
							});

					$(".tabs").tabs();

					$("select.hdr_reason,select.reason").html(reasonOptions);

					$('.quickHelpWrapper .close').click(function() {
						$('.quickHelpWrapper').addClass('hideBlock');
					});
					//click function - Click anywhere to close the msg - Defect_11902;
					$(document).click(function() {
						$('.quickHelpWrapper').addClass('hideBlock');
					});
					$('.quickHelpWrapper').click(function() {
						$('.quickHelpWrapper').addClass('hideBlock');
					});

					$('#errorWrapperClaimlookup .close').click(function() {
						$('#errorWrapperClaimlookup').addClass('hideBlock');
					});

					$('#noDataWarningWrapper .close').click(function() {
						$('#noDataWarningWrapper').addClass('hideBlock');
					});
					
					/*$('.supplyDrop')
					.change(
							function() {*/
					$('body').on('change', '.supplyDrop', function() {
						if($('.claimCreate').is(':visible')){
							if($(this).val()!=''){								
								if($(this).val() == 'Other'){										
									$(this).parent().find('.otherReasonTxt').removeClass('hideBlock');
								} else {
									$(this).parent().find('.otherReasonTxt').addClass('hideBlock');
								}
							} else {
								$(this).parent().find('.otherReasonTxt').addClass('hideBlock');
							}
						}else{
							if($(this).val()!=''){
								//var code = $(this).val().split('(')[1].split(')')[0];
								/*if (code == '95') {
									showAlertInClaimsLookup('Claims are raised manually by support office and hence system may not reflect the Claim # immediately');
								} else if (code == '91' || code == '99') {
									showAlertInClaimsLookup('Supplier claims will not be raised and only Stock will be adjusted');
								}
								*/
								if($(this).val() == 'Other'){										
									$(this).closest('td').find('.otherReasonEdit').removeClass('hideBlock');
								} else {
									$(this).closest('td').find('.otherReasonEdit').addClass('hideBlock');
								}
							} else {
								$(this).closest('td').find('.otherReasonEdit').addClass('hideBlock');
							}
							
						}								
					});

					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 700
					});
					getLimitQtyFromService();
					/*
					 * // Checkbox DropDown functions $(".selectDropdown
					 * .linkBtn").click(function() {
					 * $(".selectDropdown").removeClass('active'); if
					 * ($(this).parent().hasClass('active')) {
					 * $(this).parent().removeClass('active'); } else {
					 * $(this).parent().addClass('active'); } });
					 * 
					 * $('html').click(function() {
					 * $(".selectDropdown").removeClass('active'); });
					 * $("#dialog-replicate").parent().addClass("popupWrapper");
					 * $(".jw-button-finish span").text("Print");
					 */

					// Multiple actions
					$("#dialog-confirm").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 350
					});
					$('#advDiv #userID').on("keypress", function() {
						$('#verifyLabel').addClass('hideBlock');
					});
					// checks radio buttons in IBT Site
					$('#warehouse').click(function() {
						$("#warehouseField").removeClass('hideBlock');
						$("#vendorField").addClass('hideBlock');
						$("#allField").addClass('hideBlock');
					});

					$('#vendor').click(function() {
						$("#vendorField").removeClass('hideBlock');
						$("#warehouseField").addClass('hideBlock');
						$("#allField").addClass('hideBlock');
					});

					$('#all').click(function() {
						$("#allField").removeClass('hideBlock');
						$("#warehouseField").addClass('hideBlock');
						$("#vendorField").addClass('hideBlock');
					});

					$("#dateFrom").datepicker({
						firstDay : 1,
						dateFormat : "dd/mm/yy",
						zIndex : 50,
						//minDate : -60,			// surya request
						onClose : function(selectedDate) {
							$("#dateTo").focus();
						}

					});

					$("#dateTo").datepicker({
						firstDay : 1,
						dateFormat : "dd/mm/yy",
						zIndex : 50

					});

					// <!-- Print -->
					$("#dialog-print").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 500
					});
					$("#dialog-verify").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});

					$("#dialog-verify").parent().addClass("popupWrapper");
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});
					// Popup formatting

					$("#dialog-modalDeactive").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 350
					});
					$("#dialog-modalDeactive").parent()
							.addClass("popupWrapper");

					$("#dialog-modal").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 100,
						maxHeight : 600,
						width : 400
					});

					$("#dialog-modal").parent().addClass("popupWrapper");

					// Receive Order popup attributes
					$("#dialog-modal-Edit").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 150,
						maxHeight : 600,
						width : 430,
						open : function(event, ui) {
							$('#fromDte').datepicker();

						},
						close : function(event, ui) {
							$('#fromDte').datepicker('destroy');
						}
					});
					$(document)
							.keypress(
									function(event) {
										if (event.which == 13) {
											event.preventDefault();
											hideError();

											if ($('.claimEnqAddDiv .searchbox').is(':focus') && yesFlag ==  false/* || (!$('#verifyLabel').hasClass(
													'hideBlock'))*/)
												{
												if(!$("#dialog-confirmation #yesbtn").is(':visible')){
													$('#tableAddAction .formActions #searchAndAdd')
													.click();
												}
												
												
												
												}
											else if(yesFlag ==  true && $("#dialog-confirmation").find('#message').text()
													.toLowerCase().indexOf("non-returnable") > -1){
												hideError();
												
												if($("#dialog-confirmation #yesbtn").is(':visible')){
												$("#dialog-confirmation #yesbtn").trigger('click');
												}
											}
											else{
												if($("#dialog-confirmation #yesbtn").is(':visible')){
												$("#dialog-confirmation #ok").trigger('click');
												}
											}
											/*else
												$('#verifyUser').click();*/

										}
									});

					$("#dialog-modal-Edit").parent().addClass("popupWrapper");
					/*$('.selectOptions option[value="DRAFT"]').attr('selected',
							'selected');*/ //To keep Select Status as default
					
					/*
					 * $("#dialog-print").parent().addClass("popupWrapper");
					 * 
					 * $("#print").click(function() {
					 * $("#dialog-print").dialog("open"); });
					 * 
					 * $("#dialog-print .popupActions label").click(function() {
					 * $("#dialog-print").dialog("close"); });
					 * 
					 * $("#dialog-replicate").parent().addClass("popupWrapper");
					 * $(".jw-button-finish span").text("Print");
					 */
					// <!-- Multiple actions -->
					/*
					 * $("#dialog-confirm .popupActions label").click(function() {
					 * $("#dialog-confirm").dialog("close"); });
					 */

					// code for multiple actions
					/*
					 * $("#beforeSubmit input").click(function() {
					 * $("#dropdownSelect").removeClass('hideBlock'); });
					 * 
					 * $(".dropdownLabel").click(function() {
					 * $("#dialog-confirm").dialog("open"); });
					 * 
					 * $(".linkBtn").click(function() { if
					 * ($("#dialog-modal").dialog("isOpen"))
					 * $("#dialog-modal").dialog("close");
					 * 
					 * });
					 */
					/*
					 * $( "#searchBox" ).keypress(function() {
					 * showArticleNumber(); });
					 */
					$('#verifyUser')
							.click(
									function() {
										hideError();
										if ($(this).attr('id') != 'copyUser') {
											hideError();
											if ($('#advDiv #userID').val()
													.trim() == '') {
												$('#advDiv #userID').focus();
												showErrorContent('Error',
														'Please fill user Id or Name.');

											} else {

												verityUser({
													userId : $(
															'#advDiv #userID')
															.val().trim()
															.split('-')[0]
															.trim()
												}, 'user');
											}
										} else {
											hideError();
											if (($('#advDiv #userID1').val()
													.trim() == '' || ($(
													'#advDiv #userID1').val()
													.indexOf('-') != -1))) {
												$('#advDiv #userID1').focus();
												showErrorContent('Error',
														'Please fill user Id/Name.');

											} else {

												verityUser({
													userId : $(
															'#advDiv #userID1')
															.val().trim()
															.split('-')[0]
															.trim()
												}, 'copy');
											}
										}

									});

					// Code to show and hide filter
					$('#filterOpen').click(function() {
						$("#filterClear").removeClass('hideBlock');
						$(".filterRow").removeClass('hideBlock');
						$(this).addClass('hideBlock');
						// $("#groupByClear").trigger( "click" );
					});

					$('#filterClear').click(function() {
						$("#filterOpen").removeClass('hideBlock');
						$(".filterRow").addClass('hideBlock');
						$(this).addClass('hideBlock');
						$(".tableActionsWrapper").addClass('hideBlock');
					});

					// Checkbox DropDown functions
					$(".buttonMenu").menu({
						position : {
							my : "left top",
							at : "left+3 top+23"
						}
					});
					/*
					 * $(".selectDropdown .linkBtn").click(function() {
					 * $(".selectDropdown").removeClass('active'); if
					 * ($(this).parent().hasClass('active')) {
					 * $(this).parent().removeClass('active'); } else {
					 * $(this).parent().addClass('active'); } });
					 * 
					 * $('html').click(function() {
					 * $(".selectDropdown").removeClass('active'); });
					 * 
					 * $('.selectDropdown .linkBtn').click(function(event) {
					 * event.stopPropagation(); });
					 */
					// $("#dialog-modal").parent().addClass("popupWrapper");
					$("#tooManysupplier").click(function() {
						$("#dialog-modal").parent().addClass("popupWrapper");

						$("#dialog-modal").dialog("open");
						$("#searchWarning").removeClass('hideBlock');
						$("#popupSearch").addClass('hideBlock');

					});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					/*
					 * $("#menu").pagination({ items: 100, itemsOnPage: 10,
					 * cssStyle: 'compact-theme' });
					 */

					// <!-- shows advanced search box when advanced search link
					// is clicked-->
					$("#advLink1")
							.click(
									function() {

										var scroll = $(window).scrollTop();

										var lookupHeight = $('#lookupContainer')
												.height();

										document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
										document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");

										// var lookupBgheight =
										// $("#advDiv").outerHeight() + 20 +
										// "px";
										$("#advWrapper").css("height", "240px");

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
						closeAdvSearchClasses();
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

					// Code for Auto Complete

					/*
					 * var searchList = [ "1234 - Repair Service Request (SR)",
					 * "1235 - Repair Service Request (SR)", "1236 - Repair
					 * Service Request (SR)", "12345 - T-shirt for kids small",
					 * "12347 - T-shirt for kids Med", "12348 - T-shirt for kids
					 * Large", "12349 - T-shirt for boys small", "12350 -
					 * T-shirt for boys Med", "12351 - T-shirt for boys Large",
					 * "12352 - T-shirt for men small", "12363 - T-shirt for men
					 * Med", "12364 - T-shirt for men Large" ];
					 * $("#searchBox").autocomplete({ source : searchList });
					 * 
					 * var supplierList = [ "6545 - Tshirt Sydney Ltd.", "6546 -
					 * Shirt Pvt Ltd.", "4646 - Style Shirt Ltd." ];
					 * $("#supplierBox").autocomplete({ source : supplierList
					 * });
					 */

					// code for table sorter
					// $(".actionRows").tablesorter();
					$(".actionRows th").click(function() {
						$('.actionRows tr td').each(function() {
							$(this).removeClass("sorted");
						});

						col = $(this).parent().children().index($(this));

						$('.actionRows tr').each(function() {
							$(this).find('td').eq(col).addClass("sorted");
						});

					});

					$("#vendorVerify").val(false);

					$("#verifySupplier").click(function() {
						srArea = $('.lookup');
						verifySupplier(srArea);
					});

					$("#dialog-alertBox").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 600,
						width : 300
					});

					$("#dialog-verifySupplier").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 120,
						maxHeight : 650,
						width : 865
					});

					$("#dialog-alertBox,#dialog-verifySupplier").parent()
							.addClass('popupWrapper');

					setDefaultDatesForAdvSearch();
					
					$('#titleCancelled').html('Cancelled');
					$('#titleFinalised').html('Finalised');
					$('#titleDraft').html('Draft');
					$('#goButton,#advGoButton')
							.click(
									function() {
										hideError();
										hideErrorContent();
										area = $('#searchArea');
	var searchText = $('#searchBox').val();
										
										if (searchText == ''){
										
										if (validateBeforeSearch(area)) {
											$(
													'#todaysOrders,#titleDraft,#titleFinalised,#todaysCancelled')
													.addClass('hideBlock');
											$(
													'#tabs ul li[aria-controls="tabs-3"],#tabs ul li[aria-controls="tabs-2"],#tabs ul li[aria-controls="tabs-4"]')
													.removeClass('framed');
											var param = getSearchJson(area);
											globalSearchParam = param;
											searchClaims(
													area,
													param,
													1,
													true,
													$('#tabs ul li[aria-controls="tabs-2"]'));
										}
									}else if (searchText != ''){
										
											$(
													'#todaysOrders,#titleDraft,#titleFinalised,#todaysCancelled')
													.addClass('hideBlock');
											$(
													'#tabs ul li[aria-controls="tabs-3"],#tabs ul li[aria-controls="tabs-2"],#tabs ul li[aria-controls="tabs-4"]')
													.removeClass('framed');
											var param = getSearchJson(area);
											globalSearchParam = param;
											searchClaims(
													area,
													param,
													1,
													true,
													$('#tabs ul li[aria-controls="tabs-2"]'));
										}
									
									if ($('.quickHelpWrapper').is(
												':visible')) {
											$('.quickHelpWrapper').addClass(
													'hideBlock');
										}
									});

					$('#tabs ul li[aria-controls="tabs-2"]').click(function() {
						if (!$(this).hasClass('framed')) {
							hideError();
							$('#tabs-2').html('');
							area = $('#searchArea');
							var param = globalSearchParam;
							param.iv_status = 'DRAFT';
							searchClaims(area, param, 1, false, $(this));
						}
					});
					$('#tabs ul li[aria-controls="tabs-3"]').click(function() {
						if (!$(this).hasClass('framed')) {
							hideError();
							$('#tabs-3').html('');
							area = $('#searchArea');
							var param = globalSearchParam;
							param.iv_status = 'FINALISED';
							searchClaims(area, param, 1, false, $(this));
						}
					});

					$('#tabs ul li[aria-controls="tabs-4"]').click(function() {
						if (!$(this).hasClass('framed')) {
							hideError();
							$('#tabs-4').html('');
							area = $('#searchArea');
							var param = globalSearchParam;
							// NEED to change as CANCELLED
							param.iv_status = 'CANCELLED';
							searchClaims(area, param, 1, false, $(this));
						}
					});
					hideError();
					$('#todaysOrders').addClass('hideBlock');

					$('.lookup').find('#searchBox').focus();
					$('#mainBackBtn')
							.click(
									function(event) {
										event.stopPropagation();
										if (valueChange || (!($('.saveActionArea').hasClass('hideBlock')) && $('.claimCreate').is(':visible'))  || checkForQtyUpdate() ) {
											showYesOrNoPopup("Claim list is not saved. Do you want to save claims?");
										}else if ($('.lookup').is(':visible')
												|| $('.claimCreate').is(
														':visible')) {
											window.location
													.replace("../login/homepage.htm");
										} else if ($('.claimDetail').is(
												':visible')
												&& $("#editAction").hasClass(
														'disabled')) {
											if (valueChange || (!($('.saveActionArea').hasClass('hideBlock')) && $('.claimCreate').is(':visible')) || checkForQtyUpdate()) {
												showYesOrNoPopup("Claim list is not saved. Do you want to save claims?");
											} else {
												$('.lookup').removeClass(
														'hideBlock');
												$('.claimDetail').addClass(
														'hideBlock');
												$('.claimCreate').addClass(
														'hideBlock');
												$('#lookupLink').removeClass(
														'hideBlock');
												$('#detailLink').addClass(
														'hideBlock');
												$('#createLink').addClass(
														'hideBlock');
												$('.lookup').find('#searchBox')
														.focus();
											}
										} else {
											$('.lookup').removeClass(
													'hideBlock');
											$('.claimDetail').addClass(
													'hideBlock');
											$('.claimCreate').addClass(
													'hideBlock');
											$('#lookupLink').removeClass(
													'hideBlock');
											$('#detailLink').addClass(
													'hideBlock');
											$('#createLink').addClass(
													'hideBlock');
											$('.lookup').find('#searchBox')
													.focus();
										}
									});

					$('#editAction').click(
							function() {
								editFlag = true;
								$(".valueInfo").removeAttr('style');
								$("#editMode,.onEditOnly").removeClass(
										'hideBlock');
								$("#viewMode,.onViewOnly")
										.addClass('hideBlock');
								$('.headerActionBtns').find('.actionBtn')
										.addClass('disabled');
								$('.claimDetail').find('#searchBox').focus();
								$('.searchboxInEdit').val('');
								$('#errorDiv').addClass('hideBlock');

								$(".buttonMenu").addClass("hideBlock");

								$("#dummyPrint").removeClass("hideBlock");
								
								if($('select.hdr_reason').val() == 'Other'){
									$('input.otherReasonEdit').removeClass('hideBlock');
								}
								// $('#editClaimTable table
								// th').removeClass('sorted ');
								updateValueChangeFlag();
								if ($('#editClaimTable table tr  td.uomColumn')
										.text() == '') {
									startLoading();
									updateMultipleUOMColumn(itemsInClaim,
											$('#editClaimTable'), true);
								}

							});

					$("#dialog-mulipleArticles").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 515
					});

					$('.closeMessage').click(function() {
						$(this).parent().addClass('hideBlock');
					});
					$("#dialog-printer-list").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 515
					});
					$("#dialog-promptFinalise").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 600,
						width : 700
					});
					$("#dialog-promptFinalise").parent().addClass(
							"popupWrapper");
					
					$("#dialog-cartonCount").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 600,
						width : 400
					});
					$("#dialog-cartonCount").parent().addClass(
							"popupWrapper");

					$('#createNewClaimBtn').click(function() {
						$('.lookup').addClass('hideBlock');
						$('.claimCreate').removeClass('hideBlock');
						$("#titleChange").text("Raise a new Claim");
						$('#lookupLink').addClass('hideBlock');
						$('#createLink').removeClass('hideBlock');
						$('.onEditOnly').removeClass('hideBlock');
						$('.onViewOnly').addClass('hideBlock');
					});

					$(".inputDate").datepicker({
						firstDay : 1,
						dateFormat : "dd/mm/yy",
						zIndex : 50

					});

					$('#saveNewDraft').click(function() {
						area = $('.claimCreate').find('#editClaimTable');
						if (validateDraft(area)) {
							callServiceForCreateDraft(area, 'draft');
						}
					});
					$('#finaliseNewDraft').click(function() {
						if ($('#salesOrg').val() == '1060' && dangerousGoodFlag) {
							dangerousFlagConsignment('new');
						}else {
							confirmationFinalise('new');
						}	
					});

					if ($('#newClaimFlag').val() == 'true') {
						$('.lookup').addClass('hideBlock');
						$('.claimCreate').removeClass('hideBlock');
						$("#titleChange").text("Raise a new Claim");
						$('.claimCreate').find('#searchBox').focus();
						$('#lookupLink').addClass('hideBlock');
						$('#createLink').removeClass('hideBlock');
						$('.onEditOnly').removeClass('hideBlock');
						$('.onViewOnly').addClass('hideBlock');
						var area = $('.claimCreate');
						area.find('#editClaimTable').html('');
						area.find('.saveActionArea').addClass('hideBlock');
						createFlag = true;
						bindSearchAndAddEvents(area);
						area.find('#verifySupplier').unbind('click');
						area.find('#verifySupplier').click(function() {
							verifySupplier(area);
						});
						if(encSapPwd == "" || encSapPwd == undefined){
						var url =getPwd;
						var loggedInUserId = $('#loginUserId').val();
						var param = {
							"IV_USER" : $('#loginUserId').val()
						};
						$
						.post(url, JSON.stringify(param), function() {
							startLoading();
						})
						.done(function(responseStr) {
									encSapPwd = responseStr.result[0].password;
									sessionStorage.password = loggedInUserId+getUTCDateForSAPPwd()+"_"+encSapPwd;
									getReasonCode();
									console.log("success");
								})
						.fail(function() {
									showInformation("Unable to establish connection with local DB.");
								}).always(function() {
									stopLoading();
								});
						}else{
							getReasonCode();
						}
					} else {
						if(encSapPwd == "" || encSapPwd == undefined){
						var url = getPwd;
						var loggedInUserId = $('#loginUserId').val();
						var param = {
							"IV_USER" : $('#loginUserId').val()
						};
						$
								.post(url, JSON.stringify(param), function() {
									startLoading();
								})
								.done(
										function(responseStr) {
											encSapPwd = responseStr.result[0].password;
											sessionStorage.password = loggedInUserId+getUTCDateForSAPPwd()+"_"+encSapPwd;
											callGoButton();
										})
								.fail(
										function() {
											console
													.log("unable to get encripted password.");
											stopLoading();
											showInformation("Unable to establish connection with local DB.");
										}).always(function() {
									// stopLoading();
								});
						}else{
							callGoButton();
						}

					}
					bindEnterKeyEvent();
					$('#dialog-printer-list #invoice').onlyNumbers();
					$(
							".popupActions .actionBtn, .popupActions .secondaryActionBtn")
							.click(function() {
								$("#dialog-mulipleArticles").dialog("close");
							});

					$('.claimCreate').find('#qty').onlyNumbers();
					$('.claimDetail').find('#qty').onlyNumbers();
					fromScreen = $('#fromScreen').val()
					if (fromScreen == 'true') {
						navigatedFromStockAdjustScreen();
					}
					
					$('#userID').onlyAlphaNumericCharacters();
					
					imagePathMap["woolworths"] = "/images/woolworths/wowLogo.PNG";
					imagePathMap["bigw"] = "/images/bigw/bigw_logo.png";
					imagePathMap["bws"] = "/images/bws/logo.gif";
					imagePathMap["corporate"] = "/images/corporate/logo.gif";
					imagePathMap["countdown"] = "/images/countdown/logo.gif";
					imagePathMap["danmurphy"] = "/images/danmurphy/logo.gif";
					imagePathMap["petrol"] = "/images/danmurphy/logo.gif";
					imagePathMap["thomasdux"] = "/images/thomasdux/logo.gif";
					imagePathMap["metro"] = "/images/metro/wowLogo.PNG";
					
					//setTimeout(function(){bindCheckForChanges();},500);
					$(".hdr_carrCountcode").onlyNumbers();
					$("#com8").onlyNumbers();
					$("#tabs #tabs-2").html('');
				});
				
function callGoButton(){
	getReasonCode();
	stopLoading();
	$('#goButton').trigger('click');
	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	var newYear = today.getFullYear();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}

	var presentDate = (newDate + "/"
			+ (newMonth) + "/" + newYear);
	$('#dateFrom').val(presentDate);
	$('#dateTo').val(presentDate);
}
function validateFinalise(area) {
	$('.errorField').removeClass('errorField').removeAttr('title');
	hideErrorContent();
	var flag = true;
	var errorContent = '';
	var articleCount = 0;
	area
			.find('tr.firstSub')
			.each(
					function() {
						var innerFlag = false;
						var supplier = $(this).attr('supplier');
						var supplierNm = $(this).attr('suppname');
						var content = '';

						content += '<li>Supplier : ' + supplier + '<ol>';

						if ($(this).find('.supplyDrop').val().trim() == '') {
							content += '<li>Please select a reason for Supplier "'+supplier+'-'+supplierNm+'"</li>';
							$(this).find('.supplyDrop').error(
									'Please select a reason for Supplier "'+supplier+'-'+supplierNm+'"');
							innerFlag = true;
						}

						/*if ($(this).find('.authcode').val().trim() == '') {
							content += '<li>Authorisation code is Mandatory</li>';
							$(this).find('.authcode ').error(
									'Authorisation code is Mandatory');
							innerFlag = true;
						}*/
						
						if($(this).find(".reason").val()=='Other' && $(this).find(".otherReasonTxt").val()==''){
						if($(this).find(".otherReasonEdit").val() == undefined ||$(this).find(".otherReasonEdit").val() == ''){
							content += '<li>Please Enter the Reason.</li>';
							$('#dialog-promptFinalise').find('.otherReasonEdit').error(
							'Please Enter the Reason');
							innerFlag = true;
						}
						}
						
						if ($(this).find('.authdate ').val().trim() != '') {
/*							content += '<li>Authorisation Date is Mandatory</li>';
							$(this).find('.authdate').error(
									'Authorisation Date is Mandatory');
							innerFlag = true;
						} else {*/
							if (!isValidDate($(this).find('.authdate').val())) {
								content += '<li>Authorisation Date is invalid</li>';
								$(this).find('.authdate').error(
										'Authorisation Date is invalid');
								innerFlag = true;
							}
							if (!isCurrentDate($(this).find('.authdate').val())) {
								content += '<li>Authorisation Date should be Current date</li>';
								$(this)
										.find('.authdate')
										.error(
												'Authorisation Date should be Current date');
								innerFlag = true;
							}
						}
						
						articleCount = 0;

						area
								.find('tr.' + supplier + '')
								.each(
										function() {
											if ($(this).find('.orderQty').val()
													.trim() == '' || $(this).find('.orderQty').val()
													.trim()==0) {
												content += '<li>Article '
														+ $(this).data('obj').article
														+ ' :Please enter Return Quantity</li>';
												$(this)
														.find('.orderQty')
														.error(
																'Please enter Return Quantity');
												innerFlag = true;
											}
											
											articleCount++;
										});
						
						if(articleCount > artlmt){
							content += '<li>Article Claim Limit has been reached. Please generate a new claim.</li>';
							innerFlag = true;
						}
						content += '</ol></li>';
						if (innerFlag) {
							errorContent += content;
							console.log(errorContent);
						}

					});

	if (errorContent != '') {
		flag = false;
		var title = 'Draft Finalise failed for few supplier.';
		showErrorContent(title, errorContent);
	}

	return flag;
}

function validateDraftUpdate(area) {
	$('.errorField').removeClass('errorField').removeAttr('title');
	hideErrorContent();
	var flag = true;
	var errorContent = '';

	var innerFlag = false;
	// var supplier=$(this).attr('supplier');
	var content = '';

	content += '';
	if ($("#dialog-promptFinalise").dialog("isOpen")) {
		if ($('#dialog-promptFinalise').find('.authdate').val() != '') {
			if (!isValidDate($('#dialog-promptFinalise').find('.authdate')
					.val())) {
				content += '<li>Authorisation Date is invalid</li>';
				$('#dialog-promptFinalise').find('.authdate').error(
						'Authorisation Date is invalid');
				innerFlag = true;
			}
			if (!isCurrentDate($('#dialog-promptFinalise').find('.authdate')
					.val())) {
				content += '<li>Authorisation Date should be Current Date</li>';
				$('#dialog-promptFinalise').find('.authdate').error(
						'Authorisation Date should be Current Date');
				innerFlag = true;
			}
		}
	}
	var dtArea = $('.editClaimDiv .onlyForDraft');
	if (dtArea.find('input.hdr_authorisedDate').val() != '') {
		if (!isValidDate(dtArea.find('input.hdr_authorisedDate').val())) {
			content += '<li>Authorisation Date is invalid</li>';
			dtArea.find('input.hdr_authorisedDate')
					.error('Authorisation Date is invalid');
			innerFlag = true;
		}
		if (!isCurrentDate(dtArea.find('input.hdr_authorisedDate').val())) {
			content += '<li>Authorisation Date should be Current Date</li>';
			dtArea.find('input.hdr_authorisedDate').error(
					'Authorisation Date should be Current Date');
			innerFlag = true;
		}
	}

	if (area.find('#editTable').find('tbody').find('tr').length == 0) {
		content += '<li>Atleast 1 article is mandatory</li>';
		innerFlag = true;
	}

	area.find('#editTable').find('tbody').find('tr').each(
			function() {
				if ($(this).find('.orderQty').val().trim() == '') {
					content += '<li>Article ' + $(this).data('obj').article
							+ ' :Please enter Return Quantity</li>';
					$(this).find('.orderQty').error(
							'Please enter Return Quantity');
					innerFlag = true;
				}
			});
	if (innerFlag) {
		errorContent += content;
		console.log(errorContent);
	}

	if (errorContent != '') {
		flag = false;
		var title = 'Draft Finalise failed.';
		showErrorContent(title, errorContent);
	}

	return flag;
}

function validateFinaliseUpdate(area) {
	$('.errorField').removeClass('errorField').removeAttr('title');
	hideErrorContent();
	var flag = true;
	var errorContent = '';

	var innerFlag = false;
	// var supplier=$(this).attr('supplier');
	var content = '';
	var articleCount = 0;
	var supplier = $('.hdr_supplier').text();
	if ($('#dialog-promptFinalise').find('.supplyDrop').val().trim() == '') {
		content += '<li>Please select a reason for Supplier "'+supplier+'"</li>';
		$('#dialog-promptFinalise').find('.supplyDrop').error(
				'Please select a reason for Supplier "'+supplier+'"');
		innerFlag = true;
	}

	/*if ($('#dialog-promptFinalise').find('.authcode').val().trim() == '') {
		content += '<li>Authorisation code is Mandatory</li>';
		$('#dialog-promptFinalise').find('.authcode ').error(
				'Authorisation code is Mandatory');
		innerFlag = true;
	}*/
	if($('#dialog-promptFinalise').find(".reason").val()=='Other'){
		if($('#dialog-promptFinalise').find(".otherReasonEdit").val() == undefined ||$('#dialog-promptFinalise').find(".otherReasonEdit").val() == ''){
		content += '<li>Please Enter the Reason.</li>';
		$('#dialog-promptFinalise').find('.otherReasonEdit').error(
		'Please Enter the Reason');
		innerFlag = true;
		}
	}
	if ($('#dialog-promptFinalise').find('.authdate ').val().trim() != '') {
/*		content += '<li>Authorisation Date is Mandatory</li>';
		$('#dialog-promptFinalise').find('.authdate').error(
				'Authorisation Date is Mandatory');
		innerFlag = true;
	} else {*/
		if (!isValidDate($('#dialog-promptFinalise').find('.authdate').val())) {
			content += '<li>Authorisation Date is invalid</li>';
			$('#dialog-promptFinalise').find('.authdate').error(
					'Authorisation Date is invalid');
			innerFlag = true;
		}
		if (!isCurrentDate($('#dialog-promptFinalise').find('.authdate').val())) {
			content += '<li>Authorisation Date should be Current Date</li>';
			$('#dialog-promptFinalise').find('.authdate').error(
					'Authorisation Date should be Current Date');
			innerFlag = true;
		}
	}

	area.find('#editTable').find('tbody').find('tr').each(
			function() {
				if ($(this).find('.orderQty').val().trim() == '') {
					content += '<li>Article ' + $(this).data('obj').article
							+ ' :Please enter Return Quantity</li>';
					$(this).find('.orderQty').error(
							'Please enter Return Quantity');
					innerFlag = true;
				}
				articleCount++;
			});
	
	if(articleCount > artlmt){
		content += '<li>Article Claim Limit has been reached. Please generate a new claim.</li>';
		innerFlag = true;
	}
	if (innerFlag) {
		errorContent += content;
		console.log(errorContent);
	}

	if (errorContent != '') {
		flag = false;
		var title = 'Draft Finalise failed for few supplier.';
		showErrorContent(title, errorContent);
	}

	return flag;
}

function validateDraft(area) {

	$('.errorField').removeClass('errorField').removeAttr('title');
	hideErrorContent();

	var flag = true;
	var errorContent = '';
	area
			.find('tr.firstSub')
			.each(
					function() {
						var innerFlag = false;
						var supplier = $(this).attr('supplier');
						var content = '';

						content += '<li>Supplier : ' + supplier + '<ol>';

						
						  if($(this).find('.supplyDrop').val().trim()==''){
						  content+='<li>Reason code is Mandatory</li>';
						  $(this).find('.supplyDrop').error('Reason code is  Mandatory'); innerFlag=true; }
						  
						  if($(this).find('.supplyDrop').val().trim()=='Other'){
							  if($(this).find('.otherReasonTxt').val().trim()==''){							  							
							  content+='<li>Enter reason is Mandatory</li>';
							  $(this).find('.otherReasonTxt').error('Enter reason is Mandatory'); innerFlag=true; }}
						/* 
						 * if($(this).find('.authcode').val().trim()==''){
						 * content+='<li>Authorisation code is Mandatory</li>';
						 * $(this).find('.authcode ').error('Authorisation code
						 * is Mandatory'); innerFlag=true; }
						 * 
						 * if($(this).find('.authdate ').val().trim()==''){
						 * content='<li>Authorisation Date is Mandatory</li>';
						 * $(this).find('.authdate').error('Authorisation Date
						 * is Mandatory'); innerFlag=true; }else{}
						 */
						if ($(this).find('.authdate').val() != '') {
							if (!isValidDate($(this).find('.authdate').val())) {
								content += '<li>Authorisation Date is invalid</li>';
								$(this).find('.authdate').error(
										'Authorisation Date is invalid');
								innerFlag = true;
							}
							if (!isCurrentDate($(this).find('.authdate').val())) {
								content += '<li>Authorisation Date should be Current Date</li>';
								$(this)
										.find('.authdate')
										.error(
												'Authorisation Date should be Current Date');
								innerFlag = true;
							}
						}

						area
								.find('tr.' + supplier + '')
								.each(
										function() {
											if ($(this).find('.orderQty').val()
													.trim() == '') {
												content += '<li>Article '
														+ $(this).data('obj').article
														+ ' :Please enter Return Quantity</li>';
												$(this)
														.find('.orderQty')
														.error(
																'Please enter Return Quantity');
												innerFlag = true;
											} else if (Number($(this).find('.orderQty').val()) == 0) {
												content += '<li>Article '
														+ $(this).data('obj').article
														+ ' :Please enter Return Quantity</li>';
												$(this)
														.find('.orderQty')
														.error(
																'Please enter Return Quantity');
												innerFlag = true;
											}
										});
						content += '</ol></li>';
						if (innerFlag) {
							errorContent += content;
							console.log(errorContent);
						}

					});

	if (errorContent != '') {
		flag = false;
		var title = 'Draft Creation for few supplier.';
		showErrorContent(title, errorContent);
	}

	return flag;
}

function showErrorContent(title, errorContent) {
	$('#titleContent').html(title);
	$('#errorContent').html(errorContent);
	$('#errorWrapper').removeClass('hideBlock');
}

function showStatusContent(title, errorContent) {
	$('#st_titleContent').html(title);
	$('#st_errorContent').html(errorContent);
	$('#warningWrapper').removeClass('hideBlock');
}

function hideErrorContent() {
	$('#errorWrapper').addClass('hideBlock');
	$('#warningWrapper').addClass('hideBlock');
}

function bindHeaderEvents() {
	$('#createNewClaimBtn').unbind('click');
	$('#createNewClaimBtn').click(function() {
		$('.lookup').addClass('hideBlock');
		$('.claimCreate').removeClass('hideBlock');
		$("#titleChange").text("Raise a new Claim");
		$('.claimCreate').find('#searchBox').focus();
		$('#lookupLink').addClass('hideBlock');
		$('#createLink').removeClass('hideBlock');
		$('.onEditOnly').removeClass('hideBlock');
		$('.onViewOnly').addClass('hideBlock');
		var area = $('.claimCreate');
		area.find('#editClaimTable').html('');
		area.find('.saveActionArea').addClass('hideBlock');
		bindSearchAndAddEvents(area);
		area.find('#verifySupplier').unbind('click');
		area.find('#verifySupplier').click(function() {
			verifySupplier(area);
		});
	});
}

function validateBeforeSearch(area) {
	var flag = true;
	hideError();
	var dateFrom = $('#dateFrom').val();
	var dateTo = $('#dateTo').val().trim();
	var searchText = $('#searchBox').val();
	var errors = '';
	if (dateFrom == '' && dateTo == '' && searchText == '') {
		errors += getError("Please select Date from and to");
		$('#dateFrom').focus();
		flag = false;
	}
	if ((dateFrom != '' && dateTo == '') || (dateFrom == '' && dateTo != '')) {
		errors += getError("Please select Date from and to");
		flag = false;
	}
	if (dateFrom != '' && dateTo != '') {
		var errorsFromDate = validateDatesInLookup();
		errors += errorsFromDate;
		if (errorsFromDate != '') {
			flag = false;
		}
		var returnValue = fourteenDayDateCheck();

		if (returnValue != '' && Number(returnValue) > 31) {
			errors += getError('Please select a date range within 4 weeks.');
			flag = false;
		}
	}
	if (dateFrom != '' && dateTo != '') {

	}
	if (area.find('[name="userId"]').val() != '') {
		var errorsFromName = onlyAlphaNumeric(area.find('[name="userId"]')
				.val().split("-")[0].trim());
		errors += errorsFromName;
		if (errorsFromName != '')
			flag = false;
	}
	/*
	 * if(flag && $('#supplier').val() != '' && $('#vendorVerify').val() ==
	 * 'false') { showError('Please click on search to verify the supplier');
	 * flag = false; }
	 */
	if (!flag && errors != '') {
		//closeAdvSearchClasses();
		$("#advLink1").trigger('click');
		showAllErrors(errors);
	}
	return flag;
}
function searchClaims(area, param, currentPage, flag, content) {

	// changed for local mobi link call
	//var searchClaimURL = 'http://localhost:8080/StoreCentralServices/orders/getReturnOrderlookup';
	var searchClaimURL = rtvClaimsLookup;
	var searchAgainFlag = false;
	/*if (param.iv_order_no == '' && param.iv_status == '') {
		searchAgainFlag = true;
		param.iv_status = 'DRAFT';
	}*/
	console.log(searchClaimURL + JSON.stringify(param));

	$
			.ajax({
				type : "post",
				url : searchClaimURL,
				data : JSON.stringify(param),
				// changed for local mobi link call
				// contentType:"application/json",
				beforeSend : function() {
					startLoading();
				},
				success : function(responseStr) {
					closeAdvSearchClasses();
					console.log(responseStr);
					// changed for local mobi link call
					//var response = $.parseJSON(responseStr);
					var response = (responseStr);

					if (response.d != undefined && response.d != null) {
						response = response.d.results;

						// area.find('input').val('');
						// setDefaultDatesForAdvSearch();
						if (response.length == 1
								&& response[0].msg.trim() != ''
									&& response[0].msg != undefined
								&& isNaN(response[0].msg.trim())
								&& response[0].msg.trim() != '0') {
							// if (!searchAgainFlag
							// && $('#titleDraft').hasClass('hideBlock')) {
							if(response[0].msg.trim().indexOf('No')>-1 && param.iv_order_no != ""){
								showNoDataWarning('<li>' + 'Claim number not found, please enter valid Claim number'
										+ '</li>');
							}else{
								//Defect_11520
								/*if(	$('#titleDraft').hasClass('hideBlock') && $('#advDiv').find('#lookupOdrStatus').val() ==''){
									$('#titleDraft').removeClass('hideBlock');
									$('#titleFinalised').removeClass('hideBlock');
									$('#titleCancelled').removeClass('hideBlock');
									$('#todaysOrders').removeClass('hideBlock');
									$('#tabs-2').addClass('hideBlock');
									$("#tabs").tabs("option", "active", 0);
								}*/
								if($('#advDiv').find('#lookupOdrStatus').val() ==''){
									onPageLoadRTV = true;
								}
								if(response[0].msg == 'No Data Found'){
									//$('#todaysOrders').addClass('hideBlock');		//Defect_10026
									if(!onPageLoadRTV)
									showNoDataWarning('<li>No Claims Found</li>');
								} else {
									showNoDataWarning('<li>' + response[0].msg
											+ '</li>');
								}
							}
							if(onPageLoadRTV)
							{
							triggerOnLoad(param,true);
							}
							// }
						} else if (response.length >= 1) {
							// showError("You have to form data");
							formSearchResults(response, area, param,
									currentPage, flag, searchAgainFlag);
							if(onPageLoadRTV)
								{
								showHelp();
								triggerOnLoad(param,false);
								}
							$('#todaysOrders').removeClass('hideBlock');
						} else {
							// if (!searchAgainFlag
							// && $('#titleDraft').hasClass('hideBlock')) {
							if (param.iv_order_no == '') {
								//showNoDataWarning("<li>No Claims Found.</li>");
							} else {
								showNoDataWarning("<li>Claim number not found, please enter valid Claim number</li>");
							}
							if(onPageLoadRTV)
							triggerOnLoad(param,true);
							// }
							// if (!searchAgainFlag)
							stopLoading();
						}
					} else {
						showAllErrors("<li>Connection Timed Out.</li>");
					}

					/*
					 * if (searchAgainFlag) { param.iv_status = 'FINALISED';
					 * searchClaims(area, param, currentPage); }
					 */
					/*
					 * if ($('[role="tab"] :visible').length == 1 &&
					 * !searchAgainFlag) { $('[role="tab"]
					 * :visible').trigger('click'); }
					 */

					// if (!searchAgainFlag)
					stopLoading();
					if ($(content) != undefined && $(content) != '') {
						$(content).addClass('framed');
					}
				},
				error : function() {
					if (!searchAgainFlag
							&& $('#titleDraft').hasClass('hideBlock')) {
						showAllErrors('<li>Sorry, Some technical issue occured.</li>');
					}

					// if (!searchAgainFlag)
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});
}
function triggerOnLoad(param,flag){
	if(onPageLoadRTV || param.iv_order_no == ''){
		if(onPageLoadRTV)
			showHelp();
		onPageLoadRTV= false;
		$('#titleFinalised').addClass('hideBlock');
		$('#titleCancelled').addClass('hideBlock');
		$('#titleDraft,#todaysOrders').removeClass('hideBlock');
		if(param.iv_status == 'DRAFT' && flag){
			$('#tabs-2').html('');
			$('#tabs').tabs('option','active',0);
		}
		$("#tabs").find('[aria-controls="tabs-3"] a,[aria-controls="tabs-4"] a').removeClass('hideBlock');
		//$("#tabs #tabs-2").html('');
	}
}
function formSearchResults(response, pr, param, currentPage, searchFlag,
		searchAgainFlag) {
	var draftList = [];
	var finalisedList = [];
	var cancelledList = [];
	var draftFlag = false;
	var finalFlag = false;
	var cancelledFlag = false;
	// if (flag) {
	// }
	var itmCnt = (response[0].msg||'').trim();
	for ( var i in response) {
		if ((response[i].status == 'DRAFT' || response[i].status == 'draft' || response[i].status == '')) {
			response[i].status = 'Draft';
			draftList.push(response[i]);
		} else if ((response[i].status == 'FINALISED' || response[i].status == 'finalised')){
			response[i].status = 'Finalised';
			finalisedList.push(response[i]);
		} else {
			response[i].status = 'Cancelled';
			cancelledList.push(response[i]);
		}
	}
	if (draftList.length > 0) {
		draftFlag = true;
		// commented for performance
		// $('#titleDraft').html('Draft (' + draftList[0].msg + ')');

		var myDraftGrp = $groupBy(
				draftList,
				function(obj) {
					obj.order_no = (obj.order_no != null && obj.order_no != undefined) ? obj.order_no
							.replace(/^0+/, '')
							: obj.order_no;
					obj.article = (obj.article != null && obj.article != undefined) ? obj.article
							.replace(/^0+/, '')
							: obj.article;
					obj.supplier_no = (obj.supplier_no != null && obj.supplier_no != undefined) ? obj.supplier_no/*
							.replace(/^0+/, '')*/
							: obj.supplier_no;
					obj.finalized_date = (obj.finalized_date != null && obj.finalized_date != undefined) ? obj.finalized_date.replace(/\./g,'/')/*
							.replace(/^0+/, '')*/
							: obj.finalized_date;
					obj.cancelled_date = (obj.cancelled_date != null && obj.cancelled_date != undefined) ? obj.cancelled_date.replace(/\./g,'/')/*
							.replace(/^0+/, '')*/
							: obj.cancelled_date;
					return obj.supplier_no;
				});
		var area = $('#tabs-2');
		area.html(draftClaimHeader + draftSearchResHeader);
		$('#draftClaimCount').text('('+itmCnt+')');
		if (currentPage == undefined || currentPage == null) {
			currentPage = 1;
		}
		if (draftList[0].msg != null && draftList[0].msg != undefined
				&& draftList[0].msg != ''
				&& Number(draftList[0].msg.trim()) > 10) {
			$('#draftPagination').pagination({
				items : draftList[0].msg,
				itemsOnPage : 10,
				cssStyle : 'compact-theme',
				currentPage : currentPage,
				onPageClick : function(pageNumber) {
					param.iv_status = 'DRAFT';
					param.iv_page_no = pageNumber;
					searchClaims(pr, param, pageNumber);
				}
			});
		}
		// $('#draftPagination').find('li').removeClass('active');
		// $('#draftPagination').find('li').find('#page-'+currentPage).addClass('active')
		bindHeaderEvents();
		for ( var key in myDraftGrp) {
			var list = myDraftGrp[key];
			area.find('tbody').append(getGrpHeader(key, list[0].supplier_name));

			for ( var item in list) {
				area.find('tbody').append(getRowResults(key, list[item], item));
				area.find('tbody').find('#' + key + '-' + item).data('obj',
						list[item]);
				area.find('tbody').find('#' + key + '-' + item).data('obj').action_flag = 'U';
				area.find('tbody').find('#' + key + '-' + item).unbind('click');
				area.find('tbody').find('#' + key + '-' + item).click(
						function() {
							bindEventForOnClick($(this).data('obj'), $(this));
						});
			}
		}
		if (searchFlag) {
			//showHelp(draftList[0].msg);
		}
		$('#tabs-2').removeClass('hideBlock');
	} else {
		// if(param.iv_status=='DRAFT')
		// $('#titleDraft').addClass('hideBlock');
		if(!$('#tabs [aria-controls="tabs-2"]').hasClass('framed'))
		$('#tabs-2').addClass('hideBlock');
	}
	if (finalisedList.length > 0) {
		finalFlag = true;
		// commented for performacne
		// $('#titleFinalised').html('Finalised (' + finalisedList[0].msg +
		// ')');
		// $('#titleFinalised').html('Finalised');
		var myDraftGrp = $groupBy(
				finalisedList,
				function(obj) {
					obj.order_no = (obj.order_no != null && obj.order_no != undefined) ? obj.order_no
							.replace(/^0+/, '')
							: obj.order_no;
					obj.article = (obj.article != null && obj.article != undefined) ? obj.article
							.replace(/^0+/, '')
							: obj.article;
					obj.supplier_no = (obj.supplier_no != null && obj.supplier_no != undefined) ? obj.supplier_no/*
							.replace(/^0+/, '')*/
							: obj.supplier_no;
					obj.finalized_date = (obj.finalized_date != null && obj.finalized_date != undefined) ? obj.finalized_date.replace(/\./g,'/')/*
							.replace(/^0+/, '')*/
							: obj.finalized_date;
					obj.cancelled_date = (obj.cancelled_date != null && obj.cancelled_date != undefined) ? obj.cancelled_date.replace(/\./g,'/')/*
							.replace(/^0+/, '')*/
							: obj.cancelled_date;
					return obj.supplier_no;
				});
		var area = $('#tabs-3');
		area.html(finalisedClaimHeader + finaliseSearchResHeader);
		$('#fineClaimCount').text('('+itmCnt+')');
		if (currentPage == undefined || currentPage == null) {
			currentPage = 1;
		}
		if (finalisedList[0].msg != null && finalisedList[0].msg != undefined
				&& finalisedList[0].msg != ''
				&& Number(finalisedList[0].msg.trim()) > 10) {
			$('#finalisedPagination').pagination({
				items : finalisedList[0].msg,
				itemsOnPage : 10,
				cssStyle : 'compact-theme',
				currentPage : currentPage,
				onPageClick : function(pageNumber) {
					param.iv_status = 'FINALISED';
					param.iv_page_no = pageNumber;
					searchClaims(pr, param, pageNumber);
				}
			});
		}
		// $('#finalisedPagination').find('li').removeClass('active');
		// $('#finalisedPagination').find('li').find('#page-'+currentPage).addClass('active')
		for ( var key in myDraftGrp) {
			var list = myDraftGrp[key];
			area.find('tbody').append(getGrpHeader(key, list[0].supplier_name));

			for ( var item in list) {
				area.find('tbody').append(getRowResults(key, list[item], item));
				// applicationSettings CR area.find('tbody tr[mainrow]').addClass(viewFinaliseDetails);
				area.find('tbody').find('#' + key + '-' + item).data('obj',
						list[item]);
				area.find('tbody').find('#' + key + '-' + item).unbind('click');
				area.find('tbody').find('#' + key + '-' + item).click(
						function() {
							bindEventForOnClick($(this).data('obj'), $(this));
						});
			}
		}
		$('#tabs-3').removeClass('hideBlock');
	} else {
		// if(param.iv_status!='DRAFT')
		// $('#titleFinalised').addClass('hideBlock');
		if(!$('#tabs [aria-controls="tabs-3"]').hasClass('framed'))
		$('#tabs-3').addClass('hideBlock');
	}
	
	if (cancelledList.length > 0) {
		cancelledFlag = true;
		// commented for performacne
		// $('#titleFinalised').html('Finalised (' + finalisedList[0].msg +
		// ')');
		// $('#titleFinalised').html('Finalised');
		var myDraftGrp = $groupBy(
				cancelledList,
				function(obj) {
					obj.order_no = (obj.order_no != null && obj.order_no != undefined) ? obj.order_no
							.replace(/^0+/, '')
							: obj.order_no;
					obj.article = (obj.article != null && obj.article != undefined) ? obj.article
							.replace(/^0+/, '')
							: obj.article;
					obj.supplier_no = (obj.supplier_no != null && obj.supplier_no != undefined) ? obj.supplier_no/*
							.replace(/^0+/, '')*/
							: obj.supplier_no;
					obj.finalized_date = (obj.finalized_date != null && obj.finalized_date != undefined) ? obj.finalized_date.replace(/\./g,'/')/*
							.replace(/^0+/, '')*/
							: obj.finalized_date;
					obj.cancelled_date = (obj.cancelled_date != null && obj.cancelled_date != undefined) ? obj.cancelled_date.replace(/\./g,'/')/*
							.replace(/^0+/, '')*/
							: obj.cancelled_date;
					return obj.supplier_no;
				});
		var area = $('#tabs-4');
		area.html(cancelledClaimHeader + cancelledSearchResHeader);
		$('#canClaimCount').text('('+itmCnt+')');
		if (currentPage == undefined || currentPage == null) {
			currentPage = 1;
		}
		if (cancelledList[0].msg != null && cancelledList[0].msg != undefined
				&& cancelledList[0].msg != ''
				&& Number(cancelledList[0].msg.trim()) > 10) {
			$('#cancelledPagination').pagination({
				items : cancelledList[0].msg,
				itemsOnPage : 10,
				cssStyle : 'compact-theme',
				currentPage : currentPage,
				onPageClick : function(pageNumber) {
					param.iv_status = 'CANCELLED';
					param.iv_page_no = pageNumber;
					searchClaims(pr, param, pageNumber);
				}
			});
		}
		// $('#finalisedPagination').find('li').removeClass('active');
		// $('#finalisedPagination').find('li').find('#page-'+currentPage).addClass('active')
		for ( var key in myDraftGrp) {
			var list = myDraftGrp[key];
			area.find('tbody').append(getGrpHeader(key, list[0].supplier_name));

			for ( var item in list) {
				area.find('tbody').append(getRowResults(key, list[item], item));
				//area.find('tbody tr[mainrow]').addClass(viewFinaliseDetails);
				area.find('tbody').find('#' + key + '-' + item).data('obj',
						list[item]);
				area.find('tbody').find('#' + key + '-' + item).unbind('click');
				area.find('tbody').find('#' + key + '-' + item).click(
						function() {
							bindEventForOnClick($(this).data('obj'), $(this));
						});
			}
		}
		$('#tabs-4').removeClass('hideBlock');
	} else {
		// if(param.iv_status!='DRAFT')
		// $('#titleCancelled').addClass('hideBlock');
		if(!$('#tabs [aria-controls="tabs-4"]').hasClass('framed'))
		$('#tabs-4').addClass('hideBlock');
	}
	
	if (param.iv_order_no != '' && param.iv_order_no != undefined
			&& param.iv_order_no != null) {
		var id = '';
		if (draftList.length > 0) {
			$('#titleFinalised').addClass('hideBlock');
			$('#titleCancelled').addClass('hideBlock');
			$('#titleDraft').removeClass('hideBlock');
			$("#tabs").tabs("option", "active", 0);
			id = 'draftClaimResults';
		} else if(finalisedList.length > 0) {
			$('#titleFinalised').removeClass('hideBlock');
			$('#titleCancelled').addClass('hideBlock');
			$('#titleDraft').addClass('hideBlock');
			$("#tabs").tabs("option", "active", 1);
			id = 'finaliseClaimResults';
		} else {
			$('#titleCancelled').removeClass('hideBlock');
			$('#titleFinalised').addClass('hideBlock');
			$('#titleDraft').addClass('hideBlock');
			$("#tabs").tabs("option", "active", 2);
			id = 'cancelledClaimResults';
		}
		//if(draftList.length > 0 || finalisedList.length > 0)
		$('#' + id + ' tr:last').trigger('click');
	}
	
	if(param.iv_order_no == ''){
		if(draftList.length > 0){
			$("#tabs").tabs("option",
					"active", 0);
		} else if(finalisedList.length > 0){
			$("#tabs").tabs("option",
					"active", 1);
		} else if(cancelledList.length > 0){
			$("#tabs").tabs("option",
					"active", 2);
		}
		if(param.iv_status =='DRAFT' && draftList.length == 0){
			 $.fn.showCustomMsg(['No Draft claims found'],error);	
		}else if(param.iv_status =='FINALISED' && finalisedList.length == 0){
			 $.fn.showCustomMsg(['No Finalised claims found'],error);	
		}else if(param.iv_status =='CANCELLED' && cancelledList.length == 0){
			 $.fn.showCustomMsg(['No Cancelled claims found'],error);	
		}
		//(finalisedList.length > 0) ? $('#titleFinalised').removeClass('hideBlock') : $('#titleFinalised').addClass('hideBlock');
		//(cancelledList.length > 0) ? $('#titleCancelled').removeClass('hideBlock') : $('#titleCancelled').addClass('hideBlock');
	}

	if (draftFlag || finalFlag || cancelledFlag) {

		callFunctionForSorting('draftClaimResults');
		callFunctionForSorting('finaliseClaimResults');
		callFunctionForSorting('cancelledClaimResults');
	}
	securityMatrix();
	if ($('#advDiv [name="status"]')
			.val().toUpperCase() == 'DRAFT' && draftFlag) {
		$('#titleFinalised').addClass(
				'hideBlock');
		$('#titleCancelled').addClass(
				'hideBlock');
		$('#titleDraft').removeClass(
				'hideBlock');
		$("#tabs").tabs("option",
				"active", 0);
	} else if ($(
			'#advDiv [name="status"]')
			.val().toUpperCase() == 'FINALISED' && finalFlag) {
		$('#titleFinalised')
				.removeClass(
						'hideBlock');
		$('#titleDraft').addClass(
				'hideBlock');
		$('#titleCancelled').addClass(
				'hideBlock');
		$("#tabs").tabs("option",
				"active", 1);
	} else if ($(
			'#advDiv [name="status"]')
			.val().toUpperCase() == 'CANCELLED' && cancelledFlag ) {

		$('#titleCancelled')
				.removeClass(
						'hideBlock');
		$('#titleFinalised').addClass(
				'hideBlock');
		$('#titleDraft').addClass(
				'hideBlock');
		$("#tabs").tabs("option",
				"active", 2);
	}
	else {

$('#titleCancelled')
		.removeClass(
				'hideBlock');
$('#titleFinalised').removeClass(
		'hideBlock');
$('#titleDraft').removeClass(
		'hideBlock');
}
}

function getRowResults(key, item, index) {
	content = '<tr mainrow id="'
			+ key
			+ '-'
			+ index
			+ '">'
			+ '<td>'
			+ item.order_no
			+ '</td>' // + '<td class="centerValue">' +
			// item.article + '</td>'
			+ '<td>'
			+ item.supplier_name
			+ '('
			+ item.supplier_no
			+ ')</td>'
			+ '<td>'
			+ item.source
			+ '</td>'
			+ '<td class="reasonCd">'
			+ item.reason
			+ '</td>'
			+ '<td class="centerValue">'
			+ ((item.status == 'Draft') ? item.creationdate
					: ((item.status == 'Finalised') ? item.finalized_date
							: item.cancelled_date)) + '</td>'
			+ '<td class=" lastColumn centerValue">' + item.status + '</td>'
			// + '<td class="lastColumn centerValue">' + item.article_count
			// + '</td>'
			+ '</tr>';
	return content;
}

function showAlert(msg, id) {
	$('#alertBox').text(msg);
	$('#dialog-alertBox').parent().find('.ui-dialog-title').text(
			'Claims Lookup');
	$("#dialog-alertBox").removeClass('hideBlock');
	$("#dialog-alertBox").parent().addClass("popupWrapper");
	$("#dialog-alertBox").dialog("open");
	$('#okBtn').unbind('click');
	$('#okBtn').click(function(e) {
		$("#dialog-alertBox").dialog("close");
		$("#" + id).focus();
		var temp = $("#" + id).val();
		$("#" + id).val(temp);
	});
}

function formVendorSearchResultsForEnquiry(list) {
	var content = '';
	var rowContent = '';
	content += '<div class="tableInfo"><div class="tableTitle hideBlock"><h4 class="countTitle">'
			+ 'Total <strong class="titleCount">526</strong> results found for '
			+ '<strong class="searchString"> apple </strong></h4><h4 class="popupError"></h4></div></div>';

	content += '<div class="ContentTableWrapper"><table class="ContentTable" cellspacing="0">'
			+ '<tr><th>Vendor #</th><th>Description</th><th>Phone Number</th><th>Fax Number</th>'
			+ '<th>Suburb</th><th>State</th><th>Lead Time</th><th width="25px" class="lastColumn">&nbsp;</th></tr>';
	if (list != null && list != undefined && list.length > 0) {
		for ( var i = 0; i < list.length; i++) {

			rowContent += '<tr><td id="suppNoEnq'
					+ i
					+ '">'
					+ list[i].vendor_no
					+ '</td><td id="suppNameEnq'
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
					+ getEmptyIfNull(list[i].lead_time)
					+ '</td><td class="sorted lastColumn"><label class="linkBtn selectInEnquiry" id="'
					+ i
					+ '"><label class="selectItem">Select</label></label></td></tr>';

		}
	}
	content += rowContent + '</table></div><input type="hidden" value="'
			+ list.length + '" id="sizeCheck" />';
	return content;
}
function fourteenDayDateCheck() {
	var oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
	var dateFrom = $("#dateFrom").val().split("/")[0];
	var monthFrom = $("#dateFrom").val().split("/")[1] - 1;
	var yearFrom = $("#dateFrom").val().split("/")[2];

	var dateTo = $("#dateTo").val().split("/")[0];
	var monthTo = $("#dateTo").val().split("/")[1] - 1;
	var yearTo = $("#dateTo").val().split("/")[2];

	var firstDate = new Date(yearFrom, monthFrom, dateFrom);
	var secondDate = new Date(yearTo, monthTo, dateTo);

	var diffDays = Math.round(Math.abs((firstDate.getTime() - secondDate
			.getTime())
			/ (oneDay)));

	return diffDays;
}
function setDefaultDatesForAdvSearch() {
	var today = new Date();
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	var newYear = today.getFullYear();
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}

	var presentDate = (newDate + "/" + (newMonth) + "/" + newYear);
	$('#dateTo').val(presentDate);

	var threeMontsBeforDate = new Date();
	threeMontsBeforDate.setTime(threeMontsBeforDate.getTime()
			- (60 * 60 * 24 * 1000 * 14));

	var newFromDate = threeMontsBeforDate.getDate();
	var newFromMonth = threeMontsBeforDate.getMonth() + 1;

	if (newFromDate < 10) {
		newFromDate = '0' + newFromDate;
	}
	if (newFromMonth < 10) {
		newFromMonth = '0' + newFromMonth;
	}

	var threeMontsBeforeToDate = (newFromDate + "/" + (newFromMonth) + "/" + threeMontsBeforDate
			.getFullYear());
	$('#dateFrom').val(threeMontsBeforeToDate);
}

function showInformation(msg, reloadFlag) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
		$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#ok').unbind('click');

		$("#dialog-confirmation").find('#ok').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
			/* printClaimPopup("Are you sure you want to print claim?"); */

			if (reloadFlag != undefined && reloadFlag) {
				window.location.href = '';
			} else {
				$('.editRecord').trigger('click');
			}

		});
	} catch (err) {
		showInformation(msg,reloadFlag);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

function showInformationFinalise(msg, reloadFlag, claimNo, area) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
		$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#ok').unbind('click');

		$("#dialog-confirmation").find('#ok').click(
				function() {
					$("#dialog-confirmation").parent().removeClass(
							"popupWrapper");
					$("#dialog-confirmation").dialog("close");
					printClaimPopup('Are you sure you want to print claim  "'
							+ claimNo + '"?', area);

					/*
					 * if (reloadFlag != undefined && reloadFlag) {
					 * window.location.href = ''; } else {
					 * $('.editRecord').trigger('click'); }
					 */
				});
	} catch (err) {
		showInformation(msg);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}
function dangerousFlagConsignment(from) {

	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});;
		
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#ok').removeClass('hideBlock').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').removeClass('hideBlock').addClass('hideBlock');
		$("#dialog-confirmation").find('.confirmation-yesbtn,.confirmation-nobtn').addClass('hideBlock').removeClass("hideBlock");

		$("#dialog-confirmation").find('#message').html(dangerGoodMsg);
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Dangerous Article Warning');
		$("#dialog-confirmation").find('#yesbtn').unbind('click');

		$("#dialog-confirmation").find('#yesbtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
			if(from == 'new'){
				confirmationFinalise(from);
			} else {
				populateFinaliseFields($('.editClaimDiv'),$("#dialog-promptFinalise"));
				$("#dialog-promptFinalise").dialog('open');
			}	
		});
		
		$("#dialog-confirmation").find('#nobtn').unbind('click');

		$("#dialog-confirmation").find('#nobtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");

		});
		$("#dialog-confirmation").dialog("open");
	} catch (err) {
		dangerousFlagConsignment(from);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');

}
function printClaimPopup(msg, area) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350,
			open: function( event, ui ) {
				objt.status ='Finalised';
				objt.finalized_by_name = $('#fullName').val();
				finalisedClaimsPrintOld(objt, itmList);
			}
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#yesbtn').unbind('click');

		$("#dialog-confirmation").find('#yesbtn').click(
				function() {
					$("#dialog-confirmation").parent().removeClass(
							"popupWrapper");
					$("#dialog-confirmation").dialog("close");
					dwnLoadClaimPrint();
					printCartenLabelsPopup(
							"Do you want to print Claim Label for Cartons?",
							area);
				});
		$("#dialog-confirmation").find('#nobtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
			$('#mainBackBtn').trigger('click');
			window.location.href = '';

		});
	} catch (err) {
		showInformation(msg);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

function showYesOrNoPopup(msg){
	try {
		
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").find('#yesbtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#nobtn').removeClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#yesbtn,#nobtn').unbind('click');

		$("#dialog-confirmation").find('#yesbtn').click(function() {
			yesBtnTrigger();
		});
		$("#dialog-confirmation").find('#nobtn').click(function() {
			noBtnTrigger();
		});
	} catch (err) {
		showYesOrNoPopup(msg);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}
function noBtnTrigger(){
	$("#dialog-confirmation").parent().removeClass("popupWrapper");
	$("#dialog-confirmation").dialog("close");
	if($('#saveNewDraft').is(':visible')){
		window.location
		.replace("../login/homepage.htm");
	}else{
		$('#checkboxActive').prop('checked', false);
		$('.lookup').removeClass('hideBlock');
		$('.claimDetail').addClass('hideBlock');
		$('.claimCreate').addClass('hideBlock');
		$('#lookupLink').removeClass('hideBlock');
		$('#detailLink').addClass('hideBlock');
		$('#createLink').addClass('hideBlock');
		$('.lookup').find('#searchBox').focus();
	}
	valueChange = false;
}
function yesBtnTrigger(){
	$("#dialog-confirmation").parent().removeClass("popupWrapper");
	$("#dialog-confirmation").dialog("close");
	if($('#saveNewDraft').is(':visible')){
		$('#saveNewDraft').trigger('click');
	}else{
		$('#editUpdate').trigger('click');
	}
}
function showYesOrNoPopupCancel(msg, srcElem) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").find('#yesbtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#nobtn').removeClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#yesbtn').unbind('click');

		$("#dialog-confirmation").find('#yesbtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");

			$('#editUpdate').trigger('click');
		});
		$("#dialog-confirmation").find('#nobtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
			$('#checkboxActive').prop('checked', false);
			srcElem.trigger('click');
			valueChange = false;
		});
	} catch (err) {
		showYesOrNoPopupCancel(msg, srcElem);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}
function getCartonLabelForServiceOrder(dtlObj) {
	// var statusMsg='';
	var cartonObj = {};
	
	$.ajax({
	    type: "POST",
	    url: "../repair/getCartonLabelForServiceOrder.htm",
	    data : {
			serviceOrderNo : dtlObj[0].order_no,
			vendorNo : dtlObj[0].supplier_no
		},
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(response) {
		  if (response != '') {
				output = $.parseJSON(response);
				console.log(response);
				var cartonDtlList = output.list;
				statusMsg = output.msg;
				if (statusMsg == 'Y') {
					cartonObj = cartonDtlList[0];
				}
				stopLoading();
			}								
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
	  }).always(function() {
		  if(cartonObj != undefined && cartonObj != null && cartonObj.zra_reference != undefined)
			  callCartonLblJasperPrint(cartonObj, dtlObj, 1);
		  else
			  $.fn.showCustomMsg([sapSerErrMsg],error); 
	  });
/*	
	$.ajax({
		type : "post",
		url : "../repair/getCartonLabelForServiceOrder.htm",
		data : {
			serviceOrderNo : dtlObj[0].order_no,
			vendorNo : dtlObj[0].supplier_no
		},
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if (response != '') {
				output = $.parseJSON(response);
				console.log(response);
				var cartonDtlList = output.list;
				statusMsg = output.msg;
				if (statusMsg == 'Y') {
					//printCartonLabel(cartonDtlList[0], dtlObj);
					cartonObj = cartonDtlList[0];
				}
				stopLoading();
			}
		}
	});*/

}

function callCartonLblJasperPrint(carObj, dtlObj, carCount)
{	
/*	var cartonCount = getEmptyIfNull($('.editClaimDiv .cartonCountViewOnly').html()) != '' ? 
				getEmptyIfNull($('.editClaimDiv .cartonCountViewOnly').html()) : 1;*/
	var cartonCount = Number(carCount);
	var item = {};
	var itemList = [];
	var dangerNote='';
	for(var i=1; i <= cartonCount; i++){
		item = {
				"claimNo" : getEmptyIfNull(carObj.zra_reference),
				"cartonCount" :  i,
				"totalCount"  :  cartonCount
		};
		
		itemList.push(item);
	}
	if(dangerousGoodFlag){
		var dangerNote=leaveDangerNotes;
		}
		else{
		var dangerNote="";
		}
	
	var obj={			
			reportResult		: itemList,
			claimNo				: carObj.zra_reference,
			supplier			: dtlObj[0].supplier_no/*.replace(/^0+/, '')*/,
			supplierName		: (carObj.zagent_name1).toUpperCase(),
			supplierStreet		: carObj.zagent_street.toUpperCase(),
			supplierCity		: carObj.zagent_city1.toUpperCase() + ' ' 	+ carObj.zagent_post_code1.toUpperCase(),
			supplierPhone		: carObj.zagent_tel_number.toUpperCase(),
			fromSite			: siteNo.replace(/^0+/, '')	+ ' ' + carObj.zstore_name1.toUpperCase(),
			fromSiteStreet		: carObj.zstore_street,
			fromSiteCity		: carObj.zstore_city1 + ' ' + carObj.zstore_post_code,
			fromSitePhone		: carObj.zstore_tel_number,
			imagePath			: imagePathMap[globalUserImgLoc],
			attention           : (carObj.zagent_name1).toUpperCase(),
			totRecCount			: cartonCount,
			dangerNotes         : dangerNote
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../claimsPrint/printCartonLblPDF.htm",
	type: "POST",
	dataType: "json",
	contentType:"application/json",
	data:JSON.stringify(obj),
    cache: false,    //This will force requested pages not to be cached by the browser  
    processData:false, //To avoid making query String instead of JSON
    beforeSend: function() {
        startLoading();
    },
	success: function(response, textStatus ){
	//console.log(response.data);
	//if(response.data == 'success')
		//{
		//}
	//console.log("success");
	stopLoading();
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	}
	});
}

/*function dwnLoadCartonPrint(moveBackFlag,carCount){
	$('#cartonCnt').val(carCount);
	$('#claimsPrintForm').attr("action", "../claimsPrint/downloadCartonLblPdf.pdf");
	$('#claimsPrintForm').attr('target','_blank');
	$('#claimsPrintForm').attr('method','get');
	$('#claimsPrintForm').submit();
	if(moveBackFlag){
		$('#mainBackBtn').trigger('click');		
	}
}*/

function dwnLoadCartonPrint(moveBackFlag,carCount){
	$('#cartonCnt').val(carCount);
	//$('#claimsPrintForm').attr("action", "../claimsPrint/downloadCartonLblPdf.pdf");
	//$('#claimsPrintForm').attr('target','_blank');
	//$('#claimsPrintForm').attr('method','get');
	//$('#claimsPrintForm').submit();
	if(moveBackFlag){
		//$('#mainBackBtn').trigger('click');	
			var url = "../claimsPrint/downloadCartonLblPdf.pdf?cartonCnt="+carCount;
	newwindow = window.open(url);
	startLoading();
	var unloadEvent = function (e) {
		stopLoading();
		window.location.href = "../order/claimsOnPageLoad.htm";
    };
    newwindow.addEventListener("load", unloadEvent);
	}else{
		$('#claimsPrintForm').attr("action", "../claimsPrint/downloadCartonLblPdf.pdf");
		$('#claimsPrintForm').attr('target','_blank');
		$('#claimsPrintForm').attr('method','get');
		$('#claimsPrintForm').submit();
	}
	
}

function printCartonLabel(obj, dtlObj) {
	storeName = obj.zstore_name1;
	storeStreet = obj.zstore_street;
	storeCity = obj.zstore_city1;
	storePostalCode = obj.zstore_post_code;
	storeContactNumber = obj.zstore_tel_number;
	repairAgentContactNumber = obj.zagent_tel_number;
	content = '';
	var cartonCount = 4;
	
	for ( var i = 1; i <= cartonCount; i++) {
		content += '<table class= "cartonLabelTable" style="{width : 75%; !important}">'
				+ '<tr  rowspan="11" >'
				+ '<td colspan="4" >'
				+ '<strong><label class="font13">'
				+ 'Send To:</label><br><div class="cartonLabelFix font16">'
				+ '         '
				+ dtlObj[0].supplier_no/*.replace(/^0+/, '')*/
				+ '<br>'
				+ (obj.zagent_name1).toUpperCase()
				+ '</strong><br>'
				+ obj.zagent_street.toUpperCase()
				+ '<br>'
				+ obj.zagent_city1.toUpperCase()
				+ ' '
				+ obj.zagent_post_code1.toUpperCase()
				+ '<br>'
				+ 'Phone: '
				+ obj.zagent_tel_number.toUpperCase()
				+ '</div><br><br>'
				+ '<strong><label class="font13">Attention:</label><br><div class="cartonLabelFix">'
				+ '        '
				+ obj.zagent_name1.toUpperCase()
				+ '</div></strong>'
				+ '</td>'
				+ '</tr>'
				+ '<tr>'
				+ '<th class="italicFont font13" colspan="3">Claim No </th>'
				+ '<th class="italicFont font13">No of Cartons</th>'
				+ '</tr>'
				+ '<tr><td class="fixedTD">'
				+ obj.zra_reference
				+ '</td><td class="fixedTD"></td><td class="fixedTD"></td><td class="fixedTD" rowspan="2" align="center"  style="vertical-align: middle;">'
				+ i
				+ " OF "
				+ cartonCount
				+ '</td></tr>'
				+ '<tr><td class="fixedTD">&nbsp;</td><td class="fixedTD"></td><td class="fixedTD"></td></tr>'
				+ '<tr  rowspan="11" >'
				+ '<td colspan="4" class="bottomFix">'
				+ '<strong><label class="font13">'
				+ 'From:</label></strong><br><br>'
				+ '<div class="leftDiv"><label class="bigFont">BIG<strong>W</strong></label></div><div class="cartonLabelFixFrom"><strong>'
				+ siteNo.replace(/^0+/, '')
				+ ' '
				+ obj.zstore_name1.toUpperCase()
				+ '</strong><br><label class="font11">'
				+ obj.zstore_street
				+ '<br>'
				+ obj.zstore_city1
				+ ' '
				+ obj.zstore_post_code
				+ '<br>'
				+ 'Phone: '
				+ obj.zstore_tel_number
				+ '</label></div><br>'
				+ '<label class="rightItalic font11">'
				+ obj.zorder_date
				+ '</label>'
				+ '<label class="font13 bnone">&nbsp;Printed on:'
				+ dateformat()
				+ '</label></td>'
				+ '</tr>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '</table>'
				+ '<table>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '<tr><td class="bnone">&nbsp;</td><td class="bnone"></td><td class="bnone"></td></tr>'
				+ '</table>';

	}
	$('#printbodyForCtnLbl')
			.html('')
			.append(content)
			.append(
					'<link rel="stylesheet" href="../../styles/printstyleRepairs.css" />');
	var a = window.open();
	$("#printDataForCtnLbl").show();
	a.document.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
	a.document.write(document.getElementById('printDataForCtnLbl').innerHTML);

	$("#printDataForCtnLbl").hide();
	a.focus();
	// call print
	$(a).ready(function() {
		// a.close();
		setTimeout(function() {
			$(document).unbind('click');
			doc = a;
			$(document).click(function() {
				doc.close();
				doc = '';
			});
			a.print();
		}, 1000);
		return true;
	});
	/*
	 * printReminderLetter(obj,dtlObj); printAcceptanceNote(dtlObj);
	 * printServiceOrder(dtlObj); appendContentToDetailsPage(dtlObj);
	 */
}
function printCartenLabelsPopup(msg, area) {
	try {
		//var carCount = Number(getEmptyIfNull($('#dialog-promptFinalise').find('input.carrCountcode').val()));
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350,
			//open: function( event, ui ) {getCartonLabelForServiceOrder(area, itmList, 1, true);}
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#yesbtn').unbind('click');

		$("#dialog-confirmation").find('#yesbtn').click(function() {
			var carCount = Number(getEmptyIfNull($('#dialog-cartonCount').find('#cartonCount').val()));
			if(carCount == 0){
				bindCartonCountPopupEvents(area, itmList, true);
				$('#dialog-cartonCount').find('.errorField').each(function() {
					$(this).removeAttr('title');
					$(this).removeClass(errorFieldClass);
				});
				$('#dialog-cartonCount').find('#cartonCount').val('');
				$('#dialog-cartonCount').find('#cartonCount').onlyNumbers();
				$('#dialog-cartonCount').dialog('open');
			} else {
				//getCartonLabelForServiceOrder(area, itmList, carCount, true);
				dwnLoadCartonPrint(true,carCount);				
					
				
			}
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
		});
		$("#dialog-confirmation").find('#nobtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
			$('#mainBackBtn').trigger('click');
			window.location.href = '';

		});
	} catch (err) {
		showInformation(msg);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

function showDraftStatus(msg,navigateFlag) {

	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
		$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('#ok').unbind('click');

		$("#dialog-confirmation").find('#ok').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
			if(navigateFlag==undefined)
			window.location.href = 'claimsOnPageLoad.htm';

		});
	} catch (err) {
		showDraftStatus(msg);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');

}
function getSearchJson(area) {
	var param = {
		"iv_created_by" : area.find('[name="userId"]').val().split("-")[0],
		"iv_from_date" : area.find('[name="fromDate"]').val(),
		"iv_order_no" : area.find('[name="claimNo"]').val(),
		"iv_page_no" : null,
		"iv_records" : 10,
		"iv_site" : $('#posSite').val(),
		"iv_source" : area.find('[name="source"]').val().split('-')[0].trim(),
		"iv_status" : area.find('[name="status"]').val(),
		"iv_supplier" : area.find('[name="supplier"]').val(),
		"iv_to_date" : area.find('[name="toDate"]').val(),
		"msg" : null,
		"pwd" : encSapPwd,
		"user_id" : $('#loginUserId').val()
	};
	if (area.find('[name="claimNo"]').val() != undefined
			&& area.find('[name="claimNo"]').val().trim() != ''
			&& area.find('[name="claimNo"]').val() != null) {
		param.iv_order_no = area.find('[name="claimNo"]').val().trim();
		param.iv_from_date = '';
		param.iv_to_date = '';
		param.iv_status = '';
	}		//Defect_9121
	if(area.find('[name="claimNo"]').val().trim() =='' && area.find('[name="status"]').val()==''){
		param.iv_status = 'DRAFT';
	}
	// un-comment fi claimno not empty and some status selected 
	
/*	if(area.find('[name="claimNo"]').val().trim() !='' && area.find('[name="status"]').val()!=''){
		param.iv_status = area.find('[name="status"]').val();
	}
*/	console.log(param);

	return param;
}

function getSearchJsonForDetail(obj) {
	var param = {
		"iv_created_by" : obj.submitted_by,
		"iv_from_date" : "",
		"iv_order_no" : obj.order_no,
		"iv_page_no" : null,
		"iv_records" : 10,
		"iv_site" : $('#posSite').val(),
		"iv_source" : obj.source,
		"iv_status" : obj.status,
		"iv_supplier" : obj.supplier_no,
		"iv_to_date" : "",
		"msg" : null,
		"pwd" : encSapPwd,
		"user_id" : $('#loginUserId').val()
	};

	return param;
}

function showError(msg) {
	$('#errorMsgDiv').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
}

function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
	$('#errorWrapperClaimlookup').addClass('hideBlock');
	$('#noDataWarningWrapper').addClass('hideBlock');
}

function getGrpHeader(key, value) {
	var content = '<tr><td colspan="8" class="groupBy1 rowSection rowHighlight" id="groupTitle-'
			+ key + '" >Supplied By: ' + key + '(' + value + ') </td></tr>';
	return content;
}

function bindEventForOnClick(obj, srcElem) {

	var param = getSearchJsonForDetail(obj);

/*	 var getClaimDetailURL =
	 "http://localhost:8080/StoreCentralServices/orders/getReturnOrderDtl";*/
	var getClaimDetailURL = rtvClaimsDetail;
	console.log(getClaimDetailURL + ' getClaimDetailURL---'
			+ JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : getClaimDetailURL,
				data : JSON.stringify(param),
				// contentType : "application/json",
				beforeSend : function() {
					startLoading();
				},
				success : function(responseStr) {
					startLoading();
					console.log(responseStr);

					// var response = $.parseJSON(responseStr);
					var response = (responseStr);

					response = response.d.results;

					if (response.length == 1 && response[0].msg != undefined
							&& response[0].msg.trim() != '') {
						if(response[0].msg.trim().indexOf('No')>-1 && obj.order_no != ""){
							showAllErrors('<li>' + 'Claim number not found, please enter valid Claim number' + '</li>');
							stopLoading();
						}else{
							showAllErrors('<li>' + response[0].msg + '</li>');
						}
					} else if (response.length >= 1) {
						// showError("You have to form data");
						showClaimDetailConent(obj, response, srcElem);
						objt = obj;
						itmList = response;
						
						//if((isAdminRole($('#roleId').val()) && obj.status == 'Draft') || obj.status != 'Draft'){
							updateMultipleUOMColumn(response, $('#editClaimTable'));
						//}
					} else {
						if (obj.order_no != "") {
							showNoDataWarning("<li>Claim number not found, please enter valid Claim number</li>");
						} else {
							showNoDataWarning("<li>Sorry! No Results found for your search criteria.</li>");
						}
						stopLoading();
					}
					// stopLoading();
				},
				error : function() {
					showAllErrors('<li>Sorry, Some technical issue occured.</li>');
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});

}

function showClaimDetailConent(obj, itemList, srcElem) {
	var otherFlag = false;
	var kgFlag = false;
	var totalUnitsUom = '';
	$('.quickHelpWrapper .close').trigger('click');
	hideError();
	toRemoveItems = [];
	itemsInClaim = itemList;
	$('#editClaimTable').html('');
	$('input.otherReasonEdit').addClass('hideBlock');
	if (obj.status == 'Draft' || obj.status == 'Cancelled') {
		$('.hdr_claimId').text("Draft Claim # " + obj.order_no);
		$('.finaliseElem').removeClass('hideBlock');
		$('#printBtn,#printBtnLocal').removeClass('hideBlock');
		$(".buttonMenu #cartonLabelPrint").parent('li').addClass("hideBlock");

	} else {
		$('.hdr_claimId').text("Claim # " + obj.order_no);
		$('.finaliseElem').addClass('hideBlock');
		$('#printBtn,#printBtnLocal').removeClass('hideBlock');
		$(".buttonMenu #cartonLabelPrint").parent('li').removeClass("hideBlock");
	}
	$('.orderStatus').html("Status : " + obj.status);
	$('.hdr_supplier').text(obj.supplier_no + "-" + obj.supplier_name);
	$('.hdr_store').text(obj.source);
	$('.hdr_createdby')
			.text(
					(obj.user_name != null && obj.user_name != undefined ? obj.user_name
							: (obj.source != 'STORE'? 'System' : '')));
	$('.hdr_createdDate').text(obj.creationdate);
	$('.hdr_articleCount').text(itemList.length);
	$('label.hdr_authCode')
			.text(
					(itemList[0].auth_code != null
							&& itemList[0].auth_code != undefined && itemList[0].auth_code != "undefined") ? itemList[0].auth_code
							: '');
	$('input.hdr_authCode')
			.val(
					(itemList[0].auth_code != null
							&& itemList[0].auth_code != undefined && itemList[0].auth_code != "undefined") ? itemList[0].auth_code
							: '');

	$('input.authcode').attr('placeholder','Enter Code')
			.val(
					(itemList[0].auth_code != null && itemList[0].auth_code != undefined) ? itemList[0].auth_code
							: '');

	$('label.hdr_reason').text(
			reasonMap[obj.reason] != undefined ? reasonMap[obj.reason] : ((getEmptyIfNull(obj.reason) == '') ? '': obj.reason));
	
	
	if(reasonMap[obj.reason] == undefined || reasonMap[obj.reason] == null || obj.reason == 'Other'){
		$('select.hdr_reason').val("Other");
		$('select.reason').val();
		$('input.otherReasonEdit').val(obj.reason);
	} else {
		$('select.hdr_reason').val(obj.reason);
		$('select.reason').val(obj.reason);
	}	

	$('label.hdr_deliveryregNo').text(obj.del_reg_no);
	$('input.hdr_deliveryregNo').val(obj.del_reg_no);
	$('label.hdr_authorisedDate')
			.text(
					(itemList[0].auth_date != null && itemList[0].auth_date != undefined) ? itemList[0].auth_date
							: ''); 
	$('input.hdr_authorisedDate')
			.val(
					(itemList[0].auth_date != null && itemList[0].auth_date != undefined) ? itemList[0].auth_date
							: '');

	$('input.authdate')
			.val(
					(itemList[0].auth_date != null
							&& itemList[0].auth_date != undefined && itemList[0].auth_date
							.trim() != "") ? itemList[0].auth_date : '');


		obj.carrier = (obj.iv_carrier||'');
		obj.consign = (obj.iv_consign_note||'');
		obj.vehicle = (obj.iv_vehicle_reg||'');
	 $('input.hdr_carrierNamecode').val((obj.carrier != null && obj.carrier != undefined) ? obj.carrier : '');
	 $('input.hdr_consigncode').val((obj.consign != null && obj.consign != undefined) ? obj.consign : '');
	 $('input.hdr_vehiclecode').val((obj.vehicle != null && obj.vehicle != undefined) ? obj.vehicle : '');
	 $('.vehicleViewOnly').text(obj.vehicle);
	 $('.consignViewOnly').text(obj.consign);
	 $('.carrierNameViewOnly').text(obj.carrier);
	 obj.iv_carton_count = Number(obj.iv_carton_count).toFixed(0);
	 $('.cartonCountViewOnly').text(obj.iv_carton_count);
	 $('input.hdr_carrCountcode').val((obj.iv_carton_count != null && obj.iv_carton_count !=  undefined) ? obj.iv_carton_count : '');
	 
	var articleList = '';
	var totalUnitsInheaderValue = 0;
	for ( var i in itemList) {
		itemList[i].order_no = (itemList[i].order_no != null && itemList[i].order_no != undefined) ? itemList[i].order_no
				.replace(/^0+/, '')
				: '';
		itemList[i].article = (itemList[i].article != null && itemList[i].article != undefined) ? itemList[i].article
				.replace(/^0+/, '')
				: '';
		itemList[i].supplier_no = (itemList[i].supplier_no != null && itemList[i].supplier_no != undefined) ? itemList[i].supplier_no/*
				.replace(/^0+/, '')*/
				: '';
		//added qty round off - Defect_8871 (issue 3)
		itemList[i].qty = (itemList[i].qty != null && itemList[i].qty != undefined) ? Number(itemList[i].qty).toFixed(0): "0";
				
				
		articleList += Number(obj.article) + ((i < itemList.length) ? "," : "");

		if ($('#editClaimTable').html() == '') {
			$('#editClaimTable').html(searchTableHdrForEdit);
		}
		var itemContent = getRowItemAsHtml(itemList[i], i);

		$('#editClaimTable').find('tbody').append(itemContent);

		var $elem = $('.orderQty[data-weighted-flag="Y"]');
		$elem.isWithinOnly3Decimal();
		$elem.unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
		var $elem = $('.orderQty[data-weighted-flag="N"]');
		$elem.onlyNumbers();$elem.attr('maxlength','3');
		

		var id = /* itemList[i].order_no + '-' + */Number(itemList[i].article)
				+ '-' + itemList[i].uom + '-' + Number(itemList[i].supplier_no);
		$('#editClaimTable').find('#' + id).data('obj', itemList[i]);
		$('#editClaimTable').find('#' + id).data('obj').action_flag = 'U';
		$('#editClaimTable').find('#' + id).find('.deleteRecord').unbind(
				'click');
		$('#editClaimTable').find('#' + id).find('.deleteRecord').click(
				function() {
					var elem = $(this).closest('tr');
					var obj = $(elem).data('obj');
					confirmation('Article '+obj.article+' is going to be removed from the list. Is this correct?', elem, obj,
							true);
				});

		/*
		 * $(".inputDate").datepicker({ firstDay : 1, dateFormat : "dd/mm/yy",
		 * zIndex : 50 });
		 */

		itemList[i].total_units = Number(itemList[i].qty) * 1;

		totalUnitsInheaderValue += Number(itemList[i].qty);
		
		if(itemList[i].uom == 'KG'){
			kgFlag = true;
		} else {
			otherFlag = true;
		}
	}
	if(kgFlag){
		totalUnitsUom = ' KG';
	} else if(otherFlag){
		totalUnitsUom = ' EA';
	}
	if(kgFlag && otherFlag){
		totalUnitsInheaderValue = '';
		totalUnitsUom = '';
	}
	totalUnitsInheaderValue = kgFlag ? Number(totalUnitsInheaderValue).toFixed(3) : totalUnitsInheaderValue;
	
	$('.totalUnitsInHeader').text(totalUnitsInheaderValue);
	$('.totalUnitsUomInHdr').text(totalUnitsUom);
	// var uomGroup = getUomGroup(articleList);

	$('.lookup').addClass('hideBlock');
	$('.claimDetail').removeClass('hideBlock');
	$('#lookupLink').addClass('hideBlock');
	$('#detailLink').removeClass('hideBlock');
	$('.onEditOnly').addClass('hideBlock');
	$('.onViewOnly').removeClass('hideBlock');
	$('.headerActionBtns').find('.actionBtn').removeClass('disabled');
	$(".buttonMenu").removeClass("hideBlock");

	$("#dummyPrint").addClass("hideBlock");
	$('#editCancel').unbind('click');
	$('#editCancel')
			.click(
					function() {
						console.log('cancel');
						if (valueChange || checkForQtyUpdate()) {
							showYesOrNoPopupCancel("Claim list is not saved. Do you want to save claims?", srcElem);
						} else {
							srcElem.trigger('click');
						}

					});

	$("#dialog-promptFinalise").find('.actionBtn').click(function() {
		confirmationFinalise('old', srcElem, obj);
	});
	$("#dialog-promptFinalise").find('.secondaryActionBtn').click(function() {
		var area = $("#dialog-promptFinalise");
		
		area.dialog('close');
	});

	$('#editUpdate').unbind('click');
	$('#editUpdate').click(function() {

		if (validateDraftUpdate($('.claimDetail'))) {
			updateClaim(srcElem, obj);
			valueChange = false;
		}
	});

	$('#deleteOrder').unbind('click');
	$('#deleteOrder').click(
			function() {
				confirmationDelete('Please confirm to delete Claim Number <b>'
						+ obj.order_no + '</b> raised for Supplier <b>'
						+ obj.supplier_name + '(' + obj.supplier_no + ')</b>'
						+ ' with <b>' + itemList.length
						+ '</b> number of Articles  ?', srcElem, obj);
			});

	

	$('.authCodeInput').change(function() {

		if (this.value != '') {
			if (!$("#dialog-promptFinalise").dialog("isOpen")) {
				if ($('input.hdr_authorisedDate').val().trim() == '') {
					$('input.hdr_authorisedDate').val(getDesiredFutureDate(0));
				}
			} else {
				if ($('input.authdate').val().trim() == '') {
					$('input.authdate').val(getDesiredFutureDate(0));
				}
			}
		}
	});

	var area = $('.claimDetail');
	createFlag = false;
	area.find('.carrierNameInput,.vehicleInput,.consignInput,.authCodeInput').onlyAlphaNumericCharacters();
	bindSearchAndAddEvents(area, obj);
	bindPrintEvent(area, obj, itemList);
	callSortingInEdit('editTable');
	securityMatrix();
	if (obj.status == 'Finalised') {
		$('.finaliseElem').addClass('hideBlock');
		$('#finalisedBy').text('Finalised By: ');
		$('#finalisedDate').text('Finalised Date: ');
		$('.onlyForFinalise,.hdr_submittedby,.hdr_submittedDate').removeClass(
				'hideBlock');
		$('.onlyForDraft').addClass('hideBlock');
		$('#submitted_user')
				.text(
						obj.finalized_by_name != null
								&& obj.finalized_by_name != undefined ? obj.finalized_by_name
								: (obj.source != 'STORE' ? 'System' : ''));
		$('#submitted_date').text(obj.finalized_date);
	} else if (obj.status == 'Draft') {
		$('.onlyForFinalise').addClass('hideBlock');
		$('.onlyForDraft,.hdr_submittedby,.hdr_submittedDate').removeClass(
				'hideBlock');
		// $('.submitBy').text('Created By: ');
		// $('.submitDate').text('Created Date: ');
		$('#submitted_user').text('');
		$('#submitted_date').text('');
	} else {
		$('.onlyForFinalise').addClass('hideBlock');
		$('.onlyForDraft').removeClass('hideBlock');
		$('#finalisedBy').text('Cancelled By: ');
		$('#finalisedDate').text('Cancelled Date: ');
		$('#submitted_user')
				.text(
						obj.cancelled_by_name != null
								&& obj.cancelled_by_name != undefined ? obj.cancelled_by_name
								: (obj.source != 'STORE' ? 'System' : ''));
		$('#submitted_date').text(obj.cancelled_date);
	}
	openInEditForm(obj);
	$('#editTable .table-sort-hdr th.articleInEdit').trigger('click');
	if(obj.status == 'Cancelled'){
		$('.claimDetail').find('.finaliseElem').addClass('hideBlock');
	}
	if(linkTrg){
		linkTrg = false;
		bindCheckForChanges();
	}
}

function populateFinaliseFields(srArea, toArea){
	toArea.find('.authcode').val('').val(getEmptyIfNull(srArea.find('.hdr_authCode').html()));
	var reason = getEmptyIfNull(srArea.find('.onlyForDraft .hdr_reason').html());
	var isOther = false;
	if (!(keyChkList.indexOf(reason) > -1)){
		isOther = true;
	}
	if(reasonMap[reason] == 'Other' || isOther ){
		toArea.find('.reason').val('').val('Other');
		toArea.find('.otherReasonEdit').removeClass('hideBlock').val('').val(srArea.find('.onlyForDraft .otherReasonEdit').val());
	}else if(getEmptyIfNull(reasonMap[reason]) == ''){
		toArea.find('.reason').val();
	} 
	else {
	toArea.find('.reason').val('').val(reason);
	}
	isOther = false;
	toArea.find('.authdate').val('').val(getEmptyIfNull(srArea.find('.onlyForDraft .hdr_authorisedDate').html()));
	toArea.find('.carrierNamecode').val('').val(getEmptyIfNull(srArea.find('.onlyForDraft .hdr_carrierNamecode').val()));
	toArea.find('.vehiclecode').val('').val(getEmptyIfNull(srArea.find('.onlyForDraft .hdr_vehiclecode').val()));
	toArea.find('.consigncode').val('').val(getEmptyIfNull(srArea.find('.onlyForDraft .hdr_consigncode').val()));
	toArea.find('.carrCountcode').val('').val(getEmptyIfNull(srArea.find('.onlyForDraft .hdr_carrCountcode').val()));
}
function getUpdatePram(obj, flag) {
	var items = [];
	var finQty = 0;
	var radioVal = '';

	for (i in toRemoveItems) {
		items.push(toRemoveItems[i]);
	}
	//Defect_12184
	var deleteCnt = 0;
	var totalCnt = 0;
	$('#editTable')
			.find('tbody')
			.find('tr')
			.each(
					function() {
						var itm = $(this).data('obj');
						totalCnt++;
						for(var i=0;i<getArticleUOMRes.length;i++){
							if(getArticleUOMRes[i].article_no == itm.article){
								itm.sub_category_no = getArticleUOMRes[i].sub_category_no;
							}
						}
						
						if (flag == 'delete')
							itm.action_flag = 'E';

						itm.qty = $(this).find('.orderQty').val();

						radioVal = $(this).find(
								'input[id=' + Number(itm.article)
										+ '-uomRadio]:checked').val();

						if (radioVal != undefined && radioVal != null) {
							finQty = (radioVal.split("-")[0] == 'order') ? ((radioVal
									.split("-")[1] != null && (radioVal
									.split("-")[1] != 'null')) ? (Number($(this)
									.find('.totalUnits').text()))
									: itm.qty)
									: itm.qty;
						} else {
							finQty = itm.qty;
						}
						//Defect_12184 18.01
						if(Number(finQty) == 0){
							itm.action_flag = 'E';
						}
						var item = {
							"action_flag" : ((itm.action_flag == undefined) ? 'I'
									: itm.action_flag),
							"article_no" : Number(itm.article),
							"article_uom" : (itm.uom != undefined
									&& itm.uom != null && itm.uom != '') ? itm.uom
									: "",// set default uom to avoid
							// errors--mock
							"item_no" : (itm.item_number != undefined && itm.item_number != null) ? itm.item_number
									: "",// set default item to avoid
							// errors--mock
							"international_vendor":itm.international_vendor, //Defect 11199 - Fix
							"qty" : finQty,
							"supplier" : itm.supplier_no,
							"cost_price" : (itm.cost_price||'0.00'),
							"sub_category_no":itm.sub_category_no
						};
						//Defect_12184
						if(itm.action_flag == 'E'){
							deleteCnt++;
						}
						items.push(item);
					});

	if (flag == 'delete')
		flag = 'draft';

	if (flag == 'draft') {
		var dtArea = $('.editClaimDiv .onlyForDraft');
		obj.draft = 'X';
		obj.return_flag = 'X';
		obj.iv_return = 'X';
		obj.auth_date = dtArea.find('input.hdr_authorisedDate').val();
		obj.auth_no = $('.editClaimDiv').find('input.hdr_authCode').val();
		obj.del_reg_no = dtArea.find('input.hdr_deliveryregNo').val();
		obj.reason = dtArea.find('select.hdr_reason').val();
		obj.carrier = dtArea.find('input.hdr_carrierNamecode').val();
		obj.consign = dtArea.find('input.hdr_consigncode').val();
		obj.vehicle = dtArea.find('input.hdr_vehiclecode').val();
		obj.iv_carton_count = dtArea.find('input.hdr_carrCountcode').val();
		if(dtArea.find('select.hdr_reason').val() == 'Other'){
			obj.reason = dtArea.find('input.otherReasonEdit').val();
		}
	} else {
		obj.draft = '';
		obj.return_flag = 'X';
		obj.iv_return = 'X';
		obj.auth_date = $("#dialog-promptFinalise").find('.authdate').val();
		obj.auth_no = $("#dialog-promptFinalise").find('.authcode').val();
		obj.del_reg_no = $("#dialog-promptFinalise").find('.delregno').val();
		obj.reason = $("#dialog-promptFinalise").find('.reason').val();
		obj.carrier = $("#dialog-promptFinalise").find('.carrierNamecode')
				.val();
		obj.consign = $("#dialog-promptFinalise").find('.consigncode').val();
		obj.vehicle = $("#dialog-promptFinalise").find('.vehiclecode').val();
		obj.iv_carton_count = $("#dialog-promptFinalise").find('.carrCountcode')
				.val();
		if($("#dialog-promptFinalise").find('.reason').val() == 'Other'){
			obj.reason = $("#dialog-promptFinalise").find('.otherReasonEdit').val();
		}
	}

	var param = {
		"article_list_info" : items,
		"auth_date" : obj.auth_date,
		"auth_no" : obj.auth_no,
		"carrier" : obj.carrier,
		"consign" : obj.consign,
		"del_reg_no" : obj.del_reg_no,
		"delivery_date" : formatDateToMDY(obj.creationdate),
		"draft" : obj.draft,
		"msg" : "",
		"po_no" : obj.order_no,
		"purch_org" : "",
		"pwd" : encSapPwd,
		"pwrm_no" : "",
		"reason" : obj.reason,
		"return_flag" : "X",
		"return_po" : "",// obj.order_no,
		"roaster_date" : formatDateToMDY(obj.creationdate),
		"site_no" : $('#posSite').val(),
		"typ" : "",
		"user_id" : $('#loginUserId').val(),
		"iv_carton_count" : obj.iv_carton_count,
		"iv_finalized_by" : "",
		"iv_return" : obj.iv_return,
		"vehicle" : obj.vehicle,
		//Defect_12184
		"reload" : (deleteCnt == totalCnt)
	};
	return param;
}
function updateClaim(srcElem, obj, finFlag, delflag) {
	var flag = false;
	var param;
	if (finFlag != undefined && finFlag == true) {
		param = getFinalisePram(obj, 'finalise');
		callServiceForFinaliseClaim('', '', param);
		flag = true;
	} else if (delflag != undefined && delflag == true) {
		param = getUpdatePram(obj, 'delete');
	} else {
		param = getUpdatePram(obj, 'draft');
	}
	if (!flag) {

		var updateClaimURL = rtvClaimsUpdate;// "http://cljbot1:8280/StoreCentralServices/orders/createOrFinaliseOrder";
		//var updateClaimURL = "http://localhost:8080/StoreCentralServices/orders/updateReturnOrder";
		
		console.log(updateClaimURL + JSON.stringify(param));
		$
				.ajax({
					type : "post",
					url : updateClaimURL,
					data : JSON.stringify(param),
					// contentType : "application/json",
					beforeSend : function() {
						startLoading();
					},
					success : function(responseStr) {

						console.log(responseStr);

						var response = responseStr;
						//var response = $.parseJSON(responseStr);

						if (response.result != undefined
								&& response.result != null) {
							response = response.result;

							if (response.length == 1
									&& response[0].msg != undefined
									&& response[0].msg.trim() != ''
									&& response[0].typ == 'E') {
								showInformation(response[0].msg);
								editFlag = false;
							} else if (response.length >= 1) {
								if (response[0].typ == 'S') {
									if (finFlag != undefined && finFlag) {
										$("#dialog-promptFinalise").dialog(
												'close');
										showInformation('Draft ('
												+ response[0].msg
												+ ') has been finalised.', true);
										editFlag = false;
									} else if (delflag != undefined
											&& delflag == true) {
										showInformation('Draft ('
												+ response[0].msg
												+ ') Deleted successfully.',
												true);
										editFlag = false;
									} else {
										valueChange = false;
										editFlag = false;
										//Defect_12184
										showInformation('Changes have been updated.',param.reload);
										$('#checkboxActive').prop('checked', false);
										srcElem.find('.reasonCd').text(param.reason);
										obj.iv_carrier = param.carrier;
										obj.iv_vehicle_reg = param.vehicle;
										obj.iv_carton_count =param.iv_carton_count;
										obj.iv_consign_note = param.consign;
										//Defect_12184
										if(!param.reload){
											srcElem.trigger('click');
										}
									}
								}
							} else {
								showInformation("Changes have been updated.");
								stopLoading();
							}
						} else {
							editFlag = false;
							showAllErrors("<li>Unable to delete the claim due to Connection Time Out.</li>");
							stopLoading();
						}
						stopLoading();
					},
					error : function() {
						editFlag = false;
						showInformation('Sorry, Some technical issue occured.');
						stopLoading();
						// stopLoading();// goToLogin();
					},
				});
	}
}

function bindSearchAndAddEvents(area, obj) {

	createAutoSuggest(area.find('#searchBox'));
	//area.find('input.orderQty').onlyNumbers();
	area.find('input.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal();
	area.find('input.orderQty[data-weighted-flag="Y"]').unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
	area.find('input.orderQty[data-weighted-flag="N"]').onlyNumbers();area.find('input.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
	if (obj != undefined) {
		area.find('#supplier').val(obj.supplier_no + "-" + obj.supplier_name);
	}

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

		var toAddArea = area.find('#editClaimTable');
		var srArea = area.find('#searchBoxArea');
		hideErrorMsg(srArea);
		searchAndAdd(srArea, toAddArea);
	});
}

function bindPrintEvent(area, obj, itemList) {
	/*
	 * area.find('#printBtn').unbind('click');
	 * area.find('#printBtn').click(function() { finalisedClaimsPrint(obj,
	 * itemList); });
	 */
	finalisedClaimsPrintOld(obj, itemList);
	
	area.find('.buttonMenu #claimNotePrint').unbind('click');
	area.find('.buttonMenu #claimNotePrint').click(function() {
		// jasperPrint();
		if (!$(".buttonMenu").hasClass('disabled')) {
			//finalisedClaimsPrintOld(obj, itemList);
			dwnLoadClaimPrint();
		}
	});
	//var carCount = Number(getEmptyIfNull($('.editClaimDiv').find('.onlyForFinalise').find('input.hdr_carrCountcode').val()));
	area.find('.buttonMenu #cartonLabelPrint').unbind('click');
	area.find('.buttonMenu #cartonLabelPrint').click(function() {
		if (!$(".buttonMenu").hasClass('disabled')) {
			var carCount = Number(getEmptyIfNull($("#dialog-cartonCount").find('#cartonCount').val()));
			//var carCount = Number(getEmptyIfNull($('.editClaimDiv').find('.onlyForFinalise').find('input.hdr_carrCountcode').val()));
			if(carCount == 0){
				bindCartonCountPopupEvents(area, itmList, false);
				$('#dialog-cartonCount').find('.errorField').each(function() {
					$(this).removeAttr('title');
					$(this).removeClass(errorFieldClass);
				});
				$('#dialog-cartonCount').find('#cartonCount').val('');
				$('#dialog-cartonCount').find('#cartonCount').onlyNumbers();
				$('#dialog-cartonCount').dialog('open');
			} else {
				//getCartonLabelForServiceOrder(area, itmList, carCount, false);
				dwnLoadCartonPrint(false,carCount);
			}	
			//getCartonLabelForServiceOrder(area, itmList);
		}
	});

}

function bindCartonCountPopupEvents(area, itmList, moveBackFlag){
	//var $elem = $("#dialog-cartonCount").find('#cartonCount');
	//var carCount = $elem.val();
	//getCartonLabelForServiceOrder(area, itmList, carCount, moveBackFlag);
	//var $elem = $("#dialog-cartonCount").find('#cartonCount');
	//var carCount = $elem.val();
	//$elem.unbind('change').bind('change',function(){
		//carCount = $elem.val();
		//if(getEmptyIfNull(carCount) != ''){
			//getCartonLabelForServiceOrder(area, itmList, carCount, moveBackFlag);
		//}
	//});
	$("#dialog-cartonCount").find('.actionBtn').unbind('click');
	$("#dialog-cartonCount").find('.actionBtn').click(function() {
		var $elem = $("#dialog-cartonCount").find('#cartonCount');
		var carCount = $elem.val();
		if(getEmptyIfNull(carCount) != ''){
			dwnLoadCartonPrint(moveBackFlag,carCount);			
			$('#dialog-cartonCount').find('#cartonCount').val('');
			$("#dialog-cartonCount").dialog("close");			
		} else {
			$("#dialog-cartonCount").find('#cartonCount').error('Carton Pick Up Qty is Mandatory');
		}	
	});
	$("#dialog-cartonCount").find('.secondaryActionBtn').unbind('click');
	$("#dialog-cartonCount").find('.secondaryActionBtn').click(function() {
		var area = $("#dialog-cartonCount");
		
		area.dialog('close');
	});
}

function searchAndAdd(srArea, toAddArea) {
	if (validateSearch(srArea, toAddArea)) {
		searchAricleForCreateOrders(srArea, toAddArea);
	}
}

function validateSearch(srArea, toAddArea) {
	if (srArea.find('#searchBox').val().trim() == '') {
		showErrorMsg('Please fill search text.', srArea);
		return false;
	}
	return true;
}

function searchAricleForCreateOrders(srArea, toAddArea) {
	draftAddArea=toAddArea;
	hideErrorContent();
	var searchTxt = srArea.find('#searchBox').val();
	var orderQty = srArea.find('#qty').val() != '' ? srArea.find('#qty').val()
			: '0';
	articleQuantity=orderQty;

	var articleNoFlag = "";
	var descFlag = "";
	var gtinFlag = "";
	var nodeLevel = "";
	var nodeId = "";
	var id = '';

	srcOfSupplyInd = "1";
	supplierNo = srArea.find('#supplier').val().split('-')[0];

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
 var prim_vendor = "Y"; 
	if(editFlag){
		prim_vendor = "E";
		
	}
	var param = {
		"iv_desc" : descFlag,
		"iv_article_no" : articleNoFlag,
		"iv_gtin" : gtinFlag,
		"iv_article" : (searchTxt).split('-')[0],
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_supplier" : supplierNo,
		"iv_src_supply" : "",
		"iv_ranged" : "Y",
		"iv_session_id" : "",
		"iv_barcode" : "",
		"iv_site" : siteVal,
		"iv_node_id" : nodeId,
		"iv_node_level" : nodeLevel,
		"iv_barcode_flag" : "",
		"iv_prime_vendor" : prim_vendor,
		"iv_uom_flag" : "N",
		"iv_auto_stockr_flag" : "",
		"iv_delisted_flag" : "N",
		"iv_deleted_flag" : "Y"
	};

	console.log(packBreakArticleSearchRTV + ' ' + JSON.stringify(param));
	$
			.ajax({
				type : "post",
				url : packBreakArticleSearchRTV,
				data : JSON.stringify(param),
				beforeSend : function() {
					startLoading();
					hideErrorContent();
				},
				success : function(response) {
					articleDetails=response
					if (response.length >= 1) {
						var articleNo = response[0].article;
						var errorId = response[0].ErrorID;
						/*
						 * if (response.length >= 1 && articleNo != undefined)
						 * response =
						 * removeArticlesWithSameArticleAndOrderUOM(response);
						 */
						if (response.length == 1 && articleNo != undefined) {
							articleDetails=response;
							/* var limit = getLimitQtyFromService(); */
							if (response[0].dien_flag == 'Y') {
								showInformation(
										"Cannot raise a claim against this article.",
										false);
							}else if (/*($('#salesOrg').val() == '1060') &&*/ (response[0].display_item_ind== 'Y' || response[0].prepack_item_ind == 'Y')) {		//Defect_8787
								$.fn.showCustomMsg([
										'Claim cannot be raised for Display/Prepack article'
												+ response[0].article + '"'],error,'Raise a Claim');
							}else if (response[0].department_no == '30' && response[0].rtv_sub_cat_flag != 'Y') {
								$.fn.showCustomMsg([
										'Claim not allowed for the article "'
												+ response[0].article + '"'],error,'Raise a Claim');
							} else if ((response[0].random_wgt_flg == 'Y') || (response[0].order_uom != null && response[0].order_uom != undefined && response[0].order_uom == 'YLD')) {
								$.fn.showCustomMsg([
													'Claim not allowed for the article "'
															+ response[0].article + '"'],error,'Raise a Claim');
							}/* Defect 8526
							else if (response[0].international_vendor == 'Y') {
								$.fn.showCustomMsg([
													'Cannot raise claim against this supplier "'
															+ response[0].supplier_name + '" , Please contact buyer to determine further action'],error,'Raise a Claim');
							}*/else if (response[0].sales_return_flag == 'Y') {
								triggerDraftAction(srArea, toAddArea,
										response[0]);
							} else if ($('#editTable .articleCountRow[supplierno = "'+response[0].supplier+'"]').length > (artlmt)) {
								showInformation(
										"Article Claim Limit has been reached. Please generate a new claim for supplier "+response[0].supplier,
										false);
							} else {
								if(response[0].dangerous_goods_flag== 'Y'){
									$.fn.warnPopup('warn',dangerGoodMsg,'Dangerous Article Warning',triggerAddArticleYes,triggerAddArticleNo,'',$(this));
								}else{
									confirmationOnNonReturnItem(response,
											toAddArea, orderQty);
								}
								
							}
							// console.log("articlelimit--"+getLimitQtyFromService());
							resetSearchFields(srArea);
						} else if (response.length > 1
								&& articleNo != undefined) {
							showArticleSelectPopup(srArea, toAddArea, response);
							resetSearchFields(srArea);
						} else if (response.length == 1 && errorId != undefined) {
							showErrorMsg(
									"Technical issue occured. Please contact technical support.",
									srArea);
							stopLoading();
						}
					} else {
						if(getEmptyIfNull(supplierNo) == ""){
							showErrorMsg('Unknown Article, please enter a valid Article Number', srArea);
						} else {
							showInformation(
									"Article does not belong to this supplier.",
									false);
						}	
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					showErrorMsg('Sorry, Some technical issue occured.', srArea);
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});
}

var triggerAddArticleYes = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
	confirmationOnNonReturnItem(articleDetails,
			draftAddArea, articleQuantity);
};

var triggerAddArticleNo = function(e)
{
	var $elem = e.data.msg;
$elem.dialog('close');
};

function getRowItemAsHtml(obj, i) {
	obj.uom = ((obj.uom == undefined || obj.uom == null) ? '' : obj.uom);
	var id = /* obj.order_no + '-' + */Number(obj.article) + '-' + obj.uom
			+ '-' + Number(obj.supplier_no);
	obj.obj_index = i;
	var content = '<tr data-index="'
			+ i
			+ '" international_vendor="'
			+ obj.international_vendor
			+ '" consign_flag="'
			+ obj.consign_flag
			+ '" id="'
			+ id
			+ '" class="'
			+ obj.supplier_no
			+ ' articleCountRow" supplierNo="'+obj.supplier_no+'"><td>'
			+ Number(obj.article)
			+ '</td><td>'
			+ obj.description
			+ '</td><td class="centerValue onViewOnly">'
			+ obj.uom
			+ '</td><td class="centerValue onEditOnly uomColumn"></td><td class="centerValue onEditOnly"><input type="#" class="editNumCell textbox textboxDefaultText orderQty" tabindex="58" data-weighted-flag="'+(((obj.weighted_flag||'') == 'Y' || (obj.uom||'') == 'KG')? 'Y' : 'N')+'" value="'
			+ ((obj.uom == 'KG') ? Number(obj.qty).toFixed(3) : Math.ceil(Number(obj.qty)))
			+ '"></td><td class="lastColumn centerValue onViewOnly">'
			+ ((obj.uom == 'KG') ? Number(obj.qty).toFixed(3) : Math.ceil(Number(obj.qty)))
			+ '</td><td class="centerValue omColumn  <!--onViewOnly-->">'
			+ obj.om
			+ '</td><td class="centerValue columnHide omColumnInput hideBlock <!--onEditOnly-->"><input type="#" class="editNumCell textbox textboxDefaultText changedOm" tabindex="58"  value="'
			+ (obj.new_om != undefined ? obj.new_om : obj.om)
			+ '"></td><td class="centerValue  totalUnits">'
			+ ((obj.uom == 'KG') ? Number(obj.qty).toFixed(3) : Math.ceil(Number(obj.qty)))
			//* 1
			+ '</td><td class="lastColumn centerValue onEditOnly"><label class="linkBtn"><a><label class="deleteRecord">&nbsp;</label></a></label></td></tr>';
	return content;
}

function confirmation(msg, id, obj, flag) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$("#dialog-confirmation").parent().addClass("popupWrapper");

		$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
		$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
		// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").find('#message').text(msg);
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").find('#ok').unbind('click');
		$("#dialog-confirmation")
				.find('#ok')
				.click(
						function() {
							$("#dialog-confirmation").dialog("close");

							if (flag) {
								var sup = id.attr('supplierNo');
								if ($('.' + sup).length == 1) {
									$('[supplier="' + sup + '"]').remove();
								}

								if (id.parent().find('tr').length <= 1) {
									id.parent().parent().parent().html('');
									if ($('.saveActionArea').is(':visible')) {
										$('.saveActionArea').addClass(
												'hideBlock');
									}
								} else {
									id.remove();
									if (obj != undefined
											&& obj.obj_index != undefined) {
										itemsInClaim.splice(obj.obj_index, 1);
										$(
												'#editTable .table-sort-hdr th.articleInEdit')
												.trigger('click');
									}
								}
								
								$('.artCount').text(
										"(" + $(".articleCountRow:visible").length + ")");
								
								if (obj != undefined && obj.order_no != '') {
									obj.action_flag = "E";
									obj.article_no = obj.article;
									obj.article_uom = obj.uom;
									obj.item_no = obj.item_number;
									toRemoveItems.push(obj);
								}
								resetFinalizeBtn();
								
								if($('.claimCreate').is(':visible')){
									var otherFlag = false;
									var kgFlag = false;
									var radioValue = '';
									var total = 0;
									$('.claimCreate #editClaimTable').find('tr td.totalUnits').each(function() {
										radioValue = $(this).closest('tr').data('obj').uom;
										if(radioValue == 'KG'){
											kgFlag = true;
										} else {
											otherFlag = true;
										}
										total += Number($(this).text());
									});
									
									$('.pageTotalUnits').text(total);
									if(otherFlag && kgFlag){
										$('.pageTotalUnits').text('');
										$('.pageTotalUom').text('');
									}
									
									if(kgFlag && !otherFlag){
										$('.pageTotalUom').text('KG');
									} else if(!kgFlag && otherFlag){
										$('.pageTotalUom').text('EA');
									}
								}	
							}
						});
		$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
		$("#dialog-confirmation").find('#cancel').unbind('click');
		$("#dialog-confirmation").find('#cancel').click(function() {
			$("#dialog-confirmation").dialog("close");
		});
	} catch (err) {
		confirmation(msg, id, obj, flag);
	}
}

function confirmationDelete(msg, id, obj) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$("#dialog-confirmation").parent().addClass("popupWrapper");

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

		$("#dialog-confirmation").find('#yesbtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#nobtn').removeClass('hideBlock');

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").find('#yesbtn').unbind('click');
		$("#dialog-confirmation").find('#yesbtn').click(function() {
			$("#dialog-confirmation").dialog("close");
			updateClaim(id, obj, false, true);

		});
		$("#dialog-confirmation").find('#nobtn').removeClass('hideBlock');
		$("#dialog-confirmation").find('#nobtn').unbind('click');
		$("#dialog-confirmation").find('#nobtn').click(function() {
			$("#dialog-confirmation").dialog("close");
		});
	} catch (err) {
		confirmationDelete(msg, id, obj);
	}
}

function showErrorMsg(msg, area) {
	area.find('#errorMsg').text(msg);
	area.find('#errorDiv').removeClass('hideBlock');
}
function hideErrorMsg(area) {
	area.find('#errorDiv').addClass('hideBlock');
}

function showArticleSelectPopup(srArea, toAddArea, response) {
	hideErrorContent();
	var qty = srArea.find('#qty').val();
	var popupArea = $('#dialog-mulipleArticles #articleSearchTbody');
	var count = 0;
	popupArea.html(popupHeader);
	for ( var i = 0; i < response.length; i++) {
		var articleNo = response[i].article == undefined ? response[i].article_no
				: response[i].article;
		if (response[i].article_uom == null)
			response[i].article_uom = "";
		if (popupArea.find('#popup-' + articleNo + '_'
				+ response[i].article_uom + '_' + Number(response[i].supplier)).length == 0) {
			count++;
			popupArea.append(getRecordOptiosHTML(response[i]));
			response[i].qty = qty;
			popupArea.find(
					'#popup-' + articleNo + '_' + response[i].article_uom + '_'
							+ Number(response[i].supplier)).data("obj",
					response[i]);
		}
	}
	$('#searchArticleCount').text(count);
	$('#dialog-mulipleArticles').parent().find('.ui-dialog-title').text(
			'Add Articles to List');
	$('#dialog-mulipleArticles').find('#addtolist').addClass('disabled');
	bindEventForAddToOrdersDraft($('#dialog-mulipleArticles'), toAddArea, qty);
	$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
	$("#dialog-mulipleArticles").dialog("open");
	bindCheckboxevent();
}

function getRecordOptiosHTML(obj) {
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var supplierNo = obj.supplier == undefined ? obj.supplier_no : obj.supplier;
	if (obj.base_uom == null)
		obj.base_uom = "";
	var tr = '<tr id="popup-'
			+ articleNo
			+ '_'
			+ obj.article_uom
			+ '_'
			+ Number(supplierNo)
			+ '" ><td id="articleNo">'
			+ articleNo
			+ '</td><td id="description">'
			+ obj.article_desc
			+ '</td><td class="centerValue" id="uom" >'
			+ obj.article_uom
			+ '</td>'
			+ '<td widtd="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckbox"></td></tr>';
	return tr;
}

function bindCheckboxevent() {
	var size = $('input[name="articlecheckbox"]:checked').length;
	if (size > 0) {
		$('#addtolist').text("Add To List(" + size + ")");
		$('#dialog-mulipleArticles').find('#addtolist').removeClass('disabled');
	} else {
		$('#addtolist').text("Add To List");
		$('#dialog-mulipleArticles').find('#addtolist').addClass('disabled');
	}
	$('input[name="articlecheckbox"]').change(
			function() {
				var size = $('input[name="articlecheckbox"]:checked').length;
				if (size > 0) {
					$('#addtolist').text("Add To List(" + size + ")");
					$('#dialog-mulipleArticles').find('#addtolist')
							.removeClass('disabled');
				} else {
					$('#addtolist').text("Add To List");
					$('#dialog-mulipleArticles').find('#addtolist').addClass(
							'disabled');
				}
				if ($('input[name="articlecheckbox"]').length == size) {
					$('input[name="articlecheckboxSelectAll"]').prop('checked',
							true);
				} else {
					$('input[name="articlecheckboxSelectAll"]').prop('checked',
							false);
				}
			});
	$('input[name="articlecheckboxSelectAll"]').change(function() {
		if ($(this).is(':checked')) {
			$('input[name="articlecheckbox"]').prop('checked', true);
			$('#addtolist').text("Add To List(" + $('input[name="articlecheckbox"]:checked').length + ")");
			$('#dialog-mulipleArticles').find('#addtolist')
					.removeClass('disabled');
		} else {
			$('input[name="articlecheckbox"]').prop('checked', false);
			$('#addtolist').text("Add To List");
			$('#dialog-mulipleArticles').find('#addtolist').addClass(
					'disabled');
		}
		
	});
}

function bindEventForAddToOrdersDraft(popupArea, toAddArea, orderQty) {
popupAreaToAddArticle=popupArea;
addAreaToAddArticle=toAddArea;
articleOrderQty=orderQty;
	var id = '';
	popupArea.find('#addtolist').unbind('click');
	popupArea
			.find('#addtolist')
			.click(
					function() {
						if ($(this).hasClass('disabled'))
							return false;
						var noOfDangerGoods=0;;
						var articleList = [];
						popupArea.find('tr:not(:first)').each(function() {
							if ($(this).find('input').is(':checked')) {
								var item = $(this).data("obj");
								if(item.dangerous_goods_flag=="Y"){
									noOfDangerGoods ++;
								}
								articleList.push(item);
							}
							listOfArticleToAdd=articleList;
						});

						/*if (articleList.length != 0) {
							if (($(".articleCountRow:visible").length + articleList.length) >= artlmt) {
								showInformation(
										"Article Claim Limit has been reached. Please generate a new claim.",
										false);
							} else {
								var nonReturnAbleItems = [];
								var returnableItems = [];

								for ( var i = 0; i < articleList.length; i++) {
									if (articleList[i].sales_return_flag == 'Y') {
										returnableItems.push(articleList[i]);
									} else {
										nonReturnAbleItems.push(articleList[i]);
									}
								}
							//}

						}*/
						if(noOfDangerGoods>=1){
							$.fn.warnPopup('warn',dangerGoodMsg,'Dangerous Article Warning',triggerAddMultipleArticleYes,triggerAddMultipleArticleNo,'',$(this));	
						}
						else{
							addMultipleArticles(popupArea, toAddArea, orderQty,articleList);
						}
						/*
						var nonReturnAbleItems = [];
						var returnableItems = [];
						var rtv_sub_cat_restrict = '';
						var random_wgt_restrict = '';
						var intl_vend_restrict = '';
						var yld_uom_restrict = '';
						var $table = $('#editTable');
						var tempMap = {};
						var errorMap = null;
						var errorCd = [];
						var tempCnt = 0;
						for ( var i = 0; i < articleList.length; i++) {
							if(articleList[i].department_no == '30' && articleList[i].rtv_sub_cat_flag != 'Y'){
								rtv_sub_cat_restrict+= ',"'+articleList[i].article+'"';
							} else if(articleList[i].random_wgt_flg != null && articleList[i].random_wgt_flg != undefined && articleList[i].random_wgt_flg == 'Y'){
								random_wgt_restrict+= ',"'+articleList[i].article+'"';
							} else if(articleList[i].order_uom != null && articleList[i].order_uom != undefined && articleList[i].order_uom == 'YLD'){
								yld_uom_restrict+= ',"'+articleList[i].article+'"';
							} else if(articleList[i].international_vendor != null && articleList[i].international_vendor != undefined && articleList[i].international_vendor == 'Y'){
								intl_vend_restrict+= ',"'+articleList[i].supplier_name+'"';
							}else if (articleList[i].sales_return_flag == 'Y') {
								returnableItems.push(articleList[i]);
							} else {
								nonReturnAbleItems.push(articleList[i]);
							}
						}
						
						if (returnableItems != null
								&& returnableItems.length > 0) {
							for ( var i = 0; i < returnableItems.length; i++) {
								if(tempMap[returnableItems[i].supplier] !=undefined){
									tempCnt = tempMap[returnableItems[i].supplier];
									tempCnt++;
									tempMap[returnableItems[i].supplier] = tempCnt;
								}else{
									tempCnt = 1;
									tempMap[returnableItems[i].supplier] = tempCnt;
								}
								if((tempCnt + $table.find('.articleCountRow[supplierno = "'+returnableItems[i].supplier+'"]').length) <=artlmt){
									addArticleToList(returnableItems[i], toAddArea,
											orderQty);
								}else{
									errorMap[returnableItems[i].supplier] = tempCnt;
								}
							}
						}
						if (nonReturnAbleItems != null
								&& nonReturnAbleItems.length > 0) {
							confirmationOnNonReturnItem(nonReturnAbleItems,
									toAddArea, orderQty);
						}
						
						if(random_wgt_restrict != ''){
							random_wgt_restrict = random_wgt_restrict.substr(1,random_wgt_restrict.length);
							errorCd.push('Claim not allowed for the article '
									+ random_wgt_restrict);
						}
						
						if(yld_uom_restrict != ''){
							yld_uom_restrict = yld_uom_restrict.substr(1,yld_uom_restrict.length);
							errorCd.push('Claim not allowed for the article '
									+ yld_uom_restrict);
						}
						
						if(intl_vend_restrict != ''){
							intl_vend_restrict = intl_vend_restrict.substr(1,intl_vend_restrict.length);
							errorCd.push('Cannot raise claim against this supplier '
									+ intl_vend_restrict + ' ,Please contact buyer to determine further action');
						}
						
						if(rtv_sub_cat_restrict != ''){
							rtv_sub_cat_restrict = rtv_sub_cat_restrict.substr(1,rtv_sub_cat_restrict.length);
							errorCd.push('Claim not allowed for the article '
									+ rtv_sub_cat_restrict);
						}
						
						
						if(errorMap!=null && Object.keys(errorMap).length >0){
							var tmp = '';
							for(m in errorMap){if(tmp == ''){tmp+=''+m; }else {tmp+=', '+m;}}
							errorCd.push('Article Claim Limit has been reached. Please generate a new claim for supplier '+tmp);
						}
						if(errorCd.length>0){
							$.fn.showCustomMsg(errorCd
										,error,'Raise a Claim');
						}
						*/
					});
}

var triggerAddMultipleArticleYes = function(e){
	var $elem = e.data.msg;
	$elem.dialog('close');
	addMultipleArticles(popupAreaToAddArticle,addAreaToAddArticle,articleOrderQty,listOfArticleToAdd);
};

var triggerAddMultipleArticleNo = function(e)
{
	var $elem = e.data.msg;
$elem.dialog('close');
};

function toOrderItemInfo(obj) {
	var json = {
		"supplier_name" : obj.supplier_name,
		"reason" : "",
		"qty" : obj.qty,
		"auth_date" : "",
		"source" : "",
		"order_no" : "",
		"creationdate" : "",
		"auth_code" : "",
		"msg" : "",
		"description" : obj.article_desc,
		"del_reg_no" : "",
		"supplier_no" : obj.supplier,
		"submitted_by" : "",
		"status" : "",
		"article" : obj.article,
		"article_count" : "",
		"article_uom" : obj.article_uom,
		"order_uom" : obj.order_uom,
		"uom" : obj.article_uom,
		"consign_flag" : obj.consign_flag,
		"international_vendor":obj.international_vendor,
		"cost_price" : (obj.cost_price||'0.00'),
		"sub_category_no":obj.sub_category_no,
		"om" : (obj.om != undefined && obj.om != null && obj.om != 0) ? obj.om
				: '1',
	};
	return json;
}

function resetSearchFields(srArea) {
	srArea.find('input:visible').each(function() {
		if (!$(this).hasClass('disabled'))
			$(this).val('');
	});
	if(linkTrg){
		linkTrg = false;
		bindCheckForChanges();
	}
}

function verifySupplier(area) {

	// hideErrorInOrderTab();
	// hideErrorInPreqTab();
	var vendorNo = area.find('#supplier').val().split("-")[0];

	var param = {
		"iv_vendor" : vendorNo,
		"iv_session_id" : ""
	};

	if ((area.find('#supplier').val() != '' && area.find('#supplier').val() != 'Enter supplier no. or name')) {
		$.ajax({
			type : "POST",
			url : vendorLookupRTVServiceURL,
			beforeSend : function() {
				startLoading();
			},
			data : JSON.stringify(param),
			success : function(response) {
				var data = response;
				$('#popupDataDivEnq').html(
						formVendorSearchResultsForEnquiry(data));
				if ($('#sizeCheck').val() == 0) {
					showAlert('Invalid Supplier.', 'supplier');
				} else if ($('#sizeCheck').val() > 1) {
					if (!$("#dialog-verifySupplier").dialog("isOpen")) {
						area.find('#vendorDesc').val($('#supplier').val());
						$("#dialog-verifySupplier").parent().addClass(
								"popupWrapper");
						$("#dialog-verifySupplier").removeClass('hideBlock')
								.dialog("open");
						$("#searchWarning").addClass('hideBlock');
						$("#popupSearch").removeClass('hideBlock');
						bindPopUpEventsForEnquiry(area);
					}
				} else {
					area.find("#supplier").val(
							$("#suppNoEnq0").text() + "-"
									+ $("#suppNameEnq0").text());
					area.find("#vendorVerify").val(true);
				}
				stopLoading();
			},
		});
	} else {
		showAlert('Please fill supplier field. ', 'supplier');
	}
}

function bindPopUpEventsForEnquiry(pr) {

	var elem = $("#supplier");
	var flagelem = $("#vendorVerify");
	if (pr != undefined) {
		elem = pr.find("#supplier");
		flagelem = pr.find("#vendorVerify");

	}
	$(".selectInEnquiry").click(
			function() {
				var id = $(this).attr("id");
				elem.val($("#suppNoEnq" + id + "").text() + "-"
						+ $("#suppNameEnq" + id + "").text());
				flagelem.val(true);
				if ($("#dialog-verifySupplier").dialog("isOpen"))
					$("#dialog-verifySupplier").dialog("close");
			});
}

function getSupplierHeadr(supplierno, supplierName) {
	var content = '<tr data-tt-id="1000" class="rowHighlight groupByExpand1 expanded" supplier="'
			+ supplierno
			+ '">&nbsp;'
			+ '<td class="groupedBy rowSection rowHighlight" colspan="8"><strong>Supplied By : '
			+ supplierno
			+ '-'
			+ supplierName
			+ '</strong></td></tr>'
			+ '<tr class="rowHighlight groupByExpand1 sub firstSub" suppname = "'+supplierName+'" supplier="'
			+ supplierno
			+ '"><td class="groupedBy rowSection rowHighlight" colspan="8"><label for="com4">Reason &nbsp</label>'
			+ reasonSelect
			+ '&nbsp;&nbsp;<input type="#" class="textbox mediumbox otherReasonTxt hideBlock" value="" id="com1" placeholder="Enter Reason" tabindex="69" maxlength="50">'
			+ '<label for="com4">&nbsp&nbsp Authorisation Code &nbsp</label><input type="#" class="textbox  smallbox authCodeInput authcode" value="" id="com1" placeholder="Enter Code" tabindex="70"><label for="com4">&nbsp&nbsp Authorisation Date &nbsp</label>'
			+ '<input type="#" class="textbox textboxDefaultText inputDate authDateInput  authdate" value="" placeholder="dd/mm/yyyy" id="headerDate-'
			+ supplierno
			+ '" tabindex="71">'
			+ '</td>'

			// +'<td class="groupedBy rowSection rowHighlight"
			// colspan="1"><label for="com4">Delivery RegNo &nbsp</label><input
			// type="#" class="textbox mediumbox delregno" value="" id="com1"
			// placeholder="Type reference number" tabindex="69"></td>'
			// + '<td class="groupedBy rowSection rowHighlight"
			// colspan="5"></td>'
			+ '</tr>'
			+ '<tr class="rowHighlight groupByExpand1" supplier="'
			+ supplierno
			+ '"><td class="groupedBy rowSection rowHighlight" colspan="8">'
			+ '<label for="com4">Carton Pick Up Qty &nbsp</label>'
			+ '<input type="#" class="textbox smallbox cartonCountInput carrCountcode" value="" id="com8" placeholder="Enter Carton Qty" tabindex="2" maxlength="5">'
			+ '<label for="com4"> Carrier Name &nbsp</label>'
			+ '<input type="#" class="textbox  mediumbox carrierNameInput carrierNamecode" value="" id="com6" placeholder="Enter Carrier Name" tabindex="70" maxlength="50"><label for="com4">&nbsp Vehicle Rego No &nbsp</label>'
			+ '<input type="#" class="textbox  smallbox vehicleInput vehiclecode" value="" id="com6" placeholder="Enter Registration Number" tabindex="70" maxlength="15">'
			+ '<label for="com7">&nbsp&nbspConsignment Note No&nbsp</label><input type="#" class="textbox  mediumbox consignInput consigncode" value="" id="com7" placeholder="Enter Consignment Note Number" tabindex="70" maxlength="50">'
			+ '</td>' + '</tr>';
	return content;
}

function callServiceForCreateDraft(area, finFlag) {

	var param = getCreatePram(area, 'draft');
	console.log("Creating Draft--" + "URL--" + rtvClaimsCreate
			+ JSON.stringify(param));
	var updateClaimURL = rtvClaimsCreate;// "http://cljbot1:8280/StoreCentralServices/orders/createOrFinaliseOrder";
	//var updateClaimURL = "http://localhost:8080/StoreCentralServices/orders/createOrFinaliseOrder";

	$.ajax({
		type : "post",
		url : updateClaimURL,
		data : JSON.stringify(param),
		// contentType : "application/json",
		beforeSend : function() {
			startLoading();
			hideError();
		},
		success : function(responseStr) {

			console.log(responseStr);
			
			//responseStr = $.parseJSON(responseStr);
			var response = responseStr.result;

			// response=response.data;
			if (response != undefined){
				if (response.length == 1 && response[0].msg != undefined
						&& response[0].msg.trim() != '' && response[0].typ == 'E') {
					showInformation(response[0].msg);
				} else if (response.length >= 1) {
					subimittedStatus(response, 'draft', area);

				} else {
					showInformation("Draft Creation successfully.");
					stopLoading();
				}	
			}
			else{
				showInformation('Sorry, Some technical issue occured.');
				stopLoading();
			}
			
			stopLoading();
		},
		error : function() {
			showInformation('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}

function subimittedStatus(list, flag, area, param) {
	var msg = 'Draft order ';
	var errorFlag = false;
	if (flag != 'draft') {
		msg = 'Finalise order ';
	}
	$('.errorField').removeClass('errorField').removeAttr('title');
	hideErrorContent();
	var groupresult = $groupBy(list, function(obj) {
		return obj.supplier;
	});

	var errorContent = '';
	errorContent += '<br>';
	area.find('tr.firstSub').each(
			function() {
				var innerFlag = false;
				var supplier = $(this).attr('supplier');
				var content = '';

				content += '<li>Supplier : ' + supplier + '<ol>';
				for(var i in groupresult[supplier]){
					if (groupresult[supplier][i].typ == 'E') {
					content += '<li class="errorDiv"><label>' + msg
							+ 'creation failed :'
							+ groupresult[supplier][i].msg + '</label></li>';
					errorFlag = true;
					innerFlag = true;
					} else if (groupresult[supplier][i].typ == 'S') {
						content += '<li><label class="positiveFlag">' + msg
								+ 'creation success : Reference Order No '
								+ groupresult[supplier][i].msg + '</label></li>';
						innerFlag = true;
						for(var art in groupresult[supplier][i].article_list_info){
							var obj=groupresult[supplier][i].article_list_info[art];
							var artID=obj.article_no+'-'+obj.article_uom+'-'+Number(obj.supplier);
							removeCreatedArticles($('#'+artID),obj);
						}
						/*area.find('tr.' + supplier).remove();
						area.find('tr[supplier="' + supplier + '"]').remove();
						if (area.find('tbody').find('tr').length <= 1) {
							area.html('');
							if ($('.saveActionArea').is(':visible')) {
								$('.saveActionArea').addClass('hideBlock');
							}
						}*/
						
					}
				}
				content += '</ol></li>';
				if (innerFlag) {
					errorContent += content;
					console.log(errorContent);
				}

			});

	if (errorContent != '') {

		var title = 'Draft Creation Status.';
		if (flag != 'draft') {
			title = 'Draft Finalise Status.';
			if(errorFlag){
				showStatusContent(title, errorContent);
			}	
		}

		showDraftStatus((flag == 'draft' ? "All Claims are now raised as Drafts " : "") + errorContent,(errorFlag==true?true:undefined));
	}
	if (flag != 'draft') {
		var supplierList = param.return_info_list;
		for ( var i = 0; i < supplierList.length; i++) {
			for ( var key in groupresult) {

				if ((key == supplierList[i].supplier)
						&& (groupresult[key][0].typ == 'S')) {
					var articleList = supplierList[i].article_list_info;
					for ( var j = 0; j < articleList.length; j++) {
						articleList[j].claimNo = groupresult[key][0].msg;
					}
				}
			}
		}
		console.log(param);
		callServiceToLogRTVHistory(param);
	}

}

function callServiceForFinaliseClaim(area, code, finaliseParam) {
	var param = '';
	if (finaliseParam != undefined && area == '' && code == '')
		param = finaliseParam;
	else
		param = getCreatePram(area, 'finalise');
	console.log('rtvClaimsCreate' + JSON.stringify(param));
	// var
	// updateClaimURL="http://cljbot1:8280/StoreCentralServices/orders/createOrFinaliseOrder";

	$
			.ajax({
				type : "post",
				url : rtvClaimsCreate,
				data : JSON.stringify(param),
				// contentType : "application/json",
				beforeSend : function() {
					startLoading();
					hideError();
				},
				success : function(responseStr) {

					console.log(responseStr);
					
					//responseStr = $.parseJSON(responseStr);
					var response = responseStr.result;

					if (response == undefined
							&& responseStr[0].ErrorID != undefined) {
						showInformation("Finalise claim failed");
					} else {
						if (response.length == 1
								&& response[0].msg != undefined
								&& response[0].msg.trim() != ''
								&& (response[0].msg == 'E' || response[0].typ == 'E')) {
							showInformation(response[0].msg);
						} else if (response.length >= 1) {
							if (finaliseParam != undefined && area == ''
									&& code == '') {

								$("#dialog-promptFinalise").dialog('close');
								showInformationFinalise('Draft ('
										+ response[0].msg
										+ ') has been finalised.', true,
										response[0].msg, area);
								var list = param.return_info_list[0].article_list_info;
								for ( var i = 0; i < list.length; i++) {
									param.return_info_list[0].article_list_info[i].claimNo = response[0].msg;
								}

								callServiceToLogRTVHistory(param);
							} else {
								subimittedStatus(response, 'finalise', area,
										param);
							}
						} else {
							showInformation("Finalise claim failed");
							stopLoading();
						}
					}
					stopLoading();
				},
				error : function() {
					showInformation('Sorry, Some technical issue occured.');
					stopLoading();
				},
			});

}

function getCreatePram(area, flag) {
	var paramList = [];
	var radioVal = '';
	var finQty = 0;
	//var uomVal = '';

	area
			.find('.sub')
			.each(
					function() {
						var obj = {}, items = [];

						var vendor = $(this).attr('supplier');
						area
								.find('.' + vendor)
								.each(
										function() {

											var itm = $(this).data('obj');
											itm.consign_flag = $(this).attr(
													'consign_flag');
											itm.international_vendor = $(this).attr(
													'international_vendor');
											itm.qty = $(this).find('.orderQty')
													.val();

											radioVal = $(this)
													.find(
															'input[id='
																	+ Number(itm.article)
																	+ '-uomRadio]:checked')
													.val();
											
/*											uomVal = $(this)
														.find(
																'input[id='
																		+ Number(itm.article)
																		+ '-uomRadio]:checked')
														.attr('uomval');*/

											if (radioVal != undefined
													&& radioVal != null) {
												finQty = (radioVal.split("-")[0] == 'order') ? ((radioVal
														.split("-")[1] != null && (radioVal
														.split("-")[1] != 'null')) ? (Number($(
														this).find(
														'.totalUnits').text()))
														: itm.qty)
														: itm.qty;
											} else {
												finQty = itm.qty;
											}

											var item = {
												"qty" : finQty,
												"article_no" : itm.article,
												"consign_flag" : itm.consign_flag,
												"international_vendor" : itm.international_vendor,
												"article_uom" : itm.article_uom,
												"cost_price" : (itm.cost_price||'0.00'),
												"sub_category_no":itm.sub_category_no
											};
											items.push(item);
										});

						if (flag == 'draft') {
							obj.draft = 'X';
							obj.return_flag = 'X';
							obj.vendor = $(this).attr('supplier');
							obj.auth_date = $(this).find('.authdate').val();
							obj.auth_no = $(this).find('.authcode').val();
							obj.del_reg_no = $(this).find('.delregno').val();
							obj.reason = $(this).find('.reason').val();
							obj.carrier = $(this).next().find('.carrierNamecode')
									.val();
							obj.carrier_count = $(this).next().find('.carrCountcode')
									.val();
							obj.veh_code = $(this).next().find('.vehiclecode').val();
							obj.consign = $(this).next().find('.consigncode').val();
						} else {
							obj.draft = '';
							obj.return_flag = 'X';
							obj.vendor = $(this).attr('supplier');
							obj.auth_date = $(this).find('.authdate').val();
							obj.auth_no = $(this).find('.authcode').val();
							obj.del_reg_no = $(this).find('.delregno').val();
							obj.reason = $(this).find('.reason').val();
							obj.carrier = $(this).next().find('.carrierNamecode')
									.val();
							obj.carrier_count = $(this).next().find('.carrCountcode')
									.val();
							obj.veh_code = $(this).next().find('.vehiclecode').val();
							obj.consign = $(this).next().find('.consigncode').val();
						}
						
						if($(this).find('.reason').val() == 'Other'){
							obj.reason = $(this).find('.otherReasonTxt').val();
						}

						var param = {
							"article_list_info" : items,
							"auth_date" : obj.auth_date,
							"po_type" : "ZNB",
							"auth_no" : obj.auth_no,
							"carrier" : obj.carrier,
							"consign" : obj.consign,
							"del_reg_no" : obj.del_reg_no,
							"delivery_date" : formatDateToMDY(getCurentDateTxt()),
							"draft" : obj.draft,
							"msg" : "",
							"po_no" : "",
							"purch_org" : "",
							"pwrm_no" : "",
							"reason" : obj.reason,
							"return_flag" : obj.return_flag,
							"return_po" : "",
							"roaster_date" : formatDateToMDY(getCurentDateTxt()),
							"vehicle" : obj.veh_code,
							"iv_carton_count" : obj.carrier_count,
							"iv_finalized_by" : "",
							"supplier" : obj.vendor
						};
						paramList.push(param);
					});

	var createParam = {
		"site_no" : $('#posSite').val(),
		"user_id" : $('#loginUserId').val(),
		"pwd" : encSapPwd,
		"return_info_list" : paramList
	};

	console.log(JSON.stringify(createParam));

	return createParam;
}

function showHelp(count) {
	if (firsttimeLoadFlag) {
		$('.quickHelpWrapper').removeClass('hideBlock');
		$('.quickHelpWrapper').removeClass('hideBlock');
		//$('#noOfDrafts').html(count);
		firsttimeLoadFlag = false;
	}
}
/*
 * function showArticleNumber() { if (firsttimeLoadFlag) { $('.quickHelpWrapper
 * claimArticleNumber').removeClass('hideBlock'); $('.quickHelpWrapper
 * claimArticleNumber').removeClass('hideBlock'); $('#noOfDrafts').html();
 * firsttimeLoadFlag = false; //} }
 */

function getUomGroup(articleList) {

}

function updateMultipleUOMColumn(itemList, area, flag) {
	var articleArray = [];
	var param = '';
	var radioBtn = '';
	var checkFlag = false;
	var rowId = '';

	for ( var i = 0; i < (itemList.length); i++) {
		var obj = {
			"iv_article" : Number(itemList[i].article),
			"iv_uom" : itemList[i].uom

		};
		articleArray.push(obj);
	}

	param = {
		"ItemArray" : articleArray
	};

	console.log(getClaimArticleUOMUrl + '' + JSON.stringify(param));

	$
			.post(getClaimArticleUOMUrl, JSON.stringify(param))
			.done(
					function(response) {
						console.log(response);
						getArticleUOMRes = response;
						for ( var i = 0; i < response.length; i++) {
							itemList[i].order_no = (itemList[i].order_no != null && itemList[i].order_no != undefined) ? itemList[i].order_no
									.replace(/^0+/, '')
									: itemList[i].order_no;
							itemList[i].article = (itemList[i].article != null && itemList[i].article != undefined) ? itemList[i].article
									.replace(/^0+/, '')
									: itemList[i].article;
							itemList[i].supplier_no = (itemList[i].supplier_no != null && itemList[i].supplier_no != undefined) ? itemList[i].supplier_no/*
									.replace(/^0+/, '')*/
									: itemList[i].supplier_no;
							rowId = /*
									 * itemList[i].order_no + '-' +
									 */Number(itemList[i].article) + '-'
									+ itemList[i].uom + '-'
									+ Number(itemList[i].supplier_no);
							itemsInClaim[i].om = response[i].om;
							itemsInClaim[i].article_uom = response[i].article_uom;
							itemsInClaim[i].order_uom = response[i].order_uom;
							itemsInClaim[i].consign_flag = response[i].consign_flag;
							itemsInClaim[i].international_vendor = response[i].international_vendor;
							itemsInClaim[i].new_om = response[i].om;
							itemsInClaim[i].cost_price= response[i].cost_price;

							if (response[i].article_uom != undefined
									&& response[i].article_uom != null) {
								radioBtn = $('<input type="radio" class="articleUom" id="'
										+ response[i].article_no
										+ response[i].article_uom
										+ '-uomRadio" name="uomRadioInEdit'
										+ rowId
										+ '" value="issue-'
										+ getValidNumber(response[i].om)
										+ '" uomVal="'+response[i].article_uom+'">'
										+ response[i].article_uom
										+ '</input>');
								radioBtn.appendTo(area.find('#' + rowId
										+ ' td.uomColumn'));
								area.find('#' + rowId + ' td.omColumn').text(
										getValidNumber(response[i].om));
								area
										.find(
												'#'
														+ rowId
														+ ' td.omColumnInput input.changedOm')
										.val(getValidNumber(response[i].om));
								if (response[i].article_uom == itemList[i].uom) {
									$(
											'input[name="uomRadioInEdit'
													+ rowId + '"][id="'
													+ response[i].article_no
													+ response[i].article_uom
													+ '-uomRadio"]').prop(
											'checked', true);
								}

								// checkFlag = false;
							}/*
								 * else { checkFlag = true; }
								 */

							if (response[i].order_uom != undefined
									&& response[i].order_uom != null && $.trim(response[i].order_uom) != $.trim(response[i].article_uom)) {
								if (response[i].order_uom.trim() != "") {
									radioBtn = $('<input type="radio" class="orderUom" id="'
											+ response[i].article_no
											+ '-uomRadio" name="uomRadioInEdit'
											+ rowId
											+ '" value="order-'
											+ getValidNumber(response[i].om)
											+ '" uomVal="'+response[i].order_uom+'">'
											+ response[i].order_uom
											+ '</input>');
									radioBtn.attr('checked', checkFlag);
									radioBtn.appendTo(area.find('#' + rowId
											+ ' td.uomColumn'));
								}
								if (response[i].order_uom == itemList[i].uom) {
									$(
											'input[name="uomRadioInEdit'
													+ rowId + '"][id="'
													+ response[i].article_no
													+ '-uomRadio"]').prop(
											'checked', true);
								}

								// checkFlag = false;
							}// else {
							// checkFlag = true;
							// }
							area.find('#' + rowId).attr("consign_flag",
									response[i].consign_flag);
							area.find('#' + rowId).attr("international_vendor",
									response[i].international_vendor);
							bindUomRadioContent(area, rowId, flag);
							if ($(
									'input[name="uomRadioInEdit' + rowId
											+ '"][id="'
											+ response[i].article_no
											+ '-uomRadio"]').is(':checked'))
								area.find('#' + rowId).find(
										'input[name="uomRadioInEdit' + rowId
												+ '"][id="'
												+ response[i].article_no
												+ '-uomRadio"]').trigger(
										'click');
							else if ($(
									'input[name="uomRadioInEdit' + rowId
											+ '"][id="'
											+ response[i].article_no
											+ response[i].article_uom
											+ '-uomRadio"]').is(':checked'))
								area.find('#' + rowId).find(
										'input[name="uomRadioInEdit' + rowId
												+ '"][id="'
												+ response[i].article_no
												+ response[i].article_uom
												+ '-uomRadio"]').trigger(
										'click');
							
							//if(response[i] != 0 || response[i] !=undefined){
								dangerousGoodFlag=false;
							if(response[i].dangerous_goods_flag == 'Y'){
								dangerousGoodFlag = true;
							}

						}

						bindDraftFinaliseBtn();

						//stopLoading();
					}).fail(function(){
						stopLoading();
					}).always(function(){
					});

}

function bindDraftFinaliseBtn(){
	$('#finaliseElem').unbind('click');
	$('#finaliseElem').click(function() {
		if ($(this).hasClass('disabled'))
			return false;
		
		if ($('#salesOrg').val() == '1060' && dangerousGoodFlag) {
			dangerousFlagConsignment('old');
		}else {
		populateFinaliseFields($('.editClaimDiv'),$("#dialog-promptFinalise"));
		$("#dialog-promptFinalise").dialog('open');
		}
	});
}

function getValidNumber(value) {
	return (value != 0 && value != null && value != undefined) ? value : 1;
}
function finalisedClaimsPrint(obj, articleList) {
	var param = {};
	// obj, articleList;
	$.ajax({
		type : "post",
		url : getPrinterList,
		data : JSON.stringify(param),
		beforeSend : function() {
			startLoading();
			hideError();
		},
		success : function(responseStr) {

			console.log(responseStr);
			var response = (responseStr);

			if (response != null && response != undefined
					&& response.length > 0) {
				if (response[0].ErrorMsg == undefined)
					showPrintSelectPopup(response, obj, articleList);
				else
					showInformation(response[0].ErrorMsg);
			} else {
				showInformation("No Printers connected to the system.");
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
			showInformation('Please select valid no of copy.');
			$('#dialog-printer-list #invoice').focus();
		} else {
			obj.no_of_copy = $('#dialog-printer-list #invoice').val();
			$('#dialog-printer-list').dialog('close');
			printInfo(obj);
		}
		var items = obj.data;
		obj.auth_date = items[0].auth_date;
		console.log('line no 2925 : ' + JSON.stringify(obj));
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
					hideError();
				},
				success : function(response) {

					// console.log(responseStr);
					// var response = (responseStr);//ganesh
					// var response = responseStr[0].lv_json;//ganesh

					if (response != null
							&& response != undefined
							&& response.length > 0
							&& (response[0].lv_json != undefined && response[0].lv_json == 'true')) {// Ganesh
						showInformation('Printed successfully.');
					} else if (response != null && response != undefined
							&& response.length > 0
							&& response[0].ErrorMsg != undefined) {
						showInformation(response[0].ErrorMsg);
					} else {
						showInformation("Printing Failed, Due to service issue.");
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

var doc = '';
// Repair acceptance note
function finalisedClaimsPrintOld(obj, articleList) {
	// $('.pageBreak :first').removeClass('pageBreak');
	var vendorObj = {};
	var storeObj = {};
	
	var supplierParam = {
		"iv_vendor" : ((obj.supplier_no != undefined) ? obj.supplier_no : ""),
		"iv_session_id" : ""
	};

	var storeParam = {
		"iv_site" : siteVal,
		"iv_session_id" : ""
	};
	console.log(vendorLookupRTVServiceURL + ' ' + JSON.stringify(supplierParam));
	$.ajax({
	    type: "POST",
	    url: vendorLookupRTVServiceURL,
	    data: JSON.stringify(supplierParam),
	    beforeSend: function(){
	    	startLoading();
	    }
	  }).done(function(responseV) {
		  	
				if (responseV != undefined && responseV != null) {
					vendorObj = responseV[0];
				}
				console.log(getSiteDescriptionUrl + ' '
						+ JSON.stringify(storeParam));
				
				$.ajax({
				    type: "POST",
				    url: getSiteDescriptionUrl,
				    data: JSON.stringify(storeParam),
				    beforeSend: function(){
				    	startLoading();
				    }
				  }).done(function(responseS) {
					if (responseS != undefined
							&& responseS != null) {
						storeObj = responseS[0];
						
						/*if(vendorObj != undefined && vendorObj != null && vendorObj.vendor_name != undefined
						  		&& storeObj != undefined && storeObj != null && storeObj.site_desc != undefined){*/
						  callClaimNoteJasperPrint(obj,
									vendorObj, storeObj,
									articleList);
						/*}else{
							
							 $.fn.showCustomMsg([mobiSerErrCode],error);
							stopLoading();
						}*/
					}								
				  }).fail(function() {
					  $.fn.showCustomMsg([mobiSerErrCode],error);
					  stopLoading();
				  }).always(function(){
					 // stopLoading();
					  getCartonLabelForServiceOrder(articleList);
				  });
				
	  }).fail(function() {
		  $.fn.showCustomMsg([mobiSerErrCode],error);
		  stopLoading();
		  getCartonLabelForServiceOrder(articleList);
	  }).always(function() {
		  //stopLoading();
	  });
/*	$
			.post(vendorLookupServiceURL, JSON.stringify(supplierParam))
			.done(
					function(response) {
						var vendorObj = '';
						if (response != undefined && response != null) {
							vendorObj = response;
						}
						console.log(getSiteDescriptionUrl + ' '
								+ JSON.stringify(storeParam));

						$
								.post(getSiteDescriptionUrl,
										JSON.stringify(storeParam))
								.done(
										function(response) {
											var storeObj = '';
											if (response != undefined
													&& response != null) {
												storeObj = response;
											}

											formPrintBodyContent(obj,
													vendorObj[0], storeObj[0],
													articleList, "finalise");
											// $('#printbodyForFinClaim').children(':first').removeClass('pageBreak');
											
											 * $('.siteNoNamePrint').text($('.siteNoName').text());
											 * $('.currentDate').text(dateformat());
											 * $('.currentTime').text(timeformat());
											 
											$('.endOfReport').removeClass(
													'hideBlock');
											var a = window.open();
											$("#printDataForFinClaim").show();
											a.document
													.write('<script src="../../scripts/jquery-1.9.1.js"></script>');
											a.document
													.write(document
															.getElementById('printDataForFinClaim').innerHTML);

											$("#printDataForFinClaim").hide();
											a.focus();
											// call print
											$(a)
													.ready(
															function() {
																// a.close();
																setTimeout(
																		function() {
																			$(
																					document)
																					.unbind(
																							'click');
																			doc = a;
																			$(
																					document)
																					.click(
																							function() {
																								doc
																										.close();
																								doc = '';
																							});
																			a
																					.print();
																		}, 1000);
																return true;
															});
											
											callClaimNoteJasperPrint(obj,
													vendorObj[0], storeObj[0],
													articleList);
										});
					});*/
}

function formPrintBodyContent(obj, vendorObj, storeObj, articleList, drftFnls) {
	var comma = ',';
	var emptySpace = ' ';
	var content = '';
	var printFootContent = '';
	var createdBy = '';
	var finalisedBy = '';
	var i = 0;
	var printFootEachPage = '<div style="height: 50px !important;margin-top:20px"   class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock "></div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

	var printFootSecondPage = '<div style="height: 100px !important;margin-top:20px"   class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock "></div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

	if (drftFnls == "finalise") {
		finalisedBy = obj.submitted_by != undefined ? obj.submitted_by : '';
	} else {
		createdBy = obj.submitted_by != undefined ? obj.submitted_by : '';
	}
	content += '<div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div><div>&nbsp;</div><div class="styleForClaimDiv" ><div style="padding-top: 9px;padding-left: 9px;" ><label class="">'
			+ ' Claim No.: '
			+ obj.order_no
			+ '</label><label class="separator">|</label><label class="">'
			+ 'Claim Date: '
			+ obj.creationdate
			+ '</label><label class="separator">|</label><label class="">'
			+ 'Claim Reason: '
			+ (reasonMap[obj.reason] != undefined ? reasonMap[obj.reason] : '')
			+ '</label>'
			+ '</label><label class="separator">|</label><label class="">'
			+ emptySpace
			+ 'Created By: '
			+ createdBy
			+ '</label>'
			+ '</label><label class="separator">|</label><label class="">'
			+ emptySpace
			+ 'Finalised By: '
			+ finalisedBy
			+ '</label></div></div><div>&nbsp;</div>';
	content += '<table style="font-size: 20px;"style="font-size: 20px;" ><tr><td><strong> To:</strong></td><td></td><td><strong>From:</strong></td></tr>'
			+ '<tr><td><strong>'
			+ getEmptyIfNull(vendorObj.vendor_name)
			+ '</strong><br>'
			+ getEmptyIfNull(vendorObj.door_no)
			+ (getEmptyIfNull(vendorObj.door_no) != '' ? comma : '')
			+ emptySpace
			+ getEmptyIfNull(vendorObj.street)
			+ '<br>'
			+ getEmptyIfNull(vendorObj.city)
			+ (getEmptyIfNull(vendorObj.city) != '' ? comma : '')
			+ emptySpace
			+ getEmptyIfNull(vendorObj.district)
			+ emptySpace
			+ getEmptyIfNull(vendorObj.postal_code)
			+ '<br>'
			+ getEmptyIfNull(vendorObj.email)
			+ '</td><td></td><td><strong>'
			+ getEmptyIfNull(storeObj.site_desc)
			+ '</strong><br>'
			+ getEmptyIfNull(storeObj.street_no)
			+ emptySpace
			+ getEmptyIfNull(storeObj.street_name)
			+ '<br>'
			+ getEmptyIfNull(storeObj.city)
			+ (getEmptyIfNull(storeObj.city) != '' ? comma : '')
			+ emptySpace
			+ getEmptyIfNull(storeObj.state)
			+ emptySpace
			+ getEmptyIfNull(storeObj.postal_code)
			+ '</td></tr><tr><td><strong> Vendor Number</strong><br>'
			+ getEmptyIfNull(vendorObj.telephone)
			+ '</td><td></td><td><strong> Contact Number</strong><br>'
			+ getEmptyIfNull(storeObj.telephone)
			+ '</td></tr><tr><td></td><td></td><td></td></tr></table><table class="printTable">';

	var printHeadInnerTable = '<table style="font-size: 20px;" class="printTable"><tr><th>Product#</th><th>Description</th><th>Qty</th><th>Other Comments</th></tr>';
	content += printHeadInnerTable;
	for ( var i = 0; i < articleList.length; i++) {
		content += '<tr><td style="width:10%">'
				+ Number(articleList[i].article)
				+ '</td><td style="width:40%">' + articleList[i].description
				+ '</td><td style="width:10%">' + articleList[i].qty
				+ '</td><td style="40%">&nbsp;</td></tr>';

		/*
		 * if(i<=25) {26 12 38
		 */
		if (i == 15) {
			i = i + 10;
		}
		if (i % 25 == 0 && i != (articleList.length - 1) && i != 0)
			if (i == 25) {
				content += '</table>' + printFootEachPage + printHeadInnerTable;
			} else {
				content += '</table>' + printFootSecondPage
						+ printHeadInnerTable;
			}
		if (i == (articleList.length - 1))
			content += '</table>';
		/*
		 * } else { if (i % 35 == 0 && i != (articleList.length - 1) && i != 0)
		 * content += '</table>' + printFootEachPage + printHeadInnerTable; if
		 * (i == (articleList.length - 1)) content += '</table>'; }
		 */

	}
	content += '</table>';

	var printHead = '<div class="width100"><div class="'
			+ globalUserImgLoc
			+ 'Logo" style="height:150px"><div class="posFixed"><label ><label style="font-size: 30px !important;"><strong>Woolworths Limited'
			+ '</strong></label><strong><label class=" boxed " style="vertical-align:center">Interim Adjustment Note</label></strong><br>1 Woolworths Way<br>Bella Vista, NSW 2153<br></label><label class="smallFont" style="white-space:pre-wrap">Woolworths Limited (NSW, QLD, VIC, WA, TAS)</label><label class="smallFont" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ABN 88 000 014 675</label><br>'
			+ '<label class="smallFont" style="white-space:pre-wrap">Woolworths (SA) PTY LTD (SA, NT)</label><label class="smallFont" >&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;ABN 34 007 873 118</label><br>Phone: (02) 8199 7306<br>Fax:    (03) 6245 6601<br>Email: tpc@woolworths.com.au</div> </div>	<div class="width70 margin5 margontopnone inline-block"> </div></div>';

	var printFoot = '<div  style="height: 30px !important;margin-top:10px;font-size: 15px;"   class="width98">'

			+ ' <div class="width35 margin5 left inline-block">'
			+ ' <label class="bold">Printed on: </label>'
			+ '<label class="currentDate"></label>'
			+ '<label class="separator">|</label>'
			+ '<label class="currentTime"></label>'
			+ '</div>'
			+ '<div class="inline-block margin5 hideBlock endOfReport"><strong>End of Page</strong></div>'
			+ '<div class="width35  inline-block right">'
			+ '<div class=" lineheight15 margin5 text-align-right ">Page'

			+ '<label class="currentPagePrint">1</label> of '

			+ '<label class="totalPage">1</label>'

			+ ' </div>' + '</div>' + '</div>';

	printFootContent += '<div class="styleForNoteDiv"><strong>Note to Supplier:</strong><ul style="padding-top: 0px;"><li>Please quote this number on all correspondence (Costed Tax Adjustment Note will follow)</li>'
			+ '<li>Vendors forward your Credit Note to "Transaction Processing Centre, Woolworths Ltd." Quoting <br>Debit/Credit Note No. and Store Name and No. </li><ul></div>';

	printFootContent += '<table class="printTabletr"><tr><td colspan="2"><strong> Collection Details:</strong><br>Driver\'s / Rep\'s Name:  <br>Carrier Name:<br>Vehicle Reg. No.:</td><td></td>'
			+ '<td><strong>Authority and Signature:</strong><br>Vendor Authority No:<br>Manager\'s Name:</td></tr>'
			+ '<tr><td colspan="2"></td><td></td><td></td></tr><tr><td colspan="2">Driver\'s / Rep\'s Signature: ______________</td><td></td><td>Manager\'s Signature: _____________________'
			+ '</td></tr><tr><td colspan="2"></td><td></td><td></td></tr><tr><td>Con-Note No.:</td><td>No. Of Cartons:</td><td></td><td>'
			+ '<label style="font-size:16px">Note: By Signing this Debit/Credit Note you are confirming that <br> *ALL* information is complete and correct</label></td></tr>'
			+ '<tr><td colspan="2"></td><td></td><td></td></tr></table>';

	$('#printbodyForFinClaim')
			.html('')
			.append(printHead + content + printFootContent + printFoot)
			.append(
					'<link rel="stylesheet" href="../../styles/printStyleForClaims.css" />');
	$('.pageBreak :first').removeClass('pageBreak');
	$('.siteNoNamePrint').text($('.siteNoName').text());
	$('.currentDate').text(dateformat());
	$('.currentTime').text(timeformat());
	var len = 0;
	$('.currentPagePrint').each(function() {
		len++;
		$(this).text(len);
	});
	var lastPageTrLen = 0;
	$('.totalPage').text($('.currentPagePrint').length);
	if (articleList.length <= 13) {
		lastPageTrLen = 15 - ($('.printTable:last tr').length - 1);
	} else {
		lastPageTrLen = 25 - ($('.printTable:last tr').length - 1);
	}
	console.log("lastPageTrLen" + lastPageTrLen);
	if (lastPageTrLen == -1) {
		// lastPageTrLen=17;
		$('.endOfReport:last').removeClass('hideBlock');
	}
	// $('.appendedMob').remove();
	if (lastPageTrLen != 0) {
		for ( var i = 0; i < lastPageTrLen; i++) {
			if (i != 0)
				$('.printTable')
						.last()
						.append(
								'<table cellspacing="0" class=" sortTable "><tbody><tr class="height30 appendedMob"><td colspan="11"></td></tr></tbody></table>');
			else {
				$('.printTable')
						.last()
						.append(
								'<table cellspacing="0" class=" sortTable "><tbody><tr style="border-bottom:solid 1px!important"></tr><tr class="appendedMob" style="font-size: 11px;"><td class="mobReportEnd mplReportEnd" colspan="11"></td></tr></tbody></table>');
			}
		}
	} else if (lastPageTrLen == 0) {
		// $('.staredMark:last').removeClass('hideBlock');
		$('.endOfReport:last').removeClass('hideBlock');
	}

}

function callClaimNoteJasperPrint(mainObj, vendorObj, storeObj, itemList)
{
	var area = $('.editClaimDiv');
	var comma = ',';
	var emptySpace = ' ';
	var underScore = '_';
	var consignNo = '';
	var authNo = '';
	
	if(getEmptyIfNull(mainObj.auth_no) == ''){
		authNo = getEmptyIfNull(area.find('.hdr_authCode.onViewOnly').html());
	} else {
		authNo = mainObj.auth_no;
	}
	
	if(getEmptyIfNull(mainObj.consign) == ''){
		consignNo = getEmptyIfNull(area.find('.consignViewOnly.onViewOnly').html());
	} else {
		consignNo = mainObj.consign;
	}
	vendorObj = vendorObj == undefined ? {} :vendorObj;
	storeObj = storeObj == undefined ? {} :storeObj;
	
		var toVendorName = getEmptyIfNull(vendorObj.vendor_no||'').replace(/^0+/, '')
		+ (getEmptyIfNull(vendorObj.vendor_no||'') != '' ? underScore : '')
		+ getEmptyIfNull(vendorObj.vendor_name||'');
		var toVendorStreetName = getEmptyIfNull(vendorObj.door_no||'')
			+ (getEmptyIfNull(vendorObj.door_no||'') != '' ? comma : '')
			+ emptySpace + getEmptyIfNull(vendorObj.street||'');
		var toVendorStrName2 = getEmptyIfNull(vendorObj.city||'')
			+ (getEmptyIfNull(vendorObj.city||'') != '' ? comma : '') + emptySpace
			+ getEmptyIfNull(vendorObj.district||'') + emptySpace
			+ getEmptyIfNull(vendorObj.postal_code||'') + getEmptyIfNull(vendorObj.email||'');
		var fromStoreName = getEmptyIfNull(storeObj.site_no||'')
			+ (getEmptyIfNull(storeObj.site_no||'') != '' ? underScore : '')
			+ getEmptyIfNull(storeObj.site_desc||'');
		var fromStreetName = getEmptyIfNull(storeObj.street_no||'') + emptySpace
			+ getEmptyIfNull(storeObj.street_name||'');
		var fromStreetName2 = getEmptyIfNull(storeObj.city||'')
			+ (getEmptyIfNull(storeObj.city||'') != '' ? comma : '')
			+ emptySpace
			+ getEmptyIfNull(storeObj.state||'')
			+ emptySpace
			+ getEmptyIfNull(storeObj.postal_code||'');
	var status=mainObj.status;
	var d = new Date();
	var strDate = d.getDate()+ "/" + (d.getMonth()+1) + "/" +d.getFullYear();
	var finalized_by_name=(mainObj.finalized_by_name!=null && mainObj.finalized_by_name!=undefined )? mainObj.finalized_by_name:"";
	var finalized_date="";
	if(mainObj.finalized_date!=null && mainObj.finalized_date!=undefined && mainObj.finalized_date!=""){
	    finalized_date= mainObj.finalized_date;
	}
	else{		
	     finalized_date=strDate;	
	 }
	if(mainObj.cancelled_date!=null && mainObj.cancelled_date!=undefined && mainObj.cancelled_date!=""){
		cancelled_date= mainObj.cancelled_date;
	}
	else{		
		cancelled_date=strDate;	
	 }
	var cancelled_by_name=(mainObj.cancelled_by_name!=null && mainObj.cancelled_by_name!=undefined )? mainObj.cancelled_by_name:"";
	//var stat = (mainObj.status == 'Draft' ? mainObj.user_name : (mainObj.status == 'Finalised' ? mainObj.finalized_by_name : mainObj.cancelled_by_name));
	var stat=(mainObj.user_name!=null && mainObj.user_name!=undefined )? mainObj.user_name:"";
	stat = (stat == '' && mainObj.source != 'STORE' ? 'System' : stat);
	var obj={			
			reportResult		: itemList,
			claimNo				: getEmptyIfNull(mainObj.order_no),
			claimDate			: getEmptyIfNull(mainObj.creationdate),
			claimReason			: getEmptyIfNull(mainObj.reason).split('(')[0],
			createdBy			: getEmptyIfNull(stat),
			finalisedBy         : finalized_by_name,
			finalisedDate       : finalized_date,
			cancelledBy         : cancelled_by_name,
			cancelledDate       : cancelled_date,
			toVendorName		: toVendorName,
			toVendorStreetName	: toVendorStreetName,
			toVendorStrName2	: toVendorStrName2,
			fromStoreName		: fromStoreName,
			fromStreetName		: fromStreetName,
			fromStreetName2		: fromStreetName2,
			vendorContactNum	: getEmptyIfNull(vendorObj.telephone||''),
			vendorFaxNum		: getEmptyIfNull(vendorObj.fax||''),
			contactNumber		: getEmptyIfNull(storeObj.telephone),
			carrierName			: getEmptyIfNull(mainObj.carrier),
			vehicleRego			: getEmptyIfNull(mainObj.vehicle),
			consignNo			: consignNo,
			authorityNo			: authNo,
			status              :status,
			cartonCount			: Number(getEmptyIfNull(mainObj.iv_carton_count)),
			imagePath			: imagePathMap[globalUserImgLoc]
			};
	//console.log(JSON.stringify(obj));
	$.ajax({
	url: "../claimsPrint/printClaimNotePDF.htm",
	type: "POST",
	dataType: "json",
	contentType:"application/json",
	data:JSON.stringify(obj),
    cache: false,    //This will force requested pages not to be cached by the browser  
    processData:false, //To avoid making query String instead of JSON
    beforeSend: function() {
        startLoading();
    },
	success: function(response, textStatus ){
	//console.log(response.data);
	if(response.data == 'success')
		{
		stopLoading();
		}
	//console.log("success");
	},
	error: function(xhr, textStatus, errorThrown){
	console.log('request failed'+errorThrown);
	}
	});
}
function dwnLoadClaimPrint(){
	$('#claimsPrintForm').attr("action", "../claimsPrint/downloadClaimNotePdf.pdf");
	$('#claimsPrintForm').attr('target','_blank');
	$('#claimsPrintForm').attr('method','get');
	$('#claimsPrintForm').submit();
}
function updateSingleUOMColumn(obj, area, flag) {
	rowId = /* '-' + */obj.article + '-' + obj.article_uom + '-'
			+ Number(obj.supplier);
	if (obj.article_uom != undefined && obj.article_uom != null) {
		radioBtn = $('<input type="radio" class="articleUom" id="'
				+ obj.article + '-uomRadio" name="uomRadioInCreate' + rowId
				+ '" value="issue-' + getValidNumber(obj.om)
				+ '" uomVal="'+obj.article_uom+'" checked="checked">' + obj.article_uom + '</input>');
		radioBtn.appendTo(area.find('#' + rowId + ' td.uomColumn'));
		// checkFlag = false;
	} /*
		 * else { checkFlag = true; }
		 */

	if (obj.order_uom != undefined && obj.order_uom != null && $.trim(obj.article_uom) != $.trim(obj.order_uom)) {
		if (obj.order_uom.trim() != "") {
			radioBtn = $('<input type="radio" class="orderUom" id="'
					+ obj.article + '-uomRadio" name="uomRadioInCreate' + rowId
					+ '" default-om="' + getValidNumber(obj.om)
					+ '" value="order-' + getValidNumber(obj.om) + '" uomVal="'+obj.order_uom+'">'
					+ obj.order_uom + '</input>');
			// radioBtn.attr('checked', checkFlag);
			radioBtn.appendTo(area.find('#' + rowId + ' td.uomColumn'));
			// checkFlag = false;
		}
	}
	if (flag != undefined) {
		var i = $('#editClaimTable table tbody tr:visible').length - 1;
		itemsInClaim[i].om = obj.om;
		itemsInClaim[i].article_uom = obj.article_uom;
		itemsInClaim[i].order_uom = obj.order_uom;
	}
	bindUomRadioContent(area, rowId, flag);
}
function validateDatesInLookup() {
	var fromDate = formateDate($('#dateFrom').val());
	var toDate = formateDate($('#dateTo').val());
	var today = new Date();
	var date1 = new Date(fromDate.split('/')[2], fromDate.split('/')[1] - 1,
			fromDate.split('/')[0]);

	var parts = fromDate.split('/');
	var partsLen = parts.length;
	var date1Len = fromDate.length;

	var dateComFrom = new Date(fromDate.split('/')[2], fromDate.split('/')[1],
			fromDate.split('/')[0]);
	var dateComTo = new Date(toDate.split('/')[2], toDate.split('/')[1], toDate
			.split('/')[0]);
	var toYear = dateComTo.getFullYear();
	var fromYear = dateComFrom.getFullYear();
	var toMonth = dateComTo.getMonth();
	var fromMonth = dateComFrom.getMonth();
	var toDay = dateComTo.getDate();
	var fromDay = dateComFrom.getDate();
	var rangeDate = new Date(toYear, toMonth - 1, toDay);

	var date2 = new Date();
	var part = toDate.split('/');
	var partLen = part.length;
	var date2Len = toDate.length;
	date2.setFullYear(part[2], part[1] - 1, part[0]);

	var splittedDate = formateDate($('#dateTo').val(),
			$('#dateTo').val().split('/').length).split('/');
	var splittedTwo = splittedDate[0] + splittedDate[1] + splittedDate[2];
	var errors = '';
	if (fromDate == "") {
		errors += getError('Please enter From Date.');
		// callFrom();
	}
	if (partsLen != 3 || date1Len != 10 || fromDate.split('/')[0] > 31
			|| fromDate.split('/')[1] > 12
			|| fromDate.split('/')[2].length != 4) {
		errors += getError('Invalid From Date.');
		// callFrom();
	}
	if (date1 > today) {
		errors += getError("Future Dates are not allowed for Date Range.");
		// callFrom();
	}
	if (partLen != 3 || date2Len != 10 || toDate.split('/')[0] > 31
			|| toDate.split('/')[1] > 12 || toDate.split('/')[2].length != 4) {
		errors += getError('Invalid To Date.');
		// callTo();
	}
	if (date1.getTime() > date2.getTime()) {
		errors += getError('To Date should not be lesser than the From Date');
	}
	if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999)
			|| isNaN(splittedTwo)) {

		errors += getError("Invalid Date Format");
	}
	return errors;
}

function triggerDraftAction(srArea, toAddArea, response) {
	var inEditPage;
	if ($(toAddArea).html() == $('#editClaimTable').html()
			&& $("#editAction").hasClass('disabled')
			&& $("#editAction").is(':visible'))
		inEditPage = true;
	var qty = srArea.find('#qty').val();
	response.qty = qty;
	var item = response;
	// var articleList = [];
	if (item != null && item != undefined) {

		if (toAddArea.html() == '') {
			toAddArea.html(searchTableHdr);
			$('.saveActionArea').removeClass('hideBlock');
		}
		itemid = toOrderItemInfo(item);
		id = /*
				 * itemid.order_no + '-' +
				 */itemid.article
				+ '-'
				+ (itemid.article_uom != null
						&& itemid.article_uom != undefined ? itemid.article_uom
						: '') + '-' + Number(itemid.supplier_no);
		if (toAddArea.find('#' + id).length <= 0) {
			if ($('.claimCreate').is(':visible')) {
				if (toAddArea.find('tbody').find(
						'tr[supplier="' + item.supplier + '"]').length >= 1) {
					if (item != null && item != undefined
							&& item.article_uom != undefined
							&& item.article_uom.trim() != null
							&& item.article_uom.trim() != '') {
						item.uom = item.article_uom.trim();
					} else {
						item.uom = '';
					}
					var itemContent = getRowItemAsHtml(toOrderItemInfo(item));
					toAddArea.find('tbody').find(
							'tr[supplier="' + item.supplier + '"]:last').after(
							itemContent);
					//$('.orderQty').onlyNumbers();
					toAddArea.find('.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal()
					toAddArea.unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
					toAddArea.find('.orderQty[data-weighted-flag="N"]').onlyNumbers();toAddArea.find('.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
					toAddArea.find('.onViewOnly').addClass('hideBlock');
				} else {
					var header = getSupplierHeadr(
							item.supplier,
							((item.supplier_name != undefined) ? item.supplier_name
									: ""));
					if (item != null && item != undefined
							&& item.article_uom != undefined
							&& item.article_uom.trim() != null
							&& item.article_uom.trim() != '') {
						item.uom = item.article_uom.trim();
					} else {
						item.uom = '';
					}
					var itemContent = header
							+ getRowItemAsHtml(toOrderItemInfo(item));
					toAddArea.find('tbody').append(itemContent);
					//$('.orderQty').onlyNumbers();
					toAddArea.find('.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal()
					toAddArea.unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
					toAddArea.find('.orderQty[data-weighted-flag="N"]').onlyNumbers();toAddArea.find('.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
					toAddArea
							.find('.supplyDrop')
							.change(
									function() {

										if (this.value == '95') {
											showAlertInClaimsLookup('Claims are raised manually by support office and hence system may not reflect the Claim # immediately');
										} else if (this.value == '91'
												|| this.value == '99') {
											showAlertInClaimsLookup('Supplier claims will not be raised and only Stock will be adjusted');
										}

									});

					toAddArea
							.find('.authCodeInput')
							.change(
									function() {

										if (this.value != '') {
											if (!$("#dialog-promptFinalise")
													.dialog("isOpen")) {
												if ($(
														'input.hdr_authorisedDate')
														.val().trim() == ''
														&& $(
																'input.hdr_authorisedDate')
																.is(':visible')) {
													$(
															'input.hdr_authorisedDate')
															.val(
																	getDesiredFutureDate(0));
												} else if (toAddArea.find(
														'.authDateInput').is(
														':visible')) {
													toAddArea
															.find(
																	'.authDateInput')
															.val(
																	getDesiredFutureDate(0));
												}
											} else {
												if ($('input.authdate').val()
														.trim() == '') {
													$('input.authdate')
															.val(
																	getDesiredFutureDate(0));
												}
											}
										}
									});
					toAddArea.find('.onViewOnly').addClass('hideBlock');
				}

			} else {
				if (item != null && item != undefined
						&& item.article_uom != undefined
						&& item.article_uom.trim() != null
						&& item.article_uom.trim() != '') {
					item.uom = item.article_uom.trim();
				} else {
					item.uom = '';
				}
				var i;
				if (inEditPage != undefined) {
					i = $('#editClaimTable table tbody tr').length;
					itemsInClaim.push(toOrderItemInfo(item));
					itemsInClaim[i].qty = qty;
					itemsInClaim[i].total_units = qty;
					// itemsInClaim[i].obj_index = i;
				}
				var itemContent = getRowItemAsHtml(toOrderItemInfo(item), i);

				toAddArea.find('tbody').append(itemContent);
				//$('.orderQty').onlyNumbers();
				toAddArea.find('.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal()
				toAddArea.find('.orderQty[data-weighted-flag="Y"]').unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
				toAddArea.find('.orderQty[data-weighted-flag="N"]').onlyNumbers();toAddArea.find('.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
				toAddArea.find('.onViewOnly').addClass('hideBlock');
			}
			updateSingleUOMColumn(item, toAddArea, inEditPage);
			item = toOrderItemInfo(item);
			var id = /*
						 * item.order_no + '-' +
						 */item.article
					+ '-'
					+ (itemid.article_uom != null
							&& itemid.article_uom != undefined ? itemid.article_uom
							: '') + '-' + Number(item.supplier_no);
			toAddArea.find('#' + id).data('obj', item);
			toAddArea.find('#' + id).find('.deleteRecord').unbind('click');
			toAddArea.find('#' + id).find('.deleteRecord').click(
					function() {

						var elem = $(this).closest('tr');
						var obj = $(elem).data('obj');
						confirmation('Article '+obj.article+' is going to be removed from the list. Is this correct?', elem,
								obj, true);

						/*
						 * var elem = toAddArea .find('#' + id); confirmation(
						 * "Please confirm to remove item?", elem, item, true);
						 */
					});
			/*
			 * $(".inputDate") .datepicker( { firstDay : 1, dateFormat :
			 * "dd/mm/yy", zIndex : 50 });
			 */
		} else {/*
				 * if (qty != '') { toAddArea .find( '#' + id) .find(
				 * '.orderQty') .val( qty); }
				 */
			//Defect_12851 - Fix
			showWarning(
					'Article '+toAddArea.find('#' + id).data('obj').article+' already exists with Qty '+toAddArea.find('#' + id).find('.orderQty').val()+'. Do you want to update?',
					toAddArea, id, qty);
		}
	}
	toAddArea.find('.onViewOnly').addClass('hideBlock');
	if ($("#checkboxActive").is(':visible')) {
		if ($("#checkboxActive").is(':checked'))
			$(".columnHide").removeClass('hideBlock');
		else {
			$(".columnHide").addClass('hideBlock');
		}
	}
	if ($("#checkboxActive_edit").is(':visible')) {
		if ($("#checkboxActive_edit").is(':checked'))
			$(".columnHide").removeClass('hideBlock');
		else {
			$(".columnHide").addClass('hideBlock');
		}
	}

	toAddArea.find(".inputDate").datepicker({
		firstDay : 1,
		dateFormat : "dd/mm/yy",
		zIndex : 50

	});
	resetFinalizeBtn();
}

function createDraftParam(list) {
	var tempParam = {};
	var supplier = $draftParent.find('.search-and-add').attr('data_key');
	var qty = $draftParent.find('#qty').val().trim();
	for ( var i = 0; i < list.length; i++) {
		tempParam = new IBTItemParam();
		tempParam.iv_article = list[i].article;
		tempParam.iv_article_uom = list[i].article_uom;
		tempParam.iv_user = loggedInUserId;
		tempParam.iv_action = 'D';
		tempParam.iv_qty = qty;
		tempParam.iv_supplier = supplier;
		tempParam.iv_draft_type = draft_type;
		tempParam.iv_new_uom = list[i].article_uom;
		tempParam.order_type = 'RPO';
		tempParam.iv_platform = 'B';
		tempList.push(tempParam);
	}
	if (validateArticle(tempList)) {
		param = new IBTParam(tempList, supplier);
		param.tempArticleList = list;
		createIBTDraftArticleList(param, 'SUBMIT', '');
	}
}
function addArticleToList(item, toAddArea, orderQty) {
	hideErrorContent();
	var inEditPage;
	if ($(toAddArea).html() == $('#editClaimTable').html()
			&& $("#editAction").hasClass('disabled')
			&& $("#editAction").is(':visible'))
		inEditPage = true;

	if (item != null && item != undefined) {
		if (toAddArea.html() == '') {

			toAddArea.html(searchTableHdr);
			$('.saveActionArea').removeClass('hideBlock');
		}
		
		if(item.dangerous_goods_flag == 'Y'){
			dangerousGoodFlag = true;
		}

		item.qty = orderQty;
		itemid = toOrderItemInfo(item);
		id = /*
				 * itemid.order_no + '-' +
				 */itemid.article + '-' + itemid.article_uom + '-'
				+ Number(itemid.supplier_no);
		if (toAddArea.find('#' + id).length <= 0) {
			if ($('.claimCreate').is(':visible')) {
				if (toAddArea.find('tbody').find(
						'tr[supplier="' + item.supplier + '"]').length >= 1) {
					if (item != null && item != undefined
							&& item.article_uom != undefined
							&& item.article_uom.trim() != null
							&& item.article_uom.trim() != '') {
						item.uom = item.article_uom.trim();
					} else {
						item.uom = '';
					}
					var itemContent = getRowItemAsHtml(toOrderItemInfo(item));
					toAddArea.find('tbody').find(
							'tr[supplier="' + item.supplier + '"]:last').after(
							itemContent);
					//$('.orderQty').onlyNumbers();
					toAddArea.find('.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal()
					toAddArea.find('.orderQty[data-weighted-flag="Y"]').unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
					toAddArea.find('.orderQty[data-weighted-flag="N"]').onlyNumbers();toAddArea.find('.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
					toAddArea.find('.onViewOnly').addClass('hideBlock');
				} else {
					var header = getSupplierHeadr(
							item.supplier,
							((item.supplier_name != undefined) ? item.supplier_name
									: ""));

					if (item != null && item != undefined
							&& item.article_uom != undefined
							&& item.article_uom.trim() != null
							&& item.article_uom.trim() != '') {
						item.uom = item.article_uom.trim();
					} else {
						item.uom = '';
					}
					var itemContent = header
							+ getRowItemAsHtml(toOrderItemInfo(item));
					toAddArea.find('tbody').append(itemContent);
					//$('.orderQty').onlyNumbers();
					toAddArea.find('.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal()
					toAddArea.find('.orderQty[data-weighted-flag="Y"]').unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
					toAddArea.find('.orderQty[data-weighted-flag="N"]').onlyNumbers();toAddArea.find('.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
					toAddArea
							.find('.supplyDrop')
							.change(
									function() {
										if($(this).val()!=''){
											//var code = $(this).val().split('(')[1].split(')')[0];
											/*if (code == '95') {
												showAlertInClaimsLookup('Claims are raised manually by support office and hence system may not reflect the Claim # immediately');
											} else if (code == '91'
													|| code == '99') {
												showAlertInClaimsLookup('Supplier claims will not be raised and only Stock will be adjusted');
											}*/ 
											
											if($(this).val() == '100'){
												$(this).closest('td').find('.otherReasonTxt').removeClass('hideBlock');
											} else {
												$(this).closest('td').find('.otherReasonTxt').addClass('hideBlock');
											}
										} else {
											$(this).closest('td').find('.otherReasonTxt').addClass('hideBlock');
										}

									});

					toAddArea
							.find('.authCodeInput')
							.change(
									function() {

										if (this.value != '') {
											if (!$("#dialog-promptFinalise")
													.dialog("isOpen")) {
												if ($(
														'input.hdr_authorisedDate')
														.val().trim() == ''
														&& $(
																'input.hdr_authorisedDate')
																.is(':visible')) {
													$(
															'input.hdr_authorisedDate')
															.val(
																	getDesiredFutureDate(0));
												} else if (toAddArea.find(
														'.authDateInput').is(
														':visible')) {
													toAddArea
															.find(
																	'.authDateInput')
															.val(
																	getDesiredFutureDate(0));
												}
											} else {
												if ($('input.authdate').val()
														.trim() == '') {
													$('input.authdate')
															.val(
																	getDesiredFutureDate(0));
												}
											}
										}
									});

					toAddArea.find('.onViewOnly').addClass('hideBlock');
				}

			} else {
				if (item != null && item != undefined
						&& item.article_uom != undefined
						&& item.article_uom.trim() != null
						&& item.article_uom.trim() != '') {
					item.uom = item.article_uom.trim();
				} else {
					item.uom = '';
				}

				var i;
				if (inEditPage != undefined) {
					i = $('#editClaimTable table tbody tr').length;
					itemsInClaim.push(toOrderItemInfo(item));
					itemsInClaim[i].qty = orderQty;
					itemsInClaim[i].total_units = orderQty;
					// itemsInClaim[i].obj_index = i;
				}

				var itemContent = getRowItemAsHtml(toOrderItemInfo(item), i);
				toAddArea.find('tbody').append(itemContent);
				//$('.orderQty').onlyNumbers();
				toAddArea.find('.orderQty[data-weighted-flag="Y"]').isWithinOnly3Decimal();
				toAddArea.find('.orderQty[data-weighted-flag="Y"]').unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
				toAddArea.find('.orderQty[data-weighted-flag="N"]').onlyNumbers();toAddArea.find('.orderQty[data-weighted-flag="N"]').attr('maxlength','3');
				toAddArea.find('.onViewOnly').addClass('hideBlock');
			}
			updateSingleUOMColumn(item, toAddArea, inEditPage);
			item = toOrderItemInfo(item);
			var id = /*
						 * item.order_no + '-' +
						 */item.article + '-' + itemid.article_uom + '-'
					+ Number(item.supplier_no);
			toAddArea.find('#' + id).data('obj', item);
			toAddArea.find('#' + id).find('.deleteRecord').unbind('click');
			toAddArea.find('#' + id).find('.deleteRecord').click(
					function() {

						var elem = $(this).closest('tr');
						var obj = $(elem).data('obj');
						confirmation('Article '+obj.article+' is going to be removed from the list. Is this correct?', elem,
								obj, true);

						/*
						 * var elem = toAddArea .find('#' + id); confirmation(
						 * "Please confirm to remove item?", elem, item, true);
						 */
					});
			/*
			 * $(".inputDate") .datepicker( { firstDay : 1, dateFormat :
			 * "dd/mm/yy", zIndex : 50 });
			 */

			var total = 0;
			var otherFlag = false;
			var kgFlag = false;
			var radioValue = '';
			toAddArea.find('tr td.totalUnits').each(function() {
				radioValue = $(this).closest('tr').data('obj').uom;
				if(radioValue == 'KG'){
					kgFlag = true;
				} else {
					otherFlag = true;
				}
				total += Number($(this).text());
			});
			
			$('.pageTotalUnits').text(total);
			if(otherFlag && kgFlag){
				$('.pageTotalUnits').text('');
				$('.pageTotalUom').text('');
			}
			
			if(kgFlag && !otherFlag){
				$('.pageTotalUom').text('KG');
			}
			/* $('.hdr_articleCount').text(itemList.length); */

			$('.artCount').text(
					"(" + $(".articleCountRow:visible").length + ")");

		} else {
			// if (orderQty != '') {
			//Defect_12851 - Fix
			showWarning(
					'Article '+toAddArea.find('#' + id).data('obj').article+' already exists with Qty '+toAddArea.find('#' + id).find('.orderQty').val()+'. Do you want to update?',
					toAddArea, id, orderQty);

			/*
			 * toAddArea .find( '#' + id) .find( '.orderQty') .val( orderQty);
			 */
			// }
		}
	}
	toAddArea.find('.onViewOnly').addClass('hideBlock');

	if ($("#checkboxActive").is(':visible')) {
		if ($("#checkboxActive").is(':checked'))
			$(".columnHide").removeClass('hideBlock');
		else {
			$(".columnHide").addClass('hideBlock');
		}
	}
	if ($("#checkboxActive_edit").is(':visible')) {
		if ($("#checkboxActive_edit").is(':checked'))
			$(".columnHide").removeClass('hideBlock');
		else {
			$(".columnHide").addClass('hideBlock');
		}
	}
/*	$('.carrCountcode')
			.keydown(
					function(e) {
						if (e.shiftKey || e.ctrlKey || e.altKey) {
							e.preventDefault();
						} else {
							var key = e.keyCode;
							if (!((key == 8) || (key == 46)
									|| (key >= 35 && key <= 40)
									|| (key >= 48 && key <= 57) || (key >= 96 && key <= 105))) {
								e.preventDefault();
							}
						}
					});*/
	$("#dialog-mulipleArticles").dialog("close");
	$('.carrCountcode').onlyNumbers();
	$('.carrierNamecode, .vehiclecode, .consigncode,.authcode').onlyAlphaNumericCharacters();
	
	toAddArea.find(".inputDate").datepicker({
		firstDay : 1,
		dateFormat : "dd/mm/yy",
		zIndex : 50

	});
	resetFinalizeBtn();
}
function getReasonCode() {
	/*var param = {
		"iv_site" : $('#posSite').val(),
		"pwd" : encSapPwd,
		"user_id" : $('#loginUserId').val()
	};
console.log(param+"username&pswd");
	$
			.post(rtvClaimsReasonCode, JSON.stringify(param), function() {
			})
			.done(
					function(responseStr) {*/
						//if (responseStr != undefined) {
							//if (responseStr.d != undefined) {
								var reasonList = [{"reasonCode": "10","reasonDesc":"Damage Stock"},
								                  {"reasonCode": "20","reasonDesc":"Demo Stock"},
								                  {"reasonCode": "30","reasonDesc":"Faulty Stock"},
								                  {"reasonCode": "40","reasonDesc":"Incorrect Stock"},
								                  {"reasonCode": "91","reasonDesc":"Not Ordered"},
								                  {"reasonCode": "52","reasonDesc":"Packaging Error"},
								                  {"reasonCode": "63","reasonDesc":"Poor Quality"},
								                  {"reasonCode": "95","reasonDesc":"Short Code / Out of Date"},
								                  {"reasonCode": "99","reasonDesc":"Return Stock"},
								                  {"reasonCode": "100","reasonDesc":"Other"}];
								if (reasonList != undefined
										&& reasonList != null) {
									reasonMap = formMapFromList(reasonList);
									var content = '<option value="">Select Reason</option>';
									for ( var i = 0; i < reasonList.length; i++) {
										content += '<option data-code="'+reasonList[i].reasonCode+'" value="'
												+ reasonList[i].reasonDesc
												+ '">'
												+ reasonList[i].reasonDesc
												+ '</option>';
									}
									reasonOptions = content;
									reasonSelect = '<select class="selectOptions supplyDrop reason" tabindex="68">'
											+ reasonOptions + '</select>';
									$("select.hdr_reason,select.reason").html(
											reasonOptions);
								}
							//}
						//}

					//});

}
function formMapFromList(list) {
	var hdrMap = {};
	for ( var i = 0; i < list.length; i++) {
		var key = list[i].reasonDesc;
		keyChkList.push(key); 
		var value = list[i].reasonDesc;
		var newList = [];
		if ($(hdrMap).attr(key) != undefined) {
			newList = $(hdrMap).attr(key);
		}
		newList.push(value);
		hdrMap[key] = newList;
	}

	return hdrMap;
}
function formListFromMap(hdrMap) {
	var newList = [];
	for (m in hdrMap) {
		var list = hdrMap[m];
		newList.push(list[0]);
	}
	return newList;
}
function callFunctionForSorting(id) {

	tempSort(id);

}
function callSortingInEdit(id) {
	tempSortInClaimDetailsPage(id);
}
function updateSortPlugin(id) {
	$('.sortTable' + id).trigger("update");
}
// Sorting in Details page start

function triggerSortInClaimDetailsPage(prop, thead, flag, tableId) {
	var toBeSortList = itemsInClaim;
	sortBasedOnHdrInClaimDetailsPage(toBeSortList, prop, thead, flag);
	frameRowsInClaimDetailsPage(toBeSortList, tableId);
}
function tempSortInClaimDetailsPage(id) {
	$('#' + id + ' .table-sort-hdr th')
			.not($('.table-sort-hdr th.noSort'))
			.click(
					function() {
						var flag = true;
						var tableId = $(this).closest('table').attr('id');
						var supplier = $(this).closest('tr').attr(
								'data_supplier_no');
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
							triggerSortInClaimDetailsPage(prop, thead, flag, id);
						}
					});
}
function sortBasedOnHdrInClaimDetailsPage(list, prop, thead, flag) {

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
function frameRowsInClaimDetailsPage(itemList, tableId) {
	$('#editClaimTable tbody').html('');
	for ( var i in itemList) {
		itemList[i].order_no = (itemList[i].order_no != null && itemList[i].order_no != undefined) ? itemList[i].order_no
				.replace(/^0+/, '')
				: '';
		itemList[i].article = (itemList[i].article != null && itemList[i].article != undefined) ? itemList[i].article
				.replace(/^0+/, '')
				: '';
		itemList[i].supplier_no = (itemList[i].supplier_no != null && itemList[i].supplier_no != undefined) ? itemList[i].supplier_no/*
				.replace(/^0+/, '')*/
				: '';

		var itemContent = getRowItemAsHtml(itemList[i], i);

		$('#editClaimTable').find('tbody').append(itemContent);

		//$('.orderQty').onlyNumbers();
		var $elem = $('.orderQty[data-weighted-flag="Y"]');
		$elem.isWithinOnly3Decimal()
		$elem.unbind('blur').bind('blur',weightBlurEvent).removeAttr('maxlength');
		var $elem = $('.orderQty[data-weighted-flag="N"]');
		$elem.onlyNumbers();$elem.attr('maxlength','3');
		var id = /* itemList[i].order_no + '-' + */Number(itemList[i].article)
				+ '-' + itemList[i].uom + '-' + Number(itemList[i].supplier_no);
		$('#editClaimTable').find('#' + id).data('obj', itemList[i]);
		if (!$("#editAction").hasClass('disabled'))
			$('#editClaimTable').find('#' + id).data('obj').action_flag = 'U';
		$('#editClaimTable').find('#' + id).find('.deleteRecord').unbind(
				'click');
		$('#editClaimTable').find('#' + id).find('.deleteRecord').click(
				function() {
					var elem = $(this).closest('tr');
					var obj = $(elem).data('obj');
					confirmation("Please confirm to remove item?", elem, obj,
							true);
				});

		/*
		 * $(".inputDate").datepicker({ firstDay : 1, dateFormat : "dd/mm/yy",
		 * zIndex : 50 });
		 */

	}
	if (!$("#editAction").hasClass('disabled')) {
		$('.onEditOnly').addClass('hideBlock');
		$('.onViewOnly').removeClass('hideBlock');
	} else {
		$('.onEditOnly').removeClass('hideBlock');
		$('.onViewOnly').addClass('hideBlock');

		if ($('#editClaimTable table tr  td.uomColumn').text() == '') {
			for ( var i = 0; i < itemsInClaim.length; i++) {
				populateRadioContentOnSort(itemsInClaim[i],
						$('#editClaimTable'), true);
			}
		}
	}
	if ($("#checkboxActive").is(':visible')) {
		if ($("#checkboxActive").is(':checked'))
			$(".columnHide").removeClass('hideBlock');
		else {
			$(".columnHide").addClass('hideBlock');
		}
	}
	if ($("#checkboxActive_edit").is(':visible')) {
		if ($("#checkboxActive_edit").is(':checked'))
			$(".columnHide").removeClass('hideBlock');
		else {
			$(".columnHide").addClass('hideBlock');
		}
	}

}

// Sorting in Details page end

function triggerSort(prop, thead, flag, tableId) {
	var toBeSortList = [];
	$('#' + tableId).find('tr[mainrow]').each(function() {
		toBeSortList.push($(this).data("obj"));
	});
	sortBasedOnHdr(toBeSortList, prop, thead, flag);
	frameDraftRows(toBeSortList, tableId);
}
function tempSort(id) {
	$('#' + id + ' .table-sort-hdr th').not($('.table-sort-hdr th.noSort'))
		.unbind('click').bind('click',function() {
						var flag = true;
						var tableId = $(this).closest('table').attr('id');
						var supplier = $(this).closest('tr').attr(
								'data_supplier_no');
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
function frameDraftRows(draftList, tableId) {
	var myDraftGrp = $groupBy(
			draftList,
			function(obj) {
				obj.order_no = (obj.order_no != null && obj.order_no != undefined) ? obj.order_no
						.replace(/^0+/, '')
						: obj.order_no;
				obj.article = (obj.article != null && obj.article != undefined) ? obj.article
						.replace(/^0+/, '')
						: obj.article;
				obj.supplier_no = (obj.supplier_no != null && obj.supplier_no != undefined) ? obj.supplier_no/*
						.replace(/^0+/, '')*/
						: obj.supplier_no;
				return obj.supplier_no;
			});
	var area = $('#' + tableId);
	area.find('tbody').html('');
	for ( var key in myDraftGrp) {
		var list = myDraftGrp[key];
		area.find('tbody').append(getGrpHeader(key, list[0].supplier_name));

		for ( var item in list) {
			area.find('tbody').append(getRowResults(key, list[item], item));
			area.find('tbody').find('#' + key + '-' + item).data('obj',
					list[item]);
			area.find('tbody').find('#' + key + '-' + item).data('obj').action_flag = 'U';
			area.find('tbody').find('#' + key + '-' + item).unbind('click');
			area.find('tbody').find('#' + key + '-' + item).click(function() {
				bindEventForOnClick($(this).data('obj'), $(this));
			});
		}
	}
}
function bindUomRadioContent(area, rowId, flag) {
	
	var $elem;
	var enteredQty = '';
	var defaultOM = '';
	var changedOm = '';
	var finalOm = '';
	var total = 0;
	var radioValue = '';
	var kgFlag = false;
	var otherFlag = false;
	var total_units = 0;
	var kgItem = false;
	
	area.find('#' + rowId).find('input[name="uomRadioInCreate' + rowId + '"]').unbind('click').bind('click',function() {
		$elem =  area.find('#' + rowId);
		kgItem = (($elem.data('obj').uom||'') == 'KG');
		if ($(this).hasClass('orderUom')) {
			enteredQty = $elem.find('input.orderQty').val();
			defaultOM = $(this).attr('default-om');
			changedOm = $elem.find('input.changedOm').val();
			finalOm = '';
			total = 0;
			radioValue = '';
			kgFlag = false;
			otherFlag = false;
			total_units = 0;
			
			if (changedOm == '') {
				finalOm = defaultOM;
			} else {
				finalOm = changedOm;
			}
			
			total_units = Number(enteredQty) * Number(finalOm);
			total_units = kgItem ? (total_units).toFixed(3) : total_units;
			$elem.find('td.totalUnits').text(total_units);
			
			area.find('tr td.totalUnits').each(function() {
				radioValue = $(this).closest('tr').data('obj').uom;
				if(radioValue == 'KG'){
					kgFlag = true;
				} else {
					otherFlag = true;
				}
				total += Number($(this).text());
			});
			
			if(kgFlag && otherFlag){
				$('.pageTotalUnits').text('');
				$('.pageTotalUom').text('');
			}else if(kgFlag){
				$('.pageTotalUnits').text(Number(total).toFixed(3));
			}else{
				$('.pageTotalUnits').text(total);
			}

			if (flag != undefined) {
				var i = $elem.attr(
						'data-index');
				itemsInClaim[i].qty = enteredQty;
				itemsInClaim[i].new_om = changedOm;
				itemsInClaim[i].total_units = total_units;
			}

		} else if ($(this).hasClass('articleUom')) {
			
			enteredQty = $elem.find('input.orderQty').val();
			changedOm = $elem.find('input.changedOm').val();
			total_units = Number(enteredQty) * 1;
			total_units = kgItem ? (total_units).toFixed(3) : total_units; 
			total = 0;
			radioValue = '';
			kgFlag = false;
			otherFlag = false;
			
			$elem.find('td.totalUnits').text(total_units);
			
			area.find('tr td.totalUnits').each(function() {	
				radioValue = $(this).closest('tr').data('obj').uom;
				if(radioValue == 'KG'){
					kgFlag = true;
				} else {
					otherFlag = true;
				}
				total += Number($(this).text());
			});
			
			if(kgFlag && otherFlag){
				$('.pageTotalUnits').text('');
				$('.pageTotalUom').text('');
			}else if(kgFlag){
				$('.pageTotalUnits').text(Number(total).toFixed(3));
			}else{
				$('.pageTotalUnits').text(total);
			}

			if (flag != undefined) {
				var i = $elem.attr(
						'data-index');
				itemsInClaim[i].qty = enteredQty;
				itemsInClaim[i].new_om = changedOm;
				itemsInClaim[i].total_units = total_units;
			}

		}
	});
	area.find('#' + rowId).find('input.orderQty').unbind('change').bind('change',function() {

		var existsFlag = true;
		
		$elem =  area.find('#' + rowId);
		kgItem = (($elem.data('obj').uom||'') == 'KG');
		var $checkedElem = $elem.find('input[name="uomRadioInCreate' + rowId + '"]:checked');
		
		if ($checkedElem.hasClass('orderUom')) {
			
			existsFlag = false;
			enteredQty = $elem.find('input.orderQty').val();
			defaultOM = $(this).attr('default-om');
			changedOm = $elem.find('input.changedOm').val();
			finalOm = '';
			total = 0;
			radioValue = '';
			kgFlag = false;
			otherFlag = false;
			
			if (changedOm == '') {
				finalOm = defaultOM;
			} else {
				finalOm = changedOm;
			}
			
			total_units = Number(enteredQty) * Number(finalOm);
			total_units = kgItem ? (total_units).toFixed(3) : total_units;
			$elem.find('td.totalUnits').text(total_units);
			
			area.find('tr td.totalUnits').each(function() {
				radioValue = $(this).closest('tr').data('obj').uom;
				if(radioValue == 'KG'){
					kgFlag = true;
				} else {
					otherFlag = true;
				}
				total += Number($(this).text());
			});
			
			if(kgFlag && otherFlag){
				$('.pageTotalUnits').text('');
				$('.pageTotalUom').text('');
			}else if(kgFlag){
				$('.pageTotalUnits').text(Number(total).toFixed(3));
			}else{
				$('.pageTotalUnits').text(total);
			}

			if (flag != undefined) {
				var i = $elem.attr('data-index');
				itemsInClaim[i].qty = enteredQty;
				itemsInClaim[i].new_om = changedOm;
				itemsInClaim[i].total_units = total_units;
			}

		} else if ($checkedElem.hasClass('articleUom')) {
			
			existsFlag = false;
			enteredQty = $elem.find('input.orderQty').val();
			changedOm = $elem.find('input.changedOm').val();
			total = 0;
			radioValue = '';
			kgFlag = false;
			otherFlag = false;
			
			total_units = Number(enteredQty) * 1;
			total_units = kgItem ? (total_units).toFixed(3) : total_units;
			$elem.find('td.totalUnits').text(total_units);
			
			area.find('tr td.totalUnits').each(function() {
				radioValue = $(this).closest('tr').data('obj').uom;
				if(radioValue == 'KG'){
					kgFlag = true;
				} else {
					otherFlag = true;
				}
				total += Number($(this).text());
			});
			
			if(kgFlag && otherFlag){
				$('.pageTotalUnits').text('');
				$('.pageTotalUom').text('');
			}else if(kgFlag){
				$('.pageTotalUnits').text(Number(total).toFixed(3));
			}else{
				$('.pageTotalUnits').text(total);
			}

			if (flag != undefined) {
				var i = $elem.attr('data-index');
				itemsInClaim[i].qty = enteredQty;
				itemsInClaim[i].new_om = changedOm;
				itemsInClaim[i].total_units = total_units;
			}

		}

		if (existsFlag) {

			var $checkedElem = $elem.find('input[name="uomRadioInEdit' + rowId + '"]:checked');
			
			if ($checkedElem.hasClass('orderUom')) {

				enteredQty = $elem.find('input.orderQty').val();
				defaultOM = $(this).attr('default-om');
				changedOm = $elem.find('input.changedOm').val();
				finalOm = '';
				total = 0;
				radioValue = '';
				kgFlag = false;
				otherFlag = false;
				
				if (changedOm == '') {
					finalOm = defaultOM;
				} else {
					finalOm = changedOm;
				}
				
				total_units = Number(enteredQty) * Number(finalOm);
				total_units = kgItem ? (total_units).toFixed(3) : total_units;
				$elem.find('td.totalUnits').text(total_units);
				
				area.find('tr td.totalUnits').each(function() {
					radioValue = $(this).closest('tr').data('obj').uom;
					if(radioValue == 'KG'){
						kgFlag = true;
					} else {
						otherFlag = true;
					}
					total += Number($(this).text());
				});
				
				if(kgFlag && otherFlag){
					$('.pageTotalUnits').text('');
					$('.pageTotalUom').text('');
				}else if(kgFlag){
					$('.pageTotalUnits').text(Number(total).toFixed(3));
				}else{
					$('.pageTotalUnits').text(total);
				}

				if (flag != undefined) {
					var i = $elem.attr('data-index');
					itemsInClaim[i].qty = enteredQty;
					itemsInClaim[i].new_om = changedOm;
					itemsInClaim[i].total_units = total_units;
				}

			} else if ($checkedElem.hasClass('articleUom')) {

				enteredQty = $elem.find('input.orderQty').val();
				changedOm = $elem.find('input.changedOm').val();
				total = 0;
				radioValue = '';
				kgFlag = false;
				otherFlag = false;
				
				total_units = Number(enteredQty) * 1;
				total_units = kgItem ? (total_units).toFixed(3) : total_units;
				$elem.find('td.totalUnits').text(total_units);
				
				area.find('tr td.totalUnits').each(function() {
					radioValue = $(this).closest('tr').data('obj').uom;
					if(radioValue == 'KG'){
						kgFlag = true;
					} else {
						otherFlag = true;
					}
					total += Number($(this).text());
				});
				
				if(kgFlag && otherFlag){
					$('.pageTotalUnits').text('');
					$('.pageTotalUom').text('');
				}else if(kgFlag){
					$('.pageTotalUnits').text(Number(total).toFixed(3));
				}else{
					$('.pageTotalUnits').text(total);
				}

				if (flag != undefined) {
					var i = $elem.attr('data-index');
					itemsInClaim[i].qty = enteredQty;
					itemsInClaim[i].new_om = changedOm;
					itemsInClaim[i].total_units = total_units;
				}

			}

		}

	});

	area.find('#' + rowId).find('input.changedOm').unbind('change').bind('change',function() {

		var existsFlag = true;
		$elem =  area.find('#' + rowId);
		kgItem = (($elem.data('obj').uom||'') == 'KG');
		var $checkedElem = $elem.find('input[name="uomRadioInCreate' + rowId + '"]:checked');
		if ($checkedElem.hasClass('orderUom')) {
			
			existsFlag = false;
			enteredQty = $elem.find('input.orderQty').val();
			defaultOM = $(this).attr('default-om');
			changedOm = $elem.find('input.changedOm').val();
			finalOm = '';
			total = 0;
			
			if (changedOm == '') {
				finalOm = defaultOM;
			} else {
				finalOm = changedOm;
			}
			
			total_units = Number(enteredQty) * Number(finalOm);
			total_units = kgItem ? (total_units).toFixed(3) : total_units;
			$elem.find('td.totalUnits').text(total_units);
			
			area.find('tr td.totalUnits').each(function() {
				total += Number($(this).text());
			});
			
			$('.pageTotalUnits').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);

			if (flag != undefined) {
				var i = $elem.attr('data-index');
				itemsInClaim[i].qty = enteredQty;
				itemsInClaim[i].new_om = changedOm;
				itemsInClaim[i].total_units = total_units;
			}

		} else if ($checkedElem.hasClass('articleUom')) {
			existsFlag = false;
			enteredQty = $elem.find('input.orderQty').val();
			total = 0;
			changedOm = $elem.find('input.changedOm').val();
			
			total_units = Number(enteredQty) * 1;
			total_units = kgItem ? (total_units).toFixed(3) : total_units;
			$elem.find('td.totalUnits').text(total_units);
			
			area.find('tr td.totalUnits').each(function() {
				total += Number($(this).text());
			});
			$('.pageTotalUnits').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);

			if (flag != undefined) {
				var i = $elem.attr('data-index');
				itemsInClaim[i].qty = enteredQty;
				itemsInClaim[i].new_om = changedOm;
				itemsInClaim[i].total_units = total_units;
			}
		}

		if (existsFlag) {

			var $checkedElem = $elem.find('input[name="uomRadioInEdit' + rowId + '"]:checked');
			if ($checkedElem.hasClass('orderUom')) {

				enteredQty = $elem.find('input.orderQty').val();
				defaultOM = $(this).attr('default-om');
				changedOm = $elem.find('input.changedOm').val();
				finalOm = '';
				total = 0;
				
				if (changedOm == '') {
					finalOm = defaultOM;
				} else {
					finalOm = changedOm;
				}
				
				total_units = Number(enteredQty) * Number(finalOm);
				total_units = kgItem ? (total_units).toFixed(3) : total_units;
				$elem.find('td.totalUnits').text(total_units);
				
				area.find('tr td.totalUnits').each(function() {
					total += Number($(this).text());
				});
				$('.pageTotalUnits').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);

				if (flag != undefined) {
					var i = $elem.attr('data-index');
					itemsInClaim[i].qty = enteredQty;
					itemsInClaim[i].new_om = changedOm;
					itemsInClaim[i].total_units = total_units;
				}

			} else if ($checkedElem.hasClass('articleUom')) {

				enteredQty = $elem.find('input.orderQty').val();
				total = 0;
				changedOm = $elem.find('input.changedOm').val();
				
				total_units = Number(enteredQty) * 1;
				total_units = kgItem ? (total_units).toFixed(3) : total_units;
				$elem.find('td.totalUnits').text(total_units);
				
				area.find('tr td.totalUnits').each(function() {
					total += Number($(this).text());
				});
				$('.pageTotalUnits').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);

				if (flag != undefined) {
					var i = $elem.attr('data-index');
					itemsInClaim[i].qty = enteredQty;
					itemsInClaim[i].new_om = changedOm;
					itemsInClaim[i].total_units = total_units;
				}
			}

		}

	});

	area.find('#' + rowId).find('input[name="uomRadioInEdit' + rowId + '"]').unbind('click').bind('click',function() {
		$elem =  area.find('#' + rowId);
		kgItem = (($elem.data('obj').uom||'') == 'KG');
		if ($(this).is(':checked')) {
			if ($(this).hasClass('orderUom')) {
				
				enteredQty = $elem.find('input.orderQty').val();
				defaultOM = $(this).attr('default-om');
				changedOm = $elem.find('input.changedOm').val();
				finalOm = '';
				total = 0;
				
				if (changedOm == '') {
					finalOm = defaultOM;
				} else {
					finalOm = changedOm;
				}
				
				
				total_units = Number(enteredQty) * Number(finalOm);
				total_units = kgItem ? (total_units).toFixed(3) : total_units;
				$elem.find('td.totalUnits').text(total_units);
				
				area.find('tr td.totalUnits').each(function() {
					total += Number($(this).text());
				});
				$('.pageTotalUnits').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);
				$('.totalUnitsInHeader').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);
				if (flag != undefined) {
					var i = $elem.attr(
							'data-index');
					itemsInClaim[i].qty = enteredQty;
					itemsInClaim[i].new_om = changedOm;
					itemsInClaim[i].total_units = total_units;
				}

			} else if ($(this).hasClass('articleUom')) {
				var enteredQty = $elem.find(
						'input.orderQty').val();
				
				changedOm = $elem.find(
						'input.changedOm').val();
				total = 0;
				
				total_units = Number(enteredQty) * 1;
				total_units = kgItem ? (total_units).toFixed(3) : total_units;
				$elem.find('td.totalUnits').text(total_units);
				
				area.find('tr td.totalUnits').each(function() {
					total += Number($(this).text());
				});
				
				$('.pageTotalUnits').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);
				$('.totalUnitsInHeader').text(Number(total)%1 > 0  ? Number(total).toFixed(3) : total);

				if (flag != undefined) {
					var i = $elem.attr('data-index');
					itemsInClaim[i].qty = enteredQty;
					itemsInClaim[i].new_om = changedOm;
					itemsInClaim[i].total_units = total_units;
				}
			}
		}
	});

}
function showAllErrors(content) {
	$('#errorWrapperClaimlookup').removeClass('hideBlock');
	$('#validateErrorsClaimlookup').html(content);
}
function getError(msg) {
	return "<li>" + msg + "</li>";
}
function clearAllErrors() {
	$('#errorWrapper').addClass('hideBlock');
	$('#errorWrapperClaimlookup').addClass('hideBlock');
	$('#warningWrapper').addClass('hideBlock');
	// $('#errorMsgDiv').addClass('hideBlock');
	$('.' + errorFieldClass).each(function() {
		$(this).removeAttr('title');
		$(this).removeClass(errorFieldClass);
	});

}
function showAlertInClaimsLookup(msg) {
	$('#alertBox').text(msg);
	$('#dialog-alertBox').parent().find('.ui-dialog-title').text(
			'Claims Lookup');
	$("#dialog-alertBox").removeClass('hideBlock');
	$("#dialog-alertBox").parent().addClass("popupWrapper");
	$("#dialog-alertBox").dialog("open");
	$('#okBtn').unbind('click');
	$('#okBtn').click(function(e) {
		$("#dialog-alertBox").dialog("close");
	});
}
function confirmationFinalise(from, srcElem, obj) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$("#dialog-confirmation").parent().addClass("popupWrapper");

		$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
		$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
		// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation")
				.find('#message')
				.html(
						'Please make sure that the details entered are valid. Once <b>FINALISED</b>'
								+ ' you will not be able to edit. Do you want to continue ?');
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").find('#ok').unbind('click');
		$("#dialog-confirmation").find('#ok').click(function() {
			if (from == 'new') {
				area = $('.claimCreate').find('#editClaimTable');
				if (validateFinalise(area)) {
						callServiceForFinaliseClaim(area, 'finalise');
						$("#dialog-confirmation").dialog("close");
				} else {
					$("#dialog-confirmation").dialog("close");
				}
				
			} else if (from == 'old') {
				if (validateFinaliseUpdate($('.claimDetail'))) {
					updateClaim(srcElem, obj, true);
					$("#dialog-confirmation").dialog("close");
				} else {
					$("#dialog-confirmation").dialog("close");
				}
			}

		});
		$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
		$("#dialog-confirmation").find('#cancel').unbind('click');
		$("#dialog-confirmation").find('#cancel').click(function() {
			$("#dialog-confirmation").dialog("close");
		});
	} catch (err) {
		confirmationFinalise(from, srcElem, obj);
	}
}
function removeArticlesWithSameArticleAndOrderUOM(response) {
	var duplicateRemovedList = [];

	for ( var i = 0; i < response.length; i++) {
		if (response[i].article_uom != response[i].order_uom) {
			duplicateRemovedList.push(response[i]);
		}
	}
	return duplicateRemovedList;
}

function getFinalisePram(obj, flag) {
	var items = [];
	var finQty = 0;
	var radioVal = '';

	for (i in toRemoveItems) {
		items.push(toRemoveItems[i]);
	}
	$('#editTable')
			.find('tbody')
			.find('tr')
			.each(
					function() {
						var itm = $(this).data('obj');
						for(var i=0;i<getArticleUOMRes.length;i++){
							if(getArticleUOMRes[i].article_no == itm.article){
								itm.sub_category_no = getArticleUOMRes[i].sub_category_no;
							}
						}
						if (flag == 'delete')
							itm.action_flag = 'E';
						itm.consign_flag = $(this).attr('consign_flag');
						itm.international_vendor = $(this).attr('international_vendor');
						itm.qty = $(this).find('.orderQty').val();

						radioVal = $(this).find(
								'input[id=' + Number(itm.article)
										+ '-uomRadio]:checked').val();

						if (radioVal != undefined && radioVal != null) {
							finQty = (radioVal.split("-")[0] == 'order') ? ((radioVal
									.split("-")[1] != null && (radioVal
									.split("-")[1] != 'null')) ? (Number($(this)
									.find('.totalUnits').text()))
									: itm.qty)
									: itm.qty;
						} else {
							finQty = itm.qty;
						}
						var item = {
							"article_no" : Number(itm.article),
							"article_uom" : (itm.uom != undefined
									&& itm.uom != null && itm.uom != '') ? itm.uom
									: "",// set default uom to avoid
							"consign_flag" : itm.consign_flag,
							"international_vendor" : itm.international_vendor,
							"qty" : finQty,
							"cost_price" : (itm.cost_price||'0.00'),
							"sub_category_no":itm.sub_category_no
						};
						items.push(item);
					});

	if (flag == 'delete')
		flag = 'draft';

	if (flag == 'draft') {
		obj.draft = 'X';
		obj.return_flag = 'X';
		obj.auth_date = $('input.hdr_authorisedDate').val();
		obj.auth_no = $('input.hdr_authCode').val();
		obj.del_reg_no = $('input.hdr_deliveryregNo').val();
		obj.carrier = $('input.hdr_carrierNamecode').val();
		obj.consign = $('input.hdr_consigncode').val();
		obj.vehicle = $('input.hdr_vehiclecode').val();
		obj.iv_carton_count = $('input.hdr_carrCountcode').val();

	} else {
		obj.draft = '';
		obj.return_flag = 'X';
		obj.auth_date = $("#dialog-promptFinalise").find('.authdate').val();
		obj.auth_no = $("#dialog-promptFinalise").find('.authcode').val();
		obj.del_reg_no = $("#dialog-promptFinalise").find('.delregno').val();
		obj.reason = $("#dialog-promptFinalise").find('.reason').val();

		obj.carrier = $("#dialog-promptFinalise").find('.carrierNamecode')
				.val();
		obj.consign = $("#dialog-promptFinalise").find('.consigncode').val();
		obj.vehicle = $("#dialog-promptFinalise").find('.vehiclecode').val();
		obj.iv_carton_count = $("#dialog-promptFinalise").find('.carrCountcode')
				.val();
		
		if($("#dialog-promptFinalise").find('.reason').val() == 'Other'){
			obj.reason = $("#dialog-promptFinalise").find('.otherReasonEdit').val();
		}
	}
	var param = {
		"article_list_info" : items,
		"auth_date" : obj.auth_date,
		"po_type" : "ZNB",
		"auth_no" : obj.auth_no,
		"carrier" : obj.carrier,
		"consign" : obj.consign,
		"del_reg_no" : obj.del_reg_no,
		"delivery_date" : formatDateToMDY(obj.creationdate),
		"draft" : obj.draft,
		"msg" : "",
		"po_no" : obj.order_no,
		"purch_org" : "",
		"pwrm_no" : "",
		"reason" : obj.reason,
		"return_flag" : obj.return_flag,
		"return_po" : obj.order_no,
		"roaster_date" : formatDateToMDY(obj.creationdate),
		"supplier" : obj.supplier_no,
		"iv_carton_count" : obj.iv_carton_count,
		"iv_finalized_by" : $('#loginUserId').val(),
		"vehicle" : obj.vehicle
	};
	var paramList = [];
	paramList.push(param);
	var createParam = {
		"site_no" : $('#posSite').val(),
		"user_id" : $('#loginUserId').val(),
		"pwd" : encSapPwd,
		"return_info_list" : paramList
	};

	console.log(JSON.stringify(createParam));

	return createParam;
}
function openInEditForm(obj) {
	/*var roleId = $('#roleId').val();
	if (!isAdminRole(roleId)
			&& !$('#editAction').hasClass('hideBlock') && obj.status == 'Draft') {
		$('#editAction').trigger('click');
	}*/
}
function isDesiredRole(obj, key) {
	return obj.hasOwnProperty(key);
}

function showWarning(msg, toAddArea, id, orderQty) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass("hideBlock");

		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Information');
		$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');

		$("#dialog-confirmation").find('.confirmation-yesbtn').click(function() {
			var oldVal = toAddArea.find('#' + id).find('.orderQty').val();
			toAddArea.find('#' + id).find('.orderQty').val(Number(oldVal) + Number(orderQty)).trigger('change');
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
		});

		$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');

		$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
			$("#dialog-confirmation").parent().removeClass("popupWrapper");
			$("#dialog-confirmation").dialog("close");
		});

	} catch (err) {
		showWarning(msg, toAddArea, id, orderQty);
	}
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}
function onlyAlphaNumeric(username) {
	var alphaNum = /^[a-zA-Z0-9]+$/;
	if (!(alphaNum.test(username))) {
		var errors = getError('User ID should not contain Special characters.');
		return errors;
	}
	return '';
}
// <!-- method called to close advanced search box in css
// -->
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
function showNoDataWarning(content) {
	$('#noDataWarningWrapper').removeClass('hideBlock');
	$('#noDataWarning').html(content);
}
function confirmationOnNonReturnItem(nonReturnAbleItems, toAddArea, orderQty) {
	try {
		$("#dialog-confirmation").dialog({
			autoOpen : false,
			modal : true,
			resizable : false,
			minHeight : 100,
			maxHeight : 600,
			width : 350
		});

		$("#dialog-confirmation").parent().addClass("popupWrapper");

		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		var allArticles = '';
		for ( var i = 0; i < nonReturnAbleItems.length; i++) {
			allArticles += nonReturnAbleItems[i].article;
			if (i != nonReturnAbleItems.length - 1) {
				allArticles += ',';
			}
		}
		$("#dialog-confirmation")
				.find('#message').css('word-wrap', 'break-word')
				.html(
						allArticles
								+ ' set as <strong>NON-RETURNABLE</strong>, Do you still want to Continue ?');
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").dialog("open");
		yesFlag = true;
		$("#dialog-confirmation").find('#yesbtn').unbind('click');
		$("#dialog-confirmation").find('#yesbtn').click(
				function() {
					if (nonReturnAbleItems != null
							&& nonReturnAbleItems.length > 0) {
						var $table = $('#editTable');
						var tempMap = {};
						var errorMap = {};
						var tempCnt = 0;
						var errorCd =[];
						for ( var i = 0; i < nonReturnAbleItems.length; i++) {
							if(tempMap[nonReturnAbleItems[i].supplier] !=undefined){
								tempCnt = tempMap[nonReturnAbleItems[i].supplier];
								tempCnt++;
								tempMap[nonReturnAbleItems[i].supplier] = tempCnt;
							}else{
								tempCnt = 1;
								tempMap[nonReturnAbleItems[i].supplier] = tempCnt;
							}
							if((tempCnt + $table.find('.articleCountRow[supplierno = "'+nonReturnAbleItems[i].supplier+'"]').length) <=artlmt){
								addArticleToList(nonReturnAbleItems[i], toAddArea,
										orderQty);
							}else{
								errorMap[nonReturnAbleItems[i].supplier] = tempCnt;
							}
						}
						if(errorMap!=null && Object.keys(errorMap).length >0){
							var tmp = '';
							for(m in errorMap){if(tmp == ''){tmp+=''+m; }else {tmp+=', '+m;}}
							errorCd.push('Article Claim Limit has been reached. Please generate a new claim for supplier '+tmp);
						}
						if(errorCd.length>0){
							$.fn.showCustomMsg(errorCd
										,error,'Raise a Claim');
						}
					}
					
					if ($("#dialog-confirmation").find('#message').text()
							.toLowerCase().indexOf("non-returnable") > -1)
						$("#dialog-confirmation").dialog("close");
					yesFlag = false;
					if(editFlag == true){
						$('#searchArea').find('#searchAndAdd').unbind('click');
					}
					else
						{
						$('#searchArea').find('#searchAndAdd').unbind('click');
						}

				});
		$("#dialog-confirmation").find('#nobtn').unbind('click');
		$("#dialog-confirmation").find('#nobtn').click(function() {
			if (createFlag && (nonReturnAbleItems != null
					&& nonReturnAbleItems.length == 1)) {
				$("#dialog-confirmation").dialog("close");
				$('#redirectClaimForm').find('#claimArticle').val(nonReturnAbleItems[0].article);
				$('#redirectClaimForm').attr("action", "../articlelookup/onPageLoad.htm");
				$('#redirectClaimForm').attr('method','GET');
				$('#redirectClaimForm').submit();
				yesFlag = false;
			} else {
				$("#dialog-confirmation").dialog("close");
				$('#redirectClaimForm').find('#claimArticle').val(nonReturnAbleItems[0].article);
				$('#redirectClaimForm').attr("action", "../articlelookup/onPageLoad.htm");
				$('#redirectClaimForm').attr('method','GET');
				$('#redirectClaimForm').submit();
				yesFlag = false;
			}	
		});
	} catch (err) {
		confirmationOnNonReturnItem(nonReturnAbleItems, toAddArea, orderQty);
	}
}

function populateRadioContentOnSort(obj, area, flag) {

	var rowId = /* '-' + */obj.article + '-' + obj.article_uom + '-'
			+ Number(obj.supplier_no);
	if (obj.article_uom != undefined && obj.article_uom != null) {
		radioBtn = $('<input type="radio" class="articleUom" id="'
				+ obj.article + '-uomRadio" name="uomRadioInCreate' + rowId
				+ '" value="issue-' + getValidNumber(obj.om)
				+ '" checked="checked">' + obj.article_uom + '</input>');
		radioBtn.appendTo(area.find('#' + rowId + ' td.uomColumn'));
		// checkFlag = false;
	} /*
		 * else { checkFlag = true; }
		 */

	if (obj.order_uom != undefined && obj.order_uom != null) {
		if (obj.order_uom.trim() != "") {
			radioBtn = $('<input type="radio" class="orderUom" id="'
					+ obj.article + '-uomRadio" name="uomRadioInCreate' + rowId
					+ '" default-om="' + getValidNumber(obj.om)
					+ '" value="order-' + getValidNumber(obj.om) + '">'
					+ obj.order_uom + '</input>');
			// radioBtn.attr('checked', checkFlag);
			radioBtn.appendTo(area.find('#' + rowId + ' td.uomColumn'));
			// checkFlag = false;
		}
	}
	bindUomRadioContent(area, rowId, flag);

}
function timeformat() {
	var date = new Date();
	if (date.getHours() > 12) {
		hours = (date.getHours()) - 12;
		ampm = "pm";
	} else {
		hours = (date.getHours());
		ampm = "am";
	}
	return (hours < 10 ? ("0" + hours) : hours)
			+ ":"
			+ (date.getMinutes() < 10 ? "0" + date.getMinutes() : date
					.getMinutes()) + " " + ampm;
}

function dateformat() {
	var date = new Date();
	day = date.getDate();
	month = date.getMonth() + 1;
	year = date.getFullYear();
	return (day < 10 ? ("0" + day) : day) + "/"
			+ (month < 10 ? ("0" + month) : month) + "/"
			+ (year < 10 ? ("0" + year) : year);
}

function callServiceToLogRTVHistory(obj) {
	var url = rtvHistoryLogUrl;
	var itemObj = [];
	for ( var i = 0; i < obj.return_info_list.length; i++) {
		for ( var j = 0; j < obj.return_info_list[i].article_list_info.length; j++) {
			itemObj.push(constructItemObj(obj, obj.return_info_list[i],
					obj.return_info_list[i].article_list_info[j]));
		}
	}
	itemObj = $
			.grep(
					itemObj,
					function(listObj, i) {
						return (listObj.iv_claim_no != undefined
								&& listObj.iv_claim_no != null && listObj.iv_claim_no != '');
					});
	if (itemObj.length > 0) {
		var param = {
			"ItemArray" : itemObj
		};
		console.log(url + '  ' + JSON.stringify(param));
		$.ajax({
			data : JSON.stringify(param),
			url : url,
			type : 'post',
			beforeSend : function() {
				startLoading();
			}
		}).done(function(response) {

			console.log(response);
			if (checkResult(response, 'msg_type')) {
				if (response[0].msg_type == 'S') {
					console.log('history saved successfully');
				} else {
					console.log('history save failed');
				}
			}
			stopLoading();
		}).fail(
				function() {
					$.fn.showCustomMsg([ mobiSerErrCode ], error,
							'Returns To Vendor Claims');
					stopLoading();
				});
	}
}
function constructItemObj(obj, listObj, articleInfo) {
	/*
	 * {
	 * 
	 * "site_no": "1786",
	 * 
	 * "user_id": "102030",
	 * 
	 * "pwd":
	 * "1000:b47ced41ca3c5911670f0e9d8ecc0886de05fdef98:82260517a44d315a8052051ad4a113bab733d8ce12",
	 * 
	 * "return_info_list": [ {
	 * 
	 * "article_list_info": [ {
	 * 
	 * "article_no": 59755,
	 * 
	 * "article_uom": "KG",
	 * 
	 * "consign_flag": "N",
	 * 
	 * "qty": "1.567" } ],
	 * 
	 * "auth_date": "15/12/2015",
	 * 
	 * "po_type": "ZNB",
	 * 
	 * "auth_no": "123456",
	 * 
	 * "carrier": "",
	 * 
	 * "consign": "",
	 * 
	 * "del_reg_no": "",
	 * 
	 * "delivery_date": "12/15/2015",
	 * 
	 * "draft": "",
	 * 
	 * "msg": "",
	 * 
	 * "po_no": "80073595",
	 * 
	 * "purch_org": "",
	 * 
	 * "pwrm_no": "",
	 * 
	 * "reason": "40",
	 * 
	 * "return_flag": "X",
	 * 
	 * "return_po": "80073595",
	 * 
	 * "roaster_date": "12/15/2015",
	 * 
	 * "supplier": "1865004",
	 * 
	 * "vehicle": "" } ] }
	 */
	var reason = '';
	
	if(reasonMap[listObj.reason] != undefined && reasonMap[listObj.reason] != null){
		reason = reasonMap[listObj.reason][0];
	} else {
		reason = listObj.reason;
	}
	var itemObj = {
		"iv_site" : obj.site_no,
		"iv_sales_org" : $('#salesOrg').val(),
		"iv_session_id" : "1000",
		"iv_article" : articleInfo.article_no,
		"iv_article_uom" : articleInfo.article_uom,
		"iv_user" : obj.user_id,
		"iv_claim_no" : articleInfo.claimNo,
		"iv_claim_qty" : articleInfo.qty,
		"iv_claim_reason" : reason,
		"iv_platform" : "B"
	};
	return itemObj;
}

function navigatedFromStockAdjustScreen() {
	var articleNo = $('#articleNoFromStkAdj').val();
	var area = $('.claimCreate');
	area.find('#searchBox').val(articleNo);
	area.find('#searchAndAdd').trigger('click');
}

function verityUser(data, flag) {
	var createParam = {
		"iv_usr" : data.userId
	};

	console
			.log("verifyUserURL==" + verifyUserURL
					+ JSON.stringify(createParam));
	$
			.ajax({
				type : "post",
				url : verifyUserURL,
				data : JSON.stringify(createParam),

				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					hideErrorContent();
					// var option =
					// $("<h4>").html(response).find("#option").val();
					var res = response;
					var tblHdr = '<thead><tr><th data-sort="string">User ID</th><th data-sort="string">User Name</th><th width="15%" class="lastColumn">&nbsp;</th></tr></thead>';
					// myMap
					var activeFlag = false;
					if (res != null && res.length != 0) {
						var storeMap = res;
						var j = 0;
						var k = 1;
						var usr_id = '';
						var role = '';
						var saleOrg = '';
						var salesOrgContent = '';
						var siteContent = '';
						var selectContent = '';
						var activeStore = '';

						for ( var f = 0; f < res.length; f++) {
							// console.log(j++);
							j++;
							var list = res;
							list[f].usr_id = ((list[f].usr_id != null
									&& list[f].usr_id != undefined && list[f].usr_id != '') ? list[f].usr_id
									: '');
							list[f].userName = ((list[f].usr_name != null
									&& list[f].usr_name != undefined && list[f].usr_name != '') ? list[f].usr_name
									: '');
							list[f].roleId = ((list[f].role != null
									&& list[f].role != undefined && list[f].role != '') ? list[f].role
									: '');
							list[f].roleDesc = ((list[f].roleDesc != null
									&& list[f].roleDesc != undefined && list[f].roleDesc != '') ? list[f].roleDesc
									: '');

							usr_id = list[f].usr_id + ' - ' + list[f].usr_name;
							role = list[f].role;
							saleOrg = list[f].sales_org;
							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>' + list[f].usr_id
									+ '</td><td>' + list[f].usr_name + '</td>';

							tblHdr += '<td class="sorted lastColumn">';
							tblHdr += '<label class="linkBtn"><label class="selectItem verifyItem">Select</label></label>';
							tblHdr += '</td></tr>';

							salesOrgContent = '';
							siteContent = '';
							selectContent = '';
							if (j % 9 == 0) {
								k++;
							}

						}
						if (j > 1) {
							currPage = 1;
							$('#dialog-verify h4 strong').text(
									$('#advDiv #userID').val().trim());
							$('#dialog-verify .ContentTable').html('');
							$('#dialog-verify .ContentTable').html(tblHdr);
							$('#dialog-verify .noteLbl').remove();
							/*
							 * $( '<label class="noteLbl" style=" position:
							 * relative; top: 5px;">Note: Cannot add employees
							 * already linked to store. Contact respective store
							 * to Deactivate user.</label>')
							 * .insertAfter('#dialog-verify .popupData');
							 */
							$("#dialog-verify").dialog("open");
							if (j > 9) {
								$('.verifyPagination').removeClass('hideBlock');
								$('.verifyPagination').pagination({
									items : j,
									itemsOnPage : 9,
									cssStyle : 'compact-theme',
									currentPage : currPage,
									onPageClick : function(pageNumber) {
										showVerifyPage(pageNumber);

									}

								});
							} else {
								$('.verifyPagination').addClass('hideBlock');
							}
							bindVerifyContent(flag);
						} else {
							if (flag == 'user') {
								if (!activeFlag) {
									$('#advDiv #userID').val(usr_id);
									$('#saleOrg').val(saleOrg);
									$('#verifyLabel').removeClass('hideBlock');
								} else {
									showError(activeStore);
								}
							} else {
								$('#advDiv #userID1').val(usr_id);
								$('.roleList').val(role);
							}
						}

					} else {
						var title = "Created By";
						var errorContent = "Invalid User Id/Name";
						showErrorContent(title, errorContent);
						// $('#dialog-modal').dialog('open').removeClass('visible-hide');
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
				}
			});
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

function bindVerifyContent(flag) {
	// if(flag=='user')
	$('#dialog-verify .textbox').attr('placeholder', 'Enter user id or name');
	$('#dialog-verify .textbox').val('');
	$('#userID').val('');
	$('.verifyItem').unbind('click');
	$('.verifyItem').click(
			function() {
				hideError();
				if (flag == 'user') {
					$('#advDiv #userID').val(
							$(this).parent().parent().parent().find('td:first')
									.text().trim()
									+ ' - '
									+ $(this).parent().parent().parent().find(
											'td:nth-child(2)').text().trim());
					$('#saleOrg').val(
							$(this).parent().parent().parent().find(
									'td:nth-child(5)').text().trim());
					$('#verifyLabel').removeClass('hideBlock');
				} else {
					$('#advDiv #userID1').val(
							$(this).parent().parent().parent().find('td:first')
									.text().trim()
									+ ' - '
									+ $(this).parent().parent().parent().find(
											'td:nth-child(2)').text().trim());
					$('.roleList').val(
							$(this).parent().parent().parent().find(
									'td:nth-child(3)').text());
				}
				$("#dialog-verify").dialog("close");
			});

}
function getLimitQtyFromService() {
	var loggedInSalesOrg = $('#salesOrg').val();
	var param = {
		"IV_SALES_ORG" : loggedInSalesOrg
	};
	var articleLimit = 0;
	$.ajax({
		type : "post",
		url : getLimitQty,
		data : JSON.stringify(param),
		beforeSend : function() {
		},
		success : function(response) {

			if (response != null && response != undefined
			// && response.length >= 1
			&& response.result != undefined
					&& response.result[0].rtv_max_article_range != undefined) {
				articleLimit = response.result[0].rtv_max_article_range;

				artlmt =  articleLimit;
			} else {
				/*
				 * var errors= []; errors.push('Sorry, Limit Qty not found for
				 * the Sales Org.'); showAllErrors(errors); limitOrderQty = 99;
				 */
				artlmt =  articleLimit;
			}
			stopLoading();
		},
		error : function() {
			/*
			 * showAllErrors([mobiSerErrMsg]); limitOrderQty = 99;
			 */
			stopLoading();
		},
	});

}

function jasperPrint() {

	$('#articleForm').attr("action", "getSalesByArticletoPDF.pdf");
	$('#articleForm').attr('target', '_blank');
	$('#articleForm').submit();

}

function updateValueChangeFlag(){
	$('.claimDetail .editClaimDiv').find(":input").change(function() {
		valueChange = true;
	});
	
	$('.claimDetail #searchBoxArea').find(":input").change(function() {
		valueChange = true;
	});
}

function checkForQtyUpdate(){
	var changeFlag = false;	
	
	$('#editClaimTable').find('tbody tr').each(function(){
		obj = $(this).data('obj');
		
		if(obj != null){
			if(Math.ceil(Number($(this).find('.orderQty').val())) != Math.ceil(Number(obj.qty))){
				changeFlag = true;
			}
		}	
	});
	
	return changeFlag;
}
function resetFinalizeBtn(){
	if($('#editTable [supplier].sub').length>1){
		$('#finaliseNewDraft').addClass('hideBlock');
	}else{
		$('#finaliseNewDraft').removeClass('hideBlock');
	}
}
function bindCheckForChanges(){
	$('.headWrapper a,#detailLink a:first').unbind('click').bind("click", function(e) {
		e.preventDefault();
		var href = $(this).attr('href');
		if (valueChange || (!($('.saveActionArea').hasClass('hideBlock')) && $('.claimCreate').is(':visible'))  || checkForQtyUpdate() ) {
			showYesOrNoPopup("Claim list is not saved. Do you want to save claims?");
			$("#dialog-confirmation").find('#nobtn').unbind('click').click(function() {
				window.location.href = href;
			});
		}else {
			window.location.href = href;
		}
	});
}
var weightBlurEvent = function(e){
   $(this).val().trim()!='' ? $(this).val(Number($(this).val()).toFixed(3)) : '';
}

function addMultipleArticles(popupArea, toAddArea, orderQty,articleList){
	
		var nonReturnAbleItems = [];
		var returnableItems = [];
		var rtv_sub_cat_restrict = '';
		var random_wgt_restrict = '';
		var intl_vend_restrict = '';
		var yld_uom_restrict = '';
		var $table = $('#editTable');
		var tempMap = {};
		var errorMap = null;
		var errorCd = [];
		var tempCnt = 0;
		for ( var i = 0; i < articleList.length; i++) {
			if(articleList[i].department_no == '30' && articleList[i].rtv_sub_cat_flag != 'Y'){
				rtv_sub_cat_restrict+= ',"'+articleList[i].article+'"';
			} else if(articleList[i].random_wgt_flg != null && articleList[i].random_wgt_flg != undefined && articleList[i].random_wgt_flg == 'Y'){
				random_wgt_restrict+= ',"'+articleList[i].article+'"';
			} else if(articleList[i].order_uom != null && articleList[i].order_uom != undefined && articleList[i].order_uom == 'YLD'){
				yld_uom_restrict+= ',"'+articleList[i].article+'"';
			} else if(articleList[i].international_vendor != null && articleList[i].international_vendor != undefined && articleList[i].international_vendor == 'Y'){
				intl_vend_restrict+= ',"'+articleList[i].supplier_name+'"';
			}else if (articleList[i].sales_return_flag == 'Y') {
				returnableItems.push(articleList[i]);
			} else {
				nonReturnAbleItems.push(articleList[i]);
			}
		}
		
		if (returnableItems != null
				&& returnableItems.length > 0) {
			for ( var i = 0; i < returnableItems.length; i++) {
				if(tempMap[returnableItems[i].supplier] !=undefined){
					tempCnt = tempMap[returnableItems[i].supplier];
					tempCnt++;
					tempMap[returnableItems[i].supplier] = tempCnt;
				}else{
					tempCnt = 1;
					tempMap[returnableItems[i].supplier] = tempCnt;
				}
				if((tempCnt + $table.find('.articleCountRow[supplierno = "'+returnableItems[i].supplier+'"]').length) <=artlmt){
					addArticleToList(returnableItems[i], toAddArea,
							orderQty);
				}else{
					errorMap[returnableItems[i].supplier] = tempCnt;
				}
			}
		}
		if (nonReturnAbleItems != null
				&& nonReturnAbleItems.length > 0) {
			confirmationOnNonReturnItem(nonReturnAbleItems,
					toAddArea, orderQty);
		}
		
		if(random_wgt_restrict != ''){
			random_wgt_restrict = random_wgt_restrict.substr(1,random_wgt_restrict.length);
			errorCd.push('Claim not allowed for the article '
					+ random_wgt_restrict);
		}
		
		if(yld_uom_restrict != ''){
			yld_uom_restrict = yld_uom_restrict.substr(1,yld_uom_restrict.length);
			errorCd.push('Claim not allowed for the article '
					+ yld_uom_restrict);
		}
		
		/*Defect 8526
			intl_vend_restrict = intl_vend_restrict.substr(1,intl_vend_restrict.length);
			errorCd.push('Cannot raise claim against this supplier '
					+ intl_vend_restrict + ' ,Please contact buyer to determine further action');
		}*/
		
		if(rtv_sub_cat_restrict != ''){
			rtv_sub_cat_restrict = rtv_sub_cat_restrict.substr(1,rtv_sub_cat_restrict.length);
			errorCd.push('Claim not allowed for the article '
					+ rtv_sub_cat_restrict);
		}
		
		
		if(errorMap!=null && Object.keys(errorMap).length >0){
			var tmp = '';
			for(m in errorMap){if(tmp == ''){tmp+=''+m; }else {tmp+=', '+m;}}
			errorCd.push('Article Claim Limit has been reached. Please generate a new claim for supplier '+tmp);
		}
		if(errorCd.length>0){
			$.fn.showCustomMsg(errorCd
						,error,'Raise a Claim');
		}
		
}

function removeCreatedArticles(id,obj){
	var sup = id.attr('supplierNo');
	if ($('.' + sup).length == 1) {
		$('[supplier="' + sup + '"]').remove();
	}

	if (id.parent().find('tr').length <= 1) {
		id.parent().parent().parent().html('');
		if ($('.saveActionArea').is(':visible')) {
			$('.saveActionArea').addClass(
					'hideBlock');
		}
	} else {
		id.remove();
		if (obj != undefined
				&& obj.obj_index != undefined) {
			itemsInClaim.splice(obj.obj_index, 1);
			$(
					'#editTable .table-sort-hdr th.articleInEdit')
					.trigger('click');
		}
	}
	
	$('.artCount').text(
			"(" + $(".articleCountRow:visible").length + ")");
	
	if (obj != undefined && obj.order_no != '') {
		obj.action_flag = "E";
		obj.article_no = obj.article;
		obj.article_uom = obj.uom;
		obj.item_no = obj.item_number;
		toRemoveItems.push(obj);
	}
	resetFinalizeBtn();
	if($('.claimCreate').is(':visible')){
		var otherFlag = false;
		var kgFlag = false;
		var radioValue = '';
		var total = 0;
		$('.claimCreate #editClaimTable').find('tr td.totalUnits').each(function() {
			radioValue = $(this).closest('tr').data('obj').uom;
			if(radioValue == 'KG'){
				kgFlag = true;
			} else {
				otherFlag = true;
			}
			total += Number($(this).text());
		});
		
		$('.pageTotalUnits').text(total);
		if(otherFlag && kgFlag){
			$('.pageTotalUnits').text('');
			$('.pageTotalUom').text('');
		}
		
		if(kgFlag && !otherFlag){
			$('.pageTotalUom').text('KG');
		} else if(!kgFlag && otherFlag){
			$('.pageTotalUom').text('EA');
		}
	}
}