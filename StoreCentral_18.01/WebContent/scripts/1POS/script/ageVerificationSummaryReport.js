var recordCount;
var currentPage;
var prevRes = '';
var headerDesc;
var headerSort;
var headIndex;
var filterFlag;
var NDF="Sorry, no results found for your search criteria. Please try again.";
visibleCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
hiddentCtrls = 'input[name="dateFromHide"],input[name="dateToHide"]';
allInputCtrls = 'input[name="dateFrom"],input[name="dateTo"]';
$(function() {

	$('#filter').css('padding-top', '4px').css('width', '18%');

	$('.sortTable').removeClass('tbl-print');
	$("#dateFrom").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		onClose : function(selectedDate) {
		
		}
	});

	$("#dateTo").datepicker({
		dateFormat : "dd/mm/yy",
		zIndex : 50,
		onClose : function(selectedDate) {
		
		}
	});
	
	$('#deptFilterOpen').click(function(){
		$('#deptFilterOpen').addClass('hideBlock');
		$('#deptFilterClear').removeClass('hideBlock');
		showdeptFilter();
		});
		$('#deptFilterClear').click(function(){
		$('#deptFilterOpen').removeClass('hideBlock');
		$('#deptFilterClear').addClass('hideBlock');
		hidedeptFillter();
		});
	var today = new Date();
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

	  var oneDayBefCurDate = (newPrevDate + "/" + (newPrevMonth) + "/" + previousDate.getFullYear());
	  $('#dateFrom').val(oneDayBefCurDate);
	$('#reportContent').removeClass('hideBlock');
	$(".sortTable").removeClass('hideBlock');
	$(".sortTable tbody:first").html('');
	$(".sortTable").tablesorter({
		emptyTo : 'top'
	});
	$('#reportContent').addClass('hideBlock');
	$(".sortTable").addClass('hideBlock');

	// Code for accordion
	$("#accordion").accordion({
		header : "h3.mainAccordion",
		collapsible : true,
		heightStyle : "content"
	});

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
						    var dateComTo = new Date(toDate.split('/')[2], toDate.split('/')[1], toDate.split('/')[0]);
						    var toYear = dateComTo.getFullYear();
						    var fromYear = dateComFrom.getFullYear();
						    var toMonth = dateComTo.getMonth();
						    var fromMonth = dateComFrom.getMonth();
						    var toDay = dateComTo.getDate();
						    var fromDay = dateComFrom.getDate();
						    var rangeDate = new Date(toDate.split('/')[2],
						    toDate.split('/')[1] - 1, toDate.split('/')[0]);
						    var date2 = new Date();
						    var part = toDate.split('/');
						    var partLen = part.length;
						    var date2Len = toDate.length;
						    date2.setFullYear(part[2], part[1] - 1, part[0]);

						    var splittedDate = formateDate($('#dateTo').val(),
						    $('#dateTo').val().split('/').length)
						      .split('/');
						    var splittedTwo = splittedDate[0] + splittedDate[1] + splittedDate[2];

						    newTime = Number(newTime) + Number(24 * 60 * 60 * 1000 * 90);

						    if (fromDate == "") {
						      showError('Please enter From Date.');
						      callFrom();
						    } else if (toDate == "") {
						      showError('Please enter To Date.');
						      callTo();
						    } else if (partsLen != 3 || date1Len != 10 || fromDate.split('/')[0] > 31 || fromDate.split('/')[1] > 12 || fromDate.split('/')[2].length != 4) {
						      showError('Invalid From Date.');
						      callFrom();
						    } else if (partLen != 3 || date2Len != 10 || toDate.split('/')[0] > 31 || toDate.split('/')[1] > 12 || toDate.split('/')[2].length != 4) {
						      showError('Invalid To Date.');
						      callTo();
						    } else if (date1.getTime() > date2.getTime()) {
						      showError('To Date should not be lesser than the From Date');
						      callTo();
						    } else if(days >1){
								showError('Date Range is more than a day.');
								callFrom();
							}else if ((splittedDate[0] > 31 || splittedDate[1] > 12 || splittedDate[2] > 9999) || isNaN(splittedTwo)) {

						      showError("Invalid Date Format");
						    } else if (rangeDate > curDate) {
						      showError("Future Dates are not allowed for To Date.");
						      callTo();
						    } else if ((toYear - fromYear) == 1) {
						      if (((toMonth - fromMonth) + 12) > 3) {
						        showError('Date difference should not be greater than 3 months');
						        callFrom();
						      } else if ((((toMonth - fromMonth) + 12) == 3) && (((toDay - fromDay) + 30) > 30)) {
						        showError('Date difference should not be greater than 3 months');
						        callFrom();
						      } else {
						    	 
						    	  ageVerSummary($('#ageVerificationSummary')
						          .serialize());

						      }
						    } else if (toYear - fromYear == 0) {
						      if ((toMonth - fromMonth) > 3) {
						        showError('Date difference should not be greater than 3 months');
						        callFrom();
						      } else if (((toMonth - fromMonth) == 3) && (((toDay - fromDay) + 30) > 30)) {
						        showError('Date difference should not be greater than 3 months');
						        callFrom();
						      } else {
						    	  
						    	  ageVerSummary($('#ageVerificationSummary')
						          .serialize());
						      }
						    } else if ((toYear - fromYear) >= 2) {
						      showError('Date difference should not be greater than 3 months');
						      callFrom();
						    } else {
						    	
						    	ageVerSummary($('#ageVerificationSummary')
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
	$('.sortTable').on('click','.sorting',function () {
	    var th = $('.sortTable th').eq($(this).index());
	    $(th).attr('aria-sort');
	    headerDesc = th.text().replace( /[\s\n\r]+/g,' ').trim();
	    headIndex=Number($(this).index());
	   // returns [object Object]       
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
function ageVerSummary(data) {
	backupInputParams();
	$.ajax({
		type : "get",
		url : "getageVerifSummaryReport.htm",
		data : data,
		beforeSend : function() {
			fullScreenLoader();
		},
		success : function(response) {
			prevRes = '';
			prevRes = response;
			formAgeVerificationSummary(response, '');
	
			bindFilter();
			$.loader('close');
			setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
		},
		error : function() {
			showError("No Data Found.");
			$.loader('close');
		},
	});
}




function formAgeVerificationSummary(response, value) {

	var summaryList = '';
	var msg = '';
	var output = '';	
	output = $.parseJSON(response);
	summaryList = output.data;
	msg = output.msg;

	var posOperName='';
	var totVerf='';
	var approvedVerf='';
	var approvedVerfTran='';
	var rejectVerf='';
	var rejectVerfTran ='';
	var keyedVerf='';
	var keyedVerfTran='';
	var totalAgeVerificationTmp = 0.0;
	var approvedAgeVerifitnTmp = 0.0;
	var rejectedAgeVerifTransTmp = 0.0;
	var keyedAgeVerifTransTmp = 0.0;
	var approvedAgeVerifitnPerTmp = '';
	var rejectedAgeVerifTransPerTmp = '';
	var keyedAgeVerifTransPerTmp = '';
	
	if($('.deptFillterHdr')!=undefined && $('.deptFillterHdr').length>0 && !$('.deptFillterHdr').hasClass('hideBlock')){
		posOperName=$('.posOperName').val().toUpperCase();
		totVerf=$('.totVerf').val().toUpperCase();
		approvedVerf=$('.approvedVerf').val().toUpperCase();
		approvedVerfTran=$('.approvedVerfTran').val().toUpperCase();
		rejectVerf=$('.rejectVerf').val().toUpperCase();
		rejectVerfTran=$('.rejectVerfTran').val().toUpperCase();
		keyedVerf=$('.keyedVerf').val().toUpperCase();
		keyedVerfTran=$('.keyedVerfTran').val().toUpperCase();
			
	}
	var j = 0;
	var k=0;
	var s=0;
	var flag = false;
	if (msg != undefined && msg == '' && summaryList != null
			&& summaryList != undefined && summaryList!= "") {
		
		var content = '';
		setReportGenerationFlags();
		if (summaryList != null) {


		      var list = summaryList;
		      for (var i = 0; i < list.length; i++) {
		   
		    	totalAgeVerificationTmp = 0.0;
		    	approvedAgeVerifitnTmp = 0.0;
		    	rejectedAgeVerifTransTmp = 0.0;
		    	keyedAgeVerifTransTmp = 0.0;
		    	approvedAgeVerifitnPerTmp = '';
		    	rejectedAgeVerifTransPerTmp = '';
		    	keyedAgeVerifTransPerTmp = '';
		        list[i].cashierFirstName = (list[i].cashierFirstName != null && list[i].cashierFirstName != undefined) ?list[i].cashierFirstName : '';
		        list[i].cashierLastName = (list[i].cashierLastName != null && list[i].cashierLastName != undefined) ?list[i].cashierLastName : '';
		        
		        //list[i].rejectedAgeVerificationPer = (list[i].rejectedAgeVerificationPer != null && list[i].rejectedAgeVerificationPer != undefined) ? Number(list[i].rejectedAgeVerificationPer).toFixed(0) : 0;
		        //list[i].keyedAgedVerificationTransactionPer = (list[i].keyedAgedVerificationTransactionPer != null && list[i].keyedAgedVerificationTransactionPer != undefined) ? Number(list[i].keyedAgedVerificationTransactionPer).toFixed(0) : 0;
		        //list[i].approvedAgeVerifTransPer = (list[i].approvedAgeVerifTransPer != null && list[i].approvedAgeVerifTransPer != undefined) ? Number(list[i].approvedAgeVerifTransPer).toFixed(0) : 0;
		        list[i].numberOfRec = (list[i].numberOfRec != null && list[i].numberOfRec != undefined) ? Number(list[i].numberOfRec).toFixed(0) : '';
		        list[i].totalAgeVerification = (list[i].totalAgeVerification != null && list[i].totalAgeVerification != undefined) ? Number(list[i].totalAgeVerification).toFixed(0) : '';
		        totalAgeVerificationTmp = Number(list[i].totalAgeVerification);
		        list[i].approvedAgeVerifitn = (list[i].approvedAgeVerifitn != null && list[i].approvedAgeVerifitn != undefined) ? Number(list[i].approvedAgeVerifitn).toFixed(0) : '';
		        approvedAgeVerifitnTmp = Number(list[i].approvedAgeVerifitn);
		        //console.log('approvedAgeVerifitn : >'+list[i].approvedAgeVerifitn+'< totalAgeVerification >'+list[i].totalAgeVerification+"<");
		        //list[i].approvedAgeVerifTransPer = (list[i].totalAgeVerification != '' && list[i].totalAgeVerification!=0) ? Number(list[i].approvedAgeVerifitn * 100/list[i].totalAgeVerification).toFixed(0) : '0';
		        approvedAgeVerifitnPerTmp = (isNaN(totalAgeVerificationTmp) || isNaN(approvedAgeVerifitnTmp) || totalAgeVerificationTmp ==0)?'0%':Number(approvedAgeVerifitnTmp*100/totalAgeVerificationTmp).toFixed(0)+'%';
		        list[i].rejectedAgeVerifTrans = (list[i].rejectedAgeVerifTrans != null && list[i].rejectedAgeVerifTrans != undefined) ? Number(list[i].rejectedAgeVerifTrans).toFixed(0) : '';
		        rejectedAgeVerifTransTmp = Number(list[i].rejectedAgeVerifTrans);
		        //list[i].rejectedAgeVerificationPer = (list[i].totalAgeVerification != '' && list[i].totalAgeVerification!=0) ? Number(list[i].rejectedAgeVerifTrans * 100/list[i].totalAgeVerification).toFixed(0) : '0';
		        rejectedAgeVerifTransPerTmp = (isNaN(totalAgeVerificationTmp) || isNaN(rejectedAgeVerifTransTmp) || totalAgeVerificationTmp ==0)?'0%':Number(rejectedAgeVerifTransTmp*100/totalAgeVerificationTmp).toFixed(0)+'%';
		        
		        list[i].keyedAgeVerifTrans = (list[i].keyedAgeVerifTrans != null && list[i].keyedAgeVerifTrans != undefined) ? Number(list[i].keyedAgeVerifTrans).toFixed(0) : '';
		        keyedAgeVerifTransTmp = Number(list[i].keyedAgeVerifTrans);
		        //list[i].keyedAgedVerificationTransactionPer = (list[i].totalAgeVerification != '' && list[i].totalAgeVerification!=0) ? Number(list[i].keyedAgeVerifTrans * 100/list[i].totalAgeVerification).toFixed(0) : '0';
		        keyedAgeVerifTransPerTmp = (isNaN(totalAgeVerificationTmp) || isNaN(keyedAgeVerifTransTmp) || totalAgeVerificationTmp ==0)?'0%':Number(keyedAgeVerifTransTmp*100/totalAgeVerificationTmp).toFixed(0)+'%';
		       
		        var operatorName =list[i].cashierFirstName+' '+list[i].cashierLastName;
		    	if (operatorName.toUpperCase().indexOf(posOperName) != -1
						&& list[i].approvedAgeVerifitn.toUpperCase().indexOf(approvedVerf) != -1
						&& approvedAgeVerifitnPerTmp.indexOf(approvedVerfTran) != -1
						&& list[i].rejectedAgeVerifTrans.toUpperCase().indexOf(rejectVerf) != -1
						&& rejectedAgeVerifTransPerTmp
								.indexOf(rejectVerfTran) != -1
						&& list[i].keyedAgeVerifTrans.toUpperCase().indexOf(keyedVerf) != -1
						&& keyedAgeVerifTransPerTmp.indexOf(keyedVerfTran) != -1
						&& list[i].totalAgeVerification.toUpperCase().indexOf(totVerf) != -1) { 
		        flag = true;
		        s++;
		        if($("#deptFilterClear").hasClass("hideBlock")){
					filterFlag=true;
					$(".filterFlag").val(filterFlag);		
				}
				else
					{	
					filterFlag=false;
					$(".filterFlag").val(filterFlag);
					}
				content += '<tr id=' + i + ' class=" parentTr page-' + k;
				if (j > 10)
					content += ' hideBlock "';
				
				content+= '"><td class="leftValue " >' + list[i].cashierFirstName +' '+list[i].cashierLastName +'</td>' + '<td class="rightValue " >';
		        if (list[i].totalAgeVerification.trim() != '' && list[i].totalAgeVerification.trim() != undefined) content += list[i].totalAgeVerification;
		        content += '</td>' + '<td class="rightValue " >';
		        if (list[i].approvedAgeVerifitn.trim() != '' && list[i].approvedAgeVerifitn.trim() != undefined) content += list[i].approvedAgeVerifitn;
		        content += '</td>' + '<td class="rightValue" >';
		        content += approvedAgeVerifitnPerTmp;
		        //if (list[i].approvedAgeVerifTransPer.trim() != '' && list[i].approvedAgeVerifTransPer.trim() != undefined) content += list[i].approvedAgeVerifTransPer;
		        content += '</td>' + '<td class="rightValue" >';
		        if (list[i].rejectedAgeVerifTrans.trim() != '' && list[i].rejectedAgeVerifTrans.trim() != undefined) content += list[i].rejectedAgeVerifTrans;
		        content += '</td>' + '<td class="rightValue">';
		        //if (list[i].rejectedAgeVerificationPer.trim() != '' && list[i].rejectedAgeVerificationPer.trim() != undefined) content += list[i].rejectedAgeVerificationPer;
		        content += rejectedAgeVerifTransPerTmp;
		        content += '</td>' + '<td class=" rightValue ">';
		        if (list[i].keyedAgeVerifTrans.trim() != '' && list[i].keyedAgeVerifTrans.trim() != undefined) content += list[i].keyedAgeVerifTrans;
		        content += '<td class=" rightValue  lastColumn">';
		        //if (list[i].keyedAgedVerificationTransactionPer.trim() != '' && list[i].keyedAgedVerificationTransactionPer.trim() != undefined) content += list[i].keyedAgedVerificationTransactionPer;
		        content += keyedAgeVerifTransPerTmp;
		        content += '</td></tr>';
		      }
		        
		        if (j % 10 == 0) {
					k++;
				}
				j++;
		     
		      }
		      
		     
		    
		}
		$('.sortTable tbody:first').html('');
		$('.sortTable tbody:first').append(content);
		showContentDepartmentSalesTaxBlock();
		sortTotValPrint();
		if($('.sortTable tbody:first').text().length==0){
			if(!$("#deptFilterClear").hasClass("hideBlock")){
				filterFlag=null;
				$(".filterFlag").val(filterFlag);
				
			}
		}
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
		
		recordCount=s;	
		if (recordCount > 10) {

			$('.paginationDiv')
					.pagination(
							{
								items : recordCount,
								itemsOnPage : 10,
								cssStyle : 'compact-theme',
								currentPage : currentPage,
								onPageClick : function(pageNo) {

									// closeAccordian();
									currentPage = pageNo;
									var pageClass = 'page-' + pageNo;
									$(
											'.sortTable .parentTr,.totVal')
											.filter(
													function() {
														if ($(this).hasClass(
																pageClass)) {
															$(this)
																	.removeClass(
																			'hideBlock');
															// $(this).removeClass('hideStoreTotal');
															if (currentPage == k) {
																$(
																		'.totVal')
																		.removeClass(
																				'hideBlock');
															}
															// $('.hideStoreTotal').removeClass('hideBlock');
														} else {
															$(this)
																	.addClass(
																			'hideBlock');
															$('.totVal')
																	.addClass(
																			'hideBlock');
														}

														if (currentPage == k) {
															$('.totVal')
																	.removeClass(
																			'hideBlock');
														}

													});
									setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
								}

							});

			$(' .paginationDiv').removeClass('hideBlock');

		} else {
			$(' .paginationDiv').addClass('hideBlock');
			$('.totVal').removeClass('hideBlock');
			setScrollerPosition($("#sortTable"), $("#previous-column"), $("#next-column"));
			
			
		}
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
	

}

function showContentDepartmentSalesTaxBlock() {

	$('#reportContent').removeClass('hideBlock');
	$('.sortTable').removeClass('hideBlock');
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

function showContent() {

	$(
			'#reportContent,#reportContent .tableInfo .tableTitle,#reportContent,.ContentTable.actionRows')
			.removeClass('hideBlock');
	closeAccordian();
}
function hideContent() {
	$('#reportContent,#reportContent,.ContentTable.actionRows').addClass(
			'hideBlock');
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
function bindFilter() {
	var value = '';
	var timeout = '';
	//console.log('search');
	$('.sortTable .textbox').unbind('keyup');
	$('.sortTable .textbox').keyup(function() {
		value = $(this).val().trim();

		if (timeout) {
			clearTimeout(timeout);
		}

		timeout = setTimeout(function() {
			
			formAgeVerificationSummary(prevRes, value.toUpperCase());
			
			/*if ($('.parentTr:visible').length == 0) {
				$('.sortTable ').find('thead tr :first').addClass('hideBlock');
				$('.totVal').addClass('hideBlock');
			} else {
				$('.sortTable').find('thead tr :first').removeClass('hideBlock');
				$('.totVal').removeClass('hideBlock');
			}*/
			$('.sortTable').find('thead tr :first').removeClass('hideBlock');
		}, 500);

	});

}

function sortTotValPrint() {
	var totalVerfiTrans = 0;
	var approvedVerfiTrans = 0;
	var approvedVerfiTransPer = 0;
	var rejectVerfiTrans = 0;
	var rejectVerfiTransPer = 0;
	var keyedAgeVerfiTrans = 0;
	var keyedAgeVerfiTransPer = 0;

	$('.parentTr')
			.filter(
					function() {

						totalVerfiTrans += Number($(this).children(
								':nth-child(2)').text().trim());

						approvedVerfiTrans += Number($(this).children(':nth-child(3)')
								.text().trim());
						rejectVerfiTrans += Number($(this)
								.children(':nth-child(5)').text().trim());
						keyedAgeVerfiTrans += Number($(this).children(
								':nth-child(7)').text().trim());
						
						

					});

	
	approvedVerfiTransPer = (totalVerfiTrans!='' && totalVerfiTrans!=0)?((approvedVerfiTrans *100)/totalVerfiTrans):0 ;
	rejectVerfiTransPer = (totalVerfiTrans!='' && totalVerfiTrans!=0)?((rejectVerfiTrans *100)/totalVerfiTrans):0 ;
	keyedAgeVerfiTransPer = (totalVerfiTrans!='' && totalVerfiTrans!=0)?((keyedAgeVerfiTrans *100)/totalVerfiTrans):0 ;
	$('.totalAge').text(totalVerfiTrans.toFixed(0));
	$('.approvedAge').text(approvedVerfiTrans.toFixed(0));
	$('.approvedAgePer').text(approvedVerfiTransPer.toFixed(0)+"%");
	$('.rejectedAge').text(rejectVerfiTrans.toFixed(0));
	$('.rejectedAgePer').text(rejectVerfiTransPer.toFixed(0)+"%");
	$('.keyedAge').text(keyedAgeVerfiTrans.toFixed(0));
	$('.keyedAgePer').text(keyedAgeVerfiTransPer.toFixed(0)+"%");

}
function printResult(res) {
	
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

 

function showdeptFilter(){
	

	var deptHead='<thead class="deptFillterHdr ">'
		+'<tr class="filterRow"><td class="centerValue"><input type="#" name="posOperName" class="textbox posOperName"></td>'
		+'<td class="centerValue"><input type="#" name ="totVerf" class="textbox totVerf"></td>'
		+'<td class="centerValue"><input type="#" name="approvedVerf" class="textbox approvedVerf"></td>'
		+'<td class="centerValue"><input type="#" name="approvedVerfTran" class="textbox approvedVerfTran"></td>'
		+'<td class="centerValue"><input type="#" name="rejectVerf" class="textbox rejectVerf"></td>'
		+'<td class="centerValue"><input type="#" name="rejectVerfTran" class="textbox rejectVerfTran"></td>'
		+'<td class="centerValue"><input type="#" name="keyedVerf" class="textbox keyedVerf"></td>'
		+'<td class="centerValue"><input type="#" name="keyedVerfTran" class="textbox keyedVerfTran"></td>'
		+'</tr></thead>';
		$(deptHead).insertAfter('.sortTable thead:first');
		$(".tablesorter-headerRow ").removeClass('hideBlock');
		bindFilter();
		
}
function hidedeptFillter(){
	$('.deptFillterHdr').remove();

	formAgeVerificationSummary(prevRes, '');
	
	$(".tablesorter-headerRow ").removeClass('hideBlock');
}


function ageVerificationJasperPrint() {
	$(".sortTable").trigger("click");
	if (isNotJasperPrintValid()) {
		printJasperValMsg();
	}
	else{
		if(headIndex != null)
		{
	headerSort = $("#ageVerificationSummary thead tr th:nth-child("+(Number(headIndex)+1)+")").attr('aria-sort');
		}
	$("#headerDesc").val(headerDesc);
	$("#headerSort").val(headerSort);
	$('#ageVerificationSummary').attr("action", "getAgeVerificationSummaryPDF.pdf");
	$('#ageVerificationSummary').attr('target','_blank');
	$('#ageVerificationSummary').submit();	
	}
}

$( document ).ready(function() {
	bindTableHeaderClickEvent();
	bindTableSortEndEvent($("#sortTable"), $("#ageVerificationSummaryAttr"));
});
function shiftKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		shiftKeyFunction(tableHeaderObj, $("#ageVerificationSummaryAttr"));
	}
}
function ctrlKeyCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		ctrlKeyFunction($("#ageVerificationSummaryAttr"));
	}
}
function clickCallbackFunction(tableIdName, tableHeaderObj, sortColVal) {
	if(tableIdName == 'sortTable') {
		clickFunction(tableHeaderObj, $("#ageVerificationSummaryAttr"));
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
