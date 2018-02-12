var printMap = {};
var shortList = [];
var obj={};
var recordCount;
var currentPage;
var curPage;
var prevRes = '';
var selYY = '';
var selWW = '';
var storeTotalTender = '';
var storePrint = '';
var mondayDateForWeek = '';
var flagStore = true;
var flagStorePrint = true;
var posIdLength = "";

var mondayEndDate = '';
var sundayEndDate = '';
var totalList = [];
var totList = [];
var z = 0;
var lengthCheck = 0;
var openingLoanMaxTot = 0;
var NDF="Sorry, no results found for your search criteria. Please try again.";
visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="pos"]:checked';
hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPos"]';
allInputCtrls = 'input[name="dateFrom"]';
allInputCtrls1 = 'input[name="dateTo"]';
var date = new Date();
var currentMonth = date.getMonth();
var currentDate = date.getDate();
var currentYear = date.getFullYear();
$(document)
		.ready(
				function() {
					$("#userID").change(function() {
						bindDynaCtrlInputChange();
					});
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
						minDate: new Date(currentYear, currentMonth-3, currentDate),
						maxDate: new Date(currentYear, currentMonth+3, currentDate),
						zIndex : 50,	
						onClose : function(selectedDate) {
							// findMondayOfYear();
							// getWeekNumber();
							displayDates();


						}	
					});
					$("#dateTo").datepicker({
						dateFormat : "dd/mm/yy",
						minDate: new Date(currentYear, currentMonth-3, currentDate),
						maxDate: new Date(currentYear, currentMonth+3, currentDate),
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
					$('#dateTo').val(presentDate);
					var presentDate = (newDate + "/" + (newMonth) + "/" + newYear);
					$today = new Date();
					$yesterday = new Date($today);
					$yesterday.setDate($today.getDate() - 1);
					var $dd = $yesterday.getDate();
					var $mm = $yesterday.getMonth()+1; //January is 0!
					var $yyyy = $yesterday.getFullYear();
					if($dd<10){$dd='0'+$dd} if($mm<10){$mm='0'+$mm} $yesterday = $dd+'/'+$mm+'/'+$yyyy ;
					$('#dateFrom').val($yesterday);
					
					
					
					
					
					// $("#dateFrom").datepicker("setDate", today);
					// currDate();
					function currDate() {/*
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
					*/}
					var day = '';

					function getWeekNumber() {/*
						var tDate = $('#dateFrom').val();
						var date = tDate.split('/')[0];
						var month = tDate.split('/')[1];
						var year = tDate.split('/')[2];

						
						 * Date.prototype.getWeek = function() { var date = new
						 * Date(this.getTime()); date.setHours(0, 0, 0, 0); //
						 * Thursday in current week decides the year.
						 * date.setDate(date.getDate() + 3 - (date.getDay() + 6) %
						 * 7); // January 4 is always in week 1. var week1 = new
						 * Date(date.getFullYear(), 0, 4); // Adjust to Thursday
						 * in week 1 and count number of weeks from date to
						 * week1. currentWeekNumber = Number(1 +
						 * Math.round(((date.getTime() - week1.getTime()) /
						 * 86400000 - 3 + (week1.getDay() + 6) % 7) / 7));
						 * return 1 + Math.round(((date.getTime() -
						 * week1.getTime()) / 86400000 - 3 + (week1.getDay() +
						 * 6) % 7) / 7); };
						 

						Date.prototype.getWeek = function() {
							var onejan = new Date(year, 0, mondayDateForWeek);

							var today = new Date(year, month - 1, date);
							var dayOfYear = ((today - onejan + 86400000) / 86400000);
							day = today.getDay();

							return Math.ceil(dayOfYear / 7);
						};

						var formattedDate = new Date(tDate);
						var currentWeekNumber = formattedDate.getWeek();
						currentWeekNumber = Number(currentWeekNumber) + 1;
						currentWeekNumber = currentWeekNumber + "." + year;
						$("#weekYear").val(currentWeekNumber);

					*/}

					function findMondayOfYear() {/*

						var tDate = $('#dateFrom').val();

						var yearGiven = tDate.split('/')[2];

						var januaryFirstDate = new Date(yearGiven, 0, 1);

						var dateVal = januaryFirstDate.getDate();
						var month = januaryFirstDate.getMonth();
						var year = januaryFirstDate.getFullYear();

						var date = new Date(year, month, dateVal);

						var current = date.getTime();
						// var currentEndDate=date.getTime();
						var parts = tDate.split('/');
						var partsLen = parts.length;
						var date1Len = tDate.length;
						var mondayEndDate = '';

						if(tDate != ""){
						

							 if (partsLen != 3
										|| date1Len != 10
										|| tDate.split('/')[0] > 31
										|| tDate.split('/')[1] > 12
										|| tDate.split('/')[2].length != 4) {
									showError('Invalid From Date.');
									
								}
							 else
								 {
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
							 for(var i=7;i>1;i++){ 
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

						}

						var mondayJanDate = mondayEndDate;
						var mondayJanD = mondayJanDate.split('/')[0];
						var mondayJanMonth = mondayJanDate.split('/')[1];
						var mondayJanYear = mondayJanDate.split('/')[2];

						var dateFindMonday = new Date(mondayJanYear,
								mondayJanMonth - 1, mondayJanD);

						mondayDateForWeek = mondayJanD;
						}
						}

					*/}
					/*
					 * function getWeekNumber() { var tDate
					 * =$('#dateFrom').val(); var date = tDate.split('/')[0];
					 * var month = tDate.split('/')[1]; var year =
					 * tDate.split('/')[2];
					 * 
					 * Date.prototype.getWeek = function(){ var onejan = new
					 * Date(year,0,1); var today= new Date(year, month, date);
					 * var dayOfYear =((today - onejan + 1 )/86400000); day =
					 * today.getDay(); console.log(Math.ceil(dayOfYear/7));
					 * return Math.ceil(dayOfYear/7); };
					 * 
					 * var formattedDate = new Date(tDate); var
					 * currentWeekNumber = formattedDate.getWeek();
					 * 
					 * currentWeekNumber = currentWeekNumber+"."+year;
					 * $("#weekYear").val(currentWeekNumber);
					 * console.log("WeekNumber:"+currentWeekNumber); }
					 */
					function dateDiff(){
						var tDate = $('#dateFrom').val();
						var tDate1 = $('#dateTo').val();
						
							var a =  Math.round(Math.abs((+tDate) - (+tDate1))/8.64e7);
							if(a>7){
								showError('Enter valid Date Range');
							}
							
					}
					function displayDates() {
						var tDate = $('#dateFrom').val();
						var tDate1 = $('#dateTo').val();
						$('#weekFromDateHide').val(tDate);
						$('#weekToDateHide').val(tDate1);
						/*
						var tDate = $('#dateFrom').val();
						
						var dateVal = tDate.split('/')[0];
						var month = tDate.split('/')[1];
						var year = tDate.split('/')[2];

						var date = new Date(year, month - 1, dateVal);
						var current = date.getTime();
						var currentEndDate = date.getTime();
						var parts = tDate.split('/');
						var partsLen = parts.length;
						var date1Len = tDate.length;

						if(tDate != "")
							{
							
						 if (partsLen != 3
									|| date1Len != 10
									|| tDate.split('/')[0] > 31
									|| tDate.split('/')[1] > 12
									|| tDate.split('/')[2].length != 4) {
								showError('Invalid From Date.');
								$('#week').text("" + ' - ' + "");	
							}
						 else
							 {
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
							// console.log(mondayEndDate);
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
						// console.log(sundayEndDate);
						
						$('#weekFromDateHide').val(mondayEndDate);
						$('#weekToDateHide').val(sundayEndDate);
						bindDynaCtrlInputChange();

						$('#week').text(mondayEndDate + ' - ' + sundayEndDate);
					
							}
							}
						if(tDate == "")
							{
							$('#week').text("" + ' - ' + "");
							}
						*/}
					/*
					 * var today = new Date(); var newDate = today.getDate();
					 * var newMonth = today.getMonth() + 1;
					 * 
					 * 
					 * if (newDate < 10) { newDate = '0' + newDate; } if
					 * (newMonth < 10) { newMonth = '0' + newMonth; } var
					 * presentDate = (newDate + "/" + (newMonth) + "/" +
					 * today.getFullYear()); $('#dateTo').val(presentDate);
					 * 
					 * var previousDate = new Date();
					 * previousDate.setTime(previousDate.getTime() - (60 * 60 *
					 * 24 * 1000));
					 * 
					 * var newPrevDate = previousDate.getDate(); var
					 * newPrevMonth = previousDate.getMonth() + 1;
					 * 
					 * if (newPrevDate < 10) { newPrevDate = '0' + newPrevDate; }
					 * if (newPrevMonth < 10) { newPrevMonth = '0' +
					 * newPrevMonth; }
					 * 
					 * var oneDayBefCurDate = (newPrevDate + "/" +
					 * (newPrevMonth) + "/" + previousDate .getFullYear());
					 * $('#dateFrom').val(oneDayBefCurDate);
					 */
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

					$("#all").click(function(){
						hideError();
				});
					$("#single").click(function(){
						hideError();
				});

					$("#multiple").click(function(){
						hideError();
				});


					$("#generateReport")
							.click(
									function() {
										hideError();
										dateDiff();
										//var posIds = [];
										var tDate = $('#dateFrom').val();
										var tDate1 = $('#dateTo').val();
										
										var posIds = getMultiplePosIds();
										var fromDate = formateDate($(
												'#dateFrom').val());
										var toDate =  formateDate($(
										'#dateTo').val());
										var validDate =$('#dateFrom').val();
										var today = new Date();
										$('#dateFromHide').text(fromDate);
										var weekTrading = $('#week').text();
										$('#weekHide').text(weekTrading);
										/*$('#weekFromDateHide').val(
												mondayEndDate);
										$('#weekToDateHide').val(sundayEndDate);*/
										 var start = $("#dateFrom").datepicker("getDate");
									        var end = $("#dateTo").datepicker("getDate");
									        var days = (end - start) / (1000 * 60 * 60 * 24);
									        
										var posOperatorType = $(
												"input[name='pos']:checked")
												.val();
										$("#posOperatorType").text(
												posOperatorType);

										var date1 = new Date(fromDate
												.split('/')[2], fromDate
												.split('/')[1] - 1, fromDate
												.split('/')[0]);
										var date2 = new Date(toDate
												.split('/')[2], toDate
												.split('/')[1] - 1, toDate
												.split('/')[0]);
										var parts = fromDate.split('/');
										var partsLen = parts.length;
										var date1Len = fromDate.length;
										
										var parts1 = toDate.split('/');
										var partsLen1 = parts1.length;
										var date1Len2 = toDate.length;
										// date1.setFullYear(parts[2], parts[1]
										// - 1, parts[0]);
										/*
										 * var newTime=Number(date1.getTime());
										 * 
										 * newTime = Number(newTime) + Number(24 *
										 * 60 * 60 * 1000 * 90);
										 */
									
										
										if (fromDate == "" || toDate == "" ) {
											showError('Please enter Date.');
											callFrom();
										} else if (partsLen != 3
												|| date1Len != 10
												|| fromDate.split('/')[0] > 31
												|| fromDate.split('/')[1] > 12
												|| fromDate.split('/')[2].length != 4 || partsLen1 != 3
												|| date1Len2 != 10
												|| toDate.split('/')[0] > 31
												|| toDate.split('/')[1] > 12
												|| toDate.split('/')[2].length != 4) {
											showError('Invalid Date Format.');
											callFrom();
										} else if (date1 > today || date2 > today) {
											showError("Future Dates are not allowed for Date.");
											callFrom();
										} else if(days >7){
											showError('Date Range is more than one week.');
											callFrom();
										}else if(date1 > date2){
											showError('Invalid Date Range.');
											callFrom();
										}
										else if ($('#userID').val().trim() == ''
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
										} else {
											hideError();
											//$('#posIds').val(posIds);
											var data = $('#ALHFinancialData')
													.serialize();
											//data += '&posIds=' + posIds;

											posConsolidation(data);
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
					//bindDynaCtrlInputChange();
					$('#all').click(function() {
						$("#singlePOS").addClass('hideBlock');
						$("#multiplePOS").addClass('hideBlock');
						$("#userID").val('');
						$("#manyUserId").val('');
						$('#verifyLabel').addClass('hideBlock');
						visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="pos"]:checked';
						hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPos"]';
						bindDynaCtrlInputChange();
					});

					$('#single').click(function() {
						$("#singlePOS").removeClass('hideBlock');
						$("#multiplePOS").addClass('hideBlock');
						$("#manyUserId").val('');
						$('#verifyLabel').addClass('hideBlock');
						//$('input[name="posIdSingle"]').val('');
						//$('input[name="hdnPosIdSingle"]').val('');
						visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="pos"]:checked,input[name="userID"]';
						hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPos"],input[name="hdnPosIdSingle"]';
						bindDynaCtrlInputChange();
					});

					$('#multiple').click(function() {
						$("#multiplePOS").removeClass('hideBlock');
						$("#singlePOS").addClass('hideBlock');
						$("#userID").val('');
						$('#verifyLabel').addClass('hideBlock');
						//$('input[name="posIds"]').val('');
						checkDuplicateEntries();
						//$('input[name="hdnPosIds"]').val('');
						visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="pos"]:checked,input[name="posIds"]';
						hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPos"],input[name="hdnPosIds"]';
						bindDynaCtrlInputChange();
					});

					$('.removeUser').click(function() {
						$(this).parent().remove();
						checkDuplicateEntries();
					});

					$(document)
							.keypress(
									function(event) {
										var selectedUsers = [];
										$('#multiplePOS ul li ').each(
												function() {
													$('#multiplePOS ul li ')
															.removeData();

													selectedUsers.push($(this)
															.attr('for'));

												});

										if (event.which == 13) {

											event.preventDefault();
											hideError();
											if ($(
													'.formActions .actionBtn:visible')
													.text().length > 0) {
												if ($("#dateFrom").val().trim != ''
														&& ($('#all')
																.is(':checked'))) {
													$('#generateReport')
															.click();
												}

												else if ($("#dateFrom").val().trim != ''
														&& ($('#multiple').is(
																':checked')
																|| $(
																		"#manyUserId")
																		.val() != '' || selectedUsers.length != 0)) {
													$('#verifyAddUser').click();
												} else if ($("#dateFrom").val().trim != ''
														&& ($('#single').is(
																':checked') || $(
																"#userID")
																.val() != '')) {
													$('#verifyUser').click();
												} else if ($('#multiple').is(
														':checked')
														&& $('#manyUserId')
																.val().trim != ''
														|| selectedUsers.length != 0)
													$('#verifyAddUser').click();
												else
													$('#verifyUser').click();
											}
										}
									});

					$("#userID").keyup(function() {

						if (!this.value) {
							$('#verifyLabel').addClass('hideBlock');

						}

					});

					$('#verifyUser')
							.click(
									function() {
										hideError();
										if ($(this).attr('id') == 'verifyUser') {
											hideError();
											if ($('#userID').val().trim() == ''
													&& $('#verifyLabel')
															.hasClass(
																	'hideBlock')) {
												$('#userID').focus();
												showError('Please fill user Id or Name.');

											} else {
												hideError();
												posConsolidationVerifyPOS($(
														'#ALHFinancialData')
														.serialize());

											}
										}
									});

					$('#verifyAddUser')
							.click(
									function() {
										hideError();
										if ($(this).attr('id') == 'verifyAddUser') {
											hideError();
											if ($('#manyUserId').val().trim() == ''
													&& $('#multiple').is(
															':checked')) {
												$('#manyUserId').focus();
												showError('Please fill user Id or Name.');

											} else {
												hideError();
												posConsolidationVerifyMultiplePOS($(
														'#ALHFinancialData')
														.serialize());
											}
										}
									});

					$(document).on('click', ".removeUser", function() {
						$(this).parent().remove();
						checkDuplicateEntries();
						bindDynaCtrlInputChange();
					});

					$(document)
							.on(
									'keyup',
									"#singleUserFilter",
									function() {
										value = $(this).val();
										value = value.toLowerCase();
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
																				value) != -1)) {
																	$(this)
																			.removeClass(
																					'hideBlock');

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

														});
									});

					$(document)
							.on(
									'keyup',
									"#manyUserFilter",
									function() {
										value = $(this).val();
										value = value.toLowerCase();
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
												S		}
															i++;
															// //console.log(i++);
														});
									});

				});

function callFrom() {
	setTimeout(function() {
		$('#dateFrom').focus();
	}, 200);
}

function removePOS() {
	$('.removePOS').click(function() {
		$(this).parent().remove();
	});
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

/*
 * function hideContent() {
 * 
 * $('#reportContent,#reportContent,.ContentTable.actionRows')
 * .addClass('hideBlock'); //$('.paginationDiv').hide(); }
 */

function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}

function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}

function showUserPage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function showContentPOSListBlock() {
	$('#userList').removeClass('hideBlock');
}
function posConsolidation(data) {
	$.ajax({
		type : "get",
		url : "getPOSConsolidation.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();

		},
		success : function(response) {
			prevRes = '';
			prevRes = response;

			formPosConsolidationContent(response);
			openLoanTot();
			
			finalTotal();
			$.loader('close');
			backupInputParams();
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
		}
	});
}

function posConsolidationVerifyMultiplePOS(data) {
	$.ajax({
		type : "get",
		url : "getStoreAndPOS.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			hideError();
			// alert(response);
			verifyAddUser(response);
			stopLoading();

		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			stopLoading();
		}
	});
}
function posConsolidationVerifyPOS(data) {
	$.ajax({
		type : "get",
		url : "getStoreAndPOS.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			hideError();
			// alert(response);
			verifyUser(response);
			bindDynaCtrlInputChange();
			stopLoading();

		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			stopLoading();
		}
	});
}

function verifyUser(response, value) {

	// alert("VerifyUser");
	stopLoading();
	hideError();
	var flag = true;
	var res = $.parseJSON(response);
	var userList = res.data;
	var msg = res.msg;
	var val = $('#userID').val().trim();
	
	if(userList != null && userList!= undefined && userList != " ")
		{
	for ( var f = 0; f < userList.length; f++) {
		hideError();
		if (userList[f].posNumber == val) {
			flag = false;
			$('#userID').val(userList[f].posNumber);
			$('input[name="posIdSingle"]').val(userList[f].posNumber);
			bindDynaCtrlInputChange();
			$('#verifyLabel').removeClass('hideBlock');
		}
	}
	if (flag) {
		if ($('#userID').val().trim() != '') {
			value = $('#userID').val();
			value = value.toUpperCase();
		}
		var tblHdr = '<thead><tr><th data-sort="string" class="sorted ascending" >POS ID</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
		// myMap
		if (res.data != null && res.data != undefined && res.data.length > 0) {
			var list = res.data;
			var j = 0;//
			var k = 1;
			for ( var i = 0; i < list.length; i++) {

				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
						: '';
				if (list[i].posNumber.toUpperCase().indexOf(value) != -1) {
					j++;
					tblHdr += '<tr class="verifyContent ';
					if (k > 1) {
						tblHdr += ' hideBlock ';
					}
					tblHdr += ' pagNo-' + k + '"><td>' + list[i].posNumber
							+ '</td>';
					tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectSingleUser">Select</label></label></td></tr>';

					if (j % 9 == 0) {
						k++;
					}
				}
			}
			if (j > 1) {
				currPage = 1;
				$('#dialog-verify h4')
						.html(
								'Too many search results for <strong>'
										+ $('#userID').val().trim()
										+ '</strong>. Please select a User from the list below.');
				$('#dialog-verify').parent().find(
						'.ui-dialog-titlebar .ui-dialog-title').text(
						'Verify User');
				$('#dialog-verify .searchWrapper')
						.html(
								'<h3>Search:</h3><input type="#" id="singleUserFilter" class="textbox textboxDefaultText" placeholder="Enter User Id or name">');
				$('#dialog-verify .ContentTable').html('');
				$('#dialog-verify .ContentTable').html(tblHdr);
				$('#dialog-verify .noteLbl').remove();
				$("#dialog-verify").dialog("open");
				if (j > 9) {
					$('.verifyPagination').removeClass('hideBlock');
					$('.verifyPagination').pagination({
						items : j,
						itemsOnPage : 9,
						cssStyle : 'compact-theme',
						currentPage : currPage,
						onPageClick : function(pageNumber) {
							showUserPage(pageNumber);

						}

					});
				} else {
					$('.verifyPagination').addClass('hideBlock');
				}
				bindUserContent(flag);

			} else {
				showError('Invalid user Id/Name');
			}
		} else {
			if (flag) {
				showError('Invalid user Id/Name');
			} else {
				showError('Invalid user Id/Name');
			}
		}
		stopLoading();
	}
		}
	else
		{
		if(msg != "Technical issue occurred. Due to service unavailability.")
			{
			showWarning(msg);
			}
		else
			{
			showError(msg);
			}
		}
}
function showUserPage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function verifyAddUser(response, value) {

	hideError();
	var flag = true;
	var res = $.parseJSON(response);
	var userList = res.data;
	var msg = res.msg;
	var val = $('#manyUserId').val().trim();

	if(userList != null && userList != undefined)
		{
	for ( var f = 0; f < userList.length; f++) {
		hideError();
		if (userList[f].posNumber == val) {
			var content = '';

			if (userList != null) {
				flag = false;
				var list = userList[f];
				list.posNumber = (list.posNumber != null && list.posNumber != undefined) ? list.posNumber
						: '';
				if ($('#multiple').is(':checked')) {
					content += '<li><label for="'
							+ list.posNumber
							+ '">'
							+ list.posNumber
							+ '</label><label class="closeMessage removeUser">&nbsp;</label></li>';
				}
			}
			$('#multiplePOS ul').append(content);
			showContentUsersListBlock();
			$('#manyUserId').val('');
			checkDuplicateEntries();

		}
	}
	if (flag) {

		if ($('#manyUserId').val().trim() != '') {
			value = $('#manyUserId').val();
			value = value.toUpperCase();
		}
		var tblHdr = '<thead><tr><th data-sort="string" class="sorted ascending" >User Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
		// myMap
		if (res.data != null && res.data != undefined && res.data.length > 0
				&& res.msg == 'true') {
			var list = res.data;
			var j = 0;
			var k = 1;
			for ( var i = 0; i < list.length; i++) {

				list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
						: '';
				if (list[i].posNumber.toUpperCase().indexOf(value) != -1) {
					j++;
					tblHdr += '<tr class="verifyContent ';
					if (k > 1) {
						tblHdr += ' hideBlock ';
					}
					tblHdr += ' pagNo-' + k + '"><td>' + list[i].posNumber
							+ '</td>';
					tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectUser">Select</label></label></td></tr>';

					if (j % 9 == 0) {
						k++;
					}
				}
			}
			if (j > 1) {
				currPage = 1;
				$('#dialog-verify h4')
						.html(
								'Too many search results for <strong>'
										+ $('#multiplePOS input').val().trim()
										+ '</strong>. Please select a User from the list below.');
				$('#dialog-verify').parent().find(
						'.ui-dialog-titlebar .ui-dialog-title').text(
						'Verify User');
				$('#dialog-verify .searchWrapper')
						.html(
								'<h3>Search:</h3><input type="#" id="manyUserFilter" class="textbox textboxDefaultText" placeholder="Enter User Id or name">');
				$('#dialog-verify .ContentTable').html('');
				$('#dialog-verify .ContentTable').html(tblHdr);
				$('#dialog-verify .noteLbl').remove();
				$("#dialog-verify").dialog("open");
				if (j > 9) {
					$('.verifyPagination').removeClass('hideBlock');
					$('.verifyPagination').pagination({
						items : j,
						itemsOnPage : 9,
						cssStyle : 'compact-theme',
						currentPage : currPage,
						onPageClick : function(pageNumber) {
							showUserPage(pageNumber);

						}

					});
				} else {
					$('.verifyPagination').addClass('hideBlock');
				}
				bindUserContent(flag);

			} else {
				showError('Invalid user Id/Name');
			}
		} else {
			if (flag) {
				showError('Invalid user Id/Name');
			} else {
				showErrorInPopup('Invalid user Id/Name', 'dialog-forgotWizard');
			}
		}
		stopLoading();
	}
	else {
		bindDynaCtrlInputChange();
	}
		}
	else
	{
	if(msg != "Technical issue occurred. Due to service unavailability.")
		{
		showWarning(msg);
		}
	else
		{
		showError(msg);
		}
	}
	
}
function showOldSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0) {
		if ($('#multiple').is(':checked'))
			verifyAddUser(prevRes, '');
		else
			verifyUser(prevRes, '');
	}
}
function checkDuplicateEntries() {
	/*var selectedUsers = [];
	$('#multiplePOS ul li ').each(function() {
		$('#multiplePOS ul li ').removeData();

		selectedUsers.push($(this).attr('for'));

	});*/

	var selectedUsers = {};
	$('#posIds').val('');
	$('#multiplePOS ul li').each(function() {
		var txt = $(this).text();
		if (selectedUsers[txt]) {
			//console.log("txt : "+txt);
			$(this).remove();

		} else {
			if($('#posIds').val().trim()=='') { // $('#posIds').val()==undefined || $('#posIds').val()==null || 
				$('#posIds').val(txt.trim());
			}
			else {
				$('#posIds').val($('#posIds').val()+','+txt.trim());
			}
			selectedUsers[txt] = true;
		}
	});

}
function bindUserContent(flag) {
	$(".sortPopUpTbl").tablesort();
	if (flag) {
		$('.selectUser')
				.click(
						function() {
							hideError();
							if ($('.userList').children().length == 0) {
								$('.userList')
										.removeClass('hideBlock')
										.html(
												'<li><label for="'
														+ $(this)
																.parent()
																.parent()
																.parent()
																.find(
																		'td:first')
																.text().trim()
														+ '">'
														+ $(this)
																.parent()
																.parent()
																.parent()
																.find(
																		'td:first')
																.text().trim()
														+ ' </label><label class="closeMessage removeUser">&nbsp;</label></li>');
								$('#manyUserId').val('');
							} else
								$('.userList')
										.removeClass('hideBlock')
										.children(':last')
										.after(
												'<li><label for="'
														+ $(this)
																.parent()
																.parent()
																.parent()
																.find(
																		'td:first')
																.text().trim()
														+ '">'
														+ $(this)
																.parent()
																.parent()
																.parent()
																.find(
																		'td:first')
																.text().trim()
														+ ' </label><label class="closeMessage removeUser">&nbsp;</label></li>');
							removeUser();
							$("#dialog-verify").dialog("close");
						});
		$('.selectSingleUser').click(
				function() {
					hideError();
					$('#userID').val(
							$(this).parent().parent().parent().find('td:first')
									.text().trim());
					$('#verifyLabel').removeClass('hideBlock');
					$("#dialog-verify").dialog("close");
				});
	}
}
function removeUser() {
	$('.removeUser').click(function() {
		$(this).parent().remove();
	});
}
function pagenationCallbackMethod(pageNo) {

	if(pageNo==undefined || pageNo==null) {
		pageNo = 1;
	}
	var openingLoanVal = 0;
	var salesTenderVal = 0;
	var tenderLoanVal = 0;
	var borrowedFundsVal = 0;
	var paidInVal = 0;
	var paidOutVal = 0;
	var pickUpVal = 0;
	var total = 0;

	$('.parentTr:visible,.totVal:visible')
			.filter(
					function() {

						openingLoanVal = Number($(this).children(
						':nth-child(2)').text().trim());
						salesTenderVal = Number($(this).children(
						':nth-child(3)').text().trim());
						tenderLoanVal = Number($(this).children(
						':nth-child(4)').text().trim());
						borrowedFundsVal = Number($(this).children(
						':nth-child(5)').text().trim());
						paidInVal = Number($(this).children(
						':nth-child(6)').text().trim());
						paidOutVal = Number($(this).children(
						':nth-child(7)').text().trim());
						pickUpVal = Number($(this).children(
						':nth-child(8)').text().trim());
						total = openingLoanVal + salesTenderVal + tenderLoanVal +
						borrowedFundsVal + paidInVal - paidOutVal - pickUpVal;
						$(this).children(
						':nth-child(9)').text(total.toFixed(2));
						total = 0;
					});
}
function formPosConsolidationContent(response) {

	var consolidation = '';
	var msg = '';
	var output = '';
	var s = 0;
	totalList=[];

	output = $.parseJSON(response);
	// alert(response);
	consolidation = output.data;
	msg = output.msg;

	var tValueFormatted = "";
	var flag = false;
	currentPage = 1;

	if (msg != undefined && msg != null && msg == '' && consolidation != null
			&& consolidation != undefined) {
		setReportGenerationFlags();
		recordCount = consolidation.length;
		lengthCheck = recordCount;

		var content = '';
		var consoleResult = '';
		var paidOuts = '';
		var paidIns = '';
		var salesTender = '';
		var tenderLoan = '';
		var borrowedFunds = '';
		var pickUp = '';
		var expectedFunds = '';
		var openingLoan = '';
		var j = 1;
		var k = 1;
		var objTotalSecond = [];
		var grpCount = 0;
		var isGrpFirstRow = true;
		/*
		 * var storeTotalOpeningLoan =0; var storeTotalSalesTender=0; var
		 * storeTotalTenderLoan=0; var storeTotalBrowsedFunds=0; var
		 * storeTotalPaidIn=0; var storeTotalPaidOut=0; var storeTotalPickUp =
		 * 0; var storeTotalExpectedFunds = 0;
		 */

		var notEqualZero = 0;

		var storeTotalOpeningLoan1 = [];
		// alert(tValueFormatted);

		if (consolidation != null) {
			printMap = {};
			//for ( var m in consolidation) {

				consoleResult = 0;
				var list = consolidation;//[m]

				flag = true;


				s = s + 1;

				 totList = [];
				var tenderT = '';
				var set=0;
			
				var storeTotalSalesTender1 = 0;
				var storeTotalTenderLoan1 = 0;
				var storeTotalBrowsedFunds1 = 0;
				var storeTotalPaidIn1 = 0;
				var storeTotalPaidOut1 = 0;
				var storeTotalPickUp1 = 0;
				var storeTotalExpectedFunds1 = 0;
				storeTotalOpeningLoan1 = [];
				var setOpenLoan=0;
				var sttlOpenLoan = 0;
				var totalStlOpenLoan = 0;
				
				for ( var i = 0; i < list.length; i++) {

					///////////////////////////
					if(isGrpFirstRow==true) {
						content += '<tr  id="' + list[i].posNumber + '" class="posTr page-' + Math.ceil((grpCount+1)/3);
						if ((grpCount+1) > 3) {
							content += ' hideBlock "';
						}
						content += '"><td colspan="9" class="rowSection leftValue posValue rowHighlight">POS  '
								+ list[i].posNumber + '</td></tr>';
						isGrpFirstRow = false;
						
						
						totList = [];
						tenderT = '';
						set=0;
						storeTotalSalesTender1 = 0;
						storeTotalTenderLoan1 = 0;
						storeTotalBrowsedFunds1 = 0;
						storeTotalPaidIn1 = 0;
						storeTotalPaidOut1 = 0;
						storeTotalPickUp1 = 0;
						storeTotalExpectedFunds1 = 0;
						storeTotalOpeningLoan1 = [];
						setOpenLoan=0;

						salesTender = 0;
						tenderLoan = 0;
						openingLoan = 0;
						borrowedFunds=0;
						paidIns = 0;
						paidOuts = 0;
						pickUp = 0;
						expectedFunds = 0;
						sttlOpenLoan = 0;
						totalStlOpenLoan = 0;

					}
					//////////////////////////
					// console.log(list[i].tenderTypeT);
					
					list[i].tenderTypeT = (list[i].tenderTypeT != null && list[i].tenderTypeT != undefined) ? list[i].tenderTypeT
							: '';
					/*list[i].openingLoan = (list[i].openingLoan != null && list[i].openingLoan != undefined) ? list[i].openingLoan
							: '';*/
					list[i].salesTender = (list[i].salesTender != null && list[i].salesTender != undefined) ? list[i].salesTender
							: '';
					list[i].tenderLoan = (list[i].tenderLoan != null && list[i].tenderLoan != undefined) ? list[i].tenderLoan
							: '';
					list[i].paidIns = (list[i].paidIns != null && list[i].paidIns != undefined) ? list[i].paidIns
							: '';
					list[i].paidOuts = (list[i].paidOuts != null && list[i].paidOuts != undefined) ? Number(
							list[i].paidOuts).toFixed(2)
							: '';
					list[i].pickUps = (list[i].pickUps != null && list[i].pickUps != undefined) ? list[i].pickUps
							: '';
					/*list[i].expectedFunds = (list[i].expectedFunds != null && list[i].expectedFunds != undefined) ? Number(
							list[i].expectedFunds).toFixed(2)
							: '';
							*/
					list[i].borrowedFunds = (list[i].borrowedFunds != null && list[i].borrowedFunds != undefined) ? Number(
									list[i].borrowedFunds).toFixed(2)
									: '';
					list[i].sttlIndicator = (list[i].sttlIndicator != null && list[i].sttlIndicator != undefined) ? list[i].sttlIndicator
							: '';

					if(list[i].sttlIndicator == 'STTL') {
						sttlOpenLoan = Number(list[i].openingLoan);
						totalStlOpenLoan += sttlOpenLoan;
					}
					notEqualZero = /*Number(list[i].openingLoan)
							+*/ Number(list[i].salesTender)
							+ Number(list[i].tenderLoan)
							+ Number(list[i].borrowedFunds)
							+ Number(list[i].paidIns)
							+ Number(list[i].paidOuts)
							+ Number(list[i].pickUps)
						/*	+ Number(list[i].expectedFunds)*/;
					
					if (Number(list[i].openingLoan) != 0
							|| Number(list[i].salesTender) != 0
							|| Number(list[i].tenderLoan) != 0
							|| Number(list[i].borrowedFunds) != 0
							|| Number(list[i].paidIns) != 0
							|| Number(list[i].paidOuts) != 0
							|| Number(list[i].pickUps) != 0
							|| Number(list[i].expectedFunds) !=0) {
						
					
							list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
									: '';
						
						// console.log(notEqualZero);
						if (tenderT == '') {
							tenderT = list[i].tenderTypeT;
						}
						if (tenderT == list[i].tenderTypeT) {
							set=0;
							storeTotalOpeningLoan1.push(Number(list[i].openingLoan));
							
							storeTotalSalesTender1 += Number(list[i].salesTender);
							storeTotalTenderLoan1 += Number(list[i].tenderLoan);
							storeTotalBrowsedFunds1+= Number(list[i].borrowedFunds);
							storeTotalPaidIn1 += Number(list[i].paidIns);
							storeTotalPaidOut1 += Number(list[i].paidOuts);
							storeTotalPickUp1 += Number(list[i].pickUps);
							storeTotalExpectedFunds1 += Number(list[i].expectedFunds);
							// continue;
						} 
						 set = Number(storeTotalOpeningLoan1.reduce(function(previous,current){ 
		                      return previous > current ? previous:current}));
						  
		                   
						if(tenderT != list[i].tenderTypeT){
							
							setOpenLoan=Number(setOpenLoan)+ set;
							content += '<tr  class="parentTr page-' + Math.ceil((grpCount+1)/3);
							if ((grpCount+1) > 3)
								content += ' hideBlock "';

							content += '" >';
							if (tenderT != '')
								content += '<td class="valueInfo leftValue total">'
										+ tenderT + '</td>';
							else {
								content += '<td class="rightValue" >&nbsp;</td>';
							}
						//	content += '<td class="rightValue opengLoan" >';
							/*if (storeTotalOpeningLoan1 != '')
								content += storeTotalOpeningLoan1.reduce(function(previous,current){ 
				                      return previous > current ? previous:current}).toFixed(2)
										+ '</td>';
							else
								content += '0.00</td>';*/
						//	content += sttlOpenLoan.toFixed(2)+'</td>';

							if (storeTotalSalesTender1 != '')
								content += '<td class="rightValue salesTender" >'
										+ storeTotalSalesTender1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalTenderLoan1 != '')
								{
								content += '<td class="rightValue tenderLoan" >'
										+ storeTotalTenderLoan1.toFixed(2)
										+ '</td>';}
							else
								{
								content += '<td class="rightValue" >0.00</td>';
								}
							 if(storeTotalBrowsedFunds1 != "") 
							  {
									  content += '<td class="rightValue" >'+
									  Number(storeTotalBrowsedFunds1).toFixed(2) + '</td>';
							  }
							  else
							  {
								  content += '<td class="rightValue" >0.00</td>';
							  }

						
							if (storeTotalPaidIn1 != '')
								content += '<td class="rightValue paidIn">'
										+ storeTotalPaidIn1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalPaidOut1 != '')
								content += '<td class=" rightValue paidOut">'
										+ storeTotalPaidOut1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalPickUp1 != '')
								content += '<td class=" rightValue pickUp">'
										+ storeTotalPickUp1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							/*if (storeTotalExpectedFunds1 != '')
								content += '<td class=" rightValue expectedFunds  lastColumn">'
										+ storeTotalExpectedFunds1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							content += '</tr>';
							*/
						
							objTotalSecond = {
									"tenderT" : tenderT,
									"posNumber" : list[i].posNumber,
									"openingLoan" : sttlOpenLoan.toFixed(2)/*storeTotalOpeningLoan1.reduce(function(previous,current){ 
					                      return previous > current ? previous:current
					                   }).toFixed(2).toString()*/
								};
							totalList.push(objTotalSecond);
								//storeTotalOpeningLoan1 =0;
								storeTotalSalesTender1 =0;
								storeTotalTenderLoan1 =0;
								storeTotalBrowsedFunds1=0;
								storeTotalOpeningLoan1 = [];
								storeTotalPaidIn1 =0;
								storeTotalPaidOut1 =0;
								storeTotalPickUp1  =0;
								storeTotalExpectedFunds1 =0;
								sttlOpenLoan = 0;
								tenderT = list[i].tenderTypeT;
								storeTotalOpeningLoan1.push(Number(list[i].openingLoan));
								storeTotalSalesTender1 += Number(list[i].salesTender);
								storeTotalTenderLoan1 += Number(list[i].tenderLoan);
								storeTotalBrowsedFunds1 += Number(list[i].borrowedFunds);;
								storeTotalPaidIn1 += Number(list[i].paidIns);
								storeTotalPaidOut1 += Number(list[i].paidOuts);
								storeTotalPickUp1 += Number(list[i].pickUps);
						//		storeTotalExpectedFunds1 += Number(list[i].expectedFunds);
							}
						
						/////////////////
						tenderLoan = Number(tenderLoan)
						+ Number(list[i].tenderLoan);
						salesTender = Number(salesTender)
								+ Number(list[i].salesTender);
						pickUp = Number(pickUp) + Number(list[i].pickUps);
					//	expectedFunds = Number(expectedFunds)
					//			+ Number(list[i].expectedFunds);
						borrowedFunds = Number(borrowedFunds) + Number(list[i].borrowedFunds);
						paidIns = Number(paidIns) + Number(list[i].paidIns);
						paidOuts = Number(paidOuts) + Number(list[i].paidOuts);
						// console.log(paidOuts);
						totList.push(list[i]);
						/////////////////
						
						if(list[i].grpLastRec == true){
							setOpenLoan=Number(setOpenLoan)+ set;
							content += '<tr  class="parentTr page-' + Math.ceil((grpCount+1)/3);
							if ((grpCount+1) > 3)
								content += ' hideBlock "';

							content += '" >';
							if (tenderT != '')
								content += '<td class="valueInfo leftValue total">'
										+ tenderT + '</td>';
							else {
								content += '<td class="rightValue" >&nbsp;</td>';
							}
				//			content += '<td class="rightValue opengLoan" >';
							/*if (storeTotalOpeningLoan1 != '')
								content += storeTotalOpeningLoan1.reduce(function(previous,current){ 
				                      return previous > current ? previous:current
				                   }).toFixed(2)
										+ '</td>';
							else
								content += '0.00</td>';*/
				//			content += sttlOpenLoan.toFixed(2) + '</td>';

							if (storeTotalSalesTender1 != '')
								content += '<td class="rightValue salesTender" >'
										+ storeTotalSalesTender1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalTenderLoan1 != '')
								content += '<td class="rightValue tenderLoan" >'
										+ storeTotalTenderLoan1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalBrowsedFunds1 != '')
								content += '<td class="rightValue borrowedFunds" >'
										+ storeTotalBrowsedFunds1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							//content += '<td class="rightValue" >&nbsp;</td>';
							if (storeTotalPaidIn1 != '')
								content += '<td class="rightValue paidIn">'
										+ storeTotalPaidIn1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalPaidOut1 != '')
								content += '<td class=" rightValue paidOut">'
										+ storeTotalPaidOut1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							if (storeTotalPickUp1 != '')
								content += '<td class=" rightValue pickUp">'
										+ storeTotalPickUp1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
						/*	if (storeTotalExpectedFunds1 != '')
								content += '<td class=" rightValue expectedFunds  lastColumn">'
										+ storeTotalExpectedFunds1.toFixed(2)
										+ '</td>';
							else
								content += '<td class="rightValue" >0.00</td>';
							content += '</tr>';*/
								
							objTotalSecond = {
									"tenderT" : tenderT,
									"posNumber" : list[i].posNumber,
									"openingLoan" : sttlOpenLoan.toFixed(2)/*storeTotalOpeningLoan1.reduce(function(previous,current){ 
					                      return previous > current ? previous:current
					                   }).toFixed(2).toString()*/
								};
							totalList.push(objTotalSecond);
							isGrpFirstRow = true;
							grpCount++;
							}
						
						
					}
						

						////////////////////
				
					if(list[i].grpLastRec == true) {
							
						openingLoan = Number(openingLoan)
						+ Number(setOpenLoan);
						var objTotal = {
							"posNumber" : "",
						//	"openingLoan" : totalStlOpenLoan, //openingLoan.toString(),
							"salesTender" : salesTender.toString(),
							"borrowedFunds" : borrowedFunds.toString(),
							"tenderLoan" : tenderLoan.toString(),
							"paidIns" : paidIns.toString(),
							"paidOuts" : paidOuts.toString(),
							"pickUps" : pickUp.toString(),
						//	"expectedFunds" : expectedFunds.toString()
						};
						// totalList.push(objTotal);
						
						totList.push(objTotal);
						//printMap[m] = totList;
						content += ' <tr class="totVal totalRow graytd valueInfo page-'
								+ Math.ceil(grpCount/3);
						if (grpCount > 3)
							content += ' hideBlock "';
						
						
						content += '" >';
						content += '<td class="columnDivider  valueInfo leftValue noSort graytd">Total </td>'
								/*+ '<td class="numberColumn rightValue valueInfo noSort graytd openingLoan">'
								+ totalStlOpenLoan.toFixed(2)
								+ '</td>'
								*/+ '<td class="numberColumn rightValue valueInfo noSort  graytd salesTender">'
								+ Number(salesTender).toFixed(2)
								+ '</td>'
								+ '<td class="numberColumn rightValue  noSort tenderLoan graytd valueInfo">'
								+ Number(tenderLoan).toFixed(2)
								+ '</td>'
								+ '<td class="numberColumn rightValue noSort borrowedFunds graytd valueInfo">'
								 + Number(borrowedFunds).toFixed(2)
								+ '</td>'
								+ '<td class="numberColumn rightValue noSort paidIn graytd valueInfo">'
								+ Number(paidIns).toFixed(2)
								+ '</td>'
								+ '<td class="numberColumn rightValue noSort paidOut graytd  valueInfo">'
								+ Number(paidOuts).toFixed(2)
								+ '</td>'
								+ '<td class="numberColumn rightValue noSort pickUp graytd valueInfo">'
								+ Number(pickUp).toFixed(2)
								+ '</td>'
								/*+ '<td class="numberColumn rightValue noSort expectedFunds graytd lastColumn valueInfo">'
								+ Number(expectedFunds).toFixed(2) + '</td>'*/ + '</tr>';
						
						/////////////////////////////////////////
				}
				

				/*if (j % 3 == 0) {
					k++;
				}*/
				j++;
				
				

			}
			
			

		}

		//formStoreTotal(response);
		// formStoreTotalPrint(response);
		content += '<tr  class="hideStoreTotal hideBlock"> <td  class="rowSection rowHighlight leftValue" colspan="9">Store Total</td></tr>';
		// content+=storeTotalTender;
		// content += '</tbody>';
		// alert(content);
		$('.appendStore').remove();
		$('.sortTable tbody:first').html('');
		$('.sortTable tbody:first').append(content);
		showContentConsolidationBlock();

		formStoreTotal(response);
		
		// formStoreTotalPrint(response);
		if (flagStore != true) {
			$('.sortTable tbody:first').append(storeTotalTender);
		}
		$('.sortTable').filter(function() {
			//if ((j-1) % 3 == 0) {
			$('.hideStoreTotal').addClass('page-' + Math.ceil(grpCount/3));
			//}

		});
		
		showMultiplePOS();
		curPage = 1;
		
		pagenationCallbackMethod(1);
		if (grpCount > 3) {
			$('.paginationDiv')
					.pagination(
							{
								items : grpCount,
								itemsOnPage : 3,
								cssStyle : 'compact-theme',
								currentPage : curPage,
								onPageClick : function(pageNo) {

									// closeAccordian();
									curPage = pageNo;
									var pageClass = 'page-' + pageNo;
									$(
											'.posTr,.parentTr,.totalRow,.appendStore,.hideStoreTotal')
											.filter(
													function() {
														if ($(this).hasClass(
																pageClass)) {
															$(this)
																	.removeClass(
																			'hideBlock');
															// $(this).removeClass('hideStoreTotal');
															if (curPage == Math.ceil(grpCount/3)) {
																$(
																		'.hideStoreTotal')
																		.removeClass(
																				'hideBlock');
															}
															// $('.hideStoreTotal').removeClass('hideBlock');
														} else {
															$(this)
																	.addClass(
																			'hideBlock');
															$('.hideStoreTotal')
																	.addClass(
																			'hideBlock');
														}

														if (curPage == Math.ceil((grpCount+1)/3)) {
															$('.hideStoreTotal')
																	.removeClass(
																			'hideBlock');
														}

													});

									// $('.childTr').addClass('hideBlock');
									// $('.posTr').removeClass('expanded');
									pagenationCallbackMethod(pageNo);
								}

							});

			$(' .paginationDiv').removeClass('hideBlock');

		} else {
			$(' .paginationDiv').addClass('hideBlock');
			$('.hideStoreTotal').removeClass('hideBlock');
			if ($('#single').is(':checked')) {
				$('.hideStoreTotal').addClass('hideBlock');
				$('.hideStoreTot').addClass('hideBlock');

			}
			if ($('#multiple').is(':checked')||$('#all').is(':checked')) {
				if (grpCount == 1) {
					$('.hideStoreTotal').addClass('hideBlock');
					$('.hideStoreTot').addClass('hideBlock');
				}
			}
		}

		if ($('#single').is(':checked')) {
			$('.hideStoreTotal').addClass('hideBlock');
			$('.hideStoreTot').addClass('hideBlock');

		}
		if ($('#multiple').is(':checked')||$('#all').is(':checked')) {
			if (grpCount == 1) {
				$('.hideStoreTotal').addClass('hideBlock');
				$('.hideStoreTot').addClass('hideBlock');
			}
		}
		/*
		 * if(flag){ updateSortPlugin(); setTimeout(function(){ // set sorting
		 * column and direction, this will sort on the first // var sorting =
		 * [[0,0]]; // sort on the first column //s
		 * $(".sortTable").trigger("sorton",[sorting]); },30); }else{
		 * //$('.paginationDiv ').addClass('hideBlock');
		 * $('.hideStoreTotal').removeClass('hideBlock'); }
		 */
	} else {
		if (msg == 'No Data Found.' || msg==NDF)
			showWarning(NDF);
		else
			showError(msg);
	}
	

}
function updateSortPlugin() {
	$(".sortTable").trigger("update");

}

function formStoreTotal(response) {

	// $('.appendStore').remove();
	
	
	var siteMap = {};
	var siteMapOpenLoan = {};
	var consolidation = '';
	storeTotalTender = '';
	var output = $.parseJSON(response);
	consolidation = output.data;
	var totlEndOpenLoan = 0;
	var totalEndSaleTen = 0;
	var totalEndBorrowFunds = 0;
	var totalEndtenLoan = 0;
	var totalEndpaidIn = 0;
	var totalEndpaidOut = 0;
	var totalEndpaidUp = 0;
	var totalEndexpectedfund = 0;
	var list = consolidation;

/*	$('.posTr').filter(function() {
		var id = $(this).attr('id');

		var list = $(consolidation).attr(id);

		var tempList = [];*/

		if (list != undefined && list != null && list.length > 0) {
			for ( var k = 0; k < list.length; k++) {
				
				if (siteMap.hasOwnProperty(list[k].tenderTypeT)) {
					
					tempList = $(siteMap).attr(list[k].tenderTypeT);
					// list[k].cnt=id;
					tempList.push(list[k]);
				} else {
					tempList = [];
					// list[k].cnt=id;
					tempList.push(list[k]);
				}
				siteMap[list[k].tenderTypeT] = tempList;
			}
		}
//	});
	
		

			// declrResult=0;
			var listNext = totalList;
			
	
		var tempList = [];

		if (listNext != undefined && listNext != null && listNext.length > 0) {
			for ( var k = 0; k < listNext.length; k++) {
				
				if (siteMapOpenLoan.hasOwnProperty(listNext[k].tenderT)) {
					
					tempList = $(siteMapOpenLoan).attr(listNext[k].tenderT);
					// list[k].cnt=id;
					tempList.push(listNext[k]);
				} else {
					tempList = [];
					// list[k].cnt=id;
					tempList.push(listNext[k]);
				}
				siteMapOpenLoan[listNext[k].tenderT] = tempList;
				
			}

			
			}
	
		
		 
		 for(var m in siteMapOpenLoan)
		 {
		 var list = siteMapOpenLoan[m];
		 var op =0;
		

			list[0].tenderT = (list[0].tenderT != null && list[0].tenderT != undefined) ? list[0].tenderT
					: '';
			
			for ( var i = 0; i < list.length; i++) {
				op= Number(op) + Number(list[i].openingLoan);
			}
			obj = {
					"tenderT" : list[0].tenderT,
					"openingLoanFinal" : op
				};
			shortList.push(obj);
		 }	
	
	
	/* console.log(siteMap); */
	for ( var m in siteMap) {
		var list = siteMap[m];

		list[0].tenderTypeT = (list[0].tenderTypeT != null && list[0].tenderTypeT != undefined) ? list[0].tenderTypeT
				: '';

		var openLoan = 0;
		var saleTen = 0;
		var tenLoan = 0;
		var paidIn = 0;
		var paidOut = 0;
		var pickUp = 0;
		var boroFun =0;
		var expectedFund = 0;
		var notEqualZero = 0;
		var storenotEqual = 0;
		

		if (list != undefined && list != null && list.length > 0) {
			site = '';
			siteNm = '';
			for ( var i = 0; i < list.length; i++) {
				notEqualZero = 0;
//				list[i].openingLoan = (list[i].openingLoan != null && list[i].openingLoan != undefined) ? list[i].openingLoan
//						: '';
				list[i].salesTender = (list[i].salesTender != null && list[i].salesTender != undefined) ? list[i].salesTender
						: '';
				list[i].tenderLoan = (list[i].tenderLoan != null && list[i].tenderLoan != undefined) ? list[i].tenderLoan
						: '';
				list[i].paidIns = (list[i].paidIns != null && list[i].paidIns != undefined) ? list[i].paidIns
						: '';
				list[i].paidOuts = (list[i].paidOuts != null && list[i].paidOuts != undefined) ? Number(
						list[i].paidOuts).toFixed(2)
						: '';
				list[i].pickUps = (list[i].pickUps != null && list[i].pickUps != undefined) ? list[i].pickUps
						: '';
				/*list[i].expectedFunds = (list[i].expectedFunds != null && list[i].expectedFunds != undefined) ? list[i].expectedFunds
						: '';*/
				list[i].borrowedFunds = (list[i].borrowedFunds != null && list[i].borrowedFunds != undefined) ? list[i].borrowedFunds
						: '';

				notEqualZero = Number(list[i].openingLoan)
						+ Number(list[i].salesTender)
						+ Number(list[i].tenderLoan) + Number(list[i].paidIns)
						+ Number(list[i].paidOuts) + Number(list[i].pickUps)+ Number(list[i].borrowedFunds)
						+ Number(list[i].expectedFunds);
				storenotEqual += notEqualZero;
				if (Number(list[i].openingLoan) != 0
						|| Number(list[i].salesTender) != 0
						|| Number(list[i].tenderLoan) != 0
						|| Number(list[i].paidIns) != 0
						|| Number(list[i].paidOuts) != 0
						|| Number(list[i].pickUps) != 0
						|| Number(list[i].borrowedFunds) != 0
						|| Number(list[i].expectedFunds)) {
			
					openLoan= 0;
					saleTen += Number(list[i].salesTender);
					tenLoan += Number(list[i].tenderLoan);
					paidIn += Number(list[i].paidIns);
					paidOut += Number(list[i].paidOuts);
					pickUp += Number(list[i].pickUps);
					boroFun += Number(list[i].borrowedFunds);
					expectedFund += Number(list[i].expectedFunds);
					
				}
				
			}	
			if (Number(openLoan) != 0 || Number(saleTen) != 0
					|| Number(tenLoan) != 0 || Number(paidIn) != 0
					|| Number(paidOut) != 0 || Number(boroFun) != 0 || Number(pickUp) != 0
					|| Number(expectedFund)) {
				z++;
				flagStore = false;
				
				storeTotalTender += ' <tr class="totVal graytd valueInfo appendStore hideStoreTotal hideBlock">'
						+ '<td class="columnDivider  valueInfo leftValue noSort" id="'+list[0].tenderTypeT+'">'
						+ list[0].tenderTypeT
						+ '</td>'
						/*+ '<td class="numberColumn rightValue valueInfo noSort openLTotal ">'

						+ Number(openLoan).toFixed(2)
						+ '</td>'*/
						+ '<td class="numberColumn rightValue  noSort valueInfo  ">'
						+ Number(saleTen).toFixed(2)
						+ '</td>'
						+ '<td class="numberColumn rightValue  noSort   valueInfo">'
						+ Number(tenLoan).toFixed(2)
						+ '</td>'
						+ '<td class="numberColumn rightValue noSort   valueInfo">'
						+ Number(boroFun).toFixed(2)
						+ '</td>'
						+ '<td class="numberColumn rightValue noSort   valueInfo">'
						+ Number(paidIn).toFixed(2)
						+ '</td>'
						+ '<td class="numberColumn rightValue noSort    valueInfo">'
						+ Number(paidOut).toFixed(2)
						+ '</td>'
						+ '<td class="numberColumn rightValue noSort   valueInfo">'
						+ Number(pickUp).toFixed(2)
						+ '</td>'
						/*+ '<td class="numberColumn rightValue noSort   lastColumn valueInfo">'
						+ Number(expectedFund).toFixed(2) + '</td>' */ + '</tr>';

				//totlEndOpenLoan += Number(openLoan);
				totalEndSaleTen += Number(saleTen);
				totalEndtenLoan += Number(tenLoan);
				totalEndpaidIn += Number(paidIn);
				totalEndBorrowFunds += Number(boroFun);
				totalEndpaidOut += Number(paidOut);
				totalEndpaidUp += Number(pickUp);
				totalEndexpectedfund += Number(expectedFund);

			}

		}
	}
	z++;
	storeTotalTender += ' <tr class="totVal graytd valueInfo appendStore hideStoreTotal hideBlock">'
			+ '<td class="columnDivider  valueInfo leftValue noSort">Total</td>'
		/*	+ '<td class="numberColumn rightValue valueInfo noSort finalOpenLoanTotal ">0.00'
			+ '</td>'*/
			+ '<td class="numberColumn rightValue valueInfo noSort   ">'
			+ Number(totalEndSaleTen).toFixed(2)
			+ '</td>'
			+ '<td class="numberColumn rightValue  noSort   valueInfo">'
			+ Number(totalEndtenLoan).toFixed(2)
			+ '</td>'
			+ '<td class="numberColumn rightValue noSort   valueInfo">'
			+ Number(totalEndBorrowFunds).toFixed(2)
			+ '</td>'
			+ '<td class="numberColumn rightValue noSort   valueInfo">'
			+ Number(totalEndpaidIn).toFixed(2)
			+ '</td>'
			+ '<td class="numberColumn rightValue noSort    valueInfo">'
			+ Number(totalEndpaidOut).toFixed(2)
			+ '</td>'
			+ '<td class="numberColumn rightValue noSort   valueInfo">'
			+ Number(totalEndpaidUp).toFixed(2)
			+ '</td>'
			/*+ '<td class="numberColumn rightValue noSort   lastColumn valueInfo">'
			+ Number(totalEndexpectedfund).toFixed(2) + '</td>' +*/ '</tr>';
	
	
	
}

function openLoanTot()
{
	for(var m=0; m<shortList.length;m++)
		{
		var tyy = shortList[m].tenderT;
		tyy = tyy.replace(new RegExp('\\.', 'g'), "\\.");
		if($("#"+tyy).text() == shortList[m].tenderT)
		{
			openLoan = Number(shortList[m].openingLoanFinal).toFixed(2);
			$("#"+shortList[m].tenderT).next('td').text(openLoan);
		}
			
		}
	
}

function openLoanTotPrint()
{
	for(var m=0; m<shortList.length;m++)
		{
		if($("#"+shortList[m].tenderT+"1").text() == shortList[m].tenderT)
		{
			openLoan = Number(shortList[m].openingLoanFinal).toFixed(2);
			$("#"+shortList[m].tenderT+"1").next('td').text(openLoan);
		}
			
		}
	
}
function finalTotal()
{
	var finalOpenLoan =0;
	$(".openLTotal").each(function( index ) { 
		
		finalOpenLoan =Number(finalOpenLoan)+Number($(this).text());
		
	});
	
$(".finalOpenLoanTotal").text(Number(finalOpenLoan).toFixed(2));
$(".printTotalFinal").text(Number(finalOpenLoan).toFixed(2));

}

function showContentConsolidationBlock() {
	$('#reportContent').removeClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');
	$('#reportContent .tableInfo .tableTitle').removeClass('hideBlock');
	$('#reportContent .tableInfo .tableActionBtns').removeClass('hideBlock');
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

function setDefaultDate() {
	var date = new Date();
	var month = '';
	if (date.getMonth() + 1 < 10) {
		month = date.getMonth() + 1;
		month = '0' + month;
	} else
		month = date.getMonth() + 1;
	var day = '';
	if (date.getDate() < 10) {
		day = date.getDate();
		day = '0' + day;
	} else
		day = date.getDate();
	$('#dateFrom,#fromDte').val(day + '/' + month + '/' + date.getFullYear());

	var totalMonth = 12;
	var time = date.getTime() + (60 * 60 * 24 * 1000 * 30 * totalMonth);
	date.setTime(time);
	var month = '';
	if (date.getMonth() + 1 < 10) {
		month = date.getMonth() + 1;
		month = '0' + month;
	} else
		month = date.getMonth() + 1;
	var day = '';
	if (date.getDate() < 10) {
		day = date.getDate();
		day = '0' + day;
	} else
		day = date.getDate();
	//	$('#dateTo,#toDte').val(day+'/'+month+'/'+date.getFullYear());

}

function showContent() {
	//$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	//oformcloseAccordian();

}
function hideContent() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('.paginationDiv').addClass('hideBlock');

}

function showWarning(text) {

	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	$('.paginationDiv').addClass('hideBlock');
}

function showContentUsersListBlock() {
	$('#usersList').removeClass('hideBlock');
}

function showMultiplePOS() {

	$('.posTr:visible').filter(function() {

		/*	var selectedUsers = [];
			$('#multiplePOS ul li label').each(function(){
				$('#multiplePOS ul li label').removeData();
				selectedUsers.push($(this).attr('for'));
			});
		 */
		/*$.each(selectedUsers, function( index, value ) {
			//alert( index + ": " + value );
			
			if(value != $(".posValue").text.trim())
				{
				$(this).parent().addClass('hideBlock');
				}
		    });
		 */
		//alert(selectedUsers);
	});
}
function posConsolidationJasper() {
	
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#ALHFinancialData').attr("action", "getPOSConsolidation1.pdf");
		$('#ALHFinancialData').attr('target','_blank');
		$('#ALHFinancialData').submit();
	}
}
function getMultiplePosIds() {
	var posIds = [];
	if ($('#usersList li') != undefined) {
		$('#usersList li')
				.filter(
						function() {
							var hash = "#";
							if ($(this)
									.text()
									.trim() != "#") {
								posIds
										.push($(
												this)
												.text()
												.trim());
							}
							posIdLength = posIds.length;
						});

	}
	return posIds;
}