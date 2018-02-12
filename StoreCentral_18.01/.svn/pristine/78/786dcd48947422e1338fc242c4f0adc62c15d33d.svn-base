var recordCount;
var currentPage;
var uom = "";
$(function() {
	$(document).keypress(function(event) {
		if (event.which == 13) {
			event.preventDefault();
			if($('.lookup').is(':visible'))
			{
			$('#reportContent #errorMsg').html("");
			$('#reportContent .tableInfo.no-data-message,#reportContent .nodataMessage,#reportContent .tableTitle.totalRecord').addClass('hideBlock');
			if ($('#dialog-modal2').dialog('isOpen')) {
				$("#goButtonSample2").click();
			} else if ($('#dialog-modal-user').dialog('isOpen')) {
				$('#submitBy').val($('#userField').val().trim());
				$('#verifyUser').click();
			} else {
				// $(".advanceSearchGo").click();
				advanceSearchGo();
			}
		}
		}
	});
	
	var queryNo=$('#queryNo').val().trim();
	if(queryNo != null && queryNo != undefined && queryNo > 0)
		{
		setTimeout(function() {
			$('#queryId').val(queryNo);
			advanceSearchGo();
		}, 50);
		}
		

	$('#dialog-modalUser #okBtn').click(function() {
		$('#dialog-modalUser').dialog('close');

	});
	$(".inputDate").datepicker({
		zIndex : 50
	});
	$("#dialog-modal-user").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});
	$("#dialog-modal-user").parent().addClass("popupWrapper");
	$("#dialog-modal2").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});
	$("#dialog-modal2").parent().addClass("popupWrapper");
	$("#dialog-modalUser").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modalUser").parent().addClass("popupWrapper");

	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});
	$('#okBtn').click(function() {
		$('#dialog-modalUser').dialog('close');
	});
	/*
	 * $('.textbox').focus(function() { if ($(this).val() ==
	 * $(this).attr('defaultVal')) { $(this).val('');
	 * $(this).removeClass("textboxDefaultText"); } });
	 * 
	 * $('.textbox').blur(function() { if ($(this).val() == '') {
	 * $(this).val($(this).attr('defaultVal'));
	 * $(this).addClass("textboxDefaultText"); } });
	 */

	$("#goButtonSample2").click(
			function() {

				if ($('#vendorDesc2').val() == '') {
					$('#DescriptionTableTitle').text(
							'Please enter a keyword to lookup.');
					$('#vendorDesc2').focus();
					$('#popupDataDiv2 .ContentTableWrapper').html('');
					// $('#popupDataDiv2 #DescriptionTableTitle').html('');
				} else {
					$('#popupDataDiv2 .ContentTableWrapper').html('');
					$('#popupDataDiv2 #DescriptionTableTitle').html('');
					$('#article').val($('#vendorDesc2').val());
					getDescriptionDetail($('#vendorDesc2').val());
					$('#Description').click();
					// $('#sohSearch').click();
				}

			});

	$("#advLink1")
			.click(
					function() {

						var scroll = $(window).scrollTop();
						$('#advanceTab').val('Y');

						var lookupHeight = $('#lookupContainer').height();

						document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
						document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");

						var lookupBgheight = $("#advDiv").outerHeight() + 20
								+ "px";
						$("#advWrapper").css("height", '165px');

						$("#advDiv").removeClass('advancedParam hideBlock');
						$("#advDiv").addClass('advancedParam');

						$("#advWrapper").removeClass(
								'advancedSearchFormatWrapper hideBlock');
						$("#advWrapper")
								.addClass('advancedSearchFormatWrapper');

						$("#closeLink").removeClass('linkBtn hideBlock');
						$("#closeLink").addClass('linkBtn');

						$("#advLink1").hide();
						$("#value").val("");

					});

	/* closes advanced search when close is clicked */
	$("#closeLink").click(function() {
		closeAdvSearchClasses(true);
	});

	/*
	 * closes advanced search box when windowed are scrolled unless in popup
	 * menu
	 */
	$(window)
			.scroll(
					function() {
						if ($('#dialog-modal').dialog("isOpen") == true) {
							var scroll = $(window).scrollTop();
							var lookupHeight = $('#lookupContainer').height();
							document.getElementById("advWrapper").style.marginTop = ((lookupHeight - scroll) + "px");
							document.getElementById("advDiv").style.marginTop = (("0" - scroll) + "px");
						} else {
							closeAdvSearchClasses(false);
						}
					});

	/* closes advanced search box when cotent out side of the box is clicked --> */
	$('.mainWrapper').click(function() {
		closeAdvSearchClasses(false);
	});

	/* <!-- disable close box function when lookup box is clicked --> */
	$('#lookupContainer').click(function(event) {
		event.stopPropagation();
	});

	/*
	 * $('#articleGo').click(function() { if ($('#article').val() == "" &&
	 * $('#queryId').val() == "") { $('#statMsg').text('Please enter keyword to
	 * lookup'); $("#statMsgDiv").removeClass('tableTitle nodataMessage');
	 * $("#statMsgDiv").addClass('tableTitle errorDiv');
	 * $(".tableInfo").removeClass('hideBlock'); $('#statMsgDiv').show(); } else {
	 * $('.statusWrapper').removeClass('hideBlock');
	 * $('#statusImg').removeClass('hideBlock');
	 * //$(".tableInfo").addClass('hideBlock'); $('#statMsgDiv').hide(); }
	 * 
	 * }); $('#advanceSearchGo').click(function() { if ($('#article').val() == "" &&
	 * $('#queryId').val() == "") { $('#statMsg').text('Please enter keyword to
	 * lookup'); $("#statMsgDiv").removeClass('tableTitle nodataMessage');
	 * $("#statMsgDiv").addClass('tableTitle errorDiv');
	 * $(".tableInfo").removeClass('hideBlock'); $('#statMsgDiv').show(); } else {
	 * $('.statusWrapper').removeClass('hideBlock');
	 * $('#statusImg').removeClass('hideBlock');
	 * //$(".tableInfo").addClass('hideBlock'); $('#statMsgDiv').hide(); } });
	 */
	/* <!-- disable close box function when lookup box is clicked --> */
	$('.popupWrapper').click(function(event) {
		event.stopPropagation();
	});

	/* <!-- method called to close advanced search box in css --> */
	/*
	 * function navigateToDetail(index) { $('#statusImg').removeClass('loading
	 * hideBlock'); $('#statusImg').addClass('loading');
	 * 
	 * $('tr td').addClass('cursorProgress'); $('#index').val(index);
	 * if($('input:checkbox[name=ranged]:checked').val()!=undefined ||
	 * $('input:checkbox[name=ranged]:checked').val()=='Y'){
	 * $('#rangedFlag').val('Y'); }else{ $('#rangedFlag').val('N'); }
	 * 
	 * $('#articleQuerysearch') .attr('action',
	 * 'requestArticleQueryDetail.htm'); $('#articleQuerysearch').submit(); }
	 */

	/*
	 * <!-- Code for Scrolling -->
	 */
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

	$('.backButton').click(function() {
		// window.location.href = "../login/goingHome.htm";
		backtoQueryLookup();

	});

	/**
	 * ********************************************************************************************************order
	 * roster code************************
	 */

	$("#dialog-modal").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 120,
		maxHeight : 600,
		width : 350
	});
	$("#dialog-modal").parent().addClass("popupWrapper");
	$("#dialog-modal1").dialog({
		autoOpen : false,
		modal : true,
		resizable : false,
		minHeight : 200,
		maxHeight : 600,
		width : 700
	});
	$("#dialog-modal1").parent().addClass("popupWrapper");

	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');

	/**
	 * ********************************ONPAGELOAD DATE IS SET TO TODAYS
	 * DATE*******************************
	 */

	var today = new Date();
	/*
	 * var newDate = today.getDate(); var newMonth = today.getMonth() + 1; if
	 * (newDate < 10) { newDate = '0' + newDate; } if (newMonth < 10) { newMonth =
	 * '0' + newMonth; } var presentDate = (newDate + "/" + (newMonth) + "/" +
	 * today.getFullYear()); $('#to,#from').val(presentDate);
	 */

	/** **************************************************************************************************** */

	$('#verifyUser')
			.click(
					function() {
						if ($('#submitBy').val() == "") {
							if ($('#dialog-modal-user').dialog('isOpen')) {
								$('#DescriptionTableTitle1').text('');
								$('#DescriptionTableTitle1').text(
										'Please fill the user id/name.');
							} else {
								showAlert('Please fill the user id/name.');
								$('#submitBy').focus();
							}
						} else {
							$
									.ajax({
										data : {
											submitBy : $('#submitBy').val()
										},
										url : "verifyUser.htm",
										type : "get",

										beforeSend : function() {
											hideContent();
											startLoading();
										},
										success : function(response) {
											var option = $("<h4>").html(
													response).find("#option")
													.val();
											// alert(option);
											if (option == 'multiple') {
												$('#popupUserData').html(
														response);
												$("#dialog-modal-user").dialog(
														'open');
											} else if (option == 'single') {
												var userName = $("<h4>").html(
														response).find(
														"#userName0").text();
												var userId = $("<h4>").html(
														response).find(
														"#userId0").text();
												userName = userId + ' - '+userName; // added for RC portal change
												if ($('#dialog-modal-user')
														.dialog('isOpen')) {
													$('#dialog-modal-user')
															.dialog('close');
												}
												$('#submitBy').val(userName);
												// $('#number').click();
												// advanceSearchGo();

											} else if (option == 'noData') {
												if ($('#dialog-modal-user')
														.dialog('isOpen')) {
													$('#DescriptionTableTitle1')
															.text('');
													$('#DescriptionTableTitle1')
															.text(
																	'Sorry, no results found for your search criteria. Please try again');
												} else {
													showAlert('Sorry, no results found for your search criteria. Please try again');
												}
											}
											stopLoading();
										},
										error : function() {
										goToLogin();
										}
									});
						}

					});
	$("#user_goBtn").click(
			function() {

				if ($('#userField').val() == '') {
					$('#DescriptionTableTitle1').text(
							'Please enter a keyword to lookup.');
					$('#userField').focus();
					$('#popupuserData .ContentTableWrapper').html('');
					// $('#popupuserData #DescriptionTableTitle1').html('');
				} else {
					$('#popupuserData .ContentTableWrapper').html('');
					$('#popupuserData #DescriptionTableTitle1').html('');
					$('#submitBy').val($('#userField').val());
					// getDescriptionDetail();
					$('#verifyUser').click();
					// $('#sohSearch').click();
				}

			});
	// Code for tooltip
	$('.rowMoreInfo').tooltip();

	// checks radio buttons in Source of Supply
	$('#number,#description,#reference').click(function() {

		setTimeout(function() {
			$('#article').focus();
		}, 500);
	});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3",
		collapsible : true,
		heightStyle : "content"
	});

	// Code for profile menu
	$("#menu").menu({
		position : {
			my : "right top",
			at : "right top+20"
		}
	});

	// Code for input box default text handling
	/*
	 * $('.textbox').focus(function() { if ($(this).val() ==
	 * $(this).attr('defaultVal')) { $(this).val('');
	 * $(this).removeClass("textboxDefaultText"); } });
	 * 
	 * $('.textbox').blur(function() { if ($(this).val() == '') {
	 * $(this).val($(this).attr('defaultVal'));
	 * $(this).addClass("textboxDefaultText"); } });
	 */

	// Code for calndar control
	/*
	 * $(".inputDate").datepicker({ zIndex : 50 });
	 */

	/*
	 * Code to - Close accordion when report is generated - Show results
	 * 
	 * Need to write a code by developer to handle a case when there is no data.
	 * The accordion in this case should remain open
	 */

	$("#tabs").tabs();
	var click = true;

	$('#closeLink').click(function() {
		closeAccordian();
	});
});
function getQuery(url, data) {
	$
			.ajax({
				data : data,
				url : url,
				type : "post",

				beforeSend : function() {
					hideContent();
					startLoading();
				},
				success : function(response) {
					var option = $("<h4>").html(response).find("#option").val();
					var givenMsg = $("<h4>").html(response).find("#givenMsg")
							.val();
					var detail = $("<h4>").html(response).find("#totalResult")
							.val();
					var totalSize = "";
					if (option == 1) {
						totalSize = detail.split('-')[0];
						normalResult(totalSize, response);
						closeAccordian();
					} else if (option == 2) {
						totalSize = detail.split('-')[2];
						currentPage = detail.split('-')[1];
						recordCount = detail.split('-')[2];
						closeAccordian();
						paginatedResult(response, totalSize);

					} else if (option == 4) {
						showError(givenMsg);
					} else {
						showWarning('Sorry, no results found for your search criteria. Please try again');
					}
					stopLoading();
				},

				error : function() {
					goToLogin();
				}
			});
}
function callFrom() {
	$('#dialog-modalUser').dialog('close');
	setTimeout(function() {
		$('#from').focus();
	}, 200);
}
function goToLogin() {
	window.location.href = "../../";
}
function paginatedResult(response, size) {
	$(".paginationWrapper").removeClass('hideBlock');
	$('.paginationDiv').pagination({
		items : recordCount,
		itemsOnPage : 20,
		cssStyle : 'compact-theme',
		currentPage : currentPage,
		onPageClick : function(pageNumber) {
			getQuery("getQueryListForPagination.htm", {
				pageNo : pageNumber
			});

		}
	});
	$('.ContentTable').remove();
	$('.tableStart').after(response);
	$('#totalRecord').text(size);
	$("#errorMsgDiv").addClass("hideBlock");
	$(".tableStart,.tableFooter,.totalRecord,.legentClass").removeClass(
			"hideBlock");
	$('.paginationDiv').show();
	if (size.trim() == 1)
		{
		//$('.records-list').first().click();
		}
		

}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function noDataFound() {
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorContent").removeClass("hideBlock");
	$('#errorMsg')
			.text(
					'Sorry, no results found for your search criteria. Please try again');
	
}
function normalResult(size, response) {
	$('.ContentTable').remove();
	$('.tableStart').after(response);
	$('#totalRecord').text(size);
	// $('.paginationDiv').removeClass('simple-pagination');
	$("#errorMsgDiv").addClass("hideBlock");
	$(".tableStart,.tableFooter,.totalRecord,.legentClass").removeClass(
			"hideBlock");
	$('.paginationDiv').hide();
	if (size.trim() == 1) {
		//$('.records-list').first().click();
		var queryId = $('.records-list').first().find('td').first().text()
				.trim();
		index = 0;
		navigateToDetail(queryId, index);
	}
}
function showWarning(text) {
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.ContentTable').remove();
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass('hideBlock');
	$('.paginationDiv').hide();
}
function showError(text) {
	$('#errorMsg').text(text);
	$('.ContentTable').remove();
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	// $('.paginationDiv').removeClass('simple-pagination');
	$(".tableFooter,.totalRecord").addClass("hideBlock");
	$('.paginationDiv').hide();
}
function hideContent() {
	$(".tableStart,.tableFooter").addClass('hideBlock');
	$('.ContentTable').remove();
}
function closeAccordian() {
	$(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
}
function navigateToDetail(queryId, index) {
	console.log("queryId ++ "+ queryId);
	$.ajax({
		data : {
			queryId : queryId,
			index : index
		},
		url : "requestArticleQueryDetail.htm",
		type : "get",

		beforeSend : function() {
			// hideContent();
			startLoading();
		},
		success : function(response) {
			showQueryDetail(response);
			stopLoading();
		},
		error : function() {
			//goToLogin();
			console.log("inside Error");
		}
	});
}
function showQueryDetail(response) {
	$('.lookup,.lookupContent').addClass('brudcrumHide');
	$('.detailsContent').removeClass('brudcrumHide');
	//$('.lookup').after(response);
	$('.queryDetailsContent').addClass('hideBlock').removeClass('hideBlock');
	$('.queryDetailsContent').html(response);
}
function backtoQueryLookup(response) {
	$('.lookup,.lookupContent').removeClass('brudcrumHide');
	$('.detailsContent').addClass('brudcrumHide');
	$('.queryDetailsContent').removeClass('hideBlock').addClass('hideBlock');
	$('.queryDetailsContent').html('');
	//$('.lookup').next().remove();
}
function selectItem(id, article, uom) {
	$('#dialog-modal2').dialog('close');
	$('#article').val(article);
	$('#articleUom').val(uom);
	$('#number').click();
	// advanceSearchGo();
	var formData = $('#viewQuery').serialize();
	// formData=formData+"&uom="+uom;
	getQuery("getQueryList.htm", formData);

}
function showAlert(msg) {
	$("#errorMsgDiv,.tableStart").addClass('hideBlock');
	$('.ContentTable').remove();
	$(".tableFooter,.totalRecord").addClass('hideBlock');
	$('#dialog-modalUser').dialog('open');
	$('#alertBox').text(msg);
	if($('.advancedSearchFormatWrapper').hasClass('hideBlock')){
		$('#advLink1').click();
		}
}
function selectUser(id) {
	$('#dialog-modal-user').dialog('close');
	$('#submitBy').val($(('#userId').concat(id)).text() + ' - '+$(('#userName').concat(id)).text());
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
function advanceSearchGo() {
	$('#reportContent #errorMsg').html("");
	$('#reportContent .tableInfo.no-data-message,#reportContent .nodataMessage,#reportContent .tableTitle.totalRecord').addClass('hideBlock');
	var articleNo = $('#article').val().trim();
	var queryId = $('#queryId').val().trim();
	var submitBy = $('#submitBy').val().trim();
	var queryStatus = $('#queryStatus').val().trim();
	var articleType = $(':input:radio[name="searchByOptions"]:checked').val()
			.trim();
	var advaceTab=$('#advanceTab').val();

	var fromDate = formateDate($('#from').val());
	var date1 = new Date(fromDate.split('/')[1] + '/' + fromDate.split('/')[0]
			+ '/' + fromDate.split('/')[2]);

	var toDate = formateDate($('#to').val());
	var date2 = new Date(toDate.split('/')[1] + '/' + toDate.split('/')[0]
			+ '/' + toDate.split('/')[2]);

	if ((advaceTab == "N" || advaceTab == "Y") && articleNo == ""
			&& queryId == "" && submitBy == "" && queryStatus == "Select"
			&& fromDate == "") {
		showError('Please enter an article.');
		$('#article').focus();
		closeAdvSearchClasses(false);
	} else if ((articleType.toLowerCase() == "number" || articleType
			.toLowerCase() == "reference")
			&& articleNo != "" && !($.isNumeric(articleNo))) {
		if (articleType.toLowerCase() == "number")
			showError('Please enter a valid article number.');
		else
			showError('Please enter a valid EAN/TUN/PLU number.');
		$('#article').focus();
		closeAdvSearchClasses(false);
	} else if (queryId != "" && !($.isNumeric(queryId))) {
		showError('Please enter a valid Query ID.');
		$('#queryId').focus();
		closeAdvSearchClasses(false);
	} else if (articleType.toLowerCase() == "description" && articleNo != "") {
		getDescriptionDetail(articleNo);
		closeAdvSearchClasses(false);
	} else if (fromDate!='' && date1 == 'Invalid Date') {
		showAlert('Invalid From Date.', 'dialog-forgotWizard');
		$('from').focus();
	} else if (fromDate != "" && toDate == "") {
		showAlert('Please enter To Date.');
		$('to').focus();
	} else if (fromDate == "" && toDate != "") {
		showAlert('Please enter From Date.');
		$('to').focus();
	}else if (toDate!='' && date2 == 'Invalid Date') {
		showAlert('Invalid To Date.');
		$('to').focus();
	} else if ((toDate!='' && fromDate!='') && date1 > date2) {
		showAlert('To Date should not be lesser than the From Date');
		$('to').focus();
	} else if ((advaceTab == "N" || advaceTab == "Y") && articleNo == ""
			&& queryId != "" && submitBy == "" && queryStatus == "Select"
			&& fromDate == "") {
		var formData = $('#viewQuery').serialize();
		// formData=formData+"&uom="+uom;
		getQuery("getQueryList.htm", formData);
	} else {
		if (articleNo != "" && (articleType.toLowerCase() == "number" || articleType
			.toLowerCase() == "reference" )) {// for article search with EAN
			getDescriptionDetail(articleNo);
		} else {
			var formData = $('#viewQuery').serialize();
			// formData=formData+"&uom="+uom;
			getQuery("getQueryList.htm", formData);
		}
		closeAdvSearchClasses(false);
		// closeAdvSearchClasses(false);
	}

}
function closeAdvSearchClasses(status) {

	$("#advDiv").removeClass('advancedParam');
	$("#advDiv").addClass('advancedParam hideBlock');

	$("#advWrapper").removeClass('advancedSearchFormatWrapper');
	$("#advWrapper").addClass('advancedSearchFormatWrapper hideBlock');

	$("#closeLink").removeClass('linkBtn');
	$("#closeLink").addClass('linkBtn hideBlock');

	$("#advLink1").show();
	if (status) {
		$('#advanceTab').val('N');
		$("#queryStatus").val("Select");
		$("#submitBy").val("");
		$("#from").val("");
	}
}
function getDescriptionDetail(articleDesc) {
	var data = $('#viewQuery').serialize();
	$.ajax({
		data : data, /*
						 * { searchByOptions : "Description", articleNo :
						 * articleDesc },
						 */
		url : "searchArticle.htm",
		type : "post",
		beforeSend : function() {
			hideContent();
			startLoading();
		},
		success : function(response) {
			var option = $("<h4>").html(response).find("#option").val();
			stopLoading();

			if (option == 1) {
				$('#popupDataDiv2').html(response);
				if ($('.article-result').length == 1) {
					var articleNo = $("<h4>").html(response).find(
							'.article-result td').first().text().trim();
					var uom = $("<h4>").html(response).find(
							'.article-result td').first().next().next().text()
							.trim();
					if ($('#dialog-modal2').dialog('isOpen')) {
						$('#dialog-modal2').dialog('close');
					}
					/*
					 * $('#article').val(articleNo); $('#number').click();
					 * advanceSearchGo();
					 */

					$('#article').val(articleNo);
					$('#articleUom').val(uom);
					$('#number').click();
					// advanceSearchGo();
					var formData = $('#viewQuery').serialize();
					// formData=formData+"&uom="+uom;
					getQuery("getQueryList.htm", formData);

				} else if($('.article-result').length > 1) {
					$('#dialog-modal2').dialog('open');
				}
				else{
					$('#reportContent #errorMsg').html("Sorry, no results found for your search criteria. Please try again");
					$('#reportContent .tableInfo.no-data-message,#reportContent .nodataMessage').removeClass('hideBlock');
					$('#paginationDiv1').addClass('hideBlock');//defect 14628
				}
			} /*
				 * else if (option == 2) { }
				 */
		},
		error : function(response) {
			goToLogin();
			// $('#content').html(
			// "Some error occured");

		}
	});
	// closeAdvSearchClasses(false);
}
function backToSubmitQueryPage()
{
	window.location.href = "../AQMInitiateQuery/onPageLoad.htm";
}