var storeTempData = '';
var staffTempData = '';
var drpDwnVal = '';
var noOfResultArticle = '';
var NDF = "Sorry, no results found for your search criteria. Please try again.";
var error_1pos = '<div class="ContentTableWrapper errorCon " style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart">'
		+ '<div class="tableTitle msgDiv nodataMessage  errorDiv" id="errorMsgDiv"><h4 id="errorMsg"></h4></div></div></div>';
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="performance"]:checked';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="performanceHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
$(document)
		.ready(
				function() {
					$('.display-graph').hide();
					$('.display-table').css('background-image',
							'url(../../images/tab-selected.jpg)').css(
							'background-position', '3px 4px');
					$('.display-graph').css('background-image',
							'url(../../images/graph-unselected.jpg)').css(
							'background-position', '4px 5px');
					;
					$('.display-graph').removeClass('display');

					$("#dateFrom").datepicker({
						dateFormat : "dd/mm/yy",
						zIndex : 50
					/*
					 * onClose : function(selectedDate) { $("#dateTo").focus(); }
					 */

					});

					$("#dateTo").datepicker({
						dateFormat : "dd/mm/yy",
						zIndex : 50

					});

					$("label").tooltip({
						position : {
							my : "left top",
							at : "left top-40"
						}
					});

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

					var presentDate = (newDate + "/" + (newMonth) + "/" + today
							.getFullYear());
					$('#dateTo').val(presentDate);

					var previousDate = new Date();
					previousDate.setTime(previousDate.getTime()
							- (60 * 60 * 24 * 1000));

					var newPrevDate = previousDate.getDate();
					var newPrevMonth = previousDate.getMonth() + 1;

					if (newPrevDate < 10) {
						newPrevDate = '0' + newPrevDate;
					}
					if (newPrevMonth < 10) {
						newPrevMonth = '0' + newPrevMonth;
					}

					var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth)
							+ "/" + previousDate.getFullYear());
					$('#dateFrom').val(oneDayBefCurDate);

					$('input[name="Performance"]').click(function() {
						if ($(this).attr('id') == 'bothRadio') {
							$('.posDropDiv').addClass('hideBlock');
							visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="performance"]:checked';
							hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="performanceHide"]';
							bindDynaCtrlInputChange();
						}
						else if ($(this).attr('id') == 'salesRadio') {
							$('.posDropDiv').removeClass('hideBlock');
							visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="performance"]:checked,select[name="posDropDwn"]';
							hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="performanceHide"],input[name="posDropDwnHide"]';
							bindDynaCtrlInputChange();
						} 
						else if ($(this).attr('id') == 'POSRadio') {
							visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"],input[name="performance"]:checked,select[name="posDropDwn"]';
							hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"],input[name="performanceHide"],input[name="posDropDwnHide"]';
							bindDynaCtrlInputChange();
						}
					});
					// Code for accordion
					$("#accordion").accordion({
						header : "h3.mainAccordion",
						collapsible : true,
						heightStyle : "content"
					});

					$('#POSRadio').click(function() {
						$("#salesRadio").removeAttr("checked");
						$("#bothRadio").removeAttr("checked");
						$(".posDropDiv").removeClass('hideBlock');
						$("#posDropDwn").val('');
					});

					$('#salesRadio').click(function() {
						$("#POSRadio").removeAttr("checked");
						$("#bothRadio").removeAttr("checked");
						$(".posDropDiv").removeClass('hideBlock');
						$("#posDropDwn").val('');
					});

					$('#bothRadio').click(function() {
						$("#salesRadio").removeAttr("checked");
						$("#POSRadio").removeAttr("checked");
						$(".posDropDiv").addClass('hideBlock');
						$("#posDropDwn").val('');
					});

					$('a[href="#tabs-1"]').parent()
							.click(
									function() {
										if ($("#tabs-1 #priceTable tbody")
												.text().length > 0
												&& !$("#priceTable").is(
														":visible")) {
											$("#priceTable").show();
										}
									});

					$('a[href="#tabs-2"]').parent().click(function() {
						if ($("#tabs-2 #transTable tbody").text().length > 0) {
						}
					});

					$('a[href="#tabs-3"]').parent()
							.click(
									function() {
										if ($("#tabs-3 #voidTransTable tbody")
												.text().length > 0) {
										}
									});

					$('a[href="#tabs-4"]').parent()
							.click(
									function() {
										if ($("#tabs-3 #voidTransTable tbody")
												.text().length > 0) {
										}
									});

					$('a[href="#tabs-5"]').parent()
							.click(
									function() {
										if ($("#tabs-5 #noSalesTable tbody")
												.text().length > 0) {
										}
									});

					$('a[href="#tabs-6"]').parent().click(function() {
						if ($("#tabs-6 #refundTable tbody").text().length > 0) {
						}
					});

					$('a[href="#subTabs-3"]')
							.parent()
							.click(
									function() {
										if ($("#subTabs-3 #edrTable tbody")
												.text().length > 0) {
										}

										if ($('.display-graph').hasClass(
												'display')) {
											if ($('#edrTable tbody').length > 1 /*
																				 * ||
																				 * ($('#subTabs-1
																				 * .errorCon').attr("style").split[':'])[1].trim() !=
																				 * "visible"
																				 */)
												$("#edr-graph-block")
														.removeClass(
																'hideBlock');
											if (!$('#tt-graph-block').hasClass(
													'hideBlock'))
												$("#tt-graph-block").addClass(
														'hideBlock');
											if (!$('#scan-graph-block')
													.hasClass('hideBlock'))
												$("#scan-graph-block")
														.addClass('hideBlock');
											if (!$('#cash-graph-block')
													.hasClass('hideBlock'))
												$("#cash-graph-block")
														.addClass('hideBlock');
											// $("#edrTable").addClass('hideBlock');
											$("#edrTable").hide();
										} else {
											// if($('#edrTable tbody').length >
											// 1 /*|| ($('#subTabs-1
											// .errorCon').attr("style").split[':'])[1].trim()
											// != "visible"*/)
											{
												// $("#edrTable").removeClass('hideBlock');
												if ($(
														"#subTabs-3 #edrTable tbody")
														.text().length > 0) {
													$("#edrTable").show();
												}
											}
										}
									});

					$('a[href="#subTabs-1"]')
							.parent()
							.click(
									function() {
										if ($('.display-graph').hasClass(
												'display')) {
											if ($('#sortTable tbody:first tr').length > 1 /*
																							 * ||
																							 * ($('#subTabs-1
																							 * .errorCon').attr("style").split[':'])[1].trim() !=
																							 * "visible"
																							 */)
												$("#scan-graph-block")
														.removeClass(
																'hideBlock');
											if (!$('#tt-graph-block').hasClass(
													'hideBlock'))
												$("#tt-graph-block").addClass(
														'hideBlock');
											if (!$('#edr-graph-block')
													.hasClass('hideBlock'))
												$("#edr-graph-block").addClass(
														'hideBlock');
											if (!$('#cash-graph-block')
													.hasClass('hideBlock'))
												$("#cash-graph-block")
														.addClass('hideBlock');
											// $("#sortTable").addClass('hideBlock');
											$("#sortTable").hide();
										} else {
											// if($('#sortTable tbody').length >
											// 2 /*|| ($('#subTabs-1
											// .errorCon').attr("style").split[':'])[1].trim()
											// != "visible"*/)
											{
												// $("#sortTable").removeClass('hideBlock');
												if ($(
														"#subTabs-1 #sortTable tbody")
														.text().length > 0) {
													// &&
													// ($('#subTabs-1').find(".errorCon")
													// =='' ||
													// $('#subTabs-1').find(".errorCon")
													// == undefined ||
													// $('#subTabs-1').find(".errorCon")
													// == null)) {
													$("#sortTable").show();
												}
												// else

											}
										}
									});

					$('a[href="#subTabs-2"]')
							.parent()
							.click(
									function() {
										if ($('.display-graph').hasClass(
												'display')) {
											if ($('#timeTable tbody tr').length > 1 /*
																					 * ||
																					 * ($('#subTabs-1
																					 * .errorCon').attr("style").split[':'])[1].trim() !=
																					 * "visible"
																					 */)
												$("#tt-graph-block")
														.removeClass(
																'hideBlock');

											if (!$('#scan-graph-block')
													.hasClass('hideBlock'))
												$("#scan-graph-block")
														.addClass('hideBlock');
											if (!$('#edr-graph-block')
													.hasClass('hideBlock'))
												$("#edr-graph-block").addClass(
														'hideBlock');
											if (!$('#cash-graph-block')
													.hasClass('hideBlock'))
												$("#cash-graph-block")
														.addClass('hideBlock');
											// $("#timeTable").addClass('hideBlock');
											$("#timeTable").hide();
										} else {
											// if($('#timeTable tbody').length >
											// 1 /*|| ($('#subTabs-1
											// .errorCon').attr("style").split[':'])[1].trim()
											// != "visible"*/)
											{
												// $("#timeTable").removeClass('hideBlock');
												if ($(
														"#subTabs-2 #timeTable tbody")
														.text().length > 0) {
													$("#timeTable").show();
												}

											}
										}

									});

					$('a[href="#subTabs-4"]')
							.parent()
							.click(
									function() {
										if ($('.display-graph').hasClass(
												'display')) {
											if ($('#cashTable tbody tr').length > 1 /*
																					 * ||
																					 * ($('#subTabs-1
																					 * .errorCon').attr("style").split[':'])[1].trim() !=
																					 * "visible"
																					 */)
												$("#cash-graph-block")
														.removeClass(
																'hideBlock');

											if (!$('#tt-graph-block').hasClass(
													'hideBlock'))
												$("#tt-graph-block").addClass(
														'hideBlock');
											if (!$('#edr-graph-block')
													.hasClass('hideBlock'))
												$("#edr-graph-block").addClass(
														'hideBlock');
											if (!$('#scan-graph-block')
													.hasClass('hideBlock'))
												$("#scan-graph-block")
														.addClass('hideBlock');
											// $("#cashTable").addClass('hideBlock');
											$("#cashTable").hide();
										} else {
											// if($('#cashTable tbody').length >
											// 1 /*|| ($('#subTabs-1
											// .errorCon').attr("style").split[':'])[1].trim()
											// != "visible"*/)
											{
												// $("#cashTable").removeClass('hideBlock');
												if ($(
														"#subTabs-4 #cashTable tbody")
														.text().length > 0) {
													$("#cashTable").show();
												}

											}
										}
									});

					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							$('#dateFrom').blur();
							$('#dateTo').blur();
							$('#generateReport').click();

						}

					});

					$("#generateReport")
							.click(
									function() {
										hideError();
										clearTableData();
										// $('.display-graph').addClass('display');
										var fromDate = formateDate($(
												'#dateFrom').val());
										var toDate = formateDate($('#dateTo')
												.val());
										var start = $("#dateFrom").datepicker("getDate");
								        var end = $("#dateTo").datepicker("getDate");
								        var days = (end - start) / (1000 * 60 * 60 * 24);
										$('#dateToHide').text(toDate);
										$('#dateFromHide').text(fromDate);
										var today = new Date();
										var newDate = today.getDate();
										var newMonth = today.getMonth();
										var newYear = today.getFullYear();
										var curDate = new Date(newYear, newMonth, newDate);
										var date1 = new Date();
										    
										var parts = fromDate.split('/');
										var partsLen = parts.length;
										var date1Len = fromDate.length;
										date1.setFullYear(parts[2],
												parts[1] - 1, parts[0]);
										var newTime = Number(date1.getTime());

										var dateComFrom = new Date(fromDate
												.split('/')[2], fromDate
												.split('/')[1], fromDate
												.split('/')[0]);
										var dateComTo = new Date(toDate
												.split('/')[2], toDate
												.split('/')[1], toDate
												.split('/')[0]);
										var toYear = dateComTo.getFullYear();
										var fromYear = dateComFrom
												.getFullYear();
										var toMonth = dateComTo.getMonth();
										var fromMonth = dateComFrom.getMonth();
										var toDay = dateComTo.getDate();
										var fromDay = dateComFrom.getDate();
										var rangeDate = new Date(toDate.split('/')[2],
												toDate.split('/')[1]-1, toDate.split('/')[0]);
										var date2 = new Date();
										var part = toDate.split('/');
										var partLen = part.length;
										var date2Len = toDate.length;
										date2.setFullYear(part[2], part[1] - 1,
												part[0]);

										var splittedDate = formateDate(
												$('#dateTo').val(),
												$('#dateTo').val().split('/').length)
												.split('/');
										var splittedTwo = splittedDate[0]
												+ splittedDate[1]
												+ splittedDate[2];

										newTime = Number(newTime)
												+ Number(24 * 60 * 60 * 1000
														* 90);

										if (fromDate == "") {
											showError('Please enter From Date.');
											callFrom();
										} else if (toDate == "") {
											showError('Please enter To Date.');
											callTo();
										} else if (partsLen != 3
												|| date1Len != 10
												|| fromDate.split('/')[0] > 31
												|| fromDate.split('/')[1] > 12
												|| fromDate.split('/')[2].length != 4) {
											showError('Invalid From Date.');
											callFrom();
										} else if (partLen != 3
												|| date2Len != 10
												|| toDate.split('/')[0] > 31
												|| toDate.split('/')[1] > 12
												|| toDate.split('/')[2].length != 4) {
											showError('Invalid To Date.');
											callTo();
										} else if (date1.getTime() > date2
												.getTime()) {
											showError('To Date should not be lesser than the From Date');
											callTo();
										} else if ((splittedDate[0] > 31
												|| splittedDate[1] > 12 || splittedDate[2] > 9999)
												|| isNaN(splittedTwo)) {

											showError("Invalid Date Format");
										} else if(days >1){
											showError('Date Range is more than a day.');
											callFrom();
										} else if (rangeDate > curDate) {
											showError("Future Dates are not allowed for To Date.");
											callTo();
										} else if ($('#POSRadio')
												.is(':checked')
												&& $('#posDropDwn').val() == 0) {
											showError('Please select the number of results to be displayed.');
										} else if ($('#salesRadio').is(
												':checked')
												&& $('#posDropDwn').val() == 0) {
											showError('Please select the number of results to be displayed.');
										} else if ((toYear - fromYear) == 1) {
											if (((toMonth - fromMonth) + 12) > 3) {
												showError('Date difference should not be greater than 3 months');
												callFrom();
											} else if ((((toMonth - fromMonth) + 12) == 3)
													&& (((toDay - fromDay) + 30) > 30)) {
												showError('Date difference should not be greater than 3 months');
												// callFrom();
											} else {
												starReport($('#starReport')
														.serialize());
												showOFF();
												// $('.display-graph').click();
												// $('#scan-graph-block').removeClass('hideBlock');
											}
										} 
										else if (toYear - fromYear == 0) {
											if ((toMonth - fromMonth) > 3) {
												showError('Date difference should not be greater than 3 months');
												callFrom();
											} else if (((toMonth - fromMonth) == 3)
													&& (((toDay - fromDay) + 30) > 30)) {
												showError('Date difference should not be greater than 3 months');
												callFrom();
											} else {
												starReport($('#starReport')
														.serialize());
												showOFF();
												// $('.display-graph').click();
												// $('#scan-graph-block').removeClass('hideBlock');
											}
										} else if ((toYear - fromYear) >= 2) {
											showError('Date difference should not be greater than 3 months');
											callFrom();
										} else {
											starReport($('#starReport')
													.serialize());
											showOFF();
											// $('#scan-graph-block').removeClass('hideBlock');
											// $('.display-graph').click();
										}

									});

					$(".backBtn").click(function(e) {
						window.location.href = "../login/goingHome.htm";
					});

					$("#closeLink").click(function() {
						$('#accordion').accordion({
							active : true
						});
					});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					$("label.toolTip").tooltip({
						position : {
							my : "left top",
							at : "left top-70"
						}
					});

					$("#mainTabs").tabs();
					$("#subTabs").tabs();
					$(".filterTabs").tabs();
					// $("#sortTable").hide();
					$('.display-table').click(function() {/*
															 * $(this).css('background-image',
															 * 'url(../../images/tab-selected.jpg)').css(
															 * 'background-position',
															 * '3px 4px');
															 * $('.display-graph').css('background-image',
															 * 'url(../../images/graph-unselected.jpg)').css(
															 * 'background-position',
															 * '4px 5px'); ;
															 * $('.display-graph').removeClass('display');
															 * if($('.ContentTableWrapperError').hasClass('hideBlock'))
															 * $('.tab-block').removeClass('hideBlock');
															 * $('.graph-block').addClass('hideBlock');
															 * 
															 * var tbsSelected
															 * =$("#subTabs").find("li[class$='-active'],ul[class*='-active
															 * ']").attr('aria-controls');
															 * if(tbsSelected=="subTabs-1") {
															 * if($('#sortTable
															 * tbody tr').length >
															 * 0)
															 * $("#sortTable").show(); }
															 * else
															 * if(tbsSelected=="subTabs-2") {
															 * $("#timeTable").show(); }
															 * else
															 * if(tbsSelected=="subTabs-3") {
															 * $("#edrTable").show(); }
															 * else
															 * if(tbsSelected=="subTabs-4") {
															 * $("#cashTable").show(); }
															 */
					});

					$('.display-graph').click(
							function() {
								$(this).css('background-image',
										'url(../../images/graph-selected.jpg)')
										.css('background-position', '6px 2px');
								;
								$('.display-table').css('background-image',
										'url(../../images/tab-unselected.jpg)')
										.css('background-position', '5px 1px');
								;
								/*
								 * $('.display-graph').addClass('display');
								 * console.log("inside display graph"); var
								 * tbsSelected
								 * =$("#subTabs").find("li[class$='-active'],ul[class*='-active
								 * ']").attr('aria-controls');
								 * if(tbsSelected=="subTabs-1") {
								 * if($('#sortTable tbody:first tr').length > 1 ||
								 * ($('#subTabs-1
								 * .errorCon').attr("style").split[':'])[1].trim() !=
								 * "visible")
								 * $('#scan-graph-block').removeClass('hideBlock'); }
								 * else if(tbsSelected=="subTabs-2") {
								 * if($('#timeTable tbody').length > 1 ||
								 * ($('#subTabs-1
								 * .errorCon').attr("style").split[':'])[1].trim() !=
								 * "visible")
								 * $('#tt-graph-block').removeClass('hideBlock'); }
								 * else if(tbsSelected=="subTabs-3") {
								 * if($('#edrTable tbody').length > 1 ||
								 * ($('#subTabs-1
								 * .errorCon').attr("style").split[':'])[1].trim() !=
								 * "visible")
								 * $('#edr-graph-block').removeClass('hideBlock'); }
								 * else if(tbsSelected=="subTabs-4") {
								 * if($('#cashTable tbody').length > 1 ||
								 * ($('#subTabs-1
								 * .errorCon').attr("style").split[':'])[1].trim() !=
								 * "visible")
								 * $('#cash-graph-block').removeClass('hideBlock'); }
								 * 
								 * $('.tab-block').addClass('hideBlock');
								 * 
								 */});

				});
function clearTableData() {
	$('#sortTable tbody:first').html('');
	$('#timeTable tbody:first').html('');
	$('#edrTable tbody:first').html('');
	$('#cashTable tbody:first').html('');
	$('#priceTable tbody:first').html('');
	$('#transTable tbody:first').html('');
	$('#voidTransTable tbody:first').html('');
	$('#voidArtTable tbody:first').html('');
	$('#noSalesTable tbody:first').html('');
	$('#refundTable tbody:first').html('');
}
function showOFF() {
	if ($('.ContentTableWrapperError').hasClass('hideBlock'))
		$('.tab-block').removeClass('hideBlock');
	$('.graph-block').addClass('hideBlock');
	// $("#sortTable").show();
	var tbsSelected = $("#subTabs").find(
			"li[class$='-active'],ul[class*='-active ']").attr('aria-controls');
	if (tbsSelected == "subTabs-1") {
		// if($('#sortTable tbody:first tr').length > 1 /*|| ($('#subTabs-1
		// .errorCon').attr("style").split[':'])[1].trim() != "visible"*/)
		if ($('#sortTable tbody tr').length > 0)
			$("#sortTable").show();
	} else if (tbsSelected == "subTabs-2") {
		// / if($('#timeTable tbody').length > 1 /*|| ($('#subTabs-1
		// .errorCon').attr("style").split[':'])[1].trim() != "visible"*/)
		$("#timeTable").show();
	} else if (tbsSelected == "subTabs-3") {
		// / if($('#edrTable tbody').length > 1 /*|| ($('#subTabs-1
		// .errorCon').attr("style").split[':'])[1].trim() != "visible"*/)
		$("#edrTable").show();
	} else if (tbsSelected == "subTabs-4") {
		// if($('#cashTable tbody').length > 1 /*|| ($('#subTabs-1
		// .errorCon').attr("style").split[':'])[1].trim() != "visible"*/)
		$("#cashTable").show();
	}
}
function removeError() {
	$('#subTabs-1').find(".errorCon").remove();
	$('#subTabs-2').find(".errorCon").remove();
	$('#subTabs-3').find(".errorCon").remove();
	$('#subTabs-4').find(".errorCon").remove();
	$('#tabs-1').find(".errorCon").remove();
	$('#tabs-2').find(".errorCon").remove();
	$('#tabs-3').find(".errorCon").remove();
	$('#tabs-4').find(".errorCon").remove();
	$('#tabs-5').find(".errorCon").remove();
	$('#tabs-6').find(".errorCon").remove();
	$('#tabs-7').find(".errorCon").remove();
	$('#tabs-8').find(".errorCon").remove();
	$('#tabs-9').find(".errorCon").remove();
	$('#tabs-10').find(".errorCon").remove();
}
function starReport(data) {
	if ($('#mainTabs').hasClass('ui-tabs'))
		$('#mainTabs').tabs('destroy');

	$('#mainTabs').tabs();

	$('li[aria-controls="mainTabs-1"],li[aria-controls="mainTabs-2"]')
			.removeClass('hideBlock');
	if ($('input[name="performance"]:checked').val() == 'Staff') {
		$("#mainTabs").tabs("option", "active", 0);
		$("#mainTabs #subTabs").tabs("option", "active", 0);
		$('li[aria-controls="mainTabs-2"]').addClass('hideBlock');
		serviceTeamActionReport(data);
	} else if ($('input[name="performance"]:checked').val() == 'Store') {
		$("#mainTabs").tabs("option", "active", 1);
		$("#mainTabs #filterTabs").tabs("option", "active", 0);
		$('li[aria-controls="mainTabs-1"]').addClass('hideBlock');
		serviceTeamActionReport(data);
	} else if ($('input[name="performance"]:checked').val() == 'Both') {
		$("#mainTabs").tabs("option", "active", 0);
		$("#mainTabs #subTabs").tabs("option", "active", 0);
		$("#mainTabs #filterTabs").tabs("option", "active", 0);
		$("#posDropDwn").val('5');
		serviceTeamActionReport(data);
	}
}
function serviceTeamActionReport(data) {

	backupInputParams();
	$.ajax({
		type : "get",
		url : "printStarReport.htm",
		data : data,

		beforeSend : function() {
			fullScreenLoader();
			hideError();
			removeError();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			setReportGenerationFlags();
			posOperatorPerformanceResponse(response, '');
			edrResponse(response, '');

			//statisticsSummaryResponse(response, '');
			if ($('input[name="performance"]:checked').val() == 'Both') {
				showStarTbl();
				//$("#posDropDwn").val('5');
			}
			priceMarkdownResponse(response, '');
			savedTransactionsResponse(response, '');
			voidTransactionsResponse(response, '');
			noSalesResponse(response, '');
			refundResponse(response, '');
			parseArticleSoldByDept(response, '');
			parsePriceInquiry(response, '');
			parseStaffDiscount(response, '');
			parseOneCard(response, '');
			

			//printResult(response);
			$.loader('close');
		},
		error : function() {
			showError("No Data Found.");
			$.loader('close');
		}
	});
}

function posOperatorPerformanceResponse(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.posOperatorList.msg;
	}
	catch(e){}
	var posOperatorList = '';
	var posTenderingTimeList = '';
	var posCashOutList = '';
	var posOperatorOppList = '';
	var posTenderingTimeOppList = '';
	var posCashOutOppList = '';

	try {
	posOperatorList = output.posOperatorList.posOperatorList;
	posTenderingTimeList = output.posTenderingTimeList.posTenderingTimeList;
	posCashOutList = output.posCashOutList.posCashOutList;

	posOperatorOppList = output.posOperatorOppList.posOperatorOppList;
	posTenderingTimeOppList = output.posTenderingTimeOppList.posTenderingTimeOppList;
	posCashOutOppList = output.posCashOutOppList.posCashOutOppList;
	}
	catch(e) {
		console.log("any problem happened!"+e);
	}
	//console.log("posOperatorList:" + posOperatorList);
/*	if ((posOperatorOppList.length == 1 && (posOperatorOppList[0].cashierFirstName != null
			|| posOperatorOppList[0].cashierFirstName != undefined
			|| posOperatorOppList[0].cashierFirstName != ""
			&& posOperatorOppList[0].cashierLastName != null
			|| posOperatorOppList[0].cashierLastName != undefined || posOperatorOppList[0].cashierLastName != ""))
			&& (posTenderingTimeList.length == 1 && (posTenderingTimeList[0].cashierFirstName != null
					|| posTenderingTimeList[0].cashierFirstName != undefined
					|| posTenderingTimeList[0].cashierFirstName != ""
					&& posTenderingTimeList[0].cashierLastName != null
					|| posTenderingTimeList[0].cashierLastName != undefined || posTenderingTimeList[0].cashierLastName != ""))
			&& (posCashOutList.length == 1 && (posCashOutList[0].cashierFirstName != null
					|| posCashOutList[0].cashierFirstName != undefined
					|| posCashOutList[0].cashierFirstName != ""
					&& posCashOutList[0].cashierLastName != null
					|| posCashOutList[0].cashierLastName != undefined || posCashOutList[0].cashierLastName != ""))) {

		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}*/

	hideError();
	//console.log("msg" + msg);
	var posflag = false;
	// $('#subTabs-1 .errorCon').remove();
	if (msg != null
			&& msg != undefined
			&& posOperatorList != null
			&& posOperatorList != undefined
			&& posOperatorList.length != 0
			&& posOperatorOppList != null
			&& posOperatorOppList != undefined
			&& posOperatorOppList.length != 0) {
		currentPage = 1;
		recordCount = '';
		var opp_tot = 0;
		var lead_tot = 0;
		var content = '';
		if (posOperatorList != null && posOperatorOppList != null) {
			if (noOfResult > posOperatorList.length)
				noOfResult = posOperatorList.length;
			if (posOperatorList.length < noOfResult)

			{
				noOfResult = posOperatorList.length;
			}

			for ( var i = 0; i < noOfResult; i++) {

				/*
				 * posOperatorList[i].cashierNumber =
				 * (posOperatorList[i].cashierNumber != null &&
				 * posOperatorList[i].cashierNumber != undefined) ?
				 * posOperatorList[i].cashierNumber : '';
				 */
				posOperatorList[i].cashierFirstName = (posOperatorList[i].cashierFirstName != null && posOperatorList[i].cashierFirstName != undefined) ? posOperatorList[i].cashierFirstName
						: '';
				posOperatorList[i].cashierLastName = (posOperatorList[i].cashierLastName != null && posOperatorList[i].cashierLastName != undefined) ? posOperatorList[i].cashierLastName
						: '';
				/*posOperatorList[i].articlesPerMinute = (posOperatorList[i].articlesPerMinute != null && posOperatorList[i].articlesPerMinute != undefined) ? Number(
						posOperatorList[i].articlesPerMinute).toFixed(2)
						: '';
				posOperatorList[i].salesQuantityBaseUoM = (posOperatorList[i].salesQuantityBaseUoM != null && posOperatorList[i].salesQuantityBaseUoM != undefined) ? Number(
						posOperatorList[i].salesQuantityBaseUoM).toFixed(0)
						: '';*/

				posOperatorOppList[i].cashierFirstName = (posOperatorOppList[i].cashierFirstName != null && posOperatorOppList[i].cashierFirstName != undefined) ? posOperatorOppList[i].cashierFirstName
						: '';
				posOperatorOppList[i].cashierLastName = (posOperatorOppList[i].cashierLastName != null && posOperatorOppList[i].cashierLastName != undefined) ? posOperatorOppList[i].cashierLastName
						: '';
				/*posOperatorOppList[i].articlesPerMinute = (posOperatorOppList[i].articlesPerMinute != null && posOperatorOppList[i].articlesPerMinute != undefined) ? Number(
						posOperatorOppList[i].articlesPerMinute).toFixed(2)
						: '';
				posOperatorOppList[i].salesQuantityBaseUoM = (posOperatorOppList[i].salesQuantityBaseUoM != null && posOperatorOppList[i].salesQuantityBaseUoM != undefined) ? Number(
						posOperatorOppList[i].salesQuantityBaseUoM).toFixed(0)
						: '';*/
				posOperatorOppList[i].cashierNumber = (posOperatorOppList[i].cashierNumber != null && posOperatorOppList[i].cashierNumber != undefined) ? posOperatorOppList[i].cashierNumber
						: '';
				lead_tot += Number(posOperatorList[i].articlesPerMinute);
				opp_tot += Number(posOperatorOppList[i].articlesPerMinute);
				posflag = true;
				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/* + posOperatorList[i].cashierNumber+' - ' */
						+ posOperatorList[i].cashierFirstName + ' '
						+ posOperatorList[i].cashierLastName + '</td>'
						+ '<td class="rightValue ">'

						+ Number(posOperatorList[i].articlesPerMinute).toFixed(2)

						/* + posOperatorList[i].articlesPerMinute */

						+ '</td>' + '<td class="rightValue">'
						+ Number(posOperatorList[i].salesQuantityBaseUoM).toFixed(0) + '</td>'
						+ '<td class="rightValue">' + '</td>'
						+ '<td class="leftValue">'
						/* + posOperatorList[i].cashierNumber+' - ' */
						+ posOperatorOppList[i].cashierFirstName + ' '
						+ posOperatorOppList[i].cashierLastName + '</td>'
						+ '<td class="rightValue ">'
						+ Number(posOperatorOppList[i].articlesPerMinute).toFixed(2) + '</td>'
						+ '<td class="rightValue ">'
						+ Number(posOperatorOppList[i].salesQuantityBaseUoM).toFixed(0)
						+ '</td></tr>';
			}

		}
		$('#sortTable tbody:first').html('');
		$('#sortTable tbody:first').append(content);
		showPOSTbl();

		/*
		 * for(var i=0;i<noOfResult;i++)
		 * drawChart(posOperatorList[i].articlesPerMinute,posOperatorList[i].cashierFirstName,posOperatorList[i].cashierLastName,posOperatorList[i].salesQuantityBaseUoM,lead_tot,'#scan_lead');
		 * for(var i=0;i<noOfResult;i++)
		 * drawChart(posOperatorOppList[i].articlesPerMinute,posOperatorOppList[i].cashierFirstName,posOperatorOppList[i].cashierLastName,posOperatorOppList[i].salesQuantityBaseUoM,opp_tot,'#scan_opps');
		 * 
		 * var high1 = posOperatorList[0].articlesPerMinute; var low1 =
		 * posOperatorOppList[0].articlesPerMinute; var avg1 =
		 * (Number(high1)+Number(low1))/2 ; var high2 =
		 * posOperatorList[0].salesQuantityBaseUoM; var low2 =
		 * posOperatorOppList[0].salesQuantityBaseUoM; var avg2 =
		 * (Number(high2)+Number(low2))/2 ;
		 * drawRight("Scanning",Number(avg1).toFixed(2),Number(high1).toFixed(2),Number(low1).toFixed(2),"Total
		 * Quantity",Number(avg2).toFixed(2),Number(high2).toFixed(2),Number(low2).toFixed(2),'#scan_right');
		 */}
	if (!posflag) {
		// showPOSTbl();
		//console.log("inside postable");
		$('.scanTableopp thead th').addClass('hideBlock');
		$('#sortTable').addClass('hideBlock');
		$('#sortTable').hide();
		$('#subTabs-1 .errorCon').remove();
		$('#subTabs-1 ').append(error_1pos);
		$('#subTabs-1 .msgDiv h4').text(NDF);
		$('#subTabs-1 .msgDiv ').addClass('nodataMessage');
		$('#subTabs-1 .msgDiv ').removeClass('errorDiv');
	}
	var noOfResult = $('#posDropDwn').val();
	var timeflag = false;
	if (msg != null
			&& msg != undefined
			&& posTenderingTimeList != null
			&& posTenderingTimeList != undefined
			&& posTenderingTimeList.length > 0
			&& posTenderingTimeOppList != null
			&& posTenderingTimeOppList != undefined
			&& posTenderingTimeOppList.length > 0) {

		currentPage = 1;
		var opp_tot = 0;
		var lead_tot = 0;
		recordCount = '';
		var contentTime = '';
		if (posTenderingTimeList != null && posTenderingTimeOppList != null) {
			if (noOfResult > posTenderingTimeList.length)
				noOfResult = posTenderingTimeList.length;
			if (posTenderingTimeList.length < noOfResult)

			{
				noOfResult = posTenderingTimeList.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				/*
				 * posTenderingTimeList[i].cashierNumber =
				 * (posTenderingTimeList[i].cashierNumber != null &&
				 * posTenderingTimeList[i].cashierNumber != undefined) ?
				 * posTenderingTimeList[i].cashierNumber : '';
				 */
				posTenderingTimeList[i].cashierFirstName = (posTenderingTimeList[i].cashierFirstName != null && posTenderingTimeList[i].cashierFirstName != undefined) ? posTenderingTimeList[i].cashierFirstName
						: '';
				posTenderingTimeList[i].cashierLastName = (posTenderingTimeList[i].cashierLastName != null && posTenderingTimeList[i].cashierLastName != undefined) ? posTenderingTimeList[i].cashierLastName
						: '';
				/*posTenderingTimeList[i].tenderingTime = (posTenderingTimeList[i].tenderingTime != null && posTenderingTimeList[i].tenderingTime != undefined) ? Number(
						posTenderingTimeList[i].tenderingTime).toFixed(2)
						: '';*/

				posTenderingTimeOppList[i].cashierFirstName = (posTenderingTimeOppList[i].cashierFirstName != null && posTenderingTimeOppList[i].cashierFirstName != undefined) ? posTenderingTimeOppList[i].cashierFirstName
						: '';
				posTenderingTimeOppList[i].cashierLastName = (posTenderingTimeOppList[i].cashierLastName != null && posTenderingTimeOppList[i].cashierLastName != undefined) ? posTenderingTimeOppList[i].cashierLastName
						: '';
				/*posTenderingTimeOppList[i].tenderingTime = (posTenderingTimeOppList[i].tenderingTime != null && posTenderingTimeOppList[i].tenderingTime != undefined) ? Number(
						posTenderingTimeOppList[i].tenderingTime).toFixed(2)
						: '';*/
				posTenderingTimeOppList[i].cashierNumber = (posTenderingTimeOppList[i].cashierNumber != null && posTenderingTimeOppList[i].cashierNumber != undefined) ? posTenderingTimeOppList[i].cashierNumber
						: '';
				lead_tot += Number(posTenderingTimeList[i].tenderingTime);
				opp_tot += Number(posTenderingTimeOppList[i].tenderingTime);
				timeflag = true;
				contentTime += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/* + posTenderingTimeList[i].cashierNumber+' - ' */
						+ posTenderingTimeList[i].cashierFirstName + ' '
						+ posTenderingTimeList[i].cashierLastName + '</td>'
						+ '<td class="rightValue">'
						+ Number(posTenderingTimeList[i].tenderingTime).toFixed(2) + '</td>'
						+ '<td class="rightValue">' + '</td>'
						+ '<td class="leftValue">'
						/* + posTenderingTimeOppList[i].cashierNumber+' - ' */
						+ posTenderingTimeOppList[i].cashierFirstName + ' '
						+ posTenderingTimeOppList[i].cashierLastName + '</td>'
						+ '<td class="rightValue ">'
						+ Number(posTenderingTimeOppList[i].tenderingTime).toFixed(2)
						+ '</td></tr>';
			}

		}
		$('#timeTable tbody:first').html('');
		$('#timeTable tbody:first').append(contentTime);
		showPOSTbl();
	/*	for ( var i = 0; i < noOfResult; i++)
			drawChart(posTenderingTimeList[i].tenderingTime,
					posTenderingTimeList[i].cashierFirstName,
					posTenderingTimeList[i].cashierLastName, '', lead_tot,
					'#tt_lead');
		for ( var i = 0; i < noOfResult; i++)
			drawChart(posTenderingTimeOppList[i].tenderingTime,
					posTenderingTimeOppList[i].cashierFirstName,
					posTenderingTimeOppList[i].cashierLastName, '', opp_tot,
					'#tt_opps');

		var high1 = posOperatorList[0].tenderingTime;
		var low1 = posOperatorOppList[0].tenderingTime;
		var avg1 = (Number(high1) + Number(low1)) / 2;
		var high2 = '';
		var low2 = '';
		var avg2 = '';
		drawRight("Tendering Time", Number(avg1).toFixed(2), Number(high1)
				.toFixed(2), Number(low1).toFixed(2), " ", avg2, high2, low2,
				'#tt_right');*/
	}
	if (!timeflag) {
		$('#timeTable').addClass('hideBlock');
		$('#timeTable').hide();
		$('#subTabs-2 .errorCon').remove();
		$('#subTabs-2 ').append(error_1pos);
		$('#subTabs-2 .msgDiv h4').text(NDF);
		$('#subTabs-2 .msgDiv ').addClass('nodataMessage');
		$('#subTabs-2 .msgDiv ').removeClass('errorDiv');
	}
	var noOfResult = $('#posDropDwn').val();
	var cashflag = false;
	if (msg != null
			&& msg != undefined
			&& posCashOutList != null
			&& posCashOutList != undefined
			&& posCashOutList.length > 0
			&& posCashOutOppList != null
			&& posCashOutOppList != undefined
			&& posCashOutOppList.length > 0) {
		var opp_tot = 0;
		var lead_tot = 0;
		currentPage = 1;
		recordCount = '';
		var contentTime = '';
		if (posCashOutList != null && posCashOutOppList != null) {
			if (noOfResult > posCashOutList.length)
				noOfResult = posCashOutList.length;
			if (posCashOutList.length < noOfResult)

			{
				noOfResult = posCashOutList.length;
			}

			for ( var i = 0; i < noOfResult; i++) {

				/*
				 * posCashOutList[i].cashierNumber =
				 * (posCashOutList[i].cashierNumber != null &&
				 * posCashOutList[i].cashierNumber != undefined) ?
				 * posCashOutList[i].cashierNumber : '';
				 */
				posCashOutList[i].cashierFirstName = (posCashOutList[i].cashierFirstName != null && posCashOutList[i].cashierFirstName != undefined) ? posCashOutList[i].cashierFirstName
						: '';
				posCashOutList[i].cashierLastName = (posCashOutList[i].cashierLastName != null && posCashOutList[i].cashierLastName != undefined) ? posCashOutList[i].cashierLastName
						: '';
				/*posCashOutList[i].cashOutCount = (posCashOutList[i].cashOutCount != null && posCashOutList[i].cashOutCount != undefined) ? Number(
						posCashOutList[i].cashOutCount).toFixed(0)
						: '';
				posCashOutList[i].cashOutAmount = (posCashOutList[i].cashOutAmount != null && posCashOutList[i].cashOutAmount != undefined) ? Number(
						posCashOutList[i].cashOutAmount).toFixed(2)
						: '';*/

				posCashOutOppList[i].cashierFirstName = (posCashOutOppList[i].cashierFirstName != null && posCashOutOppList[i].cashierFirstName != undefined) ? posCashOutOppList[i].cashierFirstName
						: '';
				posCashOutOppList[i].cashierLastName = (posCashOutOppList[i].cashierLastName != null && posCashOutOppList[i].cashierLastName != undefined) ? posCashOutOppList[i].cashierLastName
						: '';
				/*posCashOutOppList[i].cashOutAmount = (posCashOutOppList[i].cashOutAmount != null && posCashOutOppList[i].cashOutAmount != undefined) ? Number(
						posCashOutOppList[i].cashOutAmount).toFixed(2)
						: '';
				posCashOutOppList[i].cashOutCount = (posCashOutOppList[i].cashOutCount != null && posCashOutOppList[i].cashOutCount != undefined) ? Number(
						posCashOutOppList[i].cashOutCount).toFixed(0)
						: '';*/
				posCashOutOppList[i].cashierNumber = (posCashOutOppList[i].cashierNumber != null && posCashOutOppList[i].cashierNumber != undefined) ? posCashOutOppList[i].cashierNumber
						: '';
				lead_tot += Number(posCashOutList[i].cashOutCount);
				opp_tot += Number(posCashOutOppList[i].cashOutCount);
				cashflag = true;
				contentTime += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/* + posCashOutList[i].cashierNumber+' - ' */
						+ posCashOutList[i].cashierFirstName + ' '
						+ posCashOutList[i].cashierLastName + '</td>'
						+ '<td class="rightValue ">'
						+ Number(posCashOutList[i].cashOutAmount).toFixed(2) + '</td>'
						+ '<td class="rightValue">'
						+ Number(posCashOutList[i].cashOutCount).toFixed(0) + '</td>'
						+ '<td class="rightValue"> </td>'
						+ '<td class="leftValue">'
						/* + posCashOutOppList[i].cashierNumber+' - ' */
						+ posCashOutOppList[i].cashierFirstName + ' '
						+ posCashOutOppList[i].cashierLastName + '</td>'
						+ '<td class="rightValue ">'
						+ Number(posCashOutOppList[i].cashOutAmount).toFixed(2) + '</td>'
						+ '<td class="rightValue ">'
						+ Number(posCashOutOppList[i].cashOutCount).toFixed(0) + '</td></tr>';
			}

		}
		$('#cashTable tbody:first').html('');
		$('#cashTable tbody:first').append(contentTime);
		showPOSTbl();
		/*for ( var i = 0; i < noOfResult; i++)
			drawChart(posCashOutList[i].cashOutCount,
					posCashOutList[i].cashierFirstName,
					posCashOutList[i].cashierLastName,
					posCashOutList[i].cashOutAmount, lead_tot, '#cash_lead');
		for ( var i = 0; i < noOfResult; i++)
			drawChart(posCashOutOppList[i].cashOutCount,
					posCashOutOppList[i].cashierFirstName,
					posCashOutOppList[i].cashierLastName,
					posCashOutOppList[i].cashOutAmount, opp_tot, '#cash_opps');

		var high1 = posCashOutList[0].cashOutCount;
		var low1 = posCashOutOppList[0].cashOutCount;
		var avg1 = (Number(high1) + Number(low1)) / 2;
		var high2 = posCashOutList[0].cashOutAmount;
		var low2 = posCashOutOppList[0].cashOutAmount;
		var avg2 = (Number(high2) + Number(low2)) / 2;
		drawRight("Cashout Count", Number(avg1).toFixed(2), Number(high1)
				.toFixed(2), Number(low1).toFixed(2), "Cashot Amount", Number(
				avg2).toFixed(2), Number(high2).toFixed(2), Number(low2)
				.toFixed(2), '#cash_right');*/
	}
	if (!cashflag) {
		$('#cashTable').addClass('hideBlock');
		$('#cashTable').hide();
		$('#subTabs-4 .errorCon').remove();
		$('#subTabs-4 ').append(error_1pos);
		$('#subTabs-4 .msgDiv h4').text(NDF);
		//console.log("Cash table no data found");
		$('#subTabs-4 .msgDiv ').addClass('nodataMessage');
		$('#subTabs-4 .msgDiv ').removeClass('errorDiv');
	}
}
function drawChart(art, fname, lname, qty, tot, display) {
	var fullPercent = 70;
	var width = 0;
	var content = '';
	if (tot == 0)
		tot = 1;
	var average = ((Number(art) / tot) * 100).toFixed(2);
	width = ((Number(art) / tot) * fullPercent).toFixed(2);
	content += '<label class="graph-bar" title="' + fname + ' ' + lname + '">'
			+ '<span style=" width: ' + width + '%;">&nbsp;</span>'
			+ '<label class="count">' + art + '</label><label class="per">'
			+ average + '%' + '</label>';
	if (qty != '')
		content += '<label class="qty">Qty.: ' + qty + '</label></label>';

	$(display).append(content);

}

function drawRight(title1, avg1, high1, low1, title2, avg2, high2, low2,
		display) {
	var content = '';

	content += '<label class="head">' + title1
			+ '</label><label class="avg">Avg</br><span>' + avg1
			+ '</span></label><label class="high">Highest</br><span>' + high1
			+ '</span></label><label class="low">Lowest</br><span>' + low1
			+ '</span></label>';
	if (title2 != "")
		content += '<label class="head">' + title2 + '</label>';
	if (avg2 != '')
		content += '<label class="avg">Avg</br><span>' + avg2
				+ '</span></label>';
	if (high2 != '')
		content += '<label class="high">Highest</br><span>' + high2
				+ '</span></label>';
	if (low2 != '')
		content += '<label class="low">Lowest</br><span>' + low2
				+ '</span></label>';
	$(display).html(content);
}

function edrResponse(response, value) {

	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.posEDRList.msg;
	}
	catch(e){}
	// msg=null;
	var posEDRList = '';
	var posEDROppList = '';
	var flag = false;
	try {
	posEDRList = output.posEDRList.posEDRList;
	posEDROppList = output.posEDROppList.posEDROppList;
	}
	catch(e){}

	if ((posEDROppList.length == 1 && (posEDROppList[0].cashierFirstName != null
			|| posEDROppList[0].cashierFirstName != undefined
			|| posEDROppList[0].cashierFirstName != ""
			&& posEDROppList[0].posCashOutOppList != null
			|| posEDROppList[0].cashierLastName != undefined || posEDROppList[0].cashierLastName != ""))) {

		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined
			&& posEDRList != null
			&& posEDRList != undefined
			&& posEDRList.length > 0
			&& posEDROppList != null
			&& posEDROppList != undefined
			&& posEDROppList.length > 0) {

		currentPage = 1;
		recordCount = '';
		var contentTime = '';
		var opp_tot = 0;
		var lead_tot = 0;

		if (posEDRList.length < noOfResult)

		{
			noOfResult = posEDRList.length;
		}

		if (noOfResult > posEDRList.length)
			noOfResult = posEDRList.length;

		for ( var i = 0; i < noOfResult; i++) {

			/*
			 * posEDRList[i].cashierNumber = (posEDRList[i].cashierNumber !=
			 * null && posEDRList[i].cashierNumber != undefined) ?
			 * posEDRList[i].cashierNumber : '';
			 */

			posEDRList[i].cashierFirstName = (posEDRList[i].cashierFirstName != null && posEDRList[i].cashierFirstName != undefined) ? posEDRList[i].cashierFirstName
					: '';
			posEDRList[i].cashierLastName = (posEDRList[i].cashierLastName != null && posEDRList[i].cashierLastName != undefined) ? posEDRList[i].cashierLastName
					: '';
			/*posEDRList[i].percentageEDR = (posEDRList[i].percentageEDR != null && posEDRList[i].percentageEDR != undefined) ? Number(
					posEDRList[i].percentageEDR).toFixed(0)
					: '';*/

			posEDROppList[i].cashierFirstName = (posEDROppList[i].cashierFirstName != null && posEDROppList[i].cashierFirstName != undefined) ? posEDROppList[i].cashierFirstName
					: '';
			posEDROppList[i].cashierLastName = (posEDROppList[i].cashierLastName != null && posEDROppList[i].cashierLastName != undefined) ? posEDROppList[i].cashierLastName
					: '';
			/*posEDROppList[i].percentageEDR = (posEDROppList[i].percentageEDR != null && posEDROppList[i].percentageEDR != undefined) ? Number(
					posEDROppList[i].percentageEDR).toFixed(0)
					: '';*/
			posEDROppList[i].cashierNumber = (posEDROppList[i].cashierNumber != null && posEDROppList[i].cashierNumber != undefined) ? posEDROppList[i].cashierNumber
					: '';
			lead_tot += Number(posEDRList[i].percentageEDR);
			opp_tot += Number(posEDROppList[i].percentageEDR);
			flag = true;
			contentTime += '<tr id="' + i
					+ '"class="sortTable ContentTable actionRows parentTr '
					+ '"><td class="leftValue dates2 ">'
					/* + posEDRList[i].cashierNumber+' - ' */
					+ posEDRList[i].cashierFirstName + ' '
					+ posEDRList[i].cashierLastName + '</td>'
					+ '<td class="rightValue">' + Number(posEDRList[i].percentageEDR).toFixed(0)
					+ '</td>' + '<td class="rightValue">' + '</td>'
					+ '<td class="leftValue">'
					/* + posEDROppList[i].cashierNumber+' - ' */
					+ posEDROppList[i].cashierFirstName + ' '
					+ posEDROppList[i].cashierLastName + '</td>'
					+ '<td class="rightValue ">'
					+ Number(posEDROppList[i].percentageEDR).toFixed(0) + '</td></tr>';
		}
		$('#edrTable tbody:first').html('');
		$('#edrTable tbody:first').append(contentTime);
		showPOSTbl();
		/*for ( var i = 0; i < noOfResult; i++)
			drawChart(posEDRList[i].percentageEDR,
					posEDRList[i].cashierFirstName,
					posEDRList[i].cashierLastName, '', lead_tot, '#edr_lead');
		for ( var i = 0; i < noOfResult; i++)
			drawChart(posEDROppList[i].percentageEDR,
					posEDROppList[i].cashierFirstName,
					posEDROppList[i].cashierLastName, '', opp_tot, '#edr_opps');

		var high1 = posEDRList[0].percentageEDR;
		var low1 = posEDROppList[0].percentageEDR;
		var avg1 = (Number(high1) + Number(low1)) / 2;
		var high2 = '';
		var low2 = '';
		var avg2 = '';
		drawRight("Loyalty", Number(avg1).toFixed(2), Number(high1).toFixed(2),
				Number(low1).toFixed(2), " ", avg2, high2, low2, '#edr_right');*/
	}

	if (!flag) {
		$('#edrTable').addClass('hideBlock');
		$('#edrTable').hide();
		$('#subTabs-3 .errorCon').remove();
		$('#subTabs-3 ').append(error_1pos);
		//console.log("edr no data found");
		$('#subTabs-3 .msgDiv h4').text(NDF);
		$('#subTabs-3 .msgDiv ').addClass('nodataMessage');
		$('#subTabs-3 .msgDiv ').removeClass('errorDiv');
	}
}

function priceMarkdownResponse(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.priceMarkDownList.msg;
	}
	catch(e){}
	var priceMarkDownList = '';
	var flag = false;
	try {
	priceMarkDownList = output.priceMarkDownList.priceMarkDownList;
	}
	catch(e){}

	hideError();
	if (msg != null
			&& msg != undefined
			&& priceMarkDownList != null
			&& priceMarkDownList != undefined
			&& priceMarkDownList.length>0) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined
			&& priceMarkDownList != null
			&& priceMarkDownList != undefined
			&& priceMarkDownList.length>0) {
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (priceMarkDownList != null && priceMarkDownList != null) {
			if (priceMarkDownList.length < noOfResult) {
				noOfResult = priceMarkDownList.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				/*
				 * priceMarkDownList[i].cashierNumber =
				 * (priceMarkDownList[i].cashierNumber != null &&
				 * priceMarkDownList[i].cashierNumber != undefined) ?
				 * priceMarkDownList[i].cashierNumber : '';
				 */
				priceMarkDownList[i].cashName = (priceMarkDownList[i].cashName != null && priceMarkDownList[i].cashName != undefined) ? priceMarkDownList[i].cashName
						: '';
				/*
				 * priceMarkDownList[i].cashierLastName =
				 * (priceMarkDownList[i].cashierLastName != null &&
				 * priceMarkDownList[i].cashierLastName != undefined) ?
				 * priceMarkDownList[i].cashierLastName : '';
				 */
				priceMarkDownList[i].priceDifference = (priceMarkDownList[i].priceDifference != null && priceMarkDownList[i].priceDifference != undefined) ? Number(
						priceMarkDownList[i].priceDifference).toFixed(2)
						: '';
				priceMarkDownList[i].markdownQtySuom = (priceMarkDownList[i].markdownQtySuom != null && priceMarkDownList[i].markdownQtySuom != undefined) ? Number(
						priceMarkDownList[i].markdownQtySuom).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="'
						+ i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/* + priceMarkDownList[i].cashierNumber+' - ' */
						+ priceMarkDownList[i].cashName
						+ '</td>'
						+ '</td>'
						+ '<td class="rightValue ">'
						+ Number(priceMarkDownList[i].priceDifference).toFixed(
								2) + '</td>' + '<td class="rightValue">'
						+ priceMarkDownList[i].markdownQtySuom + '</td>'
						+ '</tr>';
			}

		}
		$('#priceTable tbody:first').html('');
		$('#priceTable tbody:first').append(content);
		showStoretbl();
		$("#tabs-1 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-1 .starRptHyperLink").show();
	}

	if (!flag) {
		$('#priceTable').addClass('hideBlock');
		$('#priceTable').hide();
		$('#tabs-1 .errorCon').remove();
		$('#tabs-1 ').append(error_1pos);
		$('#tabs-1 .msgDiv h4').text(NDF);
		$('#tabs-1 .msgDiv ').addClass('nodataMessage');
		$('#tabs-1  .msgDiv ').removeClass('errorDiv');
	}

}
function parsePriceInquiry(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.priceInquiry.msg;
	}
	catch(e){}
	var priceInquiry = '';
	var flag = false;
	try {
		priceInquiry = output.priceInquiry.priceInquiry;
	}
	catch(e){}

	hideError();
	if (msg != null
			&& msg != undefined
			&& priceInquiry != null
			&& priceInquiry != undefined
			&& priceInquiry.length>0) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined
			&& priceInquiry != null
			&& priceInquiry != undefined
			&& priceInquiry.length>0) {
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (priceInquiry != null && priceInquiry != null) {
			if (priceInquiry.length < noOfResult) {
				noOfResult = priceInquiry.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				
				 priceInquiry[i].cashierNumber =(priceInquiry[i].cashierNumber != null && priceInquiry[i].cashierNumber != undefined) ? priceInquiry[i].cashierNumber : '';
				 
				priceInquiry[i].cashierFirstName = (priceInquiry[i].cashierFirstName != null && priceInquiry[i].cashierFirstName != undefined) ? priceInquiry[i].cashierFirstName
						: '';
				
				 priceInquiry[i].cashierLastName = (priceInquiry[i].cashierLastName != null && priceInquiry[i].cashierLastName != undefined) ? priceInquiry[i].cashierLastName : '';
				 
				/*priceInquiry[i].actualSalePrice = (priceInquiry[i].actualSalePrice != null && priceInquiry[i].actualSalePrice != undefined) ? Number(
						priceInquiry[i].actualSalePrice).toFixed(2)
						: '';*/
				priceInquiry[i].quantity = (priceInquiry[i].quantity != null && priceInquiry[i].quantity != undefined) ? Number(
						priceInquiry[i].quantity).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="'
						+ i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue">'
						/*+ priceInquiry[i].cashierNumber+' - ' */
						+ priceInquiry[i].cashierFirstName +' '+priceInquiry[i].cashierLastName
						+ '</td>'
						/*+ '</td>'
						+ '<td class="rightValue ">'
						+ Number(priceInquiry[i].actualSalePrice).toFixed(2) 
						+ '</td>' */
						+ '<td class="rightValue">'
						+ Number(priceInquiry[i].quantity).toFixed(0) + '</td>'
						+ '</tr>';
			}
		}
		$('#priceInquiry tbody:first').html('');
		$('#priceInquiry tbody:first').append(content);
		showStoretbl();
		$("#tabs-9 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-9 .starRptHyperLink").show();
	}

	if (!flag) {
		$('#priceInquiry').addClass('hideBlock');
		$('#priceInquiry').hide();
		$('#tabs-9 .errorCon').remove();
		$('#tabs-9 ').append(error_1pos);
		$('#tabs-9 .msgDiv h4').text(NDF);
		$('#tabs-9 .msgDiv ').addClass('nodataMessage');
		$('#tabs-9  .msgDiv ').removeClass('errorDiv');
	}
}
function parseStaffDiscount(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.staffDiscount.msg;
	}
	catch(e){}
	var staffDiscount = '';
	var flag = false;
	try {
		staffDiscount = output.staffDiscount.staffDiscount;
	}
	catch(e){}

	hideError();
	if (msg != null
			&& msg != undefined
			&& staffDiscount != null
			&& staffDiscount != undefined
			&& staffDiscount.length>0) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined
			&& staffDiscount != null
			&& staffDiscount != undefined
			&& staffDiscount.length>0) {
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (staffDiscount != null && staffDiscount != null) {
			if (staffDiscount.length < noOfResult) {
				noOfResult = staffDiscount.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				
				 staffDiscount[i].cashierNumber =(staffDiscount[i].cashierNumber != null && staffDiscount[i].cashierNumber != undefined) ? staffDiscount[i].cashierNumber : '';
				 
				staffDiscount[i].cashierFirstName = (staffDiscount[i].cashierFirstName != null && staffDiscount[i].cashierFirstName != undefined) ? staffDiscount[i].cashierFirstName
						: '';
				
				 staffDiscount[i].cashierLastName = (staffDiscount[i].cashierLastName != null && staffDiscount[i].cashierLastName != undefined) ? staffDiscount[i].cashierLastName : '';
				 
				/*staffDiscount[i].actualSalePrice = (staffDiscount[i].actualSalePrice != null && staffDiscount[i].actualSalePrice != undefined) ? Number(
						staffDiscount[i].actualSalePrice).toFixed(2)
						: '';*/
				staffDiscount[i].repeat = (staffDiscount[i].repeat != null && staffDiscount[i].repeat != undefined) ? Number(
						staffDiscount[i].repeat).toFixed(0)
						: '';
				staffDiscount[i].total = (staffDiscount[i].total != null && staffDiscount[i].total != undefined) ? Number(
						staffDiscount[i].total).toFixed(2)
						: '';
				staffDiscount[i].quantity = (staffDiscount[i].quantity != null && staffDiscount[i].quantity != undefined) ? Number(
						staffDiscount[i].quantity).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="'
						+ i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue">'
						/*+ staffDiscount[i].cashierNumber+' - ' */
						+ staffDiscount[i].cashierFirstName +' '+staffDiscount[i].cashierLastName
						+ '</td>'
						//+ '</td>'
						+ '<td class="rightValue ">'
						+ staffDiscount[i].repeat
						+ '</td>' 
						+ '<td class="rightValue ">'
						+ staffDiscount[i].total 
						+ '</td>' 
						+ '<td class="rightValue">'
						+ staffDiscount[i].quantity + '</td>'
						+ '</tr>';
			}
		}
		$('#staffDisc tbody:first').html('');
		$('#staffDisc tbody:first').append(content);
		showStoretbl();
	}

	if (!flag) {
		$('#staffDisc').addClass('hideBlock');
		$('#staffDisc').hide();
		$('#tabs-8 .errorCon').remove();
		$('#tabs-8 ').append(error_1pos);
		$('#tabs-8 .msgDiv h4').text(NDF);
		$('#tabs-8 .msgDiv ').addClass('nodataMessage');
		$('#tabs-8  .msgDiv ').removeClass('errorDiv');
	}
}
function parseOneCard(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	/*try {
	msg = output.oneCard.msg;
	}
	catch(e){}*/
	try {
		msg = output.oneCard.msg;
	}
	catch(e){}
	var oneCard = '';
	var flag = false;
	try {
		oneCard = output.oneCard.oneCard;
	}
	catch(e){}

	hideError();
	if (msg != null
			&& msg != undefined
			&& oneCard != null
			&& oneCard != undefined
			&& oneCard.length>0) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined
			&& oneCard != null
			&& oneCard != undefined
			&& oneCard.length>0) {
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (oneCard != null && oneCard != null) {
			if (oneCard.length < noOfResult) {
				noOfResult = oneCard.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				
				 oneCard[i].cashierNumber =(oneCard[i].cashierNumber != null && oneCard[i].cashierNumber != undefined) ? oneCard[i].cashierNumber : '';
				 
				oneCard[i].cashierFirstName = (oneCard[i].cashierFirstName != null && oneCard[i].cashierFirstName != undefined) ? oneCard[i].cashierFirstName
						: '';
				
				 oneCard[i].cashierLastName = (oneCard[i].cashierLastName != null && oneCard[i].cashierLastName != undefined) ? oneCard[i].cashierLastName : '';
				 
				/*oneCard[i].actualSalePrice = (oneCard[i].actualSalePrice != null && oneCard[i].actualSalePrice != undefined) ? Number(
						oneCard[i].actualSalePrice).toFixed(2)
						: '';*/
				oneCard[i].repeatOneCard = (oneCard[i].repeatOneCard != null && oneCard[i].repeatOneCard != undefined) ? Number(
						oneCard[i].repeatOneCard).toFixed(0)
						: '';
				/*oneCard[i].total = (oneCard[i].total != null && oneCard[i].total != undefined) ? Number(
						oneCard[i].total).toFixed(2)
						: '';*/
				oneCard[i].quantityOneCard = (oneCard[i].quantityOneCard != null && oneCard[i].quantityOneCard != undefined) ? Number(
						oneCard[i].quantityOneCard).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="'
						+ i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue">'
						/*+ oneCard[i].cashierNumber+' - ' */
						+ oneCard[i].cashierFirstName +' '+oneCard[i].cashierLastName
						+ '</td>'
						//+ '</td>'
						+ '<td class="rightValue ">'
						+ oneCard[i].repeatOneCard
						+ '</td>' 
						/*+ '<td class="rightValue "></td>'
						+ '<td class="rightValue ">'
						+ oneCard[i].total 
						+ '</td>' */
						+ '<td class="rightValue">'
						+ oneCard[i].quantityOneCard + '</td>'
						+ '</tr>';
			}
		}
		$('#oneCard tbody:first').html('');
		$('#oneCard tbody:first').append(content);
		showStoretbl();
	}

	if (!flag) {
		$('#oneCard').addClass('hideBlock');
		$('#oneCard').hide();
		$('#tabs-10 .errorCon').remove();
		$('#tabs-10 ').append(error_1pos);
		$('#tabs-10 .msgDiv h4').text(NDF);
		$('#tabs-10 .msgDiv ').addClass('nodataMessage');
		$('#tabs-10  .msgDiv ').removeClass('errorDiv');
	}
}
function parseArticleSoldByDept(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.articleSoldByDept.msg;
	}
	catch(e){}
	var articleSoldByDept = '';
	var flag = false;
	try {
		articleSoldByDept = output.articleSoldByDept.articleSoldByDept;
	}
	catch(e){}

	hideError();
	if (msg != null
			&& msg != undefined
			&& articleSoldByDept != null
			&& articleSoldByDept != undefined
			&& articleSoldByDept.length>0) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined
			&& articleSoldByDept != null
			&& articleSoldByDept != undefined
			&& articleSoldByDept.length>0) {
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (articleSoldByDept != null && articleSoldByDept != null) {
			if (articleSoldByDept.length < noOfResult) {
				noOfResult = articleSoldByDept.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				
				 articleSoldByDept[i].cashierNumber =(articleSoldByDept[i].cashierNumber != null && articleSoldByDept[i].cashierNumber != undefined) ? articleSoldByDept[i].cashierNumber : '';
				 
				articleSoldByDept[i].cashierFirstName = (articleSoldByDept[i].cashierFirstName != null && articleSoldByDept[i].cashierFirstName != undefined) ? articleSoldByDept[i].cashierFirstName
						: '';
				
				 articleSoldByDept[i].cashierLastName = (articleSoldByDept[i].cashierLastName != null && articleSoldByDept[i].cashierLastName != undefined) ? articleSoldByDept[i].cashierLastName : '';
				 
				/*articleSoldByDept[i].actualSalePrice = (articleSoldByDept[i].actualSalePrice != null && articleSoldByDept[i].actualSalePrice != undefined) ? Number(
						articleSoldByDept[i].actualSalePrice).toFixed(2)
						: '';*/
				/*articleSoldByDept[i].repeat = (articleSoldByDept[i].repeat != null && articleSoldByDept[i].repeat != undefined) ? Number(
						articleSoldByDept[i].repeat).toFixed(0)
						: '';*/
				articleSoldByDept[i].total = (articleSoldByDept[i].total != null && articleSoldByDept[i].total != undefined) ? Number(
						articleSoldByDept[i].total).toFixed(2)
						: '';
				articleSoldByDept[i].quantity = (articleSoldByDept[i].quantity != null && articleSoldByDept[i].quantity != undefined) ? Number(
						articleSoldByDept[i].quantity).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="'
						+ i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue">'
						/*+ articleSoldByDept[i].cashierNumber+' - ' */
						+ articleSoldByDept[i].cashierFirstName +' '+articleSoldByDept[i].cashierLastName
						+ '</td>'
						//+ '</td>'
						/*+ '<td class="rightValue ">'
						+ articleSoldByDept[i].repeat
						+ '</td>' */
						+ '<td class="rightValue ">'
						+ articleSoldByDept[i].total 
						+ '</td>' 
						+ '<td class="rightValue">'
						+ articleSoldByDept[i].quantity + '</td>'
						+ '</tr>';
			}
		}
		$('#artclSldByDept tbody:first').html('');
		$('#artclSldByDept tbody:first').append(content);
		showStoretbl();
		$("#tabs-7 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-7 .starRptHyperLink").show();
	}

	if (!flag) {
		$('#artclSldByDept').addClass('hideBlock');
		$('#artclSldByDept').hide();
		$('#tabs-7 .errorCon').remove();
		$('#tabs-7 ').append(error_1pos);
		$('#tabs-7 .msgDiv h4').text(NDF);
		$('#tabs-7 .msgDiv ').addClass('nodataMessage');
		$('#tabs-7  .msgDiv ').removeClass('errorDiv');
	}
}

function toSeconds2(s, t) {
	//console.log('Time '+s);
	  var a = timeHrMnScRegEx(s);
	  var b = timeHrMnScRegEx(t);
	  if((a!=undefined || a!=null) && (b!=undefined || b!=null)) {
	  return (parseInt(a[1], 10)+parseInt(b[1], 10))+':'+
		  (parseInt(a[2], 10)+parseInt(b[2], 10))+':'+
		  (parseInt(a[3], 10)+parseInt(b[3], 10));
	  }
	  //return Math.abs(parseInt(p[0], 10) * 3600) + parseInt(p[1], 10) * 60 + parseInt(p[2], 10);
}
function fill(s, digits) {
	  s = s.toString();
	  while (s.length < digits) s = '0' + s;
	  return s;
	}
function formatTime2(s) {
	//console.log(s);
	  var p = s.split(':');
	  var secScanTime = Number(p[2]);
	  var minScanTime = Number(p[1]);
	  var hourScanTime = Number(p[0]);
	if (secScanTime > 59) {
		ss = secScanTime % 60;
		secScanTime = 59;
	}
	if (minScanTime > 59) {
		mm = minScanTime + ss;
		mm = minScanTime % 60;
		minScanTime = 59;
	}
	hourScanTime += mm;
	return hourScanTime+':'+minScanTime+':'+secScanTime;
}
function toSeconds(s) {
	if(s!=undefined && s!=null) {
	  var tmpTim = timeHrMnScRegEx(s);
	  if(tmpTim==undefined || tmpTim == null) {
		  console.log('For info - incorrect time datum or data : '+s);
	  }
	  var a = timeAnyHrMnScRegEx(s);
	  if(a!=undefined && a!=null) {
		  if(s.substring(0, 1)=="-") {
			  return (parseInt(a[1].substring(1), 10) * 3600 + parseInt(a[2], 10) * 60 + parseInt(a[3], 10)) * -1;
		  }
		  else {
			  return parseInt(a[1], 10) * 3600 + parseInt(a[2], 10) * 60 + parseInt(a[3], 10);
		  }
	  }
	  else {
		  console.log('incorrect time datum or data : '+s);
	  }
	}
	else {
		return 0;
	}
}
function formatTime1POS(time) {
		//var sec = toSeconds(time);
	var neg = "";
	if(time < 0) {
		neg = "-";
	}
	var tmpTime = Math.abs(time);
		var result =
			neg + fill(Math.floor(tmpTime / 3600), 2) + ':' +
		  fill(Math.floor(tmpTime / 60) % 60, 2) + ':' +
		  fill(tmpTime % 60, 2);
		return result;
}
function statisticsSummaryResponse(response, value) {

	var msg = '';
	var output = '';
	output = $.parseJSON(response);
	try {
	msg = output.statisticsList.msg;
	}
	catch(e) {}
	var statisticsList = '';
	var departmentSalesTax = '';
	var totFrontSale = '0.00';
	var totCigrSale = '0.00';
	try {
	statisticsList = output.statisticsList.statisticsList;

	departmentSalesTax = output.departmentSalesTax.departmentSalesTax;
	}
	catch(e) {}

	hideError();
	for ( var i = 0; i < departmentSalesTax.length; i++) {

		departmentSalesTax[i].netSalesExlTax = (departmentSalesTax[i].netSalesExlTax != null && departmentSalesTax[i].netSalesExlTax != undefined) ? Number(
				departmentSalesTax[i].netSalesExlTax).toFixed(2)
				: '';
		departmentSalesTax[i].department = (departmentSalesTax[i].department != null && departmentSalesTax[i].department != undefined) ? departmentSalesTax[i].department
				: '';
		if(departmentSalesTax[i].departmentNo!=null && departmentSalesTax[i].departmentNo.length>2) {
			if (departmentSalesTax[i].departmentNo.substring(2) == '28') {
				totFrontSale = Number(departmentSalesTax[i].salesTaxRetailIncl)
						.toFixed(2);
			}
			else if (departmentSalesTax[i].departmentNo.substring(2) == '27') {
				totCigrSale = Number(departmentSalesTax[i].salesTaxRetailIncl).toFixed(
						2);
			}
		}
	}
	if (msg != null && msg != undefined && statisticsList != null
			&& statisticsList != undefined && statisticsList.length > 0 && departmentSalesTax.length>0) {
		currentPage = 1;

		recordCount = '';
		var content = '';
		var summaryContent = '';
		var sumTransactionCount = 0.0;
		var sumArticlesPerMinute = 0.0;
		var sumAverageArticlePrice = 0.0;
		var sumAverageBasketSize = 0.0;
		var sumSelfCheckOutTransactions = 0.0;
		var sumSalesRetailIncT = 0.0;
		var sumItemsScannedCount = 0.0;
		var sumTenderingTime = 0.0;
		var sumCashOutAmount = 0.0;
		var sumScanTimeFormated = 0;
		var sumIdleTimeFormated = 0;
		var avgArtclePrc = 0;
		
		if (statisticsList != null && departmentSalesTax != null) {

			for(var i=0;i<statisticsList.length;i++) {
				
				sumTransactionCount += (statisticsList[i].transactionCount != null && statisticsList[i].transactionCount != undefined) ? Number(
					statisticsList[i].transactionCount)
					: 0.0;
				sumArticlesPerMinute += (statisticsList[i].articlesPerMinute != null && statisticsList[i].articlesPerMinute != undefined) ? Number(
					statisticsList[i].articlesPerMinute)
					: 0.0;
				sumAverageArticlePrice += (statisticsList[i].averageArticlePrice != null && statisticsList[i].averageArticlePrice != undefined) ? Number(
					statisticsList[i].averageArticlePrice)
					: 0.0;
				sumAverageBasketSize += (statisticsList[i].averageBasketSize != null && statisticsList[i].averageBasketSize != undefined) ? Number(
					statisticsList[i].averageBasketSize)
					: 0.0;

				sumSelfCheckOutTransactions += (statisticsList[i].selfCheckOutTransactions != null && statisticsList[i].selfCheckOutTransactions != undefined) ? Number(
					statisticsList[i].selfCheckOutTransactions)
					: 0.0;

				sumSalesRetailIncT += (statisticsList[i].salesRetailIncT != null && statisticsList[i].salesRetailIncT != undefined) ? Number(
					statisticsList[i].salesRetailIncT)
					: 0.0;
				sumItemsScannedCount += (statisticsList[i].itemsScannedCount != null && statisticsList[i].itemsScannedCount != undefined) ? Number(
					statisticsList[i].itemsScannedCount)
					: 0.0;
				sumTenderingTime += (statisticsList[i].tenderingTime != null && statisticsList[i].tenderingTime != undefined) ? Number(
					statisticsList[i].tenderingTime)
					: 0.0;
				sumScanTimeFormated += toSeconds((statisticsList[i].scanTimeFormatted != null && statisticsList[i].scanTimeFormatted != undefined && statisticsList[i].scanTimeFormatted!=''&& statisticsList[i].scanTimeFormatted!='#') ? 
					statisticsList[i].scanTimeFormatted
					: null);
				sumIdleTimeFormated += toSeconds((statisticsList[i].idleTimeFormatted != null && statisticsList[i].idleTimeFormatted != undefined && statisticsList[i].idleTimeFormatted!='' && statisticsList[i].idleTimeFormatted!='#') ? 
					statisticsList[i].idleTimeFormatted
					: null);
				sumCashOutAmount += (statisticsList[i].cashOutAmount != null && statisticsList[i].cashOutAmount != undefined) ? Number(
					statisticsList[i].cashOutAmount)
					: 0.0;//, sumCashOutAmount
			}

			content += '<h2 class="articleTitle">Total Cashout $'
					+ Number(sumCashOutAmount).toFixed(2)
					+ '</h2>'
					+ '<p><label class="articlePriceLabel">Total Customers: <strong>'
					+ Number(sumTransactionCount).toFixed(0)
					+ '</strong></label>'
					+ '<label class="articlePriceLabel">|</label>'
					+ '<label class="articlePriceLabel">Total Register Sales: <strong>$'
					+ Number(sumSalesRetailIncT).toFixed(2) + '</strong> </label>'
					+ '<label class="articlePriceLabel">|</label>';

			/*
			 * if( totFrontSale!="") {
			 */
			content += '<label class="articlePriceLabel">Total Front of Store Sales: <strong>$';
			content += totFrontSale + '</strong> </label>'
					+ '<label class="articlePriceLabel">|</label>';
			// }

			/*
			 * if(totCigrSale!="") {
			 */
			content += '<label class="articlePriceLabel">Total Cigarette Sales: <strong>$';
			content += totCigrSale + '</strong> </label></p>';
			// }
			avgArtclePrc = Number(sumItemsScannedCount)==0?0.0: (Number(sumSalesRetailIncT) / Number(sumItemsScannedCount));
			summaryContent = '<tr><td class="keyInfo" width="16%">'
					+ 'Average Scan Rate (articles / min):</td><td class="valueInfo">'
					+ Number(sumArticlesPerMinute).toFixed(1)
					+ '</td><td class="keyInfo" width="16%">'
					+ 'POS Operator Name Time Distribution - Tender:'
					+ '</td>	<td class="valueInfo lastColumn">'
					+ Number(sumTenderingTime).toFixed(0)+'%'
					+ '</td>'
					/*+'<td class="keyInfo" width="16%">'
					+ 'Self Checkout Transactions:'
					+ '</td><td class="valueInfo  lastColumn">'
					+ Number(sumSelfCheckOutTransactions).toFixed(0)+'%'
					+ '</td>'*/
					+'</tr>'
					+ '<tr><td class="keyInfo" width="16%">'
					+ 'Average Article Price ($ / article):'
					+ '</td><td class="valueInfo">'
					+ Number(avgArtclePrc).toFixed(2)
					+ '</td><td class="keyInfo" width="16%">'
					+ 'POS Operator Name Time Distribution - Scan:'
					+ '</td><td class="valueInfo lastColumn">'
					+ formatTime1POS(sumScanTimeFormated)
					+ '</td>'
					/*
					 * <td class="keyInfo" width="16%">' +'Other Transactions:' +'</td>
					 *//*
						 * +<td class="valueInfo  lastColumn">' //
						 * +statisticsList[0].scanTimeFormatted other transactions not
						 * yet mapped +'</td>
						 */+ '</tr>'
					+ '<tr><td class="keyInfo" width="16%">'
					+ 'Average Basket Size (articles / customer):'
					+ '</td><td class="valueInfo">'
					+ Number(sumAverageBasketSize).toFixed(2)
					+ '</td><td class="keyInfo" width="16%">	'
					+ '	POS Operator Name Time Distribution - Idle:'
					+ '</td><td class="valueInfo lastColumn">'
					+ formatTime1POS(sumIdleTimeFormated)
					+ '</td>'
					/*+'<td class="keyInfo" width="16%">'
					+ '</td><td class="valueInfo  lastColumn">' + '</td>'*/
					+'</tr>';

		}
		$('.articleHead #summaryDetails').html('');
		$('.articleHead #summaryDetails').append(content);

		$('#summaryTbl tbody:first').html('');
		$('#summaryTbl tbody:first').append(summaryContent);
		// showStoretbl();

	}

}

function savedTransactionsResponse(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	//console.log("Saved  no of result :: " + noOfResult);
	output = $.parseJSON(response);
	try {
	msg = output.savedTransList.msg;
	}
	catch(e) {}
	var savedMap=null;

	var flag = false;
	try {
	savedMap = output.savedTransList.savedTransList;
	} catch(e){}

	hideError();

	if ((savedMap!=null && savedMap.length == 1 && (savedMap[0].cashName != null
			|| savedMap[0].cashName != undefined || savedMap[0].cashName != ""))) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined && savedMap != null
			&& savedMap != undefined && savedMap != ""  && savedMap[0].cashName.trim() != "" && savedMap[0].cashName != null && savedMap[0].cashName != undefined){
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (savedMap != null && savedMap != null) {
			if (savedMap.length < noOfResult) {
				noOfResult = savedMap.length;
			}

			for ( var i = 0; i < noOfResult; i++) {

				savedMap[i].cashName = (savedMap[i].cashName != null && savedMap[i].cashName != undefined) ? savedMap[i].cashName
						: '';
				/*
				 * savedMap[i].cashierLastName = (savedMap[i].cashierLastName !=
				 * null && savedMap[i].cashierLastName != undefined) ?
				 * savedMap[i].cashierLastName : '';
				 */

				savedMap[i].savedTransactionAmount = (savedMap[i].savedTransactionAmount != null && savedMap[i].savedTransactionAmount != undefined) ? savedMap[i].savedTransactionAmount
						: '';
				savedMap[i].salesQuantity = (savedMap[i].salesQuantity != null && savedMap[i].salesQuantity != undefined) ? savedMap[i].salesQuantity
						: '';
				flag = true;

				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/* + savedMap[0].cashierNumber+' - ' */
						+ savedMap[i].cashName
						+ '</td><td class="rightValue ">'
						+ Number(savedMap[i].savedTransactionAmount).toFixed(2)
						+ '</td>' + '<td class="rightValue">'
						+ Number(savedMap[i].salesQuantity).toFixed(0)
						+ '</td>' + '</tr>';

			}

		}

		$('#transTable tbody:first').html('');
		$('#transTable tbody:first').append(content);
		showStoretbl();
		$("#tabs-2 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-2 .starRptHyperLink").show();
	}

	else {
		if (!flag) {
			$('#transTable').addClass('hideBlock');
			$('#tabs-2 .errorCon').remove();
			$('#tabs-2 ').append(error_1pos);
			$('#tabs-2 .msgDiv h4').text(NDF);
			$('#tabs-2 .msgDiv ').addClass('nodataMessage');
			$('#tabs-2 .msgDiv ').removeClass('errorDiv');

		}
	}
}

function voidTransactionsResponse(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.voidTransList.msg;
	}
	catch(e) {}
	var voidTransList = '';
	var voidArtList = '';
	var flag = false;
	noOfResultArticle = noOfResult;
	try {
	voidTransList = output.voidTransList.voidTransList;
	voidArtList = output.voidArticleList.voidArticleList;
	} catch(e) {}
	hideError();

	if ((voidTransList.length == 1 && (voidTransList[0].cashName != null
			|| voidTransList[0].cashName != undefined || voidTransList[0].cashName != ""))
			&& (voidArtList.length == 1 && (voidArtList[0].cashName != null
					|| voidArtList[0].cashName != undefined || voidArtList[0].cashName != ""))) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}

	if (msg != null
			&& msg != undefined && voidTransList != null
			&& voidTransList != undefined && voidTransList != ""  && voidTransList[0].cashName.trim() != "" && voidTransList[0].cashName != null && voidTransList[0].cashName != undefined){
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (voidTransList != null && voidTransList != null) {
			if (voidTransList.length < noOfResult) {
				noOfResult = voidTransList.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				voidTransList[i].cashierNumber = (voidTransList[i].cashierNumber != null && voidTransList[i].cashierNumber != undefined) ? voidTransList[i].cashierNumber
						: '';
				voidTransList[i].cashName = (voidTransList[i].cashName != null && voidTransList[i].cashName != undefined) ? voidTransList[i].cashName
						: '';
				voidTransList[i].total = (voidTransList[i].total != null && voidTransList[i].total != undefined) ? Number(
						voidTransList[i].total).toFixed(2)
						: '';
				voidTransList[i].salesQuantitiy = (voidTransList[i].salesQuantitiy != null && voidTransList[i].salesQuantitiy != undefined) ? Number(
						voidTransList[i].salesQuantitiy).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/*+ voidTransList[i].cashierNumber + ' - '*/
						+ voidTransList[i].cashName + '</td>' + '</td>'
						+ '<td class="rightValue ">'
						+ Number(voidTransList[i].total).toFixed(2) + '</td>'
						+ '<td class="rightValue">'
						+ voidTransList[i].salesQuantitiy + '</td>' + '</tr>';
			}

		}
		$('#voidTransTable tbody:first').html('');
		$('#voidTransTable tbody:first').append(content);
		showStoretbl();
		$("#tabs-3 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-3 .starRptHyperLink").show();
	}
	if (!flag) {
		$('#voidTransTable').addClass('hideBlock');
		$('#tabs-3 .errorCon').remove();
		$('#tabs-3 ').append(error_1pos);
		$('#tabs-3 .msgDiv h4').text(NDF);
		$('#tabs-3 .msgDiv ').addClass('nodataMessage');
		$('#tabs-3 .msgDiv ').removeClass('errorDiv');
	}
	var flag = false;
	if (msg != null
			&& msg != undefined && voidArtList != null
			&& voidArtList != undefined && voidArtList != ""  && voidArtList[0].cashName.trim() != "" && voidArtList[0].cashName != null && voidArtList[0].cashName != undefined){
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (voidArtList != null && voidArtList != null) {

			if (voidArtList.length < noOfResultArticle) {
				noOfResultArticle = voidArtList.length;
			}

			for ( var i = 0; i < noOfResultArticle; i++) {

				voidArtList[i].cashierNumber = (voidArtList[i].cashierNumber != null && voidArtList[i].cashierNumber != undefined) ? voidArtList[i].cashierNumber
						: '';
				voidArtList[i].cashName = (voidArtList[i].cashName != null && voidArtList[i].cashName != undefined) ? voidArtList[i].cashName
						: '';
				voidArtList[i].total = (voidArtList[i].total != null && voidArtList[i].total != undefined) ? Number(
						voidArtList[i].total).toFixed(2)
						: '';
				voidArtList[i].salesQuantitiy = (voidArtList[i].salesQuantitiy != null && voidArtList[i].salesQuantitiy != undefined) ? Number(
						voidArtList[i].salesQuantitiy).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/*+ voidArtList[i].cashierNumber + ' - '*/
						+ voidArtList[i].cashName + '</td>' + '</td>'
						+ '<td class="rightValue ">'
						+ Number(voidArtList[i].total).toFixed(2) + '</td>'
						+ '<td class="rightValue">'
						+ voidArtList[i].salesQuantitiy + '</td>' + '</tr>';
			}

		}
		$('#voidArtTable tbody:first').html('');
		$('#voidArtTable tbody:first').append(content);

		showStoretbl();
		$("#tabs-4 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-4 .starRptHyperLink").show();
	}

	if (!flag) {
		$('#voidArtTable').addClass('hideBlock');
		$('#tabs-4 .errorCon').remove();
		$('#tabs-4 ').append(error_1pos);
		$('#tabs-4 .msgDiv h4').text(NDF);
		$('#tabs-4 .msgDiv ').addClass('nodataMessage');
		$('#tabs-4 .msgDiv ').removeClass('errorDiv');
	}
}

function noSalesResponse(response, value) {

	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.noSalesList.msg;
	} catch(e) {}
	var flag = false;
	var noSalesMap = null;
	try {
	noSalesMap = output.noSalesList.noSalesList;
	} catch(e) {}
	hideError();
	//console.log(noSalesMap);
/*
	if ((noSalesMap.length == 1 && (noSalesMap[0].cashName != null
			|| noSalesMap[0].cashName != undefined || noSalesMap[0].cashName != ""))) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}*/
	if (msg != null
			&& msg != undefined && noSalesMap != null
			&& noSalesMap != undefined && noSalesMap != ""  && noSalesMap[0].cashName.trim() != "" && noSalesMap[0].cashName != null && noSalesMap[0].cashName != undefined){
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (noSalesMap != null && noSalesMap != null) {
			if (noSalesMap.length < noOfResult) {
				noOfResult = noSalesMap.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				noSalesMap[i].cashName = (noSalesMap[i].cashName != null && noSalesMap[i].cashName != undefined) ? noSalesMap[i].cashName
						: '';
				noSalesMap[i].cashierNumber = (noSalesMap[i].cashierNumber != null && noSalesMap[i].cashierNumber != undefined) ? noSalesMap[i].cashierNumber
						: '';
				noSalesMap[i].salesUnit = (noSalesMap[i].salesUnit != null && noSalesMap[i].salesUnit != undefined) ? Number(
						noSalesMap[i].salesUnit).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/*+ noSalesMap[i].cashierNumber + ' - '*/
						+ noSalesMap[i].cashName + '</td>'
						+ '<td class="rightValue">' + noSalesMap[i].salesUnit
						+ '</td>' + '</tr>';

			}

		}
		$('#noSalesTable tbody:first').html('');
		$('#noSalesTable tbody:first').append(content);
		showStoretbl();
		$("#tabs-5 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-5 .starRptHyperLink").show();
	}
	else if(noSalesMap!=null && noSalesMap.length == 1 && (noSalesMap[0].cashName == null
					|| noSalesMap[0].cashName == undefined || noSalesMap[0].cashName.trim() == ""))
		{
		$('#noSalesTable').addClass('hideBlock');
		$('#tabs-5 .errorCon').remove();
		$('#tabs-5 ').append(error_1pos);
		$('#tabs-5 .msgDiv h4').text(NDF);
		$('#tabs-5 .msgDiv ').addClass('nodataMessage');
		$('#tabs-5 .msgDiv ').removeClass('errorDiv');
		}
	if (!flag) {
		$('#noSalesTable').addClass('hideBlock');
		$('#tabs-5 .errorCon').remove();
		$('#tabs-5 ').append(error_1pos);
		$('#tabs-5 .msgDiv h4').text(NDF);
		$('#tabs-5 .msgDiv ').addClass('nodataMessage');
		$('#tabs-5 .msgDiv ').removeClass('errorDiv');
	}

}

function refundResponse(response, value) {
	var msg = '';
	var output = '';
	var noOfResult = $('#posDropDwn').val();
	output = $.parseJSON(response);
	try {
	msg = output.refundList.msg;
	} catch(e) {}
	var refundList = '';
	var flag = false;
	try {
	refundList = output.refundList.refundList;
	} catch(e) {}
	
	hideError();
	if ((refundList.length == 1 && (refundList[0].cashName != null
			|| refundList[0].cashName != undefined || refundList[0].cashName != ""))) {
		$('#reportContent').removeClass('hideBlock');
		$('.ContentTableWrapper').removeClass("hideBlock");

	}
	if (msg != null
			&& msg != undefined && refundList != null
			&& refundList != undefined && refundList != ""  && refundList[0].cashName.trim() != "" && refundList[0].cashName != null && refundList[0].cashName != undefined){
		currentPage = 1;

		recordCount = '';
		var content = '';

		if (refundList != null && refundList != null) {
			if (refundList.length < noOfResult) {
				noOfResult = refundList.length;
			}
			for ( var i = 0; i < noOfResult; i++) {

				refundList[i].cashierNumber = (refundList[i].cashierNumber != null && refundList[i].cashierNumber != undefined) ? refundList[i].cashierNumber
						: '';
				refundList[i].cashName = (refundList[i].cashName != null && refundList[i].cashName != undefined) ? refundList[i].cashName
						: '';

				refundList[i].refundItem = (refundList[i].refundItem != null && refundList[i].refundItem != undefined) ? Number(
						refundList[i].refundItem).toFixed(2)
						: '';
				refundList[i].salesQuantity = (refundList[i].salesQuantity != null && refundList[i].salesQuantity != undefined) ? Number(
						refundList[i].salesQuantity).toFixed(0)
						: '';
				flag = true;
				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue dates2 ">'
						/*+ refundList[i].cashierNumber + ' - '*/
						+ refundList[i].cashName + '</td>' + '</td>'
						+ '<td class="rightValue ">'
						+ Number(refundList[i].refundItem).toFixed(2) + '</td>'
						+ '<td class="rightValue">'
						+ refundList[i].salesQuantity + '</td>' + '</tr>';
			}

		}
		$('#refundTable tbody:first').html('');
		$('#refundTable tbody:first').append(content);
		showStoretbl();
		$("#tabs-6 .starRptHyperLink").removeClass('hideBlock');
		$("#tabs-6 .starRptHyperLink").show();
	}
	
	else if(refundList.length == 1 && (refundList[0].cashName == null
			|| refundList[0].cashName == undefined || refundList[0].cashName.trim() == ""))
{
		$('#refundTable').addClass('hideBlock');
		$('#tabs-6 .errorCon').remove();
		$('#tabs-6 ').append(error_1pos);
		$('#tabs-6 .msgDiv h4').text(NDF);
		$('#tabs-6 .msgDiv ').addClass('nodataMessage');
		$('#tabs-6 .msgDiv ').removeClass('errorDiv');
}
	if (!flag) {
		$('#refundTable').addClass('hideBlock');
		$('#tabs-6 .errorCon').remove();
		$('#tabs-6 ').append(error_1pos);
		$('#tabs-6 .msgDiv h4').text(NDF);
		$('#tabs-6 .msgDiv ').addClass('nodataMessage');
		$('#tabs-6 .msgDiv ').removeClass('errorDiv');
	}

}

function printResult(response) {}
function showStarTbl() {
	$(
			'#mainTabs-2,#mainTabs-2  #tableSearchActions,#mainTabs-2  #scrollBtns,#mainTabs-2  #scrollTable')
			.removeClass('hideBlock');
	$(
			'#mainTabs-1,#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
			.removeClass('hideBlock');
	$('.ContentTableWrapper').removeClass('hideBlock');
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows,#reportContent .ContentTableWrapper')
			.removeClass('hideBlock');
	$('#mainTabs-1 .ContentTableWrapper').removeClass('hideBlock');
	$(".posTbl").removeClass('hideBlock');
	$('.tab2').removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper').removeClass('hideBlock');
	$(".storeTbl").removeClass('hideBlock');
	$('.tab1').removeClass('hideBlock');
	if ($('.storeTbl tbody').html().trim() == '') {
		$(
				'#mainTabs-2  #tableSearchActions,#mainTabs-2  #scrollBtns,#mainTabs-2  #scrollTable')
				.addClass('hideBlock');
	}
	if ($('.posTbl tbody').html().trim() == '') {
		$(
				'#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
				.addClass('hideBlock');
	}
	hideError();

}

function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');

	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#errorMsgDiv").removeClass('nodataMessage');
	hideContent();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
	$('.ContentTableWrapperError errorcon').addClass('hideBlock');
}
function closeAccordian() {
	$('#accordion').accordion({
		active : true
	});
}
function callFrom() {
	setTimeout(function() {
		$('#dateFrom').focus();
	}, 200);
}
function callTo() {
	setTimeout(function() {
		$('#dateTo').focus();
	}, 200);
}

function convertTime() {
	$('.time').filter(
			function() {
				var temp = $(this).text().trim();

				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					var newHour = today.getHours();
					var newMinu = today.getMinutes();
					if (newHour < 10) {
						newHour = '0' + newHour;
					}
					if (newMinu < 10) {
						newMinu = '0' + newMinu;
					}
					$(this).text((newHour + ":" + newMinu));

				}
			});

}
function showWarning(text) {
	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	$('.paginationDiv').hide();
}
function formateDate(v) {
	if (v.length == 8) {
		var finalDate = parseDate(v).getFullYear();
		var splitDate = v.split("/");
		finalDate = splitDate[0] + "/" + splitDate[1] + "/" + finalDate;
		return finalDate;
	} else {
		return v;
	}
}
function showContent() {

	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {

	$('#reportContent,#reportContent,.ContentTable.actionRows').addClass(
			'hideBlock');
	// $('.paginationWrapper').hide();
}

function showPOSTbl() {
	$(
			'#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
			.removeClass('hideBlock');
	// $('#sortTable').find('tr :first').removeClass('hideBlock');
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows,#reportContent .ContentTableWrapper')
			.removeClass('hideBlock');
	$('#mainTabs-1 .ContentTableWrapper').removeClass('hideBlock');
	
	// $('.tab2').removeClass('hideBlock');
	if($('#sortTable tbody tr').length != "" && $('#sortTable tbody tr').length !=0)
		{
		$('.scanTableopp thead th').removeClass('hideBlock');
		$("#sortTable ").removeClass('hideBlock');
		$("#sortTable").show();
		}
	else
		{
		$("#sortTable ").addClass('hideBlock');
		$("#sortTable").hide();
		$('.scanTableopp thead th').addClass('hideBlock');
		}
	

}

function showStoretbl() {
	$(
			'#mainTabs-2  #tableSearchActions,#mainTabs-2  #scrollBtns,#mainTabs-2  #scrollTable')
			.removeClass('hideBlock');
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows,#reportContent .ContentTableWrapper')
			.removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper').removeClass('hideBlock');
	$(".ContentTable .storeTbl").removeClass('hideBlock');
	// $('.storeTbl').find('tr :first').removeClass('hideBlock');
	// $('.tab1').removeClass('hideBlock');

	if ($('#tabs-1').find(".errorCon").length == 0) {
		$("#priceTable").removeClass('hideBlock');
		$("#priceTable").show();
	}

	if ($('#tabs-2').find(".errorCon").length == 0) {
		$("#transTable").removeClass('hideBlock');
		$("#transTable").show();
	}
	if ($('#tabs-3').find(".errorCon").length == 0) {
		$("#voidTransTable").removeClass('hideBlock');
		$("#voidTransTable").show();
	}

	if ($('#tabs-4').find(".errorCon").length == 0) {
		$("#voidArtTable").removeClass('hideBlock');
		$("#voidArtTable").show();
	}
	if ($('#tabs-5').find(".errorCon").length == 0) {
		$("#noSalesTable").removeClass('hideBlock');
		$("#noSalesTable").show();
	}

	if ($('#tabs-6').find(".errorCon").length == 0) {
		$("#refundTable").removeClass('hideBlock');
		$("#refundTable").show();
	}
	if ($('#tabs-7').find(".errorCon").length == 0) {
		$("#artclSldByDept").removeClass('hideBlock');
		$("#artclSldByDept").show();
	}
	if ($('#tabs-8').find(".errorCon").length == 0) {
		$("#staffDisc").removeClass('hideBlock');
		$("#staffDisc").show();
	}
	if ($('#tabs-9').find(".errorCon").length == 0) {
		$("#priceInquiry").removeClass('hideBlock');
		$("#priceInquiry").show();
	}
	if ($('#tabs-10').find(".errorCon").length == 0) {
		$("#oneCard").removeClass('hideBlock');
		$("#oneCard").show();
	}

}
function starReportJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#starReport').attr("action", "printStarReport.pdf");
		$('#starReport').attr('target','_blank');
		$('#starReport').submit();
	}
}
function setParamsNRedirect(anchObj, repNam, repCategory, voidRepCat) {
	try {
		if(repCategory!=undefined && repCategory!=null && repCategory.trim()!='' && repCategory == 'InvestigateRpts') {
			$(anchObj).attr('href','../investigate/onPageLoad.htm?dropDown='+repNam+'&callFrm=STAR&dtFrm='+$("#dateFrom").val()+'&dtTo='+$("#dateTo").val());
		}
		else if(repCategory!=undefined && repCategory!=null && repCategory.trim()!='' && repCategory == 'VoidRefundRpts') {
			if(voidRepCat!=undefined && voidRepCat!=null && voidRepCat!='') {
				$(anchObj).attr('href','../voidrefund/onPageLoad.htm?repNam='+repNam+'&voidType='+voidRepCat+'&callFrm=STAR&dtFrm='+$("#dateFrom").val()+'&dtTo='+$("#dateTo").val());
			}
			else {
				$(anchObj).attr('href','../voidrefund/onPageLoad.htm?repNam='+repNam+'&callFrm=STAR&dtFrm='+$("#dateFrom").val()+'&dtTo='+$("#dateTo").val());
			}
		}
		//console.log($(anchObj).attr('href'));
		return true;
	}
	catch(e) {
		console.log('Exception');
		return false;
	}
}
