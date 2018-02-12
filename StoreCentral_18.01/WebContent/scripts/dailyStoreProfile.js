$(document)
		.ready(
				function() {
					$(document).keypress(function(event) {
						if (event.which == 13) {
							event.preventDefault();
							$('#generateReport').click();
						}
					});
$('#closeLink').click(function(){
	closeAccordian();
});
					var recordCount;
					var currentPage;
					var recentProfileDate = $('#recentProfileDate').val().trim(); 

					$("#errorMsgDiv").addClass('tableTitle nodataMessage');
					$("#errorMsgDiv").removeClass('tableTitle errorDiv');

					$('#backBtn').click(function() {
						window.location.href = "../login/goingHome.htm"
					});
					/**
					 * *************************** code for alert box
					 * *******************
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

					/**
					 * *************************** end of alert box
					 * code*******************
					 */

					/**
					 * **** code for setting default date on wc dated
					 * field****************
					 */
					var date = new Date();
					var newDate = date.getDate();
					var newMonth = date.getMonth() + 1;
					if (newDate < 10) {
						newDate = '0' + newDate;
					}
					if (newMonth < 10) {
						newMonth = '0' + newMonth;
					}
					var presentDate = (newDate + "/" + (newMonth) + "/" + date
							.getFullYear());
					$('#store').val(presentDate);
					//wcDate(presentDate);
					/**
					 * **** end of code for setting default date on wc dated
					 * field****************
					 */

					// Code for tooltip
					$('.rowMoreInfo').tooltip();

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

					// Code for calndar control
					$(".inputDate").datepicker({
						zIndex : 50
					});

					/*
					 * Code to - Close accordion when report is generated - Show
					 * results
					 * 
					 * Need to write a code by developer to handle a case when
					 * there is no data. The accordion in this case should
					 * remain open
					 */
					/** ***** code for generate button click******************** */

					$('#generateReport')
							.click(
									function() {
										hideError();
										/*
										 * if ($('.selectOptions').val() ==
										 * "Select") { showError('Please select
										 * department.'); //callFrom(); }
										 */
										var toDate = formateDate($('#store').val());
										var date2 = new Date();
										var part = toDate.split('/');
										var partLen = part.length;
										var date2Len = toDate.length;
										date2.setFullYear(part[2], part[1] - 1, part[0]);
										
										if ($('#store').val() == '') {
											showError('Please enter Date');
											callFrom();
										} else if (toDate.split('/').length != 3
												|| toDate.length != 10
												|| toDate.split('/')[0] > 31
												|| toDate.split('/')[1] > 12
												|| toDate.split('/')[2].length != 4) {
											showError('Please enter valid Date');
											callFrom();
										} else if (wcDate()) {
											showError('Please enter dates of present or future week.');
											callFrom();
										} else {
											var formData = $(
													'#dailyStoreProfileForm')
													.serialize();
											getDailyStoreProfileReport(
													"getDailyStoreProfileReport.htm",
													formData);
										}
									});

					/**
					 * ***** end of code for generate button
					 * click********************
					 */

					$("#tabs").tabs();

					/*$('#store')
							.change(
									function() {
										if ($('#store').val() == '') {

										} else if ($('#store').val().split('/').length != 3
												|| $('#store').val().length != 10
												|| $('#store').val().split('/')[0] > 31
												|| $('#store').val().split('/')[1] > 12
												|| $('#store').val().split('/')[2].length != 4) {

										} else {
											//wcDate();
										}
									});*/
					
					if(recentProfileDate != null && recentProfileDate != "" && recentProfileDate != undefined)
					{
					console.log(recentProfileDate);
					$('#store').val(recentProfileDate);
					setTimeout(function()
							{
						var formData = $(
						'#dailyStoreProfileForm')
						.serialize();
				getDailyStoreProfileReport(
						"getDailyStoreProfileReport.htm",
						formData);
							},50);
					}
					else
						{
						$('#store').val(presentDate);
						}

				});
/** **************code to select monday date on wc date change********* */
function wcDate() {
	var mydate =formateDate($('#store').val());
	var date1 = new Date();
	var parts = mydate.split('/');
	date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
	//var saleOrg=$('#saleOrg').val();
	/*if(saleOrg=='1020'){*/
	/*if (date1.getDay() == '0') {
		date1.setTime(date1.getTime() + (86400000));
	} else if (date1.getDay() == '1') {
		date1.setTime(date1.getTime());
	} else if (date1.getDay() == '2') {
		date1.setTime(date1.getTime() - (86400000));
	} else if (date1.getDay() == '3') {
		date1.setTime(date1.getTime() - (86400000 * 2));
	} else if (date1.getDay() == '4') {
		date1.setTime(date1.getTime() - (86400000 * 3));
	} else if (date1.getDay() == '5') {
		date1.setTime(date1.getTime() - (86400000 * 4));
	} else if (date1.getDay() == '6') {
		date1.setTime(date1.getTime() - (86400000 * 5));
	}*/
	/*}
	else if(saleOrg=='1005'){
		if (date1.getDay() == '0') {
			date1.setTime(date1.getTime() + (86400000*3));
		} else if (date1.getDay() == '1') {
			date1.setTime(date1.getTime() + (86400000*2));
		} else if (date1.getDay() == '2') {
			date1.setTime(date1.getTime() + (86400000*1));
		} else if (date1.getDay() == '3') {
			date1.setTime(date1.getTime());
		} else if (date1.getDay() == '4') {
			date1.setTime(date1.getTime() - (86400000 * 1));
		} else if (date1.getDay() == '5') {
			date1.setTime(date1.getTime() - (86400000 * 2));
		} else if (date1.getDay() == '6') {
			date1.setTime(date1.getTime() - (86400000 * 3));
		}
	}
	else {
		if (date1.getDay() == '0') {
			date1.setTime(date1.getTime() + (86400000*4));
		} else if (date1.getDay() == '1') {
			date1.setTime(date1.getTime() + (86400000*3));
		} else if (date1.getDay() == '2') {
			date1.setTime(date1.getTime() + (86400000*2));
		} else if (date1.getDay() == '3') {
			date1.setTime(date1.getTime() + (86400000*1));
		} else if (date1.getDay() == '4') {
			date1.setTime(date1.getTime());
		} else if (date1.getDay() == '5') {
			date1.setTime(date1.getTime() - (86400000 * 1));
		} else if (date1.getDay() == '6') {
			date1.setTime(date1.getTime() - (86400000 * 2));
		}
	}*/
	var newDate = date1.getDate();
	var newMonth = date1.getMonth() + 1;
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var date = new Date();

	var date7 = (newDate + "/" + (newMonth) + "/" + date1.getFullYear());
	$('#store').val(date7);

	if(date.getTime()>date1.getTime())
		return true;
	else
		return false;
//	return(date7);
	

}

/** **************end of code to select monday date on wc date change********* */

/** ***** code for focus on wc date field************ */
function callFrom() {
	//$('#dialog-modal').dialog('close');
	setTimeout(function() {
		$('#store').focus();
	}, 200);
}
/** ***** end of code for focus on wc date field************ */

/** ***** code for focus on department field************ */
function callDept() {
	$('#dialog-modal').dialog('close');
	setTimeout(function() {
		$('.selectOptions').focus();
	}, 200);
}
/** ***** end of code for focus on department field************ */

function getDailyStoreProfileReport(url, data) {
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
					var detail = $("<h4>").html(response).find("#totalResult")
							.val();
					var dates= $("<h4>").html(response).find(".dates")
					.val();
					var totalSize = "";
					if (option == 1) {
						totalSize = detail.split('-')[0];
						normalResult(totalSize, response);
						closeAccordian();
					} else if (option == 2) {
						totalSize = detail.split('-')[0];
						currentPage = detail.split('-')[1];
						recordCount = detail.split('-')[2];
						closeAccordian();
						paginatedResult(response, totalSize);

					} else {
						showWarning('Sorry, no results found for your search criteria. Please try again');
					}
					if(dates!=undefined){
						$('#fromDate').text(dates.split('_')[0]);
						$('#toDate').text(dates.split('_')[1]);
					}
					stopLoading();
				},
				error : function() {
					// goToLogin();
				}
			});
}
/*function callFrom() {
	setTimeout(function() {
		$('#from').focus();
	}, 200);
}
function callTo() {
	$('#dialog-modal').dialog('close');
	setTimeout(function() {
		$('#to').focus();
	}, 200);
}*/
function goToLogin() {
	window.location.href = "../../";
}
function paginatedResult(response, size) {
	$(".paginationWrapper").removeClass('hideBlock');
	$('.paginationDiv').pagination(
			{
				items : recordCount,
				itemsOnPage : 20,
				cssStyle : 'compact-theme',
				currentPage : currentPage,
				onPageClick : function(pageNumber) {
					getDailyStoreProfileReportForPagination(
							"getDailyStoreProfileReportForPagination.htm", {
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
}
function closeAccordian() {
	$("#errorMsgDiv").addClass("hideBlock");
	$(".ContentTableWrapper").removeClass('hideBlock');
	$('#accordion').accordion({
		active : true
	});
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
function hideError(){
	$("#errorMsgDiv").addClass("hideBlock");
}