var variablePercentage = '';
var tabIndex = 0;
var depTabIndex = 0;
var $tblhold = '';
var rtnMapDisplayST = {};
var stDeptArray;
var stCatArray;
var stSubCatArray;
var stSegArray;
var stocktakePageType = '';
var stockTakePrint = '';
var getSTDetailsToAll;
var allInputs = '';
var editSTFreq = '';
var tabStockTakeStatus = "overdue";
var loadArray = [];
var deptSet = {};
var catSet = {};
var scatSet = {};
var segSet = {};
var editSTStatus = '';
var finaliseSTSelectedDept = '';// for finalise tab
var missedArticleCompletionFlag = '';
var $tblhold = '';
var reporttabIndex = 0;
var baseCountTabIndex = 0;
var missedArticlesTabIndex = 0;
var varianceReportTabIndex = 0;
var isBaseCountFilterPopulated = false;
var isMissedArticleCountFilterPopulated = false;
var isVarianceReportFilterPopulated = false;
var isUserPerformanceReportPopulated = false;
var isCreateStocktakePopulated = false;
var isEditStocktakePopulated = false;
var overrideFlagEdit = false;
var isHierCheckedHandleFlg=false;
var iv_fis_date = '';
var selectedDatesForEdit='';
var seq_no = '';
var baseFilteronLoad = true;
var filterContent = '';// holds article count filter data //Group by and filter
						// in same line changes
var filterContentMissedArticles = '';// holds missed article filter data
										// //Group by and filter in same line
										// changes
var filterContentVariance = '';// holds variance filter data //Group by and
								// filter in same line changes
var filterButtonDivContent = '';// holds filterbutton contents of article count
								// //Group by and filter in same line changes
var filterButtonDivContentMissedArticle = '';// holds filterbutton contents
												// of missed article //Group by
												// and filter in same line
												// changes
var filterButtonDivContentVariance = '';// holds filterbutton contents of missed
										// article //Group by and filter in same
										// line changes
var filterApplyClicked = false;
var globalRequestParam = {};// Group by and filter in same line changes
var responseDeptDropDown = '';// To avoid a service called many times
var responseUserDropDown = '';// To avoid a service called many times
var responseAisleDropDown = '';// To avoid a service called many times
var responseLocationDropDown = '';// To avoid a service called many times
var articleHierArea;
var responseP = '';// To hole the response and use while printing
var ulIdAreaMap = {
	"createSTDeptDrpDwnUl" : $("#createSTArticleHierarchyId"),
	"editSTDeptDrpDwnUl" : $("#editSTArticleHierarchyId"),
	"articleCountDeptDrpDwnUl" : $("#baseCountArticleHierarchyId"),
	"missedArticlesDeptDrpDwnUl" : $("#missedArticleHierarchyId"),
	"varianceReportDeptDrpDwnUl" : $("#varianceReportArticleHierarchyId")
};// for dept
var glSTStatus = '';
var selectedSTRow = '';
var editStockTakeIcon = 'AC_EDSTK';
var editStockTakeOpenIcon = 'AC_EDOSTK';
var overrideSt = 'AC_STOVR';
var deleteSt = 'AC_STD';
var finalizeButtonSt = 'AC_STFNL';
var canEdidOpenSt = false;
var countedByStUser = false;
var isCurrentUserSt = false;
var showFinalizeButton = false;
var globalValueForStocktakeDtls = [];
var missedPercentage = '';
var basePercentage = '';
var createStItemInfo = [];
var onRecordSelect = false;
//SC-526,12014
var stockTakeID = '';
$(function() {
	isCurrentUserSt = ($('#roleId').val() == 'STOTM' || $('#roleId').val() == 'STTM');
	$("#dialog-quickActionDialog").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 300
	});
	$("#dialog-confirmation").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		maxHeight : 600,
		width : 350
	});
	
	try {
		var userAccessObj = $.parseJSON($('#userAccess').val()).data;
		if (userAccessObj[editStockTakeOpenIcon][0]['includeExcludeFlag'] != 'R') {
			canEdidOpenSt = true;
		}
		if (userAccessObj[finalizeButtonSt][0]['includeExcludeFlag'] != 'R') {
			showFinalizeButton = true;
		}
	} catch (err) {
		console.log(err);
	}

	$("#quickButton").click(function() {
		populateLocationInQuickAction($("#dialog-quickActionDialog"));
		$("#dialog-quickActionDialog").parent().addClass("popupWrapper");
		$("#dialog-quickActionDialog").dialog("open");
	});

	$("#dialog-quickActionDialog .popupActions label").click(function() {
		$("#dialog-quickActionDialog").dialog("close");
	});

	$("label,option,select").tooltip({
		position : {
			my : "top center-40",
			at : "top center"
		}
	});
	// Code for tooltip
	$("a").tooltip({
		position : {
			my : "left top",
			at : "left top-40"
		}
	});

	$("#dialog-printall").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 100,
		width : 300
	});

	$("#dialog-printall").parent().addClass("popupWrapper");

	$("#printButton").click(function() {
		$("#dialog-printall").dialog("open");
	});

	$("#dialog-printall .popupActions label").click(function() {
		$("#dialog-printall").dialog("close");
	});

	$("#dialog-hierarchy").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 110,
		width : 980
	});

	$("#dialog-hierarchy").parent().addClass("popupWrapper");

	$("#dialog-editLocation").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		width : 850,
		height: 600
	});

	$("#editLocation").click(function() {
		populateSTLocations($("#dialog-editLocation"));
		/*$("#dialog-editLocation").parent().addClass("popupWrapper");
		$("#dialog-editLocation").dialog("open");
		$("#dialog-editLocation").parent().css('width', '850px');
		$("#dialog-editLocation").parent().css('top', '5px');
		$("#dialog-editLocation").parent().css('height', '600px');		
		$('#dialog-editLocation').parent().css('margin-top', '15px');*/
	});

	$("#dialog-editLocation .popupActions label").click(function() {
		$("#dialog-editLocation").dialog("close");
	});
	
	$('#applyLocation').unbind('click');
	$('#applyLocation').click(function() {
		console.log("save changes");
		validateSTLocations($("#dialog-editLocation"));
		//callSTSaveLocations();
		applyLocationChanges();
	});
	$('#printLocation').unbind('click');
	$('#printLocation').click(function() {
		console.log("print changes");
		//validateSTLocations($("#dialog-editLocation"));		
		printLocationChanges();
	});
	
	// Code for profile menu
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	$("#tabs")
			.tabs(
					{
						activate : function(event, ui) { // Tab click event
							tabIndex = ui.newTab.index();
							// alert(tabIndex);
							if (tabIndex == 0) {// overdue tab - get stocktake
												// by status
								$("#displaySTByStatusMyDep").empty();
								$("#displaySTByStatusAllDep").empty();
								loadStockTakeFirstPage();
								stocktakePageType = "";
							} else if (tabIndex == 1) {// due now tab - get
														// stocktake by status
								$("#displaySTByStatusMyDep").empty();
								$("#displaySTByStatusAllDep").empty();
								$tblhold = $("#displaySTByStatusMyDep");
								tabStockTakeStatus = "duenow";
								callDisplaySTService(tabStockTakeStatus);
								stocktakePageType = "";
							} else if (tabIndex == 2) {// upcoming tab - get
														// stocktake by status
								$("#displaySTByStatusMyDep").empty();
								$("#displaySTByStatusAllDep").empty();
								$tblhold = $("#displaySTByStatusMyDep");
								tabStockTakeStatus = "upcoming";
								callDisplaySTService(tabStockTakeStatus);
								stocktakePageType = "";
							} else if (tabIndex == 3) {// completed tab - get
														// stocktake by status
								$("#displaySTByStatusMyDep").empty();
								$("#displaySTByStatusAllDep").empty();
								$tblhold = $("#displaySTByStatusMyDep");
								tabStockTakeStatus = "completed";
								callDisplaySTService(tabStockTakeStatus);
								stocktakePageType = "";
							} else if (tabIndex == 4) {// deleted tab - get
														// stocktake by status
								$("#displaySTByStatusMyDep").empty();
								$("#displaySTByStatusAllDep").empty();
								$tblhold = $("#displaySTByStatusMyDep");
								tabStockTakeStatus = "deleted";
								callDisplaySTService(tabStockTakeStatus);
								stocktakePageType = "";
							} else if (tabIndex == 5) {// Create Stocktake List
								stocktakePageType = "CREATE_STOCKTAKE";
								$("#tableAddAction").removeClass("hideBlock");
								if (!isCreateStocktakePopulated) {
									bindCreateStockTakeEvents();
									stopLoading();
								}

								$('#createSTallDeptChkBox').unbind('change');
								$('#createSTallDeptChkBox')
										.change(
												function(e)// Defect_3164
												{
													if ($(
															'#createSTallDeptChkBox')
															.is(':checked')) {
														var warningMsg = 'You have selected All Departments, is this correct?';
														$.fn
																.warnPopup(
																		'warn',
																		warningMsg,
																		'Create Stocktake',
																		triggerSelectAllYes,
																		triggerSelectAllNo,
																		'',
																		$(this));
													}
												});
							} else if (tabIndex == 6) {
								stocktakePageType = "";
							} else if (tabIndex == 7) {
								$('#stLocHierarchyId').removeClass('hideBlock');
								bindSelectAllLocEvents($('#stLocHierarchyId'));
								populateLocations($('#stLocHierarchyId'));
								$('#stLocHierarchyId').find(".locLstCnt").text(
										0);
								stocktakePageType = "";
							}
						}
					});

	$("#o_stocktakes").tabs(
			{
				activate : function(event, ui) { // Tab click event
					depTabIndex = ui.newTab.index();
					// $(".displayArea").empty();//for proper pagination
					if (depTabIndex == 0) {// My Department
						$("#displaySTByStatusAllDep").html('');
						$tblhold = $("#displaySTByStatusMyDep");
						if (rtnMapDisplayST['MY_DEPT'] != undefined
								&& rtnMapDisplayST['MY_DEPT'].length > 0) {
							loadGetSTByStatusTbl(rtnMapDisplayST['MY_DEPT'],
									$tblhold, displayStatus);
						} else {
							// $.fn.showCustomMsg(['Sorry, No records
							// found.'],success,'Stocktake Display');//no need
							// to display message
						}
					} else if (depTabIndex == 1) {// Other department
						$("#displaySTByStatusMyDep").html('');
						$tblhold = $("#displaySTByStatusAllDep");
						if (rtnMapDisplayST['OTHER_DEPT'] != undefined
								&& rtnMapDisplayST['OTHER_DEPT'].length > 0) {
							loadGetSTByStatusTbl(rtnMapDisplayST['OTHER_DEPT'],
									$tblhold, displayStatus);
						} else {
							// $.fn.showCustomMsg(['Sorry, No records
							// found.'],success,'Stocktake Display');//no need
							// to display message
						}
					}
				}
			});
	//$('#datePick').multiDatesPicker('destroy');
	// Date
	$(".inputDate").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50

	});
	
	 $('#datePick').multiDatesPicker({
		 altField: '#datePick-input'
	 });
	 
	 
	 $('#editSTdateselect').multiDatesPicker({
		 altField: '#datePickEdit-input'
		// addDates: [new Date('2017-02-02'),new Date('2017-03-02')]
	 });
	// $('#datePick').multiDatesPicker('resetDates');
	/* Code for hierarchy */

	$("input[name='departmentList'], .deptText").click(function() {
		$("#catDiv").find(".noSelection").addClass('hideBlock');
		$("#catDiv").find("ul").removeClass('hideBlock');
		$("#catDiv").find(".totalCount").removeClass('hideBlock');

		$("#subCatDiv").find(".noSelection").removeClass('hideBlock');
		$("#subCatDiv").find("ul").addClass('hideBlock');
		$("#subCatDiv").find(".totalCount").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").addClass('hideBlock');

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');

	});

	$("input[name='categoryList'], .catText").click(function() {
		$("#subCatDiv").find(".noSelection").addClass('hideBlock');
		$("#subCatDiv").find("ul").removeClass('hideBlock');
		$("#subCatDiv").find(".totalCount").removeClass('hideBlock');
		// $("#subCatDiv").find(".heirachyAction").addClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeOut(300);

		$("#segDiv").find(".noSelection").removeClass('hideBlock');
		$("#segDiv").find("ul").addClass('hideBlock');
		$("#segDiv").find(".totalCount").addClass('hideBlock');
	});

	$("input[name='subCatList'], .subText").click(function() {
		// $("#subCatDiv").find(".heirachyAction").removeClass('hideBlock');
		$("#subCatDiv").find(".heirachyAction").fadeIn(400);

		$("#segDiv").find(".noSelection").addClass('hideBlock');
		$("#segDiv").find("ul").removeClass('hideBlock');
		$("#segDiv").find(".totalCount").removeClass('hideBlock');
	});

	$("input[name='segmentList'], .segText").click(function() {

	});

	// checks radio buttons for location and include
	$('#multiple').click(function() {
		$(".articleHierarchy").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleList").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
	});

	$('#single').click(function() {
		$(".articleList").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
	});

	$('#plano').click(function() {
		$(".planoLoc").removeClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".articleList").addClass('hideBlock');
		$(".otherLoc").addClass('hideBlock');
	});

	$('#nonplano').click(function() {
		$(".otherLoc").removeClass('hideBlock');
		$(".planoLoc").addClass('hideBlock');
		$(".articleHierarchy").addClass('hideBlock');
		$(".articleList").addClass('hideBlock');
	});

	// Checkbox DropDown functions
	$(
			".selectDropdownActions .actionBtn, .selectDropdownActions .secondaryActionBtn")
			.click(function() {
				$(".selectDropdown").removeClass('active');
			});

	$('html').click(function() {
		$(".selectDropdown").removeClass('active');
	});

	$('.selectDropdown').click(function(event) {
		event.stopPropagation();
	});

	$(document)
			.keypress(
					function(event) {
						event.stopPropagation();
						if (event.which == 13) {// Enter key
							if ($("#searchBoxInclude").val().split('-')[0].length > 0) {
								callArticleBasicSearchService(
										$("#searchBoxInclude").val().split('-')[0],
										"CREATE");
								$(".ui-autocomplete").children().remove();// To hide
																	// the list
																	// of
																	// suggestions
																	// displayed
								$(".ui-autocomplete").css("display", "none");// To
																		// hide
																		// the
																		// list
																		// of
																		// suggestions
																		// displayed
								return false;

							} else if ($("#searchBoxIncludeEdit").val().split(
									'-')[0].length > 0) {
								if ($("#searchBoxIncludeEdit").val().split('-')[0].length > 0) {
									callArticleBasicSearchService($(
											"#searchBoxIncludeEdit").val()
											.split('-')[0], "EDIT");
									$(".ui-autocomplete").children().remove();// To
																		// hide
																		// the
																		// list
																		// of
																		// suggestions
																		// displayed
									$(".ui-autocomplete").css("display", "none");// To
																			// hide
																			// the
																			// list
																			// of
																			// suggestions
																			// displayed
									return false;
								}
							}
						}
					});

	$("#backBtn").click(function(e) {
		filterApplyClicked = false;
		editBreadcrumbWrapper();
		if ($("#stocktakeReportsDiv").hasClass("hideBlock")) {
			window.location.href = "../login/homepage.htm";
		} else if ($("#stocktakeDiv").hasClass("hideBlock")) {
			onRecordSelect = false;
			isNationalStocktake = false;
			$("#stocktakeDiv").removeClass("hideBlock");
			$("#stocktakeReportsDiv").addClass("hideBlock");
		}
	});
	// Chnage stoktake mode
	$("#applySTChanges").click(function() {
		callChangeSTModeService();
	});

	$("#loadStockTake").click(function() {
		//callServiceForSTCountDetails();
		loadStockTakeFirstPage();
	});

	$('#saveLocationBtn').unbind('click');

	$('#saveLocationBtn').click(function() {
		callSTUpdateLocations();
	});
	
	$('#saveQuickLoc').unbind('click');

	$('#saveQuickLoc').click(function() {
		callSTUpdateQuickLocations();
	});

	$('#cancelQuickLoc').unbind('click');

	$('#cancelQuickLoc').click(function() {
		$('#dialog-quickActionDialog').dialog("close");
	});
	getEncSAPPassword();
	if ($("#roleId").val() == "TM") {
		$("#createSTTab").addClass("hideBlock");// Defect_3393
		$("#STModeTab").addClass("hideBlock");// Defect_3395
		$("#teamPerformanceTab").addClass("hideBlock");// Defect_3388
		$("#userPerformanceTab").addClass("hideBlock");// Defect_3388
		$("#stockValuationTab").addClass("hideBlock");// Defect_3388
	}

	$("#weeksCreateST").onlyNumbers();
	$("#weeksEditST").onlyNumbers();

	$("#STModeTab").click(function() {
		var reqParam = {};
		console.log(stockTakeModeUrl + ' ' + JSON.stringify(reqParam));
		$.ajax({
			type : "POST",
			url : stockTakeModeUrl,
			data : JSON.stringify(reqParam),
			beforeSend : function() {
				startLoading();
			}
		}).done(function(response) {
			// console.log(JSON.stringify(response));
			stockTakeMode = response[0].stocktake_mode;
			if (stockTakeMode == "T") {
				$("#stocktakeModeRadio").find("#PN").attr('checked', true);
			} else {
				$("#stocktakeModeRadio").find("#PL").attr('checked', true);
			}
			stopLoading();// this should be present to stop loading once
							// reasons are populated for edit
		}).fail(function() {
			stopLoading();// this should be present to stop loading once
							// reasons are populated for edit
		}).always(function() {
			// stopLoading();
		});
	});

});

$(window).load(function(e) {
	$("#loadStockTake").trigger('click');
});
function callServiceForSTCountDetails() {
	var requestParam = {};
	console.log(getSTCountUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : getSTCountUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				// console.log(JSON.stringify(response));
				if (response != undefined && response[0].msg_type == "S") {
					$("#overdueTabId").html(
							'<label></label>Overdue ('
									+ response[0].overdue + ')');
					$("#duenowTabId").html(
							"Due Now (" + response[0].duenow + ")");
					$("#upcomingTabId").html(
							"Upcoming (" + response[0].upcoming + ")");
					$("#completedTabId").html(
							"Completed (" + response[0].completed + ")");
					$("#deletedTabId").html(
							"Deleted (" + response[0].deleted + ")");
				}
			}).fail(function() {
	}).always(function() {
	});
}
function bindArticleHierarchyEventForCreateST() {
	// Code to show and hide article heirarchy
	$('#createSTArticleH').click(function() {
		if ($(this).is(':checked')) {
			$("#createSTArticleHierarchyId").removeClass('hideBlock');
		} else {
			$("#createSTArticleHierarchyId").addClass('hideBlock');
		}
	});
}
function bindArticleHierarchyEventForEditST() {
	// Code to show and hide article heirarchy
	$('#editSTArticleH').click(function() {
		if ($(this).is(':checked')) {
			$("#editSTArticleHierarchyId").removeClass('hideBlock');
		} else {
			$("#editSTArticleHierarchyId").addClass('hideBlock');
		}
	});
}
function loadStockTakeFirstPage() {
	$("#displaySTByStatusMyDep").empty();
	$tblhold = $("#displaySTByStatusMyDep");
	tabStockTakeStatus = "overdue";
	callDisplaySTService(tabStockTakeStatus);
}
/**
 * Binds all the events for Create Stocktake page.
 */
function bindCreateStockTakeEvents() {
	populateStockTakeFrequency("freqSelectOptions");

	populateDeptDropDown("createSTDeptDrpDwnUl", "createSTDeptDrpDwnDone",
			"createSTDeptDrpDwnCancel", "createSTDeptDrpDwnDiv",
			"createSTallDeptChkBox", "createSTDeptDrpDwnLabel");

	createSTAutoSuggest($('#searchBoxInclude'), '', '', 'parameterListInclude');

	createSTAutoSuggest($('#searchBoxExclude'), '', '', 'parameterListExclude');

	bindDropDownClick("createSTDeptDrpDwnDiv", "createSTDeptDrpDwnActiveId");
	bindArticleHierarchyEventForCreateST();
	// for article hierarchy
	bindSelectAllArticleEvents($("#createSTArticleHierarchyId"));

	$("#CreateStockTake").click(function() {
		var requestParam = buildReqParamCreateST();
		if (requestParam != '' && validateCreateStockTake()) {
			callCreateSTService(requestParam);
		}
	});
	
	$('#dateFromCreate').change(function(e)// Defect_3358
		{
		if ($('#freqSelectOptions').val() == "05") {
		$('#enddateCreate').val($('#dateFromCreate').val());
		$("#enddateCreate").datepicker('disable');	
		}
		});

	$('#freqSelectOptions').change(function(e)// Defect_3358
	{
		//$('#datePick').multiDatesPicker('destroy');
		// Date
		$(".inputDate").datepicker({
			dateFormat : "dd/mm/yy",
			zIndex : 50
		});		
		 /*$('#datePick').multiDatesPicker({
			 altField: '#datePick-input'
		 });
		 $('#editSTdateselect').multiDatesPicker({
			 altField: '#datePickEdit-input'
			// addDates: [new Date('2017-02-02'),new Date('2017-03-02')]
		 });*/
		 $('#datePick').multiDatesPicker('resetDates');
		 //$('#datePick').find(".ui-state-highlight").removeClass("ui-state-active");
		$("#weeksCreateST").val('');
		if ($('#freqSelectOptions').val() == "0") {// Only for Every X number
													// of weeks
			$("#weeksCreateST").removeClass("hideBlock");
			$("#weeksCreateSTLbl").removeClass("hideBlock");
			$("#weeksCreateST").focus();
		} else {
			$("#weeksCreateST").addClass("hideBlock");
			$("#weeksCreateSTLbl").addClass("hideBlock");
		}
		
		if ($('#freqSelectOptions').val() == "05") {// Only for Every X number
			// of weeks
			$('#enddateCreate').val($('#dateFromCreate').val());
			$("#enddateCreate").datepicker('disable');					
        } else {
        	$("#enddateCreate").datepicker('enable');	
       }

		if ($('#freqSelectOptions').val() == "99" || $('#freqSelectOptions').val() == "20" ) {
			$("#datePick").removeClass("hideBlock");
			//$("#datePick").focus();			
		} else {
			//$('#datePick').multiDatesPicker('destroy');
			$("#datePick").addClass("hideBlock");
		}
	});

	isCreateStocktakePopulated = true;
}
var triggerSelectAllYes = function(e) {
	var $elem = e.data.msg;
	$elem.dialog('close');
};

var triggerSelectAllNo = function(e) {
	$('#createSTallDeptChkBox').trigger('click');
	var $elem = e.data.msg;
	$elem.dialog('close');
};
function confirmationDelete(msg, id) {
	try {
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
		$("#dialog-confirmation").find('#ok').addClass("hideBlock");
		$("#dialog-confirmation").find('#cancel').addClass('hideBlock');
		$("#dialog-confirmation").parent().addClass("popupWrapper");
		$("#dialog-confirmation").dialog("open");
		$("#dialog-confirmation").find('#message').html(msg);
		$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
				'Confirmation');
		$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');
		$("#dialog-confirmation").find('.confirmation-yesbtn').click(
				function() {
					$("#dialog-confirmation").dialog("close");
					var requestParam = buildReqParamCreateST();
					if (requestParam != '') {
						callCreateSTService(requestParam);
					}

				});
		$("#dialog-confirmation").find('.confirmation-nobtn').removeClass(
				'hideBlock');
		$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');
		$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
			$("#dialog-confirmation").dialog("close");
		});
	} catch (err) {
		confirmationDelete(msg, id);
	}
}
/**
 * Binds all the events for Edit Stocktake page.
 */
function bindEditStockTakeEvents() {
	// /Edit stocktake -BEGINS
	populateEditSTDropDownDetails();
	bindDropDownClick("editSTDeptDrpDwnDiv", "editSTDeptDrpDwnActiveId");
	bindArticleHierarchyEventForEditST();
	bindSelectAllArticleEvents($("#editSTArticleHierarchyId"));
	// For override reason check box
	$('#overrrideSTChkBox')
			.click(
					function() {
						if ($(this).is(":checked")) {
							var warningMsg = "Are you sure you want to Override this stocktake?";// defect no 6990
							$.fn.warnPopup('warn', warningMsg, 'Confirmation',
									triggerOverrideYes, triggerOverrideNo, '',
									$(this));
						}

					});
	$('#editReasonSelectBox').change(function() {
		if ($("#editReasonSelectBox").val() == "Other") {
			$("#overrideReasonOtherTxt").removeAttr("disabled");// enable the
																// reason text
																// box
			$("#overrideReasonOtherTxt").focus();
		} else {
			$("#overrideReasonOtherTxt").prop("disabled", true);// disbale the
																// reason text
			$("#overrideReasonOtherTxt").val('');			// defect no 7005										// box
		}

	});
	$("#editStockTake").unbind('click');
	$("#editStockTake")
			.on(
					'click',
					function() {
						if ($("#delSTChkBox").is(':checked')
								&& !$('#editStockTake').hasClass('open')) {
							if (editSTStatus == 'OPEN') {
								var delSTMsg = "This Stocktake has active counts. Are you sure you want to delete?";
								$.fn.warnPopup('warn', delSTMsg,
										'Stocktake - Delete', triggerDelSTYes,
										triggerDelSTNo, '', {
											button : $(this),
											status : 'O'
										});
							} else {
								var delSTMsg = "Are you sure you want to delete Stocktake "
										+ $("#editStockTakeName").val().trim()
										+ " ?";
								$.fn.warnPopup('warn', delSTMsg,
										'Stocktake - Delete', triggerDelSTYes,
										triggerDelSTNo, '', {
											button : $(this),
											status : 'D'
										});
							}
						} else if (/* $('#editStockTake').hasClass('open') && */
						(($("#overrrideSTChkBox").is(':checked')) && $(
								'#editReasonSelectBox').val().trim() == 'Select a reason')) {
							$.fn.showCustomMsg(
									[ '"Please Select Override reason"' ],
									error, 'Create Stocktake');
						} else if (/* $('#editStockTake').hasClass('open') && */
						$("#overrrideSTChkBox").is(':checked')
								&& $('#editReasonSelectBox').val().trim() == 'Other'
								&& $('#overrideReasonOtherTxt').val().trim() == '') {
							$.fn.showCustomMsg([ '"Please Enter the Reason"' ],
									error, 'Create Stocktake');

						} else {
							frameSTEditReqParam();
						}
					});
	$("#editCancelStockTake").click(function() {
		$("#dialog-hierarchy").dialog("close");
	});
	
	$('#dateFromEdit').change(function(e)// Defect_3358
			{
			if ($('#editFreqSelectOptions').val() == "05") {
			$('#enddateEdit').val($('#dateFromEdit').val());
			$("#enddateEdit").datepicker('disable');	
			}
			});

	$('#editFreqSelectOptions').change(function(e)// Defect_3467
	{
		$("#weeksEditST").val('');
		if ($('#editFreqSelectOptions').val() == "0") {// Only for Every X
														// number of weeks
			$("#weeksEditST").removeClass("hideBlock");
			$("#weeksEditSTLbl").removeClass("hideBlock");
			$("#weeksEditST").focus();
		} else {
			$("#weeksEditST").addClass("hideBlock");
			$("#weeksEditSTLbl").addClass("hideBlock");
		}

		if ($('#editFreqSelectOptions').val() == "05") {// Only for Every X number
			// of weeks
			$('#enddateEdit').val($('#dateFromEdit').val());
			$("#enddateEdit").datepicker('disable');			
        } else {
        	$("#enddateEdit").datepicker('enable');	
       }		
		if ($('#editFreqSelectOptions').val() == "99") {
			selectedDatesForEdit;
			var dateArrayEdit=[];
			for(var i=0;i<selectedDatesForEdit.length;i++){
				dateArrayEdit.push(new Date(selectedDatesForEdit[i]));	
			}
			if(dateArrayEdit.length>=1){				
				$('#editSTdateselect').multiDatesPicker('addDates',dateArrayEdit);
			
			}
			$("#editSTdateselect").removeClass("hideBlock");
			//$("#editSTdateselect").focus();
		} else {	
			$("#editSTdateselect").addClass("hideBlock");
		}
	});
	// Edit stocktake -ENDS
	isEditStocktakePopulated = true;
}

var openDeleteMode = function() {
	$(
			'#dialog-hierarchy #overrrideSTChkBox,#dialog-hierarchy [for="overrrideSTChkBox"],#dialog-hierarchy .AC_STD')
			.removeClass('hideBlock');
	$('#dialog-hierarchy #editStockTake').removeClass('open');
	$('#dialog-hierarchy').parent().css('width', '980px').find(
			'#editReasonSelectBox').prop('disabled', true).css('margin-left',
			'0px').val('');
};
var openDeleteOverrideMode = function() {
	$(
			'#dialog-hierarchy #overrrideSTChkBox,#dialog-hierarchy [for="overrrideSTChkBox"],#dialog-hierarchy .AC_STD')
			.addClass('hideBlock');
	$('#dialog-hierarchy #editStockTake').addClass('open');
	$('#dialog-hierarchy').parent().css('width', '600px').find(
			'#editReasonSelectBox').prop('disabled', false).css('margin-left',
			'70px').val('');
};

var triggerDelSTYes = function(e) {
	var $elem = e.data.msg;
	var $cache = e.data.cache;
	if ($cache.status == 'O') {// if in open status,get reason for it
		$('#dialog-hierarchy').find('#editSTArticleHierarchyId').addClass('hideBlock');				// Hided for reason page
		$('#overrrideSTChkBox').prop('checked',true);
		openDeleteOverrideMode();
	} else {
		frameSTEditReqParam();
	}
	$elem.dialog('close');
};
function frameSTEditReqParam() {
	var requestParam = buildReqParamEditST();
	if (requestParam != '') {
		if(requestParam.iv_item_info.length != 0){
			callEditSTService(requestParam);
		}else{
			$("#dialog-hierarchy").dialog("close");
		}
	}
}
var triggerDelSTNo = function(e) {
	var $elem = e.data.msg;
	$elem.dialog('close');
	var $cache = e.data.cache;
	if ($cache.status == 'O') {
		openDeleteMode();
	} else {
		$("#dialog-hierarchy").dialog("close");
	}

};
function populateReasons(selectOptionId) {
	var content = '';
	var param = {};
	$('#' + selectOptionId).html('').append('<option>Select a reason</option>');
	console.log(listStockTakeOverrideReasonsUrl + ' ' + JSON.stringify(param));
	$.post(listStockTakeOverrideReasonsUrl, JSON.stringify(param), function() {
		startLoading();
	}).done(
			function(response) {
				for ( var i = 0; i < response.length; i++) {
					content += '<option class="freValues" value="'
							+ response[i].override_reason + '">'
							+ response[i].override_reason + '</option>';
				}
				$('#' + selectOptionId).append(content);
				stopLoading();// this should be present to stop loading once
								// reasons are populated for edit
			}).fail(function() {
		stopLoading();// this should be present to stop loading once reasons
						// are populated for edit
	}).always(function() {
		// stopLoading();
	});
}

function populateEditSTDropDownDetails() {
	populateStockTakeFrequency("editFreqSelectOptions");

	populateDeptDropDown("editSTDeptDrpDwnUl", "editSTDeptDrpDwnDone",
			"editSTDeptDrpDwnCancel", "editSTDeptDrpDwnDiv",
			"editSTallDeptChkBox", "editSTDeptDrpDwnLabel");

	createSTAutoSuggest($('#searchBoxIncludeEdit'), '', '',
			'parameterListIncludeEdit');

	populateReasons("editReasonSelectBox");
}

/**
 * Auto suggestion for article input box in Create Stocktake page
 * 
 * @param elem
 * @param elemToBeTriggered
 * @param maxAutoListSize
 */
function createSTAutoSuggest(elem, elemToBeTriggered, maxAutoListSize,
		parameterListId) {
	// code for article auto suggest in the text box
	var maxAutoListSize = 10;
	var param = {};
	$(elem)
			.autocomplete(
					{
						delay : 0,
						source : function(request, response) {
							param = {
								iv_article : request.term,
								iv_auto_stockR : 'N',
								iv_ranged : 'Y',
								iv_session_id : '',
								iv_auto_stockr_flag : ''
							};
							//changed search length 2 as 3 for better performance
							if (request.term.length == 3) {
								// console.log(getarticleguggestions + ' '
								// + JSON.stringify(param));
								// $.ajaxSetup({async: false});
								$
										.post(
												getarticleguggestions,
												JSON.stringify(param),
												function(data) {
													if (data != '') {
														suggestionList = data;
														response($
																.map(
																		data
																				.slice(
																						0,
																						maxAutoListSize),
																		function(
																				item) {
																			if(item.article_no != undefined || item.article_no !=undefined && item.article_desc != undefined){
																			return {
																				value : item.article_no
																						+ '-'
																						+ item.article_desc,
																				text : item.article_no
																						+ '-'
																						+ item.article_desc
																			};}
																		}));
													}
												});
							} else {
								setTimeout(
										function() {
											if (suggestionList != null
													&& suggestionList != undefined
													&& suggestionList.length > 0) {
												response(sliceFilteredList(
														request,
														suggestionList,
														maxAutoListSize));
											}
										}, 50);
							}
						},
						select : function(event, ui) {
							if ($("#" + parameterListId)
									.find(
											"#"
													+ ui.item.text.toString()
															.split('-')[0]).length > 0) {
								$.fn.showCustomMsg(
										[ 'Article added already.' ], error,
										'Stocktake');
							} else {
								/*if(ui.item.value
										.toString()
										.split('-')[2] != 'Y'){
									 $.fn.showCustomMsg(['Non PI articles are not allowed to create stocktake'],error,'Create Stocktake');
								}else{
										$("#" + parameterListId)
												.append(
														'<li><label class="articleBasicLabel" id="'
																+ ui.item.text
																		.toString()
																		.split('-')[0]
																+ '">'
																+ ui.item.text
																		.toString()
																+ '</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>');
								}*/
								$(event.target).val(ui.item.text
										.toString());
								var e = $.Event( "keypress", { which: 13 } );
								$(event.target).trigger(e);
									//elem.val('');
									//$(this).val("");
									return false;
		
									$(':hidden[id=hdnmedicineid]').val(
											ui.item.text.toString());
									$(':hidden[id=hdnmedicinenm]').val(
											ui.item.value.toString());
									if (elemToBeTriggered != undefined) {
										setTimeout(function() {
											$(elemToBeTriggered).trigger('click');
										}, 10);
									}
								}
						},
						minLength : 2,
						autoFocus : true
					});
}

/**
 * Populate frequency drop down in Create Stocktake page.
 */
function populateStockTakeFrequency(selectOptionId) {
	var content = '';
	var onlineStMap = [];
	var editOnlineFlg = false ;
	$("#" + selectOptionId).html('');
	$('#' + selectOptionId).append(
			'<option value="">Select a frequency</option>');

	var requestParam = {
		"iv_sales_org" : $("#salesOrg").val()
	};
	console.log(getSTFreqUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : getSTFreqUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				// console.log(JSON.stringify(response));
				if (response != undefined && response.length > 0
						&& response[0].freq_code != undefined) {
					var temList = response;
					for ( var i = 0; i < temList.length; i++) {
						content += '<option class="freValues" value="'
								+ temList[i].freq_code + '">'
								+ temList[i].freq_name + '</option>';
						if($.isNumeric(temList[i].freq_code)){
							onlineStMap.push(temList[i].freq_code);
						}
					}
					$('#' + selectOptionId).append(content);
					if (selectOptionId == 'editFreqSelectOptions') {
						$('#' + selectOptionId).val(editSTFreq);
						for(var i =0; i<onlineStMap.length;i++){
							if(editSTFreq == onlineStMap[i]){
								editOnlineFlg = true;
							}
						}
						if(editOnlineFlg){
							$('#editFreqSelectOptions option:eq(0)').addClass('hideBlock');		// remove the select option
							$("#editFreqSelectOptions option[value='A']").addClass('hideBlock');	// removed the just once 
						}
					}
				}
			}).fail(function() {

	}).always(function() {
		// stopLoading();
	});
}
/**
 * Enables/Disables Exclude article search box based on department selection
 */
function enableDisableExcludeArticles() {
	var depExists = false;
	// Dep drop down
	if (!$("#createSTArticleH").is(':checked')
			&& $('.depDrpDwnChkBx:checked').length > 0) { // Enable Exclude
															// article search
															// box only if
															// department is
															// selected.
		depExists = true;
	}
	// Dept box in article hierarchy
	if ($("#createSTArticleH").is(':checked')
			&& $("[name='departmentList']:checked").length > 0) {
		depExists = true;
	}
	if ($('#createSTallDeptChkBox').is(':checked')) {// Dep select all
														// checkbox
		depExists = true;
	}
	if (depExists) {
		$("#searchBoxExclude").removeAttr('disabled');
	} else {
		$("#searchBoxExclude").prop("disabled", "true");
	}
}
/**
 * Builds and returns the request parameters for create stocktake
 * 
 * @returns {String}
 */
function buildReqParamCreateST() {

	var requestParam = '';
	var userId = $("#loginUserId").val();
	var userName = $('#fullName').val();
	var stockTakeName = $("#stockTakeName").val().trim();
	var startDate = $("#dateFromCreate").val();
	var endDate = $("#enddateCreate").val();
	var freq = $("#freqSelectOptions").val();
	var weeks = $("#weeksCreateST").val();
	if ($('#freqSelectOptions').val() == "99" ) {
		iv_fis_date = $("#datePick-input").val();
	}else{
		iv_fis_date='';
	}	
	var isSelArtHir = $("#createSTArticleH").is(':checked');
	var isUniqueSelected = ($("#parameterListInclude").find(".articleBasicLabel").length > 0 ? true : false);
	var itemInfo = [];
	var deptLen = 0;
	var incArtLen = 0;
	var excArtLen = 0;
	iv_fis_date = iv_fis_date.split(' ').join('');
	if (isSelArtHir) {
		itemInfo = frameDeptItemInfoCreate(startDate, endDate, freq, weeks, userId,
				itemInfo, $('#tabs-5'),isUniqueSelected);
		deptLen = itemInfo.length;
		$("#parameterListInclude").find(".articleBasicLabel").each( // if only articles is slected.
				function() {
					itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
							weeks, '', '', '', '', $(this).text().split('-')[0],
							userId, '','2'));
		});
		incArtLen = itemInfo.length - deptLen;
		
	} else { //when selected is selected from the dept dropdown menu
		if($('#createSTDeptDrpDwnUl').find("input[type=checkbox]:checked").length != 0){
				$('#createSTDeptDrpDwnUl').find("input[type=checkbox]:checked").each(
						function() {
							if ($(this).attr('id') != 'createSTallDeptChkBox') { // this is to chk if all the depts hav been selected and also add each dept to itemInfo
								itemInfo.push(new StockTakeItemInfo(startDate, endDate,
										freq, weeks, $(this).val(), '', '', '', '',
										userId, $(this).text().split('-')[0],(isUniqueSelected ? '2': '')));
							}
						});
			deptLen = itemInfo.length;
		
			$("#parameterListInclude").find(".articleBasicLabel").each( // if only articles is slected.
					function() {
						itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
								weeks, '', '', '', '', $(this).text().split('-')[0],
								userId, '','2'));
					});
			incArtLen = itemInfo.length - deptLen;
		}
		else{
			$("#parameterListInclude").find(".articleBasicLabel").each( // if only articles is slected.
					function() {
						itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
								weeks, '', '', '', '', $(this).text().split('-')[0],
								userId, '','2'));
					});
			incArtLen = itemInfo.length - deptLen;
		}
		$("#parameterListExclude").find(".articleBasicLabel").each(
				function() {
					itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
							weeks, '', '', '', '', '', userId, $(this).text()
									.split('-')[0],'2'));
				});
		excArtLen = itemInfo.length - incArtLen;
	}
	//itemInfo=checkIfDeptSelected(itemInfo);
	// Validations
	// Include articles (or) department is mandatory
	if ((incArtLen <= 0) && (deptLen <= 0)) {
		isValid = false;
		$.fn.showCustomMsg([ 'Department or Include Articles is mandatory.' ],
				error, 'Create Stocktake');
	}// If exclude article selected, department selection is also mandatory
		// and vice versa
	else if (deptLen <= 0 && excArtLen.length > 0) {
		$.fn.showCustomMsg([ 'Please select department(s).' ], error,
				'Create Stocktake');
	} else {
		requestParam = new StockTakeHdrInfo(siteVal, userId, 'I',
				stockTakeName, itemInfo, "","",iv_fis_date,'','','',userName);
	}

	return requestParam;
}
/*function checkIfDeptSelected(itemInfo){
	//console.log(itemInfo);
	var deptSelFlag=false;
	var itemInfoCopy =[];
	itemInfo.forEach(function(key) {
	    console.log(key.iv_dept_id);
	    if(key.iv_dept_id && !key.iv_cat_id && !key.iv_sub_cat_id && !key.iv_seg_id){
	    	deptSelFlag=true;
	    	}
	});
	if(deptSelFlag){
		itemInfo.forEach(function(key) {
			itemInfoCopy.push(new StockTakeItemInfo(key.iv_start_dt,
					key.iv_end_dt, key.iv_freq_cd, key.iv_weeks,
					key.iv_dept_id, key.iv_cat_id, key.iv_sub_cat_id,
					key.iv_seg_id, key.iv_article_lst, key.iv_userid,
					key.iv_excl_article_lst, ""));
	});
	}
	return itemInfoCopy;
}*/
function StockTakeItemInfo(iv_start_dt, iv_end_dt, iv_freq_cd, iv_weeks,
		iv_dept_id, iv_cat_id, iv_sub_cat_id, iv_seg_id, iv_article_lst,
		iv_userid, iv_excl_article_lst,iv_st_type,iv_action_flag) {

	this.iv_start_dt = formatDateMobiDelimiter(iv_start_dt, '-');
	this.iv_end_dt = formatDateMobiDelimiter(iv_end_dt, '-');
	if (iv_freq_cd == "00") {// Weekly - Defect_3878
		iv_weeks = "01";
	} else if (iv_freq_cd == "98" && !overrideFlagEdit) {// Just once -
															// Defect_3878
		iv_freq_cd = null;
		iv_weeks = null;
	}
	
	
	this.iv_freq_cd = iv_freq_cd;
	this.iv_weeks = iv_weeks;
	this.iv_dept_id = iv_dept_id;
	this.iv_cat_id = iv_cat_id;
	this.iv_sub_cat_id = iv_sub_cat_id;
	this.iv_seg_id = iv_seg_id;
	this.iv_article_lst = iv_article_lst;
	this.iv_userid = iv_userid;
	this.iv_excl_article_lst = iv_excl_article_lst;
	this.iv_st_type = iv_st_type;//'' (only dept) or 1 (article hierarchy no dept) or 2(articles)
	this.iv_action_flag = iv_action_flag;
}

function StockTakeHdrInfo(iv_site_no, iv_user_id, iv_action_flag, iv_st_nm,
		iv_item_info, iv_st_ovrd_rsn,iv_st_id,iv_fis_date,iv_seq_no,iv_count_date,iv_remove_all,iv_usr_nm) {
	this.iv_site_no = iv_site_no;
	this.iv_user_id = iv_user_id;
	this.iv_action_flag = iv_action_flag;
	this.iv_st_nm = iv_st_nm;
	this.iv_pwd = encSapPwd;
	this.iv_item_info = iv_item_info;
	this.iv_st_ovrd_rsn = iv_st_ovrd_rsn;
	this.iv_st_id = iv_st_id;
	this.iv_fis_date = iv_fis_date;
	this.iv_seq_no=iv_seq_no;
	this.iv_count_date = iv_count_date;
	this.iv_remove_all = (iv_remove_all||'N');
	this.iv_usr_nm = iv_usr_nm;

}

function getSelectedDataFrmScrn(startDate, endDate, freq, weeks, userId, itemInfo,
		area,insertMap,isUniqueSelectedEdit) {
	var itemActionFlag = "I";
	var deptFlag = false;
	var newRecords = {};
	var insertedList = [];
	var existFlag = true;
	var obj = {};
	area
			.find("input[name='departmentList']:checked")
			.each(
					function() {
						var dept = '';
						var cat = '';
						var subCat = '';
						dept = $(this).val();
						existFlag = $(this).hasClass('prepopulated');
						var $cat = area.find('#catg-' + dept);
						//if(deptFlag==false){
						if ($cat != undefined && $cat.length > 0) {
							var $checkedCat = $cat
									.find('input[name="category"]:checked');
							if ($checkedCat != null && $checkedCat.length > 0) {
								$checkedCat
										.each(function() {
											cat = $(this).val();
											existFlag = $(this).hasClass('prepopulated');
											var $subCat = area.find('#scatg-'
													+ cat);
											if ($subCat != undefined
													&& $subCat.length > 0) {
												var $checkedSubCat = $subCat
														.find('input[name="subCat"]:checked');
												if ($checkedSubCat != null
														&& $checkedSubCat.length > 0) {
													$checkedSubCat
															.each(function() {
																subCat = $(this)
																		.val();
																existFlag = $(this).hasClass('prepopulated');
																var $seg = area
																		.find('#seg-'
																				+ subCat);
																if ($seg != undefined
																		&& $seg.length > 0) {
																	var $checkedSeg = $seg
																			.find('input[name="segmentList"]:checked');
																	if ($checkedSeg != null
																			&& $checkedSeg.length > 0) {
																		$checkedSeg
																				.each(function() {
																					seg = $(
																							this)
																							.val();
																					existFlag = $(this).hasClass('prepopulated');
																					/*if(insertMap && insertMap.length != 0){
																					if(insertMap.get($(this).val()) != undefined){
																						itemActionFlag = "I";	
																					}else{
																						itemActionFlag = "D";
																					}}*/
																					if(!existFlag){
																						obj = (new StockTakeItemInfo(
																								startDate,
																								endDate,
																								freq,
																								weeks,
																								dept,
																								cat,
																								subCat,
																								seg,
																								'',
																								userId,
																								'',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag))
																						newRecords[dept+'-'+cat+'-'+subCat+'-'+seg]
																								 = obj;
																						insertedList.push(obj);
																					}
																				});
																	} else {
																		/*if(insertMap && insertMap.length != 0){
																		if(insertMap.get($(this).val()) != undefined){
																			itemActionFlag = "I";	
																		}else{
																			itemActionFlag = "D";
																		}}*/
																		if(!existFlag){
																			obj	= (new StockTakeItemInfo(
																					startDate,
																					endDate,
																					freq,
																					weeks,
																					dept,
																					cat,
																					subCat,
																					'',
																					'',
																					userId,
																					'',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag));
																			newRecords[dept+'-'+cat+'-'+subCat]= obj;
																			insertedList.push(obj);
																		}
																	}
																} else {
																	/*if(insertMap && insertMap.length != 0){
																	if(insertMap.get($(this).val()) != undefined){
																		itemActionFlag = "I";	
																	}else{
																		itemActionFlag = "D";
																	}}*/
																	if(!existFlag){
																		obj = (new StockTakeItemInfo(
																						startDate,
																						endDate,
																						freq,
																						weeks,
																						dept,
																						cat,
																						subCat,
																						'',
																						'',
																						userId,
																						'',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag));
																		newRecords[dept+'-'+cat+'-'+subCat] =obj;
																		insertedList.push(obj);
																	}
																}
															});
												} else {
													/*if(insertMap && insertMap.length != 0){
													if(insertMap.get($(this).val()) != undefined){
														itemActionFlag = "I";	
													}else{
														itemActionFlag = "D";
													}}*/
													if(!existFlag){
														obj = (new StockTakeItemInfo(
																		startDate,
																		endDate,
																		freq,
																		weeks,
																		dept, cat,
																		'', '', '',
																		userId, '',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag));
														newRecords[dept+'-'+cat] = obj;
														insertedList.push(obj);
													}
												}
											} else {
												/*if(insertMap && insertMap.length != 0){
												if(insertMap.get($(this).val()) != undefined){
													itemActionFlag = "I";	
												}else{
													itemActionFlag = "D";
												}}*/
												deptFlag=true;
												if(!existFlag){
													obj
													 = (new StockTakeItemInfo(
																	startDate,
																	endDate, freq,
																	weeks, dept,
																	cat, '', '',
																	'', userId, '',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag));
													newRecords[dept+'-'+cat] = obj;
													insertedList.push(obj);
												}
											}
										});
							} else {
								/*if(insertMap && insertMap.length != 0){
								if(insertMap.get($(this).val()) != undefined){
									itemActionFlag = "I";	
								}else{
									itemActionFlag = "D";
								}}*/
								if(!existFlag){
								obj = (new StockTakeItemInfo(startDate,
										endDate, freq, weeks, dept, '', '', '',
										'', userId, '',(isUniqueSelectedEdit ? '2':(isHierCheckedHandleFlg?'1':'')),itemActionFlag));
								newRecords[dept] = obj;
								insertedList.push(obj);
								}
								deptFlag=true;
							}
						} else {
							/*if(insertMap && insertMap.length != 0){
							if( insertMap.get($(this).val()) != undefined){
								itemActionFlag = "I";	
							}else{
								itemActionFlag = "D";
							}}*/
							if(!existFlag){
							obj
							 =(new StockTakeItemInfo(startDate,
									endDate, freq, weeks, dept, '', '', '', '',
									userId, '',(isUniqueSelectedEdit ? '2':(isHierCheckedHandleFlg?'1':'')),itemActionFlag));
							newRecords[dept] = obj;
							insertedList.push(obj);
							}
							deptFlag=true;
						}
					//} 
						//else {
							/*if(insertMap && insertMap.length != 0){
							if(insertMap.get($(this).val()) != undefined){
								itemActionFlag = "I";	
							}else{
								itemActionFlag = "D";
							}}*/
							//if(!existFlag)
							//newRecords[dept]
							// =(new StockTakeItemInfo(startDate,
								//endDate, freq, weeks, dept, '', '', '', '',
								//userId, '','',itemActionFlag));
					//}
					});
	return insertedList;
}

function checkAllDeptSelected(area, startDate, endDate, freq, weeks, userId,isUniqueSelected){
	/*deptIdList = '';
	catIdList = '';
	subCatIDList =''; 
	segIdList = '';*/
	var isCatCheckedCreate = $('.parentCatDiv').find('input[name="category"]:checked').length >0 ? true : false;
	area.find("input[name='departmentList']:checked").each(function() {
		var deptId = $(this).val();	
		var $deptChk = area.find('#catg-' + deptId);	
		var $deptChkCate = $deptChk.find('input[name="category"]:checked');
		if(checkAllCatSelected(area, deptId, startDate, endDate, freq, weeks, userId,isUniqueSelected)){
			//deptIdList = deptIdList + ((deptIdList == '')?deptId:','+deptId);
			createStItemInfo.push(new StockTakeItemInfo(startDate,
					endDate,
					freq,
					weeks,
					deptId,
					'',
					'',
					'',
					'',
					userId,
					'',(isUniqueSelected ? '2':(isCatCheckedCreate ? '1': ''))));
		}else if ($deptChkCate.length == 0){												//added while unchk the category chk box
			createStItemInfo.push(new StockTakeItemInfo(startDate,	
					endDate,
					freq,
					weeks,
					deptId,
					'',
					'',
					'',
					'',
					userId,
					'',(isUniqueSelected ? '2':(isCatCheckedCreate ? '1': ''))));
		}
	});
}
function checkAllCatSelected(area, deptId, startDate, endDate, freq, weeks, userId,isUniqueSelected){
	var allSelected = true;	
	//var catIdListTemp = '';
	var catIdListTemp = [];
	var count = 0;
	var $cat = area.find('#catg-' + deptId);	
	var $checkedCat = $cat.find('input[name="category"]:checked');
	if($checkedCat.length == 0){
		allSelected = true;
	}else{
		$checkedCat.each(function() {
			var catId = $(this).val();
			if(!checkAllSubCatSelected(area, catId, deptId, startDate, endDate, freq, weeks, userId,isUniqueSelected)){	
				//subCatIDList = subCatIDList + ((subCatIDList == '')?getSelSubCatforCat(area, catId):','+getSelSubCatforCat(area, catId));
				var subCatListTemp = getSelSubCatforCat(area, catId,isUniqueSelected);
				if(subCatListTemp.length >0){
					for ( var i = 0; i < subCatListTemp.length; i++) {
						createStItemInfo.push(new StockTakeItemInfo(
								startDate,
								endDate,
								freq,
								weeks,
								deptId,
								catId,
								subCatListTemp[i],
								'',
								'',
								userId,
								'',(isUniqueSelected ? '2':'1')));
					}	
				}
				allSelected = false;
			}else{
				//catIdListTemp = catIdListTemp + ((catIdListTemp == '')?catId:','+catId);
				catIdListTemp.push(catId);
				count ++;
			}
		});
	}
	if(count != $cat.find('input[name="category"]').length){
		//catIdList = catIdList + ((catIdList == '')?catIdListTemp:','+catIdListTemp);
		if(count >0){
			for ( var i = 0; i < catIdListTemp.length; i++) {	
				createStItemInfo.push(new StockTakeItemInfo(
						startDate,
						endDate,
						freq,
						weeks,
						deptId,
						catIdListTemp[i],
						'',
						'',
						'',
						userId,
						'',(isUniqueSelected ? '2':'1')));
			}	
		}		
		allSelected = false;
	}
	return allSelected;
}
function checkAllSubCatSelected(area, catId, deptId, startDate, endDate, freq, weeks, userId,isUniqueSelected){
	var allSelected = true;
	//var subCatIdListTemp = '';
	var subCatIdListTemp = [];
	var count = 0;
	var $subCat = area.find('#scatg-'+ catId);	
	var $checkedSubCat = $subCat.find('input[name="subCat"]:checked');
	if($checkedSubCat.length == 0){
		allSelected = true;	
	}else{
	$checkedSubCat.each(function() {
		var subCatId = $(this).val();
		if(!checkAllSegSelected(area, subCatId,isUniqueSelected)){	
			//segIdList = segIdList + ((segIdList == '')?getSelSegforSubCat(area, subCatId):','+getSelSegforSubCat(area, subCatId));
			var temp = getSelSegforSubCat(area, subCatId,isUniqueSelected);
			if(temp.length >0){
				for ( var i = 0; i < temp.length; i++) {
					createStItemInfo.push(new StockTakeItemInfo(
							startDate,
							endDate,
							freq,
							weeks,
							deptId,
							catId,
							subCatId,
							temp[i],
							//this,
							'',
							userId,
							'',(isUniqueSelected ? '2':'1')));
				}
			}
			allSelected = false;
		}else{
			//subCatIdListTemp = subCatIdListTemp + ((subCatIdListTemp == '')?subCatId:','+subCatId);
			subCatIdListTemp.push(subCatId);			
			count++;
		}
	});
	}
	if(count != $subCat.find('input[name="subCat"]').length){
		//subCatIDList = subCatIDList + ((subCatIDList == '')?subCatIdListTemp:','+subCatIdListTemp);
		if(count >0){
			for ( var i = 0; i < subCatIdListTemp.length; i++) {			
				createStItemInfo.push(new StockTakeItemInfo(
						startDate,
						endDate,
						freq,
						weeks,
						deptId,
						catId,
						//this,
						subCatIdListTemp[i],
						'',
						'',
						userId,
						'',(isUniqueSelected ? '2':'1')));
			}	
		}
		allSelected = false;
	}
	return allSelected;
}
function checkAllSegSelected(area, subCatId){
	var $seg = area.find('#seg-'+ subCatId);		
	var $checkedSeg = $seg.find('input[name="segmentList"]:checked');
	if($checkedSeg.length == 0 || $checkedSeg.length == $seg.find('input[name="segmentList"]').length){
		return true;
	}else return false;
}
function getSelSubCatforCat(area, catId){
	//var subCatList ='';
	var subCatList =[];
	var $subCat = area.find('#scatg-'+ catId);
	var $checkedCat = $subCat.find('input[name="category"]:checked');	
	$checkedCat.each(function() {
		//subCatList = subCatList + ((subCatList == '')?$(this).val():','+$(this).val());
		subCatList.push($(this).val());
	});
	return subCatList;
}

function getSelSegforSubCat(area, subCatId){
	//var segIdList ='';
	var segIdList =[];
	var $seg = area.find('#seg-'+ subCatId);
	var $checkedSubCat = $seg.find('input[name="segmentList"]:checked');
	$checkedSubCat.each(function() {
		//segIdList = segIdList + ((segIdList == '')?$(this).val():','+$(this).val());
		segIdList.push($(this).val());
	});
	return segIdList;
}

function frameDeptItemInfoCreate(startDate, endDate, freq, weeks, userId, itemInfo,
		area,isUniqueSelected) {
	var deptFlag = false;	
	createStItemInfo = [];
	checkAllDeptSelected(area, startDate, endDate, freq, weeks, userId,isUniqueSelected);
	itemInfo = 	createStItemInfo;	
	/*itemInfo.push(new StockTakeItemInfo(
			startDate,
			endDate,
			freq,
			weeks,
			deptIdList,
			catIdList,
			subCatIDList,
			segIdList,
			'',
			userId,
			'','1'));*/
	/*area
			.find("input[name='departmentList']:checked")
			.each(
					function() {
						var dept = '';
						var cat = '';
						var subCat = '';
						dept = $(this).val();
						var $cat = area.find('#catg-' + dept);
						if($cat.length > 0){
							deptFlag = false;
						}
						if(deptFlag==false){
						if ($cat != undefined && $cat.length > 0) {
							var $checkedCat = $cat
									.find('input[name="category"]:checked');
							if ($checkedCat != null && $checkedCat.length > 0) {
								$checkedCat
										.each(function() {
											cat = $(this).val();
											var $subCat = area.find('#scatg-'
													+ cat);
											if ($subCat != undefined
													&& $subCat.length > 0) {
												var $checkedSubCat = $subCat
														.find('input[name="subCat"]:checked');
												if ($checkedSubCat != null
														&& $checkedSubCat.length > 0) {
													$checkedSubCat
															.each(function() {
																subCat = $(this)
																		.val();
																var $seg = area
																		.find('#seg-'
																				+ subCat);
																if ($seg != undefined
																		&& $seg.length > 0) {
																	var $checkedSeg = $seg
																			.find('input[name="segmentList"]:checked');
																	if ($checkedSeg != null
																			&& $checkedSeg.length > 0) {
																		$checkedSeg
																				.each(function() {
																					seg = $(
																							this)
																							.val();
																					itemInfo
																							.push(new StockTakeItemInfo(
																									startDate,
																									endDate,
																									freq,
																									weeks,
																									dept,
																									cat,
																									subCat,
																									seg,
																									'',
																									userId,
																									'','1'));
																				});
																	} else {
																		itemInfo
																				.push(new StockTakeItemInfo(
																						startDate,
																						endDate,
																						freq,
																						weeks,
																						dept,
																						cat,
																						subCat,
																						'',
																						'',
																						userId,
																						'','1'));
																	}
																} else {
																	itemInfo
																			.push(new StockTakeItemInfo(
																					startDate,
																					endDate,
																					freq,
																					weeks,
																					dept,
																					cat,
																					subCat,
																					'',
																					'',
																					userId,
																					'','1'));
																}
															});
												} else {
													itemInfo
															.push(new StockTakeItemInfo(
																	startDate,
																	endDate,
																	freq,
																	weeks,
																	dept, cat,
																	'', '', '',
																	userId, '','1'));
												}
											} else {
												deptFlag=true;
												itemInfo
														.push(new StockTakeItemInfo(
																startDate,
																endDate, freq,
																weeks, dept,
																cat, '', '',
																'', userId, '','1'));
											}
										});
							} else {
								itemInfo.push(new StockTakeItemInfo(startDate,
										endDate, freq, weeks, dept, '', '', '',
										'', userId, '',''));
								deptFlag=true;
							}
						} else {
							itemInfo.push(new StockTakeItemInfo(startDate,
									endDate, freq, weeks, dept, '', '', '', '',
									userId, '',''));
							deptFlag=true;
						}
					}// 
						else {
						itemInfo.push(new StockTakeItemInfo(startDate,
								endDate, freq, weeks, dept, '', '', '', '',
								userId, '',''));
					}
					});*/
	return itemInfo;
}

/**
 * Builds and returns the request parameters for create stocktake
 * 
 * @returns {String}
 */
function buildReqParamEditST() {

	var actionFlag = "U"; // E-edit & D-delete
	overrideFlagEdit = false;
	var stocktakeId = $("#reportDetailsStockTakeId").html().trim();
	var overrideReason = '';
	var itemActionFlag="";
	
	if ($("#editReasonSelectBox").val() == "Other") {
		overrideReason = $("#overrideReasonOtherTxt").val();
	} else {
		overrideReason = $("#editReasonSelectBox").val();
	}

	var requestParam = '';
	var userId = $("#loginUserId").val();
	var userName = $('#fullName').val();
	var stockTakeName = $("#editStockTakeName").val().trim();
	var startDate = $("#dateFromEdit").val();
	var endDate = $("#enddateEdit").val();
	var freq = $("#editFreqSelectOptions").val();
	if (editSTFreq == "A") {
		freq = editSTFreq;
	}	
	if ($('#editFreqSelectOptions').val() == "99" ) {
		iv_fis_date = $("#datePickEdit-input").val();
	}else{
		iv_fis_date='';
	}	
	var weeks = $("#weeksEditST").val();
	var isSelArtHir = $("#editSTArticleH").is(':checked');
	var isUniqueSelectedEdit = ($("#parameterListIncludeEdit").find(".articleBasicLabel").length > 0 ? true : false);
	var itemInfo = [];
	var deletedList = [];
	var deptLen = 0;
	var incArtLen = 0;
	var excArtLen = 0;
	var actualStartDate = '';
	var actualEndDate = '';
	var actualFreq = '';
	var actualSTDat = '';
	var completeObj = {};
	var removeAll = 'N';
	if(loadArray.length>0){
		 actualStartDate = (loadArray[0].start_date!=undefined && loadArray[0].start_date.indexOf("-") != -1 ? (getFormattedDateEdit(loadArray[0].start_date.split('-').join('/'),'/')): '');
		 actualEndDate = (loadArray[0].end_date!=undefined && loadArray[0].end_date.indexOf("-") != -1 ? (getFormattedDateEdit(loadArray[0].end_date.split('-').join('/'),'/')): '');
		 actualSTDat = (loadArray[0].stocktake_dates||'');
		 actualFreq = (loadArray[0].freq_code||'');
	}
	//var insertMap=new Map();
	//insertMap=compareMaps(m2,m1);
	//var deleteMap= new Map();
	//deleteMap = compareDeleteMaps(m1,m2);
	iv_fis_date = iv_fis_date.split(' ').join('');
	if (isSelArtHir) {
		completeObj = getChangedRecordsInfo(actualStartDate, actualEndDate, freq, weeks, userId,
				itemInfo, $('#dialog-hierarchy'),false,'D',startDate,endDate,isUniqueSelectedEdit);
		deletedList = completeObj['delete'];
		updateList = completeObj['update'];
		var insertedList = getSelectedDataFrmScrn(startDate, endDate, freq, weeks, userId,
				itemInfo, $('#dialog-hierarchy'),'',isUniqueSelectedEdit);
		deptLen = insertedList.length;
		if(deletedList == undefined || deletedList == null){
			deletedList = [];
		}
		if(deptLen == 0){
			deptLen = loadArray.length - deletedList.length;
		}
		/*if(deletedList!=undefined && deletedList.length >0){
			
		}*/
		itemInfo= itemInfo.concat(deletedList);
		itemInfo= itemInfo.concat(insertedList);
		if($("#parameterListIncludeEdit").find(".articleBasicLabel")!=undefined && $("#parameterListIncludeEdit").find(".articleBasicLabel").length >0){
			$("#parameterListIncludeEdit").find(".articleBasicLabel").each( // if also articles is slected.
						function() {
				itemActionFlag = 'I';
				itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
						weeks, '', '', '', '', $(this).text().split('-')[0],
						userId, '',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag));
			});
		}
		if(completeObj['update']!=undefined && completeObj['update'].length >0){
			itemInfo= itemInfo.concat(completeObj['update']);
		}
		if(deletedList.length == loadArray.length){
			removeAll = 'Y';
		}
		if(deptLen == 0){
			deptLen = (updateList !=undefined && updateList != null) ? updateList.length:0;
		}
	} else {
		if($('#editSTDeptDrpDwnUl').find("input[type=checkbox]:checked").length != 0){
			$('#editSTDeptDrpDwnUl').find("input[type=checkbox]:checked").each(
					function() {
					if ($(this).attr('id') != 'editSTallDeptChkBox') {
						itemActionFlag = "I";
						/*if(insertMap.get($(this).val()) != undefined){
							itemActionFlag = "I";	
						}if(deleteMap.get($(this).val()) != undefined){
							itemActionFlag = "D";
						}*/
						itemInfo.push(new StockTakeItemInfo(startDate, endDate,
								freq, weeks, $(this).val(), '', '', '', '',
								userId, $(this).text().split('-')[0],(isUniqueSelectedEdit ? '2':''),itemActionFlag));
				}
			});
			deptLen = itemInfo.length;
			$("#parameterListIncludeEdit").find(".articleBasicLabel").each( // if only articles is slected.
					function() {
					itemActionFlag = "I";
					/*if(insertMap.get($(this).attr('id')) != undefined){
						itemActionFlag = "I";	
					}
					if(deleteMap.get($(this).attr('id')) != undefined){
						itemActionFlag = "D";
					}*/
					itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
							weeks, '', '', '', '', $(this).text().split('-')[0],
							userId, '',(isUniqueSelectedEdit ? '2':''),itemActionFlag));
			});
			completeObj = getChangedRecordsInfo(actualStartDate, actualEndDate, freq, weeks, userId,
					itemInfo, $('#dialog-hierarchy'), true,'D','','',isUniqueSelectedEdit);
			deletedList = completeObj['delete'];
			incArtLen = itemInfo.length - deptLen;
		}else{
			$("#parameterListIncludeEdit").find(".articleBasicLabel").each( // if only articles is slected.
					function() {
					itemActionFlag = "I";
					itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
							weeks, '', '', '', '', $(this).text().split('-')[0],
							userId, '',(isUniqueSelectedEdit ? '2':'1'),itemActionFlag));
			});
			completeObj = getChangedRecordsInfo(actualStartDate, actualEndDate, freq, weeks, userId,
					itemInfo, $('#dialog-hierarchy'),true,'D','','',isUniqueSelectedEdit);
			deletedList = completeObj['delete'];
			incArtLen = itemInfo.length;
		}
		if(deletedList== undefined){
			deletedList = [];
		}
		removeAll = 'Y';
		itemInfo = deletedList.concat(itemInfo);
	}
	// Validations
	// Include articles (or) department is mandatory
	if ((incArtLen <= 0) && (deptLen <= 0)) {
		isValid = false;
		$.fn.showCustomMsg([ 'Department or Include Articles is mandatory.' ],
				error, 'Edit StockTake');
	}// If exclude article selected, department selection is also mandatory
		// and vice versa
	else if (deptLen <= 0 && excArtLen.length > 0) {
		$.fn.showCustomMsg([ 'Please select department(s).' ], error,
				'Edit StockTake');
	} else {
		var delFalg = $("#delSTChkBox").is(':checked') ? "Y" : "N";
		var overrideFlag = $("#overrrideSTChkBox").is(':checked') ? "Y" : "N";
		if (delFalg == "Y") {
			actionFlag = "D";
			itemInfo = [];
			itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
					weeks, '', '', '', '', '', userId, '',(isUniqueSelectedEdit ? '2':'')));
		} else if (overrideFlag == "Y") {
			actionFlag = "O";
			overrideFlagEdit = true;
			itemInfo = [];
			itemInfo.push(new StockTakeItemInfo(startDate, endDate, freq,
					weeks, '', '', '', '', '', userId, '',(isUniqueSelectedEdit ? '2':'')));
		}
		var countDate = globalValueForStocktakeDtls[0].stocktake_date;
		if(countDate!=null && countDate!= '' && countDate.split('-').length>1){
			countDate = countDate.split('-');
			countDate = countDate[1] + "-" + countDate[2] + "-" + countDate[0];
		}
		if(itemInfo.length == 0 && (actualStartDate!=startDate || endDate!=actualEndDate || freq!=actualFreq || freq == '99')){
			completeObj = getChangedRecordsInfo(startDate, endDate, freq, weeks, userId,
					itemInfo, $('#dialog-hierarchy'),true,'I','','',isUniqueSelectedEdit);
			itemInfo = completeObj['delete'];
		}
		requestParam = new StockTakeHdrInfo(siteVal, userId, actionFlag,
				stockTakeName, itemInfo, overrideReason,stocktakeId,iv_fis_date,seq_no,(countDate),removeAll,userName);
	}
	if (actionFlag != 'D' && actionFlag != 'O') {
		if (!validateUpdateStockTake()) {
			return '';
		}
	}

	return requestParam;
}

function deleteExistingSTInfo(){
	
}

function getFormattedDateEdit(date,delimiter) {
	
		var newDate = '';
		if (date != null && date != '' && date != undefined) {
			if(date.split('/').length > 2){
				newDate = date.split('/')[2] + delimiter + date.split('/')[1] + delimiter
						+ date.split('/')[0];
			}
		}
		return newDate;
	
	}
function compareMaps(m1, m2){
	var diffMap = new Map();
	m1.forEach(function (item, key, m1) {
	    m2.forEach(function (item1, key1,m2){
	    	 if (key != key1){
		    	  diffMap.set(key,m1.get(key));
		         }
	    });
	});
	return diffMap;
} 

function compareDeleteMaps(m1, m2){
	var diffMap = new Map();
	m1.forEach(function(item, key, m1) {
		if (!m2.has(key)) {
			m2.forEach(function(item1, key1, m2) {
				if (key != key1 && !m1.has(key1)) {
					diffMap.set(key, m1.get(key));
				}
			});
		}
	});
	return diffMap;
} 
function getChangedRecordsInfo(startDate, endDate, freq, weeks, userId, itemInfo,
		area,deleteAll,changeInd,actStartDate, actEndDate,isUniqueSelectedEdit) {
	var existingRecords = {};
	var dept = '';
	var cat = '';
	var subCat = '';
	var seg = '';
	var key = '';
	var lvlKey = '';
	var itemKey = '';
	var deleteInd = '';
	var flag = false;
	var tempArray = [];
	var $deptElem;
	var $catElem;
	var $subCatElem;
	var $segElem;
	var deletedObjList = [];
	var obj = {};
	var isHierChecked = $("#editSTArticleH").is(':checked');
	var isCatChecked = $('.parentCatDiv').find('input[name="category"]:checked').length >0 ? true : false
	var loadHierFlg = false;
	var isExistingUnique = false;
	for(var i =0; i<loadArray.length; i++){
		if((loadArray[i].article_number||'')!=''){
			isExistingUnique = true;
		}else{
			if((loadArray[i].category||'')!=''){
				loadHierFlg = true;
			}
		}
	}
	isHierCheckedHandleFlg =((isCatChecked || loadHierFlg) && isHierChecked)?true: false;
	for(var i =0; i<loadArray.length; i++){
		if((loadArray[i].article_number||'')!=''){
			itemKey = 'delete';
			obj = new StockTakeItemInfo( startDate, endDate, freq, weeks, '', '', '', '', loadArray[i].article_number, userId, '', (isExistingUnique ? '2' :'1'),changeInd);
		}else{
			cat = '';
			subCat = '';
			seg = '';
			flag = false;
			dept= (loadArray[i].dept_id||'');
		    key = dept;
		    lvlKey = 'Lvl_1';
			if((loadArray[i].category||'')!=''){
				cat = loadArray[i].category;
				key += '-'+cat;
				lvlKey = 'Lvl_2';
				flag = true;
			} 
			if((loadArray[i].sub_category||'')!=''){
				subCat = loadArray[i].sub_category;
				key += '-'+subCat;
				lvlKey = 'Lvl_3';
			} 
			if((loadArray[i].segment||'')!=''){
				seg = loadArray[i].segment;
				key += '-'+seg;
				lvlKey = 'Lvl_4';
			}
			$deptElem = area.find('.deptlst').find('#'+dept);
			if(lvlKey == 'Lvl_1'){
				if(!($deptElem.is(':checked'))){
					deleteInd = true;
				}else if(area.find('#catg-'+dept).find('input[name="category"]:checked').length > 0){
					deleteInd = true;
				}
			}else if(lvlKey == 'Lvl_2'){
				$catElem = area.find('#'+cat);
				if(!($deptElem.is(':checked')) || ($catElem.length > 0 && (!($catElem.is(':checked')) || !($catElem.hasClass('prepopulated'))))){
					deleteInd = true;
				}else if(area.find('#scatg-'+cat).find('input[name="subCat"]:checked').length > 0){
					deleteInd = true;
				}
			}else if(lvlKey == 'Lvl_3'){
				$catElem = area.find('#'+cat);
				$subCatElem = area.find('#'+subCat);
				if(!($deptElem.is(':checked')) || ($catElem.length > 0 && (!($catElem.is(':checked')) || !($catElem.hasClass('prepopulated'))))
						|| ($subCatElem.length > 0 && (!($subCatElem.is(':checked')) || !($subCatElem.hasClass('prepopulated'))))){
					deleteInd = true;
				}else if(area.find('#seg-'+subCat).find('input[name="segmentList"]:checked').length > 0){
					deleteInd = true;
				}
			}else if(lvlKey == 'Lvl_4'){
				$catElem = area.find('#'+cat);
				$subCatElem = area.find('#'+subCat);
				$segElem = area.find('#'+seg);
				if(!($deptElem.is(':checked')) || ($catElem.length > 0 && (!($catElem.is(':checked')) || !($catElem.hasClass('prepopulated'))))
						|| ($subCatElem.length > 0 && (!($subCatElem.is(':checked')) || !($subCatElem.hasClass('prepopulated'))))
						|| ($segElem.length > 0 && (!($segElem.is(':checked')) || !($segElem.hasClass('prepopulated'))))){
					deleteInd = true;
				}
			}
			if(deleteInd || deleteAll){
				deleteInd = false;
				itemKey = 'delete';
				obj = new StockTakeItemInfo( startDate, endDate, freq, weeks, dept, cat, subCat, seg, '', userId, '',(flag ? (isExistingUnique ? '2' :'1') : ''),changeInd);
				deletedObjList.push(obj);
			}else{
				itemKey = 'update';
				obj = new StockTakeItemInfo( actStartDate, actEndDate, freq, weeks, dept, cat, subCat, seg, '', userId, '',(((isCatChecked || loadHierFlg) && isHierChecked) ? (isUniqueSelectedEdit ? '2' :'1') : (isUniqueSelectedEdit ? '2' :'')),'I');
			}
		}
		if(existingRecords[itemKey]!=undefined && existingRecords[itemKey].length> 0){
			tempArray = existingRecords[itemKey];
			tempArray.push(obj);
		}else{
			tempArray= [];
			tempArray.push(obj);
		}
		existingRecords[itemKey] = tempArray;
		if(itemKey=='update' && ((isCatChecked || loadHierFlg) && isHierChecked)){
			obj = new StockTakeItemInfo( actStartDate, actEndDate, freq, weeks, dept, cat, subCat, seg, '', userId, '',(flag ? (isExistingUnique ? '2' :'1') : ''),changeInd);
			if(existingRecords['delete']!=undefined && existingRecords['delete'].length> 0){
				tempArray = existingRecords['delete'];
				tempArray.push(obj);
			}else{
				tempArray= [];
				tempArray.push(obj);
			}
			existingRecords['delete'] = tempArray;
		}
	}
	return existingRecords;
}

function frameItemInfo(){
	var itemInfo=[];
	var startDate = $("#dateFromEdit").val();
	var endDate = $("#enddateEdit").val();
	if($("#editSTArticleH").is(':checked')){
		itemInfo = frameDeptItemInfo('', '', '', '', '',
				itemInfo, $('#dialog-hierarchy'),'');
	}
	if($('#editSTDeptDrpDwnUl').find("input[type=checkbox]:checked").length != 0){
		$('#editSTDeptDrpDwnUl').find("input[type=checkbox]:checked").each(
				function() {
					if ($(this).attr('id') != 'editSTallDeptChkBox') {
						itemInfo.push(new StockTakeItemInfo(startDate, endDate,
								'', '', $(this).val(), '', '', '', '',
								'', $(this).text().split('-')[0],'',''));
					}
				});
		$("#parameterListIncludeEdit").find(".articleBasicLabel").each( // if only articles is slected.
				function() {
					itemInfo.push(new StockTakeItemInfo(startDate, endDate, '',
							'', '', '', '', '', $(this).text().split('-')[0],
							'', '','',''));
				});
}
else{
	$("#parameterListIncludeEdit").find(".articleBasicLabel").each( // if only articles is slected.
			function() {
				itemInfo.push(new StockTakeItemInfo(startDate, endDate, '',
						'', '', '', '', '', $(this).text().split('-')[0],
						'', '','1',''));
			});
		}
	$("#parameterListExcludeEdit").find(".articleBasicLabel").each(
			function() {
				itemInfo.push(new StockTakeItemInfo(startDate, endDate, '',
						'', '', '', '', '', '', '', $(this).text()
								.split('-')[0],'2',''));
			});
	return itemInfo;
}
/**
 * Hits the service to Create Stocktake
 * 
 * @param requestParam
 */
function callCreateSTService(requestParam) {
	console.log(createEditSTUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : createEditSTUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				// console.log(JSON.stringify(response));
				if (response != undefined && response.typ != undefined) {
					if (response.typ == "E" && response.msg != '') {
						$.fn.showCustomMsg([ response.msg ], error,
								'Create Stocktake');
					} else if (response.typ == "S") {
						$.fn.showCustomMsg(
								[ 'Stocktake created successfully.' ], success,
								'Create Stocktake');
						resetCreateStockTakeFields();
					}
				} else {
					$.fn.showCustomMsg(
							[ 'Sorry, Some technical issue occured.' ], error,
							'Create Stocktake');
				}
				stopLoading();
			}).fail(
			function() {
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured.' ],
						error, 'Create Stocktake');
			}).always(function() {
		// stopLoading();
	});
}

function resetCreateStockTakeFields() {
	var area = $('#tabs-5');
	area
			.find(
					'#stockTakeName, #dateFromCreate, #enddateCreate, #weeksCreateST')
			.val('');
	area.find('#freqSelectOptions').val('');
	$("#datePick").addClass("hideBlock");
	$('#datesPick').multiDatesPicker('resetDates', 'picked');
	area.find('#freqSelectOptions').trigger('click');
	selectDefPrimaryDepts("createSTDeptDrpDwnUl", $("#tableAddAction"),
			"createSTDeptDrpDwnLabel");// to default primary depts
	onChangeDeptDropDown("createSTDeptDrpDwnUl", "createSTallDeptChkBox",
			"createSTDeptDrpDwnLabel", $("#tableAddAction"));
	area.find('#createSTArticleH').prop("checked", true);// to hide hier box
	area.find('#createSTArticleH').trigger('click');
	// added for defect
	if ($('#createSTArticleHierarchyId .deptSelectAll').is(':checked')) {
		$('#createSTArticleHierarchyId .deptSelectAll').trigger('click');
	} else {
		$('#createSTArticleHierarchyId .deptSelectAll').trigger('click');
		$('#createSTArticleHierarchyId .deptSelectAll').trigger('click');
	}
	area.find('#searchBoxInclude, searchBoxExclude').val('');
	area.find('#parameterListInclude, #parameterListExclude').html('');
}
/**
 * Hits the service to Edit Stocktake
 * 
 * @param requestParam
 */
function callEditSTService(requestParam) {
	console.log(createEditSTUrl + ' ' + JSON.stringify(requestParam));
	$.ajax({
		type : "POST",
		url : createEditSTUrl,
		data : JSON.stringify(requestParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				// console.log(JSON.stringify(response));
				errorMsg = "StockTake is Updated Successfully";
				if (response != undefined && response.typ != undefined) {
					if (response.typ == "F" || response.typ == "E") {
						$.fn.showCustomMsg([ response.msg ], error,
								'Edit StockTake');
					} else if (response.typ == "S") {
						$.fn.showCustomMsg([ errorMsg ], success,
								'Edit StockTake');
						$("#dialog-hierarchy").dialog("close");
						callDisplaySTService(tabStockTakeStatus);
					}
				} else {
					/*
					 * if(response != undefined && response.length <= 0 ){
					 * $.fn.showCustomMsg(['Sorry, No records
					 * found.'],success,'Edit StockTake'); }else{
					 */
					$.fn.showCustomMsg(
							[ 'Sorry, Some technical issue occured.' ], error,
							'Edit StockTake');
					// }
				}
				stopLoading();
			}).fail(
			function() {
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured.' ],
						error, 'Edit StockTake');
			}).always(function() {
		// stopLoading();
	});
}
var displayStatus = '';
function callDisplaySTService(statusType) {
	callServiceForSTCountDetails();// to update tab count details
	
	displayStatus = statusType;
	rtnMapDisplayST = {};
	var reqParam = {
		"iv_site_no" : $("#posSite").val(),
		"iv_sales_org" : $("#salesOrg").val(),
		"iv_status" : statusType.toUpperCase(),
		"iv_st_id" : "",
		"iv_status_flg" : "Y",
		"iv_dept" : "",
		"iv_msd_art_cmp_fltr" : "",
		"iv_var_cmp_fltr" : "",
		"iv_msd_art_chk_fltr" : ""
	};

	console.log(displaySTUrl + ' ' + JSON.stringify(reqParam));
	$.ajax({
		type : "POST",
		url : displaySTUrl,
		data : JSON.stringify(reqParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				// console.log(JSON.stringify(response));
				// response = [{"msg_typ":"S","msg_string":"Display
				// success","stocktake_name":"Stocktake004","stocktake_id":"8000000108","stocktake_status":"OVERDUE","department_name":"FRONT
				// OF
				// STORE","department_id":"28","total_articles":1,"last_completion_date":null,"next_due_date":"2015-12-25","source":"STORE","frequency":"Weekly"},{"msg_typ":"S","msg_string":"Display
				// success","stocktake_name":"Stocktake004","stocktake_id":"8000000107","stocktake_status":"OVERDUE","department_name":"GENERAL
				// MERCHANDISE,FRONT OF
				// STORE","department_id":"15,28","total_articles":1,"last_completion_date":null,"next_due_date":"2015-12-25","source":"STORE","frequency":"Weekly"},{"msg_typ":"S","msg_string":"Display
				// success","stocktake_name":"Stocktake003","stocktake_id":"8000000106","stocktake_status":"OVERDUE","department_name":"NON
				// TRADING,GENERAL
				// MERCHANDISE","department_id":"00,15","total_articles":1,"last_completion_date":null,"next_due_date":"2015-12-26","source":"STORE","frequency":"Weekly"},{"msg_typ":"S","msg_string":"Display
				// success","stocktake_name":"Stocktake002","stocktake_id":"8000000104","stocktake_status":"OVERDUE","department_name":"GROCERY
				// FOODS,GENERAL
				// MERCHANDISE","department_id":"05,15","total_articles":1,"last_completion_date":null,"next_due_date":"2015-12-24","source":"STORE","frequency":"Weekly"},{"msg_typ":"S","msg_string":"Display
				// success","stocktake_name":"Stocktake001","stocktake_id":"8000000102","stocktake_status":"OVERDUE","department_name":"FRONT
				// OF
				// STORE","department_id":"28","total_articles":1,"last_completion_date":null,"next_due_date":"2015-12-23","source":"STORE","frequency":"Weekly"},{"msg_typ":"S","msg_string":"Display
				// success","stocktake_name":"Stocktake Test
				// 22/12/2015","stocktake_id":"8000000002","stocktake_status":"OVERDUE","department_name":"GROCERY
				// FOODS,GENERAL
				// MERCHANDISE,PRODUCE","department_id":"05,15,30","total_articles":3,"last_completion_date":null,"next_due_date":"2015-12-29","source":"STORE","frequency":"Weekly"}];
				$("#tabs-1").removeClass("hideBlock");
				$('#o_stocktakes').tabs("option", "active", 0);// TO make My
																// Dept as
																// default tab
				if (response != undefined && response.length > 0
						&& response[0].stocktake_name != undefined) {
					rtnMapDisplayST = splitMyDeptOtherDept(response);
					if (rtnMapDisplayST['MY_DEPT'] != undefined
							&& rtnMapDisplayST['MY_DEPT'].length > 0) {
					
						loadGetSTByStatusTbl(rtnMapDisplayST['MY_DEPT'],
								$tblhold, statusType);
						$('.moreNumber').tooltip({
							tooltipClass : 'tmptooltipClass'
						});
					} else {
						// $.fn.showCustomMsg(['Sorry, No records
						// found.'],success,'Stocktake Display');
					}
				} else {
					if (response != undefined && response.length <= 0) {
						// $.fn.showCustomMsg(['Sorry, No records
						// found.'],success,'Stocktake Display');
					} else {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured' ],
								error, 'Stocktake Display');
					}
				}

				stopLoading();
			}).fail(
			function() {
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured' ],
						error, 'Stocktake Display');
			}).always(function() {
		// stopLoading();
		securityMatrix();
	});
}
function splitMyDeptOtherDept(response) {
	// Default Primary department as selected department
	var responseMyDept = new Array();
	var responseOtherDept = new Array();
	var pDept = $('#primaryDept').val();
	var primaryDepts = '';
	var userPrimaryDepts = [];
	if (pDept != null && pDept != '' && pDept != undefined) {
		primaryDepts = $.parseJSON($('#primaryDept').val()).data;
		if (isAdminRole($('#roleId').val())) {
			userPrimaryDepts = primaryDepts['NONE'];
		} else {
			userPrimaryDepts = primaryDepts[$("#posSite").val()];
		}
	}
	var userPrimaryDeptsArray = new Array();
	var rtnMapDisplayST = {};

	/*
	 * if(userPrimaryDepts != undefined && userPrimaryDepts.length > 0){
	 * userPrimaryDeptsArray = userPrimaryDepts.split(","); }else{
	 * userPrimaryDeptsArray[0] = ''; }
	 */

	for ( var i = 0; i < response.length; i++) {
		if (userPrimaryDepts != null
				&& userPrimaryDepts.length > 0
				&& checkIfMyDepartment(userPrimaryDepts,
						response[i].department_id)) {
			responseMyDept[responseMyDept.length] = response[i];
		} else {
			responseOtherDept[responseOtherDept.length] = response[i];
		}
	}
	rtnMapDisplayST["MY_DEPT"] = responseMyDept;
	rtnMapDisplayST["OTHER_DEPT"] = response;// since changed to all dept ;

	return rtnMapDisplayST;

}
function checkIfMyDepartment(userPrimaryDeptsArray, responseDepts) {
	var rtnFlag = false;
	if (responseDepts != undefined) {
		var responseDeptsArray = responseDepts.split(",");
		for ( var i = 0; i < userPrimaryDeptsArray.length; i++) {
			for ( var j = 0; j < responseDeptsArray.length; j++) {
				if (userPrimaryDeptsArray[i] == responseDeptsArray[j]) {
					rtnFlag = true;
					break;
				}
			}
		}
	}
	return rtnFlag;
}
/**
 * Defines the display stocktake load area
 * 
 * @param data
 * @param $tblhold
 */
function loadGetSTByStatusTbl(data, $tblhold, status) {
	$tblhold = ($tblhold == undefined || $tblhold == '') ? $('#'
			+ $selectedTab.attr('aria-controls')) : $tblhold;
	var confObj = new tblDisplaySTByStatus(data, status);
	$tblhold.loadtbl(confObj);
	securityMatrix();
}
/**
 * Configuration for the creation display ST table
 * 
 * @param data
 * @returns {tblDisplaySTByStatus}
 */
function tblDisplaySTByStatus(data, st) {
	this.option = 'build';
	this.key = [ 'stocktake_name', 'department_name', 'stockTakeDate',
			'source', /*'total_articles',*/ 'stocktake_status', 'actions' ];
	this.table_name = "Display_Stocktake";
	this.table_title = '';
	this.table_class = ' ContentTable actionRows cursor-def';
	this.header_tr_class = 'collapsed';
	this.header_name = {
		stocktake_name : 'Stocktake Name',
		department_name : 'Department',
		last_completion_date : 'Last Completed',
		next_due_date : 'Next Due',
		source : 'Source',
		//total_articles : 'Articles',
		stocktake_status : 'Status',
		actions : 'Actions'
	};
	this.header_data_type = {
		stocktake_name : 'char',
		department_name : 'char',
		last_completion_date : 'date',
		next_due_date : 'date',
		source : 'char',
		//total_articles : 'number',
		stocktake_status : 'char',
		actions : ''
	};
	this.header_row_type = {
		stocktake_name : 'main',
		department_name : 'main',
		stockTakeDate : 'sub',
		source : 'main',
		//total_articles : 'main',
		stocktake_status : 'main',
		actions : 'main'
	};
	this.header_sub_rows = {
		stockTakeDate : {
			subKeys : [ 'last_completion_date', 'next_due_date' ]
		}
	};
	this.header_class = {
		stocktake_name : ' leftValue',
		department_name : ' leftValue ',
		stockTakeDate : ' centerValue columnDivider noSort  ',
		last_completion_date : ' centerValue ',
		next_due_date : ' centerValue ',
		source : ' centerValue ',
		//total_articles : ' centerValue ',
		stocktake_status : ' centerValue ',
		actions : ' centerValue editMode lastColumn '
	};
	this.header_width = {
		stocktake_name : '10%',
		department_name : '10%',
		last_completion_date : '4%',
		next_due_date : '4%',
		source : '4%',
		//total_articles : '8%',
		stocktake_status : '4%',
		actions : '4%'
	};
	this.content_class = {
		stocktake_name : ' leftValue',
		department_name : ' leftValue ',
		stockTakeDate : ' centerValue columnDivider noSort  ',
		last_completion_date : ' centerValue ',
		next_due_date : ' centerValue ',
		source : ' centerValue ',
		//total_articles : ' centerValue ',
		stocktake_status : ' centerValue ',
		actions : ' centerValue editMode lastColumn '
	};
	this.content_format = {
		stocktake_name : 'removeNull',
		department_name : 'removeNull',
		last_completion_date : 'mobi_date',
		next_due_date : 'mobi_date',
		source : 'removeNull',
		//total_articles : 'removeNull',
		stocktake_status : 'removeNull'
	};
	this.content_width = {
		stocktake_name : '10%',
		department_name : '10%',
		last_completion_date : '4%',
		next_due_date : '4%',
		source : '4%',
		//total_articles : '8%',
		stocktake_status : '4%',
		actions : '4%'
	};
	this.header_td_label = {
		stockTakeDate : 'Stocktake Date',
		actions : 'Actions'
	};

	// console.log('st===',st)
	if (st != 'deleted' && st != 'completed') {
		this.cont_data_function = {
			stocktake_name : showStockTakeName,
			actions : showActionIcons,
			department_name : showDepartments,
			stocktake_status : showStatus
		};
		this.content_td_addon = {
			actions : {
				'.editRecord' : {
					event : {
						click : editSTDetails
					},
					display : function() {
					}
				}
			},
			department_name : {
				'.moreNumber' : {
					event : {
						click : showMoreDeptWWDetails
					},
					display : function() {
					}
				}
			}
		};
		this.content_label = {
			actions : '<label class="linkBtn"><a><label class="editRecord">&nbsp;</label></a></label>'
		};

	} else {
		this.cont_data_function = {
			stocktake_name : showStockTakeName,
			department_name : showDepartments,
			stocktake_status : showStatus
		};
		this.content_td_addon = {
			department_name : {
				'.moreNumber' : {
					event : {
						click : showMoreDeptWWDetails
					},
					display : function() {
					}
				}
			}
		};
		this.content_label = {
			actions : '<label class="linkBtn hideBlock"><a><label class="editRecord">&nbsp;</label></a></label>'
		};
	}

	this.content_title = {}, this.header_title = {};
	this.header_td_addon = {};
	this.groupby = false;
	this.content = data;
	this.pagination = true;
	this.recordPerPage = 10;
	this.filter = false;
	this.curr_page = 1;
	this.sort = true;
	this.content_bind_event = {
		click : getStockTakeReportDetails
	};
	if (tabIndex == 0) {// If overdue tab
		//this.legend = '<label> Legend: <label class="urgent">Stocktake needs to be performed urgently</label></label>';
		this.legend = '';
	} else {
		this.legend = '';
	}
	this.page_done = {
		page_done : securityMatrix
	};
}
var showDepartments = function(obj) {
	var depDisp = '';
	var allDeptArray = new Array();
	var hyperlinkValue = '';
	var rtnLabel = '';
	var titleDept = '';
	if (obj.department_name != undefined) {
		allDeptArray = obj.department_name.split(",");
		if (allDeptArray.length == 0) {
			rtnLabel = '<label></label>';
		} else if (allDeptArray.length == 1) {
			depDisp = allDeptArray[0];
			rtnLabel = '<label>' + depDisp + '</label>';
		} else if (allDeptArray.length == 2) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1];
			rtnLabel = '<label>' + depDisp + '</label>';
		} else if (allDeptArray.length > 2) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1] + " and ";
			hyperlinkValue = allDeptArray.length - 2 + " more";
			for ( var i = 2; i < allDeptArray.length; i++) {
				if (titleDept.length == 0) {
					titleDept = allDeptArray[i];
				} else {
					titleDept = titleDept + "," + allDeptArray[i];
				}

			}
			rtnLabel = '<label>' + depDisp + '<a class="moreNumber"  title="'
					+ titleDept + '">+' + hyperlinkValue + '</a></label>';
		}
	}
	return rtnLabel;
};
var showMoreDeptWWDetails = function(obj) {
	event.stopPropagation();
};
var showStockTakeName = function(obj) {
	if (tabIndex == 0) {// If overdue tab
		return '<label stocktake_seq = "'+obj.seq_no+'" stocktake_id="' + obj.stocktake_id + '" >'
				+ obj.stocktake_name + '</label>';
	} else {
		return '<label stocktake_seq = "'+obj.seq_no+'" stocktake_id="' + obj.stocktake_id + '">'
				+ obj.stocktake_name + '</label>';
	}

};
var showStatus = function(obj) {
	var statusClass = '';
	if (obj.stocktake_status == 'OPEN') {// If overdue tab
		statusClass = 'progress';
		
	} else if (obj.stocktake_status == 'NOT STARTED'
			|| obj.stocktake_status == 'DELETED') {
			statusClass = 'failed';
	} else if (obj.stocktake_status == 'COMPLETED') {
				statusClass = 'success';
	}

	return '<label class="' + statusClass + '">' + obj.stocktake_status
			+ '</label>';
};
var showActionIcons = function(obj) {
	if (obj.stocktake_status == "OPEN") {
		//if (canEdidOpenSt)
			return '<label class="linkBtn '
					+ editStockTakeOpenIcon
					+ '"><a ><label class="editRecord">&nbsp;</label></a></label>';
		//else
			//return '';
	} else {
		return '<label class="linkBtn ' + editStockTakeIcon
				+ '"><a ><label class="editRecord">&nbsp;</label></a></label>';
	}
};
var getStockTakeReportDetails = function(hdrObj, flag) {
	// $(".displayArea").empty();//for proper pagination
	selectedSTRow = $(this);
	handleGetStockTakeReportDetails();

};
function handleGetStockTakeReportDetails() {
	$("#reportDetailsStockTakeId").html(
			selectedSTRow.find('td:first').find('label').attr('stocktake_id'));
	$("#reportDetailsStockTakeSource").html(
			selectedSTRow.closest('tr').find('td:eq(4)').html());
	$("#reportContent0").addClass("hideBlock");// to hide tables
	$("#reportContent1,#reportContent2").addClass("hideBlock");
	$("#reportContent2_pend").addClass("hideBlock");
	$("#reportContent3,#reportContent3_audit").addClass("hideBlock");
	$("#reportContent4").addClass("hideBlock");
	$("#reportContent5").addClass("hideBlock");
	$("#reportContent6").addClass("hideBlock");
	$(".hideOnLoadST").addClass("hideBlock");// to hide the elements that has
												// to be hidden on load of
												// stocktake.
	glSTStatus = selectedSTRow.closest('tr').find('td:eq(5)').find('label')
			.html();
	if (glSTStatus == "NOT STARTED") { // and it should be only available for
										// not started stock take, present under
										// overdue and due now, upcoming tab.
		//$("#editLocation").removeClass("hideBlock");    //hided for UAT
	} else {
		$("#editLocation").addClass("hideBlock");
	}
	if (glSTStatus == "NOT STARTED" || glSTStatus == "OPEN") { // Defect 4888.
		$(".USRPERF").addClass("hideBlock");
		$(".TMPERF").addClass("hideBlock");
		$(".STKVAL").addClass("hideBlock");
	} else {
		$(".USRPERF").removeClass("hideBlock");
		$(".TMPERF").removeClass("hideBlock");
		$(".STKVAL").removeClass("hideBlock");
	}

	buildStockTakePrintDetails(selectedSTRow);
	callDisplaySTDetailsService(selectedSTRow.find('td:first').find('label')
			.attr('stocktake_id'), "D",selectedSTRow.data('obj'));
	filterApplyClicked = false;
	editBreadcrumbWrapper();
	$("#baseCountTabLabel").trigger("click");
	setSTViewActionMode(glSTStatus);
}
var editSTDetails = function(e) {
	e.stopPropagation();
	$('#searchBoxIncludeEdit').val('')
	var stSrc = $(this).closest('tr').find('td:eq(4)').html();
	$("#reportDetailsStockTakeId").html(
			$(this).closest('tr').find('td:first').find('label').attr(
					'stocktake_id'));
	seq_no = $(this).closest('tr').find('td:first').find('label').attr('stocktake_seq');
	$("#reportDetailsStockTakeSource").html(stSrc);
	editSTStatus = $(this).closest('tr').find('td:eq(5)').find('label').text();
	// added for defect 5436
	if (editSTStatus == 'OPEN') {
		$("#dialog-hierarchy").find('div.parameter').addClass('hideBlock');
		$("#dialog-hierarchy").find('div.parameter.onlyCheckbox ').removeClass(
				'hideBlock');
		$('#dialog-hierarchy').find('div.parameterRow:first').removeClass(
				'hideBlock').find('#editStockTakeName').prop('readonly', true);
	} else {
		$('#dialog-hierarchy').find('div.parameterRow:first').removeClass(
				'hideBlock').find('#editStockTakeName').prop('readonly', true);
		$("#dialog-hierarchy").find('div.parameter').removeClass('hideBlock');
	}
	$("#dialog-hierarchy").find('#searchBoxExcludeEdit').parent().addClass(
			'hideBlock');
	
	if ($('#editSTArticleHierarchyId .deptSelectAll').is(':checked')) {
		$('#editSTArticleHierarchyId .deptSelectAll').trigger('click');
	} else {
		$('#editSTArticleHierarchyId .deptSelectAll').trigger('click');
		$('#editSTArticleHierarchyId .deptSelectAll').trigger('click');
	}
	openDeleteMode();
	clearEditSTDialog();
	// populateEditSTDropDownDetails();
	callEditSTDetailsService($("#reportDetailsStockTakeId").html());// TO
																	// populate
																	// the edit
																	// default
																	// details
	$("#dialog-hierarchy").dialog("open");
	/*
	 * if(!isEditStocktakePopulated){
	 *  }
	 */

	var a = [];
	$('.deptDrpDwnChkBx').each(function() {
		if ($(this).is(":checked")) {
			a.push($(this).next().text());
		}
	});
	$("#editSTDeptDrpDwnLabel").attr('title', a.toString());
	e.preventDefault(); // to prevent scrolling of brow

};
function editBreadcrumbWrapper() {
	if ($("#stocktakeDiv").hasClass("hideBlock")) {
		$(".breadcrumbWrapper")
				.find('ul')
				.html(
						"<li><a href='../login/goingHome.htm'>Home</a></li><li>Stock Management</li><li class='currentPage'>Stocktake</li>");
	} else if ($("#stocktakeReportsDiv").hasClass("hideBlock")) {
		$(".breadcrumbWrapper")
				.find('ul')
				.html(
						"<li><a href='../login/goingHome.htm'>Home</a></li><li>Stock Management</li><li><a id='stockTakelistPage'>Stocktake</a></li><li class='currentPage'>Stocktake Batch Details</li>");
		$("#stockTakelistPage").on('click', function() {
			$("#backBtn").trigger('click');
		});
	}
}
function setSTViewActionMode(stStatus) {
	if (stStatus == "OPEN") {
		$(".actionModeST").removeClass("hideBlock");
	} else if (stStatus == "NOT STARTED") {
		$(".actionModeST").removeClass("hideBlock");
	} else if (stStatus == "COMPLETED") {// view mode
		$(".actionModeST").addClass("hideBlock");
	}
	if (glSTStatus == "OPEN") { // Defect 5248
		$("#finaliseStocktake").removeClass("hideBlock");
	} else {
		$("#finaliseStocktake").addClass("hideBlock");
	}
	if (missedArticleCompletionFlag != "Y"  || (glSTStatus != "OPEN" && glSTStatus != "INPROGRESS")) {
		$(".actionModeST").addClass("hideBlock");
		$("#finaliseStocktake").addClass("hideBlock");
	} else {
		$(".actionModeST").removeClass("hideBlock");
		$("#finaliseStocktake").removeClass("hideBlock");
	}
}
function callDisplaySTDetailsService(stocktakeId, type,data) {
	var reqParam = {
		"iv_site_no" : $("#posSite").val(),
		"iv_sales_org" : $("#salesOrg").val(),
		"iv_st_id" : stocktakeId,
		"iv_status_flg" : "N",
		"iv_status" : "",
		"iv_dept" : "",
		"iv_msd_art_cmp_fltr" : "",
		"iv_var_cmp_fltr" : "",
		"iv_msd_art_chk_fltr" : ""
	};

	console.log(displaySTStatusUrl + ' ' + JSON.stringify(reqParam));
	$
			.ajax({
				type : "POST",
				url : displaySTStatusUrl,
				data : JSON.stringify(reqParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						baseFilteronLoad = true;
						if (response != undefined && response.length > 0
								&& response[0].stocktake_id != undefined) {
							if(response[0].lock_flag == 'Y'){
								stopLoading();
								$.fn.showInformationSTMsg('Stocktake');
							}
							else{
							if (type == "D") {// Display stock take details on
												// hitting a row from stoktake
												// table
								response = [data];
								getSTDetailsToAll = response[0];
								onRecordSelect = true;
								//reframeStocktakePrint(getSTDetailsToAll);
								missedArticleCompletionFlag = response[0].missed_article_comp_flg;
								glSTStatus = response[0].stocktake_status;
								//countedByStUser = (response[0].cntd_by_st_usr||'N') == 'Y';
								var areaVariance = $('#mainTabs-3');
								areaVariance.find("#varaincePendingLabel").html("% Pending").attr('perc',0);
								areaVariance.find("#varianceInProgressLabel").html("% In-progress").attr('perc',0);
								areaVariance.find("#varianceCompletedLabel").html("% Completed").attr('perc',0);
								setSTViewActionMode(glSTStatus);
								$("#stockTakeNameReportDetailsScreen").html(
										response[0].stocktake_name);
								if(response[0].uniq_article_flg == 'Y'){
									$("#departmentsLabel").html('');
								}else {
									var showSubCate = showSubCateMore(response[0]);
									$("#departmentsLabel").html(showSubCate);
									$('.moreNumber').tooltip({
										tooltipClass : 'tmptooltipClass'
									});
								}
								/*$("#departmentsLabel").html(
										response[0].department_name);*/
								$("#sourceId").html(response[0].source);

								$("#finalizedUser").html("");
								$("#createdSTUser").html("");
								if(response[0].stocktake_status == 'NOT STARTED' || response[0].stocktake_status == 'OPEN' ){
									$("#teamPerformanceTab").addClass("hideBlock");
									$("#userPerformanceTab").addClass("hideBlock"); 
									$("#stockValuationTab").addClass("hideBlock");
									
								}else{
									$("#teamPerformanceTab").removeClass("hideBlock");
									$("#userPerformanceTab").removeClass("hideBlock"); 
									$("#stockValuationTab").removeClass("hideBlock");
								}
								//StockTake 17.03 Changes
								if(response[0].finalized_user != '' && response[0].finalized_user != undefined)	{															
									$("#finalizedUser").html(response[0].finalized_user);
								}
								if(response[0].source == 'STORE' && response[0].created_by != '' && response[0].created_by != undefined)	{															
									$("#createdSTUser").html(response[0].created_by);
								}else if(response[0].source == 'CENTRAL'){
									$("#createdSTUser").html("Central User");
								}
								if (response[0].start_date != null
										&& response[0].start_date != undefined
										&& response[0].start_date != "") {
									var createdDate = response[0].start_date
											.split("-");
									$("#createdSTDate").html(
											createdDate[2] + "/"
													+ createdDate[1] + "/"
													+ createdDate[0]);
								} else {
									$("#createdSTDate").html("");
								}
								if (response[0].next_due_date != null
										&& response[0].next_due_date != undefined
										&& response[0].next_due_date != "") {
									var nextDueDateArray = response[0].next_due_date
											.split("-");
									$("#nextDueId").html(
											nextDueDateArray[2] + "/"
													+ nextDueDateArray[1] + "/"
													+ nextDueDateArray[0]);
								} else {
									$("#nextDueId").html("");
								}
								if (response[0].last_completion_date != null
										&& response[0].last_completion_date != undefined
										&& response[0].last_completion_date != "") {
									var lastDateArray = response[0].last_completion_date
											.split("-");
									$("#lastCompletedId").html(
											lastDateArray[2] + "/"
													+ lastDateArray[1] + "/"
													+ lastDateArray[0]);
								} else {
									$("#lastCompletedId").html("");
								}
								$("#freqId").html(response[0].frequency);
								$("#statusId").html(
										response[0].stocktake_status);
										//SC-526,12014
										stockTakeID = response[0].stocktake_id;
								callGetSTSummaryService(response[0].stocktake_id);
								$("#stocktakeDiv").addClass("hideBlock");
								$("#stocktakeReportsDiv").removeClass(
										"hideBlock");
								}
							}
						} else {
							if (response != undefined && response.length <= 0) {
								$.fn.showCustomMsg(
										[ 'Sorry, No records found.' ],
										success, 'Stocktake');
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured' ],
												error, 'Stocktake');
							}
						}
						//}
					}).fail(
					function() {
						$.fn.showCustomMsg(
								[ 'Sorry, Some technical issue occured' ],
								error, 'Stocktake');
					}).always(function() {
				// stopLoading();
			});
}
/*function reframeStocktakePrint(response){
	var reframeCont =stockTakePrint;
	if(response.frequency_code == 'A'){
			reframeCont ="Name: "+response.stocktake_name +" | Date:"+mobiDateChange(response.start_date) +" | Type: "+response.source;
	}else{
		if(response.next_due_date != null && response.next_due_date != ''){
			reframeCont ="Name: "+response.stocktake_name +" | Date:"+mobiDateChange(response.next_due_date) +" | Type: "+response.source;
		}else {
			reframeCont ="Name: "+response.stocktake_name +" | Date: "+mobiDateChange(response.start_date) +" | Type: "+response.source;;
		}
	}
	stockTakePrint = reframeCont;
}*/
function mobiDateChange(data){
	var dateCont = data.split("-")[2]+"/"+data.split("-")[1]+"/"+data.split("-")[0];
	return dateCont;
}
function showSubCateMore(subCateRes){
	var depDisp = '';
	var allDeptArray = new Array();
	var allDeptComp = '';
	var hyperlinkValue = '';
	var rtnLabel = '';
	var titleDept = '';
	if (subCateRes.sub_cat_name != undefined) {
		allDeptComp = subCateRes.dept_list + (subCateRes.cat_list !='' ? (subCateRes.dept_list == '' ? subCateRes.cat_list : ','+subCateRes.cat_list) : '')
					+(subCateRes.sub_cat_list !='' ? ((subCateRes.dept_list != '' ||subCateRes.cat_list!= '') ?  ','+subCateRes.sub_cat_list : subCateRes.sub_cat_list)  : '')
					+(subCateRes.seg_list !='' ? ((subCateRes.dept_list != '' ||subCateRes.cat_list!= '' || subCateRes.sub_cat_list !='') ?  ','+subCateRes.seg_list : subCateRes.seg_list)  : '')
		allDeptArray = allDeptComp.split(",");
		if (allDeptArray.length == 0) {
			rtnLabel = '<label></label>';
		} else if (allDeptArray.length == 1) {
			depDisp = allDeptArray[0];
			rtnLabel = '<label>' + depDisp + '</label>';
		} else if (allDeptArray.length == 2) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 3) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 4) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 5) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 6) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4]+ "," + allDeptArray[5];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 7) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4]+ "," + allDeptArray[5]+ "," + allDeptArray[6];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 8) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4]+ "," + allDeptArray[5]+ "," + allDeptArray[6]+ "," + allDeptArray[7];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 9) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4]+ "," + allDeptArray[5]+ "," + allDeptArray[6]+ "," + allDeptArray[7] + "," + allDeptArray[8];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length == 10) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4]+ "," + allDeptArray[5]+ "," + allDeptArray[6]+ "," + allDeptArray[7] + "," + allDeptArray[8]+ "," + allDeptArray[9];
			rtnLabel = '<label>' + depDisp + '</label>';
		}else if (allDeptArray.length > 10) {
			depDisp = allDeptArray[0] + "," + allDeptArray[1]+ "," + allDeptArray[2]+ "," + allDeptArray[3]+ "," + allDeptArray[4] +","+ allDeptArray[5] + "," + allDeptArray[6]+ "," + allDeptArray[7]+ "," + allDeptArray[8]+ "," + allDeptArray[9] +" and ";
			hyperlinkValue = allDeptArray.length - 10 + " more";
			for ( var i = 10; i < allDeptArray.length; i++) {
				if (titleDept.length == 0) {
					titleDept = allDeptArray[i];
				} else {
					titleDept = titleDept + "," + allDeptArray[i];
				}

			}
			rtnLabel = '<label>' + depDisp + '<a class="moreNumber"  title="'
					+ titleDept + '">+' + hyperlinkValue + '</a></label>';
		}
	}
	return rtnLabel;
};

function callEditSTDetailsService(stocktakeId) {
	var editDetailsParam = {
		"iv_session_id" : "1005",
		"iv_st_id" : stocktakeId
	};
	console.log(getSTDetailsForEditUrl + ' ' + JSON.stringify(editDetailsParam));
	$.ajax({
		type : "POST",
		url : getSTDetailsForEditUrl,
		data : JSON.stringify(editDetailsParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(function(response) {
			if(response != undefined && response.length > 0
					&& response[0].stocktake_id != undefined){
				if(response[0].lock_flag == 'Y'){
					$("#dialog-hierarchy").dialog("close");
					stopLoading();
					$.fn.showInformationSTMsg('Stocktake');
				}else{
					globalValueForStocktakeDtls = response;
					loadArray = response;
					$('#editSTdateselect').multiDatesPicker('resetDates');
					$("#editStockTakeName").val(response[0].stocktake_name);
					var startDate = response[0].start_date.split("-");
					var endDate = response[0].end_date.split("-");
					$("#dateFromEdit").val( startDate[2] + "/" + startDate[1] + "/" + startDate[0]);
					$("#enddateEdit").val( endDate[2] + "/" + endDate[1] + "/" + endDate[0]);
					$("#editFreqSelectOptions").val(response[0].freq_code);
					editSTFreq = response[0].freq_code;
					// We should allow the user to edit all the STORE stock
					// take, only restriction is we should not allow the user to
					// edit the frequency of ADHOC stock take(1.e) without
					// frequency.
					if (response[0].freq_code == "A") {// A for adhoc stocktake
						$("#editFreqSelectOptions").prop("disabled", true);
					} else {
						$("#editFreqSelectOptions").removeAttr("disabled");
					}
					
					if (response[0].freq_code == "99" || response[0].freq_code == "20") {// A for adhoc stocktake
						$('#datePickEdit-input').val('');
						$('#datePick').multiDatesPicker('resetDates');
						$("#editSTdateselect").removeClass("hideBlock");
						$('#editFreqSelectOptions').val(response[0].freq_code);
						var dateList=[];
						response[0].stocktake_dates=response[0].stocktake_dates.split(' ').join('');
						dateList=response[0].stocktake_dates.split(','); 
						selectedDatesForEdit=dateList;
						var dateArray=[];
						for(var i=0;i<dateList.length;i++){
							dateArray.push(new Date(dateList[i]));	
						}
						if(dateList.length>=1){
							$('#editSTdateselect').multiDatesPicker('addDates',dateArray);
						}
						dateArray = '';
					} else {
						$("#editSTdateselect").addClass("hideBlock");
					}
					
					$("#weeksEditST").val(response[0].weeks);
					prepareArticleHierarchySets(response, $('#dialog-hierarchy'));
					var a = [];
					$('.deptDrpDwnChkBx').each(function() {
						if ($(this).is(":checked")) {
							a.push($(this).next().text());
							console.log($(this).next().text());
						}
					});
					$("#editSTDeptDrpDwnLabel").attr('title', a.toString());
					stopLoading();
					bindEditStockTakeEvents();
				}
			}else{
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured' ],
						error, 'Stocktake');
			}
		}).fail(function() {
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured' ],
						error, 'Stocktake');
		}).always(function() {
			stopLoading();
		});

}
function populateExcludeIncludeArticlesForEdit(stoktakeId, excludeFlag) {
	var reqParam = {
		"iv_article_no" : "",
		"iv_barcode_flag" : "N",
		"iv_article_barcode" : "",
		"iv_exclude_flag" : excludeFlag,
		"iv_gen_srch" : "N",
		"iv_st_id" : stoktakeId,
		"iv_site" : $('#posSite').val(),		//4 fields added
		"iv_sap" : encSapPwd,
		"iv_userid" : $('#loginUserId').val(),
		"iv_sales_org" : $("#salesOrg").val(),
		"iv_upload_soh_flag" : "N"
	};

	console.log(getSTArticleDetailsUrl + ' ' + JSON.stringify(reqParam));
	$
			.ajax({
				type : "POST",
				url : getSTArticleDetailsUrl,
				data : JSON.stringify(reqParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						// console.log(JSON.stringify(response));
						if (response != undefined && response.length > 0
								&& response[0].article_number != undefined) {
							if (excludeFlag == "Y") {
								$("#parameterListExcludeEdit")
										.append(
												'<li><label class="articleBasicLabel" id="'
														+ response[0].article_number
														+ '">'
														+ response[0].article_description
														+ '</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>');
							} else if (excludeFlag == "N") {
								$("#parameterListIncludeEdit")
										.append(
												'<li><label class="articleBasicLabel" id="'
														+ response[0].article_number
														+ '">'
														+ response[0].article_description
														+ '</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>');
								$("#dialog-hierarchy").dialog("open");
							}
						}
					}).fail(function() {
			}).always(function() {
				// stopLoading();
			});
}
function clearEditSTDialog() {
	$('#editSTArticleH').prop('checked', false);
	$('#editSTArticleHierarchyId').addClass('hideBlock');
	$("#editStockTakeName").val('');
	$("#dateFromEdit").val('');
	$("#enddateEdit").val('');
	$("#editFreqSelectOptions").val('');
	$("#weeksEditST").val('');
	$("#parameterListExcludeEdit").html('');
	$("#parameterListIncludeEdit").html('');
	$("#editSTArticleHierarchyId").find('.deptlst').html('');
	$("#editSTArticleHierarchyId").find('.parentCatDiv').html('');
	$("#editSTArticleHierarchyId").find('.parentSCatDiv').html('');
	$("#editSTArticleHierarchyId").find('.parentSegDiv').html('');
	$("#editSTArticleH").removeAttr("checked");
	$("#overrrideSTChkBox").prop("checked", false);
	$("#editReasonSelectBox").val("Select a reason");
	$("#editReasonSelectBox").prop("disabled", true);
	$("#overrideReasonOtherTxt").val("");
	$("#overrideReasonOtherTxt").prop("disabled", true);
	$("#delSTChkBox").prop("checked", false);
	$('#dialog-hierarchy').find('.deptlst')
			.find('input[name="departmentList"]').prop('checked', false);// unselects
																			// all
																			// dept
																			// check
																			// box
																			// in
																			// article
																			// hierarchy
	$('#editSTDeptDrpDwnUl').find("input[type=checkbox]").each(function() {// unselect
																			// all
																			// dept
																			// checkbox
		$(this).prop('checked', false);
	});
	deptSet = {};
	catSet = {};
	scatSet = {};
	segSet = {};
}
/**
 * To populate the percentage for the base count,missed articles and variance
 * report tab
 * 
 * @param stoktakeId
 */
function callGetSTSummaryService(stoktakeId) {
	var reqParam = {
		"iv_st_id" : stoktakeId,
		"iv_completed_flag" : getSTDetailsToAll.stocktake_status =="COMPLETED" ? 'Y' : 'N'
	};

	console.log(getSTSummaryUrl + ' ' + JSON.stringify(reqParam));
	$
			.ajax({
				type : "POST",
				url : getSTSummaryUrl,
				data : JSON.stringify(reqParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						// console.log(JSON.stringify(response));
						if (response != undefined && response.length > 0
								&& response[0].stocktake_name != undefined) {
							var baspr = formatTo2DecimalPlaces(response[0].base_percentage);
							var missedpr = formatTo2DecimalPlaces(response[0].missed_percentage);
							var varpr = formatTo2DecimalPlaces(response[0].variance_percentage);
							$("#baseCountTabLabel")
									.html(
											"1. Base Count ("
													+ baspr
													+ "%)<label class='tabStatus'>&nbsp;</label>");
							$("#missedArtTabLabel")
									.html(
											"2. Missed Articles ("
													+ missedpr
													+ "%)<label class='tabStatus'>&nbsp;</label>");
							$("#varReportTabLabel")
									.html(
											"3. Variance Report ("
													+ varpr
													+ "%)<label class='tabStatus'>&nbsp;</label>");
							variablePercentage = varpr;
							missedPercentage = missedpr;
							basePercentage = baspr;
							assignTickCrossMark(baspr, "baseCountTabli");
							assignTickCrossMark(missedpr, "missedArtTabli");
							assignTickCrossMark(varpr, "varReportTabli");
						} else {
							$("#baseCountTabLabel").html("1. Base Count");
							$("#missedArtTabLabel").html("2. Missed Articles");
							$("#varReportTabLabel").html("3. Variance Report");
						}
						loadBaseCountReport();
						//stopLoading();
					}).fail(function() {
						stopLoading();
			}).always(function() {
				// stopLoading();
			});
}
function callGetSTSummaryServiceOnAllTab(stoktakeId) {
	var reqParam = {
		"iv_st_id" : stoktakeId
	};

	console.log(getSTSummaryUrl + ' ' + JSON.stringify(reqParam));
	$
			.ajax({
				type : "POST",
				url : getSTSummaryUrl,
				data : JSON.stringify(reqParam),
				beforeSend : function() {
					startLoading();
				}
			})
			.done(
					function(response) {
						if (response != undefined && response.length > 0
								&& response[0].stocktake_name != undefined) {
							var baspr = formatTo2DecimalPlaces(response[0].base_percentage);
							var missedpr = formatTo2DecimalPlaces(response[0].missed_percentage);
							var varpr = formatTo2DecimalPlaces(response[0].variance_percentage);
							$("#baseCountTabLabel")
									.html(
											"1. Base Count ("
													+ baspr
													+ "%)<label class='tabStatus'>&nbsp;</label>");
							$("#missedArtTabLabel")
									.html(
											"2. Missed Articles ("
													+ missedpr
													+ "%)<label class='tabStatus'>&nbsp;</label>");
							$("#varReportTabLabel")
									.html(
											"3. Variance Report ("
													+ varpr
													+ "%)<label class='tabStatus'>&nbsp;</label>");
							variablePercentage = varpr;
							missedPercentage = missedpr;
							basePercentage = baspr;
							assignTickCrossMark(baspr, "baseCountTabli");
							assignTickCrossMark(missedpr, "missedArtTabli");
							assignTickCrossMark(varpr, "varReportTabli");
						} else {
							$("#baseCountTabLabel").html("1. Base Count");
							$("#missedArtTabLabel").html("2. Missed Articles");
							$("#varReportTabLabel").html("3. Variance Report");
						}
					}).fail(function() {
						stopLoading();
			}).always(function() {
			});
}
function assignTickCrossMark(prVal, listId) {
	if ($("#" + listId).hasClass("ui-tabs-status-allOk")) {
		$("#" + listId).removeClass("ui-tabs-status-allOk");
	}
	if ($("#" + listId).hasClass("ui-tabs-status-errors")) {
		$("#" + listId).removeClass("ui-tabs-status-errors");
	}
	if (listId == "missedArtTabli") {

		if (Number(prVal) > 0 || missedArticleCompletionFlag == 'Y') {
			$("#" + listId).addClass("ui-tabs-status-allOk");
		} else {
			$("#" + listId).addClass("ui-tabs-status-errors");
		}
	} else {
		if (Number(prVal) > 0) {
			$("#" + listId).addClass("ui-tabs-status-allOk");
		} else {
			$("#" + listId).addClass("ui-tabs-status-errors");
		}
	}

}

function callChangeSTModeService() {
	var reqParam = {
		"iv_st_mode" : $("#stocktakeModeRadio input[type=radio]:checked").val(),
		"iv_recpt_ibt_adjs" : "",
		"iv_seq_mode" : ""

	};

	console.log(changeSTModeUrl + ' ' + JSON.stringify(reqParam));
	$.ajax({
		type : "POST",
		url : changeSTModeUrl,
		data : JSON.stringify(reqParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(
			function(response) {
				// console.log(JSON.stringify(response));

				if (response != undefined && response.length > 0) {
					if (response[0].msg_type == "S") {// Defect_3280
						$.fn.showCustomMsg(
								[ 'Stocktake mode updated successfully.' ],
								success, 'Change Stocktake Mode');
					} else {
						$.fn.showCustomMsg([ response[0].msg_string ], error,
								'Change Stocktake Mode');
					}
				} else {
					$.fn.showCustomMsg(
							[ 'Sorry, Some technical issue occured' ], error,
							'Change Stocktake Mode');
				}
			}).fail(
			function() {
				$.fn.showCustomMsg([ 'Sorry, Some technical issue occured' ],
						error, 'Change Stocktake Mode');
			}).always(function() {
		stopLoading();
	});
}

function populateLocationInQuickAction(area) {
	var content = '';
	area.find('.formWrapperContentPopup').html('');

	if (responseLocationDropDown.length > 0) {
		for ( var i = 0; i < responseLocationDropDown.length; i++) {
			content = '<div class="quickActionLocs" locId='
					+ responseLocationDropDown[i].st_location_id
					+ ' locName='
					+ responseLocationDropDown[i].st_location_name
					+ '><p class="notes"><strong>'
					+ responseLocationDropDown[i].st_location_name
					+ ':</strong>'
					+ '<input type="radio" name="action'
					+ i
					+ '" value="ACTIVATE" id="a'
					+ i
					+ '"><label for="a'
					+ i
					+ '" class="labelText">Activate</label>'
					+ '<input type="radio" name="action'
					+ i
					+ '" value="DEACTIVATE" id="d'
					+ i
					+ '"><label for="d'
					+ i
					+ '" class="labelText">Deactivate</label>'
					+ '</p><div class="parameter"><table class="plainTable" cellspacing="0"><tr>'
					+ '<td width="8px"><input type="radio" id="co'
					+ i
					+ '" name="op'
					+ i
					+ '" value="AllSubLoc"></td>'
					+ '<td><label for="co'
					+ i
					+ '">All Sub-locations</label></td></tr><tr><td><input type="radio" id="do'
					+ i + '" name="op' + i + '" value="Range"></td>'
					+ '<td><label for="do' + i
					+ '">From</label><input type="#" id="from' + i
					+ '" class="textbox numberBox"> to <input type="#" id="to'
					+ i + '" class="textbox numberBox"></td>'
					+ '</tr></table></div></div>';

			area.find('.formWrapperContentPopup').append(content);
		}
	}
}

function callSTUpdateLocations() {
	var reqParam = getUpdateLocationsParam();

	if (reqParam.location_list.length == 0) {
		$.fn.showCustomMsg([ 'Location is mandatory' ], error,
				'Update Stocktake Locations');
	} else {
		console.log(reportSTUpdateLocationUrl + ' ' + JSON.stringify(reqParam));
		$
				.ajax({
					type : "POST",
					url : reportSTUpdateLocationUrl,
					data : JSON.stringify(reqParam),
					beforeSend : function() {
						startLoading();
					}
				})
				.done(
						function(response) {
							// console.log(JSON.stringify(response));
							if (response != undefined && response.length > 0) {
								if (response[0].msg_typ == "S") {
									$.fn
											.showCustomMsg(
													[ 'Stocktake locations updated successfully.' ],
													success,
													'Update Stocktake Locations');
								} else {
									$.fn.showCustomMsg(
											[ response[0].msg_string ], error,
											'Update Stocktake Locations');
								}
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured' ],
												error,
												'Update Stocktake Locations');
							}
						}).fail(
						function() {
							$.fn.showCustomMsg(
									[ 'Sorry, Some technical issue occured' ],
									error, 'Update Stocktake Locations');
						}).always(function() {
					// stopLoading();
				});
	}
}

function getUpdateLocationsParam() {
	var locationList = [];
	var subLocStrArray;

	$('#stLocHierarchyId').find('.locLst input[type="checkbox"]:checked').each(
			function() {
				subLocStrArray = new Array();
				$('#stLocHierarchyId').find('.parentSublocDiv').find(
						'input[locId="' + $(this).val()
								+ '"][type="checkbox"]:checked').each(
						function() {
							subLocStrArray[subLocStrArray.length] = $(this)
									.val();
						});
				var locationObj = {
					iv_st_loc_id : $(this).val(),
					iv_st_loc_flg : "L",
					iv_st_loc_from_no : "",
					iv_st_loc_to_no : "",
					iv_st_loc_no_lst : subLocStrArray.join(","),
					iv_st_loc_status : "ACTIVATE"
				};
				locationList.push(locationObj);
			});

	var param = {
		"location_list" : locationList,
		"iv_st_id" : "8000000001"
	};

	return param;

}

function callSTUpdateQuickLocations() {
	var reqParam = getUpdateQuickLocationsParam();

	if (reqParam.location_list.length == 0) {
		$.fn.showCustomMsg([ 'Location is mandatory' ], error,
				'Update Stocktake Locations');
	} else if (reqParam.validationMsg.length != 0) {
		$.fn.showCustomMsg(reqParam.validationMsg, error,
				'Update Stocktake Locations');
	} else {
		console.log(reportSTUpdateLocationUrl + ' ' + JSON.stringify(reqParam));
		$
				.ajax({
					type : "POST",
					url : reportSTUpdateLocationUrl,
					data : JSON.stringify(reqParam),
					beforeSend : function() {
						startLoading();
					}
				})
				.done(
						function(response) {
							// console.log(JSON.stringify(response));
							if (response != undefined && response.length > 0) {
								if (response[0].msg_typ == "S") {
									$.fn
											.showCustomMsg(
													[ 'Stocktake locations updated successfully.' ],
													success,
													'Update Stocktake Locations');
									$('#dialog-quickActionDialog').dialog(
											"close");
								} else {
									$.fn.showCustomMsg(
											[ response[0].msg_string ], error,
											'Update Stocktake Locations');
								}
							} else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured' ],
												error,
												'Update Stocktake Locations');
							}
						}).fail(
						function() {
							$.fn.showCustomMsg(
									[ 'Sorry, Some technical issue occured' ],
									error, 'Update Stocktake Locations');
						}).always(function() {
					// stopLoading();
				});
	}
}

function getUpdateQuickLocationsParam() {
	var locationList = [];
	var subLocFlag = '';
	var fromLoc = '';
	var toLoc = '';
	var status = '';
	var $selectedRadio;
	var validationMsg = [];

	$('#dialog-quickActionDialog')
			.find('.formWrapper')
			.find('.quickActionLocs')
			.each(
					function() {

						if ($(this).find('input[name^="action"][type="radio"]')
								.is(':checked')) {
							status = $(this)
									.find(
											'input[name^="action"][type="radio"]:checked')
									.val();
							$selectedRadio = $(this).find(
									'input[name^="op"][type="radio"]:checked');

							if ($selectedRadio.val() == 'AllSubLoc') {
								subLocFlag = 'A';
								fromLoc = '';
								toLoc = '';
							} else if ($selectedRadio.val() == 'Range') {
								subLocFlag = 'R';
								fromLoc = $(this).find('input[id^="from"]')
										.val();
								toLoc = $(this).find('input[id^="to"]').val();

								if (getEmptyIfNull(fromLoc) == ''
										|| getEmptyIfNull(toLoc) == '') {
									validationMsg
											.push('From & To range is mandatory for Location '
													+ $(this).attr('locName'));
								}
							} else {
								validationMsg
										.push('Sub location is mandatory for Location '
												+ $(this).attr('locName'));
							}

							var locationObj = {
								iv_st_loc_id : $(this).attr('locId'),
								iv_st_loc_flg : subLocFlag,
								iv_st_loc_from_no : fromLoc,
								iv_st_loc_to_no : toLoc,
								iv_st_loc_no_lst : "",
								iv_st_loc_status : status
							};
							locationList.push(locationObj);
						}
					});

	var param = {
		"location_list" : locationList,
		"iv_st_id" : "8000000001",
		"validationMsg" : validationMsg
	};

	return param;

}
function selectDefPrimaryDepts(depDropDownId, area, depDropDownLbl) {
	// Default Primary department as selected department
	var primaryDepts = $.parseJSON($('#primaryDept').val()).data;
	var userPrimaryDepts = primaryDepts[$("#posSite").val()];
	area.find('#' + depDropDownId).find('input[type="checkbox"]').prop(
			'checked', false);
	area.find('.deptlst').find('input[name="departmentList"]').prop('checked',
			false);
	if (userPrimaryDepts != undefined && userPrimaryDepts.length > 0) {
		for ( var i = 0; i < userPrimaryDepts.length; i++) {
			$("#" + depDropDownId).find("#" + userPrimaryDepts[i]).prop(
					'checked', true);// To check the drop down
			area.find('.deptlst').find("#" + userPrimaryDepts[i]).prop(
					'checked', true);// To check dept in article hierarchy
		}
	}
	area.find('.deptLstCnt')
			.text(
					area.find('.deptlst').find(
							'input[name="departmentList"]:checked').length);

}

function buildStockTakePrintDetails(stockTakeRow) {
	stockTakePrint = "Name: "
			+ stockTakeRow.find('td:first').find('label').html() + " | ";
	var nextDueDate = stockTakeRow.find('td:eq(3)').html();
	if(nextDueDate!=''){
		stockTakePrint += "Date: " + stockTakeRow.find('td:eq(3)').html() + " | ";
	}
	if (stockTakeRow.find('td:eq(4)').html() == '') {
		stockTakePrint += "Type: CENTRAL";
	} else {
		stockTakePrint += "Type: " + stockTakeRow.find('td:eq(4)').html();
	}

}
function validateCreateStockTake() {
	var endDateFlag=false;
	var rtnFlag = true;
   if($('#freqSelectOptions').val()!='A' && $('#freqSelectOptions').val()!=""){
	   endDateFlag=true;
   }
	if (getEmptyIfNull($('#stockTakeName').val()) == '') {
		$.fn.showCustomMsg([ 'Please enter a valid Stocktake Name.' ], error,
				'Create Stocktake');
		rtnFlag = false;
		return rtnFlag;
	}
	if (!validateStartDate($("#dateFromCreate").val(), "Create Stocktake")) {
		rtnFlag = false;
		return rtnFlag;
	} else if (isPastDate($("#dateFromCreate").val())) {
		$.fn.showCustomMsg([ 'Start Date should not be a past date.' ], error,
				'Create Stocktake');
		rtnFlag = false;
		return rtnFlag;
	} else{
		if (endDateFlag && (!validateEndDate($("#enddateCreate").val(), "Create Stocktake"))) {
			rtnFlag = false;
			return rtnFlag;		
		} else if (endDateFlag && (isPastDate($("#dateFromCreate").val()))) {
			$.fn.showCustomMsg([ 'End Date should not be a past date.' ], error,
			'Create Stocktake');
	rtnFlag = false;
	return rtnFlag;
        }
	}
	if (diff($("#dateFromCreate").val(), $("#enddateCreate").val()) > (365 * 2)) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Maximum duration should be 104 weeks.' ], error,
				'Create Stocktake');
		return rtnFlag;
	}
	
	if ($("#datePick").is(":visible") && ($("#datePick").val()=="")) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Fiscal date should not be empty' ], error,
		'Create Stocktake');
		return rtnFlag;
	} else if ($("#datePick").is(":visible") && ($("#datePick").val()!="")) {
		var dateArray=$("#datePick-input").val().split(",")
		for(var i=0;i<dateArray.length;i++){
        var dateFrom = $("#dateFromCreate").val();
        var dateTo = $("#enddateCreate").val();
        var dateCheck = dateArray[i];

        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");
        var c = dateCheck.split("/");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);

   if(check >= from && check <= to){	
   }else{	
	$.fn.showCustomMsg([ 'Range Date should be correct.' ], error,
	'Create Stocktake');
   rtnFlag = false;
   return rtnFlag;
   break;
}
		}
		
	} 
	if ($("#freqSelectOptions").val() == "0"
			&& Number($("#weeksCreateST").val()) > 52) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Maximum weeks should be 52 weeks.' ], error,
				'Create Stocktake');
		return rtnFlag;
	}
	if ($("#freqSelectOptions").val() == "0"
			&& Number($("#weeksCreateST").val()) == 0) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Weeks cannot be 0.' ], error, 'Create Stocktake');
		return rtnFlag;
	}
	return rtnFlag;
}
function validateUpdateStockTake() {
	var rtnFlag = true;

	if (!validateDates($("#dateFromEdit").val(), $("#enddateEdit").val(),
			"Update Stocktake")) {
		rtnFlag = false;
	} else if (isPastDate($("#dateFromEdit").val())) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Start Date should not be a past date.' ], error,
				'Update Stocktake');
	} else if (isPastDate($("#enddateEdit").val())) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'End Date should not be a past date.' ], error,
				'Update Stocktake');
	} else if ($("#editSTdateselect").is(":visible") && ($("#editSTdateselect").val()=="")) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Fiscal date should not be empty' ], error,
		'Create Stocktake');
		return rtnFlag;
	} else if ($("#editSTdateselect").is(":visible") && ($("#editSTdateselect").val()!="")) {
		var dateArray=$("#datePickEdit-input").val().split(",");
		for(var i=0;i<dateArray.length;i++){
        var dateFrom = $("#dateFromEdit").val();
        var dateTo = $("#enddateEdit").val();
        var dateCheck = dateArray[i];

        var d1 = dateFrom.split("/");
        var d2 = dateTo.split("/");
        var c = dateCheck.split("/");

        var from = new Date(d1[2], parseInt(d1[1])-1, d1[0]);  // -1 because months are from 0 to 11
        var to   = new Date(d2[2], parseInt(d2[1])-1, d2[0]);
        var check = new Date(c[2], parseInt(c[1])-1, c[0]);

   if(check >= from && check <= to){	
   }else{	
	$.fn.showCustomMsg([ 'Range Date should be correct.' ], error,
	'Create Stocktake');
   rtnFlag = false;
   return rtnFlag;
   break;
   }
		}
		
	}
	if (diff($("#dateFromEdit").val(), $("#enddateEdit").val()) > (365 * 2)) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Maximum duration should be 104 weeks.' ], error,
				'Update Stocktake');
	}	
	
	if ($("#editFreqSelectOptions").val() == 0
			&& Number($("#weeksEditST").val()) > 104) {
		rtnFlag = false;
		$.fn.showCustomMsg([ 'Maximum duration should be 104 weeks.' ], error,
				'Update Stocktake');
	}
	return rtnFlag;
}

function prepareArticleHierarchySets(inArray, area) {
	var hierFlag = false;
	for ( var i = 0; i < inArray.length; i++) {
		inArray[i].old_flag = "Y";// While editing to know if it was already
									// existing or new one to determine
									// I/D/Itemremove
		if (inArray[i].dept_id != null && inArray[i].dept_id != undefined
				&& !(inArray[i].dept_id in deptSet)) {
			deptSet[inArray[i].dept_id] = true;
		}
		if (inArray[i].category != null && inArray[i].category != undefined
				&& !(inArray[i].category in catSet)) {
			catSet[inArray[i].category] = true;
			hierFlag = true;
		}
		if (inArray[i].sub_category != null
				&& inArray[i].sub_category != undefined
				&& !(inArray[i].sub_category in scatSet)) {
			scatSet[inArray[i].sub_category] = true;
		}
		if (inArray[i].segment != null && inArray[i].segment != undefined
				&& !(inArray[i].segment in segSet)) {
			segSet[inArray[i].segment] = true;
		}

		if (inArray[i].article_number != null
				&& inArray[i].article_number != undefined) {
			area
					.find("#parameterListIncludeEdit")
					.append(
							'<li><label class="articleBasicLabel" id="'
									+ inArray[i].article_number
									+ '">'
									+ inArray[i].article_number
									+ "-"
									+ inArray[i].article_description
									+ '</label><label class="closeMessage" onclick="addArticleToArray('
									+ inArray[i].article_number
									+ ',true);$(this).parent().remove();">&nbsp;</label></li>');
		}
	}
	if(hierFlag && editSTStatus!='OPEN'){
	//if(hierFlag){
		$('#editSTArticleH').prop('checked',true);
		$("#editSTArticleHierarchyId").removeClass('hideBlock');
	}
	loadArray = inArray;
	setDefaultDepDropDwnValuesForEditST();
}
function setDefaultDepDropDwnValuesForEditST() {
	// default dept drop down
	$('#editSTDeptDrpDwnUl').find("input[type=checkbox]").each(function() {// unselct
																			// all
		$(this).prop('checked', false);
	});
	$('#editSTDeptDrpDwnUl').find("input[type=checkbox]").each(function() {// set
																			// def
																			// values
		if ($(this).attr('id') != 'editSTallDeptChkBox') {
			if (deptSet[$(this).val()]) {
				$(this).prop('checked', true);
			}
		}
	});

	onChangeDeptDropDown("editSTDeptDrpDwnUl", "editSTallDeptChkBox",
			"editSTDeptDrpDwnLabel", $("#dialog-hierarchy"));
}
function findDeleteOrRemoveItem(item, itemIndex) {
	var returnFlag = 'D';
	if (item.old_flag == "Y") {
		returnFlag = "OLD";
	}
	return returnFlag;
}
function removeItemsFromLoadArray(removeArray) {
	// remove the item from loadArray;
	if (removeArray.length > 0) {
		for ( var i = 0; i < removeArray.length; i++) {
			loadArray.splice(i, 1);
		}
	}
}
function addArticleToArray(articleNo, deleteFlag) {
	var removeArray = [];
	if (deleteFlag) {
		for ( var i = 0; i < loadArray.length; i++) {
			if ((loadArray[i].article_number == articleNo)
					|| (loadArray[i].iv_article_lst == articleNo)) {
				var delRemoveFlag = findDeleteOrRemoveItem(loadArray[i], i);
				if (delRemoveFlag == "D") {
					loadArray[i].update_flag = 'D';
				} else if (delRemoveFlag == "OLD") {
					removeArray.push(i);
				}
			}
		}
		//removeItemsFromLoadArray(removeArray);

	} else {
		var obj = new StockTakeItemInfo(loadArray[0].start_date,
				loadArray[0].end_date, loadArray[0].freq_code,
				loadArray[0].weeks, '', '', '', '', articleNo,
				$('#loginUserId').val(), '','2');
		obj.update_flag = 'I';

		loadArray.push(obj);
	}
}

function addDeptToArray(dept, deleteFlag) {
	var removeArray = [];
	if (deleteFlag) {
		for ( var i = 0; i < loadArray.length; i++) {
			if ((loadArray[i].dept_id == dept)
					|| (loadArray[i].iv_dept_id == dept)) {
				var delRemoveFlag = findDeleteOrRemoveItem(loadArray[i], i);
				if (delRemoveFlag == "D") {
					loadArray[i].update_flag = 'D';
				} else if (delRemoveFlag == "OLD") {
					removeArray.push(i);
				}
				delete deptSet[dept];
			}
		}
		removeItemsFromLoadArray(removeArray);
	} else {
		var obj = new StockTakeItemInfo(loadArray[0].start_date,
				loadArray[0].end_date, loadArray[0].freq_code,
				loadArray[0].weeks, dept, '', '', '', '', $('#loginUserId')
						.val(), '','1');
		obj.update_flag = 'I';
		deptSet[dept] = true;
		loadArray.push(obj);
	}
}

function addCatgToArray(catg, deleteFlag) {
	var removeArray = [];
	if (deleteFlag) {
		for ( var i = 0; i < loadArray.length; i++) {
			if ((loadArray[i].category == catg)
					|| (loadArray[i].iv_cat_id == catg)) {
				var delRemoveFlag = findDeleteOrRemoveItem(loadArray[i], i);
				if (delRemoveFlag == "D") {
					loadArray[i].update_flag = 'D';
				} else if (delRemoveFlag == "OLD") {
					removeArray.push(i);
				}
				delete catSet[catg];
			}
		}
		removeItemsFromLoadArray(removeArray);
	} else {
		var obj = new StockTakeItemInfo(loadArray[0].start_date,
				loadArray[0].end_date, loadArray[0].freq_code,
				loadArray[0].weeks, '', catg, '', '', '', $('#loginUserId')
						.val(), '','1');
		obj.update_flag = 'I';
		catSet[catg] = true;
		loadArray.push(obj);
	}
}

function addScatToArray(scat, deleteFlag) {
	var removeArray = [];
	if (deleteFlag) {
		for ( var i = 0; i < loadArray.length; i++) {
			if ((loadArray[i].sub_category == scat)
					|| (loadArray[i].iv_sub_cat_id == scat)) {
				var delRemoveFlag = findDeleteOrRemoveItem(loadArray[i], i);
				if (delRemoveFlag == "D") {
					loadArray[i].update_flag = 'D';
				} else if (delRemoveFlag == "OLD") {
					removeArray.push(i);
				}
				delete scatSet[scat];
			}
		}
		removeItemsFromLoadArray(removeArray);
	} else {
		var obj = new StockTakeItemInfo(loadArray[0].start_date,
				loadArray[0].end_date, loadArray[0].freq_code,
				loadArray[0].weeks, '', '', scat, '', '', $('#loginUserId')
						.val(), '','1');
		obj.update_flag = 'I';
		scatSet[scat] = true;
		loadArray.push(obj);
	}
}

function addSegToArray(seg, deleteFlag) {
	var removeArray = [];
	if (deleteFlag) {
		for ( var i = 0; i < loadArray.length; i++) {
			if ((loadArray[i].segment == seg)
					|| (loadArray[i].iv_seg_id == seg)) {
				var delRemoveFlag = findDeleteOrRemoveItem(loadArray[i], i);
				if (delRemoveFlag == "D") {
					loadArray[i].update_flag = 'D';
				} else if (delRemoveFlag == "OLD") {
					removeArray.push(i);
				}
				delete segSet[seg];
			}
		}
		removeItemsFromLoadArray(removeArray);
	} else {
		var obj = new StockTakeItemInfo(loadArray[0].start_date,
				loadArray[0].end_date, loadArray[0].freq_code,
				loadArray[0].weeks, '', '', '', seg, '', $('#loginUserId')
						.val(), '','1');
		obj.update_flag = 'I';
		segSet[seg] = true;
		loadArray.push(obj);
	}
}
function formatTo2DecimalPlaces(inputString) {
	var str = Number(inputString).toFixed(2);
	if (str.substr(str.length - 3, str.length) == ".00") {
		return str.substr(0, str.length - 3);
	} else {
		return str;
	}
}
function callArticleBasicSearchService(article, stockTakeType) {
	var barCodeFlag = article.length > 7 ? true : false;
	var reqParamBasicService = '';
	
		reqParamBasicService = {
					  "iv_article_no": article,
					  "iv_article_barcode": "",
					  "iv_barcode_flag": "N",
					  "iv_exclude_flag": "",
					  "iv_gen_srch": "Y",
					  "iv_st_id": "",
					  "iv_st_loc_id": "",
					  "iv_st_loc_no": "",
					  "iv_st_aisle": "",
					  "iv_st_side": "",
					  "iv_st_bay": "",
					  "iv_platform": "",
					  "iv_userid": $('#loginUserId').val(),
					  "iv_site": $("#posSite").val(),
					  "iv_sales_org":  $("#salesOrg").val(),
					  "iv_sap": encSapPwd,
					  "iv_upload_soh_flag" : "N"
			};
	
	console.log(getSTArticleDetailsUrl + ' '
			+ JSON.stringify(reqParamBasicService));
	$
			.ajax({
				type : "POST",
				url : getSTArticleDetailsUrl,
				data : JSON.stringify(reqParamBasicService),
				beforeSend : function() {
				}
			})
			.done(
					function(response) {
						// console.log(JSON.stringify(response));
						if (response != undefined && response.length > 0
								&& response[0].article_number != undefined && response[0].msg_typ != 'L' && response[0].msg_typ != 'U' && response[0].msg_typ != 'F') {
							if (response.length == 1) {

								if (stockTakeType == "CREATE") {
									if ($("#parameterListInclude").find(
											"#" + response[0].article_number).length > 0) {
										$.fn.showCustomMsg(
												[ 'Article added already.' ],
												error, 'Create Stocktake');
									} else {
										//if(response[0].perpetual_flag !=undefined && response[0].perpetual_flag == 'Y'){
											$("#parameterListInclude")
													.append(
															'<li><label class="articleBasicLabel" id="'
																	+ response[0].article_number
																	+ '">'
																	+ response[0].article_number
																	+ "-"
																	+ response[0].article_description
																	+ '</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>');
											$("#searchBoxInclude").val('');
										/*}else {
											 $.fn.showCustomMsg(['Non PI articles are not allowed to create stocktake'],error,'Create Stocktake');
										}*/
									}
								} else if (stockTakeType == "EDIT") {
									if ($("#parameterListIncludeEdit").find(
											"#" + response[0].article_number).length > 0) {
										$.fn.showCustomMsg(
												[ 'Article added already.' ],
												error, 'Edit StockTake');
									} else {
										//if(response[0].perpetual_flag !=undefined && response[0].perpetual_flag == 'Y'){
											$("#parameterListIncludeEdit")
													.append(
															'<li><label class="articleBasicLabel" id="'
																	+ response[0].article_number
																	+ '">'
																	+ response[0].article_number
																	+ "-"
																	+ response[0].article_description
																	+ '</label><label class="closeMessage" onclick="$(this).parent().remove()">&nbsp;</label></li>');
											$("#searchBoxIncludeEdit").val('');
										/*}else {
											 $.fn.showCustomMsg(['Non PI articles are not allowed to create stocktake'],error,'Create Stocktake');
										}*/
									}
								}

							} else if (response.length > 1) {
								// selectOption
								if (stockTakeType == "CREATE") {
									$.fn.loadArticlePopUpForStkAdjReportST(
											response,
											onAddToListCreateStocktake, '',
											onArticleTdSelectInStocktake,
											checkboxOption, $(
													"#searchBoxInclude").val());
								} else if (stockTakeType == "EDIT") {
									$.fn.loadArticlePopUpForStkAdjReportST(
											response, onAddToListEditStocktake,
											'', onArticleTdSelectInStocktake,
											checkboxOption, $(
													"#searchBoxIncludeEdit")
													.val());
								}

							}

						} else {
							// articleBasicList[articleBasicList.length] =
							// article;
							if (response != undefined && response.length <= 0) {
								$.fn
										.showCustomMsg(
												[ 'Sorry, No results found for the search criteria. Please try again.' ],
												success, 'Stocktake');
							}else if ( response[0].msg_typ == 'F') {
								var articleDisplayError = isNaN(response[0].article_number) ? response[0].article_number : 'Article '+response[0].article_number;
								$.fn
								.showCustomMsg(
										[  articleDisplayError +' - '+response[0].msg_string ],
										error, 'Stocktake');
							} else if(response[0].msg_typ == 'L' || response[0].msg_typ == 'U') {
								
									$.fn.showCustomMsg(
											[ 'Sorry, No results found for the search criteria. Please try again.' ],
											error, 'Stocktake');
							}else {
								$.fn
										.showCustomMsg(
												[ 'Sorry, Some technical issue occured.' ],
												error, 'Stocktake');
							}
						}
					}).fail(function() {
			}).always(function() {
			});
}
var onSelect = function(event) {
	$elem = $(this);
	var list = [];
	var tempArray = [];
	list = Object.keys($elem.data('checkedObj'));
	for ( var i = 0; i < list.length; i++)
		tempArray.push(list[i].split('-')[0]);
	selectedArticle = tempArray.join(',');
	loadOrderTabs('', new orderParam(selectedArticle, '', '', '', $(
			'#orderType').val(), $('#orderStatus').val(), '', '', '', ''));
};

var onArticleTdSelectInStocktake = function(event) {
	event.stopPropagation();
	var $elem = $(this);
	var $tr = $elem.closest('tr');
	var obj = $tr.data('obj');
	var len = 0;
	var $selectBtn = $('#dialog-mulipleArticles #addtolist');
	var checkedObj = $selectBtn.data('checkedObj');
	checkedObj = checkedObj == undefined ? {} : checkedObj;
	if ($elem.is(':checked')) {
		obj.checked = true;
		checkedObj[obj.article_number + '-' + obj.article_description] = obj;
	} else {
		obj.checked = false;
		delete checkedObj[obj.article_number + '-' + obj.article_description];
	}
	len = Object.keys(checkedObj).length;
	if (len == 0) {
		$selectBtn.text('Add to List').addClass('hideBlock');
	} else {
		$selectBtn.text('Add to List (' + (len > 9 ? len : '0' + len) + ')')
				.removeClass('hideBlock').data('checkedObj', checkedObj);
	}

};
var onAddToListCreateStocktake = function(event) {
	$elem = $(this);
	var list = [];
	list = Object.keys($elem.data('checkedObj'));
	var data = getCheckObj($elem.data('checkedObj'));
	var tempMsg = ' Non PI articles ';
	var flag = false;
	for ( var i = 0; i < list.length; i++) {
		if ($("#parameterListInclude").find("#" + list[i].split('-')[0]).length > 0) {
			// $.fn.showCustomMsg(['Article added already.'],error,'Create
			// Stocktake');
		} else {
			if(data[i].perpetual_flag !=undefined && data[i].perpetual_flag == 'Y'){
				$("#searchBoxInclude").val(list[i]);
				$("#parameterListInclude")
						.append(
								'<li><label class="articleBasicLabel" id="'
										+ $("#searchBoxInclude").val().split('-')[0]
										+ '">'
										+ $("#searchBoxInclude").val()
										+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
			}else{
				flag = true;
				tempMsg+= ',"'+data[i].article_number+'"';
			}
			$("#searchBoxInclude").val('');
		}
	}
	tempMsg+=' are not allowed to create stocktake';
	if(flag){
		 $.fn.showCustomMsg([tempMsg],error,'Create Stocktake');
	}
};
var getCheckObj  = function(obj){
	var newAr = [];
	for(key in obj){
		newAr.push(obj[key]);
	}
	return newAr;
};
var onAddToListEditStocktake = function(event) {
	$elem = $(this);
	var list = [];
	list = Object.keys($elem.data('checkedObj'));
	var data = getCheckObj($elem.data('checkedObj'));
	var tempMsg = ' Non PI articles ';
	var flag = false;
	for ( var i = 0; i < list.length; i++) {
		if ($("#parameterListIncludeEdit").find("#" + list[i].split('-')[0]).length > 0) {
			// $.fn.showCustomMsg(['Article added already.'],error,'Edit
			// Stocktake');
		} else {
			
			if(data[i].perpetual_flag !=undefined && data[i].perpetual_flag == 'Y'){
				$("#searchBoxIncludeEdit").val(list[i]);
				$("#parameterListIncludeEdit")
						.append(
								'<li><label class="articleBasicLabel" id="'
										+ $("#searchBoxIncludeEdit").val().split(
												'-')[0]
										+ '">'
										+ $("#searchBoxIncludeEdit").val()
										+ '</label><label class="closeMessage" onclick="removeArticleFromBasicList($(this).parent());">&nbsp;</label></li>');
				$("#searchBoxIncludeEdit").val('');
			}else{
				flag = true;
				tempMsg+= ',"'+data[i].article_number+'"';
			}
		}
	}
	tempMsg+=' are not allowed to create stocktake';
	if(flag){
		 $.fn.showCustomMsg([tempMsg],error,'Create Stocktake');
	}
};
function removeArticleFromBasicList(parentElem) {
	$(parentElem).remove();

}

var triggerOverrideYes = function(e) {
	var $elem = e.data.msg;
	$elem.dialog('close');
	$("#editReasonSelectBox").removeAttr("disabled");// enable the reason
														// drop down

};

var triggerOverrideNo = function(e) {

	var $elem = e.data.msg;
	$elem.dialog('close');
	$("#overrrideSTChkBox").prop('checked', false);
	$("#editReasonSelectBox").prop("disabled", true);// disbale the reason
														// drop down
};

$("#STModeTab").click(function() {
	var reqParam = {};
	console.log(stockTakeModeUrl + ' ' + JSON.stringify(reqParam));
	$.ajax({
		type : "POST",
		url : stockTakeModeUrl,
		data : JSON.stringify(reqParam),
		beforeSend : function() {
			startLoading();
		}
	}).done(function(response) {
		// console.log(JSON.stringify(response));
		stockTakeMode = response[0].stocktake_mode;
		if (stockTakeMode == "T") {
			$("#stocktakeModeRadio").find("PL").attr('checked', true);
		} else {
			$("#stocktakeModeRadio").find("PN").attr('checked', true);
		}
	});
});

