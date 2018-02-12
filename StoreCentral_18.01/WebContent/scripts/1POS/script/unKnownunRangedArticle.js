var recordCount;
var currentPage;
var NDF="Sorry, no results found for your search criteria. Please try again.";
$(function() {

	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
		/*onClose : function(selectedDate) {
			// $( "#dateTo" ).focus();
		}*/

	});

	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50
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

	$('#dateTo,#dateTo').datepicker({
		maxDate : new Date(newYear, newMonth, newDate)
	});

	$('.reportWrapper .ContentTableWrapper').css('overflow', 'visible');
	
	/*$('#markFilterOpen').click(function() {
		$('#markFilterOpen').addClass('hideBlock');
		$('#markFilterClear').removeClass('hideBlock');
		showmarkFilter();
	});
	$('#markFilterClear').click(function() {
		$('#markFilterOpen').removeClass('hideBlock');
		$('#markFilterClear').addClass('hideBlock');
		hidemarkFillter();
	});*/

	$("#generateReport")
			.click(
					function() {
						hideError();
						$('#filter').val('');
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
						} else if(days >6){
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

								unknownArticle($('#unknownArticle').serialize());
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

								unknownArticle($('#unknownArticle').serialize());
							}
						} else if ((toYear - fromYear) >= 2) {
							showError('Date difference should not be greater than 3 months');
							callFrom();
						}

						else {

							unknownArticle($('#unknownArticle').serialize());

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

	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		dateFormat : "ddmmyyyy",
		emptyTo : 'top'
	});

	$(".sortTable").bind("sortStart", function() {
		// removeChildTr();
		console.log('started');
	}).bind("sortEnd", function() {
		// $("#overlay").hide();
	});
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');

});

function unknownArticle(data) {

	var unknown = '';
	var msg = '';
	var output = '';

	$.ajax({
		type : "get",
		url : "getUnkownRanged.htm",
		data : data,

		beforeSend : function() {
			// startLoading();
			fullScreenLoader();
			hideError();
		},
		success : function(response) {

			output = $.parseJSON(response);
			unknown = output.data;

			msg = output.msg;
			if (msg != undefined && !isNaN(msg) && unknown != null) {
				// recordCount = msg;
				prevRes = '';
				prevRes = response;
				formArticleContent(response, '');
				bindFilter();
				
			} else {
				if (msg == 'null')
					showWarning('Sorry, no results found for your search criteria. Please try again.');
				else if(msg=="Sorry, no results found for your search criteria. Please try again.")
					{
					showWarning(msg);
					}
				else
					{
					showError(msg);
					}
			}
			stopLoading();
			$.loader('close');
		},
		error : function() {
			showError('Technical issue occured.');
			stopLoading();
		}
	});

}

function showContentUnkownBlock() {
	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.removeClass('hideBlock');
	$('.treetable').find('tr :first').removeClass('hideBlock');
	$('#reportContent').removeClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');
	$('.ContentTableWrapperError').addClass('hideBlock');
	$('.sortTable .parentTr').unbind('click');
	$('.sortTable .parentTr .viewStores').click(
			function() {
				if ($(this).parent().hasClass('collapsed')) {
					$(this).parent().removeClass('collapsed').addClass('expanded');
					$(showAccord($(this).parent().attr('id').trim(), $(this).parent()))
							.insertAfter($(this).parent());
				} else {
					$(this).parent().removeClass('expanded').addClass('collapsed');
					if ($(this).parent().next().hasClass('childTr')) {

						$(this).parent().next().remove();
					}
				}
			});

}

function printResult(response) {

	var output = $.parseJSON(response);
	var printContent = '';
	var msg = output.msg;
	if (output.data != null) {
		var descList = output.data;
		// recordCount = descList[0].msg;

		var siteMap = {};
		$('.sortTable .parentTr').filter(function() {
			var id = $(this).attr('id');
			var list = $(descList).attr(id);
			var tempList = [];
			for ( var k = 0; k < list.length; k++) {
				if (siteMap.hasOwnProperty(list[k].site)) {
					tempList = $(siteMap).attr(list[k].site);
					//list[k].cnt=id;
					tempList.push(list[k]);
				} else {
					tempList = [];
					//list[k].cnt=id;
					tempList.push(list[k]);
				}
				siteMap[list[k].site] = tempList;
			}
			//console.log(siteMap);
		});
		console.log(siteMap);
		var printHead = '<div class="width100 pageBreak" style=""><div class="width70   reportName bold inline-block">Unknown or Unranged Articles Report</div><div style="width: 25%" class="width25  right"><div class=" siteNoNamePrint margin5 text-align-right "></div></div>	<div class="width70 margin5 margontopnone inline-block"><label class="">Created on: </label><label class="currentDate"></label> </div></div><div class="width100 border"><div class="width70 margin5 bold ">Report for:</div><div class="margin5 margontopnone"><label class="">From Date: </label><label class="fromDatePrint" id=""></label><label class="separator">|</label><label class="cateHide" >To Date: </label><label class="toDatePrint" id="" ></label>';
		var printTableHeader = '<table cellspacing="0" border=4 class="ContentTable sortTable actionRows actionRowPrint treetable"><thead>'
				+ '<tr>'
				+ '<th class="leftValue">Date</th>'
				+ '<th class="centerValue">Article No.</th>'
				+ '<th class="centerValue">EAN</th>'
				+ '<th class="centerValue">Article Description</th>'
				+ '<th class="numberColumn centerValue">Total($)(Article)</th>'
				+ '<th class="centerValue">Sold Through</th>'
				+ '<th class="centerValue lastColumn" scope="col"># of Transactions with Articles</th></tr>'
				+ '</thead> ';
		var printFoot = '<div style="height: 30px !important;margin-top:10px" id="foot"  class="width98"><div class="width35 margin5 left inline-block"><label class="bold">Printed on: </label><label class="currentDate"></label> <label class="separator">|</label> <label class="currentTime"></label></div><div class="inline-block margin5 hideBlock endOfReport">End of Report</div>	<div class="width35  inline-block right"><div class=" lineheight15 margin5 text-align-right ">Page <label class="currentPagePrint">1</label> of <label class="totalPage">1</label></div></div></div>';

		// printContent=printHead;
		var totalContent='';

		
		var siteNm='';
		var site='';
		var l = 0;
		if (descList != null) {

			for ( var m in siteMap) {
				
								//console.log(descList[m]);
								l=0;
								var list = siteMap[m];
								printContent='';
								if (list != undefined && list != null
										&& list.length > 0) {
									site='';
									siteNm='';
									for(var j=0;j<list.length;j++){
										
									list[j].calendarDayTo = (list[j].calendarDayTo != null && list[j].calendarDayTo != undefined) ? list[j].calendarDayTo
											: '';
									list[j].article = (list[j].article != null && list[j].article != undefined) ? list[j].article
											: '';
									list[j].ean_upc = (list[j].ean_upc != null && list[j].ean_upc != undefined) ? list[j].ean_upc
											: '';

									list[j].articleT = (list[j].articleT != null && list[j].articleT != undefined) ? list[j].articleT
											: '';
									list[j].totalArtPrc = (list[j].totalArtPrc != null && list[j].totalArtPrc != undefined) ? Number(
											list[j].totalArtPrc).toFixed(2)
											: '';
									list[j].sapLookUp = (list[j].sapLookUp != null && list[j].sapLookUp != undefined) ? Number(
											list[j].sapLookUp).toFixed(2)
											: '';

									if (Number(list[j].noReceiptItems) != 0 && Number(list[j].cnt)>0) {
										// expanded
										l++;
										siteNm=list[j].siteT;
										site=list[j].site;
										printContent += '<tr  class="collapsed printParentTr ">'
												+ '<td class="leftValue">'
												+ convertDate(list[j].calendarDayTo)
												+ '</td>'
												+ '<td class="rightValue">'
												+ list[j].article
												+ '</td>'
												+ '<td class="rightValue">'
												+ list[j].ean_upc
												+ '</td>'
												+ '<td class="leftValue">'
												+ list[j].articleT
												+ '</td>'
												+ '<td class="rightValue">'
												+ list[j].totalArtPrc
												+ '</td>'
												+ '<td class="centerValue">';
										if (!isNaN(Number(list[j].sapLookUp))
												&& Number(list[j].sapLookUp) != 0)
											printContent += 'SAP LOOK UP';
										else if (!isNaN(Number(list[j].departmentSale))
												&& Number(list[j].departmentSale) != 0)
											printContent += 'DEPT SALE';

										printContent += '</td>'
												+ '<td class="centerValue  actionRows lastColumn ">'+list[j].cnt
												+ '</td></tr>';
										
										if (l % 16 == 0
												&& l != (list.length - 1)
												&& l != 0)
											{printContent += '</tbody></table>'+printFoot+printHead
											+'<label class="separator">|</label><label class="">Store#: </label><label class="" id="">'+list[j].site+'</label>'
											+'<label class="separator">|</label><label class="">Store: </label><label class="" id="">'+list[j].siteT+'</label></div></div>'
											+printTableHeader;
											console.log('mod'+l);
											}
										if (l == (list.length))
											{
											printContent += '</tbody></table>';
											console.log('list.length'+l);
											}

									}
								}
								}
								if(printContent!=''){
								totalContent+= printHead
								+'<label class="separator">|</label><label class="">Store#: </label><label class="" id="">'+site+'</label>'
								+'<label class="separator">|</label><label class="">Store: </label><label class="" id="">'+siteNm+'</label></div></div>'
								+ printTableHeader + printContent
								+ '</tbody></table>' + printFoot;	
								}
			}
		}
		$('#printbody').html('').append(totalContent).append(
		'<link rel="stylesheet" href="../../styles/printstyle.css" />');
		
	}
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
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent .tableInfo .tableActionBtns,.ContentTable.actionRows')
			.addClass('hideBlock');
	// $('.paginationWrapper').hide();
}
function showError(msg) {
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsgDiv').addClass('errorDiv').find('#errorMsg').text(msg);
	$('#errorMsgDiv').removeClass('nodataMessage');
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
function showOldVal() {
	if (prevRes != null && prevRes != undefined && prevRes.trim().length > 0)
		formArticleContent(prevRes, '');
}
function convertDate(val) {

	try {
		var temp = val;

		if (temp != '') {
			var time = temp;// temp.replace('/', '').replace('/',
			// '').replace('(', '')
			// .replace(')', '').split('Date')[1];
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
			return ((newDate + "/" + (newMonth) + "/" + today.getFullYear()));

		}
	} catch (error) {
		console.log(error);
	}
	return '';
}

function showAccord(article, element) {

	var content = '';
	var output = '';

	output = $.parseJSON(prevRes);
	unknown = output.data;
	msg = output.msg;
	content += '<tr  class="childTr  collapsed expandedRow" ><td colspan="9"><span class="indenter" style="padding-left: 19px;">'
			+ '</span><table class="secondaryTable drilldownTable  " cellspacing="0" width="100%"><tr>'
			+ '<th width="40%">Store</th><th class="centerValue" width="15%">Store #</th>'
			+ '<th class="centerValue lastColumn"># of Transactions with Articles</th></tr>';
	if (article != null && article != '') {
		var list = $(unknown).attr(article);
		var site = '';
		for ( var i = 0; i < list.length; i++) {
			if ((site == '' || list[i].site != site) && (Number(list[i].noReceiptItems) != 0 )) {
				site = list[i].site;
				content += '<tr>' + '<td>' + list[i].siteT + '</td>'
						+ '<td class="centerValue">' + list[i].site + '</td>'
						+ '<td class="centerValue">' + list[i].cnt + '</td>'
						+ '</tr>';
			}
		}
	}
	content += '</table></td></tr>';
	return content;
}

function formArticleContent(response, value) {

	var msg = '';
	var output = '';
	$('.childTr').remove();
	output = $.parseJSON(response);
	unknown = output.data;
	msg = output.msg;
	/*var calendarDayTo = '';
	var article = '';
	var ean_upc = '';
	var articleT = '';
	var totalArtPrc = '';
	
	var sapLook = '';
	

	

	if ($('.markFillterHdr') != undefined && $('.markFillterHdr').length > 0
			&& !$('.markFillterHdr').hasClass('hideBlock')) {
		calendarDayTo = $('.calendarDayTo').val().toUpperCase();
		article = $('.article').val().toUpperCase();
		ean_upc = $('.ean_upc').val().toUpperCase();
		articleT = $('.articleT').val().toUpperCase();
		totalArtPrc = $('.totalArtPrc').val().toUpperCase();
		sapLook = $('.sapLookUp').val().toUpperCase();
		
	}*/
	var flag = false;

	var content = '';
	if (unknown != null ) {

		for ( var m in unknown) {

			var list = unknown[m];
			var listlen = list.length - 1;

			if (Number(list[0].noReceiptItems) != 0) {

				list[listlen].calendarDayTo = (list[listlen].calendarDayTo != null && list[listlen].calendarDayTo != undefined) ? list[listlen].calendarDayTo
						: '';
				list[0].article = (list[0].article != null && list[0].article != undefined) ? list[0].article
						: '';
				list[0].ean_upc = (list[0].ean_upc != null && list[0].ean_upc != undefined) ? list[0].ean_upc
						: '';

				list[0].articleT = (list[0].articleT != null && list[0].articleT != undefined) ? list[0].articleT
						: '';
				list[0].totalArtPrc = (list[0].totalArtPrc != null && list[0].totalArtPrc != undefined) ? Number(
						list[0].totalArtPrc).toFixed(2)
						: '';

				list[0].sapLookUp = (list[0].sapLookUp != null && list[0].sapLookUp != undefined) ? Number(
						list[0].sapLookUp).toFixed(2)
						: '';
						
						list[0].departmentSale = (list[0].departmentSale != null && list[0].departmentSale != undefined) ? Number(
								list[0].departmentSale).toFixed(2)
								: '';
								/*var saplookup = '';
								//var deptSale = '';
								if (!isNaN(Number(list[0].sapLookUp))
										&& Number(list[0].sapLookUp) != 0)
									saplookup = 'SAP LOOK UP';
								else if (!isNaN(Number(list[0].departmentSale))
										&& Number(list[0].departmentSale) != 0)
									saplookup = 'DEPT SALE';*/
				/*if (convertDate(list[listlen].calendarDayTo).toUpperCase().indexOf(calendarDayTo) != -1
						&& list[0].articleT.toUpperCase().indexOf(articleT) != -1
						&& list[0].article.toUpperCase().indexOf(article) != -1
						&& list[0].ean_upc.toUpperCase().indexOf(ean_upc) != -1
						&& list[0].totalArtPrc.toUpperCase().indexOf(totalArtPrc) != -1
						&& (saplookup).toUpperCase().indexOf(sapLook) != -1 ) {*/
					flag = true;

					content += '<tr id="' + m
							+ '" class="collapsed parentTr ">'
							+ '<td class="leftValue">'
							+ convertDate(list[listlen].calendarDayTo)
							+ '</td>' + '<td class="rightValue">'
							+ list[0].article + '</td>'
							+ '<td class="rightValue">' + list[0].ean_upc
							+ '</td>' + '<td class="leftValue">'
							+ list[0].articleT + '</td>'
							+ '<td class="rightValue">' + list[0].totalArtPrc
							+ '</td>' + '<td class="centerValue">';
					if (!isNaN(Number(list[0].sapLookUp))
							&& Number(list[0].sapLookUp) != 0)
						content += 'SAP LOOK UP';
					else if (!isNaN(Number(list[0].departmentSale))
							&& Number(list[0].departmentSale) != 0)
						content += 'DEPT SALE';
					content += '</td>'
							+ '<td class="centerValue  actionRows viewStores lastColumn ">&nbsp; <label class="linkBtn"><label class="advancedSearch" id="view-1">&nbsp;</label></label>'
							+ '</td></tr>';
				//}

			}
		}
		$('.sortTable tbody:first').html('');
		$('.sortTable tbody:first').append(content);
		showContentUnkownBlock();
		// initialiseTooltip();
		if (flag) {
			updateSortPlugin();
			setTimeout(function() {
				// set sorting column and direction, this will sort on the first
				var sorting = [ [ 0, 0 ], [ 1, 0 ], [ 3, 0 ] ];
				// sort on the first column
				$(".sortTable").trigger("sorton", [ sorting ]);
			}, 30);
		} else {
			$("'"+'.' + $('.sortTable').attr('data-user_id')+"'")
					.find('.paginationDiv').addClass('hideBlock');
		}

	} else {
		if (msg == 'null')
			showError('Service Unavailable.');
		else if (unknown == null || msg=="Sorry, no results found for your search criteria. Please try again.")
			showWarning('Sorry, no results found for your search criteria. Please try again.');
		else
			showError(msg);
	}

}
function updateSortPlugin() {
	$(".sortTable").trigger("update");

}

/*function showmarkFilter() {
	var markHead = '<thead class="markFillterHdr ">'
			+ '<tr class="filterRow"><td class="centerValue"><input type="#" class="textbox calendarDayTo"></td>'
			+ '<td class="centerValue"><input type="#" class="textbox article"></td>'
			+ '<td class="centerValue"><input type="#" class="textbox ean_upc"></td>'
			+ '<td class="centerValue"><input type="#" class="textbox articleT"></td>'
			+ '<td class="centerValue"><input type="#" class="textbox totalArtPrc"></td>'
			+ '<td class="centerValue"><input type="#" class="textbox sapLookUp"></td>'
			+ '</tr></thead>';
	

	$(markHead).insertAfter('.sortTable thead:first');
	bindFilter();

}
function hidemarkFillter() {
	$('.markFillterHdr').remove();
	formArticleContent(prevRes, '');
}*/
function showWarning(text) {

	$('#reportContent').addClass('hideBlock');
	$('.ContentTableWrapperError').removeClass('hideBlock');
	$('#errorMsg').text(text);
	$("#errorMsgDiv,.tableStart").removeClass('hideBlock');
	$("#errorMsgDiv").addClass('tableTitle nodataMessage');
	$("#errorMsgDiv").removeClass('tableTitle errorDiv');
	$('.paginationDiv').addClass('hideBlock');
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
			
			formArticleContent(prevRes, value.toUpperCase());
		
			if ($('.parentTr:visible').length == 0) {
				$('.sortTable ').find('tr :first').addClass('hideBlock');
				// $('.totVal').addClass('hideBlock');
			} else {
				$('.sortTable').find('tr :first').removeClass('hideBlock');
				// $('.totVal').removeClass('hideBlock');
			}
		}, 200);

	});

}