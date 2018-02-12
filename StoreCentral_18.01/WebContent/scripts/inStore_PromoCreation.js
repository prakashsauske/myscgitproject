var articleSearchResult;
var promoList;
var adType;
var isBigw;
var isMetro;
var isSupers;
var isLiqure;
var isShrunked = true;
var toFilerList;
var verified = '<label class="success">Verified</label>';
var failed = '<label class="failed" title="">Failed</label>';
var confirmmsg = 'Article will be removed.';
var popUpErrorMsgDiv = '<h4 class="errorAddtnlDtls" style="padding-left:15px;/* margin-top:20px; */color:red;background:url(../../images/iconError.png) 0 3px no-repeat;/* display: inline; */display: inline-block;float: left;">Please select atleast one article to add.</h4>';
var currentDate = new Date();
var currentDatePlus2 = new Date();
var roleMap={'MA':'MA'};
var days = (2 * 24 * 60 * 60 * 1000);
var currentUser='';
var roleId;
$(document)
		.ready(
				function() {
					roleId = $('#roleId').val();
					$('#start').val(getDesiredDate(0));
					$('#end').val(getDesiredDate(0));
					
					currentUser=$('#loginUserId').val();
					
					createAutoSuggest($('#article'));

					var newTime = currentDate.getTime() + days;
					currentDatePlus2.setTime(newTime);
					$('#article').focus();
					$('[name="sr_searchOption"]').click(function() {
						$('#article').focus();
						$('#article').removeClass('errorField');
						$('#article').attr('title', '');
					});
					$('#price').parent('ul').find('li').removeClass(
							'selectedMenu');
					$('#price').addClass('selectedMenu');

					isBigw = $('#isBigw').val();

					if (isBigw == 'true') {
						buildLimit = buildBigwLimit;
						var daysOut=$('#daysOut').val();
						$('#start').val(getDesiredDateBigW(0,daysOut));
						$('#end').val(getDesiredDateBigW(0,daysOut));
					} else {
						buildLimit = maxlimit;
						$('#start').val(getDesiredDate(0));
						$('#end').val(getDesiredDate(0));
					}

					if ($("#currentBanner").val() == 'woolworths' || $("#currentBanner").val() == 'thomasdux' || $("#currentBanner").val() == 'countdown') {
						isSupers = true;
						isLiqure = false;
					} else if ($("#currentBanner").val() == 'danmurphy'
							|| $("#currentBanner").val() == 'bws') {
						isSupers = false;
						isLiqure = true;
					} else if ($("#currentBanner").val() == 'metro') {
						isSupers = false;
						isLiqure = false;
						isMetro = true;
					} else {
						isSupers = false;
						isLiqure = false;
					}

					// code for enter key event
					$('body')
							.on(
									'keypress',
									function(e) {
										var p = e.which;
										if (p == 13) {
											e.preventDefault();
											/*
											 * if
											 * (!$('#PublishButton').hasClass(
											 * 'disabled') &&
											 * $('#PublishButton:visible').length ==
											 * 1) { $('#PublishButton').trigger(
											 * 'click'); } else if
											 * ($('#validateButton:visible').length ==
											 * 1) {
											 * $('#validateButton').trigger(
											 * 'click'); } else if
											 * ($('#beforePublishBtn:visible').length ==
											 * 1) {
											 * $('#beforePublishBtn').trigger(
											 * 'click'); } else {
											 */
											if ($('#dialog-confirmation')
													.dialog('isOpen')
													&& $(
															'#dialog-confirmation #ok')
															.is(':visible')) {
												$('#dialog-confirmation #ok')
														.trigger('click');
											} else if ($('#dialog-confirmation')
													.dialog('isOpen')
													&& $(
															'#dialog-confirmation .confirmation-yesbtn')
															.is(':visible')) {
												$(
														'#dialog-confirmation .confirmation-yesbtn')
														.trigger('click');
											} else if ($(
													'#dialog-mulipleArticles')
													.dialog('isOpen')) {
												$('#addtolist')
														.trigger('click');
											} else if ($(
													"#dialog-mulipleArticlesCONFIRM")
													.dialog('isOpen')) {
												$('#addanyway')
														.trigger('click');
											} else if ($('#searchAndAdd').is(
													':visible')) {
												$('#searchAndAdd').trigger(
														'click');
											} else if ($('#PublishButton')
													.hasClass('disabled')
													&& !($('#validateButton')
															.hasClass('disabled'))
													&& $('#validateButton').is(
															':visible')) {
												$('#validateButton').trigger(
														'click');
											} else if (!($('#PublishButton')
													.hasClass('disabled'))
													&& $('#PublishButton').is(
															':visible')) {
												$('#PublishButton').trigger(
														'click');
											}
											// }
										}
									});

					adType = $('#adType').html();
					// code for setting default parameters for popups
					$("#dialog-mulipleArticles").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 515
					});

					$("#dialog-mulipleArticlesCONFIRM").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 515
					});

					// dialogue for sales history
					$("#dialog-salesHistory").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 950
					});

					$("#dialog-confirmation").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 480
					});
					$("#dialog-ISDconfirmation").dialog({
						autoOpen : false,
						modal : true,
						resizable : false,
						maxHeight : 800,
						width : 480
					});


					$('#addtolist')
							.click(
									function(event) {
										if ($('input[name="articlecheckbox"]:checked').length >= 1) {
											addArticleToPromoList();
										} else {
											showError('', true);
											event.preventDefault();
											event.stopPropagation();
										}

									});

					// (Temp - Dev team need to change it) Code to show multiple
					// articles popup

					$("#searchAndAdd")
							.click(
									function() {
										$('#errorMsgDiv').removeClass(
												'hideBlock').addClass(
												'hideBlock');
										var articleNo = $('#article').val()
												.trim();
										if (!$('#article').required()) {
											showError('Please enter article to search.');
											$('#article').focus();
										} else if (articleNo != ''
												&& isNaN(articleNo) && !(articleNo.length > 2)
												) {
												showError('Please input a minimum of 3 characters.');
											$('#article').focus();
										} else {
											$('#article').removeClass('errorField');
											if ($('#start').startEndValidation(
													$('#end'),0)) { // for Defect_14830 point 2
												$('#start').removeClass('errorField');
												$('#end').removeClass('errorField');												
												
												// start date validation 												
												if (isBigw == 'true') {
													var endDate = $('#end');
													if(compareDate($('#start').val(), getDesiredDateBigW(0,$('#daysOut').val())) == 'lt'){
														$('#start').removeClass(errorFieldClass).addClass(errorFieldClass);
														addtooltip($('#start'), "Start date cannot be less than "+getDesiredDateBigW(0,$('#daysOut').val())+"");// as per comments from Millie
														$('#start').change(function() {
															$('#start').removeClass(errorFieldClass);
															removetooltip($('#start'));
														});														
													}													
													else if(compareDate(endDate.val(), getDesiredDateBigW(0,$('#daysOut').val())) == 'lt'){
														endDate.removeClass(errorFieldClass).addClass(errorFieldClass);
														addtooltip(endDate, "End date cannot be less than "+getDesiredDateBigW(0,$('#daysOut').val())+"");// as per comments from Millie
														endDate.change(function() {
															endDate.removeClass(errorFieldClass);
															removetooltip(endDate);
														});
														
													} else {
															getArticleSearchResult($(
																	submitQuery)
																	.serialize());															
													}
												} else {												
													getArticleSearchResult($(
															submitQuery)
															.serialize());
													}
											} else {
												showError('Please check the date range.');
												// $('#start').focus();
											}
										}
										$(".tooltip").tooltip({
											position : {
												my : "left center",
												at : "right+10 center"
											}
										});
									});

					// (Temp - Dev team need to change it) Code to show a
					// message once
					// Create is clicked

					$("#createButton").click(function() {
						$("#dialog-create").parent().addClass("popupWrapper");
						$("#dialog-create").dialog("open");
					});

					/*
					 * $( ".popupActions .actionBtn, .popupActions
					 * .secondaryActionBtn") .click(function() {
					 * $("#dialog-mulipleArticles").dialog("close");
					 * $("#dialog-create").dialog("close"); });
					 */

					$(
							'#dialog-mulipleArticles .popupActions .secondaryActionBtn')
							.click(function() {
								$('#dialog-mulipleArticles').dialog('close');
							});

					$("#addActionBtn").click(function() {
						$("#tableAddAction").toggleClass('hideBlock');
					});
					$("#closeLink").click(function() {
						$("#tableAddAction").addClass('hideBlock');
					});

					$("#dialog-create").click(function() {
						$("#beforeCreate").addClass('hideBlock');
						$("#afterCreate").removeClass('hideBlock');
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

					Date.format = 'dd/mm/yy';
					$(".inputDateInput").datepicker({
						zIndex : 50
					});
					if(isBigw=='true'){
						var daysOut=$('#daysOut').val();
						$(".inputDate").datepicker({
							zIndex : 50,
							minDate: getDesiredDateBigW(0,daysOut)
						});
						}
						else{
							$(".inputDate").datepicker({
								zIndex : 50
							});	
						}

					// Code to show and hide filter

					$('#filterOpen')
							.click(
									function() {
										if ($('#promoArticleList').find('tr').length > 3) {
											$("#filterClear").removeClass(
													'hideBlock');
											$(".filterRow").removeClass(
													'hideBlock');
											showTips();
											if (isShrunked) {
												$('td[data-addonfilter]')
														.removeClass(
																'hideBlock')
														.addClass('hideBlock');
											} else {
												$('td[data-addonfilter]')
														.removeClass(
																'hideBlock');
											}
											$(this).addClass('hideBlock');
										}
									});

					$('#filterClear').click(
							function() {
								$('.Filter').val('');
								if (isShrunked) {
									$('#promoArticleList tr[data-om]')
											.removeClass('hideBlock');
								} else {
									if(toFilerList != undefined)
										{
										toFilerList.prev('tr.headRow').removeClass('hideBlock');
										toFilerList.removeClass('hideBlock');
										}
								}

								$("#filterOpen").removeClass('hideBlock');
								$(".filterRow").addClass('hideBlock');
								$(this).addClass('hideBlock');
								hideTips();
							});

					$(".tooltip").tooltip({
						position : {
							my : "left center",
							at : "right+10 center"
						}
					});

					$("#menu").menu({
						position : {
							my : "right top",
							at : "right top+20"
						}
					});

					$("#beforeCreate, #afterCreate").treetable({
						expandable : true
					});

					// Code to close
					$(".close").click(function() {
						$(".quickHelpWrapper").addClass('hideBlock');
						$(".pageErrorsWrapper").addClass('hideBlock');
					});

					$("#promolistcheckboxall")
							.click(
									function() {
										if ($("#promolistcheckboxall:checked").length == 1) {
											$(".promolistcheckbox").prop(
													'checked', true);
										} else {
											$(".promolistcheckbox").prop(
													'checked', false);
										}
										checkOrUncheckAll();
										
										//added for Group By
										if($(this).is(':checked'))
											$('.userCheckBox').prop('checked',true);
										else
											$('.userCheckBox').prop('checked',false);

									});

					$("#dialog-salesHistory").find(".popupActions .closeBtn")
							.click(function() {
								$("#dialog-salesHistory").dialog("close");
							});

					// beforeCreate button event
					$("#beforePublishBtn")
							.click(
									function() {
										if($(this).hasClass('disabled')){
											return false;
										}
										hideError();

										if ($(".promolistcheckbox:checked").length == 0) {
											showError('Please Select any article to proceed.');
											$(".tooltip").tooltip({
												position : {
													my : "left center",
													at : "right+10 center"
												}
											});
											return false;
										}

										if (validateDraft($('#promoArticleList tr[data-om]'))) {
											var formData = getPostDataObj4ArticleInfoStr(
													$('#promoArticleList tr[data-om]'),
													true);
											$('.saveRecord').trigger('click');
											if (isBigw == 'true')
											{		
												validateArticlesISDList(formData)
											}else{
												getArticleInfo(formData);
											}
										} else {
											$(".tooltip").tooltip({
												position : {
													my : "left center",
													at : "right+10 center"
												}
											});
											return false;
										}

									});

					$('#backBtn').click(
							function() {

								if (isShrunked) {
									window.location
											.replace("../login/homepage.htm");
								}
								else {
								$('#instructionalText2').removeClass(
										'hideBlock').addClass('hideBlock');
								$('#instructionalText1').removeClass(
										'hideBlock');
								if($('#listOption').val()!='allDrafts'){
									$('#addActionBtn').removeClass('hideBlock');
									$('#tableAddAction').removeClass('hideBlock');
								}
								$('#beforePublish').removeClass('hideBlock');
								$('#afterPublishDiv').removeClass('hideBlock')
										.addClass('hideBlock');
								$('.saveRecord').trigger('click');
								checkOrUncheckAll();
								shrunkTable();
								clearAllErrors();
								if($('#salesOrg').val()=="1060")
									resetSearchFieldsBigW($('#daysOut').val());
								else
								resetSearchFields();
								$('#promoList .status').text('Draft');
								$('.editRecord').trigger('click');
								hidePromoList();
								}
							});

					// NEW selector
					jQuery.expr[':'].Contains = function(a, i, m) {
						return jQuery(a).text().toUpperCase().indexOf(
								m[3].toUpperCase()) >= 0;
					};

					// OVERWRITES old selecor
					jQuery.expr[':'].contains = function(a, i, m) {
						return jQuery(a).text().toUpperCase().indexOf(
								m[3].toUpperCase()) >= 0;
					};

					var filterinput = $('.Filter');
					filterinput
							.each(function() {
								var filterfor = $(this).attr('data-filterfor');
								console.log('for filter :' + filterfor);

								var event = 'keyup';
								if ($(this).hasClass('inputDate')
										|| $(this).hasClass('inputDateInput')) {
									event = 'change';
								}

								$(this).unbind(event);
								$(this)
										.on(
												event,
												function() {
													var visible = false;

													if (isShrunked) {
														toFilerList = $('#promoArticleList tr[data-om]');
													} else {
													}// get rows from
													// globally;

													filterinput
															.each(function() {
																var trList;
																var elem = $(this);
																console
																		.log("elem"
																				+ elem
																						.val());
																if (elem.val()
																		.trim() != '') {
																	filterfor = elem
																			.attr('data-filterfor');
																	filtertext = $(
																			this)
																			.val();
																	console
																			.log('for filter :'
																					+ filterfor);
																	if (!visible) {
																		toFilerList
																				.addClass('hideBlock');
																		$('#promoArticleList').find('.expandsubrow ').hide();
																		
																		if($('#listOption').is(':disabled'))
																		{
																			$('#promoArticleList tr.headRow').addClass('hideBlock');
																		}
																		
																		var toShow=toFilerList
																				.find(
																						'.'
																								+ filterfor
																								+ ':contains('
																								+ filtertext
																								+ ')')
																				.parent(
																						'tr');
																		toShow.removeClass(
																						'hideBlock');
																		toShow.each(function(){
																			if($('#listOption').is(':disabled'))
																			{
																			$(this).prev('tr').removeClass('hideBlock');
																			}
																			var id=$(this).attr('data-tt-id');
																			if($(this).find('.collapsed').length==1)
																			$('tr[data-tt-parent-id="'+id+'"]').show();
																		});

																	} else {
																		trList = $(
																				'#promoArticleList tr[data-om]:visible .'
																						+ filterfor
																						+ ':contains('
																						+ filtertext
																						+ ')')
																				.parent(
																						'tr');
																		$('#promoArticleList').find('.expandsubrow:visible').hide();
																		if($('#listOption').is(':disabled'))
																		{
																			$('#promoArticleList tr.headRow').addClass('hideBlock');
																		}
																		
																		$(
																				'#promoArticleList tr[data-om]')
																				.addClass(
																						'hideBlock');
																		console
																				.log(trList.length);
																		trList
																				.removeClass('hideBlock');
																		trList.each(function(){
																			if($('#listOption').is(':disabled'))
																			{
																			$(this).prev('tr').removeClass('hideBlock');
																			}
																			var id=$(this).attr('data-tt-id');
																			if($(this).find('.collapsed').length==1)
																			$('tr[data-tt-parent-id="'+id+'"]').show();
																		});
																	}

																	visible = true;
																}
																if (!visible) {
																	toFilerList
																			.removeClass('hideBlock');
																	toFilerList.each(function(){
																		if($('#listOption').is(':disabled'))
																		{
																		$(this).prev('tr').removeClass('hideBlock');
																		}
																		var id=$(this).attr('data-tt-id');
																		if($(this).find('.collapsed').length==1)
																		$('tr[data-tt-parent-id="'+id+'"]').show();
																	});
																}
															});
												});
							});

					$("#validateButton")
							.click(
									function() {
										if (!$(this).hasClass('disabled')) {
											var allSavedFlag = true;
											// ###have to uncomment below
											// $('#promoArticleList
											// tr[data-om]:visible').each(function()
											// {
											// var obj = $(this);
											// if(!obj.find('label.saveRowBtn').hasClass('hideBlock')){
											// allSavedFlag=false;
											// }
											// });
											// ###have to uncomment above
											if (allSavedFlag) {
												/*
												 * var text =
												 * checkForWarning($('#promoArticleList
												 * tr[data-om]:visible')); if
												 * (text == '') {
												 */
												validatebeforeCreatePromotion(
														$('#promoArticleList tr[data-om]:visible'),
														true);
												/*
												 * } else {
												 * showWarningMsg(text); }
												 */
											} else {
												flag = false;
												showError("Please save the changes before you proceed.");
											}
										}

									});
					$("#PublishButton").click(function() {
						if (!$(this).hasClass('disabled')) {
							callServiceForCreate();
						}
					});

					$('input[name="addedArticleList"]').each(
							function() {

								var articleNo = $(this).val().split("_")[0];
								var uom = $(this).val().split("_")[1];
								var description = $(this).val().split("_")[2];
								var id = articleNo + "_" + uom;

								$('#promoArticleList').append(
										getPromoItemAsHTML(currentUser,articleNo,
												description, uom, id, '', '',
												'', '', '', '', '', '', '', '','','',
												'', '', '', '', '',''));
								$("#row-" + id).find("#dispType").val('');
								bindSaveAndDelete(id);
								showPromoList();
								shrunkTable();

							});

					$('#apply')
							.click(
									function() {
										$('.histParent a span').text('+');
										$('.histChild').parent().parent()
												.parent().addClass('hideBlock');

										var month = $('.months').val();
//										promoType = $(
//												'.selectOptions.promoType')
//												.val();
										promoType='A';
										var now = new Date();
										nowTime = now.getTime();
										beforeTime = now.setTime(nowTime
												- (86400000 * 30 * month));
										$('.appended').removeClass('hideBlock');
										$('.appended')
												.filter(
														function() {
															startDate = $(this)
																	.find(
																			'.start-date')
																	.text()
																	.trim();
															endDate = $(this)
																	.find(
																			'.end-date')
																	.text()
																	.trim();
															crntPromoType = $(
																	'.crntPromoType')
																	.val();
															var tempDateOne = new Date();
															var tempDateTwo = new Date();
															startDateObj = tempDateOne
																	.setFullYear(
																			startDate
																					.split('/')[2],
																			startDate
																					.split('/')[1] - 1,
																			startDate
																					.split('/')[0]);
															endDateObj = tempDateTwo
																	.setFullYear(
																			endDate
																					.split('/')[2],
																			endDate
																					.split('/')[1] - 1,
																			endDate
																					.split('/')[0]);

															// crntPromoType =
															// 'A';

															if ((beforeTime > startDateObj || nowTime < endDateObj)
															// || (crntPromoType
															// != promoType &&
															// promoType != 'A')
															)
																$(this)
																		.addClass(
																				'hideBlock');
															else
																$(this)
																		.removeClass(
																				'hideBlock');
														});

										/*$('.histParent')
												.filter(
														function() {
															// console.log('c');
															if ($(this)
																	.hasClass(
																			'C')
																	&& promoType == 'C')
																$(this)
																		.removeClass(
																				'hideBlock');
															else if ($(this)
																	.hasClass(
																			'I')
																	&& promoType == 'I')
																$(this)
																		.removeClass(
																				'hideBlock');
															else if (promoType == 'A')
																$(this)
																		.removeClass(
																				'hideBlock');
															else
																$(this)
																		.addClass(
																				'hideBlock');
														});*/

										/*
										 * $('.histParent') .filter( function() {
										 * var cnt = ($(this).next().find( 'td
										 * .histChild').length - $(
										 * this).next().find( 'td
										 * .histChild.hideBlock').length);
										 * $(this).find('a').html( '<span>+</span> ' +
										 * cnt);
										 * 
										 * if (cnt == 0) {
										 * $(this).addClass('hideBlock'); } else {
										 * $(this) .removeClass( 'hideBlock'); }
										 * });
										 */

										$('.filtered-count h4 strong').text(
												$('.appended:visible').length);
									});

					/*$('.temp-fix-pop-up').css('margin-left',
							(($(window).width() - 980) / 2) + 'px');

					$(window)
							.resize(
									function() {
										$('.temp-fix-pop-up').css(
												'margin-left',
												(($(window).width() - 980) / 2)
														+ 'px');
										
										 * console .log((($(window).width() -
										 * 980) / 2) + 'px');
										 
									});*/
					$('#listOption').on('change',function()
							{
						var option = $(this).val();
						if(option == 'myDrafts')
							{
							callServiceForMyDraft();
							}
						else if(option =='allDrafts')
							{
							callServiceForAllDraft();
							}
						hideError();
							});
					$('#listOption').trigger("change");
					
					getConfigData();
				});


/*//get articles from RC
function getArticleSearchResult(data) {

	$.ajax({
		type : "get",
		url : "searchArticle.htm",
		data : data,

		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			console.log(response);
			var message = '';
			output = $.parseJSON(response);
			message = output.data.message;
			console.log(message);
			if (message == 'success') {
				$('#dialog-mulipleArticles .errorAddtnlDtls').remove();
				$('#searchText').text($('#article').val());
				$('#searchArticleCount').text(output.data.articleList.length);
				$('#articleSearchTbody').html(
						populateSearchResult(output.data.articleList));
				$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
				$("#dialog-mulipleArticles").dialog("open");
				$("#dialog-mulipleArticles").parent().find('.ui-dialog-title')
						.text('Article Search Result');
				bindCheckboxevent();
			} else if (message == 'directadd') {
				addSingleArticleToPromoList(output.data.articleList[0]);
				showPromoList();
				resetSearchFields();
			} else {
				console.log(message);
				showError(message);
				stopLoading();
			}
			stopLoading();
		},
		error : function() {
			showError('Sorry, Some technical issue occured.');
			stopLoading();
			// stopLoading();// goToLogin();
		},
	});

}*/

function validateArticlesISDList(data) {
	var param = {
		"inStorePromoArticleInfoList" : $.parseJSON(data)
	};
	console.log(param);
	$
			.ajax({
				type : "post",
				url : "valArticleISDList.htm",
				contentType : "application/json",
				data : JSON.stringify(param),
				/*data : {
					inStorePromoArticleInf : data
				},*/
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					var message = '';
					output = $.parseJSON(response);
					dataObj = output.data;
					if (dataObj == null) {
						message = "Service call failed.";
					} else {
						message = dataObj.msg;
					}
					if (message == 'success' && dataObj!=undefined && dataObj.inStorePromoArticleInfoList!=undefined) {
						if(dataObj.inStorePromoArticleInfoList.length == dataObj.iSDvalidArticleList.length)
							{
							getArticleInfo(data);
							}
						else
							{
							ISDconfirmation(dataObj);
							stopLoading();
							$('.editRecord').trigger('click');
							}
					}else if(message == 'logout'){
						gotoHomeScreenSessionExpired();
					} else {
						if (message == undefined) {
							message = "Technical issue occured.Please contact java support.";
							$('.editRecord').trigger('click');
						}else if(message == 'success'){
							message="Technical issue occured in services.Please contact java support.";
						}
						console.log(message);
						showError(message);
						stopLoading();
					}
				},
				error : function() {
					showError('Sorry, Some technical issue occured.');
					stopLoading();
					$('.editRecord').trigger('click');
				},
			});
	

}

function getArticleInfo(data) {

	var param = {
		"inStorePromoArticleInfoList" : $.parseJSON(data)
	};
	console.log(param);
	$
			.ajax({
				type : "post",
				url : "moreArticleInfo.htm",
				contentType : "application/json",
				data : JSON.stringify(param),
				/*data : {
					inStorePromoArticleInf : data
				},*/
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					var message = '';
					output = $.parseJSON(response);
					dataObj = output.data;
					if (dataObj == null) {
						message = "Service call failed.";
					} else {
						message = dataObj.msg;
					}
					if (message == 'success' && dataObj!=undefined && dataObj.inStorePromoArticleInfoList!=undefined) {
						if (validateNextDeliveryDateNExistance(dataObj)) {
							generateList(dataObj);
						}
					} else if(message == 'logout'){
						gotoHomeScreenSessionExpired();
					}else {
						if (message == undefined) {
							message = "Technical issue occured.Please contact java support.";
							$('.editRecord').trigger('click');
						}else if(message == 'success'){
							message="Technical issue occured in services.Please contact java support.";
						}
						console.log(message);
						showError(message);
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					showError('Sorry, Some technical issue occured.');
					stopLoading();
					$('.editRecord').trigger('click');
					// stopLoading();// goToLogin();
				},
			});

}

function validateNextDeliveryDateNExistance(dataObj) {
	var errors = '';
	var flag = false;
	var existList = [];

	for ( var i = 0; i < dataObj.inStorePromoArticleInfoList.length; i++) {
		obj = dataObj.inStorePromoArticleInfoList[i];
		var id = obj.articleNo + "_" + obj.articleUom;
		console.log('To remove item ' + id);
		if (obj.ifPromoExistFlagStatus == 'exist') {
			existList.push(obj);
			$('#row-' + id).find('.promolistcheckbox').removeAttr('checked');
			$('#row-' + id).find('.promolistcheckbox').trigger('change');

		} else {

			if ($('#row-' + id).attr('data-autoStockR') == 'Y') {
				if (null != obj.deliveryDate && obj.deliveryDate.trim() != ''
						&& obj.deliveryDate.trim() != undefined) {

					// $('#deliveryDateEdit-' + id).find('input').val('');
					// $('#buildEdit-' + id).find('input').val('');
					$('#deliveryDateEdit-' + id).find('input').removeAttr(
							'readonly').removeAttr('disabled').removeAttr(
							'style');
					// .prop(
					// 'placeholder', 'dd/mm/yyyy');
					$('#buildEdit-' + id).find('input').removeAttr('readonly')
							.removeAttr('disabled').removeAttr('style');
				} else {
					errors += getError(obj.articleNo,
							'No vaild delivery is available for the selected start date');
					flag = true;
					$('#row-' + id).attr('data-autoStockR');
					$('#deliveryDateEdit-' + id).find('input').val('');
					$('#buildEdit-' + id).find('input').val('');
					$('#buildEdit-' + id).find('input').val('').attr(
							'readonly', 'readonly')
							.attr('disabled', 'disabled').attr('style',
									'background: rgb(217, 217, 217)');
					$('#deliveryDateEdit-' + id).find('input').val('').attr(
							'readonly', 'readonly')
							.attr('disabled', 'disabled').attr('style',
									'background: rgb(217, 217, 217)');
					// .removeAttr('placeholder');
					$('#buildEdit-' + id).find('input').val('').attr(
							'readonly', 'readonly')
							.attr('disabled', 'disabled').attr('style',
									'background: rgb(217, 217, 217)');
				}
			}
		}

	}
	console.log(existList);
	if (isBigw == 'true' && existList.length > 0) {
		var message = '<ol>';
		// var articleList = [];
		for ( var i = 0; i < existList.length; i++) {
			// articleList.push(existList[i].articleNo);
			message += '<li><b><i>'
					+ existList[i].articleNo
					+ "-"
					+ $(
							'#row-' + existList[i].articleNo + '_'
									+ existList[i].articleUom).find(
							'.description').text()
					+ "("
					+ existList[i].articleUom
					+ ")</i></b>"
					// + JSON.stringify(articleList)
					+ " cannot be added as it already on an In-store Display during the selected period.</li>";
		}
		message += '</ol>';
		showInformation(message);
	} else {
		if (existList.length > 0) {
			showPopUpConfirmation(existList, dataObj);
			stopLoading();
			return false;
		}
	}

	if (flag && errors != '') {
		showWarning(errors);
		return true;
	}
	return true;
}
function showWarningAfterConfirmation(dataObj) {
	var errors = '';
	var flag = false;

	for ( var i = 0; i < dataObj.inStorePromoArticleInfoList.length; i++) {
		obj = dataObj.inStorePromoArticleInfoList[i];
		var id = obj.articleNo + "_" + obj.articleUom;
		console.log('To remove item ' + id);
		if (null != obj.deliveryDate && obj.deliveryDate.trim() != ''
				&& obj.deliveryDate.trim() != undefined) {

			if (isValidDate(obj.deliveryDate)) {

				if (Number(diff(getCurentDateTxt(), obj.deliveryDate)) <= 2) {
					// $(("#build-").concat(id)).text('');
					/*
					 * $(("#buildEdit-").concat(id)).find('input') .val('');
					 */
					$(("#buildEdit-").concat(id)).find('input').attr(
							'readonly', 'readonly').attr('style',
							'background: rgb(217, 217, 217);');
					$(("#buildEdit-").concat(id))
							.find('input')
							.addmsg(
									'Field is readonly if today\'s date is up to 48hours prior to Delivery Date');
					$('#deliveryDateEdit-' + id).find('input').attr('readonly',
							'readonly').attr('style',
							'background: rgb(217, 217, 217);');
				} else {
					// $('#deliveryDateEdit-' + id).find('input').val('');
					// $('#buildEdit-' + id).find('input').val('');
					$('#deliveryDateEdit-' + id).find('input').removeAttr(
							'readonly').removeAttr('disabled').removeAttr(
							'style');
					// .prop(
					// 'placeholder', 'dd/mm/yyyy');
					$('#buildEdit-' + id).find('input').removeAttr('readonly')
							.removeAttr('disabled').removeAttr('style');
				}
			}

		} else {
			errors += getError(obj.articleNo,
					'No vaild delivery is available for the selected start date');
			flag = true;
			$('#row-' + id).attr('data-autoStockR');
			$('#deliveryDateEdit-' + id).find('input').val('');
			$('#buildEdit-' + id).find('input').val('');
			$('#buildEdit-' + id).find('input').val('').attr('readonly',
					'readonly').attr('disabled', 'disabled').attr('style',
					'background: rgb(217, 217, 217)');
			$('#deliveryDateEdit-' + id).find('input').val('').attr('readonly',
					'readonly').attr('disabled', 'disabled').attr('style',
					'background: rgb(217, 217, 217)');
			// .removeAttr('placeholder');
			$('#buildEdit-' + id).find('input').val('').attr('readonly',
					'readonly').attr('disabled', 'disabled').attr('style',
					'background: rgb(217, 217, 217)');
		}
	}
	if (flag && errors != '') {
		showWarning(errors);
		// return true;
	}
}
function showPopUpConfirmation(existList, actualList) {
	$('#articleTbody').html(populateArticles(existList));
	hideErrorinPopup($("#dialog-mulipleArticlesCONFIRM"));
	$("#dialog-mulipleArticlesCONFIRM").parent().addClass("popupWrapper");
	$("#dialog-mulipleArticlesCONFIRM").dialog("open");
	$("#dialog-mulipleArticlesCONFIRM").parent().find('.ui-dialog-title').text(
			'Select article to proceed');
	checkOrUncheckAll();
	$('#addanyway').unbind('click');
	$('#addanyway').click(
			function() {
				if ($("#dialog-mulipleArticlesCONFIRM").find(
						'input[type="checkbox"]:checked').length > 0) {
					$("#dialog-mulipleArticlesCONFIRM").find(
							'input[type="checkbox"]').each(
							function() {
								if ($(this).is(':checked')) {
									var id = $(this).attr('data-referid');
									console.log('=== id' + id);
									$('#row-' + id).find('.promolistcheckbox')
											.prop('checked', 'checked');
									$('#row-' + id).find('.promolistcheckbox')
									.trigger('change');
								}
							});
					generateList(actualList);
					
					showWarningAfterConfirmation(actualList);
					$("#dialog-mulipleArticlesCONFIRM").dialog("close");
				} else {
					showErrorinPopup($("#dialog-mulipleArticlesCONFIRM"), '');
				}
			});

	$("#dialog-mulipleArticlesCONFIRM").find('.secondaryActionBtn').click(
			function() {
				$('.editRecord').trigger('click');
				$("#dialog-mulipleArticlesCONFIRM").dialog("close");
			});
	$("#dialog-mulipleArticlesCONFIRM").parent().find('.closePopUp').click(
			function() {
				$('.editRecord').trigger('click');
				// $("#dialog-mulipleArticlesCONFIRM").dialog("close");
			});
}
function generateList(dataObj) {
	loadMoreInfoFromService(dataObj.inStorePromoArticleInfoList);
//	addToMyDrafts(dataObj.inStorePromoArticleInfoList);
	$('#instructionalText1').removeClass('hideBlock').addClass('hideBlock');
	$('#instructionalText2').removeClass('hideBlock');
	$('#addActionBtn').removeClass('hideBlock').addClass('hideBlock');
	$('#tableAddAction').removeClass('hideBlock').addClass('hideBlock');
	$('#beforePublish').removeClass('hideBlock').addClass('hideBlock');
	$('#afterPublishDiv').removeClass('hideBlock');
	$("#PublishButton").addClass('disabled');
	$("#validateButton").removeClass('disabled');
	expandTable(dataObj);
}

/*function populateSearchResult(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTr(list[i]);
	}
	return content;
}

function getTr(obj) {
	obj.autoStockR = (obj.autoStockR != null && obj.autoStockR != undefined && obj.autoStockR != '') ? obj.autoStockR
			: '';
	obj.var_wgt = (obj.var_wgt != null && obj.var_wgt != undefined && obj.var_wgt != '') ? obj.var_wgt
			: '';
	obj.standardPrice = (obj.standardPrice != null
			&& obj.standardPrice != undefined && obj.standardPrice != '') ? obj.standardPrice
			: '';
	obj.supplierNo = (obj.supplierNo != null && obj.supplierNo != undefined && obj.supplierNo != '') ? obj.supplierNo
			.replace(/^0+/, '')
			: '';
	obj.supplierName = (obj.supplierName != null
			&& obj.supplierName != undefined && obj.supplierName != '') ? obj.supplierName
			: '';
	obj.srcSupplyInd = (obj.srcSupplyInd != null
			&& obj.srcSupplyInd != undefined && obj.srcSupplyInd != '') ? obj.srcSupplyInd
			: '';

	obj.art_mas_uom = (obj.art_mas_uom != null && obj.art_mas_uom != undefined && obj.art_mas_uom != '') ? obj.art_mas_uom
			: '';

	obj.pi_uom = (obj.pi_uom != null && obj.pi_uom != undefined && obj.pi_uom != '') ? obj.pi_uom
			: '';

	obj.orderUom = (obj.orderUom != null && obj.orderUom != undefined && obj.orderUom != '') ? obj.orderUom
			: '';

	obj.distribution_uom = (obj.distribution_uom != null
			&& obj.distribution_uom != undefined && obj.distribution_uom != '') ? obj.distribution_uom
			: '';

	var source_of_supp_ind = obj.srcSupplyInd;
	var art_mas_uom = obj.art_mas_uom;
	var pi_uom = obj.pi_uom;
	var order_uom = obj.orderUom;
	var distributionUom = obj.distribution_uom;

	var tr = '<tr ';
	if (Number(obj.autoStockR) > 0) {
		tr += 'data-autoStockR="Y"';
	} else {
		tr += 'data-autoStockR="N"';
	}
	tr += 'data-var_wgt="'
			+ obj.var_wgt
			+ '" data-standardPrice="'
			+ obj.standardPrice
			+ '"  data-om="'
			+ obj.om
			+ '" data-supplier="'
			+ obj.supplierNo
			+ '-'
			+ obj.supplierName
			+ '"  data-source_of_supp_ind="'
			+ obj.srcSupplyInd
			+ '"  data-art_mas_uom="'
			+ obj.art_mas_uom
			+ '"  data-pi_uom="'
			+ obj.pi_uom
			+ '"  data-order_uom="'
			+ obj.orderUom
			+ '"  data-distributionUom="'
			+ obj.distribution_uom
			+ '"  ><td id="articleNo">'
			+ obj.articleNo
			+ '</td><td id="description">'
			+ obj.description
			+ '</td><td class="centerValue" id="uom" >'
			+ obj.uom
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckbox"></td></tr>';
	return tr;
}*/

function populateArticles(list) {
	var content = '<tr><th>Article</th><th class="centerValue">UOM</th><th class="centerValue">Start Date</th><th class="centerValue">End Date</th><th width="40px" class="centerValue lastColumn">Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getRow(list[i]);
	}
	return content;
}

function getRow(obj) {
	var tr = '<tr ';
	tr += 'data-referId="'
			+ obj.articleNo
			+ '_'
			+ obj.articleUom
			+ '" ><td id="articleNo">'
			+ obj.articleNo
			+ '</td><td >'
			+ obj.articleUom
			+ '</td><td class="centerValue">'
			+ obj.promoStartDate
			+ '</td><td class="centerValue">'
			+ obj.promoEndDate
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" data-referId="'
			+ obj.articleNo + '_' + obj.articleUom + '" checked></td></tr>';
	return tr;
}

function showError(msg, flag) {
	if (flag) {
		$('#dialog-mulipleArticles .popupActionsWrapper .errorAddtnlDtls')
				.remove();
		$('#dialog-mulipleArticles .popupActionsWrapper').append(
				popUpErrorMsgDiv);
	} else {
		$('#errorMsgDiv').removeClass('hideBlock');
		$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	}
}
function showErrorinPopup(elem, msg) {
	$(elem).find('.popupActionsWrapper .errorAddtnlDtls').remove();
	$(elem).find('.popupActionsWrapper').append(popUpErrorMsgDiv);
}
function hideErrorinPopup(elem) {
	$(elem).find('.popupActionsWrapper .errorAddtnlDtls').remove();
}
function hideError() {
	$('#errorMsgDiv').addClass('hideBlock');
}
function hideErrors() {
	$('.ContentTableWrapperError').addClass('hideBlock');
}

function bindCheckboxevent() {
	$('#addtolist').addClass('hideBlock');
	$('input[name="articlecheckbox"]').change(
			function() {
				var size = $('input[name="articlecheckbox"]:checked').length;
				if (size > 0) {
					$('#addtolist').text("Add To List(" + size + ")")
							.removeClass('hideBlock');
				} else {
					$('#addtolist').text("Add To List").addClass('hideBlock');
				}
				if($('input[name="articlecheckbox"]').length==size){
					$('input[name="articlecheckboxSelectAll"]').prop('checked',true);
				}else{
					$('input[name="articlecheckboxSelectAll"]').prop('checked',false);
				}
			});
	$('input[name="articlecheckboxSelectAll"]').change(function(){
		if($(this).is(':checked')){
			$('input[name="articlecheckbox"]').prop('checked',true);
		}else{
			$('input[name="articlecheckbox"]').prop('checked',false);
		}
		$('input[name="articlecheckbox"]').trigger('change');
	});
}
function addArticleToPromoList() {
	var drafts=[];
	var autostockRvalidationFailedItems=[];
	var alcFailedItems=[];
	var psArticleMap={};
	$('input[name="articlecheckbox"]:checked')
			.each(
					function() {
						var rowObj = $(this).parent().parent();
						var articleNo = rowObj.find('#articleNo').text();
						var description = rowObj.find('#description').text();
						var uom = rowObj.find('#uom').text();
						var supplier = rowObj.attr('data-supplier');
						var om = rowObj.attr('data-om');
						var startDate = $('#start').val();
						var endDate = $('#end').val();
						var dispType = $('#adType').val();
						var dispText = $('#adType').find(
								'option[value="' + dispType + '"]').text();
						var autoStockR = rowObj.attr('data-autoStockR');
						var alcStatus = rowObj.attr('data-alcStatus');
						var standardPrice = rowObj.attr('data-standardPrice');
						var promFrct = rowObj.attr('data-promFrct');
						var var_wgt = rowObj.attr('data-var_wgt');
						var source_of_supp_ind = rowObj
								.attr('data-source_of_supp_ind');
						var art_mas_uom = rowObj.attr('data-art_mas_uom');
						var pi_uom = rowObj.attr('data-pi_uom');
						var order_uom = rowObj.attr('data-order_uom');
						var distributionUom = rowObj
								.attr('data-distributionUom');
						var articleStatus = rowObj.attr('data-articleStatus');
						var psStartDate = rowObj.attr('data-psStartDate');
						var psEndDate = rowObj.attr('data-psEndDate');
						var department = rowObj.attr('data-department');
						var freshFoodFlag = rowObj.attr('data-freshFoodFlag');
						var id = articleNo.trim() + '_' + uom.trim();
						var psArtcleArray=[];
						var flag = true;
						if(autoStockR != 'Y')
							{
							autostockRvalidationFailedItems.push(getDraftObj(articleNo, description, uom, id, supplier,
									om, startDate, endDate, dispType, dispText,standardPrice,'','','',department,freshFoodFlag));
							flag= false;
							}
						else if(alcStatus!='' &&(alcStatus =='ES' || alcStatus == 'EC'))
							{
							alcFailedItems.push(getDraftObj(articleNo, description, uom, id, supplier,
									om, startDate, endDate, dispType, dispText,standardPrice,'','','',department,freshFoodFlag));
							flag= false;
							}
						else if(articleStatus == '08' || articleStatus == 'ZA' )
							{
							if($('#start').val() != '' && $('#end').val() != '')
								{
								var from=formatDateMobi(psStartDate);
								var to=formatDateMobi(psEndDate);
								var check1=$('#start').val();
								var check2=$('#end').val();
								if(liesBetweenDateRange(from,to,check1) ||  liesBetweenDateRange(from,to,check2))
									{
									psArtcleArray["articleNo"]=articleNo;
									psArtcleArray["uom"]=uom;
									psArtcleArray["from"]=from;
									psArtcleArray["to"]=to;
									psArtcleArray["articleStatus"]=articleStatus;
									psArticleMap[id]=psArtcleArray;
									flag = false;
									}
								}
							
							}
						if(flag)
							{
						if ($('#row-' + id).length == 0) {
							$('#promoArticleList')
									.append(
											getPromoItemAsHTML(currentUser,articleNo,
													description, uom, id,
													supplier, om, startDate,
													endDate, dispType,
													dispText, autoStockR,
													standardPrice, promFrct,
													var_wgt,
													source_of_supp_ind,
													art_mas_uom, pi_uom,
													order_uom, distributionUom,'','',department,freshFoodFlag));
							
							drafts.push(getDraftObj(articleNo, description, uom, id, supplier,
									om, startDate, endDate, dispType, dispText,standardPrice,'','','',department,freshFoodFlag));
							
							$("#row-" + id).find("#dispType").val(dispType);
							bindSaveAndDelete(id);
							showPromoList();
							shrunkTable();
						} else {
							console.log('overwrite date :' + articleNo);
							if (startDate != '') {
								$("#startDateEdit-" + id).find('input').val(
										startDate);
								$("#startDate-" + id).text(startDate);
							}

							if (endDate != '') {
								$("#endDateEdit-" + id).find('input').val(
										endDate);
								$("#endDate-" + id).text(endDate);
							}
							if (dispType != '') {
								$("#advDisplayEdit-" + id).find('input').val(
										dispType);
								$("#advDisplay-" + id).text(dispText);
							}
						}
					$(("#row-").concat(id)).find('input,select').trigger('change');	
					}
					});
	$("#dialog-mulipleArticles").dialog("close");
	if($('#salesOrg').val()=="1060")
		resetSearchFieldsBigW($('#daysOut').val());
	else
	resetSearchFields();
	checkOrUncheckAll();
	modifyDraft(drafts);
	if(autostockRvalidationFailedItems.length > 0 || alcFailedItems.length > 0)
		{
		var content='Non-replenishment articles ';
		for(var i=0;i<autostockRvalidationFailedItems.length;i++)
			{
				content+=autostockRvalidationFailedItems[i].MATNR;
				if(i != autostockRvalidationFailedItems.length - 1)
					content+=', ';
				else if(i == autostockRvalidationFailedItems.length - 1)
					content+=' ';
			}
		content+='cannot be added to this promotion';
		if(autostockRvalidationFailedItems.length == 0)
			content='';
		showInformation(content,getAlcFailedItemsMessage(alcFailedItems),getPSArticleStatusMessage(psArticleMap));		
		}
	 // calendar autoformatting
				    $('input.inputDate.hasDatepicker').change(function()
					  {
				  $(this).val(formateDate($(this).val()));
					  });
	
}
function getAlcFailedItemsMessage(alcFailedItems)
{
	
	if(alcFailedItems.length > 0)
	{

	var content='Articles ';
	for(var i=0;i<alcFailedItems.length;i++)
		{
			content+=alcFailedItems[i].MATNR;
			if(i != alcFailedItems.length - 1)
				content+=', ';
			else if(i == alcFailedItems.length - 1)
				content+=' ';
		}
	content+='are blocked and cannot be added to this promotion';
	return content;		
	
	}
	else
		return '';
	
}

function getPSArticleStatusMessage(psArticleMap)
{
	
var objectExists = false;	
var content ='';
	for(var m in psArticleMap)
		{
		objectExists = true;
		var articleStatus= '';
			if(psArticleMap[m].articleStatus == 'ZA' )
				{
				articleStatus='Archived';
				}
			else if(psArticleMap[m].articleStatus == '08')
				{
				articleStatus='Recalled';
				}
		content+= 'Article '+psArticleMap[m].articleNo+' is '+articleStatus+' for the date rage from '
		+psArticleMap[m].from+' to '+psArticleMap[m].to+'.' ;
		}
	if(objectExists)
	{
	return content;		
	
	}
	else
		return '';
	
}

function resetSearchFields() {
	$('#article').val('');
	$('#article,#start,#end').removeClass('errorField');
	$('#article').focus();
	//$('#start').val(getDesiredDate(0));
	//$("#end").val(getDesiredDate(0));
}
function resetSearchFieldsBigW(daysOut) {
	$('#article').val('');
	$('#article,#start,#end').removeClass('errorField');
	$('#article').focus();
	$('#start').val(getDesiredDateBigW(0,daysOut));
	$('#end').val(getDesiredDateBigW(0,daysOut));
	
}
/*function addSingleArticleToPromoList(obj) {

	obj.standardPrice = (obj.standardPrice != null
			&& obj.standardPrice != undefined && obj.standardPrice != '') ? obj.standardPrice
			: '';
	obj.var_wgt = (obj.var_wgt != null && obj.var_wgt != undefined && obj.var_wgt != '') ? obj.var_wgt
			: '';
	obj.om = (obj.om != null && obj.om != undefined && obj.om != '') ? obj.om
			: '';

	obj.srcSupplyInd = (obj.srcSupplyInd != null
			&& obj.srcSupplyInd != undefined && obj.srcSupplyInd != '') ? obj.srcSupplyInd
			: '';

	obj.art_mas_uom = (obj.art_mas_uom != null && obj.art_mas_uom != undefined && obj.art_mas_uom != '') ? obj.art_mas_uom
			: '';

	obj.pi_uom = (obj.pi_uom != null && obj.pi_uom != undefined && obj.pi_uom != '') ? obj.pi_uom
			: '';

	obj.orderUom = (obj.orderUom != null && obj.orderUom != undefined && obj.orderUom != '') ? obj.orderUom
			: '';

	obj.distribution_uom = (obj.distribution_uom != null
			&& obj.distribution_uom != undefined && obj.distribution_uom != '') ? obj.distribution_uom
			: '';

	var source_of_supp_ind = obj.srcSupplyInd;
	var art_mas_uom = obj.art_mas_uom;
	var pi_uom = obj.pi_uom;
	var order_uom = obj.orderUom;
	var distributionUom = obj.distribution_uom;

	var articleNo = obj.articleNo;
	var autoStockR = (obj.autoStockR != null && obj.autoStockR != '') ? (Number(obj.autoStockR) != 'NaN'
			&& Number(obj.autoStockR) > 0 ? 'Y' : 'N')
			: 'N';
	var description = obj.description;
	var uom = obj.uom;
	var supplier = obj.supplierNo + '-' + obj.supplierName;
	var om = obj.om;
	var startDate = $('#start').val();
	var endDate = $('#end').val();
	var dispType = $('#adType').val();
	var dispText = $('#adType').find('option[value="' + dispType + '"]').text();
	var standardPrice = obj.standardPrice;
	var var_wgt = obj.var_wgt;
	// var promFrct= obj.promFrct;
	var id = articleNo.trim() + '_' + uom.trim();

	if ($('#row-' + id).length == 0) {
		$('#promoArticleList').append(
				getPromoItemAsHTML(articleNo, description, uom, id, supplier,
						om, startDate, endDate, dispType, dispText, autoStockR,
						standardPrice, '', var_wgt, source_of_supp_ind,
						art_mas_uom, pi_uom, order_uom, distributionUom));
		$("#row-" + id).find("#dispType").val(dispType);
		bindSaveAndDelete(id);
		checkOrUncheckAll();
		showPromoList();
		shrunkTable();
	} else {
		console.log('Article already exist:' + articleNo);

		console.log('overwrite date :' + articleNo);
		if (startDate != '') {
			$("#startDateEdit-" + id).find('input').val(startDate);
			$("#startDate-" + id).text(startDate);
		}

		if (endDate != '') {
			$("#endDateEdit-" + id).find('input').val(endDate);
			$("#endDate-" + id).text(endDate);
		}

		if (dispType != '') {
			$("#advDisplayEdit-" + id).find('input').val(dispType);
			$("#advDisplay-" + id).text(dispText);
		}

	}

}*/

function getPromoItemAsHTML(user,articleNo, description, uom, id, supplier, om,
		startDate, endDate, dispType, dispText, autoStockR, standardPrice,
		promFrct, var_wgt, source_of_supp_ind, art_mas_uom, pi_uom, order_uom,
		distributionUom,department,freshFoodFlag) {
	autoStockR="Y";
	var header = '<tr class="hideBlock drillsOpenDefault collapsed rowHighlight defaultExpanded headRow row row-'
			+ id
			+ '"><td colspan="18"><strong>'
			+ articleNo
			+ ' '
			+ '-'
			+ ' '
			+ description + '</strong></td></tr>';
//	var header='';

	var checkbox = '<td data-addon-sh><input type="checkbox"  class="promolistcheckbox" checked/></td>';
	var delvryDte = '<td id="deliveryDate-'
			+ id
			+ '" class="centerValue columnDivider deliveryDate" data-addon ></td> <td data-bind="deliveryDate" id="deliveryDateEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable> <input type="#" maxlength="10"  class="textbox textboxDefaultText inputDate editDateCell " ';
	if (autoStockR == 'N') {
		delvryDte += ' readonly ="readonly" disabled="disabled" style="background: rgb(217, 217, 217);" ';
	} else {
		delvryDte += 'placeholder="dd/mm/yyyy" maxlength="10" ';
	}
	delvryDte += '  id="delivery-' + id + '" > </td>';
	var newelemt = '<td class="centerValue columnDivider base" data-addon data-bind="baseFrct" ></td>'
		+ '<td class="centerValue columnDivider prom" data-addon data-bind="promFrct" ></td>'
		+ '<td class="centerValue columnDivider om" data-addon data-bind="om" ></td><td id="demand-'
		+ id
		+ '" class="centerValue demand" data-addon></td><td class="hideBlock" data-bind="oldDemandQty"></td> <td data-bind="demandQty" id="demandEdit-'
		+ id
		+ '" class="centerValue hideBlock" data-addon-editable> <input type="#" value=""  maxlength="5" class="editNumCell demandEdit textbox textboxDefaultText" '; // demandEdit class added for increasing demand field length due to increased demand limit variation
	if (autoStockR == 'N') {
		newelemt += ' readonly ="readonly" disabled="disabled" style="background: rgb(217, 217, 217);" ';
	}
	newelemt += '> </td> <td id="display-'
			+ id
			+ '" class="centerValue display"  data-addon></td> <td id="displayEdit-'
			+ id
			+ '" class="centerValue hideBlock" data-addon-editable data-bind="displayQty"> <input type="#" value="" maxlength="4" class="editNumCell textbox textboxDefaultText" ';
	if (autoStockR == 'N') {
		newelemt += ' readonly ="readonly" disabled="disabled" style="background: rgb(217, 217, 217);" ';
	}
	newelemt += '> </td> <td id="build-'
			+ id
			+ '" class="centerValue columnDivider build" data-addon></td> <td data-bind="buildQty" id="buildEdit-'
			+ id
			+ '" class="centerValue columnDivider hideBlock" data-addon-editable> <input type="#" maxlength="4" value="" class="editNumCell textbox textboxDefaultText" ';
	if (autoStockR == 'N') {
		newelemt += ' readonly ="readonly" disabled="disabled" style="background: rgb(217, 217, 217);" ';
	}
	newelemt += '> </td>';
	standardPrice != undefined ? standardPrice : '';
	promFrct != undefined ? promFrct : '';
	var_wgt != undefined ? var_wgt : '';
	/*
	 * var diptype = ''; if (isBigw == 'true') diptype = '<td id="advDisplay-' +
	 * id + '" class="centerValue columnDivider advDisplay">' + dispText + '</td>
	 * <td data-bind="displayType" id="advDisplayEdit-' + id + '"
	 * class="centerValue columnDivider hideBlock"><select class="combobox
	 * editSelectCell" style="width: 78px;" id="dispType" style="white-space:
	 * nowrap;">' + adType + '</select></td>';
	 */
	var row = header
			+ '<tr id="row-'
			+ id
			+ '" data-tt-id="'
			+ id
			+ '" class="row drillsOpenDefault collapsed" data-om="'
			+ om
			+ '" data-supplier="'
			+ supplier
			+ '" data-autoStockR="'
			+ autoStockR
			+ '" data-standardPrice="'
			+ standardPrice
			+ '"  data-promFrct="'
			+ promFrct
			+ '" data-var_wgt="'
			+ var_wgt
			+ '" data-source_of_supp_ind="'
			+ source_of_supp_ind
			+ '" data-art_mas_uom="'
			+ art_mas_uom
			+ '" data-pi_uom="'
			+ pi_uom
			+ '" data-order_uom="'
			+ order_uom
			+ '" data-distributionUom="'
			+ distributionUom
			+ '"'
			+ '" addedBy="'
			+ user
			+ '" '
			+' data-freshFoodFlag="'
			+freshFoodFlag
			+'"'
			+' data-department="'
			+department
			+'"'
			+'  >'
			+ checkbox
			+ ' <td data-addon><span class="indenter" style="padding-left: 0px;"><a title="Expand">&nbsp;</a></span>&nbsp;</td> <td class="articleNo headH " data-bind="articleNo" >'
			+ articleNo
			+ '</td> <td class="description headH " style="white-space: nowrap;" data-bind="desc">'
			+ description
			+ '</td> <td class="centerValue columnDivider uom  " data-bind="articleUom">'
			+ uom
			+ '</td>'
			+ '<td id="startDate-'
			+ id
			+ '" class="centerValue startDate">'
			+ startDate
			+ '</td> <td data-bind="promoStartDate" id="startDateEdit-'
			+ id
			+ '" class="centerValue hideBlock"><input type="#" maxlength="10" class="textbox textboxDefaultText inputDate editDateCell " placeholder="dd/mm/yyyy" maxlength="10"  id="start-'
			+ id
			+ '" value="'
			+ startDate
			+ '"></td> <td id="endDate-'
			+ id
			+ '" class="centerValue endDate">'
			+ endDate
			+ '</td> '

			+ '<td data-bind="promoEndDate" id="endDateEdit-'
			+ id
			+ '" class="centerValue columnDivider hideBlock"><input maxlength="10" type="#" class="textbox textboxDefaultText inputDate editDateCell " placeholder="dd/mm/yyyy" maxlength="10"  id="end-'
			+ id
			+ '" value="'
			+ endDate
			+ '" ></td> '
			+ newelemt
			+ delvryDte
			// + diptype
			+ ' <td class="centerValue columnDivider status">Draft</td> <td class="lastColumn center-align"><label class="linkBtn editRowBtn" id="editRecord-'
			+ id
			+ '"> <label class="editRecord" id="editRecordBtn-'
			+ id
			+ '">Edit</label> </label> <label class="linkBtn saveRowBtn hideBlock" id="saveRecord-'
			+ id
			+ '"> <label class="saveRecord" id="saveRecordBtn-'
			+ id
			+ '">Save</label> </label> <label class="linkBtn" id="DeleteRecord-'
			+ id + '"> <label class="deleteRecord" id="deleteRecordBtn-' + id
			+ '">Delete</label> </label></td> </tr>';
	var expand = '<tr data-tt-id="2" data-tt-parent-id="'
			+ id
			+ '" class="row expandsubrow collapsed row-'
			+ id
			+ '" style="display: none;" d> <td colspan="15"><span class="indenter" style="padding-left: 19px;"></span> <table cellspacing="0" class="ContentTable" width="100%"> <tbody> <tr> <td class="keyInfo" width="10%"> Supplier: </td> <td class="valueInfo lastColumn" colspan="5"> '
			+ supplier
			+ ' </td> </tr> <tr class="lastRow"> <td colspan="6" class="lastColumn"> <label class="history">Sales History</label> <label class="notes tooltip" title="Sample text for notes" id="notes-'
			+ id
			+ '">Notes</label> <label class="notes hideBlock" id="notesEdit-'
			+ id
			+ '"><input type="textbox" class="textbox articleSearchText" placeholder="Enter notes" /></label> </td> </tr> </tbody> </table> </td> </tr>';
	row += expand;

	return row;
}
function bindSaveAndDelete(id) {
	// bind event for sales history click
	$('tr[data-tt-parent-id="' + id + '"]').find('.history').unbind('click');
	$('tr[data-tt-parent-id="' + id + '"]').find('.history').click(
			function() {
				getPromoAddtionalDtls(id.split('_')[0], $(
						("#startDateEdit-").concat(id)).find('input').val(), id
						.split('_')[1], $(this));
			});

	// bind datepick event
	Date.format = 'dd/mm/yy';
	$(("#row-").concat(id)).find(".inputDateInput").datepicker({
		zIndex : 50
	});
	if(isBigw=='true'){
		var daysOut=$('#daysOut').val();
		$(("#row-").concat(id)).find(".inputDate").datepicker({
			zIndex : 50,
			minDate: getDesiredDateBigW(0,daysOut)
		});
		}
		else{
			$(("#row-").concat(id)).find(".inputDate").datepicker({
				zIndex : 50
			});	
		}


	/* when edit button is clicked displays input box in editable cells */
	$(("#editRecordBtn-").concat(id)).click(function() {

	//	$(("#row-").concat(id)).addClass('rowHighlight');

		// $(("#UOMEdit-").concat(id)).removeClass('hideBlock');
		// $(("#UOM-").concat(id)).addClass('hideBlock');

		$(("#startDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#startDate-").concat(id)).addClass('hideBlock');

		$(("#endDateEdit-").concat(id)).removeClass('hideBlock');
		$(("#endDate-").concat(id)).addClass('hideBlock');

		$(("#advDisplayEdit-").concat(id)).removeClass('hideBlock');
		$(("#advDisplay-").concat(id)).addClass('hideBlock');

		$(("#notesEdit-").concat(id)).removeClass('hideBlock');
		$(("#notes-").concat(id)).addClass('hideBlock');

		$(("#saveRecord-").concat(id)).removeClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');

		if ($("#deliveryDateEdit-" + id).hasClass('expanded')) {

			$(("#deliveryDateEdit-").concat(id)).removeClass('hideBlock');
			$(("#deliveryDate-").concat(id)).addClass('hideBlock');

			$(("#demandEdit-").concat(id)).removeClass('hideBlock');
			$(("#demand-").concat(id)).addClass('hideBlock');

			$(("#displayEdit-").concat(id)).removeClass('hideBlock');
			$(("#display-").concat(id)).addClass('hideBlock');

			$(("#buildEdit-").concat(id)).removeClass('hideBlock');
			$(("#build-").concat(id)).addClass('hideBlock');
		}
		// ###to uncomment code
		$(("#saveRecord-").concat(id)).addClass('hideBlock');
		$(("#editRecord-").concat(id)).addClass('hideBlock');
		// ###end

	});

	// added records should be editable as default
	$(("#editRecordBtn-").concat(id)).trigger('click');

	/* when save button is clicked displays input box is disabled */
	$(("#saveRecordBtn-").concat(id)).click(
			function() {

				$(("#row-").concat(id)).find('input,select').parent().each(
						function() {
							try {
								var labelid = $(this).attr('id').split('-')[0]
										.replace('Edit', '');
								$(("#" + labelid + '-').concat(id)).text(
										$(this).find('input').val());
							} catch (err) {

							}
						});

	//			$(("#row-").concat(id)).removeClass('rowHighlight');

				// $(("#UOMEdit-").concat(id)).addClass('hideBlock');
				// $(("#UOM-").concat(id)).removeClass('hideBlock');

				$(("#startDateEdit-").concat(id)).addClass('hideBlock');
				$(("#startDate-").concat(id)).removeClass('hideBlock');

				$(("#endDateEdit-").concat(id)).addClass('hideBlock');
				$(("#endDate-").concat(id)).removeClass('hideBlock');

				$(("#advDisplayEdit-").concat(id)).addClass('hideBlock');
				$(("#advDisplay-").concat(id)).removeClass('hideBlock');

				$(("#notesEdit-").concat(id)).addClass('hideBlock');
				$(("#notes-").concat(id)).removeClass('hideBlock');
				$(("#notes-").concat(id)).text(
						$(("#notesEdit-").concat(id)).find('input').val());

				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).removeClass('hideBlock');

				if ($("#deliveryDateEdit-" + id).hasClass('expanded')) {

					$(("#deliveryDate-").concat(id)).removeClass('hideBlock');
					$(("#deliveryDateEdit-").concat(id)).addClass('hideBlock');

					$(("#demand-").concat(id)).removeClass('hideBlock');
					$(("#demandEdit-").concat(id)).addClass('hideBlock');

					$(("#display-").concat(id)).removeClass('hideBlock');
					$(("#displayEdit-").concat(id)).addClass('hideBlock');

					$(("#build-").concat(id)).removeClass('hideBlock');
					$(("#buildEdit-").concat(id)).addClass('hideBlock');
				}
				// ###to uncomment code
				$(("#saveRecord-").concat(id)).addClass('hideBlock');
				$(("#editRecord-").concat(id)).addClass('hideBlock');
				// ###end

			});

	// for expand event
	$("tr[data-tt-id='" + id + "']").find('a[title="Expand"]').click(
			function() {
				$("tr[data-tt-parent-id='" + id + "']").toggle();

				if ($(this).parent().parent().hasClass('expanded')) {
					$(this).parent().parent().removeClass('expanded');
					$(this).parent().parent().addClass('collapsed');
				} else {
					$(this).parent().parent().removeClass('collapsed');
					$(this).parent().parent().addClass('expanded');
				}

			});

	// for delete event
	$("#deleteRecordBtn-" + id).click(function() {
		confirmation(confirmmsg, id);
	});
	$(".promolistcheckbox").unbind('click');
	$(".promolistcheckbox").click(
			function() {
				var size = $(".promolistcheckbox:checked").length;
				checkOrUncheckAll();
				if (size == $(".promolistcheckbox").length) {
					$("#promolistcheckboxall").prop('checked', true);
					if($('#listOption').val()=='allDrafts')
					{
						$('.userCheckBox').prop('checked',true);
					}
				} else {
					$("#promolistcheckboxall").prop('checked', false);
				}
				console.log('in here ');
				var $headerRow = $(this).closest('tr','.groupHeader').prev(':visible');
				if($headerRow.length == 0)
					$headerRow =  $(this).closest('tr').prevUntil('.groupHeader').last().prev();
				var $rowsBetween = $headerRow.nextUntil('.groupHeader');
				var rowLength = $rowsBetween.length/3;
				var checkedLength = $rowsBetween.find('.promolistcheckbox:checked').length;
				if($('#listOption').val()=='allDrafts')
				{
				if($(this).is(':checked'))
					{
					if(rowLength == checkedLength)
					$headerRow.find('.userCheckBox').prop('checked',true);
					}
				else
					{
					$headerRow.find('.userCheckBox').prop('checked',false);
					}
				}

	});

	$(("#row-").concat(id)).find('input,select').change(function() {
		$(("#row-").concat(id)).find('.status').text('Draft');
		$("#PublishButton").addClass('disabled');
		$("#validateButton").removeClass('disabled');
		
		$(("#row-").concat(id)).find('input,select').parent().each(
				function() {
					try {
						var labelid = $(this).attr('id').split('-')[0]
								.replace('Edit', '');
						$(("#" + labelid + '-').concat(id)).text(
								$(this).find('input').val());
					} catch (err) {

					}
		});
	});

	$(".combobox").combobox();

	$("#row-" + id).find(".editNumCell").numbersonly();

	// change start date on delivery date chage && build enable and disable
	$("#deliveryDateEdit-" + id)
			.find('input')
			.change(
					function() {

						if (isValidDate($(this).val())) {
							// $("#startDateEdit-" + id).find('input').val(
							// $(this).val());

							// build is readonly if Today's Date is up to
							// 48hours prior to Delivery Date
							if (Number(diff(getCurentDateTxt(), $(this).val())) <= 2) {
								// $(("#build-").concat(id)).text('');
								/*
								 * $(("#buildEdit-").concat(id)).find('input')
								 * .val('');
								 */
								$(("#buildEdit-").concat(id))
										.find('input')
										.attr('readonly', 'readonly')
										.attr('style',
												'background: rgb(217, 217, 217);');
								$(("#buildEdit-").concat(id))
										.find('input')
										.addmsg(
												'Field is readonly if today\'s date is up to 48hours prior to Delivery Date');
							} else {
								$(("#buildEdit-").concat(id)).find('input')
										.removeAttr('readonly').removeAttr(
												'style');
								$(("#buildEdit-").concat(id)).find('input')
										.removemsg();
							}
						}
						setTimeout(
								function() {
									var flag = validateStartAndEndDate($('#row-'
											+ id));
									if (!isShrunked && flag) {
										validateStartAndDlvry($('#row-' + id));
									}
								}, 100);

					});

	//
	$("#startDateEdit-" + id).find('input').change(function() {
		setTimeout(function() {
			var flag = validateStartAndEndDate($('#row-' + id));
			$("#deliveryDateEdit-" + id).find('input').val('');
			// if(!isShrunked && flag){
			// validateStartAndDlvry($('#row-'+id));
			// }
		}, 100);

	});

	$("#endDateEdit-" + id).find('input').change(function() {
		setTimeout(function() {
			validateStartAndEndDate($('#row-' + id));
		}, 100);
	});

	// var obj=$('#row-'+id);
	// var om=obj.find('td[data-bind="om"]').text();
	//	
	// $('#row-'+id).find('td[data-bind="buildQty"]').find('input').blur(function(){
	// if(obj.find('td[data-bind="buildQty"] input')!=undefined &&
	// obj.find('td[data-bind="buildQty"] input').val().trim()==''){
	// var
	// msg=validateBuildQty(Number(obj.find('td[data-bind="buildQty"]
	// input').val()),Number(obj.find('td[data-bind="baseFrct"]').text()),om);
	// if(msg!='')
	// {
	// obj.find('td[data-bind="buildQty"] input').error(msg);
	// }
	// }
	// });
	//	
	// $('#row-'+id).find('td[data-bind="displayQty"]').find('input').blur(function(){
	//		
	// console.log('changed');
	// if(obj.find('td[data-bind="displayQty"] input')!=undefined &&
	// obj.find('td[data-bind="buildQty"] input').val().trim()==''){
	// var
	// msg=validateDisplayQty(Number(obj.find('td[data-bind="displayQty"]
	// input').val()),om);
	// if(msg!='') {
	//		 
	// obj.find('td[data-bind="displayQty"] input').error(msg);
	// }
	// }
	// });
	//	
	// $('#row-'+id).find('td[data-bind="demandQty"]').find('input').blur(function(){
	// if(obj.find('td[data-bind="demandQty"] input')!=undefined &&
	// obj.find('td[data-bind="demandQty"] input').val().trim()==''){
	// var
	// msg=validateDemandQty(Number(obj.find('td[data-bind="demandQty"]
	// input').val()),Number(obj.find('td[data-bind="baseFrct"]').text()),Number(obj.attr('data-wtd')),om);
	// if(msg!='')
	// {
	// obj.find('td[data-bind="demandQty"] input').error(msg);
	// }
	// }
	// });

	// ##### have to uncomment
	$(("#saveRecord-").concat(id)).addClass('hideBlock');
	$(("#editRecord-").concat(id)).addClass('hideBlock');
	// ####

}

function showPromoList() {
	if ($('#promoArticleList').find('tr').length > 3) {
		$("#promoList").removeClass("hideBlock");
		$("#beforePublish").removeClass("hideBlock");
	} else {
		hidePromoList();
	}
}

function hidePromoList() {
	if ($('#promoArticleList').find('tr').length <= 3) {
		$("#promoList").removeClass("hideBlock").addClass("hideBlock");
		$("#beforePublish").removeClass("hideBlock").addClass("hideBlock");
		isShrunked = true;
		$("#afterPublishDiv").removeClass("hideBlock").addClass("hideBlock");
		$("#tableAddAction").removeClass("hideBlock");
		$("#addActionBtn").removeClass("hideBlock");
		
		$('#instructionalText2').removeClass('hideBlock')
		.addClass('hideBlock');
		$('#instructionalText1').removeClass('hideBlock');
		
	}else{
		
	}
	var checkboxLength = $(".promolistcheckbox:checked").length;
	var size = ('0' + checkboxLength).slice(-2) ;
	if (size == 0) {
		$('#beforePublish').find('.thumbUp').text('Proceed to Create');
		
	} else {
		$('#beforePublish').find('.thumbUp').text(
				'Proceed to Create(' + size + ')');
	}
}

function hidePromoListOnDelete() {

	var size = $(".promolistcheckbox:checked").length;
	if (size == 0 && $('#promoArticleList').find('tr:visible').length < 1) {
		$('#backBtn').trigger('click');
	//	$('#submitQuery')[0].reset();	// commenting as per comments from Millie
	} else {
		
		hidePromoList();
	}
	
	if($('#promoArticleList').find('tr').length < 1){
		$('#listOption').prop('disabled',false);
	}
	checkOrUncheckAll();
}

function shrunkTable() {

	$("#promoArticleList tr").each(
			function() {
				try {
					var id = $(this).attr('id').split('-')[1];
					$(this).find(("#build-").concat(id)).text('');
					$(this).find(("#buildEdit-").concat(id)).find('input').val(
							'').removeAttr('disabled').removeAttr('readonly')
							.removeAttr('style');
					$(this).find(("#demand-").concat(id)).text('');
					$(this).find(("#demandEdit-").concat(id)).find('input')
							.val('');
					$(this).find(("#display-").concat(id)).text('');
					$(this).find(("#displayEdit-").concat(id)).find('input')
							.val('');
					$(this).find(("#deliveryDate-").concat(id)).text('');
					$(this).find(("#deliveryDateEdit-").concat(id)).find(
							'input').val('').removeAttr('disabled').removeAttr(
							'readonly').removeAttr('style');
					;
				} catch (err) {
					console.log('-');
				}
			});
	$('#listOption').removeAttr('disabled');
	$('td[data-addon-sh]').removeClass('hideBlock');
	$('th[data-addon-sh]').removeClass('hideBlock');
	$('td[data-addon]').removeClass('hideBlock').addClass('hideBlock');
	$('td[data-addon]').removeClass('expanded').addClass('shrunked');
	$('td[data-addon-editable]').removeClass('expanded').addClass('shrunked');
	$('th[data-addon]').removeClass('hideBlock').addClass('hideBlock');
	$('.expandsubrow').hide();
	$('th[data-changeColspan]').attr('colspan', '2');
	isShrunked = true;
	$('#filterClear').trigger('click');

	// added for re enable start and end date field
	$('.startDate,.endDate').addClass('hideBlock');
	$('[data-bind="promoStartDate"],[data-bind="promoEndDate"]').removeClass(
			'hideBlock');

	// added for header on expand
	$('.headRow').addClass('hideBlock');
	$('.headH').removeClass('hideBlock');
	if($('#listOption').val()=='allDrafts'){
		$('.groupHeader').removeClass('hideBlock');
	}
	
	
	// end
}

function expandTable(dataObj) {
	$('#listOption').prop('disabled','disabled');
	$('td[data-addon-sh]').removeClass('hideBlock').addClass('hideBlock');
	$('th[data-addon-sh]').removeClass('hideBlock').addClass('hideBlock');
	$('td[data-addon]').removeClass('hideBlock');
	$('td[data-addon]').removeClass('shrunked').addClass('expanded');
	$('td[data-addon-editable]').removeClass('shrunked').addClass('expanded');
	$('th[data-addon]').removeClass('hideBlock');
	// $('th[data-changeColspan]').attr('colspan', '');
	// added for header on expand
	$('.headRow').addClass('hideBlock');
	$('.headH').addClass('hideBlock');
	$('.groupHeader').addClass('hideBlock');
	
	// end
	$('#filterClear').trigger('click');

	$('tr[data-om]').addClass('hideBlock');

	for ( var i = 0; i < dataObj.inStorePromoArticleInfoList.length; i++) {

		var item = dataObj.inStorePromoArticleInfoList[i];

		item.om = (item.om != null && item.om != '0' && item.om != '') ? item.om
				: "1";
		item.baseFrct = (item.baseFrct != null && item.baseFrct != '0') ? ((Number(item.baseFrct) / Number(item.om)) != 'NaN' ? (Number(item.baseFrct) / Number(item.om))
				.toFixed(0)
				: "0")
				: "0";
		item.promFrct = (item.promFrct != null && item.promFrct != '0') ? ((Number(item.promFrct) / Number(item.om)) != 'NaN' ? (Number(item.promFrct) / Number(item.om))
				.toFixed(0)
				: "")
				: "";
		item.promFrct = (item.promFrct != null && item.promFrct != '' && item.promFrct != '0') ? item.promFrct
				: (item.baseFrct != null && item.baseFrct != '') ? item.baseFrct
						: '0';

		item.wtdQty = (item.wtdQty != null && item.wtdQty != '0') ? ((Number(item.wtdQty) / Number(item.wtdQty)) != 'NaN' ? (Number(item.wtdQty) / Number(item.om))
				.toFixed(0)
				: "0")
				: "0";
		item.demandQty = (item.demandQty != null && item.demandQty != '0') ? ((item.demandQty / item.om) != 'NaN' ? (item.demandQty / item.om)
				.toFixed(0)
				: item.demandQty)
				: item.demandQty;

		if (item.demandQty == null || item.demandQty == '') {
			item.demandQty = (Number(item.promFrct) > Number(item.wtdQty)) ? item.promFrct
					: item.wtdQty;
			item.demandEditFlag = 'Y';
		} else {
			item.demandEditFlag = 'N';
		}

		var id = item.articleNo + '_' + item.articleUom;

		if ($('#row-' + id).find('.promolistcheckbox').is(':checked') == false)
			continue;

		$('#row-' + id).removeClass('hideBlock');
		$('.row-' + id).each(function() {
			if ($(this).hasClass('headRow')) {
				$(this).removeClass('hideBlock');
			}
		});

		var startDate = $('#row-' + id).find('.startDate').text().trim();

		var promDate = new Date(startDate.split('/')[2], Number(startDate
				.split('/')[1]) - 1, startDate.split('/')[0]);

		// $('#row-'+id).find('td[data-bind="deliveryDate"]
		// input').val($('#row-'+id).find('td[data-bind="promoStartDate"]
		// input').val());

		var autostockRFlag = true;
		if (null != item.baseFrct && item.baseFrct != ''
				&& item.baseFrct != undefined) {
			$('#row-' + id).find('td[data-bind="baseFrct"]')
					.text(item.baseFrct);
		} else {
			$('#row-' + id).find('td[data-bind="baseFrct"]').text('0');
		}

		if (null != item.promFrct && item.promFrct != ''
				&& item.promFrct != undefined) {
			$('#row-' + id).find('td[data-bind="promFrct"]')
					.text(item.promFrct);
		} else {
			$('#row-' + id).find('td[data-bind="promFrct"]').text('0');
		}

		if (null != item.om && "" != item.om && item.om != undefined) {
			$('#row-' + id).attr('data-om', item.om);
			$('#row-' + id).find('td[data-bind="om"]').text(item.om);
		} else {
			$('#row-' + id).attr('data-om', '1');
			$('#row-' + id).find('td[data-bind="om"]').text(item.om);
		}
		if (currentDatePlus2 > promDate) {
			$(("#build-").concat(id)).text('');
			$(("#buildEdit-").concat(id)).find('input').val('');
			$(("#buildEdit-").concat(id)).find('input').attr('readonly',
					'readonly')
					.attr('style', 'background: rgb(217, 217, 217);').attr(
							'disabled', 'disabled');
			/*
			 * $(("#buildEdit-").concat(id)) .find('input') .addmsg( '');
			 */

			$(("#deliveryDate-").concat(id)).text('');
			$(("#deliveryDateEdit-").concat(id)).find('input').val('');
			$(("#deliveryDateEdit-").concat(id)).find('input').attr('readonly',
					'readonly')
					.attr('style', 'background: rgb(217, 217, 217);').attr(
							'disabled', 'disabled');
			/*
			 * $(("#deliveryDateEdit-").concat(id)) .find('input') .addmsg( '');
			 */
		}

		if ($('#row-' + id).attr('data-autoStockR') == 'N') {
			autostockRFlag = false;
		}
		if (autostockRFlag) {
			if (null != item.deliveryDate && item.deliveryDate.trim() != ''
					&& item.deliveryDate.trim() != undefined) {
				$('#deliveryDate-' + id).text(item.deliveryDate);
				$('#deliveryDateEdit-' + id).find('input').val(
						item.deliveryDate);

				if (isValidDate($('#deliveryDateEdit-' + id).find('input')
						.val())) {
					// build is readonly if Today's Date is up to 48hours prior
					// to
					// Delivery Date
					if (Number(diff(getCurentDateTxt(), $(
							'#deliveryDateEdit-' + id).find('input').val())) <= 2) {
						$(("#build-").concat(id)).text('');
						$(("#buildEdit-").concat(id)).find('input').val('');
						$(("#deliveryDateEdit-").concat(id)).find('input').val(
								'');
						$(("#buildEdit-").concat(id)).find('input').attr(
								'readonly', 'readonly').attr('style',
								'background: rgb(217, 217, 217);');
						$(("#buildEdit-").concat(id))
								.find('input')
								.addmsg(
										'Field is readonly if Today\'s Date is up to 48hours prior to Delivery Date');
						$(("#deliveryDateEdit-").concat(id)).find('input')
								.attr('readonly', 'readonly').attr('style',
										'background: rgb(217, 217, 217);').attr(
												'disabled', 'disabled');// for defect 14836
					} else {
						$(("#buildEdit-").concat(id)).find('input').removeAttr(
								'readonly').removeAttr('style');
						$(("#buildEdit-").concat(id)).find('input').removemsg();
					}
				}
			}

			if (null != item.wtdQty && item.wtdQty != ''
					&& item.wtdQty != undefined) {
				$('#row-' + id).attr('data-wtd', item.wtdQty);
			} else {
				$('#row-' + id).attr('data-wtd', '0');
			}

			/*
			 * if (null != item.baseFrct && item.baseFrct != '' && item.baseFrct !=
			 * undefined) { $('#row-' +
			 * id).find('td[data-bind="baseFrct"]').text( item.baseFrct); } else {
			 * $('#row-' + id).find('td[data-bind="baseFrct"]').text('0'); }
			 * 
			 * if (null != item.promFrct && item.promFrct != '' && item.promFrct !=
			 * undefined) { $('#row-' +
			 * id).find('td[data-bind="promFrct"]').text( item.promFrct); } else {
			 * $('#row-' + id).find('td[data-bind="promFrct"]').text('0'); }
			 * 
			 * if (null != item.om && "" != item.om && item.om != undefined) {
			 * $('#row-' + id).attr('data-om', item.om); } else { $('#row-' +
			 * id).attr('data-om', '1'); }
			 */
			$('#demand-' + id).attr('data-old-demand', item.demandQty).text(
					item.demandQty);
			$('#demandEdit-' + id).find('input').attr('data-old-demand',
					item.demandQty).val(item.demandQty);
			$('#row-' + id).find('td[data-bind="oldDemandQty"]').text(item.demandQty);
			$('#demand-' + id).attr('data-demandEditFlag', item.demandEditFlag);
			$('#demandEdit-' + id).find('input').attr('data-demandEditFlag',
					item.demandEditFlag);

			/*
			 * if (parseInt($('#row-' + id).attr('data-wtd')) < parseInt($(
			 * '#row-' + id).find('td[data-bind="promFrct"]').text())) {
			 * $('#demand-' + id).text( parseInt($('#row-' + id).find(
			 * 'td[data-bind="promFrct"]').text())); $('#demandEdit-' +
			 * id).find('input').val( parseInt($('#row-' + id).find(
			 * 'td[data-bind="promFrct"]').text())); } else { $('#demand-' +
			 * id).text( parseInt($('#row-' + id).attr('data-wtd')));
			 * $('#demandEdit-' + id).find('input').val( parseInt($('#row-' +
			 * id).attr('data-wtd'))); }
			 */

		} else {
			$('#demandEdit-' + id).find('input').val('');
			$('#deliveryDateEdit-' + id).find('input').val('');
			$('#deliveryDateEdit-' + id).find('input').attr('style',
					'background: rgb(217, 217, 217);');
			$(("#buildEdit-").concat(id)).find('input').attr('style',
					'background: rgb(217, 217, 217);');
			if (null != item.baseFrct && item.baseFrct != ''
					&& item.baseFrct != undefined) {
				$('#row-' + id).find('td[data-bind="baseFrct"]').text(
						item.baseFrct);
			} else {
				$('#row-' + id).find('td[data-bind="baseFrct"]').text('0');
			}
		}

	}

	toFilerList = $('tr[data-om]:visible');
	$('.editRecord').trigger('click');
	$('td.collapsed').removeClass('collapsed').addClass('expanded');

	isShrunked = false;
	// setTimeout(function(){
	if ($('tr[data-om]:visible').length == 0) {
		$('#backBtn').trigger('click');
	}
	$('.startDate,.endDate ').removeClass('hideBlock');
	$('[data-bind="promoStartDate"],[data-bind="promoEndDate"]').addClass(
			'hideBlock');
	// },100);

}

function showAllErrors(content) {
	$('#errorWrapper').removeClass('hideBlock');
	$('#validateErrors').html(content);
}
function showWarning(content) {
	$('#warningWrapper').removeClass('hideBlock');
	$('#warningList').html(content);
}

function showTips() {
	$('.quickHelpWrapper').removeClass('hideBlock');
}
function hideTips() {
	$('.quickHelpWrapper').removeClass('hideBlock').addClass('hideBlock');
}

function validateDraft(rowList) {
	var flag = true;
	var allSavedFlag = true;

	// #####uncomment Below start
	// rowList.find('.promolistcheckbox:checked').each(function() {
	// var obj = $(this).parent().parent();
	// if(!obj.find('label.saveRowBtn').hasClass('hideBlock')){
	// allSavedFlag=false;
	// }
	// });
	// uncomment Below end

	if (allSavedFlag) {
		rowList
				.find('.promolistcheckbox:checked')
				.each(
						function() {
							var obj = $(this).parent().parent();
							var streq = obj.find(
									'td[data-bind="promoStartDate"] input')
									.required();
							var endreq = obj.find(
									'td[data-bind="promoEndDate"] input')
									.required();
							var streqvalid = obj.find(
									'td[data-bind="promoStartDate"] input')
									.isValidDate();
							var endreqvalid = obj.find(
									'td[data-bind="promoEndDate"] input')
									.isValidDate();
							var freshFoodFlag = obj.attr('data-freshFoodFlag');
							if (streq && endreq && streqvalid && endreqvalid) {
								if(freshFoodFlag == 'Y' && freshFoodDayLimit != null && freshFoodDayLimit != '')
				{
				flag = obj.find('td[data-bind="promoStartDate"] input').freshFoodDateValidation(obj.find('td[data-bind="promoEndDate"] input'));
				}
			else
			{
								if (!obj
										.find(
												'td[data-bind="promoStartDate"] input')
										.startEndValidation(
												obj
														.find('td[data-bind="promoEndDate"] input'))) {
									flag = false;
									obj.find('.editRecord').trigger('click');
								}
							} 
							}
							else {
								flag = false;
								obj.find('.editRecord').trigger('click');
							}
						});
	} else {
		flag = false;
		showError("Please save the changes before you proceed.");
	}

	return flag;
}

function validateStartAndEndDate(obj) {
	var flag = true;
	var streq = obj.find('td[data-bind="promoStartDate"] input').required();
	var endreq = obj.find('td[data-bind="promoEndDate"] input').required();
	var streqvalid;
	var endreqvalid;
	var freshFoodFlag = obj.attr('data-freshFoodFlag');
	if(streq && endreq)
		{
	streqvalid = obj.find('td[data-bind="promoStartDate"] input')
			.isValidDate();
	 endreqvalid = obj.find('td[data-bind="promoEndDate"] input')
			.isValidDate();
}
	if (streq && endreq && streqvalid && endreqvalid) {
		if(freshFoodFlag == 'Y' && freshFoodDayLimit != null && freshFoodDayLimit != '')
				{
				flag = obj.find('td[data-bind="promoStartDate"] input').freshFoodDateValidation(obj.find('td[data-bind="promoEndDate"] input'));
				}
			else
			{
		if (!obj.find('td[data-bind="promoStartDate"] input')
				.startEndValidation(
						obj.find('td[data-bind="promoEndDate"] input'))) {
			flag = false;
		}
	}
	} else {
		flag = false;
	}
	return flag;
}

function validateStartAndDlvry(obj) {
	var flag = true;
	if (obj.find('td[data-bind="deliveryDate"] input').val().trim() == '') {
		return flag;
	}
	var streq = obj.find('td[data-bind="deliveryDate"] input').required();
	var endreq = obj.find('td[data-bind="promoStartDate"] input').required();
	var streqvalid = obj.find('td[data-bind="deliveryDate"] input')
			.isValidDate();
	var endreqvalid = obj.find('td[data-bind="promoStartDate"] input')
			.isValidDate();
	if (streq && endreq && streqvalid && endreqvalid) {
		if (!obj.find('td[data-bind="deliveryDate"] input')
				.dlvryDateValidation(
						obj.find('td[data-bind="promoStartDate"] input'))) {
			flag = false;
		}
	} else {
		flag = false;
	}
	return flag;
}

function getPostDataObj4ArticleInfo(rowList) {
	var paramData = [];
	rowList
			.find('.promolistcheckbox:checked')
			.each(
					function() {
						var obj = $(this).parent().parent();
						if (obj
								.find('td[data-bind="promoStartDate"] input')
								.startEndValidation(
										obj
												.find('td[data-bind="promoEndDate"] input'))) {
							var itemData = getRowAsJSON(obj);
							paramData.push(itemData);
						}
					});
	return paramData;
}

function getPostDataObj4ArticleInfoStr(rowList, flag) {
	var paramData = '[';
	var i = 1;
	rowList
			.find('.promolistcheckbox:checked')
			.each(
					function() {
						var obj = $(this).parent().parent();
						if (obj
								.find('td[data-bind="promoStartDate"] input')
								.startEndValidation(
										obj
												.find('td[data-bind="promoEndDate"] input'))) {
							var itemData = getRowAsJSONStr(obj, flag);
							paramData += itemData;
						}
						i++;
						if (i != rowList.find('.promolistcheckbox:checked').length + 1) {
							paramData += ",";
						}
					});
	paramData += ']';
	console.log(paramData);
	return paramData;
}

function getRowAsJSON(obj) {
	obj.find('td[data-bind]').each(function() {
		var name = $(this).attr('data-bind');
		var value;
		if ($(this).find('input').length == 1) {
			value = $(this).find('input').val();
		} else {
			value = $(this).text();
		}
		$("body").data(name, value);
	});
	return $("body").data();
}

function getRowAsJSONStr(obj, flag) {
	var result = '{';
	var i = 1;
	obj
			.find('td[data-bind]')
			.each(
					function() {
						var name = $(this).attr('data-bind');
						var value = '';
						if (!$(this).hasClass('base')
								&& !$(this).hasClass('prom')) {
							if ($(this).find('input').length == 1) {
								value = ($(this).find('input').is(':disabled') || $(
										this).find('input').attr('readonly') == 'readonly') ? ''
										: ($(this).find('input').val() != '' && $(
												this).find('input').val() != '0') ? $(
												this).find('input').val()
												: '';
							} else {
								value = $(this).text();
							}
						}
						if ($(this).find('input.inputDate') != undefined
								&& $(this).find('input.inputDate').length == 1
								&& value != '' && value != undefined
								&& value.split('/').length == 3) {
							value = formateDate(value);
						}

						if (name == 'demandQty') {
							value = ($(this).find('input').val() != $(this)
									.find('input').attr('data-old-demand')) ? $(
									this).find('input').val()
									: '';
						}/*
						 * else{ value = $(this).find('input').val(); }
						 */

						result += '"' + name + '":"' + value + '"';
						if (name == 'demandQty') {
							if ($(this).find('input').val() != $(this).find(
									'input').attr('data-old-demand')) {
								name = 'demandEditFlag';
								value = 'Y';
								result += ',"' + name + '":"' + value + '"';
							}
						}
						i++;
						if (i != obj.find('td[data-bind]').length + 1) {
							result += ",";
						}
					});
	var id = obj.attr("id").split("-")[1];
	var notesval = $('#notesEdit-' + id).find('input').val();
	result += ',"notes":"' + notesval + '",';
	result += ' "standardPrice": "'
			+ (obj.attr('data-standardPrice') != undefined && obj.attr('data-standardPrice') != "undefined" ? obj
					.attr('data-standardPrice') : '') + '"';
	result += ', "var_wgt": "'
			+ (obj.attr('data-var_wgt') != undefined && obj.attr('data-var_wgt') != "undefined" ? obj.attr('data-var_wgt')
					: '') + '"';
	result += ', "autoStockRFlag": "Y"';
	result += ', "source_of_supp_ind": "'
			+ (obj.attr('data-source_of_supp_ind') != undefined && obj.attr('data-source_of_supp_ind') != "undefined" ? obj
					.attr('data-source_of_supp_ind') : '') + '"';
	result += ', "art_mas_uom": "'
			+ (obj.attr('data-art_mas_uom') != undefined && obj.attr('data-art_mas_uom') != "undefined" ? obj
					.attr('data-art_mas_uom') : '') + '"';
	result += ', "pi_uom": "'
			+ (obj.attr('data-pi_uom') != undefined && obj.attr('data-pi_uom') != "undefined" ? obj.attr('data-pi_uom')
					: '') + '"';
	result += ', "order_uom": "'
			+ (obj.attr('data-order_uom') != undefined && obj.attr('data-order_uom') != "undefined" ? obj
					.attr('data-order_uom') : '') + '"';
	result += ', "distributionUom": "'
			+ (obj.attr('data-distributionUom') != undefined && obj.attr('data-distributionUom') != "undefined" ? obj
					.attr('data-distributionUom') : '') + '"';

	if (flag) {
		result += ', "weekTodaySalesFlag": "Y"';
		result += ', "baseFrctFlag": "Y"';
	}
	/*
	 * if (!flag) { result += ', "omInfoFlag": "Y"'; //result += ',
	 * "baseFrctFlag": "Y"'; }
	 */
	/*
	 * result += ', "demandEditFlag": "' + (obj.attr('data-demandEditFlag') !=
	 * undefined ? obj .attr('data-demandEditFlag') : '') + '"';
	 */
	// result += ' "baseFrct": "' + (obj.attr('data-baseFrct')!=undefined ?
	// obj.attr('data-baseFrct') :'') + '"';
	/*
	 * result += ' ,"promFrct": "' + (obj.attr('data-promFrct') != undefined ?
	 * obj .attr('data-promFrct') : '') + '"';
	 */
	result += '}';
	console.log(result);
	return result;
}
var warningData = '';
function validatebeforeCreatePromotion(rowList, checkForWarnFlag) {
	var flag = true;
	clearAllErrors();

	rowList
			.each(function() {
				var obj = $(this);
				var streq = obj.find('td[data-bind="promoStartDate"] input')
						.required();
				var endreq = obj.find('td[data-bind="promoEndDate"] input')
						.required();
				var delreq = obj.find('td[data-bind="deliveryDate"] input')
						.val();
				var streqvalid = obj.find(
						'td[data-bind="promoStartDate"] input').isValidDate();
				var endreqvalid = obj
						.find('td[data-bind="promoEndDate"] input')
						.isValidDate();

				var streqvalidpast = obj.find(
						'td[data-bind="promoStartDate"] input')
						.noPastValidation();
				var endreqvalidpast = obj.find(
						'td[data-bind="promoEndDate"] input')
						.noPastValidation();

				// var displayreq=obj.find('td[data-bind="displayQty"]
				// input').required();
				// var demandreq=obj.find('td[data-bind="demandQty"]
				// input').required();
				// var buildreq=obj.find('td[data-bind="buildQty"]
				// input').required();

				var om = obj.find('td[data-bind="om"]').text();
				
				// Start of BigW Cahnge On Max Limit
				var bigwFlag=false;
				var bigwBuildMaxLimit=0;
				var bigwDisplayMaxLimit=0;
				var bigwBuildMaxPercentage=0;
				var bigwDisplayMaxPercentage=0;
				var bigwDemandMaxlimitPercentage=0;
				var storeDemand=Number(obj.find('td[data-bind="demandQty"] input').val());
				if(storeDemand==""||storeDemand==0){
					storeDemand=Number(obj.find('td[data-bind="demandQty"] input').attr('data-old-demand'));
				}
				var promForecast=Number(obj.find('td[data-bind="promFrct"]').text());
				var baseForecast=Number(obj.find('td[data-bind="baseFrct"]').text());
				// console.log("Store Demand :"+storeDemand+" Promo ForeCast :"+promForecast+" Base Forecast :"+baseForecast);
				if($('#salesOrg').val()=="1060"){
					bigwFlag=true;
					bigwBuildMaxLimit=$('#cmpBuildQuantity').val();
					bigwDisplayMaxLimit=$('#cmpDisplayQty').val();
					if(storeDemand!=null && storeDemand!=undefined && storeDemand!="" && storeDemand !=0){
						bigwBuildMaxPercentage=((Number($("#cmpBuildQuantityPer").val())*storeDemand*om)/100);
						bigwDisplayMaxPercentage=((Number($("#cmpDisplayQtyPer").val())*storeDemand*om)/100);
					}
					if(promForecast!=null && promForecast!=undefined && promForecast!="" && promForecast !=0){
						bigwDemandMaxlimitPercentage=(Number($("#cmpStoreDemand").val())+(promForecast*om));
					}else if(baseForecast!=null && baseForecast!=undefined && baseForecast!="" && baseForecast !=0){
						bigwDemandMaxlimitPercentage=(Number($("#cmpStoreDemand").val())+(baseForecast*om));
					}
				}
				
				
				if (Number(obj.find('td[data-bind="baseFrct"]').text()) > 0) {
					var msg = validateDemandQty(
							Number(obj.find('td[data-bind="demandQty"] input')
									.val()),
							Number(obj.find('td[data-bind="baseFrct"]').text()),
							Number(obj.attr('data-wtd')), om);
					if (msg != '') {
						flag = false;
						obj.find('td[data-bind="demandQty"] input').error(msg);
					}
				}
				

				if (obj.find('td[data-bind="buildQty"] input') != undefined
						&& obj.find('td[data-bind="buildQty"] input').val()
								.trim() != '') {
					var msg = validateBuildQty(
							Number(obj.find('td[data-bind="buildQty"] input')
									.val()),
							Number(obj.find('td[data-bind="baseFrct"]').text()),
							om,bigwFlag,bigwBuildMaxLimit,bigwBuildMaxPercentage);
					if (msg != '') {
						flag = false;
						obj.find('td[data-bind="buildQty"] input').error(msg);
					}
				}

				if (obj.find('td[data-bind="displayQty"] input') != undefined
						&& obj.find('td[data-bind="displayQty"] input').val()
								.trim() != '') {
					var msg = validateDisplayQty(Number(obj.find(
							'td[data-bind="displayQty"] input').val()), om,bigwFlag,bigwDisplayMaxLimit,bigwDisplayMaxPercentage);
					if (msg != '') {
						flag = false;
						obj.find('td[data-bind="displayQty"] input').error(msg);
					}
				}

				if (obj.find('td[data-bind="demandQty"] input') != undefined
						&& obj.find('td[data-bind="demandQty"] input').val()
								.trim() != '') {
					var msg = validateDemandQty(
							Number(obj.find('td[data-bind="demandQty"] input')
									.val()),
							Number(obj.find('td[data-bind="baseFrct"]').text()),
							Number(obj.attr('data-wtd')), om,bigwFlag ,bigwDemandMaxlimitPercentage);
					if (msg != '') {
						flag = false;
						obj.find('td[data-bind="demandQty"] input').error(msg);
					}
				}

				// if(!displayreq || !demandreq || !buildreq){
				// flag=false;
				// obj.find('.editRecord').trigger('click');
				// }

				if (obj.find('td[data-bind="deliveryDate"] input').val().trim() != '') {
					var deliveryDatereqvalid = obj.find(
							'td[data-bind="deliveryDate"] input').isValidDate();
					var deliveryDatereqvalidpast = obj.find(
							'td[data-bind="deliveryDate"] input')
							.noPastValidation();
					if (deliveryDatereqvalidpast && deliveryDatereqvalid) {
						if (!obj
								.find('td[data-bind="deliveryDate"] input')
								.dlvryDateValidation(
										obj
												.find('td[data-bind="promoStartDate"] input'))) {
							flag = false;
							// obj.find('.editRecord').trigger('click');
						}
					}else{
						flag = false;
					}
				}

				if (streq && endreq && streqvalid && endreqvalid
						&& streqvalidpast && endreqvalidpast) {
					if (!obj
							.find('td[data-bind="promoStartDate"] input')
							.startEndValidation(
									obj
											.find('td[data-bind="promoEndDate"] input'))) {
						flag = false;
						// obj.find('.editRecord').trigger('click');
					}

				} else {
					flag = false;
					// obj.find('.editRecord').trigger('click');
				}
				
				
			});
	if (flag) {
		// if (allSavedFlag) {
		data = getPostDataObj4ArticleInfoStr(rowList);
		warningData = data;
		var text = '';
		if (checkForWarnFlag) {
			text = checkForWarning($('#promoArticleList tr[data-om]:visible'));
		}
		if (text == '') {
			// validatebeforeCreatePromotion($('#promoArticleList
			// tr[data-om]:visible'));
			// data = getPostDataObj4ArticleInfoStr(rowList);
			callServiceForValidation(data);
		} else {
			showWarningMsg(text);
		}
		// }
		// data = getPostDataObj4ArticleInfoStr(rowList);
		// callServiceForValidation(data);
	} else {

		var error = '';
		rowList.each(function() {
			var article = $(this).find('[data-bind="articleNo"]').text() + '('
					+ $(this).find('[data-bind="articleUom"]').text() + ') ';
			/*if($(this).find('.errorField').length==0){
				$(this).find('.status').html(verified);
			}else{
				$(this).find('.status').html(failed);
			}*/
			$(this).find('.errorField').each(function() {
				error += getError(article, $(this).attr('title'));
			});

		});

		if (error != '') {
			showAllErrors(error);
		}

		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
	}
}

function callServiceForValidation(data) {

	var param = {
		"inStorePromoArticleInfoList" : $.parseJSON(data)
	};
	console.log(param);
	$
			.ajax({
				type : "post",
				url : "displayvalidate.htm",
				contentType : "application/json",
				data : JSON.stringify(param),
				/*data : {
					inStorePromoArticleInf : data
				},*/
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					var message = '';
					output = $.parseJSON(response);
					dataObj = output.data;
					if (dataObj == null) {
						message = "Service call failed.";
					} else {
						message = dataObj.msg;
					}
					if (message == 'success') {
						updateList(dataObj);
					} else if(message == 'logout'){
						gotoHomeScreenSessionExpired();
					}else {
						if (message == undefined || message == 'failed') {
							message = "Technical issue occured.Please contact java support.";
						}
						console.log(message);
						showError(message);
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					showError('Sorry, Some technical issue occured.');
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});

}

function updateList(dataObj) {

	var errors = '';
	var nullflag = false;
	if (null == dataObj) {
		nullflag = true;
		errors = 'Store Cental Service failed.';
	}

	for ( var i = 0; i < dataObj.inStorePromoArticleInfoList.length
			&& !nullflag; i++) {
		var itemerror = '';
		var item = dataObj.inStorePromoArticleInfoList[i];
		var id = item.articleNo + '_' + item.articleUom;
		var article = " " + item.articleNo + '(' + item.articleUom + ') ';

		console.log("==== deliveryDateValidateStatusFlag"
				+ item.deliveryDateValidateStatusFlag);
		if (item.deliveryDateValidateStatusFlag != null
				&& item.deliveryDateValidateStatusFlag != undefined
				&& item.deliveryDateValidateStatusFlag.trim() != ''
				&& item.deliveryDateValidateStatusFlag != 'Y') {
			itemerror += getError(article, item.deliveryDateValidateStatusFlag);
			$("#deliveryDateEdit-" + id).find('input').error(
					item.deliveryDateValidateStatusFlag);
		} else {
			$("#deliveryDateEdit-" + id).find('input').val(item.deliveryDate);
			$("#deliveryDate-" + id).text(item.deliveryDate);
		}
		console.log("====" + item.buildValidateStatusFlag);
		if (item.buildValidateStatusFlag != null
				&& item.buildValidateStatusFlag != undefined
				&& item.buildValidateStatusFlag.trim() != ''
				&& item.buildValidateStatusFlag != 'Y') {
			itemerror += getError(article, item.buildValidateStatusFlag);
			$("#buildEdit-" + id).find('input').error(
					item.buildValidateStatusFlag);
		}
		console.log("==== displayValidateStatusFlag"
				+ item.displayValidateStatusFlag);
		if (item.displayValidateStatusFlag != null
				&& item.displayValidateStatusFlag != undefined
				&& item.displayValidateStatusFlag.trim() != ''
				&& item.displayValidateStatusFlag != 'Y') {
			itemerror += getError(article, item.displayValidateStatusFlag);
			$("#displayEdit-" + id).find('input').error(
					item.displayValidateStatusFlag);
		}
		console.log("====demandValidateStatusFlag "
				+ item.demandValidateStatusFlag);
		if (item.demandValidateStatusFlag != null
				&& item.demandValidateStatusFlag != undefined
				&& item.demandValidateStatusFlag.trim() != ''
				&& item.demandValidateStatusFlag != 'Y') {
			itemerror += getError(article, item.demandValidateStatusFlag);
			$("#demandEdit-" + id).find('input').error(
					item.displayValidateStatusFlag);
		}

		if (itemerror == '') {
			$('#row-' + id).find('.status').html(verified);
		} else {
			$('#row-' + id).find('.status').html(failed);
			$('#row-'+id).find('.status').find('.failed').attr('title',itemerror);
			errors += itemerror;
			$('.startDate,.endDate ').removeClass('hideBlock');
			$('[data-bind="promoStartDate"],[data-bind="promoEndDate"]')
					.addClass('hideBlock');
			// $('#row-' + id).find('.editRecord').trigger('click');
		}

	}
	if (errors == '') {
		$('#PublishButton').removeClass('disabled');
		$("#validateButton").addClass('disabled');
	} else {
		showAllErrors(errors);
		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
	}
}

function callServiceForCreate() {
	
	$
			.ajax({
				type : "post",
				url : "displaycreate.htm",
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					var message = '';
					output = $.parseJSON(response);
					dataObj = output.data;
					if (dataObj == null) {
						message = "Service call failed.";
					} else {
						message = dataObj.msg;
					}
					if (message == 'success') {
						updateFailedList(dataObj);
					}else if(message == 'logout'){
						gotoHomeScreenSessionExpired();
					} else {
						if (message == undefined) {
							message = "Technical issue occured.Please contact java support.";
						}
						console.log(message);
						showError(message);
						stopLoading();
					}
					stopLoading();
				},
				error : function() {
					showError('Sorry, Some technical issue occured.');
					stopLoading();
					// stopLoading();// goToLogin();
				},
			});

}

function updateFailedList(dataObj) {

	var errors = '';
	if (dataObj.msg != null && dataObj.msg.trim() != ''
			&& dataObj.msg != undefined && dataObj.msg != 'success') {
		errors = dataObj.msg;
	} else {
		var toremoveList=[];
		for ( var i = 0; i < dataObj.inStorePromoArticleInfoList.length; i++) {
			var item = dataObj.inStorePromoArticleInfoList[i];
			var id = item.articleNo + '_' + item.articleUom;
			var article = item.articleNo + '(' + item.articleUom + ') ';
			
			if (item.promoCreateStatus == 'Y'
					&& item.promoCreationSAPStatus == 'Y'
					&& item.promoCreationRcStatus == 'Y') {
				item.user=$('#row-'+id).attr('addedBy');
				
				if($('[addedBy="'+item.user+'"]').length==1){
					$('[header="'+item.user+'"]').remove();
				}		
				
				$('#row-' + id).next().remove();
				$('#row-' + id).remove();
				$('.row-' + id).remove();				
				toremoveList.push(item);
			} else if (item.promoCreationSAPStatus == 'N') {
				$('#row-' + id).find('.status').html(failed);
				errors += getError(article,
						"Failed to create promotion, Due to technical issue occured in SAP system.");
			} else if (item.promoCreationRcStatus == 'N') {
				$('#row-' + id).find('.status').html(failed);
				errors += getError(
						article,
						"Failed to create promotion, Due to technical issue occured in replenishment system.");
			} else {
				$('#row-' + id).find('.status').html(failed);
				errors += getError(article, "Failed to create promotion.");
			}

		}
		removeFromDraft(toremoveList);
		if ($(".promolistcheckbox:checked").length == 0) {
			hidePromoListOnDelete();
			showInformation("Promotion(s) created successfully.");
			$('#instructionalText2').removeClass('hideBlock').addClass(
					'hideBlock');
			$('#listOption').removeAttr('disabled');
			if ($('#promoArticleList').find('tr').length < 1) {
				$('#listOption').val('myDrafts');
			}
		}
		checkOrUncheckAll();
	}

	if (errors == '') {
		$('#PublishButton').removeClass('disabled');
		$("#validateButton").addClass('disabled');
	} else {
		$('#validateButton').removeClass('disabled');
		$("#PublishButton").addClass('disabled');
		showAllErrors(errors);
		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
	}
}

function getError(article, msg) {
	return "<li>Article " + article + ":" + msg + "</li>";
}

function confirmation(msg, id) {
	$('.confirmation-yesbtn,.confirmation-nobtn').addClass("hideBlock");
	$("#dialog-confirmation").find('#ok').removeClass("hideBlock");
	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").find('#message').text(msg);
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text(
			'Confirmation');
	$("#dialog-confirmation").find('#ok').unbind('click');
	$("#dialog-confirmation").find('#ok').click(function() {
		var draftlist=[];
		var item=$.parseJSON(getRowAsJSONStr($("#row-" + id), true));
		item.user=$('#row-'+id).attr('addedBy');
		
		if($('[addedBy="'+item.user+'"]').length==1){
			$('[header="'+item.user+'"]').remove();
		}
		
		draftlist.push(item);
		removeFromDraft(draftlist);
		$("#row-" + id).remove();
		$(".row-" + id).remove();
		checkOrUncheckAll();
		if (isShrunked) {
			hidePromoList();
		} else {
			hidePromoListOnDelete();
		}
		if ($('#promoArticleList').find('tr').length <= 3) {
			$('#listOption').val('myDrafts');
		}

		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
		removeEmptyGroup();
	});
	$("#dialog-confirmation").find('#cancel').removeClass('hideBlock');
	$("#dialog-confirmation").find('#cancel').unbind('click');
	$("#dialog-confirmation").find('#cancel').click(function() {
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
	});
}

// Store demand for article <Article ID> - <Article Name> is greater than 99

function showWarningMsg(msg) {
	$('.confirmation-yesbtn,.confirmation-nobtn').removeClass("hideBlock");
	$("#dialog-confirmation").find('#ok').addClass("hideBlock");
	$("#dialog-confirmation").find('#cancel').addClass('hideBlock');

	$("#dialog-confirmation").parent().addClass("popupWrapper");
	$("#dialog-confirmation").find('#message').html(msg);
	$("#dialog-confirmation").dialog("open");
	$("#dialog-confirmation").parent().find('.ui-dialog-title').text('Warning');
	$("#dialog-confirmation").find('.confirmation-yesbtn').unbind('click');

	$("#dialog-confirmation").find('.confirmation-yesbtn').click(
			function() {
				// validatebeforeCreatePromotion($('#promoArticleList
				// tr[data-om]:visible'));
				if (warningData != '' && warningData != undefined) {
					callServiceForValidation(data);
				} else {
					validatebeforeCreatePromotion(
							$('#promoArticleList tr[data-om]:visible'), false);
				}
				$("#dialog-confirmation").parent().removeClass("popupWrapper");
				$("#dialog-confirmation").dialog("close");
			});

	$("#dialog-confirmation").find('.confirmation-nobtn').unbind('click');
	// $("#dialog-confirmation").parent().find('.closePopUp').unbind('click');

	$("#dialog-confirmation").find('.confirmation-nobtn').click(function() {
		warningData = '';
		$("#dialog-confirmation").dialog("close");
	});
	$("#dialog-confirmation").parent().find('.closePopUp').click(function() {
		warningData = '';
		// $("#dialog-confirmation").dialog("close");
	});
}
function showInformation(msg,anotherMsg,oneMoreMsg) {
	if(msg != '')
		{
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
		if((anotherMsg == undefined || anotherMsg == '') && (oneMoreMsg == undefined || oneMoreMsg == ''))
		{
		$("#dialog-confirmation").parent().removeClass("popupWrapper");
		$("#dialog-confirmation").dialog("close");
		$('.editRecord').trigger('click');
	}
		else if(anotherMsg != '' || oneMoreMsg !='')
			{
			if(anotherMsg != '')
			showInformation(anotherMsg,'',oneMoreMsg);
			if(oneMoreMsg != '')
				showInformation(oneMoreMsg,'','');	
			}
			
	});
		}
	else
		{
		if(anotherMsg != '')
		showInformation(anotherMsg,'');
		}

	// $("#dialog-confirmation").find('#cancel').addClass('hideBlock');
}

function getPromoAddtionalDtls(articleNo, date, uom, item) {
	id = 'history';
	flag = true;
	$
			.ajax({
				type : "get",
				url : "getPromoAddtionalDtls.htm",
				data : {
					"articleNo" : articleNo,
					"uom" : uom,
					"weekStartDate" : date
				},
				// dataType:"json",
				// async:false,
				beforeSend : function() {
					// startLoading();
					startLoading();
				},
				success : function(response) {
					addDtls = articleNo;
					var msg;
					var om = 1;
					try {
						om = $(item).closest('table').closest('tr').prev()
								.attr('data-om');
					} catch (err) {
						console.log(err);
					}
					om = (om != null && om != '' && om != undefined) ? Number(om)
							: 1;
					var promoSaleList = null;
					var output = $.parseJSON(response);
					var promoArticlelist = output.data;
					if (promoArticlelist != null
							&& promoArticlelist != undefined) {
						promoSaleList = promoArticlelist[0].promoSalesHistList;
						promoOfferList = promoArticlelist[0].promoOfferList;
						promoAllocation = promoArticlelist[0].promoAllocation;
					}
					$('.appended').remove();
					if (promoSaleList != null && promoSaleList != undefined
							&& promoSaleList != '' && promoSaleList.length > 0
							&& promoSaleList[0].msg != null
							&& promoSaleList[0].msg.trim() == '') {
						var list = promoSaleList;
						var content = '<table class="ContentTable" cellspacing="0"><tr class="">'
								+ '<th class="centerValue ">Display from</th>'
								+ '<th class="centerValue ">Display To</th>'
								+ '<th class="centerValue">Promo Price</th>'
								+ '<th class="centerValue ">Savings</th>'
								+ '<th class="centerValue ">Display Type</th>'
								+ '<th class="centerValue ">Display No</th>'
								+ '<th class="centerValue">Media</th>'
								+ '<th class="centerValue">Avg. Qty. Sold</th>'
								+ '<th class="centerValue">Store Info</th>'
								+ '</tr>';
						var i = 0;
						for ( var j = 0; j < list.length; j++) {

							list[j].qtySold = list[j].qtySold != null ? list[j].qtySold
									: "";
							list[j].qtySold = (list[j].qtySold != "" && list[j].qtySold != undefined) ? (Number(list[j].qtySold) / Number(om))
									.toFixed(0)
									: 0;
							list[j].fromDate = list[j].fromDate != null ? list[j].fromDate
									: "";
							list[j].toDate = list[j].toDate != null ? list[j].toDate
									: "";
							list[j].promoMedia = list[j].promoMedia != null ? list[j].promoMedia
									: "";
							list[j].promoPrice = list[j].promoPrice != null ? list[j].promoPrice
									: "";
							list[j].additionalInfo = list[j].additionalInfo != null ? list[j].additionalInfo
									: "";
							list[j].promoPrice = (list[j].promoPrice != null && list[j].promoPrice != undefined) ? Number(
									list[j].promoPrice).toFixed(2)
									: "";
							list[j].savings = (list[j].savings != null && list[j].savings != undefined) ? Number(
									list[j].savings).toFixed(2)
									: "";
							list[j].savings = (list[j].savings < 0) ? '0.00'
									: list[j].savings;
							list[j].promoTypeInd = list[j].promoTypeInd != null ? list[j].promoTypeInd
									: "";
							list[j].displayStartDate = list[j].displayStartDate != null ? list[j].displayStartDate
									: "";
							list[j].promoDisplayNo = list[j].promoDisplayNo != null ? list[j].promoDisplayNo
									: "";
							list[j].promoDisplay = list[j].promoDisplay != null ? list[j].promoDisplay
									: "";
							list[j].displayEndDate = list[j].displayEndDate != null ? list[j].displayEndDate
									: "";

							content += '<tr class="histParent  '
									+ list[j].promoTypeInd;
							if (i == 0)
								content = content + ' lastrow ';

							content += ' appended" id="row-' + i + '">'
									+ '<td class="centerValue start-date">'
									+ list[j].fromDate
									//+ '<span class="hideBlock">'
									//+ list[j].sdate + '</span>
									+'</td>'
									+ '<td class="centerValue end-date">'
									+ list[j].toDate + '</td>'
									+ '<td class="centerValue">';
							if (list[j].promoPrice != '')
								content += '$';
							content += list[j].promoPrice + '</td>'
									+ '<td class="numberColumn">';
							if (list[j].savings != '')
								content += '$';
							content += list[j].savings + '</td>'
									+ '<td class="centerValue">'
									+ list[j].promoDisplay + '</td>'
									+ '<td class="centerValue ">'
									+ list[j].promoDisplayNo + '</td>'
									+ '<td class="centerValue">'
									+ list[j].promoMedia + '</td>'
									+ '<td class="centerValue">'
									+ list[j].qtySold + '</td>'
									+ '<td class="centerValue">'
									+ list[j].additionalInfo + '</td></tr>'
							// + '<td id="feedback-' + i + '">';
							// if (list[j].feedback != null)
							// content = content + list[j].feedback;
							// else
							// content = content + '';
							// content += '</td>'
							// + '<td id="feedbackEdit-'
							// + i
							// + '" class="hideBlock"><textarea
							// id="feedbackValue-'
							// + i + '">';
							// if (list[j].feedback != null)
							// content = content + list[j].feedback;
							// else
							// content = content + '';
							// content += '</textarea></td>'
							// + '<td class="centerValue"><label class="linkBtn
							// editRowBtn" id="editRecord-'
							// + i
							// + '">'
							// + '<label
							// class="editRecord">Edit</label></label>'
							// + '<label class="linkBtn saveRowBtn hideBlock"
							// id="saveRecord-'
							// + i
							// + '">'
							// + '<label
							// class="saveRecord">Save</label></label></td><td
							// class="hideBlock article">'
							// + list[j].articleNo + '-'
							// + list[j].articleUom + '</td></tr>';
							i++;
						}
						content += '</table>';
						$(
								'#dialog-salesHistory .popupActionsWrapper .saleHistorySaveBtn,#dialog-salesHistory .ContentTableWrapper, #dialog-salesHistory .filtered-count')
								.show();
						$('#dialog-salesHistory .ContentTableWrapper').html('')
								.html(content);
						$('#dialog-salesHistory .errorAddtnlDtls').remove();
						// bindSalesHistory();
						$('.months').val(13);
						$('#dialog-salesHistory .saleTotalCount').text(i);
					} else {
						$('#dialog-salesHistory .errorAddtnlDtls').remove();
						$(
								'#dialog-salesHistory .popupActionsWrapper .saleHistorySaveBtn,#dialog-salesHistory .ContentTableWrapper, #dialog-salesHistory .filtered-count')
								.hide();
						$('#dialog-salesHistory .popupData')
								.append(
										'<h4 class="errorAddtnlDtls" style="padding-left:15px;margin-top:20px;color:red;background:url(../../images/iconError.png) 0 3px no-repeat">Sorry, No results found<h4>');
					}
					bindPopUpContent();
					stopLoading();

					$("#dialog-salesHistory").parent().addClass("popupWrapper");
					$("#dialog-salesHistory").dialog("open");
					try {
					/*	$('#dialog-salesHistory').closest('.popupWrapper')
								.css(
										'top',
										($(window).height() - $(
												'#dialog-salesHistory')
												.closest('.popupWrapper')
												.height()) / 2);*/
					} catch (err) {
						console.log(err);
					}

				},
				error : function() {
					// goToLogin();
					showError('Technical Issue Occured.');
				},
			});

}

function bindPopUpContent() {

}

function checkOrUncheckAll() {
	var checkboxLength = $(".promolistcheckbox:checked").length;
	var size = ('0' + checkboxLength).slice(-2) ;
	if (size == 0) {
		$('#beforePublish').find('.thumbUp').text('Proceed to Create');
		$('#beforePublishBtn').addClass('disabled');
	} else {
		$('#beforePublish').find('.thumbUp').text(
				'Proceed to Create(' + size + ')');
		$('#beforePublishBtn').removeClass('disabled');
	}
	if (size == $(".promolistcheckbox").length) {
		$("#promolistcheckboxall").prop('checked', true);
	} else {
		$("#promolistcheckboxall").prop('checked', false);
	}
}

function clearAllErrors() {
	$('#errorWrapper').addClass('hideBlock');
	$('#warningWrapper').addClass('hideBlock');
	$('#errorMsgDiv').addClass('hideBlock');
	$('.' + errorFieldClass).each(function() {
		$(this).removeAttr('title');
		$(this).removeClass(errorFieldClass);
	});

}

function callServiceForGetDeliveryDate(data) {

	var param = {
		"inStorePromoArticleInfoList" : $.parseJSON(data)
	};
	var id = data.articleNo + "_" + data.description;
	var flag = false;
	console.log(param);
	$
			.ajax({
				type : "post",
				url : "getDeliveryDate.htm",
				 contentType : "application/json",
				 data : JSON.stringify(param),
			/*	data : {
					inStorePromoArticleInfoList : data
				},*/
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					console.log(response);
					var message = '';
					output = $.parseJSON(response);
					dataObj = output.data;
					if (dataObj == null) {
						message = "Service call failed.";
					} else {
						message = dataObj.msg;
					}
					if (message == 'success') {
						removetooltip($('#deliveryDateEdit-' + id)
								.find('input'));
						if (dataObj.inStorePromoArticleInfoList != undefined
								&& dataObj.inStorePromoArticleInfoList.size > 0) {
							if (dataObj.inStorePromoArticleInfoList[0].deliveryDate != undefined
									&& dataObj.inStorePromoArticleInfoList[0].deliveryDate != '') {
								$('#deliveryDateEdit-' + id)
										.find('input')
										.val(
												dataObj.inStorePromoArticleInfoList[0].deliveryDate);
								flag = true;
							}
						}
					}else if(message == 'logout'){
						gotoHomeScreenSessionExpired();
					} else {
						if (message == undefined || message == 'failed') {
							message = "Technical issue occured.Please contact java support.";
						}
						console.log(message);
						showError(message);
						stopLoading();
					}
					stopLoading();
					if (flag) {
						removetooltip($('#deliveryDateEdit-' + id)
								.find('input'));
					} else {
						$('#deliveryDateEdit-' + id).find('input').val('');
						addtooltip($('#deliveryDateEdit-' + id).find('input'),
								'No valid delivery date found.');
					}
				},
				error : function() {
					showError('Sorry, Some technical issue occured.');
					stopLoading();
					$('#deliveryDateEdit-' + id).find('input').val('');
					addtooltip($('#deliveryDateEdit-' + id).find('input'),
							'No valid delivery date found.');
					// stopLoading();// goToLogin();
				},
			});

}

function checkForWarning(rowList) {
	clearAllErrors();
	var message = '';
	rowList
			.each(function() {
				var obj = $(this);

				// var displayreq=obj.find('td[data-bind="displayQty"]
				// input').required();
				// var demandreq=obj.find('td[data-bind="demandQty"]
				// input').required();
				// var buildreq=obj.find('td[data-bind="buildQty"]
				// input').required();

				var om = obj.find('td[data-bind="om"]').text();

				if (obj.find('td[data-bind="demandQty"] input') != undefined
						&& obj.find('td[data-bind="demandQty"] input').val()
								.trim() != '') {
					var article = '<b><i>'
							+ obj.find('td[data-bind="articleNo"]').text()
							+ '-' + obj.find('td[data-bind="desc"]').text()
							+ '</i>('
							+ obj.find('td[data-bind="articleUom"]').text()
							+ ')</b>';

					if (obj.find('td[data-bind="demandQty"] input').val() >= 99) {
						message += '<li>Store demand for article ' + article
								+ ' is greater than or equal to 99 units</li>';

					}
				}

				if (obj.find('td[data-bind="displayQty"] input') != undefined
						&& obj.find('td[data-bind="displayQty"] input').val()
								.trim() != '') {
					var article = '<b><i>'
							+ obj.find('td[data-bind="articleNo"]').text()
							+ '-' + obj.find('td[data-bind="desc"]').text()
							+ '</i>('
							+ obj.find('td[data-bind="articleUom"]').text()
							+ ')</b>';

					if (obj.find('td[data-bind="displayQty"] input').val() >= 99) {
						message += '<li>Store display for article ' + article
								+ ' is greater than or equal to 99 units</li>';

					}
				}

				if (obj.find('td[data-bind="buildQty"] input') != undefined
						&& obj.find('td[data-bind="buildQty"] input').val()
								.trim() != '') {
					var article = '<b><i>'
							+ obj.find('td[data-bind="articleNo"]').text()
							+ '-' + obj.find('td[data-bind="desc"]').text()
							+ '</i>('
							+ obj.find('td[data-bind="articleUom"]').text()
							+ ')</b>';

					if (obj.find('td[data-bind="buildQty"] input').val() >= 99) {
						message += '<li>Store build for article ' + article
								+ ' is greater than or equal to 99 units</li>';

					}
				}
			});

	if (message != '') {
		message += '<span style="margin-left: 20px;"> Do you want to continue ?</span>';
		return '<ol>' + message + '</ol>';
	} else {
		return '';
	}

}

//added for mobilnk search

function getArticleSearchResult() {
	var articleInfo='';
		
		articleInfo = $('#article').val().split('-')[0];
			//console.log("articleInfo****"+articleInfo);
		//var param= { "ARTICLE_INFO":articleInfo,AUTOSTOCK_IND:"N"};
		
		var articleNoFlag = "";
		var descFlag = "";
		var gtinFlag = "";
		var srcOfSupplyInd;
		var supplierNo;

			srcOfSupplyInd = "";
			supplierNo = "";

		if (isNaN((articleInfo).split('-')[0]))
			descFlag = "Y";
		else if (!isNaN((articleInfo).split('-')[0])
				&& (articleInfo).split('-')[0].length <= 7)
			articleNoFlag = "Y";
		else if (!isNaN((articleInfo).split('-')[0])
				&& (articleInfo).split('-')[0].length > 7)
			gtinFlag = "Y";
			nodeLevel = "";
			nodeId = "";
		var param = {
			"iv_desc" : descFlag,
			"iv_article_no" : articleNoFlag,
			"iv_gtin" : gtinFlag,
			"iv_article" : articleInfo,
			"iv_sales_org" : $('#salesOrg').val(),
			"iv_supplier" : supplierNo,
			"iv_src_supply" : srcOfSupplyInd,
			"iv_ranged" : "Y",
			"iv_session_id" : "",
			"iv_barcode" : "",
			"iv_site" : $('#posSite').val(),
			"iv_node_id" : nodeId,
			"iv_node_level" : nodeLevel,
			"iv_barcode_flag" : "",
			"iv_prime_vendor" : "",
			"iv_auto_stockr_flag" : "Y",
			"iv_delisted_flag" : "N",
			"iv_uom_flag" : "Y"
		};
		console.log(articleSearchInISPUrl + ' ' + JSON.stringify(param));
		
		$.ajax({
			type : "post",
			url  : articleSearchInISPUrl,
			data : JSON.stringify(param),
			
			beforeSend : function() {
				startLoading();
			},
			success : function(response) {
			
				if (response.length > 1) {
					$('#searchText').text($('#article').val());
					$('#searchArticleCount').text(response.length);
					$('#articleSearchTbody').html(
							populateSearchResult(response));
					$("#dialog-mulipleArticles").parent().addClass("popupWrapper");
					$("#dialog-mulipleArticles").parent().find('.ui-dialog-title').text(
					'Select Articles');
					$('#addtolist').text("Add To List");
					$("#dialog-mulipleArticles").dialog("open");
					bindCheckboxevent();
					// removed for defect Defect_14830 and Defect_14829
				} else if (response.length == 1 && response[0].article != undefined) {
					if(response[0].autostockr_ind != 'Y')
					{
					var content='Non-replenishment article ';
					content+=response[0].article;
					content+=' cannot be added to this promotion';
					showInformation(content);
				}
					else if(response[0].alc_status != '' &&(response[0].alc_status =='ES' || response[0].alc_status == 'EC'))
					{
					var content='Article ';
					content+=response[0].article;
					content+=' is blocked and cannot be added to this promotion';
					showInformation(content);
				}
					else if(response[0].ps_article_status != '' &&(response[0].ps_article_status == '08' || response[0].ps_article_status == 'ZA' ))
						{
						if($('#start').val() != '' && $('#end').val() != '')
							{
							var from=formatDateMobi(response[0].ps_stat_start_date);
							var to=formatDateMobi(response[0].ps_stat_end_date);
							var check1=$('#start').val();
							var check2=$('#end').val();
							var articleStatus='';
							if(response[0].ps_article_status == 'ZA')
								{
								articleStatus='Archived';
								}
							else if(response[0].ps_article_status == '08')
								{
								articleStatus='Recalled';
								}
							if(liesBetweenDateRange(from,to,check1) ||  liesBetweenDateRange(from,to,check2))
								{
								var content='Article ';
								content+=response[0].article;
								content+=' is '+articleStatus
								+' for the date range from '+from
								+' to '+to;
								showInformation(content);
								}
							else
							{

							addSingleArticleToPromoList(response[0]);
							showPromoList();
								
							}
							}
						}
					else
						{
					addSingleArticleToPromoList(response[0]);
					showPromoList();
						}
					if($('#salesOrg').val()=="1060")
						resetSearchFieldsBigW($('#daysOut').val());
					else
					resetSearchFields();
				} else {
					showError("No Data Found.");
					stopLoading();
				}
				stopLoading();
			},
			error : function() {
				showError('Sorry, Some technical issue occured.');
				stopLoading();
				// stopLoading();// goToLogin();
			},
		});

	}

function populateSearchResult(list) {
	var content = '<tr><th>Article</th><th>Description</th><th class="centerValue">UOM</th><th width="40px" class="centerValue lastColumn"><!--<input type="checkbox" name="articlecheckboxSelectAll" >-->Select</th></tr>';
	for ( var i = 0; i < list.length; i++) {
		content += getTr(list[i]);
	}
	return content;
}

function getTr(obj) {
	var articleNo = obj.article == undefined ? obj.article_no : obj.article;
	var tr = '<tr data-om="'
			+ (obj.om != null && obj.om != undefined ? obj.om : '1')
			+ '" data-supplier="'
			+ obj.supplier
			+ '" data-stdPrice="'
			+ (obj.standard_sell_price != null && obj.standard_sell_price != undefined ? 
					Number(obj.standard_sell_price).toFixed(2) : '0')
			+ '" data-promoPrice="0'
			+'" data-autoStockR="'
			+ (obj.autostockr_ind  != null && obj.autostockr_ind  != undefined ? 
					obj.autostockr_ind  : '')
			+'" data-alcStatus="'
			+ (obj.alc_status  != null && obj.alc_status  != undefined ? 
							obj.alc_status  : '')
			+'" data-articleStatus="'
			+ (obj.ps_article_status  != null && obj.ps_article_status  != undefined ? 
							obj.ps_article_status  : '')
			+'" data-psStartDate="'
			+ (obj.ps_stat_start_date  != null && obj.ps_stat_start_date  != undefined ? 
							obj.ps_stat_start_date  : '')
			+'" data-psEndDate="'
			+ (obj.ps_stat_end_date  != null && obj.ps_stat_end_date  != undefined ? 
							obj.ps_stat_end_date  : '')
			+'" data-freshFoodFlag="'
			+ (obj.fresh_food_flag  != null && obj.fresh_food_flag  != undefined ? 
							obj.fresh_food_flag  : '')
			+'" data-department="'
			+ (obj.department  != null && obj.department  != undefined ? 
							obj.department  : '')
			+ '" data-ParentNo="'
			+  articleNo
			//+
			+ '" ><td id="articleNo">'
			+  articleNo
			+ '</td><td id="description">'
			+ obj.article_desc
			+ '</td><td class="centerValue" id="uom" >'
			+ (obj.article_uom != null && obj.article_uom != undefined ? obj.article_uom : '')
			+ '</td><td widtd="40px" class="centerValue lastColumn"><input type="checkbox" name="articlecheckbox"></td></tr>';
	return tr;
}

function addSingleArticleToPromoList(obj) {

	var articleNo = obj.article;
	var description = obj.article_desc;
	var uom =  (obj.article_uom != null && obj.article_uom != undefined ? obj.article_uom : '');
	var supplier = '';
	var om = (obj.om != null && obj.om!= undefined ? obj.om : '');
	var parentNo = obj.article;
	var startDate = $('#start').val();
	var endDate = $('#end').val();
	var dispType = $('#adType').val();
	var dispText = $('#adType').find('option[value="' + dispType + '"]').text();
	var stdPrice = (obj.standard_sell_price != "" && obj.standard_sell_price != null 
			&& obj.standard_sell_price != undefined)? Number(obj.standard_sell_price).toFixed(2) :"0";
	var promoPrice = 0;
	var freshFoodFlag = (obj.fresh_food_flag || '') ;
	var department = (obj.department || '');
	var id = articleNo.trim() + '_' + uom.trim();

	if ($('#row-' + id).length == 0) {
		$('#promoArticleList').append(
				getPromoItemAsHTML(currentUser,articleNo, description, uom, id, supplier,
						om, startDate, endDate, dispType, dispText,stdPrice, '', '', '', '', '',
		'','','',department,freshFoodFlag));
		$("#row-" + id).find("#dispType").val(dispType);
		bindSaveAndDelete(id);
		checkOrUncheckAll();
		showPromoList();
		shrunkTable();
		var drafts=[];
		drafts.push(getDraftObj(articleNo, description, uom, id, supplier,
				om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,department,freshFoodFlag));
		modifyDraft(drafts);
	} else {
		console.log('Article already exist:' + articleNo);

		console.log('overwrite date :' + articleNo);
		if (startDate != '') {
			$("#startDateEdit-" + id).find('input').val(startDate);
			$("#startDate-" + id).text(startDate);
			$("#startDate-" + id).removeClass('errorField').attr('title', '');
		}

		if (endDate != '') {
			$("#endDateEdit-" + id).find('input').val(endDate);
			$("#endDate-" + id).text(endDate);
			$("#endDate-" + id).removeClass('errorField').attr('title', '');
		}

		if (dispType != '') {
			$("#advDisplayEdit-" + id).find('input').val(dispType);
			$("#advDisplay-" + id).text(dispText);
			$("#advDisplay-" + id).removeClass('errorField').attr('title', '');
		}
	}
$(("#row-").concat(id)).find('input,select').trigger('change');
	 // calendar autoformatting
				    $('input.inputDate.hasDatepicker').change(function()
					  {
				  $(this).val(formateDate($(this).val()));
					  });
	
}

function getDraftObj(articleNo, description, uom, id, supplier,
		om, startDate, endDate, dispType, dispText,stdPrice,promoPrice,parentNo,status,department,freshFoodFlag){
		var draft={
				"MATNR":articleNo,
				"ISIS_MATNR":articleNo,
				"MAKTX":description,
				"USER_ID":$('#loginUserId').val(),
				"MEINH":uom,
				"START_DATE":(startDate!=''&&startDate!=undefined)?toMobilinkDate(startDate):null,
				"END_DATE":(endDate!=''&&endDate!=undefined)?toMobilinkDate(endDate):null,
				"DISPLAY_TYPE":(dispType==undefined || dispType=='')?'F':listObj[i].dispType,
				"JOB_MODE":"I",
				"PROMO_TYPE":"ZDIS",
				"PROMO_REASON":"",
				"STATUS":"DRAFT",
				"DEPARTMENT" : department,
				"FRESH_FOOD_FLAG" : freshFoodFlag,
				"STATUS_MESSAGE":" "					
				};
	
	return draft;
}

function addToMyDrafts(listObj){
	console.log("To add List:"+JSON.stringify(listObj));
	var draftArray=[];
	for(var i=0;i<listObj.length;i++){
		var id=listObj[i].articleNo+'_'+listObj[i].articleUom
		var draft={
				"MATNR":listObj[i].articleNo,
				"ISIS_MATNR":listObj[i].articleNo,
				"MAKTX":$('#row-'+id).find('td[data-bind="desc"]').text(),
				"USER_ID":$('#loginUserId').val(),
				"MEINH":listObj[i].articleUom,
				"START_DATE":toMobilinkDate(listObj[i].promoStartDate),
				"END_DATE":toMobilinkDate(listObj[i].promoEndDate),
				"DISPLAY_TYPE":(listObj[i].dispType==undefined || listObj[i].dispType=='')?'F':listObj[i].dispType,
				"JOB_MODE":"I",
				"PROMO_TYPE":"ZDIS",
				"STATUS":"DRAFT",
				"STATUS_MESSAGE":" "					
				};
		console.log('draft item '+JSON.stringify(draft));
		draftArray.push(draft);
	}	
	console.log("To add draft:"+draftArray);
	modifyDraft(draftArray);
}

function removeFromDraft(listObj){
	console.log("To add List:"+JSON.stringify(listObj));
	var draftArray=[];
	for(var i=0;i<listObj.length;i++){
		var id=listObj[i].articleNo+'_'+listObj[i].articleUom;
		var draft={
				"MATNR":listObj[i].articleNo,
				"ISIS_MATNR":listObj[i].articleNo,
				"MAKTX":$('#row-'+id).find('td[data-bind="desc"]').text(),
				"USER_ID":listObj[i].user,//$('#row-'+id).attr('addedBy'),
				"MEINH":listObj[i].articleUom,
				"START_DATE":toMobilinkDate(listObj[i].promoStartDate),
				"END_DATE":toMobilinkDate(listObj[i].promoEndDate),
				"DISPLAY_TYPE":(listObj[i].dispType==undefined || listObj[i].dispType=='')?'F':listObj[i].dispType,
				"JOB_MODE":"D",
				"PROMO_TYPE":"ZDIS",
				"STATUS":"DRAFT",
				"STATUS_MESSAGE":" "					
				};
		console.log('draft item '+JSON.stringify(draft));
		draftArray.push(draft);
	}	
	console.log("To add draft:"+draftArray);
	modifyDraft(draftArray);
	removeEmptyGroup();
}

function loadMyDraft(myDraftArrayList) {
	// console.log('myDraft'+myDraft);
	var myDraftArray=[];
	var duplicatesArr=[];
	for ( var i = 0; i < myDraftArrayList.length; i++) {
		if (myDraftArrayList[i].PROMO_TYPE == 'ZDIS') {
			myDraftArray.push(myDraftArrayList[i]);
		}
	}
	console.log('mydrafts:::'+myDraftArray.length);
	var tempArr= myDraftArray; //for Defect_14834
	for( var i = 0; i < tempArr.length; i++){
		for( var x = i+1; x < tempArr.length; x++){
			if( tempArr[x].MATNR == tempArr[i].MATNR  && (tempArr[x].MEINH == tempArr[i].MEINH ) ){
				duplicatesArr.push(tempArr[x]);
				tempArr.splice(x,1);
				--x;
			}
		}
	}
	console.log('with 1 dup:::'+myDraftArray.length);
	if(duplicatesArr.length > 0){
		//for Defect_14834
	for( var i = 0; i < duplicatesArr.length; i++){
		for( var x = 0; x < tempArr.length; x++){
			if( (tempArr[x].MATNR == duplicatesArr[i].MATNR) ){
				duplicatesArr.push(tempArr[x]);
				tempArr.splice(x,1);
				console.log('tempArr'+tempArr.length);
				//--x;
			}
		}
	}
	}
	console.log('with no dup:::'+myDraftArray.length);
	console.log('dup array :::'+duplicatesArr.length);
	if (myDraftArray != undefined) {
		
		$('.row,.groupHeader').remove();
		
		var myDraftGrp = $groupBy(myDraftArray, function(obj) {
			return obj.CREATE_USER;
		});
		
		if(duplicatesArr.length > 0){
			var commonArticlesGrp = $groupBy(duplicatesArr, function(obj) {
				return obj.MATNR;
			});
			}
		
		for ( var user in myDraftGrp) {
			var myDraft = myDraftGrp[user];
			if($('#listOption').val()=='allDrafts' && myDraft.length >0){
				var header = '<tr data-om class="drillsOpenDefault collapsed rowHighlight defaultExpanded groupHeader" header="'+user+'"><td data-addon-sh><input type="checkbox"  class="userCheckBox" checked/></td><td colspan="17">Added By: <strong>'
					+ '&nbsp;'+(myDraft[0].USER_NAME || '')
					+ '</strong></td></tr>';				
				$('#promoArticleList').append(header);
			}
			
			
			
			for ( var i = 0; i < myDraft.length; i++) {
				if (myDraft[i].PROMO_TYPE == 'ZDIS') {
					var articleNo = myDraft[i].MATNR;
					var uom = myDraft[i].MEINH;
					var description = myDraft[i].MAKTX;
					var dispType = myDraft[i].DISPLAY_TYPE;
					var startDate = (myDraft[i].START_DATE != null && myDraft[i].START_DATE != '') ? fromMobilinkDate(myDraft[i].START_DATE)
							: '';
					var endDate = (myDraft[i].END_DATE != null && myDraft[i].END_DATE != '') ? fromMobilinkDate(myDraft[i].END_DATE)
							: '';
					var id = Number(articleNo) + "_" + uom;
					var parentNo = myDraft[i].ISIS_MATNR;
					var status = myDraft[i].STATUS;
					var freshFoodFlag = (myDraft[i].FRESH_FOOD_FLAG || '');
					var department = myDraft[i].DEPARTMENT;
					if ($('#row-' + id).length == 0){
					$('#promoArticleList').append(
							getPromoItemAsHTML(user,articleNo, description, uom, id,
									'', '', startDate, endDate, dispType, '',
									'', '', '', '', '', '','','',
		'',department,freshFoodFlag));
					$("#row-" + id).find("#dispType").val(dispType);

					bindSaveAndDelete(id);
					}
					else
						{
						$('#row-'+ id).prev('tr').find('strong').append(','+user);
						}
				}
			}
		}
		if(duplicatesArr.length > 0){
			for ( var article in commonArticlesGrp) {
				var myDraft = commonArticlesGrp[article];
				if($('#listOption').val()=='allDrafts' && myDraft.length >0){
					var createdUsersList = [];
					for(var i=0;i<myDraft.length;i++)
					{
						createdUsersList.push(myDraft[i].USER_NAME);
					}
					createdUsersList = unique(createdUsersList);
				var header = '<tr data-om class="drillsOpenDefault collapsed rowHighlight defaultExpanded groupHeader"><td data-addon-sh><input type="checkbox"  class="userCheckBox" checked/></td><td colspan="17">Added By: <strong>';
				for(var i=0;i<createdUsersList.length;i++)
				{
				header+= '&nbsp;'+createdUsersList[i];
				if(i>=0 && i!= createdUsersList.length-1)
					header+=',';
				}
				header+= '</strong></td></tr>';
				
				$('#promoArticleList').append(header);
				
				}
			for(var i=0;i<myDraft.length;i++)
			{
				if(myDraft[i].PROMO_TYPE=='ZDIS')
				{
				var articleNo = myDraft[i].MATNR;
				var uom = myDraft[i].MEINH;
				var description = myDraft[i].MAKTX;
				var dispType=myDraft[i].DISPLAY_TYPE;
				var startDate=(myDraft[i].START_DATE!=null&&myDraft[i].START_DATE!='')?fromMobilinkDate(myDraft[i].START_DATE):'';
				var endDate=(myDraft[i].END_DATE!=null&&myDraft[i].END_DATE!='')?fromMobilinkDate(myDraft[i].END_DATE):'';
				var id = Number(articleNo) + "_" + uom;
				var parentNo = myDraft[i].ISIS_MATNR;
				var status = myDraft[i].STATUS;
				var userName=myDraft[i].CREATE_USER;
				var department = myDraft[i].DEPARTMENT;
				var freshFoodFlag = myDraft[i].FRESH_FOOD_FLAG;
				if ($('#row-' + id).length == 0){
				$('#promoArticleList').append(
						getPromoItemAsHTML(userName,articleNo, description, uom, id,
								'', '', startDate, endDate, dispType, '','','',
								'', '', '', '', '', '',
		'',department,freshFoodFlag));
				$("#row-" + id).find("#dispType").val(dispType);
				bindSaveAndDelete(id);
				}
				}
			}
		}
		}
		bindAllDraftCheckBoxEvent();
		checkOrUncheckAll();
		showPromoList();
		shrunkTable();
		$('#promolistcheckboxall').trigger('click');
	}
}

function modifyDraft(dataObj){
	//service call to put my draft list 
	var param= { "ItemArray":dataObj};
	$.post( modifyMyDraftURL,JSON.stringify(param))
	  .done(function( data ) {
	    console.log('Added to My draft:'+data);
	});
}

function callServiceForMyDraft()
{
	//service call to get my draft list 
	startLoading();
	
	var param= { "USER_ID":$('#loginUserId').val()};
	$.post( getMyDraftURL,JSON.stringify(param))
	  .done(function( data ) {
		  var response = data;
		  loadMyDraft(response);
		 stopLoading(); 
		 $('#addActionBtn').removeClass('hideBlock');
		$('#tableAddAction').removeClass('hideBlock');
	  });

}
function callServiceForAllDraft()
{
	//service call to get All draft list 
	startLoading();
	
	var param= { "USER_ID":"ALL"};
	$.post( getMyDraftURL,JSON.stringify(param))
	  .done(function( data ) {
		  var response = data;
		  loadMyDraft(response);
		  stopLoading();  
		  $('#addActionBtn').removeClass('hideBlock').addClass('hideBlock');
		  $('#tableAddAction').removeClass('hideBlock').addClass('hideBlock');
	  });	

}

function loadMoreInfoFromService(listObj){
	var draftArray=[];
	for(var i=0;i<listObj.length;i++){
		var draft={
				"iv_article_no":listObj[i].articleNo,
			    "iv_child_article_no":listObj[i].articleNo,
			    "iv_promo_start_date":formatDateToMDY(listObj[i].promoStartDate),
			    "iv_promo_end_date":formatDateToMDY(listObj[i].promoEndDate),
			    "iv_article_uom":listObj[i].articleUom				
				
				};
		console.log('draft item '+JSON.stringify(draft));
		draftArray.push(draft);
	}
	startLoading();
	var param= { "Article_dtls":draftArray};
	console.log(loadMoreInfo +' '+JSON.stringify(param) );
	$.post( loadMoreInfo,JSON.stringify(param))
	  .done(function( result ) {
	    if(result!=undefined){
			
			for(var i=0;i<result.length;i++){				
				var articleNo = result[i].article_no;
				var uom = result[i].base_uom;
				var id=articleNo+'_'+uom;				
				result[i].om = (result[i].om != null && result[i].om != '0' && result[i].om != '') ? result[i].om:'1';
				$('.row-'+id).find('.valueInfo').text(result[i].supplier_no+'-'+result[i].supplier_name);	
				$('#row-'+id).find('[data-bind="om"]').text(result[i].om);
				$('#row-'+id).attr('data-standardprice',result[i].standard_price);
				$('#row-'+id).attr('data-promfrct',result[i].promo_price!=null?result[i].promo_price:'0');
				$('#row-'+id).attr('data-order_uom',result[i].order_uom!=null?result[i].order_uom:'0');
				$('#row-'+id).attr('data-art_mas_uom',result[i].base_uom!=null?result[i].base_uom:'0');
				
				var baseFrct=Number($('#row-'+id).find('[data-bind="baseFrct"]').text());
				var promFrct=Number($('#row-'+id).find('[data-bind="promFrct"]').text());
				var demand=Number($('#row-'+id).find('[data-bind="demandQty"]').find('input').val());
			
				var baseFrctVal = (baseFrct != null && baseFrct != '0') ? ((Number(baseFrct) / Number(result[i].om)) != 'NaN' ? (Number(baseFrct) / Number(result[i].om))
						.toFixed(0)
						: "0")
						: "0";
				$('#row-'+id).find('[data-bind="baseFrct"]').text(baseFrctVal);
				
				var promFrctVal = (promFrct != null && promFrct != '0') ? ((Number(promFrct) / Number(result[i].om)) != 'NaN' ? (Number(promFrct) / Number(result[i].om))
						.toFixed(0)
						: "0")
						: "0";
				$('#row-'+id).find('[data-bind="promFrct"]').text(promFrctVal);
				
				var demandVal=(demand != null && demand != '0') ? ((Number(demand) / Number(result[i].om)) != 'NaN' ? (Number(demand) / Number(result[i].om))
						.toFixed(0)
						: demand)
						: demand;
				$('#row-'+id).find('[data-bind="demandQty"]').find('input').val(demandVal);
				$('#row-' + id).find('td[data-bind="oldDemandQty"]').text(demandVal);
				$('#row-'+id).find('[data-bind="demandQty"]').find('input').trigger('change');
				
						
			}
			stopLoading();
	    }
	});
	
}

function bindCheckBoxForGroup(user){
	$('[header="'+user+'"]').find('input[type="checkbox"]').unbind('change');
	$('[header="'+user+'"]').find('input[type="checkbox"]').change(function(){
		if($('[header="'+user+'"]').find('input[type="checkbox"]').is(':checked')){
			$('[addedBy="'+user+'"]').find('input[type="checkbox"]').prop('checked',true);
		}else{
			$('[addedBy="'+user+'"]').find('input[type="checkbox"]').prop('checked',false);
		}
		
		if ($(".promolistcheckbox:checked").length == $(".promolistcheckbox").length) {
			$("#promolistcheckboxall").prop('checked', true);
		} else {
			$("#promolistcheckboxall").prop('checked', false);
		}
		checkOrUncheckAll();
	});
	
}
function bindAllDraftCheckBoxEvent()
{
	$('.userCheckBox').unbind('click');
	$('.userCheckBox').click(function(){
		var $rowsBetween = $(this).closest('tr').nextUntil('.groupHeader');
		if($(this).is(":checked"))
		{
		$rowsBetween.find('.promolistcheckbox').prop('checked',true);
		}
		else
		{
		$rowsBetween.find('.promolistcheckbox').prop('checked',false);
		}
		checkOrUncheckAll();
		});
	removeEmptyGroup();
	
}
function removeEmptyGroup()
{
var allGroup = $('.userCheckBox').closest('tr');
if($('#listOption').val()=='allDrafts' && !$('#listOption').is(':disabled'))	
	allGroup.each(function(){
		var childRows = $(this).nextUntil('.groupHeader').length;
		if(childRows == 0)
		$(this).addClass('hideBlock');
		else
		$(this).removeClass('hideBlock');
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
function validateStartandEndDateInSearch()
{
	var flag = true;
	if($('#start').val() != '' && $('#end').val() != '')
	{
		var streq;
		var endreq;
		var streqvalid;
		var endreqvalid;
		var strNoPast;
		var endNoPast;
	 streq=$('#start').required();
	 endreq=$('#end').required();
	 if(streq && endreq)
		 {
	 streqvalid=$('#start').isValidDate();
	 endreqvalid=$('#end').isValidDate();
		 }
	if(streqvalid && endreqvalid )
		{
	 strNoPast = $('#start').noPastValidation();
	 endNoPast = $('#end').noPastValidation();
		}
	if(streq && endreq && streqvalid && endreqvalid && strNoPast  && endNoPast ){

	/*if((isSupers || isLiqure) && !isDesiredRole(roleMap,roleId))
	{
	flag = $('#end').sameDateValidation($('#start'));
	if(!flag)
		return flag;
	}
else */if (isBigw == 'true')
	{
	flag = $('#end').oneMonthDateValidation($('#start'),0);
	if(!flag)
		return flag;
	}
else
	{
	flag = $('#start').startEndValidation($('#end'),0);
	if(!flag)
		return flag;
	}
	}
	else
		{
		return false;
		}
}
	else if(($('#start').val() == '' && $('#end').val() != '') || ($('#start').val() != '' && $('#end').val() == ''))
	{
		showError('Please check the date range.');
		if($('#start').val() == '')
		$('#start').addClass(errorFieldClass);
		if($('#end').val() == '')
		$('#end').addClass(errorFieldClass);
		flag = false;
	}
	return flag;
}

function getDesiredDate(count)
{
var desiredDate ='';
var thatDay = new Date(new Date().getTime() - 86400000* count);
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
function isDesiredRole(obj,key)
{
    return obj.hasOwnProperty(key);
}
function getConfigData()
{
	
	var param = {
			iv_sales_org : salesOrgVal,
			iv_role_id : roleId,
			iv_promo_type : 'ZDIS'
			
	};
	console.log(getPromoConfigurationURL+' '+ JSON.stringify(param));
	$.ajax({
		type : "post",
		url  : getPromoConfigurationURL,
		data : JSON.stringify(param),
		
		beforeSend : function() {
			startLoading();
		},
		success : function(response) {
			if(response!=null && response!=undefined && response.length > 0 
					&& response[0].ErrorID==undefined){
				freshFoodDayLimit = response[0].range_days;
				var inPromotionConstants = response[0].isp_constants;
				console.log(freshFoodDayLimit + ' '+ inPromotionConstants);
				var otherConstants = inPromotionConstants.split(',');	
				var constantsMap = {};
				for(var i=0 ;i<otherConstants.length;i++ )
					{
					var optionName = otherConstants[i].split(':')[0].trim();
					if(isNaN(optionName))
					{
					var optionValue = otherConstants[i].split(':')[1].trim();
					constantsMap[optionName] = optionValue;
					}
					}
				console.log(constantsMap);
				if(!isEmptyMap(constantsMap))
					{
					demandLimit = constantsMap["ZDIS_DEMAND_LIMIT"];
					buildBigwLimit = constantsMap["ZDIS_BIGW_BUILD_LIMIT"];
					displayLimit = constantsMap["ZDIS_DISPLAY_LIMIT"];
					maxlimit = constantsMap["ZDIS_MAX_LIMIT"];
					maxRangeValue=constantsMap["MAX_RANGE_VALUE"];
					minRangeValue=constantsMap["MIN_RANGE_VALUE"];
					bigwdaylimit = constantsMap["BIGW_DAY_LIMIT"];
					supersdaylimit = constantsMap["SUPERS_DAY_LIMIT"];
					supersotherpromodaylimit =constantsMap["SUPERS_OTHER_PROMO_DAY_LIMIT"];
					}
			}else{
				
				if(response!=undefined && response.length > 0 && response[0].ErrorID!=undefined){
					showAllErrors('Technical issue occured in SQL Anywhere, While getting promotion configuration data');
				}else{
					//showAllErrors('Sorry, Some technical issue occured');
				}
			}
			stopLoading();
		},
		error : function () {
			stopLoading();
		}
	});


}

function getDesiredDate(count)
{
var desiredDate ='';
var thatDay = new Date(new Date().getTime() - (86400000* count));
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
function getDesiredDateBigW(count,daysOut)
{
var desiredDate ='';
var thatDay = new Date(new Date().getTime() - (86400000* count) + (daysOut*24*60*60*1000));
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

function ISDconfirmation(dataObj) {
	
	if ( dataObj.iSDvalidArticleList.length == 0 && dataObj.iSDInvalidArticleList == 0 ) {		
		$.fn.warnPopup ('warn','No articles defined in ISD Control List. Create In-Store Display Promotion is restricted at this time.','Confirmation','','','','','ok/cancel');
		$('#dialog-alert-conf').find('#no').addClass('hideBlock');		
	} 
	 else if (dataObj.iSDvalidArticleList.length == 0) {			
			$.fn.warnPopup ('warn','Article(s) selected not permitted.','Confirmation','','','','','ok/cancel');
			$('#dialog-alert-conf').find('#no').addClass('hideBlock');
		} else {

		$("#dialog-ISDconfirmation").parent().addClass("popupWrapper");
		$("#dialog-ISDconfirmation").dialog("open");
		var msg = dataObj.iSDInvalidArticleList.length+" article(s) not permitted. Click on Proceed to Create in-store display promotion for "+dataObj.iSDvalidArticleList.length+" valid articles?";
		$("#dialog-ISDconfirmation").find('#ISDmessage').text(msg);
		$("#dialog-ISDconfirmation").parent().find('.ui-dialog-title').text(
		'Confirmation');
		$("#dialog-ISDconfirmation").find('#proceed').unbind('click');
		$("#dialog-ISDconfirmation").find('#proceed').click(function() {
			proceedToCreateWithValidArticles(dataObj);

			$("#dialog-ISDconfirmation").parent().removeClass("popupWrapper");
			$("#dialog-ISDconfirmation").dialog("close");
		});
		$("#dialog-ISDconfirmation").find('#cancelProceed').removeClass('hideBlock');
		$("#dialog-ISDconfirmation").find('#cancelProceed').unbind('click');
		$("#dialog-ISDconfirmation").find('#cancelProceed').click(function() {
			$("#dialog-ISDconfirmation").parent().removeClass("popupWrapper");

			var $parent = $('#promoList');
			var InvalidArticleList = dataObj.iSDInvalidArticleList;
			for(var i=0; i< InvalidArticleList.length ; i++)
			{
				var obj = InvalidArticleList[i];
				var id = obj.articleNo.trim() + '_' + obj.articleUom.trim();	
				$parent.find('#row-'+id).find('.promolistcheckbox').prop('checked',false);
				$('#promoList').find('#promolistcheckboxall').prop('checked',false)
			}

			$("#dialog-ISDconfirmation").dialog("close");
		});
	}
	$('#dialog-alert-conf').find('#yes').click(function() {
		$("#dialog-alert-conf").dialog("close");
		var $parent = $('#promoList');
		$parent.find('.promolistcheckbox').prop('checked',false);
		$parent.find('#promolistcheckboxall').prop('checked',false);
	});
}

function proceedToCreateWithValidArticles(dataObj)
{
	var InvalidArticleList = dataObj.iSDInvalidArticleList;
	var $parent = $('#promoArticleList');
	for(var i=0; i< InvalidArticleList.length ; i++)
		{
		var obj = InvalidArticleList[i];
		var id = obj.articleNo.trim() + '_' + obj.articleUom.trim();	
		$parent.find('#row-'+id).find('.promolistcheckbox').prop('checked',false);
		}
	checkOrUncheckAll();
	if ($(".promolistcheckbox:checked").length == 0) {
		showError('Please Select any article to proceed.');
		$(".tooltip").tooltip({
			position : {
				my : "left center",
				at : "right+10 center"
			}
		});
		return false;
	}
	
	if (validateDraft($('#promoArticleList tr[data-om]'))) {
	var formData = getPostDataObj4ArticleInfoStr(
			$('#promoArticleList tr[data-om]'),
			true);
	$('.saveRecord').trigger('click');
	getArticleInfo(formData);
	}
}