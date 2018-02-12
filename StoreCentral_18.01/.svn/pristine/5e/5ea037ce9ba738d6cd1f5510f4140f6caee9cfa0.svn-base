var recordCount;
var currentPage;
var prevResVoid = '';
var prevRes='';
var voidsTotPages;
var refundsTotPages;
var voidsCurrPg;
var refundsCurrPg;
visibleCtrls = 'input[name="transactionType"]:checked,input[name="dateFrom"],input[name="dateTo"]';
hiddentCtrls = 'input[name="transactionTypeHdn"],input[name="dateFromHide"],input[name="dateToHide"]';
allInputCtrls = 'input[name="transactionType"],input[name="dateFrom"],input[name="dateTo"]';

var NDF="Sorry, no results found for your search criteria. Please try again.";
var error_1pos = '<div class="ContentTableWrapper errorCon " style="overflow: visible;"><div class="tableInfo tableInfoError  tableStart">'
		+ '<div class="tableTitle msgDiv nodataMessage  errorDiv" id="errorMsgDiv"><h4 id="errorMsg"></h4></div></div></div>';
$(function() {

	var today = new Date();

	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
		/*onClose : function(selectedDate) {
			// $( "#dateTo" ).focus();
		}*/

	});
	$('a[href="#mainTabs-2"]').parent().click(function() {
		/*var lisObj = $("#paginationDiv4").children("ul").children("li").children("span");
		var pgNo = 1;
		lisObj.each(function( index ) {
			if($(this).hasClass("current")&& (!$(this).hasClass("next") && !$(this).hasClass("prev"))) {
				console.log("list obj html : "+$(this).html());
				pgNo = $(this).html();
			}
			else {
				console.log("absolutl chuker");
			}
		});
		pagenationCallbackMethod(pgNo);*/
		pagenationCallbackMethod(refundsCurrPg);
	});
	$('a[href="#mainTabs-1"]').parent().click(function() {
		/*var lisObj = $("#paginationDiv2").children("ul").children("li").children("span");
		var pgNo = 1;
		lisObj.each(function( index ) {
			if($(this).hasClass("current")&& (!$(this).hasClass("next") && !$(this).hasClass("prev"))) {
				console.log("list obj html : "+$(this).html());
				pgNo = $(this).html();
			}
			else {
				console.log("absolutl chuker");
			}
		});
		pagenationCallbackMethod(pgNo);*/
		pagenationCallbackMethod(voidsCurrPg);
	});

	$('#voidFilterOpen').click(function() {
		$('#voidFilterOpen').addClass('hideBlock');
		$('#voidFilterClear').removeClass('hideBlock');
		showVoidFilter();
	});
	$('#voidFilterClear').click(function() {
		$('#voidFilterOpen').removeClass('hideBlock');
		$('#voidFilterClear').addClass('hideBlock');
		hideVoidFillter();
	});

	$('#refunfFilterOpen').click(function() {
		$('#refunfFilterOpen').addClass('hideBlock');
		$('#refundFilterClear').removeClass('hideBlock');
		showRefundFilter();
	});
	$('#refundFilterClear').click(function() {
		$('#refunfFilterOpen').removeClass('hideBlock');
		$('#refundFilterClear').addClass('hideBlock');
		hideRefundFillter();
	});

	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
	});
	$("#dateTo").datepicker({
		maxDate : today
	});

	$("#tabs").tabs();
	$('.refundTbl').parent().css('width', '1300px');

	// code for table sorter
	//$('#reportContent').removeClass('hideBlock');
	$('#mainTabs-1 .ContentTableWrapper').removeClass('hideBlock');
	$(".voidTbl tbody:first").html('');
	$(".voidTbl").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#mainTabs-1 .ContentTableWrapper').addClass('hideBlock');
	$(".voidTbl").addClass('hideBlock');

	//$('#reportContent').removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper').removeClass('hideBlock');
	$(".refundTbl tbody:first").html('');
	$(".refundTbl").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});
	$('#mainTabs-2 .ContentTableWrapper').addClass('hideBlock');
	$(".refundTbl").addClass('hideBlock');

	
	$( "#item" ).on( "click", function() {
		//$( "#voidFilterClear" ).trigger( "click" );
		});
		
	$( "#tra" ).on( "click", function() {
		//$( "#voidFilterClear" ).trigger( "click" );
		});
	$( "#all" ).on( "click", function() {
		//$( "#voidFilterClear" ).trigger( "click" );
		});
	
	var newDate = today.getDate();
	var newMonth = today.getMonth() + 1;
	if (newDate < 10) {
		newDate = '0' + newDate;
	}
	if (newMonth < 10) {
		newMonth = '0' + newMonth;
	}
	var presentDate = (newDate + "/" + (newMonth) + "/" + today.getFullYear());
	$('#dateTo').val(presentDate);

	var previousDate = new Date();
	previousDate.setTime(previousDate.getTime() - (60 * 60 * 24 * 1000));

	var newPrevDate = previousDate.getDate();
	var newPrevMonth = previousDate.getMonth() + 1;

	if (newPrevDate < 10) {
		newPrevDate = '0' + newPrevDate;
	}
	if (newPrevMonth < 10) {
		newPrevMonth = '0' + newPrevMonth;
	}

	var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate
			.getFullYear());
	$('#dateFrom').val(oneDayBefCurDate);

	$('.reportWrapper .ContentTableWrapper').css('overflow', 'visible');

	$('#mainTabs-1').click(
			function(event) {

				$('.voidscrollTableContainer  .voidscrollWindow').css(
						'overflow', 'hidden');
				$('.voidscrollTableContainer  .voidscrollWindow').css('width',
						'1271px');
			});

	$('#mainTabs-1 #next-column_void').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#mainTabs-1 #previous-column_void').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});

	$('#mainTabs-2 #next-column_refund').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#mainTabs-2 #previous-column_refund').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});

	$("#generateReport")
			.click(
					function() {
						$("#voidTblSortAttr").val('');
						$("#refundTblSortAttr").val('');
						hideError();
						hideContent();
						prevRes='';
						$('#refunfFilterOpen').removeClass('hideBlock');
						$('#refundFilterClear').addClass('hideBlock');
						
						$('#voidFilterOpen').removeClass('hideBlock');
						$('#voidFilterClear').addClass('hideBlock');
						try
						{
							hideVoidFillter();
						}
						catch(err){
						console.log(err);
						}
						try{
						hideRefundFillter();
						}
						catch(err){
						console.log(err);
						}
						hideContent();
						var fromDate = formateDate($('#dateFrom').val());
						var toDate = formateDate($('#dateTo').val());
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
						date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
						var newTime = Number(date1.getTime());

						var dateComFrom = new Date(fromDate.split('/')[2],
								fromDate.split('/')[1], fromDate.split('/')[0]);
						var dateComTo = new Date(toDate.split('/')[2], toDate
								.split('/')[1], toDate.split('/')[0]);
						var toYear = dateComTo.getFullYear();
						var fromYear = dateComFrom.getFullYear();
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
						date2.setFullYear(part[2], part[1] - 1, part[0]);

						var splittedDate = formateDate($('#dateTo').val(),
								$('#dateTo').val().split('/').length)
								.split('/');
						var splittedTwo = splittedDate[0] + splittedDate[1]
								+ splittedDate[2];

						newTime = Number(newTime)
								+ Number(24 * 60 * 60 * 1000 * 90);

						if (fromDate == "") {
							showError('Please enter From Date.');
							callFrom();
						} else if (toDate == "") {
							showError('Please enter To Date.');
							callTo();
						} else if (partsLen != 3 || date1Len != 10
								|| fromDate.split('/')[0] > 31
								|| fromDate.split('/')[1] > 12
								|| fromDate.split('/')[2].length != 4) {
							showError('Invalid From Date.');
							callFrom();
						} else if (partLen != 3 || date2Len != 10
								|| toDate.split('/')[0] > 31
								|| toDate.split('/')[1] > 12
								|| toDate.split('/')[2].length != 4) {
							showError('Invalid To Date.');
							callTo();
						} else if (date1.getTime() > date2.getTime()) {
							showError('To Date should not be lesser than the From Date');
							callTo();
						} else if ((splittedDate[0] > 31
								|| splittedDate[1] > 12 || splittedDate[2] > 9999)
								|| isNaN(splittedTwo)) {

							showError("Invalid Date Format");
						} 
						else if(days >6){
							showError('Date Range is more than one week.');
							callFrom();
						}else if (rangeDate > curDate) {
							showError("Future Dates are not allowed for To Date.");
							callTo();
						}

						else if ((toYear - fromYear) == 1) {
							if (((toMonth - fromMonth) + 12) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if ((((toMonth - fromMonth) + 12) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else {
								$(
										'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
										.removeClass('hideBlock');
								$('#reportContent').removeClass('hideBlock');
								articlePOS();
								//articleRefund($('#articleRefund').serialize());
							}
						} else if (toYear - fromYear == 0) {
							if ((toMonth - fromMonth) > 3) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else if (((toMonth - fromMonth) == 3)
									&& (((toDay - fromDay) + 30) > 30)) {
								showError('Date difference should not be greater than 3 months');
								callFrom();
							} else {
								//articleRefund($('#articleRefund').serialize());
								articlePOS();
							}
						} else if ((toYear - fromYear) >= 2) {
							showError('Date difference should not be greater than 3 months');
							callFrom();
						}

						else {
							//articleRefund($('#articleRefund').serialize());
							articlePOS();

						}// hideError();

					});

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	$("#closeLink").click(function() {
		hideError();
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

	$('input[name="filterRadio"]').click(function() {
		articleVoidRefund(prevRes, '','filter');
	});

});
function showOldRefundSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		articleRefundContent(prevRes, '');
}
function showOldVoidSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		articleVoidRefund(prevRes, '','');
}

function articlePOS() {
	if ($('#mainTabs').hasClass('ui-tabs'))
		$('#mainTabs').tabs('destroy');

	$('#mainTabs').tabs();

	$('li[aria-controls="mainTabs-1"],li[aria-controls="mainTabs-2"]')
			.removeClass('hideBlock');
	if ($('input[name="transactionType"]:checked').val() == 'Voids') {
		$("#mainTabs").tabs("option", "active", 0);
		$('li[aria-controls="mainTabs-2"]').addClass('hideBlock');
		articleVoid($('#articleRefund').serialize());
	} else if ($('input[name="transactionType"]:checked').val() == 'Refunds') {
		$("#mainTabs").tabs("option", "active", 1);
		$('li[aria-controls="mainTabs-1"]').addClass('hideBlock');
		articleRefund($('#articleRefund').serialize());
	} else if ($('input[name="transactionType"]:checked').val() == 'Both') {
		$("#mainTabs").tabs("option", "active", 0);
		articleVoidAndRefund($('#articleRefund').serialize());
	}
}
function articleRefund(data) {

	backupInputParams();
	$.ajax({
		type : "get",
		url : "getArticleRefundDtl.htm",
		data : data,

		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			hideError();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
		
			refundsuccessResponse(response);
			
			
			if ($('input[name="transactionType"]:checked').val() == 'Both') {
				showArticleTbl();
			}
			//printResult(response);
			//stopLoading();
			$.loader('close'); 
			setScrollerPosition($("#sortTable"), $("#previous-column_refund"), $("#next-column_refund"));
		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			//stopLoading();
			$.loader('close');
		}
	});

}
function articleVoidAndRefund(data) {

	backupInputParams();
	$.ajax({
		type : "get",
		url : "getArticleVoidAndRefundDtl.htm",
		data : data,

		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			hideError();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			
			
			
			successResponse(response, '');
			refundsuccessResponse(response, '');
			if ($('input[name="transactionType"]:checked').val() == 'Both') {
				showArticleTbl();
			}
			$.loader('close');
			setScrollerPosition($("#treetable"), $("#previous-column_void"), $("#next-column_void"));

		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
		}
	});

}
function articleVoid(data) {

	backupInputParams();
	$.ajax({
		type : "get",
		url : "getArticleVoidDtl.htm",
		data : data,

		beforeSend : function() {
			//startLoading();
			fullScreenLoader();
			hideError();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			
			
			
			successResponse(response, '');
			if($("#voidTypeHdn").val()=="Article") {
				//$("#item").prop("checked", true);
				$("#item").trigger('click');
				$( "#voidFilterClear" ).trigger( "click" );
			}
			else if($("#voidTypeHdn").val()=="Transaction") {
				//$("#tra").prop("checked", true);
				$("#tra").trigger('click');
				$( "#voidFilterClear" ).trigger( "click" );
			}
			$.loader('close');
			setScrollerPosition($("#treetable"), $("#previous-column_void"), $("#next-column_void"));

		},
		error : function() {
			showError('Technical issue occurred. Due to service unavailability.');
			$.loader('close');
		}
	});

}
function refundsuccessResponse(response) {

	var msg = '';
	var output = '';

	output = $.parseJSON(response);
	msg = output.refundList.msg;
	var refndlst = output.refundList.refundList;
	hideError();

	if (msg != null && msg != undefined && !isNaN(msg) && msg==''
			&& refndlst != null && refndlst != undefined
			&& refndlst.length > 0) {
		$('#mainTabs-2 .errorCon').remove();
		setReportGenerationFlags();
		articleRefundContent(response, '');

	} else {
		if (msg == 'null'  || msg=='' ||(  refndlst!=null && refndlst!=undefined && refndlst.length>0 
				&& (refndlst[0].article== null || refndlst[0].article==undefined || refndlst[0].article=='')))
			if ($('input[name="transactionType"]:checked').val() == 'Both') {
				$('#mainTabs-2 .errorCon').remove();
				$('#mainTabs-2 ').append(error_1pos);
				$('#mainTabs-2 .msgDiv h4').text(NDF);
				$('#mainTabs-2 .msgDiv ').removeClass('errorDiv').addClass(
						'nodataMessage');
				$('.tableActionsBtnsWrapper').addClass('hideBlock');
				if($("#mainTabs-1").length && ($("#mainTabs-1").find("#treetable")==undefined || $("#mainTabs-1").find("#treetable").find("tbody > tr")==undefined || $("#mainTabs-1").find("#treetable").find("tbody > tr").length == 0)) {
					$('.tableActionBtns').addClass('hideBlock');
				}
				
			} else
				showWarning(NDF);
		else if ($('input[name="transactionType"]:checked').val() == 'Both') {
			$('#mainTabs-2 .errorCon').remove();
			$('#mainTabs-2 ').append(error_1pos);
			$('#mainTabs-2 .msgDiv h4').text(msg);
			$('#mainTabs-2 .msgDiv ').removeClass('nodataMessage').addClass(
					'errorDiv');
			$('.tableActionsBtnsWrapper').addClass('hideBlock');
			if($("#mainTabs-1").length && ($("#mainTabs-1").find("#treetable")==undefined || $("#mainTabs-1").find("#treetable").find("tbody > tr")==undefined || $("#mainTabs-1").find("#treetable").find("tbody > tr").length == 0)) {
				$('.tableActionBtns').addClass('hideBlock');
			}
			
		} else {
			showError(msg);
		}
	}
}

function successResponse(response) {
	var msg = '';
	var output = '';

	output = $.parseJSON(response);
	msg = output.voidList.msg;
	var voidall = output.voidList.voidList;
	
	hideError();
	if (msg != null && msg != undefined && !isNaN(msg)
			&& voidall != null && voidall != undefined
			&& voidall.length > 0) {
		$('#mainTabs-1 .errorCon').remove();
		setReportGenerationFlags();
		articleVoidRefund(response, '','');

	} else {
		if (msg == 'null'  || msg=='' || msg==NDF ||(  voidall!=null && voidall!=undefined && voidall.length>0 
				&& (voidall[0].article== null || voidall[0].article==undefined || voidall[0].article==''))) {
			if ($('input[name="transactionType"]:checked').val() == 'Both') {
				$('#mainTabs-1 .errorCon').remove();
				$('#mainTabs-1 ').append(error_1pos);
				$('#mainTabs-1 .msgDiv h4').text(NDF);
				$('#mainTabs-1 .msgDiv ').removeClass('errorDiv').addClass(
						'nodataMessage');
				$('.voidTbl tbody,.voidTbl thead,.paginationDiv').addClass('hideBlock');
				$('.tableActionBtns').addClass('hideBlock');
			} else {
				showWarning(NDF);
			}
		}
		else if ($('input[name="transactionType"]:checked').val() == 'Both') {
			$('#mainTabs-1 .errorCon').remove();
			$('#mainTabs-1 ').append(error_1pos);
			$('#mainTabs-1 .msgDiv h4').text(msg);
			$('#mainTabs-1 .msgDiv ').removeClass('nodataMessage').addClass(
					'errorDiv');
			$('.voidTbl tbody,.voidTbl thead,.paginationDiv').addClass('hideBlock');
			$('.tableActionBtns').addClass('hideBlock');
		} else {
			showError(msg);
		}
	}
}

function articleVoidRefund(response, value,filter) {
	//$('.voidTbl').find('tr :first').addClass('hideBlock');
	var deptSalesTax = '';
	var output = '';
	var voidDate = '';
	var voidTime = '';
	var voidTran = '';
	var voidPoso = '';
	var voidAuth = '';
	//var voidEan = '';
	var voidDesc = '';
	var voidType = '';
	var voidDept = '';
	var voidTota = '';
	var voidArti = '';
	var voidReas = '';
	if ($('.voidFillterHdr') != undefined && $('.voidFillterHdr').length > 0
			&& !$('.voidFillterHdr').hasClass('hideBlock')) {
		voidDate = $('.voidDate').val().toUpperCase();
		voidTime = $('.voidTime').val().toUpperCase();
		voidTran = $('.voidTran').val().toUpperCase();
		voidPoso = $('.voidPoso').val().toUpperCase();
		voidAuth = $('.voidAuth').val().toUpperCase();
		//voidEan = $('.voidEan').val().toUpperCase();
		voidDesc = $('.voidDesc').val().toUpperCase();
		voidType = $('.voidType').val().toUpperCase();
		voidDept = $('.voidDepa').val().toUpperCase();
		voidTota = $('.voidTota').val().toUpperCase();
		voidArti = $('.voidArti').val().toUpperCase();
		voidReas = $('.voidReas').val().toUpperCase();
	}

	output = $.parseJSON(response);
	
	deptSalesTax = output.voidList.voidList;

	currentPage = 1;

	var flag = false;
	/*	if (msg != undefined && msg != null && !isNaN(msg) && deptSalesTax != null
	 && deptSalesTax != undefined) {*/
	recordCount = '';//deptSalesTax.length;
	var content = '';
	var noRec = 0;

	if (deptSalesTax != null) {

		var list = deptSalesTax;
		for ( var i = 0; i < list.length; i++) {
			list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
					: '';
			list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? list[i].transactionNumber
					: '';
			list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article
					: '';
			list[i].article_T = (list[i].article_T != null && list[i].article_T != undefined) ? list[i].article_T
					: '';
			// to be removed
			list[i].ean_upc = (list[i].ean_upc != null && list[i].ean_upc != undefined) ? list[i].ean_upc
					: '';
			list[i].reason = (list[i].reason != null && list[i].reason != undefined) ? list[i].reason
					: '';
			// to be removed
			list[i].department = (list[i].department != null && list[i].department != undefined) ? list[i].department
					: '';
			list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
					: '';
			list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
					: '';
			list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
					: '';
			list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? list[i].posAuthoriser
					: '';
			 
			var voidItem = '';
			if(list[i].transactionRecType != undefined
					&& list[i].transactionRecType != null
					&& list[i].transactionRecType== '1000' && (list[i].transactionType
					.trim() == 'S102' || list[i].transactionType.trim() == 'RT01'))
				voidItem= 'Transaction';
			else if(list[i].transactionRecType != undefined
					&& list[i].transactionRecType != null
					&& list[i].transactionRecType== '1100' && (list[i].transactionType
					.trim() == 'S101' && list[i].salesItemType.trim() == 'S203'))
				voidItem= 'ITEM/LINE';
			list[i].salesRetailIncT = (list[i].salesRetailIncT != null && list[i].salesRetailIncT != undefined) ? list[i].salesRetailIncT
					: '';
			if ((convertDate(list[i].calendarDayTo).indexOf(voidDate) != -1
					&& convertTime(list[i].posTransactionTime).indexOf(voidTime) != -1
					&& list[i].transactionNumber.toUpperCase()
							.indexOf(voidTran) != -1
					&& list[i].article.toUpperCase().indexOf(voidArti) != -1
					&& list[i].article_T.toUpperCase().indexOf(voidDesc) != -1
					//&& list[i].ean_upc.toUpperCase().indexOf(voidEan) != -1
					&& list[i].department.toUpperCase().indexOf(voidDept) != -1
					&& (list[i].cashierFirstName.toUpperCase() + ' ' + list[i].cashierLastName
							.toUpperCase()).indexOf(voidPoso) != -1
					&& list[i].posAuthoriser.toUpperCase().indexOf(voidAuth) != -1
					&& voidItem.toUpperCase().indexOf(voidType) != -1 && list[i].salesRetailIncT
					.toUpperCase().indexOf(voidTota) != -1
					&& list[i].reason.toUpperCase().indexOf(voidReas) != -1
					&& (($('input[name="filterRadio"]:checked').val() == 'art' && voidItem == 'ITEM/LINE')
							||($('input[name="filterRadio"]:checked').val() == 'tra' && voidItem == 'Transaction')
							||($('input[name="filterRadio"]:checked').val() == 'all' && (voidItem == 'ITEM/LINE' || voidItem == 'Transaction'))))
			//&& Number(list[i].salesRetailIncT) != 0
			) {
				noRec++;
				flag = true;
				content += '<tr id="' + i
						+ '"class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue  ">'
						+ convertDate(list[i].calendarDayTo) + '</td>'
						+ '<td class="centerValue  ">'
						+ convertTime(list[i].posTransactionTime) 
						+ '</td>' + '<td class="rightValue ">'
						+ list[i].transactionNumber + '</td>'
						+ '<td class="leftValue">' + list[i].cashierFirstName
						+ ' ' + list[i].cashierLastName + '</td>'
						+ '<td class="leftValue">' + list[i].posAuthoriser
						+ '</td>' 
						+ '<td class="centerValue ">';
						if(voidItem!= 'Transaction')
						content+= list[i].article + '</td>';
						else
							content+= '&nbsp;</td>';
/*						content+= '<td class="leftValue ">';
						if(voidItem!= 'Transaction')
							
						{
							if(list[i].ean_upc != "#" && !isNaN(list[i].ean_upc))
								content += Number(list[i].ean_upc);
									else
										content += list[i].ean_upc;
						content+='</td>';
			}
						else
							content+= '&nbsp;</td>';*/
						content+= '<td class="leftValue">';
						if(voidItem!= 'Transaction')
							
							content+= list[i].article_T + '</td>';
						else
							content+= '&nbsp;</td>';
						content+= ' <td class="leftValue">';
				/*if (list[i].transactionType != undefined
						&& list[i].transactionType != null
						&& list[i].transactionType.length > 0
						&& (list[i].transactionType.trim() == 'S102' || list[i].transactionType
								.trim() == 'RT01'))*/
					content += voidItem;
				/*else if (list[i].salesItemType != undefined
						&& list[i].salesItemType != null
						&& list[i].salesItemType.length > 0
						&& (list[i].salesItemType.trim() == 'S203'))
					content += 'ITEM/LINE';*/

				content += '</td>' ;
				content+= '<td class="leftValue ">';
				content += list[i].reason;
				content+='</td>';

				content += '<td class="leftValue">';
				if(voidItem!= 'Transaction')
				
						content+= list[i].department +'</td>';
						else
							content+= '&nbsp;</td>';

				content+= '<td class=" rightValue lastColumn ">'
						+ Number(list[i].salesRetailIncT).toFixed(2)
						+ '</td>' +'</tr>';
			}

		}
	}
	voidsTotPages = Math.ceil(noRec/10);
	$('.voidTbl tbody:first').html('');
	$('.voidTbl tbody:first').append(content);
	showVoidTbl();
	updateVoidSortPlugin();
	if (flag) {
		setTimeout(function() {
			$("#voidTblSortAttr").val('');
			//console.log("generate click - d : "+$("#voidTblSortAttr").val());
			// set sorting column and direction, this will sort on the first
			var voidTypeIdx = 7;
			var sorting = [ [ voidTypeIdx, 0 ] ];
			// sort on the first column	
			$(".voidTbl").trigger("sorton", [ sorting ]);
/*			var obj = $("#treetable").children("thead").children("tr");
			var voidTypeCol = obj.children("th:nth-child("+(voidTypeIdx+1)+")");
			console.log("generate >"+$("#voidTblSortAttr").val());
			updateSortAtrDtl(voidTypeCol,$("#voidTblSortAttr"));*/
		}, 30);
	} else {

		if ($('input[name="transactionType"]:checked').val() == 'Both' || $('input[name="transactionType"]:checked').val() == 'Voids') {
			if (filter!='') {
				//$('.voidTbl tbody,.voidTbl thead,.paginationDiv').addClass('hideBlock');
			} else {
				/*$('.' + $('.voidTbl').attr('data-user_id')).addClass(
						'hideBlock');
				$('#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
						.addClass('hideBlock');*/
				$('#mainTabs-1 .errorCon').remove();
				//$('#mainTabs-1 ').append(error_1pos);
				$('#mainTabs-1 .msgDiv h4').text(NDF);
				$('#mainTabs-1 .msgDiv ').removeClass('nodataMessage')
						.addClass('errorDiv');
			}
		} else {
			if (filter!='') {
				//$('.voidTbl tbody,.voidTbl thead,.paginationDiv').addClass('hideBlock');
			}else{
			$('.' + $('.voidTbl').attr('data-user_id')).addClass('hideBlock');
			$('#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
					.addClass('hideBlock');
			showWarning(NDF);
			}
		}
	}
	bindFilter();

}

function updateVoidSortPlugin() {
	$(".voidTbl").trigger("update");
}
function updateRefundSortPlugin() {
	$(".refundTbl").trigger("update");
}

function showVoidTbl() {
	$(
			'#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
			.removeClass('hideBlock');
	$('.voidTbl').find('tr :first').removeClass('hideBlock');
	$('#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows,#reportContent .ContentTableWrapper')
			.removeClass('hideBlock');
	$('#mainTabs-1 .ContentTableWrapper').removeClass('hideBlock');
	$(".voidTbl").removeClass('hideBlock');
	$('.tab2,.voidTbl tbody,.voidTbl thead:first').removeClass('hideBlock');
	$('.tableActionBtns').removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper .errorCon').addClass('hideBlock');
}

function showRefundtbl() {
	$(
			'#mainTabs-2  #tableSearchActions,#mainTabs-2  #scrollBtns,#mainTabs-2  #scrollTable')
			.removeClass('hideBlock');
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows,#reportContent .ContentTableWrapper')
			.removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper').removeClass('hideBlock');
	$(".refundTbl").removeClass('hideBlock');
	$('.refundTbl').find('tr :first').removeClass('hideBlock');
	$('.tab1').removeClass('hideBlock');
	$('#mainTabs-2 > .tableActionsBtnsWrapper').removeClass('hideBlock');
	$('.tableActionBtns').removeClass('hideBlock');
	$('#mainTabs-1 .ContentTableWrapper .errorCon').addClass('hideBlock');
	$('.tableInfo .tableInfoError .tableStart').addClass('hideBlock');
}

function showArticleTbl() {
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
	$(".voidTbl").removeClass('hideBlock');
	$('.tab2').removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper').removeClass('hideBlock');
	$(".refundTbl").removeClass('hideBlock');
	$('.tab1').removeClass('hideBlock');
	$('.ContentTableWrapper .errorCon').addClass('hideBlock');
	$('.tableInfo .tableInfoError .tableStart').addClass('hideBlock');
	
	if ($('.refundTbl tbody').html().trim() == '') {
		$(
				'#mainTabs-2  #tableSearchActions,#mainTabs-2  #scrollBtns,#mainTabs-2  #scrollTable')
				.addClass('hideBlock');
		$('.ContentTableWrapper .errorCon').removeClass('hideBlock');
		$('.tableInfo .tableInfoError .tableStart').removeClass('hideBlock');
	}
	if ($('.voidTbl tbody').html().trim() == '') {
		$(
				'#mainTabs-1  #tableSearchActions,#mainTabs-1  #scrollBtns,#mainTabs-1  #scrollTable')
				.addClass('hideBlock');
		$('.ContentTableWrapper .errorCon').removeClass('hideBlock');
		$('.tableInfo .tableInfoError .tableStart').removeClass('hideBlock');
	}
	hideError();

}

function articleRefundContent(response, value) {

	var deptSalesTax = '';
	var output = '';
	var refundType = '';
	var totalValue = '';

	var refundDate = '';
	var refundTime = '';
	var refundTran = '';
	var refundPoso = '';
	var refundPosi = '';
	var refundAuth = '';
	//var refundEan = '';
	var refundDesc = '';
	var refundType11 = '';
	var refundTota = '';
	var refundReas = '';
	var refundArti = '';
	if ($('.refundFillterHdr') != undefined
			&& $('.refundFillterHdr').length > 0
			&& !$('.refundFillterHdr').hasClass('hideBlock')) {
		refundDate = $('.refundDate').val().toUpperCase();
		refundTime = $('.refundTime').val().toUpperCase();
		refundTran = $('.refundTran').val().toUpperCase();
		refundPoso = $('.refundPoso').val().toUpperCase();
		refundPosi = $('.refundPosi').val().toUpperCase();
		refundAuth = $('.refundAuth').val().toUpperCase();
		//refundEan = $('.refundEan').val().toUpperCase();
		refundDesc = $('.refundDesc').val().toUpperCase();
		refundType11 = $('.refundType').val().toUpperCase();
		refundTota = $('.refundTota').val().toUpperCase();
		refundReas = $('.refundReas').val().toUpperCase();
		refundArti = $('.refundArti').val().toUpperCase();
	}

	output = $.parseJSON(response);
	deptSalesTax = output.refundList.refundList;

	currentPage = 1;
	var noRec=0;

	var flag = false;
	/*if (msg != undefined && msg != null && !isNaN(msg) && deptSalesTax != null
			&& deptSalesTax != undefined) {*/
	recordCount = '';//deptSalesTax.length;
	var content = '';

	if (deptSalesTax != null) {

		var list = deptSalesTax;
		for ( var i = 0; i < list.length; i++) {
			refundType="";
			list[i].calendarDayTo = (list[i].calendarDayTo != null && list[i].calendarDayTo != undefined) ? list[i].calendarDayTo
					: '';
			list[i].posTransactionTime = (list[i].posTransactionTime != null && list[i].posTransactionTime != undefined) ? list[i].posTransactionTime
					: '';
			list[i].transactionNumber = (list[i].transactionNumber != null && list[i].transactionNumber != undefined) ? list[i].transactionNumber
					: '';
			list[i].article = (list[i].article != null && list[i].article != undefined) ? list[i].article
					: '';
			list[i].article_T = (list[i].article_T != null && list[i].article_T != undefined) ? list[i].article_T
					: '';
			list[i].ean_upc = (list[i].ean_upc != null && list[i].ean_upc != undefined) ? list[i].ean_upc
					: '';
			list[i].department = (list[i].department != null && list[i].department != undefined) ? list[i].department
					: '';
			list[i].posNumber = (list[i].posNumber != null && list[i].posNumber != undefined) ? list[i].posNumber
					: '';
			list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ? list[i].cashierFirstName
					: '';
			list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ? list[i].cashierLastName
					: '';
			list[i].posAuthoriser = (list[i].posAuthoriser != null && list[i].posAuthoriser != undefined) ? list[i].posAuthoriser
					: '';
			list[i].refundItem = (list[i].refundItem != null && list[i].refundItem != undefined) ? list[i].refundItem
					: '';
			list[i].reason = (list[i].reason != null && list[i].reason != undefined) ? list[i].reason
					: '';
			/*list[i].refundNoQty = (list[i].refundNoQty != null && list[i].refundNoQty != undefined) ? list[i].refundNoQty
					: '';*/
			console.log("what is --> "+Number(list[i].refundItem
					.trim())+", "+(Number(list[i].refundItem
					.trim())==0.0));
			if(list[i].refundTransaction != undefined
					&& list[i].refundTransaction != null
					&& list[i].refundTransaction!= ''
					&& Number(list[i].refundTransaction)!= 0.0)
				{
				refundType = 'Transaction';
				}
			else if(list[i].refundItem != undefined
					&& list[i].refundItem != null
					&& list[i].refundItem != '' && Number(list[i].refundItem
					.trim()) != 0.0 )
				{
				refundType= 'ITEM/LINE';
				}
			
			if(list[i].returnAll == 'X')
				{
				totalValue =  Number(list[i].refundTransaction).toFixed(2);
				totalValue = Math.abs(totalValue);
				totalValue = totalValue.toString();
				}
			else 
				{
				totalValue = Number(list[i].refundItem).toFixed(2);
				totalValue = Math.abs(totalValue);
				totalValue = totalValue.toString();
				}

			if ((convertDate(list[i].calendarDayTo).indexOf(refundDate) != -1
					&& convertTime(list[i].posTransactionTime).indexOf(
							refundTime) != -1
					&& list[i].transactionNumber.toUpperCase().indexOf(
							refundTran) != -1
					&& list[i].article_T.toUpperCase().indexOf(refundDesc) != -1
					//&& list[i].ean_upc.toUpperCase().indexOf(refundEan) != -1
					&& list[i].article.toUpperCase().indexOf(refundArti) != -1
					&& list[i].posNumber.toUpperCase().indexOf(refundPosi) == 0
					&& list[i].posAuthoriser.toUpperCase().indexOf(refundAuth) != -1
					&& (list[i].cashierFirstName.toUpperCase() + ' ' + list[i].cashierLastName
							.toUpperCase()).indexOf(refundPoso) != -1
					&& refundType.toUpperCase().indexOf(refundType11) != -1
					&& list[i].reason.toUpperCase().indexOf(refundReas) != -1 && totalValue
					.toUpperCase().indexOf(refundTota) != -1)
					) {
				
				
				flag = true;
				
				noRec++;
				content += '<tr id="'
						+ i
						+ '" class="sortTable ContentTable actionRows parentTr '
						+ '"><td class="leftValue">'
						+ convertDate(list[i].calendarDayTo) + '</td>'
						+ '<td class="centerValue ">'
						+ convertTime(list[i].posTransactionTime) + '</td>'
						+ '<td class="rightValue">' + list[i].transactionNumber
						+ '</td>' + '<td class="rightValue">'
						+ list[i].posNumber + '</td>'
						+ '<td class="leftValue">' + list[i].cashierFirstName
						+ ' ' + list[i].cashierLastName + '</td>'
						+ '<td class="leftValue">' + list[i].posAuthoriser
						+ '</td>'
						/*+ '<td class="centerValue">'
						+ list[i].article
						+ '</td>'*/
						+ '<td class="leftValue">' ;
						if(list[i].article!=undefined && list[i].article!=null && list[i].article!='') {
							content += list[i].article;
						}
						else {
							content += '&nbsp;';
						}
						/*if(list[i].ean_upc != "#" && !isNaN(list[i].ean_upc))
						{
							content += Number(list[i].ean_upc);
						}
								else
									{
									content += list[i].ean_upc;
									}*/
						content += '</td>'
						+ '<td class="leftValue">' + list[i].article_T
						+ '</td>'

						/*+ '<td class="centerValue">'
						+ list[i].department
						+ '</td>'*/
						+ '<td class="leftValue">'
						+ refundType
						+ '</td>' + '<td class="leftValue">' + list[i].reason
						+ '</td>' + '<td class=" rightValue lastColumn">'
						+ Number(totalValue).toFixed(2) + '</td></tr>';
			}

		}
	}
	refundsTotPages = Math.ceil(noRec/10);
	//alert(content);
	$('.refundTbl tbody:first').html('');
	$('.refundTbl tbody:first').append(content);
	showRefundtbl();
	updateRefundSortPlugin();
	if (flag) {
		setTimeout(function() {
			$("#refundTblSortAttr").val('calendarDayTo,date,asc,first,posTransactionTime,time,asc,first');
			//console.log("generate click - d : "+$("#voidTblSortAttr").val());
			// set sorting column and direction, this will sort on the first
			var dateIdx = 0;
			var timeIdx = 1;
			var sorting = [ [ dateIdx, 0 ], [ timeIdx, 0 ] ];
			// sort on the first column	
			$(".refundTbl").trigger("sorton", [ sorting ]);
/*			var obj = $("#sortTable").children("thead").children("tr");
			var dateCol = obj.children("th:nth-child("+(dateIdx+1)+")");
			var timeCol = obj.children("th:nth-child("+(timeIdx+1)+")");
			updateSortAtrDtl(dateCol,$("#refundTblSortAttr"));
			updateSortAtrDtl(timeCol,$("#refundTblSortAttr"));*/
		}, 30);
		bindRefundFilter();
	} else {
		//$('.' + $('.refundTbl').attr('data-user_id')).addClass('hideBlock');
		/*$(
				'#mainTabs-2  #tableSearchActions,#mainTabs-2  #scrollBtns,#mainTabs-2  #scrollTable')
				.addClass('hideBlock');*/
		if ($('input[name="transactionType"]:checked').val() == 'Both') {
			/*$('#mainTabs-2 .errorCon').remove();
			$('#mainTabs-2 ').append(error_1pos);
			$('#mainTabs-2 .msgDiv h4').text(NDF);
			$('#mainTabs-2 .msgDiv ').removeClass('nodataMessage').addClass(
					'errorDiv');*/
		} else
			{
			$('#mainTabs-2 .errorCon').remove();
		$('#mainTabs-2 ').append(error_1pos);
		$('#mainTabs-2 .msgDiv h4').text(NDF);
		$('#mainTabs-2 .msgDiv ').removeClass('nodataMessage').addClass(
				'errorDiv');
			}
	}

	/*} else {
		if (msg == 'null')
			showError('Service Unavailable.');
		else
			showError(msg);
	}*/
	/*if(value!=''){
		$(".refundTbl .parentTr").highlight(value);
		$(".refundTbl .highlight").css({ backgroundColor: "#FFFF88" });
		
		
	}else{$(".refundTbl .parentTr").unhighlight();}*/
}

function bindFilter() {
	var value = '';
	var timeout = '';
	$('.voidTbl .textbox').unbind('keyup');
	$('.voidTbl .textbox').keyup(function() {
		value = $(this).val().trim();
		//if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		//start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			//your ajax stuff

			//if (value != '') {
			articleVoidRefund(prevRes, value.toUpperCase(),'filter');
			//} 

			/*if ($('.parentTr:visible').length == 0) {
				$('.voidTbl ').find('tr :first').addClass('hideBlock');
				//$('.totVal').addClass('hideBlock');
			} else {
				$('.voidTbl').find('tr :first').removeClass('hideBlock');
				//$('.totVal').removeClass('hideBlock');
			}*/
		}, 500);

	});

}

function bindRefundFilter() {
	var value = '';
	var timeout = '';
	$('.refundTbl .textbox').unbind('keyup');
	$('.refundTbl .textbox').keyup(function() {
		value = $(this).val().trim();
		//if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		//start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			//your ajax stuff

			//console.log(value);
			//if (value != '') {
			articleRefundContent(prevRes, value.toUpperCase());
			//} else {
			//articleRefundContent(prevRes, '');
			//}

			/*if ($('.parentTr:visible').length == 0) {
				$('.refundTbl ').find('tr :first').addClass('hideBlock');
				//$('.totVal').addClass('hideBlock');
			} else {
				$('.refundTbl').find('tr :first').removeClass('hideBlock');
				//$('.totVal').removeClass('hideBlock');
			}*/
		}, 500);

	});

}
function updateVoidList(oldList) {

	var deptSalesTax = oldList;
	var newList = [];
	var i = 0;
	if ($('.voidTbl .parentTr').length > 0) {
		$('.voidTbl .parentTr').each(function() {
			newList.push(deptSalesTax[Number($(this).prop('id'))]);
			i++;
		});
	}
	return newList;
}
function updateRefundList(oldList) {
	var deptSalesTax = oldList;
	var newList = [];
	var i = 0;
	if ($('.refundTbl .parentTr').length > 0) {
		$('.refundTbl .parentTr').each(function() {
			newList.push(deptSalesTax[Number($(this).prop('id'))]);
			i++;
		});
	}
	return newList;
}
function printResult(newList) {
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

function showContent(count) {
	$('#reportContent .tableInfo .tableTitle h4 strong').text(count);
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {
	$(
			'#reportContent,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	$('#all').prop('checked', 'checked');
	$('#voidFilter,#refundFilter').val('');
	$('.refundTbl .parentTr').remove();
	$('.voidTbl .parentTr').remove();
	//$('.paginationWrapper').hide();

}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#mainTabs-2 .ContentTableWrapper').addClass('hideBlock');
	$('#mainTabs-1 .ContentTableWrapper').addClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	hideContent();
}
function showWarning(text) {

	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.paginationDiv').addClass('hideBlock');
	hideContent();
}
function hideError() {
	$('.ContentTableWrapperError').addClass('hideBlock');
}
function startLoading() {
	$('#statusImg').removeClass('loading hideBlock');
	$('#statusImg').addClass('loading');
}
function stopLoading() {
	$('#statusImg').addClass('loading hideBlock');
	$('#statusImg').removeClass('loading');
}
function closeAccordian() {
	// $(".ContentTableWrapper").removeClass('hideBlock');
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

function convertDate(val) {

	var temp = val;
	try {
		if (temp != '') {
			var time = temp.replace('/', '').replace('/', '').replace('(', '')
					.replace(')', '').split('Date')[1];
			var today = new Date();
			today.setTime(time);
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

function convertDate1() {
	$('.dates1').filter(
			function() {
				var temp = $(this).text().trim();
				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					// var today = new Date();
					var newDate = today.getDate();
					var newMonth = today.getMonth() + 1;
					if (newDate < 10) {
						newDate = '0' + newDate;
					}
					if (newMonth < 10) {
						newMonth = '0' + newMonth;
					}
					$(this).text(
							(newDate + "/" + (newMonth) + "/" + today
									.getFullYear()));

				}
			});

}

function convertTime1() {
	$('.time1').filter(
			function() {
				var temp = $(this).text().trim();
				/* var date = new Date(parseInt(temp.substr(6))); */

				if (temp != '') {
					var time = temp.replace('/', '').replace('/', '').replace(
							'(', '').replace(')', '').split('Date')[1];
					var today = new Date();
					today.setTime(time);
					// var today = new Date();
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
function pagenationCallbackMethod(pageno) {
	//console.log("voidsTotPages : "+voidsTotPages+ ", refundsTotPages : "+refundsTotPages+", pageno : "+pageno+", 1 : "+$('#mainTabs-1').attr('aria-hidden')+", 2 : "+$('#mainTabs-2').attr('aria-hidden'));
	if(pageno==undefined || pageno==null) {
		pageno = 1;
	}
	if($('#mainTabs-1').attr('aria-hidden')=="false") {
		voidsCurrPg = pageno;
		voidStoreTotVal(pageno);
		setScrollerPosition($("#treetable"), $("#previous-column_void"), $("#next-column_void"));
	}
	else if($('#mainTabs-2').attr('aria-hidden')=="false") {
		refundsCurrPg = pageno;
		if(refundsTotPages == pageno) {
			$('.refundTotal').removeClass('hideBlock');
		}
		else {
			$('.refundTotal').addClass('hideBlock');
		}
		var netSales = 0;
		//$('.refundTbl .parentTr:visible').filter(function() {
		$('.refundTbl .parentTr').filter(function() {
	
			netSales += Number($(this).children(':nth-child(11)').text().trim());
	
		});
	
		$('.netSales').text(netSales.toFixed(2));
		setScrollerPosition($("#sortTable"), $("#previous-column_refund"), $("#next-column_refund"));
	}

}
function voidStoreTotVal(pageno) {
	if(voidsTotPages == pageno) {
		$('.voidTotal').removeClass('hideBlock');
	}
	else {
		$('.voidTotal').addClass('hideBlock');
	}
	var netSales2 = 0;
	//$('.voidTbl .parentTr:visible').filter(function() {
	$('.voidTbl .parentTr').filter(function() {
		netSales2 += Number($(this).children(':nth-child(11)').text().trim());

	});

	$('.netSales2').text(netSales2.toFixed(2));
}
function sortPrintVal() {

	var netSales1 = 0;

	$('.refunds').filter(function() {

		netSales1 += Number($(this).children(':nth-child(11)').text().trim());

	});

	$('.netSales1').text(netSales1.toFixed(2));

}

function showVoidFilter() {
	var voidHead = '<thead class="voidFillterHdr ">'
			+ '<tr class="filterRow"><td class="centerValue"><input name="voidDate" type="#" class="textbox voidDate"></td>'
			+ '<td class="centerValue"><input name="voidTime" type="#" class="textbox voidTime"></td>'
			+ '<td class="centerValue"><input name="voidTran" type="#" class="textbox voidTran"></td>'
			+ '<td class="centerValue"><input name="voidPoso" type="#" class="textbox voidPoso"></td>'
			+ '<td class="centerValue"><input name="voidAuth" type="#" class="textbox voidAuth"></td>'
			+ '<td class="centerValue"><input name="voidArti" type="#" class="textbox voidArti"></td>'
			//+ '<td class="centerValue"><input name="voidEan" type="#" class="textbox voidEan"></td>'
			+ '<td class="centerValue"><input name="voidDesc" type="#" class="textbox voidDesc"></td>'
			+ '<td class="centerValue"><input name="voidType" type="#" class="textbox voidType"></td>'
			+ '<td class="centerValue"><input name="voidReas" type="#" class="textbox voidReas"></td>'
			+ '<td class="centerValue"><input name="voidDepa" type="#" class="textbox voidDepa"></td>'
			+ '<td class="centerValue"><input name="voidTota" type="#" class="textbox voidTota"></td></tr></thead>';

	$(voidHead).insertAfter('.voidTbl thead:first');
	bindFilter();

}
function hideVoidFillter() {
	$('.voidFillterHdr').remove();
	articleVoidRefund(prevRes, '','');
}

function showRefundFilter() {
	var refundHead = '<thead class="refundFillterHdr ">'
			+ '<tr class="filterRow"><td class="centerValue"><input name="refundDate" type="#" class="textbox refundDate"></td>'
			+ '<td class="centerValue"><input name="refundTime" type="#" class="textbox refundTime"></td>'
			+ '<td class="centerValue"><input name="refundTran" type="#" class="textbox refundTran"></td>'
			+ '<td class="centerValue"><input name="refundPosi" type="#" class="textbox refundPosi"></td>'
			+ '<td class="centerValue"><input name="refundPoso" type="#" class="textbox refundPoso"></td>'
			+ '<td class="centerValue"><input name="refundAuth" type="#" class="textbox refundAuth"></td>'
			//+ '<td class="centerValue"><input name="refundEan" type="#" class="textbox refundEan"></td>'
			+ '<td class="centerValue"><input name="refundArti" type="#" class="textbox refundArti"></td>'
			+ '<td class="centerValue"><input name="refundDesc" type="#" class="textbox refundDesc"></td>'
			+ '<td class="centerValue"><input name="refundType" type="#" class="textbox refundType"></td>'
			+ '<td class="centerValue"><input name="refundReas" type="#" class="textbox refundReas"></td>'
			+ '<td class="centerValue"><input name="refundTota" type="#" class="textbox refundTota"></td></tr></thead>';

	$(refundHead).insertAfter('.refundTbl thead:first');
	bindRefundFilter();

}
function hideRefundFillter() {
	$('.refundFillterHdr').remove();
	articleRefundContent(prevRes, '');
}
function voidsRefundsPrintJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#articleRefund').attr("action", "getArticleVoidAndRefundDtl.pdf");
		$('#articleRefund').attr('target','_blank');
		$('#articleRefund').submit();
	}
}
$( document ).ready(function() {
		//bindTableHeaderClickEvent($("#voidTblSortAttr"), "voidTbl");
		bindTableHeaderClickEvent();
		bindTableSortEndEvent($("#treetable"), $("#voidTblSortAttr"));
		bindTableSortEndEvent($("#sortTable"), $("#refundTblSortAttr"));
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treetable') {
		shiftKeyFunction(tableHeaderObj, $("#voidTblSortAttr"));
	}
	else if(tableIdName == 'sortTable') {
		shiftKeyFunction(tableHeaderObj, $("#refundTblSortAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treetable') {
		ctrlKeyFunction($("#voidTblSortAttr"));
	}
	else if(tableIdName == 'sortTable') {
		ctrlKeyFunction($("#refundTblSortAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'treetable') {
		clickFunction(tableHeaderObj, $("#voidTblSortAttr"));
	}
	else if(tableIdName == 'sortTable') {
		clickFunction(tableHeaderObj, $("#refundTblSortAttr"));
	}
}
$(document).ready(function(){
	/*console.log("hidCallFrm : "+$("#hidCallFrm").val());
	console.log("hidDateFrmPassd : "+$("#hidDateFrmPassd").val());
	console.log("hidDateToPassd : "+$("#hidDateToPassd").val());*/
	if($("#hidCallFrm").val()=="STAR") {
		$("#dateFrom").val($("#dtFrmHdn").val());
		$("#dateTo").val($("#dtToHdn").val());
		if($("#repNamHdn").val()=="Voids") {
			$("#pos").prop("checked", true);
		}
		if($("#repNamHdn").val()=="Refunds") {
			$("#sales").prop("checked", true);
		}
	    setTimeout(function() {
	        $("#generateReport").trigger('click');
	    },10);
		//$("#generateReport").trigger('click');
	}
	$(window).resize(function() {
		if($('#mainTabs-1').attr('aria-hidden')=="false") {
			setScrollerPosition($("#treetable"), $("#previous-column_void"), $("#next-column_void"));
		}
		else if($('#mainTabs-2').attr('aria-hidden')=="false") {
			setScrollerPosition($("#sortTable"), $("#previous-column_refund"), $("#next-column_refund"));
		}
	});
	$(window).scroll(function() {
		if($('#mainTabs-1').attr('aria-hidden')=="false") {
			setScrollerPosition($("#treetable"), $("#previous-column_void"), $("#next-column_void"));
		}
		else if($('#mainTabs-2').attr('aria-hidden')=="false") {
			setScrollerPosition($("#sortTable"), $("#previous-column_refund"), $("#next-column_refund"));
		}
	});
});
