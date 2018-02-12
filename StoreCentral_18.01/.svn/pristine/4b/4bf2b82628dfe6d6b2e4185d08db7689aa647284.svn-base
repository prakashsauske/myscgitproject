var currentPage;
var mondayEndDate = '';
var sundayEndDate = '';
var curPage;
var prevRes = '';
var mondayDateForWeek = '';
var NDF="Sorry, no results found for your search criteria. Please try again.";
visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="yes"]:checked,input[name="pos"]:checked';
hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPosOperatr"],input[name="hdnPos"]';
allInputCtrls = 'input[name="dateFrom"],input[name="yes"]';
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
							//console.log("mondayDateForWeek:"
							//		+ mondayDateForWeek);
							var today = new Date(year, month - 1, date);
							var dayOfYear = ((today - onejan + 86400000) / 86400000);
							day = today.getDay();
							//console.log(Math.ceil(dayOfYear / 7));
							return Math.ceil(dayOfYear / 7);
						};

						var formattedDate = new Date(tDate);
						var currentWeekNumber = formattedDate.getWeek();
						currentWeekNumber = Number(currentWeekNumber) + 1;
						currentWeekNumber = currentWeekNumber + "." + year;
						$("#weekYear").val(currentWeekNumber);
						//console.log("WeekNumber:" + currentWeekNumber);
					}

					function findMondayOfYear() {

						var tDate = $('#dateFrom').val();

						var yearGiven = tDate.split('/')[2];

						var januaryFirstDate = new Date(yearGiven, 0, 1);
						//console.log(januaryFirstDate);
						var dateVal = januaryFirstDate.getDate();
						var month = januaryFirstDate.getMonth();
						var year = januaryFirstDate.getFullYear();

						var date = new Date(year, month, dateVal);
						//console.log(date);
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
						//console.log("MondayEndDate:" + mondayEndDate);
						var mondayJanDate = mondayEndDate;
						var mondayJanD = mondayJanDate.split('/')[0];
						var mondayJanMonth = mondayJanDate.split('/')[1];
						var mondayJanYear = mondayJanDate.split('/')[2];

						var dateFindMonday = new Date(mondayJanYear,
								mondayJanMonth - 1, mondayJanD);

						mondayDateForWeek = mondayJanD;
						//console.log("mondayJanD:" + mondayJanD);
						//console
						//		.log("dateFindMonday:"
						//				+ dateFindMonday.getDay());

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
							//console.log(mondayEndDate);
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
						//console.log(sundayEndDate);

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
										} else if ($('#userID').val().trim() == ''
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
										}

										else {

											hideError();
											var data = $('#posDeclaration')
													.serialize();
											data += '&posNames=' + posNames;
											//console.log(data);
											posDeclaration(data);
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
						visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="yes"]:checked,input[name="pos"]:checked';
						hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPosOperatr"],input[name="hdnPos"]';
						bindDynaCtrlInputChange();
					});

					$('#single').click(function() {
						$("#singlePOS").removeClass('hideBlock');
						$("#multiplePOS").addClass('hideBlock');
						$("#manyUserId").val('');
						$('#verifyLabel').addClass('hideBlock');
						visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"],input[name="yes"]:checked,input[name="pos"]:checked,input[name="userID"]';
						hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"],input[name="hdnPosOperatr"],input[name="hdnPos"],input[name="hdnPosIdSingle"]';
						bindDynaCtrlInputChange();
					});

					$('#multiple').click(function() {
						$("#multiplePOS").removeClass('hideBlock');
						$("#singlePOS").addClass('hideBlock');
						$("#userID").val('');
						$('#verifyLabel').addClass('hideBlock');
					});

					$(document)
							.keypress(
									function(event) {
										var selectedUsers = '';
										$('#multiplePOS ul li label').each(
												function() {
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
														&& ($('#all').is(
																':checked')
																|| $("#userID")
																		.val() != '' || selectedUsers.length != 0))
													$('#generateReport')
															.click();
												else if ($('#multiple').is(
														':checked')
														&& $('#manyUserId')
																.val().trim != '')
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
												posDeclarationVerifyUser($(
														'#posDeclaration')
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
												posDeclarationVerifyAddUser($(
														'#posDeclaration')
														.serialize());
											}
										}
									});

					$(document).on('click', ".removeUser", function() {
						$(this).parent().remove();

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
															}
															i++;
															// //console.log(i++);
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
															}
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

function removeUser() {
	$('.removeUser').click(function() {
		$(this).parent().remove();
	});
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

function verifyUser(response, value) {

	stopLoading();
	hideError();
	var flag = true;
	var res = $.parseJSON(response);
	var userList = res.data;
	var val = $('#userID').val().trim();

	for ( var f = 0; f < userList.length; f++) {
		hideError();
		if (userList[f].cashierName == val) {
			flag = false;
			$('#userID').val(userList[f].cashierName);
			$('#verifyLabel').removeClass('hideBlock');
			$('.verified').removeClass('hideBlock');
			$('input[name="posIdSingle"]').val(userList[f].cashierName);
		}
	}
	if (flag) {
		if ($('#userID').val().trim() != '') {
			value = $('#userID').val();
			value = value.toUpperCase();
		}
		var tblHdr = '<thead><tr><th data-sort="string" class="sorted ascending" >POS Operator Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
		// myMap
		if (res.data != null && res.data != undefined && res.data.length > 0) {
			var list = res.data;
			var j = 0;
			var k = 1;
			for ( var i = 0; i < list.length; i++) {
				value = value.replace(/\s/g, '');
				//console.log(value.replace(/\s/g, ''));
				list[i].cashierName = (list[i].cashierName != null && list[i].cashierName != undefined) ? list[i].cashierName
						: '';
				if (list[i].cashierName.toUpperCase().replace(/\s/g, '').indexOf(value) != -1
						/*|| list[i].cashierNumber.indexOf(value) != -1*/) {
					//console.log(list[i].cashierName.toUpperCase().replace(/\s/g, ''));
					
					j++;
					tblHdr += '<tr class="verifyContent ';
					if (k > 1) {
						tblHdr += ' hideBlock ';
					}
					tblHdr += ' pagNo-' + k + '"><td>' + list[i].cashierName
							+ '</td>';
					tblHdr += '<td class="sorted lastColumn"><label class="linkBtn"><label class="selectItem selectSingleUser">Select</label></label></td></tr>';

					if (j % 9 == 0) {
						k++;
					}
				}
			}
			/*if(j>300) {
				$('#dialog-verify h4')
				.html(
						'Too many search results for <strong>'
								+ $('#userID').val().trim()
								+ '</strong>. Please select a User from the list below.');
			}
			else */if (j >= 1) {
				currPage = 1;
				/*$('#dialog-verify h4')
						.html(
								'Too many search results for <strong>'
										+ $('#userID').val().trim()
										+ '</strong>. Please select a User from the list below.');*/
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
			/*if (flag) {
				showError('Invalid user Id/Name');
			} else {
				showError('Invalid user Id/Name');
			}*/
		}
		stopLoading();
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

function posDeclarationVerifyUser(data) {
	$.ajax({
		type : "get",
		url : "getStoreAndCashierName.htm",
		data : data,
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			hideError();
			prevRes = '';
			prevRes = response;
			verifyUser(response, '');
			stopLoading();

		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			stopLoading();
		}
	});
}

function posDeclaration(data) {
	$.ajax({
		type : "get",
		url : "getposDeclaration.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			formPosDeclarationContent(response);
			$.loader('close');
			backupInputParams();
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
		}
	});
}

function verifyAddUser(response, value) {

	hideError();
	var flag = true;
	var res = $.parseJSON(response);
	var userList = res.data;
	var val = $('#manyUserId').val().trim();

	for ( var f = 0; f < userList.length; f++) {
		hideError();
		if (userList[f].cashierName == val) {
			var content = '';

			if (userList != null) {
				flag = false;
				var list = userList[f];
				list.cashierName = (list.cashierName != null && list.cashierName != undefined) ? list.cashierName
						: '';
				if ($('#multiple').is(':checked')) {
					content += '<li><label for="'
							+ list.cashierName
							+ '">'
							+ list.cashierName
							+ '</label><label class="closeMessage removeUser">&nbsp;</label></li>';
				}
			}
			$('#multiplePOS ul').append(content);
			showContentUsersListBlock();
			$('#manyUserId').val('');
			// checkDuplicateEntries();
		}
	}
	if (flag) {

		if ($('#manyUserId').val().trim() != '') {
			value = $('#manyUserId').val();
			value = value.toUpperCase();
		}
		var tblHdr = '<thead><tr><th data-sort="string" class="sorted ascending" >User Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
		// myMap
		if (res.data != null && res.data != undefined && res.data.length > 0) {
			var list = res.data;
			var j = 0;
			var k = 1;
			for ( var i = 0; i < list.length; i++) {

				list[i].cashierName = (list[i].cashierName != null && list[i].cashierName != undefined) ? list[i].cashierName
						: '';
				if (list[i].cashierName.toUpperCase().indexOf(value) != -1) {
					j++;
					tblHdr += '<tr class="verifyContent ';
					if (k > 1) {
						tblHdr += ' hideBlock ';
					}
					tblHdr += ' pagNo-' + k + '"><td>' + list[i].cashierName
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
}
function showOldSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0) {
		if ($('#multiple').is(':checked'))
			verifyAddUser(prevRes, '');
		else
			verifyUser(prevRes, '');
	}
}

function totValuePrint() {
	var hourOfDay = 0;
	var avgTrans = 0;
	var articlesScannedPer = 0;
	var tenderpcust = 0;
	var idleTime = 0;
	var secureTime = 0;
	var transCount = 0;
	var avgPrince = 0;
	var itemscannedcount = 0;
	$('.parentTrPrint').filter(
			function() {
				if ($(this).children(':nth-child(3)').text().trim() != '#') {
					hourOfDay += Number($(this).children(':nth-child(3)')
							.text().trim());
				}
				avgTrans += Number($(this).children(':nth-child(4)').text()
						.trim());
				articlesScannedPer += Number($(this).children(':nth-child(5)')
						.text().trim());
				tenderpcust += Number($(this).children(':nth-child(6)').text()
						.trim());
				idleTime += Number($(this).children(':nth-child(7)').text()
						.trim());
				secureTime += Number($(this).children(':nth-child(8)').text()
						.trim());
				transCount += Number($(this).children(':nth-child(9)').text()
						.trim());
				itemscannedcount += Number($(this).children(':nth-child(10)')
						.text().trim());
				avgPrince += Number($(this).children(':nth-child(11)').text()
						.trim());
			});
	// console.log(cnt.toFixed(3));
	$('.hourOfDayNSW1').text(hourOfDay.toFixed(2));
	$('.avgTransValue1').text(avgTrans.toFixed(2));
	$('.articlesScannedPerRegPerMin1').text(articlesScannedPer.toFixed(2));
	$('.tenderP_Cust1').text(tenderpcust.toFixed(3));
	$('.idleTime1').text(idleTime.toFixed(3));
	$('.secureTime1').text(secureTime.toFixed(3));
	$('.transCount1').text(transCount);
	$('.itemScannedCount1').text(itemscannedcount);
	$('.avgPrice1').text(avgPrince.toFixed(2));

}

function printReport() {
	//printResult();
}

function checkDuplicateEntries() {
	var selectedUsers = [];
	$('#multiplePOS ul li label').each(function() {
		$('#multiplePOS ul li label').removeData();
		selectedUsers.push($(this).attr('for'));
	});
	for ( var i = 0; i < selectedUsers.length; i++) {
		for ( var j = 1; j < selectedUsers.length; i++) {
			if (selectedUsers[i] == selectedUsers[j]) {
				if (selectedUsers[i] != undefined) {
					$("#multiplePOS ul ").children(
							'li label:contains(' + selectedUsers[i] + ')')
							.first().remove();
				}
			}
		}

		// $("#multiplePOS ul ").children("li:has('label'):contains(' +
		// selectedUsers[i] + ')").remove();

		// $("#multiplePOS ul ").children('li label:contains(' +
		// selectedUsers[i] + ')').first().remove();
	}

}

function posDeclarationVerifyAddUser(data, flag) {
	$.ajax({
		data : data,
		url : "getStoreAndCashierName.htm",
		type : 'get',

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {

			hideError();
			prevRes = '';
			prevRes = response;
			verifyAddUser(response, '');
			stopLoading();
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			stopLoading();
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
					$('.verified').removeClass('hideBlock'); 
					$("#dialog-verify").dialog("close");
					$('input[name="posIdSingle"]').val(
							$(this).parent().parent().parent().find('td:first')
							.text().trim());
				});
	}
}
function updateSortPlugin() {
	$(".sortTable").trigger("update");

}
function formPosDeclarationContent(response) {
	var posDeclaration = '';
	var msg = '';
	var output = '';
	output = $.parseJSON(response);
	posDeclaration = output.data;
	msg = output.msg;
	var dataCheck = 0;
	var grpCount = 0;
	var isGrpFirstRow = true;

	var flag = false;
	currentPage = 1;

	if (msg != undefined && msg != null && msg == '' && posDeclaration != null
			&& posDeclaration != undefined ) {
		setReportGenerationFlags();
		var content = '';
		var declrResult = '';
		var storeTotal = 0;

		var notequalZero = 0;
		if (posDeclaration != null) {
				var list = posDeclaration;//[m]

				for ( var i = 0; i < list.length; i++) {
					if(list[i].posNumber !=  null && list[i].posNumber != "" && list[i].posNumber != undefined){

					if(isGrpFirstRow==true) {
						declrResult = Number(list[i].declarationResult);
						flag = true;
						if ($('#yes').is(':checked')) {
							content += '<tr id="pos_' + list[i].posNumber + '" class="posTr page-' + Math.ceil((grpCount+1)/3);
							if ((grpCount+1) > 3)
								content += ' hideBlock "';
							content += '"><td id="posColspan" colspan="7" class="rowSection  rowHighlight ">POS  '
									+ list[i].posNumber + '</td></tr>';
						} else {
							content += '<tr id="pos_' + list[i].posNumber + '" class="posTr page-' + Math.ceil((grpCount+1)/3);
							if ((grpCount+1) > 3)
								content += ' hideBlock "';
							content += '"><td id="posColspan" colspan="6" class="rowSection  rowHighlight ">POS  '
									+ list[i].posNumber + '</td></tr>';
						}
						isGrpFirstRow = false;
					}
					else {
						declrResult = Number(list[i].declarationResult) - Number(list[i - 1].declarationResult);
					}
					list[i].dateT = (list[i].dateT != null && list[i].dateT != undefined) ? list[i].dateT
							: '';
					list[i].timeT = (list[i].timeT != null && list[i].timeT != undefined) ? list[i].timeT
							: '';
					list[i].authorisedBy = (list[i].authorisedBy != null && list[i].authorisedBy != undefined) ? list[i].authorisedBy
							:

							'';
					list[i].declarationResult = (list[i].declarationResult != null && list[i].declarationResult

					!= undefined) ? list[i].declarationResult : '';
					list[i].discrepancy = (list[i].discrepancy != null && list[i].discrepancy != undefined) ?

					Number(list[i].discrepancy).toFixed(2)
							: '';
					list[i].cashierName = (list[i].cashierName != null && list[i].cashierName != undefined) ? list[i].cashierName
							:
							'';

					notequalZero = Number(list[i].declarationResult)
							+ Number(list[i].discrepancy);

					dataCheck++;
					content += '<tr id="' + i + '"class=" parentTr page-' + Math.ceil((grpCount+1)/3);
					if ((grpCount+1) > 3)
						content += ' hideBlock "';

					content += '"><td class="leftValue " >'
							+ convertDate(list[i].dateT) + '</td>'
							+ '<td class="centerValue " >';
					if (list[i].timeT.trim() != '')
						content += convertTime(list[i].timeT);
					content += '</td>'
					+ '<td class="leftValue " >';
					if (list[i].authorisedBy.trim() != '')
						content += list[i].authorisedBy;// .toFixed(2);
					content += '</td>' + '<td class="leftValue cashName" >';
					if (list[i].cashierName.trim() != '')
						content += list[i].cashierName;// .toFixed(2);
					content += '</td>' + '<td class="rightValue declrResult">';
					if (list[i].declarationResult.trim() != '')
						content += Number(list[i].declarationResult).toFixed(2);

					content += '</td>' + '<td class="rightValue descrip">';
						if(Number(declrResult) !=0)
							{
						content += Number(declrResult).toFixed(2);
							}
						else
							{
							content +="OK";
							}
					content += '</td>';
					content += '<td class="rightValue lastColumn"></td>';
					content += '<td class="rightValue hideBlock">'+convertDate(list[i].sortDate)+'</td>';
					content += '</tr>';
					if(list[i].grpLastRec == true){
						if ($('#yes').is(':checked')) {
							content += '<tr class="totTr totalRow page-' + Math.ceil((grpCount+1)/3);
							if ((grpCount+1) > 3)
								content += ' hideBlock "';
							content += '"><td class="valueInfo storeTotal" colspan="4">Total</td><td class="numberColumn  total valueInfo">'
									+ Number(list[i].declarationResult).toFixed(2)
									+ '</td><td class="numberColumn valueInfo ">&nbsp;</td><td class="numberColumn valueInfo lastColumn">&nbsp;</td></tr>';
						} else {
							content += '<tr class="totTr totalRow page-' + Math.ceil((grpCount+1)/3);
							if ((grpCount+1) > 3)
								content += ' hideBlock "';
							content += '"><td class="valueInfo storeTotal" colspan="3">Total</td><td class="numberColumn  total valueInfo">'
									+ Number(list[i].declarationResult).toFixed(2)
									+ '</td><td class="numberColumn valueInfo ">&nbsp;</td><td class="numberColumn valueInfo lastColumn">&nbsp;</td></tr>';
						}
						isGrpFirstRow = true;
						grpCount++;
					}
				}
				}
				
		}

		content += '<tr class="lastRow storeTotalRow hideStoreTotal hideBlock">';

		if ($('#yes').is(':checked'))

			content += '<td colspan="4" class="rowSection rowHighlight">Store Total</td>';

		else

			content += '<td colspan="3" class="rowSection rowHighlight">Store Total</td>';
		content += '<td class="rowSection rowHighlight numberColumn storeTot negativeValue">'
				+ '</td>'
				+ '<td class=" rowSection rowHighlight ">&nbsp;</td><td class="rowSection rowHighlight lastColumn">&nbsp;</td>'
				+ '</tr>';

		$('#sortTable tbody:first').html('');
		$('#sortTable tbody:first').append(content);

		showContentPosDeclarationBlock();
		showndHide();
		$('.descrip').filter(function() {

			if (Number($(this).text()) < 0) {
				$(this).addClass('minusRed');

			} else {

			}

		});

		if (dataCheck == 0) {
			showWarning('Sorry, no results found for your search criteria. Please try again.');
		}

		storeTotalValue();
		curPage = 1;
		if (grpCount > 3) {

			$('.paginationDiv').pagination({
				items : grpCount,
				itemsOnPage : 3,
				cssStyle : 'compact-theme',
				currentPage : curPage,
				onPageClick : function(pageNo) {

					// closeAccordian();
					curPage = pageNo;
					var pageClass = 'page-' + pageNo;
					$('.posTr,.parentTr,.totalRow').filter(function() {

						if ($(this).hasClass(pageClass)) {
							$(this).removeClass('hideBlock');
							//$(this).removeClass('hideStoreTotal');
							if (curPage == Math.ceil(grpCount/3)) {
								if($('.hideStoreTotal').hasClass('hideBlock')) {
									$('.hideStoreTotal').removeClass('hideBlock');
								}
							}
							else {
								if(!$('.hideStoreTotal').hasClass('hideBlock')) {
									$('.hideStoreTotal').addClass('hideBlock');
								}
							}
							// $('.hideStoreTotal').removeClass('hideBlock');
						} else {
							$(this).addClass('hideBlock');
							//$('.hideStoreTotal').addClass('hideBlock');
						}

						if (curPage == Math.ceil(grpCount/3)) {
							//$('.hideStoreTotal').removeClass('hideBlock');
						}

					});
				}

			});

			$(' .paginationDiv').removeClass('hideBlock');

		} else {

			$(' .paginationDiv').addClass('hideBlock');
			$('.hideStoreTotal').removeClass('hideBlock');
		}

		if (flag) {
			updateSortPlugin();
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				// var sorting = [[0,0]];
				// sort on the first column
				// $(".sortTable").trigger("sorton",[sorting]);
			}, 30);
		} else {
			$('.paginationDiv ').addClass('hideBlock');
		}
	} else {
		if (msg == 'No Data Found.' || msg==NDF)
			showWarning(NDF);
		else
			showError(msg);
	}
}

function storeTotalValue() {

	var transacCount = 0;

	$('.totalRow').filter(function() {

		transacCount += Number($(this).find('.total').text());

	});

	$('.storeTot').text(transacCount.toFixed(2));

}
function convertDate(val) {

	var temp = val;
	try {
		if (temp != '') {
			var timeT = temp.replace('/', '').replace('/', '').replace('(', '')
					.replace(')', '').split('Date')[1];
			var today = new Date();
			today.setTime(timeT);
			// var today = new Date();
			var newDate = today.getDate();
			var newMonth = today.getMonth() + 1;
			if (newDate < 10) {
				newDate = '0' + newDate;
			}
			if (newMonth < 10) {
				newMonth = '0' + newMonth;
			}
			return newDate + "/" + (newMonth) + "/" + today.getFullYear();
		}
	} catch (error) {
		return '';
	}

}

function showContentPosDeclarationBlock() {
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

function storeTotal() {

	var soldOverTot = 0;

	$('.sortTable .totTr:visible').filter(function() {

		soldOverTot += $('.storeTotal').text().trim();

	});

	$('.storeTot').text(soldOverTot);

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
function posDeclarationJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#posDeclaration').attr("action", "getposDeclaration.pdf");
		$('#posDeclaration').attr('target','_blank');
		$('#posDeclaration').submit();
	}
}
