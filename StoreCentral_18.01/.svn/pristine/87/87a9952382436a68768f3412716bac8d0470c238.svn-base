var recordCount;
var currentPage;
var prevRes = '';
var mondayEndDate = '';
var sundayEndDate = '';
var mondayDateForWeek = '';
var totPages = 0;
var NDF="Sorry, no results found for your search criteria. Please try again.";
visibleCtrls = 'input[name="weekFromDateHide"],input[name="weekToDateHide"]';
hiddentCtrls = 'input[name="weekFromDateHide2"],input[name="weekToDateHide2"]';
allInputCtrls = 'input[name="dateFrom"]';

$(function() {

	$('#filter').css('padding-top', '4px').css('width', '18%');

	$('.sortTable').removeClass('tbl-print');
	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		onClose : function(selectedDate) {
			// findMondayOfYear();
			// getWeekNumber();
			displayDates();
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
	var presentDate = (newDate + "/" + (newMonth) + "/" + newYear);
	$('#dateFrom').val(presentDate);

	function getWeekNumber() {
		var tDate = $('#dateFrom').val();
		var date = tDate.split('/')[0];
		var month = tDate.split('/')[1];
		var year = tDate.split('/')[2];

		Date.prototype.getWeek = function() {
			var onejan = new Date(year, 0, mondayDateForWeek);
			console.log("mondayDateForWeek:" + mondayDateForWeek);
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
			mondayEndDate = (mondayDate + '/' + mondayMonth + '/' + mondayYear);
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
			mondayEndDate = (mondayDate + '/' + mondayMonth + '/' + mondayYear);
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
				mondayEndDate = (mondayDate + '/' + mondayMonth + '/' + mondayYear);
			}

			// console.log(mondayEndDate);
		}
		console.log("MondayEndDate:" + mondayEndDate);
		var mondayJanDate = mondayEndDate;
		var mondayJanD = mondayJanDate.split('/')[0];
		var mondayJanMonth = mondayJanDate.split('/')[1];
		var mondayJanYear = mondayJanDate.split('/')[2];

		var dateFindMonday = new Date(mondayJanYear, mondayJanMonth - 1,
				mondayJanD);

		mondayDateForWeek = mondayJanD;
		console.log("mondayJanD:" + mondayJanD);
		console.log("dateFindMonday:" + dateFindMonday.getDay());

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
			mondayEndDate = (mondayDate + '/' + mondayMonth + '/' + mondayYear);
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
				mondayEndDate = (mondayDate + '/' + mondayMonth + '/' + mondayYear);
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
				mondayEndDate = (mondayDate + '/' + mondayMonth + '/' + mondayYear);
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
			sundayEndDate = (sundayDate + '/' + sundayMonth + '/' + sundayYear);
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
			sundayEndDate = (sundayDate + '/' + sundayMonth + '/' + sundayYear);
		}
		console.log(sundayEndDate);

		$('#weekFromDateHide').val(mondayEndDate);
		$('#weekToDateHide').val(sundayEndDate);
		bindDynaCtrlInputChange();
		$('#week').text(mondayEndDate + ' - ' + sundayEndDate);
		$('#weekSunday').text(sundayEndDate);
	}

	// findMondayOfYear();
	// getWeekNumber();
	displayDates();
	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');

	/*
	 * $("table").trigger("update"); // set sorting column and direction, this
	 * will sort on the first and third column var sorting = [[2,1],[0,0]]; //
	 * sort on the first column $("table").trigger("sorton",[sorting]);
	 */

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

	/*
	 * $("#weekStartDate").blur(function(){
	 * 
	 * if($('#weekStartDate').val().split('/')[2].length != 4) { var fromYear =
	 * parseDate($('#weekStartDate').val()).getFullYear();
	 * console.log(fromYear); var fromDateFYear
	 * =$('#weekStartDate').val().split('/'); var finalFromDate=fromDateFYear[0] +
	 * '/' + fromDateFYear[1] + '/' + fromYear;
	 * $('#weekStartDate').val(finalFromDate); console.log(finalFromDate); } });
	 * 
	 * $("#dateTo").blur(function(){
	 * 
	 * if($('#dateTo').val().split('/')[2].length != 4) { var toYear =
	 * parseDate($('#dateTo').val()).getFullYear(); console.log(toYear); var
	 * toDateFYear =$('#dateTo').val().split('/'); var
	 * finalToDate=toDateFYear[0] + '/' + toDateFYear[1] + '/' + toYear;
	 * $('#dateTo').val(finalToDate); console.log(finalToDate); } });
	 */
	$('#next-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '+=150'
		}, 'fast');
	});
	$('#previous-column').click(function(event) {
		event.preventDefault();
		$('.scrollTableContainer').animate({
			scrollLeft : '-=150'
		}, 'fast');
	});
	$("#generateReport")
			.click(
					function() {
						hideError();
						$('#filter').val('');
						var fromDate = formateDate($('#dateFrom').val());
						$('#dateFromHide').text(fromDate);

						var weekTrading = $('#weekSunday').text();
						$('#weekHide').text(weekTrading);
						$('#weekFromDateHide').val(mondayEndDate);
						$('#weekToDateHide').val(sundayEndDate);

						var date1 = new Date();

						var parts = fromDate.split('/');
						date1.setFullYear(parts[2], parts[1] - 1, parts[0]);
						var newTime = Number(date1.getTime());

				
					
						newTime = Number(newTime)
								+ Number(24 * 60 * 60 * 1000 * 90);

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
						} 

						else {
							weeklyMarkdown($('#storeWeeklyMarkdown')
									.serialize());
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

	$("label.toolTip").tooltip({
		position : {
			my : "left top",
			at : "left top-70"
		}
	});

});

function updateSortPlugin() {
	$(".sortTable").trigger("update");

}
function weeklyMarkdown(data) {
	$.ajax({
		type : "get",
		url : "getStoreWeeklyMarkdown.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			formStoreWeeklyMarkdown(response, '');

			// printResult(response);
			bindFilter();
			$.loader('close');
			setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
		},
		error : function() {
			showError("No Data Found.");
			$.loader('close');
		}
	});
}
function showOldSearch() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formStoreWeeklyMarkdown(prevRes, '');

	if ($('.parentTr:visible').length == 0) {
		$('.treetable ').find('tr :first').addClass('hideBlock');
		$('.totVal').addClass('hideBlock');
	} else {
		$('.treetable').find('tr :first').removeClass('hideBlock');
		$('.totVal').removeClass('hideBlock');
	}

}
function bindFilter() {
	var value = '';
	var timeout = '';
	console.log('search');
	$('.sortTable .textbox').unbind('keyup');
	$('.sortTable .textbox').keyup(function() {
		value = $(this).val().trim();
		// if you already have a timout, clear it
		if (timeout) {
			clearTimeout(timeout);
		}

		// start new time, to perform ajax stuff in 500ms
		timeout = setTimeout(function() {
			// your ajax stuff

			/*
			 * console.log(value); if (value != '') {
			 */
			formStoreWeeklyMarkdown(prevRes, value.toUpperCase());
			/*
			 * } else{ formStoreWeeklyMarkdown(prevRes,''); }
			 */

			if ($('.parentTr:visible').length == 0) {
				$('.sortTable ').find('tr :first').addClass('hideBlock');
				$('.totVal').addClass('hideBlock');
			} else {
				$('.sortTable').find('tr :first').removeClass('hideBlock');
				$('.totVal').removeClass('hideBlock');
			}
		}, 500);

	});

}
function formStoreWeeklyMarkdown(response, value) {

	var deptSalesTax = '';
	var msg = '';
	var output = '';

	output = $.parseJSON(response);
	deptSalesTax = output.data;
	msg = output.msg;

	currentPage = 1;
	var i = 0;
	var flag = false;
	if (msg != undefined && msg == '' && deptSalesTax != null
			&& deptSalesTax != undefined) {
		// recordCount = deptSalesTax.length;
		var content = '';

		if (deptSalesTax != null) {

				var list = deptSalesTax;
				/*var staffDiscount = 0;
				var loyalty = 0;
				var promotions = 0;
				var priceOverrideRTC = 0;
				var clearance = 0;
				var advertisements = 0;
				var deleted = 0;
				var outOfDate = 0;
				var theft = 0;
				var stockWriteOff = 0;
				var damagedStock = 0;
				var comp = 0;
				var specialActivity = 0;*/
				var priceOverrideQty;
				var totalAftrDfrdLylt;


				for (i = 0; i < list.length; i++) {

					list[i].staffDiscount = (list[i].staffDiscount != null && list[i].staffDiscount != undefined) ? Number(
							list[i].staffDiscount).toFixed(2)
							: '';
					list[i].loyalty = (list[i].loyalty != null && list[i].loyalty != undefined) ? Number(
							list[i].loyalty).toFixed(2)
							: '';
					list[i].promotions = (list[i].promotions != null && list[i].promotions != undefined) ? Number(
							list[i].promotions).toFixed(2)
							: '';
					list[i].priceOverrideRTC = (list[i].priceOverrideRTC != null && list[i].priceOverrideRTC != undefined) ? Number(
							list[i].priceOverrideRTC).toFixed(2)
							: '';
					list[i].clearance = (list[i].clearance != null && list[i].clearance != undefined) ? Number(
							list[i].clearance).toFixed(2)
							: '';
					list[i].advertisements = (list[i].advertisements != null && list[i].advertisements != undefined) ? Number(
							list[i].advertisements).toFixed(2)
							: '';
					list[i].scanningPolicy = (list[i].scanningPolicy != null && list[i].scanningPolicy != undefined) ? Number(
									list[i].scanningPolicy).toFixed(2)
									: '';
					list[i].deleted = (list[i].deleted != null && list[i].deleted != undefined) ? Number(
							list[i].deleted).toFixed(2)
							: '';

					list[i].outOfDate = (list[i].outOfDate != null && list[i].outOfDate != undefined) ? Number(
							list[i].outOfDate).toFixed(2)
							: '';
					list[i].theft = (list[i].theft != null && list[i].theft != undefined) ? Number(
							list[i].theft).toFixed(2)
							: '';
					list[i].stockWriteOff = (list[i].stockWriteOff != null && list[i].stockWriteOff != undefined) ? Number(
							list[i].stockWriteOff).toFixed(2)
							: '';
					list[i].damagedStock = (list[i].damagedStock != null && list[i].damagedStock != undefined) ? Number(
							list[i].damagedStock).toFixed(2)
							: '';
					list[i].comp = (list[i].comp != null && list[i].comp != undefined) ? Number(
							list[i].comp).toFixed(2)
							: '';
					list[i].specialActivity = (list[i].specialActivity != null && list[i].specialActivity != undefined) ? Number(
							list[i].specialActivity).toFixed(2)
							: '';
					list[i].deferredLoyalty = (list[i].deferredLoyalty != null && list[i].deferredLoyalty != undefined) ? Number(
							list[i].deferredLoyalty).toFixed(2)
							: '';

					flag = true;
					/*staffDiscount += Number(staffDiscount)
							+ Number(list[i].staffDiscount);
					loyalty += Number(loyalty) + Number(list[i].loyalty);
					promotions += Number(promotions)
							+ Number(list[i].promotions);
					priceOverrideRTC = Number(priceOverrideRTC)
							+ Number(list[i].priceOverrideRTC);

					clearance = Number(clearance) + Number(list[i].clearance);
					advertisements = Number(advertisements)
							+ Number(list[i].advertisements);

					deleted += Number(deleted) + Number(list[i].deleted);
					outOfDate += Number(outOfDate) + Number(list[i].outOfDate);
					theft += Number(theft) + Number(list[i].theft);
					stockWriteOff = Number(stockWriteOff)
							+ Number(list[i].stockWriteOff);

					damagedStock = Number(damagedStock)
							+ Number(list[i].damagedStock);
					comp = Number(comp) + Number(list[i].comp);
					specialActivity = Number(specialActivity)
							+ Number(list[i].specialActivity);
					priceOverrideQty = 0;

					staffDiscount = staffDiscount.toFixed(2);
					loyalty = loyalty.toFixed(2);
					promotions = promotions.toFixed(2);
					priceOverrideRTC = priceOverrideRTC.toFixed(2);
					clearance = clearance.toFixed(2);

					advertisements = advertisements.toFixed(2);
					deleted = deleted.toFixed(2);
					outOfDate =Math.abs(outOfDate).toFixed(2);
					theft = Math.abs(theft).toFixed(2);
				
					stockWriteOff = Math.abs(stockWriteOff).toFixed(2);
				

					damagedStock = Math.abs(damagedStock).toFixed(2);
					comp = comp.toFixed(2);
					specialActivity = specialActivity.toFixed(2);
					priceOverrideQty = Number(staffDiscount) + Number(loyalty)
							+ Number(promotions) + Number(priceOverrideRTC)
							+ Number(clearance) + Number(advertisements)
							+ Number(deleted) + Number(outOfDate) + Number(theft)
							+ Number(stockWriteOff) + Number(damagedStock)
							+ Number(comp) + Number(specialActivity);*/
					priceOverrideQty = Number(list[i].staffDiscount) + Number(list[i].loyalty)
					+ Number(list[i].promotions) + Number(list[i].priceOverrideRTC)
					+ Number(list[i].clearance) + Number(list[i].advertisements) + Number(list[i].scanningPolicy)
					+ Number(list[i].deleted) + Number(list[i].outOfDate) + Number(list[i].theft)
					+ Number(list[i].stockWriteOff) + Number(list[i].damagedStock)
					+ Number(list[i].comp) + Number(list[i].specialActivity);
					totalAftrDfrdLylt = priceOverrideQty + Number(list[i].deferredLoyalty);

					content += '<tr id="' + list[i].department + '" class=" parentTr ';
					content += '"><td class="leftValue " >' + (list[i].departmentNumber!="#" ?list[i].departmentNumber.substring(1):"") +" "+ list[i].department + '</td>';
					content += '<td class="rightValue " >';
					// if (staffDiscount != '')
					content += list[i].staffDiscount;
					content += '</td>' + '<td class="rightValue " >';
					// if (loyalty != '')
					content += list[i].loyalty;
					content += '</td>' + '<td class="rightValue " >';
					/* if (promotions != '') */
					content += list[i].promotions;
					content += '</td>' + '<td class="rightValue " >';
					// if (priceOverrideRTC != '')
					content += list[i].priceOverrideRTC;
					content += '</td>' + '<td class="rightValue ">';
					// if (clearance != '')
					content += list[i].clearance;
					content += '</td>' + '<td class=" rightValue  ">';
					// if (advertisements != '')
					content += list[i].advertisements;
					content += '</td>';
					content += '<td class=" rightValue">';
					content += list[i].scanningPolicy;
					content += '</td>';
					content += '<td class=" rightValue">';
					// if (deleted != '')
					content += list[i].deleted;
					content += '</td>';

					content += '<td class=" rightValue ">';
					// if (outOfDate != '')
					content += list[i].outOfDate;
					content += '</td>';

					content += '<td class=" rightValue ">';
					// if (theft != '')
					content += list[i].theft;
					content += '</td>';

					content += '<td class=" rightValue  ">';
					// if (stockWriteOff != '')
					content += list[i].stockWriteOff;
					content += '</td>';

					content += '<td class=" rightValue  ">';
					// if (damagedStock != '')
					content += list[i].damagedStock;
					content += '</td>';

					content += '<td class=" rightValue ">';
					// if (comp != '')
					content += list[i].comp;
					content += '</td>';

					content += '<td class=" rightValue  ">';
					// if (specialActivity != '')
					content += list[i].specialActivity;
					content += '</td>';

					content += '<td class=" rightValue">';
					// if (priceOverrideQty != '')
					content += Number(priceOverrideQty).toFixed(2);
					content += '</td>';
					content += '<td class=" rightValue">';
					// if (priceOverrideQty != '')
					content += list[i].deferredLoyalty;
					content += '</td>';
					content += '<td class=" rightValue lastColumn">';
					// if (priceOverrideQty != '')
					content += Number(totalAftrDfrdLylt).toFixed(2);
					content += '</td>';

					content += '</tr>';
				}
				totPages = Math.ceil(list.length/10);
		}
		$('.sortTable tbody:first').html('');
		$('.sortTable tbody:first').append(content);
		showContentDepartmentSalesTaxBlock();
		// storeTotal();
		if (flag) {
			updateSortPlugin();
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ] ];
				// sort on the first column
				$(".sortTable").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$('.paginationDiv ').addClass('hideBlock');
		}
		// printResult(response);
	} else {
		if (msg == null) {
			showError('Technical issue occurred. Please contact technical support.');
		} else if (msg == 'No Data Found.' || msg==NDF) {
			showWarning(NDF);
		} else if (msg == '') {
			showWarning(NDF);
		} else {
			showError(msg);
		}
	}
	/*
	 * if(value!=''){ $(".sortTable .parentTr").highlight(value); $(".sortTable
	 * .highlight").css({ backgroundColor: "#FFFF88" });
	 * 
	 * 
	 * }else{$(".sortTable .parentTr").unhighlight();}
	 */

}

function showContentDepartmentSalesTaxBlock() {

	$('#reportContent').removeClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
}

function updateMarkMap(markdownDetails) {
	var siteMap = {};
	if (markdownDetails != null && markdownDetails != undefined) {
		$('.sortTable .parentTr').filter(function() {
			var id = $(this).attr('id');
			var list = $(markdownDetails).attr(id);
			siteMap[id] = list;
		});
	}
	return siteMap;
}
function printResult(response) {}

function printReport() {
	printResult();
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
	// $('.paginationWrapper').addClass('hideBlock');
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#reportContent').addClass('hideBlock');
	$("#errorMsgDiv").removeClass('tableTitle nodataMessage');
	$("#errorMsgDiv").addClass('tableTitle errorDiv');
	$('.sortTable').addClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$("#errorMsgDiv").removeClass('nodataMessage');
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

function pagenationCallbackMethod(pageNo) {

	if(pageNo==undefined || pageNo==null) {
		pageNo = 1;
	}
	var staffDiscount = 0;
	var loyalty = 0;
	var promotions = 0;
	var priceOveride = 0;
	var advertisement1 = 0;
	var scanningPolicy1=0;
	var clearance = 0;
	var deleted1 = 0;
	var outofdate1 = 0;
	var theft = 0;
	var stockWrite = 0;
	var damagedStock = 0;
	var comp = 0;
	var specialActivity = 0;
	var total = 0;
	var dfrdLylt = 0;
	var totAftrDfrdLylt = 0;

	$('.parentTr:visible')
			.filter(
					function() {

						staffDiscount += Number($(this).children(
								':nth-child(2)').text().trim());

						loyalty += Number($(this).children(':nth-child(3)')
								.text().trim());
						promotions += Number($(this).children(':nth-child(4)')
								.text().trim());

						priceOveride += Number($(this)
								.children(':nth-child(5)').text().trim());
						clearance += Number($(this).children(':nth-child(6)')
								.text().trim());

						advertisement1 += Number($(this).children(
								':nth-child(7)').text().trim());
						scanningPolicy1 += Number($(this).children(':nth-child(8)').text().trim());
						deleted1 += Number($(this).children(':nth-child(9)')
								.text().trim());
						outofdate1 += Number($(this).children(':nth-child(10)')
								.text().trim());

						theft += Number($(this).children(':nth-child(11)')
								.text().trim());
						stockWrite += Number($(this).children(':nth-child(12)')
								.text().trim());
						damagedStock += Number($(this).children(
								':nth-child(13)').text().trim());
						comp += Number($(this).children(':nth-child(14)')
								.text().trim());
						specialActivity += Number($(this).children(
								':nth-child(15)').text().trim());
						total += Number($(this).children(':nth-child(16)')
								.text().trim());
						dfrdLylt += Number($(this).children(':nth-child(17)')
								.text().trim());
						totAftrDfrdLylt += Number($(this).children(':nth-child(18)')
								.text().trim());

					});

	$('.staff1').text(staffDiscount.toFixed(2));
	$('.promo1').text(promotions.toFixed(2));
	$('.loyalty1').text(loyalty.toFixed(2));
	$('.priceOver1').text(priceOveride.toFixed(2));
	$('.clear1').text(clearance.toFixed(2));
	$('.advertisement1').text(advertisement1.toFixed(2));
	$('.scanningPolicy1').text(scanningPolicy1.toFixed(2));
	$('.delete1').text(deleted1.toFixed(2));
	$('.outDate1').text(outofdate1.toFixed(2));
	
	
	$('.theft1').text(theft.toFixed(2));
	$('.stock1').text(stockWrite.toFixed(2));
	$('.damaged1').text(damagedStock.toFixed(2));
	$('.comp1').text(comp.toFixed(2));
	$('.specialActivity1').text(specialActivity.toFixed(2));
	$('.total1').text(total.toFixed(2));
	$('.dfrdLylt').text(dfrdLylt.toFixed(2));
	$('.totAftrLylt').text(totAftrDfrdLylt.toFixed(2));
	if(totPages == pageNo) {
		$('.staredMarkLgnd').removeClass('hideBlock');
	}
	else {
		$('.staredMarkLgnd').addClass('hideBlock');
	}
	setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
}

function doPagination() {

	var i = 1;
	var cnt = 1;
	$('.parentTr').each(
			function() {
				var flag = false;
				if ($(this).hasClass('actionRows')) {
					flag = true;
				}
				$(this).attr('class', '');
				$(this).addClass('parentTr').addClass('page-' + cnt);

				if (flag) {
					$(this).addClass('actionRows').addClass('contentRow')
							.addClass('collapsed');
				}
				if (cnt > 1)
					$(this).addClass('hideBlock');
				if (i % 10 == 0) {
					cnt++;
				}
				i++;
				// //console.log(i++);
			});
}
function changeTbl(table) {
	// table
	return table;

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
function storeWeeklyMarkDwnPrintJasper() {
	if(isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else {
		$('#storeWeeklyMarkdown').attr("action", "getStoreWeeklyMarkdown.pdf");
		$('#storeWeeklyMarkdown').attr('target','_blank');
		$('#storeWeeklyMarkdown').submit();
	}
}

$( document ).ready(function() {
	bindTableHeaderClickEvent();
	bindTableSortEndEvent($("#sortTable"), $("#storeWeeklyMrkDwnAttr"));
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		shiftKeyFunction(tableHeaderObj, $("#storeWeeklyMrkDwnAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		ctrlKeyFunction($("#storeWeeklyMrkDwnAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		clickFunction(tableHeaderObj, $("#storeWeeklyMrkDwnAttr"));
	}
}
$(document).ready(function() {
	$(window).resize(function() {
		setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
	});
	$(window).scroll(function() {
		setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
	});
});


/*
 * function showdeptFilter(){ var deptHead='<thead class="deptFillterHdr ">' +'<tr class="filterRow"><td class="centerValue"><input
 * type="#" class="textbox deptDept"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox staffDiscount"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox loyalty"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox promotions"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox priceOverride"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox clearance"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox advertisements"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox deleted"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox outOfDate"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox theft"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox stockWriteOff"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox damagedStock"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox comp"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox specialActivity"></td>' +'<td class="centerValue"><input
 * type="#" class="textbox total"></td>' +'</tr></thead>';
 * 
 * $(deptHead).insertAfter('.sortTable thead:first'); bindFilter();
 *  } function hidedeptFillter(){ $('.deptFillterHdr').remove(); //
 * articleVoidRefund(prevRes, ''); // formSavedTransactionContent(prevRes, '');
 * formStoreWeeklyMarkdown(prevRes, ''); }
 */

