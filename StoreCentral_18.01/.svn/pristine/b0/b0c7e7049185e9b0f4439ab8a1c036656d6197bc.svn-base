var recordCount;
var currentPage;
var recordCount;
var currentPage;
var mondayEndDate = '';
var sundayEndDate = '';
var curPage;
var prevRes = '';
var mondayDateForWeek = '';
var NDF="Sorry, no results found for your search criteria. Please try again.";
visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"]';
hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"]';
allInputCtrls = 'input[name="dateFrom"]';
$(document)
		.ready(
				function() {
					// $('.footerWrapper').css('margin','0 auto');
					$("#dialog-verify").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						minHeight : 200,
						maxHeight : 600,
						width : 800
					});
					var today = new Date();
					$("#dialog-verify").parent().addClass("popupWrapper");
					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					$("#dateFrom").datepicker({
						dateFormat : "dd/mm/yy",
						zIndex : 50,
						onClose : function(selectedDate) {
							// findMondayOfYear();
							// getWeekNumber();
							displayDates();
						}
					});
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
					$('#dateFrom').val(presentDate);
					$( "#PaidIn, #PaidOut, #Both" ).on( "click", function() {
						parsePaidInPaidOutResponse(prevRes, '');
					});

					/*
					 * function getWeekNumber() { var tDate
					 * =$('#dateFrom').val(); var date = tDate.split('/')[0];
					 * var month = tDate.split('/')[1]; var year =
					 * tDate.split('/')[2];
					 * 
					 * 
					 * Date.prototype.getWeek = function(){ var onejan = new
					 * Date(year,0,1); var today= new Date(year, month, date);
					 * dayOfYear =((today - onejan + 1 )/86400000);
					 * console.log(dayOfYear); day = today.getDay();
					 * console.log("dayOfYear" +day);
					 * console.log(Math.ceil(dayOfYear/7)); return
					 * Math.ceil(dayOfYear/7); }; console.log(tDate); var
					 * formattedDate = new Date(tDate); var currentWeekNumber =
					 * formattedDate.getWeek();
					 * 
					 * 
					 * currentWeekNumber = currentWeekNumber+"."+year;
					 * $("#weekYear").val(currentWeekNumber);
					 * console.log("WeekNumber:"+currentWeekNumber); }
					 */

					function getWeekNumber() {
						var tDate = $('#dateFrom').val();
						var date = tDate.split('/')[0];
						var month = tDate.split('/')[1];
						var year = tDate.split('/')[2];

						Date.prototype.getWeek = function() {
							var onejan = new Date(year, 0, mondayDateForWeek);
							console.log("mondayDateForWeek:"
									+ mondayDateForWeek);
							var today = new Date(year, month - 1, date);
							var dayOfYear = ((today - onejan + 86400000) / 86400000);
							day = today.getDay();
							console.log(Math.ceil(dayOfYear / 7));
							return Math.ceil(dayOfYear / 7);
						};

						var formattedDate = new Date(tDate);
						var currentWeekNumber = formattedDate.getWeek();
						currentWeekNumber = Number(currentWeekNumber) + 1;
						currentWeekNumber = currentWeekNumber + "." + year;
						$("#weekYear").val(currentWeekNumber);
						console.log("WeekNumber:" + currentWeekNumber);
					}

					function findMondayOfYear() {

						var tDate = $('#dateFrom').val();

						var yearGiven = tDate.split('/')[2];

						var januaryFirstDate = new Date(yearGiven, 0, 1);
						console.log(januaryFirstDate);
						var dateVal = januaryFirstDate.getDate();
						var month = januaryFirstDate.getMonth();
						var year = januaryFirstDate.getFullYear();

						var date = new Date(year, month, dateVal);
						console.log(date);
						var current = date.getTime();
						// var currentEndDate=date.getTime();

						var mondayEndDate = '';

						if (date.getDay() == 1) {
							mondayEndDate = new Date(current);
							var mondayDate = mondayEndDate.getDate();
							var mondayMonth = mondayEndDate.getMonth() + 1;
							var mondayYear = mondayEndDate.getFullYear();

							if (mondayDate < 10) {
								mondayDate = '0' + mondayDate;
							}
							if (mondayMonth < 10) {
								mondayMonth = '0' + mondayMonth;
							}
							mondayEndDate = (mondayDate + '/' + mondayMonth
									+ '/' + mondayYear);
						} else if (date.getDay() == 0) {
							/* for(var i=7;i>1;i++){ */
							current = Number(current) + 86400000;
							mondayEndDate = new Date(current);
							var mondayDate = mondayEndDate.getDate();
							var mondayMonth = mondayEndDate.getMonth() + 1;
							var mondayYear = mondayEndDate.getFullYear();

							if (mondayDate < 10) {
								mondayDate = '0' + mondayDate;
							}
							if (mondayMonth < 10) {
								mondayMonth = '0' + mondayMonth;
							}
							mondayEndDate = (mondayDate + '/' + mondayMonth
									+ '/' + mondayYear);
							// }
						} else {
							for ( var i = (date.getDay()); i < 8; i++) {
								current = Number(current) + 86400000;
								mondayEndDate = new Date(current);
								var mondayDate = mondayEndDate.getDate();
								var mondayMonth = mondayEndDate.getMonth() + 1;
								var mondayYear = mondayEndDate.getFullYear();

								if (mondayDate < 10) {
									mondayDate = '0' + mondayDate;
								}
								if (mondayMonth < 10) {
									mondayMonth = '0' + mondayMonth;
								}
								mondayEndDate = (mondayDate + '/' + mondayMonth
										+ '/' + mondayYear);
							}

							// console.log(mondayEndDate);
						}
						console.log("MondayEndDate:" + mondayEndDate);
						var mondayJanDate = mondayEndDate;
						var mondayJanD = mondayJanDate.split('/')[0];
						var mondayJanMonth = mondayJanDate.split('/')[1];
						var mondayJanYear = mondayJanDate.split('/')[2];

						var dateFindMonday = new Date(mondayJanYear,
								mondayJanMonth - 1, mondayJanD);

						mondayDateForWeek = mondayJanD;
						console.log("mondayJanD:" + mondayJanD);
						console
								.log("dateFindMonday:"
										+ dateFindMonday.getDay());

					}
					function displayDates() {
						var tDate = $('#dateFrom').val();
						var dateVal = tDate.split('/')[0];
						var month = tDate.split('/')[1];
						var year = tDate.split('/')[2];

						var date = new Date(year, month - 1, dateVal);
						var current = date.getTime();
						var currentEndDate = date.getTime();

						if (date.getDay() == 1) {
							mondayEndDate = new Date(current);
							var mondayDate = mondayEndDate.getDate();
							var mondayMonth = mondayEndDate.getMonth() + 1;
							var mondayYear = mondayEndDate.getFullYear();

							if (mondayDate < 10) {
								mondayDate = '0' + mondayDate;
							}
							if (mondayMonth < 10) {
								mondayMonth = '0' + mondayMonth;
							}
							mondayEndDate = (mondayDate + '/' + mondayMonth
									+ '/' + mondayYear);
						} else if (date.getDay() == 0) {
							for ( var i = 7; i > 1; i--) {
								current = Number(current) - 86400000;
								mondayEndDate = new Date(current);
								var mondayDate = mondayEndDate.getDate();
								var mondayMonth = mondayEndDate.getMonth() + 1;
								var mondayYear = mondayEndDate.getFullYear();

								if (mondayDate < 10) {
									mondayDate = '0' + mondayDate;
								}
								if (mondayMonth < 10) {
									mondayMonth = '0' + mondayMonth;
								}
								mondayEndDate = (mondayDate + '/' + mondayMonth
										+ '/' + mondayYear);
							}
						} else {
							for ( var i = (date.getDay()); i > 1; i--) {
								current = Number(current) - 86400000;
								mondayEndDate = new Date(current);
								var mondayDate = mondayEndDate.getDate();
								var mondayMonth = mondayEndDate.getMonth() + 1;
								var mondayYear = mondayEndDate.getFullYear();

								if (mondayDate < 10) {
									mondayDate = '0' + mondayDate;
								}
								if (mondayMonth < 10) {
									mondayMonth = '0' + mondayMonth;
								}
								mondayEndDate = (mondayDate + '/' + mondayMonth
										+ '/' + mondayYear);
							}
							console.log(mondayEndDate);
						}

						if (date.getDay() == 0) {
							sundayEndDate = new Date(currentEndDate);
							var sundayDate = sundayEndDate.getDate();
							var sundayMonth = sundayEndDate.getMonth() + 1;
							var sundayYear = sundayEndDate.getFullYear();

							if (sundayDate < 10) {
								sundayDate = '0' + sundayDate;
							}
							if (sundayMonth < 10) {
								sundayMonth = '0' + sundayMonth;
							}
							sundayEndDate = (sundayDate + '/' + sundayMonth
									+ '/' + sundayYear);
						}

						else {

							sundayEndDate = new Date(current + (86400000 * 6));

							var sundayDate = sundayEndDate.getDate();
							var sundayMonth = sundayEndDate.getMonth() + 1;
							var sundayYear = sundayEndDate.getFullYear();

							if (sundayDate < 10) {
								sundayDate = '0' + sundayDate;
							}
							if (sundayMonth < 10) {
								sundayMonth = '0' + sundayMonth;
							}
							sundayEndDate = (sundayDate + '/' + sundayMonth
									+ '/' + sundayYear);
						}
						console.log(sundayEndDate);

						$('#weekFromDateHide').val(mondayEndDate);
						$('#weekToDateHide').val(sundayEndDate);
						bindDynaCtrlInputChange();

						$('#week').text(mondayEndDate + ' - ' + sundayEndDate);
					}

					// findMondayOfYear();
					// getWeekNumber();
					displayDates();
					$('#reportContent').removeClass('hideBlock');
					$(".sortTable").removeClass('hideBlock');
					/*
					 * $(".sortTable tbody:first").html('');
					 * $(".sortTable").tablesorter({ emptyTo: 'top' });
					 */
					$('#reportContent').addClass('hideBlock');
					$(".sortTable").addClass('hideBlock');

					// Code for accordion
					$("#accordion").accordion({
						header : "h3.mainAccordion",
						collapsible : true,
						heightStyle : "content"
					});

					$("#generateReport")
							.click(
									function() {
										hideError();
										var fromDate = formateDate($(
												'#dateFrom').val());
										$('#dateFromHide').text(fromDate);

										var weekTrading = $('#week').text();
										$('#weekHide').text(weekTrading);
										$('#weekFromDateHide').val(
												mondayEndDate);
										$('#weekToDateHide').val(sundayEndDate);
										var posOperatorType = $(
												"input[name='pos']:checked")
												.val();
										$("#posOperatorType").text(
												posOperatorType);

										var posNames = [];
										if ($('#usersList li') != undefined) {
											$('#usersList li')
													.filter(
															function() {
																posNames
																		.push($(
																				this)
																				.text()
																				.trim());
															});
										}
										var today = new Date();
										var date1 = new Date(fromDate
												.split('/')[2], fromDate
												.split('/')[1] - 1, fromDate
												.split('/')[0]);

										var parts = fromDate.split('/');
										var partsLen = parts.length;
										var date1Len = fromDate.length;

										if (fromDate == "") {
											showError('Please enter Date.');
											callFrom();
										} else if (partsLen != 3
												|| date1Len != 10
												|| fromDate.split('/')[0] > 31
												|| fromDate.split('/')[1] > 12
												|| fromDate.split('/')[2].length != 4) {
											showError('Invalid From Date.');
											callFrom();
										} else if (date1 > today) {
											showError("Future Dates are not allowed for Date.");
											callFrom();
										} /*else if ($('#userID').val().trim() == ''
												&& $('#single').is(':checked')) {
											$('#userID').focus();
											showError('Please fill user Id or Name.');
										} else if ($('#multiple')
												.is(':checked')
												&& $("#multiplePOS ul li").length == 0) {
											$('#manyUserId').focus();
											showError('Please verify and add user Id or Name.');
										} else if ($('#userID').val().trim() != ''
												&& $('#single').is(':checked')
												&& $('#verifyLabel').hasClass(
														'hideBlock')) {
											$('#userID').focus();
											showError('Please verify user Id or Name.');
										}*/

										else {

											hideError();
											var data = $('#paidInPaidOut')
													.serialize();
											//data += '&posNames=' + posNames;
											//console.log(data);
											paidInPaidOut(data);
										}

									});

					$("#closeLink").click(function() {
						$('#accordion').accordion({
							active : true
						});
					});

					$(".backBtn").click(function(e) {
						window.location.href = "../login/goingHome.htm";
					});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					// code for table sorter
					// $(".actionRows").tablesorter();

					$(".actionRows tr th").click(function() {

						$('.actionRows tr td').each(function() {
							$(this).removeClass("sorted");
						});
					});

					$(".actionRows th").click(function() {

						$('.actionRows tr td').each(function() {
							$(this).removeClass("sorted");
						});

						col = $(this).parent().children().index($(this));

						// col=$('th.sorted').index();

						$('.actionRows tr').each(function() {
							$(this).find('td').eq(col).addClass("sorted");
						});
					});

					// checks radio buttons in all, single or multiple
					$("#singlePOS").addClass('hideBlock');
					$('#all').click(function() {
						$("#singlePOS").addClass('hideBlock');
						$("#multiplePOS").addClass('hideBlock');
						$("#userID").val('');
						$("#manyUserId").val('');
						$('#verifyLabel').addClass('hideBlock');

					});

					$('#single').click(function() {
						$("#singlePOS").removeClass('hideBlock');
						$("#multiplePOS").addClass('hideBlock');
						$("#manyUserId").val('');
						$('#verifyLabel').addClass('hideBlock');
					});

					$('#multiple').click(function() {
						$("#multiplePOS").removeClass('hideBlock');
						$("#singlePOS").addClass('hideBlock');
						$("#userID").val('');
						$('#verifyLabel').addClass('hideBlock');
					});

				});

function callFrom() {
	setTimeout(function() {
		$('#dateFrom').focus();
	}, 200);
}

function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');

	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#errorMsgDiv").removeClass('nodataMessage');
	$('.verified').addClass('hideBlock');
	hideContent();
}

function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
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

function hideContent() {

	$('#reportContent,#reportContent,.ContentTable.actionRows').addClass(
			'hideBlock');
	// $('.paginationWrapper').hide();
}

function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}

function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}

function paidInPaidOut(data1) {
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getPaidInPaidOut.htm",
		data : data1,
		beforeSend : function() {
			fullScreenLoader();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			parsePaidInPaidOutResponse(response);
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
		}
	});
}

function showOldSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0) {
		if ($('#multiple').is(':checked'))
			verifyAddUser(prevRes, '');
		else
			verifyUser(prevRes, '');
	}
}

function updateSortPlugin() {
	$(".sortTable").trigger("update");

}
function parsePaidInPaidOutResponse(response) {
	redoHide = true;
	console.log('parsing the response');
	var output ='';
	var msg = '';
	var paidInPaidOut = '';
	var amount;
	var groupTenderTypeHash = {};
	var groupCodeAmt=0.0;
	var noRec = 0;
	var posIndicator; 
	output = $.parseJSON(response);
	paidInPaidOut = output.data;
	msg = output.msg;
	if (msg != undefined && msg != null && msg == '' && paidInPaidOut != null
			&& paidInPaidOut != undefined) {
		setReportGenerationFlags();
		var content = '';
		
		for ( var i = 0; i < paidInPaidOut.length; i++) {
			
			paidInPaidOut[i].type = (paidInPaidOut[i].type != null && paidInPaidOut[i].type != undefined) ? ((paidInPaidOut[i].type=="PAIN"||paidInPaidOut[i].type=="TAPI")?"Paid In":(paidInPaidOut[i].type=="POUT"||paidInPaidOut[i].type=="TAPO")?"Paid Out":"")
					: '';
			if(($('input[name="selectType"]:checked').val()== 'PaidIn' && paidInPaidOut[i].type == 'Paid In')
					|| ($('input[name="selectType"]:checked').val()== 'PaidOut' && paidInPaidOut[i].type == 'Paid Out')
					|| $('input[name="selectType"]:checked').val()== 'Both'
						) {
			noRec++;
			paidInPaidOut[i].performedBy = (paidInPaidOut[i].performedBy != null && paidInPaidOut[i].performedBy != undefined) ? paidInPaidOut[i].performedBy
					: '';
			paidInPaidOut[i].authorisedBy = (paidInPaidOut[i].authorisedBy != null && paidInPaidOut[i].authorisedBy != undefined) ? paidInPaidOut[i].authorisedBy
					: '';
			paidInPaidOut[i].date = (paidInPaidOut[i].date != null && paidInPaidOut[i].date != undefined) ? convertDate(paidInPaidOut[i].date)
					: '';
			paidInPaidOut[i].reference = (paidInPaidOut[i].reference != null && paidInPaidOut[i].reference != undefined) ? paidInPaidOut[i].reference
					: '';
			paidInPaidOut[i].code = (paidInPaidOut[i].code != null && paidInPaidOut[i].code != undefined) ? paidInPaidOut[i].code
					: '';
			paidInPaidOut[i].codeDescription = (paidInPaidOut[i].codeDescription != null && paidInPaidOut[i].codeDescription != undefined) ? paidInPaidOut[i].codeDescription
					: '';
			paidInPaidOut[i].tenderType = (paidInPaidOut[i].tenderType != null && paidInPaidOut[i].tenderType != undefined) ? paidInPaidOut[i].tenderType
					: '';
			paidInPaidOut[i].paidIn = (paidInPaidOut[i].paidIn != null && paidInPaidOut[i].paidIn != undefined) ? Number(paidInPaidOut[i].paidIn).toFixed(2)
					: '';
			paidInPaidOut[i].paidOut = (paidInPaidOut[i].paidOut != null && paidInPaidOut[i].paidOut != undefined) ? Number(paidInPaidOut[i].paidOut).toFixed(2)
					: '';
			amount = (paidInPaidOut[i].type=="Paid In")?paidInPaidOut[i].paidIn:(paidInPaidOut[i].type=="Paid Out")?paidInPaidOut[i].paidOut:'';
			paidInPaidOut[i].posIndicator = (paidInPaidOut[i].posIndicator != null && paidInPaidOut[i].posIndicator != undefined) ? paidInPaidOut[i].posIndicator
					: '';
			if(paidInPaidOut[i].posIndicator == "X"||paidInPaidOut[i].posIndicator == "x") {
				posIndicator = '*';
				
			}
			else {
				posIndicator = '&nbsp;';
			}
			
			content += '<tr id="' + i + '" class="posTr page-' + Math.ceil(noRec/10);
			if (noRec > 10) {
				content += ' hideBlock ';
			}
			
			content += '">';
			content += '<td  class="leftValue">'+paidInPaidOut[i].performedBy+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].authorisedBy+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].date+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].reference+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].code+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].codeDescription+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].type+'</td>';
			content += '<td  class="leftValue">'+paidInPaidOut[i].tenderType+'</td>';
			content += '<td  class="rightValue">'+amount+' '+posIndicator+'</td>';
			content += '</tr>';
			
			if (paidInPaidOut[i].tenderType in groupTenderTypeHash)
			{
				groupTenderTypeHash[paidInPaidOut[i].tenderType] = Number(groupTenderTypeHash[paidInPaidOut[i].tenderType])+Number(amount);
			}
			else {
				groupTenderTypeHash[paidInPaidOut[i].tenderType] = Number(amount);
			}
			groupCodeAmt += Number(amount);
			if(paidInPaidOut[i].codeLast == true) {
			
				content += '<tr class="totalRow grpTotTr page-' + Math.ceil(noRec/10);
				if (noRec > 10) {
					content += ' hideBlock ';
				}
				content += '">';
				content += '<td colspan="8" class="valueInfo storeTotal rightValue">TOTAL</td>';
				content += '<td class="numberColumn  total valueInfo rightValue">'+Number(groupCodeAmt).toFixed(2)+'</td>';
				content += '</tr>';
				groupCodeAmt = 0.0;
			}
			if(paidInPaidOut[i].typeLast == true) {
				var tmpTot = 0.0;
				var firstRowLbl ='';
				var isFirstRow = true;
				if(paidInPaidOut[i].type=="Paid In") {
					firstRowLbl = "TOTAL PAID IN'S";
				}
				else if(paidInPaidOut[i].type=="Paid Out") {
					firstRowLbl = "TOTAL PAID OUT'S";
				}
				for (var x in groupTenderTypeHash) {
					content += '<tr class="grpTotTr page-' + Math.ceil(noRec/10);
					if (noRec > 10) {
						content += ' hideBlock ';
					}
					content += '">';
					if(isFirstRow == true) {
						content += '<td colspan="6" class="rightValue" style="font-weight:bold;">'+firstRowLbl+'</td>';
					}
					else {
						content += '<td colspan="6" class="rightValue" style="font-weight:bold;"></td>';
					}
					content += '<td colspan="2" class="rightValue" style="font-weight:bold;">'+x+'</td>';
					content += '<td class="rightValue" style="font-weight:bold;">'+Number(groupTenderTypeHash[x]).toFixed(2)+'</td>';
					content += '</tr>';
					tmpTot += Number(groupTenderTypeHash[x]);
					isFirstRow = false;
				}
				content += '<tr class="grpTotTr page-' + Math.ceil(noRec/10);
				if (noRec > 10) {
					content += ' hideBlock ';
				}
				content += '">';
				content += '<td colspan="8" class="rowSection  rowHighlight rightValue">Tender Totals</td>';
				content += '<td class="rowSection  rowHighlight rightValue">'+Number(tmpTot).toFixed(2)+'</td>';
				content += '</tr>';
				groupTenderTypeHash = {};
			}
			}
		}
		$('#sortTable tbody:first').html('');
		$('#sortTable tbody:first').append(content);
		//$(".sortTable").trigger("update");
		curPage = 1;
		if(noRec > 10) {
			$('.paginationDiv').pagination({
				items : noRec,
				itemsOnPage : 10,
				cssStyle : 'compact-theme',
				currentPage : curPage,
				onPageClick : function(pageNo) {
					curPage = pageNo;
					var pageClass = 'page-' + pageNo;
					$('#sortTable').find('.posTr,.grpTotTr').filter(function() {
						if ($(this).hasClass(pageClass)) {
							$(this).removeClass('hideBlock');
						} else {
							$(this).addClass('hideBlock');
						}
					});
					//pagenationCallbackMethod(pageNo);
				}
			});
			$(' .paginationDiv').removeClass('hideBlock');
		}
		else {
			$(' .paginationDiv').addClass('hideBlock');
		}
		showPaidInPaidOutBlock();
	}
	else {
		if (msg == 'No Data Found.' || msg==NDF) {
			showWarning(NDF);
		}
		else {
			showError(msg);
		}
	}
}

function storeTotalValue() {

	var transacCount = 0;

	$('.totalRow').filter(function() {

		transacCount += Number($(this).find('.total').text());

	});

	$('.storeTot').text(transacCount.toFixed(2));

}

function showPaidInPaidOutBlock() {
	// pagenationCallbackMethod();
	$('#reportContent').removeClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function showContentUsersListBlock() {
	$('#usersList').removeClass('hideBlock');
}
function setDefaultDate() {
	var dateT = new Date();
	var month = '';
	if (dateT.getMonth() + 1 < 10) {
		month = dateT.getMonth() + 1;
		month = '0' + month;
	} else
		month = dateT.getMonth() + 1;
	var day = '';
	if (dateT.getDate() < 10) {
		day = dateT.getDate();
		day = '0' + day;
	} else
		day = dateT.getDate();
	$('#dateFrom,#fromDte').val(day + '/' + month + '/' + dateT.getFullYear());

	var totalMonth = 12;
	var timeT = dateT.getTime() + (60 * 60 * 24 * 1000 * 30 * totalMonth);
	dateT.setTime(timeT);
	var month = '';
	if (dateT.getMonth() + 1 < 10) {
		month = dateT.getMonth() + 1;
		month = '0' + month;
	} else
		month = dateT.getMonth() + 1;
	var day = '';
	if (dateT.getDate() < 10) {
		day = dateT.getDate();
		day = '0' + day;
	} else
		day = dateT.getDate();
	// $('#dateTo,#toDte').val(day+'/'+month+'/'+dateT.getFullYear());

}
function pagenationCallbackMethod(pageNo) {

	var soldOverTot = 0;

	if(pageNo==undefined || pageNo==null) {
		pageNo = 1;
	}
	$('.sortTable .parentTr:visible').filter(function() {

		soldOverTot += Number($('.declrResult').text().trim());

	});

	$('.total').text(soldOverTot.toFixed(2));

}

function showWarning(text) {

	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	$('.paginationDiv').removeClass('hideBlock');
}

function showndHide() {
	if ($('#yes').is(':checked')) {
		$('.cashName').removeClass('hideBlock');
		$('.posName').removeClass('hideBlock');

	} else {
		$('.cashName').addClass('hideBlock');
		$('.posName').addClass('hideBlock');
		// $('#posColSpan').attr('colspan',"5");
	}

}
function paidInPaidOutPrintJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#paidInPaidOut').attr("action", "getPaidInPaidOut.pdf");
		$('#paidInPaidOut').attr('target','_blank');
		$('#paidInPaidOut').submit();
	}
}
