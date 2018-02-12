$(document)
		.ready(
				function() {

					document.forms[0].autocomplete = "off";
					
					$( "#dialog-verify" ).dialog({				
						autoOpen: false,
						modal: true,
						resizable: false,
						minHeight: 200,
						maxHeight: 600,
						width: 800
					});
					
					$("#dialog-verify").parent().addClass("popupWrapper");

					$('.trimDecimalForSoh').filter(function() {
						var value = $(this).text();
						$(this).text(value.split(".")[0]);
					});
					$('#dialog-verify .filterWrapper').addClass('hideBlock');
					
					
					$(".sortTable").tablesort();
					if ($('#checkedValues').val() != "") {
						if ($('#checkedValues').val().split(',').length > 1)
							$('#dropdownSelect').text(
									$('input[type=checkbox]:checked').length
											+ " out of "
											+ $('input[type=checkbox]').length
											+ " selected");
						else if ($('#checkedValues').val().split(',').length == 0)
							$('#dropdownSelect').text('Select');
						else
							$('#dropdownSelect').text(
									$('input[type=checkbox]:checked').next()
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
																$('input[type=checkbox]:checked').length
																		+ " out of "
																		+ $('input[type=checkbox]').length
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
												$('input[type=checkbox]')
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
										$('input[type=checkbox]')
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
					$("#closeLink").click(function() {
						$("#tableAddAction").addClass('hideBlock');
					});
					$("#clsLink").click(function() {
						$("#errorMsgDiv").addClass('errorDiv hideBlock');
						$("#errorMsgDiv").removeClass('errorDiv');
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

					$("#search").click(function() {
						validateFields();
					});

					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							validateFields();
						}
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

					$(".secondaryActionBtnBack")
							.click(
									function(e) {
										window.location.href = "../article/onPageLoadArticleDetail.htm";
									});

					//Checkbox DropDown functions
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

				/*	$('.verifyStore')
							.click(
									function() {
										hideError();
												
										

									});*/
					$('#dialog-verify .textbox ').keyup(function(){
						value=$(this).val();

						$('.verifyContent').filter(function(){
						
						if( value!=''){
						if(($(this).children(':nth-child(1)').text().trim().toLowerCase().indexOf(value) != -1 || $(this).children(':nth-child(2)').text().trim().toLowerCase().indexOf(value) != -1))
						{
							$(this).removeClass('hideBlock');
							////console.log(i++);
						}
						else 
						$(this).addClass('hideBlock');
						}
						else
						{
						$(this).removeClass('hideBlock');
						}
						});
						var recCnt=$('.verifyContent:visible').length;
						currentPage=1;
						if(recCnt>9){
							$('.verifyPagination').removeClass('hideBlock');
						$('.verifyPagination').pagination({
							items : recCnt,
							itemsOnPage : 9,
							cssStyle : 'compact-theme',
							currentPage : currentPage,
							onPageClick : function(pageNumber) {
								showVerifyPage(pageNumber);

							}

						});
						}
						else{
							$('.verifyPagination').addClass('hideBlock');
						}
						
						var i =1;
						var cnt=1;
						$('.verifyContent:visible ').each(function(){
							$(this).attr('class','');
							$(this).addClass('verifyContent').addClass('pagNo-'+cnt);
							if(cnt>1)
								$(this).addClass('hideBlock');
							if(i%9==0){
								cnt++;
							}
							i++;
							////console.log(i++);
							});
						});

				});
function showStorePage(pageNo) {
	currPage = pageNo;
	var pageClass = 'pagNo-' + pageNo;
	$('.verifyContent').filter(function() {
		if ($(this).hasClass(pageClass))
			$(this).removeClass('hideBlock');
		else
			$(this).addClass('hideBlock');
	});
}

function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}

function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}

function verifyStore(data, flag) {
	$
			.ajax({
				data : data,
				url : "verifyStore.htm",
				type : 'get',
				
				beforeSend : function() {
					startLoading();
				},
				success : function(response) {
					// var option =
					// $("<h4>").html(response).find("#option").val();
					var res = $.parseJSON(response);
					var tblHdr = '<thead><tr><th data-sort="string">Store ID</th><th data-sort="string" class="sorted ascending" >Store Name</th><th width="25px" class="lastColumn">&nbsp;</th></tr></thead>';
					// myMap
					if (res.data != null && res.data != undefined
							&& res.data.length > 0 && res.msg == 'true') {
						var list = res.data;
						var j = 0;
						var k = 1;
						var siteNo = '';
						var siteName = '';
						siteNo = list[0].siteNumber;
						siteName = list[0].siteDescription;
						for ( var i = 0; i < list.length; i++) {
							j++;

							tblHdr += '<tr class="verifyContent ';
							if (k > 1) {
								tblHdr += ' hideBlock ';
							}
							tblHdr += ' pagNo-' + k + '"><td>'
									+ list[i].siteNumber + '</td><td>'
									+ list[i].siteDescription + '</td>';
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
							$('#dialog-verify').parent().find('.ui-dialog-title').text('Verify Store');
							$('#dialog-verify .warningMessage h4').html('Too many search results for <strong>'+$('#siteNo').val()+'</strong>. Please select a store from the list below');
							$("#dialog-verify").dialog("open");
							if (j > 9) {
								$('.verifyPagination').removeClass('hideBlock');
								$('.verifyPagination').pagination({
									items : j,
									itemsOnPage : 9,
									cssStyle : 'compact-theme',
									currentPage : currPage,
									onPageClick : function(pageNumber) {
										showStorePage(pageNumber);

									}

								});
							} else {
								$('.verifyPagination').addClass('hideBlock');
							}
							bindStoreContent(flag);
                            stopLoading();
						} else {
							if (flag) {
								if(siteNo!=''){
								$('#siteNo').val(siteNo);
								$("#NearbyStoreSearchForm").submit();
								}
								else{
                                    stopLoading();
									showError('Invalid store No/Name');
								}
								//+ siteName
								//removeStore();
							} 
						}

					} else {
						if (flag) {
							showError('Invalid store No/Name');
						} else {
							showErrorInPopup('Invalid store No/Name');
						}
						stopLoading();
					}
					
				},
				error : function() {
					//goToLogin();
				}
			});
}
function bindStoreContent(flag) {
	$(".sortPopUpTbl").tablesort();
	if (flag) {
		$('.selectStore')
				.click(
						function() {
							hideError();
							$('#siteNo').val($(this)
									.parent()
									.parent()
									.parent()
									.find(
											'td:first')
									.text().trim());
							
							$("#dialog-verify").dialog("close");
							$("#NearbyStoreSearchForm").submit();
						});
	} else {
		$('.selectStore').click(
				function() {
					hideError();
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
function showErrorInPopup(msg, id) {

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
	//$('#'+id+' .popupActions').parent().removeClass('hideBlock');
}

function hideErrorInPopup(id) {
	//$('#'+id+' .popupActions').prev().removeClass('popupError,popupWarning').addClass('popupError').text('');
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
	$('#NearbyStoreSearchForm').attr('method', 'GET');
	$('#NearbyStoreSearchForm').attr('action', 'requestStoreArticleDetail.htm');
	$("#NearbyStoreSearchForm").submit();
}

function validateFields() {
	hideError();
	$("#dropdown").removeClass('active');
	$(".actionRows").hide();
	if ($('#siteNo').val() == "" || $.trim($('#siteNo').val()).length == 0) {
		showError("Please enter Store No");
	} else {
		startLoading();
		verifyStore(
				{
					storeId : $(
							'#siteNo')
							.val()
							.trim()
				}, true);
	}
}
function showError(msg) {
	$(".tableActionsBtnsWrapper #errorMsgDiv").html('<h4>'+msg+'</h4>');
	$("#errorMsgDiv").removeClass('errorDiv hideBlock');
	$("#errorMsgDiv").addClass('errorDiv');
}

function hideError() {
	$(".tableActionsBtnsWrapper #errorMsgDiv").html('');
	$("#errorMsgDiv").addClass('errorDiv hideBlock');
	$("#errorMsgDiv").removeClass('errorDiv');
}

